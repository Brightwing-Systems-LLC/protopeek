"""Owner-facing prototype management (auth: Bearer token, applied at the router mount)."""

from datetime import datetime

from django.conf import settings
from django.db.models import Max
from django.http import HttpResponse, HttpResponseNotModified, JsonResponse
from django.shortcuts import get_object_or_404
from django.utils import timezone
from ninja import File, Form, Router, Schema
from ninja.files import UploadedFile

from feedback.models import Annotation, AnnotationShot, Comment

from .allowlist import normalize_email
from .models import AccessRule, Prototype, PrototypeVersion

router = Router()


# ── Schemas ──────────────────────────────────────────────────────────────────
class UploadOut(Schema):
    uuid: str
    name: str
    url: str
    version: int
    expires_at: datetime


class RuleOut(Schema):
    kind: str
    value: str


class PrototypeOut(Schema):
    uuid: str
    name: str
    url: str
    version: int | None
    created_at: datetime
    expires_at: datetime
    is_active: bool
    is_expired: bool
    rules: list[RuleOut]


class AccessIn(Schema):
    add_domains: list[str] = []
    add_emails: list[str] = []
    remove_domains: list[str] = []
    remove_emails: list[str] = []


class ExpireIn(Schema):
    deactivate: bool = False


# ── Helpers ──────────────────────────────────────────────────────────────────
def _split(raw: str) -> list[str]:
    return [p.strip() for p in (raw or "").replace("\n", ",").split(",") if p.strip()]


def _seed_rules(prototype: Prototype, domains, emails):
    from siteconfig import conf

    # Seed the platform default domain + this owner's default domain (set at mint
    # time from their email), so the common "anyone at my company" case is zero-arg.
    seeds = [conf.get_str("DEFAULT_ALLOW_DOMAIN"), prototype.owner.default_allow_domain]
    domains = [*(s for s in seeds if s), *domains]
    for d in {normalize_email(x).lstrip("@") for x in domains if x}:
        AccessRule.objects.get_or_create(
            prototype=prototype, kind=AccessRule.DOMAIN, value=d
        )
    for e in {normalize_email(x) for x in emails if x}:
        AccessRule.objects.get_or_create(
            prototype=prototype, kind=AccessRule.EMAIL, value=e
        )


def _serialize(p: Prototype) -> dict:
    return {
        "uuid": str(p.uuid),
        "name": p.name,
        "url": p.share_url,
        "version": p.current_version.version_number if p.current_version else None,
        "created_at": p.created_at,
        "expires_at": p.expires_at,
        "is_active": p.is_active,
        "is_expired": p.is_expired,
        "rules": [{"kind": r.kind, "value": r.value} for r in p.access_rules.all()],
    }


# ── Endpoints ────────────────────────────────────────────────────────────────
@router.post("", response=UploadOut)
def upload_prototype(
    request,
    html: UploadedFile = File(...),
    name: str = Form(""),
    domains: str = Form(""),
    emails: str = Form(""),
    update_of: str = Form(""),
):
    """Create a new prototype, or (with update_of=<uuid>) a new version behind the
    same link. Multipart: `html` file + form fields."""
    raw = html.read()
    if len(raw) > settings.PROTOTYPE_MAX_UPLOAD_BYTES:
        return JsonResponse({"detail": "HTML too large"}, status=413)
    try:
        content = raw.decode("utf-8")
    except UnicodeDecodeError:
        return JsonResponse({"detail": "HTML must be UTF-8"}, status=400)

    owner = request.auth

    if update_of:
        prototype = get_object_or_404(Prototype, uuid=update_of, owner=owner)
        next_number = (
            prototype.versions.aggregate(m=Max("version_number"))["m"] or 0
        ) + 1
        if name:
            prototype.name = name
    else:
        prototype = Prototype(owner=owner, name=name or html.name or "Untitled prototype")
        prototype.save()
        _seed_rules(prototype, _split(domains), _split(emails))
        next_number = 1

    version = PrototypeVersion.objects.create(
        prototype=prototype, version_number=next_number, html_content=content
    )
    prototype.current_version = version
    prototype.save(update_fields=["current_version", "name", "expires_at"])

    return {
        "uuid": str(prototype.uuid),
        "name": prototype.name,
        "url": prototype.share_url,
        "version": version.version_number,
        "expires_at": prototype.expires_at,
    }


@router.get("", response=list[PrototypeOut])
def list_prototypes(request):
    qs = (
        Prototype.objects.filter(owner=request.auth)
        .select_related("current_version")
        .prefetch_related("access_rules")
    )
    return [_serialize(p) for p in qs]


@router.get("/{uuid}", response=PrototypeOut)
def get_prototype(request, uuid: str):
    p = get_object_or_404(
        Prototype.objects.prefetch_related("access_rules"),
        uuid=uuid,
        owner=request.auth,
    )
    return _serialize(p)


@router.post("/{uuid}/access", response=PrototypeOut)
def edit_access(request, uuid: str, payload: AccessIn):
    p = get_object_or_404(Prototype, uuid=uuid, owner=request.auth)
    _seed_rules_no_default(p, payload.add_domains, payload.add_emails)
    for d in payload.remove_domains:
        AccessRule.objects.filter(
            prototype=p, kind=AccessRule.DOMAIN, value=normalize_email(d).lstrip("@")
        ).delete()
    for e in payload.remove_emails:
        AccessRule.objects.filter(
            prototype=p, kind=AccessRule.EMAIL, value=normalize_email(e)
        ).delete()
    p.refresh_from_db()
    return _serialize(p)


@router.post("/{uuid}/expire", response=PrototypeOut)
def expire(request, uuid: str, payload: ExpireIn):
    p = get_object_or_404(Prototype, uuid=uuid, owner=request.auth)
    if payload.deactivate:
        p.is_active = False
        p.save(update_fields=["is_active"])
    p.refresh_from_db()
    return _serialize(p)


def _status_block(p: Prototype, watermark) -> dict:
    """The activity summary shared by /status (read-only) and /feedback (advances
    the watermark). `watermark` is the 'last pull' timestamp new items are counted
    against."""
    annotations = Annotation.objects.filter(version__prototype=p)
    comments = Comment.objects.filter(annotation__version__prototype=p)
    authors = set(annotations.values_list("author_email", flat=True)) | set(
        comments.values_list("author_email", flat=True)
    )

    def _is_new(created_at) -> bool:
        return watermark is None or created_at > watermark

    new_count = sum(1 for dt in annotations.values_list("created_at", flat=True) if _is_new(dt)) + sum(
        1 for dt in comments.values_list("created_at", flat=True) if _is_new(dt)
    )
    status = {
        "distinct_reviewers": len(authors),
        "total_comments": annotations.count() + comments.count(),
        "new_since_last_pull": new_count,
        "last_activity": annotations.aggregate(m=Max("created_at"))["m"],
    }
    if p.named_invite_mode:
        rule_emails = set(
            p.access_rules.filter(kind=AccessRule.EMAIL).values_list("value", flat=True)
        )
        responded = authors & rule_emails
        status.update(
            invited=len(rule_emails),
            responded=len(responded),
            opened_no_comment=max(len(rule_emails) - len(responded), 0),
        )
    return status


@router.get("/{uuid}/status")
def status(request, uuid: str):
    """Cheap 'is it worth pulling?' poll. Does NOT advance the watermark, so
    /proto-status can be run freely without consuming the new-since signal."""
    p = get_object_or_404(Prototype, uuid=uuid, owner=request.auth)
    return {
        "prototype": {
            "uuid": str(p.uuid),
            "name": p.name,
            "version": p.current_version.version_number if p.current_version else None,
            "is_active": p.is_active,
            "is_expired": p.is_expired,
            "expires_at": p.expires_at.isoformat(),
        },
        "status": _status_block(p, p.last_fetched_at),
    }


@router.get("/{uuid}/feedback")
def feedback(request, uuid: str, since: datetime | None = None):
    """Agent-shaped feedback synthesis input. Advances the per-prototype watermark."""
    p = get_object_or_404(Prototype, uuid=uuid, owner=request.auth)
    watermark = since or p.last_fetched_at
    status = _status_block(p, watermark)

    annotations = (
        Annotation.objects.filter(version__prototype=p)
        .select_related("version", "shot")
        .prefetch_related("comments")
    )
    payload_annotations = []
    for a in annotations:
        shot = getattr(a, "shot", None)
        payload_annotations.append(
            {
                "id": a.id,
                "css_selector": a.css_selector,
                "element_snapshot": a.element_snapshot,
                "note": a.note,
                "type": a.feedback_type,
                "author": a.author_email,
                "version": a.version.version_number,
                "resolved": a.resolved,
                "created_at": a.created_at.isoformat(),
                "screenshot": (
                    {
                        "url": f"{settings.BASE_URL}/api/prototypes/{p.uuid}"
                        f"/annotations/{a.id}/shot",
                        "width": shot.width,
                        "height": shot.height,
                    }
                    if shot
                    else None
                ),
                "thread": [
                    {
                        "author": c.author_email,
                        "body": c.body,
                        "at": c.created_at.isoformat(),
                    }
                    for c in a.comments.all()
                ],
            }
        )

    # Advance the watermark now that this pull has been served.
    p.last_fetched_at = timezone.now()
    p.save(update_fields=["last_fetched_at"])

    return {
        "prototype": {
            "uuid": str(p.uuid),
            "name": p.name,
            "version": p.current_version.version_number if p.current_version else None,
        },
        "status": status,
        "annotations": payload_annotations,
    }


@router.get("/{uuid}/annotations/{ann_id}/shot")
def annotation_shot(request, uuid: str, ann_id: int):
    """Stream the reviewer's screenshot bytes. Bearer-authed and scoped to the owner's
    prototype, so annotation ids can't be walked across owners. ETag = sha256."""
    p = get_object_or_404(Prototype, uuid=uuid, owner=request.auth)
    shot = get_object_or_404(
        AnnotationShot, annotation_id=ann_id, annotation__version__prototype=p
    )
    if request.headers.get("If-None-Match") == shot.sha256:
        return HttpResponseNotModified()
    return HttpResponse(
        bytes(shot.image),
        content_type=shot.content_type,
        headers={"ETag": shot.sha256, "Cache-Control": "private, max-age=300"},
    )


def _seed_rules_no_default(prototype: Prototype, domains, emails):
    for d in {normalize_email(x).lstrip("@") for x in domains if x}:
        AccessRule.objects.get_or_create(
            prototype=prototype, kind=AccessRule.DOMAIN, value=d
        )
    for e in {normalize_email(x) for x in emails if x}:
        AccessRule.objects.get_or_create(
            prototype=prototype, kind=AccessRule.EMAIL, value=e
        )

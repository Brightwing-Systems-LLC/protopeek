"""Owner-facing prototype management (auth: Bearer token, applied at the router mount)."""

from datetime import datetime, timedelta

from django.conf import settings
from django.db.models import Count, Max
from django.http import HttpResponse, HttpResponseNotModified, JsonResponse
from django.shortcuts import get_object_or_404
from django.utils import timezone
from ninja import File, Form, Router, Schema
from ninja.files import UploadedFile
from ninja.responses import Status

from feedback.models import Annotation, AnnotationShot, Comment

from .allowlist import normalize_email
from .models import AccessRule, Prototype, PrototypeVersion
from .shotlinks import shot_view_url

router = Router()


# ── Schemas ──────────────────────────────────────────────────────────────────
class RuleOut(Schema):
    kind: str
    value: str


class UploadOut(Schema):
    uuid: str
    name: str
    url: str
    version: int
    expires_at: datetime
    # The effective allowlist — exactly what the request created, so clients can
    # show the user who can view without a second call. Empty means locked.
    rules: list[RuleOut] = []


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
    # Lightweight activity hint ("anything new here?"); the exact new-item count
    # lives in /status, which stays the per-prototype polling endpoint.
    total_comments: int = 0
    last_activity: datetime | None = None
    has_new: bool = False


class AccessIn(Schema):
    add_domains: list[str] = []
    add_emails: list[str] = []
    remove_domains: list[str] = []
    remove_emails: list[str] = []


class PrototypePatch(Schema):
    name: str | None = None
    is_active: bool | None = None


class AnnotationPatch(Schema):
    resolved: bool | None = None


# ── Helpers ──────────────────────────────────────────────────────────────────
def _split(raw: str) -> list[str]:
    return [p.strip() for p in (raw or "").replace("\n", ",").split(",") if p.strip()]


def _apply_rules(prototype: Prototype, domains, emails):
    # Exactly what the request asked for — no server-side defaults. Clients (the
    # skills, the dashboard prefill) apply the owner's default domain explicitly
    # and visibly; an empty allowlist is a deliberate, fail-closed state.
    for d in {normalize_email(x).lstrip("@") for x in domains if x}:
        AccessRule.objects.get_or_create(
            prototype=prototype, kind=AccessRule.DOMAIN, value=d
        )
    for e in {normalize_email(x) for x in emails if x}:
        AccessRule.objects.get_or_create(
            prototype=prototype, kind=AccessRule.EMAIL, value=e
        )


def _activity_map(prototypes) -> dict:
    """Per-prototype comment totals + latest activity in two grouped queries (no N+1)."""
    acc: dict = {}
    annotations = (
        Annotation.objects.filter(version__prototype__in=prototypes)
        .values("version__prototype")
        .annotate(n=Count("id"), latest=Max("created_at"))
    )
    comments = (
        Comment.objects.filter(annotation__version__prototype__in=prototypes)
        .values("annotation__version__prototype")
        .annotate(n=Count("id"), latest=Max("created_at"))
    )
    for row in annotations:
        acc[row["version__prototype"]] = {"total": row["n"], "last": row["latest"]}
    for row in comments:
        cur = acc.setdefault(
            row["annotation__version__prototype"], {"total": 0, "last": None}
        )
        cur["total"] += row["n"]
        if cur["last"] is None or (row["latest"] and row["latest"] > cur["last"]):
            cur["last"] = row["latest"]
    return acc


def _serialize(p: Prototype, activity: dict | None = None) -> dict:
    a = (activity or {}).get(p.pk, {})
    last = a.get("last")
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
        "total_comments": a.get("total", 0),
        "last_activity": last,
        "has_new": bool(last and (p.last_fetched_at is None or last > p.last_fetched_at)),
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
        _apply_rules(prototype, _split(domains), _split(emails))
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
        "rules": [
            {"kind": r.kind, "value": r.value} for r in prototype.access_rules.all()
        ],
    }


@router.get("", response=list[PrototypeOut])
def list_prototypes(request):
    qs = list(
        Prototype.objects.filter(owner=request.auth)
        .select_related("current_version")
        .prefetch_related("access_rules")
    )
    activity = _activity_map(qs)
    return [_serialize(p, activity) for p in qs]


@router.get("/{uuid}", response=PrototypeOut)
def get_prototype(request, uuid: str):
    p = get_object_or_404(
        Prototype.objects.prefetch_related("access_rules"),
        uuid=uuid,
        owner=request.auth,
    )
    return _serialize(p, _activity_map([p]))


@router.post("/{uuid}/access", response=PrototypeOut)
def edit_access(request, uuid: str, payload: AccessIn):
    p = get_object_or_404(Prototype, uuid=uuid, owner=request.auth)
    _apply_rules(p, payload.add_domains, payload.add_emails)
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


@router.patch("/{uuid}", response=PrototypeOut)
def edit_prototype(request, uuid: str, payload: PrototypePatch):
    """Rename and/or flip the link on/off. Reactivating an expired prototype restarts
    the 30-day clock — mirrors the dashboard's Re-open, since a reactivated-but-expired
    link would still be dead."""
    p = get_object_or_404(Prototype.objects.prefetch_related("access_rules"), uuid=uuid, owner=request.auth)
    fields = []
    if payload.name is not None and payload.name.strip():
        p.name = payload.name.strip()[:200]
        fields.append("name")
    if payload.is_active is not None:
        p.is_active = payload.is_active
        fields.append("is_active")
        if payload.is_active and p.is_expired:
            p.expires_at = timezone.now() + timedelta(
                hours=settings.PROTOTYPE_EXPIRY_HOURS
            )
            fields.append("expires_at")
    if fields:
        p.save(update_fields=fields)
    return _serialize(p)


@router.delete("/{uuid}", response={204: None})
def delete_prototype(request, uuid: str):
    """Hard delete: the link, every version's HTML, all annotations/comments/screenshots,
    and the allowlist go with it (FK cascade). Irreversible — clients confirm first."""
    p = get_object_or_404(Prototype, uuid=uuid, owner=request.auth)
    p.delete()
    return Status(204, None)


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


def _anchor_detail(a: Annotation) -> dict:
    """The positional context SitePing captured, lifted out of the raw `anchors` blob.
    The screenshot is viewport-only, so rect/scroll are what say where the pin actually
    sits on the page and how far down the reviewer was. The secondary anchor fields are
    the fallbacks for when css_selector has gone stale — annotations pin to the version
    they were left on, so a pull can carry v1 pins whose selectors no longer resolve."""
    entries = a.anchors if isinstance(a.anchors, list) else []
    entry = entries[0] if entries and isinstance(entries[0], dict) else {}
    anchor = entry.get("anchor") or {}
    rect = entry.get("rect") or {}
    return {
        "xpath": anchor.get("xpath", ""),
        "element_tag": anchor.get("elementTag", ""),
        "element_id": anchor.get("elementId"),
        "text_prefix": anchor.get("textPrefix", ""),
        "text_suffix": anchor.get("textSuffix", ""),
        "neighbor_text": anchor.get("neighborText", ""),
        "rect": (
            {k: rect.get(k) for k in ("xPct", "yPct", "wPct", "hPct")} if rect else None
        ),
        "scroll": (
            {"x": entry.get("scrollX"), "y": entry.get("scrollY")} if entry else None
        ),
    }


def _annotation_payload(a: Annotation, p: Prototype) -> dict:
    shot = getattr(a, "shot", None)
    return {
        "id": a.id,
        "css_selector": a.css_selector,
        "element_snapshot": a.element_snapshot,
        "note": a.note,
        "type": a.feedback_type,
        "author": a.author_email,
        "version": a.version.version_number,
        "resolved": a.resolved,
        "created_at": a.created_at.isoformat(),
        # What the reviewer was actually looking at. "This feels cramped" at 390x844 is
        # a different bug from the same words at 1440x900, and url pins which screen
        # they were on when the prototype routes by hash/pushState.
        "viewport": a.viewport,
        "url": a.url,
        "anchor": _anchor_detail(a),
        "screenshot": (
            {
                # `url` is Bearer-authed (curl it); `view_url` is signed and
                # time-boxed, so it opens in a browser and can be handed to someone.
                "url": f"{settings.BASE_URL}/api/prototypes/{p.uuid}"
                f"/annotations/{a.id}/shot",
                "view_url": shot_view_url(a.id),
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


def _owned_annotation(request, uuid: str, ann_id: int):
    """Resolve an annotation through its owner's prototype, so annotation ids can't be
    walked across owners — same scoping the shot endpoint uses."""
    p = get_object_or_404(Prototype, uuid=uuid, owner=request.auth)
    a = get_object_or_404(
        Annotation.objects.select_related("version", "shot").prefetch_related(
            "comments"
        ),
        id=ann_id,
        version__prototype=p,
    )
    return p, a


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
    payload_annotations = [_annotation_payload(a, p) for a in annotations]

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


@router.patch("/{uuid}/annotations/{ann_id}")
def edit_annotation(request, uuid: str, ann_id: int, payload: AnnotationPatch):
    """Mark a reviewer's pin resolved, or reopen it. This is visible to reviewers: the
    widget keeps the marker but flips its status pill and its Open/Resolved counters,
    and offers them a Reopen button. Prefer resolving once the fix is actually live —
    resolved reads as 'addressed', not 'acknowledged'."""
    p, a = _owned_annotation(request, uuid, ann_id)
    if payload.resolved is not None:
        a.resolved = payload.resolved
        a.resolved_at = timezone.now() if payload.resolved else None
        a.save(update_fields=["resolved", "resolved_at"])
    return _annotation_payload(a, p)


@router.delete("/{uuid}/annotations/{ann_id}", response={204: None})
def delete_annotation(request, uuid: str, ann_id: int):
    """Hard delete one pin — its screenshot and its whole reply thread go with it (FK
    cascade). Unlike the reviewer-facing widget DELETE, which is scoped to the author's
    own feedback, the owner may remove any pin on their prototype. Irreversible, so
    clients confirm first; resolving is the reversible option."""
    _, a = _owned_annotation(request, uuid, ann_id)
    a.delete()
    return Status(204, None)


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



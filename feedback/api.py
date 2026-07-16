"""Reviewer-facing annotation endpoint — implements the SitePing widget's 4-verb
REST contract (POST/GET/PATCH/DELETE on one URL). Auth is the signed reviewer
cookie, not an API key; the author is stamped server-side, never trusted from the
client. Mounted at /api/widget, which is the widget's `endpoint`.
"""

import base64
import binascii
import hashlib
import io
import json

from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.utils import timezone
from ninja import Router

from prototypes.allowlist import is_allowed, normalize_email
from prototypes.identity import read_identity
from prototypes.models import Prototype

from .models import Annotation, AnnotationShot, Reviewer

router = Router()

# Screenshot guardrails. The client sends a WebP data URL; we never trust it — decode,
# re-encode through Pillow (neutralizes any embedded payload, normalizes format), cap
# dimensions and bytes. Oversized / undecodable / absent → no shot, comment still lands.
_SHOT_MAX_DATA_URL = 6 * 1024 * 1024  # reject giant client payloads before decoding
_SHOT_MAX_EDGE = 1600  # longest edge, px
_SHOT_MAX_BYTES = 1024 * 1024  # re-encoded ceiling


def _store_shot(annotation: Annotation, data_url: str) -> None:
    """Decode a `data:image/...;base64,...` URL, re-encode to bounded WebP, persist.
    Best-effort: any failure is swallowed so it never blocks the annotation."""
    if not data_url or not isinstance(data_url, str):
        return
    if not data_url.startswith("data:image/") or len(data_url) > _SHOT_MAX_DATA_URL:
        return
    try:
        from PIL import Image

        b64 = data_url.split(",", 1)[1]
        raw = base64.b64decode(b64, validate=True)
        img = Image.open(io.BytesIO(raw))
        img.load()  # force decode now so a corrupt payload raises here
        if img.mode not in ("RGB", "RGBA"):
            img = img.convert("RGB")
        img.thumbnail((_SHOT_MAX_EDGE, _SHOT_MAX_EDGE))  # only ever shrinks
        buf = io.BytesIO()
        img.save(buf, format="WEBP", quality=72, method=4)
        out = buf.getvalue()
        if not out or len(out) > _SHOT_MAX_BYTES:
            return
        AnnotationShot.objects.create(
            annotation=annotation,
            image=out,
            content_type="image/webp",
            width=img.width,
            height=img.height,
            byte_size=len(out),
            sha256=hashlib.sha256(out).hexdigest(),
        )
    except (ValueError, TypeError, binascii.Error, OSError, IndexError):
        return


class Denied(Exception):
    def __init__(self, status: int, detail: str):
        self.status = status
        self.detail = detail


def _gate(request, project_name: str):
    """Resolve the prototype from projectName (its UUID) and enforce the two-token
    gate: the link must be viewable AND the cookie identity must be allowlisted."""
    try:
        prototype = Prototype.objects.select_related("current_version").get(
            uuid=project_name
        )
    except (Prototype.DoesNotExist, ValueError, TypeError):
        raise Denied(404, "unknown prototype")
    if not prototype.is_viewable:
        raise Denied(403, "link expired")
    email = read_identity(request)
    if not email or not is_allowed(prototype, email):
        raise Denied(403, "not authorized")
    return prototype, email


def _body(request) -> dict:
    """Parse the JSON request body (the widget always sends application/json)."""
    try:
        data = json.loads(request.body or b"{}")
        return data if isinstance(data, dict) else {}
    except (ValueError, TypeError):
        return {}


# ── Response shaping (must match SitePing's FeedbackResponse / AnnotationResponse) ──
def _annotation_response(payload: dict, feedback_id: str, idx: int, created_at: str):
    anchor = payload.get("anchor", {}) or {}
    rect = payload.get("rect", {}) or {}
    return {
        "id": f"{feedback_id}:{idx}",
        "feedbackId": feedback_id,
        "cssSelector": anchor.get("cssSelector", ""),
        "xpath": anchor.get("xpath", ""),
        "textSnippet": anchor.get("textSnippet", ""),
        "elementTag": anchor.get("elementTag", ""),
        "elementId": anchor.get("elementId"),
        "textPrefix": anchor.get("textPrefix", ""),
        "textSuffix": anchor.get("textSuffix", ""),
        "fingerprint": anchor.get("fingerprint", ""),
        "neighborText": anchor.get("neighborText", ""),
        "anchorKey": anchor.get("anchorKey"),
        "xPct": rect.get("xPct", 0),
        "yPct": rect.get("yPct", 0),
        "wPct": rect.get("wPct", 0),
        "hPct": rect.get("hPct", 0),
        "scrollX": payload.get("scrollX", 0),
        "scrollY": payload.get("scrollY", 0),
        "viewportW": payload.get("viewportW", 0),
        "viewportH": payload.get("viewportH", 0),
        "devicePixelRatio": payload.get("devicePixelRatio", 1),
        "createdAt": created_at,
    }


def _feedback_response(a: Annotation, project_name: str) -> dict:
    fid = str(a.id)
    created = a.created_at.isoformat()
    return {
        "id": fid,
        "projectName": project_name,
        "type": a.feedback_type,
        "message": a.note,
        "status": a.status,
        "url": a.url,
        "urlPattern": None,
        "viewport": a.viewport,
        "userAgent": a.user_agent,
        "authorName": a.author_name or a.author_email,
        "authorEmail": a.author_email,
        "resolvedAt": a.resolved_at.isoformat() if a.resolved_at else None,
        "createdAt": created,
        "updatedAt": (a.resolved_at or a.created_at).isoformat(),
        "annotations": [
            _annotation_response(p, fid, i, created)
            for i, p in enumerate(a.anchors or [])
        ],
        "screenshotUrl": None,
        "diagnostics": None,
    }


# ── The four verbs (all on the router root → /api/widget) ────────────────────
@router.post("")
def create_feedback(request):
    payload = _body(request)
    try:
        prototype, email = _gate(request, payload.get("projectName", ""))
    except Denied as d:
        return JsonResponse({"detail": d.detail}, status=d.status)

    version = prototype.current_version
    if version is None:
        return JsonResponse({"detail": "no version"}, status=409)

    client_id = (payload.get("clientId") or "").strip()
    # Idempotent on clientId (the widget retries): return the existing record.
    if client_id:
        existing = Annotation.objects.filter(
            version__prototype=prototype, client_id=client_id
        ).first()
        if existing:
            return JsonResponse(
                _feedback_response(existing, str(prototype.uuid)), status=201
            )

    anchors = payload.get("annotations", []) or []
    primary = (anchors[0].get("anchor", {}) if anchors else {}) or {}

    annotation = Annotation.objects.create(
        version=version,
        author_email=email,  # stamped server-side, NOT from payload
        author_name=(payload.get("authorName") or "").strip(),
        feedback_type=payload.get("type", Annotation.OTHER),
        note=payload.get("message", ""),
        anchors=anchors,
        css_selector=primary.get("cssSelector", ""),
        element_snapshot=primary.get("textSnippet", ""),
        url=payload.get("url", ""),
        viewport=payload.get("viewport", ""),
        user_agent=payload.get("userAgent", ""),
        client_id=client_id,
    )
    _store_shot(annotation, payload.get("screenshot", ""))
    Reviewer.touch(email)
    return JsonResponse(_feedback_response(annotation, str(prototype.uuid)), status=201)


@router.get("")
def list_feedback(
    request,
    projectName: str,
    status: str | None = None,
    type: str | None = None,
    url: str | None = None,
    search: str | None = None,
    page: int = 1,
    limit: int = 100,
):
    try:
        prototype, _ = _gate(request, projectName)
    except Denied as d:
        return JsonResponse({"detail": d.detail}, status=d.status)

    qs = Annotation.objects.filter(version__prototype=prototype).prefetch_related(
        "comments"
    )
    if status == "resolved":
        qs = qs.filter(resolved=True)
    elif status == "open":
        qs = qs.filter(resolved=False)
    if type:
        qs = qs.filter(feedback_type=type)
    if url:
        qs = qs.filter(url=url)
    if search:
        qs = qs.filter(note__icontains=search)

    total = qs.count()
    limit = max(1, min(limit, 500))
    start = max(0, (page - 1) * limit)
    rows = qs.order_by("-created_at")[start : start + limit]
    return JsonResponse(
        {
            "feedbacks": [_feedback_response(a, str(prototype.uuid)) for a in rows],
            "total": total,
        }
    )


@router.patch("")
def resolve_feedback(request):
    payload = _body(request)
    try:
        prototype, _ = _gate(request, payload.get("projectName", ""))
    except Denied as d:
        return JsonResponse({"detail": d.detail}, status=d.status)
    annotation = get_object_or_404(
        Annotation, id=payload.get("id"), version__prototype=prototype
    )
    resolved = payload.get("status") == "resolved"
    annotation.resolved = resolved
    annotation.resolved_at = timezone.now() if resolved else None
    annotation.save(update_fields=["resolved", "resolved_at"])
    return JsonResponse(_feedback_response(annotation, str(prototype.uuid)))


@router.delete("")
def delete_feedback(request):
    payload = _body(request)
    try:
        prototype, email = _gate(request, payload.get("projectName", ""))
    except Denied as d:
        return JsonResponse({"detail": d.detail}, status=d.status)

    # Reviewers may only delete their OWN feedback; deleteAll is not honored here.
    if payload.get("deleteAll"):
        return JsonResponse({"deleted": False, "detail": "not permitted"}, status=403)
    annotation = Annotation.objects.filter(
        id=payload.get("id"),
        version__prototype=prototype,
        author_email=normalize_email(email),
    ).first()
    if not annotation:
        return JsonResponse({"deleted": False, "detail": "not found"}, status=404)
    annotation.delete()
    return JsonResponse({"deleted": True})

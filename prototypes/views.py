import json
from datetime import timedelta

from django.conf import settings
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.core.cache import cache
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.templatetags.static import static
from django.utils import timezone
from django.views.decorators.clickjacking import xframe_options_sameorigin
from django.views.decorators.http import require_http_methods

from accounts.models import DeviceToken
from feedback.models import Annotation
from siteconfig import conf

from .allowlist import is_allowed, normalize_email
from .identity import read_identity, set_identity
from .models import AccessRule, Prototype, PrototypeVersion


# ── Owner dashboard ──────────────────────────────────────────────────────────
@login_required
def dashboard(request):
    prototypes = (
        Prototype.objects.filter(owner=request.user)
        .select_related("current_version")
        .prefetch_related("access_rules", "versions")
    )
    tokens = request.user.tokens.all()
    if not tokens.filter(revoked_at__isnull=True).exists():
        # Ensure the owner always has at least one usable token.
        DeviceToken.objects.create(owner=request.user, label="default")
        tokens = request.user.tokens.all()
    return render(
        request,
        "dashboard/index.html",
        {
            "prototypes": prototypes,
            "tokens": tokens,
            # Visible prefill only — the upload applies exactly what's in the form.
            "default_domain": request.user.default_allow_domain
            or conf.get_str("DEFAULT_ALLOW_DOMAIN"),
        },
    )


@login_required
@require_http_methods(["POST"])
def dashboard_upload(request):
    upload = request.FILES.get("html")
    if not upload:
        messages.error(request, "Choose an HTML file to upload.")
        return redirect("dashboard")
    try:
        content = upload.read().decode("utf-8")
    except UnicodeDecodeError:
        messages.error(request, "The file must be UTF-8 HTML.")
        return redirect("dashboard")

    name = request.POST.get("name") or upload.name or "Untitled prototype"
    prototype = Prototype(owner=request.user, name=name)
    prototype.save()

    for raw in (request.POST.get("domains") or "").replace("\n", ",").split(","):
        if raw.strip():
            AccessRule.objects.get_or_create(
                prototype=prototype,
                kind=AccessRule.DOMAIN,
                value=raw.strip().lstrip("@"),
            )
    for raw in (request.POST.get("emails") or "").replace("\n", ",").split(","):
        if raw.strip():
            AccessRule.objects.get_or_create(
                prototype=prototype, kind=AccessRule.EMAIL, value=raw.strip()
            )

    version = PrototypeVersion.objects.create(
        prototype=prototype, version_number=1, html_content=content
    )
    prototype.current_version = version
    prototype.save(update_fields=["current_version"])
    messages.success(request, f"Shared “{prototype.name}”. Link ready below.")
    return redirect("dashboard")


@login_required
@require_http_methods(["POST"])
def prototype_action(request, uuid):
    prototype = get_object_or_404(Prototype, uuid=uuid, owner=request.user)
    action = request.POST.get("action")
    if action == "deactivate":
        prototype.is_active = False
        prototype.save(update_fields=["is_active"])
        messages.success(request, "Deactivated.")
    elif action == "reactivate":
        prototype.is_active = True
        if prototype.is_expired:
            prototype.expires_at = timezone.now() + timedelta(
                hours=settings.PROTOTYPE_EXPIRY_HOURS
            )
        prototype.save(update_fields=["is_active", "expires_at"])
        messages.success(request, "Re-opened.")
    elif action == "delete":
        name = prototype.name
        prototype.delete()
        messages.success(request, f"Deleted “{name}” and all its feedback.")
    return redirect("dashboard")


@login_required
@require_http_methods(["POST"])
def token_action(request):
    action = request.POST.get("action")
    if action == "create":
        DeviceToken.objects.create(owner=request.user, label=request.POST.get("label", ""))
        messages.success(request, "New token minted.")
    elif action == "revoke":
        token = get_object_or_404(
            DeviceToken, pk=request.POST.get("token_id"), owner=request.user
        )
        token.revoke()
        messages.success(request, "Token revoked.")
    return redirect("dashboard")


@login_required
def prototype_feedback(request, uuid):
    """Human-readable feedback view in the dashboard (the agent payload has its own
    API endpoint). Lists annotations + threads for the owner."""
    prototype = get_object_or_404(Prototype, uuid=uuid, owner=request.user)
    annotations = (
        Annotation.objects.filter(version__prototype=prototype)
        .select_related("version")
        .prefetch_related("comments")
    )
    return render(
        request,
        "dashboard/feedback.html",
        {"prototype": prototype, "annotations": annotations},
    )


# ── Reviewer flow ────────────────────────────────────────────────────────────
def viewer(request, uuid):
    prototype = get_object_or_404(
        Prototype.objects.select_related("current_version"), uuid=uuid
    )
    if not prototype.is_viewable:
        return render(request, "prototypes/gone.html", {"prototype": prototype}, status=410)

    email = read_identity(request)
    if not email:
        return redirect("enter", uuid=uuid)
    if not is_allowed(prototype, email):
        return render(
            request, "prototypes/denied.html", {"email": email}, status=403
        )
    version = prototype.current_version
    if version is None:
        return render(request, "prototypes/gone.html", {"prototype": prototype}, status=410)

    # Serve the prototype TOP-LEVEL (no iframe) with the SitePing overlay + the ProtoPeek
    # reviewer bar injected. position:fixed inside an iframe is unreliable on iOS Safari —
    # the comment FAB gets stranded behind the browser chrome, and the fixed iframe shell
    # can't scroll to reveal it. Rendering top-level pins the FAB to the real viewport and
    # lets the page scroll normally.
    html = _inject_overlay(version.html_content, str(prototype.uuid), email)
    html = _inject_chrome(html, prototype, email)
    resp = HttpResponse(html, content_type="text/html; charset=utf-8")
    # Never cache: a new version (--update) or a shipped viewer fix must reach reviewers
    # on the next load, not from a stale browser copy.
    resp["Cache-Control"] = "no-store, must-revalidate"
    return resp


@require_http_methods(["GET", "POST"])
def enter(request, uuid):
    prototype = get_object_or_404(Prototype, uuid=uuid)
    if not prototype.is_viewable:
        return render(request, "prototypes/gone.html", {"prototype": prototype}, status=410)

    # If they already have a valid, allowed identity, skip the form.
    existing = read_identity(request)
    if existing and is_allowed(prototype, existing):
        return redirect("viewer", uuid=uuid)

    if request.method == "POST":
        ip = request.META.get("REMOTE_ADDR", "?")
        bucket = f"enter:{ip}:{uuid}"
        attempts = cache.get(bucket, 0)
        if attempts >= conf.get_int("ENTER_RATE_LIMIT"):
            messages.error(request, "Too many attempts. Try again shortly.")
            return render(request, "prototypes/enter.html", {"prototype": prototype}, status=429)
        cache.set(bucket, attempts + 1, conf.get_int("ENTER_RATE_WINDOW"))

        email = normalize_email(request.POST.get("email", ""))
        if is_allowed(prototype, email):
            response = redirect("viewer", uuid=uuid)
            set_identity(response, email)
            return response
        messages.error(request, "That email isn’t on the reviewer list for this prototype.")

    return render(request, "prototypes/enter.html", {"prototype": prototype})


@xframe_options_sameorigin
def raw(request, uuid):
    """The gated prototype HTML, with the SitePing overlay injected. Served
    SAMEORIGIN so the viewer shell's iframe can embed it, and re-gated on every
    load (a raw URL is only reachable with a valid link + allowed cookie)."""
    prototype = get_object_or_404(
        Prototype.objects.select_related("current_version"), uuid=uuid
    )
    if not prototype.is_viewable:
        return HttpResponse("This link has expired.", status=410)
    email = read_identity(request)
    if not email or not is_allowed(prototype, email):
        return HttpResponse("Not authorized.", status=403)
    version = prototype.current_version
    if version is None:
        return HttpResponse("No version uploaded yet.", status=404)

    html = _inject_overlay(version.html_content, str(prototype.uuid), email)
    resp = HttpResponse(html, content_type="text/html; charset=utf-8")
    # Never cache the gated HTML: a new version (--update) or a redeployed overlay
    # asset must reach reviewers immediately, not from a stale browser copy.
    resp["Cache-Control"] = "no-store, must-revalidate"
    return resp


def _inject_overlay(html: str, project_name: str, email: str) -> str:
    """Append the SitePing loader + init just before </body> (or at the end)."""
    ident = json.dumps({"name": email, "email": email})
    config = (
        '{endpoint:"/api/widget",'
        f"projectName:{json.dumps(project_name)},"
        f"identity:{ident},"
        # SitePing hides itself on viewports < 768px by DESIGN — this is the sole reason
        # the overlay never mounted on mobile. Override both guards so it mounts anywhere.
        "minViewportWidth:0,forceShow:true,"
        # bottom-right is the only valid launcher position; viewer-chrome.js drives the
        # actions from the reviewer bar and hides the launcher itself.
        'position:"bottom-right"}'
    )
    # Capture any SitePing init failure (it can throw on some mobile browsers and never
    # mount the widget) so the reviewer bar can surface the real reason instead of a
    # silent no-op. window.__pp_sp_err is read by viewer-chrome.js.
    snippet = (
        # Polyfill requestIdleCallback (iOS Safari < 16.4 lacks it; SitePing calls it
        # unguarded, which throws during init and prevents the widget from mounting).
        "\n<script>\n"
        "window.requestIdleCallback=window.requestIdleCallback||function(cb){var s=Date.now();"
        "return setTimeout(function(){cb({didTimeout:false,timeRemaining:function(){"
        "return Math.max(0,50-(Date.now()-s));}});},1);};\n"
        "window.cancelIdleCallback=window.cancelIdleCallback||function(id){clearTimeout(id);};\n"
        "</script>\n"
        f'<script src="{static("js/siteping.global.js")}"></script>\n'
        "<script>\n"
        "window.addEventListener('error',function(ev){if(!window.__pp_sp_err&&ev)"
        "window.__pp_sp_err=(ev.message||'error')+' @'+((ev.filename||'').split('/').pop())+':'+(ev.lineno||'');});\n"
        "window.addEventListener('unhandledrejection',function(ev){if(!window.__pp_sp_err)"
        "window.__pp_sp_err='promise: '+((ev.reason&&ev.reason.message)?ev.reason.message:String(ev.reason));});\n"
        "try{window.__pp_sp=window.SitePing.initSiteping(" + config + ");}"
        "catch(e){window.__pp_sp_err=(e&&e.message?e.message:String(e))"
        "+(e&&e.stack?' | '+String(e.stack).split('\\n')[1]:'');}\n"
        "</script>\n"
    )
    lower = html.lower()
    idx = lower.rfind("</body>")
    if idx != -1:
        return html[:idx] + snippet + html[idx:]
    return html + snippet


def _inject_chrome(html: str, prototype, email: str) -> str:
    """Inject the fixed ProtoPeek reviewer bar into the top-level prototype page.
    Values ride in a JSON island (< escaped so they can't break out of the tag) and
    are rendered via textContent in viewer-chrome.js — no HTML interpolation, so an
    owner-set prototype name can't inject markup."""
    version = prototype.current_version.version_number if prototype.current_version else ""
    data = json.dumps(
        {
            "uuid": str(prototype.uuid),
            "name": prototype.name,
            "version": f"v{version}" if version else "",
            "email": email,
            "h2c": static("js/html2canvas.min.js"),
        }
    ).replace("<", "\\u003c")
    snippet = (
        # Suppress iOS's double-tap-to-zoom and the tap-hold selection loupe/magnifier
        # while reviewing (they fire mid-drag when drawing an annotation box). Re-enabled
        # inside the SitePing widget + form fields so the comment composer still works.
        "\n<style>"
        "body{touch-action:manipulation;-webkit-touch-callout:none;"
        "-webkit-user-select:none;user-select:none}"
        "siteping-widget,input,textarea,select,[contenteditable]"
        "{-webkit-user-select:text;user-select:text;-webkit-touch-callout:default}"
        # SitePing renders the comment composer in the LIGHT DOM under
        # [data-siteping-ignore]; force >=16px there so iOS doesn't auto-zoom on focus.
        "[data-siteping-ignore] textarea,[data-siteping-ignore] input,"
        "[data-siteping-ignore] select,[data-siteping-ignore] [contenteditable]"
        "{font-size:16px !important}"
        "</style>\n"
        f'<script type="application/json" id="__pp_bar_data">{data}</script>\n'
        f'<script src="{static("js/viewer-chrome.js")}"></script>\n'
    )
    lower = html.lower()
    idx = lower.rfind("</body>")
    if idx != -1:
        return html[:idx] + snippet + html[idx:]
    return html + snippet


def whoami(request):
    """Current reviewer identity for the UI (cookie stays HttpOnly)."""
    return JsonResponse({"email": read_identity(request)})

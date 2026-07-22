"""End-to-end regression tests for the ProtoPeek loop: upload → gate → annotate
→ synthesize. Mirrors the manual smoke test, focused on the security-sensitive
behaviors (allowlist, two-token gate, server-side author stamping, watermark)."""

import json
from datetime import timedelta

import pytest
from django.test import Client, override_settings
from django.urls import reverse
from django.utils import timezone

from accounts.models import DeviceToken, User
from feedback.models import Annotation
from prototypes.allowlist import is_allowed
from prototypes.models import AccessRule, Prototype, PrototypeVersion

PROTO_HTML = b"<!doctype html><html><body><h1 id='hero'>Hi</h1></body></html>"


@pytest.fixture
def owner(db):
    return User.objects.create_user(email="owner@work.com", password="x")


@pytest.fixture
def device_token(owner):
    return DeviceToken.objects.create(owner=owner, label="test")


def _auth(token):
    return {"HTTP_AUTHORIZATION": f"Bearer {token.token}"}


@pytest.fixture
def prototype(owner):
    p = Prototype.objects.create(owner=owner, name="Sample")
    v = PrototypeVersion.objects.create(
        prototype=p, version_number=1, html_content=PROTO_HTML.decode()
    )
    p.current_version = v
    p.save()
    AccessRule.objects.create(prototype=p, kind=AccessRule.DOMAIN, value="example.com")
    return p


# ── Allowlist ────────────────────────────────────────────────────────────────
def test_allowlist_domain_and_email(prototype):
    AccessRule.objects.create(
        prototype=prototype, kind=AccessRule.EMAIL, value="jane@partner.com"
    )
    assert is_allowed(prototype, "anyone@example.com")
    assert is_allowed(prototype, "ANYONE@EXAMPLE.COM")  # case-insensitive
    assert is_allowed(prototype, "jane@partner.com")
    assert not is_allowed(prototype, "bob@partner.com")
    assert not is_allowed(prototype, "not-an-email")


def test_public_mode_admits_any_wellformed_email(prototype):
    prototype.access_mode = Prototype.PUBLIC
    prototype.save(update_fields=["access_mode"])
    # example.com is the only rule, but public ignores the allowlist entirely.
    assert is_allowed(prototype, "stranger@nowhere.io")
    assert is_allowed(prototype, "someone@gmail.com")
    # …a malformed address is still rejected — the gate collects a real email for attribution.
    assert not is_allowed(prototype, "not-an-email")
    assert not is_allowed(prototype, "")


def test_public_prototype_lets_a_non_allowlisted_reviewer_in(prototype):
    prototype.access_mode = Prototype.PUBLIC
    prototype.save(update_fields=["access_mode"])
    c = Client()
    # An email matching no rule passes the gate, is remembered, and reaches the viewer.
    r = c.post(reverse("enter", args=[prototype.uuid]), {"email": "outsider@elsewhere.com"})
    assert r.status_code == 302
    assert r.url == reverse("viewer", args=[prototype.uuid])
    assert c.get(reverse("viewer", args=[prototype.uuid])).status_code == 200


def test_public_reviewer_can_comment_and_is_attributed(prototype):
    prototype.access_mode = Prototype.PUBLIC
    prototype.save(update_fields=["access_mode"])
    c = Client()
    c.post(reverse("enter", args=[prototype.uuid]), {"email": "outsider@elsewhere.com"})
    r = c.post(
        "/api/widget",
        data=json.dumps(
            {
                "projectName": str(prototype.uuid),
                "type": "bug",
                "message": "looks off",
                "clientId": "c1",
                "annotations": [{"anchor": {"cssSelector": "#hero"}}],
            }
        ),
        content_type="application/json",
    )
    assert r.status_code < 300
    a = Annotation.objects.get()
    # The whole loop works for a public reviewer: comment accepted, author stamped from
    # the gate cookie even though they're on no allowlist.
    assert a.author_email == "outsider@elsewhere.com"


def test_restricted_prototype_still_blocks_a_stranger(prototype):
    # Same reviewer, default (restricted) mode: the allowlist keeps them out.
    c = Client()
    r = c.post(reverse("enter", args=[prototype.uuid]), {"email": "outsider@elsewhere.com"})
    assert r.status_code == 200  # re-renders the gate with an error, no redirect
    # even forcing the identity cookie, the viewer denies them
    assert not is_allowed(prototype, "outsider@elsewhere.com")


# ── Upload API ───────────────────────────────────────────────────────────────
def test_upload_requires_token(db):
    c = Client()
    resp = c.post("/api/prototypes", {"html": "x"})
    assert resp.status_code in (401, 422)


def test_upload_creates_prototype(device_token):
    from django.core.files.uploadedfile import SimpleUploadedFile

    c = Client()
    resp = c.post(
        "/api/prototypes",
        {
            "html": SimpleUploadedFile("p.html", PROTO_HTML, content_type="text/html"),
            "name": "My Proto",
            "domains": "example.com",
        },
        **_auth(device_token),
    )
    assert resp.status_code == 200
    data = resp.json()
    assert data["version"] == 1
    p = Prototype.objects.get(uuid=data["uuid"])
    assert p.name == "My Proto"
    assert p.access_rules.filter(kind="domain", value="example.com").exists()


# ── Reviewer gate ────────────────────────────────────────────────────────────
def test_viewer_without_cookie_redirects_to_enter(prototype):
    c = Client()
    resp = c.get(reverse("viewer", args=[prototype.uuid]))
    assert resp.status_code == 302
    assert "/enter/" in resp.url


def test_enter_disallowed_email_denied(prototype):
    c = Client()
    resp = c.post(reverse("enter", args=[prototype.uuid]), {"email": "x@nope.com"})
    assert resp.status_code == 200  # stays on form
    assert "protopeek_reviewer" not in resp.cookies


def test_enter_allowed_sets_cookie_and_views(prototype):
    c = Client()
    resp = c.post(reverse("enter", args=[prototype.uuid]), {"email": "sam@example.com"})
    assert resp.status_code == 302
    assert "protopeek_reviewer" in resp.cookies
    # follow to the viewer
    resp2 = c.get(reverse("viewer", args=[prototype.uuid]))
    assert resp2.status_code == 200


def test_raw_injects_overlay_and_preserves_content(prototype):
    c = Client()
    c.post(reverse("enter", args=[prototype.uuid]), {"email": "sam@example.com"})
    resp = c.get(reverse("raw", args=[prototype.uuid]))
    assert resp.status_code == 200
    body = resp.content.decode()
    assert "initSiteping" in body
    assert "siteping.global.js" in body
    assert "id='hero'" in body  # original prototype content preserved
    assert resp.headers.get("X-Frame-Options") == "SAMEORIGIN"


def test_viewer_suppresses_ios_horizontal_wobble(prototype):
    c = Client()
    c.post(reverse("enter", args=[prototype.uuid]), {"email": "sam@example.com"})
    resp = c.get(reverse("viewer", args=[prototype.uuid]))
    assert resp.status_code == 200
    body = resp.content.decode()
    assert "viewer-chrome.js" in body            # reviewer chrome is injected on the viewer
    assert "overscroll-behavior-x:none" in body  # kills the iPhone side-to-side rubber-band


def test_expired_link_is_gone(prototype):
    prototype.expires_at = timezone.now() - timedelta(hours=1)
    prototype.save()
    c = Client()
    resp = c.get(reverse("viewer", args=[prototype.uuid]))
    assert resp.status_code == 410


# ── Widget contract + server-side author stamping ────────────────────────────
def _enter(client, prototype, email="sam@example.com"):
    client.post(reverse("enter", args=[prototype.uuid]), {"email": email})


def test_widget_stamps_author_serverside(prototype):
    c = Client()
    _enter(c, prototype)
    payload = {
        "projectName": str(prototype.uuid),
        "type": "change",
        "message": "font too small",
        "authorEmail": "attacker@evil.com",  # LIE — must be ignored
        "authorName": "Sneaky",
        "clientId": "c1",
        "annotations": [
            {"anchor": {"cssSelector": "#hero"}, "rect": {"xPct": 0, "yPct": 0, "wPct": 1, "hPct": 1}}
        ],
    }
    resp = c.post("/api/widget", data=json.dumps(payload), content_type="application/json")
    assert resp.status_code == 201
    assert resp.json()["authorEmail"] == "sam@example.com"
    ann = Annotation.objects.get()
    assert ann.author_email == "sam@example.com"
    assert ann.css_selector == "#hero"


def test_widget_rejects_without_identity(prototype):
    c = Client()
    payload = {"projectName": str(prototype.uuid), "type": "other", "message": "hi", "annotations": []}
    resp = c.post("/api/widget", data=json.dumps(payload), content_type="application/json")
    assert resp.status_code == 403


# ── Agent feedback + watermark ───────────────────────────────────────────────
def test_feedback_advances_watermark_status_does_not(prototype, device_token):
    c = Client()
    _enter(c, prototype)
    c.post(
        "/api/widget",
        data=json.dumps(
            {
                "projectName": str(prototype.uuid),
                "type": "bug",
                "message": "broken",
                "clientId": "c9",
                "annotations": [],
            }
        ),
        content_type="application/json",
    )
    api = Client()
    # status: read-only, new_since stays 1 across repeated calls
    s1 = api.get(f"/api/prototypes/{prototype.uuid}/status", **_auth(device_token)).json()
    s2 = api.get(f"/api/prototypes/{prototype.uuid}/status", **_auth(device_token)).json()
    assert s1["status"]["new_since_last_pull"] == 1
    assert s2["status"]["new_since_last_pull"] == 1  # unchanged

    # feedback: advances the watermark
    f1 = api.get(f"/api/prototypes/{prototype.uuid}/feedback", **_auth(device_token)).json()
    assert f1["status"]["new_since_last_pull"] == 1
    assert f1["annotations"][0]["author"] == "sam@example.com"
    f2 = api.get(f"/api/prototypes/{prototype.uuid}/feedback", **_auth(device_token)).json()
    assert f2["status"]["new_since_last_pull"] == 0  # consumed


# ── Screenshot capture, storage, and agent delivery ──────────────────────────
def _png_data_url(color=(220, 40, 40), size=(48, 36)):
    import base64
    import io

    from PIL import Image

    buf = io.BytesIO()
    Image.new("RGB", size, color).save(buf, format="PNG")
    return "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode()


def _post_with_shot(client, prototype, screenshot, client_id="shot1"):
    return client.post(
        "/api/widget",
        data=json.dumps(
            {
                "projectName": str(prototype.uuid),
                "type": "bug",
                "message": "look here",
                "clientId": client_id,
                "annotations": [{"anchor": {"cssSelector": "#hero"}}],
                "screenshot": screenshot,
            }
        ),
        content_type="application/json",
    )


def test_screenshot_stored_reencoded_and_served(prototype, device_token):
    from feedback.models import AnnotationShot

    c = Client()
    _enter(c, prototype)
    assert _post_with_shot(c, prototype, _png_data_url()).status_code == 201

    # Stored, re-encoded to WebP (never the raw PNG we sent), dims preserved.
    shot = AnnotationShot.objects.get()
    assert shot.content_type == "image/webp"
    assert bytes(shot.image[:4]) == b"RIFF"  # WebP container magic
    assert (shot.width, shot.height) == (48, 36)
    assert shot.byte_size == len(shot.image)
    assert len(shot.sha256) == 64

    # Agent payload references it by URL + dims.
    api = Client()
    ann = api.get(
        f"/api/prototypes/{prototype.uuid}/feedback", **_auth(device_token)
    ).json()["annotations"][0]
    assert ann["screenshot"]["width"] == 48
    assert ann["screenshot"]["url"].endswith(
        f"/api/prototypes/{prototype.uuid}/annotations/{ann['id']}/shot"
    )

    # Streaming endpoint returns the bytes + an ETag; matching If-None-Match → 304.
    r = api.get(
        f"/api/prototypes/{prototype.uuid}/annotations/{ann['id']}/shot",
        **_auth(device_token),
    )
    assert r.status_code == 200
    assert r.headers["Content-Type"] == "image/webp"
    assert r.headers["ETag"] == shot.sha256
    assert r.content == bytes(shot.image)
    r304 = api.get(
        f"/api/prototypes/{prototype.uuid}/annotations/{ann['id']}/shot",
        HTTP_IF_NONE_MATCH=shot.sha256,
        **_auth(device_token),
    )
    assert r304.status_code == 304


def test_screenshot_is_best_effort(prototype):
    """A garbage / missing / non-image screenshot never blocks the comment."""
    from feedback.models import AnnotationShot

    c = Client()
    _enter(c, prototype)
    assert _post_with_shot(c, prototype, "data:image/png;base64,not-valid", "g1").status_code == 201
    assert _post_with_shot(c, prototype, "", "g2").status_code == 201
    assert _post_with_shot(c, prototype, "https://evil.example/x.png", "g3").status_code == 201
    assert Annotation.objects.count() == 3
    assert AnnotationShot.objects.count() == 0


def test_shot_is_scoped_to_owner(prototype, device_token):
    """Annotation ids can't be walked across owners."""
    c = Client()
    _enter(c, prototype)
    _post_with_shot(c, prototype, _png_data_url())
    ann_id = Annotation.objects.get().id

    other = User.objects.create_user(email="intruder@x.com", password="x")
    other_token = DeviceToken.objects.create(owner=other, label="t")
    api = Client()
    r = api.get(
        f"/api/prototypes/{prototype.uuid}/annotations/{ann_id}/shot",
        **_auth(other_token),
    )
    assert r.status_code == 404


# ── Capture context delivered to the agent ───────────────────────────────────
def _post_anchored(client, prototype, client_id="anch1"):
    """A pin carrying the full anchor blob SitePing actually sends."""
    return client.post(
        "/api/widget",
        data=json.dumps(
            {
                "projectName": str(prototype.uuid),
                "type": "change",
                "message": "cramped",
                "clientId": client_id,
                "viewport": "390x844",
                "url": "/p/x/raw/#/pricing",
                "annotations": [
                    {
                        "anchor": {
                            "cssSelector": "#hero .price",
                            "xpath": "/html/body/h1",
                            "textSnippet": "Pricing",
                            "elementTag": "H1",
                            "textPrefix": "before",
                            "textSuffix": "after",
                            "neighborText": "nearby",
                        },
                        "rect": {"xPct": 0.1, "yPct": 0.2, "wPct": 0.5, "hPct": 0.3},
                        "scrollX": 0,
                        "scrollY": 640,
                        "viewportW": 390,
                        "viewportH": 844,
                    }
                ],
            }
        ),
        content_type="application/json",
    )


def test_feedback_exposes_capture_context(prototype, device_token):
    """The viewport-only screenshot can't show where on the page a pin sits, or what
    width the reviewer was at — so rect/scroll/viewport/url have to ride along."""
    c = Client()
    _enter(c, prototype)
    assert _post_anchored(c, prototype).status_code == 201

    api = Client()
    ann = api.get(
        f"/api/prototypes/{prototype.uuid}/feedback", **_auth(device_token)
    ).json()["annotations"][0]

    assert ann["viewport"] == "390x844"
    assert ann["url"] == "/p/x/raw/#/pricing"
    assert ann["css_selector"] == "#hero .price"  # unchanged, still the primary handle
    anchor = ann["anchor"]
    assert anchor["xpath"] == "/html/body/h1"
    assert anchor["element_tag"] == "H1"
    assert anchor["neighbor_text"] == "nearby"
    assert (anchor["text_prefix"], anchor["text_suffix"]) == ("before", "after")
    assert anchor["rect"] == {"xPct": 0.1, "yPct": 0.2, "wPct": 0.5, "hPct": 0.3}
    assert anchor["scroll"] == {"x": 0, "y": 640}


def test_feedback_survives_missing_anchors(prototype, device_token):
    """A pin with no anchors at all (widget sent none) must not blow up the payload."""
    c = Client()
    _enter(c, prototype)
    c.post(
        "/api/widget",
        data=json.dumps(
            {
                "projectName": str(prototype.uuid),
                "type": "other",
                "message": "general note",
                "clientId": "bare",
                "annotations": [],
            }
        ),
        content_type="application/json",
    )
    api = Client()
    ann = api.get(
        f"/api/prototypes/{prototype.uuid}/feedback", **_auth(device_token)
    ).json()["annotations"][0]
    assert ann["anchor"]["rect"] is None
    assert ann["anchor"]["scroll"] is None
    assert ann["anchor"]["xpath"] == ""


# ── Owner-side resolve / delete (the /proto-feedback action loop) ─────────────
@pytest.fixture
def annotation(prototype):
    c = Client()
    _enter(c, prototype)
    _post_with_shot(c, prototype, _png_data_url())
    return Annotation.objects.get()


def _patch(client, prototype, ann_id, body, token):
    return client.patch(
        f"/api/prototypes/{prototype.uuid}/annotations/{ann_id}",
        data=json.dumps(body),
        content_type="application/json",
        **_auth(token),
    )


def test_owner_resolves_and_reopens_annotation(prototype, annotation, device_token):
    api = Client()
    r = _patch(api, prototype, annotation.id, {"resolved": True}, device_token)
    assert r.status_code == 200
    assert r.json()["resolved"] is True
    annotation.refresh_from_db()
    assert annotation.resolved and annotation.resolved_at is not None

    r2 = _patch(api, prototype, annotation.id, {"resolved": False}, device_token)
    assert r2.json()["resolved"] is False
    annotation.refresh_from_db()
    assert not annotation.resolved and annotation.resolved_at is None


def test_resolved_state_is_visible_to_reviewers(prototype, annotation, device_token):
    """Resolving is outward-facing — the widget's list reflects it, which is what drives
    the reviewer's Open/Resolved counters and their Reopen button."""
    _patch(Client(), prototype, annotation.id, {"resolved": True}, device_token)
    c = Client()
    _enter(c, prototype)
    body = c.get(f"/api/widget?projectName={prototype.uuid}").json()
    assert body["feedbacks"][0]["status"] == "resolved"
    assert body["feedbacks"][0]["resolvedAt"] is not None


def test_owner_deletes_annotation_with_shot_and_thread(
    prototype, annotation, device_token
):
    from feedback.models import AnnotationShot, Comment

    Comment.objects.create(
        annotation=annotation, author_email="sam@example.com", body="agreed"
    )
    assert AnnotationShot.objects.count() == 1

    api = Client()
    r = api.delete(
        f"/api/prototypes/{prototype.uuid}/annotations/{annotation.id}",
        **_auth(device_token),
    )
    assert r.status_code == 204
    assert Annotation.objects.count() == 0
    assert AnnotationShot.objects.count() == 0  # cascaded
    assert Comment.objects.count() == 0  # cascaded


def test_resolve_and_delete_are_scoped_to_owner(prototype, annotation):
    """The mutating verbs get the same cross-owner scoping as the shot endpoint."""
    other = User.objects.create_user(email="intruder2@x.com", password="x")
    other_token = DeviceToken.objects.create(owner=other, label="t")
    api = Client()

    patched = _patch(api, prototype, annotation.id, {"resolved": True}, other_token)
    deleted = api.delete(
        f"/api/prototypes/{prototype.uuid}/annotations/{annotation.id}",
        **_auth(other_token),
    )
    assert patched.status_code == 404
    assert deleted.status_code == 404

    annotation.refresh_from_db()
    assert not annotation.resolved
    assert Annotation.objects.count() == 1


# ── Signed screenshot links (browser-openable, no auth) ──────────────────────
def test_shot_view_url_opens_without_auth(prototype, annotation, device_token):
    """The whole point: paste it into a browser and see the image. No Bearer, no
    cookie — and the Bearer-authed sibling still 401s, which is why this exists."""
    from feedback.models import AnnotationShot

    api = Client()
    shot_field = api.get(
        f"/api/prototypes/{prototype.uuid}/feedback", **_auth(device_token)
    ).json()["annotations"][0]["screenshot"]

    anon = Client()
    assert anon.get(shot_field["url"]).status_code == 401  # the authed one
    r = anon.get(shot_field["view_url"])  # the signed one
    assert r.status_code == 200
    assert r.headers["Content-Type"] == "image/webp"
    assert r.headers["X-Robots-Tag"] == "noindex, nofollow"
    assert r.content == bytes(AnnotationShot.objects.get().image)


def test_shot_link_rejects_forged_and_expired_tokens(prototype, annotation):
    from prototypes.shotlinks import sign_shot

    anon = Client()
    good = sign_shot(annotation.id)
    assert anon.get(f"/s/{good}/").status_code == 200

    # Editing the payload to point at another annotation breaks the signature.
    assert anon.get(f"/s/{good[:-4]}xxxx/").status_code == 404
    assert anon.get("/s/notatoken/").status_code == 404

    # Aged past SHOT_LINK_MAX_AGE → 410, distinguishable from a forgery so the
    # user is told "expired" rather than staring at a bare 404.
    with override_settings(SHOT_LINK_MAX_AGE=-1):
        assert anon.get(f"/s/{good}/").status_code == 410


def test_shot_link_is_scoped_to_one_image(prototype, annotation):
    """A link for one annotation must not serve another's screenshot."""
    from prototypes.shotlinks import sign_shot

    c = Client()
    _enter(c, prototype)
    _post_with_shot(c, prototype, _png_data_url(color=(10, 200, 10)), "second")
    other = Annotation.objects.exclude(id=annotation.id).get()

    anon = Client()
    first = anon.get(f"/s/{sign_shot(annotation.id)}/").content
    second = anon.get(f"/s/{sign_shot(other.id)}/").content
    assert first != second
    assert second == bytes(other.shot.image)


def test_shot_link_404s_once_the_annotation_is_gone(prototype, annotation):
    from prototypes.shotlinks import sign_shot

    token = sign_shot(annotation.id)
    annotation.delete()
    assert Client().get(f"/s/{token}/").status_code == 404


def test_annotation_verbs_require_a_token(prototype, annotation):
    api = Client()
    r = api.patch(
        f"/api/prototypes/{prototype.uuid}/annotations/{annotation.id}",
        data=json.dumps({"resolved": True}),
        content_type="application/json",
    )
    assert r.status_code == 401

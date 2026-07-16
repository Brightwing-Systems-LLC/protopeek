"""End-to-end regression tests for the ProtoPeek loop: upload → gate → annotate
→ synthesize. Mirrors the manual smoke test, focused on the security-sensitive
behaviors (allowlist, two-token gate, server-side author stamping, watermark)."""

import json
from datetime import timedelta

import pytest
from django.test import Client
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

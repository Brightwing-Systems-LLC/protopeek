"""Token-first onboarding: mint a token with no signup, use it, sign in with it."""

import json
from datetime import datetime, timedelta

from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse
from django.utils import timezone

from accounts.models import DeviceToken

HTML = b"<!doctype html><html><body><h1>Hi</h1></body></html>"


def _mint(client, **body):
    return client.post("/api/tokens", data=json.dumps(body), content_type="application/json")


def _auth(token):
    """Bearer auth header kwargs for the Django test client."""
    return {"HTTP_AUTHORIZATION": f"Bearer {token}"}


def test_mint_token_needs_no_auth(db, client):
    resp = _mint(client, label="laptop", default_domain="acme.com")
    assert resp.status_code == 200
    data = resp.json()
    assert data["token"].startswith("pp_")
    dt = DeviceToken.objects.get(token=data["token"])
    assert dt.owner.is_provisional is True
    assert dt.owner.default_allow_domain == "acme.com"


def test_me_reports_provisional_status(db, client):
    token = _mint(client, default_domain="acme.com").json()["token"]
    data = client.get("/api/me", **_auth(token)).json()
    assert data["provisional"] is True
    assert data["default_domain"] == "acme.com"
    assert data["active_prototypes"] == 0
    assert "max_active_prototypes" not in data  # cap removed — flat 30d, no tiers


def test_upload_auto_seeds_owner_default_domain(db, client):
    token = _mint(client, default_domain="acme.com").json()["token"]
    # no --allow / domains passed; server seeds the owner's default
    resp = client.post(
        "/api/prototypes",
        {"html": SimpleUploadedFile("p.html", HTML, content_type="text/html"), "name": "P"},
        **_auth(token),
    )
    assert resp.status_code == 200
    rules = client.get("/api/prototypes", **_auth(token)).json()[0]["rules"]
    assert {"kind": "domain", "value": "acme.com"} in rules


def test_no_active_cap_on_uploads(db, client):
    """The free-token active-prototype cap was removed — uploads never 402."""
    token = _mint(client).json()["token"]

    def up(name):
        return client.post(
            "/api/prototypes",
            {"html": SimpleUploadedFile("p.html", HTML, content_type="text/html"), "name": name},
            **_auth(token),
        )

    for i in range(8):
        assert up(f"proto-{i}").status_code == 200
    assert len(client.get("/api/prototypes", **_auth(token)).json()) == 8


def test_upload_expiry_is_flat_30d_ignoring_override(db, client):
    """Retention is a flat 30 days for everyone; a client-supplied expires_hours
    is ignored (the override was removed)."""
    token = _mint(client).json()["token"]
    resp = client.post(
        "/api/prototypes",
        {
            "html": SimpleUploadedFile("p.html", HTML, content_type="text/html"),
            "name": "P",
            "expires_hours": "1",  # override attempt — must be ignored
        },
        **_auth(token),
    )
    assert resp.status_code == 200
    expires_at = datetime.fromisoformat(resp.json()["expires_at"])
    # ~30 days out, and definitely not the 1-hour override.
    assert expires_at - timezone.now() > timedelta(days=29)


def test_sign_in_with_token(db, client):
    token = _mint(client).json()["token"]
    resp = client.post(reverse("token_signin"), {"token": token})
    assert resp.status_code == 302 and resp.url == reverse("dashboard")
    assert client.get(reverse("dashboard")).status_code == 200


def test_claim_upgrades_provisional_owner(db, client):
    token = _mint(client).json()["token"]
    client.post(reverse("token_signin"), {"token": token})
    resp = client.post(reverse("claim"), {"email": "me@work.com", "password": "supersecret1"})
    assert resp.status_code == 302
    owner = DeviceToken.objects.get(token=token).owner
    owner.refresh_from_db()
    assert owner.is_provisional is False
    assert owner.email == "me@work.com"
    assert owner.default_allow_domain == "work.com"
    assert owner.has_usable_password()

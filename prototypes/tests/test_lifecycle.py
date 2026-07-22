"""Lifecycle management: PATCH (rename / deactivate / reactivate), DELETE (hard delete
with full cascade), the retention purge, and the list endpoint's activity hints."""

import json
from datetime import timedelta
from io import StringIO

import pytest
from django.conf import settings
from django.core.management import call_command
from django.test import Client
from django.urls import reverse
from django.utils import timezone

from accounts.models import DeviceToken, User
from feedback.models import Annotation, Comment
from prototypes.models import AccessRule, Prototype, PrototypeVersion
from prototypes.tasks import purge_expired

PROTO_HTML = "<!doctype html><html><body><h1 id='hero'>Hi</h1></body></html>"


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
        prototype=p, version_number=1, html_content=PROTO_HTML
    )
    p.current_version = v
    p.save()
    AccessRule.objects.create(prototype=p, kind=AccessRule.DOMAIN, value="example.com")
    return p


def _leave_feedback(prototype, email="sam@example.com"):
    c = Client()
    c.post(reverse("enter", args=[prototype.uuid]), {"email": email})
    c.post(
        "/api/widget",
        data=json.dumps(
            {
                "projectName": str(prototype.uuid),
                "type": "bug",
                "message": "broken",
                "clientId": "c1",
                "annotations": [{"anchor": {"cssSelector": "#hero"}}],
            }
        ),
        content_type="application/json",
    )


def _patch(uuid, payload, token):
    return Client().patch(
        f"/api/prototypes/{uuid}",
        data=json.dumps(payload),
        content_type="application/json",
        **_auth(token),
    )


# ── PATCH ────────────────────────────────────────────────────────────────────
def test_patch_rename(prototype, device_token):
    r = _patch(prototype.uuid, {"name": "Renamed"}, device_token)
    assert r.status_code == 200
    assert r.json()["name"] == "Renamed"
    prototype.refresh_from_db()
    assert prototype.name == "Renamed"


def test_patch_deactivate_kills_link_and_reactivate_restores(prototype, device_token):
    r = _patch(prototype.uuid, {"is_active": False}, device_token)
    assert r.json()["is_active"] is False
    assert Client().get(reverse("viewer", args=[prototype.uuid])).status_code == 410

    r = _patch(prototype.uuid, {"is_active": True}, device_token)
    assert r.json()["is_active"] is True
    # reviewer flow works again (redirects to the email gate)
    assert Client().get(reverse("viewer", args=[prototype.uuid])).status_code == 302


def test_patch_reactivating_expired_restarts_clock(prototype, device_token):
    prototype.expires_at = timezone.now() - timedelta(hours=1)
    prototype.is_active = False
    prototype.save()
    data = _patch(prototype.uuid, {"is_active": True}, device_token).json()
    assert data["is_active"] is True
    assert data["is_expired"] is False


def test_patch_is_scoped_to_owner(prototype):
    intruder = User.objects.create_user(email="intruder@x.com", password="x")
    token = DeviceToken.objects.create(owner=intruder, label="t")
    assert _patch(prototype.uuid, {"name": "mine now"}, token).status_code == 404
    prototype.refresh_from_db()
    assert prototype.name == "Sample"


# ── DELETE ───────────────────────────────────────────────────────────────────
def test_delete_cascades_everything(prototype, device_token):
    _leave_feedback(prototype)
    assert Annotation.objects.count() == 1

    r = Client().delete(f"/api/prototypes/{prototype.uuid}", **_auth(device_token))
    assert r.status_code == 204
    assert not Prototype.objects.exists()
    assert not PrototypeVersion.objects.exists()
    assert not AccessRule.objects.exists()
    assert not Annotation.objects.exists()
    assert not Comment.objects.exists()
    # the link is dead outright
    assert Client().get(reverse("viewer", args=[prototype.uuid])).status_code == 404


def test_delete_is_scoped_to_owner(prototype):
    intruder = User.objects.create_user(email="intruder@x.com", password="x")
    token = DeviceToken.objects.create(owner=intruder, label="t")
    r = Client().delete(f"/api/prototypes/{prototype.uuid}", **_auth(token))
    assert r.status_code == 404
    assert Prototype.objects.filter(pk=prototype.pk).exists()


def test_dashboard_delete_action(prototype, owner):
    c = Client()
    c.force_login(owner)
    r = c.post(reverse("prototype_action", args=[prototype.uuid]), {"action": "delete"})
    assert r.status_code == 302
    assert not Prototype.objects.filter(pk=prototype.pk).exists()


# ── Retention purge ──────────────────────────────────────────────────────────
def _make(owner, name, expires_delta):
    p = Prototype.objects.create(owner=owner, name=name)
    p.expires_at = timezone.now() + expires_delta
    p.save(update_fields=["expires_at"])
    return p


def test_purge_respects_grace_window(owner):
    grace = settings.PROTOTYPE_PURGE_GRACE_DAYS
    live = _make(owner, "live", timedelta(days=10))
    in_grace = _make(owner, "expired-in-grace", -timedelta(days=1))
    lapsed = _make(owner, "expired-lapsed", -timedelta(days=grace, hours=1))

    assert purge_expired() == 1
    remaining = set(Prototype.objects.values_list("name", flat=True))
    assert remaining == {"live", "expired-in-grace"}
    assert (
        live.pk and in_grace.pk and not Prototype.objects.filter(pk=lapsed.pk).exists()
    )


def test_purge_management_command(owner):
    grace = settings.PROTOTYPE_PURGE_GRACE_DAYS
    _make(owner, "gone", -timedelta(days=grace + 1))
    out = StringIO()
    call_command("purge_expired", stdout=out)
    assert "Purged 1" in out.getvalue()
    assert not Prototype.objects.exists()


# ── List activity hints ──────────────────────────────────────────────────────
def test_list_activity_hints_and_watermark(prototype, device_token):
    api = Client()
    row = api.get("/api/prototypes", **_auth(device_token)).json()[0]
    assert row["total_comments"] == 0
    assert row["has_new"] is False
    assert row["last_activity"] is None

    _leave_feedback(prototype)
    row = api.get("/api/prototypes", **_auth(device_token)).json()[0]
    assert row["total_comments"] == 1
    assert row["has_new"] is True
    assert row["last_activity"] is not None

    # pulling feedback advances the watermark; the hint clears, the total stays
    api.get(f"/api/prototypes/{prototype.uuid}/feedback", **_auth(device_token))
    row = api.get("/api/prototypes", **_auth(device_token)).json()[0]
    assert row["total_comments"] == 1
    assert row["has_new"] is False


# ── Explicit allowlists (no magic) ───────────────────────────────────────────
def test_upload_returns_effective_rules(owner, device_token):
    from django.core.files.uploadedfile import SimpleUploadedFile

    resp = Client().post(
        "/api/prototypes",
        {
            "html": SimpleUploadedFile(
                "p.html", PROTO_HTML.encode(), content_type="text/html"
            ),
            "name": "P",
            "domains": "acme.com",
            "emails": "jane@partner.com",
        },
        **_auth(device_token),
    )
    assert resp.status_code == 200
    rules = resp.json()["rules"]
    assert {"kind": "domain", "value": "acme.com"} in rules
    assert {"kind": "email", "value": "jane@partner.com"} in rules
    assert len(rules) == 2  # exactly what was sent — nothing seeded


def _upload(device_token, *, name="P", domains="", emails="", access_mode="", update_of=""):
    from django.core.files.uploadedfile import SimpleUploadedFile

    data = {
        "html": SimpleUploadedFile("p.html", PROTO_HTML.encode(), content_type="text/html"),
        "name": name,
        "domains": domains,
        "emails": emails,
    }
    if access_mode:
        data["access_mode"] = access_mode
    if update_of:
        data["update_of"] = update_of
    return Client().post("/api/prototypes", data, **_auth(device_token))


def test_update_adds_allowlist_rules_without_removing_existing(owner, device_token):
    first = _upload(device_token, domains="acme.com").json()
    uuid = first["uuid"]

    resp = _upload(device_token, update_of=uuid, emails="jane@partner.com")
    assert resp.status_code == 200
    rules = resp.json()["rules"]
    # v2 is behind the same link, additive: the original domain is kept and the new
    # email is added — `--allow` on an update is honored, not silently dropped.
    assert resp.json()["version"] == 2
    assert {"kind": "domain", "value": "acme.com"} in rules
    assert {"kind": "email", "value": "jane@partner.com"} in rules
    assert len(rules) == 2


def test_plain_update_leaves_the_allowlist_untouched(owner, device_token):
    uuid = _upload(device_token, domains="acme.com").json()["uuid"]
    resp = _upload(device_token, update_of=uuid)  # no domains/emails
    rules = resp.json()["rules"]
    assert rules == [{"kind": "domain", "value": "acme.com"}]


def test_update_restarts_the_expiry_clock_and_reactivates(owner, device_token):
    uuid = _upload(device_token, domains="acme.com").json()["uuid"]
    p = Prototype.objects.get(uuid=uuid)
    # Simulate a prototype that has expired and been deactivated.
    p.expires_at = timezone.now() - timedelta(days=1)
    p.is_active = False
    p.save(update_fields=["expires_at", "is_active"])

    _upload(device_token, update_of=uuid)
    p.refresh_from_db()
    # Publishing v2 makes the link live again and restarts the 30-day clock, so it never
    # lands behind a dead link.
    assert p.is_active is True
    assert p.is_expired is False
    assert p.is_viewable is True


# ── Access mode (public / restricted) ────────────────────────────────────────
def test_upload_defaults_to_restricted(owner, device_token):
    assert _upload(device_token).json()["access_mode"] == "restricted"


def test_upload_public_sets_mode_and_reports_it(owner, device_token):
    data = _upload(device_token, access_mode="public").json()
    assert data["access_mode"] == "public"
    assert Prototype.objects.get(uuid=data["uuid"]).is_public


def test_plain_update_leaves_access_mode_untouched(owner, device_token):
    uuid = _upload(device_token, access_mode="public").json()["uuid"]
    # A plain re-publish sends a blank access_mode and must not silently re-lock the link.
    assert _upload(device_token, update_of=uuid).json()["access_mode"] == "public"


def test_update_flips_mode_both_ways_and_preserves_allowlist(owner, device_token):
    uuid = _upload(device_token, domains="acme.com").json()["uuid"]
    assert _upload(device_token, update_of=uuid, access_mode="public").json()["access_mode"] == "public"
    # Flipping back to restricted re-applies the allowlist that was preserved throughout.
    resp = _upload(device_token, update_of=uuid, access_mode="restricted").json()
    assert resp["access_mode"] == "restricted"
    assert {"kind": "domain", "value": "acme.com"} in resp["rules"]


def test_patch_flips_access_mode_and_ignores_junk(prototype, device_token):
    assert _patch(prototype.uuid, {"access_mode": "public"}, device_token).json()["access_mode"] == "public"
    # An unrecognized value is ignored, never applied — the mode can't be cleared by accident.
    assert _patch(prototype.uuid, {"access_mode": "bogus"}, device_token).json()["access_mode"] == "public"
    assert _patch(prototype.uuid, {"access_mode": "restricted"}, device_token).json()["access_mode"] == "restricted"


def test_dashboard_make_public_and_restricted_actions(prototype, owner):
    c = Client()
    c.force_login(owner)
    c.post(reverse("prototype_action", args=[prototype.uuid]), {"action": "make_public"})
    prototype.refresh_from_db()
    assert prototype.is_public
    c.post(reverse("prototype_action", args=[prototype.uuid]), {"action": "make_restricted"})
    prototype.refresh_from_db()
    assert not prototype.is_public


def test_dashboard_upload_can_set_public(owner):
    from django.core.files.uploadedfile import SimpleUploadedFile

    c = Client()
    c.force_login(owner)
    c.post(
        reverse("dashboard_upload"),
        {
            "html": SimpleUploadedFile(
                "p.html", PROTO_HTML.encode(), content_type="text/html"
            ),
            "access_mode": "public",
        },
    )
    assert Prototype.objects.get().is_public


def test_dashboard_prefills_default_domain_without_seeding(owner):
    owner.default_allow_domain = "work.com"
    owner.save(update_fields=["default_allow_domain"])
    c = Client()
    c.force_login(owner)

    # visible prefill in the form…
    body = c.get(reverse("dashboard")).content.decode()
    assert 'name="domains" value="work.com"' in body

    # …but a cleared field means what it says: zero rules, locked
    from django.core.files.uploadedfile import SimpleUploadedFile

    c.post(
        reverse("dashboard_upload"),
        {
            "html": SimpleUploadedFile(
                "p.html", PROTO_HTML.encode(), content_type="text/html"
            )
        },
    )
    p = Prototype.objects.get()
    assert p.access_rules.count() == 0

"""Skill version negotiation: every API response tells the caller whether the
skill copy it is running is current, and it does so without ever handing the
agent something executable."""

import json

import pytest
from django.test import Client, override_settings

from accounts.models import DeviceToken, User
from common.skills_version import parse_version, version_status
from prototypes.models import Prototype, PrototypeVersion

HDR = "HTTP_X_PROTOPEEK_SKILLS"


@pytest.fixture
def owner(db):
    return User.objects.create_user(email="v@w.com", password="x")


@pytest.fixture
def device_token(owner):
    return DeviceToken.objects.create(owner=owner, label="test")


@pytest.fixture
def prototype(owner):
    p = Prototype.objects.create(owner=owner, name="V")
    v = PrototypeVersion.objects.create(prototype=p, version_number=1, html_content="<p>x</p>")
    p.current_version = v
    p.save()
    return p


def _auth(token):
    return {"HTTP_AUTHORIZATION": f"Bearer {token.token}"}


# ── Parsing / comparison ─────────────────────────────────────────────────────
@pytest.mark.parametrize(
    "raw,expected",
    [
        ("1.3.0", (1, 3, 0)),
        ("v1.3.0", (1, 3, 0)),
        (" 1.3 ", (1, 3)),
        ("2", (2,)),
        ("", None),
        (None, None),
        ("1.3.0-beta", None),
        ("not.a.version", None),
        ("1.2.3.4.5", None),
        (12, None),
    ],
)
def test_parse_version(raw, expected):
    assert parse_version(raw) == expected


@override_settings(SKILLS_LATEST_VERSION="1.3.0")
def test_status_transitions(db):
    assert version_status("1.3.0")["status"] == "current"
    assert version_status("1.3")["status"] == "current"  # 1.3 == 1.3.0
    assert version_status("1.4.0")["status"] == "current"  # a dev checkout, not stale
    assert version_status("1.2.0")["status"] == "update-available"
    # No header at all — every skill predating this mechanism. We can still name
    # the current version, we just can't name theirs.
    unknown = version_status(None)
    assert unknown["status"] == "unknown"
    assert unknown["client"] is None
    assert unknown["latest"] == "1.3.0"


@override_settings(SKILLS_LATEST_VERSION="1.3.0")
def test_min_supported_escalates_to_required(db):
    from constance import config

    assert version_status("1.0.0")["status"] == "update-available"
    config.SKILLS_MIN_SUPPORTED = "1.1.0"
    try:
        assert version_status("1.0.0")["status"] == "update-required"
        assert version_status("1.2.0")["status"] == "update-available"
    finally:
        config.SKILLS_MIN_SUPPORTED = ""


# ── Middleware coverage ──────────────────────────────────────────────────────
@override_settings(SKILLS_LATEST_VERSION="1.3.0")
def test_every_api_response_carries_headers(prototype, device_token):
    """Uniform across shapes: object body, bare-array body, and binary."""
    c = Client()
    for path in (
        f"/api/prototypes/{prototype.uuid}",  # object
        "/api/prototypes",  # bare JSON array
        f"/api/prototypes/{prototype.uuid}/status",
        "/api/health",
    ):
        r = c.get(path, **_auth(device_token), **{HDR: "1.2.0"})
        assert r.headers["X-ProtoPeek-Skills-Latest"] == "1.3.0", path
        assert r.headers["X-ProtoPeek-Skills-Status"] == "update-available", path


@override_settings(SKILLS_LATEST_VERSION="1.3.0")
def test_object_bodies_get_the_skills_key(prototype, device_token):
    c = Client()
    body = c.get(
        f"/api/prototypes/{prototype.uuid}/feedback", **_auth(device_token), **{HDR: "1.2.0"}
    ).json()
    assert body["skills"] == {
        "client": "1.2.0",
        "latest": "1.3.0",
        "status": "update-available",
    }
    # ...and the real payload is untouched alongside it.
    assert body["prototype"]["uuid"] == str(prototype.uuid)


@override_settings(SKILLS_LATEST_VERSION="1.3.0")
def test_array_body_is_left_alone(prototype, device_token):
    """GET /api/prototypes is a bare array — wrapping it would break every
    installed skill, so those callers get the header only."""
    r = Client().get("/api/prototypes", **_auth(device_token), **{HDR: "1.2.0"})
    assert isinstance(r.json(), list)
    assert r.headers["X-ProtoPeek-Skills-Status"] == "update-available"


@override_settings(SKILLS_LATEST_VERSION="1.3.0")
def test_binary_and_204_responses_survive(prototype, device_token):
    """A 204 has no body and the shot stream is bytes — neither may be mangled."""
    r = Client().delete(f"/api/prototypes/{prototype.uuid}", **_auth(device_token))
    assert r.status_code == 204
    assert r.content == b""
    assert r.headers["X-ProtoPeek-Skills-Latest"] == "1.3.0"


@override_settings(SKILLS_LATEST_VERSION="1.3.0")
def test_content_length_matches_rewritten_body(prototype, device_token):
    """Injecting into the body must not leave a stale Content-Length behind."""
    r = Client().get(
        f"/api/prototypes/{prototype.uuid}/status", **_auth(device_token), **{HDR: "1.2.0"}
    )
    assert int(r.headers["Content-Length"]) == len(r.content)


@override_settings(SKILLS_LATEST_VERSION="1.3.0")
def test_payload_is_inert(prototype, device_token):
    """The response may carry a version and a status enum and nothing else. No
    command, URL, or prose — an agent runs install commands hardcoded in its own
    skill file, never anything this API sent it."""
    r = Client().get(
        f"/api/prototypes/{prototype.uuid}/status", **_auth(device_token), **{HDR: "1.2.0"}
    )
    skills = r.json()["skills"]
    assert set(skills) == {"client", "latest", "status"}
    blob = json.dumps(skills).lower()
    for smell in ("npx", "curl", "http", "install", "claude", "bash", "$(", "&&"):
        assert smell not in blob


@override_settings(SKILLS_LATEST_VERSION="1.3.0")
def test_non_api_paths_are_untouched(prototype):
    r = Client().get("/")
    assert "X-ProtoPeek-Skills-Latest" not in r.headers


@override_settings(SKILLS_LATEST_VERSION="1.3.0")
def test_garbage_client_header_never_breaks_the_call(prototype, device_token):
    r = Client().get(
        f"/api/prototypes/{prototype.uuid}", **_auth(device_token), **{HDR: "🙃; rm -rf /"}
    )
    assert r.status_code == 200
    assert r.json()["skills"]["status"] == "unknown"


def test_latest_version_tracks_the_plugin_manifest(settings):
    """The advertised version is read from the manifest that ships the skills, so
    there is no second place to remember to bump."""
    from pathlib import Path

    manifest = json.loads(
        (Path(settings.BASE_DIR) / ".claude-plugin" / "plugin.json").read_text()
    )
    assert settings.SKILLS_LATEST_VERSION == manifest["version"]

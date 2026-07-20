"""Skill version negotiation.

Installed skills declare their own version on every API call; every /api/ response
carries back the current version and whether the caller is behind. The skills are
distributed out of band (`npx skills add`, the plugin marketplace), so the API is
the only channel that can tell a *running* agent that its copy is stale.

Deliberately inert: the response carries a version string and a status enum, and
nothing else — no command, no URL, no prose. An agent acts on this by running the
install commands hardcoded in its own skill file, never anything the server sent.
Otherwise spoofing this API would mean putting arbitrary shell in front of an agent
that has already been told to ask for permission to run it.

Never let any of this break a real request: a version-check bug must not cost
someone their upload, so the middleware swallows everything.
"""

import json

from django.conf import settings

from siteconfig import conf

CURRENT = "current"
UPDATE_AVAILABLE = "update-available"
UPDATE_REQUIRED = "update-required"
UNKNOWN = "unknown"

CLIENT_HEADER = "X-ProtoPeek-Skills"
LATEST_HEADER = "X-ProtoPeek-Skills-Latest"
STATUS_HEADER = "X-ProtoPeek-Skills-Status"


def parse_version(raw) -> tuple[int, ...] | None:
    """"1.3.0" → (1, 3, 0). Anything unparseable → None (reported as `unknown`,
    never an error) — clients in the wild send whatever they send."""
    if not raw or not isinstance(raw, str):
        return None
    parts = raw.strip().lstrip("vV").split(".")
    if not 1 <= len(parts) <= 4:
        return None
    try:
        return tuple(int(p) for p in parts)
    except ValueError:
        return None


def _pad(v: tuple[int, ...], n: int = 4) -> tuple[int, ...]:
    """Compare 1.3 and 1.3.0 as equal rather than as different lengths."""
    return v + (0,) * (n - len(v))


def version_status(raw_client) -> dict:
    """What to tell this caller about its own version. `client` echoes back what
    they claimed so an agent can say "you're on X, current is Y" in one breath."""
    latest_raw = settings.SKILLS_LATEST_VERSION
    latest = parse_version(latest_raw)
    client = parse_version(raw_client)

    if client is None or latest is None:
        # An older skill that predates this whole mechanism sends no header at all,
        # which is exactly this branch — we can still name the current version.
        status = UNKNOWN
    elif _pad(client) >= _pad(latest):
        status = CURRENT  # ahead of latest (a dev checkout) also counts as current
    else:
        minimum = parse_version(conf.get_str("SKILLS_MIN_SUPPORTED"))
        status = (
            UPDATE_REQUIRED
            if minimum and _pad(client) < _pad(minimum)
            else UPDATE_AVAILABLE
        )

    return {
        "client": raw_client if isinstance(raw_client, str) and raw_client else None,
        "latest": latest_raw,
        "status": status,
    }


def _inject(response, info: dict) -> None:
    """Add `skills` to JSON object bodies. Bare arrays (GET /api/prototypes) have
    nowhere to hang a key and wrapping them would break every installed skill, so
    those callers read the headers instead."""
    if getattr(response, "streaming", False) or response.status_code == 204:
        return
    if not response.get("Content-Type", "").startswith("application/json"):
        return
    body = getattr(response, "content", b"")
    if not body:
        return
    data = json.loads(body)
    if not isinstance(data, dict):
        return
    data["skills"] = info
    response.content = json.dumps(data)
    response["Content-Length"] = str(len(response.content))


class SkillsVersionMiddleware:
    """Annotate every API response with skill-version status. Lives in middleware
    rather than in each endpoint so the answer is uniform and endpoints added later
    are covered without anyone remembering to."""

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        if not request.path.startswith("/api/"):
            return response
        try:
            info = version_status(request.headers.get(CLIENT_HEADER))
            response[LATEST_HEADER] = info["latest"]
            response[STATUS_HEADER] = info["status"]
            _inject(response, info)
        except Exception:  # noqa: BLE001 — never break a real request over this
            pass
        return response

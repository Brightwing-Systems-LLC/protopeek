"""ProtoPeek's Django-Ninja API surface.

Two auth tiers, matching the two roles:
  • Owner endpoints  → Authorization: Bearer <token> (per-owner rotatable token).
  • Reviewer/widget  → the signed HttpOnly reviewer cookie (no token, no login).

Onboarding is token-first: POST /api/tokens mints a token with no signup.
"""

from ninja import NinjaAPI

from accounts.api import OwnerToken

api = NinjaAPI(title="ProtoPeek API", version="1.0.0", urls_namespace="api")


@api.get("/health", auth=None)
def health(request):
    return {"status": "ok"}


# Onboarding: mint a token (no auth) + /me status (token auth, set per-operation).
api.add_router("", "accounts.api.router")
# Owner-facing prototype management (auth: Bearer token).
api.add_router("/prototypes", "prototypes.api.router", auth=OwnerToken())
# Reviewer-facing annotation widget contract (auth: signed cookie, handled in-router).
api.add_router("/widget", "feedback.api.router", auth=None)

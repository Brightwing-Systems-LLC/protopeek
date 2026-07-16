"""Onboarding API: mint a token with no signup (ngrok-style), and report status.

`POST /api/tokens` needs no auth — it creates a provisional (anonymous, token-only)
owner and returns a fresh token. Everything else authenticates with that token via
the `Authorization: Bearer <token>` header.
"""

from django.conf import settings
from django.core.cache import cache
from django.http import JsonResponse
from django.utils import timezone
from ninja import Router, Schema
from ninja.security import HttpBearer

from siteconfig import conf

from .models import DeviceToken, User


class OwnerToken(HttpBearer):
    def authenticate(self, request, token):
        if not token:
            return None
        try:
            device_token = DeviceToken.objects.select_related("owner").get(
                token=token, revoked_at__isnull=True
            )
        except DeviceToken.DoesNotExist:
            return None
        DeviceToken.objects.filter(pk=device_token.pk).update(last_used_at=timezone.now())
        request.device_token = device_token
        request.owner = device_token.owner
        return device_token.owner


router = Router()


class MintIn(Schema):
    label: str = ""
    default_domain: str = ""


class MintOut(Schema):
    token: str
    base_url: str
    default_domain: str
    signin_url: str


@router.post("/tokens", auth=None, response=MintOut)
def mint_token(request, payload: MintIn):
    """Mint a fresh token + a provisional owner. No signup, no email, no password."""
    ip = request.META.get("REMOTE_ADDR", "?")
    bucket = f"mint:{ip}"
    used = cache.get(bucket, 0)
    limit = conf.get_int("TOKEN_MINT_LIMIT")
    if limit and used >= limit:
        return JsonResponse(
            {"detail": "Token-mint rate limit reached — try again later."}, status=429
        )
    cache.set(bucket, used + 1, conf.get_int("TOKEN_MINT_WINDOW"))

    owner = User.objects.create_provisional(default_allow_domain=payload.default_domain)
    device_token = DeviceToken.objects.create(owner=owner, label=(payload.label or "")[:120])
    return {
        "token": device_token.token,
        "base_url": settings.BASE_URL,
        "default_domain": owner.default_allow_domain,
        "signin_url": f"{settings.BASE_URL}/token",
    }


class MeOut(Schema):
    provisional: bool
    default_domain: str
    active_prototypes: int
    signin_url: str


@router.get("/me", auth=OwnerToken(), response=MeOut)
def me(request):
    """Confirm a token works and report its owner's status."""
    owner = request.auth
    return {
        "provisional": owner.is_provisional,
        "default_domain": owner.default_allow_domain,
        "active_prototypes": owner.active_prototype_count,
        "signin_url": f"{settings.BASE_URL}/token",
    }

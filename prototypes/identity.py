"""Reviewer identity as a signed HttpOnly cookie — NOT a Django session/user.

The email is self-asserted, checked against a prototype's allowlist once, then
remembered so nobody re-types. Long-lived (~90 days) — a different clock from the
per-prototype UUID link. Signed with Django's built-in signing so it can't be forged.
"""

from django.conf import settings
from django.core import signing

from .allowlist import normalize_email


def read_identity(request) -> str | None:
    """Return the verified reviewer email from the cookie, or None."""
    raw = request.COOKIES.get(settings.REVIEWER_COOKIE_NAME)
    if not raw:
        return None
    try:
        data = signing.loads(
            raw,
            salt=settings.REVIEWER_COOKIE_SALT,
            max_age=settings.REVIEWER_COOKIE_MAX_AGE,
        )
    except signing.BadSignature:
        return None
    email = normalize_email(data.get("email", "") if isinstance(data, dict) else "")
    return email or None


def set_identity(response, email: str):
    """Stamp the signed identity cookie onto a response."""
    token = signing.dumps(
        {"email": normalize_email(email)}, salt=settings.REVIEWER_COOKIE_SALT
    )
    response.set_cookie(
        settings.REVIEWER_COOKIE_NAME,
        token,
        max_age=settings.REVIEWER_COOKIE_MAX_AGE,
        httponly=True,
        secure=not settings.DEBUG,
        samesite="Lax",
    )
    return response

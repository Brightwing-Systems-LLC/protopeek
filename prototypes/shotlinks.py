"""Signed, time-boxed links to a single reviewer screenshot.

The API's shot endpoint is Bearer-authed, so it 401s in a browser — an owner can't
click a screenshot or hand one to a teammate. These links carry their own proof in
the URL, signed with Django's built-in signing so they can't be forged or edited to
point at someone else's annotation. Same shape as the prototype links themselves:
unguessable, expiring, and scoped to exactly one object — one image, never the
prototype and never the feedback.

Deliberately independent of prototype expiry: the link is the owner's to share, and
the underlying row disappears on its own when retention purges the prototype.
"""

from django.conf import settings
from django.core import signing
from django.urls import reverse


def sign_shot(annotation_id: int) -> str:
    return signing.dumps(annotation_id, salt=settings.SHOT_LINK_SALT)


def unsign_shot(token: str) -> int:
    """Return the annotation id. Raises SignatureExpired (stale) or BadSignature
    (forged/garbled) — callers distinguish them so an aged-out link can say so."""
    value = signing.loads(
        token, salt=settings.SHOT_LINK_SALT, max_age=settings.SHOT_LINK_MAX_AGE
    )
    if not isinstance(value, int):
        raise signing.BadSignature("unexpected payload")
    return value


def shot_view_url(annotation_id: int) -> str:
    """Absolute, browser-openable URL for one annotation's screenshot."""
    return settings.BASE_URL + reverse("shot_link", args=[sign_shot(annotation_id)])

"""Retention enforcement: expired prototypes are purged after a grace window.

Expiry (`is_viewable`) only gates serving; this is what actually removes the data —
the prototype row and, via FK cascade, every version's HTML, all annotations,
comment threads, screenshots, and allowlist rules.
"""

from datetime import timedelta

from celery import shared_task
from django.conf import settings
from django.utils import timezone

from .models import Prototype


def purge_expired() -> int:
    """Hard-delete prototypes whose grace window after expiry has lapsed.
    Returns the number of prototypes removed."""
    cutoff = timezone.now() - timedelta(days=settings.PROTOTYPE_PURGE_GRACE_DAYS)
    _, per_model = Prototype.objects.filter(expires_at__lt=cutoff).delete()
    # delete() counts every cascaded row; report prototypes only.
    return per_model.get("prototypes.Prototype", 0)


@shared_task
def purge_expired_prototypes() -> int:
    return purge_expired()

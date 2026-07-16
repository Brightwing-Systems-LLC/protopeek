"""Manual/self-host entry point for retention enforcement. The hosted deploy runs
the same purge daily via Celery beat (CELERY_BEAT_SCHEDULE in settings)."""

from django.core.management.base import BaseCommand

from prototypes.tasks import purge_expired


class Command(BaseCommand):
    help = (
        "Hard-delete prototypes (HTML, feedback, screenshots) whose "
        "post-expiry grace window has lapsed."
    )

    def handle(self, *args, **options):
        count = purge_expired()
        self.stdout.write(self.style.SUCCESS(f"Purged {count} expired prototype(s)."))

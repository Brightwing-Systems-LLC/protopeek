import os

from allauth.account.models import EmailAddress
from django.core.management.base import BaseCommand

from accounts.models import User


class Command(BaseCommand):
    help = "Idempotently create a dedicated E2E/Playwright user (separate from the dev superuser)."

    def handle(self, *args, **options):
        email = os.environ.get("E2E_USER_EMAIL", "e2e@protopeek.test")
        password = os.environ.get("E2E_USER_PASSWORD", "e2e-password")
        user, _ = User.objects.get_or_create(email=email)
        user.is_active = True
        user.set_password(password)
        user.save()
        EmailAddress.objects.update_or_create(
            user=user, email=email, defaults={"verified": True, "primary": True}
        )
        self.stdout.write(self.style.SUCCESS(f"Seeded E2E user {email}"))

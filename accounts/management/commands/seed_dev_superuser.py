import os

from allauth.account.models import EmailAddress
from django.core.management.base import BaseCommand

from accounts.models import DeviceToken, User


class Command(BaseCommand):
    help = "Idempotently create/update a dev superuser (+ a default token)."

    def handle(self, *args, **options):
        email = os.environ.get("DEV_SUPERUSER_EMAIL", "dev@example.com")
        password = os.environ.get("DEV_SUPERUSER_PASSWORD", "protopeek-dev")

        user, created = User.objects.get_or_create(email=email)
        user.is_staff = True
        user.is_superuser = True
        user.is_active = True
        user.set_password(password)
        user.save()

        EmailAddress.objects.update_or_create(
            user=user,
            email=email,
            defaults={"verified": True, "primary": True},
        )

        if not user.tokens.filter(revoked_at__isnull=True).exists():
            token = DeviceToken.objects.create(owner=user, label="dev")
            self.stdout.write(self.style.SUCCESS(f"Token: {token.token}"))

        verb = "Created" if created else "Updated"
        self.stdout.write(self.style.SUCCESS(f"{verb} superuser {email} (password: {password})"))

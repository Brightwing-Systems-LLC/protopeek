from django.conf import settings
from django.core.management.base import BaseCommand

from common.email import send_templated


class Command(BaseCommand):
    help = "Render the branded base + a sample message through the active email backend."

    def add_arguments(self, parser):
        parser.add_argument("address")

    def handle(self, *args, **options):
        address = options["address"]
        send_templated(
            "welcome",
            to=address,
            context={"product_name": settings.PRODUCT_NAME, "email": address},
        )
        self.stdout.write(self.style.SUCCESS(f"Sent 'welcome' test email to {address} via {settings.EMAIL_BACKEND}"))

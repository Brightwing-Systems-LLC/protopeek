import hashlib
import uuid
from datetime import timedelta

from django.conf import settings
from django.db import models
from django.utils import timezone


class Prototype(models.Model):
    """A shared HTML prototype, addressed by an unguessable UUID link."""

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="prototypes"
    )
    uuid = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    name = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()
    is_active = models.BooleanField(default=True)
    current_version = models.ForeignKey(
        "PrototypeVersion",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="+",
    )
    # Watermark for "new since your last pull" (advanced by the feedback endpoint).
    last_fetched_at = models.DateTimeField(null=True, blank=True)
    # Named-invite mode is opt-in; open-domain (roster-less) is the default.
    named_invite_mode = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} ({self.uuid})"

    def save(self, *args, **kwargs):
        if not self.expires_at:
            self.expires_at = timezone.now() + timedelta(
                hours=settings.PROTOTYPE_EXPIRY_HOURS
            )
        super().save(*args, **kwargs)

    @property
    def is_expired(self) -> bool:
        return self.expires_at is not None and timezone.now() >= self.expires_at

    @property
    def is_viewable(self) -> bool:
        """The UUID-link gate: active AND not expired."""
        return self.is_active and not self.is_expired

    @property
    def share_url(self) -> str:
        return f"{settings.BASE_URL}/p/{self.uuid}"


class PrototypeVersion(models.Model):
    """One uploaded revision. The self-contained HTML lives in the DB (no S3)."""

    prototype = models.ForeignKey(
        Prototype, on_delete=models.CASCADE, related_name="versions"
    )
    version_number = models.PositiveIntegerField()
    html_content = models.TextField()
    sha256 = models.CharField(max_length=64, editable=False)
    size = models.PositiveIntegerField(editable=False)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-version_number"]
        constraints = [
            models.UniqueConstraint(
                fields=["prototype", "version_number"],
                name="unique_version_per_prototype",
            )
        ]

    def __str__(self):
        return f"{self.prototype.name} v{self.version_number}"

    def save(self, *args, **kwargs):
        encoded = self.html_content.encode("utf-8")
        self.sha256 = hashlib.sha256(encoded).hexdigest()
        self.size = len(encoded)
        super().save(*args, **kwargs)


class AccessRule(models.Model):
    """One allowlist rule: a whole email domain, or a single explicit address."""

    DOMAIN = "domain"
    EMAIL = "email"
    KIND_CHOICES = [(DOMAIN, "Domain"), (EMAIL, "Email")]

    prototype = models.ForeignKey(
        Prototype, on_delete=models.CASCADE, related_name="access_rules"
    )
    kind = models.CharField(max_length=10, choices=KIND_CHOICES)
    value = models.CharField(max_length=254)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["prototype", "kind", "value"], name="unique_rule_per_prototype"
            )
        ]

    def __str__(self):
        return f"{self.kind}:{self.value}"

    def save(self, *args, **kwargs):
        self.value = self.value.strip().lower().lstrip("@")
        super().save(*args, **kwargs)

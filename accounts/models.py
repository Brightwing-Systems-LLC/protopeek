import secrets

from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.utils import timezone
from timezone_field import TimeZoneField


class UserManager(BaseUserManager):
    """Email-as-login manager (no username field)."""

    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError("An email address is required.")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")
        return self._create_user(email, password, **extra_fields)

    def create_provisional(self, default_allow_domain=""):
        """A token-only owner: no real email, no password. Created by the mint-token
        API so onboarding needs zero human signup (ngrok-style). Can later be
        'claimed' with a real email + password to become a full account."""
        user = self.model(
            email=f"token-{secrets.token_hex(12)}@tokens.protopeek.local",
            is_provisional=True,
            default_allow_domain=(default_allow_domain or "").strip().lower().lstrip("@"),
        )
        user.set_unusable_password()
        user.save(using=self._db)
        return user


class User(AbstractUser):
    """The owner. Either a full account (allauth: email + password/Google) or a
    provisional token-only owner (no email/password) that can be claimed later."""

    username = None
    email = models.EmailField("email address", unique=True)
    timezone = TimeZoneField(default="America/New_York")
    # Provisional = anonymous, token-only (minted via POST /api/tokens, not signed up).
    is_provisional = models.BooleanField(default=False)
    # Seeded as the reviewer allowlist domain on every upload by this owner.
    default_allow_domain = models.CharField(max_length=254, blank=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return "(provisional token owner)" if self.is_provisional else self.email

    @property
    def active_prototype_count(self) -> int:
        return self.prototypes.filter(is_active=True).count()


def generate_token() -> str:
    """A URL-safe opaque token, prefixed so it's recognizable in logs/config."""
    return f"pp_{secrets.token_urlsafe(32)}"


# The historical migration accounts/0001 imports this name as the field default.
generate_api_key = generate_token


class DeviceToken(models.Model):
    """Rotatable per-owner token authenticating uploads (Authorization: Bearer)."""

    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tokens")
    token = models.CharField(
        max_length=80, unique=True, default=generate_token, editable=False
    )
    label = models.CharField(max_length=120, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_used_at = models.DateTimeField(null=True, blank=True)
    revoked_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.label or f"token #{self.pk}"

    @property
    def is_active(self) -> bool:
        return self.revoked_at is None

    def revoke(self):
        self.revoked_at = timezone.now()
        self.save(update_fields=["revoked_at"])

    def masked(self) -> str:
        """Show only the last 4 chars in the UI once created."""
        return f"…{self.token[-4:]}"

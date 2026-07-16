from allauth.account.adapter import DefaultAccountAdapter
from allauth.socialaccount.adapter import DefaultSocialAccountAdapter
from django.conf import settings


class AccountAdapter(DefaultAccountAdapter):
    """Honor ALLOW_SIGNUPS = true | false | first_only.

    In first_only, the very first account to sign up is auto-promoted to
    superuser (handy for a fresh deploy — the first owner gets the admin).
    """

    def is_open_for_signup(self, request):
        from accounts.models import User

        mode = getattr(settings, "ALLOW_SIGNUPS", "first_only")
        if mode == "true":
            return True
        if mode == "first_only":
            return not User.objects.exists()
        return False

    def save_user(self, request, user, form, commit=True):
        from accounts.models import User

        is_first = not User.objects.exists()
        user = super().save_user(request, user, form, commit=False)
        if is_first and getattr(settings, "ALLOW_SIGNUPS", "") == "first_only":
            user.is_staff = True
            user.is_superuser = True
        if commit:
            user.save()
        return user


class SocialAccountAdapter(DefaultSocialAccountAdapter):
    """Auto-link a Google login to an existing same-email account so a user who
    signed up with a password can later 'Continue with Google' without a clash."""

    def pre_social_login(self, request, sociallogin):
        if sociallogin.is_existing:
            return
        email = (sociallogin.user.email or "").lower()
        if not email:
            return
        from accounts.models import User

        try:
            existing = User.objects.get(email__iexact=email)
        except User.DoesNotExist:
            return
        sociallogin.connect(request, existing)

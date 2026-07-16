from allauth.account.models import EmailAddress
from allauth.socialaccount.models import SocialAccount
from django.contrib import messages
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect, render
from django.views.decorators.http import require_http_methods

from .forms import ProfileUpdateForm
from .models import DeviceToken, User

_BACKEND = "django.contrib.auth.backends.ModelBackend"


@require_http_methods(["GET", "POST"])
def token_signin(request):
    """Sign in with just a token — no password. Lets a token-only owner see and
    manage all their prototypes in the browser."""
    if request.method == "POST":
        token = (request.POST.get("token") or "").strip()
        device_token = (
            DeviceToken.objects.filter(token=token, revoked_at__isnull=True)
            .select_related("owner")
            .first()
        )
        if device_token:
            login(request, device_token.owner, backend=_BACKEND)
            messages.success(request, "Signed in with your token.")
            return redirect("dashboard")
        messages.error(request, "That token isn’t valid.")
    if request.user.is_authenticated:
        return redirect("dashboard")
    return render(request, "account/token_signin.html")


@login_required
@require_http_methods(["POST"])
def claim(request):
    """Turn a provisional (key-only) owner into a full account: add an email +
    password. Unlocks recovery, notifications, and higher limits."""
    user = request.user
    if not user.is_provisional:
        messages.info(request, "This account is already claimed.")
        return redirect("dashboard")
    email = (request.POST.get("email") or "").strip().lower()
    password = request.POST.get("password") or ""
    if "@" not in email:
        messages.error(request, "Enter a valid email.")
    elif User.objects.exclude(pk=user.pk).filter(email__iexact=email).exists():
        messages.error(request, "That email is already in use.")
    elif len(password) < 8:
        messages.error(request, "Password must be at least 8 characters.")
    else:
        user.email = email
        user.is_provisional = False
        if not user.default_allow_domain:
            user.default_allow_domain = email.split("@", 1)[1]
        user.set_password(password)
        user.save()
        EmailAddress.objects.update_or_create(
            user=user, email=email, defaults={"verified": True, "primary": True}
        )
        login(request, user, backend=_BACKEND)  # keep the session after set_password
        messages.success(request, "Key claimed — you now have a full account.")
    return redirect("dashboard")


@login_required
def profile(request):
    if request.method == "POST":
        form = ProfileUpdateForm(request.POST, instance=request.user)
        if form.is_valid():
            form.save()
            messages.success(request, "Profile updated.")
            return redirect("accounts:profile")
    else:
        form = ProfileUpdateForm(instance=request.user)
    return render(request, "account/profile.html", {"form": form})


@login_required
def connected_accounts(request):
    connected = SocialAccount.objects.filter(user=request.user)
    has_usable_password = request.user.has_usable_password()
    return render(
        request,
        "account/connected_accounts.html",
        {
            "connected": connected,
            "google_enabled": True,
            "has_usable_password": has_usable_password,
        },
    )


@login_required
@require_http_methods(["POST"])
def disconnect_social(request):
    account = SocialAccount.objects.filter(
        user=request.user, pk=request.POST.get("account_id")
    ).first()
    if not account:
        messages.error(request, "No such connected account.")
        return redirect("accounts:connected_accounts")
    # Guard: never remove the LAST auth method (would lock the user out).
    others = SocialAccount.objects.filter(user=request.user).exclude(pk=account.pk).exists()
    if not request.user.has_usable_password() and not others:
        messages.error(request, "Set a password before disconnecting your only sign-in method.")
        return redirect("accounts:connected_accounts")
    account.delete()
    messages.success(request, "Disconnected.")
    return redirect("accounts:connected_accounts")

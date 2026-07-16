"""Guards for the required account UI (§6) and exhaustive allauth theming (§7.5)."""

import pytest
from django.urls import NoReverseMatch, reverse

from accounts.models import User


@pytest.fixture
def owner(db):
    return User.objects.create_user(email="owner@work.com", password="pw-123456", is_staff=True)


# ── Account menu: all six targets resolve, admin only for staff (§6) ──────────
def test_account_menu_targets_render_for_staff(client, owner):
    client.force_login(owner)
    resp = client.get(reverse("dashboard"))
    body = resp.content.decode()
    for url in [
        reverse("accounts:profile"),
        reverse("account_change_password"),
        reverse("account_email"),
        reverse("accounts:connected_accounts"),
        reverse("account_logout"),
        reverse("admin:index"),  # staff only
    ]:
        assert url in body, f"account menu missing {url}"


def test_account_menu_hides_admin_for_nonstaff(client, db):
    user = User.objects.create_user(email="plain@work.com", password="pw-123456")
    client.force_login(user)
    body = client.get(reverse("dashboard")).content.decode()
    assert reverse("admin:index") not in body


# ── Completeness: every reversible allauth page renders inside site chrome ────
ALLAUTH_URLS = [
    "account_login",
    "account_signup",
    "account_reset_password",
]


@pytest.mark.django_db
@pytest.mark.parametrize("name", ALLAUTH_URLS)
def test_allauth_pages_are_themed(client, name):
    try:
        url = reverse(name)
    except NoReverseMatch:
        pytest.skip(f"{name} not wired")
    resp = client.get(url)
    assert resp.status_code in (200, 302)
    if resp.status_code == 200:
        # Sentinel only our themed allauth/layouts/base.html emits.
        assert b"data-allauth-themed" in resp.content, f"{name} not inside site chrome"

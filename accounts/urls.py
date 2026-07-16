from django.urls import path

from . import views

app_name = "accounts"

urlpatterns = [
    path("profile/", views.profile, name="profile"),
    path("connected-accounts/", views.connected_accounts, name="connected_accounts"),
    path("disconnect-social/", views.disconnect_social, name="disconnect_social"),
]

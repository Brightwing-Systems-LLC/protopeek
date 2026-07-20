from django.urls import path

from . import views

urlpatterns = [
    # Owner dashboard
    path("dashboard/", views.dashboard, name="dashboard"),
    path("dashboard/upload/", views.dashboard_upload, name="dashboard_upload"),
    path("dashboard/tokens/", views.token_action, name="token_action"),
    path("dashboard/p/<uuid:uuid>/action/", views.prototype_action, name="prototype_action"),
    path("dashboard/p/<uuid:uuid>/feedback/", views.prototype_feedback, name="prototype_feedback"),
    # Reviewer flow
    path("p/<uuid:uuid>/", views.viewer, name="viewer"),
    path("p/<uuid:uuid>/enter/", views.enter, name="enter"),
    path("p/<uuid:uuid>/raw/", views.raw, name="raw"),
    path("whoami/", views.whoami, name="whoami"),
    # Signed, time-boxed screenshot link — browser-openable, unlike the API's
    # Bearer-authed /shot endpoint.
    path("s/<str:token>/", views.shot_link, name="shot_link"),
]

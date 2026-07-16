from django.conf import settings
from django.contrib import admin
from django.urls import include, path

from accounts.views import claim, token_signin
from pages.views import landing

from .api import api
from .health import health

urlpatterns = [
    path("", landing, name="landing"),
    path("api/v1/health", health, name="health"),
    path("token/", token_signin, name="token_signin"),
    path("claim/", claim, name="claim"),
    path("admin/", admin.site.urls),
    path("accounts/", include("accounts.urls")),
    path("accounts/", include("allauth.urls")),
    path("", include("pages.urls")),
    path("api/", api.urls),
    path("", include("prototypes.urls")),
]

if settings.DEBUG:
    try:
        urlpatterns += [path("__debug__/", include("debug_toolbar.urls"))]
    except ImportError:
        pass

"""
Django settings for ProtoPeek — BWS Django starter conventions.

Single monolithic settings via `environs`, reading `.env` then `.env.prod`
(first found wins). Dev vs prod is conditional on DEBUG. Under `manage.py test`
/ pytest, a self-contained branch swaps Postgres+Redis for SQLite+locmem and
runs Celery eagerly, so tests need zero infra.
"""

import sys
from pathlib import Path

from celery.schedules import crontab
from environs import Env

BASE_DIR = Path(__file__).resolve().parent.parent

env = Env()
for _env_file in [".env", ".env.prod"]:
    _p = BASE_DIR / _env_file
    if _p.exists():
        env.read_env(str(_p))
        break

_TESTING = sys.argv[1:2] == ["test"] or "pytest" in sys.modules

SECRET_KEY = env.str("SECRET_KEY", "django-insecure-dev-only-change-me")
DEBUG = env.bool("DEBUG", True)

# Public origin, used to build absolute share URLs (/p/<uuid>).
BASE_URL = env.str("BASE_URL", "http://127.0.0.1:8904").rstrip("/")

ALLOWED_HOSTS = env.list("ALLOWED_HOSTS", ["localhost", "127.0.0.1"])
CSRF_TRUSTED_ORIGINS = env.list(
    "CSRF_TRUSTED_ORIGINS",
    ["http://localhost:8904", "http://127.0.0.1:8904"],
)
# ngrok convenience for OAuth/webhook testing.
_NGROK_HOST = env.str("NGROK_HOST", "")
if _NGROK_HOST:
    ALLOWED_HOSTS.append(_NGROK_HOST)
    CSRF_TRUSTED_ORIGINS.append(f"https://{_NGROK_HOST}")

# ── Applications ─────────────────────────────────────────────────────────────
INSTALLED_APPS = [
    # django-unfold before django.contrib.admin (theming by app order)
    "unfold",
    "unfold.contrib.filters",
    "unfold.contrib.forms",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.sites",
    # third-party
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "allauth.socialaccount.providers.google",
    "django_celery_beat",
    "constance",
    "django_tailwind_cli",
    "anymail",
    "django_extensions",
    # local
    "accounts",
    "siteconfig",
    "common",
    "pages",
    "prototypes",
    "feedback",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "allauth.account.middleware.AccountMiddleware",
]

if DEBUG and not _TESTING:
    INSTALLED_APPS.append("debug_toolbar")
    MIDDLEWARE.insert(1, "debug_toolbar.middleware.DebugToolbarMiddleware")
    INTERNAL_IPS = ["127.0.0.1"]

ROOT_URLCONF = "config.urls"

# Cached template loaders only in prod; plain loaders in dev so edits hot-reload.
# Keep filesystem before app_directories so templates/ overrides app templates.
_loaders = [
    "django.template.loaders.filesystem.Loader",
    "django.template.loaders.app_directories.Loader",
]
if not DEBUG:
    _loaders = [("django.template.loaders.cached.Loader", _loaders)]

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "OPTIONS": {
            "loaders": _loaders,
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
                "pages.context_processors.company",
                "siteconfig.context_processors.flags",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"
ASGI_APPLICATION = "config.asgi.application"

# ── Database (Postgres; SQLite under test) ───────────────────────────────────
if _TESTING:
    DATABASES = {"default": {"ENGINE": "django.db.backends.sqlite3", "NAME": ":memory:"}}
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": env.str("POSTGRES_DB", "protopeek_dev"),
            "USER": env.str("POSTGRES_USER", "protopeek_user"),
            "PASSWORD": env.str("POSTGRES_PASSWORD", "devpassword"),
            "HOST": env.str("POSTGRES_HOST", "localhost"),
            "PORT": env.int("POSTGRES_PORT", 5547),
            "CONN_MAX_AGE": 600,
            "CONN_HEALTH_CHECKS": True,
        }
    }

# ── Redis (cache + Celery broker/result); locmem + eager under test ──────────
REDIS_HOST = env.str("REDIS_HOST", "localhost")
REDIS_PORT = env.int("REDIS_PORT", 6494)
REDIS_PASSWORD = env.str("REDIS_PASSWORD", "")
REDIS_DB = env.int("REDIS_DB", 0)
_auth = f":{REDIS_PASSWORD}@" if REDIS_PASSWORD else ""
REDIS_URL = f"redis://{_auth}{REDIS_HOST}:{REDIS_PORT}/{REDIS_DB}"

if _TESTING:
    CACHES = {"default": {"BACKEND": "django.core.cache.backends.locmem.LocMemCache"}}
else:
    CACHES = {
        "default": {
            "BACKEND": "django_redis.cache.RedisCache",
            "LOCATION": REDIS_URL,
            "OPTIONS": {"CLIENT_CLASS": "django_redis.client.DefaultClient"},
        }
    }

# ── Celery ───────────────────────────────────────────────────────────────────
CELERY_BROKER_URL = REDIS_URL
CELERY_RESULT_BACKEND = REDIS_URL
CELERY_TASK_ALWAYS_EAGER = DEBUG or _TESTING
CELERY_TASK_SERIALIZER = "json"
CELERY_RESULT_SERIALIZER = "json"
CELERY_ACCEPT_CONTENT = ["json"]
CELERY_BEAT_SCHEDULER = "django_celery_beat.schedulers:DatabaseScheduler"
# DatabaseScheduler syncs this dict into django-celery-beat's tables at beat startup,
# so the purge schedule ships with a deploy — no admin clicking to enable retention.
CELERY_BEAT_SCHEDULE = {
    "purge-expired-prototypes": {
        "task": "prototypes.tasks.purge_expired_prototypes",
        "schedule": crontab(hour=4, minute=17),
    }
}

# ── Auth ─────────────────────────────────────────────────────────────────────
AUTH_USER_MODEL = "accounts.User"
AUTHENTICATION_BACKENDS = [
    "django.contrib.auth.backends.ModelBackend",
    "allauth.account.auth_backends.AuthenticationBackend",
]
SITE_ID = 1

ACCOUNT_LOGIN_METHODS = {"email"}
ACCOUNT_SIGNUP_FIELDS = ["email*", "password1*", "password2*"]
ACCOUNT_EMAIL_VERIFICATION = "optional"
ACCOUNT_USER_MODEL_USERNAME_FIELD = None
ACCOUNT_ADAPTER = "accounts.adapters.AccountAdapter"
SOCIALACCOUNT_ADAPTER = "accounts.adapters.SocialAccountAdapter"

# true | false | first_only (first signup becomes superuser)
ALLOW_SIGNUPS = env.str("ALLOW_SIGNUPS", "first_only")

GOOGLE_CLIENT_ID = env.str("GOOGLE_CLIENT_ID", "")
GOOGLE_CLIENT_SECRET = env.str("GOOGLE_CLIENT_SECRET", "")
GOOGLE_OAUTH_ENABLED = bool(GOOGLE_CLIENT_ID)
SOCIALACCOUNT_PROVIDERS = {
    "google": {
        "APPS": (
            [{"client_id": GOOGLE_CLIENT_ID, "secret": GOOGLE_CLIENT_SECRET, "key": ""}]
            if GOOGLE_OAUTH_ENABLED
            else []
        ),
        "SCOPE": ["profile", "email"],
        "AUTH_PARAMS": {"access_type": "online"},
        "OAUTH_PKCE_ENABLED": True,
    }
}

LOGIN_REDIRECT_URL = "dashboard"
LOGOUT_REDIRECT_URL = "/"

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]
if _TESTING:
    PASSWORD_HASHERS = ["django.contrib.auth.hashers.MD5PasswordHasher"]

# ── Reviewer identity (signed cookie; NOT a Django user/session) ─────────────
REVIEWER_COOKIE_NAME = "protopeek_reviewer"
REVIEWER_COOKIE_MAX_AGE = env.int("REVIEWER_COOKIE_MAX_AGE", 60 * 60 * 24 * 90)
REVIEWER_COOKIE_SALT = "protopeek.reviewer.identity"

# ── Runtime config (django-constance behind the siteconfig app) ──────────────
CONSTANCE_BACKEND = "constance.backends.database.DatabaseBackend"
CONSTANCE_DATABASE_CACHE_BACKEND = None if _TESTING else "default"
from siteconfig.registry import (  # noqa: E402,F401  (these ARE the settings)
    CONSTANCE_CONFIG,
    CONSTANCE_CONFIG_FIELDSETS,
)

# ── i18n ─────────────────────────────────────────────────────────────────────
LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

# ── Static (WhiteNoise) + Tailwind v4 (django-tailwind-cli, no Node) ─────────
STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STATICFILES_DIRS = [BASE_DIR / "static"]
STORAGES = {
    "default": {"BACKEND": "django.core.files.storage.FileSystemStorage"},
    "staticfiles": {
        "BACKEND": (
            "django.contrib.staticfiles.storage.StaticFilesStorage"
            if DEBUG or _TESTING
            else "whitenoise.storage.CompressedManifestStaticFilesStorage"
        )
    },
}
TAILWIND_CLI_VERSION = "4.1.14"
TAILWIND_CLI_SRC_CSS = "static/src/input.css"
TAILWIND_CLI_DIST_CSS = "css/site.css"
TAILWIND_CLI_AUTOMATIC_DOWNLOAD = True

# ── Email (console in dev; anymail/Postmark in prod) ─────────────────────────
EMAIL_BACKEND = env.str("EMAIL_BACKEND", "django.core.mail.backends.console.EmailBackend")
ANYMAIL = {"POSTMARK_SERVER_TOKEN": env.str("POSTMARK_SERVER_TOKEN", "")}
DEFAULT_FROM_EMAIL = env.str("DEFAULT_FROM_EMAIL", "ProtoPeek <protopeek@brightwingsystems.com>")
SERVER_EMAIL = DEFAULT_FROM_EMAIL

# ── django-unfold admin branding ─────────────────────────────────────────────
UNFOLD = {
    "SITE_TITLE": "ProtoPeek Admin",
    "SITE_HEADER": "ProtoPeek",
    "SITE_SYMBOL": "preview",
    "SHOW_HISTORY": True,
    "SHOW_VIEW_ON_SITE": True,
}

# ── Cookies (namespaced) ─────────────────────────────────────────────────────
SESSION_COOKIE_NAME = "protopeek_sessionid"
CSRF_COOKIE_NAME = "protopeek_csrftoken"

# ── Uploads: self-contained HTML stored in Postgres (no S3) ──────────────────
PROTOTYPE_MAX_UPLOAD_BYTES = env.int("PROTOTYPE_MAX_UPLOAD_BYTES", 10 * 1024 * 1024)
DATA_UPLOAD_MAX_MEMORY_SIZE = max(PROTOTYPE_MAX_UPLOAD_BYTES + 1024 * 1024, 2621440)
FILE_UPLOAD_MAX_MEMORY_SIZE = DATA_UPLOAD_MAX_MEMORY_SIZE

# ── Retention: a flat 30 days for everyone (no tiers, no per-user override) ───
# A product invariant, not an operational knob — deliberately NOT in django-constance,
# so it can't silently drift via a stored override or a stale cache. Changeable only
# by deploy, which is the right cadence for a product-wide policy.
PROTOTYPE_EXPIRY_HOURS = 24 * 30
# Expired prototypes are hard-deleted (HTML, feedback, screenshots) this many days
# after expires_at — the grace window in which an owner can still pull feedback or
# re-open the link. Same deploy-time-invariant reasoning as the expiry above.
PROTOTYPE_PURGE_GRACE_DAYS = 14

# ── Company identity (context-processed to every template) ───────────────────
PRODUCT_NAME = env.str("PRODUCT_NAME", "ProtoPeek")
COMPANY_NAME = env.str("COMPANY_NAME", "Brightwing Systems, LLC")
COMPANY_SHORT = env.str("COMPANY_SHORT", "Brightwing Systems")
SUPPORT_EMAIL = env.str("SUPPORT_EMAIL", "support@brightwingsystems.com")
PRIVACY_EMAIL = env.str("PRIVACY_EMAIL", "privacy@brightwingsystems.com")
LEGAL_EMAIL = env.str("LEGAL_EMAIL", "legal@brightwingsystems.com")
LEGAL_EFFECTIVE_DATE = env.str("LEGAL_EFFECTIVE_DATE", "2026-07-15")

# ── Production hardening ──────────────────────────────────────────────────────
if not DEBUG and not _TESTING:
    SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
    SECURE_SSL_REDIRECT = env.bool("SECURE_SSL_REDIRECT", True)
    # Caddy's active health check probes the upstream over plain HTTP (no
    # X-Forwarded-Proto), so the health endpoint must NOT 301 or Caddy marks the
    # backend down and 503s everything. Exempt it; real traffic still upgrades.
    SECURE_REDIRECT_EXEMPT = [r"^api/v1/health/?$"]
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_HSTS_SECONDS = env.int("SECURE_HSTS_SECONDS", 60 * 60 * 24 * 30)
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True
    SECURE_CONTENT_TYPE_NOSNIFF = True
    SECURE_REFERRER_POLICY = "same-origin"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

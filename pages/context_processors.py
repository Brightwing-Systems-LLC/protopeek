"""Company/product identity available to every template (for the footer + legal)."""

from django.conf import settings


def company(request):
    return {
        "DEBUG": settings.DEBUG,
        "BASE_URL": settings.BASE_URL,
        "PRODUCT_NAME": settings.PRODUCT_NAME,
        "COMPANY_NAME": settings.COMPANY_NAME,
        "COMPANY_SHORT": settings.COMPANY_SHORT,
        "SUPPORT_EMAIL": settings.SUPPORT_EMAIL,
        "PRIVACY_EMAIL": settings.PRIVACY_EMAIL,
        "LEGAL_EMAIL": settings.LEGAL_EMAIL,
        "LEGAL_EFFECTIVE_DATE": settings.LEGAL_EFFECTIVE_DATE,
        "GOOGLE_OAUTH_ENABLED": settings.GOOGLE_OAUTH_ENABLED,
    }

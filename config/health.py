from django.http import JsonResponse


def health(request):
    """Liveness probe used by Docker + Caddy health checks."""
    return JsonResponse({"status": "ok"})

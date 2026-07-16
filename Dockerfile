# syntax=docker/dockerfile:1

# Multi-stage build (BWS starter §10): base (deps) -> runtime (app + static) ->
# worker (same image, Celery entrypoint). ASGI in prod via gunicorn + uvicorn
# worker. No Node stage — Tailwind CSS is compiled ahead of time and committed,
# so collectstatic ships it as-is.

# ============================================================================
# base — Python + locked dependencies (no project code, so this layer caches
# across app-code changes).
# ============================================================================
FROM python:3.13-slim AS base

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    UV_LINK_MODE=copy \
    UV_COMPILE_BYTECODE=1 \
    UV_PROJECT_ENVIRONMENT=/app/.venv \
    DJANGO_SETTINGS_MODULE=config.settings \
    PATH="/app/.venv/bin:$PATH"

# uv from the official image — no pip bootstrap needed.
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /usr/local/bin/

WORKDIR /app

# Install locked deps only (project code copied later) for a cacheable layer.
COPY pyproject.toml uv.lock ./
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --frozen --no-dev --no-editable --no-install-project

# ============================================================================
# runtime — application code + baked static (WhiteNoise serves it).
# ============================================================================
FROM base AS runtime

# curl is used by the compose healthcheck against /api/v1/health.
RUN apt-get update \
    && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy the full project and finish the install (now includes the root package).
COPY . .
RUN --mount=type=cache,target=/root/.cache/uv \
    uv sync --frozen --no-dev --no-editable

# Bake static into the image (§10 static-serving invariant: no staticfiles host
# volume in prod). DEBUG=False forces the hashed manifest storage so the built
# manifest matches what prod serves. No `|| true` — a bad collect must FAIL the
# build, not ship a broken manifest as a silent per-page 500.
RUN DEBUG=False SECRET_KEY=build-time-only \
    python manage.py collectstatic --noinput --clear --ignore=src

EXPOSE 8000

CMD ["gunicorn", "config.asgi:application", \
     "-k", "uvicorn.workers.UvicornWorker", \
     "--bind", "0.0.0.0:8000", \
     "--workers", "3", \
     "--timeout", "120", \
     "--graceful-timeout", "30"]

# ============================================================================
# worker — identical image, Celery entrypoint (compose overrides the command
# per service, but this makes the worker image runnable on its own too).
# ============================================================================
FROM runtime AS worker

CMD ["celery", "-A", "config", "worker", "--concurrency=2", "--loglevel=info"]

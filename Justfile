# protopeek task runner (BWS starter §14). Recipe names are stable across BWS
# apps so muscle memory transfers. Recipes run under `uv run` so the project
# venv is implicit. `manage` is the escape hatch for any command without its
# own recipe.

set dotenv-load := true

web_port    := "8904"
compose_dev := "dev_setup/docker-compose.yml"
compose_bws := "docker-compose.bws.yml"
prod_dir    := "/root/apps/protopeek"

# List all recipes.
default:
    @just --list

# ── Django / management ──────────────────────────────────────────────────────

# Passthrough — run ANY management command: `just manage <cmd> [args]`.
manage *ARGS:
    uv run python manage.py {{ARGS}}

migrate:
    uv run python manage.py migrate

makemigrations:
    uv run python manage.py makemigrations

# CI: fail if a migration is unapplied or missing.
migrate-check:
    uv run python manage.py migrate --check --noinput

# CI: fail if models drifted from migrations.
mm-check:
    uv run python manage.py makemigrations --check --dry-run

shell:
    uv run python manage.py shell_plus

dbshell:
    uv run python manage.py dbshell

# Prod-readiness lint.
check:
    uv run python manage.py check --deploy

# Every skill declares its own version to the API; drift means users get told they
# are stale when they are not (or worse, not told when they are).
check-skill-versions:
    #!/usr/bin/env bash
    set -euo pipefail
    want=$(python3 -c "import json;print(json.load(open('.claude-plugin/plugin.json'))['version'])")
    fail=0
    for f in skills/*/SKILL.md .claude/commands/proto-up.md; do
      got=$(grep -m1 -oE 'PP_SKILLS_VERSION=[0-9.]+' "$f" | cut -d= -f2 || true)
      if [ "$got" != "$want" ]; then echo "  $f declares '${got:-none}', manifest says '$want'"; fail=1; fi
    done
    mkt=$(python3 -c "import json;print(json.load(open('.claude-plugin/marketplace.json'))['metadata']['version'])")
    if [ "$mkt" != "$want" ]; then echo "  marketplace.json says '$mkt', plugin.json says '$want'"; fail=1; fi
    if [ "$fail" = 1 ]; then echo "skill version drift"; exit 1; fi
    echo "skill versions all at $want"

collect:
    uv run python manage.py collectstatic --noinput --ignore=src

# Interactive superuser creation.
superuser:
    uv run python manage.py createsuperuser

# Non-interactive dev/e2e seeds (§15).
seed-dev-superuser:
    uv run python manage.py seed_dev_superuser

seed-e2e-user:
    uv run python manage.py seed_e2e_user

# ── Dev infra (Postgres + Redis via docker) ──────────────────────────────────

compose-dev:
    docker compose -f {{compose_dev}} up -d

compose-down:
    docker compose -f {{compose_dev}} down

compose-logs:
    docker compose -f {{compose_dev}} logs -f

compose-ps:
    docker compose -f {{compose_dev}} ps

compose-restart:
    docker compose -f {{compose_dev}} restart

# ── Run (ASGI dev server + Celery) ───────────────────────────────────────────

dev:
    uv run uvicorn config.asgi:application --host 0.0.0.0 --port {{web_port}} --reload

# solo pool on macOS (prefork misbehaves under the default fork policy).
worker:
    uv run celery -A config worker --loglevel=info --pool=solo

beat:
    uv run celery -A config beat --scheduler django_celery_beat.schedulers:DatabaseScheduler --loglevel=info

# ── Frontend — Tailwind v4 via django-tailwind-cli (no Node; §7b) ────────────

# Compile static/src/input.css -> minified static/css/site.css (committed).
css-build:
    uv run python manage.py tailwind build

# Incremental rebuilds — run alongside `just dev` in a second terminal.
css-watch:
    uv run python manage.py tailwind watch

css-config:
    uv run python manage.py tailwind config

css-doctor:
    uv run python manage.py tailwind troubleshoot

# CI staleness guard: rebuild then fail if the committed CSS is out of date.
css-check: css-build
    git diff --exit-code static/css/site.css

# ── Email (§7c) ──────────────────────────────────────────────────────────────

# Render the branded base + a sample message through the active backend.
mail-test ADDR:
    uv run python manage.py send_test_email {{ADDR}}

# ── Tunnel ───────────────────────────────────────────────────────────────────

# Expose the dev app for OAuth callback / webhook testing.
ngrok:
    ngrok http {{web_port}} --domain keyton.ngrok.dev

# ── Tests ────────────────────────────────────────────────────────────────────

test:
    uv run pytest -m "not e2e"

test-cov:
    uv run pytest -m "not e2e" --cov --cov-report=term-missing

# Playwright — seed the e2e user + collect static first.
test-e2e: seed-e2e-user collect
    uv run pytest -m e2e

# ── Bootstrap ────────────────────────────────────────────────────────────────

# compose-dev -> wait -> migrate -> css-build -> seed dev superuser.
quickstart: compose-dev
    sleep 3
    just migrate
    just css-build
    just seed-dev-superuser

# ── DNS & Deploy ─────────────────────────────────────────────────────────────

# Porkbun A records -> prod IP (§12). Pass --dry-run to preview.
dns-setup *ARGS:
    uv run python scripts/dns_setup.py {{ARGS}}

# Trigger a full deploy on the prod server over `ssh bws`.
deploy-prod:
    ssh bws 'cd {{prod_dir}} && just prod-deploy'

deploy-logs:
    ssh bws 'cd {{prod_dir}} && docker compose -f {{compose_bws}} logs -f'

# ── On-server recipes (run ON the prod box, driven by deploy-prod) ───────────

prod-pull:
    git fetch origin && git reset --hard origin/main

prod-build:
    docker compose -f {{compose_bws}} build

# Brand-new DB: run the one-shot migrate service directly.
prod-migrate-init:
    docker compose -f {{compose_bws}} run --rm migrate

prod-up:
    docker compose -f {{compose_bws}} up -d --force-recreate --remove-orphans

# Full deploy: pull -> build -> migrate -> up -> prune.
prod-deploy: prod-pull prod-build prod-migrate-init prod-up
    docker image prune -f

# ── Data pull (destructive; interactive confirm) ─────────────────────────────

# Overwrite the LOCAL dev database with a dump of PROD. Destructive.
db-pull:
    #!/usr/bin/env bash
    set -euo pipefail
    read -r -p "Overwrite your LOCAL dev DB with PROD data? type 'pull' to confirm: " ans
    [ "$ans" = "pull" ] || { echo "aborted"; exit 1; }
    dump="/tmp/protopeek-prod-$(date +%Y%m%d-%H%M%S).sql.gz"
    echo "Dumping prod DB (bws_postgres) ..."
    ssh bws 'set -a; . '"{{prod_dir}}"'/.env.prod; set +a; \
        docker exec -e PGPASSWORD="$POSTGRES_PASSWORD" bws_postgres \
        pg_dump -U "$POSTGRES_USER" -d "$POSTGRES_DB" --no-owner --no-privileges | gzip' > "$dump"
    echo "Restoring into local dev Postgres (localhost:${POSTGRES_PORT:-5547}) ..."
    gunzip -c "$dump" | PGPASSWORD="${POSTGRES_PASSWORD:-devpassword}" \
        psql -h localhost -p "${POSTGRES_PORT:-5547}" \
        -U "${POSTGRES_USER:-protopeek_user}" -d "${POSTGRES_DB:-protopeek_dev}"
    echo "restored — dump kept at $dump"

# protopeek stores prototypes in Postgres — there is no media volume.
media-pull:
    @echo "protopeek stores prototypes in Postgres; there is no media to pull. Use 'just db-pull'."

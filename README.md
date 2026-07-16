# ProtoPeek

Share self-contained HTML prototypes behind an unguessable, time-boxed link + an email
allowlist, and collect **annotated feedback** your coding agent can read and synthesize.
Reviewers pin comments right on the page — no signup. Live at
**[protopeek.dev](https://protopeek.dev)**; this repo is the entire service — the server,
the reviewer overlay integration, and the agent skills.

## Use it (hosted, free)

One line in your terminal installs the four skills into Claude Code, Codex, Cursor, or any
[Agent-Skills-compatible](https://skills.sh) tool:

```bash
npx skills@latest add Brightwing-Systems-LLC/protopeek
```

Or as a native Claude Code plugin:

```bash
claude plugin marketplace add Brightwing-Systems-LLC/protopeek
claude plugin install protopeek@protopeek
```

No signup, no account: the first `/proto-up` mints an anonymous `pp_` token (after asking
you) and stores it in `~/.config/protopeek/config`. Then the loop:

```
/proto-up ./prototype.html        → uploads, prints a private shareable URL
   (send URL to reviewers, wait)
/proto-status <url>               → cheap "anything new?" poll (no watermark change)
/proto-feedback <url>             → pulls annotations + screenshots, synthesizes themes + a change list
   (iterate: regenerate → /proto-up --update → repeat)
```

Manual/agent-driven setup is documented at [protopeek.dev/agent.md](https://protopeek.dev/agent.md).

**Privacy posture** (verifiable in this repo): prototypes are reachable only via their
unguessable link, by reviewers whose email matches the allowlist, for a flat **30 days**.
Uploads contain only the HTML + name + allowlist. Tokens are anonymous, rotatable, scoped
to their own prototypes. See [Terms](https://protopeek.dev/tos) ·
[Privacy](https://protopeek.dev/privacy) · [SECURITY.md](SECURITY.md).

## Stack

Django 6 · Django-Ninja API · allauth (owners; Google optional) · signed-cookie reviewer
identity · **Postgres 16** · **Redis 7** (cache + Celery broker) · **Celery + Beat** ·
django-unfold admin · **Tailwind v4** (django-tailwind-cli, no Node) with light/dark/system
theming · django-constance (runtime config) · anymail/Postmark email · WhiteNoise · ASGI
(uvicorn dev / gunicorn+uvicorn prod). Managed with **uv**. Config via **environs**
(`.env` → `.env.prod`).

Deliberately simple where it can be:
- **No S3** — prototypes are self-contained HTML stored in Postgres.
- **No JS build** — the annotation overlay ([SitePing](https://github.com/NeosiaNexus/SitePing),
  MIT) is vendored as one precompiled file, `static/js/siteping.global.js`
  (see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)).

## Develop / self-host

```bash
cp .env.example .env
just compose-dev          # Postgres 16 + Redis 7 (docker)
just migrate
just css-build            # compile Tailwind → static/css/site.css (committed)
just seed-dev-superuser   # dev owner + token (prints the token)
just dev                  # http://127.0.0.1:8904
```

`just` (bare) lists every recipe. `just test` runs pytest (SQLite/locmem — no containers
needed). Sign in at `/admin` with the seeded superuser (public signup/login is unlinked); a
token owner can sign in to the dashboard at `/token`.

For production there's a multi-stage `Dockerfile`, a `docker-compose.bws.yml` (migrate ·
web · celery worker · beat) and a `Caddyfile` (auto-TLS, health-resilient reverse proxy)
to adapt to your own infrastructure. `scripts/dns_setup.py` automates Porkbun DNS if you
use it.

## The two roles

- **Owner** — identified by a `pp_` token minted with **no signup** (`POST /api/tokens`); holds
  prototypes and drives the loop from a coding agent via the API. Can sign in to the
  browser dashboard at `/token` with the token, and optionally *claim* it with an email for
  recovery. (Public signup/login is unlinked — only superusers log in, via `/admin`.)
- **Reviewer** — never signs up; self-asserts an email once (checked against the prototype's
  allowlist, remembered in a signed HttpOnly cookie ~90 days). The comment author is stamped
  **server-side from that cookie**, never trusted from the client.

**Gate on every load:** `link valid (active + not expired)` AND `cookie identity is
allowlisted for this prototype`.

## API (Django-Ninja, `Authorization: Bearer <token>`)

| Method | Path | Purpose |
|---|---|---|
| `POST` | `/api/tokens` | mint an anonymous owner token (no auth) |
| `POST` | `/api/prototypes` | multipart upload → `{uuid, url, version, expires_at}` |
| `GET` | `/api/prototypes` | list your prototypes |
| `GET` | `/api/prototypes/{uuid}/status` | activity counts — **does not** advance the watermark |
| `GET` | `/api/prototypes/{uuid}/feedback` | agent-shaped payload — **advances** the watermark |
| `POST` | `/api/prototypes/{uuid}/access` · `/expire` | edit allowlist · deactivate |

Reviewer surface: `/p/{uuid}` (the prototype with the overlay + reviewer bar injected),
`/p/{uuid}/enter` (rate-limited email form), `/whoami`, and the SitePing widget contract at
`/api/widget` (auth: reviewer cookie). Health: `/api/v1/health`.

## Runtime config (django-constance / `siteconfig`)

Operator-tunable knobs live in constance (change without a restart), not `.env`:
`DEFAULT_ALLOW_DOMAIN`, `ENTER_RATE_LIMIT`, `ENTER_RATE_WINDOW`, `OVERLAY_ENABLED`,
`TOKEN_MINT_LIMIT`, `TOKEN_MINT_WINDOW`. Edit under `/admin/constance/config/`.

Retention is deliberately **not** a constance knob: it's a product invariant —
`settings.PROTOTYPE_EXPIRY_HOURS` (a flat **30 days** for everyone), changeable only by deploy so it
can't silently drift via a stored override or a stale cache.

## Layout

```
config/         settings (environs), urls, asgi, celery, api.py (Ninja + auth tiers), health.py
accounts/       email-login User + DeviceToken, allauth + social adapters, token sign-in/claim
siteconfig/     django-constance registry + typed accessors + context processor
common/         email facade + send_test_email
pages/          landing + legal (ToS/Privacy) + /agent.md + company context processor
prototypes/     Prototype/Version/AccessRule, allowlist, signed-cookie identity, owner API, reviewer views
feedback/       Reviewer/Annotation/Comment/AnnotationShot + the SitePing widget contract
skills/         the four agent skills (what `npx skills add` / the plugin installs)
.claude-plugin/ Claude Code plugin + marketplace manifests
templates/      base (theme switcher), landing, dashboard, viewer, legal, email, errors
static/src/     input.css (Tailwind v4 tokens); compiled → static/css/site.css (committed)
static/js/      vendored siteping.global.js + html2canvas + viewer-chrome.js
Dockerfile · docker-compose.bws.yml · Caddyfile · Justfile · dev_setup/ · scripts/dns_setup.py
```

## Contributing & license

Issues and small PRs welcome — see [CONTRIBUTING.md](CONTRIBUTING.md). Security reports:
[SECURITY.md](SECURITY.md) (privately, please). Licensed [MIT](LICENSE);
vendored components under their own licenses ([THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)).

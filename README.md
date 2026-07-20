<h1><img src="static/img/favicon.svg" width="26" height="26" alt=""> ProtoPeek</h1>

**Share an AI-generated HTML prototype behind a private, time-boxed link. Reviewers pin
comments right on the page — no signup. Your coding agent pulls the feedback back and
iterates.**

Live (hosted, free): **[protopeek.dev](https://protopeek.dev)** · License:
[MIT](LICENSE) · This repo is the entire service — the Django server, the reviewer
overlay integration, and the agent skills. Every privacy claim below is verifiable here.

```
you                      reviewers                  you (again)
────                     ─────────                  ───────────
/proto-up demo.html  →   open the private link   →  /proto-status  (anything new?)
  ↳ prints share URL     pin comments on the page   /proto-feedback
                         (email gate, no signup)      ↳ themes · conflicts · change list
                                                    edit → /proto-up (same link, v2) → repeat
```

---

## Table of contents

- [Why](#why)
- [Quick start (hosted)](#quick-start-hosted)
- [The loop, in practice](#the-loop-in-practice)
- [How access control works](#how-access-control-works)
- [The six skills](#the-six-skills)
- [API reference](#api-reference)
- [Privacy & security](#privacy--security)
- [Self-hosting](#self-hosting)
- [Architecture & design decisions](#architecture--design-decisions)
- [Development](#development)
- [FAQ](#faq)
- [Contributing & license](#contributing--license)

## Why

Coding agents are extremely good at producing single-file HTML prototypes — and terrible
at getting them *reviewed*. Your options were: paste screenshots into chat (feedback loses
its anchor), publish to a hosting platform (public, no annotation), or stand up staging
(heavy, and reviewers still comment in Slack). ProtoPeek is the missing middle:

- **Private by default** — an unguessable link plus an email allowlist, expiring in 30 days.
- **Feedback with coordinates** — reviewers draw a box on the thing they mean; every
  comment carries a CSS selector, an element snapshot, and a screenshot of what they saw.
- **Agent-shaped output** — feedback comes back as structured JSON your agent synthesizes
  into themes, conflicts, and an anchored change list — then edits the prototype and
  ships v2 behind the same link.

## Quick start (hosted)

**Option 1 — Agent Skills installer** (Claude Code, Codex, Cursor, and other
[Agent-Skills-compatible](https://skills.sh) tools):

```bash
npx skills@latest add Brightwing-Systems-LLC/protopeek
```

**Option 2 — native Claude Code plugin:**

```bash
claude plugin marketplace add Brightwing-Systems-LLC/protopeek
claude plugin install protopeek@protopeek
```

**Option 3 — manual.** Point your agent at
[protopeek.dev/agent.md](https://protopeek.dev/agent.md) — consent-first setup docs it can
follow, or that you can read yourself. Everything is plain `curl` under the hood.

There is **no signup** — no account, no password, no email. The first time you run
`/proto-up`, it asks your OK, then mints an anonymous `pp_` token (one API call) and
stores it in `~/.config/protopeek/config` (chmod 600). That token *is* your identity:
it owns your prototypes, it's rotatable, and you can optionally claim it later with an
email at [protopeek.dev/token](https://protopeek.dev/token) so it's recoverable.

## The loop, in practice

```text
you>  /proto-up ./tempo.html --allow example.com
      ✓ https://protopeek.dev/p/d2a6…39b8   (v1, expires in 30 days)
        viewable by: anyone @acme.com (your default) · anyone @example.com

      # send the link; reviewers enter their email once, then pin comments on the page

you>  /proto-status the tempo dashboard
      3 reviewers · 4 comments · 4 new → worth pulling

you>  /proto-feedback https://protopeek.dev/p/d2a6…39b8
      THEMES     visual hierarchy (2 of 3 reviewers) · CTA prominence
      CONFLICT   sam wants the stat tiles demoted; jordan wants them promoted
      CHANGES    #stats → demote to secondary row (sam)
                 #cta   → make "Start workout" the primary action (taylor)
      … want me to make these edits and re-share as v2?

you>  yes
      ✓ /proto-up ./tempo.html   → same link, now v2
```

Details worth knowing:

- **Re-running `/proto-up` on a file keeps the link.** It publishes a new version behind
  the same URL (like a deploy tool) — reviewers refresh and see v2; their old comments
  stay pinned to the version they were left on. `--new` forces a fresh link;
  `--update <url>` targets one explicitly.
- **`/proto-status` is free to spam.** It reads activity counts without consuming the
  "new since last pull" watermark. Only `/proto-feedback` advances it.
- **Natural references work.** "the dashboard from yesterday" resolves against a local
  log (`~/.config/protopeek/prototypes.json`); the server is the source of truth and
  `/proto-list` rebuilds the log if it's lost.
- **Screenshots ride along.** When a reviewer pins a comment, the widget captures what
  they saw (re-encoded server-side to bounded WebP); `/proto-feedback` downloads each
  shot so the agent literally looks at what the reviewer looked at.

## How access control works

Two roles, two separate credentials, deliberately asymmetric:

**Owners** hold a `pp_` bearer token (minted anonymously, no signup). It authenticates
the management API — upload, list, status, feedback, allowlist edits, rename,
deactivate/reactivate, delete. Tokens are rotatable and scoped: a token can only ever
see its own prototypes.

**Reviewers** never authenticate in the account sense. A reviewer opens the link, enters
an email once, and that email is checked against the prototype's allowlist (whole domains
like `acme.com`, or exact addresses). It's then remembered in a **signed, HttpOnly
cookie** (~90 days) so nobody re-types. Every comment's author is stamped **server-side
from that cookie** — never trusted from the client payload.

The gate, enforced on every single load and every widget API call:

```
viewable  =  link is active AND not expired
allowed   =  cookie email matches the prototype's allowlist
access    =  viewable AND allowed
```

Honest caveat (also in the [Terms](https://protopeek.dev/tos)): reviewer identity is
self-asserted — fine for design review attribution, not a strong identity guarantee.
Anyone with the link *and* an allowlisted email address's cooperation can view. Links
self-expire after a flat 30 days, and owners can deactivate — or permanently delete —
one at any time.

## The six skills

| Skill | What it does | Side effects |
|---|---|---|
| `/proto-up <file> [--name] [--allow] [--private] [--new] [--update]` | Upload a prototype and state who can view it; re-running on the same file publishes a new version behind the same link (`--new` forces a fresh one) | Asks before minting a token (first run) and before the first upload of a file |
| `/proto-status <ref>` | Activity counts: reviewers, comments, **new since last pull** | None — read-only, safe to repeat |
| `/proto-feedback <ref>` | Pulls annotations + threads + screenshots, synthesizes themes/conflicts/changes, then indexes every item by id so you can say "resolve 47" or "delete 47" | Advances the new-since watermark; resolving is visible to reviewers |
| `/proto-list` | Every prototype your token owns, with live/expired status, new-feedback hints, and links | Reconciles the local prototype log |
| `/proto-delete <ref>` | Permanently deletes one — link, every version, all feedback | Irreversible; always confirms first (offers reversible deactivation instead) |
| `/proto-config [set-default <domain>]` | Shows your setup — token status, default reviewer domain, prototype log — or changes the default | Writes only the local config file |

**No allowlist magic.** The server creates exactly the rules an upload sends — nothing is
added behind your back. Your default reviewer domain lives in one visible place
(`~/.config/protopeek/config`); `/proto-up` includes it explicitly and *tells you* every
time ("Allowlist: anyone @acme.com — your default"), `--allow` adds people, `--private`
skips the default, and an empty allowlist means a locked link (fail-closed) with a loud
warning.

The skills are plain instructions over `curl` — no SDK, no daemon. Read them in
[`skills/`](skills/) before installing, or vendor and edit them; they're MIT like
everything else here.

## API reference

Owner endpoints authenticate with `Authorization: Bearer <pp_token>`. Mint and verify:

```bash
# mint (no auth — this is onboarding)
curl -s -X POST https://protopeek.dev/api/tokens \
  -H "Content-Type: application/json" \
  -d '{"label":"my-laptop","default_domain":"acme.com"}'
# → { "token": "pp_…", "base_url": "…", "default_domain": "acme.com", "signin_url": "…/token" }

# check
curl -s https://protopeek.dev/api/me -H "Authorization: Bearer $PROTOPEEK_TOKEN"
```

| Method | Path | Purpose |
|---|---|---|
| `POST` | `/api/tokens` | mint an anonymous owner token (rate-limited; no auth) |
| `GET` | `/api/me` | token status + owner summary |
| `POST` | `/api/prototypes` | multipart upload — `html` file + `name`, `domains`, `emails`, optional `update_of=<uuid>` → `{uuid, url, version, expires_at, rules}`. The allowlist is exactly `domains`/`emails` — no server-side defaults; `rules` in the response is the effective list |
| `GET` | `/api/prototypes` | list your prototypes (+ allowlist rules, `total_comments` / `has_new` activity hints) |
| `GET` | `/api/prototypes/{uuid}` | one prototype |
| `PATCH` | `/api/prototypes/{uuid}` | `{"name": …, "is_active": …}` — rename, deactivate, or reactivate (reactivating an expired link restarts the 30-day clock) |
| `DELETE` | `/api/prototypes/{uuid}` | permanently delete — the link, every version's HTML, all feedback and screenshots (204 on success) |
| `GET` | `/api/prototypes/{uuid}/status` | activity counts — does **not** advance the watermark |
| `GET` | `/api/prototypes/{uuid}/feedback[?since=ts]` | full agent-shaped payload — **advances** the watermark |
| `GET` | `/api/prototypes/{uuid}/annotations/{id}/shot` | reviewer screenshot (WebP; ETag = sha256) — Bearer-authed, so `curl` only |
| `GET` | `/s/{signed}` | the same screenshot from a signed, time-boxed link (`SHOT_LINK_MAX_AGE`, default 7 days) — no auth, so it opens in a browser. Handed to you as `screenshot.view_url` |
| `PATCH` | `/api/prototypes/{uuid}/annotations/{id}` | `{"resolved": true\|false}` — mark one reviewer pin addressed, or reopen it. Visible to reviewers in the overlay |
| `DELETE` | `/api/prototypes/{uuid}/annotations/{id}` | permanently delete one pin — its screenshot and reply thread go with it (204 on success) |
| `POST` | `/api/prototypes/{uuid}/access` | add/remove allowlist domains & emails |

**Skill version negotiation.** Send `X-ProtoPeek-Skills: <version>` on any call and every
`/api/` response answers with `skills: {client, latest, status}` in the body, plus
`X-ProtoPeek-Skills-Status` and `-Latest` headers (the only channel on array and binary
responses). `status` is `current`, `update-available`, `update-required`, or `unknown`
(a client too old to report its own version). `latest` is read from
`.claude-plugin/plugin.json`, so shipping a skill change bumps it automatically; the
`SKILLS_MIN_SUPPORTED` constance knob escalates a release to `update-required` without a
deploy. The payload is deliberately inert — a version and an enum, never a command — so a
spoofed response can't put shell in front of an agent. `just check-skill-versions` fails
the build if the six skills and the manifest disagree.

The feedback payload per annotation: `id`, `type` (question/change/bug/other), `note`,
`author`, `version`, `resolved`, `css_selector`, `element_snapshot`, a `thread[]` of
replies, and `screenshot` (`null` or `{url, width, height}`).

Reviewer surface (cookie-gated, no token): `/p/{uuid}` (the prototype with the annotation
overlay injected), `/p/{uuid}/enter` (rate-limited email form), `/whoami`, and
`/api/widget` — the [SitePing](https://github.com/NeosiaNexus/SitePing) widget's 4-verb
contract (create/list/resolve/delete; reviewers can only delete their own feedback).
Health: `/api/v1/health`.

## Privacy & security

Everything below is enforced in code you can read in this repo:

- **What an upload contains:** the HTML file, a display name, allowlist rules. Nothing
  else. Your conversation with your agent never leaves your machine
  ([`prototypes/api.py`](prototypes/api.py)).
- **Who can see a prototype:** only someone with the unguessable link **and** an
  allowlisted email, only while it's active ([`prototypes/views.py`](prototypes/views.py),
  [`feedback/api.py`](feedback/api.py)).
- **Retention:** a flat 30 days for everyone — a deploy-time invariant
  (`PROTOTYPE_EXPIRY_HOURS`), deliberately not a runtime knob, so it can't silently drift.
  Expired prototypes are **hard-deleted 14 days after expiry** (`PROTOTYPE_PURGE_GRACE_DAYS`,
  enforced by a daily purge task), and owners can delete any prototype instantly via
  `DELETE /api/prototypes/{uuid}`, `/proto-delete`, or the dashboard.
- **Author integrity:** comment authorship is stamped server-side from the signed cookie;
  the client-supplied identity is ignored.
- **Screenshot hygiene:** client screenshots are decoded and **re-encoded through Pillow**
  to bounded WebP (≤1600px, ≤1MB) — an embedded payload doesn't survive re-encoding.
- **Storage:** prototypes and screenshots live in Postgres (no S3, no third-party object
  store). No analytics, no tracking cookies.
- **Tokens:** anonymous, rotatable, revocable, scoped to their own prototypes.

Formal docs: [Terms](https://protopeek.dev/tos) ·
[Privacy Policy](https://protopeek.dev/privacy). Found a vulnerability? Please report it
privately — see [SECURITY.md](SECURITY.md).

## Self-hosting

ProtoPeek is a standard Django 6 project; if you'd rather run your own, everything ships
in this repo.

**Requirements:** Python 3.13 + [uv](https://docs.astral.sh/uv/), Docker (for Postgres 16
+ Redis 7 in dev; or bring your own), [`just`](https://github.com/casey/just).

```bash
git clone https://github.com/Brightwing-Systems-LLC/protopeek && cd protopeek
cp .env.example .env       # then set SECRET_KEY, BASE_URL, DB/Redis creds
just compose-dev           # Postgres 16 + Redis 7 (docker)
just migrate
just css-build             # compile Tailwind → static/css/site.css
just seed-dev-superuser    # dev owner + token (prints the token)
just dev                   # http://127.0.0.1:8904
```

Key environment variables (see [`.env.example`](.env.example) for the full annotated set):

| Variable | Meaning |
|---|---|
| `SECRET_KEY` | Django signing key — also signs the reviewer-identity cookie |
| `BASE_URL` | absolute origin used in share links (e.g. `https://proto.example.com`) |
| `ALLOWED_HOSTS` / `CSRF_TRUSTED_ORIGINS` | include your domain (and any internal health-check alias) |
| `POSTGRES_*`, `REDIS_*` | datastores (Redis backs cache, rate limits, Celery) |
| `EMAIL_BACKEND`, `DEFAULT_FROM_EMAIL` | console backend by default; Postmark via anymail in prod |
| `ALLOW_SIGNUPS` | `first_only` bootstraps the first superuser, then set `false` |

**Production:** multi-stage [`Dockerfile`](Dockerfile) +
[`docker-compose.bws.yml`](docker-compose.bws.yml) (migrate → web → celery worker → beat)
+ [`Caddyfile`](Caddyfile) (auto-TLS, health-resilient reverse proxy) to adapt to your
infrastructure. Two hard-won health-check notes are baked in: the health endpoint is
exempt from the SSL redirect, and your proxy's internal service alias must be in
`ALLOWED_HOSTS`. `scripts/dns_setup.py` automates Porkbun DNS if that's your registrar.

Runtime knobs live in django-constance (`/admin/constance/config/`, no restart needed):
`DEFAULT_ALLOW_DOMAIN`, `ENTER_RATE_LIMIT`, `ENTER_RATE_WINDOW`, `OVERLAY_ENABLED`,
`TOKEN_MINT_LIMIT`, `TOKEN_MINT_WINDOW`.

## Architecture & design decisions

```
config/         settings (environs), urls, asgi, celery, api.py (Ninja + auth tiers), health.py
accounts/       email-login User + DeviceToken (pp_ tokens), allauth, token sign-in/claim
prototypes/     Prototype / PrototypeVersion / AccessRule, allowlist, signed-cookie identity,
                owner API, reviewer views (overlay + reviewer-bar injection), retention purge
feedback/       Reviewer / Annotation / Comment / AnnotationShot + the SitePing widget contract
siteconfig/     django-constance registry + typed accessors
pages/          landing, ToS/Privacy, /agent.md
common/         email facade
skills/         the six agent skills (what the installers copy)
.claude-plugin/ Claude Code plugin + marketplace manifests
static/js/      vendored siteping.global.js + modern-screenshot + viewer-chrome.js
```

Decisions, and why:

- **HTML in Postgres, no S3.** Prototypes are single self-contained files with a 30-day
  life. A second datastore buys nothing but failure modes.
- **No JS build.** The annotation overlay is a vendored, precompiled MIT bundle
  ([SitePing](https://github.com/NeosiaNexus/SitePing) — see
  [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) and
  `static/js/SITEPING_VERSION.txt` for the deliberate local patches). Tailwind v4
  compiles via `django-tailwind-cli` — no Node anywhere.
- **Prototype served top-level, not in an iframe.** `position:fixed` inside an iframe is
  unreliable on iOS Safari; the overlay + reviewer bar are string-injected into the
  gated HTML response instead (`_inject_overlay` / `_inject_chrome`).
- **Reviewer identity as a signed cookie, not a User row.** Reviewers shouldn't need
  accounts; forgery is prevented by Django signing, and attribution honesty is documented
  rather than oversold.
- **Watermark semantics split across two endpoints** so agents can poll freely
  (`/status`) without eating the "what's new" signal (`/feedback`).
- **Token-first onboarding.** Identity = one anonymous API call. The dashboard is
  optional; claiming with an email is optional; the API is the product.

Stack: Django 6 · django-ninja · allauth · Postgres 16 · Redis 7 · Celery + Beat ·
django-unfold · Tailwind v4 · django-constance · anymail/Postmark · WhiteNoise · ASGI
(uvicorn dev / gunicorn+uvicorn prod) · managed with uv.

## Development

```bash
just            # list every recipe
just test       # pytest — runs on SQLite/locmem, no containers needed
just test-cov   # with coverage
just css-watch  # Tailwind in watch mode
ruff check .    # lint (CI-clean expected)
```

Tests live next to their apps (`accounts/tests/`, `prototypes/tests/`,
`feedback/tests/`, `pages/tests/`). The suite is deliberately fast (<1s) — please keep
it that way.

## FAQ

**Is my prototype public?** No. It's reachable only via its unguessable UUID link, by
people whose email matches your allowlist, until it expires. There's no directory, no
search, no crawlable index.

**What if the link leaks?** A leaked link alone doesn't grant access (the email gate
still applies), and every link dies after 30 days. You can also deactivate it instantly
(`PATCH /api/prototypes/{uuid}` with `{"is_active": false}`, or the dashboard) — or
delete the prototype outright.

**What exactly does my agent send to protopeek.dev?** The HTML file, a name, and
allowlist rules — that's the entire upload payload. Conversations never leave your
machine. Verify in [`skills/proto-up/SKILL.md`](skills/proto-up/SKILL.md) and
[`prototypes/api.py`](prototypes/api.py).

**Can I delete my data?** Yes, instantly and self-serve: `/proto-delete <ref>` (or
`DELETE /api/prototypes/{uuid}`, or the dashboard) permanently removes a prototype —
every version, all feedback, all screenshots. Anything you don't delete yourself is
purged automatically 14 days after its 30-day expiry. For anything else (e.g. data tied
to your email), contact privacy@brightwingsystems.com (see the
[Privacy Policy](https://protopeek.dev/privacy)).

**What if I lose my token?** An unclaimed token can't be recovered — claim it with an
email at [protopeek.dev/token](https://protopeek.dev/token) to make it recoverable. (The
skills suggest this after your first upload.)

**Why a flat 30 days?** Prototypes are conversation pieces, not artifacts of record. A
fixed lifetime keeps the privacy story simple and is enforced as a deploy-time invariant
so it can't drift silently.

**Hosted or self-host?** protopeek.dev is free and runs exactly this code. Self-host if
your prototypes can't leave your infrastructure — it's one compose stack.

## Contributing & license

Bug reports and small PRs welcome — see [CONTRIBUTING.md](CONTRIBUTING.md) for
expectations (spoiler: open an issue before a big PR). Security reports go to
[SECURITY.md](SECURITY.md), privately. Licensed [MIT](LICENSE); vendored components
under their own licenses ([THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)).

---

ProtoPeek is a [Brightwing Systems](https://brightwingsystems.com) product ·
[protopeek.dev](https://protopeek.dev)

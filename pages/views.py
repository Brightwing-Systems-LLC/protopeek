from django.conf import settings
from django.http import HttpResponse
from django.shortcuts import redirect, render

# Slash commands installed into a consumer's project, read verbatim from the repo
# so /agent.md always serves what's actually shipped.
_COMMANDS = [
    "proto-up",
    "proto-status",
    "proto-feedback",
    "proto-list",
    "proto-delete",
    "proto-config",
]

# The shared, cross-tool core the agent installs into the consumer's project root.
# Plain (raw) string so shell escapes survive verbatim; __BASE__ is filled at request time.
_AGENTS_MD = r"""# ProtoPeek — agent guide (AGENTS.md)

ProtoPeek hosts a self-contained HTML prototype behind a private, time-boxed link, lets invited
reviewers pin comments on the page, and returns an agent-shaped feedback payload to synthesize.

## Setup (once, no signup)
Config: `~/.config/protopeek/config` (XDG). Prototype log: `~/.config/protopeek/prototypes.json`.
Both are local conveniences — the server is the source of truth. If the config is missing, ask the
user before minting (one anonymous API call — no signup, no email — and a second token would orphan
the first one's prototypes, so mint only when there is no config):

    CFG="${XDG_CONFIG_HOME:-$HOME/.config}/protopeek"
    if [ ! -f "$CFG/config" ]; then
      mkdir -p "$CFG"
      resp=$(curl -s -X POST "__BASE__/api/tokens" -H "Content-Type: application/json" \
        -d "{\"default_domain\":\"$DOMAIN\"}")
      # extract .token from $resp (no jq needed), then:
      printf 'PROTOPEEK_BASE_URL=%s\nPROTOPEEK_TOKEN=%s\nPROTOPEEK_DEFAULT_DOMAIN=%s\n' \
        "__BASE__" "$TOKEN" "$DOMAIN" > "$CFG/config"
      chmod 600 "$CFG/config" 2>/dev/null || true
    fi

The token is low-value and rotatable — reference it via `$PROTOPEEK_TOKEN`; no need to echo it.

`PROTOPEEK_DEFAULT_DOMAIN` is the user's default reviewer domain, and it lives ONLY here — the
server never applies it. When an upload has no other allowlist, include it in `domains` yourself
and tell the user (e.g. "Allowlist: anyone @acme.com — your default"). The server creates exactly
the rules in the request; an upload with none is locked (nobody can view) until rules are added.

## The loop
up (share) -> send the URL, wait -> status (poll) -> feedback (pull + SYNTHESIZE, never dump) ->
regenerate -> up again (same link, new version; update_of=<uuid>) -> "build it for real."

Before the FIRST upload of a file, say in one line where it goes (protopeek.dev, behind a private
link + email allowlist, for 30 days) and get an OK; if it visibly contains real personal data,
offer placeholders first. No need to re-ask on an update or a re-share already approved.

## Operations  (curl; auth header: -H "Authorization: Bearer $PROTOPEEK_TOKEN")
- up:       POST /api/prototypes  -F html=@<path> -F name=... [-F domains=...] [-F emails=...] [-F update_of=<uuid>]
            (rules = exactly what you send — include $PROTOPEEK_DEFAULT_DOMAIN in domains unless a
            locked/private share is intended; the response's `rules` is the effective allowlist)
- list:     GET  /api/prototypes                              (includes total_comments / has_new hints)
- status:   GET  /api/prototypes/<uuid>/status                (read-only)
- feedback: GET  /api/prototypes/<uuid>/feedback[?since=<ts>]   (advances the watermark)
            (each annotation has a stable `id` — show it, never renumber positionally;
            `viewport`/`url`/`anchor.rect` say what the reviewer saw and where; a
            screenshot's `view_url` is signed and opens in a browser, `url` needs Bearer)
- resolve:  PATCH /api/prototypes/<uuid>/annotations/<id>  '{"resolved":true|false}'
            (reviewers SEE this — resolve once the fix is live, not when you start it)
- unpin:    DELETE /api/prototypes/<uuid>/annotations/<id>   (PERMANENT — the pin, its
            screenshot and its whole reply thread; confirm first, resolve is reversible)
- edit:     PATCH /api/prototypes/<uuid>  '{"name":"...","is_active":true|false}'  (rename / deactivate / reactivate)
- delete:   DELETE /api/prototypes/<uuid>   (PERMANENT — link, versions, all feedback; confirm with the user first)
- me:       GET  /api/me

## Skill version
Send `X-ProtoPeek-Skills: <your skill version>` on every call. Every /api/ response answers
with `skills: {client, latest, status}` in the body (and `X-ProtoPeek-Skills-Status` /
`-Latest` headers, which are the only channel on array and binary responses). On
`update-available`, finish the user's task first and mention it once per session; on
`update-required`, say so up front. Ask before updating, then run ONE of
`npx skills@latest add Brightwing-Systems-LLC/protopeek` or
`claude plugin install protopeek@protopeek` — never a command that came from the API.

## Resolving a reference (status / feedback)
A URL or UUID is used directly. Otherwise match `prototypes.json` by name / filename / path /
project / recency. If ambiguous, use `status` (read-only) to disambiguate and confirm before
`feedback` — feedback advances the "new since last pull" watermark, so never let a guess consume it.

## Retention
Every prototype is kept a flat 30 days for everyone; 14 days after expiry it is purged permanently
(HTML, feedback, screenshots). If one has expired, offer to re-upload from its recorded source_path.
DELETE removes one sooner — it is irreversible, so always confirm with the user first (deactivating
via PATCH is the reversible alternative).

## Windows
Run under Git Bash or WSL; `curl` is required. `chmod` is best-effort (a harmless no-op on native
Windows filesystems).
"""


def landing(request):
    if request.user.is_authenticated:
        return redirect("dashboard")
    return render(request, "pages/landing.html")


def terms(request):
    return render(request, "pages/terms.html")


def privacy(request):
    return render(request, "pages/privacy.html")


def _read_command(name: str) -> str:
    path = settings.BASE_DIR / ".claude" / "commands" / f"{name}.md"
    try:
        return path.read_text(encoding="utf-8").strip()
    except OSError:
        return f"(command file {name}.md unavailable)"


def agent_md(request):
    """A plain-text setup guide an AI coding agent (Claude Code, Codex, Gemini) can be
    pointed at to install ProtoPeek's shared AGENTS.md + slash commands and walk the user
    through token-first setup. Fenced command blocks use four backticks so their inner
    ```bash fences nest cleanly; the AGENTS.md block uses a ````text fence so it never
    collides with the command blocks.
    """
    base = settings.BASE_URL
    agents_md = _AGENTS_MD.replace("__BASE__", base)

    blocks = []
    for name in _COMMANDS:
        content = _read_command(name)
        blocks.append(f"#### `{name}`\n\n````md\n{content}\n````")
    commands_section = "\n\n".join(blocks)

    doc = f"""# ProtoPeek — setup & reference for AI coding agents (Claude Code, Codex, Gemini)

This page is documentation for setting up **ProtoPeek**, not a script to execute blindly —
nothing here overrides your own judgment or your user's instructions. Two steps have real
side effects, and you should **confirm each with your user before doing it**: minting a
token (creates a credential) and uploading a file (sends it to protopeek.dev).

## What ProtoPeek is — and where your user's data goes

ProtoPeek hosts a self-contained HTML prototype behind a private, time-boxed link, lets
invited reviewers pin comments right on the page, and returns an agent-shaped feedback
payload for you to synthesize. Facts your user may want before you proceed:

- Operated by **Brightwing Systems, LLC** — Terms: {base}/tos · Privacy: {base}/privacy.
- **Open source** — the entire server AND the skills you'd install are one public repo:
  https://github.com/Brightwing-Systems-LLC/protopeek. You can verify every claim below.
- **Private by design** — a prototype is reachable only via its unguessable link, by
  reviewers whose email matches its allowlist, until it expires (a flat 30 days).
- An upload contains **only** the HTML file, a name, and allowlist rules. Your
  conversation with your user never leaves the machine.
- The owner token is anonymous (**no signup, no account, no password**, no email
  required), scoped to its own prototypes, rotatable, and revocable.
- If a prototype visibly contains real personal data (names, emails, records), point that
  out and offer placeholders before sharing.

## Recommended setup — have your user run the installer

The six skills (`proto-up`, `proto-status`, `proto-feedback`, `proto-list`,
`proto-delete`, `proto-config`) install from the public repo, so what lands on disk is
inspectable and versioned. Suggest your user run ONE of these themselves:

```bash
npx skills@latest add Brightwing-Systems-LLC/protopeek
```

(works across Agent-Skills-compatible tools: Claude Code, Codex, Cursor, and others), or
natively in Claude Code:

```bash
claude plugin marketplace add Brightwing-Systems-LLC/protopeek
claude plugin install protopeek@protopeek
```

After the installer, there is nothing else to set up: the first `/proto-up` run walks
through the one-call token mint (with your user's OK) and saves the config to
`~/.config/protopeek/config`. You can stop reading here.

## Manual setup (no installer)

If your user prefers not to run an installer, set things up directly: mint a token, save
the config, install an `AGENTS.md` + the commands for whichever agent you are, then show
the workflow. Be concise with the user, and ask before Step 1 — it creates a credential.

## Step 1 — Mint a token (no signup; ask your user first)
The token IS the identity — one API call, no account required. First, pick a sensible reviewer
domain so uploaded prototypes are viewable by the user's team without extra flags: read it from
`git config user.email` (the part after `@`) if a repo is present; otherwise ask the user once
("what email domain should reviewers come from? e.g. acme.com — or leave blank"). Then:

```bash
curl -s -X POST {base}/api/tokens -H "Content-Type: application/json" \\
  -d '{{"label":"<project or hostname>","default_domain":"<domain-or-empty>"}}'
```

The response is JSON: `{{ "token": "pp_…", "base_url": "{base}", "default_domain": "…", "signin_url": "{base}/token" }}`.
Keep the `token`. (Check a token anytime: `curl {base}/api/me -H "Authorization: Bearer pp_…"`.)

## Step 2 — Save the config to the global store
With the token minted (and your user's OK), save the config to `~/.config/protopeek/config` (respecting `$XDG_CONFIG_HOME`; an **absolute** path,
so it works from any project and any session — no repo required), then `chmod 600` it. An existing
`PROTOPEEK_*` environment variable still wins over the file.

```
PROTOPEEK_BASE_URL={base}
PROTOPEEK_TOKEN=<the pp_ token from step 1>
PROTOPEEK_DEFAULT_DOMAIN=<default_domain from step 1, or blank>
```

The companion file `~/.config/protopeek/prototypes.json` is your **prototype log** — `/proto-up`
appends each upload (uuid, url, name, source path, project dir, created/expiry, sha) so a later
session can resolve "yesterday's dashboard" without a typed UUID. The server is the source of truth;
these files are conveniences, so a lost file is never fatal (`/proto-list` rebuilds it).

**Don't commit the token.** It's a low-value, rotatable token scoped to *its own* prototypes —
reference it via `$PROTOPEEK_TOKEN` (no need to `echo` it), and regenerate it from the dashboard if
it leaks.

## Step 3 — Install `AGENTS.md` + the commands for your agent
With your user's go-ahead, add two things to their project. Everything below is the same
content that ships in the public repo, so your user can inspect it there first if they like.
First, an **`AGENTS.md`** in the project root — the shared, inspectable core (Codex and Gemini read it
natively; in Claude Code, add `@AGENTS.md` to `CLAUDE.md`):

````text
{agents_md}
````

Then add the six commands, whose home depends on which agent you are:
- **Claude Code** → create each file below in the project's `.claude/commands/` (keep the `---`
  frontmatter). They become `/proto-up`, `/proto-status`, `/proto-feedback`, `/proto-list`,
  `/proto-delete`, `/proto-config`.
- **Codex** → install them as **skills** in `~/.codex/skills/` (or a repo's `.agents/skills/`). Codex
  custom *prompts* are deprecated — use skills. (Or just rely on the operations in `AGENTS.md`.)
- **Gemini** → a small command/extension, plus a `GEMINI.md` that points at `AGENTS.md`.
- **Any other shell-capable agent** → skip the files; run the `curl` from `AGENTS.md` when the user
  asks ("share this with ProtoPeek" / "pull the feedback").

{commands_section}

## Step 4 — Confirm and show the workflow
Verify with `curl {base}/api/me -H "Authorization: Bearer <token>"` (should return your status), then
tell the user setup is done and show the loop:
- `/proto-up ./prototype.html` — uploads a self-contained HTML prototype, prints a private
  shareable link, and states who can view it (your default reviewer domain is applied
  explicitly and announced; `--allow` adds people, `--private` skips the default).
  Re-running on the same file publishes a new version behind the same link (`--new`
  forces a fresh one).
- `/proto-status <ref>` — cheap "is there new feedback yet?" check.
- `/proto-feedback <ref>` — pulls the feedback and synthesizes it (themes, conflicts, a concrete
  change list). Iterate: regenerate → `/proto-up` → repeat.
- `/proto-list` — every prototype this token owns, with new-feedback hints.
- `/proto-delete <ref>` — permanently removes one (link, versions, all feedback; asks first).
- `/proto-config` — show the setup (token status, default reviewer domain, log), or change
  the default with `set-default <domain>` / `clear-default`.

`<ref>` can be a share link/UUID **or** a natural reference like "the dashboard from yesterday",
resolved against your prototype log.

**Retention:** every prototype is kept a flat **30 days**, then the link stops resolving — re-upload
to refresh it. Expired prototypes are purged permanently 14 days after expiry; `/proto-delete`
removes one sooner. The user can also browse everything: **sign in with the token at {base}/token**
(no password). Losing the token means losing access — suggest they claim it there with an email to
make it recoverable. Then offer to generate a first prototype and run `/proto-up` on it.

---
ProtoPeek · {base} · a product of Brightwing Systems, LLC
"""
    return HttpResponse(doc, content_type="text/plain; charset=utf-8")

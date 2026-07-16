---
description: Upload a self-contained HTML prototype to ProtoPeek and print the shareable URL. Re-running on the same file publishes a new version behind the same link.
argument-hint: <path-to-html> [--name "..."] [--allow domain-or-email] [--new] [--update <url-or-uuid>]
allowed-tools: Bash
---

Upload an HTML prototype to ProtoPeek and return a shareable link. Works like a deploy
tool: the first run of a file mints a link; later runs publish a new version behind the
SAME link by default (reviewers just refresh — no link churn).

Arguments: `$ARGUMENTS`
- First token is the path to the self-contained `.html` file.
- Optional flags:
  - `--name "..."` — display name (defaults to the file name).
  - `--allow <domain-or-email>` — add an allowlist rule (repeatable; comma-separate values).
    Optional: if omitted, your key's default reviewer domain (`PROTOPEEK_DEFAULT_DOMAIN`,
    set at setup) is applied automatically by the server.
  - `--new` — force a FRESH link even if this file was shared before.
  - `--update <url-or-uuid>` — explicitly target an existing link (overrides the log lookup).

Steps:
1. **Load config (global store, mint-once).** Prefer the environment; otherwise source the global
   config. If neither has a token, **ask the user before minting one** — it's a single anonymous
   API call (no signup, no email) and the token lands in `~/.config/protopeek/config` (chmod 600).
   On a yes, follow the one-time setup in `AGENTS.md`.
   ```bash
   CFG="${XDG_CONFIG_HOME:-$HOME/.config}/protopeek"
   [ -n "$PROTOPEEK_TOKEN" ] || . "$CFG/config" 2>/dev/null
   ```
2. Parse the path and flags from `$ARGUMENTS`. Split `--allow` values into `domains`
   (no `@`) and `emails` (contains `@`), joined comma-separated.
3. **First share of this file?** Say in one line where it's going — stored on protopeek.dev behind
   a private link + email allowlist for a flat 30 days — and get an OK. If it visibly contains real
   personal data (names, emails, records), offer placeholders first. Skip the re-ask on an update
   or a re-share the user already approved.
4. **Create or update?** Decide the target before uploading:
   - `--update <url-or-uuid>` → extract the trailing UUID and pass `update_of=<uuid>`.
   - `--new` → always create a fresh link.
   - Neither flag: check `$CFG/prototypes.json` for records under this project directory whose
     `source_path` matches this file (or whose `content_sha256` matches). Exactly one match →
     **update it by default**: announce "publishing v<N+1> behind <url>" and pass
     `update_of=<uuid>`. More than one candidate → list them and ask. None → create a new link.
     (Default-update means reviewers' link and feedback history stay put; a fresh link is the
     deliberate exception, not an accident.)
5. Run curl (multipart):
   ```bash
   curl -s -X POST "$PROTOPEEK_BASE_URL/api/prototypes" \
     -H "Authorization: Bearer $PROTOPEEK_TOKEN" \
     -F "html=@<path>;type=text/html" \
     -F "name=<name>" \
     -F "domains=<domains>" \
     -F "emails=<emails>" \
     -F "update_of=<uuid-if-any>"
   ```
6. Parse the JSON response (`uuid`, `url`, `version`, `expires_at`) and print, clearly:
   - the **shareable URL** (`url`),
   - the version number and the expiry (a flat **30 days** from upload).
7. **Record it** in `$CFG/prototypes.json` (atomic write — temp file + rename): a record keyed by
   `uuid` with `url`, `name`, `source_path`, `source_basename`, `project_dir` (the cwd/repo),
   `created_at`, `expires_at`, `version`, and the `content_sha256` of the uploaded file. On an
   update, refresh the existing record (`version`, `content_sha256`, `name`) instead of adding one.
   Then remind the user: send the URL to reviewers; run `/proto-status <url>` to poll,
   `/proto-feedback <url>` to pull and synthesize.

Reference the token via `$PROTOPEEK_TOKEN` — no need to echo it. If the response is an error, show
the status and `detail`.

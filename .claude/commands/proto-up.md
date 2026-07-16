---
description: Upload a self-contained HTML prototype to ProtoPeek and print the shareable URL.
argument-hint: <path-to-html> [--name "..."] [--allow domain-or-email] [--update <url-or-uuid>]
allowed-tools: Bash
---

Upload an HTML prototype to ProtoPeek and return a shareable link.

Arguments: `$ARGUMENTS`
- First token is the path to the self-contained `.html` file.
- Optional flags:
  - `--name "..."` — display name (defaults to the file name).
  - `--allow <domain-or-email>` — add an allowlist rule (repeatable; comma-separate values).
    Optional: if omitted, your key's default reviewer domain (`PROTOPEEK_DEFAULT_DOMAIN`,
    set at setup) is applied automatically by the server.
  - `--update <url-or-uuid>` — publish a NEW VERSION behind the same link (no link churn).

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
   personal data (names, emails, records), offer placeholders first. Skip the re-ask on `--update`
   or a re-share the user already approved.
4. If `--update` is given, extract the trailing UUID from the URL and pass `update_of=<uuid>`.
   Otherwise, if `$CFG/prototypes.json` already holds a record with the SAME content SHA under this
   project directory, **suggest `--update <that-uuid>`** rather than churning a new link — ask first.
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
   `created_at`, `expires_at`, `version`, and the `content_sha256` of the uploaded file. This lets a
   later session resolve "yesterday's dashboard" without a typed UUID.
   Then remind the user: send the URL to reviewers; run `/proto-status <url>` to poll,
   `/proto-feedback <url>` to pull and synthesize.

Reference the token via `$PROTOPEEK_TOKEN` — no need to echo it. If the response is an error, show
the status and `detail`.

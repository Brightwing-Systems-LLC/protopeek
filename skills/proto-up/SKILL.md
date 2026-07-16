---
name: proto-up
description: Upload a self-contained HTML prototype to ProtoPeek (protopeek.dev) and print the private, shareable review link. Use when the user wants to share a prototype for review, publish a new version of one, or says "proto-up".
---

Upload an HTML prototype to ProtoPeek and return a shareable link. ProtoPeek
(https://protopeek.dev, source: https://github.com/Brightwing-Systems-LLC/protopeek) hosts
the file behind an unguessable link, gated by an email allowlist, for a flat 30 days.
Invited reviewers pin comments on the page; `/proto-feedback` pulls them back.

Arguments: the first token is the path to the self-contained `.html` file. Optional flags:

- `--name "..."` — display name (defaults to the file name).
- `--allow <domain-or-email>` — add an allowlist rule (repeatable; comma-separate values).
  If omitted, the token's default reviewer domain (set at mint time) is applied by the server.
- `--update <url-or-uuid>` — publish a NEW VERSION behind the same link (no link churn).

## Step 0 — Config (ask before minting)

```bash
CFG="${XDG_CONFIG_HOME:-$HOME/.config}/protopeek"
[ -n "$PROTOPEEK_TOKEN" ] || . "$CFG/config" 2>/dev/null
```

If there is still no `$PROTOPEEK_TOKEN`, **ask the user before doing anything**: minting a
token is one anonymous API call to protopeek.dev — no account, no signup, no personal data —
and the token will be stored at `~/.config/protopeek/config` (chmod 600). Suggest a default
reviewer domain (from `git config user.email`'s domain, or ask; blank is fine). On a yes:

```bash
mkdir -p "$CFG"
resp=$(curl -s -X POST "https://protopeek.dev/api/tokens" -H "Content-Type: application/json" \
  -d "{\"label\":\"$(hostname)\",\"default_domain\":\"$DOMAIN\"}")
# extract .token from $resp, then:
printf 'PROTOPEEK_BASE_URL=%s\nPROTOPEEK_TOKEN=%s\nPROTOPEEK_DEFAULT_DOMAIN=%s\n' \
  "https://protopeek.dev" "$TOKEN" "$DOMAIN" > "$CFG/config"
chmod 600 "$CFG/config" 2>/dev/null || true
```

Mint only if the config is missing (a second token would orphan the first token's
prototypes). The token is low-value and rotatable — reference it as `$PROTOPEEK_TOKEN`,
never echo it, never commit it.

## Step 1 — Confirm before the first upload of a file

Before uploading a file for the first time, tell the user in one line where it's going:
the HTML is stored on protopeek.dev, reachable only via the unguessable link by reviewers
whose email matches the allowlist, and expires in 30 days. If the prototype visibly
contains real personal data (real names, emails, customer records), point that out and
offer to swap in placeholders first. On `--update`, or re-sharing a file the user already
approved, don't re-ask.

## Step 2 — Parse and upload

Split `--allow` values into `domains` (no `@`) and `emails` (contains `@`), joined
comma-separated. If `--update` was given, extract the trailing UUID from the URL and pass
`update_of=<uuid>`. Otherwise, if `$CFG/prototypes.json` already holds a record with the
same content SHA under this project directory, suggest `--update <that-uuid>` instead of
churning a new link — ask first.

```bash
curl -s -X POST "$PROTOPEEK_BASE_URL/api/prototypes" \
  -H "Authorization: Bearer $PROTOPEEK_TOKEN" \
  -F "html=@<path>;type=text/html" \
  -F "name=<name>" \
  -F "domains=<domains>" \
  -F "emails=<emails>" \
  -F "update_of=<uuid-if-any>"
```

## Step 3 — Report and record

Parse the JSON response (`uuid`, `url`, `version`, `expires_at`) and print clearly: the
**shareable URL**, the version number, and the expiry (a flat 30 days from upload). Then
record it in `$CFG/prototypes.json` (atomic write — temp file + rename): a record keyed by
`uuid` with `url`, `name`, `source_path`, `source_basename`, `project_dir`, `created_at`,
`expires_at`, `version`, and the `content_sha256` of the uploaded file. This lets a later
session resolve "yesterday's dashboard" without a typed UUID.

Remind the user: send the URL to reviewers; `/proto-status <url>` polls cheaply,
`/proto-feedback <url>` pulls and synthesizes. If the response is an error, show the
status and `detail`.

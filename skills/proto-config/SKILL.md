---
name: proto-config
description: Show or change the ProtoPeek setup on this machine — token status, default reviewer domain, prototype log. Use when the user asks what their ProtoPeek defaults are, wants to change the default reviewer domain, or wants to check their token.
---

Show the ProtoPeek setup on this machine, or change the default reviewer domain.
Nothing here is hidden: the default domain lives in one file and is only ever applied
by `/proto-up` explicitly (and announced when it is).

Arguments: empty to show, `set-default <domain>` or `clear-default` to change.

## Step 1 — Config

```bash
CFG="${XDG_CONFIG_HOME:-$HOME/.config}/protopeek"
[ -n "$PROTOPEEK_TOKEN" ] || . "$CFG/config" 2>/dev/null
```

If there is no config, say so and point at `/proto-up` (which walks through setup) —
nothing to show or set.

## Step 2 — No arguments → show the setup

- `PROTOPEEK_BASE_URL`, and token status from
  ```bash
  curl -s "$PROTOPEEK_BASE_URL/api/me" -H "Authorization: Bearer $PROTOPEEK_TOKEN"
  ```
  (report `provisional` — suggest claiming at `signin_url` if true — and
  `active_prototypes`; never echo the token itself).
- **Default reviewer domain**: `PROTOPEEK_DEFAULT_DOMAIN`, with what it means —
  `/proto-up` includes it in the allowlist when no `--allow` is given, announcing it
  each time; `--private` skips it; it is never applied server-side.
- The prototype log: `$CFG/prototypes.json` and how many records it holds.

## Step 3 — Change it

**`set-default <domain>`** → rewrite the `PROTOPEEK_DEFAULT_DOMAIN=` line in
`$CFG/config` (atomic write — temp file + rename; keep chmod 600). Strip any `@`.
**`clear-default`** → set it to empty the same way.

Confirm what changed and note it affects **future uploads only** — existing prototypes
keep their rules (edit those with `/proto-up --allow` on an update, or
`POST /api/prototypes/<uuid>/access`).

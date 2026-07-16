---
description: List all prototypes owned by your token, with live/expired status and a new-feedback hint.
allowed-tools: Bash
---

List all prototypes owned by your token.

Steps:
1. **Load config** (global store, mint-once) — same as `/proto-up` step 1.
2. Run:
   ```bash
   curl -s "$PROTOPEEK_BASE_URL/api/prototypes" -H "Authorization: Bearer $PROTOPEEK_TOKEN"
   ```
3. Print a compact table: name · version · live/expired · feedback (`total_comments`, with a
   **new** marker when `has_new` is true) · share URL. For any row marked new, suggest
   `/proto-status <url>` (exact new-item count, watermark-safe) or `/proto-feedback <url>`
   (pull + synthesize). `/proto-delete <url>` removes one for good.
4. **Reconcile the log:** add any returned prototypes missing from `$CFG/prototypes.json`
   (the server is the source of truth — this recovers the list on a new machine or after a lost
   log), and drop local records the server no longer has (deleted or purged). Local-only fields
   like `source_path` stay blank for records the server supplied.

You can also see these in a browser: sign in at `$PROTOPEEK_BASE_URL/token` with the same token.

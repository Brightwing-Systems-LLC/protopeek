---
description: List every prototype you've uploaded to ProtoPeek (with status + share links).
allowed-tools: Bash
---

List all prototypes owned by your key.

Steps:
1. **Load config** (global store, mint-once) — same as `/proto-up` step 1.
2. Run:
   ```bash
   curl -s "$PROTOPEEK_BASE_URL/api/prototypes" -H "Authorization: Bearer $PROTOPEEK_TOKEN"
   ```
3. Print a compact table: name · version · live/expired · new-feedback hint · share URL.
   For each, remind the user they can `/proto-status <url>` or `/proto-feedback <url>`.
4. **Reconcile the log:** add any returned prototypes missing from `$CFG/prototypes.json`
   (the server is the source of truth — this recovers the list on a new machine or after a lost
   log). Local-only fields like `source_path` stay blank for records the server supplied.

You can also see these in a browser: sign in at `$PROTOPEEK_BASE_URL/key` with the same key.

---
description: Cheap "is there new feedback?" poll for a ProtoPeek prototype (does not consume the new-since watermark).
argument-hint: <url-or-uuid-or-natural-reference>
allowed-tools: Bash
---

Check activity on a ProtoPeek prototype WITHOUT advancing its "new since last pull"
watermark — safe to run repeatedly.

Arguments: `$ARGUMENTS` — a share URL, a bare UUID, or a natural reference ("yesterday's dashboard").

Steps:
1. **Load config** (global store, mint-once) — same as `/proto-up` step 1.
2. **Resolve the reference → UUID** (see `AGENTS.md` → "Resolving a reference"): a URL/UUID is used
   directly; otherwise match `$CFG/prototypes.json` by name / filename / path / project / recency.
   If more than one candidate, list them and ask — resolution here is safe (this endpoint is
   read-only).
3. Run:
   ```bash
   curl -s "$PROTOPEEK_BASE_URL/api/prototypes/<uuid>/status" -H "Authorization: Bearer $PROTOPEEK_TOKEN"
   ```
4. Report concisely: prototype name + version, whether it's live/expired, and the
   status counts — `distinct_reviewers`, `total_comments`, **`new_since_last_pull`**
   (the load-bearing "worth re-pulling?" signal), and `last_activity`.
   If `new_since_last_pull > 0`, suggest running `/proto-feedback <url>`.

This endpoint is read-only and does not change the watermark; only `/proto-feedback` does.

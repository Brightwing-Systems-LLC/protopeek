---
description: Pull ProtoPeek feedback, synthesize it into themes, attributions, conflicts, and a proposed change list, then resolve or delete items by id.
argument-hint: <url-or-uuid-or-natural-reference>
allowed-tools: Bash, Read
---

Pull the agent-shaped feedback for a ProtoPeek prototype and **synthesize** it —
do NOT just dump the raw comments — then give the user a compact index they can
act on by id.

Arguments: `$ARGUMENTS` — a share URL, a bare UUID, or a natural reference.

Steps:
1. **Load config** (global store, mint-once) — same as `/proto-up` step 1. Also set
   `SHOTS="${XDG_CACHE_HOME:-$HOME/.cache}/protopeek/shots"`; screenshots are
   re-downloadable cache and stay out of `$CFG` so config backups stay small.
2. **Resolve the reference → UUID** (see `AGENTS.md` → "Resolving a reference"). A URL/UUID is used
   directly. For a natural reference, match `$CFG/prototypes.json`. **This call ADVANCES the
   watermark, so when there is more than one candidate, disambiguate with `/proto-status` first and
   confirm before pulling** — never let a guess consume the "new since last pull" signal.
3. Fetch the payload, passing your local watermark so "new" is deterministic per-client:
   ```bash
   # SINCE = last_fetched_at for this uuid from prototypes.json, if present
   curl -s "$PROTOPEEK_BASE_URL/api/prototypes/<uuid>/feedback${SINCE:+?since=$SINCE}" \
     -H "Authorization: Bearer $PROTOPEEK_TOKEN"
   ```
   The payload has `prototype`, `status`, and `annotations[]`. Each annotation has:
   - `id` — **the stable handle. Always show it; never renumber items positionally.**
   - `note`, `type`, `author`, `version`, `resolved`, `created_at`, `thread[]`
   - `viewport` (e.g. `"390x844"`) and `url` — what the reviewer was looking at
   - `css_selector`, `element_snapshot` — primary handle on the pinned element
   - `anchor` — `xpath`, `element_tag`, `element_id`, `text_prefix`, `text_suffix`,
     `neighbor_text`, plus `rect` (`xPct`/`yPct`/`wPct`/`hPct`) and `scroll` (`x`/`y`)
   - `screenshot` — `null`, or `{url, view_url, width, height}`

   Use `viewport` before calling anything a bug — "cramped" at 390x844 and at 1440x900
   are different problems. Use `rect`/`scroll` to place a pin the shot can't show (it's
   viewport-only, so anything past the reviewer's fold isn't in it). Fall back to
   `anchor`'s xpath / tag / neighbor text when `css_selector` no longer resolves: pins
   stay attached to the version they were left on, so a pull can carry v1 pins against
   v3 markup.
4. **Fetch screenshots, look at them, keep the paths.** For each annotation whose
   `screenshot` is non-null, download it to a stable path and `Read` it, so you see what
   the reviewer saw — the pin is box-highlighted in orange on the shot:
   ```bash
   mkdir -p "$SHOTS/<uuid>"
   curl -s "<shot_url>" -H "Authorization: Bearer $PROTOPEEK_TOKEN" \
     -o "$SHOTS/<uuid>/<id>.webp"
   ```
   The three URLs are not interchangeable: print **`screenshot.view_url`** (signed,
   time-boxed, opens in any browser, shareable); `screenshot.url` is Bearer-authed and
   401s in a browser, so never hand the user that one; the local `file://` path is the
   fallback when `view_url` is absent (older or self-hosted server). Skip ids whose file
   you already have this session (the payload is cumulative). A null `screenshot` just
   means none was captured — fall back to `css_selector` + `element_snapshot` + `anchor`.
5. **Advance `last_fetched_at`** for this uuid in `$CFG/prototypes.json` (atomic write).
6. Produce a synthesis, not a transcript:
   - **Themes** — group annotations by what they're really about (e.g. "pricing clarity",
     "header/nav", "copy tone"). For each theme, attribute ("2 of 3 reviewers flagged …")
     and cite the ids (`#47, #52`) so the user can jump from a theme to an item.
   - **Conflicts** — where reviewers disagree, noting when a disagreement is really a
     viewport difference.
   - **Anchored change list** — concrete edits mapped to the `css_selector`/element they
     target and the ids that motivated them, ordered by impact. Where a screenshot
     exists, use it as visual evidence to disambiguate vague notes. Must-fix vs
     nice-to-have.
   - **Status line** — reviewers, total comments, how many are new since the last pull.
7. **Print the action index** — every open item, compactly, id first, screenshot as a
   clickable `file://` link:
   ```
   #47  bug     dana@corp.com   v2  1440x900  "pricing card is cramped at this width"
        ⌖ #hero .price  →  https://protopeek.dev/s/MQ.aBcDeF.7x1p…/

   #48  change  marco@corp.com  v2  390x844   "make the CTA louder"
        ⌖ .cta  →  (no screenshot)
   ```
   List resolved items separately and collapsed (`3 resolved: #31, #33, #39`) — the
   payload is cumulative, so without this the list grows forever.
8. **Act on individual items.** The user refers to them by id ("resolve 47", "delete 47").
   Ids are stable across new comments and a compacted context; if an id isn't in the
   payload you pulled, re-fetch rather than guess.
   ```bash
   # resolve (or reopen with false)
   curl -s -X PATCH "$PROTOPEEK_BASE_URL/api/prototypes/<uuid>/annotations/<id>" \
     -H "Authorization: Bearer $PROTOPEEK_TOKEN" \
     -H "Content-Type: application/json" -d '{"resolved": true}'
   # delete — permanent, takes the screenshot and reply thread with it
   curl -s -X DELETE "$PROTOPEEK_BASE_URL/api/prototypes/<uuid>/annotations/<id>" \
     -H "Authorization: Bearer $PROTOPEEK_TOKEN" -o /dev/null -w '%{http_code}'
   ```
   Resolving is **outward-facing** — reviewers keep the marker but see its status pill,
   Open/Resolved counters and "% resolved" bar change, and get a Reopen button. So
   resolve **once the fix is live**: make the edits, publish with
   `/proto-up <path> --update <url>`, then PATCH the ids you fixed, saying which.
   Deleting is irreversible — **always confirm first, echoing the note text back**, and
   offer resolve as the reversible alternative. Never delete more than the user named.

Close by offering to make the changes for the open items, then publish a new version
behind the same link with `/proto-up <path> --update <url>`.

---
name: proto-feedback
description: Pull ProtoPeek reviewer feedback (with screenshots) and synthesize it into themes, attributions, conflicts, and an anchored change list. Then resolve or delete individual items by id. Advances the "new since last pull" watermark. Use when the user wants to see or act on prototype feedback.
---

Pull the agent-shaped feedback for a ProtoPeek prototype, **synthesize** it — do NOT just
dump the raw comments — then give the user a compact index they can act on by id.

Arguments: a share URL, a bare UUID, or a natural reference.

## Step 1 — Config

```bash
CFG="${XDG_CONFIG_HOME:-$HOME/.config}/protopeek"
[ -n "$PROTOPEEK_TOKEN" ] || . "$CFG/config" 2>/dev/null
SHOTS="${XDG_CACHE_HOME:-$HOME/.cache}/protopeek/shots"
```

If there's no token, this machine hasn't been set up — point the user at `/proto-up`.

Screenshots live under `$SHOTS`, not `$CFG`: they're re-downloadable cache, and keeping
megabytes of images out of the config dir keeps `/proto-config` and config backups small.

## Step 2 — Resolve the reference → UUID (carefully)

A URL/UUID is used directly. For a natural reference, match `$CFG/prototypes.json` by
name / filename / path / project / recency. **This call ADVANCES the per-prototype
watermark, so when there is more than one candidate, disambiguate with `/proto-status`
(read-only) first and confirm before pulling** — never let a guess consume the "new since
last pull" signal.

## Step 3 — Fetch the payload

Pass your local watermark so "new" is deterministic per-client:

```bash
# SINCE = last_fetched_at for this uuid from prototypes.json, if present
curl -s "$PROTOPEEK_BASE_URL/api/prototypes/<uuid>/feedback${SINCE:+?since=$SINCE}" \
  -H "Authorization: Bearer $PROTOPEEK_TOKEN"
```

The payload has `prototype`, `status`, and `annotations[]`. Each annotation carries:

- `id` — **the stable handle. Always show it; never renumber items positionally.**
- `note`, `type`, `author`, `version`, `resolved`, `created_at`
- `thread[]` — replies
- `viewport` (e.g. `"390x844"`) and `url` — what the reviewer was actually looking at
- `css_selector`, `element_snapshot` — the primary handle on the pinned element
- `anchor` — `xpath`, `element_tag`, `element_id`, `text_prefix`, `text_suffix`,
  `neighbor_text`, plus `rect` (`xPct`/`yPct`/`wPct`/`hPct`) and `scroll` (`x`/`y`)
- `screenshot` — `null`, or `{url, width, height}`

Use `viewport` before calling anything a bug: "this feels cramped" at 390x844 and at
1440x900 are different problems. Use `rect`/`scroll` to place a pin the screenshot can't
show — the shot is viewport-only, so anything above or below the reviewer's fold isn't in
it. Fall back to `anchor`'s xpath / tag / neighbor text when `css_selector` no longer
resolves: pins stay attached to the version they were left on, so a pull can carry v1
pins against v3 markup.

## Step 4 — Fetch screenshots, look at them, and keep the paths

For each annotation whose `screenshot` is non-null, download it to a stable path (so the
link you print stays good) and `Read` it, so you see what the reviewer saw — the pin is
box-highlighted in orange on the shot:

```bash
mkdir -p "$SHOTS/<uuid>"
curl -s "<shot_url>" -H "Authorization: Bearer $PROTOPEEK_TOKEN" \
  -o "$SHOTS/<uuid>/<id>.webp"
```

Note the resulting absolute path for each id — you'll print it as a `file://` link in
Step 7 so the user can click it or paste it into a browser. (The `screenshot.url` from
the payload is Bearer-authed and will 401 in a browser — never hand the user that one.)

Skip ids whose file you already have this session (the payload is cumulative — every pull
returns all annotations). Screenshots are best-effort: a null `screenshot` just means none
was captured — fall back to `css_selector` + `element_snapshot` + `anchor` for placement.

## Step 5 — Advance the local watermark

Update `last_fetched_at` for this uuid in `$CFG/prototypes.json` (atomic write).

## Step 6 — Synthesize (not a transcript)

- **Themes** — group annotations by what they're really about (e.g. "pricing clarity",
  "header/nav", "copy tone"). For each theme, attribute: "2 of 3 reviewers flagged …".
  Cite the ids in each theme (`#47, #52`) so the user can jump from a theme to an item.
- **Conflicts** — call out where reviewers disagree (e.g. one wants more density,
  another less). Note when a disagreement is really a viewport difference.
- **Anchored change list** — concrete proposed edits, each mapped to the
  `css_selector`/element it targets and the ids that motivated it, ordered by impact.
  Where a screenshot exists, use it as visual evidence to disambiguate vague notes.
  Distinguish must-fix from nice-to-have.
- **Status line** — reviewers, total comments, and how many are new since the last pull.

## Step 7 — Print the action index

After the synthesis, list every open item compactly so the user can act on it. One entry
per annotation, id first, with the screenshot as a clickable `file://` link:

```
#47  bug     dana@corp.com   v2  1440x900  "pricing card is cramped at this width"
     ⌖ #hero .price  →  file:///Users/you/.cache/protopeek/shots/<uuid>/47.webp

#48  change  marco@corp.com  v2  390x844   "make the CTA louder"
     ⌖ .cta  →  (no screenshot)
```

List resolved items separately and collapsed (`3 resolved: #31, #33, #39`) — the payload
is cumulative, so without this the list grows forever.

## Step 8 — Act on individual items

The user will refer to items by id ("resolve 47", "fix 48 and 52", "delete 47"). Ids are
stable, so this works across new comments arriving and across a compacted context. If an
id isn't in the payload you pulled, re-fetch rather than guessing.

**Resolve / reopen** — mark it addressed:

```bash
curl -s -X PATCH "$PROTOPEEK_BASE_URL/api/prototypes/<uuid>/annotations/<id>" \
  -H "Authorization: Bearer $PROTOPEEK_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"resolved": true}'          # false reopens it
```

This is **outward-facing**: reviewers see it. Their overlay keeps the marker but flips its
status pill, updates the Open/Resolved counters and the "% resolved" bar, and offers them
a Reopen button. So prefer to resolve **once the fix is actually live** — resolved reads
as "addressed", not "acknowledged". When the user asks you to fix and resolve in one go,
make the edits, publish with `/proto-up <path> --update <url>`, and only then PATCH the
ids you fixed. Say which ids you're resolving.

**Delete** — permanently removes the pin, its screenshot, and its whole reply thread:

```bash
curl -s -X DELETE "$PROTOPEEK_BASE_URL/api/prototypes/<uuid>/annotations/<id>" \
  -H "Authorization: Bearer $PROTOPEEK_TOKEN" -o /dev/null -w '%{http_code}'
```

Irreversible. **Always confirm first, echoing the note text back** ("Delete #47 — 'pricing
card is cramped' by dana@corp.com?"), and offer resolve as the reversible alternative.
Never delete more than the user named, and never delete as a way of "tidying up".

Close by offering to make the code changes for the open items, then publish a new version
behind the same link with `/proto-up <path> --update <url>`.

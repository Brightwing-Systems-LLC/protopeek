---
description: Pull ProtoPeek feedback and synthesize it into themes, attributions, conflicts, and a proposed change list.
argument-hint: <url-or-uuid-or-natural-reference>
allowed-tools: Bash, Read
---

Pull the agent-shaped feedback for a ProtoPeek prototype and **synthesize** it —
do NOT just dump the raw comments.

Arguments: `$ARGUMENTS` — a share URL, a bare UUID, or a natural reference.

Steps:
1. **Load config** (global store, mint-once) — same as `/proto-up` step 1.
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
   The payload has `prototype`, `status`, and `annotations[]` (each with `id`,
   `css_selector`, `element_snapshot`, `note`, `type`, `author`, `version`,
   `resolved`, a `thread[]` of replies, and `screenshot` — either `null` or
   `{url, width, height}`).
4. **Fetch screenshots and look at them.** For each annotation whose `screenshot`
   is non-null, download the image (same Bearer token) and `Read` it, so you see
   what the reviewer saw — the pin is highlighted with a box on the shot:
   ```bash
   # for an annotation with screenshot.url = <shot_url> and id = <id>:
   curl -s "<shot_url>" -H "Authorization: Bearer $PROTOPEEK_TOKEN" \
     -o "${TMPDIR:-/tmp}/pp-shot-<id>.webp"
   ```
   Then `Read` each downloaded `pp-shot-<id>.webp` (use your scratchpad dir if you
   have one). Skip ids you've already pulled this session
   (the payload is cumulative — every pull returns all annotations). Screenshots
   are best-effort: a null `screenshot` just means none was captured — fall back
   to `css_selector` + `element_snapshot` for placement.
5. **Advance `last_fetched_at`** for this uuid in `$CFG/prototypes.json` (atomic write).

Then produce a synthesis, not a transcript:
- **Themes** — group annotations by what they're really about (e.g. "pricing clarity",
  "header/nav", "copy tone"). For each theme, attribute: "2 of 3 reviewers flagged …".
- **Conflicts** — call out where reviewers disagree (e.g. one wants more density,
  another less).
- **Anchored change list** — concrete proposed edits, each mapped to the
  `css_selector`/element it targets and the reviewers who motivated it, ordered by
  impact. Where a screenshot exists, use it as visual evidence (what the reviewer
  actually saw, box-highlighted) to disambiguate vague notes. Distinguish must-fix
  from nice-to-have.
- **Status line** — reviewers, total comments, and how many are new since the last pull.

Close by offering to make the changes: regenerate the prototype, then
`/proto-up <path> --update <url>` to publish a new version behind the same link.

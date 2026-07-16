# Contributing

Thanks for your interest! ProtoPeek is a small, opinionated project maintained by
[Brightwing Systems](https://brightwingsystems.com). Issues and PRs are welcome, with
expectations set honestly:

- **Bug reports** are always welcome — please include reproduction steps.
- **Feature requests** are welcome as issues; the roadmap is deliberately small, so
  "no" or "not yet" is a common, friendly answer.
- **Pull requests**: for anything beyond a small fix, please open an issue first so we
  can agree on the approach before you invest time. PRs may be reviewed slowly.
- Security problems go to **security@brightwingsystems.com**, not the issue tracker
  (see [SECURITY.md](SECURITY.md)).

## Local development

```bash
cp .env.example .env
just compose-dev          # Postgres 16 + Redis 7 (docker)
just migrate
just css-build            # compile Tailwind → static/css/site.css
just seed-dev-superuser   # dev owner + token (prints the token)
just dev                  # http://127.0.0.1:8904
```

`just test` runs pytest (SQLite/locmem — no containers needed). Lint with `ruff check`
and `ruff format`. Please keep PRs green: tests pass, ruff clean.

## Ground rules

- Match the existing code style and comment density (comments explain *why*, sparingly).
- No new runtime dependencies without discussion — the project is deliberately lean
  (no S3, no Node build, HTML stored in Postgres).
- The vendored overlay (`static/js/siteping.global.js`) is patched deliberately; see
  `static/js/SITEPING_VERSION.txt` before touching it.
- The four agent skills live in `skills/` (that's what `npx skills add` and the Claude
  Code plugin install); `.claude/commands/` holds the same workflows in slash-command
  form and is what `/agent.md` serves for manual setup. If you change one, change both.

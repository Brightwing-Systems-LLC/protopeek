# Third-party notices

ProtoPeek vendors the following third-party software. Each remains under its own license.

## SitePing (`static/js/siteping.global.js`)

The on-page annotation overlay. Vendored from
[NeosiaNexus/SitePing](https://github.com/NeosiaNexus/SitePing)
(`@siteping/widget`, IIFE global build) — MIT License, © SitePing contributors.
Version and local modifications are documented in `static/js/SITEPING_VERSION.txt`.

## modern-screenshot (`static/js/modern-screenshot.min.js`)

Client-side screenshot capture for annotations. Vendored from
[qq15725/modern-screenshot](https://github.com/qq15725/modern-screenshot) — MIT License,
© qq15725 and contributors.

Replaced html2canvas, which reimplements CSS painting in JavaScript and therefore drops
unsupported properties silently — `conic-gradient` backgrounds captured as blank space.
modern-screenshot renders through an SVG `<foreignObject>`, so the browser does the
painting and fidelity follows the reviewer's own engine.

## Fonts (`static/fonts/`)

- **Space Grotesk** — SIL Open Font License 1.1, © Florian Karsten.
- **JetBrains Mono** — SIL Open Font License 1.1, © JetBrains.

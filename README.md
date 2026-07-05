# smART Hub Living Labs — Website

Static multi-page showcase website for the smART Hub Living Labs (UEH Campus V), presenting four project packages plus an About page. Pages are a mix of hand-built fluid HTML and wrapped Figma exports.

## Quick start

```bash
# 1. Install dependencies (one time)
npm install

# 2. Start the local dev server
npm run dev
# → opens at http://localhost:3000
```

`npm start` does the same thing as `npm run dev`.

> **Note:** the server uses "clean URLs" — `/pages/about.html` redirects to `/pages/about`. Both work.

## Available commands

| Command | What it does |
|---|---|
| `npm run dev` / `npm start` | Serve the site locally at [http://localhost:3000](http://localhost:3000) |
| `npm run images:check` | **Dry-run** of the image optimizer — reports per-file and total savings, writes nothing |
| `npm run images:convert` | Convert/downscale all PNG/JPG under `assets/images/` to WebP (originals kept) |
| `npm run images:rewrite` | Repoint `.png`/`.jpg` references in HTML/CSS/JS to `.webp` (only where the `.webp` exists) |

See [PERFORMANCE.md](PERFORMANCE.md) for the full optimization checklist and DevTools profiling guide. The image scripts live in [scripts/](scripts/) and accept flags (`--max`, `--quality`, `--dir`, `--dry-run`, …) documented in their headers.

## Project structure

```
├── index.html                  # Homepage (scaled 1874px Figma canvas + real header/footer)
├── pages/
│   ├── about.html              # About page (scaled canvas + real header)
│   ├── package-1/index.html    # No Single-Use Plastic (fluid HTML)
│   ├── package-2/              # Glocal Design (fluid HTML)
│   │   ├── index.html
│   │   ├── architectural-design.html      # + 5 more sub-pages
│   │   └── ...
│   ├── package-3/index.html    # Towards Net Zero (wrapped Figma export, ~8 MB)
│   └── package-4/index.html    # Art for All (wrapped Figma export, ~13 MB)
├── assets/
│   ├── css/
│   │   ├── responsive.css      # Shared mobile/tablet rules (header/footer chrome, all pages)
│   │   └── animations.css, ...
│   ├── images/                 # All raster assets (run the image pipeline on these!)
│   └── js/
├── scripts/
│   ├── optimize-images.mjs     # Batch WebP converter + downscaler (Node + sharp)
│   └── rewrite-image-refs.mjs  # Safe .png/.jpg → .webp reference rewriter
├── PERFORMANCE.md              # Perf checklist + Chrome DevTools profiling guide
└── package.json
```

## How the pages work (two architectures)

1. **Canvas pages** — `index.html`, `about.html`, `package-3`, `package-4`.
   Raw Figma exports on a fixed **1874px-wide canvas**; a small script scales the whole canvas with `transform: scale(viewportWidth / 1874)` so the design stays pixel-faithful at every width. Content inside the canvas scales proportionally on mobile (pinch-zoom works for detail).

2. **Fluid pages** — `package-1` and all `package-2` pages.
   Regular semantic HTML with grids/flexbox; these reflow to a single column on phones via `@media` rules.

## Mobile responsiveness

All pages adapt to phones/tablets (breakpoints: **900px**, **768px**, **400px**):

- **Shared chrome** ([assets/css/responsive.css](assets/css/responsive.css), loaded by every page): the 2-row header shrinks (smaller logos, wrap-friendly nav with ≥40px tap targets) and the footer stacks into one column.
- **Homepage**: the header switches from overlay to in-flow on phones so it never covers the scaled canvas.
- **Package 1**: hero title scales with `clamp()`; footer no longer reserves 480px for the wooden-stand mockup — the mockup drops into normal flow below it.
- **Package 2 hub**: the 3-column content/design/about grids collapse to one column.
- **Architectural Design**: the three full-height "door" columns stack vertically, each ≥33vh and tappable.
- Package 2 sub-pages already contained their own mobile grid collapses; they now also get the shared chrome rules.

## Performance / image pipeline

The repo currently carries ~551 MB of full-resolution Figma-exported images (single files up to 49 MB). Before deploying, run:

```bash
npm run images:check     # see the savings first (~90% site-wide)
npm run images:convert   # write .webp next to originals
npm run images:rewrite   # update references
```

Then verify in the browser and delete the original `.png`/`.jpg` files from the repo (Figma remains the source of truth). Full guide: [PERFORMANCE.md](PERFORMANCE.md).

## Requirements

- **Node.js ≥ 18** (tested on v24)
- No build step — it's a static site; any static file server works (`npx serve`, VS Code Live Server, GitHub Pages, …)

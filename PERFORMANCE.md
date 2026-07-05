# Performance Optimization — smART Hub Website

## The core problem (measured)

- **~551 MB** of raster images across 260 files.
- Individual Figma exports up to **49 MB**, at native resolutions like **8859×5907px** — displayed on screen at a fraction of that size.
- A dry-run on `assets/images/package1` alone: **60.85 MB → 4.85 MB (–92%)**.

Image weight is the single dominant cause of slow loads here. Everything else below is secondary until this is fixed.

---

## Part 1 — Image pipeline (do this first)

```bash
npm install sharp        # one time

# 1. See the savings without touching anything
node scripts/optimize-images.mjs --dry-run

# 2. Convert everything (keeps originals as .png/.jpg alongside new .webp)
node scripts/optimize-images.mjs

# 3. Repoint HTML/CSS/JS references from .png/.jpg to .webp
node scripts/rewrite-image-refs.mjs --dry-run   # preview
node scripts/rewrite-image-refs.mjs             # apply

# 4. Once the site looks correct in the browser, delete originals from git
#    (keep them in Figma — that's your real source of truth)
```

Tuning knobs: `--max=2560` (max dimension in px), `--quality=80` (75–82 is the photo sweet spot).
Lower `--max` to 1920 if the site is never viewed above 1080p.

---

## Part 2 — Technical checklist

### Images (highest impact)
- [ ] Downscale + convert to WebP (script above). Target < 400 KB per hero image, < 100 KB for the rest.
- [ ] Add `width` and `height` attributes to every `<img>` — prevents layout shift (CLS).
- [ ] Add `loading="lazy"` to every image below the fold. **Do NOT** lazy-load the first/hero image.
- [ ] Add `decoding="async"` to non-critical images.
- [ ] Add `fetchpriority="high"` to the single most important above-the-fold image; `fetchpriority="low"` to decorative ones.
- [ ] Serve responsive sizes with `srcset`/`sizes` if the same image renders large on desktop and small on mobile.
- [ ] Consider AVIF as an additional `<source>` for another ~20% over WebP (slower to encode).

### Fonts
- [ ] Self-host fonts (no render-blocking third-party request); subset to the characters you use.
- [ ] `font-display: swap;` so text renders immediately.
- [ ] `<link rel="preload" as="font" crossorigin>` the one or two fonts used above the fold.

### CSS / JS
- [ ] Defer non-critical JS: `<script defer>` or `<script type="module">`.
- [ ] Inline critical above-the-fold CSS; load the rest async.
- [ ] Remove unused CSS/JS (DevTools → Coverage tab shows exactly what's unused).
- [ ] Minify HTML/CSS/JS for production.

### Delivery / network
- [ ] Enable Brotli (or gzip) compression on the server for text assets.
- [ ] Set long `Cache-Control: max-age=31536000, immutable` on hashed/static assets.
- [ ] Serve over HTTP/2 or HTTP/3 so many small assets multiplex on one connection.
- [ ] `<link rel="preconnect">` to any third-party origin you can't remove.
- [ ] Put static assets behind a CDN if hosting allows.

### Verify
- [ ] Lighthouse score (DevTools → Lighthouse) before and after — aim > 90 Performance.
- [ ] Core Web Vitals: **LCP < 2.5s**, **CLS < 0.1**, **INP < 200ms**.

---

## Part 3 — Chrome DevTools profiling guide

### A. Network tab — find page weight
1. Open DevTools (`F12`) → **Network**. Check **Disable cache**. Reload (`Ctrl+R`).
2. Read the **status bar at the bottom**: total *requests*, *transferred* (over the wire), *resources* (uncompressed), and *Finish / DOMContentLoaded / Load* times. Transferred is your real page weight.
3. Click the **Size** column header to sort descending — the heaviest assets float to the top. On this site they'll almost all be `.png`.
4. Filter by type with the toolbar buttons: **Img**, **CSS**, **JS**, **Font**. Click **Img** to isolate image weight.
5. Hover any request's **Waterfall** bar to see the timing breakdown: *Queueing → Stalled → Waiting (TTFB) → Content Download*. Long green "Content Download" = the file is simply too big (your case). Long "Waiting/TTFB" = slow server.
6. Right-click the column header → enable **Priority** to see what the browser fetched as High vs Low — confirm your hero image isn't stuck at Low.
7. Throttle to **Fast 3G** (dropdown top of panel) to feel what a real mobile user experiences.

**What "good" looks like:** total transferred under ~2–3 MB for a media-rich page; no single image over ~500 KB.

### B. Performance tab — find slow rendering
1. DevTools → **Performance**. Click the **⚙ gear** → set **CPU: 4× slowdown** and **Network: Fast 3G** to simulate a mid-range phone.
2. Click **Reload (⟳)** in the panel — it records the full page load and stops automatically.
3. Read top to bottom:
   - **Timings track / Web Vitals:** find the **LCP** marker. Click it → the "Related Node" in the summary tells you exactly which element is your Largest Contentful Paint (usually the hero image). If LCP is late, that image is your bottleneck.
   - **Network track:** long bars for images confirm download-bound loading.
   - **Main track (flame chart):** tall stacks = long JS tasks. Red triangles = "Long Tasks" (>50ms) that block interaction (hurt INP).
   - **Layout Shift track:** red bars mark CLS events — usually images without width/height reserving space.
4. Use the **Summary donut** (bottom) to see time split across Scripting / Rendering / Painting / Loading. Image-heavy sites are dominated by Loading + Painting.

### C. Coverage tab — find dead code
1. `Ctrl+Shift+P` → type **Coverage** → **Show Coverage**.
2. Click the reload/record button, interact with the page, stop.
3. Red bars in the results = bytes downloaded but never executed/used. Prime candidates to remove or defer.

### D. Lighthouse — the scorecard
1. DevTools → **Lighthouse** → select **Performance** → **Analyze page load**.
2. Read the **Opportunities** ("Properly size images", "Serve images in next-gen formats", "Efficiently encode images" — all point straight at the fix above) and **Diagnostics** sections. Each lists estimated savings in KB and ms.

---

## Suggested order of attack
1. Run the image pipeline (Part 1) — recovers ~90% of page weight.
2. Add `loading="lazy"` + `width`/`height` to `<img>` tags.
3. `defer` scripts, self-host + `font-display: swap` fonts.
4. Enable Brotli + caching on the host.
5. Re-run Lighthouse; chase whatever's still red.

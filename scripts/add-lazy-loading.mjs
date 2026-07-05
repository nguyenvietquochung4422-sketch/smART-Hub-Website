#!/usr/bin/env node
/**
 * add-lazy-loading.mjs — add loading="lazy" decoding="async" to below-the-fold
 * <img> tags, one page at a time, with an explicit hero/header allowlist per file
 * so the real LCP candidate on each page is never deferred.
 *
 * Hero images were identified by hand per page (see PERFORMANCE.md / commit
 * message), not guessed by a generic heuristic:
 *   - index.html            : no <img> hero — hero is the CSS `--page-bg`, unaffected either way
 *   - about.html             : NNBackgroundBA1 (top:0 cover background)
 *   - package-3/index.html   : Pixxal1 + Comp11 (top:0 full-width background layers)
 *   - package-4/index.html   : ArtForAllBackground1 (top:0 full-width background)
 *   - package-1/index.html   : .hero-image (campus illustration)
 *   - package-2/index.html   : .hero-bg-overlay
 *   - package-2/research.html: research_01.webp (botanical illustration)
 *   - all other package-2 subpages: hero is a CSS gradient, no <img> to exclude
 *
 * Header logos (Logo_SHLL_long.webp / logo/logo1.webp) are always skipped —
 * they're tiny and always above the fold on every page.
 *
 * Usage: node scripts/add-lazy-loading.mjs [--dry-run]
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';

const DRY = process.argv.includes('--dry-run');
const ROOT = process.cwd();

const HEADER_LOGO_MATCHERS = ['Logo_SHLL_long.webp', 'logo/logo1.webp'];

const PAGES = [
  { file: 'index.html', heroMatchers: [] },
  { file: 'pages/about.html', heroMatchers: ['NNBackgroundBA1'] },
  { file: 'pages/package-3/index.html', heroMatchers: ['Pixxal1', 'Comp11'] },
  { file: 'pages/package-4/index.html', heroMatchers: ['ArtForAllBackground1'] },
  { file: 'pages/package-1/index.html', heroMatchers: ['hero-image'] },
  { file: 'pages/package-2/index.html', heroMatchers: ['hero-bg-overlay'] },
  { file: 'pages/package-2/architectural-design.html', heroMatchers: [] },
  { file: 'pages/package-2/architectural-layout.html', heroMatchers: [] },
  { file: 'pages/package-2/landscape-design.html', heroMatchers: [] },
  { file: 'pages/package-2/passive-interventions.html', heroMatchers: [] },
  { file: 'pages/package-2/research.html', heroMatchers: ['research_01.webp'] },
  { file: 'pages/package-2/spatial-assessment.html', heroMatchers: [] },
];

const IMG_TAG_RE = /<img\b[^>]*>/g;

let totalTagged = 0, totalSkippedHero = 0, totalSkippedHeader = 0, totalSkippedEmpty = 0, totalAlready = 0;

for (const { file: rel, heroMatchers } of PAGES) {
  const file = path.join(ROOT, rel);
  const src = await fs.readFile(file, 'utf8');

  let tagged = 0, skippedHero = 0, skippedHeader = 0, skippedEmpty = 0, already = 0;

  // The header is always the first thing in <body>, so only the FIRST occurrence
  // of each logo file is the real header instance. The same file (e.g. logo1.webp)
  // can be legitimately reused deeper in the canvas (e.g. a member-list "UEH Logo"
  // at top:658px) — those reuses are real below-fold content and should be lazy.
  const headerSeen = new Set();

  const out = src.replace(IMG_TAG_RE, (tag) => {
    if (/\bloading\s*=/.test(tag)) { already++; return tag; }
    if (/\bsrc=["']["']/.test(tag)) { skippedEmpty++; return tag; } // dynamic placeholder (e.g. lightbox)

    const headerMatch = HEADER_LOGO_MATCHERS.find((m) => tag.includes(m));
    if (headerMatch && !headerSeen.has(headerMatch)) {
      headerSeen.add(headerMatch);
      skippedHeader++;
      return tag;
    }
    if (heroMatchers.some((m) => tag.includes(m))) { skippedHero++; return tag; }

    tagged++;
    return tag.replace(/^<img\b/, '<img loading="lazy" decoding="async"');
  });

  totalTagged += tagged;
  totalSkippedHero += skippedHero;
  totalSkippedHeader += skippedHeader;
  totalSkippedEmpty += skippedEmpty;
  totalAlready += already;

  console.log(
    `  ${rel.padEnd(45)} tagged:${String(tagged).padStart(3)}  hero-skip:${skippedHero}  header-skip:${skippedHeader}  empty-skip:${skippedEmpty}  already:${already}`
  );

  if (!DRY && tagged > 0) await fs.writeFile(file, out, 'utf8');
}

console.log(
  `\n  ${DRY ? '[dry-run] would tag' : 'Tagged'} ${totalTagged} images total. ` +
  `(hero-protected: ${totalSkippedHero}, header logos: ${totalSkippedHeader}, empty src: ${totalSkippedEmpty}, already had loading=: ${totalAlready})\n`
);

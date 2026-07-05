#!/usr/bin/env node
/**
 * rewrite-image-refs.mjs — repoint .png/.jpg references to .webp in HTML/CSS/JS.
 *
 * Run this AFTER optimize-images.mjs. It only rewrites a reference when the matching
 * .webp actually exists on disk, so a missing conversion can never produce a broken link.
 *
 * Usage:
 *   node scripts/rewrite-image-refs.mjs --dry-run   # show every change, write nothing
 *   node scripts/rewrite-image-refs.mjs             # apply
 *
 * NOTE: This does a straight extension swap (foo.png -> foo.webp). If you'd rather keep
 * PNG/JPG as a fallback for old browsers, DON'T run this — use <picture> instead:
 *   <picture><source srcset="foo.webp" type="image/webp"><img src="foo.png"></picture>
 * WebP is supported by ~97% of browsers, so a straight swap is usually fine.
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';

const DRY = process.argv.includes('--dry-run');
const CODE_EXT = new Set(['.html', '.htm', '.css', '.js', '.mjs']);
// Path segment is capped at 300 chars: real file paths are always far shorter,
// and an unbounded lazy quantifier is O(n^2) on long delimiter-free runs (e.g.
// a stray base64 blob), which can hang the scan for minutes on a multi-MB file.
const REF_RE = /([^\s"'()]{1,300}?)\.(png|jpe?g)/gi;

async function walk(dir, exts) {
  const out = [];
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name === '.git') continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full, exts)));
    else if (exts.has(path.extname(e.name).toLowerCase())) out.push(full);
  }
  return out;
}

// Build a set of every .webp that exists, by absolute path, so lookups are O(1).
const webpFiles = await walk(process.cwd(), new Set(['.webp']));
const existsCache = new Set(webpFiles.map((f) => path.resolve(f)));

let filesChanged = 0;
let refsChanged = 0;

for (const file of await walk(process.cwd(), CODE_EXT)) {
  const src = await fs.readFile(file, 'utf8');
  const dir = path.dirname(file);
  let localChanges = 0;

  const out = src.replace(REF_RE, (match, base, _ext) => {
    // Resolve the referenced image relative to the current file, ignoring URL query/hash.
    const cleanBase = base.replace(/[?#].*$/, '');
    const webpPathAbs = path.resolve(dir, cleanBase + '.webp');
    if (existsCache.has(webpPathAbs)) {
      localChanges++;
      refsChanged++;
      return `${base}.webp`;
    }
    return match; // no matching .webp on disk — leave the reference untouched
  });

  if (localChanges > 0) {
    filesChanged++;
    console.log(`  ${DRY ? '[dry] ' : ''}${path.relative(process.cwd(), file)} — ${localChanges} ref(s)`);
    if (!DRY) await fs.writeFile(file, out, 'utf8');
  }
}

console.log(`\n  ${DRY ? 'Would change' : 'Changed'} ${refsChanged} reference(s) across ${filesChanged} file(s).\n`);

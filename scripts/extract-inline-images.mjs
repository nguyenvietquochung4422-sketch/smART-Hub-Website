#!/usr/bin/env node
/**
 * extract-inline-images.mjs — pull base64 data-URI images out of huge Figma-export
 * HTML files, convert them to compressed external WebP files, and rewrite the
 * data URI to a relative path.
 *
 * Why: pages/about.html (39 MB), package-3/index.html (7.8 MB) and
 * package-4/index.html (13 MB) embed dozens of PNG/JPG images directly as
 * base64 (src="data:image/png;base64,...." and xlink:href="..." on <svg><image>).
 * Base64 inflates binary size ~33%, the browser must parse tens of MB of text
 * before it can even start painting, and the images can't be cached separately
 * or served compressed. Extracting + converting to WebP fixes all three.
 *
 * Identical images (the SHLL effect band reuses many tiles) are deduped by
 * content hash, so repeated blobs become a single cached file.
 *
 * Usage:
 *   node scripts/extract-inline-images.mjs --dry-run   # report only
 *   node scripts/extract-inline-images.mjs             # rewrite the HTML files
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.error('\n  sharp is not installed. Run: npm install\n');
  process.exit(1);
}

const DRY = process.argv.includes('--dry-run');
const ROOT = process.cwd();
const TARGETS = [
  'index.html',
  'pages/about.html',
  'pages/package-3/index.html',
  'pages/package-4/index.html',
].map((p) => path.join(ROOT, p));

const DATA_URI_RE = /data:image\/(png|jpe?g);base64,([A-Za-z0-9+/=]+)/g;
const fmt = (b) => (b / 1048576).toFixed(2) + ' MB';

for (const file of TARGETS) {
  const rel = path.relative(ROOT, file);
  let src;
  try {
    src = await fs.readFile(file, 'utf8');
  } catch {
    console.log(`  skip (not found): ${rel}`);
    continue;
  }

  const beforeSize = Buffer.byteLength(src, 'utf8');
  const outDir = path.join(
    ROOT,
    'assets/images/inline',
    path.basename(path.dirname(file) === ROOT ? 'root' : path.dirname(file))
  );
  if (!DRY) await fs.mkdir(outDir, { recursive: true });

  const cache = new Map(); // hash -> relative webp path (avoids re-encoding dupes)
  let matchCount = 0;
  let dupCount = 0;

  // Collect all matches first (can't await inside String.replace callback).
  const matches = [...src.matchAll(DATA_URI_RE)];
  for (const m of matches) {
    const [full, , b64] = m;
    matchCount++;
    const buf = Buffer.from(b64, 'base64');
    const hash = crypto.createHash('md5').update(buf).digest('hex').slice(0, 12);

    if (cache.has(hash)) {
      dupCount++;
      continue;
    }

    const outFile = path.join(outDir, `${hash}.webp`);
    if (!DRY) {
      await sharp(buf, { failOn: 'none' })
        .resize({ width: 2000, height: 2000, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 82, effort: 6 })
        .toFile(outFile);
    }
    const relPath = path.relative(path.dirname(file), outFile).split(path.sep).join('/');
    cache.set(hash, relPath);
  }

  // Now do the actual string replacement using the cache.
  let out = src;
  if (!DRY) {
    out = src.replace(DATA_URI_RE, (full) => {
      const buf = Buffer.from(full.match(/base64,([A-Za-z0-9+/=]+)/)[1], 'base64');
      const hash = crypto.createHash('md5').update(buf).digest('hex').slice(0, 12);
      return cache.get(hash) ?? full;
    });
  }

  const afterSize = Buffer.byteLength(out, 'utf8');

  console.log(`\n  ${rel}`);
  console.log(`    inline images: ${matchCount} (${dupCount} duplicates deduped, ${cache.size} unique)`);
  console.log(`    HTML size: ${fmt(beforeSize)} -> ${DRY ? '(dry-run, not computed)' : fmt(afterSize)}`);

  if (!DRY) {
    await fs.writeFile(file, out, 'utf8');
  }
}

console.log(DRY ? '\n  DRY-RUN: no files written. Re-run without --dry-run to apply.\n' : '\n  Done.\n');

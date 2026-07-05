#!/usr/bin/env node
/**
 * optimize-images.mjs — batch convert & downscale images to web-optimized WebP.
 *
 * Why this exists: this repo ships ~551 MB of Figma-exported PNG/JPG, some single
 * files near 50 MB because they're exported at full native resolution. The biggest
 * win is DOWNSCALING to a sane max dimension first, THEN encoding to WebP. WebP alone
 * on an 8000px image is still multi-MB.
 *
 * Setup (one time):
 *   npm init -y
 *   npm install sharp
 *
 * Usage:
 *   node scripts/optimize-images.mjs --dry-run          # report only, writes nothing
 *   node scripts/optimize-images.mjs                     # convert (keeps originals)
 *   node scripts/optimize-images.mjs --max=2560 --quality=78
 *   node scripts/optimize-images.mjs --dir=assets/images/package2
 *
 * Flags:
 *   --dir=<path>      Root to scan (default: assets/images)
 *   --max=<px>        Max width/height; larger images are downscaled (default: 2560)
 *   --quality=<1-100> WebP quality (default: 80). 75-82 is the sweet spot for photos.
 *   --dry-run         Analyze and print the savings table without writing files.
 *   --delete-original Remove the source file after a successful conversion. Off by default.
 *   --concurrency=<n> Parallel workers (default: 4).
 *   --min-kb=<n>      Skip files smaller than this; not worth it (default: 20).
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import os from 'node:os';

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.error('\n  sharp is not installed. Run:\n\n    npm init -y && npm install sharp\n');
  process.exit(1);
}

// ---- args ----
const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=');
    return [k, v ?? true];
  })
);
const ROOT = path.resolve(args.dir || 'assets/images');
const MAX = Number(args.max ?? 2560);
const QUALITY = Number(args.quality ?? 80);
const DRY = Boolean(args['dry-run']);
const DELETE_ORIGINAL = Boolean(args['delete-original']);
const CONCURRENCY = Number(args.concurrency ?? Math.min(4, os.cpus().length));
const MIN_BYTES = Number(args['min-kb'] ?? 20) * 1024;
const EXfrom = new Set(['.png', '.jpg', '.jpeg']);

// ---- helpers ----
const fmt = (b) => (b / 1048576).toFixed(2) + ' MB';
const pad = (s, n) => String(s).padEnd(n);

async function walk(dir) {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (EXfrom.has(path.extname(entry.name).toLowerCase())) out.push(full);
  }
  return out;
}

async function processOne(file) {
  const stat = await fs.stat(file);
  if (stat.size < MIN_BYTES) return { file, skipped: 'too small', before: stat.size, after: stat.size };

  const outFile = file.replace(/\.(png|jpe?g)$/i, '.webp');

  // Skip if an up-to-date .webp already exists.
  try {
    const outStat = await fs.stat(outFile);
    if (outStat.mtimeMs >= stat.mtimeMs) {
      return { file, skipped: 'up to date', before: stat.size, after: outStat.size };
    }
  } catch { /* no existing webp — proceed */ }

  const img = sharp(file, { failOn: 'none' });
  const meta = await img.metadata();
  const needsResize = Math.max(meta.width || 0, meta.height || 0) > MAX;

  const pipeline = img
    .rotate() // respect EXIF orientation before stripping metadata
    .resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 6 });

  if (DRY) {
    const buf = await pipeline.toBuffer();
    return { file, before: stat.size, after: buf.length, resized: needsResize, dims: `${meta.width}x${meta.height}` };
  }

  await pipeline.toFile(outFile);
  const after = (await fs.stat(outFile)).size;
  if (DELETE_ORIGINAL) await fs.unlink(file);
  return { file, before: stat.size, after, resized: needsResize, dims: `${meta.width}x${meta.height}`, outFile };
}

// simple concurrency pool
async function run(files) {
  const results = [];
  let i = 0;
  const workers = Array.from({ length: CONCURRENCY }, async () => {
    while (i < files.length) {
      const idx = i++;
      const f = files[idx];
      try {
        const r = await processOne(f);
        results.push(r);
        const rel = path.relative(process.cwd(), r.file);
        if (r.skipped) {
          process.stdout.write(`  · skip (${r.skipped})  ${rel}\n`);
        } else {
          const pct = ((1 - r.after / r.before) * 100).toFixed(0);
          const tag = r.resized ? `resized ${r.dims}` : 'recompressed';
          process.stdout.write(`  ✓ ${pad(fmt(r.before), 9)}→ ${pad(fmt(r.after), 9)} (-${pct}%)  ${tag}  ${rel}\n`);
        }
      } catch (e) {
        results.push({ file: f, error: e.message, before: 0, after: 0 });
        process.stdout.write(`  ✗ ERROR  ${path.relative(process.cwd(), f)}: ${e.message}\n`);
      }
    }
  });
  await Promise.all(workers);
  return results;
}

// ---- main ----
console.log(`\n  Scanning ${ROOT}`);
console.log(`  max=${MAX}px  quality=${QUALITY}  concurrency=${CONCURRENCY}  ${DRY ? 'DRY-RUN' : DELETE_ORIGINAL ? 'CONVERT + DELETE ORIGINALS' : 'CONVERT (keep originals)'}\n`);

const files = await walk(ROOT);
console.log(`  Found ${files.length} source images\n`);

const results = await run(files);

const done = results.filter((r) => !r.skipped && !r.error);
const before = done.reduce((s, r) => s + r.before, 0);
const after = done.reduce((s, r) => s + r.after, 0);
const errors = results.filter((r) => r.error);

console.log('\n  ────────────────────────────────────────────');
console.log(`  Converted:   ${done.length} files`);
console.log(`  Skipped:     ${results.filter((r) => r.skipped).length}`);
console.log(`  Errors:      ${errors.length}`);
console.log(`  Total before ${fmt(before)}`);
console.log(`  Total after  ${fmt(after)}`);
if (before > 0) console.log(`  Saved        ${fmt(before - after)}  (-${((1 - after / before) * 100).toFixed(1)}%)`);
console.log('  ────────────────────────────────────────────\n');
if (DRY) console.log('  DRY-RUN: no files written. Re-run without --dry-run to apply.\n');

#!/usr/bin/env node
/**
 * Audit how financial statement row labels render.
 *
 * The tables show cleanLabel(canonicalItems[].label), so replaying that over
 * every bank file reproduces exactly what a reader sees, without a browser.
 *
 * Two modes:
 *   node scripts/audit-labels.mjs                  report, and write a snapshot
 *   node scripts/audit-labels.mjs --compare FILE   diff against a snapshot
 *
 * The compare mode is the regression check: it separates labels that got
 * better from labels that got worse, which a single summary count hides --
 * a rule change can easily fix 200 labels and break 20 while the headline
 * number still improves.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { cleanLabel } from '../src/utils/labels.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BANKS_DIR = join(__dirname, '..', 'public', 'data', 'banks');
const DEFAULT_SNAPSHOT = join(__dirname, '..', 'tests', 'label-snapshot.json');

const args = process.argv.slice(2);
const compareIdx = args.indexOf('--compare');
const comparePath = compareIdx !== -1 ? args[compareIdx + 1] : null;
const writePath = args.includes('--write') ? DEFAULT_SNAPSHOT : null;

const MONTH = '(?:January|February|March|April|May|June|July|August|September|October|November|December)';

/**
 * Does a displayed label still carry period-specific detail? This is the
 * property the cleaner exists to remove, so it is the headline metric.
 */
const DIRTY = new RegExp(
  [
    `${MONTH}\\s+\\d{1,2},?\\s+\\d{4}`,      // "December 31, 2025"
    '\\b(?:19|20)\\d{2}\\s+and\\s+(?:19|20)\\d{2}\\b', // "2025 and 2024"
    '\\d{1,2}/\\d{1,2}/\\d{2,4}',            // "3/31/26"
    '[\\d,]{4,}\\s+and\\s+[\\d,]{4,}',       // "172,185,507 and 171,360,188"
    '\\brespectively\\b',
  ].join('|'),
  'i'
);

/**
 * Words whose removal is the cleaner doing its job, not losing meaning --
 * they only ever appear as part of the period-specific clause being stripped.
 */
const STOP = new Set([
  'and', 'the', 'respectively', 'shares', 'share', 'issued', 'outstanding',
  'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august',
  'september', 'october', 'november', 'december',
]);

/** Text that reads as broken rather than merely uncleaned. */
const MANGLED = [
  ['no space after removal', /[;,](?:issued|outstanding|as of|at)\b/i],
  ['dangling connector', /\b(?:of|and|at|net of)\s*$/i],
  ['empty or stray parens', /\(\s*\)|\(\s*[;,]|[;,]\s*\)|\s\)/],
  ['doubled punctuation', /,\s*,|;\s*;/],
];

function collect() {
  // Only banks the site serves. Data files for banks that have stopped filing
  // are pruned now, but scoping here keeps the audit measuring what a reader
  // can actually reach rather than whatever happens to be on disk.
  const live = new Set(
    JSON.parse(readFileSync(join(BANKS_DIR, '..', 'banks.json'), 'utf8')).map(b => b.cik)
  );
  const rows = [];
  for (const f of readdirSync(BANKS_DIR)) {
    if (!f.endsWith('.json')) continue;
    if (!live.has(f.replace('.json', ''))) continue;
    const d = JSON.parse(readFileSync(join(BANKS_DIR, f), 'utf8'));
    const ticker = d.ticker || f.replace('.json', '');
    for (const key of ['historicalBalanceSheet', 'historicalIncomeStatement']) {
      const H = d.rawData?.[key];
      if (!H) continue;
      const stmt = key === 'historicalBalanceSheet' ? 'BS' : 'IS';
      for (const bucket of ['annual', 'quarterly']) {
        // Mirror the component: a row renders only when it has a value in
        // some displayed period. Auditing hidden rows would inflate every count.
        const hasValue = new Set();
        for (const p of H[bucket] || []) {
          for (const it of p.items || []) {
            if (it.value !== null && it.value !== undefined) hasValue.add(it.tag);
          }
        }
        for (const it of H.canonicalItems?.[bucket] || []) {
          if (!it?.label || !hasValue.has(it.tag)) continue;
          rows.push({ ticker, stmt, bucket, tag: it.tag, raw: it.label, shown: cleanLabel(it.label) });
        }
      }
    }
  }
  return rows;
}

function analyse(rows) {
  const dirty = [];
  const mangled = [];
  const blank = [];
  const collisions = { cleaning: [], tagchange: [] };

  for (const r of rows) {
    if (!r.shown || !r.shown.trim()) { blank.push(r); continue; }
    if (DIRTY.test(r.shown)) dirty.push(r);
    for (const [why, re] of MANGLED) {
      if (re.test(r.shown)) { mangled.push({ ...r, why }); break; }
    }
  }

  // Two rows in the SAME rendered table showing identical text.
  const tables = new Map();
  for (const r of rows) {
    const k = `${r.ticker}|${r.stmt}|${r.bucket}`;
    if (!tables.has(k)) tables.set(k, []);
    tables.get(k).push(r);
  }
  for (const [table, list] of tables) {
    const byShown = new Map();
    for (const r of list) {
      if (!r.shown?.trim()) continue;
      if (!byShown.has(r.shown)) byShown.set(r.shown, []);
      byShown.get(r.shown).push(r);
    }
    for (const [shown, group] of byShown) {
      if (group.length < 2) continue;
      // Did cleaning create the collision, or were the raw labels already equal?
      const cause = new Set(group.map(g => g.raw)).size > 1 ? 'cleaning' : 'tagchange';
      collisions[cause].push({ table, shown, tags: group.map(g => g.tag) });
    }
  }
  return { dirty, mangled, blank, collisions };
}

const rows = collect();
const a = analyse(rows);
const banks = new Set(rows.map(r => r.ticker)).size;

console.log(`rendered rows: ${rows.length}  |  distinct labels: ${new Set(rows.map(r => r.raw)).size}  |  banks: ${banks}`);
console.log('');
const pct = n => ((n / rows.length) * 100).toFixed(1) + '%';
console.log(`  still period-specific : ${String(a.dirty.length).padStart(6)}  (${pct(a.dirty.length)})  across ${new Set(a.dirty.map(r => r.ticker)).size} banks`);
console.log(`  visibly mangled       : ${String(a.mangled.length).padStart(6)}  (${pct(a.mangled.length)})  across ${new Set(a.mangled.map(r => r.ticker)).size} banks`);
console.log(`  blank label           : ${String(a.blank.length).padStart(6)}`);
console.log(`  duplicate rows (cleaning-caused) : ${a.collisions.cleaning.length}`);
console.log(`  duplicate rows (tag change)      : ${a.collisions.tagchange.length}`);

if (a.mangled.length) {
  const byWhy = {};
  for (const m of a.mangled) byWhy[m.why] = (byWhy[m.why] || 0) + 1;
  console.log('');
  console.log('  mangle breakdown: ' + Object.entries(byWhy).map(([w, n]) => `${w}=${n}`).join(', '));
}

// Snapshot keyed by the row's identity, so compare mode can attribute a change
// to a specific bank/tag rather than just counting.
const snapshot = {};
for (const r of rows) snapshot[`${r.ticker}|${r.stmt}|${r.bucket}|${r.tag}|${r.raw}`] = r.shown;

if (writePath) {
  writeFileSync(writePath, JSON.stringify(snapshot, null, 0));
  console.log(`\nsnapshot written: ${writePath} (${Object.keys(snapshot).length} rows)`);
}

if (comparePath) {
  const before = JSON.parse(readFileSync(comparePath, 'utf8'));
  const improved = [], worsened = [], changedNeutral = [], overStripped = [];
  // Removing period detail should never remove meaning. Any descriptive word
  // that disappears -- one with letters and no digits, like "authorized" or
  // "Series" -- is a candidate over-strip, which the dirty/mangled counts
  // above cannot see because deleting text always makes them look better.
  const contentWords = s => new Set(
    (s.toLowerCase().match(/[a-z][a-z-]{2,}/g) || []).filter(w => !STOP.has(w))
  );
  for (const [k, nowShown] of Object.entries(snapshot)) {
    if (!(k in before)) continue;
    const wasShown = before[k];
    if (wasShown === nowShown) continue;
    const raw = k.split('|').slice(4).join('|');
    const lost = [...contentWords(wasShown)].filter(w => !contentWords(nowShown).has(w));
    if (lost.length) overStripped.push({ raw, was: wasShown, now: nowShown, lost });
    const wasDirty = DIRTY.test(wasShown) || !wasShown.trim();
    const nowDirty = DIRTY.test(nowShown) || !nowShown.trim();
    const wasMangled = MANGLED.some(([, re]) => re.test(wasShown));
    const nowMangled = MANGLED.some(([, re]) => re.test(nowShown));
    const wasBad = wasDirty || wasMangled;
    const nowBad = nowDirty || nowMangled;
    const rec = { raw, was: wasShown, now: nowShown };
    if (wasBad && !nowBad) improved.push(rec);
    else if (!wasBad && nowBad) worsened.push(rec);
    else changedNeutral.push(rec);
  }
  const added = Object.keys(snapshot).filter(k => !(k in before)).length;
  const removed = Object.keys(before).filter(k => !(k in snapshot)).length;
  console.log('');
  console.log(`=== compare vs ${comparePath} ===`);
  console.log(`  improved : ${improved.length}`);
  console.log(`  WORSENED : ${worsened.length}`);
  console.log(`  changed, still imperfect : ${changedNeutral.length}`);
  console.log(`  lost a descriptive word (review) : ${overStripped.length}`);
  console.log(`  rows added : ${added}   rows removed : ${removed}`);
  if (overStripped.length) {
    const freq = {};
    for (const o of overStripped) for (const w of o.lost) freq[w] = (freq[w] || 0) + 1;
    console.log('  words most often lost: ' + Object.entries(freq)
      .sort((a, b) => b[1] - a[1]).slice(0, 12).map(([w, n]) => `${w}(${n})`).join(' '));
  }
  const show = (title, list, n = 8) => {
    if (!list.length) return;
    console.log(`\n  --- ${title} ---`);
    for (const r of list.slice(0, n)) {
      console.log(`    raw : ${r.raw.slice(0, 130)}`);
      console.log(`    was : ${r.was.slice(0, 130)}`);
      console.log(`    now : ${r.now.slice(0, 130)}`);
    }
  };
  show('WORSENED (must be empty)', worsened, 12);
  show('changed but still imperfect', changedNeutral, 4);
  show("over-stripped (lost a descriptive word)", overStripped, 6);
  show("improved (sample)", improved, 4);
  if (worsened.length) process.exitCode = 1;
}

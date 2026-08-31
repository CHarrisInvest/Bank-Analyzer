#!/usr/bin/env node
/**
 * Audit the FIGURES in the statement tables, as audit-labels.mjs does for the
 * text of the rows.
 *
 * The tables render formatStatementCell(value, tag), so replaying that over
 * every bank file reproduces exactly what a reader sees in each cell, without
 * a browser.
 *
 *   node scripts/audit-cells.mjs                  report, and write a snapshot
 *   node scripts/audit-cells.mjs --compare FILE   diff against a snapshot
 *   node scripts/audit-cells.mjs --check          assert invariants (CI)
 *
 * The headline metric is rows whose own cells do not share a unit. A row that
 * reads "$6,000 | $0 | $-6,000 | $-0.14M" cannot be compared against itself,
 * which is worse than any amount of verbosity.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { cleanLabel } from '../src/utils/labels.js';
import { formatStatementCell, isPerShareTag } from '../src/utils/format.js';
import { selectStatementRows } from '../src/utils/statementLayout.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA = join(__dirname, '..', 'public', 'data');
const DEFAULT_SNAPSHOT = join(__dirname, '..', 'tests', 'cell-snapshot.json');

const args = process.argv.slice(2);
const ci = args.indexOf('--compare');
const comparePath = ci !== -1 ? args[ci + 1] : null;
const writePath = args.includes('--write') ? DEFAULT_SNAPSHOT : null;

/**
 * What unit is this cell displayed in? Two cells in one row that answer
 * differently cannot be read against each other.
 */
function unitOf(shown) {
  if (shown === '-' || shown === '') return null;      // absent, not a unit
  const bare = shown.replace(/^\(|\)$/g, '');          // accounting negatives
  if (/M$/.test(bare)) return 'millions';
  if (/^\$/.test(bare)) return 'dollars';
  return 'count';
}

/** Cells whose sign is written in a place no financial statement writes it. */
const SIGN_OUTSIDE = /^\$-|^-\$/;

function collect() {
  const live = JSON.parse(readFileSync(join(DATA, 'banks.json'), 'utf8')).filter(b => b.ticker);
  const rows = [];
  for (const b of live) {
    let d;
    try { d = JSON.parse(readFileSync(join(DATA, 'banks', `${b.cik}.json`), 'utf8')); } catch { continue; }
    for (const key of ['historicalBalanceSheet', 'historicalIncomeStatement']) {
      const H = d.rawData?.[key];
      if (!H) continue;
      const stmt = key === 'historicalBalanceSheet' ? 'BS' : 'IS';
      for (const bucket of ['annual', 'quarterly']) {
        const periods = H[bucket] || [];
        if (!periods.length) continue;
        // Mirror the component: values are looked up per period by tag.
        const byTag = new Map();
        for (const p of periods) {
          for (const it of p.items || []) {
            if (!byTag.has(it.tag)) byTag.set(it.tag, []);
            byTag.get(it.tag).push(it.value ?? null);
          }
        }
        const ordered = (H.canonicalItems?.[bucket] || [])
          .filter(it => it?.label)
          .map(it => ({ ...it, values: byTag.get(it.tag) || [] }));
        for (const it of selectStatementRows(ordered)) {
          rows.push({
            ticker: b.ticker,
            stmt,
            bucket,
            tag: it.tag,
            label: cleanLabel(it.label),
            values: it.values,
            cells: it.values.map(v => formatStatementCell(v, it.tag)),
          });
        }
      }
    }
  }
  return rows;
}

function analyse(rows) {
  const mixedUnits = [];
  const signOutside = [];
  const allZero = [];
  const perShareAsCurrency = [];

  for (const r of rows) {
    const units = new Set(r.cells.map(unitOf).filter(Boolean));
    if (units.size > 1) mixedUnits.push({ ...r, units: [...units] });
    if (r.cells.some(c => SIGN_OUTSIDE.test(c))) signOutside.push(r);
    // A row with no magnitude in any displayed period carries no figure --
    // these are note references ("Commitments and contingencies (Note 8)")
    // and "none issued" placeholders, rendered as a column of $0.
    const present = r.values.filter(v => v !== null);
    if (present.length && present.every(v => v === 0)) allZero.push(r);
    // A per-share figure scaled into millions reads as $0.00M.
    if (isPerShareTag(r.tag) && r.cells.some(c => /M\)?$/.test(c))) perShareAsCurrency.push(r);
  }
  return { mixedUnits, signOutside, allZero, perShareAsCurrency };
}

const rows = collect();
const a = analyse(rows);
const cells = rows.reduce((n, r) => n + r.cells.length, 0);
const banks = new Set(rows.map(r => r.ticker)).size;

console.log(`rendered rows: ${rows.length}   cells: ${cells}   banks: ${banks}`);
console.log('');
console.log(`  rows whose own cells mix units    : ${a.mixedUnits.length}  across ${new Set(a.mixedUnits.map(r => r.ticker)).size} banks`);
console.log(`  rows with a sign outside the amount: ${a.signOutside.length}  across ${new Set(a.signOutside.map(r => r.ticker)).size} banks`);
console.log(`  rows valued zero in every period   : ${a.allZero.length}  across ${new Set(a.allZero.map(r => r.ticker)).size} banks`);
console.log(`  per-share figures scaled to millions: ${a.perShareAsCurrency.length}`);

const show = (title, list, n = 5) => {
  if (!list.length) return;
  console.log(`\n  --- ${title} ---`);
  for (const r of list.slice(0, n)) {
    console.log(`    ${r.ticker} ${r.stmt}/${r.bucket} ${r.label.slice(0, 48)}`);
    console.log(`      ${r.cells.slice(0, 6).join(' | ')}`);
  }
};
show('rows mixing units', a.mixedUnits);
show('rows zero in every period', a.allZero);
show('per-share scaled to millions', a.perShareAsCurrency);

const snapshot = {};
for (const r of rows) snapshot[`${r.ticker}|${r.stmt}|${r.bucket}|${r.tag}`] = r.cells.join(' | ');

if (writePath) {
  writeFileSync(writePath, JSON.stringify(snapshot, null, 0));
  console.log(`\nsnapshot written: ${writePath} (${Object.keys(snapshot).length} rows)`);
}

if (comparePath) {
  const before = JSON.parse(readFileSync(comparePath, 'utf8'));
  const changed = [];
  for (const [k, now] of Object.entries(snapshot)) {
    if (!(k in before) || before[k] === now) continue;
    changed.push({ k, was: before[k], now });
  }
  const added = Object.keys(snapshot).filter(k => !(k in before)).length;
  const removed = Object.keys(before).filter(k => !(k in snapshot)).length;
  console.log(`\n=== compare vs ${comparePath} ===`);
  console.log(`  rows whose cells changed : ${changed.length}`);
  console.log(`  rows added : ${added}   rows removed : ${removed}`);
  // A formatting change must not change what a cell says the figure IS.
  // Read each displayed cell back to a number and compare: this catches
  // precision quietly lost to a shorter format, which comparing the raw text
  // cannot, because every cell's text changes when the format changes.
  const parse = (s) => {
    if (!s || s === '-') return null;
    const neg = /^\(.*\)$/.test(s);
    const body = s.replace(/[()$,\s]/g, '');
    const scale = /M$/.test(body) ? 1e6 : 1;
    const n = parseFloat(body.replace(/M$/, ''));
    if (!Number.isFinite(n)) return null;
    return (neg ? -n : n) * scale;
  };
  // How much a cell's last displayed digit is worth: "$0.17M" resolves to
  // $10,000. Two readings within one such step are the same figure rounded,
  // not a changed figure -- a value sitting exactly on a tie ($175,000) moves
  // a whole step when the rounding does.
  const tick = (s) => {
    if (!s || s === '-') return 0;
    const body = s.replace(/[()$,\s]/g, '');
    const scale = /M$/.test(body) ? 1e6 : 1;
    const dp = (body.replace(/M$/, '').split('.')[1] || '').length;
    return scale / 10 ** dp;
  };
  const drifted = [];
  for (const c of changed) {
    const was = c.was.split(' | ');
    const now = c.now.split(' | ');
    for (let i = 0; i < Math.max(was.length, now.length); i++) {
      const a = parse(was[i]), b = parse(now[i]);
      if (a === null && b === null) continue;
      if (a === null || b === null) { drifted.push(c); break; }
      // The 1e-9 slack is float noise from reading "$66.9M" back to a number,
      // not tolerance for a real difference.
      if (Math.abs(a - b) > Math.max(tick(was[i]), tick(now[i])) * (1 + 1e-9)) { drifted.push(c); break; }
    }
  }
  console.log(`  ...of which the figure itself moved : ${drifted.length}`);
  for (const c of drifted.slice(0, 12)) {
    console.log(`    ${c.k}\n      was: ${c.was.slice(0, 110)}\n      now: ${c.now.slice(0, 110)}`);
  }
  for (const c of changed.slice(0, 6)) {
    console.log(`    ${c.k}\n      was: ${c.was.slice(0, 110)}\n      now: ${c.now.slice(0, 110)}`);
  }
}

if (args.includes('--check')) {
  const INVARIANTS = [
    ['rows whose own cells mix units', a.mixedUnits.length, 0],
    ['rows with a sign outside the amount', a.signOutside.length, 0],
    ['rows valued zero in every period', a.allZero.length, 0],
    ['per-share figures scaled to millions', a.perShareAsCurrency.length, 0],
  ];
  const FLOORS = [
    ['rendered rows audited', rows.length, 40000],
    ['cells audited', cells, 150000],
    ['banks audited', banks, 300],
  ];
  console.log('\n=== invariant check ===');
  let failed = 0;
  for (const [what, n, budget] of INVARIANTS) {
    console.log(`  ${n <= budget ? 'ok   ' : 'FAIL '} ${what}: ${n} (max ${budget})`);
    if (n > budget) failed++;
  }
  for (const [what, n, floor] of FLOORS) {
    console.log(`  ${n >= floor ? 'ok   ' : 'FAIL '} ${what}: ${n} (min ${floor})`);
    if (n < floor) failed++;
  }
  if (failed) {
    console.error(`\n${failed} invariant(s) broken.`);
    process.exitCode = 1;
  } else {
    console.log('\nall invariants hold');
  }
}

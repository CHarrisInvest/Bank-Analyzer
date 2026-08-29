#!/usr/bin/env node
/**
 * Audit statement STRUCTURE, as a companion to audit-labels.mjs.
 *
 * The label audit checks what each row is called; this checks whether the
 * table around those rows holds together -- how it is grouped, whether the
 * period columns are coherent, and whether the numbers foot.
 *
 *   node scripts/audit-presentation.mjs                  report
 *   node scripts/audit-presentation.mjs --write          report + snapshot
 *   node scripts/audit-presentation.mjs --compare FILE   diff against snapshot
 *   node scripts/audit-presentation.mjs --check          assert invariants (CI)
 *
 * --check is the CI gate. It asserts the properties that are wrong at any
 * count rather than comparing to a snapshot: the data legitimately changes
 * every quarter, so snapshot equality would fail on every refresh and teach
 * everyone to ignore it.
 *
 * Only banks listed in banks.json are audited. Files for banks that have
 * stopped filing linger in the directory and are not served, so measuring
 * them reports a generator version no longer in use.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { cleanLabel } from '../src/utils/labels.js';
import { detectSection, groupItemsIntoSections } from '../src/utils/statementLayout.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA = join(__dirname, '..', 'public', 'data');
const SNAPSHOT = join(__dirname, '..', 'tests', 'presentation-snapshot.json');

const args = process.argv.slice(2);
const ci = args.indexOf('--compare');
const comparePath = ci !== -1 ? args[ci + 1] : null;

const live = new Set(JSON.parse(readFileSync(join(DATA, 'banks.json'), 'utf8')).map(b => b.cik));

const M = {
  tables: 0, rows: 0,
  sections: 0, emptySections: 0, duplicateSectionIds: 0, headerRows: 0, flatTables: 0,
  singlePeriodRows: 0,
  shortHistoryTables: 0,
  duplicatePeriodColumns: 0,
  columnsOutOfOrder: 0,
  balanceSheetsChecked: 0, balanceSheetsOff: 0,
  negativeSubtotals: 0,
};
const detail = { dupPeriods: [], outOfOrder: [], negSubtotal: [], bsOff: [], dupSectionIds: [] };

/** A subtotal shown negative while the components above it are positive. */
function negativeSubtotalCells(period) {
  let n = 0;
  const items = (period.items || []).filter(i => i.value != null);
  for (const it of items) {
    if (!it.negating || it.value >= 0) continue;
    // Components share the tag's family prefix and sit above the subtotal.
    const stem = it.tag.replace(/(Operating|Total|Net)$/, '');
    const kin = items.filter(x => x !== it && x.tag.startsWith(stem) && x.value > 0);
    if (kin.length >= 2 && Math.abs(kin.reduce((s, x) => s + x.value, 0) + it.value) < Math.abs(it.value) * 0.02) n++;
  }
  return n;
}

for (const f of readdirSync(join(DATA, 'banks'))) {
  if (!f.endsWith('.json')) continue;
  if (!live.has(f.replace('.json', ''))) continue;
  const d = JSON.parse(readFileSync(join(DATA, 'banks', f), 'utf8'));
  const t = d.ticker || f.replace('.json', '');

  for (const key of ['historicalBalanceSheet', 'historicalIncomeStatement']) {
    const H = d.rawData?.[key];
    if (!H) continue;
    const stmt = key === 'historicalBalanceSheet' ? 'BS' : 'IS';
    for (const bucket of ['annual', 'quarterly']) {
      const periods = H[bucket] || [];
      if (!periods.length) continue;
      const valued = new Set();
      for (const p of periods) for (const it of p.items || []) if (it.value != null) valued.add(it.tag);
      const visible = (H.canonicalItems?.[bucket] || []).filter(it => it?.label && valued.has(it.tag));
      if (!visible.length) continue;
      // Grouping runs on the displayed label, so the audit has to clean first
      // or it measures a layout no reader sees.
      const rows = visible.map(it => ({ ...it, displayLabel: cleanLabel(it.label) }));

      M.tables++; M.rows += rows.length;

      const headers = rows.filter(detectSection);
      M.headerRows += headers.length;
      if (!headers.length) M.flatTables++;
      const groups = groupItemsIntoSections(rows.map((item, idx) => ({ ...item, idx })));
      M.sections += groups.length;
      M.emptySections += groups.filter(g => g.header && g.children.length === 0).length;
      // The id is the React key and the collapse-state key; two groups keyed
      // alike share one toggle.
      const ids = groups.map(g => g.id);
      if (new Set(ids).size !== ids.length) {
        M.duplicateSectionIds++;
        if (detail.dupSectionIds.length < 6) detail.dupSectionIds.push(`${t} ${stmt}/${bucket}: ${ids.join(', ')}`);
      }

      for (const it of rows) {
        let n = 0;
        for (const p of periods) {
          const hit = (p.items || []).find(x => x.tag === it.tag);
          if (hit && hit.value != null) n++;
        }
        if (n === 1 && periods.length >= 4) M.singlePeriodRows++;
      }

      if (bucket === 'quarterly' && periods.length < 4) M.shortHistoryTables++;

      const seen = new Set();
      for (const p of periods) {
        if (seen.has(p.period)) {
          M.duplicatePeriodColumns++;
          if (detail.dupPeriods.length < 6) detail.dupPeriods.push(`${t} ${stmt}/${bucket} ${p.period}`);
        }
        seen.add(p.period);
      }
      for (let i = 1; i < periods.length; i++) {
        if (periods[i].ddate > periods[i - 1].ddate) {
          M.columnsOutOfOrder++;
          if (detail.outOfOrder.length < 6) detail.outOfOrder.push(`${t} ${stmt}/${bucket} ${periods[i - 1].period}(${periods[i - 1].ddate}) before ${periods[i].period}(${periods[i].ddate})`);
          break;
        }
      }

      for (const p of periods) {
        const n = negativeSubtotalCells(p);
        M.negativeSubtotals += n;
        if (n && detail.negSubtotal.length < 6) detail.negSubtotal.push(`${t} ${stmt}/${bucket} ${p.period}`);
        if (stmt !== 'BS') continue;
        const pick = (...tags) => { for (const g of tags) { const h = (p.items || []).find(x => x.tag === g && x.value != null); if (h) return h.value; } return null; };
        const A = pick('Assets');
        const LE = pick('LiabilitiesAndStockholdersEquity');
        if (A == null || LE == null) continue;
        M.balanceSheetsChecked++;
        if (Math.abs(A - LE) > Math.max(1, Math.abs(A) * 0.005)) {
          M.balanceSheetsOff++;
          if (detail.bsOff.length < 6) detail.bsOff.push(`${t} ${bucket} ${p.period}: ${A} vs ${LE}`);
        }
      }
    }
  }
}

const per = (n) => (n / M.tables).toFixed(1);
console.log(`statement tables: ${M.tables}   rendered rows: ${M.rows}`);
console.log('');
console.log(`  rows treated as section headers : ${M.headerRows} (${((M.headerRows / M.rows) * 100).toFixed(0)}% of rows)`);
console.log(`  sections per table              : ${per(M.sections)}`);
console.log(`  sections with no child rows     : ${M.emptySections}`);
console.log(`  tables with duplicate section ids: ${M.duplicateSectionIds}`);
console.log(`  tables rendering flat           : ${M.flatTables} of ${M.tables}`);
console.log(`  rows valued in a single period  : ${M.singlePeriodRows}`);
console.log(`  quarterly tables under 4 columns: ${M.shortHistoryTables}`);
console.log(`  duplicate period columns        : ${M.duplicatePeriodColumns}`);
console.log(`  columns not newest-first        : ${M.columnsOutOfOrder}`);
console.log(`  negative subtotal over positive components : ${M.negativeSubtotals}`);
console.log(`  balance sheets not footing      : ${M.balanceSheetsOff} of ${M.balanceSheetsChecked}`);
for (const [k, list] of Object.entries(detail)) {
  if (list.length) console.log(`\n  ${k}:\n` + list.map(x => '    ' + x).join('\n'));
}

if (args.includes('--write')) {
  writeFileSync(SNAPSHOT, JSON.stringify(M, null, 2));
  console.log(`\nsnapshot written: ${SNAPSHOT}`);
}

if (args.includes('--check')) {
  /**
   * Invariants: properties that are wrong at any count, whatever the quarter.
   *
   * Deliberately not a snapshot comparison. Every metric that varies with the
   * data -- single-period rows, short histories, how many tables render flat --
   * is left out, because a check that fails on ordinary quarterly change gets
   * ignored, and an ignored check is worse than none.
   */
  const INVARIANTS = [
    ['balance sheets that do not foot', M.balanceSheetsOff, 0],
    ['period columns duplicated', M.duplicatePeriodColumns, 0],
    ['period columns not newest-first', M.columnsOutOfOrder, 0],
    ['subtotals shown negative over positive components', M.negativeSubtotals, 0],
    ['sections offering a toggle that expands to nothing', M.emptySections, 0],
    ['tables with two sections sharing an id', M.duplicateSectionIds, 0],
  ];
  // Without these the audit can pass by measuring nothing at all, which is
  // exactly what a broken data path looks like.
  const FLOORS = [
    ['statement tables audited', M.tables, 1000],
    ['rendered rows audited', M.rows, 40000],
    ['balance sheets checked for footing', M.balanceSheetsChecked, 4000],
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
    console.error(`\n${failed} invariant(s) broken -- see the detail above.`);
    process.exitCode = 1;
  } else {
    console.log('\nall invariants hold');
  }
}

if (comparePath) {
  const before = JSON.parse(readFileSync(comparePath, 'utf8'));
  // Lower is better for every metric except flatTables, which rises when fake
  // sections stop being invented, and tables/rows, which must not move at all.
  const lowerIsBetter = new Set(Object.keys(M).filter(k => !['tables', 'rows', 'flatTables', 'balanceSheetsChecked'].includes(k)));
  console.log(`\n=== compare vs ${comparePath} ===`);
  let regressed = 0;
  for (const k of Object.keys(M)) {
    const a = before[k], b = M[k];
    if (a === b) continue;
    const worse = lowerIsBetter.has(k) ? b > a : (['tables', 'rows'].includes(k) ? true : false);
    if (worse) regressed++;
    console.log(`  ${worse ? 'WORSE  ' : 'better '} ${k}: ${a} -> ${b}`);
  }
  if (!regressed) console.log('  no regressions');
  else process.exitCode = 1;
}

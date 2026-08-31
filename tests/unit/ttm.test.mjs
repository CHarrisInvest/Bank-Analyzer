/**
 * Trailing-twelve-month aggregation.
 *
 * Every ratio on the screener divides a TTM flow by a point-in-time balance,
 * so a TTM that silently spans the wrong four quarters is wrong everywhere at
 * once and looks plausible in each place. getTTMValue therefore returns null
 * rather than falling back to an annual figure when it cannot assemble four
 * consecutive quarters.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { getTTMValue } = require('../../scripts/fetch-sec-fs-datasets.cjs');

const q = (ddate, value, extra = {}) => ({ ddate, value, qtrs: 1, form: '10-Q', fy: ddate.slice(0, 4), ...extra });
const annual = (ddate, value) => ({ ddate, value, qtrs: 4, form: '10-K', fy: ddate.slice(0, 4) });

test('sums four consecutive quarters', () => {
  const r = getTTMValue([
    q('20260331', 40), q('20251231', 30), q('20250930', 20), q('20250630', 10),
  ]);
  assert.equal(r.value, 100);
  assert.equal(r.date, '20260331');
  assert.equal(r.method, 'sum-4Q');
});

test('refuses to bridge a gap in the quarters', () => {
  // Q3 2025 missing: 40 + 30 + 10 + 5 is not a year.
  assert.equal(getTTMValue([
    q('20260331', 40), q('20251231', 30), q('20250630', 10), q('20250331', 5),
  ]), null);
});

test('derives Q4 from the 10-K when no Q4 10-Q exists', () => {
  // The annual is 100 and Q1-Q3 are 10+20+30, so Q4 is 40.
  const r = getTTMValue([
    annual('20251231', 100), q('20250930', 30), q('20250630', 20), q('20250331', 10),
  ]);
  assert.equal(r.value, 100);
  assert.equal(r.derivedQ4, 40);
  assert.equal(r.method, 'sum-4Q-derived');
  assert.equal(r.date, '20251231');
});

test('rolls a derived Q4 forward into the next year', () => {
  const r = getTTMValue([
    q('20260930', 33), q('20260630', 22), q('20260331', 11),
    annual('20251231', 100), q('20250930', 30), q('20250630', 20), q('20250331', 10),
  ]);
  assert.equal(r.value, 33 + 22 + 11 + 40);
  assert.equal(r.derivedQ4, 40);
  assert.equal(r.date, '20260930');
});

test('never falls back to a bare annual figure', () => {
  // An annual value alone is a year of data, but not a TRAILING year, and
  // pairing it with a current balance sheet is what makes ratios drift.
  assert.equal(getTTMValue([annual('20251231', 100)]), null);
  assert.equal(getTTMValue([q('20260331', 40), q('20251231', 30)]), null);
});

test('ignores forms other than 10-K and 10-Q', () => {
  const eightK = { ...q('20260331', 999), form: '8-K' };
  assert.equal(getTTMValue([eightK, q('20251231', 30), q('20250930', 20), q('20250630', 10)]), null);
});

test('takes one value per period when a quarter is reported twice', () => {
  // A period restated in a later filing appears twice; counting both would
  // double it and still look like four quarters.
  const r = getTTMValue([
    q('20260331', 40), q('20260331', 41),
    q('20251231', 30), q('20250930', 20), q('20250630', 10),
  ]);
  assert.equal(r.value, 100);
});

test('no data is null, not zero', () => {
  assert.equal(getTTMValue([]), null);
  assert.equal(getTTMValue(null), null);
});

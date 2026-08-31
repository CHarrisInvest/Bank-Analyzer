/**
 * Figure formatting.
 *
 * A statement cell has one job: say what the figure is, in a unit the reader
 * can compare against the cell next to it. The bug this file exists to
 * prevent is a row that changes unit halfway across, which made ABCB's
 * provision row read "$6,000 | $0 | $-6,000 | $-0.14M".
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  formatCurrency, formatNumber, formatPercent,
  formatStatementCell, isPerShareTag, isShareCountTag,
} from '../../src/utils/format.js';

test('every currency figure is in millions, whatever its size', () => {
  assert.equal(formatCurrency(4_900_475_000_000), '$4,900,475.0M');
  assert.equal(formatCurrency(345_600_000), '$345.6M');
  assert.equal(formatCurrency(450_000), '$0.45M');
  // Precision is kept by adding decimals, never by switching to raw dollars.
  assert.equal(formatCurrency(6_000), '$0.006M');
  assert.equal(formatCurrency(794), '$0.000794M');
  assert.equal(formatCurrency(13), '$0.000013M');
  assert.equal(formatCurrency(0), '$0.0M');
});

test('a row cannot change unit across its own cells', () => {
  const row = [6000, 0, -6000, -139000].map(v => formatStatementCell(v, 'ProvisionForOtherCreditLosses'));
  assert.deepEqual(row, ['$0.006M', '$0.0M', '($0.006M)', '($0.14M)']);
  const units = new Set(row.map(c => (/M\)?$/.test(c) ? 'millions' : 'other')));
  assert.equal(units.size, 1);
});

test('negatives take accounting parentheses, in every concept', () => {
  assert.equal(formatCurrency(-25_928_000_000), '($25,928.0M)');
  assert.equal(formatStatementCell(-1.23, 'EarningsPerShareBasic'), '($1.23)');
  assert.equal(formatStatementCell(-6000, 'CommonStockSharesIssued'), '(6,000)');
});

test('rounds the figure as written, not as stored', () => {
  // $175,000 is 0.175M, which rounds up. Formatting through toFixed rounded
  // it down, because the double is 0.17499999999999998890.
  assert.equal(formatCurrency(175_000), '$0.18M');
  assert.equal(formatCurrency(66_850_000), '$66.9M');
});

test('missing is a dash, not a zero', () => {
  assert.equal(formatCurrency(null), '-');
  assert.equal(formatCurrency(undefined), '-');
  assert.equal(formatStatementCell(null, 'Assets'), '-');
});

test('share counts are counts, not money', () => {
  assert.equal(isShareCountTag('CommonStockSharesIssued'), true);
  assert.equal(formatStatementCell(28_205_674, 'CommonStockSharesIssued'), '28,205,674');
});

test('par value and liquidation preference are quoted per share', () => {
  // Scaled into millions these read as "$0.00" and told the reader nothing.
  assert.equal(isPerShareTag('PreferredStockNoParValue'), true);
  assert.equal(isPerShareTag('CommonStockParOrStatedValuePerShare'), true);
  assert.equal(isPerShareTag('PreferredStockLiquidationPreference'), true);
  assert.equal(formatStatementCell(0.01, 'PreferredStockNoParValue'), '$0.01');
  assert.equal(formatStatementCell(25, 'PreferredStockLiquidationPreference'), '$25.00');
});

test('the aggregate sibling of a per-share concept is still an amount', () => {
  // PreferredStockLiquidationPreferenceValue is dollars, not dollars a share.
  assert.equal(isPerShareTag('PreferredStockLiquidationPreferenceValue'), false);
  assert.equal(isPerShareTag('PreferredStockValue'), false);
  assert.equal(formatStatementCell(20_045_000_000, 'PreferredStockValue'), '$20,045.0M');
});

test('plain numbers and percentages', () => {
  assert.equal(formatNumber(1234567), '1,234,567');
  assert.equal(formatNumber(1.5, 2), '1.50');
  assert.equal(formatNumber(null), '-');
  assert.equal(formatPercent(12.345), '12.35%');
  assert.equal(formatPercent(null), '-');
});

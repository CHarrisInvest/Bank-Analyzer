/**
 * Label cleaning.
 *
 * cleanLabel decides what every statement row is called, so a rule that
 * over-reaches deletes information from thousands of rows at once. Most of
 * the cases below are regressions that actually happened while the cleaner
 * was being built: each one is a rule that looked right in isolation and
 * destroyed real captions on live data.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cleanLabel, truncateLabel, humanizeTag, resolveLabels } from '../../src/utils/labels.js';

test('removes the comparative clause a caption exists without', () => {
  assert.equal(
    cleanLabel(
      'Common stock, $1 par value; 500,000,000 shares authorized; 172,185,507 and 171,360,188 ' +
      'shares issued and outstanding at December 31, 2025 and December 31, 2024, respectively'
    ),
    'Common stock, $1 par value; 500,000,000 shares authorized'
  );
  assert.equal(
    cleanLabel('Treasury stock, at cost (1,234,567 and 1,200,000 shares, respectively)'),
    'Treasury stock, at cost'
  );
  assert.equal(
    cleanLabel('Loans, net of allowance of $12,345 and $11,111'),
    'Loans, net of allowance'
  );
});

test('a thousands separator is not a list separator', () => {
  // The joiner used to admit a bare comma, so "500,000,000" read as three
  // comparatives and the authorisation disappeared. A separator in a list has
  // whitespace after it; a thousands separator never does.
  assert.equal(
    cleanLabel('Common stock, $5 par value, 500,000,000 shares authorized'),
    'Common stock, $5 par value, 500,000,000 shares authorized'
  );
  // ...and a genuinely comma-separated series is still a series.
  assert.equal(
    cleanLabel('Shares issued 127,688,691, 129,836,672 and 132,204,305'),
    'Shares issued 127,688,691'
  );
});

test('"issued and outstanding" is a caption, not a dangling connector', () => {
  assert.equal(
    cleanLabel('Preferred stock, no par value; 10,000,000 shares authorized; none issued'),
    'Preferred stock, no par value; 10,000,000 shares authorized; none issued'
  );
  assert.equal(
    cleanLabel('Common stock, 1,000 shares issued and outstanding at March 31, 2026'),
    'Common stock, 1,000 shares issued and outstanding'
  );
});

test('an Oxford comma is part of the caption', () => {
  // A rule that dropped "and" after punctuation rewrote this to
  // "Loan, Lease, Other Losses".
  assert.equal(
    cleanLabel('Provision for Loan, Lease, and Other Losses'),
    'Provision for Loan, Lease, and Other Losses'
  );
});

test('cleans inside a parenthetical rather than discarding it whole', () => {
  // The date goes; the authorisation it was attached to stays.
  assert.equal(
    cleanLabel('Securities available for sale, at fair value (amortized cost of $100,000 at March 31, 2026)'),
    'Securities available for sale, at fair value (amortized cost of $100,000)'
  );
  // Nothing but a comparative pair inside -- the parenthetical goes.
  assert.equal(
    cleanLabel('Held-to-maturity securities (fair value of $1,234 and $5,678)'),
    'Held-to-maturity securities'
  );
  // A parenthetical carrying no period detail is left alone.
  assert.equal(cleanLabel('Deposits (noninterest-bearing)'), 'Deposits (noninterest-bearing)');
  assert.equal(
    cleanLabel('Accumulated other comprehensive income (loss), net of tax'),
    'Accumulated other comprehensive income (loss), net of tax'
  );
});

test('leaves an already-clean caption untouched', () => {
  for (const label of ['Total assets', 'Interest expense', 'Net income per share - diluted']) {
    assert.equal(cleanLabel(label), label);
  }
});

test('falls back to the original rather than rendering a blank row', () => {
  // Cleaning this leaves nothing; a row still has to be called something.
  assert.equal(cleanLabel('(December 31, 2025)'), '(December 31, 2025)');
  assert.equal(cleanLabel(''), '');
  assert.equal(cleanLabel(null), null);
  assert.equal(cleanLabel(42), 42);
});

test('truncateLabel breaks on a word, and only when it has to', () => {
  assert.equal(truncateLabel('Total assets'), 'Total assets');
  assert.equal(
    truncateLabel('Income (Loss) from Continuing Operations before Equity Method Investments'),
    'Income (Loss) from Continuing Operations…'
  );
  // A single word longer than the budget has no boundary to honour, so it is
  // cut rather than shrunk to almost nothing.
  assert.equal(truncateLabel('Supercalifragilisticexpialidocious', 10), 'Supercalif…');
});

test('humanizeTag splits camel case and acronyms', () => {
  assert.equal(humanizeTag('InterestAndFeeIncomeLoansAndLeases'), 'Interest And Fee Income Loans And Leases');
  assert.equal(humanizeTag('AOCIMember'), 'AOCI Member');
  assert.equal(humanizeTag(''), '');
});

test('resolveLabels names the concept only where cleaning caused a collision', () => {
  assert.deepEqual(
    resolveLabels([
      { label: 'Securities (fair value of $1,234 and $5,678)', tag: 'HeldToMaturitySecurities' },
      { label: 'Securities (fair value of $9,000 and $8,000)', tag: 'AvailableForSaleSecurities' },
      { label: 'Total assets', tag: 'Assets' },
    ]),
    [
      'Securities (Held To Maturity Securities)',
      'Securities (Available For Sale Securities)',
      'Total assets',
    ]
  );
});

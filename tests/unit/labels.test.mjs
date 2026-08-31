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

test('a comparative reads the same written date-first', () => {
  // Every rule was built around "figure at date". Filers who write the pin the
  // other way round went untouched, or worse, had the date half swept and the
  // figure left behind.
  assert.equal(
    cleanLabel('Treasury Stock, at Cost (Shares: December 31, 2025 - 19,054,555 and December 31, 2024 - 19,003,609)'),
    'Treasury Stock, at Cost'
  );
  assert.equal(
    cleanLabel('Loans, net of allowance for credit losses March 31, 2026 $56,601; December 31, 2025 $58,204'),
    'Loans, net of allowance for credit losses'
  );
  assert.equal(
    cleanLabel('Unearned common stock held by employee stock ownership plan (unallocated shares September 30, 2025: 50,133: September 30, 2024: 53,989)'),
    'Unearned common stock held by employee stock ownership plan'
  );
});

test('a pinning word is optional when the date is unambiguous', () => {
  assert.equal(
    cleanLabel('Treasury stock - 816,351 shares 12/31/25 and 864,889 shares 12/31/24'),
    'Treasury stock'
  );
  // ...and the two halves may be strung together with no joining word at all.
  assert.equal(
    cleanLabel('Common stock, $.01 par value; 50,000,000 shares authorized March 31, 2026 - 20,564,719 shares issued and outstanding March 31, 2025 - 20,976,200 shares issued and outstanding'),
    'Common stock, $.01 par value; 50,000,000 shares authorized'
  );
});

test('a bare year next to a figure is not a date pin', () => {
  // Adjacency counts as a pin only for a full date. "2025" here names a plan.
  assert.equal(
    cleanLabel('Common stock issued under the 2025 Equity Incentive Plan'),
    'Common stock issued under the 2025 Equity Incentive Plan'
  );
});

test('reads one level of nested parentheses', () => {
  // Matching only flat groups tested the inner "(ALLL)" on its own, never
  // tested the outer group at all, and let the inline sweep hollow it out.
  assert.equal(
    cleanLabel('Loans held-for-investment (net of allowance for loan and lease losses (ALLL) of $809,773 and $702,052)'),
    'Loans held-for-investment'
  );
  // A footnote marker is not a figure worth keeping a clause for.
  assert.equal(
    cleanLabel('Loans held for sale (includes $514 and $214 measured at fair value (1))'),
    'Loans held for sale'
  );
});

test('a negative in accounting parentheses is a figure', () => {
  assert.equal(
    cleanLabel('Subordinated debentures (includes $0, $0, and $(151) accumulated other comprehensive income reclassification for change in fair value of interest rate swaps)'),
    'Subordinated debentures'
  );
});

test('a scaled comparative is not cut in half', () => {
  // "$3.5 billion and $3.6 billion" once left "(includes .6 billion pledged
  // to creditors)" on JPM's balance sheet.
  assert.equal(
    cleanLabel('Trading assets (includes $3.5 billion and $3.6 billion pledged to creditors)'),
    'Trading assets'
  );
});

test('undoes the quoting SEC puts round a field containing a quote', () => {
  // The datasets are tab-separated, so this quoting protects nothing -- but
  // the parser split on tabs and left it in, and 208 rows displayed it.
  assert.equal(
    cleanLabel('"Bank-owned life insurance (""BOLI"")"'),
    'Bank-owned life insurance ("BOLI")'
  );
  assert.equal(
    cleanLabel('"Federal Home Loan Bank of New York (""FHLBNY"") stock, at cost"'),
    'Federal Home Loan Bank of New York ("FHLBNY") stock, at cost'
  );
});

test('a bare year pinned to a figure is a period reference', () => {
  assert.equal(
    cleanLabel('Treasury stock - at cost, 39,201,844 shares (2024 - 34,708,169)'),
    'Treasury stock - at cost, 39,201,844 shares'
  );
  assert.equal(
    cleanLabel('Treasury stock, at cost; (2026 - 2,240,560 common shares; 2025 - 2,249,417 common shares)'),
    'Treasury stock, at cost'
  );
  // ...but a year with no figure pinned to it still names a plan.
  assert.equal(
    cleanLabel('Common stock issued under the 2025 Equity Incentive Plan'),
    'Common stock issued under the 2025 Equity Incentive Plan'
  );
});

test('a date may omit the space after its comma', () => {
  assert.equal(
    cleanLabel('Securities available-for-sale, at fair value (amortized cost at March 31,2026- $1,777,262, December 31,2025 - $1,516,376)'),
    'Securities available-for-sale, at fair value'
  );
});

test('a currency sign with no figure is not a figure', () => {
  // Filers write a nil as "$-", and one writes a bare "$" for a period with
  // nothing to report. Left in place the stray sign breaks the series around
  // it, and the clause survives half-stripped.
  assert.equal(
    cleanLabel('Investment securities held-to-maturity, at amortized cost, net of allowance for credit losses of $- and $-, (fair value 2025 - $449)'),
    'Investment securities held-to-maturity, at amortized cost, net of allowance for credit losses'
  );
  // A real figure keeps its sign in every shape it is written.
  assert.equal(
    cleanLabel('Common stock, $.01 par value; 500,000,000 shares authorized'),
    'Common stock, $.01 par value; 500,000,000 shares authorized'
  );
  assert.equal(cleanLabel('Preferred stock, $25 liquidation preference'), 'Preferred stock, $25 liquidation preference');
});

test('a semicolon before "and" still separates a list', () => {
  // With the pair rule matching exactly two figures, the engine took the LAST
  // two of "$223; $42; and $(16)" and left "of $223" on the page.
  assert.equal(
    cleanLabel('Change in net unrealized (loss) gain on securities available for sale, net of tax of $223; $42; and $(16), respectively'),
    'Change in net unrealized (loss) gain on securities available for sale, net of tax'
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

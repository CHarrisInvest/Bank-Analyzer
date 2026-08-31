/**
 * Statement grouping.
 *
 * SEC's data carries line order but no hierarchy, so sections are inferred
 * from the caption. The two failure modes are inventing sections that are not
 * there (61% of rows were once headers) and keying two groups alike.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { detectSection, groupItemsIntoSections, selectStatementRows } from '../../src/utils/statementLayout.js';

test('a heading names a group; a line item that starts the same way does not', () => {
  assert.equal(detectSection({ label: 'Assets' }), true);
  assert.equal(detectSection({ label: 'Interest expense' }), true);
  assert.equal(detectSection({ label: 'Interest expense on deposits' }), false);
  assert.equal(detectSection({ label: '' }), false);
});

test('a Total or Net row closes a group rather than opening one', () => {
  assert.equal(detectSection({ label: 'Total assets' }), false);
  assert.equal(detectSection({ label: 'Net interest income' }), false);
});

test('the tag is never consulted', () => {
  // Nearly every income-statement tag contains Income, Expense or Interest,
  // which is how "Loans" became a section header.
  assert.equal(detectSection({ label: 'Loans', tag: 'InterestAndFeeIncomeLoansAndLeases' }), false);
});

test('the displayed label decides, not the raw one', () => {
  assert.equal(detectSection({ label: 'Assets, net of x at December 31, 2025', displayLabel: 'Assets' }), true);
});

test('rows before the first header form one group, not one group each', () => {
  const sections = groupItemsIntoSections([{ label: 'Cash' }, { label: 'Loans' }, { label: 'Premises' }]);
  assert.equal(sections.length, 1);
  assert.equal(sections[0].header, null);
  assert.equal(sections[0].children.length, 3);
});

test('a header with no rows under it is demoted back to an ordinary row', () => {
  const sections = groupItemsIntoSections([{ label: 'Cash' }, { label: 'Assets' }]);
  assert.equal(sections.length, 1);
  assert.equal(sections[0].header, null);
  assert.deepEqual(sections[0].children.map(c => c.item.label), ['Cash', 'Assets']);
});

test('every section is keyed uniquely', () => {
  // JPM's income statement produces two unheaded groups: the rows before the
  // first heading, and a demoted childless heading after it. They used to
  // share the id, which is both the React key and the collapse-state key.
  const sections = groupItemsIntoSections([
    { label: 'Cash' },
    { label: 'Assets' },
    { label: 'Loans' },
    { label: 'Liabilities' },
  ]);
  const ids = sections.map(s => s.id);
  assert.equal(new Set(ids).size, ids.length, `duplicate section ids: ${ids.join(', ')}`);
  assert.deepEqual(
    sections.map(s => [s.header?.label ?? null, s.children.map(c => c.item.label)]),
    [[null, ['Cash']], ['Assets', ['Loans']], [null, ['Liabilities']]]
  );
});

test('a row with no figure in any period is not a row', () => {
  const kept = selectStatementRows([
    { tag: 'Assets', values: [100, 200] },
    { tag: 'Ghost', values: [null, null] },
  ]);
  assert.deepEqual(kept.map(r => r.tag), ['Assets']);
});

test('a row valued zero in every period is a note reference, not a figure', () => {
  // "Commitments and contingencies (refer to Notes 22, 23 and 24)" rendered as
  // a column of $0, which reads as a measured zero rather than as an absence.
  const kept = selectStatementRows([
    { tag: 'Assets', values: [100, 200] },
    { tag: 'CommitmentsAndContingencies', values: [0, 0] },
    { tag: 'PreferredStockValue', values: [0, null] },
    { tag: 'RealZeroThisPeriod', values: [0, 500] },
  ]);
  assert.deepEqual(kept.map(r => r.tag), ['Assets', 'RealZeroThisPeriod']);
});

test('share counts below the footing total belong to the parenthetical schedule', () => {
  const kept = selectStatementRows([
    { tag: 'CommonStockSharesIssued', values: [28_205_674, 28_205_674] },   // above: keep
    { tag: 'Assets', values: [100, 200] },
    { tag: 'LiabilitiesAndStockholdersEquity', values: [100, 200] },
    { tag: 'CommonStockSharesAuthorized', values: [40_000_000, 40_000_000] },
    { tag: 'CommonStockParOrStatedValuePerShare', values: [0.01, 0.01] },
    { tag: 'MinorityInterest', values: [42_900_000, 43_100_000] },          // below, but real
  ]);
  assert.deepEqual(
    kept.map(r => r.tag),
    ['CommonStockSharesIssued', 'Assets', 'LiabilitiesAndStockholdersEquity', 'MinorityInterest']
  );
});

test('a line re-tagged mid-history is one row, not two half-empty ones', () => {
  // ABCB reports "Provision for unfunded commitments" under one concept for
  // FY2025-24 and another for FY2023-22.
  const kept = selectStatementRows([
    { tag: 'OffBalanceSheetCreditLossLiabilityCreditLossExpenseReversal', label: 'Provision for unfunded commitments', values: [22.8, -11.0, null, null] },
    { tag: 'FinancingReceivableCreditLossUnfundedCommitmentsExpenseReversal', label: 'Provision for unfunded commitments', values: [null, null, -10.9, 19.2] },
  ]);
  assert.equal(kept.length, 1);
  assert.deepEqual(kept[0].values, [22.8, -11.0, -10.9, 19.2]);
  // The row keeps the concept the filer uses now -- periods run newest first.
  assert.equal(kept[0].tag, 'OffBalanceSheetCreditLossLiabilityCreditLossExpenseReversal');
  assert.equal(kept[0].mergedTags.length, 2);
});

test('two concepts reported in the same period stay two rows', () => {
  // ABCB's "Provision for credit losses" is two different lines: same recent
  // years, genuinely different older ones. Merging would destroy one.
  const kept = selectStatementRows([
    { tag: 'ProvisionForLoanLeaseAndOtherLosses', label: 'Provision for credit losses', values: [70.2, 58.8, 153.5, 52.6] },
    { tag: 'AllowanceForCreditLossExpenseReversal', label: 'Provision for credit losses', values: [70.2, 58.8, 142.7, 71.7] },
  ]);
  assert.equal(kept.length, 2);
  assert.ok(!kept.some(r => r.mergedTags));
});

test('a shared caption is not enough when the concepts disagree', () => {
  // BANC's balance sheet gives "Bank owned life insurance" to both the life
  // insurance concept and the other-real-estate one. Coverage is disjoint, so
  // only the concepts themselves say these are two lines.
  const kept = selectStatementRows([
    { tag: 'BankOwnedLifeInsurance', label: 'Bank owned life insurance', values: [100, 98, null, null] },
    { tag: 'OtherRealEstateAndForeclosedAssets', label: 'Bank owned life insurance', values: [null, null, 37, 40] },
  ]);
  assert.equal(kept.length, 2);
});

test('the same concept in a different case is the same concept', () => {
  // EWBC files both DepositAccountFees and Depositaccountfees.
  const kept = selectStatementRows([
    { tag: 'DepositAccountFees', label: 'Deposit account fees', values: [10, 11, null] },
    { tag: 'Depositaccountfees', label: 'Deposit account fees', values: [null, null, 9] },
  ]);
  assert.equal(kept.length, 1);
  assert.deepEqual(kept[0].values, [10, 11, 9]);
});

test('indices survive grouping, so cells still line up with their period', () => {
  const items = [{ label: 'Cash' }, { label: 'Assets' }, { label: 'Loans' }];
  const sections = groupItemsIntoSections(items);
  assert.equal(sections[1].headerIdx, 1);
  assert.equal(sections[1].children[0].idx, 2);
});

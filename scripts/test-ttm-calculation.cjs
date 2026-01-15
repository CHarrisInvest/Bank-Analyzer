#!/usr/bin/env node
/**
 * TTM Calculation Unit Tests
 *
 * Tests the getTTMValue function to ensure correct behavior when:
 * - 10-K filings contain quarterly data (Q4)
 * - Mixed filing types (10-K + 10-Q) contribute quarterly data
 * - Annual fallback is correctly applied
 *
 * Run: node scripts/test-ttm-calculation.cjs
 */

const assert = require('assert');
const { getTTMValue, getAveragePointInTime } = require('./fetch-sec-fs-datasets.cjs');

// Test utilities
let testsRun = 0;
let testsPassed = 0;
let testsFailed = 0;

function test(name, fn) {
  testsRun++;
  try {
    fn();
    testsPassed++;
    console.log(`  ✓ ${name}`);
  } catch (error) {
    testsFailed++;
    console.log(`  ✗ ${name}`);
    console.log(`    Error: ${error.message}`);
  }
}

function assertEqual(actual, expected, message = '') {
  if (actual !== expected) {
    throw new Error(`${message}\n    Expected: ${expected}\n    Actual: ${actual}`);
  }
}

function assertDeepEqual(actual, expected, message = '') {
  const actualStr = JSON.stringify(actual, null, 2);
  const expectedStr = JSON.stringify(expected, null, 2);
  if (actualStr !== expectedStr) {
    throw new Error(`${message}\n    Expected: ${expectedStr}\n    Actual: ${actualStr}`);
  }
}

// ============================================================================
// TEST DATA HELPERS
// ============================================================================

/**
 * Create a quarterly data point
 */
function createQuarter(value, endDate, form = '10-Q') {
  return {
    value,
    ddate: endDate,
    qtrs: 1,  // Quarterly period length
    form,
    fy: endDate.slice(0, 4),
    fp: `Q${Math.ceil(parseInt(endDate.slice(4, 6)) / 3)}`,
    filed: endDate,
    period: endDate
  };
}

/**
 * Create an annual data point
 */
function createAnnual(value, endDate, form = '10-K') {
  return {
    value,
    ddate: endDate,
    qtrs: 4,  // Annual period length
    form,
    fy: endDate.slice(0, 4),
    fp: 'FY',
    filed: endDate,
    period: endDate
  };
}

/**
 * Create a point-in-time balance sheet data point
 */
function createPointInTime(value, endDate, form = '10-Q') {
  const year = endDate.slice(0, 4);
  const month = parseInt(endDate.slice(4, 6));
  const fp = month <= 3 ? 'Q1' : month <= 6 ? 'Q2' : month <= 9 ? 'Q3' : 'Q4';
  return {
    value,
    ddate: endDate,
    qtrs: 0,  // Point-in-time (balance sheet)
    form,
    fy: year,
    fp: form === '10-K' ? 'FY' : fp,
    filed: endDate,
    period: endDate
  };
}

// ============================================================================
// TEST SUITES
// ============================================================================

console.log('\n═══════════════════════════════════════════════════════════════════════════════');
console.log('TTM CALCULATION UNIT TESTS');
console.log('═══════════════════════════════════════════════════════════════════════════════\n');

// ---------------------------------------------------------------------------
// Test Suite 1: Basic Quarterly TTM (4 quarters from 10-Q filings)
// ---------------------------------------------------------------------------
console.log('1. Basic Quarterly TTM (4 quarters from 10-Q filings)');

test('Sum 4 quarters from 10-Q filings', () => {
  const data = [
    createQuarter(100, '20250331'),  // Q1 2025
    createQuarter(120, '20250630'),  // Q2 2025
    createQuarter(130, '20250930'),  // Q3 2025
    createQuarter(150, '20251231'),  // Q4 2025
  ];

  const result = getTTMValue(data);

  assertEqual(result.value, 500, 'TTM should sum all 4 quarters');
  assertEqual(result.method, 'sum-4Q', 'Method should be sum-4Q');
  assertEqual(result.date, '20251231', 'Date should be most recent quarter');
  assertEqual(result.details.length, 4, 'Should include 4 quarters in details');
});

test('Sum 4 quarters when more than 4 are available', () => {
  const data = [
    createQuarter(80, '20241231'),   // Q4 2024 (older)
    createQuarter(100, '20250331'),  // Q1 2025
    createQuarter(120, '20250630'),  // Q2 2025
    createQuarter(130, '20250930'),  // Q3 2025
    createQuarter(150, '20251231'),  // Q4 2025
  ];

  const result = getTTMValue(data);

  // Should use most recent 4: Q1+Q2+Q3+Q4 2025 = 500
  assertEqual(result.value, 500, 'Should sum most recent 4 quarters');
  assertEqual(result.details.length, 4, 'Should only include 4 quarters');
});

// ---------------------------------------------------------------------------
// Test Suite 2: 10-K with Quarterly Contexts (CRITICAL BUG FIX)
// ---------------------------------------------------------------------------
console.log('\n2. 10-K with Quarterly Contexts (CRITICAL BUG FIX)');

test('Q4 from 10-K filing should be included in quarterly sum', () => {
  // This is the critical bug scenario:
  // Q4 data comes from a 10-K filing (qtrs=1, form='10-K')
  // TTM should still sum all 4 quarters
  const data = [
    createQuarter(100, '20250331', '10-Q'),  // Q1 2025 from 10-Q
    createQuarter(120, '20250630', '10-Q'),  // Q2 2025 from 10-Q
    createQuarter(130, '20250930', '10-Q'),  // Q3 2025 from 10-Q
    createQuarter(150, '20251231', '10-K'),  // Q4 2025 from 10-K (quarterly data in 10-K!)
  ];

  const result = getTTMValue(data);

  assertEqual(result.value, 500, 'TTM should be Q1+Q2+Q3+Q4 = 500');
  assertEqual(result.method, 'sum-4Q', 'Method should be sum-4Q even with 10-K');
  // Form should indicate mixed sources
  assert.ok(result.form.includes('10-K'), 'Form should include 10-K');
});

test('Quarterly data from 10-K should NOT be confused with annual data', () => {
  // Even if the 10-K also contains annual data (qtrs=4),
  // the quarterly data (qtrs=1) from the same 10-K should be used for TTM
  const data = [
    createQuarter(100, '20250331', '10-Q'),  // Q1 2025
    createQuarter(120, '20250630', '10-Q'),  // Q2 2025
    createQuarter(130, '20250930', '10-Q'),  // Q3 2025
    createQuarter(150, '20251231', '10-K'),  // Q4 2025 (quarterly in 10-K)
    createAnnual(520, '20251231', '10-K'),   // FY 2025 annual (also in same 10-K)
  ];

  const result = getTTMValue(data);

  assertEqual(result.value, 500, 'Should sum quarters (500), NOT use annual (520)');
  assertEqual(result.method, 'sum-4Q', 'Method should be sum-4Q');
});

test('All 4 quarters from 10-K filings should work', () => {
  // Edge case: all quarterly data comes from 10-K filings
  const data = [
    createQuarter(100, '20250331', '10-K'),
    createQuarter(120, '20250630', '10-K'),
    createQuarter(130, '20250930', '10-K'),
    createQuarter(150, '20251231', '10-K'),
  ];

  const result = getTTMValue(data);

  assertEqual(result.value, 500, 'Should sum all quarters regardless of filing type');
  assertEqual(result.method, 'sum-4Q', 'Method should be sum-4Q');
});

// ---------------------------------------------------------------------------
// Test Suite 3: Annual Fallback Behavior
// ---------------------------------------------------------------------------
console.log('\n3. Annual Fallback Behavior');

test('Use annual when no quarterly data exists', () => {
  const data = [
    createAnnual(500, '20251231'),  // FY 2025
  ];

  const result = getTTMValue(data);

  assertEqual(result.value, 500, 'Should use annual value');
  assertEqual(result.method, 'annual', 'Method should be annual');
  assertEqual(result.form, '10-K', 'Form should be 10-K');
});

test('Use annual when fewer than 4 quarters and annual is most recent', () => {
  const data = [
    createQuarter(100, '20250331'),  // Q1 2025
    createQuarter(120, '20250630'),  // Q2 2025
    createQuarter(130, '20250930'),  // Q3 2025
    createAnnual(500, '20251231'),   // FY 2025 (most recent)
  ];

  const result = getTTMValue(data);

  // Only 3 quarters, but annual is most recent -> use annual
  assertEqual(result.value, 500, 'Should use annual when insufficient quarters');
  assertEqual(result.method, 'annual-fallback', 'Method should be annual-fallback');
});

test('Return null when fewer than 4 quarters and no annual', () => {
  const data = [
    createQuarter(100, '20250331'),
    createQuarter(120, '20250630'),
    createQuarter(130, '20250930'),
  ];

  const result = getTTMValue(data);

  // Only 3 quarters, no annual -> cannot compute TTM
  assertEqual(result, null, 'Should return null when cannot compute TTM');
});

test('Do NOT use annual if quarters are more recent', () => {
  const data = [
    createAnnual(400, '20241231'),   // FY 2024 (older)
    createQuarter(110, '20250331'),  // Q1 2025 (more recent)
    createQuarter(120, '20250630'),  // Q2 2025
  ];

  const result = getTTMValue(data);

  // Annual is older than available quarters, insufficient quarters -> null
  assertEqual(result, null, 'Should return null when annual is older and insufficient quarters');
});

// ---------------------------------------------------------------------------
// Test Suite 4: Mixed but Insufficient Quarters (Example 3 from requirements)
// ---------------------------------------------------------------------------
console.log('\n4. Mixed but Insufficient Quarters');

test('Do NOT mix annual and quarterly values', () => {
  // From requirements: Example 3
  // Q3 2025 + FY 2025 -> Should use FY 2025, NOT (FY - Q3 + Q3)
  const data = [
    createQuarter(130, '20250930'),  // Q3 2025
    createAnnual(500, '20251231'),   // FY 2025 (most recent)
  ];

  const result = getTTMValue(data);

  assertEqual(result.value, 500, 'Should use FY 2025, not a mix');
  assertEqual(result.method, 'annual-fallback', 'Method should be annual-fallback');
  assertEqual(result.details.length, 1, 'Should only have 1 detail (annual)');
});

test('With 2 quarters and annual, use annual if most recent', () => {
  const data = [
    createQuarter(100, '20250630'),  // Q2 2025
    createQuarter(130, '20250930'),  // Q3 2025
    createAnnual(500, '20251231'),   // FY 2025 (most recent)
  ];

  const result = getTTMValue(data);

  assertEqual(result.value, 500, 'Should use annual');
  assertEqual(result.method, 'annual-fallback', 'Method should be annual-fallback');
});

// ---------------------------------------------------------------------------
// Test Suite 5: Priority Order (Quarterly-first rule)
// ---------------------------------------------------------------------------
console.log('\n5. Priority Order (Quarterly-first rule)');

test('Always prefer 4 quarters over annual even if annual is more recent filing', () => {
  // Key scenario: 10-K is filed (with annual data), but quarterly data exists
  const data = [
    createQuarter(100, '20250331', '10-Q'),  // Q1 2025
    createQuarter(120, '20250630', '10-Q'),  // Q2 2025
    createQuarter(130, '20250930', '10-Q'),  // Q3 2025
    createQuarter(150, '20251231', '10-K'),  // Q4 2025 (from 10-K)
    createAnnual(520, '20251231', '10-K'),   // FY 2025 annual
  ];

  const result = getTTMValue(data);

  // Quarterly sum (500) should be used, NOT annual (520)
  assertEqual(result.value, 500, 'CRITICAL: Quarterly sum takes precedence');
  assertEqual(result.method, 'sum-4Q', 'Method should be sum-4Q');
});

test('Quarterly sum even when annual has same end date', () => {
  // Both quarterly Q4 and annual FY end on same date
  const data = [
    createQuarter(100, '20250331'),
    createQuarter(120, '20250630'),
    createQuarter(130, '20250930'),
    createQuarter(150, '20251231'),
    createAnnual(500, '20251231'),  // Same end date as Q4
  ];

  const result = getTTMValue(data);

  assertEqual(result.value, 500, 'Should use quarterly sum');
  assertEqual(result.method, 'sum-4Q', 'Method should be sum-4Q');
});

// ---------------------------------------------------------------------------
// Test Suite 6: Edge Cases
// ---------------------------------------------------------------------------
console.log('\n6. Edge Cases');

test('Empty array returns null', () => {
  const result = getTTMValue([]);
  assertEqual(result, null, 'Empty array should return null');
});

test('Null input returns null', () => {
  const result = getTTMValue(null);
  assertEqual(result, null, 'Null input should return null');
});

test('Undefined input returns null', () => {
  const result = getTTMValue(undefined);
  assertEqual(result, null, 'Undefined input should return null');
});

test('Data with invalid form types is ignored', () => {
  const data = [
    createQuarter(100, '20250331', '10-Q'),
    createQuarter(120, '20250630', '10-Q'),
    createQuarter(130, '20250930', '10-Q'),
    createQuarter(150, '20251231', '10-Q'),
    { value: 999, ddate: '20260101', qtrs: 1, form: '8-K' },  // Invalid form
  ];

  const result = getTTMValue(data);

  assertEqual(result.value, 500, 'Should ignore invalid forms');
});

test('Quarterly values are sorted by date correctly', () => {
  // Data provided out of order
  const data = [
    createQuarter(150, '20251231'),  // Q4 2025
    createQuarter(100, '20250331'),  // Q1 2025
    createQuarter(130, '20250930'),  // Q3 2025
    createQuarter(120, '20250630'),  // Q2 2025
  ];

  const result = getTTMValue(data);

  assertEqual(result.value, 500, 'Should correctly sort and sum');
  assertEqual(result.date, '20251231', 'Most recent date should be first');
});

test('Handle negative values correctly', () => {
  // Net income can be negative (losses)
  const data = [
    createQuarter(-50, '20250331'),
    createQuarter(120, '20250630'),
    createQuarter(-30, '20250930'),
    createQuarter(150, '20251231'),
  ];

  const result = getTTMValue(data);

  assertEqual(result.value, 190, 'Should handle negative values: -50+120-30+150=190');
});

test('Handle zero values correctly', () => {
  const data = [
    createQuarter(0, '20250331'),
    createQuarter(120, '20250630'),
    createQuarter(0, '20250930'),
    createQuarter(150, '20251231'),
  ];

  const result = getTTMValue(data);

  assertEqual(result.value, 270, 'Should handle zero values: 0+120+0+150=270');
});

// ---------------------------------------------------------------------------
// Test Suite 7: Real-World Scenarios
// ---------------------------------------------------------------------------
console.log('\n7. Real-World Scenarios');

test('Bank Q4 earnings from 10-K + prior 10-Qs', () => {
  // Typical scenario: Bank reports Q1-Q3 in 10-Qs, then Q4 appears in 10-K
  // Values in millions
  const data = [
    createQuarter(1250000000, '20250331', '10-Q'),   // Q1: $1.25B
    createQuarter(1320000000, '20250630', '10-Q'),   // Q2: $1.32B
    createQuarter(1180000000, '20250930', '10-Q'),   // Q3: $1.18B
    createQuarter(1450000000, '20251231', '10-K'),   // Q4: $1.45B (from 10-K!)
    createAnnual(5200000000, '20251231', '10-K'),    // FY: $5.2B
  ];

  const result = getTTMValue(data);

  // TTM should be sum of quarters: 1.25+1.32+1.18+1.45 = 5.2B
  assertEqual(result.value, 5200000000, 'TTM should sum quarters');
  assertEqual(result.method, 'sum-4Q', 'Should use quarterly method');
  // In this case sum equals annual, but method matters
});

test('New company with only 2 quarters of history', () => {
  // IPO'd mid-year, only has Q3 and Q4 data
  const data = [
    createQuarter(50000000, '20250930', '10-Q'),
    createQuarter(75000000, '20251231', '10-K'),
    // No annual yet, insufficient quarters
  ];

  const result = getTTMValue(data);

  assertEqual(result, null, 'Cannot compute TTM with only 2 quarters and no annual');
});

test('Company with annual report but no quarterly breakdown', () => {
  // Some smaller companies only file annual reports
  const data = [
    createAnnual(10000000, '20251231'),
  ];

  const result = getTTMValue(data);

  assertEqual(result.value, 10000000, 'Should use annual');
  assertEqual(result.method, 'annual', 'Method should be annual');
});

// ===========================================================================
// getAveragePointInTime TESTS
// ===========================================================================
// These tests verify that average calculations for return ratios (ROE, ROAA,
// ROTCE, NIM) work correctly per FFIEC/investor standards.
// ===========================================================================

console.log('\n═══════════════════════════════════════════════════════════════════════════════');
console.log('AVERAGE POINT-IN-TIME TESTS (for ROE, ROAA, ROTCE, NIM)');
console.log('═══════════════════════════════════════════════════════════════════════════════');

// ---------------------------------------------------------------------------
// Test Suite 8: Basic Averaging
// ---------------------------------------------------------------------------
console.log('\n8. Basic Averaging');

test('5-point average with 5 quarters of data', () => {
  // Most common scenario: 5 quarters of balance sheet data
  const data = [
    createPointInTime(100000000000, '20241231', '10-K'),  // Q4 2024: $100B
    createPointInTime(102000000000, '20250331', '10-Q'),  // Q1 2025: $102B
    createPointInTime(104000000000, '20250630', '10-Q'),  // Q2 2025: $104B
    createPointInTime(106000000000, '20250930', '10-Q'),  // Q3 2025: $106B
    createPointInTime(108000000000, '20251231', '10-K'),  // Q4 2025: $108B
  ];

  const result = getAveragePointInTime(data);

  // Average = (100 + 102 + 104 + 106 + 108) / 5 = 104B
  assertEqual(result.average, 104000000000, 'Average should be 104B');
  assertEqual(result.ending, 108000000000, 'Ending should be 108B');
  assertEqual(result.method, '5-point-avg', 'Method should be 5-point-avg');
  assertEqual(result.periodCount, 5, 'Should use 5 periods');
});

test('4-point average with 4 quarters of data', () => {
  const data = [
    createPointInTime(100000000000, '20250331', '10-Q'),
    createPointInTime(104000000000, '20250630', '10-Q'),
    createPointInTime(108000000000, '20250930', '10-Q'),
    createPointInTime(112000000000, '20251231', '10-K'),
  ];

  const result = getAveragePointInTime(data);

  // Average = (100 + 104 + 108 + 112) / 4 = 106B
  assertEqual(result.average, 106000000000, 'Average should be 106B');
  assertEqual(result.ending, 112000000000, 'Ending should be 112B');
  assertEqual(result.method, '4-point-avg', 'Method should be 4-point-avg');
  assertEqual(result.periodCount, 4, 'Should use 4 periods');
});

test('2-point average (minimum for averaging)', () => {
  const data = [
    createPointInTime(100000000000, '20250930', '10-Q'),
    createPointInTime(110000000000, '20251231', '10-K'),
  ];

  const result = getAveragePointInTime(data);

  // Average = (100 + 110) / 2 = 105B
  assertEqual(result.average, 105000000000, 'Average should be 105B');
  assertEqual(result.ending, 110000000000, 'Ending should be 110B');
  assertEqual(result.method, '2-point-avg', 'Method should be 2-point-avg');
  assertEqual(result.periodCount, 2, 'Should use 2 periods');
});

test('Single period returns ending value as average', () => {
  const data = [
    createPointInTime(100000000000, '20251231', '10-K'),
  ];

  const result = getAveragePointInTime(data);

  assertEqual(result.average, 100000000000, 'Average should equal ending');
  assertEqual(result.ending, 100000000000, 'Ending should be 100B');
  assertEqual(result.method, 'single-period', 'Method should be single-period');
  assertEqual(result.periodCount, 1, 'Should use 1 period');
});

// ---------------------------------------------------------------------------
// Test Suite 9: Average Edge Cases
// ---------------------------------------------------------------------------
console.log('\n9. Average Edge Cases');

test('Empty array returns null', () => {
  const result = getAveragePointInTime([]);
  assertEqual(result, null, 'Empty array should return null');
});

test('Null input returns null', () => {
  const result = getAveragePointInTime(null);
  assertEqual(result, null, 'Null input should return null');
});

test('Undefined input returns null', () => {
  const result = getAveragePointInTime(undefined);
  assertEqual(result, null, 'Undefined input should return null');
});

test('Only uses point-in-time data (qtrs=0), ignores quarterly flows', () => {
  // Mix of point-in-time (qtrs=0) and quarterly flows (qtrs=1)
  const data = [
    createPointInTime(100000000000, '20250930', '10-Q'),  // Point-in-time
    createPointInTime(110000000000, '20251231', '10-K'),  // Point-in-time
    createQuarter(5000000000, '20250930', '10-Q'),        // Quarterly flow (should be ignored)
    createQuarter(6000000000, '20251231', '10-K'),        // Quarterly flow (should be ignored)
  ];

  const result = getAveragePointInTime(data);

  // Should only average the point-in-time values
  assertEqual(result.average, 105000000000, 'Should only average point-in-time values');
  assertEqual(result.periodCount, 2, 'Should only count point-in-time periods');
});

test('Sorts by date and uses most recent 5', () => {
  // Data provided out of order with more than 5 periods
  const data = [
    createPointInTime(108000000000, '20251231', '10-K'),  // Most recent
    createPointInTime(100000000000, '20241231', '10-K'),  // Oldest in range
    createPointInTime(104000000000, '20250630', '10-Q'),
    createPointInTime(98000000000, '20240930', '10-Q'),   // Outside 5-period range
    createPointInTime(102000000000, '20250331', '10-Q'),
    createPointInTime(106000000000, '20250930', '10-Q'),
  ];

  const result = getAveragePointInTime(data);

  // Should use most recent 5: Q4'24(100), Q1'25(102), Q2'25(104), Q3'25(106), Q4'25(108)
  // Average = (108 + 106 + 104 + 102 + 100) / 5 = 104B
  assertEqual(result.average, 104000000000, 'Should average most recent 5 periods');
  assertEqual(result.ending, 108000000000, 'Ending should be most recent');
  assertEqual(result.method, '5-point-avg', 'Method should be 5-point-avg');
});

test('Ignores invalid form types', () => {
  const data = [
    createPointInTime(100000000000, '20250930', '10-Q'),
    createPointInTime(110000000000, '20251231', '10-K'),
    { value: 999000000000, ddate: '20260101', qtrs: 0, form: '8-K' },  // Invalid form
  ];

  const result = getAveragePointInTime(data);

  // Should ignore the 8-K form
  assertEqual(result.average, 105000000000, 'Should ignore invalid forms');
  assertEqual(result.periodCount, 2, 'Should only count valid periods');
});

// ---------------------------------------------------------------------------
// Test Suite 10: Averaging Impact on Return Ratios
// ---------------------------------------------------------------------------
console.log('\n10. Averaging Impact on Return Ratios');

test('Growing balance sheet: average lower than ending', () => {
  // Bank with growing assets - average will be lower than ending
  const data = [
    createPointInTime(100000000000, '20241231', '10-K'),  // $100B
    createPointInTime(105000000000, '20250331', '10-Q'),  // $105B
    createPointInTime(110000000000, '20250630', '10-Q'),  // $110B
    createPointInTime(115000000000, '20250930', '10-Q'),  // $115B
    createPointInTime(120000000000, '20251231', '10-K'),  // $120B
  ];

  const result = getAveragePointInTime(data);

  // Average = (100 + 105 + 110 + 115 + 120) / 5 = 110B
  // Ending = 120B
  // For ROAA: TTM NI / Avg Assets gives higher ratio than TTM NI / Ending Assets
  assertEqual(result.average, 110000000000, 'Average should be 110B');
  assertEqual(result.ending, 120000000000, 'Ending should be 120B');
  assert.ok(result.average < result.ending, 'For growing bank, average < ending');
});

test('Shrinking balance sheet: average higher than ending', () => {
  // Bank with shrinking assets - average will be higher than ending
  const data = [
    createPointInTime(120000000000, '20241231', '10-K'),  // $120B
    createPointInTime(115000000000, '20250331', '10-Q'),  // $115B
    createPointInTime(110000000000, '20250630', '10-Q'),  // $110B
    createPointInTime(105000000000, '20250930', '10-Q'),  // $105B
    createPointInTime(100000000000, '20251231', '10-K'),  // $100B
  ];

  const result = getAveragePointInTime(data);

  // Average = (120 + 115 + 110 + 105 + 100) / 5 = 110B
  // Ending = 100B
  // For ROAA: TTM NI / Avg Assets gives lower ratio than TTM NI / Ending Assets
  assertEqual(result.average, 110000000000, 'Average should be 110B');
  assertEqual(result.ending, 100000000000, 'Ending should be 100B');
  assert.ok(result.average > result.ending, 'For shrinking bank, average > ending');
});

test('Stable balance sheet: average equals ending', () => {
  // Bank with stable assets - average will equal ending
  const data = [
    createPointInTime(100000000000, '20241231', '10-K'),
    createPointInTime(100000000000, '20250331', '10-Q'),
    createPointInTime(100000000000, '20250630', '10-Q'),
    createPointInTime(100000000000, '20250930', '10-Q'),
    createPointInTime(100000000000, '20251231', '10-K'),
  ];

  const result = getAveragePointInTime(data);

  assertEqual(result.average, 100000000000, 'Average should equal ending for stable bank');
  assertEqual(result.ending, 100000000000, 'Ending should be 100B');
  assertEqual(result.average, result.ending, 'Average should equal ending');
});

// ---------------------------------------------------------------------------
// Test Suite 11: Mixed 10-K and 10-Q Data
// ---------------------------------------------------------------------------
console.log('\n11. Mixed 10-K and 10-Q Balance Sheet Data');

test('Point-in-time values from both 10-K and 10-Q filings', () => {
  // Balance sheet values can come from either filing type
  const data = [
    createPointInTime(100000000000, '20241231', '10-K'),  // From 10-K
    createPointInTime(102000000000, '20250331', '10-Q'),  // From 10-Q
    createPointInTime(104000000000, '20250630', '10-Q'),  // From 10-Q
    createPointInTime(106000000000, '20250930', '10-Q'),  // From 10-Q
    createPointInTime(108000000000, '20251231', '10-K'),  // From 10-K
  ];

  const result = getAveragePointInTime(data);

  // Should treat all point-in-time values equally regardless of filing type
  assertEqual(result.average, 104000000000, 'Should average all point-in-time values');
  assertEqual(result.periodCount, 5, 'Should include all 5 periods');
});

// ---------------------------------------------------------------------------
// Summary
// ---------------------------------------------------------------------------
console.log('\n═══════════════════════════════════════════════════════════════════════════════');
console.log('TEST SUMMARY');
console.log('═══════════════════════════════════════════════════════════════════════════════');
console.log(`Total tests: ${testsRun}`);
console.log(`Passed: ${testsPassed}`);
console.log(`Failed: ${testsFailed}`);
console.log('═══════════════════════════════════════════════════════════════════════════════\n');

if (testsFailed > 0) {
  console.log('❌ TESTS FAILED');
  process.exit(1);
} else {
  console.log('✅ ALL TESTS PASSED');
  process.exit(0);
}

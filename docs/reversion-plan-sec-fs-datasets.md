# Reversion Plan: SEC Financial Statement Data Sets

## Overview

This document contains the complete code and logic needed to revert from the SEC Company Facts API back to the SEC Financial Statement Data Sets approach if issues arise.

**When to Revert:**
- API rate limiting or access issues
- Data quality problems with API approach
- Missing consolidated entity filtering
- Performance issues with bulk download

**Reversion Time:** ~15 minutes

---

## Quick Reversion Steps

1. Create the script file:
   ```bash
   # Copy the code from "Full Script Code" section below to:
   scripts/fetch-sec-fs-datasets.cjs
   ```

2. Download SEC data:
   ```bash
   # Download quarterly ZIP files from SEC:
   # https://www.sec.gov/data-research/sec-markets-data/financial-statement-data-sets
   # Place in .sec-data-cache/ as 2025q4.zip, 2025q3.zip, etc.
   ```

3. Run the script:
   ```bash
   node scripts/fetch-sec-fs-datasets.cjs
   ```

4. Update GitHub Actions workflow to use the old script

---

## Key Differences: FS Data Sets vs Company Facts API

| Aspect | SEC FS Data Sets | Company Facts API |
|--------|------------------|-------------------|
| Data Source | Quarterly ZIP files | Per-company JSON or bulk ZIP |
| DEI Namespace | NOT included | Included |
| coreg/segment | Explicit filtering | Implicit (pre-filtered) |
| Period Length (qtrs) | Explicit field | Inferred from fp/dates |
| Consolidated Data | Filter: coreg=NULL, segments=NULL | Default behavior |
| Update Frequency | Quarterly ZIPs | Real-time |

---

## Critical Logic to Preserve

### 1. Consolidated Entity Filtering (coreg/segment)

The SEC Financial Statement Data Sets include subsidiary and segment breakdowns. **CRITICAL:** Filter for consolidated totals only:

```javascript
// CRITICAL: coreg indicates co-registrant/subsidiary, segments indicates dimensional breakdown
// We want only consolidated entity data (both must be empty)
const bankNumData = numData.filter(num => {
  const isConsolidated = !num.coreg || num.coreg.trim() === '';
  const isNotSegment = !num.segments || num.segments.trim() === '';
  return isConsolidated && isNotSegment;
});
```

### 2. Period Length (qtrs field)

The `qtrs` field is critical for distinguishing data types:
- `qtrs=0` → Point-in-time (balance sheet items)
- `qtrs=1` → Quarterly period (Q1, Q2, Q3 income)
- `qtrs=4` → Annual period (10-K or TTM)

```javascript
// Filter for point-in-time values (qtrs = 0) from 10-K or 10-Q
const pointInTime = conceptData
  .filter(d => d.qtrs === 0 && (d.form === '10-K' || d.form === '10-Q'))
  .sort((a, b) => b.ddate.localeCompare(a.ddate));
```

### 3. TTM Calculation Rules

**Rule A (Quarterly-first):** If 4+ quarterly periods exist, sum the most recent 4.
**Rule B (Annual fallback):** Only use annual value if fewer than 4 quarterly periods exist AND the annual period is more recent.
**NEVER mix annual and quarterly values.**

```javascript
function getTTMValue(conceptData) {
  // Separate quarterly (qtrs=1) from annual (qtrs=4) based on period length ONLY
  const quarterlyValues = sorted.filter(d => d.qtrs === 1);
  const annualValues = sorted.filter(d => d.qtrs === 4);

  // Rule A: If we have 4+ quarterly periods, ALWAYS sum the most recent 4
  if (quarterlyValues.length >= 4) {
    const topQuarters = quarterlyValues.slice(0, 4);
    const ttmValue = topQuarters.reduce((sum, q) => sum + q.value, 0);
    return { value: ttmValue, method: 'sum-4Q', ... };
  }

  // Rule B: Annual fallback - use if no quarterly or annual is more recent
  if (annualValues.length > 0) {
    const mostRecentAnnual = annualValues[0];
    const mostRecentQuarter = quarterlyValues[0];
    if (!mostRecentQuarter || mostRecentAnnual.ddate >= mostRecentQuarter.ddate) {
      return { value: mostRecentAnnual.value, method: 'annual-fallback', ... };
    }
  }

  return null;  // Cannot compute valid TTM
}
```

### 4. FFIEC 5-Point Averaging

Return ratios (ROE, ROAA) use 5-point average of balance sheet values per FFIEC UBPR methodology:

```javascript
function getAveragePointInTime(conceptData) {
  const pointInTime = conceptData
    .filter(d => d.qtrs === 0 && (d.form === '10-K' || d.form === '10-Q'))
    .sort((a, b) => b.ddate.localeCompare(a.ddate));

  // Use up to 5 periods for averaging (current + 4 prior quarters)
  const periodsToUse = pointInTime.slice(0, 5);
  const sum = periodsToUse.reduce((acc, d) => acc + d.value, 0);
  const average = sum / periodsToUse.length;

  return { average, ending: pointInTime[0].value, method: '5-point-avg', ... };
}
```

### 5. XBRL Tag Fallback Chains

Multiple XBRL concepts may represent the same data point. Use fallback chains:

```javascript
// Equity - try standard, fallback to including non-controlling interest
const equity = getLatestPointInTime(concepts['StockholdersEquity']) ||
               getLatestPointInTime(concepts['StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest']);

// Shares - try DEI cover page (primary), fallback to balance sheet
const sharesData = getSharesOutstanding(concepts['EntityCommonStockSharesOutstanding']) ||
                   getSharesOutstanding(concepts['CommonStockSharesOutstanding']);

// Net Income - multiple possible concepts
const netIncome = getTTMValue(concepts['NetIncomeLoss']) ||
                  getTTMValue(concepts['ProfitLoss']) ||
                  getTTMValue(concepts['NetIncomeLossAvailableToCommonStockholdersBasic']);
```

### 6. Data Quality Validation

Null out values outside reasonable ranges:

```javascript
const outlierThresholds = {
  efficiencyRatio: { min: 20, max: 150, unit: '%' },
  depositsToAssets: { min: 10, max: 100, unit: '%' },
  equityToAssets: { min: 1, max: 50, unit: '%' },
  roe: { min: -100, max: 100, unit: '%' },
  roaa: { min: -10, max: 10, unit: '%' },
};
```

---

## XBRL Concepts Extracted

### Balance Sheet - Assets
- `Assets`
- `CashAndCashEquivalentsAtCarryingValue`
- `CashAndDueFromBanks`
- `LoansAndLeasesReceivableNetReportedAmount`
- `LoansAndLeasesReceivableNetOfDeferredIncome`
- `FinancingReceivableExcludingAccruedInterestAfterAllowanceForCreditLoss`
- `NotesReceivableNet`

### Balance Sheet - Liabilities & Equity
- `Liabilities`
- `Deposits`
- `DepositsDomestic`
- `StockholdersEquity`
- `StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest`
- `LiabilitiesAndStockholdersEquity`
- `PreferredStockValue`
- `PreferredStockValueOutstanding`
- `EntityCommonStockSharesOutstanding` (DEI namespace - NOT in FS Data Sets)
- `CommonStockSharesOutstanding`

### Income Statement
- `InterestIncome`
- `InterestAndDividendIncomeOperating`
- `InterestExpense`
- `InterestIncomeExpenseNet`
- `NetInterestIncome`
- `NoninterestIncome`
- `NoninterestExpense`
- `OperatingExpenses`
- `ProvisionForLoanLeaseAndOtherLosses`
- `ProvisionForLoanAndLeaseLosses`
- `ProvisionForCreditLosses`
- `IncomeLossFromContinuingOperationsBeforeIncomeTaxesExtraordinaryItemsNoncontrollingInterest`
- `IncomeLossFromContinuingOperationsBeforeIncomeTaxes`
- `NetIncomeLoss`
- `ProfitLoss`
- `NetIncomeLossAvailableToCommonStockholdersBasic`
- `EarningsPerShareBasic`
- `EarningsPerShareDiluted`
- `Revenues`
- `RevenueFromContractWithCustomerExcludingAssessedTax`

### Cash Flow
- `NetCashProvidedByUsedInOperatingActivities`
- `PaymentsOfDividendsCommonStock`
- `PaymentsOfDividends`

### Dividends
- `CommonStockDividendsPerShareDeclared`
- `CommonStockDividendsPerShareCashPaid`

---

## Full Script Code

Save this to `scripts/fetch-sec-fs-datasets.cjs`:

```javascript
#!/usr/bin/env node
/**
 * SEC Financial Statement Data Sets Processor
 *
 * Processes the official SEC Financial Statement Data Sets from local ZIP files.
 * ZIP files are downloaded from GitHub Release assets (not directly from SEC).
 * See: https://www.sec.gov/data-research/sec-markets-data/financial-statement-data-sets
 *
 * These datasets contain ONLY data from primary financial statements (Balance Sheet,
 * Income Statement, Cash Flow Statement) as rendered by the SEC - ensuring maximum
 * accuracy and comparability.
 *
 * Data Files in ZIP:
 * - sub.txt: Submission metadata (CIK, company name, filing info)
 * - num.txt: Numeric data (tag, value, date, quarters, coreg, segments)
 * - tag.txt: Tag definitions
 * - pre.txt: Presentation data
 *
 * IMPORTANT: The num.txt file contains multiple values for the same concept:
 * - Consolidated entity data (coreg=NULL, segments=NULL) - THIS IS WHAT WE WANT
 * - Co-registrant/subsidiary data (coreg=non-NULL)
 * - Segment breakdown data (segments=non-NULL)
 *
 * We filter for coreg=NULL AND segments=NULL to get consolidated totals only.
 * See: https://www.sec.gov/files/financial-statement-data-sets.pdf
 *
 * Output:
 * - public/data/banks.json: Calculated metrics (existing format)
 * - public/data/sec-raw-data.json: Raw SEC values for audit trail
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

// Parse command line arguments
const args = process.argv.slice(2);
const HELP = args.includes('--help') || args.includes('-h');

// Configuration
const CONFIG = {
  // How many quarters of data to fetch (for TTM calculation we need at least 4)
  quartersToFetch: 5,

  // Bank SIC codes
  bankSicCodes: ['6021', '6022', '6029', '6020'],

  // XBRL concepts to extract (Primary Financial Statement concepts only)
  conceptsToExtract: [
    // Balance Sheet - Assets
    'Assets',
    'CashAndCashEquivalentsAtCarryingValue',
    'CashAndDueFromBanks',
    'LoansAndLeasesReceivableNetReportedAmount',
    'LoansAndLeasesReceivableNetOfDeferredIncome',
    'FinancingReceivableExcludingAccruedInterestAfterAllowanceForCreditLoss',
    'NotesReceivableNet',

    // Balance Sheet - Liabilities & Equity
    'Liabilities',
    'Deposits',
    'DepositsDomestic',
    'StockholdersEquity',
    'StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest',
    'LiabilitiesAndStockholdersEquity',
    'PreferredStockValue',
    'PreferredStockValueOutstanding',
    'EntityCommonStockSharesOutstanding',
    'CommonStockSharesOutstanding',

    // Income Statement
    'InterestIncome',
    'InterestAndDividendIncomeOperating',
    'InterestExpense',
    'InterestIncomeExpenseNet',
    'NetInterestIncome',
    'NoninterestIncome',
    'NoninterestExpense',
    'OperatingExpenses',
    'ProvisionForLoanLeaseAndOtherLosses',
    'ProvisionForLoanAndLeaseLosses',
    'ProvisionForCreditLosses',
    'IncomeLossFromContinuingOperationsBeforeIncomeTaxesExtraordinaryItemsNoncontrollingInterest',
    'IncomeLossFromContinuingOperationsBeforeIncomeTaxes',
    'NetIncomeLoss',
    'ProfitLoss',
    'NetIncomeLossAvailableToCommonStockholdersBasic',
    'EarningsPerShareBasic',
    'EarningsPerShareDiluted',
    'Revenues',
    'RevenueFromContractWithCustomerExcludingAssessedTax',

    // Cash Flow
    'NetCashProvidedByUsedInOperatingActivities',
    'PaymentsOfDividendsCommonStock',
    'PaymentsOfDividends',

    // Dividends
    'CommonStockDividendsPerShareDeclared',
    'CommonStockDividendsPerShareCashPaid',
  ],

  // Outlier thresholds for data quality
  outlierThresholds: {
    efficiencyRatio: { min: 20, max: 150, unit: '%' },
    depositsToAssets: { min: 10, max: 100, unit: '%' },
    equityToAssets: { min: 1, max: 50, unit: '%' },
    roe: { min: -100, max: 100, unit: '%' },
    roaa: { min: -10, max: 10, unit: '%' },
  },
};

// Temp directory for downloaded files
const TEMP_DIR = path.join(__dirname, '..', '.sec-data-cache');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'data');

/**
 * Extract ZIP file using system unzip command
 */
function extractZip(zipPath, destDir) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  try {
    execSync(`unzip -o "${zipPath}" -d "${destDir}"`, { stdio: 'pipe' });
    return true;
  } catch (error) {
    console.error(`  Error extracting ${zipPath}:`, error.message);
    return false;
  }
}

/**
 * Parse TSV file (tab-separated values) using streaming for large files
 */
async function parseTsvFile(filePath, filterFn = null) {
  if (!fs.existsSync(filePath)) {
    console.warn(`  File not found: ${filePath}`);
    return [];
  }

  return new Promise((resolve, reject) => {
    const rows = [];
    let headers = null;
    let lineCount = 0;

    const rl = readline.createInterface({
      input: fs.createReadStream(filePath, { encoding: 'utf8' }),
      crlfDelay: Infinity
    });

    rl.on('line', (line) => {
      if (!line.trim()) return;

      lineCount++;
      const values = line.split('\t');

      if (!headers) {
        headers = values.map(h => h.trim().toLowerCase());
        return;
      }

      const row = {};
      headers.forEach((header, idx) => {
        row[header] = values[idx]?.trim() || '';
      });

      if (filterFn && !filterFn(row)) {
        return;
      }

      rows.push(row);
    });

    rl.on('close', () => {
      resolve(rows);
    });

    rl.on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * Load bank list to get CIKs
 */
function loadBankList() {
  const bankListPath = path.join(OUTPUT_DIR, 'bank-list.json');

  if (!fs.existsSync(bankListPath)) {
    console.error('Bank list not found. Run discover-banks.cjs first.');
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(bankListPath, 'utf8'));
  return data.banks || [];
}

/**
 * Process a quarterly dataset from local ZIP file
 */
async function processQuarterlyDataset(datasetInfo, bankCiks) {
  const { period, zipPath } = datasetInfo;

  if (!zipPath || !fs.existsSync(zipPath)) {
    console.error(`  ZIP file not found: ${zipPath}`);
    return null;
  }

  const extractDir = path.join(TEMP_DIR, period);

  console.log(`\nProcessing ${period}...`);
  console.log(`  Using: ${zipPath}`);

  if (!fs.existsSync(extractDir) || !fs.existsSync(path.join(extractDir, 'num.txt'))) {
    console.log(`  Extracting...`);
    if (!extractZip(zipPath, extractDir)) {
      return null;
    }
  }

  console.log(`  Parsing sub.txt...`);
  const subData = await parseTsvFile(path.join(extractDir, 'sub.txt'));
  console.log(`    Found ${subData.length} submissions`);

  const bankSubmissions = subData.filter(sub => {
    const cik = sub.cik?.padStart(10, '0');
    return bankCiks.has(cik);
  });
  console.log(`    Matched ${bankSubmissions.length} bank submissions`);

  const bankAdshs = new Set(bankSubmissions.map(s => s.adsh));

  console.log(`  Parsing num.txt (streaming)...`);
  const conceptSet = new Set(CONFIG.conceptsToExtract);
  const numData = await parseTsvFile(
    path.join(extractDir, 'num.txt'),
    (row) => bankAdshs.has(row.adsh) && conceptSet.has(row.tag)
  );
  console.log(`    Found ${numData.length} matching numeric values`);

  // CRITICAL: Filter for consolidated entity only (coreg=NULL, segments=NULL)
  const bankNumData = numData.filter(num => {
    const isConsolidated = !num.coreg || num.coreg.trim() === '';
    const isNotSegment = !num.segments || num.segments.trim() === '';
    return isConsolidated && isNotSegment;
  });

  const filteredOut = numData.length - bankNumData.length;
  console.log(`    Filtered to ${bankNumData.length} consolidated values (removed ${filteredOut} subsidiary/segment entries)`);

  const subLookup = {};
  bankSubmissions.forEach(sub => {
    subLookup[sub.adsh] = sub;
  });

  const enrichedData = bankNumData.map(num => {
    const sub = subLookup[num.adsh] || {};
    return {
      cik: sub.cik?.padStart(10, '0'),
      companyName: sub.name,
      adsh: num.adsh,
      tag: num.tag,
      version: num.version,
      value: parseFloat(num.value) || 0,
      ddate: num.ddate,
      qtrs: parseInt(num.qtrs) || 0,
      uom: num.uom || 'USD',
      form: sub.form,
      fy: sub.fy,
      fp: sub.fp,
      filed: sub.filed,
      period: sub.period,
      sic: sub.sic,
    };
  });

  return {
    period,
    data: enrichedData,
    submissions: bankSubmissions
  };
}

/**
 * Aggregate data across quarters for each bank
 */
function aggregateBankData(quarterlyResults, bankList) {
  const bankDataMap = new Map();

  bankList.forEach(bank => {
    const cik = bank.cik?.padStart(10, '0');
    if (cik) {
      bankDataMap.set(cik, {
        cik,
        ticker: bank.ticker,
        companyName: bank.companyName,
        exchange: bank.exchange,
        sic: bank.sic,
        sicDescription: bank.sicDescription,
        otcTier: bank.otcTier || null,
        concepts: {},
        submissions: []
      });
    }
  });

  quarterlyResults.forEach(qResult => {
    if (!qResult) return;

    qResult.data.forEach(item => {
      const bankData = bankDataMap.get(item.cik);
      if (!bankData) return;

      if (!bankData.concepts[item.tag]) {
        bankData.concepts[item.tag] = [];
      }

      bankData.concepts[item.tag].push({
        value: item.value,
        ddate: item.ddate,
        qtrs: item.qtrs,
        form: item.form,
        fy: item.fy,
        fp: item.fp,
        filed: item.filed,
        period: item.period,
        uom: item.uom
      });
    });

    qResult.submissions.forEach(sub => {
      const cik = sub.cik?.padStart(10, '0');
      const bankData = bankDataMap.get(cik);
      if (bankData) {
        bankData.submissions.push({
          adsh: sub.adsh,
          form: sub.form,
          period: sub.period,
          fy: sub.fy,
          fp: sub.fp,
          filed: sub.filed
        });
      }
    });
  });

  return bankDataMap;
}

/**
 * Get the most recent point-in-time value for a concept
 */
function getLatestPointInTime(conceptData) {
  if (!conceptData || conceptData.length === 0) return null;

  const pointInTime = conceptData
    .filter(d => d.qtrs === 0 && (d.form === '10-K' || d.form === '10-Q'))
    .sort((a, b) => b.ddate.localeCompare(a.ddate));

  if (pointInTime.length > 0) {
    return pointInTime[0];
  }

  return null;
}

/**
 * Get the average of point-in-time values (FFIEC 5-point average)
 */
function getAveragePointInTime(conceptData) {
  if (!conceptData || conceptData.length === 0) return null;

  const pointInTime = conceptData
    .filter(d => d.qtrs === 0 && (d.form === '10-K' || d.form === '10-Q'))
    .sort((a, b) => b.ddate.localeCompare(a.ddate));

  if (pointInTime.length === 0) return null;

  const ending = pointInTime[0];

  if (pointInTime.length === 1) {
    return {
      average: ending.value,
      ending: ending.value,
      endingDate: ending.ddate,
      method: 'single-period',
      periodCount: 1,
      periods: [ending]
    };
  }

  const periodsToUse = pointInTime.slice(0, 5);
  const sum = periodsToUse.reduce((acc, d) => acc + d.value, 0);
  const average = sum / periodsToUse.length;

  let method;
  if (periodsToUse.length >= 5) {
    method = '5-point-avg';
  } else if (periodsToUse.length >= 2) {
    method = `${periodsToUse.length}-point-avg`;
  } else {
    method = 'single-period';
  }

  return {
    average,
    ending: ending.value,
    endingDate: ending.ddate,
    beginningDate: periodsToUse[periodsToUse.length - 1].ddate,
    method,
    periodCount: periodsToUse.length,
    periods: periodsToUse
  };
}

/**
 * Get TTM (Trailing Twelve Months) value
 */
function getTTMValue(conceptData) {
  if (!conceptData || conceptData.length === 0) return null;

  const sorted = [...conceptData]
    .filter(d => d.form === '10-K' || d.form === '10-Q')
    .sort((a, b) => b.ddate.localeCompare(a.ddate));

  if (sorted.length === 0) return null;

  const quarterlyValues = sorted.filter(d => d.qtrs === 1);
  const annualValues = sorted.filter(d => d.qtrs === 4);

  // Rule A: Quarterly-first
  if (quarterlyValues.length >= 4) {
    const topQuarters = quarterlyValues.slice(0, 4);
    const ttmValue = topQuarters.reduce((sum, q) => sum + q.value, 0);
    return {
      value: ttmValue,
      date: topQuarters[0].ddate,
      method: 'sum-4Q',
      form: [...new Set(topQuarters.map(q => q.form))].join('+'),
      details: topQuarters
    };
  }

  // Rule B: Annual fallback
  if (annualValues.length > 0) {
    const mostRecentAnnual = annualValues[0];
    const mostRecentQuarter = quarterlyValues.length > 0 ? quarterlyValues[0] : null;

    if (!mostRecentQuarter || mostRecentAnnual.ddate >= mostRecentQuarter.ddate) {
      return {
        value: mostRecentAnnual.value,
        date: mostRecentAnnual.ddate,
        method: quarterlyValues.length === 0 ? 'annual' : 'annual-fallback',
        form: mostRecentAnnual.form,
        details: [mostRecentAnnual]
      };
    }
  }

  return null;
}

/**
 * Get shares outstanding
 */
function getSharesOutstanding(conceptData) {
  if (!conceptData || conceptData.length === 0) return null;

  const shareData = conceptData
    .filter(d => d.qtrs === 0 && (d.form === '10-K' || d.form === '10-Q'))
    .sort((a, b) => b.ddate.localeCompare(a.ddate));

  if (shareData.length > 0) {
    return shareData[0];
  }

  return null;
}

/**
 * Calculate metrics for a single bank
 */
function calculateBankMetrics(bankData) {
  const concepts = bankData.concepts;

  // Balance Sheet - Assets
  const assets = getLatestPointInTime(concepts['Assets']);
  const cashAndCashEquivalents = getLatestPointInTime(concepts['CashAndCashEquivalentsAtCarryingValue']) ||
                                  getLatestPointInTime(concepts['CashAndDueFromBanks']);
  const loans = getLatestPointInTime(concepts['LoansAndLeasesReceivableNetReportedAmount']) ||
                getLatestPointInTime(concepts['LoansAndLeasesReceivableNetOfDeferredIncome']) ||
                getLatestPointInTime(concepts['FinancingReceivableExcludingAccruedInterestAfterAllowanceForCreditLoss']) ||
                getLatestPointInTime(concepts['NotesReceivableNet']);

  // Balance Sheet - Liabilities & Equity
  const liabilities = getLatestPointInTime(concepts['Liabilities']);
  const deposits = getLatestPointInTime(concepts['Deposits']) ||
                   getLatestPointInTime(concepts['DepositsDomestic']);
  const equity = getLatestPointInTime(concepts['StockholdersEquity']) ||
                 getLatestPointInTime(concepts['StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest']);
  const preferredStock = getLatestPointInTime(concepts['PreferredStockValue']) ||
                         getLatestPointInTime(concepts['PreferredStockValueOutstanding']);
  const sharesData = getSharesOutstanding(concepts['EntityCommonStockSharesOutstanding']) ||
                     getSharesOutstanding(concepts['CommonStockSharesOutstanding']);

  // Averages for Return Ratios (FFIEC/Investor Standard)
  const avgAssets = getAveragePointInTime(concepts['Assets']);
  const avgEquity = getAveragePointInTime(concepts['StockholdersEquity']) ||
                    getAveragePointInTime(concepts['StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest']);

  // Income Statement (TTM)
  const interestIncome = getTTMValue(concepts['InterestIncome']) ||
                         getTTMValue(concepts['InterestAndDividendIncomeOperating']);
  const interestExpense = getTTMValue(concepts['InterestExpense']);
  const netInterestIncome = getTTMValue(concepts['InterestIncomeExpenseNet']) ||
                            getTTMValue(concepts['NetInterestIncome']);
  const noninterestIncome = getTTMValue(concepts['NoninterestIncome']);
  const noninterestExpense = getTTMValue(concepts['NoninterestExpense']) ||
                             getTTMValue(concepts['OperatingExpenses']);
  const provisionForCreditLosses = getTTMValue(concepts['ProvisionForLoanLeaseAndOtherLosses']) ||
                                    getTTMValue(concepts['ProvisionForLoanAndLeaseLosses']) ||
                                    getTTMValue(concepts['ProvisionForCreditLosses']);
  const preTaxIncome = getTTMValue(concepts['IncomeLossFromContinuingOperationsBeforeIncomeTaxesExtraordinaryItemsNoncontrollingInterest']) ||
                       getTTMValue(concepts['IncomeLossFromContinuingOperationsBeforeIncomeTaxes']);
  const netIncome = getTTMValue(concepts['NetIncomeLoss']) ||
                    getTTMValue(concepts['ProfitLoss']) ||
                    getTTMValue(concepts['NetIncomeLossAvailableToCommonStockholdersBasic']);
  const eps = getTTMValue(concepts['EarningsPerShareBasic']) ||
              getTTMValue(concepts['EarningsPerShareDiluted']);

  // Cash Flow (TTM)
  const operatingCashFlow = getTTMValue(concepts['NetCashProvidedByUsedInOperatingActivities']);

  // Dividends
  const dps = getTTMValue(concepts['CommonStockDividendsPerShareDeclared']) ||
              getTTMValue(concepts['CommonStockDividendsPerShareCashPaid']);

  // Extract values
  const totalAssets = assets?.value;
  const cashAndCashEquivalentsValue = cashAndCashEquivalents?.value;
  const loansValue = loans?.value;
  const totalLiabilities = liabilities?.value;
  const totalDeposits = deposits?.value;
  const totalEquity = equity?.value;
  const preferredValue = preferredStock?.value || 0;
  const sharesOutstanding = sharesData?.value;

  const ttmInterestIncome = interestIncome?.value;
  const ttmInterestExpense = interestExpense?.value;
  const ttmNii = netInterestIncome?.value;
  const ttmNonintIncome = noninterestIncome?.value;
  const ttmNonintExpense = noninterestExpense?.value;
  const ttmProvision = provisionForCreditLosses?.value;
  const ttmPreTaxIncome = preTaxIncome?.value;
  const ttmNetIncome = netIncome?.value;
  const ttmEps = eps?.value;
  const ttmOperatingCashFlow = operatingCashFlow?.value;
  const ttmDps = dps?.value;

  // Derived values
  const bvps = totalEquity && sharesOutstanding ? totalEquity / sharesOutstanding : null;
  const avgAssetsValue = avgAssets?.average || totalAssets;
  const avgEquityValue = avgEquity?.average || totalEquity;
  const returnRatioAvgMethod = avgAssets?.method || avgEquity?.method || 'single-period';

  // Profitability ratios (using average values per FFIEC)
  const roe = ttmNetIncome && avgEquityValue ? (ttmNetIncome / avgEquityValue) * 100 : null;
  const roaa = ttmNetIncome && avgAssetsValue ? (ttmNetIncome / avgAssetsValue) * 100 : null;

  // Bank-specific ratios
  const totalRevenue = (ttmNii || 0) + (ttmNonintIncome || 0);
  const efficiencyRatio = ttmNonintExpense && totalRevenue > 0 ? (ttmNonintExpense / totalRevenue) * 100 : null;
  const depositsToAssets = totalDeposits && totalAssets ? (totalDeposits / totalAssets) * 100 : null;
  const equityToAssets = totalEquity && totalAssets ? (totalEquity / totalAssets) * 100 : null;
  const loansToAssets = loansValue && totalAssets ? (loansValue / totalAssets) * 100 : null;
  const loansToDeposits = loansValue && totalDeposits ? (loansValue / totalDeposits) * 100 : null;

  // Graham metrics
  const grahamNum = ttmEps && bvps && ttmEps > 0 && bvps > 0 ? Math.sqrt(22.5 * ttmEps * bvps) : null;
  const dividendPayoutRatio = ttmDps && ttmEps && ttmEps > 0 ? (ttmDps / ttmEps) * 100 : null;

  const dataDate = assets?.ddate || equity?.ddate || netIncome?.date;
  const formattedDate = dataDate ? `${dataDate.slice(0,4)}-${dataDate.slice(4,6)}-${dataDate.slice(6,8)}` : null;

  // Build raw data for audit trail
  const rawData = {
    balanceSheet: {
      Assets: assets,
      CashAndCashEquivalents: cashAndCashEquivalents,
      LoansAndLeasesReceivable: loans,
      Liabilities: liabilities,
      Deposits: deposits,
      StockholdersEquity: equity,
      PreferredStockValue: preferredStock,
      CommonStockSharesOutstanding: sharesData
    },
    incomeStatement: {
      InterestIncome: interestIncome,
      InterestExpense: interestExpense,
      NetInterestIncome: netInterestIncome,
      NoninterestIncome: noninterestIncome,
      NoninterestExpense: noninterestExpense,
      ProvisionForCreditLosses: provisionForCreditLosses,
      PreTaxIncome: preTaxIncome,
      NetIncomeLoss: netIncome,
      EarningsPerShareBasic: eps
    },
    cashFlow: {
      NetCashProvidedByUsedInOperatingActivities: operatingCashFlow
    },
    dividends: {
      CommonStockDividendsPerShareDeclared: dps
    },
    averages: {
      Assets: avgAssets,
      Equity: avgEquity
    }
  };

  return {
    metrics: {
      cik: bankData.cik,
      ticker: bankData.ticker,
      bankName: bankData.companyName,
      exchange: bankData.exchange,
      sic: bankData.sic,
      sicDescription: bankData.sicDescription,
      otcTier: bankData.otcTier,
      totalAssets,
      cashAndCashEquivalents: cashAndCashEquivalentsValue,
      loans: loansValue,
      totalLiabilities,
      totalDeposits,
      totalEquity,
      preferredStock: preferredValue,
      sharesOutstanding,
      ttmInterestIncome,
      ttmInterestExpense,
      ttmNetInterestIncome: ttmNii,
      ttmNoninterestIncome: ttmNonintIncome,
      ttmNoninterestExpense: ttmNonintExpense,
      ttmProvisionForCreditLosses: ttmProvision,
      ttmPreTaxIncome,
      ttmNetIncome,
      ttmEps,
      ttmOperatingCashFlow,
      bvps: bvps ? parseFloat(bvps.toFixed(4)) : null,
      roe: roe ? parseFloat(roe.toFixed(4)) : null,
      roaa: roaa ? parseFloat(roaa.toFixed(4)) : null,
      efficiencyRatio: efficiencyRatio ? parseFloat(efficiencyRatio.toFixed(2)) : null,
      depositsToAssets: depositsToAssets ? parseFloat(depositsToAssets.toFixed(2)) : null,
      equityToAssets: equityToAssets ? parseFloat(equityToAssets.toFixed(2)) : null,
      loansToAssets: loansToAssets ? parseFloat(loansToAssets.toFixed(2)) : null,
      loansToDeposits: loansToDeposits ? parseFloat(loansToDeposits.toFixed(2)) : null,
      grahamNum: grahamNum ? parseFloat(grahamNum.toFixed(4)) : null,
      ttmDividendPerShare: ttmDps ? parseFloat(ttmDps.toFixed(4)) : null,
      dividendPayoutRatio: dividendPayoutRatio ? parseFloat(dividendPayoutRatio.toFixed(2)) : null,
      dividendMethod: dps?.method,
      avgAssets: avgAssetsValue ? parseFloat(avgAssetsValue.toFixed(0)) : null,
      avgEquity: avgEquityValue ? parseFloat(avgEquityValue.toFixed(0)) : null,
      dataDate: formattedDate,
      ttmMethod: netIncome?.method || 'unknown',
      returnRatioAvgMethod,
      isStale: formattedDate ? new Date(formattedDate) < new Date('2024-01-01') : true,
      isAnnualized: false,
      price: null,
      marketCap: null,
      pni: null,
      grahamMoS: null,
      grahamMoSPct: null,
      securityType: 'common',
      isExchangeTraded: false,
      updatedAt: new Date().toISOString()
    },
    rawData
  };
}

/**
 * Apply data quality validation
 */
function applyDataQualityValidation(metrics) {
  const issues = [];

  Object.entries(CONFIG.outlierThresholds).forEach(([metric, threshold]) => {
    const value = metrics[metric];
    if (value !== null && value !== undefined) {
      if (value < threshold.min || value > threshold.max) {
        issues.push(`${metric} value ${value.toFixed(2)}${threshold.unit} outside range [${threshold.min}, ${threshold.max}]`);
        metrics[metric] = null;
      }
    }
  });

  metrics.dataQualityIssues = issues.length > 0 ? issues : null;
  metrics.hasDataQualityIssues = issues.length > 0;

  return metrics;
}

/**
 * Find cached ZIP files
 */
function findCachedQuarters() {
  if (!fs.existsSync(TEMP_DIR)) {
    return [];
  }

  const files = fs.readdirSync(TEMP_DIR);
  const zipPattern = /^(\d{4})q([1-4])\.zip$/i;

  const quarters = files
    .filter(f => zipPattern.test(f))
    .map(f => {
      const match = f.match(zipPattern);
      const year = parseInt(match[1]);
      const quarter = parseInt(match[2]);
      return {
        url: null,
        year,
        quarter,
        period: `${year}Q${quarter}`,
        zipPath: path.join(TEMP_DIR, f)
      };
    })
    .sort((a, b) => {
      if (b.year !== a.year) return b.year - a.year;
      return b.quarter - a.quarter;
    });

  return quarters;
}

/**
 * Main function
 */
async function main() {
  if (HELP) {
    console.log('SEC Financial Statement Data Sets Processor');
    console.log('Usage: node scripts/fetch-sec-fs-datasets.cjs');
    process.exit(0);
  }

  console.log('SEC FINANCIAL STATEMENT DATA SETS PROCESSOR');
  console.log(`Started: ${new Date().toISOString()}`);

  if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
  }

  console.log('Loading bank list...');
  const bankList = loadBankList();
  console.log(`  Found ${bankList.length} banks`);

  const bankCiks = new Set();
  bankList.forEach(bank => {
    if (bank.cik) {
      bankCiks.add(bank.cik.padStart(10, '0'));
    }
  });
  console.log(`  ${bankCiks.size} unique CIKs`);

  const cached = findCachedQuarters();
  if (cached.length === 0) {
    console.error('No ZIP files found in .sec-data-cache/');
    process.exit(1);
  }

  console.log(`Found ${cached.length} ZIP files`);
  const datasetUrls = cached.slice(0, CONFIG.quartersToFetch);

  const quarterlyResults = [];
  for (const datasetInfo of datasetUrls) {
    try {
      const result = await processQuarterlyDataset(datasetInfo, bankCiks);
      if (result) {
        quarterlyResults.push(result);
      }
    } catch (error) {
      console.error(`  Error processing ${datasetInfo.period}: ${error.message}`);
    }
  }

  console.log(`Successfully processed ${quarterlyResults.length} quarters`);

  if (quarterlyResults.length === 0) {
    console.error('No data retrieved. Exiting.');
    process.exit(1);
  }

  console.log('Aggregating bank data...');
  const bankDataMap = aggregateBankData(quarterlyResults, bankList);

  console.log('Calculating metrics...');
  const results = [];
  const rawDataStore = {};

  let processed = 0;
  let bankIndex = 0;
  bankDataMap.forEach((bankData, cik) => {
    if (Object.keys(bankData.concepts).length === 0) {
      return;
    }

    const { metrics, rawData } = calculateBankMetrics(bankData);
    const validatedMetrics = applyDataQualityValidation(metrics);
    validatedMetrics.id = `bank-${bankIndex++}`;

    results.push(validatedMetrics);
    rawDataStore[cik] = {
      ticker: bankData.ticker,
      companyName: bankData.companyName,
      rawData,
      submissions: bankData.submissions
    };

    processed++;
  });

  console.log(`  Total: ${results.length} banks with data`);

  results.sort((a, b) => (a.ticker || '').localeCompare(b.ticker || ''));

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const banksOutputPath = path.join(OUTPUT_DIR, 'banks.json');
  fs.writeFileSync(banksOutputPath, JSON.stringify(results, null, 2));
  console.log(`Saved metrics: ${banksOutputPath}`);

  const rawDataOutputPath = path.join(OUTPUT_DIR, 'sec-raw-data.json');
  fs.writeFileSync(rawDataOutputPath, JSON.stringify({
    metadata: {
      source: 'SEC Financial Statement Data Sets',
      url: 'https://www.sec.gov/data-research/sec-markets-data/financial-statement-data-sets',
      quartersProcessed: quarterlyResults.map(q => q.period),
      generatedAt: new Date().toISOString(),
      bankCount: Object.keys(rawDataStore).length
    },
    banks: rawDataStore
  }, null, 2));
  console.log(`Saved raw data: ${rawDataOutputPath}`);

  console.log(`Completed: ${new Date().toISOString()}`);
}

if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = {
  getTTMValue,
  getLatestPointInTime,
  getAveragePointInTime,
  getSharesOutstanding
};
```

---

## GitHub Actions Workflow (for reversion)

If reverting, update `.github/workflows/update-data.yml` to use the FS Data Sets approach:

```yaml
name: Update Bank Data

on:
  schedule:
    - cron: '0 3 * * *'  # Daily at 3am UTC
  workflow_dispatch:

jobs:
  update-data:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Download SEC ZIP files
        run: |
          mkdir -p .sec-data-cache
          # Download from GitHub Release assets or SEC directly
          # curl -o .sec-data-cache/2025q4.zip https://...

      - name: Process SEC data
        run: node scripts/fetch-sec-fs-datasets.cjs

      - name: Commit and push
        run: |
          git config user.name "GitHub Actions"
          git config user.email "actions@github.com"
          git add public/data/
          git commit -m "Update bank data from SEC FS Data Sets" || exit 0
          git push
```

---

## Data Source Details

### SEC Financial Statement Data Sets

**URL:** https://www.sec.gov/data-research/sec-markets-data/financial-statement-data-sets

**Files in ZIP:**
| File | Description |
|------|-------------|
| `sub.txt` | Submission metadata (CIK, company name, filing info) |
| `num.txt` | Numeric values (tag, value, date, quarters, coreg, segments) |
| `tag.txt` | XBRL tag definitions |
| `pre.txt` | Presentation linkbase |

**Key Fields in num.txt:**
| Field | Description |
|-------|-------------|
| `adsh` | Accession number (links to sub.txt) |
| `tag` | XBRL concept name |
| `value` | Numeric value |
| `ddate` | Data date (YYYYMMDD) |
| `qtrs` | Period length (0=instant, 1=quarter, 4=annual) |
| `coreg` | Co-registrant (NULL for consolidated) |
| `segments` | Dimensional breakdown (NULL for consolidated) |
| `uom` | Unit of measure (USD, shares, etc.) |

**Documentation:** https://www.sec.gov/files/financial-statement-data-sets.pdf

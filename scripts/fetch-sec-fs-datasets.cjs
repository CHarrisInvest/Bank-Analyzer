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
// Note: --local-only flag is accepted for backwards compatibility but is now the only mode

// Configuration
const CONFIG = {
  // How many quarters of data to fetch (for TTM calculation we need at least 4)
  quartersToFetch: 5,

  // Bank SIC codes
  bankSicCodes: ['6021', '6022', '6029', '6020'],

  // XBRL concepts to extract (Primary Financial Statement concepts only)
  // Note: We only extract concepts with high coverage (>80% of banks reporting)
  conceptsToExtract: [
    // Balance Sheet - Assets
    'Assets',
    'CashAndCashEquivalentsAtCarryingValue',
    'CashAndDueFromBanks',
    // Loans
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
 * This avoids Node.js string length limits for files > 512MB
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
        // First line is headers
        headers = values.map(h => h.trim().toLowerCase());
        return;
      }

      // Build row object
      const row = {};
      headers.forEach((header, idx) => {
        row[header] = values[idx]?.trim() || '';
      });

      // Apply filter if provided (for memory efficiency with large files)
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

  // Extract
  if (!fs.existsSync(extractDir) || !fs.existsSync(path.join(extractDir, 'num.txt'))) {
    console.log(`  Extracting...`);
    if (!extractZip(zipPath, extractDir)) {
      return null;
    }
  }

  // Parse sub.txt (submission data)
  console.log(`  Parsing sub.txt...`);
  const subData = await parseTsvFile(path.join(extractDir, 'sub.txt'));
  console.log(`    Found ${subData.length} submissions`);

  // Filter for our bank CIKs
  const bankSubmissions = subData.filter(sub => {
    const cik = sub.cik?.padStart(10, '0');
    return bankCiks.has(cik);
  });
  console.log(`    Matched ${bankSubmissions.length} bank submissions`);

  // Get ADSHs (accession numbers) for bank submissions
  const bankAdshs = new Set(bankSubmissions.map(s => s.adsh));

  // Parse num.txt (numeric data) with inline filtering for memory efficiency
  // This file can be very large (500MB+), so we filter during streaming
  console.log(`  Parsing num.txt (streaming)...`);
  const conceptSet = new Set(CONFIG.conceptsToExtract);
  const numData = await parseTsvFile(
    path.join(extractDir, 'num.txt'),
    // Filter function applied during streaming to reduce memory usage
    (row) => bankAdshs.has(row.adsh) && conceptSet.has(row.tag)
  );
  console.log(`    Found ${numData.length} matching numeric values`);

  // Filter for consolidated entity only (coreg=NULL, segments=NULL)
  // CRITICAL: coreg indicates co-registrant/subsidiary, segments indicates dimensional breakdown
  // We want only consolidated entity data (both must be empty)
  // See: https://www.sec.gov/files/financial-statement-data-sets.pdf
  const bankNumData = numData.filter(num => {
    const isConsolidated = !num.coreg || num.coreg.trim() === '';
    const isNotSegment = !num.segments || num.segments.trim() === '';
    return isConsolidated && isNotSegment;
  });

  const filteredOut = numData.length - bankNumData.length;
  console.log(`    Filtered to ${bankNumData.length} consolidated values (removed ${filteredOut} subsidiary/segment entries)`);

  // Build submission lookup
  const subLookup = {};
  bankSubmissions.forEach(sub => {
    subLookup[sub.adsh] = sub;
  });

  // Enrich numeric data with submission info
  const enrichedData = bankNumData.map(num => {
    const sub = subLookup[num.adsh] || {};
    return {
      cik: sub.cik?.padStart(10, '0'),
      companyName: sub.name,
      adsh: num.adsh,
      tag: num.tag,
      version: num.version,
      value: parseFloat(num.value) || 0,
      ddate: num.ddate,  // Data date (YYYYMMDD)
      qtrs: parseInt(num.qtrs) || 0,  // Number of quarters (0=point-in-time, 1=Q, 4=annual)
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

  // Initialize map with bank info
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
        otcTier: bank.otcTier || null,  // OTC tier from bank list
        concepts: {},  // tag -> array of values
        submissions: []
      });
    }
  });

  // Aggregate data from all quarters
  quarterlyResults.forEach(qResult => {
    if (!qResult) return;

    qResult.data.forEach(item => {
      const bankData = bankDataMap.get(item.cik);
      if (!bankData) return;

      if (!bankData.concepts[item.tag]) {
        bankData.concepts[item.tag] = [];
      }

      // Add value with metadata
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

    // Track submissions
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

  // Filter for point-in-time values (qtrs = 0) from 10-K or 10-Q
  const pointInTime = conceptData
    .filter(d => d.qtrs === 0 && (d.form === '10-K' || d.form === '10-Q'))
    .sort((a, b) => b.ddate.localeCompare(a.ddate));

  if (pointInTime.length > 0) {
    return pointInTime[0];
  }

  return null;
}

/**
 * Get the average of point-in-time values over available periods.
 *
 * REGULATORY/INVESTOR STANDARD:
 * =============================
 * Return ratios (ROE, ROAA, ROTCE) and Net Interest Margin should use
 * AVERAGE balance sheet values, not point-in-time ending values.
 *
 * This aligns with:
 * - FFIEC Uniform Bank Performance Report (UBPR) methodology
 * - Standard investor analysis practices
 * - Bank earnings releases (which typically report "average" metrics)
 *
 * AVERAGING METHODS:
 * ------------------
 * 1. Simple 2-point average: (Beginning + Ending) / 2
 *    - Minimum requirement, used when only 2 data points available
 *
 * 2. 5-point average (preferred): Average of 5 quarterly end values
 *    - More accurate, smooths seasonality
 *    - (Q-4 + Q-3 + Q-2 + Q-1 + Q0) / 5
 *    - Used by FFIEC and most bank analysts
 *
 * This function returns both the average value and the ending value,
 * along with metadata about the calculation method.
 *
 * @param {Array} conceptData - Array of data points for a concept
 * @returns {Object|null} - { average, ending, method, periodCount, periods }
 */
function getAveragePointInTime(conceptData) {
  if (!conceptData || conceptData.length === 0) return null;

  // Filter for point-in-time values (qtrs = 0) from 10-K or 10-Q
  // Sort by date descending (most recent first)
  const pointInTime = conceptData
    .filter(d => d.qtrs === 0 && (d.form === '10-K' || d.form === '10-Q'))
    .sort((a, b) => b.ddate.localeCompare(a.ddate));

  if (pointInTime.length === 0) return null;

  // Get the most recent value (ending)
  const ending = pointInTime[0];

  // If only one data point, cannot compute average - return ending only
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

  // Use up to 5 periods for averaging (current + 4 prior quarters)
  // This gives us a 5-point average aligned with TTM period
  const periodsToUse = pointInTime.slice(0, 5);

  // Calculate average
  const sum = periodsToUse.reduce((acc, d) => acc + d.value, 0);
  const average = sum / periodsToUse.length;

  // Determine averaging method based on periods available
  let method;
  if (periodsToUse.length >= 5) {
    method = '5-point-avg';  // Full 5-point average (preferred)
  } else if (periodsToUse.length >= 2) {
    method = `${periodsToUse.length}-point-avg`;  // Partial average
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
 * Get TTM (Trailing Twelve Months) value by summing quarters or using annual fallback.
 *
 * CRITICAL ACCOUNTING LOGIC:
 * =========================
 * Quarterly vs annual is determined by the XBRL context period length (qtrs field),
 * NOT by the filing type (10-K vs 10-Q).
 *
 * The SEC's `qtrs` field represents the number of quarters in the reporting period:
 * - qtrs=1: Quarterly data (~80-100 day period)
 * - qtrs=4: Annual data (~350-380 day period)
 * - qtrs=0: Point-in-time (balance sheet items)
 *
 * A 10-K filing can contain BOTH annual (qtrs=4) AND quarterly (qtrs=1) data.
 * Q4 data specifically often appears in 10-K filings with qtrs=1.
 * Similarly, companies may include comparative quarterly data in 10-K filings.
 *
 * TTM CALCULATION RULES:
 * ---------------------
 * Rule A (Quarterly-first): If 4+ quarterly periods exist, sum the most recent 4.
 *         This applies even if some quarters come from 10-K filings.
 *         NEVER mix annual and quarterly values.
 *
 * Rule B (Annual fallback): Only use annual value if:
 *         - Fewer than 4 quarterly periods exist, AND
 *         - The annual period is the most recent reported period
 *         Do NOT mix annual + quarterly values.
 */
function getTTMValue(conceptData) {
  if (!conceptData || conceptData.length === 0) return null;

  // Filter for valid SEC filings only (10-K, 10-Q) and sort by date descending
  const sorted = [...conceptData]
    .filter(d => d.form === '10-K' || d.form === '10-Q')
    .sort((a, b) => b.ddate.localeCompare(a.ddate));

  if (sorted.length === 0) return null;

  // Separate quarterly (qtrs=1) from annual (qtrs=4) based on period length ONLY
  // Do NOT filter by filing type - 10-K filings can contain quarterly data (e.g., Q4)
  const quarterlyValues = sorted.filter(d => d.qtrs === 1);
  const annualValues = sorted.filter(d => d.qtrs === 4);

  // Rule A: Quarterly-first rule
  // If we have 4 or more quarterly periods, ALWAYS sum the most recent 4
  // This includes Q4 data reported inside a 10-K filing
  if (quarterlyValues.length >= 4) {
    const topQuarters = quarterlyValues.slice(0, 4);
    const ttmValue = topQuarters.reduce((sum, q) => sum + q.value, 0);
    return {
      value: ttmValue,
      date: topQuarters[0].ddate,
      method: 'sum-4Q',
      // Track forms used - may be mixed (10-K and 10-Q) when Q4 comes from 10-K
      form: [...new Set(topQuarters.map(q => q.form))].join('+'),
      details: topQuarters
    };
  }

  // Rule B: Annual fallback rule
  // Use annual value ONLY if:
  // 1. Fewer than 4 quarterly periods exist
  // 2. We have annual data available
  // 3. The annual period is the most recent reported period
  // NEVER mix annual and quarterly values
  if (annualValues.length > 0) {
    const mostRecentAnnual = annualValues[0];
    const mostRecentQuarter = quarterlyValues.length > 0 ? quarterlyValues[0] : null;

    // Use annual only if no quarterly data OR annual is more recent
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

  // Cannot compute valid TTM:
  // - Fewer than 4 quarters available
  // - No annual data, or annual data is older than available quarters
  return null;
}

/**
 * Get shares outstanding (special handling for 'shares' unit)
 */
function getSharesOutstanding(conceptData) {
  if (!conceptData || conceptData.length === 0) return null;

  // Filter for point-in-time share counts
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

  // ==========================================================================
  // BALANCE SHEET - ASSETS (point-in-time)
  // ==========================================================================
  const assets = getLatestPointInTime(concepts['Assets']);
  // Cash & Cash Equivalents - prefer standard GAAP concept, fallback to bank-specific
  const cashAndCashEquivalents = getLatestPointInTime(concepts['CashAndCashEquivalentsAtCarryingValue']) ||
                                  getLatestPointInTime(concepts['CashAndDueFromBanks']);
  const loans = getLatestPointInTime(concepts['LoansAndLeasesReceivableNetReportedAmount']) ||
                getLatestPointInTime(concepts['LoansAndLeasesReceivableNetOfDeferredIncome']) ||
                getLatestPointInTime(concepts['FinancingReceivableExcludingAccruedInterestAfterAllowanceForCreditLoss']) ||
                getLatestPointInTime(concepts['NotesReceivableNet']);

  // ==========================================================================
  // BALANCE SHEET - LIABILITIES & EQUITY (point-in-time)
  // ==========================================================================
  const liabilities = getLatestPointInTime(concepts['Liabilities']);
  const deposits = getLatestPointInTime(concepts['Deposits']) ||
                   getLatestPointInTime(concepts['DepositsDomestic']);
  const equity = getLatestPointInTime(concepts['StockholdersEquity']) ||
                 getLatestPointInTime(concepts['StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest']);
  const preferredStock = getLatestPointInTime(concepts['PreferredStockValue']) ||
                         getLatestPointInTime(concepts['PreferredStockValueOutstanding']);
  const sharesData = getSharesOutstanding(concepts['CommonStockSharesOutstanding']);

  // ==========================================================================
  // AVERAGES FOR RETURN RATIOS (FFIEC/Investor Standard)
  // ==========================================================================
  // Return ratios (ROE, ROAA) should use AVERAGE values
  // rather than point-in-time ending values per FFIEC UBPR methodology.

  // Average Assets (for ROAA)
  const avgAssets = getAveragePointInTime(concepts['Assets']);

  // Average Equity (for ROE)
  const avgEquity = getAveragePointInTime(concepts['StockholdersEquity']) ||
                    getAveragePointInTime(concepts['StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest']);

  // ==========================================================================
  // INCOME STATEMENT (TTM)
  // ==========================================================================
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

  // ==========================================================================
  // CASH FLOW (TTM)
  // ==========================================================================
  const operatingCashFlow = getTTMValue(concepts['NetCashProvidedByUsedInOperatingActivities']);

  // Dividends
  const dps = getTTMValue(concepts['CommonStockDividendsPerShareDeclared']) ||
              getTTMValue(concepts['CommonStockDividendsPerShareCashPaid']);

  // ==========================================================================
  // EXTRACT VALUES
  // ==========================================================================

  // Balance Sheet - Assets
  const totalAssets = assets?.value;
  const cashAndCashEquivalentsValue = cashAndCashEquivalents?.value;
  const loansValue = loans?.value;

  // Balance Sheet - Liabilities & Equity
  const totalLiabilities = liabilities?.value;
  const totalDeposits = deposits?.value;
  const totalEquity = equity?.value;
  const preferredValue = preferredStock?.value || 0;
  const sharesOutstanding = sharesData?.value;

  // Income Statement (TTM)
  const ttmInterestIncome = interestIncome?.value;
  const ttmInterestExpense = interestExpense?.value;
  const ttmNii = netInterestIncome?.value;
  const ttmNonintIncome = noninterestIncome?.value;
  const ttmNonintExpense = noninterestExpense?.value;
  const ttmProvision = provisionForCreditLosses?.value;
  const ttmPreTaxIncome = preTaxIncome?.value;
  const ttmNetIncome = netIncome?.value;
  const ttmEps = eps?.value;

  // Cash Flow (TTM)
  const ttmOperatingCashFlow = operatingCashFlow?.value;

  // Dividends
  const ttmDps = dps?.value;

  // ==========================================================================
  // DERIVED VALUES (Point-in-Time)
  // ==========================================================================
  // Per-share metrics (use ending values per convention)
  const bvps = totalEquity && sharesOutstanding ? totalEquity / sharesOutstanding : null;

  // ==========================================================================
  // DERIVED VALUES (Averages for Return Ratios)
  // ==========================================================================
  // Extract average values (use ending if average unavailable)
  const avgAssetsValue = avgAssets?.average || totalAssets;
  const avgEquityValue = avgEquity?.average || totalEquity;

  // Track averaging method used for return ratios
  const returnRatioAvgMethod = avgAssets?.method || avgEquity?.method || 'single-period';

  // ==========================================================================
  // PROFITABILITY RATIOS (Using Average Values per FFIEC/Investor Standard)
  // ==========================================================================
  // These ratios now use AVERAGE balance sheet values instead of ending values,
  // which aligns with FFIEC UBPR methodology and standard investor analysis.

  // ROE = TTM Net Income / Average Total Equity
  const roe = ttmNetIncome && avgEquityValue ? (ttmNetIncome / avgEquityValue) * 100 : null;

  // ROAA = TTM Net Income / Average Total Assets
  const roaa = ttmNetIncome && avgAssetsValue ? (ttmNetIncome / avgAssetsValue) * 100 : null;

  // ==========================================================================
  // BANK-SPECIFIC RATIOS
  // ==========================================================================
  const totalRevenue = (ttmNii || 0) + (ttmNonintIncome || 0);
  const efficiencyRatio = ttmNonintExpense && totalRevenue > 0 ? (ttmNonintExpense / totalRevenue) * 100 : null;

  // Capital ratios (point-in-time is correct for these)
  const depositsToAssets = totalDeposits && totalAssets ? (totalDeposits / totalAssets) * 100 : null;
  const equityToAssets = totalEquity && totalAssets ? (totalEquity / totalAssets) * 100 : null;
  const loansToAssets = loansValue && totalAssets ? (loansValue / totalAssets) * 100 : null;
  const loansToDeposits = loansValue && totalDeposits ? (loansValue / totalDeposits) * 100 : null;

  // Graham metrics
  const grahamNum = ttmEps && bvps && ttmEps > 0 && bvps > 0 ? Math.sqrt(22.5 * ttmEps * bvps) : null;

  // Dividend metrics
  const dividendPayoutRatio = ttmDps && ttmEps && ttmEps > 0 ? (ttmDps / ttmEps) * 100 : null;

  // Data date
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
    // Averaging data for return ratio calculations (FFIEC/investor standard)
    averages: {
      Assets: avgAssets,
      Equity: avgEquity
    }
  };

  return {
    metrics: {
      // Identifiers (id will be added in main loop)
      cik: bankData.cik,
      ticker: bankData.ticker,
      bankName: bankData.companyName,
      exchange: bankData.exchange,
      sic: bankData.sic,
      sicDescription: bankData.sicDescription,
      otcTier: bankData.otcTier,

      // Balance Sheet - Assets
      totalAssets,
      cashAndCashEquivalents: cashAndCashEquivalentsValue,
      loans: loansValue,

      // Balance Sheet - Liabilities & Equity
      totalLiabilities,
      totalDeposits,
      totalEquity,
      preferredStock: preferredValue,
      sharesOutstanding,

      // Income Statement (TTM)
      ttmInterestIncome,
      ttmInterestExpense,
      ttmNetInterestIncome: ttmNii,
      ttmNoninterestIncome: ttmNonintIncome,
      ttmNoninterestExpense: ttmNonintExpense,
      ttmProvisionForCreditLosses: ttmProvision,
      ttmPreTaxIncome,
      ttmNetIncome,
      ttmEps,

      // Cash Flow (TTM)
      ttmOperatingCashFlow,

      // Per-share metrics
      bvps: bvps ? parseFloat(bvps.toFixed(4)) : null,

      // Profitability ratios
      roe: roe ? parseFloat(roe.toFixed(4)) : null,
      roaa: roaa ? parseFloat(roaa.toFixed(4)) : null,

      // Bank ratios
      efficiencyRatio: efficiencyRatio ? parseFloat(efficiencyRatio.toFixed(2)) : null,
      depositsToAssets: depositsToAssets ? parseFloat(depositsToAssets.toFixed(2)) : null,
      equityToAssets: equityToAssets ? parseFloat(equityToAssets.toFixed(2)) : null,
      loansToAssets: loansToAssets ? parseFloat(loansToAssets.toFixed(2)) : null,
      loansToDeposits: loansToDeposits ? parseFloat(loansToDeposits.toFixed(2)) : null,

      // Graham metrics
      grahamNum: grahamNum ? parseFloat(grahamNum.toFixed(4)) : null,

      // Dividend metrics
      ttmDividendPerShare: ttmDps ? parseFloat(ttmDps.toFixed(4)) : null,
      dividendPayoutRatio: dividendPayoutRatio ? parseFloat(dividendPayoutRatio.toFixed(2)) : null,
      dividendMethod: dps?.method,

      // Average values used in return ratio calculations (for transparency)
      avgAssets: avgAssetsValue ? parseFloat(avgAssetsValue.toFixed(0)) : null,
      avgEquity: avgEquityValue ? parseFloat(avgEquityValue.toFixed(0)) : null,

      // Metadata
      dataDate: formattedDate,
      ttmMethod: netIncome?.method || 'unknown',
      returnRatioAvgMethod,  // Method used for averaging (e.g., '5-point-avg', '3-point-avg')
      isStale: formattedDate ? new Date(formattedDate) < new Date('2024-01-01') : true,
      isAnnualized: false,  // FS Data Sets provide actual quarterly data, not annualized

      // Price metrics (null - require external price data)
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
        metrics[metric] = null;  // Null out invalid values
      }
    }
  });

  metrics.dataQualityIssues = issues.length > 0 ? issues : null;
  metrics.hasDataQualityIssues = issues.length > 0;

  return metrics;
}

/**
 * Show help message
 */
function showHelp() {
  console.log(`
SEC Financial Statement Data Sets Processor

Processes SEC Financial Statement Data Sets from local ZIP files.
ZIP files should be downloaded from GitHub Release assets (not directly from SEC).

USAGE:
  node scripts/fetch-sec-fs-datasets.cjs [OPTIONS]

OPTIONS:
  --help, -h      Show this help message
  --local-only    (Deprecated) Accepted for backwards compatibility but now the only mode

DATA SOURCE:
  This script processes ZIP files from .sec-data-cache/ directory.
  The GitHub Actions workflow downloads these files from the 'sec-data' release.

  To update data:
  1. Download ZIP files from SEC (manually, outside this script):
     https://www.sec.gov/files/dera/data/financial-statement-data-sets/

  2. Upload to GitHub Release with tag 'sec-data'

  3. Run the "Update SEC Data (Manual)" workflow, which will:
     - Download ZIPs from GitHub Release to .sec-data-cache/
     - Run this script to process them
     - Commit and deploy the updated data

  For local development:
  1. Place ZIP files in .sec-data-cache/ with names like 2025q4.zip
  2. Run: node scripts/fetch-sec-fs-datasets.cjs
  3. Output: public/data/banks.json, public/data/sec-raw-data.json
`);
}

/**
 * Find cached ZIP files for local-only mode
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
        url: null,  // No URL needed for local files
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
  // Handle --help
  if (HELP) {
    showHelp();
    process.exit(0);
  }

  console.log('═'.repeat(80));
  console.log('SEC FINANCIAL STATEMENT DATA SETS PROCESSOR');
  console.log('═'.repeat(80));
  console.log('');
  console.log('Processing ZIP files from GitHub Release assets');
  console.log('Data: SEC Financial Statement Data Sets (primary financial statements only)');
  console.log('');
  console.log(`Started: ${new Date().toISOString()}`);
  console.log('');

  // Create temp directory
  if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
  }

  // Load bank list
  console.log('Loading bank list...');
  const bankList = loadBankList();
  console.log(`  Found ${bankList.length} banks`);

  // Build CIK set
  const bankCiks = new Set();
  bankList.forEach(bank => {
    if (bank.cik) {
      bankCiks.add(bank.cik.padStart(10, '0'));
    }
  });
  console.log(`  ${bankCiks.size} unique CIKs`);

  // Find cached ZIP files from GitHub Release
  const cached = findCachedQuarters();
  if (cached.length === 0) {
    console.error('\nNo ZIP files found in .sec-data-cache/');
    console.error('');
    console.error('ZIP files should be downloaded from the GitHub Release assets.');
    console.error('Run the workflow or manually download from:');
    console.error('https://github.com/YOUR_REPO/releases/tag/sec-data');
    console.error('');
    console.error('Run with --help for more information.');
    process.exit(1);
  }
  console.log(`\nFound ${cached.length} ZIP files:`);
  cached.forEach(q => console.log(`  - ${q.period}: ${q.zipPath}`));
  const datasetUrls = cached.slice(0, CONFIG.quartersToFetch);

  // Process each quarter
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

  console.log(`\nSuccessfully processed ${quarterlyResults.length} quarters`);

  if (quarterlyResults.length === 0) {
    console.error('No data retrieved. Exiting.');
    process.exit(1);
  }

  // Aggregate data by bank
  console.log('\nAggregating bank data...');
  const bankDataMap = aggregateBankData(quarterlyResults, bankList);

  // Calculate metrics for each bank
  console.log('Calculating metrics...');
  const results = [];
  const rawDataStore = {};

  let processed = 0;
  let bankIndex = 0;
  bankDataMap.forEach((bankData, cik) => {
    if (Object.keys(bankData.concepts).length === 0) {
      return;  // Skip banks with no data
    }

    const { metrics, rawData } = calculateBankMetrics(bankData);
    const validatedMetrics = applyDataQualityValidation(metrics);

    // Add id field for frontend compatibility
    validatedMetrics.id = `bank-${bankIndex++}`;

    results.push(validatedMetrics);
    rawDataStore[cik] = {
      ticker: bankData.ticker,
      companyName: bankData.companyName,
      rawData,
      submissions: bankData.submissions
    };

    processed++;
    if (processed % 50 === 0) {
      console.log(`  Processed ${processed} banks...`);
    }
  });

  console.log(`  Total: ${results.length} banks with data`);

  // Sort by ticker
  results.sort((a, b) => (a.ticker || '').localeCompare(b.ticker || ''));

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Save calculated metrics (existing format)
  const banksOutputPath = path.join(OUTPUT_DIR, 'banks.json');
  fs.writeFileSync(banksOutputPath, JSON.stringify(results, null, 2));
  console.log(`\nSaved metrics: ${banksOutputPath}`);

  // Save raw data for audit trail
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

  // Summary
  console.log('\n' + '═'.repeat(80));
  console.log('SUMMARY');
  console.log('═'.repeat(80));
  console.log(`Banks processed: ${results.length}`);
  console.log(`Data quality issues: ${results.filter(r => r.hasDataQualityIssues).length} banks`);

  // Show validation examples for major banks
  const majorBanks = ['ALLY', 'JPM', 'BAC', 'WFC', 'C', 'USB'];
  const foundMajorBanks = results.filter(r => majorBanks.includes(r.ticker));

  if (foundMajorBanks.length > 0) {
    console.log('\nMAJOR BANK VALIDATION (consolidated data check):');
    console.log('─'.repeat(80));
    console.log(`${'Ticker'.padEnd(8)} ${'Total Assets'.padStart(18)} ${'Total Equity'.padStart(16)} ${'Deposits'.padStart(16)} ${'Data Date'.padStart(12)}`);
    console.log('─'.repeat(80));

    foundMajorBanks.forEach(bank => {
      const assets = bank.totalAssets ? `$${(bank.totalAssets / 1e9).toFixed(1)}B` : 'N/A';
      const equity = bank.totalEquity ? `$${(bank.totalEquity / 1e9).toFixed(1)}B` : 'N/A';
      const deposits = bank.totalDeposits ? `$${(bank.totalDeposits / 1e9).toFixed(1)}B` : 'N/A';
      const dataDate = bank.dataDate || 'N/A';
      const flag = bank.hasDataQualityIssues ? ' ⚠' : ' ✓';

      console.log(`${bank.ticker.padEnd(8)} ${assets.padStart(18)} ${equity.padStart(16)} ${deposits.padStart(16)} ${dataDate.padStart(12)}${flag}`);
    });

    console.log('─'.repeat(80));
    console.log('Expected ranges: Assets($100B-$4T), Equity($10B-$350B), Deposits($80B-$2.5T)');
  }

  // Show example - Ally (detailed)
  const ally = results.find(r => r.ticker === 'ALLY');
  if (ally) {
    console.log('\nALLY FINANCIAL (detailed):');
    console.log(`  Total Assets:      $${ally.totalAssets ? (ally.totalAssets / 1e9).toFixed(3) + 'B' : 'N/A'}`);
    console.log(`  Total Equity:      $${ally.totalEquity ? (ally.totalEquity / 1e9).toFixed(3) + 'B' : 'N/A'}`);
    console.log(`  Total Deposits:    $${ally.totalDeposits ? (ally.totalDeposits / 1e9).toFixed(3) + 'B' : 'N/A'}`);
    console.log(`  Shares Outstanding: ${ally.sharesOutstanding?.toLocaleString() || 'N/A'}`);
    console.log(`  BVPS:              $${ally.bvps?.toFixed(2) || 'N/A'}`);
    console.log(`  ROE:               ${ally.roe?.toFixed(2) || 'N/A'}%`);
    console.log(`  Deposits/Assets:   ${ally.depositsToAssets?.toFixed(1) || 'N/A'}%`);
    console.log(`  Equity/Assets:     ${ally.equityToAssets?.toFixed(1) || 'N/A'}%`);
    console.log(`  Data Date:         ${ally.dataDate}`);
    if (ally.hasDataQualityIssues) {
      console.log(`  Data Quality Issues: ${ally.dataQualityIssues.join(', ')}`);
    }
  }

  console.log(`\nCompleted: ${new Date().toISOString()}`);
  console.log('═'.repeat(80));
}

// Run (only if executed directly, not when imported for testing)
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

// Export for testing
module.exports = {
  getTTMValue,
  getLatestPointInTime,
  getAveragePointInTime,
  getSharesOutstanding
};

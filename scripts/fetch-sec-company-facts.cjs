#!/usr/bin/env node
/**
 * SEC Company Facts API Processor
 *
 * Fetches financial data for banks and financial institutions using the
 * SEC EDGAR Company Facts API.
 *
 * Data Source: https://data.sec.gov/api/xbrl/companyfacts/
 * Bulk Download: https://www.sec.gov/Archives/edgar/daily-index/xbrl/companyfacts.zip
 *
 * Advantages over Financial Statement Data Sets:
 * - Includes DEI namespace (EntityCommonStockSharesOutstanding on cover page)
 * - Complete historical data per company
 * - Real-time updates available
 *
 * Output:
 * - public/data/banks.json: Calculated metrics (same format as before)
 * - public/data/sec-raw-data.json: Summary raw data for audit trail
 *
 * Environment Variables:
 * - SEC_USER_AGENT: Required. Contact info for SEC API (e.g., "Company Name admin@example.com")
 *
 * @see https://www.sec.gov/search-filings/edgar-application-programming-interfaces
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

// Parse command line arguments
const args = process.argv.slice(2);
const HELP = args.includes('--help') || args.includes('-h');
const USE_BULK = args.includes('--bulk');
const SKIP_DOWNLOAD = args.includes('--skip-download');

// Configuration
const CONFIG = {
  // How many quarters of history to use for calculations
  quartersToFetch: 5,

  // Maximum days since last reporting date to be considered an active filer
  // Banks with dataDate older than this threshold from the refresh date are excluded
  activeFilerThresholdDays: 150,

  // Financial institution SIC codes
  // 6020 - Commercial Banks
  // 6021 - National Commercial Banks
  // 6022 - State Commercial Banks
  // 6029 - Commercial Banks, NEC
  // 6035 - Savings Institutions, Federally Chartered
  // 6036 - Savings Institutions, Not Federally Chartered
  // 6099 - Functions Related to Depository Banking
  // 6111 - Federal & Federally-Sponsored Credit Agencies
  // 6141 - Personal Credit Institutions
  // 6153 - Short-Term Business Credit Institutions
  // 6159 - Miscellaneous Business Credit Institutions
  // 6162 - Mortgage Bankers & Loan Correspondents
  // 6172 - Finance Lessors
  // 6199 - Finance Services
  // 6200 - Security & Commodity Brokers, Dealers, Exchanges & Services
  // 6211 - Security Brokers, Dealers & Flotation Companies
  // 6221 - Commodity Contracts Dealers, Brokers
  // 6282 - Investment Advice
  // 6311 - Life Insurance
  // 6321 - Accident & Health Insurance
  // 6324 - Hospital & Medical Service Plans
  // 6331 - Fire, Marine & Casualty Insurance
  // 6351 - Surety Insurance
  // 6361 - Title Insurance
  // 6399 - Insurance Carriers, NEC
  // 6411 - Insurance Agents, Brokers & Service
  financialInstitutionSicCodes: [
    '6020', '6021', '6022', '6029',  // Commercial Banks
    '6035', '6036',                   // Savings Institutions
  ],

  // XBRL concepts to extract (both us-gaap and dei namespaces)
  conceptsToExtract: {
    // DEI namespace - Document and Entity Information (cover page)
    dei: [
      'EntityCommonStockSharesOutstanding',
      'EntityPublicFloat',
    ],

    // US-GAAP namespace - Financial Statements
    'us-gaap': [
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
      'CreditLossExpense',
      'IncomeLossFromContinuingOperationsBeforeIncomeTaxesExtraordinaryItemsNoncontrollingInterest',
      'IncomeLossFromContinuingOperationsBeforeIncomeTaxes',
      'NetIncomeLoss',
      'ProfitLoss',
      'NetIncomeLossAvailableToCommonStockholdersBasic',
      'PreferredStockDividendsAndOtherAdjustments',
      'DividendsPreferredStock',
      'EarningsPerShareBasic',
      'EarningsPerShareDiluted',
      'Revenues',
      'RevenueFromContractWithCustomerExcludingAssessedTax',

      // Dividends (per-share only - avoids including preferred dividends)
      'CommonStockDividendsPerShareDeclared',
      'CommonStockDividendsPerShareCashPaid',
    ],
  },

  // Balance sheet concepts (point-in-time, qtrs=0 equivalent)
  balanceSheetConcepts: new Set([
    'Assets',
    'CashAndCashEquivalentsAtCarryingValue',
    'CashAndDueFromBanks',
    'LoansAndLeasesReceivableNetReportedAmount',
    'LoansAndLeasesReceivableNetOfDeferredIncome',
    'FinancingReceivableExcludingAccruedInterestAfterAllowanceForCreditLoss',
    'NotesReceivableNet',
    'Liabilities',
    'Deposits',
    'DepositsDomestic',
    'StockholdersEquity',
    'StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest',
    'LiabilitiesAndStockholdersEquity',
    'PreferredStockValue',
    'PreferredStockValueOutstanding',
    'CommonStockSharesOutstanding',
    'EntityCommonStockSharesOutstanding',
    'EntityPublicFloat',
  ]),

  // Outlier thresholds for data quality
  outlierThresholds: {
    efficiencyRatio: { min: 20, max: 150, unit: '%' },
    depositsToAssets: { min: 10, max: 100, unit: '%' },
    equityToAssets: { min: 1, max: 50, unit: '%' },
    roe: { min: -100, max: 100, unit: '%' },
    roaa: { min: -10, max: 10, unit: '%' },
  },

  // API configuration
  api: {
    baseUrl: 'https://data.sec.gov',
    bulkDownloadUrl: 'https://www.sec.gov/Archives/edgar/daily-index/xbrl/companyfacts.zip',
    submissionsUrl: 'https://data.sec.gov/submissions',
    rateLimitMs: 100,  // 10 requests per second max
  },
};

// Directories
const TEMP_DIR = path.join(__dirname, '..', '.sec-data-cache');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'data');

/**
 * Get User-Agent header for SEC API requests
 */
function getUserAgent() {
  const userAgent = process.env.SEC_USER_AGENT;
  if (!userAgent) {
    console.error('ERROR: SEC_USER_AGENT environment variable is required.');
    console.error('');
    console.error('The SEC requires identification for API access.');
    console.error('Set it to your contact info, e.g.:');
    console.error('  export SEC_USER_AGENT="Company Name admin@example.com"');
    console.error('');
    console.error('See: https://www.sec.gov/os/accessing-edgar-data');
    process.exit(1);
  }
  return userAgent;
}

/**
 * Make HTTPS request with proper headers
 */
function httpsGet(url) {
  return new Promise((resolve, reject) => {
    const userAgent = getUserAgent();

    const options = {
      headers: {
        'User-Agent': userAgent,
        'Accept-Encoding': 'gzip, deflate',
        'Accept': 'application/json',
      },
    };

    https.get(url, options, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        // Follow redirect
        return resolve(httpsGet(res.headers.location));
      }

      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
        return;
      }

      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        const buffer = Buffer.concat(chunks);
        resolve(buffer);
      });
      res.on('error', reject);
    }).on('error', reject);
  });
}

/**
 * Download file to disk
 */
async function downloadFile(url, destPath) {
  const userAgent = getUserAgent();

  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);

    const options = {
      headers: {
        'User-Agent': userAgent,
        'Accept-Encoding': 'identity',
      },
    };

    https.get(url, options, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlinkSync(destPath);
        return resolve(downloadFile(res.headers.location, destPath));
      }

      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(destPath);
        reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
        return;
      }

      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
      file.on('error', (err) => {
        fs.unlinkSync(destPath);
        reject(err);
      });
    }).on('error', (err) => {
      fs.unlinkSync(destPath);
      reject(err);
    });
  });
}

/**
 * Check if a ticker is a preferred stock ticker
 * Preferred stock tickers typically have patterns like:
 * - XXX-PA, XXX-PB, etc. (hyphen + P + optional letter)
 *
 * Note: We only match hyphenated patterns (-P suffix) as they're reliable.
 * Non-hyphenated patterns (like XXXP) have too many false positives with
 * legitimate common stock tickers (e.g., BPRN for Princeton Bancorp).
 */
function isPreferredTicker(ticker) {
  if (!ticker) return false;
  // Pattern: ends with -P followed by optional letter (e.g., BAC-PB, WFC-PA, C-PN, TFIN-P)
  if (/-P[A-Z]?$/i.test(ticker)) return true;
  return false;
}

/**
 * Select the best ticker for display from a list of tickers for the same CIK
 * Prefers: common stock (non-preferred) > shorter ticker
 */
function selectBestTicker(tickers) {
  if (!tickers || tickers.length === 0) return null;
  if (tickers.length === 1) return tickers[0];

  // Separate common and preferred tickers
  const common = tickers.filter((t) => !isPreferredTicker(t));
  const candidates = common.length > 0 ? common : tickers;

  // Return shortest ticker (common stock is usually shorter)
  return candidates.sort((a, b) => a.length - b.length)[0];
}

/**
 * Load bank list to get CIKs
 * Groups entries by CIK and selects the best ticker to display
 * (Financial data is valid for all securities under the same CIK)
 */
function loadBankList() {
  const bankListPath = path.join(OUTPUT_DIR, 'bank-list.json');

  if (!fs.existsSync(bankListPath)) {
    console.error('Bank list not found at:', bankListPath);
    console.error('Creating empty bank list. Run discover-banks workflow first for full data.');
    return [];
  }

  const data = JSON.parse(fs.readFileSync(bankListPath, 'utf8'));
  const allBanks = data.banks || [];

  // Group all entries by CIK
  const entriesByCik = new Map();
  for (const bank of allBanks) {
    const cik = bank.cik;
    if (!entriesByCik.has(cik)) {
      entriesByCik.set(cik, []);
    }
    entriesByCik.get(cik).push(bank);
  }

  // For each CIK, select the best ticker to display
  const result = [];
  let preferredSkipped = 0;
  let duplicatesCombined = 0;

  for (const [cik, entries] of entriesByCik) {
    const tickers = entries.map((e) => e.ticker).filter(Boolean);
    const bestTicker = selectBestTicker(tickers);

    // Use the entry with the best ticker, or first entry if no ticker
    const bestEntry = entries.find((e) => e.ticker === bestTicker) || entries[0];

    // Track stats
    const preferredCount = entries.filter((e) => isPreferredTicker(e.ticker)).length;
    preferredSkipped += preferredCount;
    if (entries.length > 1) duplicatesCombined += entries.length - 1;

    result.push(bestEntry);
  }

  console.log(`  Total entries in bank-list: ${allBanks.length}`);
  console.log(`  Unique CIKs: ${result.length}`);
  console.log(`  Preferred tickers (using common instead): ${preferredSkipped}`);
  console.log(`  Duplicate entries combined: ${duplicatesCombined}`);

  return result;
}

/**
 * Download and extract companyfacts.zip bulk file
 */
async function downloadBulkCompanyFacts() {
  const zipPath = path.join(TEMP_DIR, 'companyfacts.zip');
  const extractDir = path.join(TEMP_DIR, 'companyfacts');

  console.log('Downloading companyfacts.zip (this may take several minutes)...');
  console.log(`  URL: ${CONFIG.api.bulkDownloadUrl}`);

  await downloadFile(CONFIG.api.bulkDownloadUrl, zipPath);
  console.log('  Download complete.');

  console.log('Extracting...');
  if (!fs.existsSync(extractDir)) {
    fs.mkdirSync(extractDir, { recursive: true });
  }

  execSync(`unzip -o "${zipPath}" -d "${extractDir}"`, { stdio: 'inherit' });
  console.log('  Extraction complete.');

  return extractDir;
}

/**
 * Fetch Company Facts for a single CIK via API
 */
async function fetchCompanyFacts(cik) {
  const paddedCik = cik.padStart(10, '0');
  const url = `${CONFIG.api.baseUrl}/api/xbrl/companyfacts/CIK${paddedCik}.json`;

  try {
    const buffer = await httpsGet(url);
    return JSON.parse(buffer.toString('utf8'));
  } catch (error) {
    if (error.message.includes('404')) {
      return null;  // Company not found
    }
    throw error;
  }
}

/**
 * Load Company Facts from bulk download
 */
function loadCompanyFactsFromBulk(extractDir, cik) {
  const paddedCik = cik.padStart(10, '0');
  const filePath = path.join(extractDir, `CIK${paddedCik}.json`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    console.warn(`  Warning: Could not parse ${filePath}: ${error.message}`);
    return null;
  }
}

/**
 * Infer period length (equivalent to qtrs field) from fact data
 *
 * The Company Facts API doesn't have an explicit qtrs field.
 * We infer it from:
 * - Balance sheet concepts: always point-in-time (qtrs=0)
 * - Income/cash flow concepts with 'start' field: duration-based
 *   - ~3 months = quarterly (qtrs=1)
 *   - ~12 months = annual (qtrs=4)
 * - Concepts without 'start' field: point-in-time (qtrs=0)
 */
function inferPeriodLength(fact, concept) {
  // Balance sheet concepts are always point-in-time
  if (CONFIG.balanceSheetConcepts.has(concept)) {
    return 0;
  }

  // If no start date, it's point-in-time
  if (!fact.start) {
    return 0;
  }

  // Calculate duration in days
  const startDate = new Date(fact.start);
  const endDate = new Date(fact.end);
  const durationDays = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));

  // Classify by duration
  if (durationDays <= 100) {
    return 1;  // Quarterly (~90 days)
  } else if (durationDays <= 200) {
    return 2;  // Semi-annual (~180 days)
  } else if (durationDays <= 300) {
    return 3;  // 9 months (~270 days)
  } else {
    return 4;  // Annual (~365 days)
  }
}

/**
 * Transform Company Facts API data into our internal format
 *
 * The API returns data structured by namespace and concept:
 * {
 *   facts: {
 *     "dei": { "EntityCommonStockSharesOutstanding": { units: { shares: [...] } } },
 *     "us-gaap": { "Assets": { units: { USD: [...] } } }
 *   }
 * }
 *
 * We transform to match our internal format with inferred qtrs field.
 */
function transformCompanyFacts(companyFacts, bankInfo) {
  const concepts = {};

  if (!companyFacts?.facts) {
    return { concepts, submissions: [] };
  }

  // Process each namespace
  for (const [namespace, namespaceFacts] of Object.entries(companyFacts.facts)) {
    // Get concepts to extract for this namespace
    const conceptsToExtract = CONFIG.conceptsToExtract[namespace];
    if (!conceptsToExtract) continue;

    for (const concept of conceptsToExtract) {
      const conceptData = namespaceFacts[concept];
      if (!conceptData?.units) continue;

      // Initialize concept array
      if (!concepts[concept]) {
        concepts[concept] = [];
      }

      // Process each unit (USD, shares, etc.)
      for (const [unit, facts] of Object.entries(conceptData.units)) {
        for (const fact of facts) {
          // Only process 10-K and 10-Q filings
          if (fact.form !== '10-K' && fact.form !== '10-Q') {
            continue;
          }

          // Transform to our format
          const transformedFact = {
            value: fact.val,
            ddate: fact.end.replace(/-/g, ''),  // Convert YYYY-MM-DD to YYYYMMDD
            qtrs: inferPeriodLength(fact, concept),
            form: fact.form,
            fy: fact.fy,
            fp: fact.fp,
            filed: fact.filed,
            period: fact.end,
            uom: unit,
            accn: fact.accn,
            frame: fact.frame,
          };

          concepts[concept].push(transformedFact);
        }
      }

      // Sort by date descending (most recent first)
      concepts[concept].sort((a, b) => b.ddate.localeCompare(a.ddate));
    }
  }

  return {
    cik: bankInfo?.cik,
    ticker: bankInfo?.ticker,
    companyName: companyFacts.entityName,
    exchange: bankInfo?.exchange,
    sic: bankInfo?.sic,
    sicDescription: bankInfo?.sicDescription,
    otcTier: bankInfo?.otcTier || null,
    concepts,
    submissions: [],
  };
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

  // Use up to 5 periods for averaging (FFIEC standard)
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
 *
 * Rule A (Quarterly-first): If 4+ quarterly periods exist, sum the most recent 4.
 * Rule B (Annual fallback): Only use annual value if fewer than 4 quarterly periods exist.
 * NEVER mix annual and quarterly values.
 */
function getTTMValue(conceptData) {
  if (!conceptData || conceptData.length === 0) return null;

  const sorted = [...conceptData]
    .filter(d => d.form === '10-K' || d.form === '10-Q')
    .sort((a, b) => b.ddate.localeCompare(a.ddate));

  if (sorted.length === 0) return null;

  // Separate quarterly (qtrs=1) from annual (qtrs=4) based on inferred period length
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
 * Calculate the expected 4 quarter-end dates for TTM, given a reference date.
 * Returns array of YYYYMMDD strings for Q0, Q-1, Q-2, Q-3 (most recent first).
 */
function getExpectedQuarterEnds(refDate) {
  if (!refDate) return null;

  const year = parseInt(refDate.slice(0, 4));
  const month = parseInt(refDate.slice(4, 6));

  // Determine which fiscal quarter-end this date corresponds to
  // Standard quarter-ends: 03-31, 06-30, 09-30, 12-31
  const quarterEnds = [
    { month: 3, day: 31 },
    { month: 6, day: 30 },
    { month: 9, day: 30 },
    { month: 12, day: 31 }
  ];

  // Find the quarter-end that this date falls into (or closest to)
  let refQuarterIdx = quarterEnds.findIndex(q => month <= q.month);
  if (refQuarterIdx === -1) refQuarterIdx = 0; // December -> next year's Q1

  const quarters = [];
  let currentYear = year;
  let currentQIdx = refQuarterIdx;

  for (let i = 0; i < 4; i++) {
    const q = quarterEnds[currentQIdx];
    const dateStr = `${currentYear}${String(q.month).padStart(2, '0')}${String(q.day).padStart(2, '0')}`;
    quarters.push(dateStr);

    // Move to previous quarter
    currentQIdx--;
    if (currentQIdx < 0) {
      currentQIdx = 3;
      currentYear--;
    }
  }

  return quarters;
}

/**
 * Get TTM value anchored to a specific reference date.
 * Only uses the 4 quarters immediately preceding (and including) the reference quarter.
 * If Q4 is missing, derives it from annual data minus Q1-Q3.
 * Returns null if data doesn't align with expected quarters.
 */
function getTTMValueForPeriod(conceptData, refDate) {
  if (!conceptData || conceptData.length === 0 || !refDate) return null;

  const expectedQuarters = getExpectedQuarterEnds(refDate);
  if (!expectedQuarters) return null;

  const sorted = [...conceptData]
    .filter(d => d.form === '10-K' || d.form === '10-Q')
    .sort((a, b) => b.ddate.localeCompare(a.ddate));

  if (sorted.length === 0) return null;

  // Separate quarterly (qtrs=1) from annual (qtrs=4)
  const quarterlyValues = sorted.filter(d => d.qtrs === 1);
  const annualValues = sorted.filter(d => d.qtrs === 4);

  // Try to find data for each expected quarter
  const matchedQuarters = [];
  let missingQ4Index = -1;

  for (let i = 0; i < expectedQuarters.length; i++) {
    const expectedDate = expectedQuarters[i];
    const expectedYM = expectedDate.slice(0, 6);
    const expectedMonth = parseInt(expectedDate.slice(4, 6));
    const match = quarterlyValues.find(q => q.ddate.slice(0, 6) === expectedYM);

    if (match) {
      matchedQuarters.push({ index: i, data: match, derived: false });
    } else if (expectedMonth === 12) {
      // Track missing Q4 (December quarter)
      missingQ4Index = i;
    }
  }

  // If we have all 4 quarters directly, use them
  if (matchedQuarters.length === 4) {
    matchedQuarters.sort((a, b) => a.index - b.index);
    const details = matchedQuarters.map(m => m.data);
    const ttmValue = details.reduce((sum, q) => sum + q.value, 0);
    return {
      value: ttmValue,
      date: details[0].ddate,
      method: 'sum-4Q',
      form: [...new Set(details.map(q => q.form))].join('+'),
      details
    };
  }

  // If we have 3 quarters and missing Q4, try to derive Q4 from annual data
  if (matchedQuarters.length === 3 && missingQ4Index >= 0) {
    const expectedQ4Date = expectedQuarters[missingQ4Index];
    const q4Year = parseInt(expectedQ4Date.slice(0, 4));

    // Find annual data for the fiscal year ending at Q4
    const annualMatch = annualValues.find(a => {
      const aYear = parseInt(a.ddate.slice(0, 4));
      const aMonth = parseInt(a.ddate.slice(4, 6));
      return aYear === q4Year && aMonth === 12;
    });

    if (annualMatch) {
      // Find Q1, Q2, Q3 of the same fiscal year to derive Q4
      // Q1 = Mar of q4Year+1, Q2 = Jun of q4Year+1, Q3 = Sep of q4Year+1
      // Actually for FY ending Dec 2024: Q1=Mar 2024, Q2=Jun 2024, Q3=Sep 2024
      const q1Match = quarterlyValues.find(q => {
        const m = parseInt(q.ddate.slice(4, 6));
        const y = parseInt(q.ddate.slice(0, 4));
        return m === 3 && y === q4Year;
      });
      const q2Match = quarterlyValues.find(q => {
        const m = parseInt(q.ddate.slice(4, 6));
        const y = parseInt(q.ddate.slice(0, 4));
        return m === 6 && y === q4Year;
      });
      const q3Match = quarterlyValues.find(q => {
        const m = parseInt(q.ddate.slice(4, 6));
        const y = parseInt(q.ddate.slice(0, 4));
        return m === 9 && y === q4Year;
      });

      if (q1Match && q2Match && q3Match) {
        // Derive Q4 = Annual - Q1 - Q2 - Q3
        const derivedQ4Value = annualMatch.value - q1Match.value - q2Match.value - q3Match.value;

        // Create a synthetic Q4 entry
        const derivedQ4 = {
          value: derivedQ4Value,
          ddate: expectedQ4Date,
          qtrs: 1,
          form: '10-K',
          fy: q4Year,
          fp: 'Q4',
          derived: true,
          derivedFrom: {
            annual: annualMatch.value,
            q1: q1Match.value,
            q2: q2Match.value,
            q3: q3Match.value
          }
        };

        // Add derived Q4 to matched quarters
        matchedQuarters.push({ index: missingQ4Index, data: derivedQ4, derived: true });
        matchedQuarters.sort((a, b) => a.index - b.index);

        const details = matchedQuarters.map(m => m.data);
        const ttmValue = details.reduce((sum, q) => sum + q.value, 0);

        return {
          value: ttmValue,
          date: details[0].ddate,
          method: 'sum-4Q',
          form: [...new Set(details.map(q => q.form))].join('+'),
          details
        };
      }
    }
  }

  // Fallback: check if there's an annual value that covers this period
  if (annualValues.length > 0) {
    const refYear = parseInt(refDate.slice(0, 4));
    const refMonth = parseInt(refDate.slice(4, 6));

    // If refDate is in Q4 (Oct-Dec), look for FY ending that year
    // Otherwise, look for FY ending previous year
    const targetFY = refMonth >= 10 ? refYear : refYear - (refMonth <= 3 ? 1 : 0);

    const annualMatch = annualValues.find(a => {
      const aYear = parseInt(a.ddate.slice(0, 4));
      return aYear === targetFY || aYear === targetFY - 1;
    });

    if (annualMatch) {
      // Check if annual data is reasonably current (within 6 months of refDate)
      const annualYear = parseInt(annualMatch.ddate.slice(0, 4));
      const annualMonth = parseInt(annualMatch.ddate.slice(4, 6));
      const monthsDiff = (refYear - annualYear) * 12 + (refMonth - annualMonth);

      if (monthsDiff <= 6) {
        return {
          value: annualMatch.value,
          date: annualMatch.ddate,
          method: matchedQuarters.length === 0 ? 'annual' : 'annual-fallback',
          form: annualMatch.form,
          details: [annualMatch],
          isAnnualFallback: true  // Flag to alert in results table
        };
      }
    }
  }

  return null;
}

/**
 * Get shares outstanding (from us-gaap or DEI namespace)
 *
 * Prefer US-GAAP (balance sheet) as it's quarter-end and matches other metrics.
 * DEI (cover page) shows shares as of a date ~1 month after quarter-end.
 */
function getSharesOutstanding(concepts) {
  // Try us-gaap namespace first (balance sheet - quarter-end, matches other metrics)
  const gaapShares = getLatestPointInTime(concepts['CommonStockSharesOutstanding']);
  if (gaapShares) return gaapShares;

  // Fallback to DEI namespace (cover page - better coverage but post-quarter date)
  return getLatestPointInTime(concepts['EntityCommonStockSharesOutstanding']);
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
  const sharesData = getSharesOutstanding(concepts);

  // Averages for Return Ratios (FFIEC/Investor Standard)
  const avgAssets = getAveragePointInTime(concepts['Assets']);
  const avgEquity = getAveragePointInTime(concepts['StockholdersEquity']) ||
                    getAveragePointInTime(concepts['StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest']);

  // Determine reference date from balance sheet for TTM calculations
  // All TTM data must be anchored to this date
  const refDate = assets?.ddate || equity?.ddate;

  // Income Statement (TTM) - anchored to balance sheet date
  const interestIncome = getTTMValueForPeriod(concepts['InterestIncome'], refDate) ||
                         getTTMValueForPeriod(concepts['InterestAndDividendIncomeOperating'], refDate);
  const interestExpense = getTTMValueForPeriod(concepts['InterestExpense'], refDate);
  const netInterestIncome = getTTMValueForPeriod(concepts['InterestIncomeExpenseNet'], refDate) ||
                            getTTMValueForPeriod(concepts['NetInterestIncome'], refDate);
  const noninterestIncome = getTTMValueForPeriod(concepts['NoninterestIncome'], refDate);
  const noninterestExpense = getTTMValueForPeriod(concepts['NoninterestExpense'], refDate) ||
                             getTTMValueForPeriod(concepts['OperatingExpenses'], refDate);
  const provisionForCreditLosses = getTTMValueForPeriod(concepts['ProvisionForLoanLeaseAndOtherLosses'], refDate) ||
                                    getTTMValueForPeriod(concepts['ProvisionForLoanAndLeaseLosses'], refDate) ||
                                    getTTMValueForPeriod(concepts['ProvisionForCreditLosses'], refDate) ||
                                    getTTMValueForPeriod(concepts['CreditLossExpense'], refDate);
  const preTaxIncome = getTTMValueForPeriod(concepts['IncomeLossFromContinuingOperationsBeforeIncomeTaxesExtraordinaryItemsNoncontrollingInterest'], refDate) ||
                       getTTMValueForPeriod(concepts['IncomeLossFromContinuingOperationsBeforeIncomeTaxes'], refDate);
  const netIncome = getTTMValueForPeriod(concepts['NetIncomeLoss'], refDate) ||
                    getTTMValueForPeriod(concepts['ProfitLoss'], refDate);
  const netIncomeToCommonDirect = getTTMValueForPeriod(concepts['NetIncomeLossAvailableToCommonStockholdersBasic'], refDate);
  const preferredDividends = getTTMValueForPeriod(concepts['PreferredStockDividendsAndOtherAdjustments'], refDate) ||
                              getTTMValueForPeriod(concepts['DividendsPreferredStock'], refDate);
  const eps = getTTMValueForPeriod(concepts['EarningsPerShareBasic'], refDate) ||
              getTTMValueForPeriod(concepts['EarningsPerShareDiluted'], refDate);

  // Dividends - anchored to balance sheet date
  // Only use direct common stock per-share values to avoid including preferred dividends
  const dps = getTTMValueForPeriod(concepts['CommonStockDividendsPerShareDeclared'], refDate) ||
              getTTMValueForPeriod(concepts['CommonStockDividendsPerShareCashPaid'], refDate);

  // Extract values
  const totalAssets = assets?.value;
  const cashAndCashEquivalentsValue = cashAndCashEquivalents?.value;
  const loansValue = loans?.value;
  const totalLiabilities = liabilities?.value;
  const totalDeposits = deposits?.value;
  const totalEquity = equity?.value;
  const preferredValue = preferredStock?.value || 0;
  const sharesOutstanding = sharesData?.value;

  // Extract TTM values (already validated for correct period by getTTMValueForPeriod)
  // Track which fields used annual fallback for alerting in results table
  const dataDate = refDate;
  const annualFallbackFields = [];

  const ttmInterestIncome = interestIncome?.value;
  if (interestIncome?.isAnnualFallback) annualFallbackFields.push('interestIncome');

  const ttmInterestExpense = interestExpense?.value;
  if (interestExpense?.isAnnualFallback) annualFallbackFields.push('interestExpense');

  const ttmNii = netInterestIncome?.value;
  if (netInterestIncome?.isAnnualFallback) annualFallbackFields.push('netInterestIncome');

  const ttmNonintIncome = noninterestIncome?.value;
  if (noninterestIncome?.isAnnualFallback) annualFallbackFields.push('noninterestIncome');

  const ttmNonintExpense = noninterestExpense?.value;
  if (noninterestExpense?.isAnnualFallback) annualFallbackFields.push('noninterestExpense');

  const ttmProvision = provisionForCreditLosses?.value;
  if (provisionForCreditLosses?.isAnnualFallback) annualFallbackFields.push('provision');

  const ttmPreTaxIncome = preTaxIncome?.value;
  if (preTaxIncome?.isAnnualFallback) annualFallbackFields.push('preTaxIncome');

  const ttmNetIncome = netIncome?.value;
  if (netIncome?.isAnnualFallback) annualFallbackFields.push('netIncome');

  if (preferredDividends?.isAnnualFallback) annualFallbackFields.push('preferredDividends');

  // NI to Common: use direct value, or derive from Net Income minus Preferred Dividends
  let ttmNetIncomeToCommon = netIncomeToCommonDirect?.value ?? null;
  if (ttmNetIncomeToCommon === null && ttmNetIncome !== null && preferredDividends?.value != null) {
    // Derive NI to Common = Net Income - Preferred Dividends
    ttmNetIncomeToCommon = ttmNetIncome - preferredDividends.value;
  }
  // Validation: NI to Common should not exceed Net Income
  if (ttmNetIncomeToCommon !== null && ttmNetIncome !== null && ttmNetIncomeToCommon > ttmNetIncome) {
    ttmNetIncomeToCommon = null;
  }
  if (netIncomeToCommonDirect?.isAnnualFallback && ttmNetIncomeToCommon !== null) annualFallbackFields.push('netIncomeToCommon');

  const ttmEps = eps?.value;
  if (eps?.isAnnualFallback) annualFallbackFields.push('eps');

  const ttmDps = dps?.value;
  if (dps?.isAnnualFallback) annualFallbackFields.push('dividends');

  // Derived values
  // BVPS = Common Equity / Shares Outstanding (exclude preferred stock)
  const commonEquity = totalEquity ? totalEquity - preferredValue : null;
  const bvps = commonEquity && sharesOutstanding ? commonEquity / sharesOutstanding : null;
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
      NetIncomeLossAvailableToCommonStockholdersBasic: netIncomeToCommonDirect,
      EarningsPerShareBasic: eps
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
      ttmNetIncomeToCommon,
      ttmEps,
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
      annualFallbackFields: annualFallbackFields.length > 0 ? annualFallbackFields : null,
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
 * Show help message
 */
function showHelp() {
  console.log(`
SEC Company Facts API Processor

Fetches financial data for banks using the SEC EDGAR Company Facts API.

USAGE:
  node scripts/fetch-sec-company-facts.cjs [OPTIONS]

OPTIONS:
  --help, -h       Show this help message
  --bulk           Use companyfacts.zip bulk download (faster for many banks)
  --skip-download  Skip downloading, use existing cached data

ENVIRONMENT VARIABLES:
  SEC_USER_AGENT   Required. Your contact info for SEC API access.
                   Example: "Company Name admin@example.com"

EXAMPLES:
  # Fetch data using per-company API calls
  export SEC_USER_AGENT="My App admin@example.com"
  node scripts/fetch-sec-company-facts.cjs

  # Use bulk download (recommended for full refresh)
  node scripts/fetch-sec-company-facts.cjs --bulk

OUTPUT:
  public/data/banks.json           Calculated metrics
  public/data/sec-raw-data.json    Summary raw data for audit

DATA SOURCE:
  https://data.sec.gov/api/xbrl/companyfacts/
  https://www.sec.gov/Archives/edgar/daily-index/xbrl/companyfacts.zip
`);
}

/**
 * Main function
 */
async function main() {
  if (HELP) {
    showHelp();
    process.exit(0);
  }

  console.log('═'.repeat(80));
  console.log('SEC COMPANY FACTS API PROCESSOR');
  console.log('═'.repeat(80));
  console.log('');
  console.log('Data Source: SEC EDGAR Company Facts API');
  console.log('Includes: DEI namespace (EntityCommonStockSharesOutstanding)');
  console.log('');
  console.log(`Started: ${new Date().toISOString()}`);
  console.log('');

  // Validate environment
  getUserAgent();

  // Create directories
  if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
  }
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Load bank list
  console.log('Loading bank list...');
  const bankList = loadBankList();
  console.log(`  Found ${bankList.length} banks`);

  if (bankList.length === 0) {
    console.error('No banks found. Ensure bank-list.json exists.');
    process.exit(1);
  }

  // Build CIK lookup
  const bankByCik = new Map();
  bankList.forEach(bank => {
    if (bank.cik) {
      bankByCik.set(bank.cik.padStart(10, '0'), bank);
    }
  });
  console.log(`  ${bankByCik.size} unique CIKs`);

  // Determine data source
  let bulkExtractDir = null;
  if (USE_BULK && !SKIP_DOWNLOAD) {
    bulkExtractDir = await downloadBulkCompanyFacts();
  } else if (USE_BULK && SKIP_DOWNLOAD) {
    bulkExtractDir = path.join(TEMP_DIR, 'companyfacts');
    if (!fs.existsSync(bulkExtractDir)) {
      console.error('Bulk data not found. Run without --skip-download first.');
      process.exit(1);
    }
  }

  // Process each bank
  console.log('\nProcessing banks...');
  console.log(`  Active filer threshold: ${CONFIG.activeFilerThresholdDays} days`);
  const results = [];
  const rawDataStore = {};
  let processed = 0;
  let errors = 0;
  let bankIndex = 0;
  let inactiveFilersFiltered = 0;

  for (const [cik, bankInfo] of bankByCik) {
    try {
      // Fetch or load company facts
      let companyFacts;
      if (bulkExtractDir) {
        companyFacts = loadCompanyFactsFromBulk(bulkExtractDir, cik);
      } else {
        // Rate limiting for API calls
        if (processed > 0) {
          await new Promise(resolve => setTimeout(resolve, CONFIG.api.rateLimitMs));
        }
        companyFacts = await fetchCompanyFacts(cik);
      }

      if (!companyFacts) {
        processed++;
        continue;
      }

      // Transform to our format
      const bankData = transformCompanyFacts(companyFacts, bankInfo);

      if (Object.keys(bankData.concepts).length === 0) {
        processed++;
        continue;
      }

      // Calculate metrics
      const { metrics, rawData } = calculateBankMetrics(bankData);
      const validatedMetrics = applyDataQualityValidation(metrics);

      // Filter out inactive filers (dataDate older than threshold from refresh date)
      if (validatedMetrics.dataDate) {
        const dataDate = new Date(validatedMetrics.dataDate);
        const refreshDate = new Date();
        const daysSinceReporting = Math.floor((refreshDate - dataDate) / (1000 * 60 * 60 * 24));

        if (daysSinceReporting > CONFIG.activeFilerThresholdDays) {
          // Skip inactive filers
          inactiveFilersFiltered++;
          processed++;
          continue;
        }
      } else {
        // Skip banks without a dataDate (also considered inactive)
        inactiveFilersFiltered++;
        processed++;
        continue;
      }

      validatedMetrics.id = `bank-${bankIndex++}`;

      results.push(validatedMetrics);
      rawDataStore[cik] = {
        ticker: bankInfo.ticker,
        companyName: bankData.companyName,
        rawData
      };

      processed++;
      if (processed % 50 === 0) {
        console.log(`  Processed ${processed}/${bankByCik.size} banks...`);
      }
    } catch (error) {
      console.error(`  Error processing ${bankInfo.ticker || cik}: ${error.message}`);
      errors++;
      processed++;
    }
  }

  console.log(`  Total: ${results.length} active filers with data`);
  console.log(`  Inactive filers filtered: ${inactiveFilersFiltered} (reporting date > ${CONFIG.activeFilerThresholdDays} days old)`);
  console.log(`  Errors: ${errors}`);

  // Sort by ticker
  results.sort((a, b) => (a.ticker || '').localeCompare(b.ticker || ''));

  // Save calculated metrics
  const banksOutputPath = path.join(OUTPUT_DIR, 'banks.json');
  fs.writeFileSync(banksOutputPath, JSON.stringify(results, null, 2));
  console.log(`\nSaved metrics: ${banksOutputPath}`);

  // Save raw data summary
  const rawDataOutputPath = path.join(OUTPUT_DIR, 'sec-raw-data.json');
  fs.writeFileSync(rawDataOutputPath, JSON.stringify({
    metadata: {
      source: 'SEC Company Facts API',
      url: 'https://data.sec.gov/api/xbrl/companyfacts/',
      method: USE_BULK ? 'bulk-download' : 'per-company-api',
      generatedAt: new Date().toISOString(),
      bankCount: Object.keys(rawDataStore).length,
      activeFilerThresholdDays: CONFIG.activeFilerThresholdDays,
      inactiveFilersExcluded: inactiveFilersFiltered
    },
    banks: rawDataStore
  }, null, 2));
  console.log(`Saved raw data: ${rawDataOutputPath}`);

  // Clean up temp directory to free disk space
  if (fs.existsSync(TEMP_DIR)) {
    console.log('\nCleaning up temp directory...');
    fs.rmSync(TEMP_DIR, { recursive: true, force: true });
    console.log('  Cleanup complete.');
  }

  // Summary
  console.log('\n' + '═'.repeat(80));
  console.log('SUMMARY');
  console.log('═'.repeat(80));
  console.log(`Active filers included: ${results.length}`);
  console.log(`Inactive filers excluded: ${inactiveFilersFiltered} (reporting date > ${CONFIG.activeFilerThresholdDays} days old)`);
  console.log(`Data quality issues: ${results.filter(r => r.hasDataQualityIssues).length} banks`);
  console.log(`Shares outstanding coverage: ${results.filter(r => r.sharesOutstanding).length}/${results.length}`);

  // Show validation examples
  const majorBanks = ['ALLY', 'JPM', 'BAC', 'WFC', 'C', 'USB'];
  const foundMajorBanks = results.filter(r => majorBanks.includes(r.ticker));

  if (foundMajorBanks.length > 0) {
    console.log('\nMAJOR BANK VALIDATION:');
    console.log('─'.repeat(80));
    console.log(`${'Ticker'.padEnd(8)} ${'Total Assets'.padStart(18)} ${'Shares'.padStart(16)} ${'BVPS'.padStart(10)} ${'Data Date'.padStart(12)}`);
    console.log('─'.repeat(80));

    foundMajorBanks.forEach(bank => {
      const assets = bank.totalAssets ? `$${(bank.totalAssets / 1e9).toFixed(1)}B` : 'N/A';
      const shares = bank.sharesOutstanding ? `${(bank.sharesOutstanding / 1e6).toFixed(1)}M` : 'N/A';
      const bvps = bank.bvps ? `$${bank.bvps.toFixed(2)}` : 'N/A';
      const dataDate = bank.dataDate || 'N/A';
      const flag = bank.hasDataQualityIssues ? ' ⚠' : ' ✓';

      console.log(`${bank.ticker.padEnd(8)} ${assets.padStart(18)} ${shares.padStart(16)} ${bvps.padStart(10)} ${dataDate.padStart(12)}${flag}`);
    });
  }

  console.log(`\nCompleted: ${new Date().toISOString()}`);
  console.log('═'.repeat(80));
}

// Run
if (require.main === module) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = {
  getTTMValue,
  getTTMValueForPeriod,
  getExpectedQuarterEnds,
  getLatestPointInTime,
  getAveragePointInTime,
  getSharesOutstanding,
  inferPeriodLength,
  transformCompanyFacts,
};

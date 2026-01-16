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
 * Load bank list to get CIKs
 */
function loadBankList() {
  const bankListPath = path.join(OUTPUT_DIR, 'bank-list.json');

  if (!fs.existsSync(bankListPath)) {
    console.error('Bank list not found at:', bankListPath);
    console.error('Creating empty bank list. Run discover-banks workflow first for full data.');
    return [];
  }

  const data = JSON.parse(fs.readFileSync(bankListPath, 'utf8'));
  return data.banks || [];
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
 * Get shares outstanding (from DEI or us-gaap namespace)
 */
function getSharesOutstanding(concepts) {
  // Try DEI namespace first (cover page - higher coverage)
  const deiShares = getLatestPointInTime(concepts['EntityCommonStockSharesOutstanding']);
  if (deiShares) return deiShares;

  // Fallback to us-gaap namespace (balance sheet)
  return getLatestPointInTime(concepts['CommonStockSharesOutstanding']);
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
  const results = [];
  const rawDataStore = {};
  let processed = 0;
  let errors = 0;
  let bankIndex = 0;

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

  console.log(`  Total: ${results.length} banks with data (${errors} errors)`);

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
      bankCount: Object.keys(rawDataStore).length
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
  console.log(`Banks processed: ${results.length}`);
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
  getLatestPointInTime,
  getAveragePointInTime,
  getSharesOutstanding,
  inferPeriodLength,
  transformCompanyFacts,
};

#!/usr/bin/env node
/**
 * SEC Financial Statement Data Sets Fetcher
 *
 * Downloads and processes the official SEC Financial Statement Data Sets
 * from: https://www.sec.gov/data-research/sec-markets-data/financial-statement-data-sets
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

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

// Parse command line arguments
const args = process.argv.slice(2);
const LOCAL_ONLY = args.includes('--local-only');
const HELP = args.includes('--help') || args.includes('-h');

// Configuration
const CONFIG = {
  edgarUserAgent: process.env.EDGAR_USER_AGENT || 'Bank-Analyzer github-actions@example.com',

  // SEC Financial Statement Data Sets URL pattern
  // https://www.sec.gov/files/dera/data/financial-statement-data-sets/2024q4.zip
  fsDataSetsBaseUrl: 'https://www.sec.gov/files/dera/data/financial-statement-data-sets',

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
    'InterestBearingDepositsInBanks',
    'InterestBearingDepositsInBanksAndOtherFinancialInstitutions',
    // Securities
    'AvailableForSaleSecuritiesDebtSecurities',
    'AvailableForSaleSecurities',
    'AvailableForSaleSecuritiesDebt',
    'HeldToMaturitySecurities',
    'HeldToMaturitySecuritiesAmortizedCostAfterAllowanceForCreditLoss',
    // Loans
    'LoansAndLeasesReceivableNetReportedAmount',
    'LoansAndLeasesReceivableNetOfDeferredIncome',
    'FinancingReceivableExcludingAccruedInterestAfterAllowanceForCreditLoss',
    'NotesReceivableNet',
    // Allowance for Credit Losses
    'AllowanceForLoanAndLeaseLosses',
    'FinancingReceivableAllowanceForCreditLosses',
    'AllowanceForCreditLossesOnFinancingReceivables',
    // Fixed Assets
    'PremisesAndEquipmentNet',
    'PropertyPlantAndEquipmentNet',
    // Goodwill - multiple tag variants used by different companies
    'Goodwill',
    'GoodwillAndIntangibleAssetsNet',
    // Intangibles - multiple tag variants used by different companies
    'IntangibleAssetsNetExcludingGoodwill',
    'IntangibleAssetsNetIncludingGoodwill',
    'FiniteLivedIntangibleAssetsNet',
    'IndefiniteLivedIntangibleAssetsExcludingGoodwill',
    'OtherIntangibleAssetsNet',

    // Balance Sheet - Liabilities & Equity
    'Liabilities',
    'Deposits',
    'DepositsDomestic',
    'ShortTermBorrowings',
    'LongTermDebt',
    'LongTermDebtNoncurrent',
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
    tceToTa: { min: 0, max: 40, unit: '%' },
    roe: { min: -100, max: 100, unit: '%' },
    roaa: { min: -10, max: 10, unit: '%' },
  },
};

// Temp directory for downloaded files
const TEMP_DIR = path.join(__dirname, '..', '.sec-data-cache');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'data');

/**
 * Make HTTPS request with proper headers
 */
function httpsGet(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const reqOptions = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      headers: {
        'User-Agent': CONFIG.edgarUserAgent,
        'Accept-Encoding': 'gzip, deflate',
        ...options.headers
      }
    };

    const req = https.get(reqOptions, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        // Follow redirect
        httpsGet(res.headers.location, options).then(resolve).catch(reject);
        return;
      }

      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
        return;
      }

      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    });

    req.on('error', reject);
    req.setTimeout(60000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

/**
 * Download a file to disk
 */
async function downloadFile(url, destPath) {
  console.log(`  Downloading: ${url}`);
  const data = await httpsGet(url);
  fs.writeFileSync(destPath, data);
  console.log(`  Saved: ${destPath} (${data.length} bytes)`);
  return destPath;
}

/**
 * Fetch the SEC listing page and parse available quarterly datasets
 * This is more robust than assuming URL patterns, as SEC may change URLs
 * and we can know exactly which quarters are available.
 */
async function fetchAvailableQuartersFromSecPage() {
  const listingUrl = 'https://www.sec.gov/data-research/sec-markets-data/financial-statement-data-sets';
  console.log(`\nFetching SEC listing page to discover available quarters...`);
  console.log(`  URL: ${listingUrl}`);

  try {
    const html = await httpsGet(listingUrl);
    const htmlStr = html.toString();

    // Parse HTML for links to quarterly ZIP files
    // Matches patterns like: href="/files/dera/data/financial-statement-data-sets/2025q3.zip"
    // or absolute URLs like: href="https://www.sec.gov/files/dera/data/financial-statement-data-sets/2025q3.zip"
    const zipLinkPattern = /href="([^"]*\/(\d{4})q([1-4])\.zip)"/gi;
    const matches = [...htmlStr.matchAll(zipLinkPattern)];

    if (matches.length === 0) {
      console.warn('  No quarterly ZIP links found on SEC page. Falling back to URL pattern.');
      return null;
    }

    const quarters = matches.map(match => {
      const href = match[1];
      const year = parseInt(match[2]);
      const quarter = parseInt(match[3]);
      // Convert relative URLs to absolute
      const url = href.startsWith('http') ? href : `https://www.sec.gov${href}`;

      return {
        url,
        year,
        quarter,
        period: `${year}Q${quarter}`
      };
    });

    // Sort by year and quarter descending (most recent first)
    quarters.sort((a, b) => {
      if (b.year !== a.year) return b.year - a.year;
      return b.quarter - a.quarter;
    });

    // Remove duplicates (same period)
    const seen = new Set();
    const unique = quarters.filter(q => {
      if (seen.has(q.period)) return false;
      seen.add(q.period);
      return true;
    });

    console.log(`  Found ${unique.length} quarterly datasets on SEC page`);
    console.log(`  Most recent: ${unique[0]?.period || 'none'}`);
    console.log(`  Oldest: ${unique[unique.length - 1]?.period || 'none'}`);

    return unique;
  } catch (error) {
    console.error(`  Failed to fetch SEC listing page: ${error.message}`);
    console.log('  Falling back to URL pattern approach.');
    return null;
  }
}

/**
 * Generate quarterly dataset URLs using assumed pattern (fallback)
 */
function generateQuarterlyUrls(numQuarters) {
  const urls = [];
  const now = new Date();
  let year = now.getFullYear();
  let quarter = Math.ceil((now.getMonth() + 1) / 3);

  // Go back one quarter since current quarter may not be available yet
  quarter--;
  if (quarter === 0) {
    quarter = 4;
    year--;
  }

  for (let i = 0; i < numQuarters; i++) {
    urls.push({
      url: `${CONFIG.fsDataSetsBaseUrl}/${year}q${quarter}.zip`,
      year,
      quarter,
      period: `${year}Q${quarter}`
    });

    quarter--;
    if (quarter === 0) {
      quarter = 4;
      year--;
    }
  }

  return urls;
}

/**
 * Get list of available quarterly datasets
 * First tries to scrape SEC listing page for accurate URLs,
 * falls back to URL pattern if that fails.
 */
async function getQuarterlyDatasetUrls(numQuarters) {
  // Try to get actual available quarters from SEC page
  const availableQuarters = await fetchAvailableQuartersFromSecPage();

  if (availableQuarters && availableQuarters.length > 0) {
    // Use the most recent quarters from the listing page
    const selected = availableQuarters.slice(0, numQuarters);
    console.log(`\nUsing ${selected.length} quarters from SEC listing page:`);
    selected.forEach(q => console.log(`  - ${q.period}: ${q.url}`));
    return selected;
  }

  // Fallback to generated URLs
  console.log('\nUsing fallback URL pattern (SEC listing page unavailable)');
  const generated = generateQuarterlyUrls(numQuarters);
  generated.forEach(q => console.log(`  - ${q.period}: ${q.url}`));
  return generated;
}

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
 * Process a quarterly dataset
 */
async function processQuarterlyDataset(datasetInfo, bankCiks) {
  const { url, period, zipPath: providedZipPath } = datasetInfo;

  // Use provided zipPath (local-only mode) or construct from URL
  let zipPath;
  if (providedZipPath) {
    zipPath = providedZipPath;
  } else if (url) {
    const zipFileName = path.basename(url);
    zipPath = path.join(TEMP_DIR, zipFileName);
  } else {
    console.error(`  No URL or zipPath for ${period}`);
    return null;
  }

  const extractDir = path.join(TEMP_DIR, period);

  console.log(`\nProcessing ${period}...`);

  // Download if not already cached (skip in local-only mode)
  if (!fs.existsSync(zipPath)) {
    if (LOCAL_ONLY) {
      console.error(`  ZIP file not found: ${zipPath}`);
      return null;
    }
    try {
      await downloadFile(url, zipPath);
    } catch (error) {
      console.error(`  Failed to download ${url}: ${error.message}`);
      return null;
    }
  } else {
    console.log(`  Using cached: ${zipPath}`);
  }

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
 * Get TTM value by summing quarters or using annual
 */
function getTTMValue(conceptData) {
  if (!conceptData || conceptData.length === 0) return null;

  // Sort by date descending
  const sorted = [...conceptData]
    .filter(d => d.form === '10-K' || d.form === '10-Q')
    .sort((a, b) => b.ddate.localeCompare(a.ddate));

  if (sorted.length === 0) return null;

  const mostRecent = sorted[0];

  // If most recent is annual (10-K with qtrs=4), use it directly
  if (mostRecent.form === '10-K' && mostRecent.qtrs === 4) {
    return {
      value: mostRecent.value,
      date: mostRecent.ddate,
      method: 'annual',
      form: '10-K',
      details: [mostRecent]
    };
  }

  // Try to sum 4 quarters
  const quarterlyValues = sorted
    .filter(d => d.form === '10-Q' && d.qtrs === 1)
    .slice(0, 4);

  if (quarterlyValues.length >= 4) {
    const ttmValue = quarterlyValues.reduce((sum, q) => sum + q.value, 0);
    return {
      value: ttmValue,
      date: quarterlyValues[0].ddate,
      method: 'sum-4Q',
      form: '10-Q',
      details: quarterlyValues
    };
  }

  // Fallback to most recent annual
  const annualValues = sorted.filter(d => d.form === '10-K' && d.qtrs === 4);
  if (annualValues.length > 0) {
    return {
      value: annualValues[0].value,
      date: annualValues[0].ddate,
      method: 'annual-fallback',
      form: '10-K',
      details: [annualValues[0]]
    };
  }

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
  const cashAndDueFromBanks = getLatestPointInTime(concepts['CashAndDueFromBanks']) ||
                              getLatestPointInTime(concepts['CashAndCashEquivalentsAtCarryingValue']);
  const interestBearingDepositsInBanks = getLatestPointInTime(concepts['InterestBearingDepositsInBanks']) ||
                                          getLatestPointInTime(concepts['InterestBearingDepositsInBanksAndOtherFinancialInstitutions']);
  const afsSecurities = getLatestPointInTime(concepts['AvailableForSaleSecuritiesDebtSecurities']) ||
                        getLatestPointInTime(concepts['AvailableForSaleSecurities']) ||
                        getLatestPointInTime(concepts['AvailableForSaleSecuritiesDebt']);
  const htmSecurities = getLatestPointInTime(concepts['HeldToMaturitySecurities']) ||
                        getLatestPointInTime(concepts['HeldToMaturitySecuritiesAmortizedCostAfterAllowanceForCreditLoss']);
  const loans = getLatestPointInTime(concepts['LoansAndLeasesReceivableNetReportedAmount']) ||
                getLatestPointInTime(concepts['LoansAndLeasesReceivableNetOfDeferredIncome']) ||
                getLatestPointInTime(concepts['FinancingReceivableExcludingAccruedInterestAfterAllowanceForCreditLoss']) ||
                getLatestPointInTime(concepts['NotesReceivableNet']);
  const allowanceForCreditLosses = getLatestPointInTime(concepts['AllowanceForLoanAndLeaseLosses']) ||
                                    getLatestPointInTime(concepts['FinancingReceivableAllowanceForCreditLosses']) ||
                                    getLatestPointInTime(concepts['AllowanceForCreditLossesOnFinancingReceivables']);
  const premisesAndEquipment = getLatestPointInTime(concepts['PremisesAndEquipmentNet']) ||
                               getLatestPointInTime(concepts['PropertyPlantAndEquipmentNet']);
  // Goodwill - try multiple tag variants
  const goodwill = getLatestPointInTime(concepts['Goodwill']) ||
                   getLatestPointInTime(concepts['GoodwillAndIntangibleAssetsNet']);
  // Intangibles - try multiple tag variants
  const intangibles = getLatestPointInTime(concepts['IntangibleAssetsNetExcludingGoodwill']) ||
                      getLatestPointInTime(concepts['IntangibleAssetsNetIncludingGoodwill']) ||
                      getLatestPointInTime(concepts['FiniteLivedIntangibleAssetsNet']) ||
                      getLatestPointInTime(concepts['IndefiniteLivedIntangibleAssetsExcludingGoodwill']) ||
                      getLatestPointInTime(concepts['OtherIntangibleAssetsNet']);

  // ==========================================================================
  // BALANCE SHEET - LIABILITIES & EQUITY (point-in-time)
  // ==========================================================================
  const liabilities = getLatestPointInTime(concepts['Liabilities']);
  const deposits = getLatestPointInTime(concepts['Deposits']) ||
                   getLatestPointInTime(concepts['DepositsDomestic']);
  const shortTermBorrowings = getLatestPointInTime(concepts['ShortTermBorrowings']);
  const longTermDebt = getLatestPointInTime(concepts['LongTermDebt']) ||
                       getLatestPointInTime(concepts['LongTermDebtNoncurrent']);
  const equity = getLatestPointInTime(concepts['StockholdersEquity']) ||
                 getLatestPointInTime(concepts['StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest']);
  const preferredStock = getLatestPointInTime(concepts['PreferredStockValue']) ||
                         getLatestPointInTime(concepts['PreferredStockValueOutstanding']);
  const sharesData = getSharesOutstanding(concepts['CommonStockSharesOutstanding']);

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
  const cashAndDueFromBanksValue = cashAndDueFromBanks?.value;
  const interestBearingDepositsInBanksValue = interestBearingDepositsInBanks?.value;
  const afsSecuritiesValue = afsSecurities?.value;
  const htmSecuritiesValue = htmSecurities?.value;
  const loansValue = loans?.value;
  const allowanceForCreditLossesValue = allowanceForCreditLosses?.value;
  const premisesAndEquipmentValue = premisesAndEquipment?.value;
  const goodwillValue = goodwill?.value || 0;
  const intangiblesValue = intangibles?.value || 0;

  // Balance Sheet - Liabilities & Equity
  const totalLiabilities = liabilities?.value;
  const totalDeposits = deposits?.value;
  const shortTermBorrowingsValue = shortTermBorrowings?.value;
  const longTermDebtValue = longTermDebt?.value;
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
  // DERIVED VALUES
  // ==========================================================================
  const tangibleBookValue = totalEquity ? totalEquity - goodwillValue - intangiblesValue : null;
  const tangibleCommonEquity = totalEquity ? totalEquity - preferredValue - goodwillValue - intangiblesValue : null;
  const tangibleAssets = totalAssets ? totalAssets - goodwillValue - intangiblesValue : null;

  // Per-share metrics
  const bvps = totalEquity && sharesOutstanding ? totalEquity / sharesOutstanding : null;
  const tbvps = tangibleCommonEquity && sharesOutstanding ? tangibleCommonEquity / sharesOutstanding : null;

  // Profitability ratios
  const roe = ttmNetIncome && totalEquity ? (ttmNetIncome / totalEquity) * 100 : null;
  const rota = ttmNetIncome && tangibleAssets ? (ttmNetIncome / tangibleAssets) * 100 : null;
  const roaa = ttmNetIncome && totalAssets ? (ttmNetIncome / totalAssets) * 100 : null;
  const rotce = ttmNetIncome && tangibleCommonEquity ? (ttmNetIncome / tangibleCommonEquity) * 100 : null;
  const niTbv = ttmNetIncome && tangibleBookValue ? ttmNetIncome / tangibleBookValue : null;

  // Bank-specific ratios
  const totalRevenue = (ttmNii || 0) + (ttmNonintIncome || 0);
  const efficiencyRatio = ttmNonintExpense && totalRevenue > 0 ? (ttmNonintExpense / totalRevenue) * 100 : null;
  const depositsToAssets = totalDeposits && totalAssets ? (totalDeposits / totalAssets) * 100 : null;
  const equityToAssets = totalEquity && totalAssets ? (totalEquity / totalAssets) * 100 : null;
  const tceToTa = tangibleCommonEquity && tangibleAssets ? (tangibleCommonEquity / tangibleAssets) * 100 : null;
  const loansToAssets = loansValue && totalAssets ? (loansValue / totalAssets) * 100 : null;
  const loansToDeposits = loansValue && totalDeposits ? (loansValue / totalDeposits) * 100 : null;
  const aclToLoans = allowanceForCreditLossesValue && loansValue ? (allowanceForCreditLossesValue / loansValue) * 100 : null;

  // Net Interest Margin (NIM) = NII / Average Earning Assets
  const earningAssets = (loansValue || 0) + (afsSecuritiesValue || 0) + (htmSecuritiesValue || 0) + (interestBearingDepositsInBanksValue || 0);
  const netInterestMargin = ttmNii && earningAssets > 0 ? (ttmNii / earningAssets) * 100 : null;

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
      CashAndDueFromBanks: cashAndDueFromBanks,
      InterestBearingDepositsInBanks: interestBearingDepositsInBanks,
      AvailableForSaleSecurities: afsSecurities,
      HeldToMaturitySecurities: htmSecurities,
      LoansAndLeasesReceivable: loans,
      AllowanceForLoanAndLeaseLosses: allowanceForCreditLosses,
      PremisesAndEquipmentNet: premisesAndEquipment,
      Goodwill: goodwill,
      IntangibleAssetsNetExcludingGoodwill: intangibles,
      Liabilities: liabilities,
      Deposits: deposits,
      ShortTermBorrowings: shortTermBorrowings,
      LongTermDebt: longTermDebt,
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
      cashAndDueFromBanks: cashAndDueFromBanksValue,
      interestBearingDepositsInBanks: interestBearingDepositsInBanksValue,
      afsSecurities: afsSecuritiesValue,
      htmSecurities: htmSecuritiesValue,
      loans: loansValue,
      allowanceForCreditLosses: allowanceForCreditLossesValue,
      premisesAndEquipment: premisesAndEquipmentValue,
      goodwill: goodwillValue,
      intangibles: intangiblesValue,
      tangibleAssets,

      // Balance Sheet - Liabilities & Equity
      totalLiabilities,
      totalDeposits,
      shortTermBorrowings: shortTermBorrowingsValue,
      longTermDebt: longTermDebtValue,
      totalEquity,
      preferredStock: preferredValue,
      sharesOutstanding,
      tangibleBookValue,
      tangibleCommonEquity,

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
      tbvps: tbvps ? parseFloat(tbvps.toFixed(4)) : null,

      // Profitability ratios
      roe: roe ? parseFloat(roe.toFixed(4)) : null,
      rota: rota ? parseFloat(rota.toFixed(4)) : null,
      roaa: roaa ? parseFloat(roaa.toFixed(4)) : null,
      rotce: rotce ? parseFloat(rotce.toFixed(4)) : null,
      niTBV: niTbv ? parseFloat(niTbv.toFixed(4)) : null,

      // Bank ratios
      efficiencyRatio: efficiencyRatio ? parseFloat(efficiencyRatio.toFixed(2)) : null,
      depositsToAssets: depositsToAssets ? parseFloat(depositsToAssets.toFixed(2)) : null,
      equityToAssets: equityToAssets ? parseFloat(equityToAssets.toFixed(2)) : null,
      tceToTa: tceToTa ? parseFloat(tceToTa.toFixed(2)) : null,
      loansToAssets: loansToAssets ? parseFloat(loansToAssets.toFixed(2)) : null,
      loansToDeposits: loansToDeposits ? parseFloat(loansToDeposits.toFixed(2)) : null,
      aclToLoans: aclToLoans ? parseFloat(aclToLoans.toFixed(2)) : null,
      netInterestMargin: netInterestMargin ? parseFloat(netInterestMargin.toFixed(2)) : null,

      // Graham metrics
      grahamNum: grahamNum ? parseFloat(grahamNum.toFixed(4)) : null,

      // Dividend metrics
      ttmDividendPerShare: ttmDps ? parseFloat(ttmDps.toFixed(4)) : null,
      dividendPayoutRatio: dividendPayoutRatio ? parseFloat(dividendPayoutRatio.toFixed(2)) : null,
      dividendMethod: dps?.method,

      // Metadata
      dataDate: formattedDate,
      ttmMethod: netIncome?.method || 'unknown',
      isStale: formattedDate ? new Date(formattedDate) < new Date('2024-01-01') : true,
      isAnnualized: false,  // FS Data Sets provide actual quarterly data, not annualized

      // Price metrics (null - require external price data)
      price: null,
      marketCap: null,
      pni: null,
      ptbvps: null,
      mktCapSE: null,
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
SEC Financial Statement Data Sets Fetcher

USAGE:
  node scripts/fetch-sec-fs-datasets.cjs [OPTIONS]

OPTIONS:
  --local-only    Process only cached ZIP files (no downloads)
  --help, -h      Show this help message

LOCAL-ONLY MODE:
  When --local-only is used, the script processes ZIP files already in:
    .sec-data-cache/

  To use this mode:
  1. Download ZIP files manually from SEC:
     https://www.sec.gov/files/dera/data/financial-statement-data-sets/2025q4.zip
     https://www.sec.gov/files/dera/data/financial-statement-data-sets/2025q3.zip
     https://www.sec.gov/files/dera/data/financial-statement-data-sets/2025q2.zip
     https://www.sec.gov/files/dera/data/financial-statement-data-sets/2025q1.zip
     https://www.sec.gov/files/dera/data/financial-statement-data-sets/2024q4.zip

  2. Place them in .sec-data-cache/ with exact names:
     .sec-data-cache/2025q4.zip
     .sec-data-cache/2025q3.zip
     .sec-data-cache/2025q2.zip
     .sec-data-cache/2025q1.zip
     .sec-data-cache/2024q4.zip

  3. Run: node scripts/fetch-sec-fs-datasets.cjs --local-only

  4. Commit the output files:
     git add public/data/banks.json public/data/sec-raw-data.json
     git commit -m "Update bank data from SEC FS Data Sets"
     git push
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
  console.log('SEC FINANCIAL STATEMENT DATA SETS FETCHER');
  console.log('═'.repeat(80));
  console.log('');

  if (LOCAL_ONLY) {
    console.log('MODE: Local-only (processing cached ZIP files only)');
  } else {
    console.log('Data Source: https://www.sec.gov/data-research/sec-markets-data/financial-statement-data-sets');
  }
  console.log('This uses ONLY primary financial statement data as rendered by the SEC.');
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

  // Get quarterly dataset URLs
  let datasetUrls;
  if (LOCAL_ONLY) {
    // Find cached ZIP files
    const cached = findCachedQuarters();
    if (cached.length === 0) {
      console.error('\nNo cached ZIP files found in .sec-data-cache/');
      console.error('Download ZIP files from SEC and place them there.');
      console.error('Run with --help for instructions.');
      process.exit(1);
    }
    console.log(`\nFound ${cached.length} cached ZIP files:`);
    cached.forEach(q => console.log(`  - ${q.period}: ${q.zipPath}`));
    datasetUrls = cached.slice(0, CONFIG.quartersToFetch);
  } else {
    // Scrape SEC page for available quarters
    datasetUrls = await getQuarterlyDatasetUrls(CONFIG.quartersToFetch);
  }

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

// Run
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

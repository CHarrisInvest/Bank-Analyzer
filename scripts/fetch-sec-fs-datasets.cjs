#!/usr/bin/env node
/**
 * SEC Financial Statement Data Sets Processor
 *
 * Processes the official SEC Financial Statement Data Sets from local ZIP files.
 * ZIP files are downloaded from GitHub Release assets (tagged "sec-data").
 * See: https://www.sec.gov/data-research/sec-markets-data/financial-statement-data-sets
 *
 * KEY FEATURE: Uses pre.txt (presentation linkbase) to preserve exact
 * "as reported on the face of the financial statement" presentation order,
 * labels, and hierarchy.
 *
 * Data Files in ZIP:
 * - sub.txt: Submission metadata (CIK, company name, filing info)
 * - num.txt: Numeric data (tag, value, date, quarters, coreg, segments)
 * - tag.txt: Tag definitions
 * - pre.txt: Presentation linkbase (statement type, line order, labels, hierarchy)
 *
 * IMPORTANT: The num.txt file contains multiple values for the same concept:
 * - Consolidated entity data (coreg=NULL, segments=NULL) - THIS IS WHAT WE WANT
 * - Co-registrant/subsidiary data (coreg=non-NULL)
 * - Segment breakdown data (segments=non-NULL)
 *
 * We filter for coreg=NULL AND segments=NULL to get consolidated totals only.
 *
 * Output:
 * - public/data/banks.json: Calculated metrics (existing format)
 * - public/data/sec-raw-data.json: Raw SEC values with presentation structure
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

// Parse command line arguments
const args = process.argv.slice(2);
const HELP = args.includes('--help') || args.includes('-h');
const VERBOSE = args.includes('--verbose') || args.includes('-v');

// Configuration
const CONFIG = {
  // Process all available quarters (Q1 2023 onward for full history)
  // Set to 0 to process all available ZIPs
  quartersToFetch: 0,

  // Minimum fiscal year for annual data (10-K filings)
  minFiscalYear: 2022,

  // Minimum quarter for quarterly data
  minQuarterYear: 2023,
  minQuarter: 1,

  // Maximum days since last filing to be considered an active filer
  // Banks with no 10-Q or 10-K filed within this threshold are excluded
  activeFilerThresholdDays: 150,

  // Financial institution SIC codes
  financialInstitutionSicCodes: [
    '6020', '6021', '6022', '6029',  // Commercial Banks
    '6035', '6036',                   // Savings Institutions
    '6710', '6711', '6712',           // Bank Holding Companies
  ],

  // SIC code descriptions for output
  sicDescriptions: {
    '6020': 'Commercial Banks',
    '6021': 'National Commercial Banks',
    '6022': 'State Commercial Banks',
    '6029': 'Commercial Banks, NEC',
    '6035': 'Savings Institutions, Federally Chartered',
    '6036': 'Savings Institutions, Not Federally Chartered',
    '6710': 'Holding Offices',
    '6711': 'Offices of Bank Holding Companies',
    '6712': 'Offices of Bank Holding Companies',
  },

  // Statement types we care about from pre.txt
  statementTypes: {
    'BS': 'Balance Sheet',
    'IS': 'Income Statement',
    'CF': 'Cash Flow Statement',
    'CI': 'Comprehensive Income',
    'EQ': 'Equity Statement',
  },

  // Outlier thresholds for data quality
  outlierThresholds: {
    efficiencyRatio: { min: 20, max: 150, unit: '%' },
    depositsToAssets: { min: 10, max: 100, unit: '%' },
    equityToAssets: { min: 1, max: 50, unit: '%' },
    roe: { min: -100, max: 100, unit: '%' },
    roaa: { min: -10, max: 10, unit: '%' },
  },
};

// Tag equivalence mappings - companies sometimes change tags between periods
// When deriving Q4, if the primary tag doesn't have a value, try these equivalents
const TAG_EQUIVALENTS = {
  // Interest income/expense equivalences
  'InterestExpense': ['InterestExpenseOperating', 'InterestExpenseDeposits', 'InterestExpenseBorrowings'],
  'InterestExpenseOperating': ['InterestExpense', 'InterestExpenseDeposits'],
  'InterestIncome': ['InterestIncomeOperating', 'InterestAndDividendIncomeOperating'],
  'InterestIncomeOperating': ['InterestIncome', 'InterestAndDividendIncomeOperating'],
  'InterestAndDividendIncomeOperating': ['InterestIncome', 'InterestIncomeOperating'],
  // Provision for credit losses equivalences (multiple XBRL tags used by different banks)
  'ProvisionForLoanLeaseAndOtherLosses': ['ProvisionForLoanLossesExpensed', 'ProvisionForCreditLosses', 'ProvisionForLoanAndLeaseLosses', 'CreditLossExpense'],
  'ProvisionForCreditLosses': ['ProvisionForLoanLeaseAndOtherLosses', 'ProvisionForLoanLossesExpensed', 'ProvisionForLoanAndLeaseLosses', 'CreditLossExpense'],
  'ProvisionForLoanAndLeaseLosses': ['ProvisionForCreditLosses', 'ProvisionForLoanLeaseAndOtherLosses', 'ProvisionForLoanLossesExpensed'],
  'CreditLossExpense': ['ProvisionForCreditLosses', 'ProvisionForLoanLeaseAndOtherLosses', 'ProvisionForLoanAndLeaseLosses'],
  // Net income equivalences
  'NetIncomeLoss': ['ProfitLoss', 'NetIncomeLossAvailableToCommonStockholdersBasic'],
  'ProfitLoss': ['NetIncomeLoss'],
  // Noninterest expense equivalences
  'NoninterestExpense': ['OperatingExpenses', 'OtherNoninterestExpense'],
  'OperatingExpenses': ['NoninterestExpense'],
  // Share count equivalences (weighted averages can substitute for outstanding when needed)
  'CommonStockSharesOutstanding': ['WeightedAverageNumberOfSharesOutstandingBasic', 'WeightedAverageNumberOfShareOutstandingBasicAndDiluted'],
  'WeightedAverageNumberOfSharesOutstandingBasic': ['CommonStockSharesOutstanding', 'WeightedAverageNumberOfShareOutstandingBasicAndDiluted'],
};

// Directories
const TEMP_DIR = path.join(__dirname, '..', '.sec-data-cache');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'data');

/**
 * Check if ticker is a preferred stock ticker (not common)
 * Preferred tickers typically have -P, -PA, -PB suffix patterns
 */
function isPreferredTicker(ticker) {
  if (!ticker) return false;
  // Only match hyphenated preferred patterns (-P suffix) to avoid false positives
  if (/-P[A-Z]?$/i.test(ticker)) return true;
  return false;
}

/**
 * Select the best (common stock) ticker from available options
 * Prefers non-preferred tickers, then selects shortest
 */
function selectBestTicker(tickers) {
  if (!tickers || tickers.length === 0) return null;
  if (tickers.length === 1) return tickers[0];

  const common = tickers.filter((t) => !isPreferredTicker(t));
  const candidates = common.length > 0 ? common : tickers;

  return candidates.sort((a, b) => a.length - b.length)[0];
}

/**
 * Log message if verbose mode is enabled
 */
function verboseLog(...args) {
  if (VERBOSE) console.log('  [verbose]', ...args);
}

/**
 * Fetch SEC company tickers for ticker resolution
 * Returns a Map of CIK -> array of tickers
 */
async function fetchSecCompanyTickers() {
  const https = require('https');

  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'www.sec.gov',
      path: '/files/company_tickers.json',
      method: 'GET',
      headers: {
        'User-Agent': 'Bank-Analyzer/1.0 (https://github.com/CHarrisInvest/Bank-Analyzer)',
        'Accept': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}`));
          return;
        }
        try {
          const json = JSON.parse(data);
          const tickersByCik = new Map();

          for (const key in json) {
            const company = json[key];
            const cik = String(company.cik_str).padStart(10, '0');
            const ticker = company.ticker;

            if (!tickersByCik.has(cik)) {
              tickersByCik.set(cik, []);
            }
            tickersByCik.get(cik).push(ticker);
          }

          resolve(tickersByCik);
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

/**
 * Fetch ticker for a single CIK from SEC submissions endpoint
 * This is a fallback for banks not found in company_tickers.json
 */
async function fetchTickerFromSubmissions(cik, delayMs = 150) {
  const https = require('https');
  const paddedCik = String(cik).padStart(10, '0');

  // Rate limiting
  await new Promise(resolve => setTimeout(resolve, delayMs));

  return new Promise((resolve) => {
    const options = {
      hostname: 'data.sec.gov',
      path: `/submissions/CIK${paddedCik}.json`,
      method: 'GET',
      headers: {
        'User-Agent': 'Bank-Analyzer/1.0 (https://github.com/CHarrisInvest/Bank-Analyzer)',
        'Accept': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode !== 200) {
          resolve(null);
          return;
        }
        try {
          const json = JSON.parse(data);
          // The submissions endpoint includes tickers array
          const tickers = json.tickers || [];
          resolve(tickers.length > 0 ? tickers : null);
        } catch (e) {
          resolve(null);
        }
      });
    });

    req.on('error', () => resolve(null));
    req.setTimeout(10000, () => {
      req.destroy();
      resolve(null);
    });
    req.end();
  });
}

/**
 * Batch fetch tickers for banks without tickers
 * Uses SEC submissions endpoint as fallback
 */
async function resolveMissingTickers(bankDataMap, tickersByCik) {
  const banksNeedingTickers = [];

  bankDataMap.forEach((bankData, cik) => {
    if (!bankData.ticker && !tickersByCik.has(cik)) {
      banksNeedingTickers.push({ cik, name: bankData.companyName });
    }
  });

  if (banksNeedingTickers.length === 0) {
    return;
  }

  console.log(`\nResolving tickers for ${banksNeedingTickers.length} banks via SEC submissions...`);

  let resolved = 0;
  for (const { cik, name } of banksNeedingTickers) {
    const tickers = await fetchTickerFromSubmissions(cik);
    if (tickers && tickers.length > 0) {
      tickersByCik.set(cik, tickers);
      const bestTicker = selectBestTicker(tickers);
      const bankData = bankDataMap.get(cik);
      if (bankData) {
        bankData.ticker = bestTicker;
      }
      resolved++;
      verboseLog(`  Resolved ${name}: ${bestTicker}`);
    }
  }

  console.log(`  Resolved ${resolved} of ${banksNeedingTickers.length} banks`);
}

/**
 * Discover banks from sub.txt by SIC code
 * Returns array of bank objects with CIK, company name, SIC
 */
function discoverBanksFromSubmissions(subData) {
  const sicCodesSet = new Set(CONFIG.financialInstitutionSicCodes);
  const banksByCik = new Map();

  for (const sub of subData) {
    if (!sub.sic || !sicCodesSet.has(sub.sic)) continue;

    const cik = sub.cik?.padStart(10, '0');
    if (!cik) continue;

    // Keep the most recent submission info for each CIK
    if (!banksByCik.has(cik) || sub.filed > banksByCik.get(cik).filed) {
      banksByCik.set(cik, {
        cik,
        companyName: sub.name,
        sic: sub.sic,
        sicDescription: CONFIG.sicDescriptions[sub.sic] || sub.sic,
        filed: sub.filed,
      });
    }
  }

  return Array.from(banksByCik.values());
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
 * Load bank list if it exists (optional, used for ticker hints)
 * Returns empty array if file doesn't exist
 */
function loadBankList() {
  const bankListPath = path.join(OUTPUT_DIR, 'bank-list.json');

  if (!fs.existsSync(bankListPath)) {
    return [];
  }

  try {
    const data = JSON.parse(fs.readFileSync(bankListPath, 'utf8'));
    return data.banks || [];
  } catch (e) {
    console.warn(`Warning: Could not parse bank-list.json: ${e.message}`);
    return [];
  }
}

/**
 * Process presentation data (pre.txt) to get statement structure
 * This is the KEY to "as reported on the face" presentation
 *
 * IMPORTANT: Each filing can have multiple "reports" (e.g., main balance sheet,
 * parenthetical disclosures, schedules). We need to select only the PRIMARY
 * consolidated financial statement report for each statement type.
 */
async function processPresentation(extractDir, bankAdshs) {
  const prePath = path.join(extractDir, 'pre.txt');

  if (!fs.existsSync(prePath)) {
    console.warn(`  pre.txt not found in ${extractDir}`);
    return new Map();
  }

  console.log(`  Parsing pre.txt (presentation linkbase)...`);

  const preData = await parseTsvFile(prePath, (row) => {
    // Filter to only filings we care about
    return bankAdshs.has(row.adsh);
  });

  console.log(`    Found ${preData.length} presentation entries for banks`);

  // First pass: Group by adsh -> stmt -> report -> items
  const rawPresentations = new Map();

  for (const row of preData) {
    const { adsh, stmt, report, tag, version, line, plabel, negating, inpth } = row;

    // Process Balance Sheet (BS), Income Statement (IS), Cash Flow (CF), and Equity (EQ)
    // CF and EQ are used for dividend data extraction but not shown on detail pages
    if (!['BS', 'IS', 'CF', 'EQ'].includes(stmt)) continue;

    // CRITICAL: inpth=1 means "in parenthetical" - these are parenthetical disclosures
    // like "Common stock, par value per share" that should NOT be in the main statement
    // Per SEC docs: "Indicates whether the value was presented parenthetically
    // instead of in columns within the financial statements"
    const isParenthetical = inpth === '1' || inpth === 1;
    if (isParenthetical) {
      continue; // Skip parenthetical items - they're not main statement line items
    }

    if (!rawPresentations.has(adsh)) {
      rawPresentations.set(adsh, { BS: new Map(), IS: new Map(), CF: new Map(), EQ: new Map() });
    }

    const stmtData = rawPresentations.get(adsh);
    const reportNum = parseInt(report) || 1;

    if (!stmtData[stmt].has(reportNum)) {
      stmtData[stmt].set(reportNum, []);
    }

    stmtData[stmt].get(reportNum).push({
      tag,
      version, // Needed for joining to NUM (per SEC docs: PRE references NUM via adsh,tag,version)
      report: reportNum,
      line: parseInt(line) || 0,
      label: plabel || tag,  // plabel is company's preferred label
      negating: negating === '1',
      indent: 0, // Note: pre.txt doesn't have indent info; hierarchy inferred from structure
    });
  }

  // Second pass: Select the primary report for each statement type
  // The primary report is typically the one with:
  // 1. The most line items (main consolidated statement, not a schedule)
  // 2. Contains key totals like "Assets" or "NetIncomeLoss"
  const presentations = new Map();

  for (const [adsh, stmts] of rawPresentations) {
    presentations.set(adsh, { BS: [], IS: [], CF: [], EQ: [] });
    const result = presentations.get(adsh);

    for (const stmtType of ['BS', 'IS', 'CF', 'EQ']) {
      const reportMap = stmts[stmtType];
      if (reportMap.size === 0) continue;

      // Find the best report for this statement type
      let bestReport = null;
      let bestScore = -1;

      for (const [reportNum, items] of reportMap) {
        // Score based on:
        // 1. Number of items (more items = main statement, not a schedule)
        // 2. Presence of key line items
        let score = items.length;

        // Bonus for having key totals
        const tags = new Set(items.map(i => i.tag));
        if (stmtType === 'BS') {
          if (tags.has('Assets')) score += 100;
          if (tags.has('Liabilities')) score += 50;
          if (tags.has('StockholdersEquity')) score += 50;
          if (tags.has('LiabilitiesAndStockholdersEquity')) score += 50;
          if (tags.has('CashAndCashEquivalentsAtCarryingValue')) score += 25;
          if (tags.has('CashAndDueFromBanks')) score += 25;
        } else if (stmtType === 'IS') {
          if (tags.has('NetIncomeLoss')) score += 100;
          if (tags.has('InterestIncome')) score += 50;
          if (tags.has('InterestExpense')) score += 50;
          if (tags.has('NoninterestIncome')) score += 25;
          if (tags.has('NoninterestExpense')) score += 25;
        } else if (stmtType === 'CF') {
          // Cash Flow Statement - look for key totals and dividend payments
          if (tags.has('NetCashProvidedByUsedInOperatingActivities')) score += 100;
          if (tags.has('NetCashProvidedByUsedInFinancingActivities')) score += 50;
          if (tags.has('PaymentsOfDividendsCommonStock')) score += 50;
          if (tags.has('PaymentsOfDividends')) score += 25;
        } else if (stmtType === 'EQ') {
          // Equity Statement - look for dividends and stock data
          if (tags.has('StockholdersEquity')) score += 100;
          if (tags.has('DividendsCommonStock')) score += 50;
          if (tags.has('CommonStockDividendsPerShareDeclared')) score += 50;
          if (tags.has('RetainedEarningsAccumulatedDeficit')) score += 25;
        }

        // Prefer lower report numbers (typically report 1 or 2 is the main statement)
        score -= reportNum * 2;

        if (score > bestScore) {
          bestScore = score;
          bestReport = items;
        }
      }

      if (bestReport) {
        // Sort by line number within the selected report
        result[stmtType] = bestReport.sort((a, b) => a.line - b.line);
        verboseLog(`    ${adsh} ${stmtType}: Selected report with ${bestReport.length} items (score: ${bestScore})`);
      }
    }
  }

  return presentations;
}

/**
 * Process a quarterly dataset from local ZIP file
 * Discovers banks dynamically by filtering on SIC codes
 */
async function processQuarterlyDataset(datasetInfo) {
  const { period, zipPath } = datasetInfo;

  if (!zipPath || !fs.existsSync(zipPath)) {
    console.error(`  ZIP file not found: ${zipPath}`);
    return null;
  }

  const extractDir = path.join(TEMP_DIR, period);

  console.log(`\nProcessing ${period}...`);
  console.log(`  Using: ${zipPath}`);

  // Extract if needed
  if (!fs.existsSync(extractDir) || !fs.existsSync(path.join(extractDir, 'num.txt'))) {
    console.log(`  Extracting...`);
    if (!extractZip(zipPath, extractDir)) {
      return null;
    }
  }

  // Parse sub.txt for all submissions
  console.log(`  Parsing sub.txt...`);
  const subData = await parseTsvFile(path.join(extractDir, 'sub.txt'));
  console.log(`    Found ${subData.length} submissions`);

  // Filter to bank submissions by SIC code, excluding amended filings (prevrpt=1)
  // Per SEC docs: "prevrpt=TRUE indicates the submission was subsequently amended"
  const sicCodesSet = new Set(CONFIG.financialInstitutionSicCodes);
  const bankSubmissions = subData.filter(sub => {
    const isBank = sub.sic && sicCodesSet.has(sub.sic);
    const isAmended = sub.prevrpt === '1' || sub.prevrpt === 1;
    return isBank && !isAmended;
  });
  console.log(`    Matched ${bankSubmissions.length} bank submissions by SIC code (excluding amended)`);

  const bankAdshs = new Set(bankSubmissions.map(s => s.adsh));

  // Parse pre.txt for presentation structure (THE KEY for "as reported")
  const presentations = await processPresentation(extractDir, bankAdshs);
  console.log(`    Parsed presentation for ${presentations.size} filings`);

  // Parse num.txt for values
  console.log(`  Parsing num.txt (streaming)...`);
  const numData = await parseTsvFile(
    path.join(extractDir, 'num.txt'),
    (row) => bankAdshs.has(row.adsh)
  );
  console.log(`    Found ${numData.length} numeric values`);

  // CRITICAL: Filter for consolidated entity only (coreg=NULL, segments=NULL)
  const bankNumData = numData.filter(num => {
    const isConsolidated = !num.coreg || num.coreg.trim() === '';
    const isNotSegment = !num.segments || num.segments.trim() === '';
    return isConsolidated && isNotSegment;
  });

  const filteredOut = numData.length - bankNumData.length;
  console.log(`    Filtered to ${bankNumData.length} consolidated values (removed ${filteredOut} subsidiary/segment entries)`);

  // Create lookup structures
  const subLookup = {};
  bankSubmissions.forEach(sub => {
    subLookup[sub.adsh] = sub;
  });

  // Enrich numeric data
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
    submissions: bankSubmissions,
    presentations,  // Include presentation structure
  };
}

/**
 * Aggregate data across quarters for each bank, including presentation structure
 * Banks are discovered dynamically from the quarterly results (filtered by SIC code)
 */
function aggregateBankData(quarterlyResults, tickersByCik) {
  const bankDataMap = new Map();

  // First pass: Discover all unique banks from submissions
  // (submissions were already filtered by SIC code during processing)
  const discoveredBanks = new Map();  // CIK -> bank info
  quarterlyResults.forEach(qResult => {
    if (!qResult || !qResult.submissions) return;
    qResult.submissions.forEach(sub => {
      const cik = sub.cik?.padStart(10, '0');
      if (!cik) return;

      // Keep the most recent info for each CIK
      if (!discoveredBanks.has(cik) || sub.filed > discoveredBanks.get(cik).filed) {
        discoveredBanks.set(cik, {
          cik,
          companyName: sub.name,
          sic: sub.sic,
          sicDescription: CONFIG.sicDescriptions[sub.sic] || sub.sic,
          filed: sub.filed,
        });
      }
    });
  });

  console.log(`  Discovered ${discoveredBanks.size} unique banks by SIC code`);

  // Log SIC code distribution
  const sicCounts = new Map();
  discoveredBanks.forEach(bank => {
    const count = sicCounts.get(bank.sic) || 0;
    sicCounts.set(bank.sic, count + 1);
  });
  console.log(`  SIC code distribution:`);
  Array.from(sicCounts.entries()).sort().forEach(([sic, count]) => {
    console.log(`    ${sic} (${CONFIG.sicDescriptions[sic] || 'Unknown'}): ${count}`);
  });

  // Initialize bank data structures with best ticker selection
  discoveredBanks.forEach((bank, cik) => {
    // Select best ticker (prefer common stock over preferred)
    const availableTickers = tickersByCik.get(cik) || [];
    const bestTicker = selectBestTicker(availableTickers);

    bankDataMap.set(cik, {
      cik,
      ticker: bestTicker,
      companyName: bank.companyName,
      exchange: null,  // Will be determined later or left null
      sic: bank.sic,
      sicDescription: bank.sicDescription,
      otcTier: null,
      concepts: {},
      submissions: [],
      presentationByFiling: {}, // adsh -> {BS: [...], IS: [...]}
    });
  });

  // Aggregate data from all quarters
  quarterlyResults.forEach(qResult => {
    if (!qResult) return;

    // Add numeric data
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
        uom: item.uom,
        adsh: item.adsh,
        version: item.version, // Needed for PRE-to-NUM joining per SEC docs
      });
    });

    // Add submissions
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
          filed: sub.filed,
        });

        // Add presentation structure for this filing
        const pres = qResult.presentations.get(sub.adsh);
        if (pres) {
          bankData.presentationByFiling[sub.adsh] = pres;
        }
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
 * Get the average of point-in-time values (FFIEC 5-point average methodology)
 *
 * FFIEC Average Methodology:
 * - Uses 5 quarter-end balances: current + 4 prior quarter-ends
 * - This spans approximately 12 months, aligning with TTM income calculations
 * - Provides a more stable denominator for return ratios (ROE, ROAA)
 *
 * @param {Array} conceptData - Array of concept values with ddate, qtrs, form, value
 * @param {string} asOfDate - Optional reference date (YYYYMMDD) to align average with TTM period
 * @returns {Object} Average calculation result with metadata
 */
function getAveragePointInTime(conceptData, asOfDate = null) {
  if (!conceptData || conceptData.length === 0) return null;

  let pointInTime = conceptData
    .filter(d => d.qtrs === 0 && (d.form === '10-K' || d.form === '10-Q'))
    .sort((a, b) => b.ddate.localeCompare(a.ddate));

  if (pointInTime.length === 0) return null;

  // If asOfDate provided, only include periods up to that date for alignment with TTM
  if (asOfDate) {
    pointInTime = pointInTime.filter(d => d.ddate <= asOfDate);
    if (pointInTime.length === 0) return null;
  }

  const ending = pointInTime[0];

  if (pointInTime.length === 1) {
    return {
      average: ending.value,
      ending: ending.value,
      endingDate: ending.ddate,
      method: 'single-period',
      periodCount: 1,
    };
  }

  // FFIEC 5-point average: current quarter-end + 4 prior quarter-ends
  const periodsToUse = pointInTime.slice(0, 5);
  const sum = periodsToUse.reduce((acc, d) => acc + d.value, 0);
  const average = sum / periodsToUse.length;

  return {
    average,
    ending: ending.value,
    endingDate: ending.ddate,
    startingDate: periodsToUse[periodsToUse.length - 1].ddate,
    method: periodsToUse.length >= 5 ? '5-point-avg' : `${periodsToUse.length}-point-avg`,
    periodCount: periodsToUse.length,
  };
}

/**
 * Get TTM (Trailing Twelve Months) value with Q4 derivation support
 *
 * Rules (in priority order):
 * 1. Sum-4Q: If 4 CONSECUTIVE quarterly values (qtrs=1) available, sum them
 * 2. Q4-Derived: If we have annual (qtrs=4) + Q1+Q2+Q3 for same fiscal year,
 *    derive Q4 = annual - Q1 - Q2 - Q3, then sum all 4 quarters
 *
 * Returns null if neither condition is met (no annual fallback).
 * This ensures TTM values are always based on quarterly granularity.
 */
function getTTMValue(conceptData) {
  if (!conceptData || conceptData.length === 0) return null;

  const sorted = [...conceptData]
    .filter(d => d.form === '10-K' || d.form === '10-Q')
    .sort((a, b) => b.ddate.localeCompare(a.ddate));

  if (sorted.length === 0) return null;

  const quarterlyValues = sorted.filter(d => d.qtrs === 1);
  const annualValues = sorted.filter(d => d.qtrs === 4);

  /**
   * Derive fiscal quarter from ddate (period end date)
   * ddate format: YYYYMMDD (e.g., 20250930)
   * Returns { year, quarter } where quarter is 1-4
   */
  const getQuarterFromDdate = (ddate) => {
    if (!ddate || ddate.length !== 8) return null;
    const year = parseInt(ddate.substring(0, 4));
    const month = parseInt(ddate.substring(4, 6));
    // Map month to quarter (assuming calendar fiscal year for banks)
    // Q1: Jan-Mar (months 1-3), Q2: Apr-Jun (4-6), Q3: Jul-Sep (7-9), Q4: Oct-Dec (10-12)
    const quarter = Math.ceil(month / 3);
    return { year, quarter };
  };

  /**
   * Convert quarter info to a numeric period for comparison
   * This allows easy consecutive checking: Q3 2025 = 2025*4+3 = 8103
   */
  const toPeriodNum = (yearQuarter) => {
    if (!yearQuarter) return 0;
    return yearQuarter.year * 4 + yearQuarter.quarter;
  };

  /**
   * Helper to check if 4 quarters are consecutive
   * Returns true if quarters form a valid TTM period (e.g., Q3,Q2,Q1,Q4 or Q4,Q3,Q2,Q1)
   */
  const areConsecutiveQuarters = (quarters) => {
    if (quarters.length !== 4) return false;

    const periodNums = quarters.map(q => q.periodNum).sort((a, b) => b - a);

    // Check that each period is exactly 1 apart (consecutive)
    for (let i = 0; i < periodNums.length - 1; i++) {
      if (periodNums[i] - periodNums[i + 1] !== 1) {
        return false;
      }
    }
    return true;
  };

  // Rule 1: Sum-4Q - Deduplicate by ddate, then check if 4 consecutive quarters
  if (quarterlyValues.length >= 4) {
    // Deduplicate by ddate - keep most recent filing's value for each period
    const byDdate = new Map();
    for (const q of quarterlyValues) {
      if (!byDdate.has(q.ddate)) {
        const qInfo = getQuarterFromDdate(q.ddate);
        byDdate.set(q.ddate, {
          ...q,
          periodNum: toPeriodNum(qInfo),
          derivedQuarter: qInfo,
        });
      }
    }

    // Sort by period (most recent first) and take top 4
    const uniqueQuarters = Array.from(byDdate.values())
      .sort((a, b) => b.periodNum - a.periodNum);

    if (uniqueQuarters.length >= 4) {
      const topQuarters = uniqueQuarters.slice(0, 4);

      // Verify quarters are consecutive (no gaps)
      if (areConsecutiveQuarters(topQuarters)) {
        const ttmValue = topQuarters.reduce((sum, q) => sum + q.value, 0);
        return {
          value: ttmValue,
          date: topQuarters[0].ddate,
          method: 'sum-4Q',
          form: [...new Set(topQuarters.map(q => q.form))].join('+'),
        };
      }
    }
    // If not consecutive, fall through to Q4-derived method
  }

  // Rule 2: Q4-Derived - Try to derive Q4 from annual - Q1 - Q2 - Q3
  // This is critical when we have Q1-Q3 10-Qs and a 10-K but no separate Q4 filing
  if (annualValues.length > 0 && quarterlyValues.length >= 1) {
    // Group quarterly values by fiscal year, using ddate to determine quarter
    const quartersByFY = new Map();
    for (const q of quarterlyValues) {
      const qInfo = getQuarterFromDdate(q.ddate);
      if (!qInfo) continue;
      const fy = String(qInfo.year);
      if (!quartersByFY.has(fy)) {
        quartersByFY.set(fy, { Q1: null, Q2: null, Q3: null });
      }
      const qKey = `Q${qInfo.quarter}`;
      if (['Q1', 'Q2', 'Q3'].includes(qKey)) {
        // Keep the first (most recent) value for each quarter
        if (!quartersByFY.get(fy)[qKey]) {
          quartersByFY.get(fy)[qKey] = q;
        }
      }
    }

    // Find an annual value where we can derive Q4
    for (const annual of annualValues) {
      const fy = annual.fy;
      const fyQuarters = quartersByFY.get(fy);

      if (fyQuarters && fyQuarters.Q1 && fyQuarters.Q2 && fyQuarters.Q3) {
        // We have annual + Q1 + Q2 + Q3 for this fiscal year - derive Q4
        const q1Value = fyQuarters.Q1.value;
        const q2Value = fyQuarters.Q2.value;
        const q3Value = fyQuarters.Q3.value;
        const annualValue = annual.value;

        const derivedQ4 = annualValue - q1Value - q2Value - q3Value;

        // Now we need to find the most recent TTM that includes this derived Q4
        // Get the next fiscal year's Q1-Q3 if available
        const nextFY = String(parseInt(fy) + 1);
        const nextFYQuarters = quartersByFY.get(nextFY);

        // Check if we can build TTM with next year's quarters + derived Q4
        if (nextFYQuarters && nextFYQuarters.Q1 && nextFYQuarters.Q2 && nextFYQuarters.Q3) {
          // TTM = next year Q1 + Q2 + Q3 + this year derived Q4
          const ttmValue = nextFYQuarters.Q1.value + nextFYQuarters.Q2.value +
                          nextFYQuarters.Q3.value + derivedQ4;
          return {
            value: ttmValue,
            date: nextFYQuarters.Q3.ddate,
            method: 'sum-4Q-derived',
            form: '10-Q+10-Q+10-Q+10-K(derived)',
            derivedQ4: derivedQ4,
            fiscalYear: fy,
          };
        }

        // Otherwise, use the same fiscal year (TTM ending at fiscal year end)
        const ttmValue = q1Value + q2Value + q3Value + derivedQ4;

        return {
          value: ttmValue,
          date: annual.ddate, // Use annual date as the TTM end date
          method: 'sum-4Q-derived',
          form: '10-Q+10-Q+10-Q+10-K(derived)',
          derivedQ4: derivedQ4,
          fiscalYear: fy,
        };
      }
    }
  }

  // No valid TTM calculation possible without quarterly data
  return null;
}

/**
 * Build historical financial statements with presentation structure
 * This creates the "as reported on the face" data structure
 *
 * Uses the most recent filing's presentation order as the canonical structure,
 * then maps values from all periods to align with that structure.
 *
 * Quarterly data includes:
 * - Q1-Q3: From 10-Q filings (B/S: point-in-time, I/S: qtrs=1)
 * - Q4: From 10-K filings (B/S: year-end point-in-time, I/S: derived = annual - Q1 - Q2 - Q3)
 *
 * Annual data: From 10-K filings (B/S: point-in-time, I/S: qtrs=4)
 */
function buildHistoricalStatements(bankData) {
  const concepts = bankData.concepts;
  const submissions = bankData.submissions || [];
  const presentationByFiling = bankData.presentationByFiling || {};

  // Sort submissions by date (most recent first)
  const sortedSubmissions = [...submissions].sort((a, b) => {
    const dateA = a.period || a.filed || '0';
    const dateB = b.period || b.filed || '0';
    return dateB.localeCompare(dateA);
  });

  // Separate 10-K and 10-Q submissions, filter by minimum year
  const annual10Ks = sortedSubmissions
    .filter(s => s.form === '10-K' && parseInt(s.fy) >= CONFIG.minFiscalYear)
    .sort((a, b) => parseInt(b.fy) - parseInt(a.fy));

  const quarterly10Qs = sortedSubmissions
    .filter(s => {
      if (s.form !== '10-Q') return false;
      const fy = parseInt(s.fy);
      if (fy < CONFIG.minQuarterYear) return false;
      if (fy === CONFIG.minQuarterYear) {
        const fpNum = parseInt(s.fp?.replace('Q', '')) || 0;
        return fpNum >= CONFIG.minQuarter;
      }
      return true;
    })
    .sort((a, b) => {
      const fyDiff = parseInt(b.fy) - parseInt(a.fy);
      if (fyDiff !== 0) return fyDiff;
      const fpA = parseInt(a.fp?.replace('Q', '')) || 0;
      const fpB = parseInt(b.fp?.replace('Q', '')) || 0;
      return fpB - fpA;
    });

  // Dynamic tag equivalences discovered from same label + line number across filings
  // This supplements the manual TAG_EQUIVALENTS with auto-detected equivalences
  const dynamicTagEquivalents = {};

  /**
   * Add a dynamic equivalence between two tags (bidirectional)
   */
  const addDynamicEquivalence = (tag1, tag2) => {
    if (tag1 === tag2) return;
    if (!dynamicTagEquivalents[tag1]) dynamicTagEquivalents[tag1] = [];
    if (!dynamicTagEquivalents[tag2]) dynamicTagEquivalents[tag2] = [];
    if (!dynamicTagEquivalents[tag1].includes(tag2)) dynamicTagEquivalents[tag1].push(tag2);
    if (!dynamicTagEquivalents[tag2].includes(tag1)) dynamicTagEquivalents[tag2].push(tag1);
  };

  /**
   * Get all equivalent tags (from both manual and dynamic mappings)
   */
  const getAllEquivalentTags = (tag) => {
    const equivalents = new Set();
    // Add manual equivalents
    if (TAG_EQUIVALENTS[tag]) {
      TAG_EQUIVALENTS[tag].forEach(t => equivalents.add(t));
    }
    // Add dynamically discovered equivalents
    if (dynamicTagEquivalents[tag]) {
      dynamicTagEquivalents[tag].forEach(t => equivalents.add(t));
    }
    return Array.from(equivalents);
  };

  /**
   * Build canonical presentation structure from most recent filing
   * Also discovers dynamic tag equivalences based on same label + line number
   */
  const buildCanonicalItems = (filings, stmtType) => {
    // Find most recent filing with presentation data
    let canonicalPres = null;
    for (const filing of filings) {
      const pres = presentationByFiling[filing.adsh];
      if (pres && pres[stmtType] && pres[stmtType].length > 0) {
        canonicalPres = pres[stmtType];
        break;
      }
    }

    if (!canonicalPres) return [];

    // Build canonical item list from most recent filing's presentation
    const canonicalItems = [...canonicalPres].sort((a, b) => a.line - b.line);
    const tagSet = new Set(canonicalItems.map(item => item.tag));

    // Build lookup by normalized label + line for auto-detection of equivalences
    // Normalize label: lowercase, trim whitespace
    const labelLineToTag = new Map();
    for (const item of canonicalItems) {
      const key = `${(item.label || '').toLowerCase().trim()}|${item.line}`;
      labelLineToTag.set(key, item.tag);
    }

    // Helper to check if a tag or any of its equivalents are already in the set
    const hasTagOrEquivalent = (tag) => {
      if (tagSet.has(tag)) return true;
      // Check manual equivalents
      if (TAG_EQUIVALENTS[tag]) {
        for (const equivTag of TAG_EQUIVALENTS[tag]) {
          if (tagSet.has(equivTag)) return true;
        }
      }
      // Check dynamic equivalents
      if (dynamicTagEquivalents[tag]) {
        for (const equivTag of dynamicTagEquivalents[tag]) {
          if (tagSet.has(equivTag)) return true;
        }
      }
      return false;
    };

    // Check older filings for any items not in the canonical list
    // Preserve their original line numbers so they appear in proper position
    // Skip items that are equivalents of already-included items to avoid duplicate rows
    // Auto-detect equivalences based on same label + line number
    for (const filing of filings.slice(1)) {
      const pres = presentationByFiling[filing.adsh];
      if (!pres || !pres[stmtType]) continue;

      for (const item of pres[stmtType]) {
        // Check for automatic equivalence: same label + line number = same concept
        const key = `${(item.label || '').toLowerCase().trim()}|${item.line}`;
        const existingTag = labelLineToTag.get(key);

        if (existingTag && existingTag !== item.tag) {
          // Found a tag with same label+line but different name - they're equivalent
          addDynamicEquivalence(existingTag, item.tag);
          // Skip adding this item since we have an equivalent
          continue;
        }

        // Skip if this tag OR any equivalent is already in the canonical list
        if (!hasTagOrEquivalent(item.tag)) {
          canonicalItems.push({
            ...item,
            // Keep original line number so item appears in its proper position
            fromOlderFiling: true,
          });
          tagSet.add(item.tag);
          // Add to lookup for future equivalence detection
          labelLineToTag.set(key, item.tag);
        }
      }
    }

    // Re-sort by line number to interleave older items in proper positions
    return canonicalItems.sort((a, b) => a.line - b.line);
  };

  /**
   * Get value for a specific tag from a filing
   *
   * IMPORTANT: SEC filings contain multiple balance sheet values for the same concept:
   * - Current period (e.g., Sept 30, 2025 for Q3 2025)
   * - Comparative period (e.g., Dec 31, 2024 for year-end comparison)
   *
   * We must filter by ddate (filing.period) to get the current period value.
   *
   * @param {Set} visited - Tags already tried (prevents infinite recursion with bidirectional equivalences)
   */
  const getValueForFiling = (tag, version, filing, targetQtrs, negating, visited = null) => {
    // Prevent infinite recursion from bidirectional equivalences
    if (!visited) visited = new Set();
    if (visited.has(tag)) return null;
    visited.add(tag);

    const conceptData = concepts[tag];
    if (!conceptData) {
      // If primary tag has no data, try equivalent tags (both manual and dynamic)
      const equivalents = getAllEquivalentTags(tag);
      for (const equivTag of equivalents) {
        const equivResult = getValueForFiling(equivTag, version, filing, targetQtrs, negating, visited);
        if (equivResult !== null) return equivResult;
      }
      return null;
    }

    // Per SEC docs: PRE references NUM via adsh + tag + version
    // Also filter by ddate to get current period (not comparative period)
    let match = conceptData.find(d =>
      d.adsh === filing.adsh && d.qtrs === targetQtrs && d.ddate === filing.period && d.version === version
    );
    // Fallback 1: try without version match (still require ddate match)
    if (!match) {
      match = conceptData.find(d =>
        d.adsh === filing.adsh && d.qtrs === targetQtrs && d.ddate === filing.period
      );
    }
    // Fallback 2: try without ddate match (version mismatch across years)
    if (!match) {
      match = conceptData.find(d =>
        d.adsh === filing.adsh && d.qtrs === targetQtrs && d.version === version
      );
    }
    // Fallback 3: try with just adsh + qtrs (most permissive)
    if (!match) {
      match = conceptData.find(d =>
        d.adsh === filing.adsh && d.qtrs === targetQtrs
      );
    }

    // If still no match, try equivalent tags (both manual and dynamic)
    if (!match) {
      const equivalents = getAllEquivalentTags(tag);
      for (const equivTag of equivalents) {
        const equivResult = getValueForFiling(equivTag, version, filing, targetQtrs, negating, visited);
        if (equivResult !== null) return equivResult;
      }
    }

    if (!match) return null;
    return negating ? -match.value : match.value;
  };

  /**
   * Build annual statements (from 10-K filings)
   */
  const buildAnnualStatements = (stmtType) => {
    const allFilings = [...annual10Ks];
    const canonicalItems = buildCanonicalItems(allFilings, stmtType);
    if (canonicalItems.length === 0) return { statements: [], canonicalItems: [] };

    const statements = [];
    for (const filing of annual10Ks) {
      const periodKey = `FY ${filing.fy}`;
      const pres = presentationByFiling[filing.adsh];

      const filingPresMap = new Map();
      if (pres && pres[stmtType]) {
        for (const item of pres[stmtType]) {
          filingPresMap.set(item.tag, item);
        }
      }

      const targetQtrs = stmtType === 'BS' ? 0 : 4;
      const items = [];

      for (const canonicalItem of canonicalItems) {
        const filingPres = filingPresMap.get(canonicalItem.tag);
        const label = filingPres?.label || canonicalItem.label;
        const indent = filingPres?.indent ?? canonicalItem.indent ?? 0;
        const negating = filingPres?.negating ?? canonicalItem.negating ?? false;

        const value = getValueForFiling(canonicalItem.tag, canonicalItem.version, filing, targetQtrs, negating);

        items.push({
          tag: canonicalItem.tag,
          label: label,
          line: canonicalItem.line,
          indent: indent,
          negating: negating,
          value: value,
          uom: 'USD',
          hasValue: value !== null,
        });
      }

      statements.push({
        period: periodKey,
        label: periodKey,
        form: filing.form,
        fy: filing.fy,
        fp: 'FY',
        filed: filing.filed,
        ddate: filing.period,
        adsh: filing.adsh,
        items: items,
      });
    }

    const canonicalItemsClean = canonicalItems.map(item => ({
      tag: item.tag,
      label: item.label,
      line: item.line,
      indent: item.indent ?? 0,
    }));

    return { statements, canonicalItems: canonicalItemsClean };
  };

  /**
   * Get restated quarterly value from 10-K filing
   *
   * When companies restate prior quarters (e.g., accounting method changes),
   * the 10-K may contain restated quarterly values (qtrs=1) for prior quarter-end dates.
   * These are more accurate than the original 10-Q values.
   *
   * @param {string} tag - The XBRL tag
   * @param {string} version - The taxonomy version
   * @param {Object} annualFiling - The 10-K filing object
   * @param {string} quarterEndDate - The quarter-end date (e.g., "20240331" for Q1)
   * @param {boolean} negating - Whether to negate the value
   * @returns {number|null} - The restated value or null if not available
   */
  const getRestatedValueFromAnnual = (tag, version, annualFiling, quarterEndDate, negating, visited = null) => {
    if (!annualFiling) return null;

    // Prevent infinite recursion
    if (!visited) visited = new Set();
    if (visited.has(tag)) return null;
    visited.add(tag);

    const conceptData = concepts[tag];
    if (!conceptData) {
      // Try equivalent tags
      const equivalents = getAllEquivalentTags(tag);
      for (const equivTag of equivalents) {
        const equivResult = getRestatedValueFromAnnual(equivTag, version, annualFiling, quarterEndDate, negating, visited);
        if (equivResult !== null) return equivResult;
      }
      return null;
    }

    // Look for qtrs=1 value in the 10-K filing with the specific quarter-end date
    // This would be a restated quarterly value
    let match = conceptData.find(d =>
      d.adsh === annualFiling.adsh && d.qtrs === 1 && d.ddate === quarterEndDate && d.version === version
    );
    // Fallback: try without version match
    if (!match) {
      match = conceptData.find(d =>
        d.adsh === annualFiling.adsh && d.qtrs === 1 && d.ddate === quarterEndDate
      );
    }

    // Try equivalent tags if no match found
    if (!match) {
      const equivalents = getAllEquivalentTags(tag);
      for (const equivTag of equivalents) {
        const equivResult = getRestatedValueFromAnnual(equivTag, version, annualFiling, quarterEndDate, negating, visited);
        if (equivResult !== null) return equivResult;
      }
    }

    if (!match) return null;
    return negating ? -match.value : match.value;
  };

  /**
   * Build quarterly statements (Q1-Q3 from 10-Q, Q4 from 10-K with I/S derivation)
   *
   * IMPORTANT: For income statement items, we prefer restated values from the 10-K
   * over original 10-Q values when available. This handles cases where companies
   * restate prior quarters due to accounting method changes.
   */
  const buildQuarterlyStatements = (stmtType) => {
    // Use both 10-Q and 10-K filings for canonical items
    const allFilings = [...quarterly10Qs, ...annual10Ks];
    const canonicalItems = buildCanonicalItems(allFilings, stmtType);
    if (canonicalItems.length === 0) return { statements: [], canonicalItems: [] };

    // Build a map of fiscal year -> 10-K filing (for restated values)
    const annualByYear = new Map();
    for (const k of annual10Ks) {
      annualByYear.set(k.fy, k);
    }

    // Build a map of fiscal year -> Q1, Q2, Q3 10-Q filings
    const quartersByYear = new Map();
    for (const q of quarterly10Qs) {
      const fy = q.fy;
      if (!quartersByYear.has(fy)) {
        quartersByYear.set(fy, { Q1: null, Q2: null, Q3: null });
      }
      const fp = q.fp; // Q1, Q2, Q3
      if (fp && quartersByYear.get(fy)[fp] === null) {
        quartersByYear.get(fy)[fp] = q;
      }
    }

    // Build list of all quarters to display (Q1 2023 onwards)
    const allQuarters = [];

    // Add Q1-Q3 from 10-Qs
    // Include the 10-K filing reference for checking restated values
    for (const q of quarterly10Qs) {
      allQuarters.push({
        fy: q.fy,
        fp: q.fp,
        filing: q,
        form: '10-Q',
        isDerived: false,
        // Reference to 10-K for this fiscal year (for restated I/S values)
        annualFiling: annualByYear.get(q.fy) || null,
      });
    }

    // Add Q4 from 10-Ks (for years where we have the 10-K)
    for (const k of annual10Ks) {
      const fy = k.fy;
      // Only add Q4 if fiscal year >= minQuarterYear
      if (parseInt(fy) >= CONFIG.minQuarterYear) {
        // IS and CF are period statements - Q4 values need derivation (Annual - Q1 - Q2 - Q3)
        // BS and EQ are point-in-time - Q4 values come directly from 10-K
        const isPeriodStatement = stmtType === 'IS' || stmtType === 'CF';
        allQuarters.push({
          fy: fy,
          fp: 'Q4',
          filing: k,
          form: '10-K',
          isDerived: isPeriodStatement,
          // For period statement derivation, we need Q1-Q3 values
          priorQuarters: quartersByYear.get(fy) || { Q1: null, Q2: null, Q3: null },
          annualFiling: k, // The 10-K itself
        });
      }
    }

    // Sort quarters: most recent first (by year desc, then quarter desc)
    allQuarters.sort((a, b) => {
      const fyDiff = parseInt(b.fy) - parseInt(a.fy);
      if (fyDiff !== 0) return fyDiff;
      const qA = parseInt(a.fp.replace('Q', ''));
      const qB = parseInt(b.fp.replace('Q', ''));
      return qB - qA;
    });

    const statements = [];
    for (const quarter of allQuarters) {
      const { fy, fp, filing, form, isDerived, priorQuarters, annualFiling } = quarter;
      const periodKey = `${fp} ${fy}`;
      const periodLabel = isDerived ? `${fp} ${fy} (derived)` : periodKey;

      const pres = presentationByFiling[filing.adsh];
      const filingPresMap = new Map();
      if (pres && pres[stmtType]) {
        for (const item of pres[stmtType]) {
          filingPresMap.set(item.tag, item);
        }
      }

      const items = [];
      for (const canonicalItem of canonicalItems) {
        const filingPres = filingPresMap.get(canonicalItem.tag);
        const label = filingPres?.label || canonicalItem.label;
        const indent = filingPres?.indent ?? canonicalItem.indent ?? 0;
        const negating = filingPres?.negating ?? canonicalItem.negating ?? false;

        let value = null;
        let derivedUnavailable = false;
        let itemIsDerived = false;
        let isAnnualProxy = false;
        let isRestated = false;  // True if value came from restated data in 10-K

        // Check if this is a share count that should NOT be derived by subtraction
        // Share counts are period averages, not cumulative - Annual ≠ Q1 + Q2 + Q3 + Q4
        // Per-share values (EPS) CAN be derived since companies present them to reconcile
        const tagLower = canonicalItem.tag.toLowerCase();
        const isShareCount = tagLower.includes('shares') && !tagLower.includes('pershare');

        if (stmtType === 'BS') {
          // Balance sheet: always point-in-time (qtrs=0)
          value = getValueForFiling(canonicalItem.tag, canonicalItem.version, filing, 0, negating);
        } else if (fp === 'Q4' && isDerived && !isShareCount) {
          // Income statement Q4: Try direct Q4 value first, then derivation
          //
          // IMPORTANT: Companies may restate prior quarters in their 10-K without amending
          // original 10-Q filings (e.g., Ally's EV tax credit accounting change in 2024).
          // When this happens, derivation (Annual - Q1 - Q2 - Q3) produces wrong results
          // because the 10-Q values use the old accounting method while the 10-K uses the new one.
          //
          // Strategy:
          // 1. First try direct Q4 value from 10-K (qtrs=1, matching ddate)
          // 2. If no direct Q4, try derivation with validation
          // 3. If derivation produces inconsistent result (wrong sign), mark as unavailable

          // First, try to get direct Q4 value from 10-K
          // getValueForFiling filters by ddate=filing.period to avoid comparative periods
          const directQ4Value = getValueForFiling(canonicalItem.tag, canonicalItem.version, filing, 1, negating);

          if (directQ4Value !== null) {
            // Direct Q4 value available - use it (most reliable when restatements occur)
            value = directQ4Value;
            itemIsDerived = false;
          } else {
            // No direct Q4 value - try derivation using restated Q1-Q3 values from 10-K
            const annualValue = getValueForFiling(canonicalItem.tag, canonicalItem.version, filing, 4, negating);

            if (annualValue !== null && priorQuarters) {
              // IMPORTANT: Prefer restated Q1-Q3 values from the 10-K over original 10-Q values
              // This ensures derivation uses consistent accounting when companies restate
              let q1Value = null, q2Value = null, q3Value = null;

              // Try restated values from 10-K first
              if (priorQuarters.Q1) {
                q1Value = getRestatedValueFromAnnual(canonicalItem.tag, canonicalItem.version, filing, priorQuarters.Q1.period, negating);
                if (q1Value === null) {
                  q1Value = getValueForFiling(canonicalItem.tag, canonicalItem.version, priorQuarters.Q1, 1, negating);
                }
              }
              if (priorQuarters.Q2) {
                q2Value = getRestatedValueFromAnnual(canonicalItem.tag, canonicalItem.version, filing, priorQuarters.Q2.period, negating);
                if (q2Value === null) {
                  q2Value = getValueForFiling(canonicalItem.tag, canonicalItem.version, priorQuarters.Q2, 1, negating);
                }
              }
              if (priorQuarters.Q3) {
                q3Value = getRestatedValueFromAnnual(canonicalItem.tag, canonicalItem.version, filing, priorQuarters.Q3.period, negating);
                if (q3Value === null) {
                  q3Value = getValueForFiling(canonicalItem.tag, canonicalItem.version, priorQuarters.Q3, 1, negating);
                }
              }

              if (q1Value !== null && q2Value !== null && q3Value !== null) {
                const derivedQ4 = annualValue - q1Value - q2Value - q3Value;

                // Q4 = Annual - Q1 - Q2 - Q3 is mathematically correct when inputs are valid.
                //
                // Previously had validation checks (signMismatch, priorExceedsAnnual) that
                // rejected derivations when Q4's sign differed from annual or when Q1-Q3
                // sum diverged significantly from annual. These were removed because:
                // 1. Restated Q1-Q3 values from 10-K are already preferred (getRestatedValueFromAnnual)
                // 2. The checks caused false positives for banks with legitimate mixed results
                //    (e.g., profitable Q1-Q3 but large Q4 loss causing annual loss, like AMTB 2024)
                //
                // Derived Q4 values are clearly marked in the UI so users can assess validity.
                value = derivedQ4;
                itemIsDerived = true;
              } else {
                // Cannot derive - missing prior quarters
                derivedUnavailable = true;
              }
            } else {
              // No annual value available
              derivedUnavailable = true;
            }
          }
        } else if (fp === 'Q4' && isShareCount) {
          // Q4 share counts: use quarterly value if available, otherwise use annual as proxy
          // (Share counts can't be derived by subtraction since they're averages)
          value = getValueForFiling(canonicalItem.tag, canonicalItem.version, filing, 1, negating);

          // Fallback: use annual weighted average as proxy for Q4
          if (value === null) {
            value = getValueForFiling(canonicalItem.tag, canonicalItem.version, filing, 4, negating);
            if (value !== null) {
              itemIsDerived = true;
              isAnnualProxy = true;  // Flag that this is annual value used as Q4 proxy
            }
          }
        } else {
          // Income statement Q1-Q3: prefer restated value from 10-K if available
          //
          // When companies restate prior quarters (e.g., accounting method changes),
          // the 10-K contains restated quarterly values that are more accurate than
          // the original 10-Q values. Check the 10-K first.
          if (stmtType === 'IS' && annualFiling && ['Q1', 'Q2', 'Q3'].includes(fp)) {
            // Try to get restated value from 10-K
            const restatedValue = getRestatedValueFromAnnual(
              canonicalItem.tag,
              canonicalItem.version,
              annualFiling,
              filing.period, // The quarter-end date (e.g., 20240331 for Q1)
              negating
            );

            if (restatedValue !== null) {
              // Found restated value in 10-K - use it
              value = restatedValue;
              itemIsDerived = false; // It's a direct value from 10-K, just restated
              isRestated = true; // Flag that this is a restated value
            } else {
              // No restated value - fall back to original 10-Q value
              value = getValueForFiling(canonicalItem.tag, canonicalItem.version, filing, 1, negating);
            }
          } else {
            // Balance sheet or no annual filing available - use original filing value
            value = getValueForFiling(canonicalItem.tag, canonicalItem.version, filing, 1, negating);
          }
        }

        items.push({
          tag: canonicalItem.tag,
          label: label,
          line: canonicalItem.line,
          indent: indent,
          negating: negating,
          value: value,
          uom: 'USD',
          hasValue: value !== null,
          isDerived: itemIsDerived,
          derivedUnavailable: derivedUnavailable,
          isAnnualProxy: isAnnualProxy,  // True if Q4 share count uses annual value as proxy
          isRestated: isRestated,  // True if value came from restated data in 10-K (not original 10-Q)
        });
      }

      statements.push({
        period: periodKey,
        label: periodLabel,
        form: form,
        fy: fy,
        fp: fp,
        filed: filing.filed,
        ddate: filing.period,
        adsh: filing.adsh,
        isDerived: isDerived,
        items: items,
      });
    }

    const canonicalItemsClean = canonicalItems.map(item => ({
      tag: item.tag,
      label: item.label,
      line: item.line,
      indent: item.indent ?? 0,
    }));

    return { statements, canonicalItems: canonicalItemsClean };
  };

  const annualBS = buildAnnualStatements('BS');
  const quarterlyBS = buildQuarterlyStatements('BS');
  const annualIS = buildAnnualStatements('IS');
  const quarterlyIS = buildQuarterlyStatements('IS');
  // Build CF and EQ for dividend data extraction (not shown on detail pages)
  const annualCF = buildAnnualStatements('CF');
  const quarterlyCF = buildQuarterlyStatements('CF');
  const annualEQ = buildAnnualStatements('EQ');
  const quarterlyEQ = buildQuarterlyStatements('EQ');

  // Create unified period lists
  const annualPeriods = annualBS.statements.map(bs => ({
    key: bs.period,
    label: bs.label,
    form: bs.form,
    fy: bs.fy,
    fp: bs.fp,
    filed: bs.filed,
  }));

  const quarterlyPeriods = quarterlyBS.statements.map(bs => ({
    key: bs.period,
    label: bs.label,
    form: bs.form,
    fy: bs.fy,
    fp: bs.fp,
    filed: bs.filed,
    isDerived: bs.isDerived,
  }));

  return {
    historicalBalanceSheet: {
      annual: annualBS.statements,
      quarterly: quarterlyBS.statements,
      canonicalItems: {
        annual: annualBS.canonicalItems,
        quarterly: quarterlyBS.canonicalItems,
      },
      periods: {
        annual: annualPeriods,
        quarterly: quarterlyPeriods,
      },
    },
    historicalIncomeStatement: {
      annual: annualIS.statements,
      quarterly: quarterlyIS.statements,
      canonicalItems: {
        annual: annualIS.canonicalItems,
        quarterly: quarterlyIS.canonicalItems,
      },
      periods: {
        annual: annualPeriods,
        quarterly: quarterlyPeriods,
      },
    },
    // CF and EQ for dividend data extraction (internal use only, not saved to detail pages)
    historicalCashFlow: {
      annual: annualCF.statements,
      quarterly: quarterlyCF.statements,
    },
    historicalEquity: {
      annual: annualEQ.statements,
      quarterly: quarterlyEQ.statements,
    },
  };
}

/**
 * Calculate metrics for a single bank
 */
function calculateBankMetrics(bankData) {
  const concepts = bankData.concepts;

  // Build historical statements FIRST - these have correctly derived Q4 values
  const historicalStatements = buildHistoricalStatements(bankData);

  /**
   * Get TTM value from historical quarterly statements
   * Sums the 4 most recent quarters for a given tag
   * This uses the already-derived Q4 values from buildHistoricalStatements
   */
  const getTTMFromStatements = (tag, alternativeTags = []) => {
    const quarterly = historicalStatements.historicalIncomeStatement?.quarterly || [];
    if (quarterly.length < 4) return null;

    // Get the 4 most recent quarters
    const recentQuarters = quarterly.slice(0, 4);

    // Find values for this tag across the 4 quarters
    const allTags = [tag, ...alternativeTags];
    let values = [];
    let latestDate = null;

    for (const stmt of recentQuarters) {
      let value = null;
      for (const t of allTags) {
        const item = stmt.items?.find(i => i.tag === t && i.hasValue);
        if (item) {
          value = item.value;
          break;
        }
      }
      if (value === null) {
        // Missing a quarter - can't calculate proper TTM
        return null;
      }
      values.push(value);
      if (!latestDate) latestDate = stmt.ddate;
    }

    if (values.length !== 4) return null;

    const ttmValue = values.reduce((sum, v) => sum + v, 0);
    return {
      value: ttmValue,
      date: latestDate,
      method: 'sum-4Q-statements',
      form: recentQuarters.map(q => q.form).join('+'),
    };
  };

  /**
   * Get TTM value from historical Equity Statement (for per-share dividend data)
   */
  const getTTMFromEquity = (tag, alternativeTags = []) => {
    const quarterly = historicalStatements.historicalEquity?.quarterly || [];
    if (quarterly.length < 4) return null;

    const recentQuarters = quarterly.slice(0, 4);
    const allTags = [tag, ...alternativeTags];
    let values = [];
    let latestDate = null;

    for (const stmt of recentQuarters) {
      let value = null;
      for (const t of allTags) {
        const item = stmt.items?.find(i => i.tag === t && i.hasValue);
        if (item) {
          value = item.value;
          break;
        }
      }
      if (value === null) return null;
      values.push(value);
      if (!latestDate) latestDate = stmt.ddate;
    }

    if (values.length !== 4) return null;

    const ttmValue = values.reduce((sum, v) => sum + v, 0);
    return {
      value: ttmValue,
      date: latestDate,
      method: 'sum-4Q-equity',
      form: recentQuarters.map(q => q.form).join('+'),
    };
  };

  /**
   * Get TTM value from historical Cash Flow Statement (for total dividend payments)
   */
  const getTTMFromCashFlow = (tag, alternativeTags = []) => {
    const quarterly = historicalStatements.historicalCashFlow?.quarterly || [];
    if (quarterly.length < 4) return null;

    const recentQuarters = quarterly.slice(0, 4);
    const allTags = [tag, ...alternativeTags];
    let values = [];
    let latestDate = null;

    for (const stmt of recentQuarters) {
      let value = null;
      for (const t of allTags) {
        const item = stmt.items?.find(i => i.tag === t && i.hasValue);
        if (item) {
          value = item.value;
          break;
        }
      }
      if (value === null) return null;
      values.push(value);
      if (!latestDate) latestDate = stmt.ddate;
    }

    if (values.length !== 4) return null;

    const ttmValue = values.reduce((sum, v) => sum + v, 0);
    return {
      value: ttmValue,
      date: latestDate,
      method: 'sum-4Q-cashflow',
      form: recentQuarters.map(q => q.form).join('+'),
    };
  };

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

  // Shares outstanding - try direct tags first, then derive from issued - treasury
  let sharesData = getLatestPointInTime(concepts['CommonStockSharesOutstanding']) ||
                   getLatestPointInTime(concepts['EntityCommonStockSharesOutstanding']);

  // Fallback: Calculate shares outstanding from issued - treasury
  if (!sharesData) {
    const sharesIssued = getLatestPointInTime(concepts['CommonStockSharesIssued']);
    const treasuryShares = getLatestPointInTime(concepts['TreasuryStockCommonShares']) ||
                           getLatestPointInTime(concepts['TreasuryStockCommonAndPreferredShares']);
    if (sharesIssued?.value) {
      const treasuryValue = treasuryShares?.value || 0;
      sharesData = {
        value: sharesIssued.value - treasuryValue,
        date: sharesIssued.date,
        derived: true,
      };
    }
  }

  // Income Statement (TTM) - Use historical statements which have correct Q4 derivation
  const netIncome = getTTMFromStatements('NetIncomeLoss', ['ProfitLoss', 'NetIncomeLossAvailableToCommonStockholdersBasic']) ||
                    getTTMValue(concepts['NetIncomeLoss']) ||
                    getTTMValue(concepts['ProfitLoss']);

  // Get TTM end date to align averaging period with income period
  const ttmEndDate = netIncome?.date || null;

  // Averages for Return Ratios (aligned with TTM period using FFIEC 5-point methodology)
  const avgAssets = getAveragePointInTime(concepts['Assets'], ttmEndDate);
  const avgEquity = getAveragePointInTime(concepts['StockholdersEquity'], ttmEndDate) ||
                    getAveragePointInTime(concepts['StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest'], ttmEndDate);

  // Income Statement (TTM) - remaining items, prefer historical statements
  const interestIncome = getTTMFromStatements('InterestIncome', ['InterestAndDividendIncomeOperating', 'InterestIncomeOperating']) ||
                         getTTMValue(concepts['InterestIncome']) ||
                         getTTMValue(concepts['InterestAndDividendIncomeOperating']);
  const interestExpense = getTTMFromStatements('InterestExpense', ['InterestExpenseOperating']) ||
                          getTTMFromStatements('InterestExpenseOperating', ['InterestExpense']) ||
                          getTTMValue(concepts['InterestExpense']);
  const netInterestIncome = getTTMFromStatements('InterestIncomeExpenseNet', ['NetInterestIncome']) ||
                            getTTMValue(concepts['InterestIncomeExpenseNet']) ||
                            getTTMValue(concepts['NetInterestIncome']);
  const noninterestIncome = getTTMFromStatements('NoninterestIncome') ||
                            getTTMValue(concepts['NoninterestIncome']);
  const noninterestExpense = getTTMFromStatements('NoninterestExpense', ['OperatingExpenses']) ||
                             getTTMValue(concepts['NoninterestExpense']) ||
                             getTTMValue(concepts['OperatingExpenses']);
  const provisionForCreditLosses = getTTMFromStatements('ProvisionForLoanLeaseAndOtherLosses', ['ProvisionForLoanAndLeaseLosses', 'ProvisionForCreditLosses', 'CreditLossExpense']) ||
                                    getTTMValue(concepts['ProvisionForLoanLeaseAndOtherLosses']) ||
                                    getTTMValue(concepts['ProvisionForLoanAndLeaseLosses']) ||
                                    getTTMValue(concepts['ProvisionForCreditLosses']) ||
                                    getTTMValue(concepts['CreditLossExpense']);
  const preTaxIncome = getTTMFromStatements('IncomeLossFromContinuingOperationsBeforeIncomeTaxesExtraordinaryItemsNoncontrollingInterest', ['IncomeLossFromContinuingOperationsBeforeIncomeTaxes']) ||
                       getTTMValue(concepts['IncomeLossFromContinuingOperationsBeforeIncomeTaxesExtraordinaryItemsNoncontrollingInterest']) ||
                       getTTMValue(concepts['IncomeLossFromContinuingOperationsBeforeIncomeTaxes']);
  // netIncome already calculated above for TTM date alignment
  const netIncomeToCommonDirect = getTTMFromStatements('NetIncomeLossAvailableToCommonStockholdersBasic') ||
                                  getTTMValue(concepts['NetIncomeLossAvailableToCommonStockholdersBasic']);
  const preferredDividends = getTTMFromStatements('PreferredStockDividendsAndOtherAdjustments', ['DividendsPreferredStock']) ||
                              getTTMValue(concepts['PreferredStockDividendsAndOtherAdjustments']) ||
                              getTTMValue(concepts['DividendsPreferredStock']);
  const eps = getTTMFromStatements('EarningsPerShareBasic', ['EarningsPerShareDiluted']) ||
              getTTMValue(concepts['EarningsPerShareBasic']) ||
              getTTMValue(concepts['EarningsPerShareDiluted']);
  // DPS: Common stock dividends per share - prioritize per-share data over derived
  // Priority: 1) Equity Statement, 2) Income Statement, 3) Raw concepts, 4) Derived from total/shares
  const dps = getTTMFromEquity('CommonStockDividendsPerShareDeclared', ['CommonStockDividendsPerShareCashPaid']) ||
              getTTMFromStatements('CommonStockDividendsPerShareDeclared', ['CommonStockDividendsPerShareCashPaid']) ||
              getTTMValue(concepts['CommonStockDividendsPerShareDeclared']) ||
              getTTMValue(concepts['CommonStockDividendsPerShareCashPaid']);
  // Fallback: Total common dividends paid (for calculating DPS when per-share tags unavailable)
  // Priority: 1) Cash Flow Statement, 2) Equity Statement, 3) Raw concepts
  // Only use tags explicitly for COMMON stock to avoid including preferred dividends
  const totalCommonDividends = getTTMFromCashFlow('PaymentsOfDividendsCommonStock', ['DividendsCommonStockCash']) ||
                               getTTMFromEquity('DividendsCommonStock', ['DividendsCommonStockCash']) ||
                               getTTMValue(concepts['PaymentsOfDividendsCommonStock']) ||
                               getTTMValue(concepts['DividendsCommonStock']) ||
                               getTTMValue(concepts['DividendsCommonStockCash']) ||
                               getTTMValue(concepts['CashDividendsPaidToCommonStockholders']);

  // Extract values
  const totalAssets = assets?.value;
  const totalDeposits = deposits?.value;
  const totalEquity = equity?.value;
  const preferredValue = preferredStock?.value || 0;
  const loansValue = loans?.value;
  const sharesOutstanding = sharesData?.value;
  const ttmNii = netInterestIncome?.value;
  const ttmNonintIncome = noninterestIncome?.value;
  const ttmNonintExpense = noninterestExpense?.value;
  const ttmNetIncome = netIncome?.value;
  const ttmEps = eps?.value;
  // DPS: prefer per-share tags, fallback to total dividends / shares outstanding
  let ttmDps = dps?.value ?? null;
  if (ttmDps === null && totalCommonDividends?.value && sharesOutstanding) {
    ttmDps = totalCommonDividends.value / sharesOutstanding;
  }

  // Diagnostic: Log dividend-related tags for banks missing DPS (major banks only)
  const majorBanks = ['BAC', 'WFC', 'C', 'PNC', 'TFC', 'BK', 'CFG', 'MTB', 'USB', 'SCHW'];
  if (ttmDps === null && bankData.ticker && majorBanks.includes(bankData.ticker)) {
    const allDividendTags = Object.keys(concepts).filter(tag => {
      const lower = tag.toLowerCase();
      return lower.includes('dividend') || lower.includes('dps');
    });
    const allShareTags = Object.keys(concepts).filter(tag => {
      const lower = tag.toLowerCase();
      return lower.includes('sharesoutstanding') || lower.includes('sharesissued') ||
             (lower.includes('shares') && lower.includes('common'));
    });

    console.log(`\n  === DIVIDEND DIAGNOSTIC: ${bankData.ticker} (CIK: ${bankData.cik}) ===`);
    console.log(`  Shares Outstanding: ${sharesOutstanding ? sharesOutstanding + (sharesData?.derived ? ' (derived from issued-treasury)' : '') : 'MISSING'}`);
    console.log(`  DPS from getTTMFromEquity: ${dps ? dps.value + ' (' + dps.method + ')' : 'null'}`);
    console.log(`  Total Common Dividends: ${totalCommonDividends ? totalCommonDividends.value + ' (' + totalCommonDividends.method + ')' : 'null'}`);

    // Check historical EQ/CF statement counts
    const eqQuarterly = historicalStatements.historicalEquity?.quarterly || [];
    const cfQuarterly = historicalStatements.historicalCashFlow?.quarterly || [];
    console.log(`  Historical EQ quarters: ${eqQuarterly.length}`);
    console.log(`  Historical CF quarters: ${cfQuarterly.length}`);

    // Show share-related tags
    if (allShareTags.length > 0) {
      console.log(`  Share-related tags found (${allShareTags.length}):`);
      for (const tag of allShareTags.slice(0, 10)) {
        const vals = concepts[tag];
        const recent = vals.sort((a, b) => b.ddate.localeCompare(a.ddate))[0];
        console.log(`    - ${tag}: value=${recent?.value}, date=${recent?.ddate}`);
      }
    } else {
      console.log(`  NO share-related tags found in concepts!`);
    }

    if (allDividendTags.length > 0) {
      console.log(`  Dividend-related tags found in concepts (${allDividendTags.length}):`);
      for (const tag of allDividendTags.slice(0, 15)) {
        const vals = concepts[tag];
        const recent = vals.sort((a, b) => b.ddate.localeCompare(a.ddate))[0];
        console.log(`    - ${tag}: value=${recent?.value}, qtrs=${recent?.qtrs}, date=${recent?.ddate}`);
      }
      if (allDividendTags.length > 15) console.log(`    ... and ${allDividendTags.length - 15} more`);
    } else {
      console.log(`  NO dividend-related tags found in concepts!`);
    }

    // Check CF and EQ presentations
    const recentFiling = bankData.submissions?.sort((a, b) => b.filed.localeCompare(a.filed))[0];
    if (recentFiling) {
      const pres = bankData.presentationByFiling[recentFiling.adsh];
      if (pres) {
        const cfTags = pres.CF?.map(i => i.tag) || [];
        const eqTags = pres.EQ?.map(i => i.tag) || [];
        const cfDivTags = cfTags.filter(t => t.toLowerCase().includes('dividend'));
        const eqDivTags = eqTags.filter(t => t.toLowerCase().includes('dividend'));
        console.log(`  CF statement tags: ${cfTags.length} total, ${cfDivTags.length} dividend-related`);
        if (cfDivTags.length > 0) console.log(`    CF dividend tags: ${cfDivTags.join(', ')}`);
        console.log(`  EQ statement tags: ${eqTags.length} total, ${eqDivTags.length} dividend-related`);
        if (eqDivTags.length > 0) console.log(`    EQ dividend tags: ${eqDivTags.join(', ')}`);
      } else {
        console.log(`  No presentation data for most recent filing`);
      }
    }

    // Debug: Show actual values in quarterly statements for dividend tags
    const divTagsToCheck = ['DividendsCommonStock', 'DividendsCommonStockCash', 'PaymentsOfDividendsCommonStock',
                            'CommonStockDividendsPerShareDeclared', 'CommonStockDividendsPerShareCashPaid'];
    console.log(`  === EQ Quarterly Statement Values (first 4 quarters) ===`);
    const eqQtrs = historicalStatements.historicalEquity?.quarterly?.slice(0, 4) || [];
    for (let i = 0; i < eqQtrs.length; i++) {
      const stmt = eqQtrs[i];
      const divItems = stmt.items?.filter(item => divTagsToCheck.includes(item.tag)) || [];
      const period = `${stmt.fp || 'FY'} ${stmt.fy}`;
      if (divItems.length > 0) {
        console.log(`    ${period} (${stmt.form}): ${divItems.map(d => `${d.tag}=${d.value}`).join(', ')}`);
      } else {
        console.log(`    ${period} (${stmt.form}): NO dividend items found`);
      }
    }
    console.log(`  === CF Quarterly Statement Values (first 4 quarters) ===`);
    const cfQtrs = historicalStatements.historicalCashFlow?.quarterly?.slice(0, 4) || [];
    for (let i = 0; i < cfQtrs.length; i++) {
      const stmt = cfQtrs[i];
      const divItems = stmt.items?.filter(item => divTagsToCheck.includes(item.tag)) || [];
      const period = `${stmt.fp || 'FY'} ${stmt.fy}`;
      if (divItems.length > 0) {
        console.log(`    ${period} (${stmt.form}): ${divItems.map(d => `${d.tag}=${d.value}`).join(', ')}`);
      } else {
        console.log(`    ${period} (${stmt.form}): NO dividend items found`);
      }
    }

    // Debug: Show count of data points for key dividend concepts
    console.log(`  === Concept Data Point Counts ===`);
    for (const tag of divTagsToCheck) {
      const data = concepts[tag] || [];
      const quarterlyData = data.filter(d => d.qtrs === 1);
      console.log(`    ${tag}: ${data.length} total, ${quarterlyData.length} quarterly (qtrs=1)`);
    }

    // Debug: Show why getTTMValue fails for CommonStockDividendsPerShareDeclared
    const dpsData = concepts['CommonStockDividendsPerShareDeclared'] || [];
    if (dpsData.length > 0) {
      const sorted = [...dpsData]
        .filter(d => d.form === '10-K' || d.form === '10-Q')
        .sort((a, b) => b.ddate.localeCompare(a.ddate));
      const quarterlyVals = sorted.filter(d => d.qtrs === 1);
      console.log(`  === getTTMValue Debug for CommonStockDividendsPerShareDeclared ===`);
      console.log(`    After form filter: ${sorted.length}, after qtrs=1 filter: ${quarterlyVals.length}`);
      if (quarterlyVals.length >= 4) {
        const top4 = quarterlyVals.slice(0, 4);
        console.log(`    Top 4 quarterly values:`);
        for (const q of top4) {
          console.log(`      ddate=${q.ddate}, fy=${q.fy}, fp=${q.fp}, value=${q.value}, form=${q.form}`);
        }
        // Check consecutive logic
        const toPeriodNum = (q) => {
          const fy = parseInt(q.fy) || 0;
          const fpNum = q.fp === 'FY' ? 4 : (parseInt(q.fp?.replace('Q', '')) || 0);
          return fy * 4 + fpNum;
        };
        const periodNums = top4.map(toPeriodNum).sort((a, b) => b - a);
        console.log(`    Period numbers (should be consecutive): ${periodNums.join(', ')}`);
        let isConsecutive = true;
        for (let i = 0; i < periodNums.length - 1; i++) {
          if (periodNums[i] - periodNums[i + 1] !== 1) {
            isConsecutive = false;
            console.log(`    GAP: ${periodNums[i]} to ${periodNums[i+1]} (diff=${periodNums[i] - periodNums[i+1]})`);
          }
        }
        console.log(`    Are consecutive: ${isConsecutive}`);
      }
    }

    console.log(`  =========================================\n`);
  }

  // NI to Common: use direct value, or derive from Net Income minus Preferred Dividends
  let ttmNetIncomeToCommon = netIncomeToCommonDirect?.value ?? null;
  if (ttmNetIncomeToCommon === null && ttmNetIncome !== null && preferredDividends?.value != null) {
    ttmNetIncomeToCommon = ttmNetIncome - preferredDividends.value;
  }
  // Validation: NI to Common should not exceed Net Income
  if (ttmNetIncomeToCommon !== null && ttmNetIncome !== null && ttmNetIncomeToCommon > ttmNetIncome) {
    ttmNetIncomeToCommon = null;
  }

  // Derived values
  // BVPS = Common Equity / Shares Outstanding (exclude preferred stock)
  const commonEquity = totalEquity ? totalEquity - preferredValue : null;
  const bvps = commonEquity && sharesOutstanding ? commonEquity / sharesOutstanding : null;
  const avgAssetsValue = avgAssets?.average || totalAssets;
  const avgEquityValue = avgEquity?.average || totalEquity;

  // Profitability ratios
  const roe = ttmNetIncome && avgEquityValue ? (ttmNetIncome / avgEquityValue) * 100 : null;
  const roaa = ttmNetIncome && avgAssetsValue ? (ttmNetIncome / avgAssetsValue) * 100 : null;

  // Bank-specific ratios
  const totalRevenue = (ttmNii || 0) + (ttmNonintIncome || 0);
  const efficiencyRatio = ttmNonintExpense && totalRevenue > 0 ? (ttmNonintExpense / totalRevenue) * 100 : null;
  const depositsToAssets = totalDeposits && totalAssets ? (totalDeposits / totalAssets) * 100 : null;
  const equityToAssets = totalEquity && totalAssets ? (totalEquity / totalAssets) * 100 : null;
  const loansToAssets = loansValue && totalAssets ? (loansValue / totalAssets) * 100 : null;
  const loansToDeposits = loansValue && totalDeposits ? (loansValue / totalDeposits) * 100 : null;

  // Graham metrics (grahamNum requires EPS and BVPS, price-dependent metrics are null placeholders)
  const grahamNum = ttmEps && bvps && ttmEps > 0 && bvps > 0 ? Math.sqrt(22.5 * ttmEps * bvps) : null;
  const dividendPayoutRatio = ttmDps && ttmEps && ttmEps > 0 ? (ttmDps / ttmEps) * 100 : null;

  // Price/market data placeholders - will be populated from external source
  // All price-dependent metrics return null until price data is available
  const price = null;  // Placeholder: external price source
  const marketCap = null;  // Placeholder: price * sharesOutstanding
  const pni = null;  // Placeholder: price / ttmEps (P/E ratio)
  const priceToBook = null;  // Placeholder: price / bvps (P/B ratio)
  const grahamMoS = null;  // Placeholder: grahamNum - price (margin of safety $)
  const grahamMoSPct = null;  // Placeholder: ((grahamNum - price) / price) * 100 (margin of safety %)

  const dataDate = assets?.ddate || equity?.ddate || netIncome?.date;
  const formattedDate = dataDate ? `${dataDate.slice(0,4)}-${dataDate.slice(4,6)}-${dataDate.slice(6,8)}` : null;

  // historicalStatements already built at start of function for TTM calculations

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
      PreferredStockDividends: preferredDividends,
      EarningsPerShareBasic: eps
    },
    dividends: {
      CommonStockDividendsPerShareDeclared: dps
    },
    averages: {
      Assets: avgAssets,
      Equity: avgEquity
    },
    // Include "as reported" historical statements
    historicalBalanceSheet: historicalStatements.historicalBalanceSheet,
    historicalIncomeStatement: historicalStatements.historicalIncomeStatement,
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
      // Balance Sheet
      totalAssets,
      cashAndCashEquivalents: cashAndCashEquivalents?.value,
      loans: loansValue,
      totalLiabilities: liabilities?.value,
      totalDeposits,
      totalEquity,
      preferredStock: preferredValue,
      sharesOutstanding,
      // Income Statement (TTM)
      ttmInterestIncome: interestIncome?.value,
      ttmInterestExpense: interestExpense?.value,
      ttmNetInterestIncome: ttmNii,
      ttmNoninterestIncome: ttmNonintIncome,
      ttmNoninterestExpense: ttmNonintExpense,
      ttmProvisionForCreditLosses: provisionForCreditLosses?.value,
      ttmPreTaxIncome: preTaxIncome?.value,
      ttmNetIncome,
      ttmNetIncomeToCommon,
      ttmEps,
      ttmDividendPerShare: ttmDps ? parseFloat(ttmDps.toFixed(4)) : null,
      // Derived values
      bvps: bvps ? parseFloat(bvps.toFixed(4)) : null,
      // Profitability ratios
      roe: roe ? parseFloat(roe.toFixed(4)) : null,
      roaa: roaa ? parseFloat(roaa.toFixed(4)) : null,
      // Bank-specific ratios
      efficiencyRatio: efficiencyRatio ? parseFloat(efficiencyRatio.toFixed(2)) : null,
      depositsToAssets: depositsToAssets ? parseFloat(depositsToAssets.toFixed(2)) : null,
      equityToAssets: equityToAssets ? parseFloat(equityToAssets.toFixed(2)) : null,
      loansToAssets: loansToAssets ? parseFloat(loansToAssets.toFixed(2)) : null,
      loansToDeposits: loansToDeposits ? parseFloat(loansToDeposits.toFixed(2)) : null,
      // Graham metrics
      grahamNum: grahamNum ? parseFloat(grahamNum.toFixed(4)) : null,
      dividendPayoutRatio: dividendPayoutRatio ? parseFloat(dividendPayoutRatio.toFixed(2)) : null,
      // Price/market data placeholders (null until external price source integrated)
      price,
      marketCap,
      pni,  // P/E ratio
      priceToBook,  // P/B ratio
      grahamMoS,  // Graham margin of safety ($)
      grahamMoSPct,  // Graham margin of safety (%)
      // Averages for ratio calculations
      avgAssets: avgAssetsValue ? parseFloat(avgAssetsValue.toFixed(0)) : null,
      avgEquity: avgEquityValue ? parseFloat(avgEquityValue.toFixed(0)) : null,
      // Metadata
      dataDate: formattedDate,
      ttmMethod: netIncome?.method || 'unknown',
      returnRatioAvgMethod: avgAssets?.method || avgEquity?.method || 'single-period',
      isStale: formattedDate ? new Date(formattedDate) < new Date('2024-01-01') : true,
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
    console.log('');
    console.log('Usage: node scripts/fetch-sec-fs-datasets.cjs [options]');
    console.log('');
    console.log('Options:');
    console.log('  --help, -h     Show this help');
    console.log('  --verbose, -v  Show verbose output');
    console.log('');
    console.log('Prerequisites:');
    console.log('  1. Download SEC FS Data Sets ZIP files to .sec-data-cache/');
    console.log('     Example: 2025q3.zip, 2025q2.zip, etc.');
    console.log('');
    console.log('Banks are discovered dynamically by SIC code from SEC filings.');
    console.log(`SIC codes: ${CONFIG.financialInstitutionSicCodes.join(', ')}`);
    process.exit(0);
  }

  console.log('SEC FINANCIAL STATEMENT DATA SETS PROCESSOR');
  console.log(`Started: ${new Date().toISOString()}`);
  console.log('Features: "As Reported on Face" presentation via pre.txt');
  console.log('Discovery: Dynamic by SIC code from SEC filings');

  // Ensure cache directory exists
  if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
  }

  // Fetch SEC company tickers for ticker resolution
  console.log('\nFetching SEC company tickers for ticker resolution...');
  let secTickersByCik = new Map();
  try {
    secTickersByCik = await fetchSecCompanyTickers();
    console.log(`  Loaded ${secTickersByCik.size} companies with tickers`);
  } catch (e) {
    console.warn(`  Warning: Could not fetch SEC tickers: ${e.message}`);
    console.warn('  Continuing without ticker resolution...');
  }

  // Load optional bank list for additional ticker hints
  const bankList = loadBankList();
  if (bankList.length > 0) {
    console.log(`  Loaded ${bankList.length} banks from bank-list.json (optional ticker hints)`);
    // Merge bank-list tickers into secTickersByCik
    for (const bank of bankList) {
      const cik = bank.cik?.padStart(10, '0');
      if (cik && bank.ticker) {
        if (!secTickersByCik.has(cik)) {
          secTickersByCik.set(cik, []);
        }
        const tickers = secTickersByCik.get(cik);
        if (!tickers.includes(bank.ticker)) {
          tickers.push(bank.ticker);
        }
      }
    }
  }

  // Find cached ZIP files
  const cached = findCachedQuarters();
  if (cached.length === 0) {
    console.error('\nNo ZIP files found in .sec-data-cache/');
    console.error('Please download SEC Financial Statement Data Sets ZIP files.');
    console.error('Example: 2025q3.zip, 2025q2.zip, etc.');
    console.error('Download from: https://www.sec.gov/data-research/sec-markets-data/financial-statement-data-sets');
    process.exit(1);
  }

  console.log(`\nFound ${cached.length} ZIP files in cache`);
  cached.forEach(q => console.log(`  - ${q.period}: ${path.basename(q.zipPath)}`));

  // Process all quarters if quartersToFetch is 0 or undefined
  const datasetUrls = CONFIG.quartersToFetch > 0
    ? cached.slice(0, CONFIG.quartersToFetch)
    : cached;

  // Process each quarter (banks discovered dynamically by SIC code)
  const quarterlyResults = [];
  for (const datasetInfo of datasetUrls) {
    try {
      const result = await processQuarterlyDataset(datasetInfo);
      if (result) {
        quarterlyResults.push(result);
      }

      // Memory management: Clear extracted files after processing
      const extractDir = path.join(TEMP_DIR, datasetInfo.period);
      if (fs.existsSync(extractDir)) {
        try {
          fs.rmSync(extractDir, { recursive: true });
          verboseLog(`  Cleaned up extracted files for ${datasetInfo.period}`);
        } catch (cleanupErr) {
          verboseLog(`  Warning: Could not clean up ${extractDir}: ${cleanupErr.message}`);
        }
      }

      // Hint to garbage collector (not guaranteed, but can help)
      if (global.gc) {
        global.gc();
        verboseLog(`  Triggered garbage collection`);
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

  // Aggregate bank data (banks discovered dynamically by SIC code)
  console.log('\nAggregating bank data...');
  const bankDataMap = aggregateBankData(quarterlyResults, secTickersByCik);

  // Resolve missing tickers via SEC submissions endpoint fallback
  await resolveMissingTickers(bankDataMap, secTickersByCik);

  // Filter to active filers only (filed within last N days)
  console.log(`\nFiltering to active filers (filed within ${CONFIG.activeFilerThresholdDays} days)...`);
  const now = new Date();
  const thresholdDate = new Date(now.getTime() - CONFIG.activeFilerThresholdDays * 24 * 60 * 60 * 1000);
  const thresholdDateStr = thresholdDate.toISOString().slice(0, 10).replace(/-/g, '');

  let activeBanks = 0;
  let staleBanks = 0;
  bankDataMap.forEach((bankData, cik) => {
    // Find most recent filing date from submissions
    let mostRecentFiled = null;
    for (const sub of bankData.submissions) {
      // Only consider 10-Q and 10-K filings
      if (sub.form !== '10-Q' && sub.form !== '10-K') continue;
      if (!mostRecentFiled || sub.filed > mostRecentFiled) {
        mostRecentFiled = sub.filed;
      }
    }

    // Mark stale banks for removal
    if (!mostRecentFiled || mostRecentFiled < thresholdDateStr) {
      bankData._isStale = true;
      staleBanks++;
      verboseLog(`  Excluding stale filer: ${bankData.ticker || cik} (last filed: ${mostRecentFiled || 'never'})`);
    } else {
      activeBanks++;
    }
  });

  console.log(`  Active filers: ${activeBanks}`);
  console.log(`  Stale filers excluded: ${staleBanks}`);

  // Calculate metrics (only for active filers)
  console.log('\nCalculating metrics...');
  const results = [];
  const rawDataStore = {};

  let bankIndex = 0;
  bankDataMap.forEach((bankData, cik) => {
    // Skip stale filers
    if (bankData._isStale) return;

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
      submissions: bankData.submissions.slice(0, 10), // Keep recent submissions
    };
  });

  console.log(`  Total: ${results.length} banks with data`);

  // Sort by ticker
  results.sort((a, b) => (a.ticker || '').localeCompare(b.ticker || ''));

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Save banks.json
  const banksOutputPath = path.join(OUTPUT_DIR, 'banks.json');
  fs.writeFileSync(banksOutputPath, JSON.stringify(results, null, 2));
  console.log(`\nSaved metrics: ${banksOutputPath}`);

  // Save individual bank raw data files (to avoid GitHub's 100MB file limit)
  const banksDataDir = path.join(OUTPUT_DIR, 'banks');
  if (!fs.existsSync(banksDataDir)) {
    fs.mkdirSync(banksDataDir, { recursive: true });
  }

  // Track which banks have data files
  const bankDataIndex = {};
  let savedBankCount = 0;

  for (const [cik, bankRawData] of Object.entries(rawDataStore)) {
    const bankFilePath = path.join(banksDataDir, `${cik}.json`);
    fs.writeFileSync(bankFilePath, JSON.stringify(bankRawData, null, 2));
    savedBankCount++;

    bankDataIndex[cik] = {
      ticker: bankRawData.ticker,
      companyName: bankRawData.companyName,
      hasHistoricalBS: !!(bankRawData.rawData?.historicalBalanceSheet?.annual?.length > 0 ||
                          bankRawData.rawData?.historicalBalanceSheet?.quarterly?.length > 0),
      hasHistoricalIS: !!(bankRawData.rawData?.historicalIncomeStatement?.annual?.length > 0 ||
                          bankRawData.rawData?.historicalIncomeStatement?.quarterly?.length > 0),
    };
  }

  console.log(`Saved ${savedBankCount} individual bank data files to: ${banksDataDir}/`);

  // Save lightweight index file (metadata only, no raw data)
  const indexOutputPath = path.join(OUTPUT_DIR, 'sec-data-index.json');
  fs.writeFileSync(indexOutputPath, JSON.stringify({
    metadata: {
      source: 'SEC Financial Statement Data Sets',
      url: 'https://www.sec.gov/data-research/sec-markets-data/financial-statement-data-sets',
      quartersProcessed: quarterlyResults.map(q => q.period),
      generatedAt: new Date().toISOString(),
      bankCount: Object.keys(bankDataIndex).length,
      features: ['As Reported on Face presentation via pre.txt', 'Per-bank data files']
    },
    banks: bankDataIndex
  }, null, 2));
  console.log(`Saved data index: ${indexOutputPath}`);

  // Summary stats
  const withHistoricalBS = Object.values(bankDataIndex).filter(b => b.hasHistoricalBS).length;

  console.log(`\nSummary:`);
  console.log(`  Banks with historical Balance Sheet: ${withHistoricalBS}`);
  console.log(`  Quarters processed: ${quarterlyResults.length}`);

  console.log(`\nCompleted: ${new Date().toISOString()}`);
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
  buildHistoricalStatements,
};

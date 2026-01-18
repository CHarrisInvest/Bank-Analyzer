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
  // How many quarters of data to fetch (for TTM calculation we need at least 4)
  quartersToFetch: 5,

  // Financial institution SIC codes
  financialInstitutionSicCodes: [
    '6020', '6021', '6022', '6029',  // Commercial Banks
    '6035', '6036',                   // Savings Institutions
  ],

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

// Directories
const TEMP_DIR = path.join(__dirname, '..', '.sec-data-cache');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'data');

/**
 * Log message if verbose mode is enabled
 */
function verboseLog(...args) {
  if (VERBOSE) console.log('  [verbose]', ...args);
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
 * Process presentation data (pre.txt) to get statement structure
 * This is the KEY to "as reported on the face" presentation
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

  // Organize by adsh -> stmt -> ordered items
  const presentations = new Map();

  for (const row of preData) {
    const { adsh, stmt, tag, version, line, plabel, negating, inpth } = row;

    // Only process Balance Sheet (BS) and Income Statement (IS)
    if (!['BS', 'IS'].includes(stmt)) continue;

    if (!presentations.has(adsh)) {
      presentations.set(adsh, { BS: [], IS: [] });
    }

    const stmtData = presentations.get(adsh);

    stmtData[stmt].push({
      tag,
      version,
      line: parseInt(line) || 0,
      label: plabel || tag,  // plabel is company's preferred label
      negating: negating === '1',
      indent: parseInt(inpth) || 0,
    });
  }

  // Sort each statement by line number (presentation order)
  for (const [adsh, stmts] of presentations) {
    stmts.BS.sort((a, b) => a.line - b.line);
    stmts.IS.sort((a, b) => a.line - b.line);
  }

  return presentations;
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

  // Extract if needed
  if (!fs.existsSync(extractDir) || !fs.existsSync(path.join(extractDir, 'num.txt'))) {
    console.log(`  Extracting...`);
    if (!extractZip(zipPath, extractDir)) {
      return null;
    }
  }

  // Parse sub.txt for bank submissions
  console.log(`  Parsing sub.txt...`);
  const subData = await parseTsvFile(path.join(extractDir, 'sub.txt'));
  console.log(`    Found ${subData.length} submissions`);

  const bankSubmissions = subData.filter(sub => {
    const cik = sub.cik?.padStart(10, '0');
    return bankCiks.has(cik);
  });
  console.log(`    Matched ${bankSubmissions.length} bank submissions`);

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
 */
function aggregateBankData(quarterlyResults, bankList) {
  const bankDataMap = new Map();

  // Initialize bank data structures
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
        submissions: [],
        presentationByFiling: {}, // adsh -> {BS: [...], IS: [...]}
      });
    }
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
    };
  }

  const periodsToUse = pointInTime.slice(0, 5);
  const sum = periodsToUse.reduce((acc, d) => acc + d.value, 0);
  const average = sum / periodsToUse.length;

  return {
    average,
    ending: ending.value,
    endingDate: ending.ddate,
    method: periodsToUse.length >= 5 ? '5-point-avg' : `${periodsToUse.length}-point-avg`,
    periodCount: periodsToUse.length,
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

  // Rule A: Quarterly-first - sum 4 quarters if available
  if (quarterlyValues.length >= 4) {
    const topQuarters = quarterlyValues.slice(0, 4);
    const ttmValue = topQuarters.reduce((sum, q) => sum + q.value, 0);
    return {
      value: ttmValue,
      date: topQuarters[0].ddate,
      method: 'sum-4Q',
      form: [...new Set(topQuarters.map(q => q.form))].join('+'),
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
      };
    }
  }

  return null;
}

/**
 * Build historical financial statements with presentation structure
 * This creates the "as reported on the face" data structure
 *
 * Uses the most recent filing's presentation order as the canonical structure,
 * then maps values from all periods to align with that structure.
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

  // Separate 10-K and 10-Q submissions
  const annual10Ks = sortedSubmissions.filter(s => s.form === '10-K').slice(0, 4);
  const quarterly10Qs = sortedSubmissions.filter(s => s.form === '10-Q').slice(0, 5);

  /**
   * Build canonical presentation structure from most recent filing
   * and map values from all periods
   */
  const buildStatements = (filings, isAnnual, stmtType) => {
    if (filings.length === 0) return { statements: [], canonicalItems: [] };

    // Find most recent filing with presentation data
    let canonicalFiling = null;
    let canonicalPres = null;
    for (const filing of filings) {
      const pres = presentationByFiling[filing.adsh];
      if (pres && pres[stmtType] && pres[stmtType].length > 0) {
        canonicalFiling = filing;
        canonicalPres = pres[stmtType];
        break;
      }
    }

    if (!canonicalPres) return { statements: [], canonicalItems: [] };

    // Build canonical item list from most recent filing's presentation
    // Also collect any additional items from older filings
    const canonicalItems = [...canonicalPres].sort((a, b) => a.line - b.line);
    const tagSet = new Set(canonicalItems.map(item => item.tag));

    // Check older filings for any items not in the canonical list
    for (const filing of filings.slice(1)) {
      const pres = presentationByFiling[filing.adsh];
      if (!pres || !pres[stmtType]) continue;

      for (const item of pres[stmtType]) {
        if (!tagSet.has(item.tag)) {
          // Add to end of canonical list (older items not in newest filing)
          canonicalItems.push({
            ...item,
            line: 9999, // Put at end
            fromOlderFiling: true,
          });
          tagSet.add(item.tag);
        }
      }
    }

    // Build value map for each period
    const statements = [];
    for (const filing of filings) {
      const periodKey = isAnnual ? `FY ${filing.fy}` : `${filing.fp} ${filing.fy}`;
      const pres = presentationByFiling[filing.adsh];

      // Build a map of tag -> presentation info for this filing
      const filingPresMap = new Map();
      if (pres && pres[stmtType]) {
        for (const item of pres[stmtType]) {
          filingPresMap.set(item.tag, item);
        }
      }

      const items = [];
      for (const canonicalItem of canonicalItems) {
        const conceptData = concepts[canonicalItem.tag];
        if (!conceptData) continue;

        // Get this filing's presentation info (for label/indent specific to this filing)
        const filingPres = filingPresMap.get(canonicalItem.tag);

        // Determine expected qtrs value
        let targetQtrs;
        if (stmtType === 'BS') {
          targetQtrs = 0; // Balance sheet is point-in-time
        } else {
          // Income statement: qtrs=4 for annual, qtrs=1 for quarterly
          targetQtrs = isAnnual ? 4 : 1;
        }

        // Find value for this filing
        const match = conceptData.find(d =>
          d.adsh === filing.adsh && d.qtrs === targetQtrs
        );

        // Use filing-specific label if available, otherwise canonical
        const label = filingPres?.label || canonicalItem.label;
        const indent = filingPres?.indent ?? canonicalItem.indent;
        const negating = filingPres?.negating ?? canonicalItem.negating;

        items.push({
          tag: canonicalItem.tag,
          label: label,
          line: canonicalItem.line,
          indent: indent,
          negating: negating,
          value: match ? (negating ? -match.value : match.value) : null,
          uom: match?.uom || 'USD',
          hasValue: !!match,
        });
      }

      statements.push({
        period: periodKey,
        label: periodKey,
        form: filing.form,
        fy: filing.fy,
        fp: filing.fp,
        filed: filing.filed,
        ddate: filing.period,
        adsh: filing.adsh,
        items: items,
      });
    }

    // Return canonical items for the unified structure
    const canonicalItemsClean = canonicalItems.map(item => ({
      tag: item.tag,
      label: item.label,
      line: item.line,
      indent: item.indent,
    }));

    return { statements, canonicalItems: canonicalItemsClean };
  };

  const annualBS = buildStatements(annual10Ks, true, 'BS');
  const quarterlyBS = buildStatements(quarterly10Qs, false, 'BS');
  const annualIS = buildStatements(annual10Ks, true, 'IS');
  const quarterlyIS = buildStatements(quarterly10Qs, false, 'IS');

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
  };
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
  const sharesData = getLatestPointInTime(concepts['CommonStockSharesOutstanding']);

  // Averages for Return Ratios
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
  const dps = getTTMValue(concepts['CommonStockDividendsPerShareDeclared']) ||
              getTTMValue(concepts['CommonStockDividendsPerShareCashPaid']);

  // Extract values
  const totalAssets = assets?.value;
  const totalDeposits = deposits?.value;
  const totalEquity = equity?.value;
  const sharesOutstanding = sharesData?.value;
  const ttmNii = netInterestIncome?.value;
  const ttmNonintIncome = noninterestIncome?.value;
  const ttmNonintExpense = noninterestExpense?.value;
  const ttmNetIncome = netIncome?.value;
  const ttmEps = eps?.value;
  const ttmDps = dps?.value;

  // Derived values
  const bvps = totalEquity && sharesOutstanding ? totalEquity / sharesOutstanding : null;
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

  const dataDate = assets?.ddate || equity?.ddate || netIncome?.date;
  const formattedDate = dataDate ? `${dataDate.slice(0,4)}-${dataDate.slice(4,6)}-${dataDate.slice(6,8)}` : null;

  // Build historical statements with "as reported" presentation
  const historicalStatements = buildHistoricalStatements(bankData);

  // Build raw data for audit trail
  const rawData = {
    balanceSheet: {
      Assets: assets,
      CashAndCashEquivalents: cashAndCashEquivalents,
      LoansAndLeasesReceivable: loans,
      Liabilities: liabilities,
      Deposits: deposits,
      StockholdersEquity: equity,
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
      totalAssets,
      cashAndCashEquivalents: cashAndCashEquivalents?.value,
      loans: loans?.value,
      totalLiabilities: liabilities?.value,
      totalDeposits,
      totalEquity,
      sharesOutstanding,
      ttmInterestIncome: interestIncome?.value,
      ttmInterestExpense: interestExpense?.value,
      ttmNetInterestIncome: ttmNii,
      ttmNoninterestIncome: ttmNonintIncome,
      ttmNoninterestExpense: ttmNonintExpense,
      ttmProvisionForCreditLosses: provisionForCreditLosses?.value,
      ttmPreTaxIncome: preTaxIncome?.value,
      ttmNetIncome,
      ttmEps,
      bvps: bvps ? parseFloat(bvps.toFixed(4)) : null,
      roe: roe ? parseFloat(roe.toFixed(4)) : null,
      roaa: roaa ? parseFloat(roaa.toFixed(4)) : null,
      efficiencyRatio: efficiencyRatio ? parseFloat(efficiencyRatio.toFixed(2)) : null,
      depositsToAssets: depositsToAssets ? parseFloat(depositsToAssets.toFixed(2)) : null,
      equityToAssets: equityToAssets ? parseFloat(equityToAssets.toFixed(2)) : null,
      grahamNum: ttmEps && bvps && ttmEps > 0 && bvps > 0 ? parseFloat(Math.sqrt(22.5 * ttmEps * bvps).toFixed(4)) : null,
      ttmDividendPerShare: ttmDps ? parseFloat(ttmDps.toFixed(4)) : null,
      dividendPayoutRatio: ttmDps && ttmEps && ttmEps > 0 ? parseFloat(((ttmDps / ttmEps) * 100).toFixed(2)) : null,
      avgAssets: avgAssetsValue ? parseFloat(avgAssetsValue.toFixed(0)) : null,
      avgEquity: avgEquityValue ? parseFloat(avgEquityValue.toFixed(0)) : null,
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
    console.log('  2. Run discover-banks.cjs first to generate bank-list.json');
    process.exit(0);
  }

  console.log('SEC FINANCIAL STATEMENT DATA SETS PROCESSOR');
  console.log(`Started: ${new Date().toISOString()}`);
  console.log('Features: "As Reported on Face" presentation via pre.txt');

  // Ensure cache directory exists
  if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
  }

  // Load bank list
  console.log('\nLoading bank list...');
  const bankList = loadBankList();
  console.log(`  Found ${bankList.length} banks`);

  const bankCiks = new Set();
  bankList.forEach(bank => {
    if (bank.cik) {
      bankCiks.add(bank.cik.padStart(10, '0'));
    }
  });
  console.log(`  ${bankCiks.size} unique CIKs`);

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

  // Aggregate bank data
  console.log('\nAggregating bank data...');
  const bankDataMap = aggregateBankData(quarterlyResults, bankList);

  // Calculate metrics
  console.log('Calculating metrics...');
  const results = [];
  const rawDataStore = {};

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

  // Save sec-raw-data.json
  const rawDataOutputPath = path.join(OUTPUT_DIR, 'sec-raw-data.json');
  fs.writeFileSync(rawDataOutputPath, JSON.stringify({
    metadata: {
      source: 'SEC Financial Statement Data Sets',
      url: 'https://www.sec.gov/data-research/sec-markets-data/financial-statement-data-sets',
      quartersProcessed: quarterlyResults.map(q => q.period),
      generatedAt: new Date().toISOString(),
      bankCount: Object.keys(rawDataStore).length,
      features: ['As Reported on Face presentation via pre.txt']
    },
    banks: rawDataStore
  }, null, 2));
  console.log(`Saved raw data: ${rawDataOutputPath}`);

  // Summary stats
  const withHistoricalBS = Object.values(rawDataStore).filter(b =>
    b.rawData?.historicalBalanceSheet?.annual?.length > 0 ||
    b.rawData?.historicalBalanceSheet?.quarterly?.length > 0
  ).length;

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

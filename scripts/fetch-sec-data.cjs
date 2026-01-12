#!/usr/bin/env node
/**
 * Standalone SEC EDGAR Data Fetcher for GitHub Actions
 * Fetches bank financial data from SEC EDGAR API and saves to JSON file
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  edgarUserAgent: process.env.EDGAR_USER_AGENT || 'Bank-Analyzer github-actions@example.com',
  requestDelay: 150, // 150ms = ~6 req/sec (under SEC's 10 req/sec limit)
  bankTickers: [
    // Major banks
    'JPM', 'BAC', 'WFC', 'C', 'USB', 'PNC', 'TFC',
    // Regional banks
    'RF', 'CFG', 'KEY', 'FITB', 'HBAN', 'MTB', 'ZION',
    // Community banks
    'SBNY', 'EWBC', 'WAL', 'UMBF', 'ONB', 'BANR', 'CATY',
    'CVBF', 'HTLF', 'IBOC', 'TOWN', 'FFNW', 'WASH'
  ]
};

// Delay helper
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Get current stock price from Yahoo Finance
 */
async function getCurrentPrice(ticker) {
  try {
    const url = `https://query2.finance.yahoo.com/v8/finance/chart/${ticker}`;
    const response = await axios.get(url, {
      timeout: 10000,
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });

    const price = response.data?.chart?.result?.[0]?.meta?.regularMarketPrice;
    return price ? parseFloat(price) : null;
  } catch (error) {
    console.warn(`  Warning: Could not fetch price for ${ticker}`);
    return null;
  }
}

/**
 * Get company CIK and info from SEC
 */
async function getCompanyInfo(ticker) {
  try {
    await delay(CONFIG.requestDelay);

    const response = await axios.get(
      `https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=${ticker}&type=&dateb=&owner=exclude&count=1&output=atom`,
      {
        headers: { 'User-Agent': CONFIG.edgarUserAgent },
        timeout: 10000
      }
    );

    // Parse XML response to extract CIK
    const cikMatch = response.data.match(/<CIK>(\d+)<\/CIK>/);
    const nameMatch = response.data.match(/<title>([^<]+)<\/title>/);

    if (!cikMatch) {
      throw new Error('CIK not found');
    }

    const cik = cikMatch[1].padStart(10, '0');
    const name = nameMatch ? nameMatch[1].trim() : ticker;

    return { cik, name };
  } catch (error) {
    throw new Error(`Failed to get company info: ${error.message}`);
  }
}

/**
 * Fetch company facts from SEC EDGAR
 */
async function getCompanyFacts(cik) {
  try {
    await delay(CONFIG.requestDelay);

    const paddedCik = cik.padStart(10, '0');
    const url = `https://data.sec.gov/api/xbrl/companyfacts/CIK${paddedCik}.json`;

    const response = await axios.get(url, {
      headers: { 'User-Agent': CONFIG.edgarUserAgent },
      timeout: 30000
    });

    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch company facts: ${error.message}`);
  }
}

/**
 * Get latest value for a specific XBRL concept
 */
function getLatestConceptValue(companyFacts, concept, taxonomy = 'us-gaap') {
  try {
    const conceptData = companyFacts.facts?.[taxonomy]?.[concept];
    if (!conceptData) return null;

    const usdUnits = conceptData.units?.USD;
    if (!usdUnits || usdUnits.length === 0) return null;

    // Prefer annual data (10-K)
    const annualData = usdUnits
      .filter(item => item.form === '10-K' && item.val && item.end)
      .sort((a, b) => new Date(b.end) - new Date(a.end));

    if (annualData.length > 0) {
      return {
        value: annualData[0].val,
        date: annualData[0].end
      };
    }

    // Fallback to quarterly (10-Q)
    const quarterlyData = usdUnits
      .filter(item => item.form === '10-Q' && item.val && item.end)
      .sort((a, b) => new Date(b.end) - new Date(a.end));

    if (quarterlyData.length > 0) {
      return {
        value: quarterlyData[0].val,
        date: quarterlyData[0].end
      };
    }

    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Calculate all banking metrics
 */
function calculateMetrics(companyFacts, currentPrice) {
  // Extract raw values
  const totalAssets = getLatestConceptValue(companyFacts, 'Assets');
  const totalEquity = getLatestConceptValue(companyFacts, 'StockholdersEquity') ||
                      getLatestConceptValue(companyFacts, 'StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest');
  const netIncome = getLatestConceptValue(companyFacts, 'NetIncomeLoss') ||
                    getLatestConceptValue(companyFacts, 'ProfitLoss') ||
                    getLatestConceptValue(companyFacts, 'NetIncomeLossAvailableToCommonStockholdersBasic');
  const sharesOutstanding = getLatestConceptValue(companyFacts, 'CommonStockSharesOutstanding') ||
                            getLatestConceptValue(companyFacts, 'WeightedAverageNumberOfSharesOutstandingBasic');
  const eps = getLatestConceptValue(companyFacts, 'EarningsPerShareBasic') ||
              getLatestConceptValue(companyFacts, 'EarningsPerShareDiluted');
  const goodwill = getLatestConceptValue(companyFacts, 'Goodwill');
  const intangibleAssets = getLatestConceptValue(companyFacts, 'IntangibleAssetsNetExcludingGoodwill');

  // Calculate derived values
  const tangibleBookValue = totalEquity?.value ?
    totalEquity.value - (goodwill?.value || 0) - (intangibleAssets?.value || 0) : null;

  const marketCap = currentPrice && sharesOutstanding?.value ?
    currentPrice * sharesOutstanding.value : null;

  const bookValuePerShare = totalEquity?.value && sharesOutstanding?.value ?
    totalEquity.value / sharesOutstanding.value : null;

  const tangibleBookValuePerShare = tangibleBookValue && sharesOutstanding?.value ?
    tangibleBookValue / sharesOutstanding.value : null;

  // Calculate ratios
  const pni = marketCap && netIncome?.value && netIncome.value > 0 ?
    marketCap / netIncome.value : null;

  const ptbvps = currentPrice && tangibleBookValuePerShare && tangibleBookValuePerShare > 0 ?
    currentPrice / tangibleBookValuePerShare : null;

  const mktCapSE = marketCap && totalEquity?.value && totalEquity.value > 0 ?
    marketCap / totalEquity.value : null;

  const niTBV = netIncome?.value && tangibleBookValue && tangibleBookValue > 0 ?
    netIncome.value / tangibleBookValue : null;

  const roe = netIncome?.value && totalEquity?.value && totalEquity.value > 0 ?
    (netIncome.value / totalEquity.value) * 100 : null;

  const rota = netIncome?.value && totalAssets?.value && totalAssets.value > 0 ?
    (netIncome.value / totalAssets.value) * 100 : null;

  // Graham metrics
  const grahamNumber = eps?.value && bookValuePerShare && eps.value > 0 && bookValuePerShare > 0 ?
    Math.sqrt(22.5 * eps.value * bookValuePerShare) : null;

  const grahamMoS = grahamNumber && currentPrice ?
    grahamNumber - currentPrice : null;

  const grahamMoSPct = grahamNumber && currentPrice && currentPrice > 0 ?
    ((grahamNumber - currentPrice) / currentPrice) * 100 : null;

  return {
    price: currentPrice,
    marketCap: marketCap ? marketCap / 1000000 : null, // Convert to millions
    pni: pni ? parseFloat(pni.toFixed(4)) : null,
    ptbvps: ptbvps ? parseFloat(ptbvps.toFixed(4)) : null,
    mktCapSE: mktCapSE ? parseFloat(mktCapSE.toFixed(4)) : null,
    niTBV: niTBV ? parseFloat(niTBV.toFixed(4)) : null,
    roe: roe ? parseFloat(roe.toFixed(4)) : null,
    rota: rota ? parseFloat(rota.toFixed(4)) : null,
    grahamNum: grahamNumber ? parseFloat(grahamNumber.toFixed(4)) : null,
    grahamMoS: grahamMoS ? parseFloat(grahamMoS.toFixed(4)) : null,
    grahamMoSPct: grahamMoSPct ? parseFloat(grahamMoSPct.toFixed(4)) : null,
    dataDate: netIncome?.date || totalEquity?.date || new Date().toISOString().split('T')[0]
  };
}

/**
 * Determine exchange from company name or default
 */
function determineExchange(ticker, companyName) {
  // Most banks are on NYSE
  const nyseCommon = ['JPM', 'BAC', 'WFC', 'C', 'USB', 'PNC', 'TFC', 'RF', 'CFG', 'KEY', 'FITB', 'MTB', 'ZION'];
  if (nyseCommon.includes(ticker)) return 'NYSE';

  // Some are on NASDAQ
  const nasdaqCommon = ['HBAN', 'EWBC', 'UMBF', 'ONB', 'BANR', 'CATY', 'CVBF', 'HTLF', 'IBOC', 'TOWN', 'FFNW', 'WASH'];
  if (nasdaqCommon.includes(ticker)) return 'NASDAQ';

  // Check company name
  if (companyName.includes('Inc.') || companyName.includes('Corp')) return 'NASDAQ';

  return 'NYSE'; // Default
}

/**
 * Process a single bank
 */
async function processBank(ticker, index) {
  console.log(`\n[${index}] Processing ${ticker}...`);

  try {
    // Get company info and CIK
    const companyInfo = await getCompanyInfo(ticker);
    console.log(`  ✓ Found: ${companyInfo.name} (CIK: ${companyInfo.cik})`);

    // Fetch company facts from SEC
    const companyFacts = await getCompanyFacts(companyInfo.cik);
    console.log(`  ✓ Fetched SEC EDGAR data`);

    // Get current price
    await delay(100); // Small delay for Yahoo Finance
    const currentPrice = await getCurrentPrice(ticker);
    if (currentPrice) {
      console.log(`  ✓ Current price: $${currentPrice.toFixed(2)}`);
    }

    // Calculate metrics
    const metrics = calculateMetrics(companyFacts, currentPrice);
    console.log(`  ✓ Calculated metrics`);

    return {
      id: `bank-${index}`,
      ticker: ticker,
      bankName: companyInfo.name,
      exchange: determineExchange(ticker, companyInfo.name),
      ...metrics,
      updatedAt: new Date().toISOString()
    };

  } catch (error) {
    console.error(`  ✗ Error processing ${ticker}: ${error.message}`);
    return null;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('========================================');
  console.log('SEC EDGAR Bank Data Fetcher');
  console.log('========================================\n');
  console.log(`Node version: ${process.version}`);
  console.log(`Working directory: ${process.cwd()}`);
  console.log(`User-Agent: ${CONFIG.edgarUserAgent}`);
  console.log(`Banks to process: ${CONFIG.bankTickers.length}`);
  console.log(`Started: ${new Date().toISOString()}\n`);

  // Verify axios is loaded
  try {
    console.log(`Axios loaded: ${typeof axios}`);
  } catch (err) {
    console.error('ERROR: axios not available:', err.message);
    process.exit(1);
  }

  const results = [];
  const errors = [];

  // Process each bank sequentially
  for (let i = 0; i < CONFIG.bankTickers.length; i++) {
    const ticker = CONFIG.bankTickers[i];
    const bankData = await processBank(ticker, i);

    if (bankData) {
      results.push(bankData);
    } else {
      errors.push(ticker);
    }

    // Progress indicator
    console.log(`Progress: ${i + 1}/${CONFIG.bankTickers.length}`);
  }

  // Sort by market cap (descending)
  results.sort((a, b) => {
    if (!a.marketCap) return 1;
    if (!b.marketCap) return -1;
    return b.marketCap - a.marketCap;
  });

  // Save to JSON file (in public/ for Vite and GitHub Pages)
  const outputPath = path.join(__dirname, '..', 'public', 'data', 'banks.json');
  const outputDir = path.dirname(outputPath);

  console.log(`\nOutput path: ${outputPath}`);
  console.log(`Output directory: ${outputDir}`);

  // Create data directory if it doesn't exist
  try {
    if (!fs.existsSync(outputDir)) {
      console.log('Creating output directory...');
      fs.mkdirSync(outputDir, { recursive: true });
      console.log('✓ Directory created');
    } else {
      console.log('✓ Directory exists');
    }

    console.log('Writing JSON file...');
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
    console.log('✓ File written successfully');
  } catch (writeError) {
    console.error('ERROR writing output file:', writeError);
    throw writeError;
  }

  // Summary
  console.log('\n========================================');
  console.log('Summary');
  console.log('========================================');
  console.log(`Total banks: ${CONFIG.bankTickers.length}`);
  console.log(`Successful: ${results.length}`);
  console.log(`Failed: ${errors.length}`);

  if (errors.length > 0) {
    console.log(`\nFailed tickers: ${errors.join(', ')}`);
  }

  console.log(`\nOutput saved to: ${outputPath}`);
  console.log(`File size: ${fs.statSync(outputPath).size} bytes`);
  console.log(`Completed: ${new Date().toISOString()}`);
  console.log('========================================\n');

  // Exit successfully if we got at least some data
  // Only fail if ALL banks failed
  if (results.length === 0) {
    console.error('FATAL: No banks were processed successfully!');
    process.exit(1);
  } else {
    console.log(`✓ Success! Processed ${results.length}/${CONFIG.bankTickers.length} banks`);
    process.exit(0);
  }
}

// Run main function
main().catch(error => {
  console.error('\n========================================');
  console.error('FATAL ERROR');
  console.error('========================================');
  console.error('Error message:', error.message);
  console.error('Error stack:', error.stack);
  console.error('========================================\n');
  process.exit(1);
});

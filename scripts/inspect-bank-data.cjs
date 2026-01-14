#!/usr/bin/env node
/**
 * Inspect SEC EDGAR raw data for a specific bank
 * Shows all XBRL concepts, values, filing sources, and periods
 *
 * Usage: node scripts/inspect-bank-data.cjs ALLY
 */

const axios = require('axios');

const CONFIG = {
  edgarUserAgent: process.env.EDGAR_USER_AGENT || 'Bank-Analyzer research@example.com',

  // All concepts used by the Bank Analyzer (from fetch-sec-data.cjs)
  primaryFSConcepts: [
    // Balance Sheet - Universal
    'Assets',
    'StockholdersEquity',
    'StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest',
    'Liabilities',
    'LiabilitiesAndStockholdersEquity',
    'CashAndCashEquivalentsAtCarryingValue',
    'Cash',
    'Goodwill',
    'IntangibleAssetsNetExcludingGoodwill',
    'PreferredStockValue',
    'PreferredStockValueOutstanding',
    'CommonStockSharesOutstanding',
    'Deposits',

    // Income Statement - Universal
    'NetIncomeLoss',
    'ProfitLoss',
    'NetIncomeLossAvailableToCommonStockholdersBasic',
    'EarningsPerShareBasic',
    'EarningsPerShareDiluted',
    'Revenues',
    'OperatingExpenses',

    // Income Statement - Bank-specific
    'InterestIncomeExpenseNet',
    'NetInterestIncome',
    'NoninterestIncome',
    'NoninterestExpense',
    'ProvisionForLoanLeaseAndOtherLosses',
    'ProvisionForLoanAndLeaseLosses',
    'ProvisionForCreditLosses',

    // Cash Flow Statement
    'NetCashProvidedByUsedInOperatingActivities',
    'NetCashProvidedByUsedInInvestingActivities',
    'NetCashProvidedByUsedInFinancingActivities',
    'PaymentsOfDividendsCommonStock',
    'PaymentsOfDividends',

    // DEI taxonomy
    'EntityCommonStockSharesOutstanding',

    // Dividend concepts
    'CommonStockDividendsPerShareDeclared',
    'CommonStockDividendsPerShareCashPaid',
    'DividendsCommonStockCash',
    'Dividends',
  ]
};

// Bank CIK lookup (subset for quick reference)
const BANK_CIKS = {
  'ALLY': '0000040729',
  'JPM': '0000019617',
  'BAC': '0000070858',
  'WFC': '0000072971',
  'C': '0000831001',
  'USB': '0000036104',
  'PNC': '0000713676',
};

async function loadTickerToCikMap() {
  console.log('Loading SEC ticker-to-CIK mapping...');
  const response = await axios.get(
    'https://www.sec.gov/files/company_tickers.json',
    {
      headers: { 'User-Agent': CONFIG.edgarUserAgent },
      timeout: 30000
    }
  );

  const map = {};
  for (const key in response.data) {
    const company = response.data[key];
    if (company.ticker && company.cik_str) {
      map[company.ticker.toUpperCase()] = String(company.cik_str).padStart(10, '0');
    }
  }
  return map;
}

async function getCompanyFacts(cik) {
  const paddedCik = cik.padStart(10, '0');
  const url = `https://data.sec.gov/api/xbrl/companyfacts/CIK${paddedCik}.json`;

  console.log(`Fetching: ${url}`);
  const response = await axios.get(url, {
    headers: { 'User-Agent': CONFIG.edgarUserAgent },
    timeout: 30000
  });

  return response.data;
}

function formatValue(val, unit) {
  if (unit === 'USD') {
    if (Math.abs(val) >= 1e9) return `$${(val / 1e9).toFixed(2)}B`;
    if (Math.abs(val) >= 1e6) return `$${(val / 1e6).toFixed(2)}M`;
    return `$${val.toFixed(2)}`;
  }
  if (unit === 'shares') {
    if (val >= 1e9) return `${(val / 1e9).toFixed(2)}B`;
    if (val >= 1e6) return `${(val / 1e6).toFixed(2)}M`;
    return val.toLocaleString();
  }
  if (unit === 'USD/shares') {
    return `$${val.toFixed(4)}`;
  }
  return val.toString();
}

async function inspectBank(ticker) {
  console.log('========================================');
  console.log(`SEC EDGAR Data Inspector: ${ticker}`);
  console.log('========================================\n');

  // Get CIK
  let cik = BANK_CIKS[ticker.toUpperCase()];
  if (!cik) {
    const cikMap = await loadTickerToCikMap();
    cik = cikMap[ticker.toUpperCase()];
  }

  if (!cik) {
    console.error(`CIK not found for ticker: ${ticker}`);
    process.exit(1);
  }

  console.log(`CIK: ${cik}\n`);

  // Fetch company facts
  const facts = await getCompanyFacts(cik);
  console.log(`Company: ${facts.entityName}`);
  console.log(`\n${'='.repeat(80)}`);
  console.log('RAW SEC EDGAR XBRL DATA (Primary Financial Statement Concepts)');
  console.log('='.repeat(80));

  // Process each concept
  for (const concept of CONFIG.primaryFSConcepts) {
    // Check us-gaap taxonomy
    let conceptData = facts.facts?.['us-gaap']?.[concept];
    let taxonomy = 'us-gaap';

    // Check dei taxonomy if not in us-gaap
    if (!conceptData) {
      conceptData = facts.facts?.['dei']?.[concept];
      taxonomy = 'dei';
    }

    if (!conceptData) continue;

    console.log(`\n${'─'.repeat(80)}`);
    console.log(`CONCEPT: ${concept}`);
    console.log(`TAXONOMY: ${taxonomy}`);
    console.log(`LABEL: ${conceptData.label || 'N/A'}`);
    console.log(`DESCRIPTION: ${conceptData.description || 'N/A'}`);

    // Process each unit type
    for (const [unitType, unitData] of Object.entries(conceptData.units || {})) {
      console.log(`\n  UNIT: ${unitType}`);
      console.log('  ' + '-'.repeat(76));

      // Filter for 10-K and 10-Q filings, sort by date
      const filings = unitData
        .filter(item => (item.form === '10-K' || item.form === '10-Q') && item.val !== undefined)
        .sort((a, b) => new Date(b.end || b.filed) - new Date(a.end || a.filed))
        .slice(0, 8); // Show last 8 values

      if (filings.length === 0) {
        console.log('  No 10-K/10-Q data available');
        continue;
      }

      console.log('  ' + 'FORM'.padEnd(6) + 'PERIOD'.padEnd(6) + 'FY'.padEnd(6) +
                  'END DATE'.padEnd(12) + 'FILED'.padEnd(12) + 'VALUE');
      console.log('  ' + '-'.repeat(76));

      for (const item of filings) {
        const form = (item.form || '').padEnd(6);
        const period = (item.fp || '').padEnd(6);
        const fy = (item.fy?.toString() || '').padEnd(6);
        const endDate = (item.end || '').padEnd(12);
        const filed = (item.filed || '').padEnd(12);
        const value = formatValue(item.val, unitType);

        console.log(`  ${form}${period}${fy}${endDate}${filed}${value}`);
      }
    }
  }

  console.log(`\n${'='.repeat(80)}`);
  console.log('END OF SEC EDGAR DATA');
  console.log('='.repeat(80));
}

// Main
const ticker = process.argv[2];
if (!ticker) {
  console.log('Usage: node scripts/inspect-bank-data.cjs <TICKER>');
  console.log('Example: node scripts/inspect-bank-data.cjs ALLY');
  process.exit(1);
}

inspectBank(ticker).catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});

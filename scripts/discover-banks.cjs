#!/usr/bin/env node
/**
 * SEC EDGAR Bank Discovery Pipeline
 *
 * This script discovers all publicly traded U.S. banks using SEC EDGAR data
 * and SIC code classification, then resolves exchange information from
 * authoritative exchange directories (NASDAQ, NYSE, OTC).
 *
 * SIC Codes for Banks:
 * - 6021: National Commercial Banks
 * - 6022: State Commercial Banks
 * - 6035: Savings Institutions, Federally Chartered
 * - 6036: Savings Institutions, Not Federally Chartered
 * - 6712: Bank Holding Companies
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  edgarUserAgent: process.env.EDGAR_USER_AGENT || 'Bank-Analyzer github-actions@example.com',
  requestDelay: 150, // 150ms = ~6 req/sec (under SEC's 10 req/sec limit)
  bankSicCodes: ['6021', '6022', '6035', '6036', '6712'],
  sicDescriptions: {
    '6021': 'National Commercial Banks',
    '6022': 'State Commercial Banks',
    '6035': 'Savings Institutions, Federally Chartered',
    '6036': 'Savings Institutions, Not Federally Chartered',
    '6712': 'Bank Holding Companies'
  }
};

// Delay helper
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetch SEC company tickers with exchange info
 * This endpoint provides ticker, CIK, and exchange data
 */
async function fetchSecCompanyTickers() {
  console.log('Fetching SEC company tickers...');

  // Common headers for SEC requests - they require proper User-Agent
  const secHeaders = {
    'User-Agent': CONFIG.edgarUserAgent,
    'Accept-Encoding': 'gzip, deflate',
    'Accept': 'application/json',
    'Host': 'www.sec.gov'
  };

  // Try the standard company_tickers.json first (more reliable)
  try {
    await delay(CONFIG.requestDelay);

    const response = await axios.get(
      'https://www.sec.gov/files/company_tickers.json',
      {
        headers: secHeaders,
        timeout: 60000
      }
    );

    const companies = [];
    for (const key in response.data) {
      const company = response.data[key];
      companies.push({
        cik: company.cik_str,
        name: company.title,
        ticker: company.ticker,
        exchange: null // Will resolve via exchange directories
      });
    }

    console.log(`✓ Loaded ${companies.length} companies from SEC`);
    return companies;
  } catch (error) {
    console.error(`Error fetching SEC company tickers: ${error.message}`);

    // Try with different headers if 403
    if (error.response?.status === 403) {
      console.log('Retrying with different User-Agent format...');
      await delay(CONFIG.requestDelay * 2);

      try {
        const response = await axios.get(
          'https://www.sec.gov/files/company_tickers.json',
          {
            headers: {
              'User-Agent': 'Bank-Analyzer/1.0 (contact@example.com)',
              'Accept': '*/*'
            },
            timeout: 60000
          }
        );

        const companies = [];
        for (const key in response.data) {
          const company = response.data[key];
          companies.push({
            cik: company.cik_str,
            name: company.title,
            ticker: company.ticker,
            exchange: null
          });
        }

        console.log(`✓ Loaded ${companies.length} companies from SEC (retry)`);
        return companies;
      } catch (retryError) {
        throw retryError;
      }
    }

    throw error;
  }
}

/**
 * Fetch company submissions to get SIC code
 * SEC provides SIC codes in the company submissions endpoint
 */
async function fetchCompanySubmissions(cik) {
  const paddedCik = String(cik).padStart(10, '0');

  try {
    await delay(CONFIG.requestDelay);

    const response = await axios.get(
      `https://data.sec.gov/submissions/CIK${paddedCik}.json`,
      {
        headers: { 'User-Agent': CONFIG.edgarUserAgent },
        timeout: 30000
      }
    );

    return response.data;
  } catch (error) {
    return null;
  }
}

/**
 * Batch fetch SIC codes for multiple CIKs
 * Uses the SEC bulk data endpoint for efficiency
 */
async function fetchBulkCompanyData() {
  console.log('\nFetching banks by SIC code from SEC EDGAR...');

  const allBanks = [];

  // Common headers for SEC requests
  const secHeaders = {
    'User-Agent': CONFIG.edgarUserAgent,
    'Accept': 'application/atom+xml, text/html, */*',
    'Accept-Encoding': 'gzip, deflate'
  };

  for (const sicCode of CONFIG.bankSicCodes) {
    console.log(`\nFetching companies with SIC ${sicCode} (${CONFIG.sicDescriptions[sicCode]})...`);

    let offset = 0;
    const pageSize = 100;
    let hasMore = true;

    while (hasMore) {
      try {
        await delay(CONFIG.requestDelay * 2);

        // SEC EDGAR company search by SIC
        // Returns an Atom feed with company entries
        const url = `https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&SIC=${sicCode}&owner=include&match=&start=${offset}&count=${pageSize}&hidefilings=0&output=atom`;

        const response = await axios.get(url, {
          headers: secHeaders,
          timeout: 60000
        });

        // Parse Atom XML response
        const entries = parseAtomFeed(response.data);

        if (entries.length === 0) {
          hasMore = false;
        } else {
          for (const entry of entries) {
            allBanks.push({
              ...entry,
              sic: sicCode,
              sicDescription: CONFIG.sicDescriptions[sicCode]
            });
          }

          offset += entries.length;

          // If we got fewer than requested, we're done
          if (entries.length < pageSize) {
            hasMore = false;
          }
        }

      } catch (error) {
        if (error.response?.status === 403) {
          console.warn(`  Warning: SEC returned 403 for SIC ${sicCode}. Retrying with delay...`);
          await delay(5000); // Wait 5 seconds before retry

          try {
            const url = `https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&SIC=${sicCode}&owner=include&match=&start=${offset}&count=${pageSize}&hidefilings=0&output=atom`;
            const response = await axios.get(url, {
              headers: {
                'User-Agent': 'Bank-Analyzer/1.0 (https://github.com/CHarrisInvest/Bank-Analyzer)',
                'Accept': '*/*'
              },
              timeout: 60000
            });

            const entries = parseAtomFeed(response.data);
            for (const entry of entries) {
              allBanks.push({
                ...entry,
                sic: sicCode,
                sicDescription: CONFIG.sicDescriptions[sicCode]
              });
            }

            if (entries.length < pageSize) hasMore = false;
            offset += entries.length;
          } catch (retryError) {
            console.error(`  Error fetching SIC ${sicCode} (retry failed): ${retryError.message}`);
            hasMore = false;
          }
        } else {
          console.error(`  Error fetching SIC ${sicCode}: ${error.message}`);
          hasMore = false;
        }
      }
    }

    console.log(`  Total for SIC ${sicCode}: ${allBanks.filter(b => b.sic === sicCode).length} companies`);
  }

  return allBanks;
}

/**
 * Parse SEC Atom feed to extract company information
 */
function parseAtomFeed(xmlContent) {
  const entries = [];

  // Simple regex-based parsing for Atom feed
  // Match <entry>...</entry> blocks
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let match;

  while ((match = entryRegex.exec(xmlContent)) !== null) {
    const entryContent = match[1];

    // Extract CIK
    const cikMatch = entryContent.match(/CIK=(\d+)/);
    const cik = cikMatch ? cikMatch[1] : null;

    // Extract company name from <title>
    const titleMatch = entryContent.match(/<title[^>]*>([^<]+)<\/title>/);
    const name = titleMatch ? decodeHtmlEntities(titleMatch[1].trim()) : null;

    if (cik && name) {
      entries.push({ cik, name });
    }
  }

  return entries;
}

/**
 * Decode HTML entities
 */
function decodeHtmlEntities(text) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

/**
 * Fetch NASDAQ-traded securities list
 * NASDAQ provides a comprehensive list of all symbols traded on their platform
 */
async function fetchNasdaqDirectory() {
  console.log('\nFetching NASDAQ traded securities directory...');

  const nasdaqSymbols = new Map();

  try {
    // NASDAQ provides data through their API
    // Try the FTP-style endpoint first
    await delay(CONFIG.requestDelay);

    const response = await axios.get(
      'https://api.nasdaq.com/api/screener/stocks?tableonly=true&limit=25000&exchange=nasdaq',
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'application/json'
        },
        timeout: 60000
      }
    );

    if (response.data?.data?.table?.rows) {
      const rows = response.data.data.table.rows;
      for (const row of rows) {
        const symbol = row.symbol?.toUpperCase();
        if (symbol) {
          nasdaqSymbols.set(symbol, {
            name: row.name,
            exchange: 'NASDAQ',
            marketCap: row.marketCap
          });
        }
      }
      console.log(`✓ Loaded ${nasdaqSymbols.size} NASDAQ-listed symbols`);
    }
  } catch (error) {
    console.warn(`Warning: Could not fetch NASDAQ directory: ${error.message}`);
  }

  // Also fetch NYSE from NASDAQ API (they list all exchanges)
  try {
    await delay(CONFIG.requestDelay);

    const response = await axios.get(
      'https://api.nasdaq.com/api/screener/stocks?tableonly=true&limit=25000&exchange=nyse',
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'application/json'
        },
        timeout: 60000
      }
    );

    if (response.data?.data?.table?.rows) {
      const rows = response.data.data.table.rows;
      for (const row of rows) {
        const symbol = row.symbol?.toUpperCase();
        if (symbol && !nasdaqSymbols.has(symbol)) {
          nasdaqSymbols.set(symbol, {
            name: row.name,
            exchange: 'NYSE',
            marketCap: row.marketCap
          });
        }
      }
      console.log(`✓ Added NYSE-listed symbols (total: ${nasdaqSymbols.size})`);
    }
  } catch (error) {
    console.warn(`Warning: Could not fetch NYSE from NASDAQ API: ${error.message}`);
  }

  // Fetch AMEX (NYSE American)
  try {
    await delay(CONFIG.requestDelay);

    const response = await axios.get(
      'https://api.nasdaq.com/api/screener/stocks?tableonly=true&limit=25000&exchange=amex',
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'application/json'
        },
        timeout: 60000
      }
    );

    if (response.data?.data?.table?.rows) {
      const rows = response.data.data.table.rows;
      for (const row of rows) {
        const symbol = row.symbol?.toUpperCase();
        if (symbol && !nasdaqSymbols.has(symbol)) {
          nasdaqSymbols.set(symbol, {
            name: row.name,
            exchange: 'NYSE', // Map AMEX to NYSE
            marketCap: row.marketCap
          });
        }
      }
      console.log(`✓ Added AMEX-listed symbols (total: ${nasdaqSymbols.size})`);
    }
  } catch (error) {
    console.warn(`Warning: Could not fetch AMEX from NASDAQ API: ${error.message}`);
  }

  return nasdaqSymbols;
}

/**
 * Fetch OTC Markets directory
 */
async function fetchOtcDirectory() {
  console.log('\nFetching OTC Markets directory...');

  const otcSymbols = new Map();

  try {
    await delay(CONFIG.requestDelay);

    // OTC Markets API
    const response = await axios.get(
      'https://www.otcmarkets.com/research/stock-screener/api/downloadCSV',
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'text/csv'
        },
        timeout: 120000,
        maxContentLength: 50 * 1024 * 1024
      }
    );

    // Parse CSV
    const lines = response.data.split('\n');
    const headers = lines[0]?.split(',').map(h => h.trim().replace(/"/g, ''));

    const symbolIdx = headers?.indexOf('Symbol');
    const nameIdx = headers?.indexOf('Security Name') || headers?.indexOf('Company Name');
    const tierIdx = headers?.indexOf('Market') || headers?.indexOf('Tier');

    if (symbolIdx >= 0) {
      for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        const symbol = values[symbolIdx]?.toUpperCase().replace(/"/g, '');

        if (symbol) {
          let tier = values[tierIdx]?.replace(/"/g, '') || 'OTC';
          // Normalize tier names
          if (tier.includes('QX')) tier = 'OTCQX';
          else if (tier.includes('QB')) tier = 'OTCQB';
          else if (tier.includes('Pink')) tier = 'Pink';
          else tier = 'OTC';

          otcSymbols.set(symbol, {
            name: values[nameIdx]?.replace(/"/g, ''),
            exchange: 'OTC',
            tier: tier
          });
        }
      }
      console.log(`✓ Loaded ${otcSymbols.size} OTC symbols`);
    }
  } catch (error) {
    console.warn(`Warning: Could not fetch OTC directory: ${error.message}`);
    console.log('Will try alternative OTC data source...');

    // Try alternative API endpoint
    try {
      await delay(CONFIG.requestDelay);

      const response = await axios.get(
        'https://www.otcmarkets.com/research/stock-screener/api?market=52&pageSize=50000',
        {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'application/json'
          },
          timeout: 120000
        }
      );

      if (response.data?.stocks) {
        for (const stock of response.data.stocks) {
          const symbol = stock.symbol?.toUpperCase();
          if (symbol) {
            otcSymbols.set(symbol, {
              name: stock.securityName || stock.companyName,
              exchange: 'OTC',
              tier: stock.market || 'OTC'
            });
          }
        }
        console.log(`✓ Loaded ${otcSymbols.size} OTC symbols from alternative source`);
      }
    } catch (altError) {
      console.warn(`Warning: Alternative OTC source also failed: ${altError.message}`);
    }
  }

  return otcSymbols;
}

/**
 * Simple CSV line parser that handles quoted fields
 */
function parseCSVLine(line) {
  const values = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  values.push(current);

  return values;
}

/**
 * Resolve tickers for a CIK using SEC data
 */
async function resolveTickersForCik(cik, secCompanies) {
  const paddedCik = String(cik).padStart(10, '0');
  const numericCik = parseInt(cik, 10);

  // Find all tickers associated with this CIK
  const tickers = secCompanies
    .filter(c => parseInt(c.cik, 10) === numericCik)
    .map(c => ({
      ticker: c.ticker?.toUpperCase(),
      exchange: c.exchange
    }))
    .filter(t => t.ticker);

  return tickers;
}

/**
 * Determine exchange for a ticker using directory lookups
 */
function determineExchange(ticker, nasdaqDir, otcDir, secExchange) {
  const upperTicker = ticker?.toUpperCase();

  if (!upperTicker) {
    return { exchange: 'N/A', otcTier: null };
  }

  // Priority 1: Check NASDAQ directory (includes NYSE, AMEX)
  if (nasdaqDir.has(upperTicker)) {
    const info = nasdaqDir.get(upperTicker);
    return {
      exchange: info.exchange || 'NASDAQ',
      otcTier: null
    };
  }

  // Priority 2: Check OTC directory
  if (otcDir.has(upperTicker)) {
    const info = otcDir.get(upperTicker);
    return {
      exchange: 'OTC',
      otcTier: info.tier || null
    };
  }

  // Priority 3: Use SEC-provided exchange if available
  if (secExchange) {
    const normalized = normalizeExchange(secExchange);
    return {
      exchange: normalized,
      otcTier: normalized === 'OTC' ? 'Unknown' : null
    };
  }

  // Default: Unknown
  return { exchange: 'N/A', otcTier: null };
}

/**
 * Normalize exchange names
 */
function normalizeExchange(exchange) {
  if (!exchange) return 'N/A';

  const upper = exchange.toUpperCase();

  if (upper.includes('NYSE') || upper === 'N' || upper === 'NYQ') {
    return 'NYSE';
  }
  if (upper.includes('NASDAQ') || upper.includes('NSDQ') || upper === 'Q' || upper === 'NMS' || upper === 'NGM' || upper === 'NCM') {
    return 'NASDAQ';
  }
  if (upper.includes('AMEX') || upper.includes('AMERICAN') || upper === 'A') {
    return 'NYSE'; // Map AMEX to NYSE
  }
  if (upper.includes('OTC') || upper.includes('PINK') || upper === 'PK') {
    return 'OTC';
  }
  if (upper.includes('BATS') || upper.includes('ARCA') || upper === 'Z' || upper === 'P') {
    return 'NYSE'; // Map these to NYSE
  }

  return 'N/A';
}

/**
 * Main discovery function
 */
async function discoverBanks() {
  console.log('========================================');
  console.log('SEC EDGAR Bank Discovery Pipeline');
  console.log('========================================\n');
  console.log(`Started: ${new Date().toISOString()}`);
  console.log(`User-Agent: ${CONFIG.edgarUserAgent}`);
  console.log(`Bank SIC Codes: ${CONFIG.bankSicCodes.join(', ')}\n`);

  // Step 1: Fetch SEC company data with tickers
  const secCompanies = await fetchSecCompanyTickers();

  // Step 2: Fetch banks by SIC code from SEC
  const banksBySic = await fetchBulkCompanyData();
  console.log(`\nTotal banks found by SIC: ${banksBySic.length}`);

  // Step 3: Fetch exchange directories
  const nasdaqDir = await fetchNasdaqDirectory();
  const otcDir = await fetchOtcDirectory();

  // Step 4: Build the comprehensive bank list
  console.log('\nBuilding comprehensive bank list...');

  const bankMap = new Map(); // CIK -> bank data

  for (const bank of banksBySic) {
    const cik = String(bank.cik).padStart(10, '0');

    // Get all tickers for this CIK
    const tickers = await resolveTickersForCik(bank.cik, secCompanies);

    if (tickers.length === 0) {
      // No ticker found - might be a private company or delisted
      // We'll still include it but with no ticker
      if (!bankMap.has(cik)) {
        bankMap.set(cik, {
          cik: cik,
          companyName: bank.name,
          ticker: null,
          sic: bank.sic,
          sicDescription: bank.sicDescription,
          exchange: 'N/A',
          otcTier: null
        });
      }
    } else {
      // Add an entry for each ticker (one CIK can have multiple tickers)
      for (const tickerInfo of tickers) {
        const key = `${cik}-${tickerInfo.ticker}`;

        if (!bankMap.has(key)) {
          const exchangeInfo = determineExchange(
            tickerInfo.ticker,
            nasdaqDir,
            otcDir,
            tickerInfo.exchange
          );

          bankMap.set(key, {
            cik: cik,
            companyName: bank.name,
            ticker: tickerInfo.ticker,
            sic: bank.sic,
            sicDescription: bank.sicDescription,
            exchange: exchangeInfo.exchange,
            otcTier: exchangeInfo.otcTier
          });
        }
      }
    }
  }

  // Convert map to array and sort
  let banks = Array.from(bankMap.values());

  // Filter out entries without tickers for the main list (keep them in a separate file)
  const banksWithTickers = banks.filter(b => b.ticker);
  const banksWithoutTickers = banks.filter(b => !b.ticker);

  // Sort by exchange priority, then by company name
  const exchangePriority = { 'NYSE': 1, 'NASDAQ': 2, 'OTC': 3, 'N/A': 4 };
  banksWithTickers.sort((a, b) => {
    const ePri = (exchangePriority[a.exchange] || 99) - (exchangePriority[b.exchange] || 99);
    if (ePri !== 0) return ePri;
    return (a.companyName || '').localeCompare(b.companyName || '');
  });

  // Add LastUpdated timestamp
  const lastUpdated = new Date().toISOString();
  banksWithTickers.forEach(b => {
    b.lastUpdated = lastUpdated;
  });

  // Statistics
  const stats = {
    total: banksWithTickers.length,
    withoutTickers: banksWithoutTickers.length,
    byExchange: {},
    bySic: {}
  };

  for (const bank of banksWithTickers) {
    stats.byExchange[bank.exchange] = (stats.byExchange[bank.exchange] || 0) + 1;
    stats.bySic[bank.sic] = (stats.bySic[bank.sic] || 0) + 1;
  }

  return { banks: banksWithTickers, banksWithoutTickers, stats };
}

/**
 * Generate CSV from bank data
 */
function generateCSV(banks) {
  const headers = ['CIK', 'CompanyName', 'Ticker', 'SIC', 'SICDescription', 'Exchange', 'OTC_Tier', 'LastUpdated'];

  const rows = banks.map(b => [
    b.cik,
    `"${(b.companyName || '').replace(/"/g, '""')}"`,
    b.ticker || '',
    b.sic,
    `"${b.sicDescription || ''}"`,
    b.exchange,
    b.otcTier || '',
    b.lastUpdated
  ].join(','));

  return [headers.join(','), ...rows].join('\n');
}

/**
 * Main function
 */
async function main() {
  try {
    // Discover banks
    const { banks, banksWithoutTickers, stats } = await discoverBanks();

    // Output paths
    const dataDir = path.join(__dirname, '..', 'public', 'data');
    const bankListPath = path.join(dataDir, 'bank-list.json');
    const bankListCsvPath = path.join(dataDir, 'bank-list.csv');
    const privateListPath = path.join(dataDir, 'banks-no-ticker.json');

    // Ensure directory exists
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Write JSON output
    const jsonOutput = {
      metadata: {
        generatedAt: new Date().toISOString(),
        source: 'SEC EDGAR + SIC Classification',
        sicCodes: CONFIG.bankSicCodes,
        exchangeSources: ['NASDAQ Directory', 'NYSE Directory', 'OTC Markets'],
        statistics: stats
      },
      banks: banks
    };

    fs.writeFileSync(bankListPath, JSON.stringify(jsonOutput, null, 2));
    console.log(`\n✓ Saved bank list to: ${bankListPath}`);

    // Write CSV output
    const csvOutput = generateCSV(banks);
    fs.writeFileSync(bankListCsvPath, csvOutput);
    console.log(`✓ Saved bank list CSV to: ${bankListCsvPath}`);

    // Write private/no-ticker banks (for reference)
    if (banksWithoutTickers.length > 0) {
      fs.writeFileSync(privateListPath, JSON.stringify({
        metadata: {
          generatedAt: new Date().toISOString(),
          description: 'Banks with SIC codes but no ticker (likely private or delisted)'
        },
        banks: banksWithoutTickers
      }, null, 2));
      console.log(`✓ Saved no-ticker banks to: ${privateListPath}`);
    }

    // Print summary
    console.log('\n========================================');
    console.log('Discovery Summary');
    console.log('========================================');
    console.log(`Total banks with tickers: ${stats.total}`);
    console.log(`Banks without tickers: ${stats.withoutTickers}`);
    console.log('\nBy Exchange:');
    for (const [exchange, count] of Object.entries(stats.byExchange)) {
      console.log(`  ${exchange}: ${count}`);
    }
    console.log('\nBy SIC Code:');
    for (const [sic, count] of Object.entries(stats.bySic)) {
      console.log(`  ${sic} (${CONFIG.sicDescriptions[sic]}): ${count}`);
    }
    console.log(`\nCompleted: ${new Date().toISOString()}`);
    console.log('========================================\n');

    return banks;

  } catch (error) {
    console.error('\n========================================');
    console.error('FATAL ERROR');
    console.error('========================================');
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
    console.error('========================================\n');
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main().then(() => {
    process.exit(0);
  }).catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
}

// Export for use by other scripts
module.exports = {
  discoverBanks,
  fetchSecCompanyTickers,
  fetchNasdaqDirectory,
  fetchOtcDirectory,
  determineExchange,
  CONFIG
};

/**
 * Google Sheets Data Fetcher
 * Fetches and transforms bank financial data from published Google Sheets
 */

import { parseCSV, parseNumericValue } from '../utils/csv.js';

// Configuration for the Google Sheets data source
const SHEETS_CONFIG = {
  // Convert pubhtml URL to CSV export URL
  // Original: https://docs.google.com/spreadsheets/d/e/2PACX-1vSdP5XIBWUyEDpYuWbdSy4IZzh-gGDU5dIKX5u_atOvs3xedyMpQngc17U3Gzar4sOllsHadO-IpOAp/pubhtml
  baseUrl: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSdP5XIBWUyEDpYuWbdSy4IZzh-gGDU5dIKX5u_atOvs3xedyMpQngc17U3Gzar4sOllsHadO-IpOAp/pub',
  outputFormat: 'csv',
  // Header row index (0-based) - row 6 in spreadsheet = index 5
  headerRowIndex: 5,
};

/**
 * Column mapping from spreadsheet headers to normalized field names
 * Update these mappings to match your actual spreadsheet column headers
 */
const COLUMN_MAPPING = {
  // Primary identifiers
  ticker: ['Ticker', 'Symbol', 'ticker', 'symbol', 'TICKER', 'SYMBOL'],
  bankName: ['BankName', 'Bank Name', 'Name', 'Company', 'Bank', 'bank_name', 'BANK NAME', 'Company Name'],
  exchange: ['Exchange', 'exchange', 'EXCHANGE', 'Market', 'Listed'],

  // Price data
  price: ['Price', 'price', 'PRICE', 'Stock Price', 'Current Price', 'Last Price'],
  marketCap: ['MktCap', 'Market Cap', 'MarketCap', 'market_cap', 'MARKET CAP', 'Mkt Cap', 'Market Capitalization'],

  // Valuation metrics
  pni: ['PNI', 'P/NI', 'P-NI', 'P/E', 'PE', 'Price/NI', 'Price to NI', 'P/Net Income'],
  ptbvps: ['PTBVPS', 'P-TBV', 'P/TBV', 'PTBV', 'Price/TBV', 'Price to TBV', 'P-Tangible Book'],
  mktCapSE: ['MktCapSE', 'Mkt Cap/SE', 'Market Cap to SE'],
  niTBV: ['NITBV', 'NI/TBV', 'Net Income to TBV'],

  // Performance metrics
  roe: ['RoE', 'ROE', 'roe', 'Return on Equity', 'ROE %', 'RoE %'],
  rota: ['RoTA', 'ROTA', 'Return on Total Assets', 'ROA', 'RoA'],

  // Graham metrics
  grahamNum: ['GrahamNum', 'Graham Number', 'Graham Num'],
  grahamMoS: ['GrahamMoS', 'Graham MoS', 'Graham Margin of Safety', 'MoS', 'Margin of Safety', 'Graham MoS %', 'MOS'],
  grahamMoSPct: ['GrahamMoSPct', 'Graham MoS %', 'Graham MoS Pct', 'MoS %'],
};

/**
 * Build the CSV export URL for Google Sheets
 * @param {string} sheetId - Optional specific sheet/tab ID (gid parameter)
 * @returns {string} Full CSV export URL
 */
export function buildSheetUrl(sheetId = null) {
  let url = `${SHEETS_CONFIG.baseUrl}?output=${SHEETS_CONFIG.outputFormat}`;
  if (sheetId) {
    url += `&gid=${sheetId}`;
  }
  return url;
}

/**
 * Find the actual column name in the data that matches our expected field
 * @param {string[]} headers - Available column headers
 * @param {string} fieldName - Our internal field name
 * @returns {string|null} Matching header or null
 */
function findColumnHeader(headers, fieldName) {
  const possibleNames = COLUMN_MAPPING[fieldName] || [];

  for (const name of possibleNames) {
    const found = headers.find(
      (h) => h.toLowerCase().trim() === name.toLowerCase().trim()
    );
    if (found) {
      return found;
    }
  }

  return null;
}

/**
 * Transform raw CSV data into normalized bank records
 * @param {Object[]} rawData - Array of raw row objects from CSV
 * @param {string[]} headers - CSV headers
 * @returns {Object[]} Normalized bank records
 */
function transformBankData(rawData, headers) {
  // Build header mapping
  const headerMap = {};
  for (const field of Object.keys(COLUMN_MAPPING)) {
    headerMap[field] = findColumnHeader(headers, field);
  }

  return rawData
    .map((row, index) => {
      // Get values using mapped headers
      const getValue = (field) => {
        const header = headerMap[field];
        return header ? row[header] : null;
      };

      const ticker = getValue('ticker');
      const bankName = getValue('bankName');

      // Skip rows without essential data
      if (!ticker && !bankName) {
        return null;
      }

      return {
        id: `bank-${index}`,
        ticker: ticker || '',
        bankName: bankName || '',
        exchange: normalizeExchange(getValue('exchange')),
        price: parseNumericValue(getValue('price')),
        marketCap: parseNumericValue(getValue('marketCap')),
        pni: parseNumericValue(getValue('pni')),
        ptbvps: parseNumericValue(getValue('ptbvps')),
        mktCapSE: parseNumericValue(getValue('mktCapSE')),
        niTBV: parseNumericValue(getValue('niTBV')),
        roe: parseNumericValue(getValue('roe')),
        rota: parseNumericValue(getValue('rota')),
        grahamNum: parseNumericValue(getValue('grahamNum')),
        grahamMoS: parseNumericValue(getValue('grahamMoS')),
        grahamMoSPct: parseNumericValue(getValue('grahamMoSPct')),
      };
    })
    .filter(Boolean);
}

/**
 * Normalize exchange names to standard format
 * @param {string} exchange - Raw exchange value
 * @returns {string} Normalized exchange name
 */
function normalizeExchange(exchange) {
  if (!exchange) return '';

  const upper = exchange.toUpperCase().trim();

  if (upper.includes('NYSE') || upper === 'N') {
    return 'NYSE';
  }
  if (upper.includes('NASDAQ') || upper.includes('NSDQ') || upper === 'Q') {
    return 'NASDAQ';
  }
  if (upper.includes('OTC') || upper.includes('PINK') || upper.includes('OTCBB')) {
    return 'OTC';
  }
  if (upper.includes('AMEX') || upper.includes('AMER')) {
    return 'AMEX';
  }

  return exchange.trim();
}

/**
 * Fetch bank data from Google Sheets
 * @param {Object} options - Fetch options
 * @param {string} options.sheetId - Specific sheet ID (gid)
 * @param {number} options.headerRowIndex - Header row index (0-based)
 * @returns {Promise<Object>} Bank data and metadata
 */
export async function fetchBankData(options = {}) {
  const {
    sheetId = null,
    headerRowIndex = SHEETS_CONFIG.headerRowIndex,
  } = options;

  const url = buildSheetUrl(sheetId);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'text/csv,text/plain,*/*',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }

    const csvText = await response.text();

    if (!csvText || csvText.trim() === '') {
      throw new Error('Empty response received from Google Sheets');
    }

    // Parse CSV
    const { headers, data: rawData } = parseCSV(csvText, {
      headerRowIndex,
      skipEmptyRows: true,
    });

    if (headers.length === 0) {
      throw new Error('No headers found in CSV data');
    }

    // Transform to normalized format
    const banks = transformBankData(rawData, headers);

    return {
      success: true,
      data: banks,
      metadata: {
        totalRecords: banks.length,
        headers: headers,
        fetchedAt: new Date().toISOString(),
        sourceUrl: url,
      },
    };
  } catch (error) {
    console.error('Error fetching bank data:', error);

    return {
      success: false,
      data: [],
      error: {
        message: error.message || 'Unknown error occurred',
        type: error.name || 'Error',
      },
      metadata: {
        fetchedAt: new Date().toISOString(),
        sourceUrl: url,
      },
    };
  }
}

/**
 * Get unique exchange values from bank data
 * @param {Object[]} banks - Array of bank records
 * @returns {string[]} Unique exchange values
 */
export function getUniqueExchanges(banks) {
  const exchanges = new Set();

  banks.forEach((bank) => {
    if (bank.exchange) {
      exchanges.add(bank.exchange);
    }
  });

  return Array.from(exchanges).sort();
}

/**
 * Calculate statistics for a numeric field
 * @param {Object[]} banks - Array of bank records
 * @param {string} field - Field name to analyze
 * @returns {Object} Statistics object
 */
export function getFieldStats(banks, field) {
  const values = banks
    .map((b) => b[field])
    .filter((v) => v !== null && v !== undefined && !isNaN(v));

  if (values.length === 0) {
    return { min: null, max: null, avg: null, count: 0 };
  }

  const sorted = [...values].sort((a, b) => a - b);

  // Calculate median correctly for both odd and even length arrays
  let median;
  const midIndex = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    // Even length: average of two middle values
    median = (sorted[midIndex - 1] + sorted[midIndex]) / 2;
  } else {
    // Odd length: middle value
    median = sorted[midIndex];
  }

  return {
    min: sorted[0],
    max: sorted[sorted.length - 1],
    avg: values.reduce((a, b) => a + b, 0) / values.length,
    median: median,
    count: values.length,
  };
}

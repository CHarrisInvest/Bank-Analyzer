#!/usr/bin/env node
/**
 * Fix preferred stock tickers in banks.json
 * Looks up the best ticker from bank-list.json for each CIK
 */

const fs = require('fs');
const path = require('path');

function isPreferredTicker(ticker) {
  if (!ticker) return false;
  // Only match hyphenated preferred patterns (-P suffix) to avoid false positives
  if (/-P[A-Z]?$/i.test(ticker)) return true;
  return false;
}

function selectBestTicker(tickers) {
  if (!tickers || tickers.length === 0) return null;
  if (tickers.length === 1) return tickers[0];

  const common = tickers.filter((t) => !isPreferredTicker(t));
  const candidates = common.length > 0 ? common : tickers;

  return candidates.sort((a, b) => a.length - b.length)[0];
}

// Load bank-list.json to get all available tickers per CIK
const bankListPath = path.join(__dirname, '../public/data/bank-list.json');
const bankListData = JSON.parse(fs.readFileSync(bankListPath, 'utf8'));
const bankList = bankListData.banks || [];

// Build a map of CIK -> all available tickers
const tickersByCik = new Map();
for (const entry of bankList) {
  const cik = entry.cik;
  if (!tickersByCik.has(cik)) {
    tickersByCik.set(cik, []);
  }
  if (entry.ticker) {
    tickersByCik.get(cik).push(entry.ticker);
  }
}

console.log('Loaded bank-list.json:', bankList.length, 'entries');
console.log('Unique CIKs in bank-list:', tickersByCik.size);

// Load banks.json
const banksPath = path.join(__dirname, '../public/data/banks.json');
const banks = JSON.parse(fs.readFileSync(banksPath, 'utf8'));
console.log('Current banks.json count:', banks.length);

// Update each bank with the best ticker from bank-list
let tickersUpdated = 0;
const updates = [];

for (const bank of banks) {
  const cik = bank.cik;
  const currentTicker = bank.ticker;
  const availableTickers = tickersByCik.get(cik) || [currentTicker];
  const bestTicker = selectBestTicker(availableTickers);

  if (bestTicker && bestTicker !== currentTicker) {
    updates.push({ cik, from: currentTicker, to: bestTicker, name: bank.bankName });
    bank.ticker = bestTicker;
    tickersUpdated++;
  }
}

// Sort by ticker
banks.sort((a, b) => (a.ticker || '').localeCompare(b.ticker || ''));

console.log('\nTickers updated:', tickersUpdated);
if (updates.length > 0) {
  console.log('Updates made:');
  updates.forEach(u => console.log(`  ${u.from} -> ${u.to} (${u.name})`));
}

// Check for any remaining preferred tickers
const remainingPreferred = banks.filter(b => isPreferredTicker(b.ticker));
console.log('\nEntries still with preferred tickers:', remainingPreferred.length);
if (remainingPreferred.length > 0) {
  console.log('  (These CIKs only have preferred tickers in bank-list.json)');
  remainingPreferred.forEach(b => console.log('    ', b.ticker, '-', b.bankName));
}

fs.writeFileSync(banksPath, JSON.stringify(banks, null, 2));
console.log('\nSaved to', banksPath);

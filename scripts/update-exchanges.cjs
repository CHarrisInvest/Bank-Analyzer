#!/usr/bin/env node

/**
 * Update exchange data for banks using SEC EDGAR submissions API.
 *
 * For each bank in banks.json, fetches data.sec.gov/submissions/CIK{cik}.json
 * which includes parallel tickers[] and exchanges[] arrays. The exchange for
 * the bank's primary ticker is extracted and written back to banks.json.
 *
 * Data source: SEC EDGAR (public domain US government data)
 * Rate limit: 10 req/sec per SEC fair access policy
 *
 * Usage:
 *   node scripts/update-exchanges.cjs
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const BANKS_PATH = path.join(__dirname, '..', 'public', 'data', 'banks.json');
const RATE_LIMIT_MS = 120; // ~8 req/sec (under SEC's 10 req/sec limit)
const USER_AGENT = 'Bank-Analyzer/1.0 (https://github.com/CHarrisInvest/Bank-Analyzer)';

/**
 * Fetch SEC submissions data for a single CIK
 */
function fetchSubmissions(cik) {
  const paddedCik = String(cik).padStart(10, '0');

  return new Promise((resolve) => {
    const options = {
      hostname: 'data.sec.gov',
      path: `/submissions/CIK${paddedCik}.json`,
      method: 'GET',
      headers: {
        'User-Agent': USER_AGENT,
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
          resolve(JSON.parse(data));
        } catch {
          resolve(null);
        }
      });
    });

    req.on('error', () => resolve(null));
    req.setTimeout(15000, () => {
      req.destroy();
      resolve(null);
    });
    req.end();
  });
}

/**
 * Determine the exchange for a bank from SEC submissions data.
 * The tickers[] and exchanges[] arrays are parallel.
 * Prefer the entry matching the bank's known ticker.
 */
function resolveExchange(submissions, bankTicker) {
  if (!submissions || !submissions.tickers || !submissions.exchanges) {
    return null;
  }

  const tickers = submissions.tickers;
  const exchanges = submissions.exchanges;

  if (tickers.length === 0 || tickers.length !== exchanges.length) {
    return null;
  }

  // Try exact match on the bank's ticker
  if (bankTicker) {
    const idx = tickers.indexOf(bankTicker.toUpperCase());
    if (idx >= 0 && exchanges[idx]) {
      return normalizeExchange(exchanges[idx]);
    }
  }

  // Fall back to first non-empty exchange (skip preferred share tickers)
  for (let i = 0; i < tickers.length; i++) {
    const ticker = tickers[i];
    const exchange = exchanges[i];
    // Skip preferred shares (contain - or end with P/W)
    if (ticker.includes('-') || /P[A-Z]?$/.test(ticker)) continue;
    if (exchange) return normalizeExchange(exchange);
  }

  // Last resort: first entry with any exchange
  for (let i = 0; i < exchanges.length; i++) {
    if (exchanges[i]) return normalizeExchange(exchanges[i]);
  }

  return null;
}

/**
 * Normalize exchange names to consistent values
 */
function normalizeExchange(raw) {
  if (!raw) return null;
  const upper = raw.toUpperCase().trim();

  if (upper === 'NYSE' || upper === 'NYSEARCA' || upper === 'NYSEAMERICAN' || upper === 'NYSE ARCA' || upper === 'NYSE MKT') {
    return 'NYSE';
  }
  if (upper === 'NASDAQ' || upper === 'NASDAQ/NGS' || upper === 'NASDAQ/NMS' || upper === 'NASDAQ/NGSM' || upper.startsWith('NASDAQ')) {
    return 'NASDAQ';
  }
  if (upper === 'OTC' || upper === 'OTCBB' || upper.startsWith('OTC')) {
    return 'OTC';
  }
  if (upper === 'CBOE' || upper === 'BATS') {
    return upper;
  }

  return raw;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log('Updating exchange data from SEC EDGAR...\n');

  if (!fs.existsSync(BANKS_PATH)) {
    console.error('banks.json not found at', BANKS_PATH);
    process.exit(1);
  }

  const banks = JSON.parse(fs.readFileSync(BANKS_PATH, 'utf-8'));
  console.log(`Loaded ${banks.length} banks from banks.json`);

  let updated = 0;
  let failed = 0;
  let skipped = 0;
  const startTime = Date.now();

  for (let i = 0; i < banks.length; i++) {
    const bank = banks[i];

    if (!bank.cik) {
      skipped++;
      continue;
    }

    // Rate limiting
    if (i > 0) await sleep(RATE_LIMIT_MS);

    const submissions = await fetchSubmissions(bank.cik);
    const exchange = resolveExchange(submissions, bank.ticker);

    if (exchange) {
      bank.exchange = exchange;
      updated++;
    } else {
      failed++;
    }

    // Progress logging every 50 banks
    if ((i + 1) % 50 === 0 || i === banks.length - 1) {
      const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
      process.stdout.write(`  Progress: ${i + 1}/${banks.length} (${elapsed}s)\r`);
    }
  }

  console.log(`\n\nResults:`);
  console.log(`  Updated: ${updated}`);
  console.log(`  No exchange found: ${failed}`);
  console.log(`  Skipped (no CIK): ${skipped}`);

  // Distribution summary
  const dist = {};
  for (const b of banks) {
    const ex = b.exchange || 'unknown';
    dist[ex] = (dist[ex] || 0) + 1;
  }
  console.log(`\nExchange distribution:`);
  Object.entries(dist).sort((a, b) => b[1] - a[1]).forEach(([ex, count]) => {
    console.log(`  ${ex}: ${count}`);
  });

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\nCompleted in ${elapsed}s`);

  // Write back
  fs.writeFileSync(BANKS_PATH, JSON.stringify(banks, null, 2));
  console.log(`Written to ${BANKS_PATH}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

const edgarClient = require('../services/edgar');
const calculator = require('../services/calculator');
const db = require('../db/connection');
const config = require('../config');

/**
 * Refresh data for a single bank
 * @param {string} ticker - Stock ticker symbol
 * @returns {Promise<Object>} Result of refresh operation
 */
async function refreshBankData(ticker) {
  console.log(`Processing ${ticker}...`);

  try {
    // Step 1: Get or find CIK
    let cik;
    let bankId;
    let companyInfo;

    // Check if bank already exists in database
    const existingBank = await db.query(
      'SELECT id, cik, name FROM banks WHERE ticker = $1',
      [ticker]
    );

    if (existingBank.rows.length > 0) {
      bankId = existingBank.rows[0].id;
      cik = existingBank.rows[0].cik;
      console.log(`  Found existing bank: ${existingBank.rows[0].name} (CIK: ${cik})`);
    } else {
      // Need to get CIK and company info
      try {
        cik = await edgarClient.getCikFromTicker(ticker);
        companyInfo = await edgarClient.getCompanyInfo(cik);

        // Insert new bank
        const insertResult = await db.query(
          `INSERT INTO banks (ticker, cik, name, exchange)
           VALUES ($1, $2, $3, $4)
           RETURNING id`,
          [ticker, cik, companyInfo.name, companyInfo.exchange]
        );
        bankId = insertResult.rows[0].id;
        console.log(`  Created new bank: ${companyInfo.name} (CIK: ${cik})`);
      } catch (error) {
        console.error(`  Failed to get CIK for ${ticker}:`, error.message);
        return { ticker, success: false, error: 'CIK lookup failed' };
      }
    }

    // Step 2: Fetch company facts from SEC EDGAR
    let companyFacts;
    try {
      companyFacts = await edgarClient.getCompanyFacts(cik);
      console.log(`  Fetched company facts from SEC EDGAR`);
    } catch (error) {
      console.error(`  Failed to fetch company facts:`, error.message);
      return { ticker, success: false, error: 'SEC data fetch failed' };
    }

    // Step 3: Extract banking metrics from company facts
    const edgarMetrics = edgarClient.extractBankingMetrics(companyFacts);
    console.log(`  Extracted metrics from SEC filings`);

    // Step 4: Get current stock price
    const currentPrice = await calculator.getCurrentPrice(ticker);
    if (!currentPrice) {
      console.warn(`  Warning: Could not fetch current price for ${ticker}`);
    } else {
      console.log(`  Current price: $${currentPrice.toFixed(2)}`);
    }

    // Step 5: Calculate all metrics
    const metrics = calculator.calculateAllMetrics(edgarMetrics, currentPrice);
    console.log(`  Calculated all metrics`);

    // Step 6: Store metrics in database
    await db.query(
      `INSERT INTO bank_metrics (
        bank_id, price, market_cap, total_assets, total_equity,
        tangible_book_value, net_income, shares_outstanding, eps,
        book_value_per_share, tangible_book_value_per_share,
        pni, ptbvps, mkt_cap_se, ni_tbv, roe, rota,
        graham_number, graham_mos, graham_mos_pct,
        efficiency_ratio, acl_to_loans, provision_to_avg_loans,
        loans_to_assets, deposits_to_assets, loans_to_deposits,
        cash_securities_to_assets, equity_to_assets, tce_to_ta,
        data_date
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
        $21, $22, $23, $24, $25, $26, $27, $28, $29, $30
      )
      ON CONFLICT (bank_id, data_date)
      DO UPDATE SET
        price = EXCLUDED.price,
        market_cap = EXCLUDED.market_cap,
        total_assets = EXCLUDED.total_assets,
        total_equity = EXCLUDED.total_equity,
        tangible_book_value = EXCLUDED.tangible_book_value,
        net_income = EXCLUDED.net_income,
        shares_outstanding = EXCLUDED.shares_outstanding,
        eps = EXCLUDED.eps,
        book_value_per_share = EXCLUDED.book_value_per_share,
        tangible_book_value_per_share = EXCLUDED.tangible_book_value_per_share,
        pni = EXCLUDED.pni,
        ptbvps = EXCLUDED.ptbvps,
        mkt_cap_se = EXCLUDED.mkt_cap_se,
        ni_tbv = EXCLUDED.ni_tbv,
        roe = EXCLUDED.roe,
        rota = EXCLUDED.rota,
        graham_number = EXCLUDED.graham_number,
        graham_mos = EXCLUDED.graham_mos,
        graham_mos_pct = EXCLUDED.graham_mos_pct,
        efficiency_ratio = EXCLUDED.efficiency_ratio,
        acl_to_loans = EXCLUDED.acl_to_loans,
        provision_to_avg_loans = EXCLUDED.provision_to_avg_loans,
        loans_to_assets = EXCLUDED.loans_to_assets,
        deposits_to_assets = EXCLUDED.deposits_to_assets,
        loans_to_deposits = EXCLUDED.loans_to_deposits,
        cash_securities_to_assets = EXCLUDED.cash_securities_to_assets,
        equity_to_assets = EXCLUDED.equity_to_assets,
        tce_to_ta = EXCLUDED.tce_to_ta,
        updated_at = CURRENT_TIMESTAMP`,
      [
        bankId,
        metrics.price,
        metrics.market_cap,
        metrics.total_assets,
        metrics.total_equity,
        metrics.tangible_book_value,
        metrics.net_income,
        metrics.shares_outstanding,
        metrics.eps,
        metrics.book_value_per_share,
        metrics.tangible_book_value_per_share,
        metrics.pni,
        metrics.ptbvps,
        metrics.mkt_cap_se,
        metrics.ni_tbv,
        metrics.roe,
        metrics.rota,
        metrics.graham_number,
        metrics.graham_mos,
        metrics.graham_mos_pct,
        metrics.efficiency_ratio,
        metrics.acl_to_loans,
        metrics.provision_to_avg_loans,
        metrics.loans_to_assets,
        metrics.deposits_to_assets,
        metrics.loans_to_deposits,
        metrics.cash_securities_to_assets,
        metrics.equity_to_assets,
        metrics.tce_to_ta,
        metrics.data_date
      ]
    );

    console.log(`  ✓ Successfully stored metrics for ${ticker}`);
    return { ticker, success: true };

  } catch (error) {
    console.error(`  ✗ Error processing ${ticker}:`, error.message);
    return { ticker, success: false, error: error.message };
  }
}

/**
 * Refresh data for all banks in configuration
 * @returns {Promise<Object>} Summary of refresh operation
 */
async function refreshAllBanks() {
  console.log('\n========================================');
  console.log('Starting Bank Data Refresh');
  console.log('========================================\n');

  const startTime = Date.now();
  const results = {
    total: config.bankTickers.length,
    successful: 0,
    failed: 0,
    errors: []
  };

  // Process each bank sequentially to respect rate limits
  for (const ticker of config.bankTickers) {
    const result = await refreshBankData(ticker);

    if (result.success) {
      results.successful++;
    } else {
      results.failed++;
      results.errors.push({
        ticker: result.ticker,
        error: result.error
      });
    }

    // Small delay between banks to be respectful to APIs
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log('\n========================================');
  console.log('Data Refresh Complete');
  console.log('========================================');
  console.log(`Duration: ${duration}s`);
  console.log(`Total banks: ${results.total}`);
  console.log(`Successful: ${results.successful}`);
  console.log(`Failed: ${results.failed}`);

  if (results.errors.length > 0) {
    console.log('\nFailed banks:');
    results.errors.forEach(err => {
      console.log(`  - ${err.ticker}: ${err.error}`);
    });
  }

  console.log('========================================\n');

  return results;
}

module.exports = {
  refreshBankData,
  refreshAllBanks
};

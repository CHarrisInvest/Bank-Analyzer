const db = require('../../db/connection');
const { refreshBankData, refreshAllBanks } = require('../../jobs/dataRefresh');

/**
 * Get all banks with their latest metrics
 */
async function getAllBanks(req, res) {
  try {
    const result = await db.query(`
      SELECT
        ticker,
        bank_name,
        exchange,
        price,
        market_cap,
        pni,
        ptbvps,
        mkt_cap_se,
        ni_tbv,
        roe,
        rota,
        graham_number,
        graham_mos,
        graham_mos_pct,
        data_date,
        updated_at
      FROM latest_bank_metrics
      ORDER BY market_cap DESC NULLS LAST
    `);

    // Transform to match frontend expected format
    const banks = result.rows.map((row, index) => ({
      id: `bank-${index}`,
      ticker: row.ticker,
      bankName: row.bank_name,
      exchange: row.exchange,
      price: row.price ? parseFloat(row.price) : null,
      marketCap: row.market_cap ? parseInt(row.market_cap) / 1000000 : null, // Convert to millions
      pni: row.pni ? parseFloat(row.pni) : null,
      ptbvps: row.ptbvps ? parseFloat(row.ptbvps) : null,
      mktCapSE: row.mkt_cap_se ? parseFloat(row.mkt_cap_se) : null,
      niTBV: row.ni_tbv ? parseFloat(row.ni_tbv) : null,
      roe: row.roe ? parseFloat(row.roe) : null,
      rota: row.rota ? parseFloat(row.rota) : null,
      grahamNum: row.graham_number ? parseFloat(row.graham_number) : null,
      grahamMoS: row.graham_mos ? parseFloat(row.graham_mos) : null,
      grahamMoSPct: row.graham_mos_pct ? parseFloat(row.graham_mos_pct) : null,
      dataDate: row.data_date,
      updatedAt: row.updated_at
    }));

    res.json({
      success: true,
      count: banks.length,
      data: banks,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching banks:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch bank data',
      message: error.message
    });
  }
}

/**
 * Get a specific bank by ticker
 */
async function getBankByTicker(req, res) {
  try {
    const { ticker } = req.params;

    const result = await db.query(`
      SELECT
        ticker,
        bank_name,
        exchange,
        price,
        market_cap,
        pni,
        ptbvps,
        mkt_cap_se,
        ni_tbv,
        roe,
        rota,
        graham_number,
        graham_mos,
        graham_mos_pct,
        data_date,
        updated_at
      FROM latest_bank_metrics
      WHERE ticker = $1
    `, [ticker.toUpperCase()]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Bank not found'
      });
    }

    const row = result.rows[0];
    const bank = {
      ticker: row.ticker,
      bankName: row.bank_name,
      exchange: row.exchange,
      price: row.price ? parseFloat(row.price) : null,
      marketCap: row.market_cap ? parseInt(row.market_cap) / 1000000 : null,
      pni: row.pni ? parseFloat(row.pni) : null,
      ptbvps: row.ptbvps ? parseFloat(row.ptbvps) : null,
      mktCapSE: row.mkt_cap_se ? parseFloat(row.mkt_cap_se) : null,
      niTBV: row.ni_tbv ? parseFloat(row.ni_tbv) : null,
      roe: row.roe ? parseFloat(row.roe) : null,
      rota: row.rota ? parseFloat(row.rota) : null,
      grahamNum: row.graham_number ? parseFloat(row.graham_number) : null,
      grahamMoS: row.graham_mos ? parseFloat(row.graham_mos) : null,
      grahamMoSPct: row.graham_mos_pct ? parseFloat(row.graham_mos_pct) : null,
      dataDate: row.data_date,
      updatedAt: row.updated_at
    };

    res.json({
      success: true,
      data: bank
    });
  } catch (error) {
    console.error('Error fetching bank:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch bank data',
      message: error.message
    });
  }
}

/**
 * Manually trigger data refresh for all banks
 */
async function triggerRefreshAll(req, res) {
  try {
    // Send immediate response that refresh has started
    res.json({
      success: true,
      message: 'Data refresh started',
      status: 'processing'
    });

    // Run refresh in background
    refreshAllBanks()
      .then(results => {
        console.log('Manual refresh completed:', results);
      })
      .catch(error => {
        console.error('Manual refresh failed:', error);
      });
  } catch (error) {
    console.error('Error triggering refresh:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to trigger data refresh',
      message: error.message
    });
  }
}

/**
 * Manually trigger data refresh for a specific bank
 */
async function triggerRefreshBank(req, res) {
  try {
    const { ticker } = req.params;

    // Send immediate response
    res.json({
      success: true,
      message: `Data refresh started for ${ticker}`,
      status: 'processing'
    });

    // Run refresh in background
    refreshBankData(ticker.toUpperCase())
      .then(result => {
        console.log(`Manual refresh for ${ticker} completed:`, result);
      })
      .catch(error => {
        console.error(`Manual refresh for ${ticker} failed:`, error);
      });
  } catch (error) {
    console.error('Error triggering refresh:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to trigger data refresh',
      message: error.message
    });
  }
}

/**
 * Get historical metrics for a bank
 */
async function getBankHistory(req, res) {
  try {
    const { ticker } = req.params;
    const limit = parseInt(req.query.limit) || 10;

    const result = await db.query(`
      SELECT
        m.price,
        m.market_cap,
        m.pni,
        m.ptbvps,
        m.roe,
        m.rota,
        m.graham_number,
        m.graham_mos_pct,
        m.data_date,
        m.created_at
      FROM banks b
      INNER JOIN bank_metrics m ON b.id = m.bank_id
      WHERE b.ticker = $1
      ORDER BY m.data_date DESC
      LIMIT $2
    `, [ticker.toUpperCase(), limit]);

    res.json({
      success: true,
      ticker: ticker.toUpperCase(),
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching bank history:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch bank history',
      message: error.message
    });
  }
}

module.exports = {
  getAllBanks,
  getBankByTicker,
  triggerRefreshAll,
  triggerRefreshBank,
  getBankHistory
};

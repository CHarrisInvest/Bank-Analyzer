const db = require('../../db/connection');
const { refreshBankData, refreshAllBanks } = require('../../jobs/dataRefresh');

/**
 * Get all banks with their latest metrics
 */
async function getAllBanks(req, res) {
  try {
    const result = await db.query(`
      SELECT
        ticker, bank_name, exchange, price, market_cap,
        -- Balance Sheet - Assets
        total_assets, cash_and_due_from_banks, interest_bearing_deposits_in_banks,
        afs_securities, htm_securities, loans, allowance_for_credit_losses, premises_and_equipment,
        -- Balance Sheet - Liabilities & Equity
        total_liabilities, deposits, short_term_borrowings, long_term_debt,
        total_equity, goodwill, intangible_assets, tangible_book_value, tangible_assets, tangible_common_equity,
        -- Income Statement
        interest_income, interest_expense, net_interest_income,
        noninterest_income, noninterest_expense, provision_for_credit_losses, pre_tax_income, net_income,
        -- Cash Flow
        operating_cash_flow,
        -- Per-Share
        shares_outstanding, eps, dividends_per_share, book_value_per_share, tangible_book_value_per_share,
        -- Valuation Ratios
        pni, ptbvps, mkt_cap_se, ni_tbv,
        -- Performance Ratios
        roe, rota, roaa, rotce,
        -- Graham Metrics
        graham_number, graham_mos, graham_mos_pct,
        -- Bank-Specific Ratios
        efficiency_ratio, acl_to_loans, provision_to_avg_loans,
        loans_to_assets, deposits_to_assets, loans_to_deposits,
        cash_securities_to_assets, equity_to_assets, tce_to_ta, net_interest_margin,
        -- Metadata
        data_date, updated_at
      FROM latest_bank_metrics
      ORDER BY market_cap DESC NULLS LAST
    `);

    // Helper to parse numeric values (convert to millions for large dollar amounts)
    const parseNum = (val) => val ? parseFloat(val) : null;
    const parseMillions = (val) => val ? parseFloat(val) / 1000000 : null;

    // Transform to match frontend expected format
    const banks = result.rows.map((row, index) => ({
      id: `bank-${index}`,
      ticker: row.ticker,
      bankName: row.bank_name,
      exchange: row.exchange,
      price: parseNum(row.price),
      marketCap: parseMillions(row.market_cap),

      // Balance Sheet - Assets (in millions)
      totalAssets: parseMillions(row.total_assets),
      cashAndDueFromBanks: parseMillions(row.cash_and_due_from_banks),
      interestBearingDepositsInBanks: parseMillions(row.interest_bearing_deposits_in_banks),
      afsSecurities: parseMillions(row.afs_securities),
      htmSecurities: parseMillions(row.htm_securities),
      loans: parseMillions(row.loans),
      allowanceForCreditLosses: parseMillions(row.allowance_for_credit_losses),
      premisesAndEquipment: parseMillions(row.premises_and_equipment),

      // Balance Sheet - Liabilities & Equity (in millions)
      totalLiabilities: parseMillions(row.total_liabilities),
      totalDeposits: parseMillions(row.deposits),
      shortTermBorrowings: parseMillions(row.short_term_borrowings),
      longTermDebt: parseMillions(row.long_term_debt),
      totalEquity: parseMillions(row.total_equity),
      goodwill: parseMillions(row.goodwill),
      intangibles: parseMillions(row.intangible_assets),
      tangibleBookValue: parseMillions(row.tangible_book_value),
      tangibleAssets: parseMillions(row.tangible_assets),
      tangibleCommonEquity: parseMillions(row.tangible_common_equity),

      // Income Statement (TTM, in millions)
      ttmInterestIncome: parseMillions(row.interest_income),
      ttmInterestExpense: parseMillions(row.interest_expense),
      ttmNetInterestIncome: parseMillions(row.net_interest_income),
      ttmNoninterestIncome: parseMillions(row.noninterest_income),
      ttmNoninterestExpense: parseMillions(row.noninterest_expense),
      ttmProvisionForCreditLosses: parseMillions(row.provision_for_credit_losses),
      ttmPreTaxIncome: parseMillions(row.pre_tax_income),
      ttmNetIncome: parseMillions(row.net_income),

      // Cash Flow (TTM, in millions)
      ttmOperatingCashFlow: parseMillions(row.operating_cash_flow),

      // Per-Share
      sharesOutstanding: parseNum(row.shares_outstanding),
      ttmEps: parseNum(row.eps),
      ttmDividendPerShare: parseNum(row.dividends_per_share),
      bvps: parseNum(row.book_value_per_share),
      tbvps: parseNum(row.tangible_book_value_per_share),

      // Valuation Ratios
      pni: parseNum(row.pni),
      ptbvps: parseNum(row.ptbvps),
      mktCapSE: parseNum(row.mkt_cap_se),
      niTBV: parseNum(row.ni_tbv),

      // Performance Ratios (percentages)
      roe: parseNum(row.roe),
      rota: parseNum(row.rota),
      roaa: parseNum(row.roaa),
      rotce: parseNum(row.rotce),

      // Graham Metrics
      grahamNum: parseNum(row.graham_number),
      grahamMoS: parseNum(row.graham_mos),
      grahamMoSPct: parseNum(row.graham_mos_pct),

      // Bank-Specific Ratios (percentages)
      efficiencyRatio: parseNum(row.efficiency_ratio),
      aclToLoans: parseNum(row.acl_to_loans),
      provisionToAvgLoans: parseNum(row.provision_to_avg_loans),
      loansToAssets: parseNum(row.loans_to_assets),
      depositsToAssets: parseNum(row.deposits_to_assets),
      loansToDeposits: parseNum(row.loans_to_deposits),
      cashSecuritiesToAssets: parseNum(row.cash_securities_to_assets),
      equityToAssets: parseNum(row.equity_to_assets),
      tceToTa: parseNum(row.tce_to_ta),
      netInterestMargin: parseNum(row.net_interest_margin),

      // Calculated frontend-only fields
      dividendPayoutRatio: (row.dividends_per_share && row.eps && parseFloat(row.eps) > 0)
        ? (parseFloat(row.dividends_per_share) / parseFloat(row.eps)) * 100
        : null,

      // Metadata
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
        ticker, bank_name, exchange, price, market_cap,
        -- Balance Sheet - Assets
        total_assets, cash_and_due_from_banks, interest_bearing_deposits_in_banks,
        afs_securities, htm_securities, loans, allowance_for_credit_losses, premises_and_equipment,
        -- Balance Sheet - Liabilities & Equity
        total_liabilities, deposits, short_term_borrowings, long_term_debt,
        total_equity, goodwill, intangible_assets, tangible_book_value, tangible_assets, tangible_common_equity,
        -- Income Statement
        interest_income, interest_expense, net_interest_income,
        noninterest_income, noninterest_expense, provision_for_credit_losses, pre_tax_income, net_income,
        -- Cash Flow
        operating_cash_flow,
        -- Per-Share
        shares_outstanding, eps, dividends_per_share, book_value_per_share, tangible_book_value_per_share,
        -- Valuation Ratios
        pni, ptbvps, mkt_cap_se, ni_tbv,
        -- Performance Ratios
        roe, rota, roaa, rotce,
        -- Graham Metrics
        graham_number, graham_mos, graham_mos_pct,
        -- Bank-Specific Ratios
        efficiency_ratio, acl_to_loans, provision_to_avg_loans,
        loans_to_assets, deposits_to_assets, loans_to_deposits,
        cash_securities_to_assets, equity_to_assets, tce_to_ta, net_interest_margin,
        -- Metadata
        data_date, updated_at
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
    const parseNum = (val) => val ? parseFloat(val) : null;
    const parseMillions = (val) => val ? parseFloat(val) / 1000000 : null;

    const bank = {
      ticker: row.ticker,
      bankName: row.bank_name,
      exchange: row.exchange,
      price: parseNum(row.price),
      marketCap: parseMillions(row.market_cap),

      // Balance Sheet - Assets (in millions)
      totalAssets: parseMillions(row.total_assets),
      cashAndDueFromBanks: parseMillions(row.cash_and_due_from_banks),
      interestBearingDepositsInBanks: parseMillions(row.interest_bearing_deposits_in_banks),
      afsSecurities: parseMillions(row.afs_securities),
      htmSecurities: parseMillions(row.htm_securities),
      loans: parseMillions(row.loans),
      allowanceForCreditLosses: parseMillions(row.allowance_for_credit_losses),
      premisesAndEquipment: parseMillions(row.premises_and_equipment),

      // Balance Sheet - Liabilities & Equity (in millions)
      totalLiabilities: parseMillions(row.total_liabilities),
      totalDeposits: parseMillions(row.deposits),
      shortTermBorrowings: parseMillions(row.short_term_borrowings),
      longTermDebt: parseMillions(row.long_term_debt),
      totalEquity: parseMillions(row.total_equity),
      goodwill: parseMillions(row.goodwill),
      intangibles: parseMillions(row.intangible_assets),
      tangibleBookValue: parseMillions(row.tangible_book_value),
      tangibleAssets: parseMillions(row.tangible_assets),
      tangibleCommonEquity: parseMillions(row.tangible_common_equity),

      // Income Statement (TTM, in millions)
      ttmInterestIncome: parseMillions(row.interest_income),
      ttmInterestExpense: parseMillions(row.interest_expense),
      ttmNetInterestIncome: parseMillions(row.net_interest_income),
      ttmNoninterestIncome: parseMillions(row.noninterest_income),
      ttmNoninterestExpense: parseMillions(row.noninterest_expense),
      ttmProvisionForCreditLosses: parseMillions(row.provision_for_credit_losses),
      ttmPreTaxIncome: parseMillions(row.pre_tax_income),
      ttmNetIncome: parseMillions(row.net_income),

      // Cash Flow (TTM, in millions)
      ttmOperatingCashFlow: parseMillions(row.operating_cash_flow),

      // Per-Share
      sharesOutstanding: parseNum(row.shares_outstanding),
      ttmEps: parseNum(row.eps),
      ttmDividendPerShare: parseNum(row.dividends_per_share),
      bvps: parseNum(row.book_value_per_share),
      tbvps: parseNum(row.tangible_book_value_per_share),

      // Valuation Ratios
      pni: parseNum(row.pni),
      ptbvps: parseNum(row.ptbvps),
      mktCapSE: parseNum(row.mkt_cap_se),
      niTBV: parseNum(row.ni_tbv),

      // Performance Ratios (percentages)
      roe: parseNum(row.roe),
      rota: parseNum(row.rota),
      roaa: parseNum(row.roaa),
      rotce: parseNum(row.rotce),

      // Graham Metrics
      grahamNum: parseNum(row.graham_number),
      grahamMoS: parseNum(row.graham_mos),
      grahamMoSPct: parseNum(row.graham_mos_pct),

      // Bank-Specific Ratios (percentages)
      efficiencyRatio: parseNum(row.efficiency_ratio),
      aclToLoans: parseNum(row.acl_to_loans),
      provisionToAvgLoans: parseNum(row.provision_to_avg_loans),
      loansToAssets: parseNum(row.loans_to_assets),
      depositsToAssets: parseNum(row.deposits_to_assets),
      loansToDeposits: parseNum(row.loans_to_deposits),
      cashSecuritiesToAssets: parseNum(row.cash_securities_to_assets),
      equityToAssets: parseNum(row.equity_to_assets),
      tceToTa: parseNum(row.tce_to_ta),
      netInterestMargin: parseNum(row.net_interest_margin),

      // Calculated frontend-only fields
      dividendPayoutRatio: (row.dividends_per_share && row.eps && parseFloat(row.eps) > 0)
        ? (parseFloat(row.dividends_per_share) / parseFloat(row.eps)) * 100
        : null,

      // Metadata
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

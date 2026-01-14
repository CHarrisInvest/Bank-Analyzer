const axios = require('axios');

/**
 * Financial Metrics Calculator
 * Calculates banking metrics based on SEC filing data and market prices
 */
class MetricsCalculator {
  /**
   * Get prior close stock price from Marketstack API
   * Requires MARKETSTACK_API_KEY environment variable
   * Commercial use allowed on Professional plan ($49.99/mo) and above
   * @see https://marketstack.com/documentation
   * @param {string} ticker - Stock ticker symbol
   * @returns {Promise<number>} Prior close stock price
   */
  async getCurrentPrice(ticker) {
    const apiKey = process.env.MARKETSTACK_API_KEY;

    if (!apiKey) {
      console.warn(`MARKETSTACK_API_KEY not set, skipping price fetch for ${ticker}`);
      return null;
    }

    try {
      // Using Marketstack EOD endpoint for prior close price
      const url = `http://api.marketstack.com/v1/eod/latest?access_key=${apiKey}&symbols=${ticker}`;
      const response = await axios.get(url, {
        timeout: 15000,
        headers: {
          'User-Agent': 'Bank-Analyzer/1.0'
        }
      });

      // Check for API error
      if (response.data?.error) {
        console.warn(`Marketstack API error for ${ticker}: ${response.data.error.message}`);
        return null;
      }

      // Extract close price from the first data entry
      const data = response.data?.data?.[0];
      const price = data?.close;
      if (!price) {
        throw new Error('Price not found in response');
      }

      return parseFloat(price);
    } catch (error) {
      console.error(`Error fetching price for ${ticker}:`, error.message);
      // Return null to indicate price fetch failed
      return null;
    }
  }

  /**
   * Calculate Tangible Book Value
   * TBV = Total Equity - Goodwill - Intangible Assets
   * @param {number} totalEquity
   * @param {number} goodwill
   * @param {number} intangibleAssets
   * @returns {number}
   */
  calculateTangibleBookValue(totalEquity, goodwill = 0, intangibleAssets = 0) {
    return totalEquity - goodwill - intangibleAssets;
  }

  /**
   * Calculate Market Capitalization
   * Market Cap = Share Price × Shares Outstanding
   * @param {number} price - Current stock price
   * @param {number} sharesOutstanding - Number of shares outstanding
   * @returns {number}
   */
  calculateMarketCap(price, sharesOutstanding) {
    if (!price || !sharesOutstanding) return null;
    return price * sharesOutstanding;
  }

  /**
   * Calculate Price to Net Income Ratio (P/NI or P/E)
   * P/NI = Market Cap / Net Income
   * @param {number} marketCap
   * @param {number} netIncome
   * @returns {number}
   */
  calculatePNI(marketCap, netIncome) {
    if (!marketCap || !netIncome || netIncome <= 0) return null;
    return marketCap / netIncome;
  }

  /**
   * Calculate Price to Tangible Book Value per Share (P/TBV)
   * P/TBV = Price / (TBV / Shares Outstanding)
   * @param {number} price
   * @param {number} tangibleBookValue
   * @param {number} sharesOutstanding
   * @returns {number}
   */
  calculatePTBVPS(price, tangibleBookValue, sharesOutstanding) {
    if (!price || !tangibleBookValue || !sharesOutstanding || sharesOutstanding <= 0) return null;
    const tbvPerShare = tangibleBookValue / sharesOutstanding;
    if (tbvPerShare <= 0) return null;
    return price / tbvPerShare;
  }

  /**
   * Calculate Market Cap to Shareholder Equity
   * Mkt Cap / SE = Market Cap / Total Equity
   * @param {number} marketCap
   * @param {number} totalEquity
   * @returns {number}
   */
  calculateMktCapSE(marketCap, totalEquity) {
    if (!marketCap || !totalEquity || totalEquity <= 0) return null;
    return marketCap / totalEquity;
  }

  /**
   * Calculate Net Income to Tangible Book Value
   * NI/TBV = Net Income / Tangible Book Value
   * @param {number} netIncome
   * @param {number} tangibleBookValue
   * @returns {number}
   */
  calculateNITBV(netIncome, tangibleBookValue) {
    if (!netIncome || !tangibleBookValue || tangibleBookValue <= 0) return null;
    return netIncome / tangibleBookValue;
  }

  /**
   * Calculate Return on Equity (ROE)
   * ROE = (Net Income / Total Equity) × 100
   * @param {number} netIncome
   * @param {number} totalEquity
   * @returns {number} ROE as percentage
   */
  calculateROE(netIncome, totalEquity) {
    if (!netIncome || !totalEquity || totalEquity <= 0) return null;
    return (netIncome / totalEquity) * 100;
  }

  /**
   * Calculate Return on Tangible Assets (RoTA)
   * RoTA = (Net Income / Tangible Assets) × 100
   * Tangible Assets = Total Assets - Goodwill - Intangible Assets
   * @param {number} netIncome
   * @param {number} tangibleAssets
   * @returns {number} RoTA as percentage
   */
  calculateROTA(netIncome, tangibleAssets) {
    if (!netIncome || !tangibleAssets || tangibleAssets <= 0) return null;
    return (netIncome / tangibleAssets) * 100;
  }

  /**
   * Calculate Return on Average Assets (ROAA)
   * ROAA = (Net Income / Average Total Assets) × 100
   * @param {number} netIncome
   * @param {number} averageAssets - Average of beginning and ending total assets
   * @returns {number} ROAA as percentage
   */
  calculateROAA(netIncome, averageAssets) {
    if (!netIncome || !averageAssets || averageAssets <= 0) return null;
    return (netIncome / averageAssets) * 100;
  }

  /**
   * Calculate Return on Tangible Common Equity (ROTCE)
   * ROTCE = (Net Income / Tangible Common Equity) × 100
   * Tangible Common Equity = Total Equity - Preferred Stock - Goodwill - Intangible Assets
   * @param {number} netIncome
   * @param {number} tangibleCommonEquity
   * @returns {number} ROTCE as percentage
   */
  calculateROTCE(netIncome, tangibleCommonEquity) {
    if (!netIncome || !tangibleCommonEquity || tangibleCommonEquity <= 0) return null;
    return (netIncome / tangibleCommonEquity) * 100;
  }

  /**
   * Calculate Tangible Assets
   * Tangible Assets = Total Assets - Goodwill - Intangible Assets
   * @param {number} totalAssets
   * @param {number} goodwill
   * @param {number} intangibleAssets
   * @returns {number}
   */
  calculateTangibleAssets(totalAssets, goodwill = 0, intangibleAssets = 0) {
    if (!totalAssets) return null;
    return totalAssets - goodwill - intangibleAssets;
  }

  /**
   * Calculate Tangible Common Equity
   * TCE = Total Equity - Preferred Stock - Goodwill - Intangible Assets
   * @param {number} totalEquity
   * @param {number} preferredStock
   * @param {number} goodwill
   * @param {number} intangibleAssets
   * @returns {number}
   */
  calculateTangibleCommonEquity(totalEquity, preferredStock = 0, goodwill = 0, intangibleAssets = 0) {
    if (!totalEquity) return null;
    return totalEquity - preferredStock - goodwill - intangibleAssets;
  }

  /**
   * Calculate Graham Number
   * Graham Number = √(22.5 × EPS × Book Value per Share)
   * @param {number} eps - Earnings per share
   * @param {number} bookValuePerShare - Book value per share
   * @returns {number}
   */
  calculateGrahamNumber(eps, bookValuePerShare) {
    if (!eps || !bookValuePerShare || eps <= 0 || bookValuePerShare <= 0) return null;
    return Math.sqrt(22.5 * eps * bookValuePerShare);
  }

  /**
   * Calculate Graham Margin of Safety (in dollars)
   * Graham MoS = Graham Number - Current Price
   * @param {number} grahamNumber
   * @param {number} currentPrice
   * @returns {number}
   */
  calculateGrahamMoS(grahamNumber, currentPrice) {
    if (!grahamNumber || !currentPrice) return null;
    return grahamNumber - currentPrice;
  }

  /**
   * Calculate Graham Margin of Safety (as percentage)
   * Graham MoS % = ((Graham Number - Current Price) / Current Price) × 100
   * @param {number} grahamNumber
   * @param {number} currentPrice
   * @returns {number}
   */
  calculateGrahamMoSPct(grahamNumber, currentPrice) {
    if (!grahamNumber || !currentPrice || currentPrice <= 0) return null;
    return ((grahamNumber - currentPrice) / currentPrice) * 100;
  }

  // ============================================================================
  // BANK-SPECIFIC RATIO CALCULATIONS
  // ============================================================================

  /**
   * Calculate Efficiency Ratio
   * Efficiency Ratio = Noninterest Expense / (Net Interest Income + Noninterest Income)
   * Lower is better - measures operational efficiency. Typical range: 50-70%
   * @param {number} noninterestExpense
   * @param {number} netInterestIncome
   * @param {number} noninterestIncome
   * @returns {number}
   */
  calculateEfficiencyRatio(noninterestExpense, netInterestIncome, noninterestIncome) {
    const totalRevenue = (netInterestIncome || 0) + (noninterestIncome || 0);
    if (!noninterestExpense || totalRevenue <= 0) return null;
    return (noninterestExpense / totalRevenue) * 100;
  }

  /**
   * Calculate Allowance for Credit Losses / Total Loans
   * ACL/Loans = Allowance for Credit Losses / Total Loans
   * Credit loss reserve as percentage of loan portfolio. Typical range: 1-2%
   * @param {number} allowanceForCreditLosses
   * @param {number} loans
   * @returns {number}
   */
  calculateAclToLoans(allowanceForCreditLosses, loans) {
    if (!allowanceForCreditLosses || !loans || loans <= 0) return null;
    return (allowanceForCreditLosses / loans) * 100;
  }

  /**
   * Calculate Provision for Credit Losses / Average Loans
   * Provision/Avg Loans = Provision for Credit Losses / Average Loans
   * Annual provision expense as percentage of average loans. Typical range: 0.1-0.5%
   * @param {number} provisionForCreditLosses
   * @param {number} averageLoans
   * @returns {number}
   */
  calculateProvisionToAvgLoans(provisionForCreditLosses, averageLoans) {
    if (!provisionForCreditLosses || !averageLoans || averageLoans <= 0) return null;
    return (provisionForCreditLosses / averageLoans) * 100;
  }

  /**
   * Calculate Loans / Total Assets
   * Loans/Assets = Total Loans / Total Assets
   * Loan concentration ratio. Typical range: 60-75%
   * @param {number} loans
   * @param {number} totalAssets
   * @returns {number}
   */
  calculateLoansToAssets(loans, totalAssets) {
    if (!loans || !totalAssets || totalAssets <= 0) return null;
    return (loans / totalAssets) * 100;
  }

  /**
   * Calculate Deposits / Total Assets
   * Deposits/Assets = Deposits / Total Assets
   * Funding reliance on deposits. Typical range: 70-85%
   * @param {number} deposits
   * @param {number} totalAssets
   * @returns {number}
   */
  calculateDepositsToAssets(deposits, totalAssets) {
    if (!deposits || !totalAssets || totalAssets <= 0) return null;
    return (deposits / totalAssets) * 100;
  }

  /**
   * Calculate Loans / Deposits (LDR)
   * Loans/Deposits = Total Loans / Total Deposits
   * Loan-to-deposit ratio. Typical range: 80-100%
   * @param {number} loans
   * @param {number} deposits
   * @returns {number}
   */
  calculateLoansToDeposits(loans, deposits) {
    if (!loans || !deposits || deposits <= 0) return null;
    return (loans / deposits) * 100;
  }

  /**
   * Calculate Cash & Securities / Total Assets
   * Cash+Sec/Assets = (Cash + AFS + HTM) / Total Assets
   * Liquidity position. Typical range: 15-30%
   * @param {number} cash
   * @param {number} afsSecurities
   * @param {number} htmSecurities
   * @param {number} totalAssets
   * @returns {number}
   */
  calculateCashSecuritiesToAssets(cash, afsSecurities, htmSecurities, totalAssets) {
    const cashAndSecurities = (cash || 0) + (afsSecurities || 0) + (htmSecurities || 0);
    if (!totalAssets || totalAssets <= 0 || cashAndSecurities <= 0) return null;
    return (cashAndSecurities / totalAssets) * 100;
  }

  /**
   * Calculate Equity / Total Assets
   * Equity/Assets = Stockholders' Equity / Total Assets
   * Leverage ratio (higher = less leveraged). Typical range: 8-12%
   * @param {number} totalEquity
   * @param {number} totalAssets
   * @returns {number}
   */
  calculateEquityToAssets(totalEquity, totalAssets) {
    if (!totalEquity || !totalAssets || totalAssets <= 0) return null;
    return (totalEquity / totalAssets) * 100;
  }

  /**
   * Calculate TCE/TA (Tangible Common Equity / Tangible Assets)
   * TCE/TA = (Equity - Goodwill - Intangibles) / (Assets - Goodwill - Intangibles)
   * More conservative capital ratio. Typical range: 6-10%
   * @param {number} tangibleCommonEquity
   * @param {number} tangibleAssets
   * @returns {number}
   */
  calculateTceToTa(tangibleCommonEquity, tangibleAssets) {
    if (!tangibleCommonEquity || !tangibleAssets || tangibleAssets <= 0) return null;
    return (tangibleCommonEquity / tangibleAssets) * 100;
  }

  /**
   * Calculate all metrics for a bank
   * @param {Object} edgarMetrics - Metrics extracted from SEC EDGAR
   * @param {number} currentPrice - Current stock price
   * @returns {Object} All calculated metrics
   */
  calculateAllMetrics(edgarMetrics, currentPrice) {
    // Extract values from EDGAR metrics
    const totalAssets = edgarMetrics.totalAssets?.value || null;
    const totalEquity = edgarMetrics.totalEquity?.value || null;
    const netIncome = edgarMetrics.netIncome?.value || null;
    const sharesOutstanding = edgarMetrics.sharesOutstanding?.value || null;
    const eps = edgarMetrics.eps?.value || null;
    const goodwill = edgarMetrics.goodwill?.value || 0;
    const intangibleAssets = edgarMetrics.intangibleAssets?.value || 0;
    const preferredStock = edgarMetrics.preferredStock?.value || 0;
    const priorTotalAssets = edgarMetrics.priorTotalAssets?.value || totalAssets;

    // Bank-specific metrics
    const loans = edgarMetrics.loans?.value || null;
    const deposits = edgarMetrics.deposits?.value || null;
    const allowanceForCreditLosses = edgarMetrics.allowanceForCreditLosses?.value || null;
    const cashAndEquivalents = edgarMetrics.cashAndEquivalents?.value || 0;
    const afsSecurities = edgarMetrics.afsSecurities?.value || 0;
    const htmSecurities = edgarMetrics.htmSecurities?.value || 0;
    const netInterestIncome = edgarMetrics.netInterestIncome?.value || null;
    const noninterestIncome = edgarMetrics.noninterestIncome?.value || null;
    const noninterestExpense = edgarMetrics.noninterestExpense?.value || null;
    const provisionForCreditLosses = edgarMetrics.provisionForCreditLosses?.value || null;
    const priorLoans = edgarMetrics.priorLoans?.value || loans;

    // Calculate derived values
    const tangibleBookValue = totalEquity ? this.calculateTangibleBookValue(totalEquity, goodwill, intangibleAssets) : null;
    const tangibleAssets = this.calculateTangibleAssets(totalAssets, goodwill, intangibleAssets);
    const tangibleCommonEquity = this.calculateTangibleCommonEquity(totalEquity, preferredStock, goodwill, intangibleAssets);
    const averageAssets = totalAssets && priorTotalAssets ? (totalAssets + priorTotalAssets) / 2 : totalAssets;
    const averageLoans = loans && priorLoans ? (loans + priorLoans) / 2 : loans;
    const marketCap = currentPrice && sharesOutstanding ? this.calculateMarketCap(currentPrice, sharesOutstanding) : null;
    const bookValuePerShare = totalEquity && sharesOutstanding ? totalEquity / sharesOutstanding : null;
    const tangibleBookValuePerShare = tangibleBookValue && sharesOutstanding ? tangibleBookValue / sharesOutstanding : null;

    // Calculate all ratios and metrics
    const pni = this.calculatePNI(marketCap, netIncome);
    const ptbvps = this.calculatePTBVPS(currentPrice, tangibleBookValue, sharesOutstanding);
    const mktCapSE = this.calculateMktCapSE(marketCap, totalEquity);
    const niTBV = this.calculateNITBV(netIncome, tangibleBookValue);
    const roe = this.calculateROE(netIncome, totalEquity);
    const rota = this.calculateROTA(netIncome, tangibleAssets);
    const roaa = this.calculateROAA(netIncome, averageAssets);
    const rotce = this.calculateROTCE(netIncome, tangibleCommonEquity);
    const grahamNumber = this.calculateGrahamNumber(eps, bookValuePerShare);
    const grahamMoS = this.calculateGrahamMoS(grahamNumber, currentPrice);
    const grahamMoSPct = this.calculateGrahamMoSPct(grahamNumber, currentPrice);

    // Calculate bank-specific ratios
    const efficiencyRatio = this.calculateEfficiencyRatio(noninterestExpense, netInterestIncome, noninterestIncome);
    const aclToLoans = this.calculateAclToLoans(allowanceForCreditLosses, loans);
    const provisionToAvgLoans = this.calculateProvisionToAvgLoans(provisionForCreditLosses, averageLoans);
    const loansToAssets = this.calculateLoansToAssets(loans, totalAssets);
    const depositsToAssets = this.calculateDepositsToAssets(deposits, totalAssets);
    const loansToDeposits = this.calculateLoansToDeposits(loans, deposits);
    const cashSecuritiesToAssets = this.calculateCashSecuritiesToAssets(cashAndEquivalents, afsSecurities, htmSecurities, totalAssets);
    const equityToAssets = this.calculateEquityToAssets(totalEquity, totalAssets);
    const tceToTa = this.calculateTceToTa(tangibleCommonEquity, tangibleAssets);

    // Get the most recent data date from EDGAR metrics
    const dataDate = edgarMetrics.netIncome?.date ||
                     edgarMetrics.totalEquity?.date ||
                     edgarMetrics.totalAssets?.date ||
                     new Date().toISOString().split('T')[0];

    return {
      // Price and market data
      price: currentPrice,
      market_cap: marketCap,

      // SEC filing derived metrics
      total_assets: totalAssets,
      total_equity: totalEquity,
      tangible_book_value: tangibleBookValue,
      tangible_assets: tangibleAssets,
      tangible_common_equity: tangibleCommonEquity,
      net_income: netIncome,
      shares_outstanding: sharesOutstanding,
      eps: eps,
      book_value_per_share: bookValuePerShare,
      tangible_book_value_per_share: tangibleBookValuePerShare,

      // Calculated ratios
      pni: pni,
      ptbvps: ptbvps,
      mkt_cap_se: mktCapSE,
      ni_tbv: niTBV,
      roe: roe,
      rota: rota,
      roaa: roaa,
      rotce: rotce,

      // Graham value investing metrics
      graham_number: grahamNumber,
      graham_mos: grahamMoS,
      graham_mos_pct: grahamMoSPct,

      // Bank-specific ratios
      efficiency_ratio: efficiencyRatio,
      acl_to_loans: aclToLoans,
      provision_to_avg_loans: provisionToAvgLoans,
      loans_to_assets: loansToAssets,
      deposits_to_assets: depositsToAssets,
      loans_to_deposits: loansToDeposits,
      cash_securities_to_assets: cashSecuritiesToAssets,
      equity_to_assets: equityToAssets,
      tce_to_ta: tceToTa,

      // Metadata
      data_date: dataDate
    };
  }
}

module.exports = new MetricsCalculator();

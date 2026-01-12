const axios = require('axios');

/**
 * Financial Metrics Calculator
 * Calculates banking metrics based on SEC filing data and market prices
 */
class MetricsCalculator {
  /**
   * Get current stock price from Yahoo Finance (free alternative)
   * @param {string} ticker - Stock ticker symbol
   * @returns {Promise<number>} Current stock price
   */
  async getCurrentPrice(ticker) {
    try {
      // Using Yahoo Finance API (via query2.finance.yahoo.com)
      const url = `https://query2.finance.yahoo.com/v8/finance/chart/${ticker}`;
      const response = await axios.get(url, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0'
        }
      });

      const quote = response.data?.chart?.result?.[0]?.meta?.regularMarketPrice;
      if (!quote) {
        throw new Error('Price not found in response');
      }

      return parseFloat(quote);
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
   * Calculate Return on Total Assets (ROTA)
   * ROTA = (Net Income / Total Assets) × 100
   * @param {number} netIncome
   * @param {number} totalAssets
   * @returns {number} ROTA as percentage
   */
  calculateROTA(netIncome, totalAssets) {
    if (!netIncome || !totalAssets || totalAssets <= 0) return null;
    return (netIncome / totalAssets) * 100;
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

    // Calculate derived values
    const tangibleBookValue = totalEquity ? this.calculateTangibleBookValue(totalEquity, goodwill, intangibleAssets) : null;
    const marketCap = currentPrice && sharesOutstanding ? this.calculateMarketCap(currentPrice, sharesOutstanding) : null;
    const bookValuePerShare = totalEquity && sharesOutstanding ? totalEquity / sharesOutstanding : null;
    const tangibleBookValuePerShare = tangibleBookValue && sharesOutstanding ? tangibleBookValue / sharesOutstanding : null;

    // Calculate all ratios and metrics
    const pni = this.calculatePNI(marketCap, netIncome);
    const ptbvps = this.calculatePTBVPS(currentPrice, tangibleBookValue, sharesOutstanding);
    const mktCapSE = this.calculateMktCapSE(marketCap, totalEquity);
    const niTBV = this.calculateNITBV(netIncome, tangibleBookValue);
    const roe = this.calculateROE(netIncome, totalEquity);
    const rota = this.calculateROTA(netIncome, totalAssets);
    const grahamNumber = this.calculateGrahamNumber(eps, bookValuePerShare);
    const grahamMoS = this.calculateGrahamMoS(grahamNumber, currentPrice);
    const grahamMoSPct = this.calculateGrahamMoSPct(grahamNumber, currentPrice);

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

      // Graham value investing metrics
      graham_number: grahamNumber,
      graham_mos: grahamMoS,
      graham_mos_pct: grahamMoSPct,

      // Metadata
      data_date: dataDate
    };
  }
}

module.exports = new MetricsCalculator();

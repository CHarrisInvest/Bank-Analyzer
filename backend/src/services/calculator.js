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

    // Calculate derived values
    const tangibleBookValue = totalEquity ? this.calculateTangibleBookValue(totalEquity, goodwill, intangibleAssets) : null;
    const tangibleAssets = this.calculateTangibleAssets(totalAssets, goodwill, intangibleAssets);
    const tangibleCommonEquity = this.calculateTangibleCommonEquity(totalEquity, preferredStock, goodwill, intangibleAssets);
    const averageAssets = totalAssets && priorTotalAssets ? (totalAssets + priorTotalAssets) / 2 : totalAssets;
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

      // Metadata
      data_date: dataDate
    };
  }
}

module.exports = new MetricsCalculator();

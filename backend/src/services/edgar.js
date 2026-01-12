const axios = require('axios');
const config = require('../config');

/**
 * SEC EDGAR API Client
 * Fetches company financial data from SEC EDGAR database
 */
class EdgarClient {
  constructor() {
    this.baseUrl = config.edgar.baseUrl;
    this.userAgent = config.edgar.userAgent;
    this.requestDelay = config.edgar.requestDelay;
    this.lastRequestTime = 0;
  }

  /**
   * Ensure we respect SEC's rate limit (10 requests per second)
   */
  async rateLimit() {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    if (timeSinceLastRequest < this.requestDelay) {
      await new Promise(resolve => setTimeout(resolve, this.requestDelay - timeSinceLastRequest));
    }
    this.lastRequestTime = Date.now();
  }

  /**
   * Get company CIK from ticker symbol
   * @param {string} ticker - Stock ticker symbol
   * @returns {Promise<string>} CIK number (padded to 10 digits)
   */
  async getCikFromTicker(ticker) {
    try {
      await this.rateLimit();
      const response = await axios.get(
        `${this.baseUrl}/submissions/CIK${ticker}.json`,
        {
          headers: { 'User-Agent': this.userAgent },
          timeout: 10000,
          validateStatus: false
        }
      );

      if (response.status === 200 && response.data.cik) {
        return response.data.cik.toString().padStart(10, '0');
      }

      // Try ticker lookup endpoint
      const tickerResponse = await axios.get(
        'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=' + ticker + '&type=&dateb=&owner=exclude&count=1&output=json',
        {
          headers: { 'User-Agent': this.userAgent },
          timeout: 10000,
          validateStatus: false
        }
      );

      if (tickerResponse.status === 200 && tickerResponse.data) {
        const cik = tickerResponse.data.cik_str || tickerResponse.data.CIK;
        if (cik) {
          return cik.toString().padStart(10, '0');
        }
      }

      throw new Error(`CIK not found for ticker: ${ticker}`);
    } catch (error) {
      console.error(`Error getting CIK for ${ticker}:`, error.message);
      throw error;
    }
  }

  /**
   * Fetch company facts (XBRL financial data)
   * @param {string} cik - Company CIK number
   * @returns {Promise<Object>} Company facts data
   */
  async getCompanyFacts(cik) {
    try {
      await this.rateLimit();
      const paddedCik = cik.toString().padStart(10, '0');
      const url = `${this.baseUrl}/api/xbrl/companyfacts/CIK${paddedCik}.json`;

      const response = await axios.get(url, {
        headers: { 'User-Agent': this.userAgent },
        timeout: 30000
      });

      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error(`No company facts found for CIK: ${cik}`);
      }
      console.error(`Error fetching company facts for CIK ${cik}:`, error.message);
      throw error;
    }
  }

  /**
   * Get latest value for a specific XBRL concept
   * @param {Object} companyFacts - Company facts data
   * @param {string} concept - XBRL concept name (e.g., 'Assets', 'StockholdersEquity')
   * @param {string} taxonomy - Taxonomy (default: 'us-gaap')
   * @returns {Object|null} Latest value with date
   */
  getLatestConceptValue(companyFacts, concept, taxonomy = 'us-gaap') {
    try {
      const conceptData = companyFacts.facts?.[taxonomy]?.[concept];
      if (!conceptData) {
        return null;
      }

      // Get USD values (annual or quarterly)
      const usdUnits = conceptData.units?.USD;
      if (!usdUnits || usdUnits.length === 0) {
        return null;
      }

      // Filter for most recent annual data (form 10-K)
      const annualData = usdUnits
        .filter(item => item.form === '10-K' && item.val && item.end)
        .sort((a, b) => new Date(b.end) - new Date(a.end));

      if (annualData.length > 0) {
        return {
          value: annualData[0].val,
          date: annualData[0].end,
          form: annualData[0].form,
          fiscalYear: annualData[0].fy,
          fiscalPeriod: annualData[0].fp
        };
      }

      // Fallback to most recent quarterly data (form 10-Q)
      const quarterlyData = usdUnits
        .filter(item => item.form === '10-Q' && item.val && item.end)
        .sort((a, b) => new Date(b.end) - new Date(a.end));

      if (quarterlyData.length > 0) {
        return {
          value: quarterlyData[0].val,
          date: quarterlyData[0].end,
          form: quarterlyData[0].form,
          fiscalYear: quarterlyData[0].fy,
          fiscalPeriod: quarterlyData[0].fp
        };
      }

      return null;
    } catch (error) {
      console.error(`Error extracting concept ${concept}:`, error.message);
      return null;
    }
  }

  /**
   * Extract key banking metrics from company facts
   * @param {Object} companyFacts - Company facts data from SEC
   * @returns {Object} Extracted financial metrics
   */
  extractBankingMetrics(companyFacts) {
    const metrics = {};

    // Balance Sheet Items
    metrics.totalAssets = this.getLatestConceptValue(companyFacts, 'Assets');
    metrics.totalEquity = this.getLatestConceptValue(companyFacts, 'StockholdersEquity');
    metrics.commonStock = this.getLatestConceptValue(companyFacts, 'CommonStockSharesOutstanding');

    // Alternative concepts for stockholders equity
    if (!metrics.totalEquity) {
      metrics.totalEquity = this.getLatestConceptValue(companyFacts, 'StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest');
    }

    // Intangible assets (for calculating tangible book value)
    metrics.goodwill = this.getLatestConceptValue(companyFacts, 'Goodwill');
    metrics.intangibleAssets = this.getLatestConceptValue(companyFacts, 'IntangibleAssetsNetExcludingGoodwill');

    // Income Statement Items
    metrics.netIncome = this.getLatestConceptValue(companyFacts, 'NetIncomeLoss');

    // Alternative concepts for net income
    if (!metrics.netIncome) {
      metrics.netIncome = this.getLatestConceptValue(companyFacts, 'ProfitLoss');
    }
    if (!metrics.netIncome) {
      metrics.netIncome = this.getLatestConceptValue(companyFacts, 'NetIncomeLossAvailableToCommonStockholdersBasic');
    }

    // Earnings Per Share
    metrics.eps = this.getLatestConceptValue(companyFacts, 'EarningsPerShareBasic');
    if (!metrics.eps) {
      metrics.eps = this.getLatestConceptValue(companyFacts, 'EarningsPerShareDiluted');
    }

    // Shares outstanding
    metrics.sharesOutstanding = this.getLatestConceptValue(companyFacts, 'CommonStockSharesOutstanding');
    if (!metrics.sharesOutstanding) {
      metrics.sharesOutstanding = this.getLatestConceptValue(companyFacts, 'WeightedAverageNumberOfSharesOutstandingBasic');
    }

    return metrics;
  }

  /**
   * Get company information from submissions endpoint
   * @param {string} cik - Company CIK number
   * @returns {Promise<Object>} Company information
   */
  async getCompanyInfo(cik) {
    try {
      await this.rateLimit();
      const paddedCik = cik.toString().padStart(10, '0');
      const url = `${this.baseUrl}/submissions/CIK${paddedCik}.json`;

      const response = await axios.get(url, {
        headers: { 'User-Agent': this.userAgent },
        timeout: 10000
      });

      return {
        cik: paddedCik,
        name: response.data.name,
        ticker: response.data.tickers?.[0] || null,
        exchange: response.data.exchanges?.[0] || null,
        sic: response.data.sic,
        sicDescription: response.data.sicDescription
      };
    } catch (error) {
      console.error(`Error fetching company info for CIK ${cik}:`, error.message);
      throw error;
    }
  }
}

module.exports = new EdgarClient();

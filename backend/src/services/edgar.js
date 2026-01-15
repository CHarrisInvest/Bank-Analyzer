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

    // ============================================================================
    // BALANCE SHEET - ASSETS
    // ============================================================================

    // Total Assets (us-gaap:Assets)
    metrics.totalAssets = this.getLatestConceptValue(companyFacts, 'Assets');

    // Cash and Due from Banks (us-gaap:CashAndDueFromBanks)
    metrics.cashAndDueFromBanks = this.getLatestConceptValue(companyFacts, 'CashAndDueFromBanks');
    if (!metrics.cashAndDueFromBanks) {
      metrics.cashAndDueFromBanks = this.getLatestConceptValue(companyFacts, 'CashAndCashEquivalentsAtCarryingValue');
    }

    // Interest-Bearing Deposits in Banks (us-gaap:InterestBearingDepositsInBanks)
    metrics.interestBearingDepositsInBanks = this.getLatestConceptValue(companyFacts, 'InterestBearingDepositsInBanks');
    if (!metrics.interestBearingDepositsInBanks) {
      metrics.interestBearingDepositsInBanks = this.getLatestConceptValue(companyFacts, 'InterestBearingDepositsInBanksAndOtherFinancialInstitutions');
    }

    // Available-for-Sale Securities (us-gaap:AvailableForSaleSecuritiesDebt)
    metrics.afsSecurities = this.getLatestConceptValue(companyFacts, 'AvailableForSaleSecuritiesDebtSecurities');
    if (!metrics.afsSecurities) {
      metrics.afsSecurities = this.getLatestConceptValue(companyFacts, 'AvailableForSaleSecurities');
    }
    if (!metrics.afsSecurities) {
      metrics.afsSecurities = this.getLatestConceptValue(companyFacts, 'AvailableForSaleSecuritiesDebt');
    }

    // Held-to-Maturity Securities (us-gaap:HeldToMaturitySecurities)
    metrics.htmSecurities = this.getLatestConceptValue(companyFacts, 'HeldToMaturitySecurities');
    if (!metrics.htmSecurities) {
      metrics.htmSecurities = this.getLatestConceptValue(companyFacts, 'HeldToMaturitySecuritiesAmortizedCostAfterAllowanceForCreditLoss');
    }

    // Loans and Leases (us-gaap:LoansAndLeasesReceivableNetReportedAmount)
    metrics.loans = this.getLatestConceptValue(companyFacts, 'LoansAndLeasesReceivableNetReportedAmount');
    if (!metrics.loans) {
      metrics.loans = this.getLatestConceptValue(companyFacts, 'FinancingReceivableExcludingAccruedInterestAfterAllowanceForCreditLoss');
    }
    if (!metrics.loans) {
      metrics.loans = this.getLatestConceptValue(companyFacts, 'NotesReceivableNet');
    }

    // Allowance for Loan and Lease Losses (us-gaap:AllowanceForLoanAndLeaseLosses)
    metrics.allowanceForCreditLosses = this.getLatestConceptValue(companyFacts, 'AllowanceForLoanAndLeaseLosses');
    if (!metrics.allowanceForCreditLosses) {
      metrics.allowanceForCreditLosses = this.getLatestConceptValue(companyFacts, 'FinancingReceivableAllowanceForCreditLosses');
    }
    if (!metrics.allowanceForCreditLosses) {
      metrics.allowanceForCreditLosses = this.getLatestConceptValue(companyFacts, 'LoansAndLeasesReceivableAllowance');
    }

    // Premises and Equipment Net (us-gaap:PremisesAndEquipmentNet)
    metrics.premisesAndEquipment = this.getLatestConceptValue(companyFacts, 'PremisesAndEquipmentNet');
    if (!metrics.premisesAndEquipment) {
      metrics.premisesAndEquipment = this.getLatestConceptValue(companyFacts, 'PropertyPlantAndEquipmentNet');
    }

    // Legacy cash field for compatibility
    metrics.cashAndEquivalents = metrics.cashAndDueFromBanks;

    // ============================================================================
    // BALANCE SHEET - LIABILITIES & EQUITY
    // ============================================================================

    // Total Liabilities (us-gaap:Liabilities)
    metrics.totalLiabilities = this.getLatestConceptValue(companyFacts, 'Liabilities');

    // Deposits (us-gaap:Deposits)
    metrics.deposits = this.getLatestConceptValue(companyFacts, 'Deposits');
    if (!metrics.deposits) {
      metrics.deposits = this.getLatestConceptValue(companyFacts, 'DepositsDomestic');
    }

    // Short-Term Borrowings (us-gaap:ShortTermBorrowings)
    metrics.shortTermBorrowings = this.getLatestConceptValue(companyFacts, 'ShortTermBorrowings');
    if (!metrics.shortTermBorrowings) {
      metrics.shortTermBorrowings = this.getLatestConceptValue(companyFacts, 'SecuritiesSoldUnderAgreementsToRepurchase');
    }

    // Long-Term Debt (us-gaap:LongTermDebt)
    metrics.longTermDebt = this.getLatestConceptValue(companyFacts, 'LongTermDebt');
    if (!metrics.longTermDebt) {
      metrics.longTermDebt = this.getLatestConceptValue(companyFacts, 'LongTermDebtNoncurrent');
    }
    if (!metrics.longTermDebt) {
      metrics.longTermDebt = this.getLatestConceptValue(companyFacts, 'SubordinatedDebt');
    }

    // Stockholders' Equity (us-gaap:StockholdersEquity)
    metrics.totalEquity = this.getLatestConceptValue(companyFacts, 'StockholdersEquity');
    if (!metrics.totalEquity) {
      metrics.totalEquity = this.getLatestConceptValue(companyFacts, 'StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest');
    }

    // Intangible assets (for calculating tangible book value)
    metrics.goodwill = this.getLatestConceptValue(companyFacts, 'Goodwill');
    metrics.intangibleAssets = this.getLatestConceptValue(companyFacts, 'IntangibleAssetsNetExcludingGoodwill');

    // Preferred Stock
    metrics.preferredStock = this.getLatestConceptValue(companyFacts, 'PreferredStockValue');

    // ============================================================================
    // INCOME STATEMENT
    // ============================================================================

    // Interest Income (us-gaap:InterestIncome)
    metrics.interestIncome = this.getLatestConceptValue(companyFacts, 'InterestAndDividendIncomeOperating');
    if (!metrics.interestIncome) {
      metrics.interestIncome = this.getLatestConceptValue(companyFacts, 'InterestIncome');
    }
    if (!metrics.interestIncome) {
      metrics.interestIncome = this.getLatestConceptValue(companyFacts, 'InterestIncomeOperating');
    }

    // Interest Expense (us-gaap:InterestExpense)
    metrics.interestExpense = this.getLatestConceptValue(companyFacts, 'InterestExpense');
    if (!metrics.interestExpense) {
      metrics.interestExpense = this.getLatestConceptValue(companyFacts, 'InterestExpenseDeposits');
    }

    // Net Interest Income (us-gaap:NetInterestIncome)
    metrics.netInterestIncome = this.getLatestConceptValue(companyFacts, 'InterestIncomeExpenseNet');
    if (!metrics.netInterestIncome) {
      metrics.netInterestIncome = this.getLatestConceptValue(companyFacts, 'NetInterestIncome');
    }

    // Noninterest Income (us-gaap:NoninterestIncome)
    metrics.noninterestIncome = this.getLatestConceptValue(companyFacts, 'NoninterestIncome');

    // Noninterest Expense (us-gaap:NoninterestExpense)
    metrics.noninterestExpense = this.getLatestConceptValue(companyFacts, 'NoninterestExpense');
    if (!metrics.noninterestExpense) {
      metrics.noninterestExpense = this.getLatestConceptValue(companyFacts, 'OtherCostAndExpenseOperating');
    }

    // Provision for Loan and Lease Losses (us-gaap:ProvisionForLoanAndLeaseLosses)
    metrics.provisionForCreditLosses = this.getLatestConceptValue(companyFacts, 'ProvisionForLoanAndLeaseLosses');
    if (!metrics.provisionForCreditLosses) {
      metrics.provisionForCreditLosses = this.getLatestConceptValue(companyFacts, 'ProvisionForLoanLeaseAndOtherLosses');
    }
    if (!metrics.provisionForCreditLosses) {
      metrics.provisionForCreditLosses = this.getLatestConceptValue(companyFacts, 'ProvisionForCreditLosses');
    }

    // Pre-Tax Income (us-gaap:IncomeLossFromContinuingOperationsBeforeIncomeTaxes)
    metrics.preTaxIncome = this.getLatestConceptValue(companyFacts, 'IncomeLossFromContinuingOperationsBeforeIncomeTaxesMinorityInterestAndIncomeLossFromEquityMethodInvestments');
    if (!metrics.preTaxIncome) {
      metrics.preTaxIncome = this.getLatestConceptValue(companyFacts, 'IncomeLossFromContinuingOperationsBeforeIncomeTaxes');
    }
    if (!metrics.preTaxIncome) {
      metrics.preTaxIncome = this.getLatestConceptValue(companyFacts, 'IncomeLossFromContinuingOperationsBeforeIncomeTaxesExtraordinaryItemsNoncontrollingInterest');
    }

    // Net Income (us-gaap:NetIncomeLoss)
    metrics.netIncome = this.getLatestConceptValue(companyFacts, 'NetIncomeLoss');
    if (!metrics.netIncome) {
      metrics.netIncome = this.getLatestConceptValue(companyFacts, 'ProfitLoss');
    }
    if (!metrics.netIncome) {
      metrics.netIncome = this.getLatestConceptValue(companyFacts, 'NetIncomeLossAvailableToCommonStockholdersBasic');
    }

    // ============================================================================
    // CASH FLOW
    // ============================================================================

    // Net Cash from Operating Activities (us-gaap:NetCashProvidedByUsedInOperatingActivities)
    metrics.operatingCashFlow = this.getLatestConceptValue(companyFacts, 'NetCashProvidedByUsedInOperatingActivities');
    if (!metrics.operatingCashFlow) {
      metrics.operatingCashFlow = this.getLatestConceptValue(companyFacts, 'CashFlowsFromUsedInOperatingActivities');
    }

    // ============================================================================
    // CAPITAL / PER-SHARE
    // ============================================================================

    // Shares Outstanding (dei:EntityCommonStockSharesOutstanding)
    metrics.sharesOutstanding = this.getLatestConceptValue(companyFacts, 'CommonStockSharesOutstanding');
    if (!metrics.sharesOutstanding) {
      metrics.sharesOutstanding = this.getLatestConceptValue(companyFacts, 'EntityCommonStockSharesOutstanding', 'dei');
    }
    if (!metrics.sharesOutstanding) {
      metrics.sharesOutstanding = this.getLatestConceptValue(companyFacts, 'WeightedAverageNumberOfSharesOutstandingBasic');
    }

    // Earnings Per Share (us-gaap:EarningsPerShareBasic)
    metrics.eps = this.getLatestConceptValue(companyFacts, 'EarningsPerShareBasic');
    if (!metrics.eps) {
      metrics.eps = this.getLatestConceptValue(companyFacts, 'EarningsPerShareDiluted');
    }

    // Dividends Per Share (us-gaap:CommonStockDividendsPerShareDeclared)
    metrics.dividendsPerShare = this.getLatestConceptValue(companyFacts, 'CommonStockDividendsPerShareDeclared');
    if (!metrics.dividendsPerShare) {
      metrics.dividendsPerShare = this.getLatestConceptValue(companyFacts, 'CommonStockDividendsPerShareCashPaid');
    }

    // Legacy field for compatibility
    metrics.commonStock = metrics.sharesOutstanding;

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

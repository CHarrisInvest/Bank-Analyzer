import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { trackBankViewed, trackBankTabChanged } from '../analytics/events.js';
import BackButton from '../components/BackButton.jsx';

/**
 * Bank Detail Page
 * Shows comprehensive information about a single bank with tabs
 */
function BankDetail({ banks = [], rawData = null, loading = false }) {
  const { ticker } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  // Find the bank by ticker
  const bank = useMemo(() => {
    return banks.find(b => b.ticker?.toUpperCase() === ticker?.toUpperCase());
  }, [banks, ticker]);

  // Find raw data for this bank
  const bankRawData = useMemo(() => {
    if (!rawData?.banks || !bank?.cik) return null;
    return rawData.banks[bank.cik]?.rawData || null;
  }, [rawData, bank]);

  // Track page view
  useEffect(() => {
    if (bank) {
      trackBankViewed(ticker, activeTab);
    }
  }, [ticker, activeTab, bank]);

  const handleTabChange = (tab) => {
    setSearchParams({ tab });
    trackBankTabChanged(ticker, tab);
  };

  const formatNumber = (num, decimals = 0) => {
    if (num === null || num === undefined) return '-';
    return num.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  const formatCurrency = (num) => {
    if (num === null || num === undefined) return '-';
    if (Math.abs(num) >= 1e12) return '$' + (num / 1e12).toFixed(2) + 'T';
    if (Math.abs(num) >= 1e9) return '$' + (num / 1e9).toFixed(2) + 'B';
    if (Math.abs(num) >= 1e6) return '$' + (num / 1e6).toFixed(2) + 'M';
    if (Math.abs(num) >= 1e3) return '$' + (num / 1e3).toFixed(2) + 'K';
    return '$' + num.toFixed(2);
  };

  const formatPercent = (num) => {
    if (num === null || num === undefined) return '-';
    return num.toFixed(2) + '%';
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    // Handle YYYYMMDD format
    if (dateStr.length === 8 && !dateStr.includes('-')) {
      const year = dateStr.substring(0, 4);
      const month = dateStr.substring(4, 6);
      const day = dateStr.substring(6, 8);
      return `${month}/${day}/${year}`;
    }
    // Handle YYYY-MM-DD format
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="page bank-detail-page">
        <div className="loading-state">
          <div className="loading-spinner" />
          <p>Loading bank data...</p>
        </div>
      </div>
    );
  }

  if (!bank) {
    return (
      <div className="page bank-detail-page">
        <div className="not-found">
          <h1>Bank Not Found</h1>
          <p>No bank found with ticker symbol "{ticker}".</p>
          <Link to="/search" className="btn btn-primary">Search Banks</Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'ratios', label: 'Ratios & Valuation' },
    { id: 'balance-sheet', label: 'Balance Sheet' },
    { id: 'income-statement', label: 'Income Statement' },
  ];

  return (
    <div className="page bank-detail-page">
      {/* Back Button */}
      <BackButton />

      {/* Header */}
      <div className="bank-header">
        <div className="bank-header-main">
          <div className="bank-title">
            <h1>{bank.ticker}</h1>
            <span className="bank-exchange-badge">{bank.exchange}</span>
          </div>
          <p className="bank-full-name">{bank.bankName}</p>
        </div>
        <div className="bank-header-meta">
          <span>CIK: {bank.cik}</span>
          <span>SIC: {bank.sic} - {bank.sicDescription}</span>
          <span>Data as of: {formatDate(bank.dataDate)}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="bank-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? 'tab-btn tab-btn-active' : 'tab-btn'}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bank-tab-content">
        {activeTab === 'overview' && (
          <OverviewTab bank={bank} formatCurrency={formatCurrency} formatPercent={formatPercent} formatNumber={formatNumber} />
        )}
        {activeTab === 'ratios' && (
          <RatiosTab bank={bank} formatCurrency={formatCurrency} formatPercent={formatPercent} formatNumber={formatNumber} />
        )}
        {activeTab === 'balance-sheet' && (
          <BalanceSheetTab bank={bank} rawData={bankRawData} formatCurrency={formatCurrency} formatDate={formatDate} />
        )}
        {activeTab === 'income-statement' && (
          <IncomeStatementTab bank={bank} rawData={bankRawData} formatCurrency={formatCurrency} formatDate={formatDate} />
        )}
      </div>
    </div>
  );
}

/**
 * Overview Tab - Filer info and key metrics
 */
function OverviewTab({ bank, formatCurrency, formatPercent, formatNumber }) {
  return (
    <div className="tab-overview">
      <div className="overview-grid">
        {/* Company Info */}
        <div className="info-card">
          <h3>Company Information</h3>
          <dl className="info-list">
            <dt>Legal Name</dt>
            <dd>{bank.bankName}</dd>
            <dt>Ticker Symbol</dt>
            <dd>{bank.ticker}</dd>
            <dt>Exchange</dt>
            <dd>{bank.exchange}</dd>
            <dt>CIK</dt>
            <dd>{bank.cik}</dd>
            <dt>SIC Code</dt>
            <dd>{bank.sic}</dd>
            <dt>Industry</dt>
            <dd>{bank.sicDescription}</dd>
          </dl>
        </div>

        {/* Key Metrics */}
        <div className="info-card">
          <h3>Key Metrics</h3>
          <dl className="info-list">
            <dt>Total Assets</dt>
            <dd>{formatCurrency(bank.totalAssets)}</dd>
            <dt>Total Deposits</dt>
            <dd>{formatCurrency(bank.totalDeposits)}</dd>
            <dt>Total Equity</dt>
            <dd>{formatCurrency(bank.totalEquity)}</dd>
            <dt>Shares Outstanding</dt>
            <dd>{formatNumber(bank.sharesOutstanding)}</dd>
          </dl>
        </div>

        {/* Performance */}
        <div className="info-card">
          <h3>Performance (TTM)</h3>
          <dl className="info-list">
            <dt>Net Income</dt>
            <dd>{formatCurrency(bank.ttmNetIncome)}</dd>
            <dt>Net Interest Income</dt>
            <dd>{formatCurrency(bank.ttmNetInterestIncome)}</dd>
            <dt>EPS</dt>
            <dd>{bank.ttmEps !== null ? '$' + bank.ttmEps.toFixed(2) : '-'}</dd>
            <dt>Dividend Per Share</dt>
            <dd>{bank.ttmDividendPerShare !== null ? '$' + bank.ttmDividendPerShare.toFixed(2) : '-'}</dd>
          </dl>
        </div>

        {/* Ratios Snapshot */}
        <div className="info-card">
          <h3>Ratios Snapshot</h3>
          <dl className="info-list">
            <dt>Return on Equity</dt>
            <dd>{formatPercent(bank.roe)}</dd>
            <dt>Return on Assets</dt>
            <dd>{formatPercent(bank.roaa)}</dd>
            <dt>Efficiency Ratio</dt>
            <dd>{formatPercent(bank.efficiencyRatio)}</dd>
            <dt>Book Value Per Share</dt>
            <dd>{bank.bvps !== null ? '$' + bank.bvps.toFixed(2) : '-'}</dd>
          </dl>
        </div>
      </div>
    </div>
  );
}

/**
 * Ratios & Valuation Tab
 */
function RatiosTab({ bank, formatCurrency, formatPercent, formatNumber }) {
  return (
    <div className="tab-ratios">
      <div className="ratios-grid">
        {/* Profitability */}
        <div className="info-card">
          <h3>Profitability Ratios</h3>
          <dl className="info-list">
            <dt>
              Return on Equity (ROE)
              <Link to="/metrics/roe" className="info-link">?</Link>
            </dt>
            <dd>{formatPercent(bank.roe)}</dd>
            <dt>
              Return on Average Assets (ROAA)
              <Link to="/metrics/roaa" className="info-link">?</Link>
            </dt>
            <dd>{formatPercent(bank.roaa)}</dd>
            <dt>
              Net Interest Margin
              <Link to="/metrics/net-interest-margin" className="info-link">?</Link>
            </dt>
            <dd>{formatPercent(bank.nim)}</dd>
          </dl>
        </div>

        {/* Efficiency */}
        <div className="info-card">
          <h3>Efficiency Ratios</h3>
          <dl className="info-list">
            <dt>
              Efficiency Ratio
              <Link to="/metrics/efficiency-ratio" className="info-link">?</Link>
            </dt>
            <dd>{formatPercent(bank.efficiencyRatio)}</dd>
            <dt>
              Deposits to Assets
              <Link to="/metrics/deposits-to-assets" className="info-link">?</Link>
            </dt>
            <dd>{formatPercent(bank.depositsToAssets)}</dd>
            <dt>
              Loans to Deposits
              <Link to="/metrics/loans-to-deposits" className="info-link">?</Link>
            </dt>
            <dd>{formatPercent(bank.loansToDeposits)}</dd>
          </dl>
        </div>

        {/* Capital */}
        <div className="info-card">
          <h3>Capital Ratios</h3>
          <dl className="info-list">
            <dt>
              Equity to Assets
              <Link to="/metrics/equity-to-assets" className="info-link">?</Link>
            </dt>
            <dd>{formatPercent(bank.equityToAssets)}</dd>
            <dt>
              Loans to Assets
              <Link to="/metrics/loans-to-assets" className="info-link">?</Link>
            </dt>
            <dd>{formatPercent(bank.loansToAssets)}</dd>
          </dl>
        </div>

        {/* Valuation */}
        <div className="info-card">
          <h3>Valuation Metrics</h3>
          <dl className="info-list">
            <dt>
              Book Value Per Share
              <Link to="/metrics/book-value-per-share" className="info-link">?</Link>
            </dt>
            <dd>{bank.bvps !== null ? '$' + bank.bvps.toFixed(2) : '-'}</dd>
            <dt>
              Price to Net Income (P/E)
              <Link to="/metrics/price-to-earnings" className="info-link">?</Link>
            </dt>
            <dd>{bank.pni !== null ? bank.pni.toFixed(2) + 'x' : '-'}</dd>
            <dt>
              Graham Number
              <Link to="/valuation/graham-number" className="info-link">?</Link>
            </dt>
            <dd>{bank.grahamNum !== null ? '$' + bank.grahamNum.toFixed(2) : '-'}</dd>
          </dl>
        </div>

        {/* Per Share */}
        <div className="info-card">
          <h3>Per Share Data</h3>
          <dl className="info-list">
            <dt>Earnings Per Share (TTM)</dt>
            <dd>{bank.ttmEps !== null ? '$' + bank.ttmEps.toFixed(2) : '-'}</dd>
            <dt>Dividend Per Share (TTM)</dt>
            <dd>{bank.ttmDividendPerShare !== null ? '$' + bank.ttmDividendPerShare.toFixed(2) : '-'}</dd>
            <dt>
              Dividend Payout Ratio
              <Link to="/metrics/dividend-payout-ratio" className="info-link">?</Link>
            </dt>
            <dd>{formatPercent(bank.dividendPayoutRatio)}</dd>
          </dl>
        </div>
      </div>
    </div>
  );
}

/**
 * Balance Sheet Tab - Full balance sheet from SEC filings with multi-period view
 */
function BalanceSheetTab({ bank, rawData, formatCurrency, formatDate }) {
  const [viewMode, setViewMode] = useState('annual'); // 'quarterly' or 'annual'

  // Check if historical data is available
  const historicalData = rawData?.historicalBalanceSheet;
  const hasHistoricalData = historicalData &&
    ((viewMode === 'quarterly' && historicalData.periods?.quarterly?.length > 0) ||
     (viewMode === 'annual' && historicalData.periods?.annual?.length > 0));

  // Get periods for current view mode
  const periods = hasHistoricalData
    ? (viewMode === 'quarterly' ? historicalData.periods.quarterly : historicalData.periods.annual)
    : [];

  // Get data source for current view mode
  const dataSource = hasHistoricalData
    ? (viewMode === 'quarterly' ? historicalData.quarterly : historicalData.annual)
    : {};

  // Define line items in presentation order with their XBRL concept keys
  const lineItems = [
    { label: 'ASSETS', isHeader: true },
    { label: 'Cash and Cash Equivalents', keys: ['CashAndCashEquivalentsAtCarryingValue', 'CashAndDueFromBanks', 'Cash'] },
    { label: 'Interest-Bearing Deposits', keys: ['InterestBearingDepositsInBanks'] },
    { label: 'Fed Funds Sold & Reverse Repos', keys: ['FederalFundsSoldAndSecuritiesPurchasedUnderAgreementsToResell', 'FederalFundsSold'] },
    { label: 'Trading Securities', keys: ['TradingSecurities'] },
    { label: 'Available-for-Sale Securities', keys: ['AvailableForSaleSecuritiesDebtSecurities', 'AvailableForSaleSecurities'] },
    { label: 'Held-to-Maturity Securities', keys: ['HeldToMaturitySecurities', 'DebtSecuritiesHeldToMaturityAmortizedCostAfterAllowanceForCreditLoss'] },
    { label: 'Investment Securities', keys: ['MarketableSecurities', 'InvestmentSecurities'] },
    { label: 'Loans and Leases, Net', keys: ['LoansAndLeasesReceivableNetReportedAmount', 'LoansAndLeasesReceivableNetOfDeferredIncome', 'FinancingReceivableExcludingAccruedInterestAfterAllowanceForCreditLoss'] },
    { label: 'Allowance for Credit Losses', keys: ['FinancingReceivableAllowanceForCreditLosses'], isContra: true },
    { label: 'Loans Held for Sale', keys: ['LoansReceivableHeldForSaleAmount'] },
    { label: 'Premises and Equipment, Net', keys: ['PropertyPlantAndEquipmentNet'] },
    { label: 'Goodwill', keys: ['Goodwill'] },
    { label: 'Other Intangible Assets', keys: ['IntangibleAssetsNetExcludingGoodwill', 'OtherIntangibleAssetsNet'] },
    { label: 'Bank-Owned Life Insurance', keys: ['BankOwnedLifeInsurance'] },
    { label: 'Other Assets', keys: ['OtherAssets'] },
    { label: 'Total Assets', keys: ['Assets'], isTotal: true },
    { label: '', isSpacer: true },
    { label: 'LIABILITIES', isHeader: true },
    { label: 'Non-Interest Bearing Deposits', keys: ['DepositsNoninterestBearing'] },
    { label: 'Interest-Bearing Deposits', keys: ['DepositsInterestBearing'] },
    { label: 'Total Deposits', keys: ['Deposits', 'DepositsDomestic'] },
    { label: 'Fed Funds Purchased & Repos', keys: ['FederalFundsPurchasedAndSecuritiesSoldUnderAgreementsToRepurchase'] },
    { label: 'Short-Term Borrowings', keys: ['ShortTermBorrowings'] },
    { label: 'Long-Term Debt', keys: ['LongTermDebt', 'LongTermDebtNoncurrent'] },
    { label: 'Subordinated Debt', keys: ['SubordinatedDebt'] },
    { label: 'Trading Liabilities', keys: ['TradingLiabilities'] },
    { label: 'Other Liabilities', keys: ['OtherLiabilities'] },
    { label: 'Total Liabilities', keys: ['Liabilities'], isTotal: true },
    { label: '', isSpacer: true },
    { label: 'SHAREHOLDERS\' EQUITY', isHeader: true },
    { label: 'Preferred Stock', keys: ['PreferredStockValue', 'PreferredStockValueOutstanding'] },
    { label: 'Common Stock', keys: ['CommonStockValue'] },
    { label: 'Additional Paid-In Capital', keys: ['AdditionalPaidInCapital', 'AdditionalPaidInCapitalCommonStock'] },
    { label: 'Retained Earnings', keys: ['RetainedEarningsAccumulatedDeficit'] },
    { label: 'AOCI', keys: ['AccumulatedOtherComprehensiveIncomeLossNetOfTax'] },
    { label: 'Treasury Stock', keys: ['TreasuryStockValue', 'TreasuryStockCommonValue'], isContra: true },
    { label: 'Total Stockholders\' Equity', keys: ['StockholdersEquity', 'StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest'], isTotal: true },
    { label: '', isSpacer: true },
    { label: 'Common Shares Outstanding', keys: ['CommonStockSharesOutstanding', 'EntityCommonStockSharesOutstanding'], isShares: true },
  ];

  // Helper to get value for a line item in a specific period
  const getValueForPeriod = (keys, periodKey) => {
    for (const key of keys) {
      const conceptData = dataSource[key];
      if (conceptData?.periods) {
        const periodData = conceptData.periods.find(p =>
          viewMode === 'quarterly'
            ? `${p.fp} ${p.fy}` === periodKey
            : `FY ${p.fy}` === periodKey
        );
        if (periodData?.value !== undefined) {
          return periodData.value;
        }
      }
    }
    return null;
  };

  // Check if a line item has any data across periods
  const hasData = (keys) => {
    return periods.some(p => getValueForPeriod(keys, p.key) !== null);
  };

  // Filter line items to only show those with data (keep headers and spacers)
  const visibleLineItems = lineItems.filter(item =>
    item.isHeader || item.isSpacer || hasData(item.keys)
  );

  // Fallback if no historical data
  if (!hasHistoricalData) {
    return (
      <div className="tab-balance-sheet">
        <div className="statement-header">
          <h3>Balance Sheet</h3>
          <div className="period-toggle">
            <button
              className={viewMode === 'quarterly' ? 'toggle-btn active' : 'toggle-btn'}
              onClick={() => setViewMode('quarterly')}
            >
              Quarterly
            </button>
            <button
              className={viewMode === 'annual' ? 'toggle-btn active' : 'toggle-btn'}
              onClick={() => setViewMode('annual')}
            >
              Annual
            </button>
          </div>
        </div>
        <div className="no-data">
          <p>Historical balance sheet data not available for this bank.</p>
          <p>Summary data from the latest filing:</p>
          <table className="financial-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Total Assets</td><td>{formatCurrency(bank.totalAssets)}</td></tr>
              <tr><td>Cash & Cash Equivalents</td><td>{formatCurrency(bank.cashAndCashEquivalents)}</td></tr>
              <tr><td>Loans & Leases</td><td>{formatCurrency(bank.loans)}</td></tr>
              <tr><td>Total Liabilities</td><td>{formatCurrency(bank.totalLiabilities)}</td></tr>
              <tr><td>Total Deposits</td><td>{formatCurrency(bank.totalDeposits)}</td></tr>
              <tr><td>Total Equity</td><td>{formatCurrency(bank.totalEquity)}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="tab-balance-sheet">
      <div className="statement-header">
        <h3>Consolidated Balance Sheet</h3>
        <div className="period-toggle">
          <button
            className={viewMode === 'quarterly' ? 'toggle-btn active' : 'toggle-btn'}
            onClick={() => setViewMode('quarterly')}
          >
            Quarterly
          </button>
          <button
            className={viewMode === 'annual' ? 'toggle-btn active' : 'toggle-btn'}
            onClick={() => setViewMode('annual')}
          >
            Annual
          </button>
        </div>
      </div>
      <p className="statement-note">
        {viewMode === 'quarterly' ? 'Most recent 5 quarters from 10-Q filings' : 'Most recent 4 years from 10-K filings'}
      </p>

      <div className="financial-table-wrapper">
        <table className="financial-table multi-period">
          <thead>
            <tr>
              <th className="label-col">Item</th>
              {periods.map(p => (
                <th key={p.key} className="value-col">{p.key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleLineItems.map((item, idx) => {
              if (item.isSpacer) {
                return <tr key={idx} className="spacer-row"><td colSpan={periods.length + 1}></td></tr>;
              }
              if (item.isHeader) {
                return (
                  <tr key={idx} className="header-row">
                    <td colSpan={periods.length + 1}><strong>{item.label}</strong></td>
                  </tr>
                );
              }
              return (
                <tr key={idx} className={item.isTotal ? 'total-row' : ''}>
                  <td className="label-col">{item.label}</td>
                  {periods.map(p => {
                    const value = getValueForPeriod(item.keys, p.key);
                    return (
                      <td key={p.key} className="value-col">
                        {item.isShares
                          ? (value !== null ? value.toLocaleString() : '-')
                          : (item.isContra && value !== null
                              ? `(${formatCurrency(Math.abs(value))})`
                              : formatCurrency(value))
                        }
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 * Income Statement Tab - Full income statement from SEC filings with multi-period view
 */
function IncomeStatementTab({ bank, rawData, formatCurrency, formatDate }) {
  const [viewMode, setViewMode] = useState('annual'); // 'quarterly' or 'annual'

  // Check if historical data is available
  const historicalData = rawData?.historicalIncomeStatement;
  const hasHistoricalData = historicalData &&
    ((viewMode === 'quarterly' && historicalData.periods?.quarterly?.length > 0) ||
     (viewMode === 'annual' && historicalData.periods?.annual?.length > 0));

  // Get periods for current view mode
  const periods = hasHistoricalData
    ? (viewMode === 'quarterly' ? historicalData.periods.quarterly : historicalData.periods.annual)
    : [];

  // Get data source for current view mode
  const dataSource = hasHistoricalData
    ? (viewMode === 'quarterly' ? historicalData.quarterly : historicalData.annual)
    : {};

  // Define line items in presentation order with their XBRL concept keys
  const lineItems = [
    { label: 'INTEREST INCOME', isHeader: true },
    { label: 'Interest and Fees on Loans', keys: ['InterestAndFeeIncomeLoansAndLeases'] },
    { label: 'Interest on Taxable Securities', keys: ['InterestIncomeSecuritiesTaxable'] },
    { label: 'Interest on Tax-Exempt Securities', keys: ['InterestIncomeSecuritiesTaxExempt'] },
    { label: 'Interest on Fed Funds Sold', keys: ['InterestIncomeFederalFundsSoldAndSecuritiesPurchasedUnderAgreementsToResell'] },
    { label: 'Interest on Deposits', keys: ['InterestIncomeDepositsWithFinancialInstitutions'] },
    { label: 'Total Interest Income', keys: ['InterestIncome', 'InterestAndDividendIncomeOperating'], isTotal: true },
    { label: '', isSpacer: true },
    { label: 'INTEREST EXPENSE', isHeader: true },
    { label: 'Interest on Deposits', keys: ['InterestExpenseDeposits'] },
    { label: 'Interest on Borrowings', keys: ['InterestExpenseBorrowings'] },
    { label: 'Interest on Long-Term Debt', keys: ['InterestExpenseLongTermDebt'] },
    { label: 'Interest on Short-Term Borrowings', keys: ['InterestExpenseShortTermBorrowings'] },
    { label: 'Total Interest Expense', keys: ['InterestExpense'], isTotal: true },
    { label: '', isSpacer: true },
    { label: 'Net Interest Income', keys: ['InterestIncomeExpenseNet', 'NetInterestIncome'], isTotal: true },
    { label: 'Provision for Credit Losses', keys: ['ProvisionForLoanLeaseAndOtherLosses', 'ProvisionForLoanAndLeaseLosses', 'ProvisionForCreditLosses', 'CreditLossExpense'] },
    { label: 'NII After Provision', keys: ['NetInterestIncomeAfterProvisionForCreditLosses'], isTotal: true },
    { label: '', isSpacer: true },
    { label: 'NON-INTEREST INCOME', isHeader: true },
    { label: 'Service Charges on Deposits', keys: ['FeesAndCommissionsDepositorAccounts'] },
    { label: 'Credit Card Fees', keys: ['FeesAndCommissionsCreditCards'] },
    { label: 'Mortgage Banking Fees', keys: ['FeesAndCommissionsMortgageBanking'] },
    { label: 'Investment Banking Fees', keys: ['InvestmentBankingAdvisoryBrokerageAndUnderwritingFeesAndCommissions'] },
    { label: 'Trading Revenue', keys: ['TradingGainsLosses'] },
    { label: 'Gain/Loss on Loan Sales', keys: ['GainLossOnSalesOfLoansNet'] },
    { label: 'Gain/Loss on Securities', keys: ['GainLossOnSecuritiesNet'] },
    { label: 'Insurance Revenue', keys: ['InsuranceCommissionsAndFees'] },
    { label: 'Other Non-Interest Income', keys: ['OtherNoninterestIncome'] },
    { label: 'Total Non-Interest Income', keys: ['NoninterestIncome'], isTotal: true },
    { label: '', isSpacer: true },
    { label: 'NON-INTEREST EXPENSE', isHeader: true },
    { label: 'Salaries and Benefits', keys: ['LaborAndRelatedExpense', 'SalariesAndWages'] },
    { label: 'Employee Benefits', keys: ['EmployeeBenefitsAndShareBasedCompensation'] },
    { label: 'Occupancy Expense', keys: ['OccupancyNet'] },
    { label: 'Equipment Expense', keys: ['EquipmentExpense'] },
    { label: 'Technology Expense', keys: ['CommunicationsAndInformationTechnology'] },
    { label: 'Professional Fees', keys: ['ProfessionalFees'] },
    { label: 'FDIC Insurance', keys: ['FederalDepositInsuranceCorporationPremiumExpense'] },
    { label: 'Depreciation & Amortization', keys: ['DepreciationAndAmortization'] },
    { label: 'Other Non-Interest Expense', keys: ['OtherNoninterestExpense'] },
    { label: 'Total Non-Interest Expense', keys: ['NoninterestExpense', 'OperatingExpenses'], isTotal: true },
    { label: '', isSpacer: true },
    { label: 'Income Before Taxes', keys: ['IncomeLossFromContinuingOperationsBeforeIncomeTaxesExtraordinaryItemsNoncontrollingInterest', 'IncomeLossFromContinuingOperationsBeforeIncomeTaxes'], isTotal: true },
    { label: 'Income Tax Expense', keys: ['IncomeTaxExpenseBenefit'] },
    { label: 'Net Income', keys: ['NetIncomeLoss', 'ProfitLoss'], isTotal: true },
    { label: 'NI - Noncontrolling Interest', keys: ['NetIncomeLossAttributableToNoncontrollingInterest'] },
    { label: 'NI Available to Common', keys: ['NetIncomeLossAvailableToCommonStockholdersBasic'], isTotal: true },
    { label: '', isSpacer: true },
    { label: 'PER SHARE DATA', isHeader: true },
    { label: 'Basic EPS', keys: ['EarningsPerShareBasic'], isPerShare: true },
    { label: 'Diluted EPS', keys: ['EarningsPerShareDiluted'], isPerShare: true },
    { label: 'Dividends Per Share', keys: ['CommonStockDividendsPerShareDeclared'], isPerShare: true },
  ];

  // Helper to get value for a line item in a specific period
  const getValueForPeriod = (keys, periodKey) => {
    for (const key of keys) {
      const conceptData = dataSource[key];
      if (conceptData?.periods) {
        const periodData = conceptData.periods.find(p =>
          viewMode === 'quarterly'
            ? `${p.fp} ${p.fy}` === periodKey
            : `FY ${p.fy}` === periodKey
        );
        if (periodData?.value !== undefined) {
          return periodData.value;
        }
      }
    }
    return null;
  };

  // Check if a line item has any data across periods
  const hasData = (keys) => {
    return periods.some(p => getValueForPeriod(keys, p.key) !== null);
  };

  // Filter line items to only show those with data (keep headers and spacers)
  const visibleLineItems = lineItems.filter(item =>
    item.isHeader || item.isSpacer || hasData(item.keys)
  );

  // Fallback if no historical data
  if (!hasHistoricalData) {
    return (
      <div className="tab-income-statement">
        <div className="statement-header">
          <h3>Income Statement</h3>
          <div className="period-toggle">
            <button
              className={viewMode === 'quarterly' ? 'toggle-btn active' : 'toggle-btn'}
              onClick={() => setViewMode('quarterly')}
            >
              Quarterly
            </button>
            <button
              className={viewMode === 'annual' ? 'toggle-btn active' : 'toggle-btn'}
              onClick={() => setViewMode('annual')}
            >
              Annual
            </button>
          </div>
        </div>
        <div className="no-data">
          <p>Historical income statement data not available for this bank.</p>
          <p>Summary TTM data from the latest filings:</p>
          <table className="financial-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>TTM Value</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Interest Income</td><td>{formatCurrency(bank.ttmInterestIncome)}</td></tr>
              <tr><td>Net Interest Income</td><td>{formatCurrency(bank.ttmNetInterestIncome)}</td></tr>
              <tr><td>Non-Interest Income</td><td>{formatCurrency(bank.ttmNoninterestIncome)}</td></tr>
              <tr><td>Non-Interest Expense</td><td>{formatCurrency(bank.ttmNoninterestExpense)}</td></tr>
              <tr><td>Provision for Credit Losses</td><td>{formatCurrency(bank.ttmProvisionForCreditLosses)}</td></tr>
              <tr><td>Net Income</td><td>{formatCurrency(bank.ttmNetIncome)}</td></tr>
              <tr><td>Earnings Per Share</td><td>{bank.ttmEps !== null ? '$' + bank.ttmEps.toFixed(2) : '-'}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="tab-income-statement">
      <div className="statement-header">
        <h3>Consolidated Income Statement</h3>
        <div className="period-toggle">
          <button
            className={viewMode === 'quarterly' ? 'toggle-btn active' : 'toggle-btn'}
            onClick={() => setViewMode('quarterly')}
          >
            Quarterly
          </button>
          <button
            className={viewMode === 'annual' ? 'toggle-btn active' : 'toggle-btn'}
            onClick={() => setViewMode('annual')}
          >
            Annual
          </button>
        </div>
      </div>
      <p className="statement-note">
        {viewMode === 'quarterly' ? 'Most recent 5 quarters from 10-Q filings' : 'Most recent 4 years from 10-K filings'}
      </p>

      <div className="financial-table-wrapper">
        <table className="financial-table multi-period">
          <thead>
            <tr>
              <th className="label-col">Item</th>
              {periods.map(p => (
                <th key={p.key} className="value-col">{p.key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleLineItems.map((item, idx) => {
              if (item.isSpacer) {
                return <tr key={idx} className="spacer-row"><td colSpan={periods.length + 1}></td></tr>;
              }
              if (item.isHeader) {
                return (
                  <tr key={idx} className="header-row">
                    <td colSpan={periods.length + 1}><strong>{item.label}</strong></td>
                  </tr>
                );
              }
              return (
                <tr key={idx} className={item.isTotal ? 'total-row' : ''}>
                  <td className="label-col">{item.label}</td>
                  {periods.map(p => {
                    const value = getValueForPeriod(item.keys, p.key);
                    return (
                      <td key={p.key} className="value-col">
                        {item.isPerShare
                          ? (value !== null ? '$' + value.toFixed(2) : '-')
                          : formatCurrency(value)
                        }
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BankDetail;

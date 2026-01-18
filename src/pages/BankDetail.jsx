import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { trackBankViewed, trackBankTabChanged } from '../analytics/events.js';

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
 * Balance Sheet Tab - Full balance sheet from SEC filings
 */
function BalanceSheetTab({ bank, rawData, formatCurrency, formatDate }) {
  if (!rawData?.balanceSheet) {
    return (
      <div className="tab-balance-sheet">
        <div className="no-data">
          <p>Detailed balance sheet data not available for this bank.</p>
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
              <tr><td>Preferred Stock</td><td>{formatCurrency(bank.preferredStock)}</td></tr>
              <tr><td>Shares Outstanding</td><td>{bank.sharesOutstanding?.toLocaleString() || '-'}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  const bs = rawData.balanceSheet;
  const asOfDate = bs.Assets?.period || bs.Assets?.ddate;

  // Balance sheet line items in presentation order
  const items = [
    { label: 'ASSETS', isHeader: true },
    { label: 'Cash and Cash Equivalents', key: 'CashAndCashEquivalents' },
    { label: 'Loans and Leases Receivable', key: 'LoansAndLeasesReceivable' },
    { label: 'Total Assets', key: 'Assets', isTotal: true },
    { label: '', isSpacer: true },
    { label: 'LIABILITIES', isHeader: true },
    { label: 'Deposits', key: 'Deposits' },
    { label: 'Total Liabilities', key: 'Liabilities', isTotal: true },
    { label: '', isSpacer: true },
    { label: 'SHAREHOLDERS\' EQUITY', isHeader: true },
    { label: 'Preferred Stock', key: 'PreferredStockValue' },
    { label: 'Total Stockholders\' Equity', key: 'StockholdersEquity', isTotal: true },
    { label: '', isSpacer: true },
    { label: 'Common Shares Outstanding', key: 'CommonStockSharesOutstanding', isShares: true },
  ];

  return (
    <div className="tab-balance-sheet">
      <div className="statement-header">
        <h3>Balance Sheet</h3>
        <p className="statement-date">As of {formatDate(asOfDate)}</p>
        <p className="statement-source">Source: SEC {bs.Assets?.form} Filing (Accession: {bs.Assets?.accn})</p>
      </div>

      <table className="financial-table">
        <thead>
          <tr>
            <th>Item</th>
            <th className="value-col">Value (USD)</th>
            <th className="date-col">Period</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => {
            if (item.isSpacer) {
              return <tr key={idx} className="spacer-row"><td colSpan="3"></td></tr>;
            }
            if (item.isHeader) {
              return (
                <tr key={idx} className="header-row">
                  <td colSpan="3"><strong>{item.label}</strong></td>
                </tr>
              );
            }
            const data = bs[item.key];
            const value = data?.value;
            const period = data?.period || data?.ddate;
            return (
              <tr key={idx} className={item.isTotal ? 'total-row' : ''}>
                <td>{item.label}</td>
                <td className="value-col">
                  {item.isShares
                    ? (value?.toLocaleString() || '-')
                    : formatCurrency(value)
                  }
                </td>
                <td className="date-col">{formatDate(period)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Income Statement Tab - Full income statement from SEC filings
 */
function IncomeStatementTab({ bank, rawData, formatCurrency, formatDate }) {
  if (!rawData?.incomeStatement) {
    return (
      <div className="tab-income-statement">
        <div className="no-data">
          <p>Detailed income statement data not available for this bank.</p>
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
              <tr><td>Pre-Tax Income</td><td>{formatCurrency(bank.ttmPreTaxIncome)}</td></tr>
              <tr><td>Net Income</td><td>{formatCurrency(bank.ttmNetIncome)}</td></tr>
              <tr><td>Earnings Per Share</td><td>{bank.ttmEps !== null ? '$' + bank.ttmEps.toFixed(2) : '-'}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  const is = rawData.incomeStatement;

  // Income statement line items
  const items = [
    { label: 'INTEREST INCOME & EXPENSE', isHeader: true },
    { label: 'Interest Income', key: 'InterestIncome' },
    { label: 'Interest Expense', key: 'InterestExpense' },
    { label: 'Net Interest Income', key: 'NetInterestIncome', isTotal: true },
    { label: '', isSpacer: true },
    { label: 'NON-INTEREST INCOME & EXPENSE', isHeader: true },
    { label: 'Non-Interest Income', key: 'NoninterestIncome' },
    { label: 'Non-Interest Expense', key: 'NoninterestExpense' },
    { label: '', isSpacer: true },
    { label: 'PROVISIONS & NET INCOME', isHeader: true },
    { label: 'Provision for Credit Losses', key: 'ProvisionForCreditLosses' },
    { label: 'Pre-Tax Income', key: 'PreTaxIncome' },
    { label: 'Net Income', key: 'NetIncomeLoss', isTotal: true },
    { label: '', isSpacer: true },
    { label: 'PER SHARE DATA', isHeader: true },
    { label: 'Earnings Per Share (Basic)', key: 'EarningsPerShareBasic', isPerShare: true },
    { label: 'Dividends Per Share', key: 'DividendsPerShare', isPerShare: true },
  ];

  // Find the reference date from any available item
  const refItem = is.NetIncomeLoss || is.InterestIncome || is.NoninterestIncome;
  const periodEnd = refItem?.date || refItem?.period;
  const method = refItem?.method || 'TTM';

  return (
    <div className="tab-income-statement">
      <div className="statement-header">
        <h3>Income Statement (Trailing Twelve Months)</h3>
        <p className="statement-date">Period ending {formatDate(periodEnd)}</p>
        <p className="statement-source">Calculation method: {method}</p>
      </div>

      <table className="financial-table">
        <thead>
          <tr>
            <th>Item</th>
            <th className="value-col">TTM Value (USD)</th>
            <th className="method-col">Source</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => {
            if (item.isSpacer) {
              return <tr key={idx} className="spacer-row"><td colSpan="3"></td></tr>;
            }
            if (item.isHeader) {
              return (
                <tr key={idx} className="header-row">
                  <td colSpan="3"><strong>{item.label}</strong></td>
                </tr>
              );
            }
            const data = is[item.key];
            const value = data?.value;
            const source = data?.method || data?.form || '-';
            return (
              <tr key={idx} className={item.isTotal ? 'total-row' : ''}>
                <td>{item.label}</td>
                <td className="value-col">
                  {item.isPerShare
                    ? (value !== null && value !== undefined ? '$' + value.toFixed(2) : '-')
                    : formatCurrency(value)
                  }
                </td>
                <td className="method-col">{source}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Quarterly Breakdown if available */}
      {is.NetIncomeLoss?.details && is.NetIncomeLoss.details.length > 0 && (
        <div className="quarterly-breakdown">
          <h4>Quarterly Net Income Breakdown</h4>
          <table className="financial-table quarterly-table">
            <thead>
              <tr>
                <th>Period</th>
                <th>Form</th>
                <th className="value-col">Net Income</th>
              </tr>
            </thead>
            <tbody>
              {is.NetIncomeLoss.details.map((q, idx) => (
                <tr key={idx}>
                  <td>{q.fp} {q.fy}</td>
                  <td>{q.form}{q.derived ? ' (derived)' : ''}</td>
                  <td className="value-col">{formatCurrency(q.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default BankDetail;

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
 * Supports two data formats:
 * 1. "As Reported" format (from pre.txt): items[] array with exact presentation order
 * 2. Legacy format: concept-keyed object with nested periods
 */
function BalanceSheetTab({ bank, rawData, formatCurrency, formatDate }) {
  const [viewMode, setViewMode] = useState('annual'); // 'quarterly' or 'annual'

  // Check if historical data is available
  const historicalData = rawData?.historicalBalanceSheet;

  // Detect format type: "as reported" format has items[] array per period
  const dataSource = viewMode === 'quarterly'
    ? historicalData?.quarterly
    : historicalData?.annual;

  const isAsReportedFormat = Array.isArray(dataSource) && dataSource.length > 0 && dataSource[0]?.items;

  const hasHistoricalData = historicalData && (
    isAsReportedFormat
      ? dataSource.length > 0
      : (historicalData.periods?.[viewMode === 'quarterly' ? 'quarterly' : 'annual']?.length > 0)
  );

  // Get periods for display
  const periods = hasHistoricalData
    ? (isAsReportedFormat
        ? dataSource.map(d => ({ key: d.period, label: d.label || d.period, form: d.form, isDerived: d.isDerived }))
        : (viewMode === 'quarterly' ? historicalData.periods.quarterly : historicalData.periods.annual))
    : [];

  // For "as reported" format: get canonical items (unified structure based on most recent filing)
  const getCanonicalItems = () => {
    if (!isAsReportedFormat) return [];
    // Use canonicalItems if available (new format with aligned presentation)
    const canonical = viewMode === 'quarterly'
      ? historicalData?.canonicalItems?.quarterly
      : historicalData?.canonicalItems?.annual;
    if (canonical && canonical.length > 0) {
      return canonical;
    }
    // Fallback to first period's items for backward compatibility
    if (dataSource.length > 0 && dataSource[0]?.items) {
      return dataSource[0].items.map(item => ({
        tag: item.tag, label: item.label, line: item.line, indent: item.indent,
      }));
    }
    return [];
  };

  // For "as reported" format: get value for a specific period (index-aligned for performance)
  const getAsReportedValue = (tag, periodKey, itemIndex) => {
    const periodData = dataSource.find(d => d.period === periodKey);
    if (!periodData || !periodData.items) return null;
    // Use index-aligned access (items are now aligned to canonical order)
    if (itemIndex !== undefined && periodData.items[itemIndex]?.tag === tag) {
      return periodData.items[itemIndex]?.value ?? null;
    }
    // Fallback to tag search
    const item = periodData.items.find(i => i.tag === tag);
    return item?.value ?? null;
  };

  // For legacy format: get value for a concept in a specific period
  const getLegacyValue = (concept, periodKey) => {
    const conceptData = dataSource?.[concept];
    if (conceptData?.periods) {
      const periodData = conceptData.periods.find(p =>
        viewMode === 'quarterly'
          ? `${p.fp} ${p.fy}` === periodKey
          : `FY ${p.fy}` === periodKey
      );
      return periodData?.value ?? null;
    }
    return null;
  };

  // For legacy format: organize concepts by category
  const organizeLegacyByCategory = () => {
    const categories = {
      assets: { label: 'ASSETS', items: [] },
      liabilities: { label: 'LIABILITIES', items: [] },
      equity: { label: 'SHAREHOLDERS\' EQUITY', items: [] },
      other: { label: 'OTHER', items: [] }
    };

    const assetKeywords = ['Asset', 'Cash', 'Loan', 'Receivable', 'Securities', 'Investment', 'Property', 'Goodwill', 'Intangible', 'Deferred Tax Asset', 'Insurance'];
    const liabilityKeywords = ['Liabilit', 'Deposit', 'Borrowing', 'Debt', 'Payable', 'Accrued', 'Trading Liabilit', 'Deferred Tax Liabilit'];
    const equityKeywords = ['Equity', 'Stock', 'Capital', 'Retained', 'Treasury', 'Comprehensive', 'Minority', 'Noncontrolling'];

    for (const [concept, data] of Object.entries(dataSource || {})) {
      const label = data.label || concept;
      const isTotal = label.toLowerCase().includes('total') || concept === 'Assets' || concept === 'Liabilities' || concept.includes('StockholdersEquity');
      const isShares = concept.toLowerCase().includes('shares');

      let category = 'other';
      if (assetKeywords.some(kw => concept.includes(kw) || label.includes(kw))) category = 'assets';
      else if (liabilityKeywords.some(kw => concept.includes(kw) || label.includes(kw))) category = 'liabilities';
      else if (equityKeywords.some(kw => concept.includes(kw) || label.includes(kw))) category = 'equity';

      categories[category].items.push({ concept, label, isTotal, isShares });
    }

    for (const cat of Object.values(categories)) {
      cat.items.sort((a, b) => {
        if (a.isTotal && !b.isTotal) return 1;
        if (!a.isTotal && b.isTotal) return -1;
        return a.label.localeCompare(b.label);
      });
    }

    return categories;
  };

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

  // Render "As Reported" format - preserves exact presentation order from SEC filings
  if (isAsReportedFormat) {
    const items = getCanonicalItems();
    const totalLineItems = items.length;

    return (
      <div className="tab-balance-sheet">
        <div className="statement-header">
          <h3>Consolidated Balance Sheet</h3>
          <span className="as-reported-badge">As Reported</span>
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
          {viewMode === 'quarterly' ? 'Quarters from Q1 2023 onward (Q4 from 10-K year-end)' : 'Annual results from 10-K filings (FY 2022 onward)'}
          {' • '}{totalLineItems} line items • Presentation order from most recent SEC filing
        </p>

        <div className="financial-table-wrapper">
          <table className="financial-table multi-period as-reported">
            <thead>
              <tr>
                <th className="label-col">Item</th>
                {periods.map(p => (
                  <th key={p.key} className="value-col">{p.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => {
                const isTotal = item.label.toLowerCase().includes('total') ||
                               item.tag === 'Assets' || item.tag === 'Liabilities' ||
                               item.tag.includes('StockholdersEquity') ||
                               item.tag === 'LiabilitiesAndStockholdersEquity';
                const isShares = item.tag.toLowerCase().includes('shares');
                const indentClass = item.indent > 0 ? `indent-${Math.min(item.indent, 3)}` : '';

                return (
                  <tr key={`${item.tag}-${idx}`} className={`${isTotal ? 'total-row' : ''} ${indentClass}`}>
                    <td className="label-col">
                      {item.indent > 0 && <span className="indent-marker" style={{ paddingLeft: `${item.indent * 12}px` }} />}
                      {item.label}
                    </td>
                    {periods.map(p => {
                      const value = getAsReportedValue(item.tag, p.key, idx);
                      return (
                        <td key={p.key} className="value-col">
                          {isShares
                            ? (value !== null ? value.toLocaleString() : '-')
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

  // Render legacy format - organized by category
  const categories = organizeLegacyByCategory();

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
        {viewMode === 'quarterly' ? 'Quarters from Q1 2023 onward' : 'Annual results from FY 2022 onward'}
        {' • '}{Object.keys(dataSource || {}).length} line items
      </p>

      <div className="financial-table-wrapper">
        <table className="financial-table multi-period">
          <thead>
            <tr>
              <th className="label-col">Item</th>
              {periods.map(p => (
                <th key={p.key} className="value-col">{p.label || p.key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {['assets', 'liabilities', 'equity', 'other'].map(catKey => {
              const cat = categories[catKey];
              if (!cat || cat.items.length === 0) return null;
              return (
                <React.Fragment key={catKey}>
                  <tr className="header-row">
                    <td colSpan={periods.length + 1}><strong>{cat.label}</strong></td>
                  </tr>
                  {cat.items.map((item, idx) => (
                    <tr key={`${catKey}-${idx}`} className={item.isTotal ? 'total-row' : ''}>
                      <td className="label-col">{item.label}</td>
                      {periods.map(p => {
                        const value = getLegacyValue(item.concept, p.key);
                        return (
                          <td key={p.key} className="value-col">
                            {item.isShares
                              ? (value !== null ? value.toLocaleString() : '-')
                              : formatCurrency(value)
                            }
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  <tr className="spacer-row"><td colSpan={periods.length + 1}></td></tr>
                </React.Fragment>
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
 * Supports two data formats:
 * 1. "As Reported" format (from pre.txt): items[] array with exact presentation order
 * 2. Legacy format: concept-keyed object with nested periods
 */
function IncomeStatementTab({ bank, rawData, formatCurrency, formatDate }) {
  const [viewMode, setViewMode] = useState('annual'); // 'quarterly' or 'annual'

  const historicalData = rawData?.historicalIncomeStatement;
  const dataSource = viewMode === 'quarterly'
    ? historicalData?.quarterly
    : historicalData?.annual;

  const isAsReportedFormat = Array.isArray(dataSource) && dataSource.length > 0 && dataSource[0]?.items;

  const hasHistoricalData = historicalData && (
    isAsReportedFormat
      ? dataSource.length > 0
      : (historicalData.periods?.[viewMode === 'quarterly' ? 'quarterly' : 'annual']?.length > 0)
  );

  const periods = hasHistoricalData
    ? (isAsReportedFormat
        ? dataSource.map(d => ({ key: d.period, label: d.label || d.period, form: d.form, isDerived: d.isDerived }))
        : (viewMode === 'quarterly' ? historicalData.periods.quarterly : historicalData.periods.annual))
    : [];

  const getCanonicalItems = () => {
    if (!isAsReportedFormat) return [];
    const canonical = viewMode === 'quarterly'
      ? historicalData?.canonicalItems?.quarterly
      : historicalData?.canonicalItems?.annual;
    if (canonical && canonical.length > 0) return canonical;
    if (dataSource.length > 0 && dataSource[0]?.items) {
      return dataSource[0].items.map(item => ({
        tag: item.tag, label: item.label, line: item.line, indent: item.indent,
      }));
    }
    return [];
  };

  const getAsReportedValue = (tag, periodKey, itemIndex) => {
    const periodData = dataSource.find(d => d.period === periodKey);
    if (!periodData || !periodData.items) return { value: null, derivedUnavailable: false };
    let item;
    if (itemIndex !== undefined && periodData.items[itemIndex]?.tag === tag) {
      item = periodData.items[itemIndex];
    } else {
      item = periodData.items.find(i => i.tag === tag);
    }
    return {
      value: item?.value ?? null,
      derivedUnavailable: item?.derivedUnavailable || false,
    };
  };

  const getLegacyValue = (concept, periodKey) => {
    const conceptData = dataSource?.[concept];
    if (conceptData?.periods) {
      const periodData = conceptData.periods.find(p =>
        viewMode === 'quarterly' ? `${p.fp} ${p.fy}` === periodKey : `FY ${p.fy}` === periodKey
      );
      return periodData?.value ?? null;
    }
    return null;
  };

  const organizeLegacyByCategory = () => {
    const categories = {
      interestIncome: { label: 'INTEREST INCOME', items: [] },
      interestExpense: { label: 'INTEREST EXPENSE', items: [] },
      netInterest: { label: 'NET INTEREST INCOME', items: [] },
      provision: { label: 'PROVISION FOR CREDIT LOSSES', items: [] },
      noninterestIncome: { label: 'NON-INTEREST INCOME', items: [] },
      noninterestExpense: { label: 'NON-INTEREST EXPENSE', items: [] },
      incomeAndTax: { label: 'INCOME & TAXES', items: [] },
      perShare: { label: 'PER SHARE DATA', items: [] },
      other: { label: 'OTHER', items: [] }
    };

    for (const [concept, data] of Object.entries(dataSource || {})) {
      const label = data.label || concept;
      const isTotal = label.toLowerCase().includes('total') || label.toLowerCase().includes('net income') || concept.includes('NetIncome');
      const isPerShare = concept.toLowerCase().includes('pershare') || concept.toLowerCase().includes('earnings per');

      let category = 'other';
      if (concept.includes('InterestIncome') && !concept.includes('Expense') && !concept.includes('Net')) category = 'interestIncome';
      else if (concept.includes('InterestExpense')) category = 'interestExpense';
      else if (concept.includes('NetInterestIncome') || concept.includes('InterestIncomeExpenseNet')) category = 'netInterest';
      else if (concept.includes('Provision') || concept.includes('CreditLoss')) category = 'provision';
      else if (concept.includes('NoninterestIncome') || concept.includes('Fees') || concept.includes('Trading') || concept.includes('GainLoss')) category = 'noninterestIncome';
      else if (concept.includes('NoninterestExpense') || concept.includes('Salary') || concept.includes('Labor') || concept.includes('Occupancy') || concept.includes('Operating')) category = 'noninterestExpense';
      else if (concept.includes('Income') || concept.includes('Tax') || concept.includes('Profit') || concept.includes('Loss')) category = 'incomeAndTax';
      else if (isPerShare || concept.includes('Dividend')) category = 'perShare';

      categories[category].items.push({ concept, label, isTotal, isPerShare });
    }

    for (const cat of Object.values(categories)) {
      cat.items.sort((a, b) => {
        if (a.isTotal && !b.isTotal) return 1;
        if (!a.isTotal && b.isTotal) return -1;
        return a.label.localeCompare(b.label);
      });
    }
    return categories;
  };

  // Fallback if no historical data
  if (!hasHistoricalData) {
    return (
      <div className="tab-income-statement">
        <div className="statement-header">
          <h3>Income Statement</h3>
          <div className="period-toggle">
            <button className={viewMode === 'quarterly' ? 'toggle-btn active' : 'toggle-btn'} onClick={() => setViewMode('quarterly')}>Quarterly</button>
            <button className={viewMode === 'annual' ? 'toggle-btn active' : 'toggle-btn'} onClick={() => setViewMode('annual')}>Annual</button>
          </div>
        </div>
        <div className="no-data">
          <p>Historical income statement data not available for this bank.</p>
          <p>Summary TTM data from the latest filings:</p>
          <table className="financial-table">
            <thead><tr><th>Item</th><th>TTM Value</th></tr></thead>
            <tbody>
              <tr><td>Interest Income</td><td>{formatCurrency(bank.ttmInterestIncome)}</td></tr>
              <tr><td>Net Interest Income</td><td>{formatCurrency(bank.ttmNetInterestIncome)}</td></tr>
              <tr><td>Non-Interest Income</td><td>{formatCurrency(bank.ttmNoninterestIncome)}</td></tr>
              <tr><td>Non-Interest Expense</td><td>{formatCurrency(bank.ttmNoninterestExpense)}</td></tr>
              <tr><td>Net Income</td><td>{formatCurrency(bank.ttmNetIncome)}</td></tr>
              <tr><td>Earnings Per Share</td><td>{bank.ttmEps !== null ? '$' + bank.ttmEps.toFixed(2) : '-'}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Render "As Reported" format
  if (isAsReportedFormat) {
    const items = getCanonicalItems();
    return (
      <div className="tab-income-statement">
        <div className="statement-header">
          <h3>Consolidated Income Statement</h3>
          <span className="as-reported-badge">As Reported</span>
          <div className="period-toggle">
            <button className={viewMode === 'quarterly' ? 'toggle-btn active' : 'toggle-btn'} onClick={() => setViewMode('quarterly')}>Quarterly</button>
            <button className={viewMode === 'annual' ? 'toggle-btn active' : 'toggle-btn'} onClick={() => setViewMode('annual')}>Annual</button>
          </div>
        </div>
        <p className="statement-note">
          {viewMode === 'quarterly' ? 'Quarters from Q1 2023 onward (Q4 derived from annual minus Q1-Q3)' : 'Annual results from 10-K filings (FY 2022 onward)'}
          {' • '}{items.length} line items • Presentation order from most recent SEC filing
        </p>
        <div className="financial-table-wrapper">
          <table className="financial-table multi-period as-reported">
            <thead><tr><th className="label-col">Item</th>{periods.map(p => <th key={p.key} className="value-col">{p.label}</th>)}</tr></thead>
            <tbody>
              {items.map((item, idx) => {
                const isTotal = item.label.toLowerCase().includes('total') || item.label.toLowerCase().includes('net income') || item.tag.includes('NetIncome');
                const isPerShare = item.tag.toLowerCase().includes('pershare') || item.tag.includes('Earnings');
                return (
                  <tr key={`${item.tag}-${idx}`} className={isTotal ? 'total-row' : ''}>
                    <td className="label-col">{item.indent > 0 && <span style={{ paddingLeft: `${item.indent * 12}px` }} />}{item.label}</td>
                    {periods.map(p => {
                      const { value, derivedUnavailable } = getAsReportedValue(item.tag, p.key, idx);
                      if (derivedUnavailable) {
                        return (
                          <td key={p.key} className="value-col" title="Derived value not available - missing prior quarter data">
                            <span className="derived-unavailable">-</span>
                          </td>
                        );
                      }
                      return <td key={p.key} className="value-col">{isPerShare ? (value !== null ? '$' + value.toFixed(2) : '-') : formatCurrency(value)}</td>;
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

  // Render legacy format
  const categories = organizeLegacyByCategory();
  const categoryOrder = ['interestIncome', 'interestExpense', 'netInterest', 'provision', 'noninterestIncome', 'noninterestExpense', 'incomeAndTax', 'perShare', 'other'];

  return (
    <div className="tab-income-statement">
      <div className="statement-header">
        <h3>Consolidated Income Statement</h3>
        <div className="period-toggle">
          <button className={viewMode === 'quarterly' ? 'toggle-btn active' : 'toggle-btn'} onClick={() => setViewMode('quarterly')}>Quarterly</button>
          <button className={viewMode === 'annual' ? 'toggle-btn active' : 'toggle-btn'} onClick={() => setViewMode('annual')}>Annual</button>
        </div>
      </div>
      <p className="statement-note">{viewMode === 'quarterly' ? 'Quarters from Q1 2023 onward' : 'Annual results from FY 2022 onward'}{' • '}{Object.keys(dataSource || {}).length} line items</p>
      <div className="financial-table-wrapper">
        <table className="financial-table multi-period">
          <thead><tr><th className="label-col">Item</th>{periods.map(p => <th key={p.key} className="value-col">{p.label || p.key}</th>)}</tr></thead>
          <tbody>
            {categoryOrder.map(catKey => {
              const cat = categories[catKey];
              if (!cat || cat.items.length === 0) return null;
              return (
                <React.Fragment key={catKey}>
                  <tr className="header-row"><td colSpan={periods.length + 1}><strong>{cat.label}</strong></td></tr>
                  {cat.items.map((item, idx) => (
                    <tr key={`${catKey}-${idx}`} className={item.isTotal ? 'total-row' : ''}>
                      <td className="label-col">{item.label}</td>
                      {periods.map(p => {
                        const value = getLegacyValue(item.concept, p.key);
                        return <td key={p.key} className="value-col">{item.isPerShare ? (value !== null ? '$' + value.toFixed(2) : '-') : formatCurrency(value)}</td>;
                      })}
                    </tr>
                  ))}
                  <tr className="spacer-row"><td colSpan={periods.length + 1}></td></tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BankDetail;

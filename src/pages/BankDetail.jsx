import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { trackBankViewed, trackBankTabChanged } from '../analytics/events.js';
import { fetchBankRawData, fetchBankList } from '../data/sheets.js';
import bankKeywords from '../../public/data/bank-keywords.json';
import BackButton from '../components/BackButton.jsx';
import FinancialStatementTable from '../components/FinancialStatementTable.jsx';
import SEO from '../components/SEO.jsx';

/**
 * Classify a security ticker by type based on naming conventions.
 * NYSE/NASDAQ preferred shares use -P suffix (e.g., BAC-PB, BML-PG).
 * Warrants use -WT or -WS. Rights use -RT. Units use -UN.
 */
function classifySecurityType(ticker) {
  if (!ticker) return 'Other';
  if (/-P[A-Z]?$/.test(ticker)) return 'Preferred';
  if (/-W[TS]?$/.test(ticker)) return 'Warrant';
  if (/-R[T]?$/.test(ticker)) return 'Rights';
  if (/-U[N]?$/.test(ticker)) return 'Unit';
  return 'Other';
}

/**
 * Bank Detail Page
 * Shows comprehensive information about a single bank with tabs
 */
function BankDetail({ banks = [], loading = false }) {
  const { ticker } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';

  // State for on-demand raw data loading
  const [bankRawData, setBankRawData] = useState(null);
  const [rawDataLoading, setRawDataLoading] = useState(false);
  const [associatedTickers, setAssociatedTickers] = useState([]);

  // Find the bank by ticker, with CIK fallback for backward-compatible URLs
  const bank = useMemo(() => {
    // Primary lookup: by ticker symbol (e.g., /bank/JPM)
    const byTicker = banks.find(b => b.ticker?.toUpperCase() === ticker?.toUpperCase());
    if (byTicker) return byTicker;
    // Fallback: by CIK number (e.g., /bank/19617 from old URLs)
    return banks.find(b => {
      const cik = b.cik?.replace(/^0+/, '');
      return cik === ticker;
    });
  }, [banks, ticker]);

  // Fetch raw data for this bank on-demand
  useEffect(() => {
    if (!bank?.cik) {
      setBankRawData(null);
      return;
    }

    const loadBankRawData = async () => {
      setRawDataLoading(true);
      try {
        const result = await fetchBankRawData(bank.cik);
        if (result.success && result.data) {
          setBankRawData(result.data.rawData || null);
        } else {
          setBankRawData(null);
        }
      } catch (err) {
        console.warn('Error loading bank raw data:', err);
        setBankRawData(null);
      } finally {
        setRawDataLoading(false);
      }
    };

    loadBankRawData();
  }, [bank?.cik]);

  // Fetch associated tickers from bank-list.json
  useEffect(() => {
    if (!bank?.cik) {
      setAssociatedTickers([]);
      return;
    }

    fetchBankList().then(bankList => {
      if (!bankList) return;
      const paddedCik = bank.cik.toString().padStart(10, '0');
      const associated = bankList
        .filter(b => b.cik === paddedCik && b.ticker !== bank.ticker)
        .map(b => ({
          ticker: b.ticker,
          type: classifySecurityType(b.ticker),
          exchange: b.exchange !== 'N/A' ? b.exchange : null,
        }))
        .sort((a, b) => a.ticker.localeCompare(b.ticker));
      setAssociatedTickers(associated);
    });
  }, [bank?.cik, bank?.ticker]);

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
    // Always show in millions for consistency and easy comparison
    const inMillions = num / 1e6;
    const absMillions = Math.abs(inMillions);

    if (absMillions >= 1000) {
      // Billions range: show with comma separator (e.g., $4,200.5M)
      return '$' + inMillions.toLocaleString(undefined, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
      }) + 'M';
    } else if (absMillions >= 1) {
      // Millions range: show with 1 decimal (e.g., $345.6M)
      return '$' + inMillions.toFixed(1) + 'M';
    } else if (absMillions >= 0.01) {
      // Sub-million but significant: show with 2 decimals (e.g., $0.45M)
      return '$' + inMillions.toFixed(2) + 'M';
    } else if (Math.abs(num) >= 1) {
      // Very small: show actual value
      return '$' + num.toLocaleString(undefined, { maximumFractionDigits: 0 });
    }
    return '$0';
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
      <div className="page bank-detail-page not-found-page">
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

  const bankTicker = bank.ticker ? ` (${bank.ticker})` : '';
  const metricsSnippet = [
    bank.roe != null ? `ROE: ${bank.roe.toFixed(2)}%` : null,
    bank.roaa != null ? `ROAA: ${bank.roaa.toFixed(2)}%` : null,
    bank.efficiencyRatio != null ? `Efficiency: ${bank.efficiencyRatio.toFixed(1)}%` : null,
  ].filter(Boolean).join(', ');
  const descHint = bankKeywords[bank.ticker]?.descriptionHint;
  const aliasFragment = descHint ? `, ${descHint},` : '';

  return (
    <div className="page bank-detail-page">
      <SEO
        title={`${bank.bankName}${bankTicker} - Bank Analysis`}
        description={`Financial analysis and metrics for ${bank.bankName}${bankTicker}${aliasFragment}.${metricsSnippet ? ` ${metricsSnippet}.` : ''} View comprehensive SEC filing data and Graham Number valuation.`}
        canonical={`/bank/${bank.ticker || ticker}`}
        image="https://banksift.org/og-bank.png"
        type="article"
      />
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
          <OverviewTab bank={bank} associatedTickers={associatedTickers} formatCurrency={formatCurrency} formatPercent={formatPercent} formatNumber={formatNumber} />
        )}
        {activeTab === 'ratios' && (
          <RatiosTab bank={bank} formatCurrency={formatCurrency} formatPercent={formatPercent} formatNumber={formatNumber} />
        )}
        {activeTab === 'balance-sheet' && (
          <BalanceSheetTab bank={bank} rawData={bankRawData} rawDataLoading={rawDataLoading} formatCurrency={formatCurrency} formatDate={formatDate} />
        )}
        {activeTab === 'income-statement' && (
          <IncomeStatementTab bank={bank} rawData={bankRawData} rawDataLoading={rawDataLoading} formatCurrency={formatCurrency} formatDate={formatDate} />
        )}
      </div>
    </div>
  );
}

/**
 * Overview Tab - Filer info and key metrics
 */
function OverviewTab({ bank, associatedTickers = [], formatCurrency, formatPercent, formatNumber }) {
  // Group associated tickers by type
  const tickersByType = useMemo(() => {
    const groups = {};
    for (const t of associatedTickers) {
      if (!groups[t.type]) groups[t.type] = [];
      groups[t.type].push(t);
    }
    return groups;
  }, [associatedTickers]);

  const typeLabels = {
    Preferred: 'Preferred Stock',
    Warrant: 'Warrants',
    Rights: 'Rights',
    Unit: 'Units',
    Other: 'Other Securities',
  };
  const typeOrder = ['Preferred', 'Warrant', 'Rights', 'Unit', 'Other'];

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
            {bankKeywords[bank.ticker]?.alternateNames?.length > 0 && (
              <>
                <dt>Also Known As</dt>
                <dd>{bankKeywords[bank.ticker].alternateNames.join(', ')}</dd>
              </>
            )}
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
            <dd>{bank.ttmEps != null ? '$' + bank.ttmEps.toFixed(2) : '-'}</dd>
            <dt>Dividend Per Share</dt>
            <dd>{bank.ttmDividendPerShare != null ? '$' + bank.ttmDividendPerShare.toFixed(2) : '-'}</dd>
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
            <dd>{bank.bvps != null ? '$' + bank.bvps.toFixed(2) : '-'}</dd>
          </dl>
        </div>
      </div>

      {/* Associated Securities */}
      {associatedTickers.length > 0 && (
        <div className="info-card associated-securities">
          <h3>Associated Securities</h3>
          <p className="associated-securities-note">
            Other securities filed under the same SEC entity (CIK {bank.cik}).
          </p>
          {typeOrder.filter(type => tickersByType[type]).map(type => (
            <div key={type} className="securities-group">
              <span className="securities-group-label">
                {typeLabels[type]} ({tickersByType[type].length})
              </span>
              <div className="securities-tags">
                {tickersByType[type].map(t => (
                  <span key={t.ticker} className="security-tag">
                    {t.ticker}
                    {t.exchange && <span className="security-tag-exchange">{t.exchange}</span>}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
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
            <dd>{bank.bvps != null ? '$' + bank.bvps.toFixed(2) : '-'}</dd>
            <dt>
              Price to Net Income (P/E)
              <Link to="/metrics/price-to-earnings" className="info-link">?</Link>
            </dt>
            <dd>{bank.pni !== null ? bank.pni.toFixed(2) + 'x' : '-'}</dd>
            <dt>
              Graham Number
              <Link to="/valuation/graham-number" className="info-link">?</Link>
            </dt>
            <dd>{bank.grahamNum != null ? '$' + bank.grahamNum.toFixed(2) : '-'}</dd>
          </dl>
        </div>

        {/* Per Share */}
        <div className="info-card">
          <h3>Per Share Data</h3>
          <dl className="info-list">
            <dt>Earnings Per Share (TTM)</dt>
            <dd>{bank.ttmEps != null ? '$' + bank.ttmEps.toFixed(2) : '-'}</dd>
            <dt>Dividend Per Share (TTM)</dt>
            <dd>{bank.ttmDividendPerShare != null ? '$' + bank.ttmDividendPerShare.toFixed(2) : '-'}</dd>
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
 * Uses "As Reported" format (from pre.txt): items[] array with exact presentation order
 */
function BalanceSheetTab({ bank, rawData, rawDataLoading, formatCurrency, formatDate }) {
  const [viewMode, setViewMode] = useState('quarterly');
  const [expanded, setExpanded] = useState(false);
  const DEFAULT_QUARTERS_SHOWN = 5;

  // Show loading state while fetching raw data
  if (rawDataLoading) {
    return (
      <div className="tab-balance-sheet">
        <div className="loading-state">
          <div className="loading-spinner" />
          <p>Loading balance sheet data...</p>
        </div>
      </div>
    );
  }

  const historicalData = rawData?.historicalBalanceSheet;
  const dataSource = viewMode === 'quarterly'
    ? historicalData?.quarterly
    : historicalData?.annual;

  const isAsReportedFormat = Array.isArray(dataSource) && dataSource.length > 0 && dataSource[0]?.items;
  const hasHistoricalData = isAsReportedFormat && dataSource.length > 0;

  // Get all periods
  const allPeriods = hasHistoricalData
    ? dataSource.map(d => ({ key: d.period, label: d.label || d.period, form: d.form, isDerived: d.isDerived }))
    : [];

  // For quarterly view: limit to 5 periods unless expanded
  const periods = (viewMode === 'quarterly' && !expanded && allPeriods.length > DEFAULT_QUARTERS_SHOWN)
    ? allPeriods.slice(0, DEFAULT_QUARTERS_SHOWN)
    : allPeriods;

  const hasMoreQuarters = viewMode === 'quarterly' && allPeriods.length > DEFAULT_QUARTERS_SHOWN;

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    setExpanded(false);
  };

  // Get canonical items for the current view mode
  const items = useMemo(() => {
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
  }, [isAsReportedFormat, viewMode, historicalData, dataSource]);

  // Get value for a specific item and period
  const getValue = useCallback((tag, periodKey, itemIndex) => {
    const periodData = dataSource.find(d => d.period === periodKey);
    if (!periodData || !periodData.items) return null;
    if (itemIndex !== undefined && periodData.items[itemIndex]?.tag === tag) {
      return periodData.items[itemIndex]?.value ?? null;
    }
    const item = periodData.items.find(i => i.tag === tag);
    return item?.value ?? null;
  }, [dataSource]);

  // Fallback if no historical data
  if (!hasHistoricalData) {
    return (
      <div className="tab-balance-sheet">
        <div className="statement-header">
          <h3>Balance Sheet</h3>
          <div className="period-toggle">
            <button className={viewMode === 'quarterly' ? 'toggle-btn active' : 'toggle-btn'} onClick={() => handleViewModeChange('quarterly')}>Quarterly</button>
            <button className={viewMode === 'annual' ? 'toggle-btn active' : 'toggle-btn'} onClick={() => handleViewModeChange('annual')}>Annual</button>
          </div>
        </div>
        <div className="no-data">
          <p>Historical balance sheet data not available for this bank.</p>
          <p>Summary data from the latest filing:</p>
          <table className="financial-table">
            <thead><tr><th>Item</th><th>Value</th></tr></thead>
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

  // Render with enhanced FinancialStatementTable component
  return (
    <div className="tab-balance-sheet">
      <FinancialStatementTable
        title="Consolidated Balance Sheet"
        items={items}
        periods={periods}
        allPeriods={allPeriods}
        getValue={getValue}
        formatValue={formatCurrency}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        expanded={expanded}
        onExpandToggle={() => setExpanded(!expanded)}
        hasMoreQuarters={hasMoreQuarters}
        defaultQuartersShown={DEFAULT_QUARTERS_SHOWN}
        showDerivedNote={false}
        isIncomeStatement={false}
        bankId={bank?.cik || bank?.ticker || 'unknown'}
      />
    </div>
  );
}

/**
 * Income Statement Tab - Full income statement from SEC filings with multi-period view
 * Uses "As Reported" format (from pre.txt): items[] array with exact presentation order
 */
function IncomeStatementTab({ bank, rawData, rawDataLoading, formatCurrency, formatDate }) {
  const [viewMode, setViewMode] = useState('quarterly');
  const [expanded, setExpanded] = useState(false);
  const DEFAULT_QUARTERS_SHOWN = 5;

  // Show loading state while fetching raw data
  if (rawDataLoading) {
    return (
      <div className="tab-income-statement">
        <div className="loading-state">
          <div className="loading-spinner" />
          <p>Loading income statement data...</p>
        </div>
      </div>
    );
  }

  const historicalData = rawData?.historicalIncomeStatement;
  const dataSource = viewMode === 'quarterly'
    ? historicalData?.quarterly
    : historicalData?.annual;

  const isAsReportedFormat = Array.isArray(dataSource) && dataSource.length > 0 && dataSource[0]?.items;
  const hasHistoricalData = isAsReportedFormat && dataSource.length > 0;

  // Get all periods
  const allPeriods = hasHistoricalData
    ? dataSource.map(d => ({ key: d.period, label: d.label || d.period, form: d.form, isDerived: d.isDerived }))
    : [];

  // For quarterly view: limit to 5 periods unless expanded
  const periods = (viewMode === 'quarterly' && !expanded && allPeriods.length > DEFAULT_QUARTERS_SHOWN)
    ? allPeriods.slice(0, DEFAULT_QUARTERS_SHOWN)
    : allPeriods;

  const hasMoreQuarters = viewMode === 'quarterly' && allPeriods.length > DEFAULT_QUARTERS_SHOWN;

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    setExpanded(false);
  };

  // Get canonical items for the current view mode
  const items = useMemo(() => {
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
  }, [isAsReportedFormat, viewMode, historicalData, dataSource]);

  // Get value for a specific item and period (returns object with derivedUnavailable flag)
  const getValue = useCallback((tag, periodKey, itemIndex) => {
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
  }, [dataSource]);

  // Fallback if no historical data
  if (!hasHistoricalData) {
    return (
      <div className="tab-income-statement">
        <div className="statement-header">
          <h3>Income Statement</h3>
          <div className="period-toggle">
            <button className={viewMode === 'quarterly' ? 'toggle-btn active' : 'toggle-btn'} onClick={() => handleViewModeChange('quarterly')}>Quarterly</button>
            <button className={viewMode === 'annual' ? 'toggle-btn active' : 'toggle-btn'} onClick={() => handleViewModeChange('annual')}>Annual</button>
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
              <tr><td>Earnings Per Share</td><td>{bank.ttmEps != null ? '$' + bank.ttmEps.toFixed(2) : '-'}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Render with enhanced FinancialStatementTable component
  return (
    <div className="tab-income-statement">
      <FinancialStatementTable
        title="Consolidated Income Statement"
        items={items}
        periods={periods}
        allPeriods={allPeriods}
        getValue={getValue}
        formatValue={formatCurrency}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        expanded={expanded}
        onExpandToggle={() => setExpanded(!expanded)}
        hasMoreQuarters={hasMoreQuarters}
        defaultQuartersShown={DEFAULT_QUARTERS_SHOWN}
        showDerivedNote={true}
        isIncomeStatement={true}
        bankId={bank?.cik || bank?.ticker || 'unknown'}
      />
    </div>
  );
}

export default BankDetail;

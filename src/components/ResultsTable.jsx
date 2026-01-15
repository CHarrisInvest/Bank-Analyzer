import React, { useState, useMemo } from 'react';
import { formatNumber } from '../utils/csv.js';

/**
 * Table column configuration
 *
 * Organized by category:
 * - Basic Info: Ticker, Bank Name, Exchange, Type
 * - Market Data: Price, Market Cap
 * - Balance Sheet (Assets): Total Assets, Cash, Securities, Loans, ALLL
 * - Balance Sheet (Liabilities & Equity): Liabilities, Deposits, Borrowings, Equity
 * - Income Statement (TTM): Interest Income/Expense, NII, Noninterest Inc/Exp, Net Income
 * - Per-Share: BVPS, TBVPS, EPS, DPS
 * - Valuation: P/NI, P/TBVPS
 * - Performance: RoE, ROAA, RoTA, ROTCE, NIM
 * - Bank Ratios: Efficiency, Dep/Assets, Eq/Assets, TCE/TA, Loans/Deposits
 * - Graham: Graham #, Graham MoS
 * - Dividends: TTM Div, Payout %
 *
 * Each column includes the XBRL tag(s) used to extract the data as tooltips.
 */
const COLUMNS = [
  // ===========================================================================
  // BASIC INFO
  // ===========================================================================
  {
    key: 'ticker',
    label: 'Ticker',
    sortable: true,
    align: 'left',
    format: (value) => value || '-',
    group: 'info',
    tooltip: 'Stock ticker symbol',
  },
  {
    key: 'bankName',
    label: 'Bank Name',
    sortable: true,
    align: 'left',
    format: (value) => value || '-',
    className: 'col-bank-name',
    group: 'info',
    tooltip: 'Company name from SEC filings',
  },
  {
    key: 'exchange',
    label: 'Exchange',
    sortable: true,
    align: 'center',
    format: (value) => value || '-',
    group: 'info',
    tooltip: 'Stock exchange listing',
  },
  {
    key: 'securityType',
    label: 'Type',
    sortable: true,
    align: 'center',
    format: (value) => {
      if (value === 'common') return 'Common';
      if (value === 'exchange-traded') return 'Non-Common';
      return value || '-';
    },
    group: 'info',
    tooltip: 'Security type: Common stock or Non-common (preferred, units, etc.)',
  },

  // ===========================================================================
  // MARKET DATA
  // ===========================================================================
  {
    key: 'price',
    label: 'Price',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 2, prefix: '$' }),
    group: 'market',
    tooltip: 'Current stock price (from market data provider)',
  },
  {
    key: 'marketCap',
    label: 'Mkt Cap',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'market',
    tooltip: 'Market Capitalization = Price × Shares Outstanding',
  },

  // ===========================================================================
  // BALANCE SHEET - ASSETS (Point-in-Time)
  // ===========================================================================
  {
    key: 'totalAssets',
    label: 'Assets',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'bs-assets',
    tooltip: 'XBRL: us-gaap:Assets\nTotal Assets (Point-in-Time)',
  },
  {
    key: 'totalDeposits',
    label: 'Deposits',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'bs-liab',
    tooltip: 'XBRL: us-gaap:Deposits\nTotal Deposits (Point-in-Time)',
  },
  {
    key: 'totalEquity',
    label: 'Equity',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'bs-liab',
    tooltip: 'XBRL: us-gaap:StockholdersEquity\nTotal Stockholders\' Equity (Point-in-Time)',
  },

  // ===========================================================================
  // INCOME STATEMENT (TTM)
  // ===========================================================================
  {
    key: 'ttmNetInterestIncome',
    label: 'NII (TTM)',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'income',
    tooltip: 'XBRL: us-gaap:InterestIncomeExpenseNet or us-gaap:NetInterestIncome\nNet Interest Income (TTM = Trailing Twelve Months)',
  },
  {
    key: 'ttmNoninterestIncome',
    label: 'Non-Int Inc',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'income',
    tooltip: 'XBRL: us-gaap:NoninterestIncome\nNoninterest Income (TTM)',
  },
  {
    key: 'ttmNetIncome',
    label: 'Net Inc (TTM)',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'income',
    tooltip: 'XBRL: us-gaap:NetIncomeLoss\nNet Income (TTM = Trailing Twelve Months)',
  },

  // ===========================================================================
  // PER-SHARE DATA
  // ===========================================================================
  {
    key: 'sharesOutstanding',
    label: 'Shares',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, abbreviate: true }),
    group: 'per-share',
    tooltip: 'XBRL: dei:EntityCommonStockSharesOutstanding or us-gaap:CommonStockSharesOutstanding\nCommon shares outstanding',
  },
  {
    key: 'bvps',
    label: 'BVPS',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 2, prefix: '$' }),
    group: 'per-share',
    tooltip: 'Book Value Per Share = us-gaap:StockholdersEquity ÷ Shares Outstanding',
  },
  {
    key: 'tbvps',
    label: 'TBVPS',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 2, prefix: '$' }),
    group: 'per-share',
    tooltip: 'Tangible Book Value Per Share = (Equity - us-gaap:Goodwill - us-gaap:IntangibleAssetsNetExcludingGoodwill) ÷ Shares Outstanding',
  },
  {
    key: 'ttmEps',
    label: 'EPS (TTM)',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 2, prefix: '$' }),
    group: 'per-share',
    tooltip: 'XBRL: us-gaap:EarningsPerShareBasic\nEarnings Per Share (TTM)',
  },

  // ===========================================================================
  // VALUATION
  // ===========================================================================
  {
    key: 'pni',
    label: 'P/E',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 2 }),
    group: 'valuation',
    tooltip: 'Price-to-Earnings = Market Cap ÷ us-gaap:NetIncomeLoss (TTM)',
  },
  {
    key: 'ptbvps',
    label: 'P/TBV',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 2 }),
    group: 'valuation',
    tooltip: 'Price-to-Tangible Book Value = Price ÷ TBVPS',
  },

  // ===========================================================================
  // PERFORMANCE RATIOS
  // ===========================================================================
  {
    key: 'roe',
    label: 'RoE',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, suffix: '%' }),
    group: 'performance',
    tooltip: 'Return on Equity = us-gaap:NetIncomeLoss ÷ us-gaap:StockholdersEquity × 100',
  },
  {
    key: 'roaa',
    label: 'ROAA',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 2, suffix: '%' }),
    group: 'performance',
    tooltip: 'Return on Average Assets = us-gaap:NetIncomeLoss ÷ Average(us-gaap:Assets) × 100',
  },
  {
    key: 'rota',
    label: 'RoTA',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 2, suffix: '%' }),
    group: 'performance',
    tooltip: 'Return on Tangible Assets = us-gaap:NetIncomeLoss ÷ Tangible Assets × 100\nTangible Assets = us-gaap:Assets - us-gaap:Goodwill - us-gaap:IntangibleAssetsNetExcludingGoodwill',
  },
  {
    key: 'rotce',
    label: 'ROTCE',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, suffix: '%' }),
    group: 'performance',
    tooltip: 'Return on Tangible Common Equity = us-gaap:NetIncomeLoss ÷ TCE × 100\nTCE = Equity - Preferred - Goodwill - Intangibles',
  },

  // ===========================================================================
  // BANK-SPECIFIC RATIOS
  // ===========================================================================
  {
    key: 'efficiencyRatio',
    label: 'Efficiency',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, suffix: '%' }),
    group: 'bank-ratios',
    tooltip: 'Efficiency Ratio = us-gaap:NoninterestExpense ÷ (us-gaap:NetInterestIncome + us-gaap:NoninterestIncome) × 100\nLower is better (typically 50-70%)',
  },
  {
    key: 'depositsToAssets',
    label: 'Dep/Assets',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, suffix: '%' }),
    group: 'bank-ratios',
    tooltip: 'Deposits to Assets = us-gaap:Deposits ÷ us-gaap:Assets × 100',
  },
  {
    key: 'equityToAssets',
    label: 'Eq/Assets',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, suffix: '%' }),
    group: 'bank-ratios',
    tooltip: 'Equity to Assets = us-gaap:StockholdersEquity ÷ us-gaap:Assets × 100\nHigher indicates less leverage',
  },
  {
    key: 'tceToTa',
    label: 'TCE/TA',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, suffix: '%' }),
    group: 'bank-ratios',
    tooltip: 'TCE to Tangible Assets = Tangible Common Equity ÷ Tangible Assets × 100\nKey capital strength metric',
  },

  // ===========================================================================
  // DIVIDENDS
  // ===========================================================================
  {
    key: 'ttmDividendPerShare',
    label: 'Div/Sh',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 2, prefix: '$' }),
    group: 'dividends',
    tooltip: 'XBRL: us-gaap:CommonStockDividendsPerShareDeclared\nDividends Per Share (TTM)',
  },
  {
    key: 'dividendPayoutRatio',
    label: 'Payout',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, suffix: '%' }),
    group: 'dividends',
    tooltip: 'Dividend Payout Ratio = us-gaap:CommonStockDividendsPerShareDeclared ÷ us-gaap:EarningsPerShareBasic × 100',
  },

  // ===========================================================================
  // GRAHAM VALUE INVESTING
  // ===========================================================================
  {
    key: 'grahamNum',
    label: 'Graham #',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 2, prefix: '$' }),
    group: 'graham',
    tooltip: 'Graham Number = √(22.5 × us-gaap:EarningsPerShareBasic × BVPS)\nBenjamin Graham\'s intrinsic value estimate',
  },
  {
    key: 'grahamMoSPct',
    label: 'MoS %',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, suffix: '%' }),
    group: 'graham',
    tooltip: 'Graham Margin of Safety = (Graham Number - Price) ÷ Price × 100\nPositive = undervalued vs Graham Number',
  },
];

/**
 * Sort indicator component
 */
function SortIndicator({ direction }) {
  if (!direction) {
    return (
      <span className="sort-indicator sort-indicator-inactive">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </span>
    );
  }

  return (
    <span className={`sort-indicator sort-indicator-${direction}`}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
        {direction === 'asc' ? (
          <path d="M7 14l5-5 5 5z" />
        ) : (
          <path d="M7 10l5 5 5-5z" />
        )}
      </svg>
    </span>
  );
}

/**
 * Results Table Component
 * Displays filtered bank data with sortable columns
 */
function ResultsTable({ banks, loading }) {
  const [sortConfig, setSortConfig] = useState({
    key: 'marketCap',
    direction: 'desc',
  });

  /**
   * Handle column header click for sorting
   */
  const handleSort = (columnKey) => {
    setSortConfig((prevConfig) => {
      if (prevConfig.key === columnKey) {
        // Toggle direction or reset
        if (prevConfig.direction === 'asc') {
          return { key: columnKey, direction: 'desc' };
        } else if (prevConfig.direction === 'desc') {
          return { key: null, direction: null };
        }
      }
      // New column, start with ascending
      return { key: columnKey, direction: 'asc' };
    });
  };

  /**
   * Sort banks based on current sort configuration
   */
  const sortedBanks = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) {
      return banks;
    }

    return [...banks].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      // Handle null/undefined values
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      // String comparison
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue);
        return sortConfig.direction === 'asc' ? comparison : -comparison;
      }

      // Numeric comparison
      const comparison = aValue - bValue;
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }, [banks, sortConfig]);

  /**
   * Get CSS class for cell value (for conditional styling)
   */
  const getCellClass = (column, value) => {
    const classes = [`col-${column.key}`];

    if (column.align) {
      classes.push(`align-${column.align}`);
    }

    if (column.className) {
      classes.push(column.className);
    }

    // Add value-based classes for specific columns
    if (column.key === 'roe' && typeof value === 'number') {
      if (value >= 10) classes.push('value-positive');
      else if (value < 0) classes.push('value-negative');
    }

    if (column.key === 'rotce' && typeof value === 'number') {
      if (value >= 12) classes.push('value-positive');
      else if (value < 0) classes.push('value-negative');
    }

    if (column.key === 'roaa' && typeof value === 'number') {
      if (value >= 1) classes.push('value-positive');
      else if (value < 0) classes.push('value-negative');
    }

    if (column.key === 'rota' && typeof value === 'number') {
      if (value >= 1) classes.push('value-positive');
      else if (value < 0) classes.push('value-negative');
    }

    if (column.key === 'grahamMoSPct' && typeof value === 'number') {
      if (value >= 30) classes.push('value-positive');
      else if (value < 0) classes.push('value-negative');
    }

    // Bank-specific ratio conditional styling
    // Efficiency Ratio: lower is better (< 60% good, > 70% concerning)
    if (column.key === 'efficiencyRatio' && typeof value === 'number') {
      if (value <= 55) classes.push('value-positive');
      else if (value >= 70) classes.push('value-negative');
    }

    // Equity/Assets: higher means less leverage (> 10% is strong)
    if (column.key === 'equityToAssets' && typeof value === 'number') {
      if (value >= 10) classes.push('value-positive');
      else if (value < 7) classes.push('value-negative');
    }

    // TCE/TA: higher means stronger capital (> 8% is strong)
    if (column.key === 'tceToTa' && typeof value === 'number') {
      if (value >= 8) classes.push('value-positive');
      else if (value < 5) classes.push('value-negative');
    }

    return classes.join(' ');
  };

  if (banks.length === 0 && !loading) {
    return (
      <div className="results-empty">
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <h3>No banks match your criteria</h3>
        <p>Try adjusting your filters to see more results</p>
      </div>
    );
  }

  return (
    <div className="results-table-container">
      <table className="results-table">
        <thead>
          <tr>
            {COLUMNS.map((column) => (
              <th
                key={column.key}
                className={`th-${column.key} align-${column.align} ${
                  column.sortable ? 'sortable' : ''
                }`}
                onClick={column.sortable ? () => handleSort(column.key) : undefined}
                role={column.sortable ? 'button' : undefined}
                tabIndex={column.sortable ? 0 : undefined}
                title={column.tooltip}
                onKeyDown={
                  column.sortable
                    ? (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleSort(column.key);
                        }
                      }
                    : undefined
                }
              >
                <span className="th-content">
                  <span className="th-label">{column.label}</span>
                  {column.sortable && (
                    <SortIndicator
                      direction={sortConfig.key === column.key ? sortConfig.direction : null}
                    />
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedBanks.map((bank) => (
            <tr key={bank.id}>
              {COLUMNS.map((column) => (
                <td key={column.key} className={getCellClass(column, bank[column.key])}>
                  {column.format(bank[column.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {loading && (
        <div className="table-loading-overlay">
          <div className="loading-spinner-small" />
        </div>
      )}
    </div>
  );
}

export default ResultsTable;

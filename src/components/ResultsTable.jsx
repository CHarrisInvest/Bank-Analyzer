import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatNumber } from '../utils/csv.js';
import { sendPageView } from '../analytics/gtag.js';

/**
 * Column group definitions for visual grouping headers
 */
const COLUMN_GROUPS = {
  info: { label: 'Info', color: '#1a365d', description: 'Bank Identification Information' },
  market: { label: 'Market', color: '#2b6cb0', description: 'Market Data & Trading Information' },
  valuation: { label: 'Valuation', color: '#2c5282', description: 'Valuation Metrics' },
  'per-share': { label: 'Per Share', color: '#2a4365', description: 'Per-Share Financial Data' },
  performance: { label: 'Performance', color: '#276749', description: 'Profitability & Performance Ratios' },
  'bank-ratios': { label: 'Bank Ratios', color: '#285e61', description: 'Bank-Specific Financial Ratios' },
  graham: { label: 'Graham Value', color: '#744210', description: 'Benjamin Graham Value Investing Metrics' },
  'balance-sheet': { label: 'Balance Sheet', color: '#553c9a', description: 'Balance Sheet Items (Point-in-Time)' },
  income: { label: 'Income Statement', color: '#702459', description: 'Income Statement Items (Trailing Twelve Months)' },
  dividends: { label: 'Dividends', color: '#9c4221', description: 'Dividend Information' },
};

/**
 * Table column configuration - Logically ordered for intuitive use
 *
 * Order:
 * 1. Identity (Ticker, Name, Exchange)
 * 2. Market Data (Price, Mkt Cap)
 * 3. Valuation (P/E)
 * 4. Per-Share Data (BVPS, EPS, DPS)
 * 5. Performance (RoE, ROAA)
 * 6. Bank Ratios (Efficiency, Eq/Assets, Dep/Assets)
 * 7. Graham Value (Graham #, MoS %)
 * 8. Dividends (Payout)
 * 9. Balance Sheet (Assets, Deposits, Equity, Liabilities, Cash, Loans)
 * 10. Income Statement (NII, NonInt Inc, NonInt Exp, Net Inc, then hidden: Int Inc, Int Exp, Pre-Tax, NI to Common)
 * 11. Other (Shares)
 */
const COLUMNS = [
  // ===========================================================================
  // IDENTITY
  // ===========================================================================
  {
    key: 'ticker',
    label: 'Ticker',
    fullName: 'Stock Ticker Symbol',
    sortable: true,
    align: 'left',
    format: (value) => value || '-',
    group: 'info',
    defaultVisible: true,
    locked: true, // Cannot be hidden
  },
  {
    key: 'bankName',
    label: 'Bank Name',
    fullName: 'Bank Name',
    sortable: true,
    align: 'left',
    format: (value) => value || '-',
    className: 'col-bank-name',
    group: 'info',
    defaultVisible: true,
  },
  {
    key: 'exchange',
    label: 'Exchange',
    fullName: 'Stock Exchange',
    sortable: true,
    align: 'center',
    format: (value) => value || '-',
    group: 'info',
    defaultVisible: true,
  },
  {
    key: 'dataDate',
    label: 'Data',
    fullName: 'Most Recent Reporting Date',
    sortable: true,
    align: 'center',
    format: (value) => {
      if (!value) return '-';
      const date = new Date(value);
      if (isNaN(date.getTime())) return value;

      // Calculate quarter and year
      const quarter = Math.ceil((date.getMonth() + 1) / 3);
      const year = date.getFullYear().toString().slice(-2);
      const label = `Q${quarter}'${year}`;

      // Return as a special marker that we'll render as JSX
      return { __dateDisplay: true, label, fullDate: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) };
    },
    group: 'info',
    defaultVisible: true,
  },

  // ===========================================================================
  // MARKET DATA
  // ===========================================================================
  {
    key: 'price',
    label: 'Price',
    fullName: 'Current Stock Price',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 2, prefix: '$' }),
    group: 'market',
    defaultVisible: true,
  },
  {
    key: 'marketCap',
    label: 'Mkt Cap',
    fullName: 'Market Capitalization (Mkt Cap)',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'market',
    defaultVisible: true,
  },

  // ===========================================================================
  // VALUATION
  // ===========================================================================
  {
    key: 'pni',
    label: 'P/E',
    fullName: 'Price-to-Earnings Ratio (P/E)',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 2 }),
    group: 'valuation',
    defaultVisible: true,
  },
  {
    key: 'priceToBook',
    label: 'P/B',
    fullName: 'Price-to-Book Ratio (P/B)',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 2 }),
    group: 'valuation',
    defaultVisible: true,
  },

  // ===========================================================================
  // PER-SHARE DATA
  // ===========================================================================
  {
    key: 'bvps',
    label: 'BVPS',
    fullName: 'Book Value Per Share (BVPS)',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 2, prefix: '$' }),
    group: 'per-share',
    defaultVisible: true,
  },
  {
    key: 'ttmEps',
    label: 'EPS',
    fullName: 'Earnings Per Share (EPS) - TTM',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 2, prefix: '$' }),
    group: 'per-share',
    defaultVisible: true,
  },
  {
    key: 'ttmDividendPerShare',
    label: 'DPS',
    fullName: 'Dividends Per Share (DPS) - TTM',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 2, prefix: '$' }),
    group: 'per-share',
    defaultVisible: true,
  },
  {
    key: 'dividendPayoutRatio',
    label: 'Payout',
    fullName: 'Dividend Payout Ratio',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, suffix: '%' }),
    group: 'per-share',
    defaultVisible: true,
  },

  // ===========================================================================
  // PERFORMANCE RATIOS
  // ===========================================================================
  {
    key: 'roe',
    label: 'RoE',
    fullName: 'Return on Equity (RoE)',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, suffix: '%' }),
    group: 'performance',
    defaultVisible: true,
  },
  {
    key: 'roaa',
    label: 'ROAA',
    fullName: 'Return on Average Assets (ROAA)',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 2, suffix: '%' }),
    group: 'performance',
    defaultVisible: true,
  },

  // ===========================================================================
  // BANK-SPECIFIC RATIOS
  // ===========================================================================
  {
    key: 'efficiencyRatio',
    label: 'Efficiency',
    fullName: 'Efficiency Ratio - Lower is Better',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, suffix: '%' }),
    group: 'bank-ratios',
    defaultVisible: true,
  },
  {
    key: 'equityToAssets',
    label: 'Eq/Assets',
    fullName: 'Equity to Assets Ratio (Eq/Assets)',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, suffix: '%' }),
    group: 'bank-ratios',
    defaultVisible: true,
  },
  {
    key: 'depositsToAssets',
    label: 'Dep/Assets',
    fullName: 'Deposits to Assets Ratio (Dep/Assets)',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, suffix: '%' }),
    group: 'bank-ratios',
    defaultVisible: true,
  },

  // ===========================================================================
  // GRAHAM VALUE INVESTING
  // ===========================================================================
  {
    key: 'grahamNum',
    label: 'Graham #',
    fullName: 'Graham Number (Graham #) - Intrinsic Value Estimate',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 2, prefix: '$' }),
    group: 'graham',
    defaultVisible: false,
  },
  {
    key: 'grahamMoSPct',
    label: 'MoS %',
    fullName: 'Margin of Safety Percentage (MoS %)',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, suffix: '%' }),
    group: 'graham',
    defaultVisible: false,
  },

  // ===========================================================================
  // BALANCE SHEET (Summary)
  // ===========================================================================
  {
    key: 'totalAssets',
    label: 'Assets',
    fullName: 'Total Assets',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'balance-sheet',
    defaultVisible: true,
  },
  {
    key: 'totalDeposits',
    label: 'Deposits',
    fullName: 'Total Deposits',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'balance-sheet',
    defaultVisible: true,
  },
  {
    key: 'totalEquity',
    label: 'Equity',
    fullName: "Total Stockholders' Equity",
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'balance-sheet',
    defaultVisible: true,
  },
  {
    key: 'totalLiabilities',
    label: 'Liabilities',
    fullName: 'Total Liabilities',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'balance-sheet',
    defaultVisible: false,
  },
  {
    key: 'cashAndCashEquivalents',
    label: 'Cash',
    fullName: 'Cash and Cash Equivalents',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'balance-sheet',
    defaultVisible: false,
  },
  {
    key: 'loans',
    label: 'Loans',
    fullName: 'Loans and Leases Receivable, Net',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'balance-sheet',
    defaultVisible: false,
  },

  // ===========================================================================
  // INCOME STATEMENT (TTM)
  // ===========================================================================
  {
    key: 'ttmNetInterestIncome',
    label: 'NII',
    fullName: 'Net Interest Income (NII) - TTM',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'income',
    defaultVisible: true,
  },
  {
    key: 'ttmNoninterestIncome',
    label: 'NonInt Inc',
    fullName: 'Noninterest Income (NonInt Inc) - TTM',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'income',
    defaultVisible: false,
  },
  {
    key: 'ttmNoninterestExpense',
    label: 'NonInt Exp',
    fullName: 'Noninterest Expense (NonInt Exp) - TTM',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'income',
    defaultVisible: false,
  },
  {
    key: 'ttmNetIncome',
    label: 'Net Inc',
    fullName: 'Net Income (Net Inc) - TTM',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'income',
    defaultVisible: true,
  },
  // Hidden by default columns
  {
    key: 'ttmInterestIncome',
    label: 'Int Inc',
    fullName: 'Interest Income (Int Inc) - TTM',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'income',
    defaultVisible: false,
  },
  {
    key: 'ttmInterestExpense',
    label: 'Int Exp',
    fullName: 'Interest Expense (Int Exp) - TTM',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'income',
    defaultVisible: false,
  },
  {
    key: 'ttmPreTaxIncome',
    label: 'Pre-Tax',
    fullName: 'Pre-Tax Income - TTM',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'income',
    defaultVisible: false,
  },
  {
    key: 'ttmNetIncomeToCommon',
    label: 'NI to Common',
    fullName: 'Net Income Available to Common Stockholders (NI to Common) - TTM',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'income',
    defaultVisible: false,
  },

  // ===========================================================================
  // OTHER METRICS
  // ===========================================================================
  {
    key: 'sharesOutstanding',
    label: 'Shares',
    fullName: 'Common Shares Outstanding',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, abbreviate: true }),
    group: 'market',
    defaultVisible: false,
  },
];

/**
 * Get default visible columns
 */
const getDefaultVisibleColumns = () => {
  return COLUMNS.filter((col) => col.defaultVisible).map((col) => col.key);
};

/**
 * Get default column order (all columns in their original order)
 */
const getDefaultColumnOrder = () => {
  return COLUMNS.map((col) => col.key);
};

/**
 * Sort indicator component
 */
function SortIndicator({ direction }) {
  if (!direction) {
    return (
      <span className="sort-indicator sort-indicator-inactive">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </span>
    );
  }

  return (
    <span className={`sort-indicator sort-indicator-${direction}`}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
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
 * Column visibility toggle dropdown
 */
function ColumnVisibilityDropdown({ visibleColumns, columnOrder, onToggleColumn, onShowAll, onShowDefault, onResetOrder }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Group columns by their group
  const columnsByGroup = useMemo(() => {
    const groups = {};
    COLUMNS.forEach((col) => {
      if (!groups[col.group]) {
        groups[col.group] = [];
      }
      groups[col.group].push(col);
    });
    return groups;
  }, []);

  // Check if column order has been customized
  const isOrderCustomized = useMemo(() => {
    const defaultOrder = getDefaultColumnOrder();
    return columnOrder.some((key, index) => key !== defaultOrder[index]);
  }, [columnOrder]);

  return (
    <div className="column-visibility-dropdown" ref={dropdownRef}>
      <button
        type="button"
        className="column-visibility-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12h14" />
        </svg>
        Columns
        <span className="column-count">({visibleColumns.length}/{COLUMNS.length})</span>
      </button>
      {isOpen && (
        <div className="column-visibility-menu">
          <div className="column-visibility-actions">
            <button type="button" onClick={onShowAll}>Show All</button>
            <button type="button" onClick={onShowDefault}>Default</button>
            {isOrderCustomized && (
              <button type="button" onClick={onResetOrder} title="Reset column order">Reset Order</button>
            )}
          </div>
          <div className="column-visibility-hint">
            Drag column headers to reorder
          </div>
          <div className="column-visibility-list">
            {Object.entries(columnsByGroup).map(([groupKey, cols]) => (
              <div key={groupKey} className="column-visibility-group">
                <div className="column-visibility-group-header">
                  {COLUMN_GROUPS[groupKey]?.label || groupKey}
                </div>
                {cols.map((col) => (
                  <label key={col.key} className={`column-visibility-item ${col.locked ? 'locked' : ''}`}>
                    <input
                      type="checkbox"
                      checked={visibleColumns.includes(col.key)}
                      onChange={() => !col.locked && onToggleColumn(col.key)}
                      disabled={col.locked}
                    />
                    <span>{col.label}</span>
                    {col.locked && <span className="column-locked-icon" title="This column cannot be hidden">🔒</span>}
                  </label>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Export data to CSV
 */
function exportToCSV(banks, visibleColumns, columnOrder) {
  // Get columns in the correct order
  const orderedKeys = columnOrder.filter((key) => visibleColumns.includes(key));
  const columns = orderedKeys.map((key) => COLUMNS.find((col) => col.key === key)).filter(Boolean);

  // Header row
  const headers = columns.map((col) => col.label).join(',');

  // Data rows
  const rows = banks.map((bank) => {
    return columns
      .map((col) => {
        const value = bank[col.key];
        if (value === null || value === undefined) return '';
        if (typeof value === 'string') {
          // Escape quotes and wrap in quotes if contains comma
          const escaped = value.replace(/"/g, '""');
          return escaped.includes(',') ? `"${escaped}"` : escaped;
        }
        return value;
      })
      .join(',');
  });

  const csv = [headers, ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `bank-screener-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Results Table Component
 * Displays filtered bank data with sortable columns
 */
/**
 * Highlight matching text in a string based on search query
 * For tickers: highlights if text starts with query
 * For names: highlights words that start with query
 */
function highlightMatch(text, query, isName = false) {
  if (!query || !text) return text;

  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return text;

  if (isName) {
    // For names, highlight each word that starts with the query
    const words = text.split(/(\s+)/); // Split but keep whitespace
    return words.map((word, i) => {
      if (word.toLowerCase().startsWith(lowerQuery)) {
        const matchLen = lowerQuery.length;
        return (
          <span key={i}>
            <mark className="search-highlight">{word.slice(0, matchLen)}</mark>
            {word.slice(matchLen)}
          </span>
        );
      }
      return word;
    });
  } else {
    // For tickers, highlight from start if it matches
    if (text.toLowerCase().startsWith(lowerQuery)) {
      const matchLen = lowerQuery.length;
      return (
        <>
          <mark className="search-highlight">{text.slice(0, matchLen)}</mark>
          {text.slice(matchLen)}
        </>
      );
    }
    return text;
  }
}

// Map filter keys to column keys (some differ)
const FILTER_TO_COLUMN_MAP = {
  marketCap: 'marketCap',
  totalAssets: 'totalAssets',
  totalDeposits: 'totalDeposits',
  totalEquity: 'totalEquity',
  totalLiabilities: 'totalLiabilities',
  cashAndCashEquivalents: 'cashAndCashEquivalents',
  loans: 'loans',
  pni: 'pni',
  roe: 'roe',
  roaa: 'roaa',
  efficiencyRatio: 'efficiencyRatio',
  equityToAssets: 'equityToAssets',
  depositsToAssets: 'depositsToAssets',
  ttmEps: 'ttmEps',
  bvps: 'bvps',
  ttmDividend: 'ttmDividendPerShare',
  dividendPayoutRatio: 'dividendPayoutRatio',
  grahamMoS: 'grahamMoSPct',
  ttmNetIncome: 'ttmNetIncome',
  ttmNetInterestIncome: 'ttmNetInterestIncome',
  sharesOutstanding: 'sharesOutstanding',
};

function ResultsTable({ banks, loading, searchQuery = '', filters = {} }) {
  const navigate = useNavigate();
  const [sortConfig, setSortConfig] = useState({
    key: 'marketCap',
    direction: 'desc',
  });
  const [visibleColumns, setVisibleColumns] = useState(() => {
    // Try to load from localStorage
    const saved = localStorage.getItem('bankAnalyzer_visibleColumns');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return getDefaultVisibleColumns();
      }
    }
    return getDefaultVisibleColumns();
  });

  // Determine which columns have active filters
  const filteredColumns = useMemo(() => {
    const filtered = new Set();
    Object.entries(filters).forEach(([filterKey, filterValue]) => {
      if (filterKey === 'searchQuery' || filterKey === 'exchanges') return;
      const columnKey = FILTER_TO_COLUMN_MAP[filterKey];
      if (!columnKey) return;

      // Check if filter has a value
      if (filterValue && typeof filterValue === 'object') {
        if ((filterValue.min !== '' && filterValue.min !== undefined) ||
            (filterValue.max !== '' && filterValue.max !== undefined)) {
          filtered.add(columnKey);
        }
      }
    });
    return filtered;
  }, [filters]);

  // Auto-add filtered columns to visible columns
  useEffect(() => {
    if (filteredColumns.size > 0) {
      setVisibleColumns((prev) => {
        const newVisible = [...prev];
        let changed = false;
        filteredColumns.forEach((colKey) => {
          if (!newVisible.includes(colKey)) {
            newVisible.push(colKey);
            changed = true;
          }
        });
        return changed ? newVisible : prev;
      });
    }
  }, [filteredColumns]);
  const [columnOrder, setColumnOrder] = useState(() => {
    // Try to load from localStorage
    const saved = localStorage.getItem('bankAnalyzer_columnOrder');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure all columns are present (in case new columns were added)
        const allKeys = COLUMNS.map((col) => col.key);
        const validKeys = parsed.filter((key) => allKeys.includes(key));
        const missingKeys = allKeys.filter((key) => !validKeys.includes(key));
        return [...validKeys, ...missingKeys];
      } catch {
        return getDefaultColumnOrder();
      }
    }
    return getDefaultColumnOrder();
  });
  const [focusedCell, setFocusedCell] = useState({ row: 0, col: 0 });
  const [draggedColumn, setDraggedColumn] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);
  const tableContainerRef = useRef(null);
  const tableRef = useRef(null);

  // Save visible columns to localStorage
  useEffect(() => {
    localStorage.setItem('bankAnalyzer_visibleColumns', JSON.stringify(visibleColumns));
  }, [visibleColumns]);

  // Save column order to localStorage
  useEffect(() => {
    localStorage.setItem('bankAnalyzer_columnOrder', JSON.stringify(columnOrder));
  }, [columnOrder]);

  // Get currently visible columns in the correct order
  const displayColumns = useMemo(() => {
    const orderedKeys = columnOrder.filter((key) => visibleColumns.includes(key));
    return orderedKeys.map((key) => COLUMNS.find((col) => col.key === key)).filter(Boolean);
  }, [visibleColumns, columnOrder]);

  // Calculate column groups for header
  // Special handling: split first group if it spans more than 1 column
  // to keep frozen first column aligned with its group header
  const columnGroupSpans = useMemo(() => {
    const spans = [];
    let currentGroup = null;
    let currentSpan = 0;
    let startIndex = 0;

    displayColumns.forEach((col, index) => {
      if (col.group !== currentGroup) {
        if (currentGroup !== null) {
          spans.push({
            group: currentGroup,
            span: currentSpan,
            startIndex,
          });
        }
        currentGroup = col.group;
        currentSpan = 1;
        startIndex = index;
      } else {
        currentSpan++;
      }
    });

    if (currentGroup !== null) {
      spans.push({
        group: currentGroup,
        span: currentSpan,
        startIndex,
      });
    }

    // Split first group if it has more than 1 column (for frozen column alignment)
    if (spans.length > 0 && spans[0].span > 1) {
      const firstGroup = spans[0];
      spans.splice(
        0,
        1,
        { group: firstGroup.group, span: 1, startIndex: 0, isFrozen: true },
        { group: firstGroup.group, span: firstGroup.span - 1, startIndex: 1, isContinuation: true }
      );
    } else if (spans.length > 0) {
      spans[0].isFrozen = true;
    }

    return spans;
  }, [displayColumns]);

  /**
   * Scroll table back to top
   */
  const scrollToTop = () => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  /**
   * Handle column header click for sorting
   */
  const handleSort = (columnKey) => {
    setSortConfig((prevConfig) => {
      if (prevConfig.key === columnKey) {
        if (prevConfig.direction === 'asc') {
          return { key: columnKey, direction: 'desc' };
        } else if (prevConfig.direction === 'desc') {
          return { key: null, direction: null };
        }
      }
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

      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue);
        return sortConfig.direction === 'asc' ? comparison : -comparison;
      }

      const comparison = aValue - bValue;
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }, [banks, sortConfig]);

  /**
   * Toggle column visibility
   */
  const handleToggleColumn = useCallback((columnKey) => {
    // Check if column is locked
    const column = COLUMNS.find((col) => col.key === columnKey);
    if (column?.locked) return;

    setVisibleColumns((prev) => {
      if (prev.includes(columnKey)) {
        // Don't allow hiding the last column
        if (prev.length <= 1) return prev;
        return prev.filter((k) => k !== columnKey);
      }
      return [...prev, columnKey];
    });
  }, []);

  /**
   * Show all columns
   */
  const handleShowAllColumns = useCallback(() => {
    setVisibleColumns(COLUMNS.map((col) => col.key));
  }, []);

  /**
   * Reset to default columns
   */
  const handleShowDefaultColumns = useCallback(() => {
    setVisibleColumns(getDefaultVisibleColumns());
  }, []);

  /**
   * Reset column order to default
   */
  const handleResetColumnOrder = useCallback(() => {
    setColumnOrder(getDefaultColumnOrder());
  }, []);

  /**
   * Handle column drag start
   */
  const handleDragStart = useCallback((e, columnKey) => {
    setDraggedColumn(columnKey);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', columnKey);
    // Add a slight delay to allow the drag image to be created
    setTimeout(() => {
      e.target.classList.add('dragging');
    }, 0);
  }, []);

  /**
   * Handle column drag over
   */
  const handleDragOver = useCallback((e, columnKey) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (columnKey !== draggedColumn) {
      setDragOverColumn(columnKey);
    }
  }, [draggedColumn]);

  /**
   * Handle column drag leave
   */
  const handleDragLeave = useCallback(() => {
    setDragOverColumn(null);
  }, []);

  /**
   * Handle column drop
   */
  const handleDrop = useCallback((e, targetColumnKey) => {
    e.preventDefault();

    if (!draggedColumn || draggedColumn === targetColumnKey) {
      setDraggedColumn(null);
      setDragOverColumn(null);
      return;
    }

    setColumnOrder((prevOrder) => {
      const newOrder = [...prevOrder];
      const draggedIndex = newOrder.indexOf(draggedColumn);
      const targetIndex = newOrder.indexOf(targetColumnKey);

      if (draggedIndex === -1 || targetIndex === -1) return prevOrder;

      // Remove the dragged item and insert it at the target position
      newOrder.splice(draggedIndex, 1);
      newOrder.splice(targetIndex, 0, draggedColumn);

      return newOrder;
    });

    setDraggedColumn(null);
    setDragOverColumn(null);
  }, [draggedColumn]);

  /**
   * Handle drag end
   */
  const handleDragEnd = useCallback((e) => {
    e.target.classList.remove('dragging');
    setDraggedColumn(null);
    setDragOverColumn(null);
  }, []);

  /**
   * Handle keyboard navigation
   */
  const handleKeyDown = useCallback(
    (e) => {
      if (!tableRef.current) return;

      const maxRow = sortedBanks.length - 1;
      const maxCol = displayColumns.length - 1;

      let newRow = focusedCell.row;
      let newCol = focusedCell.col;

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          newRow = Math.max(0, focusedCell.row - 1);
          break;
        case 'ArrowDown':
          e.preventDefault();
          newRow = Math.min(maxRow, focusedCell.row + 1);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          newCol = Math.max(0, focusedCell.col - 1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          newCol = Math.min(maxCol, focusedCell.col + 1);
          break;
        case 'Home':
          e.preventDefault();
          if (e.ctrlKey) {
            newRow = 0;
          }
          newCol = 0;
          break;
        case 'End':
          e.preventDefault();
          if (e.ctrlKey) {
            newRow = maxRow;
          }
          newCol = maxCol;
          break;
        case 'PageUp':
          e.preventDefault();
          newRow = Math.max(0, focusedCell.row - 10);
          break;
        case 'PageDown':
          e.preventDefault();
          newRow = Math.min(maxRow, focusedCell.row + 10);
          break;
        default:
          return;
      }

      setFocusedCell({ row: newRow, col: newCol });

      // Scroll the cell into view
      const cell = tableRef.current.querySelector(
        `tbody tr:nth-child(${newRow + 1}) td:nth-child(${newCol + 1})`
      );
      if (cell) {
        cell.scrollIntoView({ block: 'nearest', inline: 'nearest' });
      }
    },
    [focusedCell, sortedBanks.length, displayColumns.length]
  );

  /**
   * Get CSS class for cell value (for conditional styling)
   */
  const getCellClass = (column, value, rowIndex, colIndex) => {
    const classes = [`col-${column.key}`];

    if (column.align) {
      classes.push(`align-${column.align}`);
    }

    if (column.className) {
      classes.push(column.className);
    }

    // Focused cell
    if (rowIndex === focusedCell.row && colIndex === focusedCell.col) {
      classes.push('cell-focused');
    }

    // Column highlighting: sorted column (darker) or filtered column (lighter)
    if (sortConfig.key === column.key) {
      classes.push('column-sorted');
    } else if (filteredColumns.has(column.key)) {
      classes.push('column-filtered');
    }

    // Add value-based classes for specific columns
    if (column.key === 'roe' && typeof value === 'number') {
      if (value >= 10) classes.push('value-positive');
      else if (value < 0) classes.push('value-negative');
    }

    if (column.key === 'roaa' && typeof value === 'number') {
      if (value >= 1) classes.push('value-positive');
      else if (value < 0) classes.push('value-negative');
    }

    if (column.key === 'grahamMoSPct' && typeof value === 'number') {
      if (value >= 30) classes.push('value-positive');
      else if (value < 0) classes.push('value-negative');
    }

    if (column.key === 'efficiencyRatio' && typeof value === 'number') {
      if (value <= 55) classes.push('value-positive');
      else if (value >= 70) classes.push('value-negative');
    }

    if (column.key === 'equityToAssets' && typeof value === 'number') {
      if (value >= 10) classes.push('value-positive');
      else if (value < 7) classes.push('value-negative');
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
    <div className="results-table-wrapper">
      <div className="results-table-toolbar">
        <ColumnVisibilityDropdown
          visibleColumns={visibleColumns}
          columnOrder={columnOrder}
          onToggleColumn={handleToggleColumn}
          onShowAll={handleShowAllColumns}
          onShowDefault={handleShowDefaultColumns}
          onResetOrder={handleResetColumnOrder}
        />
        <button
          type="button"
          className="export-btn"
          onClick={() => exportToCSV(sortedBanks, visibleColumns, columnOrder)}
          title="Export to CSV"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Export CSV
        </button>
      </div>
      <div
        className="results-table-container"
        ref={tableContainerRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        role="grid"
        aria-label="Bank results table"
      >
        <table className="results-table" ref={tableRef}>
          <thead>
            {/* Group header row */}
            <tr className="column-group-row">
              {columnGroupSpans.map(({ group, span, isFrozen, isContinuation }, index) => (
                <th
                  key={`group-${index}`}
                  colSpan={span}
                  className={`column-group-header${isFrozen ? ' column-group-frozen' : ''}${isContinuation ? ' column-group-continuation' : ''}`}
                  style={{ borderBottomColor: COLUMN_GROUPS[group]?.color }}
                  title={COLUMN_GROUPS[group]?.description}
                >
                  {isContinuation ? '' : (COLUMN_GROUPS[group]?.label || group)}
                </th>
              ))}
            </tr>
            {/* Column header row */}
            <tr>
              {displayColumns.map((column) => (
                <th
                  key={column.key}
                  className={`th-${column.key} align-${column.align} ${
                    column.sortable ? 'sortable' : ''
                  } ${draggedColumn === column.key ? 'column-dragging' : ''} ${
                    dragOverColumn === column.key ? 'column-drag-over' : ''
                  } ${sortConfig.key === column.key ? 'column-sorted' : ''} ${
                    filteredColumns.has(column.key) && sortConfig.key !== column.key ? 'column-filtered' : ''
                  }`}
                  onClick={column.sortable ? () => handleSort(column.key) : undefined}
                  role={column.sortable ? 'button' : undefined}
                  tabIndex={column.sortable ? 0 : undefined}
                  title={column.fullName}
                  draggable
                  onDragStart={(e) => handleDragStart(e, column.key)}
                  onDragOver={(e) => handleDragOver(e, column.key)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, column.key)}
                  onDragEnd={handleDragEnd}
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
            {sortedBanks.map((bank, rowIndex) => (
              <tr
                key={bank.id}
                onClick={() => setFocusedCell({ row: rowIndex, col: focusedCell.col })}
              >
                {displayColumns.map((column, colIndex) => {
                  const value = bank[column.key];
                  const isNull = value === null || value === undefined;
                  const formatted = column.format(value);

                  // Handle special date display
                  const isDateDisplay = formatted && typeof formatted === 'object' && formatted.__dateDisplay;

                  // Apply search highlighting for ticker and bankName
                  let displayContent;
                  if (isDateDisplay) {
                    displayContent = <span className="date-badge">{formatted.label}</span>;
                  } else if (column.key === 'ticker' && typeof formatted === 'string') {
                    // Ticker is always a clickable link to the bank detail page
                    const tickerContent = searchQuery
                      ? highlightMatch(formatted, searchQuery, false)
                      : formatted;

                    const handleTickerClick = (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // Capture scroll position and navigate
                      const scrollY = window.scrollY;
                      sendPageView(`/bank/${bank.ticker}`, bank.ticker);
                      navigate(`/bank/${bank.ticker}`, {
                        state: { from: 'screener', filters: filters, scrollY },
                      });
                    };

                    displayContent = (
                      <a
                        href={`/bank/${bank.ticker}`}
                        className="ticker-link"
                        onClick={handleTickerClick}
                      >
                        {tickerContent}
                      </a>
                    );
                  } else if (column.key === 'bankName' && searchQuery && typeof formatted === 'string') {
                    displayContent = highlightMatch(formatted, searchQuery, true);
                  } else {
                    displayContent = formatted;
                  }

                  return (
                    <td
                      key={column.key}
                      className={getCellClass(column, value, rowIndex, colIndex)}
                      onClick={() => setFocusedCell({ row: rowIndex, col: colIndex })}
                      title={isNull ? 'Not Directly Reported' : isDateDisplay ? formatted.fullDate : undefined}
                    >
                      {displayContent}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={displayColumns.length} className="table-footer">
                <div className="table-footer-content">
                  <button
                    className="scroll-to-top-btn"
                    onClick={scrollToTop}
                    title="Scroll to top"
                    type="button"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7 14l5-5 5 5z" />
                    </svg>
                    Top
                  </button>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>

        {loading && (
          <div className="table-loading-overlay">
            <div className="loading-spinner-small" />
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultsTable;

import React, { useState, useMemo } from 'react';
import { formatNumber } from '../utils/csv.js';

/**
 * Table column configuration
 *
 * All columns correspond to XBRL tags extracted from SEC EDGAR filings.
 * Balance sheet items are point-in-time values; income statement items are TTM.
 *
 * Categories:
 * - Basic Info: Ticker, Bank Name, Exchange, Type
 * - Market Data: Price, Market Cap
 * - Balance Sheet (Assets): Assets, Cash, Deposits in Banks, AFS Securities, HTM Securities, Loans, ALLL, PP&E
 * - Balance Sheet (Liabilities & Equity): Liabilities, Deposits, ST Borrowings, LT Debt, Equity, Goodwill, Intangibles
 * - Income Statement (TTM): Interest Income, Interest Expense, NII, Noninterest Inc/Exp, Provision, Pre-Tax Inc, Net Income
 * - Cash Flow: Operating Cash Flow
 * - Per-Share: Shares, BVPS, TBVPS, EPS, DPS
 * - Valuation: P/E, P/TBV
 * - Performance: RoE, ROAA, RoTA, ROTCE
 * - Bank Ratios: Efficiency, Dep/Assets, Eq/Assets, TCE/TA
 * - Graham: Graham #, MoS %
 */
const COLUMNS = [
  // ===========================================================================
  // BASIC INFO
  // ===========================================================================
  {
    key: 'ticker',
    label: 'Ticker',
    xbrl: null,
    sortable: true,
    align: 'left',
    format: (value) => value || '-',
    group: 'info',
  },
  {
    key: 'bankName',
    label: 'Bank Name',
    xbrl: null,
    sortable: true,
    align: 'left',
    format: (value) => value || '-',
    className: 'col-bank-name',
    group: 'info',
  },
  {
    key: 'exchange',
    label: 'Exchange',
    xbrl: null,
    sortable: true,
    align: 'center',
    format: (value) => value || '-',
    group: 'info',
  },
  // ===========================================================================
  // MARKET DATA
  // ===========================================================================
  {
    key: 'price',
    label: 'Price',
    xbrl: null,
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 2, prefix: '$' }),
    group: 'market',
  },
  {
    key: 'marketCap',
    label: 'Mkt Cap',
    xbrl: 'Calculated: Price × Shares',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'market',
  },

  // ===========================================================================
  // BALANCE SHEET - ASSETS (Point-in-Time)
  // ===========================================================================
  {
    key: 'totalAssets',
    label: 'Assets',
    xbrl: 'us-gaap:Assets',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'bs-assets',
  },
  {
    key: 'cashAndDueFromBanks',
    label: 'Cash',
    xbrl: 'us-gaap:CashAndDueFromBanks',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'bs-assets',
  },
  {
    key: 'interestBearingDepositsInBanks',
    label: 'IB Deposits',
    xbrl: 'us-gaap:InterestBearingDepositsInBanks',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'bs-assets',
  },
  {
    key: 'afsSecurities',
    label: 'AFS Sec',
    xbrl: 'us-gaap:AvailableForSaleSecuritiesDebt',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'bs-assets',
  },
  {
    key: 'htmSecurities',
    label: 'HTM Sec',
    xbrl: 'us-gaap:HeldToMaturitySecurities',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'bs-assets',
  },
  {
    key: 'loans',
    label: 'Loans',
    xbrl: 'us-gaap:LoansAndLeasesReceivableNetReportedAmount',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'bs-assets',
  },
  {
    key: 'allowanceForCreditLosses',
    label: 'ALLL',
    xbrl: 'us-gaap:AllowanceForLoanAndLeaseLosses',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'bs-assets',
  },
  {
    key: 'premisesAndEquipment',
    label: 'PP&E',
    xbrl: 'us-gaap:PremisesAndEquipmentNet',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'bs-assets',
  },

  // ===========================================================================
  // BALANCE SHEET - LIABILITIES & EQUITY (Point-in-Time)
  // ===========================================================================
  {
    key: 'totalLiabilities',
    label: 'Liabilities',
    xbrl: 'us-gaap:Liabilities',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'bs-liab',
  },
  {
    key: 'totalDeposits',
    label: 'Deposits',
    xbrl: 'us-gaap:Deposits',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'bs-liab',
  },
  {
    key: 'shortTermBorrowings',
    label: 'ST Borrow',
    xbrl: 'us-gaap:ShortTermBorrowings',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'bs-liab',
  },
  {
    key: 'longTermDebt',
    label: 'LT Debt',
    xbrl: 'us-gaap:LongTermDebt',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'bs-liab',
  },
  {
    key: 'totalEquity',
    label: 'Equity',
    xbrl: 'us-gaap:StockholdersEquity',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'bs-liab',
  },
  {
    key: 'goodwill',
    label: 'Goodwill',
    xbrl: 'us-gaap:Goodwill',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'bs-liab',
  },
  {
    key: 'intangibles',
    label: 'Intang',
    xbrl: 'us-gaap:IntangibleAssetsNetExcludingGoodwill',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'bs-liab',
  },

  // ===========================================================================
  // INCOME STATEMENT (TTM)
  // ===========================================================================
  {
    key: 'ttmInterestIncome',
    label: 'Int Inc',
    xbrl: 'us-gaap:InterestIncome',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'income',
  },
  {
    key: 'ttmInterestExpense',
    label: 'Int Exp',
    xbrl: 'us-gaap:InterestExpense',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'income',
  },
  {
    key: 'ttmNetInterestIncome',
    label: 'NII',
    xbrl: 'us-gaap:NetInterestIncome',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'income',
  },
  {
    key: 'ttmNoninterestIncome',
    label: 'NonInt Inc',
    xbrl: 'us-gaap:NoninterestIncome',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'income',
  },
  {
    key: 'ttmNoninterestExpense',
    label: 'NonInt Exp',
    xbrl: 'us-gaap:NoninterestExpense',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'income',
  },
  {
    key: 'ttmProvisionForCreditLosses',
    label: 'Provision',
    xbrl: 'us-gaap:ProvisionForLoanAndLeaseLosses',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'income',
  },
  {
    key: 'ttmPreTaxIncome',
    label: 'Pre-Tax',
    xbrl: 'us-gaap:IncomeLossFromContinuingOperationsBeforeIncomeTaxes',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'income',
  },
  {
    key: 'ttmNetIncome',
    label: 'Net Inc',
    xbrl: 'us-gaap:NetIncomeLoss',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'income',
  },

  // ===========================================================================
  // CASH FLOW (TTM)
  // ===========================================================================
  {
    key: 'ttmOperatingCashFlow',
    label: 'Op CF',
    xbrl: 'us-gaap:NetCashProvidedByUsedInOperatingActivities',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
    group: 'cashflow',
  },

  // ===========================================================================
  // PER-SHARE DATA
  // ===========================================================================
  {
    key: 'sharesOutstanding',
    label: 'Shares',
    xbrl: 'dei:EntityCommonStockSharesOutstanding',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, abbreviate: true }),
    group: 'per-share',
  },
  {
    key: 'bvps',
    label: 'BVPS',
    xbrl: 'Calculated: Equity ÷ Shares',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 2, prefix: '$' }),
    group: 'per-share',
  },
  {
    key: 'tbvps',
    label: 'TBVPS',
    xbrl: 'Calculated: (Equity - Goodwill - Intangibles) ÷ Shares',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 2, prefix: '$' }),
    group: 'per-share',
  },
  {
    key: 'ttmEps',
    label: 'EPS',
    xbrl: 'us-gaap:EarningsPerShareBasic',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 2, prefix: '$' }),
    group: 'per-share',
  },
  {
    key: 'ttmDividendPerShare',
    label: 'DPS',
    xbrl: 'us-gaap:CommonStockDividendsPerShareDeclared',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 2, prefix: '$' }),
    group: 'per-share',
  },

  // ===========================================================================
  // VALUATION
  // ===========================================================================
  {
    key: 'pni',
    label: 'P/E',
    xbrl: 'Calculated: Mkt Cap ÷ Net Income',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 2 }),
    group: 'valuation',
  },
  {
    key: 'ptbvps',
    label: 'P/TBV',
    xbrl: 'Calculated: Price ÷ TBVPS',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 2 }),
    group: 'valuation',
  },

  // ===========================================================================
  // PERFORMANCE RATIOS
  // ===========================================================================
  {
    key: 'roe',
    label: 'RoE',
    xbrl: 'Calculated: Net Income ÷ Equity',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, suffix: '%' }),
    group: 'performance',
  },
  {
    key: 'roaa',
    label: 'ROAA',
    xbrl: 'Calculated: Net Income ÷ Avg Assets',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 2, suffix: '%' }),
    group: 'performance',
  },
  {
    key: 'rota',
    label: 'RoTA',
    xbrl: 'Calculated: Net Income ÷ Tangible Assets',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 2, suffix: '%' }),
    group: 'performance',
  },
  {
    key: 'rotce',
    label: 'ROTCE',
    xbrl: 'Calculated: Net Income ÷ TCE',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, suffix: '%' }),
    group: 'performance',
  },

  // ===========================================================================
  // BANK-SPECIFIC RATIOS
  // ===========================================================================
  {
    key: 'efficiencyRatio',
    label: 'Efficiency',
    xbrl: 'Calculated: NonInt Exp ÷ (NII + NonInt Inc)',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, suffix: '%' }),
    group: 'bank-ratios',
  },
  {
    key: 'depositsToAssets',
    label: 'Dep/Assets',
    xbrl: 'Calculated: Deposits ÷ Assets',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, suffix: '%' }),
    group: 'bank-ratios',
  },
  {
    key: 'equityToAssets',
    label: 'Eq/Assets',
    xbrl: 'Calculated: Equity ÷ Assets',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, suffix: '%' }),
    group: 'bank-ratios',
  },
  {
    key: 'tceToTa',
    label: 'TCE/TA',
    xbrl: 'Calculated: TCE ÷ Tangible Assets',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, suffix: '%' }),
    group: 'bank-ratios',
  },

  // ===========================================================================
  // DIVIDENDS
  // ===========================================================================
  {
    key: 'dividendPayoutRatio',
    label: 'Payout',
    xbrl: 'Calculated: DPS ÷ EPS',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, suffix: '%' }),
    group: 'dividends',
  },

  // ===========================================================================
  // GRAHAM VALUE INVESTING
  // ===========================================================================
  {
    key: 'grahamNum',
    label: 'Graham #',
    xbrl: 'Calculated: √(22.5 × EPS × BVPS)',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 2, prefix: '$' }),
    group: 'graham',
  },
  {
    key: 'grahamMoSPct',
    label: 'MoS %',
    xbrl: 'Calculated: (Graham# - Price) ÷ Price',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, suffix: '%' }),
    group: 'graham',
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
                title={column.xbrl || column.label}
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

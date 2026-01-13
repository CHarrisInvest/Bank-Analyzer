import React, { useState, useMemo } from 'react';
import { formatNumber } from '../utils/csv.js';

/**
 * Table column configuration
 */
const COLUMNS = [
  {
    key: 'ticker',
    label: 'Ticker',
    sortable: true,
    align: 'left',
    format: (value) => value || '-',
  },
  {
    key: 'bankName',
    label: 'Bank Name',
    sortable: true,
    align: 'left',
    format: (value) => value || '-',
    className: 'col-bank-name',
  },
  {
    key: 'exchange',
    label: 'Exchange',
    sortable: true,
    align: 'center',
    format: (value) => value || '-',
  },
  {
    key: 'price',
    label: 'Price',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 2, prefix: '$' }),
  },
  {
    key: 'marketCap',
    label: 'Market Cap',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, prefix: '$', abbreviate: true }),
  },
  {
    key: 'pni',
    label: 'P/NI',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 2 }),
  },
  {
    key: 'ptbvps',
    label: 'P/TBVPS',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 2 }),
  },
  {
    key: 'bvps',
    label: 'BVPS',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 2, prefix: '$' }),
  },
  {
    key: 'tbvps',
    label: 'TBVPS',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 2, prefix: '$' }),
  },
  {
    key: 'roe',
    label: 'RoE',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, suffix: '%' }),
  },
  {
    key: 'roaa',
    label: 'ROAA',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 2, suffix: '%' }),
  },
  {
    key: 'rota',
    label: 'RoTA',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 2, suffix: '%' }),
  },
  {
    key: 'rotce',
    label: 'ROTCE',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, suffix: '%' }),
  },
  {
    key: 'grahamNum',
    label: 'Graham #',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 2, prefix: '$' }),
  },
  {
    key: 'grahamMoS',
    label: 'Graham MoS',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 2, prefix: '$' }),
  },
  {
    key: 'grahamMoSPct',
    label: 'MoS %',
    sortable: true,
    align: 'right',
    format: (value) => formatNumber(value, { decimals: 1, suffix: '%' }),
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

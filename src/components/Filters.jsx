import React, { useState } from 'react';

/**
 * Collapsible filter section component
 */
function FilterSection({ title, children, defaultOpen = true, badge = null }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`filters-section ${isOpen ? 'open' : 'collapsed'}`}>
      <button
        type="button"
        className="filters-section-header"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="filters-section-title">{title}</span>
        {badge && <span className="filters-section-badge">{badge}</span>}
        <svg
          className={`filters-section-chevron ${isOpen ? 'open' : ''}`}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {isOpen && <div className="filters-section-content">{children}</div>}
    </div>
  );
}

/**
 * Filter range input component for numeric filters
 */
function RangeFilter({ label, minValue, maxValue, minPlaceholder, maxPlaceholder, onChange, unit, compact = false }) {
  return (
    <div className={`filter-group ${compact ? 'compact' : ''}`}>
      <label className="filter-label">
        {label}
        {unit && <span className="filter-unit">({unit})</span>}
      </label>
      <div className="filter-range">
        <input
          type="number"
          className="filter-input"
          placeholder={minPlaceholder || 'Min'}
          value={minValue}
          onChange={(e) => onChange('min', e.target.value)}
          step="any"
        />
        <span className="filter-range-separator">-</span>
        <input
          type="number"
          className="filter-input"
          placeholder={maxPlaceholder || 'Max'}
          value={maxValue}
          onChange={(e) => onChange('max', e.target.value)}
          step="any"
        />
      </div>
    </div>
  );
}

/**
 * Single minimum value filter
 */
function MinFilter({ label, value, placeholder, onChange, unit }) {
  return (
    <div className="filter-group">
      <label className="filter-label">
        {label}
        {unit && <span className="filter-unit">({unit})</span>}
      </label>
      <div className="filter-single">
        <input
          type="number"
          className="filter-input"
          placeholder={placeholder || 'Min'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          step="any"
        />
      </div>
    </div>
  );
}

/**
 * Exchange multi-select filter
 */
function ExchangeFilter({ exchanges, selectedExchanges, onChange }) {
  const handleToggle = (exchange) => {
    const newSelected = selectedExchanges.includes(exchange)
      ? selectedExchanges.filter((e) => e !== exchange)
      : [...selectedExchanges, exchange];
    onChange(newSelected);
  };

  const handleSelectAll = () => {
    onChange([...exchanges]);
  };

  const handleClearAll = () => {
    onChange([]);
  };

  return (
    <div className="filter-group filter-group-exchange">
      <label className="filter-label">Exchange</label>
      <div className="exchange-options">
        {exchanges.map((exchange) => (
          <label key={exchange} className="exchange-checkbox">
            <input
              type="checkbox"
              checked={selectedExchanges.includes(exchange)}
              onChange={() => handleToggle(exchange)}
            />
            <span className="exchange-name">{exchange}</span>
          </label>
        ))}
      </div>
      <div className="exchange-actions">
        <button type="button" className="exchange-action-btn" onClick={handleSelectAll}>
          All
        </button>
        <button type="button" className="exchange-action-btn" onClick={handleClearAll}>
          None
        </button>
      </div>
    </div>
  );
}

/**
 * Filters Component
 * Provides all filtering controls for the bank screener
 *
 * Filter categories organized intuitively:
 * - Quick Filters: Security Type, Exchange
 * - Size: Market Cap, Total Assets
 * - Valuation: P/E, P/TBV
 * - Profitability: RoE, ROAA, RoTA, ROTCE
 * - Balance Sheet: Equity/Assets, TCE/TA, Deposits/Assets
 * - Income & Efficiency: Efficiency Ratio, Net Interest Margin
 * - Dividends: TTM Dividend, Payout Ratio
 * - Value Investing: Graham Margin of Safety
 */
function Filters({ filters, exchanges, onFilterChange, onReset }) {
  /**
   * Handle range filter change
   */
  const handleRangeChange = (filterKey) => (type, value) => {
    const numValue = value === '' ? '' : parseFloat(value);
    onFilterChange({
      ...filters,
      [filterKey]: {
        ...filters[filterKey],
        [type]: isNaN(numValue) ? '' : numValue,
      },
    });
  };

  /**
   * Handle single value filter change
   */
  const handleSingleChange = (filterKey) => (value) => {
    const numValue = value === '' ? '' : parseFloat(value);
    onFilterChange({
      ...filters,
      [filterKey]: isNaN(numValue) ? '' : numValue,
    });
  };

  /**
   * Handle exchange selection change
   */
  const handleExchangeChange = (selectedExchanges) => {
    onFilterChange({
      ...filters,
      exchanges: selectedExchanges,
    });
  };

  /**
   * Count active filters in a section
   */
  const countActiveFilters = (filterKeys) => {
    return filterKeys.reduce((count, key) => {
      const filter = filters[key];
      if (filter === undefined || filter === null) return count;
      if (typeof filter === 'object') {
        if ((filter.min !== '' && filter.min !== undefined) || (filter.max !== '' && filter.max !== undefined)) {
          return count + 1;
        }
      } else if (filter !== '' && filter !== 'all') {
        return count + 1;
      }
      return count;
    }, 0);
  };

  return (
    <div className="filters">
      <div className="filters-header">
        <h2>Filters</h2>
        <button className="reset-btn" onClick={onReset} type="button">
          Reset All
        </button>
      </div>

      <div className="filters-content">
        {/* QUICK FILTERS */}
        <FilterSection
          title="Quick Filters"
          defaultOpen={true}
          badge={countActiveFilters(['exchanges']) || null}
        >
          <ExchangeFilter
            exchanges={exchanges}
            selectedExchanges={filters.exchanges || []}
            onChange={handleExchangeChange}
          />
        </FilterSection>

        {/* SIZE & SCALE */}
        <FilterSection
          title="Size & Scale"
          defaultOpen={false}
          badge={countActiveFilters(['marketCap', 'totalAssets', 'totalDeposits']) || null}
        >
          <RangeFilter
            label="Market Cap"
            minValue={filters.marketCap?.min ?? ''}
            maxValue={filters.marketCap?.max ?? ''}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            onChange={handleRangeChange('marketCap')}
            unit="$M"
          />
          <RangeFilter
            label="Total Assets"
            minValue={filters.totalAssets?.min ?? ''}
            maxValue={filters.totalAssets?.max ?? ''}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            onChange={handleRangeChange('totalAssets')}
            unit="$M"
          />
          <RangeFilter
            label="Total Deposits"
            minValue={filters.totalDeposits?.min ?? ''}
            maxValue={filters.totalDeposits?.max ?? ''}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            onChange={handleRangeChange('totalDeposits')}
            unit="$M"
          />
        </FilterSection>

        {/* BALANCE SHEET - ASSETS */}
        <FilterSection
          title="Balance Sheet - Assets"
          defaultOpen={false}
          badge={countActiveFilters(['cashAndCashEquivalents', 'loans']) || null}
        >
          <RangeFilter
            label="Cash & Cash Equivalents"
            minValue={filters.cashAndCashEquivalents?.min ?? ''}
            maxValue={filters.cashAndCashEquivalents?.max ?? ''}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            onChange={handleRangeChange('cashAndCashEquivalents')}
            unit="$M"
          />
          <RangeFilter
            label="Loans & Leases"
            minValue={filters.loans?.min ?? ''}
            maxValue={filters.loans?.max ?? ''}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            onChange={handleRangeChange('loans')}
            unit="$M"
          />
        </FilterSection>

        {/* BALANCE SHEET - LIABILITIES */}
        <FilterSection
          title="Balance Sheet - Liabilities"
          defaultOpen={false}
          badge={countActiveFilters(['totalLiabilities', 'totalEquity']) || null}
        >
          <RangeFilter
            label="Total Liabilities"
            minValue={filters.totalLiabilities?.min ?? ''}
            maxValue={filters.totalLiabilities?.max ?? ''}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            onChange={handleRangeChange('totalLiabilities')}
            unit="$M"
          />
          <RangeFilter
            label="Total Equity"
            minValue={filters.totalEquity?.min ?? ''}
            maxValue={filters.totalEquity?.max ?? ''}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            onChange={handleRangeChange('totalEquity')}
            unit="$M"
          />
        </FilterSection>

        {/* VALUATION */}
        <FilterSection
          title="Valuation"
          defaultOpen={true}
          badge={countActiveFilters(['pni']) || null}
        >
          <RangeFilter
            label="P/E Ratio"
            minValue={filters.pni?.min ?? ''}
            maxValue={filters.pni?.max ?? ''}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            onChange={handleRangeChange('pni')}
          />
        </FilterSection>

        {/* PROFITABILITY */}
        <FilterSection
          title="Profitability"
          defaultOpen={true}
          badge={countActiveFilters(['roe', 'roaa']) || null}
        >
          <RangeFilter
            label="Return on Equity (RoE)"
            minValue={filters.roe?.min ?? ''}
            maxValue={filters.roe?.max ?? ''}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            onChange={handleRangeChange('roe')}
            unit="%"
          />
          <RangeFilter
            label="Return on Avg Assets (ROAA)"
            minValue={filters.roaa?.min ?? ''}
            maxValue={filters.roaa?.max ?? ''}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            onChange={handleRangeChange('roaa')}
            unit="%"
          />
        </FilterSection>

        {/* CAPITAL & LEVERAGE */}
        <FilterSection
          title="Capital & Leverage"
          defaultOpen={false}
          badge={countActiveFilters(['equityToAssets', 'depositsToAssets']) || null}
        >
          <RangeFilter
            label="Equity/Assets"
            minValue={filters.equityToAssets?.min ?? ''}
            maxValue={filters.equityToAssets?.max ?? ''}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            onChange={handleRangeChange('equityToAssets')}
            unit="%"
          />
          <RangeFilter
            label="Deposits/Assets"
            minValue={filters.depositsToAssets?.min ?? ''}
            maxValue={filters.depositsToAssets?.max ?? ''}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            onChange={handleRangeChange('depositsToAssets')}
            unit="%"
          />
        </FilterSection>

        {/* EFFICIENCY & OPERATIONS */}
        <FilterSection
          title="Efficiency"
          defaultOpen={false}
          badge={countActiveFilters(['efficiencyRatio']) || null}
        >
          <RangeFilter
            label="Efficiency Ratio"
            minValue={filters.efficiencyRatio?.min ?? ''}
            maxValue={filters.efficiencyRatio?.max ?? ''}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            onChange={handleRangeChange('efficiencyRatio')}
            unit="%"
          />
          <div className="filter-help">
            Lower efficiency ratio is better (typical: 50-70%)
          </div>
        </FilterSection>

        {/* BOOK VALUE */}
        <FilterSection
          title="Book Value"
          defaultOpen={false}
          badge={countActiveFilters(['bvps']) || null}
        >
          <RangeFilter
            label="Book Value Per Share"
            minValue={filters.bvps?.min ?? ''}
            maxValue={filters.bvps?.max ?? ''}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            onChange={handleRangeChange('bvps')}
            unit="$"
          />
        </FilterSection>

        {/* DIVIDENDS */}
        <FilterSection
          title="Dividends"
          defaultOpen={false}
          badge={countActiveFilters(['ttmDividend', 'dividendPayoutRatio']) || null}
        >
          <RangeFilter
            label="TTM Dividend Per Share"
            minValue={filters.ttmDividend?.min ?? ''}
            maxValue={filters.ttmDividend?.max ?? ''}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            onChange={handleRangeChange('ttmDividend')}
            unit="$/share"
          />
          <RangeFilter
            label="Dividend Payout Ratio"
            minValue={filters.dividendPayoutRatio?.min ?? ''}
            maxValue={filters.dividendPayoutRatio?.max ?? ''}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            onChange={handleRangeChange('dividendPayoutRatio')}
            unit="%"
          />
        </FilterSection>

        {/* VALUE INVESTING */}
        <FilterSection
          title="Value Investing"
          defaultOpen={false}
          badge={countActiveFilters(['grahamMoS']) || null}
        >
          <MinFilter
            label="Graham Margin of Safety"
            value={filters.grahamMoS ?? ''}
            placeholder="Min %"
            onChange={handleSingleChange('grahamMoS')}
            unit="%"
          />
          <div className="filter-help">
            Graham Number = sqrt(22.5 x EPS x BVPS). MoS% = (Graham# - Price) / Price
          </div>
        </FilterSection>

        {/* INCOME STATEMENT */}
        <FilterSection
          title="Income Statement"
          defaultOpen={false}
          badge={countActiveFilters(['ttmNetIncome', 'ttmNetInterestIncome']) || null}
        >
          <RangeFilter
            label="TTM Net Income"
            minValue={filters.ttmNetIncome?.min ?? ''}
            maxValue={filters.ttmNetIncome?.max ?? ''}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            onChange={handleRangeChange('ttmNetIncome')}
            unit="$M"
          />
          <RangeFilter
            label="TTM Net Interest Income"
            minValue={filters.ttmNetInterestIncome?.min ?? ''}
            maxValue={filters.ttmNetInterestIncome?.max ?? ''}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            onChange={handleRangeChange('ttmNetInterestIncome')}
            unit="$M"
          />
        </FilterSection>

        {/* PER-SHARE METRICS */}
        <FilterSection
          title="Per-Share Metrics"
          defaultOpen={false}
          badge={countActiveFilters(['ttmEps', 'sharesOutstanding']) || null}
        >
          <RangeFilter
            label="TTM Earnings Per Share"
            minValue={filters.ttmEps?.min ?? ''}
            maxValue={filters.ttmEps?.max ?? ''}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            onChange={handleRangeChange('ttmEps')}
            unit="$"
          />
          <RangeFilter
            label="Shares Outstanding"
            minValue={filters.sharesOutstanding?.min ?? ''}
            maxValue={filters.sharesOutstanding?.max ?? ''}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            onChange={handleRangeChange('sharesOutstanding')}
            unit="M"
          />
        </FilterSection>
      </div>
    </div>
  );
}

export default Filters;

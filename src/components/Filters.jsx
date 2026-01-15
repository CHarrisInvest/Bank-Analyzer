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
 * Security Type Filter
 * Allows filtering by common shares vs exchange-traded securities (preferred, debt)
 */
function SecurityTypeFilter({ value, onChange }) {
  const options = [
    { value: 'all', label: 'All' },
    { value: 'common', label: 'Common' },
    { value: 'exchange-traded', label: 'Non-Common' },
  ];

  return (
    <div className="filter-group">
      <label className="filter-label">Security Type</label>
      <div className="filter-button-group">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={`filter-button ${value === option.value ? 'active' : ''}`}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
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
   * Handle string filter change (for select dropdowns)
   */
  const handleSelectChange = (filterKey) => (value) => {
    onFilterChange({
      ...filters,
      [filterKey]: value,
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
          badge={countActiveFilters(['securityType', 'exchanges']) || null}
        >
          <SecurityTypeFilter
            value={filters.securityType || 'all'}
            onChange={handleSelectChange('securityType')}
          />
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

        {/* VALUATION */}
        <FilterSection
          title="Valuation"
          defaultOpen={true}
          badge={countActiveFilters(['pni', 'ptbvps']) || null}
        >
          <RangeFilter
            label="P/E Ratio"
            minValue={filters.pni?.min ?? ''}
            maxValue={filters.pni?.max ?? ''}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            onChange={handleRangeChange('pni')}
          />
          <RangeFilter
            label="Price/TBV"
            minValue={filters.ptbvps?.min ?? ''}
            maxValue={filters.ptbvps?.max ?? ''}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            onChange={handleRangeChange('ptbvps')}
          />
        </FilterSection>

        {/* PROFITABILITY */}
        <FilterSection
          title="Profitability"
          defaultOpen={true}
          badge={countActiveFilters(['roe', 'roaa', 'rota', 'rotce']) || null}
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
          <RangeFilter
            label="Return on Tang Assets (RoTA)"
            minValue={filters.rota?.min ?? ''}
            maxValue={filters.rota?.max ?? ''}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            onChange={handleRangeChange('rota')}
            unit="%"
          />
          <RangeFilter
            label="Return on TCE (ROTCE)"
            minValue={filters.rotce?.min ?? ''}
            maxValue={filters.rotce?.max ?? ''}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            onChange={handleRangeChange('rotce')}
            unit="%"
          />
        </FilterSection>

        {/* CAPITAL & LEVERAGE */}
        <FilterSection
          title="Capital & Leverage"
          defaultOpen={false}
          badge={countActiveFilters(['equityToAssets', 'tceToTa', 'depositsToAssets']) || null}
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
            label="TCE/Tangible Assets"
            minValue={filters.tceToTa?.min ?? ''}
            maxValue={filters.tceToTa?.max ?? ''}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            onChange={handleRangeChange('tceToTa')}
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
          badge={countActiveFilters(['bvps', 'tbvps']) || null}
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
          <RangeFilter
            label="Tangible BV Per Share"
            minValue={filters.tbvps?.min ?? ''}
            maxValue={filters.tbvps?.max ?? ''}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            onChange={handleRangeChange('tbvps')}
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

import React from 'react';

/**
 * Filter range input component for numeric filters
 */
function RangeFilter({ label, minValue, maxValue, minPlaceholder, maxPlaceholder, onChange, unit }) {
  return (
    <div className="filter-group">
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
        <span className="filter-range-separator">to</span>
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
 *
 * Options:
 * - "all": Show all securities (default)
 * - "common": Only common shares
 * - "exchange-traded": Only exchange-traded securities (preferred, debt)
 */
function SecurityTypeFilter({ value, onChange }) {
  const options = [
    { value: 'all', label: 'All' },
    { value: 'common', label: 'Common Shares' },
    { value: 'exchange-traded', label: 'Exchange-Traded Securities' },
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
      <div className="filter-help">
        Exchange-traded includes preferred stock and debt securities
      </div>
    </div>
  );
}

/**
 * Filters Component
 * Provides all filtering controls for the bank screener
 *
 * Filter categories:
 * - Valuation: P/NI, P-TBV, Market Cap
 * - Performance: RoE, ROAA, RoTA, ROTCE, Graham MoS
 * - Book Value: BVPS, TBVPS
 * - Dividends: TTM Dividend, Dividend Payout Ratio
 * - Bank Ratios: Efficiency, Deposits/Assets, Equity/Assets, TCE/TA
 * - Classification: Security Type, Exchange
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

  return (
    <div className="filters">
      <div className="filters-header">
        <h2>Filters</h2>
        <button className="reset-btn" onClick={onReset} type="button">
          Reset All
        </button>
      </div>

      <div className="filters-content">
        <div className="filters-section">
          <h3 className="filters-section-title">Classification</h3>

          <SecurityTypeFilter
            value={filters.securityType || 'all'}
            onChange={handleSelectChange('securityType')}
          />
        </div>

        <div className="filters-section">
          <h3 className="filters-section-title">Valuation</h3>

          <RangeFilter
            label="P/NI"
            minValue={filters.pni?.min ?? ''}
            maxValue={filters.pni?.max ?? ''}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            onChange={handleRangeChange('pni')}
          />

          <RangeFilter
            label="P-TBV"
            minValue={filters.ptbvps?.min ?? ''}
            maxValue={filters.ptbvps?.max ?? ''}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            onChange={handleRangeChange('ptbvps')}
          />

          <RangeFilter
            label="Market Cap"
            minValue={filters.marketCap?.min ?? ''}
            maxValue={filters.marketCap?.max ?? ''}
            minPlaceholder="Min ($M)"
            maxPlaceholder="Max ($M)"
            onChange={handleRangeChange('marketCap')}
            unit="$M"
          />
        </div>

        <div className="filters-section">
          <h3 className="filters-section-title">Performance</h3>

          <RangeFilter
            label="RoE"
            minValue={filters.roe?.min ?? ''}
            maxValue={filters.roe?.max ?? ''}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            onChange={handleRangeChange('roe')}
            unit="%"
          />

          <RangeFilter
            label="ROAA"
            minValue={filters.roaa?.min ?? ''}
            maxValue={filters.roaa?.max ?? ''}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            onChange={handleRangeChange('roaa')}
            unit="%"
          />

          <RangeFilter
            label="RoTA"
            minValue={filters.rota?.min ?? ''}
            maxValue={filters.rota?.max ?? ''}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            onChange={handleRangeChange('rota')}
            unit="%"
          />

          <RangeFilter
            label="ROTCE"
            minValue={filters.rotce?.min ?? ''}
            maxValue={filters.rotce?.max ?? ''}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            onChange={handleRangeChange('rotce')}
            unit="%"
          />

          <MinFilter
            label="Graham Margin of Safety"
            value={filters.grahamMoS ?? ''}
            placeholder="Min %"
            onChange={handleSingleChange('grahamMoS')}
            unit="%"
          />
        </div>

        <div className="filters-section">
          <h3 className="filters-section-title">Book Value</h3>

          <RangeFilter
            label="BVPS"
            minValue={filters.bvps?.min ?? ''}
            maxValue={filters.bvps?.max ?? ''}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            onChange={handleRangeChange('bvps')}
            unit="$"
          />

          <RangeFilter
            label="TBVPS"
            minValue={filters.tbvps?.min ?? ''}
            maxValue={filters.tbvps?.max ?? ''}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            onChange={handleRangeChange('tbvps')}
            unit="$"
          />
        </div>

        <div className="filters-section">
          <h3 className="filters-section-title">Dividends</h3>

          <RangeFilter
            label="TTM Dividend"
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
        </div>

        <div className="filters-section">
          <h3 className="filters-section-title">Bank Ratios</h3>

          <RangeFilter
            label="Efficiency Ratio"
            minValue={filters.efficiencyRatio?.min ?? ''}
            maxValue={filters.efficiencyRatio?.max ?? ''}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            onChange={handleRangeChange('efficiencyRatio')}
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
            label="TCE/TA"
            minValue={filters.tceToTa?.min ?? ''}
            maxValue={filters.tceToTa?.max ?? ''}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            onChange={handleRangeChange('tceToTa')}
            unit="%"
          />
        </div>

        <div className="filters-section">
          <h3 className="filters-section-title">Listing</h3>

          <ExchangeFilter
            exchanges={exchanges}
            selectedExchanges={filters.exchanges || []}
            onChange={handleExchangeChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Filters;

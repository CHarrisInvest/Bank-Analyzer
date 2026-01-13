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
 * Filters Component
 * Provides all filtering controls for the bank screener
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

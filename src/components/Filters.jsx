import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';

/**
 * Preset filter configurations
 */
const FILTER_PRESETS = [
  {
    id: 'value-picks',
    name: 'Value Picks',
    description: 'Banks trading below Graham value with good profitability',
    filters: {
      grahamMoS: 20,
      roe: { min: 8, max: '' },
      pni: { min: '', max: 15 },
    },
  },
  {
    id: 'high-yield',
    name: 'High Yield',
    description: 'Banks with strong dividend yields and sustainable payouts',
    filters: {
      ttmDividend: { min: 1, max: '' },
      dividendPayoutRatio: { min: '', max: 70 },
      roe: { min: 5, max: '' },
    },
  },
  {
    id: 'large-cap-quality',
    name: 'Large Cap Quality',
    description: 'Large banks with strong fundamentals',
    filters: {
      marketCap: { min: 5000, max: '' },
      roe: { min: 10, max: '' },
      efficiencyRatio: { min: '', max: 65 },
    },
  },
  {
    id: 'small-cap-efficient',
    name: 'Small Cap Efficient',
    description: 'Smaller banks with excellent efficiency',
    filters: {
      marketCap: { min: '', max: 1000 },
      efficiencyRatio: { min: '', max: 60 },
      roaa: { min: 0.8, max: '' },
    },
  },
  {
    id: 'strong-capital',
    name: 'Strong Capital',
    description: 'Well-capitalized banks',
    filters: {
      equityToAssets: { min: 10, max: '' },
      roe: { min: 5, max: '' },
    },
  },
];

/**
 * Collapsible filter section component
 */
function FilterSection({ title, children, defaultOpen = false, badge = null }) {
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
 * Prevent scroll wheel from changing number input values
 */
const preventWheelChange = (e) => {
  e.target.blur();
};

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
          onWheel={preventWheelChange}
        />
        <span className="filter-range-separator">-</span>
        <input
          type="number"
          className="filter-input"
          placeholder={maxPlaceholder || 'Max'}
          value={maxValue}
          onChange={(e) => onChange('max', e.target.value)}
          onWheel={preventWheelChange}
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
          onWheel={preventWheelChange}
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
 * Search input for ticker/name filtering (compact version for header)
 * Features:
 * - Keyboard shortcut: "/" to focus (when not in an input)
 * - Recent searches stored in localStorage (expandable)
 */
const RECENT_SEARCHES_KEY = 'banksift_recentSearches';
const MAX_RECENT_SEARCHES = 15;
const DEFAULT_VISIBLE_RECENT = 5;

function SearchFilter({ value, onChange }) {
  const inputRef = useRef(null);
  const [showRecent, setShowRecent] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const saved = localStorage.getItem(RECENT_SEARCHES_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Global keyboard shortcut: "/" to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      // "/" to focus search (when not already in an input/textarea)
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      // Escape to blur and close dropdown
      if (e.key === 'Escape' && document.activeElement === inputRef.current) {
        inputRef.current?.blur();
        setShowRecent(false);
        setIsExpanded(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Save search to recent when user finishes typing (on blur with value)
  const handleBlur = useCallback(() => {
    // Delay to allow clicking on recent items
    setTimeout(() => {
      setShowRecent(false);
      setIsExpanded(false);
      if (value && value.trim()) {
        const trimmed = value.trim();
        setRecentSearches((prev) => {
          const filtered = prev.filter((s) => s.toLowerCase() !== trimmed.toLowerCase());
          const updated = [trimmed, ...filtered].slice(0, MAX_RECENT_SEARCHES);
          localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
          return updated;
        });
      }
    }, 150);
  }, [value]);

  const handleFocus = useCallback(() => {
    if (recentSearches.length > 0) {
      setShowRecent(true);
    }
  }, [recentSearches.length]);

  const handleRecentClick = useCallback((search) => {
    onChange(search);
    setShowRecent(false);
    setIsExpanded(false);
    inputRef.current?.blur();
  }, [onChange]);

  const clearRecentSearches = useCallback((e) => {
    e.stopPropagation();
    setRecentSearches([]);
    localStorage.removeItem(RECENT_SEARCHES_KEY);
    setShowRecent(false);
    setIsExpanded(false);
  }, []);

  const toggleExpanded = useCallback((e) => {
    e.stopPropagation();
    setIsExpanded((prev) => !prev);
  }, []);

  const visibleSearches = isExpanded
    ? recentSearches
    : recentSearches.slice(0, DEFAULT_VISIBLE_RECENT);
  const hasMore = recentSearches.length > DEFAULT_VISIBLE_RECENT;

  return (
    <div className="filter-search">
      <svg
        className="filter-search-icon"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
      <input
        ref={inputRef}
        type="text"
        className="filter-search-input"
        placeholder="Search banks…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {!value && (
        <span className="filter-search-shortcut" title="Press / to search">/</span>
      )}
      {value && (
        <button
          type="button"
          className="filter-search-clear"
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
      {showRecent && recentSearches.length > 0 && !value && (
        <div className="filter-search-recent">
          <div className="filter-search-recent-header">
            <span>Recent</span>
            <button type="button" onClick={clearRecentSearches}>Clear</button>
          </div>
          {visibleSearches.map((search, i) => (
            <button
              key={i}
              type="button"
              className="filter-search-recent-item"
              onMouseDown={() => handleRecentClick(search)}
            >
              {search}
            </button>
          ))}
          {hasMore && (
            <button
              type="button"
              className="filter-search-recent-toggle"
              onMouseDown={toggleExpanded}
            >
              {isExpanded ? 'Show less' : `Show ${recentSearches.length - DEFAULT_VISIBLE_RECENT} more`}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Filter presets dropdown
 */
function FilterPresets({ onApplyPreset, onSavePreset, currentFilters }) {
  const [isOpen, setIsOpen] = useState(false);
  const [savedPresets, setSavedPresets] = useState(() => {
    try {
      const saved = localStorage.getItem('banksift_filterPresets');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [newPresetName, setNewPresetName] = useState('');

  // Save presets to localStorage when they change
  useEffect(() => {
    localStorage.setItem('banksift_filterPresets', JSON.stringify(savedPresets));
  }, [savedPresets]);

  const handleSavePreset = () => {
    if (!newPresetName.trim()) return;

    const newPreset = {
      id: `custom-${Date.now()}`,
      name: newPresetName.trim(),
      description: 'Custom saved preset',
      filters: currentFilters,
      isCustom: true,
    };

    setSavedPresets((prev) => [...prev, newPreset]);
    setNewPresetName('');
    setShowSaveDialog(false);
  };

  const handleDeletePreset = (presetId) => {
    setSavedPresets((prev) => prev.filter((p) => p.id !== presetId));
  };

  const allPresets = [...FILTER_PRESETS, ...savedPresets];

  return (
    <div className="filter-presets">
      <div className="filter-presets-header">
        <button
          type="button"
          className="presets-dropdown-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
          </svg>
          Presets
          <svg
            className={`presets-chevron ${isOpen ? 'open' : ''}`}
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </button>
        <button
          type="button"
          className="save-preset-btn"
          onClick={() => setShowSaveDialog(true)}
          title="Save current filters as preset"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            <polyline points="17 21 17 13 7 13 7 21" />
            <polyline points="7 3 7 8 15 8" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="presets-dropdown">
          {allPresets.map((preset) => (
            <div key={preset.id} className="preset-item">
              <button
                type="button"
                className="preset-apply-btn"
                onClick={() => {
                  onApplyPreset(preset.filters);
                  setIsOpen(false);
                }}
              >
                <span className="preset-name">{preset.name}</span>
                <span className="preset-description">{preset.description}</span>
              </button>
              {preset.isCustom && (
                <button
                  type="button"
                  className="preset-delete-btn"
                  onClick={() => handleDeletePreset(preset.id)}
                  title="Delete preset"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          ))}
          {allPresets.length === 0 && (
            <div className="presets-empty">No presets available</div>
          )}
        </div>
      )}

      {showSaveDialog && (
        <div className="save-preset-dialog">
          <input
            type="text"
            placeholder="Preset name..."
            value={newPresetName}
            onChange={(e) => setNewPresetName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSavePreset();
              if (e.key === 'Escape') setShowSaveDialog(false);
            }}
            autoFocus
          />
          <div className="save-preset-actions">
            <button type="button" onClick={handleSavePreset}>Save</button>
            <button type="button" onClick={() => setShowSaveDialog(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Filters Component
 * Provides all filtering controls for the bank screener
 *
 * Consolidated filter categories:
 * - Quick Filters: Exchange
 * - Size & Fundamentals: Market Cap, Total Assets, Total Deposits, Equity
 * - Valuation & Performance: P/E, RoE, ROAA, Efficiency
 * - Per-Share & Dividends: EPS, BVPS, DPS, Payout
 * - Value Investing: Graham Margin of Safety
 */
function Filters({
  filters,
  exchanges,
  onFilterChange,
  onReset,
  filteredCount,
  totalCount,
  layout,
  onToggleLayout,
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  // Auto-collapse when switching to top layout, expand for side
  useEffect(() => {
    setIsExpanded(layout !== 'top');
  }, [layout]);

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
   * Handle search query change
   */
  const handleSearchChange = (value) => {
    onFilterChange({
      ...filters,
      searchQuery: value,
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
   * Apply a preset
   */
  const handleApplyPreset = (presetFilters) => {
    // Merge preset filters with default filters
    const newFilters = { ...filters };
    Object.keys(presetFilters).forEach((key) => {
      newFilters[key] = presetFilters[key];
    });
    onFilterChange(newFilters);
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

  // Count total active filters
  const totalActiveFilters = useMemo(() => {
    const allFilterKeys = [
      'exchanges', 'marketCap', 'totalAssets', 'totalDeposits', 'totalEquity',
      'totalLiabilities', 'cashAndCashEquivalents', 'loans',
      'priceToBook', 'pni', 'roe', 'roaa', 'efficiencyRatio', 'equityToAssets', 'depositsToAssets',
      'ttmEps', 'bvps', 'ttmDividend', 'dividendPayoutRatio',
      'grahamMoS', 'ttmNetIncome', 'ttmNetInterestIncome', 'sharesOutstanding'
    ];
    const searchActive = filters.searchQuery && filters.searchQuery.trim() !== '' ? 1 : 0;
    return countActiveFilters(allFilterKeys) + (filters.exchanges?.length > 0 ? 1 : 0) + searchActive;
  }, [filters]);

  return (
    <div className={`filters ${layout === 'top' ? 'filters-top-layout' : ''} ${!isExpanded && layout === 'top' ? 'filters-collapsed' : ''}`}>
      {/* Header bar - always visible */}
      <div className={`filters-header ${layout === 'side' ? 'filters-header-stacked' : ''}`}>
        {layout === 'side' ? (
          /* Sidebar layout: stacked rows for better UX */
          <>
            <div className="filters-header-row">
              <div className="filters-header-title-group">
                <h2 className="filters-title">Filters</h2>
                {totalActiveFilters > 0 && (
                  <span className="filters-active-count">{totalActiveFilters}</span>
                )}
                <button
                  className="filters-reset-btn"
                  onClick={onReset}
                  type="button"
                  disabled={totalActiveFilters === 0}
                >
                  Reset
                </button>
              </div>
              <div className="filters-layout-toggle">
                <button
                  type="button"
                  className={`layout-option ${layout === 'side' ? 'active' : ''}`}
                  onClick={() => layout !== 'side' && onToggleLayout()}
                  title="Side layout"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <line x1="9" y1="3" x2="9" y2="21" />
                  </svg>
                </button>
                <button
                  type="button"
                  className={`layout-option ${layout === 'top' ? 'active' : ''}`}
                  onClick={() => layout !== 'top' && onToggleLayout()}
                  title="Top layout"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="filters-header-row">
              <SearchFilter
                value={filters.searchQuery || ''}
                onChange={handleSearchChange}
              />
            </div>
            <div className="filters-header-row">
              <span className="filters-bank-count">
                {filteredCount} of {totalCount} banks
              </span>
            </div>
          </>
        ) : (
          /* Top layout: horizontal arrangement */
          <>
            <div className="filters-header-left">
              <button
                type="button"
                className={`filters-title-toggle ${isExpanded ? 'expanded' : ''}`}
                onClick={() => setIsExpanded(!isExpanded)}
                aria-expanded={isExpanded}
              >
                <span className="filters-title-text">Filters</span>
                {totalActiveFilters > 0 && (
                  <span className="filters-active-count">{totalActiveFilters}</span>
                )}
                <svg
                  className={`filters-title-chevron ${isExpanded ? 'open' : ''}`}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <button
                className="filters-reset-btn"
                onClick={onReset}
                type="button"
                disabled={totalActiveFilters === 0}
              >
                Reset
              </button>
              <SearchFilter
                value={filters.searchQuery || ''}
                onChange={handleSearchChange}
              />
              <span className="filters-bank-count">
                {filteredCount} of {totalCount}
              </span>
            </div>
            <div className="filters-header-right">
              <div className="filters-layout-toggle">
                <button
                  type="button"
                  className={`layout-option ${layout === 'side' ? 'active' : ''}`}
                  onClick={() => layout !== 'side' && onToggleLayout()}
                  title="Side layout"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <line x1="9" y1="3" x2="9" y2="21" />
                  </svg>
                </button>
                <button
                  type="button"
                  className={`layout-option ${layout === 'top' ? 'active' : ''}`}
                  onClick={() => layout !== 'top' && onToggleLayout()}
                  title="Top layout"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Collapsible filter content */}
      {(isExpanded || layout === 'side') && (
        <div className="filters-body">
          <FilterPresets
            onApplyPreset={handleApplyPreset}
            currentFilters={filters}
          />

          <div className="filters-sections">
        {/* QUICK FILTERS */}
        <FilterSection
          title="Exchange"
          defaultOpen={false}
          badge={filters.exchanges?.length > 0 ? filters.exchanges.length : null}
        >
          <ExchangeFilter
            exchanges={exchanges}
            selectedExchanges={filters.exchanges || []}
            onChange={handleExchangeChange}
          />
        </FilterSection>

        {/* SIZE & FUNDAMENTALS - Consolidated */}
        <FilterSection
          title="Size & Fundamentals"
          defaultOpen={false}
          badge={countActiveFilters(['marketCap', 'totalAssets', 'totalDeposits', 'totalEquity', 'totalLiabilities', 'cashAndCashEquivalents', 'loans']) || null}
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
          <RangeFilter
            label="Total Equity"
            minValue={filters.totalEquity?.min ?? ''}
            maxValue={filters.totalEquity?.max ?? ''}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            onChange={handleRangeChange('totalEquity')}
            unit="$M"
          />
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

        {/* VALUATION & PERFORMANCE - Consolidated */}
        <FilterSection
          title="Valuation & Performance"
          defaultOpen={false}
          badge={countActiveFilters(['priceToBook', 'pni', 'roe', 'roaa', 'efficiencyRatio', 'equityToAssets', 'depositsToAssets']) || null}
        >
          <RangeFilter
            label="Price to Book (P/B)"
            minValue={filters.priceToBook?.min ?? ''}
            maxValue={filters.priceToBook?.max ?? ''}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            onChange={handleRangeChange('priceToBook')}
            unit="x"
          />
          <RangeFilter
            label="P/E Ratio"
            minValue={filters.pni?.min ?? ''}
            maxValue={filters.pni?.max ?? ''}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            onChange={handleRangeChange('pni')}
          />
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

        {/* PER-SHARE & DIVIDENDS - Consolidated */}
        <FilterSection
          title="Per-Share & Dividends"
          defaultOpen={false}
          badge={countActiveFilters(['ttmEps', 'bvps', 'ttmDividend', 'dividendPayoutRatio', 'sharesOutstanding']) || null}
        >
          <RangeFilter
            label="Earnings Per Share (EPS)"
            minValue={filters.ttmEps?.min ?? ''}
            maxValue={filters.ttmEps?.max ?? ''}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            onChange={handleRangeChange('ttmEps')}
            unit="$"
          />
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
            label="Dividend Per Share"
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
            label="Net Income (TTM)"
            minValue={filters.ttmNetIncome?.min ?? ''}
            maxValue={filters.ttmNetIncome?.max ?? ''}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            onChange={handleRangeChange('ttmNetIncome')}
            unit="$M"
          />
          <RangeFilter
            label="Net Interest Income (TTM)"
            minValue={filters.ttmNetInterestIncome?.min ?? ''}
            maxValue={filters.ttmNetInterestIncome?.max ?? ''}
            minPlaceholder="Min"
            maxPlaceholder="Max"
            onChange={handleRangeChange('ttmNetInterestIncome')}
            unit="$M"
          />
            </FilterSection>
          </div>
        </div>
      )}
    </div>
  );
}

export default Filters;

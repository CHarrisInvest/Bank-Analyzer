import React, { useState, useMemo, useCallback } from 'react';
import Filters from './Filters.jsx';
import ResultsTable from './ResultsTable.jsx';
import { getUniqueExchanges } from '../data/sheets.js';

/**
 * Default filter state
 *
 * Filter categories organized by:
 * - Quick Filters: exchanges
 * - Size & Scale: marketCap, totalAssets, totalDeposits
 * - Valuation: pni, ptbvps
 * - Profitability: roe, roaa, rota, rotce
 * - Capital & Leverage: equityToAssets, tceToTa, depositsToAssets
 * - Efficiency: efficiencyRatio
 * - Book Value: bvps, tbvps
 * - Dividends: ttmDividend, dividendPayoutRatio
 * - Value Investing: grahamMoS
 * - Income Statement: ttmNetIncome, ttmNetInterestIncome
 * - Per-Share: ttmEps, sharesOutstanding
 */
const DEFAULT_FILTERS = {
  // Quick Filters
  exchanges: [],

  // Size & Scale
  marketCap: { min: '', max: '' },
  totalAssets: { min: '', max: '' },
  totalDeposits: { min: '', max: '' },

  // Valuation
  pni: { min: '', max: '' },
  ptbvps: { min: '', max: '' },

  // Profitability
  roe: { min: '', max: '' },
  roaa: { min: '', max: '' },
  rota: { min: '', max: '' },
  rotce: { min: '', max: '' },

  // Capital & Leverage
  equityToAssets: { min: '', max: '' },
  tceToTa: { min: '', max: '' },
  depositsToAssets: { min: '', max: '' },

  // Efficiency
  efficiencyRatio: { min: '', max: '' },

  // Book Value
  bvps: { min: '', max: '' },
  tbvps: { min: '', max: '' },

  // Dividends
  ttmDividend: { min: '', max: '' },
  dividendPayoutRatio: { min: '', max: '' },

  // Value Investing
  grahamMoS: '',

  // Income Statement
  ttmNetIncome: { min: '', max: '' },
  ttmNetInterestIncome: { min: '', max: '' },

  // Per-Share
  ttmEps: { min: '', max: '' },
  sharesOutstanding: { min: '', max: '' },
};

/**
 * Helper function to apply a range filter
 */
function applyRangeFilter(value, filterConfig, multiplier = 1) {
  if (filterConfig?.min !== '' && filterConfig?.min !== undefined) {
    const minValue = filterConfig.min * multiplier;
    if (value === null || value === undefined || value < minValue) {
      return false;
    }
  }
  if (filterConfig?.max !== '' && filterConfig?.max !== undefined) {
    const maxValue = filterConfig.max * multiplier;
    if (value === null || value === undefined || value > maxValue) {
      return false;
    }
  }
  return true;
}

/**
 * Screener Component
 * Main screening interface combining filters and results table
 */
function Screener({ banks, loading }) {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [showFilters, setShowFilters] = useState(true);

  /**
   * Get unique exchanges from the data
   */
  const exchanges = useMemo(() => {
    const unique = getUniqueExchanges(banks);
    // Ensure standard exchanges are always present
    const standardExchanges = ['NYSE', 'NASDAQ', 'OTC'];
    const combined = new Set([...standardExchanges, ...unique]);
    return Array.from(combined).sort();
  }, [banks]);

  /**
   * Apply filters to bank data
   */
  const filteredBanks = useMemo(() => {
    return banks.filter((bank) => {
      // ========================================================================
      // QUICK FILTERS
      // ========================================================================

      // Exchange filter
      if (filters.exchanges.length > 0 && !filters.exchanges.includes(bank.exchange)) {
        return false;
      }

      // ========================================================================
      // SIZE & SCALE (values in millions for filter input)
      // ========================================================================

      // Market Cap filter (input in millions)
      if (!applyRangeFilter(bank.marketCap, filters.marketCap, 1e6)) return false;

      // Total Assets filter (input in millions)
      if (!applyRangeFilter(bank.totalAssets, filters.totalAssets, 1e6)) return false;

      // Total Deposits filter (input in millions)
      if (!applyRangeFilter(bank.totalDeposits, filters.totalDeposits, 1e6)) return false;

      // ========================================================================
      // VALUATION
      // ========================================================================

      // P/NI (P/E) filter
      if (!applyRangeFilter(bank.pni, filters.pni)) return false;

      // P/TBVPS filter
      if (!applyRangeFilter(bank.ptbvps, filters.ptbvps)) return false;

      // ========================================================================
      // PROFITABILITY
      // ========================================================================

      // RoE filter
      if (!applyRangeFilter(bank.roe, filters.roe)) return false;

      // ROAA filter
      if (!applyRangeFilter(bank.roaa, filters.roaa)) return false;

      // RoTA filter
      if (!applyRangeFilter(bank.rota, filters.rota)) return false;

      // ROTCE filter
      if (!applyRangeFilter(bank.rotce, filters.rotce)) return false;

      // ========================================================================
      // CAPITAL & LEVERAGE
      // ========================================================================

      // Equity/Assets filter
      if (!applyRangeFilter(bank.equityToAssets, filters.equityToAssets)) return false;

      // TCE/TA filter
      if (!applyRangeFilter(bank.tceToTa, filters.tceToTa)) return false;

      // Deposits/Assets filter
      if (!applyRangeFilter(bank.depositsToAssets, filters.depositsToAssets)) return false;

      // ========================================================================
      // EFFICIENCY
      // ========================================================================

      // Efficiency Ratio filter
      if (!applyRangeFilter(bank.efficiencyRatio, filters.efficiencyRatio)) return false;

      // ========================================================================
      // BOOK VALUE
      // ========================================================================

      // BVPS filter
      if (!applyRangeFilter(bank.bvps, filters.bvps)) return false;

      // TBVPS filter
      if (!applyRangeFilter(bank.tbvps, filters.tbvps)) return false;

      // ========================================================================
      // DIVIDENDS
      // ========================================================================

      // TTM Dividend filter
      if (!applyRangeFilter(bank.ttmDividendPerShare, filters.ttmDividend)) return false;

      // Dividend Payout Ratio filter
      if (!applyRangeFilter(bank.dividendPayoutRatio, filters.dividendPayoutRatio)) return false;

      // ========================================================================
      // VALUE INVESTING
      // ========================================================================

      // Graham Margin of Safety filter
      if (filters.grahamMoS !== '' && filters.grahamMoS !== undefined) {
        if (bank.grahamMoSPct === null || bank.grahamMoSPct === undefined || bank.grahamMoSPct < filters.grahamMoS) {
          return false;
        }
      }

      // ========================================================================
      // INCOME STATEMENT (values in millions for filter input)
      // ========================================================================

      // TTM Net Income filter (input in millions)
      if (!applyRangeFilter(bank.ttmNetIncome, filters.ttmNetIncome, 1e6)) return false;

      // TTM Net Interest Income filter (input in millions)
      if (!applyRangeFilter(bank.ttmNetInterestIncome, filters.ttmNetInterestIncome, 1e6)) return false;

      // ========================================================================
      // PER-SHARE METRICS
      // ========================================================================

      // TTM EPS filter
      if (!applyRangeFilter(bank.ttmEps, filters.ttmEps)) return false;

      // Shares Outstanding filter (input in millions)
      if (!applyRangeFilter(bank.sharesOutstanding, filters.sharesOutstanding, 1e6)) return false;

      return true;
    });
  }, [banks, filters]);

  /**
   * Handle filter changes
   */
  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  /**
   * Reset all filters to defaults
   */
  const handleReset = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  /**
   * Toggle filter panel visibility (mobile)
   */
  const toggleFilters = useCallback(() => {
    setShowFilters((prev) => !prev);
  }, []);

  /**
   * Check if any filters are active
   */
  const hasActiveFilters = useMemo(() => {
    const checkRange = (filter) => {
      return filter?.min !== '' && filter?.min !== undefined ||
             filter?.max !== '' && filter?.max !== undefined;
    };

    return (
      // Quick Filters
      filters.exchanges.length > 0 ||
      // Size & Scale
      checkRange(filters.marketCap) ||
      checkRange(filters.totalAssets) ||
      checkRange(filters.totalDeposits) ||
      // Valuation
      checkRange(filters.pni) ||
      checkRange(filters.ptbvps) ||
      // Profitability
      checkRange(filters.roe) ||
      checkRange(filters.roaa) ||
      checkRange(filters.rota) ||
      checkRange(filters.rotce) ||
      // Capital & Leverage
      checkRange(filters.equityToAssets) ||
      checkRange(filters.tceToTa) ||
      checkRange(filters.depositsToAssets) ||
      // Efficiency
      checkRange(filters.efficiencyRatio) ||
      // Book Value
      checkRange(filters.bvps) ||
      checkRange(filters.tbvps) ||
      // Dividends
      checkRange(filters.ttmDividend) ||
      checkRange(filters.dividendPayoutRatio) ||
      // Value Investing
      (filters.grahamMoS !== '' && filters.grahamMoS !== undefined) ||
      // Income Statement
      checkRange(filters.ttmNetIncome) ||
      checkRange(filters.ttmNetInterestIncome) ||
      // Per-Share
      checkRange(filters.ttmEps) ||
      checkRange(filters.sharesOutstanding)
    );
  }, [filters]);

  return (
    <div className="screener">
      <div className="screener-toolbar">
        <div className="screener-stats">
          <span className="stat">
            <strong>{filteredBanks.length}</strong> of <strong>{banks.length}</strong> banks
          </span>
          {hasActiveFilters && (
            <span className="stat-filter-active">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
              </svg>
              Filters active
            </span>
          )}
        </div>
        <button
          className="filter-toggle-btn"
          onClick={toggleFilters}
          aria-expanded={showFilters}
          aria-controls="filters-panel"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
          </svg>
          <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
        </button>
      </div>

      <div className="screener-content">
        <aside
          id="filters-panel"
          className={`screener-filters ${showFilters ? 'visible' : 'hidden'}`}
        >
          <Filters
            filters={filters}
            exchanges={exchanges}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
          />
        </aside>

        <section className="screener-results">
          <ResultsTable banks={filteredBanks} loading={loading} />
        </section>
      </div>
    </div>
  );
}

export default Screener;

import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import Filters from './Filters.jsx';
import ResultsTable from './ResultsTable.jsx';
import { getUniqueExchanges } from '../data/sheets.js';
import { trackFiltersReset, trackSearchPerformed, trackExchangeFiltered } from '../analytics/events.js';

/**
 * Clean up bank name for display
 * - Remove state abbreviations in slashes (e.g., "/PA/", "/DE/", "/MN")
 * - Convert all letters to uppercase for consistency
 */
function cleanBankName(name) {
  if (!name) return name;

  // Remove state abbreviations in various formats:
  // /PA/, /DE/, /VA/, etc. (with closing slash)
  // /MN, /TX, /VT, etc. (without closing slash at end)
  let cleaned = name
    .replace(/\s*\/[A-Za-z]{2}\/$/, '')      // " /PA/" at end
    .replace(/\s*\/[A-Za-z]{2}$/, '')        // " /MN" at end (no closing slash)
    .replace(/\s+\/[A-Za-z]{2}\/\s*/g, ' ')  // " /PA/ " in middle
    .trim();

  // Convert all letters to uppercase for consistency
  cleaned = cleaned.toUpperCase();

  return cleaned;
}

/**
 * Default filter state
 *
 * Filter categories organized by:
 * - Quick Filters: exchanges
 * - Size & Scale: marketCap, totalAssets, totalDeposits
 * - Balance Sheet - Assets: cashAndCashEquivalents, loans
 * - Balance Sheet - Liabilities: totalLiabilities, totalEquity
 * - Valuation: pni
 * - Profitability: roe, roaa
 * - Capital & Leverage: equityToAssets, depositsToAssets
 * - Efficiency: efficiencyRatio
 * - Book Value: bvps
 * - Dividends: ttmDividend, dividendPayoutRatio
 * - Value Investing: grahamMoS
 * - Income Statement: ttmNetIncome, ttmNetInterestIncome
 * - Per-Share: ttmEps, sharesOutstanding
 */
const DEFAULT_FILTERS = {
  // Search
  searchQuery: '',

  // Quick Filters
  exchanges: [],

  // Size & Scale
  marketCap: { min: '', max: '' },
  totalAssets: { min: '', max: '' },
  totalDeposits: { min: '', max: '' },

  // Balance Sheet - Assets
  cashAndCashEquivalents: { min: '', max: '' },
  loans: { min: '', max: '' },

  // Balance Sheet - Liabilities
  totalLiabilities: { min: '', max: '' },
  totalEquity: { min: '', max: '' },

  // Valuation
  pni: { min: '', max: '' },

  // Profitability
  roe: { min: '', max: '' },
  roaa: { min: '', max: '' },

  // Capital & Leverage
  equityToAssets: { min: '', max: '' },
  depositsToAssets: { min: '', max: '' },

  // Efficiency
  efficiencyRatio: { min: '', max: '' },

  // Book Value
  bvps: { min: '', max: '' },

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
  const [filtersLayout, setFiltersLayout] = useState(() => {
    // Load from localStorage, default to 'side'
    return localStorage.getItem('bankAnalyzer_filtersLayout') || 'side';
  });

  // Refs for tracking debounce
  const searchTrackingTimeout = useRef(null);
  const previousExchanges = useRef([]);

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
   * Process banks with cleaned names and calculated fields
   */
  const processedBanks = useMemo(() => {
    return banks.map((bank) => {
      // Calculate P/B (Price to Book)
      const priceToBook = bank.price && bank.bvps && bank.bvps !== 0
        ? bank.price / bank.bvps
        : null;

      return {
        ...bank,
        bankName: cleanBankName(bank.bankName),
        priceToBook,
      };
    });
  }, [banks]);

  /**
   * Apply filters to bank data
   */
  const filteredBanks = useMemo(() => {
    return processedBanks.filter((bank) => {
      // ========================================================================
      // SEARCH FILTER (ticker or name)
      // ========================================================================
      // - Tickers: must start with the query
      // - Names: any word in the name must start with the query
      if (filters.searchQuery && filters.searchQuery.trim() !== '') {
        const query = filters.searchQuery.toLowerCase().trim();
        const tickerMatch = bank.ticker?.toLowerCase().startsWith(query);
        const words = bank.bankName?.toLowerCase().split(/\s+/) || [];
        const nameMatch = words.some(word => word.startsWith(query));
        if (!tickerMatch && !nameMatch) {
          return false;
        }
      }

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
      // BALANCE SHEET - ASSETS (values in millions for filter input)
      // ========================================================================

      // Cash & Cash Equivalents filter
      if (!applyRangeFilter(bank.cashAndCashEquivalents, filters.cashAndCashEquivalents, 1e6)) return false;

      // Loans filter
      if (!applyRangeFilter(bank.loans, filters.loans, 1e6)) return false;

      // ========================================================================
      // BALANCE SHEET - LIABILITIES (values in millions for filter input)
      // ========================================================================

      // Total Liabilities filter
      if (!applyRangeFilter(bank.totalLiabilities, filters.totalLiabilities, 1e6)) return false;

      // Total Equity filter
      if (!applyRangeFilter(bank.totalEquity, filters.totalEquity, 1e6)) return false;

      // ========================================================================
      // VALUATION
      // ========================================================================

      // P/NI (P/E) filter
      if (!applyRangeFilter(bank.pni, filters.pni)) return false;

      // ========================================================================
      // PROFITABILITY
      // ========================================================================

      // RoE filter
      if (!applyRangeFilter(bank.roe, filters.roe)) return false;

      // ROAA filter
      if (!applyRangeFilter(bank.roaa, filters.roaa)) return false;

      // ========================================================================
      // CAPITAL & LEVERAGE
      // ========================================================================

      // Equity/Assets filter
      if (!applyRangeFilter(bank.equityToAssets, filters.equityToAssets)) return false;

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
  }, [processedBanks, filters]);

  /**
   * Handle filter changes with analytics tracking
   */
  const handleFilterChange = useCallback((newFilters) => {
    setFilters(prevFilters => {
      // Track exchange filter changes
      if (JSON.stringify(newFilters.exchanges) !== JSON.stringify(prevFilters.exchanges)) {
        if (newFilters.exchanges.length > 0) {
          trackExchangeFiltered(newFilters.exchanges);
        }
      }
      return newFilters;
    });
  }, []);

  /**
   * Track search queries with debounce
   */
  useEffect(() => {
    if (searchTrackingTimeout.current) {
      clearTimeout(searchTrackingTimeout.current);
    }

    if (filters.searchQuery && filters.searchQuery.trim().length > 0) {
      searchTrackingTimeout.current = setTimeout(() => {
        trackSearchPerformed(filters.searchQuery.length, filteredBanks.length);
      }, 1000); // Debounce for 1 second
    }

    return () => {
      if (searchTrackingTimeout.current) {
        clearTimeout(searchTrackingTimeout.current);
      }
    };
  }, [filters.searchQuery, filteredBanks.length]);

  /**
   * Reset all filters to defaults
   */
  const handleReset = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    trackFiltersReset();
  }, []);

  /**
   * Toggle filters layout between side and top
   */
  const toggleFiltersLayout = useCallback(() => {
    setFiltersLayout((prev) => {
      const newLayout = prev === 'side' ? 'top' : 'side';
      localStorage.setItem('bankAnalyzer_filtersLayout', newLayout);
      return newLayout;
    });
  }, []);

  return (
    <div className={`screener layout-${filtersLayout}`}>
      <aside id="filters-panel" className="screener-filters">
        <Filters
          filters={filters}
          exchanges={exchanges}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
          filteredCount={filteredBanks.length}
          totalCount={processedBanks.length}
          layout={filtersLayout}
          onToggleLayout={toggleFiltersLayout}
        />
      </aside>

      <section className="screener-results">
        <ResultsTable banks={filteredBanks} loading={loading} searchQuery={filters.searchQuery} filters={filters} />
      </section>
    </div>
  );
}

export default Screener;

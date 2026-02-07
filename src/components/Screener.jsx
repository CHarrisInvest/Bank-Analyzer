import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Filters from './Filters.jsx';
import ResultsTable from './ResultsTable.jsx';
import { getUniqueExchanges } from '../data/sheets.js';
import { trackFiltersReset, trackSearchPerformed, trackExchangeFiltered } from '../analytics/events.js';

/**
 * URL param mapping for shareable screener filter links.
 * Maps internal filter keys to compact URL parameter names.
 */
const FILTER_PARAM_MAP = {
  searchQuery: 'q',
  exchanges: 'ex',
  marketCap: 'mc',
  totalAssets: 'ta',
  totalDeposits: 'td',
  cashAndCashEquivalents: 'cash',
  loans: 'loans',
  totalLiabilities: 'tl',
  totalEquity: 'te',
  priceToBook: 'pb',
  pni: 'pe',
  roe: 'roe',
  roaa: 'roaa',
  equityToAssets: 'ea',
  depositsToAssets: 'da',
  efficiencyRatio: 'eff',
  bvps: 'bvps',
  ttmDividend: 'div',
  dividendPayoutRatio: 'dpr',
  grahamMoS: 'gmos',
  ttmNetIncome: 'ni',
  ttmNetInterestIncome: 'nii',
  ttmEps: 'eps',
  sharesOutstanding: 'so',
};

// Reverse map: URL param -> filter key
const PARAM_FILTER_MAP = Object.fromEntries(
  Object.entries(FILTER_PARAM_MAP).map(([k, v]) => [v, k])
);

// Range filter keys (exclude searchQuery, exchanges, grahamMoS which are handled specially)
const RANGE_FILTER_ENTRIES = Object.entries(FILTER_PARAM_MAP).filter(
  ([key]) => key !== 'searchQuery' && key !== 'exchanges' && key !== 'grahamMoS'
);

/**
 * Serialize filter state to URLSearchParams
 */
function filtersToParams(filters) {
  const params = new URLSearchParams();

  if (filters.searchQuery?.trim()) {
    params.set('q', filters.searchQuery.trim());
  }

  if (filters.exchanges?.length > 0) {
    params.set('ex', filters.exchanges.join(','));
  }

  for (const [key, param] of RANGE_FILTER_ENTRIES) {
    const f = filters[key];
    if (f?.min !== '' && f?.min !== undefined) params.set(`${param}_min`, String(f.min));
    if (f?.max !== '' && f?.max !== undefined) params.set(`${param}_max`, String(f.max));
  }

  if (filters.grahamMoS !== '' && filters.grahamMoS !== undefined) {
    params.set('gmos', String(filters.grahamMoS));
  }

  return params;
}

/**
 * Deserialize URLSearchParams to filter state
 */
function paramsToFilters(searchParams) {
  const filters = { ...DEFAULT_FILTERS };

  const q = searchParams.get('q');
  if (q) filters.searchQuery = q;

  const ex = searchParams.get('ex');
  if (ex) filters.exchanges = ex.split(',').filter(Boolean);

  for (const [key, param] of RANGE_FILTER_ENTRIES) {
    const min = searchParams.get(`${param}_min`);
    const max = searchParams.get(`${param}_max`);
    if (min !== null && !isNaN(parseFloat(min))) {
      filters[key] = { ...filters[key], min: parseFloat(min) };
    }
    if (max !== null && !isNaN(parseFloat(max))) {
      filters[key] = { ...filters[key], max: parseFloat(max) };
    }
  }

  const gmos = searchParams.get('gmos');
  if (gmos !== null && !isNaN(parseFloat(gmos))) {
    filters.grahamMoS = parseFloat(gmos);
  }

  return filters;
}

/**
 * Check if URL has any screener filter params
 */
function hasFilterParams(searchParams) {
  const allParamNames = new Set(['q', 'ex', 'gmos']);
  for (const [, param] of RANGE_FILTER_ENTRIES) {
    allParamNames.add(`${param}_min`);
    allParamNames.add(`${param}_max`);
  }
  for (const key of searchParams.keys()) {
    if (allParamNames.has(key)) return true;
  }
  return false;
}

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
  priceToBook: { min: '', max: '' },
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
  const location = useLocation();
  const incomingState = location.state || {};

  // Initialize filters: URL params > location state > defaults
  const [filters, setFilters] = useState(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (hasFilterParams(searchParams)) {
      return paramsToFilters(searchParams);
    }
    if (incomingState.filters) {
      return { ...DEFAULT_FILTERS, ...incomingState.filters };
    }
    return DEFAULT_FILTERS;
  });

  const [filtersLayout, setFiltersLayout] = useState(() => {
    // Load from localStorage, default to 'side'
    return localStorage.getItem('banksift_filtersLayout') || 'side';
  });

  // Refs for tracking debounce
  const searchTrackingTimeout = useRef(null);
  const previousExchanges = useRef([]);

  // Restore filters when navigating back with state
  useEffect(() => {
    if (incomingState.filters) {
      setFilters({ ...DEFAULT_FILTERS, ...incomingState.filters });
    }
  }, [incomingState.filters]);

  // Restore scroll position when returning via back button
  useEffect(() => {
    if (incomingState.restoreScroll && incomingState.scrollY) {
      // Wait for DOM to update before scrolling
      requestAnimationFrame(() => {
        window.scrollTo({ top: incomingState.scrollY, behavior: 'instant' });
      });
    }
  }, [incomingState.restoreScroll, incomingState.scrollY]);

  // Sync filter state to URL params (debounced to avoid thrashing on keystrokes)
  const urlUpdateTimeout = useRef(null);
  useEffect(() => {
    if (urlUpdateTimeout.current) clearTimeout(urlUpdateTimeout.current);
    urlUpdateTimeout.current = setTimeout(() => {
      const params = filtersToParams(filters);
      const search = params.toString();
      const newUrl = search
        ? `${location.pathname}?${search}`
        : location.pathname;
      window.history.replaceState(null, '', newUrl);
    }, 300);
    return () => {
      if (urlUpdateTimeout.current) clearTimeout(urlUpdateTimeout.current);
    };
  }, [filters, location.pathname]);

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

      // Price to Book filter
      if (!applyRangeFilter(bank.priceToBook, filters.priceToBook)) return false;

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
    window.history.replaceState(null, '', location.pathname);
    trackFiltersReset();
  }, [location.pathname]);

  /**
   * Toggle filters layout between side and top
   */
  const toggleFiltersLayout = useCallback(() => {
    setFiltersLayout((prev) => {
      const newLayout = prev === 'side' ? 'top' : 'side';
      localStorage.setItem('banksift_filtersLayout', newLayout);
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

/**
 * Build a screener URL with filter params pre-applied.
 * Accepts a partial filter object (same shape as preset filters in Filters.jsx).
 */
export function buildScreenerUrl(presetFilters) {
  const filters = { ...DEFAULT_FILTERS };
  Object.keys(presetFilters).forEach((key) => {
    filters[key] = presetFilters[key];
  });
  const params = filtersToParams(filters);
  const search = params.toString();
  return search ? `/screener?${search}` : '/screener';
}

export default Screener;

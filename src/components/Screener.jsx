import React, { useState, useMemo, useCallback } from 'react';
import Filters from './Filters.jsx';
import ResultsTable from './ResultsTable.jsx';
import { getUniqueExchanges } from '../data/sheets.js';

/**
 * Default filter state
 */
const DEFAULT_FILTERS = {
  roe: { min: '', max: '' },
  roaa: { min: '', max: '' },
  rota: { min: '', max: '' },
  rotce: { min: '', max: '' },
  pni: { min: '', max: '' },
  ptbvps: { min: '', max: '' },
  bvps: { min: '', max: '' },
  tbvps: { min: '', max: '' },
  marketCap: { min: '', max: '' },
  grahamMoS: '',
  exchanges: [],
};

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
      // RoE filter
      if (filters.roe.min !== '' && (bank.roe === null || bank.roe < filters.roe.min)) {
        return false;
      }
      if (filters.roe.max !== '' && (bank.roe === null || bank.roe > filters.roe.max)) {
        return false;
      }

      // ROAA filter (Return on Average Assets)
      if (filters.roaa.min !== '' && (bank.roaa === null || bank.roaa < filters.roaa.min)) {
        return false;
      }
      if (filters.roaa.max !== '' && (bank.roaa === null || bank.roaa > filters.roaa.max)) {
        return false;
      }

      // RoTA filter (Return on Tangible Assets)
      if (filters.rota.min !== '' && (bank.rota === null || bank.rota < filters.rota.min)) {
        return false;
      }
      if (filters.rota.max !== '' && (bank.rota === null || bank.rota > filters.rota.max)) {
        return false;
      }

      // ROTCE filter (Return on Tangible Common Equity)
      if (filters.rotce.min !== '' && (bank.rotce === null || bank.rotce < filters.rotce.min)) {
        return false;
      }
      if (filters.rotce.max !== '' && (bank.rotce === null || bank.rotce > filters.rotce.max)) {
        return false;
      }

      // P/NI filter
      if (filters.pni.min !== '' && (bank.pni === null || bank.pni < filters.pni.min)) {
        return false;
      }
      if (filters.pni.max !== '' && (bank.pni === null || bank.pni > filters.pni.max)) {
        return false;
      }

      // P-TBV filter
      if (filters.ptbvps.min !== '' && (bank.ptbvps === null || bank.ptbvps < filters.ptbvps.min)) {
        return false;
      }
      if (filters.ptbvps.max !== '' && (bank.ptbvps === null || bank.ptbvps > filters.ptbvps.max)) {
        return false;
      }

      // BVPS filter (Book Value per Share)
      if (filters.bvps.min !== '' && (bank.bvps === null || bank.bvps < filters.bvps.min)) {
        return false;
      }
      if (filters.bvps.max !== '' && (bank.bvps === null || bank.bvps > filters.bvps.max)) {
        return false;
      }

      // TBVPS filter (Tangible Book Value per Share)
      if (filters.tbvps.min !== '' && (bank.tbvps === null || bank.tbvps < filters.tbvps.min)) {
        return false;
      }
      if (filters.tbvps.max !== '' && (bank.tbvps === null || bank.tbvps > filters.tbvps.max)) {
        return false;
      }

      // Market Cap filter (in millions)
      if (filters.marketCap.min !== '') {
        const minCap = filters.marketCap.min * 1e6;
        if (bank.marketCap === null || bank.marketCap < minCap) {
          return false;
        }
      }
      if (filters.marketCap.max !== '') {
        const maxCap = filters.marketCap.max * 1e6;
        if (bank.marketCap === null || bank.marketCap > maxCap) {
          return false;
        }
      }

      // Graham Margin of Safety % filter (minimum)
      if (filters.grahamMoS !== '' && (bank.grahamMoSPct === null || bank.grahamMoSPct < filters.grahamMoS)) {
        return false;
      }

      // Exchange filter
      if (filters.exchanges.length > 0 && !filters.exchanges.includes(bank.exchange)) {
        return false;
      }

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
    return (
      filters.roe.min !== '' ||
      filters.roe.max !== '' ||
      filters.roaa.min !== '' ||
      filters.roaa.max !== '' ||
      filters.rota.min !== '' ||
      filters.rota.max !== '' ||
      filters.rotce.min !== '' ||
      filters.rotce.max !== '' ||
      filters.pni.min !== '' ||
      filters.pni.max !== '' ||
      filters.ptbvps.min !== '' ||
      filters.ptbvps.max !== '' ||
      filters.bvps.min !== '' ||
      filters.bvps.max !== '' ||
      filters.tbvps.min !== '' ||
      filters.tbvps.max !== '' ||
      filters.marketCap.min !== '' ||
      filters.marketCap.max !== '' ||
      filters.grahamMoS !== '' ||
      filters.exchanges.length > 0
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

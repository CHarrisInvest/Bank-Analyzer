import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSearchTracking } from '../analytics/useAnalytics.js';

/**
 * Bank Search Page
 * Quick lookup for banks by ticker, name, state, or exchange
 */
function Search({ banks = [], loading = false }) {
  const [query, setQuery] = useState('');
  const [filterExchange, setFilterExchange] = useState('');
  const trackSearch = useSearchTracking();

  // Get unique exchanges for filter dropdown
  const exchanges = useMemo(() => {
    const unique = new Set(banks.map(b => b.exchange).filter(Boolean));
    return Array.from(unique).sort();
  }, [banks]);

  // Filter and search banks
  const results = useMemo(() => {
    if (!query.trim() && !filterExchange) {
      return [];
    }

    let filtered = banks;

    // Filter by exchange
    if (filterExchange) {
      filtered = filtered.filter(b => b.exchange === filterExchange);
    }

    // Filter by search query
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      filtered = filtered.filter(bank => {
        const tickerMatch = bank.ticker?.toLowerCase().startsWith(q);
        const nameMatch = bank.bankName?.toLowerCase().includes(q);
        const cikMatch = bank.cik?.includes(q);
        return tickerMatch || nameMatch || cikMatch;
      });
    }

    // Sort: exact ticker matches first, then alphabetically
    filtered.sort((a, b) => {
      const q = query.toLowerCase().trim();
      const aExact = a.ticker?.toLowerCase() === q;
      const bExact = b.ticker?.toLowerCase() === q;
      if (aExact && !bExact) return -1;
      if (!aExact && bExact) return 1;
      return (a.ticker || '').localeCompare(b.ticker || '');
    });

    return filtered.slice(0, 50); // Limit results for performance
  }, [banks, query, filterExchange]);

  // Track search for analytics
  useEffect(() => {
    if (query.trim()) {
      trackSearch(query.length, results.length);
    }
  }, [query, results.length, trackSearch]);

  const formatNumber = (num) => {
    if (num === null || num === undefined) return '-';
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    return num.toLocaleString();
  };

  return (
    <div className="page search-page">
      <div className="page-header">
        <h1>Bank Search</h1>
        <p>Find any publicly traded bank by ticker symbol, name, or CIK number.</p>
      </div>

      <div className="search-controls">
        <div className="search-input-wrapper">
          <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Search by ticker, name, or CIK..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          {query && (
            <button
              className="search-clear"
              onClick={() => setQuery('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        <div className="search-filters">
          <select
            className="filter-select"
            value={filterExchange}
            onChange={(e) => setFilterExchange(e.target.value)}
          >
            <option value="">All Exchanges</option>
            {exchanges.map(ex => (
              <option key={ex} value={ex}>{ex}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="loading-spinner" />
          <p>Loading bank data...</p>
        </div>
      ) : (
        <div className="search-results">
          {!query.trim() && !filterExchange ? (
            <div className="search-prompt">
              <p>Enter a ticker symbol or bank name to search</p>
              <div className="search-examples">
                <span>Try:</span>
                <button onClick={() => setQuery('JPM')}>JPM</button>
                <button onClick={() => setQuery('Wells')}>Wells</button>
                <button onClick={() => setQuery('First')}>First</button>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="no-results">
              <p>No banks found matching your search criteria.</p>
            </div>
          ) : (
            <>
              <div className="results-count">
                Found {results.length} bank{results.length !== 1 ? 's' : ''}
                {results.length === 50 && ' (showing first 50)'}
              </div>
              <div className="results-list">
                {results.map(bank => (
                  <Link
                    key={bank.cik || bank.ticker}
                    to={'/bank/' + bank.ticker}
                    className="bank-result-card"
                  >
                    <div className="bank-result-header">
                      <span className="bank-ticker">{bank.ticker}</span>
                      <span className="bank-exchange">{bank.exchange}</span>
                    </div>
                    <div className="bank-name">{bank.bankName}</div>
                    <div className="bank-metrics">
                      <div className="metric">
                        <span className="metric-label">Assets</span>
                        <span className="metric-value">{formatNumber(bank.totalAssets)}</span>
                      </div>
                      <div className="metric">
                        <span className="metric-label">ROE</span>
                        <span className="metric-value">
                          {bank.roe !== null ? bank.roe.toFixed(1) + '%' : '-'}
                        </span>
                      </div>
                      <div className="metric">
                        <span className="metric-label">Efficiency</span>
                        <span className="metric-value">
                          {bank.efficiencyRatio !== null ? bank.efficiencyRatio.toFixed(1) + '%' : '-'}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;

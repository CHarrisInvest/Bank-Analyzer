import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useSearchTracking } from '../analytics/useAnalytics.js';
import { useFavorites } from '../hooks/useFavorites.js';
import NavigationLink from '../components/NavigationLink.jsx';
import SEO from '../components/SEO.jsx';

// Recent search history configuration
const RECENT_BANK_SEARCHES_KEY = 'banksift_recentBankSearches';
const MAX_RECENT_SEARCHES = 15;
const DEFAULT_VISIBLE_RECENT = 7;

/**
 * Bank Search Page
 * Quick lookup for banks by ticker, name, state, or exchange
 */
function Search({ banks = [], loading = false }) {
  const location = useLocation();
  const incomingState = location.state || {};
  const inputRef = useRef(null);
  const [, toggleFavorite, isFavorite] = useFavorites();

  // Initialize state from location state (when returning via back button) or defaults
  const [query, setQuery] = useState(incomingState.searchQuery || '');
  const [filterExchange, setFilterExchange] = useState(incomingState.filterExchange || '');
  const trackSearch = useSearchTracking();

  // Recent searches state
  const [showRecent, setShowRecent] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const saved = localStorage.getItem(RECENT_BANK_SEARCHES_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Restore state when navigating back
  useEffect(() => {
    if (incomingState.searchQuery !== undefined) {
      setQuery(incomingState.searchQuery);
    }
    if (incomingState.filterExchange !== undefined) {
      setFilterExchange(incomingState.filterExchange);
    }
  }, [incomingState.searchQuery, incomingState.filterExchange]);

  // Restore scroll position when returning via back button
  useEffect(() => {
    if (incomingState.restoreScroll && incomingState.scrollY) {
      // Wait for DOM to update before scrolling
      requestAnimationFrame(() => {
        window.scrollTo({ top: incomingState.scrollY, behavior: 'instant' });
      });
    }
  }, [incomingState.restoreScroll, incomingState.scrollY]);

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
    // - Tickers: must start with the query
    // - Names: any word in the name must start with the query
    // - CIK: must start with the query
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      filtered = filtered.filter(bank => {
        const tickerMatch = bank.ticker?.toLowerCase().startsWith(q);
        const words = bank.bankName?.toLowerCase().split(/\s+/) || [];
        const nameMatch = words.some(word => word.startsWith(q));
        const cikMatch = bank.cik?.startsWith(q);
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

  // Global keyboard shortcut: "/" to focus search, Escape to blur
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
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
    setTimeout(() => {
      setShowRecent(false);
      setIsExpanded(false);
      if (query && query.trim()) {
        const trimmed = query.trim();
        setRecentSearches((prev) => {
          const filtered = prev.filter((s) => s.toLowerCase() !== trimmed.toLowerCase());
          const updated = [trimmed, ...filtered].slice(0, MAX_RECENT_SEARCHES);
          localStorage.setItem(RECENT_BANK_SEARCHES_KEY, JSON.stringify(updated));
          return updated;
        });
      }
    }, 150);
  }, [query]);

  const handleFocus = useCallback(() => {
    if (recentSearches.length > 0) {
      setShowRecent(true);
    }
  }, [recentSearches.length]);

  const handleRecentClick = useCallback((search) => {
    setQuery(search);
    setShowRecent(false);
    setIsExpanded(false);
    inputRef.current?.blur();
  }, []);

  const clearRecentSearches = useCallback((e) => {
    e.stopPropagation();
    setRecentSearches([]);
    localStorage.removeItem(RECENT_BANK_SEARCHES_KEY);
    setShowRecent(false);
    setIsExpanded(false);
  }, []);

  const toggleExpanded = useCallback((e) => {
    e.stopPropagation();
    setIsExpanded((prev) => !prev);
  }, []);

  // Compute visible recent searches
  const visibleSearches = isExpanded
    ? recentSearches
    : recentSearches.slice(0, DEFAULT_VISIBLE_RECENT);
  const hasMore = recentSearches.length > DEFAULT_VISIBLE_RECENT;

  const formatNumber = (num) => {
    if (num === null || num === undefined) return '-';
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    return num.toLocaleString();
  };

  const searchSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://banksift.org"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Bank Search",
            "item": "https://banksift.org/search"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I search for a bank by ticker?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Type the ticker symbol (such as JPM, BAC, or WFC) into the search bar. The search returns instant results as you type, matching ticker symbols that start with your query. Exact ticker matches are displayed first, followed by partial matches sorted alphabetically."
            }
          },
          {
            "@type": "Question",
            "name": "Which metrics are displayed in the search results?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Search results display each bank's ticker symbol, exchange, full name, total assets, Return on Equity (ROE), and efficiency ratio. Click any result to access the full financial profile including 25+ metrics, balance sheet data, income statements, and valuation calculations."
            }
          },
          {
            "@type": "Question",
            "name": "Can I track multiple banks using this tool?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The search tool saves your recent searches for quick access. You can also use the Bank Screener to filter and compare multiple banks simultaneously across 25+ financial metrics, with options to sort, customize columns, and export results to CSV."
            }
          },
          {
            "@type": "Question",
            "name": "How do I find a bank by CIK number?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Enter the bank's CIK (Central Index Key) number in the search bar. CIK is a unique identifier assigned by the SEC to each filing entity. The search matches CIK numbers that start with your query, making it easy to look up banks using their SEC identifier."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="page search-page">
      <SEO
        title="Search US Bank Stocks by Ticker or Name"
        description="Search and find any publicly traded US bank by ticker symbol, name, or CIK number. Access detailed financial metrics including ROE, efficiency ratio, P/B ratio, and more. Look up bank stock performance data sourced from SEC filings."
        canonical="/search"
        image="https://banksift.org/og-search.png"
        schema={searchSchema}
      />
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
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder="Search by ticker, name, or CIK..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            autoFocus
          />
          {!query && (
            <span className="search-shortcut" title="Press / to search">/</span>
          )}
          {query && (
            <button
              className="search-clear"
              onClick={() => setQuery('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
          {showRecent && recentSearches.length > 0 && !query && (
            <div className="search-recent-dropdown">
              <div className="search-recent-header">
                <span>Recent Searches</span>
                <button type="button" onClick={clearRecentSearches}>Clear</button>
              </div>
              {visibleSearches.map((search, i) => (
                <button
                  key={i}
                  type="button"
                  className="search-recent-item"
                  onMouseDown={() => handleRecentClick(search)}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {search}
                </button>
              ))}
              {hasMore && (
                <button
                  type="button"
                  className="search-recent-toggle"
                  onMouseDown={toggleExpanded}
                >
                  {isExpanded ? 'Show less' : `Show ${recentSearches.length - DEFAULT_VISIBLE_RECENT} more`}
                </button>
              )}
            </div>
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
                  <NavigationLink
                    key={bank.cik || bank.ticker}
                    to={'/bank/' + bank.ticker}
                    state={{ from: 'search', searchQuery: query, filterExchange: filterExchange }}
                    className="bank-result-card"
                    pageTitle={bank.ticker}
                  >
                    <div className="bank-result-header">
                      <span className="ticker-cell">
                        <button
                          type="button"
                          className={`favorite-btn ${isFavorite(bank.ticker) ? 'favorited' : ''}`}
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(bank.ticker); }}
                          aria-label={isFavorite(bank.ticker) ? 'Remove from favorites' : 'Add to favorites'}
                        >★</button>
                        <span className="bank-ticker">{bank.ticker}</span>
                      </span>
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
                  </NavigationLink>
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

import React, { useState, useEffect, useCallback } from 'react';
import Screener from './components/Screener.jsx';
import { fetchBankData } from './data/sheets.js';

/**
 * Main Application Component
 * Manages global state and data fetching for the bank screener
 */
function App() {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  /**
   * Fetch bank data from Google Sheets
   */
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchBankData();

      if (result.success) {
        setBanks(result.data);
        setLastUpdated(new Date());
        setError(null);
      } else {
        setError(result.error?.message || 'Failed to load data');
        setBanks([]);
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
      setBanks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load data on mount
  useEffect(() => {
    loadData();
  }, [loadData]);

  /**
   * Handle manual refresh
   */
  const handleRefresh = () => {
    loadData();
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="header-title">
            <h1>Bank Equity Screener</h1>
            <p className="header-subtitle">
              Screen and analyze publicly traded banks
            </p>
          </div>
          <div className="header-actions">
            <button
              className="refresh-btn"
              onClick={handleRefresh}
              disabled={loading}
              aria-label="Refresh data"
            >
              {loading ? (
                <span className="loading-spinner-small" />
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 2v6h-6" />
                  <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
                  <path d="M3 22v-6h6" />
                  <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
                </svg>
              )}
              <span>{loading ? 'Loading...' : 'Refresh'}</span>
            </button>
            {lastUpdated && (
              <span className="last-updated">
                Updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>
      </header>

      <main className="app-main">
        {loading && banks.length === 0 ? (
          <div className="loading-state">
            <div className="loading-spinner" />
            <p>Loading bank data...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <div className="error-icon">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h2>Unable to Load Data</h2>
            <p className="error-message">{error}</p>
            <button className="retry-btn" onClick={handleRefresh}>
              Try Again
            </button>
            <p className="error-help">
              Please check the browser console for more details or try again later.
            </p>
          </div>
        ) : (
          <Screener banks={banks} loading={loading} />
        )}
      </main>

      <footer className="app-footer">
        <p>
          Data sourced from public filings. For informational purposes only.
          Not investment advice.
        </p>
      </footer>
    </div>
  );
}

export default App;

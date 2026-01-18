import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { fetchBankData, fetchRawSecData } from './data/sheets.js';
import { initializeGA4 } from './analytics/gtag.js';

// Layout
import Layout from './components/Layout.jsx';

// Pages
import Home from './pages/Home.jsx';
import Search from './pages/Search.jsx';
import ScreenerPage from './pages/ScreenerPage.jsx';
import ScreenerGuide from './pages/ScreenerGuide.jsx';
import BankDetail from './pages/BankDetail.jsx';
import MetricsIndex from './pages/MetricsIndex.jsx';
import MetricDetail from './pages/MetricDetail.jsx';
import ValuationIndex from './pages/ValuationIndex.jsx';
import ValuationDetail from './pages/ValuationDetail.jsx';
import Privacy from './pages/Privacy.jsx';
import Terms from './pages/Terms.jsx';

/**
 * Main Application Component
 * Manages global state, data fetching, routing, and analytics initialization
 */
function App() {
  const [banks, setBanks] = useState([]);
  const [rawData, setRawData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize Google Analytics on mount
  useEffect(() => {
    initializeGA4();
  }, []);

  /**
   * Fetch bank data from static JSON files
   */
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch both banks.json and sec-raw-data.json in parallel
      const [banksResult, rawDataResult] = await Promise.all([
        fetchBankData(),
        fetchRawSecData(),
      ]);

      if (banksResult.success) {
        setBanks(banksResult.data);
        setError(null);
      } else {
        setError(banksResult.error?.message || 'Failed to load bank data');
        setBanks([]);
      }

      if (rawDataResult.success) {
        setRawData(rawDataResult.data);
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

  // Get base path for router
  const basename = import.meta.env.BASE_URL || '/';

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Home */}
          <Route index element={<Home />} />

          {/* Bank Search */}
          <Route
            path="search"
            element={<Search banks={banks} loading={loading} />}
          />

          {/* Screener */}
          <Route
            path="screener"
            element={<ScreenerPage banks={banks} loading={loading} />}
          />
          <Route path="screener/guide" element={<ScreenerGuide />} />

          {/* Individual Bank Pages */}
          <Route
            path="bank/:ticker"
            element={<BankDetail banks={banks} rawData={rawData} loading={loading} />}
          />

          {/* Metrics */}
          <Route path="metrics" element={<MetricsIndex />} />
          <Route path="metrics/:slug" element={<MetricDetail />} />

          {/* Valuation */}
          <Route path="valuation" element={<ValuationIndex />} />
          <Route path="valuation/:slug" element={<ValuationDetail />} />

          {/* Legal */}
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />

          {/* 404 - Redirect to home */}
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

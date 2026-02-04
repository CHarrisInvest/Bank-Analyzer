import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { fetchBankData } from './data/sheets.js';
import { initializeGA4 } from './analytics/gtag.js';

// Layout and Navigation
import Layout from './components/Layout.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

/**
 * SPA Redirect Handler for GitHub Pages
 * Checks for stored redirect path from 404.html and navigates there
 */
function SpaRedirectHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const redirectPath = sessionStorage.getItem('spa-redirect-path');
    if (redirectPath && location.pathname === '/') {
      sessionStorage.removeItem('spa-redirect-path');
      navigate(redirectPath, { replace: true });
    }
  }, [navigate, location.pathname]);

  return null;
}

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
import Glossary from './pages/Glossary.jsx';
import NotFound from './pages/NotFound.jsx';

/**
 * Main Application Component
 * Manages global state, data fetching, routing, and analytics initialization
 */
function App() {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Transition from pre-rendered SEO content to React app.
  // Adds 'react-ready' class to body which triggers CSS visibility swap:
  // - #root becomes visible (was display:none)
  // - #seo-root becomes hidden (was visible with pre-rendered content)
  // Then removes #seo-root from DOM entirely to prevent duplicate content.
  useEffect(() => {
    document.body.classList.add('react-ready');
    const seoRoot = document.getElementById('seo-root');
    if (seoRoot) seoRoot.remove();
  }, []);

  // Initialize Google Analytics on mount
  useEffect(() => {
    initializeGA4();
  }, []);

  /**
   * Fetch bank data from static JSON file
   */
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const banksResult = await fetchBankData();

      if (banksResult.success) {
        // Filter out banks without tickers - they can't be looked up by users
        const banksWithTickers = banksResult.data.filter(bank => bank.ticker);
        setBanks(banksWithTickers);
        setError(null);
      } else {
        setError(banksResult.error?.message || 'Failed to load bank data');
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

  // Get base path for router
  const basename = import.meta.env.BASE_URL || '/';

  return (
    <HelmetProvider>
      <BrowserRouter basename={basename}>
        <SpaRedirectHandler />
        <ScrollToTop />
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
              element={<BankDetail banks={banks} loading={loading} />}
            />

            {/* Metrics */}
            <Route path="metrics" element={<MetricsIndex />} />
            <Route path="metrics/:slug" element={<MetricDetail />} />

            {/* Valuation */}
            <Route path="valuation" element={<ValuationIndex />} />
            <Route path="valuation/:slug" element={<ValuationDetail />} />

            {/* Glossary */}
            <Route path="glossary" element={<Glossary />} />

            {/* Legal */}
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />

            {/* 404 - Proper not found page with noindex */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;

import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navigation from './Navigation.jsx';
import CookieConsent from './CookieConsent.jsx';
import { usePageTracking, useScrollTracking, useSessionTracking } from '../analytics/useAnalytics.js';

/**
 * Main Layout Component
 * Wraps all pages with navigation, footer, and analytics tracking
 */
function Layout() {
  // Initialize analytics tracking hooks
  usePageTracking();
  useScrollTracking();
  useSessionTracking();

  return (
    <div className="app-layout">
      <Navigation />
      
      <main className="main-content">
        <Outlet />
      </main>

      <footer className="app-footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Bank Analyzer</h3>
              <p>
                Free tools for analyzing publicly traded banks using SEC filing data.
                Updated daily with the latest financial information.
              </p>
            </div>
            
            <div className="footer-section">
              <h4>Tools</h4>
              <ul className="footer-links">
                <li><Link to="/search">Bank Search</Link></li>
                <li><Link to="/screener">Bank Screener</Link></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Learn</h4>
              <ul className="footer-links">
                <li><Link to="/screener/guide">Screener Guide</Link></li>
                <li><Link to="/metrics">Metrics & Ratios</Link></li>
                <li><Link to="/valuation">Valuation Methods</Link></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Legal</h4>
              <ul className="footer-links">
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p className="footer-disclaimer">
              Data sourced from SEC EDGAR filings. For informational purposes only. 
              Not investment advice. Always conduct your own research before making investment decisions.
            </p>
            <p className="footer-copyright">
              &copy; {new Date().getFullYear()} Bank Analyzer. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <CookieConsent />
    </div>
  );
}

export default Layout;

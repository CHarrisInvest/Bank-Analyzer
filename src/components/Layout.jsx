import React, { useState, useCallback } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navigation from './Navigation.jsx';
import BackToTop from './BackToTop.jsx';
import CookieConsent from './CookieConsent.jsx';
import KeyboardShortcutsModal from './KeyboardShortcutsModal.jsx';
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

  // Cookie consent re-open trigger (increment to re-open banner)
  const [cookieSettingsTrigger, setCookieSettingsTrigger] = useState(0);
  const handleOpenCookieSettings = useCallback(() => {
    setCookieSettingsTrigger(prev => prev + 1);
  }, []);

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
              <h3>BankSift</h3>
              <p>
                Bank Investment Tools. Sift through the noise.
                Free tools for analyzing publicly traded bank stocks using SEC filing data.
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
                <li><button className="footer-link-btn" onClick={handleOpenCookieSettings}>Cookie Settings</button></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p className="footer-disclaimer">
              Data sourced from SEC EDGAR filings. For informational purposes only. 
              Not investment advice. Always conduct your own research before making investment decisions.
            </p>
            <p className="footer-shortcuts-hint">
              Press <kbd>?</kbd> for keyboard shortcuts
            </p>
            <p className="footer-copyright">
              &copy; {new Date().getFullYear()} BankSift. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <BackToTop />
      <CookieConsent reopenTrigger={cookieSettingsTrigger} />
      <KeyboardShortcutsModal />
    </div>
  );
}

export default Layout;

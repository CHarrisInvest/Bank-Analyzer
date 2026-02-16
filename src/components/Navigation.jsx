import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { trackNavigation } from '../analytics/events.js';

/**
 * SVG Icon Components - Outlined/Stroked Style
 */

function BankIcon() {
  return (
    <svg
      className="nav-icon"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 21h18" />
      <path d="M3 10h18" />
      <path d="M12 3l9 7H3l9-7z" />
      <path d="M5 10v11" />
      <path d="M19 10v11" />
      <path d="M9 10v11" />
      <path d="M15 10v11" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      className="nav-link-icon"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
}

function ScreenerIcon() {
  return (
    <svg
      className="nav-link-icon"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 3v18h18" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg
      className="nav-link-icon"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      className="nav-link-icon"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg
      className="dropdown-chevron"
      width="14"
      height="14"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 5l3 3 3-3" />
    </svg>
  );
}

/**
 * Main Navigation Component
 * Clean, responsive navigation with dropdown menus
 */
function Navigation() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownTimeoutRef = useRef(null);

  // Close dropdowns when route changes
  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.nav-dropdown')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleDropdownEnter = (dropdown) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(dropdown);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleNavClick = (itemName) => {
    trackNavigation(itemName);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="main-nav" role="navigation" aria-label="Main navigation">
      <div className="nav-container">
        {/* Logo/Brand */}
        <Link to="/" className="nav-brand" onClick={() => handleNavClick('home')}>
          <BankIcon />
          <span className="nav-title">BankSift</span>
        </Link>

        {/* Mobile menu toggle */}
        <button
          className={`nav-mobile-toggle ${mobileMenuOpen ? 'nav-mobile-toggle-active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Navigation links */}
        <div className={`nav-links ${mobileMenuOpen ? 'nav-links-open' : ''}`}>
          {/* Research Section */}
          <div className="nav-section">
            <span className="nav-section-header">Research</span>
            <div className="nav-section-items">
              <Link
                to="/search"
                className={`nav-link ${isActive('/search') ? 'nav-link-active' : ''}`}
                onClick={() => handleNavClick('search')}
              >
                <SearchIcon />
                <span>Search</span>
              </Link>
              <Link
                to="/screener"
                className={`nav-link ${isActive('/screener') && !location.pathname.includes('/guide') ? 'nav-link-active' : ''}`}
                onClick={() => handleNavClick('screener')}
              >
                <ScreenerIcon />
                <span>Screener</span>
              </Link>
            </div>
          </div>

          {/* Learn Section */}
          <div className="nav-section">
            <span className="nav-section-header">Learn</span>
            <div className="nav-section-items">
              <Link
                to="/screener/guide"
                className={`nav-link ${isActive('/screener/guide') ? 'nav-link-active' : ''}`}
                onClick={() => handleNavClick('screener-guide')}
              >
                <BookIcon />
                <span>Screener Guide</span>
              </Link>
              <Link
                to="/metrics"
                className={`nav-link ${isActive('/metrics') ? 'nav-link-active' : ''}`}
                onClick={() => handleNavClick('metrics')}
              >
                <BookIcon />
                <span>Metrics & Ratios</span>
              </Link>
              <Link
                to="/valuation"
                className={`nav-link ${isActive('/valuation') ? 'nav-link-active' : ''}`}
                onClick={() => handleNavClick('valuation')}
              >
                <BookIcon />
                <span>Valuation</span>
              </Link>
              <Link
                to="/faq"
                className={`nav-link ${isActive('/faq') ? 'nav-link-active' : ''}`}
                onClick={() => handleNavClick('faq')}
              >
                <InfoIcon />
                <span>FAQ</span>
              </Link>
            </div>
          </div>

          {/* About Section */}
          <div className="nav-section">
            <span className="nav-section-header">About</span>
            <div className="nav-section-items">
              <Link
                to="/privacy"
                className={`nav-link ${isActive('/privacy') ? 'nav-link-active' : ''}`}
                onClick={() => handleNavClick('privacy')}
              >
                <InfoIcon />
                <span>Privacy Policy</span>
              </Link>
              <Link
                to="/terms"
                className={`nav-link ${isActive('/terms') ? 'nav-link-active' : ''}`}
                onClick={() => handleNavClick('terms')}
              >
                <InfoIcon />
                <span>Terms of Service</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;

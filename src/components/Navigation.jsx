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
          <span className="nav-title">Bank Analyzer</span>
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
          {/* Search */}
          <Link
            to="/search"
            className={`nav-link ${isActive('/search') ? 'nav-link-active' : ''}`}
            onClick={() => handleNavClick('search')}
          >
            <SearchIcon />
            <span>Search</span>
          </Link>

          {/* Screener */}
          <Link
            to="/screener"
            className={`nav-link ${isActive('/screener') && !location.pathname.includes('/guide') ? 'nav-link-active' : ''}`}
            onClick={() => handleNavClick('screener')}
          >
            <ScreenerIcon />
            <span>Screener</span>
          </Link>

          {/* Learn Dropdown */}
          <div
            className={`nav-dropdown ${activeDropdown === 'learn' ? 'nav-dropdown-open' : ''}`}
            onMouseEnter={() => handleDropdownEnter('learn')}
            onMouseLeave={handleDropdownLeave}
          >
            <button
              className={`nav-link nav-dropdown-toggle ${isActive('/screener/guide') || isActive('/metrics') || isActive('/valuation') ? 'nav-link-active' : ''}`}
              onClick={() => setActiveDropdown(activeDropdown === 'learn' ? null : 'learn')}
              aria-expanded={activeDropdown === 'learn'}
              aria-haspopup="true"
            >
              <BookIcon />
              <span>Learn</span>
              <ChevronIcon />
            </button>
            <div className="nav-dropdown-menu">
              <Link
                to="/screener/guide"
                className="nav-dropdown-item"
                onClick={() => handleNavClick('screener-guide')}
              >
                Screener Guide
              </Link>
              <Link
                to="/metrics"
                className="nav-dropdown-item"
                onClick={() => handleNavClick('metrics')}
              >
                Metrics & Ratios
              </Link>
              <Link
                to="/valuation"
                className="nav-dropdown-item"
                onClick={() => handleNavClick('valuation')}
              >
                Valuation Methods
              </Link>
            </div>
          </div>

          {/* About Dropdown */}
          <div
            className={`nav-dropdown ${activeDropdown === 'about' ? 'nav-dropdown-open' : ''}`}
            onMouseEnter={() => handleDropdownEnter('about')}
            onMouseLeave={handleDropdownLeave}
          >
            <button
              className={`nav-link nav-dropdown-toggle ${isActive('/privacy') || isActive('/terms') ? 'nav-link-active' : ''}`}
              onClick={() => setActiveDropdown(activeDropdown === 'about' ? null : 'about')}
              aria-expanded={activeDropdown === 'about'}
              aria-haspopup="true"
            >
              <InfoIcon />
              <span>About</span>
              <ChevronIcon />
            </button>
            <div className="nav-dropdown-menu">
              <Link
                to="/privacy"
                className="nav-dropdown-item"
                onClick={() => handleNavClick('privacy')}
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="nav-dropdown-item"
                onClick={() => handleNavClick('terms')}
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;

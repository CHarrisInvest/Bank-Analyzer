import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { trackNavigation } from '../analytics/events.js';

/**
 * Bank Icon SVG Component
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

/**
 * Chevron Down Icon
 */
function ChevronIcon() {
  return (
    <svg
      className="dropdown-chevron"
      width="12"
      height="12"
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
            Search
          </Link>

          {/* Screener */}
          <Link
            to="/screener"
            className={`nav-link ${isActive('/screener') && !location.pathname.includes('/guide') ? 'nav-link-active' : ''}`}
            onClick={() => handleNavClick('screener')}
          >
            Screener
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
              Learn
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
              About
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

import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { trackNavigation } from '../analytics/events.js';

/**
 * Main Navigation Component
 * Responsive navigation with dropdown menus for Learn and About sections
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

  const mobileMenuClass = mobileMenuOpen ? 'nav-links nav-links-open' : 'nav-links';
  const learnDropdownClass = activeDropdown === 'learn' ? 'nav-dropdown nav-dropdown-open' : 'nav-dropdown';
  const aboutDropdownClass = activeDropdown === 'about' ? 'nav-dropdown nav-dropdown-open' : 'nav-dropdown';

  return (
    <nav className="main-nav" role="navigation" aria-label="Main navigation">
      <div className="nav-container">
        {/* Logo/Brand */}
        <Link to="/" className="nav-brand" onClick={() => handleNavClick('home')}>
          <span className="nav-logo">🏦</span>
          <span className="nav-title">Bank Analyzer</span>
        </Link>

        {/* Mobile menu toggle */}
        <button
          className="nav-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Navigation links */}
        <div className={mobileMenuClass}>
          {/* Search */}
          <Link
            to="/search"
            className={isActive('/search') ? 'nav-link nav-link-active' : 'nav-link'}
            onClick={() => handleNavClick('search')}
          >
            Search
          </Link>

          {/* Screener */}
          <Link
            to="/screener"
            className={isActive('/screener') && !location.pathname.includes('/guide') ? 'nav-link nav-link-active' : 'nav-link'}
            onClick={() => handleNavClick('screener')}
          >
            Screener
          </Link>

          {/* Learn Dropdown */}
          <div
            className={learnDropdownClass}
            onMouseEnter={() => handleDropdownEnter('learn')}
            onMouseLeave={handleDropdownLeave}
          >
            <button
              className={isActive('/screener/guide') || isActive('/metrics') || isActive('/valuation') ? 'nav-link nav-dropdown-toggle nav-link-active' : 'nav-link nav-dropdown-toggle'}
              onClick={() => setActiveDropdown(activeDropdown === 'learn' ? null : 'learn')}
              aria-expanded={activeDropdown === 'learn'}
              aria-haspopup="true"
            >
              Learn
              <svg className="dropdown-arrow" width="10" height="6" viewBox="0 0 10 6" fill="currentColor">
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              </svg>
            </button>
            <div className="nav-dropdown-menu">
              <Link
                to="/screener/guide"
                className="nav-dropdown-item"
                onClick={() => handleNavClick('screener-guide')}
              >
                <span className="dropdown-item-title">Screener Guide</span>
                <span className="dropdown-item-desc">How to use the bank screener</span>
              </Link>
              <Link
                to="/metrics"
                className="nav-dropdown-item"
                onClick={() => handleNavClick('metrics')}
              >
                <span className="dropdown-item-title">Metrics & Ratios</span>
                <span className="dropdown-item-desc">Financial metrics explained</span>
              </Link>
              <Link
                to="/valuation"
                className="nav-dropdown-item"
                onClick={() => handleNavClick('valuation')}
              >
                <span className="dropdown-item-title">Valuation Methods</span>
                <span className="dropdown-item-desc">Bank valuation approaches</span>
              </Link>
            </div>
          </div>

          {/* About Dropdown */}
          <div
            className={aboutDropdownClass}
            onMouseEnter={() => handleDropdownEnter('about')}
            onMouseLeave={handleDropdownLeave}
          >
            <button
              className={isActive('/privacy') || isActive('/terms') ? 'nav-link nav-dropdown-toggle nav-link-active' : 'nav-link nav-dropdown-toggle'}
              onClick={() => setActiveDropdown(activeDropdown === 'about' ? null : 'about')}
              aria-expanded={activeDropdown === 'about'}
              aria-haspopup="true"
            >
              About
              <svg className="dropdown-arrow" width="10" height="6" viewBox="0 0 10 6" fill="currentColor">
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              </svg>
            </button>
            <div className="nav-dropdown-menu">
              <Link
                to="/privacy"
                className="nav-dropdown-item"
                onClick={() => handleNavClick('privacy')}
              >
                <span className="dropdown-item-title">Privacy Policy</span>
                <span className="dropdown-item-desc">How we handle your data</span>
              </Link>
              <Link
                to="/terms"
                className="nav-dropdown-item"
                onClick={() => handleNavClick('terms')}
              >
                <span className="dropdown-item-title">Terms of Service</span>
                <span className="dropdown-item-desc">Usage terms and conditions</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;

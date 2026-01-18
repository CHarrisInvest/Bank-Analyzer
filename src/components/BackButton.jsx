import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { sendPageView } from '../analytics/gtag.js';

/**
 * Back Button Component
 * Navigates back to the originating page while preserving state (filters, search query, scroll position)
 * Counts as a new page view for analytics purposes
 */
function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};

  // Determine the back destination based on where user came from
  const getBackInfo = () => {
    const scrollY = state.scrollY || 0;

    if (state.from === 'search') {
      return {
        path: '/search',
        label: 'Back to Search',
        state: {
          searchQuery: state.searchQuery || '',
          filterExchange: state.filterExchange || '',
          restoreScroll: true,
          scrollY: scrollY,
        },
      };
    }
    if (state.from === 'screener') {
      return {
        path: '/screener',
        label: 'Back to Screener',
        state: {
          filters: state.filters || null,
          restoreScroll: true,
          scrollY: scrollY,
        },
      };
    }
    if (state.from === 'metrics') {
      return {
        path: '/metrics',
        label: 'Back to Metrics',
        state: {
          restoreScroll: true,
          scrollY: scrollY,
        },
      };
    }
    if (state.from === 'metrics-detail') {
      return {
        path: state.returnPath || '/metrics',
        label: 'Back',
        state: {
          restoreScroll: true,
          scrollY: scrollY,
        },
      };
    }
    if (state.from === 'valuation') {
      return {
        path: '/valuation',
        label: 'Back to Valuation',
        state: {
          restoreScroll: true,
          scrollY: scrollY,
        },
      };
    }
    if (state.from === 'valuation-detail') {
      return {
        path: state.returnPath || '/valuation',
        label: 'Back',
        state: {
          restoreScroll: true,
          scrollY: scrollY,
        },
      };
    }
    if (state.from === 'home') {
      return {
        path: '/',
        label: 'Back to Home',
        state: {
          restoreScroll: true,
          scrollY: scrollY,
        },
      };
    }
    if (state.from === 'screener-guide') {
      return {
        path: '/screener/guide',
        label: 'Back to Guide',
        state: {
          restoreScroll: true,
          scrollY: scrollY,
        },
      };
    }
    if (state.from === 'bank-detail') {
      return {
        path: state.returnPath || '/screener',
        label: 'Back',
        state: {
          restoreScroll: true,
          scrollY: scrollY,
        },
      };
    }
    // Default: go to screener without scroll restore
    return {
      path: '/screener',
      label: 'Back to Screener',
      state: null,
    };
  };

  const handleBack = () => {
    const backInfo = getBackInfo();

    // Track as a new page view (for ad impressions)
    sendPageView(backInfo.path, backInfo.label.replace('Back to ', '').replace('Back', 'Previous Page'));

    // Navigate with state preserved
    navigate(backInfo.path, {
      state: backInfo.state,
    });
  };

  const backInfo = getBackInfo();

  return (
    <button
      className="back-button"
      onClick={handleBack}
      aria-label={backInfo.label}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 12L6 8l4-4" />
      </svg>
      <span>{backInfo.label}</span>
    </button>
  );
}

export default BackButton;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Screener from '../components/Screener.jsx';
import SEO from '../components/SEO.jsx';

/**
 * Screener Page Wrapper
 * Wraps the Screener component for use with React Router
 */
function ScreenerPage({ banks, loading }) {
  const [showInfo, setShowInfo] = useState(false);

  // Note: Schema (BreadcrumbList, WebApplication, FAQPage) is provided by the prerender script
  // (scripts/prerender.mjs) in the static HTML for immediate crawler access.
  // Do NOT add a schema here to avoid duplicates.

  return (
    <div className="page screener-page">
      <SEO
        title="Free Bank Stock Screener | Filter & Compare Bank Stocks by 25+ Metrics - BankSift"
        description="Free online bank stock screener to filter, rank, and compare 300+ US bank stocks. Screen by ROE, P/B ratio, Graham Number, efficiency ratio, and 20+ financial metrics. Updated daily from SEC filings. No registration required."
        canonical="/screener"
        image="https://banksift.org/og-screener.png"
      />
      <div className="page-header screener-page-header">
        <h1>Bank Screener <em>"The Sifter"</em></h1>
        <p>Filter and analyze publicly traded banks by financial metrics.</p>
        <button
          className="info-toggle"
          onClick={() => setShowInfo(!showInfo)}
          aria-expanded={showInfo}
        >
          {showInfo ? 'Hide details' : 'About this screener'}
        </button>
        {showInfo && (
          <div className="screener-info">
            <p>
              Screen and filter 300+ US bank stocks using 25+ financial metrics including ROE, ROAA,
              efficiency ratio, price-to-book, and Graham Number. Our free bank equity screener updates
              daily from SEC EDGAR filings, helping value investors identify undervalued bank stocks.
            </p>
            <p>
              <Link to="/screener/guide">View the Screener Guide</Link> for detailed instructions on
              using filters and interpreting results.
            </p>
          </div>
        )}
      </div>
      <Screener banks={banks} loading={loading} />
    </div>
  );
}

export default ScreenerPage;

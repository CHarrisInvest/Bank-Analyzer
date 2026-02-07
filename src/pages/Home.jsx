import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';

/**
 * SVG Icon Components - Outlined/Stroked Style
 */

function SearchIcon() {
  return (
    <svg
      className="feature-icon-svg"
      width="32"
      height="32"
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
      className="feature-icon-svg"
      width="32"
      height="32"
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

function MetricsIcon() {
  return (
    <svg
      className="feature-icon-svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}

function ValuationIcon() {
  return (
    <svg
      className="feature-icon-svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg
      className="data-icon-svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg
      className="data-icon-svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 2v6h-6" />
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M3 22v-6h6" />
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      className="data-icon-svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

/**
 * Home Page Component
 * Landing page with overview and quick links to main features
 */
function Home() {
  const homeSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is BankSift?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "BankSift is a free online bank stock analysis platform that lets investors screen, compare, and analyze over 300 publicly traded US bank stocks. It provides financial metrics like ROE, P/B ratio, efficiency ratio, and Graham Number, all sourced directly from SEC EDGAR filings and updated daily."
            }
          },
          {
            "@type": "Question",
            "name": "Which financial metrics can I track with BankSift?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "BankSift tracks 25+ bank financial metrics including Return on Equity (ROE), Return on Average Assets (ROAA), Net Interest Margin (NIM), Efficiency Ratio, Price to Book (P/B), Price to Earnings (P/E), Earnings Per Share (EPS), Book Value Per Share (BVPS), Equity to Assets, Loans to Deposits, Deposits to Assets, Dividend Payout Ratio, and Graham Number. These cover profitability, efficiency, capital strength, and valuation categories."
            }
          },
          {
            "@type": "Question",
            "name": "How can I compare bank stocks efficiently?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use the BankSift Bank Screener to filter and compare 300+ US bank stocks side-by-side. Set minimum and maximum ranges for key metrics like ROE, P/B ratio, and efficiency ratio to find banks that meet your investment criteria. Results can be sorted by any metric and exported to CSV for further analysis."
            }
          },
          {
            "@type": "Question",
            "name": "Is BankSift free to use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, BankSift is completely free to use. No account, sign up, or email is required. All tools including the bank stock screener, search, financial metrics guides, and valuation methods are available at no cost."
            }
          },
          {
            "@type": "Question",
            "name": "Where does BankSift get its data?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "All financial data on BankSift is sourced directly from the SEC EDGAR database, the official repository for US public company filings. The system automatically pulls the latest 10-K and 10-Q filings daily, calculates trailing twelve month (TTM) metrics, and derives key financial ratios for over 300 publicly traded banks."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="page home-page">
      <SEO
        title={null}
        description="Free bank stock screener and analysis platform. Screen and compare 300+ US bank stocks by ROE, P/B ratio, efficiency ratio, Graham Number, and 25+ financial metrics. SEC filing data updated daily. No sign up required."
        canonical="/"
        schema={homeSchema}
      />
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>BankSift</h1>
          <p className="hero-tagline">Bank Investment Tools</p>
          <p className="hero-subtitle">
            Sift through the noise. Screen and analyze publicly traded bank stocks using
            official SEC filing data. Updated daily.
          </p>
          <p className="hero-access-note">
            No account. No sign up. No email required.
          </p>
          <p className="hero-cta-text">Screen. Analyze. Invest.</p>
          <div className="hero-actions">
            <Link to="/screener" className="btn btn-primary btn-lg">
              Open Screener
            </Link>
            <Link to="/search" className="btn btn-secondary btn-lg">
              Search Banks
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>What You Can Do</h2>
        <div className="features-grid">
          <div className="feature-card">
            <Link to="/search" className="feature-icon-link">
              <div className="feature-icon">
                <SearchIcon />
              </div>
            </Link>
            <h3>Bank Search</h3>
            <p>
              Quickly find any publicly traded bank stock by ticker symbol, name,
              or exchange. Access detailed financial profiles instantly.
            </p>
            <Link to="/search" className="feature-link">Search Banks →</Link>
          </div>

          <div className="feature-card">
            <Link to="/screener" className="feature-icon-link">
              <div className="feature-icon">
                <ScreenerIcon />
              </div>
            </Link>
            <h3>Bank Screener <em>"The Sifter"</em></h3>
            <p>
              Filter bank stocks by financial metrics like ROE, efficiency ratio,
              price-to-book, and more. Find stocks that match your criteria.
            </p>
            <Link to="/screener" className="feature-link">Open Screener →</Link>
          </div>

          <div className="feature-card">
            <Link to="/metrics" className="feature-icon-link">
              <div className="feature-icon">
                <MetricsIcon />
              </div>
            </Link>
            <h3>Financial Analysis</h3>
            <p>
              View detailed balance sheets, income statements, and calculated
              ratios for each bank. All data sourced directly from SEC filings.
            </p>
            <Link to="/metrics" className="feature-link">Learn About Metrics →</Link>
          </div>

          <div className="feature-card">
            <Link to="/valuation" className="feature-icon-link">
              <div className="feature-icon">
                <ValuationIcon />
              </div>
            </Link>
            <h3>Valuation Tools</h3>
            <p>
              Apply various valuation methodologies including Graham Number,
              margin of safety calculations, and comparative analysis.
            </p>
            <Link to="/valuation" className="feature-link">Valuation Methods →</Link>
          </div>
        </div>
      </section>

      {/* Data Source Section */}
      <section className="data-section">
        <h2>Reliable Data You Can Trust</h2>
        <div className="data-info">
          <div className="data-point">
            <DatabaseIcon />
            <span className="data-value">300+</span>
            <span className="data-label">Bank Stocks Tracked</span>
          </div>
          <div className="data-point">
            <RefreshIcon />
            <span className="data-value">Daily</span>
            <span className="data-label">Data Updates</span>
          </div>
          <div className="data-point">
            <ShieldIcon />
            <span className="data-value">SEC</span>
            <span className="data-label">Official Source</span>
          </div>
        </div>
        <p className="data-description">
          All financial data is sourced directly from the SEC EDGAR database,
          ensuring accuracy and reliability. Our automated systems pull the latest
          10-K and 10-Q filings daily, calculating trailing twelve month (TTM)
          metrics and key financial ratios.
        </p>
      </section>

      {/* Getting Started Section */}
      <section className="getting-started-section">
        <h2>Getting Started</h2>
        <div className="steps-grid">
          <div className="step-card">
            <span className="step-number">1</span>
            <h3>Choose Your Tool</h3>
            <p>
              Use the Screener for filtering multiple bank stocks by criteria, or
              Search to find a specific bank stock quickly.
            </p>
          </div>
          <div className="step-card">
            <span className="step-number">2</span>
            <h3>Apply Filters</h3>
            <p>
              Set your preferred ranges for metrics like ROE, efficiency ratio,
              price multiples, and more.
            </p>
          </div>
          <div className="step-card">
            <span className="step-number">3</span>
            <h3>Analyze Results</h3>
            <p>
              Review detailed stock profiles, compare banks side-by-side, and dive
              into financial statements.
            </p>
          </div>
        </div>
        <div className="cta-box">
          <p>New to bank analysis?</p>
          <Link to="/screener/guide" className="btn btn-outline">
            Read the Screener Guide
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;

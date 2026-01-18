import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Home Page Component
 * Landing page with overview and quick links to main features
 */
function Home() {
  return (
    <div className="page home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Bank Equity Analyzer</h1>
          <p className="hero-subtitle">
            Free tools for screening and analyzing publicly traded banks using
            official SEC filing data. Updated daily with the latest financial information.
          </p>
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
            <div className="feature-icon">🔍</div>
            <h3>Bank Search</h3>
            <p>
              Quickly find any publicly traded bank by ticker symbol, name, state,
              or exchange. Access detailed financial profiles instantly.
            </p>
            <Link to="/search" className="feature-link">Search Banks →</Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Bank Screener</h3>
            <p>
              Filter banks by financial metrics like ROE, efficiency ratio,
              price-to-book, and more. Find banks that match your criteria.
            </p>
            <Link to="/screener" className="feature-link">Open Screener →</Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Financial Analysis</h3>
            <p>
              View detailed balance sheets, income statements, and calculated
              ratios for each bank. All data sourced directly from SEC filings.
            </p>
            <Link to="/metrics" className="feature-link">Learn About Metrics →</Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💡</div>
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
            <span className="data-value">339+</span>
            <span className="data-label">Banks Tracked</span>
          </div>
          <div className="data-point">
            <span className="data-value">Daily</span>
            <span className="data-label">Data Updates</span>
          </div>
          <div className="data-point">
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
              Use the Screener for filtering multiple banks by criteria, or
              Search to find a specific bank quickly.
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
              Review detailed profiles, compare banks side-by-side, and dive
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

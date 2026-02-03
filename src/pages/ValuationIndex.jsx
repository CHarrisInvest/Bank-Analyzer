import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { VALUATION_METHODS } from '../data/content/valuations.js';
import NavigationLink from '../components/NavigationLink.jsx';
import SEO from '../components/SEO.jsx';

/**
 * Valuation Index Page
 * Overview of valuation methodologies for banks
 */
function ValuationIndex() {
  const location = useLocation();
  const incomingState = location.state || {};

  // Restore scroll position when returning via back button
  useEffect(() => {
    if (incomingState.restoreScroll && incomingState.scrollY) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: incomingState.scrollY, behavior: 'instant' });
      });
    }
  }, [incomingState.restoreScroll, incomingState.scrollY]);

  return (
    <div className="page valuation-index-page">
      <SEO
        title="Bank Valuation Methods Guide"
        description="Learn how to value bank stocks using Graham Number, margin of safety, P/E ratio, P/B ratio, and other proven valuation methods for bank investing."
        canonical="/valuation"
      />
      <div className="page-header">
        <h1>Valuation Methods</h1>
        <p>
          Bank valuation requires specialized approaches due to the unique nature of
          financial institutions. This guide covers various methodologies used to
          assess the intrinsic value of bank stocks.
        </p>
      </div>

      <div className="valuation-content">
        <section className="valuation-intro">
          <h2>Why Bank Valuation is Different</h2>
          <p>
            Banks operate differently from typical industrial companies. Their primary
            business involves borrowing money (deposits) and lending it out at higher
            rates. This means traditional valuation metrics like EV/EBITDA are not
            applicable. Instead, bank analysts focus on book value, earnings quality,
            and regulatory capital measures.
          </p>
        </section>

        <section className="valuation-methods">
          <h2>Valuation Approaches</h2>
          <div className="methods-grid">
            {VALUATION_METHODS.map(method => (
              <NavigationLink
                key={method.slug}
                to={'/valuation/' + method.slug}
                state={{ from: 'valuation' }}
                className="method-card"
                pageTitle={method.name}
              >
                <h3>{method.name}</h3>
                <p className="method-type">{method.type}</p>
                <p className="method-summary">{method.shortDescription}</p>
                <div className="method-card-footer">
                  <span className="method-learn-badge">Learn more →</span>
                </div>
              </NavigationLink>
            ))}
          </div>
        </section>

        <section className="valuation-framework">
          <h2>General Valuation Framework</h2>
          <div className="framework-steps">
            <div className="step">
              <span className="step-number">1</span>
              <h3>Assess Quality</h3>
              <p>
                Evaluate the bank's asset quality, management effectiveness,
                earnings consistency, and regulatory standing.
              </p>
            </div>
            <div className="step">
              <span className="step-number">2</span>
              <h3>Analyze Profitability</h3>
              <p>
                Examine return metrics (ROE, ROAA), efficiency ratios, and
                net interest margins relative to peers.
              </p>
            </div>
            <div className="step">
              <span className="step-number">3</span>
              <h3>Apply Valuation Metrics</h3>
              <p>
                Use appropriate multiples (P/B, P/E) and intrinsic value
                methods based on the bank's characteristics.
              </p>
            </div>
            <div className="step">
              <span className="step-number">4</span>
              <h3>Compare to Peers</h3>
              <p>
                Benchmark against similar banks in terms of size, geography,
                business model, and risk profile.
              </p>
            </div>
          </div>
        </section>

        <section className="valuation-cautions">
          <h2>Important Cautions</h2>
          <ul>
            <li>
              <strong>Book Value Adjustments:</strong> Reported book value may not
              reflect true economic value due to loan loss provisions, held-to-maturity
              securities, and other accounting treatments.
            </li>
            <li>
              <strong>Interest Rate Sensitivity:</strong> Bank valuations are heavily
              influenced by interest rate expectations. Rising rates generally help
              net interest margins but can hurt bond portfolios.
            </li>
            <li>
              <strong>Credit Cycle Timing:</strong> Bank earnings are cyclical.
              Valuations should account for where we are in the credit cycle.
            </li>
            <li>
              <strong>Regulatory Changes:</strong> Banks operate in a heavily regulated
              environment. New regulations can significantly impact profitability.
            </li>
          </ul>
        </section>

        <div className="metrics-cross-links">
          <Link to="/metrics" className="btn btn-secondary btn-lg">
            Metrics & Ratios
          </Link>
          <Link to="/screener/guide" className="btn btn-secondary btn-lg">
            Screener Guide
          </Link>
          <Link to="/screener" className="btn btn-primary btn-lg">
            Open Screener
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ValuationIndex;

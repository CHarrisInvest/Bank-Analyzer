import React, { useEffect, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
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

  const valuationSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://banksift.org" },
          { "@type": "ListItem", "position": 2, "name": "Valuation Methods", "item": "https://banksift.org/valuation" }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I value bank stocks using P/B ratio?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Price to Book (P/B) ratio is the primary valuation metric for banks because bank assets are mostly financial instruments carried near fair value. A P/B below 1.0 may indicate undervaluation if fundamentals are solid (ROE above 8%). Compare P/B across similar banks and consider the bank's ROE — higher ROE banks deserve higher P/B multiples. The ROE-P/B framework on BankSift helps calculate the justified P/B for any given level of profitability."
            }
          },
          {
            "@type": "Question",
            "name": "What is the Graham Number in bank valuation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Graham Number is a value investing formula created by Benjamin Graham that estimates the maximum fair price for a stock. It is calculated as the square root of (22.5 × Earnings Per Share × Book Value Per Share). For banks, the Graham Number provides a conservative intrinsic value estimate. When a bank's stock price is below its Graham Number, it may be undervalued relative to its earnings and book value."
            }
          },
          {
            "@type": "Question",
            "name": "Which valuation methods are best for banks?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The best valuation methods for banks include Price to Book (P/B) valuation as the primary approach, complemented by Price to Earnings (P/E) for earnings power assessment. The Graham Number and margin of safety calculations help identify undervalued banks. The Dividend Discount Model works well for dividend-paying banks. The ROE-P/B framework links profitability to justified valuation multiples. Peer comparison analysis benchmarks a bank against similar institutions."
            }
          },
          {
            "@type": "Question",
            "name": "Why is bank valuation different from other companies?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Banks operate fundamentally differently from industrial companies. Their primary business is borrowing money (deposits) and lending it at higher rates. Traditional valuation metrics like EV/EBITDA are not applicable because debt is an operating asset for banks, not a financing choice. Instead, analysts focus on book value (since bank assets are mostly financial instruments), earnings quality, regulatory capital ratios, and interest rate sensitivity."
            }
          },
          {
            "@type": "Question",
            "name": "How do I use margin of safety when investing in bank stocks?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Margin of safety is the discount between a bank stock's estimated intrinsic value and its current market price. Calculate intrinsic value using the Graham Number or other methods, then compare it to the stock price. A margin of safety of 20% or more provides a buffer against analytical errors. For example, if the Graham Number for a bank is $50 and the stock trades at $38, the margin of safety is 24%."
            }
          }
        ]
      }
    ]
  }), []);

  return (
    <div className="page valuation-index-page">
      <SEO
        title="Bank Valuation Methods Guide | P/B, Graham Number, P/E & More"
        description="Learn how to value bank stocks using Graham Number, margin of safety, P/B ratio, P/E ratio, dividend discount model, and peer comparison analysis. Free guide to bank stock valuation techniques for investors."
        canonical="/valuation"
        schema={valuationSchema}
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

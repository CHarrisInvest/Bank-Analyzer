import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { VALUATION_METHODS } from '../data/content/valuations.js';
import { METRICS } from '../data/content/metrics.js';
import { trackValuationMethodViewed } from '../analytics/events.js';

// Cross-links from valuation methods to related metrics
const VALUATION_TO_METRICS = {
  'graham-number': ['earnings-per-share', 'book-value-per-share', 'price-to-earnings', 'price-to-book'],
  'margin-of-safety': ['earnings-per-share', 'book-value-per-share'],
  'price-to-book-valuation': ['price-to-book', 'book-value-per-share', 'equity-to-assets', 'roe'],
  'price-to-earnings-valuation': ['price-to-earnings', 'earnings-per-share', 'roe'],
  'roe-pb-framework': ['roe', 'price-to-book', 'equity-to-assets'],
  'dividend-discount-model': ['dividend-payout-ratio', 'earnings-per-share', 'roe'],
  'peer-comparison': ['roe', 'roaa', 'efficiency-ratio', 'price-to-book', 'price-to-earnings'],
};
import BackButton from '../components/BackButton.jsx';
import NavigationLink from '../components/NavigationLink.jsx';
import SEO from '../components/SEO.jsx';

/**
 * Valuation Method Detail Page
 * Detailed explanation of a single valuation methodology
 */
function ValuationDetail() {
  const { slug } = useParams();

  const method = VALUATION_METHODS.find(m => m.slug === slug);

  useEffect(() => {
    if (method) {
      trackValuationMethodViewed(slug);
    }
  }, [slug, method]);

  if (!method) {
    return (
      <div className="page valuation-detail-page">
        <div className="not-found">
          <h1>Valuation Method Not Found</h1>
          <p>No valuation method found with identifier "{slug}".</p>
          <Link to="/valuation" className="btn btn-primary">View All Methods</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page valuation-detail-page">
      <SEO
        title={`${method.name} - Bank Valuation Method`}
        description={`${method.shortDescription} Learn how to use ${method.name} to value bank stocks.`}
        canonical={`/valuation/${slug}`}
        type="article"
      />
      <BackButton />

      <nav className="breadcrumb">
        <Link to="/valuation">Valuation Methods</Link>
        <span className="separator">/</span>
        <span>{method.name}</span>
      </nav>

      <article className="valuation-article">
        <header className="valuation-header">
          <h1>{method.name}</h1>
          <p className="valuation-type">{method.type}</p>
        </header>

        <section className="valuation-section">
          <h2>Overview</h2>
          <p>{method.description}</p>
        </section>

        {method.formula && (
          <section className="valuation-section">
            <h2>Formula</h2>
            <div className="formula-box">
              <code>{method.formula}</code>
            </div>
            {method.isPercentage && (
              <p className="formula-pct-note">Result is typically expressed as a percentage.</p>
            )}
            {method.formulaExplanation && (
              <p className="formula-explanation">{method.formulaExplanation}</p>
            )}
          </section>
        )}

        <section className="valuation-section">
          <h2>How to Apply</h2>
          <div className="application-steps">
            {method.steps.map((step, idx) => (
              <div key={idx} className="application-step">
                <span className="step-number">{idx + 1}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </section>

        {method.example && (
          <section className="valuation-section">
            <h2>Example Calculation</h2>
            <div className="example-box">
              <p>{method.example}</p>
            </div>
          </section>
        )}

        <section className="valuation-section">
          <h2>Strengths</h2>
          <ul className="strengths-list">
            {method.strengths.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="valuation-section">
          <h2>Limitations</h2>
          <ul className="limitations-list">
            {method.limitations.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>

        {method.bankSpecific && (
          <section className="valuation-section">
            <h2>Bank-Specific Considerations</h2>
            <p>{method.bankSpecific}</p>
          </section>
        )}

        {method.relatedMethods && method.relatedMethods.length > 0 && (
          <section className="valuation-section">
            <h2>Related Methods</h2>
            <div className="related-methods">
              {method.relatedMethods.map(related => {
                const relatedMethod = VALUATION_METHODS.find(m => m.slug === related);
                if (!relatedMethod) return null;
                return (
                  <NavigationLink
                    key={related}
                    to={'/valuation/' + related}
                    state={{ from: 'valuation-detail', returnPath: '/valuation/' + slug }}
                    className="related-method-link"
                    pageTitle={relatedMethod.name}
                  >
                    {relatedMethod.name}
                  </NavigationLink>
                );
              })}
            </div>
          </section>
        )}

        {VALUATION_TO_METRICS[slug] && VALUATION_TO_METRICS[slug].length > 0 && (
          <section className="valuation-section">
            <h2>Related Metrics</h2>
            <div className="related-methods">
              {VALUATION_TO_METRICS[slug].map(metricSlug => {
                const metric = METRICS.find(m => m.slug === metricSlug);
                if (!metric) return null;
                return (
                  <NavigationLink
                    key={metricSlug}
                    to={'/metrics/' + metricSlug}
                    state={{ from: 'valuation-detail', returnPath: '/valuation/' + slug }}
                    className="related-method-link"
                    pageTitle={metric.name}
                  >
                    {metric.name}
                  </NavigationLink>
                );
              })}
            </div>
          </section>
        )}
      </article>

      <div className="page-navigation">
        <NavigationLink
          to="/valuation"
          state={{ from: 'valuation-detail' }}
          className="btn btn-secondary"
          pageTitle="All Methods"
        >
          ← All Methods
        </NavigationLink>
        <NavigationLink
          to="/screener"
          state={{ from: 'valuation-detail' }}
          className="btn btn-primary"
          pageTitle="Screener"
        >
          Use in Screener →
        </NavigationLink>
      </div>
    </div>
  );
}

export default ValuationDetail;

import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { VALUATION_METHODS } from '../data/content/valuations.js';
import { trackValuationMethodViewed } from '../analytics/events.js';
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

import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { VALUATION_METHODS } from '../data/content/valuations.js';
import { METRICS } from '../data/content/metrics.js';
import { trackValuationMethodViewed } from '../analytics/events.js';
import BackButton from '../components/BackButton.jsx';
import NavigationLink from '../components/NavigationLink.jsx';
import SEO from '../components/SEO.jsx';
import { renderFormattedText } from '../utils/renderFormattedText.jsx';

// Related metrics and method descriptions are now sourced from the data model
// (valuations.js: relatedMetricDescriptions, relatedMethodDescriptions)
// to ensure consistency between React rendering and prerender output.

/**
 * Valuation Method Detail Page
 * Detailed explanation of a single valuation methodology
 */
function ValuationDetail() {
  const { slug } = useParams();

  const method = VALUATION_METHODS.find(m => m.slug === slug);

  // Note: Schema (BreadcrumbList, FAQPage) is provided by the prerender script
  // (scripts/prerender.mjs) in the static HTML for immediate crawler access.
  // Do NOT add a schema here to avoid duplicates.

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
        title={`${method.name} Explained | Bank Valuation Method Guide`}
        description={`${method.shortDescription} Learn how to calculate and apply ${method.name} to value US bank stocks, with formula, examples, strengths, and limitations.`}
        canonical={`/valuation/${slug}`}
        image="https://banksift.org/og-valuation.png"
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
          {renderFormattedText(method.description, 'desc')}
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
              <div className="formula-explanation">{renderFormattedText(method.formulaExplanation, 'fexp')}</div>
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
              {renderFormattedText(method.example, 'ex')}
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
            {renderFormattedText(method.bankSpecific, 'bsc')}
          </section>
        )}

        {method.whenToUse && (
          <section className="valuation-section">
            <h2>When to Use This Method</h2>
            {renderFormattedText(method.whenToUse, 'wtu')}
          </section>
        )}

        {method.methodConnections && (
          <section className="valuation-section">
            <h2>Method Connections</h2>
            {renderFormattedText(method.methodConnections, 'mconn')}
          </section>
        )}

        {method.commonMistakes && (
          <section className="valuation-section">
            <h2>Common Mistakes</h2>
            {renderFormattedText(method.commonMistakes, 'cm')}
          </section>
        )}

        {method.acrossBankTypes && (
          <section className="valuation-section">
            <h2>Across Bank Types</h2>
            {renderFormattedText(method.acrossBankTypes, 'abt')}
          </section>
        )}

        <div className="faq-explore-more">
          <h2 className="faq-explore-more-heading">Keep Exploring</h2>

        {method.faqTeasers && method.faqTeasers.length > 0 && (
          <section className="faq-explore-section">
            <h3 className="faq-explore-label">Frequently Asked Questions</h3>
            <div className="faq-teasers-list">
              {method.faqTeasers.map((faqTeaser, idx) => (
                <NavigationLink
                  key={idx}
                  to={`/faq/${faqTeaser.faqSlug}`}
                  className="faq-teaser-card"
                  pageTitle={faqTeaser.question}
                >
                  <div className="related-item-card-content">
                    <span className="related-item-card-name">{faqTeaser.question}</span>
                    <span className="related-item-card-desc">{faqTeaser.teaser}</span>
                  </div>
                  <span className="related-item-card-arrow" aria-hidden="true">&rarr;</span>
                </NavigationLink>
              ))}
            </div>
          </section>
        )}

        {method.relatedMethods && method.relatedMethods.length > 0 && (
          <section className="faq-explore-section">
            <h3 className="faq-explore-label">Related Methods</h3>
            <div className="related-metrics-list">
              {method.relatedMethods.map(related => {
                const relatedMethod = VALUATION_METHODS.find(m => m.slug === related);
                if (!relatedMethod) return null;
                const desc = method.relatedMethodDescriptions?.[related];
                return (
                  <NavigationLink
                    key={related}
                    to={'/valuation/' + related}
                    state={{ from: 'valuation-detail', returnPath: '/valuation/' + slug }}
                    className="related-item-card"
                    pageTitle={relatedMethod.name}
                  >
                    <div className="related-item-card-content">
                      <span className="related-item-card-name">{relatedMethod.name}</span>
                      {desc && <span className="related-item-card-desc">{desc}</span>}
                    </div>
                    <span className="related-item-card-arrow" aria-hidden="true">&rarr;</span>
                  </NavigationLink>
                );
              })}
            </div>
          </section>
        )}

        {method.relatedMetrics && method.relatedMetrics.length > 0 && (
          <section className="faq-explore-section">
            <h3 className="faq-explore-label">Related Metrics</h3>
            <div className="related-metrics-list">
              {method.relatedMetrics.map(metricSlug => {
                const metric = METRICS.find(m => m.slug === metricSlug);
                if (!metric) return null;
                const desc = method.relatedMetricDescriptions?.[metricSlug];
                return (
                  <NavigationLink
                    key={metricSlug}
                    to={'/metrics/' + metricSlug}
                    state={{ from: 'valuation-detail', returnPath: '/valuation/' + slug }}
                    className="related-item-card"
                    pageTitle={metric.name}
                  >
                    <div className="related-item-card-content">
                      <span className="related-item-card-name">{metric.name}</span>
                      {desc && <span className="related-item-card-desc">{desc}</span>}
                    </div>
                    <span className="related-item-card-arrow" aria-hidden="true">&rarr;</span>
                  </NavigationLink>
                );
              })}
            </div>
          </section>
        )}

        </div>
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

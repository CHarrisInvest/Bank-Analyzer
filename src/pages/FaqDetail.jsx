import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import NavigationLink from '../components/NavigationLink.jsx';
import { FAQS, FAQ_CLUSTERS } from '../data/content/faqs.js';
import { METRICS } from '../data/content/metrics.js';
import { VALUATION_METHODS } from '../data/content/valuations.js';
import { renderFormattedText } from '../utils/renderFormattedText.jsx';

/**
 * Derive a context-aware CTA button label from the target path.
 * Instead of a generic "Go to Screener →", the label correlates with the destination.
 */
function getCtaButtonLabel(cta) {
  const { target, type } = cta;

  // Specific metric pages — extract human-readable name from slug
  if (target.startsWith('/metrics/')) {
    const slug = target.replace('/metrics/', '');
    const metric = METRICS.find(m => m.slug === slug);
    return metric ? metric.shortName || metric.name : slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }

  // Specific valuation pages
  if (target.startsWith('/valuation/')) {
    const slug = target.replace('/valuation/', '');
    const method = VALUATION_METHODS.find(v => v.slug === slug);
    return method ? method.shortName || method.name : slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }

  // Specific FAQ pages
  if (target.startsWith('/faq/')) {
    const slug = target.replace('/faq/', '');
    const linkedFaq = FAQS.find(f => f.slug === slug);
    if (linkedFaq) {
      // Use first ~40 chars of the question, trimmed to last full word
      const q = linkedFaq.question;
      if (q.length <= 40) return q;
      return q.substring(0, 40).replace(/\s+\S*$/, '') + '…';
    }
  }

  // Top-level pages
  const topLevel = {
    '/metrics': 'Bank Metrics',
    '/valuation': 'Valuation Models',
    '/glossary': 'Financial Glossary',
    '/screener': 'Bank Screener',
    '/search': 'Bank Search',
  };
  return topLevel[target] || 'Learn More';
}

/**
 * FAQ Detail Page
 * Renders a single FAQ entry with full answer, related content links, and CTA
 */
function FaqDetail() {
  const { faqSlug } = useParams();

  const faq = FAQS.find(f => f.slug === faqSlug);
  const cluster = faq ? FAQ_CLUSTERS.find(c => c.slug === faq.cluster) : null;

  // Note: Schema (Question/Answer, BreadcrumbList) is provided by the prerender script
  // (scripts/prerender.mjs) in the static HTML for immediate crawler access.
  // Do NOT add a schema here to avoid duplicates.

  if (!faq) {
    return (
      <div className="page faq-detail-page">
        <div className="not-found">
          <h1>Question Not Found</h1>
          <p>No FAQ entry found with identifier "{faqSlug}".</p>
          <Link to="/faq" className="btn btn-primary">View All FAQ Topics</Link>
        </div>
      </div>
    );
  }

  // Truncate question for breadcrumb display
  const truncatedQuestion = faq.question.length > 50
    ? faq.question.substring(0, 50) + '...'
    : faq.question;

  return (
    <div className="page faq-detail-page">
      <SEO
        title={faq.metaTitle}
        description={faq.metaDescription}
        canonical={'/faq/' + faqSlug}
        type="article"
      />

      <nav className="breadcrumb">
        <Link to="/faq">FAQ</Link>
        {cluster && (
          <>
            <span className="separator">/</span>
            <span>{cluster.name}</span>
          </>
        )}
        <span className="separator">/</span>
        <span>{truncatedQuestion}</span>
      </nav>

      <article className="faq-article">
        <header className="faq-header">
          <h1>{faq.question}</h1>
          {faq.shortAnswer && (
            <p className="faq-summary">{faq.shortAnswer}</p>
          )}
        </header>

        <section className="faq-section faq-answer">
          {renderFormattedText(faq.fullAnswer, 'ans')}
        </section>

        <div className="faq-explore-more">
          <h2 className="faq-explore-more-heading">Keep Exploring</h2>

          {faq.relatedMetrics && faq.relatedMetrics.length > 0 && (
            <section className="faq-explore-section">
              <h3 className="faq-explore-label">Related Metrics</h3>
              <div className="related-metrics-list">
                {faq.relatedMetrics.map(metricSlug => {
                  const metric = METRICS.find(m => m.slug === metricSlug);
                  if (!metric) return null;
                  return (
                    <div key={metricSlug} className="related-metric-item">
                      <NavigationLink
                        to={'/metrics/' + metricSlug}
                        state={{ from: 'faq-detail', returnPath: '/faq/' + faqSlug }}
                        className="related-metric-badge"
                        pageTitle={metric.name}
                      >
                        {metric.name}
                      </NavigationLink>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {faq.relatedValuations && faq.relatedValuations.length > 0 && (
            <section className="faq-explore-section">
              <h3 className="faq-explore-label">Related Valuation Methods</h3>
              <div className="related-metrics-list">
                {faq.relatedValuations.map(valSlug => {
                  const valMethod = VALUATION_METHODS.find(v => v.slug === valSlug);
                  if (!valMethod) return null;
                  return (
                    <div key={valSlug} className="related-metric-item">
                      <NavigationLink
                        to={'/valuation/' + valSlug}
                        state={{ from: 'faq-detail', returnPath: '/faq/' + faqSlug }}
                        className="related-metric-badge"
                        pageTitle={valMethod.name}
                      >
                        {valMethod.name}
                      </NavigationLink>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {faq.relatedFaqs && faq.relatedFaqs.length > 0 && (
            <section className="faq-explore-section">
              <h3 className="faq-explore-label">Related Questions</h3>
              <div className="related-questions-list">
                {faq.relatedFaqs.map(relatedSlug => {
                  const relatedFaq = FAQS.find(f => f.slug === relatedSlug);
                  if (!relatedFaq) return null;
                  return (
                    <Link
                      key={relatedSlug}
                      to={'/faq/' + relatedFaq.slug}
                      className="related-question-card"
                    >
                      {relatedFaq.question}
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          <section className="faq-glossary-card">
            <div className="faq-glossary-card-header">
              <span className="faq-glossary-card-icon" aria-hidden="true">📖</span>
              <span className="faq-glossary-card-title">Key Terms</span>
              <Link to="/glossary" className="btn btn-glossary">
                View Financial Glossary &rarr;
              </Link>
            </div>
            {faq.relatedGlossaryTerms && faq.relatedGlossaryTerms.length > 0 ? (
              <div className="faq-glossary-card-terms">
                {faq.relatedGlossaryTerms.map((term) => (
                  <Link key={term} to="/glossary" className="faq-glossary-term-badge">
                    {term}
                  </Link>
                ))}
              </div>
            ) : (
              <p className="faq-glossary-card-desc">
                Explore definitions of bank investing terms used in this article.
              </p>
            )}
          </section>

          {faq.cta && (
            <section className="faq-cta-callout">
              <div className="faq-cta-callout-content">
                <span className="faq-cta-callout-icon" aria-hidden="true">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 3v18h18" />
                    <path d="M18 17V9" />
                    <path d="M13 17V5" />
                    <path d="M8 17v-3" />
                  </svg>
                </span>
                <p>{faq.cta.text}</p>
              </div>
              <Link to={faq.cta.target} className="btn btn-accent">
                {getCtaButtonLabel(faq.cta)} &rarr;
              </Link>
            </section>
          )}
        </div>
      </article>

      <div className="page-navigation">
        <NavigationLink
          to="/faq"
          state={{ from: 'faq-detail' }}
          className="btn btn-nav"
          pageTitle="FAQ"
        >
          &larr; All FAQ Topics
        </NavigationLink>
        <NavigationLink
          to="/screener"
          state={{ from: 'faq-detail' }}
          className="btn btn-nav btn-nav-primary"
          pageTitle="Screener"
        >
          Open Screener &rarr;
        </NavigationLink>
      </div>
    </div>
  );
}

export default FaqDetail;

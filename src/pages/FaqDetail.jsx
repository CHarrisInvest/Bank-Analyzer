import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import NavigationLink from '../components/NavigationLink.jsx';
import { FAQS, FAQ_CLUSTERS } from '../data/content/faqs.js';
import { METRICS } from '../data/content/metrics.js';
import { VALUATION_METHODS } from '../data/content/valuations.js';

/**
 * FAQ Detail Page
 * Renders a single FAQ entry with full answer, related content links, and CTA
 */
function FaqDetail() {
  const { clusterSlug, faqSlug } = useParams();

  const faq = FAQS.find(f => f.slug === faqSlug && f.cluster === clusterSlug);
  const cluster = FAQ_CLUSTERS.find(c => c.slug === clusterSlug);

  // Note: Schema (Question/Answer, BreadcrumbList) is provided by the prerender script
  // (scripts/prerender.mjs) in the static HTML for immediate crawler access.
  // Do NOT add a schema here to avoid duplicates.

  if (!faq || !cluster) {
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

  // Split fullAnswer into paragraphs
  const paragraphs = faq.fullAnswer.split('\n\n');

  return (
    <div className="page faq-detail-page">
      <SEO
        title={faq.metaTitle}
        description={faq.metaDescription}
        canonical={'/faq/' + clusterSlug + '/' + faqSlug}
        type="article"
      />

      <nav className="breadcrumb">
        <Link to="/faq">FAQ</Link>
        <span className="separator">/</span>
        <Link to={'/faq/' + clusterSlug}>{cluster.name}</Link>
        <span className="separator">/</span>
        <span>{truncatedQuestion}</span>
      </nav>

      <article className="faq-article">
        <header className="faq-header">
          <h1>{faq.question}</h1>
        </header>

        <section className="faq-section faq-answer">
          {paragraphs.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </section>

        {faq.relatedMetrics && faq.relatedMetrics.length > 0 && (
          <section className="faq-section">
            <h2>Related Metrics</h2>
            <div className="related-metrics-list">
              {faq.relatedMetrics.map(metricSlug => {
                const metric = METRICS.find(m => m.slug === metricSlug);
                if (!metric) return null;
                return (
                  <div key={metricSlug} className="related-metric-item">
                    <NavigationLink
                      to={'/metrics/' + metricSlug}
                      state={{ from: 'faq-detail', returnPath: '/faq/' + clusterSlug + '/' + faqSlug }}
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
          <section className="faq-section">
            <h2>Related Valuation Methods</h2>
            <div className="related-metrics-list">
              {faq.relatedValuations.map(valSlug => {
                const valMethod = VALUATION_METHODS.find(v => v.slug === valSlug);
                if (!valMethod) return null;
                return (
                  <div key={valSlug} className="related-metric-item">
                    <NavigationLink
                      to={'/valuation/' + valSlug}
                      state={{ from: 'faq-detail', returnPath: '/faq/' + clusterSlug + '/' + faqSlug }}
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
          <section className="faq-section">
            <h2>Related Questions</h2>
            <div className="related-metrics-list">
              {faq.relatedFaqs.map(relatedSlug => {
                const relatedFaq = FAQS.find(f => f.slug === relatedSlug);
                if (!relatedFaq) return null;
                return (
                  <div key={relatedSlug} className="related-metric-item">
                    <Link
                      to={'/faq/' + relatedFaq.cluster + '/' + relatedFaq.slug}
                      className="related-metric-badge"
                    >
                      {relatedFaq.question}
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <section className="faq-section faq-glossary-link">
          <p>
            See the <Link to="/glossary">glossary</Link> for definitions of bank investing terms used in this article.
          </p>
        </section>

        {faq.cta && (
          <div className="faq-cta">
            <Link to={faq.cta.target} className="btn btn-primary">
              {faq.cta.text}
            </Link>
          </div>
        )}
      </article>

      <div className="page-navigation">
        <NavigationLink
          to={'/faq/' + clusterSlug}
          state={{ from: 'faq-detail' }}
          className="btn btn-secondary"
          pageTitle={cluster.name}
        >
          &larr; {cluster.name}
        </NavigationLink>
        <NavigationLink
          to="/screener"
          state={{ from: 'faq-detail' }}
          className="btn btn-primary"
          pageTitle="Screener"
        >
          Open Screener &rarr;
        </NavigationLink>
      </div>
    </div>
  );
}

export default FaqDetail;

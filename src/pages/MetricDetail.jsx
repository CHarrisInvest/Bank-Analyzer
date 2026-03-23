import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { METRICS } from '../data/content/metrics.js';
import { VALUATION_METHODS } from '../data/content/valuations.js';
import { trackMetricViewed } from '../analytics/events.js';
import BackButton from '../components/BackButton.jsx';
import NavigationLink from '../components/NavigationLink.jsx';
import SEO from '../components/SEO.jsx';
import { renderFormattedText } from '../utils/renderFormattedText.jsx';

/**
 * Share Button Component
 * Supports native Web Share API with copy-to-clipboard fallback
 */
function ShareButton({ url, title }) {
  const [copied, setCopied] = useState(false);

  const handleShare = useCallback(async () => {
    const shareUrl = `https://banksift.org${url}`;

    // Try native share API first (mobile + supported desktop browsers)
    if (navigator.share) {
      try {
        await navigator.share({ title, url: shareUrl });
        return;
      } catch (err) {
        // User cancelled share dialog
        if (err.name === 'AbortError') return;
        // Fall through to clipboard copy
      }
    }

    // Copy link fallback
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers without clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      textArea.setAttribute('readonly', '');
      document.body.appendChild(textArea);
      textArea.select();
      try { document.execCommand('copy'); } catch { /* ignore */ }
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [url, title]);

  return (
    <button
      className="share-button"
      onClick={handleShare}
      title={copied ? 'Link copied!' : 'Share this metric'}
      aria-label={copied ? 'Link copied to clipboard' : 'Share this metric'}
    >
      {copied ? (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
          Share
        </>
      )}
    </button>
  );
}

/**
 * Metric Detail Page
 * Detailed explanation of a single financial metric
 */
function MetricDetail() {
  const { slug } = useParams();

  const metric = METRICS.find(m => m.slug === slug);

  // Note: Schema (FAQPage) is provided by the prerender script
  // (scripts/prerender.mjs) in the static HTML for immediate crawler access.
  // Do NOT add a schema here to avoid duplicates.

  useEffect(() => {
    if (metric) {
      trackMetricViewed(slug);
    }
  }, [slug, metric]);

  if (!metric) {
    return (
      <div className="page metric-detail-page">
        <div className="not-found">
          <h1>Metric Not Found</h1>
          <p>No metric found with identifier "{slug}".</p>
          <Link to="/metrics" className="btn btn-primary">View All Metrics</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page metric-detail-page">
      <SEO
        title={`${metric.name} Explained | Bank Financial Ratio Guide`}
        description={`${metric.shortDescription} Learn how ${metric.name} is calculated for banks, typical ranges, what values indicate strength or concern, and how to use it in US bank stock analysis.`}
        canonical={`/metrics/${slug}`}
        image="https://banksift.org/og-metrics.png"
      />
      <BackButton />

      <nav className="breadcrumb">
        <Link to="/metrics">Metrics & Ratios</Link>
        <span className="separator">/</span>
        <span>{metric.name}</span>
      </nav>

      <article className="metric-article">
        <header className="metric-header">
          <div className="metric-header-row">
            <h1>{metric.name}</h1>
            <ShareButton url={`/metrics/${slug}`} title={`${metric.name} - Bank Financial Metric`} />
          </div>
          <p className="metric-category">{metric.categoryLabel}</p>
        </header>

        <section className="metric-section">
          <h2>Overview</h2>
          {renderFormattedText(metric.description, 'desc')}
        </section>

        <section className="metric-section">
          <h2>Formula</h2>
          <div className="formula-box">
            <code>{metric.formula}</code>
          </div>
          {metric.isPercentage && (
            <p className="formula-pct-note">Result is typically expressed as a percentage.</p>
          )}
          {metric.formulaExplanation && (
            <div className="formula-explanation">{renderFormattedText(metric.formulaExplanation, 'fexp')}</div>
          )}
        </section>

        <section className="metric-section">
          <h2>Interpretation</h2>
          {renderFormattedText(metric.interpretation, 'interp')}

          {metric.typicalRange && (
            <div className="typical-range">
              <h3>Typical Range for Banks</h3>
              {renderFormattedText(metric.typicalRange, 'range')}
            </div>
          )}

          {metric.goodBad && (
            <div className="good-bad-indicators">
              <div className="indicator good">
                <span className="indicator-label">Generally Favorable</span>
                {renderFormattedText(metric.goodBad.good, 'good')}
              </div>
              <div className="indicator bad">
                <span className="indicator-label">Potential Concern</span>
                {renderFormattedText(metric.goodBad.bad, 'bad')}
              </div>
            </div>
          )}
        </section>

        {metric.considerations && (
          <section className="metric-section">
            <h2>Important Considerations</h2>
            <ul>
              {metric.considerations.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {metric.bankSpecificContext && (
          <section className="metric-section">
            <h2>Bank-Specific Context</h2>
            {renderFormattedText(metric.bankSpecificContext, 'bsc')}
          </section>
        )}

        {metric.metricConnections && (
          <section className="metric-section">
            <h2>Metric Connections</h2>
            {renderFormattedText(metric.metricConnections, 'mc')}
          </section>
        )}

        {metric.commonPitfalls && (
          <section className="metric-section">
            <h2>Common Pitfalls</h2>
            {renderFormattedText(metric.commonPitfalls, 'cp')}
          </section>
        )}

        {metric.acrossBankTypes && (
          <section className="metric-section">
            <h2>Across Bank Types</h2>
            {renderFormattedText(metric.acrossBankTypes, 'abt')}
          </section>
        )}

        {metric.whatDrivesMetric && (
          <section className="metric-section">
            <h2>What Drives This Metric</h2>
            {renderFormattedText(metric.whatDrivesMetric, 'wdm')}
          </section>
        )}

        <div className="faq-explore-more">
          <h2 className="faq-explore-more-heading">Keep Exploring</h2>

        {metric.relatedMetrics && metric.relatedMetrics.length > 0 && (
          <section className="faq-explore-section">
            <h3 className="faq-explore-label">Related Metrics</h3>
            <div className="related-metrics-list">
              {metric.relatedMetrics.map(related => {
                const relatedMetric = METRICS.find(m => m.slug === related);
                if (!relatedMetric) return null;
                const description = metric.relatedMetricDescriptions && metric.relatedMetricDescriptions[related];
                return (
                  <NavigationLink
                    key={related}
                    to={'/metrics/' + related}
                    state={{ from: 'metrics-detail', returnPath: '/metrics/' + slug }}
                    className="related-item-card"
                    pageTitle={relatedMetric.name}
                  >
                    <div className="related-item-card-content">
                      <span className="related-item-card-name">{relatedMetric.name}</span>
                      {description && (
                        <span className="related-item-card-desc">{description}</span>
                      )}
                    </div>
                    <span className="related-item-card-arrow" aria-hidden="true">&rarr;</span>
                  </NavigationLink>
                );
              })}
            </div>
          </section>
        )}

        {metric.relatedValuations && metric.relatedValuations.length > 0 && (
          <section className="faq-explore-section">
            <h3 className="faq-explore-label">Valuation Methods</h3>
            <div className="related-metrics-list">
              {metric.relatedValuations.map(valSlug => {
                const valMethod = VALUATION_METHODS.find(v => v.slug === valSlug);
                if (!valMethod) return null;
                const desc = metric.relatedValuationDescriptions?.[valSlug];
                return (
                  <NavigationLink
                    key={valSlug}
                    to={'/valuation/' + valSlug}
                    state={{ from: 'metrics-detail', returnPath: '/metrics/' + slug }}
                    className="related-item-card"
                    pageTitle={valMethod.name}
                  >
                    <div className="related-item-card-content">
                      <span className="related-item-card-name">{valMethod.name}</span>
                      {desc && <span className="related-item-card-desc">{desc}</span>}
                    </div>
                    <span className="related-item-card-arrow" aria-hidden="true">&rarr;</span>
                  </NavigationLink>
                );
              })}
            </div>
          </section>
        )}

        {metric.faqTeasers && metric.faqTeasers.length > 0 && (
          <section className="faq-explore-section">
            <h3 className="faq-explore-label">Frequently Asked Questions</h3>
            <div className="faq-teasers-list">
              {metric.faqTeasers.map((faqTeaser, idx) => (
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

        </div>

        {metric.whereToFindData && (
          <section className="metric-section">
            <h2>Where to Find This Data</h2>
            {renderFormattedText(metric.whereToFindData, 'wtfd')}
          </section>
        )}

        {metric.dataSource && (
          <section className="metric-section">
            <h2>Data Source</h2>
            {renderFormattedText('This metric is calculated using data from SEC EDGAR filings. ' + metric.dataSource, 'ds')}
          </section>
        )}
      </article>

      <div className="page-navigation">
        <NavigationLink
          to="/metrics"
          state={{ from: 'metrics-detail' }}
          className="btn btn-secondary"
          pageTitle="All Metrics"
        >
          ← All Metrics
        </NavigationLink>
        {!metric.isEducationalOnly && (
          <NavigationLink
            to="/screener"
            state={{ from: 'metrics-detail' }}
            className="btn btn-primary"
            pageTitle="Screener"
          >
            Use in Screener →
          </NavigationLink>
        )}
      </div>
    </div>
  );
}

export default MetricDetail;

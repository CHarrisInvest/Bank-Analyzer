import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { METRICS } from '../data/content/metrics.js';
import { VALUATION_METHODS } from '../data/content/valuations.js';
import { trackMetricViewed } from '../analytics/events.js';
import BackButton from '../components/BackButton.jsx';
import NavigationLink from '../components/NavigationLink.jsx';
import SEO from '../components/SEO.jsx';

// Cross-links from metrics to related valuation methods
const METRIC_TO_VALUATIONS = {
  'roe': ['roe-pb-framework'],
  'equity-to-assets': ['roe-pb-framework'],
  'price-to-book': ['price-to-book-valuation', 'roe-pb-framework'],
  'book-value-per-share': ['graham-number', 'price-to-book-valuation'],
  'price-to-earnings': ['price-to-earnings-valuation'],
  'earnings-per-share': ['graham-number', 'margin-of-safety'],
  'dividend-payout-ratio': ['dividend-discount-model'],
};

const METRIC_TO_VALUATION_DESCRIPTIONS = {
  'roe': {
    'roe-pb-framework': 'ROE is one of two axes in this framework — it determines the justified P/B multiple a bank deserves.',
  },
  'equity-to-assets': {
    'roe-pb-framework': 'Capital ratios affect leverage, a key driver of ROE and the justified P/B calculated by this framework.',
  },
  'price-to-book': {
    'price-to-book-valuation': 'P/B is the core metric in this valuation approach for determining bank stock fair value.',
    'roe-pb-framework': 'This framework calculates the P/B multiple a bank deserves based on its profitability.',
  },
  'book-value-per-share': {
    'graham-number': 'Book value per share is one of two direct inputs in the Graham Number formula.',
    'price-to-book-valuation': 'BVPS is the fundamental input that P/B multiples are applied to when valuing banks.',
  },
  'price-to-earnings': {
    'price-to-earnings-valuation': 'P/E is the core metric in this valuation approach for assessing bank earnings value.',
  },
  'earnings-per-share': {
    'graham-number': 'EPS is one of two direct inputs in the Graham Number formula.',
    'margin-of-safety': 'EPS feeds the intrinsic value estimate used to calculate the margin between price and fair value.',
  },
  'dividend-payout-ratio': {
    'dividend-discount-model': 'The payout ratio determines what portion of earnings flows to shareholders as dividends in the DDM.',
  },
};

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

  // Generate FAQ schema for AI search optimization
  const faqSchema = useMemo(() => {
    if (!metric) return null;
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': `What is ${metric.name}?`,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': metric.description
          }
        },
        {
          '@type': 'Question',
          'name': `How is ${metric.name} calculated?`,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': `${metric.formula}. ${metric.formulaExplanation || ''}`
          }
        },
        {
          '@type': 'Question',
          'name': `What is a good ${metric.name} for banks?`,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': metric.typicalRange + (metric.goodBad ? ` ${metric.goodBad.good}` : '')
          }
        }
      ]
    };
  }, [metric]);

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
        title={`${metric.name} - Bank Financial Metric Explained`}
        description={`${metric.shortDescription} Learn how ${metric.name} is calculated, what values are good for banks, and how to use it in your analysis.`}
        canonical={`/metrics/${slug}`}
        schema={faqSchema}
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
          <p>{metric.description}</p>
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
            <p className="formula-explanation">{metric.formulaExplanation}</p>
          )}
        </section>

        <section className="metric-section">
          <h2>Interpretation</h2>
          <p>{metric.interpretation}</p>

          {metric.typicalRange && (
            <div className="typical-range">
              <h3>Typical Range for Banks</h3>
              <p>{metric.typicalRange}</p>
            </div>
          )}

          {metric.goodBad && (
            <div className="good-bad-indicators">
              <div className="indicator good">
                <span className="indicator-label">Generally Favorable</span>
                <p>{metric.goodBad.good}</p>
              </div>
              <div className="indicator bad">
                <span className="indicator-label">Potential Concern</span>
                <p>{metric.goodBad.bad}</p>
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

        {metric.relatedMetrics && metric.relatedMetrics.length > 0 && (
          <section className="metric-section">
            <h2>Related Metrics</h2>
            <div className="related-metrics-list">
              {metric.relatedMetrics.map(related => {
                const relatedMetric = METRICS.find(m => m.slug === related);
                if (!relatedMetric) return null;
                const description = metric.relatedMetricDescriptions && metric.relatedMetricDescriptions[related];
                return (
                  <div key={related} className="related-metric-item">
                    <NavigationLink
                      to={'/metrics/' + related}
                      state={{ from: 'metrics-detail', returnPath: '/metrics/' + slug }}
                      className="related-metric-badge"
                      pageTitle={relatedMetric.name}
                    >
                      {relatedMetric.name}
                    </NavigationLink>
                    {description && (
                      <p className="related-metric-desc">{description}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {METRIC_TO_VALUATIONS[slug] && METRIC_TO_VALUATIONS[slug].length > 0 && (
          <section className="metric-section">
            <h2>Related Valuation Methods</h2>
            <div className="related-metrics-list">
              {METRIC_TO_VALUATIONS[slug].map(valSlug => {
                const valMethod = VALUATION_METHODS.find(v => v.slug === valSlug);
                if (!valMethod) return null;
                const desc = METRIC_TO_VALUATION_DESCRIPTIONS[slug]?.[valSlug];
                return (
                  <div key={valSlug} className="related-metric-item">
                    <NavigationLink
                      to={'/valuation/' + valSlug}
                      state={{ from: 'metrics-detail', returnPath: '/metrics/' + slug }}
                      className="related-metric-badge"
                      pageTitle={valMethod.name}
                    >
                      {valMethod.name}
                    </NavigationLink>
                    {desc && <p className="related-metric-desc">{desc}</p>}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <section className="metric-section">
          <h2>Data Source</h2>
          <p>
            This metric is calculated using data from SEC EDGAR filings. {metric.dataSource}
          </p>
        </section>
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
        <NavigationLink
          to="/screener"
          state={{ from: 'metrics-detail' }}
          className="btn btn-primary"
          pageTitle="Screener"
        >
          Use in Screener →
        </NavigationLink>
      </div>
    </div>
  );
}

export default MetricDetail;

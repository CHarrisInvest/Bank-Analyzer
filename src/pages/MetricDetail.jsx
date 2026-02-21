import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { METRICS } from '../data/content/metrics.js';
import { VALUATION_METHODS } from '../data/content/valuations.js';
import { trackMetricViewed } from '../analytics/events.js';
import BackButton from '../components/BackButton.jsx';
import NavigationLink from '../components/NavigationLink.jsx';
import SEO from '../components/SEO.jsx';

// Phase 2 cross-link map entries
import { CAPITAL_METRIC_TO_VALUATIONS_ENTRIES } from '../../docs/phase-2/phase2_subbatch1_capital_strength_metrics.js';
import { ASSET_QUALITY_METRIC_TO_VALUATIONS_ENTRIES } from '../../docs/phase-2/phase2_subbatch2_asset_quality_metrics.js';
import { ADDITIONAL_METRIC_TO_VALUATIONS_ENTRIES } from '../../docs/phase-2/phase2_subbatch3_additional_metrics.js';

// Cross-links from metrics to related valuation methods
const METRIC_TO_VALUATIONS = {
  // Phase 1 existing metrics (updated with Phase 2 new valuation links)
  'roe': ['roe-pb-framework', 'peer-comparison', 'dividend-discount-model', 'dupont-decomposition', 'gordon-growth-model', 'discounted-earnings-model', 'price-to-tangible-book-valuation'],
  'roaa': ['peer-comparison', 'dupont-decomposition', 'discounted-earnings-model'],
  'net-interest-margin': ['peer-comparison', 'dividend-discount-model', 'dupont-decomposition', 'discounted-earnings-model'],
  'efficiency-ratio': ['peer-comparison', 'dupont-decomposition'],
  'price-to-book': ['price-to-book-valuation', 'roe-pb-framework', 'margin-of-safety', 'graham-number', 'gordon-growth-model', 'price-to-tangible-book-valuation'],
  'price-to-earnings': ['price-to-earnings-valuation', 'graham-number', 'margin-of-safety', 'gordon-growth-model'],
  'earnings-per-share': ['graham-number', 'price-to-earnings-valuation', 'margin-of-safety', 'gordon-growth-model', 'discounted-earnings-model'],
  'book-value-per-share': ['graham-number', 'price-to-book-valuation', 'roe-pb-framework', 'margin-of-safety', 'gordon-growth-model', 'price-to-tangible-book-valuation'],
  'equity-to-assets': ['roe-pb-framework', 'peer-comparison', 'dupont-decomposition', 'excess-capital-return-model'],
  'loans-to-deposits': ['peer-comparison'],
  'deposits-to-assets': ['peer-comparison'],
  'loans-to-assets': ['peer-comparison'],
  'dividend-payout-ratio': ['dividend-discount-model', 'gordon-growth-model', 'excess-capital-return-model'],
  // Phase 2 new metrics
  ...CAPITAL_METRIC_TO_VALUATIONS_ENTRIES,
  ...ASSET_QUALITY_METRIC_TO_VALUATIONS_ENTRIES,
  ...ADDITIONAL_METRIC_TO_VALUATIONS_ENTRIES,
};

const METRIC_TO_VALUATION_DESCRIPTIONS = {
  'roe': {
    'roe-pb-framework': 'ROE is the central input to the ROE-P/B framework, which derives the justified price-to-book multiple from a bank\'s return on equity relative to its cost of equity and growth rate.',
    'peer-comparison': 'ROE is one of the most important metrics for comparing bank profitability across a peer group, as it captures both operating performance and leverage in a single figure.',
    'dividend-discount-model': 'ROE combined with the retention ratio determines the sustainable dividend growth rate, a key input to the dividend discount model.',
  },
  'roaa': {
    'peer-comparison': 'ROAA is the preferred profitability metric for peer comparison because it removes leverage differences, allowing direct comparison of operating performance across banks with different capital structures.',
  },
  'net-interest-margin': {
    'peer-comparison': 'NIM is a core comparison metric in peer analysis, revealing differences in lending profitability, funding costs, and asset mix across banks.',
    'dividend-discount-model': 'NIM is the primary revenue driver for most banks, making it a key factor in projecting the future earnings that support dividend payments.',
  },
  'efficiency-ratio': {
    'peer-comparison': 'The efficiency ratio is a standard peer comparison metric that reveals differences in cost management and operational productivity across banks.',
  },
  'price-to-book': {
    'price-to-book-valuation': 'P/B is the ratio used directly in price-to-book valuation, the most common approach to assessing whether a bank stock is fairly valued.',
    'roe-pb-framework': 'P/B and ROE are linked through the justified P/B formula, making the current P/B ratio a key input to determining whether a bank trades at, above, or below its fundamental value.',
    'margin-of-safety': 'P/B relative to the justified P/B multiple helps determine whether a sufficient margin of safety exists between market price and estimated intrinsic value.',
    'graham-number': 'The Graham Number uses BVPS (the denominator of P/B) as one of its two inputs to estimate a maximum fair price.',
  },
  'price-to-earnings': {
    'price-to-earnings-valuation': 'P/E is the ratio used directly in price-to-earnings valuation to compare a bank\'s earnings multiple to its peers and historical levels.',
    'graham-number': 'The Graham Number uses EPS (the denominator of P/E) as one of its two inputs, connecting P/E analysis to Graham\'s intrinsic value framework.',
    'margin-of-safety': 'P/E levels inform margin of safety assessment by indicating how much the market is paying per dollar of earnings relative to fair value estimates.',
  },
  'earnings-per-share': {
    'graham-number': 'EPS is one of two required inputs to calculate the Graham Number, which estimates a maximum fair price based on a bank\'s earnings power and asset backing.',
    'price-to-earnings-valuation': 'EPS is the denominator of the P/E ratio, making it an essential input to price-to-earnings valuation methodology.',
    'margin-of-safety': 'EPS directly informs intrinsic value estimates in the Graham Number and other earnings-based models, and the gap between intrinsic value and market price defines the margin of safety.',
  },
  'book-value-per-share': {
    'graham-number': 'BVPS is one of two required inputs to the Graham Number, representing the asset backing component of Graham\'s dual-input fair value estimate.',
    'price-to-book-valuation': 'BVPS is the denominator of the P/B ratio, making it the essential per-share input for price-to-book valuation.',
    'roe-pb-framework': 'BVPS growth over time reflects capital compounding, and the ROE-P/B framework links this growth rate to the justified multiple investors should pay for each dollar of book value.',
    'margin-of-safety': 'BVPS provides the tangible asset backing per share, and comparing market price to BVPS-derived fair value estimates helps quantify the margin of safety.',
  },
  'equity-to-assets': {
    'roe-pb-framework': 'Equity-to-assets determines the equity multiplier, which links ROAA to ROE and therefore affects the justified P/B multiple through the ROE-P/B framework.',
    'peer-comparison': 'Equity-to-assets is an important peer comparison metric for assessing relative capital strength and leverage across a group of comparable banks.',
  },
  'loans-to-deposits': {
    'peer-comparison': 'Loans-to-deposits is a standard peer comparison metric for evaluating how aggressively banks in a peer group are deploying their deposit bases into lending.',
  },
  'deposits-to-assets': {
    'peer-comparison': 'Deposits-to-assets is used in peer comparison to evaluate the funding structure and stability of a bank\'s liability base relative to peers.',
  },
  'loans-to-assets': {
    'peer-comparison': 'Loans-to-assets is used in peer comparison to assess differences in asset deployment strategy and credit risk exposure across comparable banks.',
  },
  'dividend-payout-ratio': {
    'dividend-discount-model': 'The dividend payout ratio directly determines the dividends per share used in the dividend discount model, making it a critical input to DDM-based fair value estimates.',
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

        {metric.bankSpecificContext && (
          <section className="metric-section">
            <h2>Bank-Specific Context</h2>
            <p>{metric.bankSpecificContext}</p>
          </section>
        )}

        {metric.metricConnections && (
          <section className="metric-section">
            <h2>Metric Connections</h2>
            <p>{metric.metricConnections}</p>
          </section>
        )}

        {metric.commonPitfalls && (
          <section className="metric-section">
            <h2>Common Pitfalls</h2>
            <p>{metric.commonPitfalls}</p>
          </section>
        )}

        {metric.acrossBankTypes && (
          <section className="metric-section">
            <h2>Across Bank Types</h2>
            <p>{metric.acrossBankTypes}</p>
          </section>
        )}

        {metric.whatDrivesMetric && (
          <section className="metric-section">
            <h2>What Drives This Metric</h2>
            <p>{metric.whatDrivesMetric}</p>
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

        {metric.faqTeasers && metric.faqTeasers.length > 0 && (
          <section className="metric-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-teasers-list">
              {metric.faqTeasers.map((faqTeaser, idx) => (
                <div key={idx} className="faq-teaser-card">
                  <h3>{faqTeaser.question}</h3>
                  <p>{faqTeaser.teaser}</p>
                  <NavigationLink
                    to={`/faq/${faqTeaser.faqSlug}`}
                    className="faq-teaser-link"
                    pageTitle={faqTeaser.question}
                  >
                    Read more →
                  </NavigationLink>
                </div>
              ))}
            </div>
          </section>
        )}

        {metric.whereToFindData && (
          <section className="metric-section">
            <h2>Where to Find This Data</h2>
            <p>{metric.whereToFindData}</p>
          </section>
        )}

        {metric.dataSource && (
          <section className="metric-section">
            <h2>Data Source</h2>
            <p>
              This metric is calculated using data from SEC EDGAR filings. {metric.dataSource}
            </p>
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

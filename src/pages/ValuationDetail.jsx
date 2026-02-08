import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { VALUATION_METHODS } from '../data/content/valuations.js';
import { METRICS } from '../data/content/metrics.js';
import { trackValuationMethodViewed } from '../analytics/events.js';
import BackButton from '../components/BackButton.jsx';
import NavigationLink from '../components/NavigationLink.jsx';
import SEO from '../components/SEO.jsx';

// Cross-links from valuation methods to related metrics
const VALUATION_TO_METRICS = {
  'graham-number': ['earnings-per-share', 'book-value-per-share'],
  'margin-of-safety': ['earnings-per-share', 'book-value-per-share'],
  'price-to-book-valuation': ['price-to-book', 'book-value-per-share', 'roe'],
  'price-to-earnings-valuation': ['price-to-earnings', 'earnings-per-share'],
  'roe-pb-framework': ['roe', 'price-to-book', 'equity-to-assets'],
  'dividend-discount-model': ['dividend-payout-ratio', 'earnings-per-share', 'roe'],
  'peer-comparison': ['roe', 'efficiency-ratio', 'price-to-book'],
};

const VALUATION_TO_METRIC_DESCRIPTIONS = {
  'graham-number': {
    'earnings-per-share': 'EPS is one of two direct inputs in the Graham Number formula.',
    'book-value-per-share': 'Book value per share is the other direct input in the Graham formula.',
  },
  'margin-of-safety': {
    'earnings-per-share': 'EPS feeds the intrinsic value estimate used to calculate the safety margin.',
    'book-value-per-share': 'Book value provides the tangible asset floor for intrinsic value estimation.',
  },
  'price-to-book-valuation': {
    'price-to-book': 'The P/B ratio is the core metric in this valuation approach.',
    'book-value-per-share': 'BVPS is the fundamental input that P/B multiples are applied to.',
    'roe': 'Banks with higher ROE typically deserve higher P/B multiples due to superior capital efficiency.',
  },
  'price-to-earnings-valuation': {
    'price-to-earnings': 'The P/E ratio is the core metric in this valuation approach.',
    'earnings-per-share': 'EPS is the fundamental input that P/E multiples are applied to.',
  },
  'roe-pb-framework': {
    'roe': 'ROE is one of two axes in the framework — it determines the justified P/B multiple.',
    'price-to-book': 'P/B is the other axis — the framework calculates what P/B a given ROE justifies.',
    'equity-to-assets': 'Capital ratios affect leverage, which is a key driver of ROE in this framework.',
  },
  'dividend-discount-model': {
    'dividend-payout-ratio': 'The payout ratio determines what portion of earnings flows to shareholders as dividends.',
    'earnings-per-share': 'EPS multiplied by the payout ratio determines the dividend input for the model.',
    'roe': 'ROE combined with the retention ratio determines the sustainable dividend growth rate.',
  },
  'peer-comparison': {
    'roe': 'ROE is a primary profitability benchmark in peer group analysis.',
    'efficiency-ratio': 'Operating efficiency is a key differentiator when comparing similar banks.',
    'price-to-book': 'P/B multiples are the primary valuation metric compared across bank peers.',
  },
};

const RELATED_METHOD_DESCRIPTIONS = {
  'graham-number': {
    'margin-of-safety': 'Apply a margin of safety to the Graham Number for additional downside protection.',
    'price-to-book-valuation': 'P/B valuation provides a market-based complement to the Graham Number\'s formula-based approach.',
  },
  'margin-of-safety': {
    'graham-number': 'The Graham Number is a common intrinsic value estimate used to calculate margin of safety.',
    'price-to-book-valuation': 'Book value provides a tangible anchor for assessing whether the safety margin is adequate.',
  },
  'price-to-book-valuation': {
    'price-to-earnings-valuation': 'P/E valuation provides a complementary earnings-based view alongside book value.',
    'roe-pb-framework': 'The ROE-P/B framework provides theoretical grounding for choosing the right P/B multiple.',
  },
  'price-to-earnings-valuation': {
    'price-to-book-valuation': 'P/B valuation complements P/E by anchoring to asset value rather than earnings alone.',
    'roe-pb-framework': 'The ROE-P/B framework connects profitability to the appropriate valuation multiple.',
  },
  'roe-pb-framework': {
    'price-to-book-valuation': 'The justified P/B from this framework is applied in standard P/B valuation.',
    'price-to-earnings-valuation': 'P/E analysis complements the framework by valuing earnings power independently.',
  },
  'dividend-discount-model': {
    'roe-pb-framework': 'Both methods use ROE and growth to derive value, but DDM focuses specifically on dividends.',
    'price-to-book-valuation': 'P/B provides a cross-check against the dividend-derived intrinsic value.',
  },
  'peer-comparison': {
    'price-to-book-valuation': 'P/B multiples are the most common metric compared in bank peer analysis.',
    'price-to-earnings-valuation': 'P/E multiples complement P/B in peer group valuation comparisons.',
    'roe-pb-framework': 'The ROE-P/B relationship helps determine whether a peer premium or discount is justified.',
  },
};

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
            <div className="related-metrics-list">
              {method.relatedMethods.map(related => {
                const relatedMethod = VALUATION_METHODS.find(m => m.slug === related);
                if (!relatedMethod) return null;
                const desc = RELATED_METHOD_DESCRIPTIONS[slug]?.[related];
                return (
                  <div key={related} className="related-metric-item">
                    <NavigationLink
                      to={'/valuation/' + related}
                      state={{ from: 'valuation-detail', returnPath: '/valuation/' + slug }}
                      className="related-metric-badge"
                      pageTitle={relatedMethod.name}
                    >
                      {relatedMethod.name}
                    </NavigationLink>
                    {desc && <p className="related-metric-desc">{desc}</p>}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {VALUATION_TO_METRICS[slug] && VALUATION_TO_METRICS[slug].length > 0 && (
          <section className="valuation-section">
            <h2>Related Metrics</h2>
            <div className="related-metrics-list">
              {VALUATION_TO_METRICS[slug].map(metricSlug => {
                const metric = METRICS.find(m => m.slug === metricSlug);
                if (!metric) return null;
                const desc = VALUATION_TO_METRIC_DESCRIPTIONS[slug]?.[metricSlug];
                return (
                  <div key={metricSlug} className="related-metric-item">
                    <NavigationLink
                      to={'/metrics/' + metricSlug}
                      state={{ from: 'valuation-detail', returnPath: '/valuation/' + slug }}
                      className="related-metric-badge"
                      pageTitle={metric.name}
                    >
                      {metric.name}
                    </NavigationLink>
                    {desc && <p className="related-metric-desc">{desc}</p>}
                  </div>
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

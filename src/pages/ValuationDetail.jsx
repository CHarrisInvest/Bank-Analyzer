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
  'graham-number': ['earnings-per-share', 'book-value-per-share', 'price-to-book', 'price-to-earnings'],
  'margin-of-safety': ['price-to-book', 'price-to-earnings', 'earnings-per-share', 'book-value-per-share', 'roe'],
  'price-to-book-valuation': ['price-to-book', 'book-value-per-share', 'roe', 'equity-to-assets'],
  'price-to-earnings-valuation': ['price-to-earnings', 'earnings-per-share', 'roe', 'price-to-book'],
  'roe-pb-framework': ['roe', 'price-to-book', 'equity-to-assets', 'dividend-payout-ratio', 'roaa', 'book-value-per-share'],
  'dividend-discount-model': ['dividend-payout-ratio', 'roe', 'earnings-per-share', 'net-interest-margin'],
  'peer-comparison': ['roe', 'roaa', 'net-interest-margin', 'efficiency-ratio', 'price-to-book', 'price-to-earnings', 'equity-to-assets', 'loans-to-deposits', 'deposits-to-assets', 'loans-to-assets', 'dividend-payout-ratio'],
};

const VALUATION_TO_METRIC_DESCRIPTIONS = {
  'graham-number': {
    'earnings-per-share': 'EPS is one of two required inputs to the Graham Number formula, representing the earnings power component of Graham\'s dual-factor intrinsic value estimate.',
    'book-value-per-share': 'BVPS is one of two required inputs to the Graham Number formula, representing the asset backing component that reflects the bank\'s tangible and intangible net worth per share.',
    'price-to-book': 'The Graham Number implicitly caps the acceptable P/B at 1.5x, connecting the Graham framework to price-to-book valuation analysis.',
    'price-to-earnings': 'The Graham Number implicitly caps the acceptable P/E at 15x, making the current P/E ratio a useful cross-check on whether the Graham Number estimate is reasonable.',
  },
  'margin-of-safety': {
    'price-to-book': 'P/B relative to the justified P/B multiple is one of the primary ways to assess margin of safety for bank stocks, with discounts to justified P/B indicating a potential buffer.',
    'price-to-earnings': 'Comparing the current P/E to historical, peer, and fundamentally justified levels helps quantify the margin of safety from an earnings-multiple perspective.',
    'earnings-per-share': 'Normalized EPS is a key input to intrinsic value estimates from which margin of safety is derived; using cyclically adjusted EPS produces more reliable safety margins.',
    'book-value-per-share': 'BVPS anchors the asset-based component of intrinsic value, and the gap between market price and BVPS-derived fair value contributes to the overall margin of safety assessment.',
    'roe': 'ROE determines the justified P/B multiple and therefore the intrinsic value estimate against which margin of safety is measured; higher sustainable ROE supports a smaller required margin of safety.',
  },
  'dividend-discount-model': {
    'dividend-payout-ratio': 'The payout ratio determines what share of earnings flows to shareholders as dividends, making it the most direct input linking a bank\'s earnings to the DDM\'s dividend projection.',
    'roe': 'ROE combined with the retention ratio determines the sustainable dividend growth rate, the critical growth input to multi-stage and Gordon Growth Model variants of the DDM.',
    'earnings-per-share': 'EPS drives the absolute level of dividends per share (EPS multiplied by payout ratio), establishing the starting point for DDM projections.',
    'net-interest-margin': 'NIM is the primary revenue driver for most banks and therefore the key determinant of the earnings capacity that supports future dividend payments.',
  },
  'price-to-book-valuation': {
    'price-to-book': 'The P/B ratio is the central metric in price-to-book valuation, comparing the market\'s assessment of a bank\'s equity to its accounting book value.',
    'book-value-per-share': 'BVPS provides the per-share denominator of the P/B ratio and serves as the anchor for determining whether the market price reflects a premium or discount to stated net asset value.',
    'roe': 'ROE is the primary determinant of what P/B multiple a bank deserves; the justified P/B formula links profitability directly to the appropriate price-to-book level.',
    'equity-to-assets': 'Equity-to-assets indicates leverage, which affects both ROE and the reliability of book value as a measure of net asset value, directly informing P/B valuation.',
  },
  'price-to-earnings-valuation': {
    'price-to-earnings': 'P/E is the central ratio in this valuation method, comparing the market price to per-share earnings to assess relative value.',
    'earnings-per-share': 'EPS is the denominator of the P/E ratio and the fundamental per-share measure of profitability that drives earnings-based valuation.',
    'roe': 'ROE connects P/E to P/B through the identity P/B = P/E multiplied by ROE, ensuring that P/E valuation conclusions are consistent with the bank\'s profitability profile.',
    'price-to-book': 'P/B and P/E should produce consistent valuation signals; when they diverge, the discrepancy often points to temporary earnings distortion that P/E valuation alone may miss.',
  },
  'peer-comparison': {
    'roe': 'ROE is a primary peer comparison metric, capturing both operating performance and leverage in a single figure that reveals which banks in a peer group generate the strongest returns.',
    'roaa': 'ROAA is the preferred peer comparison metric for profitability because it removes capital structure differences, allowing direct comparison of operating efficiency.',
    'net-interest-margin': 'NIM comparison across peers reveals differences in lending profitability, funding costs, and asset mix, identifying banks with structural advantages.',
    'efficiency-ratio': 'Efficiency ratio comparison highlights differences in cost management and operational productivity, distinguishing well-run banks from those with structural cost challenges.',
    'price-to-book': 'P/B is the primary valuation metric for peer comparison, with differences in P/B across peers ideally explained by corresponding differences in ROE and growth.',
    'price-to-earnings': 'P/E comparison across peers provides an earnings-based valuation perspective, complementing P/B analysis and helping identify banks with mispriced earnings.',
    'equity-to-assets': 'Equity-to-assets comparison reveals differences in capital levels and leverage across the peer group, providing context for interpreting ROE and P/B differences.',
    'loans-to-deposits': 'Loans-to-deposits comparison shows how aggressively each peer deploys its deposit base into lending, indicating differences in growth strategy and funding risk.',
    'deposits-to-assets': 'Deposits-to-assets comparison evaluates the funding structure stability across the peer group, identifying banks with stronger or weaker deposit franchises.',
    'loans-to-assets': 'Loans-to-assets comparison reveals differences in asset deployment strategy and credit risk appetite within the peer group.',
    'dividend-payout-ratio': 'Payout ratio comparison across peers indicates differences in capital return philosophy, growth reinvestment needs, and management confidence in earnings sustainability.',
  },
  'roe-pb-framework': {
    'roe': 'ROE is the central input to the ROE-P/B framework; the justified P/B multiple rises and falls directly with the bank\'s sustainable return on equity.',
    'price-to-book': 'The current P/B is compared against the framework\'s justified P/B to determine whether the bank trades at a premium, discount, or fair value relative to its profitability.',
    'equity-to-assets': 'Equity-to-assets determines the equity multiplier that links ROAA to ROE and therefore affects whether the ROE used in the framework reflects genuine earning power or primarily leverage.',
    'dividend-payout-ratio': 'The payout ratio determines the retention ratio, which drives the sustainable growth rate (g) used in the justified P/B formula: g = ROE multiplied by (1 minus payout ratio).',
    'roaa': 'ROAA combined with the equity multiplier produces ROE, making it useful for decomposing whether the ROE input to the framework reflects strong asset productivity or high leverage.',
    'book-value-per-share': 'BVPS growth rate reflects the compounding effect of retained earnings, and sustained BVPS growth validates the growth rate assumption used in the justified P/B calculation.',
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

        {method.whenToUse && (
          <section className="valuation-section">
            <h2>When to Use This Method</h2>
            <p>{method.whenToUse}</p>
          </section>
        )}

        {method.methodConnections && (
          <section className="valuation-section">
            <h2>Method Connections</h2>
            <p>{method.methodConnections}</p>
          </section>
        )}

        {method.commonMistakes && (
          <section className="valuation-section">
            <h2>Common Mistakes</h2>
            <p>{method.commonMistakes}</p>
          </section>
        )}

        {method.acrossBankTypes && (
          <section className="valuation-section">
            <h2>Across Bank Types</h2>
            <p>{method.acrossBankTypes}</p>
          </section>
        )}

        {method.faqTeasers && method.faqTeasers.length > 0 && (
          <section className="valuation-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-teasers-list">
              {method.faqTeasers.map((faqTeaser, idx) => (
                <div key={idx} className="faq-teaser-card">
                  <h3>{faqTeaser.question}</h3>
                  <p>{faqTeaser.teaser}</p>
                  <NavigationLink
                    to={`/faq/${faqTeaser.faqCluster}/${faqTeaser.faqSlug}`}
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

import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { METRICS } from '../data/content/metrics.js';
import NavigationLink from '../components/NavigationLink.jsx';
import SEO from '../components/SEO.jsx';

/**
 * SVG Category Icon Components - Outlined/Stroked Style
 * Matching the icon style used on the Home page
 */

function ProfitabilityIcon() {
  return (
    <svg
      className="feature-icon-svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

function EfficiencyIcon() {
  return (
    <svg
      className="feature-icon-svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function CapitalIcon() {
  return (
    <svg
      className="feature-icon-svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function ValuationTagIcon() {
  return (
    <svg
      className="feature-icon-svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

function PerShareIcon() {
  return (
    <svg
      className="feature-icon-svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
  );
}

function AssetQualityIcon() {
  return (
    <svg
      className="feature-icon-svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function BalanceSheetIcon() {
  return (
    <svg
      className="feature-icon-svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="3" width="20" height="18" rx="2" ry="2" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="12" y1="3" x2="12" y2="21" />
    </svg>
  );
}

// Map category keys to icon components
const CATEGORY_ICONS = {
  profitability: ProfitabilityIcon,
  efficiency: EfficiencyIcon,
  capital: CapitalIcon,
  'asset-quality': AssetQualityIcon,
  valuation: ValuationTagIcon,
  'per-share': PerShareIcon,
  'balance-sheet': BalanceSheetIcon,
};

// Short typical ranges for card badges
const TYPICAL_RANGE_SHORT = {
  'roe': '8% – 15%',
  'roaa': '0.8% – 1.5%',
  'net-interest-margin': '3.0% – 4.0%',
  'efficiency-ratio': '50% – 60%',
  'deposits-to-assets': '70% – 90%',
  'loans-to-deposits': '70% – 90%',
  'equity-to-assets': '8% – 12%',
  'loans-to-assets': '60% – 75%',
  'price-to-earnings': '8x – 15x',
  'price-to-book': '0.8x – 2.0x',
  'dividend-payout-ratio': '25% – 50%',
};

// Quick reference table data
const QUICK_REFERENCE = [
  { name: 'ROE', slug: 'roe', favorable: '> 10%', concerning: '< 6%', measures: 'Profit from shareholder equity' },
  { name: 'ROAA', slug: 'roaa', favorable: '> 1.0%', concerning: '< 0.7%', measures: 'Asset utilization efficiency' },
  { name: 'NIM', slug: 'net-interest-margin', favorable: '> 3.5%', concerning: '< 2.5%', measures: 'Lending spread profitability' },
  { name: 'Efficiency Ratio', slug: 'efficiency-ratio', favorable: '< 55%', concerning: '> 70%', measures: 'Operating cost management' },
  { name: 'Deposits/Assets', slug: 'deposits-to-assets', favorable: '> 80%', concerning: '< 65%', measures: 'Deposit funding stability' },
  { name: 'Loans/Deposits', slug: 'loans-to-deposits', favorable: '75–90%', concerning: '> 100%', measures: 'Lending vs. liquidity balance' },
  { name: 'Equity/Assets', slug: 'equity-to-assets', favorable: '> 10%', concerning: '< 7%', measures: 'Capital cushion strength' },
  { name: 'Loans/Assets', slug: 'loans-to-assets', favorable: '60–75%', concerning: '> 80%', measures: 'Loan concentration level' },
  { name: 'P/B Ratio', slug: 'price-to-book', favorable: '< 1.0x *', concerning: '> 2.0x', measures: 'Price vs. book value' },
  { name: 'P/E Ratio', slug: 'price-to-earnings', favorable: 'Low vs. peers', concerning: 'Very high', measures: 'Earnings valuation multiple' },
  { name: 'EPS', slug: 'earnings-per-share', favorable: 'Growing', concerning: 'Declining', measures: 'Per-share profitability' },
  { name: 'Payout Ratio', slug: 'dividend-payout-ratio', favorable: '30–50%', concerning: '> 70%', measures: 'Dividend sustainability' },
];

/**
 * Metrics Index Page
 * Overview of all financial metrics with links to detailed explanations
 */
function MetricsIndex() {
  const location = useLocation();
  const incomingState = location.state || {};

  // Restore scroll position when returning via back button
  useEffect(() => {
    if (incomingState.restoreScroll && incomingState.scrollY) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: incomingState.scrollY, behavior: 'instant' });
      });
    }
  }, [incomingState.restoreScroll, incomingState.scrollY]);

  // Note: Schema (BreadcrumbList, FAQPage, ItemList) is provided by the prerender script
  // (scripts/prerender.mjs) in the static HTML for immediate crawler access.
  // Do NOT add a schema here to avoid duplicates.

  // Group metrics by category with expanded descriptions
  const categories = [
    {
      key: 'profitability',
      title: 'Profitability Ratios',
      description: 'Profitability is the foundation of bank analysis. These ratios measure how effectively a bank converts its resources into earnings. Net Interest Margin is especially critical for banks because lending income drives the majority of revenue, unlike non-financial companies where product sales dominate.',
      metrics: METRICS.filter(m => m.category === 'profitability'),
    },
    {
      key: 'efficiency',
      title: 'Efficiency & Funding Ratios',
      description: 'Efficiency ratios reveal how well a bank manages its operations and funding sources. The efficiency ratio is a key benchmark watched by analysts and management alike, showing how much the bank spends to earn each dollar of revenue. Funding ratios indicate the stability and cost of the bank\'s deposit base.',
      metrics: METRICS.filter(m => m.category === 'efficiency'),
    },
    {
      key: 'capital',
      title: 'Capital Strength Ratios',
      description: 'Capital ratios measure a bank\'s financial strength and its ability to absorb unexpected losses. Regulators require banks to maintain minimum capital levels, but well-managed banks often hold capital well above regulatory minimums. These ratios are essential for assessing risk and regulatory compliance.',
      metrics: METRICS.filter(m => m.category === 'capital'),
    },
    {
      key: 'asset-quality',
      title: 'Asset Quality Ratios',
      description: 'Asset quality ratios measure the health of a bank\'s loan portfolio and its exposure to credit losses. Non-performing loan ratios, charge-off rates, and reserve coverage levels reveal the extent of problem assets and management\'s preparedness for potential losses. These metrics are critical for assessing credit risk.',
      metrics: METRICS.filter(m => m.category === 'asset-quality'),
    },
    {
      key: 'valuation',
      title: 'Valuation Metrics',
      description: 'Banks are valued differently from most companies. Price to Book is the primary valuation metric because bank assets are mostly financial instruments carried near fair value. Price to Earnings complements this by reflecting earnings power, while Book Value Per Share provides the fundamental floor value.',
      metrics: METRICS.filter(m => m.category === 'valuation'),
    },
    {
      key: 'per-share',
      title: 'Per Share Metrics',
      description: 'Per-share metrics translate total bank performance into figures relevant to individual shareholders. Earnings Per Share drives stock valuation, while the Dividend Payout Ratio shows how management balances returning capital to shareholders versus retaining earnings for growth.',
      metrics: METRICS.filter(m => m.category === 'per-share'),
    },
    {
      key: 'balance-sheet',
      title: 'Balance Sheet Ratios',
      description: 'Balance sheet ratios examine the composition and structure of a bank\'s assets and liabilities. These metrics provide context for understanding a bank\'s business model, risk profile, and how its resources are deployed between loans, securities, and other assets.',
      metrics: METRICS.filter(m => m.category === 'balance-sheet'),
    },
  ];

  return (
    <div className="page metrics-index-page">
      <SEO
        title="Bank Financial Metrics Explained | ROE, ROAA, Efficiency Ratio Guide"
        description="Free guide to bank financial ratios and metrics. Learn how to calculate and interpret ROE, ROAA, efficiency ratio, P/B ratio, net interest margin, and 10+ key ratios used to analyze and compare US bank stocks."
        canonical="/metrics"
        image="https://banksift.org/og-metrics.png"
      />

      <div className="page-header">
        <h1>Bank Financial Metrics & Ratios</h1>
        <p>
          Understanding financial metrics is essential for analyzing banks effectively.
          Banks operate differently from most companies — they earn money primarily by
          borrowing (deposits) and lending at higher rates. This means standard corporate
          metrics do not always apply. The ratios below are specifically relevant to
          evaluating bank performance, risk, and value.
        </p>
        <p>
          Each metric includes its formula, interpretation guidance, typical ranges
          for banks, and what values may signal strength or concern. Click any metric
          to view its detailed explanation.
        </p>
      </div>

      <div className="metrics-content">
        {/* Getting Started Section */}
        <section className="getting-started-metrics">
          <h2>Where to Start</h2>
          <p>
            If you are new to bank analysis, these four core metrics provide a
            well-rounded view of any bank:
          </p>
          <div className="core-metrics-grid">
            <NavigationLink to="/metrics/roe" state={{ from: 'metrics' }} className="core-metric-item" pageTitle="ROE">
              <strong>ROE</strong>
              <span>Is the bank profitable?</span>
            </NavigationLink>
            <NavigationLink to="/metrics/efficiency-ratio" state={{ from: 'metrics' }} className="core-metric-item" pageTitle="Efficiency Ratio">
              <strong>Efficiency Ratio</strong>
              <span>Is it well-managed?</span>
            </NavigationLink>
            <NavigationLink to="/metrics/price-to-book" state={{ from: 'metrics' }} className="core-metric-item" pageTitle="Price to Book">
              <strong>Price to Book</strong>
              <span>Is the stock fairly valued?</span>
            </NavigationLink>
            <NavigationLink to="/metrics/equity-to-assets" state={{ from: 'metrics' }} className="core-metric-item" pageTitle="Equity to Assets">
              <strong>Equity to Assets</strong>
              <span>Is the bank financially strong?</span>
            </NavigationLink>
          </div>
          <p className="getting-started-cta">
            For a practical walkthrough of using these metrics together, see the{' '}
            <Link to="/screener/guide">Screener Guide</Link>.
          </p>
        </section>

        {/* Quick Reference Table */}
        <section className="quick-reference-section">
          <h2>Quick Reference</h2>
          <p>
            Summary of all metrics with their typical favorable and concerning ranges.
            Click any metric name for the full explanation.
          </p>
          <div className="table-wrapper">
            <table className="reference-table">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Generally Favorable</th>
                  <th>Potential Concern</th>
                  <th>What It Measures</th>
                </tr>
              </thead>
              <tbody>
                {QUICK_REFERENCE.map(row => (
                  <tr key={row.slug}>
                    <td>
                      <NavigationLink
                        to={'/metrics/' + row.slug}
                        state={{ from: 'metrics' }}
                        pageTitle={row.name}
                      >
                        {row.name}
                      </NavigationLink>
                    </td>
                    <td className="favorable">{row.favorable}</td>
                    <td className="concerning">{row.concerning}</td>
                    <td>{row.measures}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="table-footnote">
            * P/B below 1.0x may indicate undervaluation when paired with solid fundamentals
            (e.g., ROE above 8%). All ranges are general guidelines — always compare within
            peer groups.
          </p>
        </section>

        {/* Category Sections */}
        {categories.map(category => {
          const IconComponent = CATEGORY_ICONS[category.key];
          return (
            <details key={category.key} open className="metrics-category-section" id={category.key}>
              <summary className="category-summary">
                <div className="category-summary-content">
                  <span className="feature-icon-link" aria-hidden="true">
                    <span className="feature-icon">
                      {IconComponent && <IconComponent />}
                    </span>
                  </span>
                  <div className="category-header-text">
                    <h2>{category.title}</h2>
                    <p className="category-description">{category.description}</p>
                  </div>
                </div>
                <svg
                  className="collapse-chevron"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </summary>

              <div className="metrics-grid">
                {category.metrics.map(metric => (
                  <NavigationLink
                    key={metric.slug}
                    to={'/metrics/' + metric.slug}
                    state={{ from: 'metrics' }}
                    className="metric-card"
                    pageTitle={metric.name}
                  >
                    <h3>{metric.name}</h3>
                    <p className="metric-formula">{metric.formula}</p>
                    <p className="metric-summary">{metric.shortDescription}</p>
                    <div className="metric-card-footer">
                      {TYPICAL_RANGE_SHORT[metric.slug] && (
                        <span className="metric-range-badge">
                          Typical: {TYPICAL_RANGE_SHORT[metric.slug]}
                        </span>
                      )}
                      <span className="metric-learn-badge">Learn more →</span>
                    </div>
                  </NavigationLink>
                ))}
              </div>
            </details>
          );
        })}

        {/* Notes Section */}
        <section className="metrics-notes">
          <h2>Important Notes</h2>
          <ul>
            <li>
              <strong>Data Source:</strong> All metrics are calculated from SEC EDGAR filings
              (10-K and 10-Q reports).
            </li>
            <li>
              <strong>TTM Calculations:</strong> Income statement items use Trailing Twelve
              Month (TTM) values, summing the most recent four quarters.
            </li>
            <li>
              <strong>Average Values:</strong> Return ratios (ROE, ROAA) use 5-point averages
              of quarterly balance sheet data, following FFIEC methodology.
            </li>
            <li>
              <strong>Comparability:</strong> Different banks may report certain items
              differently. Always compare metrics within similar peer groups.
            </li>
          </ul>
        </section>

        {/* Cross-links */}
        <div className="metrics-cross-links">
          <Link to="/screener/guide" className="btn btn-secondary btn-lg">
            Screener Guide
          </Link>
          <Link to="/valuation" className="btn btn-secondary btn-lg">
            Valuation Methods
          </Link>
          <Link to="/faq" className="btn btn-secondary btn-lg">
            FAQ
          </Link>
          <Link to="/screener" className="btn btn-primary btn-lg">
            Open Screener
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MetricsIndex;

import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { INSIGHT_CATEGORIES } from '../data/content/insights.js';
import NavigationLink from '../components/NavigationLink.jsx';
import SEO from '../components/SEO.jsx';

// Category icon components keyed by the icon field in the data
function RateIcon() {
  return (
    <svg className="feature-icon-svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="20" y1="4" x2="4" y2="20" />
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="18" r="3" />
    </svg>
  );
}

function MergeIcon() {
  return (
    <svg className="feature-icon-svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="18" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <path d="M6 21V9a9 9 0 0 0 9 9" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className="feature-icon-svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function DepositIcon() {
  return (
    <svg className="feature-icon-svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M12 8v8" />
      <path d="M8 12h8" />
    </svg>
  );
}

function LoanIcon() {
  return (
    <svg className="feature-icon-svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

function CrisisIcon() {
  return (
    <svg className="feature-icon-svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function FeeIcon() {
  return (
    <svg className="feature-icon-svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <ellipse cx="12" cy="5" rx="8" ry="2.5" />
      <path d="M4 5v5c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5V5" />
      <path d="M4 10v5c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5v-5" />
      <path d="M4 15v4c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5v-4" />
    </svg>
  );
}

function EarningsIcon() {
  return (
    <svg className="feature-icon-svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function CompareIcon() {
  return (
    <svg className="feature-icon-svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="1" y="4" width="8" height="16" rx="1" />
      <rect x="15" y="4" width="8" height="16" rx="1" />
      <line x1="11" y1="8" x2="13" y2="8" />
      <line x1="11" y1="12" x2="13" y2="12" />
      <line x1="11" y1="16" x2="13" y2="16" />
    </svg>
  );
}

function RiskIcon() {
  return (
    <svg className="feature-icon-svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 18a9 9 0 1 1 18 0" />
      <line x1="12" y1="18" x2="17" y2="9" />
      <circle cx="12" cy="18" r="1.5" />
    </svg>
  );
}

function BankIcon() {
  return (
    <svg className="feature-icon-svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 10l9-6 9 6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <line x1="6" y1="10" x2="6" y2="18" />
      <line x1="10" y1="10" x2="10" y2="18" />
      <line x1="14" y1="10" x2="14" y2="18" />
      <line x1="18" y1="10" x2="18" y2="18" />
      <line x1="2" y1="21" x2="22" y2="21" />
    </svg>
  );
}

const CATEGORY_ICONS = {
  rate: RateIcon,
  merge: MergeIcon,
  shield: ShieldIcon,
  deposit: DepositIcon,
  loan: LoanIcon,
  crisis: CrisisIcon,
  fee: FeeIcon,
  earnings: EarningsIcon,
  compare: CompareIcon,
  risk: RiskIcon,
  bank: BankIcon,
};

/**
 * Insights Index Page
 * Overview of all insight categories with links to hub pages
 */
function InsightsIndex() {
  const location = useLocation();
  const incomingState = location.state || {};

  useEffect(() => {
    if (incomingState.restoreScroll && incomingState.scrollY) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: incomingState.scrollY, behavior: 'instant' });
      });
    }
  }, [incomingState.restoreScroll, incomingState.scrollY]);

  const sortedCategories = [...INSIGHT_CATEGORIES].sort((a, b) => a.order - b.order);

  return (
    <div className="page valuation-index-page">
      <SEO
        title="Bank Investing Insights | Interest Rates, M&A, Regulation & More"
        description="Educational guides on banking topics that matter for bank stock investors. Covers interest rate risk, mergers and acquisitions, regulation, deposit analysis, loan portfolios, and more."
        canonical="/insights"
      />
      <div className="page-header">
        <h1>Insights</h1>
        <p>
          Educational guides on the banking topics that matter most when analyzing
          bank stocks. Each section covers a core theme with focused articles
          on specific subtopics.
        </p>
      </div>

      <div className="valuation-content">
        <section className="valuation-methods">
          <h2>Topics</h2>
          <div className="insights-categories-grid">
            {sortedCategories.map(category => {
              const IconComponent = CATEGORY_ICONS[category.icon];
              return (
                <NavigationLink
                  key={category.slug}
                  to={'/insights/' + category.slug}
                  state={{ from: 'insights' }}
                  className="insight-category-card"
                  pageTitle={category.name}
                >
                  <div className="insight-category-icon">
                    {IconComponent && <IconComponent />}
                  </div>
                  <h3>{category.name}</h3>
                  <p className="method-summary">{category.shortDescription}</p>
                  <div className="method-card-footer">
                    <span className="insight-article-count">
                      {category.articles.length} {category.articles.length === 1 ? 'article' : 'articles'}
                    </span>
                    <span className="method-learn-badge">Explore →</span>
                  </div>
                </NavigationLink>
              );
            })}
          </div>
        </section>

        <div className="metrics-cross-links">
          <Link to="/metrics" className="btn btn-secondary btn-lg">
            Metrics & Ratios
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

export default InsightsIndex;

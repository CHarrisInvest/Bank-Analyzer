import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavigationLink from '../components/NavigationLink.jsx';
import SEO from '../components/SEO.jsx';
import { buildScreenerUrl } from '../components/Screener.jsx';

/**
 * SVG Category Icon Components - Outlined/Stroked Style
 * Same icons used on the Metrics Index page for visual consistency
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
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
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
    >
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
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
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
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
    >
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
  );
}

function ValueInvestingIcon() {
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
    >
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

// Map guide category names to icon components
const GUIDE_CATEGORY_ICONS = {
  'Profitability': ProfitabilityIcon,
  'Valuation': ValuationTagIcon,
  'Capital': CapitalIcon,
  'Per-Share': PerShareIcon,
};

// FAQ content for structured data and display
const FAQ_ITEMS = [
  {
    question: 'How often is the bank data updated?',
    answer: 'BankSift data is refreshed daily at approximately 3 AM UTC. We pull the latest SEC EDGAR filings and recalculate all metrics automatically.',
  },
  {
    question: 'Where does the financial data come from?',
    answer: 'All financial data comes directly from SEC EDGAR filings, specifically 10-K (annual) and 10-Q (quarterly) reports. This is the same official data source used by professional investors and analysts.',
  },
  {
    question: 'What is the Graham Number?',
    answer: 'The Graham Number is a value investing metric developed by Benjamin Graham. It estimates the maximum fair price for a stock using the formula: √(22.5 × EPS × Book Value Per Share). Stocks trading below their Graham Number may be undervalued.',
  },
  {
    question: 'How many banks does BankSift track?',
    answer: 'BankSift tracks over 300 publicly traded banks that file with the SEC under bank-related SIC codes. This includes national commercial banks, state commercial banks, and savings institutions.',
  },
  {
    question: 'What does TTM mean?',
    answer: 'TTM stands for Trailing Twelve Months. It represents the sum of the last four quarters of data, providing an up-to-date annual figure that smooths out seasonal variations.',
  },
  {
    question: 'Is BankSift free to use?',
    answer: 'Yes, BankSift is completely free to use. We provide professional-grade bank screening tools without requiring registration or payment.',
  },
  {
    question: 'Can I export screener results?',
    answer: 'Yes, click the "Export CSV" button above the results table to download your filtered results as a CSV file. The export includes all visible columns in your current column order.',
  },
  {
    question: 'How do I find undervalued bank stocks?',
    answer: 'Use the Value Screening strategy: filter for Price to Book below 1.0, ROE above 8%, and Graham Margin of Safety above 20%. These criteria help identify banks trading below their intrinsic value with solid fundamentals.',
  },
];

// Metrics reference data - organized by category
const METRICS_REFERENCE = [
  // Profitability
  {
    slug: 'roe',
    name: 'Return on Equity',
    abbrev: 'ROE',
    category: 'Profitability',
    description: 'Measures how effectively a bank generates profits from shareholder equity. Higher ROE indicates better capital efficiency.',
    typicalRange: '8% to 15%',
    interpretation: 'Above 10% is generally good; below 6% may indicate challenges.',
  },
  {
    slug: 'roaa',
    name: 'Return on Average Assets',
    abbrev: 'ROAA',
    category: 'Profitability',
    description: 'Shows how efficiently a bank uses its total assets to generate earnings, independent of capital structure.',
    typicalRange: '0.8% to 1.5%',
    interpretation: 'Above 1.0% is considered good for most banks.',
  },
  {
    slug: 'efficiency-ratio',
    name: 'Efficiency Ratio',
    abbrev: 'Efficiency',
    category: 'Profitability',
    description: 'Operating expenses as a percentage of revenue. Lower ratios indicate better cost management.',
    typicalRange: '50% to 70%',
    interpretation: 'Below 55% is excellent; above 70% suggests cost issues.',
  },
  // Valuation
  {
    slug: 'price-to-book',
    name: 'Price to Book',
    abbrev: 'P/B',
    category: 'Valuation',
    description: 'Compares stock price to book value per share. The primary valuation metric for banks.',
    typicalRange: '0.8x to 2.0x',
    interpretation: 'Below 1.0x may indicate undervaluation; above 2.0x is typically expensive.',
  },
  {
    slug: 'price-to-earnings',
    name: 'Price to Earnings',
    abbrev: 'P/E',
    category: 'Valuation',
    description: 'Stock price relative to earnings per share. Indicates how much investors pay per dollar of earnings.',
    typicalRange: '8x to 15x',
    interpretation: 'Lower P/E with solid fundamentals may indicate value opportunity.',
  },
  {
    slug: 'book-value-per-share',
    name: 'Book Value Per Share',
    abbrev: 'BVPS',
    category: 'Valuation',
    description: 'Net asset value attributable to each common share. A floor value for bank stocks.',
    typicalRange: 'Varies by bank',
    interpretation: 'Compare price to BVPS; growing BVPS indicates value creation.',
  },
  // Capital & Structure
  {
    slug: 'equity-to-assets',
    name: 'Equity to Assets',
    abbrev: 'Eq/Assets',
    category: 'Capital',
    description: 'Capital cushion relative to total assets. Higher ratios indicate stronger capital positions.',
    typicalRange: '8% to 12%',
    interpretation: 'Above 10% is strong; below 7% may indicate thin capital buffers.',
  },
  {
    slug: 'deposits-to-assets',
    name: 'Deposits to Assets',
    abbrev: 'Dep/Assets',
    category: 'Capital',
    description: 'Portion of assets funded by customer deposits versus other funding sources.',
    typicalRange: '70% to 90%',
    interpretation: 'Above 80% indicates stable, low-cost funding base.',
  },
  // Per-Share
  {
    slug: 'earnings-per-share',
    name: 'Earnings Per Share',
    abbrev: 'EPS',
    category: 'Per-Share',
    description: 'Net profit allocated to each common share. Key driver of stock valuation.',
    typicalRange: 'Varies by bank',
    interpretation: 'Consistent EPS growth indicates sustainable profitability.',
  },
  {
    slug: 'dividend-payout-ratio',
    name: 'Dividend Payout Ratio',
    abbrev: 'Payout',
    category: 'Per-Share',
    description: 'Percentage of earnings distributed as dividends. Balance between income and growth.',
    typicalRange: '25% to 50%',
    interpretation: 'Above 60% may raise sustainability concerns.',
  },
];

// Valuation methods reference
const VALUATION_REFERENCE = [
  {
    slug: 'graham-number',
    name: 'Graham Number',
    description: 'Benjamin Graham\'s formula for estimating intrinsic value: √(22.5 × EPS × BVPS). Stocks trading below this number may be undervalued.',
    usage: 'Filter for stocks where Graham Number exceeds current price.',
  },
  {
    slug: 'margin-of-safety',
    name: 'Margin of Safety',
    abbrev: 'MoS %',
    description: 'Percentage discount from Graham Number to current price. Higher percentages indicate greater potential undervaluation.',
    usage: 'Filter for MoS above 20-30% for value opportunities.',
  },
];

/**
 * Screener Guide Page
 * Educational content explaining how to use the bank screener effectively
 */
function ScreenerGuide() {
  const location = useLocation();
  const incomingState = location.state || {};

  // Generate comprehensive schema for SEO
  const guideSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://banksift.org' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Bank Screener', 'item': 'https://banksift.org/screener' },
          { '@type': 'ListItem', 'position': 3, 'name': 'Guide', 'item': 'https://banksift.org/screener/guide' },
        ],
      },
      {
        '@type': 'HowTo',
        'name': 'How to Screen Bank Stocks',
        'description': 'Step-by-step guide to using the BankSift bank stock screener to find investment opportunities.',
        'step': [
          { '@type': 'HowToStep', 'name': 'Set Your Criteria', 'text': 'Use the filters panel to set minimum and maximum values for metrics like ROE, P/B ratio, and efficiency ratio.' },
          { '@type': 'HowToStep', 'name': 'Review Results', 'text': 'Examine the filtered results table. Click column headers to sort by any metric.' },
          { '@type': 'HowToStep', 'name': 'Analyze Banks', 'text': 'Click on any ticker to view detailed financial analysis for that bank.' },
          { '@type': 'HowToStep', 'name': 'Export Data', 'text': 'Use the Export CSV button to download your filtered results for further analysis.' },
        ],
      },
      {
        '@type': 'FAQPage',
        'mainEntity': FAQ_ITEMS.map(item => ({
          '@type': 'Question',
          'name': item.question,
          'acceptedAnswer': { '@type': 'Answer', 'text': item.answer },
        })),
      },
    ],
  };

  // Restore scroll position when returning via back button
  useEffect(() => {
    if (incomingState.restoreScroll && incomingState.scrollY) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: incomingState.scrollY, behavior: 'instant' });
      });
    }
  }, [incomingState.restoreScroll, incomingState.scrollY]);

  return (
    <div className="page guide-page">
      <SEO
        title="How to Screen Bank Stocks: Complete Guide | BankSift"
        description="Learn how to screen and analyze bank stocks using ROE, P/B ratio, efficiency ratio, and Graham Number. Step-by-step tutorial for finding undervalued bank stocks with the BankSift screener."
        canonical="/screener/guide"
        image="https://banksift.org/og-guide.png"
        schema={guideSchema}
      />
      <div className="page-header">
        <h1>Bank Screener Guide</h1>
        <p>Learn how to use the BankSift screener to find bank stock investment opportunities.</p>
      </div>

      <div className="guide-content">
        {/* Overview Section */}
        <section className="guide-section">
          <h2>Overview</h2>
          <p>
            The BankSift screener allows you to filter over 300 publicly traded banks based on
            financial metrics. All data is sourced directly from SEC filings (10-K and 10-Q reports),
            ensuring accuracy and reliability.
          </p>
          <p>
            Use the screener to identify banks that meet your specific investment criteria,
            whether you are looking for undervalued opportunities, high-performing institutions,
            or banks with specific financial characteristics.
          </p>
        </section>

        {/* How to Use Section */}
        <section className="guide-section">
          <h2>How to Use the Screener</h2>

          <h3>Step 1: Set Your Filter Criteria</h3>
          <p>
            The filters panel (on the left side, or top on mobile) contains all available screening criteria.
            Enter minimum and/or maximum values to narrow your results. Filters are organized into categories:
          </p>
          <ul>
            <li><strong>Quick Filters:</strong> Search by name/ticker and filter by exchange (NYSE, NASDAQ, OTC)</li>
            <li><strong>Size &amp; Scale:</strong> Filter by market cap, total assets, or deposits</li>
            <li><strong>Valuation:</strong> Price-to-Earnings (P/E) ratio</li>
            <li><strong>Profitability:</strong> ROE, ROAA metrics</li>
            <li><strong>Capital &amp; Leverage:</strong> Equity and deposit ratios</li>
            <li><strong>Efficiency:</strong> Efficiency ratio (operating costs vs. revenue)</li>
            <li><strong>Dividends:</strong> Dividend per share and payout ratio</li>
            <li><strong>Value Investing:</strong> Graham Margin of Safety percentage</li>
          </ul>
          <p>
            <strong>Tip:</strong> When you apply a filter, the corresponding column is automatically
            displayed in the results table, making it easy to see the values you are filtering by.
          </p>

          <h3>Step 2: Review and Sort Results</h3>
          <p>
            Banks matching your criteria appear in the results table. Click any column header to sort
            by that metric. Click again to reverse the sort order, or a third time to remove sorting.
          </p>
          <p>
            Sorted columns are highlighted to help you track your current sort. Columns with active
            filters are also subtly highlighted.
          </p>

          <h3>Step 3: Analyze Individual Banks</h3>
          <p>
            Click any ticker symbol in the results table to view the detailed bank profile page.
            This page shows comprehensive financial data, historical trends, and valuation analysis.
          </p>

          <h3>Step 4: Export Your Results</h3>
          <p>
            Click the <strong>Export CSV</strong> button to download your filtered results.
            The export includes all visible columns in your current column order, perfect for
            further analysis in spreadsheet software.
          </p>
        </section>

        {/* Features Section */}
        <section className="guide-section">
          <h2>Screener Features</h2>

          <div className="feature-item">
            <h3>Export to CSV</h3>
            <p>
              Download your filtered results as a CSV file. The export respects your current
              column selection and order, so you can customize exactly what data you want to analyze.
            </p>
          </div>

          <div className="feature-item">
            <h3>Column Customization</h3>
            <p>
              Click the <strong>Columns</strong> button to show or hide specific data columns.
              Choose "Show All" to see every available metric, or "Default" to reset to the
              standard view. The screener tracks over 30 data points per bank.
            </p>
          </div>

          <div className="feature-item">
            <h3>Column Reordering</h3>
            <p>
              Drag and drop column headers to rearrange the table layout. Your custom order
              is saved and persists between sessions. Use "Reset Order" in the Columns menu
              to restore the default arrangement.
            </p>
          </div>

          <div className="feature-item">
            <h3>Smart Column Display</h3>
            <p>
              When you apply a filter, the corresponding column is automatically added to the
              visible columns. This ensures you can always see the values you are filtering by.
            </p>
          </div>

          <div className="feature-item">
            <h3>Layout Toggle</h3>
            <p>
              Switch between side panel and top panel filter layouts using the toggle button.
              Side layout works well on wide screens; top layout is optimized for narrower displays.
            </p>
          </div>

          <div className="feature-item">
            <h3>Keyboard Shortcuts</h3>
            <p>
              BankSift supports keyboard shortcuts throughout the application. Press <kbd>?</kbd> at
              any time to see the full list. Here are the key shortcuts:
            </p>
            <div className="guide-shortcuts-grid">
              <div className="guide-shortcuts-group">
                <h4>Global</h4>
                <ul>
                  <li><kbd>/</kbd> Focus search input</li>
                  <li><kbd>?</kbd> Show all keyboard shortcuts</li>
                  <li><kbd>Esc</kbd> Close dropdown or blur input</li>
                </ul>
              </div>
              <div className="guide-shortcuts-group">
                <h4>Screener Results Table</h4>
                <ul>
                  <li><kbd>&uarr;</kbd> <kbd>&darr;</kbd> Navigate rows</li>
                  <li><kbd>&larr;</kbd> <kbd>&rarr;</kbd> Navigate columns</li>
                  <li><kbd>Page Up</kbd> / <kbd>Page Down</kbd> Jump 10 rows</li>
                  <li><kbd>Home</kbd> / <kbd>End</kbd> First or last column</li>
                  <li><kbd>Ctrl+Home</kbd> First row and column</li>
                </ul>
              </div>
              <div className="guide-shortcuts-group">
                <h4>Financial Statement Tables</h4>
                <ul>
                  <li><kbd>&uarr;</kbd> <kbd>&darr;</kbd> <kbd>&larr;</kbd> <kbd>&rarr;</kbd> Navigate cells</li>
                  <li><kbd>Enter</kbd> Pin or unpin a column</li>
                  <li><kbd>N</kbd> Add a note to the focused cell</li>
                  <li><kbd>Home</kbd> / <kbd>End</kbd> First or last column</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="feature-item">
            <h3>Search Highlighting</h3>
            <p>
              When you search by name or ticker, matching text is highlighted in the results,
              making it easy to spot your search terms.
            </p>
          </div>
        </section>

        {/* Metrics Reference Section */}
        <section className="guide-section">
          <h2>Metrics Reference</h2>
          <p>
            The screener uses the following financial metrics. Click any metric name to view
            its detailed explanation page with formulas, interpretation guidance, and examples.
          </p>

          {/* Group metrics by category */}
          {['Profitability', 'Valuation', 'Capital', 'Per-Share'].map(category => {
            const IconComponent = GUIDE_CATEGORY_ICONS[category];
            return (
            <div key={category} className="metrics-category">
              <div className="guide-category-header">
                {IconComponent && (
                  <span className="guide-category-icon feature-icon-link" aria-hidden="true">
                    <span className="feature-icon feature-icon-sm">
                      <IconComponent />
                    </span>
                  </span>
                )}
                <h3>{category} Metrics</h3>
              </div>
              <div className="metrics-grid">
                {METRICS_REFERENCE.filter(m => m.category === category).map(metric => (
                  <div key={metric.slug} className="metric-card">
                    <h4>
                      <NavigationLink
                        to={`/metrics/${metric.slug}`}
                        state={{ from: 'screener-guide' }}
                        pageTitle={metric.name}
                      >
                        {metric.name} {metric.abbrev && <span className="metric-abbrev">({metric.abbrev})</span>}
                      </NavigationLink>
                    </h4>
                    <p className="metric-description">{metric.description}</p>
                    <div className="metric-details">
                      <span className="metric-range"><strong>Typical:</strong> {metric.typicalRange}</span>
                      <span className="metric-interpretation">{metric.interpretation}</span>
                    </div>
                    <div className="metric-card-footer">
                      <NavigationLink
                        to={`/metrics/${metric.slug}`}
                        state={{ from: 'screener-guide' }}
                        className="metric-learn-badge"
                        pageTitle={metric.name}
                      >
                        Learn more →
                      </NavigationLink>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            );
          })}

          {/* Valuation Methods */}
          <div className="metrics-category">
            <div className="guide-category-header">
              <span className="guide-category-icon feature-icon-link" aria-hidden="true">
                <span className="feature-icon feature-icon-sm">
                  <ValueInvestingIcon />
                </span>
              </span>
              <h3>Value Investing Metrics</h3>
            </div>
            <div className="metrics-grid">
              {VALUATION_REFERENCE.map(method => (
                <div key={method.slug} className="metric-card">
                  <h4>
                    <NavigationLink
                      to={`/valuation/${method.slug}`}
                      state={{ from: 'screener-guide' }}
                      pageTitle={method.name}
                    >
                      {method.name} {method.abbrev && <span className="metric-abbrev">({method.abbrev})</span>}
                    </NavigationLink>
                  </h4>
                  <p className="metric-description">{method.description}</p>
                  <p className="metric-usage"><strong>Usage:</strong> {method.usage}</p>
                  <div className="metric-card-footer">
                    <NavigationLink
                      to={`/valuation/${method.slug}`}
                      state={{ from: 'screener-guide' }}
                      className="metric-learn-badge"
                      pageTitle={method.name}
                    >
                      Learn more →
                    </NavigationLink>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Screening Strategies Section */}
        <section className="guide-section">
          <h2>Screening Strategies</h2>
          <p>
            The following strategies provide starting points for different investment approaches.
            Each combines multiple metrics to identify banks with specific characteristics.
          </p>

          <div className="strategy-card">
            <h3>Value Screening</h3>
            <p className="strategy-goal">
              <strong>Goal:</strong> Find banks trading below their intrinsic value with solid fundamentals.
            </p>
            <div className="strategy-filters">
              <h4>Suggested Filters:</h4>
              <ul>
                <li><strong>Price to Book:</strong> 0.5 to 1.0</li>
                <li><strong>ROE:</strong> Greater than 8%</li>
                <li><strong>Graham Margin of Safety:</strong> Greater than 20%</li>
              </ul>
            </div>
            <div className="strategy-rationale">
              <h4>Why This Works:</h4>
              <p>
                Banks trading below book value (P/B under 1.0) are priced below the value of their
                net assets. However, a low P/B alone can indicate problems. By requiring ROE above 8%,
                you filter for banks that are still generating reasonable returns despite their
                discounted valuation. The Graham Margin of Safety adds a value investing lens,
                ensuring the stock price is significantly below the calculated intrinsic value.
              </p>
              <p>
                <strong>What it tells you:</strong> Banks passing these filters may be undervalued by
                the market due to temporary concerns, sector-wide pessimism, or simply being overlooked.
                The solid ROE confirms the business is fundamentally sound.
              </p>
            </div>
            <div className="strategy-apply">
              <Link
                to={buildScreenerUrl({ roe: { min: 8, max: '' }, grahamMoS: 20 })}
                className="btn btn-primary btn-sm"
              >
                Apply in Screener
              </Link>
            </div>
          </div>

          <div className="strategy-card">
            <h3>Quality Screening</h3>
            <p className="strategy-goal">
              <strong>Goal:</strong> Identify well-managed banks with strong operational performance.
            </p>
            <div className="strategy-filters">
              <h4>Suggested Filters:</h4>
              <ul>
                <li><strong>ROE:</strong> Greater than 12%</li>
                <li><strong>Efficiency Ratio:</strong> Less than 60%</li>
                <li><strong>Equity to Assets:</strong> Greater than 10%</li>
              </ul>
            </div>
            <div className="strategy-rationale">
              <h4>Why This Works:</h4>
              <p>
                ROE above 12% indicates the bank generates strong returns on shareholder capital,
                placing it in the upper tier of bank performance. The efficiency ratio below 60%
                shows management controls costs effectively—for every dollar of revenue, less than
                60 cents goes to operating expenses. Equity to Assets above 10% ensures the bank
                maintains a strong capital cushion, reducing risk.
              </p>
              <p>
                <strong>What it tells you:</strong> Banks meeting these criteria are operationally
                excellent. They generate above-average returns, run efficient operations, and maintain
                conservative capital positions. These tend to be well-managed institutions that
                can weather economic downturns.
              </p>
            </div>
            <div className="strategy-apply">
              <Link
                to={buildScreenerUrl({ roe: { min: 12, max: '' }, efficiencyRatio: { min: '', max: 60 }, equityToAssets: { min: 10, max: '' } })}
                className="btn btn-primary btn-sm"
              >
                Apply in Screener
              </Link>
            </div>
          </div>

          <div className="strategy-card">
            <h3>Dividend Income Screening</h3>
            <p className="strategy-goal">
              <strong>Goal:</strong> Find banks with sustainable dividend payments for income-focused investing.
            </p>
            <div className="strategy-filters">
              <h4>Suggested Filters:</h4>
              <ul>
                <li><strong>Dividend Payout Ratio:</strong> 20% to 50%</li>
                <li><strong>ROE:</strong> Greater than 10%</li>
                <li><strong>Total Assets:</strong> Greater than $1 billion</li>
              </ul>
            </div>
            <div className="strategy-rationale">
              <h4>Why This Works:</h4>
              <p>
                A payout ratio between 20-50% indicates the bank distributes a reasonable portion
                of earnings while retaining enough to fund growth and absorb potential losses.
                Payout ratios above 60% may be unsustainable if earnings decline. Requiring ROE
                above 10% ensures the dividend is backed by strong profitability. The asset size
                filter focuses on larger, more established banks that typically have more stable
                dividend policies.
              </p>
              <p>
                <strong>What it tells you:</strong> Banks in this group balance shareholder returns
                with financial prudence. The moderate payout ratio suggests room for dividend growth
                as earnings increase, while the profitability requirement indicates the dividend
                is well-covered by earnings.
              </p>
            </div>
            <div className="strategy-apply">
              <Link
                to={buildScreenerUrl({ dividendPayoutRatio: { min: 20, max: 50 }, roe: { min: 10, max: '' }, totalAssets: { min: 1000, max: '' } })}
                className="btn btn-primary btn-sm"
              >
                Apply in Screener
              </Link>
            </div>
          </div>
        </section>

        {/* Data Notes Section */}
        <section className="guide-section">
          <h2>Data Notes</h2>
          <ul>
            <li>
              <strong>Data Source:</strong> All financial data comes from SEC EDGAR filings.
              We use the most recent 10-Q or 10-K filing available for each bank.
            </li>
            <li>
              <strong>TTM Metrics:</strong> Income statement metrics are calculated on a
              Trailing Twelve Month (TTM) basis by summing the most recent four quarters.
              This provides a full-year view using the latest available data.
            </li>
            <li>
              <strong>Update Frequency:</strong> Data is refreshed daily at approximately
              3 AM UTC to capture newly filed reports.
            </li>
            <li>
              <strong>Coverage:</strong> The screener includes all publicly traded banks
              that file with the SEC under bank-related SIC codes (6021, 6022, 6035, 6036).
            </li>
            <li>
              <strong>Market Data:</strong> Stock prices and market capitalization are
              updated regularly from market data sources.
            </li>
          </ul>
        </section>

        {/* Disclaimers Section */}
        <section className="guide-section">
          <h2>Important Disclaimers</h2>
          <p>
            The information provided by BankSift is for educational and informational
            purposes only. It should not be considered as investment advice. Always conduct
            your own research and consider consulting with a qualified financial advisor
            before making investment decisions.
          </p>
          <p>
            Past performance does not guarantee future results. Financial metrics can change
            rapidly, and the data shown may not reflect the most current information available.
            Screening results identify banks matching specific criteria but do not constitute
            buy or sell recommendations.
          </p>
        </section>

        {/* FAQ Section */}
        <section className="guide-section faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-list">
            {FAQ_ITEMS.map((item, index) => (
              <details key={index} className="faq-item">
                <summary className="faq-question">{item.question}</summary>
                <p className="faq-answer">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <div className="guide-cta">
          <Link to="/screener" className="btn btn-primary btn-lg">
            Open the Screener
          </Link>
          <Link to="/metrics" className="btn btn-secondary btn-lg">
            Explore All Metrics
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ScreenerGuide;

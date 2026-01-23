import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavigationLink from '../components/NavigationLink.jsx';
import SEO from '../components/SEO.jsx';

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
];

/**
 * Screener Guide Page
 * Educational content explaining how to use the bank screener effectively
 */
function ScreenerGuide() {
  const location = useLocation();
  const incomingState = location.state || {};

  // Generate FAQ schema for AI search optimization
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': FAQ_ITEMS.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer,
      },
    })),
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
        title="Screener Guide - How to Screen Bank Stocks"
        description="Learn how to use the BankSift bank screener to find investment opportunities. Understand key metrics like ROE, efficiency ratio, and Graham Number for bank stock analysis."
        canonical="/screener/guide"
        schema={faqSchema}
      />
      <div className="page-header">
        <h1>Screener Guide</h1>
        <p>Learn how to use the BankSift screener to find investment opportunities.</p>
      </div>

      <div className="guide-content">
        <section className="guide-section">
          <h2>Overview</h2>
          <p>
            The BankSift screener allows you to filter publicly traded banks based on
            various financial metrics. All data is sourced directly from SEC filings (10-K
            and 10-Q reports), ensuring accuracy and reliability.
          </p>
          <p>
            Use the screener to identify banks that meet your specific investment criteria,
            whether you are looking for undervalued opportunities, high-performing institutions,
            or banks with specific financial characteristics.
          </p>
        </section>

        <section className="guide-section">
          <h2>Understanding the Interface</h2>

          <h3>Filters Panel</h3>
          <p>
            The filters panel appears on the left side (or top on mobile devices). You can
            toggle the layout using the button in the filters header. Filters are organized
            into categories:
          </p>
          <ul>
            <li><strong>Quick Filters:</strong> Search by name/ticker and filter by exchange</li>
            <li><strong>Size & Scale:</strong> Filter by market cap, total assets, deposits</li>
            <li><strong>Valuation:</strong> Price-to-earnings (P/NI) and related metrics</li>
            <li><strong>Profitability:</strong> ROE, ROAA, and efficiency ratios</li>
            <li><strong>Capital & Leverage:</strong> Equity and deposit ratios</li>
            <li><strong>Value Investing:</strong> Graham Number and margin of safety</li>
          </ul>

          <h3>Results Table</h3>
          <p>
            Banks matching your filters appear in the results table. Click any column header
            to sort by that metric. The table displays key information at a glance, and you
            can click on any bank to view its detailed profile.
          </p>
        </section>

        <section className="guide-section">
          <h2>Key Metrics Explained</h2>

          <div className="metric-explanation">
            <h3>Return on Equity (ROE)</h3>
            <p>
              ROE measures how effectively a bank generates profits from shareholder equity.
              Calculated as Net Income divided by Average Shareholder Equity. Higher ROE
              indicates better profitability, but extremely high values may indicate
              excessive leverage.
            </p>
            <p><strong>Typical range for banks:</strong> 8% to 15%</p>
            <NavigationLink
              to="/metrics/roe"
              state={{ from: 'screener-guide' }}
              pageTitle="ROE"
            >
              Learn more about ROE →
            </NavigationLink>
          </div>

          <div className="metric-explanation">
            <h3>Efficiency Ratio</h3>
            <p>
              The efficiency ratio shows how well a bank controls its operating expenses
              relative to its revenue. Calculated as Non-Interest Expense divided by
              (Net Interest Income + Non-Interest Income). Lower is better.
            </p>
            <p><strong>Typical range for banks:</strong> 50% to 70%</p>
            <NavigationLink
              to="/metrics/efficiency-ratio"
              state={{ from: 'screener-guide' }}
              pageTitle="Efficiency Ratio"
            >
              Learn more about Efficiency Ratio →
            </NavigationLink>
          </div>

          <div className="metric-explanation">
            <h3>Price to Tangible Book Value</h3>
            <p>
              This valuation metric compares the stock price to the bank's tangible book
              value per share. Banks trading below 1.0x may be undervalued, while those
              above 2.0x are typically considered expensive.
            </p>
            <p><strong>Typical range for banks:</strong> 0.8x to 2.0x</p>
            <NavigationLink
              to="/metrics/price-to-book"
              state={{ from: 'screener-guide' }}
              pageTitle="Price to Book"
            >
              Learn more about Price to Book →
            </NavigationLink>
          </div>

          <div className="metric-explanation">
            <h3>Graham Number</h3>
            <p>
              A value investing metric developed by Benjamin Graham. It estimates the
              maximum fair price for a stock based on earnings and book value. The formula
              is: √(22.5 × EPS × Book Value Per Share).
            </p>
            <NavigationLink
              to="/valuation/graham-number"
              state={{ from: 'screener-guide' }}
              pageTitle="Graham Number"
            >
              Learn more about Graham Number →
            </NavigationLink>
          </div>
        </section>

        <section className="guide-section">
          <h2>Screening Strategies</h2>

          <div className="strategy-card">
            <h3>Value Screening</h3>
            <p>Find potentially undervalued banks:</p>
            <ul>
              <li>Price to Book Value: 0.5 to 1.0</li>
              <li>ROE: Greater than 8%</li>
              <li>Graham Margin of Safety: Greater than 20%</li>
            </ul>
          </div>

          <div className="strategy-card">
            <h3>Quality Screening</h3>
            <p>Find high-quality, well-run banks:</p>
            <ul>
              <li>ROE: Greater than 12%</li>
              <li>Efficiency Ratio: Less than 60%</li>
              <li>Equity to Assets: Greater than 10%</li>
            </ul>
          </div>

          <div className="strategy-card">
            <h3>Income Screening</h3>
            <p>Find banks with strong dividend potential:</p>
            <ul>
              <li>Dividend Payout Ratio: 20% to 50%</li>
              <li>ROE: Greater than 10%</li>
              <li>Total Assets: Greater than $1 billion</li>
            </ul>
          </div>
        </section>

        <section className="guide-section">
          <h2>Data Notes</h2>
          <ul>
            <li>
              <strong>Data Source:</strong> All financial data comes from SEC EDGAR filings.
              We use the most recent 10-Q or 10-K filing available.
            </li>
            <li>
              <strong>TTM Metrics:</strong> Income statement metrics are calculated on a
              Trailing Twelve Month (TTM) basis by summing the most recent four quarters.
            </li>
            <li>
              <strong>Update Frequency:</strong> Data is refreshed daily at 3 AM UTC to
              capture newly filed reports.
            </li>
            <li>
              <strong>Coverage:</strong> The screener includes all publicly traded banks
              that file with the SEC under bank-related SIC codes (6021, 6022, 6035, 6036).
            </li>
          </ul>
        </section>

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
          </p>
        </section>

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

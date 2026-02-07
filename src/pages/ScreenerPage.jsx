import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Screener from '../components/Screener.jsx';
import SEO from '../components/SEO.jsx';

/**
 * Screener Page Wrapper
 * Wraps the Screener component for use with React Router
 */
function ScreenerPage({ banks, loading }) {
  const [showInfo, setShowInfo] = useState(false);

  const screenerSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://banksift.org"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Bank Screener",
            "item": "https://banksift.org/screener"
          }
        ]
      },
      {
        "@type": "WebApplication",
        "name": "BankSift Bank Stock Screener",
        "alternateName": ["Bank Screener", "Bank Equity Screener", "Bank Filter", "The Sifter"],
        "url": "https://banksift.org/screener",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "browserRequirements": "Requires JavaScript",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Screen 300+ publicly traded US bank stocks",
          "Filter banks by 25+ financial metrics",
          "Graham Number valuation calculations",
          "Daily updates from SEC EDGAR filings",
          "Free bank stock screener - no registration required",
          "Export and sort bank screening results"
        ],
        "description": "Free online bank stock screener for filtering and analyzing publicly traded US banks by financial metrics including ROE, ROAA, efficiency ratio, and Graham Number."
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a bank stock screener?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A bank stock screener is a tool that filters publicly traded bank stocks based on financial metrics like ROE, P/B ratio, and efficiency ratio. It helps investors find bank stocks that match their investment criteria."
            }
          },
          {
            "@type": "Question",
            "name": "How do I screen for undervalued bank stocks?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use the bank screener to filter by Price to Book ratio below 1.0, Graham Number above current price, and ROE above 10%. These metrics help identify potentially undervalued bank stocks with good fundamentals."
            }
          },
          {
            "@type": "Question",
            "name": "What metrics should I use to screen bank stocks?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Key metrics for screening bank stocks include Return on Equity (ROE), Return on Assets (ROAA), Efficiency Ratio, Net Interest Margin, Price to Book ratio, and the Graham Number for value investing."
            }
          },
          {
            "@type": "Question",
            "name": "Is this bank screener free to use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, BankSift's bank stock screener is completely free. No registration required. Data is updated daily from SEC filings."
            }
          },
          {
            "@type": "Question",
            "name": "How do I filter banks by financial metrics?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Use the filter panel to set minimum and maximum values for any metric. For example, set ROE minimum to 10% and P/B maximum to 1.0x to find profitable banks trading below book value. Filtered columns automatically appear in your results table. You can combine multiple filters to narrow your search and sort results by any column."
            }
          },
          {
            "@type": "Question",
            "name": "Which metrics are most important when ranking banks?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The most important metrics for ranking banks are Return on Equity (ROE) for profitability, Efficiency Ratio for operational management, Price to Book (P/B) for valuation, and Equity to Assets for capital strength. For value investors, the Graham Number and margin of safety percentage help identify potentially undervalued bank stocks."
            }
          },
          {
            "@type": "Question",
            "name": "Can I compare multiple banks at once using BankSift?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. The screener displays all banks matching your filter criteria in a sortable table. You can compare banks side-by-side across 25+ metrics, customize which columns are visible, reorder columns by dragging, and export your filtered results to CSV for further analysis in a spreadsheet."
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="page screener-page">
      <SEO
        title="Free Bank Stock Screener | Filter & Compare Bank Stocks by 25+ Metrics - BankSift"
        description="Free online bank stock screener to filter, rank, and compare 300+ US bank stocks. Screen by ROE, P/B ratio, Graham Number, efficiency ratio, and 20+ financial metrics. Updated daily from SEC filings. No registration required."
        canonical="/screener"
        schema={screenerSchema}
      />
      <div className="page-header screener-page-header">
        <h1>Bank Screener <em>"The Sifter"</em></h1>
        <p>Filter and analyze publicly traded banks by financial metrics.</p>
        <button
          className="info-toggle"
          onClick={() => setShowInfo(!showInfo)}
          aria-expanded={showInfo}
        >
          {showInfo ? 'Hide details' : 'About this screener'}
        </button>
        {showInfo && (
          <div className="screener-info">
            <p>
              Screen and filter 300+ US bank stocks using 25+ financial metrics including ROE, ROAA,
              efficiency ratio, price-to-book, and Graham Number. Our free bank equity screener updates
              daily from SEC EDGAR filings, helping value investors identify undervalued bank stocks.
            </p>
            <p>
              <Link to="/screener/guide">View the Screener Guide</Link> for detailed instructions on
              using filters and interpreting results.
            </p>
          </div>
        )}
      </div>
      <Screener banks={banks} loading={loading} />
    </div>
  );
}

export default ScreenerPage;

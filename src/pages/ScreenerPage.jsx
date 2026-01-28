import React from 'react';
import Screener from '../components/Screener.jsx';
import SEO from '../components/SEO.jsx';

/**
 * Screener Page Wrapper
 * Wraps the Screener component for use with React Router
 */
function ScreenerPage({ banks, loading }) {
  const screenerSchema = {
    "@context": "https://schema.org",
    "@graph": [
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
          }
        ]
      }
    ]
  };

  return (
    <div className="page screener-page">
      <SEO
        title="Free Bank Stock Screener | Filter Bank Stocks by 25+ Metrics - BankSift"
        description="Free bank stock screener to filter and analyze 300+ US bank stocks. Screen bank equities by ROE, P/B ratio, Graham Number, efficiency ratio & 20+ metrics. Updated daily from SEC filings."
        canonical="/screener"
        schema={screenerSchema}
      />
      <div className="page-header screener-page-header">
        <h1>Bank Screener <em>"The Sifter"</em></h1>
        <p>Filter and analyze publicly traded banks by financial metrics.</p>
      </div>
      <Screener banks={banks} loading={loading} />
    </div>
  );
}

export default ScreenerPage;

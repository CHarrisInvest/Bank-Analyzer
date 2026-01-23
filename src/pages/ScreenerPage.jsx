import React from 'react';
import Screener from '../components/Screener.jsx';
import SEO from '../components/SEO.jsx';

/**
 * Screener Page Wrapper
 * Wraps the Screener component for use with React Router
 */
function ScreenerPage({ banks, loading }) {
  const screenerSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'BankSift Bank Screener',
    'alternateName': 'The Sifter',
    'description': 'Screen and filter 300+ publicly traded banks by 25+ financial metrics including ROE, efficiency ratio, Graham Number, and more.',
    'url': 'https://banksift.org/screener',
    'applicationCategory': 'FinanceApplication',
    'operatingSystem': 'Any',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    }
  };

  return (
    <div className="page screener-page">
      <SEO
        title="Bank Screener - The Sifter"
        description="Screen and filter 300+ publicly traded banks by 25+ financial metrics. Free bank stock screener with ROE, efficiency ratio, Graham Number, price-to-book, and more."
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

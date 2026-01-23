import React from 'react';
import Screener from '../components/Screener.jsx';

/**
 * Screener Page Wrapper
 * Wraps the Screener component for use with React Router
 */
function ScreenerPage({ banks, loading }) {
  return (
    <div className="page screener-page">
      <div className="page-header screener-page-header">
        <h1>Bank Screener <em>"The Sifter"</em></h1>
        <p>Filter and analyze publicly traded banks by financial metrics.</p>
      </div>
      <Screener banks={banks} loading={loading} />
    </div>
  );
}

export default ScreenerPage;

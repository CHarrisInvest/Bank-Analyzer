import React from 'react';
import Screener from '../components/Screener.jsx';

/**
 * Screener Page Wrapper
 * Wraps the Screener component for use with React Router
 */
function ScreenerPage({ banks, loading }) {
  return (
    <div className="page screener-page">
      <Screener banks={banks} loading={loading} />
    </div>
  );
}

export default ScreenerPage;

import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';

/**
 * 404 Not Found Page
 * Shown for unknown routes - includes noindex to prevent search engine indexation
 */
function NotFound() {
  return (
    <div className="page not-found-page">
      <SEO
        title="Page Not Found"
        description="The requested page could not be found."
        noindex={true}
      />
      <section className="not-found-section">
        <h1>Page Not Found</h1>
        <p>
          The page you're looking for doesn't exist or may have been moved.
        </p>
        <div className="not-found-links">
          <h2>Try one of these instead:</h2>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/screener">Bank Screener</Link></li>
            <li><Link to="/search">Bank Search</Link></li>
            <li><Link to="/metrics">Financial Metrics</Link></li>
            <li><Link to="/valuation">Valuation Methods</Link></li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default NotFound;

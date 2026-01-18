import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { METRICS } from '../data/content/metrics.js';
import NavigationLink from '../components/NavigationLink.jsx';

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

  // Group metrics by category
  const categories = {
    profitability: {
      title: 'Profitability Ratios',
      description: 'Measures of how effectively a bank generates profits',
      metrics: METRICS.filter(m => m.category === 'profitability'),
    },
    efficiency: {
      title: 'Efficiency Ratios',
      description: 'Measures of operational effectiveness and cost management',
      metrics: METRICS.filter(m => m.category === 'efficiency'),
    },
    capital: {
      title: 'Capital & Leverage Ratios',
      description: 'Measures of financial strength and risk',
      metrics: METRICS.filter(m => m.category === 'capital'),
    },
    valuation: {
      title: 'Valuation Metrics',
      description: 'Measures for assessing relative value',
      metrics: METRICS.filter(m => m.category === 'valuation'),
    },
    perShare: {
      title: 'Per Share Metrics',
      description: 'Key figures calculated on a per-share basis',
      metrics: METRICS.filter(m => m.category === 'per-share'),
    },
  };

  return (
    <div className="page metrics-index-page">
      <div className="page-header">
        <h1>Metrics & Ratios</h1>
        <p>
          Understanding financial metrics is essential for analyzing banks effectively.
          This guide explains each metric used in Bank Analyzer, including how it is
          calculated and what it tells you about a bank's performance.
        </p>
      </div>

      <div className="metrics-content">
        {Object.entries(categories).map(([key, category]) => (
          <section key={key} className="metrics-category">
            <h2>{category.title}</h2>
            <p className="category-description">{category.description}</p>

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
                  <span className="metric-link">Learn more →</span>
                </NavigationLink>
              ))}
            </div>
          </section>
        ))}

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
      </div>
    </div>
  );
}

export default MetricsIndex;

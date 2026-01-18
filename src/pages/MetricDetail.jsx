import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { METRICS } from '../data/content/metrics.js';
import { trackMetricViewed } from '../analytics/events.js';
import BackButton from '../components/BackButton.jsx';
import NavigationLink from '../components/NavigationLink.jsx';

/**
 * Metric Detail Page
 * Detailed explanation of a single financial metric
 */
function MetricDetail() {
  const { slug } = useParams();

  const metric = METRICS.find(m => m.slug === slug);

  useEffect(() => {
    if (metric) {
      trackMetricViewed(slug);
    }
  }, [slug, metric]);

  if (!metric) {
    return (
      <div className="page metric-detail-page">
        <div className="not-found">
          <h1>Metric Not Found</h1>
          <p>No metric found with identifier "{slug}".</p>
          <Link to="/metrics" className="btn btn-primary">View All Metrics</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page metric-detail-page">
      <BackButton />

      <nav className="breadcrumb">
        <Link to="/metrics">Metrics & Ratios</Link>
        <span className="separator">/</span>
        <span>{metric.name}</span>
      </nav>

      <article className="metric-article">
        <header className="metric-header">
          <h1>{metric.name}</h1>
          <p className="metric-category">{metric.categoryLabel}</p>
        </header>

        <section className="metric-section">
          <h2>Overview</h2>
          <p>{metric.description}</p>
        </section>

        <section className="metric-section">
          <h2>Formula</h2>
          <div className="formula-box">
            <code>{metric.formula}</code>
          </div>
          {metric.formulaExplanation && (
            <p className="formula-explanation">{metric.formulaExplanation}</p>
          )}
        </section>

        <section className="metric-section">
          <h2>Interpretation</h2>
          <p>{metric.interpretation}</p>

          {metric.typicalRange && (
            <div className="typical-range">
              <h3>Typical Range for Banks</h3>
              <p>{metric.typicalRange}</p>
            </div>
          )}

          {metric.goodBad && (
            <div className="good-bad-indicators">
              <div className="indicator good">
                <span className="indicator-label">Generally Favorable</span>
                <p>{metric.goodBad.good}</p>
              </div>
              <div className="indicator bad">
                <span className="indicator-label">Potential Concern</span>
                <p>{metric.goodBad.bad}</p>
              </div>
            </div>
          )}
        </section>

        {metric.considerations && (
          <section className="metric-section">
            <h2>Important Considerations</h2>
            <ul>
              {metric.considerations.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {metric.relatedMetrics && metric.relatedMetrics.length > 0 && (
          <section className="metric-section">
            <h2>Related Metrics</h2>
            <div className="related-metrics">
              {metric.relatedMetrics.map(related => {
                const relatedMetric = METRICS.find(m => m.slug === related);
                if (!relatedMetric) return null;
                return (
                  <NavigationLink
                    key={related}
                    to={'/metrics/' + related}
                    state={{ from: 'metrics-detail', returnPath: '/metrics/' + slug }}
                    className="related-metric-link"
                    pageTitle={relatedMetric.name}
                  >
                    {relatedMetric.name}
                  </NavigationLink>
                );
              })}
            </div>
          </section>
        )}

        <section className="metric-section">
          <h2>Data Source</h2>
          <p>
            This metric is calculated using data from SEC EDGAR filings. {metric.dataSource}
          </p>
        </section>
      </article>

      <div className="page-navigation">
        <NavigationLink
          to="/metrics"
          state={{ from: 'metrics-detail' }}
          className="btn btn-secondary"
          pageTitle="All Metrics"
        >
          ← All Metrics
        </NavigationLink>
        <NavigationLink
          to="/screener"
          state={{ from: 'metrics-detail' }}
          className="btn btn-primary"
          pageTitle="Screener"
        >
          Use in Screener →
        </NavigationLink>
      </div>
    </div>
  );
}

export default MetricDetail;

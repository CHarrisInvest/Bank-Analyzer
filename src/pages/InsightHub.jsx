import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { INSIGHT_CATEGORIES } from '../data/content/insights.js';
import { METRICS } from '../data/content/metrics.js';
import { VALUATION_METHODS } from '../data/content/valuations.js';
import { FAQS } from '../data/content/faqs.js';
import { trackInsightViewed } from '../analytics/events.js';
import BackButton from '../components/BackButton.jsx';
import NavigationLink from '../components/NavigationLink.jsx';
import SEO from '../components/SEO.jsx';
import { renderFormattedText } from '../utils/renderFormattedText.jsx';

/**
 * Renders hub content with inline article callout cards.
 * Splits on [[article:slug]] markers and renders article cards between text sections.
 */
function renderHubContent(hubContent, articles, categorySlug) {
  if (!hubContent) return null;

  // Split content on [[article:slug]] markers
  const parts = hubContent.split(/\n\n\[\[article:([^\]]+)\]\]/);
  const elements = [];

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 0) {
      // Text block
      const text = parts[i].trim();
      if (text) {
        elements.push(
          <div key={`text-${i}`} className="insight-hub-content">
            {renderFormattedText(text, `hub-${i}`)}
          </div>
        );
      }
    } else {
      // Article slug
      const articleSlug = parts[i].trim();
      const article = articles.find(a => a.slug === articleSlug);
      if (article) {
        elements.push(
          <NavigationLink
            key={`article-${articleSlug}`}
            to={`/insights/${categorySlug}/${articleSlug}`}
            state={{ from: 'insight-hub' }}
            className="insight-inline-card"
            pageTitle={article.title}
          >
            <div className="related-item-card-content">
              <span className="related-item-card-name">{article.title}</span>
              <span className="related-item-card-desc">{article.shortDescription}</span>
            </div>
            <span className="related-item-card-arrow" aria-hidden="true">&rarr;</span>
          </NavigationLink>
        );
      }
    }
  }

  return elements;
}

/**
 * Insight Hub Page
 * Category pillar page with ~1,000 words of content and inline article links
 */
function InsightHub() {
  const { categorySlug } = useParams();
  const category = INSIGHT_CATEGORIES.find(c => c.slug === categorySlug);

  useEffect(() => {
    if (category) {
      trackInsightViewed(categorySlug, 'hub');
    }
  }, [categorySlug, category]);

  if (!category) {
    return (
      <div className="page valuation-detail-page">
        <div className="not-found">
          <h1>Insight Category Not Found</h1>
          <p>No insight category found with identifier "{categorySlug}".</p>
          <Link to="/insights" className="btn btn-primary">View All Insights</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page valuation-detail-page">
      <SEO
        title={category.metaTitle}
        description={category.metaDescription}
        canonical={`/insights/${categorySlug}`}
        type="article"
      />
      <div className="detail-nav-row">
        <BackButton />
        <nav className="breadcrumb">
          <Link to="/insights">Insights</Link>
          <span className="separator">/</span>
          <span>{category.name}</span>
        </nav>
      </div>

      <article className="valuation-article">
        <header className="valuation-header">
          <h1>{category.name}</h1>
        </header>

        <section className="valuation-section">
          {renderHubContent(category.hubContent, category.articles, categorySlug)}
        </section>

        <div className="faq-explore-more">
          <h2 className="faq-explore-more-heading">Keep Exploring</h2>

          {category.relatedFaqSlugs && category.relatedFaqSlugs.length > 0 && (
            <section className="faq-explore-section">
              <h3 className="faq-explore-label">Related FAQs</h3>
              <div className="faq-teasers-list">
                {category.relatedFaqSlugs.map(faqSlug => {
                  const faq = FAQS.find(f => f.slug === faqSlug);
                  if (!faq) return null;
                  return (
                    <NavigationLink
                      key={faqSlug}
                      to={`/faq/${faqSlug}`}
                      className="faq-teaser-card"
                      pageTitle={faq.question}
                    >
                      <div className="related-item-card-content">
                        <span className="related-item-card-name">{faq.question}</span>
                        <span className="related-item-card-desc">{faq.shortAnswer}</span>
                      </div>
                      <span className="related-item-card-arrow" aria-hidden="true">&rarr;</span>
                    </NavigationLink>
                  );
                })}
              </div>
            </section>
          )}

          {category.relatedMetrics && category.relatedMetrics.length > 0 && (
            <section className="faq-explore-section">
              <h3 className="faq-explore-label">Related Metrics</h3>
              <div className="related-metrics-list">
                {category.relatedMetrics.map(metricSlug => {
                  const metric = METRICS.find(m => m.slug === metricSlug);
                  if (!metric) return null;
                  const desc = category.relatedMetricDescriptions?.[metricSlug];
                  return (
                    <NavigationLink
                      key={metricSlug}
                      to={'/metrics/' + metricSlug}
                      state={{ from: 'insight-hub', returnPath: '/insights/' + categorySlug }}
                      className="related-item-card"
                      pageTitle={metric.name}
                    >
                      <div className="related-item-card-content">
                        <span className="related-item-card-name">{metric.name}</span>
                        {desc && <span className="related-item-card-desc">{desc}</span>}
                      </div>
                      <span className="related-item-card-arrow" aria-hidden="true">&rarr;</span>
                    </NavigationLink>
                  );
                })}
              </div>
            </section>
          )}

          {category.relatedValuations && category.relatedValuations.length > 0 && (
            <section className="faq-explore-section">
              <h3 className="faq-explore-label">Related Valuation Methods</h3>
              <div className="related-metrics-list">
                {category.relatedValuations.map(valSlug => {
                  const val = VALUATION_METHODS.find(v => v.slug === valSlug);
                  if (!val) return null;
                  const desc = category.relatedValuationDescriptions?.[valSlug];
                  return (
                    <NavigationLink
                      key={valSlug}
                      to={'/valuation/' + valSlug}
                      state={{ from: 'insight-hub', returnPath: '/insights/' + categorySlug }}
                      className="related-item-card"
                      pageTitle={val.name}
                    >
                      <div className="related-item-card-content">
                        <span className="related-item-card-name">{val.name}</span>
                        {desc && <span className="related-item-card-desc">{desc}</span>}
                      </div>
                      <span className="related-item-card-arrow" aria-hidden="true">&rarr;</span>
                    </NavigationLink>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </article>

      <div className="page-navigation">
        <NavigationLink
          to="/insights"
          state={{ from: 'insight-hub' }}
          className="btn btn-secondary"
          pageTitle="All Insights"
        >
          ← All Insights
        </NavigationLink>
        <NavigationLink
          to="/screener"
          state={{ from: 'insight-hub' }}
          className="btn btn-primary"
          pageTitle="Screener"
        >
          Use Screener →
        </NavigationLink>
      </div>
    </div>
  );
}

export default InsightHub;

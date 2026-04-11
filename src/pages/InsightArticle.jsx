import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { INSIGHT_CATEGORIES, ALL_INSIGHT_ARTICLES } from '../data/content/insights.js';
import { METRICS } from '../data/content/metrics.js';
import { VALUATION_METHODS } from '../data/content/valuations.js';
import { FAQS } from '../data/content/faqs.js';
import { trackInsightViewed } from '../analytics/events.js';
import BackButton from '../components/BackButton.jsx';
import NavigationLink from '../components/NavigationLink.jsx';
import SEO from '../components/SEO.jsx';
import { renderFormattedText } from '../utils/renderFormattedText.jsx';

/**
 * Insight Article Page
 * Individual article within a category hub
 */
function InsightArticle() {
  const { categorySlug, articleSlug } = useParams();
  const category = INSIGHT_CATEGORIES.find(c => c.slug === categorySlug);
  const article = category ? category.articles.find(a => a.slug === articleSlug) : null;

  useEffect(() => {
    if (article) {
      trackInsightViewed(articleSlug, 'article');
    }
  }, [articleSlug, article]);

  if (!category || !article) {
    return (
      <div className="page valuation-detail-page">
        <div className="not-found">
          <h1>Insight Article Not Found</h1>
          <p>No article found at this location.</p>
          <Link to="/insights" className="btn btn-primary">View All Insights</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page valuation-detail-page">
      <SEO
        title={article.metaTitle}
        description={article.metaDescription}
        canonical={`/insights/${categorySlug}/${articleSlug}`}
        type="article"
      />
      <div className="detail-nav-row">
        <BackButton />
        <nav className="breadcrumb">
          <Link to="/insights">Insights</Link>
          <span className="separator">/</span>
          <Link to={`/insights/${categorySlug}`}>{category.name}</Link>
          <span className="separator">/</span>
          <span>{article.title}</span>
        </nav>
      </div>

      <article className="valuation-article">
        <header className="valuation-header">
          <h1>{article.title}</h1>
        </header>

        <section className="valuation-section">
          {renderFormattedText(article.content, 'article')}
        </section>

        <div className="faq-explore-more">
          <h2 className="faq-explore-more-heading">Keep Exploring</h2>

          {article.relatedArticleSlugs && article.relatedArticleSlugs.length > 0 && (
            <section className="faq-explore-section">
              <h3 className="faq-explore-label">Related Articles</h3>
              <div className="related-metrics-list">
                {article.relatedArticleSlugs.map(relSlug => {
                  const relArticle = ALL_INSIGHT_ARTICLES.find(a => a.slug === relSlug);
                  if (!relArticle) return null;
                  const desc = article.relatedArticleDescriptions?.[relSlug];
                  return (
                    <NavigationLink
                      key={relSlug}
                      to={`/insights/${relArticle.categorySlug}/${relSlug}`}
                      state={{ from: 'insight-article', returnPath: `/insights/${categorySlug}/${articleSlug}` }}
                      className="related-item-card"
                      pageTitle={relArticle.title}
                    >
                      <div className="related-item-card-content">
                        <span className="related-item-card-name">{relArticle.title}</span>
                        {desc && <span className="related-item-card-desc">{desc}</span>}
                      </div>
                      <span className="related-item-card-arrow" aria-hidden="true">&rarr;</span>
                    </NavigationLink>
                  );
                })}
              </div>
            </section>
          )}

          {article.relatedFaqSlugs && article.relatedFaqSlugs.length > 0 && (
            <section className="faq-explore-section">
              <h3 className="faq-explore-label">Related FAQs</h3>
              <div className="faq-teasers-list">
                {article.relatedFaqSlugs.map(faqSlug => {
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

          {article.relatedMetrics && article.relatedMetrics.length > 0 && (
            <section className="faq-explore-section">
              <h3 className="faq-explore-label">Related Metrics</h3>
              <div className="related-metrics-list">
                {article.relatedMetrics.map(metricSlug => {
                  const metric = METRICS.find(m => m.slug === metricSlug);
                  if (!metric) return null;
                  const desc = article.relatedMetricDescriptions?.[metricSlug];
                  return (
                    <NavigationLink
                      key={metricSlug}
                      to={'/metrics/' + metricSlug}
                      state={{ from: 'insight-article', returnPath: `/insights/${categorySlug}/${articleSlug}` }}
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

          {article.relatedValuations && article.relatedValuations.length > 0 && (
            <section className="faq-explore-section">
              <h3 className="faq-explore-label">Related Valuation Methods</h3>
              <div className="related-metrics-list">
                {article.relatedValuations.map(valSlug => {
                  const val = VALUATION_METHODS.find(v => v.slug === valSlug);
                  if (!val) return null;
                  const desc = article.relatedValuationDescriptions?.[valSlug];
                  return (
                    <NavigationLink
                      key={valSlug}
                      to={'/valuation/' + valSlug}
                      state={{ from: 'insight-article', returnPath: `/insights/${categorySlug}/${articleSlug}` }}
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
          to={`/insights/${categorySlug}`}
          state={{ from: 'insight-article' }}
          className="btn btn-secondary"
          pageTitle={category.name}
        >
          ← {category.name}
        </NavigationLink>
        <NavigationLink
          to="/screener"
          state={{ from: 'insight-article' }}
          className="btn btn-primary"
          pageTitle="Screener"
        >
          Use Screener →
        </NavigationLink>
      </div>
    </div>
  );
}

export default InsightArticle;

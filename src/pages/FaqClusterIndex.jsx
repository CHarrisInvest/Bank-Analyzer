import React from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import NavigationLink from '../components/NavigationLink.jsx';
import { FAQ_CLUSTERS, FAQS } from '../data/content/faqs.js';

/**
 * FAQ Cluster Index Page
 * Lists all FAQ questions within a specific topic cluster
 */
function FaqClusterIndex() {
  const { clusterSlug } = useParams();

  const cluster = FAQ_CLUSTERS.find(c => c.slug === clusterSlug);
  const clusterFaqs = FAQS.filter(faq => faq.cluster === clusterSlug);

  // Note: Schema (FAQPage, BreadcrumbList) is provided by the prerender script
  // (scripts/prerender.mjs) in the static HTML for immediate crawler access.
  // Do NOT add a schema here to avoid duplicates.

  if (!cluster) {
    return (
      <div className="page faq-cluster-page">
        <div className="not-found">
          <h1>FAQ Cluster Not Found</h1>
          <p>No FAQ topic found with identifier "{clusterSlug}".</p>
          <Link to="/faq" className="btn btn-primary">View All FAQ Topics</Link>
        </div>
      </div>
    );
  }

  // Find adjacent clusters for navigation
  const clusterIndex = FAQ_CLUSTERS.findIndex(c => c.slug === clusterSlug);
  const prevCluster = clusterIndex > 0 ? FAQ_CLUSTERS[clusterIndex - 1] : null;
  const nextCluster = clusterIndex < FAQ_CLUSTERS.length - 1 ? FAQ_CLUSTERS[clusterIndex + 1] : null;

  return (
    <div className="page faq-cluster-page">
      <SEO
        title={cluster.name + ' | Bank Stock FAQ | BankSift'}
        description={'Frequently asked questions about ' + cluster.name.toLowerCase() + '. Clear, practical answers for bank stock investors from BankSift.'}
        canonical={'/faq/' + clusterSlug}
      />

      <nav className="breadcrumb">
        <Link to="/faq">FAQ</Link>
        <span className="separator">/</span>
        <span>{cluster.name}</span>
      </nav>

      <div className="page-header">
        <h1>{cluster.name}</h1>
      </div>

      <div className="faq-items">
        {clusterFaqs.map(faq => (
          <div key={faq.slug} className="faq-card">
            <Link to={'/faq/' + clusterSlug + '/' + faq.slug} className="faq-card-link">
              <h2 className="faq-card-question">{faq.question}</h2>
              <p className="faq-card-teaser">{faq.shortAnswer}</p>
            </Link>
          </div>
        ))}
      </div>

      <div className="page-navigation">
        {prevCluster ? (
          <NavigationLink
            to={'/faq/' + prevCluster.slug}
            state={{ from: 'faq-cluster' }}
            className="btn btn-secondary"
            pageTitle={prevCluster.name}
          >
            &larr; {prevCluster.name}
          </NavigationLink>
        ) : (
          <span />
        )}
        {nextCluster ? (
          <NavigationLink
            to={'/faq/' + nextCluster.slug}
            state={{ from: 'faq-cluster' }}
            className="btn btn-secondary"
            pageTitle={nextCluster.name}
          >
            {nextCluster.name} &rarr;
          </NavigationLink>
        ) : (
          <span />
        )}
      </div>
    </div>
  );
}

export default FaqClusterIndex;

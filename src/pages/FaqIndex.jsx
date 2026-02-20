import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import { FAQ_CLUSTERS, FAQS } from '../data/content/faqs.js';

/**
 * FAQ Index Page
 * Main FAQ landing page listing all topic clusters with question counts
 */
function FaqIndex() {
  // Note: Schema (FAQPage, BreadcrumbList) is provided by the prerender script
  // (scripts/prerender.mjs) in the static HTML for immediate crawler access.
  // Do NOT add a schema here to avoid duplicates.

  return (
    <div className="page faq-index-page">
      <SEO
        title="Bank Stock FAQ | Investment Questions Answered | BankSift"
        description="BankSift's FAQ covers bank stock metrics, valuation methods, screening strategies, financial statements, dividends, and more. Get clear, jargon-free answers to common bank investing questions."
        canonical="/faq"
      />

      <div className="page-header">
        <h1>Frequently Asked Questions</h1>
        <p>
          BankSift's educational FAQ is designed to help bank stock investors at every
          level. Whether you are just getting started with bank analysis or refining
          advanced screening strategies, these resources provide clear, practical answers
          grounded in publicly available financial data.
        </p>
        <p>
          Questions are organized by topic. Select any question to read the full answer.
        </p>
      </div>

      <div className="faq-clusters">
        {FAQ_CLUSTERS.map(cluster => {
          const clusterFaqs = FAQS.filter(faq => faq.cluster === cluster.slug);
          const questionCount = clusterFaqs.length;

          if (questionCount === 0) return null;

          return (
            <section key={cluster.slug} className="faq-cluster-section">
              <div className="faq-cluster-header">
                <h2>{cluster.name}</h2>
                <span className="faq-cluster-count">({questionCount} questions)</span>
              </div>
              <ul className="faq-question-list">
                {clusterFaqs.map(faq => (
                  <li key={faq.slug}>
                    <Link to={'/faq/' + faq.slug}>
                      {faq.question}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <div className="faq-cross-links">
        <Link to="/metrics" className="btn btn-secondary btn-lg">
          Metrics & Ratios
        </Link>
        <Link to="/valuation" className="btn btn-secondary btn-lg">
          Valuation Methods
        </Link>
        <Link to="/screener" className="btn btn-primary btn-lg">
          Open Screener
        </Link>
      </div>
    </div>
  );
}

export default FaqIndex;

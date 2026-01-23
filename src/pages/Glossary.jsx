import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import { METRICS } from '../data/content/metrics.js';
import { VALUATION_METHODS } from '../data/content/valuations.js';

/**
 * Glossary terms for bank financial analysis
 * Combines metrics, valuations, and additional terms
 */
const ADDITIONAL_TERMS = [
  {
    term: 'SEC EDGAR',
    definition: 'The Electronic Data Gathering, Analysis, and Retrieval system operated by the U.S. Securities and Exchange Commission. It provides free public access to corporate filings including 10-K annual reports and 10-Q quarterly reports.',
    category: 'data-sources',
  },
  {
    term: '10-K Filing',
    definition: 'An annual report required by the SEC that provides a comprehensive summary of a company\'s financial performance. It includes audited financial statements, management discussion, and risk factors.',
    category: 'data-sources',
  },
  {
    term: '10-Q Filing',
    definition: 'A quarterly report required by the SEC that provides unaudited financial statements and updates on a company\'s financial condition. Banks file 10-Q reports for Q1, Q2, and Q3 each year.',
    category: 'data-sources',
  },
  {
    term: 'Trailing Twelve Months (TTM)',
    definition: 'A financial measurement that sums the last four quarters of data to provide an up-to-date annual figure. TTM smooths out seasonal variations and provides more current data than the last fiscal year.',
    category: 'calculations',
  },
  {
    term: 'SIC Code',
    definition: 'Standard Industrial Classification code used to categorize companies by industry. Banks typically fall under SIC codes 6021 (National Commercial Banks), 6022 (State Commercial Banks), 6035-6036 (Savings Institutions).',
    category: 'data-sources',
  },
  {
    term: 'CIK Number',
    definition: 'Central Index Key - a unique identifier assigned by the SEC to each company and individual who files with the SEC. Used to look up filings in the EDGAR database.',
    category: 'data-sources',
  },
  {
    term: 'Tangible Book Value',
    definition: 'Total shareholders\' equity minus intangible assets and goodwill. Represents the theoretical value shareholders would receive if all tangible assets were liquidated and all liabilities paid.',
    category: 'valuation',
  },
  {
    term: 'Net Interest Income',
    definition: 'The difference between interest earned on assets (primarily loans) and interest paid on liabilities (primarily deposits). This is typically the largest revenue source for traditional banks.',
    category: 'income',
  },
  {
    term: 'Non-Interest Income',
    definition: 'Revenue from sources other than interest, including service charges, fees, trading gains, and investment income. Also called fee income.',
    category: 'income',
  },
  {
    term: 'Non-Interest Expense',
    definition: 'Operating expenses excluding interest expense. Includes salaries, occupancy costs, technology, marketing, and other administrative expenses.',
    category: 'expenses',
  },
  {
    term: 'Value Investing',
    definition: 'An investment strategy that involves buying securities that appear underpriced based on fundamental analysis. Popularized by Benjamin Graham and Warren Buffett.',
    category: 'strategy',
  },
  {
    term: 'Margin of Safety',
    definition: 'The difference between a security\'s intrinsic value and its market price. A key concept in value investing that provides a buffer against errors in valuation or unforeseen events.',
    category: 'strategy',
  },
  {
    term: 'Intrinsic Value',
    definition: 'The perceived or calculated true value of a company based on fundamental analysis, regardless of its current market price. Different valuation methods may produce different intrinsic values.',
    category: 'valuation',
  },
  {
    term: 'Market Capitalization',
    definition: 'The total market value of a company\'s outstanding shares, calculated as share price multiplied by shares outstanding. Used to classify companies as small-cap, mid-cap, or large-cap.',
    category: 'valuation',
  },
  {
    term: 'Shares Outstanding',
    definition: 'The total number of shares of a company\'s stock currently held by all shareholders, including institutional investors and company insiders.',
    category: 'per-share',
  },
];

/**
 * Glossary Page Component
 * Comprehensive financial terms glossary for bank analysis
 */
function Glossary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Combine all terms from metrics, valuations, and additional terms
  const allTerms = useMemo(() => {
    const metricTerms = METRICS.map(m => ({
      term: m.name,
      definition: m.shortDescription,
      fullDescription: m.description,
      category: m.category,
      link: `/metrics/${m.slug}`,
    }));

    const valuationTerms = VALUATION_METHODS.map(v => ({
      term: v.name,
      definition: v.shortDescription,
      fullDescription: v.description,
      category: 'valuation',
      link: `/valuation/${v.slug}`,
    }));

    const additionalTerms = ADDITIONAL_TERMS.map(t => ({
      ...t,
      link: null,
    }));

    return [...metricTerms, ...valuationTerms, ...additionalTerms].sort((a, b) =>
      a.term.localeCompare(b.term)
    );
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(allTerms.map(t => t.category));
    return ['all', ...Array.from(cats).sort()];
  }, [allTerms]);

  // Category labels
  const categoryLabels = {
    all: 'All Terms',
    profitability: 'Profitability',
    efficiency: 'Efficiency',
    capital: 'Capital & Leverage',
    valuation: 'Valuation',
    'per-share': 'Per-Share Metrics',
    'data-sources': 'Data Sources',
    calculations: 'Calculations',
    income: 'Income',
    expenses: 'Expenses',
    strategy: 'Investment Strategy',
  };

  // Filter terms based on search and category
  const filteredTerms = useMemo(() => {
    return allTerms.filter(t => {
      const matchesSearch = searchQuery === '' ||
        t.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.definition.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allTerms, searchQuery, selectedCategory]);

  // Generate JSON-LD schema for the glossary
  const glossarySchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    'name': 'BankSift Financial Glossary',
    'description': 'Comprehensive glossary of financial terms for bank stock analysis and value investing',
    'hasDefinedTerm': allTerms.slice(0, 50).map(t => ({
      '@type': 'DefinedTerm',
      'name': t.term,
      'description': t.definition,
    })),
  };

  return (
    <div className="page glossary-page">
      <SEO
        title="Financial Glossary - Bank Analysis Terms"
        description="Comprehensive glossary of financial terms for bank stock analysis. Learn definitions for ROE, efficiency ratio, Graham Number, and other key metrics used in bank valuation."
        canonical="/glossary"
        schema={glossarySchema}
      />

      <div className="page-header">
        <h1>Financial Glossary</h1>
        <p>
          Comprehensive definitions of financial terms, metrics, and concepts used in bank analysis.
          Click on any term with a link to learn more.
        </p>
      </div>

      <div className="glossary-filters">
        <div className="glossary-search">
          <input
            type="text"
            placeholder="Search terms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="glossary-search-input"
          />
        </div>
        <div className="glossary-categories">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {categoryLabels[cat] || cat}
            </button>
          ))}
        </div>
      </div>

      <div className="glossary-content">
        <p className="glossary-count">
          Showing {filteredTerms.length} of {allTerms.length} terms
        </p>

        <dl className="glossary-list">
          {filteredTerms.map((item, index) => (
            <div key={index} className="glossary-item">
              <dt className="glossary-term">
                {item.link ? (
                  <Link to={item.link}>{item.term}</Link>
                ) : (
                  item.term
                )}
              </dt>
              <dd className="glossary-definition">
                {item.definition}
                {item.link && (
                  <Link to={item.link} className="glossary-learn-more">
                    Learn more →
                  </Link>
                )}
              </dd>
            </div>
          ))}
        </dl>

        {filteredTerms.length === 0 && (
          <div className="glossary-empty">
            <p>No terms found matching your search.</p>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      <div className="glossary-footer">
        <h2>Using This Glossary</h2>
        <p>
          This glossary covers financial metrics and terms commonly used in bank stock analysis.
          Terms linked to detailed pages include formulas, interpretation guides, and typical
          ranges for banks. All data on BankSift is sourced from official SEC EDGAR filings.
        </p>
        <div className="glossary-cta">
          <Link to="/metrics" className="btn btn-secondary">
            Explore All Metrics
          </Link>
          <Link to="/screener" className="btn btn-primary">
            Use the Screener
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Glossary;

/**
 * Pre-render static HTML pages for SEO
 *
 * Generates static HTML files for all routes with proper meta tags,
 * Open Graph data, and JSON-LD schemas for search engine optimization.
 *
 * Run after vite build: node scripts/prerender.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');
const dataDir = join(__dirname, '..', 'public', 'data');
const srcDir = join(__dirname, '..', 'src');

const SITE_URL = 'https://banksift.org';
const SITE_NAME = 'BankSift';

// Read the built index.html as template
let template;
try {
  template = readFileSync(join(distDir, 'index.html'), 'utf-8');
} catch (e) {
  console.error('Error: Run "npm run build" first before pre-rendering.');
  process.exit(1);
}

/**
 * Import data dynamically
 */
async function loadData() {
  // Load metrics
  const metricsModule = await import(join(srcDir, 'data', 'content', 'metrics.js'));
  const metrics = metricsModule.METRICS;

  // Load valuations
  const valuationsModule = await import(join(srcDir, 'data', 'content', 'valuations.js'));
  const valuations = valuationsModule.VALUATION_METHODS;

  // Load banks
  let banks = [];
  const banksPath = join(dataDir, 'banks.json');
  if (existsSync(banksPath)) {
    banks = JSON.parse(readFileSync(banksPath, 'utf-8'));
  }

  return { metrics, valuations, banks };
}

/**
 * Create HTML for a route with proper SEO tags
 */
function createPage({ path, title, description, canonical, type = 'website', schema, content }) {
  let html = template;

  // Update title
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(title)}</title>`
  );

  // Update meta description
  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${escapeHtml(description)}"`
  );

  // Update canonical URL
  html = html.replace(
    /<link rel="canonical" href="[^"]*"/,
    `<link rel="canonical" href="${canonical}"`
  );

  // Update Open Graph tags
  html = html.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="${canonical}"`
  );
  html = html.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${escapeHtml(title)}"`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${escapeHtml(description)}"`
  );
  html = html.replace(
    /<meta property="og:type" content="[^"]*"/,
    `<meta property="og:type" content="${type}"`
  );

  // Update Twitter tags
  html = html.replace(
    /<meta name="twitter:url" content="[^"]*"/,
    `<meta name="twitter:url" content="${canonical}"`
  );
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"/,
    `<meta name="twitter:title" content="${escapeHtml(title)}"`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"/,
    `<meta name="twitter:description" content="${escapeHtml(description)}"`
  );

  // Add page-specific JSON-LD schema if provided
  if (schema) {
    const schemaScript = `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n    </script>`;
    // Insert before the closing </head>
    html = html.replace('</head>', `${schemaScript}\n  </head>`);
  }

  // Add SEO content for crawlers (hidden but indexable)
  if (content) {
    const seoContent = `
    <div id="seo-content" style="position:absolute;left:-9999px;top:-9999px;width:1px;height:1px;overflow:hidden;">
      ${content}
    </div>`;
    html = html.replace('<div id="root">', `${seoContent}\n    <div id="root">`);
  }

  return html;
}

/**
 * Write HTML file to dist directory
 */
function writePage(path, html) {
  const filePath = path === '/'
    ? join(distDir, 'index.html')
    : join(distDir, path, 'index.html');

  const dir = dirname(filePath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  writeFileSync(filePath, html);
  return filePath;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Generate all static pages
 */
async function generatePages() {
  const { metrics, valuations, banks } = await loadData();
  let count = 0;

  console.log('Pre-rendering pages for SEO...\n');

  // ============================================
  // STATIC PAGES
  // ============================================

  // Home page (already exists, but ensure proper tags)
  writePage('/', createPage({
    path: '/',
    title: 'BankSift - Bank Investment Tools',
    description: 'Sift through the noise. Screen and analyze 300+ publicly traded banks using comprehensive financial metrics from SEC filings. Free tools for value investors.',
    canonical: SITE_URL,
    content: `
      <h1>BankSift - Bank Investment Tools</h1>
      <p>Sift through the noise. Screen and analyze publicly traded banks.</p>
      <h2>Features</h2>
      <ul>
        <li>Bank Screener - Filter 300+ banks by 25+ metrics</li>
        <li>Graham Number Calculator</li>
        <li>Daily SEC data updates</li>
        <li>Comprehensive metrics education</li>
      </ul>
    `
  }));
  count++;

  // Screener page
  writePage('/screener', createPage({
    path: '/screener',
    title: 'Bank Screener - BankSift',
    description: 'Screen and filter 300+ publicly traded banks by ROE, ROAA, efficiency ratio, Graham Number, and 20+ other financial metrics. Free bank stock screener with daily SEC data.',
    canonical: `${SITE_URL}/screener`,
    type: 'website',
    schema: {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "BankSift Bank Screener",
      "alternateName": "The Sifter",
      "url": `${SITE_URL}/screener`,
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "Screen 300+ publicly traded banks",
        "Filter by 25+ financial metrics",
        "Graham Number calculations",
        "Daily SEC data updates"
      ]
    },
    content: `
      <h1>Bank Screener - The Sifter</h1>
      <p>Screen and filter publicly traded US banks using comprehensive financial metrics.</p>
      <h2>Available Filters</h2>
      <ul>
        <li>Return on Equity (ROE)</li>
        <li>Return on Average Assets (ROAA)</li>
        <li>Efficiency Ratio</li>
        <li>Graham Number</li>
        <li>Price to Book Ratio</li>
        <li>And 20+ more metrics</li>
      </ul>
    `
  }));
  count++;

  // Screener Guide
  writePage('/screener/guide', createPage({
    path: '/screener/guide',
    title: 'Bank Screener Guide - BankSift',
    description: 'Learn how to use the BankSift bank screener effectively. Tutorial on filtering banks by financial metrics, understanding results, and finding undervalued bank stocks.',
    canonical: `${SITE_URL}/screener/guide`,
    content: `
      <h1>Bank Screener Guide</h1>
      <p>Learn how to effectively use the BankSift bank screener to find investment opportunities.</p>
      <h2>Getting Started</h2>
      <p>The screener allows you to filter banks by various financial metrics to find those that match your investment criteria.</p>
    `
  }));
  count++;

  // Search page
  writePage('/search', createPage({
    path: '/search',
    title: 'Bank Search - BankSift',
    description: 'Search for specific banks by name, ticker symbol, or CIK number. Access detailed financial metrics and analysis for any publicly traded US bank.',
    canonical: `${SITE_URL}/search`,
    content: `
      <h1>Bank Search</h1>
      <p>Search for publicly traded US banks by name, ticker, or CIK number.</p>
    `
  }));
  count++;

  // Metrics index
  writePage('/metrics', createPage({
    path: '/metrics',
    title: 'Bank Financial Metrics Guide - BankSift',
    description: 'Comprehensive guide to bank financial metrics including ROE, ROAA, efficiency ratio, net interest margin, and more. Learn how to analyze bank stocks.',
    canonical: `${SITE_URL}/metrics`,
    content: `
      <h1>Bank Financial Metrics</h1>
      <p>Learn about the key financial metrics used to analyze bank stocks.</p>
      <h2>Profitability Metrics</h2>
      <ul>
        <li>Return on Equity (ROE)</li>
        <li>Return on Average Assets (ROAA)</li>
        <li>Net Interest Margin</li>
        <li>Efficiency Ratio</li>
      </ul>
    `
  }));
  count++;

  // Glossary
  writePage('/glossary', createPage({
    path: '/glossary',
    title: 'Bank Financial Terms Glossary - BankSift',
    description: 'Glossary of bank financial terms and definitions. Understand ROE, ROAA, efficiency ratio, Graham Number, and other key banking metrics.',
    canonical: `${SITE_URL}/glossary`,
    content: `
      <h1>Financial Terms Glossary</h1>
      <p>Definitions and explanations of key bank financial terms and metrics.</p>
    `
  }));
  count++;

  // Privacy
  writePage('/privacy', createPage({
    path: '/privacy',
    title: 'Privacy Policy - BankSift',
    description: 'BankSift privacy policy. Learn how we handle your data and protect your privacy.',
    canonical: `${SITE_URL}/privacy`,
    content: `<h1>Privacy Policy</h1><p>BankSift privacy policy and data handling practices.</p>`
  }));
  count++;

  // Terms
  writePage('/terms', createPage({
    path: '/terms',
    title: 'Terms of Service - BankSift',
    description: 'BankSift terms of service and usage conditions.',
    canonical: `${SITE_URL}/terms`,
    content: `<h1>Terms of Service</h1><p>BankSift terms and conditions of use.</p>`
  }));
  count++;

  console.log(`✓ Generated ${count} static pages`);

  // ============================================
  // METRIC PAGES
  // ============================================

  let metricCount = 0;
  for (const metric of metrics) {
    const path = `/metrics/${metric.slug}`;

    writePage(path, createPage({
      path,
      title: `${metric.name} - Bank Metric | BankSift`,
      description: `${metric.shortDescription} Learn how ${metric.name} is calculated and what values indicate for bank analysis.`,
      canonical: `${SITE_URL}${path}`,
      type: 'article',
      schema: {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": metric.name,
        "description": metric.shortDescription,
        "author": {
          "@type": "Organization",
          "name": "BankSift"
        },
        "publisher": {
          "@type": "Organization",
          "name": "BankSift",
          "url": SITE_URL
        }
      },
      content: `
        <article>
          <h1>${escapeHtml(metric.name)}</h1>
          <p><strong>Category:</strong> ${escapeHtml(metric.categoryLabel)}</p>
          <p>${escapeHtml(metric.description)}</p>
          <h2>Formula</h2>
          <p><code>${escapeHtml(metric.formula)}</code></p>
          <p>${escapeHtml(metric.formulaExplanation)}</p>
          <h2>Interpretation</h2>
          <p>${escapeHtml(metric.interpretation)}</p>
          <h2>Typical Range</h2>
          <p>${escapeHtml(metric.typicalRange)}</p>
        </article>
      `
    }));
    metricCount++;
  }
  console.log(`✓ Generated ${metricCount} metric pages`);

  // ============================================
  // VALUATION PAGES
  // ============================================

  let valuationCount = 0;
  for (const valuation of valuations) {
    const path = `/valuation/${valuation.slug}`;

    writePage(path, createPage({
      path,
      title: `${valuation.name} - Bank Valuation Method | BankSift`,
      description: `${valuation.shortDescription} Learn how to use ${valuation.name} to value bank stocks.`,
      canonical: `${SITE_URL}${path}`,
      type: 'article',
      schema: {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": valuation.name,
        "description": valuation.shortDescription,
        "author": {
          "@type": "Organization",
          "name": "BankSift"
        }
      },
      content: `
        <article>
          <h1>${escapeHtml(valuation.name)}</h1>
          <p><strong>Type:</strong> ${escapeHtml(valuation.type)}</p>
          <p>${escapeHtml(valuation.description)}</p>
          <h2>Formula</h2>
          <p><code>${escapeHtml(valuation.formula)}</code></p>
          <p>${escapeHtml(valuation.formulaExplanation)}</p>
          <h2>Example</h2>
          <p>${escapeHtml(valuation.example)}</p>
        </article>
      `
    }));
    valuationCount++;
  }
  console.log(`✓ Generated ${valuationCount} valuation pages`);

  // ============================================
  // BANK DETAIL PAGES
  // ============================================

  let bankCount = 0;
  for (const bank of banks) {
    const cik = bank.cik.replace(/^0+/, ''); // Remove leading zeros for URL
    const path = `/bank/${cik}`;
    const bankName = bank.bankName || 'Unknown Bank';
    const ticker = bank.ticker ? ` (${bank.ticker})` : '';

    // Build description with available metrics
    const descParts = [];
    if (bank.metrics?.roe != null) descParts.push(`ROE: ${bank.metrics.roe.toFixed(2)}%`);
    if (bank.metrics?.roaa != null) descParts.push(`ROAA: ${bank.metrics.roaa.toFixed(2)}%`);
    if (bank.metrics?.efficiencyRatio != null) descParts.push(`Efficiency: ${bank.metrics.efficiencyRatio.toFixed(1)}%`);

    const metricsDesc = descParts.length > 0 ? ` ${descParts.join(', ')}.` : '';

    writePage(path, createPage({
      path,
      title: `${bankName}${ticker} - Bank Analysis | BankSift`,
      description: `Financial analysis and metrics for ${bankName}${ticker}.${metricsDesc} View comprehensive SEC filing data and Graham Number valuation.`,
      canonical: `${SITE_URL}${path}`,
      type: 'article',
      schema: {
        "@context": "https://schema.org",
        "@type": "FinancialProduct",
        "name": bankName,
        "description": `Financial analysis for ${bankName}`,
        "provider": {
          "@type": "Corporation",
          "name": bankName,
          "tickerSymbol": bank.ticker || undefined
        }
      },
      content: `
        <article>
          <h1>${escapeHtml(bankName)}${escapeHtml(ticker)}</h1>
          <p>Comprehensive financial analysis based on SEC filings.</p>
          ${bank.metrics ? `
          <h2>Key Metrics</h2>
          <dl>
            ${bank.metrics.roe != null ? `<dt>Return on Equity (ROE)</dt><dd>${bank.metrics.roe.toFixed(2)}%</dd>` : ''}
            ${bank.metrics.roaa != null ? `<dt>Return on Average Assets (ROAA)</dt><dd>${bank.metrics.roaa.toFixed(2)}%</dd>` : ''}
            ${bank.metrics.efficiencyRatio != null ? `<dt>Efficiency Ratio</dt><dd>${bank.metrics.efficiencyRatio.toFixed(1)}%</dd>` : ''}
            ${bank.metrics.bookValuePerShare != null ? `<dt>Book Value Per Share</dt><dd>$${bank.metrics.bookValuePerShare.toFixed(2)}</dd>` : ''}
            ${bank.metrics.grahamNumber != null ? `<dt>Graham Number</dt><dd>$${bank.metrics.grahamNumber.toFixed(2)}</dd>` : ''}
          </dl>
          ` : ''}
          <h2>SEC Data</h2>
          <p>Data sourced from SEC EDGAR financial statement filings.</p>
        </article>
      `
    }));
    bankCount++;

    // Progress indicator for large number of banks
    if (bankCount % 50 === 0) {
      process.stdout.write(`  Processing banks: ${bankCount}/${banks.length}\r`);
    }
  }
  console.log(`✓ Generated ${bankCount} bank pages        `);

  // ============================================
  // SUMMARY
  // ============================================

  const total = count + metricCount + valuationCount + bankCount;
  console.log(`\n✅ Pre-rendering complete!`);
  console.log(`   Total pages: ${total}`);
  console.log(`   - Static pages: ${count}`);
  console.log(`   - Metric pages: ${metricCount}`);
  console.log(`   - Valuation pages: ${valuationCount}`);
  console.log(`   - Bank pages: ${bankCount}`);
}

// Run
generatePages().catch(err => {
  console.error('Pre-rendering failed:', err);
  process.exit(1);
});

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
const BUILD_DATE = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

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

  // Load FAQs
  const faqsModule = await import(join(srcDir, 'data', 'content', 'faqs.js'));
  const faqs = faqsModule.FAQS;
  const faqClusters = faqsModule.FAQ_CLUSTERS;

  // Load banks
  let banks = [];
  const banksPath = join(dataDir, 'banks.json');
  if (existsSync(banksPath)) {
    banks = JSON.parse(readFileSync(banksPath, 'utf-8'));
  }

  // Load bank keywords (alternate names for SEO)
  let bankKeywords = {};
  const keywordsPath = join(dataDir, 'bank-keywords.json');
  if (existsSync(keywordsPath)) {
    bankKeywords = JSON.parse(readFileSync(keywordsPath, 'utf-8'));
  }

  return { metrics, valuations, banks, bankKeywords, faqs, faqClusters };
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

  // Add article:modified_time meta tag for freshness signals
  const modifiedTimeMeta = `<meta property="article:modified_time" content="${BUILD_DATE}"`;
  // Insert before og:type or replace existing
  if (html.includes('article:modified_time')) {
    html = html.replace(
      /<meta property="article:modified_time" content="[^"]*"/,
      modifiedTimeMeta
    );
  } else {
    html = html.replace(
      /<meta property="og:type"/,
      `${modifiedTimeMeta} />\n    ${`<meta property="og:type"`}`
    );
  }

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
    const schemaScript = `<script type="application/ld+json" data-page-schema="true">\n${JSON.stringify(schema, null, 2)}\n    </script>`;
    // Insert before the closing </head>
    html = html.replace('</head>', `${schemaScript}\n  </head>`);
  }

  // Add SEO content as visible fallback content inside the root div
  // This content is visible to crawlers and users before React hydrates
  // React will replace this content when it mounts
  if (content) {
    const seoContent = `
      <nav id="seo-nav" class="seo-fallback" aria-label="Site navigation">
        <a href="${SITE_URL}/">BankSift</a> |
        <a href="${SITE_URL}/search">Bank Search</a> |
        <a href="${SITE_URL}/screener">Bank Screener</a> |
        <a href="${SITE_URL}/screener/guide">Screener Guide</a> |
        <a href="${SITE_URL}/metrics">Metrics &amp; Ratios</a> |
        <a href="${SITE_URL}/valuation">Valuation Methods</a> |
        <a href="${SITE_URL}/faq">FAQ</a> |
        <a href="${SITE_URL}/glossary">Glossary</a>
      </nav>
      <main id="seo-content" class="seo-fallback">
        ${content}
        <noscript>
          <p>This site works best with JavaScript enabled. Enable JavaScript for the full interactive experience.</p>
        </noscript>
      </main>
      <footer id="seo-footer" class="seo-fallback">
        <p>BankSift - Bank Investment Tools. Data sourced from SEC EDGAR filings.</p>
        <nav aria-label="Footer navigation">
          <a href="${SITE_URL}/search">Search</a> |
          <a href="${SITE_URL}/screener">Screener</a> |
          <a href="${SITE_URL}/metrics">Metrics</a> |
          <a href="${SITE_URL}/valuation">Valuation</a> |
          <a href="${SITE_URL}/faq">FAQ</a> |
          <a href="${SITE_URL}/glossary">Glossary</a> |
          <a href="${SITE_URL}/privacy">Privacy Policy</a> |
          <a href="${SITE_URL}/terms">Terms of Service</a>
        </nav>
      </footer>`;
    // Replace the loading fallback inside #seo-root with actual page content.
    // Only match the loading-fallback div itself (not the parent #seo-root closing tag).
    html = html.replace(
      /<div id="loading-fallback"[\s\S]*?<\/div>(?=\s*<\/div>)/,
      seoContent
    );
  }

  return html;
}

/**
 * Write HTML file to dist directory
 *
 * Creates both directory/index.html AND flat .html files for each page.
 * This ensures GitHub Pages can serve the content at clean URLs without
 * redirects. GitHub Pages clean URLs feature serves "screener.html" at
 * "/screener" directly (200), avoiding the redirect chain that occurs
 * when only "screener/index.html" exists (/screener → 301 → /screener/).
 */
function writePage(path, html) {
  // Home page: just dist/index.html
  if (path === '/') {
    writeFileSync(join(distDir, 'index.html'), html);
    return join(distDir, 'index.html');
  }

  // Sub-pages: create both formats
  // 1. dist/screener/index.html (serves /screener/ with trailing slash)
  const dirPath = join(distDir, path, 'index.html');
  const dir = dirname(dirPath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  writeFileSync(dirPath, html);

  // 2. dist/screener.html (serves /screener via GitHub Pages clean URLs, no redirect)
  const flatPath = join(distDir, `${path}.html`);
  const flatDir = dirname(flatPath);
  if (!existsSync(flatDir)) {
    mkdirSync(flatDir, { recursive: true });
  }
  writeFileSync(flatPath, html);

  return dirPath;
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
 * Create breadcrumb schema for a page
 * @param {Array} items - Array of {name, path} objects representing the breadcrumb trail
 */
function createBreadcrumbSchema(items) {
  return {
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.path ? `${SITE_URL}${item.path}` : SITE_URL
    }))
  };
}

/**
 * Generate all static pages
 */
async function generatePages() {
  const { metrics, valuations, banks, bankKeywords, faqs, faqClusters } = await loadData();
  let count = 0;

  // Cross-link mappings between metrics and valuation methods
  const METRIC_TO_VALUATIONS = {
    'roe': ['roe-pb-framework', 'peer-comparison', 'dividend-discount-model'],
    'roaa': ['peer-comparison'],
    'net-interest-margin': ['peer-comparison', 'dividend-discount-model'],
    'efficiency-ratio': ['peer-comparison'],
    'price-to-book': ['price-to-book-valuation', 'roe-pb-framework', 'margin-of-safety', 'graham-number'],
    'price-to-earnings': ['price-to-earnings-valuation', 'graham-number', 'margin-of-safety'],
    'earnings-per-share': ['graham-number', 'price-to-earnings-valuation', 'margin-of-safety'],
    'book-value-per-share': ['graham-number', 'price-to-book-valuation', 'roe-pb-framework', 'margin-of-safety'],
    'equity-to-assets': ['roe-pb-framework', 'peer-comparison'],
    'loans-to-deposits': ['peer-comparison'],
    'deposits-to-assets': ['peer-comparison'],
    'loans-to-assets': ['peer-comparison'],
    'dividend-payout-ratio': ['dividend-discount-model'],
  };
  const VALUATION_TO_METRICS = {
    'graham-number': ['earnings-per-share', 'book-value-per-share', 'price-to-book', 'price-to-earnings'],
    'margin-of-safety': ['price-to-book', 'price-to-earnings', 'earnings-per-share', 'book-value-per-share', 'roe'],
    'price-to-book-valuation': ['price-to-book', 'book-value-per-share', 'roe', 'equity-to-assets'],
    'price-to-earnings-valuation': ['price-to-earnings', 'earnings-per-share', 'roe', 'price-to-book'],
    'roe-pb-framework': ['roe', 'price-to-book', 'equity-to-assets', 'dividend-payout-ratio', 'roaa', 'book-value-per-share'],
    'dividend-discount-model': ['dividend-payout-ratio', 'roe', 'earnings-per-share', 'net-interest-margin'],
    'peer-comparison': ['roe', 'roaa', 'net-interest-margin', 'efficiency-ratio', 'price-to-book', 'price-to-earnings', 'equity-to-assets', 'loans-to-deposits', 'deposits-to-assets', 'loans-to-assets', 'dividend-payout-ratio'],
  };

  console.log('Pre-rendering pages for SEO...\n');

  // Build a list of all banks with tickers for use in the Search page,
  // sorted by total assets so the largest banks appear first
  const linkedBanks = banks
    .filter(b => b.ticker && b.totalAssets)
    .sort((a, b) => b.totalAssets - a.totalAssets);

  function generateBankLinksHtml(bankList) {
    return bankList.map(b => {
      return `<li><a href="${SITE_URL}/bank/${encodeURIComponent(b.ticker)}">${escapeHtml(b.bankName)} (${escapeHtml(b.ticker)})</a></li>`;
    }).join('\n            ');
  }

  // ============================================
  // STATIC PAGES
  // ============================================

  // Home page (already exists, but ensure proper tags)
  // Note: FAQPage schema is defined here in prerender so it is present in the
  // initial static HTML, making it immediately available to all crawlers without
  // requiring JavaScript execution. Home.jsx does NOT include its own schema to
  // avoid duplicate structured data after React hydration.
  writePage('/', createPage({
    path: '/',
    title: 'BankSift - Free Bank Stock Screener & Analysis Tools',
    description: 'Free bank stock screener and analysis platform. Screen and compare 300+ US bank stocks by ROE, P/B ratio, efficiency ratio, Graham Number, and 25+ financial metrics. SEC filing data updated daily. No sign up required.',
    canonical: `${SITE_URL}/`,
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is BankSift?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "BankSift is a free online bank stock analysis platform that lets investors screen, compare, and analyze over 300 publicly traded US bank stocks. It provides financial metrics like ROE, P/B ratio, efficiency ratio, and Graham Number, all sourced directly from SEC EDGAR filings and updated daily."
              }
            },
            {
              "@type": "Question",
              "name": "Which financial metrics can I track with BankSift?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "BankSift tracks over 25 metrics across profitability, efficiency, capital strength, valuation, and balance sheet composition for every bank in the dataset. These include ROE, ROAA, NIM, Efficiency Ratio, P/B, P/E, Graham Number, and many more. Learn more in our FAQ guide to the most important bank stock metrics."
              }
            },
            {
              "@type": "Question",
              "name": "How can I compare bank stocks efficiently?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Build a peer group of similarly sized banks using the screener's asset size filter, then compare profitability, efficiency, valuation, and capital metrics across the group by sorting on any column. Read our full guide to comparing bank stocks in the FAQ section."
              }
            },
            {
              "@type": "Question",
              "name": "Is BankSift free to use?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, BankSift is completely free to use. No account, sign up, or email is required. All tools including the bank stock screener, search, financial metrics guides, and valuation methods are available at no cost."
              }
            },
            {
              "@type": "Question",
              "name": "Where does BankSift get its data?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "All financial data on BankSift is sourced directly from the SEC EDGAR database, the official repository for US public company filings. The system automatically pulls the latest 10-K and 10-Q filings daily, calculates trailing twelve month (TTM) metrics, and derives key financial ratios for over 300 publicly traded banks."
              }
            },
            {
              "@type": "Question",
              "name": "How do I find the best bank stocks to analyze?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Start by defining your investment objective, then set screener filters that match. A quality screen might combine ROE above 10%, Efficiency Ratio below 60%, and Equity to Assets above 8%. See our FAQ for the full screening strategy for finding high-quality banks."
              }
            }
          ]
        }
      ]
    },
    content: `
      <h1>BankSift</h1>
      <p><strong>Bank Investment Tools</strong> — Sift through the noise.</p>
      <p>Screen and analyze publicly traded bank stocks using official SEC filing data. Compare banks by profitability, efficiency, valuation, and capital strength metrics — all updated daily. BankSift is a free bank stock screener and financial data dashboard designed for value investors who want to evaluate US bank stocks quickly and thoroughly.</p>
      <p><strong>No account. No sign up. No email required.</strong></p>
      <p><em>Screen. Analyze. Invest.</em></p>
      <h2>What You Can Do</h2>
      <ul>
        <li><a href="${SITE_URL}/screener">Bank Stock Screener</a> — Filter 300+ banks by 25+ financial metrics including ROE, ROAA, P/B ratio, efficiency ratio, and Graham Number. Rank banks by performance and compare bank profitability metrics side-by-side.</li>
        <li><a href="${SITE_URL}/search">Bank Search</a> — Find any publicly traded bank by name, ticker symbol, or CIK number. Access detailed financial profiles instantly.</li>
        <li><a href="${SITE_URL}/metrics">Financial Metrics Guide</a> — Learn how to calculate and interpret key bank financial ratios including ROE, P/B, efficiency ratios, and capital strength indicators.</li>
        <li><a href="${SITE_URL}/valuation">Valuation Methods</a> — Apply Graham Number, margin of safety, P/B valuation, dividend discount models, and peer comparison analysis to evaluate bank stock fair value.</li>
        <li><a href="${SITE_URL}/glossary">Glossary</a> — Definitions of bank financial terms and SEC filing concepts.</li>
        <li><a href="${SITE_URL}/faq">FAQ</a> — Answers to common questions about bank stock analysis, screening strategies, and valuation methods.</li>
      </ul>
      <h2>Reliable Data You Can Trust</h2>
      <ul>
        <li><strong>300+ Bank Stocks Tracked Today</strong> — Comprehensive coverage of publicly traded US bank stocks</li>
        <li><strong>Daily Data Updates</strong> — Bank stock data refreshed daily from the latest SEC filings</li>
        <li><strong>SEC Official Source</strong> — All data sourced directly from the SEC EDGAR database</li>
      </ul>
      <p>All financial data is sourced directly from the SEC EDGAR database. Our automated systems pull the latest 10-K and 10-Q filings daily, calculating trailing twelve month (TTM) metrics and key financial ratios for over 300 publicly traded US banks. Track bank KPIs and compare bank performance metrics with confidence.</p>
      <h2>Getting Started</h2>
      <ol>
        <li><strong>Choose Your Tool:</strong> Use the <a href="${SITE_URL}/screener">Screener</a> for filtering multiple bank stocks by criteria, or <a href="${SITE_URL}/search">Search</a> to find a specific bank stock quickly.</li>
        <li><strong>Apply Filters:</strong> Set your preferred ranges for metrics like <a href="${SITE_URL}/metrics/roe">ROE</a>, <a href="${SITE_URL}/metrics/efficiency-ratio">efficiency ratio</a>, <a href="${SITE_URL}/metrics/price-to-book">price multiples</a>, and more.</li>
        <li><strong>Analyze Results:</strong> Review detailed stock profiles, compare banks side-by-side, and dive into financial statements.</li>
      </ol>
      <p>New to bank stock analysis? Start with the <a href="${SITE_URL}/screener/guide">Screener Guide</a> to learn how to filter and evaluate bank stocks step by step.</p>

      <h3>Frequently Asked Questions</h3>
      <h4>What is BankSift?</h4>
      <p>BankSift is a free online bank stock analysis platform that lets investors screen, compare, and analyze over 300 publicly traded US bank stocks using financial metrics sourced from SEC EDGAR filings and updated daily.</p>
      <h4>Which financial metrics can I track with BankSift?</h4>
      <p>BankSift tracks over 25 bank-specific metrics across profitability, efficiency, capital strength, and valuation. <a href="${SITE_URL}/faq/getting-started/most-important-bank-stock-metrics">Read more →</a></p>
      <h4>How can I compare bank stocks efficiently?</h4>
      <p>Build a peer group of similar banks using the screener, then compare key metrics side-by-side. <a href="${SITE_URL}/faq/screening/how-to-compare-bank-stocks">Read more →</a></p>
      <h4>Is BankSift free to use?</h4>
      <p>Yes, BankSift is completely free to use. No account, sign up, or email is required. All tools including the bank stock screener, search, financial metrics guides, and valuation methods are available at no cost.</p>
      <h4>Where does BankSift get its data?</h4>
      <p>All financial data on BankSift is sourced directly from the SEC EDGAR database, the official repository for US public company filings. The system automatically pulls the latest 10-K and 10-Q filings daily, calculates trailing twelve month (TTM) metrics, and derives key financial ratios for over 300 publicly traded banks.</p>
      <h4>How do I find the best bank stocks to analyze?</h4>
      <p>Define your investment objective, then use screener filters like ROE, efficiency ratio, and capital strength to narrow the field. <a href="${SITE_URL}/faq/screening/filters-for-high-quality-banks">Read more →</a></p>
    `
  }));
  count++;

  // Screener page - optimized for "bank screener", "bank stock screener", "bank equity screener" keywords
  // Note: Schema (BreadcrumbList, WebApplication, FAQPage) is defined here in prerender so it is
  // present in the initial static HTML for immediate crawler access. ScreenerPage.jsx does NOT
  // include its own schema to avoid duplicate structured data after React hydration.
  writePage('/screener', createPage({
    path: '/screener',
    title: 'Free Bank Stock Screener | Filter & Compare Bank Stocks by 25+ Metrics - BankSift',
    description: 'Free online bank stock screener to filter, rank, and compare 300+ US bank stocks. Screen by ROE, P/B ratio, Graham Number, efficiency ratio, and 20+ financial metrics. Updated daily from SEC filings. No registration required.',
    canonical: `${SITE_URL}/screener`,
    type: 'website',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        createBreadcrumbSchema([
          { name: "Home", path: "" },
          { name: "Bank Screener", path: "/screener" }
        ]),
        {
          "@type": "WebApplication",
          "name": "BankSift Bank Stock Screener",
          "alternateName": ["Bank Screener", "Bank Equity Screener", "Bank Filter", "The Sifter"],
          "url": "https://banksift.org/screener",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Any",
          "browserRequirements": "Requires JavaScript",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "featureList": [
            "Screen 300+ publicly traded US bank stocks",
            "Filter banks by 25+ financial metrics",
            "Graham Number valuation calculations",
            "Daily updates from SEC EDGAR filings",
            "Free bank stock screener - no registration required",
            "Export and sort bank screening results"
          ],
          "description": "Free online bank stock screener for filtering and analyzing publicly traded US banks by financial metrics including ROE, ROAA, efficiency ratio, and Graham Number."
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is a bank stock screener?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A bank stock screener is a tool that filters publicly traded bank stocks based on financial metrics like ROE, P/B ratio, and efficiency ratio. It helps investors find bank stocks that match their investment criteria."
              }
            },
            {
              "@type": "Question",
              "name": "How do I screen for undervalued bank stocks?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Use the bank screener to filter by Price to Book ratio below 1.0, Graham Number above current price, and ROE above 10%. These metrics help identify potentially undervalued bank stocks with good fundamentals."
              }
            },
            {
              "@type": "Question",
              "name": "What metrics should I use to screen bank stocks?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Key metrics for screening bank stocks include Return on Equity (ROE), Return on Assets (ROAA), Efficiency Ratio, Net Interest Margin, Price to Book ratio, and the Graham Number for value investing."
              }
            },
            {
              "@type": "Question",
              "name": "Is this bank screener free to use?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, BankSift's bank stock screener is completely free. No registration required. Data is updated daily from SEC filings."
              }
            },
            {
              "@type": "Question",
              "name": "How do I filter banks by financial metrics?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Use the filter panel to set minimum and maximum values for any metric. For example, set ROE minimum to 10% and P/B maximum to 1.0x to find profitable banks trading below book value. Filtered columns automatically appear in your results table. You can combine multiple filters to narrow your search and sort results by any column."
              }
            },
            {
              "@type": "Question",
              "name": "Which metrics are most important when ranking banks?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The most important metrics for ranking banks are Return on Equity (ROE) for profitability, Efficiency Ratio for operational management, Price to Book (P/B) for valuation, and Equity to Assets for capital strength. For value investors, the Graham Number and margin of safety percentage help identify potentially undervalued bank stocks."
              }
            },
            {
              "@type": "Question",
              "name": "Can I compare multiple banks at once using BankSift?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. The screener displays all banks matching your filter criteria in a sortable table. You can compare banks side-by-side across 25+ metrics, customize which columns are visible, reorder columns by dragging, and export your filtered results to CSV for further analysis in a spreadsheet."
              }
            },
            {
              "@type": "Question",
              "name": "Does the screener show bank stock prices?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. The screener displays the current stock price for every bank alongside financial metrics. You can also view Price to Book, Price to Earnings, and market capitalization to put each bank's share price in context. Price data is updated daily."
              }
            }
          ]
        }
      ]
    },
    content: `
      <h1>Free Bank Stock Screener</h1>
      <p>Screen and filter 300+ publicly traded US bank stocks using comprehensive financial metrics. Our free bank equity screener helps value investors find undervalued bank stocks, rank banks by performance, and compare bank profitability metrics side-by-side.</p>

      <h2>Bank Screening Filters</h2>
      <p>Use our bank stock filter to screen and rank banks by:</p>
      <ul>
        <li><strong>Profitability:</strong> Return on Equity (ROE), Return on Assets (ROAA), Net Interest Margin</li>
        <li><strong>Valuation:</strong> Price to Book (P/B), Price to Earnings (P/E), Graham Number</li>
        <li><strong>Efficiency:</strong> Efficiency Ratio, Operating Leverage</li>
        <li><strong>Safety:</strong> Capital Ratios, Equity to Assets</li>
        <li><strong>Per Share:</strong> Earnings Per Share (EPS), Book Value Per Share (BVPS), Dividend Payout Ratio</li>
      </ul>

      <h2>Why Use a Bank Stock Screener?</h2>
      <p>Bank stocks require specialized analysis due to their unique financial structures. Our bank screener provides metrics specifically designed for bank analysis, unlike generic stock screeners. Filter banks by profitability metrics, compare bank valuations, and screen banks for investment using the same ratios professional analysts rely on.</p>

      <h2>Frequently Asked Questions</h2>
      <h3>What is a bank stock screener?</h3>
      <p>A bank stock screener is a financial screening tool that filters publicly traded bank stocks based on financial metrics like ROE, P/B ratio, and efficiency ratio. It helps investors find bank stocks that match their investment criteria.</p>

      <h3>How do I screen for undervalued bank stocks?</h3>
      <p>Use the bank screener to filter by Price to Book ratio below 1.0, Graham Number above current price, and ROE above 10%. These metrics help identify potentially undervalued bank stocks with good fundamentals.</p>

      <h3>What metrics should I use to screen bank stocks?</h3>
      <p>Key metrics for screening bank stocks include Return on Equity (ROE), Return on Assets (ROAA), Efficiency Ratio, Net Interest Margin, Price to Book ratio, and the Graham Number for value investing.</p>

      <h3>Is this bank screener free?</h3>
      <p>Yes, BankSift's bank stock screener is completely free with no registration required. Data is updated daily from SEC filings.</p>

      <h3>How do I filter banks by financial metrics?</h3>
      <p>Use the filter panel to set minimum and maximum values for any metric. For example, set ROE minimum to 10% and P/B maximum to 1.0x to find profitable banks trading below book value. Filtered columns automatically appear in your results table.</p>

      <h3>Which metrics are most important when ranking banks?</h3>
      <p>The most important metrics for ranking banks are Return on Equity (ROE) for profitability, Efficiency Ratio for operational management, Price to Book (P/B) for valuation, and Equity to Assets for capital strength.</p>

      <h3>Can I compare multiple banks at once using BankSift?</h3>
      <p>Yes. The screener displays all banks matching your filter criteria in a sortable table. You can compare banks side-by-side across 25+ metrics, customize which columns are visible, and export your filtered results to CSV.</p>

      <h3>Does the screener show bank stock prices?</h3>
      <p>Yes. The screener displays the current stock price for every bank alongside financial metrics. You can also view Price to Book, Price to Earnings, and market capitalization to put each bank's share price in context. Price data is updated daily.</p>
    `
  }));
  count++;

  // Screener Guide
  // Note: Schema (BreadcrumbList, HowTo, FAQPage) is defined here in prerender so it is
  // present in the initial static HTML for immediate crawler access. ScreenerGuide.jsx does NOT
  // include its own schema to avoid duplicate structured data after React hydration.
  writePage('/screener/guide', createPage({
    path: '/screener/guide',
    title: 'How to Screen Bank Stocks: Complete Guide | BankSift',
    description: 'Learn how to screen bank stocks using ROE, P/B ratio, efficiency ratio, and Graham Number. Step-by-step guide to finding undervalued bank stocks.',
    canonical: `${SITE_URL}/screener/guide`,
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        createBreadcrumbSchema([
          { name: "Home", path: "" },
          { name: "Bank Screener", path: "/screener" },
          { name: "Guide", path: "/screener/guide" }
        ]),
        {
          "@type": "HowTo",
          "name": "How to Screen Bank Stocks",
          "description": "Step-by-step guide to using the BankSift bank stock screener to find investment opportunities.",
          "step": [
            { "@type": "HowToStep", "name": "Set Your Criteria", "text": "Use the filters panel to set minimum and maximum values for metrics like ROE, P/B ratio, and efficiency ratio." },
            { "@type": "HowToStep", "name": "Review Results", "text": "Examine the filtered results table. Click column headers to sort by any metric." },
            { "@type": "HowToStep", "name": "Analyze Banks", "text": "Click on any ticker to view detailed financial analysis for that bank." },
            { "@type": "HowToStep", "name": "Export Data", "text": "Use the Export CSV button to download your filtered results for further analysis." }
          ]
        },
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How often is the bank data updated?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "BankSift data is refreshed daily at approximately 3 AM UTC. We pull the latest SEC EDGAR filings and recalculate all metrics automatically."
              }
            },
            {
              "@type": "Question",
              "name": "Where does the financial data come from?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "All financial data comes directly from SEC EDGAR filings, specifically 10-K (annual) and 10-Q (quarterly) reports. This is the same official data source used by professional investors and analysts."
              }
            },
            {
              "@type": "Question",
              "name": "What is the Graham Number?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The Graham Number is a value investing metric developed by Benjamin Graham. It estimates the maximum fair price for a stock using the formula: √(22.5 × EPS × Book Value Per Share). Stocks trading below their Graham Number may be undervalued."
              }
            },
            {
              "@type": "Question",
              "name": "How many banks does BankSift track?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "BankSift tracks over 300 publicly traded banks that file with the SEC under bank-related SIC codes. This includes national commercial banks, state commercial banks, and savings institutions."
              }
            },
            {
              "@type": "Question",
              "name": "What does TTM mean?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "TTM stands for Trailing Twelve Months. It represents the sum of the last four quarters of data, providing an up-to-date annual figure that smooths out seasonal variations."
              }
            },
            {
              "@type": "Question",
              "name": "Is BankSift free to use?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, BankSift is completely free to use. We provide professional-grade bank screening tools without requiring registration or payment."
              }
            },
            {
              "@type": "Question",
              "name": "Can I export screener results?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, click the \"Export CSV\" button above the results table to download your filtered results as a CSV file. The export includes all visible columns in your current column order."
              }
            },
            {
              "@type": "Question",
              "name": "How do I find undervalued bank stocks?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Use the Value Screening strategy: filter for Price to Book below 1.0, ROE above 8%, and Graham Margin of Safety above 20%. These criteria help identify banks trading below their intrinsic value with solid fundamentals."
              }
            }
          ]
        }
      ]
    },
    content: `
      <h1>Bank Screener Guide</h1>
      <p>Learn how to use the BankSift screener to find bank stock investment opportunities.</p>

      <h2>How to Use the Screener</h2>
      <ol>
        <li><strong>Set Your Filter Criteria:</strong> Use the filters panel to set minimum and maximum values for metrics like ROE, P/B ratio, and efficiency ratio.</li>
        <li><strong>Review and Sort Results:</strong> Examine the filtered results table. Click column headers to sort by any metric.</li>
        <li><strong>Analyze Individual Banks:</strong> Click any ticker symbol to view detailed financial analysis for that bank.</li>
        <li><strong>Export Your Results:</strong> Click Export CSV to download your filtered results for further analysis.</li>
      </ol>

      <h2>Screener Features</h2>
      <ul>
        <li><strong>Export to CSV:</strong> Download filtered results with all visible columns</li>
        <li><strong>Column Customization:</strong> Show/hide columns, drag to reorder</li>
        <li><strong>Smart Column Display:</strong> Filtered columns auto-display in results</li>
        <li><strong>Keyboard Navigation:</strong> Arrow keys, Page Up/Down, Home/End</li>
      </ul>

      <h2>Key Metrics</h2>
      <ul>
        <li><strong>ROE (Return on Equity):</strong> Profitability measure, typically 8-15% for banks</li>
        <li><strong>P/B (Price to Book):</strong> Valuation metric, below 1.0 may indicate undervaluation</li>
        <li><strong>Efficiency Ratio:</strong> Operating efficiency, lower is better (under 60% is good)</li>
        <li><strong>Graham Number:</strong> Value investing intrinsic value estimate</li>
      </ul>

      <h2>Screening Strategies</h2>
      <h3>Value Screening</h3>
      <p>Find undervalued banks: P/B 0.5-1.0, ROE above 8%, Graham MoS above 20%</p>

      <h3>Quality Screening</h3>
      <p>Find well-managed banks: ROE above 12%, Efficiency below 60%, Equity/Assets above 10%</p>

      <h3>Dividend Income Screening</h3>
      <p>Find dividend-paying banks: Payout 20-50%, ROE above 10%, Assets above $1B</p>
    `
  }));
  count++;

  // Search page
  writePage('/search', createPage({
    path: '/search',
    title: 'Search US Bank Stocks by Ticker or Name - BankSift',
    description: 'Search and find any publicly traded US bank by ticker symbol, name, or CIK number. Access detailed financial metrics including ROE, efficiency ratio, P/B ratio, and more. Look up bank stock performance data sourced from SEC filings.',
    canonical: `${SITE_URL}/search`,
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        createBreadcrumbSchema([
          { name: "Home", path: "" },
          { name: "Bank Search", path: "/search" }
        ]),
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How do I search for a bank by ticker?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Type the ticker symbol (such as JPM, BAC, or WFC) into the search bar. The search returns instant results as you type, matching ticker symbols that start with your query. Exact ticker matches are displayed first, followed by partial matches sorted alphabetically."
              }
            },
            {
              "@type": "Question",
              "name": "Which metrics are displayed in the search results?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Search results display each bank's ticker symbol, exchange, full name, total assets, Return on Equity (ROE), and efficiency ratio. Click any result to access the full financial profile including 25+ metrics, balance sheet data, income statements, and valuation calculations."
              }
            },
            {
              "@type": "Question",
              "name": "Can I track multiple banks using this tool?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The search tool saves your recent searches for quick access. You can also use the Bank Screener to filter and compare multiple banks simultaneously across 25+ financial metrics, with options to sort, customize columns, and export results to CSV."
              }
            },
            {
              "@type": "Question",
              "name": "How do I find a bank by CIK number?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Enter the bank's CIK (Central Index Key) number in the search bar. CIK is a unique identifier assigned by the SEC to each filing entity. The search matches CIK numbers that start with your query, making it easy to look up banks using their SEC identifier."
              }
            }
          ]
        }
      ]
    },
    content: `
      <h1>Search US Bank Stocks</h1>
      <p>Find any publicly traded US bank by name, ticker symbol, or CIK number. Access detailed financial profiles with metrics like ROE, ROAA, efficiency ratio, Price to Book, and Graham Number — all sourced from SEC filings and updated daily. Use this bank stock lookup tool to track bank stock performance and find bank valuation metrics instantly.</p>
      <h2>Search by Ticker or Name</h2>
      <p>Type a ticker symbol (e.g., JPM, BAC, WFC) or bank name to find detailed financial analysis. Each bank profile includes profitability ratios, valuation metrics, capital strength indicators, and balance sheet data. Search US bank financial ratios and look up bank efficiency and profitability in seconds.</p>
      <h2>Browse Banks</h2>
      <p>Use the <a href="${SITE_URL}/screener">Bank Screener</a> to filter and compare 300+ banks by financial criteria, or browse banks directly:</p>
      <ul>
        ${generateBankLinksHtml(linkedBanks)}
      </ul>

      <h3>Frequently Asked Questions</h3>
      <h4>How do I search for a bank by ticker?</h4>
      <p>Type the ticker symbol into the search bar. The search returns instant results as you type, matching ticker symbols that start with your query. Exact ticker matches are displayed first.</p>
      <h4>Which metrics are displayed in the search results?</h4>
      <p>Search results display each bank's ticker symbol, exchange, full name, total assets, Return on Equity (ROE), and efficiency ratio. Click any result to access the full financial profile.</p>
      <h4>Can I track multiple banks using this tool?</h4>
      <p>The search tool saves your recent searches for quick access. You can also use the Bank Screener to filter and compare multiple banks simultaneously across 25+ financial metrics.</p>
    `
  }));
  count++;

  // Metrics index - optimized for "bank financial metrics", "bank ratios", "bank analysis metrics"
  // Note: Schema (BreadcrumbList, FAQPage, ItemList) is defined here in prerender so it is
  // present in the initial static HTML for immediate crawler access. MetricsIndex.jsx does NOT
  // include its own schema to avoid duplicate structured data after React hydration.
  writePage('/metrics', createPage({
    path: '/metrics',
    title: 'Bank Financial Metrics Explained | ROE, ROAA, Efficiency Ratio Guide - BankSift',
    description: 'Free guide to bank financial ratios and metrics. Learn how to calculate and interpret ROE, ROAA, efficiency ratio, P/B ratio, net interest margin, and 10+ key ratios used to analyze and compare US bank stocks.',
    canonical: `${SITE_URL}/metrics`,
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        createBreadcrumbSchema([
          { name: "Home", path: "" },
          { name: "Financial Metrics", path: "/metrics" }
        ]),
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What financial metrics are important for analyzing banks?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Key financial metrics for analyzing banks include Return on Equity (ROE), Return on Average Assets (ROAA), Net Interest Margin (NIM), Efficiency Ratio, Equity to Assets ratio, and Price to Book (P/B) ratio. These metrics measure profitability, operational efficiency, capital strength, and valuation."
              }
            },
            {
              "@type": "Question",
              "name": "How do you measure bank profitability?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Bank profitability is measured primarily through Return on Equity (ROE), Return on Average Assets (ROAA), and Net Interest Margin (NIM). ROE shows how effectively a bank generates profit from shareholder equity (good: above 10%). ROAA measures profit relative to total assets (good: above 1.0%). NIM measures the spread between interest earned and paid (good: above 3.5%)."
              }
            },
            {
              "@type": "Question",
              "name": "What is a good ROE for a bank?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A good Return on Equity (ROE) for banks is typically 10% to 15%. ROE above 10-12% indicates strong profitability and efficient capital use. Top-performing banks may exceed 15%. ROE below 6-8% may indicate weak profitability or operational challenges. Always compare ROE within peer groups of similar-sized banks."
              }
            },
            {
              "@type": "Question",
              "name": "What efficiency ratio is good for banks?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "An efficiency ratio below 55% is considered excellent for banks, meaning the bank spends less than 55 cents to generate each dollar of revenue. Ratios between 50-60% indicate well-managed operations. Ratios above 65-70% may suggest cost control challenges. The efficiency ratio measures operating expenses as a percentage of total revenue."
              }
            },
            {
              "@type": "Question",
              "name": "How do I compare banks using financial ratios?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "To compare banks effectively, evaluate them across multiple metric categories: profitability (ROE, ROAA, NIM), efficiency (efficiency ratio), capital strength (equity to assets), and valuation (P/B, P/E). Always compare within peer groups of similar-sized banks, as community banks and large money-center banks have different typical ranges. Use the BankSift screener to filter and rank banks across all these metrics simultaneously."
              }
            },
            {
              "@type": "Question",
              "name": "What is Net Interest Margin and why does it matter for banks?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Net Interest Margin (NIM) measures the difference between interest income earned on loans and investments versus interest paid on deposits and borrowings, expressed as a percentage of average earning assets. A healthy NIM (typically 3.0% to 4.0% for US banks) indicates the bank is earning a good spread on its lending activities, which is the primary revenue driver for most banks."
              }
            },
            {
              "@type": "Question",
              "name": "What is the difference between ROE and ROAA for banks?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "ROE (Return on Equity) measures how effectively a bank generates profit from shareholder equity, with a good benchmark being above 10%. ROAA (Return on Average Assets) measures how efficiently a bank uses its total assets to generate earnings, with a good benchmark being above 1.0%. ROE is influenced by leverage — a bank can boost ROE by using more debt — while ROAA provides a leverage-neutral view of operating performance."
              }
            }
          ]
        },
        {
          "@type": "ItemList",
          "name": "Bank Financial Metric Categories",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Profitability Ratios", "url": "${SITE_URL}/metrics#profitability" },
            { "@type": "ListItem", "position": 2, "name": "Efficiency Ratios", "url": "${SITE_URL}/metrics#efficiency" },
            { "@type": "ListItem", "position": 3, "name": "Capital & Leverage Ratios", "url": "${SITE_URL}/metrics#capital" },
            { "@type": "ListItem", "position": 4, "name": "Valuation Metrics", "url": "${SITE_URL}/metrics#valuation" },
            { "@type": "ListItem", "position": 5, "name": "Per Share Metrics", "url": "${SITE_URL}/metrics#per-share" }
          ]
        }
      ]
    },
    content: `
      <h1>Bank Financial Metrics &amp; Ratios</h1>
      <p>Understanding financial metrics is essential for analyzing banks effectively. Banks operate differently from most companies — they earn money primarily by borrowing (deposits) and lending at higher rates. The ratios below are specifically relevant to evaluating bank performance, risk, and value.</p>

      <h2>Where to Start</h2>
      <p>If you are new to bank analysis, these four core metrics provide a well-rounded view of any bank:</p>
      <ul>
        <li><a href="${SITE_URL}/metrics/roe">ROE (Return on Equity)</a> — Is the bank profitable?</li>
        <li><a href="${SITE_URL}/metrics/efficiency-ratio">Efficiency Ratio</a> — Is it well-managed?</li>
        <li><a href="${SITE_URL}/metrics/price-to-book">Price to Book</a> — Is the stock fairly valued?</li>
        <li><a href="${SITE_URL}/metrics/equity-to-assets">Equity to Assets</a> — Is the bank financially strong?</li>
      </ul>
      <p>For a practical walkthrough, see the <a href="${SITE_URL}/screener/guide">Screener Guide</a>.</p>

      <h2>Profitability Ratios</h2>
      <p>Profitability is the foundation of bank analysis. These ratios measure how effectively a bank converts its resources into earnings.</p>
      <ul>
        <li><a href="${SITE_URL}/metrics/roe">Return on Equity (ROE)</a> — Measures profit from shareholder equity. Typical: 8%–15%.</li>
        <li><a href="${SITE_URL}/metrics/roaa">Return on Average Assets (ROAA)</a> — Measures asset utilization efficiency. Typical: 0.8%–1.5%.</li>
        <li><a href="${SITE_URL}/metrics/net-interest-margin">Net Interest Margin (NIM)</a> — Measures lending spread profitability. Typical: 3.0%–4.0%.</li>
      </ul>

      <h2>Efficiency Ratios</h2>
      <p>Efficiency ratios reveal how well a bank manages its operations and funding sources.</p>
      <ul>
        <li><a href="${SITE_URL}/metrics/efficiency-ratio">Efficiency Ratio</a> — Operating cost management. Typical: 50%–60%.</li>
        <li><a href="${SITE_URL}/metrics/deposits-to-assets">Deposits to Assets</a> — Deposit funding stability. Typical: 70%–90%.</li>
        <li><a href="${SITE_URL}/metrics/loans-to-deposits">Loans to Deposits</a> — Lending vs. liquidity balance. Typical: 70%–90%.</li>
      </ul>

      <h2>Capital &amp; Leverage Ratios</h2>
      <p>Capital ratios measure a bank's financial strength and its ability to absorb unexpected losses.</p>
      <ul>
        <li><a href="${SITE_URL}/metrics/equity-to-assets">Equity to Assets</a> — Capital cushion strength. Typical: 8%–12%.</li>
        <li><a href="${SITE_URL}/metrics/loans-to-assets">Loans to Assets</a> — Loan concentration level. Typical: 60%–75%.</li>
      </ul>

      <h2>Valuation Metrics</h2>
      <p>Banks are valued differently from most companies. Price to Book is the primary valuation metric because bank assets are mostly financial instruments carried near fair value.</p>
      <ul>
        <li><a href="${SITE_URL}/metrics/book-value-per-share">Book Value Per Share (BVPS)</a> — Net asset value per share.</li>
        <li><a href="${SITE_URL}/metrics/price-to-earnings">Price to Earnings (P/E)</a> — Earnings valuation multiple. Typical: 8x–15x.</li>
        <li><a href="${SITE_URL}/metrics/price-to-book">Price to Book (P/B)</a> — Price vs. book value. Typical: 0.8x–2.0x.</li>
      </ul>

      <h2>Per Share Metrics</h2>
      <p>Per-share metrics translate total bank performance into figures relevant to individual shareholders.</p>
      <ul>
        <li><a href="${SITE_URL}/metrics/earnings-per-share">Earnings Per Share (EPS)</a> — Per-share profitability.</li>
        <li><a href="${SITE_URL}/metrics/dividend-payout-ratio">Dividend Payout Ratio</a> — Dividend sustainability. Typical: 25%–50%.</li>
      </ul>

      <h2>Quick Reference</h2>
      <table>
        <thead><tr><th>Metric</th><th>Generally Favorable</th><th>Potential Concern</th><th>What It Measures</th></tr></thead>
        <tbody>
          <tr><td>ROE</td><td>&gt; 10%</td><td>&lt; 6%</td><td>Profit from shareholder equity</td></tr>
          <tr><td>ROAA</td><td>&gt; 1.0%</td><td>&lt; 0.7%</td><td>Asset utilization efficiency</td></tr>
          <tr><td>NIM</td><td>&gt; 3.5%</td><td>&lt; 2.5%</td><td>Lending spread profitability</td></tr>
          <tr><td>Efficiency Ratio</td><td>&lt; 55%</td><td>&gt; 70%</td><td>Operating cost management</td></tr>
          <tr><td>P/B Ratio</td><td>&lt; 1.0x</td><td>&gt; 2.0x</td><td>Price vs. book value</td></tr>
          <tr><td>P/E Ratio</td><td>Low vs. peers</td><td>Very high</td><td>Earnings valuation multiple</td></tr>
        </tbody>
      </table>
    `
  }));
  count++;

  // Valuation index
  writePage('/valuation', createPage({
    path: '/valuation',
    title: 'Bank Valuation Methods Guide | P/B, Graham Number, P/E & More - BankSift',
    description: 'Learn how to value bank stocks using Graham Number, margin of safety, P/B ratio, P/E ratio, dividend discount model, and peer comparison analysis. Free guide to bank stock valuation techniques for investors.',
    canonical: `${SITE_URL}/valuation`,
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        createBreadcrumbSchema([
          { name: "Home", path: "" },
          { name: "Valuation Methods", path: "/valuation" }
        ]),
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "How do I value bank stocks using P/B ratio?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Price to Book (P/B) ratio is the primary valuation metric for banks because bank assets are mostly financial instruments carried near fair value. A P/B below 1.0 may indicate undervaluation if fundamentals are solid (ROE above 8%). Compare P/B across similar banks and consider the bank's ROE — higher ROE banks deserve higher P/B multiples."
              }
            },
            {
              "@type": "Question",
              "name": "What is the Graham Number in bank valuation?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The Graham Number is a value investing formula created by Benjamin Graham that estimates the maximum fair price for a stock. It is calculated as the square root of (22.5 × Earnings Per Share × Book Value Per Share). For banks, the Graham Number provides a conservative intrinsic value estimate."
              }
            },
            {
              "@type": "Question",
              "name": "Which valuation methods are best for banks?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The best valuation methods for banks include Price to Book (P/B) valuation as the primary approach, complemented by Price to Earnings (P/E) for earnings power assessment. The Graham Number and margin of safety calculations help identify undervalued banks. The Dividend Discount Model works well for dividend-paying banks. Peer comparison analysis benchmarks against similar institutions."
              }
            },
            {
              "@type": "Question",
              "name": "Why is bank valuation different from other companies?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Banks operate fundamentally differently from industrial companies. Their primary business is borrowing money (deposits) and lending it at higher rates. Traditional valuation metrics like EV/EBITDA are not applicable because debt is an operating asset for banks. Instead, analysts focus on book value, earnings quality, regulatory capital ratios, and interest rate sensitivity."
              }
            },
            {
              "@type": "Question",
              "name": "How do I use margin of safety when investing in bank stocks?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Margin of safety is the discount between a bank stock's estimated intrinsic value and its current market price. Calculate intrinsic value using the Graham Number or other methods, then compare it to the stock price. A margin of safety of 20% or more provides a buffer against analytical errors."
              }
            }
          ]
        }
      ]
    },
    content: `
      <h1>Bank Valuation Methods</h1>
      <p>Bank valuation requires specialized approaches due to the unique nature of financial institutions. This guide covers various methodologies used to assess the intrinsic value of bank stocks, helping investors evaluate banks using P/B ratio, Graham Number, P/E ratio, and other proven bank stock valuation techniques.</p>

      <h2>Why Bank Valuation is Different</h2>
      <p>Banks operate differently from typical industrial companies. Their primary business involves borrowing money (deposits) and lending it out at higher rates. This means traditional valuation metrics like EV/EBITDA are not applicable. Instead, bank analysts focus on book value, earnings quality, and regulatory capital measures. Understanding these differences is essential for anyone seeking to compare bank valuations and evaluate banks using P/E and P/B ratios.</p>

      <h2>Intrinsic Value Methods</h2>
      <ul>
        <li><a href="${SITE_URL}/valuation/graham-number">Graham Number</a> — Benjamin Graham's formula for estimating the maximum fair price based on earnings per share and book value per share. A foundational tool for bank stock valuation.</li>
        <li><a href="${SITE_URL}/valuation/margin-of-safety">Margin of Safety</a> — The discount between intrinsic value and purchase price that provides a buffer against analytical errors.</li>
        <li><a href="${SITE_URL}/valuation/dividend-discount-model">Dividend Discount Model</a> — Values a bank based on the present value of expected future dividend payments.</li>
      </ul>
      <h2>Relative Valuation Methods</h2>
      <ul>
        <li><a href="${SITE_URL}/valuation/price-to-book-valuation">Price to Book Valuation</a> — The primary valuation method for banks, comparing market price to accounting book value. Essential for bank stock pricing analysis.</li>
        <li><a href="${SITE_URL}/valuation/price-to-earnings-valuation">Price to Earnings Valuation</a> — Compares a bank's stock price to its per-share earnings to assess how the market values earning power.</li>
        <li><a href="${SITE_URL}/valuation/peer-comparison">Peer Comparison Analysis</a> — Valuing a bank by comparing its metrics and multiples to similar banks.</li>
      </ul>
      <h2>Fundamental Frameworks</h2>
      <ul>
        <li><a href="${SITE_URL}/valuation/roe-pb-framework">ROE-P/B Valuation Framework</a> — Links the justified Price to Book multiple to a bank's Return on Equity, identifying mispriced bank stocks.</li>
      </ul>

      <h2>General Valuation Framework</h2>
      <ol>
        <li><strong>Assess Quality:</strong> Evaluate the bank's asset quality, management effectiveness, earnings consistency, and regulatory standing.</li>
        <li><strong>Analyze Profitability:</strong> Examine return metrics (<a href="${SITE_URL}/metrics/roe">ROE</a>, <a href="${SITE_URL}/metrics/roaa">ROAA</a>), <a href="${SITE_URL}/metrics/efficiency-ratio">efficiency ratios</a>, and <a href="${SITE_URL}/metrics/net-interest-margin">net interest margins</a> relative to peers.</li>
        <li><strong>Apply Valuation Metrics:</strong> Use appropriate multiples (<a href="${SITE_URL}/metrics/price-to-book">P/B</a>, <a href="${SITE_URL}/metrics/price-to-earnings">P/E</a>) and intrinsic value methods based on the bank's characteristics.</li>
        <li><strong>Compare to Peers:</strong> Benchmark against similar banks in terms of size, geography, business model, and risk profile.</li>
      </ol>

      <h2>Important Cautions</h2>
      <ul>
        <li><strong>Book Value Adjustments:</strong> Reported book value may not reflect true economic value due to loan loss provisions, held-to-maturity securities, and other accounting treatments.</li>
        <li><strong>Interest Rate Sensitivity:</strong> Bank valuations are heavily influenced by interest rate expectations. Rising rates generally help net interest margins but can hurt bond portfolios.</li>
        <li><strong>Credit Cycle Timing:</strong> Bank earnings are cyclical. Valuations should account for where we are in the credit cycle.</li>
        <li><strong>Regulatory Changes:</strong> Banks operate in a heavily regulated environment. New regulations can significantly impact profitability.</li>
      </ul>

      <h3>Frequently Asked Questions</h3>
      <h4>How do I value bank stocks using P/B ratio?</h4>
      <p>P/B is the primary valuation metric for banks because their assets are mostly financial instruments carried near fair value. <a href="${SITE_URL}/faq/valuation/what-is-a-good-pb-for-banks">Read more →</a></p>
      <h4>What is the Graham Number in bank valuation?</h4>
      <p>The Graham Number estimates a maximum fair price for a stock based on its EPS and book value per share. <a href="${SITE_URL}/faq/valuation/graham-number-for-bank-stocks">Read more →</a></p>
      <h4>Which valuation methods are best for banks?</h4>
      <p>Bank valuation requires specialized approaches built around book value, earnings, and profitability frameworks. <a href="${SITE_URL}/faq/valuation/why-bank-valuation-is-different">Read more →</a></p>

      <p>Use the <a href="${SITE_URL}/screener">Bank Screener</a> to find banks that meet your valuation criteria across 300+ publicly traded US banks.</p>
    `
  }));
  count++;

  // Glossary
  // Note: Schema (DefinedTermSet, BreadcrumbList, FAQPage) is defined here in prerender so it is
  // present in the initial static HTML for immediate crawler access. Glossary.jsx does NOT
  // include its own schema to avoid duplicate structured data after React hydration.
  writePage('/glossary', createPage({
    path: '/glossary',
    title: 'Bank Financial Terms Glossary - BankSift',
    description: 'Glossary of bank financial terms and definitions. Understand ROE, ROAA, efficiency ratio, Graham Number, and other key banking metrics.',
    canonical: `${SITE_URL}/glossary`,
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "DefinedTermSet",
          "name": "BankSift Financial Glossary",
          "description": "Comprehensive glossary of financial terms for bank stock analysis and value investing",
          "hasDefinedTerm": [
            ...metrics.map(m => ({ "@type": "DefinedTerm", "name": m.name, "description": m.shortDescription })),
            ...valuations.map(v => ({ "@type": "DefinedTerm", "name": v.name, "description": v.shortDescription }))
          ].slice(0, 50)
        },
        createBreadcrumbSchema([
          { name: "Home", path: "" },
          { name: "Glossary", path: "/glossary" }
        ]),
        {
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "What is Return on Equity (ROE)?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Return on Equity (ROE) measures how effectively a bank generates profits from shareholder equity. It is calculated as Net Income divided by Average Shareholders' Equity. For US banks, an ROE above 10% is generally considered good, while below 6% may indicate challenges."
              }
            },
            {
              "@type": "Question",
              "name": "What is the Efficiency Ratio in banking?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The Efficiency Ratio measures a bank's operating expenses as a percentage of its total revenue. A lower ratio indicates better cost management. For banks, an efficiency ratio below 55% is considered excellent, while above 70% may suggest operational challenges."
              }
            },
            {
              "@type": "Question",
              "name": "What is the Graham Number?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The Graham Number is a value investing formula developed by Benjamin Graham that estimates the maximum fair price for a stock. It is calculated as the square root of (22.5 × Earnings Per Share × Book Value Per Share). When a bank's stock price is below its Graham Number, it may be undervalued."
              }
            },
            {
              "@type": "Question",
              "name": "What is a 10-K filing?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A 10-K filing is an annual report required by the SEC that provides a comprehensive summary of a company's financial performance. It includes audited financial statements, management discussion and analysis, and risk factors. Banks file 10-K reports annually, and BankSift uses this data to calculate financial metrics."
              }
            },
            {
              "@type": "Question",
              "name": "What does TTM mean in financial metrics?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "TTM stands for Trailing Twelve Months. It is a financial measurement that sums the last four quarters of data to provide an up-to-date annual figure. TTM smooths out seasonal variations and provides more current data than the last fiscal year. BankSift calculates all income statement metrics on a TTM basis."
              }
            },
            {
              "@type": "Question",
              "name": "What is Price to Book (P/B) ratio for banks?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "The Price to Book (P/B) ratio compares a bank's stock price to its book value per share. It is the primary valuation metric for banks because bank assets are mostly financial instruments carried near fair value. A P/B below 1.0 may indicate undervaluation if fundamentals are solid, while above 2.0x is typically considered expensive."
              }
            }
          ]
        }
      ]
    },
    content: `
      <h1>Financial Terms Glossary</h1>
      <p>Comprehensive definitions of financial terms, metrics, and concepts used in bank analysis. Click on any term with a link to learn more.</p>

      <h2>Profitability Metrics</h2>
      <dl>
        <dt><a href="${SITE_URL}/metrics/roe">Return on Equity (ROE)</a></dt>
        <dd>Measures how effectively a bank generates profits from shareholder investments.</dd>
        <dt><a href="${SITE_URL}/metrics/roaa">Return on Average Assets (ROAA)</a></dt>
        <dd>Measures how efficiently a bank uses its total assets to generate earnings.</dd>
        <dt><a href="${SITE_URL}/metrics/net-interest-margin">Net Interest Margin (NIM)</a></dt>
        <dd>Measures the spread between interest earned and interest paid relative to earning assets.</dd>
      </dl>

      <h2>Efficiency Metrics</h2>
      <dl>
        <dt><a href="${SITE_URL}/metrics/efficiency-ratio">Efficiency Ratio</a></dt>
        <dd>Measures operating efficiency by comparing expenses to revenue.</dd>
        <dt><a href="${SITE_URL}/metrics/deposits-to-assets">Deposits to Assets Ratio</a></dt>
        <dd>Shows what portion of bank assets are funded by customer deposits.</dd>
        <dt><a href="${SITE_URL}/metrics/loans-to-deposits">Loans to Deposits Ratio</a></dt>
        <dd>Compares lending activity to deposit funding.</dd>
      </dl>

      <h2>Capital &amp; Leverage Metrics</h2>
      <dl>
        <dt><a href="${SITE_URL}/metrics/equity-to-assets">Equity to Assets Ratio</a></dt>
        <dd>Measures capital strength by comparing equity to total assets.</dd>
        <dt><a href="${SITE_URL}/metrics/loans-to-assets">Loans to Assets Ratio</a></dt>
        <dd>Shows what portion of assets are deployed in loans.</dd>
      </dl>

      <h2>Valuation Metrics</h2>
      <dl>
        <dt><a href="${SITE_URL}/metrics/book-value-per-share">Book Value Per Share (BVPS)</a></dt>
        <dd>The net asset value attributable to each common share.</dd>
        <dt><a href="${SITE_URL}/metrics/price-to-earnings">Price to Earnings (P/E) Ratio</a></dt>
        <dd>Compares stock price to per-share earnings.</dd>
        <dt><a href="${SITE_URL}/metrics/price-to-book">Price to Book (P/B) Ratio</a></dt>
        <dd>Compares stock price to book value per share.</dd>
      </dl>

      <h2>Per-Share Metrics</h2>
      <dl>
        <dt><a href="${SITE_URL}/metrics/earnings-per-share">Earnings Per Share (EPS)</a></dt>
        <dd>Net profit attributable to each common share.</dd>
        <dt><a href="${SITE_URL}/metrics/dividend-payout-ratio">Dividend Payout Ratio</a></dt>
        <dd>Percentage of earnings paid out as dividends.</dd>
      </dl>

      <h2>Valuation Methods</h2>
      <dl>
        <dt><a href="${SITE_URL}/valuation/graham-number">Graham Number</a></dt>
        <dd>A value investing formula for estimating the maximum fair price based on earnings and book value.</dd>
        <dt><a href="${SITE_URL}/valuation/margin-of-safety">Margin of Safety</a></dt>
        <dd>The discount between intrinsic value and purchase price that provides a buffer against errors.</dd>
        <dt><a href="${SITE_URL}/valuation/price-to-book-valuation">Price to Book Valuation</a></dt>
        <dd>Valuing banks based on the ratio of market price to accounting book value.</dd>
        <dt><a href="${SITE_URL}/valuation/price-to-earnings-valuation">Price to Earnings Valuation</a></dt>
        <dd>Valuing banks based on the ratio of market price to per-share earnings.</dd>
        <dt><a href="${SITE_URL}/valuation/roe-pb-framework">ROE-P/B Valuation Framework</a></dt>
        <dd>A framework linking justified price-to-book multiple to return on equity.</dd>
        <dt><a href="${SITE_URL}/valuation/dividend-discount-model">Dividend Discount Model</a></dt>
        <dd>Values a bank based on the present value of expected future dividends.</dd>
        <dt><a href="${SITE_URL}/valuation/peer-comparison">Peer Comparison Analysis</a></dt>
        <dd>Valuing a bank by comparing its metrics and multiples to similar banks.</dd>
      </dl>

      <h2>SEC Filing &amp; Data Terms</h2>
      <dl>
        <dt>SEC EDGAR</dt>
        <dd>The Electronic Data Gathering, Analysis, and Retrieval system operated by the U.S. Securities and Exchange Commission. It provides free public access to corporate filings including 10-K annual reports and 10-Q quarterly reports.</dd>
        <dt>10-K Filing</dt>
        <dd>An annual report required by the SEC that provides a comprehensive summary of a company's financial performance. It includes audited financial statements, management discussion, and risk factors.</dd>
        <dt>10-Q Filing</dt>
        <dd>A quarterly report required by the SEC that provides unaudited financial statements and updates on a company's financial condition. Banks file 10-Q reports for Q1, Q2, and Q3 each year.</dd>
        <dt>Trailing Twelve Months (TTM)</dt>
        <dd>A financial measurement that sums the last four quarters of data to provide an up-to-date annual figure. TTM smooths out seasonal variations and provides more current data than the last fiscal year.</dd>
        <dt>SIC Code</dt>
        <dd>Standard Industrial Classification code used to categorize companies by industry. Banks typically fall under SIC codes 6021 (National Commercial Banks), 6022 (State Commercial Banks), 6035-6036 (Savings Institutions).</dd>
        <dt>CIK Number</dt>
        <dd>Central Index Key - a unique identifier assigned by the SEC to each company and individual who files with the SEC. Used to look up filings in the EDGAR database.</dd>
      </dl>

      <h2>Financial Concepts</h2>
      <dl>
        <dt>Tangible Book Value</dt>
        <dd>Total shareholders' equity minus intangible assets and goodwill. Represents the theoretical value shareholders would receive if all tangible assets were liquidated and all liabilities paid.</dd>
        <dt>Net Interest Income</dt>
        <dd>The difference between interest earned on assets (primarily loans) and interest paid on liabilities (primarily deposits). This is typically the largest revenue source for traditional banks.</dd>
        <dt>Non-Interest Income</dt>
        <dd>Revenue from sources other than interest, including service charges, fees, trading gains, and investment income. Also called fee income.</dd>
        <dt>Non-Interest Expense</dt>
        <dd>Operating expenses excluding interest expense. Includes salaries, occupancy costs, technology, marketing, and other administrative expenses.</dd>
        <dt>Market Capitalization</dt>
        <dd>The total market value of a company's outstanding shares, calculated as share price multiplied by shares outstanding. Used to classify companies as small-cap, mid-cap, or large-cap.</dd>
        <dt>Shares Outstanding</dt>
        <dd>The total number of shares of a company's stock currently held by all shareholders, including institutional investors and company insiders.</dd>
        <dt>Intrinsic Value</dt>
        <dd>The perceived or calculated true value of a company based on fundamental analysis, regardless of its current market price. Different valuation methods may produce different intrinsic values.</dd>
        <dt>Value Investing</dt>
        <dd>An investment strategy that involves buying securities that appear underpriced based on fundamental analysis. Popularized by Benjamin Graham and Warren Buffett.</dd>
      </dl>

      <h2>Using This Glossary</h2>
      <p>This glossary covers financial metrics and terms commonly used in bank stock analysis. Terms linked to detailed pages include formulas, interpretation guides, and typical ranges for banks. All data on BankSift is sourced from official SEC EDGAR filings.</p>
      <p><a href="${SITE_URL}/metrics">Explore all metrics</a> | <a href="${SITE_URL}/screener">Use the screener</a></p>
    `
  }));
  count++;

  // Privacy
  writePage('/privacy', createPage({
    path: '/privacy',
    title: 'Privacy Policy - BankSift',
    description: 'BankSift privacy policy. Learn how we handle your data and protect your privacy.',
    canonical: `${SITE_URL}/privacy`,
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        createBreadcrumbSchema([
          { name: "Home", path: "" },
          { name: "Privacy Policy", path: "/privacy" }
        ])
      ]
    },
    content: `<h1>Privacy Policy</h1><p>BankSift privacy policy and data handling practices.</p>`
  }));
  count++;

  // Terms
  writePage('/terms', createPage({
    path: '/terms',
    title: 'Terms of Service - BankSift',
    description: 'BankSift terms of service and usage conditions.',
    canonical: `${SITE_URL}/terms`,
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        createBreadcrumbSchema([
          { name: "Home", path: "" },
          { name: "Terms of Service", path: "/terms" }
        ])
      ]
    },
    content: `<h1>Terms of Service</h1><p>BankSift terms and conditions of use.</p>`
  }));
  count++;

  console.log(`✓ Generated ${count} static pages`);

  // ============================================
  // FAQ PAGES
  // ============================================

  let faqCount = 0;

  // FAQ Index page
  const faqClusterListHtml = faqClusters
    .sort((a, b) => a.order - b.order)
    .map(cluster => {
      const clusterFaqs = faqs.filter(f => f.cluster === cluster.slug);
      return `<h3><a href="${SITE_URL}/faq/${cluster.slug}">${escapeHtml(cluster.name)}</a> (${clusterFaqs.length} questions)</h3>
      <ul>${clusterFaqs.map(f => `<li><a href="${SITE_URL}/faq/${f.cluster}/${f.slug}">${escapeHtml(f.question)}</a></li>`).join('\n')}</ul>`;
    }).join('\n');

  writePage('/faq', createPage({
    path: '/faq',
    title: 'Bank Stock FAQ | Investment Questions Answered - BankSift',
    description: 'Answers to common questions about bank stock analysis, metrics, valuation methods, screening strategies, and investment approaches. Free educational resource for bank stock investors.',
    canonical: `${SITE_URL}/faq`,
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "FAQPage",
          "mainEntity": faqs.slice(0, 10).map(f => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": f.shortAnswer
            }
          }))
        },
        createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" }
        ])
      ]
    },
    content: `
      <h1>Frequently Asked Questions</h1>
      <p>Educational answers to common questions about bank stock analysis, metrics, valuation methods, and screening strategies.</p>
      ${faqClusterListHtml}
    `
  }));
  faqCount++;

  // FAQ Cluster Index pages
  for (const cluster of faqClusters) {
    const clusterFaqs = faqs.filter(f => f.cluster === cluster.slug);
    if (clusterFaqs.length === 0) continue;

    const path = `/faq/${cluster.slug}`;
    const faqListHtml = clusterFaqs.map(f =>
      `<div><h3><a href="${SITE_URL}/faq/${f.cluster}/${f.slug}">${escapeHtml(f.question)}</a></h3><p>${escapeHtml(f.shortAnswer)}</p></div>`
    ).join('\n');

    writePage(path, createPage({
      path,
      title: `${cluster.name} | Bank Stock FAQ - BankSift`,
      description: `Answers to questions about ${cluster.name.toLowerCase()}. Learn about bank stock analysis from BankSift's educational FAQ.`,
      canonical: `${SITE_URL}${path}`,
      schema: {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "FAQPage",
            "mainEntity": clusterFaqs.map(f => ({
              "@type": "Question",
              "name": f.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": f.shortAnswer
              }
            }))
          },
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/faq" },
            { name: cluster.name, path }
          ])
        ]
      },
      content: `
        <h1>${escapeHtml(cluster.name)}</h1>
        <nav><a href="${SITE_URL}/faq">← All FAQ Topics</a></nav>
        ${faqListHtml}
      `
    }));
    faqCount++;
  }

  // Individual FAQ Detail pages
  for (const faq of faqs) {
    const path = `/faq/${faq.cluster}/${faq.slug}`;
    const cluster = faqClusters.find(c => c.slug === faq.cluster);
    const clusterName = cluster ? cluster.name : faq.clusterName;

    // Split fullAnswer into paragraphs
    const answerHtml = faq.fullAnswer
      .split('\n\n')
      .map(p => `<p>${escapeHtml(p)}</p>`)
      .join('\n');

    // Build related links
    let relatedHtml = '';
    if (faq.relatedMetrics && faq.relatedMetrics.length > 0) {
      const metricLinks = faq.relatedMetrics.map(slug => {
        const m = metrics.find(met => met.slug === slug);
        return m ? `<li><a href="${SITE_URL}/metrics/${slug}">${escapeHtml(m.name)}</a></li>` : '';
      }).filter(Boolean).join('\n');
      if (metricLinks) relatedHtml += `<h3>Related Metrics</h3><ul>${metricLinks}</ul>`;
    }
    if (faq.relatedValuations && faq.relatedValuations.length > 0) {
      const valLinks = faq.relatedValuations.map(slug => {
        const v = valuations.find(val => val.slug === slug);
        return v ? `<li><a href="${SITE_URL}/valuation/${slug}">${escapeHtml(v.name)}</a></li>` : '';
      }).filter(Boolean).join('\n');
      if (valLinks) relatedHtml += `<h3>Related Valuation Methods</h3><ul>${valLinks}</ul>`;
    }
    if (faq.relatedFaqs && faq.relatedFaqs.length > 0) {
      const faqLinks = faq.relatedFaqs.map(slug => {
        const rf = faqs.find(f => f.slug === slug);
        return rf ? `<li><a href="${SITE_URL}/faq/${rf.cluster}/${rf.slug}">${escapeHtml(rf.question)}</a></li>` : '';
      }).filter(Boolean).join('\n');
      if (faqLinks) relatedHtml += `<h3>Related Questions</h3><ul>${faqLinks}</ul>`;
    }

    writePage(path, createPage({
      path,
      title: faq.metaTitle || `${faq.question} | BankSift`,
      description: faq.metaDescription || faq.shortAnswer,
      canonical: `${SITE_URL}${path}`,
      type: 'article',
      schema: {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.fullAnswer.substring(0, 500)
            }
          },
          createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "FAQ", path: "/faq" },
            { name: clusterName, path: `/faq/${faq.cluster}` },
            { name: faq.question.substring(0, 50), path }
          ])
        ]
      },
      content: `
        <nav><a href="${SITE_URL}/faq">FAQ</a> › <a href="${SITE_URL}/faq/${faq.cluster}">${escapeHtml(clusterName)}</a></nav>
        <article>
          <h1>${escapeHtml(faq.question)}</h1>
          ${answerHtml}
          ${relatedHtml}
          ${faq.cta ? `<p><a href="${SITE_URL}${faq.cta.target}">${escapeHtml(faq.cta.text)}</a></p>` : ''}
        </article>
      `
    }));
    faqCount++;
  }

  console.log(`✓ Generated ${faqCount} FAQ pages`);

  // ============================================
  // METRIC PAGES
  // ============================================

  let metricCount = 0;
  for (const metric of metrics) {
    const path = `/metrics/${metric.slug}`;

    writePage(path, createPage({
      path,
      title: `${metric.name} Explained | Bank Financial Ratio Guide - BankSift`,
      description: `${metric.shortDescription} Learn how ${metric.name} is calculated for banks, typical ranges, what values indicate strength or concern, and how to use it in US bank stock analysis.`,
      canonical: `${SITE_URL}${path}`,
      type: 'article',
      // Note: FAQPage schema is defined here alongside Article/BreadcrumbList so all structured
      // data is present in the initial static HTML for immediate crawler access. MetricDetail.jsx
      // does NOT include its own schema to avoid duplicate structured data after React hydration.
      schema: {
        "@context": "https://schema.org",
        "@graph": [
          createBreadcrumbSchema([
            { name: "Home", path: "" },
            { name: "Financial Metrics", path: "/metrics" },
            { name: metric.name, path: path }
          ]),
          {
            "@type": "Article",
            "headline": metric.name,
            "description": metric.shortDescription,
            "dateModified": BUILD_DATE,
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
          {
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": `What is ${metric.name}?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": metric.description
                }
              },
              {
                "@type": "Question",
                "name": `How is ${metric.name} calculated for banks?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `The formula is: ${metric.formula}. ${metric.formulaExplanation || ''} This metric is calculated using data from SEC EDGAR filings, including 10-K and 10-Q reports.`
                }
              },
              {
                "@type": "Question",
                "name": `What is a good ${metric.name} for US banks?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": metric.typicalRange + (metric.goodBad ? ` ${metric.goodBad.good}` : '') + ' Always compare within peer groups of similar-sized banks for meaningful benchmarking.'
                }
              },
              {
                "@type": "Question",
                "name": `Why does ${metric.name} matter for bank investors?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": metric.interpretation + (metric.considerations && metric.considerations.length > 0 ? ` Key consideration: ${metric.considerations[0]}` : '')
                }
              },
              ...(metric.relatedMetrics && metric.relatedMetrics.length > 0 ? [{
                "@type": "Question",
                "name": `What metrics are related to ${metric.name}?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `${metric.name} is commonly analyzed alongside ${metric.relatedMetrics.map(slug => { const r = metrics.find(m => m.slug === slug); return r ? r.name : slug; }).join(', ')}. Together, these metrics provide a more complete picture of a bank's financial health and help investors make informed comparisons.`
                }
              }] : [])
            ]
          }
        ]
      },
      content: `
        <article>
          <h1>${escapeHtml(metric.name)}</h1>
          <p><strong>Category:</strong> ${escapeHtml(metric.categoryLabel)}</p>
          <h2>Overview</h2>
          <p>${escapeHtml(metric.description)}</p>
          <h2>Formula</h2>
          <p><code>${escapeHtml(metric.formula)}</code></p>
          <p>${escapeHtml(metric.formulaExplanation)}</p>
          <h2>Interpretation</h2>
          <p>${escapeHtml(metric.interpretation)}</p>
          <h2>Typical Range for Banks</h2>
          <p>${escapeHtml(metric.typicalRange)}</p>
          ${metric.goodBad ? `
          <h3>Generally Favorable</h3>
          <p>${escapeHtml(metric.goodBad.good)}</p>
          <h3>Potential Concern</h3>
          <p>${escapeHtml(metric.goodBad.bad)}</p>
          ` : ''}
          ${metric.considerations ? `
          <h2>Important Considerations</h2>
          <ul>
            ${metric.considerations.map(c => `<li>${escapeHtml(c)}</li>`).join('\n            ')}
          </ul>
          ` : ''}
          ${metric.relatedMetrics && metric.relatedMetrics.length > 0 ? `
          <h2>Related Metrics</h2>
          <ul>
            ${metric.relatedMetrics.map(slug => {
              const related = metrics.find(m => m.slug === slug);
              if (!related) return '';
              const desc = metric.relatedMetricDescriptions?.[slug] || related.shortDescription;
              return `<li><a href="${SITE_URL}/metrics/${slug}">${escapeHtml(related.name)}</a> — ${escapeHtml(desc)}</li>`;
            }).filter(Boolean).join('\n            ')}
          </ul>
          ` : ''}
          ${metric.bankSpecificContext ? `
          <h2>Bank-Specific Context</h2>
          <p>${escapeHtml(metric.bankSpecificContext)}</p>
          ` : ''}
          ${metric.metricConnections ? `
          <h2>Metric Connections</h2>
          <p>${escapeHtml(metric.metricConnections)}</p>
          ` : ''}
          ${metric.commonPitfalls ? `
          <h2>Common Pitfalls</h2>
          <p>${escapeHtml(metric.commonPitfalls)}</p>
          ` : ''}
          ${metric.acrossBankTypes ? `
          <h2>Across Bank Types</h2>
          <p>${escapeHtml(metric.acrossBankTypes)}</p>
          ` : ''}
          ${metric.whatDrivesMetric ? `
          <h2>What Drives This Metric</h2>
          <p>${escapeHtml(metric.whatDrivesMetric)}</p>
          ` : ''}
          ${METRIC_TO_VALUATIONS[metric.slug] ? `
          <h2>Related Valuation Methods</h2>
          <ul>
            ${METRIC_TO_VALUATIONS[metric.slug].map(valSlug => {
              const val = valuations.find(v => v.slug === valSlug);
              if (!val) return '';
              return `<li><a href="${SITE_URL}/valuation/${valSlug}">${escapeHtml(val.name)}</a> — ${escapeHtml(val.shortDescription)}</li>`;
            }).filter(Boolean).join('\n            ')}
          </ul>
          ` : ''}
          ${metric.faqTeasers && metric.faqTeasers.length > 0 ? `
          <h2>Frequently Asked Questions</h2>
          ${metric.faqTeasers.map(ft => `<h3>${escapeHtml(ft.question)}</h3>
          <p>${escapeHtml(ft.teaser)} <a href="${SITE_URL}/faq/${ft.faqCluster}/${ft.faqSlug}">Read more →</a></p>`).join('\n          ')}
          ` : ''}
          <h2>Data Source</h2>
          <p>This metric is calculated using data from SEC EDGAR filings. ${escapeHtml(metric.dataSource)}</p>
          <p>Use the <a href="${SITE_URL}/screener">Bank Screener</a> to filter 300+ banks by ${escapeHtml(metric.name)} and other metrics.</p>
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
      title: `${valuation.name} Explained | Bank Valuation Method Guide - BankSift`,
      description: `${valuation.shortDescription} Learn how to calculate and apply ${valuation.name} to value US bank stocks, with formula, examples, strengths, and limitations.`,
      canonical: `${SITE_URL}${path}`,
      type: 'article',
      // Note: FAQPage schema is defined here alongside Article/BreadcrumbList so all structured
      // data is present in the initial static HTML for immediate crawler access. ValuationDetail.jsx
      // does NOT include its own schema to avoid duplicate structured data after React hydration.
      schema: {
        "@context": "https://schema.org",
        "@graph": [
          createBreadcrumbSchema([
            { name: "Home", path: "" },
            { name: "Valuation Methods", path: "/valuation" },
            { name: valuation.name, path: path }
          ]),
          {
            "@type": "Article",
            "headline": valuation.name,
            "description": valuation.shortDescription,
            "dateModified": BUILD_DATE,
            "author": {
              "@type": "Organization",
              "name": "BankSift"
            }
          },
          {
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": `What is ${valuation.name}?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": valuation.description
                }
              },
              {
                "@type": "Question",
                "name": `How do I apply ${valuation.name} to bank stocks?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": valuation.steps ? valuation.steps.join(' ') : valuation.description
                }
              },
              {
                "@type": "Question",
                "name": `What are the strengths of using ${valuation.name}?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": valuation.strengths ? valuation.strengths.join(' ') : `${valuation.name} is a widely used approach for evaluating bank stock value.`
                }
              },
              {
                "@type": "Question",
                "name": `What are the limitations of ${valuation.name}?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": valuation.limitations ? valuation.limitations.join(' ') : `Like all valuation methods, ${valuation.name} should be used alongside other approaches for a complete analysis.`
                }
              },
              ...(valuation.formula ? [{
                "@type": "Question",
                "name": `What is the formula for ${valuation.name}?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `The formula is: ${valuation.formula}. ${valuation.formulaExplanation || ''}`
                }
              }] : [])
            ]
          }
        ]
      },
      content: `
        <article>
          <h1>${escapeHtml(valuation.name)}</h1>
          <p><strong>Type:</strong> ${escapeHtml(valuation.type)}</p>
          <h2>Overview</h2>
          <p>${escapeHtml(valuation.description)}</p>
          <h2>Formula</h2>
          <p><code>${escapeHtml(valuation.formula)}</code></p>
          <p>${escapeHtml(valuation.formulaExplanation)}</p>
          ${valuation.steps ? `
          <h2>How to Apply</h2>
          <ol>
            ${valuation.steps.map(s => `<li>${escapeHtml(s)}</li>`).join('\n            ')}
          </ol>
          ` : ''}
          <h2>Example Calculation</h2>
          <p>${escapeHtml(valuation.example)}</p>
          ${valuation.strengths ? `
          <h2>Strengths</h2>
          <ul>
            ${valuation.strengths.map(s => `<li>${escapeHtml(s)}</li>`).join('\n            ')}
          </ul>
          ` : ''}
          ${valuation.limitations ? `
          <h2>Limitations</h2>
          <ul>
            ${valuation.limitations.map(l => `<li>${escapeHtml(l)}</li>`).join('\n            ')}
          </ul>
          ` : ''}
          ${valuation.bankSpecific ? `
          <h2>Bank-Specific Considerations</h2>
          <p>${escapeHtml(valuation.bankSpecific)}</p>
          ` : ''}
          ${valuation.whenToUse ? `
          <h2>When to Use This Method</h2>
          <p>${escapeHtml(valuation.whenToUse)}</p>
          ` : ''}
          ${valuation.methodConnections ? `
          <h2>Method Connections</h2>
          <p>${escapeHtml(valuation.methodConnections)}</p>
          ` : ''}
          ${valuation.commonMistakes ? `
          <h2>Common Mistakes</h2>
          <p>${escapeHtml(valuation.commonMistakes)}</p>
          ` : ''}
          ${valuation.acrossBankTypes ? `
          <h2>Across Bank Types</h2>
          <p>${escapeHtml(valuation.acrossBankTypes)}</p>
          ` : ''}
          ${valuation.relatedMethods && valuation.relatedMethods.length > 0 ? `
          <h2>Related Valuation Methods</h2>
          <ul>
            ${valuation.relatedMethods.map(slug => {
              const related = valuations.find(v => v.slug === slug);
              if (!related) return '';
              return `<li><a href="${SITE_URL}/valuation/${slug}">${escapeHtml(related.name)}</a> — ${escapeHtml(related.shortDescription)}</li>`;
            }).filter(Boolean).join('\n            ')}
          </ul>
          ` : ''}
          ${VALUATION_TO_METRICS[valuation.slug] ? `
          <h2>Related Metrics</h2>
          <ul>
            ${VALUATION_TO_METRICS[valuation.slug].map(metricSlug => {
              const met = metrics.find(m => m.slug === metricSlug);
              if (!met) return '';
              return `<li><a href="${SITE_URL}/metrics/${metricSlug}">${escapeHtml(met.name)}</a> — ${escapeHtml(met.shortDescription)}</li>`;
            }).filter(Boolean).join('\n            ')}
          </ul>
          ` : ''}
          ${valuation.faqTeasers && valuation.faqTeasers.length > 0 ? `
          <h2>Frequently Asked Questions</h2>
          ${valuation.faqTeasers.map(ft => `<h3>${escapeHtml(ft.question)}</h3>
          <p>${escapeHtml(ft.teaser)} <a href="${SITE_URL}/faq/${ft.faqCluster}/${ft.faqSlug}">Read more →</a></p>`).join('\n          ')}
          ` : ''}
          <p>Apply this method using the <a href="${SITE_URL}/screener">Bank Screener</a> to evaluate 300+ publicly traded US banks.</p>
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
  let bankSkipped = 0;
  for (const bank of banks) {
    // Use ticker for URL (matches React Router's bank/:ticker route)
    // Skip banks without tickers - they can't be looked up in the SPA
    if (!bank.ticker) {
      bankSkipped++;
      continue;
    }
    const cik = bank.cik.replace(/^0+/, '');
    const path = `/bank/${bank.ticker}`;
    const bankName = bank.bankName || 'Unknown Bank';
    const ticker = ` (${bank.ticker})`;
    const tickerOnly = bank.ticker;

    // Look up alternate names / keywords for this bank
    const keywordData = bankKeywords[tickerOnly] || null;
    const alternateNames = keywordData ? keywordData.alternateNames : [];
    const descHint = keywordData ? keywordData.descriptionHint : null;

    // Build description with available metrics (metrics are at top level of bank object)
    const descParts = [];
    if (bank.roe != null) descParts.push(`ROE: ${bank.roe.toFixed(2)}%`);
    if (bank.roaa != null) descParts.push(`ROAA: ${bank.roaa.toFixed(2)}%`);
    if (bank.efficiencyRatio != null) descParts.push(`Efficiency: ${bank.efficiencyRatio.toFixed(1)}%`);

    const metricsDesc = descParts.length > 0 ? ` ${descParts.join(', ')}.` : '';

    // Build a concise title that fits within 60 chars where possible
    let bankTitle;
    const fullTitle = `${bankName}${ticker} - Bank Analysis | BankSift`;
    if (fullTitle.length > 60 && tickerOnly) {
      bankTitle = `${bankName}${ticker} | BankSift`;
    } else {
      bankTitle = fullTitle;
    }

    // Build a description under 155 chars, weaving in alternate name when available
    const aliasFragment = descHint ? `, ${descHint},` : '';
    const bankDescFull = `${bankName}${ticker}${aliasFragment} financial analysis.${metricsDesc} SEC filing data updated daily.`;
    // If alias makes it too long, try without the trailing "SEC filing data updated daily."
    const bankDescShort = `${bankName}${ticker}${aliasFragment} financial analysis.${metricsDesc}`;
    // If even without the trailing part it's too long, drop the alias
    const bankDescNoAlias = `${bankName}${ticker} financial analysis.${metricsDesc} SEC filing data updated daily.`;
    const bankDesc = bankDescFull.length <= 155 ? bankDescFull
      : bankDescShort.length <= 155 ? bankDescShort
      : bankDescNoAlias.length <= 155 ? bankDescNoAlias
      : `${bankName}${ticker} financial analysis.${metricsDesc}`.substring(0, 152) + '...';

    writePage(path, createPage({
      path,
      title: bankTitle,
      description: bankDesc,
      canonical: `${SITE_URL}${path}`,
      type: 'article',
      schema: {
        "@context": "https://schema.org",
        "@graph": [
          createBreadcrumbSchema([
            { name: "Home", path: "" },
            { name: "Bank Screener", path: "/screener" },
            { name: bankName, path: path }
          ]),
          {
            "@type": "FinancialProduct",
            "name": bankName,
            ...(alternateNames.length > 0 ? { "alternateName": alternateNames } : {}),
            "description": `Financial analysis for ${bankName}`,
            "dateModified": BUILD_DATE,
            "provider": {
              "@type": "Corporation",
              "name": bankName,
              ...(alternateNames.length > 0 ? { "alternateName": alternateNames } : {}),
              "tickerSymbol": bank.ticker || undefined
            }
          },
          {
            "@type": "Dataset",
            "name": `${bankName} (${bank.ticker}) Financial Data`,
            "description": `Financial metrics and SEC filing data for ${bankName}. Includes profitability ratios, valuation metrics, capital strength indicators, and balance sheet data.`,
            "url": `${SITE_URL}${path}`,
            "license": "https://www.sec.gov/privacy#security",
            "creator": { "@type": "Organization", "name": "BankSift" },
            "dateModified": BUILD_DATE,
            "variableMeasured": [
              ...(bank.roe != null ? [{ "@type": "PropertyValue", "name": "ROE", "value": `${bank.roe.toFixed(2)}%` }] : []),
              ...(bank.roaa != null ? [{ "@type": "PropertyValue", "name": "ROAA", "value": `${bank.roaa.toFixed(2)}%` }] : []),
              ...(bank.efficiencyRatio != null ? [{ "@type": "PropertyValue", "name": "Efficiency Ratio", "value": `${bank.efficiencyRatio.toFixed(1)}%` }] : []),
              ...(bank.priceToBook != null ? [{ "@type": "PropertyValue", "name": "P/B Ratio", "value": `${bank.priceToBook.toFixed(2)}x` }] : []),
            ]
          }
        ]
      },
      content: `
        <article>
          <h1>${escapeHtml(bankName)}${escapeHtml(ticker)}</h1>
          <p>Comprehensive financial analysis for ${escapeHtml(bankName)}${escapeHtml(ticker)} based on SEC EDGAR filings. Data updated daily from official 10-K and 10-Q reports.</p>
          <h2>Company Information</h2>
          <dl>
            <dt>Legal Name</dt><dd>${escapeHtml(bankName)}</dd>
            ${bank.ticker ? `<dt>Ticker Symbol</dt><dd>${escapeHtml(bank.ticker)}</dd>` : ''}
            ${bank.exchange ? `<dt>Exchange</dt><dd>${escapeHtml(bank.exchange)}</dd>` : ''}
            <dt>CIK Number</dt><dd>${escapeHtml(bank.cik)}</dd>
            ${bank.sic ? `<dt>SIC Code</dt><dd>${bank.sic}</dd>` : ''}
            ${bank.sicDescription ? `<dt>Industry</dt><dd>${escapeHtml(bank.sicDescription)}</dd>` : ''}
            ${alternateNames.length > 0 ? `<dt>Also Known As</dt><dd>${alternateNames.map(n => escapeHtml(n)).join(', ')}</dd>` : ''}
            ${bank.sharesOutstanding != null ? `<dt>Shares Outstanding</dt><dd>${bank.sharesOutstanding >= 1e9 ? (bank.sharesOutstanding / 1e9).toFixed(2) + 'B' : (bank.sharesOutstanding / 1e6).toFixed(1) + 'M'}</dd>` : ''}
          </dl>
          ${bank.roe != null || bank.roaa != null || bank.efficiencyRatio != null ? `
          <h2>Profitability &amp; Efficiency Metrics</h2>
          <dl>
            ${bank.roe != null ? `<dt><a href="${SITE_URL}/metrics/roe">Return on Equity (ROE)</a></dt><dd>${bank.roe.toFixed(2)}%</dd>` : ''}
            ${bank.roaa != null ? `<dt><a href="${SITE_URL}/metrics/roaa">Return on Average Assets (ROAA)</a></dt><dd>${bank.roaa.toFixed(2)}%</dd>` : ''}
            ${bank.efficiencyRatio != null ? `<dt><a href="${SITE_URL}/metrics/efficiency-ratio">Efficiency Ratio</a></dt><dd>${bank.efficiencyRatio.toFixed(1)}%</dd>` : ''}
            ${bank.depositsToAssets != null ? `<dt><a href="${SITE_URL}/metrics/deposits-to-assets">Deposits to Assets</a></dt><dd>${bank.depositsToAssets.toFixed(1)}%</dd>` : ''}
            ${bank.loansToDeposits != null ? `<dt><a href="${SITE_URL}/metrics/loans-to-deposits">Loans to Deposits</a></dt><dd>${bank.loansToDeposits.toFixed(1)}%</dd>` : ''}
          </dl>
          ` : ''}
          ${bank.bvps != null || bank.priceToBook != null || bank.pni != null ? `
          <h2>Valuation Metrics</h2>
          <dl>
            ${bank.bvps != null ? `<dt><a href="${SITE_URL}/metrics/book-value-per-share">Book Value Per Share (BVPS)</a></dt><dd>$${bank.bvps.toFixed(2)}</dd>` : ''}
            ${bank.priceToBook != null ? `<dt><a href="${SITE_URL}/metrics/price-to-book">Price to Book (P/B)</a></dt><dd>${bank.priceToBook.toFixed(2)}x</dd>` : ''}
            ${bank.pni != null ? `<dt><a href="${SITE_URL}/metrics/price-to-earnings">Price to Earnings (P/E)</a></dt><dd>${bank.pni.toFixed(2)}x</dd>` : ''}
            ${bank.grahamNum != null ? `<dt><a href="${SITE_URL}/valuation/graham-number">Graham Number</a></dt><dd>$${bank.grahamNum.toFixed(2)}</dd>` : ''}
            ${bank.grahamMoSPct != null ? `<dt><a href="${SITE_URL}/valuation/margin-of-safety">Graham Margin of Safety</a></dt><dd>${bank.grahamMoSPct.toFixed(1)}%</dd>` : ''}
          </dl>
          ` : ''}
          ${bank.equityToAssets != null || bank.loansToAssets != null ? `
          <h2>Capital &amp; Balance Sheet</h2>
          <dl>
            ${bank.equityToAssets != null ? `<dt><a href="${SITE_URL}/metrics/equity-to-assets">Equity to Assets</a></dt><dd>${bank.equityToAssets.toFixed(2)}%</dd>` : ''}
            ${bank.loansToAssets != null ? `<dt><a href="${SITE_URL}/metrics/loans-to-assets">Loans to Assets</a></dt><dd>${bank.loansToAssets.toFixed(1)}%</dd>` : ''}
            ${bank.totalAssets != null ? `<dt>Total Assets</dt><dd>$${(bank.totalAssets / 1e9).toFixed(2)}B</dd>` : ''}
            ${bank.totalDeposits != null ? `<dt>Total Deposits</dt><dd>$${(bank.totalDeposits / 1e9).toFixed(2)}B</dd>` : ''}
            ${bank.totalEquity != null ? `<dt>Total Equity</dt><dd>$${(bank.totalEquity / 1e6).toFixed(1)}M</dd>` : ''}
          </dl>
          ` : ''}
          ${bank.price != null || bank.marketCap != null ? `
          <h2>Market Data</h2>
          <dl>
            ${bank.price != null ? `<dt>Stock Price</dt><dd>$${bank.price.toFixed(2)}</dd>` : ''}
            ${bank.marketCap != null ? `<dt>Market Capitalization</dt><dd>$${bank.marketCap >= 1e9 ? (bank.marketCap / 1e9).toFixed(2) + 'B' : (bank.marketCap / 1e6).toFixed(1) + 'M'}</dd>` : ''}
          </dl>
          ` : ''}
          ${bank.ttmNetIncome != null || bank.ttmNetInterestIncome != null || bank.ttmEps != null || bank.ttmDividendPerShare != null ? `
          <h2>TTM Performance</h2>
          <dl>
            ${bank.ttmNetIncome != null ? `<dt>Net Income (TTM)</dt><dd>$${Math.abs(bank.ttmNetIncome) >= 1e9 ? (bank.ttmNetIncome / 1e9).toFixed(2) + 'B' : (bank.ttmNetIncome / 1e6).toFixed(1) + 'M'}</dd>` : ''}
            ${bank.ttmNetInterestIncome != null ? `<dt>Net Interest Income (TTM)</dt><dd>$${Math.abs(bank.ttmNetInterestIncome) >= 1e9 ? (bank.ttmNetInterestIncome / 1e9).toFixed(2) + 'B' : (bank.ttmNetInterestIncome / 1e6).toFixed(1) + 'M'}</dd>` : ''}
            ${bank.ttmEps != null ? `<dt><a href="${SITE_URL}/metrics/earnings-per-share">Earnings Per Share (TTM)</a></dt><dd>$${bank.ttmEps.toFixed(2)}</dd>` : ''}
            ${bank.ttmDividendPerShare != null ? `<dt>Dividend Per Share (TTM)</dt><dd>$${bank.ttmDividendPerShare.toFixed(2)}</dd>` : ''}
            ${bank.dividendPayoutRatio != null ? `<dt><a href="${SITE_URL}/metrics/dividend-payout-ratio">Dividend Payout Ratio</a></dt><dd>${bank.dividendPayoutRatio.toFixed(1)}%</dd>` : ''}
          </dl>
          ` : ''}
          <h2>SEC Filing Data</h2>
          <p>All financial data for ${escapeHtml(bankName)} is sourced directly from SEC EDGAR filings including 10-K annual reports and 10-Q quarterly statements. Metrics are calculated using trailing twelve month (TTM) methodology${bank.dataDate ? ` with data through ${bank.dataDate}` : ''}.</p>
          <p><a href="${SITE_URL}/screener">Compare ${escapeHtml(bankName)} with 300+ other banks</a> using the BankSift screener, or learn about the <a href="${SITE_URL}/metrics">financial metrics</a> and <a href="${SITE_URL}/valuation">valuation methods</a> used in this analysis.</p>
        </article>
      `
    }));
    // Also generate a CIK-based redirect page for backward compatibility
    // (old CIK URLs may be in Bing's crawl queue or external links)
    const cikPath = `/bank/${cik}`;
    if (cikPath !== path) {
      const redirectHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Redirecting to ${escapeHtml(bankName)}</title>
<link rel="canonical" href="${SITE_URL}${path}">
<meta http-equiv="refresh" content="0;url=${SITE_URL}${path}">
<meta name="robots" content="noindex, follow">
</head>
<body>
<p>This page has moved to <a href="${SITE_URL}${path}">${escapeHtml(bankName)}${escapeHtml(ticker)}</a>.</p>
</body>
</html>`;
      writePage(cikPath, redirectHtml);
    }

    bankCount++;

    // Progress indicator for large number of banks
    if (bankCount % 50 === 0) {
      process.stdout.write(`  Processing banks: ${bankCount}/${banks.length}\r`);
    }
  }
  console.log(`✓ Generated ${bankCount} bank pages (skipped ${bankSkipped} without tickers)`);

  // ============================================
  // SUMMARY
  // ============================================

  const total = count + faqCount + metricCount + valuationCount + bankCount;
  console.log(`\n✅ Pre-rendering complete!`);
  console.log(`   Total pages: ${total}`);
  console.log(`   - Static pages: ${count}`);
  console.log(`   - FAQ pages: ${faqCount}`);
  console.log(`   - Metric pages: ${metricCount}`);
  console.log(`   - Valuation pages: ${valuationCount}`);
  console.log(`   - Bank pages: ${bankCount}`);
}

// Run
generatePages().catch(err => {
  console.error('Pre-rendering failed:', err);
  process.exit(1);
});

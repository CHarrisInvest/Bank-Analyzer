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

  // Add SEO content as visible fallback content inside the root div
  // This content is visible to crawlers and users before React hydrates
  // React will replace this content when it mounts
  if (content) {
    const seoContent = `
      <main id="seo-content" class="seo-fallback">
        ${content}
        <noscript>
          <p>This site works best with JavaScript enabled. Enable JavaScript for the full interactive experience.</p>
        </noscript>
      </main>`;
    // Replace the loading fallback with actual content
    html = html.replace(
      /<div id="loading-fallback"[\s\S]*?<\/div>\s*<\/div>/,
      seoContent
    );
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

  // Screener page - optimized for "bank screener", "bank stock screener", "bank equity screener" keywords
  writePage('/screener', createPage({
    path: '/screener',
    title: 'Free Bank Stock Screener | Filter Bank Stocks by 25+ Metrics - BankSift',
    description: 'Free bank stock screener to filter and analyze 300+ US bank stocks. Screen bank equities by ROE, P/B ratio, Graham Number, efficiency ratio & 20+ metrics. Updated daily from SEC filings.',
    canonical: `${SITE_URL}/screener`,
    type: 'website',
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": `${SITE_URL}`
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Bank Screener",
              "item": `${SITE_URL}/screener`
            }
          ]
        },
        {
          "@type": "WebApplication",
          "name": "BankSift Bank Stock Screener",
          "alternateName": ["Bank Screener", "Bank Equity Screener", "Bank Filter", "The Sifter"],
          "url": `${SITE_URL}/screener`,
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
            }
          ]
        }
      ]
    },
    content: `
      <h1>Free Bank Stock Screener</h1>
      <p>Screen and filter 300+ publicly traded US bank stocks using comprehensive financial metrics. Our free bank equity screener helps value investors find undervalued bank stocks.</p>

      <h2>Bank Screening Filters</h2>
      <p>Use our bank stock filter to screen banks by:</p>
      <ul>
        <li><strong>Profitability:</strong> Return on Equity (ROE), Return on Assets (ROAA), Net Interest Margin</li>
        <li><strong>Valuation:</strong> Price to Book (P/B), Price to Earnings (P/E), Graham Number</li>
        <li><strong>Efficiency:</strong> Efficiency Ratio, Operating Leverage</li>
        <li><strong>Safety:</strong> Capital Ratios, Non-Performing Assets</li>
      </ul>

      <h2>Why Use a Bank Stock Screener?</h2>
      <p>Bank stocks require specialized analysis due to their unique financial structures. Our bank screener provides metrics specifically designed for bank analysis, unlike generic stock screeners.</p>

      <h2>Frequently Asked Questions</h2>
      <h3>What is a bank stock screener?</h3>
      <p>A bank stock screener is a tool that filters publicly traded bank stocks based on financial metrics like ROE, P/B ratio, and efficiency ratio. It helps investors find bank stocks that match their investment criteria.</p>

      <h3>How do I screen for undervalued bank stocks?</h3>
      <p>Use the bank screener to filter by Price to Book ratio below 1.0, Graham Number above current price, and ROE above 10%. These metrics help identify potentially undervalued bank stocks with good fundamentals.</p>

      <h3>What metrics should I use to screen bank stocks?</h3>
      <p>Key metrics for screening bank stocks include Return on Equity (ROE), Return on Assets (ROAA), Efficiency Ratio, Net Interest Margin, Price to Book ratio, and the Graham Number for value investing.</p>

      <h3>Is this bank screener free?</h3>
      <p>Yes, BankSift's bank stock screener is completely free with no registration required. Data is updated daily from SEC filings.</p>
    `
  }));
  count++;

  // Screener Guide
  writePage('/screener/guide', createPage({
    path: '/screener/guide',
    title: 'How to Screen Bank Stocks: Complete Guide | BankSift',
    description: 'Learn how to screen and analyze bank stocks using ROE, P/B ratio, efficiency ratio, and Graham Number. Step-by-step tutorial for finding undervalued bank stocks with the BankSift screener.',
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
    title: 'Bank Search - BankSift',
    description: 'Search for specific banks by name, ticker symbol, or CIK number. Access detailed financial metrics and analysis for any publicly traded US bank.',
    canonical: `${SITE_URL}/search`,
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        createBreadcrumbSchema([
          { name: "Home", path: "" },
          { name: "Bank Search", path: "/search" }
        ])
      ]
    },
    content: `
      <h1>Bank Search</h1>
      <p>Search for publicly traded US banks by name, ticker, or CIK number.</p>
    `
  }));
  count++;

  // Metrics index - optimized for "bank financial metrics", "bank ratios", "bank analysis metrics"
  writePage('/metrics', createPage({
    path: '/metrics',
    title: 'Bank Financial Metrics Explained | ROE, ROAA, Efficiency Ratio Guide - BankSift',
    description: 'Free guide to bank stock financial metrics. Learn ROE, ROAA, efficiency ratio, P/B ratio, net interest margin, and 10+ ratios used to analyze publicly traded US banks.',
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
                "text": "A good Return on Equity (ROE) for banks is typically 10% to 15%. ROE above 10-12% indicates strong profitability and efficient capital use. Top-performing banks may exceed 15%. ROE below 6-8% may indicate weak profitability or operational challenges."
              }
            },
            {
              "@type": "Question",
              "name": "What efficiency ratio is good for banks?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "An efficiency ratio below 55% is considered excellent for banks. Ratios between 50-60% indicate well-managed operations. Ratios above 65-70% may suggest cost control challenges. The efficiency ratio measures operating expenses as a percentage of total revenue."
              }
            }
          ]
        },
        {
          "@type": "ItemList",
          "name": "Bank Financial Metric Categories",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Profitability Ratios", "url": `${SITE_URL}/metrics#profitability` },
            { "@type": "ListItem", "position": 2, "name": "Efficiency Ratios", "url": `${SITE_URL}/metrics#efficiency` },
            { "@type": "ListItem", "position": 3, "name": "Capital & Leverage Ratios", "url": `${SITE_URL}/metrics#capital` },
            { "@type": "ListItem", "position": 4, "name": "Valuation Metrics", "url": `${SITE_URL}/metrics#valuation` },
            { "@type": "ListItem", "position": 5, "name": "Per Share Metrics", "url": `${SITE_URL}/metrics#per-share` }
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
    title: 'Bank Valuation Methods Guide - BankSift',
    description: 'Learn how to value bank stocks using Graham Number, margin of safety, P/E ratio, P/B ratio, and other proven valuation methods for bank investing.',
    canonical: `${SITE_URL}/valuation`,
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        createBreadcrumbSchema([
          { name: "Home", path: "" },
          { name: "Valuation Methods", path: "/valuation" }
        ])
      ]
    },
    content: `
      <h1>Bank Valuation Methods</h1>
      <p>Learn proven methods for valuing bank stocks and finding investment opportunities.</p>
      <h2>Valuation Approaches</h2>
      <ul>
        <li>Graham Number - Benjamin Graham's intrinsic value formula</li>
        <li>Margin of Safety - Discount to fair value</li>
        <li>Price to Book Valuation</li>
        <li>Price to Earnings Valuation</li>
        <li>ROE-P/B Framework</li>
        <li>Dividend Discount Model</li>
        <li>Peer Comparison Analysis</li>
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
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        createBreadcrumbSchema([
          { name: "Home", path: "" },
          { name: "Glossary", path: "/glossary" }
        ])
      ]
    },
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
            "author": {
              "@type": "Organization",
              "name": "BankSift"
            },
            "publisher": {
              "@type": "Organization",
              "name": "BankSift",
              "url": SITE_URL
            }
          }
        ]
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
            "author": {
              "@type": "Organization",
              "name": "BankSift"
            }
          }
        ]
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
        "@graph": [
          createBreadcrumbSchema([
            { name: "Home", path: "" },
            { name: "Bank Screener", path: "/screener" },
            { name: bankName, path: path }
          ]),
          {
            "@type": "FinancialProduct",
            "name": bankName,
            "description": `Financial analysis for ${bankName}`,
            "provider": {
              "@type": "Corporation",
              "name": bankName,
              "tickerSymbol": bank.ticker || undefined
            }
          }
        ]
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

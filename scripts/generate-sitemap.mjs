/**
 * Generate sitemap.xml with all routes
 *
 * Uses git commit dates for content-driven pages so lastmod reflects
 * actual content changes rather than the build date.
 *
 * Run after prerender: node scripts/generate-sitemap.mjs
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const publicDir = join(rootDir, 'public');
const dataDir = join(publicDir, 'data');
const srcDir = join(rootDir, 'src');

const SITE_URL = 'https://banksift.org';
const TODAY = new Date().toISOString().split('T')[0];

/**
 * Get the date of the last git commit that touched the given file.
 * Falls back to today's date if git history is unavailable (e.g. shallow clone).
 */
function getLastModDate(filePath) {
  try {
    const date = execSync(`git log -1 --format=%aI -- "${filePath}"`, {
      cwd: rootDir,
      encoding: 'utf-8',
    }).trim();
    if (date) return date.split('T')[0];
  } catch {
    // git not available or file untracked — fall back to build date
  }
  return TODAY;
}

async function generateSitemap() {
  const urls = [];

  // ── Static pages ────────────────────────────────────────────────
  // Map each route to its primary source file so lastmod reflects
  // when the page content was actually changed.
  const staticPages = [
    { path: '/', priority: '1.0', changefreq: 'weekly', src: 'src/pages/Home.jsx' },
    { path: '/screener', priority: '1.0', changefreq: 'daily', src: 'src/pages/ScreenerPage.jsx' },
    { path: '/screener/guide', priority: '0.8', changefreq: 'monthly', src: 'src/pages/ScreenerGuide.jsx' },
    { path: '/search', priority: '0.9', changefreq: 'weekly', src: 'src/pages/Search.jsx' },
    { path: '/metrics', priority: '0.9', changefreq: 'monthly', src: 'src/pages/MetricsIndex.jsx' },
    { path: '/valuation', priority: '0.9', changefreq: 'monthly', src: 'src/pages/ValuationIndex.jsx' },
    { path: '/glossary', priority: '0.8', changefreq: 'monthly', src: 'src/pages/Glossary.jsx' },
    { path: '/privacy', priority: '0.3', changefreq: 'yearly', src: 'src/pages/Privacy.jsx' },
    { path: '/terms', priority: '0.3', changefreq: 'yearly', src: 'src/pages/Terms.jsx' },
  ];

  for (const page of staticPages) {
    urls.push({
      loc: `${SITE_URL}${page.path}`,
      lastmod: getLastModDate(page.src),
      changefreq: page.changefreq,
      priority: page.priority
    });
  }

  // ── Metric pages ────────────────────────────────────────────────
  // All metric detail pages derive content from the same data file,
  // so they share a single lastmod based on when that file changed.
  const metricsFile = 'src/data/content/metrics.js';
  const metricsLastmod = getLastModDate(metricsFile);
  const metricsModule = await import(join(srcDir, 'data', 'content', 'metrics.js'));
  for (const metric of metricsModule.METRICS) {
    urls.push({
      loc: `${SITE_URL}/metrics/${metric.slug}`,
      lastmod: metricsLastmod,
      changefreq: 'monthly',
      priority: '0.8'
    });
  }

  // ── Valuation pages ─────────────────────────────────────────────
  const valuationsFile = 'src/data/content/valuations.js';
  const valuationsLastmod = getLastModDate(valuationsFile);
  const valuationsModule = await import(join(srcDir, 'data', 'content', 'valuations.js'));
  for (const valuation of valuationsModule.VALUATION_METHODS) {
    urls.push({
      loc: `${SITE_URL}/valuation/${valuation.slug}`,
      lastmod: valuationsLastmod,
      changefreq: 'monthly',
      priority: '0.8'
    });
  }

  // ── FAQ pages ───────────────────────────────────────────────────
  const faqsFile = 'src/data/content/faqs.js';
  const faqsLastmod = getLastModDate(faqsFile);
  const faqsModule = await import(join(srcDir, 'data', 'content', 'faqs.js'));

  // FAQ index page
  urls.push({
    loc: `${SITE_URL}/faq`,
    lastmod: faqsLastmod,
    changefreq: 'monthly',
    priority: '0.8'
  });

  // Individual FAQ pages
  for (const faq of faqsModule.FAQS) {
    urls.push({
      loc: `${SITE_URL}/faq/${faq.slug}`,
      lastmod: faqsLastmod,
      changefreq: 'monthly',
      priority: '0.7'
    });
  }

  // ── Bank pages ──────────────────────────────────────────────────
  // Bank data refreshes regularly from SEC EDGAR, so use build date.
  const banksPath = join(dataDir, 'banks.json');
  if (existsSync(banksPath)) {
    const banks = JSON.parse(readFileSync(banksPath, 'utf-8'));
    for (const bank of banks) {
      if (!bank.ticker) continue; // Skip banks without tickers
      urls.push({
        loc: `${SITE_URL}/bank/${encodeURIComponent(bank.ticker)}`,
        lastmod: TODAY,
        changefreq: 'daily',
        priority: '0.7'
      });
    }
  }

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  const outputPath = join(publicDir, 'sitemap.xml');
  writeFileSync(outputPath, xml);

  console.log(`Generated sitemap.xml with ${urls.length} URLs`);
  return urls.length;
}

generateSitemap().catch(err => {
  console.error('Error generating sitemap:', err);
  process.exit(1);
});

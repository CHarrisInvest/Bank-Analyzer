/**
 * Generate sitemap.xml with all routes
 *
 * Run after prerender: node scripts/generate-sitemap.mjs
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');
const dataDir = join(__dirname, '..', 'public', 'data');
const srcDir = join(__dirname, '..', 'src');

const SITE_URL = 'https://banksift.org';
const TODAY = new Date().toISOString().split('T')[0];

async function generateSitemap() {
  const urls = [];

  // Static pages with priorities
  const staticPages = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/screener', priority: '1.0', changefreq: 'daily' },
    { path: '/screener/guide', priority: '0.8', changefreq: 'monthly' },
    { path: '/search', priority: '0.9', changefreq: 'weekly' },
    { path: '/metrics', priority: '0.9', changefreq: 'monthly' },
    { path: '/valuation', priority: '0.9', changefreq: 'monthly' },
    { path: '/glossary', priority: '0.8', changefreq: 'monthly' },
    { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
    { path: '/terms', priority: '0.3', changefreq: 'yearly' },
  ];

  for (const page of staticPages) {
    urls.push({
      loc: `${SITE_URL}${page.path}`,
      lastmod: TODAY,
      changefreq: page.changefreq,
      priority: page.priority
    });
  }

  // Metric pages
  const metricsModule = await import(join(srcDir, 'data', 'content', 'metrics.js'));
  for (const metric of metricsModule.METRICS) {
    urls.push({
      loc: `${SITE_URL}/metrics/${metric.slug}`,
      lastmod: TODAY,
      changefreq: 'monthly',
      priority: '0.8'
    });
  }

  // Valuation pages
  const valuationsModule = await import(join(srcDir, 'data', 'content', 'valuations.js'));
  for (const valuation of valuationsModule.VALUATION_METHODS) {
    urls.push({
      loc: `${SITE_URL}/valuation/${valuation.slug}`,
      lastmod: TODAY,
      changefreq: 'monthly',
      priority: '0.8'
    });
  }

  // Bank pages (only banks with tickers - matches React routing)
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

/**
 * Internal Link Audit Script
 * Scans all FAQ, metric, and valuation pages for cross-references
 * and verifies every internal link resolves to a valid route/page.
 *
 * Checks:
 * 1. FAQ relatedMetrics slugs -> valid metric slugs
 * 2. FAQ relatedValuations slugs -> valid valuation slugs
 * 3. FAQ relatedFaqs slugs -> valid FAQ slugs
 * 4. FAQ cta.target -> valid internal route
 * 5. Metric relatedFaqs slugs -> valid FAQ slugs
 * 6. Valuation relatedFaqs slugs -> valid FAQ slugs
 * 7. Orphaned FAQ pages (no incoming links from relatedFaqs)
 * 8. All FAQ cluster references -> valid cluster slugs
 * 9. Bidirectional link consistency (if A links to B, B should link back to A)
 */

import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = join(__dirname, '..', 'src');

async function audit() {
  const errors = [];
  const warnings = [];
  const info = [];

  // Load all data
  const metricsModule = await import(join(srcDir, 'data', 'content', 'metrics.js'));
  const valuationsModule = await import(join(srcDir, 'data', 'content', 'valuations.js'));
  const faqsModule = await import(join(srcDir, 'data', 'content', 'faqs.js'));

  const metrics = metricsModule.METRICS;
  const valuations = valuationsModule.VALUATION_METHODS;
  const faqs = faqsModule.FAQS;
  const clusters = faqsModule.FAQ_CLUSTERS;

  // Build lookup sets
  const metricSlugs = new Set(metrics.map(m => m.slug));
  const valuationSlugs = new Set(valuations.map(v => v.slug));
  const faqSlugs = new Set(faqs.map(f => f.slug));
  const clusterSlugs = new Set(clusters.map(c => c.slug));

  // Valid internal route prefixes
  const validStaticRoutes = new Set([
    '/', '/search', '/screener', '/screener/guide',
    '/metrics', '/valuation', '/faq', '/glossary',
    '/privacy', '/terms'
  ]);

  function isValidRoute(path) {
    if (validStaticRoutes.has(path)) return true;
    if (path.startsWith('/metrics/')) return metricSlugs.has(path.replace('/metrics/', ''));
    if (path.startsWith('/valuation/')) return valuationSlugs.has(path.replace('/valuation/', ''));
    if (path.startsWith('/faq/')) return faqSlugs.has(path.replace('/faq/', ''));
    if (path.startsWith('/bank/')) return true; // Bank routes are dynamic
    return false;
  }

  console.log('=== INTERNAL LINK AUDIT ===\n');
  console.log(`Data loaded: ${metrics.length} metrics, ${valuations.length} valuations, ${faqs.length} FAQs, ${clusters.length} clusters\n`);

  // --- Check 1: FAQ relatedMetrics ---
  console.log('--- Check 1: FAQ relatedMetrics references ---');
  for (const faq of faqs) {
    if (faq.relatedMetrics) {
      for (const slug of faq.relatedMetrics) {
        if (!metricSlugs.has(slug)) {
          errors.push(`BROKEN LINK: FAQ "${faq.slug}" relatedMetrics references non-existent metric "${slug}"`);
        }
      }
    }
  }

  // --- Check 2: FAQ relatedValuations ---
  console.log('--- Check 2: FAQ relatedValuations references ---');
  for (const faq of faqs) {
    if (faq.relatedValuations) {
      for (const slug of faq.relatedValuations) {
        if (!valuationSlugs.has(slug)) {
          errors.push(`BROKEN LINK: FAQ "${faq.slug}" relatedValuations references non-existent valuation "${slug}"`);
        }
      }
    }
  }

  // --- Check 3: FAQ relatedFaqs ---
  console.log('--- Check 3: FAQ relatedFaqs references ---');
  for (const faq of faqs) {
    if (faq.relatedFaqs) {
      for (const slug of faq.relatedFaqs) {
        if (!faqSlugs.has(slug)) {
          errors.push(`BROKEN LINK: FAQ "${faq.slug}" relatedFaqs references non-existent FAQ "${slug}"`);
        }
      }
    }
  }

  // --- Check 4: FAQ CTA targets ---
  console.log('--- Check 4: FAQ CTA target routes ---');
  for (const faq of faqs) {
    if (faq.cta && faq.cta.target) {
      if (!isValidRoute(faq.cta.target)) {
        errors.push(`BROKEN LINK: FAQ "${faq.slug}" CTA target "${faq.cta.target}" is not a valid route`);
      }
    }
  }

  // --- Check 5: FAQ cluster references ---
  console.log('--- Check 5: FAQ cluster references ---');
  for (const faq of faqs) {
    if (!clusterSlugs.has(faq.cluster)) {
      errors.push(`BROKEN REF: FAQ "${faq.slug}" references non-existent cluster "${faq.cluster}"`);
    }
  }

  // --- Check 6: Metric relatedFaqs ---
  console.log('--- Check 6: Metric relatedFaqs references ---');
  for (const metric of metrics) {
    if (metric.relatedFaqs) {
      for (const slug of metric.relatedFaqs) {
        if (!faqSlugs.has(slug)) {
          errors.push(`BROKEN LINK: Metric "${metric.slug}" relatedFaqs references non-existent FAQ "${slug}"`);
        }
      }
    }
  }

  // --- Check 7: Valuation relatedFaqs ---
  console.log('--- Check 7: Valuation relatedFaqs references ---');
  for (const val of valuations) {
    if (val.relatedFaqs) {
      for (const slug of val.relatedFaqs) {
        if (!faqSlugs.has(slug)) {
          errors.push(`BROKEN LINK: Valuation "${val.slug}" relatedFaqs references non-existent FAQ "${slug}"`);
        }
      }
    }
  }

  // --- Check 8: Duplicate FAQ slugs ---
  console.log('--- Check 8: Duplicate FAQ slugs ---');
  const seenSlugs = new Set();
  for (const faq of faqs) {
    if (seenSlugs.has(faq.slug)) {
      errors.push(`DUPLICATE: FAQ slug "${faq.slug}" appears more than once`);
    }
    seenSlugs.add(faq.slug);
  }

  // --- Check 9: Orphaned FAQ pages ---
  console.log('--- Check 9: Orphaned FAQ pages (no incoming relatedFaqs links) ---');
  const linkedFaqSlugs = new Set();
  for (const faq of faqs) {
    if (faq.relatedFaqs) {
      for (const slug of faq.relatedFaqs) {
        linkedFaqSlugs.add(slug);
      }
    }
  }
  // Also consider metric/valuation relatedFaqs
  for (const metric of metrics) {
    if (metric.relatedFaqs) {
      for (const slug of metric.relatedFaqs) {
        linkedFaqSlugs.add(slug);
      }
    }
  }
  for (const val of valuations) {
    if (val.relatedFaqs) {
      for (const slug of val.relatedFaqs) {
        linkedFaqSlugs.add(slug);
      }
    }
  }

  for (const faq of faqs) {
    if (!linkedFaqSlugs.has(faq.slug)) {
      warnings.push(`ORPHANED: FAQ "${faq.slug}" (cluster: ${faq.cluster}) has no incoming relatedFaqs links from any page`);
    }
  }

  // --- Check 10: Bidirectional relatedFaqs consistency ---
  console.log('--- Check 10: Bidirectional relatedFaqs consistency ---');
  for (const faq of faqs) {
    if (faq.relatedFaqs) {
      for (const relatedSlug of faq.relatedFaqs) {
        const relatedFaq = faqs.find(f => f.slug === relatedSlug);
        if (relatedFaq && relatedFaq.relatedFaqs && !relatedFaq.relatedFaqs.includes(faq.slug)) {
          info.push(`ONE-WAY LINK: FAQ "${faq.slug}" -> "${relatedSlug}" but no reverse link`);
        }
      }
    }
  }

  // --- Check 11: Empty relatedFaqs arrays ---
  console.log('--- Check 11: FAQs with empty relatedFaqs ---');
  for (const faq of faqs) {
    if (!faq.relatedFaqs || faq.relatedFaqs.length === 0) {
      warnings.push(`NO RELATED: FAQ "${faq.slug}" has no relatedFaqs links`);
    }
  }

  // --- Check 12: FAQ pages with no relatedMetrics and no relatedValuations ---
  console.log('--- Check 12: FAQs with no metric/valuation cross-links ---');
  for (const faq of faqs) {
    const hasMetrics = faq.relatedMetrics && faq.relatedMetrics.length > 0;
    const hasValuations = faq.relatedValuations && faq.relatedValuations.length > 0;
    if (!hasMetrics && !hasValuations) {
      info.push(`NO CROSS-LINKS: FAQ "${faq.slug}" has no relatedMetrics or relatedValuations`);
    }
  }

  // --- Summary ---
  console.log('\n========== AUDIT SUMMARY ==========\n');

  if (errors.length > 0) {
    console.log(`❌ ERRORS (${errors.length}):`);
    for (const err of errors) {
      console.log(`  ${err}`);
    }
  } else {
    console.log('✅ No broken links found!');
  }

  if (warnings.length > 0) {
    console.log(`\n⚠️  WARNINGS (${warnings.length}):`);
    for (const warn of warnings) {
      console.log(`  ${warn}`);
    }
  }

  if (info.length > 0) {
    console.log(`\nℹ️  INFO (${info.length}):`);
    // Only show first 20 info items to keep output manageable
    const showCount = Math.min(info.length, 20);
    for (let i = 0; i < showCount; i++) {
      console.log(`  ${info[i]}`);
    }
    if (info.length > showCount) {
      console.log(`  ... and ${info.length - showCount} more`);
    }
  }

  console.log(`\n--- Page Counts ---`);
  console.log(`Metrics: ${metrics.length}`);
  console.log(`Valuations: ${valuations.length}`);
  console.log(`FAQs: ${faqs.length}`);
  console.log(`Clusters: ${clusters.length}`);

  // Per-cluster breakdown
  console.log(`\n--- FAQ Count by Cluster ---`);
  for (const cluster of clusters) {
    const count = faqs.filter(f => f.cluster === cluster.slug).length;
    console.log(`  ${cluster.name} (${cluster.slug}): ${count} FAQs`);
  }

  return { errors, warnings, info };
}

audit().then(result => {
  if (result.errors.length > 0) {
    process.exit(1);
  }
}).catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});

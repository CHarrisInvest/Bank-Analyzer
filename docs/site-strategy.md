# BankSift Site Strategy & Architecture

> Current state of the site following Phase 1 implementation and post-Phase 1 fixes.
> This document is the single source of truth for site structure, URL conventions,
> and content architecture. Update it before beginning each new phase.

Last updated: 2026-02-20

---

## Table of Contents

1. [Site Overview](#site-overview)
2. [URL Structure & Routes](#url-structure--routes)
3. [Page Types & Counts](#page-types--counts)
4. [Content Data Architecture](#content-data-architecture)
5. [SEO & Pre-render Pipeline](#seo--pre-render-pipeline)
6. [Cross-linking Architecture](#cross-linking-architecture)
7. [Navigation Structure](#navigation-structure)
8. [Build Pipeline](#build-pipeline)
9. [Phase 1 Completion Summary](#phase-1-completion-summary)
10. [Known Patterns & Conventions](#known-patterns--conventions)
11. [Future Phase Notes](#future-phase-notes)

---

## Site Overview

BankSift is a free bank stock analysis platform. The frontend is a React SPA (Vite) with pre-rendered static HTML for SEO. It deploys to GitHub Pages. All financial data is sourced from SEC EDGAR filings and updated daily via GitHub Actions.

**Tech stack:** React 18, Vite, react-router-dom, react-helmet-async, GitHub Pages
**Domain:** banksift.org

---

## URL Structure & Routes

All routes are defined in `src/App.jsx`. The site uses a flat URL structure without nesting beyond one level (except bank detail pages which use a ticker parameter).

| Route Pattern | Component | Page Type |
|---|---|---|
| `/` | Home | Static |
| `/search` | Search | Tool (dynamic) |
| `/screener` | ScreenerPage | Tool (dynamic) |
| `/screener/guide` | ScreenerGuide | Static content |
| `/bank/:ticker` | BankDetail | Dynamic (342 pages) |
| `/metrics` | MetricsIndex | Static content |
| `/metrics/:slug` | MetricDetail | Content (13 pages) |
| `/valuation` | ValuationIndex | Static content |
| `/valuation/:slug` | ValuationDetail | Content (7 pages) |
| `/faq` | FaqIndex | Content index |
| `/faq/:faqSlug` | FaqDetail | Content (72 pages) |
| `/glossary` | Glossary | Static content |
| `/privacy` | Privacy | Legal |
| `/terms` | Terms | Legal |
| `*` | NotFound | 404 |

### URL Conventions

- **Slugs are kebab-case**: `what-are-bank-stocks`, `price-to-book`, `graham-number`
- **No trailing slashes**
- **FAQ URLs are flat**: `/faq/:faqSlug` (no cluster in URL). Clusters are a data-level grouping only, used for visual organization on the FAQ index page. They are NOT part of the URL structure.
- **Bank URLs use ticker symbols**: `/bank/JPM`, `/bank/BAC`
- **Content pages use descriptive slugs**: `/metrics/roe`, `/valuation/graham-number`

---

## Page Types & Counts

Total pre-rendered pages: **444**

| Category | Count | Source |
|---|---|---|
| Static pages | 9 | Hardcoded in prerender.mjs |
| FAQ pages | 73 | 1 index + 72 individual (from faqs.js) |
| Metric pages | 13 | From metrics.js METRICS array |
| Valuation pages | 7 | From valuations.js VALUATION_METHODS array |
| Bank detail pages | 342 | From banks.json (347 total, 5 skipped without tickers) |

### Static Pages (9)

1. `/` (Home)
2. `/search`
3. `/screener`
4. `/screener/guide`
5. `/metrics` (index)
6. `/valuation` (index)
7. `/glossary`
8. `/privacy`
9. `/terms`

---

## Content Data Architecture

### Data Sources

| File | Exports | Description |
|---|---|---|
| `src/data/content/metrics.js` | `METRICS` (13 entries) | Metric definitions with expansion fields |
| `src/data/content/valuations.js` | `VALUATION_METHODS` (7 entries) | Valuation method definitions with expansion fields |
| `src/data/content/faqs.js` | `FAQS` (72 entries), `FAQ_CLUSTERS` (11 entries) | FAQ content organized by topic clusters |
| `public/data/banks.json` | Bank financial data | SEC EDGAR data, updated daily |
| `public/data/bank-keywords.json` | Alternate bank names | SEO keyword mapping |

### Metric Entry Structure

Each metric in `METRICS` has:
- `slug`, `name`, `shortDescription`, `category`
- `definition`, `formula`, `interpretation`, `importance`, `dataSource`
- **Expansion fields** (Phase 1): `bankSpecificContext`, `metricConnections`, `commonPitfalls`, `acrossBankTypes`, `whatDrivesMetric`
- **FAQ teasers**: `faqTeasers[]` with `{ question, teaser, faqCluster, faqSlug }`

Metric categories: `profitability`, `efficiency`, `capital`, `valuation`, `per-share`

### Valuation Entry Structure

Each valuation in `VALUATION_METHODS` has:
- `slug`, `name`, `shortDescription`
- `overview`, `formula`, `interpretation`, `strengths`, `limitations`
- **Expansion fields** (Phase 1): `whenToUse`, `methodConnections`, `commonMistakes`, `acrossBankTypes`
- **FAQ teasers**: `faqTeasers[]` with `{ question, teaser, faqCluster, faqSlug }`

### FAQ Entry Structure

Each FAQ in `FAQS` has:
- `slug` (unique across all clusters), `question`, `cluster` (references FAQ_CLUSTERS slug)
- `clusterName`, `intentType`, `shortAnswer`, `fullAnswer`
- `relatedMetrics[]`, `relatedValuations[]`, `relatedFaqs[]`, `relatedGlossaryTerms[]`
- `cta` (optional): `{ type, target, text }`
- `metaTitle`, `metaDescription`

**Important:** FAQ slugs are globally unique. The `cluster` field is used only for grouping/display, NOT for URL construction.

### FAQ Clusters (11)

| Order | Slug | Name |
|---|---|---|
| 1 | getting-started | Getting Started with Bank Stocks |
| 2 | financial-statements | Understanding Bank Financial Statements |
| 3 | profitability | Bank Profitability Metrics |
| 4 | efficiency | Bank Efficiency and Funding |
| 5 | capital-and-risk | Capital Strength and Asset Quality |
| 6 | valuation | How to Value Bank Stocks |
| 7 | dividends | Bank Dividends and Shareholder Returns |
| 8 | interest-rates | Interest Rates and Bank Performance |
| 9 | bank-types | Understanding Bank Types |
| 10 | screening | Screening and Analysis Strategies |
| 11 | advanced | Advanced Bank Analysis |

### Glossary Structure

The glossary (`src/pages/Glossary.jsx`) combines three sources:
1. **Auto-generated from METRICS** (13 entries, category-mapped)
2. **Auto-generated from VALUATION_METHODS** (7 entries)
3. **Manual ADDITIONAL_TERMS** (76 entries)

**Total: ~96 glossary terms** across 10 categories.

Category keys and labels:
| Key | Label |
|---|---|
| `profitability-efficiency` | Profitability & Efficiency |
| `capital-regulatory` | Capital & Regulatory |
| `credit-quality` | Credit Quality & Risk |
| `valuation` | Valuation |
| `income-statement` | Income Statement |
| `funding-deposits` | Funding & Deposits |
| `banking-industry` | Banking Industry |
| `investment-analysis` | Investment Analysis |
| `balance-sheet-accounting` | Balance Sheet & Accounting |
| `data-sources` | Data Sources |

**Category overrides:** `METRIC_CATEGORY_OVERRIDES` remaps certain auto-generated metric terms to different glossary categories (e.g., EPS → income-statement, Dividend Payout Ratio → income-statement).

### Cross-linking Maps (prerender.mjs)

Two hardcoded maps in `scripts/prerender.mjs` define metric-to-valuation relationships:
- `METRIC_TO_VALUATIONS`: Maps metric slugs to related valuation method slugs
- `VALUATION_TO_METRICS`: Maps valuation method slugs to related metric slugs

---

## SEO & Pre-render Pipeline

### Dual-render Architecture

The site uses a dual-render approach:

1. **Pre-rendered static HTML** (`#seo-root`): Generated by `scripts/prerender.mjs` at build time. Contains full page content, meta tags, Open Graph data, and JSON-LD schema. Available immediately to crawlers without JavaScript.

2. **React SPA** (`#root`): Hydrates on top of the static HTML. Once bank data loads and React renders, `document.body.classList.add('react-ready')` hides the `#seo-root` content via CSS.

### Schema.org Structured Data

Schema is ONLY defined in `prerender.mjs` to avoid duplicates after React hydration. Individual page components do NOT include their own schema.

| Page Type | Schema Types |
|---|---|
| Home | FAQPage (top 3 questions) |
| Screener | BreadcrumbList, WebApplication, FAQPage |
| FAQ Index | FAQPage (first 10 questions), BreadcrumbList |
| FAQ Detail | Question/Answer, BreadcrumbList |
| Metric Detail | BreadcrumbList |
| Valuation Detail | BreadcrumbList |
| Glossary | DefinedTermSet, BreadcrumbList, FAQPage |
| Bank Detail | BreadcrumbList |

### Breadcrumb Pattern

FAQ detail pages use a 3-level breadcrumb:
```
Home > FAQ > [Question Title]
```
(Cluster name appears as non-linked text in the React breadcrumb but is NOT in the schema breadcrumb or URL.)

---

## Cross-linking Architecture

### FAQ Detail Pages

Each FAQ detail page can link to:
- **Related Metrics** → `/metrics/:slug` (via `relatedMetrics[]`)
- **Related Valuations** → `/valuation/:slug` (via `relatedValuations[]`)
- **Related FAQs** → `/faq/:slug` (via `relatedFaqs[]`)
- **Glossary** → `/glossary` (generic link on every FAQ page)
- **CTA** → Configurable target (via `cta` field)

### Metric Detail Pages

Each metric page links to:
- **Related Valuation Methods** (via `METRIC_TO_VALUATIONS` map)
- **FAQ Teasers** → `/faq/:faqSlug` (via `faqTeasers[]`)
- **Screener** (bottom CTA)

### Valuation Detail Pages

Each valuation page links to:
- **Related Metrics** (via `VALUATION_TO_METRICS` map)
- **FAQ Teasers** → `/faq/:faqSlug` (via `faqTeasers[]`)
- **Screener** (bottom CTA)

### Homepage

The homepage includes:
- Feature cards linking to Search, Screener, Metrics, Valuation
- Resource links to Screener Guide, FAQ, Glossary
- FAQ teasers with "Read more" links to individual FAQ pages

---

## Navigation Structure

Defined in `src/components/Navigation.jsx`:

**Research Section:**
- Search (`/search`)
- Screener (`/screener`)

**Learn Section:**
- Screener Guide (`/screener/guide`)
- Metrics & Ratios (`/metrics`)
- Valuation (`/valuation`)
- FAQ (`/faq`)
- Glossary (`/glossary`)

**About Section (mobile only):**
- Privacy Policy (`/privacy`)
- Terms of Service (`/terms`)

---

## Build Pipeline

### Build Command

```bash
npm run build
```

This runs sequentially:
1. `vite build` — Compiles React app to `dist/`
2. `node scripts/generate-sitemap.mjs` — Generates `public/sitemap.xml`
3. `node scripts/prerender.mjs` — Generates static HTML for all 444 pages in `dist/`

### Key Build Scripts

| Script | Command | Purpose |
|---|---|---|
| `build` | `vite build && sitemap && prerender` | Full production build |
| `prerender` | `node scripts/prerender.mjs` | Pre-render static HTML pages |
| `sitemap` | `node scripts/generate-sitemap.mjs` | Generate XML sitemap |
| `deploy` | `gh-pages -d dist` | Deploy to GitHub Pages |

### Data Pipeline (separate from build)

| Script | Purpose |
|---|---|
| `discover-banks` | Query SEC EDGAR for all bank CIK/tickers |
| `fetch-data` / `process-sec-data` | Fetch financial data from SEC EDGAR |
| `refresh-all` | Run discover + fetch in sequence |

---

## Phase 1 Completion Summary

### What Was Implemented in Phase 1

1. **Educational content pages:**
   - 13 metric detail pages with full explanations
   - 7 valuation method detail pages
   - 72 FAQ entries across 11 topic clusters
   - Screener guide page
   - Glossary page (~96 terms across 10 categories)

2. **Expansion fields on metric/valuation pages:**
   - Metrics: `bankSpecificContext`, `metricConnections`, `commonPitfalls`, `acrossBankTypes`, `whatDrivesMetric`, `faqTeasers`
   - Valuations: `whenToUse`, `methodConnections`, `commonMistakes`, `acrossBankTypes`, `faqTeasers`

3. **Cross-linking network:**
   - FAQ ↔ Metrics, FAQ ↔ Valuations, FAQ ↔ FAQ
   - Metric → Valuation, Valuation → Metric
   - FAQ teasers on metric and valuation pages
   - Generic glossary link on all FAQ pages

4. **SEO infrastructure:**
   - Pre-rendered static HTML for all pages
   - JSON-LD structured data (FAQPage, Question/Answer, DefinedTermSet, BreadcrumbList, WebApplication)
   - XML sitemap with all 444 URLs
   - Proper meta titles, descriptions, canonical URLs, Open Graph tags

### Post-Phase 1 Fixes Applied

1. **Pre-render content gaps fixed:** Metric and valuation expansion fields were missing from pre-rendered HTML (React rendered them but static HTML didn't). Fixed in prerender.mjs.

2. **Homepage/Valuation hub FAQ teasers shortened:** Full-length FAQ answers on homepage and valuation index were replaced with 1-2 sentence teasers with "Read more" links.

3. **Glossary expansion:** Expanded from ~36 to ~96 terms across 10 balanced categories (7+ per category). Added Basel Accords, G-SIB, capital ratio terms, and many other banking terms.

4. **Related Glossary Terms replaced:** Removed per-FAQ `relatedGlossaryTerms` badge links. All FAQ pages now show a generic "See the glossary" link instead.

5. **FAQ URL structure flattened:** Removed `/faq/:clusterSlug/:faqSlug` three-level URL structure. FAQ URLs are now flat: `/faq/:faqSlug`. Cluster/category is a data-level grouping only, visible as section headers on the FAQ index page. Removed FaqClusterIndex component and route entirely.

---

## Known Patterns & Conventions

### File Organization

- **Page components:** `src/pages/` — One file per page/route
- **Shared components:** `src/components/` — Layout, Navigation, SEO, ScrollToTop, NavigationLink
- **Content data:** `src/data/content/` — metrics.js, valuations.js, faqs.js
- **Financial data:** `public/data/` — banks.json, bank-keywords.json, per-bank JSON files
- **Build scripts:** `scripts/` — prerender.mjs, generate-sitemap.mjs, fetch scripts

### Schema Duplication Prevention

Schema.org structured data is defined ONLY in `scripts/prerender.mjs`. Page components include comments like:
```
// Note: Schema is provided by the prerender script (scripts/prerender.mjs)
// in the static HTML for immediate crawler access.
// Do NOT add a schema here to avoid duplicates.
```

### NavigationLink Component

Used for internal links that need to pass state (e.g., `from` and `returnPath` for back-navigation context). Wraps react-router's `Link` with additional props.

### FAQ Data Conventions

- `faqTeasers` in metrics/valuations reference FAQs by `faqCluster` and `faqSlug` properties. The `faqCluster` property is retained in the data for organizational reference but is NOT used in URL construction. Only `faqSlug` is used in links.
- `relatedFaqs` in FAQ entries reference other FAQs by slug only.
- `relatedGlossaryTerms` exists in FAQ data but is no longer rendered — replaced by a generic glossary link.

---

## Future Phase Notes

### For implementers of future phases:

1. **FAQ URLs are flat.** Any new FAQ entries only need a unique `slug`. The `cluster` field is for index page grouping only. Never put the cluster in the URL.

2. **Pre-render is required.** Any new page type or route must be added to BOTH the React router (src/App.jsx) AND the prerender script (scripts/prerender.mjs). The sitemap generator (scripts/generate-sitemap.mjs) also needs updating.

3. **Schema goes in prerender only.** Do not add JSON-LD schema in React components. Add it in prerender.mjs and include a comment in the React component noting this.

4. **Glossary auto-generation.** New metrics or valuation methods added to the data files will automatically appear in the glossary. Use `METRIC_CATEGORY_OVERRIDES` in Glossary.jsx if the auto-assigned category is wrong. Additional terms go in the `ADDITIONAL_TERMS` array.

5. **Cross-linking maps.** When adding new metrics or valuation methods, update `METRIC_TO_VALUATIONS` and `VALUATION_TO_METRICS` maps in prerender.mjs.

6. **Build order matters.** Always run `vite build` first, then sitemap, then prerender. The `npm run build` command handles this automatically.

7. **Test with build.** Always run a full `npm run build` after changes to verify page counts and check for errors. The prerender script logs page counts for each category.

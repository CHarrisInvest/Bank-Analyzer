# BankSift Content Expansion Strategy: FAQ Pages, Metric/Valuation Expansion & Implementation Guide

## Table of Contents

1. [Site Review Summary](#1-site-review-summary)
2. [Technical Architecture & Implementation Reference](#2-technical-architecture--implementation-reference)
3. [Strategic Framework](#3-strategic-framework)
4. [New Metric Pages](#4-new-metric-pages)
5. [New Valuation Method Pages](#5-new-valuation-method-pages)
6. [Existing Metric & Valuation Page Expansion](#6-existing-metric--valuation-page-expansion)
7. [Glossary Expansion](#7-glossary-expansion)
8. [FAQ Content: Complete Question List by Cluster](#8-faq-content-complete-question-list-by-cluster)
9. ["How to Calculate" FAQ Pages](#9-how-to-calculate-faq-pages)
10. [Topical Map & Internal Linking Matrix](#10-topical-map--internal-linking-matrix)
11. [Cannibalization Management](#11-cannibalization-management)
12. [Content Tone & Style Guidelines](#12-content-tone--style-guidelines)
13. [Exact Data Structures & Cross-Linking Requirements](#13-exact-data-structures--cross-linking-requirements)
14. [Implementation Workflow & Content Generation Plan](#14-implementation-workflow--content-generation-plan)
15. [Claude Code Implementation Instructions](#15-claude-code-implementation-instructions)
16. [Phased Rollout Plan](#16-phased-rollout-plan)

---

## 1. Site Review Summary

### Current Content Footprint

BankSift currently has the following content structure:

**Interactive Tools:**
- Bank Screener (/screener) — filter 300+ banks by 25+ metrics
- Bank Search (/search) — find banks by name, ticker, or CIK
- Screener Guide (/screener/guide) — usage instructions and 3 screening strategies

**Educational Content:**
- Metrics hub (/metrics) — index page linking to 13 individual metric pages
- Valuation hub (/valuation) — index page linking to 7 valuation method pages
- Glossary (/glossary) — ~30 defined terms

**13 Existing Metric Pages:**
ROE, ROAA, NIM, Efficiency Ratio, P/B, P/E, EPS, BVPS, Equity to Assets, Loans to Deposits, Deposits to Assets, Loans to Assets, Dividend Payout Ratio

**7 Existing Valuation Method Pages:**
Graham Number, Margin of Safety, Dividend Discount Model, P/B Valuation, P/E Valuation, Peer Comparison Analysis, ROE-P/B Framework

**Static Pages:**
Homepage, Privacy Policy, Terms of Service

**Current page count:** ~371 total (342 bank pages + 13 metric + 7 valuation + 9 static/hub pages)

### Content Gaps This Strategy Fills

1. **Beginner bridge content** — nothing currently exists for users discovering bank stocks for the first time
2. **Practical/contextual metric questions** — existing metric pages explain *what* metrics are but not *how to use them in practice* or *what constitutes good/bad values*
3. **Decision-oriented valuation content** — existing valuation pages explain methods but don't address practical application questions
4. **Bank-specific calculation guidance** — no content on alternative calculation methods, where to find inputs, or bank-specific calculation nuances
5. **Capital strength and asset quality metrics** — major gap; CET1, Tier 1, Texas Ratio, NPL, net charge-offs, and other critical bank analysis metrics have no pages
6. **Screening strategy content** — only 3 basic strategies exist; no content connecting metrics to screening decisions
7. **Glossary depth** — many terms referenced in the expanded content are not yet defined

---

## 2. Technical Architecture & Implementation Reference

### Site Architecture Overview

BankSift is a **React 18 single-page application** built with **Vite 5**, deployed to **GitHub Pages**. There are no Markdown files or static site generators. Everything is JavaScript/JSX.

### Template + Data Pattern

The site uses reusable React components as templates with content driven by JavaScript data arrays. This is the critical pattern for all new content:

| Page Type | Template Component | Data Source |
|---|---|---|
| Bank pages (/bank/:ticker) | `src/pages/BankDetail.jsx` | `public/data/banks.json` + `public/data/banks/{CIK}.json` |
| Metric pages (/metrics/:slug) | `src/pages/MetricDetail.jsx` | `METRICS` array in `src/data/content/metrics.js` |
| Valuation pages (/valuation/:slug) | `src/pages/ValuationDetail.jsx` | `VALUATION_METHODS` array in `src/data/content/valuations.js` |
| Index pages (/metrics, /valuation) | Standalone `.jsx` components | Iterate over same data arrays |
| Static pages | Standalone `.jsx` in `src/pages/` | Content inline in JSX |

### Build Pipeline

```
npm run build
  → vite build              (bundles React SPA)
  → generate-sitemap.mjs    (creates sitemap.xml from data + route definitions)
  → prerender.mjs           (generates static HTML for all routes — ~1,800 lines)
```

Post-deploy: GitHub Actions notifies Bing/Yandex via IndexNow. Bank data updates daily from SEC EDGAR with automatic rebuild/redeploy on data changes.

### How to Add New Content (Reference for All Sections Below)

**To add a new page within an existing type** (e.g., a new metric):
→ Add an entry to the corresponding data array (e.g., `metrics.js`)
→ The existing template component, prerender block, and sitemap generator handle the rest

**To add a new page type** (e.g., FAQ pages):
→ Create a new data array file (e.g., `src/data/content/faqs.js`)
→ Create template component(s) in `src/pages/`
→ Add route(s) in `src/App.jsx`
→ Add pre-rendering block in `scripts/prerender.mjs`
→ Add route enumeration in `scripts/generate-sitemap.mjs`
→ Update internal linking in relevant existing components/data

### Files That Will Be Modified or Created

| Change | Files |
|---|---|
| New FAQ page type | New: `src/data/content/faqs.js`, `src/pages/FaqDetail.jsx`, `src/pages/FaqClusterIndex.jsx`, `src/pages/FaqIndex.jsx` |
| New FAQ routes | Modified: `src/App.jsx` |
| New FAQ pre-rendering | Modified: `scripts/prerender.mjs` |
| New FAQ sitemap entries | Modified: `scripts/generate-sitemap.mjs` |
| New/expanded metric content | Modified: `src/data/content/metrics.js` |
| New/expanded valuation content | Modified: `src/data/content/valuations.js` |
| Expanded glossary | Modified: glossary component in `src/pages/` |
| Updated internal links on existing pages | Modified: relevant `.jsx` components and data arrays |
| Updated existing page FAQs (teasers) | Modified: `src/pages/MetricDetail.jsx`, `src/pages/ValuationDetail.jsx`, homepage component |

---

## 3. Strategic Framework

### 3.1 Content Differentiation Strategy

BankSift's content advantage is **bank specificity**. Every page should demonstrate expertise that a general finance site cannot match. This means:

**Always frame through a banking lens.** When explaining ROE, don't explain what ROE means generically — explain why ROE behaves differently for banks (leverage dynamics, regulatory capital constraints, provision volatility). When discussing P/E, explain why P/E is used cautiously for banks compared to other sectors and when it breaks down.

**Connect metrics to each other in bank-specific ways.** Show how NIM flows through to ROE via the DuPont decomposition. Explain why Efficiency Ratio and ROE often move together for banks but can diverge. Describe why P/B and ROE are linked through the justified P/B framework. These connections are the kind of insight that only a bank-focused site provides naturally.

**Address bank-specific pitfalls and misapplications.** Explain why EV/EBITDA doesn't work for banks. Discuss why comparing a community bank's efficiency ratio to a money center bank is misleading. Note that a P/B below 1.0 doesn't automatically mean undervalued if the bank has asset quality problems.

**Provide practical, actionable guidance.** Don't just define a formula — explain where to find each input in actual SEC filings, what adjustments to consider, and what the result means for an investment decision.

### 3.2 Evergreen Content Philosophy

**All FAQ pages should contain content that remains accurate and useful without requiring regular updates.** This means:

**Do include:**
- Foundational concepts and definitions (what is ROE, how do banks make money)
- Formulas, calculation methods, and alternative approaches
- Typical/historical ranges with clear sourcing and time period references (e.g., "US banks have historically averaged ROE between 8-12% based on FDIC data")
- Explanations of *how* metrics, regulations, and market dynamics work in principle
- References to historical events as illustrative examples when framed as lessons (e.g., "periods of rapidly rising rates have historically compressed bank margins initially before expanding them" rather than "in 2022, the Fed raised rates and banks saw...")

**Do not include:**
- Current metric averages that would go stale (unless dynamically sourced — see Section 3.8)
- Active regulatory proposals or pending legislation
- Current Fed policy stance or rate expectations
- Specific recent events as primary content (COVID impacts, SVB failure, 2023 banking crisis)
- Any claim that depends on a specific date remaining current

**Content moved to future blog/insights section (not part of this FAQ implementation):**
- History and evolution of Basel III and stress testing
- Detailed Dodd-Frank Act analysis
- The Volcker Rule's impact
- SIFI designation and too-big-to-fail analysis
- 2008 financial crisis detailed narrative
- COVID-19 impact on bank dividends
- 2023 banking crisis (SVB, Signature, First Republic) narrative
- Current regulatory environment analysis

### 3.3 Call-to-Action Guidelines

**Only reference the screener when the FAQ topic directly involves a metric available as a screener column or filter.**

**Current screener metrics (eligible for screener CTAs):**
ROE, ROAA, NIM, Efficiency Ratio, P/B, P/E, EPS, BVPS, Equity to Assets, Loans to Deposits, Deposits to Assets, Loans to Assets, Dividend Payout Ratio, Graham Number, Margin of Safety, Market Cap, Total Assets, Share Price, Shares Outstanding, Total Equity, Net Income, Total Deposits, Total Loans, Interest Income, Interest Expense, Non-Interest Income, Non-Interest Expense, Revenue

**For topics that don't map to a screener filter**, the CTA should direct users to:
- Learn more about a related metric or valuation method on BankSift
- Explore related FAQ pages on adjacent topics
- Use Bank Search to look up a specific bank's profile
- Visit the glossary for related term definitions

**For new metric pages that are educational only** (capital ratios, Texas Ratio, NPL, etc.): The page should NOT suggest using the metric in the screener. The CTA should direct users to related educational content, the glossary, or metrics that ARE available in the screener.

**Implementation note for Claude Code:** Each FAQ entry in the data array should include a `cta` field specifying the appropriate call-to-action type and target. See Section 13.3 for data structure details.

### 3.4 Data Sourcing Guidelines

**All factual claims, statistics, and examples must come from authoritative, verifiable external sources — not from BankSift's own screener or calculated data.**

**Source requirements by content type:**

| Content Type | Required Source | Examples |
|---|---|---|
| Industry statistics (avg ROE, avg NIM, bank count) | FDIC, Federal Reserve, FFIEC | FDIC Quarterly Banking Profile |
| Typical metric ranges | FDIC/Fed aggregate data, academic literature | "US banks have historically averaged NIM of 3.0-3.5% (FDIC)" |
| Regulatory thresholds | Regulatory agency publications | "Minimum CET1 ratio of 4.5% (Federal Reserve)" |
| Individual bank examples | SEC EDGAR filings, FDIC call reports, bank IR materials | Do not use BankSift calculated fields |
| Historical events | FDIC reports, Federal Reserve publications, NBER | FDIC failure reports, Fed crisis analyses |
| Formulas and definitions | FFIEC instructions, regulatory definitions, standard accounting references | FFIEC Uniform Bank Performance Report instructions |

**Recommended authoritative sources:**
- FDIC (fdic.gov) — bank statistics, failure data, deposit insurance, industry aggregates
- Federal Reserve (federalreserve.gov) — monetary policy, capital requirements, stress tests, aggregate data
- FFIEC (ffiec.gov) — call report data, Uniform Bank Performance Reports
- SEC EDGAR (sec.gov/edgar) — individual bank filings (10-K, 10-Q)
- OCC (occ.gov) — national bank regulation
- Federal Reserve Bank of St. Louis FRED (fred.stlouisfed.org) — economic data series
- NBER (nber.org) — business cycle dating, recession research

**Critical distinction:** BankSift should be positioned as a tool for users to explore and analyze current data themselves, while the editorial/educational content is grounded in independently verifiable sources. This builds trust and avoids the appearance of self-referencing.

**Implementation note for Claude Code:** Where content references specific statistics, include the source in the data array field so it can be rendered as a citation or footnote on the page.

### 3.5 Search Intent Segmentation

Each FAQ page targets a specific search intent type. This affects page structure, content depth, and formatting.

**Intent types and their page structure:**

| Intent Type | Description | Page Structure | Example Questions |
|---|---|---|---|
| **Definitional** | "What is X?" | Lead with clear definition, then bank-specific context, then connections to related concepts | "What is net interest margin?" |
| **Evaluative** | "What is a good X?" / "How do I interpret X?" | Lead with the answer/range, then explain why, then caveats and context | "What is a good ROE for a bank?" |
| **Comparative** | "X vs Y" / "What is the difference between X and Y?" | Lead with the key distinction, then when to use each, then practical implications | "ROE vs ROAA: when should I use each?" |
| **Procedural** | "How do I calculate/do X?" | Lead with the formula/steps, then alternatives, then bank-specific nuances and where to find inputs | "How do I calculate tangible book value?" |
| **Strategic** | "How do I use X to do Y?" | Lead with the approach, then walk through the logic, then connect to BankSift tools where appropriate | "How do I screen for undervalued bank stocks?" |
| **Conceptual** | "Why does X happen/matter?" | Lead with the explanation, then supporting detail, then implications for investors | "Why is P/B the primary valuation metric for banks?" |

**Implementation note for Claude Code:** Each FAQ entry in the data array should include an `intentType` field (one of: `definitional`, `evaluative`, `comparative`, `procedural`, `strategic`, `conceptual`). This can be used by the template component to adjust page structure or by the prerender script for structured data markup.

### 3.6 Metric & Valuation Page Expansion Guidelines

**Every existing and new metric page should be expanded beyond the current template to include the following sections where applicable:**

| Section | Description | Applies To |
|---|---|---|
| Overview | What the metric is and why it matters (existing) | All |
| Formula | Primary calculation formula (existing) | All |
| Bank-Specific Context | Why this metric behaves differently for banks vs other industries | All |
| Interpretation | How to read the metric, what high/low values signal (existing, expanded) | All |
| Typical Range | Historical range for US banks with authoritative source citation | All where data available |
| What Drives This Metric | Specific bank-level and macro-level factors that cause the metric to move up or down | All |
| Common Pitfalls | Misreadings, misapplications, and traps specific to using this metric for bank analysis | All where applicable |
| Metric Connections | How this metric relates to and interacts with other bank metrics (e.g., DuPont decomposition, ROE-P/B relationship) | All where connections exist |
| Across Bank Types | How the metric typically differs across community, regional, and money center banks | All where meaningful differences exist |
| Related Metrics | Links to related metric pages (existing, expanded) | All |
| Related Valuation Methods | Links to valuation pages that use this metric (existing) | All where applicable |
| FAQ Teasers | 2-3 most relevant FAQ questions with brief teaser answers linking to full FAQ pages | All |
| Data Source | Where the data comes from and how it's calculated on BankSift (existing) | Metrics available in screener |

**For new metric pages that are educational only** (not in screener): Include all sections above except "Data Source" should be replaced with "Where to Find This Data" explaining where investors can look up this metric for individual banks (e.g., FDIC call reports, bank 10-K filings, Federal Reserve data).

**The same expansion approach applies to valuation method pages**, with section names adjusted as appropriate (e.g., "Method Steps" instead of "Formula," "When to Use This Method" instead of "Typical Range," "Method Limitations" instead of "Common Pitfalls").

**Implementation note for Claude Code:** The existing data array fields in `metrics.js` and `valuations.js` will need to be extended with new fields for the additional sections. See Section 6.2 for the updated data structures and Section 13 for conventions. The template components (`MetricDetail.jsx`, `ValuationDetail.jsx`) will need to render these new sections conditionally (only when the field is present and non-empty, so existing pages can be expanded incrementally).

### 3.7 Cannibalization Management

**Problem:** The homepage currently has 6 FAQ questions, and the valuation page has 3 FAQ questions. Once dedicated FAQ pages exist for these topics, having full answers on both the hub page and the FAQ page creates duplicate content that competes with itself in search results.

**Solution: Convert existing FAQs on hub pages to teasers.**

For every FAQ currently appearing on the homepage, metrics hub, valuation hub, or individual metric/valuation pages:
1. Shorten the answer to 1-2 sentences (a teaser)
2. Add a "Read more →" link to the full dedicated FAQ page
3. Retain the question text as-is (it serves as an anchor for the teaser)

**Additionally:** Review which FAQs appear on each page and ensure only the most relevant and strongest questions remain. The goal is 2-3 FAQ teasers per page, not an exhaustive list.

**Add a visible link to the FAQ section** from:
- Homepage (in the "What You Can Do" section or a new "Learn More" section)
- Metrics hub page (after the metric listings)
- Valuation hub page (after the method listings)
- Each individual metric page (in the FAQ Teasers section described above)
- Each individual valuation page (in the FAQ Teasers section described above)

**Implementation note for Claude Code:** The existing FAQ content in the homepage JSX and the valuation page data/JSX should be edited to shortened teasers with links. The FAQ teaser data for metric and valuation pages should be part of the expanded data array fields (see Section 6). Add a `/faq` link to the site navigation alongside the existing Metrics, Valuation, and Glossary links.

### 3.8 Programmatic/Semi-Dynamic Content

**Limited use, only where data can be updated automatically from trusted external sources without manual maintenance.**

**Eligible for dynamic treatment:**
- Count of banks tracked on BankSift (already derived from the data pipeline)
- Aggregate statistics that can be computed from the existing SEC EDGAR data pipeline at build time (e.g., median P/B across all tracked banks) — but these should be clearly labeled as "BankSift calculated from SEC filings" and not presented as authoritative industry statistics

**Not eligible (requires manual maintenance):**
- FDIC or Federal Reserve aggregate statistics
- Regulatory thresholds
- Any data not already in the automated pipeline

**Implementation approach:** If dynamic data is used, compute it in the build pipeline (e.g., in `prerender.mjs` or a new build script that reads from `banks.json`) and inject it into the pre-rendered HTML. The React component can also compute it client-side from loaded data. Always include a "last updated" indicator and clear labeling of the data source.

**Recommendation:** Keep this minimal for now. The evergreen editorial content is the priority. Dynamic data can be layered in later once the content foundation is solid.

---

## 4. New Metric Pages

These metrics should be added to the `METRICS` array in `src/data/content/metrics.js` following the expanded page structure defined in Section 3.6. Each entry should include all applicable fields.

### 4.1 Capital Strength Metrics (New Category)

These are **educational pages only** — these metrics are not currently in the screener or data pipeline. Pages should not suggest using these metrics in the screener. The "Where to Find This Data" section should direct users to FDIC call reports, Federal Reserve FR Y-9C filings, or the bank's own 10-K/10-Q disclosures.

| # | Metric | Slug | Description |
|---|---|---|---|
| 1 | CET1 Capital Ratio | `cet1-capital-ratio` | Common Equity Tier 1 capital divided by risk-weighted assets. The highest-quality capital measure under Basel III. |
| 2 | Tier 1 Capital Ratio | `tier-1-capital-ratio` | Tier 1 capital (CET1 + additional Tier 1) divided by risk-weighted assets. |
| 3 | Total Capital Ratio | `total-capital-ratio` | Total regulatory capital (Tier 1 + Tier 2) divided by risk-weighted assets. |
| 4 | Tier 1 Leverage Ratio | `tier-1-leverage-ratio` | Tier 1 capital divided by average total consolidated assets. Not risk-weighted. |
| 5 | Supplementary Leverage Ratio (SLR) | `supplementary-leverage-ratio` | Tier 1 capital divided by total leverage exposure (on- and off-balance sheet). Applies to large banks. |
| 6 | Tangible Common Equity (TCE) Ratio | `tangible-common-equity-ratio` | Tangible common equity divided by tangible assets. A conservative capital measure used by analysts. |
| 7 | Risk-Weighted Assets Density | `risk-weighted-assets-density` | Risk-weighted assets divided by total assets. Indicates how conservative or aggressive a bank's asset risk profile is. |

### 4.2 Asset Quality Metrics (New Category)

Also **educational pages only** — not in screener.

| # | Metric | Slug | Description |
|---|---|---|---|
| 8 | Non-Performing Loans (NPL) Ratio | `non-performing-loans-ratio` | Non-performing loans divided by total loans. Measures credit quality deterioration. |
| 9 | Non-Performing Assets (NPA) Ratio | `non-performing-assets-ratio` | Non-performing assets (NPLs + OREO) divided by total assets. Broader measure of problem assets. |
| 10 | Net Charge-Off Ratio | `net-charge-off-ratio` | Net charge-offs divided by average loans. Measures actual loan losses realized. |
| 11 | Loan Loss Reserve Ratio | `loan-loss-reserve-ratio` | Allowance for loan losses divided by total loans. Measures provisioning adequacy. |
| 12 | Reserve Coverage Ratio | `reserve-coverage-ratio` | Allowance for loan losses divided by non-performing loans. Measures how well reserves cover known problems. |
| 13 | Texas Ratio | `texas-ratio` | Non-performing assets divided by (tangible common equity + loan loss reserves). Stress indicator; above 100% is critical concern. |
| 14 | Provision for Credit Losses to Average Loans | `provision-to-average-loans` | Annual provision expense divided by average loans. Measures current period provisioning intensity. |

### 4.3 Additional Profitability Metrics

| # | Metric | Slug | Educational Only? | Description |
|---|---|---|---|---|
| 15 | Return on Tangible Common Equity (ROTCE) | `return-on-tangible-common-equity` | Yes | Net income divided by average tangible common equity. Strips out goodwill/intangibles for a purer profitability view. |
| 16 | Pre-Provision Net Revenue (PPNR) | `pre-provision-net-revenue` | Yes | Net revenue minus non-interest expense, before provision for credit losses. Measures core earnings power. |
| 17 | Net Overhead Ratio | `net-overhead-ratio` | Yes | (Non-interest expense minus non-interest income) divided by average assets. Measures burden of non-lending operations. |

### 4.4 Additional Valuation Metrics

| # | Metric | Slug | Educational Only? | Description |
|---|---|---|---|---|
| 18 | Price to Tangible Book Value (P/TBV) | `price-to-tangible-book-value` | Yes | Market price divided by tangible book value per share. More conservative than P/B; strips out goodwill. |
| 19 | Tangible Book Value Per Share (TBVPS) | `tangible-book-value-per-share` | Yes | (Total equity minus intangible assets minus goodwill) divided by shares outstanding. |

### 4.5 Additional Efficiency/Funding Metrics

| # | Metric | Slug | Educational Only? | Description |
|---|---|---|---|---|
| 20 | Cost of Funds | `cost-of-funds` | Yes | Total interest expense divided by average interest-bearing liabilities. Measures the cost of a bank's funding base. |
| 21 | Cost of Deposits | `cost-of-deposits` | Yes | Interest expense on deposits divided by average deposits. Measures what the bank pays depositors. |
| 22 | Non-Interest Income to Revenue Ratio | `non-interest-income-to-revenue` | Yes | Non-interest income divided by total revenue. Measures fee income diversification. |
| 23 | Interest Income to Average Earning Assets | `interest-income-to-earning-assets` | Yes | Yield on the bank's interest-earning asset base. |

**Total new metric pages: 23**
**New total metric pages: 36** (13 existing + 23 new)

### Metric Page Categorization (Updated)

For the metrics hub page (/metrics) and navigation, the updated category structure should be:

1. **Profitability Ratios** — ROE, ROAA, NIM, ROTCE, PPNR, Net Overhead Ratio
2. **Efficiency & Funding Ratios** — Efficiency Ratio, Deposits to Assets, Loans to Deposits, Cost of Funds, Cost of Deposits, Non-Interest Income to Revenue, Interest Income to Earning Assets
3. **Capital Strength Ratios** — Equity to Assets, TCE Ratio, CET1, Tier 1, Total Capital, Leverage Ratio, SLR, RWA Density
4. **Asset Quality Ratios** — NPL Ratio, NPA Ratio, Net Charge-Off Ratio, Loan Loss Reserve Ratio, Reserve Coverage Ratio, Texas Ratio, Provision to Average Loans
5. **Valuation Metrics** — BVPS, TBVPS, P/B, P/TBV, P/E, EPS, Dividend Payout Ratio
6. **Balance Sheet Ratios** — Loans to Assets (existing)

---

## 5. New Valuation Method Pages

These should be added to the `VALUATION_METHODS` array in `src/data/content/valuations.js` following the expanded page structure.

| # | Method | Slug | Description |
|---|---|---|---|
| 1 | Price to Tangible Book Value Valuation | `price-to-tangible-book-valuation` | Valuing banks using P/TBV rather than P/B, with guidance on when TBV is more appropriate (banks with significant goodwill from acquisitions). |
| 2 | Excess Capital Return Model | `excess-capital-return-model` | Valuing a bank based on the return it generates on capital above regulatory minimums. Separates "required" capital from "deployable" capital. |
| 3 | Discounted Earnings Model | `discounted-earnings-model` | Present value of expected future earnings, adapted for bank-specific considerations (provision normalization, capital constraints on growth). |
| 4 | Gordon Growth Model (Bank Application) | `gordon-growth-model` | Simplified DDM variant (P = D1 / (r - g)) applied specifically to bank stocks, with discussion of how to estimate sustainable growth rate for banks using ROE and retention ratio. |
| 5 | DuPont Decomposition for Banks | `dupont-decomposition` | Breaking ROE into component drivers (profit margin × asset utilization × equity multiplier) adapted for bank-specific financial structure. Not a valuation method per se, but a fundamental framework that informs all bank valuation. |

**Total new valuation pages: 5**
**New total valuation pages: 12** (7 existing + 5 new)

---

## 6. Existing Metric & Valuation Page Expansion

### 6.1 Content Additions for Each Existing Metric Page

Below is a guide for the specific bank-relevant content to add to each of the 13 existing metric pages. This content populates the new expanded fields defined in Section 3.6.

**ROE (/metrics/roe)**
- Bank-Specific Context: Banks are inherently leveraged; ROE reflects both management quality AND leverage level. Regulatory capital requirements cap leverage and therefore constrain maximum ROE. A bank with 10:1 leverage and 1% ROA produces 10% ROE.
- Metric Connections: ROE = ROA × Equity Multiplier (DuPont). ROE determines justified P/B ratio (ROE-P/B framework). P/B = P/E × ROE. Sustainable growth rate = ROE × retention ratio.
- Common Pitfalls: Very high ROE may indicate thin capital rather than superior management. One-time gains can inflate ROE temporarily. ROE is less meaningful during periods of elevated credit losses. Comparing ROE across banks with different leverage levels without adjusting is misleading.
- Across Bank Types: Money center banks typically target 12-15% ROE. Well-run community banks often achieve 10-13%. Banks with excess capital may show lower ROE despite strong operations.
- What Drives This Metric: Net income (numerator) is driven by NIM, fee income, efficiency, and provision expense. Equity (denominator) is driven by retained earnings, capital raises, buybacks, and regulatory requirements.

**ROAA (/metrics/roaa)**
- Bank-Specific Context: ROAA removes leverage from the equation, showing how productively the bank uses its asset base regardless of capital structure. This makes it more comparable across banks with different capital levels.
- Metric Connections: ROE = ROAA × (Assets/Equity). If ROAA is strong but ROE is weak, the bank may be overcapitalized. ROAA combined with Equity to Assets reveals the leverage multiplier.
- Common Pitfalls: Asset size can be inflated by securities portfolios that earn low returns, dragging ROAA down even for operationally efficient banks. ROAA doesn't distinguish between loan-driven and securities-driven asset bases.
- What Drives This Metric: NIM on earning assets, non-interest income, operating efficiency, and credit losses.

**NIM (/metrics/net-interest-margin)**
- Bank-Specific Context: NIM is the single most important profitability driver for traditional banks. It measures the spread between what a bank earns on loans/investments and what it pays on deposits/borrowings relative to earning assets.
- Metric Connections: NIM is the largest component of ROAA for most banks. NIM × earning assets = net interest income. NIM combined with the efficiency ratio determines how much of the spread flows to the bottom line.
- Common Pitfalls: Higher NIM can indicate riskier lending (subprime, high-yield CRE). Comparing NIM across banks with very different asset mixes is misleading. NIM is compressed during flat or inverted yield curves even at well-run banks.
- Across Bank Types: Community banks focused on relationship lending often achieve higher NIMs (3.5-4.5%) than money center banks (2.0-3.0%) whose asset mix includes more low-yield securities and wholesale lending.
- What Drives This Metric: Interest rate environment, yield curve shape, loan mix (CRE vs residential vs C&I), deposit mix (non-interest-bearing vs CDs), competition for deposits, pace of loan repricing.

**Efficiency Ratio (/metrics/efficiency-ratio)**
- Bank-Specific Context: For banks, the efficiency ratio specifically measures non-interest expense divided by the sum of net interest income and non-interest income (total revenue). Lower is better — it means less cost to generate each dollar of revenue.
- Metric Connections: Directly impacts net income and therefore ROE and ROAA. Efficiency ratio improvements are sometimes called the "efficiency dividend" in bank M&A analysis.
- Common Pitfalls: Different business lines have inherently different efficiency ratios. Wealth management divisions typically run 65-75% efficiency ratios but with high ROE due to low capital needs. Comparing a wealth-management-heavy bank to a pure lending bank on efficiency ratio alone is misleading.
- Across Bank Types: Large money center banks often achieve 55-60%. Well-run community banks target 55-65%. Banks under 50% are exceptional. Banks above 70% may have structural cost problems.
- What Drives This Metric: Salary and benefits expense (largest component), branch network costs, technology investment, regulatory compliance costs, revenue growth rate vs expense growth rate.

**P/B (/metrics/price-to-book)**
- Bank-Specific Context: P/B is the primary valuation metric for banks because bank assets are mostly financial instruments carried near fair value on the balance sheet, making book value a more meaningful measure of net asset value than for industrial companies.
- Metric Connections: Justified P/B = (ROE - g) / (r - g) where g is growth rate and r is cost of equity (ROE-P/B framework). P/B = P/E × ROE. A bank trading at P/B of 1.0 with ROE of 12% implies P/E of ~8.3x.
- Common Pitfalls: Book value may not reflect true economic value due to held-to-maturity securities carried at amortized cost, understated loan loss reserves, or goodwill from acquisitions. P/B below 1.0 does not automatically mean undervalued — it may reflect the market pricing in asset quality problems, earnings weakness, or management concerns.
- Across Bank Types: High-performing banks with strong ROE and growth prospects may trade at 1.5-2.5x book. Average banks trade around 1.0-1.3x. Banks with asset quality concerns or weak earnings may trade below book value.

**P/E (/metrics/price-to-earnings)**
- Bank-Specific Context: P/E is useful for banks during normal earnings periods but becomes less reliable when credit losses spike (earnings become temporarily depressed) or during unusual gain events. It's best used alongside P/B.
- Metric Connections: P/E × ROE = P/B. P/E captures the market's view of earnings power; P/B captures the market's view of asset value. Divergence between what P/E and P/B imply can signal opportunities.
- Common Pitfalls: Provision for credit losses makes bank earnings more volatile than most industries. A bank may have a high P/E simply because a spike in provisions temporarily depressed earnings. P/E is nearly useless for banks with negative or near-zero earnings.
- What Drives This Metric: Market sentiment, earnings growth expectations, interest rate outlook, perceived credit quality, overall market multiple levels.

**EPS (/metrics/earnings-per-share)**
- Bank-Specific Context: For banks, EPS is heavily influenced by provision for credit losses, which can swing significantly quarter to quarter. Preferred stock dividends must be subtracted from net income to arrive at EPS available to common shareholders — relevant because many banks have preferred shares outstanding.
- Metric Connections: EPS is the numerator input to P/E and one of two inputs to the Graham Number. EPS = ROE × BVPS. TTM EPS calculated from quarterly filings may differ slightly from the annual 10-K figure due to timing of items.
- Common Pitfalls: Watch for basic vs diluted EPS — use diluted for investment analysis. One-time items (securities gains/losses, legal settlements, tax adjustments) can distort EPS in any given period. Comparing EPS across banks is meaningless without normalizing for share count.

**BVPS (/metrics/book-value-per-share)**
- Bank-Specific Context: BVPS represents the per-share accounting net asset value of the bank. For banks, this is more closely tied to economic value than for most industries because bank assets are primarily financial instruments.
- Metric Connections: BVPS is the denominator in P/B ratio and one of two inputs to the Graham Number. BVPS growth rate over time reflects retained earnings growth (internal capital generation). BVPS = Total Equity / Shares Outstanding.
- Common Pitfalls: BVPS includes intangible assets and goodwill, which may overstate tangible net asset value for banks that have made acquisitions. TBVPS strips these out for a more conservative view. AOCI (accumulated other comprehensive income/loss) can cause BVPS to fluctuate with unrealized securities gains/losses.

**Equity to Assets (/metrics/equity-to-assets)**
- Bank-Specific Context: This is the simplest measure of a bank's capital adequacy — the percentage of assets funded by equity rather than debt/deposits. Higher ratios indicate more capital cushion but may also indicate excess capital that could be deployed more productively.
- Metric Connections: The inverse of this ratio is the equity multiplier, which links ROAA to ROE (ROE = ROAA × Assets/Equity). Equity to Assets provides a quick sanity check on leverage without the complexity of risk-weighted capital ratios.
- Common Pitfalls: Equity to Assets doesn't account for the riskiness of the asset base (unlike CET1 or Tier 1 ratios which use risk-weighted assets). A bank with 10% equity-to-assets invested entirely in US Treasuries is in a very different position than one with 10% invested heavily in subprime loans.
- Across Bank Types: Community banks often run 8-12%. Large banks may run lower (7-10%) due to more diversified asset bases and explicit regulatory capital management. De novo (new) banks often start with very high ratios (15%+) that decline as they grow their loan book.

**Loans to Deposits (/metrics/loans-to-deposits)**
- Bank-Specific Context: Measures how aggressively a bank is lending relative to its deposit base. A bank is essentially an intermediary that transforms deposits into loans, and this ratio measures the intensity of that transformation.
- Metric Connections: Combined with NIM, indicates whether the bank is effectively deploying its funding into higher-yielding loans. High L/D with high NIM suggests efficient intermediation.
- Common Pitfalls: Very high L/D (above 100%) means the bank is funding some loans with non-deposit sources (borrowings, bonds), which are typically more expensive and less stable. Very low L/D may indicate the bank is underutilizing its deposit base or investing heavily in securities rather than lending.
- What Drives This Metric: Loan demand in the bank's markets, management's appetite for growth, deposit growth, competition for loans and deposits.

**Deposits to Assets (/metrics/deposits-to-assets)**
- Bank-Specific Context: Measures how much of the bank's funding comes from customer deposits vs other sources (borrowings, equity, other liabilities). Higher ratios generally indicate more stable, lower-cost funding.
- Metric Connections: Combined with Cost of Funds/Cost of Deposits (new metric pages), indicates funding efficiency. Banks with high deposit-to-asset ratios and low cost of deposits have a structural profitability advantage.
- What Drives This Metric: Branch network, market share, deposit pricing strategy, mix of deposit types (non-interest-bearing checking is free funding; CDs are rate-sensitive).

**Loans to Assets (/metrics/loans-to-assets)**
- Bank-Specific Context: Indicates what portion of the bank's assets are deployed in loans (the core earning asset). The remainder is typically in securities, cash, and other assets.
- Metric Connections: Higher L/A ratios generally support higher NIM (loans yield more than securities) but also indicate higher credit risk exposure.
- Common Pitfalls: The ratio doesn't distinguish between loan types. A bank with 75% of assets in high-quality residential mortgages has a very different risk profile than one with 75% in construction loans.

**Dividend Payout Ratio (/metrics/dividend-payout-ratio)**
- Bank-Specific Context: For banks, the payout ratio must be evaluated in the context of regulatory capital requirements. Banks need to retain sufficient earnings to maintain and build capital ratios. Regulators can and do restrict dividends if capital levels are insufficient.
- Metric Connections: Retention ratio = 1 - Payout Ratio. Sustainable growth rate = ROE × Retention Ratio. A bank paying out 40% of earnings retains 60%, and if ROE is 12%, sustainable growth is 7.2%.
- Common Pitfalls: A low payout ratio isn't always good — it may indicate the bank cannot safely pay more, or that it's retaining earnings to rebuild capital after losses. A high payout ratio may be sustainable if ROE is strong but could be dangerous if earnings are about to decline.
- What Drives This Metric: Board dividend policy, regulatory capital buffers, earnings stability, growth needs, share buyback preferences.

### 6.2 Implementation Note for Claude Code

The existing data structures in `metrics.js` and `valuations.js` have specific required fields. All new fields must be added alongside the existing fields without breaking the current structure.

**Current exact metric data structure (from `src/data/content/metrics.js`):**

```javascript
{
  slug: 'roe',                    // URL path segment, kebab-case
  name: 'Return on Equity (ROE)', // Display name with abbreviation in parens
  category: 'profitability',      // One of: profitability, efficiency, capital, valuation, per-share
  categoryLabel: 'Profitability Ratio',  // Human-readable category
  formula: 'ROE = Net Income / Average Shareholders\' Equity',
  isPercentage: true,             // Optional
  shortDescription: '...',        // One sentence, used in meta tags and index cards. No trailing period.
  description: '...',             // 2-3 sentences, full overview
  formulaExplanation: '...',      // How the inputs are calculated
  interpretation: '...',          // What the number means
  typicalRange: '...',            // Normal values for banks
  goodBad: {
    good: '...',                  // What favorable values look like
    bad: '...',                   // What concerning values look like
  },
  considerations: ['...', '...'], // Array of exactly 4 items
  relatedMetrics: ['roaa', 'efficiency-ratio'],  // Slugs of related metrics
  relatedMetricDescriptions: {
    'roaa': 'Why this metric relates to ROAA...',  // One sentence per related metric
  },
  dataSource: '...',              // Where the data comes from (SEC filings)
}
```

**New fields to add to each existing metric entry (all optional, render conditionally):**

```javascript
{
  // ... all existing fields above remain unchanged ...

  // NEW EXPANSION FIELDS:
  bankSpecificContext: '...',      // Why this metric is different/special for banks
  metricConnections: '...',       // How this metric relates to other metrics, include formulas
  commonPitfalls: '...',          // Misreadings and traps specific to bank analysis
  acrossBankTypes: '...',         // How metric differs for community vs regional vs money center banks
  whatDrivesMetric: '...',        // Factors that cause the metric to move
  whereToFindData: '...',         // For educational-only metrics: where investors can find this data
  isEducationalOnly: false,       // true for metrics not in screener (new metrics only)
  faqTeasers: [                   // 2-3 FAQ teasers with links
    {
      question: 'What is a good ROE for a bank?',
      teaser: 'Well-managed banks typically achieve ROE between 8% and 15%...',
      faqSlug: 'what-is-a-good-roe-for-banks',
      faqCluster: 'profitability'
    }
  ]
}
```

**For new metric entries (23 new metrics from Section 4):** Include ALL existing required fields plus the new expansion fields. New metrics will use expanded categories: `profitability`, `efficiency`, `capital`, `asset-quality`, `valuation`, `per-share`, `balance-sheet`. The `categoryLabel` field should use the human-readable names from Section 4's updated categorization.

**For educational-only metrics:** Set `isEducationalOnly: true`. Replace `dataSource` with `whereToFindData` explaining where investors can find this metric (FDIC call reports, bank 10-K/10-Q, Federal Reserve FR Y-9C, etc.). The template component should suppress screener CTAs for these metrics.

**Current exact valuation data structure (from `src/data/content/valuations.js`):**

```javascript
{
  slug: 'graham-number',
  name: 'Graham Number',
  type: 'Intrinsic Value Method',  // One of: Intrinsic Value Method, Relative Valuation Method,
                                    //         Risk Management Concept, Fundamental Valuation Method
  shortDescription: '...',          // No trailing period
  description: '...',
  formula: '...',
  isPercentage: true,               // Optional
  formulaExplanation: '...',
  steps: ['Step 1...', 'Step 2...'],  // Array of exactly 5 ordered steps
  example: '...',                     // Worked example with specific numbers
  strengths: ['...', '...'],          // Array of exactly 4 items
  limitations: ['...', '...'],        // Array of 4-5 items
  bankSpecific: '...',                // Why this matters specifically for banks
  relatedMethods: ['margin-of-safety', 'price-to-book-valuation'],  // Slugs of related valuations
}
```

**New fields to add to each existing valuation entry:**

```javascript
{
  // ... all existing fields above remain unchanged ...

  // NEW EXPANSION FIELDS:
  whenToUse: '...',               // When this method is most/least appropriate for bank valuation
  methodConnections: '...',       // How this method relates to other valuation approaches
  commonMistakes: '...',          // Typical errors investors make applying this method to banks
  acrossBankTypes: '...',         // How the method applies differently across bank types
  faqTeasers: [                   // 2-3 FAQ teasers with links
    {
      question: 'How do I calculate the Graham Number for bank stocks?',
      teaser: 'The Graham Number estimates maximum fair price using EPS and BVPS...',
      faqSlug: 'graham-number-for-bank-stocks',
      faqCluster: 'valuation'
    }
  ]
}
```

**Critical conventions (from Claude Code):**
- Slugs are kebab-case and must be unique across their data array
- Descriptions use second/third person ("It measures...", "The ratio shows..."), not first/second person
- `considerations` arrays are exactly 4 items
- `steps` arrays are exactly 5 items
- `strengths` arrays are exactly 4 items
- `limitations` arrays are 4-5 items
- `relatedMetrics` / `relatedMethods` must reference existing valid slugs
- All text is plain strings (no HTML or markdown inside the values)
- No trailing periods on `shortDescription`; other fields use full sentences with periods

### 6.3 Cross-Linking Requirements

Beyond the `relatedMetrics` and `relatedMethods` fields inside the data arrays, there are separate cross-link mappings in the React components:

- `src/pages/MetricDetail.jsx` contains `METRIC_TO_VALUATIONS` and `METRIC_TO_VALUATION_DESCRIPTIONS`
- `src/pages/ValuationDetail.jsx` contains `VALUATION_TO_METRICS` and `VALUATION_TO_METRIC_DESCRIPTIONS`

**When content is generated, it must also include cross-link entries specifying:**
1. Which existing valuations each new metric should link to (with a one-sentence description of why)
2. Which existing metrics each new valuation should link to (with a one-sentence description of why)
3. For any new-to-new relationships (new metric to new valuation or vice versa), provide both directions

These cross-link entries will be provided as separate data alongside the metric/valuation content so Claude Code can update both the data arrays and the cross-link maps in the component files.

---

## 7. Glossary Expansion

The following terms should be added to the glossary. These are terms that appear in the new metric pages, FAQ pages, or expanded content but are not currently defined in the glossary.

### Capital & Regulatory Terms
- Common Equity Tier 1 (CET1)
- Tier 1 Capital
- Tier 2 Capital
- Total Regulatory Capital
- Risk-Weighted Assets (RWA)
- Leverage Ratio
- Supplementary Leverage Ratio (SLR)
- Tangible Common Equity (TCE)
- Tangible Book Value
- Tangible Book Value Per Share (TBVPS)
- Well-Capitalized (regulatory definition)
- Adequately Capitalized (regulatory definition)
- Capital Conservation Buffer
- Stress Capital Buffer (SCB)

### Asset Quality Terms
- Non-Performing Loan (NPL)
- Non-Performing Asset (NPA)
- Other Real Estate Owned (OREO)
- Net Charge-Off
- Gross Charge-Off
- Recovery (on charged-off loans)
- Texas Ratio
- Allowance for Credit Losses (ACL)
- Provision for Credit Losses
- CECL (Current Expected Credit Losses)
- Loan Classification (Pass, Special Mention, Substandard, Doubtful, Loss)
- Troubled Debt Restructuring (TDR)

### Profitability & Efficiency Terms
- Return on Tangible Common Equity (ROTCE)
- Pre-Provision Net Revenue (PPNR)
- Net Overhead Ratio
- Cost of Funds
- Cost of Deposits
- Fee Income (see also Non-Interest Income)
- Earning Assets
- Yield on Earning Assets
- Net Interest Spread

### Valuation & Analysis Terms
- Justified P/B Multiple
- DuPont Decomposition (for banks)
- Equity Multiplier
- Retention Ratio
- Sustainable Growth Rate
- Gordon Growth Model
- Excess Capital
- Core Deposits
- Core Deposit Premium

### Bank Types & Structure Terms
- Money Center Bank
- Super-Regional Bank
- Community Bank
- Thrift / Savings Institution
- De Novo Bank
- Mutual Bank
- Stock Bank
- Mutual Holding Company (MHC)
- Mutual-to-Stock Conversion
- Bank Holding Company (BHC)
- Financial Holding Company (FHC)
- National Bank (charter type)
- State-Chartered Bank

### Regulatory Body Terms
- FDIC (expand beyond current definition)
- OCC (Office of the Comptroller of the Currency)
- Federal Reserve (as bank regulator)
- FFIEC (Federal Financial Institutions Examination Council)
- CAMELS Rating System

### Filing & Data Terms (supplement existing)
- FR Y-9C (Federal Reserve consolidated financial report)
- Call Report (FFIEC 031/041)
- Uniform Bank Performance Report (UBPR)
- FDIC Quarterly Banking Profile

**Implementation note for Claude Code:** The glossary is currently a standalone `.jsx` component with content inline. The terms should be organized alphabetically or by category (matching the current structure). Each term that corresponds to a metric page, valuation page, or FAQ page should include a link to that page. New terms should follow the same formatting pattern as existing glossary entries.

---

## 8. FAQ Content: Complete Question List by Cluster

### Data Structure and URL Pattern

See Section 13.3 for the complete FAQ data structure, field conventions, and cluster definitions.

**URL structure:**

```
/faq                                              → FAQ main index (all clusters listed)
/faq/getting-started                              → Cluster index page
/faq/getting-started/what-are-bank-stocks         → Individual FAQ page
/faq/profitability/what-is-a-good-roe-for-banks   → Individual FAQ page
```

---

### Cluster 1: Getting Started with Bank Stocks

**Target audience:** Beginners discovering bank stock investing for the first time.
**Primary links to:** /screener, /screener/guide, /metrics

| # | Question | Slug | Intent Type | CTA Type |
|---|---|---|---|---|
| 1 | What are bank stocks and how do they differ from other stocks? | `what-are-bank-stocks` | Definitional | learn-metric |
| 2 | Why invest in bank stocks? | `why-invest-in-bank-stocks` | Conceptual | learn-metric |
| 3 | What are the advantages and disadvantages of investing in bank stocks? | `advantages-disadvantages-bank-stocks` | Evaluative | learn-metric |
| 4 | How do banks make money? | `how-do-banks-make-money` | Conceptual | learn-metric (NIM) |
| 5 | What is the difference between commercial banks and investment banks? | `commercial-vs-investment-banks` | Comparative | glossary |
| 6 | What are community banks and why do investors care about them? | `what-are-community-banks` | Definitional | search |
| 7 | What is the difference between a bank and a bank holding company? | `bank-vs-bank-holding-company` | Comparative | glossary |
| 8 | What are the different types of banks that trade publicly? | `types-of-publicly-traded-banks` | Definitional | search |
| 9 | How do I start researching bank stocks as a beginner? | `how-to-start-researching-bank-stocks` | Procedural | screener |
| 10 | What are the most important metrics for evaluating a bank stock? | `most-important-bank-stock-metrics` | Evaluative | screener |
| 11 | How do bank stocks differ from fintech stocks? | `bank-stocks-vs-fintech-stocks` | Comparative | learn-metric |
| 12 | What should I know about bank stocks before buying my first one? | `what-to-know-before-buying-bank-stocks` | Strategic | screener |
| 13 | What are SIC codes and which ones apply to banks? | `bank-sic-codes` | Definitional | glossary |
| 14 | What is the difference between a thrift, a savings bank, and a commercial bank? | `thrift-vs-savings-bank-vs-commercial-bank` | Comparative | glossary |
| 15 | Why are bank financial statements different from other companies? | `why-bank-financials-are-different` | Conceptual | learn-metric |

---

### Cluster 2: Understanding Bank Financial Statements

**Target audience:** Users who want to understand the raw data — SEC filings, balance sheet structure, and bank-specific financial statement characteristics.
**Primary links to:** /glossary, /metrics
**CTA note:** Screener CTAs are generally not appropriate here. Direct users to learn about related metrics, explore the glossary, or use Bank Search.

| # | Question | Slug | Intent Type | CTA Type |
|---|---|---|---|---|
| 16 | How do I read a bank's balance sheet? | `how-to-read-bank-balance-sheet` | Procedural | learn-metric |
| 17 | What is the difference between a bank's 10-K and 10-Q filing? | `10k-vs-10q-filings` | Comparative | glossary |
| 18 | What is trailing twelve months (TTM) and why does it matter for bank analysis? | `what-is-trailing-twelve-months` | Definitional | glossary |
| 19 | What is net interest income and why is it the most important revenue line for banks? | `what-is-net-interest-income` | Definitional | learn-metric (NIM) |
| 20 | What is non-interest income and why does it matter? | `what-is-non-interest-income` | Definitional | learn-metric |
| 21 | What are non-interest expenses in banking? | `what-are-non-interest-expenses` | Definitional | learn-metric (Efficiency) |
| 22 | How do I find a bank's financial data on SEC EDGAR? | `how-to-find-bank-data-sec-edgar` | Procedural | search |
| 23 | What is a CIK number and how do I use it to look up bank filings? | `what-is-cik-number` | Procedural | search |
| 24 | What is the difference between interest income and fee income for banks? | `interest-income-vs-fee-income` | Comparative | learn-metric |
| 25 | What are earning assets in bank accounting? | `what-are-earning-assets` | Definitional | glossary |
| 26 | How do banks report loan losses and provisions? | `how-banks-report-loan-losses` | Procedural | learn-metric (NPL) |
| 27 | What is the provision for credit losses on a bank's income statement? | `what-is-provision-for-credit-losses` | Definitional | learn-metric |
| 28 | What is the allowance for credit losses on a bank's balance sheet? | `what-is-allowance-for-credit-losses` | Definitional | learn-metric |
| 29 | What are held-to-maturity vs available-for-sale securities on a bank's balance sheet? | `held-to-maturity-vs-available-for-sale` | Comparative | glossary |
| 30 | What is goodwill on a bank's balance sheet and why does it matter for valuation? | `what-is-goodwill-on-bank-balance-sheet` | Conceptual | learn-metric (TBVPS) |
| 31 | What is a Call Report and where can I find it? | `what-is-a-call-report` | Definitional | glossary |
| 32 | What is the FFIEC Uniform Bank Performance Report (UBPR)? | `what-is-ubpr` | Definitional | glossary |

---

### Cluster 3: Bank Profitability Metrics

**Target audience:** Users evaluating bank profitability, from basic understanding to nuanced comparison.
**Primary links to:** /metrics/roe, /metrics/roaa, /metrics/net-interest-margin, /screener

| # | Question | Slug | Intent Type | CTA Type |
|---|---|---|---|---|
| 33 | What is a good ROE for a bank stock? | `what-is-a-good-roe-for-banks` | Evaluative | screener |
| 34 | Why is ROE more important for banks than for other companies? | `why-roe-important-for-banks` | Conceptual | learn-metric (ROE) |
| 35 | Can ROE be too high for a bank? What does that signal? | `can-roe-be-too-high` | Evaluative | learn-metric (ROE, Equity to Assets) |
| 36 | What is the difference between ROE and ROAA for banks? | `roe-vs-roaa` | Comparative | screener |
| 37 | When should I use ROE vs ROAA to evaluate a bank? | `when-to-use-roe-vs-roaa` | Strategic | screener |
| 38 | What is a good ROAA for a bank? | `what-is-a-good-roaa-for-banks` | Evaluative | screener |
| 39 | What is a good net interest margin for a bank? | `what-is-a-good-nim-for-banks` | Evaluative | screener |
| 40 | What causes net interest margin to increase or decrease? | `what-causes-nim-to-change` | Conceptual | learn-metric (NIM) |
| 41 | Why do some banks have much higher NIMs than others? | `why-nim-varies-across-banks` | Conceptual | screener (NIM filter) |
| 42 | How do I compare profitability across banks of different sizes? | `comparing-profitability-different-size-banks` | Strategic | screener |
| 43 | What is the DuPont decomposition and how does it apply to banks? | `dupont-decomposition-for-banks` | Procedural | learn-valuation (DuPont) |
| 44 | What is return on tangible common equity (ROTCE)? | `what-is-rotce` | Definitional | learn-metric (ROTCE) |
| 45 | What is pre-provision net revenue (PPNR) and why do analysts use it? | `what-is-ppnr` | Definitional | learn-metric (PPNR) |

---

### Cluster 4: Bank Efficiency and Funding

**Primary links to:** /metrics/efficiency-ratio, /metrics/deposits-to-assets, /metrics/loans-to-deposits, /metrics/loans-to-assets

| # | Question | Slug | Intent Type | CTA Type |
|---|---|---|---|---|
| 46 | What is a good efficiency ratio for a bank? | `what-is-a-good-efficiency-ratio` | Evaluative | screener |
| 47 | Why do smaller banks often have higher efficiency ratios than large banks? | `why-small-banks-higher-efficiency-ratio` | Conceptual | learn-metric |
| 48 | What drives a bank's efficiency ratio higher or lower? | `what-drives-efficiency-ratio` | Conceptual | learn-metric |
| 49 | What is the deposits-to-assets ratio and what does it tell me? | `what-is-deposits-to-assets-ratio` | Definitional | screener |
| 50 | What is a healthy loans-to-deposits ratio for a bank? | `healthy-loans-to-deposits-ratio` | Evaluative | screener |
| 51 | What happens when a bank's loans-to-deposits ratio is too high? | `loans-to-deposits-too-high` | Conceptual | screener |
| 52 | What happens when a bank's loans-to-deposits ratio is too low? | `loans-to-deposits-too-low` | Conceptual | screener |
| 53 | What is cost of funds and how does it differ from cost of deposits? | `cost-of-funds-vs-cost-of-deposits` | Comparative | learn-metric |
| 54 | What does it mean when a bank relies heavily on wholesale funding vs core deposits? | `wholesale-funding-vs-core-deposits` | Comparative | learn-metric |
| 55 | How do I evaluate a bank's funding mix? | `how-to-evaluate-bank-funding-mix` | Strategic | learn-metric |
| 56 | What is the non-interest income to revenue ratio and what does it tell me? | `what-is-non-interest-income-ratio` | Definitional | learn-metric |

---

### Cluster 5: Capital Strength and Asset Quality

**Primary links to:** /metrics/equity-to-assets, new capital and asset quality metric pages
**CTA note:** Equity to Assets is in the screener. Most other capital and asset quality metrics are educational only. Direct users to learn about the metric or explore related content. Do not reference the screener for educational-only metrics.

| # | Question | Slug | Intent Type | CTA Type |
|---|---|---|---|---|
| 57 | What is the equity-to-assets ratio and what is a good level for banks? | `what-is-a-good-equity-to-assets-ratio` | Evaluative | screener |
| 58 | What is tangible book value and why is it different from book value? | `tangible-book-value-vs-book-value` | Comparative | learn-metric (TBVPS) |
| 59 | What is tangible common equity (TCE) ratio and why do bank analysts use it? | `what-is-tce-ratio` | Definitional | learn-metric |
| 60 | What is the CET1 capital ratio and why does it matter? | `what-is-cet1-ratio` | Definitional | learn-metric |
| 61 | What is the Tier 1 capital ratio? | `what-is-tier-1-capital-ratio` | Definitional | learn-metric |
| 62 | What is the difference between CET1, Tier 1, and Total Capital ratios? | `cet1-vs-tier1-vs-total-capital` | Comparative | learn-metric |
| 63 | What are risk-weighted assets (RWA) and how do they work? | `what-are-risk-weighted-assets` | Definitional | learn-metric |
| 64 | What happens if a bank falls below minimum capital requirements? | `what-happens-below-minimum-capital` | Conceptual | learn-metric |
| 65 | What is the difference between a well-capitalized and adequately capitalized bank? | `well-capitalized-vs-adequately-capitalized` | Comparative | glossary |
| 66 | What is the Texas Ratio and how do I calculate it? | `what-is-texas-ratio` | Procedural | learn-metric (Texas Ratio) |
| 67 | What is the non-performing loans (NPL) ratio? | `what-is-npl-ratio` | Definitional | learn-metric |
| 68 | What are non-performing assets (NPA) and how do they affect bank value? | `what-are-non-performing-assets` | Definitional | learn-metric |
| 69 | What is the net charge-off ratio and what does it tell me about a bank? | `what-is-net-charge-off-ratio` | Definitional | learn-metric |
| 70 | How do I evaluate the credit quality of a bank's loan portfolio? | `how-to-evaluate-loan-credit-quality` | Strategic | learn-metric |
| 71 | What is a bank's loan loss reserve ratio? | `what-is-loan-loss-reserve-ratio` | Definitional | learn-metric |
| 72 | What is the reserve coverage ratio and how should I interpret it? | `what-is-reserve-coverage-ratio` | Evaluative | learn-metric |
| 73 | What is CECL and how did it change bank accounting? | `what-is-cecl` | Definitional | glossary |

---

### Cluster 6: How to Value Bank Stocks

**Primary links to:** /valuation (all sub-pages), /metrics/price-to-book, /metrics/price-to-earnings

| # | Question | Slug | Intent Type | CTA Type |
|---|---|---|---|---|
| 74 | Why is price-to-book (P/B) the primary valuation metric for banks? | `why-pb-primary-bank-valuation` | Conceptual | learn-valuation (P/B) |
| 75 | What is a good price-to-book ratio for a bank stock? | `what-is-a-good-pb-for-banks` | Evaluative | screener |
| 76 | Does a P/B ratio below 1.0 always mean a bank is undervalued? | `pb-below-one-undervalued` | Evaluative | learn-valuation |
| 77 | What is the difference between price-to-book and price-to-tangible-book value? | `pb-vs-ptbv` | Comparative | learn-metric (P/TBV) |
| 78 | When should I use P/TBV instead of P/B to value a bank? | `when-to-use-ptbv` | Strategic | learn-metric |
| 79 | Why can't I use EV/EBITDA to value a bank stock? | `why-not-ev-ebitda-for-banks` | Conceptual | learn-valuation |
| 80 | What is a good P/E ratio for a bank stock? | `what-is-a-good-pe-for-banks` | Evaluative | screener |
| 81 | What is the Graham Number and how do I calculate it for bank stocks? | `graham-number-for-bank-stocks` | Procedural | screener |
| 82 | How do I use the Graham Number to find undervalued bank stocks? | `how-to-use-graham-number` | Strategic | screener |
| 83 | What is margin of safety and how do I apply it to bank stocks? | `margin-of-safety-for-bank-stocks` | Procedural | screener |
| 84 | How does the dividend discount model work for bank stocks? | `dividend-discount-model-for-banks` | Procedural | learn-valuation (DDM) |
| 85 | What is the ROE-P/B valuation framework and how does it work? | `roe-pb-framework-explained` | Procedural | learn-valuation |
| 86 | How do I determine the justified P/B multiple for a bank stock? | `how-to-calculate-justified-pb` | Procedural | learn-valuation |
| 87 | What is intrinsic value and how do I estimate it for a bank? | `intrinsic-value-for-banks` | Procedural | learn-valuation |
| 88 | How do I do a peer comparison for bank stocks? | `how-to-do-peer-comparison` | Procedural | screener |
| 89 | What makes bank valuation different from valuing other companies? | `why-bank-valuation-is-different` | Conceptual | learn-valuation |
| 90 | How do I tell if a bank stock is overvalued or undervalued? | `how-to-tell-overvalued-undervalued` | Strategic | screener |

---

### Cluster 7: Bank Dividends and Shareholder Returns

**Primary links to:** /metrics/dividend-payout-ratio, /screener

| # | Question | Slug | Intent Type | CTA Type |
|---|---|---|---|---|
| 91 | Do all bank stocks pay dividends? | `do-all-banks-pay-dividends` | Definitional | screener |
| 92 | What is a good dividend payout ratio for a bank? | `good-dividend-payout-ratio-for-banks` | Evaluative | screener |
| 93 | How do I evaluate whether a bank's dividend is safe? | `how-to-evaluate-dividend-safety` | Strategic | screener |
| 94 | What is the relationship between ROE, payout ratio, and dividend growth? | `roe-payout-ratio-dividend-growth` | Conceptual | learn-metric |
| 95 | Why do regulators sometimes restrict bank dividends? | `why-regulators-restrict-dividends` | Conceptual | learn-faq |
| 96 | How do share buybacks work for bank stocks? | `how-bank-buybacks-work` | Definitional | learn-faq |
| 97 | What is the difference between dividends and share buybacks for bank shareholders? | `dividends-vs-buybacks` | Comparative | learn-faq |
| 98 | How do I screen for high-dividend bank stocks that are still safe? | `screen-for-safe-high-dividend-banks` | Strategic | screener |
| 99 | What is a bank's capital return plan? | `what-is-capital-return-plan` | Definitional | learn-faq |
| 100 | What is the sustainable growth rate and how does it relate to bank dividends? | `sustainable-growth-rate-and-dividends` | Conceptual | learn-metric |

---

### Cluster 8: Interest Rates and Bank Performance

**Primary links to:** /metrics/net-interest-margin, /valuation
**CTA note:** These are macro/contextual topics. Direct users to learn about related metrics. Screener CTAs only when the question connects directly to a screener metric (e.g., NIM).

| # | Question | Slug | Intent Type | CTA Type |
|---|---|---|---|---|
| 101 | How do interest rates affect bank stocks? | `how-interest-rates-affect-banks` | Conceptual | learn-metric (NIM) |
| 102 | How do rising interest rates affect bank net interest margins? | `rising-rates-and-nim` | Conceptual | learn-metric (NIM) |
| 103 | How do falling interest rates affect bank profitability? | `falling-rates-and-profitability` | Conceptual | learn-metric |
| 104 | What is interest rate risk for banks? | `what-is-interest-rate-risk` | Definitional | learn-metric |
| 105 | What is asset sensitivity vs liability sensitivity in banking? | `asset-sensitivity-vs-liability-sensitivity` | Comparative | learn-metric |
| 106 | How does the yield curve affect bank profitability? | `yield-curve-and-bank-profitability` | Conceptual | learn-metric (NIM) |
| 107 | What happens to bank profitability when the yield curve inverts? | `inverted-yield-curve-and-banks` | Conceptual | learn-metric |
| 108 | Are bank stocks cyclical? | `are-bank-stocks-cyclical` | Evaluative | learn-faq |
| 109 | What is the credit cycle and how does it affect bank stocks? | `credit-cycle-and-bank-stocks` | Conceptual | learn-metric |
| 110 | How does loan demand affect bank performance? | `loan-demand-and-bank-performance` | Conceptual | learn-metric |

---

### Cluster 9: Understanding Bank Types

**Primary links to:** /search, /glossary
**CTA note:** Bank Search is appropriate when looking up a specific bank. For educational/taxonomic questions, direct to glossary or related FAQ pages.

| # | Question | Slug | Intent Type | CTA Type |
|---|---|---|---|---|
| 111 | How do I compare a community bank to a regional bank to a money center bank? | `community-vs-regional-vs-money-center` | Comparative | search |
| 112 | What is the difference between a national bank and a state-chartered bank? | `national-vs-state-chartered-bank` | Comparative | glossary |
| 113 | What are money center banks? | `what-are-money-center-banks` | Definitional | glossary |
| 114 | What are super-regional banks? | `what-are-super-regional-banks` | Definitional | glossary |
| 115 | What is the difference between a mutual bank and a stock bank? | `mutual-vs-stock-bank` | Comparative | glossary |
| 116 | What is a de novo bank? | `what-is-a-de-novo-bank` | Definitional | glossary |
| 117 | What are bank holding companies vs financial holding companies? | `bhc-vs-fhc` | Comparative | glossary |
| 118 | What is a mutual holding company conversion (MHC conversion)? | `what-is-mhc-conversion` | Definitional | glossary |
| 119 | How do I evaluate a bank that has recently gone through an IPO? | `evaluating-bank-ipo` | Strategic | learn-metric |
| 120 | What is the difference between a traditional bank and a neobank? | `traditional-bank-vs-neobank` | Comparative | glossary |

---

### Cluster 10: Screening and Analysis Strategies

**Primary links to:** /screener, /screener/guide, /metrics, /valuation
**CTA note:** Almost all questions in this cluster map directly to screener usage. Screener CTAs are appropriate throughout.

| # | Question | Slug | Intent Type | CTA Type |
|---|---|---|---|---|
| 121 | How do I use a bank stock screener effectively? | `how-to-use-bank-stock-screener` | Procedural | screener |
| 122 | What filters should I set to find undervalued bank stocks? | `filters-for-undervalued-banks` | Strategic | screener |
| 123 | What filters should I set to find high-quality bank stocks? | `filters-for-high-quality-banks` | Strategic | screener |
| 124 | What filters should I set to find bank stocks for dividend income? | `filters-for-dividend-income-banks` | Strategic | screener |
| 125 | How do I screen for small community bank stocks? | `how-to-screen-community-banks` | Procedural | screener |
| 126 | How do I compare bank stocks side by side? | `how-to-compare-bank-stocks` | Procedural | screener |
| 127 | How do I screen for banks trading below book value? | `screen-banks-below-book-value` | Procedural | screener |
| 128 | How do I screen for the most profitable banks? | `screen-most-profitable-banks` | Procedural | screener |
| 129 | How do I screen for the most efficient banks? | `screen-most-efficient-banks` | Procedural | screener |
| 130 | What are the red flags to watch for when screening bank stocks? | `red-flags-screening-bank-stocks` | Evaluative | screener |
| 131 | How do I combine multiple metrics to find the best bank stocks? | `combining-metrics-to-find-best-banks` | Strategic | screener |
| 132 | What is a good starting point for a value investing bank stock screen? | `value-investing-bank-screen` | Strategic | screener |
| 133 | How do I identify turnaround candidates in the banking sector? | `identifying-bank-turnaround-candidates` | Strategic | screener |
| 134 | How do I export and analyze bank stock screening data? | `how-to-export-screening-data` | Procedural | screener |

---

### Cluster 11: Advanced Bank Analysis

**Target audience:** Experienced investors and analysts.
**Primary links to:** /metrics, /valuation, /glossary
**CTA note:** Most topics are educational only. Direct to related metric/valuation pages.

| # | Question | Slug | Intent Type | CTA Type |
|---|---|---|---|---|
| 135 | How do I evaluate a bank's commercial real estate (CRE) loan exposure? | `evaluating-cre-exposure` | Strategic | learn-metric |
| 136 | What is concentration risk in banking? | `what-is-concentration-risk` | Definitional | learn-metric |
| 137 | How do I evaluate a bank's deposit franchise? | `evaluating-deposit-franchise` | Strategic | learn-metric |
| 138 | What is core deposit premium and why does it matter? | `what-is-core-deposit-premium` | Definitional | glossary |
| 139 | How do I evaluate management quality at a bank? | `evaluating-bank-management-quality` | Strategic | learn-metric |
| 140 | What is insider ownership and why does it matter for bank stocks? | `insider-ownership-bank-stocks` | Conceptual | learn-faq |
| 141 | What are mutual-to-stock conversions and why do some investors target them? | `mutual-to-stock-conversions` | Definitional | glossary |
| 142 | How do I evaluate a bank's loan portfolio composition? | `evaluating-loan-portfolio-composition` | Strategic | learn-metric |
| 143 | What is accumulated other comprehensive income (AOCI) and why does it matter for banks? | `what-is-aoci` | Definitional | learn-metric (TBVPS) |
| 144 | How do bank mergers and acquisitions work? | `how-bank-mergers-acquisitions-work` | Conceptual | learn-faq |
| 145 | What happens when a bank fails? | `what-happens-when-bank-fails` | Conceptual | glossary |
| 146 | What is the FDIC and how does deposit insurance work? | `what-is-fdic-deposit-insurance` | Definitional | glossary |
| 147 | What are the main federal banking regulators in the US? | `main-federal-banking-regulators` | Definitional | glossary |
| 148 | What are CAMELS ratings? | `what-are-camels-ratings` | Definitional | glossary |

---

**Total FAQ pages: 148** (standard) **+ 36** ("How to Calculate") **= 184 FAQ pages**
**Total new pages from this strategy: 184 FAQ + 23 metrics + 5 valuation + 11 cluster indexes + 1 FAQ main index = 224 new pages**
**Projected total site pages after implementation: ~595 pages** (371 existing + 224 new)

---

## 9. "How to Calculate" FAQ Pages

Every metric (existing and new, 36 total) gets a dedicated "How to Calculate" FAQ page. These pages are part of the FAQ system (stored in the `faqs.js` data array) but belong to the cluster that corresponds to their metric category.

### Purpose and Content Structure

Each "How to Calculate" FAQ page should be distinct from the metric page itself:

| Metric Page Covers | "How to Calculate" FAQ Covers |
|---|---|
| What the metric is | Step-by-step primary formula with worked example |
| Why it matters for banks | Alternative formulas when certain inputs aren't available |
| How to interpret values | Where to find each input in actual SEC filings (10-K, 10-Q, call reports) |
| Typical ranges | Bank-specific calculation nuances and adjustments |
| Related metrics | Related metric relationships expressed as formulas |
| | Common calculation mistakes |
| | Basic vs adjusted versions (when applicable) |

### Content Sizing Guidance

Page length should match available depth. Metrics with multiple alternative calculation methods, bank-specific adjustments, and meaningful formula relationships (like ROE, P/B, NIM) will naturally produce longer pages. Metrics with straightforward single formulas (like EPS, BVPS) should still be created but can be shorter, with the additional content focusing on bank-specific nuances, connections to other metrics, and where to find the inputs.

### Complete List

These are listed by their metric page slug for cross-referencing. The FAQ slug follows the pattern `how-to-calculate-{metric-slug}`.

**Profitability Metrics:**

| Metric | FAQ Slug | Key Alternative Methods / Connections |
|---|---|---|
| ROE | `how-to-calculate-roe` | ROE = ROA × Equity Multiplier; ROE = P/B ÷ P/E; DuPont decomposition; average equity (5-point FFIEC method) vs simple average |
| ROAA | `how-to-calculate-roaa` | ROAA = ROE ÷ Equity Multiplier; using average assets vs period-end; annualizing quarterly data |
| NIM | `how-to-calculate-nim` | NIM = Net Interest Income ÷ Average Earning Assets; tax-equivalent NIM adjustment; difference between NIM and net interest spread |
| ROTCE | `how-to-calculate-rotce` | ROTCE = Net Income ÷ Average Tangible Common Equity; adjusting for preferred stock; relationship to ROE |
| PPNR | `how-to-calculate-ppnr` | PPNR = Net Interest Income + Non-Interest Income - Non-Interest Expense; why provisions are excluded; annualizing quarterly PPNR |
| Net Overhead Ratio | `how-to-calculate-net-overhead-ratio` | Net Overhead = (Non-Interest Expense - Non-Interest Income) ÷ Average Assets; relationship to efficiency ratio |

**Efficiency & Funding Metrics:**

| Metric | FAQ Slug | Key Alternative Methods / Connections |
|---|---|---|
| Efficiency Ratio | `how-to-calculate-efficiency-ratio` | Non-Interest Expense ÷ (Net Interest Income + Non-Interest Income); adjusted efficiency ratio (excluding amortization); why revenue definition matters |
| Deposits to Assets | `how-to-calculate-deposits-to-assets` | Straightforward but discuss: total deposits vs core deposits; which balance sheet line items to use |
| Loans to Deposits | `how-to-calculate-loans-to-deposits` | Net loans vs gross loans; relationship to L/A and D/A ratios |
| Loans to Assets | `how-to-calculate-loans-to-assets` | Net vs gross loans; total assets from most recent quarter vs average |
| Cost of Funds | `how-to-calculate-cost-of-funds` | Total Interest Expense ÷ Average Interest-Bearing Liabilities; vs Cost of Deposits; where to find in filings |
| Cost of Deposits | `how-to-calculate-cost-of-deposits` | Interest Expense on Deposits ÷ Average Deposits; including vs excluding non-interest-bearing deposits in denominator |
| Non-Interest Income to Revenue | `how-to-calculate-non-interest-income-ratio` | Non-Interest Income ÷ (Net Interest Income + Non-Interest Income); what counts as non-interest income |
| Interest Income to Earning Assets | `how-to-calculate-yield-on-earning-assets` | Total Interest Income ÷ Average Earning Assets; tax-equivalent yield adjustment |

**Capital Strength Metrics:**

| Metric | FAQ Slug | Key Alternative Methods / Connections |
|---|---|---|
| Equity to Assets | `how-to-calculate-equity-to-assets` | Total Equity ÷ Total Assets; inverse is equity multiplier; relationship to ROE through DuPont |
| TCE Ratio | `how-to-calculate-tce-ratio` | (Total Equity - Goodwill - Intangibles) ÷ (Total Assets - Goodwill - Intangibles); vs Equity to Assets |
| CET1 Capital Ratio | `how-to-calculate-cet1-ratio` | CET1 Capital ÷ Risk-Weighted Assets; what qualifies as CET1; why this can't be calculated from standard financial statements alone |
| Tier 1 Capital Ratio | `how-to-calculate-tier1-ratio` | (CET1 + Additional Tier 1) ÷ RWA; what qualifies as additional Tier 1 |
| Total Capital Ratio | `how-to-calculate-total-capital-ratio` | (Tier 1 + Tier 2) ÷ RWA; what qualifies as Tier 2 |
| Tier 1 Leverage Ratio | `how-to-calculate-leverage-ratio` | Tier 1 Capital ÷ Average Total Assets; not risk-weighted; comparison to equity-to-assets |
| SLR | `how-to-calculate-slr` | Tier 1 Capital ÷ Total Leverage Exposure; on- and off-balance sheet items |
| RWA Density | `how-to-calculate-rwa-density` | RWA ÷ Total Assets; what it tells you about asset risk profile |

**Asset Quality Metrics:**

| Metric | FAQ Slug | Key Alternative Methods / Connections |
|---|---|---|
| NPL Ratio | `how-to-calculate-npl-ratio` | Non-Performing Loans ÷ Total Loans; what qualifies as non-performing (90+ days past due, non-accrual); where to find in filings |
| NPA Ratio | `how-to-calculate-npa-ratio` | (NPLs + OREO + Other NPAs) ÷ Total Assets; relationship to NPL ratio |
| Net Charge-Off Ratio | `how-to-calculate-net-charge-off-ratio` | (Gross Charge-Offs - Recoveries) ÷ Average Loans; annualizing quarterly data |
| Loan Loss Reserve Ratio | `how-to-calculate-loan-loss-reserve-ratio` | Allowance for Credit Losses ÷ Total Loans; relationship to provision expense |
| Reserve Coverage Ratio | `how-to-calculate-reserve-coverage-ratio` | Allowance for Credit Losses ÷ Non-Performing Loans; what good coverage looks like |
| Texas Ratio | `how-to-calculate-texas-ratio` | NPAs ÷ (Tangible Common Equity + Loan Loss Reserves); why 100% is the critical threshold |
| Provision to Average Loans | `how-to-calculate-provision-to-loans` | Provision for Credit Losses ÷ Average Loans; annualizing; relationship to net charge-offs |

**Valuation Metrics:**

| Metric | FAQ Slug | Key Alternative Methods / Connections |
|---|---|---|
| BVPS | `how-to-calculate-bvps` | Total Equity ÷ Shares Outstanding; adjusting for preferred stock; BVPS growth as measure of value creation |
| TBVPS | `how-to-calculate-tbvps` | (Total Equity - Goodwill - Intangibles) ÷ Shares Outstanding; vs BVPS; impact of acquisitions |
| P/B | `how-to-calculate-price-to-book` | Price ÷ BVPS; P/B = P/E × ROE; Market Cap ÷ Total Equity; justified P/B from ROE-P/B framework |
| P/TBV | `how-to-calculate-price-to-tangible-book` | Price ÷ TBVPS; when to use vs P/B; P/TBV = P/E × ROTCE |
| P/E | `how-to-calculate-price-to-earnings` | Price ÷ EPS; trailing vs forward P/E; P/E = P/B ÷ ROE; normalized P/E for banks with volatile provisions |
| EPS | `how-to-calculate-eps` | Net Income ÷ Diluted Shares Outstanding; basic vs diluted; subtracting preferred dividends; TTM calculation from quarterly filings |
| Dividend Payout Ratio | `how-to-calculate-dividend-payout-ratio` | Dividends Per Share ÷ EPS; or Total Dividends ÷ Net Income; retention ratio = 1 - payout ratio; sustainable growth rate connection |

**Total "How to Calculate" FAQ pages: 36**

---

## 10. Topical Map & Internal Linking Matrix

### 10.1 Cluster-to-Existing-Page Connection Matrix

This matrix shows which existing site pages each FAQ cluster should link to, and how. Use this to implement internal linking in both directions (FAQ pages link to existing pages, and existing pages link back to relevant FAQ pages via teasers).

```
Legend:
  S = Screener link appropriate
  M = Metric page link
  V = Valuation page link
  G = Glossary link
  R = Screener Guide link
  H = Bank Search link
  . = No direct link

                          Screener  Search  Guide  Metrics Hub  Valuation Hub  Glossary  Individual Metric Pages                           Individual Valuation Pages
                          --------  ------  -----  -----------  -------------  --------  ---------------------------                       --------------------------
Cluster 1  (Getting)         S        H       R        M             V            G      ROE, P/B, Efficiency, NIM                         (General references)
Cluster 2  (Statements)      .        H       .        M             .            G      NIM, Efficiency, BVPS, TBVPS                      (None directly)
Cluster 3  (Profitability)   S        .       .        M             V            .      ROE, ROAA, NIM, ROTCE, PPNR                       DuPont, ROE-P/B Framework
Cluster 4  (Efficiency)      S        .       .        M             .            G      Efficiency, D/A, L/D, L/A, Cost of Funds          (None directly)
Cluster 5  (Capital/Risk)    S*       .       .        M             .            G      Eq/A, all capital metrics, all AQ metrics          (None directly)
Cluster 6  (Valuation)       S        .       .        M             V            .      P/B, P/E, P/TBV, BVPS, TBVPS, EPS                All valuation methods
Cluster 7  (Dividends)       S        .       R        M             V            .      Div Payout, ROE, EPS                              DDM, Gordon Growth
Cluster 8  (Rates)           .        .       .        M             .            G      NIM, Cost of Funds, Cost of Deposits              (General references)
Cluster 9  (Bank Types)      .        H       .        .             .            G      (General references)                               (None directly)
Cluster 10 (Screening)       S        .       R        M             V            .      All screener-available metrics                     All valuation methods
Cluster 11 (Advanced)        .        H       .        M             V            G      Various (topic-dependent)                          Peer Comparison, Excess Capital

* S* = Only for Equity to Assets questions; other capital/AQ metrics are educational only
```

### 10.2 Cross-Cluster Linking Map

This shows which clusters should link to each other, creating a web of topically related content.

```
Cluster 1  (Getting)       → 2 (next step: understand financials), 3 (next step: learn metrics), 6 (next step: valuation), 10 (next step: use screener)
Cluster 2  (Statements)    → 1 (if arriving from search, may need basics), 3 (metrics derived from these statements), 5 (capital concepts)
Cluster 3  (Profitability) → 4 (efficiency drives profitability), 6 (profitability informs valuation), 8 (rates affect profitability)
Cluster 4  (Efficiency)    → 3 (efficiency feeds into profitability), 8 (funding costs affected by rates)
Cluster 5  (Capital/Risk)  → 3 (capital affects ROE), 6 (asset quality affects valuation), 7 (capital affects dividend capacity)
Cluster 6  (Valuation)     → 3 (profitability drives value), 5 (capital/risk affects value), 10 (apply valuation via screener)
Cluster 7  (Dividends)     → 3 (ROE and earnings drive dividends), 5 (capital constraints on dividends), 6 (DDM valuation)
Cluster 8  (Rates)         → 3 (rates affect NIM/profitability), 4 (rates affect funding costs), 6 (rates affect valuation)
Cluster 9  (Bank Types)    → 1 (foundational knowledge), 10 (screen by bank type/size)
Cluster 10 (Screening)     → 3 (understand metrics to screen by), 6 (screening for value), 7 (screening for dividends)
Cluster 11 (Advanced)      → 5 (builds on capital/risk), 6 (advanced valuation), 9 (understanding bank structure)
```

### 10.3 "How to Calculate" Pages Linking Map

Each "How to Calculate" FAQ page links to:
1. The corresponding metric page (primary — "Learn more about {metric}")
2. Metric pages for all related/connected metrics mentioned in the alternative methods
3. The glossary for any terms that may be unfamiliar
4. 2-3 other "How to Calculate" pages for the most closely connected metrics
5. The screener (only if the metric is a screener filter)

---

## 11. Cannibalization Management

### 11.1 Existing FAQs to Convert to Teasers

**Homepage (6 existing FAQs):**

| Current Question | Action | Teaser Length | Link To |
|---|---|---|---|
| What is BankSift? | Keep as-is (about the product, not duplicated) | No change | N/A |
| Which financial metrics can I track? | Shorten to teaser | 1-2 sentences | /faq/getting-started/most-important-bank-stock-metrics |
| How can I compare bank stocks? | Shorten to teaser | 1-2 sentences | /faq/screening/how-to-compare-bank-stocks |
| Is BankSift free to use? | Keep as-is (about the product, not duplicated) | No change | N/A |
| Where does BankSift get its data? | Keep as-is (about the product, not duplicated) | No change | N/A |
| How do I find the best bank stocks? | Shorten to teaser | 1-2 sentences | /faq/screening/filters-for-high-quality-banks |

**Valuation page (3 existing FAQs):**

| Current Question | Action | Link To |
|---|---|---|
| How do I value bank stocks using P/B ratio? | Shorten to teaser | /faq/valuation/what-is-a-good-pb-for-banks |
| What is the Graham Number in bank valuation? | Shorten to teaser | /faq/valuation/graham-number-for-bank-stocks |
| Which valuation methods are best for banks? | Shorten to teaser | /faq/valuation/why-bank-valuation-is-different |

### 11.2 FAQ Teasers on Metric and Valuation Pages

Each individual metric and valuation page should display 2-3 FAQ teasers. These are specified in the `faqTeasers` array field in the data entry (see Section 6.2). The teaser format should be:

```
Q: {question text}
A: {1-2 sentence abbreviated answer}... Read more →
```

The "Read more" link goes to the full FAQ page.

### 11.3 FAQ Section Links to Add

Add a link to `/faq` in the following locations:
- **Site navigation** (alongside Metrics, Valuation, Glossary)
- **Homepage** "What You Can Do" section (new entry: "FAQ & Learning Center — Answers to common questions about bank stock investing, metrics, and valuation")
- **Metrics hub page** (after metric listings, before footer: "Have questions about bank metrics? Visit our FAQ section →")
- **Valuation hub page** (same pattern)
- **Screener Guide** (at bottom: "Want to learn more about the metrics you can screen by? Visit our FAQ section →")

---

## 12. Content Tone & Style Guidelines

### Voice and Tone

All content across FAQ pages, metric pages, valuation pages, and glossary entries should maintain a **neutral, professional, educational tone** consistent with the existing BankSift content.

**General principles:**
- Write in second/third person ("It measures...", "The ratio shows...", "Investors should consider..."). Never first person ("I think...", "We believe...").
- Maintain an authoritative but accessible voice. The site is a reference tool, not an opinion platform.
- Do not hedge excessively. State facts clearly and provide ranges/context rather than qualifying every sentence.
- Avoid filler phrases ("It's important to note that...", "It's worth mentioning that..."). Get to the substance.

**For beginner-oriented content (Clusters 1, 2, 9; introductory sections of metric pages):**
- Use accessible language. Define terms on first use or link to the glossary.
- Use concrete examples and plain descriptions over jargon.
- Keep sentences and paragraphs short.
- Explain the "why" and "so what" explicitly rather than assuming the reader can infer it.

**For intermediate content (Clusters 3, 4, 6, 7, 8, 10; main body of metric/valuation pages):**
- Assume familiarity with basic financial concepts (what a stock is, what a ratio is).
- Use standard financial terminology without excessive definition.
- Balance explanation with depth. The reader wants to understand the concept well enough to use it.

**For advanced content (Clusters 5, 11; "Metric Connections" and "Across Bank Types" sections):**
- Assume the reader has working knowledge of bank financial statements and core metrics.
- Use precise terminology. Readers at this level expect specificity.
- Focus on nuance, connections between concepts, and practical application.

### Writing Style Rules

- **No em dashes.** Use commas, semicolons, parentheses, or separate sentences instead.
- **No exclamation points.**
- **No rhetorical questions** as a stylistic device (FAQ questions themselves are obviously questions).
- **No "importantly," "interestingly," "notably," "essentially," "fundamentally," "ultimately," "certainly."**
- **No "This is because..." constructions.** Restructure to state the reason directly.
- **No "In other words..." or "Put simply..."** Just state it clearly the first time.
- **No "it is worth noting" or "it should be noted."** Just state the point.
- **Avoid passive voice** where active voice is clearer, but do not avoid it so aggressively that sentences become awkward.
- **Use "that" rather than "which" for restrictive clauses** (banks that have high ROE, not banks which have high ROE).
- **Numbers:** Spell out one through nine; use numerals for 10 and above. Always use numerals with units (5%, 3.5x, $1 billion). Use "%" not "percent" in technical content.

### Content Structure Rules

- **All text values are plain strings.** No HTML, no Markdown, no special formatting inside data array fields. Claude Code's templates handle all rendering.
- **No trailing periods on `shortDescription` fields.** All other text fields use complete sentences with periods.
- **Descriptions use second/third person.** Never "you should" or "we recommend."
- **`considerations` arrays are exactly 4 items. `steps` arrays are exactly 5 items. `strengths` arrays are exactly 4 items. `limitations` arrays are 4-5 items.** These constraints come from the existing template components and prerender script.

---

## 13. Exact Data Structures & Cross-Linking Requirements

### 13.1 Metric Data Structure

See Section 6.2 for the complete existing and expanded metric data structure with all field names, types, and conventions.

### 13.2 Valuation Data Structure

See Section 6.2 for the complete existing and expanded valuation data structure with all field names, types, and conventions.

### 13.3 FAQ Data Structure

Each FAQ entry in the new data file (`src/data/content/faqs.js`) follows this structure:

```javascript
{
  slug: 'what-are-bank-stocks',
  question: 'What are bank stocks and how do they differ from other stocks?',
  cluster: 'getting-started',
  clusterName: 'Getting Started with Bank Stocks',
  intentType: 'definitional', // definitional | evaluative | comparative | procedural | strategic | conceptual

  // Content fields
  shortAnswer: 'Brief 1-2 sentence answer for teasers and meta descriptions. No trailing period',
  fullAnswer: 'Complete answer content. Multiple paragraphs separated by \\n\\n. Plain text only, no HTML or Markdown. Should be 300-800 words depending on topic depth. See Section 3.5 for structure based on intent type.',

  // Linking fields
  relatedMetrics: ['roe', 'price-to-book'],            // Slugs from metrics.js
  relatedValuations: ['price-to-book-valuation'],       // Slugs from valuations.js
  relatedFaqs: ['why-invest-in-bank-stocks', 'how-do-banks-make-money'], // Slugs of other FAQ entries
  relatedGlossaryTerms: ['Bank Holding Company', 'SIC Code'], // Terms as they appear in glossary

  // CTA field
  cta: {
    type: 'screener',  // screener | search | learn-metric | learn-valuation | learn-faq | glossary
    target: '/screener', // URL path
    text: 'Screen 300+ bank stocks by ROE and other metrics' // CTA button/link text
  },

  // SEO fields
  metaTitle: 'What Are Bank Stocks? How They Differ From Other Stocks | BankSift',
  metaDescription: 'Learn what bank stocks are, how they differ from other stocks, and why bank financial analysis requires specialized metrics and valuation methods'
}
```

**Cluster definitions:**

```javascript
const FAQ_CLUSTERS = [
  { slug: 'getting-started', name: 'Getting Started with Bank Stocks', order: 1 },
  { slug: 'financial-statements', name: 'Understanding Bank Financial Statements', order: 2 },
  { slug: 'profitability', name: 'Bank Profitability Metrics', order: 3 },
  { slug: 'efficiency', name: 'Bank Efficiency and Funding', order: 4 },
  { slug: 'capital-and-risk', name: 'Capital Strength and Asset Quality', order: 5 },
  { slug: 'valuation', name: 'How to Value Bank Stocks', order: 6 },
  { slug: 'dividends', name: 'Bank Dividends and Shareholder Returns', order: 7 },
  { slug: 'interest-rates', name: 'Interest Rates and Bank Performance', order: 8 },
  { slug: 'bank-types', name: 'Understanding Bank Types', order: 9 },
  { slug: 'screening', name: 'Screening and Analysis Strategies', order: 10 },
  { slug: 'advanced', name: 'Advanced Bank Analysis', order: 11 },
];
```

**FAQ data conventions:**
- Slugs are kebab-case and unique across the entire FAQS array
- `shortAnswer` has no trailing period; `fullAnswer` uses complete sentences with periods
- `fullAnswer` uses plain text with `\n\n` for paragraph breaks; no HTML or Markdown
- `relatedMetrics`, `relatedValuations`, and `relatedFaqs` slugs must reference valid existing entries
- `metaTitle` should be under 60 characters where possible, always ends with "| BankSift"
- `metaDescription` should be 120-160 characters

### 13.4 Cross-Linking Requirements

See Section 6.3 for the cross-linking map requirements between metrics and valuations.

**For FAQ pages:** Cross-links are handled through the `relatedMetrics`, `relatedValuations`, `relatedFaqs`, and `relatedGlossaryTerms` fields in each FAQ entry. No separate cross-link maps are needed; the FAQ template component reads these fields directly.

### 13.5 Content Handoff Format

All content will be generated as **JavaScript objects** matching the exact field names and conventions above. Content will be organized into separate deliverable files:

1. **Metric content:** Complete JavaScript objects for all 23 new metrics + expansion fields for all 13 existing metrics + cross-link map entries
2. **Valuation content:** Complete JavaScript objects for all 5 new valuations + expansion fields for all 7 existing valuations + cross-link map entries
3. **FAQ content:** Complete JavaScript objects for all FAQ entries (standard + "How to Calculate"), organized by cluster
4. **Glossary content:** List of new terms with definitions, organized by category
5. **Teaser content:** Updated FAQ teasers for homepage and valuation page (shortened versions of existing FAQs with links)

Each deliverable file will contain drop-in-ready JavaScript that Claude Code can insert directly into the appropriate source files.

---

## 14. Implementation Workflow & Content Generation Plan

### 14.1 Three-Step Process

**Step 1: Content Generation (in this Claude Project)**
Generate all content as structured JavaScript objects matching the exact data structures in Section 13. Content is generated in batches following the phased rollout order. All content is generated before implementation begins.

**Step 2: Claude Code Implementation**
Provide Claude Code with the strategy document (this document) and all generated content from Step 1. Claude Code implements everything together: creates new files, modifies existing files, updates routing, prerender script, and sitemap generator. Claude Code then verifies the build completes without errors.

**Step 3: Review and Verification**
Review the deployed website here for content accuracy, missing content, broken links, incorrect rendering, and overall quality. Fetch and inspect pages to verify pre-rendered HTML, meta tags, and structured data. Identify any errors, omissions, or issues for Claude Code to fix.

### 14.2 Content Generation Batches

Content will be generated in this order, matching the phased rollout. All batches are generated before Step 2 begins.

**Batch 1 (Phase 1 foundation):**
- Expansion fields for all 13 existing metric entries (bankSpecificContext, metricConnections, commonPitfalls, acrossBankTypes, whatDrivesMetric, faqTeasers)
- Expansion fields for all 7 existing valuation entries (whenToUse, methodConnections, commonMistakes, acrossBankTypes, faqTeasers)
- Cross-link map entries for all existing metric-to-valuation and valuation-to-metric relationships (if any new connections are needed beyond current)
- Cluster 1 FAQ content (Getting Started, 15 questions)
- Cluster 3 FAQ content (Profitability, 13 questions)
- Cluster 6 FAQ content (Valuation, 17 questions)
- Cluster 10 FAQ content (Screening, 14 questions)
- "How to Calculate" FAQ content for all 13 existing metrics (13 pages)
- Updated homepage FAQ teasers
- Updated valuation page FAQ teasers

**Batch 2 (Phase 2 depth):**
- All 23 new metric entries (complete objects with all required and expansion fields)
- All 5 new valuation entries (complete objects with all required and expansion fields)
- Cross-link map entries for all new metrics and valuations
- Cluster 4 FAQ content (Efficiency, 11 questions)
- Cluster 5 FAQ content (Capital and Risk, 17 questions)
- Cluster 7 FAQ content (Dividends, 10 questions)
- Cluster 8 FAQ content (Interest Rates, 10 questions)
- "How to Calculate" FAQ content for all 23 new metrics (23 pages)
- All new glossary terms

**Batch 3 (Phase 3 coverage):**
- Cluster 2 FAQ content (Financial Statements, 17 questions)
- Cluster 9 FAQ content (Bank Types, 10 questions)
- Cluster 11 FAQ content (Advanced, 14 questions)

### 14.3 Content Generation Session Setup

**Settings for content generation sessions:**
- Web search: OFF (research phase is complete; search during generation introduces non-evergreen content risk and noise)
- Code execution: ON (for generating and validating structured data files)
- Artifacts: ON (for presenting content files for review)

**Prompting approach:**
Content generation prompts will be provided within this same Project. Each prompt will specify the batch or sub-batch to generate and reference this strategy document for all guidelines. The prompt structure will follow this pattern:

1. Specify which content batch to generate (e.g., "Generate Cluster 1 FAQ content")
2. Reference the strategy document sections for guidelines (tone, data sourcing, evergreen rules, search intent, CTA types)
3. Reference the exact data structure from Section 13
4. Request output as ready-to-use JavaScript objects

Generated content will be delivered as downloadable files containing JavaScript objects that can be handed directly to Claude Code.

### 14.4 Content Volume Summary

| Content Type | Count | Approx. Words Each | Total Approx. Words |
|---|---|---|---|
| Existing metric expansions | 13 entries | 200-400 per entry (new fields only) | 3,000-5,000 |
| Existing valuation expansions | 7 entries | 200-400 per entry (new fields only) | 1,500-3,000 |
| New metric entries | 23 complete entries | 500-800 per entry | 12,000-18,000 |
| New valuation entries | 5 complete entries | 600-1,000 per entry | 3,000-5,000 |
| Standard FAQ pages | 148 entries | 300-800 per entry | 45,000-120,000 |
| "How to Calculate" FAQ pages | 36 entries | 300-600 per entry | 11,000-22,000 |
| Glossary terms | ~60 terms | 30-80 per term | 2,000-5,000 |
| Cross-link map entries | ~50 entries | 15-25 per entry | 750-1,250 |
| Teaser updates | ~10 entries | 20-40 per entry | 200-400 |
| **Total** | | | **~80,000-180,000 words** |

This will require multiple content generation sessions. Expect 8-15 sessions depending on output length per session.

---

## 15. Claude Code Implementation Instructions

### 15.1 New Files to Create

**1. FAQ Data Array: `src/data/content/faqs.js`**

Create this file with the complete FAQ data array following the structure defined in Section 13.3. Export two items:
- `FAQ_CLUSTERS` — array of cluster objects with `slug`, `name`, `order`
- `FAQS` — array of all FAQ entry objects

Each FAQ entry must include all fields defined in Section 13.3's data structure. The `fullAnswer` field should contain the complete answer content as a plain text string with `\n\n` for paragraph breaks. Follow the content guidelines in Sections 3.1 (differentiation), 3.2 (evergreen), 3.4 (data sourcing), 3.5 (search intent), and 12 (tone and style) when writing the content.

**2. FAQ Page Components:**

`src/pages/FaqIndex.jsx` — Main FAQ index page at `/faq`
- Renders all clusters as sections with cluster name, brief description, and links to individual FAQ pages within each cluster
- Include a brief introductory paragraph about BankSift's educational resources
- JSON-LD structured data: FAQPage schema (aggregate)

`src/pages/FaqClusterIndex.jsx` — Cluster index page at `/faq/:clusterSlug`
- Lists all FAQ questions within the cluster with their `shortAnswer` teasers
- Links to individual FAQ pages
- Links to adjacent clusters for navigation
- Breadcrumb: Home > FAQ > {Cluster Name}

`src/pages/FaqDetail.jsx` — Individual FAQ page at `/faq/:clusterSlug/:faqSlug`
- Renders the full answer content
- Displays related metrics, valuations, FAQ, and glossary links in a sidebar or bottom section
- Renders the appropriate CTA based on the `cta` field
- Breadcrumb: Home > FAQ > {Cluster Name} > {Question}
- JSON-LD structured data: Question/Answer schema
- Unique meta title and description from the data entry

**3. "How to Calculate" FAQ pages** are stored in the same `FAQS` array and rendered by the same `FaqDetail.jsx` component. They belong to the cluster matching their metric category (e.g., `how-to-calculate-roe` belongs to the `profitability` cluster). Their `intentType` is always `procedural`.

### 15.2 Files to Modify

**`src/App.jsx`** — Add routes:
```javascript
// FAQ routes
<Route path="/faq" element={<FaqIndex />} />
<Route path="/faq/:clusterSlug" element={<FaqClusterIndex />} />
<Route path="/faq/:clusterSlug/:faqSlug" element={<FaqDetail />} />
```

**`src/data/content/metrics.js`** — Two types of changes:
1. Add 23 new metric entries (Section 4) with all fields including the new expanded fields
2. Extend all 13 existing metric entries with the new fields (Section 6)

**`src/data/content/valuations.js`** — Two types of changes:
1. Add 5 new valuation method entries (Section 5) with all fields
2. Extend all 7 existing valuation entries with analogous expanded fields

**`src/pages/MetricDetail.jsx`** — Update template to render new sections:
- Bank-Specific Context section
- Metric Connections section
- Common Pitfalls section
- Across Bank Types section
- What Drives This Metric section
- Where to Find This Data section (for educational-only metrics)
- FAQ Teasers section (2-3 teaser cards with "Read more" links)
- Conditional logic: only render sections when the field is present and non-empty
- For `isEducationalOnly: true` metrics: do NOT display screener CTA; instead show "Where to Find This Data"

**`src/pages/ValuationDetail.jsx`** — Same pattern of updates as MetricDetail.jsx

**Metrics hub page (`src/pages/` — the component rendering `/metrics`):**
- Update to use the new category structure (Section 4, "Metric Page Categorization")
- Add link to FAQ section at bottom

**Valuation hub page:** — Add link to FAQ section at bottom

**Homepage component:**
- Convert FAQ teasers per Section 11.1
- Add FAQ link to "What You Can Do" section

**Site navigation component** — Add "FAQ" link alongside existing nav items

**Glossary component** — Add all new terms from Section 7, maintaining existing formatting pattern. Add links to corresponding metric/valuation/FAQ pages where they exist.

**`scripts/prerender.mjs`** — Add pre-rendering blocks for:
- `/faq` (FAQ main index)
- `/faq/:clusterSlug` (11 cluster index pages)
- `/faq/:clusterSlug/:faqSlug` (all individual FAQ pages — 148 standard + 36 "How to Calculate" = 184 pages)
- All new metric pages (23 new routes)
- All new valuation pages (5 new routes)

Each pre-rendered page must include:
- Unique `<title>` and `<meta description>` (from data entry fields)
- Open Graph and Twitter Card tags
- JSON-LD structured data (FAQPage for index pages, Question/Answer for individual FAQ pages, existing schemas for new metric/valuation pages)
- Complete `<article>` element with content for crawlers
- Breadcrumb structured data

**`scripts/generate-sitemap.mjs`** — Add all new routes to sitemap generation:
- Read from `FAQS` and `FAQ_CLUSTERS` arrays to enumerate FAQ routes
- Read from updated `METRICS` and `VALUATION_METHODS` arrays for new metric/valuation routes
- Set appropriate `<changefreq>` and `<priority>` values (FAQ pages: monthly/0.7; metric/valuation pages: monthly/0.8)

### 15.3 Build Verification

After implementing all changes, verify:
1. `npm run build` completes without errors
2. All new routes render correctly in the browser
3. Pre-rendered HTML files exist for all new routes
4. Sitemap includes all new URLs
5. Internal links between FAQ pages, metric pages, valuation pages, and glossary terms all resolve correctly
6. Existing pages still function correctly (no regressions)
7. FAQ teasers on existing pages link to correct FAQ pages
8. Navigation includes FAQ link
9. Educational-only metric pages do NOT include screener CTAs
10. All metric/valuation pages display new expanded sections when fields are present

---

## 16. Phased Rollout Plan

### Phase 1: Foundation (Highest Impact)

**Build the FAQ system infrastructure first**, then populate with highest-value content:

1. Create FAQ data structure, components, and routing (the system)
2. Populate Cluster 1 (Getting Started) — beginner bridge content
3. Populate Cluster 3 (Profitability) — extends strongest existing content
4. Populate Cluster 6 (Valuation) — extends strongest existing content
5. Populate Cluster 10 (Screening) — drives tool usage
6. Create "How to Calculate" pages for all 13 existing metrics
7. Expand all 13 existing metric pages with new sections
8. Expand all 7 existing valuation pages with new sections
9. Convert existing FAQ teasers (homepage, valuation page)
10. Add FAQ to site navigation

### Phase 2: Build Depth

1. Populate Cluster 4 (Efficiency and Funding)
2. Populate Cluster 5 (Capital and Asset Quality)
3. Populate Cluster 7 (Dividends)
4. Populate Cluster 8 (Interest Rates)
5. Add all new metric pages (23 pages) — capital, asset quality, profitability, valuation, efficiency
6. Create "How to Calculate" pages for all 23 new metrics
7. Add all new valuation method pages (5 pages)
8. Expand glossary with all new terms

### Phase 3: Complete Coverage

1. Populate Cluster 2 (Financial Statements)
2. Populate Cluster 9 (Bank Types)
3. Populate Cluster 11 (Advanced)
4. Final internal linking audit — verify all cross-references work
5. Full sitemap and pre-render verification

### Content to Defer to Future Blog/Insights Section (Not Part of This Implementation)

The following topics were identified during planning but are better suited to a blog or insights section due to their time-sensitive, narrative, or analytical nature:

- History and evolution of Basel III capital requirements
- History and evolution of bank stress testing
- Detailed Dodd-Frank Act analysis and impact
- The Volcker Rule — what it is and how it affects banks
- SIFI designation and too-big-to-fail debate
- 2008 financial crisis — causes, bank failures, and impact on bank stocks
- COVID-19 impact on bank dividends and operations
- 2023 banking crisis (SVB, Signature, First Republic) — what happened and lessons learned
- Current regulatory environment and pending proposals
- Interest rate cycle analysis and current Fed policy impact

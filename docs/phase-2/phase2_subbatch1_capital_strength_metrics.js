// ============================================================================
// PHASE 2 / BATCH 2 — SUB-BATCH 1: CAPITAL STRENGTH METRICS (7 entries)
// ============================================================================
// Target file: src/data/content/metrics.js (append to METRICS array)
// All entries are isEducationalOnly: true (not in screener)
// Category: 'capital', categoryLabel: 'Capital Strength Ratio'
//
// SLUG REFERENCE (for cross-link validation):
// -----------------------------------------------
// EXISTING METRIC SLUGS:
//   roe, roaa, net-interest-margin, efficiency-ratio, price-to-book,
//   price-to-earnings, earnings-per-share, book-value-per-share,
//   equity-to-assets, loans-to-deposits, deposits-to-assets,
//   loans-to-assets, dividend-payout-ratio
//
// NEW METRIC SLUGS (this sub-batch):
//   cet1-capital-ratio, tier-1-capital-ratio, total-capital-ratio,
//   tier-1-leverage-ratio, supplementary-leverage-ratio,
//   tangible-common-equity-ratio, risk-weighted-assets-density
//
// NEW METRIC SLUGS (other sub-batches, for cross-referencing):
//   non-performing-loans-ratio, non-performing-assets-ratio,
//   net-charge-off-ratio, loan-loss-reserve-ratio, reserve-coverage-ratio,
//   texas-ratio, provision-to-average-loans,
//   return-on-tangible-common-equity, pre-provision-net-revenue,
//   net-overhead-ratio, price-to-tangible-book-value,
//   tangible-book-value-per-share, cost-of-funds, cost-of-deposits,
//   non-interest-income-to-revenue, interest-income-to-earning-assets
//
// EXISTING VALUATION SLUGS:
//   graham-number, margin-of-safety, dividend-discount-model,
//   price-to-book-valuation, price-to-earnings-valuation,
//   peer-comparison, roe-pb-framework
//
// NEW VALUATION SLUGS (Batch 2):
//   price-to-tangible-book-valuation, excess-capital-return-model,
//   discounted-earnings-model, gordon-growth-model, dupont-decomposition
//
// FAQ SLUGS referenced in faqTeasers (Cluster 5, created in later sub-batch):
//   what-is-cet1-ratio, what-is-tier-1-capital-ratio,
//   cet1-vs-tier1-vs-total-capital, what-are-risk-weighted-assets,
//   what-is-tce-ratio, what-happens-below-minimum-capital,
//   well-capitalized-vs-adequately-capitalized,
//   tangible-book-value-vs-book-value
//
// How to Calculate FAQ SLUGS (created in later sub-batch):
//   how-to-calculate-cet1-ratio, how-to-calculate-tier1-ratio,
//   how-to-calculate-total-capital-ratio, how-to-calculate-leverage-ratio,
//   how-to-calculate-slr, how-to-calculate-tce-ratio,
//   how-to-calculate-rwa-density
// ============================================================================

const CAPITAL_STRENGTH_METRICS = [
  // =========================================================================
  // 1. CET1 Capital Ratio
  // =========================================================================
  {
    slug: 'cet1-capital-ratio',
    name: 'CET1 Capital Ratio',
    category: 'capital',
    categoryLabel: 'Capital Strength Ratio',
    formula: 'CET1 Capital Ratio = Common Equity Tier 1 Capital / Risk-Weighted Assets',
    isPercentage: true,
    shortDescription: 'Measures a bank\'s highest-quality capital as a percentage of its risk-weighted assets, serving as the primary regulatory capital metric under Basel III',
    description: 'The CET1 Capital Ratio divides a bank\'s Common Equity Tier 1 capital by its risk-weighted assets. CET1 capital consists of common stock, retained earnings, accumulated other comprehensive income (AOCI), and qualifying minority interests, minus regulatory deductions such as goodwill and certain deferred tax assets. It is the most closely watched capital adequacy measure because it represents the capital most readily available to absorb losses.',
    formulaExplanation: 'The numerator, CET1 capital, starts with total common shareholders\' equity and then applies regulatory adjustments. Goodwill, other intangible assets (except mortgage servicing rights within limits), and certain deferred tax assets are deducted. The denominator, risk-weighted assets (RWA), assigns each asset a weight based on its credit risk profile. Cash and US Treasuries carry a 0% weight, residential mortgages typically carry 50%, and most commercial loans carry 100%. Off-balance-sheet exposures such as unfunded commitments are converted to on-balance-sheet equivalents before weighting.',
    interpretation: 'A higher CET1 ratio indicates a larger capital cushion relative to the risk profile of the bank\'s assets. The Federal Reserve requires a minimum CET1 ratio of 4.5% for all banks, with additional buffers required depending on the institution\'s size and systemic importance. Most well-capitalized banks maintain CET1 ratios well above minimums, typically in the 10% to 13% range, to provide a buffer against stress scenarios and to maintain flexibility for capital returns and growth.',
    typicalRange: 'The Federal Reserve sets a minimum CET1 requirement of 4.5%. A bank is considered "well-capitalized" at 6.5% or above under the prompt corrective action framework. In practice, most US banks operate with CET1 ratios between 10% and 14%, reflecting both regulatory buffers and management\'s desire to maintain capital flexibility.',
    goodBad: {
      good: 'CET1 ratios above 10% generally indicate strong capitalization with adequate buffers above regulatory minimums. Ratios in the 11% to 13% range suggest a bank has room for both organic growth and capital returns to shareholders while remaining well above stress-test thresholds.',
      bad: 'CET1 ratios below 8% may signal limited capital flexibility, particularly for larger banks subject to stress capital buffer requirements. Ratios approaching the 4.5% minimum trigger regulatory restrictions on dividends, buybacks, and discretionary bonus payments through the capital conservation buffer framework.',
    },
    considerations: [
      'CET1 capital includes AOCI, which means unrealized gains or losses on available-for-sale securities directly affect the ratio. During periods of rising interest rates, bond portfolio losses can reduce CET1 even if the bank has no intention of selling those securities.',
      'Risk-weighted assets are calculated using regulatory formulas that may not fully capture the true economic risk of certain exposures. Two banks with identical total assets can have very different RWA depending on their asset mix, making CET1 comparisons across banks more meaningful than simple equity-to-assets comparisons.',
      'Large banks subject to the Federal Reserve\'s stress tests receive a stress capital buffer (SCB) that effectively raises their CET1 requirement above the 4.5% minimum. The SCB varies by institution and is recalculated annually based on stress test results.',
      'Community banks with total assets under $10 billion may elect the Community Bank Leverage Ratio (CBLR) framework, which uses a simple leverage ratio of 9% instead of risk-based capital ratios. Banks using CBLR do not need to calculate or report CET1.',
    ],
    relatedMetrics: ['tier-1-capital-ratio', 'total-capital-ratio', 'equity-to-assets', 'risk-weighted-assets-density', 'tangible-common-equity-ratio', 'roe'],
    relatedMetricDescriptions: {
      'tier-1-capital-ratio': 'Tier 1 adds Additional Tier 1 capital instruments (such as non-cumulative preferred stock) to CET1, providing a broader view of high-quality capital.',
      'total-capital-ratio': 'Total Capital includes both Tier 1 and Tier 2 capital, representing the full regulatory capital base available to absorb losses.',
      'equity-to-assets': 'Equity to Assets provides a simpler, non-risk-weighted capital measure that complements the risk-based CET1 ratio.',
      'risk-weighted-assets-density': 'RWA Density reveals how conservative or aggressive a bank\'s asset risk profile is, directly affecting the CET1 ratio denominator.',
      'tangible-common-equity-ratio': 'TCE Ratio is an analyst-calculated measure that strips out intangibles similar to CET1 but uses total tangible assets rather than risk-weighted assets.',
      'roe': 'CET1 requirements constrain leverage and therefore place a ceiling on achievable ROE, linking capital adequacy directly to profitability.',
    },
    isEducationalOnly: true,
    whereToFindData: 'CET1 ratios are reported in a bank\'s quarterly earnings releases, 10-Q and 10-K filings (typically in the capital adequacy section), and regulatory filings. For bank holding companies, the Federal Reserve\'s FR Y-9C filing contains detailed capital data. Individual bank Call Reports (FFIEC 031/041) include risk-based capital schedules. The FDIC\'s BankFind Suite provides summary capital ratios for FDIC-insured institutions.',
    bankSpecificContext: 'CET1 is the cornerstone of the Basel III regulatory capital framework adopted in the United States. Unlike simple leverage measures, CET1 adjusts for asset risk, meaning a bank concentrated in low-risk government securities needs less capital than one concentrated in higher-risk commercial real estate loans. This risk-sensitivity makes CET1 the preferred capital metric for regulators and sophisticated investors, but it also introduces complexity. The ratio can change not only because capital levels shift, but also because the risk profile of the asset base changes.',
    metricConnections: 'CET1 is the core component of both the Tier 1 Capital Ratio (CET1 + Additional Tier 1 capital, divided by RWA) and the Total Capital Ratio (Tier 1 + Tier 2, divided by RWA). CET1 requirements effectively cap a bank\'s leverage, which in turn constrains maximum ROE through the relationship ROE = ROA x Equity Multiplier. Banks with higher CET1 requirements must generate higher ROA to achieve competitive ROE. The CET1 ratio and TCE ratio often move together, but can diverge because TCE uses total tangible assets in the denominator while CET1 uses risk-weighted assets.',
    commonPitfalls: 'Comparing CET1 ratios across banks without considering their respective stress capital buffer requirements can be misleading. A bank with a 10% CET1 and a 4% SCB has less distributable capital than a bank with 10% CET1 and a 2.5% SCB. Additionally, CET1 includes AOCI by default for most banks, so large unrealized securities losses can depress the ratio even when the bank has adequate economic capital. Some investors focus on CET1 excluding AOCI to see through temporary mark-to-market fluctuations, but the regulatory ratio includes it.',
    acrossBankTypes: 'Money center and globally systemically important banks (G-SIBs) face the highest effective CET1 requirements due to G-SIB surcharges and countercyclical capital buffers, typically operating with CET1 ratios of 11% to 13%. Regional banks generally target 9% to 12%, balancing regulatory requirements with capital efficiency. Community banks that opt into the CBLR framework do not calculate CET1 at all, instead maintaining a simple 9% leverage ratio.',
    whatDrivesMetric: 'The CET1 ratio is driven by changes in both the numerator and denominator. On the capital side, retained earnings (net income minus dividends) increase CET1, while share buybacks, dividend payments, and unrealized securities losses reduce it. On the RWA side, growing the loan portfolio (particularly in higher-risk-weight categories) increases RWA and lowers the ratio, while shifting assets toward lower-risk-weight categories improves it. Regulatory changes to risk-weight calculations can also move the ratio without any change in actual capital or assets.',
    faqTeasers: [
      {
        question: 'What is the CET1 capital ratio and why does it matter?',
        teaser: 'CET1 measures a bank\'s highest-quality capital relative to the risk in its asset base, serving as the primary metric regulators use to assess capital adequacy under Basel III.',
        faqSlug: 'what-is-cet1-ratio',
        faqCluster: 'capital-and-risk',
      },
      {
        question: 'What is the difference between CET1, Tier 1, and Total Capital ratios?',
        teaser: 'These three ratios form a hierarchy of capital quality, each adding progressively lower-quality capital instruments to the numerator while using the same risk-weighted asset denominator.',
        faqSlug: 'cet1-vs-tier1-vs-total-capital',
        faqCluster: 'capital-and-risk',
      },
      {
        question: 'How do I calculate the CET1 Capital Ratio?',
        teaser: 'CET1 starts with common shareholders\' equity and applies regulatory deductions for goodwill, intangibles, and certain deferred tax assets before dividing by risk-weighted assets.',
        faqSlug: 'how-to-calculate-cet1-ratio',
        faqCluster: 'capital-and-risk',
      },
    ],
  },

  // =========================================================================
  // 2. Tier 1 Capital Ratio
  // =========================================================================
  {
    slug: 'tier-1-capital-ratio',
    name: 'Tier 1 Capital Ratio',
    category: 'capital',
    categoryLabel: 'Capital Strength Ratio',
    formula: 'Tier 1 Capital Ratio = Tier 1 Capital / Risk-Weighted Assets',
    isPercentage: true,
    shortDescription: 'Measures a bank\'s core capital (CET1 plus Additional Tier 1 instruments) as a percentage of risk-weighted assets',
    description: 'The Tier 1 Capital Ratio divides a bank\'s Tier 1 capital by its risk-weighted assets. Tier 1 capital includes both Common Equity Tier 1 (CET1) capital and Additional Tier 1 (AT1) capital. AT1 instruments are typically non-cumulative perpetual preferred stock or similar securities that can absorb losses on a going-concern basis. The ratio represents the broader measure of high-quality capital available to absorb losses while the bank continues operating.',
    formulaExplanation: 'The numerator combines CET1 capital (common stock, retained earnings, AOCI, minus regulatory deductions) with Additional Tier 1 capital. AT1 instruments must be perpetual (no maturity date), subordinated to depositors and general creditors, and capable of absorbing losses through conversion to common equity or write-down. The denominator is the same risk-weighted assets figure used in the CET1 ratio, where each asset is weighted according to its credit risk profile.',
    interpretation: 'A higher Tier 1 ratio indicates more core capital available to absorb unexpected losses. The Federal Reserve requires a minimum Tier 1 Capital Ratio of 6% for all banks. Because AT1 instruments are a relatively small portion of capital at most US banks, the Tier 1 ratio typically runs only slightly above the CET1 ratio. The gap between CET1 and Tier 1 ratios reveals how much a bank relies on preferred stock and other AT1 instruments.',
    typicalRange: 'The Federal Reserve mandates a minimum Tier 1 Capital Ratio of 6%. "Well-capitalized" status under the prompt corrective action framework requires 8% or above. Most US banks operate with Tier 1 ratios between 11% and 15%, with the ratio typically running 0.5 to 2 percentage points above the CET1 ratio depending on how much preferred stock the bank has outstanding.',
    goodBad: {
      good: 'Tier 1 ratios above 11% indicate strong core capital. The relatively small spread between CET1 and Tier 1 at most US banks means that CET1 is doing most of the work, which is a positive indicator of capital quality since CET1 is the purest form of loss-absorbing capital.',
      bad: 'A Tier 1 ratio near the 6% minimum signals potential capital stress, particularly if the bank is subject to additional buffer requirements. A large gap between CET1 and Tier 1 ratios may indicate heavy reliance on preferred stock or other AT1 instruments, which are more expensive forms of capital and can create dilution risk in stress scenarios.',
    },
    considerations: [
      'AT1 instruments at most US banks consist primarily of non-cumulative perpetual preferred stock. These instruments carry a fixed dividend rate that is typically higher than the bank\'s cost of common equity, so heavy reliance on AT1 capital increases the overall cost of capital.',
      'Under Basel III, AT1 instruments must be capable of absorbing losses at the point of non-viability. In practice, this means the instruments can be written down or converted to common equity if the bank faces severe financial distress, potentially diluting common shareholders.',
      'The Tier 1 ratio and CET1 ratio use the same RWA denominator, so the same factors that move CET1 (changes in loan mix, risk-weight methodology updates, asset growth) also move the Tier 1 ratio.',
      'Some banks issue contingent convertible bonds (CoCos) that qualify as AT1 capital under international Basel III standards. While less common in the US than in Europe, these instruments automatically convert to equity when capital ratios fall below a specified trigger level.',
    ],
    relatedMetrics: ['cet1-capital-ratio', 'total-capital-ratio', 'tier-1-leverage-ratio', 'equity-to-assets', 'risk-weighted-assets-density'],
    relatedMetricDescriptions: {
      'cet1-capital-ratio': 'CET1 is the largest and highest-quality component of Tier 1 capital, measuring only common equity-based capital against risk-weighted assets.',
      'total-capital-ratio': 'Total Capital adds Tier 2 instruments (subordinated debt, qualifying loan loss reserves) to Tier 1, providing the broadest regulatory capital measure.',
      'tier-1-leverage-ratio': 'The Tier 1 Leverage Ratio uses the same Tier 1 capital numerator but divides by average total assets instead of risk-weighted assets, providing a non-risk-weighted capital check.',
      'equity-to-assets': 'Equity to Assets is a simpler accounting-based capital measure that does not apply regulatory adjustments or risk weighting.',
      'risk-weighted-assets-density': 'RWA Density indicates the risk profile of the asset base that determines the Tier 1 ratio denominator.',
    },
    isEducationalOnly: true,
    whereToFindData: 'Tier 1 Capital Ratios are disclosed in quarterly earnings releases, 10-Q and 10-K filings, and regulatory filings. Bank holding companies report Tier 1 data on the FR Y-9C. Individual bank Tier 1 ratios are available in Call Reports (FFIEC 031/041) and through the FDIC\'s BankFind Suite.',
    bankSpecificContext: 'Tier 1 capital represents the going-concern capital layer in the Basel III framework. It encompasses all capital instruments that can absorb losses while the bank remains operational, as opposed to Tier 2 capital which is designed to absorb losses only in a liquidation or resolution scenario. For most US banks, the distinction between CET1 and Tier 1 is relatively modest because AT1 instruments represent a small share of total capital. However, for larger banks that have issued significant amounts of preferred stock, the Tier 1 ratio provides a more complete picture of core capital strength.',
    metricConnections: 'Tier 1 = CET1 + Additional Tier 1 capital. The Tier 1 ratio shares its denominator (RWA) with CET1 and Total Capital ratios, forming a three-tiered capital adequacy assessment. The Tier 1 Leverage Ratio uses the same Tier 1 numerator but replaces RWA with average total assets. Both the risk-based Tier 1 ratio and the Tier 1 Leverage Ratio must be met simultaneously; a bank cannot substitute one for the other. The relationship between Tier 1 capital levels and ROE operates through the leverage constraint: higher Tier 1 requirements reduce the equity multiplier and, all else equal, reduce ROE.',
    commonPitfalls: 'Treating the Tier 1 ratio and CET1 ratio as interchangeable is a common error. While they move together, the gap between them matters for understanding capital quality and cost. A bank that has boosted its Tier 1 ratio primarily through preferred stock issuance has a higher cost of capital than one that achieved the same ratio through retained earnings. Additionally, the "well-capitalized" threshold for Tier 1 (8%) is proportionally higher than for CET1 (6.5%), so a bank can be well-capitalized on CET1 but not on Tier 1 if it has very little AT1 capital.',
    acrossBankTypes: 'Large banks and G-SIBs typically have more AT1 instruments outstanding (preferred stock, trust preferred securities grandfathered under transition rules) and therefore show a wider spread between CET1 and Tier 1 ratios. Community banks generally have little or no AT1 capital, making their CET1 and Tier 1 ratios nearly identical. Banks using the Community Bank Leverage Ratio framework do not report the Tier 1 Capital Ratio at all.',
    whatDrivesMetric: 'The same factors that drive CET1 also drive Tier 1: retained earnings growth increases it, while buybacks, dividends, unrealized losses, and loan growth reduce it. Additionally, issuance or redemption of preferred stock or other AT1 instruments directly affects Tier 1 capital without impacting CET1. Changes in risk-weighted assets from loan mix shifts, regulatory methodology updates, or asset growth affect the denominator identically to the CET1 ratio.',
    faqTeasers: [
      {
        question: 'What is the Tier 1 capital ratio?',
        teaser: 'Tier 1 capital measures a bank\'s core loss-absorbing capital, including both common equity and qualifying preferred stock, relative to the risk in its asset base.',
        faqSlug: 'what-is-tier-1-capital-ratio',
        faqCluster: 'capital-and-risk',
      },
      {
        question: 'What is the difference between CET1, Tier 1, and Total Capital ratios?',
        teaser: 'These three ratios form a hierarchy of capital quality, each adding progressively lower-quality capital instruments to the numerator while using the same risk-weighted asset denominator.',
        faqSlug: 'cet1-vs-tier1-vs-total-capital',
        faqCluster: 'capital-and-risk',
      },
    ],
  },

  // =========================================================================
  // 3. Total Capital Ratio
  // =========================================================================
  {
    slug: 'total-capital-ratio',
    name: 'Total Capital Ratio',
    category: 'capital',
    categoryLabel: 'Capital Strength Ratio',
    formula: 'Total Capital Ratio = Total Regulatory Capital / Risk-Weighted Assets',
    isPercentage: true,
    shortDescription: 'Measures all regulatory capital (Tier 1 plus Tier 2) as a percentage of risk-weighted assets, representing the broadest measure of a bank\'s capital adequacy',
    description: 'The Total Capital Ratio divides a bank\'s total regulatory capital by its risk-weighted assets. Total capital includes Tier 1 capital (CET1 + Additional Tier 1) plus Tier 2 capital, which consists of subordinated debt, qualifying loan loss reserves (up to 1.25% of RWA under the standardized approach), and certain other instruments. The ratio represents the full buffer available to absorb losses before depositors and senior creditors face losses.',
    formulaExplanation: 'The numerator combines Tier 1 capital with Tier 2 capital. Tier 2 instruments include subordinated debt with an original maturity of at least five years (subject to amortization in the final five years), qualifying portions of the allowance for loan and lease losses, and certain other qualifying instruments. The allowance for credit losses can count as Tier 2 capital only up to 1.25% of risk-weighted assets under the standardized approach. The denominator is the same risk-weighted assets figure used in CET1 and Tier 1 calculations.',
    interpretation: 'The Total Capital Ratio provides the most comprehensive view of regulatory capital adequacy. A bank must maintain a minimum Total Capital Ratio of 8% under Federal Reserve rules. Because Tier 2 capital absorbs losses only in resolution or liquidation, it is considered lower quality than Tier 1. Regulators and investors therefore focus primarily on CET1 and Tier 1 ratios for assessing ongoing capital strength, but the Total Capital Ratio remains a binding regulatory requirement.',
    typicalRange: 'The minimum requirement is 8%. "Well-capitalized" status requires 10% or above. Most US banks operate with Total Capital Ratios between 12% and 16%. The gap between the Tier 1 ratio and the Total Capital Ratio typically ranges from 1 to 3 percentage points, representing the Tier 2 capital layer.',
    goodBad: {
      good: 'Total Capital Ratios above 12% indicate a substantial overall capital buffer. When the Total Capital Ratio significantly exceeds the Tier 1 ratio, it suggests the bank has issued subordinated debt or has meaningful loan loss reserves contributing to capital, providing additional loss absorption capacity.',
      bad: 'A Total Capital Ratio near 8% indicates thin overall capitalization. If the Tier 2 layer is very small (Total Capital only slightly above Tier 1), the bank has limited additional loss absorption beyond its core equity capital. This may be fine for a conservatively run bank but leaves less margin in a stress scenario.',
    },
    considerations: [
      'Subordinated debt included in Tier 2 capital is amortized for capital purposes over its final five years to maturity. As subordinated debt approaches maturity, it contributes progressively less to the Total Capital Ratio, requiring replacement issuance to maintain the ratio.',
      'The allowance for credit losses (ACL) can count toward Tier 2 capital, but only up to 1.25% of risk-weighted assets under the standardized approach. Banks with large ACLs relative to RWA do not get full capital credit for their provisioning.',
      'Total Capital is the broadest regulatory capital measure but does not capture all loss-absorbing resources. For example, pre-provision net revenue (PPNR) is the first line of defense against loan losses and is not reflected in the capital ratio at all.',
      'Under the Basel III endgame proposals (as discussed in regulatory publications), risk-weight calculations may change for certain asset categories, which would affect all three risk-based capital ratios simultaneously by changing the RWA denominator.',
    ],
    relatedMetrics: ['cet1-capital-ratio', 'tier-1-capital-ratio', 'equity-to-assets', 'risk-weighted-assets-density', 'loan-loss-reserve-ratio'],
    relatedMetricDescriptions: {
      'cet1-capital-ratio': 'CET1 measures only the highest-quality common equity capital, forming the core component of Total Capital.',
      'tier-1-capital-ratio': 'Tier 1 capital is the going-concern capital layer within Total Capital, consisting of CET1 plus Additional Tier 1 instruments.',
      'equity-to-assets': 'Equity to Assets provides a simpler accounting view of capitalization without regulatory adjustments or risk weighting.',
      'risk-weighted-assets-density': 'RWA Density indicates the risk intensity of the asset base, directly affecting the denominator of the Total Capital Ratio.',
      'loan-loss-reserve-ratio': 'Qualifying portions of the loan loss reserve count as Tier 2 capital, creating a direct link between provisioning and the Total Capital Ratio.',
    },
    isEducationalOnly: true,
    whereToFindData: 'Total Capital Ratios are reported alongside CET1 and Tier 1 ratios in quarterly earnings releases, 10-Q and 10-K filings, FR Y-9C regulatory filings (for holding companies), and Call Reports (FFIEC 031/041). The FDIC\'s BankFind Suite and Quarterly Banking Profile provide aggregate and individual bank Total Capital data.',
    bankSpecificContext: 'Total Capital represents the full regulatory capital stack under Basel III. The layered structure (CET1 within Tier 1 within Total Capital) reflects the principle that different capital instruments have different loss-absorbing properties. CET1 absorbs losses first and on a going-concern basis. AT1 instruments absorb losses at the point of non-viability. Tier 2 capital absorbs losses primarily in resolution or liquidation. This hierarchy means that the quality of capital matters as much as its quantity; two banks with identical Total Capital Ratios but different CET1 compositions have meaningfully different capital profiles.',
    metricConnections: 'Total Capital = CET1 + Additional Tier 1 + Tier 2. All three risk-based capital ratios share the same RWA denominator, so any change in asset risk profiles moves all three ratios in the same direction. The Total Capital Ratio has a unique connection to the loan loss reserve ratio because qualifying portions of the allowance for credit losses count as Tier 2 capital. This means that increasing provisions (which reduce earnings and thereby slow CET1 growth) can partially offset by increasing the Tier 2 component of Total Capital.',
    commonPitfalls: 'Focusing on the Total Capital Ratio in isolation can overstate capital strength. Because Tier 2 instruments (subordinated debt, loan loss reserves) have limited loss-absorbing capacity compared to common equity, a bank with a strong Total Capital Ratio but a weak CET1 ratio is in a meaningfully different position than one with strong ratios across all three tiers. Additionally, subordinated debt in Tier 2 carries interest expense, so a bank that has boosted its Total Capital Ratio through subordinated debt issuance has increased its funding costs.',
    acrossBankTypes: 'Large banks tend to have a wider spread between Tier 1 and Total Capital ratios because they more actively issue subordinated debt as a capital management tool. Community banks typically have less Tier 2 capital from subordinated debt (though Small Business Lending Fund and Emergency Capital Investment Program instruments may contribute), relying more on qualifying loan loss reserves for their Tier 2 layer. Banks using the Community Bank Leverage Ratio framework do not calculate or report the Total Capital Ratio.',
    whatDrivesMetric: 'All factors driving CET1 and Tier 1 also drive Total Capital. Additionally, issuance or maturity of subordinated debt changes the Tier 2 component. Changes in the allowance for credit losses affect the qualifying ACL portion of Tier 2. Because subordinated debt amortizes for capital purposes in its final five years, Total Capital can decline even without any operational changes as existing subordinated debt approaches maturity.',
    faqTeasers: [
      {
        question: 'What is the difference between CET1, Tier 1, and Total Capital ratios?',
        teaser: 'These three ratios form a hierarchy of capital quality, each adding progressively lower-quality capital instruments to the numerator while using the same risk-weighted asset denominator.',
        faqSlug: 'cet1-vs-tier1-vs-total-capital',
        faqCluster: 'capital-and-risk',
      },
      {
        question: 'What happens if a bank falls below minimum capital requirements?',
        teaser: 'Federal banking regulators enforce a prompt corrective action framework that imposes increasingly severe restrictions as capital ratios decline below defined thresholds.',
        faqSlug: 'what-happens-below-minimum-capital',
        faqCluster: 'capital-and-risk',
      },
    ],
  },

  // =========================================================================
  // 4. Tier 1 Leverage Ratio
  // =========================================================================
  {
    slug: 'tier-1-leverage-ratio',
    name: 'Tier 1 Leverage Ratio',
    category: 'capital',
    categoryLabel: 'Capital Strength Ratio',
    formula: 'Tier 1 Leverage Ratio = Tier 1 Capital / Average Total Consolidated Assets',
    isPercentage: true,
    shortDescription: 'Measures Tier 1 capital as a percentage of average total assets without risk weighting, providing a simple backstop to risk-based capital ratios',
    description: 'The Tier 1 Leverage Ratio divides a bank\'s Tier 1 capital by its average total consolidated assets. Unlike the CET1 and Tier 1 Capital Ratios, the leverage ratio does not apply risk weights to assets. It serves as a non-risk-sensitive backstop, ensuring that banks maintain a minimum amount of capital relative to their total asset base regardless of how low-risk those assets may be under risk-weighting rules.',
    formulaExplanation: 'The numerator is the same Tier 1 capital figure used in the Tier 1 Capital Ratio (CET1 + Additional Tier 1, with regulatory deductions). The denominator is average total consolidated assets, typically calculated as the quarterly average of daily or monthly balances. Average total assets includes all on-balance-sheet assets but generally excludes off-balance-sheet items (unlike the Supplementary Leverage Ratio). Goodwill and certain intangible assets deducted from Tier 1 capital are also deducted from average total assets to avoid double-counting.',
    interpretation: 'The leverage ratio catches a scenario that risk-based ratios might miss: a bank loading up on assets that carry low risk weights (such as government securities or low-LTV residential mortgages) to the point where total leverage becomes excessive even though risk-based ratios look healthy. The minimum requirement is 4% for most banks. "Well-capitalized" status requires 5% or above.',
    typicalRange: 'The regulatory minimum is 4%, and "well-capitalized" requires 5%. Most US banks maintain leverage ratios between 8% and 11%. Banks with very large securities portfolios may have lower leverage ratios than their risk-based ratios would suggest, because securities carry low risk weights but still count fully in average total assets.',
    goodBad: {
      good: 'Leverage ratios above 8% indicate solid capital relative to the full asset base. Ratios above 10% suggest conservative capitalization. Consistently high leverage ratios alongside strong risk-based ratios confirm robust capital adequacy across both frameworks.',
      bad: 'Leverage ratios below 5% indicate thin capital buffers relative to total assets and would not qualify as "well-capitalized" under the prompt corrective action framework. Ratios near the 4% minimum are concerning and may trigger regulatory attention.',
    },
    considerations: [
      'The leverage ratio uses average total assets rather than period-end assets, which smooths out temporary fluctuations from activities such as repo borrowing, securities settlement, and seasonal deposit flows.',
      'Because the leverage ratio does not risk-weight assets, it penalizes banks that hold large portfolios of low-risk assets (such as US Treasuries or agency MBS) more than risk-based ratios do. This is by design; it prevents banks from arbitraging risk-weight rules.',
      'The Tier 1 Leverage Ratio differs from the Supplementary Leverage Ratio (SLR) in its denominator. The SLR uses total leverage exposure (which includes off-balance-sheet items), while the standard leverage ratio uses only on-balance-sheet average total assets.',
      'For banks using the Community Bank Leverage Ratio (CBLR) framework, the relevant threshold is 9% rather than the standard 4% minimum. CBLR banks use a simplified leverage ratio as their sole capital requirement.',
    ],
    relatedMetrics: ['tier-1-capital-ratio', 'cet1-capital-ratio', 'supplementary-leverage-ratio', 'equity-to-assets', 'tangible-common-equity-ratio'],
    relatedMetricDescriptions: {
      'tier-1-capital-ratio': 'The Tier 1 Capital Ratio uses the same numerator but divides by risk-weighted assets rather than total assets, providing a risk-sensitive complement to the leverage ratio.',
      'cet1-capital-ratio': 'CET1 measures the highest-quality capital component against risk-weighted assets.',
      'supplementary-leverage-ratio': 'SLR expands the leverage ratio denominator to include off-balance-sheet exposures, creating a more comprehensive leverage measure for large banks.',
      'equity-to-assets': 'Equity to Assets provides a similar non-risk-weighted view of capital adequacy but uses accounting equity rather than regulatory Tier 1 capital.',
      'tangible-common-equity-ratio': 'TCE Ratio uses tangible common equity (excluding intangibles and preferred stock) divided by tangible assets, offering an analyst-derived alternative to the regulatory leverage ratio.',
    },
    isEducationalOnly: true,
    whereToFindData: 'Tier 1 Leverage Ratios are reported in quarterly earnings releases, 10-Q and 10-K filings, FR Y-9C regulatory filings (for holding companies), and Call Reports (FFIEC 031/041). The FDIC\'s BankFind Suite provides leverage ratio data for individual institutions. The FDIC Quarterly Banking Profile reports aggregate leverage ratios for the banking industry.',
    bankSpecificContext: 'The leverage ratio is a uniquely important backstop in bank regulation. During the financial crisis of 2007-2009, some banks maintained strong risk-based capital ratios while having dangerously high leverage because their assets were concentrated in categories that carried low risk weights. The leverage ratio was strengthened under Basel III specifically to address this gap. It ensures a minimum level of capital adequacy that cannot be circumvented through asset allocation choices, however low-risk they may appear under risk-weighting models.',
    metricConnections: 'The leverage ratio shares its numerator with the Tier 1 Capital Ratio, so changes in Tier 1 capital affect both ratios identically. However, the two ratios can move in opposite directions when the asset mix changes: shifting from high-risk-weight assets (commercial loans) to low-risk-weight assets (Treasuries) reduces RWA and improves the risk-based ratio while increasing total assets (or keeping them constant) and potentially worsening the leverage ratio. This tension is by design and forces banks to maintain capital from both perspectives. The leverage ratio is also mechanically related to ROE: Tier 1 Leverage Ratio = (Net Income / Average Assets) x (Average Assets / Tier 1 Capital), connecting profitability and leverage.',
    commonPitfalls: 'Comparing the Tier 1 Leverage Ratio to the Equity to Assets ratio and expecting similar values is a common source of confusion. Regulatory Tier 1 capital differs from accounting equity due to deductions for goodwill, intangibles, and other items. Additionally, mixing up the standard leverage ratio (average total assets denominator) with the Supplementary Leverage Ratio (total leverage exposure denominator) is a frequent error. The SLR applies only to large banks and produces a lower ratio because its denominator is larger.',
    acrossBankTypes: 'Community banks (particularly those using CBLR) tend to have higher leverage ratios, often 9% to 12%, reflecting both the higher CBLR threshold and typically simpler balance sheets. Large banks generally run leverage ratios of 6% to 9%, with the largest banks constrained by the enhanced SLR requirement. Banks with large securities portfolios may show a notable gap between their risk-based ratios and leverage ratio, with the leverage ratio appearing relatively weaker.',
    whatDrivesMetric: 'Changes in Tier 1 capital (retained earnings, preferred stock issuance/redemption, AOCI movements) directly affect the numerator. Asset growth reduces the ratio, while asset shrinkage improves it. Unlike risk-based ratios, the mix of assets does not matter; only the total size of the balance sheet affects the denominator. This means a bank cannot improve its leverage ratio by shifting into lower-risk assets; it must either increase Tier 1 capital or reduce total assets.',
    faqTeasers: [
      {
        question: 'What is the difference between CET1, Tier 1, and Total Capital ratios?',
        teaser: 'These three ratios form a hierarchy of capital quality, each adding progressively lower-quality capital instruments to the numerator while using the same risk-weighted asset denominator.',
        faqSlug: 'cet1-vs-tier1-vs-total-capital',
        faqCluster: 'capital-and-risk',
      },
      {
        question: 'What is a good equity-to-assets ratio for banks?',
        teaser: 'Equity to Assets provides a simple measure of capital adequacy. Most US banks maintain ratios between 8% and 12%, though the appropriate level depends on the bank\'s risk profile and business model.',
        faqSlug: 'what-is-a-good-equity-to-assets-ratio',
        faqCluster: 'capital-and-risk',
      },
    ],
  },

  // =========================================================================
  // 5. Supplementary Leverage Ratio (SLR)
  // =========================================================================
  {
    slug: 'supplementary-leverage-ratio',
    name: 'Supplementary Leverage Ratio (SLR)',
    category: 'capital',
    categoryLabel: 'Capital Strength Ratio',
    formula: 'SLR = Tier 1 Capital / Total Leverage Exposure',
    isPercentage: true,
    shortDescription: 'Measures Tier 1 capital as a percentage of total leverage exposure including both on- and off-balance-sheet items, applicable to large banking organizations',
    description: 'The Supplementary Leverage Ratio divides a bank\'s Tier 1 capital by its total leverage exposure, which includes both on-balance-sheet assets and certain off-balance-sheet exposures such as derivative notionals, repo-style transactions, and unfunded lending commitments. The SLR applies only to banking organizations with $250 billion or more in total consolidated assets or $10 billion or more in on-balance-sheet foreign exposures, as well as their insured depository institution subsidiaries.',
    formulaExplanation: 'The numerator is Tier 1 capital, identical to the Tier 1 Capital Ratio calculation. The denominator, total leverage exposure, starts with average total consolidated assets and adds off-balance-sheet items including: the notional amount of credit derivatives sold (less purchased protection), the potential future exposure of derivative contracts, the credit equivalent amount of repo-style transactions, and the unconditionally cancellable and non-cancellable portions of unfunded commitments (at varying conversion factors). This expanded denominator is what distinguishes the SLR from the standard Tier 1 Leverage Ratio.',
    interpretation: 'The SLR captures leverage from activities that do not appear on the balance sheet, providing a more comprehensive view of a bank\'s total leverage. The minimum SLR requirement is 3% for applicable banking organizations. G-SIBs face an enhanced SLR (eSLR) requirement with a 2% buffer at the holding company level (total 5%) and a 6% requirement at the insured depository institution level.',
    typicalRange: 'The minimum is 3% for applicable organizations, with G-SIBs subject to a 5% requirement at the holding company level. In practice, large US banks typically maintain SLR between 5% and 7%. The SLR is always lower than the standard Tier 1 Leverage Ratio for the same bank because the denominator is larger.',
    goodBad: {
      good: 'SLR above 5% for large banks and above 6% for G-SIB insured depository subsidiaries indicates comfortable compliance with enhanced requirements. SLR well above minimums provides flexibility for balance sheet expansion, market-making activities, and client-facing derivative businesses.',
      bad: 'SLR near the 3% minimum for applicable banks, or near 5% for G-SIBs, indicates tight capital constraints that may limit the bank\'s ability to expand market-making, repo lending, or derivative activities. Binding SLR constraints can force banks to shrink activities that are profitable but leverage-intensive.',
    },
    considerations: [
      'The SLR can constrain bank activities that are low-risk but balance-sheet-intensive, such as clearing Treasury securities, providing repo financing, or holding client deposits at the Federal Reserve. During periods of market stress, binding SLR constraints have been cited as a factor limiting bank intermediation capacity.',
      'The Federal Reserve temporarily modified SLR calculations during 2020 to exclude US Treasury securities and deposits at Federal Reserve Banks from the denominator, but this modification expired in 2021. The temporary change highlighted how the SLR can interact with monetary policy implementation.',
      'Unlike risk-based capital ratios, the SLR does not differentiate between holding US Treasuries and holding leveraged loans. This flat treatment is the intentional design as a backstop, but it means the SLR can be particularly binding for banks with large, low-risk balance sheets.',
      'Only the largest banking organizations are subject to the SLR. Regional and community banks use the standard Tier 1 Leverage Ratio (or CBLR framework) and do not calculate total leverage exposure.',
    ],
    relatedMetrics: ['tier-1-leverage-ratio', 'tier-1-capital-ratio', 'cet1-capital-ratio', 'risk-weighted-assets-density', 'equity-to-assets'],
    relatedMetricDescriptions: {
      'tier-1-leverage-ratio': 'The standard leverage ratio uses only on-balance-sheet average total assets in the denominator, while the SLR adds off-balance-sheet exposures for a more comprehensive measure.',
      'tier-1-capital-ratio': 'The Tier 1 Capital Ratio shares the same numerator but uses risk-weighted assets, providing a risk-sensitive complement to the non-risk-weighted SLR.',
      'cet1-capital-ratio': 'CET1 measures the highest-quality capital component and is typically the binding capital constraint for most banks, working alongside the SLR as a separate binding constraint.',
      'risk-weighted-assets-density': 'RWA Density indicates the risk profile of the asset base; low RWA Density banks may find the SLR more binding than risk-based ratios because their assets are less penalized under risk weighting.',
      'equity-to-assets': 'Equity to Assets provides a simple leverage measure for all banks, while the SLR applies regulatory adjustments and includes off-balance-sheet exposures for the largest banks.',
    },
    isEducationalOnly: true,
    whereToFindData: 'SLR data for applicable banking organizations is disclosed in quarterly earnings releases and 10-Q/10-K filings, typically in the capital adequacy section alongside other regulatory capital ratios. FR Y-9C filings contain detailed SLR calculations for holding companies. The Federal Reserve publishes SLR data for G-SIBs and large bank holding companies.',
    bankSpecificContext: 'The SLR was introduced as part of the post-crisis Basel III reforms to address a specific vulnerability exposed during 2007-2009: banks had accumulated significant off-balance-sheet exposures (through derivatives, conduits, and commitments) that were not captured by on-balance-sheet leverage measures. The SLR ensures that Tier 1 capital is adequate relative to the full scope of a bank\'s leverage, including commitments and derivative exposures that could generate losses or require funding. For the largest banks, the SLR often interacts with risk-based requirements as a dual constraint, with the binding requirement depending on the bank\'s business mix.',
    metricConnections: 'The SLR shares its Tier 1 capital numerator with the Tier 1 Capital Ratio and standard Tier 1 Leverage Ratio. The key distinction is the denominator: risk-weighted assets (Tier 1 Capital Ratio), average total assets (standard leverage ratio), or total leverage exposure (SLR). For banks with significant derivative and off-balance-sheet activities, the SLR denominator can be substantially larger than average total assets, producing a lower ratio. The relationship between SLR and the standard leverage ratio reveals the magnitude of a bank\'s off-balance-sheet footprint.',
    commonPitfalls: 'Applying the SLR to banks that are not subject to it is a common error. Regional and community banks do not calculate or disclose the SLR. Additionally, comparing SLR across banks without accounting for differences in off-balance-sheet activity intensity is misleading. A bank with a large derivatives business will have a much larger total leverage exposure relative to total assets than a traditional lending-focused bank, making its SLR appear lower even if its on-balance-sheet capitalization is strong.',
    acrossBankTypes: 'The SLR is relevant only for the largest banking organizations (generally $250 billion or more in total consolidated assets). G-SIBs face the most stringent SLR requirements (5% at the holding company, 6% at the insured depository). Large regional banks above the $250 billion threshold are subject to the 3% minimum but not the enhanced buffer. Community and smaller regional banks do not calculate the SLR.',
    whatDrivesMetric: 'Changes in Tier 1 capital affect the SLR numerator identically to other Tier 1-based ratios. The denominator is affected by on-balance-sheet asset growth (same as the standard leverage ratio) plus changes in off-balance-sheet exposures. Expanding derivatives books, increasing unfunded commitments, or growing repo-style transaction volumes all increase total leverage exposure and reduce the SLR. Banks can improve SLR by reducing off-balance-sheet exposures, raising Tier 1 capital, or shrinking the balance sheet.',
    faqTeasers: [
      {
        question: 'What is the difference between CET1, Tier 1, and Total Capital ratios?',
        teaser: 'These three ratios form a hierarchy of capital quality, each adding progressively lower-quality capital instruments to the numerator while using the same risk-weighted asset denominator.',
        faqSlug: 'cet1-vs-tier1-vs-total-capital',
        faqCluster: 'capital-and-risk',
      },
      {
        question: 'What happens if a bank falls below minimum capital requirements?',
        teaser: 'Federal banking regulators enforce a prompt corrective action framework that imposes increasingly severe restrictions as capital ratios decline below defined thresholds.',
        faqSlug: 'what-happens-below-minimum-capital',
        faqCluster: 'capital-and-risk',
      },
    ],
  },

  // =========================================================================
  // 6. Tangible Common Equity (TCE) Ratio
  // =========================================================================
  {
    slug: 'tangible-common-equity-ratio',
    name: 'Tangible Common Equity (TCE) Ratio',
    category: 'capital',
    categoryLabel: 'Capital Strength Ratio',
    formula: 'TCE Ratio = Tangible Common Equity / Tangible Assets',
    isPercentage: true,
    shortDescription: 'Measures tangible common equity as a percentage of tangible assets, providing a conservative analyst-derived capital measure that excludes intangibles and preferred stock',
    description: 'The Tangible Common Equity Ratio divides tangible common equity (total common equity minus goodwill and other intangible assets) by tangible assets (total assets minus goodwill and other intangible assets). Unlike regulatory capital ratios, the TCE ratio is not a formal regulatory requirement but is widely used by equity analysts and bank investors as a more conservative measure of capital strength. It focuses exclusively on common equity and strips out intangible assets that may have limited value in a stress scenario.',
    formulaExplanation: 'Tangible common equity starts with total shareholders\' equity, subtracts preferred stock (including minority interests in some calculations), and then subtracts goodwill and other intangible assets (such as core deposit intangibles, customer relationship intangibles, and trade names). Mortgage servicing rights may or may not be subtracted depending on the analyst\'s methodology. Tangible assets equal total assets minus the same goodwill and intangible assets deducted from equity. Both adjustments ensure consistency between numerator and denominator.',
    interpretation: 'The TCE ratio reveals how much tangible common equity backs each dollar of tangible assets. It is particularly relevant for banks that have grown through acquisitions, as acquisitions generate goodwill that inflates book value and the equity-to-assets ratio but may not represent tangible value in a stress scenario. A bank with a strong TCE ratio has more hard capital supporting its assets.',
    typicalRange: 'There is no regulatory minimum for the TCE ratio since it is an analyst-derived measure. Most US banks maintain TCE ratios between 6% and 10%. Banks with significant goodwill from acquisitions will show a meaningful gap between their equity-to-assets ratio and their TCE ratio. Banks with minimal or no goodwill will have TCE ratios close to their equity-to-assets ratios.',
    goodBad: {
      good: 'TCE ratios above 7% generally indicate adequate tangible capital. Banks with TCE ratios above 9% have strong tangible capital cushions. A TCE ratio close to the equity-to-assets ratio indicates minimal goodwill and intangibles, meaning book value is largely composed of tangible assets.',
      bad: 'TCE ratios below 5% indicate thin tangible capital, particularly concerning for banks with large intangible asset balances. A large gap between the equity-to-assets ratio and the TCE ratio signals significant goodwill from acquisitions, which may impair the bank\'s ability to absorb losses with tangible capital.',
    },
    considerations: [
      'The TCE ratio is not standardized across analysts. Different methodologies for treating mortgage servicing rights, deferred tax assets, and AOCI can produce meaningfully different TCE figures for the same bank. When comparing TCE ratios across sources, verify the calculation methodology.',
      'Goodwill is tested for impairment annually under accounting rules. If a bank writes down goodwill (recognizing that an acquisition overpaid), the TCE ratio actually improves because goodwill is removed from both sides of the calculation even though total equity declines.',
      'The TCE ratio can differ significantly from the CET1 ratio even though both exclude goodwill and intangibles. CET1 uses risk-weighted assets in the denominator, while TCE uses tangible total assets. A bank with a conservative, low-risk-weight asset portfolio may have a much higher CET1 ratio than TCE ratio.',
      'For banks that have never made acquisitions and carry no goodwill, the TCE ratio equals the equity-to-assets ratio (adjusted only for any non-goodwill intangibles and preferred stock). The TCE ratio becomes most valuable when comparing across banks with different acquisition histories.',
    ],
    relatedMetrics: ['equity-to-assets', 'tangible-book-value-per-share', 'cet1-capital-ratio', 'price-to-tangible-book-value', 'roe', 'return-on-tangible-common-equity'],
    relatedMetricDescriptions: {
      'equity-to-assets': 'Equity to Assets uses total equity and total assets without stripping intangibles, making TCE the more conservative comparison.',
      'tangible-book-value-per-share': 'TBVPS expresses tangible common equity on a per-share basis, serving as the denominator in the Price to Tangible Book Value ratio.',
      'cet1-capital-ratio': 'CET1 applies similar intangible deductions as TCE but uses risk-weighted assets in the denominator, making it a regulatory rather than analyst-derived measure.',
      'price-to-tangible-book-value': 'P/TBV uses tangible book value per share as its denominator, directly connecting the TCE concept to market valuation.',
      'roe': 'ROE measures return on total common equity; banks with significant goodwill may appear to have strong ROE while TCE reveals the tangible capital base is thinner.',
      'return-on-tangible-common-equity': 'ROTCE divides net income by tangible common equity, providing a profitability measure that pairs with the TCE ratio to assess returns on tangible capital.',
    },
    isEducationalOnly: true,
    whereToFindData: 'TCE is not a standard regulatory reporting line item, but many banks disclose it in their quarterly earnings releases as a non-GAAP financial measure with a reconciliation to GAAP equity. Investors can also calculate TCE from 10-K and 10-Q filings using total equity, preferred stock, goodwill, and intangible asset line items on the balance sheet. The FDIC\'s UBPR (Uniform Bank Performance Report) provides tangible equity capital ratios for individual banks.',
    bankSpecificContext: 'The TCE ratio gained prominence during the 2007-2009 financial crisis when some banks with apparently adequate equity-to-assets ratios were revealed to have thin tangible capital because a large portion of their equity consisted of goodwill from prior acquisitions. Goodwill cannot absorb losses; it is simply an accounting entry reflecting past acquisition premiums. By stripping it out, the TCE ratio provides a clearer picture of the hard capital available to absorb losses. This makes the TCE ratio especially important when evaluating serial acquirers or banks in M&A-active markets.',
    metricConnections: 'TCE = Total Common Equity - Goodwill - Other Intangibles. TCE / Shares Outstanding = TBVPS. Market Price / TBVPS = P/TBV. Net Income / TCE = ROTCE. The TCE ratio therefore sits at the center of a network of tangible capital and valuation metrics. Banks with high TCE ratios but low P/TBV may represent value opportunities if the tangible assets are sound. Banks with low TCE ratios and high ROTCE are generating strong returns but with less tangible capital cushion, which increases risk in a downturn.',
    commonPitfalls: 'Using TCE as a direct substitute for regulatory capital ratios can be misleading because TCE does not account for asset risk. A bank with a 7% TCE ratio concentrated in US Treasuries is in a fundamentally different risk position than one with 7% concentrated in subprime auto loans. Additionally, different analysts define TCE differently (particularly regarding the treatment of mortgage servicing rights and AOCI), so comparisons across research reports may not be apples-to-apples without verifying methodology.',
    acrossBankTypes: 'Serial-acquirer banks (common among mid-size regionals) tend to carry significant goodwill and therefore show meaningful gaps between equity-to-assets and TCE ratios. Community banks that have grown organically typically carry minimal goodwill, making their TCE and equity-to-assets ratios nearly identical. Money center banks generally carry goodwill from past acquisitions but it represents a smaller percentage of their total equity given their scale.',
    whatDrivesMetric: 'TCE increases through retained earnings (net income minus dividends) and decreases through share buybacks, dividends, and AOCI losses. Acquisitions directly affect TCE in two ways: goodwill created reduces TCE (numerator and denominator adjusted), while the acquired bank\'s tangible assets and equity add to the consolidated figures. Goodwill impairment charges reduce total equity but improve the TCE ratio because the impaired goodwill is removed. Intangible asset amortization gradually improves TCE over time as intangibles are written down.',
    faqTeasers: [
      {
        question: 'What is tangible common equity (TCE) ratio and why do bank analysts use it?',
        teaser: 'The TCE ratio strips out goodwill and intangible assets to reveal the tangible capital backing a bank\'s tangible assets, providing a more conservative capital measure than equity-to-assets.',
        faqSlug: 'what-is-tce-ratio',
        faqCluster: 'capital-and-risk',
      },
      {
        question: 'What is tangible book value and why is it different from book value?',
        teaser: 'Tangible book value removes goodwill and intangible assets from total equity, showing the hard capital available to absorb losses rather than the accounting book value inflated by past acquisition premiums.',
        faqSlug: 'tangible-book-value-vs-book-value',
        faqCluster: 'capital-and-risk',
      },
      {
        question: 'How do I calculate the TCE Ratio?',
        teaser: 'TCE Ratio equals tangible common equity divided by tangible assets. Both figures are derived by subtracting goodwill and intangible assets from total common equity and total assets respectively.',
        faqSlug: 'how-to-calculate-tce-ratio',
        faqCluster: 'capital-and-risk',
      },
    ],
  },

  // =========================================================================
  // 7. Risk-Weighted Assets Density
  // =========================================================================
  {
    slug: 'risk-weighted-assets-density',
    name: 'Risk-Weighted Assets Density',
    category: 'capital',
    categoryLabel: 'Capital Strength Ratio',
    formula: 'RWA Density = Risk-Weighted Assets / Total Assets',
    isPercentage: true,
    shortDescription: 'Measures risk-weighted assets as a percentage of total assets, indicating how conservative or aggressive a bank\'s asset risk profile is under regulatory risk-weighting rules',
    description: 'Risk-Weighted Assets Density divides a bank\'s total risk-weighted assets by its total assets. The result indicates the average risk weight assigned to the bank\'s asset base under regulatory capital rules. A higher density means the bank holds a greater proportion of assets in higher-risk-weight categories (such as commercial loans, construction loans, or equity investments). A lower density indicates a portfolio tilted toward lower-risk-weight assets (such as government securities, agency MBS, or well-collateralized residential mortgages).',
    formulaExplanation: 'The numerator is total risk-weighted assets as reported by the bank for regulatory capital purposes. This figure starts with on-balance-sheet assets, each multiplied by its prescribed risk weight, and adds credit-equivalent amounts of off-balance-sheet exposures. The denominator is total assets from the balance sheet. Because risk weights range from 0% (cash, US Treasuries) to 150% or more (certain past-due exposures, equity investments), and off-balance-sheet items are included in RWA but not in total assets, the RWA Density can theoretically exceed 100%.',
    interpretation: 'RWA Density provides context for interpreting risk-based capital ratios. A bank with a CET1 ratio of 10% and RWA Density of 60% has a much more conservative asset portfolio than one with the same CET1 ratio but RWA Density of 90%. The first bank could be lending primarily in secured residential mortgages and holding government bonds, while the second is concentrated in higher-risk commercial lending. RWA Density effectively reveals the risk "intensity" of the balance sheet.',
    typicalRange: 'US banks typically have RWA Density between 55% and 85%. Banks with large government securities portfolios and residential mortgage books tend to have lower density (55% to 65%). Banks concentrated in commercial and industrial lending, commercial real estate, or consumer lending tend to have higher density (70% to 85%). Banks with significant off-balance-sheet derivative exposures may see their RWA density elevated above what the on-balance-sheet asset mix alone would suggest.',
    goodBad: {
      good: 'RWA Density below 65% indicates a conservative asset mix with significant holdings of low-risk-weight assets. This is neither good nor bad in isolation; it means risk-based capital ratios will appear stronger relative to leverage ratios. For a bank targeting high risk-based capital ratios with a limited equity base, lower RWA Density provides more capital efficiency.',
      bad: 'RWA Density above 85% indicates a high-risk asset mix, meaning the bank needs proportionally more capital to maintain the same risk-based capital ratios. Very high RWA Density may also indicate concentration in asset categories that carry higher credit risk, which warrants additional scrutiny of asset quality metrics.',
    },
    considerations: [
      'RWA Density is a useful complement to risk-based capital ratios because it separates the capital question (how much capital does the bank have?) from the risk question (how risky is the asset base?). Two banks with identical CET1 ratios can have very different risk profiles depending on their RWA Density.',
      'Changes in regulatory risk-weight methodologies can shift RWA Density for the entire industry without any change in actual lending or investment behavior. Basel III endgame proposals, for example, would alter risk weights for several asset categories.',
      'Off-balance-sheet exposures (derivatives, unfunded commitments) are included in RWA but not in total assets, which can push RWA Density above levels that the on-balance-sheet asset mix alone would suggest. This is more relevant for large banks with significant derivative activities.',
      'RWA Density trends over time reveal strategic shifts in a bank\'s business model. Increasing density may indicate a shift toward higher-yielding (but higher-risk) lending, while declining density may indicate a build-up of securities holdings or a de-risking of the loan portfolio.',
    ],
    relatedMetrics: ['cet1-capital-ratio', 'tier-1-capital-ratio', 'total-capital-ratio', 'tier-1-leverage-ratio', 'equity-to-assets', 'loans-to-assets'],
    relatedMetricDescriptions: {
      'cet1-capital-ratio': 'RWA is the denominator of the CET1 ratio; higher RWA Density for a given total asset base means a lower CET1 ratio, all else equal.',
      'tier-1-capital-ratio': 'The Tier 1 Capital Ratio also uses RWA as its denominator, making RWA Density directly relevant to Tier 1 capital adequacy assessment.',
      'total-capital-ratio': 'Total Capital Ratio shares the same RWA denominator, and RWA Density helps explain why two banks with similar equity can have different Total Capital Ratios.',
      'tier-1-leverage-ratio': 'The leverage ratio uses total assets (not RWA) in its denominator, creating a complementary measure that does not depend on risk-weight assignments.',
      'equity-to-assets': 'Equity to Assets and RWA Density together explain the gap between leverage-based and risk-based capital ratios for a given bank.',
      'loans-to-assets': 'Loans to Assets indicates the share of total assets in loans, and since most loans carry 100% risk weights, a higher L/A ratio generally correlates with higher RWA Density.',
    },
    isEducationalOnly: true,
    whereToFindData: 'Total risk-weighted assets are reported in a bank\'s regulatory capital disclosures within 10-Q and 10-K filings, FR Y-9C filings (for holding companies), and Call Reports (FFIEC 031/041). Total assets are reported on the balance sheet. Dividing one by the other yields RWA Density. Some banks disclose RWA breakdowns by asset category in their Basel III Pillar 3 disclosures, which provide additional detail on the composition of risk-weighted assets.',
    bankSpecificContext: 'RWA Density is particularly useful for bank analysis because different bank business models produce very different risk-weight profiles. A bank focused on prime residential mortgage lending and holding a large portfolio of agency MBS will have much lower RWA Density than a bank focused on leveraged lending, CRE construction, or unsecured consumer credit. Understanding this difference is essential for comparing capital adequacy across banks with different strategies. RWA Density also reveals how much a bank benefits (or not) from the risk-weighting system; banks with low RWA Density get more "capital credit" per dollar of equity than those with high density.',
    metricConnections: 'RWA Density connects risk-based capital ratios to the leverage ratio. For a given amount of Tier 1 capital, the Tier 1 Capital Ratio = Tier 1 Leverage Ratio / RWA Density. This means a bank with 50% RWA Density and a 5% leverage ratio has a 10% Tier 1 Capital Ratio, while a bank with 80% RWA Density and the same leverage ratio has only a 6.25% Tier 1 Capital Ratio. RWA Density also interacts with NIM: higher-risk-weight loans typically carry higher yields, so banks with higher RWA Density often (but not always) have higher NIMs.',
    commonPitfalls: 'Interpreting low RWA Density as automatically indicating a low-risk bank is an oversimplification. Risk weights are based on regulatory formulas that may not perfectly capture economic risk. Interest rate risk on a large securities portfolio, for example, is not reflected in credit risk weights. A bank with low RWA Density due to large government bond holdings may face significant interest rate risk even though its risk-weighted capital ratios look strong. Additionally, comparing RWA Density across jurisdictions can be misleading because risk-weight methodologies differ internationally.',
    acrossBankTypes: 'Money center banks and G-SIBs tend to have moderate RWA Density (60% to 75%) because their diversified asset mix includes both low-risk-weight securities and higher-risk-weight commercial loans. Community banks focused on commercial real estate lending typically have higher RWA Density (70% to 85%) because CRE loans carry elevated risk weights. Banks with large residential mortgage portfolios tend to have lower density, particularly if they hold conforming agency-eligible loans.',
    whatDrivesMetric: 'RWA Density is driven entirely by the composition of the asset base and the applicable risk-weight assignments. Growing the loan portfolio (particularly commercial and CRE loans) increases RWA Density. Building the securities portfolio with government bonds or agency MBS reduces it. Changes in regulatory risk-weight methodology can move RWA Density without any change in actual asset mix. Off-balance-sheet activity growth (derivatives, commitments) can also increase RWA relative to total assets.',
    faqTeasers: [
      {
        question: 'What are risk-weighted assets (RWA) and how do they work?',
        teaser: 'Risk-weighted assets adjust a bank\'s total assets for credit risk by assigning different weights to different asset categories, forming the denominator for all risk-based capital ratios.',
        faqSlug: 'what-are-risk-weighted-assets',
        faqCluster: 'capital-and-risk',
      },
      {
        question: 'What is the CET1 capital ratio and why does it matter?',
        teaser: 'CET1 measures a bank\'s highest-quality capital relative to the risk in its asset base, serving as the primary metric regulators use to assess capital adequacy under Basel III.',
        faqSlug: 'what-is-cet1-ratio',
        faqCluster: 'capital-and-risk',
      },
    ],
  },
];

// ============================================================================
// CROSS-LINK MAP ENTRIES FOR prerender.mjs
// ============================================================================
// Add these entries to the METRIC_TO_VALUATIONS map in prerender.mjs.
// These connect new capital strength metrics to relevant valuation methods.
//
// Note: Capital strength metrics are primarily informational/analytical rather
// than direct valuation inputs, so their valuation connections are limited to
// methods where capital adequacy is a key consideration.

const CAPITAL_METRIC_TO_VALUATIONS_ENTRIES = {
  'cet1-capital-ratio': ['excess-capital-return-model', 'peer-comparison'],
  'tier-1-capital-ratio': ['excess-capital-return-model', 'peer-comparison'],
  'total-capital-ratio': ['peer-comparison'],
  'tier-1-leverage-ratio': ['peer-comparison'],
  'supplementary-leverage-ratio': ['peer-comparison'],
  'tangible-common-equity-ratio': ['price-to-tangible-book-valuation', 'peer-comparison', 'excess-capital-return-model'],
  'risk-weighted-assets-density': ['peer-comparison'],
};

// Also update existing VALUATION_TO_METRICS entries in prerender.mjs:
// Add to 'peer-comparison': 'cet1-capital-ratio', 'tier-1-capital-ratio',
//   'total-capital-ratio', 'tier-1-leverage-ratio', 'supplementary-leverage-ratio',
//   'tangible-common-equity-ratio', 'risk-weighted-assets-density'
// Add to 'excess-capital-return-model' (new valuation): 'cet1-capital-ratio',
//   'tier-1-capital-ratio', 'tangible-common-equity-ratio'
// Add to 'price-to-tangible-book-valuation' (new valuation): 'tangible-common-equity-ratio'

export { CAPITAL_STRENGTH_METRICS, CAPITAL_METRIC_TO_VALUATIONS_ENTRIES };

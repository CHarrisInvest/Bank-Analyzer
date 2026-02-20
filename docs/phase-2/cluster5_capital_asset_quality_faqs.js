// Cluster 5: Capital Strength and Asset Quality — 17 Standard FAQ Entries
// Phase 2 / Batch 2 content for src/data/content/faqs.js
// Add these entries to the FAQS array alongside existing Cluster 5 "How to Calculate" entries.

const CLUSTER_5_FAQS = [
  {
    slug: 'what-is-a-good-equity-to-assets-ratio',
    question: 'What is the equity-to-assets ratio and what is a good level for banks?',
    cluster: 'capital-and-risk',
    clusterName: 'Capital Strength and Asset Quality',
    intentType: 'evaluative',
    shortAnswer: 'The equity-to-assets ratio measures the percentage of a bank\'s assets funded by shareholders\' equity rather than deposits and borrowings, with most U.S. banks falling between 8% and 12%',
    fullAnswer: 'The equity-to-assets ratio is calculated by dividing total shareholders\' equity by total assets. A bank with $1 billion in equity and $10 billion in assets has an equity-to-assets ratio of 10%, meaning 10% of its asset base is funded by owners\' capital and 90% by deposits, borrowings, and other liabilities.\n\nThis is the simplest measure of a bank\'s capital adequacy. Higher ratios indicate a larger cushion to absorb losses before depositors and creditors are at risk. Lower ratios indicate greater leverage, which amplifies both returns and risks.\n\nFor U.S. commercial banks, equity-to-assets ratios typically range from 8% to 12%. Community banks often run at the higher end (9% to 12%) due to less diversified revenue streams, greater concentration risk, and sometimes limited access to capital markets for raising additional equity. Large banks may operate at somewhat lower ratios (7% to 10%) because their diversified business lines, sophisticated risk management, and access to capital markets provide alternative forms of resilience.\n\nA ratio below 7% may indicate thin capitalization, though it depends on the risk profile of the bank\'s assets. A ratio above 13% to 14% may suggest the bank is overcapitalized, holding more equity than it needs for safety, which can depress return on equity. Some banks maintain high equity-to-assets ratios deliberately while they evaluate acquisition opportunities, prepare for balance sheet growth, or navigate an uncertain economic environment.\n\nThe equity-to-assets ratio is useful as a quick check because it requires no knowledge of risk-weighted assets or regulatory capital definitions. However, it does not account for the riskiness of the asset base. A bank with 10% equity-to-assets invested entirely in U.S. Treasury securities is in a fundamentally different risk position than a bank with 10% equity-to-assets concentrated in construction and development loans. For a risk-adjusted view of capital adequacy, the CET1 ratio and Tier 1 capital ratio are more informative.',
    relatedMetrics: ['equity-to-assets', 'roe', 'roaa', 'cet1-capital-ratio', 'tangible-common-equity-ratio'],
    relatedValuations: ['roe-pb-framework'],
    relatedFaqs: ['what-is-cet1-ratio', 'what-is-tce-ratio', 'can-roe-be-too-high'],
    relatedGlossaryTerms: ['Equity to Assets', 'Leverage Ratio', 'Equity Multiplier'],
    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Screen banks by equity-to-assets ratio to compare capital levels'
    },
    metaTitle: 'What Is a Good Equity-to-Assets Ratio for Banks? | BankSift',
    metaDescription: 'Learn what the equity-to-assets ratio measures, what levels are typical for U.S. banks, and how to use this simple capital adequacy metric in bank analysis.'
  },
  {
    slug: 'tangible-book-value-vs-book-value',
    question: 'What is tangible book value and why is it different from book value?',
    cluster: 'capital-and-risk',
    clusterName: 'Capital Strength and Asset Quality',
    intentType: 'comparative',
    shortAnswer: 'Tangible book value strips out intangible assets like goodwill from total equity, providing a more conservative measure of a bank\'s net asset value that reflects only assets with clear liquidation value',
    fullAnswer: 'Book value (or shareholders\' equity) represents total assets minus total liabilities on a bank\'s balance sheet. It includes all assets the bank reports, including intangible assets such as goodwill, core deposit intangibles, and other identifiable intangible assets that arise primarily from acquisitions.\n\nTangible book value removes these intangible assets from the equation. It is calculated as total equity minus goodwill minus other intangible assets. The per-share version, tangible book value per share (TBVPS), divides the result by diluted shares outstanding.\n\nThe distinction matters because intangible assets, particularly goodwill, have no independent liquidation value. Goodwill appears on a bank\'s balance sheet when it acquires another bank for more than the target\'s net asset value. If a bank pays $500 million for a target with $400 million in tangible net assets, $100 million of goodwill is recorded. That $100 million reflects the premium paid for the target\'s customer relationships, brand, and franchise value, but it cannot be sold separately or used to absorb losses.\n\nFor banks that have grown through acquisitions, the gap between book value and tangible book value can be substantial. A bank with $2 billion in book value but $500 million in goodwill has only $1.5 billion in tangible book value. Analysts and investors often prefer tangible book value because it better represents the hard asset backing of the bank\'s equity.\n\nThis distinction feeds directly into valuation. Price-to-book (P/B) uses total book value, while price-to-tangible-book (P/TBV) uses tangible book value. P/TBV is always equal to or higher than P/B for the same bank, and the gap widens as intangible assets increase. For banks with significant acquisition histories, P/TBV provides a more conservative and comparable valuation benchmark.\n\nBanks that have grown organically rather than through acquisitions will have minimal goodwill on their balance sheets, making book value and tangible book value nearly identical.',
    relatedMetrics: ['book-value-per-share', 'tangible-book-value-per-share', 'price-to-book', 'price-to-tangible-book-value'],
    relatedValuations: ['price-to-book-valuation', 'price-to-tangible-book-valuation'],
    relatedFaqs: ['pb-vs-ptbv', 'when-to-use-ptbv', 'what-is-goodwill-on-bank-balance-sheet'],
    relatedGlossaryTerms: ['Tangible Book Value', 'Tangible Book Value Per Share (TBVPS)', 'Goodwill'],
    cta: {
      type: 'learn-metric',
      target: '/metrics/tangible-book-value-per-share',
      text: 'Learn more about tangible book value per share and how it is calculated'
    },
    metaTitle: 'Tangible Book Value vs Book Value for Banks | BankSift',
    metaDescription: 'Understand the difference between tangible book value and book value for banks, why goodwill matters, and when each measure is more appropriate for analysis.'
  },
  {
    slug: 'what-is-tce-ratio',
    question: 'What is tangible common equity (TCE) ratio and why do bank analysts use it?',
    cluster: 'capital-and-risk',
    clusterName: 'Capital Strength and Asset Quality',
    intentType: 'definitional',
    shortAnswer: 'The TCE ratio measures tangible common equity divided by tangible assets, providing a conservative capital adequacy measure that strips out intangible assets and preferred stock to focus on the equity available to common shareholders',
    fullAnswer: 'The tangible common equity (TCE) ratio is calculated by dividing tangible common equity by tangible assets. Tangible common equity equals total equity minus goodwill, minus other intangible assets, minus preferred stock. Tangible assets equals total assets minus goodwill minus other intangible assets.\n\nBank analysts favor the TCE ratio for several reasons. First, it focuses on common equity only, excluding preferred stock. Preferred shareholders have a senior claim on assets and earnings relative to common shareholders, so including preferred stock in the capital measure overstates the buffer available to common equity holders. Second, by removing intangible assets from both the numerator and denominator, the TCE ratio provides a more conservative view of capital adequacy based on assets with clear economic value.\n\nThe TCE ratio is particularly useful for comparing banks with different acquisition histories. A bank that has grown through numerous acquisitions may carry substantial goodwill that inflates its equity-to-assets ratio but provides no loss-absorbing capacity. The TCE ratio adjusts for this, producing a more comparable metric across banks with different growth strategies.\n\nFor U.S. banks, TCE ratios typically range from 6% to 10%. Ratios below 5% may indicate thin tangible capitalization, while ratios above 10% suggest substantial excess capital. As with equity-to-assets, the appropriate level depends on the bank\'s asset risk profile, business model, and growth plans.\n\nThe TCE ratio is not a regulatory capital measure. Regulators use CET1, Tier 1, and Total Capital ratios, which are based on risk-weighted assets and have specific definitions of qualifying capital. The TCE ratio is an analyst-constructed metric that uses balance sheet data available in standard financial statements, making it calculable for any bank without needing access to regulatory capital reports. Many analysts view it as a practical complement to the regulatory ratios.',
    relatedMetrics: ['tangible-common-equity-ratio', 'equity-to-assets', 'cet1-capital-ratio', 'book-value-per-share', 'tangible-book-value-per-share'],
    relatedValuations: ['price-to-tangible-book-valuation'],
    relatedFaqs: ['tangible-book-value-vs-book-value', 'what-is-a-good-equity-to-assets-ratio', 'what-is-cet1-ratio'],
    relatedGlossaryTerms: ['Tangible Common Equity (TCE)', 'Tangible Book Value', 'Goodwill'],
    cta: {
      type: 'learn-metric',
      target: '/metrics/tangible-common-equity-ratio',
      text: 'Learn more about the TCE ratio and how to calculate it'
    },
    metaTitle: 'What Is the TCE Ratio for Banks? | BankSift',
    metaDescription: 'Learn what the tangible common equity (TCE) ratio measures, why bank analysts prefer it over simpler capital metrics, and what typical ranges look like.'
  },
  {
    slug: 'what-is-cet1-ratio',
    question: 'What is the CET1 capital ratio and why does it matter?',
    cluster: 'capital-and-risk',
    clusterName: 'Capital Strength and Asset Quality',
    intentType: 'definitional',
    shortAnswer: 'The CET1 (Common Equity Tier 1) capital ratio measures a bank\'s highest-quality capital as a percentage of risk-weighted assets, and it is the most important regulatory capital measure under the Basel III framework',
    fullAnswer: 'The CET1 capital ratio is calculated by dividing Common Equity Tier 1 capital by risk-weighted assets (RWA). CET1 capital consists primarily of common stock, retained earnings, and accumulated other comprehensive income (AOCI), minus certain regulatory deductions such as goodwill and deferred tax assets that exceed specified thresholds. It represents the purest, most loss-absorbing form of bank capital.\n\nUnder Basel III standards as implemented in the United States, the minimum CET1 ratio is 4.5%. However, most banks must also hold a capital conservation buffer of 2.5%, bringing the effective minimum to 7.0% before facing restrictions on capital distributions (dividends and share buybacks). The largest U.S. banks face additional requirements through the Global Systemically Important Bank (G-SIB) surcharge and the stress capital buffer (SCB), which is determined by Federal Reserve stress test results and replaces the standard capital conservation buffer for large banks.\n\nIn practice, most well-capitalized U.S. banks operate with CET1 ratios well above regulatory minimums. Ratios of 10% to 13% are common among large banks, and community banks often run even higher. Banks maintain these buffers to ensure they remain above minimums during economic downturns, to preserve flexibility for growth and capital returns, and to avoid the supervisory scrutiny that comes with operating close to minimum thresholds.\n\nThe CET1 ratio matters more than simpler measures like equity-to-assets because it is risk-adjusted. The denominator (risk-weighted assets) assigns different weights to different asset categories based on their perceived riskiness. Cash and U.S. Treasuries carry a 0% risk weight, most residential mortgages carry a 50% weight, and most commercial loans carry a 100% weight. This means two banks with identical equity-to-assets ratios can have very different CET1 ratios depending on the composition of their asset portfolios.\n\nInvestors should monitor the CET1 ratio because it determines whether a bank can pay dividends, buy back shares, and pursue growth. A bank whose CET1 ratio approaches its minimum requirements will face regulatory pressure to retain earnings rather than return capital to shareholders.',
    relatedMetrics: ['cet1-capital-ratio', 'tier-1-capital-ratio', 'total-capital-ratio', 'equity-to-assets', 'risk-weighted-assets-density'],
    relatedValuations: ['excess-capital-return-model'],
    relatedFaqs: ['what-is-tier-1-capital-ratio', 'cet1-vs-tier1-vs-total-capital', 'what-are-risk-weighted-assets', 'what-happens-below-minimum-capital'],
    relatedGlossaryTerms: ['Common Equity Tier 1 (CET1)', 'Risk-Weighted Assets (RWA)', 'Capital Conservation Buffer', 'Stress Capital Buffer (SCB)'],
    cta: {
      type: 'learn-metric',
      target: '/metrics/cet1-capital-ratio',
      text: 'Learn more about the CET1 capital ratio and Basel III requirements'
    },
    metaTitle: 'What Is the CET1 Capital Ratio? | BankSift',
    metaDescription: 'Learn what the CET1 capital ratio measures, minimum regulatory requirements under Basel III, typical levels for U.S. banks, and why it matters for investors.'
  },
  {
    slug: 'what-is-tier-1-capital-ratio',
    question: 'What is the Tier 1 capital ratio?',
    cluster: 'capital-and-risk',
    clusterName: 'Capital Strength and Asset Quality',
    intentType: 'definitional',
    shortAnswer: 'The Tier 1 capital ratio measures a bank\'s core capital (CET1 plus additional Tier 1 capital) as a percentage of risk-weighted assets, representing the total high-quality capital available to absorb losses while the bank continues operating',
    fullAnswer: 'The Tier 1 capital ratio is calculated by dividing Tier 1 capital by risk-weighted assets. Tier 1 capital includes two components: Common Equity Tier 1 (CET1) capital and Additional Tier 1 (AT1) capital.\n\nCET1 capital consists of common stock, retained earnings, and certain other items, as described in the CET1 ratio definition. Additional Tier 1 capital includes instruments such as non-cumulative perpetual preferred stock and certain hybrid capital instruments that meet strict regulatory criteria for loss absorption. These instruments can absorb losses (through conversion to common equity or write-down) while the bank remains a going concern, which is why they qualify as Tier 1.\n\nThe minimum Tier 1 capital ratio under Basel III is 6.0%, compared to 4.5% for CET1 alone. With the 2.5% capital conservation buffer, the effective minimum is 8.5%. Large banks subject to G-SIB surcharges or stress capital buffers have higher effective requirements.\n\nFor most banks, the Tier 1 ratio is close to the CET1 ratio because many banks, particularly community and smaller regional banks, have little or no Additional Tier 1 capital outstanding. The gap between the two ratios is more significant at larger banks that have issued preferred stock or qualifying hybrid instruments.\n\nIn practice, the CET1 ratio receives more attention from analysts and investors because CET1 represents the purest form of loss-absorbing capital. The Tier 1 ratio adds a layer of capital that, while still high quality, has a more complex structure and sits above common equity in the capital hierarchy. Both ratios are reported in a bank\'s regulatory filings and quarterly earnings releases.',
    relatedMetrics: ['tier-1-capital-ratio', 'cet1-capital-ratio', 'total-capital-ratio', 'tier-1-leverage-ratio'],
    relatedValuations: ['excess-capital-return-model'],
    relatedFaqs: ['what-is-cet1-ratio', 'cet1-vs-tier1-vs-total-capital', 'what-are-risk-weighted-assets'],
    relatedGlossaryTerms: ['Tier 1 Capital', 'Common Equity Tier 1 (CET1)', 'Risk-Weighted Assets (RWA)'],
    cta: {
      type: 'learn-metric',
      target: '/metrics/tier-1-capital-ratio',
      text: 'Learn more about the Tier 1 capital ratio and its components'
    },
    metaTitle: 'What Is the Tier 1 Capital Ratio for Banks? | BankSift',
    metaDescription: 'Learn what the Tier 1 capital ratio measures, how it differs from CET1, minimum regulatory requirements, and why it matters for bank capital analysis.'
  },
  {
    slug: 'cet1-vs-tier1-vs-total-capital',
    question: 'What is the difference between CET1, Tier 1, and Total Capital ratios?',
    cluster: 'capital-and-risk',
    clusterName: 'Capital Strength and Asset Quality',
    intentType: 'comparative',
    shortAnswer: 'CET1, Tier 1, and Total Capital ratios represent progressively broader definitions of regulatory capital, all measured against risk-weighted assets, with CET1 being the most restrictive (highest quality) and Total Capital being the most inclusive',
    fullAnswer: 'These three ratios form a hierarchy of regulatory capital measures under the Basel III framework. All three share the same denominator (risk-weighted assets) but use increasingly broad definitions of qualifying capital in the numerator.\n\nCET1 capital is the narrowest and highest-quality tier. It consists primarily of common stock, retained earnings, and AOCI. This is the capital that absorbs losses first and has no contractual obligation to be repaid. The minimum CET1 ratio is 4.5%.\n\nTier 1 capital equals CET1 plus Additional Tier 1 capital, which includes qualifying preferred stock and certain hybrid instruments that can absorb losses while the bank remains operational. The minimum Tier 1 ratio is 6.0%.\n\nTotal Capital equals Tier 1 plus Tier 2 capital. Tier 2 capital includes subordinated debt with an original maturity of at least five years, certain loan loss reserves (up to 1.25% of risk-weighted assets), and other instruments that absorb losses only in liquidation (gone-concern capital). The minimum Total Capital ratio is 8.0%.\n\nThe practical significance of these different tiers relates to loss absorption timing. CET1 absorbs losses immediately and continuously. AT1 instruments can be converted or written down if the bank reaches a point of non-viability. Tier 2 capital provides protection primarily to depositors and senior creditors in the event the bank fails and enters resolution.\n\nFor investors evaluating bank stocks, CET1 is the most important ratio because it determines the bank\'s ability to maintain dividends and share buybacks. The capital conservation buffer (2.5%) and any applicable surcharges are measured against CET1 specifically. A bank that falls into its capital conservation buffer faces automatic restrictions on distributions, with the severity of restrictions increasing as the ratio declines further.\n\nA typical well-capitalized U.S. bank might report a CET1 ratio of 11%, a Tier 1 ratio of 12%, and a Total Capital ratio of 14%. The gaps between these ratios indicate the amount of Additional Tier 1 and Tier 2 capital in the bank\'s capital structure.',
    relatedMetrics: ['cet1-capital-ratio', 'tier-1-capital-ratio', 'total-capital-ratio', 'risk-weighted-assets-density'],
    relatedValuations: ['excess-capital-return-model'],
    relatedFaqs: ['what-is-cet1-ratio', 'what-is-tier-1-capital-ratio', 'what-happens-below-minimum-capital', 'well-capitalized-vs-adequately-capitalized'],
    relatedGlossaryTerms: ['Common Equity Tier 1 (CET1)', 'Tier 1 Capital', 'Tier 2 Capital', 'Total Regulatory Capital', 'Capital Conservation Buffer'],
    cta: {
      type: 'learn-metric',
      target: '/metrics/cet1-capital-ratio',
      text: 'Explore the CET1 capital ratio metric page for detailed analysis guidance'
    },
    metaTitle: 'CET1 vs Tier 1 vs Total Capital Ratio for Banks | BankSift',
    metaDescription: 'Understand the differences between CET1, Tier 1, and Total Capital ratios, including what each includes, minimum requirements, and which matters most for investors.'
  },
  {
    slug: 'what-are-risk-weighted-assets',
    question: 'What are risk-weighted assets (RWA) and how do they work?',
    cluster: 'capital-and-risk',
    clusterName: 'Capital Strength and Asset Quality',
    intentType: 'definitional',
    shortAnswer: 'Risk-weighted assets adjust a bank\'s total assets by assigning different weights based on the credit risk of each asset category, creating a single figure that reflects the overall riskiness of the balance sheet and serves as the denominator for all regulatory capital ratios',
    fullAnswer: 'Risk-weighted assets (RWA) are calculated by multiplying each asset category on a bank\'s balance sheet by a prescribed risk weight, then summing the results. The risk weights range from 0% for the safest assets to 150% or more for the riskiest.\n\nUnder the U.S. standardized approach, the primary risk weight categories are as follows. Cash and claims on the U.S. government (Treasuries, agency securities) carry a 0% weight, meaning they add nothing to RWA. Claims on U.S. government-sponsored enterprises carry a 20% weight. Most residential mortgages carry a 50% weight. Most commercial loans, consumer loans, and corporate bonds carry a 100% weight. Past-due loans and certain high-risk categories such as securitization exposures can carry 150% or higher weights. Off-balance-sheet items such as loan commitments and letters of credit are also included after applying credit conversion factors.\n\nThe purpose of risk weighting is to ensure that capital requirements reflect the actual risk profile of a bank\'s assets. Without risk weighting, a bank holding $10 billion in Treasury securities would need the same capital as a bank holding $10 billion in subprime auto loans, even though the risk profiles are vastly different. RWA solves this by making the bank with riskier assets hold proportionally more capital.\n\nRWA density (RWA divided by total assets) is a useful shorthand for understanding a bank\'s overall asset risk profile. A bank with RWA density of 60% holds a moderate-risk portfolio. A bank with 80% density has a heavily loan-weighted, higher-risk balance sheet. A bank with 40% density likely holds substantial securities and cash.\n\nInvestors cannot directly calculate RWA from standard financial statements (10-K, 10-Q) because the asset-level risk weight assignments require regulatory reporting detail. Banks disclose their RWA figures in quarterly regulatory filings (call reports, FR Y-9C), earnings releases, and supplemental financial data. The largest banks also disclose RWA under both the standardized and advanced approaches, with the binding constraint being the more conservative of the two.',
    relatedMetrics: ['risk-weighted-assets-density', 'cet1-capital-ratio', 'tier-1-capital-ratio', 'total-capital-ratio', 'equity-to-assets'],
    relatedValuations: [],
    relatedFaqs: ['what-is-cet1-ratio', 'cet1-vs-tier1-vs-total-capital', 'what-happens-below-minimum-capital'],
    relatedGlossaryTerms: ['Risk-Weighted Assets (RWA)', 'Common Equity Tier 1 (CET1)', 'Leverage Ratio'],
    cta: {
      type: 'learn-metric',
      target: '/metrics/risk-weighted-assets-density',
      text: 'Learn more about RWA density and what it reveals about bank asset risk profiles'
    },
    metaTitle: 'What Are Risk-Weighted Assets (RWA) for Banks? | BankSift',
    metaDescription: 'Learn how risk-weighted assets work, including risk weight categories, how RWA is calculated, and why it serves as the denominator for all bank capital ratios.'
  },
  {
    slug: 'what-happens-below-minimum-capital',
    question: 'What happens if a bank falls below minimum capital requirements?',
    cluster: 'capital-and-risk',
    clusterName: 'Capital Strength and Asset Quality',
    intentType: 'conceptual',
    shortAnswer: 'A bank that falls below minimum capital requirements faces escalating regulatory consequences, starting with automatic restrictions on dividends and buybacks and potentially progressing to mandatory corrective actions, enforcement orders, and in severe cases, seizure by regulators',
    fullAnswer: 'The consequences of insufficient capital are structured in layers, with increasingly severe actions as capital ratios decline further below required levels.\n\nThe first trigger point is the capital conservation buffer. If a bank\'s CET1 ratio falls below 7.0% (the 4.5% minimum plus the 2.5% buffer), automatic restrictions on capital distributions take effect. The bank must retain a progressively larger share of its earnings. At the bottom of the buffer (CET1 of 4.5% to 5.125%), the bank cannot pay any dividends or execute any share buybacks. These restrictions apply by formula and do not require a specific regulatory action.\n\nIf capital ratios continue to decline toward or below the absolute minimums (4.5% CET1, 6.0% Tier 1, 8.0% Total Capital), the bank enters the Prompt Corrective Action (PCA) framework established by the Federal Deposit Insurance Corporation Improvement Act. PCA classifies banks into five capital categories: well capitalized, adequately capitalized, undercapitalized, significantly undercapitalized, and critically undercapitalized.\n\nAn undercapitalized bank is required to submit a capital restoration plan, faces restrictions on asset growth, and cannot pay dividends without regulatory approval. It may also face limits on compensation and management fees.\n\nA significantly undercapitalized bank faces all of the above plus potential requirements to raise additional capital, restrict transactions with affiliates, divest subsidiaries, or replace senior management. Regulators gain broad authority to impose whatever corrective measures they deem necessary.\n\nA critically undercapitalized bank (tangible equity-to-assets below 2%) must be placed into receivership or conservatorship within 90 days unless the relevant regulatory agency and the FDIC determine that an alternative action would better protect the deposit insurance fund.\n\nFrom an investor\'s perspective, the practical impact begins well before formal PCA categories are triggered. Market confidence typically declines as capital ratios approach minimum thresholds, potentially leading to deposit outflows, credit rating downgrades, higher funding costs, and a declining stock price. Banks nearing capital minimums often face pressure to raise dilutive equity, sell assets at unfavorable prices, or drastically cut lending, all of which reduce franchise value.',
    relatedMetrics: ['cet1-capital-ratio', 'tier-1-capital-ratio', 'total-capital-ratio', 'equity-to-assets', 'tangible-common-equity-ratio'],
    relatedValuations: [],
    relatedFaqs: ['what-is-cet1-ratio', 'cet1-vs-tier1-vs-total-capital', 'well-capitalized-vs-adequately-capitalized', 'what-is-texas-ratio'],
    relatedGlossaryTerms: ['Common Equity Tier 1 (CET1)', 'Capital Conservation Buffer', 'Well-Capitalized', 'Adequately Capitalized'],
    cta: {
      type: 'learn-metric',
      target: '/metrics/cet1-capital-ratio',
      text: 'Learn more about CET1 requirements and capital adequacy thresholds'
    },
    metaTitle: 'What Happens If a Bank Falls Below Capital Requirements? | BankSift',
    metaDescription: 'Learn the consequences when a bank falls below minimum capital ratios, including dividend restrictions, prompt corrective action, and potential regulatory seizure.'
  },
  {
    slug: 'well-capitalized-vs-adequately-capitalized',
    question: 'What is the difference between a well-capitalized and adequately capitalized bank?',
    cluster: 'capital-and-risk',
    clusterName: 'Capital Strength and Asset Quality',
    intentType: 'comparative',
    shortAnswer: 'These are specific regulatory classifications under the Prompt Corrective Action framework, with "well capitalized" requiring higher capital ratios than "adequately capitalized" and providing the bank with greater operational flexibility and lower FDIC insurance costs',
    fullAnswer: 'The Prompt Corrective Action (PCA) framework defines five capital categories based on a bank\'s regulatory capital ratios. "Well capitalized" and "adequately capitalized" are the top two tiers.\n\nTo be classified as well capitalized, a bank must simultaneously meet all of the following: CET1 ratio of 6.5% or above, Tier 1 capital ratio of 8.0% or above, Total Capital ratio of 10.0% or above, and Tier 1 leverage ratio of 5.0% or above. The bank must also not be subject to any written agreement, order, or directive requiring it to maintain a specific capital level.\n\nTo be classified as adequately capitalized, a bank must meet: CET1 ratio of 4.5% or above, Tier 1 capital ratio of 6.0% or above, Total Capital ratio of 8.0% or above, and Tier 1 leverage ratio of 4.0% or above, but falls short of any one of the well-capitalized thresholds.\n\nThe practical differences between the two classifications are significant. Well-capitalized banks pay lower FDIC deposit insurance premiums, can accept brokered deposits without restriction, face fewer regulatory constraints on activities and growth, and generally operate with full strategic flexibility.\n\nAdequately capitalized banks face higher FDIC insurance assessments and restrictions on accepting brokered deposits (they must apply for a waiver). While adequately capitalized banks are not subject to mandatory corrective actions, the classification itself signals to regulators, investors, and counterparties that the bank\'s capital position is thinner than preferred.\n\nThe vast majority of U.S. banks maintain well-capitalized status. Operating at the adequately capitalized level is generally a sign of stress, and banks in this category typically face market and regulatory pressure to restore their capital ratios to well-capitalized levels. For investors, a bank that drops from well capitalized to adequately capitalized is signaling a meaningful deterioration in financial condition that warrants careful evaluation.',
    relatedMetrics: ['cet1-capital-ratio', 'tier-1-capital-ratio', 'total-capital-ratio', 'tier-1-leverage-ratio'],
    relatedValuations: [],
    relatedFaqs: ['what-is-cet1-ratio', 'what-happens-below-minimum-capital', 'cet1-vs-tier1-vs-total-capital'],
    relatedGlossaryTerms: ['Well-Capitalized', 'Adequately Capitalized', 'Common Equity Tier 1 (CET1)', 'Leverage Ratio'],
    cta: {
      type: 'glossary',
      target: '/glossary',
      text: 'See the glossary for definitions of regulatory capital terms'
    },
    metaTitle: 'Well Capitalized vs Adequately Capitalized Banks | BankSift',
    metaDescription: 'Learn the regulatory definitions and practical differences between well-capitalized and adequately capitalized banks under the Prompt Corrective Action framework.'
  },
  {
    slug: 'what-is-texas-ratio',
    question: 'What is the Texas Ratio and how do I calculate it?',
    cluster: 'capital-and-risk',
    clusterName: 'Capital Strength and Asset Quality',
    intentType: 'procedural',
    shortAnswer: 'The Texas Ratio divides non-performing assets by the sum of tangible common equity and loan loss reserves, measuring whether a bank has enough capital and reserves to cover its problem assets, with ratios above 100% indicating potential distress',
    fullAnswer: 'The Texas Ratio is calculated as: Non-Performing Assets / (Tangible Common Equity + Loan Loss Reserves). Non-performing assets include non-performing loans (loans 90+ days past due or on non-accrual status) plus other real estate owned (OREO, which is property the bank has acquired through foreclosure).\n\nThe ratio was developed in the 1980s during the Texas banking crisis by Gerard Cassidy and others at RBC Capital Markets as a tool to identify banks at risk of failure. Its logic is straightforward: the numerator represents the bank\'s known problem assets, and the denominator represents the resources available to absorb losses from those assets. If problem assets exceed the combined cushion of tangible equity and reserves, the bank may not have sufficient resources to work through its credit problems without external capital.\n\nA Texas Ratio below 50% generally indicates manageable levels of problem assets relative to the bank\'s loss-absorbing capacity. Ratios between 50% and 100% warrant careful monitoring and further investigation into the nature and trend of the bank\'s problem assets. Ratios above 100% have historically been associated with elevated risk of bank failure, though not all banks with ratios above 100% fail. The ratio is a warning signal, not a definitive prediction.\n\nThe Texas Ratio is most useful as a screening tool for identifying banks under credit stress and as a trend indicator. A rising Texas Ratio over several quarters, even if still below 100%, may indicate deteriorating credit conditions that have not yet been fully recognized. A declining ratio suggests the bank is working through its problems, either by resolving non-performing assets or by building capital and reserves.\n\nTo calculate the Texas Ratio, investors need data from the bank\'s balance sheet (tangible common equity, loan loss reserves or allowance for credit losses) and either the call report or supplemental disclosures for the non-performing asset figures. Many banks disclose non-performing asset totals in their quarterly earnings releases and investor presentations.',
    relatedMetrics: ['texas-ratio', 'non-performing-loans-ratio', 'non-performing-assets-ratio', 'loan-loss-reserve-ratio', 'tangible-common-equity-ratio'],
    relatedValuations: [],
    relatedFaqs: ['what-is-npl-ratio', 'what-are-non-performing-assets', 'what-is-loan-loss-reserve-ratio', 'how-to-evaluate-loan-credit-quality'],
    relatedGlossaryTerms: ['Texas Ratio', 'Non-Performing Asset (NPA)', 'Non-Performing Loan (NPL)', 'Tangible Common Equity (TCE)', 'Allowance for Credit Losses (ACL)'],
    cta: {
      type: 'learn-metric',
      target: '/metrics/texas-ratio',
      text: 'Learn more about the Texas Ratio and how to interpret it for bank analysis'
    },
    metaTitle: 'What Is the Texas Ratio? How to Calculate It | BankSift',
    metaDescription: 'Learn how to calculate the Texas Ratio for banks, what it measures about credit stress, why 100% is the critical threshold, and how to use it as a screening tool.'
  },
  {
    slug: 'what-is-npl-ratio',
    question: 'What is the non-performing loans (NPL) ratio?',
    cluster: 'capital-and-risk',
    clusterName: 'Capital Strength and Asset Quality',
    intentType: 'definitional',
    shortAnswer: 'The NPL ratio measures the percentage of a bank\'s total loans that are non-performing (90+ days past due or on non-accrual status), serving as a primary indicator of credit quality deterioration in the loan portfolio',
    fullAnswer: 'The non-performing loans ratio is calculated by dividing non-performing loans by total loans. Non-performing loans are defined as loans that are either 90 or more days past due and still accruing interest, or loans that have been placed on non-accrual status (meaning the bank has stopped recognizing interest income on the loan because collection is doubtful).\n\nThe NPL ratio is one of the most closely watched credit quality metrics for banks. A rising NPL ratio indicates that more borrowers are failing to make payments on schedule, which is often an early sign of broader credit deterioration. A declining NPL ratio suggests the bank is successfully resolving its problem loans through workouts, restructuring, charge-offs, or improved borrower performance.\n\nFor U.S. banks in normal economic conditions, NPL ratios typically range from 0.5% to 2.0%. Well-run banks with conservative underwriting standards often maintain NPL ratios below 1.0%. During economic downturns, NPL ratios can rise significantly. Based on FDIC data, the U.S. banking industry\'s aggregate NPL ratio peaked above 5% during the worst of the 2008-2010 credit cycle.\n\nContext is critical when interpreting the NPL ratio. The ratio should be evaluated relative to the bank\'s historical trend, its peers of similar size and geographic focus, and the current economic environment. A community bank concentrated in agricultural lending will have different NPL dynamics than a money center bank with a diversified national portfolio. The composition of non-performing loans also matters: a concentration of non-performing commercial real estate loans may pose different recovery prospects than non-performing residential mortgages.\n\nThe NPL ratio should be evaluated alongside the reserve coverage ratio (loan loss reserves divided by NPLs) to understand whether the bank has provisioned adequately for its known problems, and alongside the net charge-off ratio to understand how quickly problem loans are resulting in actual realized losses.',
    relatedMetrics: ['non-performing-loans-ratio', 'non-performing-assets-ratio', 'net-charge-off-ratio', 'loan-loss-reserve-ratio', 'reserve-coverage-ratio'],
    relatedValuations: [],
    relatedFaqs: ['what-are-non-performing-assets', 'what-is-net-charge-off-ratio', 'what-is-loan-loss-reserve-ratio', 'how-to-evaluate-loan-credit-quality'],
    relatedGlossaryTerms: ['Non-Performing Loan (NPL)', 'Non-Performing Asset (NPA)', 'Allowance for Credit Losses (ACL)'],
    cta: {
      type: 'learn-metric',
      target: '/metrics/non-performing-loans-ratio',
      text: 'Learn more about the NPL ratio and credit quality analysis for banks'
    },
    metaTitle: 'What Is the Non-Performing Loans (NPL) Ratio? | BankSift',
    metaDescription: 'Learn what the NPL ratio measures, how non-performing loans are defined, typical ranges for U.S. banks, and how to use this metric in credit quality analysis.'
  },
  {
    slug: 'what-are-non-performing-assets',
    question: 'What are non-performing assets (NPA) and how do they affect bank value?',
    cluster: 'capital-and-risk',
    clusterName: 'Capital Strength and Asset Quality',
    intentType: 'definitional',
    shortAnswer: 'Non-performing assets include non-performing loans plus other real estate owned (OREO) and other foreclosed assets, representing the total stock of problem assets on a bank\'s balance sheet that are not generating income and may result in losses',
    fullAnswer: 'Non-performing assets (NPA) is a broader measure than non-performing loans because it includes all categories of troubled assets, not just loans. The primary components are non-performing loans (loans 90+ days past due or on non-accrual), other real estate owned (OREO, which is real property the bank has taken possession of through foreclosure or deed-in-lieu), and other foreclosed assets.\n\nThe NPA ratio is calculated by dividing total non-performing assets by total assets. This provides a bank-wide view of asset quality problems relative to the overall balance sheet. It captures situations where credit problems have progressed beyond delinquent loans to actual property seizure.\n\nNon-performing assets affect bank value through several channels. First, they generate little or no income. Non-accrual loans produce no recognized interest income, and OREO properties typically generate only modest rental income if any, while incurring maintenance, insurance, and property tax costs. Second, NPAs often result in eventual losses. The bank may need to charge off a portion of non-performing loans and may sell foreclosed properties at prices below the outstanding loan balance. Third, high NPA levels consume management attention, diverting resources from growth and relationship-building activities toward workout and loss mitigation.\n\nFor valuation purposes, elevated NPAs directly reduce the credibility of reported book value. If a bank reports book value of $500 million but has $100 million in non-performing assets that may ultimately result in $40 million in losses, the effective book value is closer to $460 million. The market typically discounts the stock price to reflect estimated future losses on NPAs, which is why banks with high NPA ratios often trade at lower price-to-book multiples.\n\nInvestors should track the NPA ratio over time and compare it to peers. A rising NPA ratio, particularly when combined with a rising Texas Ratio and increasing provision expense, signals deteriorating credit conditions that may lead to reduced earnings, dividend cuts, and potential capital raises.',
    relatedMetrics: ['non-performing-assets-ratio', 'non-performing-loans-ratio', 'texas-ratio', 'net-charge-off-ratio', 'reserve-coverage-ratio'],
    relatedValuations: ['price-to-book-valuation', 'price-to-tangible-book-valuation'],
    relatedFaqs: ['what-is-npl-ratio', 'what-is-texas-ratio', 'what-is-net-charge-off-ratio', 'how-to-evaluate-loan-credit-quality'],
    relatedGlossaryTerms: ['Non-Performing Asset (NPA)', 'Non-Performing Loan (NPL)', 'Other Real Estate Owned (OREO)', 'Texas Ratio'],
    cta: {
      type: 'learn-metric',
      target: '/metrics/non-performing-assets-ratio',
      text: 'Learn more about the NPA ratio and how to evaluate problem asset levels'
    },
    metaTitle: 'What Are Non-Performing Assets (NPA) for Banks? | BankSift',
    metaDescription: 'Learn what non-performing assets include, how the NPA ratio is calculated, and how problem assets affect bank valuation and financial health.'
  },
  {
    slug: 'what-is-net-charge-off-ratio',
    question: 'What is the net charge-off ratio and what does it tell me about a bank?',
    cluster: 'capital-and-risk',
    clusterName: 'Capital Strength and Asset Quality',
    intentType: 'definitional',
    shortAnswer: 'The net charge-off ratio measures actual loan losses realized during a period (gross charge-offs minus recoveries) as a percentage of average loans, showing how much of the loan portfolio the bank has written off as uncollectible',
    fullAnswer: 'The net charge-off ratio is calculated by dividing net charge-offs by average total loans, typically expressed as an annualized percentage. Net charge-offs equal gross charge-offs (loans the bank has determined are uncollectible and removed from the balance sheet) minus recoveries (amounts collected on previously charged-off loans).\n\nWhile the NPL ratio measures the stock of problem loans at a point in time, the net charge-off ratio measures the flow of actual losses during a period. The distinction is important. A bank can have a stable NPL ratio while charge-offs are increasing if it is adding new non-performing loans at the same rate it is charging off old ones. Conversely, a bank with a rising NPL ratio but low charge-offs may be deferring loss recognition, which could result in a spike in charge-offs later.\n\nFor U.S. commercial banks, net charge-off ratios during normal economic conditions typically range from 0.20% to 0.60% of average loans. Community banks focused on well-underwritten commercial and residential lending often achieve ratios below 0.30%. Banks with significant consumer lending (credit cards, auto loans, unsecured personal loans) tend to run higher charge-off ratios because consumer loans have higher inherent default rates. During severe credit downturns, industry charge-off ratios can exceed 2% to 3%.\n\nThe net charge-off ratio is one of the best indicators of actual credit performance because it reflects losses that have been formally recognized, unlike the NPL ratio which includes loans that may still be worked out or restructured. Comparing net charge-offs to the provision for credit losses is also informative. If provision expense consistently exceeds net charge-offs, the bank is building reserves in anticipation of future losses. If net charge-offs consistently exceed provisions, the bank may be under-provisioned and drawing down its reserve cushion.\n\nTrend analysis is particularly valuable. Rising net charge-offs across multiple quarters often precede broader credit deterioration and can signal that the bank\'s loan underwriting from prior years was too aggressive.',
    relatedMetrics: ['net-charge-off-ratio', 'non-performing-loans-ratio', 'loan-loss-reserve-ratio', 'provision-to-average-loans', 'reserve-coverage-ratio'],
    relatedValuations: [],
    relatedFaqs: ['what-is-npl-ratio', 'what-is-loan-loss-reserve-ratio', 'what-is-reserve-coverage-ratio', 'how-to-evaluate-loan-credit-quality'],
    relatedGlossaryTerms: ['Net Charge-Off', 'Gross Charge-Off', 'Recovery (on charged-off loans)', 'Allowance for Credit Losses (ACL)'],
    cta: {
      type: 'learn-metric',
      target: '/metrics/net-charge-off-ratio',
      text: 'Learn more about the net charge-off ratio and loan loss analysis'
    },
    metaTitle: 'What Is the Net Charge-Off Ratio for Banks? | BankSift',
    metaDescription: 'Learn what the net charge-off ratio measures, how it differs from the NPL ratio, typical ranges for U.S. banks, and what rising charge-offs signal about credit quality.'
  },
  {
    slug: 'how-to-evaluate-loan-credit-quality',
    question: 'How do I evaluate the credit quality of a bank\'s loan portfolio?',
    cluster: 'capital-and-risk',
    clusterName: 'Capital Strength and Asset Quality',
    intentType: 'strategic',
    shortAnswer: 'Evaluating loan credit quality requires examining multiple metrics together, including the NPL ratio, net charge-off ratio, reserve coverage, loan portfolio composition, and trends over time, rather than relying on any single indicator',
    fullAnswer: 'Credit quality assessment is one of the most important aspects of bank analysis because loan losses are the primary source of catastrophic risk for banks. A comprehensive evaluation uses several complementary metrics and qualitative factors.\n\nStart with the NPL ratio and its trend. A single-period NPL ratio provides a snapshot, but the direction of movement over the past four to eight quarters reveals whether credit conditions are improving or deteriorating. Compare the bank\'s NPL ratio to peers of similar size and geographic focus to determine whether any problems are bank-specific or industry-wide.\n\nExamine the net charge-off ratio alongside the NPL ratio. Rising NPLs combined with rising charge-offs confirms active credit deterioration. Rising NPLs with stable charge-offs may indicate the bank is accumulating problem loans without fully recognizing losses, which could mean a charge-off spike is ahead. Stable NPLs with rising charge-offs suggests the bank is actively working through its problem portfolio.\n\nAssess reserve adequacy through the loan loss reserve ratio (allowance for credit losses divided by total loans) and the reserve coverage ratio (allowance divided by non-performing loans). A reserve coverage ratio above 100% means the bank has reserved more than enough to cover its current known problems. Coverage below 75% may indicate the bank is under-provisioned, particularly if credit conditions are deteriorating.\n\nReview the provision for credit losses relative to net charge-offs. If provision expense exceeds net charge-offs, the bank is building reserves, signaling management expects future losses to increase. If charge-offs exceed provisions, reserves are being depleted.\n\nLook at loan portfolio composition in the bank\'s financial disclosures. Concentration in specific loan types (commercial real estate, construction and development, agricultural) or geographic areas increases risk. Regulatory guidance considers a concentration in any single loan category exceeding 300% of total capital (or 100% of capital for construction and development loans) to be a potentially elevated risk that requires enhanced risk management.\n\nFinally, examine the Texas Ratio as an integrated stress indicator that combines asset quality and capital adequacy into a single measure. A rising Texas Ratio, even if still well below 100%, should prompt deeper investigation into the bank\'s credit outlook.',
    relatedMetrics: ['non-performing-loans-ratio', 'net-charge-off-ratio', 'loan-loss-reserve-ratio', 'reserve-coverage-ratio', 'texas-ratio', 'provision-to-average-loans'],
    relatedValuations: ['price-to-book-valuation'],
    relatedFaqs: ['what-is-npl-ratio', 'what-is-net-charge-off-ratio', 'what-is-texas-ratio', 'what-is-loan-loss-reserve-ratio', 'what-is-reserve-coverage-ratio'],
    relatedGlossaryTerms: ['Non-Performing Loan (NPL)', 'Net Charge-Off', 'Allowance for Credit Losses (ACL)', 'Texas Ratio'],
    cta: {
      type: 'learn-metric',
      target: '/metrics/non-performing-loans-ratio',
      text: 'Start with the NPL ratio metric page for detailed credit quality analysis guidance'
    },
    metaTitle: 'How to Evaluate Bank Loan Credit Quality | BankSift',
    metaDescription: 'Learn how to assess a bank\'s credit quality using NPL ratios, charge-offs, reserve coverage, loan composition, and the Texas Ratio as an integrated framework.'
  },
  {
    slug: 'what-is-loan-loss-reserve-ratio',
    question: 'What is a bank\'s loan loss reserve ratio?',
    cluster: 'capital-and-risk',
    clusterName: 'Capital Strength and Asset Quality',
    intentType: 'definitional',
    shortAnswer: 'The loan loss reserve ratio measures the allowance for credit losses as a percentage of total loans, indicating how much the bank has set aside to absorb expected future loan losses',
    fullAnswer: 'The loan loss reserve ratio (also called the allowance-to-loans ratio) is calculated by dividing the allowance for credit losses (ACL) by total loans. A bank with $150 million in loan loss reserves and $10 billion in total loans has a reserve ratio of 1.50%.\n\nThe allowance for credit losses is a contra-asset account on the bank\'s balance sheet that represents management\'s estimate of expected losses in the loan portfolio. It is built up through periodic charges to the income statement called provisions for credit losses and is drawn down when actual losses are recognized through charge-offs. The reserve ratio indicates the cushion the bank maintains against potential future losses relative to the size of its loan book.\n\nFor U.S. banks, loan loss reserve ratios typically range from 1.0% to 2.0% under normal economic conditions. Banks with conservative underwriting and low-risk loan portfolios (heavy in well-collateralized residential mortgages or government-guaranteed loans) may maintain ratios below 1.0%. Banks with higher-risk portfolios (significant credit card, subprime, or construction lending) generally maintain higher reserves. During economic downturns, reserve ratios rise as banks increase provisions to prepare for expected losses, and aggregate industry ratios have exceeded 3% during severe credit cycles.\n\nSince the adoption of the Current Expected Credit Losses (CECL) accounting standard, banks are required to estimate and reserve for lifetime expected losses on their loan portfolios at the time of origination, rather than waiting until losses are probable. This has generally resulted in higher reserve levels compared to the prior incurred-loss methodology, particularly for banks with longer-duration loan portfolios.\n\nThe reserve ratio should be evaluated in the context of the bank\'s asset quality. A bank with a 1.5% reserve ratio and a 0.5% NPL ratio has ample coverage. A bank with a 1.5% reserve ratio and a 3.0% NPL ratio may be significantly under-provisioned. The reserve coverage ratio (reserves divided by NPLs) provides this direct comparison.',
    relatedMetrics: ['loan-loss-reserve-ratio', 'reserve-coverage-ratio', 'non-performing-loans-ratio', 'net-charge-off-ratio', 'provision-to-average-loans'],
    relatedValuations: [],
    relatedFaqs: ['what-is-reserve-coverage-ratio', 'what-is-npl-ratio', 'what-is-cecl', 'how-to-evaluate-loan-credit-quality'],
    relatedGlossaryTerms: ['Allowance for Credit Losses (ACL)', 'Provision for Credit Losses', 'CECL (Current Expected Credit Losses)', 'Net Charge-Off'],
    cta: {
      type: 'learn-metric',
      target: '/metrics/loan-loss-reserve-ratio',
      text: 'Learn more about the loan loss reserve ratio and provisioning analysis'
    },
    metaTitle: 'What Is the Loan Loss Reserve Ratio for Banks? | BankSift',
    metaDescription: 'Learn what the loan loss reserve ratio measures, typical ranges for U.S. banks, how CECL changed reserve accounting, and how to assess provisioning adequacy.'
  },
  {
    slug: 'what-is-reserve-coverage-ratio',
    question: 'What is the reserve coverage ratio and how should I interpret it?',
    cluster: 'capital-and-risk',
    clusterName: 'Capital Strength and Asset Quality',
    intentType: 'evaluative',
    shortAnswer: 'The reserve coverage ratio divides the allowance for credit losses by non-performing loans, measuring whether a bank has reserved enough to cover its known problem loans, with ratios above 100% generally indicating adequate provisioning',
    fullAnswer: 'The reserve coverage ratio is calculated by dividing the allowance for credit losses by non-performing loans. A bank with $200 million in reserves and $150 million in non-performing loans has a reserve coverage ratio of 133%, meaning it has reserved $1.33 for every dollar of known problem loans.\n\nThis ratio directly answers one of the most important questions in bank credit analysis: has the bank set aside enough money to cover the losses it is likely to incur on its identified problem loans? A ratio above 100% provides a margin of safety, suggesting the bank can absorb losses on its current NPLs entirely from existing reserves without additional charges to earnings. A ratio below 100% means the bank would need to take additional provisions or use equity to cover losses if all non-performing loans resulted in full loss, though in practice, most non-performing loans recover some value through collateral liquidation, restructuring, or eventual repayment.\n\nFor U.S. banks during normal conditions, reserve coverage ratios typically range from 80% to 150%. Well-provisioned banks with conservative management often maintain coverage above 100%. During the early stages of a credit downturn, coverage ratios frequently decline because NPLs rise faster than banks increase their reserves. As the cycle progresses, banks that provision aggressively rebuild their coverage ratios, sometimes to well above 100%.\n\nInterpretation requires context about the bank\'s loan portfolio. A bank with 90% reserve coverage but whose non-performing loans are primarily well-collateralized commercial real estate may be adequately provisioned because collateral will likely cover most of the exposure. A bank with 110% coverage but whose NPLs are concentrated in unsecured consumer loans or construction loans with declining collateral values may actually be under-provisioned because recovery rates on those loan types tend to be lower.\n\nThe trend matters as much as the absolute level. Declining reserve coverage alongside rising NPLs is one of the most concerning patterns in bank analysis because it suggests the bank is not keeping pace with deteriorating credit conditions. Conversely, stable or rising coverage alongside declining NPLs indicates the bank is working through its problems while maintaining prudent reserves.',
    relatedMetrics: ['reserve-coverage-ratio', 'loan-loss-reserve-ratio', 'non-performing-loans-ratio', 'net-charge-off-ratio', 'provision-to-average-loans'],
    relatedValuations: [],
    relatedFaqs: ['what-is-loan-loss-reserve-ratio', 'what-is-npl-ratio', 'what-is-net-charge-off-ratio', 'how-to-evaluate-loan-credit-quality'],
    relatedGlossaryTerms: ['Allowance for Credit Losses (ACL)', 'Non-Performing Loan (NPL)', 'Provision for Credit Losses'],
    cta: {
      type: 'learn-metric',
      target: '/metrics/reserve-coverage-ratio',
      text: 'Learn more about the reserve coverage ratio and what adequate provisioning looks like'
    },
    metaTitle: 'What Is the Reserve Coverage Ratio for Banks? | BankSift',
    metaDescription: 'Learn how to interpret the reserve coverage ratio, why 100% coverage matters, what drives changes in reserve adequacy, and how to assess a bank\'s provisioning.'
  },
  {
    slug: 'what-is-cecl',
    question: 'What is CECL and how did it change bank accounting?',
    cluster: 'capital-and-risk',
    clusterName: 'Capital Strength and Asset Quality',
    intentType: 'definitional',
    shortAnswer: 'CECL (Current Expected Credit Losses) is an accounting standard that requires banks to estimate and reserve for lifetime expected loan losses at origination, replacing the prior incurred-loss model that only recognized losses when they became probable',
    fullAnswer: 'The Current Expected Credit Losses (CECL) standard, codified as ASC 326 by the Financial Accounting Standards Board (FASB), fundamentally changed how banks estimate and report loan losses. It became effective for large public companies in January 2020 and for smaller public companies and private banks by January 2023.\n\nUnder the prior incurred-loss model, banks recognized loan losses only when a loss event had occurred and the loss was probable and estimable. This approach was widely criticized for being backward-looking, recognizing losses too late in the credit cycle, and creating a "too little, too late" pattern where banks built reserves only after credit problems were already severe.\n\nCECL requires banks to estimate lifetime expected credit losses at the time a loan is originated or acquired, and to update that estimate each reporting period. The estimate must consider historical loss experience, current conditions, and reasonable and supportable forecasts of future economic conditions. This forward-looking approach means banks recognize expected losses earlier in the credit cycle.\n\nThe practical effects on bank financial statements have been significant. At adoption, most banks recorded a one-time increase in their allowance for credit losses (a "day one" adjustment) that reduced retained earnings but did not flow through the income statement. On an ongoing basis, CECL tends to produce higher reserve levels for longer-duration loans (such as 30-year mortgages) because the bank must estimate losses over the full life of the loan, not just the near term.\n\nCECL also introduced more volatility into quarterly provision expense because the forward-looking component of the estimate changes with economic forecasts. When the economic outlook deteriorates, banks must increase their provision even before actual losses materialize, and when the outlook improves, they can release reserves. This creates more earnings volatility than the prior model.\n\nFor investors analyzing bank stocks, CECL means the allowance for credit losses now reflects management\'s view of future losses as well as current conditions. Comparing reserve ratios across banks requires understanding each bank\'s CECL methodology, the economic assumptions embedded in the estimate, and whether the bank tends to be conservative or aggressive in its forecasting. The disclosures around CECL methodology have become an important part of bank financial analysis.',
    relatedMetrics: ['loan-loss-reserve-ratio', 'provision-to-average-loans', 'reserve-coverage-ratio', 'net-charge-off-ratio'],
    relatedValuations: [],
    relatedFaqs: ['what-is-loan-loss-reserve-ratio', 'what-is-reserve-coverage-ratio', 'how-to-evaluate-loan-credit-quality'],
    relatedGlossaryTerms: ['CECL (Current Expected Credit Losses)', 'Allowance for Credit Losses (ACL)', 'Provision for Credit Losses'],
    cta: {
      type: 'glossary',
      target: '/glossary',
      text: 'See the glossary for definitions of CECL and related accounting terms'
    },
    metaTitle: 'What Is CECL? How It Changed Bank Accounting | BankSift',
    metaDescription: 'Learn what the CECL accounting standard requires, how it differs from the prior incurred-loss model, and what it means for bank reserve levels and earnings volatility.'
  }
];

export default CLUSTER_5_FAQS;

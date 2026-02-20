// "How to Calculate" FAQ Pages — New Capital Strength + Valuation Metrics
// 9 entries: TCE Ratio, CET1, Tier 1, Total Capital, Leverage Ratio, SLR,
// RWA Density, TBVPS, P/TBV
// Phase 2 / Batch 2 content for src/data/content/faqs.js

const HOW_TO_CALCULATE_CAPITAL_VALUATION = [
  {
    slug: 'how-to-calculate-tce-ratio',
    question: 'How do I calculate the tangible common equity (TCE) ratio?',
    cluster: 'capital-and-risk',
    clusterName: 'Capital Strength and Asset Quality',
    intentType: 'procedural',
    shortAnswer: 'The TCE ratio is calculated by dividing tangible common equity (total equity minus goodwill, intangibles, and preferred stock) by tangible assets (total assets minus goodwill and intangibles)',
    fullAnswer: 'The formula for the TCE ratio is:\n\nTCE Ratio = Tangible Common Equity / Tangible Assets\n\nWhere:\nTangible Common Equity = Total Shareholders\' Equity - Goodwill - Other Intangible Assets - Preferred Stock\nTangible Assets = Total Assets - Goodwill - Other Intangible Assets\n\nStep-by-step calculation:\n\n1. Start with total shareholders\' equity from the balance sheet.\n2. Subtract goodwill (typically listed as a separate line item under assets).\n3. Subtract other intangible assets (core deposit intangibles, customer relationship intangibles, trade names, and similar items). Do not subtract mortgage servicing rights, which some analysts treat as a tangible asset because they have a readily observable market value.\n4. Subtract the liquidation value of preferred stock (if any). This isolates the equity attributable to common shareholders.\n5. The result is tangible common equity.\n6. Calculate tangible assets: total assets minus goodwill minus other intangible assets (the same intangibles subtracted in step 3).\n7. Divide tangible common equity by tangible assets.\n\nWorked example: A bank has total assets of $12.0 billion, total equity of $1.4 billion, goodwill of $250 million, other intangibles of $30 million, and preferred stock of $100 million. Tangible common equity = $1.4B - $250M - $30M - $100M = $1.02 billion. Tangible assets = $12.0B - $250M - $30M = $11.72 billion. TCE ratio = $1.02B / $11.72B = 8.7%.\n\nTCE ratio vs equity-to-assets: The equity-to-assets ratio uses unadjusted total equity and total assets. For a bank with no goodwill, intangibles, or preferred stock, the two ratios are identical. For banks that have grown through acquisitions, the TCE ratio will be materially lower than equity-to-assets because goodwill inflates both the numerator and denominator of the simpler ratio. The TCE ratio provides a more conservative view of capital adequacy.\n\nTCE ratio vs CET1 ratio: The CET1 ratio uses risk-weighted assets in the denominator and applies specific regulatory deductions to the numerator that may differ from the accounting-based deductions in the TCE calculation. The TCE ratio can be computed from standard financial statements without access to regulatory filings, making it more accessible to most investors. It serves as a practical proxy for capital adequacy when regulatory capital data is not available.\n\nWhere to find the inputs: Total equity, goodwill, other intangible assets, and preferred stock are on the balance sheet in 10-K and 10-Q filings. Some banks report tangible common equity directly in their quarterly earnings releases or supplemental financial data tables.',
    relatedMetrics: ['tangible-common-equity-ratio', 'equity-to-assets', 'cet1-capital-ratio', 'tangible-book-value-per-share'],
    relatedValuations: ['price-to-tangible-book-valuation'],
    relatedFaqs: ['what-is-tce-ratio', 'how-to-calculate-equity-to-assets', 'how-to-calculate-cet1-ratio', 'tangible-book-value-vs-book-value'],
    relatedGlossaryTerms: ['Tangible Common Equity (TCE)', 'Tangible Book Value', 'Goodwill'],
    cta: {
      type: 'learn-metric',
      target: '/metrics/tangible-common-equity-ratio',
      text: 'Learn more about the TCE ratio and why bank analysts prefer it'
    },
    metaTitle: 'How to Calculate the TCE Ratio for Banks | BankSift',
    metaDescription: 'Step-by-step guide to calculating the tangible common equity ratio for banks, including what to subtract, a worked example, and how it compares to equity-to-assets and CET1.'
  },
  {
    slug: 'how-to-calculate-cet1-ratio',
    question: 'How do I calculate the CET1 capital ratio?',
    cluster: 'capital-and-risk',
    clusterName: 'Capital Strength and Asset Quality',
    intentType: 'procedural',
    shortAnswer: 'The CET1 ratio is calculated by dividing Common Equity Tier 1 capital by risk-weighted assets, but the specific regulatory deductions and RWA calculations make it impractical to compute from standard financial statements alone',
    fullAnswer: 'The formula for the CET1 capital ratio is:\n\nCET1 Ratio = Common Equity Tier 1 Capital / Risk-Weighted Assets (RWA)\n\nThe concept is straightforward, but the precise calculation involves regulatory definitions that go beyond standard accounting data.\n\nCET1 capital starts with common shareholders\' equity and then applies a series of regulatory adjustments. The main components include common stock and related surplus, retained earnings, accumulated other comprehensive income (AOCI, with some banks having elected a one-time opt-out), and qualifying minority interests. Key deductions include goodwill and other intangible assets (net of associated deferred tax liabilities), deferred tax assets that exceed certain thresholds, investments in unconsolidated financial institutions above specified limits, and any shortfall in the allowance relative to expected losses under the advanced approaches.\n\nRisk-weighted assets are calculated by assigning each asset category a risk weight (0% for cash and Treasuries, 20% for GSE obligations, 50% for most residential mortgages, 100% for most commercial loans, 150% for certain high-risk exposures) and summing the weighted amounts. Off-balance-sheet items such as unfunded commitments and letters of credit are also included after applying credit conversion factors.\n\nWhy investors cannot easily calculate CET1 from scratch: The regulatory deductions, risk weight assignments, and off-balance-sheet conversion factors require data from the bank\'s regulatory filings (Call Reports, FR Y-9C) that are more granular than what appears in 10-K and 10-Q filings. The risk-weighting of individual assets requires loan-level and security-level detail that banks do not disclose publicly.\n\nWhere to find CET1 data: Banks report their CET1 ratio directly in quarterly earnings releases, investor presentations, and supplemental financial data. Regulatory filings (available through the FFIEC Central Data Repository and the Federal Reserve\'s National Information Center) contain the detailed calculation. The largest banks also provide CET1 reconciliation tables in their earnings supplements showing the walk from GAAP equity to CET1 capital.\n\nApproximating CET1: For a rough estimate, start with tangible common equity (total equity minus goodwill minus intangibles minus preferred stock) and recognize that CET1 will typically be close to but not identical to this figure. The differences arise from AOCI treatment, deferred tax asset deductions, and other regulatory adjustments. For most banks, the TCE ratio serves as a reasonable proxy when the exact CET1 figure is not available.\n\nMinimum requirements: The regulatory minimum CET1 ratio is 4.5%, with a 2.5% capital conservation buffer bringing the effective minimum to 7.0% for most banks. Large banks face additional requirements through G-SIB surcharges and stress capital buffers.',
    relatedMetrics: ['cet1-capital-ratio', 'tier-1-capital-ratio', 'total-capital-ratio', 'tangible-common-equity-ratio', 'risk-weighted-assets-density'],
    relatedValuations: ['excess-capital-return-model'],
    relatedFaqs: ['what-is-cet1-ratio', 'how-to-calculate-tce-ratio', 'how-to-calculate-tier1-ratio', 'what-are-risk-weighted-assets'],
    relatedGlossaryTerms: ['Common Equity Tier 1 (CET1)', 'Risk-Weighted Assets (RWA)', 'Capital Conservation Buffer', 'Stress Capital Buffer (SCB)'],
    cta: {
      type: 'learn-metric',
      target: '/metrics/cet1-capital-ratio',
      text: 'Learn more about the CET1 ratio and regulatory capital requirements'
    },
    metaTitle: 'How to Calculate the CET1 Capital Ratio for Banks | BankSift',
    metaDescription: 'Learn how the CET1 capital ratio is calculated, why it cannot be precisely computed from standard financial statements, and where to find reported CET1 data.'
  },
  {
    slug: 'how-to-calculate-tier1-ratio',
    question: 'How do I calculate the Tier 1 capital ratio?',
    cluster: 'capital-and-risk',
    clusterName: 'Capital Strength and Asset Quality',
    intentType: 'procedural',
    shortAnswer: 'The Tier 1 capital ratio equals Tier 1 capital (CET1 plus qualifying Additional Tier 1 instruments) divided by risk-weighted assets, and like CET1, it is reported by banks rather than calculated from scratch by investors',
    fullAnswer: 'The formula for the Tier 1 capital ratio is:\n\nTier 1 Capital Ratio = Tier 1 Capital / Risk-Weighted Assets\n\nWhere:\nTier 1 Capital = CET1 Capital + Additional Tier 1 (AT1) Capital\n\nAdditional Tier 1 capital includes non-cumulative perpetual preferred stock and qualifying hybrid capital instruments that meet regulatory criteria for loss absorption on a going-concern basis. These instruments must be subordinated to depositors and general creditors, have no maturity date, and be callable only at the issuer\'s option after a minimum period (typically five years).\n\nStep-by-step conceptual calculation:\n\n1. Start with CET1 capital (as described in the CET1 calculation).\n2. Add qualifying Additional Tier 1 instruments at their par or stated value.\n3. Apply any regulatory deductions specific to AT1 (generally minimal for most banks).\n4. The sum is Tier 1 capital.\n5. Divide by risk-weighted assets (the same RWA denominator used for the CET1 ratio).\n\nWorked example using reported data: A bank reports CET1 capital of $4.2 billion and Additional Tier 1 capital of $500 million (from preferred stock issuances). Risk-weighted assets are $35 billion. Tier 1 capital = $4.2B + $0.5B = $4.7 billion. Tier 1 ratio = $4.7B / $35B = 13.4%. The CET1 ratio for this bank would be $4.2B / $35B = 12.0%.\n\nThe gap between CET1 and Tier 1: For many community and smaller regional banks, the gap is zero or very small because they have not issued preferred stock or qualifying hybrid instruments. The gap is more significant at larger banks. If a bank reports a CET1 ratio of 11.5% and a Tier 1 ratio of 13.0%, the 150 basis point difference represents Additional Tier 1 capital equal to about 1.5% of RWA.\n\nMinimum requirements: The regulatory minimum Tier 1 capital ratio is 6.0%. With the 2.5% capital conservation buffer applied to CET1, the effective constraint is almost always the CET1 requirement rather than the Tier 1 requirement, because the CET1 minimum (4.5% + 2.5% buffer = 7.0%) is more binding than the Tier 1 minimum (6.0%) for banks with any AT1 capital at all.\n\nWhere to find the data: Banks report the Tier 1 ratio alongside the CET1 and Total Capital ratios in quarterly earnings releases, supplemental financial data, and regulatory filings. The capital reconciliation tables provided by most banks show the components of each capital tier.',
    relatedMetrics: ['tier-1-capital-ratio', 'cet1-capital-ratio', 'total-capital-ratio', 'tier-1-leverage-ratio', 'risk-weighted-assets-density'],
    relatedValuations: ['excess-capital-return-model'],
    relatedFaqs: ['what-is-tier-1-capital-ratio', 'how-to-calculate-cet1-ratio', 'how-to-calculate-total-capital-ratio', 'cet1-vs-tier1-vs-total-capital'],
    relatedGlossaryTerms: ['Tier 1 Capital', 'Common Equity Tier 1 (CET1)', 'Risk-Weighted Assets (RWA)'],
    cta: {
      type: 'learn-metric',
      target: '/metrics/tier-1-capital-ratio',
      text: 'Learn more about the Tier 1 capital ratio and what Additional Tier 1 capital includes'
    },
    metaTitle: 'How to Calculate the Tier 1 Capital Ratio for Banks | BankSift',
    metaDescription: 'Learn how the Tier 1 capital ratio is calculated, what qualifies as Additional Tier 1 capital, and where to find reported Tier 1 data for any bank.'
  },
  {
    slug: 'how-to-calculate-total-capital-ratio',
    question: 'How do I calculate the Total Capital ratio?',
    cluster: 'capital-and-risk',
    clusterName: 'Capital Strength and Asset Quality',
    intentType: 'procedural',
    shortAnswer: 'The Total Capital ratio equals total regulatory capital (Tier 1 plus Tier 2 capital) divided by risk-weighted assets, representing the broadest measure of a bank\'s regulatory capital adequacy',
    fullAnswer: 'The formula for the Total Capital ratio is:\n\nTotal Capital Ratio = (Tier 1 Capital + Tier 2 Capital) / Risk-Weighted Assets\n\nTier 2 capital includes instruments that absorb losses in liquidation (gone-concern capital) rather than on a going-concern basis. The primary components are subordinated debt with an original maturity of at least five years (subject to amortization in the final five years before maturity), qualifying loan loss reserves (the allowance for credit losses, capped at 1.25% of risk-weighted assets under the standardized approach), and certain other instruments that meet regulatory criteria.\n\nStep-by-step conceptual calculation:\n\n1. Start with Tier 1 capital (CET1 + Additional Tier 1).\n2. Add qualifying Tier 2 instruments: subordinated debt (with haircuts applied as it approaches maturity), eligible portions of the allowance for credit losses, and other qualifying Tier 2 items.\n3. Apply any regulatory deductions from Tier 2 (such as reciprocal cross-holdings of capital instruments).\n4. The sum is Total Regulatory Capital.\n5. Divide by risk-weighted assets.\n\nWorked example using reported data: A bank reports Tier 1 capital of $4.7 billion and Tier 2 capital of $800 million (consisting of $500 million in subordinated notes and $300 million in eligible loan loss reserves). Risk-weighted assets are $35 billion. Total capital = $4.7B + $0.8B = $5.5 billion. Total Capital ratio = $5.5B / $35B = 15.7%.\n\nThe Tier 2 component: Tier 2 capital is the least critical layer of regulatory capital for common shareholders because it sits below both CET1 and AT1 in the loss absorption hierarchy. Tier 2 primarily protects depositors and the FDIC insurance fund rather than equity investors. However, the Total Capital ratio matters because falling below the 8.0% minimum (or the 10.0% well-capitalized threshold) triggers regulatory consequences that indirectly affect shareholders.\n\nThe allowance cap: Under the standardized approach used by most U.S. banks, only the portion of the allowance for credit losses up to 1.25% of standardized risk-weighted assets counts as Tier 2 capital. Any allowance above that limit does not count toward regulatory capital. This means a bank that has built very large reserves during a credit downturn may not receive full capital credit for that conservatism.\n\nMinimum requirements: The regulatory minimum Total Capital ratio is 8.0%. The well-capitalized threshold is 10.0%. Most U.S. banks operate well above these levels, typically in the 13% to 16% range.\n\nWhere to find the data: Banks report the Total Capital ratio in the same places as CET1 and Tier 1: earnings releases, supplemental tables, and regulatory filings.',
    relatedMetrics: ['total-capital-ratio', 'tier-1-capital-ratio', 'cet1-capital-ratio', 'risk-weighted-assets-density'],
    relatedValuations: [],
    relatedFaqs: ['cet1-vs-tier1-vs-total-capital', 'how-to-calculate-tier1-ratio', 'how-to-calculate-cet1-ratio', 'well-capitalized-vs-adequately-capitalized'],
    relatedGlossaryTerms: ['Total Regulatory Capital', 'Tier 2 Capital', 'Tier 1 Capital', 'Risk-Weighted Assets (RWA)'],
    cta: {
      type: 'learn-metric',
      target: '/metrics/total-capital-ratio',
      text: 'Learn more about the Total Capital ratio and the regulatory capital hierarchy'
    },
    metaTitle: 'How to Calculate the Total Capital Ratio for Banks | BankSift',
    metaDescription: 'Learn how the Total Capital ratio is calculated, what qualifies as Tier 2 capital, the allowance cap, and where to find reported Total Capital data.'
  },
  {
    slug: 'how-to-calculate-leverage-ratio',
    question: 'How do I calculate the Tier 1 leverage ratio?',
    cluster: 'capital-and-risk',
    clusterName: 'Capital Strength and Asset Quality',
    intentType: 'procedural',
    shortAnswer: 'The Tier 1 leverage ratio is calculated by dividing Tier 1 capital by average total consolidated assets, providing a simple non-risk-weighted measure of capital adequacy that serves as a backstop to the risk-based capital ratios',
    fullAnswer: 'The formula for the Tier 1 leverage ratio is:\n\nTier 1 Leverage Ratio = Tier 1 Capital / Average Total Consolidated Assets\n\nUnlike the CET1, Tier 1, and Total Capital ratios, the leverage ratio does not use risk-weighted assets in the denominator. It uses average total assets (typically the quarterly average of daily or monthly balances), which makes it a simpler and more transparent measure.\n\nStep-by-step calculation:\n\n1. Determine Tier 1 capital. This is the same Tier 1 capital figure used in the Tier 1 capital ratio (CET1 + Additional Tier 1, with regulatory deductions). Banks report this directly.\n2. Determine average total consolidated assets. This is the average of total on-balance-sheet assets over the reporting period. Some regulatory adjustments may apply (such as deducting goodwill and certain intangibles from average assets to avoid double-counting with the numerator deductions), though the specific treatment varies.\n3. Divide Tier 1 capital by average total consolidated assets.\n\nWorked example: A bank reports Tier 1 capital of $4.7 billion and average total consolidated assets of $48 billion. Tier 1 leverage ratio = $4.7B / $48B = 9.8%.\n\nWhy the leverage ratio exists: The risk-based capital ratios (CET1, Tier 1, Total Capital) can be gamed or distorted if risk weights do not accurately reflect true asset risk. A bank could theoretically hold large amounts of assets with low risk weights and appear well-capitalized on a risk-weighted basis while having very thin capital relative to its total balance sheet. The leverage ratio serves as a non-risk-weighted backstop that ensures every bank maintains a minimum level of capital against its total asset base regardless of asset composition.\n\nRelationship to equity-to-assets: The leverage ratio is conceptually similar to the equity-to-assets ratio but uses Tier 1 capital (a regulatory definition) rather than total equity (an accounting definition) in the numerator, and uses average assets rather than period-end assets in the denominator. The two measures are typically close but not identical.\n\nMinimum requirements: The minimum Tier 1 leverage ratio is 4.0% for adequately capitalized status and 5.0% for well-capitalized status. Most banks operate with leverage ratios of 8% to 10% or higher. Community banks that have elected the Community Bank Leverage Ratio (CBLR) framework use a simplified 9.0% leverage ratio as their sole capital requirement, exempt from risk-based ratio calculations.\n\nWhere to find the data: Banks report the leverage ratio in quarterly earnings releases and regulatory filings alongside the risk-based capital ratios.',
    relatedMetrics: ['tier-1-leverage-ratio', 'tier-1-capital-ratio', 'cet1-capital-ratio', 'equity-to-assets', 'supplementary-leverage-ratio'],
    relatedValuations: [],
    relatedFaqs: ['what-is-cet1-ratio', 'what-is-a-good-equity-to-assets-ratio', 'how-to-calculate-cet1-ratio', 'how-to-calculate-slr'],
    relatedGlossaryTerms: ['Leverage Ratio', 'Tier 1 Capital', 'Well-Capitalized'],
    cta: {
      type: 'learn-metric',
      target: '/metrics/tier-1-leverage-ratio',
      text: 'Learn more about the Tier 1 leverage ratio and why it serves as a capital backstop'
    },
    metaTitle: 'How to Calculate the Tier 1 Leverage Ratio for Banks | BankSift',
    metaDescription: 'Step-by-step guide to calculating the Tier 1 leverage ratio, including why it uses total assets rather than risk-weighted assets and minimum requirements.'
  },
  {
    slug: 'how-to-calculate-slr',
    question: 'How do I calculate the supplementary leverage ratio (SLR)?',
    cluster: 'capital-and-risk',
    clusterName: 'Capital Strength and Asset Quality',
    intentType: 'procedural',
    shortAnswer: 'The SLR is calculated by dividing Tier 1 capital by total leverage exposure, which includes both on-balance-sheet assets and certain off-balance-sheet exposures, and applies only to the largest banking organizations',
    fullAnswer: 'The formula for the supplementary leverage ratio is:\n\nSLR = Tier 1 Capital / Total Leverage Exposure\n\nTotal leverage exposure expands the denominator beyond average total assets to include off-balance-sheet items. This is the key difference between the SLR and the standard Tier 1 leverage ratio.\n\nTotal leverage exposure includes on-balance-sheet assets (similar to the standard leverage ratio), plus the notional amount of off-balance-sheet exposures such as loan commitments (unfunded portions of credit facilities), standby letters of credit, financial guarantees, and derivatives exposures (calculated using specific methodologies for current and potential future exposure). Securities financing transactions (repos, reverse repos, securities lending) are also included with specific netting rules.\n\nStep-by-step conceptual calculation:\n\n1. Start with Tier 1 capital (same as used in the Tier 1 capital ratio and standard leverage ratio).\n2. Calculate total leverage exposure: average total on-balance-sheet assets plus off-balance-sheet exposures (loan commitments, letters of credit, derivatives, securities financing transactions, and other items, each subject to specific calculation rules).\n3. Divide Tier 1 capital by total leverage exposure.\n\nWorked example: A large bank reports Tier 1 capital of $180 billion and total leverage exposure of $3.2 trillion (consisting of $2.7 trillion in on-balance-sheet assets and $500 billion in off-balance-sheet exposures). SLR = $180B / $3.2T = 5.6%.\n\nWho must comply: The SLR applies only to banking organizations with more than $250 billion in total consolidated assets or more than $10 billion in on-balance-sheet foreign exposure. This effectively limits the requirement to the largest U.S. bank holding companies and their insured depository institution subsidiaries. Community and most regional banks are not subject to the SLR.\n\nMinimum requirements: The minimum SLR for applicable bank holding companies is 3.0%. The largest U.S. banks (G-SIBs) are subject to an enhanced supplementary leverage ratio (eSLR) buffer of 2.0% at the holding company level, bringing their effective minimum to 5.0%. Insured depository subsidiaries of G-SIBs must maintain at least a 6.0% SLR to be considered well capitalized.\n\nWhy investors cannot calculate SLR independently: The off-balance-sheet components require detailed data on derivatives portfolios, credit commitments, and securities financing transactions that is not fully disclosed in standard financial statements. Banks report their SLR and total leverage exposure in regulatory filings and supplemental disclosures.\n\nWhere to find the data: Large banks report SLR in quarterly earnings releases, supplemental financial data, and FR Y-9C regulatory filings. The Federal Reserve publishes SLR data for the largest banks as part of stress test and capital plan disclosures.',
    relatedMetrics: ['supplementary-leverage-ratio', 'tier-1-leverage-ratio', 'tier-1-capital-ratio', 'cet1-capital-ratio'],
    relatedValuations: [],
    relatedFaqs: ['how-to-calculate-leverage-ratio', 'what-is-cet1-ratio', 'cet1-vs-tier1-vs-total-capital'],
    relatedGlossaryTerms: ['Supplementary Leverage Ratio (SLR)', 'Leverage Ratio', 'Tier 1 Capital'],
    cta: {
      type: 'learn-metric',
      target: '/metrics/supplementary-leverage-ratio',
      text: 'Learn more about the SLR and how it applies to the largest banks'
    },
    metaTitle: 'How to Calculate the Supplementary Leverage Ratio (SLR) | BankSift',
    metaDescription: 'Learn how the SLR is calculated, what total leverage exposure includes, which banks must comply, minimum requirements, and where to find reported SLR data.'
  },
  {
    slug: 'how-to-calculate-rwa-density',
    question: 'How do I calculate risk-weighted assets density?',
    cluster: 'capital-and-risk',
    clusterName: 'Capital Strength and Asset Quality',
    intentType: 'procedural',
    shortAnswer: 'RWA density is calculated by dividing risk-weighted assets by total assets, expressing what percentage of the bank\'s balance sheet carries risk weight and indicating the overall riskiness of its asset portfolio',
    fullAnswer: 'The formula for RWA density is:\n\nRWA Density = Risk-Weighted Assets / Total Assets\n\nThe result is expressed as a percentage, typically ranging from 50% to 85% for U.S. banks.\n\nStep-by-step calculation:\n\n1. Find the bank\'s total risk-weighted assets. This figure is reported in regulatory filings and most quarterly earnings releases. It is the same denominator used in the CET1, Tier 1, and Total Capital ratios.\n2. Find total assets from the balance sheet.\n3. Divide risk-weighted assets by total assets.\n\nWorked example: A bank reports risk-weighted assets of $28 billion and total assets of $40 billion. RWA density = $28B / $40B = 70%.\n\nWhat RWA density reveals: The ratio indicates how much of the bank\'s balance sheet consists of higher-risk-weighted assets. A low RWA density (below 60%) suggests the bank holds substantial amounts of low-risk-weight assets such as cash, government securities, and agency mortgage-backed securities. A high RWA density (above 75%) indicates the balance sheet is dominated by fully risk-weighted assets, primarily commercial loans, consumer loans, and other credit exposures.\n\nComparing RWA density across banks provides insight into relative risk profiles. A bank with 55% RWA density and a CET1 ratio of 12% may appear similarly capitalized to a bank with 80% RWA density and a CET1 ratio of 12%, but the second bank holds more capital in absolute dollar terms relative to its total assets because its assets carry more risk. This is why the leverage ratio (which uses total assets) exists as a complement to risk-based ratios.\n\nRWA density and the leverage ratio: For any given CET1 ratio target, lower RWA density means the bank needs less absolute capital to meet risk-based requirements. However, the leverage ratio (Tier 1 / Total Assets) sets a floor regardless of RWA density. Banks with very low RWA density may find the leverage ratio to be their binding capital constraint rather than the risk-based ratios.\n\nTrend analysis: Changes in RWA density over time reflect shifts in asset composition. A bank that is growing its commercial loan book (100% risk weight) while its securities portfolio (0% to 20% risk weight) remains flat will see rising RWA density. A bank selling loans and investing in Treasuries will see declining density. These shifts affect how much capital is required to maintain a given CET1 ratio.\n\nWhere to find the inputs: Risk-weighted assets are disclosed in quarterly earnings releases, supplemental financial data, and regulatory filings (Call Reports, FR Y-9C). Total assets are on the balance sheet. The ratio is not typically reported by banks directly but is easy to calculate from these two widely available figures.',
    relatedMetrics: ['risk-weighted-assets-density', 'cet1-capital-ratio', 'tier-1-capital-ratio', 'tier-1-leverage-ratio', 'equity-to-assets'],
    relatedValuations: [],
    relatedFaqs: ['what-are-risk-weighted-assets', 'how-to-calculate-cet1-ratio', 'how-to-calculate-leverage-ratio'],
    relatedGlossaryTerms: ['Risk-Weighted Assets (RWA)', 'Common Equity Tier 1 (CET1)', 'Leverage Ratio'],
    cta: {
      type: 'learn-metric',
      target: '/metrics/risk-weighted-assets-density',
      text: 'Learn more about RWA density and what it reveals about bank asset risk profiles'
    },
    metaTitle: 'How to Calculate RWA Density for Banks | BankSift',
    metaDescription: 'Step-by-step guide to calculating risk-weighted assets density, including what it reveals about a bank\'s asset risk profile and how it connects to capital ratios.'
  },
  {
    slug: 'how-to-calculate-tbvps',
    question: 'How do I calculate tangible book value per share (TBVPS)?',
    cluster: 'capital-and-risk',
    clusterName: 'Capital Strength and Asset Quality',
    intentType: 'procedural',
    shortAnswer: 'TBVPS is calculated by subtracting goodwill and other intangible assets from total shareholders\' equity, then dividing by diluted shares outstanding, giving a per-share measure of the bank\'s net tangible asset value',
    fullAnswer: 'The formula for TBVPS is:\n\nTBVPS = (Total Shareholders\' Equity - Goodwill - Other Intangible Assets) / Diluted Shares Outstanding\n\nSome analysts also subtract preferred stock from equity to arrive at tangible common equity before dividing by shares, which is more precise for banks with preferred stock outstanding.\n\nStep-by-step calculation:\n\n1. Start with total shareholders\' equity from the balance sheet.\n2. Subtract goodwill.\n3. Subtract other intangible assets (core deposit intangibles, customer relationship intangibles, trade names, and similar items).\n4. Optionally subtract preferred stock (if the goal is tangible common equity per share rather than tangible equity per share). For banks with preferred stock, this step is recommended.\n5. Divide by diluted shares outstanding (found in the earnings release, income statement, or notes to financial statements).\n\nWorked example: A bank has total equity of $2.8 billion, goodwill of $350 million, other intangibles of $40 million, no preferred stock, and 80 million diluted shares outstanding. Tangible equity = $2.8B - $350M - $40M = $2.41 billion. TBVPS = $2.41B / 80M = $30.13.\n\nTBVPS vs BVPS: Book value per share (BVPS) uses total equity without subtracting intangibles. For the same bank, BVPS = $2.8B / 80M = $35.00. The $4.87 difference ($35.00 - $30.13) represents the per-share value of intangible assets. For banks with no goodwill or intangibles (those that have grown entirely organically), TBVPS and BVPS are identical.\n\nImpact of acquisitions: Every acquisition where the purchase price exceeds the target\'s net tangible assets creates goodwill that widens the gap between BVPS and TBVPS. Active acquirers may show TBVPS that is 15% to 30% below BVPS. This is not inherently negative (the acquired franchise may generate returns well above the cost of the goodwill), but it means the bank has a larger portion of its book value in intangible form.\n\nTBVPS growth as a performance measure: Many bank analysts track TBVPS growth over time as a key performance indicator because it measures tangible value creation for shareholders on a per-share basis. TBVPS growth reflects retained earnings accumulation, the effect of share buybacks (which reduce the denominator), and any impairment of goodwill or changes in intangibles. A bank growing TBVPS at 6% to 8% annually is generating meaningful tangible value for shareholders.\n\nRelationship to P/TBV: The price-to-tangible-book ratio is simply the stock price divided by TBVPS. P/TBV = Share Price / TBVPS.\n\nWhere to find the inputs: Total equity, goodwill, and other intangibles are on the balance sheet in 10-K and 10-Q filings. Diluted shares outstanding are in the income statement or notes. Many banks report TBVPS directly in their quarterly earnings releases.',
    relatedMetrics: ['tangible-book-value-per-share', 'book-value-per-share', 'price-to-tangible-book-value', 'tangible-common-equity-ratio'],
    relatedValuations: ['price-to-tangible-book-valuation', 'price-to-book-valuation'],
    relatedFaqs: ['tangible-book-value-vs-book-value', 'how-to-calculate-bvps', 'how-to-calculate-price-to-tangible-book', 'pb-vs-ptbv'],
    relatedGlossaryTerms: ['Tangible Book Value Per Share (TBVPS)', 'Tangible Book Value', 'Goodwill', 'Book Value Per Share'],
    cta: {
      type: 'learn-metric',
      target: '/metrics/tangible-book-value-per-share',
      text: 'Learn more about TBVPS and why it matters for bank valuation'
    },
    metaTitle: 'How to Calculate TBVPS for Banks | BankSift',
    metaDescription: 'Step-by-step guide to calculating tangible book value per share, including how it differs from BVPS, a worked example, and why TBVPS growth matters.'
  },
  {
    slug: 'how-to-calculate-price-to-tangible-book',
    question: 'How do I calculate price-to-tangible-book value (P/TBV)?',
    cluster: 'capital-and-risk',
    clusterName: 'Capital Strength and Asset Quality',
    intentType: 'procedural',
    shortAnswer: 'P/TBV is calculated by dividing the current share price by tangible book value per share, or equivalently by dividing market capitalization by total tangible equity, measuring what premium or discount the market assigns to a bank\'s tangible net asset value',
    fullAnswer: 'The formula for P/TBV is:\n\nP/TBV = Share Price / TBVPS\n\nOr equivalently:\n\nP/TBV = Market Capitalization / Tangible Common Equity\n\nStep-by-step calculation:\n\n1. Calculate TBVPS: (Total Equity - Goodwill - Other Intangibles - Preferred Stock) / Diluted Shares Outstanding.\n2. Divide the current share price by TBVPS.\n\nAlternatively:\n1. Calculate tangible common equity: Total Equity - Goodwill - Other Intangibles - Preferred Stock.\n2. Calculate market capitalization: Share Price x Shares Outstanding.\n3. Divide market cap by tangible common equity.\n\nWorked example: A bank\'s stock trades at $36.00 per share. TBVPS is $30.13. P/TBV = $36.00 / $30.13 = 1.19x. The bank trades at a 19% premium to its tangible book value.\n\nP/TBV vs P/B: P/TBV will always be equal to or higher than P/B for the same bank because TBVPS is smaller than BVPS (the denominator is reduced by intangibles). For the same bank with BVPS of $35.00, P/B = $36.00 / $35.00 = 1.03x. The bank trades at a 3% premium to total book but a 19% premium to tangible book. The P/TBV multiple more accurately reflects the premium assigned to tangible, realizable assets.\n\nWhen to use P/TBV instead of P/B: P/TBV is preferred when comparing banks with different levels of goodwill and intangible assets. A bank that has grown through numerous acquisitions may have substantial goodwill that inflates BVPS, making its P/B look low. P/TBV adjusts for this by removing the intangibles from the comparison base. P/TBV is particularly useful when evaluating acquisition-heavy banks, comparing organic growers to serial acquirers, or assessing liquidation value.\n\nRelationship to ROTCE: P/TBV = P/E x ROTCE. This is the tangible analog of the P/B = P/E x ROE identity. A bank justified in trading at a high P/TBV should have a correspondingly high ROTCE. If P/TBV seems elevated but ROTCE is mediocre, the stock may be overvalued on a tangible book basis.\n\nTypical ranges: Banks with strong ROTCE and growth prospects may trade at 1.5x to 2.5x tangible book. Average banks trade at 1.0x to 1.5x. Banks with credit quality concerns, weak earnings, or excess goodwill may trade below tangible book value (P/TBV below 1.0x).\n\nWhere to find the inputs: Share price is from any financial data provider. TBVPS is either reported by the bank in earnings releases or calculated from balance sheet data as described above.',
    relatedMetrics: ['price-to-tangible-book-value', 'tangible-book-value-per-share', 'price-to-book', 'return-on-tangible-common-equity'],
    relatedValuations: ['price-to-tangible-book-valuation', 'price-to-book-valuation', 'roe-pb-framework'],
    relatedFaqs: ['pb-vs-ptbv', 'when-to-use-ptbv', 'how-to-calculate-tbvps', 'how-to-calculate-price-to-book'],
    relatedGlossaryTerms: ['Tangible Book Value Per Share (TBVPS)', 'Tangible Book Value', 'Price to Book'],
    cta: {
      type: 'learn-metric',
      target: '/metrics/price-to-tangible-book-value',
      text: 'Learn more about P/TBV and when to use it instead of P/B for bank valuation'
    },
    metaTitle: 'How to Calculate P/TBV for Banks | BankSift',
    metaDescription: 'Step-by-step guide to calculating price-to-tangible-book value, including when to use P/TBV instead of P/B, a worked example, and the ROTCE connection.'
  }
];

export default HOW_TO_CALCULATE_CAPITAL_VALUATION;

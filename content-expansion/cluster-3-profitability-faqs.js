/**
 * BankSift Content Expansion — Batch 1, Prompt 4
 * Complete FAQ entries for Cluster 3: Bank Profitability Metrics
 *
 * USAGE:
 *   Add all entries in the CLUSTER_3_FAQS array to the main FAQS array
 *   in src/data/content/faqs.js.
 *
 * CONVENTIONS:
 *   - Plain text only (no HTML or Markdown) in all fields
 *   - fullAnswer uses \n\n for paragraph breaks
 *   - shortAnswer has no trailing period
 *   - metaTitle under 60 characters where possible, always ends with "| BankSift"
 *   - metaDescription is 120-160 characters
 *   - Intermediate-level tone per Section 12 guidelines
 *   - All relatedMetrics / relatedValuations / relatedFaqs slugs reference valid entries
 */

export const CLUSTER_3_FAQS = [

  // ───────────────────────────────────────────────
  // Q33: What is a good ROE for a bank stock?
  // ───────────────────────────────────────────────
  {
    slug: 'what-is-a-good-roe-for-banks',
    question: 'What is a good ROE for a bank stock?',
    cluster: 'profitability',
    clusterName: 'Bank Profitability Metrics',
    intentType: 'evaluative',

    shortAnswer: 'Well-managed US banks have historically achieved ROE between 8% and 15%, with the appropriate target depending on the bank\'s size, business model, capital levels, and position in the credit cycle',

    fullAnswer:
      'A "good" ROE for a bank stock depends on context, but historical data from the FDIC provides useful benchmarks. US commercial banks have historically averaged ROE in the range of 8-12% over full economic cycles. Banks that consistently deliver ROE above 12% are considered strong performers. Those sustaining 15% or above are exceptional, though that level warrants scrutiny to ensure it reflects genuine operating strength rather than thin capitalization or unsustainable risk-taking.\n\n' +
      'The most important framework for evaluating whether a bank\'s ROE is "good" is comparison to the cost of equity. The cost of equity for US bank stocks generally falls in the range of 9-12%, depending on the bank\'s size, risk profile, and market conditions. A bank that earns ROE above its cost of equity is creating economic value for shareholders and deserves to trade at a price-to-book multiple above 1.0. A bank earning ROE below its cost of equity is destroying value, even if the absolute ROE figure looks reasonable in isolation.\n\n' +
      'Size matters when setting expectations. Money center banks with diversified revenue streams and active capital management typically target 12-15% ROE. Well-run community banks often achieve 10-13%, though this varies with local economic conditions. Banks that maintain excess capital above regulatory minimums will show mechanically lower ROE because the denominator (equity) is larger than operationally necessary. A bank with 1.10% ROAA and a 12% equity-to-assets ratio produces 9.2% ROE, while the same ROAA at 9% equity-to-assets produces 12.2% ROE. The difference is leverage, not management quality.\n\n' +
      'The credit cycle introduces another dimension. ROE across the industry tends to peak during periods of benign credit (low provisions) and trough during downturns (elevated provisions). A bank reporting 14% ROE during a period of abnormally low credit losses may not sustain that level when the cycle turns. Through-the-cycle or mid-cycle ROE is a more reliable measure of underlying earning power than any single period\'s result.\n\n' +
      'ROE should always be evaluated alongside ROAA and the equity-to-assets ratio. Strong ROAA paired with strong ROE confirms genuine operating profitability amplified by appropriate (not excessive) leverage. Strong ROE paired with weak ROAA suggests the bank is generating returns primarily through high leverage, which introduces fragility. Weak ROE paired with strong ROAA suggests overcapitalization, which may resolve through buybacks, dividends, or growth.\n\n' +
      'As a practical screening threshold, many bank stock investors look for ROE above 10% as a starting quality filter, then assess whether the level is sustainable by examining its drivers through the DuPont decomposition.',

    relatedMetrics: ['roe', 'roaa', 'equity-to-assets'],
    relatedValuations: ['roe-pb-framework', 'peer-comparison-analysis'],
    relatedFaqs: ['can-roe-be-too-high', 'roe-vs-roaa', 'dupont-decomposition-for-banks'],
    relatedGlossaryTerms: ['Equity Multiplier', 'DuPont Decomposition'],

    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Screen bank stocks by ROE and other profitability metrics'
    },

    metaTitle: 'What Is a Good ROE for a Bank? | BankSift',
    metaDescription: 'Learn what constitutes a good ROE for bank stocks, with benchmarks by bank type, the role of leverage, and how to evaluate ROE through the credit cycle.'
  },

  // ───────────────────────────────────────────────
  // Q34: Why is ROE more important for banks?
  // ───────────────────────────────────────────────
  {
    slug: 'why-roe-important-for-banks',
    question: 'Why is ROE more important for banks than for other companies?',
    cluster: 'profitability',
    clusterName: 'Bank Profitability Metrics',
    intentType: 'conceptual',

    shortAnswer: 'ROE is central to bank analysis because it directly determines the justified price-to-book multiple through the ROE-P/B framework, connects profitability to capital generation capacity, and captures the leverage dynamics that define banking',

    fullAnswer:
      'ROE holds a unique position in bank stock analysis that it does not occupy in most other industries. Several structural features of banking make ROE the single most important metric connecting profitability to valuation.\n\n' +
      'The first reason is the direct link between ROE and valuation. The justified price-to-book formula, P/B = (ROE - g) / (r - g), makes ROE the primary determinant of what a bank\'s stock should be worth relative to its book value. Because price-to-book is the primary valuation metric for banks (due to the financial instrument nature of bank balance sheets), and ROE is the primary driver of P/B, ROE becomes the fundamental bridge between operating performance and market value. No other industry has such a direct, formulaic connection between a profitability metric and the primary valuation metric.\n\n' +
      'The second reason is leverage. Banks operate with equity-to-asset ratios of 8-12%, meaning equity is a scarce and costly resource. How effectively a bank deploys that scarce equity determines its competitive position and long-term viability. A bank earning 12% ROE generates 12 cents of profit per dollar of equity, which it can retain to grow, distribute as dividends, or use to repurchase shares. A bank earning 7% ROE on the same equity base generates far less and may not cover its cost of equity, destroying economic value for shareholders over time.\n\n' +
      'The third reason is capital generation. A bank\'s sustainable growth rate equals ROE multiplied by the retention ratio (the portion of earnings not paid as dividends). This means ROE directly determines how fast a bank can grow its equity base, and therefore its asset base and lending capacity, without raising external capital. A bank with 12% ROE retaining 60% of earnings can grow equity at 7.2% per year. A bank with 8% ROE retaining the same proportion grows at only 4.8%. Over a decade, this compounding difference becomes substantial.\n\n' +
      'The fourth reason is regulatory relevance. Bank regulators evaluate capital adequacy partly through the lens of whether the bank generates sufficient returns to maintain and build capital ratios organically. A bank that consistently earns ROE above its cost of equity can maintain adequate capital through retained earnings without relying on external capital raises, giving it strategic independence and flexibility.\n\n' +
      'For non-financial companies, other metrics often take precedence: revenue growth for technology, free cash flow yield for industrials, same-store sales for retailers. For banks, ROE is the metric that most directly captures the interplay of profitability, leverage, capital adequacy, and valuation that defines the industry.',

    relatedMetrics: ['roe', 'price-to-book', 'equity-to-assets', 'roaa'],
    relatedValuations: ['roe-pb-framework', 'price-to-book-valuation'],
    relatedFaqs: ['what-is-a-good-roe-for-banks', 'roe-vs-roaa', 'roe-pb-framework-explained'],
    relatedGlossaryTerms: ['Justified P/B Multiple', 'Sustainable Growth Rate', 'Retention Ratio'],

    cta: {
      type: 'learn-metric',
      target: '/metrics/roe',
      text: 'Learn more about return on equity for bank stocks'
    },

    metaTitle: 'Why ROE Matters Most for Banks | BankSift',
    metaDescription: 'Understand why return on equity is the most important metric for bank stocks, linking profitability to valuation, capital generation, and leverage.'
  },

  // ───────────────────────────────────────────────
  // Q35: Can ROE be too high?
  // ───────────────────────────────────────────────
  {
    slug: 'can-roe-be-too-high',
    question: 'Can ROE be too high for a bank? What does that signal?',
    cluster: 'profitability',
    clusterName: 'Bank Profitability Metrics',
    intentType: 'evaluative',

    shortAnswer: 'An unusually high ROE can signal thin capitalization, excessive leverage, unsustainable risk-taking, or one-time earnings items rather than genuine operating excellence',

    fullAnswer:
      'While higher ROE is generally preferred, bank ROE that appears unusually elevated relative to peers and historical norms deserves investigation rather than celebration. Several conditions can produce high ROE that is not sustainable or not indicative of sound management.\n\n' +
      'Thin capitalization is the most common explanation. Because ROE equals ROAA multiplied by the equity multiplier (assets divided by equity), a bank can boost ROE simply by operating with less equity. A bank earning 1.00% ROAA with a 7% equity-to-assets ratio produces 14.3% ROE. The same ROAA at a 10% equity-to-assets ratio produces 10.0% ROE. The first bank looks more profitable by ROE, but it has a thinner capital cushion and less room to absorb losses. If the bank\'s high equity multiplier results from deliberately running capital near regulatory minimums, the elevated ROE reflects higher risk rather than superior management.\n\n' +
      'Unsustainable earnings can inflate ROE temporarily. During benign credit environments, provisions for credit losses may be abnormally low, flattering net income and ROE. Securities gains from selling appreciated bonds, legal settlement proceeds, tax benefits from one-time adjustments, and gains from branch or subsidiary sales can all boost a single period\'s ROE above its sustainable level. Checking whether the elevated ROE is driven by pre-provision net revenue (PPNR) or by unusually low provisions and one-time items distinguishes genuine earning power from temporary distortions.\n\n' +
      'Excessive risk-taking can generate high returns in favorable environments. A bank concentrating its loan portfolio in high-yield but risky asset classes, such as speculative commercial real estate, subprime consumer lending, or highly leveraged commercial loans, may earn wider spreads and higher NIM during good times, translating to elevated ROE. When the credit cycle turns, these same concentrations produce outsized losses. Checking asset quality metrics (NPL ratio, net charge-off ratio, reserve coverage) alongside ROE helps distinguish sound profitability from risk accumulation.\n\n' +
      'The practical test is comparing ROE to ROAA and equity-to-assets simultaneously. If ROE is high but ROAA is merely average, leverage is doing the work. If both ROE and ROAA are high but the equity-to-assets ratio is near regulatory minimums, the bank is profitable but potentially fragile. If ROE and ROAA are both strong with a comfortable capital cushion, the bank is likely a genuine high performer.\n\n' +
      'As a rough guideline, ROE consistently above 16-18% for a US commercial bank should prompt closer examination. Some banks do sustain these levels through exceptional operating efficiency, unique market positions, or high fee income businesses, but many cases of outlier ROE reflect one or more of the risk factors described above.',

    relatedMetrics: ['roe', 'roaa', 'equity-to-assets'],
    relatedValuations: ['roe-pb-framework'],
    relatedFaqs: ['what-is-a-good-roe-for-banks', 'dupont-decomposition-for-banks', 'what-is-a-good-equity-to-assets-ratio'],
    relatedGlossaryTerms: ['Equity Multiplier', 'Pre-Provision Net Revenue'],

    cta: {
      type: 'learn-metric',
      target: '/metrics/roe',
      text: 'Learn about ROE and its components for bank stock analysis'
    },

    metaTitle: 'Can Bank ROE Be Too High? | BankSift',
    metaDescription: 'Learn why unusually high ROE at a bank may signal thin capital, unsustainable earnings, or excessive risk-taking rather than superior management.'
  },

  // ───────────────────────────────────────────────
  // Q36: ROE vs ROAA
  // ───────────────────────────────────────────────
  {
    slug: 'roe-vs-roaa',
    question: 'What is the difference between ROE and ROAA for banks?',
    cluster: 'profitability',
    clusterName: 'Bank Profitability Metrics',
    intentType: 'comparative',

    shortAnswer: 'ROE measures return on equity and reflects both operating performance and leverage, while ROAA measures return on total assets and isolates operating performance from capital structure',

    fullAnswer:
      'ROE and ROAA are the two primary profitability metrics for banks, and they answer different questions. Understanding how they differ and how they connect is essential for accurate bank analysis.\n\n' +
      'ROE (return on equity) equals net income divided by average shareholders\' equity. It measures how much profit the bank generates per dollar of equity capital. Because banks are highly leveraged (typically 88-92% of assets funded by non-equity sources), ROE captures the amplifying effect of leverage on shareholder returns. A bank earning a modest return on its asset base can produce an attractive ROE through the leverage inherent in its business model.\n\n' +
      'ROAA (return on average assets) equals net income divided by average total assets. It measures how much profit the bank generates per dollar of total assets, regardless of how those assets are funded. ROAA isolates operating performance from capital structure decisions, making it a purer measure of how effectively the bank converts its asset base into profit.\n\n' +
      'The two metrics are connected through the equity multiplier: ROE equals ROAA multiplied by average assets divided by average equity. This relationship (part of the DuPont decomposition) means that any difference between what ROE and ROAA imply about a bank\'s performance is attributable to leverage. A bank with strong ROAA and strong ROE is generating good returns from its assets and employing appropriate leverage. A bank with weak ROAA but strong ROE is compensating for mediocre asset productivity with high leverage, which introduces fragility. A bank with strong ROAA but weak ROE may be overcapitalized, carrying more equity than its business requires.\n\n' +
      'Consider two banks. Bank A has ROAA of 1.20% and equity-to-assets of 10%, producing ROE of 12%. Bank B has ROAA of 0.90% and equity-to-assets of 7%, producing ROE of 12.9%. Both show similar ROE, but Bank A is the stronger operator: it earns more per dollar of assets and maintains a thicker capital cushion. Bank B achieves comparable ROE only through higher leverage.\n\n' +
      'For peer comparison, ROAA is generally more informative than ROE because it removes the distortion introduced by different capital levels across banks. For valuation analysis, ROE is more directly useful because it drives the justified P/B multiple. Effective bank analysis uses both metrics together, with ROAA revealing operating quality and ROE linking that quality to shareholder value creation.',

    relatedMetrics: ['roe', 'roaa', 'equity-to-assets'],
    relatedValuations: ['peer-comparison-analysis', 'roe-pb-framework'],
    relatedFaqs: ['when-to-use-roe-vs-roaa', 'what-is-a-good-roe-for-banks', 'what-is-a-good-roaa-for-banks'],
    relatedGlossaryTerms: ['Equity Multiplier', 'DuPont Decomposition'],

    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Compare banks by both ROE and ROAA in the screener'
    },

    metaTitle: 'ROE vs ROAA for Banks | BankSift',
    metaDescription: 'Understand the difference between ROE and ROAA for banks, how they connect through leverage, and what each reveals about bank profitability.'
  },

  // ───────────────────────────────────────────────
  // Q37: When to use ROE vs ROAA
  // ───────────────────────────────────────────────
  {
    slug: 'when-to-use-roe-vs-roaa',
    question: 'When should I use ROE vs ROAA to evaluate a bank?',
    cluster: 'profitability',
    clusterName: 'Bank Profitability Metrics',
    intentType: 'strategic',

    shortAnswer: 'Use ROE for valuation analysis and assessing shareholder returns, and ROAA for comparing operating performance across banks with different capital structures',

    fullAnswer:
      'ROE and ROAA serve different analytical purposes, and choosing the right one depends on the question being asked.\n\n' +
      'Use ROE when the goal is valuation. The justified P/B multiple is derived directly from ROE through the ROE-P/B framework. When determining whether a bank\'s stock price is fair relative to its book value, ROE is the appropriate input. ROE is also the right metric when evaluating shareholder value creation, because shareholders own the equity and their returns are a function of how productively that equity is employed. Dividend growth capacity (sustainable growth rate = ROE multiplied by the retention ratio) also depends on ROE.\n\n' +
      'Use ROAA when the goal is comparing operating performance across banks. Because banks maintain different capital levels (some by choice, some by regulatory requirement), ROE comparisons can be misleading. Two banks with identical ROAA but different equity-to-assets ratios will show different ROEs purely because of capital structure, not because one is managed better than the other. ROAA levels the playing field by measuring profit generation per dollar of assets, making it the cleaner metric for peer comparison of operating efficiency.\n\n' +
      'Use both together when analyzing a specific bank in depth. Start with ROAA to assess the quality of the bank\'s asset-level returns. Then examine the equity-to-assets ratio to understand leverage. Then look at ROE to see how leverage amplifies (or fails to amplify) those asset returns into equity returns. This three-step sequence, which is the essence of the DuPont decomposition, reveals whether ROE is driven by strong operations, high leverage, or a combination.\n\n' +
      'There are specific situations where one metric clearly dominates. When comparing a well-capitalized community bank (12% equity-to-assets) to a leaner regional bank (8% equity-to-assets), ROAA is more informative because it removes the capital structure distortion. When evaluating whether a bank\'s stock is cheap or expensive relative to peers, ROE is more useful because it feeds directly into P/B valuation. When assessing whether a bank\'s capital level is appropriate, looking at the gap between what ROAA and ROE imply is the key: if ROAA is strong but ROE is mediocre, the bank may benefit from deploying excess capital through buybacks or growth.\n\n' +
      'A practical approach for screening is to require minimum thresholds on both: for example, ROE above 9% and ROAA above 0.90%. Banks that pass both filters are generating adequate returns at the asset level and translating those returns into acceptable equity returns without relying on excessive leverage.',

    relatedMetrics: ['roe', 'roaa', 'equity-to-assets'],
    relatedValuations: ['roe-pb-framework', 'peer-comparison-analysis'],
    relatedFaqs: ['roe-vs-roaa', 'what-is-a-good-roe-for-banks', 'comparing-profitability-different-size-banks'],
    relatedGlossaryTerms: ['DuPont Decomposition', 'Equity Multiplier'],

    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Filter banks by ROE and ROAA together in the screener'
    },

    metaTitle: 'When to Use ROE vs ROAA for Banks | BankSift',
    metaDescription: 'Learn when to use ROE versus ROAA for bank analysis: ROE for valuation, ROAA for peer comparison, and both together for complete profitability assessment.'
  },

  // ───────────────────────────────────────────────
  // Q38: What is a good ROAA for a bank?
  // ───────────────────────────────────────────────
  {
    slug: 'what-is-a-good-roaa-for-banks',
    question: 'What is a good ROAA for a bank?',
    cluster: 'profitability',
    clusterName: 'Bank Profitability Metrics',
    intentType: 'evaluative',

    shortAnswer: 'US commercial banks have historically averaged ROAA between 0.90% and 1.30% based on FDIC data, with values above 1.00% generally indicating solid profitability and above 1.30% indicating strong performance',

    fullAnswer:
      'ROAA benchmarks are narrower than ROE benchmarks because ROAA removes the leverage variable, compressing the range of outcomes. US commercial banks have historically averaged ROAA between 0.90% and 1.30% over full economic cycles, based on FDIC Quarterly Banking Profile data.\n\n' +
      'A ROAA above 1.00% is generally considered the threshold for solid profitability. Banks consistently delivering ROAA above 1.20% are strong performers, and those above 1.40% are exceptional. On the weak end, ROAA below 0.75% suggests the bank is struggling to generate adequate returns from its asset base, whether due to compressed margins, poor efficiency, elevated credit costs, or some combination.\n\n' +
      'The asset mix heavily influences what ROAA level is achievable. Banks with a higher proportion of loans relative to securities tend to achieve higher ROAA because loans generally carry higher yields than investment securities. A community bank with 75% of assets in commercial and consumer loans is structurally positioned for higher ROAA than a similarly efficient bank with 55% of assets in loans and a large securities portfolio. The tradeoff is that the loan-heavy bank carries more credit risk.\n\n' +
      'Loan type matters within the loan portfolio. Banks focused on commercial and industrial lending, commercial real estate, or consumer lending typically earn higher yields (and therefore higher ROAA) than those focused on residential mortgages, which carry lower yields but also lower risk weights. A bank\'s ROAA should be evaluated with an understanding of its risk profile, not just the absolute return level.\n\n' +
      'The interest rate environment creates cyclical variation. ROAA tends to be higher during periods of steep yield curves and moderate interest rates, which support wide net interest margins. During periods of compressed margins (flat yield curves, very low rates), even well-managed banks may show ROAA below 1.00%. The FDIC\'s aggregate data shows that industry-wide ROAA has fluctuated between approximately 0.50% (during severe downturns) and 1.40% (during favorable environments) over recent decades.\n\n' +
      'For screening purposes, many investors use a ROAA floor of 0.80-1.00% to identify banks with adequate asset productivity. Within a peer group, relative ROAA ranking is often more informative than the absolute level, since all banks in a given size range and geography face similar rate environments and competitive conditions.',

    relatedMetrics: ['roaa', 'roe', 'net-interest-margin', 'loans-to-assets'],
    relatedValuations: ['peer-comparison-analysis'],
    relatedFaqs: ['roe-vs-roaa', 'what-is-a-good-roe-for-banks', 'comparing-profitability-different-size-banks'],
    relatedGlossaryTerms: [],

    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Screen banks by ROAA and related profitability metrics'
    },

    metaTitle: 'What Is a Good ROAA for a Bank? | BankSift',
    metaDescription: 'Learn what constitutes a good ROAA for banks using FDIC benchmarks, how asset mix affects achievable levels, and practical screening thresholds.'
  },

  // ───────────────────────────────────────────────
  // Q39: What is a good NIM for a bank?
  // ───────────────────────────────────────────────
  {
    slug: 'what-is-a-good-nim-for-banks',
    question: 'What is a good net interest margin for a bank?',
    cluster: 'profitability',
    clusterName: 'Bank Profitability Metrics',
    intentType: 'evaluative',

    shortAnswer: 'US banks have historically averaged NIM between 3.0% and 3.5% based on FDIC data, with community banks often achieving 3.5-4.5% and large banks running 2.0-3.0% due to differences in asset mix and funding structure',

    fullAnswer:
      'Net interest margin varies significantly by bank type, making it essential to benchmark against the right peer group rather than a single universal standard.\n\n' +
      'US commercial banks as a whole have historically averaged NIM between 3.0% and 3.5%, based on FDIC aggregate data. This average masks substantial variation. Community banks focused on relationship commercial lending and with strong core deposit franchises often achieve NIMs of 3.50-4.50%. Regional banks typically fall in the 3.00-3.75% range. Large money center banks, whose asset bases include more low-yield trading assets, wholesale lending, and investment securities, commonly report NIMs of 2.00-3.00%.\n\n' +
      'These differences reflect structural factors rather than management quality. A community bank in a market with limited competition can price loans at wider spreads and fund them with low-cost local deposits. A money center bank operating in competitive wholesale markets faces narrower lending spreads and more rate-sensitive funding. Comparing NIM across these bank types without accounting for the structural differences produces misleading conclusions.\n\n' +
      'Within a peer group of similar-sized banks in comparable markets, NIM differences are more meaningful. A bank with a 3.80% NIM versus a peer averaging 3.30% may have a stronger deposit franchise (more non-interest-bearing deposits), more disciplined loan pricing, a higher-yielding loan mix, or some combination. It may also be taking more credit risk through higher-yield loan categories. Checking asset quality metrics alongside NIM helps distinguish between productive spread management and excessive risk-taking.\n\n' +
      'The interest rate environment heavily influences NIM levels across the industry. Steep yield curves (where long-term rates significantly exceed short-term rates) favor wider NIMs because banks typically fund with short-duration deposits and lend at longer durations. Flat or inverted yield curves compress NIM even at well-managed banks. Rapidly rising rate environments create a transitional dynamic: deposit costs may lag initially (boosting NIM) but eventually catch up as competition for deposits intensifies and customers shift to higher-yielding products.\n\n' +
      'NIM should not be evaluated in isolation. A bank with a high NIM but a poor efficiency ratio may not translate its wide spread into bottom-line profitability. NIM combined with the efficiency ratio determines how much of the interest spread flows to net income. The product of these two factors drives ROAA more than either one alone.',

    relatedMetrics: ['net-interest-margin', 'efficiency-ratio', 'roaa', 'loans-to-deposits'],
    relatedValuations: ['peer-comparison-analysis'],
    relatedFaqs: ['what-causes-nim-to-change', 'why-nim-varies-across-banks', 'what-is-a-good-efficiency-ratio'],
    relatedGlossaryTerms: ['Net Interest Spread', 'Earning Assets', 'Core Deposits'],

    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Compare net interest margins across 300+ banks'
    },

    metaTitle: 'What Is a Good NIM for a Bank? | BankSift',
    metaDescription: 'Learn what constitutes a good net interest margin for banks by type, how the rate environment affects NIM, and how to benchmark against peers.'
  },

  // ───────────────────────────────────────────────
  // Q40: What causes NIM to change?
  // ───────────────────────────────────────────────
  {
    slug: 'what-causes-nim-to-change',
    question: 'What causes net interest margin to increase or decrease?',
    cluster: 'profitability',
    clusterName: 'Bank Profitability Metrics',
    intentType: 'conceptual',

    shortAnswer: 'NIM is driven by the interest rate environment and yield curve shape, the bank\'s asset and liability mix, deposit pricing competition, loan repricing dynamics, and management\'s asset-liability strategy',

    fullAnswer:
      'Net interest margin is determined by the spread between what a bank earns on its assets and what it pays on its liabilities, relative to earning assets. Multiple factors on both sides of the balance sheet influence this spread.\n\n' +
      'The interest rate environment and yield curve shape are the most powerful macro drivers. When the yield curve is steep (long-term rates well above short-term rates), banks benefit because they typically fund with short-duration deposits and lend at longer durations, earning a wider spread. When the curve flattens or inverts, this spread compresses. The absolute level of rates also matters: in a very low rate environment, deposit costs hit a floor near zero while asset yields continue to decline, compressing NIM from the asset side.\n\n' +
      'The pace and direction of rate changes create transitional effects. When rates rise, different parts of the balance sheet reprice at different speeds. Floating-rate loans reprice quickly, benefiting the asset side. Fixed-rate deposits and CDs reprice only at maturity, keeping liability costs low temporarily. This lag often causes NIM to widen initially during rising rate environments. Over time, as deposits mature and customers demand higher rates, the liability side catches up and the NIM benefit narrows or reverses. Banks with a higher proportion of floating-rate assets are more "asset-sensitive" and benefit more from rate increases in the short term.\n\n' +
      'Deposit mix and competition are critical liability-side factors. Banks with large non-interest-bearing deposit bases (checking accounts used for operating cash management) enjoy a structural NIM advantage because a significant portion of their funding carries zero interest cost. As competition for deposits intensifies, whether from other banks, money market funds, or Treasury bills, banks must raise deposit rates to retain funding, which compresses NIM. The shift of deposits from non-interest-bearing to interest-bearing categories (sometimes called deposit beta) is one of the most closely watched dynamics during rising rate periods.\n\n' +
      'On the asset side, loan mix determines the yield profile. Commercial real estate and consumer loans typically carry higher yields than residential mortgages or investment-grade securities. A bank that shifts its asset mix toward higher-yielding loans can expand NIM, though this often comes with higher credit risk. New loan origination rates, prepayment speeds on existing loans, and the reinvestment yield on maturing securities all affect the average yield on earning assets.\n\n' +
      'Management decisions around asset-liability duration matching, deposit pricing strategy, and loan growth targets are the controllable levers. Banks can choose to extend or shorten the duration of their securities portfolios, pursue or de-emphasize certain loan categories, and price deposits more or less aggressively, all of which influence NIM trajectory.',

    relatedMetrics: ['net-interest-margin', 'loans-to-deposits', 'deposits-to-assets'],
    relatedValuations: [],
    relatedFaqs: ['what-is-a-good-nim-for-banks', 'why-nim-varies-across-banks', 'rising-rates-and-nim'],
    relatedGlossaryTerms: ['Earning Assets', 'Cost of Funds', 'Cost of Deposits', 'Net Interest Spread'],

    cta: {
      type: 'learn-metric',
      target: '/metrics/net-interest-margin',
      text: 'Learn more about net interest margin and how it drives bank profitability'
    },

    metaTitle: 'What Causes NIM to Change? | BankSift',
    metaDescription: 'Understand what drives net interest margin higher or lower, from interest rate dynamics and yield curve shape to deposit competition and loan mix.'
  },

  // ───────────────────────────────────────────────
  // Q41: Why NIM varies across banks
  // ───────────────────────────────────────────────
  {
    slug: 'why-nim-varies-across-banks',
    question: 'Why do some banks have much higher NIMs than others?',
    cluster: 'profitability',
    clusterName: 'Bank Profitability Metrics',
    intentType: 'conceptual',

    shortAnswer: 'NIM differences across banks reflect variation in loan portfolio composition, deposit franchise strength, geographic market competition, bank size, and the tradeoff between yield and credit risk',

    fullAnswer:
      'Wide variation in NIM across banks is normal and reflects fundamental differences in business model, market position, and risk appetite.\n\n' +
      'Deposit franchise quality is often the largest structural driver. Banks with a high proportion of non-interest-bearing deposits (typically business operating accounts and personal checking accounts) have a portion of their funding that costs nothing. A bank funding 30% of its assets with non-interest-bearing deposits has a significant cost advantage over one funding only 10% with non-interest-bearing sources. This advantage flows directly into NIM. Building a strong non-interest-bearing deposit base is a function of customer relationships, branch presence, treasury management services, and market position built over decades, making it a durable competitive advantage.\n\n' +
      'Loan portfolio composition drives the asset yield side. Banks that focus on higher-yielding loan categories such as small business lending, commercial real estate, specialty finance, or consumer credit earn wider asset spreads. Banks focused on lower-yielding categories like prime residential mortgages, municipal lending, or large corporate credit earn narrower spreads. The tradeoff is risk: higher-yielding loans generally carry higher credit risk. A bank with a 4.50% NIM achieved through subprime consumer lending faces a different risk profile than one with a 3.50% NIM from investment-grade commercial loans.\n\n' +
      'Geographic market competition matters. Banks in markets with fewer competitors can price loans at wider spreads and pay depositors less, supporting wider NIM. Banks in intensely competitive metropolitan markets face pricing pressure on both sides of the balance sheet. Community banks in less competitive rural or suburban markets often show NIMs 50-100 basis points wider than urban competitors of similar size.\n\n' +
      'Bank size itself creates structural differences. Community banks tend to make smaller, relationship-priced loans that carry wider spreads. Large banks participate in larger, more competitively bid transactions where spreads are thinner. Large banks also hold more low-yield liquid assets (Fed reserves, government securities) to meet regulatory liquidity requirements, dragging down the average yield on earning assets.\n\n' +
      'When comparing NIM across banks, the most productive approach is to compare within a well-constructed peer group of similar size, geography, and business focus. NIM differences within such a group are more likely to reflect operational quality and franchise strength than structural factors.',

    relatedMetrics: ['net-interest-margin', 'loans-to-deposits', 'loans-to-assets', 'deposits-to-assets'],
    relatedValuations: ['peer-comparison-analysis'],
    relatedFaqs: ['what-is-a-good-nim-for-banks', 'what-causes-nim-to-change', 'wholesale-funding-vs-core-deposits'],
    relatedGlossaryTerms: ['Core Deposits', 'Earning Assets', 'Cost of Deposits'],

    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Sort and filter banks by NIM to compare across the industry'
    },

    metaTitle: 'Why Bank NIMs Vary Widely | BankSift',
    metaDescription: 'Understand why net interest margins differ across banks due to deposit franchise strength, loan mix, market competition, bank size, and risk appetite.'
  },

  // ───────────────────────────────────────────────
  // Q42: Comparing profitability across different size banks
  // ───────────────────────────────────────────────
  {
    slug: 'comparing-profitability-different-size-banks',
    question: 'How do I compare profitability across banks of different sizes?',
    cluster: 'profitability',
    clusterName: 'Bank Profitability Metrics',
    intentType: 'strategic',

    shortAnswer: 'Use ROAA as the primary comparison metric because it removes leverage and scale differences, supplement with efficiency ratio and NIM analysis, and construct peer groups that account for structural differences between bank size categories',

    fullAnswer:
      'Comparing profitability across banks of different sizes requires metrics and methods that account for the structural differences between a $500 million community bank and a $50 billion regional institution.\n\n' +
      'ROAA is the preferred starting point for cross-size comparison. Because ROAA measures net income relative to total assets, it removes the distortion that different capital levels introduce into ROE. A community bank with 11% equity-to-assets and a regional bank with 8% equity-to-assets can be compared fairly on ROAA because both are measured against their full asset bases. If the community bank shows ROAA of 1.25% and the regional bank shows 1.10%, the community bank is extracting more profit per dollar of assets regardless of its higher capital level.\n\n' +
      'ROE comparisons across size categories should be interpreted carefully. Larger banks tend to operate with lower equity-to-assets ratios, partly because diversification across geographies and business lines reduces risk, and partly because sophisticated capital management allows them to optimize leverage. This structural difference means larger banks can produce competitive ROE even with somewhat lower ROAA. Comparing ROE directly without adjusting for capital differences overstates the profitability advantage of more leveraged institutions.\n\n' +
      'NIM comparisons need size-context adjustments. Community banks structurally earn higher NIMs (often 3.5-4.5%) than large banks (2.0-3.0%) because they make smaller, higher-spread loans and fund with stickier core deposits. A community bank with 3.60% NIM is not outperforming a money center bank with 2.50% NIM; both may be performing well relative to their structural realities. Peer NIM comparisons are most meaningful within the same size category.\n\n' +
      'The efficiency ratio requires similar contextual awareness. Larger banks benefit from economies of scale that smaller banks cannot match, giving them structurally lower efficiency ratios. A 55% efficiency ratio at a $100 billion bank is a different achievement than 55% at a $500 million bank, where the latter reflects exceptional cost control given the inherent scale disadvantage.\n\n' +
      'The most reliable approach is multi-metric peer group analysis. Construct a peer group of 8-15 banks within a comparable asset size range (e.g., $1-3 billion) and geography. Compare ROAA, ROE, NIM, and efficiency ratio across the peer group. This controls for the structural factors that make cross-size comparisons unreliable and highlights genuine performance differences. Within a well-constructed peer group, the bank that ranks in the top quartile on ROAA, NIM, and efficiency ratio simultaneously is a strong candidate for further analysis.',

    relatedMetrics: ['roaa', 'roe', 'net-interest-margin', 'efficiency-ratio', 'equity-to-assets'],
    relatedValuations: ['peer-comparison-analysis'],
    relatedFaqs: ['roe-vs-roaa', 'what-is-a-good-roaa-for-banks', 'how-to-do-peer-comparison'],
    relatedGlossaryTerms: [],

    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Filter by total assets to build size-appropriate bank comparisons'
    },

    metaTitle: 'Comparing Bank Profitability by Size | BankSift',
    metaDescription: 'Learn how to compare profitability across banks of different sizes using ROAA, NIM context adjustments, and well-constructed peer groups.'
  },

  // ───────────────────────────────────────────────
  // Q43: DuPont decomposition for banks
  // ───────────────────────────────────────────────
  {
    slug: 'dupont-decomposition-for-banks',
    question: 'What is the DuPont decomposition and how does it apply to banks?',
    cluster: 'profitability',
    clusterName: 'Bank Profitability Metrics',
    intentType: 'procedural',

    shortAnswer: 'The DuPont decomposition breaks ROE into ROAA (asset productivity) multiplied by the equity multiplier (leverage), revealing whether a bank\'s return on equity is driven by genuine operating performance or by thin capitalization',

    fullAnswer:
      'The DuPont decomposition is an analytical framework that breaks return on equity into its component drivers, revealing the sources of a bank\'s profitability. For banks, the most useful form of the decomposition separates ROE into two factors: asset productivity and leverage.\n\n' +
      'The core formula is: ROE = ROAA multiplied by the equity multiplier. ROAA (return on average assets) measures how much net income the bank generates per dollar of assets. The equity multiplier (average total assets divided by average equity) measures how much leverage the bank employs. A bank with ROAA of 1.10% and an equity multiplier of 10x (equity-to-assets of 10%) produces ROE of 11.0%. The same ROAA with a 12.5x multiplier (equity-to-assets of 8%) produces ROE of 13.75%.\n\n' +
      'This decomposition immediately reveals whether a bank\'s ROE is driven by strong asset-level returns or by leverage. Two banks may both show 12% ROE, but the one achieving it with 1.20% ROAA and 10x leverage is in a fundamentally stronger position than the one achieving it with 0.90% ROAA and 13.3x leverage. The first bank has more room to absorb losses before equity is impaired.\n\n' +
      'ROAA can be further decomposed into its components to identify specific strengths and weaknesses. Net interest income divided by average assets reveals the contribution of the lending spread. Non-interest income divided by average assets shows the fee income contribution. Non-interest expense divided by average assets measures the cost burden. Provision for credit losses divided by average assets captures the credit cost. Each component can be benchmarked against peers to identify where a bank excels or underperforms.\n\n' +
      'In practice, the DuPont decomposition is used in three ways. First, it diagnoses the source of ROE changes over time. If a bank\'s ROE improved from 10% to 12%, did ROAA improve (better operations) or did the equity multiplier increase (more leverage or lower capital)? Second, it compares banks within a peer group. Ranking peers on ROAA, equity multiplier, and each ROAA sub-component identifies which banks have genuine operating advantages versus those that achieve returns primarily through leverage. Third, it informs valuation: the ROE-P/B framework uses ROE as an input, and understanding whether that ROE is durable (driven by strong ROAA) or fragile (driven by leverage) determines how much confidence to place in the justified P/B multiple.\n\n' +
      'For investors evaluating bank stocks, the DuPont decomposition transforms ROE from a single summary number into a diagnostic tool that reveals the quality and sustainability of a bank\'s returns.',

    relatedMetrics: ['roe', 'roaa', 'equity-to-assets', 'net-interest-margin', 'efficiency-ratio'],
    relatedValuations: ['roe-pb-framework'],
    relatedFaqs: ['roe-vs-roaa', 'can-roe-be-too-high', 'what-is-a-good-roe-for-banks'],
    relatedGlossaryTerms: ['DuPont Decomposition', 'Equity Multiplier'],

    cta: {
      type: 'learn-valuation',
      target: '/valuation/dupont-decomposition',
      text: 'Explore the DuPont decomposition framework for bank analysis'
    },

    metaTitle: 'DuPont Decomposition for Banks | BankSift',
    metaDescription: 'Learn how the DuPont decomposition breaks bank ROE into asset productivity and leverage, revealing the quality and sustainability of returns.'
  },

  // ───────────────────────────────────────────────
  // Q44: What is ROTCE?
  // ───────────────────────────────────────────────
  {
    slug: 'what-is-rotce',
    question: 'What is return on tangible common equity (ROTCE)?',
    cluster: 'profitability',
    clusterName: 'Bank Profitability Metrics',
    intentType: 'definitional',

    shortAnswer: 'ROTCE measures net income as a percentage of tangible common equity (total equity minus goodwill and intangible assets), providing a more conservative profitability view for banks that have accumulated intangible assets through acquisitions',

    fullAnswer:
      'Return on tangible common equity (ROTCE) is a variation of ROE that excludes goodwill and intangible assets from the equity denominator. The formula is: ROTCE = net income available to common shareholders divided by average tangible common equity, where tangible common equity equals total shareholders\' equity minus goodwill minus other intangible assets minus preferred stock.\n\n' +
      'ROTCE addresses a specific limitation of standard ROE. When a bank acquires another institution, it typically pays a premium above the target\'s book value. Under accounting rules, this premium is recorded as goodwill (and sometimes other intangible assets such as core deposit intangibles) on the acquirer\'s balance sheet. Goodwill inflates total equity without adding tangible loss-absorbing capacity. A bank that has grown through multiple acquisitions may carry billions in goodwill, making its stated equity (and therefore ROE) less representative of the return earned on real, tangible capital.\n\n' +
      'ROTCE strips out these intangible items, measuring the return generated on the tangible capital that could actually absorb losses. For banks with significant goodwill, ROTCE will be higher than ROE because the denominator is smaller. For banks with no or minimal goodwill (typically those that have grown organically), ROTCE and ROE will be nearly identical.\n\n' +
      'Large banks that have completed numerous acquisitions often report ROTCE as a key performance metric in their earnings releases and investor presentations, precisely because it provides a cleaner view of returns on deployed tangible capital. Analysts covering these banks frequently use ROTCE as the primary profitability measure and link it to price-to-tangible-book valuation (P/TBV = P/E multiplied by ROTCE).\n\n' +
      'ROTCE is most useful in two situations. First, when comparing banks where one has made significant acquisitions and the other has grown organically. Standard ROE comparisons would penalize the acquirer for its goodwill burden, while ROTCE provides a more level comparison of tangible capital productivity. Second, when valuing banks using price-to-tangible-book rather than price-to-book, ROTCE is the appropriate profitability input because the justified P/TBV multiple depends on the return earned on tangible equity, not total equity.\n\n' +
      'For community banks with little or no acquisition history and minimal intangible assets, ROTCE adds limited analytical value beyond standard ROE. For banks with goodwill representing more than 5-10% of total equity, ROTCE provides a meaningfully different and often more informative perspective on profitability.',

    relatedMetrics: ['roe', 'book-value-per-share', 'price-to-book'],
    relatedValuations: ['roe-pb-framework', 'peer-comparison-analysis'],
    relatedFaqs: ['tangible-book-value-vs-book-value', 'what-is-a-good-roe-for-banks', 'pb-vs-ptbv'],
    relatedGlossaryTerms: ['Return on Tangible Common Equity', 'Tangible Common Equity', 'Tangible Book Value'],

    cta: {
      type: 'learn-metric',
      target: '/metrics/return-on-tangible-common-equity',
      text: 'Learn more about ROTCE and how it compares to ROE'
    },

    metaTitle: 'What Is ROTCE? Bank Profitability | BankSift',
    metaDescription: 'Learn what return on tangible common equity (ROTCE) is, how it differs from ROE, and when it provides a better measure of bank profitability.'
  },

  // ───────────────────────────────────────────────
  // Q45: What is PPNR?
  // ───────────────────────────────────────────────
  {
    slug: 'what-is-ppnr',
    question: 'What is pre-provision net revenue (PPNR) and why do analysts use it?',
    cluster: 'profitability',
    clusterName: 'Bank Profitability Metrics',
    intentType: 'definitional',

    shortAnswer: 'PPNR equals net interest income plus non-interest income minus non-interest expense, measuring a bank\'s core earnings power before the volatile provision for credit losses, making it useful for evaluating sustainable profitability through the credit cycle',

    fullAnswer:
      'Pre-provision net revenue (PPNR) is a profitability measure that strips out the provision for credit losses from the income statement, isolating the bank\'s core operating earnings power. The formula is: PPNR = net interest income + non-interest income - non-interest expense.\n\n' +
      'The provision for credit losses is the most volatile line item on a bank\'s income statement. During benign credit environments, provisions can be minimal, flattering net income. During downturns, provisions can surge and consume a large share of revenue. This volatility makes net income (and therefore ROE and ROAA) a noisy signal of underlying operating strength. PPNR removes this noise by measuring revenue minus operating costs before the credit provision, revealing the bank\'s ability to generate earnings from its core lending and fee businesses regardless of the credit cycle position.\n\n' +
      'Bank analysts and regulators use PPNR for several important purposes. First, it measures core earnings power. A bank with strong PPNR has a large buffer of operating income available to absorb credit losses when they occur. If PPNR is $100 million and provisions in a normal year are $15 million, the bank has significant capacity to absorb a downturn scenario where provisions might rise to $40-50 million while still remaining profitable. PPNR provides the pre-loss earnings base against which credit costs are measured.\n\n' +
      'Second, PPNR is central to bank stress testing. The Federal Reserve\'s supervisory stress tests for large banks project PPNR under adverse and severely adverse economic scenarios to determine how much loss-absorbing capacity the bank has before credit losses are applied. The ability to generate strong PPNR under stress determines how much capital a bank needs to hold and how much it can distribute to shareholders.\n\n' +
      'Third, PPNR trend analysis reveals operational momentum. If a bank\'s PPNR is growing steadily through a combination of NIM expansion, fee income growth, and expense discipline, its core earnings engine is strengthening regardless of where provisions stand in any given quarter. Conversely, declining PPNR indicates weakening core operations even if net income is being supported by low provisions.\n\n' +
      'PPNR divided by average assets (PPNR/Assets) normalizes the measure for bank size and provides a comparable metric across institutions. This ratio indicates how many cents of pre-provision income the bank generates per dollar of assets, serving as a measure of the balance sheet\'s inherent earning capacity.\n\n' +
      'For investors, PPNR is most useful during periods when the credit cycle is turning. When provisions are rising and net income is declining, PPNR helps distinguish between banks whose core operations remain strong (high PPNR absorbing higher provisions) and those where both core earnings and credit quality are deteriorating simultaneously.',

    relatedMetrics: ['roe', 'roaa', 'net-interest-margin', 'efficiency-ratio'],
    relatedValuations: [],
    relatedFaqs: ['what-is-a-good-roe-for-banks', 'what-causes-nim-to-change', 'what-is-provision-for-credit-losses'],
    relatedGlossaryTerms: ['Pre-Provision Net Revenue', 'Provision for Credit Losses'],

    cta: {
      type: 'learn-metric',
      target: '/metrics/pre-provision-net-revenue',
      text: 'Learn more about PPNR and its role in bank analysis'
    },

    metaTitle: 'What Is PPNR? Pre-Provision Revenue | BankSift',
    metaDescription: 'Learn what pre-provision net revenue (PPNR) is, how it measures core bank earnings power, and why analysts use it to evaluate profitability through credit cycles.'
  },

];

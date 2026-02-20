// ============================================================================
// PHASE 2 / BATCH 2 — SUB-BATCH 4: NEW VALUATION METHODS (5 entries)
// ============================================================================
// Target file: src/data/content/valuations.js (append to VALUATION_METHODS array)
//
// Entries in this file:
//   price-to-tangible-book-valuation
//   excess-capital-return-model
//   discounted-earnings-model
//   gordon-growth-model
//   dupont-decomposition
//
// SLUG REFERENCE (for cross-link validation):
// -----------------------------------------------
// EXISTING VALUATION SLUGS:
//   graham-number, margin-of-safety, dividend-discount-model,
//   price-to-book-valuation, price-to-earnings-valuation,
//   peer-comparison, roe-pb-framework
//
// NEW VALUATION SLUGS (this sub-batch):
//   price-to-tangible-book-valuation, excess-capital-return-model,
//   discounted-earnings-model, gordon-growth-model, dupont-decomposition
//
// ALL METRIC SLUGS (existing + new, for relatedMethods cross-references):
//   EXISTING: roe, roaa, net-interest-margin, efficiency-ratio, price-to-book,
//     price-to-earnings, earnings-per-share, book-value-per-share,
//     equity-to-assets, loans-to-deposits, deposits-to-assets,
//     loans-to-assets, dividend-payout-ratio
//   NEW CAPITAL: cet1-capital-ratio, tier-1-capital-ratio, total-capital-ratio,
//     tier-1-leverage-ratio, supplementary-leverage-ratio,
//     tangible-common-equity-ratio, risk-weighted-assets-density
//   NEW ASSET QUALITY: non-performing-loans-ratio, non-performing-assets-ratio,
//     net-charge-off-ratio, loan-loss-reserve-ratio, reserve-coverage-ratio,
//     texas-ratio, provision-to-average-loans
//   NEW OTHER: return-on-tangible-common-equity, pre-provision-net-revenue,
//     net-overhead-ratio, price-to-tangible-book-value,
//     tangible-book-value-per-share, cost-of-funds, cost-of-deposits,
//     non-interest-income-to-revenue, interest-income-to-earning-assets
//
// FAQ SLUGS referenced in faqTeasers:
//   pb-vs-ptbv, when-to-use-ptbv, how-to-calculate-justified-pb,
//   roe-pb-framework-explained, intrinsic-value-for-banks,
//   dividend-discount-model-for-banks, how-to-tell-overvalued-undervalued,
//   why-bank-valuation-is-different, dupont-decomposition-for-banks,
//   what-happens-below-minimum-capital, roe-payout-ratio-dividend-growth
// ============================================================================

const NEW_VALUATION_METHODS = [
  // =========================================================================
  // 1. Price to Tangible Book Value Valuation
  // =========================================================================
  {
    slug: 'price-to-tangible-book-valuation',
    name: 'Price to Tangible Book Valuation',
    type: 'Relative Valuation Method',
    shortDescription: 'Values bank stocks by comparing market price to tangible book value per share, stripping out goodwill and intangibles for a more conservative asset-based valuation',
    description: 'Price to Tangible Book Valuation assesses whether a bank stock is fairly valued by comparing its market price to its tangible book value per share (TBVPS). This approach extends the standard P/B valuation framework by removing goodwill and other intangible assets from book value, providing a more conservative view of net asset value. The method is particularly useful for evaluating banks that have grown through acquisitions and carry significant goodwill, where standard P/B may overstate the tangible capital supporting the stock price.',
    formula: 'P/TBV = Market Price / TBVPS, where TBVPS = (Common Equity - Goodwill - Intangibles) / Shares Outstanding',
    isPercentage: false,
    formulaExplanation: 'The market price is the current share price. TBVPS is calculated by taking total common shareholders\' equity, subtracting goodwill and other intangible assets, and dividing by diluted shares outstanding. The resulting P/TBV multiple indicates how many dollars the market is paying for each dollar of tangible net asset value. A justified P/TBV can be derived from the formula: Justified P/TBV = (ROTCE - g) / (r - g), where ROTCE is return on tangible common equity, g is the sustainable growth rate, and r is the cost of equity.',
    steps: [
      'Calculate tangible book value per share by subtracting goodwill and other intangible assets from total common equity, then dividing by diluted shares outstanding. Verify the calculation against the bank\'s non-GAAP reconciliation if disclosed in the earnings release.',
      'Calculate the current P/TBV multiple by dividing the market price by TBVPS. Compare this to the bank\'s historical P/TBV range to assess whether the current valuation is above or below the bank\'s own typical multiple.',
      'Estimate the justified P/TBV using the formula (ROTCE - g) / (r - g). Use sustainable ROTCE (not a single quarter), estimate g from ROE times the retention ratio, and use a cost of equity between 10% and 13% depending on the bank\'s risk profile.',
      'Compare the current P/TBV to the justified P/TBV. If the current multiple is below the justified multiple, the stock may be undervalued. If above, it may be overvalued. Consider the range of reasonable assumptions for ROTCE, growth, and cost of equity rather than relying on a single point estimate.',
      'Compare the bank\'s P/TBV to peers with similar ROTCE levels. Plot P/TBV against ROTCE across a peer group to identify banks trading at discounts or premiums relative to their tangible profitability. Banks below the regression line may represent relative value opportunities.',
    ],
    example: 'A bank has total common equity of $5 billion, goodwill of $800 million, other intangibles of $200 million, and 100 million diluted shares outstanding. TBVPS = ($5B - $800M - $200M) / 100M = $40.00. If the stock trades at $52.00, the P/TBV is $52 / $40 = 1.30x. The bank\'s ROTCE is 14%, the estimated sustainable growth rate is 4%, and the cost of equity is 11%. Justified P/TBV = (14% - 4%) / (11% - 4%) = 10% / 7% = 1.43x. The current P/TBV of 1.30x is below the justified multiple of 1.43x, suggesting the stock may be modestly undervalued on a tangible book basis.',
    strengths: [
      'Strips out goodwill and intangibles that may have limited value in a stress scenario, providing a more conservative valuation anchor than standard P/B for banks with acquisition histories.',
      'Directly connects to ROTCE through the justified P/TBV framework, creating a theoretically grounded link between tangible profitability and tangible valuation.',
      'Serves as the standard valuation language for bank M&A, making P/TBV analysis directly applicable when evaluating potential acquisition targets or assessing deal pricing.',
      'Enables more meaningful peer comparisons for banks with very different acquisition histories by removing the distortion of varying goodwill levels from the valuation metric.',
    ],
    limitations: [
      'P/TBV adds no information beyond P/B for banks with minimal or no goodwill (organic growers, de novo banks, mutual-to-stock conversions). For these banks, P/B analysis is sufficient.',
      'TBVPS is a non-GAAP measure with no standardized definition. Different treatments of mortgage servicing rights, AOCI, deferred tax assets, and preferred stock can produce different TBVPS figures for the same bank, complicating cross-bank comparisons.',
      'The justified P/TBV formula requires estimating sustainable ROTCE, cost of equity, and growth rate, all of which involve significant uncertainty. Small changes in these inputs produce large changes in the justified multiple.',
      'TBVPS can be volatile due to AOCI movements (unrealized securities gains/losses), which can cause P/TBV to fluctuate even when the stock price and the bank\'s fundamentals are stable.',
      'Like P/B, the P/TBV approach assumes book values (even tangible ones) reasonably approximate economic values. If a bank\'s loan portfolio carries unrealized losses beyond what the allowance covers, tangible book value overstates true net asset value.',
    ],
    bankSpecific: 'P/TBV valuation is a natural extension of the P/B framework that has long been the primary valuation methodology for banks. As the banking industry consolidated through waves of M&A from the 1990s onward, goodwill balances grew substantially at many institutions. P/TBV emerged as the preferred metric because it separates the tangible franchise value from the accounting residue of past deal premiums. In bank M&A, acquirers evaluate targets on a P/TBV basis, and the premium-to-tangible-book is the standard measure of deal pricing. For equity analysts, the P/TBV-to-ROTCE scatter plot across a peer group is one of the most commonly used analytical frameworks for identifying relative value in bank stocks.',
    relatedMethods: ['price-to-book-valuation', 'roe-pb-framework', 'peer-comparison', 'price-to-earnings-valuation'],
    // NEW EXPANSION FIELDS:
    whenToUse: 'P/TBV valuation is most appropriate when evaluating banks that carry significant goodwill from acquisitions (typically mid-size and large regionals formed through consolidation). It is also the preferred valuation framework for M&A analysis, both for evaluating potential targets and for assessing the pricing of announced deals. P/TBV is less useful for banks with no goodwill, where it reduces to standard P/B analysis. For banks undergoing rapid goodwill impairment or with uncertain intangible asset values, P/TBV provides a more stable valuation anchor than P/B.',
    methodConnections: 'P/TBV is the tangible equivalent of P/B valuation, with the justified multiple driven by ROTCE instead of ROE: Justified P/TBV = (ROTCE - g) / (r - g) versus Justified P/B = (ROE - g) / (r - g). Both frameworks derive from the Gordon Growth Model applied to equity valuation. P/TBV = P/E x ROTCE, mirroring P/B = P/E x ROE. The Peer Comparison method frequently uses P/TBV-to-ROTCE regression as one of its primary valuation cross-checks. The Excess Capital Return Model complements P/TBV by focusing on whether the bank has capital above regulatory minimums that could be returned to shareholders, which affects the sustainable growth rate input in the justified P/TBV formula.',
    commonMistakes: 'The most common error is applying P/TBV analysis to banks with no goodwill, which adds complexity without incremental insight. Another frequent mistake is using trailing ROTCE without assessing whether it is sustainable; a bank that achieved 18% ROTCE due to reserve releases will not sustain that level once provisioning normalizes, and the justified P/TBV should use normalized ROTCE. Comparing P/TBV multiples across banks with very different ROTCE levels without adjusting for profitability differences is also misleading; a bank at 2.0x P/TBV with 20% ROTCE may be cheaper than one at 1.2x P/TBV with 8% ROTCE. Using the justified P/TBV framework or a P/TBV-to-ROTCE regression corrects this error.',
    acrossBankTypes: 'P/TBV is most differentiated from P/B for serial-acquirer regionals where goodwill may represent 15% to 30% of total equity. For these banks, P/TBV provides a meaningfully more conservative valuation picture. Money center banks carry substantial absolute goodwill but their large equity bases moderate the relative impact. Community banks that have grown organically show minimal P/TBV-to-P/B spread. In bank M&A, acquirers typically pay 1.3x to 2.0x tangible book for healthy community and regional banks, with the premium reflecting the franchise value of the target\'s deposit base, market position, and earnings power.',
    faqTeasers: [
      {
        question: 'What is the difference between price-to-book and price-to-tangible-book value?',
        teaser: 'P/B includes goodwill in book value, while P/TBV strips it out. For banks with significant acquisition history, P/TBV provides a more conservative valuation that focuses on hard tangible assets.',
        faqSlug: 'pb-vs-ptbv',
        faqCluster: 'valuation',
      },
      {
        question: 'When should I use P/TBV instead of P/B to value a bank?',
        teaser: 'P/TBV is preferred when the bank carries significant goodwill, when evaluating M&A pricing, or when comparing banks with very different acquisition histories.',
        faqSlug: 'when-to-use-ptbv',
        faqCluster: 'valuation',
      },
      {
        question: 'How do I determine the justified P/B multiple for a bank stock?',
        teaser: 'The justified multiple framework applies equally to P/B (using ROE) and P/TBV (using ROTCE), connecting profitability to fair valuation through a simple formula.',
        faqSlug: 'how-to-calculate-justified-pb',
        faqCluster: 'valuation',
      },
    ],
  },

  // =========================================================================
  // 2. Excess Capital Return Model
  // =========================================================================
  {
    slug: 'excess-capital-return-model',
    name: 'Excess Capital Return Model',
    type: 'Intrinsic Value Method',
    shortDescription: 'Values a bank by separating required regulatory capital from excess capital, estimating value from the returns generated on capital above regulatory minimums',
    description: 'The Excess Capital Return Model values a bank by dividing its capital into two components: the capital required to meet regulatory minimums (plus management buffers) and the excess capital above that threshold. Required capital is valued based on the earnings it generates (using a sustainable ROE or earnings multiple), while excess capital is valued at face value because it could theoretically be returned to shareholders through buybacks or special dividends. This approach is particularly useful for identifying banks with substantial excess capital that the market may not be fully pricing.',
    formula: 'Intrinsic Value = (Excess Capital) + (Required Capital x Sustainable ROE / Cost of Equity)',
    isPercentage: false,
    formulaExplanation: 'First, determine required capital. This is typically the CET1 ratio target (regulatory minimum plus management buffer, often 9% to 11% of RWA) translated to a dollar amount. Required Capital = Target CET1 Ratio x Risk-Weighted Assets. Excess Capital = Actual CET1 Capital - Required Capital. The value of required capital is estimated as a perpetuity: Required Capital x (Sustainable ROE / Cost of Equity). Excess capital is valued at 1.0x because it could be distributed immediately. Total intrinsic value per share = (Value of Required Capital + Excess Capital) / Shares Outstanding. Some versions of the model discount excess capital slightly below 1.0x to reflect uncertainty about the timing and form of capital return.',
    steps: [
      'Determine the bank\'s actual CET1 capital and CET1 ratio from regulatory disclosures. Also note risk-weighted assets, as these determine the required capital threshold.',
      'Estimate required capital by selecting a target CET1 ratio that includes regulatory minimums plus a management buffer. For most banks, a target between 9% and 11% is reasonable. Required Capital = Target CET1 Ratio x RWA. Calculate Excess Capital = Actual CET1 - Required Capital.',
      'Estimate sustainable ROE on required capital. Use normalized earnings (excluding one-time items and extraordinary provision levels) divided by required capital. Alternatively, use the bank\'s through-cycle average ROE as a proxy for sustainable returns on deployed capital.',
      'Value required capital as a perpetuity: Required Capital x (Sustainable ROE / Cost of Equity). Use a cost of equity between 10% and 13% depending on the bank\'s risk profile. Value excess capital at 1.0x (or a slight discount for timing uncertainty).',
      'Sum the two components and divide by shares outstanding to arrive at intrinsic value per share. Compare to the current market price to assess whether the stock is undervalued, fairly valued, or overvalued. Perform sensitivity analysis across a range of ROE, cost of equity, and target CET1 ratio assumptions.',
    ],
    example: 'A bank has CET1 capital of $10 billion, RWA of $80 billion (CET1 ratio of 12.5%), and 500 million shares outstanding. The management target CET1 ratio is 10%. Required Capital = 10% x $80B = $8 billion. Excess Capital = $10B - $8B = $2 billion. Sustainable ROE on required capital is estimated at 13%, and cost of equity is 11%. Value of required capital = $8B x (13% / 11%) = $9.45 billion. Total intrinsic value = $9.45B + $2.0B = $11.45 billion, or $22.91 per share. If the stock trades at $19.00, the model suggests approximately 20% upside, largely driven by the market undervaluing the excess capital component.',
    strengths: [
      'Explicitly captures the value of excess capital, which standard P/E or P/B analysis may overlook. Banks sitting on substantial excess capital represent hidden value if the capital will eventually be returned or deployed productively.',
      'Connects bank valuation directly to the regulatory capital framework, reflecting the reality that capital adequacy is a binding constraint on bank operations, dividends, and buybacks.',
      'Provides a clear framework for evaluating capital allocation decisions. The model shows the value impact of buybacks, special dividends, acquisitions, or organic growth funded by excess capital.',
      'Particularly useful for identifying undervalued banks that have built excess capital through strong earnings but have not yet announced capital return plans, or banks emerging from stressed periods with rebuilt capital buffers.',
    ],
    limitations: [
      'Determining the "right" target CET1 ratio is subjective. Different analysts may use different targets, producing significantly different excess capital estimates and intrinsic values. Regulatory requirements and management buffers vary by institution.',
      'The model assumes excess capital can actually be returned to shareholders, but regulatory restrictions, stress test results, and management preferences may prevent or delay capital returns. The time value of delayed capital return is not captured in the basic model.',
      'Sustainable ROE is difficult to estimate, particularly for banks in transitional periods (emerging from credit cycles, undergoing strategic shifts, or integrating acquisitions). Using historical ROE may not reflect future earning power.',
      'The model does not account for the growth optionality embedded in excess capital. A bank may retain excess capital to fund future loan growth or acquisitions, which could generate returns above cost of equity and create more value than returning the capital.',
      'Risk-weighted assets can change over time, altering the required capital calculation. A bank that appears to have excess capital today may need that capital if RWA increase through loan growth or regulatory methodology changes.',
    ],
    bankSpecific: 'The Excess Capital Return Model is uniquely suited to banking because banks operate under explicit regulatory capital requirements that define a minimum level of equity. This regulatory floor creates a natural division between "working" capital (earning returns through lending and investing) and "excess" capital (available for distribution or deployment). The model gained prominence after the 2008-2010 financial crisis as banks rebuilt capital well above regulatory minimums and investors sought to identify which banks had the most excess capital to return. The Federal Reserve\'s annual stress tests (CCAR/DFAST) effectively determine how much capital large banks can return, making the excess capital framework directly relevant to dividend and buyback capacity.',
    relatedMethods: ['price-to-book-valuation', 'price-to-tangible-book-valuation', 'roe-pb-framework', 'dividend-discount-model'],
    // NEW EXPANSION FIELDS:
    whenToUse: 'The Excess Capital Return Model is most useful when evaluating banks with CET1 ratios significantly above management targets or regulatory minimums, banks that have recently completed large capital raises or experienced sharp earnings recoveries that built capital, and banks where the market appears to be ignoring or undervaluing the excess capital component. It is less useful for banks operating near minimum capital levels (where there is no excess to value) or for banks with aggressive growth plans that intend to deploy excess capital into asset growth rather than returning it.',
    methodConnections: 'The Excess Capital Return Model complements the ROE-P/B framework by decomposing book value into required and excess components rather than treating it as a single block. The P/B approach implicitly values all equity through the ROE-to-cost-of-equity relationship, while the Excess Capital model values only the working portion this way and adds excess capital at face value. The Dividend Discount Model is related because excess capital determines dividend capacity. The Gordon Growth Model connects through the sustainable growth rate, which depends on how much capital is retained (required) versus distributed (excess).',
    commonMistakes: 'The most frequent error is using the current CET1 ratio as the sustainable level without considering the bank\'s growth plans, regulatory trajectory, or management targets. A bank with 14% CET1 that intends to grow assets aggressively may need most of that capital to support growth, leaving little true excess. Another common mistake is valuing excess capital at 1.0x without discounting for the time and uncertainty of capital return. If a bank is unlikely to return capital for several years (due to growth plans, regulatory constraints, or management reluctance), the present value of the excess capital is less than face value. Ignoring stress test implications is also problematic; a bank may appear to have excess capital based on reported ratios, but the Fed\'s stress capital buffer may effectively require a higher CET1 than the statutory minimum.',
    acrossBankTypes: 'Large banks subject to Fed stress tests are the natural application for this model because their capital return capacity is explicitly determined by CCAR results. Regional banks with strong capital positions and limited growth opportunities may also be good candidates, as they have both the excess capital and the potential willingness to return it. Community banks are less commonly analyzed with this model because their capital management is less formalized and their regulatory capital framework (particularly under CBLR) is simpler. Mutual holding companies and recently converted thrifts are sometimes evaluated with an excess capital framework because they may carry substantial capital from the conversion process.',
    faqTeasers: [
      {
        question: 'How do I tell if a bank stock is overvalued or undervalued?',
        teaser: 'Multiple valuation methods, including the Excess Capital Return Model, P/B, and earnings-based approaches, can be compared to provide a range of fair value estimates.',
        faqSlug: 'how-to-tell-overvalued-undervalued',
        faqCluster: 'valuation',
      },
      {
        question: 'What happens if a bank falls below minimum capital requirements?',
        teaser: 'Regulatory capital requirements define the floor that separates required capital from excess capital in the Excess Capital Return Model, making capital adequacy rules central to this valuation approach.',
        faqSlug: 'what-happens-below-minimum-capital',
        faqCluster: 'capital-and-risk',
      },
    ],
  },

  // =========================================================================
  // 3. Discounted Earnings Model
  // =========================================================================
  {
    slug: 'discounted-earnings-model',
    name: 'Discounted Earnings Model',
    type: 'Intrinsic Value Method',
    shortDescription: 'Estimates intrinsic value by discounting projected future earnings to present value, adapted for bank-specific considerations like provision normalization and capital-constrained growth',
    description: 'The Discounted Earnings Model estimates a bank\'s intrinsic value by projecting future earnings and discounting them to present value at the cost of equity. For banks, this approach is preferred over discounted cash flow (DCF) because free cash flow is not a meaningful concept for financial institutions; banks do not have capital expenditures in the traditional sense, and the distinction between operating and financing activities is blurred. Instead, earnings (or dividends, which for banks are constrained by regulatory capital requirements) serve as the proxy for value creation. The model typically projects earnings for 5 to 10 years and adds a terminal value.',
    formula: 'Intrinsic Value = Sum of [Projected Earnings_t / (1 + r)^t] + Terminal Value / (1 + r)^n',
    isPercentage: false,
    formulaExplanation: 'For each projected year t, estimate net income available to common shareholders. Discount each year\'s earnings by the cost of equity (r) raised to the power of the corresponding year. The terminal value is typically calculated using a terminal P/E multiple applied to the final projected year\'s earnings, or using the Gordon Growth formula: Terminal Value = Final Year Earnings x (1 + g) / (r - g), where g is the long-term sustainable growth rate. Sum the present values of all projected earnings and the terminal value. Divide by shares outstanding to get intrinsic value per share.',
    steps: [
      'Establish a base earnings level by normalizing the bank\'s most recent annual earnings. Adjust for unusual items such as outsized provision releases or charges, securities gains/losses, legal settlements, and restructuring costs. Pre-provision net revenue (PPNR) is a useful starting point, to which a normalized provision and tax rate are applied.',
      'Project earnings for 5 to 10 years. Key assumptions include loan growth rate (typically tied to nominal GDP growth or the bank\'s historical growth rate), NIM trajectory (considering the rate environment), fee income growth, expense growth (incorporating efficiency improvements), and provision normalization (returning to a through-cycle average provision-to-loan ratio).',
      'Apply capital constraints to growth projections. A bank cannot grow assets faster than its capital base unless it raises external equity. Sustainable asset growth is constrained by ROE x Retention Ratio / (Equity-to-Assets Ratio). If projected loan growth exceeds this, the bank will either need to raise capital or reduce its payout ratio.',
      'Select an appropriate cost of equity for discounting. For most banks, 10% to 13% is a reasonable range, depending on size, asset quality, earnings volatility, and systemic risk. Use the Capital Asset Pricing Model (CAPM) or build-up method to estimate if needed.',
      'Calculate terminal value using either a terminal P/E multiple (8x to 14x for banks, depending on quality) or the Gordon Growth formula with a long-term growth rate of 2% to 4%. Discount the terminal value and all projected earnings to present value. Sum the components and divide by shares outstanding.',
    ],
    example: 'A bank earned $500 million in the most recent year. After normalizing for an unusually low provision, normalized earnings are estimated at $450 million. Earnings are projected to grow at 5% annually for 5 years, producing projected earnings of $450M, $472.5M, $496.1M, $520.9M, and $547.0M. A terminal P/E of 10x is applied to Year 5 earnings: Terminal Value = $547M x 10 = $5.47 billion. Using a 12% cost of equity, the present value of the 5 years of earnings is approximately $1.74 billion, and the present value of the terminal value is approximately $3.10 billion. Total intrinsic value = $1.74B + $3.10B = $4.84 billion. With 200 million shares outstanding, intrinsic value per share is approximately $24.20.',
    strengths: [
      'Provides a forward-looking valuation that explicitly models the bank\'s future earnings trajectory, incorporating expected changes in NIM, credit costs, and growth rather than relying solely on current metrics.',
      'Allows explicit modeling of credit cycle dynamics. Earnings projections can incorporate a normalization of provisions from current levels to through-cycle averages, capturing value that point-in-time metrics like P/E may miss.',
      'Adaptable to different scenarios. Multiple earnings paths (base case, optimistic, pessimistic) can be modeled to produce a range of intrinsic values, helping investors understand the sensitivity of value to key assumptions.',
      'Incorporates capital constraints naturally. The projection of earnings growth can be bounded by the bank\'s ability to generate capital internally, reflecting the regulatory reality that capital adequacy limits growth.',
    ],
    limitations: [
      'Highly sensitive to assumptions about future NIM, credit costs, and growth. Small changes in these inputs compound over the projection period and can produce large changes in intrinsic value, particularly through the terminal value.',
      'Terminal value often represents 50% to 70% of total intrinsic value, meaning the valuation is heavily dependent on assumptions about long-term earnings power and the terminal multiple or growth rate. This reduces the precision of the model.',
      'Does not explicitly capture the value of excess capital (unlike the Excess Capital Return Model) unless the projection incorporates capital return assumptions. A bank with significant excess capital may be undervalued by a straight earnings projection if the excess capital is not factored in.',
      'Provision normalization is one of the most critical and subjective assumptions. Estimating the through-cycle provision rate requires judgment about future credit conditions, underwriting quality, and the loan mix. Using the wrong provision assumption can significantly distort the valuation.',
      'Free cash flow metrics used in industrial company DCF models are not applicable to banks. Substituting earnings for cash flow introduces conceptual imprecision because not all earnings are distributable (some must be retained to support growth and capital requirements).',
    ],
    bankSpecific: 'The Discounted Earnings Model is adapted specifically for banks because the standard DCF framework does not apply well to financial institutions. Banks do not have traditional capital expenditures, working capital cycles, or operating free cash flow in the industrial sense. Their primary "investment" is growing the loan book, which is funded by deposits and other liabilities rather than retained cash flow. Earnings (or distributable earnings, after capital retention) are the appropriate measure of value creation. The model must account for the regulatory capital constraint: a bank cannot grow earnings indefinitely without retaining sufficient capital, and dividend capacity is regulated. The provision for credit losses introduces cyclicality that must be normalized for the projection to reflect sustainable earnings power.',
    relatedMethods: ['dividend-discount-model', 'price-to-earnings-valuation', 'excess-capital-return-model', 'gordon-growth-model'],
    // NEW EXPANSION FIELDS:
    whenToUse: 'The Discounted Earnings Model is most appropriate when the bank\'s current earnings are significantly above or below normalized levels (making point-in-time P/E unreliable), when the bank is undergoing a strategic transformation that will change its earnings profile over time, or when building detailed scenario analyses to stress-test valuation under different credit cycle and rate environment assumptions. It is less useful for quick screening or when the bank\'s earnings are already at normalized levels and a simple P/E or P/B comparison is sufficient.',
    methodConnections: 'The Discounted Earnings Model is conceptually similar to the Dividend Discount Model, but uses total earnings rather than just dividends. If the retention ratio is applied to the earnings projection, the Discounted Earnings Model converges to the DDM. The Gordon Growth Model is a simplified single-stage version of the Discounted Earnings Model with constant growth. The terminal value in the Discounted Earnings Model is often calculated using the Gordon Growth formula or a terminal P/E multiple, directly connecting to those frameworks. The Excess Capital Return Model complements the Discounted Earnings approach by separately valuing capital above regulatory requirements.',
    commonMistakes: 'The most common error is projecting earnings growth without checking whether the bank has sufficient capital to support that growth. If projected asset growth requires the bank to retain most of its earnings, the effective distributable earnings (and therefore the value to shareholders) are lower than headline earnings suggest. Another frequent mistake is failing to normalize provisions; using a single year\'s provision as the basis for all projected years ignores the credit cycle and produces overly optimistic or pessimistic projections depending on where in the cycle the analysis begins. Applying industrial-company DCF mechanics (operating free cash flow, WACC discounting) to banks is a fundamental methodological error.',
    acrossBankTypes: 'The Discounted Earnings Model works across all bank types but requires different calibration. For large banks with stable, diversified earnings, the projection period can be shorter (5 years) because earnings are more predictable and the terminal value is more reliable. For community and regional banks with more concentrated portfolios and more volatile earnings, longer projection periods (7 to 10 years) may be needed to capture a full credit cycle. Banks in turnaround situations require particular care in projecting the trajectory from current (depressed) earnings back to normalized levels.',
    faqTeasers: [
      {
        question: 'What is intrinsic value and how do I estimate it for a bank?',
        teaser: 'The Discounted Earnings Model estimates intrinsic value by projecting future earnings and discounting them to present value, adapted for bank-specific dynamics like provision cycles and capital constraints.',
        faqSlug: 'intrinsic-value-for-banks',
        faqCluster: 'valuation',
      },
      {
        question: 'Why is bank valuation different from valuing other companies?',
        teaser: 'Banks require earnings-based or book-value-based models rather than traditional DCF because free cash flow is not a meaningful concept for financial institutions.',
        faqSlug: 'why-bank-valuation-is-different',
        faqCluster: 'valuation',
      },
    ],
  },

  // =========================================================================
  // 4. Gordon Growth Model (Bank Application)
  // =========================================================================
  {
    slug: 'gordon-growth-model',
    name: 'Gordon Growth Model (Bank Application)',
    type: 'Intrinsic Value Method',
    shortDescription: 'A simplified dividend discount model that values bank stocks using a constant growth rate, connecting dividend yield, ROE, and retention ratio to estimate fair value',
    description: 'The Gordon Growth Model (also called the Gordon Dividend Discount Model or constant-growth DDM) estimates the fair value of a stock as the next period\'s expected dividend divided by the difference between the cost of equity and the expected dividend growth rate. Applied to banks, the model connects directly to fundamental banking metrics: the sustainable growth rate equals ROE times the retention ratio, and the dividend equals EPS times the payout ratio. The model provides a straightforward closed-form valuation that is particularly useful for mature banks with stable dividend policies.',
    formula: 'P = D1 / (r - g), where D1 = EPS x Payout Ratio x (1 + g), r = Cost of Equity, g = ROE x Retention Ratio',
    isPercentage: false,
    formulaExplanation: 'D1 is the expected dividend per share in the next period, calculated as the current dividend grown by the sustainable growth rate (or as projected EPS times the target payout ratio). The cost of equity (r) is the required return for holding the stock, typically estimated at 10% to 13% for banks using CAPM or build-up approaches. The sustainable growth rate (g) equals ROE times the retention ratio (1 - payout ratio), representing the rate at which book value grows through retained earnings. The model assumes both the growth rate and cost of equity are constant forever, making it a perpetuity formula.',
    steps: [
      'Estimate sustainable ROE for the bank. Use a normalized, through-cycle ROE that reflects the bank\'s long-term earning power. For most US banks, sustainable ROE falls between 9% and 15% depending on the institution\'s profitability and capital structure.',
      'Determine the target payout ratio. Examine the bank\'s historical dividend payout ratio, management guidance on capital return, and regulatory constraints. Most US banks target payout ratios between 30% and 50% of earnings. Calculate the retention ratio as 1 minus the payout ratio.',
      'Calculate the sustainable growth rate: g = ROE x Retention Ratio. For example, a bank with 12% ROE and a 40% payout ratio has a sustainable growth rate of 12% x 60% = 7.2%. Verify that this growth rate is reasonable relative to nominal GDP growth and the bank\'s historical book value growth.',
      'Estimate the cost of equity. Use CAPM (Risk-Free Rate + Beta x Market Risk Premium) or a build-up method. For most banks, 10% to 13% is a reasonable range. The cost of equity must exceed the growth rate for the model to produce a positive, finite value.',
      'Calculate the intrinsic value: P = D1 / (r - g). D1 = Current DPS x (1 + g), or projected EPS x payout ratio. Divide the intrinsic value by the current price to assess the margin of safety. Perform sensitivity analysis across a range of ROE, payout ratio, and cost of equity assumptions.',
    ],
    example: 'A bank has EPS of $3.50, pays a $1.40 annual dividend (40% payout ratio), and has sustainable ROE of 12%. Retention ratio = 60%. Sustainable growth rate = 12% x 60% = 7.2%. Cost of equity = 11%. D1 = $1.40 x (1 + 7.2%) = $1.50. Intrinsic value = $1.50 / (11% - 7.2%) = $1.50 / 3.8% = $39.47. If the stock trades at $33.00, the model suggests approximately 20% upside. Note the sensitivity: if the cost of equity were 12% instead of 11%, intrinsic value falls to $1.50 / 4.8% = $31.25, and the stock appears fairly valued.',
    strengths: [
      'Provides a simple, closed-form valuation that connects directly to observable bank fundamentals: ROE, payout ratio, and cost of equity. No multi-year projection or complex modeling is required.',
      'Makes the relationship between profitability and value explicit. The model shows precisely how changes in ROE, payout, and cost of equity affect fair value, making it a powerful tool for sensitivity analysis.',
      'Naturally incorporates the capital constraint faced by banks. The sustainable growth rate (ROE x retention ratio) cannot be exceeded without raising external capital or reducing the capital ratio, reflecting regulatory reality.',
      'Useful for quick screening across a large number of bank stocks. By calculating the implied valuation for each bank using standardized assumptions, an investor can rapidly identify potential over- or under-valuations.',
    ],
    limitations: [
      'Assumes constant growth forever, which is unrealistic for any company. Banks go through credit cycles, rate environments, and strategic changes that cause growth and profitability to vary over time. The model works best for mature banks with stable fundamentals.',
      'Extremely sensitive to the gap between cost of equity (r) and growth rate (g). Because the denominator is (r - g), small changes in either input produce large swings in estimated value. A bank with g close to r produces an implausibly high valuation.',
      'Does not account for excess capital, one-time items, or changes in capital structure. A bank with substantial excess capital beyond what the model\'s growth rate requires is undervalued by the Gordon Growth Model because the excess capital is not captured.',
      'Requires that g < r for the formula to work. Banks with very high ROE and high retention ratios may produce sustainable growth rates that approach or exceed reasonable cost of equity estimates, making the model inapplicable without adjustment.',
      'Ignores the possibility that the bank\'s payout ratio or ROE will change over time. A bank that currently pays 30% of earnings but plans to increase to 50% as it reaches target capital levels will have a different valuation trajectory than the constant-payout model assumes.',
    ],
    bankSpecific: 'The Gordon Growth Model is particularly well-suited to bank valuation because the sustainable growth rate formula (ROE x retention ratio) maps directly to how banks actually grow. Banks grow book value through retained earnings; the portion of earnings not paid as dividends is retained and supports asset growth (through the leverage multiplier). Regulatory capital requirements constrain this growth: a bank cannot grow faster than its capital base supports without raising equity. The Gordon Growth Model captures this constraint naturally. For banks with stable ROE and dividend policies, the model produces reasonable valuations with minimal complexity. It also underpins the justified P/B and P/E frameworks: rearranging the Gordon formula shows that P/B = (ROE - g) / (r - g) and P/E = Payout / (r - g).',
    relatedMethods: ['dividend-discount-model', 'roe-pb-framework', 'discounted-earnings-model', 'price-to-book-valuation'],
    // NEW EXPANSION FIELDS:
    whenToUse: 'The Gordon Growth Model is best applied to mature, stable banks with consistent ROE, predictable dividend policies, and limited near-term disruptions to earnings or growth. It is ideal for quick valuation estimates and sensitivity analysis. It is less appropriate for banks in turnaround situations, banks with temporarily depressed or elevated earnings, banks planning significant capital structure changes, or high-growth banks where the constant-growth assumption does not hold. For banks with changing fundamentals, a multi-stage DDM or Discounted Earnings Model is more appropriate.',
    methodConnections: 'The Gordon Growth Model is a single-stage special case of the Dividend Discount Model, assuming constant growth. It directly underpins the justified P/B framework: rearranging P = D1 / (r - g) and substituting D1 = BV x ROE x Payout and g = ROE x (1 - Payout) yields P/B = (ROE - g) / (r - g). Similarly, P/E = Payout / (r - g). The model is also the formula used for terminal value in multi-stage Discounted Earnings Models and multi-stage DDMs. The Excess Capital Return Model complements the Gordon Growth Model by capturing value from capital above what the growth rate requires.',
    commonMistakes: 'The most critical error is using a growth rate too close to the cost of equity, which produces implausibly large valuations. The growth rate should be bounded by long-term nominal GDP growth (typically 4% to 5%) regardless of what ROE x retention ratio yields, because no bank can grow faster than the economy indefinitely. Another common mistake is using trailing ROE without assessing whether it is sustainable. If ROE is temporarily elevated (due to low provisions or one-time gains), the model will overvalue the stock. Using a normalized, through-cycle ROE is essential. Ignoring the sensitivity of the model to small input changes is also problematic; presenting a single point estimate without a range overstates the model\'s precision.',
    acrossBankTypes: 'The Gordon Growth Model works best for large, mature banks with stable dividend histories and predictable earnings. Money center banks, large regionals, and consistently profitable community banks are good candidates. It is less reliable for high-growth banks (where the constant-growth assumption breaks down), turnaround situations (where current metrics do not reflect future fundamentals), and banks with irregular dividend policies. For banks that return capital primarily through buybacks rather than dividends, the model may understate intrinsic value unless buybacks are incorporated into the payout ratio or a total shareholder yield framework is used.',
    faqTeasers: [
      {
        question: 'How does the dividend discount model work for bank stocks?',
        teaser: 'The Gordon Growth Model is the simplest form of dividend discount model, estimating fair value from the expected dividend, cost of equity, and sustainable growth rate derived from ROE and retention ratio.',
        faqSlug: 'dividend-discount-model-for-banks',
        faqCluster: 'valuation',
      },
      {
        question: 'What is the relationship between ROE, payout ratio, and dividend growth?',
        teaser: 'The Gordon Growth Model makes this relationship explicit: sustainable dividend growth equals ROE times the retention ratio, directly linking profitability to dividend growth capacity.',
        faqSlug: 'roe-payout-ratio-dividend-growth',
        faqCluster: 'dividends',
      },
    ],
  },

  // =========================================================================
  // 5. DuPont Decomposition for Banks
  // =========================================================================
  {
    slug: 'dupont-decomposition',
    name: 'DuPont Decomposition for Banks',
    type: 'Fundamental Valuation Framework',
    shortDescription: 'Breaks ROE into component drivers adapted for bank financial structure, revealing how profit margins, asset utilization, and leverage each contribute to return on equity',
    description: 'DuPont Decomposition for Banks breaks Return on Equity (ROE) into its component drivers to identify the sources of a bank\'s profitability. The standard three-factor DuPont identity (Profit Margin x Asset Turnover x Equity Multiplier) is adapted for banking because banks have fundamentally different financial structures than industrial companies. The decomposition reveals whether a bank\'s ROE is driven by operating efficiency (margin), productive use of assets (utilization), or financial leverage (equity multiplier), providing diagnostic insight that a single ROE figure cannot.',
    formula: 'ROE = Net Profit Margin x Asset Utilization x Equity Multiplier = (Net Income / Revenue) x (Revenue / Average Assets) x (Average Assets / Average Equity)',
    isPercentage: true,
    formulaExplanation: 'The three factors multiply together to produce ROE. Net Profit Margin equals net income divided by total revenue (net interest income plus non-interest income); it measures how much of each revenue dollar is retained as profit after expenses, provisions, and taxes. Asset Utilization equals total revenue divided by average total assets; it measures how much revenue the bank generates per dollar of assets. The Equity Multiplier equals average total assets divided by average equity; it measures financial leverage. A bank with 10x leverage (equity multiplier of 10) funds each dollar of equity with $10 of assets. The product of these three components always equals ROE.',
    steps: [
      'Calculate total revenue as net interest income plus non-interest income. Calculate Net Profit Margin = Net Income / Total Revenue. This captures the combined effect of the efficiency ratio, the provision-to-revenue ratio, and the tax rate. A higher margin indicates better cost control, lower credit costs, and/or more favorable tax treatment.',
      'Calculate Asset Utilization = Total Revenue / Average Total Assets. For banks, this ratio is typically much lower than for industrial companies because banks\' assets are primarily financial instruments (loans, securities) that generate interest income, not physical assets. Asset utilization for banks typically ranges from 3% to 6%.',
      'Calculate Equity Multiplier = Average Total Assets / Average Equity. This measures leverage. Banks are inherently leveraged; equity multipliers of 8x to 14x are typical, meaning banks fund each dollar of equity with $8 to $14 of assets. Higher leverage amplifies both returns and risks.',
      'Verify that Net Profit Margin x Asset Utilization x Equity Multiplier = ROE (within rounding). Then compare each component to peers and to the bank\'s own history to identify which factors are driving ROE above or below peers, and whether changes in ROE over time are driven by margin improvement, revenue generation, or leverage changes.',
      'For deeper analysis, decompose the profit margin further into its components: the efficiency ratio (non-interest expense / revenue), the provision-to-revenue ratio (provision / revenue), and the tax rate effect. This five-factor decomposition reveals whether margin changes are driven by expense control, credit costs, or tax rate changes.',
    ],
    example: 'Bank A has net income of $600 million, revenue of $3 billion, average assets of $60 billion, and average equity of $5 billion. Net Profit Margin = $600M / $3B = 20%. Asset Utilization = $3B / $60B = 5.0%. Equity Multiplier = $60B / $5B = 12x. ROE = 20% x 5.0% x 12 = 12.0%. Bank B has net income of $600M, revenue of $2.4B, average assets of $60B, and average equity of $5B. Net Profit Margin = $600M / $2.4B = 25%. Asset Utilization = $2.4B / $60B = 4.0%. Equity Multiplier = 12x. ROE = 25% x 4.0% x 12 = 12.0%. Both banks have 12% ROE, but Bank A generates more revenue per dollar of assets (higher utilization) while Bank B keeps more of each revenue dollar as profit (higher margin). This distinction has implications for sustainability and risk.',
    strengths: [
      'Transforms a single ROE number into a diagnostic framework that reveals the specific sources of profitability, enabling targeted comparisons across banks and identification of improvement opportunities.',
      'Highlights the leverage component of ROE explicitly. Two banks with identical ROE may have very different risk profiles if one achieves its ROE through higher margins and the other through higher leverage. The DuPont decomposition makes this visible.',
      'Enables trend analysis of ROE drivers over time. If a bank\'s ROE has improved from 10% to 13%, the decomposition reveals whether the improvement came from better margins (positive), higher revenue generation (positive), or increased leverage (potentially concerning).',
      'Provides a bridge between operational metrics (efficiency ratio, NIM, provision levels) and the headline profitability measure (ROE), helping investors understand the transmission mechanism from operations to returns.',
    ],
    limitations: [
      'The standard three-factor decomposition is somewhat coarse for banks. Revenue for a bank includes both net interest income and non-interest income, which have very different drivers and characteristics. Lumping them together in the utilization ratio obscures important distinctions.',
      'The equity multiplier component reflects both intentional leverage management and regulatory capital requirements. Banks cannot freely choose their leverage; capital requirements impose constraints. Interpreting high leverage as purely a management choice is inaccurate.',
      'DuPont Decomposition is a diagnostic tool, not a valuation method. It explains why ROE is at its current level but does not directly indicate whether the stock is over- or undervalued. It must be combined with a valuation framework (P/B, DDM, etc.) to reach investment conclusions.',
      'The decomposition treats all revenue and assets equally. It does not distinguish between high-quality, sustainable revenue and volatile or one-time revenue sources. A bank with temporarily inflated revenue from trading gains will appear to have higher asset utilization without a sustainable improvement.',
      'Cross-bank comparisons using DuPont components can be misleading if the banks have fundamentally different business models (e.g., comparing a money center bank with significant trading revenue to a community bank focused on relationship lending).',
    ],
    bankSpecific: 'DuPont Decomposition is particularly valuable for banks because bank ROE is driven by a unique combination of factors that differ fundamentally from industrial companies. Banks operate with much higher leverage (equity multipliers of 8x to 14x vs. 2x to 4x for most industrial companies), lower asset turnover (because their assets are financial instruments, not inventory or equipment), and profit margins that are heavily influenced by the provision for credit losses (an expense category that does not exist for non-financial companies). Understanding which DuPont component is driving a bank\'s ROE is essential for assessing the quality and sustainability of its profitability. A bank with strong ROE driven by margin and utilization is typically better positioned than one relying on leverage.',
    relatedMethods: ['roe-pb-framework', 'peer-comparison', 'price-to-book-valuation', 'price-to-tangible-book-valuation'],
    // NEW EXPANSION FIELDS:
    whenToUse: 'DuPont Decomposition should be applied whenever analyzing a bank\'s profitability in depth, comparing profitability across a peer group, or diagnosing changes in ROE over time. It is not a standalone valuation method but rather an analytical framework that informs valuation by revealing the quality of ROE. Use it alongside the ROE-P/B framework, Peer Comparison, or the justified P/B formula to connect DuPont-derived insights to valuation conclusions.',
    methodConnections: 'DuPont Decomposition is the analytical foundation for the ROE-P/B framework. The justified P/B multiple depends on sustainable ROE, and the DuPont decomposition reveals whether ROE is driven by sustainable factors (margin, utilization) or potentially unsustainable ones (leverage). The Peer Comparison method uses DuPont components to explain why banks deserve different multiples: a bank with higher ROE driven by superior margins deserves a higher P/B than one with the same ROE driven by higher leverage. The ROTCE variant of the DuPont decomposition (decomposing ROTCE into its components) connects to P/TBV valuation in the same way.',
    commonMistakes: 'The most common error is decomposing ROE and then focusing on only one component without considering the interactions between them. A declining equity multiplier (deleveraging) is not automatically negative if it reflects intentional capital building that positions the bank for future growth or capital return. Another frequent mistake is comparing DuPont components across banks with very different business models; the typical asset utilization for a community bank focused on lending is structurally different from a money center bank with significant non-interest income, and this difference does not indicate that one is better managed than the other. Failing to extend the decomposition beyond three factors misses important detail; breaking the profit margin into its expense, provision, and tax components provides much richer analytical insight.',
    acrossBankTypes: 'Community banks typically show higher asset utilization (4% to 6%) because their earning assets are primarily loans (which yield more than securities) and they have limited non-earning assets. Large banks show lower asset utilization (3% to 5%) because of larger securities portfolios and more non-earning assets. Equity multipliers tend to be higher at large banks (10x to 14x) than at well-capitalized community banks (8x to 10x). Profit margins vary based on efficiency, credit quality, and fee income levels across all bank types. The DuPont framework reveals these structural differences and helps investors compare profitability on a like-for-like basis.',
    faqTeasers: [
      {
        question: 'What is the DuPont decomposition and how does it apply to banks?',
        teaser: 'DuPont breaks ROE into profit margin, asset utilization, and leverage, revealing whether a bank\'s profitability comes from operating skill or financial structure.',
        faqSlug: 'dupont-decomposition-for-banks',
        faqCluster: 'profitability',
      },
      {
        question: 'What is the ROE-P/B valuation framework and how does it work?',
        teaser: 'The ROE-P/B framework connects profitability to valuation; DuPont Decomposition reveals the quality of the ROE that drives the justified P/B multiple.',
        faqSlug: 'roe-pb-framework-explained',
        faqCluster: 'valuation',
      },
    ],
  },
];

// ============================================================================
// CROSS-LINK MAP ENTRIES FOR prerender.mjs
// ============================================================================
// Add these entries to the VALUATION_TO_METRICS map in prerender.mjs.

const NEW_VALUATION_TO_METRICS_ENTRIES = {
  'price-to-tangible-book-valuation': [
    'price-to-tangible-book-value', 'tangible-book-value-per-share',
    'return-on-tangible-common-equity', 'tangible-common-equity-ratio',
    'price-to-book', 'book-value-per-share', 'roe', 'texas-ratio',
  ],
  'excess-capital-return-model': [
    'cet1-capital-ratio', 'tier-1-capital-ratio', 'tangible-common-equity-ratio',
    'roe', 'equity-to-assets', 'dividend-payout-ratio', 'risk-weighted-assets-density',
  ],
  'discounted-earnings-model': [
    'earnings-per-share', 'roe', 'roaa', 'net-interest-margin',
    'pre-provision-net-revenue', 'provision-to-average-loans',
    'non-performing-loans-ratio', 'net-charge-off-ratio', 'cost-of-funds',
  ],
  'gordon-growth-model': [
    'roe', 'dividend-payout-ratio', 'earnings-per-share',
    'book-value-per-share', 'price-to-book', 'price-to-earnings',
  ],
  'dupont-decomposition': [
    'roe', 'roaa', 'net-interest-margin', 'efficiency-ratio',
    'equity-to-assets', 'return-on-tangible-common-equity',
    'net-overhead-ratio', 'non-interest-income-to-revenue',
  ],
};

// Also update existing METRIC_TO_VALUATIONS entries in prerender.mjs
// to include these new valuation slugs where appropriate:
//
// Add 'dupont-decomposition' to:
//   roe, roaa, net-interest-margin, efficiency-ratio, equity-to-assets
//
// Add 'gordon-growth-model' to:
//   roe, dividend-payout-ratio, earnings-per-share, book-value-per-share,
//   price-to-book, price-to-earnings
//
// Add 'discounted-earnings-model' to:
//   earnings-per-share, roe, roaa, net-interest-margin
//
// Add 'excess-capital-return-model' to:
//   equity-to-assets, dividend-payout-ratio
//   (cet1, tier-1, tce already covered in sub-batch 1 cross-links)
//
// Add 'price-to-tangible-book-valuation' to:
//   price-to-book, book-value-per-share, roe
//   (p/tbv, tbvps, rotce, tce already covered in sub-batch 3 cross-links)

export { NEW_VALUATION_METHODS, NEW_VALUATION_TO_METRICS_ENTRIES };

/**
 * BankSift Content Expansion — Batch 1, Prompt 2
 * Expansion fields for all 7 existing valuation method entries.
 *
 * USAGE:
 *   For each valuation slug below, merge these fields into the corresponding
 *   entry in src/data/content/valuations.js. All existing fields remain unchanged.
 *
 * CONVENTIONS:
 *   - Plain text only (no HTML or Markdown)
 *   - Second/third person voice
 *   - No trailing period on shortAnswer / teaser fields
 *   - faqTeasers reference FAQ slugs defined in Section 8 of the strategy doc
 */

export const VALUATION_EXPANSION_FIELDS = {

  // ───────────────────────────────────────────────
  // 1. Graham Number
  // ───────────────────────────────────────────────
  'graham-number': {
    whenToUse:
      'The Graham Number is most appropriate as a quick screening filter rather than a definitive valuation. It works well for identifying bank stocks that may be trading below a conservative estimate of fair value based on both earnings power and asset backing. It is most useful when applied to banks with stable, predictable earnings and a book value that reasonably approximates net asset value. The method is less appropriate for banks with highly volatile earnings (e.g., those experiencing a credit cycle spike in provisions), banks with significant goodwill on the balance sheet (which inflates BVPS and therefore the Graham Number), or banks with negative or near-zero EPS. It should not be used as the sole valuation method for any investment decision; it is best paired with P/B, P/E, and ROE-based frameworks for a more complete picture.',

    methodConnections:
      'The Graham Number synthesizes information from both the P/E and P/B frameworks into a single figure. The formula, the square root of 22.5 multiplied by EPS multiplied by BVPS, implicitly assumes a maximum P/E of 15 and a maximum P/B of 1.5 (since 15 multiplied by 1.5 equals 22.5). Comparing the Graham Number to the current share price produces a margin of safety estimate: if the Graham Number exceeds the share price, the stock may be undervalued by Graham\'s criteria. The Graham Number is closely connected to the Margin of Safety concept, which quantifies the discount between market price and estimated intrinsic value. Because the Graham Number uses BVPS rather than TBVPS, banks with substantial goodwill from acquisitions may show an inflated Graham Number; the price-to-tangible-book valuation approach addresses this limitation.',

    commonMistakes:
      'Applying the Graham Number to banks with temporarily depressed EPS (due to elevated provisions or one-time charges) will produce an artificially low Graham Number that understates fair value. Conversely, applying it to banks with temporarily elevated EPS (due to reserve releases or one-time gains) will overstate fair value. Using basic EPS rather than diluted EPS inflates the result. Failing to account for goodwill in the BVPS input can significantly overstate the Graham Number for acquisition-heavy banks; investors should consider running the calculation with TBVPS as an alternative. Treating the Graham Number as a precise fair value target rather than a rough screening threshold leads to false precision. The 22.5 constant reflects Graham\'s original assumptions about maximum reasonable multiples, which may not hold in all interest rate and market environments.',

    acrossBankTypes:
      'The Graham Number tends to work best for community banks and smaller regional banks with straightforward balance sheets, stable earnings, and limited goodwill. These banks often have book values that closely approximate tangible net asset value and earnings that are driven primarily by lending rather than volatile trading or investment banking activities. For large money center banks with complex balance sheets, significant goodwill, and diverse revenue streams, the Graham Number is a less reliable indicator because BVPS may be materially inflated by intangibles and EPS may be influenced by non-core business lines. For banks that have recently completed mutual-to-stock conversions, the Graham Number may be unusually high relative to share price because these banks typically have excess capital (high BVPS) relative to their current earnings capacity.',

    faqTeasers: [
      {
        question: 'What is the Graham Number and how do I calculate it for bank stocks?',
        teaser: 'The Graham Number estimates a maximum fair price using both EPS and BVPS, applying Benjamin Graham\'s criteria that a stock should not trade above 15x earnings or 1.5x book value',
        faqSlug: 'graham-number-for-bank-stocks',
        faqCluster: 'valuation'
      },
      {
        question: 'How do I use the Graham Number to find undervalued bank stocks?',
        teaser: 'Banks trading below their Graham Number may represent value opportunities, though the calculation should be verified with stable earnings and adjusted for goodwill',
        faqSlug: 'how-to-use-graham-number',
        faqCluster: 'valuation'
      },
      {
        question: 'What is margin of safety and how do I apply it to bank stocks?',
        teaser: 'Margin of safety measures the discount between a bank\'s market price and its estimated intrinsic value, with the Graham Number providing one approach to estimating that intrinsic value',
        faqSlug: 'margin-of-safety-for-bank-stocks',
        faqCluster: 'valuation'
      }
    ]
  },

  // ───────────────────────────────────────────────
  // 2. Margin of Safety
  // ───────────────────────────────────────────────
  'margin-of-safety': {
    whenToUse:
      'The margin of safety concept applies to every bank stock valuation, regardless of the specific method used to estimate intrinsic value. It is most critical when the intrinsic value estimate carries significant uncertainty, as it does for banks with volatile earnings, concentration risk, or exposure to rapidly changing interest rate environments. Margin of safety is particularly important for bank stocks because bank balance sheets contain embedded risks (credit losses, interest rate risk, liquidity risk) that may not be fully visible in current financial statements. A wider margin of safety is appropriate for banks with asset quality concerns, high concentrations in cyclical loan categories, or less transparent financial disclosure. A narrower margin may be acceptable for banks with strong, consistent track records, diversified loan portfolios, and high capital levels.',

    methodConnections:
      'Margin of safety is not a standalone valuation method but a framework applied on top of any intrinsic value estimate. It pairs directly with the Graham Number (margin of safety = Graham Number minus market price, divided by Graham Number), the dividend discount model (margin of safety based on DDM fair value versus market price), the P/B valuation method (margin of safety when current P/B is below justified P/B), and the ROE-P/B framework (margin of safety when the market multiple is below the framework-derived justified multiple). The concept connects to the peer comparison method indirectly: if a bank trades at a significant discount to its peer group on multiple valuation metrics simultaneously, the discount itself may represent a margin of safety, though it could also reflect legitimate concerns the market is pricing in.',

    commonMistakes:
      'Anchoring to a single intrinsic value estimate and treating the margin of safety as a precise number rather than a range. Because all valuation methods produce estimates with inherent uncertainty, the margin of safety should be thought of as a buffer against estimation error, not an exact threshold. Using an insufficient margin of safety for banks with concentrated loan portfolios, weak capital positions, or opaque balance sheets. A 10% margin of safety may be adequate for a well-capitalized, diversified bank but insufficient for one with heavy commercial real estate concentration and thin reserves. Ignoring qualitative factors: the margin of safety should be wider when management quality is uncertain, regulatory risk is elevated, or the bank\'s markets are under economic stress. Confusing a low price with a margin of safety; a bank stock can be cheap and still not offer an adequate margin of safety if the intrinsic value estimate itself is unreliable or if fundamental deterioration is underway.',

    acrossBankTypes:
      'For well-capitalized community banks with stable earnings, diversified loan portfolios, and strong local deposit franchises, a margin of safety in the range of 15-25% below estimated intrinsic value is generally considered reasonable by value-oriented investors. For larger regional banks with more complex operations, a similar range applies, though the estimate itself may carry more uncertainty due to the complexity of the balance sheet. For money center banks with trading operations, significant off-balance-sheet exposures, and complex derivative portfolios, a wider margin of safety (25-35% or more) is prudent because the intrinsic value estimate carries greater uncertainty. For banks with known asset quality problems, pending regulatory actions, or strategic uncertainty, even wider margins may be warranted because the downside risk is harder to quantify.',

    faqTeasers: [
      {
        question: 'What is margin of safety and how do I apply it to bank stocks?',
        teaser: 'Margin of safety represents the discount between a bank\'s market price and its estimated intrinsic value, providing a buffer against estimation error and unforeseen risks',
        faqSlug: 'margin-of-safety-for-bank-stocks',
        faqCluster: 'valuation'
      },
      {
        question: 'How do I tell if a bank stock is overvalued or undervalued?',
        teaser: 'Combining multiple valuation methods and requiring a margin of safety across several approaches provides the most reliable assessment of whether a bank is mispriced',
        faqSlug: 'how-to-tell-overvalued-undervalued',
        faqCluster: 'valuation'
      }
    ]
  },

  // ───────────────────────────────────────────────
  // 3. Dividend Discount Model (DDM)
  // ───────────────────────────────────────────────
  'dividend-discount-model': {
    whenToUse:
      'The dividend discount model is most appropriate for banks with an established, consistent dividend payment history and a reasonably predictable earnings stream to support future dividends. It works well for mature community and regional banks that pay regular dividends and have stable payout ratios. The DDM is particularly well-suited to bank valuation because banks, as a group, are among the most reliable dividend payers in the equity market due to their stable cash flows from lending and fee income. The model is less appropriate for banks that do not pay dividends (such as de novo banks or banks rebuilding capital after losses), banks with highly erratic payout ratios, or high-growth banks where the majority of value comes from future reinvested earnings rather than near-term dividends. For banks subject to Federal Reserve stress testing, dividend projections should account for the possibility of regulatory restrictions on payouts.',

    methodConnections:
      'The DDM connects directly to the dividend payout ratio (which determines what share of earnings is paid as dividends), ROE (which drives earnings), and the sustainable growth rate (ROE multiplied by the retention ratio, which equals 1 minus the payout ratio). The Gordon Growth Model is a simplified form of the DDM that assumes a constant dividend growth rate in perpetuity (P = D1 / (r - g)), making it useful for banks with stable growth characteristics. The DDM framework links to the ROE-P/B framework through the sustainable growth rate: both models use ROE and the retention ratio to project future value creation. The DDM can also inform margin of safety analysis by comparing its fair value output to the current market price.',

    commonMistakes:
      'Overestimating the sustainable dividend growth rate is the most consequential error. Using historical dividend growth rates without checking whether those rates were supported by earnings growth (rather than payout ratio increases) leads to overly optimistic valuations. Failing to account for the regulatory dimension of bank dividends: the Federal Reserve and other regulators can restrict dividend payments, making bank dividend streams less certain than those of non-financial companies even when earnings are strong. Using an inappropriate discount rate (cost of equity): small-cap bank stocks generally require a higher discount rate than large-cap banks due to liquidity risk and size premiums. Projecting current period dividends without normalizing for the credit cycle; if provisions are abnormally low and earnings (and therefore dividends) are abnormally high, the DDM will overvalue the bank. Ignoring share buybacks as a form of capital return: a bank with a low payout ratio but aggressive buyback program may be returning more capital to shareholders than the DDM captures.',

    acrossBankTypes:
      'Community banks with stable local lending franchises and limited growth opportunities are often the best candidates for DDM analysis because their dividends tend to be predictable and the growth component is modest and sustainable. Regional banks with moderate growth profiles also lend themselves to DDM analysis, though the growth rate estimate carries more uncertainty due to the broader range of strategic options (organic growth, acquisitions, new market entry). Large money center banks are more challenging DDM candidates because their earnings mix includes volatile trading revenues, their capital return plans are subject to Federal Reserve stress test constraints, and the interplay between dividends and buybacks complicates the dividend projection. For all bank types, normalizing the starting dividend for the credit cycle position is important; using a mid-cycle or through-the-cycle earnings estimate to derive the initial dividend produces more reliable results.',

    faqTeasers: [
      {
        question: 'How does the dividend discount model work for bank stocks?',
        teaser: 'The DDM values a bank stock as the present value of all expected future dividends, making it well-suited to mature banks with consistent payout histories',
        faqSlug: 'dividend-discount-model-for-banks',
        faqCluster: 'valuation'
      },
      {
        question: 'What is the relationship between ROE, payout ratio, and dividend growth?',
        teaser: 'The sustainable dividend growth rate equals ROE multiplied by the retention ratio (1 minus the payout ratio), linking bank profitability directly to dividend growth potential',
        faqSlug: 'roe-payout-ratio-dividend-growth',
        faqCluster: 'dividends'
      },
      {
        question: 'What is the sustainable growth rate and how does it relate to bank dividends?',
        teaser: 'The sustainable growth rate represents how fast a bank can grow without raising external capital, determined by ROE and what portion of earnings is retained versus paid out',
        faqSlug: 'sustainable-growth-rate-and-dividends',
        faqCluster: 'dividends'
      }
    ]
  },

  // ───────────────────────────────────────────────
  // 4. P/B Valuation
  // ───────────────────────────────────────────────
  'price-to-book-valuation': {
    whenToUse:
      'Price-to-book valuation is the default starting point for most bank stock analysis and is appropriate for virtually all publicly traded banks. It is most reliable when book value is a reasonable approximation of net asset value, which is true for most banks because their balance sheets consist primarily of financial instruments carried near fair value. P/B valuation is strongest when used in conjunction with ROE analysis (via the ROE-P/B framework) to determine whether the current multiple is justified. It is less reliable for banks with significant held-to-maturity securities portfolios that may contain large unrealized losses not reflected in book value, banks with substantial goodwill from acquisitions (where price-to-tangible-book may be more appropriate), or banks facing potential asset quality problems that could require write-downs not yet reflected in the balance sheet.',

    methodConnections:
      'P/B valuation is directly linked to the ROE-P/B framework, which provides the theoretical basis for determining what P/B multiple a bank deserves based on its profitability. The justified P/B formula (justified P/B = (ROE - g) / (r - g)) makes the connection explicit: higher ROE supports a higher multiple. P/B valuation also connects to the Graham Number, which implicitly caps the P/B component at 1.5x. Comparing the current P/B to the justified P/B yields a margin of safety assessment. P/B and P/E are linked through ROE (P/B = P/E multiplied by ROE), so P/B valuation and P/E valuation should produce consistent signals; when they diverge, it often indicates temporary earnings distortion. For banks with acquisition-related goodwill, the price-to-tangible-book valuation method provides a complementary view by stripping out intangibles.',

    commonMistakes:
      'Treating all banks trading below book value (P/B under 1.0) as undervalued without investigating why the discount exists. Banks often trade below book for legitimate reasons: weak ROE that does not cover the cost of equity, deteriorating asset quality, management concerns, or market expectations of future losses. Comparing P/B ratios across banks without adjusting for differences in ROE is the most common analytical error; a bank with 14% ROE deserves a higher P/B than one with 7% ROE, and comparing their multiples directly leads to incorrect conclusions. Ignoring the composition of book value, particularly the proportion of intangible assets and the impact of AOCI fluctuations on stated equity. Using a single quarter\'s P/B without considering whether book value has been affected by unusual items, large AOCI swings, or recent capital transactions.',

    acrossBankTypes:
      'Community banks that are potential acquisition targets sometimes trade at P/B premiums reflecting expected takeover pricing, which can range from 1.3x to 2.0x book or higher depending on the deposit franchise value and market. Regional banks with strong ROE and growth profiles typically trade at 1.2-1.8x book. Large money center banks tend to trade in a wider range (0.8-2.0x) depending on the market\'s view of their complex balance sheets, regulatory environment, and return prospects. Banks that have recently completed mutual-to-stock conversions often trade well below book value (0.5-0.8x) in their early years, reflecting excess capital that has not yet been deployed into earning assets. This represents a distinct valuation dynamic rather than a signal of fundamental weakness.',

    faqTeasers: [
      {
        question: 'Why is price-to-book (P/B) the primary valuation metric for banks?',
        teaser: 'Bank balance sheets consist primarily of financial instruments carried near fair value, making book value a more meaningful measure of net asset value than for most other industries',
        faqSlug: 'why-pb-primary-bank-valuation',
        faqCluster: 'valuation'
      },
      {
        question: 'Does a P/B ratio below 1.0 always mean a bank is undervalued?',
        teaser: 'A P/B below 1.0 may reflect legitimate concerns about ROE, asset quality, or management rather than a mispricing opportunity',
        faqSlug: 'pb-below-one-undervalued',
        faqCluster: 'valuation'
      },
      {
        question: 'What is the difference between price-to-book and price-to-tangible-book value?',
        teaser: 'P/TBV strips out goodwill and intangible assets from book value, providing a more conservative view for banks that have grown through acquisitions',
        faqSlug: 'pb-vs-ptbv',
        faqCluster: 'valuation'
      }
    ]
  },

  // ───────────────────────────────────────────────
  // 5. P/E Valuation
  // ───────────────────────────────────────────────
  'price-to-earnings-valuation': {
    whenToUse:
      'P/E valuation is appropriate for banks with stable, normalized earnings and is most useful as a complement to P/B valuation rather than a standalone approach. It works best during periods of normal credit conditions when provisions for credit losses are at mid-cycle levels and net income reflects sustainable earning power. P/E is particularly useful for comparing banks within a peer group when all members are at a similar point in the credit cycle. It is less appropriate during periods of elevated credit losses (when depressed earnings inflate P/E ratios and make banks look expensive) or during periods of unusually benign credit (when low provisions flatter earnings and compress P/E, making banks look cheap). P/E should not be used for banks with negative earnings. For banks with highly volatile earnings, a normalized or mid-cycle P/E approach (using average earnings over a full credit cycle) is preferable to trailing P/E.',

    methodConnections:
      'P/E valuation connects to P/B valuation through the identity P/B = P/E multiplied by ROE. This relationship means P/E and P/B should tell a consistent story: if a bank appears cheap on P/E but expensive on P/B (or vice versa), the discrepancy usually reflects unusual earnings relative to book value. P/E also connects to the Graham Number, which implicitly caps the acceptable P/E at 15x. The reciprocal of P/E (E/P, or earnings yield) can be compared to bond yields or the cost of equity as a rough gauge of relative attractiveness. P/E valuation pairs naturally with the margin of safety concept: comparing the bank\'s P/E to its historical average, peer average, and the level implied by its growth rate reveals potential mispricings.',

    commonMistakes:
      'Using trailing P/E without considering the credit cycle position. A bank at the trough of a credit cycle will show a high trailing P/E because earnings are temporarily depressed by elevated provisions; this high P/E may actually represent a buying opportunity rather than overvaluation. Conversely, a bank at the peak of a benign credit cycle will show a low trailing P/E that may be deceptively cheap if provisions are about to normalize upward. Comparing P/E across banks with very different reserve policies: a bank that provisions conservatively (building reserves ahead of losses) will show lower earnings and a higher P/E than an equally healthy bank with leaner reserves. Ignoring one-time items that distort EPS: securities gains or losses, legal settlements, tax adjustments, and branch sale gains can all make a single period\'s P/E misleading. Fixating on P/E without checking whether the earnings level is sustainable by examining pre-provision net revenue, efficiency trends, and asset quality trajectories.',

    acrossBankTypes:
      'During normal earnings periods, US bank P/E ratios typically range from 8x to 15x based on aggregate market data. High-growth community and regional banks in attractive markets may command P/E ratios of 13-16x, reflecting expectations of above-average earnings growth. Large money center banks with diversified but more complex earnings streams often trade at 9-13x, reflecting both their size stability and the uncertainty around trading revenues and regulatory costs. Banks with limited analyst coverage (many community banks) may trade at a liquidity discount of 1-3 P/E turns below comparable covered banks. Banks with visible near-term catalysts (pending M&A, capital optimization programs, market expansion) may trade at premium P/E ratios reflecting expected earnings improvement.',

    faqTeasers: [
      {
        question: 'What is a good P/E ratio for a bank stock?',
        teaser: 'Bank P/E ratios typically range from 8x to 15x during normal earnings periods, but interpretation requires understanding the credit cycle context and earnings quality',
        faqSlug: 'what-is-a-good-pe-for-banks',
        faqCluster: 'valuation'
      },
      {
        question: 'Why can\'t I use EV/EBITDA to value a bank stock?',
        teaser: 'EV/EBITDA is designed for non-financial companies; banks\' core business of financial intermediation makes debt an operating item rather than a financing item, rendering the metric meaningless',
        faqSlug: 'why-not-ev-ebitda-for-banks',
        faqCluster: 'valuation'
      }
    ]
  },

  // ───────────────────────────────────────────────
  // 6. Peer Comparison Analysis
  // ───────────────────────────────────────────────
  'peer-comparison-analysis': {
    whenToUse:
      'Peer comparison is appropriate for virtually every bank stock analysis and is often the first step in evaluating whether a bank is fairly valued. It is most informative when the peer group is carefully constructed to include banks of similar size, geographic footprint, business mix, and growth profile. Peer comparison is essential when absolute valuation methods (DDM, Graham Number) produce results that seem disconnected from market reality, because it grounds the analysis in what the market is actually paying for comparable institutions. It is less useful when true peers are difficult to identify (e.g., for banks with highly unique business models or geographic monopolies) or when the entire peer group may be mispriced (as can happen during sector-wide bubbles or panics). Peer comparison should always be supplemented with fundamental analysis of the individual bank\'s intrinsic value.',

    methodConnections:
      'Peer comparison provides the market context that absolute valuation methods lack. A bank may appear undervalued by the Graham Number or DDM, but if it also trades at a premium to its peers on P/B, P/E, and other metrics, the absolute methods may be producing overly optimistic estimates. Peer comparison connects to every ratio-based valuation metric (P/B, P/E, P/TBV) and every profitability metric (ROE, ROAA, NIM, efficiency ratio) because the comparison is only meaningful when multiple dimensions are evaluated together. The ROE-P/B framework provides the theoretical basis for why peer banks with different ROEs should trade at different P/B multiples, transforming simple peer comparison from a crude ranking exercise into a structured analytical framework. Margin of safety can be assessed in a peer context: a bank trading at a significant discount to peers on multiple metrics simultaneously may offer a peer-relative margin of safety.',

    commonMistakes:
      'Constructing a peer group based solely on asset size without considering geographic market, business mix, loan composition, or funding structure. A $2 billion community bank in rural Iowa is not a meaningful peer for a $2 billion bank in suburban New Jersey, even though they are the same size. Comparing metrics across peers without adjusting for differences in business model: a bank with a large wealth management division will naturally have a different efficiency ratio and ROE profile than a pure commercial lender, and penalizing or rewarding it for these structural differences produces misleading conclusions. Treating the peer median as the "correct" valuation: the median may reflect market consensus rather than fundamental value, and the most attractive investments often trade at discounts to peer medians for reasons that fundamental analysis can evaluate. Ignoring the reason for a discount: a bank trading below its peers may have asset quality issues, management problems, or strategic challenges that fully justify the lower valuation.',

    acrossBankTypes:
      'Community bank peer groups are typically defined by asset size (e.g., $500 million to $2 billion), geographic region, and primary lending focus (commercial real estate, agricultural, residential mortgage). Peer groups of 8-15 banks generally provide the most useful comparisons. Regional bank peer groups may include banks in the same or adjacent states with comparable asset sizes and business lines. For large money center banks, the peer group is effectively defined by the small number of institutions that operate at similar scale and complexity (typically fewer than 10 globally). Some investors construct tiered peer groups: a primary group of 5-8 very close peers and a secondary group of 10-15 broader comparisons to test whether conclusions from the narrow group hold in a wider context.',

    faqTeasers: [
      {
        question: 'How do I do a peer comparison for bank stocks?',
        teaser: 'Effective peer comparison starts with selecting banks of similar size, geography, and business mix, then comparing profitability, efficiency, capital, and valuation metrics across the group',
        faqSlug: 'how-to-do-peer-comparison',
        faqCluster: 'valuation'
      },
      {
        question: 'How do I compare bank stocks side by side?',
        teaser: 'Side-by-side comparison requires evaluating multiple dimensions simultaneously, including ROE, ROAA, NIM, efficiency ratio, capital strength, asset quality, and valuation multiples',
        faqSlug: 'how-to-compare-bank-stocks',
        faqCluster: 'screening'
      },
      {
        question: 'How do I compare profitability across banks of different sizes?',
        teaser: 'ROAA is the preferred metric for cross-size profitability comparison because it removes leverage differences, unlike ROE which is heavily influenced by capital structure',
        faqSlug: 'comparing-profitability-different-size-banks',
        faqCluster: 'profitability'
      }
    ]
  },

  // ───────────────────────────────────────────────
  // 7. ROE-P/B Framework
  // ───────────────────────────────────────────────
  'roe-pb-framework': {
    whenToUse:
      'The ROE-P/B framework is the most theoretically grounded approach to bank valuation and is appropriate for any bank with a meaningful track record of profitability. It is the preferred method for determining whether a bank\'s current P/B multiple is justified by its fundamentals. The framework is most powerful when applied to banks with relatively stable ROE, because the justified P/B formula assumes a steady-state relationship between profitability and value. It is less reliable for banks with highly cyclical or volatile ROE, banks undergoing significant strategic transformation, or de novo banks that have not yet reached normalized profitability. For banks with ROE near or below the cost of equity, the framework correctly produces justified P/B multiples near or below 1.0, which some investors find counterintuitive but is economically sound.',

    methodConnections:
      'The ROE-P/B framework provides the theoretical foundation that connects P/B valuation to profitability analysis. The justified P/B formula, (ROE - g) / (r - g), is derived from the Gordon Growth Model applied to book value rather than dividends, linking this framework directly to the DDM family of models. The sustainable growth rate (g = ROE multiplied by the retention ratio) connects the framework to dividend payout ratio analysis: a bank\'s growth rate is constrained by how much of its ROE it retains. The framework also connects to the DuPont decomposition because understanding what drives ROE (asset productivity vs. leverage vs. margin) reveals whether the current ROE is sustainable and therefore whether the justified P/B is reliable. Peer comparison analysis is enhanced by the ROE-P/B framework, which transforms simple P/B comparisons into ROE-adjusted assessments of relative value.',

    commonMistakes:
      'Using a current-period ROE that reflects cyclical extremes rather than a normalized or through-the-cycle ROE. If a bank earned 15% ROE during a period of exceptionally low provisions, using that figure in the justified P/B formula will overestimate the appropriate multiple. Similarly, using trough-cycle ROE understates it. The cost of equity (r) estimate is the most subjective input and has a significant impact on the result; small changes in the assumed cost of equity (e.g., 9% vs. 11%) produce materially different justified P/B multiples. Using the risk-free rate plus a generic equity risk premium without adjusting for bank-specific risks (size, liquidity, concentration) understates the cost of equity for smaller or riskier banks. Ignoring the growth rate assumption: assuming zero growth simplifies the formula but undervalues banks that are retaining earnings and growing their franchises. Applying the framework mechanically without considering qualitative factors such as management quality, franchise value, and competitive positioning.',

    acrossBankTypes:
      'For well-run community banks with ROE of 10-13% and modest growth, the ROE-P/B framework typically produces justified multiples in the range of 1.0-1.5x book value, assuming a cost of equity of 10-12%. High-performing regional banks with ROE of 13-16% and stronger growth prospects may warrant justified multiples of 1.5-2.0x. Large money center banks present a more complex application because their cost of equity may be lower (due to perceived safety and liquidity) but their ROE may also be lower due to higher capital levels and complex operations, often producing justified multiples in the 1.0-1.5x range. The framework is particularly useful for identifying mispriced community banks: a bank earning 12% ROE with a cost of equity of 10% and a sustainable growth rate of 4% produces a justified P/B of approximately 1.33x; if the bank trades at 0.9x book, the framework highlights a potential valuation gap.',

    faqTeasers: [
      {
        question: 'What is the ROE-P/B valuation framework and how does it work?',
        teaser: 'The ROE-P/B framework derives the justified price-to-book multiple from a bank\'s return on equity, cost of equity, and sustainable growth rate, providing a fundamentals-based approach to bank valuation',
        faqSlug: 'roe-pb-framework-explained',
        faqCluster: 'valuation'
      },
      {
        question: 'How do I determine the justified P/B multiple for a bank stock?',
        teaser: 'The justified P/B equals (ROE minus growth rate) divided by (cost of equity minus growth rate), requiring estimates of normalized ROE, sustainable growth, and the appropriate discount rate',
        faqSlug: 'how-to-calculate-justified-pb',
        faqCluster: 'valuation'
      },
      {
        question: 'Why is ROE more important for banks than for other companies?',
        teaser: 'ROE determines the justified P/B multiple through the ROE-P/B framework, making it the single most important metric linking bank profitability to valuation',
        faqSlug: 'why-roe-important-for-banks',
        faqCluster: 'profitability'
      }
    ]
  },

};


// ─────────────────────────────────────────────────────────────────────────────
// CROSS-LINK MAP ENTRIES
// ─────────────────────────────────────────────────────────────────────────────
//
// These entries should be MERGED into the existing VALUATION_TO_METRICS and
// VALUATION_TO_METRIC_DESCRIPTIONS objects inside src/pages/ValuationDetail.jsx.
//
// Only NEW cross-links not already present in the codebase are listed here.
// Verify against the existing maps before inserting to avoid duplicates.
// ─────────────────────────────────────────────────────────────────────────────

export const NEW_VALUATION_TO_METRICS = {
  'graham-number': [
    'earnings-per-share',
    'book-value-per-share',
    'price-to-book',
    'price-to-earnings',
    // FUTURE (new metric pages in Batch 2):
    // 'tangible-book-value-per-share',
  ],

  'margin-of-safety': [
    'price-to-book',
    'price-to-earnings',
    'earnings-per-share',
    'book-value-per-share',
    'roe',
  ],

  'dividend-discount-model': [
    'dividend-payout-ratio',
    'roe',
    'earnings-per-share',
    'net-interest-margin',
    // FUTURE: 'cost-of-funds',
  ],

  'price-to-book-valuation': [
    'price-to-book',
    'book-value-per-share',
    'roe',
    'equity-to-assets',
    // FUTURE: 'tangible-book-value-per-share',
    // FUTURE: 'price-to-tangible-book-value',
  ],

  'price-to-earnings-valuation': [
    'price-to-earnings',
    'earnings-per-share',
    'roe',
    'price-to-book',
  ],

  'peer-comparison-analysis': [
    'roe',
    'roaa',
    'net-interest-margin',
    'efficiency-ratio',
    'price-to-book',
    'price-to-earnings',
    'equity-to-assets',
    'loans-to-deposits',
    'deposits-to-assets',
    'loans-to-assets',
    'dividend-payout-ratio',
  ],

  'roe-pb-framework': [
    'roe',
    'price-to-book',
    'equity-to-assets',
    'dividend-payout-ratio',
    'roaa',
    'book-value-per-share',
  ],
};


export const NEW_VALUATION_TO_METRIC_DESCRIPTIONS = {
  'graham-number': {
    'earnings-per-share': 'EPS is one of two required inputs to the Graham Number formula, representing the earnings power component of Graham\'s dual-factor intrinsic value estimate.',
    'book-value-per-share': 'BVPS is one of two required inputs to the Graham Number formula, representing the asset backing component that reflects the bank\'s tangible and intangible net worth per share.',
    'price-to-book': 'The Graham Number implicitly caps the acceptable P/B at 1.5x, connecting the Graham framework to price-to-book valuation analysis.',
    'price-to-earnings': 'The Graham Number implicitly caps the acceptable P/E at 15x, making the current P/E ratio a useful cross-check on whether the Graham Number estimate is reasonable.',
  },

  'margin-of-safety': {
    'price-to-book': 'P/B relative to the justified P/B multiple is one of the primary ways to assess margin of safety for bank stocks, with discounts to justified P/B indicating a potential buffer.',
    'price-to-earnings': 'Comparing the current P/E to historical, peer, and fundamentally justified levels helps quantify the margin of safety from an earnings-multiple perspective.',
    'earnings-per-share': 'Normalized EPS is a key input to intrinsic value estimates from which margin of safety is derived; using cyclically adjusted EPS produces more reliable safety margins.',
    'book-value-per-share': 'BVPS anchors the asset-based component of intrinsic value, and the gap between market price and BVPS-derived fair value contributes to the overall margin of safety assessment.',
    'roe': 'ROE determines the justified P/B multiple and therefore the intrinsic value estimate against which margin of safety is measured; higher sustainable ROE supports a smaller required margin of safety.',
  },

  'dividend-discount-model': {
    'dividend-payout-ratio': 'The payout ratio determines what share of earnings flows to shareholders as dividends, making it the most direct input linking a bank\'s earnings to the DDM\'s dividend projection.',
    'roe': 'ROE combined with the retention ratio determines the sustainable dividend growth rate, the critical growth input to multi-stage and Gordon Growth Model variants of the DDM.',
    'earnings-per-share': 'EPS drives the absolute level of dividends per share (EPS multiplied by payout ratio), establishing the starting point for DDM projections.',
    'net-interest-margin': 'NIM is the primary revenue driver for most banks and therefore the key determinant of the earnings capacity that supports future dividend payments.',
  },

  'price-to-book-valuation': {
    'price-to-book': 'The P/B ratio is the central metric in price-to-book valuation, comparing the market\'s assessment of a bank\'s equity to its accounting book value.',
    'book-value-per-share': 'BVPS provides the per-share denominator of the P/B ratio and serves as the anchor for determining whether the market price reflects a premium or discount to stated net asset value.',
    'roe': 'ROE is the primary determinant of what P/B multiple a bank deserves; the justified P/B formula links profitability directly to the appropriate price-to-book level.',
    'equity-to-assets': 'Equity-to-assets indicates leverage, which affects both ROE and the reliability of book value as a measure of net asset value, directly informing P/B valuation.',
  },

  'price-to-earnings-valuation': {
    'price-to-earnings': 'P/E is the central ratio in this valuation method, comparing the market price to per-share earnings to assess relative value.',
    'earnings-per-share': 'EPS is the denominator of the P/E ratio and the fundamental per-share measure of profitability that drives earnings-based valuation.',
    'roe': 'ROE connects P/E to P/B through the identity P/B = P/E multiplied by ROE, ensuring that P/E valuation conclusions are consistent with the bank\'s profitability profile.',
    'price-to-book': 'P/B and P/E should produce consistent valuation signals; when they diverge, the discrepancy often points to temporary earnings distortion that P/E valuation alone may miss.',
  },

  'peer-comparison-analysis': {
    'roe': 'ROE is a primary peer comparison metric, capturing both operating performance and leverage in a single figure that reveals which banks in a peer group generate the strongest returns.',
    'roaa': 'ROAA is the preferred peer comparison metric for profitability because it removes capital structure differences, allowing direct comparison of operating efficiency.',
    'net-interest-margin': 'NIM comparison across peers reveals differences in lending profitability, funding costs, and asset mix, identifying banks with structural advantages.',
    'efficiency-ratio': 'Efficiency ratio comparison highlights differences in cost management and operational productivity, distinguishing well-run banks from those with structural cost challenges.',
    'price-to-book': 'P/B is the primary valuation metric for peer comparison, with differences in P/B across peers ideally explained by corresponding differences in ROE and growth.',
    'price-to-earnings': 'P/E comparison across peers provides an earnings-based valuation perspective, complementing P/B analysis and helping identify banks with mispriced earnings.',
    'equity-to-assets': 'Equity-to-assets comparison reveals differences in capital levels and leverage across the peer group, providing context for interpreting ROE and P/B differences.',
    'loans-to-deposits': 'Loans-to-deposits comparison shows how aggressively each peer deploys its deposit base into lending, indicating differences in growth strategy and funding risk.',
    'deposits-to-assets': 'Deposits-to-assets comparison evaluates the funding structure stability across the peer group, identifying banks with stronger or weaker deposit franchises.',
    'loans-to-assets': 'Loans-to-assets comparison reveals differences in asset deployment strategy and credit risk appetite within the peer group.',
    'dividend-payout-ratio': 'Payout ratio comparison across peers indicates differences in capital return philosophy, growth reinvestment needs, and management confidence in earnings sustainability.',
  },

  'roe-pb-framework': {
    'roe': 'ROE is the central input to the ROE-P/B framework; the justified P/B multiple rises and falls directly with the bank\'s sustainable return on equity.',
    'price-to-book': 'The current P/B is compared against the framework\'s justified P/B to determine whether the bank trades at a premium, discount, or fair value relative to its profitability.',
    'equity-to-assets': 'Equity-to-assets determines the equity multiplier that links ROAA to ROE and therefore affects whether the ROE used in the framework reflects genuine earning power or primarily leverage.',
    'dividend-payout-ratio': 'The payout ratio determines the retention ratio, which drives the sustainable growth rate (g) used in the justified P/B formula: g = ROE multiplied by (1 minus payout ratio).',
    'roaa': 'ROAA combined with the equity multiplier produces ROE, making it useful for decomposing whether the ROE input to the framework reflects strong asset productivity or high leverage.',
    'book-value-per-share': 'BVPS growth rate reflects the compounding effect of retained earnings, and sustained BVPS growth validates the growth rate assumption used in the justified P/B calculation.',
  },
};

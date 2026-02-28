/**
 * Valuation Methods Content Data
 * Educational content for bank valuation methodologies
 * All content is original and copyright-free for commercial use
 */

export const VALUATION_METHODS = [
  {
    "slug": "graham-number",
    "name": "Graham Number",
    "type": "Intrinsic Value Method",
    "shortDescription": "A value investing formula developed by Benjamin Graham that estimates the maximum fair price for a stock based on its earnings per share and book value per share.",
    "description": "The Graham Number is a valuation formula from Benjamin Graham, widely regarded as the father of value investing and mentor to Warren Buffett. It calculates the maximum price a defensive investor should pay for a stock by combining two fundamental measures: earnings per share (EPS) and book value per share (BVPS). Graham believed that a conservatively priced stock should not trade at more than 15 times earnings or 1.5 times book value, and the formula distills both criteria into a single figure.\n\nWhat makes the Graham Number distinctive is that it anchors valuation to both earnings power and net asset backing simultaneously. Many valuation methods rely on just one of these dimensions — a P/E ratio focuses purely on earnings, while a P/B ratio focuses purely on assets. The Graham Number requires both to be reasonable, which creates a higher bar for a stock to pass and a more conservative estimate of fair value.\n\nFor bank stocks, this dual requirement is especially relevant. Banks are asset-heavy businesses where book value carries real economic meaning, and their earnings are tied closely to the spread between what they earn on loans and what they pay on deposits. The Graham Number captures both sides of a bank's value equation in a single, straightforward calculation.",
    "formula": "Graham Number = √(22.5 × EPS × BVPS)",
    "formulaExplanation": "The constant 22.5 comes from multiplying the maximum P/E ratio of 15 by the maximum P/B ratio of 1.5 (15 × 1.5 = 22.5). EPS is Earnings Per Share and BVPS is Book Value Per Share.",
    "steps": [
      "Calculate the trailing twelve-month diluted Earnings Per Share (EPS). Use diluted EPS rather than basic EPS to account for stock options and convertible securities that could increase the share count. Make sure the earnings figure reflects normalized, recurring operations — strip out one-time gains or losses like large provision releases or restructuring charges if they distort the trailing twelve-month figure.",
      "Calculate the Book Value Per Share (BVPS) from the most recent balance sheet. This is total shareholders' equity divided by diluted shares outstanding. For banks with significant goodwill from acquisitions, also note the tangible book value per share (TBVPS) so you can run the calculation both ways.",
      "Multiply EPS by BVPS, then multiply that product by 22.5. The 22.5 constant represents Graham's combined ceiling of 15 times earnings and 1.5 times book value (15 x 1.5 = 22.5). This step produces the value under the square root.",
      "Take the square root of the result. This final figure is the Graham Number — the maximum price Graham's framework suggests a defensive investor should pay for the stock.",
      "Compare the Graham Number to the current stock price. If the stock trades below the Graham Number, it passes Graham's screen. The wider the gap between the Graham Number and the market price, the larger the implied margin of safety."
    ],
    "example": "Consider a mid-sized regional bank with diluted EPS of $4.00 and BVPS of $40.00. The calculation: Graham Number = √(22.5 × $4.00 × $40.00) = √$3,600 = $60.00. If the stock currently trades at $48, the Graham Number exceeds the market price by $12, suggesting the stock passes Graham's conservative valuation screen with a 20% margin of safety.\n\nNow consider the same bank after a year of heavy loan loss provisions that temporarily pushed EPS down to $1.50 while BVPS remained at $39.00 (slightly reduced by the provision expense). The Graham Number drops to √(22.5 × $1.50 × $39.00) = √$1,316.25 = approximately $36.28. The stock might still trade at $44, now appearing overvalued by Graham's formula. But if those elevated provisions were a temporary response to a credit cycle and normalized earnings would return to $4.00, the depressed Graham Number is misleading. This illustrates why the earnings input must reflect sustainable, normalized earnings power rather than a single period's results.",
    "strengths": [
      "Produces a single, objective price ceiling grounded in two of the most fundamental financial measures — earnings and net asset value. There is no subjective forecasting or growth rate assumption required.",
      "Combines earnings power and asset value into one figure, capturing both dimensions that matter for bank valuation. A bank can look cheap on earnings alone (low P/E) while having a weak balance sheet, or vice versa — the Graham Number flags only stocks that pass both tests.",
      "The calculation is simple enough to run on a calculator or spreadsheet in seconds, making it practical as a screening tool across dozens or hundreds of bank stocks.",
      "Based on Benjamin Graham's investment philosophy, which has produced strong long-term track records among investors who follow its principles. The conceptual framework behind the formula — buying assets and earnings at conservative multiples — has held up across many market cycles."
    ],
    "limitations": [
      "Ignores growth entirely. A bank expanding earnings at 12% per year and one with flat earnings get the same Graham Number if their current EPS and BVPS match. High-quality growth banks will almost always appear overvalued by this measure.",
      "The 22.5 constant bakes in assumptions about reasonable P/E and P/B multiples that originated in the mid-twentieth century. In prolonged low-interest-rate environments, for example, market multiples often expand well beyond 15x earnings, which can make the Graham Number overly conservative for extended periods.",
      "Requires both positive earnings and positive book value. A bank reporting a net loss produces an undefined Graham Number (you cannot take the square root of a negative product), making the formula inapplicable precisely when valuation questions are most pressing.",
      "Does not differentiate between the quality of earnings or the composition of book value. A dollar of EPS from stable net interest income and a dollar from volatile trading gains are treated identically. Similarly, BVPS inflated by goodwill from overpriced acquisitions inflates the Graham Number without reflecting actual tangible asset backing.",
      "Provides no information about the trajectory of the business. Two banks with identical EPS and BVPS could be heading in opposite directions — one improving its asset quality and growing deposits, the other seeing rising charge-offs and deposit outflows. The Graham Number is a snapshot, not a trend indicator."
    ],
    "bankSpecific": "The Graham Number fits bank valuation better than most sectors because banks are fundamentally valued on both earnings and book value. Unlike technology or consumer companies where book value may have little relationship to the business's worth, a bank's book value represents its net equity backing real financial assets — loans, securities, and cash. The P/B component of the Graham Number, which caps valuation at 1.5 times book, is directly relevant to an industry where analysts and acquirers routinely price banks as a multiple of book value.\n\nThe earnings component is equally natural for banks. Bank earnings are relatively predictable in normal environments because they stem primarily from net interest margin (NIM) — the spread between rates earned on loans and rates paid on deposits. This predictability makes the P/E ceiling of 15 times earnings a reasonable anchor, though bank earnings can become volatile during credit cycles when provision expenses spike.\n\nThere are important caveats specific to banking. First, the BVPS figure for banks with significant acquisition histories may include substantial goodwill, which inflates the Graham Number beyond what tangible assets support. Running the calculation with tangible book value per share (TBVPS) alongside BVPS gives a more grounded result. Second, bank earnings can swing dramatically with the credit cycle — provisions for loan losses can cut EPS in half during downturns and then fall away during recoveries, producing wide swings in the Graham Number that reflect cyclical conditions rather than fundamental value changes. Third, regulatory capital requirements mean that bank book value serves a specific function beyond what it represents in other industries: it is the buffer that regulators require banks to hold against potential losses. A bank trading below book value is trading below its regulatory capital cushion, which carries different implications than a manufacturer trading below book value.",
    "whenToUse": "The Graham Number works best as a quick screening filter rather than a definitive valuation. It is well-suited for identifying bank stocks that may be trading below a conservative estimate of fair value based on both earnings power and asset backing.\n\nThe method is most useful when applied to banks with stable, predictable earnings and a book value that reasonably approximates tangible net asset value. Community banks and straightforward regional banks with minimal goodwill and consistent lending-driven earnings are the strongest candidates.\n\nThe method is less appropriate for several categories of banks:\n\n- Banks with highly volatile earnings, such as those experiencing a credit cycle spike in loan loss provisions\n\n- Banks with significant goodwill on the balance sheet, which inflates BVPS and therefore the Graham Number\n\n- Banks with negative or near-zero EPS, which produce an undefined or extremely low Graham Number\n\n- Large money center banks with diverse revenue streams from trading, investment banking, and wealth management, where the simplicity of the formula misses important value drivers\n\nThe Graham Number should not be used as the sole valuation method for any investment decision. It is best paired with P/B, P/E, ROE-based frameworks, and tangible book value analysis for a more complete picture.",
    "methodConnections": "The Graham Number bridges P/E and P/B analysis by combining both into a single figure. The formula — the square root of 22.5 multiplied by EPS multiplied by BVPS — implicitly caps the P/E ratio at 15 and the P/B ratio at 1.5 (since 15 x 1.5 = 22.5). When the Graham Number exceeds a bank's stock price, the stock satisfies both of Graham's valuation ceilings simultaneously.\n\nThis direct link to P/E and P/B means the Graham Number often confirms or contradicts what those individual ratio analyses suggest. A bank might trade at just 10 times earnings (below the P/E ceiling) but 2.0 times book value (above the P/B ceiling) — the Graham Number will reflect this imbalance and may still exceed the stock price if the earnings-side margin is wide enough. Understanding which side of the formula is doing the heavy lifting helps interpret the result.\n\nThe Graham Number is closely tied to the Margin of Safety concept. Comparing the Graham Number to the current share price directly produces a margin of safety percentage: (Graham Number - Price) / Graham Number. Graham himself advocated for purchasing stocks only when this margin was substantial — typically 20% or more — to provide a buffer against estimation errors.\n\nBecause the formula uses reported BVPS rather than tangible book value per share (TBVPS), the price-to-tangible-book valuation approach serves as an important complement. Banks with large goodwill balances will show a higher Graham Number than their tangible asset base warrants. Running the formula with TBVPS instead of BVPS produces a more conservative, tangible-asset-grounded figure that some analysts prefer.",
    "commonMistakes": "The most frequent mistake is applying the Graham Number to banks with temporarily distorted earnings. Using EPS from a period of elevated provision expenses — common during credit downturns — produces an artificially low Graham Number that understates the bank's fair value. The reverse is equally problematic: EPS inflated by reserve releases or one-time gains overstates fair value. The earnings input should reflect normalized, through-the-cycle earnings power, not a single quarter or year that may be anomalous.\n\nUsing basic EPS rather than diluted EPS is another common error. Basic EPS ignores potentially dilutive securities like stock options and convertible instruments, which inflates the earnings figure and produces an overstated Graham Number.\n\nFailing to account for goodwill in the BVPS input is a significant issue for acquisition-heavy banks. A bank that has grown through multiple acquisitions may carry billions in goodwill that inflates its reported BVPS well above its tangible book value. Running the calculation exclusively with reported BVPS overstates the Graham Number for these banks. Investors should run the formula with both BVPS and TBVPS to see how sensitive the result is to intangible assets.\n\nPerhaps the most consequential mistake is treating the Graham Number as a precise fair value target. It is a rough screening threshold that indicates whether a stock falls within Graham's conservative valuation parameters. It was never intended to pinpoint exactly what a stock is worth, and investors who anchor too heavily on the specific dollar figure risk false precision.",
    "acrossBankTypes": "The Graham Number tends to be most reliable for community banks and smaller regional banks with clean, straightforward balance sheets. These banks typically have minimal goodwill, stable earnings driven by traditional lending and deposit-gathering, and book values that closely approximate tangible net asset value. For a $500 million community bank earning $3.50 per share with BVPS of $35.00, the Graham Number produces a meaningful benchmark because both inputs accurately represent the bank's economic reality.\n\nMid-sized regional banks present a mixed picture. Those that have grown organically tend to produce reliable Graham Numbers, while those that have grown through acquisitions may carry enough goodwill to meaningfully distort BVPS. For regional banks in the $5 billion to $50 billion asset range, it is worth calculating the Graham Number with both BVPS and TBVPS — if the two figures diverge significantly, the TBVPS-based calculation is the more conservative and likely more useful figure.\n\nLarge money center banks and banks with diversified business models are the poorest fit for the Graham Number. Their earnings mix includes trading revenue, investment banking fees, wealth management income, and other sources that may be volatile or unrelated to the balance sheet assets backing BVPS. Their book values often include substantial intangible assets. And their complexity means that a formula combining just EPS and BVPS captures only a fraction of the relevant valuation picture.\n\nBanks that have recently completed mutual-to-stock conversions represent a special case. These institutions typically emerge with excess capital — high BVPS relative to current earnings — because the conversion proceeds inflate equity. The Graham Number for these banks may appear very high relative to their stock price, which can look like a strong buy signal. In reality, the high BVPS reflects overcapitalization rather than deep value, and the bank will need time to deploy that capital into earning assets before EPS catches up to support the elevated book value.",
    "faqTeasers": [
      {
        "question": "What is the Graham Number and how do I calculate it for bank stocks?",
        "teaser": "The Graham Number estimates a maximum fair price using both EPS and BVPS, applying Benjamin Graham's criteria that a stock should not trade above 15x earnings or 1.5x book value",
        "faqSlug": "graham-number-for-bank-stocks",
        "faqCluster": "valuation"
      },
      {
        "question": "How do I use the Graham Number to find undervalued bank stocks?",
        "teaser": "Banks trading below their Graham Number may represent value opportunities, though the calculation should be verified with stable earnings and adjusted for goodwill",
        "faqSlug": "how-to-use-graham-number",
        "faqCluster": "valuation"
      },
      {
        "question": "What is margin of safety and how do I apply it to bank stocks?",
        "teaser": "Margin of safety measures the discount between a bank's market price and its estimated intrinsic value, with the Graham Number providing one approach to estimating that intrinsic value",
        "faqSlug": "margin-of-safety-for-bank-stocks",
        "faqCluster": "valuation"
      },
      {
        "question": "How do I determine the intrinsic value of a bank stock?",
        "teaser": "The Graham Number is one of several methods for estimating a bank's intrinsic value, combining earnings per share and book value per share into a conservative fair price ceiling",
        "faqSlug": "intrinsic-value-for-banks",
        "faqCluster": "valuation"
      }
    ],
    "relatedMethods": [
      "margin-of-safety",
      "price-to-book-valuation",
      "price-to-earnings-valuation",
      "price-to-tangible-book-valuation"
    ],
    "relatedMetrics": [
      "earnings-per-share",
      "book-value-per-share",
      "price-to-book",
      "price-to-earnings",
      "tangible-book-value-per-share",
      "roe"
    ]
  },
  {
    "slug": "margin-of-safety",
    "name": "Margin of Safety",
    "type": "Risk Management Concept",
    "shortDescription": "The discount between intrinsic value and purchase price that provides a buffer against errors.",
    "description": "Margin of Safety is a core principle of value investing that suggests buying securities only when their market price is significantly below their intrinsic value. This gap provides protection against analytical errors, unforeseen events, and market volatility. The concept was central to Benjamin Graham's investment philosophy.",
    "formula": "Margin of Safety = (Intrinsic Value - Current Price) / Intrinsic Value",
    "isPercentage": true,
    "formulaExplanation": "Intrinsic Value can be calculated using various methods such as the Graham Number. The margin represents how much cushion exists between your purchase price and estimated fair value.",
    "steps": [
      "Estimate the intrinsic value using your preferred method (Graham Number, DCF, etc.).",
      "Compare the intrinsic value to the current market price.",
      "Calculate the percentage difference.",
      "Determine if the margin is sufficient for your risk tolerance (typically 20-50%).",
      "Only purchase if the margin of safety meets your criteria."
    ],
    "example": "If a bank's Graham Number is $60 and the stock trades at $45: Margin of Safety = ($60 - $45) / $60 = 25%. This 25% margin provides cushion against valuation errors.",
    "strengths": [
      "Provides explicit risk management framework.",
      "Encourages disciplined, patient investing.",
      "Protects against valuation errors and unforeseen events.",
      "Can be applied with any intrinsic value methodology."
    ],
    "limitations": [
      "Requires accurate intrinsic value estimate to be meaningful.",
      "May cause investors to miss opportunities in fairly valued quality companies.",
      "No guarantee that price will converge to intrinsic value.",
      "Subjective determination of what margin is \"enough.\""
    ],
    "bankSpecific": "When applying margin of safety to banks, investors should consider that book values may not fully reflect true economic value. Loan loss reserves, held-to-maturity securities at historical cost, and other accounting items can cause reported book value to differ from liquidation value.",
    "whenToUse": "The margin of safety concept applies to every bank stock valuation, regardless of the specific method used to estimate intrinsic value. It is most critical when the intrinsic value estimate carries significant uncertainty, as it does for banks with volatile earnings, concentration risk, or exposure to rapidly changing interest rate environments. Margin of safety is particularly important for bank stocks because bank balance sheets contain embedded risks (credit losses, interest rate risk, liquidity risk) that may not be fully visible in current financial statements. A wider margin of safety is appropriate for banks with asset quality concerns, high concentrations in cyclical loan categories, or less transparent financial disclosure. A narrower margin may be acceptable for banks with strong, consistent track records, diversified loan portfolios, and high capital levels.",
    "methodConnections": "Margin of safety is not a standalone valuation method but a framework applied on top of any intrinsic value estimate. It pairs directly with the Graham Number (margin of safety = Graham Number minus market price, divided by Graham Number), the dividend discount model (margin of safety based on DDM fair value versus market price), the P/B valuation method (margin of safety when current P/B is below justified P/B), and the ROE-P/B framework (margin of safety when the market multiple is below the framework-derived justified multiple). The concept connects to the peer comparison method indirectly: if a bank trades at a significant discount to its peer group on multiple valuation metrics simultaneously, the discount itself may represent a margin of safety, though it could also reflect legitimate concerns the market is pricing in.",
    "commonMistakes": "Anchoring to a single intrinsic value estimate and treating the margin of safety as a precise number rather than a range. Because all valuation methods produce estimates with inherent uncertainty, the margin of safety should be thought of as a buffer against estimation error, not an exact threshold. Using an insufficient margin of safety for banks with concentrated loan portfolios, weak capital positions, or opaque balance sheets. A 10% margin of safety may be adequate for a well-capitalized, diversified bank but insufficient for one with heavy commercial real estate concentration and thin reserves. Ignoring qualitative factors: the margin of safety should be wider when management quality is uncertain, regulatory risk is elevated, or the bank's markets are under economic stress. Confusing a low price with a margin of safety; a bank stock can be cheap and still not offer an adequate margin of safety if the intrinsic value estimate itself is unreliable or if fundamental deterioration is underway.",
    "acrossBankTypes": "For well-capitalized community banks with stable earnings, diversified loan portfolios, and strong local deposit franchises, a margin of safety in the range of 15-25% below estimated intrinsic value is generally considered reasonable by value-oriented investors. For larger regional banks with more complex operations, a similar range applies, though the estimate itself may carry more uncertainty due to the complexity of the balance sheet. For money center banks with trading operations, significant off-balance-sheet exposures, and complex derivative portfolios, a wider margin of safety (25-35% or more) is prudent because the intrinsic value estimate carries greater uncertainty. For banks with known asset quality problems, pending regulatory actions, or strategic uncertainty, even wider margins may be warranted because the downside risk is harder to quantify.",
    "faqTeasers": [
      {
        "question": "What is margin of safety and how do I apply it to bank stocks?",
        "teaser": "Margin of safety represents the discount between a bank's market price and its estimated intrinsic value, providing a buffer against estimation error and unforeseen risks",
        "faqSlug": "margin-of-safety-for-bank-stocks",
        "faqCluster": "valuation"
      },
      {
        "question": "How do I tell if a bank stock is overvalued or undervalued?",
        "teaser": "Combining multiple valuation methods and requiring a margin of safety across several approaches provides the most reliable assessment of whether a bank is mispriced",
        "faqSlug": "how-to-tell-overvalued-undervalued",
        "faqCluster": "valuation"
      }
    ],
    "relatedMethods": [
      "graham-number",
      "price-to-book-valuation"
    ],
    "relatedMetrics": [
      "price-to-book",
      "price-to-earnings",
      "earnings-per-share",
      "book-value-per-share",
      "roe",
      "tangible-book-value-per-share"
    ]
  },
  {
    "slug": "price-to-book-valuation",
    "name": "Price to Book Valuation",
    "type": "Relative Valuation Method",
    "shortDescription": "Valuing banks based on the ratio of market price to accounting book value.",
    "description": "Price to Book (P/B) valuation is the primary relative valuation method for banks. Unlike industrial companies where enterprise value multiples are common, banks are typically valued based on their equity book value because their business involves lending and borrowing money. A bank's book value represents its net worth - what shareholders would theoretically receive in liquidation.",
    "formula": "Target Price = Target P/B Multiple × Book Value Per Share",
    "formulaExplanation": "The target P/B multiple is determined by comparing to peers, historical averages, and the relationship between P/B and profitability (ROE).",
    "steps": [
      "Calculate the current Book Value Per Share.",
      "Analyze the bank's Return on Equity (ROE) relative to peers.",
      "Determine an appropriate P/B multiple based on ROE and quality factors.",
      "Apply the multiple to BVPS to derive a target price.",
      "Compare to current price to assess valuation."
    ],
    "example": "A bank has BVPS of $50 and ROE of 12%, above the peer average of 10%. Peers with similar ROE trade at 1.3x book. Target price = 1.3 × $50 = $65. If the stock trades at $55, it may be undervalued.",
    "strengths": [
      "Directly applicable to bank business model.",
      "Easy to calculate and compare across banks.",
      "Book value provides tangible asset support.",
      "Well-established methodology with extensive research."
    ],
    "limitations": [
      "Book value may not reflect economic value.",
      "Accounting differences affect comparability.",
      "Does not directly value earnings or growth.",
      "Appropriate multiple is subjective and varies with conditions."
    ],
    "bankSpecific": "For banks, P/B valuation is particularly relevant because equity capital is the foundation of their business. Regulators require minimum capital ratios, and excess capital can be returned to shareholders. The relationship between P/B and ROE is especially important - banks generating high returns on equity typically deserve higher P/B multiples.",
    "whenToUse": "Price-to-book valuation is the default starting point for most bank stock analysis and is appropriate for virtually all publicly traded banks. It is most reliable when book value is a reasonable approximation of net asset value, which is true for most banks because their balance sheets consist primarily of financial instruments carried near fair value. P/B valuation is strongest when used in conjunction with ROE analysis (via the ROE-P/B framework) to determine whether the current multiple is justified. It is less reliable for banks with significant held-to-maturity securities portfolios that may contain large unrealized losses not reflected in book value, banks with substantial goodwill from acquisitions (where price-to-tangible-book may be more appropriate), or banks facing potential asset quality problems that could require write-downs not yet reflected in the balance sheet.",
    "methodConnections": "P/B valuation is directly linked to the ROE-P/B framework, which provides the theoretical basis for determining what P/B multiple a bank deserves based on its profitability. The justified P/B formula (justified P/B = (ROE - g) / (r - g)) makes the connection explicit: higher ROE supports a higher multiple. P/B valuation also connects to the Graham Number, which implicitly caps the P/B component at 1.5x. Comparing the current P/B to the justified P/B yields a margin of safety assessment. P/B and P/E are linked through ROE (P/B = P/E multiplied by ROE), so P/B valuation and P/E valuation should produce consistent signals; when they diverge, it often indicates temporary earnings distortion. For banks with acquisition-related goodwill, the price-to-tangible-book valuation method provides a complementary view by stripping out intangibles.",
    "commonMistakes": "Treating all banks trading below book value (P/B under 1.0) as undervalued without investigating why the discount exists. Banks often trade below book for legitimate reasons: weak ROE that does not cover the cost of equity, deteriorating asset quality, management concerns, or market expectations of future losses. Comparing P/B ratios across banks without adjusting for differences in ROE is the most common analytical error; a bank with 14% ROE deserves a higher P/B than one with 7% ROE, and comparing their multiples directly leads to incorrect conclusions. Ignoring the composition of book value, particularly the proportion of intangible assets and the impact of AOCI fluctuations on stated equity. Using a single quarter's P/B without considering whether book value has been affected by unusual items, large AOCI swings, or recent capital transactions.",
    "acrossBankTypes": "Community banks that are potential acquisition targets sometimes trade at P/B premiums reflecting expected takeover pricing, which can range from 1.3x to 2.0x book or higher depending on the deposit franchise value and market. Regional banks with strong ROE and growth profiles typically trade at 1.2-1.8x book. Large money center banks tend to trade in a wider range (0.8-2.0x) depending on the market's view of their complex balance sheets, regulatory environment, and return prospects. Banks that have recently completed mutual-to-stock conversions often trade well below book value (0.5-0.8x) in their early years, reflecting excess capital that has not yet been deployed into earning assets. This represents a distinct valuation dynamic rather than a signal of fundamental weakness.",
    "faqTeasers": [
      {
        "question": "Why is price-to-book (P/B) the primary valuation metric for banks?",
        "teaser": "Bank balance sheets consist primarily of financial instruments carried near fair value, making book value a more meaningful measure of net asset value than for most other industries",
        "faqSlug": "why-pb-primary-bank-valuation",
        "faqCluster": "valuation"
      },
      {
        "question": "Does a P/B ratio below 1.0 always mean a bank is undervalued?",
        "teaser": "A P/B below 1.0 may reflect legitimate concerns about ROE, asset quality, or management rather than a mispricing opportunity",
        "faqSlug": "pb-below-one-undervalued",
        "faqCluster": "valuation"
      },
      {
        "question": "What is the difference between price-to-book and price-to-tangible-book value?",
        "teaser": "P/TBV strips out goodwill and intangible assets from book value, providing a more conservative view for banks that have grown through acquisitions",
        "faqSlug": "pb-vs-ptbv",
        "faqCluster": "valuation"
      }
    ],
    "relatedMethods": [
      "price-to-earnings-valuation",
      "roe-pb-framework"
    ],
    "relatedMetrics": [
      "price-to-book",
      "book-value-per-share",
      "roe",
      "equity-to-assets",
      "non-performing-loans-ratio",
      "non-performing-assets-ratio",
      "texas-ratio"
    ]
  },
  {
    "slug": "price-to-earnings-valuation",
    "name": "Price to Earnings Valuation",
    "type": "Relative Valuation Method",
    "shortDescription": "Valuing banks based on the ratio of market price to per-share earnings.",
    "description": "Price to Earnings (P/E) valuation compares a bank's stock price to its earnings per share. While P/B is the primary valuation method for banks, P/E provides complementary insights about how the market values the bank's earning power. P/E is particularly useful for comparing banks with different capital structures.",
    "formula": "Target Price = Target P/E Multiple × Earnings Per Share",
    "formulaExplanation": "The target P/E multiple is determined based on earnings growth expectations, risk, and peer comparisons.",
    "steps": [
      "Calculate the trailing twelve month or forward Earnings Per Share.",
      "Assess earnings quality and growth prospects.",
      "Determine an appropriate P/E multiple based on peer analysis.",
      "Apply the multiple to EPS to derive a target price.",
      "Compare to current price and other valuation methods."
    ],
    "example": "A bank has EPS of $5.00 and consistent earnings growth. Peers trade at 10-12x earnings. Using 11x for average quality: Target price = 11 × $5.00 = $55.",
    "strengths": [
      "Intuitive and widely used across industries.",
      "Directly values earnings power.",
      "Accounts for profitability differences.",
      "Forward P/E incorporates growth expectations."
    ],
    "limitations": [
      "Cyclical earnings can distort ratios.",
      "Negative earnings make P/E undefined.",
      "One-time items affect comparability.",
      "Does not account for capital intensity differences."
    ],
    "bankSpecific": "Bank earnings are notably cyclical, swinging with credit cycles and interest rate changes. This cyclicality makes normalized earnings important for P/E analysis. Additionally, reserve releases or builds can significantly impact reported earnings without reflecting sustainable earning power.",
    "whenToUse": "P/E valuation is appropriate for banks with stable, normalized earnings and is most useful as a complement to P/B valuation rather than a standalone approach. It works best during periods of normal credit conditions when provisions for credit losses are at mid-cycle levels and net income reflects sustainable earning power. P/E is particularly useful for comparing banks within a peer group when all members are at a similar point in the credit cycle. It is less appropriate during periods of elevated credit losses (when depressed earnings inflate P/E ratios and make banks look expensive) or during periods of unusually benign credit (when low provisions flatter earnings and compress P/E, making banks look cheap). P/E should not be used for banks with negative earnings. For banks with highly volatile earnings, a normalized or mid-cycle P/E approach (using average earnings over a full credit cycle) is preferable to trailing P/E.",
    "methodConnections": "P/E valuation connects to P/B valuation through the identity P/B = P/E multiplied by ROE. This relationship means P/E and P/B should tell a consistent story: if a bank appears cheap on P/E but expensive on P/B (or vice versa), the discrepancy usually reflects unusual earnings relative to book value. P/E also connects to the Graham Number, which implicitly caps the acceptable P/E at 15x. The reciprocal of P/E (E/P, or earnings yield) can be compared to bond yields or the cost of equity as a rough gauge of relative attractiveness. P/E valuation pairs naturally with the margin of safety concept: comparing the bank's P/E to its historical average, peer average, and the level implied by its growth rate reveals potential mispricings.",
    "commonMistakes": "Using trailing P/E without considering the credit cycle position. A bank at the trough of a credit cycle will show a high trailing P/E because earnings are temporarily depressed by elevated provisions; this high P/E may actually represent a buying opportunity rather than overvaluation. Conversely, a bank at the peak of a benign credit cycle will show a low trailing P/E that may be deceptively cheap if provisions are about to normalize upward. Comparing P/E across banks with very different reserve policies: a bank that provisions conservatively (building reserves ahead of losses) will show lower earnings and a higher P/E than an equally healthy bank with leaner reserves. Ignoring one-time items that distort EPS: securities gains or losses, legal settlements, tax adjustments, and branch sale gains can all make a single period's P/E misleading. Fixating on P/E without checking whether the earnings level is sustainable by examining pre-provision net revenue, efficiency trends, and asset quality trajectories.",
    "acrossBankTypes": "During normal earnings periods, US bank P/E ratios typically range from 8x to 15x based on aggregate market data. High-growth community and regional banks in attractive markets may command P/E ratios of 13-16x, reflecting expectations of above-average earnings growth. Large money center banks with diversified but more complex earnings streams often trade at 9-13x, reflecting both their size stability and the uncertainty around trading revenues and regulatory costs. Banks with limited analyst coverage (many community banks) may trade at a liquidity discount of 1-3 P/E turns below comparable covered banks. Banks with visible near-term catalysts (pending M&A, capital optimization programs, market expansion) may trade at premium P/E ratios reflecting expected earnings improvement.",
    "faqTeasers": [
      {
        "question": "What is a good P/E ratio for a bank stock?",
        "teaser": "Bank P/E ratios typically range from 8x to 15x during normal earnings periods, but interpretation requires understanding the credit cycle context and earnings quality",
        "faqSlug": "what-is-a-good-pe-for-banks",
        "faqCluster": "valuation"
      },
      {
        "question": "Why can't I use EV/EBITDA to value a bank stock?",
        "teaser": "EV/EBITDA is designed for non-financial companies; banks' core business of financial intermediation makes debt an operating item rather than a financing item, rendering the metric meaningless",
        "faqSlug": "why-not-ev-ebitda-for-banks",
        "faqCluster": "valuation"
      }
    ],
    "relatedMethods": [
      "price-to-book-valuation",
      "roe-pb-framework"
    ],
    "relatedMetrics": [
      "price-to-earnings",
      "earnings-per-share",
      "roe",
      "price-to-book"
    ]
  },
  {
    "slug": "roe-pb-framework",
    "name": "ROE-P/B Valuation Framework",
    "type": "Fundamental Valuation Method",
    "shortDescription": "A framework linking justified price-to-book multiple to return on equity.",
    "description": "The ROE-P/B framework establishes a theoretical relationship between a bank's profitability (ROE) and its appropriate valuation multiple (P/B). The core insight is that banks generating returns above their cost of equity should trade above book value, while those earning below cost of equity should trade below. This framework helps identify mispriced banks.",
    "formula": "Justified P/B = (ROE - g) / (CoE - g)",
    "formulaExplanation": "ROE is Return on Equity, g is sustainable growth rate, and CoE is Cost of Equity. When ROE equals CoE, justified P/B equals 1.0x.",
    "steps": [
      "Calculate the bank's sustainable Return on Equity.",
      "Estimate the bank's cost of equity (typically 8-12% for banks).",
      "Estimate sustainable growth rate (retention ratio × ROE).",
      "Calculate the justified P/B multiple.",
      "Compare to actual P/B to identify mis-valuation."
    ],
    "example": "A bank has ROE of 14%, cost of equity of 10%, and growth of 3%. Justified P/B = (14% - 3%) / (10% - 3%) = 11% / 7% = 1.57x. If trading at 1.2x book, it may be undervalued.",
    "strengths": [
      "Provides theoretical foundation for P/B multiples.",
      "Links valuation to fundamental profitability.",
      "Helps identify banks trading away from fair value.",
      "Accounts for cost of capital differences."
    ],
    "limitations": [
      "Requires estimates of cost of equity and growth.",
      "Assumes ROE is sustainable and stable.",
      "Sensitive to input assumptions.",
      "Does not capture all factors affecting bank value."
    ],
    "bankSpecific": "This framework is particularly valuable for banks because the relationship between ROE and P/B is strong in the banking sector. Banks consistently earning ROE above 12-15% typically trade at premium P/B multiples, while those below 8% often trade at discounts. Analyzing where a bank falls on this spectrum helps identify valuation anomalies.",
    "whenToUse": "The ROE-P/B framework is the most theoretically grounded approach to bank valuation and is appropriate for any bank with a meaningful track record of profitability. It is the preferred method for determining whether a bank's current P/B multiple is justified by its fundamentals. The framework is most powerful when applied to banks with relatively stable ROE, because the justified P/B formula assumes a steady-state relationship between profitability and value. It is less reliable for banks with highly cyclical or volatile ROE, banks undergoing significant strategic transformation, or de novo banks that have not yet reached normalized profitability. For banks with ROE near or below the cost of equity, the framework correctly produces justified P/B multiples near or below 1.0, which some investors find counterintuitive but is economically sound.",
    "methodConnections": "The ROE-P/B framework provides the theoretical foundation that connects P/B valuation to profitability analysis. The justified P/B formula, (ROE - g) / (r - g), is derived from the Gordon Growth Model applied to book value rather than dividends, linking this framework directly to the DDM family of models. The sustainable growth rate (g = ROE multiplied by the retention ratio) connects the framework to dividend payout ratio analysis: a bank's growth rate is constrained by how much of its ROE it retains. The framework also connects to the DuPont decomposition because understanding what drives ROE (asset productivity vs. leverage vs. margin) reveals whether the current ROE is sustainable and therefore whether the justified P/B is reliable. Peer comparison analysis is enhanced by the ROE-P/B framework, which transforms simple P/B comparisons into ROE-adjusted assessments of relative value.",
    "commonMistakes": "Using a current-period ROE that reflects cyclical extremes rather than a normalized or through-the-cycle ROE. If a bank earned 15% ROE during a period of exceptionally low provisions, using that figure in the justified P/B formula will overestimate the appropriate multiple. Similarly, using trough-cycle ROE understates it. The cost of equity (r) estimate is the most subjective input and has a significant impact on the result; small changes in the assumed cost of equity (e.g., 9% vs. 11%) produce materially different justified P/B multiples. Using the risk-free rate plus a generic equity risk premium without adjusting for bank-specific risks (size, liquidity, concentration) understates the cost of equity for smaller or riskier banks. Ignoring the growth rate assumption: assuming zero growth simplifies the formula but undervalues banks that are retaining earnings and growing their franchises. Applying the framework mechanically without considering qualitative factors such as management quality, franchise value, and competitive positioning.",
    "acrossBankTypes": "For well-run community banks with ROE of 10-13% and modest growth, the ROE-P/B framework typically produces justified multiples in the range of 1.0-1.5x book value, assuming a cost of equity of 10-12%. High-performing regional banks with ROE of 13-16% and stronger growth prospects may warrant justified multiples of 1.5-2.0x. Large money center banks present a more complex application because their cost of equity may be lower (due to perceived safety and liquidity) but their ROE may also be lower due to higher capital levels and complex operations, often producing justified multiples in the 1.0-1.5x range. The framework is particularly useful for identifying mispriced community banks: a bank earning 12% ROE with a cost of equity of 10% and a sustainable growth rate of 4% produces a justified P/B of approximately 1.33x; if the bank trades at 0.9x book, the framework highlights a potential valuation gap.",
    "faqTeasers": [
      {
        "question": "What is the ROE-P/B valuation framework and how does it work?",
        "teaser": "The ROE-P/B framework derives the justified price-to-book multiple from a bank's return on equity, cost of equity, and sustainable growth rate, providing a fundamentals-based approach to bank valuation",
        "faqSlug": "roe-pb-framework-explained",
        "faqCluster": "valuation"
      },
      {
        "question": "How do I determine the justified P/B multiple for a bank stock?",
        "teaser": "The justified P/B equals (ROE minus growth rate) divided by (cost of equity minus growth rate), requiring estimates of normalized ROE, sustainable growth, and the appropriate discount rate",
        "faqSlug": "how-to-calculate-justified-pb",
        "faqCluster": "valuation"
      },
      {
        "question": "Why is ROE more important for banks than for other companies?",
        "teaser": "ROE determines the justified P/B multiple through the ROE-P/B framework, making it the single most important metric linking bank profitability to valuation",
        "faqSlug": "why-roe-important-for-banks",
        "faqCluster": "profitability"
      }
    ],
    "relatedMethods": [
      "price-to-book-valuation",
      "price-to-earnings-valuation"
    ],
    "relatedMetrics": [
      "roe",
      "price-to-book",
      "equity-to-assets",
      "dividend-payout-ratio",
      "roaa",
      "book-value-per-share",
      "return-on-tangible-common-equity",
      "price-to-tangible-book-value"
    ]
  },
  {
    "slug": "dividend-discount-model",
    "name": "Dividend Discount Model",
    "type": "Intrinsic Value Method",
    "shortDescription": "Values a bank based on the present value of expected future dividends.",
    "description": "The Dividend Discount Model (DDM) values a stock as the present value of all expected future dividend payments. For banks, which typically pay regular dividends and face regulatory constraints on capital deployment, DDM can be a relevant valuation approach. The model assumes dividends grow at a sustainable rate indefinitely.",
    "formula": "Value = D₁ / (r - g)",
    "formulaExplanation": "D₁ is next year's expected dividend, r is the required return (cost of equity), and g is the perpetual dividend growth rate. This is the Gordon Growth Model, the simplest form of DDM.",
    "steps": [
      "Determine the current annual dividend per share.",
      "Estimate sustainable dividend growth rate (ROE × retention ratio, or historical trend).",
      "Determine appropriate discount rate (cost of equity).",
      "Calculate intrinsic value using the formula.",
      "Compare to current price to assess valuation."
    ],
    "example": "A bank pays $2.00 dividend, expected to grow at 4% annually. With 10% cost of equity: Value = $2.00 × 1.04 / (0.10 - 0.04) = $2.08 / 0.06 = $34.67.",
    "strengths": [
      "Directly values cash returns to shareholders.",
      "Appropriate for stable, dividend-paying banks.",
      "Intuitive for income-focused investors.",
      "Accounts for time value of money."
    ],
    "limitations": [
      "Highly sensitive to growth and discount rate assumptions.",
      "Assumes perpetual dividend payments and growth.",
      "Not applicable to non-dividend-paying banks.",
      "Does not value retained earnings directly."
    ],
    "bankSpecific": "Bank dividends are subject to regulatory approval and stress testing. Capital requirements limit how much banks can pay out, making dividend growth more predictable but also constrained. When using DDM for banks, investors should consider regulatory capital plans and the likelihood of dividend increases or cuts.",
    "whenToUse": "The dividend discount model is most appropriate for banks with an established, consistent dividend payment history and a reasonably predictable earnings stream to support future dividends. It works well for mature community and regional banks that pay regular dividends and have stable payout ratios. The DDM is particularly well-suited to bank valuation because banks, as a group, are among the most reliable dividend payers in the equity market due to their stable cash flows from lending and fee income. The model is less appropriate for banks that do not pay dividends (such as de novo banks or banks rebuilding capital after losses), banks with highly erratic payout ratios, or high-growth banks where the majority of value comes from future reinvested earnings rather than near-term dividends. For banks subject to Federal Reserve stress testing, dividend projections should account for the possibility of regulatory restrictions on payouts.",
    "methodConnections": "The DDM connects directly to the dividend payout ratio (which determines what share of earnings is paid as dividends), ROE (which drives earnings), and the sustainable growth rate (ROE multiplied by the retention ratio, which equals 1 minus the payout ratio). The Gordon Growth Model is a simplified form of the DDM that assumes a constant dividend growth rate in perpetuity (P = D1 / (r - g)), making it useful for banks with stable growth characteristics. The DDM framework links to the ROE-P/B framework through the sustainable growth rate: both models use ROE and the retention ratio to project future value creation. The DDM can also inform margin of safety analysis by comparing its fair value output to the current market price.",
    "commonMistakes": "Overestimating the sustainable dividend growth rate is the most consequential error. Using historical dividend growth rates without checking whether those rates were supported by earnings growth (rather than payout ratio increases) leads to overly optimistic valuations. Failing to account for the regulatory dimension of bank dividends: the Federal Reserve and other regulators can restrict dividend payments, making bank dividend streams less certain than those of non-financial companies even when earnings are strong. Using an inappropriate discount rate (cost of equity): small-cap bank stocks generally require a higher discount rate than large-cap banks due to liquidity risk and size premiums. Projecting current period dividends without normalizing for the credit cycle; if provisions are abnormally low and earnings (and therefore dividends) are abnormally high, the DDM will overvalue the bank. Ignoring share buybacks as a form of capital return: a bank with a low payout ratio but aggressive buyback program may be returning more capital to shareholders than the DDM captures.",
    "acrossBankTypes": "Community banks with stable local lending franchises and limited growth opportunities are often the best candidates for DDM analysis because their dividends tend to be predictable and the growth component is modest and sustainable. Regional banks with moderate growth profiles also lend themselves to DDM analysis, though the growth rate estimate carries more uncertainty due to the broader range of strategic options (organic growth, acquisitions, new market entry). Large money center banks are more challenging DDM candidates because their earnings mix includes volatile trading revenues, their capital return plans are subject to Federal Reserve stress test constraints, and the interplay between dividends and buybacks complicates the dividend projection. For all bank types, normalizing the starting dividend for the credit cycle position is important; using a mid-cycle or through-the-cycle earnings estimate to derive the initial dividend produces more reliable results.",
    "faqTeasers": [
      {
        "question": "How does the dividend discount model work for bank stocks?",
        "teaser": "The DDM values a bank stock as the present value of all expected future dividends, making it well-suited to mature banks with consistent payout histories",
        "faqSlug": "dividend-discount-model-for-banks",
        "faqCluster": "valuation"
      },
      {
        "question": "What is the relationship between ROE, payout ratio, and dividend growth?",
        "teaser": "The sustainable dividend growth rate equals ROE multiplied by the retention ratio (1 minus the payout ratio), linking bank profitability directly to dividend growth potential",
        "faqSlug": "roe-payout-ratio-dividend-growth",
        "faqCluster": "dividends"
      },
      {
        "question": "What is the sustainable growth rate and how does it relate to bank dividends?",
        "teaser": "The sustainable growth rate represents how fast a bank can grow without raising external capital, determined by ROE and what portion of earnings is retained versus paid out",
        "faqSlug": "sustainable-growth-rate-and-dividends",
        "faqCluster": "dividends"
      }
    ],
    "relatedMethods": [
      "roe-pb-framework",
      "price-to-book-valuation"
    ],
    "relatedMetrics": [
      "dividend-payout-ratio",
      "roe",
      "earnings-per-share",
      "net-interest-margin"
    ]
  },
  {
    "slug": "peer-comparison",
    "name": "Peer Comparison Analysis",
    "type": "Relative Valuation Method",
    "shortDescription": "Valuing a bank by comparing its metrics and multiples to similar banks.",
    "description": "Peer comparison analysis values a bank by examining how similar banks are valued in the market. By comparing key metrics (ROE, efficiency ratio, growth) and valuation multiples (P/B, P/E), investors can identify whether a bank trades at a premium or discount to peers and whether that premium or discount is justified.",
    "formula": "Implied Value = Peer Average Multiple × Subject Bank Metric",
    "formulaExplanation": "Peers should be selected based on similar size, geography, business model, and risk profile.",
    "steps": [
      "Select a relevant peer group (similar size, geography, business model).",
      "Calculate key metrics for the subject bank and all peers.",
      "Compare valuation multiples across the peer group.",
      "Identify whether the subject trades at premium or discount.",
      "Assess whether differences are justified by fundamental differences."
    ],
    "example": "Regional bank peers trade at average P/B of 1.2x with average ROE of 10%. Subject bank has ROE of 12% but trades at 1.0x book. This discount appears unjustified given superior profitability.",
    "strengths": [
      "Uses real market data and valuations.",
      "Identifies relative mis-pricing within sectors.",
      "Easy to understand and communicate.",
      "Captures market sentiment and conditions."
    ],
    "limitations": [
      "Peers may all be overvalued or undervalued.",
      "No two banks are identical, making comparisons imperfect.",
      "Requires judgment in selecting appropriate peers.",
      "Does not provide absolute intrinsic value."
    ],
    "bankSpecific": "When comparing banks, consider differences in asset quality (non-performing loans), deposit franchise quality (cost of funds), geographic exposure (local economic conditions), and business mix (commercial vs. consumer lending). Banks with superior deposit franchises or lower credit risk typically deserve premium valuations.",
    "whenToUse": "Peer comparison is appropriate for virtually every bank stock analysis and is often the first step in evaluating whether a bank is fairly valued. It is most informative when the peer group is carefully constructed to include banks of similar size, geographic footprint, business mix, and growth profile. Peer comparison is essential when absolute valuation methods (DDM, Graham Number) produce results that seem disconnected from market reality, because it grounds the analysis in what the market is actually paying for comparable institutions. It is less useful when true peers are difficult to identify (e.g., for banks with highly unique business models or geographic monopolies) or when the entire peer group may be mispriced (as can happen during sector-wide bubbles or panics). Peer comparison should always be supplemented with fundamental analysis of the individual bank's intrinsic value.",
    "methodConnections": "Peer comparison provides the market context that absolute valuation methods lack. A bank may appear undervalued by the Graham Number or DDM, but if it also trades at a premium to its peers on P/B, P/E, and other metrics, the absolute methods may be producing overly optimistic estimates. Peer comparison connects to every ratio-based valuation metric (P/B, P/E, P/TBV) and every profitability metric (ROE, ROAA, NIM, efficiency ratio) because the comparison is only meaningful when multiple dimensions are evaluated together. The ROE-P/B framework provides the theoretical basis for why peer banks with different ROEs should trade at different P/B multiples, transforming simple peer comparison from a crude ranking exercise into a structured analytical framework. Margin of safety can be assessed in a peer context: a bank trading at a significant discount to peers on multiple metrics simultaneously may offer a peer-relative margin of safety.",
    "commonMistakes": "Constructing a peer group based solely on asset size without considering geographic market, business mix, loan composition, or funding structure. A $2 billion community bank in rural Iowa is not a meaningful peer for a $2 billion bank in suburban New Jersey, even though they are the same size. Comparing metrics across peers without adjusting for differences in business model: a bank with a large wealth management division will naturally have a different efficiency ratio and ROE profile than a pure commercial lender, and penalizing or rewarding it for these structural differences produces misleading conclusions. Treating the peer median as the \"correct\" valuation: the median may reflect market consensus rather than fundamental value, and the most attractive investments often trade at discounts to peer medians for reasons that fundamental analysis can evaluate. Ignoring the reason for a discount: a bank trading below its peers may have asset quality issues, management problems, or strategic challenges that fully justify the lower valuation.",
    "acrossBankTypes": "Community bank peer groups are typically defined by asset size (e.g., $500 million to $2 billion), geographic region, and primary lending focus (commercial real estate, agricultural, residential mortgage). Peer groups of 8-15 banks generally provide the most useful comparisons. Regional bank peer groups may include banks in the same or adjacent states with comparable asset sizes and business lines. For large money center banks, the peer group is effectively defined by the small number of institutions that operate at similar scale and complexity (typically fewer than 10 globally). Some investors construct tiered peer groups: a primary group of 5-8 very close peers and a secondary group of 10-15 broader comparisons to test whether conclusions from the narrow group hold in a wider context.",
    "faqTeasers": [
      {
        "question": "How do I do a peer comparison for bank stocks?",
        "teaser": "Effective peer comparison starts with selecting banks of similar size, geography, and business mix, then comparing profitability, efficiency, capital, and valuation metrics across the group",
        "faqSlug": "how-to-do-peer-comparison",
        "faqCluster": "valuation"
      },
      {
        "question": "How do I compare bank stocks side by side?",
        "teaser": "Side-by-side comparison requires evaluating multiple dimensions simultaneously, including ROE, ROAA, NIM, efficiency ratio, capital strength, asset quality, and valuation multiples",
        "faqSlug": "how-to-compare-bank-stocks",
        "faqCluster": "screening"
      },
      {
        "question": "How do I compare profitability across banks of different sizes?",
        "teaser": "ROAA is the preferred metric for cross-size profitability comparison because it removes leverage differences, unlike ROE which is heavily influenced by capital structure",
        "faqSlug": "comparing-profitability-different-size-banks",
        "faqCluster": "profitability"
      }
    ],
    "relatedMethods": [
      "price-to-book-valuation",
      "price-to-earnings-valuation",
      "roe-pb-framework"
    ],
    "relatedMetrics": [
      "roe",
      "roaa",
      "net-interest-margin",
      "efficiency-ratio",
      "price-to-book",
      "price-to-earnings",
      "equity-to-assets",
      "loans-to-deposits",
      "deposits-to-assets",
      "loans-to-assets",
      "dividend-payout-ratio",
      "cet1-capital-ratio",
      "tier-1-capital-ratio",
      "total-capital-ratio",
      "tier-1-leverage-ratio",
      "supplementary-leverage-ratio",
      "tangible-common-equity-ratio",
      "risk-weighted-assets-density",
      "non-performing-loans-ratio",
      "non-performing-assets-ratio",
      "net-charge-off-ratio",
      "loan-loss-reserve-ratio",
      "reserve-coverage-ratio",
      "texas-ratio",
      "provision-to-average-loans",
      "return-on-tangible-common-equity",
      "pre-provision-net-revenue",
      "net-overhead-ratio",
      "price-to-tangible-book-value",
      "tangible-book-value-per-share",
      "cost-of-funds",
      "cost-of-deposits",
      "non-interest-income-to-revenue",
      "interest-income-to-earning-assets"
    ]
  },
  {
    "slug": "price-to-tangible-book-valuation",
    "name": "Price to Tangible Book Valuation",
    "type": "Relative Valuation Method",
    "shortDescription": "Values bank stocks by comparing market price to tangible book value per share, stripping out goodwill and intangibles for a more conservative asset-based valuation",
    "description": "Price to Tangible Book Valuation assesses whether a bank stock is fairly valued by comparing its market price to its tangible book value per share (TBVPS). This approach extends the standard P/B valuation framework by removing goodwill and other intangible assets from book value, providing a more conservative view of net asset value. The method is particularly useful for evaluating banks that have grown through acquisitions and carry significant goodwill, where standard P/B may overstate the tangible capital supporting the stock price.",
    "formula": "P/TBV = Market Price / TBVPS, where TBVPS = (Common Equity - Goodwill - Intangibles) / Shares Outstanding",
    "isPercentage": false,
    "formulaExplanation": "The market price is the current share price. TBVPS is calculated by taking total common shareholders' equity, subtracting goodwill and other intangible assets, and dividing by diluted shares outstanding. The resulting P/TBV multiple indicates how many dollars the market is paying for each dollar of tangible net asset value. A justified P/TBV can be derived from the formula: Justified P/TBV = (ROTCE - g) / (r - g), where ROTCE is return on tangible common equity, g is the sustainable growth rate, and r is the cost of equity.",
    "steps": [
      "Calculate tangible book value per share by subtracting goodwill and other intangible assets from total common equity, then dividing by diluted shares outstanding. Verify the calculation against the bank's non-GAAP reconciliation if disclosed in the earnings release.",
      "Calculate the current P/TBV multiple by dividing the market price by TBVPS. Compare this to the bank's historical P/TBV range to assess whether the current valuation is above or below the bank's own typical multiple.",
      "Estimate the justified P/TBV using the formula (ROTCE - g) / (r - g). Use sustainable ROTCE (not a single quarter), estimate g from ROE times the retention ratio, and use a cost of equity between 10% and 13% depending on the bank's risk profile.",
      "Compare the current P/TBV to the justified P/TBV. If the current multiple is below the justified multiple, the stock may be undervalued. If above, it may be overvalued. Consider the range of reasonable assumptions for ROTCE, growth, and cost of equity rather than relying on a single point estimate.",
      "Compare the bank's P/TBV to peers with similar ROTCE levels. Plot P/TBV against ROTCE across a peer group to identify banks trading at discounts or premiums relative to their tangible profitability. Banks below the regression line may represent relative value opportunities."
    ],
    "example": "A bank has total common equity of $5 billion, goodwill of $800 million, other intangibles of $200 million, and 100 million diluted shares outstanding. TBVPS = ($5B - $800M - $200M) / 100M = $40.00. If the stock trades at $52.00, the P/TBV is $52 / $40 = 1.30x. The bank's ROTCE is 14%, the estimated sustainable growth rate is 4%, and the cost of equity is 11%. Justified P/TBV = (14% - 4%) / (11% - 4%) = 10% / 7% = 1.43x. The current P/TBV of 1.30x is below the justified multiple of 1.43x, suggesting the stock may be modestly undervalued on a tangible book basis.",
    "strengths": [
      "Strips out goodwill and intangibles that may have limited value in a stress scenario, providing a more conservative valuation anchor than standard P/B for banks with acquisition histories.",
      "Directly connects to ROTCE through the justified P/TBV framework, creating a theoretically grounded link between tangible profitability and tangible valuation.",
      "Serves as the standard valuation language for bank M&A, making P/TBV analysis directly applicable when evaluating potential acquisition targets or assessing deal pricing.",
      "Enables more meaningful peer comparisons for banks with very different acquisition histories by removing the distortion of varying goodwill levels from the valuation metric."
    ],
    "limitations": [
      "P/TBV adds no information beyond P/B for banks with minimal or no goodwill (organic growers, de novo banks, mutual-to-stock conversions). For these banks, P/B analysis is sufficient.",
      "TBVPS is a non-GAAP measure with no standardized definition. Different treatments of mortgage servicing rights, AOCI, deferred tax assets, and preferred stock can produce different TBVPS figures for the same bank, complicating cross-bank comparisons.",
      "The justified P/TBV formula requires estimating sustainable ROTCE, cost of equity, and growth rate, all of which involve significant uncertainty. Small changes in these inputs produce large changes in the justified multiple.",
      "TBVPS can be volatile due to AOCI movements (unrealized securities gains/losses), which can cause P/TBV to fluctuate even when the stock price and the bank's fundamentals are stable.",
      "Like P/B, the P/TBV approach assumes book values (even tangible ones) reasonably approximate economic values. If a bank's loan portfolio carries unrealized losses beyond what the allowance covers, tangible book value overstates true net asset value."
    ],
    "bankSpecific": "P/TBV valuation is a natural extension of the P/B framework that has long been the primary valuation methodology for banks. As the banking industry consolidated through waves of M&A from the 1990s onward, goodwill balances grew substantially at many institutions. P/TBV emerged as the preferred metric because it separates the tangible franchise value from the accounting residue of past deal premiums. In bank M&A, acquirers evaluate targets on a P/TBV basis, and the premium-to-tangible-book is the standard measure of deal pricing. For equity analysts, the P/TBV-to-ROTCE scatter plot across a peer group is one of the most commonly used analytical frameworks for identifying relative value in bank stocks.",
    "relatedMethods": [
      "price-to-book-valuation",
      "roe-pb-framework",
      "peer-comparison",
      "price-to-earnings-valuation"
    ],
    "whenToUse": "P/TBV valuation is most appropriate when evaluating banks that carry significant goodwill from acquisitions (typically mid-size and large regionals formed through consolidation). It is also the preferred valuation framework for M&A analysis, both for evaluating potential targets and for assessing the pricing of announced deals. P/TBV is less useful for banks with no goodwill, where it reduces to standard P/B analysis. For banks undergoing rapid goodwill impairment or with uncertain intangible asset values, P/TBV provides a more stable valuation anchor than P/B.",
    "methodConnections": "P/TBV is the tangible equivalent of P/B valuation, with the justified multiple driven by ROTCE instead of ROE: Justified P/TBV = (ROTCE - g) / (r - g) versus Justified P/B = (ROE - g) / (r - g). Both frameworks derive from the Gordon Growth Model applied to equity valuation. P/TBV = P/E x ROTCE, mirroring P/B = P/E x ROE. The Peer Comparison method frequently uses P/TBV-to-ROTCE regression as one of its primary valuation cross-checks. The Excess Capital Return Model complements P/TBV by focusing on whether the bank has capital above regulatory minimums that could be returned to shareholders, which affects the sustainable growth rate input in the justified P/TBV formula.",
    "commonMistakes": "The most common error is applying P/TBV analysis to banks with no goodwill, which adds complexity without incremental insight. Another frequent mistake is using trailing ROTCE without assessing whether it is sustainable; a bank that achieved 18% ROTCE due to reserve releases will not sustain that level once provisioning normalizes, and the justified P/TBV should use normalized ROTCE. Comparing P/TBV multiples across banks with very different ROTCE levels without adjusting for profitability differences is also misleading; a bank at 2.0x P/TBV with 20% ROTCE may be cheaper than one at 1.2x P/TBV with 8% ROTCE. Using the justified P/TBV framework or a P/TBV-to-ROTCE regression corrects this error.",
    "acrossBankTypes": "P/TBV is most differentiated from P/B for serial-acquirer regionals where goodwill may represent 15% to 30% of total equity. For these banks, P/TBV provides a meaningfully more conservative valuation picture. Money center banks carry substantial absolute goodwill but their large equity bases moderate the relative impact. Community banks that have grown organically show minimal P/TBV-to-P/B spread. In bank M&A, acquirers typically pay 1.3x to 2.0x tangible book for healthy community and regional banks, with the premium reflecting the franchise value of the target's deposit base, market position, and earnings power.",
    "faqTeasers": [
      {
        "question": "What is the difference between price-to-book and price-to-tangible-book value?",
        "teaser": "P/B includes goodwill in book value, while P/TBV strips it out. For banks with significant acquisition history, P/TBV provides a more conservative valuation that focuses on hard tangible assets.",
        "faqSlug": "pb-vs-ptbv",
        "faqCluster": "valuation"
      },
      {
        "question": "When should I use P/TBV instead of P/B to value a bank?",
        "teaser": "P/TBV is preferred when the bank carries significant goodwill, when evaluating M&A pricing, or when comparing banks with very different acquisition histories.",
        "faqSlug": "when-to-use-ptbv",
        "faqCluster": "valuation"
      },
      {
        "question": "How do I determine the justified P/B multiple for a bank stock?",
        "teaser": "The justified multiple framework applies equally to P/B (using ROE) and P/TBV (using ROTCE), connecting profitability to fair valuation through a simple formula.",
        "faqSlug": "how-to-calculate-justified-pb",
        "faqCluster": "valuation"
      }
    ],
    "relatedMetrics": [
      "price-to-tangible-book-value",
      "tangible-book-value-per-share",
      "return-on-tangible-common-equity",
      "tangible-common-equity-ratio",
      "price-to-book",
      "book-value-per-share",
      "roe",
      "texas-ratio"
    ]
  },
  {
    "slug": "excess-capital-return-model",
    "name": "Excess Capital Return Model",
    "type": "Intrinsic Value Method",
    "shortDescription": "Values a bank by separating required regulatory capital from excess capital, estimating value from the returns generated on capital above regulatory minimums",
    "description": "The Excess Capital Return Model values a bank by dividing its capital into two components: the capital required to meet regulatory minimums (plus management buffers) and the excess capital above that threshold. Required capital is valued based on the earnings it generates (using a sustainable ROE or earnings multiple), while excess capital is valued at face value because it could theoretically be returned to shareholders through buybacks or special dividends. This approach is particularly useful for identifying banks with substantial excess capital that the market may not be fully pricing.",
    "formula": "Intrinsic Value = (Excess Capital) + (Required Capital x Sustainable ROE / Cost of Equity)",
    "isPercentage": false,
    "formulaExplanation": "First, determine required capital. This is typically the CET1 ratio target (regulatory minimum plus management buffer, often 9% to 11% of RWA) translated to a dollar amount. Required Capital = Target CET1 Ratio x Risk-Weighted Assets. Excess Capital = Actual CET1 Capital - Required Capital. The value of required capital is estimated as a perpetuity: Required Capital x (Sustainable ROE / Cost of Equity). Excess capital is valued at 1.0x because it could be distributed immediately. Total intrinsic value per share = (Value of Required Capital + Excess Capital) / Shares Outstanding. Some versions of the model discount excess capital slightly below 1.0x to reflect uncertainty about the timing and form of capital return.",
    "steps": [
      "Determine the bank's actual CET1 capital and CET1 ratio from regulatory disclosures. Also note risk-weighted assets, as these determine the required capital threshold.",
      "Estimate required capital by selecting a target CET1 ratio that includes regulatory minimums plus a management buffer. For most banks, a target between 9% and 11% is reasonable. Required Capital = Target CET1 Ratio x RWA. Calculate Excess Capital = Actual CET1 - Required Capital.",
      "Estimate sustainable ROE on required capital. Use normalized earnings (excluding one-time items and extraordinary provision levels) divided by required capital. Alternatively, use the bank's through-cycle average ROE as a proxy for sustainable returns on deployed capital.",
      "Value required capital as a perpetuity: Required Capital x (Sustainable ROE / Cost of Equity). Use a cost of equity between 10% and 13% depending on the bank's risk profile. Value excess capital at 1.0x (or a slight discount for timing uncertainty).",
      "Sum the two components and divide by shares outstanding to arrive at intrinsic value per share. Compare to the current market price to assess whether the stock is undervalued, fairly valued, or overvalued. Perform sensitivity analysis across a range of ROE, cost of equity, and target CET1 ratio assumptions."
    ],
    "example": "A bank has CET1 capital of $10 billion, RWA of $80 billion (CET1 ratio of 12.5%), and 500 million shares outstanding. The management target CET1 ratio is 10%. Required Capital = 10% x $80B = $8 billion. Excess Capital = $10B - $8B = $2 billion. Sustainable ROE on required capital is estimated at 13%, and cost of equity is 11%. Value of required capital = $8B x (13% / 11%) = $9.45 billion. Total intrinsic value = $9.45B + $2.0B = $11.45 billion, or $22.91 per share. If the stock trades at $19.00, the model suggests approximately 20% upside, largely driven by the market undervaluing the excess capital component.",
    "strengths": [
      "Explicitly captures the value of excess capital, which standard P/E or P/B analysis may overlook. Banks sitting on substantial excess capital represent hidden value if the capital will eventually be returned or deployed productively.",
      "Connects bank valuation directly to the regulatory capital framework, reflecting the reality that capital adequacy is a binding constraint on bank operations, dividends, and buybacks.",
      "Provides a clear framework for evaluating capital allocation decisions. The model shows the value impact of buybacks, special dividends, acquisitions, or organic growth funded by excess capital.",
      "Particularly useful for identifying undervalued banks that have built excess capital through strong earnings but have not yet announced capital return plans, or banks emerging from stressed periods with rebuilt capital buffers."
    ],
    "limitations": [
      "Determining the \"right\" target CET1 ratio is subjective. Different analysts may use different targets, producing significantly different excess capital estimates and intrinsic values. Regulatory requirements and management buffers vary by institution.",
      "The model assumes excess capital can actually be returned to shareholders, but regulatory restrictions, stress test results, and management preferences may prevent or delay capital returns. The time value of delayed capital return is not captured in the basic model.",
      "Sustainable ROE is difficult to estimate, particularly for banks in transitional periods (emerging from credit cycles, undergoing strategic shifts, or integrating acquisitions). Using historical ROE may not reflect future earning power.",
      "The model does not account for the growth optionality embedded in excess capital. A bank may retain excess capital to fund future loan growth or acquisitions, which could generate returns above cost of equity and create more value than returning the capital.",
      "Risk-weighted assets can change over time, altering the required capital calculation. A bank that appears to have excess capital today may need that capital if RWA increase through loan growth or regulatory methodology changes."
    ],
    "bankSpecific": "The Excess Capital Return Model is uniquely suited to banking because banks operate under explicit regulatory capital requirements that define a minimum level of equity. This regulatory floor creates a natural division between \"working\" capital (earning returns through lending and investing) and \"excess\" capital (available for distribution or deployment). The model gained prominence after the 2008-2010 financial crisis as banks rebuilt capital well above regulatory minimums and investors sought to identify which banks had the most excess capital to return. The Federal Reserve's annual stress tests (CCAR/DFAST) effectively determine how much capital large banks can return, making the excess capital framework directly relevant to dividend and buyback capacity.",
    "relatedMethods": [
      "price-to-book-valuation",
      "price-to-tangible-book-valuation",
      "roe-pb-framework",
      "dividend-discount-model"
    ],
    "whenToUse": "The Excess Capital Return Model is most useful when evaluating banks with CET1 ratios significantly above management targets or regulatory minimums, banks that have recently completed large capital raises or experienced sharp earnings recoveries that built capital, and banks where the market appears to be ignoring or undervaluing the excess capital component. It is less useful for banks operating near minimum capital levels (where there is no excess to value) or for banks with aggressive growth plans that intend to deploy excess capital into asset growth rather than returning it.",
    "methodConnections": "The Excess Capital Return Model complements the ROE-P/B framework by decomposing book value into required and excess components rather than treating it as a single block. The P/B approach implicitly values all equity through the ROE-to-cost-of-equity relationship, while the Excess Capital model values only the working portion this way and adds excess capital at face value. The Dividend Discount Model is related because excess capital determines dividend capacity. The Gordon Growth Model connects through the sustainable growth rate, which depends on how much capital is retained (required) versus distributed (excess).",
    "commonMistakes": "The most frequent error is using the current CET1 ratio as the sustainable level without considering the bank's growth plans, regulatory trajectory, or management targets. A bank with 14% CET1 that intends to grow assets aggressively may need most of that capital to support growth, leaving little true excess. Another common mistake is valuing excess capital at 1.0x without discounting for the time and uncertainty of capital return. If a bank is unlikely to return capital for several years (due to growth plans, regulatory constraints, or management reluctance), the present value of the excess capital is less than face value. Ignoring stress test implications is also problematic; a bank may appear to have excess capital based on reported ratios, but the Fed's stress capital buffer may effectively require a higher CET1 than the statutory minimum.",
    "acrossBankTypes": "Large banks subject to Fed stress tests are the natural application for this model because their capital return capacity is explicitly determined by CCAR results. Regional banks with strong capital positions and limited growth opportunities may also be good candidates, as they have both the excess capital and the potential willingness to return it. Community banks are less commonly analyzed with this model because their capital management is less formalized and their regulatory capital framework (particularly under CBLR) is simpler. Mutual holding companies and recently converted thrifts are sometimes evaluated with an excess capital framework because they may carry substantial capital from the conversion process.",
    "faqTeasers": [
      {
        "question": "How do I tell if a bank stock is overvalued or undervalued?",
        "teaser": "Multiple valuation methods, including the Excess Capital Return Model, P/B, and earnings-based approaches, can be compared to provide a range of fair value estimates.",
        "faqSlug": "how-to-tell-overvalued-undervalued",
        "faqCluster": "valuation"
      },
      {
        "question": "What happens if a bank falls below minimum capital requirements?",
        "teaser": "Regulatory capital requirements define the floor that separates required capital from excess capital in the Excess Capital Return Model, making capital adequacy rules central to this valuation approach.",
        "faqSlug": "what-happens-below-minimum-capital",
        "faqCluster": "capital-and-risk"
      }
    ],
    "relatedMetrics": [
      "cet1-capital-ratio",
      "tier-1-capital-ratio",
      "tangible-common-equity-ratio",
      "roe",
      "equity-to-assets",
      "dividend-payout-ratio",
      "risk-weighted-assets-density"
    ]
  },
  {
    "slug": "discounted-earnings-model",
    "name": "Discounted Earnings Model",
    "type": "Intrinsic Value Method",
    "shortDescription": "Estimates intrinsic value by discounting projected future earnings to present value, adapted for bank-specific considerations like provision normalization and capital-constrained growth",
    "description": "The Discounted Earnings Model estimates a bank's intrinsic value by projecting future earnings and discounting them to present value at the cost of equity. For banks, this approach is preferred over discounted cash flow (DCF) because free cash flow is not a meaningful concept for financial institutions; banks do not have capital expenditures in the traditional sense, and the distinction between operating and financing activities is blurred. Instead, earnings (or dividends, which for banks are constrained by regulatory capital requirements) serve as the proxy for value creation. The model typically projects earnings for 5 to 10 years and adds a terminal value.",
    "formula": "Intrinsic Value = Sum of [Projected Earnings_t / (1 + r)^t] + Terminal Value / (1 + r)^n",
    "isPercentage": false,
    "formulaExplanation": "For each projected year t, estimate net income available to common shareholders. Discount each year's earnings by the cost of equity (r) raised to the power of the corresponding year. The terminal value is typically calculated using a terminal P/E multiple applied to the final projected year's earnings, or using the Gordon Growth formula: Terminal Value = Final Year Earnings x (1 + g) / (r - g), where g is the long-term sustainable growth rate. Sum the present values of all projected earnings and the terminal value. Divide by shares outstanding to get intrinsic value per share.",
    "steps": [
      "Establish a base earnings level by normalizing the bank's most recent annual earnings. Adjust for unusual items such as outsized provision releases or charges, securities gains/losses, legal settlements, and restructuring costs. Pre-provision net revenue (PPNR) is a useful starting point, to which a normalized provision and tax rate are applied.",
      "Project earnings for 5 to 10 years. Key assumptions include loan growth rate (typically tied to nominal GDP growth or the bank's historical growth rate), NIM trajectory (considering the rate environment), fee income growth, expense growth (incorporating efficiency improvements), and provision normalization (returning to a through-cycle average provision-to-loan ratio).",
      "Apply capital constraints to growth projections. A bank cannot grow assets faster than its capital base unless it raises external equity. Sustainable asset growth is constrained by ROE x Retention Ratio / (Equity-to-Assets Ratio). If projected loan growth exceeds this, the bank will either need to raise capital or reduce its payout ratio.",
      "Select an appropriate cost of equity for discounting. For most banks, 10% to 13% is a reasonable range, depending on size, asset quality, earnings volatility, and systemic risk. Use the Capital Asset Pricing Model (CAPM) or build-up method to estimate if needed.",
      "Calculate terminal value using either a terminal P/E multiple (8x to 14x for banks, depending on quality) or the Gordon Growth formula with a long-term growth rate of 2% to 4%. Discount the terminal value and all projected earnings to present value. Sum the components and divide by shares outstanding."
    ],
    "example": "A bank earned $500 million in the most recent year. After normalizing for an unusually low provision, normalized earnings are estimated at $450 million. Earnings are projected to grow at 5% annually for 5 years, producing projected earnings of $450M, $472.5M, $496.1M, $520.9M, and $547.0M. A terminal P/E of 10x is applied to Year 5 earnings: Terminal Value = $547M x 10 = $5.47 billion. Using a 12% cost of equity, the present value of the 5 years of earnings is approximately $1.74 billion, and the present value of the terminal value is approximately $3.10 billion. Total intrinsic value = $1.74B + $3.10B = $4.84 billion. With 200 million shares outstanding, intrinsic value per share is approximately $24.20.",
    "strengths": [
      "Provides a forward-looking valuation that explicitly models the bank's future earnings trajectory, incorporating expected changes in NIM, credit costs, and growth rather than relying solely on current metrics.",
      "Allows explicit modeling of credit cycle dynamics. Earnings projections can incorporate a normalization of provisions from current levels to through-cycle averages, capturing value that point-in-time metrics like P/E may miss.",
      "Adaptable to different scenarios. Multiple earnings paths (base case, optimistic, pessimistic) can be modeled to produce a range of intrinsic values, helping investors understand the sensitivity of value to key assumptions.",
      "Incorporates capital constraints naturally. The projection of earnings growth can be bounded by the bank's ability to generate capital internally, reflecting the regulatory reality that capital adequacy limits growth."
    ],
    "limitations": [
      "Highly sensitive to assumptions about future NIM, credit costs, and growth. Small changes in these inputs compound over the projection period and can produce large changes in intrinsic value, particularly through the terminal value.",
      "Terminal value often represents 50% to 70% of total intrinsic value, meaning the valuation is heavily dependent on assumptions about long-term earnings power and the terminal multiple or growth rate. This reduces the precision of the model.",
      "Does not explicitly capture the value of excess capital (unlike the Excess Capital Return Model) unless the projection incorporates capital return assumptions. A bank with significant excess capital may be undervalued by a straight earnings projection if the excess capital is not factored in.",
      "Provision normalization is one of the most critical and subjective assumptions. Estimating the through-cycle provision rate requires judgment about future credit conditions, underwriting quality, and the loan mix. Using the wrong provision assumption can significantly distort the valuation.",
      "Free cash flow metrics used in industrial company DCF models are not applicable to banks. Substituting earnings for cash flow introduces conceptual imprecision because not all earnings are distributable (some must be retained to support growth and capital requirements)."
    ],
    "bankSpecific": "The Discounted Earnings Model is adapted specifically for banks because the standard DCF framework does not apply well to financial institutions. Banks do not have traditional capital expenditures, working capital cycles, or operating free cash flow in the industrial sense. Their primary \"investment\" is growing the loan book, which is funded by deposits and other liabilities rather than retained cash flow. Earnings (or distributable earnings, after capital retention) are the appropriate measure of value creation. The model must account for the regulatory capital constraint: a bank cannot grow earnings indefinitely without retaining sufficient capital, and dividend capacity is regulated. The provision for credit losses introduces cyclicality that must be normalized for the projection to reflect sustainable earnings power.",
    "relatedMethods": [
      "dividend-discount-model",
      "price-to-earnings-valuation",
      "excess-capital-return-model",
      "gordon-growth-model"
    ],
    "whenToUse": "The Discounted Earnings Model is most appropriate when the bank's current earnings are significantly above or below normalized levels (making point-in-time P/E unreliable), when the bank is undergoing a strategic transformation that will change its earnings profile over time, or when building detailed scenario analyses to stress-test valuation under different credit cycle and rate environment assumptions. It is less useful for quick screening or when the bank's earnings are already at normalized levels and a simple P/E or P/B comparison is sufficient.",
    "methodConnections": "The Discounted Earnings Model is conceptually similar to the Dividend Discount Model, but uses total earnings rather than just dividends. If the retention ratio is applied to the earnings projection, the Discounted Earnings Model converges to the DDM. The Gordon Growth Model is a simplified single-stage version of the Discounted Earnings Model with constant growth. The terminal value in the Discounted Earnings Model is often calculated using the Gordon Growth formula or a terminal P/E multiple, directly connecting to those frameworks. The Excess Capital Return Model complements the Discounted Earnings approach by separately valuing capital above regulatory requirements.",
    "commonMistakes": "The most common error is projecting earnings growth without checking whether the bank has sufficient capital to support that growth. If projected asset growth requires the bank to retain most of its earnings, the effective distributable earnings (and therefore the value to shareholders) are lower than headline earnings suggest. Another frequent mistake is failing to normalize provisions; using a single year's provision as the basis for all projected years ignores the credit cycle and produces overly optimistic or pessimistic projections depending on where in the cycle the analysis begins. Applying industrial-company DCF mechanics (operating free cash flow, WACC discounting) to banks is a fundamental methodological error.",
    "acrossBankTypes": "The Discounted Earnings Model works across all bank types but requires different calibration. For large banks with stable, diversified earnings, the projection period can be shorter (5 years) because earnings are more predictable and the terminal value is more reliable. For community and regional banks with more concentrated portfolios and more volatile earnings, longer projection periods (7 to 10 years) may be needed to capture a full credit cycle. Banks in turnaround situations require particular care in projecting the trajectory from current (depressed) earnings back to normalized levels.",
    "faqTeasers": [
      {
        "question": "What is intrinsic value and how do I estimate it for a bank?",
        "teaser": "The Discounted Earnings Model estimates intrinsic value by projecting future earnings and discounting them to present value, adapted for bank-specific dynamics like provision cycles and capital constraints.",
        "faqSlug": "intrinsic-value-for-banks",
        "faqCluster": "valuation"
      },
      {
        "question": "Why is bank valuation different from valuing other companies?",
        "teaser": "Banks require earnings-based or book-value-based models rather than traditional DCF because free cash flow is not a meaningful concept for financial institutions.",
        "faqSlug": "why-bank-valuation-is-different",
        "faqCluster": "valuation"
      }
    ],
    "relatedMetrics": [
      "earnings-per-share",
      "roe",
      "roaa",
      "net-interest-margin",
      "pre-provision-net-revenue",
      "provision-to-average-loans",
      "non-performing-loans-ratio",
      "net-charge-off-ratio",
      "cost-of-funds"
    ]
  },
  {
    "slug": "gordon-growth-model",
    "name": "Gordon Growth Model (Bank Application)",
    "type": "Intrinsic Value Method",
    "shortDescription": "A simplified dividend discount model that values bank stocks using a constant growth rate, connecting dividend yield, ROE, and retention ratio to estimate fair value",
    "description": "The Gordon Growth Model (also called the Gordon Dividend Discount Model or constant-growth DDM) estimates the fair value of a stock as the next period's expected dividend divided by the difference between the cost of equity and the expected dividend growth rate. Applied to banks, the model connects directly to fundamental banking metrics: the sustainable growth rate equals ROE times the retention ratio, and the dividend equals EPS times the payout ratio. The model provides a straightforward closed-form valuation that is particularly useful for mature banks with stable dividend policies.",
    "formula": "P = D1 / (r - g), where D1 = EPS x Payout Ratio x (1 + g), r = Cost of Equity, g = ROE x Retention Ratio",
    "isPercentage": false,
    "formulaExplanation": "D1 is the expected dividend per share in the next period, calculated as the current dividend grown by the sustainable growth rate (or as projected EPS times the target payout ratio). The cost of equity (r) is the required return for holding the stock, typically estimated at 10% to 13% for banks using CAPM or build-up approaches. The sustainable growth rate (g) equals ROE times the retention ratio (1 - payout ratio), representing the rate at which book value grows through retained earnings. The model assumes both the growth rate and cost of equity are constant forever, making it a perpetuity formula.",
    "steps": [
      "Estimate sustainable ROE for the bank. Use a normalized, through-cycle ROE that reflects the bank's long-term earning power. For most US banks, sustainable ROE falls between 9% and 15% depending on the institution's profitability and capital structure.",
      "Determine the target payout ratio. Examine the bank's historical dividend payout ratio, management guidance on capital return, and regulatory constraints. Most US banks target payout ratios between 30% and 50% of earnings. Calculate the retention ratio as 1 minus the payout ratio.",
      "Calculate the sustainable growth rate: g = ROE x Retention Ratio. For example, a bank with 12% ROE and a 40% payout ratio has a sustainable growth rate of 12% x 60% = 7.2%. Verify that this growth rate is reasonable relative to nominal GDP growth and the bank's historical book value growth.",
      "Estimate the cost of equity. Use CAPM (Risk-Free Rate + Beta x Market Risk Premium) or a build-up method. For most banks, 10% to 13% is a reasonable range. The cost of equity must exceed the growth rate for the model to produce a positive, finite value.",
      "Calculate the intrinsic value: P = D1 / (r - g). D1 = Current DPS x (1 + g), or projected EPS x payout ratio. Divide the intrinsic value by the current price to assess the margin of safety. Perform sensitivity analysis across a range of ROE, payout ratio, and cost of equity assumptions."
    ],
    "example": "A bank has EPS of $3.50, pays a $1.40 annual dividend (40% payout ratio), and has sustainable ROE of 12%. Retention ratio = 60%. Sustainable growth rate = 12% x 60% = 7.2%. Cost of equity = 11%. D1 = $1.40 x (1 + 7.2%) = $1.50. Intrinsic value = $1.50 / (11% - 7.2%) = $1.50 / 3.8% = $39.47. If the stock trades at $33.00, the model suggests approximately 20% upside. Note the sensitivity: if the cost of equity were 12% instead of 11%, intrinsic value falls to $1.50 / 4.8% = $31.25, and the stock appears fairly valued.",
    "strengths": [
      "Provides a simple, closed-form valuation that connects directly to observable bank fundamentals: ROE, payout ratio, and cost of equity. No multi-year projection or complex modeling is required.",
      "Makes the relationship between profitability and value explicit. The model shows precisely how changes in ROE, payout, and cost of equity affect fair value, making it a powerful tool for sensitivity analysis.",
      "Naturally incorporates the capital constraint faced by banks. The sustainable growth rate (ROE x retention ratio) cannot be exceeded without raising external capital or reducing the capital ratio, reflecting regulatory reality.",
      "Useful for quick screening across a large number of bank stocks. By calculating the implied valuation for each bank using standardized assumptions, an investor can rapidly identify potential over- or under-valuations."
    ],
    "limitations": [
      "Assumes constant growth forever, which is unrealistic for any company. Banks go through credit cycles, rate environments, and strategic changes that cause growth and profitability to vary over time. The model works best for mature banks with stable fundamentals.",
      "Extremely sensitive to the gap between cost of equity (r) and growth rate (g). Because the denominator is (r - g), small changes in either input produce large swings in estimated value. A bank with g close to r produces an implausibly high valuation.",
      "Does not account for excess capital, one-time items, or changes in capital structure. A bank with substantial excess capital beyond what the model's growth rate requires is undervalued by the Gordon Growth Model because the excess capital is not captured.",
      "Requires that g < r for the formula to work. Banks with very high ROE and high retention ratios may produce sustainable growth rates that approach or exceed reasonable cost of equity estimates, making the model inapplicable without adjustment.",
      "Ignores the possibility that the bank's payout ratio or ROE will change over time. A bank that currently pays 30% of earnings but plans to increase to 50% as it reaches target capital levels will have a different valuation trajectory than the constant-payout model assumes."
    ],
    "bankSpecific": "The Gordon Growth Model is particularly well-suited to bank valuation because the sustainable growth rate formula (ROE x retention ratio) maps directly to how banks actually grow. Banks grow book value through retained earnings; the portion of earnings not paid as dividends is retained and supports asset growth (through the leverage multiplier). Regulatory capital requirements constrain this growth: a bank cannot grow faster than its capital base supports without raising equity. The Gordon Growth Model captures this constraint naturally. For banks with stable ROE and dividend policies, the model produces reasonable valuations with minimal complexity. It also underpins the justified P/B and P/E frameworks: rearranging the Gordon formula shows that P/B = (ROE - g) / (r - g) and P/E = Payout / (r - g).",
    "relatedMethods": [
      "dividend-discount-model",
      "roe-pb-framework",
      "discounted-earnings-model",
      "price-to-book-valuation"
    ],
    "whenToUse": "The Gordon Growth Model is best applied to mature, stable banks with consistent ROE, predictable dividend policies, and limited near-term disruptions to earnings or growth. It is ideal for quick valuation estimates and sensitivity analysis. It is less appropriate for banks in turnaround situations, banks with temporarily depressed or elevated earnings, banks planning significant capital structure changes, or high-growth banks where the constant-growth assumption does not hold. For banks with changing fundamentals, a multi-stage DDM or Discounted Earnings Model is more appropriate.",
    "methodConnections": "The Gordon Growth Model is a single-stage special case of the Dividend Discount Model, assuming constant growth. It directly underpins the justified P/B framework: rearranging P = D1 / (r - g) and substituting D1 = BV x ROE x Payout and g = ROE x (1 - Payout) yields P/B = (ROE - g) / (r - g). Similarly, P/E = Payout / (r - g). The model is also the formula used for terminal value in multi-stage Discounted Earnings Models and multi-stage DDMs. The Excess Capital Return Model complements the Gordon Growth Model by capturing value from capital above what the growth rate requires.",
    "commonMistakes": "The most critical error is using a growth rate too close to the cost of equity, which produces implausibly large valuations. The growth rate should be bounded by long-term nominal GDP growth (typically 4% to 5%) regardless of what ROE x retention ratio yields, because no bank can grow faster than the economy indefinitely. Another common mistake is using trailing ROE without assessing whether it is sustainable. If ROE is temporarily elevated (due to low provisions or one-time gains), the model will overvalue the stock. Using a normalized, through-cycle ROE is essential. Ignoring the sensitivity of the model to small input changes is also problematic; presenting a single point estimate without a range overstates the model's precision.",
    "acrossBankTypes": "The Gordon Growth Model works best for large, mature banks with stable dividend histories and predictable earnings. Money center banks, large regionals, and consistently profitable community banks are good candidates. It is less reliable for high-growth banks (where the constant-growth assumption breaks down), turnaround situations (where current metrics do not reflect future fundamentals), and banks with irregular dividend policies. For banks that return capital primarily through buybacks rather than dividends, the model may understate intrinsic value unless buybacks are incorporated into the payout ratio or a total shareholder yield framework is used.",
    "faqTeasers": [
      {
        "question": "How does the dividend discount model work for bank stocks?",
        "teaser": "The Gordon Growth Model is the simplest form of dividend discount model, estimating fair value from the expected dividend, cost of equity, and sustainable growth rate derived from ROE and retention ratio.",
        "faqSlug": "dividend-discount-model-for-banks",
        "faqCluster": "valuation"
      },
      {
        "question": "What is the relationship between ROE, payout ratio, and dividend growth?",
        "teaser": "The Gordon Growth Model makes this relationship explicit: sustainable dividend growth equals ROE times the retention ratio, directly linking profitability to dividend growth capacity.",
        "faqSlug": "roe-payout-ratio-dividend-growth",
        "faqCluster": "dividends"
      }
    ],
    "relatedMetrics": [
      "roe",
      "dividend-payout-ratio",
      "earnings-per-share",
      "book-value-per-share",
      "price-to-book",
      "price-to-earnings"
    ]
  },
  {
    "slug": "dupont-decomposition",
    "name": "DuPont Decomposition for Banks",
    "type": "Fundamental Valuation Framework",
    "shortDescription": "Breaks ROE into component drivers adapted for bank financial structure, revealing how profit margins, asset utilization, and leverage each contribute to return on equity",
    "description": "DuPont Decomposition for Banks breaks Return on Equity (ROE) into its component drivers to identify the sources of a bank's profitability. The standard three-factor DuPont identity (Profit Margin x Asset Turnover x Equity Multiplier) is adapted for banking because banks have fundamentally different financial structures than industrial companies. The decomposition reveals whether a bank's ROE is driven by operating efficiency (margin), productive use of assets (utilization), or financial leverage (equity multiplier), providing diagnostic insight that a single ROE figure cannot.",
    "formula": "ROE = Net Profit Margin x Asset Utilization x Equity Multiplier = (Net Income / Revenue) x (Revenue / Average Assets) x (Average Assets / Average Equity)",
    "isPercentage": true,
    "formulaExplanation": "The three factors multiply together to produce ROE. Net Profit Margin equals net income divided by total revenue (net interest income plus non-interest income); it measures how much of each revenue dollar is retained as profit after expenses, provisions, and taxes. Asset Utilization equals total revenue divided by average total assets; it measures how much revenue the bank generates per dollar of assets. The Equity Multiplier equals average total assets divided by average equity; it measures financial leverage. A bank with 10x leverage (equity multiplier of 10) funds each dollar of equity with $10 of assets. The product of these three components always equals ROE.",
    "steps": [
      "Calculate total revenue as net interest income plus non-interest income. Calculate Net Profit Margin = Net Income / Total Revenue. This captures the combined effect of the efficiency ratio, the provision-to-revenue ratio, and the tax rate. A higher margin indicates better cost control, lower credit costs, and/or more favorable tax treatment.",
      "Calculate Asset Utilization = Total Revenue / Average Total Assets. For banks, this ratio is typically much lower than for industrial companies because banks' assets are primarily financial instruments (loans, securities) that generate interest income, not physical assets. Asset utilization for banks typically ranges from 3% to 6%.",
      "Calculate Equity Multiplier = Average Total Assets / Average Equity. This measures leverage. Banks are inherently leveraged; equity multipliers of 8x to 14x are typical, meaning banks fund each dollar of equity with $8 to $14 of assets. Higher leverage amplifies both returns and risks.",
      "Verify that Net Profit Margin x Asset Utilization x Equity Multiplier = ROE (within rounding). Then compare each component to peers and to the bank's own history to identify which factors are driving ROE above or below peers, and whether changes in ROE over time are driven by margin improvement, revenue generation, or leverage changes.",
      "For deeper analysis, decompose the profit margin further into its components: the efficiency ratio (non-interest expense / revenue), the provision-to-revenue ratio (provision / revenue), and the tax rate effect. This five-factor decomposition reveals whether margin changes are driven by expense control, credit costs, or tax rate changes."
    ],
    "example": "Bank A has net income of $600 million, revenue of $3 billion, average assets of $60 billion, and average equity of $5 billion. Net Profit Margin = $600M / $3B = 20%. Asset Utilization = $3B / $60B = 5.0%. Equity Multiplier = $60B / $5B = 12x. ROE = 20% x 5.0% x 12 = 12.0%. Bank B has net income of $600M, revenue of $2.4B, average assets of $60B, and average equity of $5B. Net Profit Margin = $600M / $2.4B = 25%. Asset Utilization = $2.4B / $60B = 4.0%. Equity Multiplier = 12x. ROE = 25% x 4.0% x 12 = 12.0%. Both banks have 12% ROE, but Bank A generates more revenue per dollar of assets (higher utilization) while Bank B keeps more of each revenue dollar as profit (higher margin). This distinction has implications for sustainability and risk.",
    "strengths": [
      "Transforms a single ROE number into a diagnostic framework that reveals the specific sources of profitability, enabling targeted comparisons across banks and identification of improvement opportunities.",
      "Highlights the leverage component of ROE explicitly. Two banks with identical ROE may have very different risk profiles if one achieves its ROE through higher margins and the other through higher leverage. The DuPont decomposition makes this visible.",
      "Enables trend analysis of ROE drivers over time. If a bank's ROE has improved from 10% to 13%, the decomposition reveals whether the improvement came from better margins (positive), higher revenue generation (positive), or increased leverage (potentially concerning).",
      "Provides a bridge between operational metrics (efficiency ratio, NIM, provision levels) and the headline profitability measure (ROE), helping investors understand the transmission mechanism from operations to returns."
    ],
    "limitations": [
      "The standard three-factor decomposition is somewhat coarse for banks. Revenue for a bank includes both net interest income and non-interest income, which have very different drivers and characteristics. Lumping them together in the utilization ratio obscures important distinctions.",
      "The equity multiplier component reflects both intentional leverage management and regulatory capital requirements. Banks cannot freely choose their leverage; capital requirements impose constraints. Interpreting high leverage as purely a management choice is inaccurate.",
      "DuPont Decomposition is a diagnostic tool, not a valuation method. It explains why ROE is at its current level but does not directly indicate whether the stock is over- or undervalued. It must be combined with a valuation framework (P/B, DDM, etc.) to reach investment conclusions.",
      "The decomposition treats all revenue and assets equally. It does not distinguish between high-quality, sustainable revenue and volatile or one-time revenue sources. A bank with temporarily inflated revenue from trading gains will appear to have higher asset utilization without a sustainable improvement.",
      "Cross-bank comparisons using DuPont components can be misleading if the banks have fundamentally different business models (e.g., comparing a money center bank with significant trading revenue to a community bank focused on relationship lending)."
    ],
    "bankSpecific": "DuPont Decomposition is particularly valuable for banks because bank ROE is driven by a unique combination of factors that differ fundamentally from industrial companies. Banks operate with much higher leverage (equity multipliers of 8x to 14x vs. 2x to 4x for most industrial companies), lower asset turnover (because their assets are financial instruments, not inventory or equipment), and profit margins that are heavily influenced by the provision for credit losses (an expense category that does not exist for non-financial companies). Understanding which DuPont component is driving a bank's ROE is essential for assessing the quality and sustainability of its profitability. A bank with strong ROE driven by margin and utilization is typically better positioned than one relying on leverage.",
    "relatedMethods": [
      "roe-pb-framework",
      "peer-comparison",
      "price-to-book-valuation",
      "price-to-tangible-book-valuation"
    ],
    "whenToUse": "DuPont Decomposition should be applied whenever analyzing a bank's profitability in depth, comparing profitability across a peer group, or diagnosing changes in ROE over time. It is not a standalone valuation method but rather an analytical framework that informs valuation by revealing the quality of ROE. Use it alongside the ROE-P/B framework, Peer Comparison, or the justified P/B formula to connect DuPont-derived insights to valuation conclusions.",
    "methodConnections": "DuPont Decomposition is the analytical foundation for the ROE-P/B framework. The justified P/B multiple depends on sustainable ROE, and the DuPont decomposition reveals whether ROE is driven by sustainable factors (margin, utilization) or potentially unsustainable ones (leverage). The Peer Comparison method uses DuPont components to explain why banks deserve different multiples: a bank with higher ROE driven by superior margins deserves a higher P/B than one with the same ROE driven by higher leverage. The ROTCE variant of the DuPont decomposition (decomposing ROTCE into its components) connects to P/TBV valuation in the same way.",
    "commonMistakes": "The most common error is decomposing ROE and then focusing on only one component without considering the interactions between them. A declining equity multiplier (deleveraging) is not automatically negative if it reflects intentional capital building that positions the bank for future growth or capital return. Another frequent mistake is comparing DuPont components across banks with very different business models; the typical asset utilization for a community bank focused on lending is structurally different from a money center bank with significant non-interest income, and this difference does not indicate that one is better managed than the other. Failing to extend the decomposition beyond three factors misses important detail; breaking the profit margin into its expense, provision, and tax components provides much richer analytical insight.",
    "acrossBankTypes": "Community banks typically show higher asset utilization (4% to 6%) because their earning assets are primarily loans (which yield more than securities) and they have limited non-earning assets. Large banks show lower asset utilization (3% to 5%) because of larger securities portfolios and more non-earning assets. Equity multipliers tend to be higher at large banks (10x to 14x) than at well-capitalized community banks (8x to 10x). Profit margins vary based on efficiency, credit quality, and fee income levels across all bank types. The DuPont framework reveals these structural differences and helps investors compare profitability on a like-for-like basis.",
    "faqTeasers": [
      {
        "question": "What is the DuPont decomposition and how does it apply to banks?",
        "teaser": "DuPont breaks ROE into profit margin, asset utilization, and leverage, revealing whether a bank's profitability comes from operating skill or financial structure.",
        "faqSlug": "dupont-decomposition-for-banks",
        "faqCluster": "profitability"
      },
      {
        "question": "What is the ROE-P/B valuation framework and how does it work?",
        "teaser": "The ROE-P/B framework connects profitability to valuation; DuPont Decomposition reveals the quality of the ROE that drives the justified P/B multiple.",
        "faqSlug": "roe-pb-framework-explained",
        "faqCluster": "valuation"
      }
    ],
    "relatedMetrics": [
      "roe",
      "roaa",
      "net-interest-margin",
      "efficiency-ratio",
      "equity-to-assets",
      "return-on-tangible-common-equity",
      "net-overhead-ratio",
      "non-interest-income-to-revenue"
    ]
  }
];

export default VALUATION_METHODS;

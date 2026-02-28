/**
 * Metrics Content Data
 * Educational content for all financial metrics used in BankSift
 * All content is original and copyright-free for commercial use
 */

export const METRICS = [
  {
    "slug": "roe",
    "name": "Return on Equity (ROE)",
    "category": "profitability",
    "categoryLabel": "Profitability Ratio",
    "formula": "ROE = Net Income / Average Shareholders' Equity",
    "isPercentage": true,
    "shortDescription": "Measures how much profit a bank earns for each dollar of shareholder equity. One of banking's most watched profitability metrics because it captures both operating performance and the effect of leverage in a single number.",
    "description": "Return on Equity (ROE) measures how much profit a bank generates for every dollar of shareholder equity. If a bank has $1 billion in equity and earns $120 million in net income, its ROE is 12% — meaning it produced twelve cents of profit for each dollar shareholders have invested.\n\nShareholder equity is the difference between what a bank owns (its assets) and what it owes (its liabilities). It represents the ownership stake that belongs to shareholders after all debts are accounted for. ROE tells you how productively a bank puts that ownership capital to work.\n\nFor bank investors, ROE is one of the first metrics to check because banks are inherently leveraged businesses. A bank takes in deposits, borrows from other sources, and uses that combined funding to make loans and investments. The relatively thin slice of equity supporting a much larger base of assets means that even modest differences in operating performance translate into meaningful differences in ROE. This is what makes ROE both informative and potentially misleading: it reflects genuine management skill and leverage simultaneously.\n\nWhether a bank creates or destroys shareholder value depends largely on whether its ROE exceeds its cost of equity. Most banks face an estimated cost of equity around 10%, meaning they need to earn at least that much on shareholder capital to justify the risk investors are taking. A bank consistently earning 13% ROE is creating roughly three percentage points of excess return for shareholders each year. One earning 7% is falling short, and its stock price will typically reflect that shortfall through a lower price-to-book multiple.",
    "formulaExplanation": "Net Income is the bank's trailing twelve month (TTM) profit after all expenses, taxes, and provisions for loan losses have been deducted. It captures the bottom-line earnings available to common shareholders.\n\nAverage Shareholders' Equity is calculated using a 5-point average of quarterly balance sheet values, following Federal Financial Institutions Examination Council (FFIEC) methodology. The 5-point average takes the equity balance at the end of each of the last five quarters (the current quarter plus the four preceding quarters) and divides by five. This smoothing approach prevents a single quarter's unusual equity balance — from a large stock buyback, a capital raise, or a one-time accounting adjustment — from distorting the ratio.",
    "interpretation": "ROE shows how well a bank converts shareholder capital into profits. A bank posting 12% ROE is generating $12 of annual profit for every $100 of equity on its balance sheet. Banks with consistently high ROE are generally better at deploying capital and generating returns for shareholders.\n\nContext matters when reading ROE. A bank might show a high ROE because its operations are genuinely efficient, or because it holds relatively little equity against its asset base (higher leverage). Conversely, a bank with modest ROE might be holding excess capital above regulatory minimums as a deliberate buffer, compressing the ratio despite solid underlying performance. Tracking ROE over several years reveals whether a bank's profitability is stable, improving, or eroding, since a single quarter can be distorted by one-time items.\n\nWhen evaluating a bank, the most telling approach is to look at the ROE trend over multiple years rather than any single period. A bank maintaining 12% ROE through varying interest rate environments and credit cycles is demonstrating durable profitability. One that swings from 15% to 5% across cycles may be taking concentrated risks that pay off in good times but hurt during downturns. Comparing a bank's ROE to its own historical average often reveals more than comparing it to other banks, since different business models produce structurally different ROE levels.",
    "typicalRange": "Well-managed banks typically achieve ROE between 8% and 15%. Banks consistently above 12% are generally considered strong performers, while those in the 8-10% range are adequate but not exceptional. ROE below 8% often signals that a bank is struggling with some combination of weak earnings, high costs, or credit problems — though banks intentionally holding excess capital may fall below this range without any operational weakness.\n\nTop-performing banks occasionally push above 15%, but sustained ROE much beyond that level deserves scrutiny. Extremely high ROE sometimes reflects thin capitalization rather than operational excellence. During favorable credit environments, many banks cluster in the 10-14% range, while industry-wide ROE tends to compress during recessions as loan losses rise and net income falls.",
    "goodBad": {
      "good": "ROE above 10-12% generally indicates strong profitability and efficient capital use. Banks consistently hitting this range are covering their cost of equity and creating value for shareholders. When paired with stable or improving asset quality and adequate capital ratios, high ROE is one of the strongest signals of a well-run bank.",
      "bad": "ROE below 6-8% suggests the bank may be struggling with weak earnings, high costs, or elevated credit losses. At these levels, the bank is likely not earning its cost of equity, meaning shareholders could theoretically earn better returns elsewhere for a similar level of risk. Persistent low ROE often shows up alongside other warning signs like a high efficiency ratio, rising non-performing loans, or shrinking net interest margins."
    },
    "considerations": [
      "Compare ROE within peer groups of similar-sized banks with similar business models. A community bank focused on commercial real estate lending operates in a different risk-return environment than a money center bank with large trading operations, and their ROE figures reflect those structural differences.",
      "Very high ROE might indicate thin capital buffers or elevated risk levels. Check the equity-to-assets ratio alongside ROE to distinguish banks that are genuinely efficient from those that are simply running with less cushion against losses.",
      "Declining ROE over time may signal deteriorating profitability, increasing competition, or margin compression. Look at whether the decline is driven by the numerator (falling net income) or the denominator (growing equity from retained earnings or capital raises) — each tells a different story.",
      "Regulatory capital requirements set a floor on how much equity a bank must hold, which in turn places an effective ceiling on ROE. Banks subject to enhanced prudential standards or stress-testing requirements may carry additional capital buffers that compress their ROE relative to less-regulated peers.",
      "One-time items can significantly distort ROE in any single period. Gains from securities sales, litigation settlements, tax adjustments, or large provision releases can temporarily inflate the ratio, while goodwill impairments or restructuring charges can depress it. Trailing twelve-month figures help smooth these effects but do not eliminate them entirely."
    ],
    "relatedMetrics": [
      "roaa",
      "efficiency-ratio",
      "equity-to-assets",
      "net-interest-margin",
      "dividend-payout-ratio",
      "return-on-tangible-common-equity",
      "price-to-book",
      "price-to-earnings"
    ],
    "relatedMetricDescriptions": {
      "roaa": "Complements ROE by measuring profitability against total assets, removing the effect of leverage. Comparing ROE and ROAA together reveals how much of a bank's return to shareholders is driven by operations versus capital structure.",
      "efficiency-ratio": "Cost management directly impacts net income, which is the numerator of ROE. Banks with lower efficiency ratios convert more of their revenue into profit, supporting higher ROE.",
      "equity-to-assets": "Capital levels determine leverage — a key component that amplifies or constrains ROE. Examining equity-to-assets alongside ROE distinguishes genuinely profitable banks from those boosting returns through thin capitalization.",
      "net-interest-margin": "NIM is the primary revenue driver for most banks, making it the single largest influence on the net income that feeds into ROE.",
      "dividend-payout-ratio": "The payout ratio determines how much of ROE translates into retained earnings growth — the link between current profitability and a bank's sustainable capital generation rate.",
      "return-on-tangible-common-equity": "ROTCE removes goodwill and other intangibles from the equity base, providing a cleaner profitability view for banks with significant acquisition histories where goodwill inflates the ROE denominator.",
      "price-to-book": "ROE is the primary determinant of a bank's price-to-book multiple. Banks with higher ROE consistently trade at higher P/B ratios, a relationship formalized in the ROE-P/B valuation framework.",
      "price-to-earnings": "Connected to ROE through the identity P/B = P/E x ROE. Knowing any two of these three ratios lets you derive the third, making P/E and ROE complementary lenses on the same valuation question."
    },
    "dataSource": "Net Income is summed from the four most recent quarterly filings to produce a trailing twelve-month figure that smooths out seasonal patterns in bank earnings. Equity values are averaged from five consecutive quarterly balance sheets using the FFIEC standard 5-point averaging method.\n\nBoth figures are sourced from regulatory filings (Call Reports for banks and Y-9C reports for holding companies), which provide standardized data across all FDIC-insured institutions. Using regulatory filings rather than GAAP financial statements ensures consistency when comparing banks, since Call Report definitions are uniform across the industry.",
    "bankSpecificContext": "## Why Leverage Matters More in Banking\n\nBanks are among the most leveraged businesses in the economy, typically operating with equity-to-asset ratios of 8-12%. Because of this inherent leverage, ROE for banks reflects both management quality and the degree of leverage employed. Regulatory capital requirements set a floor on equity levels, which in turn caps the maximum ROE a bank can achieve at a given level of asset profitability.\n\nA bank earning 1% return on average assets (ROAA) with a 10:1 asset-to-equity ratio produces a 10% ROE. The same ROAA at a 12:1 ratio produces 12% ROE, but regulators may view the thinner capital cushion with concern. This dynamic makes ROE a useful but incomplete measure of bank performance when viewed in isolation.\n\nMost non-financial companies operate with far less leverage, so their ROE is driven primarily by operating margins and asset turnover. For banks, the leverage component dominates. A technology company and a bank could both report 12% ROE, but the bank is typically running with 10-12x leverage while the tech company might have little or no debt. The risk profile behind that identical ROE figure is fundamentally different.\n\n## Separating Profitability from Leverage\n\nThis leverage sensitivity is why experienced bank analysts almost always examine ROE alongside ROAA. ROAA strips out the leverage effect and isolates the bank's ability to generate profit from its asset base. Two banks reporting identical 12% ROE could have very different risk profiles: one might be earning 1.2% ROAA with 10x leverage, while the other earns 0.8% ROAA with 15x leverage. The first bank is more profitable on a fundamental level; the second is amplifying weaker operations through thinner capitalization.\n\n## Regulatory Capital's Effect on ROE\n\nRegulatory requirements create a constraint on bank ROE that has no parallel in most other industries. Banks must maintain minimum capital ratios (Common Equity Tier 1, total capital, leverage ratios), and many choose or are required to hold buffers above those minimums. Every dollar of excess capital above what the business requires for lending dilutes ROE.\n\nAfter the 2008 financial crisis, regulators significantly raised capital requirements, and the industry's average ROE declined accordingly. Pre-crisis, many large banks regularly posted ROE above 15%; post-crisis, 10-13% became the more typical range for well-run institutions.",
    "metricConnections": "ROE sits at the center of several important bank analysis relationships. Through the DuPont decomposition, ROE equals ROAA multiplied by the equity multiplier (assets divided by equity), which cleanly separates operating performance from leverage. This decomposition is especially useful for diagnosing changes in ROE over time — if ROE rises, DuPont analysis reveals whether the improvement came from better operations (higher ROAA) or from increased leverage (higher equity multiplier).\n\nROE also determines the justified price-to-book ratio through the ROE-P/B framework: justified P/B = (ROE - g) / (r - g), where g is the sustainable growth rate and r is the cost of equity. This relationship explains why banks with higher ROE tend to trade at higher price-to-book multiples. The algebraic identity P/B = P/E \u00d7 ROE connects the two primary bank valuation ratios directly, meaning you can derive any one of the three if you know the other two.\n\nA bank's sustainable growth rate — the rate at which it can grow equity through retained earnings without raising external capital — equals ROE multiplied by the retention ratio (1 minus the dividend payout ratio). A bank with 12% ROE that pays out 40% of earnings as dividends can grow its equity base by roughly 7.2% per year through retained earnings alone. This link between profitability and capital generation is fundamental to long-term bank valuation.",
    "commonPitfalls": "The most common mistake with ROE is treating a high number as automatically positive. A very high ROE can indicate dangerously thin capital rather than superior management — a bank operating with minimal equity will mechanically produce elevated ROE even with mediocre underlying profitability. Always check the equity-to-assets ratio alongside ROE to distinguish genuine efficiency from leverage-driven inflation.\n\nComparing ROE across banks without adjusting for differences in leverage is similarly misleading. Two banks with identical ROAA can show very different ROEs purely because of capital structure differences. The bank holding less capital will post higher ROE, but that does not make it the better-run institution.\n\nOne-time gains from securities sales, tax benefits, or legal settlements can temporarily inflate ROE, making a single quarter's figure unreliable. Provisions for credit losses work in the other direction — they compress net income and depress ROE during periods of elevated loan defaults, even if the bank's core operating performance remains solid.\n\nBanks that have recently completed large acquisitions may show depressed ROE due to goodwill diluting the equity base. Goodwill is an intangible asset that sits within equity, inflating the denominator without contributing to the bank's tangible capital or its earning power. This is one reason many analysts prefer return on tangible common equity (ROTCE) when evaluating banks with significant acquisition histories.",
    "acrossBankTypes": "## Money Center and Large Banks\n\nMoney center banks with diversified revenue streams and active capital management programs typically target ROE in the 12-15% range. Their mix of lending, trading, investment banking, and wealth management income provides multiple paths to generating returns, and their scale enables operational efficiencies that smaller banks cannot match. These banks also tend to manage capital levels aggressively through share buybacks, particularly after passing annual stress tests.\n\nRegional banks in the $10-100 billion asset range often fall between money center banks and community banks, with ROE targets of 10-14%. Their performance depends heavily on the economic health of their geographic footprint and how well they balance commercial lending with fee-generating businesses like treasury management and wealth advisory services.\n\n## Community Banks\n\nWell-run community banks focused on relationship lending often achieve 10-13% ROE, though this varies with local economic conditions and loan mix. Community banks with strong commercial real estate or agricultural lending portfolios may see more cyclicality in their ROE compared to those focused on residential mortgages and consumer lending. Their simpler business models and lower overhead can offset the revenue diversity advantages of larger banks.\n\n## Banks with Excess Capital\n\nBanks maintaining excess capital above regulatory minimums, whether by choice or regulatory directive, may show ROE below 8% despite strong underlying operations. This is common among banks preparing for acquisitions, building buffers ahead of anticipated economic weakness, or subject to consent orders requiring enhanced capital levels.\n\n## De Novo Banks\n\nDe novo (newly chartered) banks almost always show negative or very low ROE in their first 3-5 years as they build their loan portfolios, absorb startup costs, and establish their market presence. Evaluating a de novo bank's ROE against established peers is not meaningful until the bank reaches operational maturity.",
    "whatDrivesMetric": "## Net Income Drivers\n\nThe numerator, net income, is driven by several interconnected factors:\n\n- Net interest margin (NIM) is the spread between what a bank earns on loans and investments versus what it pays on deposits and borrowings. NIM is typically the largest component of bank revenue and has the most direct impact on net income.\n\n- Fee income from service charges, wealth management, mortgage origination, and other non-interest sources. Banks with diversified fee income streams tend to show more stable ROE across interest rate cycles.\n\n- Operating efficiency, measured by the efficiency ratio, reflects how much of each revenue dollar gets consumed by overhead costs. A bank that spends 55 cents to generate a dollar of revenue will naturally produce higher net income than one spending 70 cents.\n\n- Provision for credit losses, the expense banks record to build reserves against expected loan defaults. During benign credit periods, low provisions boost net income and ROE; during downturns, elevated provisions can cut deeply into earnings.\n\n- Tax rate and one-time items also influence net income. Changes in corporate tax rates have an outsized effect on bank earnings because banks tend to carry relatively predictable pre-tax income streams. Large gains or losses from securities sales, legal settlements, or accounting adjustments can distort any single period's ROE.\n\n## What Moves the Equity Base\n\nThe denominator, average shareholders' equity, moves based on:\n\n- Retained earnings accumulation, which is the primary organic driver. A bank retaining 60% of its earnings at a 12% ROE will grow its equity base by roughly 7% per year.\n\n- Capital raises or stock issuances, which increase equity (and dilute ROE) immediately.\n\n- Share buybacks, which reduce equity and can boost ROE if the bank is buying back stock below intrinsic value.\n\n- Dividend payments, which reduce retained earnings and slow equity growth.\n\n- Accumulated other comprehensive income (AOCI) fluctuations, particularly unrealized gains and losses on the available-for-sale securities portfolio. Rising interest rates push bond values down, reducing AOCI and temporarily shrinking the equity base.\n\n## Macroeconomic Conditions\n\nMacroeconomic conditions influence ROE from multiple directions simultaneously. Rising interest rates generally widen NIM (boosting the numerator) but can also slow loan demand and increase credit stress. Strong economic growth supports loan volumes and low default rates, while recessions compress both revenue and credit quality.\n\nThe credit cycle deserves special attention. During extended periods of low loan losses, provisions stay minimal, and net income (and therefore ROE) runs higher than its through-cycle average. When the cycle turns, provisions spike and ROE can fall sharply in a short period. Investors who anchor to peak-cycle ROE as the baseline often overestimate a bank's normalized earning power.",
    "faqTeasers": [
      {
        "question": "What is a good ROE for a bank stock?",
        "teaser": "Well-managed US banks have historically achieved ROE between 8% and 15%, though the appropriate target depends on the bank's size, business model, and capital levels",
        "faqSlug": "what-is-a-good-roe-for-banks",
        "faqCluster": "profitability"
      },
      {
        "question": "Can ROE be too high for a bank? What does that signal?",
        "teaser": "An unusually high ROE can indicate thin capitalization rather than operational excellence, making it important to check equity-to-assets alongside ROE",
        "faqSlug": "can-roe-be-too-high",
        "faqCluster": "profitability"
      },
      {
        "question": "How do I calculate ROE for a bank?",
        "teaser": "ROE equals net income divided by average shareholders' equity, but bank-specific nuances around averaging methods and preferred stock adjustments matter",
        "faqSlug": "how-to-calculate-roe",
        "faqCluster": "profitability"
      },
      {
        "question": "Why is ROE important for bank stocks?",
        "teaser": "ROE captures both operating performance and leverage in a single figure, making it the metric most directly tied to how banks create shareholder value and justify their price-to-book multiples",
        "faqSlug": "why-roe-important-for-banks",
        "faqCluster": "profitability"
      },
      {
        "question": "What is the difference between ROE and ROAA?",
        "teaser": "ROE measures returns on shareholder equity while ROAA measures returns on total assets, and comparing the two reveals how much of a bank's profitability comes from leverage versus core operations",
        "faqSlug": "roe-vs-roaa",
        "faqCluster": "profitability"
      },
      {
        "question": "What is DuPont decomposition for banks?",
        "teaser": "DuPont analysis breaks ROE into ROAA and the equity multiplier, isolating whether a bank's returns are driven by operational skill or by leverage",
        "faqSlug": "dupont-decomposition-for-banks",
        "faqCluster": "profitability"
      },
      {
        "question": "When should I use ROE vs ROAA to evaluate a bank?",
        "teaser": "ROE and ROAA answer different questions about profitability, and knowing when each metric is more appropriate helps avoid misleading comparisons across banks",
        "faqSlug": "when-to-use-roe-vs-roaa",
        "faqCluster": "profitability"
      },
      {
        "question": "What is the ROE-P/B valuation framework?",
        "teaser": "The ROE-P/B framework links a bank's profitability directly to its justified price-to-book multiple, explaining why high-ROE banks consistently trade at premium valuations",
        "faqSlug": "roe-pb-framework-explained",
        "faqCluster": "valuation"
      },
      {
        "question": "What is the relationship between ROE, payout ratio, and dividend growth?",
        "teaser": "ROE and the payout ratio together determine a bank's sustainable growth rate, connecting current profitability to long-term dividend growth potential",
        "faqSlug": "roe-payout-ratio-dividend-growth",
        "faqCluster": "dividends"
      }
    ],
    "relatedValuations": [
      "roe-pb-framework",
      "peer-comparison",
      "dividend-discount-model",
      "dupont-decomposition",
      "gordon-growth-model",
      "discounted-earnings-model",
      "price-to-tangible-book-valuation"
    ],
    "relatedValuationDescriptions": {
      "roe-pb-framework": "ROE is the central input to the ROE-P/B framework, which derives the justified price-to-book multiple from a bank's return on equity relative to its cost of equity and growth rate.",
      "peer-comparison": "ROE is one of the most important metrics for comparing bank profitability across a peer group, as it captures both operating performance and leverage in a single figure.",
      "dividend-discount-model": "ROE combined with the retention ratio determines the sustainable dividend growth rate, a key input to the dividend discount model.",
      "dupont-decomposition": "Breaks ROE into its component parts — ROAA and the equity multiplier — isolating whether returns are driven by operating performance or by leverage.",
      "gordon-growth-model": "Uses the sustainable growth rate derived from ROE and the retention ratio to estimate intrinsic value through projected dividend growth.",
      "discounted-earnings-model": "Projects future earnings capacity based on current ROE and growth assumptions, then discounts those projected earnings back to estimate present value.",
      "price-to-tangible-book-valuation": "Adjusts the standard price-to-book framework by removing intangible assets from equity, which changes the effective ROE calculation and can shift the implied valuation relationship for acquisition-heavy banks."
    }
  },
  {
    "slug": "roaa",
    "name": "Return on Average Assets (ROAA)",
    "category": "profitability",
    "categoryLabel": "Profitability Ratio",
    "formula": "ROAA = Net Income / Average Total Assets",
    "isPercentage": true,
    "shortDescription": "Measures how much profit a bank earns relative to its total asset base, stripping out leverage effects that can distort equity-based profitability measures like ROE.",
    "description": "Return on Average Assets (ROAA) tells you how much profit a bank earns for every dollar of assets it holds. If a bank has $10 billion in total assets and earns $120 million in net income, its ROAA is 1.20%, meaning it produced just over one cent of profit for every dollar of assets on its balance sheet.\n\nWhy does this matter? Banks fund their assets with a mix of deposits, borrowings, and shareholder equity. Return on Equity (ROE) only looks at the equity slice, which means two banks with identical operations can show very different ROE figures simply because one carries more capital than the other. ROAA sidesteps this problem entirely by measuring profit against the full asset base, giving a cleaner picture of how well management is actually running the bank.\n\nThis distinction is especially useful when comparing banks. A bank with a thin equity cushion will show higher ROE than one with substantial capital reserves, even if both earn the same return on their assets. ROAA cuts through that noise. Regulators, analysts, and experienced bank investors often treat ROAA as the more reliable comparison metric precisely because it is not amplified or compressed by differences in capital structure.\n\nROAA also provides insight into how productively a bank deploys its entire balance sheet. Since the bulk of a bank's assets consist of loans and investment securities, ROAA reflects how well the bank prices its loans, manages its investment portfolio, controls operating costs, and handles credit risk. All of these operational factors flow directly into the ratio.",
    "formulaExplanation": "Net Income is the bank's trailing twelve-month (TTM) profit after all expenses, taxes, and provisions for loan losses. It captures the bottom-line earnings available to shareholders over the most recent full year.\n\nAverage Total Assets is calculated using a 5-point average of quarterly balance sheet values, following Federal Financial Institutions Examination Council (FFIEC) methodology. This takes the total asset balance at the end of each of the last five quarters (the current quarter plus four prior quarters) and divides by five. Using the average rather than a point-in-time snapshot prevents distortions from seasonal fluctuations, large acquisitions, or end-of-quarter balance sheet shifts that might misrepresent the asset base the bank actually had working throughout the period.",
    "interpretation": "ROAA shows how effectively bank management converts its asset base into bottom-line profit. A bank posting 1.10% ROAA is generating $1.10 of annual profit for every $100 of assets on its balance sheet. Because banks operate with large asset bases relative to their equity, even small differences in ROAA translate into meaningful differences in overall profitability.\n\nTracking ROAA over multiple years is more informative than looking at a single period. A bank that maintains 1.15% ROAA through varying interest rate environments and credit cycles is demonstrating consistent operational skill. One that swings from 1.40% to 0.60% may be taking concentrated risks that pay off in favorable conditions but hurt during downturns. Comparing a bank's current ROAA to its own five-year average often reveals more than comparing it to other banks, since different business models and asset mixes produce structurally different ROAA levels.\n\nWhen two banks report similar ROE but different ROAA, the gap points directly to leverage. The bank with higher ROAA is generating more profit per dollar of assets and relying less on thin capitalization to produce returns for shareholders. This comparison is one of the most practical ways to distinguish genuine operating strength from leverage-driven profitability.",
    "typicalRange": "Most US commercial banks achieve ROAA between 0.80% and 1.30%, based on long-run FDIC aggregate data. Banks consistently above 1.00% are generally considered solid performers, while those sustaining ROAA above 1.20% are in the upper tier of the industry.\n\nDuring strong economic periods with low credit losses, industry-wide ROAA tends to cluster in the 1.00-1.40% range. During recessions or periods of elevated loan defaults, average ROAA can drop below 0.80% or even turn negative for the weakest institutions. The 2008 financial crisis pushed the industry aggregate briefly to near zero before recovery took hold.\n\nWithin these broad ranges, individual bank performance varies considerably by business model. A community bank with a concentrated commercial lending franchise might consistently run 1.20-1.50% ROAA, while a large bank with substantial low-yielding securities and trading assets might operate in the 0.80-1.10% range without any operational deficiency.",
    "goodBad": {
      "good": "ROAA above 1.00% generally signals that the bank is converting its asset base into profit efficiently. Banks sustaining 1.20% or higher are typically running tight operations with strong loan pricing, controlled overhead, and manageable credit losses. When paired with stable asset quality and consistent performance over multiple years, ROAA in this range indicates a well-run institution.",
      "bad": "ROAA below 0.70% raises questions about the bank's operating efficiency, asset quality, or revenue generation. At these levels, the bank may be carrying too many low-yielding assets, facing elevated credit costs, or spending too heavily on overhead relative to its revenue. Persistent ROAA below 0.50% is often a sign of deeper structural problems that warrant investigation into the specific drivers of weakness."
    },
    "considerations": [
      "ROAA removes the effect of capital structure, making it the better metric for comparing profitability across banks with different leverage levels. Two banks with identical ROAA but different equity-to-assets ratios will show very different ROE.",
      "Asset composition heavily influences ROAA. Banks with higher proportions of loans (which carry higher yields) relative to investment securities will tend to show higher ROAA, all else equal. A heavy securities portfolio can suppress ROAA even at an operationally efficient bank.",
      "Economic cycles affect ROAA primarily through the provision for credit losses. During benign credit environments, low provisions boost net income and lift ROAA. When credit quality deteriorates, provisions can spike and cut ROAA significantly within a single quarter.",
      "Comparing ROAA across banks with fundamentally different business models requires caution. A bank focused on fee-heavy wealth management will have a different asset structure and ROAA profile than one focused on commercial real estate lending.",
      "ROAA uses average assets rather than period-end assets for good reason. Banks that experience significant balance sheet growth or contraction during a period would show distorted ratios if measured against a single point-in-time asset figure."
    ],
    "relatedMetrics": [
      "roe",
      "efficiency-ratio",
      "net-interest-margin",
      "equity-to-assets",
      "return-on-tangible-common-equity",
      "pre-provision-net-revenue",
      "net-overhead-ratio",
      "net-charge-off-ratio",
      "non-interest-income-to-revenue"
    ],
    "relatedMetricDescriptions": {
      "roe": "ROE adds the lens of leverage to profitability, building on the asset-level view ROAA provides. Comparing the two reveals whether a bank's returns to shareholders are driven by strong operations or by thin capitalization.",
      "efficiency-ratio": "Operating efficiency directly determines how much revenue reaches the bottom line. A bank with a low efficiency ratio will convert more of its interest and fee income into the net income measured by ROAA.",
      "net-interest-margin": "NIM measures the spread between interest earned and interest paid on the earning asset base. Since interest income is the largest revenue source for most banks, NIM is typically the single biggest driver of ROAA.",
      "equity-to-assets": "Capital levels connect ROAA to ROE through the equity multiplier. Knowing both ROAA and equity-to-assets lets you calculate what ROE the bank should produce, and any gap between the calculated and actual figures points to unusual items.",
      "return-on-tangible-common-equity": "ROTCE adjusts for goodwill and intangibles in the equity base, while ROAA avoids the equity question entirely. Together they provide complementary views of profitability for banks with acquisition histories.",
      "pre-provision-net-revenue": "PPNR measures earnings before credit costs, isolating the bank's core revenue-generating capacity. Dividing PPNR by average assets shows the pre-credit-cost version of ROAA, useful for separating operating trends from credit cycle effects.",
      "net-overhead-ratio": "The net overhead ratio is a direct component of ROAA: roughly, ROAA equals NIM minus the net overhead ratio minus net credit costs minus taxes. Changes in overhead efficiency flow straight through to ROAA.",
      "net-charge-off-ratio": "Net charge-offs flow through provision expense into net income, directly reducing ROAA. The charge-off rate is often the most volatile component of ROAA from year to year.",
      "non-interest-income-to-revenue": "Fee income diversification supports ROAA by providing revenue that does not depend on balance sheet size or interest rate conditions, adding to the numerator without proportionally increasing the asset base."
    },
    "dataSource": "Net Income is summed from the four most recent quarterly filings to produce a trailing twelve-month figure. This smooths out seasonal patterns in bank earnings, such as higher mortgage origination income in spring and summer quarters.\n\nAsset values are averaged from five consecutive quarterly balance sheets using the FFIEC standard 5-point averaging method. Both figures are sourced from regulatory filings (Call Reports for banks and Y-9C reports for holding companies), which provide standardized definitions across all FDIC-insured institutions.",
    "bankSpecificContext": "## Why ROAA Is the Preferred Comparison Metric\n\nROAA removes leverage from the profitability equation, showing how productively a bank uses its entire asset base regardless of how those assets are funded. This matters because capital structure varies significantly across banks. A bank with 8% equity-to-assets and a bank with 12% equity-to-assets may have identical ROAA but very different ROEs. The bank with less capital will show the higher ROE, but ROAA reveals that both banks are equally productive with their assets.\n\nRegulators and credit analysts tend to favor ROAA over ROE for exactly this reason. When the FDIC publishes aggregate banking industry performance data, ROAA is prominently featured as the primary profitability benchmark. Peer group comparisons in regulatory examinations also emphasize ROAA because it allows examiners to assess management performance without the distortion introduced by differing capital levels.\n\n## The Link Between Asset Strategy and ROAA\n\nA bank's asset allocation decisions directly shape its ROAA. Banks that maintain higher loan-to-asset ratios (putting more of their balance sheet into loans rather than securities) generally earn higher ROAA because loans yield more than investment securities. However, this higher ROAA comes with higher credit risk exposure.\n\nConversely, a bank holding 30% of its assets in government securities will likely show lower ROAA than a peer with 20% in securities, even if both banks are equally well managed. The securities-heavy bank is choosing safety and liquidity over yield, which compresses ROAA but may reflect a deliberate risk management strategy rather than operational weakness.\n\nFee-based revenue streams also affect ROAA differently than interest income. A bank generating substantial fee income from wealth management, insurance, or payment processing adds to net income without proportionally expanding the asset base, which supports higher ROAA per dollar of assets.",
    "metricConnections": "ROAA and ROE are connected through a straightforward relationship: ROE equals ROAA multiplied by the equity multiplier (average assets divided by average equity). This is the foundation of the DuPont decomposition for banks. If a bank reports 1.10% ROAA and operates with a 10:1 asset-to-equity ratio, its ROE will be approximately 11%. If a second bank reports the same 1.10% ROAA but runs with a 12.5:1 ratio, its ROE rises to approximately 13.75%.\n\nThis relationship makes ROAA the diagnostic starting point when ROE changes. If ROE rises from one year to the next, the DuPont framework reveals whether the improvement came from higher ROAA (better operations) or a higher equity multiplier (increased leverage, possibly from share buybacks or equity depletion). The two causes have very different implications for the bank's risk profile.\n\nROAA can also be decomposed further. Roughly speaking, ROAA equals net interest margin minus the net overhead ratio minus net credit costs, plus or minus tax effects and unusual items. Each component of this breakdown points to a different operational driver, making it possible to trace changes in ROAA back to specific areas of bank performance.",
    "commonPitfalls": "The most frequent mistake is comparing ROAA across banks with fundamentally different asset compositions without adjusting for the mix. A bank with 75% of assets in loans and 25% in securities operates in a different yield environment than one with 60% loans and 40% securities. The first bank should show higher ROAA, but that does not automatically mean it is better managed.\n\nTotal asset size can be inflated by large securities portfolios earning relatively low returns, pulling ROAA down even for operationally efficient banks. A bank that built up its securities book during a period of excess deposits may show depressed ROAA that misrepresents its underlying lending and operational performance.\n\nUsing period-end assets rather than average assets is another common error. If a bank grew its balance sheet by 15% during the year (through organic growth or an acquisition), dividing full-year net income by the year-end asset figure understates the true ROAA because those assets were not available for the entire period. The 5-point quarterly average corrects for this.\n\nAnnualizing quarterly ROAA by multiplying a single quarter's result by four assumes that earnings are distributed evenly across the year. For banks with seasonal lending patterns or significant quarter-to-quarter variability in credit costs, this can produce misleading annualized figures. Using trailing twelve-month net income avoids this issue.",
    "acrossBankTypes": "## Community Banks\n\nWell-run community banks with strong local lending franchises and sticky, low-cost deposit bases often achieve ROAA above 1.20%. Their concentrated focus on relationship lending, combined with relatively lean cost structures, can produce some of the highest ROAA figures in the industry. Community banks serving agricultural markets may show more seasonal variability, while those focused on commercial real estate tend to have steadier results.\n\n## Regional Banks\n\nRegional banks in the $10-100 billion asset range typically show ROAA between 0.90% and 1.30%. Their larger scale brings diversification benefits but also higher overhead costs from branch networks, technology investments, and compliance infrastructure. The best-performing regionals compensate with strong fee income businesses in areas like treasury management and wealth advisory.\n\n## Large and Money Center Banks\n\nLarge money center banks often show ROAA in the 0.80-1.10% range. Their asset bases include substantial low-yield trading assets, cash reserves, and securities portfolios that compress the ratio relative to smaller banks with more loan-concentrated balance sheets. Lower ROAA at these institutions does not necessarily indicate weaker management; it reflects a structurally different asset mix.\n\n## Mortgage-Focused Banks\n\nBanks focused primarily on residential mortgage lending may show lower ROAA due to the relatively thin yields on mortgage portfolios compared to commercial and consumer lending. Mortgage-heavy banks sometimes compensate through origination and servicing fee income, but their ROAA profile still tends to trail banks with diversified commercial loan books.",
    "whatDrivesMetric": "## Revenue Drivers\n\nNet interest margin on the earning asset base is the primary driver. The spread between what a bank earns on its loans and investments versus what it pays on deposits and borrowings flows directly into net income and, through it, into ROAA. Even a 10-basis-point widening of NIM can move ROAA meaningfully for a bank with a large, loan-heavy balance sheet.\n\nNon-interest income from fees, service charges, wealth management, and other sources adds to the numerator without increasing the asset base proportionally. Banks that generate a higher share of revenue from fees tend to show stronger ROAA, particularly during periods when interest margins are compressed.\n\n## Cost Factors\n\nOperating efficiency, as measured by the efficiency ratio, determines how much of total revenue flows through to net income. A bank spending 55 cents to generate a dollar of revenue will produce higher ROAA than one spending 68 cents, assuming similar revenue levels relative to assets.\n\nProvision for credit losses is the most volatile cost component. During benign credit periods, provisions stay low and ROAA runs above its through-cycle average. When the credit cycle turns, provisions can spike sharply and drag ROAA down within a single quarter. The provision expense often accounts for more of the year-over-year swing in ROAA than any other single line item.\n\n## Asset Mix Effects\n\nThe composition of the asset base itself matters. Banks with higher proportions of loans relative to securities tend to earn higher ROAA because loans generally yield more than investment securities. Shifting the asset mix toward higher-yielding (but riskier) loan categories can boost ROAA, though the benefit is partially offset if the higher yields come with proportionally higher credit losses.\n\nBalance sheet growth rate also affects ROAA indirectly. Rapid asset growth through new lending or acquisitions expands the denominator. If the new assets take time to reach full profitability (as with newly originated loans that have upfront costs), ROAA may temporarily dip before recovering as the new assets season.",
    "faqTeasers": [
      {
        "question": "What is a good ROAA for a bank?",
        "teaser": "US commercial banks have historically averaged ROAA between 0.90% and 1.30% based on FDIC data, with well-run community banks often exceeding 1.20%",
        "faqSlug": "what-is-a-good-roaa-for-banks",
        "faqCluster": "profitability"
      },
      {
        "question": "What is the difference between ROE and ROAA for banks?",
        "teaser": "ROE measures return on the equity base and reflects leverage, while ROAA measures return on total assets and isolates operating performance from capital structure",
        "faqSlug": "roe-vs-roaa",
        "faqCluster": "profitability"
      },
      {
        "question": "How do I calculate return on average assets (ROAA) for a bank?",
        "teaser": "ROAA equals net income divided by average total assets, but the averaging method and income period used affect accuracy when comparing across banks",
        "faqSlug": "how-to-calculate-roaa",
        "faqCluster": "profitability"
      },
      {
        "question": "What is the DuPont decomposition and how does it apply to banks?",
        "teaser": "DuPont analysis breaks ROE into ROAA and the equity multiplier, separating whether a bank's returns come from operational performance or from leverage",
        "faqSlug": "dupont-decomposition-for-banks",
        "faqCluster": "profitability"
      },
      {
        "question": "When should I use ROE vs ROAA to evaluate a bank?",
        "teaser": "ROE and ROAA answer different questions about profitability, and knowing when each metric is more appropriate prevents misleading comparisons across banks with different capital levels",
        "faqSlug": "when-to-use-roe-vs-roaa",
        "faqCluster": "profitability"
      }
    ],
    "relatedValuations": [
      "peer-comparison",
      "dupont-decomposition",
      "discounted-earnings-model"
    ],
    "relatedValuationDescriptions": {
      "peer-comparison": "ROAA is the preferred profitability metric for peer comparison because it removes leverage differences, allowing direct comparison of operating performance across banks with different capital structures.",
      "dupont-decomposition": "DuPont decomposition breaks ROE into ROAA multiplied by the equity multiplier, isolating whether a bank's returns are driven by asset productivity or by leverage. ROAA is one of the two core components.",
      "discounted-earnings-model": "The discounted earnings model projects future net income, which is directly related to ROAA multiplied by the asset base. Current ROAA levels inform assumptions about the bank's normalized earning power."
    }
  },
  {
    "slug": "net-interest-margin",
    "name": "Net Interest Margin (NIM)",
    "category": "profitability",
    "categoryLabel": "Profitability Ratio",
    "formula": "NIM = Net Interest Income / Average Earning Assets",
    "isPercentage": true,
    "shortDescription": "Measures the spread between what a bank earns on loans and investments versus what it pays on deposits and borrowings, expressed as a percentage of earning assets. NIM is the single most important revenue metric for most banks.",
    "description": "Net Interest Margin (NIM) measures how much money a bank makes from the difference between the interest it earns and the interest it pays out. Banks make money mainly by charging borrowers more interest on loans than they pay depositors on savings accounts. NIM expresses this profit spread as a percentage of the bank's interest-earning assets.\n\nFor example, if a bank earns 5% on its loans and investments but pays 2% on its deposits and borrowings, the simplified spread is about 3%. NIM formalizes this by dividing net interest income (total interest earned minus total interest paid) by the average balance of interest-earning assets like loans and securities.\n\nFor most community and regional banks, net interest income makes up 70% to 85% of total revenue, which makes NIM the dominant factor in whether a bank is profitable or not. Even small changes in NIM, measured in basis points (hundredths of a percent), can move earnings significantly. A bank with $5 billion in earning assets that improves its NIM by 10 basis points adds roughly $5 million in annual pre-tax income.\n\nBecause NIM is specific to financial intermediaries, there is no equivalent metric for companies outside of banking and finance. Non-financial companies do not earn revenue by borrowing at one rate and lending at another, which is why NIM shows up exclusively on bank analysis screens.",
    "formulaExplanation": "Net Interest Income is the difference between what a bank earns on its interest-bearing assets and what it pays on its interest-bearing liabilities. Interest income comes primarily from loans (commercial, residential, consumer) and investment securities (Treasury bonds, municipal bonds, mortgage-backed securities). Interest expense covers the cost of funding those assets through deposits (savings accounts, CDs, money market accounts) and borrowings (Federal Home Loan Bank advances, repurchase agreements, subordinated debt).\n\nAverage Earning Assets includes all assets that generate interest income: total loans, investment securities, interest-bearing deposits held at other banks, and federal funds sold. Cash held in vaults and non-interest-bearing reserve balances are excluded. The average is typically calculated using quarterly balance sheet snapshots to smooth out period-to-period fluctuations.",
    "interpretation": "NIM reflects how profitably a bank performs its core function of borrowing from depositors and lending to borrowers. A higher NIM means the bank earns a wider spread on its intermediation activities. A lower NIM means the gap between earning rates and funding costs is narrow.\n\nThe interest rate environment has an outsized influence on NIM. When rates rise, banks often see NIM expand because they can reprice loans upward more quickly than deposit costs adjust. When rates fall, NIM tends to compress as loan yields drop while deposit costs have a floor near zero. Flat or inverted yield curves, where short-term rates approach or exceed long-term rates, put particular pressure on NIM because banks fund long-term assets with shorter-term liabilities.\n\nNIM should always be evaluated relative to the bank's asset mix and business model rather than compared solely to an industry average. A bank concentrated in commercial real estate lending will naturally carry a different NIM than one focused on residential mortgages or government securities. Tracking NIM against a bank's own historical trend often reveals more about performance trajectory than peer comparisons alone.",
    "typicalRange": "Community banks focused on commercial and relationship lending typically report NIM between 3.25% and 4.25%. Regional banks in the $10-100 billion asset range generally fall in the 3.00% to 3.75% corridor. Large money center banks, whose asset mixes include more lower-yielding wholesale loans, trading assets, and investment securities, often report NIM in the 2.00% to 3.00% range.\n\nThe industry-wide average NIM for US banks has historically fluctuated between 3.0% and 3.5%, based on FDIC aggregate data, though it moves outside this range during periods of extreme rate environments. During prolonged low-rate periods, industry NIM has compressed toward 3.0% or below as asset yields fell faster than funding costs could decline. In rising-rate environments, NIM tends to widen as loan repricing outpaces deposit cost increases, at least in the initial phase of the cycle.",
    "goodBad": {
      "good": "NIM above 3.5% is generally favorable for community and regional banks, indicating that the bank earns healthy spreads on its lending activities and maintains a low-cost funding base. Banks sustaining NIM at these levels usually benefit from some combination of strong loan pricing discipline, a favorable deposit mix weighted toward non-interest-bearing accounts, or geographic markets with limited pricing competition.",
      "bad": "NIM below 2.5% at a traditional commercial bank may signal squeezed lending margins from pricing competition, a rate environment that compresses spreads, an asset mix weighted heavily toward lower-yielding securities, or rising deposit costs that erode the funding advantage. For large banks with significant trading and fee-based operations, NIM below 2.5% can be structural rather than a sign of weakness, since their business model relies less on interest spread income."
    },
    "considerations": [
      "Interest rate changes have an outsized impact on NIM. When the Federal Reserve raises short-term rates, banks with floating-rate loan portfolios see immediate yield improvements, while deposit costs tend to lag behind. This initial expansion reverses as deposit competition intensifies and more deposits reprice to higher rates. The pace and magnitude of rate moves matter as much as the direction.",
      "Loan portfolio composition directly affects the asset yield side of NIM. Commercial real estate loans typically carry higher yields than residential mortgages, which in turn yield more than government-backed securities. A bank shifting its mix toward higher-yielding asset classes will show rising NIM, but the improved spread comes with elevated credit risk that NIM alone does not capture.",
      "Deposit mix is the most controllable factor in NIM management. Banks with large balances of non-interest-bearing checking accounts enjoy a structural funding advantage, since those deposits carry zero interest cost. The proportion of non-interest-bearing deposits to total deposits varies widely across banks and is one of the strongest predictors of NIM sustainability.",
      "NIM should be evaluated alongside credit quality metrics like the net charge-off ratio and non-performing loan ratio. A bank can temporarily boost NIM by lending to riskier borrowers who pay higher rates, but the resulting credit losses may more than offset the spread improvement. Sustainable NIM comes from sound lending within the bank's risk appetite, not from reaching for yield.",
      "Tax-equivalent NIM adjustments improve comparability across banks with different proportions of tax-exempt securities. Banks holding significant municipal bond portfolios will show lower reported NIM than their economic NIM because municipal interest income is tax-exempt. Tax-equivalent adjustments gross up the tax-exempt income to a pre-tax equivalent, making peer comparisons more accurate."
    ],
    "relatedMetrics": [
      "roe",
      "roaa",
      "efficiency-ratio",
      "cost-of-funds",
      "cost-of-deposits",
      "interest-income-to-earning-assets",
      "non-interest-income-to-revenue",
      "pre-provision-net-revenue",
      "loans-to-assets"
    ],
    "relatedMetricDescriptions": {
      "roe": "NIM is the primary revenue driver for most banks, making it the single largest influence on the net income that feeds into ROE. Wide NIM combined with cost discipline produces the strong net income needed for above-average returns on equity.",
      "roaa": "Net interest income from NIM is the largest component of the asset returns ROAA measures. Since NIM is expressed relative to earning assets and ROAA relative to total assets, comparing the two reveals how much of the balance sheet is deployed in interest-earning activities.",
      "efficiency-ratio": "NIM drives the revenue denominator of the efficiency ratio through net interest income. A bank with wide NIM but a high efficiency ratio converts its spread advantage into overhead rather than profit, making both metrics necessary to evaluate earnings quality.",
      "cost-of-funds": "Cost of funds measures the blended interest expense on all bank liabilities, representing the expense side of the NIM equation. NIM equals the earning asset yield minus the cost of funds, adjusted for the benefit of non-interest-bearing funding sources.",
      "cost-of-deposits": "Deposit costs are the largest component of total funding costs for most banks. Changes in the cost of deposits directly compress or expand NIM, and tracking deposit cost trends provides an early signal of where NIM is headed.",
      "interest-income-to-earning-assets": "The earning asset yield is the revenue side of the NIM equation. NIM is the spread between the earning asset yield and the effective funding cost, making these two metrics a natural decomposition of NIM into its component parts.",
      "non-interest-income-to-revenue": "NIM measures the spread-lending component of bank revenue, while the non-interest income ratio captures fee-based revenue. Banks with low NIM but high fee income ratios may generate strong total revenue despite narrow interest spreads.",
      "pre-provision-net-revenue": "NIM is the primary driver of the revenue component of PPNR, typically accounting for 60% to 80% of total bank revenue. PPNR measures the bank's ability to generate earnings before credit costs, and NIM is its largest input.",
      "loans-to-assets": "The loans-to-assets ratio shows how much of the balance sheet is deployed in higher-yielding loans versus lower-yielding securities. Banks with higher loan concentrations tend to produce wider NIM but take on more credit and liquidity risk."
    },
    "dataSource": "Net Interest Income is taken from the income statement in quarterly regulatory filings (Call Reports for banks, Y-9C for holding companies) and summed over four quarters to produce a trailing twelve-month figure. Average Earning Assets is calculated from quarterly balance sheet data, using beginning and ending balances to compute period averages.\n\nBoth components follow standardized regulatory definitions, which ensures consistency when comparing NIM across different banks. Some analysts calculate tax-equivalent NIM by adjusting interest income on tax-exempt securities upward; this adjusted figure is not reported in regulatory filings and must be derived separately.",
    "bankSpecificContext": "## The Core Revenue Engine\n\nNet interest margin is the single most important profitability metric for traditional commercial banks. It captures the spread between what a bank earns on its loans and investment securities and what it pays on deposits and borrowings, expressed as a percentage of average earning assets. For most community and regional banks, net interest income constitutes 70% to 85% of total revenue, with fee income from services, wealth management, and mortgage origination making up the remainder.\n\n## A Metric Without Parallel\n\nNIM exists only in banking and financial intermediation because non-financial companies do not earn revenue by borrowing at one rate and lending at another. A manufacturer's profit margin measures the spread between production costs and selling prices; a bank's NIM measures the spread between its cost of money and its price for lending that money out. General profitability metrics like gross margin or operating margin are poor substitutes when analyzing banks, which is why NIM appears on every bank stock screener and earnings report.\n\n## The Basis Point Effect\n\nBecause banks operate with large asset bases relative to their equity, even small NIM movements produce meaningful earnings impact. A 10 basis point change in NIM at a bank with $3 billion in earning assets translates to $3 million in annual pre-tax income. For context, that same bank might have total net income of $30-40 million, making a 10 basis point NIM swing equivalent to roughly 8-10% of total earnings. This sensitivity explains why bank earnings calls devote significant time to NIM trends and forward NIM guidance.",
    "metricConnections": "NIM is the largest component of return on average assets (ROAA) for most banks. Net interest income, which equals NIM multiplied by average earning assets, flows directly into total revenue. The efficiency ratio then measures how much of that revenue gets consumed by operating expenses. A bank with a 3.50% NIM and a 55% efficiency ratio retains significantly more income per dollar of assets than one with the same NIM and a 70% efficiency ratio.\n\nThe relationship between NIM and pre-provision net revenue (PPNR) is particularly direct. PPNR represents earnings before credit costs and taxes, driven primarily by NIM on the revenue side and the efficiency ratio on the expense side. Banks with wider NIM generate more PPNR, giving them a larger buffer to absorb credit losses during downturns without posting negative earnings.\n\nNIM combined with the loans-to-assets ratio indicates how effectively the bank deploys assets into higher-yielding loans versus lower-yielding securities. A bank with an 80% loans-to-assets ratio and a 3.50% NIM earns its spread primarily from lending, while one with 55% loans-to-assets and the same NIM relies more heavily on securities yield. The lending-heavy bank typically shows more NIM volatility but earns higher average spreads.\n\nCost of funds and cost of deposits are the liability-side components that directly determine the funding cost portion of NIM. The earning asset yield determines the revenue side. Together, these three metrics decompose NIM into its component parts, allowing analysts to pinpoint whether NIM changes are driven by asset yields, funding costs, or both.",
    "commonPitfalls": "## Higher NIM Does Not Always Mean Better Management\n\nA higher NIM does not always indicate a better-run bank. Higher NIM can result from concentrating in riskier loan categories like subprime consumer lending, speculative commercial real estate, or other asset classes that command wider spreads precisely because of elevated default risk. The NIM looks attractive until credit losses materialize and offset the extra spread income. Always pair NIM analysis with credit quality metrics to determine whether a wide spread is sustainable or simply compensation for risk.\n\n## Comparing NIM Across Different Business Models\n\nComparing NIM across banks with very different asset mixes is misleading. A community bank focused on commercial real estate lending will naturally carry a different NIM profile than a large bank holding significant government securities and wholesale loans. Mortgage-focused banks, agricultural lenders, and credit card banks each operate with structurally different NIMs driven by their loan types, not by management quality. Peer comparisons should match banks with similar asset compositions and geographic markets.\n\n## Yield Curve Compression\n\nFlat or inverted yield curves compress NIM even at well-managed banks. Banks typically fund longer-duration assets (loans, bonds) with shorter-duration liabilities (deposits, short-term borrowings). When the yield curve flattens, the spread between what banks earn on long-term assets and what they pay for short-term funding narrows mechanically. This effect is largely outside management's control, and a NIM decline during a yield curve inversion should not be confused with operational deterioration.\n\n## Tax-Equivalent Adjustments\n\nBanks with significant holdings of tax-exempt municipal bonds will report lower NIM than their economic reality suggests. Because municipal bond interest is exempt from federal income tax, reported interest income understates the pre-tax equivalent return. Tax-equivalent NIM adjustments gross up tax-exempt income by dividing it by (1 minus the marginal tax rate), providing a more accurate comparison across banks with different municipal securities exposures. Most analyst reports present both reported and tax-equivalent NIM when municipal holdings are material.",
    "acrossBankTypes": "## Community Banks\n\nCommunity banks focused on relationship commercial lending often achieve NIMs in the 3.50% to 4.50% range. Their pricing power in local markets, combined with a funding base anchored by low-cost core deposits and non-interest-bearing checking accounts, supports wider spreads. Smaller banks can also be more selective about the loans they originate, passing on deals where pricing does not justify the credit risk. The tradeoff is less diversification and greater exposure to local economic conditions.\n\n## Regional Banks\n\nRegional banks typically show NIMs of 3.00% to 3.75%. Their larger scale brings more deposit competition and more sophisticated corporate borrowers who negotiate tighter loan pricing. Regional banks often hold larger securities portfolios as a percentage of assets, which pulls NIM lower since securities generally yield less than loans. Those with strong treasury management businesses and established commercial banking relationships tend to maintain NIM toward the higher end of this range.\n\n## Large Money Center Banks\n\nLarge money center banks often report NIMs in the 2.00% to 3.00% range. Their asset mixes include more low-yield wholesale lending, trading assets, and investment securities that dilute overall NIM. These banks compensate with substantial fee income from investment banking, trading, wealth management, and payment processing, making NIM a less complete picture of their total revenue generation. Evaluating a money center bank on NIM alone understates the full profitability picture.\n\n## The Non-Interest-Bearing Deposit Advantage\n\nAcross all bank sizes, institutions with large non-interest-bearing deposit bases enjoy a structural NIM advantage. Every dollar of non-interest-bearing deposits provides free funding. A bank where 35% of total deposits are non-interest-bearing will sustain wider NIM than a peer where only 15% are non-interest-bearing, all else being equal. This deposit franchise value is one of the most durable competitive advantages in banking and explains much of the NIM variation observed across institutions.",
    "whatDrivesMetric": "## Asset-Side Drivers\n\nSeveral factors determine what a bank earns on its asset base:\n\n- The overall interest rate environment sets the baseline for asset yields. When the Federal Reserve raises short-term rates, floating-rate loans reprice upward relatively quickly, while fixed-rate loans carry their existing yields until maturity or refinancing.\n\n- Yield curve shape influences NIM directionally. A steep curve (long-term rates well above short-term rates) favors wider NIM because banks fund short and lend long. A flat or inverted curve compresses that spread.\n\n- Loan portfolio mix determines the blended asset yield. Commercial real estate, commercial and industrial, residential mortgage, and consumer loans each carry different yield profiles. Banks with more commercial lending typically earn higher yields than those weighted toward residential mortgages or securities.\n\n- The pace at which loans reprice depends on the proportion of fixed-rate versus floating-rate loans. Banks with more adjustable-rate lending see faster NIM response to rate changes in either direction.\n\n## Liability-Side Drivers\n\nFunding costs are equally important in determining NIM:\n\n- Deposit mix is the most significant controllable factor. Non-interest-bearing checking accounts provide free funding, while certificates of deposit and brokerage deposits carry rates that reprice frequently with market conditions.\n\n- Competition for deposits in local markets drives pricing. Banks in markets with aggressive competitors may need to pay above-market rates to retain depositors, directly compressing NIM.\n\n- Reliance on wholesale borrowings (Federal Home Loan Bank advances, brokerage CDs, repurchase agreements) typically increases funding costs compared to core deposits gathered through branch relationships.\n\n## Management Decisions\n\nBeyond market conditions, management choices influence NIM through asset-liability duration matching, loan pricing discipline, and deposit gathering strategy. A management team that maintains pricing discipline on loans and actively manages deposit costs can sustain wider NIM than competitors in the same market. Decisions about how much of the balance sheet to invest in securities versus hold for loan growth also affect NIM, since securities generally yield less than loans but provide liquidity and lower risk.",
    "faqTeasers": [
      {
        "question": "What is a good net interest margin for a bank?",
        "teaser": "US banks have historically averaged NIM between 3.0% and 3.5% based on FDIC data, though the appropriate level varies significantly by bank size and business model",
        "faqSlug": "what-is-a-good-nim-for-banks",
        "faqCluster": "profitability"
      },
      {
        "question": "What causes net interest margin to increase or decrease?",
        "teaser": "NIM is driven by the interplay of the interest rate environment, yield curve shape, loan mix, deposit mix, and competitive dynamics in the bank's markets",
        "faqSlug": "what-causes-nim-to-change",
        "faqCluster": "profitability"
      },
      {
        "question": "How do I calculate net interest margin?",
        "teaser": "NIM equals net interest income divided by average earning assets, though tax-equivalent adjustments and the definition of earning assets introduce important nuances",
        "faqSlug": "how-to-calculate-nim",
        "faqCluster": "profitability"
      },
      {
        "question": "Why do some banks have much higher NIMs than others?",
        "teaser": "NIM differences across banks reflect variation in loan portfolio composition, deposit franchise strength, geographic market competition, and the tradeoff between yield and credit risk",
        "faqSlug": "why-nim-varies-across-banks",
        "faqCluster": "profitability"
      }
    ],
    "relatedValuations": [
      "peer-comparison",
      "dividend-discount-model",
      "dupont-decomposition",
      "discounted-earnings-model"
    ],
    "relatedValuationDescriptions": {
      "peer-comparison": "NIM is a standard metric in peer analysis, revealing differences in lending profitability, funding costs, and asset mix that drive performance variation across banks in the same size category.",
      "dividend-discount-model": "NIM is the primary revenue driver for most banks, making it a key input when projecting the future earnings that support dividend payments and sustainable payout ratios.",
      "dupont-decomposition": "DuPont analysis breaks ROE into ROAA and the equity multiplier. Since NIM is the largest component of ROAA for most banks, NIM trends directly influence the operating performance component of the DuPont framework.",
      "discounted-earnings-model": "Projected NIM levels are a central assumption in discounted earnings models for banks, since net interest income typically represents the majority of the revenue being projected forward and discounted to present value."
    }
  },
  {
    "slug": "efficiency-ratio",
    "name": "Efficiency Ratio",
    "category": "efficiency",
    "categoryLabel": "Efficiency Ratio",
    "formula": "Efficiency Ratio = Non-Interest Expense / (Net Interest Income + Non-Interest Income)",
    "isPercentage": true,
    "shortDescription": "Shows how many cents a bank spends to generate each dollar of revenue, with lower values indicating tighter cost control.",
    "description": "The efficiency ratio tells you how much of each revenue dollar a bank spends on operating costs. If a bank has an efficiency ratio of 60%, it spends 60 cents on overhead for every dollar it brings in, keeping 40 cents before taxes and loan loss provisions.\n\nUnlike most financial ratios where higher is better, the efficiency ratio works in reverse. A lower number means the bank runs a leaner operation. This makes it one of the most closely watched metrics in banking because it directly measures whether management is controlling costs relative to the revenue the bank generates.\n\nThe ratio captures all non-interest expenses (salaries, rent, technology, compliance) against total revenue, which for banks means the combination of net interest income from lending and non-interest income from fees and services.",
    "formulaExplanation": "Non-Interest Expense covers everything the bank spends on operations outside of interest payments and loan loss provisions. The largest components are typically salaries and employee benefits, followed by occupancy and equipment costs, technology and data processing, professional fees, and regulatory assessments.\n\nThe denominator, total revenue, equals net interest income (interest earned on loans and investments minus interest paid on deposits and borrowings) plus non-interest income (fees from services like deposit accounts, wealth management, mortgage origination, and interchange).",
    "interpretation": "A bank with a 55% efficiency ratio keeps 45 cents of every revenue dollar before taxes and credit costs, while a bank at 70% keeps only 30 cents. That 15 percentage point gap translates directly into profitability differences, which is why management teams, analysts, and regulators all track this metric closely.\n\nWhen comparing banks, look at the direction of the trend alongside the absolute number. A bank whose efficiency ratio has improved from 68% to 62% over three years is demonstrating real operational progress, even if its ratio is still higher than a competitor sitting at 58%. Conversely, a bank with a low ratio that has been drifting upward may be losing cost discipline or facing revenue pressure.",
    "typicalRange": "Most well-run banks operate with efficiency ratios between 50% and 60%. Banks that consistently hold below 50% are considered exceptional operators. Ratios between 60% and 70% are common among smaller banks or those with higher-cost business mixes like wealth management. Ratios persistently above 70% typically signal structural cost issues, insufficient revenue scale, or both.\n\nThe industry-wide average has historically fluctuated between 55% and 65%, depending on the interest rate environment and economic cycle. During periods of rising rates and expanding net interest margins, efficiency ratios tend to improve across the industry as revenue growth outpaces expense increases.",
    "goodBad": {
      "good": "An efficiency ratio below 55% signals that the bank converts a large share of its revenue into pre-tax earnings. Banks operating at this level have typically achieved scale advantages, strong fee income diversification, or disciplined overhead management. Some of the best-performing community and regional banks consistently run in the 48% to 54% range.",
      "bad": "An efficiency ratio above 65% to 70% means the bank is consuming most of its revenue in operating costs, leaving a narrow margin for credit costs, taxes, and profit. This can result from an oversized branch network, excessive staffing levels, limited revenue diversification, or simply insufficient scale to spread fixed costs. Sustained ratios at this level make it difficult to generate adequate returns for shareholders."
    },
    "considerations": [
      "Business model mix affects the ratio significantly. Wealth management, trust, and investment banking operations typically carry efficiency ratios of 65% to 75% because they are compensation-intensive, but they also generate high returns on capital. A bank with a large fee-based division will naturally show a higher efficiency ratio than a pure lending bank, even if both are equally well-managed.",
      "Technology spending and branch transformation projects can push the ratio higher in the short term before delivering efficiency gains over subsequent years. Evaluating whether a rising ratio reflects productive investment or structural waste requires looking at the specific expense categories driving the increase.",
      "Revenue declines from margin compression or falling fee income will worsen the ratio even if the bank holds expenses flat. During periods of low interest rates, many banks saw efficiency ratios rise despite aggressive cost management simply because their net interest income contracted.",
      "Peer group comparisons should match banks by asset size, geographic footprint, and business mix. Comparing a $500 million community bank to a $50 billion regional bank on efficiency ratio alone is misleading because scale advantages differ dramatically.",
      "Some banks report an adjusted efficiency ratio that excludes intangible asset amortization from acquisitions. This adjusted figure can provide a cleaner view of ongoing operating efficiency, but comparing adjusted and unadjusted ratios across banks without noting the difference creates distortion."
    ],
    "relatedMetrics": [
      "roe",
      "roaa",
      "deposits-to-assets",
      "net-interest-margin",
      "pre-provision-net-revenue",
      "non-interest-income-to-revenue"
    ],
    "relatedMetricDescriptions": {
      "roe": "Cost management directly impacts net income, which is the numerator of ROE. Banks with lower efficiency ratios convert more revenue into profit, supporting higher returns on equity.",
      "roaa": "Efficient operations translate into stronger net income relative to total assets. A bank that improves its efficiency ratio without growing its balance sheet will see its ROAA increase.",
      "deposits-to-assets": "Deposit funding costs influence the revenue side of the efficiency equation. Banks with high proportions of low-cost deposits generate more net interest income, providing a larger revenue base over which to spread operating expenses.",
      "net-interest-margin": "NIM drives the revenue denominator of the efficiency ratio through net interest income. A bank with a wide NIM but a high efficiency ratio is converting its spread advantage into overhead rather than profit, making both metrics necessary to evaluate earnings quality.",
      "pre-provision-net-revenue": "PPNR measures earnings before credit costs, and a lower efficiency ratio means more revenue flows through to PPNR. Banks with strong PPNR relative to assets have greater capacity to absorb loan losses during downturns.",
      "non-interest-income-to-revenue": "Fee income diversification affects both the denominator and the cost structure of the efficiency ratio. Banks with higher non-interest income contribute more revenue to offset expenses, though fee-generating businesses often carry higher compensation costs."
    },
    "dataSource": "Non-interest expense, net interest income, and non-interest income all appear on the consolidated income statement in quarterly and annual SEC filings. The ratio can be calculated for a single quarter or on a trailing twelve-month basis by summing four consecutive quarters. Most bank earnings releases and investor presentations include the efficiency ratio directly or provide enough data to calculate it.",
    "bankSpecificContext": "The efficiency ratio has a specific meaning in banking that differs from operating margins used in other industries. It measures non-interest expense divided by total revenue, where total revenue equals net interest income plus non-interest income. This structure reflects the reality that bank revenue comes from two fundamentally different sources: the interest spread earned on loans and investments, and fees charged for financial services.\n\nLower values are better. A bank with a 55% efficiency ratio is spending 55 cents for every dollar of revenue it generates, keeping 45 cents to cover credit losses, taxes, and shareholder returns. The banking industry treats the efficiency ratio as its primary scorecard for cost management and operational productivity.\n\nThe metric also reveals how effectively a bank converts its competitive advantages into earnings. A bank might have a strong net interest margin from low-cost deposits, but if its efficiency ratio is high, much of that spread advantage gets absorbed by overhead. Two banks with identical revenue can produce very different earnings depending on how efficiently each operates.",
    "metricConnections": "The efficiency ratio feeds directly into net income and therefore drives both Return on Equity (ROE) and Return on Average Assets (ROAA). A bank that improves its efficiency ratio by 5 percentage points without changing revenue adds that entire amount to pre-tax income. For a bank earning $200 million in total revenue, a 5-point improvement from 60% to 55% generates $10 million in additional pre-tax earnings.\n\nNet interest margin (NIM) and the efficiency ratio together determine how much of the bank's interest spread reaches the bottom line. Consider two banks, each with a 3.50% NIM. The bank running a 55% efficiency ratio retains significantly more of that spread as profit than one operating at 70%. NIM generates the revenue; the efficiency ratio determines how much of it survives as earnings.\n\nIn bank merger and acquisition analysis, projected efficiency ratio improvements from combining overlapping operations are often called the \"efficiency dividend.\" Acquirers routinely cite expected efficiency gains as a primary source of deal value, estimating cost saves from eliminating duplicate branches, systems, and back-office functions.\n\nPre-provision net revenue (PPNR) also connects directly. A lower efficiency ratio means more revenue flows through to PPNR for a given level of total revenue. Banks with strong PPNR relative to assets have more cushion to absorb loan losses during economic downturns, making the efficiency ratio an indirect measure of loss-absorbing capacity.",
    "commonPitfalls": "## Business Mix Distortion\n\nComparing efficiency ratios across banks with different business models often leads to misleading conclusions. Wealth management and trust divisions typically operate with efficiency ratios of 65% to 75% because they require high-compensation talent, but these divisions generate strong returns on equity because they need minimal balance sheet capital. A bank with a significant wealth management operation will look less efficient on this metric than a pure commercial lender, even though the diversified bank may actually be more profitable overall.\n\n## Revenue-Driven Deterioration\n\nRevenue declines cause the efficiency ratio to worsen even when management is holding expenses steady or cutting costs. During periods of net interest margin compression, many banks see their efficiency ratios rise by several percentage points despite active cost reduction efforts. Always check whether movement in the ratio came from the numerator (expenses) or the denominator (revenue) before drawing conclusions about management effectiveness.\n\n## One-Time Items\n\nRestructuring charges, litigation settlements, regulatory penalties, and technology conversion costs can spike the ratio in a single quarter. Similarly, gains on sale of securities or other one-time revenue items can temporarily depress the ratio. Looking at the adjusted or core efficiency ratio, which excludes unusual items, gives a more accurate picture of the bank's ongoing operating cost structure.\n\n## Scale Comparisons\n\nSmaller banks face higher fixed costs relative to their revenue base. Regulatory compliance, core technology systems, and audit fees consume a larger share of revenue at a $300 million community bank than at a $30 billion regional bank. Comparing efficiency ratios across dramatically different asset sizes without acknowledging this structural scale disadvantage produces unfair conclusions.",
    "acrossBankTypes": "## Large Banks\n\nMoney center and large regional banks often achieve efficiency ratios between 55% and 60%. Their size allows them to spread fixed costs like technology platforms, regulatory compliance infrastructure, and corporate overhead across a much larger revenue base. Large banks with significant capital markets, trading, or investment banking operations may run higher ratios because those businesses are compensation-intensive.\n\n## Community Banks\n\nWell-managed community banks typically target efficiency ratios of 55% to 65%. Reaching below 55% is difficult at smaller scale because regulatory compliance, core banking systems, and audit costs represent a higher percentage of revenue. Community banks that consistently operate below 55% usually have strong local market positions with high levels of non-interest-bearing deposits and disciplined staffing models.\n\n## Mutual and Cooperative Banks\n\nMutual savings banks and credit unions sometimes show higher efficiency ratios than their stock-form peers. Their mutual ownership structure limits certain capital management strategies, and their mission-driven focus may prioritize service and community reinvestment over maximum cost efficiency. A somewhat higher efficiency ratio at a mutual institution does not necessarily indicate poor management.\n\n## Banks Below 50%\n\nBanks that consistently operate below 50% are rare and considered exceptional. These institutions have typically achieved some combination of scale advantages, strong non-interest income generation, low-cost core deposit funding, and rigorous expense discipline. Some high-performing community banks reach this level through minimal branch networks and technology-forward operating models.",
    "whatDrivesMetric": "## Compensation and Benefits\n\nSalary and employee benefit costs represent the largest component of non-interest expense, typically accounting for 50% to 60% of total operating costs. Headcount decisions, compensation levels, and benefits programs have the single largest impact on the efficiency ratio. Banks that grow revenue without proportionally increasing staff achieve the most sustainable efficiency improvements.\n\n## Occupancy and Branch Networks\n\nBranch network size and real estate costs are the second-largest expense driver for most banks. Each branch carries rent or depreciation, utilities, maintenance, and staffing costs. Banks that have consolidated branches while retaining deposits through digital channels have seen meaningful efficiency ratio improvements. The per-branch cost of operation varies widely by market but typically runs between $500,000 and $1.5 million annually.\n\n## Technology and Infrastructure\n\nTechnology and data processing expenses have been growing as a share of total costs across the industry. Core banking system fees, cybersecurity spending, digital banking platforms, and data analytics investments add to short-term expenses but can reduce long-term costs by automating manual processes and reducing the need for physical infrastructure.\n\n## Regulatory Compliance\n\nCompliance costs, including examination fees, Bank Secrecy Act and anti-money laundering (BSA/AML) staffing, consumer compliance programs, and reporting infrastructure, impose a relatively fixed cost burden. These costs weigh more heavily on smaller banks because the regulatory framework does not scale down proportionally with bank size.\n\n## Revenue Side Factors\n\nOn the denominator side, NIM compression or fee income declines cause the efficiency ratio to rise without any increase in expenses. Revenue growth that outpaces expense growth is the most sustainable path to efficiency improvement. Banks with diversified revenue streams across both interest income and fee income tend to show more stable efficiency ratios because weakness in one revenue category may be partially offset by strength in another.",
    "faqTeasers": [
      {
        "question": "What is a good efficiency ratio for a bank?",
        "teaser": "Banks with efficiency ratios below 60% are generally considered well-managed, while those consistently below 50% are exceptional operators",
        "faqSlug": "what-is-a-good-efficiency-ratio",
        "faqCluster": "efficiency"
      },
      {
        "question": "Why do smaller banks often have higher efficiency ratios than large banks?",
        "teaser": "Smaller banks lack the economies of scale in technology, compliance, and processing that allow larger banks to spread fixed costs over a larger revenue base",
        "faqSlug": "why-small-banks-higher-efficiency-ratio",
        "faqCluster": "efficiency"
      },
      {
        "question": "How do I calculate the efficiency ratio for a bank?",
        "teaser": "Divide non-interest expense by total revenue (net interest income plus non-interest income), with important nuances around adjusted ratios and common calculation mistakes",
        "faqSlug": "how-to-calculate-efficiency-ratio",
        "faqCluster": "efficiency"
      },
      {
        "question": "What drives a bank's efficiency ratio higher or lower?",
        "teaser": "Compensation costs, branch networks, technology spending, and regulatory compliance drive the expense side, while interest rate movements and fee income shifts affect the revenue denominator",
        "faqSlug": "what-drives-efficiency-ratio",
        "faqCluster": "efficiency"
      }
    ],
    "relatedValuations": [
      "peer-comparison",
      "dupont-decomposition"
    ],
    "relatedValuationDescriptions": {
      "peer-comparison": "The efficiency ratio is one of the most commonly used peer comparison metrics, revealing differences in cost management and operational productivity across banks of similar size and business mix.",
      "dupont-decomposition": "DuPont decomposition breaks ROE into component drivers including asset utilization and profit margin, both of which are directly affected by the efficiency ratio. A high efficiency ratio will show up as a drag on the profit margin component."
    }
  },
  {
    "slug": "deposits-to-assets",
    "name": "Deposits to Assets Ratio",
    "category": "efficiency",
    "categoryLabel": "Efficiency Ratio",
    "formula": "Deposits to Assets = Total Deposits / Total Assets",
    "isPercentage": true,
    "shortDescription": "Measures how much of a bank's total assets are funded by customer deposits rather than borrowings or other liabilities. Higher ratios typically signal a more stable and lower-cost funding base.",
    "description": "The Deposits to Assets ratio tells you how much of a bank's money comes from customer deposits like checking accounts, savings accounts, and CDs. If a bank has $100 in total assets and $80 came from deposits, the ratio is 80%.\n\nThis is one of the most straightforward ways to assess a bank's funding structure. Customer deposits are generally the cheapest and most reliable source of funding because depositors tend to keep their money in place, especially in checking and savings accounts. The alternative, borrowing from wholesale markets through instruments like Federal Home Loan Bank advances or repurchase agreements, costs more and can dry up during periods of financial stress.\n\nA bank with a high deposits-to-assets ratio has built what the industry calls a strong 'deposit franchise,' meaning it can attract and hold onto customer deposits without paying excessive interest rates. This structural advantage flows directly into profitability because lower funding costs widen the spread between what the bank earns on loans and what it pays for deposits.",
    "formulaExplanation": "Total Deposits includes every type of customer deposit account: non-interest-bearing checking accounts, interest-bearing checking (NOW accounts), savings accounts, money market deposit accounts, and certificates of deposit (CDs). Both retail and commercial deposits are included. Total Assets is the sum of everything the bank owns or is owed, including loans, investment securities, cash, premises, and other assets. Both figures come from the bank's balance sheet and represent point-in-time snapshots as of the reporting date.",
    "interpretation": "A higher ratio means the bank funds most of its operations through customer deposits, which is generally a sign of funding strength. Deposits are considered \"sticky\" because customers rarely move their entire banking relationship over small rate differences, particularly for checking accounts tied to direct deposits and bill payments.\n\nA lower ratio indicates the bank relies more heavily on non-deposit sources like Federal Home Loan Bank borrowings, subordinated debt, or repurchase agreements. This isn't automatically a problem. Some banks intentionally use wholesale funding to support specific lending strategies or because they're growing faster than deposits can keep up. But a persistently low or declining ratio warrants a closer look at why the bank can't fund itself primarily through deposits.\n\nWatching the trend matters more than any single quarter's reading. A bank whose deposits-to-assets ratio is gradually falling may be losing depositors to competitors, growing assets through borrowed money, or shifting its business model away from traditional deposit-funded lending.",
    "typicalRange": "Most traditional community and regional banks carry deposits-to-assets ratios between 75% and 90%. Banks below 70% are likely supplementing deposits with meaningful amounts of wholesale borrowings or other non-deposit liabilities.\n\nWithin the typical range, positioning tends to reflect business model more than quality. A community bank in a deposit-rich rural market might naturally run at 85-90%, while a fast-growing bank in a competitive urban market might sit at 75-80% because loan demand outpaces deposit gathering. Ratios above 90% are possible but uncommon, and they sometimes indicate the bank has limited non-deposit business activities or excess deposits it hasn't fully deployed into earning assets.",
    "goodBad": {
      "good": "Ratios above 80% indicate the bank has a solid deposit-funded balance sheet. Banks at this level typically benefit from lower overall funding costs, less exposure to wholesale funding market disruptions, and more predictable liability behavior. A ratio in the 80-90% range is common among well-established community banks with loyal depositor bases.",
      "bad": "Ratios below 65-70% suggest significant reliance on non-deposit funding sources. These banks face higher interest costs on borrowed funds, greater sensitivity to credit market conditions, and potential liquidity pressure if wholesale funding markets tighten. A declining ratio that moves below 70% is a more concerning signal than a bank that has historically operated at that level by design."
    },
    "considerations": [
      "Deposit composition is more important than the aggregate ratio. A bank with an 85% deposits-to-assets ratio composed mostly of rate-sensitive CDs and brokered deposits has a very different risk profile than one where the majority of deposits are non-interest-bearing checking accounts and sticky savings balances.",
      "Some banks operate with lower deposits-to-assets ratios by design. Banks with active mortgage banking operations, large securities portfolios funded by Federal Home Loan Bank advances, or specialized lending niches may use wholesale funding strategically. A lower ratio in these cases reflects business model choice rather than deposit-gathering weakness.",
      "Very high ratios (above 90%) can indicate the bank has gathered more deposits than it can productively deploy. If the bank is sitting on excess deposits invested in low-yielding overnight funds or short-term securities, the high ratio doesn't necessarily translate into profitability.",
      "Compare within peer groups that share similar business models and market characteristics. A community bank in a small town and a fast-growing bank in a major metro area will naturally have different deposits-to-assets profiles, so raw ratio comparisons across dissimilar banks can be misleading.",
      "Seasonal fluctuations and one-time events can temporarily move this ratio. Large institutional deposits flowing in at quarter-end, government deposit programs, or the runoff of a promotional CD campaign can all cause quarter-to-quarter swings that don't reflect underlying franchise strength."
    ],
    "relatedMetrics": [
      "loans-to-deposits",
      "equity-to-assets",
      "cost-of-deposits",
      "cost-of-funds",
      "net-interest-margin"
    ],
    "relatedMetricDescriptions": {
      "loans-to-deposits": "Together these ratios reveal how deposits fund lending and overall balance sheet composition. A bank with high deposits-to-assets and moderate loans-to-deposits has a well-funded lending operation with room to grow.",
      "equity-to-assets": "Both measure balance sheet structure. Deposits fund the majority of assets, equity provides the capital cushion, and the gap between them represents other liabilities like borrowings.",
      "cost-of-deposits": "Deposits-to-assets shows the quantity of deposit funding, while cost of deposits measures its price. A bank with a high ratio and low cost has a particularly strong deposit franchise.",
      "cost-of-funds": "Banks with higher deposits-to-assets ratios tend to have lower cost of funds because deposits are typically cheaper than wholesale borrowings and other non-deposit liabilities.",
      "net-interest-margin": "Deposit-heavy funding structures generally support wider net interest margins because deposits cost less than alternative funding sources, reducing the expense side of the NIM equation."
    },
    "dataSource": "Total Deposits and Total Assets are both found on the bank's balance sheet in 10-Q and 10-K filings. For regulatory data, Call Reports (FFIEC 031/041) report both figures in Schedule RC. The ratio uses end-of-period balances rather than averages, since it measures the funding structure at a specific point in time. Quarterly earnings releases and investor presentations typically highlight deposit totals and may break out deposit composition by type.",
    "bankSpecificContext": "## Why Deposits Are the Preferred Funding Source\n\nDeposits are generally the cheapest and most stable way for a bank to fund its assets. Non-interest-bearing demand deposits (checking accounts) provide free funding since the bank pays no interest on them. Even interest-bearing deposits like savings and money market accounts typically cost less than wholesale alternatives such as Federal Home Loan Bank advances, repurchase agreements, and subordinated debt, all of which carry market-based interest rates.\n\nBeyond cost, deposits offer behavioral stability. Customers rarely move their primary banking relationship, especially when checking accounts are linked to direct deposits, automatic bill payments, and other services. This stickiness gives deposit-funded banks a predictable funding base that doesn't disappear during market stress.\n\n## The Deposit Franchise as Competitive Advantage\n\nThe ability to gather and retain deposits at competitive costs is one of banking's most durable competitive advantages. Industry analysts often refer to this as 'deposit franchise value,' and it's a major factor in bank acquisition pricing. A bank with a strong deposit franchise can fund loans at lower rates, earn wider spreads, and maintain funding access even when credit markets tighten.\n\nNon-interest-bearing deposits are the most valuable component of the franchise because they cost nothing. A bank where 30-40% of total deposits are non-interest-bearing has a structural edge that competitors cannot easily replicate, since building those relationships takes years of branch presence, commercial banking activity, and customer trust.",
    "metricConnections": "Deposits-to-assets combined with cost of deposits reveals funding efficiency. A bank running an 85% deposits-to-assets ratio with a cost of deposits of 0.50% has a significant funding advantage over a peer with a 70% ratio and 1.50% cost. The first bank has more deposit funding, and that funding is cheaper.\n\nThe ratio connects directly to balance sheet composition. As a rough framework: deposits-to-assets plus equity-to-assets plus the proportion of other liabilities (borrowings, subordinated debt) should sum to approximately 100% of assets. A bank with 82% deposits-to-assets and 10% equity-to-assets has roughly 8% funded by non-deposit borrowings and other liabilities.\n\nBanks with high deposits-to-assets ratios and low cost of deposits tend to achieve wider net interest margins because their overall funding base costs less. This relationship makes deposits-to-assets an early indicator of net interest margin potential. When combined with the loans-to-deposits ratio, the two metrics together show whether the bank has enough deposits to fund its lending and how much of its deposit base has been deployed into loans.",
    "commonPitfalls": "## Not All Deposits Are Equal\n\nThe ratio treats all deposits as a single number, but deposit quality varies enormously. A bank with 85% deposits-to-assets where half the deposits sit in non-interest-bearing checking accounts is in a fundamentally stronger position than one where most deposits are rate-sensitive certificates of deposit or brokered deposits. Brokered deposits, while technically classified as deposits, behave more like wholesale funding because they follow rates and can leave quickly when pricing changes.\n\n## Declining Ratios Deserve Investigation\n\nA falling deposits-to-assets ratio can mean several things, and the distinction matters. The bank may be growing its loan book or securities portfolio faster than deposits, which might be perfectly healthy if supported by adequate alternative funding. Or depositors may be leaving for competitors offering better rates, which signals franchise erosion. The cause of the decline determines whether it's a concern or just a reflection of growth strategy.\n\n## Quarterly Noise\n\nTemporary spikes or dips in deposits can make the ratio volatile from quarter to quarter. Seasonal patterns, large institutional deposits arriving or leaving at period-end, and the maturity of large CD portfolios can all create movements that don't reflect long-term funding strength. Looking at a four-quarter average or the trend over several years provides a more reliable picture than any single quarter.",
    "acrossBankTypes": "## Community Banks\n\nTraditional community banks with established branch networks typically show deposits-to-assets ratios of 80-90%. These banks serve as core deposit gatherers in local markets where they've built long-standing relationships with households and small businesses. Their branches act as deposit collection points, and customer loyalty keeps deposits sticky even when larger banks or online competitors offer slightly higher rates. Many community banks maintain particularly high proportions of non-interest-bearing commercial checking accounts from local business customers.\n\n## Regional and Large Banks\n\nLarger banks may show somewhat lower ratios, often in the 70-82% range, because they have greater access to and reliance on wholesale funding markets. Repurchase agreements, Federal Home Loan Bank advances, and other wholesale instruments supplement deposits to fund larger balance sheets. These banks also tend to carry more non-deposit liabilities from their capital markets, trading, and investment banking activities. A lower ratio at a large bank doesn't necessarily indicate weakness, since their diversified funding sources can be a deliberate strategy.\n\n## Online and Fintech-Oriented Banks\n\nOnline banks and fintech-oriented institutions may show high deposits-to-assets ratios, but the character of those deposits differs from traditional banks. Their deposit bases often consist almost entirely of rate-sensitive savings accounts and CDs attracted through competitive pricing. While the ratio looks strong on paper, these deposits lack the behavioral stickiness of relationship-based deposits gathered through branches. Rate increases from competitors can trigger rapid deposit outflows, making the funding less stable than the ratio alone would suggest.",
    "whatDrivesMetric": "## Deposit Gathering Capacity\n\nBranch network presence and local market share are the primary structural drivers. Banks with more branches in deposit-rich markets can attract more checking and savings accounts. Commercial banking relationships are especially valuable because operating accounts from businesses generate large, stable, non-interest-bearing balances. Customer service quality and digital banking capabilities also influence whether depositors choose one bank over another.\n\n## Pricing and Competition\n\nDeposit pricing strategy directly affects how much funding the bank can attract and retain. Banks that aggressively price deposits above market rates will gather more volume but at higher cost. Those that rely on relationship stickiness and convenience can pay less and still hold onto deposits. Competitive intensity in local markets matters too: in areas with many bank branches, pricing pressure is stronger, and gathering deposits is more expensive.\n\n## Asset Growth Relative to Deposit Growth\n\nThe ratio can move even without any change in deposit behavior. If a bank grows its loan book or securities portfolio faster than deposits grow, the ratio falls because the denominator (total assets) is expanding faster than the numerator (deposits). Conversely, a bank that slows asset growth while deposits continue flowing in will see the ratio rise.\n\n## Macroeconomic Factors\n\nOverall savings rates and consumer confidence influence aggregate deposit levels across the banking system. During periods of economic uncertainty, consumers tend to increase savings and shift money into insured bank deposits, lifting deposits-to-assets ratios industry-wide. During strong economic periods with high consumer spending, deposit growth may slow as money flows out of savings and into consumption or investment alternatives like money market funds.",
    "faqTeasers": [
      {
        "question": "What is the deposits-to-assets ratio and what does it tell me?",
        "teaser": "Deposits-to-assets measures how much of a bank's funding comes from customer deposits, with higher ratios generally indicating more stable, lower-cost funding",
        "faqSlug": "what-is-deposits-to-assets-ratio",
        "faqCluster": "efficiency"
      },
      {
        "question": "How do I evaluate a bank's funding mix?",
        "teaser": "Evaluating funding mix requires looking at deposits-to-assets, the composition of those deposits, cost of deposits, and reliance on non-deposit funding sources",
        "faqSlug": "how-to-evaluate-bank-funding-mix",
        "faqCluster": "efficiency"
      },
      {
        "question": "What does it mean when a bank relies heavily on wholesale funding vs core deposits?",
        "teaser": "The distinction between wholesale funding and core deposits directly affects bank stability and funding costs, and deposits-to-assets is one of the first indicators of this balance",
        "faqSlug": "wholesale-funding-vs-core-deposits",
        "faqCluster": "efficiency"
      }
    ],
    "relatedValuations": [
      "peer-comparison"
    ],
    "relatedValuationDescriptions": {
      "peer-comparison": "Deposits-to-assets is a standard input in peer comparison because funding structure varies significantly across banks of similar size and geography. Comparing this ratio within a peer group highlights relative deposit franchise strength."
    }
  },
  {
    "slug": "loans-to-deposits",
    "name": "Loans to Deposits Ratio",
    "category": "efficiency",
    "categoryLabel": "Efficiency Ratio",
    "formula": "Loans to Deposits = Total Loans / Total Deposits",
    "isPercentage": true,
    "shortDescription": "Measures how much of a bank's deposit base has been channeled into loans. A higher ratio means the bank is lending more aggressively relative to its deposits, while a lower ratio indicates more conservative deployment or weaker loan demand.",
    "description": "The Loans to Deposits ratio shows what percentage of a bank's deposits have been turned into loans. If a bank holds $100 in deposits and has made $80 in loans, its ratio is 80%, meaning eighty cents of every deposit dollar has been lent to borrowers.\n\nThis ratio gets at the heart of what banks do: collect deposits from savers and lend that money out. The spread between what they pay depositors and what they charge borrowers is how they earn money. A higher ratio means the bank is lending more of its deposit base, while a lower ratio means more deposits are sitting in other assets like government bonds or cash.\n\nMost banks aim for a ratio somewhere between 70% and 90%. Going much higher can create funding pressure because the bank has less liquidity cushion. Staying too low means leaving potential interest income on the table, since loans generally yield more than the securities and cash that fill the gap.",
    "formulaExplanation": "Total Loans includes all categories of lending on the bank's balance sheet: commercial and industrial loans, commercial real estate loans, residential mortgages, consumer loans, and construction loans. Some analysts use net loans (after subtracting loan loss reserves) instead of gross loans, which produces a slightly lower ratio. Total Deposits includes every type of deposit account: non-interest-bearing checking accounts, interest-bearing checking, savings accounts, money market deposit accounts, and certificates of deposit (CDs). Both figures are reported on the bank's balance sheet and represent point-in-time balances as of the reporting date.",
    "interpretation": "The loans-to-deposits ratio reflects how a bank balances two competing priorities: earning income by making loans and maintaining enough liquidity to meet deposit withdrawals and other obligations.\n\nA ratio around 80% suggests the bank is putting most of its deposits to work through lending while keeping a reasonable cushion. As the ratio climbs toward 90% and above, the bank generates more interest income but has less flexibility if deposits decline unexpectedly or loan losses spike.\n\nBelow 70%, the bank may be holding excess liquidity in lower-yielding investments like Treasury securities. This is conservative and safe, but it often weighs on profitability since securities typically yield less than loans. The direction of the trend over time matters as much as any single reading. A ratio rising steadily from 75% to 90% over several quarters tells a different story than one sitting flat at 85%.",
    "typicalRange": "Most US commercial banks operate with ratios between 70% and 90%, though this range shifts with economic conditions. During periods of strong loan demand and expansion, ratios tend to drift toward the upper end as banks find more creditworthy borrowers. In recessions or periods of weak loan demand, ratios often fall as deposits remain stable but lending slows.\n\nCommunity banks in fast-growing markets sometimes push above 90%, while banks in slower markets may sit closer to 65-75%. Ratios above 100% are uncommon but not rare, and they signal that the bank is funding some portion of its loans with sources other than deposits.",
    "goodBad": {
      "good": "Ratios between 75% and 90% generally indicate a bank that is actively lending and putting its deposit base to productive use without overextending. A ratio in this range suggests the bank has found a workable balance between generating loan income and maintaining enough liquidity to handle normal fluctuations in deposit levels and loan demand.",
      "bad": "Ratios persistently above 95-100% may signal that the bank is stretching beyond its deposit funding capacity and relying on wholesale sources that are more expensive and can dry up during market stress. Ratios consistently below 60% suggest the bank isn't generating enough loan activity to make full use of its deposit base, which usually drags on earnings since deposits carry interest costs that need to be offset by loan income."
    },
    "considerations": [
      "Economic cycles strongly influence both sides of this ratio. Loan demand rises during expansions and contracts during recessions, while deposit growth can move independently based on consumer savings behavior and competitive pricing.",
      "Bank regulators, including the FDIC and state banking departments, monitor this ratio as part of their liquidity risk assessment during examinations. Persistently elevated ratios may draw supervisory attention and potentially trigger requirements for contingency funding plans.",
      "A rapidly rising ratio over several quarters may signal aggressive lending that warrants closer scrutiny of the bank's credit quality, underwriting standards, and ability to sustain its funding base.",
      "The optimal ratio varies by bank type, geography, and business model. A 90% ratio at a community bank with a deeply loyal depositor base may be perfectly healthy, while the same ratio at a bank with rate-sensitive deposits could be concerning.",
      "Seasonal patterns can affect the ratio, particularly for banks with significant agricultural, tourism, or construction-related lending portfolios where loan balances fluctuate predictably throughout the year."
    ],
    "relatedMetrics": [
      "deposits-to-assets",
      "loans-to-assets",
      "net-interest-margin",
      "cost-of-funds"
    ],
    "relatedMetricDescriptions": {
      "deposits-to-assets": "Deposit levels as a share of assets determine the funding base available for lending. A bank with high deposits-to-assets and moderate loans-to-deposits has a well-funded lending operation with room to grow.",
      "loans-to-assets": "Shows the lending share of total assets, complementing the deposit-relative view. Together with deposits-to-assets, these three ratios map the fundamental structure of a bank's balance sheet.",
      "net-interest-margin": "A bank with a high loans-to-deposits ratio and strong NIM is efficiently converting deposit funding into lending income. Loans generally earn more than the securities that would fill the gap, so the lending intensity captured here helps explain part of the NIM picture.",
      "cost-of-funds": "As the loans-to-deposits ratio pushes above 90-95%, banks often need to raise deposit rates or turn to wholesale funding, both of which increase the overall cost of funds and can compress margins."
    },
    "dataSource": "Total Loans and Total Deposits are both found on the bank's balance sheet in quarterly and annual filings (10-Q and 10-K). Regulatory Call Reports (FFIEC 031/041) report both figures in Schedule RC. Total Loans may appear as 'Loans and leases, net' or 'Total loans' depending on the institution's reporting format. Total Deposits are typically reported as a single line item, with breakdowns by account type available in the filing notes. Quarterly earnings releases and investor presentations typically highlight both loan and deposit totals.",
    "bankSpecificContext": "Banks are fundamentally intermediaries: they gather deposits from people and businesses, then channel those funds as loans to borrowers who need capital. The spread between what the bank pays for deposits and what it earns on loans generates the majority of a bank's revenue. The loans-to-deposits ratio quantifies the intensity of that intermediation.\n\nA ratio of 75% means that for every dollar of deposits, the bank has lent out 75 cents. The remaining 25 cents sits in other assets: securities, cash held at the Federal Reserve, or other investments. That cushion provides liquidity, meaning the bank can handle deposit withdrawals and other cash needs without having to sell loans or borrow emergency funds.\n\n## Why Deposits Matter as a Funding Source\n\nDeposits are the cheapest and most stable source of funding a bank can access. Checking accounts often pay zero or near-zero interest, and even savings accounts and CDs cost far less than alternative funding. When a bank's loans exceed its deposits, it must bridge the gap with wholesale funding: Federal Home Loan Bank (FHLB) advances, brokered deposits, or borrowings in the federal funds market. These sources carry higher interest rates and can become unavailable during periods of financial stress.\n\nEpisodes of banking stress have repeatedly demonstrated this dynamic. Banks with heavy reliance on uninsured deposits and elevated loans-to-deposits ratios face sharper liquidity pressure than peers with more conservative funding profiles.\n\n## The Profitability Trade-off\n\nThere is a genuine tension embedded in this ratio. Lending more (higher ratio) typically generates more interest income but also reduces the bank's liquidity cushion and may require tapping more expensive funding. Lending less (lower ratio) preserves liquidity but means the bank is earning lower returns on a portion of its deposit base, since securities and cash typically yield less than loans. Bank management teams constantly calibrate this trade-off based on loan demand, deposit costs, and their assessment of economic conditions ahead.",
    "metricConnections": "The loans-to-deposits ratio connects directly to two complementary balance sheet ratios. Deposits-to-assets shows how much of the bank's total funding comes from deposits, while loans-to-assets reveals what share of total assets sits in the loan portfolio. Together, these three ratios map out the fundamental structure of a bank's balance sheet.\n\nThe mathematical relationship is straightforward: if deposits-to-assets is 80% and loans-to-assets is 65%, the loans-to-deposits ratio works out to roughly 81% (65 divided by 80). Knowing any two of these three ratios lets you derive the third.\n\nNet interest margin (NIM) adds an earnings dimension. A bank with a high loans-to-deposits ratio paired with a strong NIM is efficiently converting its deposit funding into lending income. If the high ratio comes with a narrow NIM, the bank may be making loans at thin spreads, taking on volume without sufficient return.\n\nCost of funds ties in as the ratio pushes higher. As loans-to-deposits climbs above 90-95%, banks often need to attract additional deposits by raising rates or turn to wholesale funding. Both actions increase the overall cost of funds and can compress margins, which is why very high ratios don't always translate into better profitability.",
    "commonPitfalls": "## Misreading a High Ratio in Isolation\n\nA loans-to-deposits ratio above 100% gets immediate attention, but it does not automatically signal danger. Some banks intentionally operate above 100% using FHLB advances or other structured borrowings as a stable complement to deposits. The real concern is when a bank's ratio is high and its non-deposit funding sources are short-term or confidence-sensitive. Context matters more than the raw number.\n\n## Ignoring Deposit Composition\n\nTwo banks can both show 85% loans-to-deposits ratios but carry very different risk profiles depending on their deposit mix. A bank funded primarily by sticky core deposits (local checking and savings accounts from long-term customers) is in a fundamentally stronger position than one with the same ratio funded by large uninsured deposits or rate-sensitive CDs. The ratio alone does not capture deposit quality, so it needs to be read alongside information about the bank's deposit base.\n\n## Comparing Across Different Bank Models\n\nLarge money center banks and diversified financial institutions often show lower loans-to-deposits ratios because significant portions of their assets sit in trading books, investment securities, and other non-loan categories. Comparing their ratio directly against a community bank that focuses almost entirely on traditional lending creates a misleading comparison. Peer group selection matters when benchmarking this ratio.\n\n## Gross vs. Net Loans\n\nThe ratio can be calculated using either gross loans (before deducting loan loss reserves) or net loans (after reserves). The difference is usually small, perhaps 1-2 percentage points, but it is worth being consistent when tracking the ratio over time or comparing across banks. If one source uses gross loans and another uses net loans, the comparison is slightly distorted.",
    "acrossBankTypes": "## Community Banks\n\nCommunity banks in growing suburban and metropolitan fringe markets frequently run loans-to-deposits ratios above 85%, sometimes approaching or exceeding 95%. Strong local loan demand for commercial real estate, small business lending, and residential construction pushes ratios higher in these markets. These banks typically have strong core deposit franchises built over decades of local presence, making elevated ratios more sustainable than they might appear in isolation. Community banks in rural or economically stable markets tend to sit lower, often between 65% and 80%, because loan demand is more limited while deposit gathering remains steady.\n\n## Regional Banks\n\nRegional banks generally operate between 75% and 90%. Their larger scale gives them more diversified loan portfolios and access to broader deposit markets. Some regional banks deliberately run higher ratios as part of a growth strategy, using FHLB advances to supplement deposit funding when loan demand outpaces deposit growth. The key factor for regionals is how quickly they can grow deposits organically versus needing to rely on wholesale or brokered deposits to sustain their lending activity.\n\n## Large National and Money Center Banks\n\nThe largest banks often show lower loans-to-deposits ratios, sometimes between 50% and 70%. This reflects their diversified business models: large portions of their balance sheets are allocated to trading assets, investment securities, derivatives, and other non-loan activities. A lower ratio at a major bank does not necessarily signal conservative lending. It reflects a fundamentally different asset composition compared to banks focused primarily on traditional commercial banking.",
    "whatDrivesMetric": "## Loan Demand\n\nThe single largest driver is borrower demand for credit in the bank's markets. Economic expansion, new business formation, commercial development, and residential housing activity all increase loan demand and push the ratio higher. Recessions and slowdowns reduce creditworthy borrowing opportunities, pulling the ratio down. Banks with geographic concentration in high-growth areas may see faster ratio increases than those in more stable markets.\n\n## Deposit Dynamics\n\nSince deposits form the denominator, changes in deposit levels directly affect the ratio even without any change in lending. Rapid deposit outflows from rate competition, loss of a major depositor, or broader market stress can spike the ratio unexpectedly. Conversely, a surge in deposit inflows can push the ratio sharply lower even while loan balances remain stable.\n\n## Management Strategy\n\nBank management sets the lending appetite and risk tolerance that determine how aggressively the institution pursues loans. Some management teams target specific loans-to-deposits ratios as part of their strategic plan, deliberately throttling or accelerating lending to stay within their preferred range. Compensation incentives for loan officers, credit policy strictness, and the board's risk appetite all influence where the ratio settles.\n\n## Regulatory and Competitive Pressures\n\nRegulatory guidance on loan concentrations, particularly in commercial real estate (CRE), can constrain loan growth even when demand is strong. The interagency CRE concentration guidance flags banks where construction and CRE loans represent elevated percentages of capital, which can cause management to slow lending even in a favorable demand environment. Competition for both loans and deposits in local markets also matters: in highly competitive areas, banks may need to lower loan rates to win business or raise deposit rates to retain funding, both of which influence the willingness to push the ratio higher.",
    "faqTeasers": [
      {
        "question": "What is a healthy loans-to-deposits ratio for a bank?",
        "teaser": "Most US banks operate between 70% and 90%, with ratios above 100% indicating reliance on non-deposit funding and ratios below 60% suggesting underutilized deposit capacity",
        "faqSlug": "healthy-loans-to-deposits-ratio",
        "faqCluster": "efficiency"
      },
      {
        "question": "What happens when a bank's loans-to-deposits ratio is too high?",
        "teaser": "A ratio persistently above 95-100% may indicate the bank relies on wholesale or brokerage funding, which is more expensive and less stable than core deposits",
        "faqSlug": "loans-to-deposits-too-high",
        "faqCluster": "efficiency"
      },
      {
        "question": "What happens when a bank's loans-to-deposits ratio is too low?",
        "teaser": "A persistently low ratio may indicate the bank is parking excess deposits in lower-yielding securities rather than generating loan income, which can weigh on profitability",
        "faqSlug": "loans-to-deposits-too-low",
        "faqCluster": "efficiency"
      },
      {
        "question": "How do I calculate the loans-to-deposits ratio for a bank?",
        "teaser": "Divide total loans by total deposits from the bank's balance sheet to find what percentage of deposits have been channeled into lending",
        "faqSlug": "how-to-calculate-loans-to-deposits",
        "faqCluster": "efficiency"
      },
      {
        "question": "What does it mean when a bank relies heavily on wholesale funding vs core deposits?",
        "teaser": "Banks with high loans-to-deposits ratios often supplement core deposits with wholesale funding, which is typically more expensive and less stable during periods of financial stress",
        "faqSlug": "wholesale-funding-vs-core-deposits",
        "faqCluster": "efficiency"
      }
    ],
    "relatedValuations": [
      "peer-comparison"
    ],
    "relatedValuationDescriptions": {
      "peer-comparison": "Loans-to-deposits is a standard peer comparison metric for evaluating how aggressively banks in a peer group are deploying their deposit bases into lending."
    }
  },
  {
    "slug": "equity-to-assets",
    "name": "Equity to Assets Ratio",
    "category": "capital",
    "categoryLabel": "Capital Ratio",
    "formula": "Equity to Assets = Total Shareholders' Equity / Total Assets",
    "isPercentage": true,
    "shortDescription": "Shows what percentage of a bank's total assets are funded by shareholders' equity rather than deposits and borrowings, providing a simple measure of capital strength and leverage.",
    "description": "The Equity to Assets ratio shows what percentage of a bank's total assets are funded by money that belongs to the bank's owners (shareholders) rather than money that was borrowed or deposited by customers. If a bank has $10 billion in assets and $1 billion in equity, its equity-to-assets ratio is 10%, meaning shareholders' capital supports ten cents of every dollar on the balance sheet.\n\nThis ratio is one of the simplest ways to gauge a bank's financial cushion. Banks operate with far more borrowed money than most businesses. Where an industrial company might fund 40-60% of its assets with equity, a typical bank funds only 8-12% with equity and relies on deposits and other liabilities for the rest. That thin equity layer is what absorbs losses when loans go bad or investments lose value, so its size matters greatly.\n\nA higher ratio means more of the bank's assets are backed by permanent capital that does not need to be repaid, giving the bank a larger buffer to weather loan losses, economic downturns, or unexpected shocks. A lower ratio means the bank is more leveraged, which can amplify returns for shareholders in good times but leaves less room for error if conditions deteriorate.\n\nBecause capital adequacy is central to bank safety and soundness, regulators set minimum thresholds for various capital ratios. Equity-to-assets (and its close cousin, the Tier 1 leverage ratio) provides the most straightforward view of bank leverage without the complexity of risk-weighting systems used in ratios like CET1 and Tier 1 capital.",
    "formulaExplanation": "Total Shareholders' Equity is the book value of what the bank's owners have invested, including common stock, preferred stock, additional paid-in capital, retained earnings accumulated over time, and accumulated other comprehensive income (AOCI). Retained earnings typically represent the largest component, since profitable banks build equity primarily by retaining a portion of their earnings each year rather than paying it all out as dividends.\n\nTotal Assets is the sum of everything the bank owns or is owed: loans, investment securities, cash and balances held at the Federal Reserve, premises and equipment, goodwill and intangible assets from acquisitions, and various other assets. For most banks, loans and investment securities together account for 80-90% of total assets.",
    "interpretation": "Equity-to-assets tells you how leveraged a bank is in the most direct terms possible. A bank at 10% is funding $10 of assets for every $1 of equity, meaning it operates at 10:1 leverage. At 8%, that leverage rises to 12.5:1. Small differences in this ratio translate into meaningfully different risk profiles.\n\nComparing a bank's equity-to-assets to its own history is often more useful than comparing it to other banks. A bank that has operated at 9-10% for a decade and suddenly drops to 7.5% may be signaling a shift in strategy, rapid asset growth that outpaced capital accumulation, or losses eating into the equity base. Any of these warrants further investigation.\n\nWhen evaluating capital adequacy, equity-to-assets works best as a first-pass filter rather than a definitive answer. It catches obvious outliers (a bank running at 6% deserves scrutiny), but it does not tell you whether the bank's capital is sufficient for the specific risks on its balance sheet. For that deeper assessment, pair it with risk-weighted capital ratios and asset quality metrics.",
    "typicalRange": "Most US commercial banks maintain equity-to-assets ratios between 8% and 12%, based on FDIC aggregate data. The industry median has hovered near 10% in recent years, though individual banks can fall well outside this range depending on their business model, growth phase, and capital management philosophy.\n\nAt the lower end, some large banks with diversified asset bases and active risk management operate with ratios closer to 7-9%. At the upper end, small community banks with limited growth prospects or mutual institutions that can only build capital through retained earnings may carry ratios of 12-15% or higher. De novo (newly chartered) banks routinely start with ratios of 15-25% before their balance sheets grow into the initial capital raise.",
    "goodBad": {
      "good": "Equity-to-assets above 10% generally signals a well-capitalized bank with a comfortable buffer against unexpected losses. Banks sustaining ratios above 12% have substantial capital cushions that can absorb significant credit stress without threatening solvency. Strong capital positions also give management more flexibility to pursue growth opportunities, pay dividends, or buy back shares without triggering regulatory concerns.",
      "bad": "Ratios below 8% suggest the bank is operating with a thin capital cushion relative to its asset base. At these levels, a moderate credit event or unexpected loss could push the bank closer to regulatory minimums, potentially triggering restrictions on dividends and share buybacks. Banks persistently below 7% may face heightened regulatory scrutiny and pressure to raise capital or slow asset growth."
    },
    "considerations": [
      "Regulatory capital requirements set effective floors. The Tier 1 leverage ratio, which closely mirrors equity-to-assets but uses regulatory Tier 1 capital rather than total equity, must be at least 4% for adequately capitalized banks and 5% for well-capitalized status. These thresholds create a practical minimum below which banks face automatic restrictions.",
      "Optimal capital levels depend on a bank's asset risk profile. A bank concentrated in low-risk residential mortgages and government securities can operate safely with less equity relative to assets than one concentrated in construction loans and commercial real estate, even if both show the same equity-to-assets ratio.",
      "Excess capital depresses ROE. Because ROE equals ROAA multiplied by the equity multiplier (assets divided by equity), carrying more equity than needed reduces leverage and pulls down returns to shareholders. Some investors view persistently high equity-to-assets ratios as a sign that management is not deploying capital productively.",
      "The ratio uses total equity, which includes preferred stock, AOCI, and other items that may not fully represent common shareholder value. For a cleaner view of common equity capitalization, compare equity-to-assets with the tangible common equity (TCE) ratio, which strips out goodwill, intangibles, and preferred stock.",
      "Trends matter more than a single snapshot. A bank whose equity-to-assets declines by a full percentage point over two years is in a different position than one that has held steady at the same level. Declining ratios may reflect rapid growth, accumulated losses, or aggressive capital distributions."
    ],
    "relatedMetrics": [
      "roe",
      "roaa",
      "loans-to-assets",
      "deposits-to-assets",
      "tangible-common-equity-ratio",
      "cet1-capital-ratio",
      "tier-1-leverage-ratio",
      "dividend-payout-ratio"
    ],
    "relatedMetricDescriptions": {
      "roe": "ROE is directly linked to equity-to-assets through the equity multiplier. Two banks with identical ROAA will show different ROE figures if they carry different amounts of equity relative to assets, making it essential to check equity-to-assets when evaluating whether high ROE reflects operating skill or thin capitalization.",
      "roaa": "ROAA measures asset-level profitability independent of capital structure. Pairing ROAA with equity-to-assets lets you calculate expected ROE through the DuPont relationship (ROE = ROAA x equity multiplier) and identify whether actual ROE aligns with what operating performance would predict.",
      "loans-to-assets": "The share of assets deployed in loans indicates how much credit risk the equity cushion must absorb. A bank with high loans-to-assets and low equity-to-assets is taking concentrated credit risk with limited capital backing.",
      "deposits-to-assets": "Deposits-to-assets and equity-to-assets together describe how the bank funds its balance sheet. The gap between the two represents other liabilities like borrowings and subordinated debt. Banks with higher deposit funding and adequate equity tend to have more stable funding profiles.",
      "tangible-common-equity-ratio": "TCE strips out goodwill and intangible assets to show the tangible capital cushion. Banks that have grown through acquisitions may show a meaningful gap between equity-to-assets and TCE, with the TCE ratio providing the more conservative capital measure.",
      "cet1-capital-ratio": "CET1 applies risk weights to assets and uses regulatory definitions of capital, offering a risk-adjusted complement to the simpler equity-to-assets view. A bank can have adequate equity-to-assets but weak CET1 if its assets carry high risk weights.",
      "tier-1-leverage-ratio": "The Tier 1 leverage ratio is the regulatory cousin of equity-to-assets, using Tier 1 regulatory capital in the numerator rather than total book equity. The two ratios track each other closely for most banks, with differences arising from regulatory capital adjustments.",
      "dividend-payout-ratio": "Dividend payments directly reduce retained earnings and therefore equity. A bank with a high payout ratio builds equity more slowly, which can constrain the equity-to-assets ratio over time if asset growth outpaces retained earnings."
    },
    "dataSource": "Total Shareholders' Equity and Total Assets are both sourced from the bank's most recent quarterly balance sheet (Call Report for banks, Y-9C for holding companies). Equity appears on the balance sheet as total equity capital, and total assets is the final line of the asset section.\n\nUnlike ROAA, which uses average assets to smooth out balance sheet fluctuations, equity-to-assets is typically calculated using period-end values to show the capital position at a specific point in time. This makes the ratio more responsive to recent changes but also means it can shift noticeably from quarter to quarter due to large transactions, capital actions, or significant deposit flows.",
    "bankSpecificContext": "## Why Capital Adequacy Matters More for Banks\n\nMost industries operate with a mix of debt and equity, but few depend on leverage as heavily as banking. A typical industrial company might fund 40-60% of its assets with equity. A bank funds 88-92% with deposits and other liabilities, leaving just 8-12% as the equity cushion that absorbs losses before depositors or other creditors bear any impact. This extreme leverage is what makes equity-to-assets such a closely watched ratio in banking.\n\nThe thin equity layer works because banking assets (primarily loans and high-quality securities) generate relatively predictable cash flows under normal conditions. Problems arise when credit losses spike during economic downturns, since even a modest percentage loss on the asset base can wipe out a significant portion of the equity cushion. A bank with 10% equity-to-assets can absorb asset losses of up to 10% before its equity is exhausted. At 8%, that capacity drops to 8%.\n\n## Equity-to-Assets vs. Risk-Weighted Capital Ratios\n\nRegulators monitor both leverage-based measures (like the Tier 1 leverage ratio, which closely parallels equity-to-assets) and risk-weighted measures (CET1, Tier 1, and Total Capital ratios). The leverage-based view treats every dollar of assets equally. The risk-weighted view assigns different weights to different asset types: government bonds receive low or zero weights, well-secured residential mortgages receive moderate weights, and commercial loans receive higher weights.\n\nNeither view is complete on its own. Equity-to-assets can miss the difference between a bank holding mostly Treasury securities and one holding mostly construction loans. Risk-weighted ratios can miss concentration risks or underweight assets that regulators have assigned favorable treatment. Using both perspectives together gives a more complete picture of capital adequacy.\n\n## The Leverage Trade-Off\n\nBank management faces a constant tension between safety and shareholder returns. More equity means a larger loss-absorbing cushion, which satisfies regulators and protects depositors. But more equity also means a lower equity multiplier, which compresses ROE. A bank earning 1.10% ROAA with 10% equity-to-assets produces 11% ROE. The same bank with 12% equity-to-assets produces only about 9.2% ROE, all else equal.\n\nThis tension explains why most banks target equity-to-assets levels modestly above regulatory minimums rather than holding substantially more capital than required. Investors generally reward banks that manage capital efficiently, returning excess capital through dividends and buybacks while maintaining enough of a buffer to weather credit stress without needing to raise new equity.",
    "metricConnections": "The inverse of equity-to-assets is the equity multiplier (total assets divided by total equity), which connects this ratio directly to the DuPont decomposition of ROE. The formula is straightforward: ROE equals ROAA multiplied by the equity multiplier. A bank with 1.00% ROAA and 10% equity-to-assets (equity multiplier of 10x) produces 10% ROE. Drop equity-to-assets to 8% (equity multiplier of 12.5x) and that same 1.00% ROAA becomes 12.5% ROE.\n\nThis relationship makes equity-to-assets the bridge between asset productivity and shareholder returns. When a bank's ROE changes from one period to the next, decomposing the change into ROAA movement and equity multiplier movement reveals whether the shift came from better (or worse) operations or from a change in leverage. The distinction matters for assessing sustainability.\n\nEquity-to-assets also complements the risk-weighted capital ratios monitored by regulators. CET1 and Tier 1 ratios apply complex risk weightings to the asset base, which can obscure total leverage. Equity-to-assets (and its regulatory counterpart, the Tier 1 leverage ratio) provide the simple, unweighted leverage check. During the 2008 financial crisis, some banks that appeared well-capitalized on risk-weighted measures were exposed as dangerously leveraged when measured on a simple leverage basis, reinforcing the importance of monitoring both perspectives.",
    "commonPitfalls": "## Ignoring Asset Risk Composition\n\nEquity-to-assets treats every dollar of assets identically, regardless of credit risk. A bank with 10% equity-to-assets holding mostly US Treasury securities has a fundamentally different risk profile than one with the same ratio concentrated in speculative commercial real estate. The first bank has far more capital than it needs relative to the risk on its books; the second may not have enough. Risk-weighted capital ratios address this gap, which is why analyzing equity-to-assets in isolation can be misleading.\n\n## Goodwill and Intangible Asset Distortion\n\nWhen a bank acquires another institution at a premium to book value, the excess purchase price is recorded as goodwill on the acquiring bank's balance sheet. Goodwill inflates total assets and total equity by the same amount, keeping the equity-to-assets ratio roughly stable. But goodwill does not absorb losses the way tangible equity does. A bank with $1 billion in equity but $300 million of that represented by goodwill has less real loss-absorbing capacity than the ratio suggests. The tangible common equity (TCE) ratio strips out these intangibles for a more conservative view.\n\n## Misreading High Ratios as Strength\n\nA high equity-to-assets ratio is not always a positive signal. Some banks carry excess capital because they lack profitable opportunities to deploy it, cannot find suitable acquisition targets, or are being cautious ahead of uncertain conditions. While the extra cushion provides safety, it also depresses ROE and may indicate management is not allocating capital effectively. Investors sometimes describe this as being overcapitalized, and it can put pressure on management to return capital through dividends or buybacks.\n\n## Snapshot Timing Effects\n\nBecause equity-to-assets uses period-end balances rather than averages, the ratio can shift noticeably from quarter to quarter based on the timing of large transactions. A bank that completes a significant loan closing or receives a large deposit inflow in the final days of a quarter may show a temporarily depressed ratio that does not reflect its typical capital position. Comparing across several quarters helps smooth out these timing effects.",
    "acrossBankTypes": "## Community Banks\n\nCommunity banks typically operate with equity-to-assets ratios between 8% and 12%. Many smaller institutions carry ratios above 10% because they retain earnings steadily while loan growth remains moderate in their local markets. Some community banks, particularly those in rural or slow-growth areas, accumulate capital above 12-14% simply because the lending opportunities available do not absorb all of their retained earnings. While this provides a strong safety cushion, it can also result in below-peer ROE.\n\n## Regional Banks\n\nRegional banks in the $10-100 billion asset range generally operate between 8% and 11%. Their equity-to-assets ratios tend to be slightly lower than community banks on average, reflecting more active capital management, share buyback programs, and acquisition activity that deploys capital. Regionals that have completed recent acquisitions may show temporarily elevated goodwill balances, widening the gap between equity-to-assets and the more conservative TCE ratio.\n\n## Large and Money Center Banks\n\nThe largest banks often run with equity-to-assets ratios in the 7-10% range. Their diversified asset bases, access to wholesale funding markets, and active risk management allow them to operate with somewhat less equity per dollar of assets. These banks are also subject to additional capital surcharges (G-SIB buffers) that affect their risk-weighted ratios but do not directly change the equity-to-assets calculation.\n\n## De Novo Banks\n\nNewly chartered banks present a unique pattern. They raise initial capital before building a loan portfolio, so they often start with equity-to-assets ratios of 15-25%. Over the first five to seven years, the ratio declines steadily as the bank originates loans, grows its deposit base, and deploys its initial capital. This declining trend is expected and healthy for a de novo institution.\n\n## Mutual Institutions\n\nMutual savings banks and mutual savings associations cannot issue common stock. Their only source of equity growth is retained earnings. As a result, mutual institutions tend to carry higher equity-to-assets ratios than comparable stock-form banks, sometimes exceeding 12-15%. This is partly a structural necessity and partly a reflection of their generally conservative operating philosophy.",
    "whatDrivesMetric": "## Equity Side (Numerator)\n\nRetained earnings are the primary engine of equity growth for most banks. Net income minus dividends equals the addition to retained earnings each quarter, so profitability directly feeds the numerator. Banks with higher earnings retention rates build equity faster, while those distributing most of their earnings through dividends or buybacks grow equity more slowly.\n\nShare buybacks reduce equity directly by removing shares and their associated book value. A bank aggressively repurchasing stock can hold equity-to-assets flat or push it down even while generating solid profits, because the equity returned to shareholders offsets the retained earnings.\n\nCapital raises through stock issuance increase equity. Banks typically raise new equity through secondary offerings or private placements when they need to fund growth, complete acquisitions, or rebuild capital after losses. Accumulated other comprehensive income (AOCI) can also move equity, particularly when large unrealized gains or losses on the securities portfolio flow through.\n\n## Asset Side (Denominator)\n\nLoan growth is the most common reason total assets increase. When a bank originates new loans, total assets rise and equity-to-assets falls unless equity grows proportionally. During periods of strong loan demand, banks with aggressive lending strategies may see their equity-to-assets ratios decline from balance sheet expansion alone.\n\nDeposit inflows and outflows affect total assets because deposits fund the purchase of assets (loans and securities). A bank experiencing rapid deposit growth may temporarily show a lower equity-to-assets ratio as the asset base swells. Conversely, deposit outflows can shrink the balance sheet and push the ratio higher.\n\nInvestment securities portfolio changes, borrowing activity, and asset sales or dispositions all move total assets. Banks sometimes manage their equity-to-assets ratio actively by adjusting the size of their securities portfolio or letting certain assets run off.\n\n## Regulatory Influence\n\nRegulatory capital requirements create effective floors. The Tier 1 leverage ratio requirement of 4% (5% for well-capitalized status) means equity-to-assets rarely drops much below 7-8% at healthy institutions, since regulatory Tier 1 capital closely tracks total book equity for most banks. Stress testing requirements at larger banks add another layer, as banks must demonstrate they can maintain adequate capital through severe economic scenarios.",
    "faqTeasers": [
      {
        "question": "What is the equity-to-assets ratio and what is a good level for banks?",
        "teaser": "Most US banks operate with equity-to-assets between 8% and 12%, with the appropriate level depending on asset risk composition and growth strategy",
        "faqSlug": "what-is-a-good-equity-to-assets-ratio",
        "faqCluster": "capital-and-risk"
      },
      {
        "question": "What is the DuPont decomposition and how does it apply to banks?",
        "teaser": "DuPont decomposition breaks ROE into ROAA multiplied by the equity multiplier, separating operating performance from the leverage effect that equity-to-assets measures",
        "faqSlug": "dupont-decomposition-for-banks",
        "faqCluster": "profitability"
      },
      {
        "question": "Can ROE be too high for a bank? What does that signal?",
        "teaser": "Unusually high ROE can reflect thin capitalization rather than strong operations, and checking equity-to-assets helps distinguish the two",
        "faqSlug": "can-roe-be-too-high",
        "faqCluster": "profitability"
      },
      {
        "question": "What happens if a bank falls below minimum capital requirements?",
        "teaser": "Banks that fall below capital minimums face automatic restrictions on dividends and buybacks, with escalating regulatory consequences if the shortfall persists",
        "faqSlug": "what-happens-below-minimum-capital",
        "faqCluster": "capital-and-risk"
      }
    ],
    "relatedValuations": [
      "roe-pb-framework",
      "peer-comparison",
      "dupont-decomposition",
      "excess-capital-return-model"
    ],
    "relatedValuationDescriptions": {
      "roe-pb-framework": "Equity-to-assets determines the equity multiplier, which links ROAA to ROE and therefore affects the justified P/B multiple through the ROE-P/B framework.",
      "peer-comparison": "Equity-to-assets is a standard peer comparison metric for assessing relative capital strength and leverage across comparable banks, helping identify which institutions are more or less conservatively capitalized.",
      "dupont-decomposition": "DuPont decomposition breaks ROE into ROAA multiplied by the equity multiplier, where the equity multiplier is the inverse of equity-to-assets. This makes equity-to-assets a direct input and the key variable separating operating performance from leverage effects.",
      "excess-capital-return-model": "The excess capital return model estimates the value a bank could unlock by returning capital above what is needed for operations and regulatory compliance. Equity-to-assets helps identify how much capital may be excess by comparing current capitalization to minimum requirements and target operating levels."
    }
  },
  {
    "slug": "loans-to-assets",
    "name": "Loans to Assets Ratio",
    "category": "balance-sheet",
    "categoryLabel": "Balance Sheet Ratio",
    "formula": "Loans to Assets = Total Loans / Total Assets",
    "isPercentage": true,
    "shortDescription": "Measures the share of a bank's total assets held as loans, indicating how much of the balance sheet is committed to lending.",
    "description": "The Loans to Assets ratio tells you how much of a bank's total assets are loans. If a bank has $10 billion in total assets and $7 billion in loans, its loans-to-assets ratio is 70%. The rest of the assets are typically investment securities, cash, and other holdings.\n\nLoans are the primary way most banks earn money. They charge borrowers interest, and loans usually pay higher rates than the alternatives (like government bonds or other securities the bank might hold instead). So a bank that puts more of its assets into loans generally earns more interest income.\n\nThe tradeoff is risk. Loans can go bad if borrowers stop paying, while Treasury securities and other high-quality bonds carry little credit risk. A bank's loans-to-assets ratio reflects a fundamental choice: how much of the balance sheet to commit to higher-yielding but riskier loans versus safer but lower-yielding alternatives. This ratio is one of the clearest signals of a bank's business model and risk profile.",
    "formulaExplanation": "Total Loans refers to all outstanding loan balances on the bank's balance sheet, including commercial and industrial loans, commercial real estate loans, residential mortgages, consumer loans, and construction loans. Most analysts use net loans (after subtracting the allowance for credit losses), though some use gross loans. Total Assets is the sum of everything the bank owns as reported on the balance sheet, including loans, investment securities, cash and due from banks, Federal Reserve balances, premises, and all other assets.",
    "interpretation": "A higher loans-to-assets ratio means the bank has committed a larger share of its balance sheet to lending. This generally supports higher net interest income because loans yield more than most other assets. But it also means the bank is accepting more credit risk, since loans are vulnerable to borrower defaults in ways that Treasury bonds and agency securities are not.\n\nA lower ratio indicates the bank holds a larger portion of assets in securities, cash, or other non-loan categories. This can reflect a conservative management approach, weak loan demand in the bank's markets, or a deliberate strategy to maintain extra liquidity. Some banks also build up securities portfolios to manage interest rate risk.\n\nWhen tracking this ratio over time, the direction of change often matters as much as the level. A bank steadily increasing its loans-to-assets ratio is growing its loan book faster than other assets, which may signal confidence in credit conditions or pressure to chase yield. A declining ratio could indicate caution, runoff in certain loan categories, or a shift toward securities.",
    "typicalRange": "Most traditional commercial banks carry loans-to-assets ratios between 60% and 75%. Within that range, the specific level depends heavily on the bank's business model, geographic markets, and management strategy.\n\nCommunity banks with a strong commercial lending focus frequently operate in the 65% to 80% range, while larger banks with diversified balance sheets (including significant trading assets, securities portfolios, and Federal Reserve balances) often fall in the 45% to 60% range. Credit unions and thrift institutions may show different patterns depending on their emphasis on mortgage lending versus consumer loans.",
    "goodBad": {
      "good": "Ratios in the 60% to 75% range are typical for well-managed commercial banks that balance earnings generation with prudent risk management. Within this range, the bank is putting a meaningful share of its assets to work in loans without overconcentrating.",
      "bad": "Ratios above 80% may signal concentration risk, particularly if the growth has been rapid. Very low ratios (below 50% for a traditional bank) could indicate weak loan demand, overly conservative management, or a strategic shift away from lending that may limit earnings potential."
    },
    "considerations": [
      "Business model is the single biggest factor determining where this ratio falls. A bank focused heavily on commercial real estate lending will naturally have a higher ratio than one that maintains a large bond portfolio for liquidity purposes.",
      "Loan quality matters more than loan quantity. A bank with a 70% loans-to-assets ratio and low delinquencies is in a far stronger position than one at 70% with rising non-performing loans.",
      "Securities provide liquidity that loans do not. Bonds can be sold quickly or pledged as collateral for borrowings, while loans are generally illiquid. Banks that keep a meaningful securities portfolio have more flexibility to meet unexpected cash needs.",
      "The direction and speed of change is informative. A ratio climbing 3-5 percentage points per year suggests aggressive loan growth that deserves scrutiny, while a gradual decline might reflect intentional balance sheet repositioning.",
      "Regulatory concentration limits, especially for commercial real estate, can cap how much a bank can realistically lend regardless of demand. Regulators flag CRE concentrations above 300% of capital and construction concentrations above 100% of capital."
    ],
    "relatedMetrics": [
      "loans-to-deposits",
      "deposits-to-assets",
      "equity-to-assets",
      "net-interest-margin",
      "non-performing-loans-ratio"
    ],
    "relatedMetricDescriptions": {
      "loans-to-deposits": "Loans-to-deposits measures lending relative to the deposit base, while loans-to-assets measures lending relative to the entire balance sheet. A bank can have a high loans-to-deposits ratio but a moderate loans-to-assets ratio if it funds loans with non-deposit sources.",
      "deposits-to-assets": "These two ratios together map the fundamental structure of a bank's balance sheet. Knowing both the share of assets funded by deposits and the share deployed in loans reveals how the balance sheet is constructed.",
      "equity-to-assets": "Capital and lending levels together indicate overall risk appetite. A bank with high loans-to-assets and low equity-to-assets is taking concentrated credit risk with limited capital backing.",
      "net-interest-margin": "Banks with higher loans-to-assets ratios tend to produce wider NIM because loans yield more than investment securities. The asset mix indicated by loans-to-assets is one of the primary structural drivers of NIM.",
      "non-performing-loans-ratio": "The NPL ratio measures the credit quality of the loan portfolio, and loans-to-assets measures the size of that portfolio relative to total assets. Together, they indicate how much credit risk exposure the bank carries."
    },
    "dataSource": "Total loans and total assets are both reported on the bank's quarterly balance sheet (call report or 10-Q). For the most current snapshot, use the most recent quarter-end filing.",
    "bankSpecificContext": "Loans are the core earning asset for most commercial banks. The loans-to-assets ratio measures what share of the bank's total assets is committed to this primary business activity. The remainder of assets typically includes investment securities, cash and equivalents, Federal Reserve balances, premises and equipment, and other holdings.\n\nBecause loans generally earn higher yields than investment securities, banks with higher loans-to-assets ratios tend to generate higher net interest margin (NIM), all else equal. A bank earning 5.5% on its loan portfolio and 3.5% on its securities portfolio will produce more net interest income if 70% of assets are in loans than if only 55% are.\n\nThe flip side is credit risk. Loans can default. Securities (particularly government and agency bonds) carry negligible credit risk by comparison. So a higher loans-to-assets ratio implies greater exposure to potential loan losses, making the ratio an early indicator of how much credit risk the bank's equity must absorb.\n\nThe ratio also reflects liquidity positioning. Securities can be sold or pledged as collateral far more easily than loans. Banks that maintain larger securities portfolios relative to loans have more balance sheet flexibility during periods of stress or unexpected deposit outflows.",
    "metricConnections": "Loans-to-assets connects directly to net interest margin because a higher proportion of assets in loans (versus lower-yielding securities) supports wider interest margins. When two otherwise similar banks report different NIMs, differing asset mix is often part of the explanation.\n\nThe ratio also informs credit risk assessment. Combined with asset quality metrics like the non-performing loans (NPL) ratio and net charge-off ratio, it indicates the total potential loss exposure from lending. A bank with 75% of assets in loans and a 2% NPL ratio has more absolute credit risk than one with 55% in loans and the same NPL rate.\n\nLoans-to-assets and deposits-to-assets together determine the loans-to-deposits ratio arithmetically. A bank with loans-to-assets of 70% and deposits-to-assets of 85% has a loans-to-deposits ratio of approximately 82% (70 divided by 85). This three-way relationship means understanding any two of these ratios tells you the third.\n\nFor profitability analysis, loans-to-assets feeds into return on average assets (ROAA) because the asset mix directly affects how much interest income the asset base generates. Higher-yielding assets (loans) contribute more to the numerator of ROAA than lower-yielding securities.",
    "commonPitfalls": "## Loan Mix Matters More Than the Ratio Alone\n\nThe ratio does not distinguish between loan types, which carry very different risk and return profiles. A bank with 75% of assets in seasoned, low loan-to-value residential mortgages has a fundamentally different risk profile than one with 75% in construction and land development loans, even though both show the same loans-to-assets ratio. Always look at the loan composition breakdown alongside this ratio.\n\n## Rapid Growth Deserves Scrutiny\n\nA rapidly rising loans-to-assets ratio may indicate aggressive lending growth, which historically correlates with future credit quality deterioration. Banks that grow loans quickly often loosen underwriting standards to sustain that growth, and the credit problems from loosened standards typically surface 2-4 years later. Comparing the pace of loan growth to the pace of overall asset growth reveals whether the ratio is rising because of strong lending or shrinking non-loan assets.\n\n## Declining Ratios Are Not Always Negative\n\nA declining ratio does not automatically indicate weakness. The bank may be deliberately pulling back from lending in a market it sees as overheated, investing in securities for safety during uncertain credit conditions, or simply facing weak loan demand in its geographic markets. Context matters: check whether the decline comes from loan runoff, securities growth, or both.",
    "acrossBankTypes": "Most US commercial banks carry loans-to-assets ratios between 55% and 75%, based on FDIC aggregate data. The distribution varies meaningfully across bank types.\n\nCommunity banks focused on commercial lending often operate in the 65% to 80% range. These banks typically have fewer non-loan earning assets and a simpler balance sheet structure, with loans as the dominant asset category. Their business model centers on relationship lending in local markets, which naturally produces higher loan concentrations.\n\nLarge money center banks tend to show ratios in the 45% to 60% range. Their balance sheets include significant trading assets, investment securities portfolios, Federal Reserve balances, and other assets that reduce the loan share even when absolute loan balances are enormous.\n\nBanks growing loan portfolios aggressively may temporarily push above 75%, while banks in contraction mode or facing weak loan demand may fall below 55%. Thrift institutions and banks with heavy mortgage portfolios can show different patterns depending on whether they hold originated loans on balance sheet or sell them into the secondary market.",
    "whatDrivesMetric": "Several factors determine where a bank's loans-to-assets ratio falls and how it changes over time.\n\n- Loan demand in the bank's target markets is the most direct driver. Economic growth, commercial development activity, housing markets, and consumer borrowing patterns all influence how many qualifying borrowers seek loans. A bank in a growing metropolitan area with strong commercial activity will generally have more lending opportunities than one in a stagnant rural market.\n\n- Management's lending strategy and risk appetite determine how aggressively the bank converts deposits and other funding into loans. Some management teams pursue loan growth actively, while others prioritize maintaining larger securities portfolios and liquidity cushions.\n\n- Investment portfolio strategy decisions shape the denominator effect. Banks that maintain larger securities portfolios for liquidity management, interest rate risk hedging, or pledging requirements will show lower loans-to-assets ratios even if their lending activity is strong.\n\n- Regulatory concentration guidance can constrain lending. Regulators flag commercial real estate (CRE) concentrations above 300% of risk-based capital for total CRE, and 100% for construction and land development loans. Banks approaching these thresholds may moderate loan growth regardless of demand.\n\n- Competitive conditions affect loan pricing and volume. In highly competitive markets, banks may lose loan opportunities to competitors willing to accept thinner margins or weaker covenant protections, pushing their ratio lower than they would prefer.",
    "faqTeasers": [
      {
        "question": "What are the most important metrics for evaluating a bank stock?",
        "teaser": "Key bank metrics span profitability (ROE, ROAA, NIM), efficiency, capital strength, asset quality, and valuation, with balance sheet ratios like loans-to-assets providing structural context",
        "faqSlug": "most-important-bank-stock-metrics",
        "faqCluster": "getting-started"
      },
      {
        "question": "How do I evaluate the credit quality of a bank's loan portfolio?",
        "teaser": "Credit quality evaluation starts with understanding the size of the loan portfolio (loans-to-assets) and then examines NPL ratios, net charge-offs, reserve coverage, and loan composition",
        "faqSlug": "how-to-evaluate-loan-credit-quality",
        "faqCluster": "capital-and-risk"
      },
      {
        "question": "How do I calculate the loans-to-assets ratio for a bank?",
        "teaser": "The calculation divides total loans by total assets from the balance sheet, with the choice between net and gross loans being the main consideration for analysts",
        "faqSlug": "how-to-calculate-loans-to-assets",
        "faqCluster": "efficiency"
      },
      {
        "question": "How do I evaluate a bank's loan portfolio composition?",
        "teaser": "Understanding what share of total assets sits in loans is the first step, followed by analyzing the mix of loan types, growth patterns, and concentration levels across the portfolio",
        "faqSlug": "evaluating-loan-portfolio-composition",
        "faqCluster": "advanced"
      }
    ],
    "relatedValuations": [
      "peer-comparison"
    ],
    "relatedValuationDescriptions": {
      "peer-comparison": "Loans-to-assets is a standard peer comparison metric because it reveals fundamental differences in how comparable banks deploy their asset bases, helping identify which institutions rely more heavily on lending versus other asset categories."
    }
  },
  {
    "slug": "book-value-per-share",
    "name": "Book Value Per Share (BVPS)",
    "category": "valuation",
    "categoryLabel": "Valuation Metric",
    "formula": "BVPS = (Total Equity - Preferred Stock) / Common Shares Outstanding",
    "shortDescription": "The accounting net asset value of a bank allocated to each share of common stock.",
    "description": "Book Value Per Share tells you how much of a bank's net worth belongs to each share of stock. If a bank owns $10 billion in assets and owes $9 billion in liabilities, the remaining $1 billion in equity is what shareholders own. Divide that by the number of shares, and you get BVPS.\n\nThe calculation takes total shareholders' equity, subtracts any preferred stock (since preferred shareholders have a separate, senior claim), and divides by the number of common shares outstanding. For a bank with $1 billion in common equity and 50 million shares, BVPS would be $20.\n\nBVPS is one of the most closely watched numbers in bank investing. Investors compare a bank's stock price to its BVPS to calculate the price-to-book (P/B) ratio, which is the primary way bank stocks are valued. A stock trading at $24 with a BVPS of $20 has a P/B of 1.2x, meaning the market prices the bank at 20% above its accounting net worth.\n\nTracking BVPS over time also reveals whether a bank is building value for shareholders. Each quarter, the portion of earnings a bank retains (rather than paying out as dividends) adds to equity and increases BVPS. Consistent BVPS growth is one of the clearest signs that a bank is compounding shareholder wealth.",
    "formulaExplanation": "Preferred stock is subtracted because BVPS measures value belonging to common shareholders only. Preferred shareholders have a separate, fixed claim on equity that ranks ahead of common stock. Shares outstanding is the count of common shares that have been issued and not repurchased through buybacks. If a bank has treasury shares from a repurchase program, those are excluded from the denominator.",
    "interpretation": "BVPS provides an accounting-based anchor for what each share of a bank is worth based on the balance sheet. Comparing the stock price to BVPS gives the P/B ratio, which tells you whether the market is pricing the bank above or below its accounting net asset value.\n\nA bank trading above book value (P/B greater than 1.0x) is being valued at a premium, usually because investors expect it to generate returns above its cost of equity. A bank trading below book value may be undervalued, or the market may be signaling concerns about the quality of the bank's assets, its earnings power, or its management.\n\nBVPS growth rate over time is often more informative than the absolute dollar value. A bank growing BVPS at 7-8% annually is doubling its per-share net worth roughly every nine to ten years, which represents real value creation regardless of where the stock price trades in any given quarter.",
    "typicalRange": "Absolute BVPS varies widely based on a bank's size, history, and share count, so comparing raw BVPS between banks is not useful. A bank with $40 BVPS is not necessarily more valuable than one with $15 BVPS.\n\nThe more meaningful comparison is the P/B ratio (stock price divided by BVPS), which typically ranges from 0.7x to 2.0x for banks. Well-run banks with strong returns on equity tend to trade in the 1.3x to 2.0x range, while banks with below-average profitability or asset quality concerns often trade at or below 1.0x. During periods of widespread banking stress, industry-wide P/B multiples have compressed below 1.0x across the board.\n\nFor BVPS growth, well-capitalized banks with moderate dividend payout ratios and solid profitability typically compound BVPS at 5-9% annually.",
    "goodBad": {
      "good": "Steadily growing BVPS over multiple years signals that a bank is retaining earnings and building shareholder value. Banks compounding BVPS at 6-9% annually while maintaining healthy capital ratios and paying reasonable dividends are doing exactly what long-term shareholders want. BVPS growth also supports a rising stock price over time, since stock prices tend to track book value growth over longer periods.",
      "bad": "Declining BVPS can result from net losses eating into equity, dividend payments exceeding earnings, dilutive stock issuances, or goodwill impairment charges. A bank showing flat or shrinking BVPS while peers are growing theirs is falling behind in value creation. Sudden drops in BVPS, particularly those driven by credit losses or large unrealized investment losses flowing through equity, warrant close scrutiny of the bank's financial health."
    },
    "considerations": [
      "Book value is an accounting figure, not a market value. Assets are recorded at historical cost or amortized cost in many cases, so BVPS may overstate or understate the true economic value of what the bank owns.",
      "Intangible assets and goodwill from acquisitions are included in book value but have no liquidation value. Banks with significant acquisition histories may have inflated BVPS relative to their tangible net worth. Tangible book value per share (TBVPS) strips these out for a more conservative view.",
      "Accumulated other comprehensive income (AOCI) can cause BVPS to swing with unrealized gains and losses on available-for-sale securities. During periods of rising interest rates, AOCI losses can depress BVPS even when the bank's core operations are performing well.",
      "Share buybacks increase BVPS by reducing the number of shares outstanding, which can create the appearance of per-share value growth even when total equity is unchanged. Separating buyback-driven BVPS growth from earnings-driven growth matters when assessing genuine value creation.",
      "Comparing absolute BVPS levels across banks is not meaningful because different share counts and capital structures make the raw dollar figure arbitrary. Compare BVPS growth rates and P/B ratios across peers instead."
    ],
    "relatedMetrics": [
      "price-to-earnings",
      "roe",
      "tangible-book-value-per-share",
      "earnings-per-share",
      "price-to-book"
    ],
    "relatedMetricDescriptions": {
      "price-to-earnings": "P/E and BVPS connect through the identity P/B = P/E x ROE, linking the two primary valuation ratios used in bank stock analysis.",
      "roe": "ROE measures how effectively a bank generates earnings from its book value and directly determines the rate at which BVPS grows through retained earnings.",
      "tangible-book-value-per-share": "TBVPS strips goodwill and intangible assets from BVPS, showing the per-share tangible net asset value for banks with acquisition histories.",
      "earnings-per-share": "EPS and BVPS are connected through the identity EPS = ROE x BVPS, and both serve as inputs to the Graham Number fair value estimate.",
      "price-to-book": "The P/B ratio uses BVPS as its denominator, making BVPS the direct foundation of the most widely used bank valuation metric."
    },
    "dataSource": "Total shareholders' equity and shares outstanding come from the bank's most recent quarterly balance sheet, found in 10-Q and 10-K filings with the SEC. Preferred stock amounts, if any, are disclosed separately in the equity section. For the most current share count, check the cover page of the most recent 10-Q or 10-K filing, which reports shares outstanding as of a recent date. Call reports (FFIEC filings) also provide equity data for banks that file them.",
    "bankSpecificContext": "Book value per share carries more weight in banking than in almost any other industry. The reason is straightforward: bank balance sheets consist primarily of financial assets (loans, securities, cash) and financial liabilities (deposits, borrowings) that are carried at or near their fair market values under accounting rules. A manufacturer's book value says little about the economic worth of its factories and patents, but a bank's book value is a much closer approximation of its actual net asset position.\n\n## Why Regulators Care About Book Value\n\nBank regulators use equity (the numerator of BVPS) as the foundation for capital adequacy requirements. Minimum capital ratios like CET1, Tier 1, and total capital are all measured as equity relative to assets or risk-weighted assets. When a bank's equity grows through retained earnings, it strengthens both BVPS and regulatory capital simultaneously. This regulatory dimension gives BVPS a practical significance that few other industries share.\n\n## BVPS as a Value Creation Measure\n\nBVPS growth over time directly measures shareholder value creation through retained earnings. A bank earning 12% ROE and paying out 35% of earnings as dividends retains 65%, adding roughly 7.8% to book value annually. Over a decade, that compounds BVPS by more than double.\n\nThe stock price of a bank may fluctuate with market sentiment, interest rate expectations, and credit cycle fears in any given quarter. But over five- and ten-year periods, stock prices tend to converge toward book value growth. A bank that has compounded BVPS at 8% annually for a decade has likely delivered strong total returns to shareholders regardless of short-term price volatility.",
    "metricConnections": "BVPS sits at the center of several important relationships in bank analysis.\n\nThe P/B ratio (stock price divided by BVPS) is the most direct connection and the primary valuation metric for banks. BVPS is also one of two inputs to the Graham Number (alongside EPS), which estimates a conservative fair value for stocks.\n\nThe mathematical identity EPS = ROE x BVPS links profitability to book value. BVPS growth is a function of how much a bank earns on its equity (ROE) and how much it retains after dividends. A bank with a 12% ROE and a 40% payout ratio grows BVPS at approximately 7.2% per year.\n\nSubtracting tangible book value per share (TBVPS) from BVPS reveals how much per-share value is attributable to goodwill and intangible assets from past acquisitions. A large gap between these two figures suggests the bank has paid significant premiums for acquired institutions, which is relevant when assessing downside risk.",
    "commonPitfalls": "## Confusing Book Value with Tangible Book Value\n\nBVPS includes goodwill and intangible assets that arose from paying above book value for acquired banks. These intangibles have no liquidation value and can be written down (impaired) if the acquisition underperforms. For banks with active acquisition histories, TBVPS is often a more conservative and useful metric. The spread between BVPS and TBVPS tells you exactly how much per-share value comes from acquisition premiums.\n\n## Ignoring AOCI Effects\n\nAccumulated other comprehensive income (AOCI) is a component of equity that captures unrealized gains and losses on available-for-sale securities. When interest rates rise sharply, bond values fall, and AOCI losses can drag down BVPS substantially. A bank's BVPS might appear stable quarter over quarter while AOCI is masking significant unrealized investment portfolio losses. Always check whether BVPS movements are driven by core earnings retention or AOCI swings.\n\n## Mistaking Buyback-Driven Growth for Organic Growth\n\nShare repurchases reduce the denominator in the BVPS formula, mechanically increasing BVPS even when total equity stays flat. A bank that buys back 5% of its shares raises BVPS by roughly 5% without actually growing its total net worth. Checking whether BVPS growth comes from rising total equity or declining share count distinguishes genuine value creation from financial engineering.\n\n## Comparing Absolute BVPS Across Banks\n\nA bank with BVPS of $50 is not inherently more valuable than one with BVPS of $15. The absolute level depends on share count, which is arbitrary. Two banks with identical total equity can have wildly different BVPS simply because one has more shares outstanding. Growth rates and P/B multiples are the appropriate cross-bank comparisons.",
    "acrossBankTypes": "## Community Banks\n\nWell-capitalized community banks with moderate dividend payouts (30-40% of earnings) and strong ROE in the 10-13% range can compound BVPS at 6-9% annually. Community banks that are considered potential acquisition targets sometimes trade at premiums to book value because acquirers typically pay 1.3x to 1.8x book value in bank M&A transactions.\n\n## Banks with Active Buyback Programs\n\nLarger banks with share repurchase programs may show faster BVPS growth because buybacks reduce the share count, concentrating equity into fewer shares. A bank earning 10% ROE with a 30% payout ratio and a 3% annual share reduction through buybacks can grow BVPS at roughly 10% per year. When evaluating these banks, separate how much BVPS growth comes from earnings retention versus share reduction to understand the underlying value creation.\n\n## Mutual-to-Stock Conversions\n\nBanks that have completed mutual-to-stock conversions (sometimes called second-step or MHC conversions) often start with very high BVPS relative to their stock price, resulting in P/B ratios well below 1.0x. The conversion process raises capital that gets added to equity, and the resulting share price is typically set below the post-conversion book value. These banks may carry strong BVPS but trade at discounts to book for years after conversion.\n\n## Growth-Oriented and Acquisitive Banks\n\nBanks pursuing growth through acquisitions tend to have higher BVPS due to goodwill added from deals, but this inflation does not represent tangible value. TBVPS is generally more informative for these institutions. Organic growth banks that expand by building loan portfolios internally tend to show steadier, more reliable BVPS growth driven by retained earnings rather than accounting entries from deals.",
    "whatDrivesMetric": "## Retained Earnings\n\nRetained earnings are the single largest driver of BVPS growth. Each quarter, the portion of net income not paid out as dividends adds directly to equity. A bank earning $3 per share and paying $1 in dividends adds $2 per share to book value. Over time, this compounding effect is the primary engine behind rising BVPS.\n\n## Share Repurchases and Issuances\n\nBuybacks reduce shares outstanding and increase BVPS mechanically. New share issuances (through secondary offerings, stock-based compensation, or acquisition currency) have the opposite effect, diluting BVPS by spreading equity across more shares. Banks that issue shares to fund acquisitions may see BVPS dilution immediately after the deal closes, even if the acquisition adds value over time.\n\n## AOCI Movements\n\nUnrealized gains and losses on available-for-sale securities flow through accumulated other comprehensive income (AOCI), a component of equity. When interest rates rise, bond values decline and AOCI losses reduce BVPS. When rates fall, the reverse occurs. These swings can be substantial and can move BVPS independently of operating performance.\n\n## Goodwill Impairment\n\nWhen a bank acquires another institution at a premium to book value, the excess is recorded as goodwill. If that acquisition later underperforms expectations, the bank must write down (impair) the goodwill, which reduces equity and BVPS in one charge. Large impairment charges can cause sudden, significant drops in BVPS.\n\n## Capital Actions and Regulatory Requirements\n\nRegulatory actions requiring a bank to raise additional equity capital (through stock issuances) dilute BVPS. Conversely, regulatory approval for capital return through dividends and buybacks allows banks to manage their BVPS growth trajectory. Stress test results from the Federal Reserve influence how much capital large banks can return, directly affecting BVPS growth rates.",
    "faqTeasers": [
      {
        "question": "What is tangible book value and why is it different from book value?",
        "teaser": "Tangible book value strips out goodwill and intangible assets from book value, providing a more conservative measure of net asset value for banks that have made acquisitions",
        "faqSlug": "tangible-book-value-vs-book-value",
        "faqCluster": "capital-and-risk"
      },
      {
        "question": "How do I calculate book value per share?",
        "teaser": "BVPS equals total shareholders' equity divided by shares outstanding, with potential adjustments for preferred stock and attention to AOCI effects",
        "faqSlug": "how-to-calculate-bvps",
        "faqCluster": "valuation"
      },
      {
        "question": "What is the difference between price-to-book and price-to-tangible-book value?",
        "teaser": "P/B uses total book value including goodwill while P/TBV strips out intangibles, and the choice between them matters most for banks that have grown through acquisitions",
        "faqSlug": "pb-vs-ptbv",
        "faqCluster": "valuation"
      },
      {
        "question": "How do I screen for banks trading below book value?",
        "teaser": "Setting a P/B filter below 1.0x finds banks priced below their accounting net worth, but profitability and asset quality filters help distinguish genuine bargains from value traps",
        "faqSlug": "screen-banks-below-book-value",
        "faqCluster": "screening"
      }
    ],
    "relatedValuations": [
      "graham-number",
      "price-to-book-valuation",
      "roe-pb-framework",
      "margin-of-safety",
      "gordon-growth-model",
      "price-to-tangible-book-valuation"
    ],
    "relatedValuationDescriptions": {
      "graham-number": "BVPS is one of two required inputs to the Graham Number, representing the asset backing component of Graham's dual-input fair value estimate.",
      "price-to-book-valuation": "BVPS is the denominator of the P/B ratio, making it the essential per-share input for price-to-book valuation.",
      "roe-pb-framework": "BVPS growth over time reflects capital compounding, and the ROE-P/B framework links this growth rate to the justified multiple investors should pay for each dollar of book value.",
      "margin-of-safety": "BVPS provides the tangible asset backing per share, and comparing market price to BVPS-derived fair value estimates helps quantify the margin of safety.",
      "gordon-growth-model": "The Gordon Growth Model can use sustainable BVPS growth as an input when estimating dividend growth rates, connecting book value accumulation to intrinsic value through the dividend channel.",
      "price-to-tangible-book-valuation": "Price-to-tangible-book valuation uses TBVPS (BVPS minus per-share intangibles) as its denominator, providing a more conservative valuation benchmark for banks that have grown through acquisitions."
    }
  },
  {
    "slug": "price-to-earnings",
    "name": "Price to Earnings (P/E) Ratio",
    "category": "valuation",
    "categoryLabel": "Valuation Metric",
    "formula": "P/E = Stock Price / Earnings Per Share",
    "shortDescription": "Measures how much investors pay for each dollar of a bank's earnings, offering a quick read on whether a stock's price looks reasonable relative to its profit.",
    "description": "The Price to Earnings ratio (P/E) tells you how much investors are paying for each dollar of profit a bank earns. If a bank's stock costs $40 and it earns $4 per share, the P/E ratio is 10. That means investors are paying $10 for every $1 of annual earnings.\n\nP/E is one of the most widely followed valuation metrics across all industries, and for good reason: it offers a quick way to gauge whether a stock's price seems reasonable relative to its earnings power. A high P/E suggests investors are optimistic about future growth, while a low P/E may signal skepticism or simply that the stock is being overlooked.\n\nFor banks, P/E requires more careful handling than it does for most companies. Bank earnings can swing dramatically from quarter to quarter because of provisions for credit losses, a charge that reflects expected future loan defaults. During a credit downturn, provisions may consume a large portion of revenue, temporarily crushing earnings and making the P/E ratio spike. During calm periods, low provisions inflate earnings and compress P/E. This volatility makes it important to look at P/E in context rather than treating it as a standalone signal.",
    "formulaExplanation": "Stock Price is the current market price of one share. Earnings Per Share (EPS) is typically calculated on a trailing twelve-month (TTM) basis, meaning the sum of the last four quarters of net income divided by diluted shares outstanding. Some analysts use forward P/E, which substitutes estimated future earnings for trailing earnings. Always use diluted EPS rather than basic EPS, as diluted EPS accounts for stock options, restricted stock units, and other securities that could increase the share count.",
    "interpretation": "A higher P/E means investors are willing to pay more for each dollar of current earnings. This usually reflects confidence in future earnings growth, strong management, or lower perceived risk. A lower P/E can mean the opposite, but it can also mean the market has simply overlooked a solid bank.\n\nThe most useful way to interpret P/E is by comparison. Compare a bank's P/E to its own historical average, to peer banks of similar size and business model, and to the broader market. A bank trading at 9x earnings when its five-year average is 12x may be undervalued, or something may have changed fundamentally. Context matters more than the number itself.\n\nTrailing P/E based on the last twelve months of earnings is backward-looking by definition. If earnings are temporarily depressed by elevated credit losses, trailing P/E will appear high even though the bank may be a reasonable value. Forward P/E, based on analyst estimates of next year's earnings, can correct for this but depends entirely on the accuracy of those estimates.",
    "typicalRange": "Bank P/E ratios typically fall between 8x and 15x during periods of normal earnings, which is meaningfully below the S&P 500 average of roughly 15-20x. Banks trade at this discount because the market views bank earnings as more cyclical and more heavily regulated than earnings in most other sectors.\n\nWithin that range, well-managed banks with above-average growth and clean asset quality tend to cluster at 12-15x, while banks facing credit quality questions or operating in slower-growth markets often trade closer to 8-10x. During broad banking sector stress, trailing P/E ratios across the industry can become unreliable because earnings are temporarily depressed.",
    "goodBad": {
      "good": "A P/E below the peer group average can be a meaningful signal, especially when the bank's fundamentals (ROE, asset quality, earnings consistency) are on par with or better than those peers. A bank trading at 9x earnings while similar-sized regional banks trade at 12x may represent a value opportunity if no fundamental reason explains the gap. Banks with P/E ratios in the 10-13x range paired with above-average ROE often represent a combination of reasonable valuation and solid profitability.",
      "bad": "A very high P/E (above 16-18x) can mean the stock is priced for growth that may not materialize, or it may signal that trailing earnings are temporarily depressed and the ratio is misleading. A very low P/E (below 7-8x) often reflects genuine market concerns: deteriorating credit quality, regulatory problems, management issues, or a business model under pressure. In either extreme, the P/E number alone is insufficient. Dig into what is driving the earnings level before drawing conclusions about valuation."
    },
    "considerations": [
      "Cyclical earnings, particularly swings in provision for credit losses, can distort bank P/E ratios significantly. Where possible, compare using normalized or mid-cycle earnings to get a clearer picture of underlying valuation.",
      "P/E is meaningless when earnings are negative or near zero. During severe credit downturns, some banks report losses, and dividing price by a negative number produces no useful information.",
      "Always compare P/E within relevant peer groups. A community bank in the Midwest should be compared to similar community banks, not to money center giants. Growth expectations, business mix, and geographic markets all affect what P/E multiple a bank deserves.",
      "One-time items such as securities gains or losses, legal settlements, and tax adjustments can significantly distort EPS in any given quarter or year. Identify and adjust for these when calculating or comparing P/E.",
      "Trailing P/E and forward P/E can tell very different stories. Trailing P/E is based on actual results but may reflect temporary conditions. Forward P/E depends on analyst estimates that may be wrong. Consider both, but understand what each one is actually measuring."
    ],
    "relatedMetrics": [
      "book-value-per-share",
      "roe",
      "earnings-per-share",
      "price-to-book",
      "pre-provision-net-revenue",
      "dividend-payout-ratio"
    ],
    "relatedMetricDescriptions": {
      "book-value-per-share": "BVPS provides the asset-based complement to the earnings-based valuation P/E captures.",
      "roe": "ROE justifies P/E multiples. Banks with higher returns on equity typically support higher earnings valuations, and the identity P/E x ROE = P/B ties the three metrics together.",
      "earnings-per-share": "EPS is the denominator of P/E. Changes in earnings per share directly drive P/E movement when the stock price holds steady.",
      "price-to-book": "P/B and P/E are connected through the identity P/B = P/E x ROE, making them complementary lenses on bank valuation.",
      "pre-provision-net-revenue": "PPNR strips out credit loss provisions to show underlying earnings power, helping investors assess whether a bank's P/E is distorted by the credit cycle.",
      "dividend-payout-ratio": "The payout ratio and P/E together determine the price-to-dividend ratio, connecting earnings valuation to income yield."
    },
    "dataSource": "EPS is calculated from trailing twelve-month net income (summing the four most recent quarterly reports) divided by diluted weighted average shares outstanding. Stock price is the current market price. Both inputs are widely available from financial data providers and SEC filings. When calculating P/E yourself, make sure to use diluted EPS and check whether the EPS figure includes or excludes one-time items.",
    "bankSpecificContext": "P/E works well for banks when earnings are running at a normal, sustainable pace, but it can mislead during periods when credit costs are abnormally high or abnormally low.\n\n## Why Bank Earnings Are More Volatile\n\nThe provision for credit losses is the main culprit. This non-cash charge reflects management's estimate of future loan losses, and it can swing dramatically from quarter to quarter. During a credit downturn, provisions may consume 30-50% or more of pre-provision net revenue (PPNR), compressing earnings and sending P/E sharply higher. During benign credit environments, low provisions flatter earnings and compress P/E to levels that may look artificially cheap.\n\n## Using P/E Alongside P/B\n\nBecause of this earnings volatility, experienced bank investors rarely rely on P/E alone. The standard practice is to evaluate P/E alongside price-to-book (P/B), which is anchored to book value rather than earnings and is therefore more stable through credit cycles. When P/E and P/B tell conflicting stories, it often signals that earnings are temporarily above or below their sustainable run rate.\n\nPPNR can also help cut through the noise. By stripping out the provision for credit losses, PPNR shows how much a bank earns before absorbing credit costs, providing a cleaner view of underlying earnings power that is not distorted by the credit cycle.",
    "metricConnections": "The identity P/E x ROE = P/B connects three of the most important bank metrics in a single equation. If you know any two, you can calculate the third.\n\nThis relationship has practical value. A bank trading at 10x earnings with a 12% ROE should trade at approximately 1.2x book value (10 x 0.12 = 1.2). If the actual P/B is significantly different from what P/E and ROE imply, something interesting may be happening. A low P/E paired with a high P/B relative to ROE often signals temporarily elevated earnings that the market expects to normalize. A high P/E paired with a low P/B typically means earnings are depressed and the market expects recovery.\n\nP/E also connects to dividend analysis. Dividing P/E by the dividend payout ratio produces the price-to-dividend ratio, a useful measure for income-focused bank investors. EPS growth, which directly affects the P/E denominator, ties into the broader picture of capital generation and book value growth over time.",
    "commonPitfalls": "## Confusing Cyclical Lows with Overvaluation\n\nA bank may appear to have a high P/E simply because a credit cycle spike in provisions temporarily depressed its earnings. This can actually represent a buying opportunity rather than overvaluation. Before reacting to an elevated P/E, check whether the earnings denominator is abnormally low by comparing current EPS to the bank's mid-cycle average.\n\n## Annualizing a Single Quarter\n\nTaking one quarter's earnings and multiplying by four to get an annualized EPS is a common shortcut that can badly mislead with banks. If that quarter contained a large securities gain, a legal settlement, or an abnormally high provision, the annualized figure will not reflect the bank's actual earning power. Use the full trailing twelve months instead.\n\n## Ignoring Peer Context\n\nComparing P/E across banks without accounting for differences in credit quality, reserve levels, business mix, and growth rates leads to poor conclusions. A bank trading at 8x might look cheaper than one at 12x, but if the 8x bank has significant credit quality deterioration, the lower multiple may be entirely justified.\n\n## Overreliance on Forward Estimates\n\nForward P/E uses analyst earnings estimates, which are only as accurate as the analyst's ability to forecast credit losses, interest rate impacts, and fee income trends. Bank earnings are notoriously difficult to forecast because provision expense can shift substantially based on economic conditions that are themselves hard to predict.",
    "acrossBankTypes": "## Large National and Regional Banks\n\nLarger banks with diversified revenue streams, significant fee income, and broad analyst coverage tend to trade at P/E multiples of 10-14x during normal earnings periods. Their earnings tend to be somewhat more stable than smaller peers because geographic and business line diversification dampens the impact of any single credit market or loan category.\n\n## Community Banks\n\nCommunity banks with limited analyst coverage often trade at modestly lower P/E multiples than larger peers, typically 8-12x. Part of this discount reflects lower stock liquidity, since fewer shares change hands daily, making the stock less attractive to institutional investors. Community banks also tend to have more concentrated loan portfolios, which can make their earnings trajectory harder for outside investors to predict.\n\n## High-Growth and Specialty Banks\n\nBanks executing successful growth strategies or operating in high-growth markets may command P/E multiples of 13-16x or higher if the market believes the growth is sustainable. Banks with specialty lending niches that generate above-average returns can also trade at premiums to the broader industry average.\n\n## Stressed Environments\n\nDuring periods of systemic banking stress, trailing P/E ratios become unreliable across the industry because earnings are temporarily depressed. In these environments, investors typically shift focus to P/B, tangible book value, and capital ratios rather than earnings-based multiples.",
    "whatDrivesMetric": "## Earnings Growth Expectations\n\nThe single most influential factor in bank P/E is where the market thinks earnings are headed. Banks with a clear path to mid-to-high single-digit EPS growth get rewarded with higher multiples. Banks with flat or declining earnings trajectories see their multiples compress, sometimes sharply.\n\n## Interest Rate Environment\n\nInterest rates affect bank P/E through net interest margin (NIM). When rates are rising or expected to rise, bank NIM typically expands, boosting earnings expectations and supporting higher P/E multiples. When the yield curve flattens or inverts, NIM compression pressures bank earnings and P/E multiples tend to contract in response.\n\n## Credit Quality Perception\n\nThe market discounts P/E for banks it believes will face elevated future credit losses. Even if current earnings are strong, a bank with a concentrated commercial real estate portfolio or rising delinquency trends may trade at a lower multiple than its recent earnings alone would justify.\n\n## Broader Market Conditions\n\nBank P/E ratios do not exist in isolation. They expand and contract with overall equity market valuations. When the S&P 500 trades at elevated multiples, bank multiples tend to be higher than when the broader market trades at lower levels, even if nothing has changed about the banks themselves. Sector-level investor sentiment, shaped by regulatory developments and macroeconomic outlook, adds another layer of influence on bank P/E levels.",
    "faqTeasers": [
      {
        "question": "What is a good P/E ratio for a bank stock?",
        "teaser": "Bank P/E ratios have historically ranged between 8x and 15x during normal earnings periods, but interpreting P/E requires understanding the credit cycle context",
        "faqSlug": "what-is-a-good-pe-for-banks",
        "faqCluster": "valuation"
      },
      {
        "question": "How do I calculate price-to-earnings for a bank?",
        "teaser": "P/E equals the share price divided by diluted earnings per share, but bank-specific considerations around provision volatility and one-time items require careful attention",
        "faqSlug": "how-to-calculate-price-to-earnings",
        "faqCluster": "valuation"
      },
      {
        "question": "How do I tell if a bank stock is overvalued or undervalued?",
        "teaser": "P/E is one of several valuation tools used to assess whether a bank stock's price is justified by its earnings, growth prospects, and risk profile",
        "faqSlug": "how-to-tell-overvalued-undervalued",
        "faqCluster": "valuation"
      }
    ],
    "relatedValuations": [
      "price-to-earnings-valuation",
      "graham-number",
      "margin-of-safety",
      "gordon-growth-model",
      "peer-comparison"
    ],
    "relatedValuationDescriptions": {
      "price-to-earnings-valuation": "P/E is the ratio used directly in price-to-earnings valuation to compare a bank's earnings multiple to its peers and historical levels.",
      "graham-number": "The Graham Number uses EPS (the denominator of P/E) as one of its two inputs, connecting P/E analysis to Graham's intrinsic value framework.",
      "margin-of-safety": "P/E levels inform margin of safety assessment by indicating how much the market is paying per dollar of earnings relative to fair value estimates.",
      "gordon-growth-model": "The Gordon Growth Model values bank stocks using earnings growth and dividend assumptions, providing an alternative earnings-based valuation approach that complements P/E analysis.",
      "peer-comparison": "P/E peer comparison is one of the most common approaches to relative bank valuation, directly using the earnings multiple to assess whether a bank trades at a premium or discount to similar institutions."
    }
  },
  {
    "slug": "price-to-book",
    "name": "Price to Book (P/B) Ratio",
    "category": "valuation",
    "categoryLabel": "Valuation Metric",
    "formula": "P/B = Stock Price / Book Value Per Share",
    "shortDescription": "Measures whether a bank's stock price is above or below the accounting value of its net assets.",
    "description": "The Price to Book ratio tells you how much investors are paying for each dollar of a bank's net assets. If a bank has $50 in book value per share and the stock trades at $75, the P/B ratio is 1.5x, meaning investors pay $1.50 for every $1.00 of book value.\n\nP/B is the most widely used valuation metric for banks because bank balance sheets are dominated by financial assets and liabilities (loans, securities, deposits) that are recorded close to their actual market values. This makes book value a more reliable anchor for valuation than it would be for a technology or consumer goods company.",
    "formulaExplanation": "Stock Price is the current market price per share. Book Value Per Share (BVPS) is calculated by dividing total common shareholders' equity by the number of shares outstanding.",
    "interpretation": "A P/B of 1.0x means the stock trades exactly at book value. Below 1.0x, investors are paying less than the accounting value of the bank's net assets, which can signal either a buying opportunity or genuine problems the market has identified. Above 1.0x, investors are paying a premium, typically because they expect the bank to generate returns that exceed its cost of capital.\n\nThe size of the premium or discount is what matters most. A bank trading at 0.7x book is being valued very differently than one at 0.95x, even though both are technically \"below book.\" Similarly, 1.2x and 2.0x both represent premiums, but they imply very different expectations about future profitability.",
    "typicalRange": "Most bank stocks trade between 0.8x and 2.0x book value. High-performing banks with return on equity (ROE) consistently above 12-15% often command multiples of 1.5x or higher. Banks earning roughly their cost of equity (typically 9-11%) tend to trade near 1.0x. During periods of sector-wide stress, the median bank P/B has dropped below 0.8x, as it did during and after the 2008 financial crisis.",
    "goodBad": {
      "good": "A P/B below 1.0x paired with solid ROE, stable asset quality, and consistent earnings growth can indicate the market is underpricing the bank. This combination is what value-oriented bank investors actively screen for.",
      "bad": "A P/B well above 2.0x requires exceptional profitability to justify. If a bank's ROE doesn't support the premium, the stock may be vulnerable to a repricing. On the other end, persistently low P/B multiples often reflect real structural issues rather than overlooked bargains."
    },
    "considerations": [
      "Book value reflects accounting conventions, not necessarily what assets and liabilities would sell for in the open market. Held-to-maturity securities, for example, are carried at amortized cost even if their market value has declined significantly.",
      "Always compare P/B alongside ROE. A bank trading at 1.5x book with 15% ROE is valued very differently than one at 1.5x book with 8% ROE, even though the headline multiple is identical.",
      "Regulatory capital requirements influence how much equity banks hold, which directly affects book value per share. Banks operating closer to minimum capital levels will have lower BVPS, all else equal.",
      "For banks that have made acquisitions, goodwill sits on the balance sheet and inflates book value above tangible net asset value. This is why analysts often look at price-to-tangible-book alongside P/B."
    ],
    "relatedMetrics": [
      "book-value-per-share",
      "roe",
      "price-to-earnings",
      "price-to-tangible-book-value"
    ],
    "relatedMetricDescriptions": {
      "book-value-per-share": "BVPS is the denominator in P/B, making it the foundation of this valuation metric.",
      "roe": "ROE is the primary driver of justified P/B multiples. Banks with higher returns on equity consistently trade at higher book value premiums.",
      "price-to-earnings": "P/E and P/B are connected through the identity P/B = P/E x ROE, making them complementary views on bank valuation.",
      "price-to-tangible-book-value": "P/TBV strips out goodwill and intangible assets from book value, providing a more conservative valuation baseline for banks that have grown through acquisitions."
    },
    "dataSource": "Book value per share comes from the common shareholders' equity line on quarterly balance sheet filings (10-Q or 10-K), divided by diluted shares outstanding. Stock price is available from any financial data provider or stock exchange.",
    "bankSpecificContext": "P/B occupies a central position in bank valuation because of how bank balance sheets are constructed. Most bank assets (loans, investment securities, cash) and liabilities (deposits, borrowings) are financial instruments recorded near fair value under accounting standards. This means book value approximates the liquidation value of a bank far more closely than it does for, say, a pharmaceutical company whose most valuable assets are patents and drug pipelines that don't appear on the balance sheet.\n\nBank regulators reinforce this focus on book value. Capital adequacy ratios, which determine whether a bank can pay dividends, buy back shares, or grow its balance sheet, are calculated using regulatory equity that starts from book value. When regulators evaluate a bank's health, they begin with book equity. Investors naturally follow the same anchor.\n\nThe relationship between P/B and ROE is what makes the metric analytically powerful beyond simple price comparison. A bank's justified P/B multiple can be derived directly from its profitability: banks earning returns well above their cost of equity should trade at premiums to book, while banks earning below their cost of equity should trade at discounts. This connection is formalized in the ROE-P/B valuation framework.",
    "metricConnections": "P/B connects directly to ROE through the justified P/B formula: justified P/B = (ROE - g) / (r - g), where g is the sustainable growth rate and r is the cost of equity. This formula makes clear that a bank's appropriate multiple depends on how much its returns exceed its cost of capital. A bank with 14% ROE, a 10% cost of equity, and 3% growth rate would have a justified P/B of about 1.57x.\n\nP/B and P/E are linked through a clean mathematical identity: P/B = P/E x ROE. If you know any two of these three values, you can calculate the third. A bank trading at 1.2x book with a 12% ROE implies a P/E of 10x. This relationship is useful for checking whether a bank's P/E and P/B multiples are internally consistent.\n\nBook value per share is the direct denominator of the P/B calculation, so anything that moves BVPS (retained earnings, share buybacks, accumulated other comprehensive income) changes P/B even if the stock price doesn't move.",
    "commonPitfalls": "The most common mistake is treating a P/B below 1.0x as an automatic buy signal. Banks trade below book for real reasons: deteriorating loan quality, weak earnings trajectory, pending regulatory actions, or management credibility issues. A discount to book value is the market's assessment that the bank's assets are worth less than their accounting values, and that assessment is correct more often than bargain hunters would like.\n\nHeld-to-maturity (HTM) securities create a specific blind spot. These bonds are carried at their original purchase cost on the balance sheet, even if rising interest rates have driven their market value well below that. A bank showing $40 in BVPS might have an adjusted tangible book value of $32 once unrealized HTM losses are factored in. Several bank failures have involved this exact dynamic, where reported book value significantly overstated the true net asset position.\n\nGoodwill from past acquisitions is another distortion. When a bank buys another bank at a premium to book, the excess purchase price is recorded as goodwill. This makes total book value look larger without adding any tangible economic value. Analysts focused on downside protection often prefer price-to-tangible-book, which strips out goodwill and other intangible assets.",
    "acrossBankTypes": "Large money center banks tend to carry more goodwill from acquisitions, which widens the gap between their P/B and P/TBV ratios. These banks also have more complex balance sheets with larger trading and derivatives books, making book value somewhat harder to interpret. Market P/B multiples for large banks often range from 1.0x to 1.8x, though the highest performers have traded above 2.0x.\n\nRegional banks typically have cleaner balance sheets with less goodwill and simpler asset mixes. Their P/B ratios tend to track their profitability more directly, with well-run regionals trading at 1.2x to 1.8x book and weaker performers falling below 1.0x.\n\nCommunity banks present a unique consideration: those perceived as acquisition targets sometimes trade at premiums that reflect potential takeover pricing rather than standalone earnings power. Acquirers in bank M&A commonly pay 1.3x to 1.8x tangible book, so community banks in consolidation-active markets may carry acquisition premium in their stock price. Banks not seen as likely targets typically trade closer to their fundamental P/B based on ROE.",
    "whatDrivesMetric": "ROE is the dominant driver. Because the justified P/B formula directly incorporates return on equity, anything that improves or degrades ROE will move the P/B multiple over time. Net interest margin (NIM) expansion, fee income growth, and operating expense control all flow through to ROE and ultimately to P/B.\n\nAsset quality perceptions affect how investors view the reliability of book value itself. If the market suspects that a bank's loan portfolio contains more losses than the allowance for credit losses reflects, the stock will trade at a lower P/B to account for the expected write-downs. Conversely, a bank with a reputation for conservative underwriting may earn a P/B premium because investors trust that its book value is solid.\n\nEarnings growth expectations matter because faster growth (when funded at returns above the cost of equity) justifies a higher multiple. A bank growing book value at 8% annually through retained earnings is compounding shareholder value and should trade at a higher P/B than a similarly profitable bank with flat growth.\n\nBroader market conditions and sector sentiment also play a role. During periods of banking sector optimism, P/B multiples expand across the board. During stress periods, even well-run banks see their multiples compress as investors apply a sector-wide risk discount.",
    "faqTeasers": [
      {
        "question": "What is a good price-to-book ratio for a bank stock?",
        "teaser": "A \"good\" P/B depends on the bank's ROE; the justified P/B framework links profitability directly to the appropriate multiple",
        "faqSlug": "what-is-a-good-pb-for-banks",
        "faqCluster": "valuation"
      },
      {
        "question": "Does a P/B ratio below 1.0 always mean a bank is undervalued?",
        "teaser": "Not necessarily; a discount to book value may reflect the market pricing in asset quality problems, earnings weakness, or management concerns",
        "faqSlug": "pb-below-one-undervalued",
        "faqCluster": "valuation"
      },
      {
        "question": "How do I calculate price-to-book for a bank?",
        "teaser": "P/B equals the current share price divided by book value per share, but understanding the composition of book value and its limitations for banks is essential",
        "faqSlug": "how-to-calculate-price-to-book",
        "faqCluster": "valuation"
      },
      {
        "question": "Why is price-to-book (P/B) the primary valuation metric for banks?",
        "teaser": "Bank balance sheets consist mostly of financial instruments carried near fair value, making book value a meaningful anchor for valuation in a way that doesn't apply to most other industries",
        "faqSlug": "why-pb-primary-bank-valuation",
        "faqCluster": "valuation"
      },
      {
        "question": "What is the difference between price-to-book and price-to-tangible-book value?",
        "teaser": "P/B uses total book value including goodwill, while P/TBV strips out intangible assets for a more conservative view of what tangible equity actually backs the stock price",
        "faqSlug": "pb-vs-ptbv",
        "faqCluster": "valuation"
      }
    ],
    "relatedValuations": [
      "price-to-book-valuation",
      "roe-pb-framework",
      "margin-of-safety",
      "graham-number",
      "gordon-growth-model",
      "price-to-tangible-book-valuation"
    ],
    "relatedValuationDescriptions": {
      "price-to-book-valuation": "P/B is the ratio used directly in price-to-book valuation, the most common approach to assessing whether a bank stock is fairly valued.",
      "roe-pb-framework": "P/B and ROE are linked through the justified P/B formula, making the current P/B ratio a key input to determining whether a bank trades at, above, or below its fundamental value.",
      "margin-of-safety": "P/B relative to the justified P/B multiple helps determine whether a sufficient margin of safety exists between market price and estimated intrinsic value.",
      "graham-number": "The Graham Number uses BVPS (the denominator of P/B) as one of its two inputs to estimate a maximum fair price.",
      "gordon-growth-model": "The Gordon Growth Model can be combined with the justified P/B framework to estimate a bank's intrinsic value based on expected dividends, growth rate, and cost of equity.",
      "price-to-tangible-book-valuation": "P/TBV valuation adjusts the standard P/B approach by removing goodwill and intangible assets from equity, providing a more conservative baseline for banks that have completed acquisitions."
    }
  },
  {
    "slug": "earnings-per-share",
    "name": "Earnings Per Share (EPS)",
    "category": "per-share",
    "categoryLabel": "Per Share Metric",
    "formula": "EPS = Net Income / Weighted Average Shares Outstanding",
    "shortDescription": "How much profit a bank earns for each share of its stock, calculated by dividing net income by the number of shares outstanding.",
    "description": "Earnings Per Share tells you how much money a bank made for each share of its stock. If a bank earned $100 million last year and has 50 million shares, its EPS is $2.00. Each share earned two dollars.\n\nEPS is one of the most widely followed numbers in investing because it connects a bank's total profits to the individual shares that investors buy and sell. Stock prices tend to follow EPS over time: banks that grow their earnings per share year after year generally see their stock prices rise, while banks with shrinking EPS often see their prices fall.\n\nBecause EPS reduces total earnings to a per-share figure, it allows investors to compare profitability across banks regardless of their total size. It is also the denominator of the price-to-earnings (P/E) ratio and one of two inputs to the Graham Number, making it a building block for several common valuation approaches.",
    "formulaExplanation": "Net Income is the bank's bottom-line profit after all expenses, taxes, and provisions for loan losses have been deducted. For banks with preferred stock outstanding, preferred dividends must be subtracted from net income to arrive at the earnings available to common shareholders.\n\nWeighted Average Shares Outstanding accounts for changes in share count during the reporting period. If a bank started the year with 50 million shares and repurchased 2 million halfway through, the weighted average would be approximately 49 million rather than 48 million, because the full share count was outstanding for half the year. Diluted EPS uses the diluted share count, which adds back shares that could be created through stock options, restricted stock units, and convertible securities.",
    "interpretation": "EPS growth is the single biggest factor behind long-term stock price appreciation for most banks. When a bank grows EPS by 8% per year, its stock price tends to follow that trajectory over time, assuming the market's willingness to pay for those earnings (the P/E multiple) stays roughly the same.\n\nConsistency matters as much as speed. A bank that grows EPS by 6-8% every year through different economic conditions is demonstrating durable earning power. One that posts 15% growth in good years and negative growth in downturns may actually deliver worse total returns because the declines erase gains and shake out investors at the wrong time.\n\nComparing EPS to dividends per share reveals the payout ratio, which shows what percentage of earnings the bank distributes to shareholders versus what it retains to fund growth. A bank earning $3.00 per share and paying $1.20 in dividends has a 40% payout ratio, retaining the other 60% to build capital and support future lending.",
    "typicalRange": "Absolute EPS levels vary enormously across banks and carry little meaning on their own. A bank with $1.50 EPS is not necessarily less profitable than one with $5.00 EPS; the difference often reflects nothing more than how many shares are outstanding. A $5 billion bank could have $2.00 EPS with 25 million shares or $5.00 EPS with 10 million shares while earning the exact same net income.\n\nWhat matters for investment analysis is the growth rate and consistency of EPS over time. Well-managed banks of all sizes generally target mid-to-high single-digit annual EPS growth. Growth rates above 10% can occur during periods of rapid organic expansion, accretive acquisitions, or aggressive share buyback programs, but sustained double-digit growth often requires scrutiny to determine whether it is repeatable.\n\nQuarter-to-quarter EPS comparisons should be made against the same quarter of the prior year rather than the preceding quarter, because bank earnings are seasonal. Many banks earn more in certain quarters due to patterns in loan demand, fee income timing, and provision cycles.",
    "goodBad": {
      "good": "Consistently growing EPS over multiple years signals that a bank is expanding its earning power on a per-share basis. Annual EPS growth in the 5-10% range, sustained through at least one credit cycle, indicates management can grow the business while maintaining discipline on expenses and credit quality. Banks that deliver this kind of steady trajectory tend to trade at higher P/E multiples and attract long-term investors.",
      "bad": "Declining EPS over several quarters or years suggests the bank is losing earning power, whether from shrinking margins, rising credit costs, or growing expenses that outpace revenue. Volatile EPS that swings sharply between strong and weak quarters can indicate concentrated loan exposures, heavy reliance on non-recurring income sources, or inadequate provisioning practices. Banks with erratic EPS patterns are harder to value and typically receive lower P/E multiples from the market."
    },
    "considerations": [
      "Diluted EPS accounts for the additional shares that would exist if all stock options, restricted stock units, warrants, and convertible instruments were exercised or converted. Always use diluted EPS rather than basic EPS when comparing banks or calculating valuation ratios.",
      "One-time items like securities gains or losses, legal settlements, tax adjustments, and gains from branch sales can significantly distort EPS in any given quarter. Identifying these items is necessary to assess the bank's recurring earnings power.",
      "Share buybacks reduce the number of shares outstanding, which increases EPS even when total net income is unchanged. A bank that repurchases 5% of its shares will see a roughly 5% boost to EPS with no underlying improvement in profitability.",
      "Compare EPS growth to ROE and total asset growth for consistency. If EPS is growing faster than net income, the difference is likely coming from share count reductions rather than genuine earnings improvement.",
      "Banks with preferred stock outstanding must subtract preferred dividends from net income before calculating EPS available to common shareholders. This adjustment is particularly relevant for larger banks, which frequently issue preferred shares as part of their regulatory capital structure."
    ],
    "relatedMetrics": [
      "price-to-earnings",
      "dividend-payout-ratio",
      "roe",
      "book-value-per-share"
    ],
    "relatedMetricDescriptions": {
      "price-to-earnings": "EPS is the denominator of P/E, directly linking per-share profitability to valuation.",
      "dividend-payout-ratio": "The relationship between EPS and dividends determines payout capacity and sustainability.",
      "roe": "ROE shows how efficiently the bank generates the earnings captured by EPS.",
      "book-value-per-share": "EPS and BVPS are connected through the identity EPS = ROE x BVPS, and both serve as inputs to the Graham Number valuation formula."
    },
    "dataSource": "Net Income is sourced from the bank's trailing twelve month (TTM) quarterly SEC filings (10-Q and 10-K reports). The TTM figure sums net income from the four most recent quarters. Diluted shares outstanding are reported on the consolidated statements of income in each quarterly filing. For banks with preferred stock, preferred dividends are disclosed on the income statement or in the equity section of the financial statement notes.",
    "bankSpecificContext": "For banks, EPS is heavily influenced by the provision for credit losses, which reflects management's estimate of expected future loan losses. Provisions can swing significantly from quarter to quarter based on changes in loan portfolio quality, economic outlook, and the accounting standard the bank follows (CECL for most US banks). A large increase in provisions can cut EPS sharply even when the bank's core lending and fee businesses are performing well.\n\nPreferred stock dividends must be subtracted from net income to arrive at EPS available to common shareholders. This adjustment matters because many banks, particularly larger institutions, have preferred shares outstanding as part of their regulatory capital structure. The preferred dividend amount is typically fixed and must be paid before common shareholders receive anything.\n\nBanks that have completed mutual-to-stock conversions (sometimes called second-step conversions) may show unusual EPS dynamics in their early years as public companies. These banks often start with excess capital and a limited number of shares outstanding, which can produce temporarily elevated EPS that normalizes as the bank deploys its capital and potentially issues additional shares.",
    "metricConnections": "EPS is the numerator input to the P/E ratio. When you divide a bank's stock price by its EPS, you get the P/E multiple, which tells you how much investors are willing to pay for each dollar of the bank's earnings. EPS is also one of two inputs (alongside book value per share) to the Graham Number formula, which estimates a maximum fair price for a stock.\n\nThe identity EPS = ROE x BVPS connects per-share earnings directly to profitability and book value. If a bank has a 10% ROE and $30 BVPS, its EPS should be approximately $3.00. EPS can increase either because the bank improves its return on equity or because it grows its book value per share through retained earnings.\n\nTrailing twelve months (TTM) EPS calculated from quarterly SEC filings may differ slightly from the annual 10-K figure due to the timing of revisions and restatements between quarterly and annual reports. The EPS growth rate, combined with the retention ratio (the portion of earnings not paid as dividends), indicates how quickly the bank is building book value per share through internal capital generation.",
    "commonPitfalls": "Always use diluted EPS rather than basic EPS for investment analysis. Diluted EPS accounts for stock options, restricted stock units, and other potentially dilutive securities that could increase the share count. The difference between basic and diluted EPS is usually small for most community banks, but it can be meaningful for larger institutions with extensive equity compensation programs.\n\nOne-time items can distort EPS in any given period and should be identified when evaluating earnings quality. Common distortions include securities gains or losses, legal settlements, tax adjustments, and gains or losses on branch sales. Looking at a single quarter's EPS without adjusting for these items can lead to inaccurate conclusions about the bank's ongoing earning power.\n\nComparing EPS across banks is meaningless without normalizing for share count. A bank with $2 EPS and 100 million shares outstanding earns the same total net income as one with $4 EPS and 50 million shares. For cross-bank profitability comparisons, use ROE or ROAA instead.\n\nBanks that have recently completed share buybacks may show EPS growth even when total net income is flat or declining, because the denominator (shares outstanding) shrinks. Check whether EPS growth is driven by earnings improvement, share count reduction, or some combination of both.",
    "acrossBankTypes": "EPS levels vary enormously by bank size and share count, making cross-bank EPS comparisons less useful than ratio-based metrics like ROE or ROAA. What matters for investment analysis is the trajectory of EPS growth and its consistency across different economic conditions.\n\nWell-managed banks of all sizes generally aim for mid-to-high single-digit annual EPS growth through a combination of revenue growth, efficiency improvements, and share repurchases. Community banks with limited access to capital markets may rely more heavily on organic earnings growth, while larger banks often supplement organic growth with active buyback programs that reduce share count.\n\nBanks in high-growth markets or those executing successful acquisition strategies may show double-digit EPS growth rates. Acquisition-driven growth deserves particular scrutiny: accretive deals boost EPS immediately, but the sustainability of that growth depends on successful integration and whether the acquirer overpaid. Serial acquirers sometimes show impressive EPS growth trajectories that mask declining organic performance.",
    "whatDrivesMetric": "## Income Drivers\n\nNet income is driven by the same factors that drive ROAA: net interest margin (NIM, the spread between interest earned and interest paid), fee income from services like wealth management and mortgage origination, operating efficiency (how well the bank controls expenses), and provision for credit losses. Interest rate movements affect NIM, which for most banks is the largest component of revenue.\n\n## Share Count Drivers\n\nThe share count denominator is affected by stock issuances, share buybacks, stock-based compensation dilution, and any conversion of preferred shares or convertible instruments. Active share buyback programs can meaningfully reduce shares outstanding over time, boosting EPS even in years when net income growth is modest.\n\n## Capital Allocation Decisions\n\nCapital management strategy determines how net income growth translates into EPS growth. A bank that retains most of its earnings and avoids buybacks will see slower EPS growth but faster book value growth. One that returns significant capital through dividends and buybacks will show faster EPS growth but needs to maintain adequate capital ratios. Acquisition activity can affect EPS in either direction depending on whether the transaction is accretive (increases EPS) or dilutive (decreases EPS) to the acquirer.",
    "faqTeasers": [
      {
        "question": "How do I calculate EPS for a bank?",
        "teaser": "EPS equals net income available to common shareholders divided by diluted shares outstanding, with bank-specific adjustments for preferred dividends and one-time items",
        "faqSlug": "how-to-calculate-eps",
        "faqCluster": "valuation"
      },
      {
        "question": "What are the most important metrics for evaluating a bank stock?",
        "teaser": "The most important bank metrics span profitability (ROE, ROAA, NIM), efficiency, capital strength, asset quality, and valuation (P/B, P/E, EPS)",
        "faqSlug": "most-important-bank-stock-metrics",
        "faqCluster": "getting-started"
      },
      {
        "question": "How do share buybacks work for bank stocks?",
        "teaser": "Buybacks reduce shares outstanding and increase EPS even when total earnings are flat, making it important to distinguish between genuine earnings growth and per-share growth from a shrinking denominator",
        "faqSlug": "how-bank-buybacks-work",
        "faqCluster": "dividends"
      }
    ],
    "relatedValuations": [
      "graham-number",
      "price-to-earnings-valuation",
      "margin-of-safety",
      "gordon-growth-model",
      "discounted-earnings-model"
    ],
    "relatedValuationDescriptions": {
      "graham-number": "EPS is one of two required inputs to calculate the Graham Number, which estimates a maximum fair price based on a bank's earnings power and asset backing.",
      "price-to-earnings-valuation": "EPS is the denominator of the P/E ratio, making it an essential input to price-to-earnings valuation methodology.",
      "margin-of-safety": "EPS directly informs intrinsic value estimates in the Graham Number and other earnings-based models, and the gap between intrinsic value and market price defines the margin of safety.",
      "gordon-growth-model": "The Gordon Growth Model uses EPS growth rates alongside dividend policy to estimate a bank's intrinsic value, making the sustainability and trajectory of EPS a direct input to the valuation.",
      "discounted-earnings-model": "The Discounted Earnings Model projects future EPS and discounts those earnings back to present value, placing EPS forecasting and growth assumptions at the center of the valuation."
    }
  },
  {
    "slug": "dividend-payout-ratio",
    "name": "Dividend Payout Ratio",
    "category": "per-share",
    "categoryLabel": "Per Share Metric",
    "formula": "Payout Ratio = Dividends Per Share / Earnings Per Share",
    "isPercentage": true,
    "shortDescription": "Measures the percentage of a bank's earnings distributed to shareholders as dividends, indicating how much profit is returned versus retained to build capital.",
    "description": "The Dividend Payout Ratio tells you how much of a bank's profit goes to shareholders as dividends. If a bank earns $4 per share and pays $1.50 in dividends, its payout ratio is 37.5%.\n\nThe money not paid out as dividends stays inside the bank as retained earnings, which builds the bank's capital base over time. This makes the payout ratio a two-sided measure: it shows both how much income shareholders receive today and how much the bank is reinvesting in its own future.\n\nFor bank investors, the payout ratio carries extra weight because banks face regulatory capital requirements that other industries don't. A bank can't simply pay out all its profits the way a software company might. Regulators expect banks to retain enough earnings to maintain strong capital buffers, and they have the authority to block dividend payments if a bank's capital position weakens.",
    "formulaExplanation": "Dividends Per Share (DPS) is the total annual dividends declared per common share over the trailing twelve months. Earnings Per Share (EPS) is net income available to common shareholders divided by the weighted average diluted share count over the same period.\n\nThe ratio can also be calculated using total dollar amounts: total dividends paid divided by total net income. Both approaches produce the same result. Using the per-share version is more common because DPS and EPS are widely reported figures.",
    "interpretation": "A lower payout ratio means the bank keeps more of its earnings, building capital faster and creating a wider safety margin for maintaining the dividend during periods when earnings decline. If a bank earns $5 per share and pays out $1.50 (a 30% ratio), earnings could fall by 70% before the dividend would exceed earnings.\n\nA higher payout ratio delivers more current income to shareholders but leaves the bank with less retained earnings to absorb losses or fund growth. Banks that pay out 60% or more of earnings have a thinner cushion if credit quality deteriorates or interest margins compress.\n\nThe ratio also signals management's view of the bank's growth prospects. A bank retaining 70% of earnings is signaling it sees profitable opportunities to deploy that capital. A bank paying out 55% may be signaling that it has fewer growth opportunities and prefers to return excess capital to shareholders.",
    "typicalRange": "Most publicly traded banks maintain dividend payout ratios between 25% and 50%, based on FDIC aggregate data and Federal Reserve filings. Community banks with limited growth opportunities often run at the higher end of this range (40-55%), while faster-growing banks tend toward the lower end (25-35%) to retain more capital for loan growth.\n\nRatios above 60% are less common in banking and warrant closer scrutiny of the bank's capital position and earnings stability. Ratios below 20% are typical only of banks in rapid growth mode, those rebuilding capital after losses, or those facing regulatory restrictions on distributions.",
    "goodBad": {
      "good": "Payout ratios between 30% and 50% generally reflect a well-managed balance between shareholder income and capital retention. Within this range, a bank can sustain its dividend through moderate earnings downturns while still building capital organically. A payout ratio that holds steady or grows gradually alongside rising EPS is an especially positive signal, as it means both dividends and retained earnings are increasing in absolute terms.",
      "bad": "Ratios above 70% leave very little earnings cushion and may force a dividend cut if the bank experiences even a modest earnings decline. A payout ratio above 100% means the bank is paying more in dividends than it earns, which depletes capital and cannot continue for long. On the other end, a 0% payout ratio (no dividend at all) is not inherently bad for a fast-growing bank, but for a mature bank, it may indicate financial stress or regulatory restrictions preventing distributions."
    },
    "considerations": [
      "Federal and state banking regulators have authority to restrict or prohibit dividend payments when a bank's capital ratios fall below well-capitalized thresholds or when the bank is subject to supervisory actions. This regulatory oversight makes the payout ratio less discretionary for banks than for companies in most other industries.",
      "Cyclical swings in earnings can make the payout ratio misleading in any single quarter. A bank with stable dividends will show a sharply higher payout ratio during a quarter with elevated loan loss provisions, even though the underlying dividend policy hasn't changed. Trailing twelve-month calculations smooth out this volatility.",
      "A steadily rising dividend paired with a stable or declining payout ratio is a strong indicator of genuine earnings growth. If dividends are growing but the payout ratio is also climbing, dividend growth is outpacing earnings growth, which has a natural ceiling.",
      "For the largest banks, the Federal Reserve's annual stress testing process directly constrains dividend capacity through the stress capital buffer (SCB) requirement. Banks must demonstrate they can maintain minimum capital ratios through a severe recession scenario before receiving approval for their capital distribution plans.",
      "Share buybacks are an alternative form of capital return that doesn't show up in the payout ratio. A bank with a 30% dividend payout ratio may actually be returning 60-70% of earnings to shareholders when buybacks are included, so examining total capital return provides a more complete picture."
    ],
    "relatedMetrics": [
      "earnings-per-share",
      "roe",
      "equity-to-assets",
      "book-value-per-share"
    ],
    "relatedMetricDescriptions": {
      "earnings-per-share": "EPS is the denominator in the payout ratio formula and determines how much profit is available for the bank to distribute as dividends.",
      "roe": "ROE and the payout ratio together determine the sustainable growth rate, connecting current profitability to the bank's capacity for organic capital growth.",
      "equity-to-assets": "The payout ratio directly affects how quickly a bank builds equity through retained earnings, which in turn drives the equity-to-assets ratio over time.",
      "book-value-per-share": "Retained earnings from the payout ratio decision flow directly into book value per share, making the payout ratio a key driver of book value growth over time."
    },
    "dataSource": "Annual dividends per share are reported in the bank's income statement and in the statement of changes in shareholders' equity. The cash flow statement shows actual cash paid for dividends, which can differ slightly from declared dividends due to timing. EPS is calculated from net income (found on the income statement) and weighted average diluted shares outstanding (reported in earnings releases and 10-Q/10-K filings). Most financial data providers calculate and display the payout ratio directly, making manual calculation unnecessary for screening purposes.",
    "bankSpecificContext": "Unlike companies in most industries, banks operate under direct regulatory oversight of their dividend policies. A technology company or retailer can set its payout ratio based purely on business strategy, but banks must factor in minimum capital requirements, supervisory expectations, and (for larger institutions) formal stress testing results.\n\n## Regulatory Capital and Dividend Capacity\n\nBanking regulators view retained earnings as the primary organic source of capital. Every dollar paid as a dividend is a dollar not added to equity, so the payout ratio directly affects how quickly a bank can build its capital ratios. When a bank's capital falls below well-capitalized thresholds, regulators can and do prohibit dividend payments entirely until capital is restored.\n\nThe Federal Reserve's stress capital buffer (SCB) framework adds another layer for large banks. After annual stress tests, each bank receives a stress capital buffer based on its projected capital depletion under a severe recession scenario. This buffer, combined with minimum requirements, creates an effective floor for capital ratios that limits how much the bank can distribute through dividends and buybacks combined.\n\n## Capital Planning and Board Oversight\n\nBank boards of directors must formally approve dividend declarations, and regulators expect the board's capital plan to demonstrate that projected dividends are sustainable under both baseline and stressed conditions. This makes dividend changes at banks more deliberate and less frequent than in industries without this oversight structure. Banks rarely raise dividends without confidence that the higher payout level can be maintained through an economic downturn.",
    "metricConnections": "The retention ratio (1 minus the payout ratio) determines what share of earnings stays inside the bank to build equity. If a bank pays out 40% of earnings, it retains 60%. This retained portion flows directly into book value per share over time.\n\nThe connection to Return on Equity (ROE) is particularly important through the sustainable growth rate formula: sustainable growth equals ROE multiplied by the retention ratio. A bank with 12% ROE and a 40% payout ratio retains 60%, producing a sustainable equity growth rate of 7.2%. This number represents how quickly the bank can grow its equity base, and therefore its lending capacity, without issuing new shares or taking on additional leverage.\n\nThe payout ratio also connects directly to valuation through the dividend discount model (DDM) and Gordon Growth Model. Both methods rely on projected future dividends, which depend on the payout ratio and earnings growth rate. A change in payout policy can significantly shift the fair value estimate under these models, making the payout ratio one of the most sensitive inputs in dividend-based bank valuation.",
    "commonPitfalls": "## Low Payout Doesn't Always Mean Strength\n\nA low payout ratio is often interpreted as a sign of financial health, but that's not always the case. A bank paying out only 15% of earnings may be doing so because regulators have restricted its distributions, because it is rebuilding capital after credit losses, or because management lacks confidence in earnings sustainability. Check whether the low payout is a choice (to fund growth) or a constraint (imposed by circumstances).\n\n## High Payout Doesn't Always Mean Danger\n\nConversely, a 55% payout ratio at a bank with stable 14% ROE, strong asset quality, and limited growth opportunities can be perfectly sustainable. Mature community banks in slower-growth markets routinely pay out more than half their earnings because retaining capital beyond what they can productively deploy would drag down returns on equity.\n\n## Payout Ratios Above 100%\n\nA payout ratio exceeding 100% means dividends are greater than current earnings. This erodes the bank's capital position and can only continue for a short time before the bank must either cut the dividend or raise capital. Watch for this during earnings downturns when banks may temporarily maintain their dividend despite reduced profits.\n\n## Single-Quarter Distortions\n\nCalculating the payout ratio from a single quarter can be highly misleading. One-time items such as large provision builds, securities gains or losses, or merger-related charges can dramatically skew quarterly earnings without reflecting the bank's underlying dividend capacity. Trailing twelve-month calculations are more reliable for evaluating payout sustainability.",
    "acrossBankTypes": "## Community Banks\n\nWell-capitalized community banks with stable earnings and limited reinvestment opportunities tend toward payout ratios of 40% to 60%. Many community bank shareholders are local investors who depend on dividend income, which influences boards to maintain relatively generous payouts. De novo (newly chartered) banks are the exception, typically paying no dividend for their first three to five years as they build their capital base and loan portfolios.\n\n## Regional and Mid-Size Banks\n\nRegional banks generally target payout ratios of 30% to 45%, balancing dividend expectations with the capital needed to fund organic growth and potential acquisitions. Banks in this size range often adjust their payout ratio over time as growth opportunities shift, raising the ratio when loan demand is soft and lowering it when expansion requires more retained capital.\n\n## Large and Systemically Important Banks\n\nThe largest banks (those subject to Federal Reserve stress testing) face the most complex payout decisions. Their total capital return, including both dividends and share buybacks, is constrained by stress test results and the stress capital buffer. These banks tend to maintain moderate dividend payout ratios (typically 25% to 40%) and use share buybacks as the flexible component of their capital return. This structure allows them to reduce buybacks during stress periods without cutting the dividend, which markets view as a much more negative signal.",
    "whatDrivesMetric": "## Board Policy and Management Strategy\n\nThe bank's board sets dividend policy based on its view of appropriate capital levels, growth prospects, and shareholder expectations. Management teams with aggressive growth plans tend to favor lower payout ratios to retain more capital for lending expansion. Boards of mature banks with limited growth opportunities often prefer higher payouts to maintain an attractive dividend yield for shareholders.\n\n## Regulatory Constraints\n\nCapital requirements create an effective ceiling on distributions. For large banks, the stress capital buffer (SCB) directly limits total capital return. For all banks, prompt corrective action provisions can restrict or eliminate dividends if capital ratios fall below well-capitalized levels. Supervisory orders such as consent decrees or memoranda of understanding frequently include dividend restrictions.\n\n## Earnings Stability\n\nBanks with volatile earnings set lower target payout ratios because cutting a dividend sends a strongly negative signal to the market. A bank that earns $4 per share in good years but only $2 in downturns will set its dividend based on what it can sustain through the cycle, not on peak earnings. Consistent, predictable earnings allow for higher payout ratios.\n\n## Growth Opportunities and Capital Deployment\n\nBanks in high-growth markets or those pursuing acquisition strategies retain more earnings to fund expansion. When loan demand is strong, the opportunity cost of paying dividends (rather than retaining capital to support more lending) is higher. Banks that have exhausted their most profitable growth opportunities often return the excess to shareholders through higher payouts.\n\n## Buyback Substitution\n\nShare repurchase programs function as an alternative capital return mechanism. A bank may deliberately maintain a moderate dividend payout ratio while returning substantial additional capital through buybacks. This approach provides flexibility because buybacks can be paused without the negative market signal that a dividend cut would create.",
    "faqTeasers": [
      {
        "question": "What is a good dividend payout ratio for a bank?",
        "teaser": "Most US banks maintain payout ratios between 25% and 50%, with the appropriate level depending on capital position, growth needs, and regulatory constraints",
        "faqSlug": "good-dividend-payout-ratio-for-banks",
        "faqCluster": "dividends"
      },
      {
        "question": "How do I evaluate whether a bank's dividend is safe?",
        "teaser": "Dividend safety assessment considers the payout ratio relative to earnings stability, capital ratios relative to regulatory minimums, and asset quality trends",
        "faqSlug": "how-to-evaluate-dividend-safety",
        "faqCluster": "dividends"
      },
      {
        "question": "How do I calculate the dividend payout ratio?",
        "teaser": "The payout ratio equals dividends per share divided by earnings per share (or total dividends divided by net income), with the retention ratio as its complement",
        "faqSlug": "how-to-calculate-dividend-payout-ratio",
        "faqCluster": "dividends"
      },
      {
        "question": "What is the relationship between ROE, payout ratio, and dividend growth?",
        "teaser": "The payout ratio connects ROE to dividend growth through the sustainable growth rate formula, linking profitability to both retained earnings and future dividend capacity",
        "faqSlug": "roe-payout-ratio-dividend-growth",
        "faqCluster": "dividends"
      },
      {
        "question": "Why do regulators sometimes restrict bank dividends?",
        "teaser": "Banking regulators can block dividend payments when capital ratios fall below required levels or when a bank is under supervisory orders, directly affecting the achievable payout ratio",
        "faqSlug": "why-regulators-restrict-dividends",
        "faqCluster": "dividends"
      }
    ],
    "relatedValuations": [
      "dividend-discount-model",
      "gordon-growth-model",
      "excess-capital-return-model"
    ],
    "relatedValuationDescriptions": {
      "dividend-discount-model": "The dividend payout ratio directly determines the dividends per share used in the dividend discount model, making it a critical input to DDM-based fair value estimates.",
      "gordon-growth-model": "The Gordon Growth Model uses dividends and dividend growth rates as primary inputs, both of which depend on the payout ratio and its trajectory over time.",
      "excess-capital-return-model": "The excess capital return model estimates value partly based on future capital distributions, which the payout ratio helps determine by defining how earnings are split between dividends and retained capital."
    }
  },
  {
    "slug": "cet1-capital-ratio",
    "name": "CET1 Capital Ratio",
    "category": "capital",
    "categoryLabel": "Capital Strength Ratio",
    "formula": "CET1 Capital Ratio = Common Equity Tier 1 Capital / Risk-Weighted Assets",
    "isPercentage": true,
    "shortDescription": "Measures a bank's highest-quality capital as a percentage of its risk-weighted assets, serving as the primary regulatory capital metric under Basel III",
    "description": "The CET1 Capital Ratio divides a bank's Common Equity Tier 1 capital by its risk-weighted assets. CET1 capital consists of common stock, retained earnings, accumulated other comprehensive income (AOCI), and qualifying minority interests, minus regulatory deductions such as goodwill and certain deferred tax assets. It is the most closely watched capital adequacy measure because it represents the capital most readily available to absorb losses.",
    "formulaExplanation": "The numerator, CET1 capital, starts with total common shareholders' equity and then applies regulatory adjustments. Goodwill, other intangible assets (except mortgage servicing rights within limits), and certain deferred tax assets are deducted. The denominator, risk-weighted assets (RWA), assigns each asset a weight based on its credit risk profile. Cash and US Treasuries carry a 0% weight, residential mortgages typically carry 50%, and most commercial loans carry 100%. Off-balance-sheet exposures such as unfunded commitments are converted to on-balance-sheet equivalents before weighting.",
    "interpretation": "A higher CET1 ratio indicates a larger capital cushion relative to the risk profile of the bank's assets. The Federal Reserve requires a minimum CET1 ratio of 4.5% for all banks, with additional buffers required depending on the institution's size and systemic importance. Most well-capitalized banks maintain CET1 ratios well above minimums, typically in the 10% to 13% range, to provide a buffer against stress scenarios and to maintain flexibility for capital returns and growth.",
    "typicalRange": "The Federal Reserve sets a minimum CET1 requirement of 4.5%. A bank is considered \"well-capitalized\" at 6.5% or above under the prompt corrective action framework. In practice, most US banks operate with CET1 ratios between 10% and 14%, reflecting both regulatory buffers and management's desire to maintain capital flexibility.",
    "goodBad": {
      "good": "CET1 ratios above 10% generally indicate strong capitalization with adequate buffers above regulatory minimums. Ratios in the 11% to 13% range suggest a bank has room for both organic growth and capital returns to shareholders while remaining well above stress-test thresholds.",
      "bad": "CET1 ratios below 8% may signal limited capital flexibility, particularly for larger banks subject to stress capital buffer requirements. Ratios approaching the 4.5% minimum trigger regulatory restrictions on dividends, buybacks, and discretionary bonus payments through the capital conservation buffer framework."
    },
    "considerations": [
      "CET1 capital includes AOCI, which means unrealized gains or losses on available-for-sale securities directly affect the ratio. During periods of rising interest rates, bond portfolio losses can reduce CET1 even if the bank has no intention of selling those securities.",
      "Risk-weighted assets are calculated using regulatory formulas that may not fully capture the true economic risk of certain exposures. Two banks with identical total assets can have very different RWA depending on their asset mix, making CET1 comparisons across banks more meaningful than simple equity-to-assets comparisons.",
      "Large banks subject to the Federal Reserve's stress tests receive a stress capital buffer (SCB) that effectively raises their CET1 requirement above the 4.5% minimum. The SCB varies by institution and is recalculated annually based on stress test results.",
      "Community banks with total assets under $10 billion may elect the Community Bank Leverage Ratio (CBLR) framework, which uses a simple leverage ratio of 9% instead of risk-based capital ratios. Banks using CBLR do not need to calculate or report CET1."
    ],
    "relatedMetrics": [
      "tier-1-capital-ratio",
      "total-capital-ratio",
      "equity-to-assets",
      "risk-weighted-assets-density",
      "tangible-common-equity-ratio",
      "roe"
    ],
    "relatedMetricDescriptions": {
      "tier-1-capital-ratio": "Tier 1 adds Additional Tier 1 capital instruments (such as non-cumulative preferred stock) to CET1, providing a broader view of high-quality capital.",
      "total-capital-ratio": "Total Capital includes both Tier 1 and Tier 2 capital, representing the full regulatory capital base available to absorb losses.",
      "equity-to-assets": "Equity to Assets provides a simpler, non-risk-weighted capital measure that complements the risk-based CET1 ratio.",
      "risk-weighted-assets-density": "RWA Density reveals how conservative or aggressive a bank's asset risk profile is, directly affecting the CET1 ratio denominator.",
      "tangible-common-equity-ratio": "TCE Ratio is an analyst-calculated measure that strips out intangibles similar to CET1 but uses total tangible assets rather than risk-weighted assets.",
      "roe": "CET1 requirements constrain leverage and therefore place a ceiling on achievable ROE, linking capital adequacy directly to profitability."
    },
    "isEducationalOnly": true,
    "whereToFindData": "CET1 ratios are reported in a bank's quarterly earnings releases, 10-Q and 10-K filings (typically in the capital adequacy section), and regulatory filings. For bank holding companies, the Federal Reserve's FR Y-9C filing contains detailed capital data. Individual bank Call Reports (FFIEC 031/041) include risk-based capital schedules. The FDIC's BankFind Suite provides summary capital ratios for FDIC-insured institutions.",
    "bankSpecificContext": "CET1 is the cornerstone of the Basel III regulatory capital framework adopted in the United States. Unlike simple leverage measures, CET1 adjusts for asset risk, meaning a bank concentrated in low-risk government securities needs less capital than one concentrated in higher-risk commercial real estate loans. This risk-sensitivity makes CET1 the preferred capital metric for regulators and sophisticated investors, but it also introduces complexity. The ratio can change not only because capital levels shift, but also because the risk profile of the asset base changes.",
    "metricConnections": "CET1 is the core component of both the Tier 1 Capital Ratio (CET1 + Additional Tier 1 capital, divided by RWA) and the Total Capital Ratio (Tier 1 + Tier 2, divided by RWA). CET1 requirements effectively cap a bank's leverage, which in turn constrains maximum ROE through the relationship ROE = ROA x Equity Multiplier. Banks with higher CET1 requirements must generate higher ROA to achieve competitive ROE. The CET1 ratio and TCE ratio often move together, but can diverge because TCE uses total tangible assets in the denominator while CET1 uses risk-weighted assets.",
    "commonPitfalls": "Comparing CET1 ratios across banks without considering their respective stress capital buffer requirements can be misleading. A bank with a 10% CET1 and a 4% SCB has less distributable capital than a bank with 10% CET1 and a 2.5% SCB. Additionally, CET1 includes AOCI by default for most banks, so large unrealized securities losses can depress the ratio even when the bank has adequate economic capital. Some investors focus on CET1 excluding AOCI to see through temporary mark-to-market fluctuations, but the regulatory ratio includes it.",
    "acrossBankTypes": "Money center and globally systemically important banks (G-SIBs) face the highest effective CET1 requirements due to G-SIB surcharges and countercyclical capital buffers, typically operating with CET1 ratios of 11% to 13%. Regional banks generally target 9% to 12%, balancing regulatory requirements with capital efficiency. Community banks that opt into the CBLR framework do not calculate CET1 at all, instead maintaining a simple 9% leverage ratio.",
    "whatDrivesMetric": "The CET1 ratio is driven by changes in both the numerator and denominator. On the capital side, retained earnings (net income minus dividends) increase CET1, while share buybacks, dividend payments, and unrealized securities losses reduce it. On the RWA side, growing the loan portfolio (particularly in higher-risk-weight categories) increases RWA and lowers the ratio, while shifting assets toward lower-risk-weight categories improves it. Regulatory changes to risk-weight calculations can also move the ratio without any change in actual capital or assets.",
    "faqTeasers": [
      {
        "question": "What is the CET1 capital ratio and why does it matter?",
        "teaser": "CET1 measures a bank's highest-quality capital relative to the risk in its asset base, serving as the primary metric regulators use to assess capital adequacy under Basel III.",
        "faqSlug": "what-is-cet1-ratio",
        "faqCluster": "capital-and-risk"
      },
      {
        "question": "What is the difference between CET1, Tier 1, and Total Capital ratios?",
        "teaser": "These three ratios form a hierarchy of capital quality, each adding progressively lower-quality capital instruments to the numerator while using the same risk-weighted asset denominator.",
        "faqSlug": "cet1-vs-tier1-vs-total-capital",
        "faqCluster": "capital-and-risk"
      },
      {
        "question": "How do I calculate the CET1 Capital Ratio?",
        "teaser": "CET1 starts with common shareholders' equity and applies regulatory deductions for goodwill, intangibles, and certain deferred tax assets before dividing by risk-weighted assets.",
        "faqSlug": "how-to-calculate-cet1-ratio",
        "faqCluster": "capital-and-risk"
      }
    ],
    "relatedValuations": [
      "excess-capital-return-model",
      "peer-comparison"
    ]
  },
  {
    "slug": "tier-1-capital-ratio",
    "name": "Tier 1 Capital Ratio",
    "category": "capital",
    "categoryLabel": "Capital Strength Ratio",
    "formula": "Tier 1 Capital Ratio = Tier 1 Capital / Risk-Weighted Assets",
    "isPercentage": true,
    "shortDescription": "Measures a bank's core capital (CET1 plus Additional Tier 1 instruments) as a percentage of risk-weighted assets",
    "description": "The Tier 1 Capital Ratio divides a bank's Tier 1 capital by its risk-weighted assets. Tier 1 capital includes both Common Equity Tier 1 (CET1) capital and Additional Tier 1 (AT1) capital. AT1 instruments are typically non-cumulative perpetual preferred stock or similar securities that can absorb losses on a going-concern basis. The ratio represents the broader measure of high-quality capital available to absorb losses while the bank continues operating.",
    "formulaExplanation": "The numerator combines CET1 capital (common stock, retained earnings, AOCI, minus regulatory deductions) with Additional Tier 1 capital. AT1 instruments must be perpetual (no maturity date), subordinated to depositors and general creditors, and capable of absorbing losses through conversion to common equity or write-down. The denominator is the same risk-weighted assets figure used in the CET1 ratio, where each asset is weighted according to its credit risk profile.",
    "interpretation": "A higher Tier 1 ratio indicates more core capital available to absorb unexpected losses. The Federal Reserve requires a minimum Tier 1 Capital Ratio of 6% for all banks. Because AT1 instruments are a relatively small portion of capital at most US banks, the Tier 1 ratio typically runs only slightly above the CET1 ratio. The gap between CET1 and Tier 1 ratios reveals how much a bank relies on preferred stock and other AT1 instruments.",
    "typicalRange": "The Federal Reserve mandates a minimum Tier 1 Capital Ratio of 6%. \"Well-capitalized\" status under the prompt corrective action framework requires 8% or above. Most US banks operate with Tier 1 ratios between 11% and 15%, with the ratio typically running 0.5 to 2 percentage points above the CET1 ratio depending on how much preferred stock the bank has outstanding.",
    "goodBad": {
      "good": "Tier 1 ratios above 11% indicate strong core capital. The relatively small spread between CET1 and Tier 1 at most US banks means that CET1 is doing most of the work, which is a positive indicator of capital quality since CET1 is the purest form of loss-absorbing capital.",
      "bad": "A Tier 1 ratio near the 6% minimum signals potential capital stress, particularly if the bank is subject to additional buffer requirements. A large gap between CET1 and Tier 1 ratios may indicate heavy reliance on preferred stock or other AT1 instruments, which are more expensive forms of capital and can create dilution risk in stress scenarios."
    },
    "considerations": [
      "AT1 instruments at most US banks consist primarily of non-cumulative perpetual preferred stock. These instruments carry a fixed dividend rate that is typically higher than the bank's cost of common equity, so heavy reliance on AT1 capital increases the overall cost of capital.",
      "Under Basel III, AT1 instruments must be capable of absorbing losses at the point of non-viability. In practice, this means the instruments can be written down or converted to common equity if the bank faces severe financial distress, potentially diluting common shareholders.",
      "The Tier 1 ratio and CET1 ratio use the same RWA denominator, so the same factors that move CET1 (changes in loan mix, risk-weight methodology updates, asset growth) also move the Tier 1 ratio.",
      "Some banks issue contingent convertible bonds (CoCos) that qualify as AT1 capital under international Basel III standards. While less common in the US than in Europe, these instruments automatically convert to equity when capital ratios fall below a specified trigger level."
    ],
    "relatedMetrics": [
      "cet1-capital-ratio",
      "total-capital-ratio",
      "tier-1-leverage-ratio",
      "equity-to-assets",
      "risk-weighted-assets-density"
    ],
    "relatedMetricDescriptions": {
      "cet1-capital-ratio": "CET1 is the largest and highest-quality component of Tier 1 capital, measuring only common equity-based capital against risk-weighted assets.",
      "total-capital-ratio": "Total Capital adds Tier 2 instruments (subordinated debt, qualifying loan loss reserves) to Tier 1, providing the broadest regulatory capital measure.",
      "tier-1-leverage-ratio": "The Tier 1 Leverage Ratio uses the same Tier 1 capital numerator but divides by average total assets instead of risk-weighted assets, providing a non-risk-weighted capital check.",
      "equity-to-assets": "Equity to Assets is a simpler accounting-based capital measure that does not apply regulatory adjustments or risk weighting.",
      "risk-weighted-assets-density": "RWA Density indicates the risk profile of the asset base that determines the Tier 1 ratio denominator."
    },
    "isEducationalOnly": true,
    "whereToFindData": "Tier 1 Capital Ratios are disclosed in quarterly earnings releases, 10-Q and 10-K filings, and regulatory filings. Bank holding companies report Tier 1 data on the FR Y-9C. Individual bank Tier 1 ratios are available in Call Reports (FFIEC 031/041) and through the FDIC's BankFind Suite.",
    "bankSpecificContext": "Tier 1 capital represents the going-concern capital layer in the Basel III framework. It encompasses all capital instruments that can absorb losses while the bank remains operational, as opposed to Tier 2 capital which is designed to absorb losses only in a liquidation or resolution scenario. For most US banks, the distinction between CET1 and Tier 1 is relatively modest because AT1 instruments represent a small share of total capital. However, for larger banks that have issued significant amounts of preferred stock, the Tier 1 ratio provides a more complete picture of core capital strength.",
    "metricConnections": "Tier 1 = CET1 + Additional Tier 1 capital. The Tier 1 ratio shares its denominator (RWA) with CET1 and Total Capital ratios, forming a three-tiered capital adequacy assessment. The Tier 1 Leverage Ratio uses the same Tier 1 numerator but replaces RWA with average total assets. Both the risk-based Tier 1 ratio and the Tier 1 Leverage Ratio must be met simultaneously; a bank cannot substitute one for the other. The relationship between Tier 1 capital levels and ROE operates through the leverage constraint: higher Tier 1 requirements reduce the equity multiplier and, all else equal, reduce ROE.",
    "commonPitfalls": "Treating the Tier 1 ratio and CET1 ratio as interchangeable is a common error. While they move together, the gap between them matters for understanding capital quality and cost. A bank that has boosted its Tier 1 ratio primarily through preferred stock issuance has a higher cost of capital than one that achieved the same ratio through retained earnings. Additionally, the \"well-capitalized\" threshold for Tier 1 (8%) is proportionally higher than for CET1 (6.5%), so a bank can be well-capitalized on CET1 but not on Tier 1 if it has very little AT1 capital.",
    "acrossBankTypes": "Large banks and G-SIBs typically have more AT1 instruments outstanding (preferred stock, trust preferred securities grandfathered under transition rules) and therefore show a wider spread between CET1 and Tier 1 ratios. Community banks generally have little or no AT1 capital, making their CET1 and Tier 1 ratios nearly identical. Banks using the Community Bank Leverage Ratio framework do not report the Tier 1 Capital Ratio at all.",
    "whatDrivesMetric": "The same factors that drive CET1 also drive Tier 1: retained earnings growth increases it, while buybacks, dividends, unrealized losses, and loan growth reduce it. Additionally, issuance or redemption of preferred stock or other AT1 instruments directly affects Tier 1 capital without impacting CET1. Changes in risk-weighted assets from loan mix shifts, regulatory methodology updates, or asset growth affect the denominator identically to the CET1 ratio.",
    "faqTeasers": [
      {
        "question": "What is the Tier 1 capital ratio?",
        "teaser": "Tier 1 capital measures a bank's core loss-absorbing capital, including both common equity and qualifying preferred stock, relative to the risk in its asset base.",
        "faqSlug": "what-is-tier-1-capital-ratio",
        "faqCluster": "capital-and-risk"
      },
      {
        "question": "What is the difference between CET1, Tier 1, and Total Capital ratios?",
        "teaser": "These three ratios form a hierarchy of capital quality, each adding progressively lower-quality capital instruments to the numerator while using the same risk-weighted asset denominator.",
        "faqSlug": "cet1-vs-tier1-vs-total-capital",
        "faqCluster": "capital-and-risk"
      }
    ],
    "relatedValuations": [
      "excess-capital-return-model",
      "peer-comparison"
    ]
  },
  {
    "slug": "total-capital-ratio",
    "name": "Total Capital Ratio",
    "category": "capital",
    "categoryLabel": "Capital Strength Ratio",
    "formula": "Total Capital Ratio = Total Regulatory Capital / Risk-Weighted Assets",
    "isPercentage": true,
    "shortDescription": "Measures all regulatory capital (Tier 1 plus Tier 2) as a percentage of risk-weighted assets, representing the broadest measure of a bank's capital adequacy",
    "description": "The Total Capital Ratio divides a bank's total regulatory capital by its risk-weighted assets. Total capital includes Tier 1 capital (CET1 + Additional Tier 1) plus Tier 2 capital, which consists of subordinated debt, qualifying loan loss reserves (up to 1.25% of RWA under the standardized approach), and certain other instruments. The ratio represents the full buffer available to absorb losses before depositors and senior creditors face losses.",
    "formulaExplanation": "The numerator combines Tier 1 capital with Tier 2 capital. Tier 2 instruments include subordinated debt with an original maturity of at least five years (subject to amortization in the final five years), qualifying portions of the allowance for loan and lease losses, and certain other qualifying instruments. The allowance for credit losses can count as Tier 2 capital only up to 1.25% of risk-weighted assets under the standardized approach. The denominator is the same risk-weighted assets figure used in CET1 and Tier 1 calculations.",
    "interpretation": "The Total Capital Ratio provides the most comprehensive view of regulatory capital adequacy. A bank must maintain a minimum Total Capital Ratio of 8% under Federal Reserve rules. Because Tier 2 capital absorbs losses only in resolution or liquidation, it is considered lower quality than Tier 1. Regulators and investors therefore focus primarily on CET1 and Tier 1 ratios for assessing ongoing capital strength, but the Total Capital Ratio remains a binding regulatory requirement.",
    "typicalRange": "The minimum requirement is 8%. \"Well-capitalized\" status requires 10% or above. Most US banks operate with Total Capital Ratios between 12% and 16%. The gap between the Tier 1 ratio and the Total Capital Ratio typically ranges from 1 to 3 percentage points, representing the Tier 2 capital layer.",
    "goodBad": {
      "good": "Total Capital Ratios above 12% indicate a substantial overall capital buffer. When the Total Capital Ratio significantly exceeds the Tier 1 ratio, it suggests the bank has issued subordinated debt or has meaningful loan loss reserves contributing to capital, providing additional loss absorption capacity.",
      "bad": "A Total Capital Ratio near 8% indicates thin overall capitalization. If the Tier 2 layer is very small (Total Capital only slightly above Tier 1), the bank has limited additional loss absorption beyond its core equity capital. This may be fine for a conservatively run bank but leaves less margin in a stress scenario."
    },
    "considerations": [
      "Subordinated debt included in Tier 2 capital is amortized for capital purposes over its final five years to maturity. As subordinated debt approaches maturity, it contributes progressively less to the Total Capital Ratio, requiring replacement issuance to maintain the ratio.",
      "The allowance for credit losses (ACL) can count toward Tier 2 capital, but only up to 1.25% of risk-weighted assets under the standardized approach. Banks with large ACLs relative to RWA do not get full capital credit for their provisioning.",
      "Total Capital is the broadest regulatory capital measure but does not capture all loss-absorbing resources. For example, pre-provision net revenue (PPNR) is the first line of defense against loan losses and is not reflected in the capital ratio at all.",
      "Under the Basel III endgame proposals (as discussed in regulatory publications), risk-weight calculations may change for certain asset categories, which would affect all three risk-based capital ratios simultaneously by changing the RWA denominator."
    ],
    "relatedMetrics": [
      "cet1-capital-ratio",
      "tier-1-capital-ratio",
      "equity-to-assets",
      "risk-weighted-assets-density",
      "loan-loss-reserve-ratio"
    ],
    "relatedMetricDescriptions": {
      "cet1-capital-ratio": "CET1 measures only the highest-quality common equity capital, forming the core component of Total Capital.",
      "tier-1-capital-ratio": "Tier 1 capital is the going-concern capital layer within Total Capital, consisting of CET1 plus Additional Tier 1 instruments.",
      "equity-to-assets": "Equity to Assets provides a simpler accounting view of capitalization without regulatory adjustments or risk weighting.",
      "risk-weighted-assets-density": "RWA Density indicates the risk intensity of the asset base, directly affecting the denominator of the Total Capital Ratio.",
      "loan-loss-reserve-ratio": "Qualifying portions of the loan loss reserve count as Tier 2 capital, creating a direct link between provisioning and the Total Capital Ratio."
    },
    "isEducationalOnly": true,
    "whereToFindData": "Total Capital Ratios are reported alongside CET1 and Tier 1 ratios in quarterly earnings releases, 10-Q and 10-K filings, FR Y-9C regulatory filings (for holding companies), and Call Reports (FFIEC 031/041). The FDIC's BankFind Suite and Quarterly Banking Profile provide aggregate and individual bank Total Capital data.",
    "bankSpecificContext": "Total Capital represents the full regulatory capital stack under Basel III. The layered structure (CET1 within Tier 1 within Total Capital) reflects the principle that different capital instruments have different loss-absorbing properties. CET1 absorbs losses first and on a going-concern basis. AT1 instruments absorb losses at the point of non-viability. Tier 2 capital absorbs losses primarily in resolution or liquidation. This hierarchy means that the quality of capital matters as much as its quantity; two banks with identical Total Capital Ratios but different CET1 compositions have meaningfully different capital profiles.",
    "metricConnections": "Total Capital = CET1 + Additional Tier 1 + Tier 2. All three risk-based capital ratios share the same RWA denominator, so any change in asset risk profiles moves all three ratios in the same direction. The Total Capital Ratio has a unique connection to the loan loss reserve ratio because qualifying portions of the allowance for credit losses count as Tier 2 capital. This means that increasing provisions (which reduce earnings and thereby slow CET1 growth) can partially offset by increasing the Tier 2 component of Total Capital.",
    "commonPitfalls": "Focusing on the Total Capital Ratio in isolation can overstate capital strength. Because Tier 2 instruments (subordinated debt, loan loss reserves) have limited loss-absorbing capacity compared to common equity, a bank with a strong Total Capital Ratio but a weak CET1 ratio is in a meaningfully different position than one with strong ratios across all three tiers. Additionally, subordinated debt in Tier 2 carries interest expense, so a bank that has boosted its Total Capital Ratio through subordinated debt issuance has increased its funding costs.",
    "acrossBankTypes": "Large banks tend to have a wider spread between Tier 1 and Total Capital ratios because they more actively issue subordinated debt as a capital management tool. Community banks typically have less Tier 2 capital from subordinated debt (though Small Business Lending Fund and Emergency Capital Investment Program instruments may contribute), relying more on qualifying loan loss reserves for their Tier 2 layer. Banks using the Community Bank Leverage Ratio framework do not calculate or report the Total Capital Ratio.",
    "whatDrivesMetric": "All factors driving CET1 and Tier 1 also drive Total Capital. Additionally, issuance or maturity of subordinated debt changes the Tier 2 component. Changes in the allowance for credit losses affect the qualifying ACL portion of Tier 2. Because subordinated debt amortizes for capital purposes in its final five years, Total Capital can decline even without any operational changes as existing subordinated debt approaches maturity.",
    "faqTeasers": [
      {
        "question": "What is the difference between CET1, Tier 1, and Total Capital ratios?",
        "teaser": "These three ratios form a hierarchy of capital quality, each adding progressively lower-quality capital instruments to the numerator while using the same risk-weighted asset denominator.",
        "faqSlug": "cet1-vs-tier1-vs-total-capital",
        "faqCluster": "capital-and-risk"
      },
      {
        "question": "What happens if a bank falls below minimum capital requirements?",
        "teaser": "Federal banking regulators enforce a prompt corrective action framework that imposes increasingly severe restrictions as capital ratios decline below defined thresholds.",
        "faqSlug": "what-happens-below-minimum-capital",
        "faqCluster": "capital-and-risk"
      }
    ],
    "relatedValuations": [
      "peer-comparison"
    ]
  },
  {
    "slug": "tier-1-leverage-ratio",
    "name": "Tier 1 Leverage Ratio",
    "category": "capital",
    "categoryLabel": "Capital Strength Ratio",
    "formula": "Tier 1 Leverage Ratio = Tier 1 Capital / Average Total Consolidated Assets",
    "isPercentage": true,
    "shortDescription": "Measures Tier 1 capital as a percentage of average total assets without risk weighting, providing a simple backstop to risk-based capital ratios",
    "description": "The Tier 1 Leverage Ratio divides a bank's Tier 1 capital by its average total consolidated assets. Unlike the CET1 and Tier 1 Capital Ratios, the leverage ratio does not apply risk weights to assets. It serves as a non-risk-sensitive backstop, ensuring that banks maintain a minimum amount of capital relative to their total asset base regardless of how low-risk those assets may be under risk-weighting rules.",
    "formulaExplanation": "The numerator is the same Tier 1 capital figure used in the Tier 1 Capital Ratio (CET1 + Additional Tier 1, with regulatory deductions). The denominator is average total consolidated assets, typically calculated as the quarterly average of daily or monthly balances. Average total assets includes all on-balance-sheet assets but generally excludes off-balance-sheet items (unlike the Supplementary Leverage Ratio). Goodwill and certain intangible assets deducted from Tier 1 capital are also deducted from average total assets to avoid double-counting.",
    "interpretation": "The leverage ratio catches a scenario that risk-based ratios might miss: a bank loading up on assets that carry low risk weights (such as government securities or low-LTV residential mortgages) to the point where total leverage becomes excessive even though risk-based ratios look healthy. The minimum requirement is 4% for most banks. \"Well-capitalized\" status requires 5% or above.",
    "typicalRange": "The regulatory minimum is 4%, and \"well-capitalized\" requires 5%. Most US banks maintain leverage ratios between 8% and 11%. Banks with very large securities portfolios may have lower leverage ratios than their risk-based ratios would suggest, because securities carry low risk weights but still count fully in average total assets.",
    "goodBad": {
      "good": "Leverage ratios above 8% indicate solid capital relative to the full asset base. Ratios above 10% suggest conservative capitalization. Consistently high leverage ratios alongside strong risk-based ratios confirm robust capital adequacy across both frameworks.",
      "bad": "Leverage ratios below 5% indicate thin capital buffers relative to total assets and would not qualify as \"well-capitalized\" under the prompt corrective action framework. Ratios near the 4% minimum are concerning and may trigger regulatory attention."
    },
    "considerations": [
      "The leverage ratio uses average total assets rather than period-end assets, which smooths out temporary fluctuations from activities such as repo borrowing, securities settlement, and seasonal deposit flows.",
      "Because the leverage ratio does not risk-weight assets, it penalizes banks that hold large portfolios of low-risk assets (such as US Treasuries or agency MBS) more than risk-based ratios do. This is by design; it prevents banks from arbitraging risk-weight rules.",
      "The Tier 1 Leverage Ratio differs from the Supplementary Leverage Ratio (SLR) in its denominator. The SLR uses total leverage exposure (which includes off-balance-sheet items), while the standard leverage ratio uses only on-balance-sheet average total assets.",
      "For banks using the Community Bank Leverage Ratio (CBLR) framework, the relevant threshold is 9% rather than the standard 4% minimum. CBLR banks use a simplified leverage ratio as their sole capital requirement."
    ],
    "relatedMetrics": [
      "tier-1-capital-ratio",
      "cet1-capital-ratio",
      "supplementary-leverage-ratio",
      "equity-to-assets",
      "tangible-common-equity-ratio"
    ],
    "relatedMetricDescriptions": {
      "tier-1-capital-ratio": "The Tier 1 Capital Ratio uses the same numerator but divides by risk-weighted assets rather than total assets, providing a risk-sensitive complement to the leverage ratio.",
      "cet1-capital-ratio": "CET1 measures the highest-quality capital component against risk-weighted assets.",
      "supplementary-leverage-ratio": "SLR expands the leverage ratio denominator to include off-balance-sheet exposures, creating a more comprehensive leverage measure for large banks.",
      "equity-to-assets": "Equity to Assets provides a similar non-risk-weighted view of capital adequacy but uses accounting equity rather than regulatory Tier 1 capital.",
      "tangible-common-equity-ratio": "TCE Ratio uses tangible common equity (excluding intangibles and preferred stock) divided by tangible assets, offering an analyst-derived alternative to the regulatory leverage ratio."
    },
    "isEducationalOnly": true,
    "whereToFindData": "Tier 1 Leverage Ratios are reported in quarterly earnings releases, 10-Q and 10-K filings, FR Y-9C regulatory filings (for holding companies), and Call Reports (FFIEC 031/041). The FDIC's BankFind Suite provides leverage ratio data for individual institutions. The FDIC Quarterly Banking Profile reports aggregate leverage ratios for the banking industry.",
    "bankSpecificContext": "The leverage ratio is a uniquely important backstop in bank regulation. During the financial crisis of 2007-2009, some banks maintained strong risk-based capital ratios while having dangerously high leverage because their assets were concentrated in categories that carried low risk weights. The leverage ratio was strengthened under Basel III specifically to address this gap. It ensures a minimum level of capital adequacy that cannot be circumvented through asset allocation choices, however low-risk they may appear under risk-weighting models.",
    "metricConnections": "The leverage ratio shares its numerator with the Tier 1 Capital Ratio, so changes in Tier 1 capital affect both ratios identically. However, the two ratios can move in opposite directions when the asset mix changes: shifting from high-risk-weight assets (commercial loans) to low-risk-weight assets (Treasuries) reduces RWA and improves the risk-based ratio while increasing total assets (or keeping them constant) and potentially worsening the leverage ratio. This tension is by design and forces banks to maintain capital from both perspectives. The leverage ratio is also mechanically related to ROE: Tier 1 Leverage Ratio = (Net Income / Average Assets) x (Average Assets / Tier 1 Capital), connecting profitability and leverage.",
    "commonPitfalls": "Comparing the Tier 1 Leverage Ratio to the Equity to Assets ratio and expecting similar values is a common source of confusion. Regulatory Tier 1 capital differs from accounting equity due to deductions for goodwill, intangibles, and other items. Additionally, mixing up the standard leverage ratio (average total assets denominator) with the Supplementary Leverage Ratio (total leverage exposure denominator) is a frequent error. The SLR applies only to large banks and produces a lower ratio because its denominator is larger.",
    "acrossBankTypes": "Community banks (particularly those using CBLR) tend to have higher leverage ratios, often 9% to 12%, reflecting both the higher CBLR threshold and typically simpler balance sheets. Large banks generally run leverage ratios of 6% to 9%, with the largest banks constrained by the enhanced SLR requirement. Banks with large securities portfolios may show a notable gap between their risk-based ratios and leverage ratio, with the leverage ratio appearing relatively weaker.",
    "whatDrivesMetric": "Changes in Tier 1 capital (retained earnings, preferred stock issuance/redemption, AOCI movements) directly affect the numerator. Asset growth reduces the ratio, while asset shrinkage improves it. Unlike risk-based ratios, the mix of assets does not matter; only the total size of the balance sheet affects the denominator. This means a bank cannot improve its leverage ratio by shifting into lower-risk assets; it must either increase Tier 1 capital or reduce total assets.",
    "faqTeasers": [
      {
        "question": "What is the difference between CET1, Tier 1, and Total Capital ratios?",
        "teaser": "These three ratios form a hierarchy of capital quality, each adding progressively lower-quality capital instruments to the numerator while using the same risk-weighted asset denominator.",
        "faqSlug": "cet1-vs-tier1-vs-total-capital",
        "faqCluster": "capital-and-risk"
      },
      {
        "question": "What is a good equity-to-assets ratio for banks?",
        "teaser": "Equity to Assets provides a simple measure of capital adequacy. Most US banks maintain ratios between 8% and 12%, though the appropriate level depends on the bank's risk profile and business model.",
        "faqSlug": "what-is-a-good-equity-to-assets-ratio",
        "faqCluster": "capital-and-risk"
      }
    ],
    "relatedValuations": [
      "peer-comparison"
    ]
  },
  {
    "slug": "supplementary-leverage-ratio",
    "name": "Supplementary Leverage Ratio (SLR)",
    "category": "capital",
    "categoryLabel": "Capital Strength Ratio",
    "formula": "SLR = Tier 1 Capital / Total Leverage Exposure",
    "isPercentage": true,
    "shortDescription": "Measures Tier 1 capital as a percentage of total leverage exposure including both on- and off-balance-sheet items, applicable to large banking organizations",
    "description": "The Supplementary Leverage Ratio divides a bank's Tier 1 capital by its total leverage exposure, which includes both on-balance-sheet assets and certain off-balance-sheet exposures such as derivative notionals, repo-style transactions, and unfunded lending commitments. The SLR applies only to banking organizations with $250 billion or more in total consolidated assets or $10 billion or more in on-balance-sheet foreign exposures, as well as their insured depository institution subsidiaries.",
    "formulaExplanation": "The numerator is Tier 1 capital, identical to the Tier 1 Capital Ratio calculation. The denominator, total leverage exposure, starts with average total consolidated assets and adds off-balance-sheet items including: the notional amount of credit derivatives sold (less purchased protection), the potential future exposure of derivative contracts, the credit equivalent amount of repo-style transactions, and the unconditionally cancellable and non-cancellable portions of unfunded commitments (at varying conversion factors). This expanded denominator is what distinguishes the SLR from the standard Tier 1 Leverage Ratio.",
    "interpretation": "The SLR captures leverage from activities that do not appear on the balance sheet, providing a more comprehensive view of a bank's total leverage. The minimum SLR requirement is 3% for applicable banking organizations. G-SIBs face an enhanced SLR (eSLR) requirement with a 2% buffer at the holding company level (total 5%) and a 6% requirement at the insured depository institution level.",
    "typicalRange": "The minimum is 3% for applicable organizations, with G-SIBs subject to a 5% requirement at the holding company level. In practice, large US banks typically maintain SLR between 5% and 7%. The SLR is always lower than the standard Tier 1 Leverage Ratio for the same bank because the denominator is larger.",
    "goodBad": {
      "good": "SLR above 5% for large banks and above 6% for G-SIB insured depository subsidiaries indicates comfortable compliance with enhanced requirements. SLR well above minimums provides flexibility for balance sheet expansion, market-making activities, and client-facing derivative businesses.",
      "bad": "SLR near the 3% minimum for applicable banks, or near 5% for G-SIBs, indicates tight capital constraints that may limit the bank's ability to expand market-making, repo lending, or derivative activities. Binding SLR constraints can force banks to shrink activities that are profitable but leverage-intensive."
    },
    "considerations": [
      "The SLR can constrain bank activities that are low-risk but balance-sheet-intensive, such as clearing Treasury securities, providing repo financing, or holding client deposits at the Federal Reserve. During periods of market stress, binding SLR constraints have been cited as a factor limiting bank intermediation capacity.",
      "The Federal Reserve temporarily modified SLR calculations during 2020 to exclude US Treasury securities and deposits at Federal Reserve Banks from the denominator, but this modification expired in 2021. The temporary change highlighted how the SLR can interact with monetary policy implementation.",
      "Unlike risk-based capital ratios, the SLR does not differentiate between holding US Treasuries and holding leveraged loans. This flat treatment is the intentional design as a backstop, but it means the SLR can be particularly binding for banks with large, low-risk balance sheets.",
      "Only the largest banking organizations are subject to the SLR. Regional and community banks use the standard Tier 1 Leverage Ratio (or CBLR framework) and do not calculate total leverage exposure."
    ],
    "relatedMetrics": [
      "tier-1-leverage-ratio",
      "tier-1-capital-ratio",
      "cet1-capital-ratio",
      "risk-weighted-assets-density",
      "equity-to-assets"
    ],
    "relatedMetricDescriptions": {
      "tier-1-leverage-ratio": "The standard leverage ratio uses only on-balance-sheet average total assets in the denominator, while the SLR adds off-balance-sheet exposures for a more comprehensive measure.",
      "tier-1-capital-ratio": "The Tier 1 Capital Ratio shares the same numerator but uses risk-weighted assets, providing a risk-sensitive complement to the non-risk-weighted SLR.",
      "cet1-capital-ratio": "CET1 measures the highest-quality capital component and is typically the binding capital constraint for most banks, working alongside the SLR as a separate binding constraint.",
      "risk-weighted-assets-density": "RWA Density indicates the risk profile of the asset base; low RWA Density banks may find the SLR more binding than risk-based ratios because their assets are less penalized under risk weighting.",
      "equity-to-assets": "Equity to Assets provides a simple leverage measure for all banks, while the SLR applies regulatory adjustments and includes off-balance-sheet exposures for the largest banks."
    },
    "isEducationalOnly": true,
    "whereToFindData": "SLR data for applicable banking organizations is disclosed in quarterly earnings releases and 10-Q/10-K filings, typically in the capital adequacy section alongside other regulatory capital ratios. FR Y-9C filings contain detailed SLR calculations for holding companies. The Federal Reserve publishes SLR data for G-SIBs and large bank holding companies.",
    "bankSpecificContext": "The SLR was introduced as part of the post-crisis Basel III reforms to address a specific vulnerability exposed during 2007-2009: banks had accumulated significant off-balance-sheet exposures (through derivatives, conduits, and commitments) that were not captured by on-balance-sheet leverage measures. The SLR ensures that Tier 1 capital is adequate relative to the full scope of a bank's leverage, including commitments and derivative exposures that could generate losses or require funding. For the largest banks, the SLR often interacts with risk-based requirements as a dual constraint, with the binding requirement depending on the bank's business mix.",
    "metricConnections": "The SLR shares its Tier 1 capital numerator with the Tier 1 Capital Ratio and standard Tier 1 Leverage Ratio. The key distinction is the denominator: risk-weighted assets (Tier 1 Capital Ratio), average total assets (standard leverage ratio), or total leverage exposure (SLR). For banks with significant derivative and off-balance-sheet activities, the SLR denominator can be substantially larger than average total assets, producing a lower ratio. The relationship between SLR and the standard leverage ratio reveals the magnitude of a bank's off-balance-sheet footprint.",
    "commonPitfalls": "Applying the SLR to banks that are not subject to it is a common error. Regional and community banks do not calculate or disclose the SLR. Additionally, comparing SLR across banks without accounting for differences in off-balance-sheet activity intensity is misleading. A bank with a large derivatives business will have a much larger total leverage exposure relative to total assets than a traditional lending-focused bank, making its SLR appear lower even if its on-balance-sheet capitalization is strong.",
    "acrossBankTypes": "The SLR is relevant only for the largest banking organizations (generally $250 billion or more in total consolidated assets). G-SIBs face the most stringent SLR requirements (5% at the holding company, 6% at the insured depository). Large regional banks above the $250 billion threshold are subject to the 3% minimum but not the enhanced buffer. Community and smaller regional banks do not calculate the SLR.",
    "whatDrivesMetric": "Changes in Tier 1 capital affect the SLR numerator identically to other Tier 1-based ratios. The denominator is affected by on-balance-sheet asset growth (same as the standard leverage ratio) plus changes in off-balance-sheet exposures. Expanding derivatives books, increasing unfunded commitments, or growing repo-style transaction volumes all increase total leverage exposure and reduce the SLR. Banks can improve SLR by reducing off-balance-sheet exposures, raising Tier 1 capital, or shrinking the balance sheet.",
    "faqTeasers": [
      {
        "question": "What is the difference between CET1, Tier 1, and Total Capital ratios?",
        "teaser": "These three ratios form a hierarchy of capital quality, each adding progressively lower-quality capital instruments to the numerator while using the same risk-weighted asset denominator.",
        "faqSlug": "cet1-vs-tier1-vs-total-capital",
        "faqCluster": "capital-and-risk"
      },
      {
        "question": "What happens if a bank falls below minimum capital requirements?",
        "teaser": "Federal banking regulators enforce a prompt corrective action framework that imposes increasingly severe restrictions as capital ratios decline below defined thresholds.",
        "faqSlug": "what-happens-below-minimum-capital",
        "faqCluster": "capital-and-risk"
      }
    ],
    "relatedValuations": [
      "peer-comparison"
    ]
  },
  {
    "slug": "tangible-common-equity-ratio",
    "name": "Tangible Common Equity (TCE) Ratio",
    "category": "capital",
    "categoryLabel": "Capital Strength Ratio",
    "formula": "TCE Ratio = Tangible Common Equity / Tangible Assets",
    "isPercentage": true,
    "shortDescription": "Measures tangible common equity as a percentage of tangible assets, providing a conservative analyst-derived capital measure that excludes intangibles and preferred stock",
    "description": "The Tangible Common Equity Ratio divides tangible common equity (total common equity minus goodwill and other intangible assets) by tangible assets (total assets minus goodwill and other intangible assets). Unlike regulatory capital ratios, the TCE ratio is not a formal regulatory requirement but is widely used by equity analysts and bank investors as a more conservative measure of capital strength. It focuses exclusively on common equity and strips out intangible assets that may have limited value in a stress scenario.",
    "formulaExplanation": "Tangible common equity starts with total shareholders' equity, subtracts preferred stock (including minority interests in some calculations), and then subtracts goodwill and other intangible assets (such as core deposit intangibles, customer relationship intangibles, and trade names). Mortgage servicing rights may or may not be subtracted depending on the analyst's methodology. Tangible assets equal total assets minus the same goodwill and intangible assets deducted from equity. Both adjustments ensure consistency between numerator and denominator.",
    "interpretation": "The TCE ratio reveals how much tangible common equity backs each dollar of tangible assets. It is particularly relevant for banks that have grown through acquisitions, as acquisitions generate goodwill that inflates book value and the equity-to-assets ratio but may not represent tangible value in a stress scenario. A bank with a strong TCE ratio has more hard capital supporting its assets.",
    "typicalRange": "There is no regulatory minimum for the TCE ratio since it is an analyst-derived measure. Most US banks maintain TCE ratios between 6% and 10%. Banks with significant goodwill from acquisitions will show a meaningful gap between their equity-to-assets ratio and their TCE ratio. Banks with minimal or no goodwill will have TCE ratios close to their equity-to-assets ratios.",
    "goodBad": {
      "good": "TCE ratios above 7% generally indicate adequate tangible capital. Banks with TCE ratios above 9% have strong tangible capital cushions. A TCE ratio close to the equity-to-assets ratio indicates minimal goodwill and intangibles, meaning book value is largely composed of tangible assets.",
      "bad": "TCE ratios below 5% indicate thin tangible capital, particularly concerning for banks with large intangible asset balances. A large gap between the equity-to-assets ratio and the TCE ratio signals significant goodwill from acquisitions, which may impair the bank's ability to absorb losses with tangible capital."
    },
    "considerations": [
      "The TCE ratio is not standardized across analysts. Different methodologies for treating mortgage servicing rights, deferred tax assets, and AOCI can produce meaningfully different TCE figures for the same bank. When comparing TCE ratios across sources, verify the calculation methodology.",
      "Goodwill is tested for impairment annually under accounting rules. If a bank writes down goodwill (recognizing that an acquisition overpaid), the TCE ratio actually improves because goodwill is removed from both sides of the calculation even though total equity declines.",
      "The TCE ratio can differ significantly from the CET1 ratio even though both exclude goodwill and intangibles. CET1 uses risk-weighted assets in the denominator, while TCE uses tangible total assets. A bank with a conservative, low-risk-weight asset portfolio may have a much higher CET1 ratio than TCE ratio.",
      "For banks that have never made acquisitions and carry no goodwill, the TCE ratio equals the equity-to-assets ratio (adjusted only for any non-goodwill intangibles and preferred stock). The TCE ratio becomes most valuable when comparing across banks with different acquisition histories."
    ],
    "relatedMetrics": [
      "equity-to-assets",
      "tangible-book-value-per-share",
      "cet1-capital-ratio",
      "price-to-tangible-book-value",
      "roe",
      "return-on-tangible-common-equity"
    ],
    "relatedMetricDescriptions": {
      "equity-to-assets": "Equity to Assets uses total equity and total assets without stripping intangibles, making TCE the more conservative comparison.",
      "tangible-book-value-per-share": "TBVPS expresses tangible common equity on a per-share basis, serving as the denominator in the Price to Tangible Book Value ratio.",
      "cet1-capital-ratio": "CET1 applies similar intangible deductions as TCE but uses risk-weighted assets in the denominator, making it a regulatory rather than analyst-derived measure.",
      "price-to-tangible-book-value": "P/TBV uses tangible book value per share as its denominator, directly connecting the TCE concept to market valuation.",
      "roe": "ROE measures return on total common equity; banks with significant goodwill may appear to have strong ROE while TCE reveals the tangible capital base is thinner.",
      "return-on-tangible-common-equity": "ROTCE divides net income by tangible common equity, providing a profitability measure that pairs with the TCE ratio to assess returns on tangible capital."
    },
    "isEducationalOnly": true,
    "whereToFindData": "TCE is not a standard regulatory reporting line item, but many banks disclose it in their quarterly earnings releases as a non-GAAP financial measure with a reconciliation to GAAP equity. Investors can also calculate TCE from 10-K and 10-Q filings using total equity, preferred stock, goodwill, and intangible asset line items on the balance sheet. The FDIC's UBPR (Uniform Bank Performance Report) provides tangible equity capital ratios for individual banks.",
    "bankSpecificContext": "The TCE ratio gained prominence during the 2007-2009 financial crisis when some banks with apparently adequate equity-to-assets ratios were revealed to have thin tangible capital because a large portion of their equity consisted of goodwill from prior acquisitions. Goodwill cannot absorb losses; it is simply an accounting entry reflecting past acquisition premiums. By stripping it out, the TCE ratio provides a clearer picture of the hard capital available to absorb losses. This makes the TCE ratio especially important when evaluating serial acquirers or banks in M&A-active markets.",
    "metricConnections": "TCE = Total Common Equity - Goodwill - Other Intangibles. TCE / Shares Outstanding = TBVPS. Market Price / TBVPS = P/TBV. Net Income / TCE = ROTCE. The TCE ratio therefore sits at the center of a network of tangible capital and valuation metrics. Banks with high TCE ratios but low P/TBV may represent value opportunities if the tangible assets are sound. Banks with low TCE ratios and high ROTCE are generating strong returns but with less tangible capital cushion, which increases risk in a downturn.",
    "commonPitfalls": "Using TCE as a direct substitute for regulatory capital ratios can be misleading because TCE does not account for asset risk. A bank with a 7% TCE ratio concentrated in US Treasuries is in a fundamentally different risk position than one with 7% concentrated in subprime auto loans. Additionally, different analysts define TCE differently (particularly regarding the treatment of mortgage servicing rights and AOCI), so comparisons across research reports may not be apples-to-apples without verifying methodology.",
    "acrossBankTypes": "Serial-acquirer banks (common among mid-size regionals) tend to carry significant goodwill and therefore show meaningful gaps between equity-to-assets and TCE ratios. Community banks that have grown organically typically carry minimal goodwill, making their TCE and equity-to-assets ratios nearly identical. Money center banks generally carry goodwill from past acquisitions but it represents a smaller percentage of their total equity given their scale.",
    "whatDrivesMetric": "TCE increases through retained earnings (net income minus dividends) and decreases through share buybacks, dividends, and AOCI losses. Acquisitions directly affect TCE in two ways: goodwill created reduces TCE (numerator and denominator adjusted), while the acquired bank's tangible assets and equity add to the consolidated figures. Goodwill impairment charges reduce total equity but improve the TCE ratio because the impaired goodwill is removed. Intangible asset amortization gradually improves TCE over time as intangibles are written down.",
    "faqTeasers": [
      {
        "question": "What is tangible common equity (TCE) ratio and why do bank analysts use it?",
        "teaser": "The TCE ratio strips out goodwill and intangible assets to reveal the tangible capital backing a bank's tangible assets, providing a more conservative capital measure than equity-to-assets.",
        "faqSlug": "what-is-tce-ratio",
        "faqCluster": "capital-and-risk"
      },
      {
        "question": "What is tangible book value and why is it different from book value?",
        "teaser": "Tangible book value removes goodwill and intangible assets from total equity, showing the hard capital available to absorb losses rather than the accounting book value inflated by past acquisition premiums.",
        "faqSlug": "tangible-book-value-vs-book-value",
        "faqCluster": "capital-and-risk"
      },
      {
        "question": "How do I calculate the TCE Ratio?",
        "teaser": "TCE Ratio equals tangible common equity divided by tangible assets. Both figures are derived by subtracting goodwill and intangible assets from total common equity and total assets respectively.",
        "faqSlug": "how-to-calculate-tce-ratio",
        "faqCluster": "capital-and-risk"
      }
    ],
    "relatedValuations": [
      "price-to-tangible-book-valuation",
      "peer-comparison",
      "excess-capital-return-model"
    ]
  },
  {
    "slug": "risk-weighted-assets-density",
    "name": "Risk-Weighted Assets Density",
    "category": "capital",
    "categoryLabel": "Capital Strength Ratio",
    "formula": "RWA Density = Risk-Weighted Assets / Total Assets",
    "isPercentage": true,
    "shortDescription": "Measures risk-weighted assets as a percentage of total assets, indicating how conservative or aggressive a bank's asset risk profile is under regulatory risk-weighting rules",
    "description": "Risk-Weighted Assets Density divides a bank's total risk-weighted assets by its total assets. The result indicates the average risk weight assigned to the bank's asset base under regulatory capital rules. A higher density means the bank holds a greater proportion of assets in higher-risk-weight categories (such as commercial loans, construction loans, or equity investments). A lower density indicates a portfolio tilted toward lower-risk-weight assets (such as government securities, agency MBS, or well-collateralized residential mortgages).",
    "formulaExplanation": "The numerator is total risk-weighted assets as reported by the bank for regulatory capital purposes. This figure starts with on-balance-sheet assets, each multiplied by its prescribed risk weight, and adds credit-equivalent amounts of off-balance-sheet exposures. The denominator is total assets from the balance sheet. Because risk weights range from 0% (cash, US Treasuries) to 150% or more (certain past-due exposures, equity investments), and off-balance-sheet items are included in RWA but not in total assets, the RWA Density can theoretically exceed 100%.",
    "interpretation": "RWA Density provides context for interpreting risk-based capital ratios. A bank with a CET1 ratio of 10% and RWA Density of 60% has a much more conservative asset portfolio than one with the same CET1 ratio but RWA Density of 90%. The first bank could be lending primarily in secured residential mortgages and holding government bonds, while the second is concentrated in higher-risk commercial lending. RWA Density effectively reveals the risk \"intensity\" of the balance sheet.",
    "typicalRange": "US banks typically have RWA Density between 55% and 85%. Banks with large government securities portfolios and residential mortgage books tend to have lower density (55% to 65%). Banks concentrated in commercial and industrial lending, commercial real estate, or consumer lending tend to have higher density (70% to 85%). Banks with significant off-balance-sheet derivative exposures may see their RWA density elevated above what the on-balance-sheet asset mix alone would suggest.",
    "goodBad": {
      "good": "RWA Density below 65% indicates a conservative asset mix with significant holdings of low-risk-weight assets. This is neither good nor bad in isolation; it means risk-based capital ratios will appear stronger relative to leverage ratios. For a bank targeting high risk-based capital ratios with a limited equity base, lower RWA Density provides more capital efficiency.",
      "bad": "RWA Density above 85% indicates a high-risk asset mix, meaning the bank needs proportionally more capital to maintain the same risk-based capital ratios. Very high RWA Density may also indicate concentration in asset categories that carry higher credit risk, which warrants additional scrutiny of asset quality metrics."
    },
    "considerations": [
      "RWA Density is a useful complement to risk-based capital ratios because it separates the capital question (how much capital does the bank have?) from the risk question (how risky is the asset base?). Two banks with identical CET1 ratios can have very different risk profiles depending on their RWA Density.",
      "Changes in regulatory risk-weight methodologies can shift RWA Density for the entire industry without any change in actual lending or investment behavior. Basel III endgame proposals, for example, would alter risk weights for several asset categories.",
      "Off-balance-sheet exposures (derivatives, unfunded commitments) are included in RWA but not in total assets, which can push RWA Density above levels that the on-balance-sheet asset mix alone would suggest. This is more relevant for large banks with significant derivative activities.",
      "RWA Density trends over time reveal strategic shifts in a bank's business model. Increasing density may indicate a shift toward higher-yielding (but higher-risk) lending, while declining density may indicate a build-up of securities holdings or a de-risking of the loan portfolio."
    ],
    "relatedMetrics": [
      "cet1-capital-ratio",
      "tier-1-capital-ratio",
      "total-capital-ratio",
      "tier-1-leverage-ratio",
      "equity-to-assets",
      "loans-to-assets"
    ],
    "relatedMetricDescriptions": {
      "cet1-capital-ratio": "RWA is the denominator of the CET1 ratio; higher RWA Density for a given total asset base means a lower CET1 ratio, all else equal.",
      "tier-1-capital-ratio": "The Tier 1 Capital Ratio also uses RWA as its denominator, making RWA Density directly relevant to Tier 1 capital adequacy assessment.",
      "total-capital-ratio": "Total Capital Ratio shares the same RWA denominator, and RWA Density helps explain why two banks with similar equity can have different Total Capital Ratios.",
      "tier-1-leverage-ratio": "The leverage ratio uses total assets (not RWA) in its denominator, creating a complementary measure that does not depend on risk-weight assignments.",
      "equity-to-assets": "Equity to Assets and RWA Density together explain the gap between leverage-based and risk-based capital ratios for a given bank.",
      "loans-to-assets": "Loans to Assets indicates the share of total assets in loans, and since most loans carry 100% risk weights, a higher L/A ratio generally correlates with higher RWA Density."
    },
    "isEducationalOnly": true,
    "whereToFindData": "Total risk-weighted assets are reported in a bank's regulatory capital disclosures within 10-Q and 10-K filings, FR Y-9C filings (for holding companies), and Call Reports (FFIEC 031/041). Total assets are reported on the balance sheet. Dividing one by the other yields RWA Density. Some banks disclose RWA breakdowns by asset category in their Basel III Pillar 3 disclosures, which provide additional detail on the composition of risk-weighted assets.",
    "bankSpecificContext": "RWA Density is particularly useful for bank analysis because different bank business models produce very different risk-weight profiles. A bank focused on prime residential mortgage lending and holding a large portfolio of agency MBS will have much lower RWA Density than a bank focused on leveraged lending, CRE construction, or unsecured consumer credit. Understanding this difference is essential for comparing capital adequacy across banks with different strategies. RWA Density also reveals how much a bank benefits (or not) from the risk-weighting system; banks with low RWA Density get more \"capital credit\" per dollar of equity than those with high density.",
    "metricConnections": "RWA Density connects risk-based capital ratios to the leverage ratio. For a given amount of Tier 1 capital, the Tier 1 Capital Ratio = Tier 1 Leverage Ratio / RWA Density. This means a bank with 50% RWA Density and a 5% leverage ratio has a 10% Tier 1 Capital Ratio, while a bank with 80% RWA Density and the same leverage ratio has only a 6.25% Tier 1 Capital Ratio. RWA Density also interacts with NIM: higher-risk-weight loans typically carry higher yields, so banks with higher RWA Density often (but not always) have higher NIMs.",
    "commonPitfalls": "Interpreting low RWA Density as automatically indicating a low-risk bank is an oversimplification. Risk weights are based on regulatory formulas that may not perfectly capture economic risk. Interest rate risk on a large securities portfolio, for example, is not reflected in credit risk weights. A bank with low RWA Density due to large government bond holdings may face significant interest rate risk even though its risk-weighted capital ratios look strong. Additionally, comparing RWA Density across jurisdictions can be misleading because risk-weight methodologies differ internationally.",
    "acrossBankTypes": "Money center banks and G-SIBs tend to have moderate RWA Density (60% to 75%) because their diversified asset mix includes both low-risk-weight securities and higher-risk-weight commercial loans. Community banks focused on commercial real estate lending typically have higher RWA Density (70% to 85%) because CRE loans carry elevated risk weights. Banks with large residential mortgage portfolios tend to have lower density, particularly if they hold conforming agency-eligible loans.",
    "whatDrivesMetric": "RWA Density is driven entirely by the composition of the asset base and the applicable risk-weight assignments. Growing the loan portfolio (particularly commercial and CRE loans) increases RWA Density. Building the securities portfolio with government bonds or agency MBS reduces it. Changes in regulatory risk-weight methodology can move RWA Density without any change in actual asset mix. Off-balance-sheet activity growth (derivatives, commitments) can also increase RWA relative to total assets.",
    "faqTeasers": [
      {
        "question": "What are risk-weighted assets (RWA) and how do they work?",
        "teaser": "Risk-weighted assets adjust a bank's total assets for credit risk by assigning different weights to different asset categories, forming the denominator for all risk-based capital ratios.",
        "faqSlug": "what-are-risk-weighted-assets",
        "faqCluster": "capital-and-risk"
      },
      {
        "question": "What is the CET1 capital ratio and why does it matter?",
        "teaser": "CET1 measures a bank's highest-quality capital relative to the risk in its asset base, serving as the primary metric regulators use to assess capital adequacy under Basel III.",
        "faqSlug": "what-is-cet1-ratio",
        "faqCluster": "capital-and-risk"
      }
    ],
    "relatedValuations": [
      "peer-comparison"
    ]
  },
  {
    "slug": "non-performing-loans-ratio",
    "name": "Non-Performing Loans (NPL) Ratio",
    "category": "asset-quality",
    "categoryLabel": "Asset Quality Ratio",
    "formula": "NPL Ratio = Non-Performing Loans / Total Loans",
    "isPercentage": true,
    "shortDescription": "Measures the percentage of a bank's loan portfolio that is non-performing, serving as the primary indicator of credit quality deterioration",
    "description": "The Non-Performing Loans Ratio divides total non-performing loans by total gross loans. Non-performing loans include loans that are 90 or more days past due and still accruing interest, plus loans placed on non-accrual status (where the bank has stopped recognizing interest income because collection of the full principal or interest is doubtful). The ratio is the most direct measure of credit quality problems in a bank's loan portfolio.",
    "formulaExplanation": "The numerator includes two categories: loans past due 90 days or more and still accruing, and loans on non-accrual status. Non-accrual loans are those where the bank has determined that full repayment of principal and interest is not expected and has stopped recognizing interest income on the loan. The denominator is total gross loans (before the deduction of the allowance for credit losses). Using gross loans rather than net loans ensures the ratio reflects the full exposure base.",
    "interpretation": "A rising NPL ratio signals deteriorating credit quality, meaning borrowers are increasingly unable to make scheduled payments. This has direct implications for future charge-offs, provision expense, and earnings. A declining NPL ratio indicates improving credit conditions, either through borrower recovery, successful workouts, or charge-offs removing non-performing loans from the books.",
    "typicalRange": "During normal economic conditions, US banks typically maintain NPL ratios between 0.5% and 2.0% (FDIC aggregate data). During credit downturns, NPL ratios can spike significantly; the US banking industry average peaked above 5% during the 2009-2010 period according to FDIC Quarterly Banking Profile data. Individual bank NPL ratios vary widely based on loan mix, underwriting standards, and geographic concentration.",
    "goodBad": {
      "good": "NPL ratios below 1.0% indicate strong credit quality with minimal loan performance problems. Ratios below 0.5% suggest very clean loan portfolios, though extremely low levels sustained over long periods could also indicate overly conservative lending that limits growth and profitability.",
      "bad": "NPL ratios above 3.0% indicate significant credit quality problems that will likely result in elevated charge-offs and provision expense. Ratios above 5.0% signal severe credit stress that can threaten earnings, capital, and in extreme cases, the viability of the institution."
    },
    "considerations": [
      "The NPL ratio is a lagging indicator. Loans must be significantly delinquent (90+ days) or formally placed on non-accrual before they appear as non-performing. By the time the NPL ratio rises meaningfully, credit problems have typically been building for several quarters. Early warning metrics such as 30-59 day and 60-89 day delinquency rates can provide earlier signals.",
      "Banks can manage the NPL ratio through charge-offs, loan sales, and restructuring. Aggressively charging off problem loans reduces the NPL ratio but also reduces the loan portfolio and may result in lower future recoveries. Comparing NPL ratios without also examining charge-off trends can be misleading.",
      "Non-performing loan definitions can vary slightly across banks. Some banks are more aggressive than others in placing loans on non-accrual status, particularly for collateral-dependent loans. Regulatory examinations can result in reclassifications that cause sudden NPL ratio increases.",
      "The mix of loan types significantly affects the expected NPL ratio. Consumer loan portfolios (credit cards, auto loans) tend to have higher baseline delinquency rates than commercial loan portfolios, though commercial loan losses per occurrence are typically larger."
    ],
    "relatedMetrics": [
      "non-performing-assets-ratio",
      "net-charge-off-ratio",
      "loan-loss-reserve-ratio",
      "reserve-coverage-ratio",
      "texas-ratio",
      "provision-to-average-loans"
    ],
    "relatedMetricDescriptions": {
      "non-performing-assets-ratio": "NPA Ratio broadens the view beyond loans to include other non-performing assets such as other real estate owned (OREO), providing a more comprehensive picture of problem assets.",
      "net-charge-off-ratio": "Net Charge-Off Ratio measures actual loan losses realized, complementing the NPL ratio which measures loans that may eventually result in losses but have not yet been charged off.",
      "loan-loss-reserve-ratio": "The Loan Loss Reserve Ratio shows how much the bank has set aside to cover potential loan losses, providing context for how well the bank is provisioned against its problem loans.",
      "reserve-coverage-ratio": "Reserve Coverage divides the allowance for credit losses by non-performing loans, directly measuring the degree to which reserves cover known problem loans.",
      "texas-ratio": "The Texas Ratio combines non-performing assets with the bank's capital and reserves to assess whether the bank has sufficient resources to absorb potential losses.",
      "provision-to-average-loans": "Provision to Average Loans measures the current period's provisioning intensity, indicating how aggressively the bank is building reserves in response to credit conditions."
    },
    "isEducationalOnly": true,
    "whereToFindData": "Non-performing loan data is available in a bank's 10-Q and 10-K filings, typically in the credit quality section of Management's Discussion and Analysis or in the notes to the financial statements. Call Reports (FFIEC 031/041) contain detailed asset quality schedules. The FDIC's BankFind Suite and Quarterly Banking Profile provide aggregate and individual bank NPL data. The Federal Reserve's FR Y-9C filing includes non-performing loan data for holding companies.",
    "bankSpecificContext": "Credit risk is the defining risk for commercial banks. Unlike industrial companies where revenue risk is primary, banks face the constant possibility that borrowers will not repay their loans. The NPL ratio is the most fundamental measure of this risk because it captures the portion of the loan portfolio where repayment problems have already surfaced. For bank investors, the NPL ratio and its trajectory over time are critical inputs for evaluating the sustainability of current earnings and the adequacy of loan loss reserves.",
    "metricConnections": "The NPL ratio connects directly to several other asset quality and capital metrics. Reserve Coverage Ratio = Loan Loss Reserve / NPL; a rising NPL ratio with a stable reserve balance means declining coverage. The Texas Ratio uses NPAs (which include NPLs) in its numerator. Net charge-offs often lag NPL formation by one to four quarters as banks work through problem loans before recognizing losses. Elevated NPLs drive higher provision expense, which reduces pre-tax earnings, ROAA, ROE, and EPS. Through this earnings channel, credit quality problems ultimately affect valuation metrics like P/E and P/B.",
    "commonPitfalls": "A declining NPL ratio is not always a positive signal. Banks can reduce NPLs by aggressively charging off problem loans, selling non-performing loan portfolios, or engaging in troubled debt restructurings (TDRs) that move loans back to performing status. Each of these actions reduces the NPL ratio but has different implications for future losses and recovery potential. Evaluating the NPL ratio alongside the net charge-off ratio and reserve levels provides a more complete picture. Additionally, comparing NPL ratios across banks without accounting for loan mix differences is unreliable because consumer, commercial, and CRE loan portfolios have different baseline delinquency characteristics.",
    "acrossBankTypes": "Community banks concentrated in commercial real estate lending may exhibit higher NPL volatility because CRE loans are often lumpy (a single large loan going non-performing can meaningfully move the ratio). Money center banks with diversified global loan portfolios tend to have more stable NPL ratios, though their absolute levels depend on the credit cycle. Banks with large credit card portfolios typically have higher baseline delinquency rates but faster resolution through charge-offs, potentially showing lower NPL ratios but higher charge-off ratios.",
    "whatDrivesMetric": "The NPL ratio is driven by macroeconomic conditions (unemployment, GDP growth, interest rates), local market conditions in the bank's lending footprint, underwriting quality (which determines how loans perform during stress), loan mix (CRE, C&I, consumer each have different delinquency profiles), and the bank's workout and charge-off policies. Rising interest rates can push variable-rate borrowers into delinquency. Economic recessions drive broad increases in NPLs across most loan categories.",
    "faqTeasers": [
      {
        "question": "What is the non-performing loans (NPL) ratio?",
        "teaser": "The NPL ratio measures the percentage of a bank's loan portfolio that is non-performing (90+ days past due or on non-accrual), serving as the primary indicator of credit quality deterioration.",
        "faqSlug": "what-is-npl-ratio",
        "faqCluster": "capital-and-risk"
      },
      {
        "question": "How do I evaluate the credit quality of a bank's loan portfolio?",
        "teaser": "Evaluating credit quality requires examining multiple metrics together, including the NPL ratio, net charge-off ratio, reserve coverage, and provision trends, alongside the composition of the loan portfolio itself.",
        "faqSlug": "how-to-evaluate-loan-credit-quality",
        "faqCluster": "capital-and-risk"
      },
      {
        "question": "How do I calculate the NPL Ratio?",
        "teaser": "The NPL ratio divides non-performing loans (loans 90+ days past due plus non-accrual loans) by total gross loans.",
        "faqSlug": "how-to-calculate-npl-ratio",
        "faqCluster": "capital-and-risk"
      }
    ],
    "relatedValuations": [
      "peer-comparison",
      "price-to-book-valuation",
      "price-to-tangible-book-valuation"
    ]
  },
  {
    "slug": "non-performing-assets-ratio",
    "name": "Non-Performing Assets (NPA) Ratio",
    "category": "asset-quality",
    "categoryLabel": "Asset Quality Ratio",
    "formula": "NPA Ratio = Non-Performing Assets / Total Assets",
    "isPercentage": true,
    "shortDescription": "Measures non-performing assets (including NPLs and other real estate owned) as a percentage of total assets, providing the broadest view of a bank's problem asset exposure",
    "description": "The Non-Performing Assets Ratio divides total non-performing assets by total assets. Non-performing assets include all non-performing loans (90+ days past due and non-accrual) plus other real estate owned (OREO, which is property acquired through foreclosure or deed in lieu of foreclosure) and any other repossessed assets. The NPA ratio provides a broader view of problem assets than the NPL ratio because it captures assets that have already moved beyond the loan stage into foreclosure or repossession.",
    "formulaExplanation": "The numerator sums non-performing loans, OREO, and other repossessed assets. OREO represents real property that the bank has acquired through the foreclosure process and now holds on its balance sheet, typically at the lower of cost or fair value less estimated selling costs. Other repossessed assets may include equipment, vehicles, or other collateral seized from defaulted borrowers. The denominator is total assets from the balance sheet, providing a measure of total exposure relative to the bank's full asset base.",
    "interpretation": "A rising NPA ratio indicates expanding credit problems, with assets moving through the stages from delinquent to non-performing to foreclosed. The NPA ratio captures the full lifecycle of problem assets; some assets that exit the NPL numerator through foreclosure re-enter the NPA ratio through OREO. A declining NPA ratio indicates the bank is resolving problem assets through sales, workouts, or write-downs.",
    "typicalRange": "During normal economic conditions, US banks typically maintain NPA ratios between 0.3% and 1.5% (FDIC data). During credit downturns, NPA ratios can increase substantially; the US banking industry average exceeded 3% during 2009-2011 per FDIC Quarterly Banking Profile data. Individual bank ratios vary based on loan mix, geographic concentration, and the pace of problem asset resolution.",
    "goodBad": {
      "good": "NPA ratios below 0.5% indicate very clean balance sheets with minimal problem assets. Ratios below 1.0% suggest manageable credit quality issues that are unlikely to significantly impact earnings or capital.",
      "bad": "NPA ratios above 2.0% indicate meaningful problem asset concentrations that will pressure earnings through provision expense, OREO maintenance costs, and eventual disposition losses. Ratios above 3.0% signal severe credit stress that may require additional capital or attract regulatory attention."
    },
    "considerations": [
      "OREO carries ongoing costs (property taxes, insurance, maintenance) and is typically sold at a loss relative to the original loan balance. Banks are generally required to dispose of OREO within a specified period (typically five years under federal banking regulations), creating pressure to accept below-market prices.",
      "The NPA ratio uses total assets as the denominator rather than total loans. This means the ratio is influenced by the bank's overall asset size and composition, not just lending activity. A bank with a large securities portfolio may show a lower NPA ratio than a bank of similar loan quality simply because total assets are larger relative to loans.",
      "Problem asset resolution takes time. OREO typically remains on the books for months to years depending on property type and market conditions. The NPA ratio can remain elevated long after new problem loan formation has subsided, reflecting the lag in disposing of previously foreclosed properties.",
      "Under CECL (Current Expected Credit Losses), banks must estimate lifetime credit losses when originating loans. This front-loads reserve building but does not change when loans are classified as non-performing. The NPA ratio therefore remains a backward-looking measure of credit quality even under CECL."
    ],
    "relatedMetrics": [
      "non-performing-loans-ratio",
      "texas-ratio",
      "net-charge-off-ratio",
      "loan-loss-reserve-ratio",
      "reserve-coverage-ratio",
      "tangible-common-equity-ratio"
    ],
    "relatedMetricDescriptions": {
      "non-performing-loans-ratio": "The NPL ratio measures only the loan component of non-performing assets, excluding OREO and repossessed assets that have moved beyond the loan stage.",
      "texas-ratio": "The Texas Ratio uses NPAs in its numerator and divides by tangible common equity plus loan loss reserves, directly measuring the capacity to absorb NPA losses.",
      "net-charge-off-ratio": "Net charge-offs measure realized losses on loans, while NPAs measure the stock of problem assets that may produce future losses.",
      "loan-loss-reserve-ratio": "The allowance for credit losses is sized relative to the loan portfolio but informed by the level of non-performing assets.",
      "reserve-coverage-ratio": "Reserve coverage relates the allowance to NPLs specifically; the NPA ratio adds the OREO dimension that reserve coverage does not directly address.",
      "tangible-common-equity-ratio": "TCE represents the tangible capital available to absorb losses from non-performing assets, linking asset quality to capital adequacy."
    },
    "isEducationalOnly": true,
    "whereToFindData": "Non-performing asset data is disclosed in a bank's 10-Q and 10-K filings in the credit quality and asset quality sections. Call Reports (FFIEC 031/041) contain detailed schedules for non-performing loans, OREO, and other repossessed assets. The FDIC's BankFind Suite provides NPA data for individual institutions. The FDIC Quarterly Banking Profile reports aggregate NPA ratios for the banking industry. OREO balances are typically a separate line item on the balance sheet.",
    "bankSpecificContext": "The NPA ratio is particularly important for bank analysis because banks are in the business of accepting and managing credit risk. Unlike other industries where asset quality problems might involve inventory obsolescence or equipment depreciation, bank asset quality problems represent the potential failure of the bank's core function: extending credit to borrowers who repay. The NPA ratio captures the full spectrum of credit problems, from loans where payments have stopped to properties that the bank has been forced to take back through foreclosure.",
    "metricConnections": "NPA = NPL + OREO + Other Repossessed Assets. The NPA ratio is the numerator input to the Texas Ratio (Texas Ratio = NPA / (TCE + Loan Loss Reserves)). NPAs flow from rising NPLs (as delinquent loans become non-performing) and into OREO (as non-performing loans are foreclosed). The eventual resolution of NPAs through charge-offs, loan sales, or OREO disposition feeds into the net charge-off ratio and can affect ROAA through disposition gains or losses. Elevated NPAs typically correlate with higher provision expense, which reduces earnings and slows capital formation through retained earnings.",
    "commonPitfalls": "Comparing NPA ratios across banks without considering their OREO resolution strategies is misleading. Some banks aggressively mark down and sell OREO quickly (reducing NPA but recognizing losses), while others hold OREO longer hoping for better disposition prices (keeping NPA elevated but deferring losses). Additionally, the denominator difference between the NPL ratio (total loans) and NPA ratio (total assets) means these ratios are not directly comparable in percentage terms.",
    "acrossBankTypes": "Banks with large commercial real estate portfolios (common among community and regional banks) tend to have higher NPA volatility because CRE foreclosures produce significant OREO balances that take time to resolve. Banks focused on consumer lending may have lower NPA ratios because consumer defaults are resolved more quickly through charge-offs rather than extended foreclosure processes. Money center banks with diversified portfolios generally have more stable NPA ratios but may carry specialized problem assets from areas like leveraged lending or international exposures.",
    "whatDrivesMetric": "The NPA ratio is driven by the same macroeconomic and credit cycle factors that drive the NPL ratio, plus the pace of problem asset resolution. Local real estate market conditions affect OREO values and disposition timelines. Rising interest rates can increase both loan delinquencies and the time needed to sell foreclosed properties. Management's problem asset resolution strategy (aggressive vs. patient) directly affects how quickly NPAs decline once new problem loan formation slows.",
    "faqTeasers": [
      {
        "question": "What are non-performing assets (NPA) and how do they affect bank value?",
        "teaser": "Non-performing assets include non-performing loans plus foreclosed properties and repossessed collateral, representing the full scope of a bank's problem asset exposure.",
        "faqSlug": "what-are-non-performing-assets",
        "faqCluster": "capital-and-risk"
      },
      {
        "question": "What is the Texas Ratio and how do I calculate it?",
        "teaser": "The Texas Ratio divides non-performing assets by the sum of tangible common equity and loan loss reserves, measuring whether a bank has enough tangible resources to absorb its problem asset exposure.",
        "faqSlug": "what-is-texas-ratio",
        "faqCluster": "capital-and-risk"
      }
    ],
    "relatedValuations": [
      "peer-comparison",
      "price-to-book-valuation",
      "price-to-tangible-book-valuation"
    ]
  },
  {
    "slug": "net-charge-off-ratio",
    "name": "Net Charge-Off Ratio",
    "category": "asset-quality",
    "categoryLabel": "Asset Quality Ratio",
    "formula": "Net Charge-Off Ratio = Net Charge-Offs / Average Loans",
    "isPercentage": true,
    "shortDescription": "Measures actual loan losses realized during a period as a percentage of average loans, providing the most concrete measure of credit cost",
    "description": "The Net Charge-Off Ratio divides net charge-offs (gross charge-offs minus recoveries) by average loans for the period. A charge-off occurs when a bank removes a loan from its books because it determines the loan is uncollectible, writing it off against the allowance for credit losses. Recoveries represent amounts collected on previously charged-off loans. The ratio measures the actual loss rate experienced on the loan portfolio over a given period, making it the most concrete measure of credit cost.",
    "formulaExplanation": "Gross charge-offs are the total amount of loans written off as uncollectible during the period. Recoveries are amounts subsequently collected on previously charged-off loans (through collateral liquidation, borrower payments on deficiency balances, or debt collection). Net charge-offs = gross charge-offs minus recoveries. Average loans is typically the average of beginning and ending total loan balances for the period. When using quarterly data, the net charge-off amount should be annualized (multiplied by 4) before dividing by average loans to produce an annualized ratio comparable across periods.",
    "interpretation": "The net charge-off ratio represents the actual realized cost of credit risk during a period. Unlike the NPL ratio (which measures potential future losses), the net charge-off ratio reflects losses that have already been recognized. A rising charge-off ratio indicates that credit problems are maturing into actual losses. A declining ratio indicates improving credit conditions or the resolution of a prior cycle's problem loans.",
    "typicalRange": "US banks have historically averaged net charge-off ratios between 0.3% and 0.6% during normal economic conditions (FDIC aggregate data). During the 2009-2010 credit cycle peak, the industry average exceeded 2.5% (FDIC Quarterly Banking Profile). Credit card portfolios typically run higher charge-off rates (3% to 5% in normal times) than commercial loan portfolios (0.1% to 0.5% in normal times).",
    "goodBad": {
      "good": "Net charge-off ratios below 0.3% indicate minimal actual loan losses. Ratios in the 0.2% to 0.5% range for a diversified loan portfolio suggest well-managed credit risk with losses consistent with historical norms.",
      "bad": "Net charge-off ratios above 1.0% for a diversified portfolio indicate elevated credit stress. Ratios above 2.0% signal severe credit problems that significantly erode earnings and may require additional provisioning to replenish the allowance for credit losses."
    },
    "considerations": [
      "Charge-off timing is a management decision within regulatory guidelines. Banks can delay or accelerate charge-offs, which affects the timing of when losses appear in the net charge-off ratio. Regulatory guidance generally requires charge-off when a loan is confirmed as uncollectible, but judgment is involved in that determination.",
      "Quarterly net charge-off data must be annualized for comparison with annual ratios. Multiply quarterly net charge-offs by 4 before dividing by average loans. Failure to annualize is a common calculation error that produces ratios one-quarter of the correct magnitude.",
      "A sudden decline in the net charge-off ratio may reflect the completion of a charge-off cycle rather than an improvement in ongoing credit quality. Examining the trend over multiple quarters provides a more reliable signal than any single period's ratio.",
      "Recoveries reduce net charge-offs and improve the ratio. Banks with effective recovery operations or strong collateral positions may show lower net charge-off ratios than their gross charge-off activity would suggest. Analyzing both gross and net charge-off trends provides additional insight."
    ],
    "relatedMetrics": [
      "non-performing-loans-ratio",
      "loan-loss-reserve-ratio",
      "provision-to-average-loans",
      "roaa",
      "roe",
      "pre-provision-net-revenue"
    ],
    "relatedMetricDescriptions": {
      "non-performing-loans-ratio": "The NPL ratio is a leading indicator of future charge-offs; loans typically move through non-performing status before being charged off.",
      "loan-loss-reserve-ratio": "Charge-offs reduce the allowance for credit losses, requiring replenishment through provision expense. The relationship between charge-offs and the reserve level indicates provisioning adequacy.",
      "provision-to-average-loans": "Provision expense must at minimum cover net charge-offs to prevent reserve depletion; comparing the two reveals whether the bank is building or drawing down reserves.",
      "roaa": "Net charge-offs flow through provision expense into net income, directly affecting ROAA. Higher charge-offs reduce ROAA, all else equal.",
      "roe": "Through the earnings channel, elevated charge-offs reduce ROE by increasing provision expense and reducing net income available to equity holders.",
      "pre-provision-net-revenue": "PPNR measures earnings before provision expense, providing context for the bank's ability to absorb charge-offs through ongoing earnings rather than capital drawdown."
    },
    "isEducationalOnly": true,
    "whereToFindData": "Net charge-off data is reported in a bank's 10-Q and 10-K filings, typically in the credit quality section. The income statement may show provision expense, but net charge-offs are disclosed separately (usually in the notes to financial statements or the Management's Discussion and Analysis). Call Reports (FFIEC 031/041) contain detailed charge-off schedules by loan category. The FDIC Quarterly Banking Profile reports aggregate charge-off rates for the banking industry.",
    "bankSpecificContext": "Net charge-offs represent the ultimate cost of credit risk for banks. While provision expense affects current-period earnings, charge-offs represent the actual, confirmed loss of principal. For bank investors, the net charge-off ratio over a full credit cycle reveals the true cost of a bank's lending strategy. A bank that generates high NIM through aggressive lending may show strong profitability during benign credit conditions, but if that lending produces elevated charge-offs during downturns, the full-cycle economics may be less attractive than they initially appeared.",
    "metricConnections": "Net charge-offs deplete the allowance for credit losses, requiring replenishment through provision expense. The relationship is: Ending Allowance = Beginning Allowance + Provision Expense - Net Charge-Offs. If net charge-offs exceed provision expense, the allowance declines, reducing the loan loss reserve ratio. If provision expense exceeds net charge-offs, the bank is building reserves. PPNR provides the first line of defense against charge-offs; a bank with PPNR of 2% of assets and charge-offs of 1% can absorb those losses through earnings alone without drawing on capital.",
    "commonPitfalls": "Comparing net charge-off ratios across banks with very different loan mixes is unreliable. Credit card portfolios have structurally higher charge-off rates than secured commercial lending because credit card losses are unsecured and resolved through charge-off rather than extended workout. A bank with a large credit card book will naturally show a higher aggregate charge-off rate than a bank focused on secured commercial lending, even if both banks have equal underwriting quality within their respective segments. Segmented charge-off analysis by loan type provides more meaningful comparisons.",
    "acrossBankTypes": "Large banks with significant consumer lending operations (credit cards, auto loans, personal loans) typically report higher aggregate net charge-off ratios than community banks focused on commercial and CRE lending. This reflects the higher-frequency, lower-severity loss pattern in consumer lending versus the lower-frequency, higher-severity pattern in commercial lending. During credit downturns, community banks with CRE concentrations may experience sharp increases in charge-off ratios from individual large loans, while large bank consumer portfolios tend to show more gradual deterioration across many smaller exposures.",
    "whatDrivesMetric": "Net charge-offs are driven by the credit quality of the loan portfolio (determined by underwriting standards at origination), macroeconomic conditions (unemployment, GDP growth, property values), interest rate changes affecting borrower payment capacity, loan seasoning (loans in the middle years of their term typically have the highest default rates), and collateral values that affect recovery rates. Management's charge-off policies and workout effectiveness also influence the timing and magnitude of recognized losses.",
    "faqTeasers": [
      {
        "question": "What is the net charge-off ratio and what does it tell me about a bank?",
        "teaser": "The net charge-off ratio measures actual loan losses realized during a period, providing the most concrete assessment of the credit cost a bank is experiencing in its lending operations.",
        "faqSlug": "what-is-net-charge-off-ratio",
        "faqCluster": "capital-and-risk"
      },
      {
        "question": "How do I evaluate the credit quality of a bank's loan portfolio?",
        "teaser": "Evaluating credit quality requires examining multiple metrics together, including the NPL ratio, net charge-off ratio, reserve coverage, and provision trends, alongside the composition of the loan portfolio itself.",
        "faqSlug": "how-to-evaluate-loan-credit-quality",
        "faqCluster": "capital-and-risk"
      }
    ],
    "relatedValuations": [
      "peer-comparison",
      "discounted-earnings-model"
    ]
  },
  {
    "slug": "loan-loss-reserve-ratio",
    "name": "Loan Loss Reserve Ratio",
    "category": "asset-quality",
    "categoryLabel": "Asset Quality Ratio",
    "formula": "Loan Loss Reserve Ratio = Allowance for Credit Losses / Total Loans",
    "isPercentage": true,
    "shortDescription": "Measures the allowance for credit losses as a percentage of total loans, indicating how much the bank has set aside to cover expected loan losses",
    "description": "The Loan Loss Reserve Ratio divides the allowance for credit losses (ACL, also historically called the allowance for loan and lease losses or ALLL) by total loans. The allowance is a contra-asset on the balance sheet that reduces the net carrying value of the loan portfolio to reflect the bank's estimate of expected losses. The ratio indicates the level of provisioning relative to the loan portfolio size, providing a measure of how conservatively the bank is reserved against potential credit losses.",
    "formulaExplanation": "The numerator is the allowance for credit losses, a balance sheet reserve that is built through provision expense on the income statement and reduced by net charge-offs. Under CECL (Current Expected Credit Losses, effective for most banks since 2020-2023), the allowance reflects the bank's estimate of lifetime expected credit losses on the existing portfolio. The denominator is total loans, typically gross loans before the ACL deduction.",
    "interpretation": "A higher reserve ratio means the bank has set aside a larger cushion against potential loan losses. Whether the current reserve level is adequate depends on the bank's credit quality (NPL ratio, charge-off trends), loan mix (higher-risk segments warrant higher reserves), and the economic outlook. The reserve ratio should be evaluated relative to the bank's actual credit quality metrics, not in isolation.",
    "typicalRange": "US banks historically maintained loan loss reserve ratios between 1.0% and 2.0% (FDIC aggregate data). Under CECL, which requires lifetime expected loss recognition, average reserve ratios have generally increased compared to the prior incurred-loss model. Banks with higher-risk loan portfolios (credit cards, subprime) maintain higher reserve ratios, while those focused on well-secured lending may operate with lower ratios.",
    "goodBad": {
      "good": "A reserve ratio that is stable or modestly increasing alongside stable credit quality metrics suggests appropriate provisioning. A reserve ratio that comfortably exceeds the bank's recent net charge-off ratio indicates the bank has reserves well in excess of its current loss experience.",
      "bad": "A declining reserve ratio concurrent with rising NPLs or charge-offs is a warning sign that the bank may be under-reserved. A reserve ratio significantly below peers with similar loan mixes may indicate insufficient provisioning that will require catch-up provisions in future quarters."
    },
    "considerations": [
      "Under CECL, the reserve ratio reflects lifetime expected losses rather than losses estimated to be incurred at the balance sheet date. This means reserve ratios are generally higher under CECL and more responsive to changes in the economic outlook, even before actual delinquencies rise.",
      "The reserve ratio can decline for either positive or negative reasons. Positive: the bank releases reserves because credit quality has genuinely improved. Negative: the bank has not provisioned enough to replace charge-offs that are depleting the allowance. Examining the relationship between provision expense and net charge-offs clarifies which scenario is occurring.",
      "Loan growth affects the reserve ratio mechanically. Rapid loan growth increases the denominator (total loans) and, under CECL, also requires additional provisions to maintain coverage of the larger portfolio. If provisions do not keep pace with loan growth, the reserve ratio can decline even without any credit quality deterioration.",
      "A portion of the allowance for credit losses (up to 1.25% of risk-weighted assets under the standardized approach) counts as Tier 2 regulatory capital. This creates a connection between the reserve level and the bank's Total Capital Ratio."
    ],
    "relatedMetrics": [
      "reserve-coverage-ratio",
      "non-performing-loans-ratio",
      "net-charge-off-ratio",
      "provision-to-average-loans",
      "total-capital-ratio",
      "texas-ratio"
    ],
    "relatedMetricDescriptions": {
      "reserve-coverage-ratio": "Reserve Coverage divides the allowance by NPLs, directly measuring how well reserves cover known problem loans, complementing the broader reserve-to-total-loans view.",
      "non-performing-loans-ratio": "The NPL ratio identifies the portion of the portfolio with repayment problems, informing whether the current reserve level is likely adequate.",
      "net-charge-off-ratio": "Net charge-offs deplete the allowance; the relationship between the reserve level and the charge-off rate indicates how many quarters of current-rate charge-offs the reserve could absorb.",
      "provision-to-average-loans": "Provision expense replenishes the allowance after charge-offs; comparing provision intensity to the reserve level shows whether the bank is building, maintaining, or drawing down reserves.",
      "total-capital-ratio": "Qualifying portions of the allowance count as Tier 2 capital, creating a direct link between the reserve level and the bank's regulatory capital position.",
      "texas-ratio": "The Texas Ratio includes loan loss reserves in its denominator, measuring whether combined tangible equity and reserves are sufficient to absorb non-performing asset exposure."
    },
    "isEducationalOnly": true,
    "whereToFindData": "The allowance for credit losses is reported on the balance sheet (as a contra-asset reducing gross loans) and in the notes to financial statements in 10-Q and 10-K filings. The provision for credit losses is on the income statement. Many banks provide a detailed rollforward of the allowance (beginning balance + provision - charge-offs + recoveries = ending balance) in their filings. Call Reports contain detailed reserve data. The FDIC Quarterly Banking Profile reports aggregate reserve ratios for the industry.",
    "bankSpecificContext": "The loan loss reserve is a critical junction point between the balance sheet and income statement in bank accounting. The reserve level reflects management's judgment about expected credit losses, which is inherently subjective. Too-low reserves flatter current earnings (because provision expense is understated) but create future earnings risk when catch-up provisioning is needed. Too-high reserves depress current earnings but provide a cushion that can be released in future periods. For bank investors, understanding the adequacy of the reserve level is essential for assessing whether reported earnings reflect true economic profitability.",
    "metricConnections": "The allowance is governed by the relationship: Ending ACL = Beginning ACL + Provision Expense - Net Charge-Offs. The reserve ratio interacts with the reserve coverage ratio (ACL / NPLs) to provide a complete picture of provisioning adequacy. If the reserve ratio is 1.5% and the NPL ratio is 1.5%, reserve coverage is 100%. If the NPL ratio rises to 3.0% with the same reserve level, coverage drops to 50%. The reserve ratio also connects to capital through Tier 2 inclusion and through the earnings impact of provision expense on retained earnings.",
    "commonPitfalls": "Evaluating the reserve ratio without context is misleading. A 2.0% reserve ratio at a bank with a clean loan portfolio and 0.2% net charge-offs suggests conservative over-reserving. The same 2.0% ratio at a bank with 3.0% NPLs and rising charge-offs may be dangerously inadequate. The reserve ratio is only meaningful when analyzed alongside the bank's credit quality metrics and loan mix. Additionally, comparing reserve ratios across banks that adopted CECL at different times (large banks adopted in 2020, smaller banks in 2023) requires attention to the accounting framework in use.",
    "acrossBankTypes": "Large banks with diverse loan portfolios including consumer lending (which has higher expected loss rates) tend to carry higher reserve ratios than community banks focused on secured commercial lending. Banks with large credit card portfolios often maintain reserve ratios of 5% or more on that segment. Community banks focused on owner-occupied CRE and C&I lending may maintain aggregate reserve ratios in the 1.0% to 1.5% range. Under CECL, all banks generally carry somewhat higher reserves than under the prior incurred-loss model.",
    "whatDrivesMetric": "The reserve ratio is driven by management's loss estimates (informed by historical loss experience, current conditions, and economic forecasts under CECL), the loan mix (higher-risk segments require higher reserves), portfolio seasoning (newer vintages under CECL carry higher reserves reflecting longer remaining lives), and net charge-off activity (which depletes the reserve and requires replenishment through provision expense). Regulatory examinations can also result in required reserve increases if examiners determine the bank is under-provisioned.",
    "faqTeasers": [
      {
        "question": "What is a bank's loan loss reserve ratio?",
        "teaser": "The loan loss reserve ratio measures how much a bank has set aside to cover expected loan losses, expressed as a percentage of total loans.",
        "faqSlug": "what-is-loan-loss-reserve-ratio",
        "faqCluster": "capital-and-risk"
      },
      {
        "question": "What is CECL and how did it change bank accounting?",
        "teaser": "CECL requires banks to estimate and reserve for lifetime expected credit losses when loans are originated, replacing the prior model that recognized losses only when they were probable of being incurred.",
        "faqSlug": "what-is-cecl",
        "faqCluster": "capital-and-risk"
      }
    ],
    "relatedValuations": [
      "peer-comparison"
    ]
  },
  {
    "slug": "reserve-coverage-ratio",
    "name": "Reserve Coverage Ratio",
    "category": "asset-quality",
    "categoryLabel": "Asset Quality Ratio",
    "formula": "Reserve Coverage Ratio = Allowance for Credit Losses / Non-Performing Loans",
    "isPercentage": true,
    "shortDescription": "Measures the allowance for credit losses relative to non-performing loans, indicating how well reserves cover known problem loans",
    "description": "The Reserve Coverage Ratio divides the allowance for credit losses by non-performing loans. It directly measures whether the bank's reserves are sufficient to absorb losses from its identified problem loans. A ratio above 100% means the allowance exceeds total non-performing loans, providing a cushion for additional losses from performing loans that may deteriorate. A ratio below 100% means the bank's reserves do not fully cover even its known problem loans.",
    "formulaExplanation": "The numerator is the allowance for credit losses (ACL) from the balance sheet. The denominator is total non-performing loans (loans 90+ days past due plus non-accrual loans). The ratio is expressed as a percentage. A result of 150% means the bank has $1.50 in reserves for every $1.00 of non-performing loans.",
    "interpretation": "Reserve coverage above 100% indicates the bank has set aside more than enough reserves to cover its currently identified problem loans, suggesting adequate provisioning. Higher coverage ratios provide greater comfort that the bank can absorb losses from both existing problem loans and from performing loans that may deteriorate in the future. The appropriate coverage level depends on the bank's loan mix, collateral quality, and the expected severity of losses on non-performing loans.",
    "typicalRange": "During normal economic conditions, well-managed US banks typically maintain reserve coverage ratios between 100% and 200% (FDIC data). Under CECL, reserve coverage has generally increased because reserves now cover lifetime expected losses on the entire portfolio, not just incurred losses. During credit downturns, coverage ratios can decline significantly as NPLs rise faster than reserves are replenished through provisions.",
    "goodBad": {
      "good": "Reserve coverage above 120% indicates healthy provisioning that provides a buffer beyond just covering known problem loans. Coverage above 150% suggests conservative provisioning or a well-collateralized loan portfolio where expected loss severity on NPLs is well below 100%.",
      "bad": "Reserve coverage below 80% indicates the bank's reserves may not fully cover losses from its existing problem loans, let alone from performing loans that may deteriorate. Coverage below 50% signals serious under-provisioning that typically leads to significant catch-up provision expense in coming quarters."
    },
    "considerations": [
      "Not all non-performing loans result in losses. Some loans return to performing status through borrower recovery or restructuring. Others are well-collateralized, meaning the bank will recover most or all of the principal through collateral liquidation. Reserve coverage below 100% is not automatically alarming if the NPL portfolio is well-secured.",
      "Under CECL, the allowance covers lifetime expected losses on the entire loan portfolio, not just problem loans. This means the reserve coverage ratio under CECL may be higher than under the prior incurred-loss model because the ACL numerator reflects a broader base of expected losses.",
      "A very high reserve coverage ratio (above 300%) may indicate over-provisioning that is depressing current earnings unnecessarily, or it may indicate very low NPLs (making the ratio sensitive to small changes in the NPL denominator). When NPLs are extremely low, the coverage ratio becomes mathematically volatile.",
      "Declining coverage can result from either rising NPLs (denominator increasing) or reserve releases (numerator decreasing). These two scenarios have very different implications for future earnings and credit risk. Context from the NPL trend and provision expense is essential."
    ],
    "relatedMetrics": [
      "loan-loss-reserve-ratio",
      "non-performing-loans-ratio",
      "net-charge-off-ratio",
      "provision-to-average-loans",
      "texas-ratio",
      "tangible-common-equity-ratio"
    ],
    "relatedMetricDescriptions": {
      "loan-loss-reserve-ratio": "The loan loss reserve ratio measures reserves relative to total loans, providing a broader provisioning measure that complements the NPL-specific reserve coverage ratio.",
      "non-performing-loans-ratio": "The NPL ratio feeds the denominator of reserve coverage; rising NPLs reduce coverage unless provisions keep pace.",
      "net-charge-off-ratio": "Charge-offs deplete the allowance and reduce the numerator of reserve coverage, while also potentially reducing NPLs (denominator) if charged-off loans were previously classified as non-performing.",
      "provision-to-average-loans": "Provision expense replenishes the allowance; adequate provisioning is necessary to maintain reserve coverage as credit conditions evolve.",
      "texas-ratio": "The Texas Ratio provides a related but broader measure by comparing NPAs (not just NPLs) to the combined resources of tangible equity and reserves.",
      "tangible-common-equity-ratio": "Beyond reserves, tangible common equity represents additional loss-absorbing capacity for credit losses that exceed the allowance."
    },
    "isEducationalOnly": true,
    "whereToFindData": "The components are available in 10-Q and 10-K filings: the allowance for credit losses is on the balance sheet, and non-performing loan details are in the credit quality disclosures. Call Reports (FFIEC 031/041) provide both figures. Some banks explicitly calculate and disclose the reserve coverage ratio in their earnings releases. The FDIC's Uniform Bank Performance Report (UBPR) includes reserve coverage data for individual institutions.",
    "bankSpecificContext": "Reserve coverage is a critical metric for bank investors because it bridges the gap between identified credit problems (NPLs) and the resources set aside to address them (the allowance). During periods of credit stress, falling reserve coverage is often the first quantitative signal that a bank may need to increase provision expense materially, which directly reduces earnings. Conversely, rising reserve coverage during benign credit conditions may indicate the bank is building reserves conservatively, positioning itself for stability through the next credit cycle.",
    "metricConnections": "Reserve Coverage = Loan Loss Reserve Ratio / NPL Ratio. This decomposition shows that coverage depends on both how much the bank has reserved relative to its total loan book and how large its non-performing loan balance is. A bank can have 200% coverage either by maintaining a high reserve ratio (e.g., 2.0% reserves with 1.0% NPLs) or by keeping NPLs very low (e.g., 1.0% reserves with 0.5% NPLs). The implications differ: the first bank has substantial reserves, while the second is more dependent on its NPLs remaining low.",
    "commonPitfalls": "Using reserve coverage as the sole measure of provisioning adequacy ignores the risk in the performing portfolio. A bank may have 150% NPL coverage but face significant latent risk in performing loans that could become non-performing in a downturn. Reserve coverage also does not account for the expected severity of losses on NPLs; a well-collateralized NPL portfolio may need less than 100% coverage, while an unsecured NPL portfolio may need more. Additionally, the ratio is mathematically unstable when NPLs are very low, as small changes in non-performing loans produce large swings in the percentage.",
    "acrossBankTypes": "Banks with well-collateralized loan portfolios (CRE lending backed by property, residential mortgages) may comfortably operate with lower coverage ratios because expected loss severity on collateralized NPLs is lower. Banks with significant unsecured consumer lending typically maintain higher coverage ratios because expected severity on unsecured defaults is close to 100%. Large banks under CECL tend to show higher coverage ratios than they did under the prior model because the allowance now covers lifetime expected losses on the entire portfolio.",
    "whatDrivesMetric": "Reserve coverage is driven by the interaction between reserve building (through provision expense) and NPL formation. When NPLs rise faster than provisions, coverage falls. When provisions exceed the pace of NPL formation, coverage rises. Charge-offs affect both sides: they reduce the allowance (numerator) but also remove NPLs from the books (denominator), with the net effect on coverage depending on the severity of losses recognized. Changes in collateral values affect expected severity and therefore the adequacy of any given coverage level.",
    "faqTeasers": [
      {
        "question": "What is the reserve coverage ratio and how should I interpret it?",
        "teaser": "The reserve coverage ratio measures how well a bank's loan loss reserves cover its non-performing loans, with ratios above 100% indicating reserves exceed identified problem loans.",
        "faqSlug": "what-is-reserve-coverage-ratio",
        "faqCluster": "capital-and-risk"
      },
      {
        "question": "How do I evaluate the credit quality of a bank's loan portfolio?",
        "teaser": "Evaluating credit quality requires examining multiple metrics together, including the NPL ratio, net charge-off ratio, reserve coverage, and provision trends, alongside the composition of the loan portfolio itself.",
        "faqSlug": "how-to-evaluate-loan-credit-quality",
        "faqCluster": "capital-and-risk"
      }
    ],
    "relatedValuations": [
      "peer-comparison"
    ]
  },
  {
    "slug": "texas-ratio",
    "name": "Texas Ratio",
    "category": "asset-quality",
    "categoryLabel": "Asset Quality Ratio",
    "formula": "Texas Ratio = Non-Performing Assets / (Tangible Common Equity + Loan Loss Reserves)",
    "isPercentage": true,
    "shortDescription": "Measures non-performing assets relative to the combined resources of tangible common equity and loan loss reserves, serving as a stress indicator for bank financial health",
    "description": "The Texas Ratio divides non-performing assets by the sum of tangible common equity and the allowance for credit losses (loan loss reserves). Developed during the Texas banking crisis of the 1980s, the ratio assesses whether a bank has sufficient tangible resources to absorb losses from its problem assets. A Texas Ratio above 100% indicates that problem assets exceed the bank's combined tangible equity and reserves, historically a strong predictor of significant financial distress or failure.",
    "formulaExplanation": "The numerator is total non-performing assets: non-performing loans (90+ days past due plus non-accrual) plus OREO (other real estate owned) and other repossessed assets. The denominator combines tangible common equity (total equity minus goodwill, other intangible assets, and preferred stock) with the allowance for credit losses. This denominator represents the total tangible resources available to absorb credit losses: reserves that are specifically designated for that purpose, plus the tangible equity cushion beyond reserves.",
    "interpretation": "The Texas Ratio captures the relationship between the magnitude of a bank's credit problems and its capacity to absorb them. Below 50%, the bank has substantial capacity relative to its problem assets. Between 50% and 100%, problem assets are significant but still within the bank's absorptive capacity. Above 100%, problem assets exceed the bank's tangible resources, indicating severe stress. Historically, banks that sustained Texas Ratios above 100% for extended periods have faced a high probability of failure, enforcement actions, or forced recapitalization.",
    "typicalRange": "Well-managed banks during normal economic conditions typically maintain Texas Ratios between 5% and 30%. During credit downturns, ratios can spike above 50% for banks with concentrated credit problems. Texas Ratios above 100% have historically been strongly associated with bank failures or FDIC-assisted transactions (based on FDIC failure data analysis).",
    "goodBad": {
      "good": "Texas Ratios below 20% indicate that problem assets are modest relative to the bank's tangible resources, suggesting minimal near-term financial distress risk. Ratios below 10% indicate very clean asset quality with ample capital and reserves.",
      "bad": "Texas Ratios above 50% warrant close monitoring and deeper analysis of the specific NPAs and their expected recovery values. Ratios above 100% are a critical warning that the bank's tangible resources may be insufficient to absorb its problem asset exposure without additional capital, asset sales, or other remedial actions."
    },
    "considerations": [
      "The Texas Ratio is a point-in-time snapshot that does not account for the bank's ongoing earnings capacity (PPNR) to absorb losses. A bank with a 75% Texas Ratio and strong PPNR may be better positioned than one with a 60% Texas Ratio and weak earnings.",
      "Not all NPAs result in total loss. Collateralized non-performing loans may recover a significant portion of principal through liquidation. OREO may be sold at or near carrying value. The Texas Ratio implicitly assumes that all NPAs could become total losses, which overstates the actual risk for well-collateralized portfolios.",
      "The denominator uses tangible common equity, which excludes goodwill. For banks with significant goodwill from acquisitions, the Texas Ratio will be higher (worse) than a version using total equity, reflecting the more conservative view that goodwill cannot absorb credit losses.",
      "The Texas Ratio was developed empirically during the 1980s Texas banking crisis and validated through subsequent failure analyses. While not infallible, it has maintained strong predictive value across multiple credit cycles as documented in FDIC research."
    ],
    "relatedMetrics": [
      "non-performing-assets-ratio",
      "non-performing-loans-ratio",
      "tangible-common-equity-ratio",
      "loan-loss-reserve-ratio",
      "net-charge-off-ratio",
      "pre-provision-net-revenue"
    ],
    "relatedMetricDescriptions": {
      "non-performing-assets-ratio": "The NPA ratio measures the same problem assets in the Texas Ratio numerator but expresses them relative to total assets rather than to the bank's loss-absorbing capacity.",
      "non-performing-loans-ratio": "The NPL ratio captures the loan component of the Texas Ratio numerator, excluding OREO and other repossessed assets.",
      "tangible-common-equity-ratio": "TCE forms the primary component of the Texas Ratio denominator, representing the equity-based loss absorption capacity.",
      "loan-loss-reserve-ratio": "Loan loss reserves are the other component of the Texas Ratio denominator, representing the reserve-based loss absorption capacity.",
      "net-charge-off-ratio": "Net charge-offs reduce both the Texas Ratio numerator (removing NPAs) and denominator (depleting reserves and earnings that build equity), with the net effect depending on loss severity.",
      "pre-provision-net-revenue": "PPNR represents the earnings capacity available to absorb losses beyond what the Texas Ratio's static denominator captures."
    },
    "isEducationalOnly": true,
    "whereToFindData": "The Texas Ratio must be calculated from components available in a bank's 10-Q and 10-K filings: non-performing assets (credit quality disclosures), tangible common equity (balance sheet with adjustments for goodwill and intangibles), and the allowance for credit losses (balance sheet). Some analyst reports and bank screening tools calculate the Texas Ratio directly. The FDIC's UBPR provides the underlying data components for individual banks.",
    "bankSpecificContext": "The Texas Ratio occupies a unique position in bank analysis as perhaps the most widely recognized distress indicator for commercial banks. Its origin during the Texas savings-and-loan crisis of the 1980s, where thousands of banks failed, gives it historical credibility. The ratio's strength is its simplicity: it compares the problem (NPAs) to the resources available to absorb the problem (tangible equity + reserves). This straightforward framework has proven remarkably effective across multiple credit cycles as a flag for banks approaching financial distress.",
    "metricConnections": "Texas Ratio = NPA Ratio x (Total Assets / (TCE + ACL)). This decomposition shows the ratio is driven by both the magnitude of problem assets and the adequacy of tangible capital and reserves. The Texas Ratio can increase either because NPAs are rising or because TCE and reserves are declining (through losses, dividends, or buybacks). It connects to profitability metrics through the dynamic that charge-offs and provision expense reduce both earnings and reserves, potentially worsening the Texas Ratio from both sides (NPAs remaining elevated while the denominator shrinks).",
    "commonPitfalls": "Treating the 100% threshold as a binary pass/fail is an oversimplification. A bank at 95% with improving NPA trends and strong PPNR may be on a recovery path, while a bank at 70% with rapidly deteriorating credit quality and weak earnings may be heading toward distress. The direction and velocity of the Texas Ratio matter as much as the level. Additionally, the ratio does not distinguish between collateralized and uncollateralized NPAs; a 100% Texas Ratio backed entirely by collateralized CRE loans likely has better expected recovery than one backed by unsecured consumer loans.",
    "acrossBankTypes": "Community banks with geographic and loan-type concentrations tend to show more volatile Texas Ratios because a small number of large loan defaults can materially change the numerator. Diversified regional and money center banks typically have more stable Texas Ratios due to portfolio diversification. During localized economic stress (such as the oil price collapse affecting Texas in the 1980s or agricultural stress in rural banking markets), community banks in affected regions may show sharply elevated Texas Ratios while the broader banking industry remains healthy.",
    "whatDrivesMetric": "The Texas Ratio is driven by NPA formation (new loans becoming non-performing, loans moving to OREO), NPA resolution (charge-offs, loan sales, OREO dispositions, workout success), tangible equity changes (retained earnings growth or depletion, buybacks, goodwill impairment), and reserve changes (provision expense building reserves, charge-offs depleting them). During credit downturns, the Texas Ratio can deteriorate rapidly as NPAs rise while charge-offs and provision expense simultaneously reduce the denominator.",
    "faqTeasers": [
      {
        "question": "What is the Texas Ratio and how do I calculate it?",
        "teaser": "The Texas Ratio divides non-performing assets by the sum of tangible common equity and loan loss reserves, serving as a stress indicator that measures whether a bank's tangible resources can absorb its problem asset exposure.",
        "faqSlug": "what-is-texas-ratio",
        "faqCluster": "capital-and-risk"
      },
      {
        "question": "How do I evaluate the credit quality of a bank's loan portfolio?",
        "teaser": "Evaluating credit quality requires examining multiple metrics together, including the NPL ratio, net charge-off ratio, reserve coverage, and provision trends, alongside the composition of the loan portfolio itself.",
        "faqSlug": "how-to-evaluate-loan-credit-quality",
        "faqCluster": "capital-and-risk"
      },
      {
        "question": "How do I calculate the Texas Ratio?",
        "teaser": "The Texas Ratio divides NPAs (non-performing loans + OREO) by the sum of tangible common equity and the allowance for credit losses. A result above 100% is a critical stress signal.",
        "faqSlug": "how-to-calculate-texas-ratio",
        "faqCluster": "capital-and-risk"
      }
    ],
    "relatedValuations": [
      "peer-comparison",
      "price-to-book-valuation"
    ]
  },
  {
    "slug": "provision-to-average-loans",
    "name": "Provision for Credit Losses to Average Loans",
    "category": "asset-quality",
    "categoryLabel": "Asset Quality Ratio",
    "formula": "Provision to Average Loans = Provision for Credit Losses / Average Loans",
    "isPercentage": true,
    "shortDescription": "Measures the annual provision expense as a percentage of average loans, indicating the current-period cost of credit risk and the intensity of reserve building",
    "description": "The Provision for Credit Losses to Average Loans ratio divides the annual (or annualized) provision for credit losses by average total loans. Provision expense is the income statement charge that builds the allowance for credit losses on the balance sheet. The ratio measures how much of the bank's earnings are being consumed by credit risk costs in the current period, reflecting both actual loss experience and management's forward-looking assessment of credit conditions.",
    "formulaExplanation": "The numerator is the provision for credit losses reported on the income statement. When using quarterly data, the provision should be annualized (multiplied by 4 for a single quarter, or summed over four quarters for trailing twelve months) to produce a comparable annual rate. The denominator is average total loans, typically the average of beginning and ending loan balances for the period. Using average loans smooths out the effect of loan portfolio growth or contraction during the measurement period.",
    "interpretation": "A higher provision-to-loans ratio indicates that credit risk is consuming a larger share of the bank's revenue, either because losses are increasing, the economic outlook is deteriorating, or the bank is building reserves proactively. A lower ratio suggests benign credit conditions with minimal current-period loss recognition. The provision ratio directly affects the bank's bottom line: every dollar of provision expense is a dollar subtracted from pre-tax earnings.",
    "typicalRange": "During normal economic conditions, US banks typically provision at rates between 0.2% and 0.6% of average loans annually (FDIC aggregate data). During credit downturns, provision rates can spike above 2.0% or even 3.0% for banks with severe credit quality deterioration. Under CECL, provision expense can be more volatile because it responds to changes in the economic forecast, not just to emerging losses.",
    "goodBad": {
      "good": "Provision rates between 0.2% and 0.5% during stable economic conditions indicate manageable credit costs. Provision expense that closely tracks net charge-offs suggests the bank is maintaining reserve levels rather than depleting or excessively building them.",
      "bad": "Provision rates above 1.0% indicate elevated credit costs that significantly reduce earnings. Provision expense substantially exceeding net charge-offs may indicate the bank is building reserves for anticipated deterioration, which, while prudent, signals management's concern about future credit quality."
    },
    "considerations": [
      "Under CECL, provision expense includes not only the cost of covering current-period charge-offs but also adjustments to the lifetime expected loss estimate for the entire portfolio. Changes in the macroeconomic outlook can drive significant provision expense even without any change in actual loan performance, making the provision ratio more volatile than under the prior incurred-loss model.",
      "Day-one CECL provisions on new loan originations mean that rapid loan growth generates provision expense even in a benign credit environment. A high provision rate at a rapidly growing bank may reflect portfolio expansion rather than credit quality deterioration.",
      "Provision expense of zero or negative values (reserve releases) is possible when credit conditions improve significantly and the bank determines its allowance exceeds required levels. Reserve releases boost earnings in the current period but may not be sustainable.",
      "Comparing provision rates across banks requires attention to loan mix. Banks with large credit card or unsecured consumer lending portfolios will naturally provision at higher rates than banks focused on secured commercial lending, reflecting the different expected loss profiles of those asset classes."
    ],
    "relatedMetrics": [
      "net-charge-off-ratio",
      "loan-loss-reserve-ratio",
      "reserve-coverage-ratio",
      "roaa",
      "pre-provision-net-revenue",
      "roe"
    ],
    "relatedMetricDescriptions": {
      "net-charge-off-ratio": "Comparing provision expense to net charge-offs reveals whether the bank is building reserves (provision > charge-offs), maintaining them (roughly equal), or depleting them (charge-offs > provision).",
      "loan-loss-reserve-ratio": "Provision expense is the mechanism that builds the loan loss reserve; the relationship between the provision rate and the reserve level indicates the pace of reserve accumulation or depletion.",
      "reserve-coverage-ratio": "Provision expense ultimately affects reserve coverage by maintaining or changing the allowance level relative to non-performing loans.",
      "roaa": "Provision expense directly reduces net income and therefore ROAA. The provision rate is often the largest single variable driving earnings volatility at banks.",
      "pre-provision-net-revenue": "PPNR measures earnings capacity before provision expense, providing context for how much provision expense the bank can absorb without reporting a loss.",
      "roe": "Through its impact on net income, provision expense reduces ROE and the rate of capital formation through retained earnings."
    },
    "isEducationalOnly": true,
    "whereToFindData": "Provision for credit losses is a line item on the income statement in 10-Q and 10-K filings. Average loans can be calculated from the balance sheet or are sometimes disclosed separately. Call Reports (FFIEC 031/041) include provision data. The FDIC Quarterly Banking Profile reports aggregate provision rates for the banking industry. Some banks provide quarterly provision data in their earnings release supplements.",
    "bankSpecificContext": "Provision expense is the primary mechanism through which credit risk translates into earnings impact for banks. It represents management's current assessment of the cost of credit risk and is the key link between the balance sheet (allowance for credit losses) and the income statement (earnings). For bank analysts, understanding whether current provision levels are adequate, excessive, or insufficient relative to actual and expected credit trends is essential for forecasting future earnings. Provision expense is also one of the most subjective items in bank accounting, as it requires management judgment about future credit conditions.",
    "metricConnections": "The provision relationship is: Ending ACL = Beginning ACL + Provision - Net Charge-Offs. When Provision > Net Charge-Offs, the reserve ratio increases (building reserves). When Provision < Net Charge-Offs, the reserve ratio decreases (depleting reserves). PPNR minus provision expense equals pre-tax income; this relationship means that a bank with PPNR of 2.0% of assets and provision expense of 0.5% of loans has significant capacity to absorb higher credit costs before earnings turn negative.",
    "commonPitfalls": "Interpreting low provision expense as a sign of excellent credit quality may be premature. Management can under-provision in the short term to support earnings, only to face catch-up provisions later when losses materialize or examiners require reserve increases. Comparing the provision rate to net charge-offs over time (rather than in a single quarter) helps identify whether the bank is provisioning adequately. Additionally, under CECL, a single quarter's provision expense can be heavily influenced by changes in macroeconomic forecast assumptions, making it less reliable as a signal of actual credit deterioration than under the prior model.",
    "acrossBankTypes": "Large banks with consumer lending portfolios typically show higher baseline provision rates due to the higher expected loss rates in consumer lending. Community banks focused on commercial lending may show lower baseline rates but more volatility when individual large loans require specific reserves. Under CECL, all banks show greater provision volatility because forecast changes flow through the income statement immediately. Money center banks with sophisticated economic forecasting models may show provision changes driven by macroeconomic outlook shifts even before actual credit metrics deteriorate.",
    "whatDrivesMetric": "Provision expense is driven by net charge-off activity (which depletes reserves and requires replenishment), changes in the economic outlook under CECL (which can trigger reserve builds or releases), loan portfolio growth (requiring day-one provisions on new originations under CECL), changes in loan mix toward higher or lower risk segments, and specific loss events on individual large exposures. Regulatory examination results can also drive provision adjustments if examiners require higher reserves.",
    "faqTeasers": [
      {
        "question": "What is the provision for credit losses on a bank's income statement?",
        "teaser": "The provision for credit losses is the income statement expense that builds the bank's allowance (reserve) for expected loan losses, representing the current-period cost of credit risk.",
        "faqSlug": "what-is-provision-for-credit-losses",
        "faqCluster": "financial-statements"
      },
      {
        "question": "How do I evaluate the credit quality of a bank's loan portfolio?",
        "teaser": "Evaluating credit quality requires examining multiple metrics together, including the NPL ratio, net charge-off ratio, reserve coverage, and provision trends, alongside the composition of the loan portfolio itself.",
        "faqSlug": "how-to-evaluate-loan-credit-quality",
        "faqCluster": "capital-and-risk"
      }
    ],
    "relatedValuations": [
      "peer-comparison",
      "discounted-earnings-model"
    ]
  },
  {
    "slug": "return-on-tangible-common-equity",
    "name": "Return on Tangible Common Equity (ROTCE)",
    "category": "profitability",
    "categoryLabel": "Profitability Ratio",
    "formula": "ROTCE = Net Income / Average Tangible Common Equity",
    "isPercentage": true,
    "shortDescription": "Measures net income as a percentage of average tangible common equity, providing a profitability view that strips out goodwill and intangible assets from the equity base",
    "description": "Return on Tangible Common Equity divides net income available to common shareholders by average tangible common equity. Tangible common equity equals total common equity minus goodwill and other intangible assets. ROTCE is widely used by bank analysts because it measures the return generated on the hard capital invested in the business, excluding the accounting artifacts of past acquisition premiums. For banks that have grown through M&A, ROTCE provides a more operationally meaningful profitability measure than standard ROE.",
    "formulaExplanation": "The numerator is net income available to common shareholders (net income minus preferred dividends). The denominator is average tangible common equity for the period, calculated by subtracting goodwill and other intangible assets from average total common shareholders' equity. Average tangible common equity is typically computed as the simple average of beginning and ending period balances, though some banks use a more granular daily or monthly average. Both the numerator and denominator exclude preferred stock effects.",
    "interpretation": "A higher ROTCE indicates more efficient use of tangible capital. Because the denominator is smaller than total equity (goodwill and intangibles are removed), ROTCE is always equal to or higher than ROE for the same bank. The spread between ROE and ROTCE reveals how much goodwill and intangibles are depressing the standard return measure. For banks with minimal intangible assets, ROTCE and ROE will be nearly identical.",
    "typicalRange": "Well-managed US banks typically achieve ROTCE between 12% and 20% during normal conditions. Banks with significant goodwill may show ROTCE 2 to 5 percentage points above their ROE, depending on the magnitude of intangibles relative to total equity. Money center banks, which often carry substantial goodwill from decades of acquisitions, frequently report ROTCE as their primary profitability metric in earnings releases and investor presentations.",
    "goodBad": {
      "good": "ROTCE above 15% indicates strong profitability on tangible capital. Ratios above 18% place a bank among the top performers. Consistently high ROTCE suggests the bank generates attractive returns on its deployed capital, supporting both dividend payments and internal capital generation through retained earnings.",
      "bad": "ROTCE below 10% suggests the bank is earning below its cost of equity on tangible capital, which should be at least 10% to 12% for most banks given the risk profile of banking. ROTCE below the bank's cost of equity indicates value destruction on a tangible capital basis, even if ROE appears acceptable because of goodwill inflation."
    },
    "considerations": [
      "ROTCE is a non-GAAP metric that banks report voluntarily. Calculation methodologies can vary, particularly regarding the treatment of AOCI, deferred tax assets, and mortgage servicing rights. When comparing ROTCE across banks, verify the reconciliation provided in each bank's earnings release.",
      "A bank can improve ROTCE through goodwill impairment (which reduces the denominator without improving earnings), share buybacks at prices below tangible book value, or by avoiding acquisitions that create goodwill. These mechanical effects should be distinguished from genuine operational improvement.",
      "ROTCE strips out intangibles but does not adjust the numerator for amortization of intangible assets. A bank with significant intangible asset amortization (such as core deposit intangibles from acquisitions) has its net income reduced by that expense. Some analysts add back intangible amortization to the numerator for a \"cash\" ROTCE.",
      "The spread between ROE and ROTCE provides a quick read on a bank's acquisition history. A bank with ROE of 11% and ROTCE of 16% has significant goodwill and intangibles; one with ROE of 11% and ROTCE of 11.5% has grown primarily organically."
    ],
    "relatedMetrics": [
      "roe",
      "roaa",
      "tangible-common-equity-ratio",
      "tangible-book-value-per-share",
      "price-to-tangible-book-value",
      "book-value-per-share"
    ],
    "relatedMetricDescriptions": {
      "roe": "ROE uses total common equity in the denominator, including goodwill and intangibles; the spread between ROE and ROTCE reflects the impact of intangible assets on measured profitability.",
      "roaa": "ROAA removes both leverage and equity composition effects by using total assets, complementing ROTCE's focus on tangible capital returns.",
      "tangible-common-equity-ratio": "TCE Ratio measures the tangible equity base that generates ROTCE, connecting capital adequacy to profitability.",
      "tangible-book-value-per-share": "TBVPS expresses the ROTCE denominator on a per-share basis, linking tangible profitability to per-share valuation.",
      "price-to-tangible-book-value": "P/TBV is the valuation multiple that pairs with ROTCE, analogous to how P/B pairs with ROE in the justified P/B framework.",
      "book-value-per-share": "BVPS includes goodwill and intangibles; comparing BVPS to TBVPS reveals the per-share impact of intangible assets."
    },
    "isEducationalOnly": true,
    "whereToFindData": "ROTCE is widely reported by large and mid-size banks as a non-GAAP financial measure in quarterly earnings releases and investor presentations, with a reconciliation to GAAP ROE. For banks that do not disclose ROTCE, it can be calculated from 10-K and 10-Q data using net income (adjusted for preferred dividends) and tangible common equity (total equity minus preferred stock minus goodwill minus intangibles).",
    "bankSpecificContext": "ROTCE has become the preferred profitability metric for bank management teams and sell-side analysts because it removes the distortion created by acquisition-related intangibles. When a bank acquires another institution at a premium to tangible book value, the excess is recorded as goodwill. This goodwill inflates the equity denominator in ROE without generating any incremental earnings, mechanically depressing ROE. ROTCE solves this problem by measuring returns on the tangible capital actually deployed in the business. For serial acquirers, ROTCE can be 3 to 5 or more percentage points above ROE.",
    "metricConnections": "ROTCE = ROE x (Common Equity / Tangible Common Equity). This relationship shows that ROTCE exceeds ROE by a factor determined by the intangible asset burden. ROTCE also connects to valuation: just as ROE determines the justified P/B multiple, ROTCE determines the justified P/TBV multiple. P/TBV = (ROTCE - g) / (r - g), where g is the sustainable growth rate and r is the cost of equity. A bank with 15% ROTCE, 3% growth, and 10% cost of equity has a justified P/TBV of approximately 1.7x. ROTCE multiplied by the retention ratio gives the tangible equity growth rate.",
    "commonPitfalls": "Comparing ROTCE across banks without verifying calculation methodology can produce misleading conclusions. Some banks exclude AOCI from tangible equity, others include it; some deduct all intangibles, others retain mortgage servicing rights. These differences can move ROTCE by several percentage points. Additionally, very high ROTCE does not automatically signal superior management; it can also indicate thin tangible capital (a very small denominator), which may mean the bank lacks adequate capital cushion in a stress scenario.",
    "acrossBankTypes": "Money center banks and large regionals that have completed significant acquisitions typically show the largest spread between ROE and ROTCE. Community banks that have grown organically show minimal or no spread. Banks resulting from mutual-to-stock conversions often carry no goodwill at all, making ROE and ROTCE identical. Among the largest US banks, ROTCE has become the standard profitability measure cited in earnings calls and annual reports.",
    "whatDrivesMetric": "ROTCE is driven by the same income factors as ROE (net interest income, fee income, operating efficiency, provision expense, and tax rate) but with a different denominator. Changes in the tangible equity base through retained earnings, buybacks, and AOCI movements affect the denominator. Goodwill impairment charges reduce net income (hurting the numerator) but also reduce the denominator, and the net effect on ROTCE depends on the relative magnitudes. Acquisitions that create goodwill reduce ROE but have no direct impact on ROTCE (since the goodwill is excluded from the denominator), though the operating results of the acquired entity affect the numerator.",
    "faqTeasers": [
      {
        "question": "What is return on tangible common equity (ROTCE)?",
        "teaser": "ROTCE measures profitability on the tangible capital base by excluding goodwill and intangible assets from equity, providing a clearer view of returns for banks that have grown through acquisitions.",
        "faqSlug": "what-is-rotce",
        "faqCluster": "profitability"
      },
      {
        "question": "What is the difference between ROE and ROAA for banks?",
        "teaser": "ROE measures return on shareholders' equity while ROAA measures return on total assets, with the difference driven by leverage. Both complement ROTCE for a full profitability picture.",
        "faqSlug": "roe-vs-roaa",
        "faqCluster": "profitability"
      }
    ],
    "relatedValuations": [
      "price-to-tangible-book-valuation",
      "roe-pb-framework",
      "peer-comparison",
      "dupont-decomposition"
    ]
  },
  {
    "slug": "pre-provision-net-revenue",
    "name": "Pre-Provision Net Revenue (PPNR)",
    "category": "profitability",
    "categoryLabel": "Profitability Ratio",
    "formula": "PPNR = Net Interest Income + Non-Interest Income - Non-Interest Expense",
    "isPercentage": false,
    "shortDescription": "Measures a bank's core earnings power before the provision for credit losses, representing the revenue available to absorb loan losses and generate net income",
    "description": "Pre-Provision Net Revenue equals net interest income plus non-interest income minus non-interest expense. PPNR strips out the provision for credit losses and income taxes to reveal the bank's underlying earnings capacity before the most volatile line items. Because the provision can swing dramatically with the credit cycle, PPNR provides a more stable view of a bank's ability to generate revenue and control expenses. Regulators and analysts use PPNR as a measure of a bank's first line of defense against credit losses.",
    "formulaExplanation": "The calculation starts with net interest income (interest income minus interest expense), adds non-interest income (fee income, trading revenue, service charges, and other non-lending revenue), and subtracts non-interest expense (salaries, occupancy, technology, and other operating costs). The result is pre-tax, pre-provision earnings. Some analysts further adjust PPNR by excluding one-time items such as securities gains/losses, legal settlements, or restructuring charges to arrive at \"core\" or \"adjusted\" PPNR.",
    "interpretation": "PPNR represents the earnings capacity available to absorb credit losses. If PPNR exceeds the provision for credit losses, the bank remains profitable (before taxes). If the provision exceeds PPNR, the bank is operating at a pre-tax loss, consuming capital. A bank with strong PPNR can absorb significant credit losses without threatening capital adequacy; a bank with weak PPNR is vulnerable to even moderate credit deterioration. PPNR is typically expressed as a dollar amount, but PPNR-to-average-assets is sometimes used for cross-bank comparisons.",
    "typicalRange": "PPNR levels vary enormously by bank size. For cross-bank comparison, PPNR as a percentage of average assets is more useful, with typical values between 1.5% and 3.0% for US commercial banks. Well-run banks with strong NIMs and controlled expenses achieve PPNR-to-assets above 2.0%. Banks with low NIMs, high expense bases, or limited fee income may fall below 1.5%. Money center banks with diversified fee income streams often achieve higher PPNR-to-assets ratios than community banks that rely primarily on net interest income.",
    "goodBad": {
      "good": "Strong PPNR (above 2.0% of average assets) indicates robust core earnings power. Banks with strong PPNR can absorb elevated credit losses during downturns while remaining profitable and continuing to build capital through retained earnings. Growing PPNR over time indicates improving operating leverage.",
      "bad": "Weak PPNR (below 1.5% of average assets) leaves the bank vulnerable to credit cycle downturns. If provision expense exceeds PPNR for multiple consecutive quarters, the bank is burning capital, which can lead to regulatory intervention, forced capital raising, or dividend cuts. Declining PPNR trends may indicate margin compression, rising expenses, or loss of fee income."
    },
    "considerations": [
      "PPNR is a non-GAAP measure with no standardized definition. Different banks may include or exclude different items. Securities gains/losses, fair value adjustments, and one-time items can inflate or depress reported PPNR. \"Core\" or \"adjusted\" PPNR attempts to strip out these items but requires analyst judgment.",
      "The Federal Reserve uses PPNR as a key input in its stress testing models (DFAST and CCAR). The Fed projects PPNR under adverse scenarios and then layers on estimated credit losses to determine whether the bank can maintain minimum capital ratios under stress. Strong projected PPNR reduces the stressed capital impact.",
      "PPNR captures both the revenue side (NIM and fee income) and the expense side (operating efficiency). A bank can have strong gross revenue but weak PPNR due to high expenses, or moderate revenue but strong PPNR due to excellent cost control. The efficiency ratio is a useful companion metric for understanding the expense side.",
      "PPNR does not include investment securities gains or losses, which can be meaningful for banks with large securities portfolios. During periods of rising rates, banks may realize securities losses that are not captured in PPNR but nonetheless affect reported earnings and capital."
    ],
    "relatedMetrics": [
      "net-interest-margin",
      "efficiency-ratio",
      "roaa",
      "roe",
      "provision-to-average-loans",
      "non-interest-income-to-revenue"
    ],
    "relatedMetricDescriptions": {
      "net-interest-margin": "NIM is the primary driver of the net interest income component of PPNR, typically accounting for 60% to 80% of total bank revenue.",
      "efficiency-ratio": "The efficiency ratio measures non-interest expense relative to total revenue; a lower efficiency ratio directly translates to higher PPNR for a given revenue level.",
      "roaa": "ROAA = (PPNR - Provision - Taxes) / Average Assets, making PPNR the starting point for bottom-line profitability.",
      "roe": "PPNR drives net income, which drives ROE. Banks with strong PPNR can maintain acceptable ROE even during periods of elevated credit costs.",
      "provision-to-average-loans": "The provision is the credit cost that PPNR must absorb; the relationship between PPNR and provision determines whether the bank remains profitable.",
      "non-interest-income-to-revenue": "Fee income diversification strengthens PPNR by reducing dependence on net interest income alone."
    },
    "isEducationalOnly": true,
    "whereToFindData": "PPNR is not a standard GAAP line item but can be calculated from the income statement by adding net interest income and non-interest income, then subtracting non-interest expense. Most banks disclose PPNR or an equivalent measure in their quarterly earnings releases and investor presentations. The FFIEC UBPR reports pre-provision net operating revenue. Federal Reserve stress test results include projected PPNR under various scenarios.",
    "bankSpecificContext": "PPNR is arguably the most important measure of a bank's fundamental operating strength because it represents the earnings buffer available to absorb credit losses before capital is consumed. During the 2008-2010 financial crisis, banks with strong PPNR were able to absorb massive credit losses while remaining solvent, while banks with weak PPNR required government capital injections or failed. The Federal Reserve's focus on PPNR in stress testing reflects this reality: PPNR is the first and most sustainable line of defense against credit losses. Capital is a finite buffer; PPNR is a renewable one.",
    "metricConnections": "PPNR = (NIM x Earning Assets) + Non-Interest Income - Non-Interest Expense. This decomposition shows the three levers of PPNR: spread income (driven by NIM and the size of the earning asset base), fee income, and expense control. PPNR connects to the efficiency ratio: Efficiency Ratio = Non-Interest Expense / (Net Interest Income + Non-Interest Income) = Non-Interest Expense / (PPNR + Non-Interest Expense). Net Income = PPNR - Provision - Taxes, linking PPNR to all profitability ratios. In stress testing, PPNR absorbs provision expense; the remainder (after taxes) adds to capital through retained earnings.",
    "commonPitfalls": "Focusing on PPNR growth without examining its composition can be misleading. PPNR growth driven by expanding NIM is generally more sustainable than growth from one-time fee income or securities gains. Additionally, banks can temporarily boost PPNR by cutting expenses in ways that harm long-term franchise value (reducing technology investment, cutting branch staff, deferring maintenance). Evaluating expense trends alongside PPNR ensures the earnings power is sustainable. Comparing PPNR in dollar terms across banks of different sizes is not meaningful; use PPNR-to-average-assets for comparisons.",
    "acrossBankTypes": "Money center banks often achieve higher PPNR-to-assets ratios (2.0% to 3.5%) because of diversified fee income streams from investment banking, trading, wealth management, and treasury services. Community banks typically achieve lower PPNR-to-assets (1.5% to 2.5%) because they rely more heavily on net interest income and have limited fee income sources. Regional banks fall in between. Banks with significant capital markets or wealth management businesses tend to show more volatile PPNR because these fee income streams fluctuate with market conditions.",
    "whatDrivesMetric": "PPNR is driven by three primary factors. First, net interest income, which depends on the size and composition of earning assets, the NIM spread, and interest rate conditions. Second, non-interest income, which depends on the bank's fee-generating businesses, transaction volumes, and capital markets activity. Third, non-interest expense, which reflects the cost structure of the franchise including compensation, technology, and occupancy. Revenue-side growth (expanding NIM, growing fee income) and expense discipline (maintaining or improving the efficiency ratio) both contribute to PPNR improvement.",
    "faqTeasers": [
      {
        "question": "What is pre-provision net revenue (PPNR) and why do analysts use it?",
        "teaser": "PPNR measures a bank's core earnings before credit losses and taxes, revealing the earnings buffer available to absorb loan losses during downturns.",
        "faqSlug": "what-is-ppnr",
        "faqCluster": "profitability"
      },
      {
        "question": "How do I compare profitability across banks of different sizes?",
        "teaser": "PPNR-to-average-assets normalizes earnings power for bank size, while ROAA and efficiency ratio provide additional size-adjusted profitability comparisons.",
        "faqSlug": "comparing-profitability-different-size-banks",
        "faqCluster": "profitability"
      }
    ],
    "relatedValuations": [
      "discounted-earnings-model",
      "peer-comparison"
    ]
  },
  {
    "slug": "net-overhead-ratio",
    "name": "Net Overhead Ratio",
    "category": "efficiency",
    "categoryLabel": "Efficiency & Funding Ratio",
    "formula": "Net Overhead Ratio = (Non-Interest Expense - Non-Interest Income) / Average Assets",
    "isPercentage": true,
    "shortDescription": "Measures the net cost of non-lending operations as a percentage of average assets, indicating the burden that fee-generating and overhead activities place on the bank",
    "description": "The Net Overhead Ratio subtracts non-interest income from non-interest expense and divides the result by average total assets. The numerator represents the net cost of all activities outside of lending and investing; in other words, the portion of operating expenses not covered by fee income. A lower ratio indicates that the bank's non-interest income more fully offsets its operating costs, leaving more of the net interest income available to cover provisions, taxes, and net income.",
    "formulaExplanation": "The numerator is non-interest expense (salaries, occupancy, technology, professional fees, FDIC insurance, and all other operating costs) minus non-interest income (service charges, wealth management fees, mortgage banking income, card fees, trading revenue, and other non-lending revenue). If non-interest income exceeds non-interest expense, the net overhead ratio is negative, indicating that fee income more than covers operating costs. The denominator is average total assets for the period.",
    "interpretation": "A lower net overhead ratio is better. It means the bank's non-interest activities contribute more (or burden less) relative to the asset base. A ratio near zero indicates that fee income nearly covers all operating costs, allowing virtually all net interest income to flow toward provisions and profits. Most traditional banks have positive net overhead ratios, meaning some portion of net interest income is consumed by operating costs not covered by fees.",
    "typicalRange": "Most US commercial banks have net overhead ratios between 1.0% and 2.5% of average assets. Banks with strong fee income businesses (wealth management, capital markets, payment processing) tend to have lower net overhead ratios because their non-interest income covers a larger share of expenses. Banks that rely almost exclusively on net interest income tend to have higher net overhead ratios. A very small number of fee-heavy financial institutions may achieve negative net overhead ratios.",
    "goodBad": {
      "good": "Net overhead ratios below 1.5% indicate that fee income meaningfully offsets operating costs. Ratios approaching zero indicate that the bank's non-interest activities are nearly self-funding, leaving essentially all net interest income available for provisions and profit. Declining net overhead ratios over time indicate improving revenue diversification or expense control.",
      "bad": "Net overhead ratios above 2.5% indicate that operating costs substantially exceed fee income, placing a heavy burden on net interest income. Banks with high net overhead ratios are more vulnerable to NIM compression because their net interest income must cover both the overhead gap and credit costs before any profit remains."
    },
    "considerations": [
      "The net overhead ratio complements the efficiency ratio by incorporating asset size. The efficiency ratio measures expenses relative to revenue; the net overhead ratio measures the net expense burden relative to assets. Two banks with identical efficiency ratios can have different net overhead ratios if their asset intensity differs.",
      "Non-interest income quality matters. A bank may have a low net overhead ratio because of volatile trading gains or one-time items rather than sustainable fee income. Evaluating the composition and stability of non-interest income provides context for whether the net overhead ratio is sustainable.",
      "Banks can reduce the net overhead ratio by either cutting expenses or growing fee income. Expense reduction may be achieved through branch consolidation, technology investment, or operational efficiency gains. Fee income growth may come from expanding wealth management, card programs, or treasury services.",
      "The ratio uses average assets in the denominator, which can mask changes in balance sheet size. A bank that is rapidly growing assets may show a declining net overhead ratio simply because the denominator is growing faster than the numerator, even without actual efficiency improvement."
    ],
    "relatedMetrics": [
      "efficiency-ratio",
      "non-interest-income-to-revenue",
      "roaa",
      "pre-provision-net-revenue",
      "net-interest-margin"
    ],
    "relatedMetricDescriptions": {
      "efficiency-ratio": "The efficiency ratio measures expenses relative to revenue, while the net overhead ratio measures the net expense gap relative to assets, providing complementary efficiency perspectives.",
      "non-interest-income-to-revenue": "Fee income diversification directly reduces the net overhead ratio by covering more of the expense base with non-interest revenue.",
      "roaa": "The net overhead ratio is a key component of ROAA: ROAA = NIM - Net Overhead Ratio - Net Credit Costs - Taxes (approximately).",
      "pre-provision-net-revenue": "PPNR captures both the net interest income and net overhead components; a lower net overhead ratio translates directly to higher PPNR for a given NIM.",
      "net-interest-margin": "NIM must exceed the net overhead ratio plus credit costs for the bank to generate positive returns on assets."
    },
    "isEducationalOnly": true,
    "whereToFindData": "The net overhead ratio can be calculated from income statement data in 10-Q/10-K filings or Call Reports. Non-interest expense and non-interest income are standard income statement line items. Average total assets is typically disclosed or can be calculated from quarterly balance sheet data. The FFIEC UBPR reports a net non-interest expense to average assets ratio that is equivalent to the net overhead ratio.",
    "bankSpecificContext": "The net overhead ratio highlights a fundamental tension in banking: non-interest activities (wealth management, payments, trading) generate fee income but also require significant expense infrastructure (specialized staff, technology platforms, compliance). The net overhead ratio measures whether these activities are net contributors or net drains on the bank's earnings. Banks with low net overhead ratios have effectively built fee businesses that offset a large share of their total expense base, making them less dependent on NIM for profitability.",
    "metricConnections": "The net overhead ratio connects to ROAA through a simplified decomposition: ROAA is approximately equal to NIM minus the net overhead ratio minus the provision-to-assets ratio minus the tax rate effect. This decomposition shows that a bank's profitability on assets depends on the spread it earns (NIM), the overhead burden (net overhead ratio), and the credit cost (provision). PPNR = NIM x Earning Assets + Non-Interest Income - Non-Interest Expense can also be expressed as: PPNR / Assets = NIM x (Earning Assets / Assets) - Net Overhead Ratio.",
    "commonPitfalls": "Treating a low net overhead ratio as inherently superior ignores the risk profile of the fee income generating it. Trading revenue, for example, can create negative net overhead in one quarter and significantly positive net overhead the next. Sustainable fee income from wealth management or card processing is more valuable than volatile trading gains, even if both produce the same net overhead ratio in a given period. Additionally, comparing net overhead ratios across banks with fundamentally different business models (investment banking-heavy vs. pure lending) has limited analytical value.",
    "acrossBankTypes": "Community banks focused exclusively on traditional lending typically have net overhead ratios of 2.0% to 3.0% because they have limited fee income to offset expenses. Regional banks with developed treasury management, wealth, and mortgage banking businesses often achieve 1.5% to 2.0%. Large diversified banks and money center institutions with extensive capital markets and payment businesses may achieve net overhead ratios below 1.0%. Pure-play trust companies or fee-focused institutions may have negative net overhead ratios.",
    "whatDrivesMetric": "The net overhead ratio is driven by three factors: the level of non-interest expense (primarily compensation, technology, and occupancy), the level of non-interest income (driven by fee business scale and market conditions), and average asset size (the denominator). Expense control through operational efficiency, technology automation, and branch optimization reduces the numerator. Growing fee income through product development, customer acquisition, and market expansion also reduces the numerator. Asset growth increases the denominator, improving the ratio if the net overhead amount does not grow proportionally.",
    "faqTeasers": [
      {
        "question": "What drives a bank's efficiency ratio higher or lower?",
        "teaser": "The efficiency ratio is driven by both expense levels and revenue generation. The net overhead ratio provides a complementary view by measuring the gap between expenses and fee income relative to assets.",
        "faqSlug": "what-drives-efficiency-ratio",
        "faqCluster": "efficiency"
      },
      {
        "question": "How do I compare profitability across banks of different sizes?",
        "teaser": "Asset-normalized ratios like the net overhead ratio, ROAA, and efficiency ratio enable meaningful cross-bank comparisons regardless of asset size.",
        "faqSlug": "comparing-profitability-different-size-banks",
        "faqCluster": "profitability"
      }
    ],
    "relatedValuations": [
      "peer-comparison",
      "dupont-decomposition"
    ]
  },
  {
    "slug": "price-to-tangible-book-value",
    "name": "Price to Tangible Book Value (P/TBV)",
    "category": "valuation",
    "categoryLabel": "Valuation Metric",
    "formula": "P/TBV = Market Price Per Share / Tangible Book Value Per Share",
    "isPercentage": false,
    "shortDescription": "Measures the market price relative to tangible book value per share, providing a more conservative valuation metric than P/B for banks with significant goodwill from acquisitions",
    "description": "Price to Tangible Book Value divides the current market price per share by tangible book value per share (TBVPS). TBVPS equals total shareholders' equity minus preferred stock minus goodwill minus other intangible assets, divided by diluted shares outstanding. P/TBV is a more conservative valuation metric than P/B because it excludes intangible assets that may have limited value in a stress scenario, providing a clearer view of what an investor is paying relative to the hard net asset value of the bank.",
    "formulaExplanation": "The numerator is the current market price per share. The denominator is tangible book value per share, calculated as (total common equity - goodwill - other intangible assets) / diluted shares outstanding. Some analysts also deduct preferred stock from equity before the intangible adjustments. The result is expressed as a multiple (e.g., 1.5x means the market price is 1.5 times tangible book value per share).",
    "interpretation": "A P/TBV of 1.0x means the market values the bank at exactly its tangible net asset value. P/TBV above 1.0x indicates the market believes the bank's earnings power, franchise value, or growth prospects justify a premium over tangible assets. P/TBV below 1.0x suggests the market is discounting the tangible assets, typically because of concerns about asset quality, earnings weakness, or management quality. P/TBV is always equal to or higher than P/B for the same bank (since tangible book is lower than total book), meaning a bank trading at 1.0x P/B may be trading at 1.2x or more P/TBV.",
    "typicalRange": "US bank P/TBV ratios during normal conditions typically range from 1.0x to 3.0x. High-performing banks with strong ROTCE and growth prospects trade at 1.8x to 3.0x tangible book. Average performers trade around 1.2x to 1.8x. Banks with significant asset quality concerns, weak profitability, or uncertain outlooks may trade below 1.0x tangible book. P/TBV multiples tend to be higher than P/B multiples by the same percentage that book value exceeds tangible book value.",
    "goodBad": {
      "good": "P/TBV above 1.5x generally indicates the market views the bank positively, reflecting strong ROTCE, stable earnings, and growth potential. P/TBV between 2.0x and 3.0x is reserved for best-in-class banks with exceptional profitability and franchise value.",
      "bad": "P/TBV below 1.0x indicates the market is valuing the bank below its tangible net asset value, implying expected future losses, earnings below cost of equity, or other franchise impairments. Persistently low P/TBV may attract activist investors or acquisition interest."
    },
    "considerations": [
      "P/TBV is most useful for banks that have grown through acquisitions and carry significant goodwill. For banks with no goodwill (organic growers, mutual-to-stock conversions), P/TBV equals P/B and provides no additional information.",
      "The justified P/TBV multiple depends on ROTCE, the cost of equity, and the expected growth rate, analogous to the ROE-P/B framework: Justified P/TBV = (ROTCE - g) / (r - g). This connects tangible profitability directly to tangible valuation.",
      "AOCI can cause tangible book value to fluctuate, particularly during periods of interest rate volatility. Rising rates reduce the market value of available-for-sale securities, reducing AOCI and therefore TBVPS, which can make P/TBV appear higher even if the stock price has not changed.",
      "When evaluating acquisition premiums, acquirers typically look at the price relative to the target's tangible book value. M&A premiums in banking are frequently expressed as a multiple of tangible book, making P/TBV the standard valuation language for bank M&A."
    ],
    "relatedMetrics": [
      "price-to-book",
      "tangible-book-value-per-share",
      "return-on-tangible-common-equity",
      "tangible-common-equity-ratio",
      "book-value-per-share",
      "price-to-earnings"
    ],
    "relatedMetricDescriptions": {
      "price-to-book": "P/B uses total book value (including goodwill) in the denominator; the spread between P/B and P/TBV reflects the market's implicit valuation of goodwill and intangibles.",
      "tangible-book-value-per-share": "TBVPS is the denominator of P/TBV, expressing the tangible net asset value on a per-share basis.",
      "return-on-tangible-common-equity": "ROTCE is the profitability metric that drives justified P/TBV, analogous to how ROE drives justified P/B.",
      "tangible-common-equity-ratio": "TCE Ratio measures the tangible capital base in aggregate, while P/TBV prices that tangible capital base per share in the market.",
      "book-value-per-share": "BVPS includes goodwill and intangibles; the difference between BVPS and TBVPS represents the per-share intangible asset burden.",
      "price-to-earnings": "P/E captures the market's view of earnings power; P/TBV captures the market's view of tangible asset value. P/TBV = P/E x ROTCE."
    },
    "isEducationalOnly": true,
    "whereToFindData": "Market price per share is available from any financial data provider. Tangible book value per share can be calculated from 10-K/10-Q data or is often disclosed in quarterly earnings releases as a non-GAAP measure. Many financial data providers calculate and publish P/TBV for banks. For manual calculation, subtract goodwill and intangible assets from total common equity, then divide by diluted shares outstanding to get TBVPS.",
    "bankSpecificContext": "P/TBV has become the standard valuation metric for bank M&A and is increasingly preferred by analysts over P/B for banks with significant acquisition histories. The metric gained prominence as bank consolidation accelerated in the 1990s and 2000s, creating banks with substantial goodwill balances. P/TBV provides a cleaner measure of what an investor is paying per dollar of hard asset value, uncontaminated by accounting entries from past deals. For bank investors evaluating potential acquisitions, the P/TBV multiple of the acquirer relative to the target is a key factor in assessing whether a deal is dilutive or accretive to tangible book value.",
    "metricConnections": "P/TBV = P/E x ROTCE, mirroring the P/B = P/E x ROE identity for tangible metrics. Justified P/TBV = (ROTCE - g) / (r - g), where r is the cost of equity and g is the sustainable growth rate. This means that P/TBV is fundamentally driven by the bank's return on tangible equity relative to its cost of equity. A bank earning ROTCE above its cost of equity should trade above 1.0x P/TBV; one earning below its cost of equity should trade below 1.0x. The P/TBV to ROTCE relationship can be plotted across a peer group to identify banks that appear cheap or expensive relative to their tangible profitability.",
    "commonPitfalls": "Using P/TBV for banks with no goodwill adds no information beyond P/B and may confuse the analysis. Additionally, low P/TBV is not automatically a value opportunity; a bank trading at 0.7x P/TBV may have severe asset quality problems, insufficient reserves, or management issues that justify the discount. The justified P/TBV framework requires estimating ROTCE going forward, not just observing historical ROTCE. A bank with trailing 15% ROTCE but deteriorating fundamentals may not deserve a premium P/TBV multiple.",
    "acrossBankTypes": "P/TBV differences from P/B are most meaningful for serial acquirers and large regional banks that have consolidated extensively. Money center banks carry significant goodwill from decades of acquisitions; for example, a bank with $50 billion in goodwill on a $200 billion equity base would show P/TBV approximately 33% higher than P/B. Community banks that have grown organically show minimal P/TBV to P/B differences. Banks resulting from recent mutual-to-stock conversions often trade near tangible book value with no goodwill adjustment needed.",
    "whatDrivesMetric": "P/TBV is driven by market price movements (reflecting investor sentiment, earnings expectations, and macro conditions) and changes in TBVPS (driven by retained earnings, AOCI movements, buybacks, goodwill impairment, and intangible amortization). TBVPS tends to grow over time through retained earnings, which gradually increases tangible book value. Share buybacks at prices above TBVPS reduce TBVPS (dilutive to tangible book) while buybacks below TBVPS increase it (accretive). AOCI fluctuations from securities portfolio mark-to-market can create short-term TBVPS volatility.",
    "faqTeasers": [
      {
        "question": "What is the difference between price-to-book and price-to-tangible-book value?",
        "teaser": "P/B uses total book value (including goodwill), while P/TBV strips out intangible assets. For banks with significant acquisition goodwill, P/TBV provides a more conservative valuation view.",
        "faqSlug": "pb-vs-ptbv",
        "faqCluster": "valuation"
      },
      {
        "question": "When should I use P/TBV instead of P/B to value a bank?",
        "teaser": "P/TBV is preferred when the bank carries significant goodwill from acquisitions, when evaluating M&A premiums, or when comparing banks with very different acquisition histories.",
        "faqSlug": "when-to-use-ptbv",
        "faqCluster": "valuation"
      },
      {
        "question": "How do I calculate Price to Tangible Book Value?",
        "teaser": "Divide the current share price by tangible book value per share. TBVPS equals total common equity minus goodwill and intangibles, divided by shares outstanding.",
        "faqSlug": "how-to-calculate-price-to-tangible-book",
        "faqCluster": "valuation"
      }
    ],
    "relatedValuations": [
      "price-to-tangible-book-valuation",
      "peer-comparison",
      "roe-pb-framework"
    ]
  },
  {
    "slug": "tangible-book-value-per-share",
    "name": "Tangible Book Value Per Share (TBVPS)",
    "category": "valuation",
    "categoryLabel": "Valuation Metric",
    "formula": "TBVPS = (Total Equity - Preferred Stock - Goodwill - Other Intangible Assets) / Shares Outstanding",
    "isPercentage": false,
    "shortDescription": "Measures the per-share tangible net asset value of a bank, excluding goodwill and other intangible assets from equity before dividing by shares outstanding",
    "description": "Tangible Book Value Per Share represents the tangible common equity of a bank divided by its diluted shares outstanding. It strips out goodwill and other intangible assets from the standard book value per share calculation, providing a per-share measure of the hard capital backing each share. TBVPS growth over time is a key indicator of value creation because it reflects the accumulation of tangible capital through retained earnings, buybacks, and other capital actions, uncontaminated by acquisition accounting.",
    "formulaExplanation": "The calculation starts with total shareholders' equity, subtracts preferred stock (to arrive at common equity), then subtracts goodwill and other intangible assets (such as core deposit intangibles, customer relationship intangibles, and trade names). The result, tangible common equity, is divided by diluted shares outstanding. Some analysts deduct mortgage servicing rights while others retain them; the methodology should be consistent when comparing across banks or time periods.",
    "interpretation": "TBVPS represents the tangible net asset value backing each share of common stock. If a bank were liquidated and all tangible assets converted to cash at their carrying values, TBVPS approximates the per-share proceeds available to common shareholders after settling all liabilities (excluding the recovery of any value from goodwill or intangibles). Growth in TBVPS over time is a core measure of value creation for bank shareholders, often tracked by analysts alongside EPS growth.",
    "typicalRange": "TBVPS varies enormously by bank and bears no direct comparison across institutions. What matters is the growth rate and the relationship to the market price. TBVPS growth rates of 5% to 10% annually are typical of well-managed banks during normal conditions. The difference between BVPS and TBVPS reveals the per-share intangible asset burden; for banks with no goodwill, the two figures are identical.",
    "goodBad": {
      "good": "Consistent TBVPS growth of 7% or more annually indicates strong tangible value creation through retained earnings and disciplined capital management. TBVPS growing faster than BVPS suggests intangible assets are being amortized (improving the tangible base) or the bank is avoiding goodwill-creating acquisitions.",
      "bad": "Declining TBVPS over time indicates value destruction through operating losses, excessive dividends/buybacks relative to earnings, large AOCI losses, or goodwill-creating acquisitions at excessive premiums. Stagnant TBVPS suggests the bank is returning essentially all earnings to shareholders (through dividends and buybacks) with no tangible value accumulation."
    },
    "considerations": [
      "TBVPS is affected by AOCI, which includes unrealized gains and losses on available-for-sale securities. During periods of rising interest rates, unrealized securities losses reduce AOCI and therefore TBVPS, even though the losses are not realized. This can create TBVPS volatility unrelated to the bank's operating performance.",
      "Share buybacks affect TBVPS differently depending on the buyback price relative to current TBVPS. Buybacks at prices above TBVPS reduce TBVPS per share (dilutive to tangible book). Buybacks at prices below TBVPS increase it (accretive). This dynamic makes buyback strategy an important consideration for TBVPS-focused investors.",
      "Acquisitions create goodwill (reducing TBVPS) if the purchase price exceeds the target's tangible net asset value. A bank that grows through acquisitions may show strong EPS growth but flat or declining TBVPS if it consistently pays premiums to tangible book. Organic growth preserves TBVPS more effectively.",
      "TBVPS methodology varies across banks. Some deduct all intangibles including mortgage servicing rights; others retain MSRs. Some adjust for preferred stock and AOCI differently. Reconciling TBVPS across banks requires checking each institution's non-GAAP reconciliation."
    ],
    "relatedMetrics": [
      "book-value-per-share",
      "price-to-tangible-book-value",
      "tangible-common-equity-ratio",
      "return-on-tangible-common-equity",
      "price-to-book",
      "earnings-per-share"
    ],
    "relatedMetricDescriptions": {
      "book-value-per-share": "BVPS includes goodwill and intangibles; the difference between BVPS and TBVPS equals per-share intangible assets.",
      "price-to-tangible-book-value": "P/TBV uses TBVPS as its denominator, directly connecting tangible net asset value to market valuation.",
      "tangible-common-equity-ratio": "TCE Ratio expresses the same tangible equity concept as a percentage of tangible assets rather than on a per-share basis.",
      "return-on-tangible-common-equity": "ROTCE measures the return generated on the tangible equity that underlies TBVPS, connecting tangible profitability to tangible value.",
      "price-to-book": "P/B uses BVPS as its denominator; for banks with significant goodwill, P/TBV (using TBVPS) is a more conservative valuation metric.",
      "earnings-per-share": "EPS drives TBVPS growth through retained earnings. TBVPS Growth = EPS x Retention Ratio / Beginning TBVPS (approximately)."
    },
    "isEducationalOnly": true,
    "whereToFindData": "TBVPS is disclosed by most banks in their quarterly earnings releases as a non-GAAP financial measure, with a reconciliation to GAAP book value per share. It can also be calculated from 10-K/10-Q data by subtracting goodwill and intangible assets from total common equity and dividing by diluted shares outstanding. Financial data providers typically calculate and publish TBVPS for banks.",
    "bankSpecificContext": "TBVPS growth is one of the most important long-term performance metrics for bank shareholders. While EPS and ROE capture profitability, TBVPS captures tangible value accumulation per share over time. Investors in bank stocks, particularly value investors, track TBVPS growth as a measure of management's ability to grow the tangible net asset base. Warren Buffett has noted that growth in tangible book value per share is one of the best measures of long-term value creation for bank shareholders. In bank M&A, the price paid relative to the target's TBVPS is a primary valuation benchmark, making TBVPS growth directly relevant to franchise value.",
    "metricConnections": "TBVPS = TCE / Shares Outstanding. TBVPS Growth Rate = ROTCE x Retention Ratio (approximately, assuming stable share count). This connects tangible profitability to tangible value creation. P/TBV = Market Price / TBVPS. TBVPS = BVPS - (Goodwill + Intangibles) / Shares Outstanding. The gap between BVPS and TBVPS narrows over time as intangible assets are amortized (excluding goodwill, which is not amortized but tested for impairment).",
    "commonPitfalls": "Comparing TBVPS across banks is not meaningful because each bank has a different number of shares outstanding and a different capital base. What matters is the growth rate, the relationship to market price (P/TBV), and the trend over time. Additionally, TBVPS can decline for reasons that are actually positive, such as share buybacks above tangible book (which reduce share count but also reduce TBVPS if done above the current level) or special dividends that return excess capital to shareholders.",
    "acrossBankTypes": "Banks that have grown through acquisitions typically show a significant gap between BVPS and TBVPS, sometimes 20% to 40% or more. Community banks that have grown organically or were formed through mutual-to-stock conversions often have TBVPS very close to BVPS. Money center banks carry substantial absolute goodwill amounts but their large equity bases can moderate the per-share impact. Mid-size regional banks formed through roll-up acquisition strategies may show the largest percentage gaps between BVPS and TBVPS.",
    "whatDrivesMetric": "TBVPS is driven by retained earnings (net income minus dividends, which increases tangible equity), share buybacks (which reduce share count, increasing TBVPS if done at prices below tangible book and decreasing it if done above), AOCI movements (unrealized securities gains/losses), intangible asset amortization (which gradually reduces the deduction from book value), goodwill impairment (which reduces both book value and tangible book value but improves the BVPS-to-TBVPS gap), and acquisitions (which may create goodwill that reduces TBVPS).",
    "faqTeasers": [
      {
        "question": "What is tangible book value and why is it different from book value?",
        "teaser": "Tangible book value strips out goodwill and intangible assets from total equity, showing the hard capital available to absorb losses rather than book value inflated by past acquisition premiums.",
        "faqSlug": "tangible-book-value-vs-book-value",
        "faqCluster": "capital-and-risk"
      },
      {
        "question": "How do I calculate Tangible Book Value Per Share?",
        "teaser": "Subtract goodwill and other intangible assets from total common equity, then divide by diluted shares outstanding.",
        "faqSlug": "how-to-calculate-tbvps",
        "faqCluster": "valuation"
      }
    ],
    "relatedValuations": [
      "price-to-tangible-book-valuation",
      "graham-number",
      "margin-of-safety"
    ]
  },
  {
    "slug": "cost-of-funds",
    "name": "Cost of Funds",
    "category": "efficiency",
    "categoryLabel": "Efficiency & Funding Ratio",
    "formula": "Cost of Funds = Total Interest Expense / Average Interest-Bearing Liabilities",
    "isPercentage": true,
    "shortDescription": "Measures a bank's average cost of all interest-bearing funding sources including deposits, borrowings, and subordinated debt",
    "description": "Cost of Funds divides total interest expense by average interest-bearing liabilities. It measures the blended rate a bank pays across all sources of interest-bearing funding, including interest-bearing deposits (savings, money market, time deposits), borrowed funds (FHLB advances, repo agreements, federal funds purchased), and subordinated debt. Cost of Funds is a critical input to net interest margin because it represents the expense side of the NIM equation.",
    "formulaExplanation": "The numerator is total interest expense from the income statement, including interest paid on deposits, borrowings, subordinated debt, and any other interest-bearing liabilities. The denominator is average interest-bearing liabilities for the period. Note that non-interest-bearing deposits are excluded from the denominator because they carry no explicit interest cost. This means Cost of Funds measures the rate paid only on liabilities that carry an interest obligation. Some analysts use total liabilities (including non-interest-bearing deposits) in the denominator to calculate a \"total cost of funding\" that captures the benefit of free funding.",
    "interpretation": "A lower Cost of Funds indicates cheaper funding, which supports wider net interest margins and higher profitability. A bank with a Cost of Funds of 2.5% and loan yields of 6.0% earns a gross spread of 3.5% on its interest-bearing funded assets. Cost of Funds is influenced by the interest rate environment, the bank's deposit mix, its reliance on wholesale funding, and competitive conditions in its deposit markets.",
    "typicalRange": "Cost of Funds varies significantly with the interest rate environment. During low-rate environments, bank Cost of Funds can fall below 0.50%. During higher-rate environments, Cost of Funds may rise to 2.0% to 4.0% or more. The relationship between the federal funds rate and bank Cost of Funds is positive but not one-to-one; banks with strong core deposit franchises experience less pass-through of rate increases to their funding costs.",
    "goodBad": {
      "good": "Cost of Funds below the peer median indicates a funding advantage. Banks with a high proportion of non-interest-bearing deposits, stable core deposit relationships, and limited wholesale funding dependence tend to achieve lower Cost of Funds. A low Cost of Funds relative to peers provides a structural NIM advantage.",
      "bad": "Cost of Funds above the peer median indicates expensive funding. Banks that rely heavily on rate-sensitive CDs, brokered deposits, or wholesale borrowings tend to have higher Cost of Funds. A high and rising Cost of Funds can compress NIM even when loan yields are also rising, if funding costs increase faster."
    },
    "considerations": [
      "Cost of Funds excludes non-interest-bearing deposits from the denominator. To capture the full benefit of free funding, some analysts calculate \"total cost of deposits\" (interest expense on deposits divided by total deposits, including non-interest-bearing). This lower figure reflects the blended cost of the entire deposit franchise.",
      "The deposit beta (the percentage of a rate increase that is passed through to deposit rates) varies by deposit type and competitive environment. Non-interest-bearing deposits have zero beta, savings accounts have low beta, and CDs have high beta. A bank's deposit mix determines its aggregate beta and sensitivity of Cost of Funds to rate changes.",
      "Wholesale funding (FHLB advances, brokered deposits, repo) typically carries a higher cost than core deposits but provides flexibility for asset growth. A bank with rising Cost of Funds should be evaluated for whether the increase reflects rate environment changes (industry-wide) or a shift toward more expensive funding sources (bank-specific).",
      "Cost of Funds should be evaluated alongside asset yields. A bank may accept higher Cost of Funds if it is earning proportionally higher yields on its assets. The spread (asset yield minus Cost of Funds) is more important than Cost of Funds in isolation."
    ],
    "relatedMetrics": [
      "cost-of-deposits",
      "net-interest-margin",
      "deposits-to-assets",
      "loans-to-deposits",
      "interest-income-to-earning-assets",
      "roaa"
    ],
    "relatedMetricDescriptions": {
      "cost-of-deposits": "Cost of Deposits focuses specifically on the deposit portion of funding, while Cost of Funds includes all interest-bearing liabilities.",
      "net-interest-margin": "NIM is the net result of asset yields minus funding costs; Cost of Funds directly determines the expense side of NIM.",
      "deposits-to-assets": "A higher deposits-to-assets ratio generally indicates more stable, potentially lower-cost funding compared to wholesale alternatives.",
      "loans-to-deposits": "Banks with high loans-to-deposits ratios may need to supplement deposits with more expensive wholesale funding, raising Cost of Funds.",
      "interest-income-to-earning-assets": "Interest income yield minus Cost of Funds approximates the net interest spread, which is a close relative of NIM.",
      "roaa": "Lower Cost of Funds supports wider NIM, which directly contributes to higher ROAA."
    },
    "isEducationalOnly": true,
    "whereToFindData": "Total interest expense is reported on the income statement in 10-Q/10-K filings and Call Reports (FFIEC 031/041). Average interest-bearing liabilities can be found in the average balance sheet tables that most banks include in their quarterly earnings releases and 10-K filings. The FFIEC UBPR reports cost of funds with peer group comparisons. The FDIC Quarterly Banking Profile reports aggregate funding cost data for the industry.",
    "bankSpecificContext": "A bank's Cost of Funds reflects the quality of its deposit franchise, which is one of the most durable competitive advantages in banking. Banks with deep customer relationships, extensive branch networks in attractive markets, and high proportions of non-interest-bearing and low-rate deposits enjoy a structural cost-of-funds advantage that directly supports profitability. This advantage is sometimes called a \"deposit franchise value\" or \"core deposit premium\" and is a key factor in bank valuations and M&A pricing. During rising rate environments, banks with low-cost, sticky deposit bases outperform those reliant on rate-sensitive funding.",
    "metricConnections": "Cost of Funds is one half of the NIM equation. NIM is approximately equal to the yield on earning assets minus the cost of interest-bearing liabilities, adjusted for the mix of free funding (non-interest-bearing deposits and equity). Cost of Funds = Total Interest Expense / Average Interest-Bearing Liabilities, while NIM = Net Interest Income / Average Earning Assets. The net interest spread (asset yield minus Cost of Funds) plus the benefit of free funding equals NIM. Cost of Funds also connects to the efficiency ratio indirectly: banks with higher funding costs need more revenue to achieve the same efficiency level.",
    "commonPitfalls": "Comparing Cost of Funds across banks without accounting for the proportion of non-interest-bearing deposits is misleading. A bank with 40% non-interest-bearing deposits and 3.0% Cost of Funds on interest-bearing liabilities has a much lower total cost of funding than a bank with 10% non-interest-bearing deposits and the same 3.0% Cost of Funds. The \"total cost of funding\" (including free deposits in the denominator) provides a more complete comparison. Additionally, short-term fluctuations in Cost of Funds may reflect CD maturity timing rather than fundamental changes in the funding base.",
    "acrossBankTypes": "Community banks in rural or less competitive markets often achieve lower Cost of Funds due to stable, relationship-based deposit franchises with high proportions of non-interest-bearing deposits. Large banks in competitive urban markets may face higher deposit costs due to customer rate sensitivity and competition from money market funds and online banks. Banks that rely on wholesale funding (FHLB advances, brokered deposits) for a significant portion of their balance sheet typically have higher and more volatile Cost of Funds.",
    "whatDrivesMetric": "Cost of Funds is driven by the interest rate environment (federal funds rate, Treasury rates), the bank's deposit mix (non-interest-bearing vs. CDs vs. savings), competitive conditions in the bank's deposit markets, reliance on wholesale funding, and management's deposit pricing strategy. During rising rate cycles, Cost of Funds increases as deposits reprice and wholesale funding costs rise. During falling rate cycles, Cost of Funds declines, though typically with a lag as time deposits mature and reprice.",
    "faqTeasers": [
      {
        "question": "What is cost of funds and how does it differ from cost of deposits?",
        "teaser": "Cost of Funds measures the average rate paid on all interest-bearing liabilities, while Cost of Deposits focuses only on the deposit portion. Both are key drivers of net interest margin.",
        "faqSlug": "cost-of-funds-vs-cost-of-deposits",
        "faqCluster": "efficiency"
      },
      {
        "question": "What causes net interest margin to increase or decrease?",
        "teaser": "NIM is driven by the spread between asset yields and funding costs, making Cost of Funds a direct determinant of margin performance.",
        "faqSlug": "what-causes-nim-to-change",
        "faqCluster": "profitability"
      }
    ],
    "relatedValuations": [
      "peer-comparison",
      "discounted-earnings-model"
    ]
  },
  {
    "slug": "cost-of-deposits",
    "name": "Cost of Deposits",
    "category": "efficiency",
    "categoryLabel": "Efficiency & Funding Ratio",
    "formula": "Cost of Deposits = Interest Expense on Deposits / Average Total Deposits",
    "isPercentage": true,
    "shortDescription": "Measures the average interest rate paid on all deposits, including non-interest-bearing accounts in the denominator to reflect the full benefit of the deposit franchise",
    "description": "Cost of Deposits divides interest expense on deposits by average total deposits, including both interest-bearing and non-interest-bearing deposits in the denominator. By including non-interest-bearing deposits (which cost zero) in the denominator, this metric captures the full blended cost of the bank's deposit franchise, reflecting the benefit of free funding from checking accounts and other no-cost deposits. Cost of Deposits is a key measure of deposit franchise quality and a primary driver of competitive positioning in net interest margin.",
    "formulaExplanation": "The numerator is interest expense on deposits only (excluding interest on borrowings and subordinated debt). This is typically a disclosed line item in bank financial statements or can be found in Call Report Schedule RI. The denominator is average total deposits, including non-interest-bearing demand deposits, NOW accounts, savings, money market deposits, and time deposits (CDs). Including non-interest-bearing deposits in the denominator produces a lower rate than Cost of Funds (which excludes them) and better reflects the total deposit franchise value.",
    "interpretation": "A lower Cost of Deposits indicates a stronger, more valuable deposit franchise. Banks with high proportions of non-interest-bearing deposits pull the blended cost down toward zero, creating a significant competitive advantage. A Cost of Deposits of 1.0% means the bank pays an average of $1 per year for every $100 of total deposits. Trends in Cost of Deposits reveal how quickly the bank's deposit costs are responding to changes in market interest rates.",
    "typicalRange": "Cost of Deposits varies with the rate environment. During near-zero rate environments, industry Cost of Deposits can fall below 0.20%. During higher-rate environments, Cost of Deposits can rise to 1.5% to 3.0% or more. Banks with strong non-interest-bearing deposit bases may maintain Cost of Deposits 50 to 150 basis points below peers. The FDIC Quarterly Banking Profile tracks aggregate Cost of Deposits for the industry.",
    "goodBad": {
      "good": "Cost of Deposits below the peer median indicates a valuable deposit franchise. Banks with low Cost of Deposits benefit from structural NIM advantages that are difficult for competitors to replicate. Cost of Deposits rising more slowly than market rates during tightening cycles indicates strong deposit stickiness.",
      "bad": "Cost of Deposits above the peer median indicates an expensive or rate-sensitive deposit base. Banks that rely on CDs, brokered deposits, or aggressive rate promotions to attract deposits will have higher and more volatile Cost of Deposits. Rapidly rising Cost of Deposits during rate increases may compress NIM."
    },
    "considerations": [
      "There are two common definitions: \"cost of interest-bearing deposits\" (interest on deposits / average interest-bearing deposits) and \"cost of total deposits\" (interest on deposits / average total deposits). This metric uses the total deposits definition to capture the free-funding benefit. When comparing across sources, verify which definition is used.",
      "Non-interest-bearing deposit mix is the single largest driver of Cost of Deposits differences across banks. A bank with 40% non-interest-bearing deposits will have a dramatically lower Cost of Deposits than one with 10%, even if both price their interest-bearing deposits identically.",
      "Deposit betas (the rate at which deposit costs follow market rate changes) differ across deposit products. Online savings accounts have high betas, while relationship-based operating accounts have low betas. The aggregate deposit beta drives how quickly Cost of Deposits responds to Fed rate changes.",
      "Cost of Deposits should be evaluated alongside deposit growth. A bank achieving low Cost of Deposits while maintaining or growing deposit balances demonstrates real franchise strength. Low Cost of Deposits achieved through deposit runoff may indicate pricing is too low and the bank is losing funding."
    ],
    "relatedMetrics": [
      "cost-of-funds",
      "net-interest-margin",
      "deposits-to-assets",
      "loans-to-deposits",
      "roaa",
      "efficiency-ratio"
    ],
    "relatedMetricDescriptions": {
      "cost-of-funds": "Cost of Funds includes all interest-bearing liabilities (deposits plus borrowings), while Cost of Deposits focuses only on the deposit franchise.",
      "net-interest-margin": "Deposit costs are the largest component of total funding costs, making Cost of Deposits a primary driver of NIM.",
      "deposits-to-assets": "Higher deposits-to-assets ratios indicate greater reliance on deposit funding, making Cost of Deposits more influential to overall profitability.",
      "loans-to-deposits": "When loans-to-deposits ratios are low, the bank has excess deposits relative to lending, potentially allowing it to be more selective on deposit pricing.",
      "roaa": "Lower Cost of Deposits supports wider NIM and higher ROAA through lower funding costs.",
      "efficiency-ratio": "Branch networks that generate low-cost deposits are expensive to operate; the efficiency ratio captures whether the cost of maintaining the deposit franchise is justified by the funding benefit."
    },
    "isEducationalOnly": true,
    "whereToFindData": "Interest expense on deposits is reported on the income statement in 10-Q/10-K filings and in Call Reports on Schedule RI. Average total deposits (including non-interest-bearing) can be found in average balance sheet tables in earnings releases and 10-K filings, or calculated from quarterly balance sheet data. The FFIEC UBPR reports cost of total deposits with peer comparisons. The FDIC Quarterly Banking Profile reports aggregate deposit cost data.",
    "bankSpecificContext": "The deposit franchise is the foundation of bank profitability. Deposits are the primary funding source for most banks, and the cost of those deposits is the largest single expense item (via interest expense) driving NIM. Banks with strong deposit franchises, characterized by high proportions of non-interest-bearing deposits and sticky, low-cost relationships, enjoy a durable competitive advantage. This advantage is particularly valuable during rising rate environments when banks with superior deposit franchises see their Cost of Deposits rise more slowly than market rates, allowing NIM expansion while competitors face margin pressure.",
    "metricConnections": "Cost of Deposits feeds directly into NIM. Net Interest Income = Interest Income - Interest Expense, and interest expense on deposits is typically 60% to 80% of total interest expense. NIM = (Yield on Earning Assets - Blended Funding Cost) + Free Funding Benefit. The \"free funding benefit\" comes directly from non-interest-bearing deposits, which reduce Cost of Deposits below Cost of Funds. Cost of Deposits also relates to the efficiency ratio through the branch network: branches are expensive (non-interest expense) but generate low-cost deposits (reducing interest expense). The optimal balance between branch cost and deposit cost benefit is a core strategic question.",
    "commonPitfalls": "Comparing Cost of Deposits across banks without adjusting for the non-interest-bearing deposit mix is the most common error. Two banks with identical rates on interest-bearing products will have very different Cost of Deposits if one has 35% non-interest-bearing deposits and the other has 15%. Additionally, Cost of Deposits can be temporarily depressed by the maturity timing of CDs; if a bank has a large CD book that has not yet repriced to current market rates, the reported Cost of Deposits understates the forward cost once those CDs mature and reprice.",
    "acrossBankTypes": "Community banks with strong local relationships often achieve low Cost of Deposits because their customers maintain operating accounts (which are often non-interest-bearing or low-rate) out of convenience and relationship loyalty. Large banks benefit from scale in payments and transaction processing that generates non-interest-bearing commercial deposits. Online-only banks and neobanks typically have high Cost of Deposits because they attract deposits primarily through rate competition rather than relationship stickiness. Banks in highly competitive urban markets may face higher deposit costs than those in rural or suburban markets with less competition.",
    "whatDrivesMetric": "Cost of Deposits is driven by the interest rate environment, the bank's deposit product mix (non-interest-bearing, savings, money market, CDs), competitive conditions, customer relationship strength, and management's deposit pricing strategy. During rising rate environments, Cost of Deposits increases as banks raise rates to retain and attract deposits. During falling rate environments, Cost of Deposits declines, though typically faster than it rose because banks quickly lower rates on variable-rate accounts while fixed-rate CDs take time to mature.",
    "faqTeasers": [
      {
        "question": "What is cost of funds and how does it differ from cost of deposits?",
        "teaser": "Cost of Funds measures the rate on all interest-bearing liabilities, while Cost of Deposits focuses on the deposit franchise specifically, including the benefit of zero-cost non-interest-bearing deposits.",
        "faqSlug": "cost-of-funds-vs-cost-of-deposits",
        "faqCluster": "efficiency"
      },
      {
        "question": "What does it mean when a bank relies heavily on wholesale funding vs core deposits?",
        "teaser": "Core deposits are stable, relationship-based, and typically low-cost. Wholesale funding is rate-sensitive and more expensive, directly raising Cost of Funds and compressing margins.",
        "faqSlug": "wholesale-funding-vs-core-deposits",
        "faqCluster": "efficiency"
      }
    ],
    "relatedValuations": [
      "peer-comparison"
    ]
  },
  {
    "slug": "non-interest-income-to-revenue",
    "name": "Non-Interest Income to Revenue Ratio",
    "category": "efficiency",
    "categoryLabel": "Efficiency & Funding Ratio",
    "formula": "Non-Interest Income to Revenue = Non-Interest Income / (Net Interest Income + Non-Interest Income)",
    "isPercentage": true,
    "shortDescription": "Measures the share of total revenue generated from fee income and other non-lending sources, indicating the bank's revenue diversification beyond traditional interest income",
    "description": "The Non-Interest Income to Revenue Ratio divides non-interest income by total revenue (defined as net interest income plus non-interest income). Non-interest income includes service charges, wealth management and trust fees, mortgage banking revenue, card interchange fees, trading revenue, insurance commissions, and other fee-based earnings. The ratio indicates how much of the bank's revenue comes from sources other than the traditional lending spread, reflecting the degree of revenue diversification.",
    "formulaExplanation": "The numerator is total non-interest income from the income statement. This typically includes deposit service charges, fiduciary and asset management fees, mortgage banking income, card and payment processing fees, insurance revenue, gains on loan sales, and any other fee-based or non-spread revenue. Securities gains/losses are sometimes included but may be excluded for a \"core\" version of the ratio. The denominator is total revenue, defined as net interest income plus non-interest income. Note that the denominator uses net interest income (after interest expense), not gross interest income.",
    "interpretation": "A higher ratio indicates greater revenue diversification away from traditional spread lending. A ratio of 30% means that 30 cents of every revenue dollar comes from fee-based activities. Greater diversification can provide earnings stability because fee income and interest income respond differently to economic and rate environments. However, the quality and stability of non-interest income matter as much as its quantity.",
    "typicalRange": "For the US banking industry, non-interest income typically represents 25% to 40% of total revenue, based on FDIC aggregate data. Community banks focused on traditional lending often have ratios of 15% to 25%. Regional banks with developed fee businesses achieve 25% to 35%. Money center banks with investment banking, trading, and wealth management operations may achieve 40% to 60% or higher.",
    "goodBad": {
      "good": "Non-interest income ratios above 30% indicate meaningful revenue diversification. Stable fee income from recurring sources (wealth management, card fees, treasury management) provides the most durable diversification benefit. Growing non-interest income ratio over time suggests successful expansion of fee-generating businesses.",
      "bad": "Very low non-interest income ratios (below 15%) indicate heavy dependence on net interest income, making the bank vulnerable to NIM compression during unfavorable rate environments. However, a high ratio driven primarily by volatile sources (trading gains, securities transactions) may overstate diversification because these revenue streams can evaporate during market stress."
    },
    "considerations": [
      "Non-interest income quality varies widely. Recurring fee income from wealth management, card processing, and treasury services is more valuable than episodic income from securities gains, legal settlements, or one-time transactions. Evaluating the composition and stability of non-interest income is essential.",
      "Mortgage banking income can be significant but is highly cyclical, rising during refinancing waves (when rates fall) and declining when rates rise and refinancing activity drops. Banks with large mortgage banking operations may show volatile non-interest income ratios.",
      "Some non-interest income categories (such as deposit service charges and overdraft fees) have faced regulatory pressure and consumer advocacy challenges, potentially reducing their contribution over time. Fee income sustainability should be assessed in light of regulatory trends.",
      "The ratio can decline not because fee income is falling but because net interest income is growing faster during NIM expansion periods. Evaluating the dollar trend in non-interest income alongside the ratio provides a more complete picture."
    ],
    "relatedMetrics": [
      "efficiency-ratio",
      "net-overhead-ratio",
      "pre-provision-net-revenue",
      "net-interest-margin",
      "roaa",
      "roe"
    ],
    "relatedMetricDescriptions": {
      "efficiency-ratio": "The efficiency ratio measures expenses relative to total revenue; banks with higher non-interest income contribute more revenue to offset expenses.",
      "net-overhead-ratio": "Higher non-interest income directly reduces the net overhead ratio by covering more of the expense base with fee revenue.",
      "pre-provision-net-revenue": "Non-interest income is a direct component of PPNR, contributing to the bank's core earnings power alongside net interest income.",
      "net-interest-margin": "NIM measures the spread-lending component of revenue; the non-interest income ratio captures the complementary fee-based component.",
      "roaa": "Fee income diversification supports ROAA by providing revenue that is less dependent on balance sheet size and interest rate conditions.",
      "roe": "Non-interest income businesses (wealth management, payments) often require less capital than lending, potentially supporting higher ROE for fee-intensive banks."
    },
    "isEducationalOnly": true,
    "whereToFindData": "Non-interest income is a standard line item on the income statement in 10-Q/10-K filings and Call Reports (FFIEC 031/041) on Schedule RI. Banks typically break down non-interest income by category in their financial statement notes and quarterly earnings releases. The FDIC Quarterly Banking Profile reports aggregate non-interest income data. The FFIEC UBPR provides individual bank non-interest income ratios with peer comparisons.",
    "bankSpecificContext": "Revenue diversification is a strategic priority for many banks because it reduces earnings dependence on the interest rate cycle. Banks with strong fee businesses can maintain profitability during periods of NIM compression that severely impact lending-focused institutions. However, building fee income requires investment in specialized capabilities (wealth management platforms, payment processing infrastructure, mortgage origination operations) that increase the expense base. The most successful diversification strategies develop fee businesses that leverage existing customer relationships rather than building standalone operations.",
    "metricConnections": "Total Revenue = NII + Non-Interest Income. Non-Interest Income Ratio = 1 - (NII / Total Revenue). The ratio therefore moves inversely with the share of net interest income. In the PPNR decomposition, PPNR = Total Revenue - Non-Interest Expense, so higher non-interest income directly increases PPNR for a given expense level. The efficiency ratio = Non-Interest Expense / Total Revenue, and a higher non-interest income ratio increases the revenue denominator, potentially improving the efficiency ratio even without expense changes.",
    "commonPitfalls": "Treating all non-interest income as equally valuable for diversification overstates the benefit. Trading revenue is volatile and pro-cyclical; mortgage banking income is interest-rate-sensitive. Only fee income that is genuinely countercyclical or acyclical relative to NIM provides true diversification. Additionally, some banks report securities gains within non-interest income; a spike in the ratio driven by securities gains is not indicative of improved franchise value. Identifying \"core\" non-interest income (excluding one-time items and securities gains) provides a cleaner view.",
    "acrossBankTypes": "Money center banks with investment banking, trading, and global wealth management businesses typically have non-interest income ratios of 40% to 60%. Regional banks with trust, wealth management, and insurance operations often achieve 25% to 40%. Community banks focused on traditional relationship lending typically have ratios of 15% to 25%, with service charges and mortgage banking as primary fee sources. Banks specializing in payments, card processing, or custody services may have non-interest income ratios above 60%.",
    "whatDrivesMetric": "The non-interest income ratio is driven by the scale and performance of fee-generating businesses (wealth management AUM, card transaction volumes, mortgage origination volume), the interest rate environment (which affects both NIM and rate-sensitive fee income like mortgage banking), management's strategic focus on building fee businesses, and the competitive environment for fee-based financial services. Regulatory changes affecting specific fee categories (such as interchange fee caps or overdraft fee restrictions) can also shift the ratio.",
    "faqTeasers": [
      {
        "question": "What is the non-interest income to revenue ratio and what does it tell me?",
        "teaser": "This ratio measures the share of bank revenue from fee-based sources rather than lending spreads, indicating how diversified the bank's earnings streams are.",
        "faqSlug": "what-is-non-interest-income-ratio",
        "faqCluster": "efficiency"
      },
      {
        "question": "What is non-interest income and why does it matter?",
        "teaser": "Non-interest income encompasses all fee-based and non-spread revenue, providing earnings diversification that can stabilize profitability across rate cycles.",
        "faqSlug": "what-is-non-interest-income",
        "faqCluster": "financial-statements"
      }
    ],
    "relatedValuations": [
      "peer-comparison",
      "dupont-decomposition"
    ]
  },
  {
    "slug": "interest-income-to-earning-assets",
    "name": "Interest Income to Average Earning Assets",
    "category": "efficiency",
    "categoryLabel": "Efficiency & Funding Ratio",
    "formula": "Yield on Earning Assets = Total Interest Income / Average Earning Assets",
    "isPercentage": true,
    "shortDescription": "Measures the average yield on a bank's interest-earning asset base, including loans, investment securities, and other interest-bearing assets",
    "description": "Interest Income to Average Earning Assets (also called Yield on Earning Assets or Earning Asset Yield) divides total interest income by average earning assets. Earning assets include all assets that generate interest income: loans, investment securities (both held-to-maturity and available-for-sale), interest-bearing balances at other banks, federal funds sold, and securities purchased under agreements to resell. This metric measures the gross return on the asset side of the bank's interest-earning balance sheet, before subtracting funding costs.",
    "formulaExplanation": "The numerator is total interest income from the income statement, including interest and fees on loans, interest on investment securities, interest on deposits at other banks, and interest on federal funds sold. The denominator is average earning assets for the period, which includes all assets that generate interest or dividend income. Non-earning assets (cash, premises, goodwill, other assets) are excluded. Some analysts compute a \"tax-equivalent\" yield by grossing up interest income on tax-exempt securities (typically municipal bonds) to a pre-tax equivalent, making the yield comparable across banks with different municipal bond holdings.",
    "interpretation": "A higher yield on earning assets indicates the bank earns more gross interest per dollar of earning assets. The yield is driven by the composition of earning assets (loans yield more than securities), the risk profile of the loan book (higher-risk loans carry higher rates), and the prevailing interest rate environment. Yield on earning assets minus Cost of Funds equals the net interest spread. The difference between the net interest spread and NIM reflects the benefit of funding earning assets with free sources (non-interest-bearing deposits and equity).",
    "typicalRange": "Earning asset yields vary significantly with interest rates. During low-rate environments, yields may fall to 3.0% to 4.0%. During higher-rate environments, yields can reach 5.0% to 7.0% or more. Within any rate environment, banks with higher concentrations of loans (vs. securities) and higher-risk loan mixes typically earn higher yields. The FDIC Quarterly Banking Profile reports aggregate earning asset yield data for the industry.",
    "goodBad": {
      "good": "Earning asset yields above the peer median indicate either a higher-yielding loan mix, better pricing discipline, or a higher loan-to-securities ratio. Rising yields during rate-increasing environments indicate the bank's assets are repricing effectively. Stable yields during rate-decreasing environments indicate fixed-rate asset protection or successful hedging.",
      "bad": "Earning asset yields below peers may indicate a conservative asset mix (heavy securities, low-risk loans), weak pricing power, or a large proportion of fixed-rate assets originated at lower rates. Declining yields while rates are stable or rising may signal the bank is losing pricing discipline or experiencing competition-driven margin pressure."
    },
    "considerations": [
      "The tax-equivalent adjustment is important for comparing yields across banks with different municipal bond holdings. Municipal bond interest is typically exempt from federal income tax, so the pre-tax yield understates the equivalent taxable return. The tax-equivalent yield grosses up this income by dividing by (1 - tax rate).",
      "Earning asset yield is a gross measure; it does not account for credit losses. A bank earning 7% on its earning assets may not be more profitable than one earning 5% if the higher-yielding bank has proportionally higher charge-offs. Combining yield analysis with asset quality metrics provides a complete picture.",
      "The mix of loans vs. securities in earning assets significantly affects the yield. Loans typically yield 200 to 400 basis points more than investment-grade securities. A bank shifting from securities into lending will see its earning asset yield increase, while one building the securities portfolio will see it decline.",
      "Fixed-rate vs. variable-rate composition affects yield sensitivity to rate changes. Banks with predominantly variable-rate loans see yields respond quickly to rate changes (asset-sensitive), while those with large fixed-rate portfolios experience slower adjustment."
    ],
    "relatedMetrics": [
      "net-interest-margin",
      "cost-of-funds",
      "cost-of-deposits",
      "loans-to-assets",
      "roaa",
      "non-performing-loans-ratio"
    ],
    "relatedMetricDescriptions": {
      "net-interest-margin": "NIM = Earning Asset Yield - Funding Cost + Free Funding Benefit; the earning asset yield is the revenue side of the NIM equation.",
      "cost-of-funds": "The net interest spread (earning asset yield minus Cost of Funds) is a core profitability driver; the spread determines how much gross interest income remains after funding costs.",
      "cost-of-deposits": "Deposit costs represent the largest funding cost; comparing earning asset yield to Cost of Deposits reveals the gross lending/investing spread over core funding.",
      "loans-to-assets": "Higher loans-to-assets ratios generally support higher earning asset yields because loans yield more than securities.",
      "roaa": "Higher earning asset yields support higher ROAA, provided the yield premium is not offset by proportionally higher credit losses or funding costs.",
      "non-performing-loans-ratio": "Non-performing loans stop generating interest income, directly reducing the earning asset yield; banks with high NPL ratios see yield depression from non-accrual assets."
    },
    "isEducationalOnly": true,
    "whereToFindData": "Total interest income is reported on the income statement in 10-Q/10-K filings and Call Reports. Average earning assets can be found in the average balance sheet tables that most banks include in their quarterly earnings releases and 10-K filings. The FFIEC UBPR reports earning asset yield with peer comparisons. The FDIC Quarterly Banking Profile reports aggregate yield data. Tax-equivalent yields, when disclosed, are typically found in the average balance sheet tables in 10-K filings.",
    "bankSpecificContext": "Earning asset yield is the gross revenue driver that, combined with funding costs, determines a bank's net interest margin. Understanding the yield helps decompose NIM into its component parts. A bank with a high NIM may have high yields (reflecting aggressive lending or a favorable rate environment) or low funding costs (reflecting a strong deposit franchise), or both. Separating yield from funding cost reveals which side of the equation is driving profitability and how sustainable the margin might be. During rate cycle transitions, yield and funding costs adjust at different speeds, creating the NIM expansion or compression that drives bank earnings volatility.",
    "metricConnections": "Net Interest Spread = Earning Asset Yield - Cost of Funds. NIM = Net Interest Income / Average Earning Assets. The relationship between the net interest spread and NIM reflects the free-funding benefit: NIM typically exceeds the net interest spread because some earning assets are funded by non-interest-bearing sources (demand deposits and equity), which have zero cost. NIM = Net Interest Spread + Free Funding Benefit. Earning asset yield also connects to loan pricing power and competitive positioning in the bank's lending markets.",
    "commonPitfalls": "Comparing earning asset yields across banks without adjusting for asset mix differences can be misleading. A bank with 80% of earning assets in commercial loans will naturally show a higher yield than one with 50% in agency securities, regardless of pricing skill. Additionally, ignoring the credit risk dimension of yield is a significant analytical error; higher yields typically compensate for higher expected credit losses. A bank earning 7% on a subprime portfolio is not necessarily better positioned than one earning 5% on prime mortgages when credit losses are factored in.",
    "acrossBankTypes": "Community banks focused on relationship-based commercial and CRE lending typically achieve higher earning asset yields (5.0% to 7.0% in moderate rate environments) because loans are a higher percentage of their earning assets and they serve borrowers who may not have access to capital markets. Large banks with significant investment securities portfolios and lower-yielding commercial lending show moderate yields (4.0% to 5.5%). Banks with large credit card or consumer lending portfolios show the highest yields (often above 7%) because consumer credit carries higher rates, though this is partially offset by higher credit costs.",
    "whatDrivesMetric": "Earning asset yield is driven by the interest rate environment (benchmark rates, yield curve shape), the composition of earning assets (loans vs. securities, fixed vs. variable), the credit risk profile of the loan book (higher-risk loans carry higher yields), pricing power in the bank's markets, the pace of asset repricing (how quickly new market rates flow through to the portfolio), and non-accrual loans (which reduce interest income on the numerator without reducing earning assets on the denominator).",
    "faqTeasers": [
      {
        "question": "What causes net interest margin to increase or decrease?",
        "teaser": "NIM is driven by earning asset yields and funding costs. Changes in either side shift the spread and therefore the bank's core profitability on its interest-earning assets.",
        "faqSlug": "what-causes-nim-to-change",
        "faqCluster": "profitability"
      },
      {
        "question": "How do rising interest rates affect bank net interest margins?",
        "teaser": "Rising rates typically increase earning asset yields, but the net impact on NIM depends on how quickly deposits reprice and whether the bank is asset-sensitive or liability-sensitive.",
        "faqSlug": "rising-rates-and-nim",
        "faqCluster": "interest-rates"
      }
    ],
    "relatedValuations": [
      "peer-comparison"
    ]
  }
];

export default METRICS;

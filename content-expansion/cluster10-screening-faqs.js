// Cluster 10: Screening and Analysis Strategies
// 14 FAQ entries for the "screening" cluster
// Drop-in ready for src/data/content/faqs.js

export const CLUSTER_10_FAQS = [
  {
    slug: 'how-to-use-bank-stock-screener',
    question: 'How do I use a bank stock screener effectively?',
    cluster: 'screening',
    clusterName: 'Screening and Analysis Strategies',
    intentType: 'procedural',

    shortAnswer: 'Start by defining your investment objective, select 2-4 metrics that align with that objective, set reasonable filter ranges based on industry norms, then sort and narrow from there',
    fullAnswer: 'Effective bank stock screening starts with a clear investment objective. Screening without a thesis produces noise rather than signal. Before setting any filters, decide whether the goal is finding undervalued banks, high-quality compounders, dividend income generators, or turnaround candidates. Each objective calls for a different combination of metrics and filter ranges.\n\nThe first step is selecting the right metrics for the objective. A value screen might emphasize P/B, P/E, and Graham Number. A quality screen might prioritize ROE, ROAA, and Efficiency Ratio. A dividend screen focuses on Dividend Payout Ratio alongside profitability metrics that indicate sustainability. Resist the urge to add too many filters at once. Two to four primary metrics produce more useful results than eight or ten filters that may exclude every bank in the dataset.\n\nThe second step is setting filter ranges that reflect realistic expectations for banks. Bank profitability metrics cluster within narrower ranges than those of technology or industrial companies. An ROE filter set above 20% would exclude virtually every bank, while a filter below 5% captures banks with serious problems. Understanding typical ranges for each metric prevents setting filters that are either too loose (producing hundreds of results) or too restrictive (producing none). BankSift\'s metric pages provide historical ranges sourced from FDIC data for each available metric.\n\nThe third step is sorting results by the metric most central to the thesis. If searching for value, sort by P/B ascending to see the cheapest banks first. If searching for quality, sort by ROE descending. Sorting reveals the distribution of values and helps identify where the strongest candidates cluster.\n\nThe fourth step is applying secondary filters to narrow the initial list. After sorting by the primary metric, add one or two secondary filters to remove banks that score well on the primary metric for the wrong reasons. A bank trading at a very low P/B might have serious asset quality problems; adding a minimum ROE filter helps screen those out.\n\nThe fifth step, and the most important, is recognizing that screening is the starting point of analysis, not the conclusion. A screener identifies candidates worth investigating further. Every result should be evaluated by reviewing the bank\'s actual financial filings, understanding its business model and market, and assessing factors that no screener can capture, such as management quality, competitive position, and local economic conditions.\n\nBankSift\'s Screener Guide walks through three complete screening strategies with specific filter settings. Reading through those examples before building a custom screen provides a practical foundation.',

    relatedMetrics: ['roe', 'roaa', 'price-to-book', 'price-to-earnings', 'efficiency-ratio', 'dividend-payout-ratio'],
    relatedValuations: ['graham-number', 'price-to-book-valuation', 'peer-comparison-analysis'],
    relatedFaqs: ['filters-for-undervalued-banks', 'filters-for-high-quality-banks', 'combining-metrics-to-find-best-banks'],
    relatedGlossaryTerms: [],

    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Screen 300+ bank stocks by 25+ metrics'
    },

    metaTitle: 'How to Use a Bank Stock Screener Effectively | BankSift',
    metaDescription: 'Learn a five-step process for effective bank stock screening: define your objective, select metrics, set ranges, sort results, and investigate candidates.'
  },

  {
    slug: 'filters-for-undervalued-banks',
    question: 'What filters should I set to find undervalued bank stocks?',
    cluster: 'screening',
    clusterName: 'Screening and Analysis Strategies',
    intentType: 'strategic',

    shortAnswer: 'Focus on P/B below 1.0-1.2x combined with profitability floors (ROE above 7-8%, ROAA above 0.70%) to find banks that are cheap relative to their earning power',
    fullAnswer: 'Screening for undervalued bank stocks requires balancing price metrics against quality metrics. A bank trading at a low P/B or P/E is not undervalued if its fundamentals justify the discount. The goal is identifying banks where the market price appears to understate the bank\'s earning power, asset quality, or franchise value.\n\nThe primary valuation filter for banks is Price to Book (P/B). Banks trading below 1.0x book value are priced below the accounting value of their net assets. Banks in the 1.0x to 1.2x range may also be undervalued if their profitability supports a higher multiple. The ROE-P/B framework provides the theoretical foundation: a bank earning its cost of equity should trade near 1.0x book, and banks earning above their cost of equity should trade at a premium.\n\nTo avoid value traps, pair the P/B filter with profitability floors. Setting ROE above 7% or 8% and ROAA above 0.70% ensures the screen captures banks that are generating reasonable returns despite their low valuation. A bank with a P/B of 0.7x and ROE of 3% is cheap for a reason. A bank with a P/B of 0.7x and ROE of 10% may represent a genuine opportunity.\n\nP/E ratio provides a complementary valuation lens. Bank P/E ratios typically range from 8x to 15x. Screening for P/E below 10x or 11x, combined with the P/B and profitability filters, narrows the list to banks that appear inexpensive on both an asset basis and an earnings basis.\n\nThe Graham Number offers another approach. It estimates a maximum fair price based on EPS and BVPS. Banks whose current share price falls below their Graham Number may warrant further investigation. The Margin of Safety metric extends this by showing the percentage discount to the Graham Number.\n\nA practical starting filter combination for an undervalued bank screen might use P/B below 1.2x, ROE above 7%, ROAA above 0.70%, and P/E below 12x. Sort results by P/B ascending to see the most discounted banks first, then review each candidate\'s financial profile for signs that the discount is unwarranted (strong and stable earnings, clean asset quality, adequate capital) or justified (deteriorating credit, shrinking margins, management concerns).\n\nNo screen replaces the need to read financial filings and understand why a bank is trading at a discount. Some discounts reflect temporary market dislocations or overlooked small banks. Others reflect genuine problems that the market has correctly identified.',

    relatedMetrics: ['price-to-book', 'price-to-earnings', 'roe', 'roaa', 'earnings-per-share', 'book-value-per-share'],
    relatedValuations: ['graham-number', 'margin-of-safety', 'price-to-book-valuation', 'roe-pb-framework'],
    relatedFaqs: ['what-is-a-good-pb-for-banks', 'pb-below-one-undervalued', 'value-investing-bank-screen', 'how-to-tell-overvalued-undervalued'],
    relatedGlossaryTerms: ['Justified P/B Multiple'],

    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Screen for undervalued bank stocks by P/B, ROE, and more'
    },

    metaTitle: 'Filters for Finding Undervalued Bank Stocks | BankSift',
    metaDescription: 'Learn which screener filters to set for finding undervalued bank stocks, combining P/B, P/E, ROE, and Graham Number to identify genuine value.'
  },

  {
    slug: 'filters-for-high-quality-banks',
    question: 'What filters should I set to find high-quality bank stocks?',
    cluster: 'screening',
    clusterName: 'Screening and Analysis Strategies',
    intentType: 'strategic',

    shortAnswer: 'Screen for above-average profitability (ROE above 10-12%, ROAA above 1.0%), strong efficiency (Efficiency Ratio below 60%), and conservative capital levels (Equity to Assets above 8%)',
    fullAnswer: 'A high-quality bank screen prioritizes operational excellence over valuation. The goal is identifying banks that consistently generate strong returns, operate efficiently, and maintain sound capital positions, regardless of whether they are trading at a discount.\n\nProfitability is the primary quality signal. ROE above 10% indicates a bank earning well above its cost of equity, which the Federal Reserve has historically estimated in the 8% to 10% range for most banks. Setting ROE above 10% to 12% filters for top-quartile profitability. ROAA above 1.0% indicates the bank is generating strong returns on its asset base independent of leverage. Using both metrics together ensures the screen captures banks that are profitable because of good operations, not simply because of aggressive leverage.\n\nEfficiency separates well-run banks from those burning too much of their revenue on overhead. An Efficiency Ratio below 60% indicates the bank spends less than 60 cents to generate each dollar of revenue. The best-run banks in the country operate below 55%. Setting the filter at 55% to 60% captures efficiently managed institutions while excluding banks with structural cost problems.\n\nCapital adequacy matters for quality assessment because it indicates the bank can absorb losses and continue operating through stress periods. Equity to Assets above 8% provides a simple capital floor. Banks below this level are not necessarily in trouble, but higher capital ratios offer a larger margin of safety and often correlate with more conservative management.\n\nNIM can serve as an additional quality filter when screening for banks with strong core banking franchises. NIM above 3.0% to 3.5% suggests the bank has pricing power in its lending markets and a favorable deposit mix. However, very high NIM values (above 5%) may indicate the bank is taking on higher credit risk to earn larger spreads, so this filter should be interpreted in context.\n\nA practical starting combination for a quality screen might use ROE above 10%, ROAA above 1.0%, Efficiency Ratio below 60%, and Equity to Assets above 8%. Sort by ROE descending to see the most profitable banks first. The resulting list represents banks that are generating strong returns efficiently and with adequate capital.\n\nHigh-quality banks often trade at premium valuations because the market recognizes their superior operations. Investors using a quality screen should expect to pay P/B multiples of 1.3x to 2.0x or higher for the strongest institutions. Whether that premium is justified depends on the sustainability of the bank\'s competitive advantages, including its deposit franchise, market position, and management track record.',

    relatedMetrics: ['roe', 'roaa', 'efficiency-ratio', 'net-interest-margin', 'equity-to-assets'],
    relatedValuations: ['peer-comparison-analysis', 'roe-pb-framework'],
    relatedFaqs: ['what-is-a-good-roe-for-banks', 'what-is-a-good-efficiency-ratio', 'combining-metrics-to-find-best-banks', 'screen-most-profitable-banks'],
    relatedGlossaryTerms: [],

    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Screen for high-quality banks by ROE, efficiency, and capital'
    },

    metaTitle: 'Filters for Finding High-Quality Bank Stocks | BankSift',
    metaDescription: 'Learn which screener filters identify high-quality bank stocks using ROE, ROAA, Efficiency Ratio, and capital metrics to find top-performing banks.'
  },

  {
    slug: 'filters-for-dividend-income-banks',
    question: 'What filters should I set to find bank stocks for dividend income?',
    cluster: 'screening',
    clusterName: 'Screening and Analysis Strategies',
    intentType: 'strategic',

    shortAnswer: 'Look for a moderate Dividend Payout Ratio (30-60%), supported by strong ROE (above 8%), adequate ROAA (above 0.80%), and reasonable Equity to Assets (above 8%) to ensure the dividend is sustainable',
    fullAnswer: 'Screening for dividend-paying bank stocks requires looking beyond yield alone. A high dividend payout is only attractive if the bank can sustain and grow it over time. The screen should balance current income against the financial strength that supports continued payments.\n\nThe Dividend Payout Ratio is the starting filter. It measures the percentage of earnings paid out as dividends. For banks, a payout ratio between 30% and 60% typically indicates a sustainable dividend with room for growth. Banks paying out less than 30% are retaining most of their earnings for growth or capital building, which may mean lower current income. Banks paying out more than 60% to 70% leave limited room for earnings volatility before the dividend comes under pressure. Regulators scrutinize banks with very high payout ratios, particularly during stress periods.\n\nProfitability filters ensure the dividend is backed by real earnings power. ROE above 8% and ROAA above 0.80% provide reasonable floors. A bank needs to earn enough to cover its dividend payments, build capital to meet regulatory requirements, and retain some earnings for growth. Banks with weak profitability may be paying dividends from accumulated capital rather than current earnings, which is not sustainable.\n\nCapital adequacy is especially important for dividend screens because bank regulators can and do restrict dividends when capital levels are insufficient. Equity to Assets above 8% provides a basic capital floor. Banks with thin capital buffers above regulatory minimums face the greatest risk of forced dividend cuts during economic downturns.\n\nThe connection between payout ratio and growth matters for income investors with a long time horizon. The sustainable growth rate equals ROE multiplied by the retention ratio (1 minus the payout ratio). A bank with 12% ROE and a 40% payout ratio retains 60% of earnings, producing a sustainable growth rate of approximately 7.2%. That growth rate applies to both the bank\'s book value and, over time, its dividend. A bank with a higher payout ratio grows more slowly but provides more current income.\n\nA practical starting combination might use Dividend Payout Ratio between 30% and 60%, ROE above 8%, ROAA above 0.80%, and Equity to Assets above 8%. Sort by Dividend Payout Ratio descending to see the highest-yielding sustainable payers first, or sort by ROE descending to prioritize banks with the strongest earnings supporting their dividends.\n\nAfter generating results, review each candidate\'s payout ratio trend over multiple years (available in SEC filings). A stable or gradually increasing payout ratio is more reassuring than one that has spiked recently, which may indicate earnings have declined while the dividend has not yet been adjusted.',

    relatedMetrics: ['dividend-payout-ratio', 'roe', 'roaa', 'equity-to-assets', 'earnings-per-share'],
    relatedValuations: ['dividend-discount-model', 'gordon-growth-model'],
    relatedFaqs: ['good-dividend-payout-ratio-for-banks', 'how-to-evaluate-dividend-safety', 'screen-for-safe-high-dividend-banks', 'roe-payout-ratio-dividend-growth'],
    relatedGlossaryTerms: ['Retention Ratio', 'Sustainable Growth Rate'],

    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Screen for dividend-paying bank stocks by payout ratio and profitability'
    },

    metaTitle: 'Filters for Dividend Income Bank Stocks | BankSift',
    metaDescription: 'Learn which screener filters find sustainable dividend-paying bank stocks using payout ratio, ROE, ROAA, and capital metrics.'
  },

  {
    slug: 'how-to-screen-community-banks',
    question: 'How do I screen for small community bank stocks?',
    cluster: 'screening',
    clusterName: 'Screening and Analysis Strategies',
    intentType: 'procedural',

    shortAnswer: 'Filter by Total Assets below $3 billion to $10 billion and Market Cap below $500 million to $1 billion, then evaluate profitability and efficiency within that peer group',
    fullAnswer: 'Community banks are generally defined as banks with total assets below $10 billion, though many investors focus on the smaller end of that range, under $3 billion or even under $1 billion in assets. Screening for community banks requires size filters combined with awareness of how community bank metrics differ from those of larger institutions.\n\nThe first step is setting size parameters. Total Assets is the standard measure for classifying bank size. Filtering for Total Assets below $3 billion captures the core community bank segment. Filtering below $10 billion captures a broader set that includes larger community banks and small regionals. Market Cap can serve as a complementary filter; community banks typically have market capitalizations below $500 million, and many trade below $100 million.\n\nThe second step is adjusting expectations for community bank metrics. Community banks operate differently from large banks in several ways that affect screening. Their Efficiency Ratios tend to run higher (60% to 75%) because they lack the scale advantages of larger institutions, so a filter that works for large banks (below 55%) would exclude nearly every community bank. Their NIMs tend to be higher (3.5% to 4.5%) because they focus on relationship lending with more pricing power. Their ROE may be slightly lower (8% to 12%) than top large banks, partly because many community banks carry higher capital ratios relative to their risk.\n\nA practical screen for community banks might use Total Assets below $3 billion, ROE above 7%, Efficiency Ratio below 70%, and Equity to Assets above 8%. These thresholds are intentionally more relaxed than a general quality screen to account for the structural differences in community bank economics.\n\nThe third step is recognizing what a screener cannot tell you about community banks. Community banks derive much of their value from local factors: the health of their geographic market, the strength of their deposit relationships, the quality of their loan underwriting in specific property types, and the depth of their management team. These factors require reviewing the bank\'s filings and understanding its market. Many community banks are followed by few or no sell-side analysts, which creates both information inefficiency and the need for more independent research.\n\nCommunity bank stocks also tend to have lower trading volume and wider bid-ask spreads than larger bank stocks. Investors accustomed to liquid large-cap stocks should be aware of the practical implications for entering and exiting positions.\n\nBankSift tracks over 300 publicly traded banks, including many community banks. Using the screener to filter by Total Assets is the fastest way to identify which community banks are in the dataset and begin evaluating their fundamentals.',

    relatedMetrics: ['roe', 'roaa', 'efficiency-ratio', 'net-interest-margin', 'equity-to-assets'],
    relatedValuations: ['peer-comparison-analysis', 'price-to-book-valuation'],
    relatedFaqs: ['what-are-community-banks', 'community-vs-regional-vs-money-center', 'comparing-profitability-different-size-banks', 'filters-for-high-quality-banks'],
    relatedGlossaryTerms: ['Community Bank'],

    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Filter by Total Assets to find community bank stocks'
    },

    metaTitle: 'How to Screen for Small Community Bank Stocks | BankSift',
    metaDescription: 'Learn how to screen for community bank stocks using total assets, market cap, and adjusted metric thresholds that reflect community bank economics.'
  },

  {
    slug: 'how-to-compare-bank-stocks',
    question: 'How do I compare bank stocks side by side?',
    cluster: 'screening',
    clusterName: 'Screening and Analysis Strategies',
    intentType: 'procedural',

    shortAnswer: 'Select a peer group of similarly sized banks in similar markets, then compare profitability (ROE, ROAA, NIM), efficiency, valuation (P/B, P/E), and capital metrics across the group',
    fullAnswer: 'Comparing bank stocks effectively requires establishing a relevant peer group and examining multiple dimensions of performance. Banks that appear similar on one metric may differ significantly on others, and context matters more for bank comparison than for most industries.\n\nThe first step is defining the peer group. Meaningful comparison requires banks of similar size, business model, and geographic context. Comparing a $500 million community bank in rural Iowa to JPMorgan Chase produces no useful insight. A more useful comparison groups banks by Total Assets within a similar range (for example, $1 billion to $5 billion), operating in similar types of markets (metro vs. rural, single-state vs. multi-state). The screener\'s asset size filter is the starting point for building a peer group.\n\nThe second step is selecting comparison metrics across multiple dimensions. No single metric captures overall bank quality. A comprehensive comparison examines at least four dimensions.\n\nProfitability: ROE, ROAA, and NIM together reveal how much profit the bank generates, whether that profitability is driven by leverage or by the asset base, and how wide the interest rate spread is. A bank with strong ROE but weak ROAA is using leverage rather than operational efficiency to drive returns.\n\nEfficiency: The Efficiency Ratio shows how much of each revenue dollar goes to operating expenses. Within a peer group of similar-sized banks, differences in efficiency ratio often reflect management quality and operational discipline.\n\nValuation: P/B and P/E show what the market is willing to pay for each bank relative to its book value and earnings. Comparing these metrics within a peer group reveals which banks the market views as higher or lower quality, and whether any appear mispriced relative to their fundamentals.\n\nCapital: Equity to Assets provides a simple comparison of capital strength. Banks with significantly higher capital ratios within a peer group are either more conservatively managed or may be retaining excess capital that could be deployed more productively.\n\nThe third step is examining where banks diverge from the peer group average and understanding why. A bank with an Efficiency Ratio ten points higher than its peers may have invested heavily in technology or branches that have not yet produced revenue. A bank with ROE well above peers may be taking more credit risk. Divergence is the starting point for deeper analysis, not a conclusion by itself.\n\nBankSift\'s screener allows sorting by any available metric after applying filters, which enables quick identification of where each bank ranks within a peer group. Exporting the results and working through the comparison in a spreadsheet can help organize the analysis across multiple dimensions.',

    relatedMetrics: ['roe', 'roaa', 'net-interest-margin', 'efficiency-ratio', 'price-to-book', 'price-to-earnings', 'equity-to-assets'],
    relatedValuations: ['peer-comparison-analysis', 'roe-pb-framework'],
    relatedFaqs: ['comparing-profitability-different-size-banks', 'how-to-do-peer-comparison', 'combining-metrics-to-find-best-banks'],
    relatedGlossaryTerms: [],

    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Screen and sort bank stocks to build peer comparisons'
    },

    metaTitle: 'How to Compare Bank Stocks Side by Side | BankSift',
    metaDescription: 'Learn how to compare bank stocks by building peer groups and evaluating profitability, efficiency, valuation, and capital metrics across similar banks.'
  },

  {
    slug: 'screen-banks-below-book-value',
    question: 'How do I screen for banks trading below book value?',
    cluster: 'screening',
    clusterName: 'Screening and Analysis Strategies',
    intentType: 'procedural',

    shortAnswer: 'Set the P/B filter below 1.0 to find banks priced below their accounting net asset value, then add profitability filters to distinguish genuine bargains from value traps',
    fullAnswer: 'Banks trading below book value (P/B below 1.0) are priced below the accounting value of their net assets. This can represent a genuine valuation opportunity or a signal that the market sees problems the balance sheet has not yet fully reflected. Screening for these banks is straightforward, but interpreting the results requires care.\n\nThe primary filter is P/B below 1.0. This identifies all banks in the dataset whose share price is less than their book value per share. At any given time, a meaningful number of publicly traded banks trade below book value, particularly among smaller institutions that receive less analyst coverage.\n\nThe immediate challenge is separating banks that are cheap from banks that deserve to be cheap. A bank trading at 0.60x book value with declining earnings, rising non-performing loans, and thin capital is not a bargain. It is being priced for the possibility that its book value will decline toward its market price through future losses. The market is often right about these cases.\n\nTo filter out likely value traps, add profitability and capital floors. Setting ROE above 5% to 7% ensures the bank is at least generating positive returns. Setting ROAA above 0.50% to 0.70% confirms the profitability is not purely a leverage artifact. Setting Equity to Assets above 7% to 8% provides some assurance that the bank has adequate capital to absorb potential losses.\n\nFor a more selective screen, raise the profitability floors. Banks with P/B below 1.0 and ROE above 8% to 10% are earning returns that would typically justify a price at or above book value, which suggests the market may be mispricing the stock. These are the most interesting candidates for further analysis.\n\nAfter generating results, examine why each bank is trading below book value. Common reasons include: the bank operates in a market with limited growth prospects; the bank has elevated levels of non-performing assets that may require future charge-offs; the bank\'s securities portfolio has significant unrealized losses (an issue that became prominent when interest rates rose rapidly); the bank is very small and illiquid, causing the market to apply a liquidity discount; or the bank has weak or uncertain management.\n\nSome of these reasons are temporary or addressable, while others reflect permanent impairments. The analytical work after screening determines which category each candidate falls into.\n\nInvestors focused on tangible book value may prefer filtering by P/TBV rather than P/B, which strips out goodwill and intangible assets. This is especially relevant for banks that have made acquisitions, where goodwill may represent a significant portion of book value.',

    relatedMetrics: ['price-to-book', 'roe', 'roaa', 'equity-to-assets', 'book-value-per-share', 'price-to-tangible-book-value'],
    relatedValuations: ['price-to-book-valuation', 'margin-of-safety', 'roe-pb-framework'],
    relatedFaqs: ['pb-below-one-undervalued', 'what-is-a-good-pb-for-banks', 'filters-for-undervalued-banks', 'red-flags-screening-bank-stocks'],
    relatedGlossaryTerms: ['Tangible Book Value'],

    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Screen for banks trading below book value'
    },

    metaTitle: 'How to Screen for Banks Below Book Value | BankSift',
    metaDescription: 'Learn how to screen for bank stocks trading below book value using P/B filters combined with profitability floors to separate bargains from value traps.'
  },

  {
    slug: 'screen-most-profitable-banks',
    question: 'How do I screen for the most profitable banks?',
    cluster: 'screening',
    clusterName: 'Screening and Analysis Strategies',
    intentType: 'procedural',

    shortAnswer: 'Filter for ROE above 12%, ROAA above 1.0%, and NIM above 3.0%, then sort by ROE descending to rank the most profitable banks',
    fullAnswer: 'Screening for the most profitable banks requires using multiple profitability metrics together, because each metric captures a different aspect of how a bank generates returns.\n\nROE is the broadest profitability measure. It shows the return generated on shareholders\' equity. For banks, ROE above 12% represents strong performance, and above 15% is exceptional. Setting ROE as the primary filter and sorting descending ranks banks from most to least profitable on this measure. The FDIC\'s historical data shows that the median ROE for US banks has typically ranged between 8% and 12%, so screening above 12% captures the top performers.\n\nROAA removes the effect of leverage and shows how productively the bank uses its total asset base. Adding ROAA above 1.0% as a secondary filter ensures the high ROE is driven by operational performance rather than simply thin capital. A bank can achieve high ROE with mediocre operations if it runs with minimal equity, but that strategy carries higher risk. Banks with both high ROE and high ROAA are genuinely strong operators.\n\nNIM measures the core banking spread between what the bank earns on loans and investments and what it pays on deposits and borrowings. Adding NIM above 3.0% to 3.5% filters for banks with strong core banking franchises. NIM is the largest driver of revenue for traditional banks, so banks with above-average NIM have a structural profitability advantage. However, very high NIM (above 5%) can sometimes indicate higher-risk lending, so it helps to examine the bank\'s loan mix when NIM is at the upper extreme.\n\nThe Efficiency Ratio provides a cost perspective on profitability. Adding Efficiency Ratio below 60% ensures the profitable banks on the list are not generating their returns despite poor cost control. Banks that combine high ROE with low efficiency ratios are converting the highest proportion of their revenue into profit.\n\nA practical profitability screen might use ROE above 12%, ROAA above 1.0%, NIM above 3.0%, and Efficiency Ratio below 60%. Sort by ROE descending. The resulting list represents the most profitable banks in the dataset across multiple dimensions.\n\nNote that highly profitable banks often trade at premium valuations. Investors interested in both profitability and value should cross-reference the results with P/B and P/E to identify any profitable banks that may be trading at reasonable multiples.',

    relatedMetrics: ['roe', 'roaa', 'net-interest-margin', 'efficiency-ratio'],
    relatedValuations: ['roe-pb-framework', 'peer-comparison-analysis'],
    relatedFaqs: ['what-is-a-good-roe-for-banks', 'what-is-a-good-roaa-for-banks', 'what-is-a-good-nim-for-banks', 'filters-for-high-quality-banks'],
    relatedGlossaryTerms: [],

    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Screen for the most profitable bank stocks by ROE and ROAA'
    },

    metaTitle: 'How to Screen for the Most Profitable Banks | BankSift',
    metaDescription: 'Learn how to screen for the most profitable bank stocks using ROE, ROAA, NIM, and Efficiency Ratio filters to find top-performing institutions.'
  },

  {
    slug: 'screen-most-efficient-banks',
    question: 'How do I screen for the most efficient banks?',
    cluster: 'screening',
    clusterName: 'Screening and Analysis Strategies',
    intentType: 'procedural',

    shortAnswer: 'Set the Efficiency Ratio filter below 55-60% to find banks that spend the least to generate each dollar of revenue, and pair with minimum asset size to ensure meaningful comparison',
    fullAnswer: 'The Efficiency Ratio is the primary metric for screening bank operating efficiency. It measures non-interest expense as a percentage of revenue (net interest income plus non-interest income). Lower values indicate the bank converts a higher share of its revenue into profit.\n\nThe standard filter for efficient banks is Efficiency Ratio below 55% to 60%. Banks operating below 55% are among the most efficient in the industry. The best-run banks in the country operate in the 45% to 50% range. Setting the filter at 60% captures a broader set of well-managed banks, while tightening to 55% or below isolates the top tier.\n\nSize context matters when screening for efficiency. Large banks benefit from scale advantages that allow them to spread fixed costs over a larger revenue base, which naturally produces lower efficiency ratios. Small community banks face inherently higher efficiency ratios (often 65% to 75%) because compliance costs, technology systems, and branch infrastructure represent a larger percentage of their smaller revenue base. To make the comparison meaningful, consider setting a Total Assets filter to create a peer group of similar-sized banks before applying the efficiency filter.\n\nProfitability metrics should accompany an efficiency screen. A bank can achieve a low efficiency ratio through aggressive cost-cutting that harms its long-term franchise (closing branches, underinvesting in technology, understaffing compliance). Adding ROE above 8% to 10% and ROAA above 0.80% confirms that the efficient cost structure is translating into genuine profitability rather than reflecting a bank that has cut its way into a corner.\n\nNIM provides additional context. A bank with a low efficiency ratio and a high NIM is generating strong revenue while keeping costs contained, which is the ideal combination. A bank with a low efficiency ratio but a weak NIM may simply be operating in a low-cost market where revenue is also limited.\n\nA practical screen for efficient banks might use Efficiency Ratio below 60%, ROE above 8%, ROAA above 0.80%, and Total Assets above $500 million (to exclude very small banks where the ratio behaves differently). Sort by Efficiency Ratio ascending to see the most efficient banks first.\n\nWhen reviewing results, look at whether the bank\'s revenue is growing alongside its efficiency. A declining efficiency ratio driven by revenue growth is a healthier signal than one achieved through expense cuts alone. Trends matter, and a single period\'s efficiency ratio should be confirmed against the bank\'s filing history.',

    relatedMetrics: ['efficiency-ratio', 'roe', 'roaa', 'net-interest-margin'],
    relatedValuations: ['peer-comparison-analysis'],
    relatedFaqs: ['what-is-a-good-efficiency-ratio', 'what-drives-efficiency-ratio', 'why-small-banks-higher-efficiency-ratio', 'filters-for-high-quality-banks'],
    relatedGlossaryTerms: [],

    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Screen for the most efficient bank stocks by Efficiency Ratio'
    },

    metaTitle: 'How to Screen for the Most Efficient Banks | BankSift',
    metaDescription: 'Learn how to screen for the most efficient bank stocks using Efficiency Ratio filters with profitability and size context for meaningful comparisons.'
  },

  {
    slug: 'red-flags-screening-bank-stocks',
    question: 'What are the red flags to watch for when screening bank stocks?',
    cluster: 'screening',
    clusterName: 'Screening and Analysis Strategies',
    intentType: 'evaluative',

    shortAnswer: 'Watch for very low P/B without clear explanation, declining ROE or ROAA, efficiency ratios above 80%, very high payout ratios, rapidly growing loans without matching deposit growth, and thin capital ratios',
    fullAnswer: 'Screening surfaces candidates for further analysis, but it also surfaces banks with serious problems. Learning to recognize red flags in screening results prevents wasted research time and helps avoid value traps.\n\nExtremely low valuation without apparent cause is the most common red flag. A bank trading at 0.40x to 0.50x book value while its peers trade at 1.0x or above is almost certainly discounted for a reason. The screener cannot tell you what that reason is, but it should prompt immediate skepticism rather than excitement about a "cheap" stock.\n\nDeclining profitability trends warrant concern. A bank with ROE of 6% that was earning 12% two years ago is on a deteriorating trajectory. While the screener shows a snapshot, the direction of profitability matters more than the current level. Filing review is necessary to determine whether the decline is temporary (a one-time charge, a strategic investment) or structural (competitive erosion, credit deterioration).\n\nEfficiency Ratios above 75% to 80% suggest the bank is spending too much to generate its revenue. At these levels, even modest revenue declines can push the bank toward unprofitability. Very high efficiency ratios may indicate a bank struggling with excess overhead, underinvestment in revenue-generating activities, or a shrinking revenue base.\n\nVery high Dividend Payout Ratios (above 80% to 90%) indicate the bank is distributing almost all of its earnings, leaving minimal buffer for earnings volatility and little room for capital building. Banks in this situation are vulnerable to dividend cuts if earnings decline even modestly. A payout ratio above 100% means the bank is paying dividends in excess of its earnings, which draws down capital.\n\nA Loans to Deposits ratio above 100% means the bank is funding some portion of its loans with non-deposit sources, typically wholesale borrowings that are more expensive and less stable than core deposits. While this is not inherently disqualifying, it introduces funding risk and may pressure profitability if wholesale funding costs rise.\n\nLow Equity to Assets (below 6% to 7%) indicates the bank has relatively thin capital relative to its asset base. While regulatory capital ratios (CET1, Tier 1) are more precise measures, a low equity-to-assets ratio on the screener suggests the bank is operating with limited cushion.\n\nNegative or near-zero earnings (very low or negative EPS) may indicate a bank in distress. Negative earnings can result from large provision charges, write-downs, or operational losses. While some of these causes are temporary, screening for banks with negative earnings generally produces a list of troubled institutions.\n\nNo single red flag is necessarily disqualifying on its own, but multiple red flags appearing simultaneously for the same bank (low P/B, declining ROE, high efficiency ratio, high payout ratio) strongly suggest problems that warrant either passing on the stock or conducting extensive due diligence.',

    relatedMetrics: ['price-to-book', 'roe', 'roaa', 'efficiency-ratio', 'dividend-payout-ratio', 'loans-to-deposits', 'equity-to-assets', 'earnings-per-share'],
    relatedValuations: ['margin-of-safety'],
    relatedFaqs: ['pb-below-one-undervalued', 'can-roe-be-too-high', 'loans-to-deposits-too-high', 'filters-for-undervalued-banks'],
    relatedGlossaryTerms: [],

    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Screen bank stocks and check for red flags across 25+ metrics'
    },

    metaTitle: 'Red Flags When Screening Bank Stocks | BankSift',
    metaDescription: 'Learn the key red flags to watch for when screening bank stocks, including low valuation traps, declining profitability, and dangerous payout ratios.'
  },

  {
    slug: 'combining-metrics-to-find-best-banks',
    question: 'How do I combine multiple metrics to find the best bank stocks?',
    cluster: 'screening',
    clusterName: 'Screening and Analysis Strategies',
    intentType: 'strategic',

    shortAnswer: 'Build a multi-factor screen by combining one metric from each category: profitability (ROE or ROAA), efficiency (Efficiency Ratio), valuation (P/B or P/E), and capital (Equity to Assets), then prioritize based on your investment objective',
    fullAnswer: 'The most effective bank stock screens combine metrics from different analytical dimensions rather than stacking multiple metrics from the same dimension. A screen using ROE, ROAA, NIM, and Efficiency Ratio is entirely focused on profitability and operations. Adding P/B and Equity to Assets introduces valuation and capital dimensions that provide a more complete picture.\n\nThe framework for combining metrics uses four dimensions, with one or two metrics selected from each.\n\nProfitability measures how well the bank generates returns. ROE is the standard choice. ROAA is the preferred complement because it removes leverage effects. NIM adds a core revenue perspective. Select one or two of these based on whether the objective emphasizes overall profitability (ROE), operational efficiency (ROAA), or core banking strength (NIM).\n\nEfficiency measures how much of its revenue the bank retains after operating expenses. The Efficiency Ratio is the primary metric here and applies to virtually every bank screen.\n\nValuation measures what the market is charging for the bank\'s earnings and assets. P/B is the primary bank valuation metric. P/E provides a complementary earnings-based view. Including at least one valuation metric prevents the screen from identifying excellent banks that are too expensive to offer attractive returns.\n\nCapital and balance sheet measures provide a safety and structure perspective. Equity to Assets is the simplest capital measure available in the screener. Loans to Deposits and Deposits to Assets add balance sheet composition context.\n\nA balanced multi-factor screen might combine ROE above 10%, Efficiency Ratio below 60%, P/B below 1.5x, and Equity to Assets above 8%. This produces a list of profitable, efficient, reasonably priced banks with adequate capital. The filter thresholds can be tightened or loosened to produce more or fewer results.\n\nThe order of priority among the four dimensions should reflect the investment objective. Value investors tighten the valuation filters and loosen the profitability filters, accepting lower profitability in exchange for a cheaper price. Quality investors tighten profitability and efficiency filters while accepting higher valuations. Income investors add Dividend Payout Ratio and may loosen the valuation constraints.\n\nAfter running the combined screen, review the resulting list to identify banks that score well across all four dimensions rather than excelling on one while being weak on another. A bank with 15% ROE, a 50% efficiency ratio, but P/B of 2.5x and equity-to-assets of 6% looks strong on operations but is expensively priced with thin capital. A bank with 10% ROE, 58% efficiency ratio, P/B of 0.9x, and 10% equity-to-assets may be the more compelling investment despite lower profitability.\n\nThe screener makes this process practical by allowing multiple simultaneous filters. Start broad, examine the initial results, then progressively tighten filters to isolate the strongest candidates.',

    relatedMetrics: ['roe', 'roaa', 'net-interest-margin', 'efficiency-ratio', 'price-to-book', 'price-to-earnings', 'equity-to-assets', 'loans-to-deposits'],
    relatedValuations: ['peer-comparison-analysis', 'roe-pb-framework', 'price-to-book-valuation'],
    relatedFaqs: ['how-to-use-bank-stock-screener', 'filters-for-undervalued-banks', 'filters-for-high-quality-banks', 'most-important-bank-stock-metrics'],
    relatedGlossaryTerms: [],

    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Combine multiple metrics to screen 300+ bank stocks'
    },

    metaTitle: 'Combining Metrics to Find the Best Bank Stocks | BankSift',
    metaDescription: 'Learn how to build multi-factor bank stock screens by combining profitability, efficiency, valuation, and capital metrics for a complete analysis.'
  },

  {
    slug: 'value-investing-bank-screen',
    question: 'What is a good starting point for a value investing bank stock screen?',
    cluster: 'screening',
    clusterName: 'Screening and Analysis Strategies',
    intentType: 'strategic',

    shortAnswer: 'Start with P/B below 1.0-1.2x, P/E below 10-12x, ROE above 7-8%, and check the Graham Number and Margin of Safety for additional confirmation',
    fullAnswer: 'Value investing in bank stocks centers on finding banks where the market price underestimates the intrinsic value of the institution\'s assets, earnings power, or franchise. Banks are well-suited to value investing approaches because their balance sheets consist primarily of financial instruments with identifiable values, making book value a more meaningful anchor than it is for most industries.\n\nThe Graham Number provides a natural starting point for value-oriented bank screening. Developed from Benjamin Graham\'s principles, it calculates a maximum fair price based on EPS and BVPS. Banks whose current price falls below their Graham Number are, by this framework, potentially undervalued. BankSift calculates the Graham Number and Margin of Safety (the percentage discount to the Graham Number) for every bank in the dataset, making this an efficient first filter.\n\nP/B below 1.0x to 1.2x is the core valuation filter. The theoretical justification comes from the ROE-P/B framework: a bank earning its cost of equity (approximately 8% to 10%) should trade near 1.0x book value. Banks trading below this level are either earning below their cost of equity (in which case the discount is justified) or are being mispriced by the market. The screener allows you to distinguish between these cases by examining ROE alongside P/B.\n\nP/E below 10x to 12x adds an earnings-based valuation check. Bank P/E ratios typically range from 8x to 15x. Banks at the lower end of this range may be undervalued, particularly if their earnings are stable rather than temporarily depressed by provision charges.\n\nProfitability floors are essential for a value screen. Setting ROE above 7% to 8% and ROAA above 0.60% to 0.70% helps exclude banks that are cheap because of genuinely weak operations. The goal is finding banks where the market is undervaluing adequate or strong fundamentals, not banks that deserve their low price.\n\nA practical value investing screen might combine Graham Number Margin of Safety above 0% (price below Graham Number), P/B below 1.2x, P/E below 12x, and ROE above 7%. Sort by Margin of Safety descending to see the banks with the largest discount to their Graham Number first.\n\nAfter generating results, the real work begins. For each candidate, review the bank\'s 10-K filing to understand its loan composition, deposit stability, earnings trend over recent years, and capital adequacy. Determine whether the market\'s discount reflects a temporary condition (a one-time charge, market-wide pessimism, illiquidity in a small stock) or a structural issue (declining market, poor management, deteriorating credit). Value investing produces the best results when the investor understands the business well enough to assess whether the market\'s pessimism is justified.\n\nBankSift\'s Screener Guide includes a dedicated value investing screening strategy with specific filter settings and a walkthrough of the analytical process.',

    relatedMetrics: ['price-to-book', 'price-to-earnings', 'roe', 'roaa', 'book-value-per-share', 'earnings-per-share'],
    relatedValuations: ['graham-number', 'margin-of-safety', 'price-to-book-valuation', 'roe-pb-framework'],
    relatedFaqs: ['filters-for-undervalued-banks', 'graham-number-for-bank-stocks', 'how-to-use-graham-number', 'pb-below-one-undervalued'],
    relatedGlossaryTerms: ['Justified P/B Multiple'],

    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Start a value investing bank stock screen with Graham Number and P/B'
    },

    metaTitle: 'Value Investing Bank Stock Screen Starting Point | BankSift',
    metaDescription: 'Learn a practical starting point for value investing in bank stocks using Graham Number, P/B, P/E, and profitability filters to find undervalued banks.'
  },

  {
    slug: 'identifying-bank-turnaround-candidates',
    question: 'How do I identify turnaround candidates in the banking sector?',
    cluster: 'screening',
    clusterName: 'Screening and Analysis Strategies',
    intentType: 'strategic',

    shortAnswer: 'Screen for banks with low current profitability (ROE 3-7%) but adequate capital (Equity to Assets above 7-8%) trading at deep discounts to book value (P/B below 0.7x), then research what is suppressing earnings',
    fullAnswer: 'Turnaround investing in banks targets institutions that are currently underperforming but have the financial strength and potential to recover. This approach carries higher risk than quality or value screening because it involves investing in banks with identified weaknesses. The analytical challenge is distinguishing banks that can improve from banks that are in permanent decline or heading toward failure.\n\nThe screening approach for turnarounds differs from a standard value screen. Instead of filtering for adequate profitability, a turnaround screen explicitly targets banks with below-average profitability that still maintain adequate capital and a viable franchise.\n\nProfitability should be low but positive. Setting ROE between 2% and 7% captures banks that are profitable but earning well below their cost of equity. Banks with negative ROE are in deeper distress and represent a different, higher-risk category. ROAA between 0.20% and 0.60% provides a complementary floor.\n\nCapital adequacy is the critical safety filter. A bank cannot execute a turnaround if it lacks the capital to absorb continued weak performance while management implements changes. Equity to Assets above 7% to 8% provides a minimum buffer. Banks with strong capital positions relative to their weak earnings are better positioned to survive the turnaround period.\n\nValuation should reflect the market\'s pessimism. P/B below 0.7x to 0.8x indicates the market is pricing the bank at a significant discount to its net asset value, creating the potential for meaningful upside if the bank improves. If the turnaround succeeds and ROE recovers to 10% or above, the P/B multiple should re-rate toward 1.0x or higher, providing returns from both earnings improvement and multiple expansion.\n\nAfter generating candidates, the research phase is essential and more intensive than for other screening approaches. For each candidate, determine the specific cause of weak profitability. Common turnaround situations include: banks working through elevated credit losses from a specific loan concentration (such as energy loans or commercial real estate in a distressed market); banks with high efficiency ratios due to a recent acquisition that has not yet been fully integrated; banks with temporarily compressed NIM due to balance sheet repositioning; and banks with new management teams brought in to improve operations.\n\nThe most favorable turnaround candidates combine identifiable problems with identifiable solutions. A bank with a high efficiency ratio and a new CEO with a track record of cost reduction at previous banks is a clearer thesis than a bank with diffuse underperformance and no visible catalyst for change.\n\nTurnaround investing in banks also carries specific risks. Bank regulators may impose restrictions on capital actions, growth, or business activities if the bank\'s condition deteriorates further. Deposit outflows can accelerate if market confidence erodes. And the timeline for turnarounds in banking is often longer than investors expect, as credit problems and operational improvements take multiple quarters to work through the financial statements.',

    relatedMetrics: ['roe', 'roaa', 'price-to-book', 'equity-to-assets', 'efficiency-ratio', 'net-interest-margin'],
    relatedValuations: ['price-to-book-valuation', 'margin-of-safety'],
    relatedFaqs: ['pb-below-one-undervalued', 'red-flags-screening-bank-stocks', 'filters-for-undervalued-banks', 'what-happens-below-minimum-capital'],
    relatedGlossaryTerms: [],

    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Screen for potential turnaround bank stocks by P/B and capital metrics'
    },

    metaTitle: 'How to Identify Bank Turnaround Candidates | BankSift',
    metaDescription: 'Learn how to screen for bank turnaround candidates using low profitability, adequate capital, and deep valuation discounts to find recovery opportunities.'
  },

  {
    slug: 'how-to-export-screening-data',
    question: 'How do I export and analyze bank stock screening data?',
    cluster: 'screening',
    clusterName: 'Screening and Analysis Strategies',
    intentType: 'procedural',

    shortAnswer: 'Use BankSift\'s screener to filter and sort banks, then export the results to a spreadsheet for further analysis, custom scoring, and comparison across multiple dimensions',
    fullAnswer: 'Exporting screening results allows for deeper analysis than what a screener interface alone can provide. A spreadsheet gives the flexibility to create custom scoring systems, weighted rankings, historical comparisons, and formatted output for investment notes.\n\nBankSift\'s screener allows filtering by 25+ metrics and sorting by any column. The first step in an export workflow is setting up the screen with the desired filters to narrow the universe to a manageable set of candidates. A screen that returns 20 to 50 banks is a practical size for spreadsheet analysis. A screen that returns 200 banks likely needs tighter filters before exporting.\n\nOnce results are filtered and sorted, the data can be captured for offline analysis. The screener displays all available metrics for each bank in the results table, providing a comprehensive dataset for each institution.\n\nIn a spreadsheet, the most productive next step is creating a scoring or ranking system. One common approach assigns a percentile rank within the screened group for each metric. A bank that ranks in the top quartile on ROE, efficiency, and P/B receives high marks across dimensions. A bank that ranks well on one dimension but poorly on others becomes easy to identify.\n\nA weighted scoring approach takes this further. Assign weights to each metric based on the investment objective. A value investor might weight P/B at 30%, Graham Number Margin of Safety at 25%, ROE at 20%, Equity to Assets at 15%, and Efficiency Ratio at 10%. A quality investor would reverse the emphasis toward profitability and efficiency. Summing the weighted scores produces a composite ranking that reflects the investor\'s priorities.\n\nAnother productive use of exported data is historical comparison. After identifying a candidate from the screener, pulling the same bank\'s metrics from its SEC filings for the prior three to five years reveals trends that a single-period screen cannot capture. A bank showing improving ROE and declining efficiency ratio over several years is on a favorable trajectory. A bank with deteriorating trends despite currently acceptable metrics may be heading toward problems.\n\nExported data also supports peer group analysis. Pulling five to eight banks of similar size and business model into a comparison table and computing the peer group average for each metric quickly reveals where each bank stands relative to its most relevant competitors.\n\nFor investors who build models, exported screening data provides the inputs for valuation frameworks. The Dividend Discount Model requires EPS and dividend data. The ROE-P/B framework requires ROE and current P/B. The Graham Number requires EPS and BVPS. Having these inputs in a spreadsheet streamlines the process of running valuation calculations across multiple candidates simultaneously.',

    relatedMetrics: ['roe', 'roaa', 'price-to-book', 'price-to-earnings', 'efficiency-ratio', 'earnings-per-share', 'book-value-per-share'],
    relatedValuations: ['peer-comparison-analysis', 'graham-number', 'dividend-discount-model', 'roe-pb-framework'],
    relatedFaqs: ['how-to-use-bank-stock-screener', 'how-to-compare-bank-stocks', 'combining-metrics-to-find-best-banks', 'how-to-do-peer-comparison'],
    relatedGlossaryTerms: [],

    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Screen and export bank stock data for offline analysis'
    },

    metaTitle: 'How to Export and Analyze Bank Screening Data | BankSift',
    metaDescription: 'Learn how to export bank stock screening results for spreadsheet analysis, custom scoring, peer comparison, and valuation modeling.'
  }
];

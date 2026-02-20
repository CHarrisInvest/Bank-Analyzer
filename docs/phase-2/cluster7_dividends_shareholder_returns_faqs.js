// Cluster 7: Bank Dividends and Shareholder Returns — 10 Standard FAQ Entries
// Phase 2 / Batch 2 content for src/data/content/faqs.js
// Add these entries to the FAQS array alongside existing Cluster 7 "How to Calculate" entries.

const CLUSTER_7_FAQS = [
  {
    slug: 'do-all-banks-pay-dividends',
    question: 'Do all bank stocks pay dividends?',
    cluster: 'dividends',
    clusterName: 'Bank Dividends and Shareholder Returns',
    intentType: 'definitional',
    shortAnswer: 'No, not all bank stocks pay dividends, though the majority of publicly traded U.S. banks do pay regular quarterly dividends because their business models generate steady cash flows from lending and fee activities',
    fullAnswer: 'The majority of publicly traded U.S. banks pay regular quarterly dividends, making the banking sector one of the more reliable sources of dividend income in the equity market. However, several categories of banks typically do not pay dividends or pay only minimal dividends.\n\nDe novo banks (newly chartered institutions) rarely pay dividends in their first several years of operation. Regulators generally expect new banks to retain all earnings to build their capital base, and most de novo banks are not yet generating sufficient profits to support distributions.\n\nBanks under financial stress may suspend or significantly reduce their dividends. When a bank experiences elevated loan losses, declining capital ratios, or regulatory concerns, its board may voluntarily cut the dividend to preserve capital. In more severe cases, regulators can formally restrict or prohibit dividend payments through enforcement actions or the automatic restrictions triggered by the Prompt Corrective Action framework when capital ratios fall below buffer thresholds.\n\nHigh-growth banks sometimes pay low or no dividends by choice, preferring to retain earnings to fund loan growth, branch expansion, or acquisitions. These banks prioritize capital deployment for growth over current income distribution, similar to growth-oriented companies in other sectors.\n\nMutual holding company structures present a unique situation. Banks organized as mutual holding companies (MHCs) may trade publicly but have a controlling mutual parent that limits the dividend capacity available to minority public shareholders. These banks often pay lower dividends than fully converted stock banks.\n\nAmong established, profitable, fully converted stock banks, dividend payment is the norm. Many bank investors specifically seek out the sector for its income characteristics, and bank management teams are generally aware that consistent dividend payments are an important component of their total shareholder return proposition.',
    relatedMetrics: ['dividend-payout-ratio', 'roe', 'earnings-per-share'],
    relatedValuations: ['dividend-discount-model'],
    relatedFaqs: ['good-dividend-payout-ratio-for-banks', 'how-to-evaluate-dividend-safety', 'why-regulators-restrict-dividends'],
    relatedGlossaryTerms: ['Dividend Payout Ratio', 'De Novo Bank', 'Mutual Holding Company (MHC)'],
    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Screen bank stocks by dividend payout ratio to find dividend payers'
    },
    metaTitle: 'Do All Bank Stocks Pay Dividends? | BankSift',
    metaDescription: 'Learn which bank stocks pay dividends and which do not, including de novo banks, stressed banks, high-growth banks, and mutual holding company structures.'
  },
  {
    slug: 'good-dividend-payout-ratio-for-banks',
    question: 'What is a good dividend payout ratio for a bank?',
    cluster: 'dividends',
    clusterName: 'Bank Dividends and Shareholder Returns',
    intentType: 'evaluative',
    shortAnswer: 'A good dividend payout ratio for most banks falls between 25% and 45% of earnings, balancing meaningful income distribution to shareholders with sufficient earnings retention to maintain capital ratios and fund growth',
    fullAnswer: 'The dividend payout ratio measures the percentage of net income paid out as dividends. A bank earning $100 million and paying $35 million in dividends has a 35% payout ratio, retaining the other 65% to build capital and fund growth.\n\nFor U.S. commercial banks, payout ratios between 25% and 45% are most common among well-run institutions. This range allows the bank to provide a meaningful dividend yield while retaining enough earnings to grow tangible book value, maintain regulatory capital buffers, and fund organic balance sheet growth.\n\nPayout ratios below 25% may indicate a bank that is prioritizing capital accumulation, perhaps in anticipation of acquisitions, elevated loan growth, or uncertain economic conditions. Some investors view very low payout ratios as a sign that the bank is hoarding capital rather than returning it efficiently, particularly if the bank already has excess capital and limited growth prospects.\n\nPayout ratios above 50% should be evaluated carefully. A bank paying out more than half its earnings has less room to absorb unexpected losses without cutting the dividend. During a credit downturn, earnings can decline significantly as provision expense rises, and a bank with a high payout ratio may be forced to cut its dividend to preserve capital. The largest U.S. banks are also subject to Federal Reserve stress testing, which evaluates whether their planned capital distributions (dividends and buybacks) are sustainable under hypothetical adverse economic scenarios.\n\nPayout ratios above 75% to 80% are generally unsustainable for banks over the long term unless the bank has significantly more capital than it needs and is deliberately paying down excess capital. Ratios above 100% mean the bank is paying more in dividends than it earns, which depletes capital and is only viable for short periods.\n\nThe appropriate payout ratio depends on the bank\'s ROE, growth prospects, and capital position. A bank with 14% ROE and a 40% payout ratio retains 60% of earnings, generating a sustainable growth rate of 8.4% (ROE times retention ratio). A bank with 8% ROE and the same 40% payout ratio generates only 4.8% sustainable growth. The interaction between payout ratio, ROE, and growth capacity is central to evaluating whether a bank\'s dividend policy is well-calibrated.',
    relatedMetrics: ['dividend-payout-ratio', 'roe', 'earnings-per-share', 'equity-to-assets'],
    relatedValuations: ['dividend-discount-model', 'gordon-growth-model'],
    relatedFaqs: ['how-to-evaluate-dividend-safety', 'roe-payout-ratio-dividend-growth', 'sustainable-growth-rate-and-dividends'],
    relatedGlossaryTerms: ['Dividend Payout Ratio', 'Retention Ratio', 'Sustainable Growth Rate'],
    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Compare dividend payout ratios across 300+ bank stocks in the screener'
    },
    metaTitle: 'What Is a Good Dividend Payout Ratio for Banks? | BankSift',
    metaDescription: 'Learn what dividend payout ratio range is typical for well-run banks, what high and low ratios signal, and how payout ratio connects to ROE and growth capacity.'
  },
  {
    slug: 'how-to-evaluate-dividend-safety',
    question: 'How do I evaluate whether a bank\'s dividend is safe?',
    cluster: 'dividends',
    clusterName: 'Bank Dividends and Shareholder Returns',
    intentType: 'strategic',
    shortAnswer: 'Evaluating dividend safety requires examining the payout ratio, the bank\'s capital position relative to regulatory minimums, earnings stability, credit quality trends, and whether the bank has a history of maintaining or growing its dividend through economic cycles',
    fullAnswer: 'Dividend safety analysis for banks involves several interconnected factors that together indicate whether the current dividend level is sustainable through both good times and periods of stress.\n\nStart with the payout ratio. A payout ratio below 50% provides a meaningful earnings cushion. If earnings decline by 30% during a downturn, a bank with a 40% payout ratio still covers its dividend (the effective payout ratio rises to about 57%). A bank starting at 70% would see its payout ratio exceed 100% under the same earnings decline, making a cut likely.\n\nExamine the bank\'s capital ratios relative to regulatory minimums and internal targets. The CET1 ratio is the most important measure. Banks typically set internal capital targets well above regulatory minimums (often 100 to 200 basis points above) to maintain flexibility. A bank with CET1 of 12% against a minimum requirement of 7% (including buffers) has 500 basis points of excess capital. A bank with CET1 of 8% has only 100 basis points of cushion, and a credit cycle downturn could quickly erode that buffer and force a dividend reduction.\n\nAssess earnings quality and stability. Banks with high net interest margins, diversified revenue streams, and conservative loan portfolios tend to have more stable earnings through cycles. A bank that derives 90% of revenue from net interest income on a concentrated commercial real estate portfolio has less earnings stability than a diversified institution with significant fee income.\n\nReview credit quality trends. Rising non-performing loans, increasing net charge-offs, and a declining reserve coverage ratio all indicate future earnings pressure from higher provision expense. Credit deterioration is the most common reason banks cut dividends.\n\nLook at the bank\'s dividend history. Banks that have maintained or grown their dividend through previous economic downturns demonstrate both the financial capacity and the management commitment to sustaining distributions. A history of dividend cuts or suspensions during prior stress periods suggests the bank may repeat that pattern.\n\nFor the largest U.S. banks, Federal Reserve stress test results provide an additional data point. The stress capital buffer requirement, derived from stress test results, directly affects how much capital the bank can distribute. Banks whose capital ratios decline significantly under the Fed\'s adverse scenario have less room for distributions.',
    relatedMetrics: ['dividend-payout-ratio', 'roe', 'cet1-capital-ratio', 'non-performing-loans-ratio', 'net-charge-off-ratio'],
    relatedValuations: ['dividend-discount-model'],
    relatedFaqs: ['good-dividend-payout-ratio-for-banks', 'why-regulators-restrict-dividends', 'roe-payout-ratio-dividend-growth', 'screen-for-safe-high-dividend-banks'],
    relatedGlossaryTerms: ['Dividend Payout Ratio', 'Common Equity Tier 1 (CET1)', 'Stress Capital Buffer (SCB)'],
    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Screen banks by payout ratio, ROE, and capital ratios to identify safe dividend payers'
    },
    metaTitle: 'How to Evaluate Bank Dividend Safety | BankSift',
    metaDescription: 'Learn how to assess whether a bank\'s dividend is sustainable by examining payout ratio, capital buffers, earnings stability, credit quality, and dividend history.'
  },
  {
    slug: 'roe-payout-ratio-dividend-growth',
    question: 'What is the relationship between ROE, payout ratio, and dividend growth?',
    cluster: 'dividends',
    clusterName: 'Bank Dividends and Shareholder Returns',
    intentType: 'conceptual',
    shortAnswer: 'ROE, payout ratio, and dividend growth are linked through the sustainable growth rate formula: a bank\'s maximum sustainable growth rate equals ROE multiplied by the retention ratio (1 minus payout ratio), which in turn determines how fast dividends can grow over time',
    fullAnswer: 'The relationship between ROE, payout ratio, and dividend growth is one of the most important frameworks in bank stock analysis. It connects a bank\'s profitability, capital allocation decisions, and the long-term income growth investors can expect.\n\nThe sustainable growth rate formula is: Sustainable Growth Rate = ROE x (1 - Payout Ratio). The term (1 - Payout Ratio) is the retention ratio, representing the share of earnings kept to grow the business. A bank with 12% ROE and a 40% payout ratio retains 60% of earnings, producing a sustainable growth rate of 7.2%. This means the bank can grow its equity, assets, earnings, and dividends at approximately 7.2% per year without raising additional capital.\n\nThis formula works because retained earnings flow directly into shareholders\' equity, which supports additional lending and asset growth (constrained by capital adequacy requirements). As the asset base grows, earnings grow (assuming stable margins and efficiency), and dividends grow in proportion.\n\nThe trade-off embedded in this relationship is direct. A higher payout ratio delivers more current income but reduces the retention ratio and therefore the sustainable growth rate. A lower payout ratio sacrifices current income for faster future growth. A bank with 12% ROE paying out 60% of earnings yields a sustainable growth rate of only 4.8%, while a bank with the same ROE paying out 30% achieves 8.4%.\n\nROE is the critical variable that determines how generous a bank can be with both current dividends and future growth. A bank with 15% ROE can maintain a 45% payout ratio and still achieve an 8.25% sustainable growth rate. A bank with 8% ROE paying the same 45% can only sustain 4.4% growth. This is why high-ROE banks can offer both attractive current yields and dividend growth, while low-ROE banks face a starker trade-off.\n\nThis framework also connects to valuation. The Gordon Growth Model prices a stock as D1 / (r - g), where g is the sustainable growth rate. Banks with higher ROE can sustain higher growth rates, justifying higher valuation multiples. The justified P/B ratio (from the ROE-P/B framework) is directly derived from this relationship: banks that earn high returns on equity and retain a meaningful share of earnings to fuel growth deserve to trade at premiums to book value.',
    relatedMetrics: ['roe', 'dividend-payout-ratio', 'earnings-per-share', 'book-value-per-share'],
    relatedValuations: ['gordon-growth-model', 'dividend-discount-model', 'roe-pb-framework'],
    relatedFaqs: ['good-dividend-payout-ratio-for-banks', 'sustainable-growth-rate-and-dividends', 'why-roe-important-for-banks'],
    relatedGlossaryTerms: ['Sustainable Growth Rate', 'Retention Ratio', 'Dividend Payout Ratio', 'Equity Multiplier'],
    cta: {
      type: 'learn-metric',
      target: '/metrics/roe',
      text: 'Learn more about ROE and its role in bank dividend and growth analysis'
    },
    metaTitle: 'ROE, Payout Ratio, and Dividend Growth for Banks | BankSift',
    metaDescription: 'Understand how ROE, payout ratio, and dividend growth connect through the sustainable growth rate formula, and why ROE drives both income and growth for bank stocks.'
  },
  {
    slug: 'why-regulators-restrict-dividends',
    question: 'Why do regulators sometimes restrict bank dividends?',
    cluster: 'dividends',
    clusterName: 'Bank Dividends and Shareholder Returns',
    intentType: 'conceptual',
    shortAnswer: 'Regulators restrict bank dividends to preserve capital when a bank\'s financial condition deteriorates, ensuring the institution retains enough earnings to absorb losses and protect depositors rather than distributing capital to shareholders',
    fullAnswer: 'Bank regulators view dividend payments differently than dividends at non-financial companies because banks hold deposits backed by federal insurance, and undercapitalized banks pose risks to the deposit insurance fund and the broader financial system. Dividend restrictions are one of the primary tools regulators use to ensure banks maintain adequate capital.\n\nThe most common mechanism is automatic restriction through the capital conservation buffer. Under Basel III rules, a bank whose CET1 ratio falls into the capital conservation buffer zone (below 7.0% but above the 4.5% minimum) faces progressively tighter limits on the percentage of earnings it can distribute. At the bottom of the buffer, no distributions are permitted. These restrictions apply by formula and do not require a specific regulatory order.\n\nFor the largest U.S. banks, the Federal Reserve\'s stress testing program adds another layer. Banks must demonstrate through annual stress tests that they can maintain capital above minimum levels even under a severely adverse economic scenario while continuing planned capital distributions. The stress capital buffer (SCB), calibrated to each bank\'s stress test results, replaces the standard 2.5% conservation buffer and can be significantly higher for banks with riskier profiles. Banks that fail to clear these hurdles must reduce their planned distributions.\n\nBeyond these formulaic mechanisms, regulators can impose discretionary dividend restrictions through formal or informal supervisory actions. If examiners determine that a bank\'s condition, risk profile, or earnings outlook does not support continued dividend payments, they can issue a cease-and-desist order, a memorandum of understanding, or other supervisory directives requiring the bank to suspend or reduce dividends. These actions typically occur when banks face significant credit quality deterioration, operational problems, or compliance failures.\n\nDuring periods of systemic stress, regulators may impose industry-wide restrictions. During the early months of the COVID-19 pandemic in 2020, the Federal Reserve restricted dividends and share buybacks for the largest banks to preserve capital across the system, even for banks that were individually well-capitalized.\n\nFor investors, regulatory dividend restrictions are a lagging indicator of financial stress. By the time regulators formally restrict dividends, the underlying problems are typically already reflected in the bank\'s financial metrics. Monitoring capital ratios, credit quality, and earnings trends allows investors to anticipate potential restrictions before they are imposed.',
    relatedMetrics: ['cet1-capital-ratio', 'dividend-payout-ratio', 'roe', 'non-performing-loans-ratio'],
    relatedValuations: [],
    relatedFaqs: ['what-happens-below-minimum-capital', 'how-to-evaluate-dividend-safety', 'good-dividend-payout-ratio-for-banks'],
    relatedGlossaryTerms: ['Capital Conservation Buffer', 'Stress Capital Buffer (SCB)', 'Common Equity Tier 1 (CET1)', 'Dividend Payout Ratio'],
    cta: {
      type: 'learn-faq',
      target: '/faq/what-happens-below-minimum-capital',
      text: 'Learn what happens when a bank falls below minimum capital requirements'
    },
    metaTitle: 'Why Do Regulators Restrict Bank Dividends? | BankSift',
    metaDescription: 'Learn why and how banking regulators restrict dividends, including capital buffer triggers, stress testing requirements, and discretionary supervisory actions.'
  },
  {
    slug: 'how-bank-buybacks-work',
    question: 'How do share buybacks work for bank stocks?',
    cluster: 'dividends',
    clusterName: 'Bank Dividends and Shareholder Returns',
    intentType: 'definitional',
    shortAnswer: 'Share buybacks allow banks to repurchase their own shares on the open market, reducing shares outstanding and increasing per-share metrics like EPS and BVPS, subject to regulatory capital constraints and, for the largest banks, Federal Reserve stress test approval',
    fullAnswer: 'Share buybacks (also called share repurchases) occur when a bank uses its earnings or excess capital to buy back its own common stock from shareholders on the open market. The repurchased shares are either retired (permanently reducing shares outstanding) or held as treasury stock.\n\nThe mechanical effect of a buyback is straightforward. If a bank has 100 million shares outstanding and repurchases 5 million, it now has 95 million shares outstanding. Assuming net income stays the same, earnings per share increases by approximately 5.3% ($100 million in earnings divided by 95 million shares instead of 100 million). Book value per share also increases if shares are repurchased below book value, because the bank is buying equity for less than its accounting value.\n\nBanks use buybacks as a complement to dividends for returning capital to shareholders. Buybacks offer more flexibility than dividends because they can be increased, decreased, or paused without the negative market signal that accompanies a dividend cut. This makes buybacks particularly attractive for managing capital levels around a target range.\n\nRegulatory considerations are important for bank buybacks. Like dividends, buybacks consume capital and are subject to the same capital conservation buffer restrictions. For the largest U.S. banks, share repurchase plans are submitted as part of the capital planning process connected to Federal Reserve stress testing. Banks must demonstrate they can maintain adequate capital ratios under stress scenarios even after executing their planned buybacks.\n\nThe value of a buyback to shareholders depends heavily on the price paid. A bank repurchasing shares at 0.8x tangible book value is acquiring its own equity at a discount, creating value for remaining shareholders. A bank repurchasing at 2.0x tangible book value is paying a significant premium, and that capital might have been better deployed through organic growth, acquisitions, or higher dividends. Many bank analysts evaluate the effectiveness of capital return programs by comparing the buyback price to tangible book value and the bank\'s estimated intrinsic value.\n\nBuyback activity in the banking sector tends to be cyclical. Banks increase repurchases when capital ratios are strong, earnings are robust, and stock prices appear attractive. They reduce or suspend buybacks during periods of economic uncertainty, credit stress, or when capital needs to be preserved for growth or loss absorption.',
    relatedMetrics: ['earnings-per-share', 'book-value-per-share', 'tangible-book-value-per-share', 'price-to-book', 'dividend-payout-ratio'],
    relatedValuations: ['price-to-tangible-book-valuation'],
    relatedFaqs: ['dividends-vs-buybacks', 'what-is-capital-return-plan', 'good-dividend-payout-ratio-for-banks'],
    relatedGlossaryTerms: ['Dividend Payout Ratio', 'Tangible Book Value Per Share (TBVPS)', 'Common Equity Tier 1 (CET1)'],
    cta: {
      type: 'learn-faq',
      target: '/faq/dividends-vs-buybacks',
      text: 'Compare dividends and buybacks as capital return methods for bank shareholders'
    },
    metaTitle: 'How Do Share Buybacks Work for Bank Stocks? | BankSift',
    metaDescription: 'Learn how bank share buyback programs work, their effect on per-share metrics, regulatory constraints, and how to evaluate whether buybacks create shareholder value.'
  },
  {
    slug: 'dividends-vs-buybacks',
    question: 'What is the difference between dividends and share buybacks for bank shareholders?',
    cluster: 'dividends',
    clusterName: 'Bank Dividends and Shareholder Returns',
    intentType: 'comparative',
    shortAnswer: 'Dividends provide direct cash income to all shareholders equally, while buybacks reduce shares outstanding to increase per-share value, with each method offering different tax treatment, flexibility, and signaling characteristics',
    fullAnswer: 'Dividends and share buybacks are the two primary mechanisms banks use to return capital to shareholders, and they serve different purposes with different characteristics.\n\nDividends are cash payments distributed to all shareholders proportionally. A bank paying a $0.50 quarterly dividend sends that amount to every shareholder for each share held. Dividends provide predictable, recurring income that many investors depend on for cash flow. Once established, dividends carry a strong implicit commitment; cutting a dividend is viewed very negatively by the market and typically signals financial distress. This commitment is both a strength (it disciplines management and signals confidence) and a constraint (it reduces flexibility during downturns).\n\nShare buybacks are discretionary purchases of the bank\'s own stock on the open market. They benefit remaining shareholders by increasing their proportional ownership and boosting per-share metrics. Buybacks do not provide direct cash to shareholders unless they choose to sell shares. The primary advantage of buybacks is flexibility. A bank can scale buybacks up or down quarter to quarter without the negative signaling associated with changing the dividend. This makes buybacks the preferred tool for distributing capital above and beyond the regular dividend.\n\nTax treatment differs. Dividends are taxed as ordinary income or qualified dividend income in the year received. Buybacks create no immediate tax event for shareholders who do not sell; the benefit accrues through capital appreciation, which is taxed only when shares are eventually sold and potentially at long-term capital gains rates.\n\nFor bank investors specifically, the distinction has practical implications. Income-focused investors (retirees, endowments, income funds) generally prefer dividends for their predictability and cash flow. Total-return investors may prefer buybacks, particularly when the stock trades below intrinsic value, because the per-share value accretion compounds over time.\n\nMost well-capitalized banks employ both tools simultaneously: a regular quarterly dividend sized at a sustainable level (typically 25% to 45% of earnings) supplemented by buybacks that vary with the stock price, capital position, and economic outlook. The total capital return (dividends plus buybacks) as a percentage of earnings is sometimes called the total payout ratio, and for healthy banks it often ranges from 60% to 100% of annual earnings.',
    relatedMetrics: ['dividend-payout-ratio', 'earnings-per-share', 'book-value-per-share', 'price-to-book'],
    relatedValuations: ['dividend-discount-model'],
    relatedFaqs: ['how-bank-buybacks-work', 'good-dividend-payout-ratio-for-banks', 'what-is-capital-return-plan'],
    relatedGlossaryTerms: ['Dividend Payout Ratio', 'Retention Ratio'],
    cta: {
      type: 'learn-faq',
      target: '/faq/what-is-capital-return-plan',
      text: 'Learn about bank capital return plans and how dividends and buybacks fit together'
    },
    metaTitle: 'Dividends vs Share Buybacks for Bank Stocks | BankSift',
    metaDescription: 'Compare dividends and share buybacks for bank shareholders, including income characteristics, tax treatment, flexibility, and how most banks use both together.'
  },
  {
    slug: 'screen-for-safe-high-dividend-banks',
    question: 'How do I screen for high-dividend bank stocks that are still safe?',
    cluster: 'dividends',
    clusterName: 'Bank Dividends and Shareholder Returns',
    intentType: 'strategic',
    shortAnswer: 'Screening for safe high-dividend banks involves filtering for above-average dividend payout ratios while also screening for strong ROE, adequate capital ratios, and stable credit quality to avoid banks paying unsustainable dividends',
    fullAnswer: 'Finding high-dividend bank stocks that are genuinely safe requires balancing yield against financial strength. A high dividend that gets cut is worse than a moderate dividend that grows steadily. The screening approach should combine income metrics with quality filters.\n\nStart with the dividend payout ratio rather than dividend yield. Payout ratio directly measures how much of the bank\'s earnings are being distributed, making it a better indicator of sustainability. Filter for payout ratios between 30% and 50%. This range identifies banks paying above-average dividends while retaining enough earnings to maintain capital and fund growth. Avoid banks with payout ratios above 70%, as these have minimal earnings cushion.\n\nAdd a profitability filter. Require ROE above 9% or 10%. A high payout ratio combined with high ROE is sustainable because the bank generates strong enough returns that even after paying a generous dividend, retained earnings still grow capital at a reasonable pace. A high payout ratio with low ROE means the bank cannot afford its dividend if earnings decline even modestly.\n\nInclude a capital adequacy check. Filter for equity-to-assets above 8% (or, if available, CET1 above 9% to 10%). Banks with strong capital buffers above regulatory minimums can sustain dividends through credit cycle downturns without triggering regulatory restrictions.\n\nApply a credit quality filter to exclude banks with deteriorating loan portfolios. Screening for non-performing loans as a percentage of total loans below 1.5% to 2.0% helps exclude banks where rising credit costs may soon pressure earnings and force dividend reductions.\n\nConsider efficiency ratio as an additional quality indicator. Banks with efficiency ratios below 65% tend to have more stable earnings because their cost structure leaves more room for margins even when revenue growth slows.\n\nAfter applying these combined filters, review the remaining banks individually. Check the dividend history (has the bank maintained or grown its dividend over the past five to 10 years?), review the trend in credit quality metrics, and consider the bank\'s geographic and loan concentration risks. Quantitative screens identify candidates, but qualitative review determines which are genuinely suitable for an income-focused portfolio.',
    relatedMetrics: ['dividend-payout-ratio', 'roe', 'equity-to-assets', 'non-performing-loans-ratio', 'efficiency-ratio'],
    relatedValuations: ['dividend-discount-model'],
    relatedFaqs: ['good-dividend-payout-ratio-for-banks', 'how-to-evaluate-dividend-safety', 'filters-for-dividend-income-banks'],
    relatedGlossaryTerms: ['Dividend Payout Ratio', 'Retention Ratio'],
    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Screen 300+ banks by payout ratio, ROE, and capital strength to find safe dividend payers'
    },
    metaTitle: 'How to Screen for Safe High-Dividend Bank Stocks | BankSift',
    metaDescription: 'Learn how to screen for high-dividend bank stocks that are still safe by combining payout ratio, ROE, capital adequacy, and credit quality filters.'
  },
  {
    slug: 'what-is-capital-return-plan',
    question: 'What is a bank\'s capital return plan?',
    cluster: 'dividends',
    clusterName: 'Bank Dividends and Shareholder Returns',
    intentType: 'definitional',
    shortAnswer: 'A capital return plan is a bank\'s strategy for distributing excess capital to shareholders through dividends and share buybacks, typically sized based on earnings projections, target capital ratios, and for the largest banks, Federal Reserve stress test results',
    fullAnswer: 'A bank\'s capital return plan outlines how the institution intends to distribute earnings and excess capital to shareholders over a defined period, usually on an annual or quarterly basis. It encompasses both the regular dividend program and any planned share repurchases.\n\nThe plan starts with the bank\'s capital framework. Management and the board set target capital ratios (typically expressed as a CET1 target or range) based on the bank\'s risk profile, growth plans, and regulatory requirements. Capital generated through earnings that exceeds what is needed to maintain these targets and fund planned growth becomes available for distribution.\n\nFor most banks, the capital return plan follows a priority structure. The regular quarterly dividend is the first commitment, sized at a level management believes is sustainable through a full economic cycle. This typically consumes 25% to 45% of normalized earnings. Incremental capital return above the dividend comes through share buybacks, which are adjusted quarter to quarter based on the stock price, capital position, and economic outlook. Some banks also pursue periodic special dividends when excess capital accumulates beyond what can be deployed productively.\n\nFor the largest U.S. banks (those subject to Federal Reserve stress testing), the capital return plan is formally constrained by the stress capital buffer. After annual stress tests, each large bank receives a stress capital buffer requirement that determines how much capital it must hold above the minimum CET1 ratio. The bank\'s planned distributions (dividends plus buybacks) must not cause its capital ratios to fall below this requirement under the stress scenario. This effectively caps the total amount of capital that can be returned.\n\nInvestors can find information about a bank\'s capital return plans in several places: quarterly earnings releases and investor presentations often discuss capital priorities and buyback authorizations, proxy statements disclose dividend policies, and for large banks, the annual Comprehensive Capital Analysis and Review (CCAR) results provide details on planned distributions and regulatory feedback.\n\nA well-constructed capital return plan balances four objectives: maintaining adequate capital for safety and regulatory compliance, funding organic growth in loans and other earning assets, pursuing strategic opportunities (acquisitions), and returning excess capital to shareholders. Banks that consistently return 60% to 100% of annual earnings through dividends and buybacks while maintaining stable or growing capital ratios are demonstrating effective capital management.',
    relatedMetrics: ['dividend-payout-ratio', 'roe', 'cet1-capital-ratio', 'earnings-per-share', 'book-value-per-share'],
    relatedValuations: ['excess-capital-return-model'],
    relatedFaqs: ['how-bank-buybacks-work', 'dividends-vs-buybacks', 'good-dividend-payout-ratio-for-banks', 'why-regulators-restrict-dividends'],
    relatedGlossaryTerms: ['Dividend Payout Ratio', 'Excess Capital', 'Common Equity Tier 1 (CET1)', 'Stress Capital Buffer (SCB)'],
    cta: {
      type: 'learn-faq',
      target: '/faq/how-to-evaluate-dividend-safety',
      text: 'Learn how to evaluate whether a bank\'s dividend and capital return plan is sustainable'
    },
    metaTitle: 'What Is a Bank Capital Return Plan? | BankSift',
    metaDescription: 'Learn what a bank capital return plan includes, how dividends and buybacks are sized, the role of stress testing for large banks, and what to look for as an investor.'
  },
  {
    slug: 'sustainable-growth-rate-and-dividends',
    question: 'What is the sustainable growth rate and how does it relate to bank dividends?',
    cluster: 'dividends',
    clusterName: 'Bank Dividends and Shareholder Returns',
    intentType: 'conceptual',
    shortAnswer: 'The sustainable growth rate is the maximum rate at which a bank can grow its assets, earnings, and dividends without raising additional equity, calculated as ROE multiplied by the retention ratio (1 minus the dividend payout ratio)',
    fullAnswer: 'The sustainable growth rate (SGR) represents the fastest pace at which a bank can expand its balance sheet and earnings using only internally generated capital (retained earnings) while maintaining its current capital ratios. The formula is: Sustainable Growth Rate = ROE x (1 - Payout Ratio).\n\nThis formula captures a fundamental constraint of the banking business model. Banks are required to maintain minimum capital ratios, which means every dollar of asset growth must be supported by a proportional amount of equity. Retained earnings are the primary source of new equity for most banks. The sustainable growth rate quantifies how fast retained earnings can accumulate relative to the existing equity base.\n\nThe connection to dividends is direct and mechanical. Every dollar paid out as a dividend is a dollar that does not add to equity and therefore cannot support additional asset growth. A bank with 12% ROE that retains all its earnings (0% payout ratio) can grow at 12% per year. The same bank paying out 50% of earnings can only grow at 6%. Paying out 75% limits growth to 3%.\n\nThis creates a tangible trade-off that bank management teams and investors must navigate. Higher current dividends reduce the sustainable growth rate, which in turn limits future earnings growth and therefore future dividend growth. The optimal balance depends on the bank\'s growth opportunities. A bank operating in high-growth markets with ample lending demand should lean toward retention to capitalize on those opportunities. A bank in a mature, slow-growth market may be better served by distributing more capital, since retaining earnings it cannot deploy productively would depress ROE.\n\nThe sustainable growth rate also connects to valuation. In the Gordon Growth Model (P = D1 / (r - g)), the growth rate g is often estimated using the sustainable growth rate formula. A bank with higher ROE can sustain a higher growth rate for any given payout ratio, justifying a higher valuation multiple. This is the link between profitability, capital allocation, and what investors should be willing to pay for the stock.\n\nIf a bank grows faster than its sustainable growth rate for an extended period, it must eventually raise additional equity (through stock issuance) or reduce its growth rate. Growth funded by dilutive equity issuance may increase total earnings but does not necessarily increase per-share value, which is what matters to existing shareholders.',
    relatedMetrics: ['roe', 'dividend-payout-ratio', 'book-value-per-share', 'earnings-per-share'],
    relatedValuations: ['gordon-growth-model', 'dividend-discount-model', 'roe-pb-framework'],
    relatedFaqs: ['roe-payout-ratio-dividend-growth', 'good-dividend-payout-ratio-for-banks', 'why-roe-important-for-banks'],
    relatedGlossaryTerms: ['Sustainable Growth Rate', 'Retention Ratio', 'Dividend Payout Ratio', 'Gordon Growth Model'],
    cta: {
      type: 'learn-metric',
      target: '/metrics/roe',
      text: 'Learn more about ROE and its role in determining bank growth capacity'
    },
    metaTitle: 'Sustainable Growth Rate and Bank Dividends | BankSift',
    metaDescription: 'Learn what the sustainable growth rate means for banks, how it is calculated from ROE and payout ratio, and why it determines the trade-off between dividends and growth.'
  }
];

export default CLUSTER_7_FAQS;

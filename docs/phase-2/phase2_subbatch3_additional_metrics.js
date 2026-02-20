// ============================================================================
// PHASE 2 / BATCH 2 — SUB-BATCH 3: ADDITIONAL PROFITABILITY, VALUATION &
// EFFICIENCY/FUNDING METRICS (9 entries)
// ============================================================================
// Target file: src/data/content/metrics.js (append to METRICS array)
// All entries are isEducationalOnly: true (not in screener)
//
// Entries in this file:
//   PROFITABILITY (3):
//     return-on-tangible-common-equity  — category: 'profitability'
//     pre-provision-net-revenue         — category: 'profitability'
//     net-overhead-ratio                — category: 'efficiency'
//   VALUATION (2):
//     price-to-tangible-book-value      — category: 'valuation'
//     tangible-book-value-per-share     — category: 'valuation'
//   EFFICIENCY/FUNDING (4):
//     cost-of-funds                     — category: 'efficiency'
//     cost-of-deposits                  — category: 'efficiency'
//     non-interest-income-to-revenue    — category: 'efficiency'
//     interest-income-to-earning-assets — category: 'efficiency'
//
// SLUG REFERENCE (for cross-link validation):
// -----------------------------------------------
// EXISTING METRIC SLUGS:
//   roe, roaa, net-interest-margin, efficiency-ratio, price-to-book,
//   price-to-earnings, earnings-per-share, book-value-per-share,
//   equity-to-assets, loans-to-deposits, deposits-to-assets,
//   loans-to-assets, dividend-payout-ratio
//
// NEW METRIC SLUGS (Sub-batch 1 — Capital Strength):
//   cet1-capital-ratio, tier-1-capital-ratio, total-capital-ratio,
//   tier-1-leverage-ratio, supplementary-leverage-ratio,
//   tangible-common-equity-ratio, risk-weighted-assets-density
//
// NEW METRIC SLUGS (Sub-batch 2 — Asset Quality):
//   non-performing-loans-ratio, non-performing-assets-ratio,
//   net-charge-off-ratio, loan-loss-reserve-ratio, reserve-coverage-ratio,
//   texas-ratio, provision-to-average-loans
//
// NEW METRIC SLUGS (this sub-batch):
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
// ============================================================================

const ADDITIONAL_METRICS = [
  // =========================================================================
  // 1. Return on Tangible Common Equity (ROTCE)
  // =========================================================================
  {
    slug: 'return-on-tangible-common-equity',
    name: 'Return on Tangible Common Equity (ROTCE)',
    category: 'profitability',
    categoryLabel: 'Profitability Ratio',
    formula: 'ROTCE = Net Income / Average Tangible Common Equity',
    isPercentage: true,
    shortDescription: 'Measures net income as a percentage of average tangible common equity, providing a profitability view that strips out goodwill and intangible assets from the equity base',
    description: 'Return on Tangible Common Equity divides net income available to common shareholders by average tangible common equity. Tangible common equity equals total common equity minus goodwill and other intangible assets. ROTCE is widely used by bank analysts because it measures the return generated on the hard capital invested in the business, excluding the accounting artifacts of past acquisition premiums. For banks that have grown through M&A, ROTCE provides a more operationally meaningful profitability measure than standard ROE.',
    formulaExplanation: 'The numerator is net income available to common shareholders (net income minus preferred dividends). The denominator is average tangible common equity for the period, calculated by subtracting goodwill and other intangible assets from average total common shareholders\' equity. Average tangible common equity is typically computed as the simple average of beginning and ending period balances, though some banks use a more granular daily or monthly average. Both the numerator and denominator exclude preferred stock effects.',
    interpretation: 'A higher ROTCE indicates more efficient use of tangible capital. Because the denominator is smaller than total equity (goodwill and intangibles are removed), ROTCE is always equal to or higher than ROE for the same bank. The spread between ROE and ROTCE reveals how much goodwill and intangibles are depressing the standard return measure. For banks with minimal intangible assets, ROTCE and ROE will be nearly identical.',
    typicalRange: 'Well-managed US banks typically achieve ROTCE between 12% and 20% during normal conditions. Banks with significant goodwill may show ROTCE 2 to 5 percentage points above their ROE, depending on the magnitude of intangibles relative to total equity. Money center banks, which often carry substantial goodwill from decades of acquisitions, frequently report ROTCE as their primary profitability metric in earnings releases and investor presentations.',
    goodBad: {
      good: 'ROTCE above 15% indicates strong profitability on tangible capital. Ratios above 18% place a bank among the top performers. Consistently high ROTCE suggests the bank generates attractive returns on its deployed capital, supporting both dividend payments and internal capital generation through retained earnings.',
      bad: 'ROTCE below 10% suggests the bank is earning below its cost of equity on tangible capital, which should be at least 10% to 12% for most banks given the risk profile of banking. ROTCE below the bank\'s cost of equity indicates value destruction on a tangible capital basis, even if ROE appears acceptable because of goodwill inflation.',
    },
    considerations: [
      'ROTCE is a non-GAAP metric that banks report voluntarily. Calculation methodologies can vary, particularly regarding the treatment of AOCI, deferred tax assets, and mortgage servicing rights. When comparing ROTCE across banks, verify the reconciliation provided in each bank\'s earnings release.',
      'A bank can improve ROTCE through goodwill impairment (which reduces the denominator without improving earnings), share buybacks at prices below tangible book value, or by avoiding acquisitions that create goodwill. These mechanical effects should be distinguished from genuine operational improvement.',
      'ROTCE strips out intangibles but does not adjust the numerator for amortization of intangible assets. A bank with significant intangible asset amortization (such as core deposit intangibles from acquisitions) has its net income reduced by that expense. Some analysts add back intangible amortization to the numerator for a "cash" ROTCE.',
      'The spread between ROE and ROTCE provides a quick read on a bank\'s acquisition history. A bank with ROE of 11% and ROTCE of 16% has significant goodwill and intangibles; one with ROE of 11% and ROTCE of 11.5% has grown primarily organically.',
    ],
    relatedMetrics: ['roe', 'roaa', 'tangible-common-equity-ratio', 'tangible-book-value-per-share', 'price-to-tangible-book-value', 'book-value-per-share'],
    relatedMetricDescriptions: {
      'roe': 'ROE uses total common equity in the denominator, including goodwill and intangibles; the spread between ROE and ROTCE reflects the impact of intangible assets on measured profitability.',
      'roaa': 'ROAA removes both leverage and equity composition effects by using total assets, complementing ROTCE\'s focus on tangible capital returns.',
      'tangible-common-equity-ratio': 'TCE Ratio measures the tangible equity base that generates ROTCE, connecting capital adequacy to profitability.',
      'tangible-book-value-per-share': 'TBVPS expresses the ROTCE denominator on a per-share basis, linking tangible profitability to per-share valuation.',
      'price-to-tangible-book-value': 'P/TBV is the valuation multiple that pairs with ROTCE, analogous to how P/B pairs with ROE in the justified P/B framework.',
      'book-value-per-share': 'BVPS includes goodwill and intangibles; comparing BVPS to TBVPS reveals the per-share impact of intangible assets.',
    },
    isEducationalOnly: true,
    whereToFindData: 'ROTCE is widely reported by large and mid-size banks as a non-GAAP financial measure in quarterly earnings releases and investor presentations, with a reconciliation to GAAP ROE. For banks that do not disclose ROTCE, it can be calculated from 10-K and 10-Q data using net income (adjusted for preferred dividends) and tangible common equity (total equity minus preferred stock minus goodwill minus intangibles).',
    bankSpecificContext: 'ROTCE has become the preferred profitability metric for bank management teams and sell-side analysts because it removes the distortion created by acquisition-related intangibles. When a bank acquires another institution at a premium to tangible book value, the excess is recorded as goodwill. This goodwill inflates the equity denominator in ROE without generating any incremental earnings, mechanically depressing ROE. ROTCE solves this problem by measuring returns on the tangible capital actually deployed in the business. For serial acquirers, ROTCE can be 3 to 5 or more percentage points above ROE.',
    metricConnections: 'ROTCE = ROE x (Common Equity / Tangible Common Equity). This relationship shows that ROTCE exceeds ROE by a factor determined by the intangible asset burden. ROTCE also connects to valuation: just as ROE determines the justified P/B multiple, ROTCE determines the justified P/TBV multiple. P/TBV = (ROTCE - g) / (r - g), where g is the sustainable growth rate and r is the cost of equity. A bank with 15% ROTCE, 3% growth, and 10% cost of equity has a justified P/TBV of approximately 1.7x. ROTCE multiplied by the retention ratio gives the tangible equity growth rate.',
    commonPitfalls: 'Comparing ROTCE across banks without verifying calculation methodology can produce misleading conclusions. Some banks exclude AOCI from tangible equity, others include it; some deduct all intangibles, others retain mortgage servicing rights. These differences can move ROTCE by several percentage points. Additionally, very high ROTCE does not automatically signal superior management; it can also indicate thin tangible capital (a very small denominator), which may mean the bank lacks adequate capital cushion in a stress scenario.',
    acrossBankTypes: 'Money center banks and large regionals that have completed significant acquisitions typically show the largest spread between ROE and ROTCE. Community banks that have grown organically show minimal or no spread. Banks resulting from mutual-to-stock conversions often carry no goodwill at all, making ROE and ROTCE identical. Among the largest US banks, ROTCE has become the standard profitability measure cited in earnings calls and annual reports.',
    whatDrivesMetric: 'ROTCE is driven by the same income factors as ROE (net interest income, fee income, operating efficiency, provision expense, and tax rate) but with a different denominator. Changes in the tangible equity base through retained earnings, buybacks, and AOCI movements affect the denominator. Goodwill impairment charges reduce net income (hurting the numerator) but also reduce the denominator, and the net effect on ROTCE depends on the relative magnitudes. Acquisitions that create goodwill reduce ROE but have no direct impact on ROTCE (since the goodwill is excluded from the denominator), though the operating results of the acquired entity affect the numerator.',
    faqTeasers: [
      {
        question: 'What is return on tangible common equity (ROTCE)?',
        teaser: 'ROTCE measures profitability on the tangible capital base by excluding goodwill and intangible assets from equity, providing a clearer view of returns for banks that have grown through acquisitions.',
        faqSlug: 'what-is-rotce',
        faqCluster: 'profitability',
      },
      {
        question: 'What is the difference between ROE and ROAA for banks?',
        teaser: 'ROE measures return on shareholders\' equity while ROAA measures return on total assets, with the difference driven by leverage. Both complement ROTCE for a full profitability picture.',
        faqSlug: 'roe-vs-roaa',
        faqCluster: 'profitability',
      },
    ],
  },

  // =========================================================================
  // 2. Pre-Provision Net Revenue (PPNR)
  // =========================================================================
  {
    slug: 'pre-provision-net-revenue',
    name: 'Pre-Provision Net Revenue (PPNR)',
    category: 'profitability',
    categoryLabel: 'Profitability Ratio',
    formula: 'PPNR = Net Interest Income + Non-Interest Income - Non-Interest Expense',
    isPercentage: false,
    shortDescription: 'Measures a bank\'s core earnings power before the provision for credit losses, representing the revenue available to absorb loan losses and generate net income',
    description: 'Pre-Provision Net Revenue equals net interest income plus non-interest income minus non-interest expense. PPNR strips out the provision for credit losses and income taxes to reveal the bank\'s underlying earnings capacity before the most volatile line items. Because the provision can swing dramatically with the credit cycle, PPNR provides a more stable view of a bank\'s ability to generate revenue and control expenses. Regulators and analysts use PPNR as a measure of a bank\'s first line of defense against credit losses.',
    formulaExplanation: 'The calculation starts with net interest income (interest income minus interest expense), adds non-interest income (fee income, trading revenue, service charges, and other non-lending revenue), and subtracts non-interest expense (salaries, occupancy, technology, and other operating costs). The result is pre-tax, pre-provision earnings. Some analysts further adjust PPNR by excluding one-time items such as securities gains/losses, legal settlements, or restructuring charges to arrive at "core" or "adjusted" PPNR.',
    interpretation: 'PPNR represents the earnings capacity available to absorb credit losses. If PPNR exceeds the provision for credit losses, the bank remains profitable (before taxes). If the provision exceeds PPNR, the bank is operating at a pre-tax loss, consuming capital. A bank with strong PPNR can absorb significant credit losses without threatening capital adequacy; a bank with weak PPNR is vulnerable to even moderate credit deterioration. PPNR is typically expressed as a dollar amount, but PPNR-to-average-assets is sometimes used for cross-bank comparisons.',
    typicalRange: 'PPNR levels vary enormously by bank size. For cross-bank comparison, PPNR as a percentage of average assets is more useful, with typical values between 1.5% and 3.0% for US commercial banks. Well-run banks with strong NIMs and controlled expenses achieve PPNR-to-assets above 2.0%. Banks with low NIMs, high expense bases, or limited fee income may fall below 1.5%. Money center banks with diversified fee income streams often achieve higher PPNR-to-assets ratios than community banks that rely primarily on net interest income.',
    goodBad: {
      good: 'Strong PPNR (above 2.0% of average assets) indicates robust core earnings power. Banks with strong PPNR can absorb elevated credit losses during downturns while remaining profitable and continuing to build capital through retained earnings. Growing PPNR over time indicates improving operating leverage.',
      bad: 'Weak PPNR (below 1.5% of average assets) leaves the bank vulnerable to credit cycle downturns. If provision expense exceeds PPNR for multiple consecutive quarters, the bank is burning capital, which can lead to regulatory intervention, forced capital raising, or dividend cuts. Declining PPNR trends may indicate margin compression, rising expenses, or loss of fee income.',
    },
    considerations: [
      'PPNR is a non-GAAP measure with no standardized definition. Different banks may include or exclude different items. Securities gains/losses, fair value adjustments, and one-time items can inflate or depress reported PPNR. "Core" or "adjusted" PPNR attempts to strip out these items but requires analyst judgment.',
      'The Federal Reserve uses PPNR as a key input in its stress testing models (DFAST and CCAR). The Fed projects PPNR under adverse scenarios and then layers on estimated credit losses to determine whether the bank can maintain minimum capital ratios under stress. Strong projected PPNR reduces the stressed capital impact.',
      'PPNR captures both the revenue side (NIM and fee income) and the expense side (operating efficiency). A bank can have strong gross revenue but weak PPNR due to high expenses, or moderate revenue but strong PPNR due to excellent cost control. The efficiency ratio is a useful companion metric for understanding the expense side.',
      'PPNR does not include investment securities gains or losses, which can be meaningful for banks with large securities portfolios. During periods of rising rates, banks may realize securities losses that are not captured in PPNR but nonetheless affect reported earnings and capital.',
    ],
    relatedMetrics: ['net-interest-margin', 'efficiency-ratio', 'roaa', 'roe', 'provision-to-average-loans', 'non-interest-income-to-revenue'],
    relatedMetricDescriptions: {
      'net-interest-margin': 'NIM is the primary driver of the net interest income component of PPNR, typically accounting for 60% to 80% of total bank revenue.',
      'efficiency-ratio': 'The efficiency ratio measures non-interest expense relative to total revenue; a lower efficiency ratio directly translates to higher PPNR for a given revenue level.',
      'roaa': 'ROAA = (PPNR - Provision - Taxes) / Average Assets, making PPNR the starting point for bottom-line profitability.',
      'roe': 'PPNR drives net income, which drives ROE. Banks with strong PPNR can maintain acceptable ROE even during periods of elevated credit costs.',
      'provision-to-average-loans': 'The provision is the credit cost that PPNR must absorb; the relationship between PPNR and provision determines whether the bank remains profitable.',
      'non-interest-income-to-revenue': 'Fee income diversification strengthens PPNR by reducing dependence on net interest income alone.',
    },
    isEducationalOnly: true,
    whereToFindData: 'PPNR is not a standard GAAP line item but can be calculated from the income statement by adding net interest income and non-interest income, then subtracting non-interest expense. Most banks disclose PPNR or an equivalent measure in their quarterly earnings releases and investor presentations. The FFIEC UBPR reports pre-provision net operating revenue. Federal Reserve stress test results include projected PPNR under various scenarios.',
    bankSpecificContext: 'PPNR is arguably the most important measure of a bank\'s fundamental operating strength because it represents the earnings buffer available to absorb credit losses before capital is consumed. During the 2008-2010 financial crisis, banks with strong PPNR were able to absorb massive credit losses while remaining solvent, while banks with weak PPNR required government capital injections or failed. The Federal Reserve\'s focus on PPNR in stress testing reflects this reality: PPNR is the first and most sustainable line of defense against credit losses. Capital is a finite buffer; PPNR is a renewable one.',
    metricConnections: 'PPNR = (NIM x Earning Assets) + Non-Interest Income - Non-Interest Expense. This decomposition shows the three levers of PPNR: spread income (driven by NIM and the size of the earning asset base), fee income, and expense control. PPNR connects to the efficiency ratio: Efficiency Ratio = Non-Interest Expense / (Net Interest Income + Non-Interest Income) = Non-Interest Expense / (PPNR + Non-Interest Expense). Net Income = PPNR - Provision - Taxes, linking PPNR to all profitability ratios. In stress testing, PPNR absorbs provision expense; the remainder (after taxes) adds to capital through retained earnings.',
    commonPitfalls: 'Focusing on PPNR growth without examining its composition can be misleading. PPNR growth driven by expanding NIM is generally more sustainable than growth from one-time fee income or securities gains. Additionally, banks can temporarily boost PPNR by cutting expenses in ways that harm long-term franchise value (reducing technology investment, cutting branch staff, deferring maintenance). Evaluating expense trends alongside PPNR ensures the earnings power is sustainable. Comparing PPNR in dollar terms across banks of different sizes is not meaningful; use PPNR-to-average-assets for comparisons.',
    acrossBankTypes: 'Money center banks often achieve higher PPNR-to-assets ratios (2.0% to 3.5%) because of diversified fee income streams from investment banking, trading, wealth management, and treasury services. Community banks typically achieve lower PPNR-to-assets (1.5% to 2.5%) because they rely more heavily on net interest income and have limited fee income sources. Regional banks fall in between. Banks with significant capital markets or wealth management businesses tend to show more volatile PPNR because these fee income streams fluctuate with market conditions.',
    whatDrivesMetric: 'PPNR is driven by three primary factors. First, net interest income, which depends on the size and composition of earning assets, the NIM spread, and interest rate conditions. Second, non-interest income, which depends on the bank\'s fee-generating businesses, transaction volumes, and capital markets activity. Third, non-interest expense, which reflects the cost structure of the franchise including compensation, technology, and occupancy. Revenue-side growth (expanding NIM, growing fee income) and expense discipline (maintaining or improving the efficiency ratio) both contribute to PPNR improvement.',
    faqTeasers: [
      {
        question: 'What is pre-provision net revenue (PPNR) and why do analysts use it?',
        teaser: 'PPNR measures a bank\'s core earnings before credit losses and taxes, revealing the earnings buffer available to absorb loan losses during downturns.',
        faqSlug: 'what-is-ppnr',
        faqCluster: 'profitability',
      },
      {
        question: 'How do I compare profitability across banks of different sizes?',
        teaser: 'PPNR-to-average-assets normalizes earnings power for bank size, while ROAA and efficiency ratio provide additional size-adjusted profitability comparisons.',
        faqSlug: 'comparing-profitability-different-size-banks',
        faqCluster: 'profitability',
      },
    ],
  },

  // =========================================================================
  // 3. Net Overhead Ratio
  // =========================================================================
  {
    slug: 'net-overhead-ratio',
    name: 'Net Overhead Ratio',
    category: 'efficiency',
    categoryLabel: 'Efficiency & Funding Ratio',
    formula: 'Net Overhead Ratio = (Non-Interest Expense - Non-Interest Income) / Average Assets',
    isPercentage: true,
    shortDescription: 'Measures the net cost of non-lending operations as a percentage of average assets, indicating the burden that fee-generating and overhead activities place on the bank',
    description: 'The Net Overhead Ratio subtracts non-interest income from non-interest expense and divides the result by average total assets. The numerator represents the net cost of all activities outside of lending and investing; in other words, the portion of operating expenses not covered by fee income. A lower ratio indicates that the bank\'s non-interest income more fully offsets its operating costs, leaving more of the net interest income available to cover provisions, taxes, and net income.',
    formulaExplanation: 'The numerator is non-interest expense (salaries, occupancy, technology, professional fees, FDIC insurance, and all other operating costs) minus non-interest income (service charges, wealth management fees, mortgage banking income, card fees, trading revenue, and other non-lending revenue). If non-interest income exceeds non-interest expense, the net overhead ratio is negative, indicating that fee income more than covers operating costs. The denominator is average total assets for the period.',
    interpretation: 'A lower net overhead ratio is better. It means the bank\'s non-interest activities contribute more (or burden less) relative to the asset base. A ratio near zero indicates that fee income nearly covers all operating costs, allowing virtually all net interest income to flow toward provisions and profits. Most traditional banks have positive net overhead ratios, meaning some portion of net interest income is consumed by operating costs not covered by fees.',
    typicalRange: 'Most US commercial banks have net overhead ratios between 1.0% and 2.5% of average assets. Banks with strong fee income businesses (wealth management, capital markets, payment processing) tend to have lower net overhead ratios because their non-interest income covers a larger share of expenses. Banks that rely almost exclusively on net interest income tend to have higher net overhead ratios. A very small number of fee-heavy financial institutions may achieve negative net overhead ratios.',
    goodBad: {
      good: 'Net overhead ratios below 1.5% indicate that fee income meaningfully offsets operating costs. Ratios approaching zero indicate that the bank\'s non-interest activities are nearly self-funding, leaving essentially all net interest income available for provisions and profit. Declining net overhead ratios over time indicate improving revenue diversification or expense control.',
      bad: 'Net overhead ratios above 2.5% indicate that operating costs substantially exceed fee income, placing a heavy burden on net interest income. Banks with high net overhead ratios are more vulnerable to NIM compression because their net interest income must cover both the overhead gap and credit costs before any profit remains.',
    },
    considerations: [
      'The net overhead ratio complements the efficiency ratio by incorporating asset size. The efficiency ratio measures expenses relative to revenue; the net overhead ratio measures the net expense burden relative to assets. Two banks with identical efficiency ratios can have different net overhead ratios if their asset intensity differs.',
      'Non-interest income quality matters. A bank may have a low net overhead ratio because of volatile trading gains or one-time items rather than sustainable fee income. Evaluating the composition and stability of non-interest income provides context for whether the net overhead ratio is sustainable.',
      'Banks can reduce the net overhead ratio by either cutting expenses or growing fee income. Expense reduction may be achieved through branch consolidation, technology investment, or operational efficiency gains. Fee income growth may come from expanding wealth management, card programs, or treasury services.',
      'The ratio uses average assets in the denominator, which can mask changes in balance sheet size. A bank that is rapidly growing assets may show a declining net overhead ratio simply because the denominator is growing faster than the numerator, even without actual efficiency improvement.',
    ],
    relatedMetrics: ['efficiency-ratio', 'non-interest-income-to-revenue', 'roaa', 'pre-provision-net-revenue', 'net-interest-margin'],
    relatedMetricDescriptions: {
      'efficiency-ratio': 'The efficiency ratio measures expenses relative to revenue, while the net overhead ratio measures the net expense gap relative to assets, providing complementary efficiency perspectives.',
      'non-interest-income-to-revenue': 'Fee income diversification directly reduces the net overhead ratio by covering more of the expense base with non-interest revenue.',
      'roaa': 'The net overhead ratio is a key component of ROAA: ROAA = NIM - Net Overhead Ratio - Net Credit Costs - Taxes (approximately).',
      'pre-provision-net-revenue': 'PPNR captures both the net interest income and net overhead components; a lower net overhead ratio translates directly to higher PPNR for a given NIM.',
      'net-interest-margin': 'NIM must exceed the net overhead ratio plus credit costs for the bank to generate positive returns on assets.',
    },
    isEducationalOnly: true,
    whereToFindData: 'The net overhead ratio can be calculated from income statement data in 10-Q/10-K filings or Call Reports. Non-interest expense and non-interest income are standard income statement line items. Average total assets is typically disclosed or can be calculated from quarterly balance sheet data. The FFIEC UBPR reports a net non-interest expense to average assets ratio that is equivalent to the net overhead ratio.',
    bankSpecificContext: 'The net overhead ratio highlights a fundamental tension in banking: non-interest activities (wealth management, payments, trading) generate fee income but also require significant expense infrastructure (specialized staff, technology platforms, compliance). The net overhead ratio measures whether these activities are net contributors or net drains on the bank\'s earnings. Banks with low net overhead ratios have effectively built fee businesses that offset a large share of their total expense base, making them less dependent on NIM for profitability.',
    metricConnections: 'The net overhead ratio connects to ROAA through a simplified decomposition: ROAA is approximately equal to NIM minus the net overhead ratio minus the provision-to-assets ratio minus the tax rate effect. This decomposition shows that a bank\'s profitability on assets depends on the spread it earns (NIM), the overhead burden (net overhead ratio), and the credit cost (provision). PPNR = NIM x Earning Assets + Non-Interest Income - Non-Interest Expense can also be expressed as: PPNR / Assets = NIM x (Earning Assets / Assets) - Net Overhead Ratio.',
    commonPitfalls: 'Treating a low net overhead ratio as inherently superior ignores the risk profile of the fee income generating it. Trading revenue, for example, can create negative net overhead in one quarter and significantly positive net overhead the next. Sustainable fee income from wealth management or card processing is more valuable than volatile trading gains, even if both produce the same net overhead ratio in a given period. Additionally, comparing net overhead ratios across banks with fundamentally different business models (investment banking-heavy vs. pure lending) has limited analytical value.',
    acrossBankTypes: 'Community banks focused exclusively on traditional lending typically have net overhead ratios of 2.0% to 3.0% because they have limited fee income to offset expenses. Regional banks with developed treasury management, wealth, and mortgage banking businesses often achieve 1.5% to 2.0%. Large diversified banks and money center institutions with extensive capital markets and payment businesses may achieve net overhead ratios below 1.0%. Pure-play trust companies or fee-focused institutions may have negative net overhead ratios.',
    whatDrivesMetric: 'The net overhead ratio is driven by three factors: the level of non-interest expense (primarily compensation, technology, and occupancy), the level of non-interest income (driven by fee business scale and market conditions), and average asset size (the denominator). Expense control through operational efficiency, technology automation, and branch optimization reduces the numerator. Growing fee income through product development, customer acquisition, and market expansion also reduces the numerator. Asset growth increases the denominator, improving the ratio if the net overhead amount does not grow proportionally.',
    faqTeasers: [
      {
        question: 'What drives a bank\'s efficiency ratio higher or lower?',
        teaser: 'The efficiency ratio is driven by both expense levels and revenue generation. The net overhead ratio provides a complementary view by measuring the gap between expenses and fee income relative to assets.',
        faqSlug: 'what-drives-efficiency-ratio',
        faqCluster: 'efficiency',
      },
      {
        question: 'How do I compare profitability across banks of different sizes?',
        teaser: 'Asset-normalized ratios like the net overhead ratio, ROAA, and efficiency ratio enable meaningful cross-bank comparisons regardless of asset size.',
        faqSlug: 'comparing-profitability-different-size-banks',
        faqCluster: 'profitability',
      },
    ],
  },

  // =========================================================================
  // 4. Price to Tangible Book Value (P/TBV)
  // =========================================================================
  {
    slug: 'price-to-tangible-book-value',
    name: 'Price to Tangible Book Value (P/TBV)',
    category: 'valuation',
    categoryLabel: 'Valuation Metric',
    formula: 'P/TBV = Market Price Per Share / Tangible Book Value Per Share',
    isPercentage: false,
    shortDescription: 'Measures the market price relative to tangible book value per share, providing a more conservative valuation metric than P/B for banks with significant goodwill from acquisitions',
    description: 'Price to Tangible Book Value divides the current market price per share by tangible book value per share (TBVPS). TBVPS equals total shareholders\' equity minus preferred stock minus goodwill minus other intangible assets, divided by diluted shares outstanding. P/TBV is a more conservative valuation metric than P/B because it excludes intangible assets that may have limited value in a stress scenario, providing a clearer view of what an investor is paying relative to the hard net asset value of the bank.',
    formulaExplanation: 'The numerator is the current market price per share. The denominator is tangible book value per share, calculated as (total common equity - goodwill - other intangible assets) / diluted shares outstanding. Some analysts also deduct preferred stock from equity before the intangible adjustments. The result is expressed as a multiple (e.g., 1.5x means the market price is 1.5 times tangible book value per share).',
    interpretation: 'A P/TBV of 1.0x means the market values the bank at exactly its tangible net asset value. P/TBV above 1.0x indicates the market believes the bank\'s earnings power, franchise value, or growth prospects justify a premium over tangible assets. P/TBV below 1.0x suggests the market is discounting the tangible assets, typically because of concerns about asset quality, earnings weakness, or management quality. P/TBV is always equal to or higher than P/B for the same bank (since tangible book is lower than total book), meaning a bank trading at 1.0x P/B may be trading at 1.2x or more P/TBV.',
    typicalRange: 'US bank P/TBV ratios during normal conditions typically range from 1.0x to 3.0x. High-performing banks with strong ROTCE and growth prospects trade at 1.8x to 3.0x tangible book. Average performers trade around 1.2x to 1.8x. Banks with significant asset quality concerns, weak profitability, or uncertain outlooks may trade below 1.0x tangible book. P/TBV multiples tend to be higher than P/B multiples by the same percentage that book value exceeds tangible book value.',
    goodBad: {
      good: 'P/TBV above 1.5x generally indicates the market views the bank positively, reflecting strong ROTCE, stable earnings, and growth potential. P/TBV between 2.0x and 3.0x is reserved for best-in-class banks with exceptional profitability and franchise value.',
      bad: 'P/TBV below 1.0x indicates the market is valuing the bank below its tangible net asset value, implying expected future losses, earnings below cost of equity, or other franchise impairments. Persistently low P/TBV may attract activist investors or acquisition interest.',
    },
    considerations: [
      'P/TBV is most useful for banks that have grown through acquisitions and carry significant goodwill. For banks with no goodwill (organic growers, mutual-to-stock conversions), P/TBV equals P/B and provides no additional information.',
      'The justified P/TBV multiple depends on ROTCE, the cost of equity, and the expected growth rate, analogous to the ROE-P/B framework: Justified P/TBV = (ROTCE - g) / (r - g). This connects tangible profitability directly to tangible valuation.',
      'AOCI can cause tangible book value to fluctuate, particularly during periods of interest rate volatility. Rising rates reduce the market value of available-for-sale securities, reducing AOCI and therefore TBVPS, which can make P/TBV appear higher even if the stock price has not changed.',
      'When evaluating acquisition premiums, acquirers typically look at the price relative to the target\'s tangible book value. M&A premiums in banking are frequently expressed as a multiple of tangible book, making P/TBV the standard valuation language for bank M&A.',
    ],
    relatedMetrics: ['price-to-book', 'tangible-book-value-per-share', 'return-on-tangible-common-equity', 'tangible-common-equity-ratio', 'book-value-per-share', 'price-to-earnings'],
    relatedMetricDescriptions: {
      'price-to-book': 'P/B uses total book value (including goodwill) in the denominator; the spread between P/B and P/TBV reflects the market\'s implicit valuation of goodwill and intangibles.',
      'tangible-book-value-per-share': 'TBVPS is the denominator of P/TBV, expressing the tangible net asset value on a per-share basis.',
      'return-on-tangible-common-equity': 'ROTCE is the profitability metric that drives justified P/TBV, analogous to how ROE drives justified P/B.',
      'tangible-common-equity-ratio': 'TCE Ratio measures the tangible capital base in aggregate, while P/TBV prices that tangible capital base per share in the market.',
      'book-value-per-share': 'BVPS includes goodwill and intangibles; the difference between BVPS and TBVPS represents the per-share intangible asset burden.',
      'price-to-earnings': 'P/E captures the market\'s view of earnings power; P/TBV captures the market\'s view of tangible asset value. P/TBV = P/E x ROTCE.',
    },
    isEducationalOnly: true,
    whereToFindData: 'Market price per share is available from any financial data provider. Tangible book value per share can be calculated from 10-K/10-Q data or is often disclosed in quarterly earnings releases as a non-GAAP measure. Many financial data providers calculate and publish P/TBV for banks. For manual calculation, subtract goodwill and intangible assets from total common equity, then divide by diluted shares outstanding to get TBVPS.',
    bankSpecificContext: 'P/TBV has become the standard valuation metric for bank M&A and is increasingly preferred by analysts over P/B for banks with significant acquisition histories. The metric gained prominence as bank consolidation accelerated in the 1990s and 2000s, creating banks with substantial goodwill balances. P/TBV provides a cleaner measure of what an investor is paying per dollar of hard asset value, uncontaminated by accounting entries from past deals. For bank investors evaluating potential acquisitions, the P/TBV multiple of the acquirer relative to the target is a key factor in assessing whether a deal is dilutive or accretive to tangible book value.',
    metricConnections: 'P/TBV = P/E x ROTCE, mirroring the P/B = P/E x ROE identity for tangible metrics. Justified P/TBV = (ROTCE - g) / (r - g), where r is the cost of equity and g is the sustainable growth rate. This means that P/TBV is fundamentally driven by the bank\'s return on tangible equity relative to its cost of equity. A bank earning ROTCE above its cost of equity should trade above 1.0x P/TBV; one earning below its cost of equity should trade below 1.0x. The P/TBV to ROTCE relationship can be plotted across a peer group to identify banks that appear cheap or expensive relative to their tangible profitability.',
    commonPitfalls: 'Using P/TBV for banks with no goodwill adds no information beyond P/B and may confuse the analysis. Additionally, low P/TBV is not automatically a value opportunity; a bank trading at 0.7x P/TBV may have severe asset quality problems, insufficient reserves, or management issues that justify the discount. The justified P/TBV framework requires estimating ROTCE going forward, not just observing historical ROTCE. A bank with trailing 15% ROTCE but deteriorating fundamentals may not deserve a premium P/TBV multiple.',
    acrossBankTypes: 'P/TBV differences from P/B are most meaningful for serial acquirers and large regional banks that have consolidated extensively. Money center banks carry significant goodwill from decades of acquisitions; for example, a bank with $50 billion in goodwill on a $200 billion equity base would show P/TBV approximately 33% higher than P/B. Community banks that have grown organically show minimal P/TBV to P/B differences. Banks resulting from recent mutual-to-stock conversions often trade near tangible book value with no goodwill adjustment needed.',
    whatDrivesMetric: 'P/TBV is driven by market price movements (reflecting investor sentiment, earnings expectations, and macro conditions) and changes in TBVPS (driven by retained earnings, AOCI movements, buybacks, goodwill impairment, and intangible amortization). TBVPS tends to grow over time through retained earnings, which gradually increases tangible book value. Share buybacks at prices above TBVPS reduce TBVPS (dilutive to tangible book) while buybacks below TBVPS increase it (accretive). AOCI fluctuations from securities portfolio mark-to-market can create short-term TBVPS volatility.',
    faqTeasers: [
      {
        question: 'What is the difference between price-to-book and price-to-tangible-book value?',
        teaser: 'P/B uses total book value (including goodwill), while P/TBV strips out intangible assets. For banks with significant acquisition goodwill, P/TBV provides a more conservative valuation view.',
        faqSlug: 'pb-vs-ptbv',
        faqCluster: 'valuation',
      },
      {
        question: 'When should I use P/TBV instead of P/B to value a bank?',
        teaser: 'P/TBV is preferred when the bank carries significant goodwill from acquisitions, when evaluating M&A premiums, or when comparing banks with very different acquisition histories.',
        faqSlug: 'when-to-use-ptbv',
        faqCluster: 'valuation',
      },
      {
        question: 'How do I calculate Price to Tangible Book Value?',
        teaser: 'Divide the current share price by tangible book value per share. TBVPS equals total common equity minus goodwill and intangibles, divided by shares outstanding.',
        faqSlug: 'how-to-calculate-price-to-tangible-book',
        faqCluster: 'valuation',
      },
    ],
  },

  // =========================================================================
  // 5. Tangible Book Value Per Share (TBVPS)
  // =========================================================================
  {
    slug: 'tangible-book-value-per-share',
    name: 'Tangible Book Value Per Share (TBVPS)',
    category: 'valuation',
    categoryLabel: 'Valuation Metric',
    formula: 'TBVPS = (Total Equity - Preferred Stock - Goodwill - Other Intangible Assets) / Shares Outstanding',
    isPercentage: false,
    shortDescription: 'Measures the per-share tangible net asset value of a bank, excluding goodwill and other intangible assets from equity before dividing by shares outstanding',
    description: 'Tangible Book Value Per Share represents the tangible common equity of a bank divided by its diluted shares outstanding. It strips out goodwill and other intangible assets from the standard book value per share calculation, providing a per-share measure of the hard capital backing each share. TBVPS growth over time is a key indicator of value creation because it reflects the accumulation of tangible capital through retained earnings, buybacks, and other capital actions, uncontaminated by acquisition accounting.',
    formulaExplanation: 'The calculation starts with total shareholders\' equity, subtracts preferred stock (to arrive at common equity), then subtracts goodwill and other intangible assets (such as core deposit intangibles, customer relationship intangibles, and trade names). The result, tangible common equity, is divided by diluted shares outstanding. Some analysts deduct mortgage servicing rights while others retain them; the methodology should be consistent when comparing across banks or time periods.',
    interpretation: 'TBVPS represents the tangible net asset value backing each share of common stock. If a bank were liquidated and all tangible assets converted to cash at their carrying values, TBVPS approximates the per-share proceeds available to common shareholders after settling all liabilities (excluding the recovery of any value from goodwill or intangibles). Growth in TBVPS over time is a core measure of value creation for bank shareholders, often tracked by analysts alongside EPS growth.',
    typicalRange: 'TBVPS varies enormously by bank and bears no direct comparison across institutions. What matters is the growth rate and the relationship to the market price. TBVPS growth rates of 5% to 10% annually are typical of well-managed banks during normal conditions. The difference between BVPS and TBVPS reveals the per-share intangible asset burden; for banks with no goodwill, the two figures are identical.',
    goodBad: {
      good: 'Consistent TBVPS growth of 7% or more annually indicates strong tangible value creation through retained earnings and disciplined capital management. TBVPS growing faster than BVPS suggests intangible assets are being amortized (improving the tangible base) or the bank is avoiding goodwill-creating acquisitions.',
      bad: 'Declining TBVPS over time indicates value destruction through operating losses, excessive dividends/buybacks relative to earnings, large AOCI losses, or goodwill-creating acquisitions at excessive premiums. Stagnant TBVPS suggests the bank is returning essentially all earnings to shareholders (through dividends and buybacks) with no tangible value accumulation.',
    },
    considerations: [
      'TBVPS is affected by AOCI, which includes unrealized gains and losses on available-for-sale securities. During periods of rising interest rates, unrealized securities losses reduce AOCI and therefore TBVPS, even though the losses are not realized. This can create TBVPS volatility unrelated to the bank\'s operating performance.',
      'Share buybacks affect TBVPS differently depending on the buyback price relative to current TBVPS. Buybacks at prices above TBVPS reduce TBVPS per share (dilutive to tangible book). Buybacks at prices below TBVPS increase it (accretive). This dynamic makes buyback strategy an important consideration for TBVPS-focused investors.',
      'Acquisitions create goodwill (reducing TBVPS) if the purchase price exceeds the target\'s tangible net asset value. A bank that grows through acquisitions may show strong EPS growth but flat or declining TBVPS if it consistently pays premiums to tangible book. Organic growth preserves TBVPS more effectively.',
      'TBVPS methodology varies across banks. Some deduct all intangibles including mortgage servicing rights; others retain MSRs. Some adjust for preferred stock and AOCI differently. Reconciling TBVPS across banks requires checking each institution\'s non-GAAP reconciliation.',
    ],
    relatedMetrics: ['book-value-per-share', 'price-to-tangible-book-value', 'tangible-common-equity-ratio', 'return-on-tangible-common-equity', 'price-to-book', 'earnings-per-share'],
    relatedMetricDescriptions: {
      'book-value-per-share': 'BVPS includes goodwill and intangibles; the difference between BVPS and TBVPS equals per-share intangible assets.',
      'price-to-tangible-book-value': 'P/TBV uses TBVPS as its denominator, directly connecting tangible net asset value to market valuation.',
      'tangible-common-equity-ratio': 'TCE Ratio expresses the same tangible equity concept as a percentage of tangible assets rather than on a per-share basis.',
      'return-on-tangible-common-equity': 'ROTCE measures the return generated on the tangible equity that underlies TBVPS, connecting tangible profitability to tangible value.',
      'price-to-book': 'P/B uses BVPS as its denominator; for banks with significant goodwill, P/TBV (using TBVPS) is a more conservative valuation metric.',
      'earnings-per-share': 'EPS drives TBVPS growth through retained earnings. TBVPS Growth = EPS x Retention Ratio / Beginning TBVPS (approximately).',
    },
    isEducationalOnly: true,
    whereToFindData: 'TBVPS is disclosed by most banks in their quarterly earnings releases as a non-GAAP financial measure, with a reconciliation to GAAP book value per share. It can also be calculated from 10-K/10-Q data by subtracting goodwill and intangible assets from total common equity and dividing by diluted shares outstanding. Financial data providers typically calculate and publish TBVPS for banks.',
    bankSpecificContext: 'TBVPS growth is one of the most important long-term performance metrics for bank shareholders. While EPS and ROE capture profitability, TBVPS captures tangible value accumulation per share over time. Investors in bank stocks, particularly value investors, track TBVPS growth as a measure of management\'s ability to grow the tangible net asset base. Warren Buffett has noted that growth in tangible book value per share is one of the best measures of long-term value creation for bank shareholders. In bank M&A, the price paid relative to the target\'s TBVPS is a primary valuation benchmark, making TBVPS growth directly relevant to franchise value.',
    metricConnections: 'TBVPS = TCE / Shares Outstanding. TBVPS Growth Rate = ROTCE x Retention Ratio (approximately, assuming stable share count). This connects tangible profitability to tangible value creation. P/TBV = Market Price / TBVPS. TBVPS = BVPS - (Goodwill + Intangibles) / Shares Outstanding. The gap between BVPS and TBVPS narrows over time as intangible assets are amortized (excluding goodwill, which is not amortized but tested for impairment).',
    commonPitfalls: 'Comparing TBVPS across banks is not meaningful because each bank has a different number of shares outstanding and a different capital base. What matters is the growth rate, the relationship to market price (P/TBV), and the trend over time. Additionally, TBVPS can decline for reasons that are actually positive, such as share buybacks above tangible book (which reduce share count but also reduce TBVPS if done above the current level) or special dividends that return excess capital to shareholders.',
    acrossBankTypes: 'Banks that have grown through acquisitions typically show a significant gap between BVPS and TBVPS, sometimes 20% to 40% or more. Community banks that have grown organically or were formed through mutual-to-stock conversions often have TBVPS very close to BVPS. Money center banks carry substantial absolute goodwill amounts but their large equity bases can moderate the per-share impact. Mid-size regional banks formed through roll-up acquisition strategies may show the largest percentage gaps between BVPS and TBVPS.',
    whatDrivesMetric: 'TBVPS is driven by retained earnings (net income minus dividends, which increases tangible equity), share buybacks (which reduce share count, increasing TBVPS if done at prices below tangible book and decreasing it if done above), AOCI movements (unrealized securities gains/losses), intangible asset amortization (which gradually reduces the deduction from book value), goodwill impairment (which reduces both book value and tangible book value but improves the BVPS-to-TBVPS gap), and acquisitions (which may create goodwill that reduces TBVPS).',
    faqTeasers: [
      {
        question: 'What is tangible book value and why is it different from book value?',
        teaser: 'Tangible book value strips out goodwill and intangible assets from total equity, showing the hard capital available to absorb losses rather than book value inflated by past acquisition premiums.',
        faqSlug: 'tangible-book-value-vs-book-value',
        faqCluster: 'capital-and-risk',
      },
      {
        question: 'How do I calculate Tangible Book Value Per Share?',
        teaser: 'Subtract goodwill and other intangible assets from total common equity, then divide by diluted shares outstanding.',
        faqSlug: 'how-to-calculate-tbvps',
        faqCluster: 'valuation',
      },
    ],
  },

  // =========================================================================
  // 6. Cost of Funds
  // =========================================================================
  {
    slug: 'cost-of-funds',
    name: 'Cost of Funds',
    category: 'efficiency',
    categoryLabel: 'Efficiency & Funding Ratio',
    formula: 'Cost of Funds = Total Interest Expense / Average Interest-Bearing Liabilities',
    isPercentage: true,
    shortDescription: 'Measures a bank\'s average cost of all interest-bearing funding sources including deposits, borrowings, and subordinated debt',
    description: 'Cost of Funds divides total interest expense by average interest-bearing liabilities. It measures the blended rate a bank pays across all sources of interest-bearing funding, including interest-bearing deposits (savings, money market, time deposits), borrowed funds (FHLB advances, repo agreements, federal funds purchased), and subordinated debt. Cost of Funds is a critical input to net interest margin because it represents the expense side of the NIM equation.',
    formulaExplanation: 'The numerator is total interest expense from the income statement, including interest paid on deposits, borrowings, subordinated debt, and any other interest-bearing liabilities. The denominator is average interest-bearing liabilities for the period. Note that non-interest-bearing deposits are excluded from the denominator because they carry no explicit interest cost. This means Cost of Funds measures the rate paid only on liabilities that carry an interest obligation. Some analysts use total liabilities (including non-interest-bearing deposits) in the denominator to calculate a "total cost of funding" that captures the benefit of free funding.',
    interpretation: 'A lower Cost of Funds indicates cheaper funding, which supports wider net interest margins and higher profitability. A bank with a Cost of Funds of 2.5% and loan yields of 6.0% earns a gross spread of 3.5% on its interest-bearing funded assets. Cost of Funds is influenced by the interest rate environment, the bank\'s deposit mix, its reliance on wholesale funding, and competitive conditions in its deposit markets.',
    typicalRange: 'Cost of Funds varies significantly with the interest rate environment. During low-rate environments, bank Cost of Funds can fall below 0.50%. During higher-rate environments, Cost of Funds may rise to 2.0% to 4.0% or more. The relationship between the federal funds rate and bank Cost of Funds is positive but not one-to-one; banks with strong core deposit franchises experience less pass-through of rate increases to their funding costs.',
    goodBad: {
      good: 'Cost of Funds below the peer median indicates a funding advantage. Banks with a high proportion of non-interest-bearing deposits, stable core deposit relationships, and limited wholesale funding dependence tend to achieve lower Cost of Funds. A low Cost of Funds relative to peers provides a structural NIM advantage.',
      bad: 'Cost of Funds above the peer median indicates expensive funding. Banks that rely heavily on rate-sensitive CDs, brokered deposits, or wholesale borrowings tend to have higher Cost of Funds. A high and rising Cost of Funds can compress NIM even when loan yields are also rising, if funding costs increase faster.',
    },
    considerations: [
      'Cost of Funds excludes non-interest-bearing deposits from the denominator. To capture the full benefit of free funding, some analysts calculate "total cost of deposits" (interest expense on deposits divided by total deposits, including non-interest-bearing). This lower figure reflects the blended cost of the entire deposit franchise.',
      'The deposit beta (the percentage of a rate increase that is passed through to deposit rates) varies by deposit type and competitive environment. Non-interest-bearing deposits have zero beta, savings accounts have low beta, and CDs have high beta. A bank\'s deposit mix determines its aggregate beta and sensitivity of Cost of Funds to rate changes.',
      'Wholesale funding (FHLB advances, brokered deposits, repo) typically carries a higher cost than core deposits but provides flexibility for asset growth. A bank with rising Cost of Funds should be evaluated for whether the increase reflects rate environment changes (industry-wide) or a shift toward more expensive funding sources (bank-specific).',
      'Cost of Funds should be evaluated alongside asset yields. A bank may accept higher Cost of Funds if it is earning proportionally higher yields on its assets. The spread (asset yield minus Cost of Funds) is more important than Cost of Funds in isolation.',
    ],
    relatedMetrics: ['cost-of-deposits', 'net-interest-margin', 'deposits-to-assets', 'loans-to-deposits', 'interest-income-to-earning-assets', 'roaa'],
    relatedMetricDescriptions: {
      'cost-of-deposits': 'Cost of Deposits focuses specifically on the deposit portion of funding, while Cost of Funds includes all interest-bearing liabilities.',
      'net-interest-margin': 'NIM is the net result of asset yields minus funding costs; Cost of Funds directly determines the expense side of NIM.',
      'deposits-to-assets': 'A higher deposits-to-assets ratio generally indicates more stable, potentially lower-cost funding compared to wholesale alternatives.',
      'loans-to-deposits': 'Banks with high loans-to-deposits ratios may need to supplement deposits with more expensive wholesale funding, raising Cost of Funds.',
      'interest-income-to-earning-assets': 'Interest income yield minus Cost of Funds approximates the net interest spread, which is a close relative of NIM.',
      'roaa': 'Lower Cost of Funds supports wider NIM, which directly contributes to higher ROAA.',
    },
    isEducationalOnly: true,
    whereToFindData: 'Total interest expense is reported on the income statement in 10-Q/10-K filings and Call Reports (FFIEC 031/041). Average interest-bearing liabilities can be found in the average balance sheet tables that most banks include in their quarterly earnings releases and 10-K filings. The FFIEC UBPR reports cost of funds with peer group comparisons. The FDIC Quarterly Banking Profile reports aggregate funding cost data for the industry.',
    bankSpecificContext: 'A bank\'s Cost of Funds reflects the quality of its deposit franchise, which is one of the most durable competitive advantages in banking. Banks with deep customer relationships, extensive branch networks in attractive markets, and high proportions of non-interest-bearing and low-rate deposits enjoy a structural cost-of-funds advantage that directly supports profitability. This advantage is sometimes called a "deposit franchise value" or "core deposit premium" and is a key factor in bank valuations and M&A pricing. During rising rate environments, banks with low-cost, sticky deposit bases outperform those reliant on rate-sensitive funding.',
    metricConnections: 'Cost of Funds is one half of the NIM equation. NIM is approximately equal to the yield on earning assets minus the cost of interest-bearing liabilities, adjusted for the mix of free funding (non-interest-bearing deposits and equity). Cost of Funds = Total Interest Expense / Average Interest-Bearing Liabilities, while NIM = Net Interest Income / Average Earning Assets. The net interest spread (asset yield minus Cost of Funds) plus the benefit of free funding equals NIM. Cost of Funds also connects to the efficiency ratio indirectly: banks with higher funding costs need more revenue to achieve the same efficiency level.',
    commonPitfalls: 'Comparing Cost of Funds across banks without accounting for the proportion of non-interest-bearing deposits is misleading. A bank with 40% non-interest-bearing deposits and 3.0% Cost of Funds on interest-bearing liabilities has a much lower total cost of funding than a bank with 10% non-interest-bearing deposits and the same 3.0% Cost of Funds. The "total cost of funding" (including free deposits in the denominator) provides a more complete comparison. Additionally, short-term fluctuations in Cost of Funds may reflect CD maturity timing rather than fundamental changes in the funding base.',
    acrossBankTypes: 'Community banks in rural or less competitive markets often achieve lower Cost of Funds due to stable, relationship-based deposit franchises with high proportions of non-interest-bearing deposits. Large banks in competitive urban markets may face higher deposit costs due to customer rate sensitivity and competition from money market funds and online banks. Banks that rely on wholesale funding (FHLB advances, brokered deposits) for a significant portion of their balance sheet typically have higher and more volatile Cost of Funds.',
    whatDrivesMetric: 'Cost of Funds is driven by the interest rate environment (federal funds rate, Treasury rates), the bank\'s deposit mix (non-interest-bearing vs. CDs vs. savings), competitive conditions in the bank\'s deposit markets, reliance on wholesale funding, and management\'s deposit pricing strategy. During rising rate cycles, Cost of Funds increases as deposits reprice and wholesale funding costs rise. During falling rate cycles, Cost of Funds declines, though typically with a lag as time deposits mature and reprice.',
    faqTeasers: [
      {
        question: 'What is cost of funds and how does it differ from cost of deposits?',
        teaser: 'Cost of Funds measures the average rate paid on all interest-bearing liabilities, while Cost of Deposits focuses only on the deposit portion. Both are key drivers of net interest margin.',
        faqSlug: 'cost-of-funds-vs-cost-of-deposits',
        faqCluster: 'efficiency',
      },
      {
        question: 'What causes net interest margin to increase or decrease?',
        teaser: 'NIM is driven by the spread between asset yields and funding costs, making Cost of Funds a direct determinant of margin performance.',
        faqSlug: 'what-causes-nim-to-change',
        faqCluster: 'profitability',
      },
    ],
  },

  // =========================================================================
  // 7. Cost of Deposits
  // =========================================================================
  {
    slug: 'cost-of-deposits',
    name: 'Cost of Deposits',
    category: 'efficiency',
    categoryLabel: 'Efficiency & Funding Ratio',
    formula: 'Cost of Deposits = Interest Expense on Deposits / Average Total Deposits',
    isPercentage: true,
    shortDescription: 'Measures the average interest rate paid on all deposits, including non-interest-bearing accounts in the denominator to reflect the full benefit of the deposit franchise',
    description: 'Cost of Deposits divides interest expense on deposits by average total deposits, including both interest-bearing and non-interest-bearing deposits in the denominator. By including non-interest-bearing deposits (which cost zero) in the denominator, this metric captures the full blended cost of the bank\'s deposit franchise, reflecting the benefit of free funding from checking accounts and other no-cost deposits. Cost of Deposits is a key measure of deposit franchise quality and a primary driver of competitive positioning in net interest margin.',
    formulaExplanation: 'The numerator is interest expense on deposits only (excluding interest on borrowings and subordinated debt). This is typically a disclosed line item in bank financial statements or can be found in Call Report Schedule RI. The denominator is average total deposits, including non-interest-bearing demand deposits, NOW accounts, savings, money market deposits, and time deposits (CDs). Including non-interest-bearing deposits in the denominator produces a lower rate than Cost of Funds (which excludes them) and better reflects the total deposit franchise value.',
    interpretation: 'A lower Cost of Deposits indicates a stronger, more valuable deposit franchise. Banks with high proportions of non-interest-bearing deposits pull the blended cost down toward zero, creating a significant competitive advantage. A Cost of Deposits of 1.0% means the bank pays an average of $1 per year for every $100 of total deposits. Trends in Cost of Deposits reveal how quickly the bank\'s deposit costs are responding to changes in market interest rates.',
    typicalRange: 'Cost of Deposits varies with the rate environment. During near-zero rate environments, industry Cost of Deposits can fall below 0.20%. During higher-rate environments, Cost of Deposits can rise to 1.5% to 3.0% or more. Banks with strong non-interest-bearing deposit bases may maintain Cost of Deposits 50 to 150 basis points below peers. The FDIC Quarterly Banking Profile tracks aggregate Cost of Deposits for the industry.',
    goodBad: {
      good: 'Cost of Deposits below the peer median indicates a valuable deposit franchise. Banks with low Cost of Deposits benefit from structural NIM advantages that are difficult for competitors to replicate. Cost of Deposits rising more slowly than market rates during tightening cycles indicates strong deposit stickiness.',
      bad: 'Cost of Deposits above the peer median indicates an expensive or rate-sensitive deposit base. Banks that rely on CDs, brokered deposits, or aggressive rate promotions to attract deposits will have higher and more volatile Cost of Deposits. Rapidly rising Cost of Deposits during rate increases may compress NIM.',
    },
    considerations: [
      'There are two common definitions: "cost of interest-bearing deposits" (interest on deposits / average interest-bearing deposits) and "cost of total deposits" (interest on deposits / average total deposits). This metric uses the total deposits definition to capture the free-funding benefit. When comparing across sources, verify which definition is used.',
      'Non-interest-bearing deposit mix is the single largest driver of Cost of Deposits differences across banks. A bank with 40% non-interest-bearing deposits will have a dramatically lower Cost of Deposits than one with 10%, even if both price their interest-bearing deposits identically.',
      'Deposit betas (the rate at which deposit costs follow market rate changes) differ across deposit products. Online savings accounts have high betas, while relationship-based operating accounts have low betas. The aggregate deposit beta drives how quickly Cost of Deposits responds to Fed rate changes.',
      'Cost of Deposits should be evaluated alongside deposit growth. A bank achieving low Cost of Deposits while maintaining or growing deposit balances demonstrates real franchise strength. Low Cost of Deposits achieved through deposit runoff may indicate pricing is too low and the bank is losing funding.',
    ],
    relatedMetrics: ['cost-of-funds', 'net-interest-margin', 'deposits-to-assets', 'loans-to-deposits', 'roaa', 'efficiency-ratio'],
    relatedMetricDescriptions: {
      'cost-of-funds': 'Cost of Funds includes all interest-bearing liabilities (deposits plus borrowings), while Cost of Deposits focuses only on the deposit franchise.',
      'net-interest-margin': 'Deposit costs are the largest component of total funding costs, making Cost of Deposits a primary driver of NIM.',
      'deposits-to-assets': 'Higher deposits-to-assets ratios indicate greater reliance on deposit funding, making Cost of Deposits more influential to overall profitability.',
      'loans-to-deposits': 'When loans-to-deposits ratios are low, the bank has excess deposits relative to lending, potentially allowing it to be more selective on deposit pricing.',
      'roaa': 'Lower Cost of Deposits supports wider NIM and higher ROAA through lower funding costs.',
      'efficiency-ratio': 'Branch networks that generate low-cost deposits are expensive to operate; the efficiency ratio captures whether the cost of maintaining the deposit franchise is justified by the funding benefit.',
    },
    isEducationalOnly: true,
    whereToFindData: 'Interest expense on deposits is reported on the income statement in 10-Q/10-K filings and in Call Reports on Schedule RI. Average total deposits (including non-interest-bearing) can be found in average balance sheet tables in earnings releases and 10-K filings, or calculated from quarterly balance sheet data. The FFIEC UBPR reports cost of total deposits with peer comparisons. The FDIC Quarterly Banking Profile reports aggregate deposit cost data.',
    bankSpecificContext: 'The deposit franchise is the foundation of bank profitability. Deposits are the primary funding source for most banks, and the cost of those deposits is the largest single expense item (via interest expense) driving NIM. Banks with strong deposit franchises, characterized by high proportions of non-interest-bearing deposits and sticky, low-cost relationships, enjoy a durable competitive advantage. This advantage is particularly valuable during rising rate environments when banks with superior deposit franchises see their Cost of Deposits rise more slowly than market rates, allowing NIM expansion while competitors face margin pressure.',
    metricConnections: 'Cost of Deposits feeds directly into NIM. Net Interest Income = Interest Income - Interest Expense, and interest expense on deposits is typically 60% to 80% of total interest expense. NIM = (Yield on Earning Assets - Blended Funding Cost) + Free Funding Benefit. The "free funding benefit" comes directly from non-interest-bearing deposits, which reduce Cost of Deposits below Cost of Funds. Cost of Deposits also relates to the efficiency ratio through the branch network: branches are expensive (non-interest expense) but generate low-cost deposits (reducing interest expense). The optimal balance between branch cost and deposit cost benefit is a core strategic question.',
    commonPitfalls: 'Comparing Cost of Deposits across banks without adjusting for the non-interest-bearing deposit mix is the most common error. Two banks with identical rates on interest-bearing products will have very different Cost of Deposits if one has 35% non-interest-bearing deposits and the other has 15%. Additionally, Cost of Deposits can be temporarily depressed by the maturity timing of CDs; if a bank has a large CD book that has not yet repriced to current market rates, the reported Cost of Deposits understates the forward cost once those CDs mature and reprice.',
    acrossBankTypes: 'Community banks with strong local relationships often achieve low Cost of Deposits because their customers maintain operating accounts (which are often non-interest-bearing or low-rate) out of convenience and relationship loyalty. Large banks benefit from scale in payments and transaction processing that generates non-interest-bearing commercial deposits. Online-only banks and neobanks typically have high Cost of Deposits because they attract deposits primarily through rate competition rather than relationship stickiness. Banks in highly competitive urban markets may face higher deposit costs than those in rural or suburban markets with less competition.',
    whatDrivesMetric: 'Cost of Deposits is driven by the interest rate environment, the bank\'s deposit product mix (non-interest-bearing, savings, money market, CDs), competitive conditions, customer relationship strength, and management\'s deposit pricing strategy. During rising rate environments, Cost of Deposits increases as banks raise rates to retain and attract deposits. During falling rate environments, Cost of Deposits declines, though typically faster than it rose because banks quickly lower rates on variable-rate accounts while fixed-rate CDs take time to mature.',
    faqTeasers: [
      {
        question: 'What is cost of funds and how does it differ from cost of deposits?',
        teaser: 'Cost of Funds measures the rate on all interest-bearing liabilities, while Cost of Deposits focuses on the deposit franchise specifically, including the benefit of zero-cost non-interest-bearing deposits.',
        faqSlug: 'cost-of-funds-vs-cost-of-deposits',
        faqCluster: 'efficiency',
      },
      {
        question: 'What does it mean when a bank relies heavily on wholesale funding vs core deposits?',
        teaser: 'Core deposits are stable, relationship-based, and typically low-cost. Wholesale funding is rate-sensitive and more expensive, directly raising Cost of Funds and compressing margins.',
        faqSlug: 'wholesale-funding-vs-core-deposits',
        faqCluster: 'efficiency',
      },
    ],
  },

  // =========================================================================
  // 8. Non-Interest Income to Revenue Ratio
  // =========================================================================
  {
    slug: 'non-interest-income-to-revenue',
    name: 'Non-Interest Income to Revenue Ratio',
    category: 'efficiency',
    categoryLabel: 'Efficiency & Funding Ratio',
    formula: 'Non-Interest Income to Revenue = Non-Interest Income / (Net Interest Income + Non-Interest Income)',
    isPercentage: true,
    shortDescription: 'Measures the share of total revenue generated from fee income and other non-lending sources, indicating the bank\'s revenue diversification beyond traditional interest income',
    description: 'The Non-Interest Income to Revenue Ratio divides non-interest income by total revenue (defined as net interest income plus non-interest income). Non-interest income includes service charges, wealth management and trust fees, mortgage banking revenue, card interchange fees, trading revenue, insurance commissions, and other fee-based earnings. The ratio indicates how much of the bank\'s revenue comes from sources other than the traditional lending spread, reflecting the degree of revenue diversification.',
    formulaExplanation: 'The numerator is total non-interest income from the income statement. This typically includes deposit service charges, fiduciary and asset management fees, mortgage banking income, card and payment processing fees, insurance revenue, gains on loan sales, and any other fee-based or non-spread revenue. Securities gains/losses are sometimes included but may be excluded for a "core" version of the ratio. The denominator is total revenue, defined as net interest income plus non-interest income. Note that the denominator uses net interest income (after interest expense), not gross interest income.',
    interpretation: 'A higher ratio indicates greater revenue diversification away from traditional spread lending. A ratio of 30% means that 30 cents of every revenue dollar comes from fee-based activities. Greater diversification can provide earnings stability because fee income and interest income respond differently to economic and rate environments. However, the quality and stability of non-interest income matter as much as its quantity.',
    typicalRange: 'For the US banking industry, non-interest income typically represents 25% to 40% of total revenue, based on FDIC aggregate data. Community banks focused on traditional lending often have ratios of 15% to 25%. Regional banks with developed fee businesses achieve 25% to 35%. Money center banks with investment banking, trading, and wealth management operations may achieve 40% to 60% or higher.',
    goodBad: {
      good: 'Non-interest income ratios above 30% indicate meaningful revenue diversification. Stable fee income from recurring sources (wealth management, card fees, treasury management) provides the most durable diversification benefit. Growing non-interest income ratio over time suggests successful expansion of fee-generating businesses.',
      bad: 'Very low non-interest income ratios (below 15%) indicate heavy dependence on net interest income, making the bank vulnerable to NIM compression during unfavorable rate environments. However, a high ratio driven primarily by volatile sources (trading gains, securities transactions) may overstate diversification because these revenue streams can evaporate during market stress.',
    },
    considerations: [
      'Non-interest income quality varies widely. Recurring fee income from wealth management, card processing, and treasury services is more valuable than episodic income from securities gains, legal settlements, or one-time transactions. Evaluating the composition and stability of non-interest income is essential.',
      'Mortgage banking income can be significant but is highly cyclical, rising during refinancing waves (when rates fall) and declining when rates rise and refinancing activity drops. Banks with large mortgage banking operations may show volatile non-interest income ratios.',
      'Some non-interest income categories (such as deposit service charges and overdraft fees) have faced regulatory pressure and consumer advocacy challenges, potentially reducing their contribution over time. Fee income sustainability should be assessed in light of regulatory trends.',
      'The ratio can decline not because fee income is falling but because net interest income is growing faster during NIM expansion periods. Evaluating the dollar trend in non-interest income alongside the ratio provides a more complete picture.',
    ],
    relatedMetrics: ['efficiency-ratio', 'net-overhead-ratio', 'pre-provision-net-revenue', 'net-interest-margin', 'roaa', 'roe'],
    relatedMetricDescriptions: {
      'efficiency-ratio': 'The efficiency ratio measures expenses relative to total revenue; banks with higher non-interest income contribute more revenue to offset expenses.',
      'net-overhead-ratio': 'Higher non-interest income directly reduces the net overhead ratio by covering more of the expense base with fee revenue.',
      'pre-provision-net-revenue': 'Non-interest income is a direct component of PPNR, contributing to the bank\'s core earnings power alongside net interest income.',
      'net-interest-margin': 'NIM measures the spread-lending component of revenue; the non-interest income ratio captures the complementary fee-based component.',
      'roaa': 'Fee income diversification supports ROAA by providing revenue that is less dependent on balance sheet size and interest rate conditions.',
      'roe': 'Non-interest income businesses (wealth management, payments) often require less capital than lending, potentially supporting higher ROE for fee-intensive banks.',
    },
    isEducationalOnly: true,
    whereToFindData: 'Non-interest income is a standard line item on the income statement in 10-Q/10-K filings and Call Reports (FFIEC 031/041) on Schedule RI. Banks typically break down non-interest income by category in their financial statement notes and quarterly earnings releases. The FDIC Quarterly Banking Profile reports aggregate non-interest income data. The FFIEC UBPR provides individual bank non-interest income ratios with peer comparisons.',
    bankSpecificContext: 'Revenue diversification is a strategic priority for many banks because it reduces earnings dependence on the interest rate cycle. Banks with strong fee businesses can maintain profitability during periods of NIM compression that severely impact lending-focused institutions. However, building fee income requires investment in specialized capabilities (wealth management platforms, payment processing infrastructure, mortgage origination operations) that increase the expense base. The most successful diversification strategies develop fee businesses that leverage existing customer relationships rather than building standalone operations.',
    metricConnections: 'Total Revenue = NII + Non-Interest Income. Non-Interest Income Ratio = 1 - (NII / Total Revenue). The ratio therefore moves inversely with the share of net interest income. In the PPNR decomposition, PPNR = Total Revenue - Non-Interest Expense, so higher non-interest income directly increases PPNR for a given expense level. The efficiency ratio = Non-Interest Expense / Total Revenue, and a higher non-interest income ratio increases the revenue denominator, potentially improving the efficiency ratio even without expense changes.',
    commonPitfalls: 'Treating all non-interest income as equally valuable for diversification overstates the benefit. Trading revenue is volatile and pro-cyclical; mortgage banking income is interest-rate-sensitive. Only fee income that is genuinely countercyclical or acyclical relative to NIM provides true diversification. Additionally, some banks report securities gains within non-interest income; a spike in the ratio driven by securities gains is not indicative of improved franchise value. Identifying "core" non-interest income (excluding one-time items and securities gains) provides a cleaner view.',
    acrossBankTypes: 'Money center banks with investment banking, trading, and global wealth management businesses typically have non-interest income ratios of 40% to 60%. Regional banks with trust, wealth management, and insurance operations often achieve 25% to 40%. Community banks focused on traditional relationship lending typically have ratios of 15% to 25%, with service charges and mortgage banking as primary fee sources. Banks specializing in payments, card processing, or custody services may have non-interest income ratios above 60%.',
    whatDrivesMetric: 'The non-interest income ratio is driven by the scale and performance of fee-generating businesses (wealth management AUM, card transaction volumes, mortgage origination volume), the interest rate environment (which affects both NIM and rate-sensitive fee income like mortgage banking), management\'s strategic focus on building fee businesses, and the competitive environment for fee-based financial services. Regulatory changes affecting specific fee categories (such as interchange fee caps or overdraft fee restrictions) can also shift the ratio.',
    faqTeasers: [
      {
        question: 'What is the non-interest income to revenue ratio and what does it tell me?',
        teaser: 'This ratio measures the share of bank revenue from fee-based sources rather than lending spreads, indicating how diversified the bank\'s earnings streams are.',
        faqSlug: 'what-is-non-interest-income-ratio',
        faqCluster: 'efficiency',
      },
      {
        question: 'What is non-interest income and why does it matter?',
        teaser: 'Non-interest income encompasses all fee-based and non-spread revenue, providing earnings diversification that can stabilize profitability across rate cycles.',
        faqSlug: 'what-is-non-interest-income',
        faqCluster: 'financial-statements',
      },
    ],
  },

  // =========================================================================
  // 9. Interest Income to Average Earning Assets (Yield on Earning Assets)
  // =========================================================================
  {
    slug: 'interest-income-to-earning-assets',
    name: 'Interest Income to Average Earning Assets',
    category: 'efficiency',
    categoryLabel: 'Efficiency & Funding Ratio',
    formula: 'Yield on Earning Assets = Total Interest Income / Average Earning Assets',
    isPercentage: true,
    shortDescription: 'Measures the average yield on a bank\'s interest-earning asset base, including loans, investment securities, and other interest-bearing assets',
    description: 'Interest Income to Average Earning Assets (also called Yield on Earning Assets or Earning Asset Yield) divides total interest income by average earning assets. Earning assets include all assets that generate interest income: loans, investment securities (both held-to-maturity and available-for-sale), interest-bearing balances at other banks, federal funds sold, and securities purchased under agreements to resell. This metric measures the gross return on the asset side of the bank\'s interest-earning balance sheet, before subtracting funding costs.',
    formulaExplanation: 'The numerator is total interest income from the income statement, including interest and fees on loans, interest on investment securities, interest on deposits at other banks, and interest on federal funds sold. The denominator is average earning assets for the period, which includes all assets that generate interest or dividend income. Non-earning assets (cash, premises, goodwill, other assets) are excluded. Some analysts compute a "tax-equivalent" yield by grossing up interest income on tax-exempt securities (typically municipal bonds) to a pre-tax equivalent, making the yield comparable across banks with different municipal bond holdings.',
    interpretation: 'A higher yield on earning assets indicates the bank earns more gross interest per dollar of earning assets. The yield is driven by the composition of earning assets (loans yield more than securities), the risk profile of the loan book (higher-risk loans carry higher rates), and the prevailing interest rate environment. Yield on earning assets minus Cost of Funds equals the net interest spread. The difference between the net interest spread and NIM reflects the benefit of funding earning assets with free sources (non-interest-bearing deposits and equity).',
    typicalRange: 'Earning asset yields vary significantly with interest rates. During low-rate environments, yields may fall to 3.0% to 4.0%. During higher-rate environments, yields can reach 5.0% to 7.0% or more. Within any rate environment, banks with higher concentrations of loans (vs. securities) and higher-risk loan mixes typically earn higher yields. The FDIC Quarterly Banking Profile reports aggregate earning asset yield data for the industry.',
    goodBad: {
      good: 'Earning asset yields above the peer median indicate either a higher-yielding loan mix, better pricing discipline, or a higher loan-to-securities ratio. Rising yields during rate-increasing environments indicate the bank\'s assets are repricing effectively. Stable yields during rate-decreasing environments indicate fixed-rate asset protection or successful hedging.',
      bad: 'Earning asset yields below peers may indicate a conservative asset mix (heavy securities, low-risk loans), weak pricing power, or a large proportion of fixed-rate assets originated at lower rates. Declining yields while rates are stable or rising may signal the bank is losing pricing discipline or experiencing competition-driven margin pressure.',
    },
    considerations: [
      'The tax-equivalent adjustment is important for comparing yields across banks with different municipal bond holdings. Municipal bond interest is typically exempt from federal income tax, so the pre-tax yield understates the equivalent taxable return. The tax-equivalent yield grosses up this income by dividing by (1 - tax rate).',
      'Earning asset yield is a gross measure; it does not account for credit losses. A bank earning 7% on its earning assets may not be more profitable than one earning 5% if the higher-yielding bank has proportionally higher charge-offs. Combining yield analysis with asset quality metrics provides a complete picture.',
      'The mix of loans vs. securities in earning assets significantly affects the yield. Loans typically yield 200 to 400 basis points more than investment-grade securities. A bank shifting from securities into lending will see its earning asset yield increase, while one building the securities portfolio will see it decline.',
      'Fixed-rate vs. variable-rate composition affects yield sensitivity to rate changes. Banks with predominantly variable-rate loans see yields respond quickly to rate changes (asset-sensitive), while those with large fixed-rate portfolios experience slower adjustment.',
    ],
    relatedMetrics: ['net-interest-margin', 'cost-of-funds', 'cost-of-deposits', 'loans-to-assets', 'roaa', 'non-performing-loans-ratio'],
    relatedMetricDescriptions: {
      'net-interest-margin': 'NIM = Earning Asset Yield - Funding Cost + Free Funding Benefit; the earning asset yield is the revenue side of the NIM equation.',
      'cost-of-funds': 'The net interest spread (earning asset yield minus Cost of Funds) is a core profitability driver; the spread determines how much gross interest income remains after funding costs.',
      'cost-of-deposits': 'Deposit costs represent the largest funding cost; comparing earning asset yield to Cost of Deposits reveals the gross lending/investing spread over core funding.',
      'loans-to-assets': 'Higher loans-to-assets ratios generally support higher earning asset yields because loans yield more than securities.',
      'roaa': 'Higher earning asset yields support higher ROAA, provided the yield premium is not offset by proportionally higher credit losses or funding costs.',
      'non-performing-loans-ratio': 'Non-performing loans stop generating interest income, directly reducing the earning asset yield; banks with high NPL ratios see yield depression from non-accrual assets.',
    },
    isEducationalOnly: true,
    whereToFindData: 'Total interest income is reported on the income statement in 10-Q/10-K filings and Call Reports. Average earning assets can be found in the average balance sheet tables that most banks include in their quarterly earnings releases and 10-K filings. The FFIEC UBPR reports earning asset yield with peer comparisons. The FDIC Quarterly Banking Profile reports aggregate yield data. Tax-equivalent yields, when disclosed, are typically found in the average balance sheet tables in 10-K filings.',
    bankSpecificContext: 'Earning asset yield is the gross revenue driver that, combined with funding costs, determines a bank\'s net interest margin. Understanding the yield helps decompose NIM into its component parts. A bank with a high NIM may have high yields (reflecting aggressive lending or a favorable rate environment) or low funding costs (reflecting a strong deposit franchise), or both. Separating yield from funding cost reveals which side of the equation is driving profitability and how sustainable the margin might be. During rate cycle transitions, yield and funding costs adjust at different speeds, creating the NIM expansion or compression that drives bank earnings volatility.',
    metricConnections: 'Net Interest Spread = Earning Asset Yield - Cost of Funds. NIM = Net Interest Income / Average Earning Assets. The relationship between the net interest spread and NIM reflects the free-funding benefit: NIM typically exceeds the net interest spread because some earning assets are funded by non-interest-bearing sources (demand deposits and equity), which have zero cost. NIM = Net Interest Spread + Free Funding Benefit. Earning asset yield also connects to loan pricing power and competitive positioning in the bank\'s lending markets.',
    commonPitfalls: 'Comparing earning asset yields across banks without adjusting for asset mix differences can be misleading. A bank with 80% of earning assets in commercial loans will naturally show a higher yield than one with 50% in agency securities, regardless of pricing skill. Additionally, ignoring the credit risk dimension of yield is a significant analytical error; higher yields typically compensate for higher expected credit losses. A bank earning 7% on a subprime portfolio is not necessarily better positioned than one earning 5% on prime mortgages when credit losses are factored in.',
    acrossBankTypes: 'Community banks focused on relationship-based commercial and CRE lending typically achieve higher earning asset yields (5.0% to 7.0% in moderate rate environments) because loans are a higher percentage of their earning assets and they serve borrowers who may not have access to capital markets. Large banks with significant investment securities portfolios and lower-yielding commercial lending show moderate yields (4.0% to 5.5%). Banks with large credit card or consumer lending portfolios show the highest yields (often above 7%) because consumer credit carries higher rates, though this is partially offset by higher credit costs.',
    whatDrivesMetric: 'Earning asset yield is driven by the interest rate environment (benchmark rates, yield curve shape), the composition of earning assets (loans vs. securities, fixed vs. variable), the credit risk profile of the loan book (higher-risk loans carry higher yields), pricing power in the bank\'s markets, the pace of asset repricing (how quickly new market rates flow through to the portfolio), and non-accrual loans (which reduce interest income on the numerator without reducing earning assets on the denominator).',
    faqTeasers: [
      {
        question: 'What causes net interest margin to increase or decrease?',
        teaser: 'NIM is driven by earning asset yields and funding costs. Changes in either side shift the spread and therefore the bank\'s core profitability on its interest-earning assets.',
        faqSlug: 'what-causes-nim-to-change',
        faqCluster: 'profitability',
      },
      {
        question: 'How do rising interest rates affect bank net interest margins?',
        teaser: 'Rising rates typically increase earning asset yields, but the net impact on NIM depends on how quickly deposits reprice and whether the bank is asset-sensitive or liability-sensitive.',
        faqSlug: 'rising-rates-and-nim',
        faqCluster: 'interest-rates',
      },
    ],
  },
];

// ============================================================================
// CROSS-LINK MAP ENTRIES FOR prerender.mjs
// ============================================================================
// Add these entries to the METRIC_TO_VALUATIONS map in prerender.mjs.

const ADDITIONAL_METRIC_TO_VALUATIONS_ENTRIES = {
  'return-on-tangible-common-equity': ['price-to-tangible-book-valuation', 'roe-pb-framework', 'peer-comparison', 'dupont-decomposition'],
  'pre-provision-net-revenue': ['discounted-earnings-model', 'peer-comparison'],
  'net-overhead-ratio': ['peer-comparison', 'dupont-decomposition'],
  'price-to-tangible-book-value': ['price-to-tangible-book-valuation', 'peer-comparison', 'roe-pb-framework'],
  'tangible-book-value-per-share': ['price-to-tangible-book-valuation', 'graham-number', 'margin-of-safety'],
  'cost-of-funds': ['peer-comparison', 'discounted-earnings-model'],
  'cost-of-deposits': ['peer-comparison'],
  'non-interest-income-to-revenue': ['peer-comparison', 'dupont-decomposition'],
  'interest-income-to-earning-assets': ['peer-comparison'],
};

// Also update existing VALUATION_TO_METRICS entries in prerender.mjs:
// Add to 'peer-comparison': all 9 slugs above
// Add to 'dupont-decomposition' (new): 'return-on-tangible-common-equity',
//   'net-overhead-ratio', 'non-interest-income-to-revenue'
// Add to 'price-to-tangible-book-valuation' (new): 'return-on-tangible-common-equity',
//   'price-to-tangible-book-value', 'tangible-book-value-per-share'
// Add to 'roe-pb-framework': 'return-on-tangible-common-equity', 'price-to-tangible-book-value'
// Add to 'discounted-earnings-model' (new): 'pre-provision-net-revenue', 'cost-of-funds'
// Add to 'graham-number': 'tangible-book-value-per-share'
// Add to 'margin-of-safety': 'tangible-book-value-per-share'

export { ADDITIONAL_METRICS, ADDITIONAL_METRIC_TO_VALUATIONS_ENTRIES };

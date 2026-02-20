// "How to Calculate" FAQ Pages — New Profitability + Efficiency/Funding Metrics
// 7 entries: ROTCE, PPNR, Net Overhead Ratio, Cost of Funds, Cost of Deposits,
// Non-Interest Income to Revenue, Interest Income to Earning Assets
// Phase 2 / Batch 2 content for src/data/content/faqs.js

const HOW_TO_CALCULATE_PROFITABILITY_EFFICIENCY = [
  {
    slug: 'how-to-calculate-rotce',
    question: 'How do I calculate return on tangible common equity (ROTCE)?',
    cluster: 'profitability',
    clusterName: 'Bank Profitability Metrics',
    intentType: 'procedural',
    shortAnswer: 'ROTCE is calculated by dividing net income available to common shareholders by average tangible common equity, which strips out goodwill and intangible assets from the equity base for a purer profitability measure',
    fullAnswer: 'The primary formula for ROTCE is:\n\nROTCE = Net Income Available to Common Shareholders / Average Tangible Common Equity\n\nTangible common equity equals total shareholders\' equity minus goodwill, minus other intangible assets, minus preferred stock (if any). Average tangible common equity is typically calculated as the average of the beginning and ending period balances.\n\nStep-by-step calculation:\n\n1. Start with total shareholders\' equity from the balance sheet.\n2. Subtract goodwill (found on the balance sheet under intangible assets or as a separate line item).\n3. Subtract other intangible assets (core deposit intangibles, customer relationship intangibles, and similar items).\n4. Subtract preferred stock (the liquidation value of any outstanding preferred shares). The result is tangible common equity.\n5. Calculate the average of tangible common equity at the start and end of the measurement period.\n6. Divide net income available to common shareholders (net income minus preferred dividends) by average tangible common equity.\n\nWorked example: A bank reports total equity of $3.2 billion, goodwill of $400 million, other intangibles of $50 million, and preferred stock of $200 million. Tangible common equity = $3.2B - $400M - $50M - $200M = $2.55 billion. If beginning-of-period tangible common equity was $2.45 billion, average TCE = ($2.55B + $2.45B) / 2 = $2.5 billion. With net income of $350 million and $12 million in preferred dividends, net income to common = $338 million. ROTCE = $338M / $2.5B = 13.5%.\n\nROTCE vs ROE: ROTCE will always be equal to or higher than ROE for the same bank because the denominator (tangible common equity) is smaller than total equity. The gap between ROTCE and ROE widens as intangible assets and preferred stock increase. For banks with minimal goodwill and no preferred stock, the two measures are nearly identical.\n\nAn alternative relationship: ROTCE = P/TBV / P/E. This is the tangible book analog of the ROE = P/B / P/E identity, and it can be used to estimate ROTCE from market data or to check consistency between valuation metrics.\n\nWhere to find the inputs: Total equity, goodwill, other intangibles, and preferred stock are on the balance sheet in 10-K and 10-Q filings. Many banks report tangible common equity and ROTCE directly in their quarterly earnings releases and supplemental financial data. Net income and preferred dividends appear on the income statement.\n\nCommon calculation mistakes: Forgetting to subtract preferred stock from equity (this overstates the denominator and understates ROTCE). Using period-end tangible common equity rather than the average, which can distort the ratio if equity changed significantly during the period. Failing to subtract preferred dividends from net income in the numerator.',
    relatedMetrics: ['return-on-tangible-common-equity', 'roe', 'tangible-common-equity-ratio', 'tangible-book-value-per-share', 'price-to-tangible-book-value'],
    relatedValuations: ['price-to-tangible-book-valuation', 'roe-pb-framework'],
    relatedFaqs: ['what-is-rotce', 'how-to-calculate-roe', 'how-to-calculate-tce-ratio', 'tangible-book-value-vs-book-value'],
    relatedGlossaryTerms: ['Return on Tangible Common Equity (ROTCE)', 'Tangible Common Equity (TCE)', 'Tangible Book Value', 'Goodwill'],
    cta: {
      type: 'learn-metric',
      target: '/metrics/return-on-tangible-common-equity',
      text: 'Learn more about ROTCE and why bank analysts use it alongside ROE'
    },
    metaTitle: 'How to Calculate ROTCE for Banks | BankSift',
    metaDescription: 'Step-by-step guide to calculating return on tangible common equity (ROTCE) for banks, including the formula, a worked example, and common mistakes to avoid.'
  },
  {
    slug: 'how-to-calculate-ppnr',
    question: 'How do I calculate pre-provision net revenue (PPNR)?',
    cluster: 'profitability',
    clusterName: 'Bank Profitability Metrics',
    intentType: 'procedural',
    shortAnswer: 'PPNR is calculated by adding net interest income and non-interest income, then subtracting non-interest expense, which isolates a bank\'s core earnings power before the effect of credit loss provisions',
    fullAnswer: 'The formula for PPNR is:\n\nPPNR = Net Interest Income + Non-Interest Income - Non-Interest Expense\n\nAlternatively: PPNR = Total Revenue - Non-Interest Expense, where total revenue is the sum of net interest income and non-interest income.\n\nStep-by-step calculation:\n\n1. Find net interest income on the income statement (interest income minus interest expense).\n2. Find total non-interest income (service charges, mortgage banking revenue, wealth management fees, trading revenue, securities gains/losses, and other fee income).\n3. Add those two figures to get total revenue.\n4. Find total non-interest expense (salaries and benefits, occupancy, technology, professional fees, FDIC insurance, and other operating costs).\n5. Subtract non-interest expense from total revenue. The result is PPNR.\n\nWorked example: A bank reports net interest income of $420 million, non-interest income of $130 million, and non-interest expense of $320 million. PPNR = $420M + $130M - $320M = $230 million.\n\nWhy provisions are excluded: PPNR is designed to measure a bank\'s core, repeatable earnings power independent of credit cycle volatility. Provision for credit losses can swing dramatically from quarter to quarter based on changes in economic forecasts (under CECL), specific loan problems, and reserve build or release decisions. By stripping out provisions, PPNR reveals how much revenue the bank generates from operations before absorbing credit costs.\n\nPPNR as a percentage of average assets provides a normalized measure comparable across banks of different sizes. A PPNR-to-assets ratio of 2.0% or higher is generally considered strong for a U.S. bank. This ratio indicates the bank\'s capacity to absorb credit losses while remaining profitable.\n\nAnnualizing quarterly PPNR: When working with quarterly data, multiply the quarterly figure by 4 (or compute a trailing twelve months sum from the four most recent quarters) to get an annualized figure comparable to annual benchmarks.\n\nAdjusted PPNR: Some analysts exclude securities gains and losses from the non-interest income component because these are often one-time or market-driven rather than recurring. Adjusted PPNR may also exclude restructuring charges, merger costs, or other unusual items from non-interest expense. Banks often provide their own adjusted PPNR figures in earnings releases.\n\nWhere to find the inputs: All three components (net interest income, non-interest income, non-interest expense) are reported on the income statement in 10-K and 10-Q filings. Many banks also report PPNR directly in quarterly earnings releases, investor presentations, or supplemental financial tables.',
    relatedMetrics: ['pre-provision-net-revenue', 'net-interest-margin', 'efficiency-ratio', 'roaa', 'non-interest-income-to-revenue'],
    relatedValuations: ['discounted-earnings-model'],
    relatedFaqs: ['what-is-ppnr', 'how-to-calculate-efficiency-ratio', 'how-to-calculate-roaa'],
    relatedGlossaryTerms: ['Pre-Provision Net Revenue (PPNR)', 'Net Interest Income', 'Non-Interest Income', 'Non-Interest Expense'],
    cta: {
      type: 'learn-metric',
      target: '/metrics/pre-provision-net-revenue',
      text: 'Learn more about PPNR and why analysts use it to assess bank earnings power'
    },
    metaTitle: 'How to Calculate PPNR for Banks | BankSift',
    metaDescription: 'Step-by-step guide to calculating pre-provision net revenue (PPNR) for banks, including the formula, a worked example, and how to annualize and adjust the figure.'
  },
  {
    slug: 'how-to-calculate-net-overhead-ratio',
    question: 'How do I calculate the net overhead ratio?',
    cluster: 'profitability',
    clusterName: 'Bank Profitability Metrics',
    intentType: 'procedural',
    shortAnswer: 'The net overhead ratio is calculated by subtracting non-interest income from non-interest expense and dividing by average total assets, measuring the net cost burden of a bank\'s non-lending operations relative to its asset base',
    fullAnswer: 'The formula for the net overhead ratio is:\n\nNet Overhead Ratio = (Non-Interest Expense - Non-Interest Income) / Average Total Assets\n\nThe result is typically expressed as a percentage.\n\nStep-by-step calculation:\n\n1. Find total non-interest expense on the income statement (salaries, occupancy, technology, FDIC insurance, and all other operating costs).\n2. Find total non-interest income on the income statement (service charges, fee income, mortgage banking, wealth management, and other non-interest revenue).\n3. Subtract non-interest income from non-interest expense. This is the "net overhead" or "net burden."\n4. Calculate average total assets (beginning-of-period plus end-of-period, divided by 2).\n5. Divide the net overhead by average total assets.\n\nWorked example: A bank has non-interest expense of $85 million, non-interest income of $25 million, and average total assets of $4.0 billion. Net overhead = $85M - $25M = $60 million. Net overhead ratio = $60M / $4.0B = 1.50%.\n\nInterpretation: The net overhead ratio measures how much of a drag a bank\'s non-lending operations place on the balance sheet. The lower the ratio, the better, because it means the bank\'s fee income offsets a larger share of its operating costs. A bank that generates enough non-interest income to fully cover its non-interest expense would have a net overhead ratio of zero, though this is uncommon for traditional commercial banks.\n\nRelationship to the efficiency ratio: Both metrics assess operating cost management, but from different angles. The efficiency ratio measures non-interest expense as a percentage of total revenue. The net overhead ratio nets fee income against expenses first, then scales the result to assets. A bank with a high efficiency ratio but also high fee income may have a lower net overhead ratio than a bank with a better efficiency ratio but minimal fee income.\n\nRelationship to ROAA: Net overhead ratio plus provision expense ratio plus tax rate effects approximately explain the gap between a bank\'s NIM and its ROAA. A bank with a 3.5% NIM and a 1.5% net overhead ratio has 2.0% of margin remaining to cover provisions and taxes before arriving at ROAA.\n\nWhere to find the inputs: Non-interest expense and non-interest income are on the income statement in 10-K and 10-Q filings. Average total assets may be disclosed in the filing or can be computed from the balance sheet. When using quarterly data, annualize by multiplying quarterly net overhead by 4 or summing the trailing four quarters.',
    relatedMetrics: ['net-overhead-ratio', 'efficiency-ratio', 'roaa', 'non-interest-income-to-revenue', 'net-interest-margin'],
    relatedValuations: [],
    relatedFaqs: ['how-to-calculate-efficiency-ratio', 'how-to-calculate-roaa', 'what-is-non-interest-income-ratio'],
    relatedGlossaryTerms: ['Net Overhead Ratio', 'Non-Interest Expense', 'Non-Interest Income', 'Efficiency Ratio'],
    cta: {
      type: 'learn-metric',
      target: '/metrics/net-overhead-ratio',
      text: 'Learn more about the net overhead ratio and how it complements other efficiency measures'
    },
    metaTitle: 'How to Calculate the Net Overhead Ratio for Banks | BankSift',
    metaDescription: 'Step-by-step guide to calculating the net overhead ratio, including the formula, a worked example, and how it relates to the efficiency ratio and ROAA.'
  },
  {
    slug: 'how-to-calculate-cost-of-funds',
    question: 'How do I calculate cost of funds for a bank?',
    cluster: 'efficiency',
    clusterName: 'Bank Efficiency and Funding',
    intentType: 'procedural',
    shortAnswer: 'Cost of funds is calculated by dividing total interest expense by average interest-bearing liabilities, expressing the annualized percentage rate the bank pays across all of its funding sources',
    fullAnswer: 'The formula for cost of funds is:\n\nCost of Funds = Total Interest Expense / Average Interest-Bearing Liabilities\n\nThe result is expressed as an annualized percentage.\n\nStep-by-step calculation:\n\n1. Find total interest expense on the income statement. This includes interest paid on deposits, interest on short-term borrowings, interest on long-term debt, and interest on all other interest-bearing liabilities.\n2. Find total interest-bearing liabilities on the balance sheet. This includes interest-bearing deposits (savings, money market, CDs), federal funds purchased, repurchase agreements, FHLB advances, subordinated debt, and other borrowings. Do not include non-interest-bearing deposits in this figure.\n3. Calculate the average interest-bearing liabilities (beginning-of-period plus end-of-period, divided by 2). Some analysts use a more precise daily or monthly average if available.\n4. Divide total interest expense by average interest-bearing liabilities.\n\nWorked example: A bank has total interest expense of $120 million for the year. Average interest-bearing liabilities are $6.0 billion. Cost of funds = $120M / $6.0B = 2.00%.\n\nAnnualizing quarterly data: If using a single quarter, multiply the quarterly interest expense by 4 before dividing by the quarterly average interest-bearing liabilities. Alternatively, use the trailing twelve months of interest expense divided by the average of five quarter-end balances of interest-bearing liabilities.\n\nCost of funds vs cost of deposits: Cost of deposits uses only interest expense on deposits in the numerator and only average deposits (or average interest-bearing deposits) in the denominator. Cost of funds is broader because it includes all interest-bearing liabilities. When cost of funds is materially higher than cost of deposits, the bank is using meaningful amounts of non-deposit borrowings at higher rates.\n\nAlternative calculation including non-interest-bearing deposits: Some analysts calculate an "all-in" cost of funds by dividing total interest expense by average total funding (interest-bearing liabilities plus non-interest-bearing deposits). This produces a lower figure because non-interest-bearing deposits add to the denominator without adding to the numerator. This version better reflects the bank\'s true blended funding cost but is less commonly used as the standard metric.\n\nRelationship to NIM: The spread between the yield on earning assets and cost of funds approximates net interest margin, though they are not identical because the denominators differ (earning assets vs interest-bearing liabilities). Tracking cost of funds alongside asset yields helps decompose NIM changes into their asset-side and liability-side components.\n\nWhere to find the inputs: Total interest expense is on the income statement. Interest-bearing liabilities are on the balance sheet. Most banks provide detailed breakdowns of interest expense by liability category in the notes to financial statements or in the interest rate sensitivity table in the 10-K.',
    relatedMetrics: ['cost-of-funds', 'cost-of-deposits', 'net-interest-margin', 'deposits-to-assets'],
    relatedValuations: [],
    relatedFaqs: ['cost-of-funds-vs-cost-of-deposits', 'how-to-calculate-cost-of-deposits', 'how-to-calculate-nim', 'how-to-evaluate-bank-funding-mix'],
    relatedGlossaryTerms: ['Cost of Funds', 'Cost of Deposits', 'Net Interest Margin'],
    cta: {
      type: 'learn-metric',
      target: '/metrics/cost-of-funds',
      text: 'Learn more about cost of funds and its role in bank profitability analysis'
    },
    metaTitle: 'How to Calculate Cost of Funds for Banks | BankSift',
    metaDescription: 'Step-by-step guide to calculating cost of funds for a bank, including the formula, a worked example, and how it differs from cost of deposits.'
  },
  {
    slug: 'how-to-calculate-cost-of-deposits',
    question: 'How do I calculate cost of deposits for a bank?',
    cluster: 'efficiency',
    clusterName: 'Bank Efficiency and Funding',
    intentType: 'procedural',
    shortAnswer: 'Cost of deposits is calculated by dividing interest expense on deposits by average total deposits, measuring the annualized rate the bank pays its depositors across all deposit account types',
    fullAnswer: 'The formula for cost of deposits is:\n\nCost of Deposits = Interest Expense on Deposits / Average Total Deposits\n\nThe result is expressed as an annualized percentage.\n\nStep-by-step calculation:\n\n1. Find interest expense on deposits on the income statement or in the notes to the financial statements. This is the interest paid specifically on deposit accounts (savings, money market, CDs, and interest-bearing checking). It excludes interest on borrowings, subordinated debt, and other non-deposit liabilities.\n2. Find total deposits on the balance sheet. This includes all deposit categories: non-interest-bearing demand deposits, interest-bearing checking, savings, money market, and time deposits (CDs).\n3. Calculate average total deposits (beginning-of-period plus end-of-period, divided by 2).\n4. Divide deposit interest expense by average total deposits.\n\nWorked example: A bank pays $80 million in interest on deposits during the year. Average total deposits are $7.5 billion. Cost of deposits = $80M / $7.5B = 1.07%.\n\nDenominator choice matters: Some analysts use average interest-bearing deposits rather than average total deposits in the denominator, excluding non-interest-bearing deposits. This produces a higher figure that represents the rate paid on accounts that actually bear interest. The total deposits version produces a lower figure that reflects the blended cost including the benefit of free non-interest-bearing balances. Both versions are valid; the key is to be consistent when comparing across banks and time periods.\n\nWhy cost of deposits matters: Deposits are the largest and typically cheapest funding source for most banks. The difference in cost of deposits across banks can be substantial. A bank with strong local market share, deep customer relationships, and a high proportion of non-interest-bearing balances might have a cost of deposits of 0.80%, while a bank relying heavily on rate-sensitive CDs and brokered deposits might pay 2.50%. This spread directly affects net interest margin and profitability.\n\nDeposit composition analysis: To understand what drives the cost of deposits figure, examine the mix of deposit types. Banks typically disclose the composition of deposits by category (non-interest-bearing, savings, money market, time deposits) in the notes to financial statements. A shift toward higher-cost categories (CDs, brokered deposits) will push the overall cost of deposits higher even if rates on individual products do not change.\n\nWhere to find the inputs: Interest expense on deposits may appear as a separate line on the income statement or may need to be extracted from the interest expense breakdown in the notes. Total deposits are on the balance sheet. The 10-K interest rate sensitivity table typically provides detailed deposit category breakdowns with average balances and average rates paid.',
    relatedMetrics: ['cost-of-deposits', 'cost-of-funds', 'net-interest-margin', 'deposits-to-assets'],
    relatedValuations: [],
    relatedFaqs: ['cost-of-funds-vs-cost-of-deposits', 'how-to-calculate-cost-of-funds', 'how-to-evaluate-bank-funding-mix', 'wholesale-funding-vs-core-deposits'],
    relatedGlossaryTerms: ['Cost of Deposits', 'Cost of Funds', 'Core Deposits', 'Net Interest Margin'],
    cta: {
      type: 'learn-metric',
      target: '/metrics/cost-of-deposits',
      text: 'Learn more about cost of deposits and deposit franchise analysis'
    },
    metaTitle: 'How to Calculate Cost of Deposits for Banks | BankSift',
    metaDescription: 'Step-by-step guide to calculating cost of deposits for a bank, including formula options, a worked example, and why deposit composition drives the result.'
  },
  {
    slug: 'how-to-calculate-non-interest-income-ratio',
    question: 'How do I calculate the non-interest income to revenue ratio?',
    cluster: 'efficiency',
    clusterName: 'Bank Efficiency and Funding',
    intentType: 'procedural',
    shortAnswer: 'The non-interest income to revenue ratio is calculated by dividing non-interest income by total revenue (net interest income plus non-interest income), expressing fee and other non-lending income as a percentage of the bank\'s total revenue base',
    fullAnswer: 'The formula is:\n\nNon-Interest Income to Revenue = Non-Interest Income / (Net Interest Income + Non-Interest Income)\n\nThe result is expressed as a percentage.\n\nStep-by-step calculation:\n\n1. Find non-interest income on the income statement. This includes service charges on deposits, fiduciary and trust fees, mortgage banking revenue, trading revenue, insurance commissions, investment banking fees, card interchange income, gains or losses on securities, and other miscellaneous fee income.\n2. Find net interest income on the income statement (total interest income minus total interest expense).\n3. Add non-interest income and net interest income to get total revenue.\n4. Divide non-interest income by total revenue.\n\nWorked example: A bank reports net interest income of $300 million and non-interest income of $95 million. Total revenue = $300M + $95M = $395 million. Non-interest income to revenue = $95M / $395M = 24.1%.\n\nWhat counts as non-interest income: The specific line items vary by bank and business model. Common categories include service charges and fees on deposit accounts, wealth management and trust fees, mortgage origination and servicing fees, card and payment processing interchange, insurance commissions, investment banking advisory fees, trading gains and losses, gains and losses on securities sales, and bank-owned life insurance (BOLI) income. The notes to the financial statements typically provide a detailed breakdown.\n\nAdjustments to consider: Securities gains and losses can distort the ratio in any given quarter because they are often lumpy and non-recurring. Some analysts exclude securities gains/losses from both the numerator and the denominator to calculate a "core" non-interest income ratio that better represents recurring fee income capacity. Similarly, gains or losses on sales of branches, subsidiaries, or other assets should be considered one-time items.\n\nRelationship to the efficiency ratio: A bank with high non-interest income may have a higher efficiency ratio (because fee businesses like wealth management require significant compensation expense) but a lower net overhead ratio (because fee income offsets a larger share of total expenses). The non-interest income ratio helps explain why some banks with seemingly high efficiency ratios still generate strong returns.\n\nWhere to find the inputs: Both net interest income and non-interest income are on the income statement in 10-K and 10-Q filings. Detailed non-interest income breakdowns are typically in the notes. Some banks report this ratio directly in their earnings releases or investor presentations.',
    relatedMetrics: ['non-interest-income-to-revenue', 'efficiency-ratio', 'net-overhead-ratio', 'net-interest-margin', 'roaa'],
    relatedValuations: [],
    relatedFaqs: ['what-is-non-interest-income-ratio', 'how-to-calculate-efficiency-ratio', 'how-to-calculate-net-overhead-ratio'],
    relatedGlossaryTerms: ['Non-Interest Income', 'Fee Income', 'Net Interest Income'],
    cta: {
      type: 'learn-metric',
      target: '/metrics/non-interest-income-to-revenue',
      text: 'Learn more about the non-interest income ratio and revenue diversification'
    },
    metaTitle: 'How to Calculate Non-Interest Income to Revenue Ratio | BankSift',
    metaDescription: 'Step-by-step guide to calculating the non-interest income to revenue ratio for banks, including what counts as fee income and adjustments to consider.'
  },
  {
    slug: 'how-to-calculate-yield-on-earning-assets',
    question: 'How do I calculate yield on earning assets (interest income to earning assets)?',
    cluster: 'efficiency',
    clusterName: 'Bank Efficiency and Funding',
    intentType: 'procedural',
    shortAnswer: 'Yield on earning assets is calculated by dividing total interest income by average earning assets, expressing the annualized return the bank earns on its interest-generating asset base',
    fullAnswer: 'The formula is:\n\nYield on Earning Assets = Total Interest Income / Average Earning Assets\n\nThe result is expressed as an annualized percentage.\n\nStep-by-step calculation:\n\n1. Find total interest income on the income statement. This includes interest and fees on loans, interest on investment securities, interest on deposits at other banks, interest on federal funds sold, and any other interest-earning sources.\n2. Find total earning assets on the balance sheet. Earning assets include all assets that generate interest income: total loans (net of unearned income), investment securities (both held-to-maturity and available-for-sale), interest-bearing deposits at other banks, federal funds sold, and securities purchased under agreements to resell.\n3. Calculate average earning assets (beginning-of-period plus end-of-period, divided by 2). Some banks report average earning assets in their supplemental data.\n4. Divide total interest income by average earning assets.\n\nWorked example: A bank has total interest income of $480 million for the year. Average earning assets are $9.2 billion. Yield on earning assets = $480M / $9.2B = 5.22%.\n\nTax-equivalent adjustment: Some analysts calculate the yield on a tax-equivalent basis by adding back the tax benefit of tax-exempt income (primarily from municipal securities and certain loans). The adjustment grosses up the interest income on tax-exempt instruments to what it would be on a pre-tax basis, making yields comparable across banks with different proportions of tax-exempt assets. Banks that hold significant municipal bond portfolios will show a higher tax-equivalent yield than the unadjusted figure. Many banks disclose the tax-equivalent yield directly in their interest rate sensitivity tables.\n\nRelationship to NIM: The yield on earning assets is the "top line" of the NIM calculation. NIM equals the yield on earning assets minus the cost rate on interest-bearing liabilities (approximately). Tracking yield on earning assets separately from cost of funds helps decompose NIM changes. For instance, NIM expansion could result from rising asset yields, declining funding costs, or both. The yield metric isolates the asset-side contribution.\n\nComposition effects: The overall yield is a weighted average of yields on different asset categories. Loans typically yield the most, followed by corporate bonds, mortgage-backed securities, and Treasury securities. A shift in asset mix toward more loans and fewer securities will raise the overall yield, while a shift toward securities will lower it, independent of any rate changes.\n\nWhere to find the inputs: Total interest income is on the income statement. Earning assets are on the balance sheet, though the exact composition may require adding several line items. The 10-K interest rate sensitivity table is the best source, as it typically provides average balances and average yields for each earning asset category.',
    relatedMetrics: ['interest-income-to-earning-assets', 'net-interest-margin', 'cost-of-funds', 'loans-to-assets'],
    relatedValuations: [],
    relatedFaqs: ['how-to-calculate-nim', 'how-to-calculate-cost-of-funds', 'what-causes-nim-to-change'],
    relatedGlossaryTerms: ['Earning Assets', 'Yield on Earning Assets', 'Net Interest Margin', 'Net Interest Spread'],
    cta: {
      type: 'learn-metric',
      target: '/metrics/interest-income-to-earning-assets',
      text: 'Learn more about yield on earning assets and asset-side profitability analysis'
    },
    metaTitle: 'How to Calculate Yield on Earning Assets for Banks | BankSift',
    metaDescription: 'Step-by-step guide to calculating yield on earning assets, including the formula, tax-equivalent adjustments, and how it relates to NIM and asset mix.'
  }
];

export default HOW_TO_CALCULATE_PROFITABILITY_EFFICIENCY;

// "How to Calculate" FAQ pages for all 13 existing metrics
// Drop-in ready for src/data/content/faqs.js
// Each entry belongs to the cluster matching its metric category
// intentType is always "procedural"

export const HOW_TO_CALCULATE_EXISTING_FAQS = [

  // ============================================================
  // PROFITABILITY METRICS
  // ============================================================

  {
    slug: 'how-to-calculate-roe',
    question: 'How do I calculate return on equity (ROE) for a bank?',
    cluster: 'profitability',
    clusterName: 'Bank Profitability Metrics',
    intentType: 'procedural',

    shortAnswer: 'Divide net income by average shareholders\' equity, or use alternative formulas including the DuPont decomposition to break ROE into its component drivers',
    fullAnswer: 'The primary formula for ROE is net income divided by average shareholders\' equity. Average equity is used rather than period-end equity because net income is earned throughout the period. For a bank that reported $50 million in net income with beginning equity of $400 million and ending equity of $450 million, the average equity is $425 million and ROE is 11.8%.\n\nThe standard average uses beginning and ending balances: (beginning equity + ending equity) / 2. The FFIEC Uniform Bank Performance Report uses a five-point average that includes equity at the end of each of the four most recent quarters plus the beginning balance, divided by five. The five-point method smooths out large intra-year swings from capital events or earnings seasonality. Both approaches are acceptable, but consistency matters when comparing banks. If one source uses a two-point average and another uses a five-point average, the results will differ slightly.\n\nAlternative formulas provide useful cross-checks. ROE equals ROAA multiplied by the equity multiplier (average assets divided by average equity). If ROAA is 1.1% and the equity multiplier is 10x, ROE is 11%. This decomposition reveals whether ROE is driven by asset productivity or by leverage. ROE also equals P/B divided by P/E, which links valuation multiples to profitability and can be rearranged to check consistency across metrics.\n\nThe DuPont decomposition breaks ROE into three components for deeper analysis: profit margin (net income divided by revenue) multiplied by asset utilization (revenue divided by average assets) multiplied by the equity multiplier (average assets divided by average equity). For banks, revenue is typically defined as net interest income plus non-interest income. This decomposition isolates whether changes in ROE stem from margin shifts, asset productivity changes, or leverage changes.\n\nTo find the inputs in SEC filings, net income appears on the consolidated statements of income in the 10-K or 10-Q. Use net income attributable to common shareholders if the bank has preferred stock outstanding, as preferred dividends reduce the income available to common equity. Shareholders\' equity appears on the consolidated balance sheet. For the average, use the current period-end balance and the prior period-end balance.\n\nFor trailing twelve months (TTM) calculations using quarterly data, sum net income from the four most recent 10-Q filings. Use the average of the equity balance five quarters ago and the most recent quarter-end.\n\nA common calculation mistake is using period-end equity rather than average equity, which understates ROE if equity grew during the period and overstates it if equity declined. Another mistake is failing to subtract preferred stock dividends from net income for banks that have preferred shares outstanding, which inflates the ROE available to common shareholders.',

    relatedMetrics: ['roe', 'roaa', 'equity-to-assets', 'price-to-book', 'price-to-earnings'],
    relatedValuations: ['roe-pb-framework', 'dupont-decomposition'],
    relatedFaqs: ['what-is-a-good-roe-for-banks', 'roe-vs-roaa', 'dupont-decomposition-for-banks', 'how-to-calculate-roaa'],
    relatedGlossaryTerms: ['Equity Multiplier', 'DuPont Decomposition (for banks)', 'Return on Tangible Common Equity (ROTCE)'],

    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Screen banks by ROE and related profitability metrics'
    },

    metaTitle: 'How to Calculate ROE for a Bank Stock | BankSift',
    metaDescription: 'Step-by-step guide to calculating ROE for banks, including the DuPont decomposition, FFIEC averaging methods, and where to find inputs in SEC filings.'
  },

  {
    slug: 'how-to-calculate-roaa',
    question: 'How do I calculate return on average assets (ROAA) for a bank?',
    cluster: 'profitability',
    clusterName: 'Bank Profitability Metrics',
    intentType: 'procedural',

    shortAnswer: 'Divide net income by average total assets for the period, using either a two-point or five-point average method',
    fullAnswer: 'The formula for ROAA is net income divided by average total assets. Average assets are used because net income accumulates throughout the period while total assets represent a point-in-time balance. For a bank with $25 million in net income, beginning total assets of $2.4 billion, and ending total assets of $2.6 billion, the average is $2.5 billion and ROAA is 1.0%.\n\nThe two-point average method uses (beginning assets + ending assets) / 2. The five-point average used in the FFIEC Uniform Bank Performance Report takes total assets at the end of each of the four most recent quarters plus the beginning balance, divided by five. The five-point method is more accurate for banks experiencing significant asset growth or contraction during the year, since it captures the trajectory rather than just the endpoints.\n\nThe alternative formula links ROAA to ROE: ROAA equals ROE divided by the equity multiplier (average assets / average equity). If ROE is 12% and the equity multiplier is 11x, ROAA is approximately 1.09%. This relationship is useful for decomposing whether a bank\'s ROE is driven by operational performance (captured in ROAA) or by leverage (captured in the equity multiplier).\n\nWhen working with quarterly filings, annualize the quarterly net income before dividing. A bank reporting $7 million in net income for one quarter is earning at an annualized rate of $28 million. Divide the annualized figure by average assets for the quarter. Failing to annualize quarterly net income is a common mistake that produces ROAA values roughly one-quarter of the actual annual rate.\n\nTo find inputs in SEC filings, net income appears on the consolidated statements of income. Total assets appears as the final line of the asset section on the consolidated balance sheet. For the average, use the current period-end total assets and the prior year-end total assets for an annual calculation, or the current and prior quarter-end balances for a quarterly calculation.\n\nFor banks with preferred stock, use net income available to common shareholders (net income minus preferred dividends) if the goal is measuring returns to common equity holders. However, the standard ROAA definition uses total net income in the numerator because the denominator (total assets) is funded by all forms of capital, not just common equity.\n\nA practical nuance for bank analysis: ROAA is less affected by capital structure decisions than ROE, making it more useful for comparing banks that have different leverage levels or that have recently raised or returned capital. Two banks with identical ROAA but different equity-to-assets ratios will show different ROE values, with the more leveraged bank appearing more profitable on an ROE basis despite equivalent operational performance.',

    relatedMetrics: ['roaa', 'roe', 'equity-to-assets', 'net-interest-margin'],
    relatedValuations: ['roe-pb-framework'],
    relatedFaqs: ['what-is-a-good-roaa-for-banks', 'roe-vs-roaa', 'when-to-use-roe-vs-roaa', 'how-to-calculate-roe'],
    relatedGlossaryTerms: ['Equity Multiplier'],

    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Screen banks by ROAA and compare across sizes'
    },

    metaTitle: 'How to Calculate ROAA for a Bank Stock | BankSift',
    metaDescription: 'Step-by-step guide to calculating ROAA for banks, including averaging methods, annualizing quarterly data, and the ROAA-to-ROE relationship.'
  },

  {
    slug: 'how-to-calculate-nim',
    question: 'How do I calculate net interest margin (NIM) for a bank?',
    cluster: 'profitability',
    clusterName: 'Bank Profitability Metrics',
    intentType: 'procedural',

    shortAnswer: 'Divide net interest income by average earning assets, expressed as a percentage; tax-equivalent adjustments may be needed for banks with significant tax-exempt income',
    fullAnswer: 'The primary formula for NIM is net interest income divided by average earning assets, expressed as a percentage. Net interest income equals total interest income minus total interest expense. Earning assets include loans, investment securities, interest-bearing deposits at other banks, and federal funds sold. For a bank with $90 million in net interest income and $2.5 billion in average earning assets, NIM is 3.6%.\n\nNIM is distinct from the net interest spread, though the two are often confused. The net interest spread is the difference between the yield on earning assets (interest income / average earning assets) and the cost of interest-bearing liabilities (interest expense / average interest-bearing liabilities). NIM and the spread differ because the denominators differ: NIM uses earning assets in the denominator while the cost component uses only interest-bearing liabilities. Since banks fund some earning assets with non-interest-bearing deposits and equity (which carry no explicit interest cost), NIM is typically higher than the net interest spread.\n\nThe tax-equivalent NIM adjustment accounts for the fact that some earning assets (primarily municipal bonds) generate tax-exempt income. To make NIM comparable across banks with different proportions of tax-exempt assets, the tax-exempt interest income is grossed up to a pre-tax equivalent. The adjustment formula is: tax-exempt income / (1 - marginal tax rate). A bank earning $5 million in tax-exempt income at a 21% corporate tax rate would gross this up to approximately $6.33 million. The tax-equivalent NIM provides a more accurate comparison of the true interest rate spreads banks are earning on their assets.\n\nTo find the inputs in SEC filings, interest income and interest expense appear on the consolidated statements of income, typically broken out by category (interest on loans, interest on securities, interest on deposits, interest on borrowings). Net interest income is shown as a subtotal. Average earning assets may be disclosed in the bank\'s management discussion and analysis section or in supplemental tables. If not disclosed, it can be approximated by averaging the beginning and ending balances of total loans, investment securities, and other interest-earning assets from the balance sheet.\n\nWhen calculating NIM from quarterly data, the quarterly net interest income figure already reflects one quarter\'s worth of income, and the average earning assets should be the average for that same quarter. NIM calculated this way is already an annualized rate because both the numerator and denominator cover the same time period. A common mistake is annualizing quarterly net interest income (multiplying by four) and then dividing by quarterly average assets, which still produces the correct NIM since both sides scale equally. The error to avoid is mixing annual income with quarterly assets or vice versa.\n\nAnother bank-specific nuance: some banks report NIM on a fully tax-equivalent (FTE) basis in their earnings releases while the GAAP income statement does not include this adjustment. When comparing NIM across sources, verify whether the figures are on a GAAP or FTE basis.',

    relatedMetrics: ['net-interest-margin', 'roe', 'roaa', 'cost-of-funds', 'cost-of-deposits', 'interest-income-to-earning-assets'],
    relatedValuations: [],
    relatedFaqs: ['what-is-a-good-nim-for-banks', 'what-causes-nim-to-change', 'what-is-net-interest-income', 'how-to-calculate-yield-on-earning-assets'],
    relatedGlossaryTerms: ['Earning Assets', 'Yield on Earning Assets', 'Net Interest Spread'],

    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Screen banks by NIM and compare spreads'
    },

    metaTitle: 'How to Calculate Net Interest Margin (NIM) | BankSift',
    metaDescription: 'Step-by-step guide to calculating NIM for banks, including tax-equivalent adjustments, the difference from net interest spread, and SEC filing inputs.'
  },

  // ============================================================
  // EFFICIENCY & FUNDING METRICS
  // ============================================================

  {
    slug: 'how-to-calculate-efficiency-ratio',
    question: 'How do I calculate the efficiency ratio for a bank?',
    cluster: 'efficiency',
    clusterName: 'Bank Efficiency and Funding',
    intentType: 'procedural',

    shortAnswer: 'Divide non-interest expense by total revenue (net interest income plus non-interest income), expressed as a percentage where lower values indicate greater efficiency',
    fullAnswer: 'The primary formula for the efficiency ratio is non-interest expense divided by the sum of net interest income and non-interest income. For a bank with $60 million in non-interest expense, $80 million in net interest income, and $25 million in non-interest income, total revenue is $105 million and the efficiency ratio is 57.1%. This means the bank spends approximately 57 cents to generate each dollar of revenue.\n\nThe revenue definition matters and is a common source of discrepancy between different calculations. The standard denominator is net interest income plus non-interest income. Some analysts exclude certain volatile items from non-interest income, such as securities gains or losses, to produce a "core" revenue figure. Others exclude specific expense items from the numerator, such as amortization of intangible assets from acquisitions, to produce an "adjusted" efficiency ratio. Banks themselves sometimes report an adjusted efficiency ratio in their earnings releases. When comparing efficiency ratios across sources, confirm which definition of revenue and expense is being used.\n\nThe adjusted efficiency ratio excluding intangible asset amortization is particularly relevant for banks that have made acquisitions. Amortization of core deposit intangibles and other acquisition-related intangibles is a non-cash expense that flows through non-interest expense but does not reflect the bank\'s ongoing operating cost structure. Excluding this amortization provides a cleaner view of operational efficiency. The adjustment is: (non-interest expense minus intangible amortization) divided by total revenue.\n\nTo find the inputs in SEC filings, non-interest expense appears on the consolidated statements of income, typically broken out into categories such as salaries and employee benefits, occupancy expense, and other non-interest expense. Net interest income appears as a subtotal after interest income and interest expense. Non-interest income is also shown as a subtotal with its own line-item breakdown. Intangible asset amortization, if needed for the adjusted ratio, may appear as a separate line item within non-interest expense or may need to be found in the notes to financial statements.\n\nFor quarterly calculations, both the numerator and denominator should cover the same period. Using one quarter of non-interest expense divided by one quarter of revenue produces the efficiency ratio for that quarter. For a trailing twelve months (TTM) efficiency ratio, sum the four most recent quarters of non-interest expense and divide by the sum of four quarters of total revenue.\n\nA common calculation mistake is using total interest income rather than net interest income in the denominator. Total interest income does not account for the cost of funding, so using it produces an artificially low efficiency ratio that overstates operational efficiency. Another mistake is including provision for credit losses in non-interest expense. Provision expense is a separate line item on the income statement and is not part of operating expenses for efficiency ratio purposes.',

    relatedMetrics: ['efficiency-ratio', 'roe', 'roaa', 'net-interest-margin'],
    relatedValuations: ['peer-comparison-analysis'],
    relatedFaqs: ['what-is-a-good-efficiency-ratio', 'what-drives-efficiency-ratio', 'why-small-banks-higher-efficiency-ratio', 'how-to-calculate-net-overhead-ratio'],
    relatedGlossaryTerms: [],

    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Screen banks by Efficiency Ratio'
    },

    metaTitle: 'How to Calculate the Efficiency Ratio for a Bank | BankSift',
    metaDescription: 'Step-by-step guide to calculating the bank efficiency ratio, including the adjusted ratio excluding intangible amortization and common mistakes to avoid.'
  },

  {
    slug: 'how-to-calculate-deposits-to-assets',
    question: 'How do I calculate the deposits-to-assets ratio for a bank?',
    cluster: 'efficiency',
    clusterName: 'Bank Efficiency and Funding',
    intentType: 'procedural',

    shortAnswer: 'Divide total deposits by total assets from the balance sheet, expressed as a percentage that indicates how much of the bank\'s funding comes from customer deposits',
    fullAnswer: 'The formula for deposits to assets is total deposits divided by total assets, expressed as a percentage. For a bank with $1.8 billion in total deposits and $2.2 billion in total assets, the ratio is 81.8%. This means deposits fund approximately 82% of the bank\'s asset base.\n\nThe calculation is straightforward, but the distinction between total deposits and core deposits is important for interpretation. Total deposits includes all deposit categories: non-interest-bearing checking accounts, interest-bearing checking, savings accounts, money market accounts, and certificates of deposit (CDs). Core deposits are a subset that excludes large time deposits (typically CDs above $250,000) and brokered deposits, which are considered less stable because they are more rate-sensitive and more likely to leave the bank when rates change. The deposits-to-assets ratio uses total deposits in the standard calculation. A separate analysis of core deposits as a percentage of total deposits or total assets provides a more refined view of funding stability, but this requires data from the bank\'s call report or 10-K disclosures rather than the summary balance sheet.\n\nTo find the inputs in SEC filings, total deposits appears on the consolidated balance sheet, typically as a single line item within the liabilities section. Some banks break deposits into subcategories on the face of the balance sheet; others provide the detail in the notes. Total assets is the final line of the asset section on the consolidated balance sheet.\n\nThis ratio uses period-end balances rather than averages, since both the numerator and denominator are balance sheet items measured at the same point in time. Using the most recent quarter-end balance sheet provides the current funding structure.\n\nA common nuance: the ratio can change due to movements in either the numerator or the denominator. A bank that is growing its securities portfolio rapidly without matching deposit growth will see deposits-to-assets decline even if deposits are stable. Conversely, a bank paying down borrowings and replacing them with deposit funding will see the ratio increase even without absolute deposit growth. Looking at both the ratio and the absolute dollar changes provides better context.\n\nThe deposits-to-assets ratio relates directly to the loans-to-deposits ratio and the loans-to-assets ratio. Together, these three ratios describe the basic structure of the bank\'s balance sheet: how much is funded by deposits, how much of the deposit base is being lent out, and what share of assets are deployed in loans.',

    relatedMetrics: ['deposits-to-assets', 'loans-to-deposits', 'loans-to-assets'],
    relatedValuations: [],
    relatedFaqs: ['what-is-deposits-to-assets-ratio', 'wholesale-funding-vs-core-deposits', 'how-to-evaluate-bank-funding-mix', 'how-to-calculate-loans-to-deposits'],
    relatedGlossaryTerms: ['Core Deposits', 'Core Deposit Premium'],

    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Screen banks by Deposits to Assets ratio'
    },

    metaTitle: 'How to Calculate Deposits to Assets for a Bank | BankSift',
    metaDescription: 'Step-by-step guide to calculating the deposits-to-assets ratio, including the difference between total and core deposits and where to find data in filings.'
  },

  {
    slug: 'how-to-calculate-loans-to-deposits',
    question: 'How do I calculate the loans-to-deposits ratio for a bank?',
    cluster: 'efficiency',
    clusterName: 'Bank Efficiency and Funding',
    intentType: 'procedural',

    shortAnswer: 'Divide total loans by total deposits from the balance sheet; note whether net loans or gross loans are used, as the choice affects the result',
    fullAnswer: 'The formula for loans to deposits is total loans divided by total deposits, expressed as a percentage. For a bank with $1.5 billion in total loans and $1.8 billion in total deposits, the ratio is 83.3%. This means the bank has lent out approximately 83% of its deposit base.\n\nThe choice between net loans and gross loans matters. Gross loans represent the total outstanding loan balance before subtracting the allowance for credit losses (ACL). Net loans equal gross loans minus the allowance. The difference is typically 1% to 2% of the loan balance, but it can be larger for banks with elevated credit risk. The standard calculation uses net loans (as reported on the balance sheet), but some analysts prefer gross loans for a cleaner measure of lending activity. When comparing across sources, verify which loan figure is used.\n\nTo find the inputs in SEC filings, net loans (or "loans, net of allowance" or "loans and leases, net") appears on the consolidated balance sheet. Gross loans and the allowance for credit losses are typically disclosed separately either on the face of the balance sheet or in the accompanying notes. Total deposits appears in the liabilities section of the balance sheet.\n\nThe ratio uses period-end balances since both inputs are balance sheet figures. Using the same quarter-end for both numerator and denominator ensures consistency.\n\nThe loans-to-deposits ratio connects directly to the other two balance sheet composition ratios. Loans to deposits equals loans-to-assets divided by deposits-to-assets. If a bank\'s loans-to-assets ratio is 65% and its deposits-to-assets ratio is 80%, the loans-to-deposits ratio is 81.25% (0.65 / 0.80). This algebraic relationship provides a cross-check when calculating all three ratios for the same bank.\n\nA common calculation mistake is mixing time periods, such as using loans from the most recent quarterly balance sheet but deposits from the annual 10-K. Both figures should come from the same reporting date. Another error is double-counting: some balance sheets present loans in subcategories (commercial real estate loans, residential mortgage loans, consumer loans) as well as a total. Use the total line, not the sum of subcategories, which may include reclassifications or adjustments.\n\nFor banks with significant off-balance-sheet commitments (unfunded loan commitments, letters of credit), the loans-to-deposits ratio understates the total credit exposure relative to the deposit base. The on-balance-sheet ratio remains the standard measure, but analysts evaluating funding risk may also consider unfunded commitments.',

    relatedMetrics: ['loans-to-deposits', 'deposits-to-assets', 'loans-to-assets', 'net-interest-margin'],
    relatedValuations: [],
    relatedFaqs: ['healthy-loans-to-deposits-ratio', 'loans-to-deposits-too-high', 'loans-to-deposits-too-low', 'how-to-calculate-deposits-to-assets'],
    relatedGlossaryTerms: ['Allowance for Credit Losses (ACL)'],

    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Screen banks by Loans to Deposits ratio'
    },

    metaTitle: 'How to Calculate Loans to Deposits for a Bank | BankSift',
    metaDescription: 'Step-by-step guide to calculating the loans-to-deposits ratio, including net vs gross loans, the relationship to other balance sheet ratios, and filing sources.'
  },

  {
    slug: 'how-to-calculate-loans-to-assets',
    question: 'How do I calculate the loans-to-assets ratio for a bank?',
    cluster: 'efficiency',
    clusterName: 'Bank Efficiency and Funding',
    intentType: 'procedural',

    shortAnswer: 'Divide total loans (net or gross) by total assets from the balance sheet, expressed as a percentage showing what share of the bank\'s assets are deployed in lending',
    fullAnswer: 'The formula for loans to assets is total loans divided by total assets, expressed as a percentage. For a bank with $1.6 billion in net loans and $2.3 billion in total assets, the ratio is 69.6%. This means approximately 70% of the bank\'s assets are deployed in loans, with the remaining 30% in securities, cash, and other assets.\n\nAs with the loans-to-deposits ratio, the choice between net loans and gross loans affects the result. Net loans (gross loans minus the allowance for credit losses) is the figure most commonly reported on the face of the balance sheet and is the standard input. The difference between net and gross is usually modest, but using net loans produces a slightly lower ratio. Consistency is key when comparing across banks or across time periods for the same bank.\n\nSome analysts use average total assets rather than period-end total assets in the denominator, particularly when the goal is understanding the asset deployment over a full year rather than at a single point. Average assets smooths out seasonal or event-driven fluctuations. For a point-in-time snapshot of balance sheet composition, period-end figures are standard.\n\nTo find the inputs in SEC filings, net loans appears on the consolidated balance sheet in the assets section. Total assets is the bottom line of the assets section. Both figures are readily available on the face of any bank\'s balance sheet in a 10-K or 10-Q filing.\n\nThe loans-to-assets ratio is the simplest of the three balance sheet composition ratios (alongside deposits-to-assets and loans-to-deposits) and provides the most direct view of asset deployment. A higher ratio indicates the bank is more heavily oriented toward lending, which generally supports higher NIM since loans yield more than most securities. A lower ratio indicates a larger allocation to securities, cash, or other assets, which may reflect a more conservative posture or limited loan demand in the bank\'s markets.\n\nA practical nuance: the ratio does not distinguish between loan types, and the risk profile of a loan portfolio depends heavily on its composition. Two banks with identical 70% loans-to-assets ratios have very different risk profiles if one focuses on single-family residential mortgages and the other concentrates in construction and land development loans. The ratio is a starting point for understanding asset deployment, not a measure of risk.',

    relatedMetrics: ['loans-to-assets', 'loans-to-deposits', 'deposits-to-assets', 'net-interest-margin'],
    relatedValuations: [],
    relatedFaqs: ['how-to-calculate-loans-to-deposits', 'how-to-calculate-deposits-to-assets', 'evaluating-loan-portfolio-composition'],
    relatedGlossaryTerms: [],

    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Screen banks by Loans to Assets ratio'
    },

    metaTitle: 'How to Calculate Loans to Assets for a Bank | BankSift',
    metaDescription: 'Step-by-step guide to calculating the loans-to-assets ratio, including net vs gross loans, average vs period-end assets, and what the ratio reveals.'
  },

  // ============================================================
  // CAPITAL STRENGTH METRICS
  // ============================================================

  {
    slug: 'how-to-calculate-equity-to-assets',
    question: 'How do I calculate the equity-to-assets ratio for a bank?',
    cluster: 'capital-and-risk',
    clusterName: 'Capital Strength and Asset Quality',
    intentType: 'procedural',

    shortAnswer: 'Divide total shareholders\' equity by total assets from the balance sheet; the inverse of this ratio is the equity multiplier used in DuPont decomposition',
    fullAnswer: 'The formula for equity to assets is total shareholders\' equity divided by total assets, expressed as a percentage. For a bank with $250 million in total equity and $2.8 billion in total assets, the ratio is 8.9%. This means equity funds approximately 9% of the bank\'s asset base, with the remaining 91% funded by deposits, borrowings, and other liabilities.\n\nThe calculation uses period-end balances from the consolidated balance sheet. Total shareholders\' equity (also labeled "total equity" or "total stockholders\' equity") includes common stock, additional paid-in capital, retained earnings, accumulated other comprehensive income or loss (AOCI), and treasury stock. Total assets is the sum of all asset line items on the balance sheet.\n\nThe inverse of the equity-to-assets ratio is the equity multiplier: total assets divided by total equity. If equity to assets is 8.9%, the equity multiplier is approximately 11.2x (1 / 0.089). The equity multiplier is a key component of the DuPont decomposition of ROE. ROE equals ROAA multiplied by the equity multiplier, so a bank with 1.0% ROAA and an equity multiplier of 11.2x produces ROE of approximately 11.2%. This relationship makes equity to assets a direct link between leverage and return on equity.\n\nTo find the inputs in SEC filings, total shareholders\' equity appears at the bottom of the equity section on the consolidated balance sheet. Total assets is the final line of the asset section. Both are prominently displayed on any bank\'s quarterly or annual balance sheet.\n\nAn important distinction: total equity may include preferred stock and minority interests (non-controlling interests) in addition to common equity. For the standard equity-to-assets ratio, total equity is used. For a common equity-focused variant, subtract preferred stock from total equity before dividing by total assets. Banks with significant preferred stock outstanding will show a higher total equity-to-assets ratio than their common equity alone would support.\n\nACCI can cause meaningful swings in equity to assets without any change in the bank\'s operating performance. When interest rates rise, unrealized losses on available-for-sale securities flow through AOCI and reduce reported equity. A bank may see its equity-to-assets ratio decline by a full percentage point or more due solely to mark-to-market movements in its securities portfolio, even if its lending, deposits, and earnings are unchanged. Awareness of AOCI\'s impact helps avoid misinterpreting capital ratio changes as operational developments.',

    relatedMetrics: ['equity-to-assets', 'roe', 'roaa', 'tangible-common-equity-ratio'],
    relatedValuations: ['roe-pb-framework', 'dupont-decomposition'],
    relatedFaqs: ['what-is-a-good-equity-to-assets-ratio', 'how-to-calculate-roe', 'dupont-decomposition-for-banks', 'what-is-aoci'],
    relatedGlossaryTerms: ['Equity Multiplier', 'DuPont Decomposition (for banks)'],

    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Screen banks by Equity to Assets ratio'
    },

    metaTitle: 'How to Calculate Equity to Assets for a Bank | BankSift',
    metaDescription: 'Step-by-step guide to calculating equity to assets, including the equity multiplier, the DuPont connection to ROE, and the impact of AOCI on results.'
  },

  // ============================================================
  // VALUATION METRICS
  // ============================================================

  {
    slug: 'how-to-calculate-bvps',
    question: 'How do I calculate book value per share (BVPS) for a bank?',
    cluster: 'valuation',
    clusterName: 'How to Value Bank Stocks',
    intentType: 'procedural',

    shortAnswer: 'Divide total shareholders\' equity by the number of common shares outstanding, adjusting for preferred stock if the bank has preferred shares',
    fullAnswer: 'The primary formula for BVPS is total shareholders\' equity divided by total common shares outstanding. For a bank with $500 million in total equity and 25 million shares outstanding, BVPS is $20.00.\n\nIf the bank has preferred stock outstanding, subtract the liquidation value of preferred stock from total equity before dividing by common shares. The formula becomes (total equity minus preferred stock) divided by common shares outstanding. A bank with $500 million in total equity, $50 million in preferred stock, and 25 million common shares outstanding has a common BVPS of $18.00. Failing to subtract preferred stock overstates the book value attributable to common shareholders. Preferred stock details appear in the equity section of the balance sheet or in the notes to financial statements.\n\nUse diluted shares outstanding rather than basic shares when available, as diluted shares account for stock options, warrants, and other potentially dilutive securities. The difference is typically small for banks but can be material for banks with large stock option programs. Diluted share counts are disclosed in the earnings per share section of the income statement or the accompanying notes.\n\nTo find the inputs in SEC filings, total shareholders\' equity appears on the consolidated balance sheet. Common shares outstanding is reported on the face of the balance sheet (typically in the equity section or parenthetically next to common stock) and in the notes. The 10-K cover page also discloses shares outstanding as of a recent date.\n\nBVPS growth over time is a useful measure of value creation. A bank that grows BVPS from $20.00 to $26.00 over three years has compounded book value at approximately 9.1% annually. This growth comes from retained earnings (net income minus dividends) plus or minus changes in AOCI. Comparing BVPS growth to ROE and the payout ratio provides a consistency check: a bank with 12% ROE and a 40% payout ratio should grow BVPS at approximately 7.2% annually (12% multiplied by 60% retention), assuming no share issuances, buybacks, or significant AOCI swings.\n\nA common calculation mistake is using the par value of common stock rather than total equity. Par value is a nominal accounting figure (often $0.01 to $10.00 per share) that has no relationship to actual book value. Another mistake is using shares authorized rather than shares outstanding. Authorized shares represent the maximum the bank is permitted to issue, which is typically much larger than the shares actually outstanding.',

    relatedMetrics: ['book-value-per-share', 'price-to-book', 'tangible-book-value-per-share', 'earnings-per-share'],
    relatedValuations: ['graham-number', 'price-to-book-valuation'],
    relatedFaqs: ['tangible-book-value-vs-book-value', 'how-to-calculate-tbvps', 'how-to-calculate-price-to-book', 'what-is-a-good-pb-for-banks'],
    relatedGlossaryTerms: ['Tangible Book Value', 'Tangible Book Value Per Share (TBVPS)'],

    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Screen banks by BVPS and related valuation metrics'
    },

    metaTitle: 'How to Calculate Book Value Per Share (BVPS) | BankSift',
    metaDescription: 'Step-by-step guide to calculating BVPS for banks, including preferred stock adjustments, BVPS growth as a value creation measure, and common mistakes.'
  },

  {
    slug: 'how-to-calculate-price-to-book',
    question: 'How do I calculate the price-to-book (P/B) ratio for a bank?',
    cluster: 'valuation',
    clusterName: 'How to Value Bank Stocks',
    intentType: 'procedural',

    shortAnswer: 'Divide the current share price by book value per share, or equivalently divide market capitalization by total shareholders\' equity',
    fullAnswer: 'The primary formula for P/B is current share price divided by book value per share. If a bank\'s stock trades at $24.00 and its BVPS is $20.00, the P/B ratio is 1.2x. Equivalently, P/B can be calculated as market capitalization divided by total shareholders\' equity. A bank with a $600 million market cap and $500 million in total equity also has a P/B of 1.2x. Both methods produce the same result.\n\nAn important algebraic relationship links P/B to P/E and ROE: P/B equals P/E multiplied by ROE. If a bank trades at 10x earnings and has ROE of 12%, its P/B is 1.2x (10 times 0.12). This relationship provides a useful cross-check and reveals how valuation multiples are interconnected. It also explains why high-ROE banks tend to trade at higher P/B multiples.\n\nThe justified P/B multiple from the ROE-P/B framework estimates what a bank should trade at based on its fundamentals: justified P/B equals (ROE minus g) divided by (r minus g), where g is the sustainable growth rate and r is the cost of equity. A bank with 12% ROE, 8% retention-rate-implied growth, and a 10% cost of equity has a justified P/B of approximately 2.0x. Comparing the actual P/B to the justified P/B indicates whether the bank appears overvalued or undervalued relative to its fundamentals.\n\nTo find the inputs, the current share price is available from any financial data source or stock exchange. BVPS must be calculated from the most recent balance sheet (see the BVPS calculation guide). Market capitalization equals the share price multiplied by shares outstanding. Total shareholders\' equity appears on the consolidated balance sheet.\n\nFor banks with preferred stock, use common equity (total equity minus preferred stock) in the denominator and common shares in the BVPS calculation to produce a P/B ratio that reflects the common shareholders\' position accurately. Using total equity without subtracting preferred stock overstates book value per common share and understates the P/B ratio.\n\nA common calculation mistake is using stale book value data with a current share price. Since book value changes every quarter as earnings are retained and AOCI fluctuates, using a book value from several quarters ago produces an inaccurate P/B. The most recent quarterly balance sheet should always be used.\n\nAnother nuance: AOCI-driven fluctuations in book value cause P/B to move even when the share price is unchanged. When interest rates rise and available-for-sale securities lose value, AOCI declines, book value falls, and P/B rises mechanically. This can make a bank appear more expensive on a P/B basis without any change in its stock price or operating fundamentals.',

    relatedMetrics: ['price-to-book', 'book-value-per-share', 'price-to-earnings', 'roe', 'price-to-tangible-book-value'],
    relatedValuations: ['price-to-book-valuation', 'roe-pb-framework', 'graham-number'],
    relatedFaqs: ['what-is-a-good-pb-for-banks', 'pb-below-one-undervalued', 'how-to-calculate-justified-pb', 'how-to-calculate-bvps'],
    relatedGlossaryTerms: ['Justified P/B Multiple'],

    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Screen banks by P/B ratio'
    },

    metaTitle: 'How to Calculate Price-to-Book (P/B) Ratio | BankSift',
    metaDescription: 'Step-by-step guide to calculating P/B for banks, including the P/B = P/E x ROE relationship, justified P/B, and common calculation pitfalls.'
  },

  {
    slug: 'how-to-calculate-price-to-earnings',
    question: 'How do I calculate the price-to-earnings (P/E) ratio for a bank?',
    cluster: 'valuation',
    clusterName: 'How to Value Bank Stocks',
    intentType: 'procedural',

    shortAnswer: 'Divide the current share price by diluted earnings per share; for banks, distinguish between trailing P/E (using reported earnings) and normalized P/E (adjusting for unusual provision or one-time items)',
    fullAnswer: 'The primary formula for P/E is current share price divided by diluted earnings per share. If a bank trades at $24.00 per share and its TTM diluted EPS is $2.40, the P/E ratio is 10.0x. This means investors are paying $10 for each dollar of annual earnings.\n\nThe trailing P/E uses actual reported earnings from the most recent twelve months. To calculate TTM EPS from quarterly filings, sum the diluted EPS from the four most recent quarters. Alternatively, sum the net income available to common shareholders from four quarters and divide by the most recent diluted share count. The direct summation of quarterly EPS is the simpler approach but may introduce slight rounding differences.\n\nThe algebraic relationship P/E equals P/B divided by ROE provides a cross-check. A bank with P/B of 1.2x and ROE of 12% should have a P/E of approximately 10x (1.2 / 0.12). If the calculated P/E diverges significantly from this estimate, verify the inputs.\n\nNormalized P/E is particularly relevant for banks because provision for credit losses can swing dramatically between periods, making reported earnings temporarily elevated or depressed without reflecting the bank\'s sustainable earning power. During periods of high provisions, reported EPS is low and trailing P/E appears high, potentially making a healthy bank look expensive. During provision releases, EPS is inflated and P/E appears artificially low. Normalized P/E replaces actual provision expense with a long-term average provision level (often expressed as a percentage of average loans based on several years of history) and recalculates earnings accordingly. This produces a more stable earnings figure for valuation purposes.\n\nForward P/E uses analyst consensus earnings estimates for the next twelve months rather than trailing earnings. Forward P/E is widely used for large banks with broad analyst coverage but may not be available for smaller community banks that have limited or no sell-side coverage.\n\nTo find the trailing P/E inputs, the current share price is available from financial data providers. Diluted EPS is reported on the consolidated statements of income in each 10-Q and 10-K. The 10-K provides the full-year figure directly. For a TTM calculation between annual filings, sum the quarterly figures.\n\nA common mistake is using basic EPS rather than diluted EPS. Diluted EPS accounts for potentially dilutive securities (stock options, restricted stock units, convertible instruments) and is the standard for investment analysis. Another mistake is calculating P/E for a bank with negative earnings, which produces a negative or meaningless ratio. P/E is not informative for banks that are currently unprofitable.',

    relatedMetrics: ['price-to-earnings', 'earnings-per-share', 'price-to-book', 'roe'],
    relatedValuations: ['price-to-book-valuation', 'peer-comparison-analysis', 'roe-pb-framework'],
    relatedFaqs: ['what-is-a-good-pe-for-banks', 'how-to-calculate-eps', 'how-to-calculate-price-to-book', 'why-bank-valuation-is-different'],
    relatedGlossaryTerms: ['Provision for Credit Losses'],

    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Screen banks by P/E ratio'
    },

    metaTitle: 'How to Calculate P/E Ratio for a Bank Stock | BankSift',
    metaDescription: 'Step-by-step guide to calculating P/E for banks, including trailing vs normalized P/E, the P/E = P/B / ROE cross-check, and provision volatility adjustments.'
  },

  {
    slug: 'how-to-calculate-eps',
    question: 'How do I calculate earnings per share (EPS) for a bank?',
    cluster: 'valuation',
    clusterName: 'How to Value Bank Stocks',
    intentType: 'procedural',

    shortAnswer: 'Divide net income available to common shareholders by diluted shares outstanding; for TTM calculations, sum the four most recent quarters of net income and use the latest diluted share count',
    fullAnswer: 'The primary formula for diluted EPS is net income available to common shareholders divided by diluted shares outstanding. Net income available to common shareholders equals reported net income minus preferred stock dividends. For a bank with $40 million in net income, $2 million in preferred dividends, and 20 million diluted shares outstanding, EPS is $1.90.\n\nThe distinction between basic and diluted EPS matters for investment analysis. Basic EPS uses the weighted average number of common shares actually outstanding during the period. Diluted EPS adds shares that would be outstanding if all dilutive securities (stock options, restricted stock units, warrants, convertible preferred stock or debt) were exercised or converted. Diluted EPS is always equal to or lower than basic EPS, and it is the standard measure for valuation ratios like P/E and the Graham Number.\n\nSubtracting preferred dividends is essential for banks with preferred stock outstanding. Many banks, particularly larger institutions, have one or more series of preferred stock. The preferred dividends reduce the income available to common shareholders and must be deducted before dividing by common shares. Preferred dividend amounts are disclosed in the income statement (sometimes as a line item between net income and net income available to common shareholders) or in the notes to financial statements.\n\nFor trailing twelve months (TTM) EPS calculations from quarterly data, sum the net income available to common shareholders from the four most recent 10-Q filings. Then divide by the diluted share count from the most recent quarter. An alternative approach sums the diluted EPS figures reported in each of the four quarters, though minor rounding differences may result.\n\nA timing nuance: the 10-K reports full-year EPS directly, but between annual filings, the TTM figure must be assembled from quarterly reports. For a bank that has filed Q1, Q2, and Q3 of the current year plus the prior year\'s 10-K, the TTM EPS equals current Q1 + Q2 + Q3 + prior Q4 earnings, divided by the most recent diluted share count.\n\nTo find the inputs in SEC filings, net income and EPS (both basic and diluted) are reported on the consolidated statements of income. Preferred dividends declared are shown either as a line item on the income statement or in the equity section notes. Diluted shares outstanding are disclosed in the EPS footnote and in the per-share data on the income statement.\n\nA common mistake is comparing EPS across banks of different sizes without adjusting for the number of shares. EPS reflects net income per share, not total profitability. A bank with $2.00 EPS and 50 million shares outstanding is more profitable in total than a bank with $5.00 EPS and 10 million shares. For total profitability comparisons, use net income, ROE, or ROAA.',

    relatedMetrics: ['earnings-per-share', 'price-to-earnings', 'book-value-per-share', 'roe'],
    relatedValuations: ['graham-number', 'margin-of-safety'],
    relatedFaqs: ['how-to-calculate-price-to-earnings', 'what-is-trailing-twelve-months', 'graham-number-for-bank-stocks', 'how-to-calculate-bvps'],
    relatedGlossaryTerms: [],

    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Screen banks by EPS'
    },

    metaTitle: 'How to Calculate EPS for a Bank Stock | BankSift',
    metaDescription: 'Step-by-step guide to calculating EPS for banks, including basic vs diluted shares, preferred dividend adjustments, and TTM calculations from quarterly filings.'
  },

  {
    slug: 'how-to-calculate-dividend-payout-ratio',
    question: 'How do I calculate the dividend payout ratio for a bank?',
    cluster: 'dividends',
    clusterName: 'Bank Dividends and Shareholder Returns',
    intentType: 'procedural',

    shortAnswer: 'Divide dividends per share by earnings per share, or equivalently divide total common dividends paid by net income available to common shareholders',
    fullAnswer: 'The primary formula for the dividend payout ratio is dividends per common share divided by diluted earnings per share, expressed as a percentage. For a bank paying $0.80 per share in annual dividends with diluted EPS of $2.00, the payout ratio is 40%. This means the bank distributes 40% of its earnings to shareholders as dividends and retains the remaining 60%.\n\nThe equivalent aggregate formula is total common dividends paid divided by net income available to common shareholders. A bank with $40 million in net income available to common shareholders that pays $16 million in total common dividends has a 40% payout ratio. Both formulas produce the same result and can serve as cross-checks.\n\nThe retention ratio is the complement of the payout ratio: retention ratio equals 1 minus the payout ratio. If the payout ratio is 40%, the retention ratio is 60%. The retention ratio connects directly to the sustainable growth rate: sustainable growth equals ROE multiplied by the retention ratio. A bank with 12% ROE and a 60% retention ratio has a sustainable growth rate of approximately 7.2% per year. This formula estimates how quickly the bank can grow its equity (and by extension its assets and earnings) through internal capital generation without issuing new shares.\n\nTo find the inputs in SEC filings, dividends per common share are disclosed in the consolidated statements of changes in stockholders\' equity and typically in the earnings per share table or the selected financial data section of the 10-K. Total dividends paid to common shareholders appear in the consolidated statements of cash flows under financing activities. EPS is on the income statement.\n\nFor TTM calculations, sum the dividends per share declared over the four most recent quarters and divide by TTM diluted EPS. Alternatively, sum total dividends paid from four quarters of cash flow statements and divide by TTM net income available to common shareholders.\n\nA common calculation mistake is using dividends paid from the cash flow statement without confirming they match the dividends declared in the current period. Timing differences between dividend declaration and payment can cause the cash flow figure to span different quarters than the income figure. Using dividends declared rather than dividends paid provides a cleaner match to the period\'s earnings.\n\nAnother consideration: a payout ratio above 100% means the bank paid more in dividends than it earned during the period. This draws down retained earnings and reduces book value. While a bank can sustain this temporarily (using accumulated capital), a persistent payout ratio above 100% is unsustainable and typically triggers regulatory scrutiny. For banks with temporarily depressed earnings due to elevated provisions, the payout ratio may spike above 100% even though the dividend itself has not changed.',

    relatedMetrics: ['dividend-payout-ratio', 'earnings-per-share', 'roe'],
    relatedValuations: ['dividend-discount-model', 'gordon-growth-model'],
    relatedFaqs: ['good-dividend-payout-ratio-for-banks', 'how-to-evaluate-dividend-safety', 'roe-payout-ratio-dividend-growth', 'sustainable-growth-rate-and-dividends'],
    relatedGlossaryTerms: ['Retention Ratio', 'Sustainable Growth Rate'],

    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Screen banks by Dividend Payout Ratio'
    },

    metaTitle: 'How to Calculate Dividend Payout Ratio for a Bank | BankSift',
    metaDescription: 'Step-by-step guide to calculating the dividend payout ratio, including the retention ratio, sustainable growth rate connection, and common timing mistakes.'
  }
];

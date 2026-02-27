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
    "shortDescription": "Measures how effectively a bank generates profits from shareholder investments.",
    "description": "Return on Equity (ROE) is one of the most important profitability metrics for evaluating banks. It measures how much profit a bank generates for every dollar of shareholder equity. A higher ROE indicates that the bank is using its equity capital more efficiently to generate earnings.",
    "formulaExplanation": "Net Income is the trailing twelve month (TTM) profit after all expenses and taxes. Average Shareholders' Equity is calculated using a 5-point average of quarterly balance sheet values, following FFIEC methodology.",
    "interpretation": "ROE shows how well a bank is converting shareholder capital into profits. Banks with consistently high ROE are generally better at deploying capital and generating returns for shareholders. However, very high ROE can sometimes indicate excessive leverage or risk-taking.",
    "typicalRange": "Well-managed banks typically achieve ROE between 8% and 15%. Top-performing banks may exceed 15%, while banks below 8% may be underperforming or facing challenges.",
    "goodBad": {
      "good": "ROE above 10-12% generally indicates strong profitability and efficient capital use.",
      "bad": "ROE below 6-8% may indicate weak profitability, excess capital, or operational challenges."
    },
    "considerations": [
      "Compare ROE within peer groups of similar-sized banks with similar business models.",
      "Very high ROE might indicate thin capital buffers or elevated risk levels.",
      "Declining ROE over time may signal deteriorating profitability or increasing competition.",
      "Regulatory capital requirements can constrain ROE by requiring banks to hold more equity."
    ],
    "relatedMetrics": [
      "roaa",
      "efficiency-ratio",
      "equity-to-assets"
    ],
    "relatedMetricDescriptions": {
      "roaa": "Complements ROE by measuring profitability against total assets, removing the effect of leverage.",
      "efficiency-ratio": "Cost management directly impacts net income, which is the numerator of ROE.",
      "equity-to-assets": "Capital levels determine leverage — a key component that amplifies or constrains ROE."
    },
    "dataSource": "Net Income is summed from the four most recent quarterly filings. Equity values are averaged from five consecutive quarterly balance sheets.",
    "bankSpecificContext": "Banks are among the most leveraged businesses in the economy, typically operating with equity-to-asset ratios of 8-12%. Because of this inherent leverage, ROE for banks reflects both management quality and the degree of leverage employed. Regulatory capital requirements set a floor on equity levels, which in turn caps the maximum ROE a bank can achieve at a given level of asset profitability. A bank earning 1% on assets (ROAA) with a 10:1 asset-to-equity ratio produces a 10% ROE. The same ROAA at a 12:1 ratio produces 12% ROE, but regulators may view the thinner capital cushion with concern. This dynamic makes ROE a useful but incomplete measure of bank performance when viewed in isolation.",
    "metricConnections": "ROE sits at the center of several important bank analysis relationships. Through the DuPont decomposition, ROE equals ROAA multiplied by the equity multiplier (assets divided by equity), which separates operating performance from leverage. ROE also determines the justified price-to-book ratio through the ROE-P/B framework: justified P/B = (ROE - g) / (r - g), where g is the sustainable growth rate and r is the cost of equity. The algebraic identity P/B = P/E multiplied by ROE connects the two primary bank valuation ratios directly. A bank's sustainable growth rate equals ROE multiplied by the retention ratio (1 minus the dividend payout ratio), linking profitability to capital generation capacity.",
    "commonPitfalls": "A very high ROE can indicate dangerously thin capital rather than superior management. Comparing ROE across banks without adjusting for differences in leverage is misleading; two banks with identical ROAA can show very different ROEs purely because of capital structure differences. One-time gains from securities sales, tax benefits, or legal settlements can temporarily inflate ROE, making a single quarter's figure unreliable. ROE is also less meaningful during periods of elevated credit losses, when provisions compress net income and distort the ratio. Banks that have recently completed large acquisitions may show depressed ROE due to goodwill diluting the equity base.",
    "acrossBankTypes": "Money center banks with diversified revenue streams and active capital management programs typically target ROE in the 12-15% range. Well-run community banks focused on relationship lending often achieve 10-13% ROE, though this varies with local economic conditions and loan mix. Banks maintaining excess capital above regulatory minimums, whether by choice or regulatory directive, may show ROE below 8% despite strong underlying operations. De novo (newly chartered) banks almost always show negative or very low ROE in their first 3-5 years as they build their loan portfolios and absorb startup costs.",
    "whatDrivesMetric": "The numerator, net income, is driven by net interest margin, fee income generation, operating efficiency (as measured by the efficiency ratio), and provision for credit losses. The denominator, average shareholders' equity, is driven by retained earnings accumulation, capital raises or stock issuances, share buybacks, and regulatory capital requirements. Macroeconomic factors including interest rates, credit cycle conditions, and loan demand all influence the numerator indirectly. Management decisions around capital allocation, dividend policy, and growth strategy directly affect both sides of the ratio.",
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
      "dividend-discount-model": "ROE combined with the retention ratio determines the sustainable dividend growth rate, a key input to the dividend discount model."
    }
  },
  {
    "slug": "roaa",
    "name": "Return on Average Assets (ROAA)",
    "category": "profitability",
    "categoryLabel": "Profitability Ratio",
    "formula": "ROAA = Net Income / Average Total Assets",
    "isPercentage": true,
    "shortDescription": "Measures how efficiently a bank uses its total assets to generate earnings.",
    "description": "Return on Average Assets (ROAA) indicates how profitable a bank is relative to its total assets. Unlike ROE, ROAA is not affected by the bank's capital structure, making it useful for comparing banks with different leverage levels. It shows management's ability to generate earnings from the bank's asset base.",
    "formulaExplanation": "Net Income is the trailing twelve month profit. Average Total Assets is calculated using a 5-point average of quarterly balance sheet values.",
    "interpretation": "ROAA reveals how effectively bank management converts assets into profits. Since banks are asset-intensive businesses, even small improvements in ROAA can significantly impact overall profitability. ROAA is particularly useful for comparing banks of different sizes.",
    "typicalRange": "Most banks achieve ROAA between 0.8% and 1.5%. Top performers may exceed 1.5%, while those below 0.8% may be underperforming.",
    "goodBad": {
      "good": "ROAA above 1.0% is generally considered good, indicating efficient asset utilization.",
      "bad": "ROAA below 0.7% may indicate inefficient operations, poor asset quality, or margin compression."
    },
    "considerations": [
      "ROAA is less susceptible to capital structure differences than ROE.",
      "Asset composition affects ROAA - banks with higher-yielding loan portfolios may show higher ROAA.",
      "Economic conditions significantly impact ROAA through credit losses and margin changes.",
      "Comparing ROAA across very different business models may be misleading."
    ],
    "relatedMetrics": [
      "roe",
      "efficiency-ratio",
      "net-interest-margin"
    ],
    "relatedMetricDescriptions": {
      "roe": "ROE adds the lens of leverage to profitability, building on the asset-level view ROAA provides.",
      "efficiency-ratio": "Operating efficiency affects how much revenue flows through to the net income measured by ROAA.",
      "net-interest-margin": "NIM measures the core lending spread that drives the majority of bank income feeding into ROAA."
    },
    "dataSource": "Net Income is summed from quarterly filings. Asset values are averaged from five consecutive quarterly balance sheets.",
    "bankSpecificContext": "ROAA removes leverage from the profitability equation, showing how productively a bank uses its entire asset base regardless of how those assets are funded. For bank analysis, this is critical because capital structure differences between banks can make ROE comparisons misleading. A bank with 8% equity-to-assets and a bank with 12% equity-to-assets may have identical ROAA but very different ROEs. ROAA reveals which bank is actually generating more profit per dollar of assets deployed, making it the cleaner measure of operating performance.",
    "metricConnections": "ROAA and ROE are linked through the equity multiplier: ROE equals ROAA multiplied by average assets divided by average equity. If a bank shows strong ROAA but weak ROE, it may be overcapitalized, carrying more equity than necessary relative to its asset base. Conversely, strong ROE paired with weak ROAA suggests the bank is relying on high leverage rather than strong asset productivity to generate returns. ROAA combined with net interest margin reveals how effectively the bank converts its interest spread into bottom-line profit after accounting for operating expenses, fee income, and credit losses.",
    "commonPitfalls": "Total asset size can be inflated by large securities portfolios that earn relatively low returns, dragging ROAA down even for operationally efficient banks. ROAA does not distinguish between loan-driven and securities-driven asset bases, so a bank that holds a high proportion of low-yield government securities will show lower ROAA than a similarly efficient bank with a higher loan-to-asset ratio. Using period-end assets rather than average assets can distort the ratio if the bank experienced significant balance sheet growth or contraction during the period. Annualizing quarterly ROAA requires care; simply multiplying by four assumes uniform earnings distribution across quarters, which may not hold for banks with seasonal lending patterns.",
    "acrossBankTypes": "US commercial banks have historically averaged ROAA between 0.90% and 1.30% based on FDIC aggregate data. Community banks with strong local lending franchises and low-cost deposit bases can achieve ROAA above 1.20%. Large money center banks, whose asset bases include substantial low-yield trading assets and securities, often show ROAA in the 0.80-1.10% range. Banks focused primarily on mortgage lending may show lower ROAA due to the lower yields on residential mortgage portfolios relative to commercial and consumer lending.",
    "whatDrivesMetric": "Net interest margin on the earning asset base is the primary driver, representing the spread between interest earned and interest paid. Non-interest income from fees, service charges, and wealth management adds to the numerator. Operating efficiency, as measured by the efficiency ratio, determines how much of total revenue flows through to net income. Provision for credit losses is the most volatile component, capable of swinging ROAA significantly from quarter to quarter. The asset mix itself matters: banks with higher proportions of loans relative to securities tend to earn higher ROAA, all else equal, because loans generally yield more than investment securities.",
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
      }
    ],
    "relatedValuations": [
      "peer-comparison",
      "dupont-decomposition",
      "discounted-earnings-model"
    ],
    "relatedValuationDescriptions": {
      "peer-comparison": "ROAA is the preferred profitability metric for peer comparison because it removes leverage differences, allowing direct comparison of operating performance across banks with different capital structures."
    }
  },
  {
    "slug": "net-interest-margin",
    "name": "Net Interest Margin (NIM)",
    "category": "profitability",
    "categoryLabel": "Profitability Ratio",
    "formula": "NIM = Net Interest Income / Average Earning Assets",
    "isPercentage": true,
    "shortDescription": "Measures the spread between interest earned and interest paid relative to earning assets.",
    "description": "Net Interest Margin represents the difference between interest income generated by the bank and interest paid to depositors and other lenders, expressed as a percentage of interest-earning assets. It is a key measure of a bank's core lending profitability.",
    "formulaExplanation": "Net Interest Income equals Interest Income minus Interest Expense. Average Earning Assets includes loans, securities, and other interest-bearing assets.",
    "interpretation": "NIM reflects the bank's ability to earn a spread on its lending activities. Higher NIM indicates better pricing power or a favorable asset-liability mix. NIM is heavily influenced by interest rate environment and competitive conditions.",
    "typicalRange": "Community banks typically have NIM between 3.0% and 4.0%. Large money-center banks often have lower NIM (2.0% to 3.0%) due to different business models.",
    "goodBad": {
      "good": "NIM above 3.5% is generally favorable for traditional banks, indicating healthy lending spreads.",
      "bad": "NIM below 2.5% may indicate intense competition, unfavorable rate environment, or poor asset-liability management."
    },
    "considerations": [
      "Interest rate changes significantly impact NIM - rising rates often benefit banks initially.",
      "Different loan types have different yields and risk profiles.",
      "Deposit costs vary based on mix and competitive environment.",
      "NIM should be evaluated alongside credit quality metrics."
    ],
    "relatedMetrics": [
      "roe",
      "roaa",
      "efficiency-ratio"
    ],
    "relatedMetricDescriptions": {
      "roe": "NIM is a core contributor to the net income that ultimately drives return on equity.",
      "roaa": "Net interest income from NIM is the primary component of the asset returns ROAA measures.",
      "efficiency-ratio": "Revenue from interest spreads must cover the operating costs measured by the efficiency ratio."
    },
    "dataSource": "Calculated from Net Interest Income in quarterly filings relative to earning assets.",
    "bankSpecificContext": "Net interest margin is the single most important profitability driver for traditional commercial banks. It measures the spread between what a bank earns on its loans and investment securities and what it pays on deposits and borrowings, expressed as a percentage of average earning assets. For most community and regional banks, net interest income constitutes 70-85% of total revenue, making NIM the dominant factor in overall profitability. NIM is unique to financial intermediaries; non-financial companies have no equivalent metric because they do not earn revenue by borrowing at one rate and lending at another.",
    "metricConnections": "NIM is the largest component of ROAA for most banks. Net interest income (NIM multiplied by average earning assets) flows directly into total revenue, which the efficiency ratio then measures against operating expenses. A bank with a wide NIM but a poor efficiency ratio may not translate its interest spread advantage into bottom-line profitability. NIM combined with the loan-to-asset ratio indicates how effectively the bank is deploying assets into higher-yielding loans versus lower-yielding securities. Cost of funds and cost of deposits are the liability-side components that directly determine the lower bound of NIM.",
    "commonPitfalls": "A higher NIM does not always indicate a better-managed bank. Higher NIM can result from riskier lending practices, such as concentrating in subprime consumer loans, high-yield commercial real estate, or other higher-risk asset classes that command wider spreads precisely because of elevated credit risk. Comparing NIM across banks with very different asset mixes (e.g., a commercial lender vs. a mortgage-focused bank) is misleading because different loan types carry inherently different yield profiles. NIM is compressed during flat or inverted yield curve environments even at well-run banks, because short-term funding costs rise relative to longer-term asset yields. Tax-equivalent NIM adjustments can make comparisons across banks with different proportions of tax-exempt municipal securities more accurate.",
    "acrossBankTypes": "Community banks focused on relationship commercial lending often achieve NIMs in the 3.50-4.50% range, benefiting from pricing power in local markets and low-cost core deposit funding. Regional banks typically show NIMs of 3.00-3.75%. Large money center banks, whose asset mixes include more low-yield wholesale lending, trading assets, and investment securities, often report NIMs in the 2.00-3.00% range. Banks with large non-interest-bearing deposit bases enjoy a structural NIM advantage because a significant portion of their funding carries zero interest cost.",
    "whatDrivesMetric": "On the asset side: the overall interest rate environment, yield curve shape (steep curves favor wider NIM), loan portfolio mix (commercial real estate, commercial and industrial, residential mortgage, consumer), and the pace at which loans reprice as rates change. On the liability side: deposit mix (non-interest-bearing checking accounts provide free funding while certificates of deposit and brokerage deposits are rate-sensitive), competition for deposits in local markets, and reliance on wholesale borrowings. Management decisions around asset-liability duration matching, loan pricing discipline, and deposit gathering strategy all influence NIM directly.",
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
      }
    ],
    "relatedValuations": [
      "peer-comparison",
      "dividend-discount-model",
      "dupont-decomposition",
      "discounted-earnings-model"
    ],
    "relatedValuationDescriptions": {
      "peer-comparison": "NIM is a core comparison metric in peer analysis, revealing differences in lending profitability, funding costs, and asset mix across banks.",
      "dividend-discount-model": "NIM is the primary revenue driver for most banks, making it a key factor in projecting the future earnings that support dividend payments."
    }
  },
  {
    "slug": "efficiency-ratio",
    "name": "Efficiency Ratio",
    "category": "efficiency",
    "categoryLabel": "Efficiency Ratio",
    "formula": "Efficiency Ratio = Non-Interest Expense / (Net Interest Income + Non-Interest Income)",
    "isPercentage": true,
    "shortDescription": "Measures operating efficiency by comparing expenses to revenue.",
    "description": "The Efficiency Ratio shows how much a bank spends to generate each dollar of revenue. It is calculated by dividing operating expenses by total revenue (net interest income plus non-interest income). A lower efficiency ratio indicates better cost management.",
    "formulaExplanation": "Non-Interest Expense includes salaries, occupancy costs, technology, and other operating expenses. The denominator represents total operating revenue.",
    "interpretation": "This ratio is a key indicator of operational efficiency. Banks with lower efficiency ratios are better at controlling costs relative to their revenue. Improving efficiency is a common strategic priority for banks seeking to enhance profitability.",
    "typicalRange": "Efficient banks typically achieve ratios between 50% and 60%. Ratios above 70% may indicate cost control issues.",
    "goodBad": {
      "good": "Efficiency ratio below 55% indicates excellent cost management.",
      "bad": "Efficiency ratio above 65-70% suggests the bank may have cost control challenges."
    },
    "considerations": [
      "Different business models have different typical efficiency ratios.",
      "Investment in technology may temporarily increase the ratio but improve long-term efficiency.",
      "Revenue declines can worsen the ratio even if expenses are well-controlled.",
      "Compare within peer groups of similar-sized banks."
    ],
    "relatedMetrics": [
      "roe",
      "roaa",
      "deposits-to-assets"
    ],
    "relatedMetricDescriptions": {
      "roe": "Better cost management improves net income, directly boosting returns on equity.",
      "roaa": "Efficient operations translate into stronger net income relative to total assets.",
      "deposits-to-assets": "Deposit funding costs are a factor in overall efficiency and cost structure."
    },
    "dataSource": "All components are calculated from trailing twelve month income statement data from SEC filings.",
    "bankSpecificContext": "For banks, the efficiency ratio has a specific definition: non-interest expense divided by the sum of net interest income and non-interest income (total revenue). Lower values are better, indicating the bank spends less to generate each dollar of revenue. The efficiency ratio is the banking industry's standard measure of cost management and operational productivity. Unlike operating margins used for non-financial companies, the efficiency ratio accounts for the fact that a bank's revenue comes from two distinct streams (interest income from lending and fee income from services), both of which require different cost structures to generate.",
    "metricConnections": "The efficiency ratio directly impacts net income and therefore both ROE and ROAA. A bank that improves its efficiency ratio by 5 percentage points without changing revenue effectively adds that entire amount to pre-tax income. In bank M&A analysis, projected efficiency ratio improvements from combining operations are often called the \"efficiency dividend\" and represent a primary source of merger value. The relationship between efficiency ratio and NIM determines how much of the bank's interest spread flows through to earnings: a bank with a 3.50% NIM and a 55% efficiency ratio retains far more income than one with the same NIM and a 70% efficiency ratio.",
    "commonPitfalls": "Different business lines within banking carry inherently different efficiency ratios, making comparisons across banks with different business mixes misleading. Wealth management and trust divisions typically operate with 65-75% efficiency ratios but generate high returns on equity because they require minimal balance sheet capital. Comparing a wealth-management-heavy bank to a pure commercial lender on efficiency ratio alone will make the diversified bank look less efficient when it may actually be more profitable. Revenue declines cause the efficiency ratio to deteriorate even if costs remain flat, which can make a cost-disciplined bank look inefficient during periods of margin compression. One-time restructuring charges or technology investments can temporarily inflate the ratio.",
    "acrossBankTypes": "Large money center banks with economies of scale and technology investments often achieve efficiency ratios of 55-60%. Well-run community banks typically target 55-65%. Banks with efficiency ratios consistently below 50% are considered exceptional operators. Banks running above 70% may have structural cost problems related to excess branch networks, inadequate technology, insufficient scale, or revenue challenges. Mutual savings banks sometimes show higher efficiency ratios because their mutual ownership structure limits certain capital management strategies available to stock-form banks.",
    "whatDrivesMetric": "Salary and employee benefits represent the largest component of non-interest expense, typically 50-60% of total operating costs. Branch network size and occupancy costs are the second major factor. Technology and data processing expenses have been growing as a share of total costs. Regulatory compliance costs, including examination fees, BSA/AML compliance staffing, and reporting infrastructure, add a relatively fixed cost burden that weighs more heavily on smaller banks. On the revenue side, NIM compression or fee income declines cause the efficiency ratio to rise even without any increase in expenses. Revenue growth that outpaces expense growth is the most sustainable path to efficiency improvement.",
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
      }
    ],
    "relatedValuations": [
      "peer-comparison",
      "dupont-decomposition"
    ],
    "relatedValuationDescriptions": {
      "peer-comparison": "The efficiency ratio is a standard peer comparison metric that reveals differences in cost management and operational productivity across banks."
    }
  },
  {
    "slug": "deposits-to-assets",
    "name": "Deposits to Assets Ratio",
    "category": "efficiency",
    "categoryLabel": "Efficiency Ratio",
    "formula": "Deposits to Assets = Total Deposits / Total Assets",
    "isPercentage": true,
    "shortDescription": "Shows what portion of bank assets are funded by customer deposits.",
    "description": "The Deposits to Assets ratio indicates how much of a bank's asset base is funded by customer deposits versus other funding sources like wholesale borrowings. Higher ratios generally indicate a more stable, lower-cost funding base.",
    "formulaExplanation": "Total Deposits includes all customer deposit accounts (checking, savings, CDs). Total Assets is the sum of all bank assets.",
    "interpretation": "Banks with higher deposit-to-asset ratios typically have more stable and lower-cost funding. Deposits are generally considered \"sticky\" funding that provides stability. Lower ratios may indicate reliance on more volatile wholesale funding.",
    "typicalRange": "Most traditional banks have ratios between 70% and 90%. Ratios below 70% may indicate significant non-deposit funding sources.",
    "goodBad": {
      "good": "Ratios above 80% indicate strong deposit funding, typically associated with funding stability.",
      "bad": "Ratios below 65-70% may indicate reliance on potentially volatile wholesale funding."
    },
    "considerations": [
      "Deposit mix matters - core deposits are more stable than large time deposits.",
      "Some banks intentionally use wholesale funding for specific strategies.",
      "Very high ratios may indicate limited non-deposit business activities.",
      "Compare within peer groups with similar business models."
    ],
    "relatedMetrics": [
      "loans-to-deposits",
      "equity-to-assets"
    ],
    "relatedMetricDescriptions": {
      "loans-to-deposits": "Together these ratios show how deposits fund lending and overall balance sheet composition.",
      "equity-to-assets": "Both measure balance sheet structure — deposits fund assets while equity provides the capital cushion."
    },
    "dataSource": "Both values are point-in-time figures from the most recent quarterly balance sheet.",
    "bankSpecificContext": "Deposits-to-assets measures what proportion of the bank's total funding comes from customer deposits versus other sources such as borrowings, subordinated debt, and equity. Deposits are generally the lowest-cost and most stable source of funding for banks, making a high deposits-to-assets ratio a structural advantage. Non-interest-bearing demand deposits (checking accounts) are particularly valuable because they provide free funding. The ratio reflects the strength of the bank's deposit franchise, which is the ability to gather and retain customer deposits at competitive costs.",
    "metricConnections": "Deposits-to-assets combined with cost of deposits indicates funding efficiency. A bank with a 85% deposits-to-assets ratio and a cost of deposits of 0.50% has a significant funding advantage over one with a 70% ratio and 1.50% cost of deposits. The ratio connects to the overall funding structure: 1 minus deposits-to-assets minus equity-to-assets roughly equals the proportion of assets funded by non-deposit borrowings and other liabilities. Banks with high deposits-to-assets ratios and low cost of deposits tend to achieve wider net interest margins because their funding base costs less.",
    "commonPitfalls": "The ratio treats all deposits equally, but deposit composition matters significantly. A bank with 85% deposits-to-assets where half the deposits are non-interest-bearing checking accounts is in a very different position than one where most deposits are rate-sensitive certificates of deposit or brokerage deposits. Brokerage deposits, while classified as deposits, behave more like wholesale funding because they are rate-sensitive and can leave quickly when rates change. A declining deposits-to-assets ratio may indicate the bank is growing through borrowed funds, which could signal difficulties in attracting or retaining depositors. Temporary spikes in deposits (e.g., seasonal patterns or large institutional deposits) can cause the ratio to fluctuate from quarter to quarter.",
    "acrossBankTypes": "Traditional community banks with established branch networks often show deposits-to-assets ratios of 80-90%, reflecting their role as core deposit gatherers in local markets. Large money center banks may show somewhat lower ratios (70-80%) because they rely more on wholesale funding markets, repurchase agreements, and other non-deposit liabilities to fund their operations. Online banks and fintech-oriented banks may show high deposits-to-assets ratios but with deposits that are almost entirely rate-sensitive savings accounts or CDs, making the quality of the funding different despite the high ratio.",
    "whatDrivesMetric": "Branch network presence and local market share are long-term structural drivers of deposit gathering capacity. Deposit pricing strategy determines whether the bank can attract and retain deposits without paying rates that erode NIM. Mix of deposit types, particularly the proportion of non-interest-bearing accounts, is a key quality indicator. Customer relationships, service quality, and convenience features (online banking, ATM networks) affect deposit retention. Competitive intensity in local markets drives deposit pricing and therefore the bank's ability to maintain its deposit base. Macroeconomic factors, including overall savings rates and consumer confidence, influence aggregate deposit levels.",
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
      }
    ],
    "relatedValuations": [
      "peer-comparison"
    ],
    "relatedValuationDescriptions": {
      "peer-comparison": "Deposits-to-assets is used in peer comparison to evaluate the funding structure and stability of a bank's liability base relative to peers."
    }
  },
  {
    "slug": "loans-to-deposits",
    "name": "Loans to Deposits Ratio",
    "category": "efficiency",
    "categoryLabel": "Efficiency Ratio",
    "formula": "Loans to Deposits = Total Loans / Total Deposits",
    "isPercentage": true,
    "shortDescription": "Compares lending activity to deposit funding.",
    "description": "The Loans to Deposits ratio measures how much of a bank's deposit base has been deployed into loans. It indicates the bank's liquidity position and lending aggressiveness. Too high may indicate liquidity risk; too low may suggest underutilization of funds.",
    "formulaExplanation": "Total Loans includes all loan categories. Total Deposits includes all deposit types.",
    "interpretation": "This ratio balances growth opportunity against liquidity risk. Higher ratios suggest aggressive lending but potentially tighter liquidity. Lower ratios may indicate excess liquidity or reduced lending demand.",
    "typicalRange": "Most banks target ratios between 70% and 90%. Ratios above 100% indicate loans exceed deposits.",
    "goodBad": {
      "good": "Ratios between 75-90% typically indicate balanced lending and liquidity management.",
      "bad": "Ratios above 100% may indicate liquidity stress; below 60% may suggest underutilized deposits."
    },
    "considerations": [
      "Economic conditions affect both loan demand and deposit flows.",
      "Regulators monitor this ratio as part of liquidity assessment.",
      "Rapid increases may indicate aggressive lending that warrants scrutiny.",
      "Different bank types have different optimal ratios."
    ],
    "relatedMetrics": [
      "deposits-to-assets",
      "loans-to-assets"
    ],
    "relatedMetricDescriptions": {
      "deposits-to-assets": "Deposit levels as a share of assets determine the funding base available for lending.",
      "loans-to-assets": "Shows the lending share of total assets, complementing this deposit-relative view."
    },
    "dataSource": "Both values are from the most recent quarterly balance sheet filing.",
    "bankSpecificContext": "The loans-to-deposits ratio measures how aggressively a bank is lending relative to its core funding base. Banking, at its foundation, is the business of transforming deposits into loans: a bank gathers deposits from savers and channels them as loans to borrowers, earning a spread in between. This ratio quantifies the intensity of that financial intermediation. A 75% ratio means that for every dollar of deposits, the bank has lent out 75 cents. The remaining 25 cents is held in securities, cash, or other assets. The ratio is a key indicator of both growth appetite and funding risk.",
    "metricConnections": "Loans-to-deposits combined with NIM indicates whether the bank is effectively deploying its deposit funding into higher-yielding loans. High L/D paired with strong NIM suggests efficient intermediation. The ratio connects to loans-to-assets and deposits-to-assets: if deposits-to-assets is 80% and loans-to-assets is 65%, then loans-to-deposits is approximately 81%. Together these three ratios paint a complete picture of balance sheet composition and funding efficiency. Banks with high L/D ratios are more sensitive to deposit outflows because they have less liquidity cushion.",
    "commonPitfalls": "A very high loans-to-deposits ratio (above 100%) indicates the bank is funding some loans with non-deposit sources such as Federal Home Loan Bank advances, brokerage deposits, or subordinated debt, which are typically more expensive and less stable than core deposits. While not necessarily dangerous, persistent ratios above 95-100% warrant scrutiny of funding stability. Conversely, a very low ratio (below 60%) may indicate the bank is underutilizing its deposit base, parking excess funds in low-yield securities rather than lending. This is safer but can drag down profitability. The ratio uses total loans and total deposits as reported, but the composition of each category matters enormously. Net loans (after loan loss reserves) versus gross loans can produce slightly different ratios.",
    "acrossBankTypes": "Most US commercial banks operate with loans-to-deposits ratios between 70% and 90%, based on FDIC aggregate data. Community banks in high-growth markets may push above 90% as strong loan demand outpaces deposit growth. Large money center banks with significant trading and investment banking operations may show lower ratios because they hold more non-loan assets. Banks in rural or slower-growth markets sometimes show lower ratios due to limited loan demand relative to their deposit gathering capacity, leading them to invest heavily in securities instead.",
    "whatDrivesMetric": "Loan demand in the bank's geographic and product markets is the primary driver. Strong economic growth, commercial development, and housing activity increase loan demand and push the ratio higher. Management's appetite for growth and risk tolerance affects how aggressively the bank pursues lending opportunities. Deposit growth, driven by branch network strength, pricing competitiveness, and market share, affects the denominator. Competition for both loans and deposits in local markets influences the pace at which each side grows. Regulatory constraints on concentrations (e.g., commercial real estate concentration guidance) can limit loan growth even when demand is strong.",
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
    "shortDescription": "Measures capital strength by comparing equity to total assets.",
    "description": "The Equity to Assets ratio measures a bank's capital cushion relative to its asset base. It indicates the proportion of assets funded by shareholders rather than creditors. Higher ratios suggest greater financial strength and ability to absorb losses.",
    "formulaExplanation": "Total Shareholders' Equity includes common and preferred stock plus retained earnings. Total Assets is the sum of all assets.",
    "interpretation": "This ratio reflects the bank's financial leverage and capital adequacy. Higher ratios indicate more conservative capital positions and greater capacity to absorb unexpected losses. However, very high ratios may indicate inefficient capital deployment.",
    "typicalRange": "Most banks maintain ratios between 8% and 12%. Regulatory minimums provide a floor, but well-capitalized banks often exceed minimums substantially.",
    "goodBad": {
      "good": "Ratios above 10% indicate strong capital positions, providing cushion against losses.",
      "bad": "Ratios below 7-8% may indicate thin capital buffers and elevated risk."
    },
    "considerations": [
      "Regulatory capital requirements establish minimum thresholds.",
      "Different banks have different optimal capital levels based on risk profiles.",
      "Too much capital may reduce returns to shareholders (lower ROE).",
      "Compare to regulatory capital ratios for a complete picture."
    ],
    "relatedMetrics": [
      "roe",
      "loans-to-assets",
      "deposits-to-assets"
    ],
    "relatedMetricDescriptions": {
      "roe": "Capital levels determine leverage, which directly affects return on equity.",
      "loans-to-assets": "Asset composition and capital levels together indicate the bank's risk profile.",
      "deposits-to-assets": "Both reflect how the bank's balance sheet is structured and funded."
    },
    "dataSource": "Both values are from the most recent quarterly balance sheet.",
    "bankSpecificContext": "Equity-to-assets is the simplest measure of a bank's capital adequacy, representing the percentage of total assets funded by equity rather than deposits and other liabilities. For banks, this ratio has a unique significance because banking is fundamentally a leveraged business: a typical bank funds 88-92% of its assets with deposits and borrowings, leaving only 8-12% funded by equity. This thin equity cushion is what makes capital adequacy so critical in banking and why regulators monitor capital ratios closely. Higher equity-to-assets ratios provide more cushion to absorb unexpected losses but may also indicate the bank is not deploying its capital as productively as it could.",
    "metricConnections": "The inverse of equity-to-assets is the equity multiplier (assets divided by equity), which is the leverage component of the DuPont decomposition linking ROAA to ROE. ROE equals ROAA multiplied by the equity multiplier, so a bank with ROAA of 1.0% and equity-to-assets of 10% (equity multiplier of 10x) produces ROE of 10%. Equity-to-assets provides a quick, leverage-based sanity check without the complexity of risk-weighted capital ratios like CET1 or Tier 1 ratios. It complements those risk-weighted measures by showing total leverage regardless of asset risk composition.",
    "commonPitfalls": "Equity-to-assets does not account for the riskiness of the asset base. A bank with 10% equity-to-assets invested entirely in US Treasury securities has a fundamentally different risk profile than one with 10% equity-to-assets concentrated in speculative commercial real estate loans, even though both show the same ratio. Risk-weighted capital ratios (CET1, Tier 1, Total Capital) address this limitation by assigning different weights to assets based on their credit risk. Equity-to-assets can be distorted by large intangible asset balances from acquisitions, since goodwill is included in total assets but may not represent loss-absorbing capacity. Very high equity-to-assets may signal overcapitalization rather than strength, particularly if it depresses ROE below the cost of equity.",
    "acrossBankTypes": "Community banks typically operate with equity-to-assets ratios of 8-12%, with higher levels common among banks that have limited growth opportunities and retain earnings without deploying them. Large banks may run slightly lower ratios (7-10%) due to more diversified asset bases and sophisticated regulatory capital management. De novo (newly chartered) banks often start with very high equity-to-assets ratios of 15-25% because they raise capital before building a loan portfolio; the ratio naturally declines over the first several years as the bank grows. Mutual savings banks tend to carry higher equity-to-assets ratios because they cannot issue common stock and must build capital entirely through retained earnings.",
    "whatDrivesMetric": "Retained earnings are the primary source of equity growth for most banks, making profitability the fundamental long-term driver. Dividend payments reduce equity and therefore reduce the ratio. Share buybacks reduce both equity and assets (if funded by excess capital) but primarily affect equity. Capital raises through stock issuance increase equity. Loan growth increases assets, which decreases the ratio unless equity grows proportionally. Securities portfolio changes, large deposit inflows or outflows, and borrowing activity all affect total assets and can move the ratio independently of equity changes. Regulatory requirements set effective floors on equity-to-assets through minimum leverage ratio standards.",
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
      "peer-comparison": "Equity-to-assets is an important peer comparison metric for assessing relative capital strength and leverage across a group of comparable banks."
    }
  },
  {
    "slug": "loans-to-assets",
    "name": "Loans to Assets Ratio",
    "category": "balance-sheet",
    "categoryLabel": "Balance Sheet Ratio",
    "formula": "Loans to Assets = Total Loans / Total Assets",
    "isPercentage": true,
    "shortDescription": "Shows what portion of assets are deployed in loans.",
    "description": "The Loans to Assets ratio indicates how much of a bank's asset base consists of loans. Loans are typically the highest-yielding assets but also carry credit risk. This ratio reflects the bank's business model and risk appetite.",
    "formulaExplanation": "Total Loans includes all loan categories (commercial, consumer, real estate). Total Assets includes all bank assets.",
    "interpretation": "Higher ratios indicate more focus on traditional lending activities, which typically generate higher yields but involve more credit risk. Lower ratios may indicate greater investment in securities or other assets.",
    "typicalRange": "Traditional banks typically have ratios between 60% and 75%. Ratios vary significantly based on business model.",
    "goodBad": {
      "good": "Ratios between 60-75% are typical for traditional banks with balanced asset portfolios.",
      "bad": "Very high ratios (above 80%) may indicate concentration risk; very low ratios may suggest underutilization."
    },
    "considerations": [
      "Business model significantly affects this ratio.",
      "Loan quality is as important as quantity.",
      "Securities provide liquidity but typically yield less than loans.",
      "Changes over time may indicate strategic shifts."
    ],
    "relatedMetrics": [
      "loans-to-deposits",
      "deposits-to-assets",
      "equity-to-assets"
    ],
    "relatedMetricDescriptions": {
      "loans-to-deposits": "Both measure lending activity — one relative to deposits, one relative to total assets.",
      "deposits-to-assets": "Together these show how assets are funded and how much is deployed in loans.",
      "equity-to-assets": "Capital and lending levels together indicate the bank's overall risk appetite."
    },
    "dataSource": "Both values are from the most recent quarterly balance sheet.",
    "bankSpecificContext": "Loans-to-assets indicates what portion of the bank's total assets is deployed in loans, the core earning asset for most commercial banks. The remainder of assets is typically allocated to investment securities, cash and equivalents, Federal Reserve balances, premises and equipment, and other assets. Loans generally earn higher yields than investment securities, so banks with higher loans-to-assets ratios tend to generate higher NIM, all else equal. However, loans also carry higher credit risk than most securities, so a higher ratio implies greater exposure to potential loan losses.",
    "metricConnections": "Loans-to-assets connects directly to NIM because a higher proportion of assets in loans (vs. lower-yielding securities) supports wider interest margins. The ratio also informs credit risk assessment: combined with asset quality metrics like the NPL ratio and net charge-off ratio, it indicates the total potential loss exposure from lending. Loans-to-assets and deposits-to-assets together determine the loans-to-deposits ratio. A bank with loans-to-assets of 70% and deposits-to-assets of 85% has a loans-to-deposits ratio of approximately 82%.",
    "commonPitfalls": "The ratio does not distinguish between loan types, which carry very different risk and return profiles. A bank with 75% of assets in seasoned, low-LTV residential mortgages has a fundamentally different risk profile than one with 75% in construction and land development loans, even though both show the same loans-to-assets ratio. A rapidly rising loans-to-assets ratio may indicate aggressive lending growth, which historically correlates with future credit quality deterioration as underwriting standards loosen to sustain growth. Conversely, a declining ratio may indicate the bank is deliberately pulling back from lending, investing in securities for safety, or facing weak loan demand in its markets.",
    "acrossBankTypes": "Most US commercial banks carry loans-to-assets ratios between 55% and 75%, based on FDIC data. Community banks focused on commercial lending often operate in the 65-80% range. Large money center banks, whose balance sheets include significant trading assets, investment securities, and Fed reserve balances, may show ratios in the 45-60% range. Banks that are growing their loan portfolios aggressively may temporarily push above 75%, while banks in contraction mode or in markets with weak loan demand may fall below 55%.",
    "whatDrivesMetric": "Loan demand in the bank's target markets, driven by economic growth, commercial development, and consumer borrowing activity. Management's lending strategy and risk appetite determine how aggressively the bank converts deposits into loans. Investment portfolio strategy decisions: some banks maintain larger securities portfolios for liquidity management and interest rate risk hedging, which reduces the share of assets in loans. Regulatory guidance on loan concentrations (particularly commercial real estate concentration thresholds set by regulators at 300% of capital for total CRE or 100% for construction loans) can constrain lending even when demand is strong. Competitive conditions affect whether the bank can originate loans at acceptable pricing and terms.",
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
      }
    ],
    "relatedValuations": [
      "peer-comparison"
    ],
    "relatedValuationDescriptions": {
      "peer-comparison": "Loans-to-assets is used in peer comparison to assess differences in asset deployment strategy and credit risk exposure across comparable banks."
    }
  },
  {
    "slug": "book-value-per-share",
    "name": "Book Value Per Share (BVPS)",
    "category": "valuation",
    "categoryLabel": "Valuation Metric",
    "formula": "BVPS = (Total Equity - Preferred Stock) / Common Shares Outstanding",
    "shortDescription": "The net asset value attributable to each common share.",
    "description": "Book Value Per Share represents the amount of equity attributable to each share of common stock. It is calculated by dividing common equity (total equity minus preferred stock) by the number of shares outstanding. BVPS is a fundamental valuation metric for banks.",
    "formulaExplanation": "Preferred Stock is subtracted because book value per share refers to common shareholders. Shares Outstanding is the number of common shares issued and not repurchased.",
    "interpretation": "BVPS provides a floor value for bank stocks based on accounting book value. Comparing stock price to BVPS (Price-to-Book ratio) is a primary valuation method for banks. Banks trading below book value may be undervalued or facing challenges.",
    "typicalRange": "BVPS varies widely based on bank size and history. The Price-to-Book ratio (Price/BVPS) typically ranges from 0.7x to 2.0x for banks.",
    "goodBad": {
      "good": "Growing BVPS over time indicates value creation through retained earnings.",
      "bad": "Declining BVPS may indicate losses, excessive dividends, or share dilution."
    },
    "considerations": [
      "Book value may not reflect true economic value of assets.",
      "Intangible assets and goodwill can affect book value comparisons.",
      "Historical cost accounting may understate or overstate true asset values.",
      "Compare BVPS growth rates and Price-to-Book ratios across peers."
    ],
    "relatedMetrics": [
      "price-to-earnings",
      "roe"
    ],
    "relatedMetricDescriptions": {
      "price-to-earnings": "Both are fundamental valuation inputs — BVPS measures asset value while P/E measures earnings power.",
      "roe": "ROE measures how effectively the bank grows its book value over time through retained earnings."
    },
    "dataSource": "Equity and shares outstanding from the most recent quarterly balance sheet.",
    "bankSpecificContext": "Book value per share represents the per-share accounting net asset value of the bank. For banks, BVPS is more closely tied to economic value than for most non-financial industries because the majority of bank assets (loans, securities, cash) and liabilities (deposits, borrowings) are financial instruments carried at or near fair value under accounting standards. BVPS serves as a fundamental anchor for bank valuation, and its growth over time is a direct measure of shareholder value creation through retained earnings. A bank that consistently grows BVPS at 6-8% annually is compounding value for shareholders even if the stock price fluctuates.",
    "metricConnections": "BVPS is the denominator in the P/B ratio and one of two inputs (alongside EPS) to the Graham Number. BVPS growth rate over time reflects retained earnings accumulation, which equals net income minus dividends. The relationship EPS equals ROE multiplied by BVPS means BVPS growth is linked to profitability and payout policy. BVPS minus tangible book value per share (TBVPS) equals per-share intangible assets and goodwill, quantifying how much of book value reflects acquisition premiums rather than tangible net assets.",
    "commonPitfalls": "BVPS includes intangible assets and goodwill, which may overstate the tangible net asset value for banks that have completed acquisitions. TBVPS provides a more conservative alternative. Accumulated other comprehensive income or loss (AOCI) can cause BVPS to fluctuate with unrealized gains and losses on available-for-sale securities, particularly during periods of significant interest rate movements. A bank's BVPS may appear stable quarter-to-quarter while AOCI is masking significant unrealized investment losses. Share buybacks increase BVPS by reducing the denominator, which can create the appearance of value growth even when total equity is flat or declining. Comparing BVPS across banks is not meaningful because different share counts make absolute BVPS levels arbitrary.",
    "acrossBankTypes": "BVPS growth rate is more informative than the absolute level. Well-capitalized community banks that pay moderate dividends (30-40% payout) and earn strong ROE (10-13%) can compound BVPS at 6-9% annually. Large banks with active share repurchase programs may show faster BVPS growth because buybacks reduce share count, concentrating book value into fewer shares. Banks that have completed mutual-to-stock conversions often start with very high BVPS relative to share price (low P/B), reflecting the excess capital that characterizes these conversions.",
    "whatDrivesMetric": "Retained earnings are the primary driver of BVPS growth: net income minus dividends adds to equity, increasing BVPS. Share buybacks reduce shares outstanding, increasing BVPS mechanically. Capital raises or stock issuances increase shares outstanding, diluting BVPS. AOCI fluctuations, driven primarily by unrealized gains or losses on the available-for-sale securities portfolio, can cause BVPS to move independently of operating performance. Goodwill impairment charges from acquisitions that did not perform as expected reduce equity and therefore BVPS. Regulatory actions that require a bank to raise additional capital can dilute BVPS.",
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
      "margin-of-safety": "BVPS provides the tangible asset backing per share, and comparing market price to BVPS-derived fair value estimates helps quantify the margin of safety."
    }
  },
  {
    "slug": "price-to-earnings",
    "name": "Price to Earnings (P/E) Ratio",
    "category": "valuation",
    "categoryLabel": "Valuation Metric",
    "formula": "P/E = Stock Price / Earnings Per Share",
    "shortDescription": "Compares stock price to per-share earnings.",
    "description": "The Price to Earnings ratio compares a bank's stock price to its earnings per share. It indicates how much investors are willing to pay for each dollar of earnings. P/E is a widely used valuation metric across all industries.",
    "formulaExplanation": "Stock Price is the current market price. Earnings Per Share (EPS) is typically calculated on a trailing twelve month basis.",
    "interpretation": "Higher P/E ratios suggest investors expect higher future growth or perceive lower risk. Lower P/E may indicate undervaluation or market concerns about the company's prospects. P/E should be compared to peers and historical averages.",
    "typicalRange": "Bank P/E ratios typically range from 8x to 15x, generally lower than the broader market due to perceived cyclicality and regulation.",
    "goodBad": {
      "good": "Low P/E relative to peers with similar fundamentals may indicate undervaluation opportunity.",
      "bad": "Very high P/E may indicate overvaluation; very low P/E may reflect serious concerns about the bank."
    },
    "considerations": [
      "Cyclical earnings can distort P/E ratios - use normalized earnings if possible.",
      "Negative earnings make P/E meaningless.",
      "Compare within peer groups and consider growth expectations.",
      "One-time items can significantly affect EPS and distort ratios."
    ],
    "relatedMetrics": [
      "book-value-per-share",
      "roe"
    ],
    "relatedMetricDescriptions": {
      "book-value-per-share": "BVPS provides the asset-based complement to the earnings-based valuation P/E captures.",
      "roe": "ROE justifies P/E multiples — banks with higher returns typically support higher earnings valuations."
    },
    "dataSource": "EPS calculated from trailing twelve month net income and average shares outstanding.",
    "bankSpecificContext": "P/E is a useful valuation metric for banks during periods of normalized earnings but becomes less reliable when credit losses spike or unusual gains distort net income. Bank earnings are inherently more volatile than most industries because provision for credit losses, a non-cash charge that reflects management's estimate of future loan losses, can swing dramatically from quarter to quarter. During a credit downturn, provisions may consume 30-50% or more of pre-provision revenue, compressing earnings and inflating P/E. During benign credit environments, low provisions can flatter earnings and compress P/E. For these reasons, P/E is best used alongside P/B as a complementary valuation measure rather than as a standalone metric.",
    "metricConnections": "The identity P/E multiplied by ROE equals P/B connects bank P/E directly to both profitability and asset valuation. When P/E and P/B diverge from what ROE would imply, it can signal a potential opportunity or a red flag. A bank trading at a low P/E but a high P/B relative to its ROE may have temporarily elevated earnings that the market expects to normalize. Conversely, a high P/E with a low P/B may indicate depressed earnings that the market expects to recover. P/E combined with the dividend payout ratio yields the price-to-dividend ratio, which is useful for income-oriented bank stock analysis.",
    "commonPitfalls": "Provision for credit losses makes bank earnings more volatile than most industries, which means P/E snapshots can be misleading. A bank may appear to have a high P/E simply because a credit cycle spike in provisions temporarily depressed earnings; this may actually represent a buying opportunity rather than overvaluation. P/E is nearly useless for banks with negative or near-zero earnings, which can occur during severe credit downturns. Using trailing P/E based on the most recent quarter annualized is dangerous if that quarter contained unusual items. Comparing P/E across banks without considering differences in credit quality, reserve adequacy, and provision trends can lead to poor conclusions. Forward P/E estimates are only as good as the analyst's ability to predict future credit losses.",
    "acrossBankTypes": "Bank P/E ratios have historically ranged between 8x and 15x during normal earnings periods, based on aggregate market data. High-growth banks or banks with perceived above-average earnings quality may trade at 13-16x. Banks in cyclical earnings troughs or with asset quality concerns may trade at 6-10x or lower. During periods of systemic banking stress, trailing P/E ratios become unreliable because earnings are temporarily depressed across the industry. Community banks with limited analyst coverage may trade at modestly lower P/E multiples than larger peers, reflecting a liquidity discount.",
    "whatDrivesMetric": "Earnings growth expectations are the primary driver of P/E levels. The interest rate outlook influences P/E because rates affect NIM and therefore earnings power. Perceived credit quality matters because the market discounts P/E for banks it believes will face elevated future credit losses. Overall stock market multiple levels create a macro backdrop: bank P/E ratios tend to expand and contract with broad equity market valuations. Investor sentiment toward the banking sector, influenced by regulatory developments, macroeconomic conditions, and recent industry events, creates sector-wide P/E fluctuations independent of individual bank fundamentals.",
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
      }
    ],
    "relatedValuations": [
      "price-to-earnings-valuation",
      "graham-number",
      "margin-of-safety",
      "gordon-growth-model"
    ],
    "relatedValuationDescriptions": {
      "price-to-earnings-valuation": "P/E is the ratio used directly in price-to-earnings valuation to compare a bank's earnings multiple to its peers and historical levels.",
      "graham-number": "The Graham Number uses EPS (the denominator of P/E) as one of its two inputs, connecting P/E analysis to Graham's intrinsic value framework.",
      "margin-of-safety": "P/E levels inform margin of safety assessment by indicating how much the market is paying per dollar of earnings relative to fair value estimates."
    }
  },
  {
    "slug": "price-to-book",
    "name": "Price to Book (P/B) Ratio",
    "category": "valuation",
    "categoryLabel": "Valuation Metric",
    "formula": "P/B = Stock Price / Book Value Per Share",
    "shortDescription": "Compares stock price to book value per share.",
    "description": "The Price to Book ratio compares a bank's market value to its accounting book value. It is the primary valuation metric used for banks because book value represents the tangible net worth that would remain if the bank were liquidated.",
    "formulaExplanation": "Stock Price is the current market price. Book Value Per Share is calculated as common equity divided by shares outstanding.",
    "interpretation": "P/B below 1.0x means the stock trades below book value, potentially indicating undervaluation or market concerns. P/B above 1.0x reflects a premium for earnings power, growth, or franchise value.",
    "typicalRange": "Bank P/B ratios typically range from 0.8x to 2.0x. High-quality banks with strong ROE often trade above 1.5x.",
    "goodBad": {
      "good": "P/B below 1.0x with solid fundamentals may indicate value opportunity.",
      "bad": "P/B significantly above 2.0x may indicate overvaluation unless justified by exceptional ROE."
    },
    "considerations": [
      "Book value may not reflect true economic value of assets or liabilities.",
      "Compare P/B to ROE - higher ROE typically justifies higher P/B.",
      "Regulatory capital treatment affects optimal capital levels.",
      "Tangible book value (excluding goodwill) may be more relevant for some analyses."
    ],
    "relatedMetrics": [
      "book-value-per-share",
      "roe",
      "price-to-earnings"
    ],
    "relatedMetricDescriptions": {
      "book-value-per-share": "BVPS is the denominator in P/B, making it the foundation of this valuation metric.",
      "roe": "ROE is the key driver of justified P/B multiples — higher returns warrant higher book premiums.",
      "price-to-earnings": "P/E complements P/B by valuing earnings power alongside asset value."
    },
    "dataSource": "Book Value from quarterly balance sheet; price requires market data.",
    "bankSpecificContext": "Price-to-book is the primary valuation metric for banks because bank balance sheets consist predominantly of financial instruments (loans, securities, deposits, borrowings) that are carried near fair value under accounting standards. This makes book value a more meaningful approximation of net asset value for banks than for industrial or technology companies, where intangible assets, brand value, and intellectual property may far exceed recorded book value. The widespread use of P/B for banks dates back decades and is reinforced by bank regulators' focus on book equity as the basis for capital adequacy measurement.",
    "metricConnections": "The justified P/B multiple can be derived from the ROE-P/B framework: justified P/B = (ROE - g) / (r - g), where g is the sustainable growth rate and r is the cost of equity. This framework makes explicit that a bank's P/B should be higher when its ROE exceeds its cost of equity and lower when it does not. The identity P/B = P/E multiplied by ROE connects the two primary bank valuation ratios: knowing any two of the three (P/B, P/E, ROE) determines the third. A bank trading at a P/B of 1.0 with ROE of 12% implies a P/E of approximately 8.3x. This relationship is useful for spotting valuation inconsistencies.",
    "commonPitfalls": "Book value may not reflect true economic value for several reasons. Held-to-maturity securities are carried at amortized cost rather than market value, which can create significant unrealized losses not visible in book value (as highlighted by bank failures where HTM portfolios had large unrealized losses). Goodwill from prior acquisitions inflates book value above the tangible net asset value, which is why price-to-tangible-book is sometimes preferred. Understated loan loss reserves mean book value may overstate the true net asset position. A P/B below 1.0 does not automatically indicate undervaluation; the market may be pricing in expected credit losses, earnings weakness, or management quality concerns that justify a discount to book.",
    "acrossBankTypes": "High-performing banks with strong ROE, consistent earnings growth, and clean asset quality may trade at 1.5-2.5x book value. Banks with average profitability and moderate growth prospects typically trade at 1.0-1.3x book. Banks with asset quality concerns, weak earnings, pending regulatory issues, or strategic uncertainty often trade below book value. During periods of systemic banking stress, median industry P/B multiples have fallen below 1.0x. Community banks that are considered acquisition candidates sometimes trade at premiums to book value reflecting potential takeover pricing.",
    "whatDrivesMetric": "ROE is the single most important driver of P/B: banks that earn returns above their cost of equity deserve P/B multiples above 1.0, and higher ROE supports higher multiples. Earnings growth expectations influence the sustainable growth component of the justified P/B formula. Asset quality perception affects whether investors trust that book value is a reliable representation of net asset value. Interest rate outlook matters because rising rates can improve NIM and ROE (supporting higher P/B) but can also create unrealized losses in bond portfolios. Market-wide valuation levels and investor sentiment toward the banking sector affect absolute P/B levels for all banks.",
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
      "graham-number": "The Graham Number uses BVPS (the denominator of P/B) as one of its two inputs to estimate a maximum fair price."
    }
  },
  {
    "slug": "earnings-per-share",
    "name": "Earnings Per Share (EPS)",
    "category": "per-share",
    "categoryLabel": "Per Share Metric",
    "formula": "EPS = Net Income / Weighted Average Shares Outstanding",
    "shortDescription": "Net profit attributable to each common share.",
    "description": "Earnings Per Share represents the portion of a bank's profit allocated to each outstanding share of common stock. It is a fundamental measure of profitability on a per-share basis and is used in calculating the P/E ratio.",
    "formulaExplanation": "Net Income is the profit after all expenses and taxes. Weighted Average Shares accounts for share issuances and repurchases during the period.",
    "interpretation": "EPS growth is a key driver of stock price appreciation. Consistent EPS growth indicates sustainable profitability. Comparing EPS to dividends per share shows the payout ratio.",
    "typicalRange": "EPS varies widely based on bank size and profitability. Focus on growth rates and consistency rather than absolute levels.",
    "goodBad": {
      "good": "Consistently growing EPS indicates strong and improving profitability.",
      "bad": "Declining or volatile EPS may indicate operational challenges or cyclical pressures."
    },
    "considerations": [
      "Diluted EPS accounts for potential shares from options and convertibles.",
      "One-time items can significantly distort EPS - look at core or adjusted EPS.",
      "Share buybacks can increase EPS even if net income is flat.",
      "Compare EPS growth to ROE and asset growth for consistency."
    ],
    "relatedMetrics": [
      "price-to-earnings",
      "dividend-payout-ratio",
      "roe"
    ],
    "relatedMetricDescriptions": {
      "price-to-earnings": "EPS is the denominator of P/E, directly linking per-share profitability to valuation.",
      "dividend-payout-ratio": "The relationship between EPS and dividends determines payout capacity and sustainability.",
      "roe": "ROE shows how efficiently the bank generates the earnings captured by EPS."
    },
    "dataSource": "Net Income from trailing twelve month filings. Shares outstanding from balance sheet.",
    "bankSpecificContext": "For banks, EPS is heavily influenced by the provision for credit losses, which can swing significantly from quarter to quarter based on changes in loan portfolio quality and economic outlook. This makes bank EPS more volatile than EPS for most non-financial companies. Preferred stock dividends must be subtracted from net income to arrive at EPS available to common shareholders, and this adjustment is relevant for bank analysis because many banks, particularly larger institutions, have preferred shares outstanding. Banks that have completed mutual-to-stock conversions may show unusual EPS dynamics in their early years as public companies due to excess capital and limited outstanding share counts.",
    "metricConnections": "EPS is the numerator input to the P/E ratio and one of two inputs (alongside BVPS) to the Graham Number formula. The relationship EPS equals ROE multiplied by BVPS connects per-share earnings directly to profitability and book value. Trailing twelve months (TTM) EPS calculated from quarterly SEC filings may differ slightly from the annual 10-K figure due to the timing of revisions and adjustments. EPS growth rate, combined with the retention ratio, indicates how quickly the bank is building book value per share through internal capital generation.",
    "commonPitfalls": "Always use diluted EPS rather than basic EPS for investment analysis; diluted EPS accounts for stock options, restricted stock units, and other potentially dilutive securities. One-time items including securities gains or losses, legal settlements, tax adjustments, and gains or losses on branch sales can distort EPS in any given period and should be identified when evaluating earnings quality. Comparing EPS across banks is meaningless without normalizing for share count; a bank with $2 EPS and 100 million shares outstanding earns the same total income as one with $4 EPS and 50 million shares. Banks that have recently completed share buybacks may show EPS growth even when total net income is flat or declining, because the denominator shrinks.",
    "acrossBankTypes": "EPS levels vary enormously by bank size and share count, making cross-bank EPS comparisons less useful than ratio-based metrics. What matters for investment analysis is EPS growth trajectory and consistency. Well-managed banks of all sizes aim for mid-to-high single-digit annual EPS growth through a combination of revenue growth, efficiency improvements, and share repurchases. Banks in high-growth markets or those executing successful acquisition strategies may show double-digit EPS growth rates, though acquisition-driven growth should be evaluated for sustainability and integration risk.",
    "whatDrivesMetric": "Net income is driven by the same factors that drive ROAA: net interest margin, fee income, operating efficiency, and provision for credit losses. The share count denominator is affected by stock issuances, share buybacks, stock-based compensation dilution, and any conversion of preferred shares or convertible instruments. Capital management strategy, specifically the balance between retaining earnings for growth, paying dividends, and repurchasing shares, determines how net income growth translates into EPS growth. Acquisition activity can affect EPS in either direction depending on whether the transaction is accretive (increases EPS) or dilutive (decreases EPS) to the acquirer.",
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
      "margin-of-safety": "EPS directly informs intrinsic value estimates in the Graham Number and other earnings-based models, and the gap between intrinsic value and market price defines the margin of safety."
    }
  },
  {
    "slug": "dividend-payout-ratio",
    "name": "Dividend Payout Ratio",
    "category": "per-share",
    "categoryLabel": "Per Share Metric",
    "formula": "Payout Ratio = Dividends Per Share / Earnings Per Share",
    "isPercentage": true,
    "shortDescription": "Percentage of earnings paid out as dividends.",
    "description": "The Dividend Payout Ratio shows what percentage of earnings a bank distributes to shareholders as dividends. The remainder is retained to support growth. This ratio indicates dividend sustainability and growth potential.",
    "formulaExplanation": "Dividends Per Share is the total annual dividends declared per share. EPS is trailing twelve month earnings per share.",
    "interpretation": "Lower payout ratios provide more cushion for dividend safety and allow for earnings retention. Higher ratios may appeal to income investors but leave less room for growth or adversity. Banks typically maintain moderate payout ratios due to capital requirements.",
    "typicalRange": "Most banks maintain payout ratios between 25% and 50%. Ratios above 60% may raise sustainability concerns.",
    "goodBad": {
      "good": "Payout ratios between 30-50% balance income returns with capital retention.",
      "bad": "Ratios above 70% may be unsustainable; ratios near 0% may disappoint income investors."
    },
    "considerations": [
      "Regulatory capital requirements limit how much banks can pay out.",
      "Cyclical earnings can temporarily distort payout ratios.",
      "Growing dividends with stable payout ratios indicates earnings growth.",
      "Stress testing affects regulatory approval for dividend plans."
    ],
    "relatedMetrics": [
      "earnings-per-share",
      "roe",
      "equity-to-assets"
    ],
    "relatedMetricDescriptions": {
      "earnings-per-share": "EPS is the base from which dividends are paid, determining how much is available for distribution.",
      "roe": "Higher ROE can support larger payouts while still retaining capital for growth.",
      "equity-to-assets": "Capital adequacy constrains how much earnings can be distributed as dividends."
    },
    "dataSource": "Dividends from income statement or cash flow statement. EPS from net income and shares.",
    "bankSpecificContext": "For banks, the dividend payout ratio must be evaluated in the context of regulatory capital requirements and capital planning. Banks cannot simply pay out all their earnings as dividends the way some other industries might; they must retain sufficient earnings to maintain and build regulatory capital ratios. Federal and state regulators can and do restrict dividend payments when a bank's capital levels are insufficient, when the bank is under a supervisory order, or when earnings quality is poor. The Federal Reserve's stress testing regime for large banks includes explicit restrictions on capital distributions (dividends and buybacks) based on stress test results and the stress capital buffer requirement.",
    "metricConnections": "Retention ratio equals 1 minus the payout ratio, and it determines how much of earnings is retained to build equity. The sustainable growth rate equals ROE multiplied by the retention ratio: a bank paying out 40% of earnings retains 60%, and if ROE is 12%, the sustainable growth rate is 7.2%. This growth rate represents how fast the bank can grow its equity, and therefore its assets and lending capacity, without needing to raise external capital. The payout ratio connects to the dividend discount model and Gordon Growth Model valuation methods, which require estimates of future dividends (driven by earnings and payout policy) to derive fair value.",
    "commonPitfalls": "A low payout ratio is not always a positive signal. It may indicate the bank cannot safely pay a higher dividend because capital levels are being rebuilt after losses, or because regulators have restricted distributions. Conversely, a high payout ratio is not always a warning sign; it may be appropriate and sustainable for a bank with strong, stable ROE and limited growth opportunities that would benefit from deploying retained earnings. A payout ratio above 100% (paying out more than earnings) is unsustainable for more than a very short period and indicates the bank is paying dividends from prior period retained earnings, which erodes capital. Calculating the payout ratio from a single quarter can be misleading if that quarter contained unusual items affecting earnings; trailing twelve month calculations are more reliable.",
    "acrossBankTypes": "Most US banks that pay regular dividends maintain payout ratios between 25% and 50%, based on FDIC aggregate data. Well-capitalized community banks with limited reinvestment opportunities may pay out 40-60% of earnings. Large banks subject to Federal Reserve stress testing and the stress capital buffer are more constrained in their payout ratios and must balance dividends with share buyback programs as part of their total capital return plans. De novo banks typically pay no dividends for their first several years of operation as they build capital and loan portfolios. Banks under regulatory orders (such as consent orders or cease-and-desist orders) are frequently prohibited from paying dividends until the order is lifted.",
    "whatDrivesMetric": "Board dividend policy and management's view of appropriate capital levels are the primary drivers. Regulatory capital buffers, including the stress capital buffer for large banks, create an effective ceiling on total capital distributions. Earnings stability and predictability influence the board's confidence in maintaining dividend payments; banks with volatile earnings tend to set lower payout ratios to avoid the negative signal of a dividend cut. Growth needs affect the target: banks in high-growth markets want to retain more earnings to fund loan growth. Share buyback preferences can substitute for dividend payments as a form of capital return, allowing the bank to maintain a moderate dividend payout ratio while returning additional capital through repurchases. Peer group payout levels create competitive pressure on dividend policy.",
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
      }
    ],
    "relatedValuations": [
      "dividend-discount-model",
      "gordon-growth-model",
      "excess-capital-return-model"
    ],
    "relatedValuationDescriptions": {
      "dividend-discount-model": "The dividend payout ratio directly determines the dividends per share used in the dividend discount model, making it a critical input to DDM-based fair value estimates."
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

// Cluster 4: Bank Efficiency and Funding — 11 Standard FAQ Entries
// Phase 2 / Batch 2 content for src/data/content/faqs.js
// Add these entries to the FAQS array alongside existing Cluster 4 "How to Calculate" entries.

const CLUSTER_4_FAQS = [
  {
    slug: 'what-is-a-good-efficiency-ratio',
    question: 'What is a good efficiency ratio for a bank?',
    cluster: 'efficiency',
    clusterName: 'Bank Efficiency and Funding',
    intentType: 'evaluative',
    shortAnswer: 'A good efficiency ratio for a bank is generally below 60%, meaning the bank spends less than 60 cents to generate each dollar of revenue',
    fullAnswer: 'The efficiency ratio measures how much a bank spends in non-interest expenses to generate each dollar of revenue (net interest income plus non-interest income). Lower values indicate better cost management, so unlike most financial ratios, a lower efficiency ratio is more favorable.\n\nFor U.S. commercial banks, an efficiency ratio between 50% and 60% is generally considered good. Banks that consistently operate below 50% are considered exceptionally efficient, while ratios above 70% may signal structural cost problems or a revenue shortfall. Based on FDIC aggregate data, the U.S. banking industry has historically averaged efficiency ratios in the 55% to 65% range, though this varies with the interest rate environment and business cycle.\n\nContext matters when interpreting this ratio. A bank with a large wealth management or investment banking division will typically run a higher efficiency ratio than a pure lending institution, because fee-based businesses require more compensation expense relative to revenue. That does not necessarily make the bank less well-run. Similarly, banks investing heavily in technology or branch expansion may temporarily show elevated efficiency ratios that improve over time as those investments generate revenue.\n\nThe most useful comparison is against peers of similar size, business mix, and geography. A community bank focused on traditional lending might target 55% to 65%, while a large diversified bank with significant trading and advisory operations might consider 60% to 65% acceptable. Tracking the trend over time is often more informative than any single-period reading.',
    relatedMetrics: ['efficiency-ratio', 'roe', 'roaa', 'net-interest-margin'],
    relatedValuations: ['peer-comparison'],
    relatedFaqs: ['what-drives-efficiency-ratio', 'why-small-banks-higher-efficiency-ratio', 'how-to-calculate-efficiency-ratio'],
    relatedGlossaryTerms: ['Efficiency Ratio', 'Non-Interest Expense', 'Net Interest Income'],
    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Screen banks by efficiency ratio to find the most cost-effective operators'
    },
    metaTitle: 'What Is a Good Efficiency Ratio for a Bank? | BankSift',
    metaDescription: 'Learn what efficiency ratio levels indicate strong cost management at banks, typical ranges by bank type, and how to interpret this key operating metric.'
  },
  {
    slug: 'why-small-banks-higher-efficiency-ratio',
    question: 'Why do smaller banks often have higher efficiency ratios than large banks?',
    cluster: 'efficiency',
    clusterName: 'Bank Efficiency and Funding',
    intentType: 'conceptual',
    shortAnswer: 'Smaller banks lack the scale to spread fixed costs across a large revenue base, and they often maintain branch networks and staffing levels that are proportionally more expensive relative to their asset size',
    fullAnswer: 'The efficiency ratio divides non-interest expense by total revenue, and smaller banks face structural disadvantages on both sides of that equation.\n\nOn the cost side, many banking expenses are relatively fixed regardless of institution size. Regulatory compliance, technology infrastructure, audit and legal fees, and core banking systems all carry baseline costs that a $500 million community bank and a $500 billion money center bank both must absorb. The larger bank spreads those costs across a vastly larger revenue base. Smaller banks also tend to operate branch networks that serve fewer customers per location, making per-transaction costs higher. Compensation is another factor: while smaller banks generally pay lower individual salaries, they often need a similar number of specialized roles (compliance officer, IT administrator, lending officers) relative to their operational complexity.\n\nOn the revenue side, larger banks benefit from diversified income streams. Fee income from capital markets, wealth management, investment banking, and transaction processing can represent 30% to 50% of revenue at large banks, compared to 15% to 25% at many community banks. This additional revenue dilutes the efficiency ratio even if absolute expense levels are high.\n\nThere are exceptions. Some well-run community banks achieve efficiency ratios in the 50% to 55% range through disciplined cost management, lean staffing models, and strong local market share that drives deposit gathering and loan origination without heavy marketing spend. The key takeaway is that efficiency ratio comparisons are most meaningful within peer groups of similar size and business model, not across the full range of bank sizes.',
    relatedMetrics: ['efficiency-ratio', 'non-interest-income-to-revenue', 'roaa'],
    relatedValuations: ['peer-comparison'],
    relatedFaqs: ['what-is-a-good-efficiency-ratio', 'what-drives-efficiency-ratio', 'comparing-profitability-different-size-banks'],
    relatedGlossaryTerms: ['Efficiency Ratio', 'Community Bank', 'Non-Interest Income'],
    cta: {
      type: 'learn-metric',
      target: '/metrics/efficiency-ratio',
      text: 'Learn more about the efficiency ratio and how to interpret it'
    },
    metaTitle: 'Why Do Smaller Banks Have Higher Efficiency Ratios? | BankSift',
    metaDescription: 'Understand why community and smaller banks typically run higher efficiency ratios than large banks, including scale effects, fixed costs, and revenue mix differences.'
  },
  {
    slug: 'what-drives-efficiency-ratio',
    question: 'What drives a bank\'s efficiency ratio higher or lower?',
    cluster: 'efficiency',
    clusterName: 'Bank Efficiency and Funding',
    intentType: 'conceptual',
    shortAnswer: 'The efficiency ratio is driven by changes in non-interest expense (the numerator) relative to total revenue (the denominator), so anything that raises costs faster than revenue or reduces revenue faster than costs will push the ratio higher',
    fullAnswer: 'The efficiency ratio equals non-interest expense divided by the sum of net interest income and non-interest income. Movement in any of those components shifts the ratio.\n\nFactors that push the efficiency ratio higher (worse) include rising compensation and benefits costs, which typically represent 50% to 60% of non-interest expense at most banks. Increased regulatory compliance spending, technology investments, branch expansion, and legal or remediation costs all add to the numerator. On the revenue side, declining net interest margins due to a flattening yield curve or competitive deposit pricing can shrink total revenue even if expenses remain stable, pushing the ratio up. A drop in fee income from reduced mortgage origination activity, lower trading revenue, or declining service charge income has the same effect.\n\nFactors that push the efficiency ratio lower (better) include revenue growth that outpaces expense growth, which often occurs during periods of rising interest rates when net interest income expands. Cost reduction initiatives such as branch consolidation, headcount optimization, and technology-driven automation directly reduce the numerator. Mergers and acquisitions can improve efficiency if the combined entity eliminates redundant operations, though integration costs may temporarily worsen the ratio.\n\nThe interest rate environment plays a particularly large role. When rates rise and the yield curve steepens, net interest income tends to grow faster than expenses, improving efficiency ratios across the industry. When rates fall or the curve flattens, the reverse occurs. This means some efficiency ratio movement reflects macroeconomic conditions rather than management decisions, reinforcing the value of comparing a bank against peers operating in the same environment.',
    relatedMetrics: ['efficiency-ratio', 'net-interest-margin', 'non-interest-income-to-revenue', 'roe'],
    relatedValuations: [],
    relatedFaqs: ['what-is-a-good-efficiency-ratio', 'why-small-banks-higher-efficiency-ratio', 'what-causes-nim-to-change'],
    relatedGlossaryTerms: ['Efficiency Ratio', 'Non-Interest Expense', 'Net Interest Income', 'Non-Interest Income'],
    cta: {
      type: 'learn-metric',
      target: '/metrics/efficiency-ratio',
      text: 'Explore the efficiency ratio metric page for interpretation guidance and typical ranges'
    },
    metaTitle: 'What Drives a Bank\'s Efficiency Ratio? | BankSift',
    metaDescription: 'Learn what factors cause a bank\'s efficiency ratio to improve or deteriorate, including expense drivers, revenue changes, and interest rate effects.'
  },
  {
    slug: 'what-is-deposits-to-assets-ratio',
    question: 'What is the deposits-to-assets ratio and what does it tell me?',
    cluster: 'efficiency',
    clusterName: 'Bank Efficiency and Funding',
    intentType: 'definitional',
    shortAnswer: 'The deposits-to-assets ratio measures the percentage of a bank\'s total assets funded by customer deposits, indicating how reliant the bank is on its most stable and typically lowest-cost funding source',
    fullAnswer: 'The deposits-to-assets ratio is calculated by dividing total deposits by total assets. A bank with $8 billion in deposits and $10 billion in total assets has a deposits-to-assets ratio of 80%. The remainder of the asset base is funded by other liabilities (borrowings, subordinated debt, other obligations) and shareholders\' equity.\n\nCustomer deposits are generally the most stable and least expensive source of funding for a bank. Non-interest-bearing checking accounts cost the bank nothing in interest expense, and even interest-bearing savings and money market accounts typically cost less than wholesale borrowings or long-term debt. A higher deposits-to-assets ratio therefore suggests a bank has a structural funding advantage, particularly if a large share of those deposits are low-cost or non-interest-bearing.\n\nFor U.S. commercial banks, deposits-to-assets ratios typically range from 70% to 90%. Community banks often fall at the higher end of this range because deposits are their primary funding source and they have limited access to capital markets. Larger banks may have somewhat lower ratios because they use a broader mix of funding sources, including Federal Home Loan Bank advances, repurchase agreements, and unsecured borrowings.\n\nA declining deposits-to-assets ratio over time can indicate that a bank is losing deposits to competitors, growing its balance sheet faster than it can attract deposits, or deliberately shifting toward wholesale funding. Any of these trends warrants further investigation. Conversely, a rising ratio suggests the bank is strengthening its core funding base, which generally reduces both funding cost and liquidity risk.',
    relatedMetrics: ['deposits-to-assets', 'loans-to-deposits', 'loans-to-assets', 'cost-of-deposits'],
    relatedValuations: [],
    relatedFaqs: ['healthy-loans-to-deposits-ratio', 'wholesale-funding-vs-core-deposits', 'how-to-evaluate-bank-funding-mix'],
    relatedGlossaryTerms: ['Core Deposits', 'Deposits to Assets'],
    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Compare deposits-to-assets ratios across 300+ banks in the screener'
    },
    metaTitle: 'What Is the Deposits-to-Assets Ratio? | BankSift',
    metaDescription: 'Learn what the deposits-to-assets ratio measures, why deposit funding matters for banks, and what typical ranges look like for U.S. commercial banks.'
  },
  {
    slug: 'healthy-loans-to-deposits-ratio',
    question: 'What is a healthy loans-to-deposits ratio for a bank?',
    cluster: 'efficiency',
    clusterName: 'Bank Efficiency and Funding',
    intentType: 'evaluative',
    shortAnswer: 'A healthy loans-to-deposits ratio for most banks falls between 70% and 90%, indicating the bank is actively lending its deposit base without overextending into less stable funding sources',
    fullAnswer: 'The loans-to-deposits ratio measures how much of a bank\'s deposit base has been deployed into loans, calculated by dividing total loans by total deposits. A ratio of 80% means the bank has lent out 80 cents of every dollar deposited, with the remaining 20 cents held in securities, cash, or other assets.\n\nA ratio between 70% and 90% is generally considered healthy for most U.S. banks. Within that range, the bank is actively intermediating between depositors and borrowers (its core function) while retaining enough liquidity in non-loan assets to meet depositor withdrawals and other obligations.\n\nRatios below 70% may suggest the bank is underlending, possibly because loan demand in its markets is weak, its underwriting standards are very conservative, or it is deliberately holding excess liquidity in securities. This is not necessarily a problem, but it can drag on profitability because securities generally yield less than loans.\n\nRatios above 90% indicate the bank is lending aggressively relative to its deposit base. Above 100%, the bank is funding some portion of its loan book with non-deposit sources such as Federal Home Loan Bank borrowings, brokered deposits, or other wholesale funding. While this can be a deliberate strategy during periods of strong loan demand, it introduces additional funding risk and cost. Banks that consistently operate above 100% should be evaluated carefully for liquidity risk.\n\nAs with most bank ratios, peer comparison is more informative than absolute thresholds. A bank in a high-growth market with strong loan demand may appropriately run a higher ratio than a bank in a mature market with limited lending opportunities.',
    relatedMetrics: ['loans-to-deposits', 'loans-to-assets', 'deposits-to-assets', 'net-interest-margin'],
    relatedValuations: [],
    relatedFaqs: ['loans-to-deposits-too-high', 'loans-to-deposits-too-low', 'what-is-deposits-to-assets-ratio'],
    relatedGlossaryTerms: ['Loans to Deposits', 'Core Deposits'],
    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Screen banks by loans-to-deposits ratio to assess lending intensity'
    },
    metaTitle: 'What Is a Healthy Loans-to-Deposits Ratio for a Bank? | BankSift',
    metaDescription: 'Learn what loans-to-deposits ratio range is considered healthy for banks, what high and low values signal, and why peer comparison matters.'
  },
  {
    slug: 'loans-to-deposits-too-high',
    question: 'What happens when a bank\'s loans-to-deposits ratio is too high?',
    cluster: 'efficiency',
    clusterName: 'Bank Efficiency and Funding',
    intentType: 'conceptual',
    shortAnswer: 'An excessively high loans-to-deposits ratio means the bank is funding loans with non-deposit sources, which increases funding cost, reduces liquidity flexibility, and raises the risk of a funding squeeze if wholesale markets tighten',
    fullAnswer: 'When a bank\'s loans-to-deposits ratio exceeds 100%, it has more loans outstanding than it has deposits to fund them. The gap must be filled with alternative funding sources: Federal Home Loan Bank advances, brokered deposits, repurchase agreements, subordinated debt, or other wholesale borrowings. Even ratios in the 90% to 100% range leave little liquidity buffer and may indicate growing reliance on non-core funding.\n\nThe primary risk is funding cost. Wholesale funding sources almost always carry higher interest rates than core customer deposits, particularly non-interest-bearing checking accounts. As the bank substitutes expensive funding for cheap deposits, its net interest margin compresses, directly reducing profitability.\n\nLiquidity risk also increases. Customer deposits, especially relationship-based checking and savings accounts, tend to be stable and predictable. Wholesale funding can be withdrawn or repriced quickly. During periods of financial stress, wholesale funding markets can freeze entirely, as occurred during the 2008 financial crisis when interbank lending markets seized up. A bank heavily dependent on wholesale funding may find itself unable to roll over maturing obligations at any price.\n\nRegulators pay close attention to high loans-to-deposits ratios as part of their assessment of a bank\'s liquidity position. A bank may face supervisory pressure to reduce lending growth, raise additional deposits, or increase liquid asset holdings if its ratio is deemed too high for its risk profile.\n\nA single-period ratio above 100% is not automatically a crisis, but a sustained trend of rising loans-to-deposits combined with increasing reliance on wholesale funding is a meaningful warning signal that warrants deeper investigation into the bank\'s funding strategy and liquidity position.',
    relatedMetrics: ['loans-to-deposits', 'deposits-to-assets', 'cost-of-funds', 'net-interest-margin'],
    relatedValuations: [],
    relatedFaqs: ['healthy-loans-to-deposits-ratio', 'loans-to-deposits-too-low', 'wholesale-funding-vs-core-deposits'],
    relatedGlossaryTerms: ['Loans to Deposits', 'Core Deposits', 'Cost of Funds'],
    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Identify banks with elevated loans-to-deposits ratios using the screener'
    },
    metaTitle: 'What Happens When Loans-to-Deposits Is Too High? | BankSift',
    metaDescription: 'Understand the risks of a high loans-to-deposits ratio for banks, including increased funding costs, liquidity risk, and regulatory concerns.'
  },
  {
    slug: 'loans-to-deposits-too-low',
    question: 'What happens when a bank\'s loans-to-deposits ratio is too low?',
    cluster: 'efficiency',
    clusterName: 'Bank Efficiency and Funding',
    intentType: 'conceptual',
    shortAnswer: 'A very low loans-to-deposits ratio suggests the bank is not fully deploying its deposit base into higher-yielding loans, which typically results in lower net interest income and weaker profitability',
    fullAnswer: 'When a bank\'s loans-to-deposits ratio falls well below 70%, it is holding a substantial portion of its deposit base in assets other than loans, typically investment securities, cash equivalents, or deposits at other banks. While this provides ample liquidity, it comes at a cost to profitability.\n\nLoans are generally a bank\'s highest-yielding asset class. A commercial or industrial loan might yield 6% to 8%, while investment-grade bonds might yield 3% to 5% and cash reserves earn even less. A bank that parks excess deposits in securities or cash rather than lending them out earns a lower return on its asset base, which flows through to lower net interest margin, lower ROAA, and ultimately lower ROE.\n\nThere are legitimate reasons for a low ratio. Weak loan demand in the bank\'s geographic markets may limit lending opportunities. A bank that recently experienced credit losses may be deliberately pulling back on lending while it rebuilds its credit quality. Newly chartered (de novo) banks often have low ratios in their early years as they build their loan pipeline. Banks may also maintain excess liquidity as a defensive measure during periods of economic uncertainty.\n\nThe important distinction is between a temporarily low ratio with a clear strategic rationale and a chronically low ratio that reflects an inability to generate loans. In the latter case, the bank may be collecting deposits it cannot profitably deploy, which calls into question the long-term viability of its business model. Investors evaluating a bank with a low loans-to-deposits ratio should look at the trend over time, the bank\'s stated lending strategy, and whether the bank is at least earning reasonable returns on its securities portfolio.',
    relatedMetrics: ['loans-to-deposits', 'loans-to-assets', 'net-interest-margin', 'roaa'],
    relatedValuations: [],
    relatedFaqs: ['healthy-loans-to-deposits-ratio', 'loans-to-deposits-too-high', 'what-is-deposits-to-assets-ratio'],
    relatedGlossaryTerms: ['Loans to Deposits', 'Earning Assets', 'Net Interest Margin'],
    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Compare loans-to-deposits ratios across banks to spot under-lenders and active lenders'
    },
    metaTitle: 'What Happens When Loans-to-Deposits Is Too Low? | BankSift',
    metaDescription: 'Learn why a low loans-to-deposits ratio can signal underutilized deposits, weaker profitability, and what to investigate when a bank is under-lending.'
  },
  {
    slug: 'cost-of-funds-vs-cost-of-deposits',
    question: 'What is cost of funds and how does it differ from cost of deposits?',
    cluster: 'efficiency',
    clusterName: 'Bank Efficiency and Funding',
    intentType: 'comparative',
    shortAnswer: 'Cost of funds measures the interest rate a bank pays on all its interest-bearing liabilities (deposits plus borrowings), while cost of deposits measures only the rate paid on deposit accounts, making cost of deposits a subset of the broader cost of funds calculation',
    fullAnswer: 'Cost of funds and cost of deposits both measure what a bank pays for its funding, but they cover different scopes.\n\nCost of deposits equals interest expense on deposits divided by average total deposits (or average interest-bearing deposits, depending on the calculation method). It captures only the cost of the bank\'s deposit base: checking accounts, savings accounts, money market accounts, and certificates of deposit. This metric isolates the pricing dynamics of the bank\'s core retail and commercial deposit relationships.\n\nCost of funds equals total interest expense divided by average total interest-bearing liabilities. It includes everything in cost of deposits plus the cost of all other borrowed funds: Federal Home Loan Bank advances, federal funds purchased, repurchase agreements, subordinated debt, and any other interest-bearing obligations. This gives a complete picture of the bank\'s overall funding cost.\n\nFor most community and regional banks, cost of funds and cost of deposits are close together because deposits make up the vast majority of their funding. The two metrics diverge more at larger banks or banks that rely significantly on wholesale borrowings. When cost of funds is materially higher than cost of deposits, it indicates the bank is using a meaningful amount of non-deposit funding that is more expensive than its deposit base.\n\nBoth metrics are expressed as annualized percentages. During periods of low interest rates, cost of deposits for U.S. banks has historically fallen below 0.50%, while during higher-rate environments it may exceed 2.0% or more. The spread between a bank\'s yield on earning assets and its cost of funds is closely related to net interest margin, making both metrics important inputs to profitability analysis.\n\nWhen comparing banks, differences in cost of deposits often reflect the quality of the deposit franchise. Banks with large non-interest-bearing deposit balances, strong local market share, and loyal customer bases tend to have lower deposit costs, creating a durable profitability advantage.',
    relatedMetrics: ['cost-of-funds', 'cost-of-deposits', 'net-interest-margin', 'deposits-to-assets'],
    relatedValuations: [],
    relatedFaqs: ['what-is-deposits-to-assets-ratio', 'wholesale-funding-vs-core-deposits', 'how-to-evaluate-bank-funding-mix'],
    relatedGlossaryTerms: ['Cost of Funds', 'Cost of Deposits', 'Net Interest Margin', 'Earning Assets'],
    cta: {
      type: 'learn-metric',
      target: '/metrics/cost-of-funds',
      text: 'Learn more about cost of funds and how it affects bank profitability'
    },
    metaTitle: 'Cost of Funds vs Cost of Deposits for Banks | BankSift',
    metaDescription: 'Understand the difference between cost of funds and cost of deposits for banks, how each is calculated, and why the distinction matters for funding analysis.'
  },
  {
    slug: 'wholesale-funding-vs-core-deposits',
    question: 'What does it mean when a bank relies heavily on wholesale funding vs core deposits?',
    cluster: 'efficiency',
    clusterName: 'Bank Efficiency and Funding',
    intentType: 'comparative',
    shortAnswer: 'Heavy reliance on wholesale funding means a bank is borrowing from financial markets rather than gathering customer deposits, which typically costs more, introduces greater volatility to the funding base, and increases vulnerability during periods of financial stress',
    fullAnswer: 'Core deposits are the checking, savings, and small-denomination time deposits that customers maintain for transactional and savings purposes. They are considered "core" because they tend to be stable, relatively insensitive to small interest rate changes, and inexpensive for the bank. A strong core deposit base is one of the most valuable franchise assets a bank can have.\n\nWholesale funding encompasses borrowings from non-customer sources: Federal Home Loan Bank advances, brokered deposits, federal funds purchased, repurchase agreements, and debt issuances in capital markets. These instruments are available to banks that need funding beyond what their deposit base provides, but they come with important trade-offs.\n\nCost is the most immediate difference. Wholesale funding is almost always more expensive than core deposits because lenders in these markets demand market-rate returns. A bank paying 0.5% on checking accounts and 4.5% on brokered CDs has a significant cost disparity between its core and wholesale funding.\n\nStability is the more critical concern. Core depositors typically maintain their accounts through interest rate cycles and even moderate economic stress. Wholesale funding providers are more rate-sensitive and more likely to withdraw or demand higher rates during turbulent periods. Brokered deposits, in particular, are fully rate-driven and will move to the highest-paying institution at maturity. During the 2023 banking stress events, banks with higher proportions of uninsured and wholesale deposits experienced faster outflows than banks with diversified, insured core deposit bases.\n\nRegulators treat funding composition as a key element of safety and soundness supervision. A bank with a wholesale funding concentration may face higher liquidity requirements, supervisory criticism, or restrictions on growth.\n\nSome wholesale funding usage is normal and appropriate, particularly for larger banks managing short-term liquidity needs. The concern arises when wholesale funding represents a growing share of total funding, when the bank cannot attract or retain sufficient core deposits, or when the bank uses short-term wholesale borrowings to fund long-term assets such as commercial real estate loans.',
    relatedMetrics: ['deposits-to-assets', 'loans-to-deposits', 'cost-of-funds', 'cost-of-deposits'],
    relatedValuations: [],
    relatedFaqs: ['cost-of-funds-vs-cost-of-deposits', 'how-to-evaluate-bank-funding-mix', 'what-is-deposits-to-assets-ratio'],
    relatedGlossaryTerms: ['Core Deposits', 'Cost of Funds', 'Cost of Deposits'],
    cta: {
      type: 'learn-metric',
      target: '/metrics/cost-of-funds',
      text: 'Explore the cost of funds metric to understand how funding sources affect bank profitability'
    },
    metaTitle: 'Wholesale Funding vs Core Deposits for Banks | BankSift',
    metaDescription: 'Learn the differences between wholesale funding and core deposits for banks, including cost, stability, regulatory treatment, and risk implications.'
  },
  {
    slug: 'how-to-evaluate-bank-funding-mix',
    question: 'How do I evaluate a bank\'s funding mix?',
    cluster: 'efficiency',
    clusterName: 'Bank Efficiency and Funding',
    intentType: 'strategic',
    shortAnswer: 'Evaluating a bank\'s funding mix involves examining the composition of its liabilities, the proportion of core deposits to wholesale funding, the cost structure of each funding source, and the stability of the deposit base over time',
    fullAnswer: 'A bank\'s funding mix describes where it gets the money it lends and invests. The composition, cost, and stability of that funding directly affect profitability, risk, and long-term franchise value.\n\nStart with the deposits-to-assets ratio. A ratio of 80% or higher generally indicates the bank funds most of its operations through deposits, which is the preferred structure. Look at how this ratio has trended over the past several years. A declining ratio may signal deposit attrition or reliance on alternative funding.\n\nWithin deposits, examine the mix between non-interest-bearing deposits, interest-bearing checking and savings, money market accounts, and time deposits (CDs). Non-interest-bearing deposits are free funding and represent the most valuable component. Banks where non-interest-bearing deposits constitute 25% to 40% of total deposits typically enjoy a significant cost advantage. Time deposits, particularly large-denomination or brokered CDs, are the most rate-sensitive and least sticky.\n\nCompare the bank\'s cost of deposits to peers. A bank with a materially lower cost of deposits likely has stronger customer relationships, better local market share, or a more favorable deposit composition. The gap between cost of deposits and cost of funds indicates how much the bank relies on non-deposit funding and what premium it pays for that reliance.\n\nLook at borrowings on the balance sheet. Federal Home Loan Bank advances, subordinated debt, and other borrowings should be viewed in relation to total assets. Modest levels of borrowings (5% to 15% of assets) are normal, particularly for managing short-term liquidity. Heavy borrowings may indicate the bank cannot generate sufficient deposits to fund its operations.\n\nFinally, consider the loans-to-deposits ratio in conjunction with the funding mix. A bank with an 85% loans-to-deposits ratio and a deposit base that is 35% non-interest-bearing is in a very different position than a bank with the same loans-to-deposits ratio but a deposit base that is 80% CDs and brokered deposits. The raw ratios only tell part of the story; the quality and composition of the underlying funding are what matter most.',
    relatedMetrics: ['deposits-to-assets', 'loans-to-deposits', 'cost-of-funds', 'cost-of-deposits', 'net-interest-margin'],
    relatedValuations: [],
    relatedFaqs: ['cost-of-funds-vs-cost-of-deposits', 'wholesale-funding-vs-core-deposits', 'what-is-deposits-to-assets-ratio'],
    relatedGlossaryTerms: ['Core Deposits', 'Cost of Funds', 'Cost of Deposits', 'Deposits to Assets'],
    cta: {
      type: 'learn-metric',
      target: '/metrics/deposits-to-assets',
      text: 'Learn more about deposits-to-assets and other funding metrics'
    },
    metaTitle: 'How to Evaluate a Bank\'s Funding Mix | BankSift',
    metaDescription: 'Learn how to assess a bank\'s funding composition by examining deposit mix, cost of funds, wholesale funding reliance, and liquidity indicators.'
  },
  {
    slug: 'what-is-non-interest-income-ratio',
    question: 'What is the non-interest income to revenue ratio and what does it tell me?',
    cluster: 'efficiency',
    clusterName: 'Bank Efficiency and Funding',
    intentType: 'definitional',
    shortAnswer: 'The non-interest income to revenue ratio measures the percentage of a bank\'s total revenue that comes from fee-based activities rather than lending, indicating how diversified the bank\'s income sources are',
    fullAnswer: 'The non-interest income to revenue ratio is calculated by dividing non-interest income by total revenue, where total revenue equals net interest income plus non-interest income. A bank with $40 million in net interest income and $10 million in non-interest income has a non-interest income to revenue ratio of 20% ($10 million divided by $50 million).\n\nNon-interest income includes service charges on deposit accounts, mortgage banking revenue, wealth management and trust fees, interchange and payment processing fees, investment banking and advisory fees, trading revenue, insurance commissions, and gains or losses on securities sales. The specific mix varies widely depending on the bank\'s business model and size.\n\nFor most U.S. community and regional banks, non-interest income typically represents 15% to 30% of total revenue. Traditional lending-focused banks fall at the lower end, while banks with significant wealth management, mortgage banking, or payment processing operations may exceed 30%. Large money center banks with investment banking and trading operations can see non-interest income represent 40% to 50% or more of total revenue.\n\nA higher ratio generally indicates greater revenue diversification, which can be valuable because fee income is less directly tied to interest rate movements than net interest income. Banks with strong fee income streams may be more resilient during periods of compressed net interest margins. However, some fee income sources carry their own volatility. Mortgage banking revenue swings significantly with refinancing activity, and trading revenue can be highly variable quarter to quarter.\n\nWhen evaluating this ratio, consider the sustainability and quality of the fee income sources. Recurring fee streams such as wealth management fees and deposit service charges are more valuable than one-time gains on securities sales or lumpy mortgage banking revenue. A bank that appears diversified based on a single strong quarter of mortgage originations may not maintain that ratio over a full interest rate cycle.',
    relatedMetrics: ['non-interest-income-to-revenue', 'efficiency-ratio', 'net-interest-margin', 'roaa'],
    relatedValuations: [],
    relatedFaqs: ['what-drives-efficiency-ratio', 'what-is-a-good-efficiency-ratio', 'how-to-evaluate-bank-funding-mix'],
    relatedGlossaryTerms: ['Non-Interest Income', 'Fee Income', 'Net Interest Income'],
    cta: {
      type: 'learn-metric',
      target: '/metrics/non-interest-income-to-revenue',
      text: 'Learn more about the non-interest income to revenue ratio'
    },
    metaTitle: 'What Is the Non-Interest Income to Revenue Ratio? | BankSift',
    metaDescription: 'Learn what the non-interest income to revenue ratio measures, typical ranges for different bank types, and how fee income diversification affects bank performance.'
  }
];

export default CLUSTER_4_FAQS;

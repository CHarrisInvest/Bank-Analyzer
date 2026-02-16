/**
 * FAQ Content Data
 * Educational FAQ content for BankSift
 */

export const FAQ_CLUSTERS = [
  {
    "slug": "getting-started",
    "name": "Getting Started with Bank Stocks",
    "order": 1
  },
  {
    "slug": "financial-statements",
    "name": "Understanding Bank Financial Statements",
    "order": 2
  },
  {
    "slug": "profitability",
    "name": "Bank Profitability Metrics",
    "order": 3
  },
  {
    "slug": "efficiency",
    "name": "Bank Efficiency and Funding",
    "order": 4
  },
  {
    "slug": "capital-and-risk",
    "name": "Capital Strength and Asset Quality",
    "order": 5
  },
  {
    "slug": "valuation",
    "name": "How to Value Bank Stocks",
    "order": 6
  },
  {
    "slug": "dividends",
    "name": "Bank Dividends and Shareholder Returns",
    "order": 7
  },
  {
    "slug": "interest-rates",
    "name": "Interest Rates and Bank Performance",
    "order": 8
  },
  {
    "slug": "bank-types",
    "name": "Understanding Bank Types",
    "order": 9
  },
  {
    "slug": "screening",
    "name": "Screening and Analysis Strategies",
    "order": 10
  },
  {
    "slug": "advanced",
    "name": "Advanced Bank Analysis",
    "order": 11
  }
];

export const FAQS = [
  {
    "slug": "what-are-bank-stocks",
    "question": "What are bank stocks and how do they differ from other stocks?",
    "cluster": "getting-started",
    "clusterName": "Getting Started with Bank Stocks",
    "intentType": "definitional",
    "shortAnswer": "Bank stocks are shares in publicly traded banks and bank holding companies, and they differ from other stocks because banks operate with unique financial structures, regulatory oversight, and accounting conventions that require specialized analysis",
    "fullAnswer": "Bank stocks are shares of ownership in publicly traded commercial banks, savings institutions, and bank holding companies. They trade on stock exchanges like any other equity, but the businesses behind them operate in ways that set them apart from nearly every other industry.\n\nThe most fundamental difference is leverage. A typical industrial company might fund 30-50% of its assets with debt. A bank funds 88-92% of its assets with deposits and borrowings, leaving only 8-12% funded by equity. This extreme leverage means that small changes in asset values or earnings have an outsized impact on shareholder returns, both positive and negative. A 1% return on assets translates to roughly a 10% return on equity at typical bank leverage levels.\n\nBank financial statements also look different from those of non-financial companies. Revenue for most companies comes from selling products or services. For banks, the primary revenue source is net interest income: the spread between interest earned on loans and investments and interest paid on deposits and borrowings. Fee income from services, wealth management, and transaction processing provides a secondary revenue stream. Standard metrics like EV/EBITDA, operating margin, and free cash flow, which are staples of industrial company analysis, do not apply to banks because debt is an operating input rather than a financing choice.\n\nRegulation adds another layer of distinction. Banks are among the most heavily regulated businesses in the economy. Federal and state regulators set minimum capital requirements, conduct examinations, approve or deny mergers and acquisitions, and can restrict dividend payments. These regulatory constraints directly affect profitability, growth potential, and shareholder returns in ways that have no parallel in most other industries.\n\nThe asset quality dimension is also unique to banks. A manufacturer worries about inventory obsolescence; a bank worries about loan defaults. The provision for credit losses, a non-cash charge reflecting expected future loan losses, is one of the most significant and volatile components of a bank's income statement. It can swing from a minor expense in good times to a profit-consuming charge during economic downturns.\n\nBecause of these differences, bank stock analysis relies on a distinct set of metrics. Return on equity (ROE), return on average assets (ROAA), net interest margin (NIM), efficiency ratio, and price-to-book (P/B) ratio are the core measures that bank investors focus on. General-purpose stock screeners and valuation tools often lack these bank-specific metrics, which is why specialized tools exist for bank stock analysis.",
    "relatedMetrics": [
      "roe",
      "roaa",
      "net-interest-margin",
      "price-to-book"
    ],
    "relatedValuations": [],
    "relatedFaqs": [
      "why-invest-in-bank-stocks",
      "how-do-banks-make-money",
      "why-bank-financials-are-different"
    ],
    "relatedGlossaryTerms": [
      "Bank Holding Company",
      "Net Interest Income"
    ],
    "cta": {
      "type": "learn-metric",
      "target": "/metrics",
      "text": "Learn about the key metrics used to analyze bank stocks"
    },
    "metaTitle": "What Are Bank Stocks? Key Differences | BankSift",
    "metaDescription": "Learn what bank stocks are and how they differ from other stocks in leverage, financial statements, regulation, and the metrics used to analyze them."
  },
  {
    "slug": "why-invest-in-bank-stocks",
    "question": "Why invest in bank stocks?",
    "cluster": "getting-started",
    "clusterName": "Getting Started with Bank Stocks",
    "intentType": "conceptual",
    "shortAnswer": "Bank stocks offer a combination of dividend income, exposure to economic growth, and valuation transparency that makes them attractive to income and value investors",
    "fullAnswer": "Bank stocks have several characteristics that attract a broad range of investors, from income-focused retirees to deep value analysts.\n\nDividends are a primary draw. Banks have historically been among the most reliable dividend payers in the equity market. Their business model generates steady cash flows from lending and fee income, and mature banks with limited reinvestment needs often return a significant portion of earnings to shareholders. Many community and regional banks have maintained or grown their dividends through multiple economic cycles, making them appealing for investors who depend on portfolio income.\n\nValuation transparency is another advantage. Because bank balance sheets consist primarily of financial instruments (loans, securities, deposits) carried near fair value under accounting standards, book value is a more meaningful anchor for valuation than it is for most industries. Investors can assess a bank's price-to-book ratio with reasonable confidence that the underlying book value approximates the net asset value of the institution. This transparency gives value investors a concrete foundation for analysis.\n\nBank profitability is tied to economic growth and interest rates, providing a form of macroeconomic exposure. When the economy grows, loan demand increases, credit quality improves, and banks earn more. Rising interest rates, within a range, tend to expand net interest margins as the rates banks earn on loans increase faster than the rates they pay on deposits. For investors with a positive long-term view of economic growth, bank stocks offer a leveraged way to participate.\n\nThe sheer number of publicly traded banks creates opportunity through inefficiency. There are over 300 publicly traded banks in the United States, many of them community and small regional institutions with limited analyst coverage. This lack of coverage means that mispriced stocks are more common in the banking sector than in heavily followed industries like technology or consumer goods. Patient investors willing to do their own research can find banks trading at meaningful discounts to intrinsic value.\n\nBanks also offer exposure to local and regional economic dynamics. A community bank in a growing suburban market captures the economic vitality of that specific region. Investors who understand a particular market's growth drivers can identify banks that are positioned to benefit.\n\nLike any investment, bank stocks carry risks, including credit cycle exposure, interest rate sensitivity, and regulatory uncertainty. Understanding these risks and the metrics used to evaluate them is essential before investing.",
    "relatedMetrics": [
      "roe",
      "dividend-payout-ratio",
      "net-interest-margin",
      "price-to-book"
    ],
    "relatedValuations": [
      "dividend-discount-model",
      "price-to-book-valuation"
    ],
    "relatedFaqs": [
      "what-are-bank-stocks",
      "advantages-disadvantages-bank-stocks",
      "what-to-know-before-buying-bank-stocks"
    ],
    "relatedGlossaryTerms": [],
    "cta": {
      "type": "learn-metric",
      "target": "/metrics",
      "text": "Explore the metrics that drive bank stock performance"
    },
    "metaTitle": "Why Invest in Bank Stocks? | BankSift",
    "metaDescription": "Discover why investors are attracted to bank stocks, including reliable dividends, valuation transparency, economic exposure, and inefficiency in small-cap coverage."
  },
  {
    "slug": "advantages-disadvantages-bank-stocks",
    "question": "What are the advantages and disadvantages of investing in bank stocks?",
    "cluster": "getting-started",
    "clusterName": "Getting Started with Bank Stocks",
    "intentType": "evaluative",
    "shortAnswer": "Bank stocks offer strong dividends, transparent valuations, and economic leverage, but carry risks from credit cycles, interest rate sensitivity, regulatory constraints, and balance sheet opacity",
    "fullAnswer": "Bank stocks present a distinct set of advantages and risks that investors should evaluate before building a position.\n\nOn the advantage side, dividend income stands out. Banks generate predictable cash flows from lending and fee income, and many maintain long track records of consistent or growing dividend payments. Mature banks with limited reinvestment opportunities often distribute 30-50% of earnings as dividends. Valuation transparency is another strength. Bank balance sheets are composed mostly of financial instruments, making book value a meaningful measure of net asset value. The price-to-book ratio provides an intuitive anchor that is harder to derive for technology or consumer brand companies. Banks also provide leveraged exposure to economic expansion. Loan demand, credit quality, and profitability all tend to improve as the economy grows. For investors seeking economic sensitivity without the volatility of commodity-linked sectors, banks offer a compelling option. Market inefficiency is a practical advantage as well. With hundreds of publicly traded community and regional banks receiving little or no analyst coverage, the sector offers opportunities for investors willing to conduct independent research.\n\nThe disadvantages are equally important. Credit cycle risk is the most significant. During economic downturns, loan defaults rise, provisions for credit losses consume earnings, and bank stock prices can decline sharply. The 2008 financial crisis and subsequent periods of banking stress demonstrated that credit losses can threaten not just profits but the solvency of individual institutions. Interest rate sensitivity creates a different form of risk. While moderately rising rates often benefit bank margins, rapid rate increases can cause unrealized losses in bond portfolios, trigger deposit flight as customers seek higher-yielding alternatives, and slow loan demand. Flat or inverted yield curves compress net interest margins even at well-run banks. Regulatory risk is ever-present. Capital requirements, stress testing mandates, dividend restrictions, and compliance costs all constrain bank profitability and strategic flexibility. Regulatory changes can alter the competitive landscape and profitability outlook with limited warning. Balance sheet complexity poses analytical challenges. Loan quality is difficult to assess from the outside. Held-to-maturity securities may contain unrealized losses not visible in financial statements. Off-balance-sheet exposures and derivative positions add further layers of complexity at larger institutions.\n\nUnderstanding these tradeoffs is the first step toward making informed decisions about bank stock investing. The key is matching an investor's risk tolerance and analytical capacity to the specific characteristics of the bank stocks they consider.",
    "relatedMetrics": [
      "roe",
      "net-interest-margin",
      "price-to-book",
      "dividend-payout-ratio"
    ],
    "relatedValuations": [],
    "relatedFaqs": [
      "why-invest-in-bank-stocks",
      "what-to-know-before-buying-bank-stocks",
      "are-bank-stocks-cyclical"
    ],
    "relatedGlossaryTerms": [
      "Provision for Credit Losses"
    ],
    "cta": {
      "type": "learn-metric",
      "target": "/metrics",
      "text": "Learn the metrics that help evaluate bank stock risks and rewards"
    },
    "metaTitle": "Bank Stock Pros and Cons | BankSift",
    "metaDescription": "Understand the advantages and disadvantages of investing in bank stocks, from dividends and valuation transparency to credit cycle and regulatory risks."
  },
  {
    "slug": "how-do-banks-make-money",
    "question": "How do banks make money?",
    "cluster": "getting-started",
    "clusterName": "Getting Started with Bank Stocks",
    "intentType": "conceptual",
    "shortAnswer": "Banks earn money primarily through the interest rate spread between what they charge borrowers and what they pay depositors, supplemented by fees for financial services",
    "fullAnswer": "Banks make money through two primary channels: net interest income and non-interest income. Understanding both is essential to evaluating a bank's profitability.\n\nNet interest income is the dominant revenue source for most commercial banks, typically accounting for 70-85% of total revenue. The concept is straightforward: a bank gathers deposits from customers and pays them a certain interest rate (or nothing, in the case of non-interest-bearing checking accounts). It then lends that money to borrowers at a higher rate for mortgages, business loans, commercial real estate, and other purposes. It also invests a portion in securities like government bonds and mortgage-backed securities. The difference between the interest the bank earns and the interest it pays is net interest income. The efficiency of this spread is measured by net interest margin (NIM), which expresses net interest income as a percentage of average earning assets.\n\nNon-interest income, sometimes called fee income, comes from a variety of services. These include service charges on deposit accounts, ATM and interchange fees, wealth management and trust fees, mortgage origination and servicing fees, insurance commissions, and gains from securities trading. For large money center banks, investment banking fees, trading revenue, and capital markets activities can represent a substantial share of total revenue. For community banks, fee income is typically a smaller but still meaningful supplement to interest income.\n\nOn the expense side, banks incur non-interest expenses (salaries, benefits, technology, occupancy, regulatory compliance) and provision for credit losses. The provision is a critical expense unique to banking: it reflects management's estimate of expected loan losses and directly reduces net income. When economic conditions deteriorate and borrowers default, provisions increase and can consume a large share of revenue.\n\nThe simplified bank profit equation is: net interest income plus non-interest income, minus non-interest expense, minus provision for credit losses, minus taxes, equals net income. The efficiency ratio measures how much of each revenue dollar is consumed by operating expenses. A bank that generates $100 million in total revenue, spends $58 million on operating expenses, sets aside $5 million for loan losses, and pays $9 million in taxes earns $28 million in net income.\n\nThe balance between these components varies by bank type. A community bank focused on commercial lending may derive 80% of revenue from net interest income, while a large bank with asset management and investment banking divisions may rely on fee income for 40% or more of total revenue.",
    "relatedMetrics": [
      "net-interest-margin",
      "efficiency-ratio",
      "roe",
      "roaa"
    ],
    "relatedValuations": [],
    "relatedFaqs": [
      "what-are-bank-stocks",
      "what-is-net-interest-income",
      "what-is-non-interest-income"
    ],
    "relatedGlossaryTerms": [
      "Net Interest Income",
      "Fee Income",
      "Provision for Credit Losses",
      "Earning Assets"
    ],
    "cta": {
      "type": "learn-metric",
      "target": "/metrics/net-interest-margin",
      "text": "Learn about net interest margin, the key measure of bank lending profitability"
    },
    "metaTitle": "How Do Banks Make Money? | BankSift",
    "metaDescription": "Learn how banks generate revenue through net interest income from lending and fee income from financial services, and how expenses determine profitability."
  },
  {
    "slug": "commercial-vs-investment-banks",
    "question": "What is the difference between commercial banks and investment banks?",
    "cluster": "getting-started",
    "clusterName": "Getting Started with Bank Stocks",
    "intentType": "comparative",
    "shortAnswer": "Commercial banks take deposits and make loans to earn interest income, while investment banks help companies raise capital, advise on mergers, and trade securities for fee and trading revenue",
    "fullAnswer": "Commercial banks and investment banks serve different functions in the financial system, earn revenue in different ways, and require different analytical approaches.\n\nCommercial banks accept deposits from individuals and businesses and use those funds to make loans: mortgages, business loans, commercial real estate loans, consumer loans, and others. Their primary revenue source is net interest income, the spread between what they earn on loans and investments and what they pay on deposits. They also earn fees from deposit accounts, payment processing, and other banking services. Commercial banks are regulated by agencies such as the FDIC, OCC, and the Federal Reserve, which set capital requirements, conduct examinations, and insure deposits up to $250,000 per depositor per institution. The vast majority of publicly traded banks covered by bank-specific analytical tools are commercial banks or bank holding companies that own commercial banks.\n\nInvestment banks operate in capital markets rather than deposit-taking and lending. Their primary activities include underwriting securities (helping companies issue stocks and bonds), advising corporations on mergers and acquisitions, trading securities and derivatives, and providing asset management services. Revenue comes predominantly from advisory fees, underwriting fees, trading gains, and management fees rather than interest income. Investment banks do not typically take retail deposits or make traditional commercial loans.\n\nThe analytical frameworks differ significantly. Commercial bank analysis centers on metrics like ROE, ROAA, NIM, efficiency ratio, P/B, and credit quality measures. Investment bank analysis focuses more on revenue per employee, compensation ratios, trading revenue volatility, and deal pipeline. The standard bank-specific valuation metrics (P/B, ROE-P/B framework, Graham Number for banks) are designed for commercial banks and do not translate directly to pure investment banks.\n\nIn practice, the distinction has blurred. Several of the largest US financial institutions (often called money center banks) combine commercial banking, investment banking, wealth management, and other activities under one holding company. When analyzing these diversified institutions, it helps to understand which segments are driving results and to recognize that blended metrics reflect a mix of commercial and capital markets activities.\n\nFor investors focused on bank stock analysis, the primary universe consists of commercial banks and bank holding companies. The metrics and valuation methods on BankSift are designed for these institutions.",
    "relatedMetrics": [
      "net-interest-margin",
      "roe",
      "efficiency-ratio"
    ],
    "relatedValuations": [],
    "relatedFaqs": [
      "what-are-bank-stocks",
      "types-of-publicly-traded-banks",
      "what-are-money-center-banks"
    ],
    "relatedGlossaryTerms": [
      "Money Center Bank",
      "Bank Holding Company",
      "Financial Holding Company"
    ],
    "cta": {
      "type": "glossary",
      "target": "/glossary",
      "text": "Explore banking terms and definitions in the glossary"
    },
    "metaTitle": "Commercial Banks vs Investment Banks | BankSift",
    "metaDescription": "Understand the key differences between commercial banks and investment banks in business model, revenue sources, regulation, and analysis approach."
  },
  {
    "slug": "what-are-community-banks",
    "question": "What are community banks and why do investors care about them?",
    "cluster": "getting-started",
    "clusterName": "Getting Started with Bank Stocks",
    "intentType": "definitional",
    "shortAnswer": "Community banks are smaller, locally focused institutions that serve specific geographic markets, attracting investors with their relationship-based lending, stable deposit franchises, and potential as acquisition targets",
    "fullAnswer": "Community banks are smaller banking institutions that focus on serving a specific geographic market, typically a city, county, or cluster of counties. While there is no single official definition, the FDIC generally classifies banks with total assets under approximately $10 billion as community banks, and many are significantly smaller, with assets ranging from $100 million to $3 billion. Despite their individual size, community banks as a group play a significant role in the US financial system, particularly in small business lending, agricultural finance, and local commercial real estate.\n\nCommunity banks differ from larger institutions in several ways that matter for investors. Their lending is relationship-based: loan officers know the borrowers, understand the local economy, and make credit decisions based on direct knowledge rather than purely algorithmic underwriting. This relationship model can produce higher-quality loan portfolios and stronger credit performance through economic cycles, though it also means growth is constrained by the size and health of the local market. Their deposit bases tend to be composed of stable core deposits (checking, savings, and small CDs from local customers), providing low-cost, reliable funding that supports attractive net interest margins.\n\nInvestors are drawn to community banks for several reasons. Valuation inefficiency is a primary factor. Most community banks have no analyst coverage and limited institutional ownership, which means their stock prices are more likely to diverge from fundamental value. Patient investors who conduct their own analysis can identify banks trading at meaningful discounts to book value or at low multiples of earnings. Dividend income is another attraction, as many community banks have long histories of regular dividend payments. Acquisition potential adds a speculative element: the US banking industry has been consolidating for decades, and community banks are frequent acquisition targets. Acquirers typically pay premiums of 1.3x to 2.0x book value or higher, depending on the deposit franchise and market.\n\nCommunity banks also carry specific risks. Their concentrated geographic exposure means a local economic downturn can disproportionately affect loan quality. Limited product diversification makes them more dependent on net interest income than fee income. Smaller scale translates to higher per-unit regulatory compliance costs, which pressures efficiency ratios. And low trading volume in community bank stocks can create liquidity risk, making it difficult to buy or sell shares without affecting the price.\n\nFor investors willing to do the work, community banks offer a combination of income, value, and potential upside that is increasingly rare in public equity markets.",
    "relatedMetrics": [
      "price-to-book",
      "net-interest-margin",
      "efficiency-ratio",
      "dividend-payout-ratio"
    ],
    "relatedValuations": [
      "price-to-book-valuation",
      "peer-comparison-analysis"
    ],
    "relatedFaqs": [
      "types-of-publicly-traded-banks",
      "community-vs-regional-vs-money-center",
      "how-to-screen-community-banks"
    ],
    "relatedGlossaryTerms": [
      "Community Bank",
      "Core Deposits"
    ],
    "cta": {
      "type": "search",
      "target": "/search",
      "text": "Search for community banks by name or ticker"
    },
    "metaTitle": "What Are Community Banks? | BankSift",
    "metaDescription": "Learn what community banks are, how they operate, and why investors seek them out for dividends, value opportunities, and acquisition potential."
  },
  {
    "slug": "bank-vs-bank-holding-company",
    "question": "What is the difference between a bank and a bank holding company?",
    "cluster": "getting-started",
    "clusterName": "Getting Started with Bank Stocks",
    "intentType": "comparative",
    "shortAnswer": "A bank is the regulated institution that takes deposits and makes loans, while a bank holding company is the parent corporation that owns the bank and whose stock trades on public exchanges",
    "fullAnswer": "When investors buy \"bank stocks,\" they are almost always buying shares of a bank holding company (BHC), not the bank itself. Understanding this distinction clarifies how bank stocks are structured and where the financial data comes from.\n\nA bank is a chartered financial institution authorized by federal or state regulators to accept deposits, make loans, and provide other financial services. The bank holds the actual assets (loans, securities, cash), liabilities (deposits, borrowings), and equity on its balance sheet. It is regulated and examined by the appropriate banking agencies: the OCC for nationally chartered banks, state banking departments and the FDIC for state-chartered banks, and the Federal Reserve for state member banks.\n\nA bank holding company is a corporation that owns or controls one or more banks. The holding company structure serves several purposes. It provides organizational flexibility, allowing the parent to engage in activities (such as insurance, securities, or data processing) that the bank itself may not be permitted to conduct. It facilitates acquisitions, because the holding company can acquire other banks or holding companies without merging bank charters. And it provides a single publicly traded entity for investors to buy and sell.\n\nWhen a bank holding company's stock is listed on an exchange, investors are buying shares of the holding company. The holding company's consolidated financial statements include the bank subsidiary and any other subsidiaries. Most of the financial data used in bank stock analysis (total assets, net income, equity, loans, deposits) comes from these consolidated holding company filings with the SEC (10-K and 10-Q reports). The individual bank subsidiary also files a separate Call Report with the FFIEC, which contains detailed bank-level financial data.\n\nFor smaller institutions, the holding company may be little more than a shell: it owns the bank, the bank is essentially the entire operation, and the holding company's financials mirror the bank's. For larger organizations, the holding company may own multiple bank subsidiaries, insurance companies, broker-dealers, or other financial services businesses, making the consolidated financials a blend of different activities.\n\nA financial holding company (FHC) is a bank holding company that has elected a designation under the Gramm-Leach-Bliley Act that allows it to engage in a broader range of financial activities, including securities underwriting and insurance. Most large US bank holding companies are financial holding companies.",
    "relatedMetrics": [],
    "relatedValuations": [],
    "relatedFaqs": [
      "what-are-bank-stocks",
      "types-of-publicly-traded-banks",
      "bhc-vs-fhc"
    ],
    "relatedGlossaryTerms": [
      "Bank Holding Company",
      "Financial Holding Company",
      "National Bank",
      "State-Chartered Bank"
    ],
    "cta": {
      "type": "glossary",
      "target": "/glossary",
      "text": "See definitions for bank holding company, financial holding company, and related terms"
    },
    "metaTitle": "Bank vs Bank Holding Company | BankSift",
    "metaDescription": "Learn the difference between a bank and a bank holding company, and understand which entity you actually own when you buy bank stock."
  },
  {
    "slug": "types-of-publicly-traded-banks",
    "question": "What are the different types of banks that trade publicly?",
    "cluster": "getting-started",
    "clusterName": "Getting Started with Bank Stocks",
    "intentType": "definitional",
    "shortAnswer": "Publicly traded banks range from community banks with under $1 billion in assets to money center banks with over $1 trillion, each with distinct business models, risk profiles, and investment characteristics",
    "fullAnswer": "Publicly traded banks span a wide spectrum of size, business model, and geographic scope. Understanding the major categories helps investors identify which types align with their investment objectives.\n\nCommunity banks are the smallest and most numerous category. They typically have assets under $10 billion and focus on a specific geographic market, earning the bulk of their revenue from local commercial and consumer lending. Many community banks have market capitalizations under $500 million and limited or no analyst coverage, creating opportunities for investors who conduct independent research.\n\nRegional banks operate across multiple markets within a region or state, generally with assets between $10 billion and $100 billion. They offer a broader range of products than community banks and often have active wealth management, mortgage banking, or treasury services divisions. Regional banks typically have more analyst coverage and institutional ownership than community banks, but still less than the largest institutions.\n\nSuper-regional banks bridge the gap between regional and money center banks, with assets typically between $100 billion and $500 billion. They operate across multiple states and often have significant capital markets, insurance, or asset management operations alongside traditional banking.\n\nMoney center banks are the largest institutions, with assets exceeding $500 billion and often surpassing $1 trillion. They operate nationally and globally, with businesses spanning commercial banking, investment banking, trading, wealth management, and asset management. Their financial statements are the most complex to analyze, and their stock prices are influenced by global capital markets conditions as much as by traditional banking fundamentals.\n\nThrifts and savings institutions are a distinct category that originated as savings and loan associations focused on residential mortgage lending. Many have broadened their activities over time, but some still maintain a heavy concentration in mortgage lending. Their regulatory framework differs slightly from commercial banks.\n\nMutual banks are institutions owned by their depositors rather than shareholders. They do not trade publicly. However, mutual-to-stock conversions, in which a mutual bank reorganizes as a stock corporation and conducts an initial public offering, create newly public bank stocks that often have distinctive characteristics: excess capital, low price-to-book ratios, and limited initial float.\n\nEach type carries different risk and return characteristics. Community banks offer potential for deep value and acquisition premiums but with liquidity risk. Money center banks offer liquidity and diversification but with complexity. Matching the bank type to an investor's analytical capacity and objectives is an important first step.",
    "relatedMetrics": [
      "price-to-book",
      "roe",
      "net-interest-margin"
    ],
    "relatedValuations": [
      "peer-comparison-analysis"
    ],
    "relatedFaqs": [
      "what-are-community-banks",
      "what-are-money-center-banks",
      "what-are-super-regional-banks",
      "mutual-vs-stock-bank"
    ],
    "relatedGlossaryTerms": [
      "Community Bank",
      "Money Center Bank",
      "Super-Regional Bank",
      "Thrift / Savings Institution"
    ],
    "cta": {
      "type": "search",
      "target": "/search",
      "text": "Search for banks by name, ticker, or CIK number"
    },
    "metaTitle": "Types of Publicly Traded Banks | BankSift",
    "metaDescription": "Explore the different types of publicly traded banks from community banks to money center banks, and understand their distinct investment characteristics."
  },
  {
    "slug": "how-to-start-researching-bank-stocks",
    "question": "How do I start researching bank stocks as a beginner?",
    "cluster": "getting-started",
    "clusterName": "Getting Started with Bank Stocks",
    "intentType": "procedural",
    "shortAnswer": "Start by learning the core bank metrics (ROE, NIM, efficiency ratio, P/B), then use a bank stock screener to filter for quality and value, and review individual bank filings to understand the business",
    "fullAnswer": "Researching bank stocks can seem intimidating because banks use specialized metrics and financial statement structures that differ from other industries. A structured approach makes it manageable.\n\nThe first step is learning the core metrics. Five metrics form the foundation of bank stock analysis. Return on equity (ROE) measures how much profit the bank generates per dollar of equity. Return on average assets (ROAA) measures profitability relative to total assets, removing leverage effects. Net interest margin (NIM) measures the spread between interest earned and interest paid. Efficiency ratio measures what percentage of revenue goes to operating expenses. Price-to-book (P/B) ratio compares the stock price to the per-share accounting value of the bank. Understanding these five metrics provides enough context to begin evaluating individual banks.\n\nThe second step is screening. A bank stock screener allows filtering across hundreds of publicly traded banks by the metrics that matter. Start with a simple quality screen: ROE above 8%, ROAA above 0.80%, efficiency ratio below 70%, and P/B below 1.5x. This type of filter narrows the universe to banks that are reasonably profitable, efficient, and not excessively priced. From there, refine by additional criteria such as asset size, geographic focus, or dividend yield based on individual preference.\n\nThe third step is looking at individual banks that pass the screen. Read the bank's most recent 10-K annual filing (available on SEC EDGAR) to understand its business. Focus on the management discussion and analysis (MD&A) section, which explains the bank's strategy, market, loan portfolio composition, and risk factors in plain language. Review the loan portfolio breakdown to understand what types of loans the bank makes and where its credit risk is concentrated. Check the trend in non-performing loans and net charge-offs to assess credit quality direction.\n\nThe fourth step is comparing. No bank should be evaluated in isolation. Select 5-10 banks of similar size and geography as a peer group and compare them across the core metrics. A bank that shows a strong ROE, a wide NIM, a low efficiency ratio, and a moderate P/B relative to its peers is a stronger candidate than one that screens well in absolute terms but lags its peer group.\n\nThe fifth step is valuation. After identifying a bank that appears well-managed and attractively priced, apply one or more valuation methods to estimate fair value and determine whether the stock offers an adequate margin of safety.",
    "relatedMetrics": [
      "roe",
      "roaa",
      "net-interest-margin",
      "efficiency-ratio",
      "price-to-book"
    ],
    "relatedValuations": [
      "price-to-book-valuation",
      "peer-comparison-analysis"
    ],
    "relatedFaqs": [
      "most-important-bank-stock-metrics",
      "what-to-know-before-buying-bank-stocks",
      "how-to-use-bank-stock-screener"
    ],
    "relatedGlossaryTerms": [],
    "cta": {
      "type": "screener",
      "target": "/screener",
      "text": "Start screening 300+ bank stocks by profitability, efficiency, and valuation"
    },
    "metaTitle": "How to Research Bank Stocks | BankSift",
    "metaDescription": "A beginner's guide to researching bank stocks: learn the core metrics, screen for quality and value, review filings, compare peers, and estimate fair value."
  },
  {
    "slug": "most-important-bank-stock-metrics",
    "question": "What are the most important metrics for evaluating a bank stock?",
    "cluster": "getting-started",
    "clusterName": "Getting Started with Bank Stocks",
    "intentType": "evaluative",
    "shortAnswer": "The most important bank stock metrics span profitability (ROE, ROAA, NIM), efficiency (efficiency ratio), capital strength (equity-to-assets), and valuation (P/B, P/E), with asset quality metrics providing critical risk context",
    "fullAnswer": "Bank stock analysis uses a specific set of metrics that differ from the ratios applied to other industries. The most important ones fall into five categories.\n\nProfitability metrics reveal how effectively the bank generates earnings. Return on equity (ROE) is the headline profitability measure, showing how much net income the bank produces per dollar of shareholders' equity. Well-managed banks typically achieve ROE between 8% and 15%. Return on average assets (ROAA) strips out leverage to show profitability per dollar of assets; values above 1.00% are generally strong. Net interest margin (NIM) measures the spread between interest earned and interest paid relative to earning assets. It is the single most important revenue driver for most banks, with US banks historically averaging 3.0-3.5% based on FDIC data.\n\nEfficiency metrics measure cost management. The efficiency ratio expresses non-interest expense as a percentage of total revenue. Lower is better: banks below 60% are generally considered well-run, while those consistently below 50% are exceptional. The ratio reveals how much of each revenue dollar the bank converts to profit before credit losses.\n\nCapital strength metrics indicate how well a bank can absorb losses. The equity-to-assets ratio is the simplest measure, showing the percentage of assets funded by equity. Most banks operate between 8% and 12%. For deeper analysis, regulatory capital ratios like CET1 and Tier 1 provide risk-adjusted views of capital adequacy.\n\nValuation metrics help determine whether the stock is attractively priced. Price-to-book (P/B) is the primary bank valuation metric because bank book values are closer to economic reality than in most industries. A P/B of 1.0 means the stock trades at its accounting net asset value. Price-to-earnings (P/E) provides a complementary earnings-based perspective. During normal earnings periods, bank P/E ratios typically fall between 8x and 15x.\n\nAsset quality metrics assess credit risk. The non-performing loans (NPL) ratio, net charge-off ratio, and loan loss reserve ratio indicate the health of the loan portfolio. Deteriorating asset quality can erode profitability and capital rapidly, making these metrics essential risk indicators.\n\nNo single metric tells the full story. Effective bank analysis examines profitability, efficiency, capital, valuation, and asset quality together to build a complete picture of whether a bank stock represents a sound investment at its current price.",
    "relatedMetrics": [
      "roe",
      "roaa",
      "net-interest-margin",
      "efficiency-ratio",
      "equity-to-assets",
      "price-to-book",
      "price-to-earnings"
    ],
    "relatedValuations": [
      "price-to-book-valuation",
      "roe-pb-framework"
    ],
    "relatedFaqs": [
      "how-to-start-researching-bank-stocks",
      "what-is-a-good-roe-for-banks",
      "what-is-a-good-nim-for-banks",
      "what-is-a-good-efficiency-ratio"
    ],
    "relatedGlossaryTerms": [],
    "cta": {
      "type": "screener",
      "target": "/screener",
      "text": "Screen banks by ROE, NIM, efficiency ratio, P/B, and 20+ other metrics"
    },
    "metaTitle": "Most Important Bank Stock Metrics | BankSift",
    "metaDescription": "Learn the most important metrics for evaluating bank stocks across profitability, efficiency, capital strength, valuation, and asset quality."
  },
  {
    "slug": "bank-stocks-vs-fintech-stocks",
    "question": "How do bank stocks differ from fintech stocks?",
    "cluster": "getting-started",
    "clusterName": "Getting Started with Bank Stocks",
    "intentType": "comparative",
    "shortAnswer": "Bank stocks represent regulated, deposit-taking institutions valued on earnings and book value, while fintech stocks are technology companies valued on revenue growth and market opportunity, with fundamentally different risk profiles",
    "fullAnswer": "Bank stocks and fintech stocks both operate in financial services, but they differ in business model, regulation, valuation, and risk profile in ways that affect how investors should analyze them.\n\nBusiness model is the most basic distinction. Traditional banks earn the majority of their revenue from net interest income: the spread between interest earned on loans and interest paid on deposits. They hold regulated charters, accept FDIC-insured deposits, and must meet capital requirements. Fintech companies typically earn revenue from transaction fees, software subscriptions, interchange on payments, or platform fees. Most fintechs do not hold bank charters (though some have obtained them), do not take deposits, and face a different regulatory landscape. Some fintech companies partner with chartered banks to offer banking-like products, creating a hybrid model where the fintech handles the customer interface and the partner bank handles the regulated activities.\n\nValuation approaches differ accordingly. Bank stocks are valued primarily on price-to-book and price-to-earnings ratios, reflecting the tangible asset base and current profitability of the institution. Fintech stocks are more commonly valued on revenue multiples, user growth, and total addressable market estimates, with many fintech companies trading at high multiples of revenue while generating limited or no net income. The metrics used to analyze bank stocks (ROE, ROAA, NIM, efficiency ratio) are generally not applicable to fintechs, and vice versa.\n\nRisk profiles are distinct. Bank risks center on credit losses, interest rate movements, and regulatory actions. Fintech risks center on customer acquisition cost sustainability, competitive moats, regulatory evolution, and the ability to achieve profitability at scale. Banks tend to be more stable and income-producing but slower-growing. Fintechs offer higher growth potential but with greater uncertainty about long-term profitability.\n\nThe two sectors increasingly interact as competitors and partners. Fintechs have pressured banks to improve digital capabilities and customer experience. Banks have responded by investing in technology, acquiring fintechs, or partnering with them. Some investors hold both for diversification across traditional financial stability and technology-driven growth.\n\nFor investors focused on income, valuation discipline, and fundamental analysis of financial intermediaries, traditional bank stocks are the relevant universe. The specialized metrics and tools designed for bank stock analysis do not apply to fintech companies, and blending the two in a single analytical framework leads to poor comparisons.",
    "relatedMetrics": [
      "roe",
      "price-to-book",
      "net-interest-margin"
    ],
    "relatedValuations": [],
    "relatedFaqs": [
      "what-are-bank-stocks",
      "why-invest-in-bank-stocks",
      "traditional-bank-vs-neobank"
    ],
    "relatedGlossaryTerms": [],
    "cta": {
      "type": "learn-metric",
      "target": "/metrics",
      "text": "Explore the bank-specific metrics that differentiate bank stock analysis"
    },
    "metaTitle": "Bank Stocks vs Fintech Stocks | BankSift",
    "metaDescription": "Understand how bank stocks differ from fintech stocks in business model, regulation, valuation methods, and risk profile for informed investment decisions."
  },
  {
    "slug": "what-to-know-before-buying-bank-stocks",
    "question": "What should I know about bank stocks before buying my first one?",
    "cluster": "getting-started",
    "clusterName": "Getting Started with Bank Stocks",
    "intentType": "strategic",
    "shortAnswer": "Before buying a bank stock, understand the core metrics (ROE, NIM, P/B), recognize that credit cycles and interest rates drive bank earnings, and verify the bank has adequate capital and sound asset quality",
    "fullAnswer": "Buying a first bank stock is more accessible than it might appear, but several bank-specific concepts should be understood before committing capital.\n\nFirst, learn the metrics that matter. Bank stock analysis relies on a distinct set of ratios. ROE (return on equity) measures profitability. NIM (net interest margin) measures the bank's lending spread. The efficiency ratio measures cost management. P/B (price-to-book) measures valuation relative to net asset value. EPS (earnings per share) and dividend payout ratio round out the core set. These six metrics provide a working foundation for evaluating any bank stock. General-purpose metrics like EV/EBITDA, free cash flow, and operating margin do not apply to banks.\n\nSecond, understand the credit cycle. Bank earnings are cyclical because loan losses rise during economic downturns and fall during expansions. A bank that looks highly profitable during good times may see its earnings cut in half or more during a recession as the provision for credit losses increases. Evaluating a bank requires considering where the economy stands in the credit cycle and how the bank's loan portfolio would perform under stress. Checking the non-performing loan ratio and net charge-off trends provides a window into current credit quality.\n\nThird, recognize the role of interest rates. Bank profitability is sensitive to the interest rate environment. Rising rates generally benefit banks by widening net interest margins, but only up to a point; rapid rate increases can cause deposit flight and unrealized losses on bond holdings. Falling rates compress margins. An inverted yield curve (where short-term rates exceed long-term rates) is particularly challenging because banks borrow short and lend long. Understanding a bank's interest rate sensitivity provides context for evaluating its near-term earnings trajectory.\n\nFourth, check capital adequacy. A bank's equity-to-assets ratio and regulatory capital ratios indicate how much cushion exists to absorb losses. Banks with stronger capital positions have more flexibility to maintain dividends, pursue growth, and weather downturns. Regulatory minimums set a floor, but well-managed banks typically maintain buffers above those minimums.\n\nFifth, look at the deposit franchise. The quality and stability of a bank's deposit base is a key competitive advantage. Banks with a high proportion of non-interest-bearing and low-cost core deposits have a structural funding advantage that supports wider margins and greater stability.\n\nFinally, do not evaluate a bank in isolation. Compare it to a peer group of similar-sized banks in comparable markets. A bank that looks strong in absolute terms may be merely average relative to its peers, or vice versa.",
    "relatedMetrics": [
      "roe",
      "net-interest-margin",
      "price-to-book",
      "efficiency-ratio",
      "equity-to-assets",
      "dividend-payout-ratio"
    ],
    "relatedValuations": [
      "price-to-book-valuation",
      "peer-comparison-analysis"
    ],
    "relatedFaqs": [
      "how-to-start-researching-bank-stocks",
      "most-important-bank-stock-metrics",
      "how-to-use-bank-stock-screener"
    ],
    "relatedGlossaryTerms": [
      "Provision for Credit Losses",
      "Core Deposits"
    ],
    "cta": {
      "type": "screener",
      "target": "/screener",
      "text": "Start evaluating bank stocks with 25+ screening metrics"
    },
    "metaTitle": "Before Buying Bank Stocks | BankSift",
    "metaDescription": "Essential knowledge before buying your first bank stock: key metrics, credit cycle awareness, interest rate sensitivity, capital adequacy, and peer comparison."
  },
  {
    "slug": "bank-sic-codes",
    "question": "What are SIC codes and which ones apply to banks?",
    "cluster": "getting-started",
    "clusterName": "Getting Started with Bank Stocks",
    "intentType": "definitional",
    "shortAnswer": "SIC (Standard Industrial Classification) codes are four-digit codes that categorize businesses by industry, with banks falling primarily under codes 6020 (state commercial banks), 6021 (national commercial banks), 6022 (state banks, Federal Reserve members), and 6035-6036 (savings institutions)",
    "fullAnswer": "Standard Industrial Classification (SIC) codes are four-digit numerical codes assigned by the US government to categorize businesses by their primary type of activity. The SEC uses SIC codes to classify public companies in its filing system, and they are useful for identifying and filtering bank stocks within the broader universe of publicly traded companies.\n\nThe banking-related SIC codes fall within the 6000 series, which covers depository and non-depository credit institutions, security brokers, and insurance carriers. The codes most relevant to bank stock investors are as follows. Code 6020 covers state commercial banks, which are banks chartered by state banking authorities that are not members of the Federal Reserve System. Code 6021 covers national commercial banks, which are chartered by the OCC and are automatically members of the Federal Reserve System. Code 6022 covers state-chartered banks that are members of the Federal Reserve System. Together, 6020, 6021, and 6022 capture the vast majority of commercial banks.\n\nSavings institutions have their own codes. Code 6035 covers savings institution, federally chartered. Code 6036 covers savings institution, not federally chartered (state-chartered thrifts). These are the codes for banks that originated as savings and loan associations or mutual savings banks.\n\nSeveral related codes may also appear in bank stock research. Code 6710 covers holding offices (bank holding companies that do not have a more specific classification). Code 6712 covers state-chartered banks and bank holding companies. Some bank holding companies are classified under these codes rather than the bank-specific codes because the SEC classifies companies based on the parent entity's primary activity.\n\nSIC codes are useful for screening SEC EDGAR filings to find all banks of a particular charter type. They are also used by financial data providers to group companies into industry categories. However, the SIC system was developed in the 1930s and last revised in 1987, so it does not perfectly capture the complexity of modern financial institutions. The NAICS (North American Industry Classification System) has largely replaced SIC for government statistical purposes, but the SEC continues to use SIC codes in its filing system.\n\nFor practical purposes, investors researching bank stocks can use SIC codes as a starting filter to identify depository institutions within the SEC filing database, then refine by asset size, geography, and financial characteristics using a bank stock screener.",
    "relatedMetrics": [],
    "relatedValuations": [],
    "relatedFaqs": [
      "what-are-bank-stocks",
      "types-of-publicly-traded-banks",
      "what-is-cik-number"
    ],
    "relatedGlossaryTerms": [
      "National Bank",
      "State-Chartered Bank",
      "Thrift / Savings Institution",
      "Bank Holding Company"
    ],
    "cta": {
      "type": "glossary",
      "target": "/glossary",
      "text": "Look up banking industry terms and charter types in the glossary"
    },
    "metaTitle": "Bank SIC Codes Explained | BankSift",
    "metaDescription": "Learn what SIC codes are and which four-digit codes apply to commercial banks, savings institutions, and bank holding companies in SEC filings."
  },
  {
    "slug": "thrift-vs-savings-bank-vs-commercial-bank",
    "question": "What is the difference between a thrift, a savings bank, and a commercial bank?",
    "cluster": "getting-started",
    "clusterName": "Getting Started with Bank Stocks",
    "intentType": "comparative",
    "shortAnswer": "Thrifts and savings banks historically focused on residential mortgage lending and savings deposits, while commercial banks have broader lending and deposit-taking activities, though modern regulatory changes have largely blurred these distinctions",
    "fullAnswer": "Thrifts, savings banks, and commercial banks all accept deposits and make loans, but they evolved from different origins and historically operated under different rules. Understanding these distinctions helps investors interpret the bank stock landscape.\n\nCommercial banks are the most common type of depository institution. They hold either a national charter (from the OCC) or a state charter (from a state banking department) and have broad authority to accept deposits of all types, make commercial and consumer loans, and offer a wide range of financial services. Commercial banking has always encompassed business lending (commercial and industrial loans, commercial real estate) as a core activity alongside consumer lending and deposit gathering.\n\nThrifts, formally known as savings and loan associations (S&Ls) or savings associations, originated in the 19th century to promote homeownership. They were chartered specifically to accept savings deposits and make residential mortgage loans. Historically, thrifts were required to hold a large majority of their assets in residential mortgages and mortgage-related securities (the qualified thrift lender test). They were regulated separately from commercial banks, originally by the Federal Home Loan Bank Board and later by the Office of Thrift Supervision (OTS). The OTS was eliminated in 2011, and thrift regulation was transferred to the OCC (for federal thrifts) and the FDIC and state regulators (for state thrifts).\n\nSavings banks are a related but distinct category. Mutual savings banks originated in the northeastern United States as community-oriented institutions owned by their depositors (mutual ownership) rather than shareholders. They traditionally focused on residential mortgage lending and savings accounts. Many have since converted from mutual to stock ownership and broadened their activities to resemble commercial banks.\n\nIn practice, the distinctions have blurred significantly. Regulatory changes over the past several decades have allowed thrifts to expand into commercial lending and other activities previously reserved for commercial banks. Many former thrifts now operate with business models nearly identical to commercial banks. Some have converted their charters to commercial bank charters. For investment analysis purposes, the key differences to watch for are lending mix (some former thrifts still maintain a heavier concentration in residential mortgages), deposit composition, and charter type (which affects the primary regulator).\n\nWhen evaluating former thrifts and savings banks as investment candidates, the same core metrics apply: ROE, ROAA, NIM, efficiency ratio, and P/B. The main analytical adjustment is awareness of the loan portfolio composition, since a mortgage-heavy portfolio has different yield, duration, and credit risk characteristics than a diversified commercial lending portfolio.",
    "relatedMetrics": [
      "net-interest-margin",
      "loans-to-assets"
    ],
    "relatedValuations": [],
    "relatedFaqs": [
      "types-of-publicly-traded-banks",
      "mutual-vs-stock-bank",
      "what-is-mhc-conversion"
    ],
    "relatedGlossaryTerms": [
      "Thrift / Savings Institution",
      "Community Bank",
      "National Bank",
      "State-Chartered Bank",
      "Mutual Bank",
      "Stock Bank"
    ],
    "cta": {
      "type": "glossary",
      "target": "/glossary",
      "text": "See definitions for thrift, savings institution, and related bank types"
    },
    "metaTitle": "Thrift vs Savings Bank vs Commercial Bank | BankSift",
    "metaDescription": "Understand the differences between thrifts, savings banks, and commercial banks in charter type, lending focus, regulation, and investment analysis."
  },
  {
    "slug": "why-bank-financials-are-different",
    "question": "Why are bank financial statements different from other companies?",
    "cluster": "getting-started",
    "clusterName": "Getting Started with Bank Stocks",
    "intentType": "conceptual",
    "shortAnswer": "Bank financial statements are structured differently because banks are financial intermediaries whose core business is borrowing (deposits) and lending (loans), making debt an operating item rather than a financing choice, and requiring specialized revenue, expense, and balance sheet categories",
    "fullAnswer": "Bank financial statements follow the same accounting standards (US GAAP) as other public companies, but the nature of banking as a business creates a fundamentally different structure that makes standard corporate analysis tools inapplicable.\n\nThe income statement is the most visibly different. For a non-financial company, revenue comes from selling goods or services, cost of goods sold reflects production costs, and operating expenses cover overhead. For a bank, the top of the income statement starts with interest income (earned on loans, securities, and other earning assets) and interest expense (paid on deposits, borrowings, and other funding). The difference, net interest income, is the bank's primary revenue line and has no equivalent in non-financial reporting. Non-interest income (fees, service charges, wealth management revenue) is reported separately. Non-interest expense covers the same general categories as any company (salaries, occupancy, technology) but is measured against total revenue through the efficiency ratio rather than as an operating margin.\n\nThe provision for credit losses is a major income statement item unique to banking. It represents management's estimate of expected future loan losses under the CECL accounting standard. This non-cash charge directly reduces net income and can vary dramatically from quarter to quarter, making bank earnings more volatile than those of most non-financial companies.\n\nThe balance sheet differs because a bank's assets are primarily financial instruments. Loans are the largest asset category, followed by investment securities, cash and equivalents, and other assets. Liabilities are dominated by deposits (the bank's primary funding source), followed by borrowings and other liabilities. The balance sheet of a typical bank is 88-92% liabilities and only 8-12% equity, a leverage ratio that would be alarming for any non-financial company but is normal for banking.\n\nThis structure is why standard metrics do not work for banks. Enterprise value (EV) has no clear meaning when deposits are both a liability and an operating input. EBITDA cannot be calculated because interest is the bank's core operating item, not a financing cost to add back. Free cash flow is difficult to define because lending activity (a core operating function) consumes cash while deposit-taking generates it. Operating margin conflates the interest spread with operating efficiency.\n\nInstead, bank analysis uses metrics specifically designed for financial intermediaries: ROE, ROAA, NIM, efficiency ratio, P/B, and asset quality ratios. These metrics account for the fact that borrowing and lending are the bank's operations rather than financing activities. Learning to read bank financial statements through this lens is the essential first step in bank stock analysis.",
    "relatedMetrics": [
      "net-interest-margin",
      "efficiency-ratio",
      "roe",
      "roaa"
    ],
    "relatedValuations": [],
    "relatedFaqs": [
      "what-are-bank-stocks",
      "how-do-banks-make-money",
      "how-to-read-bank-balance-sheet"
    ],
    "relatedGlossaryTerms": [
      "Net Interest Income",
      "Provision for Credit Losses",
      "Earning Assets",
      "CECL"
    ],
    "cta": {
      "type": "learn-metric",
      "target": "/metrics",
      "text": "Explore the specialized metrics used to analyze bank financial statements"
    },
    "metaTitle": "Why Bank Financials Are Different | BankSift",
    "metaDescription": "Learn why bank financial statements differ from other companies and why standard metrics like EV/EBITDA and free cash flow do not apply to bank analysis."
  },
  {
    "slug": "what-is-a-good-roe-for-banks",
    "question": "What is a good ROE for a bank stock?",
    "cluster": "profitability",
    "clusterName": "Bank Profitability Metrics",
    "intentType": "evaluative",
    "shortAnswer": "Well-managed US banks have historically achieved ROE between 8% and 15%, with the appropriate target depending on the bank's size, business model, capital levels, and position in the credit cycle",
    "fullAnswer": "A \"good\" ROE for a bank stock depends on context, but historical data from the FDIC provides useful benchmarks. US commercial banks have historically averaged ROE in the range of 8-12% over full economic cycles. Banks that consistently deliver ROE above 12% are considered strong performers. Those sustaining 15% or above are exceptional, though that level warrants scrutiny to ensure it reflects genuine operating strength rather than thin capitalization or unsustainable risk-taking.\n\nThe most important framework for evaluating whether a bank's ROE is \"good\" is comparison to the cost of equity. The cost of equity for US bank stocks generally falls in the range of 9-12%, depending on the bank's size, risk profile, and market conditions. A bank that earns ROE above its cost of equity is creating economic value for shareholders and deserves to trade at a price-to-book multiple above 1.0. A bank earning ROE below its cost of equity is destroying value, even if the absolute ROE figure looks reasonable in isolation.\n\nSize matters when setting expectations. Money center banks with diversified revenue streams and active capital management typically target 12-15% ROE. Well-run community banks often achieve 10-13%, though this varies with local economic conditions. Banks that maintain excess capital above regulatory minimums will show mechanically lower ROE because the denominator (equity) is larger than operationally necessary. A bank with 1.10% ROAA and a 12% equity-to-assets ratio produces 9.2% ROE, while the same ROAA at 9% equity-to-assets produces 12.2% ROE. The difference is leverage, not management quality.\n\nThe credit cycle introduces another dimension. ROE across the industry tends to peak during periods of benign credit (low provisions) and trough during downturns (elevated provisions). A bank reporting 14% ROE during a period of abnormally low credit losses may not sustain that level when the cycle turns. Through-the-cycle or mid-cycle ROE is a more reliable measure of underlying earning power than any single period's result.\n\nROE should always be evaluated alongside ROAA and the equity-to-assets ratio. Strong ROAA paired with strong ROE confirms genuine operating profitability amplified by appropriate (not excessive) leverage. Strong ROE paired with weak ROAA suggests the bank is generating returns primarily through high leverage, which introduces fragility. Weak ROE paired with strong ROAA suggests overcapitalization, which may resolve through buybacks, dividends, or growth.\n\nAs a practical screening threshold, many bank stock investors look for ROE above 10% as a starting quality filter, then assess whether the level is sustainable by examining its drivers through the DuPont decomposition.",
    "relatedMetrics": [
      "roe",
      "roaa",
      "equity-to-assets"
    ],
    "relatedValuations": [
      "roe-pb-framework",
      "peer-comparison-analysis"
    ],
    "relatedFaqs": [
      "can-roe-be-too-high",
      "roe-vs-roaa",
      "dupont-decomposition-for-banks"
    ],
    "relatedGlossaryTerms": [
      "Equity Multiplier",
      "DuPont Decomposition"
    ],
    "cta": {
      "type": "screener",
      "target": "/screener",
      "text": "Screen bank stocks by ROE and other profitability metrics"
    },
    "metaTitle": "What Is a Good ROE for a Bank? | BankSift",
    "metaDescription": "Learn what constitutes a good ROE for bank stocks, with benchmarks by bank type, the role of leverage, and how to evaluate ROE through the credit cycle."
  },
  {
    "slug": "why-roe-important-for-banks",
    "question": "Why is ROE more important for banks than for other companies?",
    "cluster": "profitability",
    "clusterName": "Bank Profitability Metrics",
    "intentType": "conceptual",
    "shortAnswer": "ROE is central to bank analysis because it directly determines the justified price-to-book multiple through the ROE-P/B framework, connects profitability to capital generation capacity, and captures the leverage dynamics that define banking",
    "fullAnswer": "ROE holds a unique position in bank stock analysis that it does not occupy in most other industries. Several structural features of banking make ROE the single most important metric connecting profitability to valuation.\n\nThe first reason is the direct link between ROE and valuation. The justified price-to-book formula, P/B = (ROE - g) / (r - g), makes ROE the primary determinant of what a bank's stock should be worth relative to its book value. Because price-to-book is the primary valuation metric for banks (due to the financial instrument nature of bank balance sheets), and ROE is the primary driver of P/B, ROE becomes the fundamental bridge between operating performance and market value. No other industry has such a direct, formulaic connection between a profitability metric and the primary valuation metric.\n\nThe second reason is leverage. Banks operate with equity-to-asset ratios of 8-12%, meaning equity is a scarce and costly resource. How effectively a bank deploys that scarce equity determines its competitive position and long-term viability. A bank earning 12% ROE generates 12 cents of profit per dollar of equity, which it can retain to grow, distribute as dividends, or use to repurchase shares. A bank earning 7% ROE on the same equity base generates far less and may not cover its cost of equity, destroying economic value for shareholders over time.\n\nThe third reason is capital generation. A bank's sustainable growth rate equals ROE multiplied by the retention ratio (the portion of earnings not paid as dividends). This means ROE directly determines how fast a bank can grow its equity base, and therefore its asset base and lending capacity, without raising external capital. A bank with 12% ROE retaining 60% of earnings can grow equity at 7.2% per year. A bank with 8% ROE retaining the same proportion grows at only 4.8%. Over a decade, this compounding difference becomes substantial.\n\nThe fourth reason is regulatory relevance. Bank regulators evaluate capital adequacy partly through the lens of whether the bank generates sufficient returns to maintain and build capital ratios organically. A bank that consistently earns ROE above its cost of equity can maintain adequate capital through retained earnings without relying on external capital raises, giving it strategic independence and flexibility.\n\nFor non-financial companies, other metrics often take precedence: revenue growth for technology, free cash flow yield for industrials, same-store sales for retailers. For banks, ROE is the metric that most directly captures the interplay of profitability, leverage, capital adequacy, and valuation that defines the industry.",
    "relatedMetrics": [
      "roe",
      "price-to-book",
      "equity-to-assets",
      "roaa"
    ],
    "relatedValuations": [
      "roe-pb-framework",
      "price-to-book-valuation"
    ],
    "relatedFaqs": [
      "what-is-a-good-roe-for-banks",
      "roe-vs-roaa",
      "roe-pb-framework-explained"
    ],
    "relatedGlossaryTerms": [
      "Justified P/B Multiple",
      "Sustainable Growth Rate",
      "Retention Ratio"
    ],
    "cta": {
      "type": "learn-metric",
      "target": "/metrics/roe",
      "text": "Learn more about return on equity for bank stocks"
    },
    "metaTitle": "Why ROE Matters Most for Banks | BankSift",
    "metaDescription": "Understand why return on equity is the most important metric for bank stocks, linking profitability to valuation, capital generation, and leverage."
  },
  {
    "slug": "can-roe-be-too-high",
    "question": "Can ROE be too high for a bank? What does that signal?",
    "cluster": "profitability",
    "clusterName": "Bank Profitability Metrics",
    "intentType": "evaluative",
    "shortAnswer": "An unusually high ROE can signal thin capitalization, excessive leverage, unsustainable risk-taking, or one-time earnings items rather than genuine operating excellence",
    "fullAnswer": "While higher ROE is generally preferred, bank ROE that appears unusually elevated relative to peers and historical norms deserves investigation rather than celebration. Several conditions can produce high ROE that is not sustainable or not indicative of sound management.\n\nThin capitalization is the most common explanation. Because ROE equals ROAA multiplied by the equity multiplier (assets divided by equity), a bank can boost ROE simply by operating with less equity. A bank earning 1.00% ROAA with a 7% equity-to-assets ratio produces 14.3% ROE. The same ROAA at a 10% equity-to-assets ratio produces 10.0% ROE. The first bank looks more profitable by ROE, but it has a thinner capital cushion and less room to absorb losses. If the bank's high equity multiplier results from deliberately running capital near regulatory minimums, the elevated ROE reflects higher risk rather than superior management.\n\nUnsustainable earnings can inflate ROE temporarily. During benign credit environments, provisions for credit losses may be abnormally low, flattering net income and ROE. Securities gains from selling appreciated bonds, legal settlement proceeds, tax benefits from one-time adjustments, and gains from branch or subsidiary sales can all boost a single period's ROE above its sustainable level. Checking whether the elevated ROE is driven by pre-provision net revenue (PPNR) or by unusually low provisions and one-time items distinguishes genuine earning power from temporary distortions.\n\nExcessive risk-taking can generate high returns in favorable environments. A bank concentrating its loan portfolio in high-yield but risky asset classes, such as speculative commercial real estate, subprime consumer lending, or highly leveraged commercial loans, may earn wider spreads and higher NIM during good times, translating to elevated ROE. When the credit cycle turns, these same concentrations produce outsized losses. Checking asset quality metrics (NPL ratio, net charge-off ratio, reserve coverage) alongside ROE helps distinguish sound profitability from risk accumulation.\n\nThe practical test is comparing ROE to ROAA and equity-to-assets simultaneously. If ROE is high but ROAA is merely average, leverage is doing the work. If both ROE and ROAA are high but the equity-to-assets ratio is near regulatory minimums, the bank is profitable but potentially fragile. If ROE and ROAA are both strong with a comfortable capital cushion, the bank is likely a genuine high performer.\n\nAs a rough guideline, ROE consistently above 16-18% for a US commercial bank should prompt closer examination. Some banks do sustain these levels through exceptional operating efficiency, unique market positions, or high fee income businesses, but many cases of outlier ROE reflect one or more of the risk factors described above.",
    "relatedMetrics": [
      "roe",
      "roaa",
      "equity-to-assets"
    ],
    "relatedValuations": [
      "roe-pb-framework"
    ],
    "relatedFaqs": [
      "what-is-a-good-roe-for-banks",
      "dupont-decomposition-for-banks",
      "what-is-a-good-equity-to-assets-ratio"
    ],
    "relatedGlossaryTerms": [
      "Equity Multiplier",
      "Pre-Provision Net Revenue"
    ],
    "cta": {
      "type": "learn-metric",
      "target": "/metrics/roe",
      "text": "Learn about ROE and its components for bank stock analysis"
    },
    "metaTitle": "Can Bank ROE Be Too High? | BankSift",
    "metaDescription": "Learn why unusually high ROE at a bank may signal thin capital, unsustainable earnings, or excessive risk-taking rather than superior management."
  },
  {
    "slug": "roe-vs-roaa",
    "question": "What is the difference between ROE and ROAA for banks?",
    "cluster": "profitability",
    "clusterName": "Bank Profitability Metrics",
    "intentType": "comparative",
    "shortAnswer": "ROE measures return on equity and reflects both operating performance and leverage, while ROAA measures return on total assets and isolates operating performance from capital structure",
    "fullAnswer": "ROE and ROAA are the two primary profitability metrics for banks, and they answer different questions. Understanding how they differ and how they connect is essential for accurate bank analysis.\n\nROE (return on equity) equals net income divided by average shareholders' equity. It measures how much profit the bank generates per dollar of equity capital. Because banks are highly leveraged (typically 88-92% of assets funded by non-equity sources), ROE captures the amplifying effect of leverage on shareholder returns. A bank earning a modest return on its asset base can produce an attractive ROE through the leverage inherent in its business model.\n\nROAA (return on average assets) equals net income divided by average total assets. It measures how much profit the bank generates per dollar of total assets, regardless of how those assets are funded. ROAA isolates operating performance from capital structure decisions, making it a purer measure of how effectively the bank converts its asset base into profit.\n\nThe two metrics are connected through the equity multiplier: ROE equals ROAA multiplied by average assets divided by average equity. This relationship (part of the DuPont decomposition) means that any difference between what ROE and ROAA imply about a bank's performance is attributable to leverage. A bank with strong ROAA and strong ROE is generating good returns from its assets and employing appropriate leverage. A bank with weak ROAA but strong ROE is compensating for mediocre asset productivity with high leverage, which introduces fragility. A bank with strong ROAA but weak ROE may be overcapitalized, carrying more equity than its business requires.\n\nConsider two banks. Bank A has ROAA of 1.20% and equity-to-assets of 10%, producing ROE of 12%. Bank B has ROAA of 0.90% and equity-to-assets of 7%, producing ROE of 12.9%. Both show similar ROE, but Bank A is the stronger operator: it earns more per dollar of assets and maintains a thicker capital cushion. Bank B achieves comparable ROE only through higher leverage.\n\nFor peer comparison, ROAA is generally more informative than ROE because it removes the distortion introduced by different capital levels across banks. For valuation analysis, ROE is more directly useful because it drives the justified P/B multiple. Effective bank analysis uses both metrics together, with ROAA revealing operating quality and ROE linking that quality to shareholder value creation.",
    "relatedMetrics": [
      "roe",
      "roaa",
      "equity-to-assets"
    ],
    "relatedValuations": [
      "peer-comparison-analysis",
      "roe-pb-framework"
    ],
    "relatedFaqs": [
      "when-to-use-roe-vs-roaa",
      "what-is-a-good-roe-for-banks",
      "what-is-a-good-roaa-for-banks"
    ],
    "relatedGlossaryTerms": [
      "Equity Multiplier",
      "DuPont Decomposition"
    ],
    "cta": {
      "type": "screener",
      "target": "/screener",
      "text": "Compare banks by both ROE and ROAA in the screener"
    },
    "metaTitle": "ROE vs ROAA for Banks | BankSift",
    "metaDescription": "Understand the difference between ROE and ROAA for banks, how they connect through leverage, and what each reveals about bank profitability."
  },
  {
    "slug": "when-to-use-roe-vs-roaa",
    "question": "When should I use ROE vs ROAA to evaluate a bank?",
    "cluster": "profitability",
    "clusterName": "Bank Profitability Metrics",
    "intentType": "strategic",
    "shortAnswer": "Use ROE for valuation analysis and assessing shareholder returns, and ROAA for comparing operating performance across banks with different capital structures",
    "fullAnswer": "ROE and ROAA serve different analytical purposes, and choosing the right one depends on the question being asked.\n\nUse ROE when the goal is valuation. The justified P/B multiple is derived directly from ROE through the ROE-P/B framework. When determining whether a bank's stock price is fair relative to its book value, ROE is the appropriate input. ROE is also the right metric when evaluating shareholder value creation, because shareholders own the equity and their returns are a function of how productively that equity is employed. Dividend growth capacity (sustainable growth rate = ROE multiplied by the retention ratio) also depends on ROE.\n\nUse ROAA when the goal is comparing operating performance across banks. Because banks maintain different capital levels (some by choice, some by regulatory requirement), ROE comparisons can be misleading. Two banks with identical ROAA but different equity-to-assets ratios will show different ROEs purely because of capital structure, not because one is managed better than the other. ROAA levels the playing field by measuring profit generation per dollar of assets, making it the cleaner metric for peer comparison of operating efficiency.\n\nUse both together when analyzing a specific bank in depth. Start with ROAA to assess the quality of the bank's asset-level returns. Then examine the equity-to-assets ratio to understand leverage. Then look at ROE to see how leverage amplifies (or fails to amplify) those asset returns into equity returns. This three-step sequence, which is the essence of the DuPont decomposition, reveals whether ROE is driven by strong operations, high leverage, or a combination.\n\nThere are specific situations where one metric clearly dominates. When comparing a well-capitalized community bank (12% equity-to-assets) to a leaner regional bank (8% equity-to-assets), ROAA is more informative because it removes the capital structure distortion. When evaluating whether a bank's stock is cheap or expensive relative to peers, ROE is more useful because it feeds directly into P/B valuation. When assessing whether a bank's capital level is appropriate, looking at the gap between what ROAA and ROE imply is the key: if ROAA is strong but ROE is mediocre, the bank may benefit from deploying excess capital through buybacks or growth.\n\nA practical approach for screening is to require minimum thresholds on both: for example, ROE above 9% and ROAA above 0.90%. Banks that pass both filters are generating adequate returns at the asset level and translating those returns into acceptable equity returns without relying on excessive leverage.",
    "relatedMetrics": [
      "roe",
      "roaa",
      "equity-to-assets"
    ],
    "relatedValuations": [
      "roe-pb-framework",
      "peer-comparison-analysis"
    ],
    "relatedFaqs": [
      "roe-vs-roaa",
      "what-is-a-good-roe-for-banks",
      "comparing-profitability-different-size-banks"
    ],
    "relatedGlossaryTerms": [
      "DuPont Decomposition",
      "Equity Multiplier"
    ],
    "cta": {
      "type": "screener",
      "target": "/screener",
      "text": "Filter banks by ROE and ROAA together in the screener"
    },
    "metaTitle": "When to Use ROE vs ROAA for Banks | BankSift",
    "metaDescription": "Learn when to use ROE versus ROAA for bank analysis: ROE for valuation, ROAA for peer comparison, and both together for complete profitability assessment."
  },
  {
    "slug": "what-is-a-good-roaa-for-banks",
    "question": "What is a good ROAA for a bank?",
    "cluster": "profitability",
    "clusterName": "Bank Profitability Metrics",
    "intentType": "evaluative",
    "shortAnswer": "US commercial banks have historically averaged ROAA between 0.90% and 1.30% based on FDIC data, with values above 1.00% generally indicating solid profitability and above 1.30% indicating strong performance",
    "fullAnswer": "ROAA benchmarks are narrower than ROE benchmarks because ROAA removes the leverage variable, compressing the range of outcomes. US commercial banks have historically averaged ROAA between 0.90% and 1.30% over full economic cycles, based on FDIC Quarterly Banking Profile data.\n\nA ROAA above 1.00% is generally considered the threshold for solid profitability. Banks consistently delivering ROAA above 1.20% are strong performers, and those above 1.40% are exceptional. On the weak end, ROAA below 0.75% suggests the bank is struggling to generate adequate returns from its asset base, whether due to compressed margins, poor efficiency, elevated credit costs, or some combination.\n\nThe asset mix heavily influences what ROAA level is achievable. Banks with a higher proportion of loans relative to securities tend to achieve higher ROAA because loans generally carry higher yields than investment securities. A community bank with 75% of assets in commercial and consumer loans is structurally positioned for higher ROAA than a similarly efficient bank with 55% of assets in loans and a large securities portfolio. The tradeoff is that the loan-heavy bank carries more credit risk.\n\nLoan type matters within the loan portfolio. Banks focused on commercial and industrial lending, commercial real estate, or consumer lending typically earn higher yields (and therefore higher ROAA) than those focused on residential mortgages, which carry lower yields but also lower risk weights. A bank's ROAA should be evaluated with an understanding of its risk profile, not just the absolute return level.\n\nThe interest rate environment creates cyclical variation. ROAA tends to be higher during periods of steep yield curves and moderate interest rates, which support wide net interest margins. During periods of compressed margins (flat yield curves, very low rates), even well-managed banks may show ROAA below 1.00%. The FDIC's aggregate data shows that industry-wide ROAA has fluctuated between approximately 0.50% (during severe downturns) and 1.40% (during favorable environments) over recent decades.\n\nFor screening purposes, many investors use a ROAA floor of 0.80-1.00% to identify banks with adequate asset productivity. Within a peer group, relative ROAA ranking is often more informative than the absolute level, since all banks in a given size range and geography face similar rate environments and competitive conditions.",
    "relatedMetrics": [
      "roaa",
      "roe",
      "net-interest-margin",
      "loans-to-assets"
    ],
    "relatedValuations": [
      "peer-comparison-analysis"
    ],
    "relatedFaqs": [
      "roe-vs-roaa",
      "what-is-a-good-roe-for-banks",
      "comparing-profitability-different-size-banks"
    ],
    "relatedGlossaryTerms": [],
    "cta": {
      "type": "screener",
      "target": "/screener",
      "text": "Screen banks by ROAA and related profitability metrics"
    },
    "metaTitle": "What Is a Good ROAA for a Bank? | BankSift",
    "metaDescription": "Learn what constitutes a good ROAA for banks using FDIC benchmarks, how asset mix affects achievable levels, and practical screening thresholds."
  },
  {
    "slug": "what-is-a-good-nim-for-banks",
    "question": "What is a good net interest margin for a bank?",
    "cluster": "profitability",
    "clusterName": "Bank Profitability Metrics",
    "intentType": "evaluative",
    "shortAnswer": "US banks have historically averaged NIM between 3.0% and 3.5% based on FDIC data, with community banks often achieving 3.5-4.5% and large banks running 2.0-3.0% due to differences in asset mix and funding structure",
    "fullAnswer": "Net interest margin varies significantly by bank type, making it essential to benchmark against the right peer group rather than a single universal standard.\n\nUS commercial banks as a whole have historically averaged NIM between 3.0% and 3.5%, based on FDIC aggregate data. This average masks substantial variation. Community banks focused on relationship commercial lending and with strong core deposit franchises often achieve NIMs of 3.50-4.50%. Regional banks typically fall in the 3.00-3.75% range. Large money center banks, whose asset bases include more low-yield trading assets, wholesale lending, and investment securities, commonly report NIMs of 2.00-3.00%.\n\nThese differences reflect structural factors rather than management quality. A community bank in a market with limited competition can price loans at wider spreads and fund them with low-cost local deposits. A money center bank operating in competitive wholesale markets faces narrower lending spreads and more rate-sensitive funding. Comparing NIM across these bank types without accounting for the structural differences produces misleading conclusions.\n\nWithin a peer group of similar-sized banks in comparable markets, NIM differences are more meaningful. A bank with a 3.80% NIM versus a peer averaging 3.30% may have a stronger deposit franchise (more non-interest-bearing deposits), more disciplined loan pricing, a higher-yielding loan mix, or some combination. It may also be taking more credit risk through higher-yield loan categories. Checking asset quality metrics alongside NIM helps distinguish between productive spread management and excessive risk-taking.\n\nThe interest rate environment heavily influences NIM levels across the industry. Steep yield curves (where long-term rates significantly exceed short-term rates) favor wider NIMs because banks typically fund with short-duration deposits and lend at longer durations. Flat or inverted yield curves compress NIM even at well-managed banks. Rapidly rising rate environments create a transitional dynamic: deposit costs may lag initially (boosting NIM) but eventually catch up as competition for deposits intensifies and customers shift to higher-yielding products.\n\nNIM should not be evaluated in isolation. A bank with a high NIM but a poor efficiency ratio may not translate its wide spread into bottom-line profitability. NIM combined with the efficiency ratio determines how much of the interest spread flows to net income. The product of these two factors drives ROAA more than either one alone.",
    "relatedMetrics": [
      "net-interest-margin",
      "efficiency-ratio",
      "roaa",
      "loans-to-deposits"
    ],
    "relatedValuations": [
      "peer-comparison-analysis"
    ],
    "relatedFaqs": [
      "what-causes-nim-to-change",
      "why-nim-varies-across-banks",
      "what-is-a-good-efficiency-ratio"
    ],
    "relatedGlossaryTerms": [
      "Net Interest Spread",
      "Earning Assets",
      "Core Deposits"
    ],
    "cta": {
      "type": "screener",
      "target": "/screener",
      "text": "Compare net interest margins across 300+ banks"
    },
    "metaTitle": "What Is a Good NIM for a Bank? | BankSift",
    "metaDescription": "Learn what constitutes a good net interest margin for banks by type, how the rate environment affects NIM, and how to benchmark against peers."
  },
  {
    "slug": "what-causes-nim-to-change",
    "question": "What causes net interest margin to increase or decrease?",
    "cluster": "profitability",
    "clusterName": "Bank Profitability Metrics",
    "intentType": "conceptual",
    "shortAnswer": "NIM is driven by the interest rate environment and yield curve shape, the bank's asset and liability mix, deposit pricing competition, loan repricing dynamics, and management's asset-liability strategy",
    "fullAnswer": "Net interest margin is determined by the spread between what a bank earns on its assets and what it pays on its liabilities, relative to earning assets. Multiple factors on both sides of the balance sheet influence this spread.\n\nThe interest rate environment and yield curve shape are the most powerful macro drivers. When the yield curve is steep (long-term rates well above short-term rates), banks benefit because they typically fund with short-duration deposits and lend at longer durations, earning a wider spread. When the curve flattens or inverts, this spread compresses. The absolute level of rates also matters: in a very low rate environment, deposit costs hit a floor near zero while asset yields continue to decline, compressing NIM from the asset side.\n\nThe pace and direction of rate changes create transitional effects. When rates rise, different parts of the balance sheet reprice at different speeds. Floating-rate loans reprice quickly, benefiting the asset side. Fixed-rate deposits and CDs reprice only at maturity, keeping liability costs low temporarily. This lag often causes NIM to widen initially during rising rate environments. Over time, as deposits mature and customers demand higher rates, the liability side catches up and the NIM benefit narrows or reverses. Banks with a higher proportion of floating-rate assets are more \"asset-sensitive\" and benefit more from rate increases in the short term.\n\nDeposit mix and competition are critical liability-side factors. Banks with large non-interest-bearing deposit bases (checking accounts used for operating cash management) enjoy a structural NIM advantage because a significant portion of their funding carries zero interest cost. As competition for deposits intensifies, whether from other banks, money market funds, or Treasury bills, banks must raise deposit rates to retain funding, which compresses NIM. The shift of deposits from non-interest-bearing to interest-bearing categories (sometimes called deposit beta) is one of the most closely watched dynamics during rising rate periods.\n\nOn the asset side, loan mix determines the yield profile. Commercial real estate and consumer loans typically carry higher yields than residential mortgages or investment-grade securities. A bank that shifts its asset mix toward higher-yielding loans can expand NIM, though this often comes with higher credit risk. New loan origination rates, prepayment speeds on existing loans, and the reinvestment yield on maturing securities all affect the average yield on earning assets.\n\nManagement decisions around asset-liability duration matching, deposit pricing strategy, and loan growth targets are the controllable levers. Banks can choose to extend or shorten the duration of their securities portfolios, pursue or de-emphasize certain loan categories, and price deposits more or less aggressively, all of which influence NIM trajectory.",
    "relatedMetrics": [
      "net-interest-margin",
      "loans-to-deposits",
      "deposits-to-assets"
    ],
    "relatedValuations": [],
    "relatedFaqs": [
      "what-is-a-good-nim-for-banks",
      "why-nim-varies-across-banks",
      "rising-rates-and-nim"
    ],
    "relatedGlossaryTerms": [
      "Earning Assets",
      "Cost of Funds",
      "Cost of Deposits",
      "Net Interest Spread"
    ],
    "cta": {
      "type": "learn-metric",
      "target": "/metrics/net-interest-margin",
      "text": "Learn more about net interest margin and how it drives bank profitability"
    },
    "metaTitle": "What Causes NIM to Change? | BankSift",
    "metaDescription": "Understand what drives net interest margin higher or lower, from interest rate dynamics and yield curve shape to deposit competition and loan mix."
  },
  {
    "slug": "why-nim-varies-across-banks",
    "question": "Why do some banks have much higher NIMs than others?",
    "cluster": "profitability",
    "clusterName": "Bank Profitability Metrics",
    "intentType": "conceptual",
    "shortAnswer": "NIM differences across banks reflect variation in loan portfolio composition, deposit franchise strength, geographic market competition, bank size, and the tradeoff between yield and credit risk",
    "fullAnswer": "Wide variation in NIM across banks is normal and reflects fundamental differences in business model, market position, and risk appetite.\n\nDeposit franchise quality is often the largest structural driver. Banks with a high proportion of non-interest-bearing deposits (typically business operating accounts and personal checking accounts) have a portion of their funding that costs nothing. A bank funding 30% of its assets with non-interest-bearing deposits has a significant cost advantage over one funding only 10% with non-interest-bearing sources. This advantage flows directly into NIM. Building a strong non-interest-bearing deposit base is a function of customer relationships, branch presence, treasury management services, and market position built over decades, making it a durable competitive advantage.\n\nLoan portfolio composition drives the asset yield side. Banks that focus on higher-yielding loan categories such as small business lending, commercial real estate, specialty finance, or consumer credit earn wider asset spreads. Banks focused on lower-yielding categories like prime residential mortgages, municipal lending, or large corporate credit earn narrower spreads. The tradeoff is risk: higher-yielding loans generally carry higher credit risk. A bank with a 4.50% NIM achieved through subprime consumer lending faces a different risk profile than one with a 3.50% NIM from investment-grade commercial loans.\n\nGeographic market competition matters. Banks in markets with fewer competitors can price loans at wider spreads and pay depositors less, supporting wider NIM. Banks in intensely competitive metropolitan markets face pricing pressure on both sides of the balance sheet. Community banks in less competitive rural or suburban markets often show NIMs 50-100 basis points wider than urban competitors of similar size.\n\nBank size itself creates structural differences. Community banks tend to make smaller, relationship-priced loans that carry wider spreads. Large banks participate in larger, more competitively bid transactions where spreads are thinner. Large banks also hold more low-yield liquid assets (Fed reserves, government securities) to meet regulatory liquidity requirements, dragging down the average yield on earning assets.\n\nWhen comparing NIM across banks, the most productive approach is to compare within a well-constructed peer group of similar size, geography, and business focus. NIM differences within such a group are more likely to reflect operational quality and franchise strength than structural factors.",
    "relatedMetrics": [
      "net-interest-margin",
      "loans-to-deposits",
      "loans-to-assets",
      "deposits-to-assets"
    ],
    "relatedValuations": [
      "peer-comparison-analysis"
    ],
    "relatedFaqs": [
      "what-is-a-good-nim-for-banks",
      "what-causes-nim-to-change",
      "wholesale-funding-vs-core-deposits"
    ],
    "relatedGlossaryTerms": [
      "Core Deposits",
      "Earning Assets",
      "Cost of Deposits"
    ],
    "cta": {
      "type": "screener",
      "target": "/screener",
      "text": "Sort and filter banks by NIM to compare across the industry"
    },
    "metaTitle": "Why Bank NIMs Vary Widely | BankSift",
    "metaDescription": "Understand why net interest margins differ across banks due to deposit franchise strength, loan mix, market competition, bank size, and risk appetite."
  },
  {
    "slug": "comparing-profitability-different-size-banks",
    "question": "How do I compare profitability across banks of different sizes?",
    "cluster": "profitability",
    "clusterName": "Bank Profitability Metrics",
    "intentType": "strategic",
    "shortAnswer": "Use ROAA as the primary comparison metric because it removes leverage and scale differences, supplement with efficiency ratio and NIM analysis, and construct peer groups that account for structural differences between bank size categories",
    "fullAnswer": "Comparing profitability across banks of different sizes requires metrics and methods that account for the structural differences between a $500 million community bank and a $50 billion regional institution.\n\nROAA is the preferred starting point for cross-size comparison. Because ROAA measures net income relative to total assets, it removes the distortion that different capital levels introduce into ROE. A community bank with 11% equity-to-assets and a regional bank with 8% equity-to-assets can be compared fairly on ROAA because both are measured against their full asset bases. If the community bank shows ROAA of 1.25% and the regional bank shows 1.10%, the community bank is extracting more profit per dollar of assets regardless of its higher capital level.\n\nROE comparisons across size categories should be interpreted carefully. Larger banks tend to operate with lower equity-to-assets ratios, partly because diversification across geographies and business lines reduces risk, and partly because sophisticated capital management allows them to optimize leverage. This structural difference means larger banks can produce competitive ROE even with somewhat lower ROAA. Comparing ROE directly without adjusting for capital differences overstates the profitability advantage of more leveraged institutions.\n\nNIM comparisons need size-context adjustments. Community banks structurally earn higher NIMs (often 3.5-4.5%) than large banks (2.0-3.0%) because they make smaller, higher-spread loans and fund with stickier core deposits. A community bank with 3.60% NIM is not outperforming a money center bank with 2.50% NIM; both may be performing well relative to their structural realities. Peer NIM comparisons are most meaningful within the same size category.\n\nThe efficiency ratio requires similar contextual awareness. Larger banks benefit from economies of scale that smaller banks cannot match, giving them structurally lower efficiency ratios. A 55% efficiency ratio at a $100 billion bank is a different achievement than 55% at a $500 million bank, where the latter reflects exceptional cost control given the inherent scale disadvantage.\n\nThe most reliable approach is multi-metric peer group analysis. Construct a peer group of 8-15 banks within a comparable asset size range (e.g., $1-3 billion) and geography. Compare ROAA, ROE, NIM, and efficiency ratio across the peer group. This controls for the structural factors that make cross-size comparisons unreliable and highlights genuine performance differences. Within a well-constructed peer group, the bank that ranks in the top quartile on ROAA, NIM, and efficiency ratio simultaneously is a strong candidate for further analysis.",
    "relatedMetrics": [
      "roaa",
      "roe",
      "net-interest-margin",
      "efficiency-ratio",
      "equity-to-assets"
    ],
    "relatedValuations": [
      "peer-comparison-analysis"
    ],
    "relatedFaqs": [
      "roe-vs-roaa",
      "what-is-a-good-roaa-for-banks",
      "how-to-do-peer-comparison"
    ],
    "relatedGlossaryTerms": [],
    "cta": {
      "type": "screener",
      "target": "/screener",
      "text": "Filter by total assets to build size-appropriate bank comparisons"
    },
    "metaTitle": "Comparing Bank Profitability by Size | BankSift",
    "metaDescription": "Learn how to compare profitability across banks of different sizes using ROAA, NIM context adjustments, and well-constructed peer groups."
  },
  {
    "slug": "dupont-decomposition-for-banks",
    "question": "What is the DuPont decomposition and how does it apply to banks?",
    "cluster": "profitability",
    "clusterName": "Bank Profitability Metrics",
    "intentType": "procedural",
    "shortAnswer": "The DuPont decomposition breaks ROE into ROAA (asset productivity) multiplied by the equity multiplier (leverage), revealing whether a bank's return on equity is driven by genuine operating performance or by thin capitalization",
    "fullAnswer": "The DuPont decomposition is an analytical framework that breaks return on equity into its component drivers, revealing the sources of a bank's profitability. For banks, the most useful form of the decomposition separates ROE into two factors: asset productivity and leverage.\n\nThe core formula is: ROE = ROAA multiplied by the equity multiplier. ROAA (return on average assets) measures how much net income the bank generates per dollar of assets. The equity multiplier (average total assets divided by average equity) measures how much leverage the bank employs. A bank with ROAA of 1.10% and an equity multiplier of 10x (equity-to-assets of 10%) produces ROE of 11.0%. The same ROAA with a 12.5x multiplier (equity-to-assets of 8%) produces ROE of 13.75%.\n\nThis decomposition immediately reveals whether a bank's ROE is driven by strong asset-level returns or by leverage. Two banks may both show 12% ROE, but the one achieving it with 1.20% ROAA and 10x leverage is in a fundamentally stronger position than the one achieving it with 0.90% ROAA and 13.3x leverage. The first bank has more room to absorb losses before equity is impaired.\n\nROAA can be further decomposed into its components to identify specific strengths and weaknesses. Net interest income divided by average assets reveals the contribution of the lending spread. Non-interest income divided by average assets shows the fee income contribution. Non-interest expense divided by average assets measures the cost burden. Provision for credit losses divided by average assets captures the credit cost. Each component can be benchmarked against peers to identify where a bank excels or underperforms.\n\nIn practice, the DuPont decomposition is used in three ways. First, it diagnoses the source of ROE changes over time. If a bank's ROE improved from 10% to 12%, did ROAA improve (better operations) or did the equity multiplier increase (more leverage or lower capital)? Second, it compares banks within a peer group. Ranking peers on ROAA, equity multiplier, and each ROAA sub-component identifies which banks have genuine operating advantages versus those that achieve returns primarily through leverage. Third, it informs valuation: the ROE-P/B framework uses ROE as an input, and understanding whether that ROE is durable (driven by strong ROAA) or fragile (driven by leverage) determines how much confidence to place in the justified P/B multiple.\n\nFor investors evaluating bank stocks, the DuPont decomposition transforms ROE from a single summary number into a diagnostic tool that reveals the quality and sustainability of a bank's returns.",
    "relatedMetrics": [
      "roe",
      "roaa",
      "equity-to-assets",
      "net-interest-margin",
      "efficiency-ratio"
    ],
    "relatedValuations": [
      "roe-pb-framework"
    ],
    "relatedFaqs": [
      "roe-vs-roaa",
      "can-roe-be-too-high",
      "what-is-a-good-roe-for-banks"
    ],
    "relatedGlossaryTerms": [
      "DuPont Decomposition",
      "Equity Multiplier"
    ],
    "cta": {
      "type": "learn-valuation",
      "target": "/valuation/dupont-decomposition",
      "text": "Explore the DuPont decomposition framework for bank analysis"
    },
    "metaTitle": "DuPont Decomposition for Banks | BankSift",
    "metaDescription": "Learn how the DuPont decomposition breaks bank ROE into asset productivity and leverage, revealing the quality and sustainability of returns."
  },
  {
    "slug": "what-is-rotce",
    "question": "What is return on tangible common equity (ROTCE)?",
    "cluster": "profitability",
    "clusterName": "Bank Profitability Metrics",
    "intentType": "definitional",
    "shortAnswer": "ROTCE measures net income as a percentage of tangible common equity (total equity minus goodwill and intangible assets), providing a more conservative profitability view for banks that have accumulated intangible assets through acquisitions",
    "fullAnswer": "Return on tangible common equity (ROTCE) is a variation of ROE that excludes goodwill and intangible assets from the equity denominator. The formula is: ROTCE = net income available to common shareholders divided by average tangible common equity, where tangible common equity equals total shareholders' equity minus goodwill minus other intangible assets minus preferred stock.\n\nROTCE addresses a specific limitation of standard ROE. When a bank acquires another institution, it typically pays a premium above the target's book value. Under accounting rules, this premium is recorded as goodwill (and sometimes other intangible assets such as core deposit intangibles) on the acquirer's balance sheet. Goodwill inflates total equity without adding tangible loss-absorbing capacity. A bank that has grown through multiple acquisitions may carry billions in goodwill, making its stated equity (and therefore ROE) less representative of the return earned on real, tangible capital.\n\nROTCE strips out these intangible items, measuring the return generated on the tangible capital that could actually absorb losses. For banks with significant goodwill, ROTCE will be higher than ROE because the denominator is smaller. For banks with no or minimal goodwill (typically those that have grown organically), ROTCE and ROE will be nearly identical.\n\nLarge banks that have completed numerous acquisitions often report ROTCE as a key performance metric in their earnings releases and investor presentations, precisely because it provides a cleaner view of returns on deployed tangible capital. Analysts covering these banks frequently use ROTCE as the primary profitability measure and link it to price-to-tangible-book valuation (P/TBV = P/E multiplied by ROTCE).\n\nROTCE is most useful in two situations. First, when comparing banks where one has made significant acquisitions and the other has grown organically. Standard ROE comparisons would penalize the acquirer for its goodwill burden, while ROTCE provides a more level comparison of tangible capital productivity. Second, when valuing banks using price-to-tangible-book rather than price-to-book, ROTCE is the appropriate profitability input because the justified P/TBV multiple depends on the return earned on tangible equity, not total equity.\n\nFor community banks with little or no acquisition history and minimal intangible assets, ROTCE adds limited analytical value beyond standard ROE. For banks with goodwill representing more than 5-10% of total equity, ROTCE provides a meaningfully different and often more informative perspective on profitability.",
    "relatedMetrics": [
      "roe",
      "book-value-per-share",
      "price-to-book"
    ],
    "relatedValuations": [
      "roe-pb-framework",
      "peer-comparison-analysis"
    ],
    "relatedFaqs": [
      "tangible-book-value-vs-book-value",
      "what-is-a-good-roe-for-banks",
      "pb-vs-ptbv"
    ],
    "relatedGlossaryTerms": [
      "Return on Tangible Common Equity",
      "Tangible Common Equity",
      "Tangible Book Value"
    ],
    "cta": {
      "type": "learn-metric",
      "target": "/metrics/return-on-tangible-common-equity",
      "text": "Learn more about ROTCE and how it compares to ROE"
    },
    "metaTitle": "What Is ROTCE? Bank Profitability | BankSift",
    "metaDescription": "Learn what return on tangible common equity (ROTCE) is, how it differs from ROE, and when it provides a better measure of bank profitability."
  },
  {
    "slug": "what-is-ppnr",
    "question": "What is pre-provision net revenue (PPNR) and why do analysts use it?",
    "cluster": "profitability",
    "clusterName": "Bank Profitability Metrics",
    "intentType": "definitional",
    "shortAnswer": "PPNR equals net interest income plus non-interest income minus non-interest expense, measuring a bank's core earnings power before the volatile provision for credit losses, making it useful for evaluating sustainable profitability through the credit cycle",
    "fullAnswer": "Pre-provision net revenue (PPNR) is a profitability measure that strips out the provision for credit losses from the income statement, isolating the bank's core operating earnings power. The formula is: PPNR = net interest income + non-interest income - non-interest expense.\n\nThe provision for credit losses is the most volatile line item on a bank's income statement. During benign credit environments, provisions can be minimal, flattering net income. During downturns, provisions can surge and consume a large share of revenue. This volatility makes net income (and therefore ROE and ROAA) a noisy signal of underlying operating strength. PPNR removes this noise by measuring revenue minus operating costs before the credit provision, revealing the bank's ability to generate earnings from its core lending and fee businesses regardless of the credit cycle position.\n\nBank analysts and regulators use PPNR for several important purposes. First, it measures core earnings power. A bank with strong PPNR has a large buffer of operating income available to absorb credit losses when they occur. If PPNR is $100 million and provisions in a normal year are $15 million, the bank has significant capacity to absorb a downturn scenario where provisions might rise to $40-50 million while still remaining profitable. PPNR provides the pre-loss earnings base against which credit costs are measured.\n\nSecond, PPNR is central to bank stress testing. The Federal Reserve's supervisory stress tests for large banks project PPNR under adverse and severely adverse economic scenarios to determine how much loss-absorbing capacity the bank has before credit losses are applied. The ability to generate strong PPNR under stress determines how much capital a bank needs to hold and how much it can distribute to shareholders.\n\nThird, PPNR trend analysis reveals operational momentum. If a bank's PPNR is growing steadily through a combination of NIM expansion, fee income growth, and expense discipline, its core earnings engine is strengthening regardless of where provisions stand in any given quarter. Conversely, declining PPNR indicates weakening core operations even if net income is being supported by low provisions.\n\nPPNR divided by average assets (PPNR/Assets) normalizes the measure for bank size and provides a comparable metric across institutions. This ratio indicates how many cents of pre-provision income the bank generates per dollar of assets, serving as a measure of the balance sheet's inherent earning capacity.\n\nFor investors, PPNR is most useful during periods when the credit cycle is turning. When provisions are rising and net income is declining, PPNR helps distinguish between banks whose core operations remain strong (high PPNR absorbing higher provisions) and those where both core earnings and credit quality are deteriorating simultaneously.",
    "relatedMetrics": [
      "roe",
      "roaa",
      "net-interest-margin",
      "efficiency-ratio"
    ],
    "relatedValuations": [],
    "relatedFaqs": [
      "what-is-a-good-roe-for-banks",
      "what-causes-nim-to-change",
      "what-is-provision-for-credit-losses"
    ],
    "relatedGlossaryTerms": [
      "Pre-Provision Net Revenue",
      "Provision for Credit Losses"
    ],
    "cta": {
      "type": "learn-metric",
      "target": "/metrics/pre-provision-net-revenue",
      "text": "Learn more about PPNR and its role in bank analysis"
    },
    "metaTitle": "What Is PPNR? Pre-Provision Revenue | BankSift",
    "metaDescription": "Learn what pre-provision net revenue (PPNR) is, how it measures core bank earnings power, and why analysts use it to evaluate profitability through credit cycles."
  },
  {
    "slug": "why-pb-primary-bank-valuation",
    "question": "Why is price-to-book (P/B) the primary valuation metric for banks?",
    "cluster": "valuation",
    "clusterName": "How to Value Bank Stocks",
    "intentType": "conceptual",
    "shortAnswer": "P/B is the primary bank valuation metric because bank balance sheets consist mostly of financial instruments carried near fair value, making book value a meaningful approximation of net asset value that has no equivalent in most other industries",
    "fullAnswer": "Price-to-book holds a central role in bank valuation that it does not occupy in most other industries. Several features of banking make this metric uniquely informative.\n\nThe core reason is the nature of bank assets and liabilities. A bank's balance sheet consists primarily of financial instruments: loans, investment securities, cash, deposits, and borrowings. Under accounting standards, most of these items are carried at or near fair value (securities at market value, loans at amortized cost that approximates fair value for performing loans, deposits at face value). This means book value, the accounting measure of equity, is a reasonable proxy for the bank's net asset value. For an industrial company, the balance sheet may include factories, intellectual property, brand value, and other assets whose book values diverge dramatically from economic value, making book value a poor anchor for valuation.\n\nThe second reason is the theoretical link between P/B and profitability. The justified P/B formula, P/B = (ROE - g) / (r - g), creates a direct, formulaic connection between what a bank earns on its equity and what investors should pay for that equity. A bank earning ROE above its cost of equity creates economic value and deserves to trade above book. A bank earning below its cost of equity destroys value and should trade below book. No other industry has such a clean, widely accepted formula connecting a profitability metric to a specific valuation multiple.\n\nThe third reason is regulatory anchoring. Bank regulators evaluate capital adequacy based on book equity (and its risk-weighted variants). Minimum capital requirements, stress test results, and dividend restrictions are all expressed in terms of equity ratios. This regulatory framework reinforces the relevance of book value as a measure of bank financial health and, by extension, P/B as a measure of what the market is paying relative to that regulatory baseline.\n\nThe fourth reason is practical comparability. Because book value has a consistent meaning across banks (unlike revenue or earnings, which can be distorted by provision timing, one-time items, or business mix), P/B provides a stable basis for comparing valuations across institutions. A bank trading at 0.8x book and one at 1.5x book can be compared directly, with the difference largely explained by differences in ROE, asset quality, and growth prospects.\n\nP/B is not without limitations. Held-to-maturity securities carried at amortized cost may contain unrealized losses not reflected in book value. Goodwill from acquisitions inflates book value above tangible net asset value. Understated loan loss reserves mean book value may overstate true economic equity. These limitations are why P/B is best used alongside other methods, particularly the ROE-P/B framework, which adjusts the assessment of fair P/B for profitability differences.",
    "relatedMetrics": [
      "price-to-book",
      "roe",
      "book-value-per-share"
    ],
    "relatedValuations": [
      "price-to-book-valuation",
      "roe-pb-framework"
    ],
    "relatedFaqs": [
      "what-is-a-good-pb-for-banks",
      "pb-below-one-undervalued",
      "why-bank-valuation-is-different"
    ],
    "relatedGlossaryTerms": [
      "Justified P/B Multiple",
      "Tangible Book Value"
    ],
    "cta": {
      "type": "learn-valuation",
      "target": "/valuation/price-to-book-valuation",
      "text": "Learn how to apply price-to-book valuation to bank stocks"
    },
    "metaTitle": "Why P/B Is the Key Bank Valuation Metric | BankSift",
    "metaDescription": "Understand why price-to-book is the primary valuation metric for banks, rooted in balance sheet composition, the ROE-P/B link, and regulatory capital."
  },
  {
    "slug": "what-is-a-good-pb-for-banks",
    "question": "What is a good price-to-book ratio for a bank stock?",
    "cluster": "valuation",
    "clusterName": "How to Value Bank Stocks",
    "intentType": "evaluative",
    "shortAnswer": "A \"good\" P/B depends primarily on the bank's ROE; the justified P/B framework shows that banks earning above their cost of equity deserve multiples above 1.0x, with high-performing banks warranting 1.5-2.5x and average banks trading around 1.0-1.3x",
    "fullAnswer": "There is no single P/B ratio that is universally \"good\" for bank stocks. The appropriate multiple depends on the bank's return on equity, growth prospects, and risk profile. The justified P/B framework provides the analytical foundation for this assessment.\n\nThe justified P/B formula is: P/B = (ROE - g) / (r - g), where ROE is return on equity, g is the sustainable growth rate, and r is the cost of equity. A bank earning 12% ROE with a cost of equity of 10% and a sustainable growth rate of 4% produces a justified P/B of approximately 1.33x. The same cost of equity and growth rate with 15% ROE produces a justified P/B of 1.83x. With 8% ROE (below the cost of equity), the justified P/B drops below 1.0x.\n\nUsing this framework as context, typical P/B ranges by bank quality tier are as follows. High-performing banks with ROE consistently above 13%, strong asset quality, and visible growth prospects have historically traded at 1.5-2.5x book value. Average banks with ROE of 9-12% and moderate growth typically trade at 1.0-1.3x book. Banks with weak ROE (below 8%), asset quality concerns, or strategic uncertainty often trade at 0.7-1.0x book. During periods of systemic banking stress, even healthy banks can temporarily trade below book value due to sector-wide selling pressure.\n\nSeveral factors can cause a bank's P/B to deviate from what ROE alone would justify. Acquisition potential adds a premium: community banks in attractive markets may trade above their ROE-justified P/B because the market prices in a possible takeover at a higher multiple. Asset quality concerns create discounts: if the market expects future credit losses to erode book value, the stock may trade below the current ROE-justified level. Management quality and strategic clarity also matter; a bank with a clear, credible plan for improving ROE from 9% to 12% may trade at a forward-justified multiple rather than a trailing one.\n\nThe composition of book value affects interpretation. If a bank carries significant goodwill from acquisitions, its stated book value includes intangible assets that may not represent loss-absorbing capacity. In these cases, price-to-tangible-book (P/TBV) provides a more conservative assessment. A bank at 1.5x P/B but only 2.0x P/TBV due to large goodwill balances is in a different position than one at 1.5x P/B with minimal intangibles.\n\nFor screening purposes, many value-oriented bank investors look for P/B below 1.0x as a starting filter, then investigate whether the discount reflects a genuine opportunity or a justified concern. The key question is always whether the bank's ROE is likely to exceed its cost of equity over the medium term; if so, trading below book value may represent an attractive entry point.",
    "relatedMetrics": [
      "price-to-book",
      "roe",
      "book-value-per-share"
    ],
    "relatedValuations": [
      "price-to-book-valuation",
      "roe-pb-framework",
      "margin-of-safety"
    ],
    "relatedFaqs": [
      "pb-below-one-undervalued",
      "why-pb-primary-bank-valuation",
      "roe-pb-framework-explained"
    ],
    "relatedGlossaryTerms": [
      "Justified P/B Multiple",
      "Tangible Book Value"
    ],
    "cta": {
      "type": "screener",
      "target": "/screener",
      "text": "Screen bank stocks by P/B ratio and ROE together"
    },
    "metaTitle": "Good P/B Ratio for Bank Stocks | BankSift",
    "metaDescription": "Learn what constitutes a good price-to-book ratio for banks, how ROE determines the justified multiple, and typical P/B ranges by performance tier."
  },
  {
    "slug": "pb-below-one-undervalued",
    "question": "Does a P/B ratio below 1.0 always mean a bank is undervalued?",
    "cluster": "valuation",
    "clusterName": "How to Value Bank Stocks",
    "intentType": "evaluative",
    "shortAnswer": "A P/B below 1.0 does not automatically signal undervaluation; the discount may reflect the market pricing in weak ROE, asset quality problems, unrealized losses, or management concerns that justify a value below stated book",
    "fullAnswer": "A bank trading below book value (P/B under 1.0) means the market values the institution at less than the accounting net asset value on its balance sheet. While this can represent an opportunity, it can also represent the market accurately pricing in risks that are not fully reflected in the reported book value figure.\n\nThe most common legitimate reason for a sub-1.0 P/B is weak profitability. If a bank's ROE is below its cost of equity, the justified P/B formula produces a multiple below 1.0. A bank earning 6% ROE with a 10% cost of equity is destroying economic value for shareholders: each year, the equity generates returns that fail to compensate investors for the risk they bear. The market rationally prices this bank below book value because retaining the earnings within the bank is less valuable than returning them to shareholders.\n\nAsset quality concerns are a second major reason. If the market believes the bank's loan portfolio contains embedded losses that have not yet been recognized through provisions and charge-offs, the true economic book value is lower than the stated accounting figure. A bank with a reported book value of $20 per share but an estimated $3 per share in unrealized loan losses has an economic book value closer to $17. A stock price of $18 would show a P/B of 0.9x on reported book but 1.06x on economic book, meaning the bank is not actually cheap once expected losses are considered.\n\nUnrealized losses on the investment securities portfolio can create a similar dynamic. Held-to-maturity securities are carried at amortized cost regardless of market value. During periods of rising interest rates, these portfolios can contain substantial unrealized losses that reduce economic equity below reported equity. The market may price the stock below stated book value to reflect this gap.\n\nManagement and strategic concerns also drive discounts. A bank with capable management, a clear strategy, and an improving trajectory may trade at or above book even with moderate current ROE. A bank with uncertain leadership, no clear direction, or a history of value-destructive decisions (failed acquisitions, poor lending discipline) may trade below book even if current ROE is adequate.\n\nA sub-1.0 P/B is most likely to represent genuine undervaluation when the bank has a strong capital position, stable or improving asset quality, ROE near or above its cost of equity, and a temporary factor (sector-wide selloff, liquidity discount for a small-cap stock, market overreaction to a one-time event) depressing the price. The analytical task is distinguishing between a temporarily mispriced stock and one that is rationally discounted for fundamental reasons.",
    "relatedMetrics": [
      "price-to-book",
      "roe",
      "equity-to-assets"
    ],
    "relatedValuations": [
      "price-to-book-valuation",
      "roe-pb-framework",
      "margin-of-safety"
    ],
    "relatedFaqs": [
      "what-is-a-good-pb-for-banks",
      "why-pb-primary-bank-valuation",
      "how-to-tell-overvalued-undervalued"
    ],
    "relatedGlossaryTerms": [
      "Justified P/B Multiple",
      "Non-Performing Loan",
      "Allowance for Credit Losses"
    ],
    "cta": {
      "type": "learn-valuation",
      "target": "/valuation/price-to-book-valuation",
      "text": "Learn the P/B valuation framework to assess whether a discount is justified"
    },
    "metaTitle": "P/B Below 1.0: Is It Undervalued? | BankSift",
    "metaDescription": "Learn why a bank trading below book value is not automatically undervalued and the key factors that justify or invalidate a sub-1.0 P/B discount."
  },
  {
    "slug": "pb-vs-ptbv",
    "question": "What is the difference between price-to-book and price-to-tangible-book value?",
    "cluster": "valuation",
    "clusterName": "How to Value Bank Stocks",
    "intentType": "comparative",
    "shortAnswer": "P/B uses total book value including goodwill and intangible assets, while P/TBV strips out intangibles to measure valuation against tangible net asset value, making P/TBV more conservative and more appropriate for banks that have grown through acquisitions",
    "fullAnswer": "Price-to-book (P/B) and price-to-tangible-book value (P/TBV) measure the same concept, the market price relative to equity, but define equity differently. The distinction matters most for banks with significant intangible assets on their balance sheets.\n\nP/B equals share price divided by book value per share (BVPS), where BVPS is total shareholders' equity divided by shares outstanding. Total equity includes all components: common stock, retained earnings, accumulated other comprehensive income (AOCI), and intangible assets such as goodwill, core deposit intangibles, and other identifiable intangibles recorded through acquisitions.\n\nP/TBV equals share price divided by tangible book value per share (TBVPS), where TBVPS is total equity minus goodwill minus other intangible assets, divided by shares outstanding. By stripping out intangible assets, P/TBV measures what the market is paying relative to the tangible, loss-absorbing capital of the bank.\n\nThe difference between the two ratios is driven entirely by intangible assets. A bank with no goodwill or intangibles will show identical P/B and P/TBV. A bank that has completed multiple acquisitions at premiums to book value may carry goodwill equal to 10-30% or more of total equity, causing P/TBV to be substantially higher than P/B for the same stock price. For example, a bank with a share price of $30, BVPS of $25, and TBVPS of $18 shows P/B of 1.2x but P/TBV of 1.67x.\n\nThe argument for using P/TBV is that goodwill is not a tangible resource that can absorb losses. If a bank's loan portfolio deteriorates, the losses come out of tangible equity, not goodwill. From a downside protection perspective, tangible book value is the more conservative measure of the equity cushion. Bank acquirers typically value targets on tangible book multiples because the goodwill from the new acquisition will replace any existing goodwill on the target's books.\n\nThe argument for P/B is simplicity and consistency. For banks that have grown organically with minimal acquisitions, goodwill is negligible and P/B is perfectly adequate. Additionally, ROE (the standard profitability metric) is calculated on total equity including intangibles, so the ROE-P/B framework is internally consistent. Using ROTCE (return on tangible common equity) with P/TBV provides the analogous internally consistent pairing.\n\nIn practice, many analysts check both. If a bank looks attractively valued on P/B but expensive on P/TBV, the goodwill component deserves scrutiny. If both ratios tell the same story, the conclusion is more robust.",
    "relatedMetrics": [
      "price-to-book",
      "book-value-per-share",
      "roe"
    ],
    "relatedValuations": [
      "price-to-book-valuation",
      "roe-pb-framework"
    ],
    "relatedFaqs": [
      "when-to-use-ptbv",
      "tangible-book-value-vs-book-value",
      "what-is-a-good-pb-for-banks"
    ],
    "relatedGlossaryTerms": [
      "Tangible Book Value",
      "Tangible Book Value Per Share",
      "Tangible Common Equity"
    ],
    "cta": {
      "type": "learn-metric",
      "target": "/metrics/price-to-tangible-book-value",
      "text": "Learn more about price-to-tangible-book value for bank analysis"
    },
    "metaTitle": "P/B vs P/TBV for Bank Valuation | BankSift",
    "metaDescription": "Understand the difference between price-to-book and price-to-tangible-book value, when each applies, and why intangible assets matter for bank valuation."
  },
  {
    "slug": "when-to-use-ptbv",
    "question": "When should I use P/TBV instead of P/B to value a bank?",
    "cluster": "valuation",
    "clusterName": "How to Value Bank Stocks",
    "intentType": "strategic",
    "shortAnswer": "Use P/TBV when a bank has significant goodwill from acquisitions, when evaluating a bank as an acquisition target, or when assessing downside risk, since tangible book value represents the true loss-absorbing equity",
    "fullAnswer": "The choice between P/B and P/TBV depends on the analytical question being asked and the specific characteristics of the bank.\n\nUse P/TBV when the bank has significant goodwill on its balance sheet. As a practical threshold, if goodwill and intangible assets represent more than 10% of total equity, P/TBV provides a meaningfully different and more conservative picture than P/B. Banks that have completed multiple acquisitions over many years can accumulate goodwill equal to 20-40% of total equity, making the gap between P/B and P/TBV substantial. In these cases, P/TBV is the more informative measure of what investors are paying relative to the bank's tangible capital base.\n\nUse P/TBV when evaluating a bank as a potential acquisition target. In bank M&A, acquirers typically negotiate price in terms of the tangible book multiple because the acquirer's new goodwill will replace the target's existing goodwill through purchase accounting. Historical bank acquisition premiums are most meaningfully expressed as P/TBV multiples. If comparable transactions have closed at 1.5-1.8x tangible book and a potential target trades at 1.1x tangible book, there is visible acquisition upside. The same analysis using P/B would be muddied by the target's existing goodwill.\n\nUse P/TBV when the focus is downside risk assessment. If a bank faces potential loan losses or other charges, those losses reduce tangible equity. A bank trading at 1.0x tangible book has its tangible equity precisely covered by the market price; any erosion of tangible equity through losses would push the stock below tangible book value. Understanding the tangible book floor provides a clearer picture of downside risk than the total book value, which includes goodwill that does not absorb losses.\n\nContinue using P/B when the bank has minimal intangible assets (most community banks that have grown organically), when using the standard ROE-P/B framework (which pairs ROE on total equity with P/B on total equity), and when comparing banks within a peer group where all members have similar levels of intangible assets. Using P/TBV for an organically grown bank with negligible goodwill adds no analytical value since P/B and P/TBV will be nearly identical.\n\nWhen in doubt, calculate both. If P/B and P/TBV tell the same story (both attractive, both expensive, or both in line with peers), the conclusion is robust regardless of which metric is emphasized. If they diverge, the goodwill component is the source of the difference and should be investigated.",
    "relatedMetrics": [
      "price-to-book",
      "book-value-per-share"
    ],
    "relatedValuations": [
      "price-to-book-valuation",
      "roe-pb-framework"
    ],
    "relatedFaqs": [
      "pb-vs-ptbv",
      "tangible-book-value-vs-book-value",
      "what-is-rotce"
    ],
    "relatedGlossaryTerms": [
      "Tangible Book Value",
      "Tangible Common Equity"
    ],
    "cta": {
      "type": "learn-metric",
      "target": "/metrics/price-to-tangible-book-value",
      "text": "Explore price-to-tangible-book value and how to apply it"
    },
    "metaTitle": "When to Use P/TBV for Banks | BankSift",
    "metaDescription": "Learn when price-to-tangible-book value is more appropriate than P/B for bank valuation, including acquisition analysis and downside risk assessment."
  },
  {
    "slug": "why-not-ev-ebitda-for-banks",
    "question": "Why can't I use EV/EBITDA to value a bank stock?",
    "cluster": "valuation",
    "clusterName": "How to Value Bank Stocks",
    "intentType": "conceptual",
    "shortAnswer": "EV/EBITDA is meaningless for banks because debt (deposits and borrowings) is an operating input rather than a financing choice, interest is core revenue rather than a cost to add back, and enterprise value has no clear definition for financial intermediaries",
    "fullAnswer": "EV/EBITDA is one of the most widely used valuation metrics for non-financial companies, but it fundamentally does not work for banks. The reasons are structural and cannot be resolved through adjustments.\n\nEnterprise value (EV) equals market capitalization plus total debt minus cash. For an industrial company, this makes sense: debt is a financing choice, and EV captures the total value of the business available to all capital providers. For a bank, debt is not a financing choice; it is the business. Deposits are the raw material that banks transform into loans. Borrowings are operating tools for managing the balance sheet. Subtracting cash and adding debt to a bank's market capitalization produces a number with no economic meaning because it conflates the bank's operating liabilities (deposits, which are analogous to a manufacturer's raw material inventory) with financial leverage.\n\nEBITDA (earnings before interest, taxes, depreciation, and amortization) adds back interest expense to approximate operating cash flow. For a non-financial company, this is useful because interest is a financing cost that can be separated from operations. For a bank, interest expense on deposits and borrowings is the core cost of the bank's primary input. Adding it back would be equivalent to adding cost of goods sold back to a manufacturer's income; the resulting figure would not represent operating profit in any meaningful sense. Net interest income (interest earned minus interest paid) is the bank's primary revenue line. Removing the interest expense side of that equation destroys the most important information in the income statement.\n\nDepreciation and amortization are relatively small for banks compared to asset-heavy industries, so the \"DA\" portion of EBITDA adds little analytical value. Core deposit intangible amortization from acquisitions is a real economic cost of maintaining the deposit franchise and should not be ignored.\n\nBecause EV/EBITDA fails for banks, the standard bank valuation toolkit uses different metrics. P/B and P/E are the primary multiples. The ROE-P/B framework provides the theoretical structure. The dividend discount model and Graham Number offer alternative intrinsic value approaches. For comparing bank earnings power, pre-provision net revenue (PPNR) serves the role that EBITDA plays for industrials, measuring core operating income before the most volatile expense item (provisions rather than interest).\n\nWhen encountering financial databases or screeners that display EV/EBITDA for bank stocks, the figures should be ignored. They are artifacts of applying a non-financial template to a financial institution and carry no analytical value.",
    "relatedMetrics": [
      "price-to-book",
      "price-to-earnings"
    ],
    "relatedValuations": [
      "price-to-book-valuation",
      "price-to-earnings-valuation",
      "roe-pb-framework"
    ],
    "relatedFaqs": [
      "why-bank-valuation-is-different",
      "why-pb-primary-bank-valuation",
      "what-is-ppnr"
    ],
    "relatedGlossaryTerms": [
      "Pre-Provision Net Revenue",
      "Net Interest Income"
    ],
    "cta": {
      "type": "learn-valuation",
      "target": "/valuation",
      "text": "Explore valuation methods designed specifically for bank stocks"
    },
    "metaTitle": "Why EV/EBITDA Fails for Banks | BankSift",
    "metaDescription": "Understand why EV/EBITDA cannot be used to value bank stocks and which bank-specific valuation metrics and methods to use instead."
  },
  {
    "slug": "what-is-a-good-pe-for-banks",
    "question": "What is a good P/E ratio for a bank stock?",
    "cluster": "valuation",
    "clusterName": "How to Value Bank Stocks",
    "intentType": "evaluative",
    "shortAnswer": "Bank P/E ratios have historically ranged between 8x and 15x during normal earnings periods, but interpreting P/E requires understanding the credit cycle position, earnings quality, and the relationship between P/E and P/B through ROE",
    "fullAnswer": "Bank P/E ratios during normal earnings periods have historically ranged between 8x and 15x, based on aggregate market data. The appropriate P/E for any individual bank depends on its growth prospects, earnings quality, and where the economy stands in the credit cycle.\n\nHigh-growth banks or those with perceived above-average earnings quality and visibility may command P/E ratios of 13-16x. Banks in stable markets with moderate growth typically trade at 10-13x. Banks with asset quality concerns, uncertain earnings trajectory, or limited growth may trade at 7-10x. Banks with temporarily depressed earnings due to elevated provisions may show very high trailing P/E ratios that overstate their true valuation.\n\nThe credit cycle is the most important context for interpreting bank P/E. During benign credit environments, provisions are low, net income is high, and P/E ratios appear low. A bank at 9x P/E during a period of unusually low credit costs may actually be expensive if earnings are about to normalize downward as provisions increase. During credit downturns, provisions spike, net income falls, and trailing P/E ratios rise or become meaningless for banks near breakeven. A bank at 18x trailing P/E during a downturn may actually be cheap if earnings are about to recover as credit conditions normalize.\n\nThe relationship P/B = P/E multiplied by ROE provides a useful cross-check. If a bank trades at 10x P/E with 12% ROE, its implied P/B is 1.2x. If the same bank trades at 10x P/E with 8% ROE, its implied P/B is only 0.8x. The P/E looks the same in both cases, but the valuation implications are very different. Checking whether P/E and P/B tell a consistent story relative to ROE helps avoid misleading conclusions from either metric alone.\n\nFor screening, many investors use P/E as a secondary filter alongside P/B. A bank that appears attractive on both P/B (e.g., below 1.2x) and P/E (e.g., below 12x) with adequate ROE (above 10%) has cleared multiple valuation hurdles. A bank that looks cheap on P/E but expensive on P/B (or vice versa) warrants further investigation into what is causing the divergence, which is almost always related to the level of ROE or the sustainability of current earnings.",
    "relatedMetrics": [
      "price-to-earnings",
      "earnings-per-share",
      "roe",
      "price-to-book"
    ],
    "relatedValuations": [
      "price-to-earnings-valuation",
      "roe-pb-framework"
    ],
    "relatedFaqs": [
      "what-is-a-good-pb-for-banks",
      "why-not-ev-ebitda-for-banks",
      "how-to-tell-overvalued-undervalued"
    ],
    "relatedGlossaryTerms": [],
    "cta": {
      "type": "screener",
      "target": "/screener",
      "text": "Screen banks by P/E alongside P/B and ROE"
    },
    "metaTitle": "Good P/E Ratio for Bank Stocks | BankSift",
    "metaDescription": "Learn what constitutes a good P/E ratio for bank stocks, how the credit cycle distorts P/E, and how to cross-check P/E with P/B and ROE."
  },
  {
    "slug": "graham-number-for-bank-stocks",
    "question": "What is the Graham Number and how do I calculate it for bank stocks?",
    "cluster": "valuation",
    "clusterName": "How to Value Bank Stocks",
    "intentType": "procedural",
    "shortAnswer": "The Graham Number estimates a maximum fair price using the formula: square root of (22.5 multiplied by EPS multiplied by BVPS), based on Benjamin Graham's criteria that a stock should not trade above 15x earnings or 1.5x book value simultaneously",
    "fullAnswer": "The Graham Number is a valuation formula attributed to Benjamin Graham, the father of value investing, that estimates a conservative maximum fair price for a stock based on both its earnings power and asset backing. It is particularly well-suited to bank stocks because both inputs, earnings per share (EPS) and book value per share (BVPS), are central to bank analysis.\n\nThe formula is: Graham Number = square root of (22.5 multiplied by EPS multiplied by BVPS). The constant 22.5 represents Graham's combined threshold of a maximum P/E of 15 and a maximum P/B of 1.5 (15 multiplied by 1.5 equals 22.5). The logic is that a stock should not be purchased at a price that exceeds both 15 times its earnings and 1.5 times its book value.\n\nTo calculate the Graham Number for a bank stock, two inputs are needed. EPS should be diluted trailing twelve months (TTM) earnings per share, which accounts for stock options and other potentially dilutive securities. BVPS should be total shareholders' equity minus preferred stock, divided by diluted shares outstanding. Both inputs can be found in the bank's most recent SEC filings (10-K annual report or 10-Q quarterly report for TTM calculation).\n\nAs a worked example, consider a bank with TTM diluted EPS of $3.50 and BVPS of $28.00. The Graham Number equals the square root of (22.5 multiplied by 3.50 multiplied by 28.00) = the square root of 2,205 = approximately $46.96. If the stock trades at $38, it trades below the Graham Number, suggesting potential undervaluation by this metric. If it trades at $52, it exceeds the Graham Number.\n\nBank-specific considerations affect the calculation. If EPS includes significant one-time items (securities gains, legal settlements, unusual tax benefits), using adjusted or normalized EPS produces a more reliable result. For banks with large goodwill balances from acquisitions, substituting tangible book value per share (TBVPS) for BVPS yields a more conservative Graham Number that reflects tangible net asset value. If EPS is negative or near zero (as can happen during severe credit downturns), the Graham Number is not calculable and should not be used.\n\nThe Graham Number works best as a screening filter to identify candidates for deeper analysis rather than as a standalone valuation. Banks trading below their Graham Number are worth investigating further using the P/B framework, peer comparison, and fundamental analysis of asset quality and earnings sustainability.",
    "relatedMetrics": [
      "earnings-per-share",
      "book-value-per-share",
      "price-to-book",
      "price-to-earnings"
    ],
    "relatedValuations": [
      "graham-number",
      "margin-of-safety"
    ],
    "relatedFaqs": [
      "how-to-use-graham-number",
      "margin-of-safety-for-bank-stocks",
      "what-is-a-good-pb-for-banks"
    ],
    "relatedGlossaryTerms": [
      "Tangible Book Value Per Share"
    ],
    "cta": {
      "type": "screener",
      "target": "/screener",
      "text": "Screen for banks trading below their Graham Number"
    },
    "metaTitle": "Graham Number for Bank Stocks | BankSift",
    "metaDescription": "Learn how to calculate the Graham Number for bank stocks using EPS and BVPS, with a worked example and bank-specific calculation adjustments."
  },
  {
    "slug": "how-to-use-graham-number",
    "question": "How do I use the Graham Number to find undervalued bank stocks?",
    "cluster": "valuation",
    "clusterName": "How to Value Bank Stocks",
    "intentType": "strategic",
    "shortAnswer": "Use the Graham Number as a screening filter to identify banks trading below the formula's estimated fair value, then verify the result by checking earnings quality, asset quality, and whether the inputs are sustainable",
    "fullAnswer": "The Graham Number is most effective as the first step in a multi-stage value investing process for bank stocks rather than as a standalone signal.\n\nThe basic screening approach is to calculate the Graham Number for each bank and compare it to the current share price. Banks where the share price is below the Graham Number are trading below Graham's conservative fair value estimate. The percentage difference between the Graham Number and the share price represents the margin of safety: a bank with a Graham Number of $50 trading at $38 has a 24% margin of safety by this measure.\n\nAfter identifying candidates, several verification steps are necessary. First, check the quality and sustainability of EPS. If the bank's EPS was boosted by one-time items, abnormally low provisions, or securities gains, the Graham Number overstates fair value. Compare the most recent year's EPS to the 3-5 year average to assess whether current earnings are above or below the bank's normal earning power. If current EPS significantly exceeds the historical average, the Graham Number may be temporarily inflated.\n\nSecond, check the quality of book value. If the bank carries substantial goodwill from acquisitions, BVPS overstates tangible net asset value. Recalculate using TBVPS for a more conservative figure. If the bank has a large held-to-maturity securities portfolio with unrealized losses, reported BVPS may overstate economic book value.\n\nThird, check asset quality and capital adequacy. A bank may trade below its Graham Number for legitimate reasons: deteriorating loan quality, regulatory concerns, or thin capital. Review the non-performing loan ratio, net charge-off trends, reserve coverage ratio, and equity-to-assets ratio before concluding that the discount represents an opportunity.\n\nFourth, compare the Graham Number result to other valuation approaches. If the bank also appears attractive on P/B relative to ROE, trades at a reasonable P/E, and the dividend discount model produces a fair value above the current price, the convergence of multiple methods strengthens the case. If the Graham Number suggests undervaluation but P/B analysis (using the justified P/B framework) suggests fair pricing, investigate why the methods disagree.\n\nA practical screening workflow using the Graham Number: filter for banks where the share price is at least 15-20% below the Graham Number, then layer on quality filters (ROE above 8%, ROAA above 0.80%, efficiency ratio below 70%), and finally perform individual due diligence on the remaining candidates.",
    "relatedMetrics": [
      "earnings-per-share",
      "book-value-per-share",
      "roe",
      "roaa"
    ],
    "relatedValuations": [
      "graham-number",
      "margin-of-safety",
      "price-to-book-valuation"
    ],
    "relatedFaqs": [
      "graham-number-for-bank-stocks",
      "margin-of-safety-for-bank-stocks",
      "filters-for-undervalued-banks"
    ],
    "relatedGlossaryTerms": [],
    "cta": {
      "type": "screener",
      "target": "/screener",
      "text": "Find banks trading below their Graham Number"
    },
    "metaTitle": "Find Undervalued Banks with Graham Number | BankSift",
    "metaDescription": "Learn how to use the Graham Number to screen for undervalued bank stocks, verify results with quality checks, and combine with other valuation methods."
  },
  {
    "slug": "margin-of-safety-for-bank-stocks",
    "question": "What is margin of safety and how do I apply it to bank stocks?",
    "cluster": "valuation",
    "clusterName": "How to Value Bank Stocks",
    "intentType": "procedural",
    "shortAnswer": "Margin of safety is the discount between a stock's market price and its estimated intrinsic value, serving as a buffer against estimation error and unforeseen risks, and it is especially important for banks given the opacity of loan portfolios and credit cycle uncertainty",
    "fullAnswer": "Margin of safety, a concept central to Benjamin Graham's investment philosophy, represents the gap between what an investor pays for a stock and what the investor believes it is worth. The wider the margin, the greater the buffer against errors in the intrinsic value estimate and against unexpected negative developments.\n\nFor bank stocks, margin of safety is calculated relative to any intrinsic value estimate. Using the Graham Number: margin of safety = (Graham Number minus share price) divided by Graham Number. Using the justified P/B: margin of safety = (justified P/B multiplied by BVPS, minus share price) divided by (justified P/B multiplied by BVPS). Using the dividend discount model: margin of safety = (DDM fair value minus share price) divided by DDM fair value. In each case, a positive result indicates the stock trades below estimated fair value.\n\nMargin of safety is particularly important for bank stocks because several features of banking make intrinsic value estimates inherently uncertain. Loan portfolio quality is difficult to assess from outside the bank; non-performing loan ratios and reserves provide signals, but the true extent of embedded credit risk is known only to management and examiners. Interest rate changes can shift a bank's earnings power significantly and unpredictably. Regulatory actions (capital requirements, stress test results, enforcement actions) can affect value in ways that fundamental analysis cannot fully anticipate.\n\nThe appropriate margin of safety varies by the risk profile of the specific bank. For a well-capitalized community bank with a conservative loan portfolio, stable earnings, strong asset quality, and a long operating history, a margin of safety of 15-20% below estimated intrinsic value provides a reasonable buffer. For banks with higher uncertainty (concentrated loan portfolios, rapid growth, pending regulatory issues, limited track record), a wider margin of 25-35% or more is appropriate to compensate for the greater probability of estimation error.\n\nApplying margin of safety in practice means being disciplined about not paying fair value even for high-quality banks. If the justified P/B suggests a bank is worth $30 per share, an investor seeking a 20% margin of safety would only buy at $24 or below. This discipline means missing opportunities in some cases but provides meaningful protection against the inevitable instances where the estimate proves too optimistic.\n\nThe most robust approach is requiring a margin of safety across multiple valuation methods simultaneously. A bank trading at a 20% discount to its Graham Number, a 15% discount to justified P/B, and a 25% discount to DDM fair value offers a stronger case than one showing a discount on only a single method.",
    "relatedMetrics": [
      "price-to-book",
      "earnings-per-share",
      "book-value-per-share"
    ],
    "relatedValuations": [
      "margin-of-safety",
      "graham-number",
      "roe-pb-framework",
      "dividend-discount-model"
    ],
    "relatedFaqs": [
      "graham-number-for-bank-stocks",
      "how-to-tell-overvalued-undervalued",
      "intrinsic-value-for-banks"
    ],
    "relatedGlossaryTerms": [],
    "cta": {
      "type": "screener",
      "target": "/screener",
      "text": "Screen for banks with a margin of safety below estimated fair value"
    },
    "metaTitle": "Margin of Safety for Bank Stocks | BankSift",
    "metaDescription": "Learn what margin of safety means for bank stock investing, how to calculate it using different valuation methods, and what discount to require."
  },
  {
    "slug": "dividend-discount-model-for-banks",
    "question": "How does the dividend discount model work for bank stocks?",
    "cluster": "valuation",
    "clusterName": "How to Value Bank Stocks",
    "intentType": "procedural",
    "shortAnswer": "The DDM values a bank stock as the present value of all expected future dividends, using the current dividend, an estimated growth rate (typically ROE multiplied by the retention ratio), and a discount rate reflecting the cost of equity",
    "fullAnswer": "The dividend discount model (DDM) estimates intrinsic value as the present value of all future dividends the bank is expected to pay. Banks are well-suited to DDM analysis because they are among the most consistent dividend payers in the equity market, and their dividend capacity is directly linked to earnings and capital generation.\n\nThe simplest form is the Gordon Growth Model: fair value = D1 / (r - g), where D1 is next year's expected dividend per share, r is the cost of equity (discount rate), and g is the long-term sustainable dividend growth rate. For banks, the sustainable growth rate is typically estimated as ROE multiplied by the retention ratio (1 minus the dividend payout ratio). A bank with 11% ROE and a 40% payout ratio has a retention ratio of 60% and a sustainable growth rate of 6.6%.\n\nAs a worked example, consider a bank paying $1.20 per share in annual dividends with an expected growth rate of 5% and a cost of equity of 10%. D1 = $1.20 multiplied by 1.05 = $1.26. Fair value = $1.26 / (0.10 - 0.05) = $25.20. If the stock trades at $20, the DDM suggests it is undervalued.\n\nThe inputs require careful estimation. The dividend growth rate should reflect the bank's normalized, through-the-cycle earning power, not a period of unusually high or low profitability. Using mid-cycle ROE rather than trailing ROE produces more reliable growth estimates. The cost of equity is the most subjective input; common approaches include the capital asset pricing model (CAPM), which combines the risk-free rate, equity risk premium, and the bank's beta, or adding a size premium for small-cap banks. For most US bank stocks, cost of equity estimates fall in the 9-12% range.\n\nA two-stage DDM is often more realistic than the Gordon Growth Model. The first stage projects dividends explicitly for 5-10 years using specific growth assumptions, and the second stage applies a terminal value using the Gordon Growth formula for dividends beyond the projection period. This approach accommodates banks that are expected to grow at above-average rates in the near term before settling into a long-term steady state.\n\nBank-specific considerations include the regulatory dimension of dividends. Regulators can restrict dividend payments if capital levels are insufficient, making bank dividends less certain than those of unregulated companies. For large banks subject to Federal Reserve stress testing, dividend capacity is explicitly constrained by the stress capital buffer. Share buybacks are not captured by the DDM, so banks that return significant capital through repurchases rather than dividends may be undervalued by the model.",
    "relatedMetrics": [
      "dividend-payout-ratio",
      "roe",
      "earnings-per-share"
    ],
    "relatedValuations": [
      "dividend-discount-model",
      "roe-pb-framework"
    ],
    "relatedFaqs": [
      "roe-payout-ratio-dividend-growth",
      "sustainable-growth-rate-and-dividends",
      "intrinsic-value-for-banks"
    ],
    "relatedGlossaryTerms": [
      "Gordon Growth Model",
      "Sustainable Growth Rate",
      "Retention Ratio"
    ],
    "cta": {
      "type": "learn-valuation",
      "target": "/valuation/dividend-discount-model",
      "text": "Learn the full dividend discount model methodology for bank valuation"
    },
    "metaTitle": "DDM for Bank Stocks Explained | BankSift",
    "metaDescription": "Learn how the dividend discount model works for bank stocks, with the Gordon Growth formula, a worked example, and bank-specific input considerations."
  },
  {
    "slug": "roe-pb-framework-explained",
    "question": "What is the ROE-P/B valuation framework and how does it work?",
    "cluster": "valuation",
    "clusterName": "How to Value Bank Stocks",
    "intentType": "procedural",
    "shortAnswer": "The ROE-P/B framework derives a bank's justified price-to-book multiple from its return on equity, cost of equity, and sustainable growth rate, providing a fundamentals-based approach to determining whether a bank stock is fairly valued",
    "fullAnswer": "The ROE-P/B framework is the most theoretically grounded approach to bank stock valuation. It answers a specific question: given this bank's profitability, what P/B multiple should the market pay for its stock?\n\nThe formula is: justified P/B = (ROE - g) / (r - g), where ROE is return on equity, g is the sustainable growth rate, and r is the cost of equity. The formula is derived from the Gordon Growth Model applied to book value rather than dividends, which makes it internally consistent with the standard DDM framework.\n\nThe intuition is straightforward. If a bank earns ROE exactly equal to its cost of equity (r), the justified P/B is 1.0: the market should pay exactly book value because the bank is generating returns that precisely compensate shareholders for the risk they bear. If ROE exceeds the cost of equity, the bank is creating economic value and deserves a premium to book. If ROE falls below the cost of equity, the bank is destroying value and should trade at a discount.\n\nTo apply the framework, three inputs are needed. ROE should be a normalized, through-the-cycle estimate rather than a single period's figure. Using a 3-5 year average ROE or adjusting for credit cycle effects produces a more reliable input. The sustainable growth rate (g) equals ROE multiplied by the retention ratio (1 minus the dividend payout ratio). For a bank with 11% normalized ROE and a 35% payout ratio, g = 11% multiplied by 0.65 = 7.15%. The cost of equity (r) requires a judgment about the appropriate discount rate, typically estimated at 9-12% for US bank stocks depending on size and risk.\n\nAs a worked example, a bank with normalized ROE of 12%, cost of equity of 10%, and sustainable growth rate of 5% has a justified P/B of (0.12 - 0.05) / (0.10 - 0.05) = 0.07 / 0.05 = 1.40x. If the bank currently trades at 1.1x book, it appears undervalued relative to the framework's estimate. If it trades at 1.7x, it appears overvalued.\n\nThe framework is most useful for comparing the current P/B to the justified P/B to assess relative value. It is also powerful in peer group analysis: plotting each bank in a peer group on a scatter chart with ROE on the x-axis and P/B on the y-axis reveals which banks trade at premiums or discounts to what their profitability would justify. Banks below the regression line may be undervalued; those above may be overvalued.\n\nLimitations include sensitivity to the cost of equity estimate and the assumption that current ROE is sustainable. Small changes in r produce meaningful changes in justified P/B, so the framework produces a range rather than a precise target.",
    "relatedMetrics": [
      "roe",
      "price-to-book",
      "dividend-payout-ratio"
    ],
    "relatedValuations": [
      "roe-pb-framework",
      "price-to-book-valuation",
      "dividend-discount-model"
    ],
    "relatedFaqs": [
      "how-to-calculate-justified-pb",
      "why-pb-primary-bank-valuation",
      "why-roe-important-for-banks"
    ],
    "relatedGlossaryTerms": [
      "Justified P/B Multiple",
      "Sustainable Growth Rate",
      "Retention Ratio"
    ],
    "cta": {
      "type": "learn-valuation",
      "target": "/valuation/roe-pb-framework",
      "text": "Explore the full ROE-P/B framework methodology"
    },
    "metaTitle": "ROE-P/B Framework Explained | BankSift",
    "metaDescription": "Learn how the ROE-P/B framework derives a justified price-to-book multiple from profitability, with the formula, a worked example, and peer analysis use."
  },
  {
    "slug": "how-to-calculate-justified-pb",
    "question": "How do I determine the justified P/B multiple for a bank stock?",
    "cluster": "valuation",
    "clusterName": "How to Value Bank Stocks",
    "intentType": "procedural",
    "shortAnswer": "The justified P/B equals (ROE minus growth rate) divided by (cost of equity minus growth rate), requiring estimates of normalized ROE, sustainable growth, and the appropriate discount rate for the specific bank",
    "fullAnswer": "Calculating the justified P/B multiple requires three inputs, each of which involves judgment and estimation. Getting the inputs right matters more than the formula itself.\n\nStep one: estimate normalized ROE. Use a 3-5 year average ROE to smooth out credit cycle effects, or adjust the most recent year's ROE for any one-time items and abnormal provision levels. If the bank earned 14% ROE last year but the 5-year average is 11% and provisions were unusually low, 11% is a more appropriate input. If the bank has undergone a meaningful transformation (new management, completed acquisition, exited a business line), the forward outlook may be more relevant than the historical average.\n\nStep two: estimate the sustainable growth rate (g). The standard formula is g = ROE multiplied by the retention ratio, where the retention ratio equals 1 minus the dividend payout ratio. If normalized ROE is 11% and the payout ratio has been stable at 35%, g = 11% multiplied by 0.65 = 7.15%. This represents the rate at which the bank can grow its equity base (and therefore its assets and lending capacity) without raising external capital. If the bank also conducts share buybacks, the effective growth in per-share value may be slightly higher, but the standard formula captures the core growth dynamic.\n\nStep three: estimate the cost of equity (r). This is the most subjective input. A common approach is CAPM: r = risk-free rate + beta multiplied by equity risk premium + size premium (for small-cap banks). With a 4% risk-free rate, a beta of 1.0, a 5.5% equity risk premium, and a 1% size premium for a small community bank, r = 10.5%. For large-cap banks, the size premium may not apply, producing a lower cost of equity. Cost of equity estimates for US bank stocks generally fall between 9% and 12%.\n\nStep four: apply the formula. Justified P/B = (ROE - g) / (r - g). Using the examples above: (0.11 - 0.0715) / (0.105 - 0.0715) = 0.0385 / 0.0335 = 1.15x. This bank's profitability and growth profile justify a P/B multiple of approximately 1.15x.\n\nStep five: compare to the actual P/B. If the bank trades at 0.85x book, there is a meaningful gap between the market price and the framework-derived value, which may represent an opportunity. If it trades at 1.4x, it trades at a premium to the justified level, which may indicate overvaluation or market expectations of ROE improvement.\n\nSensitivity testing is essential. Run the calculation with optimistic and pessimistic assumptions for each input to establish a range rather than a single point estimate. The justified P/B is best viewed as a zone (e.g., 1.0-1.3x) rather than a precise number.",
    "relatedMetrics": [
      "roe",
      "price-to-book",
      "dividend-payout-ratio",
      "equity-to-assets"
    ],
    "relatedValuations": [
      "roe-pb-framework",
      "price-to-book-valuation",
      "margin-of-safety"
    ],
    "relatedFaqs": [
      "roe-pb-framework-explained",
      "what-is-a-good-pb-for-banks",
      "what-is-a-good-roe-for-banks"
    ],
    "relatedGlossaryTerms": [
      "Justified P/B Multiple",
      "Sustainable Growth Rate",
      "Retention Ratio",
      "Equity Multiplier"
    ],
    "cta": {
      "type": "learn-valuation",
      "target": "/valuation/roe-pb-framework",
      "text": "Learn the complete ROE-P/B framework methodology"
    },
    "metaTitle": "Calculate Justified P/B for Banks | BankSift",
    "metaDescription": "Step-by-step guide to calculating the justified price-to-book multiple for a bank stock using normalized ROE, growth rate, and cost of equity estimates."
  },
  {
    "slug": "intrinsic-value-for-banks",
    "question": "What is intrinsic value and how do I estimate it for a bank?",
    "cluster": "valuation",
    "clusterName": "How to Value Bank Stocks",
    "intentType": "procedural",
    "shortAnswer": "Intrinsic value is an estimate of what a bank stock is truly worth based on its fundamentals, and it can be estimated using the justified P/B framework, the Graham Number, or the dividend discount model, ideally using multiple methods for convergence",
    "fullAnswer": "Intrinsic value is the estimated true worth of a bank stock based on its fundamental characteristics: earnings power, asset quality, growth prospects, and capital strength. It represents the price a fully informed, rational buyer would pay for the stock. Because it is an estimate, no single method produces a definitive answer; using multiple approaches and looking for convergence is the most reliable strategy.\n\nThe justified P/B approach estimates intrinsic value by determining the P/B multiple the bank deserves based on its ROE and multiplying that by current book value per share. If the justified P/B is 1.3x and BVPS is $25, intrinsic value is approximately $32.50. This method is strongest when ROE is stable and book value is a reliable measure of net asset value.\n\nThe Graham Number provides a conservative intrinsic value estimate based on both earnings and book value. It caps the acceptable P/E at 15 and P/B at 1.5, producing a ceiling price rather than a best estimate. The Graham Number is useful as a screening threshold: stocks trading below it may be undervalued by Graham's conservative standards.\n\nThe dividend discount model estimates intrinsic value as the present value of all expected future dividends. It is best suited for banks with consistent dividend histories and predictable payout ratios. The DDM captures the time value of money and long-term growth dynamics but is sensitive to the growth rate and discount rate assumptions.\n\nThe peer comparison approach estimates relative value rather than absolute intrinsic value. If comparable banks trade at 1.2x book on average and the target bank trades at 0.9x book with similar or better fundamentals, the discount suggests potential undervaluation relative to peers. This method does not establish intrinsic value independently but provides a market-based reality check on other estimates.\n\nA practical framework for estimating intrinsic value for a bank combines these approaches. Calculate the justified P/B fair value, the Graham Number, and the DDM fair value. If all three suggest the stock is worth $28-$33 and it trades at $22, the convergence across methods provides confidence in the undervaluation thesis. If the methods produce widely divergent results ($20 from Graham Number, $35 from DDM, $28 from justified P/B), investigate what assumptions are driving the differences and which method is most reliable for that specific bank.\n\nIntrinsic value is always an estimate with a confidence interval, not a precise number. Requiring a margin of safety, buying only when the market price is meaningfully below the estimated intrinsic value range, accounts for this inherent uncertainty.",
    "relatedMetrics": [
      "price-to-book",
      "roe",
      "earnings-per-share",
      "book-value-per-share",
      "dividend-payout-ratio"
    ],
    "relatedValuations": [
      "roe-pb-framework",
      "graham-number",
      "dividend-discount-model",
      "margin-of-safety"
    ],
    "relatedFaqs": [
      "how-to-calculate-justified-pb",
      "graham-number-for-bank-stocks",
      "dividend-discount-model-for-banks"
    ],
    "relatedGlossaryTerms": [
      "Justified P/B Multiple",
      "Gordon Growth Model"
    ],
    "cta": {
      "type": "learn-valuation",
      "target": "/valuation",
      "text": "Explore all bank valuation methods available on BankSift"
    },
    "metaTitle": "Estimating Intrinsic Value for Banks | BankSift",
    "metaDescription": "Learn how to estimate the intrinsic value of a bank stock using the justified P/B, Graham Number, and DDM, with guidance on combining multiple methods."
  },
  {
    "slug": "how-to-do-peer-comparison",
    "question": "How do I do a peer comparison for bank stocks?",
    "cluster": "valuation",
    "clusterName": "How to Value Bank Stocks",
    "intentType": "procedural",
    "shortAnswer": "Effective peer comparison starts with selecting 8-15 banks of similar size, geography, and business mix, then systematically comparing profitability, efficiency, capital, asset quality, and valuation metrics across the group",
    "fullAnswer": "Peer comparison is one of the most practical and widely used approaches to bank stock valuation. A well-executed peer analysis reveals whether a bank is attractively valued relative to comparable institutions and highlights its competitive strengths and weaknesses.\n\nConstructing the peer group is the critical first step. Select 8-15 banks that share key characteristics with the target bank: similar total asset size (within a factor of 2-3x), overlapping or comparable geographic markets, similar business mix (commercial lending-focused, mortgage-focused, diversified), and similar charter type. A $1.5 billion community bank in suburban Ohio should be compared to other community banks of $800 million to $3 billion in the Midwest, not to a $50 billion super-regional in the Southeast or a $500 million agricultural lender in Nebraska.\n\nCompare across multiple dimensions rather than relying on a single metric. The core comparison framework covers five areas. Profitability: compare ROE, ROAA, and NIM across the group. Efficiency: compare the efficiency ratio. Capital: compare equity-to-assets ratio. Asset quality: compare NPL ratio, net charge-off ratio, and reserve coverage ratio if available. Valuation: compare P/B, P/E, and dividend yield.\n\nRank the target bank within the peer group on each metric. A bank that ranks in the top quartile on profitability and efficiency but appears average on valuation metrics may be an underappreciated performer. A bank that ranks poorly on profitability and efficiency but trades at a premium valuation may be overvalued or priced for improvement the market expects but that has not yet materialized.\n\nThe ROE-P/B scatter plot is the most powerful peer comparison tool. Plot each peer with ROE on the horizontal axis and P/B on the vertical axis. If the relationship is roughly linear (higher ROE corresponds to higher P/B), banks below the trend line are potentially undervalued relative to their profitability, and banks above it may be overvalued. The target bank's position on this plot immediately reveals whether the market is paying an appropriate price for its profitability level.\n\nLook for outliers and investigate the reasons. If one bank trades at a significant discount to peers on multiple metrics, determine whether there is a fundamental reason (asset quality concerns, management issues, pending litigation) or an unjustified inefficiency that represents an investment opportunity.\n\nUpdate the peer comparison periodically, as bank financials change quarterly and peer valuations shift with market conditions. A bank that was expensive relative to peers six months ago may have become attractive if its price declined while fundamentals held steady.",
    "relatedMetrics": [
      "roe",
      "roaa",
      "net-interest-margin",
      "efficiency-ratio",
      "price-to-book",
      "price-to-earnings"
    ],
    "relatedValuations": [
      "peer-comparison-analysis",
      "roe-pb-framework"
    ],
    "relatedFaqs": [
      "how-to-compare-bank-stocks",
      "comparing-profitability-different-size-banks",
      "what-is-a-good-pb-for-banks"
    ],
    "relatedGlossaryTerms": [],
    "cta": {
      "type": "screener",
      "target": "/screener",
      "text": "Build peer comparisons using 25+ metrics in the bank stock screener"
    },
    "metaTitle": "How to Do a Bank Peer Comparison | BankSift",
    "metaDescription": "Step-by-step guide to peer comparison for bank stocks: constructing the peer group, comparing across five dimensions, and using the ROE-P/B scatter plot."
  },
  {
    "slug": "why-bank-valuation-is-different",
    "question": "What makes bank valuation different from valuing other companies?",
    "cluster": "valuation",
    "clusterName": "How to Value Bank Stocks",
    "intentType": "conceptual",
    "shortAnswer": "Bank valuation differs because debt is an operating input (not a financing choice), book value closely approximates net asset value, standard metrics like EV/EBITDA and free cash flow do not apply, and regulatory capital constraints directly affect value",
    "fullAnswer": "Bank valuation requires a fundamentally different toolkit than the methods used for industrial, technology, or consumer companies. Four structural features of banking drive this divergence.\n\nFirst, debt is an operating input. For most companies, debt is a financing decision: the company chooses how much to borrow versus how much equity to use. For banks, deposits and borrowings are the raw material of the business. A bank cannot operate without liabilities any more than a manufacturer can operate without inventory. This means enterprise value (market cap plus debt minus cash) has no clear meaning for banks, and EV-based multiples like EV/EBITDA and EV/Revenue cannot be applied. Bank valuation focuses on equity value (market capitalization) and equity-based multiples (P/B, P/E).\n\nSecond, book value is economically meaningful. Bank balance sheets consist primarily of financial instruments (loans, securities, deposits) carried at or near fair value. This makes book value per share a reasonable proxy for the per-share net asset value of the institution. For a software company, book value may be a fraction of economic value because intellectual property, network effects, and brand value are not on the balance sheet. For a bank, the gap between book value and economic value is smaller and more predictable, making P/B the natural primary valuation metric.\n\nThird, standard profitability and cash flow metrics do not translate. Interest expense is not a financing cost to be added back; it is the core cost of the bank's primary input. Operating cash flow is difficult to define because lending (a core operating activity) consumes cash while deposit-taking generates it. Free cash flow as conventionally calculated has no stable meaning for banks. Instead, bank analysts use ROE, ROAA, NIM, and the efficiency ratio to measure profitability, and pre-provision net revenue (PPNR) to approximate core operating earnings.\n\nFourth, regulatory capital directly constrains value. Bank regulators set minimum capital ratios that limit how aggressively a bank can deploy its equity. Stress testing for large banks determines how much capital can be returned to shareholders through dividends and buybacks. These constraints mean that a bank's growth rate, payout capacity, and valuation are all partially determined by regulatory decisions rather than solely by market forces.\n\nThese features combine to create a valuation ecosystem built around P/B, P/E, the ROE-P/B justified multiple framework, the dividend discount model, and peer comparison. Investors who try to apply non-financial valuation methods to banks will reach incorrect conclusions. Learning the bank-specific toolkit is a prerequisite for effective bank stock analysis.",
    "relatedMetrics": [
      "price-to-book",
      "roe",
      "net-interest-margin"
    ],
    "relatedValuations": [
      "price-to-book-valuation",
      "roe-pb-framework",
      "peer-comparison-analysis"
    ],
    "relatedFaqs": [
      "why-pb-primary-bank-valuation",
      "why-not-ev-ebitda-for-banks",
      "why-bank-financials-are-different"
    ],
    "relatedGlossaryTerms": [
      "Pre-Provision Net Revenue"
    ],
    "cta": {
      "type": "learn-valuation",
      "target": "/valuation",
      "text": "Explore bank-specific valuation methods"
    },
    "metaTitle": "Why Bank Valuation Is Different | BankSift",
    "metaDescription": "Understand why banks require different valuation methods than other companies, from the role of debt as an operating input to the centrality of book value."
  },
  {
    "slug": "how-to-tell-overvalued-undervalued",
    "question": "How do I tell if a bank stock is overvalued or undervalued?",
    "cluster": "valuation",
    "clusterName": "How to Value Bank Stocks",
    "intentType": "strategic",
    "shortAnswer": "Assess valuation by comparing the bank's P/B to its justified P/B (from the ROE-P/B framework), checking P/E relative to normalized earnings, calculating the Graham Number, running a DDM, and benchmarking against a peer group, then requiring convergence across multiple methods",
    "fullAnswer": "Determining whether a bank stock is overvalued or undervalued requires a multi-method approach. Relying on any single metric or method in isolation is unreliable given the complexity of bank balance sheets and the cyclicality of bank earnings.\n\nStart with the ROE-P/B framework. Calculate the justified P/B multiple using normalized ROE, sustainable growth rate, and estimated cost of equity. Compare the justified P/B to the actual P/B. If the bank trades at 0.9x book but the framework suggests 1.3x is justified, there is a meaningful valuation gap that may represent undervaluation. If it trades at 1.5x but the justified P/B is 1.1x, the stock may be overvalued. This is the most theoretically grounded assessment for banks.\n\nCheck P/E in context. Compare the trailing P/E to the bank's historical average, its peer group average, and the level implied by its ROE (using P/E = P/B divided by ROE). If all three comparisons suggest the P/E is below normal, the stock may be cheap. If P/E appears low but provisions are abnormally low (flattering earnings), the low P/E may be deceptive.\n\nCalculate the Graham Number and compare it to the share price. If the stock trades below the Graham Number with stable, high-quality earnings and a reliable book value, the Graham metric supports the undervaluation case.\n\nRun a dividend discount model. If the DDM fair value exceeds the current share price by a meaningful margin and the growth and discount rate assumptions are reasonable, the income-based valuation confirms the other methods.\n\nBenchmark against peers. If the bank trades at a discount to its peer group on P/B, P/E, and dividend yield while showing comparable or better profitability, efficiency, and asset quality, the relative discount may represent mispricing. If the discount exists because the bank has weaker fundamentals than peers, the lower valuation is justified rather than representing an opportunity.\n\nThe key principle is convergence. A bank is most likely undervalued when multiple independent methods, each based on different assumptions, all point to the same conclusion. If the justified P/B suggests undervaluation, the Graham Number confirms it, the DDM agrees, and the stock trades at a discount to fundamentally similar peers, the case is strong. If one method suggests undervaluation but others disagree, investigate the source of the discrepancy before acting.\n\nEqually important is identifying why the discount exists. If the market is rationally pricing in asset quality problems, regulatory risk, or declining earnings power, the stock may be fairly valued despite appearing cheap on backward-looking metrics. The most rewarding bank stock investments come from identifying situations where the market's concerns are overblown or where a catalyst for improvement exists that the market has not yet recognized.",
    "relatedMetrics": [
      "price-to-book",
      "price-to-earnings",
      "roe",
      "earnings-per-share"
    ],
    "relatedValuations": [
      "roe-pb-framework",
      "graham-number",
      "dividend-discount-model",
      "margin-of-safety",
      "peer-comparison-analysis"
    ],
    "relatedFaqs": [
      "what-is-a-good-pb-for-banks",
      "pb-below-one-undervalued",
      "margin-of-safety-for-bank-stocks",
      "how-to-do-peer-comparison"
    ],
    "relatedGlossaryTerms": [
      "Justified P/B Multiple"
    ],
    "cta": {
      "type": "screener",
      "target": "/screener",
      "text": "Screen for potentially undervalued bank stocks using multiple metrics"
    },
    "metaTitle": "Is a Bank Stock Over or Undervalued? | BankSift",
    "metaDescription": "Learn a multi-method approach to determine if a bank stock is overvalued or undervalued using justified P/B, Graham Number, DDM, and peer comparison."
  },
  {
    "slug": "how-to-use-bank-stock-screener",
    "question": "How do I use a bank stock screener effectively?",
    "cluster": "screening",
    "clusterName": "Screening and Analysis Strategies",
    "intentType": "procedural",
    "shortAnswer": "Start by defining your investment objective, select 2-4 metrics that align with that objective, set reasonable filter ranges based on industry norms, then sort and narrow from there",
    "fullAnswer": "Effective bank stock screening starts with a clear investment objective. Screening without a thesis produces noise rather than signal. Before setting any filters, decide whether the goal is finding undervalued banks, high-quality compounders, dividend income generators, or turnaround candidates. Each objective calls for a different combination of metrics and filter ranges.\n\nThe first step is selecting the right metrics for the objective. A value screen might emphasize P/B, P/E, and Graham Number. A quality screen might prioritize ROE, ROAA, and Efficiency Ratio. A dividend screen focuses on Dividend Payout Ratio alongside profitability metrics that indicate sustainability. Resist the urge to add too many filters at once. Two to four primary metrics produce more useful results than eight or ten filters that may exclude every bank in the dataset.\n\nThe second step is setting filter ranges that reflect realistic expectations for banks. Bank profitability metrics cluster within narrower ranges than those of technology or industrial companies. An ROE filter set above 20% would exclude virtually every bank, while a filter below 5% captures banks with serious problems. Understanding typical ranges for each metric prevents setting filters that are either too loose (producing hundreds of results) or too restrictive (producing none). BankSift's metric pages provide historical ranges sourced from FDIC data for each available metric.\n\nThe third step is sorting results by the metric most central to the thesis. If searching for value, sort by P/B ascending to see the cheapest banks first. If searching for quality, sort by ROE descending. Sorting reveals the distribution of values and helps identify where the strongest candidates cluster.\n\nThe fourth step is applying secondary filters to narrow the initial list. After sorting by the primary metric, add one or two secondary filters to remove banks that score well on the primary metric for the wrong reasons. A bank trading at a very low P/B might have serious asset quality problems; adding a minimum ROE filter helps screen those out.\n\nThe fifth step, and the most important, is recognizing that screening is the starting point of analysis, not the conclusion. A screener identifies candidates worth investigating further. Every result should be evaluated by reviewing the bank's actual financial filings, understanding its business model and market, and assessing factors that no screener can capture, such as management quality, competitive position, and local economic conditions.\n\nBankSift's Screener Guide walks through three complete screening strategies with specific filter settings. Reading through those examples before building a custom screen provides a practical foundation.",
    "relatedMetrics": [
      "roe",
      "roaa",
      "price-to-book",
      "price-to-earnings",
      "efficiency-ratio",
      "dividend-payout-ratio"
    ],
    "relatedValuations": [
      "graham-number",
      "price-to-book-valuation",
      "peer-comparison-analysis"
    ],
    "relatedFaqs": [
      "filters-for-undervalued-banks",
      "filters-for-high-quality-banks",
      "combining-metrics-to-find-best-banks"
    ],
    "relatedGlossaryTerms": [],
    "cta": {
      "type": "screener",
      "target": "/screener",
      "text": "Screen 300+ bank stocks by 25+ metrics"
    },
    "metaTitle": "How to Use a Bank Stock Screener Effectively | BankSift",
    "metaDescription": "Learn a five-step process for effective bank stock screening: define your objective, select metrics, set ranges, sort results, and investigate candidates."
  },
  {
    "slug": "filters-for-undervalued-banks",
    "question": "What filters should I set to find undervalued bank stocks?",
    "cluster": "screening",
    "clusterName": "Screening and Analysis Strategies",
    "intentType": "strategic",
    "shortAnswer": "Focus on P/B below 1.0-1.2x combined with profitability floors (ROE above 7-8%, ROAA above 0.70%) to find banks that are cheap relative to their earning power",
    "fullAnswer": "Screening for undervalued bank stocks requires balancing price metrics against quality metrics. A bank trading at a low P/B or P/E is not undervalued if its fundamentals justify the discount. The goal is identifying banks where the market price appears to understate the bank's earning power, asset quality, or franchise value.\n\nThe primary valuation filter for banks is Price to Book (P/B). Banks trading below 1.0x book value are priced below the accounting value of their net assets. Banks in the 1.0x to 1.2x range may also be undervalued if their profitability supports a higher multiple. The ROE-P/B framework provides the theoretical foundation: a bank earning its cost of equity should trade near 1.0x book, and banks earning above their cost of equity should trade at a premium.\n\nTo avoid value traps, pair the P/B filter with profitability floors. Setting ROE above 7% or 8% and ROAA above 0.70% ensures the screen captures banks that are generating reasonable returns despite their low valuation. A bank with a P/B of 0.7x and ROE of 3% is cheap for a reason. A bank with a P/B of 0.7x and ROE of 10% may represent a genuine opportunity.\n\nP/E ratio provides a complementary valuation lens. Bank P/E ratios typically range from 8x to 15x. Screening for P/E below 10x or 11x, combined with the P/B and profitability filters, narrows the list to banks that appear inexpensive on both an asset basis and an earnings basis.\n\nThe Graham Number offers another approach. It estimates a maximum fair price based on EPS and BVPS. Banks whose current share price falls below their Graham Number may warrant further investigation. The Margin of Safety metric extends this by showing the percentage discount to the Graham Number.\n\nA practical starting filter combination for an undervalued bank screen might use P/B below 1.2x, ROE above 7%, ROAA above 0.70%, and P/E below 12x. Sort results by P/B ascending to see the most discounted banks first, then review each candidate's financial profile for signs that the discount is unwarranted (strong and stable earnings, clean asset quality, adequate capital) or justified (deteriorating credit, shrinking margins, management concerns).\n\nNo screen replaces the need to read financial filings and understand why a bank is trading at a discount. Some discounts reflect temporary market dislocations or overlooked small banks. Others reflect genuine problems that the market has correctly identified.",
    "relatedMetrics": [
      "price-to-book",
      "price-to-earnings",
      "roe",
      "roaa",
      "earnings-per-share",
      "book-value-per-share"
    ],
    "relatedValuations": [
      "graham-number",
      "margin-of-safety",
      "price-to-book-valuation",
      "roe-pb-framework"
    ],
    "relatedFaqs": [
      "what-is-a-good-pb-for-banks",
      "pb-below-one-undervalued",
      "value-investing-bank-screen",
      "how-to-tell-overvalued-undervalued"
    ],
    "relatedGlossaryTerms": [
      "Justified P/B Multiple"
    ],
    "cta": {
      "type": "screener",
      "target": "/screener",
      "text": "Screen for undervalued bank stocks by P/B, ROE, and more"
    },
    "metaTitle": "Filters for Finding Undervalued Bank Stocks | BankSift",
    "metaDescription": "Learn which screener filters to set for finding undervalued bank stocks, combining P/B, P/E, ROE, and Graham Number to identify genuine value."
  },
  {
    "slug": "filters-for-high-quality-banks",
    "question": "What filters should I set to find high-quality bank stocks?",
    "cluster": "screening",
    "clusterName": "Screening and Analysis Strategies",
    "intentType": "strategic",
    "shortAnswer": "Screen for above-average profitability (ROE above 10-12%, ROAA above 1.0%), strong efficiency (Efficiency Ratio below 60%), and conservative capital levels (Equity to Assets above 8%)",
    "fullAnswer": "A high-quality bank screen prioritizes operational excellence over valuation. The goal is identifying banks that consistently generate strong returns, operate efficiently, and maintain sound capital positions, regardless of whether they are trading at a discount.\n\nProfitability is the primary quality signal. ROE above 10% indicates a bank earning well above its cost of equity, which the Federal Reserve has historically estimated in the 8% to 10% range for most banks. Setting ROE above 10% to 12% filters for top-quartile profitability. ROAA above 1.0% indicates the bank is generating strong returns on its asset base independent of leverage. Using both metrics together ensures the screen captures banks that are profitable because of good operations, not simply because of aggressive leverage.\n\nEfficiency separates well-run banks from those burning too much of their revenue on overhead. An Efficiency Ratio below 60% indicates the bank spends less than 60 cents to generate each dollar of revenue. The best-run banks in the country operate below 55%. Setting the filter at 55% to 60% captures efficiently managed institutions while excluding banks with structural cost problems.\n\nCapital adequacy matters for quality assessment because it indicates the bank can absorb losses and continue operating through stress periods. Equity to Assets above 8% provides a simple capital floor. Banks below this level are not necessarily in trouble, but higher capital ratios offer a larger margin of safety and often correlate with more conservative management.\n\nNIM can serve as an additional quality filter when screening for banks with strong core banking franchises. NIM above 3.0% to 3.5% suggests the bank has pricing power in its lending markets and a favorable deposit mix. However, very high NIM values (above 5%) may indicate the bank is taking on higher credit risk to earn larger spreads, so this filter should be interpreted in context.\n\nA practical starting combination for a quality screen might use ROE above 10%, ROAA above 1.0%, Efficiency Ratio below 60%, and Equity to Assets above 8%. Sort by ROE descending to see the most profitable banks first. The resulting list represents banks that are generating strong returns efficiently and with adequate capital.\n\nHigh-quality banks often trade at premium valuations because the market recognizes their superior operations. Investors using a quality screen should expect to pay P/B multiples of 1.3x to 2.0x or higher for the strongest institutions. Whether that premium is justified depends on the sustainability of the bank's competitive advantages, including its deposit franchise, market position, and management track record.",
    "relatedMetrics": [
      "roe",
      "roaa",
      "efficiency-ratio",
      "net-interest-margin",
      "equity-to-assets"
    ],
    "relatedValuations": [
      "peer-comparison-analysis",
      "roe-pb-framework"
    ],
    "relatedFaqs": [
      "what-is-a-good-roe-for-banks",
      "what-is-a-good-efficiency-ratio",
      "combining-metrics-to-find-best-banks",
      "screen-most-profitable-banks"
    ],
    "relatedGlossaryTerms": [],
    "cta": {
      "type": "screener",
      "target": "/screener",
      "text": "Screen for high-quality banks by ROE, efficiency, and capital"
    },
    "metaTitle": "Filters for Finding High-Quality Bank Stocks | BankSift",
    "metaDescription": "Learn which screener filters identify high-quality bank stocks using ROE, ROAA, Efficiency Ratio, and capital metrics to find top-performing banks."
  },
  {
    "slug": "filters-for-dividend-income-banks",
    "question": "What filters should I set to find bank stocks for dividend income?",
    "cluster": "screening",
    "clusterName": "Screening and Analysis Strategies",
    "intentType": "strategic",
    "shortAnswer": "Look for a moderate Dividend Payout Ratio (30-60%), supported by strong ROE (above 8%), adequate ROAA (above 0.80%), and reasonable Equity to Assets (above 8%) to ensure the dividend is sustainable",
    "fullAnswer": "Screening for dividend-paying bank stocks requires looking beyond yield alone. A high dividend payout is only attractive if the bank can sustain and grow it over time. The screen should balance current income against the financial strength that supports continued payments.\n\nThe Dividend Payout Ratio is the starting filter. It measures the percentage of earnings paid out as dividends. For banks, a payout ratio between 30% and 60% typically indicates a sustainable dividend with room for growth. Banks paying out less than 30% are retaining most of their earnings for growth or capital building, which may mean lower current income. Banks paying out more than 60% to 70% leave limited room for earnings volatility before the dividend comes under pressure. Regulators scrutinize banks with very high payout ratios, particularly during stress periods.\n\nProfitability filters ensure the dividend is backed by real earnings power. ROE above 8% and ROAA above 0.80% provide reasonable floors. A bank needs to earn enough to cover its dividend payments, build capital to meet regulatory requirements, and retain some earnings for growth. Banks with weak profitability may be paying dividends from accumulated capital rather than current earnings, which is not sustainable.\n\nCapital adequacy is especially important for dividend screens because bank regulators can and do restrict dividends when capital levels are insufficient. Equity to Assets above 8% provides a basic capital floor. Banks with thin capital buffers above regulatory minimums face the greatest risk of forced dividend cuts during economic downturns.\n\nThe connection between payout ratio and growth matters for income investors with a long time horizon. The sustainable growth rate equals ROE multiplied by the retention ratio (1 minus the payout ratio). A bank with 12% ROE and a 40% payout ratio retains 60% of earnings, producing a sustainable growth rate of approximately 7.2%. That growth rate applies to both the bank's book value and, over time, its dividend. A bank with a higher payout ratio grows more slowly but provides more current income.\n\nA practical starting combination might use Dividend Payout Ratio between 30% and 60%, ROE above 8%, ROAA above 0.80%, and Equity to Assets above 8%. Sort by Dividend Payout Ratio descending to see the highest-yielding sustainable payers first, or sort by ROE descending to prioritize banks with the strongest earnings supporting their dividends.\n\nAfter generating results, review each candidate's payout ratio trend over multiple years (available in SEC filings). A stable or gradually increasing payout ratio is more reassuring than one that has spiked recently, which may indicate earnings have declined while the dividend has not yet been adjusted.",
    "relatedMetrics": [
      "dividend-payout-ratio",
      "roe",
      "roaa",
      "equity-to-assets",
      "earnings-per-share"
    ],
    "relatedValuations": [
      "dividend-discount-model",
      "gordon-growth-model"
    ],
    "relatedFaqs": [
      "good-dividend-payout-ratio-for-banks",
      "how-to-evaluate-dividend-safety",
      "screen-for-safe-high-dividend-banks",
      "roe-payout-ratio-dividend-growth"
    ],
    "relatedGlossaryTerms": [
      "Retention Ratio",
      "Sustainable Growth Rate"
    ],
    "cta": {
      "type": "screener",
      "target": "/screener",
      "text": "Screen for dividend-paying bank stocks by payout ratio and profitability"
    },
    "metaTitle": "Filters for Dividend Income Bank Stocks | BankSift",
    "metaDescription": "Learn which screener filters find sustainable dividend-paying bank stocks using payout ratio, ROE, ROAA, and capital metrics."
  },
  {
    "slug": "how-to-screen-community-banks",
    "question": "How do I screen for small community bank stocks?",
    "cluster": "screening",
    "clusterName": "Screening and Analysis Strategies",
    "intentType": "procedural",
    "shortAnswer": "Filter by Total Assets below $3 billion to $10 billion and Market Cap below $500 million to $1 billion, then evaluate profitability and efficiency within that peer group",
    "fullAnswer": "Community banks are generally defined as banks with total assets below $10 billion, though many investors focus on the smaller end of that range, under $3 billion or even under $1 billion in assets. Screening for community banks requires size filters combined with awareness of how community bank metrics differ from those of larger institutions.\n\nThe first step is setting size parameters. Total Assets is the standard measure for classifying bank size. Filtering for Total Assets below $3 billion captures the core community bank segment. Filtering below $10 billion captures a broader set that includes larger community banks and small regionals. Market Cap can serve as a complementary filter; community banks typically have market capitalizations below $500 million, and many trade below $100 million.\n\nThe second step is adjusting expectations for community bank metrics. Community banks operate differently from large banks in several ways that affect screening. Their Efficiency Ratios tend to run higher (60% to 75%) because they lack the scale advantages of larger institutions, so a filter that works for large banks (below 55%) would exclude nearly every community bank. Their NIMs tend to be higher (3.5% to 4.5%) because they focus on relationship lending with more pricing power. Their ROE may be slightly lower (8% to 12%) than top large banks, partly because many community banks carry higher capital ratios relative to their risk.\n\nA practical screen for community banks might use Total Assets below $3 billion, ROE above 7%, Efficiency Ratio below 70%, and Equity to Assets above 8%. These thresholds are intentionally more relaxed than a general quality screen to account for the structural differences in community bank economics.\n\nThe third step is recognizing what a screener cannot tell you about community banks. Community banks derive much of their value from local factors: the health of their geographic market, the strength of their deposit relationships, the quality of their loan underwriting in specific property types, and the depth of their management team. These factors require reviewing the bank's filings and understanding its market. Many community banks are followed by few or no sell-side analysts, which creates both information inefficiency and the need for more independent research.\n\nCommunity bank stocks also tend to have lower trading volume and wider bid-ask spreads than larger bank stocks. Investors accustomed to liquid large-cap stocks should be aware of the practical implications for entering and exiting positions.\n\nBankSift tracks over 300 publicly traded banks, including many community banks. Using the screener to filter by Total Assets is the fastest way to identify which community banks are in the dataset and begin evaluating their fundamentals.",
    "relatedMetrics": [
      "roe",
      "roaa",
      "efficiency-ratio",
      "net-interest-margin",
      "equity-to-assets"
    ],
    "relatedValuations": [
      "peer-comparison-analysis",
      "price-to-book-valuation"
    ],
    "relatedFaqs": [
      "what-are-community-banks",
      "community-vs-regional-vs-money-center",
      "comparing-profitability-different-size-banks",
      "filters-for-high-quality-banks"
    ],
    "relatedGlossaryTerms": [
      "Community Bank"
    ],
    "cta": {
      "type": "screener",
      "target": "/screener",
      "text": "Filter by Total Assets to find community bank stocks"
    },
    "metaTitle": "How to Screen for Small Community Bank Stocks | BankSift",
    "metaDescription": "Learn how to screen for community bank stocks using total assets, market cap, and adjusted metric thresholds that reflect community bank economics."
  },
  {
    "slug": "how-to-compare-bank-stocks",
    "question": "How do I compare bank stocks side by side?",
    "cluster": "screening",
    "clusterName": "Screening and Analysis Strategies",
    "intentType": "procedural",
    "shortAnswer": "Select a peer group of similarly sized banks in similar markets, then compare profitability (ROE, ROAA, NIM), efficiency, valuation (P/B, P/E), and capital metrics across the group",
    "fullAnswer": "Comparing bank stocks effectively requires establishing a relevant peer group and examining multiple dimensions of performance. Banks that appear similar on one metric may differ significantly on others, and context matters more for bank comparison than for most industries.\n\nThe first step is defining the peer group. Meaningful comparison requires banks of similar size, business model, and geographic context. Comparing a $500 million community bank in rural Iowa to JPMorgan Chase produces no useful insight. A more useful comparison groups banks by Total Assets within a similar range (for example, $1 billion to $5 billion), operating in similar types of markets (metro vs. rural, single-state vs. multi-state). The screener's asset size filter is the starting point for building a peer group.\n\nThe second step is selecting comparison metrics across multiple dimensions. No single metric captures overall bank quality. A comprehensive comparison examines at least four dimensions.\n\nProfitability: ROE, ROAA, and NIM together reveal how much profit the bank generates, whether that profitability is driven by leverage or by the asset base, and how wide the interest rate spread is. A bank with strong ROE but weak ROAA is using leverage rather than operational efficiency to drive returns.\n\nEfficiency: The Efficiency Ratio shows how much of each revenue dollar goes to operating expenses. Within a peer group of similar-sized banks, differences in efficiency ratio often reflect management quality and operational discipline.\n\nValuation: P/B and P/E show what the market is willing to pay for each bank relative to its book value and earnings. Comparing these metrics within a peer group reveals which banks the market views as higher or lower quality, and whether any appear mispriced relative to their fundamentals.\n\nCapital: Equity to Assets provides a simple comparison of capital strength. Banks with significantly higher capital ratios within a peer group are either more conservatively managed or may be retaining excess capital that could be deployed more productively.\n\nThe third step is examining where banks diverge from the peer group average and understanding why. A bank with an Efficiency Ratio ten points higher than its peers may have invested heavily in technology or branches that have not yet produced revenue. A bank with ROE well above peers may be taking more credit risk. Divergence is the starting point for deeper analysis, not a conclusion by itself.\n\nBankSift's screener allows sorting by any available metric after applying filters, which enables quick identification of where each bank ranks within a peer group. Exporting the results and working through the comparison in a spreadsheet can help organize the analysis across multiple dimensions.",
    "relatedMetrics": [
      "roe",
      "roaa",
      "net-interest-margin",
      "efficiency-ratio",
      "price-to-book",
      "price-to-earnings",
      "equity-to-assets"
    ],
    "relatedValuations": [
      "peer-comparison-analysis",
      "roe-pb-framework"
    ],
    "relatedFaqs": [
      "comparing-profitability-different-size-banks",
      "how-to-do-peer-comparison",
      "combining-metrics-to-find-best-banks"
    ],
    "relatedGlossaryTerms": [],
    "cta": {
      "type": "screener",
      "target": "/screener",
      "text": "Screen and sort bank stocks to build peer comparisons"
    },
    "metaTitle": "How to Compare Bank Stocks Side by Side | BankSift",
    "metaDescription": "Learn how to compare bank stocks by building peer groups and evaluating profitability, efficiency, valuation, and capital metrics across similar banks."
  },
  {
    "slug": "screen-banks-below-book-value",
    "question": "How do I screen for banks trading below book value?",
    "cluster": "screening",
    "clusterName": "Screening and Analysis Strategies",
    "intentType": "procedural",
    "shortAnswer": "Set the P/B filter below 1.0 to find banks priced below their accounting net asset value, then add profitability filters to distinguish genuine bargains from value traps",
    "fullAnswer": "Banks trading below book value (P/B below 1.0) are priced below the accounting value of their net assets. This can represent a genuine valuation opportunity or a signal that the market sees problems the balance sheet has not yet fully reflected. Screening for these banks is straightforward, but interpreting the results requires care.\n\nThe primary filter is P/B below 1.0. This identifies all banks in the dataset whose share price is less than their book value per share. At any given time, a meaningful number of publicly traded banks trade below book value, particularly among smaller institutions that receive less analyst coverage.\n\nThe immediate challenge is separating banks that are cheap from banks that deserve to be cheap. A bank trading at 0.60x book value with declining earnings, rising non-performing loans, and thin capital is not a bargain. It is being priced for the possibility that its book value will decline toward its market price through future losses. The market is often right about these cases.\n\nTo filter out likely value traps, add profitability and capital floors. Setting ROE above 5% to 7% ensures the bank is at least generating positive returns. Setting ROAA above 0.50% to 0.70% confirms the profitability is not purely a leverage artifact. Setting Equity to Assets above 7% to 8% provides some assurance that the bank has adequate capital to absorb potential losses.\n\nFor a more selective screen, raise the profitability floors. Banks with P/B below 1.0 and ROE above 8% to 10% are earning returns that would typically justify a price at or above book value, which suggests the market may be mispricing the stock. These are the most interesting candidates for further analysis.\n\nAfter generating results, examine why each bank is trading below book value. Common reasons include: the bank operates in a market with limited growth prospects; the bank has elevated levels of non-performing assets that may require future charge-offs; the bank's securities portfolio has significant unrealized losses (an issue that became prominent when interest rates rose rapidly); the bank is very small and illiquid, causing the market to apply a liquidity discount; or the bank has weak or uncertain management.\n\nSome of these reasons are temporary or addressable, while others reflect permanent impairments. The analytical work after screening determines which category each candidate falls into.\n\nInvestors focused on tangible book value may prefer filtering by P/TBV rather than P/B, which strips out goodwill and intangible assets. This is especially relevant for banks that have made acquisitions, where goodwill may represent a significant portion of book value.",
    "relatedMetrics": [
      "price-to-book",
      "roe",
      "roaa",
      "equity-to-assets",
      "book-value-per-share",
      "price-to-tangible-book-value"
    ],
    "relatedValuations": [
      "price-to-book-valuation",
      "margin-of-safety",
      "roe-pb-framework"
    ],
    "relatedFaqs": [
      "pb-below-one-undervalued",
      "what-is-a-good-pb-for-banks",
      "filters-for-undervalued-banks",
      "red-flags-screening-bank-stocks"
    ],
    "relatedGlossaryTerms": [
      "Tangible Book Value"
    ],
    "cta": {
      "type": "screener",
      "target": "/screener",
      "text": "Screen for banks trading below book value"
    },
    "metaTitle": "How to Screen for Banks Below Book Value | BankSift",
    "metaDescription": "Learn how to screen for bank stocks trading below book value using P/B filters combined with profitability floors to separate bargains from value traps."
  },
  {
    "slug": "screen-most-profitable-banks",
    "question": "How do I screen for the most profitable banks?",
    "cluster": "screening",
    "clusterName": "Screening and Analysis Strategies",
    "intentType": "procedural",
    "shortAnswer": "Filter for ROE above 12%, ROAA above 1.0%, and NIM above 3.0%, then sort by ROE descending to rank the most profitable banks",
    "fullAnswer": "Screening for the most profitable banks requires using multiple profitability metrics together, because each metric captures a different aspect of how a bank generates returns.\n\nROE is the broadest profitability measure. It shows the return generated on shareholders' equity. For banks, ROE above 12% represents strong performance, and above 15% is exceptional. Setting ROE as the primary filter and sorting descending ranks banks from most to least profitable on this measure. The FDIC's historical data shows that the median ROE for US banks has typically ranged between 8% and 12%, so screening above 12% captures the top performers.\n\nROAA removes the effect of leverage and shows how productively the bank uses its total asset base. Adding ROAA above 1.0% as a secondary filter ensures the high ROE is driven by operational performance rather than simply thin capital. A bank can achieve high ROE with mediocre operations if it runs with minimal equity, but that strategy carries higher risk. Banks with both high ROE and high ROAA are genuinely strong operators.\n\nNIM measures the core banking spread between what the bank earns on loans and investments and what it pays on deposits and borrowings. Adding NIM above 3.0% to 3.5% filters for banks with strong core banking franchises. NIM is the largest driver of revenue for traditional banks, so banks with above-average NIM have a structural profitability advantage. However, very high NIM (above 5%) can sometimes indicate higher-risk lending, so it helps to examine the bank's loan mix when NIM is at the upper extreme.\n\nThe Efficiency Ratio provides a cost perspective on profitability. Adding Efficiency Ratio below 60% ensures the profitable banks on the list are not generating their returns despite poor cost control. Banks that combine high ROE with low efficiency ratios are converting the highest proportion of their revenue into profit.\n\nA practical profitability screen might use ROE above 12%, ROAA above 1.0%, NIM above 3.0%, and Efficiency Ratio below 60%. Sort by ROE descending. The resulting list represents the most profitable banks in the dataset across multiple dimensions.\n\nNote that highly profitable banks often trade at premium valuations. Investors interested in both profitability and value should cross-reference the results with P/B and P/E to identify any profitable banks that may be trading at reasonable multiples.",
    "relatedMetrics": [
      "roe",
      "roaa",
      "net-interest-margin",
      "efficiency-ratio"
    ],
    "relatedValuations": [
      "roe-pb-framework",
      "peer-comparison-analysis"
    ],
    "relatedFaqs": [
      "what-is-a-good-roe-for-banks",
      "what-is-a-good-roaa-for-banks",
      "what-is-a-good-nim-for-banks",
      "filters-for-high-quality-banks"
    ],
    "relatedGlossaryTerms": [],
    "cta": {
      "type": "screener",
      "target": "/screener",
      "text": "Screen for the most profitable bank stocks by ROE and ROAA"
    },
    "metaTitle": "How to Screen for the Most Profitable Banks | BankSift",
    "metaDescription": "Learn how to screen for the most profitable bank stocks using ROE, ROAA, NIM, and Efficiency Ratio filters to find top-performing institutions."
  },
  {
    "slug": "screen-most-efficient-banks",
    "question": "How do I screen for the most efficient banks?",
    "cluster": "screening",
    "clusterName": "Screening and Analysis Strategies",
    "intentType": "procedural",
    "shortAnswer": "Set the Efficiency Ratio filter below 55-60% to find banks that spend the least to generate each dollar of revenue, and pair with minimum asset size to ensure meaningful comparison",
    "fullAnswer": "The Efficiency Ratio is the primary metric for screening bank operating efficiency. It measures non-interest expense as a percentage of revenue (net interest income plus non-interest income). Lower values indicate the bank converts a higher share of its revenue into profit.\n\nThe standard filter for efficient banks is Efficiency Ratio below 55% to 60%. Banks operating below 55% are among the most efficient in the industry. The best-run banks in the country operate in the 45% to 50% range. Setting the filter at 60% captures a broader set of well-managed banks, while tightening to 55% or below isolates the top tier.\n\nSize context matters when screening for efficiency. Large banks benefit from scale advantages that allow them to spread fixed costs over a larger revenue base, which naturally produces lower efficiency ratios. Small community banks face inherently higher efficiency ratios (often 65% to 75%) because compliance costs, technology systems, and branch infrastructure represent a larger percentage of their smaller revenue base. To make the comparison meaningful, consider setting a Total Assets filter to create a peer group of similar-sized banks before applying the efficiency filter.\n\nProfitability metrics should accompany an efficiency screen. A bank can achieve a low efficiency ratio through aggressive cost-cutting that harms its long-term franchise (closing branches, underinvesting in technology, understaffing compliance). Adding ROE above 8% to 10% and ROAA above 0.80% confirms that the efficient cost structure is translating into genuine profitability rather than reflecting a bank that has cut its way into a corner.\n\nNIM provides additional context. A bank with a low efficiency ratio and a high NIM is generating strong revenue while keeping costs contained, which is the ideal combination. A bank with a low efficiency ratio but a weak NIM may simply be operating in a low-cost market where revenue is also limited.\n\nA practical screen for efficient banks might use Efficiency Ratio below 60%, ROE above 8%, ROAA above 0.80%, and Total Assets above $500 million (to exclude very small banks where the ratio behaves differently). Sort by Efficiency Ratio ascending to see the most efficient banks first.\n\nWhen reviewing results, look at whether the bank's revenue is growing alongside its efficiency. A declining efficiency ratio driven by revenue growth is a healthier signal than one achieved through expense cuts alone. Trends matter, and a single period's efficiency ratio should be confirmed against the bank's filing history.",
    "relatedMetrics": [
      "efficiency-ratio",
      "roe",
      "roaa",
      "net-interest-margin"
    ],
    "relatedValuations": [
      "peer-comparison-analysis"
    ],
    "relatedFaqs": [
      "what-is-a-good-efficiency-ratio",
      "what-drives-efficiency-ratio",
      "why-small-banks-higher-efficiency-ratio",
      "filters-for-high-quality-banks"
    ],
    "relatedGlossaryTerms": [],
    "cta": {
      "type": "screener",
      "target": "/screener",
      "text": "Screen for the most efficient bank stocks by Efficiency Ratio"
    },
    "metaTitle": "How to Screen for the Most Efficient Banks | BankSift",
    "metaDescription": "Learn how to screen for the most efficient bank stocks using Efficiency Ratio filters with profitability and size context for meaningful comparisons."
  },
  {
    "slug": "red-flags-screening-bank-stocks",
    "question": "What are the red flags to watch for when screening bank stocks?",
    "cluster": "screening",
    "clusterName": "Screening and Analysis Strategies",
    "intentType": "evaluative",
    "shortAnswer": "Watch for very low P/B without clear explanation, declining ROE or ROAA, efficiency ratios above 80%, very high payout ratios, rapidly growing loans without matching deposit growth, and thin capital ratios",
    "fullAnswer": "Screening surfaces candidates for further analysis, but it also surfaces banks with serious problems. Learning to recognize red flags in screening results prevents wasted research time and helps avoid value traps.\n\nExtremely low valuation without apparent cause is the most common red flag. A bank trading at 0.40x to 0.50x book value while its peers trade at 1.0x or above is almost certainly discounted for a reason. The screener cannot tell you what that reason is, but it should prompt immediate skepticism rather than excitement about a \"cheap\" stock.\n\nDeclining profitability trends warrant concern. A bank with ROE of 6% that was earning 12% two years ago is on a deteriorating trajectory. While the screener shows a snapshot, the direction of profitability matters more than the current level. Filing review is necessary to determine whether the decline is temporary (a one-time charge, a strategic investment) or structural (competitive erosion, credit deterioration).\n\nEfficiency Ratios above 75% to 80% suggest the bank is spending too much to generate its revenue. At these levels, even modest revenue declines can push the bank toward unprofitability. Very high efficiency ratios may indicate a bank struggling with excess overhead, underinvestment in revenue-generating activities, or a shrinking revenue base.\n\nVery high Dividend Payout Ratios (above 80% to 90%) indicate the bank is distributing almost all of its earnings, leaving minimal buffer for earnings volatility and little room for capital building. Banks in this situation are vulnerable to dividend cuts if earnings decline even modestly. A payout ratio above 100% means the bank is paying dividends in excess of its earnings, which draws down capital.\n\nA Loans to Deposits ratio above 100% means the bank is funding some portion of its loans with non-deposit sources, typically wholesale borrowings that are more expensive and less stable than core deposits. While this is not inherently disqualifying, it introduces funding risk and may pressure profitability if wholesale funding costs rise.\n\nLow Equity to Assets (below 6% to 7%) indicates the bank has relatively thin capital relative to its asset base. While regulatory capital ratios (CET1, Tier 1) are more precise measures, a low equity-to-assets ratio on the screener suggests the bank is operating with limited cushion.\n\nNegative or near-zero earnings (very low or negative EPS) may indicate a bank in distress. Negative earnings can result from large provision charges, write-downs, or operational losses. While some of these causes are temporary, screening for banks with negative earnings generally produces a list of troubled institutions.\n\nNo single red flag is necessarily disqualifying on its own, but multiple red flags appearing simultaneously for the same bank (low P/B, declining ROE, high efficiency ratio, high payout ratio) strongly suggest problems that warrant either passing on the stock or conducting extensive due diligence.",
    "relatedMetrics": [
      "price-to-book",
      "roe",
      "roaa",
      "efficiency-ratio",
      "dividend-payout-ratio",
      "loans-to-deposits",
      "equity-to-assets",
      "earnings-per-share"
    ],
    "relatedValuations": [
      "margin-of-safety"
    ],
    "relatedFaqs": [
      "pb-below-one-undervalued",
      "can-roe-be-too-high",
      "loans-to-deposits-too-high",
      "filters-for-undervalued-banks"
    ],
    "relatedGlossaryTerms": [],
    "cta": {
      "type": "screener",
      "target": "/screener",
      "text": "Screen bank stocks and check for red flags across 25+ metrics"
    },
    "metaTitle": "Red Flags When Screening Bank Stocks | BankSift",
    "metaDescription": "Learn the key red flags to watch for when screening bank stocks, including low valuation traps, declining profitability, and dangerous payout ratios."
  },
  {
    "slug": "combining-metrics-to-find-best-banks",
    "question": "How do I combine multiple metrics to find the best bank stocks?",
    "cluster": "screening",
    "clusterName": "Screening and Analysis Strategies",
    "intentType": "strategic",
    "shortAnswer": "Build a multi-factor screen by combining one metric from each category: profitability (ROE or ROAA), efficiency (Efficiency Ratio), valuation (P/B or P/E), and capital (Equity to Assets), then prioritize based on your investment objective",
    "fullAnswer": "The most effective bank stock screens combine metrics from different analytical dimensions rather than stacking multiple metrics from the same dimension. A screen using ROE, ROAA, NIM, and Efficiency Ratio is entirely focused on profitability and operations. Adding P/B and Equity to Assets introduces valuation and capital dimensions that provide a more complete picture.\n\nThe framework for combining metrics uses four dimensions, with one or two metrics selected from each.\n\nProfitability measures how well the bank generates returns. ROE is the standard choice. ROAA is the preferred complement because it removes leverage effects. NIM adds a core revenue perspective. Select one or two of these based on whether the objective emphasizes overall profitability (ROE), operational efficiency (ROAA), or core banking strength (NIM).\n\nEfficiency measures how much of its revenue the bank retains after operating expenses. The Efficiency Ratio is the primary metric here and applies to virtually every bank screen.\n\nValuation measures what the market is charging for the bank's earnings and assets. P/B is the primary bank valuation metric. P/E provides a complementary earnings-based view. Including at least one valuation metric prevents the screen from identifying excellent banks that are too expensive to offer attractive returns.\n\nCapital and balance sheet measures provide a safety and structure perspective. Equity to Assets is the simplest capital measure available in the screener. Loans to Deposits and Deposits to Assets add balance sheet composition context.\n\nA balanced multi-factor screen might combine ROE above 10%, Efficiency Ratio below 60%, P/B below 1.5x, and Equity to Assets above 8%. This produces a list of profitable, efficient, reasonably priced banks with adequate capital. The filter thresholds can be tightened or loosened to produce more or fewer results.\n\nThe order of priority among the four dimensions should reflect the investment objective. Value investors tighten the valuation filters and loosen the profitability filters, accepting lower profitability in exchange for a cheaper price. Quality investors tighten profitability and efficiency filters while accepting higher valuations. Income investors add Dividend Payout Ratio and may loosen the valuation constraints.\n\nAfter running the combined screen, review the resulting list to identify banks that score well across all four dimensions rather than excelling on one while being weak on another. A bank with 15% ROE, a 50% efficiency ratio, but P/B of 2.5x and equity-to-assets of 6% looks strong on operations but is expensively priced with thin capital. A bank with 10% ROE, 58% efficiency ratio, P/B of 0.9x, and 10% equity-to-assets may be the more compelling investment despite lower profitability.\n\nThe screener makes this process practical by allowing multiple simultaneous filters. Start broad, examine the initial results, then progressively tighten filters to isolate the strongest candidates.",
    "relatedMetrics": [
      "roe",
      "roaa",
      "net-interest-margin",
      "efficiency-ratio",
      "price-to-book",
      "price-to-earnings",
      "equity-to-assets",
      "loans-to-deposits"
    ],
    "relatedValuations": [
      "peer-comparison-analysis",
      "roe-pb-framework",
      "price-to-book-valuation"
    ],
    "relatedFaqs": [
      "how-to-use-bank-stock-screener",
      "filters-for-undervalued-banks",
      "filters-for-high-quality-banks",
      "most-important-bank-stock-metrics"
    ],
    "relatedGlossaryTerms": [],
    "cta": {
      "type": "screener",
      "target": "/screener",
      "text": "Combine multiple metrics to screen 300+ bank stocks"
    },
    "metaTitle": "Combining Metrics to Find the Best Bank Stocks | BankSift",
    "metaDescription": "Learn how to build multi-factor bank stock screens by combining profitability, efficiency, valuation, and capital metrics for a complete analysis."
  },
  {
    "slug": "value-investing-bank-screen",
    "question": "What is a good starting point for a value investing bank stock screen?",
    "cluster": "screening",
    "clusterName": "Screening and Analysis Strategies",
    "intentType": "strategic",
    "shortAnswer": "Start with P/B below 1.0-1.2x, P/E below 10-12x, ROE above 7-8%, and check the Graham Number and Margin of Safety for additional confirmation",
    "fullAnswer": "Value investing in bank stocks centers on finding banks where the market price underestimates the intrinsic value of the institution's assets, earnings power, or franchise. Banks are well-suited to value investing approaches because their balance sheets consist primarily of financial instruments with identifiable values, making book value a more meaningful anchor than it is for most industries.\n\nThe Graham Number provides a natural starting point for value-oriented bank screening. Developed from Benjamin Graham's principles, it calculates a maximum fair price based on EPS and BVPS. Banks whose current price falls below their Graham Number are, by this framework, potentially undervalued. BankSift calculates the Graham Number and Margin of Safety (the percentage discount to the Graham Number) for every bank in the dataset, making this an efficient first filter.\n\nP/B below 1.0x to 1.2x is the core valuation filter. The theoretical justification comes from the ROE-P/B framework: a bank earning its cost of equity (approximately 8% to 10%) should trade near 1.0x book value. Banks trading below this level are either earning below their cost of equity (in which case the discount is justified) or are being mispriced by the market. The screener allows you to distinguish between these cases by examining ROE alongside P/B.\n\nP/E below 10x to 12x adds an earnings-based valuation check. Bank P/E ratios typically range from 8x to 15x. Banks at the lower end of this range may be undervalued, particularly if their earnings are stable rather than temporarily depressed by provision charges.\n\nProfitability floors are essential for a value screen. Setting ROE above 7% to 8% and ROAA above 0.60% to 0.70% helps exclude banks that are cheap because of genuinely weak operations. The goal is finding banks where the market is undervaluing adequate or strong fundamentals, not banks that deserve their low price.\n\nA practical value investing screen might combine Graham Number Margin of Safety above 0% (price below Graham Number), P/B below 1.2x, P/E below 12x, and ROE above 7%. Sort by Margin of Safety descending to see the banks with the largest discount to their Graham Number first.\n\nAfter generating results, the real work begins. For each candidate, review the bank's 10-K filing to understand its loan composition, deposit stability, earnings trend over recent years, and capital adequacy. Determine whether the market's discount reflects a temporary condition (a one-time charge, market-wide pessimism, illiquidity in a small stock) or a structural issue (declining market, poor management, deteriorating credit). Value investing produces the best results when the investor understands the business well enough to assess whether the market's pessimism is justified.\n\nBankSift's Screener Guide includes a dedicated value investing screening strategy with specific filter settings and a walkthrough of the analytical process.",
    "relatedMetrics": [
      "price-to-book",
      "price-to-earnings",
      "roe",
      "roaa",
      "book-value-per-share",
      "earnings-per-share"
    ],
    "relatedValuations": [
      "graham-number",
      "margin-of-safety",
      "price-to-book-valuation",
      "roe-pb-framework"
    ],
    "relatedFaqs": [
      "filters-for-undervalued-banks",
      "graham-number-for-bank-stocks",
      "how-to-use-graham-number",
      "pb-below-one-undervalued"
    ],
    "relatedGlossaryTerms": [
      "Justified P/B Multiple"
    ],
    "cta": {
      "type": "screener",
      "target": "/screener",
      "text": "Start a value investing bank stock screen with Graham Number and P/B"
    },
    "metaTitle": "Value Investing Bank Stock Screen Starting Point | BankSift",
    "metaDescription": "Learn a practical starting point for value investing in bank stocks using Graham Number, P/B, P/E, and profitability filters to find undervalued banks."
  },
  {
    "slug": "identifying-bank-turnaround-candidates",
    "question": "How do I identify turnaround candidates in the banking sector?",
    "cluster": "screening",
    "clusterName": "Screening and Analysis Strategies",
    "intentType": "strategic",
    "shortAnswer": "Screen for banks with low current profitability (ROE 3-7%) but adequate capital (Equity to Assets above 7-8%) trading at deep discounts to book value (P/B below 0.7x), then research what is suppressing earnings",
    "fullAnswer": "Turnaround investing in banks targets institutions that are currently underperforming but have the financial strength and potential to recover. This approach carries higher risk than quality or value screening because it involves investing in banks with identified weaknesses. The analytical challenge is distinguishing banks that can improve from banks that are in permanent decline or heading toward failure.\n\nThe screening approach for turnarounds differs from a standard value screen. Instead of filtering for adequate profitability, a turnaround screen explicitly targets banks with below-average profitability that still maintain adequate capital and a viable franchise.\n\nProfitability should be low but positive. Setting ROE between 2% and 7% captures banks that are profitable but earning well below their cost of equity. Banks with negative ROE are in deeper distress and represent a different, higher-risk category. ROAA between 0.20% and 0.60% provides a complementary floor.\n\nCapital adequacy is the critical safety filter. A bank cannot execute a turnaround if it lacks the capital to absorb continued weak performance while management implements changes. Equity to Assets above 7% to 8% provides a minimum buffer. Banks with strong capital positions relative to their weak earnings are better positioned to survive the turnaround period.\n\nValuation should reflect the market's pessimism. P/B below 0.7x to 0.8x indicates the market is pricing the bank at a significant discount to its net asset value, creating the potential for meaningful upside if the bank improves. If the turnaround succeeds and ROE recovers to 10% or above, the P/B multiple should re-rate toward 1.0x or higher, providing returns from both earnings improvement and multiple expansion.\n\nAfter generating candidates, the research phase is essential and more intensive than for other screening approaches. For each candidate, determine the specific cause of weak profitability. Common turnaround situations include: banks working through elevated credit losses from a specific loan concentration (such as energy loans or commercial real estate in a distressed market); banks with high efficiency ratios due to a recent acquisition that has not yet been fully integrated; banks with temporarily compressed NIM due to balance sheet repositioning; and banks with new management teams brought in to improve operations.\n\nThe most favorable turnaround candidates combine identifiable problems with identifiable solutions. A bank with a high efficiency ratio and a new CEO with a track record of cost reduction at previous banks is a clearer thesis than a bank with diffuse underperformance and no visible catalyst for change.\n\nTurnaround investing in banks also carries specific risks. Bank regulators may impose restrictions on capital actions, growth, or business activities if the bank's condition deteriorates further. Deposit outflows can accelerate if market confidence erodes. And the timeline for turnarounds in banking is often longer than investors expect, as credit problems and operational improvements take multiple quarters to work through the financial statements.",
    "relatedMetrics": [
      "roe",
      "roaa",
      "price-to-book",
      "equity-to-assets",
      "efficiency-ratio",
      "net-interest-margin"
    ],
    "relatedValuations": [
      "price-to-book-valuation",
      "margin-of-safety"
    ],
    "relatedFaqs": [
      "pb-below-one-undervalued",
      "red-flags-screening-bank-stocks",
      "filters-for-undervalued-banks",
      "what-happens-below-minimum-capital"
    ],
    "relatedGlossaryTerms": [],
    "cta": {
      "type": "screener",
      "target": "/screener",
      "text": "Screen for potential turnaround bank stocks by P/B and capital metrics"
    },
    "metaTitle": "How to Identify Bank Turnaround Candidates | BankSift",
    "metaDescription": "Learn how to screen for bank turnaround candidates using low profitability, adequate capital, and deep valuation discounts to find recovery opportunities."
  },
  {
    "slug": "how-to-export-screening-data",
    "question": "How do I export and analyze bank stock screening data?",
    "cluster": "screening",
    "clusterName": "Screening and Analysis Strategies",
    "intentType": "procedural",
    "shortAnswer": "Use BankSift's screener to filter and sort banks, then export the results to a spreadsheet for further analysis, custom scoring, and comparison across multiple dimensions",
    "fullAnswer": "Exporting screening results allows for deeper analysis than what a screener interface alone can provide. A spreadsheet gives the flexibility to create custom scoring systems, weighted rankings, historical comparisons, and formatted output for investment notes.\n\nBankSift's screener allows filtering by 25+ metrics and sorting by any column. The first step in an export workflow is setting up the screen with the desired filters to narrow the universe to a manageable set of candidates. A screen that returns 20 to 50 banks is a practical size for spreadsheet analysis. A screen that returns 200 banks likely needs tighter filters before exporting.\n\nOnce results are filtered and sorted, the data can be captured for offline analysis. The screener displays all available metrics for each bank in the results table, providing a comprehensive dataset for each institution.\n\nIn a spreadsheet, the most productive next step is creating a scoring or ranking system. One common approach assigns a percentile rank within the screened group for each metric. A bank that ranks in the top quartile on ROE, efficiency, and P/B receives high marks across dimensions. A bank that ranks well on one dimension but poorly on others becomes easy to identify.\n\nA weighted scoring approach takes this further. Assign weights to each metric based on the investment objective. A value investor might weight P/B at 30%, Graham Number Margin of Safety at 25%, ROE at 20%, Equity to Assets at 15%, and Efficiency Ratio at 10%. A quality investor would reverse the emphasis toward profitability and efficiency. Summing the weighted scores produces a composite ranking that reflects the investor's priorities.\n\nAnother productive use of exported data is historical comparison. After identifying a candidate from the screener, pulling the same bank's metrics from its SEC filings for the prior three to five years reveals trends that a single-period screen cannot capture. A bank showing improving ROE and declining efficiency ratio over several years is on a favorable trajectory. A bank with deteriorating trends despite currently acceptable metrics may be heading toward problems.\n\nExported data also supports peer group analysis. Pulling five to eight banks of similar size and business model into a comparison table and computing the peer group average for each metric quickly reveals where each bank stands relative to its most relevant competitors.\n\nFor investors who build models, exported screening data provides the inputs for valuation frameworks. The Dividend Discount Model requires EPS and dividend data. The ROE-P/B framework requires ROE and current P/B. The Graham Number requires EPS and BVPS. Having these inputs in a spreadsheet streamlines the process of running valuation calculations across multiple candidates simultaneously.",
    "relatedMetrics": [
      "roe",
      "roaa",
      "price-to-book",
      "price-to-earnings",
      "efficiency-ratio",
      "earnings-per-share",
      "book-value-per-share"
    ],
    "relatedValuations": [
      "peer-comparison-analysis",
      "graham-number",
      "dividend-discount-model",
      "roe-pb-framework"
    ],
    "relatedFaqs": [
      "how-to-use-bank-stock-screener",
      "how-to-compare-bank-stocks",
      "combining-metrics-to-find-best-banks",
      "how-to-do-peer-comparison"
    ],
    "relatedGlossaryTerms": [],
    "cta": {
      "type": "screener",
      "target": "/screener",
      "text": "Screen and export bank stock data for offline analysis"
    },
    "metaTitle": "How to Export and Analyze Bank Screening Data | BankSift",
    "metaDescription": "Learn how to export bank stock screening results for spreadsheet analysis, custom scoring, peer comparison, and valuation modeling."
  },
  {
    "slug": "how-to-calculate-roe",
    "question": "How do I calculate return on equity (ROE) for a bank?",
    "cluster": "profitability",
    "clusterName": "Bank Profitability Metrics",
    "intentType": "procedural",
    "shortAnswer": "Divide net income by average shareholders' equity, or use alternative formulas including the DuPont decomposition to break ROE into its component drivers",
    "fullAnswer": "The primary formula for ROE is net income divided by average shareholders' equity. Average equity is used rather than period-end equity because net income is earned throughout the period. For a bank that reported $50 million in net income with beginning equity of $400 million and ending equity of $450 million, the average equity is $425 million and ROE is 11.8%.\n\nThe standard average uses beginning and ending balances: (beginning equity + ending equity) / 2. The FFIEC Uniform Bank Performance Report uses a five-point average that includes equity at the end of each of the four most recent quarters plus the beginning balance, divided by five. The five-point method smooths out large intra-year swings from capital events or earnings seasonality. Both approaches are acceptable, but consistency matters when comparing banks. If one source uses a two-point average and another uses a five-point average, the results will differ slightly.\n\nAlternative formulas provide useful cross-checks. ROE equals ROAA multiplied by the equity multiplier (average assets divided by average equity). If ROAA is 1.1% and the equity multiplier is 10x, ROE is 11%. This decomposition reveals whether ROE is driven by asset productivity or by leverage. ROE also equals P/B divided by P/E, which links valuation multiples to profitability and can be rearranged to check consistency across metrics.\n\nThe DuPont decomposition breaks ROE into three components for deeper analysis: profit margin (net income divided by revenue) multiplied by asset utilization (revenue divided by average assets) multiplied by the equity multiplier (average assets divided by average equity). For banks, revenue is typically defined as net interest income plus non-interest income. This decomposition isolates whether changes in ROE stem from margin shifts, asset productivity changes, or leverage changes.\n\nTo find the inputs in SEC filings, net income appears on the consolidated statements of income in the 10-K or 10-Q. Use net income attributable to common shareholders if the bank has preferred stock outstanding, as preferred dividends reduce the income available to common equity. Shareholders' equity appears on the consolidated balance sheet. For the average, use the current period-end balance and the prior period-end balance.\n\nFor trailing twelve months (TTM) calculations using quarterly data, sum net income from the four most recent 10-Q filings. Use the average of the equity balance five quarters ago and the most recent quarter-end.\n\nA common calculation mistake is using period-end equity rather than average equity, which understates ROE if equity grew during the period and overstates it if equity declined. Another mistake is failing to subtract preferred stock dividends from net income for banks that have preferred shares outstanding, which inflates the ROE available to common shareholders.",
    "relatedMetrics": [
      "roe",
      "roaa",
      "equity-to-assets",
      "price-to-book",
      "price-to-earnings"
    ],
    "relatedValuations": [
      "roe-pb-framework",
      "dupont-decomposition"
    ],
    "relatedFaqs": [
      "what-is-a-good-roe-for-banks",
      "roe-vs-roaa",
      "dupont-decomposition-for-banks",
      "how-to-calculate-roaa"
    ],
    "relatedGlossaryTerms": [
      "Equity Multiplier",
      "DuPont Decomposition (for banks)",
      "Return on Tangible Common Equity (ROTCE)"
    ],
    "cta": {
      "type": "screener",
      "target": "/screener",
      "text": "Screen banks by ROE and related profitability metrics"
    },
    "metaTitle": "How to Calculate ROE for a Bank Stock | BankSift",
    "metaDescription": "Step-by-step guide to calculating ROE for banks, including the DuPont decomposition, FFIEC averaging methods, and where to find inputs in SEC filings."
  },
  {
    "slug": "how-to-calculate-roaa",
    "question": "How do I calculate return on average assets (ROAA) for a bank?",
    "cluster": "profitability",
    "clusterName": "Bank Profitability Metrics",
    "intentType": "procedural",
    "shortAnswer": "Divide net income by average total assets for the period, using either a two-point or five-point average method",
    "fullAnswer": "The formula for ROAA is net income divided by average total assets. Average assets are used because net income accumulates throughout the period while total assets represent a point-in-time balance. For a bank with $25 million in net income, beginning total assets of $2.4 billion, and ending total assets of $2.6 billion, the average is $2.5 billion and ROAA is 1.0%.\n\nThe two-point average method uses (beginning assets + ending assets) / 2. The five-point average used in the FFIEC Uniform Bank Performance Report takes total assets at the end of each of the four most recent quarters plus the beginning balance, divided by five. The five-point method is more accurate for banks experiencing significant asset growth or contraction during the year, since it captures the trajectory rather than just the endpoints.\n\nThe alternative formula links ROAA to ROE: ROAA equals ROE divided by the equity multiplier (average assets / average equity). If ROE is 12% and the equity multiplier is 11x, ROAA is approximately 1.09%. This relationship is useful for decomposing whether a bank's ROE is driven by operational performance (captured in ROAA) or by leverage (captured in the equity multiplier).\n\nWhen working with quarterly filings, annualize the quarterly net income before dividing. A bank reporting $7 million in net income for one quarter is earning at an annualized rate of $28 million. Divide the annualized figure by average assets for the quarter. Failing to annualize quarterly net income is a common mistake that produces ROAA values roughly one-quarter of the actual annual rate.\n\nTo find inputs in SEC filings, net income appears on the consolidated statements of income. Total assets appears as the final line of the asset section on the consolidated balance sheet. For the average, use the current period-end total assets and the prior year-end total assets for an annual calculation, or the current and prior quarter-end balances for a quarterly calculation.\n\nFor banks with preferred stock, use net income available to common shareholders (net income minus preferred dividends) if the goal is measuring returns to common equity holders. However, the standard ROAA definition uses total net income in the numerator because the denominator (total assets) is funded by all forms of capital, not just common equity.\n\nA practical nuance for bank analysis: ROAA is less affected by capital structure decisions than ROE, making it more useful for comparing banks that have different leverage levels or that have recently raised or returned capital. Two banks with identical ROAA but different equity-to-assets ratios will show different ROE values, with the more leveraged bank appearing more profitable on an ROE basis despite equivalent operational performance.",
    "relatedMetrics": [
      "roaa",
      "roe",
      "equity-to-assets",
      "net-interest-margin"
    ],
    "relatedValuations": [
      "roe-pb-framework"
    ],
    "relatedFaqs": [
      "what-is-a-good-roaa-for-banks",
      "roe-vs-roaa",
      "when-to-use-roe-vs-roaa",
      "how-to-calculate-roe"
    ],
    "relatedGlossaryTerms": [
      "Equity Multiplier"
    ],
    "cta": {
      "type": "screener",
      "target": "/screener",
      "text": "Screen banks by ROAA and compare across sizes"
    },
    "metaTitle": "How to Calculate ROAA for a Bank Stock | BankSift",
    "metaDescription": "Step-by-step guide to calculating ROAA for banks, including averaging methods, annualizing quarterly data, and the ROAA-to-ROE relationship."
  },
  {
    "slug": "how-to-calculate-nim",
    "question": "How do I calculate net interest margin (NIM) for a bank?",
    "cluster": "profitability",
    "clusterName": "Bank Profitability Metrics",
    "intentType": "procedural",
    "shortAnswer": "Divide net interest income by average earning assets, expressed as a percentage; tax-equivalent adjustments may be needed for banks with significant tax-exempt income",
    "fullAnswer": "The primary formula for NIM is net interest income divided by average earning assets, expressed as a percentage. Net interest income equals total interest income minus total interest expense. Earning assets include loans, investment securities, interest-bearing deposits at other banks, and federal funds sold. For a bank with $90 million in net interest income and $2.5 billion in average earning assets, NIM is 3.6%.\n\nNIM is distinct from the net interest spread, though the two are often confused. The net interest spread is the difference between the yield on earning assets (interest income / average earning assets) and the cost of interest-bearing liabilities (interest expense / average interest-bearing liabilities). NIM and the spread differ because the denominators differ: NIM uses earning assets in the denominator while the cost component uses only interest-bearing liabilities. Since banks fund some earning assets with non-interest-bearing deposits and equity (which carry no explicit interest cost), NIM is typically higher than the net interest spread.\n\nThe tax-equivalent NIM adjustment accounts for the fact that some earning assets (primarily municipal bonds) generate tax-exempt income. To make NIM comparable across banks with different proportions of tax-exempt assets, the tax-exempt interest income is grossed up to a pre-tax equivalent. The adjustment formula is: tax-exempt income / (1 - marginal tax rate). A bank earning $5 million in tax-exempt income at a 21% corporate tax rate would gross this up to approximately $6.33 million. The tax-equivalent NIM provides a more accurate comparison of the true interest rate spreads banks are earning on their assets.\n\nTo find the inputs in SEC filings, interest income and interest expense appear on the consolidated statements of income, typically broken out by category (interest on loans, interest on securities, interest on deposits, interest on borrowings). Net interest income is shown as a subtotal. Average earning assets may be disclosed in the bank's management discussion and analysis section or in supplemental tables. If not disclosed, it can be approximated by averaging the beginning and ending balances of total loans, investment securities, and other interest-earning assets from the balance sheet.\n\nWhen calculating NIM from quarterly data, the quarterly net interest income figure already reflects one quarter's worth of income, and the average earning assets should be the average for that same quarter. NIM calculated this way is already an annualized rate because both the numerator and denominator cover the same time period. A common mistake is annualizing quarterly net interest income (multiplying by four) and then dividing by quarterly average assets, which still produces the correct NIM since both sides scale equally. The error to avoid is mixing annual income with quarterly assets or vice versa.\n\nAnother bank-specific nuance: some banks report NIM on a fully tax-equivalent (FTE) basis in their earnings releases while the GAAP income statement does not include this adjustment. When comparing NIM across sources, verify whether the figures are on a GAAP or FTE basis.",
    "relatedMetrics": [
      "net-interest-margin",
      "roe",
      "roaa",
      "cost-of-funds",
      "cost-of-deposits",
      "interest-income-to-earning-assets"
    ],
    "relatedValuations": [],
    "relatedFaqs": [
      "what-is-a-good-nim-for-banks",
      "what-causes-nim-to-change",
      "what-is-net-interest-income",
      "how-to-calculate-yield-on-earning-assets"
    ],
    "relatedGlossaryTerms": [
      "Earning Assets",
      "Yield on Earning Assets",
      "Net Interest Spread"
    ],
    "cta": {
      "type": "screener",
      "target": "/screener",
      "text": "Screen banks by NIM and compare spreads"
    },
    "metaTitle": "How to Calculate Net Interest Margin (NIM) | BankSift",
    "metaDescription": "Step-by-step guide to calculating NIM for banks, including tax-equivalent adjustments, the difference from net interest spread, and SEC filing inputs."
  },
  {
    "slug": "how-to-calculate-efficiency-ratio",
    "question": "How do I calculate the efficiency ratio for a bank?",
    "cluster": "efficiency",
    "clusterName": "Bank Efficiency and Funding",
    "intentType": "procedural",
    "shortAnswer": "Divide non-interest expense by total revenue (net interest income plus non-interest income), expressed as a percentage where lower values indicate greater efficiency",
    "fullAnswer": "The primary formula for the efficiency ratio is non-interest expense divided by the sum of net interest income and non-interest income. For a bank with $60 million in non-interest expense, $80 million in net interest income, and $25 million in non-interest income, total revenue is $105 million and the efficiency ratio is 57.1%. This means the bank spends approximately 57 cents to generate each dollar of revenue.\n\nThe revenue definition matters and is a common source of discrepancy between different calculations. The standard denominator is net interest income plus non-interest income. Some analysts exclude certain volatile items from non-interest income, such as securities gains or losses, to produce a \"core\" revenue figure. Others exclude specific expense items from the numerator, such as amortization of intangible assets from acquisitions, to produce an \"adjusted\" efficiency ratio. Banks themselves sometimes report an adjusted efficiency ratio in their earnings releases. When comparing efficiency ratios across sources, confirm which definition of revenue and expense is being used.\n\nThe adjusted efficiency ratio excluding intangible asset amortization is particularly relevant for banks that have made acquisitions. Amortization of core deposit intangibles and other acquisition-related intangibles is a non-cash expense that flows through non-interest expense but does not reflect the bank's ongoing operating cost structure. Excluding this amortization provides a cleaner view of operational efficiency. The adjustment is: (non-interest expense minus intangible amortization) divided by total revenue.\n\nTo find the inputs in SEC filings, non-interest expense appears on the consolidated statements of income, typically broken out into categories such as salaries and employee benefits, occupancy expense, and other non-interest expense. Net interest income appears as a subtotal after interest income and interest expense. Non-interest income is also shown as a subtotal with its own line-item breakdown. Intangible asset amortization, if needed for the adjusted ratio, may appear as a separate line item within non-interest expense or may need to be found in the notes to financial statements.\n\nFor quarterly calculations, both the numerator and denominator should cover the same period. Using one quarter of non-interest expense divided by one quarter of revenue produces the efficiency ratio for that quarter. For a trailing twelve months (TTM) efficiency ratio, sum the four most recent quarters of non-interest expense and divide by the sum of four quarters of total revenue.\n\nA common calculation mistake is using total interest income rather than net interest income in the denominator. Total interest income does not account for the cost of funding, so using it produces an artificially low efficiency ratio that overstates operational efficiency. Another mistake is including provision for credit losses in non-interest expense. Provision expense is a separate line item on the income statement and is not part of operating expenses for efficiency ratio purposes.",
    "relatedMetrics": [
      "efficiency-ratio",
      "roe",
      "roaa",
      "net-interest-margin"
    ],
    "relatedValuations": [
      "peer-comparison-analysis"
    ],
    "relatedFaqs": [
      "what-is-a-good-efficiency-ratio",
      "what-drives-efficiency-ratio",
      "why-small-banks-higher-efficiency-ratio",
      "how-to-calculate-net-overhead-ratio"
    ],
    "relatedGlossaryTerms": [],
    "cta": {
      "type": "screener",
      "target": "/screener",
      "text": "Screen banks by Efficiency Ratio"
    },
    "metaTitle": "How to Calculate the Efficiency Ratio for a Bank | BankSift",
    "metaDescription": "Step-by-step guide to calculating the bank efficiency ratio, including the adjusted ratio excluding intangible amortization and common mistakes to avoid."
  },
  {
    "slug": "how-to-calculate-deposits-to-assets",
    "question": "How do I calculate the deposits-to-assets ratio for a bank?",
    "cluster": "efficiency",
    "clusterName": "Bank Efficiency and Funding",
    "intentType": "procedural",
    "shortAnswer": "Divide total deposits by total assets from the balance sheet, expressed as a percentage that indicates how much of the bank's funding comes from customer deposits",
    "fullAnswer": "The formula for deposits to assets is total deposits divided by total assets, expressed as a percentage. For a bank with $1.8 billion in total deposits and $2.2 billion in total assets, the ratio is 81.8%. This means deposits fund approximately 82% of the bank's asset base.\n\nThe calculation is straightforward, but the distinction between total deposits and core deposits is important for interpretation. Total deposits includes all deposit categories: non-interest-bearing checking accounts, interest-bearing checking, savings accounts, money market accounts, and certificates of deposit (CDs). Core deposits are a subset that excludes large time deposits (typically CDs above $250,000) and brokered deposits, which are considered less stable because they are more rate-sensitive and more likely to leave the bank when rates change. The deposits-to-assets ratio uses total deposits in the standard calculation. A separate analysis of core deposits as a percentage of total deposits or total assets provides a more refined view of funding stability, but this requires data from the bank's call report or 10-K disclosures rather than the summary balance sheet.\n\nTo find the inputs in SEC filings, total deposits appears on the consolidated balance sheet, typically as a single line item within the liabilities section. Some banks break deposits into subcategories on the face of the balance sheet; others provide the detail in the notes. Total assets is the final line of the asset section on the consolidated balance sheet.\n\nThis ratio uses period-end balances rather than averages, since both the numerator and denominator are balance sheet items measured at the same point in time. Using the most recent quarter-end balance sheet provides the current funding structure.\n\nA common nuance: the ratio can change due to movements in either the numerator or the denominator. A bank that is growing its securities portfolio rapidly without matching deposit growth will see deposits-to-assets decline even if deposits are stable. Conversely, a bank paying down borrowings and replacing them with deposit funding will see the ratio increase even without absolute deposit growth. Looking at both the ratio and the absolute dollar changes provides better context.\n\nThe deposits-to-assets ratio relates directly to the loans-to-deposits ratio and the loans-to-assets ratio. Together, these three ratios describe the basic structure of the bank's balance sheet: how much is funded by deposits, how much of the deposit base is being lent out, and what share of assets are deployed in loans.",
    "relatedMetrics": [
      "deposits-to-assets",
      "loans-to-deposits",
      "loans-to-assets"
    ],
    "relatedValuations": [],
    "relatedFaqs": [
      "what-is-deposits-to-assets-ratio",
      "wholesale-funding-vs-core-deposits",
      "how-to-evaluate-bank-funding-mix",
      "how-to-calculate-loans-to-deposits"
    ],
    "relatedGlossaryTerms": [
      "Core Deposits",
      "Core Deposit Premium"
    ],
    "cta": {
      "type": "screener",
      "target": "/screener",
      "text": "Screen banks by Deposits to Assets ratio"
    },
    "metaTitle": "How to Calculate Deposits to Assets for a Bank | BankSift",
    "metaDescription": "Step-by-step guide to calculating the deposits-to-assets ratio, including the difference between total and core deposits and where to find data in filings."
  },
  {
    "slug": "how-to-calculate-loans-to-deposits",
    "question": "How do I calculate the loans-to-deposits ratio for a bank?",
    "cluster": "efficiency",
    "clusterName": "Bank Efficiency and Funding",
    "intentType": "procedural",
    "shortAnswer": "Divide total loans by total deposits from the balance sheet; note whether net loans or gross loans are used, as the choice affects the result",
    "fullAnswer": "The formula for loans to deposits is total loans divided by total deposits, expressed as a percentage. For a bank with $1.5 billion in total loans and $1.8 billion in total deposits, the ratio is 83.3%. This means the bank has lent out approximately 83% of its deposit base.\n\nThe choice between net loans and gross loans matters. Gross loans represent the total outstanding loan balance before subtracting the allowance for credit losses (ACL). Net loans equal gross loans minus the allowance. The difference is typically 1% to 2% of the loan balance, but it can be larger for banks with elevated credit risk. The standard calculation uses net loans (as reported on the balance sheet), but some analysts prefer gross loans for a cleaner measure of lending activity. When comparing across sources, verify which loan figure is used.\n\nTo find the inputs in SEC filings, net loans (or \"loans, net of allowance\" or \"loans and leases, net\") appears on the consolidated balance sheet. Gross loans and the allowance for credit losses are typically disclosed separately either on the face of the balance sheet or in the accompanying notes. Total deposits appears in the liabilities section of the balance sheet.\n\nThe ratio uses period-end balances since both inputs are balance sheet figures. Using the same quarter-end for both numerator and denominator ensures consistency.\n\nThe loans-to-deposits ratio connects directly to the other two balance sheet composition ratios. Loans to deposits equals loans-to-assets divided by deposits-to-assets. If a bank's loans-to-assets ratio is 65% and its deposits-to-assets ratio is 80%, the loans-to-deposits ratio is 81.25% (0.65 / 0.80). This algebraic relationship provides a cross-check when calculating all three ratios for the same bank.\n\nA common calculation mistake is mixing time periods, such as using loans from the most recent quarterly balance sheet but deposits from the annual 10-K. Both figures should come from the same reporting date. Another error is double-counting: some balance sheets present loans in subcategories (commercial real estate loans, residential mortgage loans, consumer loans) as well as a total. Use the total line, not the sum of subcategories, which may include reclassifications or adjustments.\n\nFor banks with significant off-balance-sheet commitments (unfunded loan commitments, letters of credit), the loans-to-deposits ratio understates the total credit exposure relative to the deposit base. The on-balance-sheet ratio remains the standard measure, but analysts evaluating funding risk may also consider unfunded commitments.",
    "relatedMetrics": [
      "loans-to-deposits",
      "deposits-to-assets",
      "loans-to-assets",
      "net-interest-margin"
    ],
    "relatedValuations": [],
    "relatedFaqs": [
      "healthy-loans-to-deposits-ratio",
      "loans-to-deposits-too-high",
      "loans-to-deposits-too-low",
      "how-to-calculate-deposits-to-assets"
    ],
    "relatedGlossaryTerms": [
      "Allowance for Credit Losses (ACL)"
    ],
    "cta": {
      "type": "screener",
      "target": "/screener",
      "text": "Screen banks by Loans to Deposits ratio"
    },
    "metaTitle": "How to Calculate Loans to Deposits for a Bank | BankSift",
    "metaDescription": "Step-by-step guide to calculating the loans-to-deposits ratio, including net vs gross loans, the relationship to other balance sheet ratios, and filing sources."
  },
  {
    "slug": "how-to-calculate-loans-to-assets",
    "question": "How do I calculate the loans-to-assets ratio for a bank?",
    "cluster": "efficiency",
    "clusterName": "Bank Efficiency and Funding",
    "intentType": "procedural",
    "shortAnswer": "Divide total loans (net or gross) by total assets from the balance sheet, expressed as a percentage showing what share of the bank's assets are deployed in lending",
    "fullAnswer": "The formula for loans to assets is total loans divided by total assets, expressed as a percentage. For a bank with $1.6 billion in net loans and $2.3 billion in total assets, the ratio is 69.6%. This means approximately 70% of the bank's assets are deployed in loans, with the remaining 30% in securities, cash, and other assets.\n\nAs with the loans-to-deposits ratio, the choice between net loans and gross loans affects the result. Net loans (gross loans minus the allowance for credit losses) is the figure most commonly reported on the face of the balance sheet and is the standard input. The difference between net and gross is usually modest, but using net loans produces a slightly lower ratio. Consistency is key when comparing across banks or across time periods for the same bank.\n\nSome analysts use average total assets rather than period-end total assets in the denominator, particularly when the goal is understanding the asset deployment over a full year rather than at a single point. Average assets smooths out seasonal or event-driven fluctuations. For a point-in-time snapshot of balance sheet composition, period-end figures are standard.\n\nTo find the inputs in SEC filings, net loans appears on the consolidated balance sheet in the assets section. Total assets is the bottom line of the assets section. Both figures are readily available on the face of any bank's balance sheet in a 10-K or 10-Q filing.\n\nThe loans-to-assets ratio is the simplest of the three balance sheet composition ratios (alongside deposits-to-assets and loans-to-deposits) and provides the most direct view of asset deployment. A higher ratio indicates the bank is more heavily oriented toward lending, which generally supports higher NIM since loans yield more than most securities. A lower ratio indicates a larger allocation to securities, cash, or other assets, which may reflect a more conservative posture or limited loan demand in the bank's markets.\n\nA practical nuance: the ratio does not distinguish between loan types, and the risk profile of a loan portfolio depends heavily on its composition. Two banks with identical 70% loans-to-assets ratios have very different risk profiles if one focuses on single-family residential mortgages and the other concentrates in construction and land development loans. The ratio is a starting point for understanding asset deployment, not a measure of risk.",
    "relatedMetrics": [
      "loans-to-assets",
      "loans-to-deposits",
      "deposits-to-assets",
      "net-interest-margin"
    ],
    "relatedValuations": [],
    "relatedFaqs": [
      "how-to-calculate-loans-to-deposits",
      "how-to-calculate-deposits-to-assets",
      "evaluating-loan-portfolio-composition"
    ],
    "relatedGlossaryTerms": [],
    "cta": {
      "type": "screener",
      "target": "/screener",
      "text": "Screen banks by Loans to Assets ratio"
    },
    "metaTitle": "How to Calculate Loans to Assets for a Bank | BankSift",
    "metaDescription": "Step-by-step guide to calculating the loans-to-assets ratio, including net vs gross loans, average vs period-end assets, and what the ratio reveals."
  },
  {
    "slug": "how-to-calculate-equity-to-assets",
    "question": "How do I calculate the equity-to-assets ratio for a bank?",
    "cluster": "capital-and-risk",
    "clusterName": "Capital Strength and Asset Quality",
    "intentType": "procedural",
    "shortAnswer": "Divide total shareholders' equity by total assets from the balance sheet; the inverse of this ratio is the equity multiplier used in DuPont decomposition",
    "fullAnswer": "The formula for equity to assets is total shareholders' equity divided by total assets, expressed as a percentage. For a bank with $250 million in total equity and $2.8 billion in total assets, the ratio is 8.9%. This means equity funds approximately 9% of the bank's asset base, with the remaining 91% funded by deposits, borrowings, and other liabilities.\n\nThe calculation uses period-end balances from the consolidated balance sheet. Total shareholders' equity (also labeled \"total equity\" or \"total stockholders' equity\") includes common stock, additional paid-in capital, retained earnings, accumulated other comprehensive income or loss (AOCI), and treasury stock. Total assets is the sum of all asset line items on the balance sheet.\n\nThe inverse of the equity-to-assets ratio is the equity multiplier: total assets divided by total equity. If equity to assets is 8.9%, the equity multiplier is approximately 11.2x (1 / 0.089). The equity multiplier is a key component of the DuPont decomposition of ROE. ROE equals ROAA multiplied by the equity multiplier, so a bank with 1.0% ROAA and an equity multiplier of 11.2x produces ROE of approximately 11.2%. This relationship makes equity to assets a direct link between leverage and return on equity.\n\nTo find the inputs in SEC filings, total shareholders' equity appears at the bottom of the equity section on the consolidated balance sheet. Total assets is the final line of the asset section. Both are prominently displayed on any bank's quarterly or annual balance sheet.\n\nAn important distinction: total equity may include preferred stock and minority interests (non-controlling interests) in addition to common equity. For the standard equity-to-assets ratio, total equity is used. For a common equity-focused variant, subtract preferred stock from total equity before dividing by total assets. Banks with significant preferred stock outstanding will show a higher total equity-to-assets ratio than their common equity alone would support.\n\nACCI can cause meaningful swings in equity to assets without any change in the bank's operating performance. When interest rates rise, unrealized losses on available-for-sale securities flow through AOCI and reduce reported equity. A bank may see its equity-to-assets ratio decline by a full percentage point or more due solely to mark-to-market movements in its securities portfolio, even if its lending, deposits, and earnings are unchanged. Awareness of AOCI's impact helps avoid misinterpreting capital ratio changes as operational developments.",
    "relatedMetrics": [
      "equity-to-assets",
      "roe",
      "roaa",
      "tangible-common-equity-ratio"
    ],
    "relatedValuations": [
      "roe-pb-framework",
      "dupont-decomposition"
    ],
    "relatedFaqs": [
      "what-is-a-good-equity-to-assets-ratio",
      "how-to-calculate-roe",
      "dupont-decomposition-for-banks",
      "what-is-aoci"
    ],
    "relatedGlossaryTerms": [
      "Equity Multiplier",
      "DuPont Decomposition (for banks)"
    ],
    "cta": {
      "type": "screener",
      "target": "/screener",
      "text": "Screen banks by Equity to Assets ratio"
    },
    "metaTitle": "How to Calculate Equity to Assets for a Bank | BankSift",
    "metaDescription": "Step-by-step guide to calculating equity to assets, including the equity multiplier, the DuPont connection to ROE, and the impact of AOCI on results."
  },
  {
    "slug": "how-to-calculate-bvps",
    "question": "How do I calculate book value per share (BVPS) for a bank?",
    "cluster": "valuation",
    "clusterName": "How to Value Bank Stocks",
    "intentType": "procedural",
    "shortAnswer": "Divide total shareholders' equity by the number of common shares outstanding, adjusting for preferred stock if the bank has preferred shares",
    "fullAnswer": "The primary formula for BVPS is total shareholders' equity divided by total common shares outstanding. For a bank with $500 million in total equity and 25 million shares outstanding, BVPS is $20.00.\n\nIf the bank has preferred stock outstanding, subtract the liquidation value of preferred stock from total equity before dividing by common shares. The formula becomes (total equity minus preferred stock) divided by common shares outstanding. A bank with $500 million in total equity, $50 million in preferred stock, and 25 million common shares outstanding has a common BVPS of $18.00. Failing to subtract preferred stock overstates the book value attributable to common shareholders. Preferred stock details appear in the equity section of the balance sheet or in the notes to financial statements.\n\nUse diluted shares outstanding rather than basic shares when available, as diluted shares account for stock options, warrants, and other potentially dilutive securities. The difference is typically small for banks but can be material for banks with large stock option programs. Diluted share counts are disclosed in the earnings per share section of the income statement or the accompanying notes.\n\nTo find the inputs in SEC filings, total shareholders' equity appears on the consolidated balance sheet. Common shares outstanding is reported on the face of the balance sheet (typically in the equity section or parenthetically next to common stock) and in the notes. The 10-K cover page also discloses shares outstanding as of a recent date.\n\nBVPS growth over time is a useful measure of value creation. A bank that grows BVPS from $20.00 to $26.00 over three years has compounded book value at approximately 9.1% annually. This growth comes from retained earnings (net income minus dividends) plus or minus changes in AOCI. Comparing BVPS growth to ROE and the payout ratio provides a consistency check: a bank with 12% ROE and a 40% payout ratio should grow BVPS at approximately 7.2% annually (12% multiplied by 60% retention), assuming no share issuances, buybacks, or significant AOCI swings.\n\nA common calculation mistake is using the par value of common stock rather than total equity. Par value is a nominal accounting figure (often $0.01 to $10.00 per share) that has no relationship to actual book value. Another mistake is using shares authorized rather than shares outstanding. Authorized shares represent the maximum the bank is permitted to issue, which is typically much larger than the shares actually outstanding.",
    "relatedMetrics": [
      "book-value-per-share",
      "price-to-book",
      "tangible-book-value-per-share",
      "earnings-per-share"
    ],
    "relatedValuations": [
      "graham-number",
      "price-to-book-valuation"
    ],
    "relatedFaqs": [
      "tangible-book-value-vs-book-value",
      "how-to-calculate-tbvps",
      "how-to-calculate-price-to-book",
      "what-is-a-good-pb-for-banks"
    ],
    "relatedGlossaryTerms": [
      "Tangible Book Value",
      "Tangible Book Value Per Share (TBVPS)"
    ],
    "cta": {
      "type": "screener",
      "target": "/screener",
      "text": "Screen banks by BVPS and related valuation metrics"
    },
    "metaTitle": "How to Calculate Book Value Per Share (BVPS) | BankSift",
    "metaDescription": "Step-by-step guide to calculating BVPS for banks, including preferred stock adjustments, BVPS growth as a value creation measure, and common mistakes."
  },
  {
    "slug": "how-to-calculate-price-to-book",
    "question": "How do I calculate the price-to-book (P/B) ratio for a bank?",
    "cluster": "valuation",
    "clusterName": "How to Value Bank Stocks",
    "intentType": "procedural",
    "shortAnswer": "Divide the current share price by book value per share, or equivalently divide market capitalization by total shareholders' equity",
    "fullAnswer": "The primary formula for P/B is current share price divided by book value per share. If a bank's stock trades at $24.00 and its BVPS is $20.00, the P/B ratio is 1.2x. Equivalently, P/B can be calculated as market capitalization divided by total shareholders' equity. A bank with a $600 million market cap and $500 million in total equity also has a P/B of 1.2x. Both methods produce the same result.\n\nAn important algebraic relationship links P/B to P/E and ROE: P/B equals P/E multiplied by ROE. If a bank trades at 10x earnings and has ROE of 12%, its P/B is 1.2x (10 times 0.12). This relationship provides a useful cross-check and reveals how valuation multiples are interconnected. It also explains why high-ROE banks tend to trade at higher P/B multiples.\n\nThe justified P/B multiple from the ROE-P/B framework estimates what a bank should trade at based on its fundamentals: justified P/B equals (ROE minus g) divided by (r minus g), where g is the sustainable growth rate and r is the cost of equity. A bank with 12% ROE, 8% retention-rate-implied growth, and a 10% cost of equity has a justified P/B of approximately 2.0x. Comparing the actual P/B to the justified P/B indicates whether the bank appears overvalued or undervalued relative to its fundamentals.\n\nTo find the inputs, the current share price is available from any financial data source or stock exchange. BVPS must be calculated from the most recent balance sheet (see the BVPS calculation guide). Market capitalization equals the share price multiplied by shares outstanding. Total shareholders' equity appears on the consolidated balance sheet.\n\nFor banks with preferred stock, use common equity (total equity minus preferred stock) in the denominator and common shares in the BVPS calculation to produce a P/B ratio that reflects the common shareholders' position accurately. Using total equity without subtracting preferred stock overstates book value per common share and understates the P/B ratio.\n\nA common calculation mistake is using stale book value data with a current share price. Since book value changes every quarter as earnings are retained and AOCI fluctuates, using a book value from several quarters ago produces an inaccurate P/B. The most recent quarterly balance sheet should always be used.\n\nAnother nuance: AOCI-driven fluctuations in book value cause P/B to move even when the share price is unchanged. When interest rates rise and available-for-sale securities lose value, AOCI declines, book value falls, and P/B rises mechanically. This can make a bank appear more expensive on a P/B basis without any change in its stock price or operating fundamentals.",
    "relatedMetrics": [
      "price-to-book",
      "book-value-per-share",
      "price-to-earnings",
      "roe",
      "price-to-tangible-book-value"
    ],
    "relatedValuations": [
      "price-to-book-valuation",
      "roe-pb-framework",
      "graham-number"
    ],
    "relatedFaqs": [
      "what-is-a-good-pb-for-banks",
      "pb-below-one-undervalued",
      "how-to-calculate-justified-pb",
      "how-to-calculate-bvps"
    ],
    "relatedGlossaryTerms": [
      "Justified P/B Multiple"
    ],
    "cta": {
      "type": "screener",
      "target": "/screener",
      "text": "Screen banks by P/B ratio"
    },
    "metaTitle": "How to Calculate Price-to-Book (P/B) Ratio | BankSift",
    "metaDescription": "Step-by-step guide to calculating P/B for banks, including the P/B = P/E x ROE relationship, justified P/B, and common calculation pitfalls."
  },
  {
    "slug": "how-to-calculate-price-to-earnings",
    "question": "How do I calculate the price-to-earnings (P/E) ratio for a bank?",
    "cluster": "valuation",
    "clusterName": "How to Value Bank Stocks",
    "intentType": "procedural",
    "shortAnswer": "Divide the current share price by diluted earnings per share; for banks, distinguish between trailing P/E (using reported earnings) and normalized P/E (adjusting for unusual provision or one-time items)",
    "fullAnswer": "The primary formula for P/E is current share price divided by diluted earnings per share. If a bank trades at $24.00 per share and its TTM diluted EPS is $2.40, the P/E ratio is 10.0x. This means investors are paying $10 for each dollar of annual earnings.\n\nThe trailing P/E uses actual reported earnings from the most recent twelve months. To calculate TTM EPS from quarterly filings, sum the diluted EPS from the four most recent quarters. Alternatively, sum the net income available to common shareholders from four quarters and divide by the most recent diluted share count. The direct summation of quarterly EPS is the simpler approach but may introduce slight rounding differences.\n\nThe algebraic relationship P/E equals P/B divided by ROE provides a cross-check. A bank with P/B of 1.2x and ROE of 12% should have a P/E of approximately 10x (1.2 / 0.12). If the calculated P/E diverges significantly from this estimate, verify the inputs.\n\nNormalized P/E is particularly relevant for banks because provision for credit losses can swing dramatically between periods, making reported earnings temporarily elevated or depressed without reflecting the bank's sustainable earning power. During periods of high provisions, reported EPS is low and trailing P/E appears high, potentially making a healthy bank look expensive. During provision releases, EPS is inflated and P/E appears artificially low. Normalized P/E replaces actual provision expense with a long-term average provision level (often expressed as a percentage of average loans based on several years of history) and recalculates earnings accordingly. This produces a more stable earnings figure for valuation purposes.\n\nForward P/E uses analyst consensus earnings estimates for the next twelve months rather than trailing earnings. Forward P/E is widely used for large banks with broad analyst coverage but may not be available for smaller community banks that have limited or no sell-side coverage.\n\nTo find the trailing P/E inputs, the current share price is available from financial data providers. Diluted EPS is reported on the consolidated statements of income in each 10-Q and 10-K. The 10-K provides the full-year figure directly. For a TTM calculation between annual filings, sum the quarterly figures.\n\nA common mistake is using basic EPS rather than diluted EPS. Diluted EPS accounts for potentially dilutive securities (stock options, restricted stock units, convertible instruments) and is the standard for investment analysis. Another mistake is calculating P/E for a bank with negative earnings, which produces a negative or meaningless ratio. P/E is not informative for banks that are currently unprofitable.",
    "relatedMetrics": [
      "price-to-earnings",
      "earnings-per-share",
      "price-to-book",
      "roe"
    ],
    "relatedValuations": [
      "price-to-book-valuation",
      "peer-comparison-analysis",
      "roe-pb-framework"
    ],
    "relatedFaqs": [
      "what-is-a-good-pe-for-banks",
      "how-to-calculate-eps",
      "how-to-calculate-price-to-book",
      "why-bank-valuation-is-different"
    ],
    "relatedGlossaryTerms": [
      "Provision for Credit Losses"
    ],
    "cta": {
      "type": "screener",
      "target": "/screener",
      "text": "Screen banks by P/E ratio"
    },
    "metaTitle": "How to Calculate P/E Ratio for a Bank Stock | BankSift",
    "metaDescription": "Step-by-step guide to calculating P/E for banks, including trailing vs normalized P/E, the P/E = P/B / ROE cross-check, and provision volatility adjustments."
  },
  {
    "slug": "how-to-calculate-eps",
    "question": "How do I calculate earnings per share (EPS) for a bank?",
    "cluster": "valuation",
    "clusterName": "How to Value Bank Stocks",
    "intentType": "procedural",
    "shortAnswer": "Divide net income available to common shareholders by diluted shares outstanding; for TTM calculations, sum the four most recent quarters of net income and use the latest diluted share count",
    "fullAnswer": "The primary formula for diluted EPS is net income available to common shareholders divided by diluted shares outstanding. Net income available to common shareholders equals reported net income minus preferred stock dividends. For a bank with $40 million in net income, $2 million in preferred dividends, and 20 million diluted shares outstanding, EPS is $1.90.\n\nThe distinction between basic and diluted EPS matters for investment analysis. Basic EPS uses the weighted average number of common shares actually outstanding during the period. Diluted EPS adds shares that would be outstanding if all dilutive securities (stock options, restricted stock units, warrants, convertible preferred stock or debt) were exercised or converted. Diluted EPS is always equal to or lower than basic EPS, and it is the standard measure for valuation ratios like P/E and the Graham Number.\n\nSubtracting preferred dividends is essential for banks with preferred stock outstanding. Many banks, particularly larger institutions, have one or more series of preferred stock. The preferred dividends reduce the income available to common shareholders and must be deducted before dividing by common shares. Preferred dividend amounts are disclosed in the income statement (sometimes as a line item between net income and net income available to common shareholders) or in the notes to financial statements.\n\nFor trailing twelve months (TTM) EPS calculations from quarterly data, sum the net income available to common shareholders from the four most recent 10-Q filings. Then divide by the diluted share count from the most recent quarter. An alternative approach sums the diluted EPS figures reported in each of the four quarters, though minor rounding differences may result.\n\nA timing nuance: the 10-K reports full-year EPS directly, but between annual filings, the TTM figure must be assembled from quarterly reports. For a bank that has filed Q1, Q2, and Q3 of the current year plus the prior year's 10-K, the TTM EPS equals current Q1 + Q2 + Q3 + prior Q4 earnings, divided by the most recent diluted share count.\n\nTo find the inputs in SEC filings, net income and EPS (both basic and diluted) are reported on the consolidated statements of income. Preferred dividends declared are shown either as a line item on the income statement or in the equity section notes. Diluted shares outstanding are disclosed in the EPS footnote and in the per-share data on the income statement.\n\nA common mistake is comparing EPS across banks of different sizes without adjusting for the number of shares. EPS reflects net income per share, not total profitability. A bank with $2.00 EPS and 50 million shares outstanding is more profitable in total than a bank with $5.00 EPS and 10 million shares. For total profitability comparisons, use net income, ROE, or ROAA.",
    "relatedMetrics": [
      "earnings-per-share",
      "price-to-earnings",
      "book-value-per-share",
      "roe"
    ],
    "relatedValuations": [
      "graham-number",
      "margin-of-safety"
    ],
    "relatedFaqs": [
      "how-to-calculate-price-to-earnings",
      "what-is-trailing-twelve-months",
      "graham-number-for-bank-stocks",
      "how-to-calculate-bvps"
    ],
    "relatedGlossaryTerms": [],
    "cta": {
      "type": "screener",
      "target": "/screener",
      "text": "Screen banks by EPS"
    },
    "metaTitle": "How to Calculate EPS for a Bank Stock | BankSift",
    "metaDescription": "Step-by-step guide to calculating EPS for banks, including basic vs diluted shares, preferred dividend adjustments, and TTM calculations from quarterly filings."
  },
  {
    "slug": "how-to-calculate-dividend-payout-ratio",
    "question": "How do I calculate the dividend payout ratio for a bank?",
    "cluster": "dividends",
    "clusterName": "Bank Dividends and Shareholder Returns",
    "intentType": "procedural",
    "shortAnswer": "Divide dividends per share by earnings per share, or equivalently divide total common dividends paid by net income available to common shareholders",
    "fullAnswer": "The primary formula for the dividend payout ratio is dividends per common share divided by diluted earnings per share, expressed as a percentage. For a bank paying $0.80 per share in annual dividends with diluted EPS of $2.00, the payout ratio is 40%. This means the bank distributes 40% of its earnings to shareholders as dividends and retains the remaining 60%.\n\nThe equivalent aggregate formula is total common dividends paid divided by net income available to common shareholders. A bank with $40 million in net income available to common shareholders that pays $16 million in total common dividends has a 40% payout ratio. Both formulas produce the same result and can serve as cross-checks.\n\nThe retention ratio is the complement of the payout ratio: retention ratio equals 1 minus the payout ratio. If the payout ratio is 40%, the retention ratio is 60%. The retention ratio connects directly to the sustainable growth rate: sustainable growth equals ROE multiplied by the retention ratio. A bank with 12% ROE and a 60% retention ratio has a sustainable growth rate of approximately 7.2% per year. This formula estimates how quickly the bank can grow its equity (and by extension its assets and earnings) through internal capital generation without issuing new shares.\n\nTo find the inputs in SEC filings, dividends per common share are disclosed in the consolidated statements of changes in stockholders' equity and typically in the earnings per share table or the selected financial data section of the 10-K. Total dividends paid to common shareholders appear in the consolidated statements of cash flows under financing activities. EPS is on the income statement.\n\nFor TTM calculations, sum the dividends per share declared over the four most recent quarters and divide by TTM diluted EPS. Alternatively, sum total dividends paid from four quarters of cash flow statements and divide by TTM net income available to common shareholders.\n\nA common calculation mistake is using dividends paid from the cash flow statement without confirming they match the dividends declared in the current period. Timing differences between dividend declaration and payment can cause the cash flow figure to span different quarters than the income figure. Using dividends declared rather than dividends paid provides a cleaner match to the period's earnings.\n\nAnother consideration: a payout ratio above 100% means the bank paid more in dividends than it earned during the period. This draws down retained earnings and reduces book value. While a bank can sustain this temporarily (using accumulated capital), a persistent payout ratio above 100% is unsustainable and typically triggers regulatory scrutiny. For banks with temporarily depressed earnings due to elevated provisions, the payout ratio may spike above 100% even though the dividend itself has not changed.",
    "relatedMetrics": [
      "dividend-payout-ratio",
      "earnings-per-share",
      "roe"
    ],
    "relatedValuations": [
      "dividend-discount-model",
      "gordon-growth-model"
    ],
    "relatedFaqs": [
      "good-dividend-payout-ratio-for-banks",
      "how-to-evaluate-dividend-safety",
      "roe-payout-ratio-dividend-growth",
      "sustainable-growth-rate-and-dividends"
    ],
    "relatedGlossaryTerms": [
      "Retention Ratio",
      "Sustainable Growth Rate"
    ],
    "cta": {
      "type": "screener",
      "target": "/screener",
      "text": "Screen banks by Dividend Payout Ratio"
    },
    "metaTitle": "How to Calculate Dividend Payout Ratio for a Bank | BankSift",
    "metaDescription": "Step-by-step guide to calculating the dividend payout ratio, including the retention ratio, sustainable growth rate connection, and common timing mistakes."
  }
];

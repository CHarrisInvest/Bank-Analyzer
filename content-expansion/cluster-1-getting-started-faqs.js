/**
 * BankSift Content Expansion — Batch 1, Prompt 3
 * Complete FAQ entries for Cluster 1: Getting Started with Bank Stocks
 *
 * USAGE:
 *   Add all entries in the CLUSTER_1_FAQS array to the main FAQS array
 *   in src/data/content/faqs.js.
 *
 * CONVENTIONS:
 *   - Plain text only (no HTML or Markdown) in all fields
 *   - fullAnswer uses \n\n for paragraph breaks
 *   - shortAnswer has no trailing period
 *   - metaTitle under 60 characters where possible, always ends with "| BankSift"
 *   - metaDescription is 120-160 characters
 *   - relatedMetrics / relatedValuations / relatedFaqs slugs must reference valid entries
 *   - Second/third person voice; beginner-oriented tone for this cluster
 */

export const CLUSTER_1_FAQS = [

  // ───────────────────────────────────────────────
  // Q1: What are bank stocks and how do they differ from other stocks?
  // ───────────────────────────────────────────────
  {
    slug: 'what-are-bank-stocks',
    question: 'What are bank stocks and how do they differ from other stocks?',
    cluster: 'getting-started',
    clusterName: 'Getting Started with Bank Stocks',
    intentType: 'definitional',

    shortAnswer: 'Bank stocks are shares in publicly traded banks and bank holding companies, and they differ from other stocks because banks operate with unique financial structures, regulatory oversight, and accounting conventions that require specialized analysis',

    fullAnswer:
      'Bank stocks are shares of ownership in publicly traded commercial banks, savings institutions, and bank holding companies. They trade on stock exchanges like any other equity, but the businesses behind them operate in ways that set them apart from nearly every other industry.\n\n' +
      'The most fundamental difference is leverage. A typical industrial company might fund 30-50% of its assets with debt. A bank funds 88-92% of its assets with deposits and borrowings, leaving only 8-12% funded by equity. This extreme leverage means that small changes in asset values or earnings have an outsized impact on shareholder returns, both positive and negative. A 1% return on assets translates to roughly a 10% return on equity at typical bank leverage levels.\n\n' +
      'Bank financial statements also look different from those of non-financial companies. Revenue for most companies comes from selling products or services. For banks, the primary revenue source is net interest income: the spread between interest earned on loans and investments and interest paid on deposits and borrowings. Fee income from services, wealth management, and transaction processing provides a secondary revenue stream. Standard metrics like EV/EBITDA, operating margin, and free cash flow, which are staples of industrial company analysis, do not apply to banks because debt is an operating input rather than a financing choice.\n\n' +
      'Regulation adds another layer of distinction. Banks are among the most heavily regulated businesses in the economy. Federal and state regulators set minimum capital requirements, conduct examinations, approve or deny mergers and acquisitions, and can restrict dividend payments. These regulatory constraints directly affect profitability, growth potential, and shareholder returns in ways that have no parallel in most other industries.\n\n' +
      'The asset quality dimension is also unique to banks. A manufacturer worries about inventory obsolescence; a bank worries about loan defaults. The provision for credit losses, a non-cash charge reflecting expected future loan losses, is one of the most significant and volatile components of a bank\'s income statement. It can swing from a minor expense in good times to a profit-consuming charge during economic downturns.\n\n' +
      'Because of these differences, bank stock analysis relies on a distinct set of metrics. Return on equity (ROE), return on average assets (ROAA), net interest margin (NIM), efficiency ratio, and price-to-book (P/B) ratio are the core measures that bank investors focus on. General-purpose stock screeners and valuation tools often lack these bank-specific metrics, which is why specialized tools exist for bank stock analysis.',

    relatedMetrics: ['roe', 'roaa', 'net-interest-margin', 'price-to-book'],
    relatedValuations: [],
    relatedFaqs: ['why-invest-in-bank-stocks', 'how-do-banks-make-money', 'why-bank-financials-are-different'],
    relatedGlossaryTerms: ['Bank Holding Company', 'Net Interest Income'],

    cta: {
      type: 'learn-metric',
      target: '/metrics',
      text: 'Learn about the key metrics used to analyze bank stocks'
    },

    metaTitle: 'What Are Bank Stocks? Key Differences | BankSift',
    metaDescription: 'Learn what bank stocks are and how they differ from other stocks in leverage, financial statements, regulation, and the metrics used to analyze them.'
  },

  // ───────────────────────────────────────────────
  // Q2: Why invest in bank stocks?
  // ───────────────────────────────────────────────
  {
    slug: 'why-invest-in-bank-stocks',
    question: 'Why invest in bank stocks?',
    cluster: 'getting-started',
    clusterName: 'Getting Started with Bank Stocks',
    intentType: 'conceptual',

    shortAnswer: 'Bank stocks offer a combination of dividend income, exposure to economic growth, and valuation transparency that makes them attractive to income and value investors',

    fullAnswer:
      'Bank stocks have several characteristics that attract a broad range of investors, from income-focused retirees to deep value analysts.\n\n' +
      'Dividends are a primary draw. Banks have historically been among the most reliable dividend payers in the equity market. Their business model generates steady cash flows from lending and fee income, and mature banks with limited reinvestment needs often return a significant portion of earnings to shareholders. Many community and regional banks have maintained or grown their dividends through multiple economic cycles, making them appealing for investors who depend on portfolio income.\n\n' +
      'Valuation transparency is another advantage. Because bank balance sheets consist primarily of financial instruments (loans, securities, deposits) carried near fair value under accounting standards, book value is a more meaningful anchor for valuation than it is for most industries. Investors can assess a bank\'s price-to-book ratio with reasonable confidence that the underlying book value approximates the net asset value of the institution. This transparency gives value investors a concrete foundation for analysis.\n\n' +
      'Bank profitability is tied to economic growth and interest rates, providing a form of macroeconomic exposure. When the economy grows, loan demand increases, credit quality improves, and banks earn more. Rising interest rates, within a range, tend to expand net interest margins as the rates banks earn on loans increase faster than the rates they pay on deposits. For investors with a positive long-term view of economic growth, bank stocks offer a leveraged way to participate.\n\n' +
      'The sheer number of publicly traded banks creates opportunity through inefficiency. There are over 300 publicly traded banks in the United States, many of them community and small regional institutions with limited analyst coverage. This lack of coverage means that mispriced stocks are more common in the banking sector than in heavily followed industries like technology or consumer goods. Patient investors willing to do their own research can find banks trading at meaningful discounts to intrinsic value.\n\n' +
      'Banks also offer exposure to local and regional economic dynamics. A community bank in a growing suburban market captures the economic vitality of that specific region. Investors who understand a particular market\'s growth drivers can identify banks that are positioned to benefit.\n\n' +
      'Like any investment, bank stocks carry risks, including credit cycle exposure, interest rate sensitivity, and regulatory uncertainty. Understanding these risks and the metrics used to evaluate them is essential before investing.',

    relatedMetrics: ['roe', 'dividend-payout-ratio', 'net-interest-margin', 'price-to-book'],
    relatedValuations: ['dividend-discount-model', 'price-to-book-valuation'],
    relatedFaqs: ['what-are-bank-stocks', 'advantages-disadvantages-bank-stocks', 'what-to-know-before-buying-bank-stocks'],
    relatedGlossaryTerms: [],

    cta: {
      type: 'learn-metric',
      target: '/metrics',
      text: 'Explore the metrics that drive bank stock performance'
    },

    metaTitle: 'Why Invest in Bank Stocks? | BankSift',
    metaDescription: 'Discover why investors are attracted to bank stocks, including reliable dividends, valuation transparency, economic exposure, and inefficiency in small-cap coverage.'
  },

  // ───────────────────────────────────────────────
  // Q3: Advantages and disadvantages of investing in bank stocks
  // ───────────────────────────────────────────────
  {
    slug: 'advantages-disadvantages-bank-stocks',
    question: 'What are the advantages and disadvantages of investing in bank stocks?',
    cluster: 'getting-started',
    clusterName: 'Getting Started with Bank Stocks',
    intentType: 'evaluative',

    shortAnswer: 'Bank stocks offer strong dividends, transparent valuations, and economic leverage, but carry risks from credit cycles, interest rate sensitivity, regulatory constraints, and balance sheet opacity',

    fullAnswer:
      'Bank stocks present a distinct set of advantages and risks that investors should evaluate before building a position.\n\n' +
      'On the advantage side, dividend income stands out. Banks generate predictable cash flows from lending and fee income, and many maintain long track records of consistent or growing dividend payments. Mature banks with limited reinvestment opportunities often distribute 30-50% of earnings as dividends. Valuation transparency is another strength. Bank balance sheets are composed mostly of financial instruments, making book value a meaningful measure of net asset value. The price-to-book ratio provides an intuitive anchor that is harder to derive for technology or consumer brand companies. Banks also provide leveraged exposure to economic expansion. Loan demand, credit quality, and profitability all tend to improve as the economy grows. For investors seeking economic sensitivity without the volatility of commodity-linked sectors, banks offer a compelling option. Market inefficiency is a practical advantage as well. With hundreds of publicly traded community and regional banks receiving little or no analyst coverage, the sector offers opportunities for investors willing to conduct independent research.\n\n' +
      'The disadvantages are equally important. Credit cycle risk is the most significant. During economic downturns, loan defaults rise, provisions for credit losses consume earnings, and bank stock prices can decline sharply. The 2008 financial crisis and subsequent periods of banking stress demonstrated that credit losses can threaten not just profits but the solvency of individual institutions. Interest rate sensitivity creates a different form of risk. While moderately rising rates often benefit bank margins, rapid rate increases can cause unrealized losses in bond portfolios, trigger deposit flight as customers seek higher-yielding alternatives, and slow loan demand. Flat or inverted yield curves compress net interest margins even at well-run banks. Regulatory risk is ever-present. Capital requirements, stress testing mandates, dividend restrictions, and compliance costs all constrain bank profitability and strategic flexibility. Regulatory changes can alter the competitive landscape and profitability outlook with limited warning. Balance sheet complexity poses analytical challenges. Loan quality is difficult to assess from the outside. Held-to-maturity securities may contain unrealized losses not visible in financial statements. Off-balance-sheet exposures and derivative positions add further layers of complexity at larger institutions.\n\n' +
      'Understanding these tradeoffs is the first step toward making informed decisions about bank stock investing. The key is matching an investor\'s risk tolerance and analytical capacity to the specific characteristics of the bank stocks they consider.',

    relatedMetrics: ['roe', 'net-interest-margin', 'price-to-book', 'dividend-payout-ratio'],
    relatedValuations: [],
    relatedFaqs: ['why-invest-in-bank-stocks', 'what-to-know-before-buying-bank-stocks', 'are-bank-stocks-cyclical'],
    relatedGlossaryTerms: ['Provision for Credit Losses'],

    cta: {
      type: 'learn-metric',
      target: '/metrics',
      text: 'Learn the metrics that help evaluate bank stock risks and rewards'
    },

    metaTitle: 'Bank Stock Pros and Cons | BankSift',
    metaDescription: 'Understand the advantages and disadvantages of investing in bank stocks, from dividends and valuation transparency to credit cycle and regulatory risks.'
  },

  // ───────────────────────────────────────────────
  // Q4: How do banks make money?
  // ───────────────────────────────────────────────
  {
    slug: 'how-do-banks-make-money',
    question: 'How do banks make money?',
    cluster: 'getting-started',
    clusterName: 'Getting Started with Bank Stocks',
    intentType: 'conceptual',

    shortAnswer: 'Banks earn money primarily through the interest rate spread between what they charge borrowers and what they pay depositors, supplemented by fees for financial services',

    fullAnswer:
      'Banks make money through two primary channels: net interest income and non-interest income. Understanding both is essential to evaluating a bank\'s profitability.\n\n' +
      'Net interest income is the dominant revenue source for most commercial banks, typically accounting for 70-85% of total revenue. The concept is straightforward: a bank gathers deposits from customers and pays them a certain interest rate (or nothing, in the case of non-interest-bearing checking accounts). It then lends that money to borrowers at a higher rate for mortgages, business loans, commercial real estate, and other purposes. It also invests a portion in securities like government bonds and mortgage-backed securities. The difference between the interest the bank earns and the interest it pays is net interest income. The efficiency of this spread is measured by net interest margin (NIM), which expresses net interest income as a percentage of average earning assets.\n\n' +
      'Non-interest income, sometimes called fee income, comes from a variety of services. These include service charges on deposit accounts, ATM and interchange fees, wealth management and trust fees, mortgage origination and servicing fees, insurance commissions, and gains from securities trading. For large money center banks, investment banking fees, trading revenue, and capital markets activities can represent a substantial share of total revenue. For community banks, fee income is typically a smaller but still meaningful supplement to interest income.\n\n' +
      'On the expense side, banks incur non-interest expenses (salaries, benefits, technology, occupancy, regulatory compliance) and provision for credit losses. The provision is a critical expense unique to banking: it reflects management\'s estimate of expected loan losses and directly reduces net income. When economic conditions deteriorate and borrowers default, provisions increase and can consume a large share of revenue.\n\n' +
      'The simplified bank profit equation is: net interest income plus non-interest income, minus non-interest expense, minus provision for credit losses, minus taxes, equals net income. The efficiency ratio measures how much of each revenue dollar is consumed by operating expenses. A bank that generates $100 million in total revenue, spends $58 million on operating expenses, sets aside $5 million for loan losses, and pays $9 million in taxes earns $28 million in net income.\n\n' +
      'The balance between these components varies by bank type. A community bank focused on commercial lending may derive 80% of revenue from net interest income, while a large bank with asset management and investment banking divisions may rely on fee income for 40% or more of total revenue.',

    relatedMetrics: ['net-interest-margin', 'efficiency-ratio', 'roe', 'roaa'],
    relatedValuations: [],
    relatedFaqs: ['what-are-bank-stocks', 'what-is-net-interest-income', 'what-is-non-interest-income'],
    relatedGlossaryTerms: ['Net Interest Income', 'Fee Income', 'Provision for Credit Losses', 'Earning Assets'],

    cta: {
      type: 'learn-metric',
      target: '/metrics/net-interest-margin',
      text: 'Learn about net interest margin, the key measure of bank lending profitability'
    },

    metaTitle: 'How Do Banks Make Money? | BankSift',
    metaDescription: 'Learn how banks generate revenue through net interest income from lending and fee income from financial services, and how expenses determine profitability.'
  },

  // ───────────────────────────────────────────────
  // Q5: Commercial banks vs investment banks
  // ───────────────────────────────────────────────
  {
    slug: 'commercial-vs-investment-banks',
    question: 'What is the difference between commercial banks and investment banks?',
    cluster: 'getting-started',
    clusterName: 'Getting Started with Bank Stocks',
    intentType: 'comparative',

    shortAnswer: 'Commercial banks take deposits and make loans to earn interest income, while investment banks help companies raise capital, advise on mergers, and trade securities for fee and trading revenue',

    fullAnswer:
      'Commercial banks and investment banks serve different functions in the financial system, earn revenue in different ways, and require different analytical approaches.\n\n' +
      'Commercial banks accept deposits from individuals and businesses and use those funds to make loans: mortgages, business loans, commercial real estate loans, consumer loans, and others. Their primary revenue source is net interest income, the spread between what they earn on loans and investments and what they pay on deposits. They also earn fees from deposit accounts, payment processing, and other banking services. Commercial banks are regulated by agencies such as the FDIC, OCC, and the Federal Reserve, which set capital requirements, conduct examinations, and insure deposits up to $250,000 per depositor per institution. The vast majority of publicly traded banks covered by bank-specific analytical tools are commercial banks or bank holding companies that own commercial banks.\n\n' +
      'Investment banks operate in capital markets rather than deposit-taking and lending. Their primary activities include underwriting securities (helping companies issue stocks and bonds), advising corporations on mergers and acquisitions, trading securities and derivatives, and providing asset management services. Revenue comes predominantly from advisory fees, underwriting fees, trading gains, and management fees rather than interest income. Investment banks do not typically take retail deposits or make traditional commercial loans.\n\n' +
      'The analytical frameworks differ significantly. Commercial bank analysis centers on metrics like ROE, ROAA, NIM, efficiency ratio, P/B, and credit quality measures. Investment bank analysis focuses more on revenue per employee, compensation ratios, trading revenue volatility, and deal pipeline. The standard bank-specific valuation metrics (P/B, ROE-P/B framework, Graham Number for banks) are designed for commercial banks and do not translate directly to pure investment banks.\n\n' +
      'In practice, the distinction has blurred. Several of the largest US financial institutions (often called money center banks) combine commercial banking, investment banking, wealth management, and other activities under one holding company. When analyzing these diversified institutions, it helps to understand which segments are driving results and to recognize that blended metrics reflect a mix of commercial and capital markets activities.\n\n' +
      'For investors focused on bank stock analysis, the primary universe consists of commercial banks and bank holding companies. The metrics and valuation methods on BankSift are designed for these institutions.',

    relatedMetrics: ['net-interest-margin', 'roe', 'efficiency-ratio'],
    relatedValuations: [],
    relatedFaqs: ['what-are-bank-stocks', 'types-of-publicly-traded-banks', 'what-are-money-center-banks'],
    relatedGlossaryTerms: ['Money Center Bank', 'Bank Holding Company', 'Financial Holding Company'],

    cta: {
      type: 'glossary',
      target: '/glossary',
      text: 'Explore banking terms and definitions in the glossary'
    },

    metaTitle: 'Commercial Banks vs Investment Banks | BankSift',
    metaDescription: 'Understand the key differences between commercial banks and investment banks in business model, revenue sources, regulation, and analysis approach.'
  },

  // ───────────────────────────────────────────────
  // Q6: What are community banks?
  // ───────────────────────────────────────────────
  {
    slug: 'what-are-community-banks',
    question: 'What are community banks and why do investors care about them?',
    cluster: 'getting-started',
    clusterName: 'Getting Started with Bank Stocks',
    intentType: 'definitional',

    shortAnswer: 'Community banks are smaller, locally focused institutions that serve specific geographic markets, attracting investors with their relationship-based lending, stable deposit franchises, and potential as acquisition targets',

    fullAnswer:
      'Community banks are smaller banking institutions that focus on serving a specific geographic market, typically a city, county, or cluster of counties. While there is no single official definition, the FDIC generally classifies banks with total assets under approximately $10 billion as community banks, and many are significantly smaller, with assets ranging from $100 million to $3 billion. Despite their individual size, community banks as a group play a significant role in the US financial system, particularly in small business lending, agricultural finance, and local commercial real estate.\n\n' +
      'Community banks differ from larger institutions in several ways that matter for investors. Their lending is relationship-based: loan officers know the borrowers, understand the local economy, and make credit decisions based on direct knowledge rather than purely algorithmic underwriting. This relationship model can produce higher-quality loan portfolios and stronger credit performance through economic cycles, though it also means growth is constrained by the size and health of the local market. Their deposit bases tend to be composed of stable core deposits (checking, savings, and small CDs from local customers), providing low-cost, reliable funding that supports attractive net interest margins.\n\n' +
      'Investors are drawn to community banks for several reasons. Valuation inefficiency is a primary factor. Most community banks have no analyst coverage and limited institutional ownership, which means their stock prices are more likely to diverge from fundamental value. Patient investors who conduct their own analysis can identify banks trading at meaningful discounts to book value or at low multiples of earnings. Dividend income is another attraction, as many community banks have long histories of regular dividend payments. Acquisition potential adds a speculative element: the US banking industry has been consolidating for decades, and community banks are frequent acquisition targets. Acquirers typically pay premiums of 1.3x to 2.0x book value or higher, depending on the deposit franchise and market.\n\n' +
      'Community banks also carry specific risks. Their concentrated geographic exposure means a local economic downturn can disproportionately affect loan quality. Limited product diversification makes them more dependent on net interest income than fee income. Smaller scale translates to higher per-unit regulatory compliance costs, which pressures efficiency ratios. And low trading volume in community bank stocks can create liquidity risk, making it difficult to buy or sell shares without affecting the price.\n\n' +
      'For investors willing to do the work, community banks offer a combination of income, value, and potential upside that is increasingly rare in public equity markets.',

    relatedMetrics: ['price-to-book', 'net-interest-margin', 'efficiency-ratio', 'dividend-payout-ratio'],
    relatedValuations: ['price-to-book-valuation', 'peer-comparison-analysis'],
    relatedFaqs: ['types-of-publicly-traded-banks', 'community-vs-regional-vs-money-center', 'how-to-screen-community-banks'],
    relatedGlossaryTerms: ['Community Bank', 'Core Deposits'],

    cta: {
      type: 'search',
      target: '/search',
      text: 'Search for community banks by name or ticker'
    },

    metaTitle: 'What Are Community Banks? | BankSift',
    metaDescription: 'Learn what community banks are, how they operate, and why investors seek them out for dividends, value opportunities, and acquisition potential.'
  },

  // ───────────────────────────────────────────────
  // Q7: Bank vs bank holding company
  // ───────────────────────────────────────────────
  {
    slug: 'bank-vs-bank-holding-company',
    question: 'What is the difference between a bank and a bank holding company?',
    cluster: 'getting-started',
    clusterName: 'Getting Started with Bank Stocks',
    intentType: 'comparative',

    shortAnswer: 'A bank is the regulated institution that takes deposits and makes loans, while a bank holding company is the parent corporation that owns the bank and whose stock trades on public exchanges',

    fullAnswer:
      'When investors buy "bank stocks," they are almost always buying shares of a bank holding company (BHC), not the bank itself. Understanding this distinction clarifies how bank stocks are structured and where the financial data comes from.\n\n' +
      'A bank is a chartered financial institution authorized by federal or state regulators to accept deposits, make loans, and provide other financial services. The bank holds the actual assets (loans, securities, cash), liabilities (deposits, borrowings), and equity on its balance sheet. It is regulated and examined by the appropriate banking agencies: the OCC for nationally chartered banks, state banking departments and the FDIC for state-chartered banks, and the Federal Reserve for state member banks.\n\n' +
      'A bank holding company is a corporation that owns or controls one or more banks. The holding company structure serves several purposes. It provides organizational flexibility, allowing the parent to engage in activities (such as insurance, securities, or data processing) that the bank itself may not be permitted to conduct. It facilitates acquisitions, because the holding company can acquire other banks or holding companies without merging bank charters. And it provides a single publicly traded entity for investors to buy and sell.\n\n' +
      'When a bank holding company\'s stock is listed on an exchange, investors are buying shares of the holding company. The holding company\'s consolidated financial statements include the bank subsidiary and any other subsidiaries. Most of the financial data used in bank stock analysis (total assets, net income, equity, loans, deposits) comes from these consolidated holding company filings with the SEC (10-K and 10-Q reports). The individual bank subsidiary also files a separate Call Report with the FFIEC, which contains detailed bank-level financial data.\n\n' +
      'For smaller institutions, the holding company may be little more than a shell: it owns the bank, the bank is essentially the entire operation, and the holding company\'s financials mirror the bank\'s. For larger organizations, the holding company may own multiple bank subsidiaries, insurance companies, broker-dealers, or other financial services businesses, making the consolidated financials a blend of different activities.\n\n' +
      'A financial holding company (FHC) is a bank holding company that has elected a designation under the Gramm-Leach-Bliley Act that allows it to engage in a broader range of financial activities, including securities underwriting and insurance. Most large US bank holding companies are financial holding companies.',

    relatedMetrics: [],
    relatedValuations: [],
    relatedFaqs: ['what-are-bank-stocks', 'types-of-publicly-traded-banks', 'bhc-vs-fhc'],
    relatedGlossaryTerms: ['Bank Holding Company', 'Financial Holding Company', 'National Bank', 'State-Chartered Bank'],

    cta: {
      type: 'glossary',
      target: '/glossary',
      text: 'See definitions for bank holding company, financial holding company, and related terms'
    },

    metaTitle: 'Bank vs Bank Holding Company | BankSift',
    metaDescription: 'Learn the difference between a bank and a bank holding company, and understand which entity you actually own when you buy bank stock.'
  },

  // ───────────────────────────────────────────────
  // Q8: Types of publicly traded banks
  // ───────────────────────────────────────────────
  {
    slug: 'types-of-publicly-traded-banks',
    question: 'What are the different types of banks that trade publicly?',
    cluster: 'getting-started',
    clusterName: 'Getting Started with Bank Stocks',
    intentType: 'definitional',

    shortAnswer: 'Publicly traded banks range from community banks with under $1 billion in assets to money center banks with over $1 trillion, each with distinct business models, risk profiles, and investment characteristics',

    fullAnswer:
      'Publicly traded banks span a wide spectrum of size, business model, and geographic scope. Understanding the major categories helps investors identify which types align with their investment objectives.\n\n' +
      'Community banks are the smallest and most numerous category. They typically have assets under $10 billion and focus on a specific geographic market, earning the bulk of their revenue from local commercial and consumer lending. Many community banks have market capitalizations under $500 million and limited or no analyst coverage, creating opportunities for investors who conduct independent research.\n\n' +
      'Regional banks operate across multiple markets within a region or state, generally with assets between $10 billion and $100 billion. They offer a broader range of products than community banks and often have active wealth management, mortgage banking, or treasury services divisions. Regional banks typically have more analyst coverage and institutional ownership than community banks, but still less than the largest institutions.\n\n' +
      'Super-regional banks bridge the gap between regional and money center banks, with assets typically between $100 billion and $500 billion. They operate across multiple states and often have significant capital markets, insurance, or asset management operations alongside traditional banking.\n\n' +
      'Money center banks are the largest institutions, with assets exceeding $500 billion and often surpassing $1 trillion. They operate nationally and globally, with businesses spanning commercial banking, investment banking, trading, wealth management, and asset management. Their financial statements are the most complex to analyze, and their stock prices are influenced by global capital markets conditions as much as by traditional banking fundamentals.\n\n' +
      'Thrifts and savings institutions are a distinct category that originated as savings and loan associations focused on residential mortgage lending. Many have broadened their activities over time, but some still maintain a heavy concentration in mortgage lending. Their regulatory framework differs slightly from commercial banks.\n\n' +
      'Mutual banks are institutions owned by their depositors rather than shareholders. They do not trade publicly. However, mutual-to-stock conversions, in which a mutual bank reorganizes as a stock corporation and conducts an initial public offering, create newly public bank stocks that often have distinctive characteristics: excess capital, low price-to-book ratios, and limited initial float.\n\n' +
      'Each type carries different risk and return characteristics. Community banks offer potential for deep value and acquisition premiums but with liquidity risk. Money center banks offer liquidity and diversification but with complexity. Matching the bank type to an investor\'s analytical capacity and objectives is an important first step.',

    relatedMetrics: ['price-to-book', 'roe', 'net-interest-margin'],
    relatedValuations: ['peer-comparison-analysis'],
    relatedFaqs: ['what-are-community-banks', 'what-are-money-center-banks', 'what-are-super-regional-banks', 'mutual-vs-stock-bank'],
    relatedGlossaryTerms: ['Community Bank', 'Money Center Bank', 'Super-Regional Bank', 'Thrift / Savings Institution'],

    cta: {
      type: 'search',
      target: '/search',
      text: 'Search for banks by name, ticker, or CIK number'
    },

    metaTitle: 'Types of Publicly Traded Banks | BankSift',
    metaDescription: 'Explore the different types of publicly traded banks from community banks to money center banks, and understand their distinct investment characteristics.'
  },

  // ───────────────────────────────────────────────
  // Q9: How to start researching bank stocks as a beginner
  // ───────────────────────────────────────────────
  {
    slug: 'how-to-start-researching-bank-stocks',
    question: 'How do I start researching bank stocks as a beginner?',
    cluster: 'getting-started',
    clusterName: 'Getting Started with Bank Stocks',
    intentType: 'procedural',

    shortAnswer: 'Start by learning the core bank metrics (ROE, NIM, efficiency ratio, P/B), then use a bank stock screener to filter for quality and value, and review individual bank filings to understand the business',

    fullAnswer:
      'Researching bank stocks can seem intimidating because banks use specialized metrics and financial statement structures that differ from other industries. A structured approach makes it manageable.\n\n' +
      'The first step is learning the core metrics. Five metrics form the foundation of bank stock analysis. Return on equity (ROE) measures how much profit the bank generates per dollar of equity. Return on average assets (ROAA) measures profitability relative to total assets, removing leverage effects. Net interest margin (NIM) measures the spread between interest earned and interest paid. Efficiency ratio measures what percentage of revenue goes to operating expenses. Price-to-book (P/B) ratio compares the stock price to the per-share accounting value of the bank. Understanding these five metrics provides enough context to begin evaluating individual banks.\n\n' +
      'The second step is screening. A bank stock screener allows filtering across hundreds of publicly traded banks by the metrics that matter. Start with a simple quality screen: ROE above 8%, ROAA above 0.80%, efficiency ratio below 70%, and P/B below 1.5x. This type of filter narrows the universe to banks that are reasonably profitable, efficient, and not excessively priced. From there, refine by additional criteria such as asset size, geographic focus, or dividend yield based on individual preference.\n\n' +
      'The third step is looking at individual banks that pass the screen. Read the bank\'s most recent 10-K annual filing (available on SEC EDGAR) to understand its business. Focus on the management discussion and analysis (MD&A) section, which explains the bank\'s strategy, market, loan portfolio composition, and risk factors in plain language. Review the loan portfolio breakdown to understand what types of loans the bank makes and where its credit risk is concentrated. Check the trend in non-performing loans and net charge-offs to assess credit quality direction.\n\n' +
      'The fourth step is comparing. No bank should be evaluated in isolation. Select 5-10 banks of similar size and geography as a peer group and compare them across the core metrics. A bank that shows a strong ROE, a wide NIM, a low efficiency ratio, and a moderate P/B relative to its peers is a stronger candidate than one that screens well in absolute terms but lags its peer group.\n\n' +
      'The fifth step is valuation. After identifying a bank that appears well-managed and attractively priced, apply one or more valuation methods to estimate fair value and determine whether the stock offers an adequate margin of safety.',

    relatedMetrics: ['roe', 'roaa', 'net-interest-margin', 'efficiency-ratio', 'price-to-book'],
    relatedValuations: ['price-to-book-valuation', 'peer-comparison-analysis'],
    relatedFaqs: ['most-important-bank-stock-metrics', 'what-to-know-before-buying-bank-stocks', 'how-to-use-bank-stock-screener'],
    relatedGlossaryTerms: [],

    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Start screening 300+ bank stocks by profitability, efficiency, and valuation'
    },

    metaTitle: 'How to Research Bank Stocks | BankSift',
    metaDescription: 'A beginner\'s guide to researching bank stocks: learn the core metrics, screen for quality and value, review filings, compare peers, and estimate fair value.'
  },

  // ───────────────────────────────────────────────
  // Q10: Most important metrics for evaluating a bank stock
  // ───────────────────────────────────────────────
  {
    slug: 'most-important-bank-stock-metrics',
    question: 'What are the most important metrics for evaluating a bank stock?',
    cluster: 'getting-started',
    clusterName: 'Getting Started with Bank Stocks',
    intentType: 'evaluative',

    shortAnswer: 'The most important bank stock metrics span profitability (ROE, ROAA, NIM), efficiency (efficiency ratio), capital strength (equity-to-assets), and valuation (P/B, P/E), with asset quality metrics providing critical risk context',

    fullAnswer:
      'Bank stock analysis uses a specific set of metrics that differ from the ratios applied to other industries. The most important ones fall into five categories.\n\n' +
      'Profitability metrics reveal how effectively the bank generates earnings. Return on equity (ROE) is the headline profitability measure, showing how much net income the bank produces per dollar of shareholders\' equity. Well-managed banks typically achieve ROE between 8% and 15%. Return on average assets (ROAA) strips out leverage to show profitability per dollar of assets; values above 1.00% are generally strong. Net interest margin (NIM) measures the spread between interest earned and interest paid relative to earning assets. It is the single most important revenue driver for most banks, with US banks historically averaging 3.0-3.5% based on FDIC data.\n\n' +
      'Efficiency metrics measure cost management. The efficiency ratio expresses non-interest expense as a percentage of total revenue. Lower is better: banks below 60% are generally considered well-run, while those consistently below 50% are exceptional. The ratio reveals how much of each revenue dollar the bank converts to profit before credit losses.\n\n' +
      'Capital strength metrics indicate how well a bank can absorb losses. The equity-to-assets ratio is the simplest measure, showing the percentage of assets funded by equity. Most banks operate between 8% and 12%. For deeper analysis, regulatory capital ratios like CET1 and Tier 1 provide risk-adjusted views of capital adequacy.\n\n' +
      'Valuation metrics help determine whether the stock is attractively priced. Price-to-book (P/B) is the primary bank valuation metric because bank book values are closer to economic reality than in most industries. A P/B of 1.0 means the stock trades at its accounting net asset value. Price-to-earnings (P/E) provides a complementary earnings-based perspective. During normal earnings periods, bank P/E ratios typically fall between 8x and 15x.\n\n' +
      'Asset quality metrics assess credit risk. The non-performing loans (NPL) ratio, net charge-off ratio, and loan loss reserve ratio indicate the health of the loan portfolio. Deteriorating asset quality can erode profitability and capital rapidly, making these metrics essential risk indicators.\n\n' +
      'No single metric tells the full story. Effective bank analysis examines profitability, efficiency, capital, valuation, and asset quality together to build a complete picture of whether a bank stock represents a sound investment at its current price.',

    relatedMetrics: ['roe', 'roaa', 'net-interest-margin', 'efficiency-ratio', 'equity-to-assets', 'price-to-book', 'price-to-earnings'],
    relatedValuations: ['price-to-book-valuation', 'roe-pb-framework'],
    relatedFaqs: ['how-to-start-researching-bank-stocks', 'what-is-a-good-roe-for-banks', 'what-is-a-good-nim-for-banks', 'what-is-a-good-efficiency-ratio'],
    relatedGlossaryTerms: [],

    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Screen banks by ROE, NIM, efficiency ratio, P/B, and 20+ other metrics'
    },

    metaTitle: 'Most Important Bank Stock Metrics | BankSift',
    metaDescription: 'Learn the most important metrics for evaluating bank stocks across profitability, efficiency, capital strength, valuation, and asset quality.'
  },

  // ───────────────────────────────────────────────
  // Q11: Bank stocks vs fintech stocks
  // ───────────────────────────────────────────────
  {
    slug: 'bank-stocks-vs-fintech-stocks',
    question: 'How do bank stocks differ from fintech stocks?',
    cluster: 'getting-started',
    clusterName: 'Getting Started with Bank Stocks',
    intentType: 'comparative',

    shortAnswer: 'Bank stocks represent regulated, deposit-taking institutions valued on earnings and book value, while fintech stocks are technology companies valued on revenue growth and market opportunity, with fundamentally different risk profiles',

    fullAnswer:
      'Bank stocks and fintech stocks both operate in financial services, but they differ in business model, regulation, valuation, and risk profile in ways that affect how investors should analyze them.\n\n' +
      'Business model is the most basic distinction. Traditional banks earn the majority of their revenue from net interest income: the spread between interest earned on loans and interest paid on deposits. They hold regulated charters, accept FDIC-insured deposits, and must meet capital requirements. Fintech companies typically earn revenue from transaction fees, software subscriptions, interchange on payments, or platform fees. Most fintechs do not hold bank charters (though some have obtained them), do not take deposits, and face a different regulatory landscape. Some fintech companies partner with chartered banks to offer banking-like products, creating a hybrid model where the fintech handles the customer interface and the partner bank handles the regulated activities.\n\n' +
      'Valuation approaches differ accordingly. Bank stocks are valued primarily on price-to-book and price-to-earnings ratios, reflecting the tangible asset base and current profitability of the institution. Fintech stocks are more commonly valued on revenue multiples, user growth, and total addressable market estimates, with many fintech companies trading at high multiples of revenue while generating limited or no net income. The metrics used to analyze bank stocks (ROE, ROAA, NIM, efficiency ratio) are generally not applicable to fintechs, and vice versa.\n\n' +
      'Risk profiles are distinct. Bank risks center on credit losses, interest rate movements, and regulatory actions. Fintech risks center on customer acquisition cost sustainability, competitive moats, regulatory evolution, and the ability to achieve profitability at scale. Banks tend to be more stable and income-producing but slower-growing. Fintechs offer higher growth potential but with greater uncertainty about long-term profitability.\n\n' +
      'The two sectors increasingly interact as competitors and partners. Fintechs have pressured banks to improve digital capabilities and customer experience. Banks have responded by investing in technology, acquiring fintechs, or partnering with them. Some investors hold both for diversification across traditional financial stability and technology-driven growth.\n\n' +
      'For investors focused on income, valuation discipline, and fundamental analysis of financial intermediaries, traditional bank stocks are the relevant universe. The specialized metrics and tools designed for bank stock analysis do not apply to fintech companies, and blending the two in a single analytical framework leads to poor comparisons.',

    relatedMetrics: ['roe', 'price-to-book', 'net-interest-margin'],
    relatedValuations: [],
    relatedFaqs: ['what-are-bank-stocks', 'why-invest-in-bank-stocks', 'traditional-bank-vs-neobank'],
    relatedGlossaryTerms: [],

    cta: {
      type: 'learn-metric',
      target: '/metrics',
      text: 'Explore the bank-specific metrics that differentiate bank stock analysis'
    },

    metaTitle: 'Bank Stocks vs Fintech Stocks | BankSift',
    metaDescription: 'Understand how bank stocks differ from fintech stocks in business model, regulation, valuation methods, and risk profile for informed investment decisions.'
  },

  // ───────────────────────────────────────────────
  // Q12: What to know before buying first bank stock
  // ───────────────────────────────────────────────
  {
    slug: 'what-to-know-before-buying-bank-stocks',
    question: 'What should I know about bank stocks before buying my first one?',
    cluster: 'getting-started',
    clusterName: 'Getting Started with Bank Stocks',
    intentType: 'strategic',

    shortAnswer: 'Before buying a bank stock, understand the core metrics (ROE, NIM, P/B), recognize that credit cycles and interest rates drive bank earnings, and verify the bank has adequate capital and sound asset quality',

    fullAnswer:
      'Buying a first bank stock is more accessible than it might appear, but several bank-specific concepts should be understood before committing capital.\n\n' +
      'First, learn the metrics that matter. Bank stock analysis relies on a distinct set of ratios. ROE (return on equity) measures profitability. NIM (net interest margin) measures the bank\'s lending spread. The efficiency ratio measures cost management. P/B (price-to-book) measures valuation relative to net asset value. EPS (earnings per share) and dividend payout ratio round out the core set. These six metrics provide a working foundation for evaluating any bank stock. General-purpose metrics like EV/EBITDA, free cash flow, and operating margin do not apply to banks.\n\n' +
      'Second, understand the credit cycle. Bank earnings are cyclical because loan losses rise during economic downturns and fall during expansions. A bank that looks highly profitable during good times may see its earnings cut in half or more during a recession as the provision for credit losses increases. Evaluating a bank requires considering where the economy stands in the credit cycle and how the bank\'s loan portfolio would perform under stress. Checking the non-performing loan ratio and net charge-off trends provides a window into current credit quality.\n\n' +
      'Third, recognize the role of interest rates. Bank profitability is sensitive to the interest rate environment. Rising rates generally benefit banks by widening net interest margins, but only up to a point; rapid rate increases can cause deposit flight and unrealized losses on bond holdings. Falling rates compress margins. An inverted yield curve (where short-term rates exceed long-term rates) is particularly challenging because banks borrow short and lend long. Understanding a bank\'s interest rate sensitivity provides context for evaluating its near-term earnings trajectory.\n\n' +
      'Fourth, check capital adequacy. A bank\'s equity-to-assets ratio and regulatory capital ratios indicate how much cushion exists to absorb losses. Banks with stronger capital positions have more flexibility to maintain dividends, pursue growth, and weather downturns. Regulatory minimums set a floor, but well-managed banks typically maintain buffers above those minimums.\n\n' +
      'Fifth, look at the deposit franchise. The quality and stability of a bank\'s deposit base is a key competitive advantage. Banks with a high proportion of non-interest-bearing and low-cost core deposits have a structural funding advantage that supports wider margins and greater stability.\n\n' +
      'Finally, do not evaluate a bank in isolation. Compare it to a peer group of similar-sized banks in comparable markets. A bank that looks strong in absolute terms may be merely average relative to its peers, or vice versa.',

    relatedMetrics: ['roe', 'net-interest-margin', 'price-to-book', 'efficiency-ratio', 'equity-to-assets', 'dividend-payout-ratio'],
    relatedValuations: ['price-to-book-valuation', 'peer-comparison-analysis'],
    relatedFaqs: ['how-to-start-researching-bank-stocks', 'most-important-bank-stock-metrics', 'how-to-use-bank-stock-screener'],
    relatedGlossaryTerms: ['Provision for Credit Losses', 'Core Deposits'],

    cta: {
      type: 'screener',
      target: '/screener',
      text: 'Start evaluating bank stocks with 25+ screening metrics'
    },

    metaTitle: 'Before Buying Bank Stocks | BankSift',
    metaDescription: 'Essential knowledge before buying your first bank stock: key metrics, credit cycle awareness, interest rate sensitivity, capital adequacy, and peer comparison.'
  },

  // ───────────────────────────────────────────────
  // Q13: Bank SIC codes
  // ───────────────────────────────────────────────
  {
    slug: 'bank-sic-codes',
    question: 'What are SIC codes and which ones apply to banks?',
    cluster: 'getting-started',
    clusterName: 'Getting Started with Bank Stocks',
    intentType: 'definitional',

    shortAnswer: 'SIC (Standard Industrial Classification) codes are four-digit codes that categorize businesses by industry, with banks falling primarily under codes 6020 (state commercial banks), 6021 (national commercial banks), 6022 (state banks, Federal Reserve members), and 6035-6036 (savings institutions)',

    fullAnswer:
      'Standard Industrial Classification (SIC) codes are four-digit numerical codes assigned by the US government to categorize businesses by their primary type of activity. The SEC uses SIC codes to classify public companies in its filing system, and they are useful for identifying and filtering bank stocks within the broader universe of publicly traded companies.\n\n' +
      'The banking-related SIC codes fall within the 6000 series, which covers depository and non-depository credit institutions, security brokers, and insurance carriers. The codes most relevant to bank stock investors are as follows. Code 6020 covers state commercial banks, which are banks chartered by state banking authorities that are not members of the Federal Reserve System. Code 6021 covers national commercial banks, which are chartered by the OCC and are automatically members of the Federal Reserve System. Code 6022 covers state-chartered banks that are members of the Federal Reserve System. Together, 6020, 6021, and 6022 capture the vast majority of commercial banks.\n\n' +
      'Savings institutions have their own codes. Code 6035 covers savings institution, federally chartered. Code 6036 covers savings institution, not federally chartered (state-chartered thrifts). These are the codes for banks that originated as savings and loan associations or mutual savings banks.\n\n' +
      'Several related codes may also appear in bank stock research. Code 6710 covers holding offices (bank holding companies that do not have a more specific classification). Code 6712 covers state-chartered banks and bank holding companies. Some bank holding companies are classified under these codes rather than the bank-specific codes because the SEC classifies companies based on the parent entity\'s primary activity.\n\n' +
      'SIC codes are useful for screening SEC EDGAR filings to find all banks of a particular charter type. They are also used by financial data providers to group companies into industry categories. However, the SIC system was developed in the 1930s and last revised in 1987, so it does not perfectly capture the complexity of modern financial institutions. The NAICS (North American Industry Classification System) has largely replaced SIC for government statistical purposes, but the SEC continues to use SIC codes in its filing system.\n\n' +
      'For practical purposes, investors researching bank stocks can use SIC codes as a starting filter to identify depository institutions within the SEC filing database, then refine by asset size, geography, and financial characteristics using a bank stock screener.',

    relatedMetrics: [],
    relatedValuations: [],
    relatedFaqs: ['what-are-bank-stocks', 'types-of-publicly-traded-banks', 'what-is-cik-number'],
    relatedGlossaryTerms: ['National Bank', 'State-Chartered Bank', 'Thrift / Savings Institution', 'Bank Holding Company'],

    cta: {
      type: 'glossary',
      target: '/glossary',
      text: 'Look up banking industry terms and charter types in the glossary'
    },

    metaTitle: 'Bank SIC Codes Explained | BankSift',
    metaDescription: 'Learn what SIC codes are and which four-digit codes apply to commercial banks, savings institutions, and bank holding companies in SEC filings.'
  },

  // ───────────────────────────────────────────────
  // Q14: Thrift vs savings bank vs commercial bank
  // ───────────────────────────────────────────────
  {
    slug: 'thrift-vs-savings-bank-vs-commercial-bank',
    question: 'What is the difference between a thrift, a savings bank, and a commercial bank?',
    cluster: 'getting-started',
    clusterName: 'Getting Started with Bank Stocks',
    intentType: 'comparative',

    shortAnswer: 'Thrifts and savings banks historically focused on residential mortgage lending and savings deposits, while commercial banks have broader lending and deposit-taking activities, though modern regulatory changes have largely blurred these distinctions',

    fullAnswer:
      'Thrifts, savings banks, and commercial banks all accept deposits and make loans, but they evolved from different origins and historically operated under different rules. Understanding these distinctions helps investors interpret the bank stock landscape.\n\n' +
      'Commercial banks are the most common type of depository institution. They hold either a national charter (from the OCC) or a state charter (from a state banking department) and have broad authority to accept deposits of all types, make commercial and consumer loans, and offer a wide range of financial services. Commercial banking has always encompassed business lending (commercial and industrial loans, commercial real estate) as a core activity alongside consumer lending and deposit gathering.\n\n' +
      'Thrifts, formally known as savings and loan associations (S&Ls) or savings associations, originated in the 19th century to promote homeownership. They were chartered specifically to accept savings deposits and make residential mortgage loans. Historically, thrifts were required to hold a large majority of their assets in residential mortgages and mortgage-related securities (the qualified thrift lender test). They were regulated separately from commercial banks, originally by the Federal Home Loan Bank Board and later by the Office of Thrift Supervision (OTS). The OTS was eliminated in 2011, and thrift regulation was transferred to the OCC (for federal thrifts) and the FDIC and state regulators (for state thrifts).\n\n' +
      'Savings banks are a related but distinct category. Mutual savings banks originated in the northeastern United States as community-oriented institutions owned by their depositors (mutual ownership) rather than shareholders. They traditionally focused on residential mortgage lending and savings accounts. Many have since converted from mutual to stock ownership and broadened their activities to resemble commercial banks.\n\n' +
      'In practice, the distinctions have blurred significantly. Regulatory changes over the past several decades have allowed thrifts to expand into commercial lending and other activities previously reserved for commercial banks. Many former thrifts now operate with business models nearly identical to commercial banks. Some have converted their charters to commercial bank charters. For investment analysis purposes, the key differences to watch for are lending mix (some former thrifts still maintain a heavier concentration in residential mortgages), deposit composition, and charter type (which affects the primary regulator).\n\n' +
      'When evaluating former thrifts and savings banks as investment candidates, the same core metrics apply: ROE, ROAA, NIM, efficiency ratio, and P/B. The main analytical adjustment is awareness of the loan portfolio composition, since a mortgage-heavy portfolio has different yield, duration, and credit risk characteristics than a diversified commercial lending portfolio.',

    relatedMetrics: ['net-interest-margin', 'loans-to-assets'],
    relatedValuations: [],
    relatedFaqs: ['types-of-publicly-traded-banks', 'mutual-vs-stock-bank', 'what-is-mhc-conversion'],
    relatedGlossaryTerms: ['Thrift / Savings Institution', 'Community Bank', 'National Bank', 'State-Chartered Bank', 'Mutual Bank', 'Stock Bank'],

    cta: {
      type: 'glossary',
      target: '/glossary',
      text: 'See definitions for thrift, savings institution, and related bank types'
    },

    metaTitle: 'Thrift vs Savings Bank vs Commercial Bank | BankSift',
    metaDescription: 'Understand the differences between thrifts, savings banks, and commercial banks in charter type, lending focus, regulation, and investment analysis.'
  },

  // ───────────────────────────────────────────────
  // Q15: Why bank financial statements are different
  // ───────────────────────────────────────────────
  {
    slug: 'why-bank-financials-are-different',
    question: 'Why are bank financial statements different from other companies?',
    cluster: 'getting-started',
    clusterName: 'Getting Started with Bank Stocks',
    intentType: 'conceptual',

    shortAnswer: 'Bank financial statements are structured differently because banks are financial intermediaries whose core business is borrowing (deposits) and lending (loans), making debt an operating item rather than a financing choice, and requiring specialized revenue, expense, and balance sheet categories',

    fullAnswer:
      'Bank financial statements follow the same accounting standards (US GAAP) as other public companies, but the nature of banking as a business creates a fundamentally different structure that makes standard corporate analysis tools inapplicable.\n\n' +
      'The income statement is the most visibly different. For a non-financial company, revenue comes from selling goods or services, cost of goods sold reflects production costs, and operating expenses cover overhead. For a bank, the top of the income statement starts with interest income (earned on loans, securities, and other earning assets) and interest expense (paid on deposits, borrowings, and other funding). The difference, net interest income, is the bank\'s primary revenue line and has no equivalent in non-financial reporting. Non-interest income (fees, service charges, wealth management revenue) is reported separately. Non-interest expense covers the same general categories as any company (salaries, occupancy, technology) but is measured against total revenue through the efficiency ratio rather than as an operating margin.\n\n' +
      'The provision for credit losses is a major income statement item unique to banking. It represents management\'s estimate of expected future loan losses under the CECL accounting standard. This non-cash charge directly reduces net income and can vary dramatically from quarter to quarter, making bank earnings more volatile than those of most non-financial companies.\n\n' +
      'The balance sheet differs because a bank\'s assets are primarily financial instruments. Loans are the largest asset category, followed by investment securities, cash and equivalents, and other assets. Liabilities are dominated by deposits (the bank\'s primary funding source), followed by borrowings and other liabilities. The balance sheet of a typical bank is 88-92% liabilities and only 8-12% equity, a leverage ratio that would be alarming for any non-financial company but is normal for banking.\n\n' +
      'This structure is why standard metrics do not work for banks. Enterprise value (EV) has no clear meaning when deposits are both a liability and an operating input. EBITDA cannot be calculated because interest is the bank\'s core operating item, not a financing cost to add back. Free cash flow is difficult to define because lending activity (a core operating function) consumes cash while deposit-taking generates it. Operating margin conflates the interest spread with operating efficiency.\n\n' +
      'Instead, bank analysis uses metrics specifically designed for financial intermediaries: ROE, ROAA, NIM, efficiency ratio, P/B, and asset quality ratios. These metrics account for the fact that borrowing and lending are the bank\'s operations rather than financing activities. Learning to read bank financial statements through this lens is the essential first step in bank stock analysis.',

    relatedMetrics: ['net-interest-margin', 'efficiency-ratio', 'roe', 'roaa'],
    relatedValuations: [],
    relatedFaqs: ['what-are-bank-stocks', 'how-do-banks-make-money', 'how-to-read-bank-balance-sheet'],
    relatedGlossaryTerms: ['Net Interest Income', 'Provision for Credit Losses', 'Earning Assets', 'CECL'],

    cta: {
      type: 'learn-metric',
      target: '/metrics',
      text: 'Explore the specialized metrics used to analyze bank financial statements'
    },

    metaTitle: 'Why Bank Financials Are Different | BankSift',
    metaDescription: 'Learn why bank financial statements differ from other companies and why standard metrics like EV/EBITDA and free cash flow do not apply to bank analysis.'
  },

];

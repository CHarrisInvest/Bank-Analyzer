// Cluster 2: Understanding Bank Financial Statements — 17 Standard FAQ Entries
// Phase 3 content for src/data/content/faqs.js
// Add these entries to the FAQS array alongside existing cluster content.

const CLUSTER_2_FAQS = [
  {
    slug: 'how-to-read-bank-balance-sheet',
    question: 'How do I read a bank\'s balance sheet?',
    cluster: 'financial-statements',
    clusterName: 'Understanding Bank Financial Statements',
    intentType: 'procedural',
    shortAnswer: 'A bank\'s balance sheet is organized around loans and securities on the asset side, deposits and borrowings on the liability side, and shareholders\' equity, with each category requiring bank-specific interpretation',
    fullAnswer: 'A bank\'s balance sheet follows the fundamental accounting equation where assets equal liabilities plus equity, but the composition of each category differs substantially from non-financial companies. Understanding these differences is the foundation of bank analysis.\n\nOn the asset side, loans are typically the largest category, often comprising 60% to 75% of total assets. Loans are reported net of the allowance for credit losses, a reserve that reflects management\'s estimate of expected losses in the loan portfolio. The loan portfolio is usually broken down by type: commercial and industrial, commercial real estate, residential mortgage, consumer, and construction and development. The mix of loan types reveals the bank\'s lending strategy and risk profile.\n\nInvestment securities are the second-largest asset category for most banks. These are divided into held-to-maturity (HTM) securities, carried at amortized cost, and available-for-sale (AFS) securities, carried at fair value with unrealized gains and losses flowing through accumulated other comprehensive income (AOCI) in equity. Cash and balances due from other banks, federal funds sold, and interest-bearing deposits at other institutions round out the liquid asset portion of the balance sheet.\n\nOn the liability side, deposits dominate, typically representing 70% to 85% of total liabilities. Deposits are categorized as demand deposits (non-interest-bearing checking accounts), savings and money market accounts, and time deposits (certificates of deposit). The mix of deposit types matters because non-interest-bearing deposits are free funding, while time deposits and money market accounts carry explicit interest costs. A bank with a higher proportion of non-interest-bearing deposits has a natural cost advantage.\n\nBorrowings, including federal funds purchased, repurchase agreements, Federal Home Loan Bank advances, and subordinated debt, represent additional funding sources. These are generally more expensive and less stable than core deposits.\n\nShareholders\' equity for banks includes common stock, additional paid-in capital, retained earnings, and accumulated other comprehensive income. AOCI can be a significant and volatile component for banks with large AFS securities portfolios, as changes in market interest rates cause unrealized gains or losses in this line item. Total equity divided by total assets gives the equity-to-assets ratio, a simple but important measure of capital adequacy.\n\nWhen reading a bank\'s balance sheet, start with the big picture: total assets tells you the bank\'s size, the loan-to-asset ratio tells you how aggressively it lends, and the deposit-to-asset ratio tells you how it funds itself. Then move into the composition of each major category to understand the bank\'s strategy and risk exposures.',
    relatedMetrics: ['equity-to-assets', 'loans-to-deposits', 'deposits-to-assets', 'loans-to-assets', 'book-value-per-share'],
    relatedValuations: ['price-to-book-valuation'],
    relatedFaqs: ['what-are-bank-stocks', 'why-bank-financials-are-different', 'held-to-maturity-vs-available-for-sale', 'what-are-earning-assets'],
    relatedGlossaryTerms: ['Net Interest Income', 'Earning Assets', 'Allowance for Credit Losses'],
    cta: {
      type: 'learn-metric',
      target: '/metrics',
      text: 'Explore the metrics derived from bank balance sheet data'
    },
    metaTitle: 'How to Read a Bank Balance Sheet | BankSift',
    metaDescription: 'Learn how to read a bank balance sheet, including the key asset, liability, and equity categories that differ from non-financial companies.'
  },
  {
    slug: '10k-vs-10q-filings',
    question: 'What is the difference between a bank\'s 10-K and 10-Q filing?',
    cluster: 'financial-statements',
    clusterName: 'Understanding Bank Financial Statements',
    intentType: 'comparative',
    shortAnswer: 'A 10-K is a bank\'s comprehensive audited annual report filed with the SEC, while a 10-Q is the shorter unaudited quarterly report, and both contain critical data for bank analysis',
    fullAnswer: 'The 10-K and 10-Q are the two primary financial disclosure documents that publicly traded banks file with the Securities and Exchange Commission. They serve different purposes and contain different levels of detail, but both are essential reading for bank stock investors.\n\nThe 10-K is the annual report. It is filed within 60 days of the fiscal year end for large accelerated filers (banks with a public float above $700 million) and within 90 days for smaller reporting companies. The financial statements in a 10-K are audited by an independent accounting firm, which provides an opinion on whether the statements present fairly, in all material respects, the bank\'s financial position. The 10-K includes a comprehensive business description, risk factors, management\'s discussion and analysis (MD&A), full financial statements with notes, and supplemental schedules.\n\nThe 10-Q is the quarterly report, filed for each of the first three quarters of the fiscal year (the fourth quarter is covered by the 10-K). Large accelerated filers must file within 40 days of the quarter end. The financial statements in a 10-Q are reviewed but not audited, which means they receive less scrutiny from the external accounting firm. The 10-Q includes condensed financial statements, an abbreviated MD&A, and updates on risk factors and legal proceedings.\n\nFor bank analysis, the 10-K is particularly valuable because of its comprehensive loan portfolio disclosures, which break down loans by type, geography, maturity, and credit quality in greater detail than the 10-Q. The 10-K also provides more extensive discussion of interest rate sensitivity, including repricing schedules and gap analysis, as well as detailed information about the bank\'s investment securities portfolio, deposit composition, and regulatory capital.\n\nThe 10-Q remains important for tracking quarterly trends. Changes in asset quality, shifts in deposit mix, and margin compression or expansion become visible in the quarterly data. Many bank investors read the 10-Q\'s MD&A section closely because it provides management\'s explanation of changes from the prior quarter and prior year.\n\nIt is worth noting that earnings press releases, which banks issue before filing the 10-Q or 10-K, often contain summary financial data and key metrics. However, the press release is not a substitute for the full SEC filing, which contains the detailed footnotes and supplemental tables that drive thorough analysis.',
    relatedMetrics: ['roe', 'roaa', 'net-interest-margin'],
    relatedValuations: [],
    relatedFaqs: ['how-to-find-bank-data-sec-edgar', 'what-is-cik-number', 'what-is-trailing-twelve-months', 'what-is-a-call-report'],
    relatedGlossaryTerms: ['10-K Filing', '10-Q Filing', 'SEC EDGAR'],
    cta: {
      type: 'glossary',
      target: '/glossary',
      text: 'Explore the glossary for definitions of SEC filing terms and bank analysis concepts'
    },
    metaTitle: '10-K vs 10-Q Filings for Banks Explained | BankSift',
    metaDescription: 'Understand the differences between 10-K and 10-Q filings for banks, including timing, audit requirements, and the key disclosures each provides.'
  },
  {
    slug: 'what-is-trailing-twelve-months',
    question: 'What is trailing twelve months (TTM) and why does it matter for bank analysis?',
    cluster: 'financial-statements',
    clusterName: 'Understanding Bank Financial Statements',
    intentType: 'definitional',
    shortAnswer: 'Trailing twelve months (TTM) is the sum of the most recent four consecutive quarters of financial data, providing the most current full-year view of a bank\'s performance without waiting for the annual report',
    fullAnswer: 'Trailing twelve months, commonly abbreviated TTM, refers to the aggregate financial data for the most recent twelve-month period ending with the latest reported quarter. If a bank has reported through the third quarter of its fiscal year, the TTM figures combine Q4 of the prior year with Q1, Q2, and Q3 of the current year.\n\nTTM is calculated by taking the most recent annual figure, subtracting the year-ago interim period, and adding the current interim period. For example, if a bank reported full-year net income of $100 million last year, earned $22 million in Q1 of last year, and earned $28 million in Q1 of this year, the TTM net income after Q1 is $100 million minus $22 million plus $28 million, equaling $106 million. This rolling calculation ensures the TTM figure always reflects four complete quarters.\n\nThe TTM convention matters for bank analysis because bank performance metrics are most meaningful over a full annual cycle. Quarterly results can be distorted by seasonal patterns in loan demand, deposit flows, and provision expense. A single quarter\'s results might reflect an unusually large loan loss provision or a one-time securities gain that overstates or understates the bank\'s underlying earning power. The TTM approach smooths these fluctuations while still incorporating the most recent data.\n\nTTM is especially important when calculating valuation ratios. Price-to-earnings ratios based on a single quarter\'s earnings (annualized by multiplying by four) can be misleading if that quarter was atypical. TTM earnings provide a more reliable denominator for P/E calculations. Similarly, TTM return on average assets and return on equity give a more representative picture of ongoing profitability than any individual quarter.\n\nOne important distinction is between TTM and annualized quarterly figures. Annualizing takes one quarter\'s result and multiplies by four, which assumes the quarter is representative of the full year. TTM uses actual reported data for four quarters, making it more reliable but slightly less current. When evaluating a bank that is undergoing rapid change, such as a recent acquisition or a significant shift in interest rates, investors should consider both the TTM trend and the most recent quarterly trajectory.\n\nBankSift displays TTM data for income statement metrics and profitability ratios, ensuring that screening results and metric comparisons reflect a full year of operating performance rather than a single quarter that may not be representative.',
    relatedMetrics: ['roe', 'roaa', 'net-interest-margin', 'earnings-per-share', 'efficiency-ratio'],
    relatedValuations: ['price-to-earnings-valuation', 'peer-comparison'],
    relatedFaqs: ['10k-vs-10q-filings', 'what-is-net-interest-income', 'comparing-profitability-different-size-banks'],
    relatedGlossaryTerms: ['Trailing Twelve Months (TTM)'],
    cta: {
      type: 'glossary',
      target: '/glossary',
      text: 'See the full glossary for definitions of common bank analysis terms'
    },
    metaTitle: 'What Is Trailing Twelve Months (TTM) for Banks? | BankSift',
    metaDescription: 'Learn what trailing twelve months (TTM) means, how it is calculated from quarterly bank filings, and why it provides a more reliable basis for bank analysis.'
  },
  {
    slug: 'what-is-net-interest-income',
    question: 'What is net interest income and why is it the most important revenue line for banks?',
    cluster: 'financial-statements',
    clusterName: 'Understanding Bank Financial Statements',
    intentType: 'definitional',
    shortAnswer: 'Net interest income is the difference between interest earned on a bank\'s loans and securities and interest paid on its deposits and borrowings, and it typically accounts for 60% to 80% of a community or regional bank\'s total revenue',
    fullAnswer: 'Net interest income (NII) is calculated by subtracting total interest expense from total interest income. Interest income comes primarily from loans (the largest component for most banks), investment securities, and other interest-earning assets such as federal funds sold and deposits at other banks. Interest expense consists of interest paid on deposits (savings accounts, money market accounts, and certificates of deposit) and interest on borrowed funds (Federal Home Loan Bank advances, repurchase agreements, and subordinated debt).\n\nFor most U.S. commercial banks, net interest income accounts for 60% to 80% of total revenue. Community banks and traditional lenders typically fall at the higher end of that range, while large diversified banks with significant trading, advisory, and wealth management operations may derive 50% or less of total revenue from net interest income. Regardless of the bank\'s size or business model, NII is almost always the single largest revenue line and the one most sensitive to changes in interest rates and loan growth.\n\nThree factors drive changes in net interest income over time. Volume refers to the size of the bank\'s earning asset base: a bank that grows loans by 10% while maintaining its yield spread will see a roughly proportional increase in NII. Rate reflects the spread between asset yields and funding costs, which shifts with market interest rates, competitive dynamics, and the bank\'s deposit pricing strategy. Mix describes the composition of both assets and liabilities, as higher-yielding loan types and lower-cost deposit categories contribute more to NII per dollar of balance sheet.\n\nNet interest income connects directly to net interest margin (NIM), one of the most widely followed bank profitability metrics. NIM is calculated as net interest income divided by average earning assets and expressed as a percentage. While NII is an absolute dollar amount that grows with the bank\'s size, NIM measures the efficiency of the bank\'s interest income generation relative to its asset base, making it useful for comparing banks of different sizes.\n\nOn the income statement, the provision for credit losses is deducted from net interest income to arrive at net interest income after provision. This subtraction reflects the expected cost of loan defaults and is one of the most volatile lines on a bank\'s income statement. Distinguishing between NII (the revenue line) and NII after provision (the revenue line net of expected credit costs) is important when analyzing bank profitability through different parts of the credit cycle.',
    relatedMetrics: ['net-interest-margin', 'interest-income-to-earning-assets', 'cost-of-funds', 'cost-of-deposits'],
    relatedValuations: [],
    relatedFaqs: ['what-are-bank-stocks', 'interest-income-vs-fee-income', 'what-is-non-interest-income', 'what-causes-nim-to-change'],
    relatedGlossaryTerms: ['Net Interest Income', 'Net Interest Margin (NIM)', 'Earning Assets'],
    cta: {
      type: 'learn-metric',
      target: '/metrics/net-interest-margin',
      text: 'Learn how net interest margin measures the efficiency of a bank\'s interest income generation'
    },
    metaTitle: 'What Is Net Interest Income for Banks? | BankSift',
    metaDescription: 'Learn what net interest income is, why it dominates bank revenue, the three factors that drive it, and how it connects to net interest margin.'
  },
  {
    slug: 'what-is-non-interest-income',
    question: 'What is non-interest income and why does it matter?',
    cluster: 'financial-statements',
    clusterName: 'Understanding Bank Financial Statements',
    intentType: 'definitional',
    shortAnswer: 'Non-interest income includes all bank revenue other than interest income, such as service charges, wealth management fees, mortgage banking revenue, and trading gains, and it measures the degree to which a bank has diversified beyond traditional lending',
    fullAnswer: 'Non-interest income encompasses every revenue source a bank has outside of interest earned on loans and securities. It appears on the income statement below net interest income and above non-interest expense, and its composition varies dramatically depending on the bank\'s size, strategy, and business lines.\n\nThe most common categories of non-interest income include service charges on deposit accounts (overdraft fees, monthly maintenance fees, ATM fees), fiduciary and wealth management fees, mortgage banking revenue (origination fees, gains on sale of loans, servicing income), interchange and card-related fees, insurance commissions, and gains or losses on the sale of investment securities. For the largest banks, trading revenue and investment banking advisory fees can be significant additional components.\n\nNon-interest income matters for bank analysis because it represents revenue diversification. A bank that derives a meaningful share of revenue from fee-based activities is less dependent on the interest rate spread for its profitability. This diversification can provide more stable earnings through interest rate cycles, since fee income generally does not fluctuate with changes in short-term or long-term rates the way net interest income does. However, certain categories of non-interest income, particularly mortgage banking revenue and trading gains, can be highly volatile on their own.\n\nThe non-interest income to revenue ratio measures the percentage of total revenue (net interest income plus non-interest income) that comes from non-interest sources. For community banks focused on traditional lending, this ratio typically ranges from 10% to 25%. Regional banks with trust departments or mortgage operations might fall in the 20% to 35% range. Large diversified banks with capital markets, wealth management, and global transaction banking operations can derive 40% to 60% of revenue from non-interest sources.\n\nWhen comparing banks, it is important to distinguish between recurring fee income (such as wealth management fees or service charges that repeat each quarter) and episodic or volatile fee income (such as gains on securities sales or one-time insurance settlements). Banks with a higher proportion of recurring fee income generally command higher valuation multiples because their earnings are more predictable.\n\nAnalysts also pay attention to changes in fee income over time. Regulatory actions have periodically reduced certain fee categories, such as the Durbin Amendment\'s impact on debit card interchange fees for banks above $10 billion in assets. These structural shifts can permanently alter the fee income profile of affected banks.',
    relatedMetrics: ['non-interest-income-to-revenue', 'efficiency-ratio', 'net-interest-margin'],
    relatedValuations: ['peer-comparison'],
    relatedFaqs: ['what-is-net-interest-income', 'interest-income-vs-fee-income', 'what-are-non-interest-expenses'],
    relatedGlossaryTerms: ['Non-Interest Income', 'Fee Income'],
    cta: {
      type: 'learn-metric',
      target: '/metrics/non-interest-income-to-revenue',
      text: 'Learn how the non-interest income ratio measures revenue diversification'
    },
    metaTitle: 'What Is Non-Interest Income for Banks? | BankSift',
    metaDescription: 'Learn what non-interest income includes for banks, why revenue diversification matters, and how fee income composition varies by bank size and strategy.'
  },
  {
    slug: 'what-are-non-interest-expenses',
    question: 'What are non-interest expenses in banking?',
    cluster: 'financial-statements',
    clusterName: 'Understanding Bank Financial Statements',
    intentType: 'definitional',
    shortAnswer: 'Non-interest expenses are a bank\'s operating costs other than interest expense and the provision for credit losses, with salaries and employee benefits typically comprising 50% to 60% of the total',
    fullAnswer: 'Non-interest expenses represent the operating costs a bank incurs to run its business, excluding interest paid on deposits and borrowings and the provision for credit losses. This line item is the numerator of the efficiency ratio, one of the most closely watched metrics in bank analysis.\n\nSalaries and employee benefits are the largest component, typically accounting for 50% to 60% of total non-interest expenses. Banking remains a people-intensive business, and compensation costs reflect the staffing required for branch operations, lending, compliance, technology, and back-office functions. Occupancy and equipment expense covers the cost of maintaining branches, offices, ATMs, and physical infrastructure. Technology and data processing expense has grown as a share of total costs as banks invest in digital banking platforms, cybersecurity, and core system upgrades.\n\nOther significant components include FDIC deposit insurance assessments, professional and legal fees, marketing and advertising, amortization of intangible assets (particularly core deposit intangibles acquired through mergers), and other miscellaneous operating costs. Banks also report merger-related expenses separately when they are integrating an acquired institution, though these costs are typically nonrecurring.\n\nNon-interest expenses are the primary driver of the efficiency ratio, which is calculated as non-interest expenses divided by the sum of net interest income and non-interest income. A lower efficiency ratio indicates that the bank spends less to generate each dollar of revenue. Because non-interest expenses are the element most directly under management\'s control (compared to interest rates or credit costs, which are influenced by macroeconomic conditions), investors pay close attention to management\'s ability to control these costs over time.\n\nScale is a significant factor in non-interest expense management. Larger banks can spread fixed costs like technology infrastructure, compliance systems, and corporate overhead across a bigger revenue base, which is one reason efficiency ratios tend to be lower at larger institutions. This scale advantage is a primary economic motivation behind bank mergers and acquisitions. The acquiring bank expects to eliminate redundant branches, consolidate back-office operations, and reduce combined non-interest expenses, generating what the industry calls "cost saves."\n\nPre-provision net revenue (PPNR), calculated as net interest income plus non-interest income minus non-interest expenses, isolates a bank\'s core operating earnings before the impact of credit costs and taxes. Tracking PPNR over time reveals whether a bank\'s revenue growth is outpacing expense growth, which is the fundamental driver of operating leverage.',
    relatedMetrics: ['efficiency-ratio', 'net-overhead-ratio', 'pre-provision-net-revenue'],
    relatedValuations: [],
    relatedFaqs: ['what-is-a-good-efficiency-ratio', 'what-is-non-interest-income', 'what-is-net-interest-income', 'what-drives-efficiency-ratio'],
    relatedGlossaryTerms: ['Non-Interest Expense', 'Efficiency Ratio', 'Pre-Provision Net Revenue (PPNR)'],
    cta: {
      type: 'learn-metric',
      target: '/metrics/efficiency-ratio',
      text: 'Learn how the efficiency ratio measures a bank\'s cost management'
    },
    metaTitle: 'What Are Non-Interest Expenses in Banking? | BankSift',
    metaDescription: 'Learn what non-interest expenses include for banks, how they drive the efficiency ratio, and why expense control is a key factor in bank stock analysis.'
  },
  {
    slug: 'how-to-find-bank-data-sec-edgar',
    question: 'How do I find a bank\'s financial data on SEC EDGAR?',
    cluster: 'financial-statements',
    clusterName: 'Understanding Bank Financial Statements',
    intentType: 'procedural',
    shortAnswer: 'SEC EDGAR is the free public database where publicly traded banks file their 10-K, 10-Q, and other disclosure documents, and you can search it by company name or CIK number at sec.gov/cgi-bin/browse-edgar',
    fullAnswer: 'The SEC\'s Electronic Data Gathering, Analysis, and Retrieval system (EDGAR) is the primary source for financial filings from all publicly traded companies in the United States, including banks and bank holding companies. All filings are available at no cost.\n\nTo find a specific bank\'s filings, navigate to the EDGAR company search page. You can search by the bank\'s name or by its Central Index Key (CIK), which is a unique numerical identifier the SEC assigns to each filing entity. Searching by name works for most banks, though you may need to search for the holding company name rather than the bank subsidiary name. For example, searching for "First National Bank" might not return results if the publicly traded entity files under "First National Bankshares, Inc."\n\nOnce you locate the correct entity, EDGAR displays a chronological list of all filings. The most useful filing types for bank analysis are the 10-K (annual report), 10-Q (quarterly report), 8-K (current report for material events like earnings releases, leadership changes, or acquisitions), DEF 14A (proxy statement with executive compensation and governance details), and S-1 or S-3 (registration statements for new securities offerings).\n\nEDGAR provides filings in several formats. The complete submission text file contains the raw filing, while individual exhibits and documents can be accessed separately. Many recent filings are available in inline XBRL format, which tags individual financial data elements with standardized identifiers. XBRL data enables automated extraction of specific line items like total assets, net income, or loan balances, which is how financial data providers and tools like BankSift source their data.\n\nFor full-text search across all filings, EDGAR\'s full-text search system allows you to search for specific terms within the text of all SEC filings. This can be useful for finding mentions of specific topics, such as a particular loan type, regulatory action, or risk factor, across multiple banks.\n\nAn important distinction for bank researchers: SEC EDGAR contains filings from publicly traded banks and bank holding companies. It does not contain Call Reports or Uniform Bank Performance Reports (UBPRs), which are regulatory filings submitted to the FFIEC. Many community banks that are not publicly traded do not file with the SEC at all, but their financial data is available through FFIEC regulatory filings.',
    relatedMetrics: [],
    relatedValuations: [],
    relatedFaqs: ['what-is-cik-number', '10k-vs-10q-filings', 'what-is-a-call-report', 'what-is-ubpr'],
    relatedGlossaryTerms: ['SEC EDGAR', 'CIK Number', '10-K Filing'],
    cta: {
      type: 'search',
      target: '/search',
      text: 'Search for a specific bank to view its key metrics and financial data'
    },
    metaTitle: 'How to Find Bank Financial Data on SEC EDGAR | BankSift',
    metaDescription: 'Step-by-step guide to finding bank financial filings on SEC EDGAR, including search tips, filing types, and the difference between SEC and FFIEC data.'
  },
  {
    slug: 'what-is-cik-number',
    question: 'What is a CIK number and how do I use it to look up bank filings?',
    cluster: 'financial-statements',
    clusterName: 'Understanding Bank Financial Statements',
    intentType: 'procedural',
    shortAnswer: 'A CIK (Central Index Key) is the unique numerical identifier the SEC assigns to each entity that files with EDGAR, and using a bank\'s CIK is the most reliable way to locate its filings',
    fullAnswer: 'The Central Index Key, or CIK, is a number assigned by the Securities and Exchange Commission to every entity that files documents through the EDGAR system. Each CIK is unique and permanent, making it the most reliable identifier for locating a specific company\'s filings. Unlike company names, which can change through mergers or rebranding, the CIK remains constant for the life of the filing entity.\n\nTo find a bank\'s CIK, you can search by company name on the EDGAR company search page. The CIK appears next to the company name in the search results. Once you have it, you can navigate directly to a company\'s filing page using the URL pattern: sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=[number]&type=&dateb=&owner=include&count=40.\n\nOne important consideration for bank investors is the distinction between a bank holding company and its subsidiary bank. A publicly traded bank typically operates through a holding company structure. The holding company is the entity that issues stock and files 10-K and 10-Q reports with the SEC, and it has its own CIK. The subsidiary bank itself, which holds the deposits and makes the loans, is a separate legal entity that may have a different CIK if it files with the SEC separately, though subsidiary banks more commonly file only regulatory reports (Call Reports) with the FFIEC rather than SEC filings.\n\nFor example, if you want to analyze a community bank, you would search for the holding company name to find its SEC filings and CIK. The holding company\'s financial statements consolidate the subsidiary bank\'s results, so the 10-K and 10-Q at the holding company level contain the data you need for analysis.\n\nBankSift uses CIK numbers as one of several identifiers to match SEC filing data with regulatory data and market data for each bank in its database. When viewing a bank\'s profile on BankSift, the underlying data has been sourced from these filings and standardized for comparison.',
    relatedMetrics: [],
    relatedValuations: [],
    relatedFaqs: ['how-to-find-bank-data-sec-edgar', '10k-vs-10q-filings', 'what-is-a-call-report'],
    relatedGlossaryTerms: ['CIK Number', 'SEC EDGAR', 'Bank Holding Company'],
    cta: {
      type: 'search',
      target: '/search',
      text: 'Look up a specific bank by name to find its financial data and key metrics'
    },
    metaTitle: 'What Is a CIK Number? Bank Filing Lookup Guide | BankSift',
    metaDescription: 'Learn what a CIK number is, how to find one for any publicly traded bank, and how to use it to navigate SEC EDGAR filings efficiently.'
  },
  {
    slug: 'interest-income-vs-fee-income',
    question: 'What is the difference between interest income and fee income for banks?',
    cluster: 'financial-statements',
    clusterName: 'Understanding Bank Financial Statements',
    intentType: 'comparative',
    shortAnswer: 'Interest income is earned from lending and investing activities and fluctuates with interest rates and loan volumes, while fee income comes from services like account maintenance, wealth management, and transaction processing and is generally less rate-sensitive',
    fullAnswer: 'Interest income and fee income are the two broad categories of bank revenue, and they differ in their sources, sensitivities, and implications for analysis.\n\nInterest income is earned on the bank\'s portfolio of earning assets. The primary sources are interest and fees on loans (the largest contributor for most banks), interest on investment securities (U.S. Treasuries, agency mortgage-backed securities, municipal bonds, and corporate bonds), and interest on short-term investments like federal funds sold and deposits at other banks. Interest income is directly sensitive to three factors: the volume of earning assets, the yields those assets carry, and the prevailing level of market interest rates. When rates rise, interest income generally increases as new loans and reinvested securities are priced at higher yields. When rates fall, interest income contracts as assets reprice downward.\n\nFee income, reported within the non-interest income section of the income statement, is earned from services the bank provides rather than from the use of its balance sheet. Common sources include service charges on deposit accounts (monthly maintenance fees, overdraft fees, ATM surcharges), trust and wealth management fees (based on assets under management), mortgage banking revenue (origination fees, gains on the sale of loans to the secondary market, and loan servicing fees), interchange fees on debit and credit card transactions, and insurance commissions. For the largest banks, investment banking advisory fees and trading revenue also fall into this category.\n\nThe strategic distinction between these revenue types is meaningful. A bank that relies primarily on interest income is running what analysts call a "spread banking" model: its profitability depends on maintaining a positive spread between the rates it earns on assets and the rates it pays on liabilities. This model is simple and proven but exposes the bank to interest rate risk and credit risk concentrated in the loan portfolio.\n\nA bank with a significant fee income component has more diversified revenue. Fee-based businesses like wealth management and payment processing tend to generate more stable revenue streams across interest rate environments, though they require different infrastructure, talent, and regulatory compliance capabilities. Mortgage banking revenue is a notable exception to this stability, as it tends to surge when interest rates fall (driving refinancing activity) and decline sharply when rates rise.\n\nInvestors can evaluate a bank\'s revenue mix using the non-interest income to revenue ratio. Tracking this ratio over time reveals whether a bank is successfully building fee-based revenue or becoming more dependent on spread income. Comparing the ratio across peers highlights differences in business strategy and revenue diversification.',
    relatedMetrics: ['net-interest-margin', 'non-interest-income-to-revenue', 'interest-income-to-earning-assets'],
    relatedValuations: ['peer-comparison'],
    relatedFaqs: ['what-is-net-interest-income', 'what-is-non-interest-income', 'what-causes-nim-to-change'],
    relatedGlossaryTerms: ['Interest Income', 'Fee Income', 'Net Interest Income', 'Non-Interest Income'],
    cta: {
      type: 'learn-metric',
      target: '/metrics/non-interest-income-to-revenue',
      text: 'Compare how banks balance interest and fee income using the non-interest income ratio'
    },
    metaTitle: 'Interest Income vs Fee Income for Banks | BankSift',
    metaDescription: 'Understand the difference between interest income and fee income for banks, how each affects profitability, and what the revenue mix reveals about bank strategy.'
  },
  {
    slug: 'what-are-earning-assets',
    question: 'What are earning assets in bank accounting?',
    cluster: 'financial-statements',
    clusterName: 'Understanding Bank Financial Statements',
    intentType: 'definitional',
    shortAnswer: 'Earning assets are the portion of a bank\'s total assets that generate interest income, primarily loans and investment securities, and they serve as the denominator for net interest margin calculations',
    fullAnswer: 'Earning assets, sometimes called interest-earning assets, are the assets on a bank\'s balance sheet that produce interest income. They are distinguished from non-earning assets such as cash in the vault, bank premises and equipment, goodwill and other intangible assets, and other real estate owned (OREO). The earning asset base is the engine of a bank\'s core revenue.\n\nThe principal components of earning assets are loans (the largest category for most banks), investment securities (including both held-to-maturity and available-for-sale portfolios), federal funds sold and securities purchased under agreements to resell, interest-bearing deposits at other banks, and trading account assets at larger institutions. For a typical community or regional bank, loans represent 70% to 85% of total earning assets, with investment securities making up most of the remainder.\n\nEarning assets matter for bank analysis because they are the denominator in the net interest margin (NIM) calculation. NIM equals net interest income divided by average earning assets. Two banks can have identical net interest income in dollar terms but very different NIMs if their earning asset bases differ in size. The bank that generates the same NII from a smaller earning asset base is using its balance sheet more efficiently.\n\nThe composition of earning assets also affects risk. A bank with 80% of its earning assets in loans and 20% in investment securities carries more credit risk but typically earns higher yields than a bank with 60% in loans and 40% in securities. Securities portfolios, particularly those invested in U.S. government and agency obligations, carry minimal credit risk but are subject to interest rate risk that can create unrealized losses when rates rise.\n\nThe earning assets to total assets ratio indicates how efficiently a bank deploys its balance sheet. Most well-run banks maintain earning assets at 85% to 92% of total assets. A ratio significantly below this range may suggest the bank holds excessive non-earning assets, which dilutes returns. Tracking this ratio over time can reveal shifts in balance sheet strategy.',
    relatedMetrics: ['net-interest-margin', 'interest-income-to-earning-assets', 'loans-to-assets'],
    relatedValuations: [],
    relatedFaqs: ['how-to-read-bank-balance-sheet', 'what-is-net-interest-income', 'held-to-maturity-vs-available-for-sale'],
    relatedGlossaryTerms: ['Earning Assets', 'Net Interest Margin (NIM)'],
    cta: {
      type: 'glossary',
      target: '/glossary',
      text: 'Explore the glossary for definitions of bank balance sheet terms'
    },
    metaTitle: 'What Are Earning Assets in Banking? | BankSift',
    metaDescription: 'Learn what earning assets are in bank accounting, what they include, and why they matter as the denominator for net interest margin calculations.'
  },
  {
    slug: 'how-banks-report-loan-losses',
    question: 'How do banks report loan losses and provisions?',
    cluster: 'financial-statements',
    clusterName: 'Understanding Bank Financial Statements',
    intentType: 'procedural',
    shortAnswer: 'Banks report loan losses through an interconnected system: the provision for credit losses on the income statement flows into the allowance for credit losses on the balance sheet, which is reduced by actual charge-offs and increased by recoveries',
    fullAnswer: 'The loan loss reporting framework involves three interconnected components that appear on different financial statements: the provision for credit losses (income statement), the allowance for credit losses (balance sheet), and net charge-offs (disclosed in the notes and supplemental tables). Understanding how these three elements relate to each other is essential for evaluating a bank\'s asset quality and earnings sustainability.\n\nThe provision for credit losses is an expense recorded on the income statement that represents management\'s estimate of the credit losses expected in the loan portfolio. Under the Current Expected Credit Losses (CECL) accounting standard adopted by U.S. banks, this provision reflects lifetime expected losses on all loans from the date of origination, incorporating forward-looking economic forecasts. The provision is deducted from net interest income to arrive at net interest income after provision, making it one of the most significant expenses on a bank\'s income statement.\n\nThe allowance for credit losses (ACL), also called the loan loss reserve, is a contra-asset account on the balance sheet that is netted against gross loans. It represents the cumulative reserve the bank has built up to absorb expected losses. The provision for credit losses flows into this reserve: when the bank records a provision expense on the income statement, the allowance on the balance sheet increases by the same amount.\n\nCharge-offs occur when the bank determines that a specific loan or portion of a loan is uncollectible and removes it from the loan portfolio. The charged-off amount reduces both the gross loan balance and the allowance for credit losses. If the bank subsequently recovers some amount on a previously charged-off loan, the recovery increases the allowance. Net charge-offs (charge-offs minus recoveries) represent the actual realized credit losses for the period.\n\nThe relationship can be expressed as a formula: ending allowance equals beginning allowance plus provision minus net charge-offs. If net charge-offs exceed the provision in a given period, the allowance decreases, which may signal that the bank needs to record a larger provision in subsequent periods to rebuild the reserve. If the provision exceeds net charge-offs, the allowance grows, building a larger cushion against future losses.\n\nAnalysts evaluate loan loss reporting through several ratios. The loan loss reserve ratio (allowance divided by total loans) measures the overall reserve level. The reserve coverage ratio (allowance divided by nonperforming loans) measures how well the reserve covers identified problem loans. The net charge-off ratio (annualized net charge-offs divided by average loans) measures actual loss experience. Together, these ratios reveal whether the bank\'s reserve is adequate relative to its credit risk.',
    relatedMetrics: ['non-performing-loans-ratio', 'net-charge-off-ratio', 'loan-loss-reserve-ratio', 'reserve-coverage-ratio', 'provision-to-average-loans'],
    relatedValuations: [],
    relatedFaqs: ['what-is-provision-for-credit-losses', 'what-is-allowance-for-credit-losses', 'how-to-read-bank-balance-sheet'],
    relatedGlossaryTerms: ['Provision for Credit Losses', 'Allowance for Credit Losses', 'Net Charge-Offs', 'CECL'],
    cta: {
      type: 'learn-metric',
      target: '/metrics/net-charge-off-ratio',
      text: 'Learn how the net charge-off ratio measures actual loan loss experience'
    },
    metaTitle: 'How Banks Report Loan Losses and Provisions | BankSift',
    metaDescription: 'Understand how banks report loan losses through the provision, allowance, and charge-off framework, and which ratios measure asset quality.'
  },
  {
    slug: 'what-is-provision-for-credit-losses',
    question: 'What is the provision for credit losses on a bank\'s income statement?',
    cluster: 'financial-statements',
    clusterName: 'Understanding Bank Financial Statements',
    intentType: 'definitional',
    shortAnswer: 'The provision for credit losses is an income statement expense that reflects management\'s estimate of expected loan losses, and it is one of the most volatile and consequential line items in a bank\'s financial statements',
    fullAnswer: 'The provision for credit losses (often shortened to "provision" or abbreviated PCL) is a non-cash expense on the income statement that represents the amount the bank sets aside to cover expected losses on its loan portfolio. It is deducted from net interest income, making it a direct reduction of pre-tax earnings.\n\nUnder the Current Expected Credit Losses (CECL) standard, which replaced the older incurred loss model for U.S. banks, the provision reflects the change in lifetime expected credit losses on the loan portfolio during the reporting period. When a bank originates new loans, the expected losses on those loans are provisioned upfront. When economic conditions deteriorate and loss forecasts rise, additional provision is required. When conditions improve and expected losses decline, the provision can decrease and may even turn negative (a "provision release" or "negative provision"), which boosts reported earnings.\n\nThe provision for credit losses is one of the most volatile items on a bank\'s income statement. During periods of benign credit quality, provisions may be modest, perhaps 0.10% to 0.30% of average loans annualized for a well-run bank. During recessions or periods of elevated stress, provisions can surge to 1% or more of average loans, which for a highly leveraged institution like a bank can consume most or all of pre-tax earnings. This volatility is why analysts focus on pre-provision net revenue (PPNR) to assess a bank\'s underlying earning power independent of credit cycle fluctuations.\n\nThe provision-to-average-loans ratio normalizes the provision expense relative to portfolio size, enabling comparison across banks of different sizes. Analysts compare this ratio both to the bank\'s own history and to peer averages to assess whether provisioning is conservative, adequate, or potentially insufficient.\n\nAn important analytical consideration is the distinction between the provision (income statement flow) and the allowance for credit losses (balance sheet stock). The provision feeds into the allowance, but they measure different things. A large provision in a single quarter does not necessarily mean the bank has experienced large actual losses. It may mean that economic forecasts have deteriorated and the bank is building reserves in anticipation of future losses. Conversely, a low provision may reflect improving forecasts rather than the absence of risk.',
    relatedMetrics: ['provision-to-average-loans', 'pre-provision-net-revenue', 'net-charge-off-ratio', 'loan-loss-reserve-ratio'],
    relatedValuations: [],
    relatedFaqs: ['how-banks-report-loan-losses', 'what-is-allowance-for-credit-losses', 'what-is-ppnr'],
    relatedGlossaryTerms: ['Provision for Credit Losses', 'CECL', 'Pre-Provision Net Revenue (PPNR)'],
    cta: {
      type: 'learn-metric',
      target: '/metrics/provision-to-average-loans',
      text: 'Learn how the provision ratio measures credit cost intensity'
    },
    metaTitle: 'What Is the Provision for Credit Losses? | BankSift',
    metaDescription: 'Learn what the provision for credit losses measures on a bank income statement, how CECL changed provisioning, and why this line item drives earnings volatility.'
  },
  {
    slug: 'what-is-allowance-for-credit-losses',
    question: 'What is the allowance for credit losses on a bank\'s balance sheet?',
    cluster: 'financial-statements',
    clusterName: 'Understanding Bank Financial Statements',
    intentType: 'definitional',
    shortAnswer: 'The allowance for credit losses is a balance sheet reserve that represents the cumulative amount set aside to absorb expected loan losses, reported as a deduction from gross loans to arrive at net loans',
    fullAnswer: 'The allowance for credit losses (ACL), historically referred to as the allowance for loan and lease losses (ALLL), is a contra-asset account on the balance sheet. It appears as a deduction from gross loans, producing the net loans figure that is reported among total assets. The allowance represents the bank\'s best estimate of the credit losses embedded in its current loan portfolio.\n\nThe allowance is built up through provisions recorded on the income statement and drawn down through charge-offs when loans are deemed uncollectible. Recoveries on previously charged-off loans add back to the allowance. At any point in time, the allowance balance reflects the accumulated provisions minus accumulated net charge-offs since the bank\'s inception, adjusted for any opening balance under CECL adoption.\n\nUnder CECL, the allowance is sized to cover the lifetime expected credit losses on all loans outstanding as of the balance sheet date. This represents a significant change from the prior incurred loss model, which only required reserves for losses that were probable and estimable based on current conditions. CECL\'s forward-looking approach means the allowance now incorporates management\'s economic forecasts, which can cause the reserve level to fluctuate with changes in the macroeconomic outlook even if actual credit performance has not yet deteriorated.\n\nAnalysts evaluate the adequacy of the allowance through two primary ratios. The loan loss reserve ratio (allowance divided by total loans) measures the overall reserve level. For U.S. commercial banks, this ratio has historically ranged from 1.0% to 1.5% during normal economic periods, though it varies by loan mix and credit environment. The reserve coverage ratio (allowance divided by nonperforming loans) measures how many times the reserve covers identified problem loans. A coverage ratio above 100% indicates the allowance exceeds the current stock of nonperforming loans, providing a buffer against additional deterioration.\n\nThe allowance is a management estimate, which means it involves significant judgment. Two banks with identical loan portfolios could report different allowance levels based on different economic assumptions, loss rate models, and qualitative adjustments. This subjectivity is one reason analysts supplement allowance analysis with market-based measures and peer comparisons rather than relying on any single bank\'s reported reserve in isolation.\n\nFor investors, a declining allowance relative to loans may indicate improving credit quality, but it can also indicate that management is releasing reserves to boost reported earnings. Evaluating the allowance alongside actual charge-off trends and nonperforming loan levels helps distinguish between genuine credit improvement and potential reserve adequacy concerns.',
    relatedMetrics: ['loan-loss-reserve-ratio', 'reserve-coverage-ratio', 'non-performing-loans-ratio', 'net-charge-off-ratio'],
    relatedValuations: [],
    relatedFaqs: ['how-banks-report-loan-losses', 'what-is-provision-for-credit-losses', 'how-to-read-bank-balance-sheet'],
    relatedGlossaryTerms: ['Allowance for Credit Losses', 'Loan Loss Reserve Ratio', 'Reserve Coverage Ratio', 'CECL'],
    cta: {
      type: 'learn-metric',
      target: '/metrics/loan-loss-reserve-ratio',
      text: 'Learn how the loan loss reserve ratio measures the adequacy of a bank\'s credit loss reserves'
    },
    metaTitle: 'What Is the Allowance for Credit Losses? | BankSift',
    metaDescription: 'Learn what the allowance for credit losses represents on a bank balance sheet, how CECL changed its calculation, and the key ratios used to evaluate reserve adequacy.'
  },
  {
    slug: 'held-to-maturity-vs-available-for-sale',
    question: 'What are held-to-maturity vs available-for-sale securities on a bank\'s balance sheet?',
    cluster: 'financial-statements',
    clusterName: 'Understanding Bank Financial Statements',
    intentType: 'comparative',
    shortAnswer: 'Held-to-maturity (HTM) securities are carried at amortized cost with no mark-to-market impact on the balance sheet, while available-for-sale (AFS) securities are carried at fair value with unrealized gains and losses recorded in accumulated other comprehensive income within equity',
    fullAnswer: 'Banks classify their investment securities into two primary categories under U.S. accounting standards, and the classification determines how changes in market value flow through the financial statements.\n\nAvailable-for-sale (AFS) securities are carried on the balance sheet at fair value. When market interest rates rise, the market value of existing fixed-rate bonds falls, creating unrealized losses. When rates fall, market values rise, creating unrealized gains. These unrealized gains and losses do not appear on the income statement. Instead, they flow through other comprehensive income (OCI) and accumulate in a shareholders\' equity line item called accumulated other comprehensive income (AOCI). A large unrealized loss in the AFS portfolio reduces AOCI and therefore reduces reported shareholders\' equity, even though no actual loss has been realized through a sale.\n\nHeld-to-maturity (HTM) securities are carried at amortized cost. As long as the bank has the intent and ability to hold these securities until they mature, changes in market value are not reflected on the balance sheet at all. The securities remain at their purchase price adjusted for amortization of any premium or discount. This classification shields the balance sheet from the volatility that rate changes would otherwise create.\n\nThe accounting difference has real consequences for bank analysis. During periods of rising interest rates, banks with large AFS portfolios may show significant declines in book value and tangible book value per share due to unrealized losses in AOCI, even though their loan portfolios and operating earnings are performing well. Banks that reclassified portions of their securities portfolios from AFS to HTM can avoid this book value erosion, though the reclassification itself is subject to accounting rules and regulatory scrutiny.\n\nFrom a risk perspective, the HTM classification reduces balance sheet volatility but also reduces flexibility. Selling HTM securities before maturity (except in narrowly defined circumstances) can "taint" the entire HTM portfolio, potentially forcing the bank to reclassify all remaining HTM securities to AFS. This means banks that classify securities as HTM are effectively committing to hold them regardless of how market conditions change.\n\nFor regulatory capital purposes, the treatment of unrealized AFS gains and losses in capital calculations depends on the bank\'s size and regulatory framework. Large banks subject to the standardized approach generally include AOCI in regulatory capital, meaning unrealized losses reduce their capital ratios. Many community and smaller regional banks have elected to exclude AOCI from regulatory capital calculations under an available opt-out provision, which insulates their capital ratios from securities market value fluctuations.\n\nWhen analyzing a bank\'s securities portfolio, investors should note the relative size of HTM versus AFS holdings, the duration and composition of each portfolio, and the magnitude of any unrealized gains or losses in AOCI.',
    relatedMetrics: ['equity-to-assets', 'tangible-book-value-per-share', 'book-value-per-share'],
    relatedValuations: ['price-to-book-valuation', 'price-to-tangible-book-valuation'],
    relatedFaqs: ['how-to-read-bank-balance-sheet', 'what-are-earning-assets', 'tangible-book-value-vs-book-value'],
    relatedGlossaryTerms: ['Held-to-Maturity (HTM)', 'Available-for-Sale (AFS)', 'Accumulated Other Comprehensive Income (AOCI)'],
    cta: {
      type: 'glossary',
      target: '/glossary',
      text: 'Explore the glossary for definitions of bank securities classification terms'
    },
    metaTitle: 'HTM vs AFS Securities on Bank Balance Sheets | BankSift',
    metaDescription: 'Understand the difference between held-to-maturity and available-for-sale securities, how each affects a bank\'s balance sheet, and why the classification matters for analysis.'
  },
  {
    slug: 'what-is-goodwill-on-bank-balance-sheet',
    question: 'What is goodwill on a bank\'s balance sheet and why does it matter for valuation?',
    cluster: 'financial-statements',
    clusterName: 'Understanding Bank Financial Statements',
    intentType: 'conceptual',
    shortAnswer: 'Goodwill is an intangible asset that arises when a bank acquires another institution for more than the fair value of its net tangible assets, and it matters because it inflates book value without providing a tangible cushion against losses',
    fullAnswer: 'Goodwill appears on a bank\'s balance sheet when it completes an acquisition and pays more than the fair value of the target\'s identifiable net assets. If a bank acquires a target with $400 million in identifiable net assets (tangible assets minus liabilities plus identifiable intangible assets like core deposit intangibles) for $550 million, the $150 million difference is recorded as goodwill. It represents the premium paid for the target\'s franchise value, customer relationships, market position, and expected synergies.\n\nUnder U.S. accounting standards, goodwill is not amortized. It remains on the balance sheet at its original recorded amount unless the bank determines that it has been impaired, meaning the acquired business is no longer worth what was paid for it. Impairment testing occurs at least annually, and if the carrying value of the reporting unit exceeds its estimated fair value, the bank must write down goodwill, recording a non-cash charge on the income statement. Goodwill impairments are relatively rare during normal economic periods but can be significant during downturns when acquired franchises lose value.\n\nGoodwill matters for bank valuation because it directly affects the distinction between book value and tangible book value. Book value per share (BVPS) includes goodwill and other intangible assets in the numerator. Tangible book value per share (TBVPS) excludes them. For banks that have grown through acquisitions, the gap between these two measures can be substantial. A bank with $3 billion in equity but $600 million in goodwill and intangibles has a tangible equity of only $2.4 billion, a 20% difference.\n\nThis distinction matters because goodwill has no independent liquidation value. If a bank were wound down, goodwill would not generate cash to repay depositors or creditors. Tangible equity represents the hard asset backing of the bank\'s capital, which is why many bank analysts and regulators focus on tangible measures. The tangible common equity (TCE) ratio, which divides tangible equity by tangible assets, is one of the most conservative measures of bank capitalization and explicitly excludes goodwill.\n\nThe price-to-tangible-book-value (P/TBV) ratio is the valuation metric that adjusts for goodwill. For acquisition-active banks, P/TBV is generally a more meaningful and comparable valuation metric than price-to-book (P/B), because P/B can vary significantly across banks based on acquisition history rather than underlying franchise quality.\n\nBanks that have grown organically rather than through acquisitions will have little or no goodwill on their balance sheets, making their book value and tangible book value nearly identical. When comparing banks with different acquisition histories, using tangible measures puts them on a more level playing field.',
    relatedMetrics: ['tangible-book-value-per-share', 'book-value-per-share', 'price-to-tangible-book-value', 'price-to-book', 'tangible-common-equity-ratio'],
    relatedValuations: ['price-to-tangible-book-valuation', 'price-to-book-valuation'],
    relatedFaqs: ['tangible-book-value-vs-book-value', 'how-to-read-bank-balance-sheet', 'what-is-tce-ratio'],
    relatedGlossaryTerms: ['Goodwill', 'Tangible Book Value', 'Tangible Common Equity (TCE)'],
    cta: {
      type: 'learn-metric',
      target: '/metrics/tangible-book-value-per-share',
      text: 'Learn how tangible book value per share strips out goodwill for a cleaner valuation measure'
    },
    metaTitle: 'What Is Goodwill on a Bank Balance Sheet? | BankSift',
    metaDescription: 'Learn what goodwill represents on a bank balance sheet, how it arises from acquisitions, and why it matters for tangible book value and bank stock valuation.'
  },
  {
    slug: 'what-is-a-call-report',
    question: 'What is a Call Report and where can I find it?',
    cluster: 'financial-statements',
    clusterName: 'Understanding Bank Financial Statements',
    intentType: 'definitional',
    shortAnswer: 'A Call Report is the standardized quarterly financial filing that every FDIC-insured bank submits to federal regulators, and it is publicly available through the FFIEC Central Data Repository',
    fullAnswer: 'The Call Report, formally known as the Consolidated Reports of Condition and Income (FFIEC 031 and FFIEC 041), is a detailed quarterly financial filing that every FDIC-insured commercial bank and savings institution in the United States is required to submit. It is filed with the bank\'s primary federal regulator (the OCC for national banks, the FDIC for state non-member banks, or the Federal Reserve for state member banks) and is publicly available through the FFIEC\'s Central Data Repository.\n\nCall Reports contain comprehensive financial data organized into standardized schedules. The Report of Condition is essentially the balance sheet, broken down into detailed schedules covering loans by type and risk classification, securities by type and maturity, deposits by type and size, and capital components. The Report of Income covers the income statement, with schedules detailing interest income and expense by category, non-interest income and expense components, provision for credit losses, and taxes. Additional schedules cover off-balance-sheet items, past-due and nonaccrual loans, and regulatory capital calculations.\n\nThe standardized format is one of the most valuable features of Call Reports. Because every bank uses the same schedules and definitions, the data is directly comparable across institutions. This uniformity makes Call Reports the foundation for aggregate industry statistics published by the FDIC, for regulatory surveillance and examination scoping, and for financial data tools that cover the banking industry.\n\nCall Reports are available for all FDIC-insured banks, not just those that are publicly traded. This is a significant distinction from SEC filings, which are only available for banks whose securities are registered with the SEC. There are approximately 4,500 FDIC-insured banks in the United States, but only about 350 are publicly traded. Call Report data provides the only standardized financial data source for the thousands of privately held community banks.\n\nTo access Call Reports, the FFIEC\'s Central Data Repository (CDR) at cdr.ffiec.gov allows users to download individual bank reports or bulk data files. The FDIC\'s BankFind Suite at fdic.gov also provides access to Call Report data in a more user-friendly interface, with the ability to view financial summaries, generate peer group comparisons, and download data for individual institutions.\n\nCall Reports are filed within 30 days of the end of each calendar quarter, making them available on a slightly faster timeline than SEC 10-Q filings for publicly traded banks.',
    relatedMetrics: [],
    relatedValuations: [],
    relatedFaqs: ['what-is-ubpr', 'how-to-find-bank-data-sec-edgar', '10k-vs-10q-filings'],
    relatedGlossaryTerms: ['Call Report', 'FFIEC', 'FDIC'],
    cta: {
      type: 'glossary',
      target: '/glossary',
      text: 'Explore the glossary for definitions of bank regulatory filing terms'
    },
    metaTitle: 'What Is a Bank Call Report? | BankSift',
    metaDescription: 'Learn what Call Reports are, what financial data they contain, why they matter for bank analysis, and how to access them through the FFIEC and FDIC.'
  },
  {
    slug: 'what-is-ubpr',
    question: 'What is the FFIEC Uniform Bank Performance Report (UBPR)?',
    cluster: 'financial-statements',
    clusterName: 'Understanding Bank Financial Statements',
    intentType: 'definitional',
    shortAnswer: 'The UBPR is an analytical report generated by the FFIEC from Call Report data that presents a bank\'s financial performance alongside peer group averages, making it a valuable tool for comparative bank analysis',
    fullAnswer: 'The Uniform Bank Performance Report (UBPR) is an analytical report produced by the Federal Financial Institutions Examination Council (FFIEC) for every FDIC-insured commercial bank in the United States. It takes the raw data from a bank\'s Call Reports and transforms it into calculated ratios, trend analyses, and peer group comparisons that make the data more useful for analysis.\n\nThe UBPR organizes a bank\'s financial data into several sections. The Summary Ratios page presents key performance metrics including return on assets, return on equity, net interest margin, efficiency ratio, and capital ratios, each shown alongside the bank\'s peer group average and percentile ranking. The Income Information section breaks down revenue and expense components as percentages of average assets, enabling size-normalized comparisons. The Balance Sheet Composition section shows the asset and liability mix as percentages of total assets. Additional sections cover loan mix, liquidity, capital, and interest rate sensitivity.\n\nThe peer group comparison is one of the UBPR\'s most distinctive features. The FFIEC assigns each bank to a peer group based primarily on asset size, and the UBPR presents the bank\'s ratios alongside peer group medians and the bank\'s percentile rank within the group. This allows analysts to quickly assess whether a bank\'s performance on any metric is above or below average relative to similar-sized institutions. The UBPR also shows the bank\'s own historical data, typically for the most recent twelve quarters, enabling trend analysis.\n\nThe UBPR is freely available through the FFIEC\'s website at ffiec.gov/ubpr.htm. Users can search for any FDIC-insured bank and generate reports for any available quarter. Reports can be viewed online or downloaded. Because the UBPR covers all FDIC-insured banks, including the thousands of privately held community banks that do not file with the SEC, it is one of the most comprehensive sources of comparative bank financial data available.\n\nBank examiners use the UBPR extensively to prepare for examinations and monitor bank performance between examination cycles. Investors and analysts use it as a starting point for peer analysis, though the peer groups are based solely on asset size and do not account for differences in business model, geography, or risk profile. For more precise peer comparisons, analysts often supplement the UBPR with custom peer groups that match more specific characteristics.\n\nThe UBPR is derived entirely from Call Report data, so it does not contain information from SEC filings such as management\'s discussion and analysis, risk factor disclosures, or segment-level reporting. It is best understood as a ratio analysis and peer comparison tool built on regulatory data rather than as a substitute for reading the bank\'s complete financial filings.',
    relatedMetrics: ['roe', 'roaa', 'net-interest-margin', 'efficiency-ratio'],
    relatedValuations: ['peer-comparison'],
    relatedFaqs: ['what-is-a-call-report', 'how-to-find-bank-data-sec-edgar', 'comparing-profitability-different-size-banks'],
    relatedGlossaryTerms: ['UBPR', 'FFIEC', 'Call Report'],
    cta: {
      type: 'glossary',
      target: '/glossary',
      text: 'Explore the glossary for definitions of bank regulatory and analytical terms'
    },
    metaTitle: 'What Is the FFIEC UBPR? Bank Performance Reports | BankSift',
    metaDescription: 'Learn what the Uniform Bank Performance Report (UBPR) is, how it uses peer group comparisons, and how to access it for any FDIC-insured bank.'
  }
];

export default CLUSTER_2_FAQS;

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import { METRICS } from '../data/content/metrics.js';
import { VALUATION_METHODS } from '../data/content/valuations.js';

/**
 * Category key overrides for auto-generated metric terms.
 * Metrics with category 'per-share' are remapped to better-fitting categories.
 */
const METRIC_CATEGORY_OVERRIDES = {
  'earnings-per-share': 'income-statement',
  'dividend-payout-ratio': 'income-statement',
};

/**
 * Glossary terms for bank financial analysis
 * Combines metrics, valuations, and additional terms across 10 categories.
 *
 * Categories:
 *   profitability-efficiency  Profitability & Efficiency
 *   capital-regulatory        Capital & Regulatory
 *   credit-quality            Credit Quality & Risk
 *   valuation                 Valuation
 *   income-statement          Income Statement
 *   funding-deposits          Funding & Deposits
 *   banking-industry          Banking Industry
 *   investment-analysis       Investment Analysis
 *   balance-sheet-accounting  Balance Sheet & Accounting
 *   data-sources              Data Sources
 */
const ADDITIONAL_TERMS = [
  // =============================================
  // Profitability & Efficiency
  // =============================================
  {
    term: 'Return on Tangible Common Equity (ROTCE)',
    definition: 'Net income divided by average tangible common equity. A stricter profitability measure than ROE because it excludes goodwill and intangible assets from the equity base, revealing the return generated on hard capital.',
    category: 'profitability-efficiency',
  },
  {
    term: 'Pre-Provision Net Revenue (PPNR)',
    definition: 'Total revenue minus non-interest expense, before subtracting the provision for credit losses. PPNR isolates a bank\'s core earnings power from credit cycle volatility and is a key input in stress testing.',
    category: 'profitability-efficiency',
  },
  {
    term: 'Operating Leverage',
    definition: 'The rate at which revenue growth exceeds expense growth. Positive operating leverage means a bank is growing revenue faster than costs, improving profitability over time.',
    category: 'profitability-efficiency',
  },

  // =============================================
  // Capital & Regulatory
  // =============================================
  {
    term: 'Basel Accords',
    definition: 'A series of international banking regulations (Basel I, II, and III) developed by the Basel Committee on Banking Supervision. They set minimum capital requirements, leverage limits, and liquidity standards for banks worldwide.',
    category: 'capital-regulatory',
  },
  {
    term: 'Basel III / Basel III Endgame',
    definition: 'The current global regulatory framework for bank capital, leverage, and liquidity. Basel III Endgame refers to the final set of reforms that standardize how banks calculate risk-weighted assets, reducing reliance on internal models.',
    category: 'capital-regulatory',
  },
  {
    term: 'Common Equity Tier 1 (CET1) Ratio',
    definition: 'A bank\'s core equity capital (common stock, retained earnings, and AOCI) divided by risk-weighted assets. CET1 is the highest-quality form of regulatory capital and the most closely watched capital ratio by regulators and investors.',
    category: 'capital-regulatory',
  },
  {
    term: 'Tier 1 Capital Ratio',
    definition: 'The ratio of a bank\'s Tier 1 capital (CET1 plus additional Tier 1 instruments such as non-cumulative preferred stock) to risk-weighted assets. It measures a bank\'s core financial strength from a regulatory perspective.',
    category: 'capital-regulatory',
  },
  {
    term: 'Tier 2 Capital',
    definition: 'Supplementary capital that includes subordinated debt, loan loss reserves (up to a limit), and other instruments that absorb losses after Tier 1 capital is exhausted. It provides an additional buffer beyond core equity.',
    category: 'capital-regulatory',
  },
  {
    term: 'Total Capital Ratio',
    definition: 'The ratio of a bank\'s total regulatory capital (Tier 1 plus Tier 2) to risk-weighted assets. US bank regulators require a minimum total capital ratio of 8%, with well-capitalized banks typically holding 10% or more.',
    category: 'capital-regulatory',
  },
  {
    term: 'Risk-Weighted Assets (RWA)',
    definition: 'Total bank assets adjusted by risk weights assigned to each asset class. Cash carries a 0% weight, residential mortgages typically 50%, and commercial loans 100%. RWA is the denominator of all risk-based capital ratios.',
    category: 'capital-regulatory',
  },
  {
    term: 'Leverage Ratio (Regulatory)',
    definition: 'Tier 1 capital divided by average total consolidated assets, without risk weighting. It provides a simple, non-risk-based backstop to risk-weighted capital ratios. The US minimum is 4% for well-capitalized banks.',
    category: 'capital-regulatory',
  },
  {
    term: 'Supplementary Leverage Ratio (SLR)',
    definition: 'An enhanced leverage ratio for the largest US banks that includes off-balance-sheet exposures (such as derivatives and loan commitments) in the denominator. Required for banks with $250 billion or more in total assets.',
    category: 'capital-regulatory',
  },
  {
    term: 'Capital Adequacy',
    definition: 'The overall sufficiency of a bank\'s capital to absorb losses and support ongoing operations. Assessed through regulatory capital ratios (CET1, Tier 1, Total Capital) and stress test results.',
    category: 'capital-regulatory',
  },
  {
    term: 'Capital Conservation Buffer',
    definition: 'An additional 2.5% of CET1 capital above the regulatory minimum that banks must maintain to avoid restrictions on dividends, buybacks, and bonus payments. Part of the Basel III framework.',
    category: 'capital-regulatory',
  },
  {
    term: 'Stress Testing (CCAR / DFAST)',
    definition: 'Regulatory exercises that evaluate whether banks have sufficient capital to withstand severe economic downturns. CCAR (Comprehensive Capital Analysis and Review) and DFAST (Dodd-Frank Act Stress Tests) are the primary US programs.',
    category: 'capital-regulatory',
  },
  {
    term: 'Tangible Common Equity Ratio',
    definition: 'Tangible common equity divided by tangible assets. A conservative capital measure that excludes goodwill, intangibles, and preferred equity, showing the hard equity cushion available to absorb losses.',
    category: 'capital-regulatory',
  },

  // =============================================
  // Credit Quality & Risk
  // =============================================
  {
    term: 'Provision for Credit Losses',
    definition: 'An expense on the income statement representing management\'s estimate of expected loan losses for the period. Provisions increase the allowance for credit losses on the balance sheet and directly reduce reported earnings.',
    category: 'credit-quality',
  },
  {
    term: 'Non-Performing Loans (NPL)',
    definition: 'Loans that are 90 or more days past due or on non-accrual status (interest is no longer being recognized as income). The NPL ratio (NPLs divided by total loans) is a primary measure of asset quality.',
    category: 'credit-quality',
  },
  {
    term: 'Non-Performing Assets (NPA)',
    definition: 'The sum of non-performing loans plus other real estate owned (OREO) and other repossessed assets. NPA provides a broader view of problem assets than NPLs alone.',
    category: 'credit-quality',
  },
  {
    term: 'Net Charge-Off Ratio',
    definition: 'Loans written off as uncollectible minus recoveries on previously charged-off loans, expressed as a percentage of average loans. It measures the actual credit loss experience over a period.',
    category: 'credit-quality',
  },
  {
    term: 'Allowance for Credit Losses (ACL)',
    definition: 'A balance sheet reserve that represents management\'s estimate of expected lifetime losses in the loan portfolio. Funded through the provision for credit losses on the income statement.',
    category: 'credit-quality',
  },
  {
    term: 'Reserve Coverage Ratio',
    definition: 'The allowance for credit losses divided by non-performing loans. A ratio above 100% means the bank has reserved more than enough to cover its currently identified problem loans.',
    category: 'credit-quality',
  },
  {
    term: 'Texas Ratio',
    definition: 'Non-performing assets plus loans 90 days past due, divided by tangible common equity plus the allowance for loan losses. A ratio above 100% suggests a bank may not have enough reserves and capital to absorb problem loans. Historically used as a distress indicator.',
    category: 'credit-quality',
  },
  {
    term: 'OREO (Other Real Estate Owned)',
    definition: 'Real property acquired by a bank through foreclosure or deed in lieu of foreclosure. OREO is carried on the balance sheet at fair value and represents collateral that must be managed and eventually sold.',
    category: 'credit-quality',
  },
  {
    term: 'CECL (Current Expected Credit Losses)',
    definition: 'The accounting standard (ASC 326) that requires banks to estimate and reserve for expected lifetime credit losses at loan origination, rather than waiting until losses are probable. Replaced the previous incurred-loss model.',
    category: 'credit-quality',
  },
  {
    term: 'Credit Cycle',
    definition: 'The recurring pattern of expansion and contraction in lending standards, credit availability, and loan losses. During expansions, banks ease underwriting and losses are low. During downturns, defaults rise and banks tighten lending.',
    category: 'credit-quality',
  },
  {
    term: 'Credit Risk',
    definition: 'The risk that a borrower will fail to make required payments on a loan. For banks, credit risk is the single largest source of potential loss and is managed through underwriting standards, diversification, and reserves.',
    category: 'credit-quality',
  },
  {
    term: 'Interest Rate Risk',
    definition: 'The risk that changes in interest rates will negatively affect a bank\'s earnings or economic value. Banks with assets and liabilities that reprice at different intervals are exposed to margin compression when rates move unfavorably.',
    category: 'credit-quality',
  },
  {
    term: 'Liquidity Risk',
    definition: 'The risk that a bank cannot meet its short-term financial obligations as they come due without incurring unacceptable losses. Managed through maintaining liquid assets, diverse funding sources, and contingency funding plans.',
    category: 'credit-quality',
  },
  {
    term: 'Concentration Risk',
    definition: 'The risk arising from excessive exposure to a single borrower, industry, geography, or asset class. Regulators monitor concentrations in commercial real estate, construction lending, and other categories that have historically produced outsized losses.',
    category: 'credit-quality',
  },

  // =============================================
  // Valuation (additions to auto-generated terms)
  // =============================================
  {
    term: 'Tangible Book Value',
    definition: 'Total shareholders\' equity minus intangible assets and goodwill. Represents the theoretical value shareholders would receive if all tangible assets were liquidated and all liabilities paid.',
    category: 'valuation',
  },
  {
    term: 'Intrinsic Value',
    definition: 'The perceived or calculated true value of a company based on fundamental analysis, regardless of its current market price. Different valuation methods may produce different intrinsic values.',
    category: 'valuation',
  },
  {
    term: 'Market Capitalization',
    definition: 'The total market value of a company\'s outstanding shares, calculated as share price multiplied by shares outstanding. Used to classify companies as small-cap, mid-cap, or large-cap.',
    category: 'valuation',
  },
  {
    term: 'Shares Outstanding',
    definition: 'The total number of shares of a company\'s stock currently held by all shareholders, including institutional investors and company insiders.',
    category: 'valuation',
  },
  {
    term: 'Price to Tangible Book Value (P/TBV)',
    definition: 'Stock price divided by tangible book value per share. A stricter valuation metric than P/B because it excludes goodwill and intangible assets, providing a clearer picture of what investors are paying for hard assets.',
    category: 'valuation',
  },

  // =============================================
  // Income Statement
  // =============================================
  {
    term: 'Net Interest Income',
    definition: 'The difference between interest earned on assets (primarily loans) and interest paid on liabilities (primarily deposits). This is typically the largest revenue source for traditional banks.',
    category: 'income-statement',
  },
  {
    term: 'Non-Interest Income',
    definition: 'Revenue from sources other than interest, including service charges, fees, trading gains, and investment income. Also called fee income.',
    category: 'income-statement',
  },
  {
    term: 'Non-Interest Expense',
    definition: 'Operating expenses excluding interest expense. Includes salaries, occupancy costs, technology, marketing, and other administrative expenses.',
    category: 'income-statement',
  },
  {
    term: 'Fee Income',
    definition: 'Revenue from service charges, account fees, wealth management fees, card interchange, and other non-lending activities. Fee income diversifies a bank\'s revenue beyond interest-rate-dependent sources.',
    category: 'income-statement',
  },
  {
    term: 'Net Interest Spread',
    definition: 'The difference between the average yield earned on interest-bearing assets and the average rate paid on interest-bearing liabilities. Related to but distinct from net interest margin, which uses total earning assets as the denominator.',
    category: 'income-statement',
  },
  {
    term: 'Mortgage Banking Income',
    definition: 'Revenue from originating, selling, and servicing mortgage loans. Includes gain-on-sale income from selling loans into the secondary market and ongoing servicing fees.',
    category: 'income-statement',
  },
  {
    term: 'Interest Expense',
    definition: 'The cost a bank pays for borrowed funds, including interest on deposits, Federal Home Loan Bank advances, subordinated debt, and other borrowings. It is the largest expense for most banks and directly affects net interest income.',
    category: 'income-statement',
  },

  // =============================================
  // Funding & Deposits
  // =============================================
  {
    term: 'Core Deposits',
    definition: 'Stable, low-cost deposits from a bank\'s local customer base, including checking accounts, savings accounts, and small time deposits. Core deposits are the most valuable and reliable funding source for banks.',
    category: 'funding-deposits',
  },
  {
    term: 'Non-Interest-Bearing Deposits',
    definition: 'Deposit accounts (primarily checking accounts) that pay no interest to the depositor. They represent free funding for the bank and are highly valuable because they directly support net interest margin.',
    category: 'funding-deposits',
  },
  {
    term: 'Time Deposits / Certificates of Deposit',
    definition: 'Deposits held for a fixed term at a specified interest rate. CDs are more rate-sensitive than core checking and savings accounts and may leave the bank when rates are not competitive.',
    category: 'funding-deposits',
  },
  {
    term: 'Brokered Deposits',
    definition: 'Deposits placed by a third-party broker rather than gathered directly from customers. They are typically more expensive and less stable than core deposits, and regulators treat them as a higher-risk funding source.',
    category: 'funding-deposits',
  },
  {
    term: 'Wholesale Funding',
    definition: 'Non-deposit funding sources such as Federal Home Loan Bank advances, federal funds purchased, repurchase agreements, and subordinated debt. Higher reliance on wholesale funding can indicate deposit franchise weakness.',
    category: 'funding-deposits',
  },
  {
    term: 'Cost of Funds',
    definition: 'The blended interest rate a bank pays on all of its funding sources, including deposits and borrowings. A lower cost of funds directly supports wider net interest margin and higher profitability.',
    category: 'funding-deposits',
  },
  {
    term: 'Deposit Franchise',
    definition: 'The value of a bank\'s deposit-gathering network and customer relationships. A strong deposit franchise provides low-cost, stable funding and is often considered the most important intangible asset a bank possesses.',
    category: 'funding-deposits',
  },
  {
    term: 'Federal Home Loan Bank (FHLB)',
    definition: 'A government-sponsored enterprise that provides wholesale funding to member banks through advances (loans) secured by collateral such as mortgages and government securities. FHLB advances are a common source of supplemental bank liquidity.',
    category: 'funding-deposits',
  },
  {
    term: 'Liquidity Coverage Ratio (LCR)',
    definition: 'A Basel III requirement that banks hold enough high-quality liquid assets to cover total net cash outflows over a 30-day stress scenario. Ensures banks can survive short-term funding disruptions.',
    category: 'funding-deposits',
  },
  {
    term: 'Net Stable Funding Ratio (NSFR)',
    definition: 'A Basel III requirement that banks maintain a stable funding profile relative to the maturity of their assets. Ensures long-term assets are funded with appropriately stable sources rather than short-term wholesale funding.',
    category: 'funding-deposits',
  },

  // =============================================
  // Banking Industry
  // =============================================
  {
    term: 'Community Bank',
    definition: 'A locally focused bank typically with less than $10 billion in total assets. Community banks emphasize relationship lending, serve local markets, and often hold a higher proportion of commercial real estate and small business loans.',
    category: 'banking-industry',
  },
  {
    term: 'Regional Bank',
    definition: 'A mid-sized bank operating across multiple states or a significant geographic region, typically with $10 billion to $250 billion in total assets. Regional banks offer broader services than community banks but are more focused than money center banks.',
    category: 'banking-industry',
  },
  {
    term: 'Money Center Bank',
    definition: 'The largest banks, typically with assets exceeding $250 billion, that operate nationally and internationally. They have diversified business lines including investment banking, trading, and wealth management alongside traditional lending.',
    category: 'banking-industry',
  },
  {
    term: 'G-SIB (Global Systemically Important Bank)',
    definition: 'A bank designated by the Financial Stability Board as systemically important to the global financial system. G-SIBs face additional capital surcharges, enhanced supervision, and resolution planning requirements. In the US, G-SIBs include the largest bank holding companies.',
    category: 'banking-industry',
  },
  {
    term: 'Bank Holding Company (BHC)',
    definition: 'A corporation that owns or controls one or more banks. BHCs are regulated by the Federal Reserve and may also own non-bank subsidiaries engaged in financial activities. Most publicly traded bank stocks are shares of the holding company.',
    category: 'banking-industry',
  },
  {
    term: 'De Novo Bank',
    definition: 'A newly chartered bank, typically in its first three to seven years of operation. De novo banks often show suppressed profitability metrics during their startup phase as they build scale, and regulators subject them to enhanced oversight.',
    category: 'banking-industry',
  },
  {
    term: 'Thrift / Savings Institution',
    definition: 'A financial institution historically focused on residential mortgage lending and savings deposits. Thrifts operate under a different charter than commercial banks but are now regulated similarly. They include savings banks and savings and loan associations.',
    category: 'banking-industry',
  },
  {
    term: 'FDIC (Federal Deposit Insurance Corporation)',
    definition: 'The US government agency that insures deposits up to $250,000 per depositor per institution and serves as the primary federal regulator for state-chartered banks that are not members of the Federal Reserve System. The FDIC also manages the resolution of failed banks.',
    category: 'banking-industry',
  },
  {
    term: 'OCC (Office of the Comptroller of the Currency)',
    definition: 'The federal agency that charters, regulates, and supervises all national banks and federal savings associations. The OCC ensures these institutions operate safely, soundly, and in compliance with applicable laws.',
    category: 'banking-industry',
  },
  {
    term: 'Federal Reserve',
    definition: 'The central bank of the United States. The Fed sets monetary policy (including the federal funds rate), supervises and regulates bank holding companies and state-chartered member banks, and serves as lender of last resort through the discount window.',
    category: 'banking-industry',
  },
  {
    term: 'CAMELS Rating',
    definition: 'A confidential supervisory rating system used by US bank regulators to evaluate a bank\'s overall condition. The acronym stands for Capital adequacy, Asset quality, Management, Earnings, Liquidity, and Sensitivity to market risk. Each component is rated 1 (strong) through 5 (critically deficient).',
    category: 'banking-industry',
  },
  {
    term: 'Dodd-Frank Act',
    definition: 'The Dodd-Frank Wall Street Reform and Consumer Protection Act of 2010, enacted in response to the 2008 financial crisis. It established enhanced regulatory requirements for large banks including stress testing, the Volcker Rule, and the creation of the Consumer Financial Protection Bureau.',
    category: 'banking-industry',
  },
  {
    term: 'Volcker Rule',
    definition: 'A provision of the Dodd-Frank Act that generally prohibits banks from engaging in proprietary trading and limits their investments in hedge funds and private equity funds. Named after former Federal Reserve Chairman Paul Volcker.',
    category: 'banking-industry',
  },
  {
    term: 'Living Will / Resolution Plan',
    definition: 'A document required of large bank holding companies that describes the company\'s strategy for orderly resolution in the event of material financial distress or failure, without requiring a taxpayer bailout.',
    category: 'banking-industry',
  },

  // =============================================
  // Investment Analysis
  // =============================================
  {
    term: 'DuPont Decomposition',
    definition: 'An analytical framework that breaks ROE into its component drivers: profit margin, asset utilization, and the equity multiplier (leverage). For banks, a common decomposition is ROE = ROAA × Equity Multiplier, linking profitability to leverage.',
    category: 'investment-analysis',
  },
  {
    term: 'Equity Multiplier',
    definition: 'Total assets divided by total shareholders\' equity. Measures financial leverage — a higher multiplier means the bank is using more debt relative to equity. It is the inverse of the equity-to-assets ratio and a key component of DuPont decomposition.',
    category: 'investment-analysis',
  },
  {
    term: 'Sustainable Growth Rate',
    definition: 'The maximum rate at which a bank can grow its equity (and thus its balance sheet) without raising external capital. Calculated as ROE multiplied by the retention ratio (1 minus the dividend payout ratio).',
    category: 'investment-analysis',
  },
  {
    term: 'Retention Ratio',
    definition: 'The percentage of net income retained in the business rather than paid out as dividends. Calculated as 1 minus the dividend payout ratio. A higher retention ratio supports faster internal capital growth.',
    category: 'investment-analysis',
  },
  {
    term: 'Normalized Earnings',
    definition: 'Earnings adjusted to remove one-time items, unusual provision levels, and other non-recurring factors. Normalized earnings estimate what a bank would earn in a typical operating environment and are essential for through-the-cycle valuation.',
    category: 'investment-analysis',
  },
  {
    term: 'Peer Group',
    definition: 'A set of comparable banks selected for benchmarking based on similar characteristics such as asset size, geography, business model, and risk profile. Meaningful peer comparison requires careful peer group construction.',
    category: 'investment-analysis',
  },
  {
    term: 'Earnings Quality',
    definition: 'An assessment of how sustainable and repeatable a bank\'s reported earnings are. High-quality earnings come from recurring sources like net interest income, while low-quality earnings may rely on one-time gains, reserve releases, or aggressive accounting.',
    category: 'investment-analysis',
  },
  {
    term: 'Value Investing',
    definition: 'An investment strategy that involves buying securities that appear underpriced based on fundamental analysis. Popularized by Benjamin Graham and Warren Buffett, it emphasizes margin of safety and intrinsic value over market sentiment.',
    category: 'investment-analysis',
  },
  {
    term: 'Cost of Equity',
    definition: 'The return that equity investors require to compensate them for the risk of owning a bank\'s stock. A key input to the ROE-P/B valuation framework — a bank earning ROE above its cost of equity creates shareholder value and should trade above book value.',
    category: 'investment-analysis',
  },
  {
    term: 'Dividend Yield',
    definition: 'Annual dividends per share divided by the current stock price, expressed as a percentage. Dividend yield measures the income return on a stock investment and is an important consideration for income-focused bank stock investors.',
    category: 'investment-analysis',
  },

  // =============================================
  // Balance Sheet & Accounting
  // =============================================
  {
    term: 'Goodwill',
    definition: 'An intangible asset that arises when a bank acquires another institution for more than the fair value of its net tangible assets. Goodwill is tested annually for impairment and is excluded from tangible equity calculations.',
    category: 'balance-sheet-accounting',
  },
  {
    term: 'Fair Value',
    definition: 'The price at which an asset could be sold or a liability settled in an orderly transaction between market participants. Fair value accounting affects how banks report their investment securities, derivatives, and certain loans.',
    category: 'balance-sheet-accounting',
  },
  {
    term: 'AOCI (Accumulated Other Comprehensive Income)',
    definition: 'A component of shareholders\' equity that captures unrealized gains and losses not included in net income, primarily from available-for-sale securities and pension adjustments. Changes in AOCI directly affect book value and CET1 capital.',
    category: 'balance-sheet-accounting',
  },
  {
    term: 'Held-to-Maturity Securities',
    definition: 'Debt securities a bank intends and has the ability to hold until maturity. Carried at amortized cost on the balance sheet, so unrealized gains and losses from rate changes do not flow through earnings or AOCI.',
    category: 'balance-sheet-accounting',
  },
  {
    term: 'Available-for-Sale Securities',
    definition: 'Debt securities not classified as held-to-maturity or trading. Carried at fair value on the balance sheet, with unrealized gains and losses recorded in AOCI (part of equity) rather than on the income statement.',
    category: 'balance-sheet-accounting',
  },
  {
    term: 'Mark-to-Market',
    definition: 'An accounting method that values assets at their current market price rather than historical cost. For banks, mark-to-market applies to trading securities and affects the fair value of available-for-sale portfolios.',
    category: 'balance-sheet-accounting',
  },
  {
    term: 'Tangible Common Equity (TCE)',
    definition: 'Total shareholders\' equity minus preferred equity, goodwill, and other intangible assets. TCE represents the most conservative measure of a bank\'s equity capital and is used in tangible book value and TCE ratio calculations.',
    category: 'balance-sheet-accounting',
  },
  {
    term: 'Asset-Liability Management (ALM)',
    definition: 'The practice of managing a bank\'s balance sheet to control interest rate risk and ensure adequate liquidity. ALM involves matching the repricing characteristics and maturities of assets and liabilities to protect net interest margin.',
    category: 'balance-sheet-accounting',
  },

  // =============================================
  // Data Sources
  // =============================================
  {
    term: 'SEC EDGAR',
    definition: 'The Electronic Data Gathering, Analysis, and Retrieval system operated by the U.S. Securities and Exchange Commission. It provides free public access to corporate filings including 10-K annual reports and 10-Q quarterly reports.',
    category: 'data-sources',
  },
  {
    term: '10-K Filing',
    definition: 'An annual report required by the SEC that provides a comprehensive summary of a company\'s financial performance. It includes audited financial statements, management discussion, and risk factors.',
    category: 'data-sources',
  },
  {
    term: '10-Q Filing',
    definition: 'A quarterly report required by the SEC that provides unaudited financial statements and updates on a company\'s financial condition. Banks file 10-Q reports for Q1, Q2, and Q3 each year.',
    category: 'data-sources',
  },
  {
    term: 'Trailing Twelve Months (TTM)',
    definition: 'A financial measurement that sums the last four quarters of data to provide an up-to-date annual figure. TTM smooths out seasonal variations and provides more current data than the last fiscal year.',
    category: 'data-sources',
  },
  {
    term: 'SIC Code',
    definition: 'Standard Industrial Classification code used to categorize companies by industry. Banks typically fall under SIC codes 6021 (National Commercial Banks), 6022 (State Commercial Banks), 6035-6036 (Savings Institutions).',
    category: 'data-sources',
  },
  {
    term: 'CIK Number',
    definition: 'Central Index Key — a unique identifier assigned by the SEC to each company and individual who files with the SEC. Used to look up filings in the EDGAR database.',
    category: 'data-sources',
  },
  {
    term: 'Call Report (FFIEC)',
    definition: 'A quarterly regulatory filing (formally the Consolidated Reports of Condition and Income) that every US bank must submit to the FFIEC. Call reports contain detailed financial data and are a primary data source for regulatory analysis and industry benchmarking.',
    category: 'data-sources',
  },
];

/**
 * Glossary Page Component
 * Comprehensive financial terms glossary for bank analysis
 */
function Glossary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Combine all terms from metrics, valuations, and additional terms
  const allTerms = useMemo(() => {
    const metricTerms = METRICS.map(m => {
      // Remap certain metric categories for the glossary
      const glossaryCategory = METRIC_CATEGORY_OVERRIDES[m.slug];
      let category = m.category;
      if (glossaryCategory) {
        category = glossaryCategory;
      } else if (m.category === 'profitability' || m.category === 'efficiency') {
        category = 'profitability-efficiency';
      } else if (m.category === 'capital') {
        category = 'capital-regulatory';
      } else if (m.category === 'asset-quality') {
        category = 'credit-quality';
      } else if (m.category === 'balance-sheet') {
        category = 'balance-sheet-accounting';
      }
      return {
        term: m.name,
        definition: m.shortDescription,
        fullDescription: m.description,
        category,
        link: `/metrics/${m.slug}`,
      };
    });

    const valuationTerms = VALUATION_METHODS.map(v => ({
      term: v.name,
      definition: v.shortDescription,
      fullDescription: v.description,
      category: 'valuation',
      link: `/valuation/${v.slug}`,
    }));

    const additionalTerms = ADDITIONAL_TERMS.map(t => ({
      ...t,
      link: null,
    }));

    return [...metricTerms, ...valuationTerms, ...additionalTerms].sort((a, b) =>
      a.term.localeCompare(b.term)
    );
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(allTerms.map(t => t.category));
    return ['all', ...Array.from(cats).sort()];
  }, [allTerms]);

  // Category labels
  const categoryLabels = {
    all: 'All Terms',
    'profitability-efficiency': 'Profitability & Efficiency',
    'capital-regulatory': 'Capital & Regulatory',
    'credit-quality': 'Credit Quality & Risk',
    valuation: 'Valuation',
    'income-statement': 'Income Statement',
    'funding-deposits': 'Funding & Deposits',
    'banking-industry': 'Banking Industry',
    'investment-analysis': 'Investment Analysis',
    'balance-sheet-accounting': 'Balance Sheet & Accounting',
    'data-sources': 'Data Sources',
  };

  // Filter terms based on search and category
  const filteredTerms = useMemo(() => {
    return allTerms.filter(t => {
      const matchesSearch = searchQuery === '' ||
        t.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.definition.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allTerms, searchQuery, selectedCategory]);

  // Note: Schema (DefinedTermSet, BreadcrumbList, FAQPage) is provided by the prerender script
  // (scripts/prerender.mjs) in the static HTML for immediate crawler access.
  // Do NOT add a schema here to avoid duplicates.

  return (
    <div className="page glossary-page">
      <SEO
        title="Financial Glossary - Bank Analysis Terms"
        description="Comprehensive glossary of over 100 financial terms for bank stock analysis. Definitions for capital ratios, credit quality metrics, valuation methods, regulatory concepts, and banking industry terms."
        canonical="/glossary"
        image="https://banksift.org/og-glossary.png"
      />

      <div className="page-header">
        <h1>Financial Glossary</h1>
        <p>
          Over 100 definitions of financial terms, metrics, and concepts used in bank analysis.
          Click on any term with a link to learn more.
        </p>
      </div>

      <div className="glossary-filters">
        <div className="glossary-search">
          <input
            type="text"
            placeholder="Search terms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="glossary-search-input"
          />
        </div>
        <div className="glossary-categories">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {categoryLabels[cat] || cat}
            </button>
          ))}
        </div>
      </div>

      <div className="glossary-content">
        <p className="glossary-count">
          Showing {filteredTerms.length} of {allTerms.length} terms
        </p>

        <dl className="glossary-list">
          {filteredTerms.map((item, index) => (
            <div key={index} className="glossary-item">
              <dt className="glossary-term">
                {item.link ? (
                  <Link to={item.link}>{item.term}</Link>
                ) : (
                  item.term
                )}
              </dt>
              <dd className="glossary-definition">
                {item.definition}
                {item.link && (
                  <Link to={item.link} className="glossary-learn-more-btn">
                    Learn more →
                  </Link>
                )}
              </dd>
            </div>
          ))}
        </dl>

        {filteredTerms.length === 0 && (
          <div className="glossary-empty">
            <p>No terms found matching your search.</p>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      <div className="glossary-footer">
        <h2>Using This Glossary</h2>
        <p>
          This glossary covers financial metrics and terms commonly used in bank stock analysis.
          Terms linked to detailed pages include formulas, interpretation guides, and typical
          ranges for banks. All data on BankSift is sourced from official SEC EDGAR filings.
        </p>
        <div className="glossary-cta">
          <Link to="/metrics" className="btn btn-secondary">
            Explore All Metrics
          </Link>
          <Link to="/screener" className="btn btn-primary">
            Use the Screener
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Glossary;

// ============================================================================
// PHASE 2 / BATCH 2 — SUB-BATCH 2: ASSET QUALITY METRICS (7 entries)
// ============================================================================
// Target file: src/data/content/metrics.js (append to METRICS array)
// All entries are isEducationalOnly: true (not in screener)
// Category: 'asset-quality', categoryLabel: 'Asset Quality Ratio'
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
// NEW METRIC SLUGS (this sub-batch — Asset Quality):
//   non-performing-loans-ratio, non-performing-assets-ratio,
//   net-charge-off-ratio, loan-loss-reserve-ratio, reserve-coverage-ratio,
//   texas-ratio, provision-to-average-loans
//
// NEW METRIC SLUGS (Sub-batch 3 — Profitability, Valuation, Efficiency):
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

const ASSET_QUALITY_METRICS = [
  // =========================================================================
  // 1. Non-Performing Loans (NPL) Ratio
  // =========================================================================
  {
    slug: 'non-performing-loans-ratio',
    name: 'Non-Performing Loans (NPL) Ratio',
    category: 'asset-quality',
    categoryLabel: 'Asset Quality Ratio',
    formula: 'NPL Ratio = Non-Performing Loans / Total Loans',
    isPercentage: true,
    shortDescription: 'Measures the percentage of a bank\'s loan portfolio that is non-performing, serving as the primary indicator of credit quality deterioration',
    description: 'The Non-Performing Loans Ratio divides total non-performing loans by total gross loans. Non-performing loans include loans that are 90 or more days past due and still accruing interest, plus loans placed on non-accrual status (where the bank has stopped recognizing interest income because collection of the full principal or interest is doubtful). The ratio is the most direct measure of credit quality problems in a bank\'s loan portfolio.',
    formulaExplanation: 'The numerator includes two categories: loans past due 90 days or more and still accruing, and loans on non-accrual status. Non-accrual loans are those where the bank has determined that full repayment of principal and interest is not expected and has stopped recognizing interest income on the loan. The denominator is total gross loans (before the deduction of the allowance for credit losses). Using gross loans rather than net loans ensures the ratio reflects the full exposure base.',
    interpretation: 'A rising NPL ratio signals deteriorating credit quality, meaning borrowers are increasingly unable to make scheduled payments. This has direct implications for future charge-offs, provision expense, and earnings. A declining NPL ratio indicates improving credit conditions, either through borrower recovery, successful workouts, or charge-offs removing non-performing loans from the books.',
    typicalRange: 'During normal economic conditions, US banks typically maintain NPL ratios between 0.5% and 2.0% (FDIC aggregate data). During credit downturns, NPL ratios can spike significantly; the US banking industry average peaked above 5% during the 2009-2010 period according to FDIC Quarterly Banking Profile data. Individual bank NPL ratios vary widely based on loan mix, underwriting standards, and geographic concentration.',
    goodBad: {
      good: 'NPL ratios below 1.0% indicate strong credit quality with minimal loan performance problems. Ratios below 0.5% suggest very clean loan portfolios, though extremely low levels sustained over long periods could also indicate overly conservative lending that limits growth and profitability.',
      bad: 'NPL ratios above 3.0% indicate significant credit quality problems that will likely result in elevated charge-offs and provision expense. Ratios above 5.0% signal severe credit stress that can threaten earnings, capital, and in extreme cases, the viability of the institution.',
    },
    considerations: [
      'The NPL ratio is a lagging indicator. Loans must be significantly delinquent (90+ days) or formally placed on non-accrual before they appear as non-performing. By the time the NPL ratio rises meaningfully, credit problems have typically been building for several quarters. Early warning metrics such as 30-59 day and 60-89 day delinquency rates can provide earlier signals.',
      'Banks can manage the NPL ratio through charge-offs, loan sales, and restructuring. Aggressively charging off problem loans reduces the NPL ratio but also reduces the loan portfolio and may result in lower future recoveries. Comparing NPL ratios without also examining charge-off trends can be misleading.',
      'Non-performing loan definitions can vary slightly across banks. Some banks are more aggressive than others in placing loans on non-accrual status, particularly for collateral-dependent loans. Regulatory examinations can result in reclassifications that cause sudden NPL ratio increases.',
      'The mix of loan types significantly affects the expected NPL ratio. Consumer loan portfolios (credit cards, auto loans) tend to have higher baseline delinquency rates than commercial loan portfolios, though commercial loan losses per occurrence are typically larger.',
    ],
    relatedMetrics: ['non-performing-assets-ratio', 'net-charge-off-ratio', 'loan-loss-reserve-ratio', 'reserve-coverage-ratio', 'texas-ratio', 'provision-to-average-loans'],
    relatedMetricDescriptions: {
      'non-performing-assets-ratio': 'NPA Ratio broadens the view beyond loans to include other non-performing assets such as other real estate owned (OREO), providing a more comprehensive picture of problem assets.',
      'net-charge-off-ratio': 'Net Charge-Off Ratio measures actual loan losses realized, complementing the NPL ratio which measures loans that may eventually result in losses but have not yet been charged off.',
      'loan-loss-reserve-ratio': 'The Loan Loss Reserve Ratio shows how much the bank has set aside to cover potential loan losses, providing context for how well the bank is provisioned against its problem loans.',
      'reserve-coverage-ratio': 'Reserve Coverage divides the allowance for credit losses by non-performing loans, directly measuring the degree to which reserves cover known problem loans.',
      'texas-ratio': 'The Texas Ratio combines non-performing assets with the bank\'s capital and reserves to assess whether the bank has sufficient resources to absorb potential losses.',
      'provision-to-average-loans': 'Provision to Average Loans measures the current period\'s provisioning intensity, indicating how aggressively the bank is building reserves in response to credit conditions.',
    },
    isEducationalOnly: true,
    whereToFindData: 'Non-performing loan data is available in a bank\'s 10-Q and 10-K filings, typically in the credit quality section of Management\'s Discussion and Analysis or in the notes to the financial statements. Call Reports (FFIEC 031/041) contain detailed asset quality schedules. The FDIC\'s BankFind Suite and Quarterly Banking Profile provide aggregate and individual bank NPL data. The Federal Reserve\'s FR Y-9C filing includes non-performing loan data for holding companies.',
    bankSpecificContext: 'Credit risk is the defining risk for commercial banks. Unlike industrial companies where revenue risk is primary, banks face the constant possibility that borrowers will not repay their loans. The NPL ratio is the most fundamental measure of this risk because it captures the portion of the loan portfolio where repayment problems have already surfaced. For bank investors, the NPL ratio and its trajectory over time are critical inputs for evaluating the sustainability of current earnings and the adequacy of loan loss reserves.',
    metricConnections: 'The NPL ratio connects directly to several other asset quality and capital metrics. Reserve Coverage Ratio = Loan Loss Reserve / NPL; a rising NPL ratio with a stable reserve balance means declining coverage. The Texas Ratio uses NPAs (which include NPLs) in its numerator. Net charge-offs often lag NPL formation by one to four quarters as banks work through problem loans before recognizing losses. Elevated NPLs drive higher provision expense, which reduces pre-tax earnings, ROAA, ROE, and EPS. Through this earnings channel, credit quality problems ultimately affect valuation metrics like P/E and P/B.',
    commonPitfalls: 'A declining NPL ratio is not always a positive signal. Banks can reduce NPLs by aggressively charging off problem loans, selling non-performing loan portfolios, or engaging in troubled debt restructurings (TDRs) that move loans back to performing status. Each of these actions reduces the NPL ratio but has different implications for future losses and recovery potential. Evaluating the NPL ratio alongside the net charge-off ratio and reserve levels provides a more complete picture. Additionally, comparing NPL ratios across banks without accounting for loan mix differences is unreliable because consumer, commercial, and CRE loan portfolios have different baseline delinquency characteristics.',
    acrossBankTypes: 'Community banks concentrated in commercial real estate lending may exhibit higher NPL volatility because CRE loans are often lumpy (a single large loan going non-performing can meaningfully move the ratio). Money center banks with diversified global loan portfolios tend to have more stable NPL ratios, though their absolute levels depend on the credit cycle. Banks with large credit card portfolios typically have higher baseline delinquency rates but faster resolution through charge-offs, potentially showing lower NPL ratios but higher charge-off ratios.',
    whatDrivesMetric: 'The NPL ratio is driven by macroeconomic conditions (unemployment, GDP growth, interest rates), local market conditions in the bank\'s lending footprint, underwriting quality (which determines how loans perform during stress), loan mix (CRE, C&I, consumer each have different delinquency profiles), and the bank\'s workout and charge-off policies. Rising interest rates can push variable-rate borrowers into delinquency. Economic recessions drive broad increases in NPLs across most loan categories.',
    faqTeasers: [
      {
        question: 'What is the non-performing loans (NPL) ratio?',
        teaser: 'The NPL ratio measures the percentage of a bank\'s loan portfolio that is non-performing (90+ days past due or on non-accrual), serving as the primary indicator of credit quality deterioration.',
        faqSlug: 'what-is-npl-ratio',
        faqCluster: 'capital-and-risk',
      },
      {
        question: 'How do I evaluate the credit quality of a bank\'s loan portfolio?',
        teaser: 'Evaluating credit quality requires examining multiple metrics together, including the NPL ratio, net charge-off ratio, reserve coverage, and provision trends, alongside the composition of the loan portfolio itself.',
        faqSlug: 'how-to-evaluate-loan-credit-quality',
        faqCluster: 'capital-and-risk',
      },
      {
        question: 'How do I calculate the NPL Ratio?',
        teaser: 'The NPL ratio divides non-performing loans (loans 90+ days past due plus non-accrual loans) by total gross loans.',
        faqSlug: 'how-to-calculate-npl-ratio',
        faqCluster: 'capital-and-risk',
      },
    ],
  },

  // =========================================================================
  // 2. Non-Performing Assets (NPA) Ratio
  // =========================================================================
  {
    slug: 'non-performing-assets-ratio',
    name: 'Non-Performing Assets (NPA) Ratio',
    category: 'asset-quality',
    categoryLabel: 'Asset Quality Ratio',
    formula: 'NPA Ratio = Non-Performing Assets / Total Assets',
    isPercentage: true,
    shortDescription: 'Measures non-performing assets (including NPLs and other real estate owned) as a percentage of total assets, providing the broadest view of a bank\'s problem asset exposure',
    description: 'The Non-Performing Assets Ratio divides total non-performing assets by total assets. Non-performing assets include all non-performing loans (90+ days past due and non-accrual) plus other real estate owned (OREO, which is property acquired through foreclosure or deed in lieu of foreclosure) and any other repossessed assets. The NPA ratio provides a broader view of problem assets than the NPL ratio because it captures assets that have already moved beyond the loan stage into foreclosure or repossession.',
    formulaExplanation: 'The numerator sums non-performing loans, OREO, and other repossessed assets. OREO represents real property that the bank has acquired through the foreclosure process and now holds on its balance sheet, typically at the lower of cost or fair value less estimated selling costs. Other repossessed assets may include equipment, vehicles, or other collateral seized from defaulted borrowers. The denominator is total assets from the balance sheet, providing a measure of total exposure relative to the bank\'s full asset base.',
    interpretation: 'A rising NPA ratio indicates expanding credit problems, with assets moving through the stages from delinquent to non-performing to foreclosed. The NPA ratio captures the full lifecycle of problem assets; some assets that exit the NPL numerator through foreclosure re-enter the NPA ratio through OREO. A declining NPA ratio indicates the bank is resolving problem assets through sales, workouts, or write-downs.',
    typicalRange: 'During normal economic conditions, US banks typically maintain NPA ratios between 0.3% and 1.5% (FDIC data). During credit downturns, NPA ratios can increase substantially; the US banking industry average exceeded 3% during 2009-2011 per FDIC Quarterly Banking Profile data. Individual bank ratios vary based on loan mix, geographic concentration, and the pace of problem asset resolution.',
    goodBad: {
      good: 'NPA ratios below 0.5% indicate very clean balance sheets with minimal problem assets. Ratios below 1.0% suggest manageable credit quality issues that are unlikely to significantly impact earnings or capital.',
      bad: 'NPA ratios above 2.0% indicate meaningful problem asset concentrations that will pressure earnings through provision expense, OREO maintenance costs, and eventual disposition losses. Ratios above 3.0% signal severe credit stress that may require additional capital or attract regulatory attention.',
    },
    considerations: [
      'OREO carries ongoing costs (property taxes, insurance, maintenance) and is typically sold at a loss relative to the original loan balance. Banks are generally required to dispose of OREO within a specified period (typically five years under federal banking regulations), creating pressure to accept below-market prices.',
      'The NPA ratio uses total assets as the denominator rather than total loans. This means the ratio is influenced by the bank\'s overall asset size and composition, not just lending activity. A bank with a large securities portfolio may show a lower NPA ratio than a bank of similar loan quality simply because total assets are larger relative to loans.',
      'Problem asset resolution takes time. OREO typically remains on the books for months to years depending on property type and market conditions. The NPA ratio can remain elevated long after new problem loan formation has subsided, reflecting the lag in disposing of previously foreclosed properties.',
      'Under CECL (Current Expected Credit Losses), banks must estimate lifetime credit losses when originating loans. This front-loads reserve building but does not change when loans are classified as non-performing. The NPA ratio therefore remains a backward-looking measure of credit quality even under CECL.',
    ],
    relatedMetrics: ['non-performing-loans-ratio', 'texas-ratio', 'net-charge-off-ratio', 'loan-loss-reserve-ratio', 'reserve-coverage-ratio', 'tangible-common-equity-ratio'],
    relatedMetricDescriptions: {
      'non-performing-loans-ratio': 'The NPL ratio measures only the loan component of non-performing assets, excluding OREO and repossessed assets that have moved beyond the loan stage.',
      'texas-ratio': 'The Texas Ratio uses NPAs in its numerator and divides by tangible common equity plus loan loss reserves, directly measuring the capacity to absorb NPA losses.',
      'net-charge-off-ratio': 'Net charge-offs measure realized losses on loans, while NPAs measure the stock of problem assets that may produce future losses.',
      'loan-loss-reserve-ratio': 'The allowance for credit losses is sized relative to the loan portfolio but informed by the level of non-performing assets.',
      'reserve-coverage-ratio': 'Reserve coverage relates the allowance to NPLs specifically; the NPA ratio adds the OREO dimension that reserve coverage does not directly address.',
      'tangible-common-equity-ratio': 'TCE represents the tangible capital available to absorb losses from non-performing assets, linking asset quality to capital adequacy.',
    },
    isEducationalOnly: true,
    whereToFindData: 'Non-performing asset data is disclosed in a bank\'s 10-Q and 10-K filings in the credit quality and asset quality sections. Call Reports (FFIEC 031/041) contain detailed schedules for non-performing loans, OREO, and other repossessed assets. The FDIC\'s BankFind Suite provides NPA data for individual institutions. The FDIC Quarterly Banking Profile reports aggregate NPA ratios for the banking industry. OREO balances are typically a separate line item on the balance sheet.',
    bankSpecificContext: 'The NPA ratio is particularly important for bank analysis because banks are in the business of accepting and managing credit risk. Unlike other industries where asset quality problems might involve inventory obsolescence or equipment depreciation, bank asset quality problems represent the potential failure of the bank\'s core function: extending credit to borrowers who repay. The NPA ratio captures the full spectrum of credit problems, from loans where payments have stopped to properties that the bank has been forced to take back through foreclosure.',
    metricConnections: 'NPA = NPL + OREO + Other Repossessed Assets. The NPA ratio is the numerator input to the Texas Ratio (Texas Ratio = NPA / (TCE + Loan Loss Reserves)). NPAs flow from rising NPLs (as delinquent loans become non-performing) and into OREO (as non-performing loans are foreclosed). The eventual resolution of NPAs through charge-offs, loan sales, or OREO disposition feeds into the net charge-off ratio and can affect ROAA through disposition gains or losses. Elevated NPAs typically correlate with higher provision expense, which reduces earnings and slows capital formation through retained earnings.',
    commonPitfalls: 'Comparing NPA ratios across banks without considering their OREO resolution strategies is misleading. Some banks aggressively mark down and sell OREO quickly (reducing NPA but recognizing losses), while others hold OREO longer hoping for better disposition prices (keeping NPA elevated but deferring losses). Additionally, the denominator difference between the NPL ratio (total loans) and NPA ratio (total assets) means these ratios are not directly comparable in percentage terms.',
    acrossBankTypes: 'Banks with large commercial real estate portfolios (common among community and regional banks) tend to have higher NPA volatility because CRE foreclosures produce significant OREO balances that take time to resolve. Banks focused on consumer lending may have lower NPA ratios because consumer defaults are resolved more quickly through charge-offs rather than extended foreclosure processes. Money center banks with diversified portfolios generally have more stable NPA ratios but may carry specialized problem assets from areas like leveraged lending or international exposures.',
    whatDrivesMetric: 'The NPA ratio is driven by the same macroeconomic and credit cycle factors that drive the NPL ratio, plus the pace of problem asset resolution. Local real estate market conditions affect OREO values and disposition timelines. Rising interest rates can increase both loan delinquencies and the time needed to sell foreclosed properties. Management\'s problem asset resolution strategy (aggressive vs. patient) directly affects how quickly NPAs decline once new problem loan formation slows.',
    faqTeasers: [
      {
        question: 'What are non-performing assets (NPA) and how do they affect bank value?',
        teaser: 'Non-performing assets include non-performing loans plus foreclosed properties and repossessed collateral, representing the full scope of a bank\'s problem asset exposure.',
        faqSlug: 'what-are-non-performing-assets',
        faqCluster: 'capital-and-risk',
      },
      {
        question: 'What is the Texas Ratio and how do I calculate it?',
        teaser: 'The Texas Ratio divides non-performing assets by the sum of tangible common equity and loan loss reserves, measuring whether a bank has enough tangible resources to absorb its problem asset exposure.',
        faqSlug: 'what-is-texas-ratio',
        faqCluster: 'capital-and-risk',
      },
    ],
  },

  // =========================================================================
  // 3. Net Charge-Off Ratio
  // =========================================================================
  {
    slug: 'net-charge-off-ratio',
    name: 'Net Charge-Off Ratio',
    category: 'asset-quality',
    categoryLabel: 'Asset Quality Ratio',
    formula: 'Net Charge-Off Ratio = Net Charge-Offs / Average Loans',
    isPercentage: true,
    shortDescription: 'Measures actual loan losses realized during a period as a percentage of average loans, providing the most concrete measure of credit cost',
    description: 'The Net Charge-Off Ratio divides net charge-offs (gross charge-offs minus recoveries) by average loans for the period. A charge-off occurs when a bank removes a loan from its books because it determines the loan is uncollectible, writing it off against the allowance for credit losses. Recoveries represent amounts collected on previously charged-off loans. The ratio measures the actual loss rate experienced on the loan portfolio over a given period, making it the most concrete measure of credit cost.',
    formulaExplanation: 'Gross charge-offs are the total amount of loans written off as uncollectible during the period. Recoveries are amounts subsequently collected on previously charged-off loans (through collateral liquidation, borrower payments on deficiency balances, or debt collection). Net charge-offs = gross charge-offs minus recoveries. Average loans is typically the average of beginning and ending total loan balances for the period. When using quarterly data, the net charge-off amount should be annualized (multiplied by 4) before dividing by average loans to produce an annualized ratio comparable across periods.',
    interpretation: 'The net charge-off ratio represents the actual realized cost of credit risk during a period. Unlike the NPL ratio (which measures potential future losses), the net charge-off ratio reflects losses that have already been recognized. A rising charge-off ratio indicates that credit problems are maturing into actual losses. A declining ratio indicates improving credit conditions or the resolution of a prior cycle\'s problem loans.',
    typicalRange: 'US banks have historically averaged net charge-off ratios between 0.3% and 0.6% during normal economic conditions (FDIC aggregate data). During the 2009-2010 credit cycle peak, the industry average exceeded 2.5% (FDIC Quarterly Banking Profile). Credit card portfolios typically run higher charge-off rates (3% to 5% in normal times) than commercial loan portfolios (0.1% to 0.5% in normal times).',
    goodBad: {
      good: 'Net charge-off ratios below 0.3% indicate minimal actual loan losses. Ratios in the 0.2% to 0.5% range for a diversified loan portfolio suggest well-managed credit risk with losses consistent with historical norms.',
      bad: 'Net charge-off ratios above 1.0% for a diversified portfolio indicate elevated credit stress. Ratios above 2.0% signal severe credit problems that significantly erode earnings and may require additional provisioning to replenish the allowance for credit losses.',
    },
    considerations: [
      'Charge-off timing is a management decision within regulatory guidelines. Banks can delay or accelerate charge-offs, which affects the timing of when losses appear in the net charge-off ratio. Regulatory guidance generally requires charge-off when a loan is confirmed as uncollectible, but judgment is involved in that determination.',
      'Quarterly net charge-off data must be annualized for comparison with annual ratios. Multiply quarterly net charge-offs by 4 before dividing by average loans. Failure to annualize is a common calculation error that produces ratios one-quarter of the correct magnitude.',
      'A sudden decline in the net charge-off ratio may reflect the completion of a charge-off cycle rather than an improvement in ongoing credit quality. Examining the trend over multiple quarters provides a more reliable signal than any single period\'s ratio.',
      'Recoveries reduce net charge-offs and improve the ratio. Banks with effective recovery operations or strong collateral positions may show lower net charge-off ratios than their gross charge-off activity would suggest. Analyzing both gross and net charge-off trends provides additional insight.',
    ],
    relatedMetrics: ['non-performing-loans-ratio', 'loan-loss-reserve-ratio', 'provision-to-average-loans', 'roaa', 'roe', 'pre-provision-net-revenue'],
    relatedMetricDescriptions: {
      'non-performing-loans-ratio': 'The NPL ratio is a leading indicator of future charge-offs; loans typically move through non-performing status before being charged off.',
      'loan-loss-reserve-ratio': 'Charge-offs reduce the allowance for credit losses, requiring replenishment through provision expense. The relationship between charge-offs and the reserve level indicates provisioning adequacy.',
      'provision-to-average-loans': 'Provision expense must at minimum cover net charge-offs to prevent reserve depletion; comparing the two reveals whether the bank is building or drawing down reserves.',
      'roaa': 'Net charge-offs flow through provision expense into net income, directly affecting ROAA. Higher charge-offs reduce ROAA, all else equal.',
      'roe': 'Through the earnings channel, elevated charge-offs reduce ROE by increasing provision expense and reducing net income available to equity holders.',
      'pre-provision-net-revenue': 'PPNR measures earnings before provision expense, providing context for the bank\'s ability to absorb charge-offs through ongoing earnings rather than capital drawdown.',
    },
    isEducationalOnly: true,
    whereToFindData: 'Net charge-off data is reported in a bank\'s 10-Q and 10-K filings, typically in the credit quality section. The income statement may show provision expense, but net charge-offs are disclosed separately (usually in the notes to financial statements or the Management\'s Discussion and Analysis). Call Reports (FFIEC 031/041) contain detailed charge-off schedules by loan category. The FDIC Quarterly Banking Profile reports aggregate charge-off rates for the banking industry.',
    bankSpecificContext: 'Net charge-offs represent the ultimate cost of credit risk for banks. While provision expense affects current-period earnings, charge-offs represent the actual, confirmed loss of principal. For bank investors, the net charge-off ratio over a full credit cycle reveals the true cost of a bank\'s lending strategy. A bank that generates high NIM through aggressive lending may show strong profitability during benign credit conditions, but if that lending produces elevated charge-offs during downturns, the full-cycle economics may be less attractive than they initially appeared.',
    metricConnections: 'Net charge-offs deplete the allowance for credit losses, requiring replenishment through provision expense. The relationship is: Ending Allowance = Beginning Allowance + Provision Expense - Net Charge-Offs. If net charge-offs exceed provision expense, the allowance declines, reducing the loan loss reserve ratio. If provision expense exceeds net charge-offs, the bank is building reserves. PPNR provides the first line of defense against charge-offs; a bank with PPNR of 2% of assets and charge-offs of 1% can absorb those losses through earnings alone without drawing on capital.',
    commonPitfalls: 'Comparing net charge-off ratios across banks with very different loan mixes is unreliable. Credit card portfolios have structurally higher charge-off rates than secured commercial lending because credit card losses are unsecured and resolved through charge-off rather than extended workout. A bank with a large credit card book will naturally show a higher aggregate charge-off rate than a bank focused on secured commercial lending, even if both banks have equal underwriting quality within their respective segments. Segmented charge-off analysis by loan type provides more meaningful comparisons.',
    acrossBankTypes: 'Large banks with significant consumer lending operations (credit cards, auto loans, personal loans) typically report higher aggregate net charge-off ratios than community banks focused on commercial and CRE lending. This reflects the higher-frequency, lower-severity loss pattern in consumer lending versus the lower-frequency, higher-severity pattern in commercial lending. During credit downturns, community banks with CRE concentrations may experience sharp increases in charge-off ratios from individual large loans, while large bank consumer portfolios tend to show more gradual deterioration across many smaller exposures.',
    whatDrivesMetric: 'Net charge-offs are driven by the credit quality of the loan portfolio (determined by underwriting standards at origination), macroeconomic conditions (unemployment, GDP growth, property values), interest rate changes affecting borrower payment capacity, loan seasoning (loans in the middle years of their term typically have the highest default rates), and collateral values that affect recovery rates. Management\'s charge-off policies and workout effectiveness also influence the timing and magnitude of recognized losses.',
    faqTeasers: [
      {
        question: 'What is the net charge-off ratio and what does it tell me about a bank?',
        teaser: 'The net charge-off ratio measures actual loan losses realized during a period, providing the most concrete assessment of the credit cost a bank is experiencing in its lending operations.',
        faqSlug: 'what-is-net-charge-off-ratio',
        faqCluster: 'capital-and-risk',
      },
      {
        question: 'How do I evaluate the credit quality of a bank\'s loan portfolio?',
        teaser: 'Evaluating credit quality requires examining multiple metrics together, including the NPL ratio, net charge-off ratio, reserve coverage, and provision trends, alongside the composition of the loan portfolio itself.',
        faqSlug: 'how-to-evaluate-loan-credit-quality',
        faqCluster: 'capital-and-risk',
      },
    ],
  },

  // =========================================================================
  // 4. Loan Loss Reserve Ratio
  // =========================================================================
  {
    slug: 'loan-loss-reserve-ratio',
    name: 'Loan Loss Reserve Ratio',
    category: 'asset-quality',
    categoryLabel: 'Asset Quality Ratio',
    formula: 'Loan Loss Reserve Ratio = Allowance for Credit Losses / Total Loans',
    isPercentage: true,
    shortDescription: 'Measures the allowance for credit losses as a percentage of total loans, indicating how much the bank has set aside to cover expected loan losses',
    description: 'The Loan Loss Reserve Ratio divides the allowance for credit losses (ACL, also historically called the allowance for loan and lease losses or ALLL) by total loans. The allowance is a contra-asset on the balance sheet that reduces the net carrying value of the loan portfolio to reflect the bank\'s estimate of expected losses. The ratio indicates the level of provisioning relative to the loan portfolio size, providing a measure of how conservatively the bank is reserved against potential credit losses.',
    formulaExplanation: 'The numerator is the allowance for credit losses, a balance sheet reserve that is built through provision expense on the income statement and reduced by net charge-offs. Under CECL (Current Expected Credit Losses, effective for most banks since 2020-2023), the allowance reflects the bank\'s estimate of lifetime expected credit losses on the existing portfolio. The denominator is total loans, typically gross loans before the ACL deduction.',
    interpretation: 'A higher reserve ratio means the bank has set aside a larger cushion against potential loan losses. Whether the current reserve level is adequate depends on the bank\'s credit quality (NPL ratio, charge-off trends), loan mix (higher-risk segments warrant higher reserves), and the economic outlook. The reserve ratio should be evaluated relative to the bank\'s actual credit quality metrics, not in isolation.',
    typicalRange: 'US banks historically maintained loan loss reserve ratios between 1.0% and 2.0% (FDIC aggregate data). Under CECL, which requires lifetime expected loss recognition, average reserve ratios have generally increased compared to the prior incurred-loss model. Banks with higher-risk loan portfolios (credit cards, subprime) maintain higher reserve ratios, while those focused on well-secured lending may operate with lower ratios.',
    goodBad: {
      good: 'A reserve ratio that is stable or modestly increasing alongside stable credit quality metrics suggests appropriate provisioning. A reserve ratio that comfortably exceeds the bank\'s recent net charge-off ratio indicates the bank has reserves well in excess of its current loss experience.',
      bad: 'A declining reserve ratio concurrent with rising NPLs or charge-offs is a warning sign that the bank may be under-reserved. A reserve ratio significantly below peers with similar loan mixes may indicate insufficient provisioning that will require catch-up provisions in future quarters.',
    },
    considerations: [
      'Under CECL, the reserve ratio reflects lifetime expected losses rather than losses estimated to be incurred at the balance sheet date. This means reserve ratios are generally higher under CECL and more responsive to changes in the economic outlook, even before actual delinquencies rise.',
      'The reserve ratio can decline for either positive or negative reasons. Positive: the bank releases reserves because credit quality has genuinely improved. Negative: the bank has not provisioned enough to replace charge-offs that are depleting the allowance. Examining the relationship between provision expense and net charge-offs clarifies which scenario is occurring.',
      'Loan growth affects the reserve ratio mechanically. Rapid loan growth increases the denominator (total loans) and, under CECL, also requires additional provisions to maintain coverage of the larger portfolio. If provisions do not keep pace with loan growth, the reserve ratio can decline even without any credit quality deterioration.',
      'A portion of the allowance for credit losses (up to 1.25% of risk-weighted assets under the standardized approach) counts as Tier 2 regulatory capital. This creates a connection between the reserve level and the bank\'s Total Capital Ratio.',
    ],
    relatedMetrics: ['reserve-coverage-ratio', 'non-performing-loans-ratio', 'net-charge-off-ratio', 'provision-to-average-loans', 'total-capital-ratio', 'texas-ratio'],
    relatedMetricDescriptions: {
      'reserve-coverage-ratio': 'Reserve Coverage divides the allowance by NPLs, directly measuring how well reserves cover known problem loans, complementing the broader reserve-to-total-loans view.',
      'non-performing-loans-ratio': 'The NPL ratio identifies the portion of the portfolio with repayment problems, informing whether the current reserve level is likely adequate.',
      'net-charge-off-ratio': 'Net charge-offs deplete the allowance; the relationship between the reserve level and the charge-off rate indicates how many quarters of current-rate charge-offs the reserve could absorb.',
      'provision-to-average-loans': 'Provision expense replenishes the allowance after charge-offs; comparing provision intensity to the reserve level shows whether the bank is building, maintaining, or drawing down reserves.',
      'total-capital-ratio': 'Qualifying portions of the allowance count as Tier 2 capital, creating a direct link between the reserve level and the bank\'s regulatory capital position.',
      'texas-ratio': 'The Texas Ratio includes loan loss reserves in its denominator, measuring whether combined tangible equity and reserves are sufficient to absorb non-performing asset exposure.',
    },
    isEducationalOnly: true,
    whereToFindData: 'The allowance for credit losses is reported on the balance sheet (as a contra-asset reducing gross loans) and in the notes to financial statements in 10-Q and 10-K filings. The provision for credit losses is on the income statement. Many banks provide a detailed rollforward of the allowance (beginning balance + provision - charge-offs + recoveries = ending balance) in their filings. Call Reports contain detailed reserve data. The FDIC Quarterly Banking Profile reports aggregate reserve ratios for the industry.',
    bankSpecificContext: 'The loan loss reserve is a critical junction point between the balance sheet and income statement in bank accounting. The reserve level reflects management\'s judgment about expected credit losses, which is inherently subjective. Too-low reserves flatter current earnings (because provision expense is understated) but create future earnings risk when catch-up provisioning is needed. Too-high reserves depress current earnings but provide a cushion that can be released in future periods. For bank investors, understanding the adequacy of the reserve level is essential for assessing whether reported earnings reflect true economic profitability.',
    metricConnections: 'The allowance is governed by the relationship: Ending ACL = Beginning ACL + Provision Expense - Net Charge-Offs. The reserve ratio interacts with the reserve coverage ratio (ACL / NPLs) to provide a complete picture of provisioning adequacy. If the reserve ratio is 1.5% and the NPL ratio is 1.5%, reserve coverage is 100%. If the NPL ratio rises to 3.0% with the same reserve level, coverage drops to 50%. The reserve ratio also connects to capital through Tier 2 inclusion and through the earnings impact of provision expense on retained earnings.',
    commonPitfalls: 'Evaluating the reserve ratio without context is misleading. A 2.0% reserve ratio at a bank with a clean loan portfolio and 0.2% net charge-offs suggests conservative over-reserving. The same 2.0% ratio at a bank with 3.0% NPLs and rising charge-offs may be dangerously inadequate. The reserve ratio is only meaningful when analyzed alongside the bank\'s credit quality metrics and loan mix. Additionally, comparing reserve ratios across banks that adopted CECL at different times (large banks adopted in 2020, smaller banks in 2023) requires attention to the accounting framework in use.',
    acrossBankTypes: 'Large banks with diverse loan portfolios including consumer lending (which has higher expected loss rates) tend to carry higher reserve ratios than community banks focused on secured commercial lending. Banks with large credit card portfolios often maintain reserve ratios of 5% or more on that segment. Community banks focused on owner-occupied CRE and C&I lending may maintain aggregate reserve ratios in the 1.0% to 1.5% range. Under CECL, all banks generally carry somewhat higher reserves than under the prior incurred-loss model.',
    whatDrivesMetric: 'The reserve ratio is driven by management\'s loss estimates (informed by historical loss experience, current conditions, and economic forecasts under CECL), the loan mix (higher-risk segments require higher reserves), portfolio seasoning (newer vintages under CECL carry higher reserves reflecting longer remaining lives), and net charge-off activity (which depletes the reserve and requires replenishment through provision expense). Regulatory examinations can also result in required reserve increases if examiners determine the bank is under-provisioned.',
    faqTeasers: [
      {
        question: 'What is a bank\'s loan loss reserve ratio?',
        teaser: 'The loan loss reserve ratio measures how much a bank has set aside to cover expected loan losses, expressed as a percentage of total loans.',
        faqSlug: 'what-is-loan-loss-reserve-ratio',
        faqCluster: 'capital-and-risk',
      },
      {
        question: 'What is CECL and how did it change bank accounting?',
        teaser: 'CECL requires banks to estimate and reserve for lifetime expected credit losses when loans are originated, replacing the prior model that recognized losses only when they were probable of being incurred.',
        faqSlug: 'what-is-cecl',
        faqCluster: 'capital-and-risk',
      },
    ],
  },

  // =========================================================================
  // 5. Reserve Coverage Ratio
  // =========================================================================
  {
    slug: 'reserve-coverage-ratio',
    name: 'Reserve Coverage Ratio',
    category: 'asset-quality',
    categoryLabel: 'Asset Quality Ratio',
    formula: 'Reserve Coverage Ratio = Allowance for Credit Losses / Non-Performing Loans',
    isPercentage: true,
    shortDescription: 'Measures the allowance for credit losses relative to non-performing loans, indicating how well reserves cover known problem loans',
    description: 'The Reserve Coverage Ratio divides the allowance for credit losses by non-performing loans. It directly measures whether the bank\'s reserves are sufficient to absorb losses from its identified problem loans. A ratio above 100% means the allowance exceeds total non-performing loans, providing a cushion for additional losses from performing loans that may deteriorate. A ratio below 100% means the bank\'s reserves do not fully cover even its known problem loans.',
    formulaExplanation: 'The numerator is the allowance for credit losses (ACL) from the balance sheet. The denominator is total non-performing loans (loans 90+ days past due plus non-accrual loans). The ratio is expressed as a percentage. A result of 150% means the bank has $1.50 in reserves for every $1.00 of non-performing loans.',
    interpretation: 'Reserve coverage above 100% indicates the bank has set aside more than enough reserves to cover its currently identified problem loans, suggesting adequate provisioning. Higher coverage ratios provide greater comfort that the bank can absorb losses from both existing problem loans and from performing loans that may deteriorate in the future. The appropriate coverage level depends on the bank\'s loan mix, collateral quality, and the expected severity of losses on non-performing loans.',
    typicalRange: 'During normal economic conditions, well-managed US banks typically maintain reserve coverage ratios between 100% and 200% (FDIC data). Under CECL, reserve coverage has generally increased because reserves now cover lifetime expected losses on the entire portfolio, not just incurred losses. During credit downturns, coverage ratios can decline significantly as NPLs rise faster than reserves are replenished through provisions.',
    goodBad: {
      good: 'Reserve coverage above 120% indicates healthy provisioning that provides a buffer beyond just covering known problem loans. Coverage above 150% suggests conservative provisioning or a well-collateralized loan portfolio where expected loss severity on NPLs is well below 100%.',
      bad: 'Reserve coverage below 80% indicates the bank\'s reserves may not fully cover losses from its existing problem loans, let alone from performing loans that may deteriorate. Coverage below 50% signals serious under-provisioning that typically leads to significant catch-up provision expense in coming quarters.',
    },
    considerations: [
      'Not all non-performing loans result in losses. Some loans return to performing status through borrower recovery or restructuring. Others are well-collateralized, meaning the bank will recover most or all of the principal through collateral liquidation. Reserve coverage below 100% is not automatically alarming if the NPL portfolio is well-secured.',
      'Under CECL, the allowance covers lifetime expected losses on the entire loan portfolio, not just problem loans. This means the reserve coverage ratio under CECL may be higher than under the prior incurred-loss model because the ACL numerator reflects a broader base of expected losses.',
      'A very high reserve coverage ratio (above 300%) may indicate over-provisioning that is depressing current earnings unnecessarily, or it may indicate very low NPLs (making the ratio sensitive to small changes in the NPL denominator). When NPLs are extremely low, the coverage ratio becomes mathematically volatile.',
      'Declining coverage can result from either rising NPLs (denominator increasing) or reserve releases (numerator decreasing). These two scenarios have very different implications for future earnings and credit risk. Context from the NPL trend and provision expense is essential.',
    ],
    relatedMetrics: ['loan-loss-reserve-ratio', 'non-performing-loans-ratio', 'net-charge-off-ratio', 'provision-to-average-loans', 'texas-ratio', 'tangible-common-equity-ratio'],
    relatedMetricDescriptions: {
      'loan-loss-reserve-ratio': 'The loan loss reserve ratio measures reserves relative to total loans, providing a broader provisioning measure that complements the NPL-specific reserve coverage ratio.',
      'non-performing-loans-ratio': 'The NPL ratio feeds the denominator of reserve coverage; rising NPLs reduce coverage unless provisions keep pace.',
      'net-charge-off-ratio': 'Charge-offs deplete the allowance and reduce the numerator of reserve coverage, while also potentially reducing NPLs (denominator) if charged-off loans were previously classified as non-performing.',
      'provision-to-average-loans': 'Provision expense replenishes the allowance; adequate provisioning is necessary to maintain reserve coverage as credit conditions evolve.',
      'texas-ratio': 'The Texas Ratio provides a related but broader measure by comparing NPAs (not just NPLs) to the combined resources of tangible equity and reserves.',
      'tangible-common-equity-ratio': 'Beyond reserves, tangible common equity represents additional loss-absorbing capacity for credit losses that exceed the allowance.',
    },
    isEducationalOnly: true,
    whereToFindData: 'The components are available in 10-Q and 10-K filings: the allowance for credit losses is on the balance sheet, and non-performing loan details are in the credit quality disclosures. Call Reports (FFIEC 031/041) provide both figures. Some banks explicitly calculate and disclose the reserve coverage ratio in their earnings releases. The FDIC\'s Uniform Bank Performance Report (UBPR) includes reserve coverage data for individual institutions.',
    bankSpecificContext: 'Reserve coverage is a critical metric for bank investors because it bridges the gap between identified credit problems (NPLs) and the resources set aside to address them (the allowance). During periods of credit stress, falling reserve coverage is often the first quantitative signal that a bank may need to increase provision expense materially, which directly reduces earnings. Conversely, rising reserve coverage during benign credit conditions may indicate the bank is building reserves conservatively, positioning itself for stability through the next credit cycle.',
    metricConnections: 'Reserve Coverage = Loan Loss Reserve Ratio / NPL Ratio. This decomposition shows that coverage depends on both how much the bank has reserved relative to its total loan book and how large its non-performing loan balance is. A bank can have 200% coverage either by maintaining a high reserve ratio (e.g., 2.0% reserves with 1.0% NPLs) or by keeping NPLs very low (e.g., 1.0% reserves with 0.5% NPLs). The implications differ: the first bank has substantial reserves, while the second is more dependent on its NPLs remaining low.',
    commonPitfalls: 'Using reserve coverage as the sole measure of provisioning adequacy ignores the risk in the performing portfolio. A bank may have 150% NPL coverage but face significant latent risk in performing loans that could become non-performing in a downturn. Reserve coverage also does not account for the expected severity of losses on NPLs; a well-collateralized NPL portfolio may need less than 100% coverage, while an unsecured NPL portfolio may need more. Additionally, the ratio is mathematically unstable when NPLs are very low, as small changes in non-performing loans produce large swings in the percentage.',
    acrossBankTypes: 'Banks with well-collateralized loan portfolios (CRE lending backed by property, residential mortgages) may comfortably operate with lower coverage ratios because expected loss severity on collateralized NPLs is lower. Banks with significant unsecured consumer lending typically maintain higher coverage ratios because expected severity on unsecured defaults is close to 100%. Large banks under CECL tend to show higher coverage ratios than they did under the prior model because the allowance now covers lifetime expected losses on the entire portfolio.',
    whatDrivesMetric: 'Reserve coverage is driven by the interaction between reserve building (through provision expense) and NPL formation. When NPLs rise faster than provisions, coverage falls. When provisions exceed the pace of NPL formation, coverage rises. Charge-offs affect both sides: they reduce the allowance (numerator) but also remove NPLs from the books (denominator), with the net effect on coverage depending on the severity of losses recognized. Changes in collateral values affect expected severity and therefore the adequacy of any given coverage level.',
    faqTeasers: [
      {
        question: 'What is the reserve coverage ratio and how should I interpret it?',
        teaser: 'The reserve coverage ratio measures how well a bank\'s loan loss reserves cover its non-performing loans, with ratios above 100% indicating reserves exceed identified problem loans.',
        faqSlug: 'what-is-reserve-coverage-ratio',
        faqCluster: 'capital-and-risk',
      },
      {
        question: 'How do I evaluate the credit quality of a bank\'s loan portfolio?',
        teaser: 'Evaluating credit quality requires examining multiple metrics together, including the NPL ratio, net charge-off ratio, reserve coverage, and provision trends, alongside the composition of the loan portfolio itself.',
        faqSlug: 'how-to-evaluate-loan-credit-quality',
        faqCluster: 'capital-and-risk',
      },
    ],
  },

  // =========================================================================
  // 6. Texas Ratio
  // =========================================================================
  {
    slug: 'texas-ratio',
    name: 'Texas Ratio',
    category: 'asset-quality',
    categoryLabel: 'Asset Quality Ratio',
    formula: 'Texas Ratio = Non-Performing Assets / (Tangible Common Equity + Loan Loss Reserves)',
    isPercentage: true,
    shortDescription: 'Measures non-performing assets relative to the combined resources of tangible common equity and loan loss reserves, serving as a stress indicator for bank financial health',
    description: 'The Texas Ratio divides non-performing assets by the sum of tangible common equity and the allowance for credit losses (loan loss reserves). Developed during the Texas banking crisis of the 1980s, the ratio assesses whether a bank has sufficient tangible resources to absorb losses from its problem assets. A Texas Ratio above 100% indicates that problem assets exceed the bank\'s combined tangible equity and reserves, historically a strong predictor of significant financial distress or failure.',
    formulaExplanation: 'The numerator is total non-performing assets: non-performing loans (90+ days past due plus non-accrual) plus OREO (other real estate owned) and other repossessed assets. The denominator combines tangible common equity (total equity minus goodwill, other intangible assets, and preferred stock) with the allowance for credit losses. This denominator represents the total tangible resources available to absorb credit losses: reserves that are specifically designated for that purpose, plus the tangible equity cushion beyond reserves.',
    interpretation: 'The Texas Ratio captures the relationship between the magnitude of a bank\'s credit problems and its capacity to absorb them. Below 50%, the bank has substantial capacity relative to its problem assets. Between 50% and 100%, problem assets are significant but still within the bank\'s absorptive capacity. Above 100%, problem assets exceed the bank\'s tangible resources, indicating severe stress. Historically, banks that sustained Texas Ratios above 100% for extended periods have faced a high probability of failure, enforcement actions, or forced recapitalization.',
    typicalRange: 'Well-managed banks during normal economic conditions typically maintain Texas Ratios between 5% and 30%. During credit downturns, ratios can spike above 50% for banks with concentrated credit problems. Texas Ratios above 100% have historically been strongly associated with bank failures or FDIC-assisted transactions (based on FDIC failure data analysis).',
    goodBad: {
      good: 'Texas Ratios below 20% indicate that problem assets are modest relative to the bank\'s tangible resources, suggesting minimal near-term financial distress risk. Ratios below 10% indicate very clean asset quality with ample capital and reserves.',
      bad: 'Texas Ratios above 50% warrant close monitoring and deeper analysis of the specific NPAs and their expected recovery values. Ratios above 100% are a critical warning that the bank\'s tangible resources may be insufficient to absorb its problem asset exposure without additional capital, asset sales, or other remedial actions.',
    },
    considerations: [
      'The Texas Ratio is a point-in-time snapshot that does not account for the bank\'s ongoing earnings capacity (PPNR) to absorb losses. A bank with a 75% Texas Ratio and strong PPNR may be better positioned than one with a 60% Texas Ratio and weak earnings.',
      'Not all NPAs result in total loss. Collateralized non-performing loans may recover a significant portion of principal through liquidation. OREO may be sold at or near carrying value. The Texas Ratio implicitly assumes that all NPAs could become total losses, which overstates the actual risk for well-collateralized portfolios.',
      'The denominator uses tangible common equity, which excludes goodwill. For banks with significant goodwill from acquisitions, the Texas Ratio will be higher (worse) than a version using total equity, reflecting the more conservative view that goodwill cannot absorb credit losses.',
      'The Texas Ratio was developed empirically during the 1980s Texas banking crisis and validated through subsequent failure analyses. While not infallible, it has maintained strong predictive value across multiple credit cycles as documented in FDIC research.',
    ],
    relatedMetrics: ['non-performing-assets-ratio', 'non-performing-loans-ratio', 'tangible-common-equity-ratio', 'loan-loss-reserve-ratio', 'net-charge-off-ratio', 'pre-provision-net-revenue'],
    relatedMetricDescriptions: {
      'non-performing-assets-ratio': 'The NPA ratio measures the same problem assets in the Texas Ratio numerator but expresses them relative to total assets rather than to the bank\'s loss-absorbing capacity.',
      'non-performing-loans-ratio': 'The NPL ratio captures the loan component of the Texas Ratio numerator, excluding OREO and other repossessed assets.',
      'tangible-common-equity-ratio': 'TCE forms the primary component of the Texas Ratio denominator, representing the equity-based loss absorption capacity.',
      'loan-loss-reserve-ratio': 'Loan loss reserves are the other component of the Texas Ratio denominator, representing the reserve-based loss absorption capacity.',
      'net-charge-off-ratio': 'Net charge-offs reduce both the Texas Ratio numerator (removing NPAs) and denominator (depleting reserves and earnings that build equity), with the net effect depending on loss severity.',
      'pre-provision-net-revenue': 'PPNR represents the earnings capacity available to absorb losses beyond what the Texas Ratio\'s static denominator captures.',
    },
    isEducationalOnly: true,
    whereToFindData: 'The Texas Ratio must be calculated from components available in a bank\'s 10-Q and 10-K filings: non-performing assets (credit quality disclosures), tangible common equity (balance sheet with adjustments for goodwill and intangibles), and the allowance for credit losses (balance sheet). Some analyst reports and bank screening tools calculate the Texas Ratio directly. The FDIC\'s UBPR provides the underlying data components for individual banks.',
    bankSpecificContext: 'The Texas Ratio occupies a unique position in bank analysis as perhaps the most widely recognized distress indicator for commercial banks. Its origin during the Texas savings-and-loan crisis of the 1980s, where thousands of banks failed, gives it historical credibility. The ratio\'s strength is its simplicity: it compares the problem (NPAs) to the resources available to absorb the problem (tangible equity + reserves). This straightforward framework has proven remarkably effective across multiple credit cycles as a flag for banks approaching financial distress.',
    metricConnections: 'Texas Ratio = NPA Ratio x (Total Assets / (TCE + ACL)). This decomposition shows the ratio is driven by both the magnitude of problem assets and the adequacy of tangible capital and reserves. The Texas Ratio can increase either because NPAs are rising or because TCE and reserves are declining (through losses, dividends, or buybacks). It connects to profitability metrics through the dynamic that charge-offs and provision expense reduce both earnings and reserves, potentially worsening the Texas Ratio from both sides (NPAs remaining elevated while the denominator shrinks).',
    commonPitfalls: 'Treating the 100% threshold as a binary pass/fail is an oversimplification. A bank at 95% with improving NPA trends and strong PPNR may be on a recovery path, while a bank at 70% with rapidly deteriorating credit quality and weak earnings may be heading toward distress. The direction and velocity of the Texas Ratio matter as much as the level. Additionally, the ratio does not distinguish between collateralized and uncollateralized NPAs; a 100% Texas Ratio backed entirely by collateralized CRE loans likely has better expected recovery than one backed by unsecured consumer loans.',
    acrossBankTypes: 'Community banks with geographic and loan-type concentrations tend to show more volatile Texas Ratios because a small number of large loan defaults can materially change the numerator. Diversified regional and money center banks typically have more stable Texas Ratios due to portfolio diversification. During localized economic stress (such as the oil price collapse affecting Texas in the 1980s or agricultural stress in rural banking markets), community banks in affected regions may show sharply elevated Texas Ratios while the broader banking industry remains healthy.',
    whatDrivesMetric: 'The Texas Ratio is driven by NPA formation (new loans becoming non-performing, loans moving to OREO), NPA resolution (charge-offs, loan sales, OREO dispositions, workout success), tangible equity changes (retained earnings growth or depletion, buybacks, goodwill impairment), and reserve changes (provision expense building reserves, charge-offs depleting them). During credit downturns, the Texas Ratio can deteriorate rapidly as NPAs rise while charge-offs and provision expense simultaneously reduce the denominator.',
    faqTeasers: [
      {
        question: 'What is the Texas Ratio and how do I calculate it?',
        teaser: 'The Texas Ratio divides non-performing assets by the sum of tangible common equity and loan loss reserves, serving as a stress indicator that measures whether a bank\'s tangible resources can absorb its problem asset exposure.',
        faqSlug: 'what-is-texas-ratio',
        faqCluster: 'capital-and-risk',
      },
      {
        question: 'How do I evaluate the credit quality of a bank\'s loan portfolio?',
        teaser: 'Evaluating credit quality requires examining multiple metrics together, including the NPL ratio, net charge-off ratio, reserve coverage, and provision trends, alongside the composition of the loan portfolio itself.',
        faqSlug: 'how-to-evaluate-loan-credit-quality',
        faqCluster: 'capital-and-risk',
      },
      {
        question: 'How do I calculate the Texas Ratio?',
        teaser: 'The Texas Ratio divides NPAs (non-performing loans + OREO) by the sum of tangible common equity and the allowance for credit losses. A result above 100% is a critical stress signal.',
        faqSlug: 'how-to-calculate-texas-ratio',
        faqCluster: 'capital-and-risk',
      },
    ],
  },

  // =========================================================================
  // 7. Provision for Credit Losses to Average Loans
  // =========================================================================
  {
    slug: 'provision-to-average-loans',
    name: 'Provision for Credit Losses to Average Loans',
    category: 'asset-quality',
    categoryLabel: 'Asset Quality Ratio',
    formula: 'Provision to Average Loans = Provision for Credit Losses / Average Loans',
    isPercentage: true,
    shortDescription: 'Measures the annual provision expense as a percentage of average loans, indicating the current-period cost of credit risk and the intensity of reserve building',
    description: 'The Provision for Credit Losses to Average Loans ratio divides the annual (or annualized) provision for credit losses by average total loans. Provision expense is the income statement charge that builds the allowance for credit losses on the balance sheet. The ratio measures how much of the bank\'s earnings are being consumed by credit risk costs in the current period, reflecting both actual loss experience and management\'s forward-looking assessment of credit conditions.',
    formulaExplanation: 'The numerator is the provision for credit losses reported on the income statement. When using quarterly data, the provision should be annualized (multiplied by 4 for a single quarter, or summed over four quarters for trailing twelve months) to produce a comparable annual rate. The denominator is average total loans, typically the average of beginning and ending loan balances for the period. Using average loans smooths out the effect of loan portfolio growth or contraction during the measurement period.',
    interpretation: 'A higher provision-to-loans ratio indicates that credit risk is consuming a larger share of the bank\'s revenue, either because losses are increasing, the economic outlook is deteriorating, or the bank is building reserves proactively. A lower ratio suggests benign credit conditions with minimal current-period loss recognition. The provision ratio directly affects the bank\'s bottom line: every dollar of provision expense is a dollar subtracted from pre-tax earnings.',
    typicalRange: 'During normal economic conditions, US banks typically provision at rates between 0.2% and 0.6% of average loans annually (FDIC aggregate data). During credit downturns, provision rates can spike above 2.0% or even 3.0% for banks with severe credit quality deterioration. Under CECL, provision expense can be more volatile because it responds to changes in the economic forecast, not just to emerging losses.',
    goodBad: {
      good: 'Provision rates between 0.2% and 0.5% during stable economic conditions indicate manageable credit costs. Provision expense that closely tracks net charge-offs suggests the bank is maintaining reserve levels rather than depleting or excessively building them.',
      bad: 'Provision rates above 1.0% indicate elevated credit costs that significantly reduce earnings. Provision expense substantially exceeding net charge-offs may indicate the bank is building reserves for anticipated deterioration, which, while prudent, signals management\'s concern about future credit quality.',
    },
    considerations: [
      'Under CECL, provision expense includes not only the cost of covering current-period charge-offs but also adjustments to the lifetime expected loss estimate for the entire portfolio. Changes in the macroeconomic outlook can drive significant provision expense even without any change in actual loan performance, making the provision ratio more volatile than under the prior incurred-loss model.',
      'Day-one CECL provisions on new loan originations mean that rapid loan growth generates provision expense even in a benign credit environment. A high provision rate at a rapidly growing bank may reflect portfolio expansion rather than credit quality deterioration.',
      'Provision expense of zero or negative values (reserve releases) is possible when credit conditions improve significantly and the bank determines its allowance exceeds required levels. Reserve releases boost earnings in the current period but may not be sustainable.',
      'Comparing provision rates across banks requires attention to loan mix. Banks with large credit card or unsecured consumer lending portfolios will naturally provision at higher rates than banks focused on secured commercial lending, reflecting the different expected loss profiles of those asset classes.',
    ],
    relatedMetrics: ['net-charge-off-ratio', 'loan-loss-reserve-ratio', 'reserve-coverage-ratio', 'roaa', 'pre-provision-net-revenue', 'roe'],
    relatedMetricDescriptions: {
      'net-charge-off-ratio': 'Comparing provision expense to net charge-offs reveals whether the bank is building reserves (provision > charge-offs), maintaining them (roughly equal), or depleting them (charge-offs > provision).',
      'loan-loss-reserve-ratio': 'Provision expense is the mechanism that builds the loan loss reserve; the relationship between the provision rate and the reserve level indicates the pace of reserve accumulation or depletion.',
      'reserve-coverage-ratio': 'Provision expense ultimately affects reserve coverage by maintaining or changing the allowance level relative to non-performing loans.',
      'roaa': 'Provision expense directly reduces net income and therefore ROAA. The provision rate is often the largest single variable driving earnings volatility at banks.',
      'pre-provision-net-revenue': 'PPNR measures earnings capacity before provision expense, providing context for how much provision expense the bank can absorb without reporting a loss.',
      'roe': 'Through its impact on net income, provision expense reduces ROE and the rate of capital formation through retained earnings.',
    },
    isEducationalOnly: true,
    whereToFindData: 'Provision for credit losses is a line item on the income statement in 10-Q and 10-K filings. Average loans can be calculated from the balance sheet or are sometimes disclosed separately. Call Reports (FFIEC 031/041) include provision data. The FDIC Quarterly Banking Profile reports aggregate provision rates for the banking industry. Some banks provide quarterly provision data in their earnings release supplements.',
    bankSpecificContext: 'Provision expense is the primary mechanism through which credit risk translates into earnings impact for banks. It represents management\'s current assessment of the cost of credit risk and is the key link between the balance sheet (allowance for credit losses) and the income statement (earnings). For bank analysts, understanding whether current provision levels are adequate, excessive, or insufficient relative to actual and expected credit trends is essential for forecasting future earnings. Provision expense is also one of the most subjective items in bank accounting, as it requires management judgment about future credit conditions.',
    metricConnections: 'The provision relationship is: Ending ACL = Beginning ACL + Provision - Net Charge-Offs. When Provision > Net Charge-Offs, the reserve ratio increases (building reserves). When Provision < Net Charge-Offs, the reserve ratio decreases (depleting reserves). PPNR minus provision expense equals pre-tax income; this relationship means that a bank with PPNR of 2.0% of assets and provision expense of 0.5% of loans has significant capacity to absorb higher credit costs before earnings turn negative.',
    commonPitfalls: 'Interpreting low provision expense as a sign of excellent credit quality may be premature. Management can under-provision in the short term to support earnings, only to face catch-up provisions later when losses materialize or examiners require reserve increases. Comparing the provision rate to net charge-offs over time (rather than in a single quarter) helps identify whether the bank is provisioning adequately. Additionally, under CECL, a single quarter\'s provision expense can be heavily influenced by changes in macroeconomic forecast assumptions, making it less reliable as a signal of actual credit deterioration than under the prior model.',
    acrossBankTypes: 'Large banks with consumer lending portfolios typically show higher baseline provision rates due to the higher expected loss rates in consumer lending. Community banks focused on commercial lending may show lower baseline rates but more volatility when individual large loans require specific reserves. Under CECL, all banks show greater provision volatility because forecast changes flow through the income statement immediately. Money center banks with sophisticated economic forecasting models may show provision changes driven by macroeconomic outlook shifts even before actual credit metrics deteriorate.',
    whatDrivesMetric: 'Provision expense is driven by net charge-off activity (which depletes reserves and requires replenishment), changes in the economic outlook under CECL (which can trigger reserve builds or releases), loan portfolio growth (requiring day-one provisions on new originations under CECL), changes in loan mix toward higher or lower risk segments, and specific loss events on individual large exposures. Regulatory examination results can also drive provision adjustments if examiners require higher reserves.',
    faqTeasers: [
      {
        question: 'What is the provision for credit losses on a bank\'s income statement?',
        teaser: 'The provision for credit losses is the income statement expense that builds the bank\'s allowance (reserve) for expected loan losses, representing the current-period cost of credit risk.',
        faqSlug: 'what-is-provision-for-credit-losses',
        faqCluster: 'financial-statements',
      },
      {
        question: 'How do I evaluate the credit quality of a bank\'s loan portfolio?',
        teaser: 'Evaluating credit quality requires examining multiple metrics together, including the NPL ratio, net charge-off ratio, reserve coverage, and provision trends, alongside the composition of the loan portfolio itself.',
        faqSlug: 'how-to-evaluate-loan-credit-quality',
        faqCluster: 'capital-and-risk',
      },
    ],
  },
];

// ============================================================================
// CROSS-LINK MAP ENTRIES FOR prerender.mjs
// ============================================================================
const ASSET_QUALITY_METRIC_TO_VALUATIONS_ENTRIES = {
  'non-performing-loans-ratio': ['peer-comparison', 'price-to-book-valuation', 'price-to-tangible-book-valuation'],
  'non-performing-assets-ratio': ['peer-comparison', 'price-to-book-valuation', 'price-to-tangible-book-valuation'],
  'net-charge-off-ratio': ['peer-comparison', 'discounted-earnings-model'],
  'loan-loss-reserve-ratio': ['peer-comparison'],
  'reserve-coverage-ratio': ['peer-comparison'],
  'texas-ratio': ['peer-comparison', 'price-to-book-valuation'],
  'provision-to-average-loans': ['peer-comparison', 'discounted-earnings-model'],
};

// Also update existing VALUATION_TO_METRICS entries in prerender.mjs:
// Add to 'peer-comparison': all 7 asset quality metric slugs
// Add to 'price-to-book-valuation': 'non-performing-loans-ratio',
//   'non-performing-assets-ratio', 'texas-ratio'
// Add to 'price-to-tangible-book-valuation' (new): 'non-performing-loans-ratio',
//   'non-performing-assets-ratio'
// Add to 'discounted-earnings-model' (new): 'net-charge-off-ratio',
//   'provision-to-average-loans'

export { ASSET_QUALITY_METRICS, ASSET_QUALITY_METRIC_TO_VALUATIONS_ENTRIES };

/**
 * BankSift Content Expansion — Batch 1, Prompt 1
 * Expansion fields for all 13 existing metric entries.
 *
 * USAGE:
 *   For each metric slug below, merge these fields into the corresponding
 *   entry in src/data/content/metrics.js. All existing fields remain unchanged.
 *
 * CONVENTIONS:
 *   - Plain text only (no HTML or Markdown)
 *   - Second/third person voice
 *   - No trailing period on shortAnswer / teaser fields
 *   - faqTeasers reference FAQ slugs that will be created in later batches
 */

export const METRIC_EXPANSION_FIELDS = {

  // ───────────────────────────────────────────────
  // 1. ROE
  // ───────────────────────────────────────────────
  'roe': {
    bankSpecificContext:
      'Banks are among the most leveraged businesses in the economy, typically operating with equity-to-asset ratios of 8-12%. Because of this inherent leverage, ROE for banks reflects both management quality and the degree of leverage employed. Regulatory capital requirements set a floor on equity levels, which in turn caps the maximum ROE a bank can achieve at a given level of asset profitability. A bank earning 1% on assets (ROAA) with a 10:1 asset-to-equity ratio produces a 10% ROE. The same ROAA at a 12:1 ratio produces 12% ROE, but regulators may view the thinner capital cushion with concern. This dynamic makes ROE a useful but incomplete measure of bank performance when viewed in isolation.',

    metricConnections:
      'ROE sits at the center of several important bank analysis relationships. Through the DuPont decomposition, ROE equals ROAA multiplied by the equity multiplier (assets divided by equity), which separates operating performance from leverage. ROE also determines the justified price-to-book ratio through the ROE-P/B framework: justified P/B = (ROE - g) / (r - g), where g is the sustainable growth rate and r is the cost of equity. The algebraic identity P/B = P/E multiplied by ROE connects the two primary bank valuation ratios directly. A bank\'s sustainable growth rate equals ROE multiplied by the retention ratio (1 minus the dividend payout ratio), linking profitability to capital generation capacity.',

    commonPitfalls:
      'A very high ROE can indicate dangerously thin capital rather than superior management. Comparing ROE across banks without adjusting for differences in leverage is misleading; two banks with identical ROAA can show very different ROEs purely because of capital structure differences. One-time gains from securities sales, tax benefits, or legal settlements can temporarily inflate ROE, making a single quarter\'s figure unreliable. ROE is also less meaningful during periods of elevated credit losses, when provisions compress net income and distort the ratio. Banks that have recently completed large acquisitions may show depressed ROE due to goodwill diluting the equity base.',

    acrossBankTypes:
      'Money center banks with diversified revenue streams and active capital management programs typically target ROE in the 12-15% range. Well-run community banks focused on relationship lending often achieve 10-13% ROE, though this varies with local economic conditions and loan mix. Banks maintaining excess capital above regulatory minimums, whether by choice or regulatory directive, may show ROE below 8% despite strong underlying operations. De novo (newly chartered) banks almost always show negative or very low ROE in their first 3-5 years as they build their loan portfolios and absorb startup costs.',

    whatDrivesMetric:
      'The numerator, net income, is driven by net interest margin, fee income generation, operating efficiency (as measured by the efficiency ratio), and provision for credit losses. The denominator, average shareholders\' equity, is driven by retained earnings accumulation, capital raises or stock issuances, share buybacks, and regulatory capital requirements. Macroeconomic factors including interest rates, credit cycle conditions, and loan demand all influence the numerator indirectly. Management decisions around capital allocation, dividend policy, and growth strategy directly affect both sides of the ratio.',

    faqTeasers: [
      {
        question: 'What is a good ROE for a bank stock?',
        teaser: 'Well-managed US banks have historically achieved ROE between 8% and 15%, though the appropriate target depends on the bank\'s size, business model, and capital levels',
        faqSlug: 'what-is-a-good-roe-for-banks',
        faqCluster: 'profitability'
      },
      {
        question: 'Can ROE be too high for a bank? What does that signal?',
        teaser: 'An unusually high ROE can indicate thin capitalization rather than operational excellence, making it important to check equity-to-assets alongside ROE',
        faqSlug: 'can-roe-be-too-high',
        faqCluster: 'profitability'
      },
      {
        question: 'How do I calculate ROE for a bank?',
        teaser: 'ROE equals net income divided by average shareholders\' equity, but bank-specific nuances around averaging methods and preferred stock adjustments matter',
        faqSlug: 'how-to-calculate-roe',
        faqCluster: 'profitability'
      }
    ]
  },

  // ───────────────────────────────────────────────
  // 2. ROAA
  // ───────────────────────────────────────────────
  'roaa': {
    bankSpecificContext:
      'ROAA removes leverage from the profitability equation, showing how productively a bank uses its entire asset base regardless of how those assets are funded. For bank analysis, this is critical because capital structure differences between banks can make ROE comparisons misleading. A bank with 8% equity-to-assets and a bank with 12% equity-to-assets may have identical ROAA but very different ROEs. ROAA reveals which bank is actually generating more profit per dollar of assets deployed, making it the cleaner measure of operating performance.',

    metricConnections:
      'ROAA and ROE are linked through the equity multiplier: ROE equals ROAA multiplied by average assets divided by average equity. If a bank shows strong ROAA but weak ROE, it may be overcapitalized, carrying more equity than necessary relative to its asset base. Conversely, strong ROE paired with weak ROAA suggests the bank is relying on high leverage rather than strong asset productivity to generate returns. ROAA combined with net interest margin reveals how effectively the bank converts its interest spread into bottom-line profit after accounting for operating expenses, fee income, and credit losses.',

    commonPitfalls:
      'Total asset size can be inflated by large securities portfolios that earn relatively low returns, dragging ROAA down even for operationally efficient banks. ROAA does not distinguish between loan-driven and securities-driven asset bases, so a bank that holds a high proportion of low-yield government securities will show lower ROAA than a similarly efficient bank with a higher loan-to-asset ratio. Using period-end assets rather than average assets can distort the ratio if the bank experienced significant balance sheet growth or contraction during the period. Annualizing quarterly ROAA requires care; simply multiplying by four assumes uniform earnings distribution across quarters, which may not hold for banks with seasonal lending patterns.',

    acrossBankTypes:
      'US commercial banks have historically averaged ROAA between 0.90% and 1.30% based on FDIC aggregate data. Community banks with strong local lending franchises and low-cost deposit bases can achieve ROAA above 1.20%. Large money center banks, whose asset bases include substantial low-yield trading assets and securities, often show ROAA in the 0.80-1.10% range. Banks focused primarily on mortgage lending may show lower ROAA due to the lower yields on residential mortgage portfolios relative to commercial and consumer lending.',

    whatDrivesMetric:
      'Net interest margin on the earning asset base is the primary driver, representing the spread between interest earned and interest paid. Non-interest income from fees, service charges, and wealth management adds to the numerator. Operating efficiency, as measured by the efficiency ratio, determines how much of total revenue flows through to net income. Provision for credit losses is the most volatile component, capable of swinging ROAA significantly from quarter to quarter. The asset mix itself matters: banks with higher proportions of loans relative to securities tend to earn higher ROAA, all else equal, because loans generally yield more than investment securities.',

    faqTeasers: [
      {
        question: 'What is a good ROAA for a bank?',
        teaser: 'US commercial banks have historically averaged ROAA between 0.90% and 1.30% based on FDIC data, with well-run community banks often exceeding 1.20%',
        faqSlug: 'what-is-a-good-roaa-for-banks',
        faqCluster: 'profitability'
      },
      {
        question: 'What is the difference between ROE and ROAA for banks?',
        teaser: 'ROE measures return on the equity base and reflects leverage, while ROAA measures return on total assets and isolates operating performance from capital structure',
        faqSlug: 'roe-vs-roaa',
        faqCluster: 'profitability'
      }
    ]
  },

  // ───────────────────────────────────────────────
  // 3. NIM (Net Interest Margin)
  // ───────────────────────────────────────────────
  'net-interest-margin': {
    bankSpecificContext:
      'Net interest margin is the single most important profitability driver for traditional commercial banks. It measures the spread between what a bank earns on its loans and investment securities and what it pays on deposits and borrowings, expressed as a percentage of average earning assets. For most community and regional banks, net interest income constitutes 70-85% of total revenue, making NIM the dominant factor in overall profitability. NIM is unique to financial intermediaries; non-financial companies have no equivalent metric because they do not earn revenue by borrowing at one rate and lending at another.',

    metricConnections:
      'NIM is the largest component of ROAA for most banks. Net interest income (NIM multiplied by average earning assets) flows directly into total revenue, which the efficiency ratio then measures against operating expenses. A bank with a wide NIM but a poor efficiency ratio may not translate its interest spread advantage into bottom-line profitability. NIM combined with the loan-to-asset ratio indicates how effectively the bank is deploying assets into higher-yielding loans versus lower-yielding securities. Cost of funds and cost of deposits are the liability-side components that directly determine the lower bound of NIM.',

    commonPitfalls:
      'A higher NIM does not always indicate a better-managed bank. Higher NIM can result from riskier lending practices, such as concentrating in subprime consumer loans, high-yield commercial real estate, or other higher-risk asset classes that command wider spreads precisely because of elevated credit risk. Comparing NIM across banks with very different asset mixes (e.g., a commercial lender vs. a mortgage-focused bank) is misleading because different loan types carry inherently different yield profiles. NIM is compressed during flat or inverted yield curve environments even at well-run banks, because short-term funding costs rise relative to longer-term asset yields. Tax-equivalent NIM adjustments can make comparisons across banks with different proportions of tax-exempt municipal securities more accurate.',

    acrossBankTypes:
      'Community banks focused on relationship commercial lending often achieve NIMs in the 3.50-4.50% range, benefiting from pricing power in local markets and low-cost core deposit funding. Regional banks typically show NIMs of 3.00-3.75%. Large money center banks, whose asset mixes include more low-yield wholesale lending, trading assets, and investment securities, often report NIMs in the 2.00-3.00% range. Banks with large non-interest-bearing deposit bases enjoy a structural NIM advantage because a significant portion of their funding carries zero interest cost.',

    whatDrivesMetric:
      'On the asset side: the overall interest rate environment, yield curve shape (steep curves favor wider NIM), loan portfolio mix (commercial real estate, commercial and industrial, residential mortgage, consumer), and the pace at which loans reprice as rates change. On the liability side: deposit mix (non-interest-bearing checking accounts provide free funding while certificates of deposit and brokerage deposits are rate-sensitive), competition for deposits in local markets, and reliance on wholesale borrowings. Management decisions around asset-liability duration matching, loan pricing discipline, and deposit gathering strategy all influence NIM directly.',

    faqTeasers: [
      {
        question: 'What is a good net interest margin for a bank?',
        teaser: 'US banks have historically averaged NIM between 3.0% and 3.5% based on FDIC data, though the appropriate level varies significantly by bank size and business model',
        faqSlug: 'what-is-a-good-nim-for-banks',
        faqCluster: 'profitability'
      },
      {
        question: 'What causes net interest margin to increase or decrease?',
        teaser: 'NIM is driven by the interplay of the interest rate environment, yield curve shape, loan mix, deposit mix, and competitive dynamics in the bank\'s markets',
        faqSlug: 'what-causes-nim-to-change',
        faqCluster: 'profitability'
      },
      {
        question: 'How do I calculate net interest margin?',
        teaser: 'NIM equals net interest income divided by average earning assets, though tax-equivalent adjustments and the definition of earning assets introduce important nuances',
        faqSlug: 'how-to-calculate-nim',
        faqCluster: 'profitability'
      }
    ]
  },

  // ───────────────────────────────────────────────
  // 4. Efficiency Ratio
  // ───────────────────────────────────────────────
  'efficiency-ratio': {
    bankSpecificContext:
      'For banks, the efficiency ratio has a specific definition: non-interest expense divided by the sum of net interest income and non-interest income (total revenue). Lower values are better, indicating the bank spends less to generate each dollar of revenue. The efficiency ratio is the banking industry\'s standard measure of cost management and operational productivity. Unlike operating margins used for non-financial companies, the efficiency ratio accounts for the fact that a bank\'s revenue comes from two distinct streams (interest income from lending and fee income from services), both of which require different cost structures to generate.',

    metricConnections:
      'The efficiency ratio directly impacts net income and therefore both ROE and ROAA. A bank that improves its efficiency ratio by 5 percentage points without changing revenue effectively adds that entire amount to pre-tax income. In bank M&A analysis, projected efficiency ratio improvements from combining operations are often called the "efficiency dividend" and represent a primary source of merger value. The relationship between efficiency ratio and NIM determines how much of the bank\'s interest spread flows through to earnings: a bank with a 3.50% NIM and a 55% efficiency ratio retains far more income than one with the same NIM and a 70% efficiency ratio.',

    commonPitfalls:
      'Different business lines within banking carry inherently different efficiency ratios, making comparisons across banks with different business mixes misleading. Wealth management and trust divisions typically operate with 65-75% efficiency ratios but generate high returns on equity because they require minimal balance sheet capital. Comparing a wealth-management-heavy bank to a pure commercial lender on efficiency ratio alone will make the diversified bank look less efficient when it may actually be more profitable. Revenue declines cause the efficiency ratio to deteriorate even if costs remain flat, which can make a cost-disciplined bank look inefficient during periods of margin compression. One-time restructuring charges or technology investments can temporarily inflate the ratio.',

    acrossBankTypes:
      'Large money center banks with economies of scale and technology investments often achieve efficiency ratios of 55-60%. Well-run community banks typically target 55-65%. Banks with efficiency ratios consistently below 50% are considered exceptional operators. Banks running above 70% may have structural cost problems related to excess branch networks, inadequate technology, insufficient scale, or revenue challenges. Mutual savings banks sometimes show higher efficiency ratios because their mutual ownership structure limits certain capital management strategies available to stock-form banks.',

    whatDrivesMetric:
      'Salary and employee benefits represent the largest component of non-interest expense, typically 50-60% of total operating costs. Branch network size and occupancy costs are the second major factor. Technology and data processing expenses have been growing as a share of total costs. Regulatory compliance costs, including examination fees, BSA/AML compliance staffing, and reporting infrastructure, add a relatively fixed cost burden that weighs more heavily on smaller banks. On the revenue side, NIM compression or fee income declines cause the efficiency ratio to rise even without any increase in expenses. Revenue growth that outpaces expense growth is the most sustainable path to efficiency improvement.',

    faqTeasers: [
      {
        question: 'What is a good efficiency ratio for a bank?',
        teaser: 'Banks with efficiency ratios below 60% are generally considered well-managed, while those consistently below 50% are exceptional operators',
        faqSlug: 'what-is-a-good-efficiency-ratio',
        faqCluster: 'efficiency'
      },
      {
        question: 'Why do smaller banks often have higher efficiency ratios than large banks?',
        teaser: 'Smaller banks lack the economies of scale in technology, compliance, and processing that allow larger banks to spread fixed costs over a larger revenue base',
        faqSlug: 'why-small-banks-higher-efficiency-ratio',
        faqCluster: 'efficiency'
      }
    ]
  },

  // ───────────────────────────────────────────────
  // 5. P/B (Price to Book)
  // ───────────────────────────────────────────────
  'price-to-book': {
    bankSpecificContext:
      'Price-to-book is the primary valuation metric for banks because bank balance sheets consist predominantly of financial instruments (loans, securities, deposits, borrowings) that are carried near fair value under accounting standards. This makes book value a more meaningful approximation of net asset value for banks than for industrial or technology companies, where intangible assets, brand value, and intellectual property may far exceed recorded book value. The widespread use of P/B for banks dates back decades and is reinforced by bank regulators\' focus on book equity as the basis for capital adequacy measurement.',

    metricConnections:
      'The justified P/B multiple can be derived from the ROE-P/B framework: justified P/B = (ROE - g) / (r - g), where g is the sustainable growth rate and r is the cost of equity. This framework makes explicit that a bank\'s P/B should be higher when its ROE exceeds its cost of equity and lower when it does not. The identity P/B = P/E multiplied by ROE connects the two primary bank valuation ratios: knowing any two of the three (P/B, P/E, ROE) determines the third. A bank trading at a P/B of 1.0 with ROE of 12% implies a P/E of approximately 8.3x. This relationship is useful for spotting valuation inconsistencies.',

    commonPitfalls:
      'Book value may not reflect true economic value for several reasons. Held-to-maturity securities are carried at amortized cost rather than market value, which can create significant unrealized losses not visible in book value (as highlighted by bank failures where HTM portfolios had large unrealized losses). Goodwill from prior acquisitions inflates book value above the tangible net asset value, which is why price-to-tangible-book is sometimes preferred. Understated loan loss reserves mean book value may overstate the true net asset position. A P/B below 1.0 does not automatically indicate undervaluation; the market may be pricing in expected credit losses, earnings weakness, or management quality concerns that justify a discount to book.',

    acrossBankTypes:
      'High-performing banks with strong ROE, consistent earnings growth, and clean asset quality may trade at 1.5-2.5x book value. Banks with average profitability and moderate growth prospects typically trade at 1.0-1.3x book. Banks with asset quality concerns, weak earnings, pending regulatory issues, or strategic uncertainty often trade below book value. During periods of systemic banking stress, median industry P/B multiples have fallen below 1.0x. Community banks that are considered acquisition candidates sometimes trade at premiums to book value reflecting potential takeover pricing.',

    whatDrivesMetric:
      'ROE is the single most important driver of P/B: banks that earn returns above their cost of equity deserve P/B multiples above 1.0, and higher ROE supports higher multiples. Earnings growth expectations influence the sustainable growth component of the justified P/B formula. Asset quality perception affects whether investors trust that book value is a reliable representation of net asset value. Interest rate outlook matters because rising rates can improve NIM and ROE (supporting higher P/B) but can also create unrealized losses in bond portfolios. Market-wide valuation levels and investor sentiment toward the banking sector affect absolute P/B levels for all banks.',

    faqTeasers: [
      {
        question: 'What is a good price-to-book ratio for a bank stock?',
        teaser: 'A "good" P/B depends on the bank\'s ROE; the justified P/B framework links profitability directly to the appropriate multiple',
        faqSlug: 'what-is-a-good-pb-for-banks',
        faqCluster: 'valuation'
      },
      {
        question: 'Does a P/B ratio below 1.0 always mean a bank is undervalued?',
        teaser: 'Not necessarily; a discount to book value may reflect the market pricing in asset quality problems, earnings weakness, or management concerns',
        faqSlug: 'pb-below-one-undervalued',
        faqCluster: 'valuation'
      },
      {
        question: 'How do I calculate price-to-book for a bank?',
        teaser: 'P/B equals the current share price divided by book value per share, but understanding the composition of book value and its limitations for banks is essential',
        faqSlug: 'how-to-calculate-price-to-book',
        faqCluster: 'valuation'
      }
    ]
  },

  // ───────────────────────────────────────────────
  // 6. P/E (Price to Earnings)
  // ───────────────────────────────────────────────
  'price-to-earnings': {
    bankSpecificContext:
      'P/E is a useful valuation metric for banks during periods of normalized earnings but becomes less reliable when credit losses spike or unusual gains distort net income. Bank earnings are inherently more volatile than most industries because provision for credit losses, a non-cash charge that reflects management\'s estimate of future loan losses, can swing dramatically from quarter to quarter. During a credit downturn, provisions may consume 30-50% or more of pre-provision revenue, compressing earnings and inflating P/E. During benign credit environments, low provisions can flatter earnings and compress P/E. For these reasons, P/E is best used alongside P/B as a complementary valuation measure rather than as a standalone metric.',

    metricConnections:
      'The identity P/E multiplied by ROE equals P/B connects bank P/E directly to both profitability and asset valuation. When P/E and P/B diverge from what ROE would imply, it can signal a potential opportunity or a red flag. A bank trading at a low P/E but a high P/B relative to its ROE may have temporarily elevated earnings that the market expects to normalize. Conversely, a high P/E with a low P/B may indicate depressed earnings that the market expects to recover. P/E combined with the dividend payout ratio yields the price-to-dividend ratio, which is useful for income-oriented bank stock analysis.',

    commonPitfalls:
      'Provision for credit losses makes bank earnings more volatile than most industries, which means P/E snapshots can be misleading. A bank may appear to have a high P/E simply because a credit cycle spike in provisions temporarily depressed earnings; this may actually represent a buying opportunity rather than overvaluation. P/E is nearly useless for banks with negative or near-zero earnings, which can occur during severe credit downturns. Using trailing P/E based on the most recent quarter annualized is dangerous if that quarter contained unusual items. Comparing P/E across banks without considering differences in credit quality, reserve adequacy, and provision trends can lead to poor conclusions. Forward P/E estimates are only as good as the analyst\'s ability to predict future credit losses.',

    acrossBankTypes:
      'Bank P/E ratios have historically ranged between 8x and 15x during normal earnings periods, based on aggregate market data. High-growth banks or banks with perceived above-average earnings quality may trade at 13-16x. Banks in cyclical earnings troughs or with asset quality concerns may trade at 6-10x or lower. During periods of systemic banking stress, trailing P/E ratios become unreliable because earnings are temporarily depressed across the industry. Community banks with limited analyst coverage may trade at modestly lower P/E multiples than larger peers, reflecting a liquidity discount.',

    whatDrivesMetric:
      'Earnings growth expectations are the primary driver of P/E levels. The interest rate outlook influences P/E because rates affect NIM and therefore earnings power. Perceived credit quality matters because the market discounts P/E for banks it believes will face elevated future credit losses. Overall stock market multiple levels create a macro backdrop: bank P/E ratios tend to expand and contract with broad equity market valuations. Investor sentiment toward the banking sector, influenced by regulatory developments, macroeconomic conditions, and recent industry events, creates sector-wide P/E fluctuations independent of individual bank fundamentals.',

    faqTeasers: [
      {
        question: 'What is a good P/E ratio for a bank stock?',
        teaser: 'Bank P/E ratios have historically ranged between 8x and 15x during normal earnings periods, but interpreting P/E requires understanding the credit cycle context',
        faqSlug: 'what-is-a-good-pe-for-banks',
        faqCluster: 'valuation'
      },
      {
        question: 'How do I calculate price-to-earnings for a bank?',
        teaser: 'P/E equals the share price divided by diluted earnings per share, but bank-specific considerations around provision volatility and one-time items require careful attention',
        faqSlug: 'how-to-calculate-price-to-earnings',
        faqCluster: 'valuation'
      }
    ]
  },

  // ───────────────────────────────────────────────
  // 7. EPS (Earnings Per Share)
  // ───────────────────────────────────────────────
  'earnings-per-share': {
    bankSpecificContext:
      'For banks, EPS is heavily influenced by the provision for credit losses, which can swing significantly from quarter to quarter based on changes in loan portfolio quality and economic outlook. This makes bank EPS more volatile than EPS for most non-financial companies. Preferred stock dividends must be subtracted from net income to arrive at EPS available to common shareholders, and this adjustment is relevant for bank analysis because many banks, particularly larger institutions, have preferred shares outstanding. Banks that have completed mutual-to-stock conversions may show unusual EPS dynamics in their early years as public companies due to excess capital and limited outstanding share counts.',

    metricConnections:
      'EPS is the numerator input to the P/E ratio and one of two inputs (alongside BVPS) to the Graham Number formula. The relationship EPS equals ROE multiplied by BVPS connects per-share earnings directly to profitability and book value. Trailing twelve months (TTM) EPS calculated from quarterly SEC filings may differ slightly from the annual 10-K figure due to the timing of revisions and adjustments. EPS growth rate, combined with the retention ratio, indicates how quickly the bank is building book value per share through internal capital generation.',

    commonPitfalls:
      'Always use diluted EPS rather than basic EPS for investment analysis; diluted EPS accounts for stock options, restricted stock units, and other potentially dilutive securities. One-time items including securities gains or losses, legal settlements, tax adjustments, and gains or losses on branch sales can distort EPS in any given period and should be identified when evaluating earnings quality. Comparing EPS across banks is meaningless without normalizing for share count; a bank with $2 EPS and 100 million shares outstanding earns the same total income as one with $4 EPS and 50 million shares. Banks that have recently completed share buybacks may show EPS growth even when total net income is flat or declining, because the denominator shrinks.',

    acrossBankTypes:
      'EPS levels vary enormously by bank size and share count, making cross-bank EPS comparisons less useful than ratio-based metrics. What matters for investment analysis is EPS growth trajectory and consistency. Well-managed banks of all sizes aim for mid-to-high single-digit annual EPS growth through a combination of revenue growth, efficiency improvements, and share repurchases. Banks in high-growth markets or those executing successful acquisition strategies may show double-digit EPS growth rates, though acquisition-driven growth should be evaluated for sustainability and integration risk.',

    whatDrivesMetric:
      'Net income is driven by the same factors that drive ROAA: net interest margin, fee income, operating efficiency, and provision for credit losses. The share count denominator is affected by stock issuances, share buybacks, stock-based compensation dilution, and any conversion of preferred shares or convertible instruments. Capital management strategy, specifically the balance between retaining earnings for growth, paying dividends, and repurchasing shares, determines how net income growth translates into EPS growth. Acquisition activity can affect EPS in either direction depending on whether the transaction is accretive (increases EPS) or dilutive (decreases EPS) to the acquirer.',

    faqTeasers: [
      {
        question: 'How do I calculate EPS for a bank?',
        teaser: 'EPS equals net income available to common shareholders divided by diluted shares outstanding, with bank-specific adjustments for preferred dividends and one-time items',
        faqSlug: 'how-to-calculate-eps',
        faqCluster: 'valuation'
      },
      {
        question: 'What are the most important metrics for evaluating a bank stock?',
        teaser: 'The most important bank metrics span profitability (ROE, ROAA, NIM), efficiency, capital strength, asset quality, and valuation (P/B, P/E, EPS)',
        faqSlug: 'most-important-bank-stock-metrics',
        faqCluster: 'getting-started'
      }
    ]
  },

  // ───────────────────────────────────────────────
  // 8. BVPS (Book Value Per Share)
  // ───────────────────────────────────────────────
  'book-value-per-share': {
    bankSpecificContext:
      'Book value per share represents the per-share accounting net asset value of the bank. For banks, BVPS is more closely tied to economic value than for most non-financial industries because the majority of bank assets (loans, securities, cash) and liabilities (deposits, borrowings) are financial instruments carried at or near fair value under accounting standards. BVPS serves as a fundamental anchor for bank valuation, and its growth over time is a direct measure of shareholder value creation through retained earnings. A bank that consistently grows BVPS at 6-8% annually is compounding value for shareholders even if the stock price fluctuates.',

    metricConnections:
      'BVPS is the denominator in the P/B ratio and one of two inputs (alongside EPS) to the Graham Number. BVPS growth rate over time reflects retained earnings accumulation, which equals net income minus dividends. The relationship EPS equals ROE multiplied by BVPS means BVPS growth is linked to profitability and payout policy. BVPS minus tangible book value per share (TBVPS) equals per-share intangible assets and goodwill, quantifying how much of book value reflects acquisition premiums rather than tangible net assets.',

    commonPitfalls:
      'BVPS includes intangible assets and goodwill, which may overstate the tangible net asset value for banks that have completed acquisitions. TBVPS provides a more conservative alternative. Accumulated other comprehensive income or loss (AOCI) can cause BVPS to fluctuate with unrealized gains and losses on available-for-sale securities, particularly during periods of significant interest rate movements. A bank\'s BVPS may appear stable quarter-to-quarter while AOCI is masking significant unrealized investment losses. Share buybacks increase BVPS by reducing the denominator, which can create the appearance of value growth even when total equity is flat or declining. Comparing BVPS across banks is not meaningful because different share counts make absolute BVPS levels arbitrary.',

    acrossBankTypes:
      'BVPS growth rate is more informative than the absolute level. Well-capitalized community banks that pay moderate dividends (30-40% payout) and earn strong ROE (10-13%) can compound BVPS at 6-9% annually. Large banks with active share repurchase programs may show faster BVPS growth because buybacks reduce share count, concentrating book value into fewer shares. Banks that have completed mutual-to-stock conversions often start with very high BVPS relative to share price (low P/B), reflecting the excess capital that characterizes these conversions.',

    whatDrivesMetric:
      'Retained earnings are the primary driver of BVPS growth: net income minus dividends adds to equity, increasing BVPS. Share buybacks reduce shares outstanding, increasing BVPS mechanically. Capital raises or stock issuances increase shares outstanding, diluting BVPS. AOCI fluctuations, driven primarily by unrealized gains or losses on the available-for-sale securities portfolio, can cause BVPS to move independently of operating performance. Goodwill impairment charges from acquisitions that did not perform as expected reduce equity and therefore BVPS. Regulatory actions that require a bank to raise additional capital can dilute BVPS.',

    faqTeasers: [
      {
        question: 'What is tangible book value and why is it different from book value?',
        teaser: 'Tangible book value strips out goodwill and intangible assets from book value, providing a more conservative measure of net asset value for banks that have made acquisitions',
        faqSlug: 'tangible-book-value-vs-book-value',
        faqCluster: 'capital-and-risk'
      },
      {
        question: 'How do I calculate book value per share?',
        teaser: 'BVPS equals total shareholders\' equity divided by shares outstanding, with potential adjustments for preferred stock and attention to AOCI effects',
        faqSlug: 'how-to-calculate-bvps',
        faqCluster: 'valuation'
      }
    ]
  },

  // ───────────────────────────────────────────────
  // 9. Equity to Assets
  // ───────────────────────────────────────────────
  'equity-to-assets': {
    bankSpecificContext:
      'Equity-to-assets is the simplest measure of a bank\'s capital adequacy, representing the percentage of total assets funded by equity rather than deposits and other liabilities. For banks, this ratio has a unique significance because banking is fundamentally a leveraged business: a typical bank funds 88-92% of its assets with deposits and borrowings, leaving only 8-12% funded by equity. This thin equity cushion is what makes capital adequacy so critical in banking and why regulators monitor capital ratios closely. Higher equity-to-assets ratios provide more cushion to absorb unexpected losses but may also indicate the bank is not deploying its capital as productively as it could.',

    metricConnections:
      'The inverse of equity-to-assets is the equity multiplier (assets divided by equity), which is the leverage component of the DuPont decomposition linking ROAA to ROE. ROE equals ROAA multiplied by the equity multiplier, so a bank with ROAA of 1.0% and equity-to-assets of 10% (equity multiplier of 10x) produces ROE of 10%. Equity-to-assets provides a quick, leverage-based sanity check without the complexity of risk-weighted capital ratios like CET1 or Tier 1 ratios. It complements those risk-weighted measures by showing total leverage regardless of asset risk composition.',

    commonPitfalls:
      'Equity-to-assets does not account for the riskiness of the asset base. A bank with 10% equity-to-assets invested entirely in US Treasury securities has a fundamentally different risk profile than one with 10% equity-to-assets concentrated in speculative commercial real estate loans, even though both show the same ratio. Risk-weighted capital ratios (CET1, Tier 1, Total Capital) address this limitation by assigning different weights to assets based on their credit risk. Equity-to-assets can be distorted by large intangible asset balances from acquisitions, since goodwill is included in total assets but may not represent loss-absorbing capacity. Very high equity-to-assets may signal overcapitalization rather than strength, particularly if it depresses ROE below the cost of equity.',

    acrossBankTypes:
      'Community banks typically operate with equity-to-assets ratios of 8-12%, with higher levels common among banks that have limited growth opportunities and retain earnings without deploying them. Large banks may run slightly lower ratios (7-10%) due to more diversified asset bases and sophisticated regulatory capital management. De novo (newly chartered) banks often start with very high equity-to-assets ratios of 15-25% because they raise capital before building a loan portfolio; the ratio naturally declines over the first several years as the bank grows. Mutual savings banks tend to carry higher equity-to-assets ratios because they cannot issue common stock and must build capital entirely through retained earnings.',

    whatDrivesMetric:
      'Retained earnings are the primary source of equity growth for most banks, making profitability the fundamental long-term driver. Dividend payments reduce equity and therefore reduce the ratio. Share buybacks reduce both equity and assets (if funded by excess capital) but primarily affect equity. Capital raises through stock issuance increase equity. Loan growth increases assets, which decreases the ratio unless equity grows proportionally. Securities portfolio changes, large deposit inflows or outflows, and borrowing activity all affect total assets and can move the ratio independently of equity changes. Regulatory requirements set effective floors on equity-to-assets through minimum leverage ratio standards.',

    faqTeasers: [
      {
        question: 'What is the equity-to-assets ratio and what is a good level for banks?',
        teaser: 'Most US banks operate with equity-to-assets between 8% and 12%, with the appropriate level depending on asset risk composition and growth strategy',
        faqSlug: 'what-is-a-good-equity-to-assets-ratio',
        faqCluster: 'capital-and-risk'
      },
      {
        question: 'What is the DuPont decomposition and how does it apply to banks?',
        teaser: 'DuPont decomposition breaks ROE into ROAA multiplied by the equity multiplier, separating operating performance from the leverage effect that equity-to-assets measures',
        faqSlug: 'dupont-decomposition-for-banks',
        faqCluster: 'profitability'
      }
    ]
  },

  // ───────────────────────────────────────────────
  // 10. Loans to Deposits
  // ───────────────────────────────────────────────
  'loans-to-deposits': {
    bankSpecificContext:
      'The loans-to-deposits ratio measures how aggressively a bank is lending relative to its core funding base. Banking, at its foundation, is the business of transforming deposits into loans: a bank gathers deposits from savers and channels them as loans to borrowers, earning a spread in between. This ratio quantifies the intensity of that financial intermediation. A 75% ratio means that for every dollar of deposits, the bank has lent out 75 cents. The remaining 25 cents is held in securities, cash, or other assets. The ratio is a key indicator of both growth appetite and funding risk.',

    metricConnections:
      'Loans-to-deposits combined with NIM indicates whether the bank is effectively deploying its deposit funding into higher-yielding loans. High L/D paired with strong NIM suggests efficient intermediation. The ratio connects to loans-to-assets and deposits-to-assets: if deposits-to-assets is 80% and loans-to-assets is 65%, then loans-to-deposits is approximately 81%. Together these three ratios paint a complete picture of balance sheet composition and funding efficiency. Banks with high L/D ratios are more sensitive to deposit outflows because they have less liquidity cushion.',

    commonPitfalls:
      'A very high loans-to-deposits ratio (above 100%) indicates the bank is funding some loans with non-deposit sources such as Federal Home Loan Bank advances, brokerage deposits, or subordinated debt, which are typically more expensive and less stable than core deposits. While not necessarily dangerous, persistent ratios above 95-100% warrant scrutiny of funding stability. Conversely, a very low ratio (below 60%) may indicate the bank is underutilizing its deposit base, parking excess funds in low-yield securities rather than lending. This is safer but can drag down profitability. The ratio uses total loans and total deposits as reported, but the composition of each category matters enormously. Net loans (after loan loss reserves) versus gross loans can produce slightly different ratios.',

    acrossBankTypes:
      'Most US commercial banks operate with loans-to-deposits ratios between 70% and 90%, based on FDIC aggregate data. Community banks in high-growth markets may push above 90% as strong loan demand outpaces deposit growth. Large money center banks with significant trading and investment banking operations may show lower ratios because they hold more non-loan assets. Banks in rural or slower-growth markets sometimes show lower ratios due to limited loan demand relative to their deposit gathering capacity, leading them to invest heavily in securities instead.',

    whatDrivesMetric:
      'Loan demand in the bank\'s geographic and product markets is the primary driver. Strong economic growth, commercial development, and housing activity increase loan demand and push the ratio higher. Management\'s appetite for growth and risk tolerance affects how aggressively the bank pursues lending opportunities. Deposit growth, driven by branch network strength, pricing competitiveness, and market share, affects the denominator. Competition for both loans and deposits in local markets influences the pace at which each side grows. Regulatory constraints on concentrations (e.g., commercial real estate concentration guidance) can limit loan growth even when demand is strong.',

    faqTeasers: [
      {
        question: 'What is a healthy loans-to-deposits ratio for a bank?',
        teaser: 'Most US banks operate between 70% and 90%, with ratios above 100% indicating reliance on non-deposit funding and ratios below 60% suggesting underutilized deposit capacity',
        faqSlug: 'healthy-loans-to-deposits-ratio',
        faqCluster: 'efficiency'
      },
      {
        question: 'What happens when a bank\'s loans-to-deposits ratio is too high?',
        teaser: 'A ratio persistently above 95-100% may indicate the bank relies on wholesale or brokerage funding, which is more expensive and less stable than core deposits',
        faqSlug: 'loans-to-deposits-too-high',
        faqCluster: 'efficiency'
      }
    ]
  },

  // ───────────────────────────────────────────────
  // 11. Deposits to Assets
  // ───────────────────────────────────────────────
  'deposits-to-assets': {
    bankSpecificContext:
      'Deposits-to-assets measures what proportion of the bank\'s total funding comes from customer deposits versus other sources such as borrowings, subordinated debt, and equity. Deposits are generally the lowest-cost and most stable source of funding for banks, making a high deposits-to-assets ratio a structural advantage. Non-interest-bearing demand deposits (checking accounts) are particularly valuable because they provide free funding. The ratio reflects the strength of the bank\'s deposit franchise, which is the ability to gather and retain customer deposits at competitive costs.',

    metricConnections:
      'Deposits-to-assets combined with cost of deposits indicates funding efficiency. A bank with a 85% deposits-to-assets ratio and a cost of deposits of 0.50% has a significant funding advantage over one with a 70% ratio and 1.50% cost of deposits. The ratio connects to the overall funding structure: 1 minus deposits-to-assets minus equity-to-assets roughly equals the proportion of assets funded by non-deposit borrowings and other liabilities. Banks with high deposits-to-assets ratios and low cost of deposits tend to achieve wider net interest margins because their funding base costs less.',

    commonPitfalls:
      'The ratio treats all deposits equally, but deposit composition matters significantly. A bank with 85% deposits-to-assets where half the deposits are non-interest-bearing checking accounts is in a very different position than one where most deposits are rate-sensitive certificates of deposit or brokerage deposits. Brokerage deposits, while classified as deposits, behave more like wholesale funding because they are rate-sensitive and can leave quickly when rates change. A declining deposits-to-assets ratio may indicate the bank is growing through borrowed funds, which could signal difficulties in attracting or retaining depositors. Temporary spikes in deposits (e.g., seasonal patterns or large institutional deposits) can cause the ratio to fluctuate from quarter to quarter.',

    acrossBankTypes:
      'Traditional community banks with established branch networks often show deposits-to-assets ratios of 80-90%, reflecting their role as core deposit gatherers in local markets. Large money center banks may show somewhat lower ratios (70-80%) because they rely more on wholesale funding markets, repurchase agreements, and other non-deposit liabilities to fund their operations. Online banks and fintech-oriented banks may show high deposits-to-assets ratios but with deposits that are almost entirely rate-sensitive savings accounts or CDs, making the quality of the funding different despite the high ratio.',

    whatDrivesMetric:
      'Branch network presence and local market share are long-term structural drivers of deposit gathering capacity. Deposit pricing strategy determines whether the bank can attract and retain deposits without paying rates that erode NIM. Mix of deposit types, particularly the proportion of non-interest-bearing accounts, is a key quality indicator. Customer relationships, service quality, and convenience features (online banking, ATM networks) affect deposit retention. Competitive intensity in local markets drives deposit pricing and therefore the bank\'s ability to maintain its deposit base. Macroeconomic factors, including overall savings rates and consumer confidence, influence aggregate deposit levels.',

    faqTeasers: [
      {
        question: 'What is the deposits-to-assets ratio and what does it tell me?',
        teaser: 'Deposits-to-assets measures how much of a bank\'s funding comes from customer deposits, with higher ratios generally indicating more stable, lower-cost funding',
        faqSlug: 'what-is-deposits-to-assets-ratio',
        faqCluster: 'efficiency'
      },
      {
        question: 'How do I evaluate a bank\'s funding mix?',
        teaser: 'Evaluating funding mix requires looking at deposits-to-assets, the composition of those deposits, cost of deposits, and reliance on non-deposit funding sources',
        faqSlug: 'how-to-evaluate-bank-funding-mix',
        faqCluster: 'efficiency'
      }
    ]
  },

  // ───────────────────────────────────────────────
  // 12. Loans to Assets
  // ───────────────────────────────────────────────
  'loans-to-assets': {
    bankSpecificContext:
      'Loans-to-assets indicates what portion of the bank\'s total assets is deployed in loans, the core earning asset for most commercial banks. The remainder of assets is typically allocated to investment securities, cash and equivalents, Federal Reserve balances, premises and equipment, and other assets. Loans generally earn higher yields than investment securities, so banks with higher loans-to-assets ratios tend to generate higher NIM, all else equal. However, loans also carry higher credit risk than most securities, so a higher ratio implies greater exposure to potential loan losses.',

    metricConnections:
      'Loans-to-assets connects directly to NIM because a higher proportion of assets in loans (vs. lower-yielding securities) supports wider interest margins. The ratio also informs credit risk assessment: combined with asset quality metrics like the NPL ratio and net charge-off ratio, it indicates the total potential loss exposure from lending. Loans-to-assets and deposits-to-assets together determine the loans-to-deposits ratio. A bank with loans-to-assets of 70% and deposits-to-assets of 85% has a loans-to-deposits ratio of approximately 82%.',

    commonPitfalls:
      'The ratio does not distinguish between loan types, which carry very different risk and return profiles. A bank with 75% of assets in seasoned, low-LTV residential mortgages has a fundamentally different risk profile than one with 75% in construction and land development loans, even though both show the same loans-to-assets ratio. A rapidly rising loans-to-assets ratio may indicate aggressive lending growth, which historically correlates with future credit quality deterioration as underwriting standards loosen to sustain growth. Conversely, a declining ratio may indicate the bank is deliberately pulling back from lending, investing in securities for safety, or facing weak loan demand in its markets.',

    acrossBankTypes:
      'Most US commercial banks carry loans-to-assets ratios between 55% and 75%, based on FDIC data. Community banks focused on commercial lending often operate in the 65-80% range. Large money center banks, whose balance sheets include significant trading assets, investment securities, and Fed reserve balances, may show ratios in the 45-60% range. Banks that are growing their loan portfolios aggressively may temporarily push above 75%, while banks in contraction mode or in markets with weak loan demand may fall below 55%.',

    whatDrivesMetric:
      'Loan demand in the bank\'s target markets, driven by economic growth, commercial development, and consumer borrowing activity. Management\'s lending strategy and risk appetite determine how aggressively the bank converts deposits into loans. Investment portfolio strategy decisions: some banks maintain larger securities portfolios for liquidity management and interest rate risk hedging, which reduces the share of assets in loans. Regulatory guidance on loan concentrations (particularly commercial real estate concentration thresholds set by regulators at 300% of capital for total CRE or 100% for construction loans) can constrain lending even when demand is strong. Competitive conditions affect whether the bank can originate loans at acceptable pricing and terms.',

    faqTeasers: [
      {
        question: 'What are the most important metrics for evaluating a bank stock?',
        teaser: 'Key bank metrics span profitability (ROE, ROAA, NIM), efficiency, capital strength, asset quality, and valuation, with balance sheet ratios like loans-to-assets providing structural context',
        faqSlug: 'most-important-bank-stock-metrics',
        faqCluster: 'getting-started'
      },
      {
        question: 'How do I evaluate the credit quality of a bank\'s loan portfolio?',
        teaser: 'Credit quality evaluation starts with understanding the size of the loan portfolio (loans-to-assets) and then examines NPL ratios, net charge-offs, reserve coverage, and loan composition',
        faqSlug: 'how-to-evaluate-loan-credit-quality',
        faqCluster: 'capital-and-risk'
      }
    ]
  },

  // ───────────────────────────────────────────────
  // 13. Dividend Payout Ratio
  // ───────────────────────────────────────────────
  'dividend-payout-ratio': {
    bankSpecificContext:
      'For banks, the dividend payout ratio must be evaluated in the context of regulatory capital requirements and capital planning. Banks cannot simply pay out all their earnings as dividends the way some other industries might; they must retain sufficient earnings to maintain and build regulatory capital ratios. Federal and state regulators can and do restrict dividend payments when a bank\'s capital levels are insufficient, when the bank is under a supervisory order, or when earnings quality is poor. The Federal Reserve\'s stress testing regime for large banks includes explicit restrictions on capital distributions (dividends and buybacks) based on stress test results and the stress capital buffer requirement.',

    metricConnections:
      'Retention ratio equals 1 minus the payout ratio, and it determines how much of earnings is retained to build equity. The sustainable growth rate equals ROE multiplied by the retention ratio: a bank paying out 40% of earnings retains 60%, and if ROE is 12%, the sustainable growth rate is 7.2%. This growth rate represents how fast the bank can grow its equity, and therefore its assets and lending capacity, without needing to raise external capital. The payout ratio connects to the dividend discount model and Gordon Growth Model valuation methods, which require estimates of future dividends (driven by earnings and payout policy) to derive fair value.',

    commonPitfalls:
      'A low payout ratio is not always a positive signal. It may indicate the bank cannot safely pay a higher dividend because capital levels are being rebuilt after losses, or because regulators have restricted distributions. Conversely, a high payout ratio is not always a warning sign; it may be appropriate and sustainable for a bank with strong, stable ROE and limited growth opportunities that would benefit from deploying retained earnings. A payout ratio above 100% (paying out more than earnings) is unsustainable for more than a very short period and indicates the bank is paying dividends from prior period retained earnings, which erodes capital. Calculating the payout ratio from a single quarter can be misleading if that quarter contained unusual items affecting earnings; trailing twelve month calculations are more reliable.',

    acrossBankTypes:
      'Most US banks that pay regular dividends maintain payout ratios between 25% and 50%, based on FDIC aggregate data. Well-capitalized community banks with limited reinvestment opportunities may pay out 40-60% of earnings. Large banks subject to Federal Reserve stress testing and the stress capital buffer are more constrained in their payout ratios and must balance dividends with share buyback programs as part of their total capital return plans. De novo banks typically pay no dividends for their first several years of operation as they build capital and loan portfolios. Banks under regulatory orders (such as consent orders or cease-and-desist orders) are frequently prohibited from paying dividends until the order is lifted.',

    whatDrivesMetric:
      'Board dividend policy and management\'s view of appropriate capital levels are the primary drivers. Regulatory capital buffers, including the stress capital buffer for large banks, create an effective ceiling on total capital distributions. Earnings stability and predictability influence the board\'s confidence in maintaining dividend payments; banks with volatile earnings tend to set lower payout ratios to avoid the negative signal of a dividend cut. Growth needs affect the target: banks in high-growth markets want to retain more earnings to fund loan growth. Share buyback preferences can substitute for dividend payments as a form of capital return, allowing the bank to maintain a moderate dividend payout ratio while returning additional capital through repurchases. Peer group payout levels create competitive pressure on dividend policy.',

    faqTeasers: [
      {
        question: 'What is a good dividend payout ratio for a bank?',
        teaser: 'Most US banks maintain payout ratios between 25% and 50%, with the appropriate level depending on capital position, growth needs, and regulatory constraints',
        faqSlug: 'good-dividend-payout-ratio-for-banks',
        faqCluster: 'dividends'
      },
      {
        question: 'How do I evaluate whether a bank\'s dividend is safe?',
        teaser: 'Dividend safety assessment considers the payout ratio relative to earnings stability, capital ratios relative to regulatory minimums, and asset quality trends',
        faqSlug: 'how-to-evaluate-dividend-safety',
        faqCluster: 'dividends'
      },
      {
        question: 'How do I calculate the dividend payout ratio?',
        teaser: 'The payout ratio equals dividends per share divided by earnings per share (or total dividends divided by net income), with the retention ratio as its complement',
        faqSlug: 'how-to-calculate-dividend-payout-ratio',
        faqCluster: 'dividends'
      }
    ]
  },

};


// ─────────────────────────────────────────────────────────────────────────────
// CROSS-LINK MAP ENTRIES
// ─────────────────────────────────────────────────────────────────────────────
//
// These entries should be MERGED into the existing METRIC_TO_VALUATIONS and
// METRIC_TO_VALUATION_DESCRIPTIONS objects inside src/pages/MetricDetail.jsx.
//
// Only NEW cross-links not already present in the codebase are listed here.
// Verify against the existing maps before inserting to avoid duplicates.
// ─────────────────────────────────────────────────────────────────────────────

export const NEW_METRIC_TO_VALUATIONS = {
  // ROE connects to several valuation methods
  'roe': [
    'roe-pb-framework',
    'peer-comparison-analysis',
    'dividend-discount-model',
    // FUTURE (new valuation pages in Batch 2):
    // 'dupont-decomposition',
    // 'gordon-growth-model',
    // 'excess-capital-return-model',
  ],

  // ROAA connects to peer comparison (comparing operating performance)
  'roaa': [
    'peer-comparison-analysis',
    // FUTURE: 'dupont-decomposition',
  ],

  // NIM connects to peer comparison and DDM (earnings power drives dividends)
  'net-interest-margin': [
    'peer-comparison-analysis',
    'dividend-discount-model',
  ],

  // Efficiency Ratio connects to peer comparison
  'efficiency-ratio': [
    'peer-comparison-analysis',
  ],

  // P/B connects to P/B valuation, ROE-P/B framework, margin of safety, Graham Number
  'price-to-book': [
    'price-to-book-valuation',
    'roe-pb-framework',
    'margin-of-safety',
    'graham-number',
    // FUTURE: 'price-to-tangible-book-valuation',
  ],

  // P/E connects to P/E valuation, Graham Number, margin of safety
  'price-to-earnings': [
    'price-to-earnings-valuation',
    'graham-number',
    'margin-of-safety',
  ],

  // EPS connects to Graham Number, P/E valuation
  'earnings-per-share': [
    'graham-number',
    'price-to-earnings-valuation',
    'margin-of-safety',
  ],

  // BVPS connects to Graham Number, P/B valuation, ROE-P/B framework
  'book-value-per-share': [
    'graham-number',
    'price-to-book-valuation',
    'roe-pb-framework',
    'margin-of-safety',
  ],

  // Equity to Assets connects to ROE-P/B (leverage component)
  'equity-to-assets': [
    'roe-pb-framework',
    'peer-comparison-analysis',
    // FUTURE: 'dupont-decomposition',
  ],

  // Loans to Deposits connects to peer comparison
  'loans-to-deposits': [
    'peer-comparison-analysis',
  ],

  // Deposits to Assets connects to peer comparison
  'deposits-to-assets': [
    'peer-comparison-analysis',
  ],

  // Loans to Assets connects to peer comparison
  'loans-to-assets': [
    'peer-comparison-analysis',
  ],

  // Dividend Payout Ratio connects to DDM, Gordon Growth
  'dividend-payout-ratio': [
    'dividend-discount-model',
    // FUTURE: 'gordon-growth-model',
  ],
};


export const NEW_METRIC_TO_VALUATION_DESCRIPTIONS = {
  'roe': {
    'roe-pb-framework': 'ROE is the central input to the ROE-P/B framework, which derives the justified price-to-book multiple from a bank\'s return on equity relative to its cost of equity and growth rate.',
    'peer-comparison-analysis': 'ROE is one of the most important metrics for comparing bank profitability across a peer group, as it captures both operating performance and leverage in a single figure.',
    'dividend-discount-model': 'ROE combined with the retention ratio determines the sustainable dividend growth rate, a key input to the dividend discount model.',
  },
  'roaa': {
    'peer-comparison-analysis': 'ROAA is the preferred profitability metric for peer comparison because it removes leverage differences, allowing direct comparison of operating performance across banks with different capital structures.',
  },
  'net-interest-margin': {
    'peer-comparison-analysis': 'NIM is a core comparison metric in peer analysis, revealing differences in lending profitability, funding costs, and asset mix across banks.',
    'dividend-discount-model': 'NIM is the primary revenue driver for most banks, making it a key factor in projecting the future earnings that support dividend payments.',
  },
  'efficiency-ratio': {
    'peer-comparison-analysis': 'The efficiency ratio is a standard peer comparison metric that reveals differences in cost management and operational productivity across banks.',
  },
  'price-to-book': {
    'price-to-book-valuation': 'P/B is the ratio used directly in price-to-book valuation, the most common approach to assessing whether a bank stock is fairly valued.',
    'roe-pb-framework': 'P/B and ROE are linked through the justified P/B formula, making the current P/B ratio a key input to determining whether a bank trades at, above, or below its fundamental value.',
    'margin-of-safety': 'P/B relative to the justified P/B multiple helps determine whether a sufficient margin of safety exists between market price and estimated intrinsic value.',
    'graham-number': 'The Graham Number uses BVPS (the denominator of P/B) as one of its two inputs to estimate a maximum fair price.',
  },
  'price-to-earnings': {
    'price-to-earnings-valuation': 'P/E is the ratio used directly in price-to-earnings valuation to compare a bank\'s earnings multiple to its peers and historical levels.',
    'graham-number': 'The Graham Number uses EPS (the denominator of P/E) as one of its two inputs, connecting P/E analysis to Graham\'s intrinsic value framework.',
    'margin-of-safety': 'P/E levels inform margin of safety assessment by indicating how much the market is paying per dollar of earnings relative to fair value estimates.',
  },
  'earnings-per-share': {
    'graham-number': 'EPS is one of two required inputs to calculate the Graham Number, which estimates a maximum fair price based on a bank\'s earnings power and asset backing.',
    'price-to-earnings-valuation': 'EPS is the denominator of the P/E ratio, making it an essential input to price-to-earnings valuation methodology.',
    'margin-of-safety': 'EPS directly informs intrinsic value estimates in the Graham Number and other earnings-based models, and the gap between intrinsic value and market price defines the margin of safety.',
  },
  'book-value-per-share': {
    'graham-number': 'BVPS is one of two required inputs to the Graham Number, representing the asset backing component of Graham\'s dual-input fair value estimate.',
    'price-to-book-valuation': 'BVPS is the denominator of the P/B ratio, making it the essential per-share input for price-to-book valuation.',
    'roe-pb-framework': 'BVPS growth over time reflects capital compounding, and the ROE-P/B framework links this growth rate to the justified multiple investors should pay for each dollar of book value.',
    'margin-of-safety': 'BVPS provides the tangible asset backing per share, and comparing market price to BVPS-derived fair value estimates helps quantify the margin of safety.',
  },
  'equity-to-assets': {
    'roe-pb-framework': 'Equity-to-assets determines the equity multiplier, which links ROAA to ROE and therefore affects the justified P/B multiple through the ROE-P/B framework.',
    'peer-comparison-analysis': 'Equity-to-assets is an important peer comparison metric for assessing relative capital strength and leverage across a group of comparable banks.',
  },
  'loans-to-deposits': {
    'peer-comparison-analysis': 'Loans-to-deposits is a standard peer comparison metric for evaluating how aggressively banks in a peer group are deploying their deposit bases into lending.',
  },
  'deposits-to-assets': {
    'peer-comparison-analysis': 'Deposits-to-assets is used in peer comparison to evaluate the funding structure and stability of a bank\'s liability base relative to peers.',
  },
  'loans-to-assets': {
    'peer-comparison-analysis': 'Loans-to-assets is used in peer comparison to assess differences in asset deployment strategy and credit risk exposure across comparable banks.',
  },
  'dividend-payout-ratio': {
    'dividend-discount-model': 'The dividend payout ratio directly determines the dividends per share used in the dividend discount model, making it a critical input to DDM-based fair value estimates.',
  },
};

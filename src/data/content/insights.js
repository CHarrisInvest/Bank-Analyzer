/**
 * Insights Content Data
 * Educational content organized into category hubs and detail articles
 * covering broader banking topics for bank stock investors.
 *
 * Hub pages use [[article:slug]] markers to indicate where inline
 * article callout cards should appear within the prose content.
 */

export const INSIGHT_CATEGORIES = [
  {
    slug: 'interest-rate-risk',
    name: 'Interest Rate Risk & Sensitivity',
    shortDescription: 'How changes in interest rates affect bank earnings, balance sheets, and stock valuations.',
    icon: 'rate',
    order: 1,
    metaTitle: 'Interest Rate Risk & Sensitivity for Bank Stocks | BankSift Insights',
    metaDescription: 'Understand how interest rate changes affect bank profitability, balance sheet values, and stock prices. Covers duration gap, ALM, yield curve impacts, and NII simulation.',
    hubContent: 'Interest rate movements drive bank profitability more directly than almost any other external factor. When rates shift, the spread between what a bank earns on loans and investments and what it pays on deposits and borrowings changes, sometimes dramatically. That spread, the net interest margin, is the single largest revenue source for most banks.\n\nUnderstanding how a bank manages rate exposure separates informed investors from those relying on surface-level metrics. Two banks with identical ROE figures can carry vastly different levels of rate risk, and the difference only becomes visible when rates actually move.\n\n## Duration Gap\n\nDuration gap measures the mismatch between how quickly a bank\'s assets reprice versus its liabilities. A positive gap means assets reprice faster than liabilities, so rising rates tend to help. A negative gap means the opposite. Most community and regional banks run a positive duration gap because they fund long-term fixed-rate loans with shorter-term deposits.\n\nThe size of the gap matters as much as the direction. A bank with a duration gap of six months will see modest earnings swings from a 100-basis-point rate change. A bank with a gap of three years faces a much larger impact from the same move.\n\n[[article:duration-gap-analysis]]\n\n## Asset-Liability Management\n\nBanks don\'t passively accept whatever rate risk falls on their balance sheet. Asset-liability management (ALM) committees meet regularly to measure rate exposure and decide how much risk is acceptable. They use tools like interest rate swaps, adjustable-rate loan pricing, and deposit product design to position the balance sheet.\n\nThe quality of a bank\'s ALM process shows up indirectly in its earnings stability. Banks with disciplined ALM tend to produce smoother net interest margin trends across rate cycles, while banks with weaker processes show more volatility.\n\n[[article:asset-liability-management]]\n\n## Yield Curve Effects\n\nBanks borrow short and lend long. A steep yield curve, where long-term rates sit well above short-term rates, widens that natural spread and boosts profitability. A flat or inverted curve compresses it.\n\nThe shape of the yield curve often matters more to bank earnings than the absolute level of rates. A bank can earn a healthy margin at 3% short-term rates and 5% long-term rates but struggle at 5% short-term and 5.25% long-term, even though the overall rate level is higher.\n\n[[article:yield-curve-impacts]]\n\n## Rate Sensitivity Modeling\n\nBanks quantify their rate exposure through formal modeling, typically reporting the results in their SEC filings. The most common disclosure shows how net interest income and economic value of equity would change under parallel rate shocks of 100, 200, and 300 basis points in both directions. These models are simplifications, but they give investors a standardized way to compare rate exposure across banks.\n\n[[article:rate-sensitivity-modeling]]\n\n## Net Interest Income Simulation\n\nBeyond static sensitivity tables, sophisticated banks run dynamic simulations that project net interest income under various rate paths, balance sheet growth assumptions, and competitive pricing scenarios. These forward-looking projections are the primary tool management uses to set rate strategy, and the results sometimes appear in investor presentations.\n\n[[article:nii-simulation]]\n\n## What Investors Should Watch\n\nWhen evaluating a bank\'s rate sensitivity, focus on a few concrete items. First, check the 10-K or 10-Q for the interest rate sensitivity table, which shows projected changes in net interest income under different rate scenarios (typically +/- 100, 200, and 300 basis points). Second, look at the loan portfolio mix between fixed-rate and variable-rate loans. Third, examine the deposit base: a bank funded primarily by stable, low-cost core deposits has a natural advantage over one dependent on rate-sensitive CDs or wholesale funding.\n\nBanks that manage rate risk well tend to deliver more predictable earnings, which usually translates to more stable stock prices and higher valuation multiples over time.',
    relatedMetrics: ['net-interest-margin', 'cost-of-funds', 'cost-of-deposits'],
    relatedMetricDescriptions: {
      'net-interest-margin': 'The primary profitability measure affected by interest rate movements',
      'cost-of-funds': 'Tracks how rate changes flow through to a bank\'s borrowing costs',
      'cost-of-deposits': 'Shows how quickly deposit pricing responds to rate changes'
    },
    relatedValuations: ['dividend-discount-model', 'discounted-earnings-model'],
    relatedValuationDescriptions: {
      'dividend-discount-model': 'Rate assumptions directly affect the discount rate used in DDM calculations',
      'discounted-earnings-model': 'Earnings projections must account for expected rate path impacts on NII'
    },
    relatedFaqSlugs: ['how-interest-rates-affect-banks', 'what-is-interest-rate-risk', 'what-causes-nim-to-change', 'rising-rates-and-nim', 'yield-curve-and-bank-profitability'],
    articles: [
      {
        slug: 'duration-gap-analysis',
        title: 'Duration Gap Analysis for Banks',
        shortDescription: 'How to measure and interpret the mismatch between asset and liability repricing speeds.',
        order: 1,
        metaTitle: 'Duration Gap Analysis for Banks | BankSift Insights',
        metaDescription: 'Learn how duration gap measures a bank\'s interest rate exposure by comparing asset and liability repricing timelines. Practical guidance for bank stock investors.',
        content: 'Duration gap tells you how exposed a bank is to interest rate changes by comparing the average repricing timeline of its assets against its liabilities. A larger gap means more sensitivity to rate movements, in either direction.\n\n## How It Works\n\nEvery asset and liability on a bank\'s balance sheet has a duration, which measures how long it takes for the instrument to reprice or mature. A 30-year fixed-rate mortgage has a long duration. An overnight federal funds borrowing has a duration near zero. A bank\'s duration gap is the weighted average duration of its assets minus the weighted average duration of its liabilities.\n\nWhen the gap is positive, assets take longer to reprice than liabilities. Rising rates hurt in the short term because the bank\'s funding costs increase before its asset yields catch up. Falling rates help, because funding costs drop while asset yields hold steady for longer.\n\nA negative gap works in reverse. Assets reprice faster, so rising rates provide an immediate earnings boost.\n\n## Reading Duration Gap Disclosures\n\nBanks report rate sensitivity in their 10-K and 10-Q filings, typically in a table showing estimated changes to net interest income (NII) and economic value of equity (EVE) under rate shock scenarios. The NII sensitivity shows the near-term earnings impact over 12 months. The EVE sensitivity shows the longer-term balance sheet impact.\n\nA bank reporting that a +200 basis point shock would reduce NII by 8% has meaningfully more rate exposure than one showing a 2% reduction. Neither number alone is good or bad; it depends on whether the bank is being compensated for that risk through higher current margins.\n\n## What to Watch For\n\nCompare duration gap disclosures across banks of similar size and business model. A community bank focused on fixed-rate residential mortgages will naturally run a longer duration gap than one focused on adjustable-rate commercial real estate loans. The question is whether the gap is intentional and managed, or simply a byproduct of the loan mix.\n\nLook for changes over time. A bank that significantly increases its duration gap between reporting periods has made a bet on the direction of rates, whether explicitly or not. Shrinking gaps suggest the bank is de-risking, possibly in anticipation of rate volatility.',
        relatedMetrics: ['net-interest-margin'],
        relatedMetricDescriptions: {
          'net-interest-margin': 'Duration gap directly determines how NIM responds to rate changes'
        },
        relatedValuations: [],
        relatedValuationDescriptions: {},
        relatedFaqSlugs: ['what-is-interest-rate-risk', 'how-interest-rates-affect-banks'],
        relatedArticleSlugs: ['asset-liability-management', 'yield-curve-impacts'],
        relatedArticleDescriptions: {
          'asset-liability-management': 'How banks actively manage the duration gap through ALM processes',
          'yield-curve-impacts': 'How the yield curve shape interacts with duration positioning'
        }
      },
      {
        slug: 'asset-liability-management',
        title: 'Asset-Liability Management in Banking',
        shortDescription: 'How banks measure and control the balance between what they earn on assets and pay on liabilities.',
        order: 2,
        metaTitle: 'Asset-Liability Management (ALM) in Banking | BankSift Insights',
        metaDescription: 'Understand how banks use asset-liability management to control interest rate risk, maintain earnings stability, and protect capital through rate cycles.',
        content: 'Asset-liability management (ALM) is the process banks use to keep their earnings and capital stable as interest rates, liquidity conditions, and funding markets shift. The ALM committee, sometimes called ALCO, typically meets monthly to review the bank\'s rate position and decide whether adjustments are needed.\n\n## The Core Balancing Act\n\nBanks earn money on the spread between asset yields and funding costs. ALM\'s job is to make sure that spread stays positive and reasonably predictable, even when rates move in unexpected directions. The committee looks at current rate exposure, runs stress scenarios, and decides whether the bank should take on more or less rate risk.\n\nPractical ALM involves several levers:\n\n- Adjusting the mix of fixed-rate versus variable-rate loans originated\n- Changing deposit product pricing and maturity structures\n- Using interest rate swaps to convert fixed-rate exposure to floating, or vice versa\n- Managing the investment portfolio\'s duration and composition\n- Setting limits on how much rate risk the bank is willing to accept\n\n## How ALM Quality Shows Up in Financials\n\nYou can\'t see ALM quality on a single financial statement. It shows up over time in how stable the net interest margin is across rate environments. A bank with strong ALM will show a NIM that moves gradually and predictably as rates change. A bank with weak ALM will show sharp swings, sometimes positive surprises, sometimes negative.\n\nLook at NIM trends over two to three rate cycles. Banks that maintain a tight range (say, NIM between 3.2% and 3.6% across very different rate environments) are demonstrating effective ALM. Banks with a range of 2.8% to 4.2% are taking more risk, whether intentionally or not.\n\n## What Investors Should Look For\n\nIn earnings calls and investor presentations, management commentary on ALM strategy is a useful signal. Banks that discuss their rate positioning clearly and explain how they\'re hedged tend to be more disciplined. Vague statements like "we\'re positioned for any rate environment" are less informative.\n\nAlso watch for large interest rate swap positions. Swaps are the primary tool banks use to fine-tune rate exposure. A bank carrying a large notional swap book is actively managing its position, which is generally a positive sign, though the direction of those swaps tells you what rate bet the bank is making.',
        relatedMetrics: ['net-interest-margin', 'cost-of-funds'],
        relatedMetricDescriptions: {
          'net-interest-margin': 'ALM directly manages the stability and level of net interest margin',
          'cost-of-funds': 'Funding cost management is a core ALM function'
        },
        relatedValuations: [],
        relatedValuationDescriptions: {},
        relatedFaqSlugs: ['what-causes-nim-to-change', 'what-is-interest-rate-risk'],
        relatedArticleSlugs: ['duration-gap-analysis', 'yield-curve-impacts'],
        relatedArticleDescriptions: {
          'duration-gap-analysis': 'Duration gap is the primary metric ALM committees monitor',
          'yield-curve-impacts': 'Yield curve changes are a key input to ALM decision-making'
        }
      },
      {
        slug: 'yield-curve-impacts',
        title: 'Yield Curve Impacts on Bank Profitability',
        shortDescription: 'Why the shape of the yield curve matters more to bank earnings than the absolute level of rates.',
        order: 3,
        metaTitle: 'Yield Curve Impacts on Bank Profitability | BankSift Insights',
        metaDescription: 'Learn how steep, flat, and inverted yield curves affect bank net interest margins, earnings, and stock valuations differently.',
        content: 'The yield curve plots interest rates across different maturities, from overnight to 30 years. Its shape tells you the spread between short-term and long-term rates, and that spread feeds directly into bank profitability because banks typically borrow at short-term rates and lend at longer-term rates.\n\n## Steep Curves Boost Bank Earnings\n\nA steep yield curve means long-term rates are significantly higher than short-term rates. For banks, this is the most favorable environment. A bank paying 1% on deposits and earning 4% on five-year loans captures a wide spread without taking unusual risks. Most banks naturally benefit from a steep curve because their basic business model is built around this maturity mismatch.\n\nHistorically, periods of steep yield curves have coincided with strong bank earnings and higher bank stock valuations. The early 1990s and the period following the 2008 financial crisis both featured steep curves and improving bank profitability.\n\n## Flat and Inverted Curves Squeeze Margins\n\nA flat curve means short-term and long-term rates are nearly equal. Banks can still earn a spread, but it is narrower, and they may need to take on more credit risk or extend duration further to maintain margins. An inverted curve, where short-term rates exceed long-term rates, is the most challenging environment. Banks face the possibility that their funding costs actually exceed their asset yields on new business.\n\nDuring inverted curve periods, bank net interest margins typically compress. Not all banks are affected equally. Banks with large pools of non-interest-bearing deposits (like checking accounts that pay no interest) maintain a funding advantage even when short-term rates spike.\n\n## Interpreting Yield Curve Signals\n\nWhen analyzing a bank\'s rate sensitivity disclosures, consider the current curve shape as context. A bank reporting strong NIM during a steep curve period may not sustain those margins if the curve flattens. Conversely, a bank maintaining acceptable margins during a flat curve period is demonstrating pricing discipline and a strong deposit franchise.\n\nWatch for management commentary about how they expect NIM to trend as the curve shape changes. Banks that can articulate their positioning relative to the curve are usually managing it actively. Also compare a bank\'s NIM trend to the yield curve shape over the same period. If NIM declined while the curve steepened, something else is going on, possibly competitive deposit pricing pressure or a shift in the loan mix.',
        relatedMetrics: ['net-interest-margin', 'cost-of-deposits', 'interest-income-to-earning-assets'],
        relatedMetricDescriptions: {
          'net-interest-margin': 'Yield curve shape is the single largest external driver of NIM',
          'cost-of-deposits': 'Short-end rate movements directly affect deposit pricing',
          'interest-income-to-earning-assets': 'Asset yields respond to longer-term rate levels'
        },
        relatedValuations: [],
        relatedValuationDescriptions: {},
        relatedFaqSlugs: ['yield-curve-and-bank-profitability', 'inverted-yield-curve-and-banks', 'rising-rates-and-nim'],
        relatedArticleSlugs: ['duration-gap-analysis', 'asset-liability-management'],
        relatedArticleDescriptions: {
          'duration-gap-analysis': 'Duration gap determines how a bank is positioned for curve changes',
          'asset-liability-management': 'ALM committees actively manage exposure to curve shape changes'
        }
      },
      {
        slug: 'rate-sensitivity-modeling',
        title: 'Rate Sensitivity Modeling for Banks',
        shortDescription: 'How banks model and disclose their exposure to interest rate changes in SEC filings.',
        order: 4,
        metaTitle: 'Rate Sensitivity Modeling for Banks | BankSift Insights',
        metaDescription: 'Learn how to read and interpret bank interest rate sensitivity disclosures in 10-K and 10-Q filings, including NII and EVE impact tables.',
        content: 'Rate sensitivity modeling is how banks measure what would happen to their earnings and balance sheet value if interest rates moved by a specific amount. The results show up in SEC filings as tables projecting changes to net interest income (NII) and economic value of equity (EVE) under standardized rate shocks.\n\n## The Two Main Measures\n\nNII sensitivity estimates how the bank\'s interest income minus interest expense would change over the next 12 months if rates shifted immediately. A bank reporting \"+200bp: NII -4.2%\" expects its annual net interest income to drop 4.2% if rates rise 200 basis points. This is the near-term earnings measure.\n\nEVE sensitivity takes a longer view. It estimates how the present value of all the bank\'s assets minus liabilities would change under the same rate shock. EVE captures the full balance sheet impact, including changes in the market value of long-duration loans and securities that don\'t immediately affect earnings. A bank can show modest NII sensitivity but significant EVE sensitivity if it holds a large portfolio of long-term fixed-rate assets.\n\n## How to Read the Disclosures\n\nMost banks present a table with columns for rate changes of -100, -200, +100, +200, and sometimes +300 basis points. Look for asymmetry. A bank that benefits significantly from rising rates but suffers only modestly from falling rates has positioned itself for a particular outcome. Equal sensitivity in both directions suggests a more neutral posture.\n\nCompare the numbers across reporting periods. If a bank\'s sensitivity to rising rates doubled over the past year, management made a deliberate or accidental bet. The 10-K management discussion section usually explains why the position changed.\n\n## Limitations to Keep in Mind\n\nThese models assume rates move instantly and in parallel across all maturities, which never actually happens. They also rely on assumptions about how quickly depositors will move money in response to rate changes (deposit betas) and how fast borrowers will refinance loans (prepayment speeds). Different assumptions produce very different results, and banks choose their own assumptions.\n\nTwo banks with identical balance sheets could report different sensitivity numbers simply because one uses more conservative behavioral assumptions. When possible, compare banks using the same methodology and time frame rather than mixing approaches.',
        relatedMetrics: ['net-interest-margin', 'cost-of-funds'],
        relatedMetricDescriptions: {
          'net-interest-margin': 'NII sensitivity directly measures projected NIM changes under rate shocks',
          'cost-of-funds': 'Funding cost assumptions are a key input to rate sensitivity models'
        },
        relatedValuations: [],
        relatedValuationDescriptions: {},
        relatedFaqSlugs: ['what-is-interest-rate-risk', 'how-interest-rates-affect-banks'],
        relatedArticleSlugs: ['duration-gap-analysis', 'nii-simulation'],
        relatedArticleDescriptions: {
          'duration-gap-analysis': 'Duration gap is the underlying driver of rate sensitivity results',
          'nii-simulation': 'Dynamic NII simulation builds on static sensitivity modeling'
        }
      },
      {
        slug: 'nii-simulation',
        title: 'Net Interest Income Simulation',
        shortDescription: 'How banks project future earnings under different interest rate and balance sheet scenarios.',
        order: 5,
        metaTitle: 'Net Interest Income (NII) Simulation for Banks | BankSift Insights',
        metaDescription: 'Understand how banks use dynamic NII simulation to forecast earnings under different rate paths, growth assumptions, and competitive conditions.',
        content: 'Net interest income simulation goes beyond the static rate shock tables in SEC filings. Instead of asking \"what happens if rates jump 200 basis points today,\" simulation asks \"what happens to NII over the next one to three years under a specific rate path, given our expected loan growth, deposit trends, and pricing strategy?\"\n\n## Static vs. Dynamic Approaches\n\nStatic models freeze the balance sheet at a point in time and shock rates. They\'re useful as a snapshot but miss important real-world dynamics: loans mature and get replaced with new ones at different rates, deposits flow in and out, and the bank changes its pricing in response to competition.\n\nDynamic simulation models all of that. They project a future balance sheet month by month, applying assumed loan origination volumes, deposit growth rates, prepayment speeds, and pricing spreads. The rate path itself can follow a specific trajectory (Fed raises rates 25bp per quarter for two years) rather than an instantaneous shock.\n\n## What Investors Can Learn\n\nBanks occasionally share simulation results in investor presentations or earnings call commentary, though the detail varies widely. Statements like \"we expect NIM to expand 5 to 10 basis points over the next four quarters assuming the forward curve\" are outputs of NII simulation models.\n\nPay attention to the assumptions behind those projections. A bank forecasting NIM expansion because it expects deposit betas to remain low may be disappointed if competition for deposits intensifies. The projection is only as reliable as its inputs.\n\n## Key Assumptions That Drive Results\n\nFour assumptions dominate NII simulation outcomes:\n\n- Deposit betas: how much of a rate increase gets passed through to depositors. A bank assuming a 40% beta will project very different results than one assuming 60%.\n- Prepayment speeds: how quickly borrowers refinance or pay down loans when rates fall. Faster prepayments mean the bank must reinvest at lower yields sooner.\n- Balance sheet growth: whether the bank expects loans and deposits to grow, shrink, or stay flat. Growth in a rising rate environment can offset margin compression.\n- Pricing spreads on new business: the margin the bank expects to earn on new loans relative to its funding cost. Competitive pressure can narrow these spreads regardless of where base rates sit.\n\n## Connecting Simulation to Valuation\n\nFor investors building earnings models, NII simulation results (when available) provide a useful reality check. If your model assumes a bank\'s NIM will hold steady but the bank\'s own simulation projects compression, there\'s a disconnect worth investigating. Management teams that provide clear forward NII guidance, and then deliver on it, tend to be managing rate risk effectively.',
        relatedMetrics: ['net-interest-margin', 'cost-of-deposits', 'cost-of-funds'],
        relatedMetricDescriptions: {
          'net-interest-margin': 'NII simulation projects the path of net interest margin over time',
          'cost-of-deposits': 'Deposit beta assumptions are a critical input to NII simulation',
          'cost-of-funds': 'Overall funding cost trajectory is a primary simulation output'
        },
        relatedValuations: ['discounted-earnings-model'],
        relatedValuationDescriptions: {
          'discounted-earnings-model': 'NII simulation results feed directly into earnings-based valuation models'
        },
        relatedFaqSlugs: ['what-causes-nim-to-change', 'rising-rates-and-nim'],
        relatedArticleSlugs: ['rate-sensitivity-modeling', 'asset-liability-management'],
        relatedArticleDescriptions: {
          'rate-sensitivity-modeling': 'Static sensitivity tables provide the starting point for dynamic simulation',
          'asset-liability-management': 'ALM committees use simulation results to set rate positioning strategy'
        }
      }
    ]
  },
  {
    slug: 'bank-mergers-acquisitions',
    name: 'Bank Mergers & Acquisitions',
    shortDescription: 'How bank deals are structured, priced, and evaluated by investors from announcement through closing.',
    icon: 'merge',
    order: 2,
    metaTitle: 'Bank Mergers & Acquisitions Guide for Investors | BankSift Insights',
    metaDescription: 'Learn how bank M&A deals work, how takeover premiums are calculated, what makes a bank an acquisition target, and how to evaluate whether a deal creates or destroys value.',
    hubContent: 'Bank mergers and acquisitions follow a different playbook than deals in most other industries. The buyer is acquiring a regulated financial institution whose value is tied to its deposit relationships, loan portfolio quality, and regulatory standing, not to patents, brand equity, or intellectual property. That makes bank deal analysis more concrete in some ways and more nuanced in others.\n\nFor investors, bank M&A matters whether you own the acquirer, the target, or a potential future target. Acquisitions reshape competitive dynamics in local markets, change the risk profile of the combined entity, and often reveal how management thinks about capital allocation.\n\n## Takeover Premiums\n\nBank acquisitions typically price at a premium to the target\'s current stock price, expressed as a percentage of tangible book value or as a price-to-earnings multiple. The premium reflects the buyer\'s estimate of what the target\'s franchise is worth beyond its reported net assets.\n\nPremiums vary significantly based on market conditions, the target\'s deposit quality, its geographic footprint, and how many potential buyers are competing. During strong banking markets, premiums on tangible book value have reached 180% to 200% for attractive franchises. In weaker markets or for troubled banks, deals can happen at or below book value.\n\n[[article:takeover-premiums]]\n\n## Identifying Acquisition Targets\n\nCertain bank characteristics make an institution more likely to be acquired. Small size relative to peers, aging management teams without clear succession plans, and attractive deposit bases in growing markets all increase the probability. Banks trading below book value with solid core operations but lagging efficiency are classic targets because an acquirer can cut costs and unlock the embedded value.\n\nInvestors who can identify likely targets before a deal is announced stand to benefit from the takeover premium. The signals aren\'t hidden; they show up in public filings, board composition, and competitive positioning.\n\n[[article:identifying-targets]]\n\n## Deal Structures\n\nBank acquisitions use cash, stock, or a combination. The structure matters to both sets of shareholders. All-stock deals let target shareholders participate in the upside of the combined bank but expose them to the acquirer\'s stock price risk between announcement and closing. Cash deals provide certainty but no participation in future gains. Mixed deals split the difference.\n\nThe choice of structure also signals how the acquirer views its own stock. Buyers who use stock heavily may believe their shares are fully valued or overvalued. Those paying cash are either flush with excess capital or confident enough in the deal\'s returns to deploy hard currency.\n\n[[article:deal-structures]]\n\n## Regulatory Approval\n\nEvery bank acquisition requires regulatory approval, and the process adds both time and uncertainty that deals in other industries don\'t face. The primary regulators (OCC, Federal Reserve, FDIC, and state banking departments depending on the charter) evaluate the deal\'s impact on competition, the combined bank\'s financial condition, the acquirer\'s Community Reinvestment Act record, and management capability.\n\nApproval timelines typically run four to eight months but can stretch longer if the deal raises competitive concerns or if either bank has outstanding regulatory issues. Deals occasionally get blocked or withdrawn when regulatory hurdles prove too high.\n\n[[article:regulatory-approval]]\n\n## Value Creation and Destruction\n\nThe central question for acquirer shareholders is whether the deal will create value, meaning the combined bank earns more than the two banks would have separately, after accounting for the premium paid. Cost savings from eliminating overlapping branches, back-office systems, and executive positions are the most reliable source of deal value. Revenue synergies, like cross-selling the target\'s customers into the acquirer\'s product set, are harder to realize and frequently overestimated.\n\nHistory suggests that bank acquisitions have a mixed record on value creation. Deals with significant geographic overlap and clear cost-cutting opportunities tend to work. Deals premised primarily on revenue growth or transformational strategic logic have a higher failure rate.\n\n[[article:value-creation-destruction]]\n\n## What Investors Should Track\n\nWhen a bank you own announces an acquisition, evaluate the price paid relative to the target\'s tangible book value and earnings, the projected cost savings and the timeline to achieve them, the impact on the acquirer\'s capital ratios and earnings per share, and whether the deal makes strategic sense given the acquirer\'s existing footprint. Management credibility matters here: banks with a track record of successful integrations deserve more benefit of the doubt than serial acquirers whose past deals haven\'t delivered promised returns.',
    relatedMetrics: ['price-to-book', 'price-to-tangible-book-value', 'price-to-earnings', 'tangible-book-value-per-share', 'efficiency-ratio'],
    relatedMetricDescriptions: {
      'price-to-book': 'Takeover premiums are commonly expressed as a multiple of book value',
      'price-to-tangible-book-value': 'Tangible book value is the standard baseline for bank deal pricing',
      'price-to-earnings': 'P/E multiples provide a second lens for evaluating deal pricing',
      'tangible-book-value-per-share': 'The per-share figure used to calculate tangible book dilution from acquisitions',
      'efficiency-ratio': 'Cost savings from M&A directly improve the combined bank\'s efficiency ratio'
    },
    relatedValuations: ['price-to-book-valuation', 'price-to-tangible-book-valuation', 'price-to-earnings-valuation'],
    relatedValuationDescriptions: {
      'price-to-book-valuation': 'P/B valuation is the primary framework for assessing bank deal pricing',
      'price-to-tangible-book-valuation': 'Tangible book valuation strips out goodwill to show hard asset value in deals',
      'price-to-earnings-valuation': 'Earnings-based valuation helps assess whether a deal price is reasonable relative to profitability'
    },
    relatedFaqSlugs: ['how-bank-mergers-acquisitions-work', 'why-pb-primary-bank-valuation', 'what-is-a-good-pb-for-banks'],
    articles: []
  }
];

// Derived flat array of all articles with category context added
export const ALL_INSIGHT_ARTICLES = INSIGHT_CATEGORIES.flatMap(cat =>
  cat.articles.map(article => ({
    ...article,
    categorySlug: cat.slug,
    categoryName: cat.name
  }))
);

/**
 * BankCEO guide pages: How to Play (/game/how-to-play) and the Strategy Guide
 * (/game/strategy-guide).
 *
 * Plain data, no imports, so the React pages (src/components/GameGuide.jsx)
 * and the static pre-render (scripts/prerender.mjs) share one copy.
 *
 * Text fields accept two bits of inline markup (see src/utils/inlineMarkup.js):
 *   **bold**  and  [label](/internal/path)
 *
 * Block types:
 *   { type: 'p', text }
 *   { type: 'h3', text }
 *   { type: 'list', items: [text] }            bulleted
 *   { type: 'steps', items: [text] }           numbered
 *   { type: 'table', caption?, head: [text], rows: [[text]] }
 *   { type: 'note', title?, text }             highlighted aside
 *   { type: 'formula', text }                  set-apart calculation
 *
 * Figures quoted from the game (thresholds, rates, starting balances) mirror
 * public/game/engine.js. If the engine is retuned, update them here.
 */

const HOW_TO_PLAY = {
  slug: 'how-to-play',
  path: '/game/how-to-play',
  navLabel: 'How to Play',
  title: 'How to Play BankCEO',
  metaTitle: 'How to Play BankCEO | Rules, Controls & Scoring',
  metaDescription:
    "Learn how to play BankCEO, the free bank simulation game. What every tab and control does, how a quarter works, what ends the game, and how your final grade is scored.",
  lede:
    "BankCEO puts you in charge of a small community bank for ten years. Each turn you look at the numbers, change whatever settings you like, and press one button to run the next three months. This page covers the screen, every control, and how the game works out your grade.",
  sections: [
    {
      id: 'one-minute',
      heading: 'The game in one minute',
      blocks: [
        { type: 'p', text: "You are the new CEO of First Meridian Bank, a one-branch bank with $335 million in assets. The game lasts 40 turns. Each turn is one quarter (three months), so a full game covers ten years." },
        { type: 'p', text: "A turn has three parts:" },
        {
          type: 'steps',
          items: [
            "**Read.** The Overview tab shows what happened last quarter and a forecast for the next one.",
            "**Decide.** Change any settings on the Operations and Treasury tabs. The forecast updates as you move them.",
            "**Run.** Press the amber Run button. The quarter plays out, the results post, and you go again.",
          ],
        },
        { type: 'p', text: "The game can end two ways. If the bank's capital runs too low, regulators close it and the game is over on the spot. If you make it through all 40 quarters, you get a letter grade from F to A+ based on how much value you built for shareholders." },
        {
          type: 'note',
          title: "You can't lose by sitting still",
          text: "Every setting starts in a sensible middle position. In our test runs, a bank left on its starting settings for all 40 quarters survived every time and usually finished with a B. Press Run a few times and watch what moves before you start changing things.",
        },
      ],
    },
    {
      id: 'starting-bank',
      heading: 'The bank you start with',
      blocks: [
        { type: 'p', text: "A bank earns most of its money on the gap between two interest rates. It pays savers a low rate on their deposits, lends that money out at a higher rate, and keeps the difference. First Meridian starts out doing this reasonably well, with room to do better." },
        {
          type: 'table',
          caption: 'First Meridian Bank on day one',
          head: ['Item', 'At the start', 'What it is'],
          rows: [
            ['Total assets', '$335 million', 'Everything the bank owns, mostly loans and bonds'],
            ['Loans', '$232 million', 'Money lent to customers'],
            ['Securities', '$80 million', 'Bonds the bank holds'],
            ['Deposits', '$300 million', 'Money customers keep at the bank'],
            ['Shareholder equity', '$32 million', 'What would be left for the owners if every debt were paid'],
            ['Shares', '2 million', 'The slices that equity is divided into'],
            ['Book value per share', '$16.00', 'Equity divided by shares'],
            ['Dividend', '$0.18 a quarter', 'Cash paid to the owners of each share'],
            ['Profit', 'About $660,000 a quarter', 'What is left after interest, expenses, loan losses and tax'],
          ],
        },
        { type: 'p', text: "[Book value per share](/metrics/book-value-per-share) is the number to remember. Your final grade comes from how far you raise it over ten years, plus the dividends you pay along the way." },
      ],
    },
    {
      id: 'a-quarter',
      heading: 'How a quarter works',
      blocks: [
        { type: 'h3', text: 'The forecast and the surprise' },
        { type: 'p', text: "The Overview tab opens with a table of headline numbers: net income, earnings per share, net interest margin, provision, loans, deposits and a few more. One column shows last quarter's actual results. Another shows the forecast for next quarter under your current settings." },
        { type: 'p', text: "The forecast is an estimate. It assumes a quiet quarter, with no surprise events and none of the small random swings in loan demand, deposit flows and loan losses that the real quarter will bring. On larger screens the table adds Plan and Surprise columns after your first turn, so you can see how far each result landed from what you expected." },
        { type: 'p', text: "Below the table, the Earnings Walk splits the expected change in profit into its causes: interest income, provision, fee income, expenses and tax. When the forecast drops after you move a slider, this is the quickest place to see why." },
        { type: 'h3', text: 'What carries over and what resets' },
        { type: 'p', text: "Sliders on the Operations tab stay where you leave them. So do the dividend, the securities duration, the liquidity target and the brokered CD balance." },
        { type: 'p', text: "Four Treasury controls are one-quarter instructions and go back to zero after every run: share repurchases, equity issuance, the FHLB advance and subordinated debt. The provision override also returns to Auto. If you want to buy back stock three quarters in a row, you have to ask three times." },
        { type: 'h3', text: 'Saving and restarting' },
        { type: 'p', text: "The game saves itself in your browser after every change. Close the tab or refresh the page and you come back to the same quarter. The save lives on that device and in that browser only. The Restart button in the header starts a new game with a new economy, and it asks first if you have a game in progress." },
      ],
    },
    {
      id: 'the-screen',
      heading: 'Reading the screen',
      blocks: [
        { type: 'p', text: "The header stays visible on every tab. It shows the current quarter (Y3 Q2 means year three, second quarter), a chip naming the current phase of the economy, and a progress track that fills in as the ten years go by." },
        { type: 'p', text: "Next to that are the vital signs. Each one changes color: green for healthy, amber for caution, red for trouble." },
        {
          type: 'table',
          caption: 'The vital signs in the header',
          head: ['Sign', 'What it tells you', 'Green', 'Red'],
          rows: [
            ['[CET1](/metrics/cet1-capital-ratio)', "The bank's safety cushion: the owners' capital as a share of its risk-weighted assets", '10% or more', 'Below 7.5%'],
            ['[ROA](/metrics/roaa)', 'Yearly profit for each dollar of assets', '1.00% or more', 'Below 0.50%'],
            ['[NIM](/metrics/net-interest-margin)', 'Interest earned minus interest paid, as a share of the assets that earn interest', '3.40% or more', 'Below 2.80%'],
            ['[NPL](/metrics/non-performing-loans-ratio)', 'The share of loans that have stopped paying', '1.5% or less', 'Above 3.0%'],
            ['Sat.', 'Customer satisfaction on a scale of 0 to 100. It starts at 65.', '75 or more', 'Below 35'],
            ['Net Income', "Last quarter's profit", '', 'Any loss'],
          ],
        },
        { type: 'p', text: "On a desktop screen, the right-hand column holds the Macro Tape (the Fed funds rate, the 10-year Treasury yield, unemployment and GDP growth), a card with the latest quarter's events, the running Activity Log and the Run button. On a phone or tablet, the tape and the log move to their own Log & Macro tab and the Run button sits in the navigation bar." },
      ],
    },
    {
      id: 'tabs',
      heading: 'The five tabs',
      blocks: [
        {
          type: 'list',
          items: [
            "**Overview.** Last quarter against next quarter's forecast, the Earnings Walk, six capital and risk ratios, and a picture of the balance sheet. There are no controls here.",
            "**Operations.** The day-to-day business: lending on one side, consumer deposits and fees on the other.",
            "**Treasury.** The money decisions: dividends, buybacks, borrowing, the bond portfolio and loan-loss reserves.",
            "**Call Report.** The bank's full financial statements, laid out like the [quarterly report real banks file with regulators](/faq/what-is-a-call-report). Nothing to change, plenty to read.",
            "**Tenure.** Your track record: a chart of book value per share across the ten years, a small trend chart for every major metric, and a quarter-by-quarter table.",
          ],
        },
        { type: 'p', text: "The first time you open each tab, a short guided tour points out the main parts. You can skip it at any step." },
      ],
    },
    {
      id: 'lending-controls',
      heading: 'Operations: the lending controls',
      blocks: [
        { type: 'p', text: "The left side of the Operations tab is labeled Production. Its five sliders decide how many loans the bank makes, how safe they are, and how much of that work turns into fee income." },
        {
          type: 'table',
          head: ['Control', 'Settings', 'What it does'],
          rows: [
            ['Loan Origination Pace', 'Shrink, Slow, Match, Push, Floor It', 'How hard the bank chases new loans. Match follows local demand. Push and Floor It grow the loan book faster, but they cost more in advertising and lender pay, earn slightly lower rates, and build up hidden credit risk.'],
            ['Underwriting Stance', 'Loose, Easy, Standard, Tight, Strict', 'How picky the bank is about who gets a loan. Looser standards add growth now and bad loans later. Tighter standards do the reverse.'],
            ['SBA Gain-on-Sale', 'Off, 10%, 20%, 30%', 'Sells a slice of new small-business loans to investors for an upfront gain. More fee income, slower loan growth.'],
            ['Mortgage Banking Program', 'Off, Light, Standard, Full', 'Makes home loans and sells them. Each step adds $60,000 a quarter in fixed cost. Income rises when rates fall and people refinance, and shrinks when rates climb.'],
            ['Indirect Loan Channel', 'Off, Modest, Aggressive', 'Buys car and RV loans through dealers. Fast growth at lower rates. Examiners warn once these pass 15% of all loans, and above 25% they block dividends and buybacks.'],
          ],
        },
        { type: 'p', text: "Above the sliders sits the Latent Credit Risk gauge. It estimates the losses already baked into loans you have made that have not shown up yet. Pushing growth and loosening standards fill it. It reads Contained below $2 million, Elevated from there, and Critical at $5 million." },
        { type: 'p', text: "Loans written on loose terms tend to go bad four to eight quarters later. The gauge is your early warning for trouble the NPL number will not show for a year or more." },
      ],
    },
    {
      id: 'deposit-controls',
      heading: 'Operations: deposits and fees',
      blocks: [
        { type: 'p', text: "The right side, Consumer Deposit Ops, covers how the bank attracts deposits and what it charges customers. Rates here are quoted in basis points (bps). One basis point is a hundredth of a percent, so 20 bps is 0.20%." },
        {
          type: 'table',
          head: ['Control', 'Range', 'What it does'],
          rows: [
            ['Deposit Pricing', '40 bps below to 40 bps above local competitors', 'Paying more attracts deposits and pleases customers but raises interest costs. Paying less saves interest, and deposits leave quickly.'],
            ['Deposit Marketing Spend', '$0 to $500,000 a quarter', 'Advertising that brings in new deposits. The first dollars work much harder than the last. The card tells you how much money the current budget should bring in.'],
            ['Overdraft Fee', '$0 to $45 per item, starting at $25', "Higher fees earn more and annoy customers. Hold it above $30 for a year and you risk a regulator's inquiry."],
            ['Monthly Maintenance Fee', '$0 to $25 a month, starting at $10', "Charged on accounts that don't qualify for a waiver. Above $12, more customers find a way to avoid it."],
          ],
        },
        { type: 'p', text: "The Customer Satisfaction Impact box at the top of this column shows how many points your current pricing, marketing and fees will add to or take from the satisfaction score this quarter. Satisfaction falls faster than it recovers. Finish below 50 and it costs you a letter grade. Drop below 35 and customers start moving their deposits to other banks." },
      ],
    },
    {
      id: 'treasury-controls',
      heading: 'The Treasury controls',
      blocks: [
        { type: 'p', text: "Treasury is where you decide what to do with the bank's profits and how to cover gaps in its funding. Two panels at the top preview next quarter: the same live forecast you see on Operations, and a Treasury Impacts strip showing the change in CET1, cash, wholesale funding and retained earnings." },
        { type: 'h3', text: 'Shareholder Distributions' },
        {
          type: 'list',
          items: [
            "**Dividend per Share.** From $0 to $0.50 a quarter. Paid in cash to shareholders and counted in your final score.",
            "**Share Repurchase Authorization.** Up to $5 million a quarter to [buy back the bank's own shares](/faq/how-bank-buybacks-work). With fewer shares, each one left owns more of the bank.",
            "**Equity Issuance.** Sells up to $20 million of new shares to raise capital. It costs a 5% fee and shrinks every existing owner's stake, so treat it as a rescue tool.",
          ],
        },
        { type: 'p', text: "Dividends and buybacks share one budget, shown as Distribution Capacity. It works out to roughly the last year of profit. Dividends are paid from it first and buybacks get what is left. If CET1 drops below 7% the budget shrinks in steps, and it reaches zero a little above 5%." },
        { type: 'h3', text: 'Wholesale Funding' },
        { type: 'p', text: "When deposits can't cover the loans you want to make, the bank can borrow." },
        {
          type: 'list',
          items: [
            "**FHLB Advance.** A loan from the Federal Home Loan Bank at the Fed funds rate plus 0.25%. Each quarter you can borrow up to $20 million more or repay up to $10 million. The total is capped at a quarter of your loans and securities.",
            "**Brokered CDs.** Deposits bought through brokers at the Fed funds rate plus 0.75%. You set a target balance of up to $50 million, and it rolls over every quarter until you lower it.",
          ],
        },
        { type: 'p', text: "Both cost more than ordinary deposits. Together they make up your [wholesale funding](/faq/wholesale-funding-vs-core-deposits), and examiners get uneasy once it passes 15% of all funding. If cash runs short, the bank sells securities and then draws FHLB advances by itself to cover the gap. The Activity Log tells you when that happens." },
        { type: 'h3', text: 'Balance Sheet Positioning' },
        {
          type: 'list',
          items: [
            "**Securities Portfolio Duration.** 1, 3, 5 or 7-plus years. Longer bonds pay more interest, but their value drops further when rates rise, and part of that drop comes straight out of the bank's capital.",
            "**Liquidity Target.** Lean, Standard, Cushioned or Fortress: cash of 2.5%, 5%, 7.5% or 10% of assets. More cash is safer when deposits leave in a hurry and earns a little less the rest of the time.",
          ],
        },
        { type: 'h3', text: 'Sub. Debt' },
        { type: 'p', text: "Subordinated debt is long-term borrowing at the Fed funds rate plus 3%, fixed on the day you issue it. It counts toward the total capital ratio. It does not raise CET1, the ratio that decides whether the bank survives." },
        { type: 'h3', text: 'Provision Override' },
        { type: 'p', text: "Each quarter the bank sets money aside for loans it expects to go bad. That expense is the [provision](/faq/what-is-provision-for-credit-losses), and the reserve it builds is the allowance. Left on Auto, the game works out a sensible amount for you." },
        { type: 'p', text: "The override lets you set it by hand for one quarter, anywhere from zero to $2 million. Set it higher to build a cushion before trouble arrives, or lower to soften a rough quarter. It is meant for the short term." },
        { type: 'p', text: "Examiners compare the bank's allowance with the level the model would be holding. The panel shows this as Reserve Adequacy. Under-provide while the allowance is below 95% of the model's level and you get a warning. Warnings clear one per quarter once the allowance is back above 95%, and going back to Auto rebuilds it over the following year." },
        {
          type: 'note',
          title: 'Three warnings and the regulators step in',
          text: "A third warning, or an allowance that drops below 60% of the model's level, brings an enforcement action. The whole shortfall is charged at once, the bank pays a penalty of the same size (at least $500,000, and more for a repeat offence), and for eight quarters the override is locked and dividends and buybacks are suspended. The panel warns you before you press Run if your setting would trigger one.",
        },
      ],
    },
    {
      id: 'economy-events',
      heading: 'The economy, events and exams',
      blocks: [
        { type: 'h3', text: 'The business cycle' },
        { type: 'p', text: "The economy moves through four phases, always in the same order. How long each one lasts changes from game to game." },
        {
          type: 'table',
          head: ['Phase', 'What it feels like'],
          rows: [
            ['Expansion', 'Loan demand is strong, deposits grow, few loans go bad, and interest rates drift up. Every game starts here.'],
            ['Late cycle', 'Growth slows and more loans start to wobble. Rates keep rising. Recession comes next.'],
            ['Recession', "Loan demand dries up, deposits shrink, bad loans jump and the Fed cuts rates fast. The bank's share price drops."],
            ['Recovery', 'Things steady. Losses ease and demand returns.'],
          ],
        },
        { type: 'p', text: "Every game has at least one recession. In our test runs the first one usually arrived in year four, five or six, and about one game in four had a second before the ten years were up." },
        { type: 'h3', text: 'Random events' },
        { type: 'p', text: "Most quarters are quiet. Now and then the Activity Log reports something that moves the numbers." },
        {
          type: 'table',
          head: ['Event', 'What happens'],
          rows: [
            ['Deposit Flight', 'A competitor lures savers away. About 8% of deposits leave in one quarter.'],
            ['Regional Credit Shock', 'A big local employer cuts jobs and bad loans jump. Only happens during a recession.'],
            ['Rate Shock', 'A surprise one-point rate hike marks down the bond portfolio. Only happens when the Fed funds rate is above 5%.'],
            ['Fraud Loss', 'A one-time expense of $350,000.'],
            ['CRE Concern', 'Commercial property weakens and loan growth dips. Late cycle only.'],
            ['Strong Pipeline', 'A local boom lifts loan growth for the quarter.'],
            ['Competitor Exit', 'A rival closes its branch and some of its deposits and loans come to you.'],
            ['Fee Income Win', 'A strong quarter for mortgage sales adds about $300,000 of fee income.'],
          ],
        },
        { type: 'h3', text: 'The annual exam' },
        { type: 'p', text: "From year two on, regulators examine the bank at the end of every year. They check five numbers:" },
        {
          type: 'list',
          items: [
            "CET1 of at least 8.5%",
            "[Tier 1 leverage](/metrics/tier-1-leverage-ratio) of at least 6%",
            "Reserves covering at least 60% of non-performing loans",
            "Non-performing loans no higher than 4% of all loans",
            "Cash and sellable securities of at least 6% of assets",
          ],
        },
        { type: 'p', text: "Pass all five and nothing happens. Miss one and you get a written finding, sometimes with a $50,000 fine. Miss several and both the odds and the size of the fine go up, to as much as $250,000." },
        { type: 'h3', text: 'The overdraft inquiry' },
        { type: 'p', text: "Keep the overdraft fee above $30 for four quarters in a row and every quarter after that carries a chance of a consumer-protection inquiry. If one lands, the bank pays a one-time charge of roughly $230,000 to $650,000, depending on how high the fee was, and customer satisfaction takes a hit for six quarters." },
      ],
    },
    {
      id: 'ending',
      heading: 'How the game ends',
      blocks: [
        { type: 'h3', text: 'Failing' },
        { type: 'p', text: "The bank fails the moment CET1 falls below 4.5% or the Tier 1 leverage ratio falls below 4%. The end screen names a root cause, such as bad loans, bond losses from rising rates, or loan growth that outran the bank's funding." },
        { type: 'p', text: "You get a warning first. Below 6.5% CET1 or 5% leverage, the log posts a PCA Warning every quarter. PCA stands for prompt corrective action, the [set of rules regulators use to step in](/faq/what-happens-below-minimum-capital) as a bank's capital runs down." },
        { type: 'h3', text: 'Finishing and your grade' },
        { type: 'p', text: "Survive 40 quarters and the game grades you on total shareholder return: the rise in book value per share plus all the dividends you paid per share, measured against the $16.00 you started with." },
        { type: 'formula', text: "Total return = (ending book value per share − $16.00 + dividends paid per share) ÷ $16.00" },
        { type: 'p', text: "Say you finish with a book value of $30 a share after paying $0.18 every quarter, which adds up to $7.20. Your total return is ($30 − $16 + $7.20) ÷ $16, or about 133%. That earns a B." },
        {
          type: 'table',
          caption: 'Grades',
          head: ['Grade', 'Total return', 'CET1 needed at the end'],
          rows: [
            ['A+', 'Above 174%', '10%'],
            ['A', 'Above 136%', '9%'],
            ['B', 'Above 104%', '8%'],
            ['C', 'Above 46%', '7%'],
            ['D', 'Above 18%', 'None'],
            ['F', '18% or less', 'None'],
          ],
        },
        { type: 'p', text: "Four checks can pull the grade down:" },
        {
          type: 'list',
          items: [
            "**Capital.** If your final CET1 is below the level in the table, you drop to the highest grade you do qualify for.",
            "**Loans against deposits.** Finishing with loans below 65% or above 115% of deposits costs one grade. An A+ also needs at least 75%. This is the [loan-to-deposit ratio](/metrics/loans-to-deposits), shown as Loan/Deposit on the Overview tab.",
            "**Customer satisfaction.** Finishing below 50 costs one grade.",
            "**Reserves.** Finishing while under a reserve enforcement order costs one grade. If your allowance ends the game below the model's level, the gap is also taken off book value before the score is worked out.",
          ],
        },
        { type: 'p', text: "The end screen also shows a Macro Difficulty label from Easy to Brutal, based on how much recession and how many bad events your game had. It is there for context. It does not change the grade." },
        { type: 'p', text: "The estimated share price is not part of the score either. It matters during the game because it sets what a buyback costs and what new shares raise." },
      ],
    },
    {
      id: 'phone',
      heading: 'Playing on a phone',
      blocks: [
        { type: 'p', text: "BankCEO runs in the browser on phones, tablets and computers. On a phone the tabs move to a bar at the bottom of the screen, or to a rail at the side if you turn the phone sideways. The strip above the game has a Fullscreen button on browsers that support it." },
        { type: 'p', text: "You can also add the game to your home screen so it opens from its own icon like an app. The [BankCEO page](/game) has the steps for iPhone and Android." },
      ],
    },
    {
      id: 'questions',
      heading: 'Common questions',
      blocks: [
        { type: 'h3', text: 'Do I need to know banking to play?' },
        { type: 'p', text: "No. The guided tour explains each tab, every slider states its trade-off in a line of text underneath, and the forecast shows the effect before you commit. If a term is new, the [glossary](/glossary) and the [metrics pages](/metrics) explain each one." },
        { type: 'h3', text: 'Is every game the same?' },
        { type: 'p', text: "No. Each new game draws its own economy: when the recession comes, how long it lasts, which events hit and when. The same decisions can earn an A in one game and a B in the next." },
        { type: 'h3', text: 'Why was my result different from the forecast?' },
        { type: 'p', text: "The forecast assumes a quiet quarter. The real one adds random swings in loan demand, deposit flows and loan losses, and sometimes an event. Small misses are normal. A big one usually has a line in the Activity Log explaining it." },
        { type: 'h3', text: 'Is First Meridian a real bank?' },
        { type: 'p', text: "No. The bank, its numbers and its customers are made up. The rules are simplified versions of real ones: the capital thresholds, the exam ratios and the layout of the financial statements follow the pattern U.S. community banks work under." },
        { type: 'h3', text: 'Does it cost anything?' },
        { type: 'p', text: "No. BankCEO is free and there is no signup. Your saved game stays in your own browser." },
      ],
    },
  ],
};

const STRATEGY_GUIDE = {
  slug: 'strategy-guide',
  path: '/game/strategy-guide',
  navLabel: 'Strategy Guide',
  title: 'BankCEO Strategy Guide',
  metaTitle: 'BankCEO Strategy Guide | How to Earn an A+',
  metaDescription:
    "A tested BankCEO strategy guide: the rules that keep your bank alive, how the grade is scored, when to buy back stock, and a step-by-step plan that earns an A.",
  lede:
    "Keeping First Meridian alive for ten years is not hard. Turning it into an A takes a plan. This guide starts with the rules that keep the bank out of trouble, then works up to the funding, fee and buyback decisions that settle the top grades.",
  sections: [
    {
      id: 'five-rules',
      heading: 'Five rules that keep the bank alive',
      blocks: [
        {
          type: 'list',
          items: [
            "**Leave Floor It alone.** Held for a whole game, it failed the bank in 95% of test runs, usually in year six or seven.",
            "**Don't cut deposit rates.** Paying 20 bps under the market never finished above a D in testing. Paying 40 under failed outright more than a third of the time.",
            "**Grow loans and deposits together.** Most failures in testing came from loans outrunning deposits. Bad loans were rarely the cause.",
            "**Keep the provision on Auto.** Holding it low earns warnings, then an enforcement action that costs far more than it ever saved.",
            "**Watch CET1 in the header.** Green means 10% or more. The bank dies at 4.5%.",
          ],
        },
        {
          type: 'note',
          title: 'Where the numbers on this page come from',
          text: "The results quoted here come from running the game's own simulation with fixed strategies, 200 to 400 full games for each one. Every game has a different economy, so read them as typical outcomes. Yours may land above or below.",
        },
        { type: 'p', text: "The yardstick for everything else on this page is the bank that does nothing. With every control left where it starts, the bank survived all 400 test games. It finished with a B in about 70% of them and an A in 20%, with a typical total return of 124%. Any change you make should beat that." },
        { type: 'p', text: "New to the game? [How to Play](/game/how-to-play) explains every control mentioned below." },
      ],
    },
    {
      id: 'the-grade',
      heading: 'What the grade rewards',
      blocks: [
        { type: 'p', text: "Your grade is based on total shareholder return: the gain in [book value per share](/metrics/book-value-per-share) plus the dividends paid per share, measured against the $16.00 the bank starts with. The share price is not in the formula." },
        { type: 'p', text: "If you keep the dividend at its starting $0.18 a quarter, you will pay out $7.20 a share over ten years. That leaves these targets for book value at the end:" },
        {
          type: 'table',
          head: ['Grade', 'Total return needed', 'Ending book value per share, with the $0.18 dividend'],
          rows: [
            ['B', 'Above 104%', 'About $25.50'],
            ['A', 'Above 136%', 'About $30.60'],
            ['A+', 'Above 174%', 'About $36.70'],
          ],
        },
        { type: 'p', text: "Four conditions sit on top of the return. Final [CET1](/metrics/cet1-capital-ratio) has to be at least 10% for an A+, 9% for an A and 8% for a B. The [loan-to-deposit ratio](/metrics/loans-to-deposits) has to end between 0.65 and 1.15, and at 0.75 or higher for an A+. Customer satisfaction has to end at 50 or better. And the bank must not finish under a reserve enforcement order. Miss the capital level and you fall to whatever grade your capital supports. Miss any of the others and you lose a full letter." },
        { type: 'h3', text: 'Spare capital earns nothing' },
        { type: 'p', text: "The do-nothing bank ends the game with a CET1 ratio around 17%. The A+ gate is 10%. Those seven points of extra capital are shareholder money sitting idle, and they are the main reason the default bank stalls at a B." },
        { type: 'p', text: "Most of what follows is about putting that capital to work without dropping below the gate: growing the balance sheet, adding fee income, and buying back stock when it is cheap." },
      ],
    },
    {
      id: 'funding',
      heading: 'Loans need deposits',
      blocks: [
        { type: 'p', text: "A loan has to be paid for with something. In BankCEO that something is deposits, and the two do not grow at the same speed without help." },
        { type: 'p', text: "During an expansion, local loan demand grows about 1.5% a quarter and deposits about 1.3%. Set the pace to Push and loans grow about 3% a quarter while deposits stay at 1.3%. Each quarter the gap gets wider. The bank fills it by selling securities, then by borrowing from the FHLB, which costs more than deposits." },
        { type: 'p', text: "The Loan/Deposit ratio on the Overview tab tracks this. It starts at 0.77." },
        {
          type: 'table',
          caption: 'One growth setting held for the whole game, everything else on default',
          head: ['Setting', 'Typical ending Loan/Deposit', 'Games failed', 'Most common grade'],
          rows: [
            ['Match Demand (the default)', '0.91', 'None', 'B'],
            ['Push Growth', '1.62', '9%', 'D or F'],
            ['Floor It', 'Above 2.8', '95%', 'Failed'],
            ['Indirect channel on Modest', '1.63', '3%', 'D'],
            ['Indirect channel on Aggressive', 'Above 2.8', '77%', 'Failed'],
          ],
        },
        { type: 'p', text: "Almost none of these banks was killed by bad loans. The end screen blamed the same thing nearly every time: aggressive loan growth funded by wholesale borrowing." },
        { type: 'h3', text: 'Two ways to bring in deposits' },
        { type: 'p', text: "**Marketing** is the cheaper one early on. At the start of the game, $100,000 a quarter brings in about $4.5 million of new deposits each quarter. Raising the budget to $250,000 brings in about $7.1 million, and the full $500,000 about $9.4 million. The first $100,000 does nearly half the work of the whole budget. The effect also fades as the bank outgrows its local market, down to 15% of its original strength once deposits pass about $680 million." },
        { type: 'p', text: "**Pricing** is stronger and costs more. Paying 20 bps above the market adds about 1.2% to deposit growth every quarter and lifts customer satisfaction. The price is an extra 0.20% of interest on every interest-bearing account you already have, old money as well as new." },
        { type: 'p', text: "Held alone for a whole game, $100,000 of marketing raised the typical total return from 124% to 154%." },
        { type: 'h3', text: 'Too many deposits is its own problem' },
        { type: 'p', text: "Deposits you can't lend go into securities. A bank that paid 40 bps over the market all game ended with loans at just 38% of deposits and an oversized bond portfolio. It failed in about one test game in five, when rates jumped and the bonds lost value. A Loan/Deposit ratio under 0.65 also costs a letter grade at the end." },
        { type: 'p', text: "So steer by the ratio. A simple rule that tested well:" },
        {
          type: 'list',
          items: [
            "Below 0.85: set loans to Push and turn marketing off.",
            "From 0.85 to 0.97: stay on Push, with $100,000 of marketing.",
            "Above 0.97: go back to Match Demand and raise marketing to $250,000.",
          ],
        },
        { type: 'p', text: "Check it every quarter. It takes a few seconds, and it is the habit that matters most in this game." },
      ],
    },
    {
      id: 'fee-income',
      heading: 'Fee income: the easy points',
      blocks: [
        { type: 'p', text: "Interest is not the only way the bank earns. Four controls on the Operations tab add [fee income](/insights/fee-income), and they ask for little in return." },
        { type: 'h3', text: 'SBA Gain-on-Sale' },
        { type: 'p', text: "Set to 30%, the bank sells a slice of each quarter's new small-business loans for an upfront gain of 8% of the amount sold. It only earns when the loan book is growing, so it pairs well with Push. It also slows the growth of loans kept on the books, which eases the funding gap described above." },
        { type: 'p', text: "In a growth plan this was the most valuable of the four. Taking it out of an otherwise identical A-grade plan cut the typical total return by about 30 points. Taking out the mortgage program cost about 10." },
        { type: 'h3', text: 'Mortgage Banking Program' },
        { type: 'p', text: "Each step costs $60,000 a quarter in staff and earns a base of $80,000, so the program makes money in a normal quarter at any size. The gain swings with interest rates. When the Fed cuts, refinancing surges and the gain rises by half or more. In a quarter with a large rate hike it can shrink below the fixed cost." },
        { type: 'p', text: "Over a full game, running it at Full beat leaving it off. It pays best in a recession, which is when the rest of the bank is hurting. The [mortgage banking article](/insights/fee-income/mortgage-banking-income) explains why real banks see the same pattern." },
        { type: 'h3', text: 'Overdraft and maintenance fees' },
        { type: 'p', text: "The overdraft fee starts at $25 and the maintenance fee at $10. Each has a point where the easy money ends." },
        { type: 'p', text: "For overdrafts that point is $30. Above it, customers start opting out, so each extra dollar brings in less. Hold it above $30 for four straight quarters and the bank is also exposed to an inquiry every quarter after that: a 2.5% chance per quarter for each dollar over $30, a one-time charge between about $230,000 and $650,000, and six quarters of depressed satisfaction." },
        { type: 'p', text: "For maintenance the point is $12. Past that, customers find ways to qualify for the waiver. Revenue creeps up until about $18 and then falls." },
        { type: 'p', text: "Raising the two fees to $30 and $12 costs about one and a half points of satisfaction. In testing it lifted the typical return from 124% to 131% with no added risk." },
        { type: 'p', text: "Going the other way is expensive. With both fees at zero, satisfaction climbed into the 70s and the typical return dropped to 91%, a C." },
      ],
    },
    {
      id: 'credit',
      heading: 'Credit risk and the loss pipeline',
      blocks: [
        { type: 'p', text: "A loan made on easy terms looks fine on the day it is made. The trouble shows up later. In BankCEO, later means four to eight quarters, with the worst of it about a year and a half after the loan was written." },
        { type: 'p', text: "Two things feed future losses: pace (Push or Floor It) and loose underwriting (Easy or Loose). Loose underwriting is the heavier of the two. Both register right away on the Latent Credit Risk gauge, long before they reach the [NPL ratio](/metrics/non-performing-loans-ratio) in the header." },
        { type: 'p', text: "The cycle decides how fast those embedded losses come out. In an expansion about 5% of the stored risk surfaces each quarter. In a recession it is 25%, and the losses coming through from loosely written loans are 60% larger on top of that. A bank that looks clean at the peak can have an ugly year once the recession starts." },
        { type: 'h3', text: 'Underwriting changes less than you would expect' },
        {
          type: 'table',
          caption: 'One underwriting setting held for the whole game',
          head: ['Underwriting', 'Typical total return', 'Ending Loan/Deposit'],
          rows: [
            ['Strict', '117%', '0.66'],
            ['Tight', '120%', '0.77'],
            ['Standard', '124%', '0.91'],
            ['Easy', '123%', '1.06'],
            ['Loose', '116%', '1.23'],
          ],
        },
        { type: 'p', text: "Standard is the best all-round setting. Tight and Strict give up loan growth, Easy and Loose buy growth and pay for it later, and none of them moves the final score much. The slider is more useful for steering: go Tight for a few quarters when the risk gauge reads Elevated or the Loan/Deposit ratio is running hot." },
        { type: 'p', text: "The game's own late-cycle message tells you to tighten underwriting and build reserves. That is sound banking and it does lower losses. In testing it barely moved the final grade for a bank that was already well capitalized. What sinks banks in a recession is arriving there with thin capital and a stretched balance sheet." },
        { type: 'h3', text: 'What a recession does' },
        { type: 'p', text: "For the do-nothing bank, a recession typically cut quarterly profit from about $850,000 to a low near $350,000, and in one game out of ten to almost nothing. Non-performing loans peaked around 1.7% of the book. In nine games out of ten CET1 never dipped below 12%. A well-capitalized bank gets through a recession with a couple of bad quarters." },
        { type: 'h3', text: 'Provisions' },
        { type: 'p', text: "Leave the provision on Auto and you will never hear from an examiner about reserves. Auto keeps the allowance at 70% or more of non-performing loans, well clear of the 60% line the annual exam checks, and it is the yardstick every override is measured against." },
        { type: 'p', text: "The override is a smoothing tool. It has two honest uses. In good times you can provide more than the model asks, which builds a cushion above the model's level. In bad times you can provide less for a quarter or two and take the edge off the model's recession spike. If you built a cushion first, drawing it back down costs nothing. If you did not, each under-provided quarter that leaves the allowance below 95% of the model's level is a warning on file." },
        { type: 'p', text: "Neither use adds to the score. In testing, building a cushion through every expansion and spending it in the recession finished about three points behind plain Auto on the default bank and eight behind on the A-grade plan, because money parked in reserves is money missing from book value. Use it to protect a quarter you care about: a capital ratio near a gate, or an exam coming up." },
        { type: 'h3', text: 'Why a low provision is not a strategy' },
        { type: 'p', text: "Reserves you never build stay in equity, so holding the provision down looks like free book value. The game is built to make sure it is not." },
        {
          type: 'list',
          items: [
            "**Warnings.** Two under-provided quarters are tolerated. They stay on file until the allowance is back above 95% of the model's level, then clear one per quarter.",
            "**Enforcement.** The third warning, or an allowance below 60% of the model's level, triggers it. The full shortfall is provided in one quarter, a penalty of the same size is added (at least $500,000), and for eight quarters the override is locked and dividends and buybacks are suspended. A second offence doubles the penalty and a third triples it.",
            "**The grade.** Finish under an enforcement order and you lose a letter. Finish with the allowance below the model's level and the gap comes off book value before the score is worked out, so easing off in the last few quarters gains nothing.",
          ],
        },
        {
          type: 'table',
          caption: 'Provision strategies against Auto, 300 games each',
          head: ['Provision', 'Default bank: typical return', 'Default bank: usual grade', 'A-grade plan: games graded A+'],
          rows: [
            ['Auto all game', '124%', 'B', '60%'],
            ['Zero all game', '95%', 'D', 'None'],
            ['Half the model amount all game', '110%', 'C', 'None'],
            ['Zero until two warnings, then Auto', '124%', 'B', '46%'],
            ['Zero in the last two quarters', '124%', 'B', '56%'],
          ],
        },
        { type: 'p', text: "Holding the provision at zero costs the default bank two letter grades and nearly 30 points of return, and it turns a plan that earns an A+ six times in ten into one that usually earns a C. The cautious versions, stopping after two warnings or easing off only at the end, gain nothing on the default bank and lose ground on the A-grade plan." },
        { type: 'p', text: "The Treasury tab shows where you stand before you commit. The Reserve Adequacy box gives the allowance as a share of the model's level and the warnings on file, and it turns red if the setting on the dial would trigger an enforcement action next quarter." },
      ],
    },
    {
      id: 'capital',
      heading: 'Dividends and buybacks',
      blocks: [
        { type: 'p', text: "Profit can stay in the bank, go out as a dividend, or be spent buying back shares. The score treats the first two almost the same: a dollar paid out is a dollar of return, and a dollar kept is a dollar of book value." },
        { type: 'p', text: "Testing bears that out. Paying no dividend, the default $0.18, or $0.30 a quarter gave typical returns of 130%, 124% and 121%. Retaining a little more helps a little. The dividend's real job is controlling how much capital piles up." },
        { type: 'h3', text: 'Buybacks below book value' },
        { type: 'p', text: "Buybacks are different, and timed right they are the single most valuable move in the game. Buying a share for less than its book value raises the book value of every share that is left. Buying above book value lowers it." },
        { type: 'p', text: "Under the repurchase slider, the Treasury tab shows the estimated share price next to book value per share (BVPS). The whole decision is comparing those two numbers." },
        { type: 'p', text: "The price is book value times a multiple, the same idea as the [price-to-book ratio](/metrics/price-to-book) investors use on real banks. The multiple depends first on return on equity:" },
        {
          type: 'table',
          head: ['Return on equity', 'Multiple of book value'],
          rows: [
            ['Negative', '0.50'],
            ['Under 3%', '0.65'],
            ['3% to 6%', '0.75'],
            ['6% to 9%', '0.95'],
            ['9% to 12%', '1.15'],
            ['12% to 15%', '1.40'],
            ['Above 15%', '1.65'],
          ],
        },
        { type: 'p', text: "Then the cycle adjusts it: times 1.05 in an expansion, 0.88 in late cycle, 0.70 in a recession and 0.85 in a recovery. High problem loans, CET1 under 9% and large bond losses each knock it down further." },
        { type: 'p', text: "Take a bank earning an 11% return on equity. In an expansion it trades at about 1.21 times book, so a buyback there destroys value. In a recession the same bank trades around 0.80 times book, and every dollar spent on buybacks retires about $1.25 of book value." },
        { type: 'p', text: "Tested alone, with nothing else changed from the defaults, one rule raised the typical return from 124% to 166% and produced an A or A+ in nearly nine games out of ten: buy back the maximum whenever the price is below book value and CET1 is above 12%." },
        { type: 'h3', text: 'The capacity limit' },
        { type: 'p', text: "You cannot hand back more than about a year of profit in any one quarter, and dividends are served first. Asking for $5 million of buybacks will usually get you less. The Distribution Capacity bar shows how much is fundable." },
        { type: 'p', text: "A lower dividend leaves more room for buybacks, and in testing that trade was worth making. The full plan at the end of this guide scored higher with a $0.10 dividend than with $0.18, and higher again with none." },
        { type: 'p', text: "Two housekeeping points. The repurchase slider resets to zero after every quarter, so set it again each turn while the window is open. And keep CET1 comfortably above 10%, because the same recession that makes the stock cheap is also raising your loan losses." },
        { type: 'h3', text: 'Raising capital' },
        { type: 'p', text: "Equity issuance is the emergency exit. It costs a 5% fee, and a bank that needs it is almost always trading below book, which means selling shares for less than they are worth on paper. Use it only when the alternative is failure." },
        { type: 'p', text: "Subordinated debt will not save a bank either. It raises the total capital ratio but leaves CET1 and Tier 1 leverage, the two ratios that end the game, where they were. The [difference between the capital ratios](/faq/cet1-vs-tier1-vs-total-capital) is worth a read if that surprises you." },
      ],
    },
    {
      id: 'rates',
      heading: 'Interest rates, bonds and cash',
      blocks: [
        { type: 'p', text: "When interest rates rise, bonds bought at the old, lower rates are worth less. The longer the bond, the bigger the drop." },
        { type: 'p', text: "In BankCEO that loss counts against capital straight away for the part of the portfolio classed as available for sale, which starts at $55 million. At the 7-year setting, a one-point rise in the 10-year Treasury yield costs about $3.9 million, or 12% of the bank's starting equity. At the 1-year setting the same move costs about $550,000. On the Call Report these unrealized losses appear as [AOCI](/faq/what-is-aoci)." },
        { type: 'p', text: "Longer bonds do pay more: roughly 0.20% of extra yield for each step on the slider. In testing the extra income did not cover the damage." },
        {
          type: 'table',
          caption: 'One duration setting held for the whole game',
          head: ['Securities duration', 'Typical total return'],
          rows: [
            ['1 year', '127%'],
            ['3 years (the default)', '124%'],
            ['5 years', '120%'],
            ['7+ years', '113%'],
          ],
        },
        { type: 'p', text: "Rates drift up through expansion and late cycle, which is most of the game, and a Rate Shock event turned up two or three times per game on average. Short duration is the safer default." },
        { type: 'p', text: "There is one refinement. Rates fall fast in a recession, about a point a quarter, and bond prices rise when rates fall. Switching to 7+ years when the recession is declared and back to 1 year when recovery begins added a few points in testing. Extending earlier, during late cycle, made results worse. The article on [duration and rate sensitivity](/insights/interest-rate-risk/duration-gap-analysis) covers the idea behind this." },
        { type: 'h3', text: 'Liquidity' },
        { type: 'p', text: "The liquidity target sets how much cash the bank keeps, from 2.5% of assets on Lean up to 10% on Fortress. Cash earns the Fed funds rate, so holding more of it costs little and holding less gains little. Across the four settings the typical return moved only from 126% on Lean to 121% on Fortress." },
        { type: 'p', text: "Liquidity matters when something goes wrong. A Deposit Flight event pulls about 8% of deposits out in a single quarter, and it showed up once or twice in a typical game. A bank with a normal bond portfolio sells securities and carries on. A bank that has lent out nearly everything has to borrow, and examiners cite on-hand liquidity (cash plus sellable securities) below 6% of assets." },
        { type: 'p', text: "Keeping the Loan/Deposit ratio under 1.0 does more for liquidity than the slider does." },
      ],
    },
    {
      id: 'cycle',
      heading: 'Playing the cycle',
      blocks: [
        { type: 'p', text: "The four phases always come in the same order, and each one changes the numbers the bank lives on." },
        {
          type: 'table',
          caption: 'What each phase does, before your own decisions',
          head: ['', 'Expansion', 'Late cycle', 'Recession', 'Recovery'],
          rows: [
            ['Loan demand, per quarter', '+1.5%', '+1.0%', '−0.25%', '+0.75%'],
            ['Deposit growth, per quarter', '+1.3%', '+0.5%', '−0.5%', '+0.8%'],
            ['New problem loans, yearly rate', '0.4%', '0.7%', '1.8%', '1.0%'],
            ['Fed funds rate, per quarter', 'Up about 0.15 pts', 'Up about 0.25 pts', 'Down about 1 pt', 'Down about 0.3 pts'],
            ['Share price multiple', '× 1.05', '× 0.88', '× 0.70', '× 0.85'],
          ],
        },
        { type: 'p', text: "Every game opens in expansion, which lasts at least two years. The first late-cycle warning usually arrives in year three, sometimes year four, and the first recession most often in year four, five or six. Recessions are short: two to five quarters in most games. About one game in four gets a second recession before year ten." },
        { type: 'h3', text: 'What to do in each phase' },
        {
          type: 'list',
          items: [
            "**Expansion.** Grow. Push loans as far as deposits allow, keep SBA sales and the mortgage program running, and let capital build. The stock usually trades at or above book here, so hold off on buybacks.",
            "**Late cycle.** Deposit growth slows to less than half its expansion pace while loan demand holds up, so the Loan/Deposit ratio climbs faster than before. Check the risk gauge. The price multiple drops, and for a bank earning under about 9% on equity the stock slips below book.",
            "**Recession.** Loan demand turns negative, deposits shrink and problem loans form at more than four times the expansion rate. This is also when the stock is cheapest and mortgage income is strongest. If CET1 is healthy, buy back every quarter. A Regional Credit Shock has about a one-in-five chance of hitting in each recession quarter, so leave a few points of capital in reserve.",
            "**Recovery.** Losses are still running above normal and rates are low. The stock is still discounted, so buybacks often remain worthwhile. Return to growth as demand comes back.",
          ],
        },
        { type: 'p', text: "Real bank stocks follow a similar rhythm, which is the subject of [how the credit cycle affects bank stocks](/faq/credit-cycle-and-bank-stocks)." },
      ],
    },
    {
      id: 'a-plan',
      heading: 'A plan that earns an A',
      blocks: [
        { type: 'p', text: "Here is one complete plan, tested over 300 games. It never failed. It earned an A+ in 60% of them and an A in nearly all the rest." },
        { type: 'h3', text: 'Quarter one' },
        {
          type: 'steps',
          items: [
            "On Operations, set Loan Origination Pace to **Push**. Leave Underwriting on Standard.",
            "Set SBA Gain-on-Sale to **30%** and Mortgage Banking to **Full**.",
            "Set the Overdraft Fee to **$30** and the Monthly Maintenance Fee to **$12**.",
            "On Treasury, set Securities Portfolio Duration to **1y**.",
            "Leave everything else alone and press Run.",
          ],
        },
        { type: 'h3', text: 'Every quarter after that' },
        {
          type: 'steps',
          items: [
            "Read the Loan/Deposit ratio on the Overview tab. Under 0.85: Push, marketing off. From 0.85 to 0.97: Push, marketing at $100K. Over 0.97: Match Demand, marketing at $250K.",
            "Open Treasury and compare the estimated price with BVPS under the repurchase slider. If the price is lower and CET1 is above 12%, slide the repurchase to its maximum. Otherwise leave it at zero.",
            "Press Run.",
          ],
        },
        { type: 'p', text: "That is the entire plan. It never touches underwriting, deposit pricing, the liquidity target, wholesale borrowing or the provision." },
        { type: 'h3', text: 'Variations' },
        {
          type: 'table',
          caption: 'The same plan with one thing changed, 300 games each',
          head: ['Change', 'Typical total return', 'Games graded A+'],
          rows: [
            ['The plan as written', '179%', '60%'],
            ['Dividend cut to $0.10', '196%', '91%'],
            ['Dividend cut to zero', '222%', '99%'],
            ['No buybacks', '151%', '4%'],
            ['Securities at 3 years', '171%', '44%'],
            ['Overdraft fee at $45', '166%', '33%'],
          ],
        },
        { type: 'p', text: "Most of the gap between an A and an A+ is buybacks. Without them the same plan is a solid A and almost never an A+. Cutting the dividend helps because it frees capacity for those buybacks. Pushing the overdraft fee to its maximum made things worse once the inquiries and lost satisfaction were counted." },
        { type: 'p', text: "This is one route among many. Deposit pricing, the indirect channel and wholesale funding all have uses the plan ignores, and part of the fun is finding a better mix." },
      ],
    },
    {
      id: 'failures',
      heading: 'How banks die',
      blocks: [
        { type: 'p', text: "When the bank fails, the end screen gives a root cause. Each one traces back to decisions made much earlier." },
        {
          type: 'table',
          head: ['Root cause on the end screen', 'How it usually happens', 'How to avoid it'],
          rows: [
            ['Aggressive loan growth funded by wholesale borrowing', 'Push, Floor It or the indirect channel left on while deposits lagged, or deposit rates cut below the market', 'Keep Loan/Deposit under 1.0. Pair loan growth with marketing or better deposit rates.'],
            ['Severe AOCI losses from interest rate risk', 'A large bond portfolio at long duration when rates jumped, often after gathering far more deposits than the bank could lend', "Keep duration short. Don't let Loan/Deposit sink toward 0.5."],
            ['Asset quality deterioration', 'Loose underwriting and fast growth late in an expansion, followed by a recession', 'Watch the Latent Credit Risk gauge and stay out of Critical.'],
            ['Excessive capital distributions', 'Large buybacks or dividends while earnings were falling', 'Stop buying back stock as CET1 nears 10%.'],
          ],
        },
        { type: 'p', text: "The first was by far the most common in testing, and it is slow. A bank on Floor It looks healthy for about two years: profits hold up and the Loan/Deposit ratio is still under 1.0. Then the securities run out, FHLB borrowing starts, the margin shrinks, and CET1 slides a little every quarter until the bank fails around year six or seven. By the time the header turns red, the damage is years old." },
        { type: 'p', text: "Cutting deposit rates follows the same script even more quietly. The margin and profits improve for two or three years, which feels like a win, before deposits have drained far enough for borrowing costs to take over." },
        { type: 'p', text: "The early signs are on the Overview tab: Loan/Deposit climbing past 1.0, Liquidity falling toward 6%, and a Wholesale Funding line that is no longer zero. The article on [early warning signs in real bank failures](/insights/banking-crises/early-warning-signs) lists many of the same signals." },
      ],
    },
    {
      id: 'mistakes',
      heading: 'Mistakes worth avoiding',
      blocks: [
        {
          type: 'list',
          items: [
            "**Cutting deposit rates to lift the margin.** It works for a while, and then expensive borrowing replaces the deposits that left.",
            "**Finishing with too much capital.** A 17% CET1 at the end scores no better than 10%, and the difference is money that could have gone back to shareholders.",
            "**Buying back stock in an expansion because capital is high.** If the price is above book value, wait.",
            "**Setting Push and forgetting it.** Growth needs a funding check every quarter.",
            "**Nudging the overdraft fee to $31 or $32.** The gain is tiny and it starts the regulatory clock.",
            "**Forgetting that buybacks reset.** The slider is back at zero after every run.",
            "**Leaning on the provision override.** Two soft quarters are forgiven. The third brings a penalty, a locked override and eight quarters without buybacks.",
            "**Gathering deposits with no plan for them.** Marketing and premium pricing with loans on Match Demand push the Loan/Deposit ratio toward the 0.65 floor.",
          ],
        },
      ],
    },
  ],
};

export const GAME_GUIDES = [HOW_TO_PLAY, STRATEGY_GUIDE];

export const GAME_GUIDES_BY_SLUG = Object.fromEntries(GAME_GUIDES.map((guide) => [guide.slug, guide]));

// =====================================================================
// BankCEO engine — pure simulation, no React.
// All mechanics preserved verbatim from the original source.
// Attached to window.BankEngine for the UI to consume.
// =====================================================================
(function () {
  // ---------- helpers ----------
  const fmt$ = (n) => {
    if (n === null || n === undefined || isNaN(n)) return "—";
    const abs = Math.abs(n);
    const sign = n < 0 ? "-" : "";
    if (abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(2)}B`;
    if (abs >= 1_000) return `${sign}$${(abs / 1_000).toFixed(2)}M`;
    return `${sign}$${abs.toFixed(0)}K`;
  };
  const fmtPct = (n, d = 2) =>
    n === null || n === undefined || isNaN(n) ? "—" : `${(n * 100).toFixed(d)}%`;
  const fmtBps = (n) => `${(n * 10000).toFixed(0)} bps`;
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const noise = (runSeed, quarter, channel = 0, scale = 1) => {
    const seed = runSeed * 1009 + quarter * 31 + channel * 7;
    const x = Math.sin(seed * 9301 + 49297) * 233280;
    return ((x - Math.floor(x)) - 0.5) * 2 * scale;
  };

  // ---------- macro difficulty ----------
  // Informational scorecard line — does not affect grading. Scored from how much of
  // the run was spent in stress regimes and how many bad-severity events landed.
  const BAD_EVENT_TAGS = ["DEPOSIT FLIGHT","REGIONAL CREDIT SHOCK","RATE SHOCK","FRAUD LOSS"];
  function macroDifficultyFor(s) {
    const recessionQtrs = s.history.filter(h => h.cycle === "recession").length;
    const lateCycleQtrs = s.history.filter(h => h.cycle === "late_cycle").length;
    const badEventCount = s.log.filter(l =>
      l.q > 0 && BAD_EVENT_TAGS.some(t => l.msg.startsWith(t))
    ).length;
    const score = recessionQtrs * 2 + lateCycleQtrs * 1 + badEventCount * 2;
    let label = "Easy";
    if (score >= 15) label = "Normal";
    if (score >= 30) label = "Hard";
    if (score >= 50) label = "Brutal";
    return { label, score, recessionQtrs, lateCycleQtrs, badEventCount };
  }

  // ---------- customer satisfaction ----------
  // Single 0-100 score. Target driven by deposit pricing, ad spend, and a Phase-5
  // fee-load slot. Diminishing returns past ±20 pts. State moves toward target
  // with asymmetric hysteresis (~7-qtr half-life rising, ~4-qtr half-life falling).
  function computeSatisfaction(s) {
    const lev = s.levers;
    const pricingPts = (lev.depositPricing || 0) * 5;          // -10..+10
    const adSpend = Math.max(0, lev.depositAdSpend || 0);
    const adPts = adSpend > 0 ? 2 * Math.log(1 + adSpend / 100) / Math.log(6) : 0; // 0..+2 (small, primarily an acquisition tool)
    const feePts = s.feeLoadPts || 0;                          // Phase-5 stub, currently 0

    let sumPts = pricingPts + adPts + feePts;
    // Diminishing returns on the upside only — you can only make customers so happy.
    // On the downside each grievance compounds without relief.
    if (sumPts > 20) sumPts = 20 + (sumPts - 20) * 0.5;
    // Compounding bad-management penalty: cheap pricing + punitive fees synergize
    // (customers feel nickel-and-dimed AND underpaid simultaneously).
    if (pricingPts < -5 && feePts < -5) sumPts -= 7;

    const target = clamp(65 + sumPts, 0, 100);
    return { target, pricingPts, adPts, feePts };
  }
  function applySatisfactionHysteresis(cur, target) {
    const c = cur == null ? 65 : cur;
    const delta = target - c;
    const speed = delta >= 0 ? 1 / 8 : 1 / 5; // rising slow, falling fast
    return clamp(c + delta * speed, 0, 100);
  }
  // Fee structure (Phase 5). Account count proxy from transaction-account deposits.
  // Avg balance per account ~$6.5K (community-bank typical). Overdraft incidents at
  // 0.25/acct/qtr in baseline cycle, more in recession. Interchange a passive 4bps/qtr
  // on transaction deposits — community banks under $10B keep the full Durbin amount.
  function computeFeeIncome(s) {
    const d = s.bs.deposits;
    const txnDeposits = d.noninterest + d.interestChecking + d.savingsMM;   // $K
    // Avg balance per account ~$6,500. Express accounts in THOUSANDS so dollar-per-account
    // math lands directly in $K.
    const accountsK = Math.max(0.001, txnDeposits / 6500);
    // Incidence calibrated so service charges land near 0.25-0.30% of assets annually
    // (FFIEC community-bank norm). Fees are a meaningful but secondary earnings stream,
    // not a substitute for spread income.
    let incidentsPerAcct = 0.14;
    if (s.macro.cycle === "recession") incidentsPerAcct = 0.18;
    if (s.macro.cycle === "late_cycle") incidentsPerAcct = 0.16;

    const ofFee = Math.max(0, s.levers.overdraftFee || 0);
    const overdraftIncidentsK = accountsK * incidentsPerAcct;
    // Overdraft elasticity: very high fees drive opt-outs / account closures, dampening volume.
    const ofVolumeMult = ofFee > 30 ? Math.max(0.55, 1 - (ofFee - 30) * 0.012) : 1.0;
    const overdraftIncome = overdraftIncidentsK * ofFee * ofVolumeMult;     // K-incidents * $/incident = $K

    const monthlyFee = Math.max(0, s.levers.monthlyMaintenance || 0);
    // Roughly 12% of accounts pay maintenance (the rest meet waiver minimums via
    // direct deposit / minimum balance). Higher fee -> waiver shopping.
    const payShare = monthlyFee > 12 ? Math.max(0.05, 0.12 - (monthlyFee - 12) * 0.005) : 0.12;
    const maintenanceIncome = accountsK * payShare * monthlyFee * 3;        // $K

    const interchangeRate = 0.0004;                                          // 4bps/qtr on txn deposits
    const interchangeIncome = txnDeposits * interchangeRate;                 // $K

    return {
      accountsK, overdraftIncidentsK,
      overdraftIncome, maintenanceIncome, interchangeIncome,
      serviceCharges: overdraftIncome + maintenanceIncome,
      totalPhase5: overdraftIncome + maintenanceIncome + interchangeIncome,
    };
  }
  // Translate fees into satisfaction pts — a TWO-SIDED lever. Above the customer-tolerated
  // threshold ($20 overdraft / $5 maintenance) fees nickel-and-dime and drag satisfaction
  // down (penalty side unchanged from the original calibration). Below it, genuinely
  // customer-friendly pricing actively LIFTS satisfaction, and the lower the fee the
  // stronger the lift. Overdraft carries more weight than maintenance in both directions —
  // it is the fee customers and regulators watch most. Range roughly +8 (fees at zero) to
  // -11 (fees maxed). Default levers ($25 / $10) still net to -2, so the baseline is intact.
  function computeFeeLoadPts(s) {
    const ofFee = Math.max(0, s.levers.overdraftFee || 0);
    const monthlyFee = Math.max(0, s.levers.monthlyMaintenance || 0);
    const ofPts = ofFee >= 20
      ? -Math.min(7, (ofFee - 20) * 0.20)   // $30 -> -2, $45 -> -5, $55 -> -7 (unchanged)
      :  Math.min(5, (20 - ofFee) * 0.25);  // $10 -> +2.5, $0 -> +5 (customer-friendly)
    const mntPts = monthlyFee >= 5
      ? -Math.min(4, (monthlyFee - 5) * 0.20)  // $10 -> -1, $20 -> -3, $25 -> -4 (unchanged)
      :  Math.min(3, (5 - monthlyFee) * 0.60); // $2 -> +1.8, $0 -> +3 (customer-friendly)
    return ofPts + mntPts;
  }

  // Retention multiplier on organic deposit growth (piecewise linear).
  function retentionMult(sat) {
    const pts = [
      [0, 0.50], [20, 0.55], [35, 0.72], [50, 0.88], [60, 0.96],
      [65, 1.00], [70, 1.012], [75, 1.025], [80, 1.04], [85, 1.052], [100, 1.060],
    ];
    if (sat <= 0) return 0.50;
    for (let i = 0; i < pts.length - 1; i++) {
      const [x1, y1] = pts[i], [x2, y2] = pts[i + 1];
      if (sat >= x1 && sat <= x2) return y1 + (y2 - y1) * (sat - x1) / (x2 - x1);
    }
    return 1.060;
  }

  // ---------- initial state ----------
  const INITIAL_STATE = {
    quarter: 1,
    gameOver: null,
    runSeed: Math.floor(Math.random() * 100000),

    macro: {
      fedFunds: 0.045,
      treasury10y: 0.042,
      unemployment: 0.041,
      gdpGrowth: 0.022,
      cycle: "expansion",
      cycleQuarters: 0,
    },

    bs: {
      cash: 18_000,
      securitiesAFS: 55_000,
      securitiesHTM: 25_000,
      aoci: -1_200,
      loansGross: 231_710,
      acl: 2_710,
      npl: 1_738,
      premises: 4_500,
      otherAssets: 3_500,

      deposits: {
        noninterest: 75_000,
        interestChecking: 60_000,
        savingsMM: 95_000,
        timeDeposits: 70_000,
      },
      borrowingsFHLB: 0,
      brokeredCDs: 0,
      subDebt: 0,
      subDebtAvgCost: 0,
      otherLiab: 3_000,

      commonEquity: 25_000,
      retainedEarnings: 8_200,
      sharesOutstanding: 2_000,

      loansIndirect: 0,
      // Weighted-average yield actually carried on the loan book (a stock, not a spot
      // rate) — new production and floating-rate resets move it gradually.
      loanBookYield: 0.0533,
    },

    lastIS: {
      interestIncome: 4_212,
      interestExpense: 1_431,
      nii: 2_781,
      provision: 198,
      nonintIncome: 603,
      nonintExpense: 2_352,
      nonintExpenseFixed: 403,
      nonintExpenseVariable: 1_949,
      pretax: 834,
      tax: 175,
      netIncome: 659,
      dividendsPaid: 360,
      repurchases: 0,
      netChargeOffs: 148,
      grossChargeOffs: 174,
      nplDelta: 0,
      avgLoans: 231_710,
      avgSecurities: 80_000,
      avgDeposits: 300_000,
      loanYield: 0.0533,
      depCost: 0.0191,
      sbaGain: 0,
      sbaSold: 0,
      mortGain: 0,
      mortFixedCost: 0,
      depositAdSpend: 0,
      brokeredCDInterest: 0,
      vintageNplAdj: 0,
      overdraftIncome: 0,
      maintenanceIncome: 0,
      interchangeIncome: 0,
      serviceCharges: 0,
      accountCountK: 0,
      uncoveredChargeOffs: 0,
      reserveShortfallFee: 0,
      examFee: 0,
      provisionCatchUp: false,
    },

    levers: {
      loanGrowth: 0,
      underwriting: 0,
      depositPricing: 0,
      securitiesDuration: 1,
      liquidityTarget: 1,
      sbaSalePct: 0,
      mortgageProgram: 0,
      depositAdSpend: 0,
      indirectShare: 0,
      overdraftFee: 25,
      monthlyMaintenance: 10,
    },

    decisions: {
      dividendPerShare: 0.18,
      repurchaseAmount: 0,
      equityIssuance: 0,
      fhlbAdvance: 0,
      subDebtIssuance: 0,
      brokeredCDsTarget: 0,
      provisionOverride: null,
    },

    creditRiskBank: 0,
    loanVintages: [],
    satisfaction: 65,
    feeLoadPts: 0,
    overdraftHistory: [],
    cfpbConsent: null,
    history: [],
    log: [
      { q: 0, type: "system", msg: "Welcome to First Meridian Bank, NA. You are CEO of a single-branch community bank. Make it through 40 quarters without failing." },
    ],
    pendingEvent: null,
    lastForecast: null,
  };

  // ---------- core simulation ----------
  function runQuarter(state, opts = {}) {
    const { forecastMode = false } = opts;
    const s = JSON.parse(JSON.stringify(state));
    const q = s.quarter;
    const log = [];

    const prevFedFunds = s.macro.fedFunds;
    const prev10y = s.macro.treasury10y;

    const macroChange = evolveMacro(s, q);

    if (!forecastMode && macroChange.cycleChanged) {
      const cycleNames = {
        expansion: "EXPANSION", late_cycle: "LATE CYCLE",
        recession: "RECESSION", recovery: "RECOVERY",
      };
      const cycleType = {
        expansion: "good", late_cycle: "warn",
        recession: "bad", recovery: "warn",
      }[s.macro.cycle];
      const cycleMsg = {
        expansion: "ECONOMIC EXPANSION: GDP accelerating, unemployment trending down. Loan demand should strengthen.",
        late_cycle: "LATE CYCLE: Growth decelerating, credit spreads widening. Tighten underwriting and build reserves.",
        recession: "RECESSION DECLARED: NBER confirmed contraction. Expect rising NCOs, deposit pressure, AOCI volatility.",
        recovery: "RECOVERY: Economy stabilizing off the bottom. Credit losses peaking but normalizing. Asset prices recovering.",
      }[s.macro.cycle];
      log.push({ q, type: cycleType, msg: `${cycleNames[s.macro.cycle]} — ${cycleMsg}` });
    }

    const dFedFunds = s.macro.fedFunds - prevFedFunds;
    if (!forecastMode && Math.abs(dFedFunds) >= 0.005) {
      const direction = dFedFunds > 0 ? "RAISES" : "CUTS";
      const bps = Math.abs(dFedFunds * 10000).toFixed(0);
      log.push({
        q, type: "info",
        msg: `FOMC ${direction} rates ${bps} bps to ${fmtPct(s.macro.fedFunds, 2)}. UST 10Y at ${fmtPct(s.macro.treasury10y, 2)}.`,
      });
    }

    // Track overdraft-fee history (rolling) for CFPB-inquiry trigger.
    if (!s.overdraftHistory) s.overdraftHistory = [];
    s.overdraftHistory.push(Math.max(0, s.levers.overdraftFee || 0));
    if (s.overdraftHistory.length > 8) s.overdraftHistory.shift();

    // Tick down active CFPB consent order.
    if (s.cfpbConsent && s.cfpbConsent.qtrsLeft > 0) {
      s.cfpbConsent.qtrsLeft -= 1;
      if (s.cfpbConsent.qtrsLeft === 0) {
        s.cfpbConsent = null;
        if (!forecastMode) log.push({ q, type: "good", msg: "CFPB CONSENT ORDER LIFTED: reputational drag rolled off." });
      }
    }

    const event = (forecastMode || q === 1) ? null : maybeEvent(s, q);
    if (event) log.push({ q, type: event.severity, msg: event.msg });

    // CFPB inquiry: probability-weighted when overdraft sustained > $30 for 4+ qtrs.
    let cfpbEvent = null;
    if (!forecastMode && !s.cfpbConsent && s.overdraftHistory.length >= 4) {
      const last4 = s.overdraftHistory.slice(-4);
      const sustained = last4.every(f => f > 30);
      if (sustained) {
        const r = Math.abs(noise(s.runSeed, q, 22));
        const avg = last4.reduce((a, b) => a + b, 0) / 4;
        const triggerProb = Math.min(0.40, (avg - 30) * 0.025);
        if (r < triggerProb) {
          const oneTime = 200 + Math.round((avg - 30) * 30);            // $200-$650K consent order
          cfpbEvent = { oneTime, qtrsActive: 6 };
          s.cfpbConsent = { qtrsLeft: 6, openedAt: q };
          log.push({ q, type: "bad", msg: `CFPB INQUIRY: regulator opened consent-order proceeding citing overdraft practices averaging $${avg.toFixed(0)}/item. One-time charge ${fmt$(oneTime)} hits nonint. expense; reputational drag on satisfaction for 6 quarters.` });
        }
      }
    }
    // Annual regulatory exam — Year 2 onward. Scheduled (not a random event slot),
    // so it can co-occur with other events. Assessed against opening-quarter ratios.
    let examOutcome = null;
    if (!forecastMode && q > 4 && q % 4 === 0) {
      examOutcome = assessExam(s, computeRatios(s, s.lastIS), q);
      log.push({ q, type: examOutcome.type, msg: examOutcome.msg });
    }

    const suppressNoise = forecastMode || q === 1;
    const nf = suppressNoise ? {
      depositGrowth: 0, loanGrowth: 0, nplFormation: 0,
      nonintIncome: 0, nonintExpense: 0,
    } : {
      depositGrowth: noise(s.runSeed, q, 10, 0.15),
      loanGrowth: noise(s.runSeed, q, 11, 0.15),
      nplFormation: noise(s.runSeed, q, 12, 0.30),
      nonintIncome: noise(s.runSeed, q, 13, 0.06),
      nonintExpense: noise(s.runSeed, q, 14, 0.03),
    };

    // Phase 5 fee-load pts feed Phase 4 satisfaction target.
    // Refresh from current lever positions each quarter.
    s.feeLoadPts = computeFeeLoadPts(s);
    // Active CFPB consent order applies an additional sat penalty for its duration.
    if (s.cfpbConsent && s.cfpbConsent.qtrsLeft > 0) {
      s.feeLoadPts -= 6;
    }

    // Customer satisfaction — driven by pricing, ad spend, and fee load.
    // Updates with asymmetric hysteresis BEFORE deposits compute, so today's lever
    // changes immediately influence retention this quarter.
    const satBefore = s.satisfaction;
    const satInfo = computeSatisfaction(s);
    s.satisfaction = applySatisfactionHysteresis(s.satisfaction, satInfo.target);

    const deposits = computeDeposits(s, event, nf);
    const loans = computeLoans(s, event, nf, prev10y);
    const securities = computeSecurities(s, event, prevFedFunds, prev10y);
    const is = computeIncome(s, deposits, loans, securities, event, nf, prevFedFunds);
    if (cfpbEvent) {
      is.nonintExpense += cfpbEvent.oneTime;
      is.nonintExpenseVariable = (is.nonintExpenseVariable || 0) + cfpbEvent.oneTime;
      is.cfpbCharge = cfpbEvent.oneTime;
      is.pretax -= cfpbEvent.oneTime;
      retax(s, is);
    }
    if (examOutcome && examOutcome.fee > 0) {
      is.nonintExpense += examOutcome.fee;
      is.nonintExpenseVariable = (is.nonintExpenseVariable || 0) + examOutcome.fee;
      is.examFee = examOutcome.fee;
      is.pretax -= examOutcome.fee;
      retax(s, is);
    }
    is._nf = nf;
    is._event = event;

    const preActionRatios = computeRatios(s, is);
    applyCapitalActions(s, is, preActionRatios);
    applyBalanceSheet(s, deposits, loans, securities, is);
    const ratios = computeRatios(s, is);
    checkRegulatory(s, ratios, log);

    // Capital-action constraint announcements.
    if (!forecastMode) {
      if ((is._divCut || 0) > 0.5 || (is._buybackCut || 0) > 0.5) {
        const pf = is._distPayoutFactor;
        const why = pf < 1
          ? `the capital conservation buffer capped the payout ratio at ${(pf * 100).toFixed(0)}% of eligible retained income`
          : `distributions draw on eligible retained income — roughly a year of earnings — not on the whole balance sheet`;
        const parts = [];
        if ((is._divCut || 0) > 0.5) parts.push(`${fmt$(is._divCut)} of dividends`);
        if ((is._buybackCut || 0) > 0.5) parts.push(`${fmt$(is._buybackCut)} of buybacks`);
        log.push({ q, type: "warn", msg: `DISTRIBUTION LIMITED: ${parts.join(" and ")} could not be paid — ${why}. Dividends are funded first; buybacks draw on what is left.` });
      }
      if ((is._fhlbBlocked || 0) > 0.5) {
        log.push({ q, type: "warn", msg: `FHLB CAPACITY REACHED: the requested advance exceeded your ${fmt$(is._fhlbCapacity)} borrowing line against pledged loans and securities. Only the available balance was drawn.` });
      }
      if ((s._forcedFhlbDraw || 0) > 0) {
        log.push({ q, type: "warn", msg: `LIQUIDITY BACKSTOP: ${fmt$(s._forcedFhlbDraw)} of FHLB advances were drawn automatically to hold the minimum cash position. Wholesale funding costs more than core deposits.` });
        s._forcedFhlbDraw = 0;
      }
      if (s._forcedAfsLossLog) {
        log.push({ q, type: "bad", msg: `SECURITIES SOLD AT A LOSS: ${fmt$(Math.abs(s._forcedAfsLossLog))} of unrealized loss was realized into earnings to raise cash. Underwater AFS is not free liquidity.` });
        s._forcedAfsLossLog = 0;
      }
    }

    // Reserve catch-up + shortfall announcements.
    if (!forecastMode) {
      if (is.provisionCatchUp && !s._wasProvisionCatchUp) {
        log.push({ q, type: "warn", msg: `RESERVE CATCH-UP: ACL/NPL coverage fell below 0.35x — a mandatory provision of ${fmt$(is.provision)} was applied over your override. Below-adequate reserves cannot be sustained.` });
      }
      s._wasProvisionCatchUp = is.provisionCatchUp;
      if (is.uncoveredChargeOffs > 0) {
        log.push({ q, type: "bad", msg: `RESERVE SHORTFALL: charge-offs exceeded the loss allowance by ${fmt$(is.uncoveredChargeOffs)} — the uncovered loss hit earnings and capital directly, and a ${fmt$(is.reserveShortfallFee)} supervisory remediation charge flowed through expenses. Rebuild reserves.` });
      }
    }

    // Satisfaction-driven flight + threshold-crossing announcements.
    if (!forecastMode) {
      if (deposits.satFlightPct < 0) {
        const pct = (deposits.satFlightPct * 100).toFixed(1);
        log.push({ q, type: "warn", msg: `RETENTION SLIPPING: customer satisfaction at ${Math.round(s.satisfaction)} — ${pct}% of deposits walked this quarter chasing better pricing/service.` });
      }
      const wasLowSat = s._wasLowSat === true;
      const isLowSat = s.satisfaction < 50;
      if (isLowSat && !wasLowSat) {
        log.push({ q, type: "warn", msg: `CUSTOMER SATISFACTION LOW: dropped to ${Math.round(s.satisfaction)}. Retention multiplier turning negative; flights possible below 35.` });
      } else if (!isLowSat && wasLowSat && s.satisfaction >= 60) {
        log.push({ q, type: "good", msg: `CUSTOMER SATISFACTION RECOVERED: now at ${Math.round(s.satisfaction)}. Deposit retention back to neutral or better.` });
      }
      s._wasLowSat = isLowSat;
    }

    s.history.push({
      q,
      assets: totalAssets(s.bs),
      loans: s.bs.loansGross,
      deposits: totalDeposits(s.bs.deposits),
      equity: s.bs.commonEquity + s.bs.retainedEarnings + s.bs.aoci,
      netIncome: is.netIncome,
      nim: ratios.nim,
      roa: ratios.roa,
      roe: ratios.roe,
      cet1: ratios.cet1,
      tier1Lev: ratios.tier1Lev,
      nplRatio: ratios.nplRatio,
      ltd: ratios.ltd,
      sharePrice: estimatedSharePrice(s, ratios),
      tbvPerShare: totalEquity(s.bs) / s.bs.sharesOutstanding,
      aoci: s.bs.aoci,
      cycle: s.macro.cycle,
      dividendsPaid: is.dividendsPaid || 0,
      dividendPerShare: s.decisions.dividendPerShare || 0,
      satisfaction: s.satisfaction,
      nonintIncome: is.nonintIncome,
      nonintExpense: is.nonintExpense,
      sharesOutstanding: s.bs.sharesOutstanding,
      eps: is.netIncome / Math.max(1e-6, s.bs.sharesOutstanding),
    });

    // Carryback pool for loss-quarter tax benefits (drawn down when tax is negative).
    s._cumTaxPaid = Math.max(0, (s._cumTaxPaid || 0) + is.tax);

    s.lastIS = is;
    s.quarter = q + 1;
    s.log = [...s.log, ...log].slice(-100);

    s.decisions = {
      dividendPerShare: s.decisions.dividendPerShare,
      repurchaseAmount: 0,
      equityIssuance: 0,
      fhlbAdvance: 0,
      subDebtIssuance: 0,
      brokeredCDsTarget: s.bs.brokeredCDs,
      provisionOverride: null,
    };

    if (s.quarter > 40 && !s.gameOver) {
      const finalEq = totalEquity(s.bs);
      const finalShares = s.bs.sharesOutstanding;
      const finalBVPS = finalEq / finalShares;
      const finalPx = estimatedSharePrice(s, ratios);
      // Derived from the opening balance sheet so it can never drift out of sync with it.
      const initialBVPS = totalEquity(INITIAL_STATE.bs) / INITIAL_STATE.bs.sharesOutstanding;
      const bvpsCAGR = Math.pow(finalBVPS / initialBVPS, 1/10) - 1;
      const annualizedROE = s.history.length > 0
        ? s.history.reduce((sum, h) => sum + h.roe, 0) / s.history.length
        : 0;
      const totalDividendsPaid = s.history.reduce((sum, h) => sum + (h.dividendsPaid || 0), 0);
      const totalDividendsPerShare = s.history.reduce((sum, h) => sum + (h.dividendPerShare || 0), 0);
      const totalReturn = (finalBVPS - initialBVPS + totalDividendsPerShare) / initialBVPS;

      // Macro difficulty score — informational only, does not affect grade.
      const macro = macroDifficultyFor(s);
      const macroDifficulty = macro.label;
      const macroScore = macro.score;
      const recessionQtrs = macro.recessionQtrs;
      const lateCycleQtrs = macro.lateCycleQtrs;
      const badEventCount = macro.badEventCount;

      // Grading — primary key: 10-year total return. CET1 + (L/D, satisfaction) modifiers.
      // Return bands. Recalibrated alongside the fee-income rebalance and the FDIC
      // assessment: those deliberately removed roughly 25 points of 10-year total return
      // from every strategy, so the bands come down with them and the grade curve keeps
      // its original shape rather than silently sliding a tier.
      const TIERS = ["F","D","C","B","A","A+"];
      let tierIdx;
      if (totalReturn > 1.74) tierIdx = 5;
      else if (totalReturn > 1.36) tierIdx = 4;
      else if (totalReturn > 1.04) tierIdx = 3;
      else if (totalReturn > 0.46) tierIdx = 2;
      else if (totalReturn > 0.18) tierIdx = 1;
      else tierIdx = 0;

      // CET1 gates per tier (A+:10%, A:9%, B:8%, C:7%). If short, drop tier until satisfied.
      const cet1Gates = [0, 0, 0.07, 0.08, 0.09, 0.10];
      const tierBeforeCet1 = tierIdx;
      while (tierIdx > 0 && ratios.cet1 < cet1Gates[tierIdx]) tierIdx -= 1;
      const cet1GateDrop = tierBeforeCet1 - tierIdx;

      // L/D modifier: outside 0.65-1.15 drops one tier. A+ additionally requires a 0.75
      // lower bound — but only when L/D is already inside the healthy band, otherwise the
      // outer-band penalty below would charge for the same miss twice.
      const ldOuterOk = ratios.ltd >= 0.65 && ratios.ltd <= 1.15;
      const ldA1Ok = ratios.ltd >= 0.75 && ratios.ltd <= 1.15;
      const ldPenalty = !ldOuterOk;
      if (tierIdx === 5 && !ldA1Ok && ldOuterOk) tierIdx = 4;
      if (ldPenalty && tierIdx > 0) tierIdx -= 1;

      // Customer satisfaction modifier: < 50 drops one tier.
      const satPenalty = (s.satisfaction ?? 65) < 50;
      if (satPenalty && tierIdx > 0) tierIdx -= 1;

      const grade = TIERS[tierIdx];
      const GRADE_MSGS = {
        "A+": "OUTSTANDING — top decile bank performance",
        "A":  "Excellent — strong franchise built",
        "B":  "Good — solid steward of shareholder capital",
        "C":  "Adequate — bank survived but underperformed peers",
        "D":  "Marginal — barely created shareholder value",
        "F":  "Failed — destroyed shareholder value despite avoiding regulatory failure",
      };
      const gradeMsg = GRADE_MSGS[grade];
      const modifiersApplied = [];
      // Explain a capital-driven downgrade at ANY tier, not just a missed A+.
      if (cet1GateDrop > 0) {
        modifiersApplied.push(
          `CET1 ${(ratios.cet1*100).toFixed(1)}% short of the ${(cet1Gates[tierBeforeCet1]*100).toFixed(1)}% gate for ${TIERS[tierBeforeCet1]}`
        );
      }
      if (tierIdx < 5 && totalReturn > 2.10 && !ldA1Ok && ldOuterOk) {
        modifiersApplied.push(`L/D ${ratios.ltd.toFixed(2)} outside A+ band 0.75-1.15`);
      }
      if (ldPenalty) modifiersApplied.push(`L/D ${ratios.ltd.toFixed(2)} outside healthy band 0.65-1.15`);
      if (satPenalty) modifiersApplied.push(`customer satisfaction ${Math.round(s.satisfaction)} below 50`);

      s.gameOver = {
        reason: "victory",
        severity: totalReturn > 1.30 ? "good" : totalReturn > 0.70 ? "neutral" : "warn",
        grade, gradeMsg,
        msg: `10 years complete. Total shareholder return ${(totalReturn*100).toFixed(0)}%. BVPS $${initialBVPS.toFixed(2)} → $${finalBVPS.toFixed(2)} (${(bvpsCAGR*100).toFixed(1)}% CAGR), cumulative dividends $${totalDividendsPerShare.toFixed(2)}/share. Avg. ROE ${(annualizedROE*100).toFixed(1)}%. Final CET1 ${(ratios.cet1*100).toFixed(1)}%, L/D ${ratios.ltd.toFixed(2)}x. Macro difficulty: ${macroDifficulty}.`,
        modifiersApplied,
        stats: {
          finalBVPS, initialBVPS, bvpsCAGR, totalReturn,
          annualizedROE, finalCET1: ratios.cet1, finalEq,
          finalAssets: totalAssets(s.bs), finalPx,
          totalDividendsPaid, totalDividendsPerShare,
          finalLTD: ratios.ltd, finalSat: s.satisfaction,
          macroDifficulty, macroScore,
          recessionQtrs, lateCycleQtrs, badEventCount,
        },
      };
    }

    return s;
  }

  function evolveMacro(s, q) {
    const m = s.macro;
    const rs = s.runSeed;
    m.cycleQuarters += 1;
    const prevCycle = m.cycle;

    const r = Math.abs(noise(rs, q, 1));
    if (m.cycle === "expansion" && m.cycleQuarters > 8 && r > 0.7) {
      m.cycle = "late_cycle"; m.cycleQuarters = 0;
    } else if (m.cycle === "late_cycle" && m.cycleQuarters > 4 && r > 0.6) {
      m.cycle = "recession"; m.cycleQuarters = 0;
    } else if (m.cycle === "recession" && m.cycleQuarters > 1 && r > 0.5) {
      m.cycle = "recovery"; m.cycleQuarters = 0;
    } else if (m.cycle === "recovery" && m.cycleQuarters > 4 && r > 0.5) {
      m.cycle = "expansion"; m.cycleQuarters = 0;
    }
    const cycleChanged = prevCycle !== m.cycle;

    let dRate = 0;
    if (m.cycle === "expansion") dRate = 0.0015 + noise(rs, q, 2, 0.003);
    if (m.cycle === "late_cycle") dRate = 0.0025 + noise(rs, q, 2, 0.005);
    if (m.cycle === "recession") dRate = -0.010 + noise(rs, q, 2, 0.005);
    if (m.cycle === "recovery") dRate = -0.0030 + noise(rs, q, 2, 0.004);

    m.fedFunds = clamp(m.fedFunds + dRate, 0.0025, 0.085);

    let targetSpread = 0.0075;
    if (m.cycle === "late_cycle") targetSpread = -0.0025;
    if (m.cycle === "recession") targetSpread = 0.0125;
    if (m.cycle === "recovery") targetSpread = 0.0150;

    const target10y = m.fedFunds + targetSpread;
    const meanRevSpeed = 0.22;
    const t10yShock = noise(rs, q, 3, 0.005);
    m.treasury10y = clamp(
      m.treasury10y + (target10y - m.treasury10y) * meanRevSpeed + t10yShock,
      0.015, 0.085
    );
    // Suppress curve inversion in early-stage expansion — real expansions almost
    // always carry a positive term premium until the cycle matures.
    if (m.cycle === "expansion" && m.cycleQuarters < 4 && m.treasury10y < m.fedFunds + 0.0025) {
      m.treasury10y = m.fedFunds + 0.0025;
    }

    if (m.cycle === "expansion") {
      m.unemployment = clamp(m.unemployment - 0.001, 0.032, 0.10);
      m.gdpGrowth = clamp(0.025 + noise(rs, q, 4, 0.005), 0.005, 0.045);
    } else if (m.cycle === "late_cycle") {
      m.unemployment = clamp(m.unemployment + 0.0005, 0.032, 0.10);
      m.gdpGrowth = clamp(0.015 + noise(rs, q, 4, 0.005), -0.005, 0.03);
    } else if (m.cycle === "recession") {
      m.unemployment = clamp(m.unemployment + 0.005, 0.032, 0.10);
      m.gdpGrowth = clamp(-0.015 + noise(rs, q, 4, 0.01), -0.04, 0.005);
    } else if (m.cycle === "recovery") {
      m.unemployment = clamp(m.unemployment - 0.002, 0.032, 0.10);
      m.gdpGrowth = clamp(0.02 + noise(rs, q, 4, 0.005), 0.005, 0.04);
    }

    return { cycleChanged, prevCycle };
  }

  function maybeEvent(s, q) {
    const r = Math.abs(noise(s.runSeed, q, 5));
    const r2 = Math.abs(noise(s.runSeed, q, 6));
    const m = s.macro;

    if (m.cycle === "recession" && r > 0.78) {
      return { severity: "bad", type: "credit_shock", msg: "REGIONAL CREDIT SHOCK: Major employer in service area announced layoffs. Expect elevated charge-offs." };
    }
    if (r > 0.96) {
      return { severity: "bad", type: "deposit_run", msg: "DEPOSIT FLIGHT: Local credit union launched aggressive money-market campaign. Outflows expected." };
    }
    if (r > 0.83 && m.fedFunds > 0.05) {
      return { severity: "warn", type: "rate_shock", msg: "RATE SHOCK: FOMC surprise +100bp move. Securities portfolio (AFS + HTM) marks down across the board." };
    }
    if (r < 0.10 && (m.cycle === "expansion" || m.cycle === "recovery")) {
      return { severity: "good", type: "loan_pipeline", msg: "STRONG PIPELINE: Local economic boom. Loan demand surging." };
    }

    if (r2 > 0.85 && m.cycle === "expansion") {
      return { severity: "good", type: "competitor_exit", msg: "COMPETITOR EXIT: Regional competitor closed local branch. Expect modest deposit and loan migration." };
    }
    if (r2 > 0.80 && m.cycle === "late_cycle") {
      return { severity: "warn", type: "cre_concern", msg: "CRE CONCERN: Local commercial real estate vacancy rate ticking up. Watchlist your CRE book." };
    }
    if (r2 > 0.78 && m.fedFunds < 0.025) {
      return { severity: "warn", type: "nim_squeeze", msg: "NIM SQUEEZE: Persistent low rates compressing loan yields industry-wide. Look for fee income offsets." };
    }
    if (r2 < 0.10 && (m.cycle === "expansion" || m.cycle === "late_cycle")) {
      return { severity: "good", type: "fee_income", msg: "FEE INCOME WIN: Strong mortgage origination quarter — gain on sale of loans elevated." };
    }
    if (r2 > 0.92) {
      return { severity: "warn", type: "fraud", msg: "FRAUD LOSS: Operational loss from check kiting scheme detected. One-time hit to noninterest expense." };
    }

    return null;
  }

  // Annual regulatory exam. Assesses opening-quarter ratios against citation thresholds.
  // Clean exams cost nothing. Citations carry a probabilistic, progressive fee — a
  // single breach rarely fines (and only $50K); multiple breaches raise both the odds
  // and the size. A pure-Auto bank holds coverage >= 0.70x so it is never cited there.
  function assessExam(s, r, q) {
    const year = Math.ceil(q / 4);
    const checks = [
      { label: "CET1",              bad: r.cet1 < 0.085,     val: fmtPct(r.cet1),              lim: "8.5%",  guide: "rebuild capital — ease distributions or slow RWA growth" },
      { label: "Tier 1 Leverage",   bad: r.tier1Lev < 0.06,  val: fmtPct(r.tier1Lev),          lim: "6.0%",  guide: "cut leverage — raise capital or shrink the balance sheet" },
      { label: "ACL/NPL coverage",  bad: r.aclToNpl < 0.60,  val: r.aclToNpl.toFixed(2) + "x", lim: "0.60x", guide: "raise provisioning to restore reserve coverage" },
      { label: "NPL ratio",         bad: r.nplRatio > 0.04,  val: fmtPct(r.nplRatio),          lim: "4.0%",  guide: "tighten underwriting and work down problem loans" },
      { label: "On-hand liquidity", bad: r.onHandLiq < 0.06, val: fmtPct(r.onHandLiq),         lim: "6.0%",  guide: "lift the liquidity target or temper loan growth" },
    ];
    const breaches = checks.filter(c => c.bad);
    if (breaches.length === 0) {
      return { fee: 0, type: "good", msg: `REGULATORY EXAM (Year ${year}): OCC on-site review complete. All five key ratios within supervisory expectations — no findings.` };
    }
    const n = breaches.length;
    const findings = breaches.map(b => `${b.label} ${b.val} (limit ${b.lim})`).join("; ");
    const guidance = breaches.map(b => b.guide).join("; ");
    const feeProb = Math.min(0.85, n * 0.17);
    const rFee = Math.abs(noise(s.runSeed, q, 23));
    if (rFee >= feeProb) {
      return { fee: 0, type: "warn", msg: `REGULATORY EXAM (Year ${year}): OCC cited ${n} finding${n > 1 ? "s" : ""} — ${findings}. No monetary penalty this cycle, but address before next year's exam: ${guidance}.` };
    }
    let fee;
    if (n === 1) {
      fee = 50;
    } else {
      const rMag = Math.abs(noise(s.runSeed, q, 24));
      fee = rMag < 0.35 ? 50 : Math.round(clamp(90 + n * 28 + rMag * 90, 100, 250));
    }
    return { fee, type: "bad", msg: `REGULATORY EXAM (Year ${year}): OCC cited ${n} finding${n > 1 ? "s" : ""} — ${findings}. $${fee}K penalty assessed. Priorities: ${guidance}.` };
  }

  // Deposit-marketing lift, shared by the engine and the UI hint so the displayed number
  // and the simulated effect can never drift. Returns the quarterly dollar lift, the
  // effective percentage of the current book, and the local-market saturation factor.
  //   - Log diminishing returns on the spend level ($100K vs $500K is a small step-up).
  //   - Anchored to the OPENING deposit base, not the live one, so a fixed budget buys a
  //     fixed-ish dollar amount rather than a fixed % of an ever-larger balance sheet.
  //   - Saturation taper: the lift fades toward a 15% floor as deposits push past ~1.5x
  //     the opening base — a single branch's local market only runs so deep.
  function computeAdLift(s) {
    const adSpend = Math.max(0, s.levers.depositAdSpend || 0);
    const base = totalDeposits(s.bs.deposits);
    const startBase = totalDeposits(INITIAL_STATE.bs.deposits);
    const saturation = clamp(1 - (base - startBase) / (startBase * 1.5), 0.15, 1);
    const dollars = adSpend > 0
      ? startBase * 0.012 * Math.log(1 + adSpend / 40) * saturation
      : 0;
    const pct = base > 0 ? dollars / base : 0;
    return { dollars, pct, saturation };
  }

  function computeDeposits(s, event, nf = { depositGrowth: 0 }) {
    const d = s.bs.deposits;
    const lev = s.levers;
    const m = s.macro;
    const sat = s.satisfaction != null ? s.satisfaction : 65;

    let organicGrowth = 0.0075;
    if (m.cycle === "expansion") organicGrowth = 0.013;
    if (m.cycle === "late_cycle") organicGrowth = 0.005;
    if (m.cycle === "recession") organicGrowth = -0.005;
    if (m.cycle === "recovery") organicGrowth = 0.008;
    organicGrowth = organicGrowth * (1 + nf.depositGrowth);
    // Satisfaction multiplies organic flow (retention + slight acquisition tilt).
    organicGrowth *= retentionMult(sat);

    const pricingPremium = lev.depositPricing * 0.004;

    // Flow response to pricing. Paying up has to actually buy balances or the lever is
    // economically dead — a 40bp premium on the interest book only pays for itself if it
    // pulls in enough new funding to earn the loan/securities spread on.
    // Sized so paying up roughly pays for itself: the premium is an immediate, certain
    // cost while the balances it buys compound, so the lever is a genuine trade rather
    // than either a no-op or a free win.
    let pricingFlowAdj;
    if (lev.depositPricing < 0) {
      pricingFlowAdj = lev.depositPricing * 0.020;
    } else if (lev.depositPricing > 0) {
      pricingFlowAdj = lev.depositPricing * 0.012 - Math.max(0, lev.depositPricing - 1) * 0.0015;
    } else {
      pricingFlowAdj = 0;
    }

    // deposit_run severity modulated mildly by satisfaction.
    let runDrain = 0;
    if (event?.type === "deposit_run") {
      let base = -0.10;
      if (sat >= 80) base = -0.075;
      else if (sat <= 40) base = -0.125;
      runDrain = base;
    }
    if (event?.type === "competitor_exit") runDrain = 0.015;

    // Sat-driven flight: small drain fires ~50% of quarters when sat < 35,
    // magnitude scaling with depth below the threshold.
    let satFlightPct = 0;
    if (sat < 35) {
      const depth = 35 - sat;
      const r = Math.abs(noise(s.runSeed, s.quarter, 21));
      if (r < 0.55) {
        satFlightPct = -Math.min(0.05, 0.005 + depth * 0.0030);
      }
    }

    // Combined sat-flight + run drain floor.
    const totalForcedDrain = Math.max(-0.08, runDrain + satFlightPct);

    // Marketing spend lift. Diminishing returns on the SPEND level, and — critically — the
    // lift is a roughly fixed-DOLLAR customer acquisition anchored to the franchise's natural
    // (opening) size, NOT a fixed percentage of an ever-growing balance sheet. A single-branch
    // bank's local market does not deepen just because its book got bigger, so the same ad
    // budget buys a shrinking share as the bank grows, and a saturation taper pulls the lift
    // down further once deposits run well past the opening base. Keeps marketing a meaningful
    // early-stage acquisition tool without letting it compound a one-branch bank to $1B+.
    const adLift = computeAdLift(s);

    const base = totalDeposits(d);
    // Ordinary flow follows the normal mix; the marketing lift is a fixed-dollar acquisition
    // on top, so it does not scale with (and cannot compound) the whole book.
    const organicNet = base * (organicGrowth + pricingFlowAdj) + adLift.dollars;
    // ...but a run is not proportional. Rate-sensitive and uninsured money leaves first;
    // core operating DDA (payroll, operating accounts) is the stickiest thing a community
    // bank owns and walks last.
    const forcedNet = base * totalForcedDrain;

    const intShare = clamp(0.45 + (m.fedFunds - 0.02) * 3, 0.45, 0.80);
    const niShare = 1 - intShare;

    const isDrain = forcedNet < 0;
    const fNI  = isDrain ? 0.10 : niShare;
    const fIC  = isDrain ? 0.15 : intShare * 0.20;
    const fSMM = isDrain ? 0.40 : intShare * 0.45;
    const fTD  = isDrain ? 0.35 : intShare * 0.35;

    const niDelta  = organicNet * niShare          + forcedNet * fNI;
    const icDelta  = organicNet * intShare * 0.20  + forcedNet * fIC;
    const smmDelta = organicNet * intShare * 0.45  + forcedNet * fSMM;
    const tdDelta  = organicNet * intShare * 0.35  + forcedNet * fTD;

    // A rate shock forces the whole book to reprice faster than the normal beta path.
    const shockPremium = event?.type === "rate_shock" ? 0.0020 : 0;

    return {
      deltaNI: niDelta, deltaIC: icDelta, deltaSMM: smmDelta, deltaTD: tdDelta,
      pricingPremium,
      weightedCost: depositCost(s, pricingPremium + shockPremium),
      satFlightPct,
      forcedDrain: forcedNet,
    };
  }

  // Deposit cost with realistic floors and a repricing lag. Interest-bearing accounts
  // never fall to literally zero (banks pay a few bps even at the zero bound), and the
  // book does not reprice the instant the Fed moves — betas lag by roughly a quarter or
  // two, which is why NIM expands into hikes and compresses on the way down.
  function depositCost(s, pricingPremium) {
    const m = s.macro;
    const d = s.bs.deposits;
    const total = totalDeposits(d);
    const niCost = 0;
    const icCost = clamp(m.fedFunds * 0.12 + pricingPremium, 0.0005, 0.085);
    const smmCost = clamp(m.fedFunds * 0.60 + pricingPremium, 0.0010, 0.085);
    const tdCost = clamp(m.fedFunds * 0.90 + pricingPremium, 0.0025, 0.085);
    const targetCost =
      (d.noninterest * niCost +
        d.interestChecking * icCost +
        d.savingsMM * smmCost +
        d.timeDeposits * tdCost) /
      total;
    // Move halfway to target each quarter (~1-2 quarter lag).
    const prev = s._depCostState;
    return prev == null ? targetCost : prev + (targetCost - prev) * 0.5;
  }

  function computeLoans(s, event, nf = { loanGrowth: 0 }, prev10y = s.macro.treasury10y) {
    const lev = s.levers;
    const m = s.macro;

    let demand = 0.010;
    if (m.cycle === "expansion") demand = 0.0150;
    if (m.cycle === "late_cycle") demand = 0.0100;
    if (m.cycle === "recession") demand = -0.0025;
    if (m.cycle === "recovery") demand = 0.0075;
    demand = demand * (1 + nf.loanGrowth);

    // Origination effort is ADDITIVE relative to "Match Demand" (lever 0):
    // pushing harder always adds growth and pulling back always subtracts,
    // even when cyclical demand is negative (recession). A multiplicative model
    // (demand * mult) inverts in a recession — a 3x on negative demand made
    // "Floor It" shrink the book faster than "Match". Match stays == demand.
    // Offsets are calibrated so the expansion cycle (demand 0.015) reproduces
    // the prior multiplicative results exactly: effortAdj = 0.015*(mult-1).
    let effortAdj;
    if (lev.loanGrowth === -2) effortAdj = -0.02250;      // was mult -0.5
    else if (lev.loanGrowth === -1) effortAdj = -0.01125; // was mult 0.25
    else if (lev.loanGrowth === 1) effortAdj = 0.01500;   // was mult 2.0
    else if (lev.loanGrowth === 2) effortAdj = 0.03000;   // was mult 3.0
    else effortAdj = 0; // Match Demand (mult 1.0)

    const underwriteDrag = lev.underwriting * 0.004;

    let netGrowth = demand + effortAdj - underwriteDrag;
    if (event?.type === "loan_pipeline") netGrowth += 0.010;
    if (event?.type === "credit_shock") netGrowth -= 0.005;
    if (event?.type === "competitor_exit") netGrowth += 0.005;
    if (event?.type === "cre_concern") netGrowth -= 0.003;

    netGrowth = clamp(netGrowth, -0.030, 0.060);
    const grossOrganic = s.bs.loansGross * netGrowth;

    // Indirect channel: dealer / broker auto + RV + powersports paper.
    // Adds growth at a yield discount; lower relationship stickiness.
    const indStep = Math.max(0, lev.indirectShare || 0);
    const indBoostPct = indStep * 0.015;
    const indNew = s.bs.loansGross * indBoostPct;

    // SBA gain-on-sale: a portion of new C&I production is sold off-balance-sheet
    // (75% govt-guaranteed slice at ~8% premium). Reduces retained loan growth.
    const sbaStep = Math.max(0, lev.sbaSalePct || 0);
    const salePct = sbaStep * 0.10; // 0%/10%/20%/30% of new organic production
    const sbaSold = Math.max(0, grossOrganic) * salePct * 0.75;
    const sbaGain = sbaSold * 0.08;

    const grossNew = grossOrganic - sbaSold + indNew;

    const baseYield = m.treasury10y + 0.020;
    const underwritePremium = -lev.underwriting * 0.0025;
    const aggressivenessYieldHit = lev.loanGrowth * -0.0025;
    const indirectYieldHit = indStep > 0 ? -0.0030 : 0;
    const newYield = clamp(baseYield + underwritePremium + aggressivenessYieldHit + indirectYieldHit, 0.03, 0.10);

    // ---- Stateful book yield ----------------------------------------------------
    // The portfolio is a stock, not a spot rate: only the floating slice reprices with
    // the curve, and only the slice that matures/renews each quarter takes on today's
    // pricing. That means a lending decision made now is still in the book years later,
    // instead of washing out the moment it is made.
    //
    // The level is anchored to the same market curve the old model used, so this changes
    // how quickly and how durably yield responds -- not where it settles.
    const marketAnchor = blendedLoanYield(s);
    const prevAnchor = 0.05 + (prev10y - 0.04) * 0.4;
    const dAnchor = marketAnchor - prevAnchor;
    const spreadVsAnchor = underwritePremium + aggressivenessYieldHit + indirectYieldHit;

    const FLOAT_SHARE = 0.35;   // ~a third of a community book is floating/prime-linked
    const ROLL_SHARE  = 0.06;   // ~24%/yr matures or renews at current pricing
    // Only part of a pricing decision survives into the blended book — SBA sales,
    // amortization and mix shift wash out the rest — so a sustained pricing stance moves
    // the portfolio meaningfully without letting one slider dominate total yield.
    const SPREAD_PERSISTENCE = 0.35;
    const prevBook = s.bs.loanBookYield != null ? s.bs.loanBookYield : marketAnchor;
    const repriced = prevBook + FLOAT_SHARE * dAnchor;
    const bookYield = clamp(
      repriced * (1 - ROLL_SHARE) +
        (marketAnchor + spreadVsAnchor * SPREAD_PERSISTENCE) * ROLL_SHARE,
      0.02, 0.12
    );

    return {
      delta: grossNew,
      portfolioYield: bookYield, newYield, bookYield,
      sbaSold, sbaGain,
      indirectNew: indNew,
    };
  }

  function blendedLoanYield(s) {
    return 0.050 + (s.macro.treasury10y - 0.04) * 0.4;
  }

  function computeSecurities(s, event, prevFedFunds, prev10y) {
    const lev = s.levers;
    const m = s.macro;
    const duration = 1 + lev.securitiesDuration * 2;

    const dRate = (m.treasury10y - prev10y) + (event?.type === "rate_shock" ? 0.0100 : 0);
    // Only AVAILABLE-FOR-SALE securities are marked through AOCI. Held-to-maturity is
    // carried at amortized cost under GAAP, so it never touches AOCI or equity.
    const markedSecurities = s.bs.securitiesAFS;
    const aociChange = -duration * dRate * markedSecurities;

    // Unrealized marks accrete back to par over the remaining life of the portfolio
    // (a discount bond pulls to par as it matures), not at a flat token rate.
    const pullToParRate = clamp(1 / Math.max(1, duration * 4), 0.03, 0.20);
    const pullToPar = -s.bs.aoci * pullToParRate;

    const curveSlope = m.treasury10y - m.fedFunds;
    const termPremium = duration * 0.0010 + Math.max(curveSlope, -0.005) * 0.6;
    const secYield = clamp(m.fedFunds + termPremium, 0.012, 0.085);

    return { aociChange: aociChange + pullToPar, yield: secYield, duration };
  }

  // Income tax. Two pieces of realism the flat "max(0, pretax*21%)" was missing:
  //  - a slice of the securities book is municipal and its income is tax-exempt, so the
  //    effective rate sits below the statutory 21%;
  //  - a loss quarter produces a tax BENEFIT (carried back against taxes already paid in
  //    the run), which is what keeps a real bank's capital from falling by the full
  //    pre-tax loss. The benefit is capped at cumulative taxes paid so it can never
  //    become a money fountain.
  const MUNI_SHARE = 0.10;
  function taxOn(s, pretax, exemptIncome) {
    const taxable = pretax - Math.max(0, exemptIncome || 0);
    if (taxable >= 0) return taxable * 0.21;
    const benefit = Math.min(-taxable * 0.21, Math.max(0, s._cumTaxPaid || 0));
    return -benefit;
  }
  // Recompute tax + net income after a late charge (CFPB order, exam fee, issuance fees)
  // has already been pushed through pretax.
  function retax(s, is) {
    is.tax = taxOn(s, is.pretax, is._taxExempt || 0);
    is.netIncome = is.pretax - is.tax;
  }

  function computeIncome(s, deposits, loans, securities, event, nf = { nplFormation: 0, nonintIncome: 0, nonintExpense: 0 }, prevFedFunds = s.macro.fedFunds) {
    const bs = s.bs;
    const avgLoans = bs.loansGross + loans.delta / 2;
    const avgSecurities = bs.securitiesAFS + bs.securitiesHTM;
    const avgCash = bs.cash;

    const loanYield = loans.portfolioYield;
    const cashYield = s.macro.fedFunds;
    const secYield = securities.yield;

    const interestIncome =
      (avgLoans * loanYield + avgSecurities * secYield + avgCash * cashYield) / 4;

    const avgDeposits =
      totalDeposits(bs.deposits) +
      (deposits.deltaNI + deposits.deltaIC + deposits.deltaSMM + deposits.deltaTD) / 2;
    const depCost = deposits.weightedCost;
    // Wholesale pricing: FHLB advances are collateralized and price tight to the curve,
    // brokered CDs are unsecured retail-sourced money and price above both FHLB and core
    // deposits. Wholesale should be a real cost decision, not free funding.
    const fhlbCost = s.macro.fedFunds + 0.0025;
    const subDebtCost = bs.subDebtAvgCost || 0;
    const brokeredCDCost = s.macro.fedFunds + 0.0075;

    const interestExpense =
      (avgDeposits * depCost
        + bs.borrowingsFHLB * fhlbCost
        + bs.subDebt * subDebtCost
        + (bs.brokeredCDs || 0) * brokeredCDCost) / 4;

    const nii = interestIncome - interestExpense;

    let cycleNplRate = 0.0040;
    if (s.macro.cycle === "late_cycle") cycleNplRate = 0.007;
    if (s.macro.cycle === "recession") cycleNplRate = 0.018;
    if (s.macro.cycle === "recovery") cycleNplRate = 0.010;

    const eventNplAdj = event?.type === "credit_shock" ? 0.025 : 0;

    const riskBankAccrual =
      Math.max(0, s.levers.loanGrowth) * 0.0010 * avgLoans / 4 +
      Math.max(0, -s.levers.underwriting) * 0.0015 * avgLoans / 4;

    let riskBankReleaseRate = 0.05;
    if (s.macro.cycle === "late_cycle") riskBankReleaseRate = 0.12;
    if (s.macro.cycle === "recession") riskBankReleaseRate = 0.25;
    if (s.macro.cycle === "recovery") riskBankReleaseRate = 0.08;

    const riskBankRelease = (s.creditRiskBank || 0) * riskBankReleaseRate;

    const totalNplFormationRate = Math.max(0, cycleNplRate + eventNplAdj);
    const baselineNplFormation = avgLoans * totalNplFormationRate / 4;

    // Vintage-aware NPL formation: prior originations surface as NPLs 4-8 quarters later,
    // weighted by the underwriting stance at origination. Loose vintages add NPLs;
    // tight vintages subtract. Peak weight at lag=6 (~18 months).
    let vintageNplAdj = 0;
    const vintages = s.loanVintages || [];
    const qNow = s.quarter;
    for (const v of vintages) {
      const lag = qNow - v.q;
      if (lag < 4 || lag > 8) continue;
      const weight = lag === 6 ? 0.30 : (lag === 5 || lag === 7) ? 0.22 : 0.13;
      // Per $1K of vintage growth, each underwriting unit shifts NPL formation by 12bps;
      // multiplied by lag weight. Negative score (loose) => positive adjustment.
      vintageNplAdj += -v.underwritingScore * 0.0012 * Math.max(0, v.growthAmount) * weight;
    }
    // Cycle amplifies vintage surfacing during stress
    const cycleAmp = s.macro.cycle === "recession" ? 1.6 : s.macro.cycle === "late_cycle" ? 1.2 : 1.0;
    vintageNplAdj *= cycleAmp;

    const newNplFormation = Math.max(0,
      baselineNplFormation * (1 + nf.nplFormation) + riskBankRelease + vintageNplAdj
    );

    let ncoMigrationRate = 0.10;
    if (s.macro.cycle === "recession") ncoMigrationRate = 0.20;
    if (s.macro.cycle === "late_cycle") ncoMigrationRate = 0.13;
    const grossChargeOffs = bs.npl * ncoMigrationRate;
    const recoveries = grossChargeOffs * 0.15;
    const netChargeOffs = Math.max(0, grossChargeOffs - recoveries);

    const targetAclRate = 0.0115 + (s.macro.cycle === "recession" ? 0.004 : s.macro.cycle === "late_cycle" ? 0.0015 : 0);
    const loanTargetACL = avgLoans * targetAclRate;
    const loanShortfall = Math.max(0, (loanTargetACL - (bs.acl - netChargeOffs)) * 0.25);
    const expectedLossOnNew = newNplFormation * 0.40;

    // Coverage-based reserve floor — keeps the Auto model safely above the examiner's
    // 0.60x ACL/NPL citation line. projNpl mirrors the applyBalanceSheet NPL roll so a
    // pure-Auto bank structurally maintains >= 0.70x coverage and is never cited.
    const projNpl = Math.max(0, bs.npl + newNplFormation - grossChargeOffs - bs.npl * 0.06);
    const coverageFloorACL = projNpl * 0.70;
    const coverageShortfall = Math.max(0, coverageFloorACL - bs.acl - loanShortfall - expectedLossOnNew * 0.5);

    const modelProvision = Math.max(0, netChargeOffs + loanShortfall + coverageShortfall + expectedLossOnNew * 0.5);

    const overrideActive = s.decisions.provisionOverride !== null && s.decisions.provisionOverride !== undefined;
    let provision = overrideActive ? s.decisions.provisionOverride : modelProvision;

    // Piece B — mandatory catch-up: an override that has run ACL/NPL coverage below
    // 0.35x is force-rebuilt toward 0.50x coverage, capped at 0.4% of avg loans/qtr.
    // The cap is deliberate — a fast NPL spike can still outrun the rebuild, leaving
    // the door open for a genuine shortfall (Piece A).
    let provisionCatchUp = false;
    if (overrideActive && bs.npl > 0 && bs.acl / bs.npl < 0.35) {
      const rebuildNeed = Math.max(0, bs.npl * 0.50 - (bs.acl - netChargeOffs));
      const catchUp = Math.min(rebuildNeed, avgLoans * 0.004);
      if (catchUp > provision) { provision = catchUp; provisionCatchUp = true; }
    }

    // Piece A — charge-offs beyond the allowance + provision spill into the income
    // statement (a real loss, hits net income / capital). Piece C — supervisory
    // remediation fee whenever such a shortfall occurs.
    const uncoveredChargeOffs = Math.max(0, netChargeOffs - bs.acl - provision);
    const reserveShortfallFee = uncoveredChargeOffs > 0
      ? clamp(uncoveredChargeOffs * 0.30, 25, 500)
      : 0;

    // Baseline asset-scaled "other" fees (wires, ATM, BOLI, etc.). Reduced now that
    // Phase 5 explicit service charges + interchange carry most of the load.
    let nonintIncome =
      ((totalAssets(bs) * 0.0022 + 80) / 4) * (1 + nf.nonintIncome) + (event?.severity === "good" ? 60 : 0);
    if (event?.type === "fee_income") nonintIncome += 250;

    // Phase 5 fee streams: service charges (overdraft + maintenance) + debit interchange.
    const feeStreams = computeFeeIncome(s);
    nonintIncome += feeStreams.totalPhase5;

    // SBA gain-on-sale: 75% govt-guaranteed slice of new C&I production sold at ~8% premium.
    const sbaGain = loans.sbaGain || 0;
    nonintIncome += sbaGain;

    // Mortgage banking gain-on-sale — refi-wave dynamic.
    // Origination volume responds to (a) rate change vs prior qtr (refi wave: 70%) and
    // (b) absolute rate level (low rates = high origination: 30%).
    const mortProg = Math.max(0, s.levers.mortgageProgram || 0);
    let mortGain = 0;
    let mortFixedCost = 0;
    if (mortProg > 0) {
      const dRate = s.macro.fedFunds - prevFedFunds;
      const refiBoost = clamp(-dRate * 80, -0.6, 1.5);    // -100bp move -> +0.8; +100bp -> -0.8
      const levelBoost = clamp((0.05 - s.macro.fedFunds) * 8, -0.4, 0.6);
      const cycleMult = Math.max(0.10, 1 + (refiBoost * 0.7 + levelBoost * 0.3));
      const baseGain = mortProg * 80;                     // $80K/$160K/$240K base per program step
      mortGain = baseGain * cycleMult;
      mortFixedCost = mortProg * 60;                      // $60K/$120K/$180K fixed staffing per qtr
      nonintIncome += mortGain;
    }

    // FDIC deposit insurance assessment. Base ~6bp of assets annually, with a risk-based
    // surcharge for thin capital or heavy wholesale reliance — exactly how the FDIC's
    // scorecard treats a community bank.
    const wholesaleFunding = (bs.borrowingsFHLB || 0) + (bs.brokeredCDs || 0);
    const wholesaleShare = wholesaleFunding / Math.max(1, totalDeposits(bs.deposits) + wholesaleFunding);
    const openingCet1 = (bs.commonEquity + bs.retainedEarnings + bs.aoci) /
      Math.max(1, bs.loansGross * 0.85 + (bs.securitiesAFS + bs.securitiesHTM) * 0.2 + bs.premises + bs.otherAssets);
    let fdicRateAnnual = 0.0006;
    if (openingCet1 < 0.08 || wholesaleShare > 0.15) fdicRateAnnual = 0.0010;
    if (openingCet1 < 0.065) fdicRateAnnual = 0.0016;
    const fdicAssessment = totalAssets(bs) * fdicRateAnnual / 4;

    // Fixed: premises, core systems, base headcount. Doesn't move with quarterly noise.
    const nonintExpenseFixed = (bs.premises * 0.18 + 800) / 4 + mortFixedCost + fdicAssessment;
    // Variable: asset-scaled compensation + ops costs + event shocks + deposit ad spend.
    let nonintExpenseVariable = (totalAssets(bs) * 0.0233 / 4) * (1 + nf.nonintExpense);
    nonintExpenseVariable += Math.max(0, s.levers.depositAdSpend || 0);
    // Advertising & lender incentives: cost of chasing loan demand. Scales with how
    // hard the pace slider is pushed (only Push/Floor It). ~12 bps annualized of avg
    // loans per pace step.
    const advLenderExpense = Math.max(0, s.levers.loanGrowth) * 0.0012 * avgLoans / 4;
    nonintExpenseVariable += advLenderExpense;
    if (event?.type === "fraud") nonintExpenseVariable += 350;
    nonintExpenseVariable += reserveShortfallFee;
    let nonintExpense = nonintExpenseFixed + nonintExpenseVariable;

    // Uncovered charge-offs flow through the income statement as a credit cost,
    // so they show up in ROA/ROE/EPS rather than bypassing earnings.
    const pretax = nii + nonintIncome - nonintExpense - provision - uncoveredChargeOffs;
    const taxExempt = Math.max(0, avgSecurities * secYield / 4) * MUNI_SHARE;
    const tax = taxOn(s, pretax, taxExempt);
    const netIncome = pretax - tax;

    return {
      _taxExempt: taxExempt,
      fdicAssessment,
      interestIncome, interestExpense, nii,
      provision, netChargeOffs, grossChargeOffs,
      uncoveredChargeOffs, reserveShortfallFee, provisionCatchUp,
      nonintIncome, nonintExpense,
      nonintExpenseFixed, nonintExpenseVariable,
      pretax, tax, netIncome,
      avgLoans, avgSecurities, avgDeposits,
      loanYield, depCost,
      nplDelta: 0, newNplFormation,
      riskBankAccrual, riskBankRelease,
      vintageNplAdj,
      sbaGain, sbaSold: loans.sbaSold || 0,
      mortGain, mortFixedCost,
      depositAdSpend: Math.max(0, s.levers.depositAdSpend || 0),
      advLenderExpense,
      brokeredCDInterest: ((s.bs.brokeredCDs || 0) * brokeredCDCost) / 4,
      overdraftIncome: feeStreams.overdraftIncome,
      maintenanceIncome: feeStreams.maintenanceIncome,
      interchangeIncome: feeStreams.interchangeIncome,
      serviceCharges: feeStreams.serviceCharges,
      accountCountK: feeStreams.accountsK,
      dividendsPaid: 0, repurchases: 0,
    };
  }

  // Shared capacity for shareholder distributions (dividends + buybacks).
  function distributionCapacity(s, is, ratios) {
    // You distribute out of EARNINGS, not out of the balance sheet. "Eligible retained
    // income" — this quarter plus the trailing year, annualized while history is short —
    // is the base the capital conservation buffer works off, and it is also simply what a
    // board would sign off on: returning much more than a year of profit in one quarter
    // is not something a community bank does.
    const hist = s.history || [];
    const recent = hist.slice(-4);
    const trailing = recent.reduce((a, h) => a + (h.netIncome || 0), 0) + is.netIncome;
    const avgQuarter = trailing / (recent.length + 1);
    const earningsBase = Math.max(0, avgQuarter * 4);

    // Never more than the accumulated retained earnings actually on the books.
    const accounting = Math.max(0, s.bs.retainedEarnings + is.netIncome);

    // Capital conservation buffer: CET1 above 7.0% (4.5% minimum + 2.5% buffer) is
    // unconstrained; inside the buffer the payout ratio steps down.
    const buffer = ratios.cet1 - 0.045;
    let payoutFactor;
    if (buffer >= 0.025) payoutFactor = 1.00;
    else if (buffer >= 0.01875) payoutFactor = 0.60;
    else if (buffer >= 0.0125) payoutFactor = 0.40;
    else if (buffer >= 0.00625) payoutFactor = 0.20;
    else payoutFactor = 0;

    const regulatory = earningsBase * payoutFactor;
    return {
      capacity: Math.min(accounting, regulatory),
      payoutFactor, accounting, regulatory, earningsBase,
    };
  }

  function applyCapitalActions(s, is, ratios) {
    const dec = s.decisions;

    // PCA-style restriction: if indirect concentration is critical, suppress discretionary
    // capital distributions (dividends + buybacks). Auto-detected, examiner-imposed.
    const indirectShare = s.bs.loansGross > 0 ? s.bs.loansIndirect / s.bs.loansGross : 0;
    const distRestricted = indirectShare > 0.25;
    if (distRestricted) {
      dec.repurchaseAmount = 0;
      dec.dividendPerShare = Math.min(dec.dividendPerShare, 0);
    }
    is._distRestricted = distRestricted;

    // Equity issuance: 95% of marked price → paid-in capital + cash; 5% fee flows through non-int expense.
    // Applied before dividends so retained-earnings/cash reflect both this quarter, and new shares are eligible.
    if (dec.equityIssuance > 0) {
      const px = estimatedSharePrice(s, ratios);
      const gross = dec.equityIssuance;
      const net = gross * 0.95;
      const fees = gross * 0.05;
      const newShares = net / Math.max(0.01, px);

      s.bs.commonEquity += net;
      s.bs.sharesOutstanding += newShares;
      s.bs.cash += net;

      is.equityIssuanceGross = gross;
      is.equityIssuanceNet = net;
      is.equityIssuanceFees = fees;
      is.equityIssuanceShares = newShares;
      is.equityIssuancePrice = px;
      is.nonintExpense += fees;
      is.nonintExpenseVariable = (is.nonintExpenseVariable || 0) + fees;
      is.pretax -= fees;
      retax(s, is);
    }

    // ---- Distribution capacity -------------------------------------------------
    // Dividends and buybacks draw on ONE shared pool, so spending it on one leaves less
    // for the other. Two limits bind, whichever is tighter:
    //   1. accounting — you cannot distribute more than retained earnings + this
    //      quarter's earnings;
    //   2. regulatory — the capital conservation buffer caps the payout ratio as CET1
    //      approaches the 4.5% minimum (100%/60%/40%/20%/0% of eligible retained income).
    // Dividends are declared first and take priority; buybacks are discretionary and get
    // whatever capacity is left.
    const cap = distributionCapacity(s, is, ratios);
    is._distCapacity = cap.capacity;
    is._distPayoutFactor = cap.payoutFactor;

    const requestedDiv = Math.max(0, dec.dividendPerShare * s.bs.sharesOutstanding);
    const totalDiv = Math.min(requestedDiv, cap.capacity);
    const divCut = requestedDiv - totalDiv;

    const remainingCapacity = Math.max(0, cap.capacity - totalDiv);
    const requestedBuyback = Math.max(0, dec.repurchaseAmount);
    const buyback = Math.min(requestedBuyback, remainingCapacity);
    const buybackCut = requestedBuyback - buyback;

    is.dividendsPaid = totalDiv;
    is.repurchases = buyback;
    is._divCut = divCut;
    is._buybackCut = buybackCut;

    s.bs.retainedEarnings += is.netIncome - totalDiv;

    if (buyback > 0) {
      // Guard the price: a bank with impaired equity can produce a zero/negative marked
      // price, which would otherwise generate nonsense share counts.
      const price = Math.max(0.01, estimatedSharePrice(s, ratios));
      const sharesBought = Math.min(buyback / price, s.bs.sharesOutstanding * 0.5);
      s.bs.sharesOutstanding -= sharesBought;
      // Treasury accounting: retire against paid-in capital up to book, the premium over
      // book comes out of retained earnings.
      const bvps = totalEquity(s.bs) / Math.max(1e-6, s.bs.sharesOutstanding + sharesBought);
      const atBook = Math.min(buyback, Math.max(0, sharesBought * bvps));
      s.bs.commonEquity -= atBook;
      s.bs.retainedEarnings -= (buyback - atBook);
      s.bs.cash -= buyback;
      is.repurchasePrice = price;
      is.repurchaseShares = sharesBought;
    }

    s.bs.cash -= totalDiv;

    // FHLB borrowing capacity: advances are collateralized by pledged loans and
    // securities, so the line is finite (~25% of the pledgeable base).
    const pledgeBase = s.bs.loansGross + s.bs.securitiesAFS + s.bs.securitiesHTM;
    const fhlbCapacity = Math.max(0, pledgeBase * 0.25);
    const wantFhlb = Math.max(0, s.bs.borrowingsFHLB + dec.fhlbAdvance);
    const newFhlb = Math.min(wantFhlb, fhlbCapacity);
    const fhlbDelta = newFhlb - s.bs.borrowingsFHLB;
    s.bs.borrowingsFHLB = newFhlb;
    s.bs.cash += fhlbDelta;
    is._fhlbCapacity = fhlbCapacity;
    is._fhlbBlocked = Math.max(0, wantFhlb - fhlbCapacity);

    // Sub debt: positive = new issuance (locks in current Fed Funds + 300bps), negative = call.
    // Avg cost is principal-weighted; calls reduce principal but keep blended rate; reaching zero resets.
    const subDelta = Math.max(-s.bs.subDebt, dec.subDebtIssuance);
    if (subDelta > 0) {
      const newRate = s.macro.fedFunds + 0.03;
      const oldPrincipal = s.bs.subDebt;
      const oldAvgCost = s.bs.subDebtAvgCost || 0;
      const newPrincipal = oldPrincipal + subDelta;
      s.bs.subDebtAvgCost = (oldPrincipal * oldAvgCost + subDelta * newRate) / newPrincipal;
    }
    s.bs.subDebt = Math.max(0, s.bs.subDebt + subDelta);
    if (s.bs.subDebt === 0) s.bs.subDebtAvgCost = 0;
    s.bs.cash += subDelta;

    // Brokered CDs: target balance dial; auto-rolls each quarter at FedFunds + 35bp
    // (cost is already applied in computeIncome based on opening balance).
    const bcdTarget = Math.max(0, dec.brokeredCDsTarget || 0);
    const bcdDelta = bcdTarget - (s.bs.brokeredCDs || 0);
    s.bs.brokeredCDs = bcdTarget;
    s.bs.cash += bcdDelta;
    is.brokeredCDDelta = bcdDelta;
  }

  function applyBalanceSheet(s, deposits, loans, securities, is) {
    const bs = s.bs;
    bs.deposits.noninterest += deposits.deltaNI;
    bs.deposits.interestChecking += deposits.deltaIC;
    bs.deposits.savingsMM += deposits.deltaSMM;
    bs.deposits.timeDeposits += deposits.deltaTD;

    const depDelta = deposits.deltaNI + deposits.deltaIC + deposits.deltaSMM + deposits.deltaTD;

    bs.loansGross += loans.delta;

    // Track indirect-channel cumulative balance and decay it at the same pace as the book amortizes.
    // Net new indirect adds; existing indirect runs off proportionally to gross book turnover.
    bs.loansIndirect = Math.max(0, (bs.loansIndirect || 0) + (loans.indirectNew || 0));
    if (bs.loansGross > 0) {
      // Natural runoff: assume indirect amortizes ~3% per quarter (shorter-tenor auto/RV paper)
      bs.loansIndirect *= 0.97;
    }

    // Record vintage entry for this quarter — only when the book actually grew organically.
    // Captures underwriting stance for forward-looking provision recognition (4-8 qtr lag).
    const organicAdd = (loans.delta || 0) - (loans.indirectNew || 0) + (is.sbaSold || 0);
    if (organicAdd > 0) {
      if (!s.loanVintages) s.loanVintages = [];
      s.loanVintages.push({
        q: s.quarter,
        growthAmount: organicAdd,
        underwritingScore: s.levers.underwriting || 0,
      });
      // Prune entries older than 12 quarters
      s.loanVintages = s.loanVintages.filter(v => s.quarter - v.q <= 12);
    }

    // A charge-off removes the loan from the books AND draws down the allowance. Only the
    // allowance side was happening, so charged-off balances kept sitting in gross loans
    // (and kept earning interest) forever.
    bs.loansGross = Math.max(0, bs.loansGross - is.netChargeOffs);
    bs.acl += is.provision - is.netChargeOffs;
    bs.acl = Math.max(0, bs.acl);
    const cures = bs.npl * 0.06;
    bs.npl = Math.max(0, bs.npl + is.newNplFormation - is.grossChargeOffs - cures);

    s.creditRiskBank = Math.max(0, (s.creditRiskBank || 0) + (is.riskBankAccrual || 0) - (is.riskBankRelease || 0));

    // AFS is carried at FAIR VALUE, so the mark moves the asset and AOCI together.
    // Previously only equity moved, which left the balance sheet permanently out of
    // balance by the cumulative mark (Schedule RC did not foot).
    bs.aoci += securities.aociChange;
    bs.securitiesAFS = Math.max(0, bs.securitiesAFS + securities.aociChange);

    // Persist the stateful rate series so next quarter starts from where this one ended.
    if (loans.bookYield != null) bs.loanBookYield = loans.bookYield;
    if (is.depCost != null) s._depCostState = is.depCost;

    const cashChange = depDelta + is.netIncome + is.provision + (is.uncoveredChargeOffs || 0) - loans.delta;
    bs.cash += cashChange;

    const cashTargetPct = 0.025 + s.levers.liquidityTarget * 0.025;
    const targetCash = totalAssets(bs) * cashTargetPct;
    const minCash = totalAssets(bs) * 0.015;

    if (bs.cash > targetCash + 2_000) {
      const excess = bs.cash - targetCash;
      bs.cash -= excess;
      bs.securitiesAFS += excess;
    } else if (bs.cash < minCash) {
      const shortfall = targetCash - bs.cash;
      const fromAFS = Math.min(shortfall, Math.max(0, bs.securitiesAFS - 5_000));
      if (fromAFS > 0) {
        const totalSec = bs.securitiesAFS + bs.securitiesHTM;
        const realizedShare = fromAFS / totalSec;
        const realized = bs.aoci * realizedShare;
        bs.aoci -= realized;
        bs.securitiesAFS -= fromAFS;
        bs.cash += fromAFS;
        bs.retainedEarnings += realized;
        if (realized < -50) s._forcedAfsLossLog = realized;
      }
      if (bs.cash < minCash) {
        const draw = Math.ceil((minCash - bs.cash) / 1000) * 1000 + 2_000;
        bs.borrowingsFHLB += draw;
        bs.cash += draw;
        s._forcedFhlbDraw = (s._forcedFhlbDraw || 0) + draw;
      }
    } else if (s.levers.liquidityTarget >= 2 && bs.cash < targetCash - 3_000 && bs.securitiesAFS > 15_000) {
      const refill = Math.min(targetCash - bs.cash, bs.securitiesAFS - 15_000) * 0.5;
      if (refill > 500) {
        const totalSec = bs.securitiesAFS + bs.securitiesHTM;
        const realizedShare = refill / totalSec;
        const realized = bs.aoci * realizedShare;
        bs.aoci -= realized;
        bs.securitiesAFS -= refill;
        bs.cash += refill;
        bs.retainedEarnings += realized;
      }
    }

    // Wholesale ratio excludes subordinated debt — sub debt is treated as Total Capital, not wholesale funding.
    // FHLB advances + brokered CDs both count as wholesale concentration.
    const wholesale = bs.borrowingsFHLB + (bs.brokeredCDs || 0);
    const totalFunding = totalDeposits(bs.deposits) + wholesale;
    s._wholesaleRatio = totalFunding > 0 ? wholesale / totalFunding : 0;
  }

  function totalDeposits(d) {
    return d.noninterest + d.interestChecking + d.savingsMM + d.timeDeposits;
  }
  function totalAssets(bs) {
    return bs.cash + bs.securitiesAFS + bs.securitiesHTM + bs.loansGross - bs.acl + bs.premises + bs.otherAssets;
  }
  function totalLiabilities(bs) {
    // Brokered CDs are a funding liability like any other borrowing — omitting them left
    // the balance sheet out of balance (A != L + E) whenever the dial was used.
    return totalDeposits(bs.deposits) + bs.borrowingsFHLB + (bs.brokeredCDs || 0) +
      bs.subDebt + bs.otherLiab;
  }
  function totalEquity(bs) {
    return bs.commonEquity + bs.retainedEarnings + bs.aoci;
  }

  function computeRatios(s, is) {
    const bs = s.bs;
    const ta = totalAssets(bs);
    const eq = totalEquity(bs);
    const annNII = is.nii * 4;
    const earningAssets = bs.cash + bs.securitiesAFS + bs.securitiesHTM + bs.loansGross;
    const nim = annNII / earningAssets;
    const annNetInc = is.netIncome * 4;
    const roa = annNetInc / ta;
    const roe = annNetInc / eq;

    // Risk-weighted assets. Nonperforming loans carry a 150% weight under the US
    // standardized approach, so deteriorating credit shows up directly in the capital
    // ratios instead of only bleeding through earnings.
    const performingLoans = Math.max(0, bs.loansGross - bs.npl);
    const rwa =
      bs.cash * 0 +
      bs.securitiesAFS * 0.2 +
      bs.securitiesHTM * 0.2 +
      performingLoans * 0.85 +
      bs.npl * 1.5 +
      bs.premises * 1.0 +
      bs.otherAssets * 1.0;

    const cet1Cap = bs.commonEquity + bs.retainedEarnings + bs.aoci;
    const cet1 = cet1Cap / rwa;
    const tier1Cap = cet1Cap;
    // The allowance counts as Tier 2 only up to 1.25% of credit RWA.
    const tier2ACL = Math.min(bs.acl, 0.0125 * rwa);
    const totalCap = tier1Cap + bs.subDebt + tier2ACL;
    const tier1Lev = tier1Cap / ta;
    const totalCapRatio = totalCap / rwa;
    const tce = eq / ta;

    const nplRatio = bs.npl / bs.loansGross;
    const aclCoverage = bs.acl / bs.loansGross;
    const aclToNpl = bs.npl > 0 ? bs.acl / bs.npl : 999;

    const ltd = bs.loansGross / totalDeposits(bs.deposits);
    const onHandLiq = (bs.cash + bs.securitiesAFS) / ta;
    const efficiency = is.nonintExpense / (is.nii + is.nonintIncome);

    // Estimated uninsured deposits — the funding metric examiners have focused on since
    // 2023. Time deposits are mostly under the $250K insurance cap; operating and
    // money-market balances hold the large corporate relationships.
    const dep = bs.deposits;
    const uninsuredDeposits =
      dep.noninterest * 0.42 + dep.interestChecking * 0.30 +
      dep.savingsMM * 0.35 + dep.timeDeposits * 0.10;
    const uninsuredRatio = uninsuredDeposits / Math.max(1, totalDeposits(dep));

    return {
      nim, roa, roe, cet1, tier1Lev, totalCapRatio, tce,
      nplRatio, aclCoverage, aclToNpl, ltd, onHandLiq, efficiency, rwa,
      earningAssets, uninsuredDeposits, uninsuredRatio,
    };
  }

  function checkRegulatory(s, ratios, log) {
    const q = s.quarter;
    const yearNum = Math.ceil(q / 4);
    const qNum = ((q - 1) % 4) + 1;

    if (ratios.cet1 < 0.045 || ratios.tier1Lev < 0.04) {
      let cause = "Capital depletion";
      if (s.bs.aoci / Math.max(totalEquity(s.bs), 1) < -0.20) {
        cause = "Severe AOCI losses from interest rate risk eroded capital base";
      } else if (ratios.nplRatio > 0.025) {
        cause = "Asset quality deterioration overwhelmed loss absorption capacity";
      } else if (ratios.ltd > 1.20) {
        cause = "Aggressive loan growth funded by wholesale borrowing, then funding gap closed";
      } else if ((s.creditRiskBank || 0) > 3_000) {
        cause = "Latent credit risk from prior aggressive originations surfaced in stress";
      } else if (s.lastIS.repurchases > 5_000 || s.lastIS.dividendsPaid > 1_000) {
        cause = "Excessive capital distributions while underlying earnings deteriorated";
      }
      const macro = macroDifficultyFor(s);
      s.gameOver = {
        reason: "critically_undercapitalized",
        severity: "bad",
        msg: `BANK FAILED at Y${yearNum}Q${qNum}. CET1 ${fmtPct(ratios.cet1)} · Tier 1 Leverage ${fmtPct(ratios.tier1Lev)} — both below PCA "critically undercapitalized" thresholds. FDIC has been appointed receiver. Macro: ${macro.label}.`,
        cause,
        stats: {
          finalCET1: ratios.cet1, finalTier1Lev: ratios.tier1Lev,
          finalNPL: ratios.nplRatio, finalAOCI: s.bs.aoci,
          finalEq: totalEquity(s.bs), creditRiskBank: s.creditRiskBank || 0,
          ltd: ratios.ltd,
          macroDifficulty: macro.label, macroScore: macro.score,
          recessionQtrs: macro.recessionQtrs, lateCycleQtrs: macro.lateCycleQtrs, badEventCount: macro.badEventCount,
          failedAtQ: s.quarter,
        },
      };
      log.push({ q, type: "bad", msg: s.gameOver.msg });
      return;
    }
    if (ratios.cet1 < 0.065 || ratios.tier1Lev < 0.05) {
      log.push({ q, type: "warn", msg: `PCA WARNING: Capital below Well Capitalized thresholds. Discretionary capital actions restricted.` });
    }
    const wasLowLiq = s._wasLowLiq === true;
    const isLowLiq = ratios.onHandLiq < 0.06;
    if (isLowLiq && !wasLowLiq) {
      log.push({ q, type: "warn", msg: `LIQUIDITY ALERT: On-hand liquidity dropped to ${fmtPct(ratios.onHandLiq)} — below prudent minimum.` });
    } else if (!isLowLiq && wasLowLiq) {
      log.push({ q, type: "good", msg: `LIQUIDITY RECOVERED: On-hand liquidity restored to ${fmtPct(ratios.onHandLiq)}.` });
    }
    s._wasLowLiq = isLowLiq;

    const wasHighNpl = s._wasHighNpl === true;
    const isHighNpl = ratios.nplRatio > 0.04;
    if (isHighNpl && !wasHighNpl) {
      log.push({ q, type: "warn", msg: `ASSET QUALITY: NPL ratio elevated to ${fmtPct(ratios.nplRatio)}. Examiners will scrutinize.` });
    }
    s._wasHighNpl = isHighNpl;

    if (s._forcedFhlbDraw && s._forcedFhlbDraw > 1000) {
      log.push({ q, type: "warn", msg: `FORCED FUNDING: Auto-drew ${fmt$(s._forcedFhlbDraw)} of FHLB advances to plug cash shortfall. Loan growth outpacing deposits — manage funding gap actively.` });
    }
    s._forcedFhlbDraw = 0;

    if (s._forcedAfsLossLog && s._forcedAfsLossLog < -50) {
      log.push({ q, type: "warn", msg: `REALIZED AFS LOSS: ${fmt$(s._forcedAfsLossLog)} flowed through retained earnings from forced securities sale.` });
    }
    s._forcedAfsLossLog = 0;

    const wholesaleRatio = s._wholesaleRatio || 0;
    const wasHighWholesale = s._wasHighWholesale === true;
    const isHighWholesale = wholesaleRatio > 0.15;
    if (isHighWholesale && !wasHighWholesale) {
      log.push({ q, type: "warn", msg: `WHOLESALE FUNDING: FHLB + brokered CDs now ${fmtPct(wholesaleRatio, 1)} of (deposits + wholesale) — examiners view above 15% as concentration risk.` });
    }
    s._wasHighWholesale = isHighWholesale;

    // Indirect-loan concentration: warn 15%, capital-distribution restriction at 25%.
    const indirectShare = s.bs.loansGross > 0 ? (s.bs.loansIndirect || 0) / s.bs.loansGross : 0;
    const wasIndWarn = s._wasIndirectWarn === true;
    const wasIndCrit = s._wasIndirectCritical === true;
    const isIndWarn = indirectShare > 0.15 && indirectShare <= 0.25;
    const isIndCrit = indirectShare > 0.25;
    if (isIndCrit && !wasIndCrit) {
      log.push({ q, type: "bad", msg: `INDIRECT CONCENTRATION CRITICAL: ${fmtPct(indirectShare, 1)} of loans through dealer/broker channels. Examiners imposing capital-distribution restriction — dividends and buybacks suspended until reduced below 25%.` });
    } else if (isIndWarn && !wasIndWarn && !wasIndCrit) {
      log.push({ q, type: "warn", msg: `INDIRECT CONCENTRATION ELEVATED: ${fmtPct(indirectShare, 1)} of loans now indirect/broker-sourced — above 15% draws examiner scrutiny. Lower stickiness in stress.` });
    }
    s._wasIndirectWarn = isIndWarn;
    s._wasIndirectCritical = isIndCrit;

    const crb = s.creditRiskBank || 0;
    const wasElevated = s._wasElevatedRisk === true;
    const wasCritical = s._wasCriticalRisk === true;
    const isElevated = crb >= 2_000 && crb < 5_000;
    const isCritical = crb >= 5_000;
    if (isCritical && !wasCritical) {
      log.push({ q, type: "bad", msg: `LATENT CREDIT RISK CRITICAL: ${fmt$(crb)} of expected losses embedded in loan book from prior aggressive originations. Recession will surface these rapidly.` });
    } else if (isElevated && !wasElevated && !wasCritical) {
      log.push({ q, type: "warn", msg: `LATENT CREDIT RISK ELEVATED: ${fmt$(crb)} of expected future losses building from recent loan vintage decisions. Tightening underwriting now reduces further accrual but does not undo prior buildup.` });
    }
    s._wasElevatedRisk = isElevated;
    s._wasCriticalRisk = isCritical;

    const eq = totalEquity(s.bs);
    const aociPct = eq > 0 ? s.bs.aoci / eq : 0;
    const wasMaterialIRR = s._wasMaterialIRR === true;
    const wasSevereIRR = s._wasSevereIRR === true;
    const isMaterialIRR = aociPct < -0.10 && aociPct >= -0.20;
    const isSevereIRR = aociPct < -0.20;
    if (isSevereIRR && !wasSevereIRR) {
      log.push({ q, type: "bad", msg: `IRR DAMAGE SEVERE: AOCI now ${fmtPct(aociPct, 1)} of equity. Tangible book value impaired — share price will compress sharply. Reduce duration to limit further losses.` });
    } else if (isMaterialIRR && !wasMaterialIRR && !wasSevereIRR) {
      log.push({ q, type: "warn", msg: `IRR DAMAGE MATERIAL: AOCI now ${fmtPct(aociPct, 1)} of equity. Long-duration securities carrying meaningful unrealized losses. Consider duration reduction.` });
    }
    s._wasMaterialIRR = isMaterialIRR;
    s._wasSevereIRR = isSevereIRR;
  }

  function estimatedSharePrice(s, ratios) {
    const eq = totalEquity(s.bs);
    const bvps = eq / s.bs.sharesOutstanding;

    let pb = 0.75;
    if (ratios.roe > 0.06) pb = 0.95;
    if (ratios.roe > 0.09) pb = 1.15;
    if (ratios.roe > 0.12) pb = 1.40;
    if (ratios.roe > 0.15) pb = 1.65;
    if (ratios.roe < 0.03) pb = 0.65;
    if (ratios.roe < 0) pb = 0.50;

    let cycleMult = 1.0;
    if (s.macro.cycle === "expansion") cycleMult = 1.05;
    if (s.macro.cycle === "late_cycle") cycleMult = 0.88;
    if (s.macro.cycle === "recession") cycleMult = 0.70;
    if (s.macro.cycle === "recovery") cycleMult = 0.85;
    pb *= cycleMult;

    if (ratios.nplRatio > 0.02) pb *= 0.90;
    if (ratios.nplRatio > 0.04) pb *= 0.80;
    if (ratios.cet1 < 0.09) pb *= 0.85;
    if (ratios.cet1 < 0.07) pb *= 0.70;

    const aociPctEquity = s.bs.aoci / Math.max(eq, 1);
    if (aociPctEquity < -0.10) pb *= 0.92;
    if (aociPctEquity < -0.20) pb *= 0.85;

    const marketNoise = 1 + noise(s.runSeed, s.quarter, 9, 0.04);
    pb *= marketNoise;

    return Math.max(bvps * 0.30, bvps * pb);
  }

  // expose
  window.BankEngine = {
    INITIAL_STATE,
    runQuarter,
    computeRatios,
    estimatedSharePrice,
    computeSatisfaction, retentionMult, distributionCapacity,
    computeFeeIncome, computeFeeLoadPts, computeAdLift,
    totalAssets, totalDeposits, totalLiabilities, totalEquity,
    fmt$, fmtPct, fmtBps, clamp, noise,
  };
})();

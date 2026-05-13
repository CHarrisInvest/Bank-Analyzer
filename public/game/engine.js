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
    const c = cur == null ? 70 : cur;
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
    let incidentsPerAcct = 0.25;
    if (s.macro.cycle === "recession") incidentsPerAcct = 0.32;
    if (s.macro.cycle === "late_cycle") incidentsPerAcct = 0.28;

    const ofFee = Math.max(0, s.levers.overdraftFee || 0);
    const overdraftIncidentsK = accountsK * incidentsPerAcct;
    // Overdraft elasticity: very high fees drive opt-outs / account closures, dampening volume.
    const ofVolumeMult = ofFee > 30 ? Math.max(0.55, 1 - (ofFee - 30) * 0.012) : 1.0;
    const overdraftIncome = overdraftIncidentsK * ofFee * ofVolumeMult;     // K-incidents * $/incident = $K

    const monthlyFee = Math.max(0, s.levers.monthlyMaintenance || 0);
    // Roughly 22% of accounts pay maintenance (rest meet waiver minimums). Higher fee -> waiver shopping.
    const payShare = monthlyFee > 12 ? Math.max(0.08, 0.22 - (monthlyFee - 12) * 0.008) : 0.22;
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
  // Translate fees into satisfaction pts. Overdraft is more punishing per dollar than
  // maintenance (regulator-watched, customer-watched). Range targets roughly -10..0.
  function computeFeeLoadPts(s) {
    const ofFee = Math.max(0, s.levers.overdraftFee || 0);
    const monthlyFee = Math.max(0, s.levers.monthlyMaintenance || 0);
    const ofPts = ofFee <= 20 ? 0 : -Math.min(7, (ofFee - 20) * 0.20);    // $30 -> -2, $45 -> -5, $55 -> -7
    const mntPts = monthlyFee <= 5 ? 0 : -Math.min(4, (monthlyFee - 5) * 0.20); // $10 -> -1, $20 -> -3, $25 -> -4
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
      overdraftFee: 30,
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
    satisfaction: 70,
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
          log.push({ q, type: "bad", msg: `CFPB INQUIRY: regulator opened consent-order proceeding citing overdraft practices averaging $${avg.toFixed(0)}/item. One-time charge ${fmt$(oneTime)} hits non-int expense; reputational drag on satisfaction for 6 quarters.` });
        }
      }
    }
    if (cfpbEvent) {
      // Surface as additional non-int expense in this quarter via the event hook.
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
    const loans = computeLoans(s, event, nf);
    const securities = computeSecurities(s, event, prevFedFunds, prev10y);
    const is = computeIncome(s, deposits, loans, securities, event, nf, prevFedFunds);
    if (cfpbEvent) {
      is.nonintExpense += cfpbEvent.oneTime;
      is.nonintExpenseVariable = (is.nonintExpenseVariable || 0) + cfpbEvent.oneTime;
      is.cfpbCharge = cfpbEvent.oneTime;
      is.pretax -= cfpbEvent.oneTime;
      const newTax = Math.max(0, is.pretax * 0.21);
      is.netIncome = is.pretax - newTax;
      is.tax = newTax;
    }
    is._nf = nf;
    is._event = event;

    const preActionRatios = computeRatios(s, is);
    applyCapitalActions(s, is, preActionRatios);
    applyBalanceSheet(s, deposits, loans, securities, is);
    const ratios = computeRatios(s, is);
    checkRegulatory(s, ratios, log);

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
    });

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
      const initialBVPS = 32_000 / 2_000;
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
      const TIERS = ["F","D","C","B","A","A+"];
      let tierIdx;
      if (totalReturn > 1.20) tierIdx = 5;
      else if (totalReturn > 1.00) tierIdx = 4;
      else if (totalReturn > 0.75) tierIdx = 3;
      else if (totalReturn > 0.50) tierIdx = 2;
      else if (totalReturn > 0.25) tierIdx = 1;
      else tierIdx = 0;

      // CET1 gates per tier (A+:10%, A:9%, B:8%, C:7%). If short, drop tier until satisfied.
      const cet1Gates = [0, 0, 0.07, 0.08, 0.09, 0.10];
      while (tierIdx > 0 && ratios.cet1 < cet1Gates[tierIdx]) tierIdx -= 1;

      // L/D modifier: outside 0.65-1.15 drops one tier. A+ requires lower-bound 0.75.
      const ldOuterOk = ratios.ltd >= 0.65 && ratios.ltd <= 1.15;
      const ldA1Ok = ratios.ltd >= 0.75 && ratios.ltd <= 1.15;
      const ldPenalty = !ldOuterOk;
      if (tierIdx === 5 && !ldA1Ok) tierIdx = 4;
      if (ldPenalty && tierIdx > 0) tierIdx -= 1;

      // Customer satisfaction modifier: < 50 drops one tier.
      const satPenalty = (s.satisfaction ?? 70) < 50;
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
      if (tierIdx < 5 && totalReturn > 1.20) {
        // Reconstruct what dropped us
        if (ratios.cet1 < 0.10) modifiersApplied.push(`CET1 ${(ratios.cet1*100).toFixed(1)}% short of 10%`);
        if (!ldA1Ok && ldOuterOk) modifiersApplied.push(`L/D ${ratios.ltd.toFixed(2)} outside A+ band 0.75-1.15`);
      }
      if (ldPenalty) modifiersApplied.push(`L/D ${ratios.ltd.toFixed(2)} outside healthy band 0.65-1.15`);
      if (satPenalty) modifiersApplied.push(`customer satisfaction ${Math.round(s.satisfaction)} below 50`);

      s.gameOver = {
        reason: "victory",
        severity: totalReturn > 1.00 ? "good" : totalReturn > 0.50 ? "neutral" : "warn",
        grade, gradeMsg,
        msg: `10 years complete. Total shareholder return ${(totalReturn*100).toFixed(0)}%. BVPS $${initialBVPS.toFixed(2)} → $${finalBVPS.toFixed(2)} (${(bvpsCAGR*100).toFixed(1)}% CAGR), cumulative dividends $${totalDividendsPerShare.toFixed(2)}/share. Avg ROE ${(annualizedROE*100).toFixed(1)}%. Final CET1 ${(ratios.cet1*100).toFixed(1)}%, L/D ${ratios.ltd.toFixed(2)}x. Macro difficulty: ${macroDifficulty}.`,
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
    if (q > 4 && q % 4 === 0 && r > 0.55) {
      return { severity: "warn", type: "exam", msg: "REGULATORY EXAM: OCC on-site this quarter. Findings depend on capital, asset quality, liquidity." };
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

  function computeDeposits(s, event, nf = { depositGrowth: 0 }) {
    const d = s.bs.deposits;
    const lev = s.levers;
    const m = s.macro;
    const sat = s.satisfaction != null ? s.satisfaction : 70;

    let organicGrowth = 0.0075;
    if (m.cycle === "expansion") organicGrowth = 0.013;
    if (m.cycle === "late_cycle") organicGrowth = 0.005;
    if (m.cycle === "recession") organicGrowth = -0.005;
    if (m.cycle === "recovery") organicGrowth = 0.008;
    organicGrowth = organicGrowth * (1 + nf.depositGrowth);
    // Satisfaction multiplies organic flow (retention + slight acquisition tilt).
    organicGrowth *= retentionMult(sat);

    const pricingPremium = lev.depositPricing * 0.004;

    let pricingFlowAdj;
    if (lev.depositPricing < 0) {
      pricingFlowAdj = lev.depositPricing * 0.020;
    } else if (lev.depositPricing > 0) {
      pricingFlowAdj = lev.depositPricing * 0.008 - Math.max(0, lev.depositPricing - 1) * 0.001;
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

    // Marketing spend log-curve: $100K +1.5%, $200K +2.1%, $500K +3.1%
    const adSpend = Math.max(0, lev.depositAdSpend || 0);
    const adBoost = adSpend > 0 ? 0.012 * Math.log(1 + adSpend / 40) : 0;

    const totalNet = totalDeposits(d) * (organicGrowth + pricingFlowAdj + adBoost + totalForcedDrain);

    const intShare = clamp(0.45 + (m.fedFunds - 0.02) * 3, 0.45, 0.80);
    const niShare = 1 - intShare;
    const niDelta = totalNet * niShare;
    const icDelta = totalNet * intShare * 0.20;
    const smmDelta = totalNet * intShare * 0.45;
    const tdDelta = totalNet * intShare * 0.35;

    return {
      deltaNI: niDelta, deltaIC: icDelta, deltaSMM: smmDelta, deltaTD: tdDelta,
      pricingPremium,
      weightedCost: depositCost(s, pricingPremium),
      satFlightPct,
    };
  }

  function depositCost(s, pricingPremium) {
    const m = s.macro;
    const d = s.bs.deposits;
    const total = totalDeposits(d);
    const niCost = 0;
    const icCost = clamp(m.fedFunds * 0.12 + pricingPremium, 0, 0.085);
    const smmCost = clamp(m.fedFunds * 0.60 + pricingPremium, 0, 0.085);
    const tdCost = clamp(m.fedFunds * 0.90 + pricingPremium, 0, 0.085);
    return (
      (d.noninterest * niCost +
        d.interestChecking * icCost +
        d.savingsMM * smmCost +
        d.timeDeposits * tdCost) /
      total
    );
  }

  function computeLoans(s, event, nf = { loanGrowth: 0 }) {
    const lev = s.levers;
    const m = s.macro;

    let demand = 0.010;
    if (m.cycle === "expansion") demand = 0.0150;
    if (m.cycle === "late_cycle") demand = 0.0100;
    if (m.cycle === "recession") demand = -0.0025;
    if (m.cycle === "recovery") demand = 0.0075;
    demand = demand * (1 + nf.loanGrowth);

    let leverMult;
    if (lev.loanGrowth === -2) leverMult = -0.5;
    else if (lev.loanGrowth === -1) leverMult = 0.25;
    else if (lev.loanGrowth === 0) leverMult = 1.0;
    else if (lev.loanGrowth === 1) leverMult = 2.0;
    else if (lev.loanGrowth === 2) leverMult = 3.0;

    const underwriteDrag = lev.underwriting * 0.004;

    let netGrowth = demand * leverMult - underwriteDrag;
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
    const indirectYieldHit = -indBoostPct > 0 ? -0.0030 : (indStep > 0 ? -0.0030 : 0);
    const newYield = clamp(baseYield + underwritePremium + aggressivenessYieldHit + indirectYieldHit, 0.03, 0.10);
    const portfolioYield = blendedLoanYield(s) * 0.95 + newYield * 0.05;

    return {
      delta: grossNew,
      portfolioYield, newYield,
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
    const totalSecurities = s.bs.securitiesAFS + s.bs.securitiesHTM;
    const aociChange = -duration * dRate * totalSecurities;

    const pullToPar = -s.bs.aoci * 0.015;

    const curveSlope = m.treasury10y - m.fedFunds;
    const termPremium = duration * 0.0010 + Math.max(curveSlope, -0.005) * 0.6;
    const secYield = clamp(m.fedFunds + termPremium, 0.012, 0.085);

    return { aociChange: aociChange + pullToPar, yield: secYield, duration };
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
    const fhlbCost = s.macro.fedFunds + 0.005;
    const subDebtCost = bs.subDebtAvgCost || 0;
    const brokeredCDCost = s.macro.fedFunds + 0.0035;

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
    const targetACL = avgLoans * targetAclRate;
    const aclShortfall = Math.max(0, (targetACL - (bs.acl - netChargeOffs)) * 0.25);
    const expectedLossOnNew = newNplFormation * 0.40;

    const modelProvision = Math.max(0, netChargeOffs + aclShortfall + expectedLossOnNew * 0.5);
    const provision =
      s.decisions.provisionOverride !== null && s.decisions.provisionOverride !== undefined
        ? s.decisions.provisionOverride
        : modelProvision;

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

    // Fixed: premises, core systems, base headcount. Doesn't move with quarterly noise.
    const nonintExpenseFixed = (bs.premises * 0.18 + 800) / 4 + mortFixedCost;
    // Variable: asset-scaled compensation + ops costs + event shocks + deposit ad spend.
    let nonintExpenseVariable = (totalAssets(bs) * 0.0233 / 4) * (1 + nf.nonintExpense);
    nonintExpenseVariable += Math.max(0, s.levers.depositAdSpend || 0);
    if (event?.type === "fraud") nonintExpenseVariable += 350;
    if (event?.type === "exam") nonintExpenseVariable += 80;
    let nonintExpense = nonintExpenseFixed + nonintExpenseVariable;

    const pretax = nii + nonintIncome - nonintExpense - provision;
    const tax = Math.max(0, pretax * 0.21);
    const netIncome = pretax - tax;

    return {
      interestIncome, interestExpense, nii,
      provision, netChargeOffs, grossChargeOffs,
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
      brokeredCDInterest: ((s.bs.brokeredCDs || 0) * brokeredCDCost) / 4,
      overdraftIncome: feeStreams.overdraftIncome,
      maintenanceIncome: feeStreams.maintenanceIncome,
      interchangeIncome: feeStreams.interchangeIncome,
      serviceCharges: feeStreams.serviceCharges,
      accountCountK: feeStreams.accountsK,
      dividendsPaid: 0, repurchases: 0,
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
      const newTax = Math.max(0, is.pretax * 0.21);
      is.netIncome = is.pretax - newTax;
      is.tax = newTax;
    }

    const totalDiv = dec.dividendPerShare * s.bs.sharesOutstanding;
    is.dividendsPaid = totalDiv;
    is.repurchases = dec.repurchaseAmount;

    s.bs.retainedEarnings += is.netIncome - totalDiv;

    if (dec.repurchaseAmount > 0) {
      const price = estimatedSharePrice(s, ratios);
      const sharesBought = dec.repurchaseAmount / price;
      s.bs.sharesOutstanding -= sharesBought;
      s.bs.commonEquity -= dec.repurchaseAmount;
      s.bs.cash -= dec.repurchaseAmount;
      is.repurchasePrice = price;
      is.repurchaseShares = sharesBought;
    }

    s.bs.cash -= totalDiv;
    s.bs.borrowingsFHLB = Math.max(0, s.bs.borrowingsFHLB + dec.fhlbAdvance);
    s.bs.cash += dec.fhlbAdvance;

    // Sub debt: positive = new issuance (locks in current Fed Funds + 100bps), negative = call.
    // Avg cost is principal-weighted; calls reduce principal but keep blended rate; reaching zero resets.
    const subDelta = Math.max(-s.bs.subDebt, dec.subDebtIssuance);
    if (subDelta > 0) {
      const newRate = s.macro.fedFunds + 0.01;
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

    bs.acl += is.provision - is.netChargeOffs;
    bs.acl = Math.max(0, bs.acl);
    const cures = bs.npl * 0.06;
    bs.npl = Math.max(0, bs.npl + is.newNplFormation - is.grossChargeOffs - cures);

    s.creditRiskBank = Math.max(0, (s.creditRiskBank || 0) + (is.riskBankAccrual || 0) - (is.riskBankRelease || 0));

    bs.aoci += securities.aociChange;

    const cashChange = depDelta + is.netIncome + is.provision - loans.delta;
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
    return totalDeposits(bs.deposits) + bs.borrowingsFHLB + bs.subDebt + bs.otherLiab;
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

    const rwa =
      bs.cash * 0 +
      bs.securitiesAFS * 0.2 +
      bs.securitiesHTM * 0.2 +
      bs.loansGross * 0.85 +
      bs.premises * 1.0 +
      bs.otherAssets * 1.0;

    const cet1Cap = bs.commonEquity + bs.retainedEarnings + bs.aoci - 0;
    const cet1 = cet1Cap / rwa;
    const tier1Cap = cet1Cap;
    const totalCap = tier1Cap + bs.subDebt + bs.acl;
    const tier1Lev = tier1Cap / ta;
    const totalCapRatio = totalCap / rwa;
    const tce = eq / ta;

    const nplRatio = bs.npl / bs.loansGross;
    const aclCoverage = bs.acl / bs.loansGross;
    const aclToNpl = bs.npl > 0 ? bs.acl / bs.npl : 999;

    const ltd = bs.loansGross / totalDeposits(bs.deposits);
    const onHandLiq = (bs.cash + bs.securitiesAFS) / ta;
    const efficiency = is.nonintExpense / (is.nii + is.nonintIncome);

    return {
      nim, roa, roe, cet1, tier1Lev, totalCapRatio, tce,
      nplRatio, aclCoverage, aclToNpl, ltd, onHandLiq, efficiency, rwa,
      earningAssets,
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
    computeSatisfaction, retentionMult,
    computeFeeIncome, computeFeeLoadPts,
    totalAssets, totalDeposits, totalLiabilities, totalEquity,
    fmt$, fmtPct, fmtBps, clamp, noise,
  };
})();

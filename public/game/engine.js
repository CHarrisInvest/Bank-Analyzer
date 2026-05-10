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
      subDebt: 0,
      subDebtAvgCost: 0,
      otherLiab: 3_000,

      commonEquity: 25_000,
      retainedEarnings: 8_200,
      sharesOutstanding: 2_000,
    },

    lastIS: {
      interestIncome: 4_212,
      interestExpense: 1_431,
      nii: 2_781,
      provision: 198,
      nonintIncome: 603,
      nonintExpense: 2_352,
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
    },

    levers: {
      loanGrowth: 0,
      underwriting: 0,
      depositPricing: 0,
      securitiesDuration: 1,
      liquidityTarget: 1,
    },

    decisions: {
      dividendPerShare: 0.18,
      repurchaseAmount: 0,
      fhlbAdvance: 0,
      subDebtIssuance: 0,
      provisionOverride: null,
    },

    creditRiskBank: 0,
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

    const event = (forecastMode || q === 1) ? null : maybeEvent(s, q);
    if (event) log.push({ q, type: event.severity, msg: event.msg });

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

    const deposits = computeDeposits(s, event, nf);
    const loans = computeLoans(s, event, nf);
    const securities = computeSecurities(s, event, prevFedFunds, prev10y);
    const is = computeIncome(s, deposits, loans, securities, event, nf);
    is._nf = nf;
    is._event = event;

    const preActionRatios = computeRatios(s, is);
    applyCapitalActions(s, is, preActionRatios);
    applyBalanceSheet(s, deposits, loans, securities, is);
    const ratios = computeRatios(s, is);
    checkRegulatory(s, ratios, log);

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
    });

    s.lastIS = is;
    s.quarter = q + 1;
    s.log = [...s.log, ...log].slice(-100);

    s.decisions = {
      dividendPerShare: s.decisions.dividendPerShare,
      repurchaseAmount: 0,
      fhlbAdvance: 0,
      subDebtIssuance: 0,
      provisionOverride: null,
    };

    if (s.quarter > 40 && !s.gameOver) {
      const finalEq = totalEquity(s.bs);
      const finalShares = s.bs.sharesOutstanding;
      const finalBVPS = finalEq / finalShares;
      const finalPx = estimatedSharePrice(s, ratios);
      const initialBVPS = 32_000 / 2_000;
      const bvpsCAGR = Math.pow(finalBVPS / initialBVPS, 1/10) - 1;
      const totalReturn = (finalBVPS - initialBVPS) / initialBVPS;
      const annualizedROE = s.history.length > 0
        ? s.history.reduce((sum, h) => sum + h.roe, 0) / s.history.length
        : 0;
      const totalDividendsPaid = s.history.reduce((sum, h) => sum + (h.dividendsPaid || 0), 0);
      const totalDividendsPerShare = s.history.reduce((sum, h) => sum + (h.dividendPerShare || 0), 0);

      let grade = "F";
      let gradeMsg = "";
      if (bvpsCAGR > 0.10 && ratios.cet1 > 0.10) {
        grade = "A+"; gradeMsg = "OUTSTANDING — top decile bank performance";
      } else if (bvpsCAGR > 0.08 && ratios.cet1 > 0.08) {
        grade = "A"; gradeMsg = "Excellent — strong franchise built";
      } else if (bvpsCAGR > 0.06 && ratios.cet1 > 0.07) {
        grade = "B"; gradeMsg = "Good — solid steward of shareholder capital";
      } else if (bvpsCAGR > 0.03 && ratios.cet1 > 0.07) {
        grade = "C"; gradeMsg = "Adequate — bank survived but underperformed peers";
      } else if (bvpsCAGR > 0) {
        grade = "D"; gradeMsg = "Marginal — barely created shareholder value";
      } else {
        grade = "F"; gradeMsg = "Failed — destroyed shareholder value despite avoiding regulatory failure";
      }

      s.gameOver = {
        reason: "victory",
        severity: bvpsCAGR > 0.05 ? "good" : "neutral",
        grade, gradeMsg,
        msg: `10 years complete. Tenure: BVPS grew from $${initialBVPS.toFixed(2)} to $${finalBVPS.toFixed(2)} (${(bvpsCAGR*100).toFixed(1)}% CAGR). Avg ROE ${(annualizedROE*100).toFixed(1)}%. Final CET1 ${(ratios.cet1*100).toFixed(1)}%.`,
        stats: {
          finalBVPS, initialBVPS, bvpsCAGR, totalReturn,
          annualizedROE, finalCET1: ratios.cet1, finalEq,
          finalAssets: totalAssets(s.bs), finalPx,
          totalDividendsPaid, totalDividendsPerShare,
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
    } else if (m.cycle === "recession" && m.cycleQuarters > 3 && r > 0.5) {
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
    if (r > 0.88) {
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

    let organicGrowth = 0.0075;
    if (m.cycle === "expansion") organicGrowth = 0.013;
    if (m.cycle === "late_cycle") organicGrowth = 0.005;
    if (m.cycle === "recession") organicGrowth = -0.005;
    if (m.cycle === "recovery") organicGrowth = 0.008;
    organicGrowth = organicGrowth * (1 + nf.depositGrowth);

    const pricingPremium = lev.depositPricing * 0.004;

    let pricingFlowAdj;
    if (lev.depositPricing < 0) {
      pricingFlowAdj = lev.depositPricing * 0.020;
    } else if (lev.depositPricing > 0) {
      pricingFlowAdj = lev.depositPricing * 0.008 - Math.max(0, lev.depositPricing - 1) * 0.001;
    } else {
      pricingFlowAdj = 0;
    }

    let runDrain = 0;
    if (event?.type === "deposit_run") runDrain = -0.10;
    if (event?.type === "competitor_exit") runDrain = 0.015;

    const totalNet = totalDeposits(d) * (organicGrowth + pricingFlowAdj + runDrain);

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
    const grossNew = s.bs.loansGross * netGrowth;

    const baseYield = m.treasury10y + 0.020;
    const underwritePremium = -lev.underwriting * 0.0025;
    const aggressivenessYieldHit = lev.loanGrowth * -0.0025;
    const newYield = clamp(baseYield + underwritePremium + aggressivenessYieldHit, 0.03, 0.10);
    const portfolioYield = blendedLoanYield(s) * 0.95 + newYield * 0.05;

    return { delta: grossNew, portfolioYield, newYield };
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

  function computeIncome(s, deposits, loans, securities, event, nf = { nplFormation: 0, nonintIncome: 0, nonintExpense: 0 }) {
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

    const interestExpense =
      (avgDeposits * depCost + bs.borrowingsFHLB * fhlbCost + bs.subDebt * subDebtCost) / 4;

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
    const newNplFormation = Math.max(0,
      baselineNplFormation * (1 + nf.nplFormation) + riskBankRelease
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

    let nonintIncome =
      ((totalAssets(bs) * 0.006 + 400) / 4) * (1 + nf.nonintIncome) + (event?.severity === "good" ? 60 : 0);
    if (event?.type === "fee_income") nonintIncome += 250;

    let nonintExpense =
      ((totalAssets(bs) * 0.0245 + 1_200) / 4) * (1 + nf.nonintExpense);
    if (event?.type === "fraud") nonintExpense += 350;
    if (event?.type === "exam") nonintExpense += 80;

    const pretax = nii + nonintIncome - nonintExpense - provision;
    const tax = Math.max(0, pretax * 0.21);
    const netIncome = pretax - tax;

    return {
      interestIncome, interestExpense, nii,
      provision, netChargeOffs, grossChargeOffs,
      nonintIncome, nonintExpense,
      pretax, tax, netIncome,
      avgLoans, avgSecurities, avgDeposits,
      loanYield, depCost,
      nplDelta: 0, newNplFormation,
      riskBankAccrual, riskBankRelease,
      dividendsPaid: 0, repurchases: 0,
    };
  }

  function applyCapitalActions(s, is, ratios) {
    const dec = s.decisions;
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
  }

  function applyBalanceSheet(s, deposits, loans, securities, is) {
    const bs = s.bs;
    bs.deposits.noninterest += deposits.deltaNI;
    bs.deposits.interestChecking += deposits.deltaIC;
    bs.deposits.savingsMM += deposits.deltaSMM;
    bs.deposits.timeDeposits += deposits.deltaTD;

    const depDelta = deposits.deltaNI + deposits.deltaIC + deposits.deltaSMM + deposits.deltaTD;

    bs.loansGross += loans.delta;
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
    const totalFunding = totalDeposits(bs.deposits) + bs.borrowingsFHLB;
    s._wholesaleRatio = totalFunding > 0 ? bs.borrowingsFHLB / totalFunding : 0;
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
      } else if ((s.creditRiskBank || 0) > 3_000) {
        cause = "Latent credit risk from prior aggressive originations surfaced in stress";
      } else if (ratios.ltd > 1.20) {
        cause = "Aggressive loan growth funded by wholesale borrowing, then funding gap closed";
      } else if (s.lastIS.repurchases > 5_000 || s.lastIS.dividendsPaid > 1_000) {
        cause = "Excessive capital distributions while underlying earnings deteriorated";
      }
      s.gameOver = {
        reason: "critically_undercapitalized",
        severity: "bad",
        msg: `BANK FAILED at Y${yearNum}Q${qNum}. CET1 ${fmtPct(ratios.cet1)} · Tier 1 Leverage ${fmtPct(ratios.tier1Lev)} — both below PCA "critically undercapitalized" thresholds. FDIC has been appointed receiver.`,
        cause,
        stats: {
          finalCET1: ratios.cet1, finalTier1Lev: ratios.tier1Lev,
          finalNPL: ratios.nplRatio, finalAOCI: s.bs.aoci,
          finalEq: totalEquity(s.bs), creditRiskBank: s.creditRiskBank || 0,
          ltd: ratios.ltd,
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
      log.push({ q, type: "warn", msg: `WHOLESALE FUNDING: FHLB advances now ${fmtPct(wholesaleRatio, 1)} of (deposits + FHLB) — examiners view above 15% as concentration risk.` });
    }
    s._wasHighWholesale = isHighWholesale;

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
    totalAssets, totalDeposits, totalLiabilities, totalEquity,
    fmt$, fmtPct, fmtBps, clamp, noise,
  };
})();

import React, { useState, useMemo } from "react";

// =====================================================================
// FIRST MERIDIAN BANK — SINGLE-BRANCH CALL REPORT SIMULATION
// Turn-based quarterly bank management simulation.
// All figures in $ thousands unless noted.
// =====================================================================

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
// pseudo-random noise: deterministic given (runSeed, quarter, channel)
const noise = (runSeed, quarter, channel = 0, scale = 1) => {
  const seed = runSeed * 1009 + quarter * 31 + channel * 7;
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return ((x - Math.floor(x)) - 0.5) * 2 * scale;
};

// ---------- initial state ----------
const INITIAL_STATE = {
  quarter: 1, // quarter number (1 = Q1 Y1)
  gameOver: null, // null | { reason, severity }
  runSeed: Math.floor(Math.random() * 100000), // re-roll on reset for game-to-game variety

  // Macro environment
  macro: {
    fedFunds: 0.045,
    treasury10y: 0.042,
    unemployment: 0.041,
    gdpGrowth: 0.022,
    cycle: "expansion", // expansion | late_cycle | recession | recovery
    cycleQuarters: 0,
  },

  // Balance sheet ($ thousands)
  // Constructed to balance: TA = TL + Equity = 335,000
  // Capital ratios at start: CET1 ~14.5%, Tier 1 Leverage ~9.5%, Equity/Assets 9.5%
  // (matches typical community bank rather than over-capitalized starting position)
  bs: {
    cash: 18_000,
    securitiesAFS: 55_000, // available-for-sale
    securitiesHTM: 25_000,
    aoci: -1_200, // accumulated unrealized loss on securities (sits in equity)
    loansGross: 231_710,
    acl: 2_710, // 1.17% of loans
    npl: 1_738, // 0.75% of loans
    premises: 4_500,
    otherAssets: 3_500,
    // Total assets = 18 + 55 + 25 + 231.71 - 2.71 + 4.5 + 3.5 = 335.0M

    deposits: {
      noninterest: 75_000,
      interestChecking: 60_000,
      savingsMM: 95_000,
      timeDeposits: 70_000,
    }, // total deposits = 300M, LTD = 77%
    borrowingsFHLB: 0,
    subDebt: 0,
    otherLiab: 3_000,
    // Total liabilities = 303M

    commonEquity: 25_000, // common stock + APIC
    retainedEarnings: 8_200,
    // AOCI (-1,200) included in equity below
    // Total equity = 25 + 8.2 - 1.2 = 32.0M
    // TL + E = 303 + 32 = 335M ✓
    sharesOutstanding: 2_000, // thousands of shares
  },

  // Trailing income statement (last quarter actual)
  // Calibrated to match what the model produces at initial macro state
  // (FF 4.5%, T10Y 4.2%, default duration lever) so Q1 transitions cleanly without step-down.
  lastIS: {
    interestIncome: 4_212,
    interestExpense: 1_431,
    nii: 2_781,
    provision: 198,
    nonintIncome: 603,
    nonintExpense: 2_352, // matches formula: (335,000 × 0.0245 + 1,200) / 4
    pretax: 834,
    tax: 175,
    netIncome: 659,
    dividendsPaid: 360, // $0.18/sh × 2,000K shares
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

  // Player levers (default moderate)
  levers: {
    loanGrowth: 0, // -2 = run-off, 0 = market-rate growth, +2 = aggressive
    underwriting: 0, // -2 loose, 0 standard, +2 tight
    depositPricing: 0, // -2 cheap (lose deposits) to +2 premium (attract)
    securitiesDuration: 1, // 0 short to 3 long
    liquidityTarget: 1, // 0 lean to 3 fortress
  },

  // Decisions for current quarter (reset each quarter)
  decisions: {
    dividendPerShare: 0.18, // $/share quarterly = ~$0.72/yr, ~30% payout at default ROA
    repurchaseAmount: 0, // $ thousands of stock to buy back
    fhlbAdvance: 0, // + draw / - paydown
    subDebtIssuance: 0,
    provisionOverride: null, // null = model calculates, number = override
  },

  // Credit risk bank — accumulates "latent" credit risk from past aggressive growth and loose underwriting.
  // Builds when lever decisions are risky; gets "released" as NPL formation in future quarters,
  // accelerated by recession. Represents the seasoning lag between origination and default.
  // Units: $ thousands of expected future losses currently embedded in the loan book.
  creditRiskBank: 0,

  // History for charts
  history: [],

  // Event log
  log: [
    { q: 0, type: "system", msg: "Welcome to First Meridian Bank, NA. You are CEO of a $400M single-branch community bank. Make it through 40 quarters without failing." },
  ],

  // Pending event for display
  pendingEvent: null,

  // Last quarter's forecast (captured at advance time) — used to show projected vs actual variance
  lastForecast: null,
};

// ---------- core simulation ----------
function runQuarter(state, opts = {}) {
  const { forecastMode = false } = opts;
  const s = JSON.parse(JSON.stringify(state)); // deep copy
  const q = s.quarter;
  const log = [];

  // capture rate at start of quarter for AOCI delta calc
  const prevFedFunds = s.macro.fedFunds;
  const prev10y = s.macro.treasury10y;

  // 1. evolve macro environment
  const macroChange = evolveMacro(s, q);

  // Log cycle transitions (significant for player)
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

  // Log notable rate moves (>= 50 bps either direction — meaningful policy actions)
  const dFedFunds = s.macro.fedFunds - prevFedFunds;
  if (!forecastMode && Math.abs(dFedFunds) >= 0.005) {
    const direction = dFedFunds > 0 ? "RAISES" : "CUTS";
    const bps = Math.abs(dFedFunds * 10000).toFixed(0);
    log.push({
      q,
      type: "info",
      msg: `FOMC ${direction} rates ${bps} bps to ${fmtPct(s.macro.fedFunds, 2)}. UST 10Y at ${fmtPct(s.macro.treasury10y, 2)}.`,
    });
  }

  // 2. random events (suppressed in forecast mode and in Q1 — Q1 establishes a clean baseline)
  const event = (forecastMode || q === 1) ? null : maybeEvent(s, q);
  if (event) log.push({ q, type: event.severity, msg: event.msg });

  // Operational noise — small ±2-3% randomness on flows in actual mode.
  // Zero in forecast mode so projections show base-case "expected" outcomes.
  // Also zero in Q1 so the first quarter's actuals cleanly transition from the
  // seeded Q0 starting state without an apparent step-down from operational noise.
  // This represents real-world variance: deposit attrition surprises, lumpy
  // loan payoffs, fee income timing, one-time expense items, etc.
  const suppressNoise = forecastMode || q === 1;
  const nf = suppressNoise ? {
    depositGrowth: 0, loanGrowth: 0, nplFormation: 0,
    nonintIncome: 0, nonintExpense: 0,
  } : {
    depositGrowth: noise(s.runSeed, q, 10, 0.15),    // ±15% on incremental deposit flow
    loanGrowth: noise(s.runSeed, q, 11, 0.15),       // ±15% on incremental loan flow
    nplFormation: noise(s.runSeed, q, 12, 0.30),     // ±30% on new NPL formation (lumpy)
    nonintIncome: noise(s.runSeed, q, 13, 0.06),     // ±6% on noninterest income
    nonintExpense: noise(s.runSeed, q, 14, 0.03),    // ±3% on noninterest expense
  };

  // 3. compute deposit flows based on pricing lever, macro, events
  const deposits = computeDeposits(s, event, nf);

  // 4. compute loan flows based on growth lever, underwriting, demand
  const loans = computeLoans(s, event, nf);

  // 5. compute securities portfolio mark + reinvestment
  const securities = computeSecurities(s, event, prevFedFunds, prev10y);

  // 6. compute income statement
  const is = computeIncome(s, deposits, loans, securities, event, nf);

  // Save the noise factors and event on the IS so the variance UI can attribute the surprise
  is._nf = nf;
  is._event = event;

  // 7. apply capital actions (divs, repurchases, debt)
  // Pricing for buybacks reflects state at the time of execution: BS hasn't
  // updated yet but IS for this quarter is known to the market.
  const preActionRatios = computeRatios(s, is);
  applyCapitalActions(s, is, preActionRatios);

  // 8. update balance sheet
  applyBalanceSheet(s, deposits, loans, securities, is);

  // 9. compute regulatory ratios & check for failure
  const ratios = computeRatios(s, is);
  checkRegulatory(s, ratios, log);

  // 10. record history
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
  });

  s.lastIS = is;
  s.quarter = q + 1;

  // append log (keep most recent 100 entries)
  s.log = [...s.log, ...log].slice(-100);

  // reset decisions for next quarter
  s.decisions = {
    dividendPerShare: s.decisions.dividendPerShare,
    repurchaseAmount: 0,
    fhlbAdvance: 0,
    subDebtIssuance: 0,
    provisionOverride: null,
  };

  // win condition: 10 years complete
  if (s.quarter > 40 && !s.gameOver) {
    const finalEq = totalEquity(s.bs);
    const finalShares = s.bs.sharesOutstanding;
    const finalBVPS = finalEq / finalShares;
    const finalPx = estimatedSharePrice(s, ratios);
    // Initial BVPS was $40.2M / 2,000K = $20.10
    const initialBVPS = 32_000 / 2_000; // $16.00 per share at start
    const bvpsCAGR = Math.pow(finalBVPS / initialBVPS, 1/10) - 1;
    // Cumulative dividends per share (approximation: total div paid / avg shares)
    const cumDivsPerShare = s.history.reduce((sum, h, i) => {
      // Approximate dividends per quarter from history
      return sum;
    }, 0);
    // Total shareholder return: BVPS growth + dividends paid out
    // We track this via history length and final state
    // Simple TSR proxy: (finalBVPS - initialBVPS) / initialBVPS
    const totalReturn = (finalBVPS - initialBVPS) / initialBVPS;
    const annualizedROE = s.history.length > 0
      ? s.history.reduce((sum, h) => sum + h.roe, 0) / s.history.length
      : 0;

    // Grade: based on a weighted combo of BVPS growth, ROE, and capital strength
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
      grade,
      gradeMsg,
      msg: `10 years complete. Tenure: BVPS grew from $${initialBVPS.toFixed(2)} to $${finalBVPS.toFixed(2)} (${(bvpsCAGR*100).toFixed(1)}% CAGR). Avg ROE ${(annualizedROE*100).toFixed(1)}%. Final CET1 ${(ratios.cet1*100).toFixed(1)}%.`,
      stats: {
        finalBVPS, initialBVPS, bvpsCAGR, totalReturn,
        annualizedROE, finalCET1: ratios.cet1, finalEq,
        finalAssets: totalAssets(s.bs), finalPx,
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

  // Cycle transitions (probabilistic but bounded)
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

  // Rate moves driven by cycle (FOMC quarterly drift)
  // Expansion: typically slow tightening, ~25-50 bps/qtr after warming up
  // Late cycle: peaking and starting to consider cuts
  // Recession: aggressive cuts (~75-125 bps/qtr)
  // Recovery: small accommodative cuts continuing
  let dRate = 0;
  if (m.cycle === "expansion") dRate = 0.0015 + noise(rs, q, 2, 0.003);
  if (m.cycle === "late_cycle") dRate = 0.0025 + noise(rs, q, 2, 0.005);
  if (m.cycle === "recession") dRate = -0.010 + noise(rs, q, 2, 0.005);
  if (m.cycle === "recovery") dRate = -0.0030 + noise(rs, q, 2, 0.004);

  m.fedFunds = clamp(m.fedFunds + dRate, 0.0025, 0.085);

  // Increase mean reversion speed slightly so 10Y tracks FF in expansion
  // but still allows inversions to persist 3-5 quarters
  let targetSpread = 0.0075;
  if (m.cycle === "late_cycle") targetSpread = -0.0025; // curve inversion
  if (m.cycle === "recession") targetSpread = 0.0125;   // steepening as Fed cuts
  if (m.cycle === "recovery") targetSpread = 0.0150;    // bear steepener

  const target10y = m.fedFunds + targetSpread;
  const meanRevSpeed = 0.22;
  const t10yShock = noise(rs, q, 3, 0.005);
  m.treasury10y = clamp(
    m.treasury10y + (target10y - m.treasury10y) * meanRevSpeed + t10yShock,
    0.015,
    0.085
  );

  // Unemployment / GDP track cycle
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

  // Tier 1: serious events (rare)
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

  // Tier 2: minor flavor events using a separate channel for variety
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

  // Baseline organic deposit growth by cycle (quarterly rates)
  // Target: ~4-6% annualized in expansion, ~2-3% in late-cycle, ~0% recession
  let organicGrowth = 0.0075; // ~3% annualized baseline
  if (m.cycle === "expansion") organicGrowth = 0.013; // ~5.3% annualized
  if (m.cycle === "late_cycle") organicGrowth = 0.005;
  if (m.cycle === "recession") organicGrowth = -0.005;
  if (m.cycle === "recovery") organicGrowth = 0.008;

  // Apply realistic operational noise to organic growth (±25% on the incremental flow)
  organicGrowth = organicGrowth * (1 + nf.depositGrowth);

  // Pricing lever: -2 = price well below market (bleed deposits hard), +2 = top-of-market (attract aggressively)
  // Each step ≈ 40 bps premium/discount vs market (160 bps total range across the lever).
  // This is meaningful enough to genuinely affect cost of funds AND volume.
  const pricingPremium = lev.depositPricing * 0.004;

  // Volume response to pricing — ASYMMETRIC and STEEPER:
  // Discounting (negative lever) drives LINEAR balance loss as customers shop rate.
  //   At -2: losing ~4% of balances per quarter (~17% annualized).
  // Premium pricing (positive lever) attracts new deposits but with DIMINISHING returns
  //   because the local market has finite rate-shoppable money.
  //   At +2: gaining ~1.5% of balances per quarter (~6% annualized).
  let pricingFlowAdj;
  if (lev.depositPricing < 0) {
    pricingFlowAdj = lev.depositPricing * 0.020;
  } else if (lev.depositPricing > 0) {
    pricingFlowAdj = lev.depositPricing * 0.008 - Math.max(0, lev.depositPricing - 1) * 0.001;
  } else {
    pricingFlowAdj = 0;
  }

  // Deposit run: pull 5-8% of existing balances out (mostly rate-sensitive)
  // Deposit run: pull 8-12% of existing balances out (mostly rate-sensitive)
  // Severe runs in real life (SVB, FRC) drained 25-50%, but our event represents
  // a more typical local competitive event
  let runDrain = 0;
  if (event?.type === "deposit_run") runDrain = -0.10;
  if (event?.type === "competitor_exit") runDrain = 0.015; // small inflow boost

  const totalNet = totalDeposits(d) * (organicGrowth + pricingFlowAdj + runDrain);

  // Distribute deposit changes across categories (weights sum to 1)
  // Non-interest sticky, interest-bearing more rate-sensitive
  const intShare = clamp(0.45 + (m.fedFunds - 0.02) * 3, 0.45, 0.80);
  const niShare = 1 - intShare;
  const niDelta = totalNet * niShare;
  const icDelta = totalNet * intShare * 0.20;
  const smmDelta = totalNet * intShare * 0.45;
  const tdDelta = totalNet * intShare * 0.35;
  // ic + smm + td weights = 1.0 of intShare; ni = niShare; so total = 1.0 ✓

  // In a deposit run, drain falls heavier on rate-sensitive (savings/MM, time)
  if (event?.type === "deposit_run") {
    // already split proportionally; tilt slightly more to MMM/Time by adjusting weights post-hoc
    // (kept simple here)
  }

  return {
    deltaNI: niDelta,
    deltaIC: icDelta,
    deltaSMM: smmDelta,
    deltaTD: tdDelta,
    pricingPremium,
    weightedCost: depositCost(s, pricingPremium),
  };
}

function depositCost(s, pricingPremium) {
  const m = s.macro;
  const d = s.bs.deposits;
  const total = totalDeposits(d);
  // category betas
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

  // Loan demand by macro cycle (quarterly rates, target community bank growth norms)
  // Expansion: ~6% annualized, Late: ~4%, Recession: -1%, Recovery: ~3%
  let demand = 0.010;
  if (m.cycle === "expansion") demand = 0.0150;
  if (m.cycle === "late_cycle") demand = 0.0100;
  if (m.cycle === "recession") demand = -0.0025;
  if (m.cycle === "recovery") demand = 0.0075;

  // Apply operational noise (lumpy originations and payoffs)
  // Reduced noise scale so the lever signal is clearly visible
  demand = demand * (1 + nf.loanGrowth);

  // loanGrowth lever: -2 (active run-off) to +2 (aggressive)
  // Wider response range: -2 forces 50% loan reduction effort, +2 produces 3x market growth
  // -2 → -0.5 (active payoff/no new origination)
  // -1 → 0.25 (slow/selective origination)
  //  0 → 1.0 (capture market-rate demand)
  // +1 → 2.0 (chase growth, accept lower-quality)
  // +2 → 3.0 (aggressive, including buying loan participations)
  let leverMult;
  if (lev.loanGrowth === -2) leverMult = -0.5;
  else if (lev.loanGrowth === -1) leverMult = 0.25;
  else if (lev.loanGrowth === 0) leverMult = 1.0;
  else if (lev.loanGrowth === 1) leverMult = 2.0;
  else if (lev.loanGrowth === 2) leverMult = 3.0;

  // Underwriting: tighter underwriting reduces approval rate
  const underwriteDrag = lev.underwriting * 0.004; // +2 tight = -80 bps qtrly (~-3.2% annl)

  let netGrowth = demand * leverMult - underwriteDrag;
  if (event?.type === "loan_pipeline") netGrowth += 0.010;
  if (event?.type === "credit_shock") netGrowth -= 0.005;
  if (event?.type === "competitor_exit") netGrowth += 0.005;
  if (event?.type === "cre_concern") netGrowth -= 0.003;

  // Hard cap quarterly growth at +6% / qtr (~26% annl) — even at max lever, physical limits apply
  // Floor at -3% qtr (-12% annl) for runoff
  netGrowth = clamp(netGrowth, -0.030, 0.060);

  const grossNew = s.bs.loansGross * netGrowth;

  // Yield on new loans
  // Community bank loan yield = T10Y + ~200 bps risk premium on diversified portfolio
  const baseYield = m.treasury10y + 0.020;
  const underwritePremium = -lev.underwriting * 0.0025;
  // Aggressive growth = compete on price = lower yields. Lever +2 sacrifices ~50bps.
  const aggressivenessYieldHit = lev.loanGrowth * -0.0025;
  const newYield = clamp(baseYield + underwritePremium + aggressivenessYieldHit, 0.03, 0.10);

  // Weighted portfolio yield drift (book yield is sticky, ~5% of book reprices each quarter)
  const portfolioYield = blendedLoanYield(s) * 0.95 + newYield * 0.05;

  return {
    delta: grossNew,
    portfolioYield,
    newYield,
  };
}

function blendedLoanYield(s) {
  // Seasoned community bank loan book: ~5.0% baseline at 4% T10Y
  return 0.050 + (s.macro.treasury10y - 0.04) * 0.4;
}

function computeSecurities(s, event, prevFedFunds, prev10y) {
  const lev = s.levers;
  const m = s.macro;

  // duration lever 0 (short, ~1y) to 3 (long, ~7y)
  const duration = 1 + lev.securitiesDuration * 2;

  // Mark-to-market: ΔPrice ≈ -Duration × ΔYield × Book
  // Apply to the FULL securities portfolio (AFS + HTM). This reflects the
  // expected post-2024 regulatory direction where AOCI from all securities
  // flows through capital ratios — eliminating the HTM accounting hideout.
  // Rate shock events apply additional curve shift on top of organic move.
  const dRate = (m.treasury10y - prev10y) + (event?.type === "rate_shock" ? 0.0100 : 0);
  const totalSecurities = s.bs.securitiesAFS + s.bs.securitiesHTM;
  const aociChange = -duration * dRate * totalSecurities;

  // Pull-to-par: ~1.5% of unrealized loss accretes back per quarter
  // (assumes blended portfolio average remaining maturity ~5 years)
  const pullToPar = -s.bs.aoci * 0.015;

  // Yield on securities portfolio
  // Book yield = Fed Funds + term premium based on duration and curve slope.
  const curveSlope = m.treasury10y - m.fedFunds;
  const termPremium = duration * 0.0010 + Math.max(curveSlope, -0.005) * 0.6;
  const secYield = clamp(m.fedFunds + termPremium, 0.012, 0.085);

  return {
    aociChange: aociChange + pullToPar,
    yield: secYield,
    duration,
  };
}

function computeIncome(s, deposits, loans, securities, event, nf = { nplFormation: 0, nonintIncome: 0, nonintExpense: 0 }) {
  const bs = s.bs;
  // average balances (approximation: current + projected)
  const avgLoans = bs.loansGross + loans.delta / 2;
  const avgSecurities = bs.securitiesAFS + bs.securitiesHTM;
  const avgCash = bs.cash;

  const loanYield = loans.portfolioYield;
  const cashYield = s.macro.fedFunds;
  const secYield = securities.yield;

  // Interest income (quarterly = annual / 4)
  const interestIncome =
    (avgLoans * loanYield + avgSecurities * secYield + avgCash * cashYield) / 4;

  // Interest expense
  const avgDeposits =
    totalDeposits(bs.deposits) +
    (deposits.deltaNI + deposits.deltaIC + deposits.deltaSMM + deposits.deltaTD) / 2;
  const depCost = deposits.weightedCost;
  const fhlbCost = s.macro.fedFunds + 0.005;
  const subDebtCost = 0.07;

  const interestExpense =
    (avgDeposits * depCost + bs.borrowingsFHLB * fhlbCost + bs.subDebt * subDebtCost) / 4;

  const nii = interestIncome - interestExpense;

  // === CREDIT QUALITY CHAIN ===
  // 1) Past aggressive growth + loose underwriting builds "latent" credit risk
  //    that surfaces as NPL formation later (4-8 qtr seasoning lag in real life).
  // 2) The credit risk bank stores this latent risk and releases it gradually,
  //    accelerated dramatically in recession.
  // 3) New NPL formation = baseline cycle rate + release from risk bank
  // 4) NCOs migrate from NPL stock
  // 5) Provision sized to maintain ACL coverage

  // Cycle adjustment to NPL formation (annualized rates → quarterly /4)
  let cycleNplRate = 0.0040; // 40 bps annual baseline NPL formation in normal times
  if (s.macro.cycle === "late_cycle") cycleNplRate = 0.007;
  if (s.macro.cycle === "recession") cycleNplRate = 0.018;
  if (s.macro.cycle === "recovery") cycleNplRate = 0.010;

  const eventNplAdj = event?.type === "credit_shock" ? 0.025 : 0;

  // Add to credit risk bank: aggressive growth + loose underwriting deposit risk for later
  // At lever +2/+2 (aggressive growth, loose underwriting), this adds ~150 bps annual of latent risk.
  const riskBankAccrual =
    Math.max(0, s.levers.loanGrowth) * 0.0010 * avgLoans / 4 +    // aggressive growth adds risk
    Math.max(0, -s.levers.underwriting) * 0.0015 * avgLoans / 4;  // loose underwriting adds more

  // Release from risk bank: normal trickle in good times, accelerated in stress
  // Recession releases 25% of the bank per quarter (forces seasoning to surface)
  // Late cycle: 12%, Expansion: 5%, Recovery: 8%
  let riskBankReleaseRate = 0.05;
  if (s.macro.cycle === "late_cycle") riskBankReleaseRate = 0.12;
  if (s.macro.cycle === "recession") riskBankReleaseRate = 0.25;
  if (s.macro.cycle === "recovery") riskBankReleaseRate = 0.08;

  const riskBankRelease = (s.creditRiskBank || 0) * riskBankReleaseRate;

  const totalNplFormationRate = Math.max(0, cycleNplRate + eventNplAdj);
  const baselineNplFormation = avgLoans * totalNplFormationRate / 4;
  // Apply lumpy noise to baseline; risk bank release is on top
  const newNplFormation = Math.max(0,
    baselineNplFormation * (1 + nf.nplFormation) + riskBankRelease
  );

  // NCOs migrate from NPL stock — 10-15% per quarter typically migrates to charge-off
  // (40-50% annualized), with stress periods accelerating migration
  let ncoMigrationRate = 0.10;
  if (s.macro.cycle === "recession") ncoMigrationRate = 0.20;
  if (s.macro.cycle === "late_cycle") ncoMigrationRate = 0.13;
  const grossChargeOffs = bs.npl * ncoMigrationRate;
  const recoveries = grossChargeOffs * 0.15;
  const netChargeOffs = Math.max(0, grossChargeOffs - recoveries);

  // Provision: target ACL coverage based on cycle + cover new NPL formation + replenish NCOs
  // Post-CECL community banks typically run 1.0-1.3% ACL/Loans, building higher in stress
  const targetAclRate = 0.0115 + (s.macro.cycle === "recession" ? 0.004 : s.macro.cycle === "late_cycle" ? 0.0015 : 0);
  const targetACL = avgLoans * targetAclRate;
  const aclShortfall = Math.max(0, (targetACL - (bs.acl - netChargeOffs)) * 0.25); // close 25% of gap each qtr
  const expectedLossOnNew = newNplFormation * 0.40;

  const modelProvision = Math.max(0, netChargeOffs + aclShortfall + expectedLossOnNew * 0.5);
  const provision =
    s.decisions.provisionOverride !== null && s.decisions.provisionOverride !== undefined
      ? s.decisions.provisionOverride
      : modelProvision;

  // Noninterest income — target ~0.7% of assets annualized for community bank
  // At $343M baseline: 0.6% variable + $400K fixed annual = ~$2,460K annual = ~$615K/qtr
  let nonintIncome =
    ((totalAssets(bs) * 0.006 + 400) / 4) * (1 + nf.nonintIncome) + (event?.severity === "good" ? 60 : 0);
  if (event?.type === "fee_income") nonintIncome += 250;

  // Noninterest expense — target ~2.8% of assets annualized for single-branch community bank
  // At $343M baseline: 2.45% variable + $1,200K fixed annual = ~$9,604K annual = ~$2,401K/qtr
  // Fixed component represents branch overhead (rent, base staff, utilities) that doesn't scale linearly
  let nonintExpense =
    ((totalAssets(bs) * 0.0245 + 1_200) / 4) * (1 + nf.nonintExpense);
  if (event?.type === "fraud") nonintExpense += 350;
  if (event?.type === "exam") nonintExpense += 80; // exam fees / consulting

  const pretax = nii + nonintIncome - nonintExpense - provision;
  const tax = Math.max(0, pretax * 0.21);
  const netIncome = pretax - tax;

  return {
    interestIncome,
    interestExpense,
    nii,
    provision,
    netChargeOffs,
    grossChargeOffs,
    nonintIncome,
    nonintExpense,
    pretax,
    tax,
    netIncome,
    avgLoans,
    avgSecurities,
    avgDeposits,
    loanYield,
    depCost,
    nplDelta: 0, // legacy field, retained for compat
    newNplFormation,
    riskBankAccrual,
    riskBankRelease,
    dividendsPaid: 0, // filled in by capital actions
    repurchases: 0,
  };
}

function applyCapitalActions(s, is, ratios) {
  const dec = s.decisions;
  const totalDiv = dec.dividendPerShare * s.bs.sharesOutstanding;
  is.dividendsPaid = totalDiv;
  is.repurchases = dec.repurchaseAmount;

  s.bs.retainedEarnings += is.netIncome - totalDiv;

  if (dec.repurchaseAmount > 0) {
    // Execute at the estimated market price for this quarter (cycle/ROE/quality adjusted)
    const price = estimatedSharePrice(s, ratios);
    const sharesBought = dec.repurchaseAmount / price;
    s.bs.sharesOutstanding -= sharesBought;
    // Treasury stock is contra-equity — reduce common equity by purchase amount
    s.bs.commonEquity -= dec.repurchaseAmount;
    s.bs.cash -= dec.repurchaseAmount;
    // Record execution metrics on the IS for transparency
    is.repurchasePrice = price;
    is.repurchaseShares = sharesBought;
  }

  s.bs.cash -= totalDiv;

  // FHLB advance
  s.bs.borrowingsFHLB = Math.max(0, s.bs.borrowingsFHLB + dec.fhlbAdvance);
  s.bs.cash += dec.fhlbAdvance;

  // sub debt issuance
  s.bs.subDebt += dec.subDebtIssuance;
  s.bs.cash += dec.subDebtIssuance;
}

function applyBalanceSheet(s, deposits, loans, securities, is) {
  const bs = s.bs;
  bs.deposits.noninterest += deposits.deltaNI;
  bs.deposits.interestChecking += deposits.deltaIC;
  bs.deposits.savingsMM += deposits.deltaSMM;
  bs.deposits.timeDeposits += deposits.deltaTD;

  const depDelta = deposits.deltaNI + deposits.deltaIC + deposits.deltaSMM + deposits.deltaTD;

  // loans
  bs.loansGross += loans.delta;
  // ACL update: provision builds, NCOs draw down
  bs.acl += is.provision - is.netChargeOffs;
  bs.acl = Math.max(0, bs.acl);
  // NPL stock: + new formation - charge-offs - cures
  // Cures: 6% per quarter return to performing (~22% annualized)
  const cures = bs.npl * 0.06;
  bs.npl = Math.max(0, bs.npl + is.newNplFormation - is.grossChargeOffs - cures);

  // Update credit risk bank: accrue from current decisions, release to NPL formation
  // The released portion has already become NPL formation this quarter (above).
  s.creditRiskBank = Math.max(0, (s.creditRiskBank || 0) + (is.riskBankAccrual || 0) - (is.riskBankRelease || 0));

  // securities mark (AOCI doesn't move cash)
  bs.aoci += securities.aociChange;

  // Cash plug: sources & uses excluding capital actions (already handled)
  //  + Deposit growth (cash in)
  //  + Net income add-back of non-cash items (provision is non-cash, so + provision)
  //  - Loan growth (cash out)
  //  - Net charge-offs already reduce ACL not cash directly
  // Simplified: cashChange = depDelta + netIncome + provision (non-cash) - loans.delta
  const cashChange = depDelta + is.netIncome + is.provision - loans.delta;
  bs.cash += cashChange;

  // === LIQUIDITY POSTURE ===
  // The liquidityTarget lever genuinely affects cash vs securities allocation.
  // 0 (LEAN): minimum cash, sweep aggressively into securities — best NIM, weakest liquidity
  // 3 (FORTRESS): hold significant cash buffer — drags NIM but cushions stress
  // Cash yields Fed Funds; securities yield FF + curve premium + duration premium.
  // The yield spread between cash and securities is the real cost of liquidity.
  const cashTargetPct = 0.025 + s.levers.liquidityTarget * 0.025; // 2.5% lean → 10% fortress
  const targetCash = totalAssets(bs) * cashTargetPct;
  const minCash = totalAssets(bs) * 0.015; // hard floor below which we force borrow

  // Sweep excess cash into AFS only if we're above the player's target
  if (bs.cash > targetCash + 2_000) {
    const excess = bs.cash - targetCash;
    bs.cash -= excess;
    bs.securitiesAFS += excess;
  } else if (bs.cash < minCash) {
    // Need cash. First sell AFS up to a reasonable amount
    const shortfall = targetCash - bs.cash;
    const fromAFS = Math.min(shortfall, Math.max(0, bs.securitiesAFS - 5_000));
    if (fromAFS > 0) {
      // Realize proportional AOCI: AOCI attributable to this AFS sale =
      // total AOCI × (fromAFS / total securities), since AOCI now reflects both AFS and HTM.
      const totalSec = bs.securitiesAFS + bs.securitiesHTM;
      const realizedShare = fromAFS / totalSec;
      const realized = bs.aoci * realizedShare;
      bs.aoci -= realized;
      bs.securitiesAFS -= fromAFS;
      bs.cash += fromAFS;
      // Realized loss flows through retained earnings (net effect on equity is zero — internal reclass)
      bs.retainedEarnings += realized;
      if (realized < -50) {
        s._forcedAfsLossLog = realized;
      }
    }
    // Still short? Forced FHLB draw — flag for warning log
    if (bs.cash < minCash) {
      const draw = Math.ceil((minCash - bs.cash) / 1000) * 1000 + 2_000;
      bs.borrowingsFHLB += draw;
      bs.cash += draw;
      s._forcedFhlbDraw = (s._forcedFhlbDraw || 0) + draw;
    }
  }
  // If cash is below target but above minCash, gradually pull from AFS to rebuild
  // (only at fortress settings — lean players accept the lower cash level)
  else if (s.levers.liquidityTarget >= 2 && bs.cash < targetCash - 3_000 && bs.securitiesAFS > 15_000) {
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

  // Track wholesale funding ratio (FHLB + sub debt / total funding)
  const totalFunding = totalDeposits(bs.deposits) + bs.borrowingsFHLB + bs.subDebt;
  s._wholesaleRatio = (bs.borrowingsFHLB + bs.subDebt) / totalFunding;
}

function totalDeposits(d) {
  return d.noninterest + d.interestChecking + d.savingsMM + d.timeDeposits;
}
function totalAssets(bs) {
  return (
    bs.cash +
    bs.securitiesAFS +
    bs.securitiesHTM +
    bs.loansGross -
    bs.acl +
    bs.premises +
    bs.otherAssets
  );
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

  // Risk-weighted assets (simplified)
  const rwa =
    bs.cash * 0 +
    bs.securitiesAFS * 0.2 +
    bs.securitiesHTM * 0.2 +
    bs.loansGross * 0.85 + // blended
    bs.premises * 1.0 +
    bs.otherAssets * 1.0;

  // CET1 = common equity excl AOCI for non-AOCI-opt-in (simplified: include AOCI)
  const cet1Cap = bs.commonEquity + bs.retainedEarnings + bs.aoci - 0; // no intangibles modeled
  const cet1 = cet1Cap / rwa;
  const tier1Cap = cet1Cap;
  const totalCap = tier1Cap + bs.subDebt + bs.acl;
  const tier1Lev = tier1Cap / ta;
  const totalCapRatio = totalCap / rwa;
  const tce = (eq) / ta;

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
  // PCA thresholds
  if (ratios.cet1 < 0.045 || ratios.tier1Lev < 0.04) {
    // Diagnose the primary cause of failure
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
        finalCET1: ratios.cet1,
        finalTier1Lev: ratios.tier1Lev,
        finalNPL: ratios.nplRatio,
        finalAOCI: s.bs.aoci,
        finalEq: totalEquity(s.bs),
        creditRiskBank: s.creditRiskBank || 0,
        ltd: ratios.ltd,
      },
    };
    log.push({ q, type: "bad", msg: s.gameOver.msg });
    return;
  }
  if (ratios.cet1 < 0.065 || ratios.tier1Lev < 0.05) {
    log.push({ q, type: "warn", msg: `PCA WARNING: Capital below Well Capitalized thresholds. Discretionary capital actions restricted.` });
  }
  // Liquidity alert: only fire on transition into the alert state
  const wasLowLiq = s._wasLowLiq === true;
  const isLowLiq = ratios.onHandLiq < 0.06;
  if (isLowLiq && !wasLowLiq) {
    log.push({ q, type: "warn", msg: `LIQUIDITY ALERT: On-hand liquidity dropped to ${fmtPct(ratios.onHandLiq)} — below prudent minimum.` });
  } else if (!isLowLiq && wasLowLiq) {
    log.push({ q, type: "good", msg: `LIQUIDITY RECOVERED: On-hand liquidity restored to ${fmtPct(ratios.onHandLiq)}.` });
  }
  s._wasLowLiq = isLowLiq;

  // Asset quality: also only on transition
  const wasHighNpl = s._wasHighNpl === true;
  const isHighNpl = ratios.nplRatio > 0.04;
  if (isHighNpl && !wasHighNpl) {
    log.push({ q, type: "warn", msg: `ASSET QUALITY: NPL ratio elevated to ${fmtPct(ratios.nplRatio)}. Examiners will scrutinize.` });
  }
  s._wasHighNpl = isHighNpl;

  // Forced FHLB draw notification (when auto-rebalance had to plug)
  if (s._forcedFhlbDraw && s._forcedFhlbDraw > 1000) {
    log.push({ q, type: "warn", msg: `FORCED FUNDING: Auto-drew ${fmt$(s._forcedFhlbDraw)} of FHLB advances to plug cash shortfall. Loan growth outpacing deposits — manage funding gap actively.` });
  }
  s._forcedFhlbDraw = 0;

  if (s._forcedAfsLossLog && s._forcedAfsLossLog < -50) {
    log.push({ q, type: "warn", msg: `REALIZED AFS LOSS: ${fmt$(s._forcedAfsLossLog)} flowed through retained earnings from forced securities sale.` });
  }
  s._forcedAfsLossLog = 0;

  // Wholesale funding concentration warning
  const wholesaleRatio = s._wholesaleRatio || 0;
  const wasHighWholesale = s._wasHighWholesale === true;
  const isHighWholesale = wholesaleRatio > 0.15;
  if (isHighWholesale && !wasHighWholesale) {
    log.push({ q, type: "warn", msg: `WHOLESALE FUNDING: Non-deposit funding now ${fmtPct(wholesaleRatio, 1)} of total — examiners view above 15% as concentration risk.` });
  }
  s._wasHighWholesale = isHighWholesale;

  // Latent credit risk warnings — fires when the risk bank crosses key thresholds
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

  // Interest rate risk warnings — AOCI/equity threshold crossings
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

  // Base P/B multiple from profitability (ROE)
  let pb = 0.75;
  if (ratios.roe > 0.06) pb = 0.95;
  if (ratios.roe > 0.09) pb = 1.15;
  if (ratios.roe > 0.12) pb = 1.40;
  if (ratios.roe > 0.15) pb = 1.65;
  if (ratios.roe < 0.03) pb = 0.65;
  if (ratios.roe < 0) pb = 0.50;

  // Cycle multiple adjustment — markets re-rate banks across the cycle
  // Expansion: full multiple. Late: anticipate recession. Recession: stress discount.
  // Recovery: rebound but still discounted vs peak.
  let cycleMult = 1.0;
  if (s.macro.cycle === "expansion") cycleMult = 1.05;
  if (s.macro.cycle === "late_cycle") cycleMult = 0.88;
  if (s.macro.cycle === "recession") cycleMult = 0.70;
  if (s.macro.cycle === "recovery") cycleMult = 0.85;
  pb *= cycleMult;

  // Asset quality discount
  if (ratios.nplRatio > 0.02) pb *= 0.90;
  if (ratios.nplRatio > 0.04) pb *= 0.80; // compounds with above

  // Capital concerns
  if (ratios.cet1 < 0.09) pb *= 0.85;
  if (ratios.cet1 < 0.07) pb *= 0.70; // compounds — PCA territory crushes valuation

  // AOCI drag — market sees the underwater securities even in book equity
  // Heavy unrealized losses signal IRR mismanagement
  const aociPctEquity = s.bs.aoci / Math.max(eq, 1);
  if (aociPctEquity < -0.10) pb *= 0.92;
  if (aociPctEquity < -0.20) pb *= 0.85; // compounds

  // Small-cap community bank market noise (deterministic per quarter via runSeed)
  // ±4% random walk to prevent perfect timing
  const marketNoise = 1 + noise(s.runSeed, s.quarter, 9, 0.04);
  pb *= marketNoise;

  return Math.max(bvps * 0.30, bvps * pb); // floor at 30% of book (distressed)
}

// =====================================================================
// UI
// =====================================================================

const ACCENT = "#d4ff3a"; // electric lime
const ACCENT2 = "#ff5e3a"; // signal orange
const PAPER = "#0a0a0a";
const PANEL = "#141414";
const PANEL2 = "#1c1c1c";
const RULE = "#2a2a2a";
const TEXT = "#e8e6e1";
const MUTE = "#7a7670";
const RED = "#ff5e3a";
const GREEN = "#5cd97e";
const AMBER = "#ffb347";
const INFO = "#7ad9ff";

const FONT_DISP = `'JetBrains Mono', 'IBM Plex Mono', ui-monospace, monospace`;
const FONT_BODY = `'JetBrains Mono', 'IBM Plex Mono', ui-monospace, monospace`;
const FONT_NUM = `'JetBrains Mono', 'IBM Plex Mono', ui-monospace, monospace`;

export default function BankCEO() {
  const [state, setState] = useState(INITIAL_STATE);
  const [tab, setTab] = useState("overview");
  const [confirmAdvance, setConfirmAdvance] = useState(false);

  const ratios = useMemo(() => computeRatios(state, state.lastIS), [state]);
  const equity = totalEquity(state.bs);
  const ta = totalAssets(state.bs);
  const td = totalDeposits(state.bs.deposits);

  function setLever(name, v) {
    setState((s) => ({ ...s, levers: { ...s.levers, [name]: v } }));
  }
  function setDecision(name, v) {
    setState((s) => ({ ...s, decisions: { ...s.decisions, [name]: v } }));
  }
  function advance() {
    setState((s) => {
      // Capture the forecast (what the player saw) before running the actual quarter
      let capturedForecast = null;
      try {
        const preview = runQuarter(s, { forecastMode: true });
        capturedForecast = {
          q: s.quarter, // the quarter that's about to be realized
          is: preview.lastIS,
          ratios: computeRatios(preview, preview.lastIS),
          bs: {
            cash: preview.bs.cash,
            loansGross: preview.bs.loansGross,
            deposits: totalDeposits(preview.bs.deposits),
            equity: totalEquity(preview.bs),
            assets: totalAssets(preview.bs),
            aoci: preview.bs.aoci,
          },
        };
      } catch (e) {
        capturedForecast = null;
      }
      const next = runQuarter(s);
      next.lastForecast = capturedForecast;
      return next;
    });
    setConfirmAdvance(false);
  }
  function reset() {
    setState(INITIAL_STATE);
    setTab("overview");
  }

  const yearNum = Math.ceil(state.quarter / 4);
  const qNum = ((state.quarter - 1) % 4) + 1;

  // Forecast next quarter (preview)
  const forecast = useMemo(() => {
    try {
      const preview = runQuarter(state, { forecastMode: true });
      return {
        ratios: computeRatios(preview, preview.lastIS),
        is: preview.lastIS,
        bs: preview.bs,
        log: preview.log.slice(state.log.length),
        // Attribution data: deltas vs current state
        macroDelta: {
          dFedFunds: preview.macro.fedFunds - state.macro.fedFunds,
          d10y: preview.macro.treasury10y - state.macro.treasury10y,
          cycleChanged: preview.macro.cycle !== state.macro.cycle,
          newCycle: preview.macro.cycle,
          oldCycle: state.macro.cycle,
        },
        bsDelta: {
          dLoans: preview.bs.loansGross - state.bs.loansGross,
          dDeposits: totalDeposits(preview.bs.deposits) - totalDeposits(state.bs.deposits),
          dAOCI: preview.bs.aoci - state.bs.aoci,
        },
        // What's the actual Q+1 (forecast) net income vs current Q actual?
        prevActualNI: state.lastIS.netIncome,
      };
    } catch (e) {
      return null;
    }
  }, [state]);

  return (
    <div style={{
      minHeight: "100vh",
      background: PAPER,
      color: TEXT,
      fontFamily: FONT_BODY,
      fontSize: 13,
      lineHeight: 1.5,
      padding: 0,
      backgroundImage: `repeating-linear-gradient(0deg, transparent 0, transparent 3px, rgba(255,255,255,0.012) 3px, rgba(255,255,255,0.012) 4px)`,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=IBM+Plex+Mono:wght@300;400;500;700&display=swap');
        * { box-sizing: border-box; }
        button { font-family: inherit; }
        input[type=range] { accent-color: ${ACCENT}; }
        ::selection { background: ${ACCENT}; color: #000; }
        .blink { animation: blink 1.4s steps(2, start) infinite; }
        @keyframes blink { to { visibility: hidden; } }
      `}</style>

      {/* HEADER STRIP */}
      <div style={{
        borderBottom: `1px solid ${RULE}`,
        background: PANEL,
        padding: "10px 18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        flexWrap: "wrap",
      }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
          <div style={{ fontFamily: FONT_DISP, fontSize: 11, color: ACCENT, letterSpacing: 2, fontWeight: 700 }}>
            ▮▮ FIRST MERIDIAN BANK, NA
          </div>
          <div style={{ fontSize: 10, color: MUTE, letterSpacing: 1 }}>
            FFIEC RSSD #2840371 · OCC CHARTER #14209 · SINGLE-BRANCH COMMUNITY BANK
          </div>
        </div>
        <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
          <Stat label="QTR" value={`Y${yearNum} Q${qNum}`} />
          <Stat label="ASSETS" value={fmt$(ta)} />
          <Stat label="CET1" value={fmtPct(ratios.cet1)} accent={ratios.cet1 < 0.07 ? RED : ACCENT} />
          <Stat label="ROA" value={fmtPct(ratios.roa)} accent={ratios.roa > 0.01 ? GREEN : RED} />
          <Stat label="CYCLE" value={state.macro.cycle.toUpperCase().replace("_", " ")}
                accent={state.macro.cycle === "recession" ? RED : state.macro.cycle === "expansion" ? GREEN : AMBER} />
        </div>
      </div>

      {/* GAME OVER BANNER */}
      {state.gameOver && (
        <div style={{
          background: state.gameOver.reason === "victory" ? "#0a1f12" :
                      state.gameOver.severity === "bad" ? "#3a0e08" : "#1a1a1a",
          borderBottom: `2px solid ${
            state.gameOver.reason === "victory" ? GREEN :
            state.gameOver.severity === "bad" ? RED : AMBER
          }`,
          padding: "20px 24px",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24 }}>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: 11, letterSpacing: 2.5, fontWeight: 700,
                color: state.gameOver.reason === "victory" ? GREEN :
                       state.gameOver.severity === "bad" ? RED : AMBER,
              }}>
                {state.gameOver.reason === "victory" ? "▮▮▮ TENURE COMPLETE — 10 YEAR REVIEW" :
                 state.gameOver.severity === "bad" ? "▮▮▮ INSTITUTION FAILED" :
                 "▮▮▮ GAME OVER"}
              </div>
              <div style={{ marginTop: 6, fontSize: 13, color: TEXT, lineHeight: 1.5 }}>{state.gameOver.msg}</div>

              {/* Scorecard — only for victory */}
              {state.gameOver.reason === "victory" && state.gameOver.stats && (
                <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "auto 1fr", gap: 24, alignItems: "center" }}>
                  <div style={{
                    fontSize: 64, fontWeight: 800, color: GREEN, lineHeight: 1,
                    fontFamily: FONT_DISP, padding: "8px 24px",
                    border: `2px solid ${GREEN}`, background: "#0d2f17",
                  }}>
                    {state.gameOver.grade}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: TEXT, marginBottom: 8, fontWeight: 500 }}>
                      {state.gameOver.gradeMsg}
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, fontSize: 11 }}>
                      <div>
                        <div style={{ color: MUTE, fontSize: 9, letterSpacing: 1.5 }}>BVPS GROWTH</div>
                        <div style={{ color: state.gameOver.stats.bvpsCAGR > 0 ? GREEN : RED, fontFamily: FONT_NUM, fontSize: 16, fontWeight: 700 }}>
                          {(state.gameOver.stats.bvpsCAGR * 100).toFixed(1)}% CAGR
                        </div>
                        <div style={{ color: MUTE, fontSize: 10 }}>
                          ${state.gameOver.stats.initialBVPS.toFixed(2)} → ${state.gameOver.stats.finalBVPS.toFixed(2)}
                        </div>
                      </div>
                      <div>
                        <div style={{ color: MUTE, fontSize: 9, letterSpacing: 1.5 }}>AVG ROE</div>
                        <div style={{ color: state.gameOver.stats.annualizedROE > 0.09 ? GREEN : AMBER, fontFamily: FONT_NUM, fontSize: 16, fontWeight: 700 }}>
                          {(state.gameOver.stats.annualizedROE * 100).toFixed(1)}%
                        </div>
                        <div style={{ color: MUTE, fontSize: 10 }}>10-yr avg</div>
                      </div>
                      <div>
                        <div style={{ color: MUTE, fontSize: 9, letterSpacing: 1.5 }}>FINAL CET1</div>
                        <div style={{ color: state.gameOver.stats.finalCET1 > 0.10 ? GREEN : AMBER, fontFamily: FONT_NUM, fontSize: 16, fontWeight: 700 }}>
                          {(state.gameOver.stats.finalCET1 * 100).toFixed(1)}%
                        </div>
                        <div style={{ color: MUTE, fontSize: 10 }}>Capital strength</div>
                      </div>
                      <div>
                        <div style={{ color: MUTE, fontSize: 9, letterSpacing: 1.5 }}>SHARE PRICE</div>
                        <div style={{ color: TEXT, fontFamily: FONT_NUM, fontSize: 16, fontWeight: 700 }}>
                          ${state.gameOver.stats.finalPx.toFixed(2)}
                        </div>
                        <div style={{ color: MUTE, fontSize: 10 }}>Final market</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Failure post-mortem */}
              {state.gameOver.reason === "critically_undercapitalized" && state.gameOver.stats && (
                <div style={{ marginTop: 16 }}>
                  <div style={{
                    padding: "10px 14px",
                    background: "#1f0808",
                    borderLeft: `3px solid ${RED}`,
                    fontSize: 12,
                    marginBottom: 12,
                  }}>
                    <span style={{ color: RED, letterSpacing: 1, fontWeight: 700, fontSize: 10 }}>ROOT CAUSE: </span>
                    <span style={{ color: TEXT }}>{state.gameOver.cause}</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, fontSize: 11 }}>
                    <div>
                      <div style={{ color: MUTE, fontSize: 9, letterSpacing: 1.5 }}>FINAL CET1</div>
                      <div style={{ color: RED, fontFamily: FONT_NUM, fontSize: 16, fontWeight: 700 }}>
                        {(state.gameOver.stats.finalCET1 * 100).toFixed(2)}%
                      </div>
                      <div style={{ color: MUTE, fontSize: 10 }}>PCA threshold: 4.5%</div>
                    </div>
                    <div>
                      <div style={{ color: MUTE, fontSize: 9, letterSpacing: 1.5 }}>FINAL NPL</div>
                      <div style={{ color: state.gameOver.stats.finalNPL > 0.03 ? RED : AMBER, fontFamily: FONT_NUM, fontSize: 16, fontWeight: 700 }}>
                        {(state.gameOver.stats.finalNPL * 100).toFixed(2)}%
                      </div>
                      <div style={{ color: MUTE, fontSize: 10 }}>Asset quality</div>
                    </div>
                    <div>
                      <div style={{ color: MUTE, fontSize: 9, letterSpacing: 1.5 }}>FINAL AOCI</div>
                      <div style={{ color: state.gameOver.stats.finalAOCI < -2_000 ? RED : AMBER, fontFamily: FONT_NUM, fontSize: 16, fontWeight: 700 }}>
                        {fmt$(state.gameOver.stats.finalAOCI)}
                      </div>
                      <div style={{ color: MUTE, fontSize: 10 }}>IRR damage</div>
                    </div>
                    <div>
                      <div style={{ color: MUTE, fontSize: 9, letterSpacing: 1.5 }}>LATENT RISK</div>
                      <div style={{ color: state.gameOver.stats.creditRiskBank > 1_000 ? RED : AMBER, fontFamily: FONT_NUM, fontSize: 16, fontWeight: 700 }}>
                        {fmt$(state.gameOver.stats.creditRiskBank)}
                      </div>
                      <div style={{ color: MUTE, fontSize: 10 }}>Embedded losses</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <button onClick={reset} style={btnPrimary}>NEW GAME →</button>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 380px", gap: 0 }}>
        {/* MAIN COLUMN */}
        <div style={{ padding: "18px", borderRight: `1px solid ${RULE}` }}>
          {/* TAB STRIP */}
          <div style={{ display: "flex", gap: 0, marginBottom: 16, borderBottom: `1px solid ${RULE}` }}>
            {[
              ["overview", "OVERVIEW"],
              ["callreport", "CALL REPORT"],
              ["levers", "STRATEGY LEVERS"],
              ["capital", "CAPITAL ACTIONS"],
              ["history", "HISTORY"],
            ].map(([k, label]) => (
              <button key={k} onClick={() => setTab(k)} style={{
                background: "transparent",
                border: "none",
                borderBottom: tab === k ? `2px solid ${ACCENT}` : "2px solid transparent",
                color: tab === k ? ACCENT : MUTE,
                padding: "10px 14px",
                fontSize: 11,
                letterSpacing: 1.5,
                cursor: "pointer",
                fontWeight: 500,
                fontFamily: FONT_DISP,
              }}>
                {label}
              </button>
            ))}
          </div>

          {tab === "overview" && <OverviewTab state={state} ratios={ratios} forecast={forecast} />}
          {tab === "callreport" && <CallReportTab state={state} ratios={ratios} />}
          {tab === "levers" && <LeversTab state={state} setLever={setLever} />}
          {tab === "capital" && <CapitalTab state={state} setDecision={setDecision} ratios={ratios} />}
          {tab === "history" && <HistoryTab history={state.history} />}
        </div>

        {/* RIGHT RAIL */}
        <div style={{ padding: 0, background: PANEL, minHeight: "calc(100vh - 50px)", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "16px 16px 12px", borderBottom: `1px solid ${RULE}` }}>
            <div style={{ fontSize: 10, letterSpacing: 2, color: MUTE, marginBottom: 8 }}>MACRO TAPE</div>
            <Row label="Fed Funds" value={fmtPct(state.macro.fedFunds, 2)} />
            <Row label="UST 10Y" value={fmtPct(state.macro.treasury10y, 2)} />
            <Row label="Unemployment" value={fmtPct(state.macro.unemployment, 1)} />
            <Row label="GDP (annl)" value={fmtPct(state.macro.gdpGrowth, 1)} />
          </div>

          <div style={{ padding: "12px 16px", borderBottom: `1px solid ${RULE}` }}>
            <div style={{ fontSize: 10, letterSpacing: 2, color: MUTE, marginBottom: 8 }}>FORECAST · Q+1</div>
            {forecast ? (
              <>
                <Row label="Net Income" value={fmt$(forecast.is.netIncome)}
                     accent={forecast.is.netIncome > state.lastIS.netIncome ? GREEN : RED} />
                <Row label="NIM" value={fmtPct(forecast.ratios.nim)} />
                <Row label="CET1" value={fmtPct(forecast.ratios.cet1)}
                     accent={forecast.ratios.cet1 < 0.07 ? RED : forecast.ratios.cet1 > ratios.cet1 ? GREEN : AMBER} />
                <Row label="LTD Ratio" value={fmtPct(forecast.ratios.ltd, 1)} />
                <Row label="NPL Ratio" value={fmtPct(forecast.ratios.nplRatio)}
                     accent={forecast.ratios.nplRatio > 0.03 ? RED : ACCENT} />
              </>
            ) : <div style={{ color: MUTE }}>—</div>}
          </div>

          {/* EVENT LOG */}
          <div style={{ padding: "12px 16px", flex: 1, overflowY: "auto", maxHeight: 360 }}>
            <div style={{ fontSize: 10, letterSpacing: 2, color: MUTE, marginBottom: 8 }}>EVENT LOG</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 11 }}>
              {[...state.log].reverse().map((e, i) => (
                <div key={i} style={{
                  borderLeft: `2px solid ${
                    e.type === "bad" ? RED : e.type === "warn" ? AMBER :
                    e.type === "good" ? GREEN : e.type === "info" ? INFO : RULE
                  }`,
                  paddingLeft: 8,
                }}>
                  <div style={{ color: MUTE, fontSize: 9, letterSpacing: 1 }}>
                    Q{e.q}
                  </div>
                  <div style={{ color: TEXT }}>{e.msg}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ADVANCE BUTTON */}
          {!state.gameOver && (
            <div style={{ borderTop: `1px solid ${RULE}`, padding: 16 }}>
              {!confirmAdvance ? (
                <button onClick={() => setConfirmAdvance(true)} style={{ ...btnPrimary, width: "100%" }}>
                  COMMIT QUARTER · ADVANCE →
                </button>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ fontSize: 11, color: AMBER }}>
                    Confirm: lock in levers and capital decisions for Y{yearNum}Q{qNum}.
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={advance} style={{ ...btnPrimary, flex: 1 }}>CONFIRM</button>
                    <button onClick={() => setConfirmAdvance(false)} style={{ ...btnGhost, flex: 1 }}>CANCEL</button>
                  </div>
                </div>
              )}
              <button onClick={reset} style={{ ...btnGhost, width: "100%", marginTop: 8 }}>
                RESET SIMULATION
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------- subviews ----------
function OverviewTab({ state, ratios, forecast }) {
  const ta = totalAssets(state.bs);
  return (
    <div>
      <SectionHeader title="EXECUTIVE DASHBOARD" subtitle="QUARTERLY SNAPSHOT" />

      {/* KPI grid: 4 cols x 3 rows */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: RULE, marginBottom: 20 }}>
        <KPI label="TOTAL ASSETS" value={fmt$(ta)} sub={fmt$(ta - state.bs.cash) + " earning"} />
        <KPI label="NET INCOME" value={fmt$(state.lastIS.netIncome)} sub={`ROA ${fmtPct(ratios.roa)} · ROE ${fmtPct(ratios.roe)}`}
             accent={state.lastIS.netIncome > 0 ? GREEN : RED} />
        <KPI label="NIM" value={fmtPct(ratios.nim)} sub={`Yield ${fmtPct(state.lastIS.loanYield, 2)} · Cost ${fmtPct(state.lastIS.depCost, 2)}`} />
        <KPI label="CET1 RATIO" value={fmtPct(ratios.cet1)}
             sub={ratios.cet1 > 0.10 ? "Well capitalized" : ratios.cet1 > 0.07 ? "Adequate" : "Below threshold"}
             accent={ratios.cet1 < 0.07 ? RED : ratios.cet1 < 0.10 ? AMBER : GREEN} />
        <KPI label="LOAN-TO-DEPOSIT" value={fmtPct(ratios.ltd, 1)} sub={ratios.ltd > 0.95 ? "Tight" : "Comfortable"} />
        <KPI label="NPL RATIO" value={fmtPct(ratios.nplRatio)} sub={`ACL coverage ${fmtPct(ratios.aclCoverage)}`}
             accent={ratios.nplRatio > 0.03 ? RED : GREEN} />
        <KPI label="ON-HAND LIQ" value={fmtPct(ratios.onHandLiq, 1)} sub="Cash + AFS / assets"
             accent={ratios.onHandLiq < 0.08 ? AMBER : ACCENT} />
        <KPI label="LATENT CREDIT RISK"
             value={fmt$(state.creditRiskBank || 0)}
             sub={
               (state.creditRiskBank || 0) < 500 ? "Negligible" :
               (state.creditRiskBank || 0) < 2_000 ? "Building" :
               (state.creditRiskBank || 0) < 5_000 ? "Elevated" : "Critical"
             }
             accent={
               (state.creditRiskBank || 0) < 500 ? GREEN :
               (state.creditRiskBank || 0) < 2_000 ? AMBER :
               RED
             } />
        <KPI label="TCE / ASSETS" value={fmtPct(ratios.tce, 2)}
             sub={`Tangible book ${fmt$(totalEquity(state.bs))}`}
             accent={ratios.tce < 0.05 ? RED : ratios.tce < 0.07 ? AMBER : GREEN} />
        <KPI label="AOCI / EQUITY"
             value={fmtPct(state.bs.aoci / Math.max(totalEquity(state.bs), 1), 1)}
             sub={
               state.bs.aoci > -1_000 ? "Negligible IRR damage" :
               state.bs.aoci / totalEquity(state.bs) > -0.10 ? "Manageable" :
               state.bs.aoci / totalEquity(state.bs) > -0.20 ? "Material" : "Severe"
             }
             accent={
               state.bs.aoci > -1_000 ? GREEN :
               state.bs.aoci / totalEquity(state.bs) > -0.10 ? AMBER :
               RED
             } />
        <KPI label="DURATION × SEC"
             value={fmt$((1 + state.levers.securitiesDuration * 2) * (state.bs.securitiesAFS + state.bs.securitiesHTM))}
             sub={`${(1 + state.levers.securitiesDuration * 2)}y dur × ${fmt$(state.bs.securitiesAFS + state.bs.securitiesHTM)}`} />
        <KPI label="EFFICIENCY" value={fmtPct(ratios.efficiency, 1)} sub="Lower = better" />
      </div>

      {/* Projected vs Actual — visible after first commit */}
      {state.lastForecast && (
        <ProjectedVsActual
          forecast={state.lastForecast}
          actualIS={state.lastIS}
          actualRatios={ratios}
          actualBS={state.bs}
          recentLog={state.log.filter(e => e.q === state.lastForecast.q)}
        />
      )}

      {/* Quick visual: balance sheet bars */}
      <SectionHeader title="BALANCE SHEET COMPOSITION" small />
      <BalanceSheetBars bs={state.bs} />

      {/* Forecast vs current */}
      {forecast && (
        <>
          <SectionHeader title="NEXT QUARTER FORECAST" subtitle="PROJECTED BASED ON CURRENT LEVERS · ASSUMES NO RANDOM EVENTS" small />
          <ForecastWalk now={state} fc={forecast} />
          <ForecastTable now={state} fc={forecast} ratios={ratios} />
        </>
      )}
    </div>
  );
}

function ForecastWalk({ now, fc }) {
  // Attribute the change from current quarter actual to next quarter forecast.
  // Buckets: NII change (decomposed into rate vs volume), provision, nonint, decisions.
  const nowIS = now.lastIS;
  const fcIS = fc.is;
  const dNI = fcIS.netIncome - nowIS.netIncome;

  // Rough attribution at the IS line level (after-tax for clean walk to NI)
  const taxRate = 0.21;
  const dNII = (fcIS.nii - nowIS.nii) * (1 - taxRate);
  const dProv = -(fcIS.provision - nowIS.provision) * (1 - taxRate); // higher provision = lower NI
  const dNonintInc = (fcIS.nonintIncome - nowIS.nonintIncome) * (1 - taxRate);
  const dNonintExp = -(fcIS.nonintExpense - nowIS.nonintExpense) * (1 - taxRate); // higher expense = lower NI
  const residual = dNI - (dNII + dProv + dNonintInc + dNonintExp);

  // NII change — decompose into rate vs volume
  // Volume effect ≈ ΔavgLoans × current loan yield
  const volumeEffect = ((fcIS.avgLoans - nowIS.avgLoans) * nowIS.loanYield + (fcIS.avgDeposits - nowIS.avgDeposits) * -nowIS.depCost) / 4 * (1 - taxRate);
  const rateEffect = dNII / (1 - taxRate) - ((fcIS.avgLoans - nowIS.avgLoans) * nowIS.loanYield + (fcIS.avgDeposits - nowIS.avgDeposits) * -nowIS.depCost) / 4;
  const rateEffectAfterTax = rateEffect * (1 - taxRate);

  const drivers = [
    { label: "VOLUME (loan/deposit growth)", val: volumeEffect, desc: "Net effect of balance sheet growth at current yields" },
    { label: "RATE (yield/cost shifts)", val: rateEffectAfterTax, desc: `Δ Fed Funds ${(fc.macroDelta.dFedFunds * 10000).toFixed(0)}bps · Δ 10Y ${(fc.macroDelta.d10y * 10000).toFixed(0)}bps` },
    { label: "PROVISION", val: dProv, desc: "Δ ACL build / charge-off pace" },
    { label: "NONINTEREST INCOME", val: dNonintInc, desc: "Fee income, mortgage gains" },
    { label: "NONINTEREST EXPENSE", val: dNonintExp, desc: "Operating cost scaling with assets" },
  ];

  if (Math.abs(residual) > 1) {
    drivers.push({ label: "OTHER", val: residual, desc: "Tax timing, rounding" });
  }

  // Total magnitude for bar scaling
  const maxAbs = Math.max(...drivers.map(d => Math.abs(d.val)), Math.abs(dNI));
  const scale = maxAbs > 0 ? 100 / maxAbs : 1;

  return (
    <div style={{ marginBottom: 24, border: `1px solid ${RULE}`, padding: 14, background: PANEL2 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
        <div style={{ fontSize: 10, letterSpacing: 1.5, color: MUTE }}>Q-OVER-Q NET INCOME WALK · WHY THE FORECAST DIFFERS FROM CURRENT QUARTER</div>
        <div style={{ fontSize: 11, color: MUTE, fontFamily: FONT_NUM }}>
          {fmt$(nowIS.netIncome)} → <span style={{ color: dNI >= 0 ? GREEN : RED }}>{fmt$(fcIS.netIncome)}</span>
          <span style={{ color: dNI >= 0 ? GREEN : RED, marginLeft: 8 }}>({dNI >= 0 ? "+" : ""}{fmt$(dNI)})</span>
        </div>
      </div>

      {/* Cycle change banner if applicable */}
      {fc.macroDelta.cycleChanged && (
        <div style={{
          marginBottom: 10, padding: "8px 12px",
          background: PAPER, borderLeft: `2px solid ${INFO}`, fontSize: 11,
        }}>
          <span style={{ color: INFO, letterSpacing: 1, fontWeight: 600 }}>CYCLE TRANSITION:</span>
          {" "}{fc.macroDelta.oldCycle.replace("_", " ").toUpperCase()} → {fc.macroDelta.newCycle.replace("_", " ").toUpperCase()}
          <span style={{ color: MUTE, marginLeft: 8 }}>— affects loan demand, NPL formation, deposit cost behavior</span>
        </div>
      )}

      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, fontFamily: FONT_NUM }}>
        <tbody>
          {drivers.map((d, i) => {
            const color = d.val >= 0 ? GREEN : RED;
            const barWidth = Math.abs(d.val) * scale;
            return (
              <tr key={i} style={{ borderBottom: i < drivers.length - 1 ? `1px solid ${PANEL}` : "none" }}>
                <td style={{ padding: "5px 0", width: 220, color: TEXT, letterSpacing: 0.5 }}>{d.label}</td>
                <td style={{ padding: "5px 8px", width: "50%" }}>
                  {/* Centered bar with zero in middle */}
                  <div style={{ position: "relative", height: 14, background: PAPER }}>
                    <div style={{
                      position: "absolute",
                      left: d.val >= 0 ? "50%" : `${50 - barWidth/2}%`,
                      width: `${barWidth/2}%`,
                      top: 0, bottom: 0,
                      background: color,
                      opacity: 0.7,
                    }} />
                    <div style={{
                      position: "absolute",
                      left: "50%", top: 0, bottom: 0,
                      width: 1,
                      background: RULE,
                    }} />
                  </div>
                </td>
                <td style={{ padding: "5px 8px", textAlign: "right", color, fontWeight: 500, width: 70 }}>
                  {d.val >= 0 ? "+" : ""}{fmt$(d.val)}
                </td>
                <td style={{ padding: "5px 8px", color: MUTE, fontSize: 10 }}>{d.desc}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={{ fontSize: 10, color: MUTE, marginTop: 10, fontStyle: "italic" }}>
        After-tax impact on net income. Sum of drivers ≈ projected change. Volume is balance sheet growth at current yields; rate captures yield/cost shifts.
      </div>
    </div>
  );
}

function ProjectedVsActual({ forecast, actualIS, actualRatios, actualBS, recentLog }) {
  // Compute variance for each metric. Highlight large surprises.
  const fc = forecast;
  const yearNum = Math.ceil(fc.q / 4);
  const qNum = ((fc.q - 1) % 4) + 1;

  const rows = [
    { label: "Net interest income", proj: fc.is.nii, actual: actualIS.nii, fmt: "money" },
    { label: "Provision for credit losses", proj: fc.is.provision, actual: actualIS.provision, fmt: "money", inverse: true },
    { label: "Noninterest income", proj: fc.is.nonintIncome, actual: actualIS.nonintIncome, fmt: "money" },
    { label: "Noninterest expense", proj: fc.is.nonintExpense, actual: actualIS.nonintExpense, fmt: "money", inverse: true },
    { label: "Net income", proj: fc.is.netIncome, actual: actualIS.netIncome, fmt: "money", emphasize: true },
    { sep: true },
    { label: "NIM", proj: fc.ratios.nim, actual: actualRatios.nim, fmt: "pct" },
    { label: "ROA", proj: fc.ratios.roa, actual: actualRatios.roa, fmt: "pct" },
    { label: "CET1", proj: fc.ratios.cet1, actual: actualRatios.cet1, fmt: "pct" },
    { label: "NPL ratio", proj: fc.ratios.nplRatio, actual: actualRatios.nplRatio, fmt: "pct", inverse: true },
    { label: "On-hand liquidity", proj: fc.ratios.onHandLiq, actual: actualRatios.onHandLiq, fmt: "pct" },
    { sep: true },
    { label: "Total assets", proj: fc.bs.assets, actual: totalAssets(actualBS), fmt: "money" },
    { label: "Loans (gross)", proj: fc.bs.loansGross, actual: actualBS.loansGross, fmt: "money" },
    { label: "Deposits", proj: fc.bs.deposits, actual: totalDeposits(actualBS.deposits), fmt: "money" },
    { label: "AOCI", proj: fc.bs.aoci, actual: actualBS.aoci, fmt: "money" },
  ];

  // Big-picture summary: how did NI come in vs forecast?
  const niVar = actualIS.netIncome - fc.is.netIncome;
  const niVarPct = fc.is.netIncome !== 0 ? niVar / Math.abs(fc.is.netIncome) : 0;
  const niColor = niVar >= 0 ? GREEN : RED;
  const niLabel = niVar >= 0 ? "BEAT" : "MISS";

  // Filter to substantive events (not just info / system)
  const noteworthy = recentLog.filter(e => e.type === "bad" || e.type === "warn" || e.type === "good");

  return (
    <div style={{ marginBottom: 24 }}>
      <SectionHeader
        title={`Y${yearNum}Q${qNum} RESULTS — PROJECTED vs ACTUAL`}
        subtitle="WHAT YOU FORECAST LAST QUARTER vs WHAT ACTUALLY PRINTED"
        small
      />

      {/* Headline summary box */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: 14,
        alignItems: "center",
        padding: "14px 16px",
        background: PANEL,
        border: `1px solid ${RULE}`,
        borderLeft: `3px solid ${niColor}`,
        marginBottom: 12,
      }}>
        <div>
          <div style={{ fontSize: 9, color: MUTE, letterSpacing: 1.5 }}>NET INCOME vs PROJECTION</div>
          <div style={{ fontSize: 22, fontFamily: FONT_NUM, fontWeight: 700, color: niColor }}>
            {niLabel} {fmt$(Math.abs(niVar))}
          </div>
          <div style={{ fontSize: 11, color: MUTE, marginTop: 2 }}>
            ({niVarPct >= 0 ? "+" : ""}{(niVarPct * 100).toFixed(1)}% vs forecast)
          </div>
        </div>
        <div style={{ fontSize: 11, color: TEXT, lineHeight: 1.5 }}>
          {noteworthy.length === 0 ? (
            <span style={{ color: MUTE }}>No major surprises this quarter — actuals tracked the base case.</span>
          ) : (
            <span>
              <span style={{ color: MUTE, letterSpacing: 1, fontSize: 9 }}>EVENT IMPACT:</span>{" "}
              {noteworthy.slice(0, 2).map((e, i) => (
                <span key={i} style={{
                  color: e.type === "bad" ? RED : e.type === "warn" ? AMBER : GREEN,
                  marginRight: 8,
                }}>
                  {e.msg.split(":")[0]}
                  {i < Math.min(noteworthy.length, 2) - 1 ? " ·" : ""}
                </span>
              ))}
              {noteworthy.length > 2 && (
                <span style={{ color: MUTE }}>+ {noteworthy.length - 2} more in log</span>
              )}
            </span>
          )}
        </div>
      </div>

      {/* Variance table */}
      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        fontSize: 12,
        fontFamily: FONT_NUM,
      }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${RULE}` }}>
            <th style={varHead("left")}>METRIC</th>
            <th style={varHead("right")}>PROJECTED</th>
            <th style={varHead("right")}>ACTUAL</th>
            <th style={varHead("right")}>VARIANCE</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            if (r.sep) return <tr key={i}><td colSpan={4} style={{ height: 8 }} /></tr>;
            const variance = r.actual - r.proj;
            const isFavorable = r.inverse ? variance < 0 : variance > 0;
            const variancePct = r.proj !== 0 ? variance / Math.abs(r.proj) : 0;
            const isMaterial = Math.abs(variancePct) > 0.03; // 3% threshold
            const varColor = isMaterial ? (isFavorable ? GREEN : RED) : MUTE;

            const formatVal = (v) => {
              if (r.fmt === "pct") return fmtPct(v);
              return fmt$(v);
            };
            const formatVar = (v) => {
              const sign = v >= 0 ? "+" : "";
              if (r.fmt === "pct") return `${sign}${(v * 10000).toFixed(0)} bps`;
              return `${sign}${fmt$(v)}`;
            };

            return (
              <tr key={i} style={{
                borderBottom: `1px solid ${PANEL2}`,
                background: r.emphasize ? PANEL : "transparent",
              }}>
                <td style={{
                  ...varCell(),
                  textAlign: "left",
                  fontWeight: r.emphasize ? 600 : 400,
                  color: r.emphasize ? TEXT : TEXT,
                }}>
                  {r.label}
                </td>
                <td style={{ ...varCell(), color: MUTE }}>{formatVal(r.proj)}</td>
                <td style={{ ...varCell(), color: TEXT, fontWeight: r.emphasize ? 600 : 400 }}>
                  {formatVal(r.actual)}
                </td>
                <td style={{ ...varCell(), color: varColor, fontWeight: isMaterial ? 600 : 400 }}>
                  {formatVar(variance)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div style={{ fontSize: 10, color: MUTE, marginTop: 8, fontStyle: "italic" }}>
        Variance shown in absolute terms; ‘bps’ for ratios, $ for income/balance items.
        Material variances (&gt;3%) highlighted. Favorable variance is green;
        adverse (e.g. higher provision, higher NPL) is red.
      </div>
    </div>
  );
}

function varHead(align) {
  return {
    textAlign: align,
    padding: "8px 12px",
    fontSize: 9,
    letterSpacing: 1.5,
    color: MUTE,
    fontWeight: 500,
  };
}
function varCell() {
  return {
    padding: "5px 12px",
    textAlign: "right",
    fontFamily: FONT_NUM,
  };
}

function BalanceSheetBars({ bs }) {
  const ta = totalAssets(bs);
  const td = totalDeposits(bs.deposits);
  const tl = totalLiabilities(bs);
  const eq = totalEquity(bs);

  const assetSlices = [
    { label: "Cash", val: bs.cash, color: ACCENT },
    { label: "Securities AFS", val: bs.securitiesAFS, color: "#7ad9ff" },
    { label: "Securities HTM", val: bs.securitiesHTM, color: "#5fb3d4" },
    { label: "Loans (net of ACL)", val: bs.loansGross - bs.acl, color: ACCENT2 },
    { label: "Premises + Other", val: bs.premises + bs.otherAssets, color: "#888" },
  ];
  const liabSlices = [
    { label: "Noninterest Dep", val: bs.deposits.noninterest, color: "#5cd97e" },
    { label: "Int Checking", val: bs.deposits.interestChecking, color: "#7ed98a" },
    { label: "Savings/MM", val: bs.deposits.savingsMM, color: "#a0d97e" },
    { label: "Time Deposits", val: bs.deposits.timeDeposits, color: "#c8d97e" },
    { label: "FHLB Advances", val: bs.borrowingsFHLB, color: AMBER },
    { label: "Sub Debt", val: bs.subDebt, color: "#c87e7e" },
    { label: "Other Liab", val: bs.otherLiab, color: "#666" },
    { label: "Equity", val: eq, color: ACCENT },
  ];

  return (
    <div style={{ marginBottom: 24 }}>
      <BarRow title="ASSETS" total={ta} slices={assetSlices} />
      <div style={{ height: 8 }} />
      <BarRow title="LIAB + EQUITY" total={tl + eq} slices={liabSlices} />
    </div>
  );
}

function BarRow({ title, total, slices }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 10, letterSpacing: 1, color: MUTE }}>
        <span>{title}</span>
        <span>{fmt$(total)}</span>
      </div>
      <div style={{ display: "flex", height: 28, border: `1px solid ${RULE}`, background: PANEL2 }}>
        {slices.filter(s => s.val > 0).map((s, i) => (
          <div key={i} title={`${s.label}: ${fmt$(s.val)}`} style={{
            flex: s.val,
            background: s.color,
            opacity: 0.85,
            borderRight: i < slices.length - 1 ? `1px solid ${PAPER}` : "none",
            position: "relative",
          }}>
            {s.val / total > 0.08 && (
              <div style={{
                position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 9, color: "#000", fontWeight: 600, letterSpacing: 0.5,
              }}>
                {s.label}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ForecastTable({ now, fc, ratios }) {
  const rows = [
    ["Net interest income", fmt$(now.lastIS.nii), fmt$(fc.is.nii)],
    ["Provision for credit losses", fmt$(now.lastIS.provision), fmt$(fc.is.provision)],
    ["Noninterest income", fmt$(now.lastIS.nonintIncome), fmt$(fc.is.nonintIncome)],
    ["Noninterest expense", fmt$(now.lastIS.nonintExpense), fmt$(fc.is.nonintExpense)],
    ["Net income", fmt$(now.lastIS.netIncome), fmt$(fc.is.netIncome)],
    [""],
    ["NIM", fmtPct(ratios.nim), fmtPct(fc.ratios.nim)],
    ["ROA", fmtPct(ratios.roa), fmtPct(fc.ratios.roa)],
    ["ROE", fmtPct(ratios.roe), fmtPct(fc.ratios.roe)],
    ["CET1 ratio", fmtPct(ratios.cet1), fmtPct(fc.ratios.cet1)],
    ["Tier 1 leverage", fmtPct(ratios.tier1Lev), fmtPct(fc.ratios.tier1Lev)],
    ["Loan-to-deposit", fmtPct(ratios.ltd, 1), fmtPct(fc.ratios.ltd, 1)],
    ["NPL ratio", fmtPct(ratios.nplRatio), fmtPct(fc.ratios.nplRatio)],
  ];
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: FONT_NUM, marginBottom: 24 }}>
      <thead>
        <tr style={{ borderBottom: `1px solid ${RULE}` }}>
          <th style={{ textAlign: "left", padding: "8px 12px", fontSize: 10, letterSpacing: 1.5, color: MUTE, fontWeight: 500 }}>METRIC</th>
          <th style={{ textAlign: "right", padding: "8px 12px", fontSize: 10, letterSpacing: 1.5, color: MUTE, fontWeight: 500 }}>CURRENT (Q-1 ACTUAL)</th>
          <th style={{ textAlign: "right", padding: "8px 12px", fontSize: 10, letterSpacing: 1.5, color: ACCENT, fontWeight: 500 }}>FORECAST (Q+1)</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => r[0] === "" ? (
          <tr key={i}><td colSpan={3} style={{ height: 8 }} /></tr>
        ) : (
          <tr key={i} style={{ borderBottom: `1px solid ${PANEL2}` }}>
            <td style={{ padding: "6px 12px", color: TEXT }}>{r[0]}</td>
            <td style={{ padding: "6px 12px", textAlign: "right", color: MUTE }}>{r[1]}</td>
            <td style={{ padding: "6px 12px", textAlign: "right", color: ACCENT, fontWeight: 500 }}>{r[2]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function CallReportTab({ state, ratios }) {
  const bs = state.bs;
  const is = state.lastIS;
  const td = totalDeposits(bs.deposits);
  const ta = totalAssets(bs);
  const eq = totalEquity(bs);

  return (
    <div>
      <SectionHeader title="CALL REPORT" subtitle="FFIEC 041 · CONSOLIDATED REPORTS OF CONDITION & INCOME" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div>
          <SubHeader title="SCHEDULE RC — BALANCE SHEET" />
          <CRTable rows={[
            ["Cash and balances due", bs.cash],
            ["Securities, AFS (FV)", bs.securitiesAFS],
            ["Securities, HTM (FV*)", bs.securitiesHTM],
            ["  *AOCI flows through capital (post-2024 reg)", "", "muted_text"],
            ["  Net unrealized gain/loss (AOCI)", bs.aoci, "muted"],
            ["Loans and leases, gross", bs.loansGross],
            ["  Less: Allowance for credit losses", -bs.acl, "muted"],
            ["Loans and leases, net", bs.loansGross - bs.acl, "bold"],
            ["Premises and fixed assets", bs.premises],
            ["Other assets", bs.otherAssets],
            ["TOTAL ASSETS", ta, "total"],
            [""],
            ["Deposits in domestic offices", td, "bold"],
            ["  Noninterest-bearing", bs.deposits.noninterest, "muted"],
            ["  Interest-bearing checking", bs.deposits.interestChecking, "muted"],
            ["  Savings/Money market", bs.deposits.savingsMM, "muted"],
            ["  Time deposits", bs.deposits.timeDeposits, "muted"],
            ["FHLB advances", bs.borrowingsFHLB],
            ["Subordinated notes", bs.subDebt],
            ["Other liabilities", bs.otherLiab],
            ["TOTAL LIABILITIES", totalLiabilities(bs), "total"],
            [""],
            ["Common stock + surplus", bs.commonEquity],
            ["Retained earnings", bs.retainedEarnings],
            ["AOCI", bs.aoci, "muted"],
            ["TOTAL EQUITY CAPITAL", eq, "total"],
            ["Shares outstanding (000s)", bs.sharesOutstanding, "muted"],
          ]} />
        </div>

        <div>
          <SubHeader title="SCHEDULE RI — INCOME STATEMENT (QTR)" />
          <CRTable rows={[
            ["Interest income", is.interestIncome, "bold"],
            ["Interest expense", is.interestExpense, "bold"],
            ["Net interest income", is.nii, "total"],
            [""],
            ["Provision for credit losses", is.provision],
            ["  Net charge-offs (memo)", is.netChargeOffs, "muted"],
            [""],
            ["Noninterest income", is.nonintIncome],
            ["Noninterest expense", is.nonintExpense],
            ["Pretax income", is.pretax, "bold"],
            ["Applicable income taxes", is.tax],
            ["NET INCOME", is.netIncome, "total"],
            [""],
            ["Cash dividends declared", is.dividendsPaid],
            ["Treasury stock repurchases", is.repurchases],
            ...(is.repurchases > 0 && is.repurchasePrice ? [
              ["  Avg execution price", is.repurchasePrice, "muted_price"],
              ["  Shares retired (000s)", is.repurchaseShares, "muted_shares"],
            ] : []),
          ]} />

          <div style={{ height: 16 }} />
          <SubHeader title="SCHEDULE RC-R — REGULATORY CAPITAL" />
          <CRTable rows={[
            ["Common Equity Tier 1 ratio", ratios.cet1, "pct"],
            ["Tier 1 capital ratio", ratios.cet1, "pct"],
            ["Total capital ratio", ratios.totalCapRatio, "pct"],
            ["Tier 1 leverage ratio", ratios.tier1Lev, "pct"],
            ["Risk-weighted assets", ratios.rwa],
            ["Tangible common equity / TA", ratios.tce, "pct"],
          ]} />

          <div style={{ height: 16 }} />
          <SubHeader title="ASSET QUALITY" />
          <CRTable rows={[
            ["Nonperforming loans", bs.npl],
            ["NPL / loans", ratios.nplRatio, "pct"],
            ["ACL / loans", ratios.aclCoverage, "pct"],
            ["ACL / NPL coverage", ratios.aclToNpl, "ratio"],
          ]} />
        </div>
      </div>
    </div>
  );
}

function CRTable({ rows }) {
  return (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: FONT_NUM }}>
      <tbody>
        {rows.map((r, i) => {
          if (r[0] === "") return <tr key={i}><td colSpan={2} style={{ height: 6 }} /></tr>;
          const fmt = r[2];
          let val;
          if (fmt === "pct") val = fmtPct(r[1]);
          else if (fmt === "ratio") val = r[1] > 99 ? "∞" : `${r[1].toFixed(2)}x`;
          else if (fmt === "muted_price") val = `$${r[1].toFixed(2)}`;
          else if (fmt === "muted_shares") val = `${r[1].toFixed(1)}K`;
          else if (fmt === "muted_text") val = "";
          else if (typeof r[1] === "number" && r[1] < 100 && r[1] > -100 && !Number.isInteger(r[1])) val = fmt$(r[1]);
          else if (typeof r[1] === "number") val = fmt$(r[1]);
          else val = r[1];

          const isMuted = fmt === "muted" || fmt === "muted_price" || fmt === "muted_shares" || fmt === "muted_text";
          const style = {
            padding: "4px 8px",
            color: isMuted ? MUTE : TEXT,
            fontWeight: fmt === "total" ? 700 : fmt === "bold" ? 500 : 400,
            fontStyle: fmt === "muted_text" ? "italic" : "normal",
            fontSize: fmt === "total" ? 11 : fmt === "muted_text" ? 10 : 12,
            borderTop: fmt === "total" ? `1px solid ${RULE}` : "none",
            borderBottom: fmt === "total" ? `1px solid ${RULE}` : "none",
            textTransform: fmt === "total" ? "uppercase" : "none",
            letterSpacing: fmt === "total" ? 1 : 0,
          };
          return (
            <tr key={i}>
              <td style={{ ...style, textAlign: "left" }}>{r[0]}</td>
              <td style={{ ...style, textAlign: "right" }}>{val}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function LeversTab({ state, setLever }) {
  const lev = state.levers;
  const cfg = [
    {
      key: "loanGrowth",
      label: "LOAN GROWTH AGGRESSIVENESS",
      desc: "Drives originations. Higher = chase volume; lower yields and weaker credit. Negative = run off the book.",
      labels: ["RUN-OFF", "CONSERVATIVE", "MODERATE", "GROWTH", "AGGRESSIVE"],
      min: -2, max: 2,
    },
    {
      key: "underwriting",
      label: "UNDERWRITING TIGHTNESS",
      desc: "Credit standards. Tighter = fewer losses, lower yields, slower growth. Looser = volume + future NCOs.",
      labels: ["VERY LOOSE", "LOOSE", "STANDARD", "TIGHT", "VERY TIGHT"],
      min: -2, max: 2,
    },
    {
      key: "depositPricing",
      label: "DEPOSIT PRICING",
      desc: "Premium = attract deposits, higher COF. Discount = bleed deposits, lower COF.",
      labels: ["DEEP DISCOUNT", "BELOW MARKET", "AT MARKET", "PREMIUM", "TOP-OF-MARKET"],
      min: -2, max: 2,
    },
    {
      key: "securitiesDuration",
      label: "SECURITIES PORTFOLIO DURATION",
      desc: "Applies to BOTH AFS and HTM. Higher duration = more yield + curve premium, but unrealized losses on rate moves flow through AOCI and CET1.",
      labels: ["~1Y", "~3Y", "~5Y", "~7Y"],
      min: 0, max: 3,
    },
    {
      key: "liquidityTarget",
      label: "LIQUIDITY POSTURE",
      desc: "Target on-hand liquidity (cash share). Fortress = drag on NIM but resilient.",
      labels: ["LEAN", "STANDARD", "DEFENSIVE", "FORTRESS"],
      min: 0, max: 3,
    },
  ];

  return (
    <div>
      <SectionHeader title="STRATEGY LEVERS" subtitle="STANDING ORDERS · APPLY UNTIL CHANGED" />
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {cfg.map((c) => (
          <Lever key={c.key} cfg={c} value={lev[c.key]} onChange={(v) => setLever(c.key, v)} />
        ))}
      </div>
    </div>
  );
}

function Lever({ cfg, value, onChange }) {
  const range = cfg.max - cfg.min;
  return (
    <div style={{ border: `1px solid ${RULE}`, padding: 16, background: PANEL2 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
        <div style={{ fontSize: 11, letterSpacing: 1.5, color: ACCENT, fontWeight: 600 }}>{cfg.label}</div>
        <div style={{ fontSize: 14, color: TEXT, fontWeight: 700, fontFamily: FONT_NUM }}>
          {cfg.labels[value - cfg.min]}
        </div>
      </div>
      <div style={{ fontSize: 11, color: MUTE, marginBottom: 12 }}>{cfg.desc}</div>
      <input
        type="range"
        min={cfg.min}
        max={cfg.max}
        step={1}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        style={{ width: "100%" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, fontSize: 9, color: MUTE, letterSpacing: 1 }}>
        {cfg.labels.map((l, i) => <span key={i} style={{ color: i + cfg.min === value ? ACCENT : MUTE }}>·</span>)}
      </div>
    </div>
  );
}

function CapitalTab({ state, setDecision, ratios }) {
  const dec = state.decisions;
  const eq = totalEquity(state.bs);
  const bvps = eq / state.bs.sharesOutstanding;
  const totalDiv = dec.dividendPerShare * state.bs.sharesOutstanding;
  const earnings = state.lastIS.netIncome;
  const payout = earnings > 0 ? totalDiv / earnings : 0;

  // Live market price reflecting current cycle, ROE, asset quality, capital, AOCI
  const marketPrice = estimatedSharePrice(state, ratios);
  const pbMult = marketPrice / bvps;
  const cycleLabel = {
    expansion: "EXPANSION — premium pricing",
    late_cycle: "LATE CYCLE — multiple compression",
    recession: "RECESSION — discount to book",
    recovery: "RECOVERY — partial rebound",
  }[state.macro.cycle];
  const pbColor = pbMult < 0.85 ? GREEN : pbMult > 1.30 ? RED : AMBER;
  // Color: green = cheap (good time to buy), red = expensive

  const restricted = ratios.cet1 < 0.07 || ratios.tier1Lev < 0.05;

  return (
    <div>
      <SectionHeader title="CAPITAL ACTIONS" subtitle="DECISIONS THIS QUARTER" />

      {restricted && (
        <div style={{
          background: "#3a2308", border: `1px solid ${AMBER}`, padding: 12, marginBottom: 16, fontSize: 12,
        }}>
          <strong style={{ color: AMBER, letterSpacing: 1 }}>⚠ PCA RESTRICTION:</strong> Capital below
          Well Capitalized thresholds. Discretionary distributions may trigger additional regulatory action.
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Dividends */}
        <DecisionPanel title="COMMON DIVIDEND" desc="Per-share quarterly cash dividend.">
          <NumberInput
            value={dec.dividendPerShare}
            min={0} max={2} step={0.05}
            onChange={(v) => setDecision("dividendPerShare", v)}
            prefix="$"
            suffix="/sh"
          />
          <Row label="Total dividend" value={fmt$(totalDiv)} />
          <Row label="Implied payout" value={fmtPct(payout, 0)}
               accent={payout > 0.5 ? AMBER : MUTE} />
        </DecisionPanel>

        {/* Repurchases */}
        <DecisionPanel
          title="SHARE REPURCHASES"
          desc={`Market price moves with the cycle, ROE, and asset quality. Buy when the multiple compresses.`}
        >
          <NumberInput
            value={dec.repurchaseAmount}
            min={0} max={20_000} step={250}
            onChange={(v) => setDecision("repurchaseAmount", v)}
            prefix="$"
            suffix="K"
          />
          <Row label="Book value/share" value={`$${bvps.toFixed(2)}`} />
          <Row label="Market price/share" value={`$${marketPrice.toFixed(2)}`} accent={pbColor} />
          <Row label="P/B multiple" value={`${pbMult.toFixed(2)}x`} accent={pbColor} />
          <Row label="Market regime" value={cycleLabel}
               accent={state.macro.cycle === "recession" ? GREEN : state.macro.cycle === "expansion" ? AMBER : MUTE} />
          <Row label="Shares retired (est)" value={`${(dec.repurchaseAmount / marketPrice).toFixed(1)}K`} />
        </DecisionPanel>

        {/* FHLB */}
        <DecisionPanel title="FHLB ADVANCES" desc="Wholesale funding. + draws / − paydowns. Cost ≈ Fed Funds + 50bps.">
          <NumberInput
            value={dec.fhlbAdvance}
            min={-state.bs.borrowingsFHLB} max={50_000} step={500}
            onChange={(v) => setDecision("fhlbAdvance", v)}
            prefix="$"
            suffix="K"
          />
          <Row label="Pro forma FHLB" value={fmt$(state.bs.borrowingsFHLB + dec.fhlbAdvance)} />
        </DecisionPanel>

        {/* Sub Debt */}
        <DecisionPanel title="SUBORDINATED DEBT" desc="Tier 2 capital issuance. Cost ≈ 7%.">
          <NumberInput
            value={dec.subDebtIssuance}
            min={0} max={20_000} step={500}
            onChange={(v) => setDecision("subDebtIssuance", v)}
            prefix="$"
            suffix="K"
          />
          <Row label="Pro forma sub debt" value={fmt$(state.bs.subDebt + dec.subDebtIssuance)} />
        </DecisionPanel>

        {/* Provision override */}
        <DecisionPanel title="PROVISION OVERRIDE" desc="Override modeled CECL provision. Leave blank to accept model output.">
          <div style={{ display: "flex", gap: 8 }}>
            <NumberInput
              value={dec.provisionOverride ?? ""}
              min={0} max={5000} step={50}
              onChange={(v) => setDecision("provisionOverride", v === "" ? null : v)}
              prefix="$"
              suffix="K"
              allowBlank
            />
            <button onClick={() => setDecision("provisionOverride", null)} style={btnGhostSmall}>
              CLEAR
            </button>
          </div>
          <Row label="Status" value={dec.provisionOverride === null ? "MODEL" : "OVERRIDE"}
               accent={dec.provisionOverride === null ? GREEN : AMBER} />
        </DecisionPanel>

        {/* Capital summary */}
        <DecisionPanel title="CAPITAL SUMMARY" desc="Pro forma after this quarter's decisions.">
          <Row label="Current CET1" value={fmtPct(ratios.cet1)} />
          <Row label="Book value/share" value={`$${bvps.toFixed(2)}`} />
          <Row label="Cash on hand" value={fmt$(state.bs.cash)} />
          <Row label="Cash post-actions" value={fmt$(state.bs.cash - totalDiv - dec.repurchaseAmount + dec.fhlbAdvance + dec.subDebtIssuance)}
               accent={(state.bs.cash - totalDiv - dec.repurchaseAmount + dec.fhlbAdvance + dec.subDebtIssuance) < 5000 ? AMBER : ACCENT} />
        </DecisionPanel>
      </div>
    </div>
  );
}

function HistoryTab({ history }) {
  if (history.length === 0) {
    return (
      <div>
        <SectionHeader title="PERFORMANCE HISTORY" />
        <div style={{ padding: 40, textAlign: "center", color: MUTE, border: `1px dashed ${RULE}` }}>
          No quarters complete yet. Advance to populate history.
        </div>
      </div>
    );
  }

  return (
    <div>
      <SectionHeader title="PERFORMANCE HISTORY" subtitle={`${history.length} QUARTERS RECORDED`} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        <Sparkline title="TOTAL ASSETS" data={history.map(h => h.assets)} format={fmt$} />
        <Sparkline title="NET INCOME (QTR)" data={history.map(h => h.netIncome)} format={fmt$} />
        <Sparkline title="NIM" data={history.map(h => h.nim)} format={(v) => fmtPct(v)} />
        <Sparkline title="ROA" data={history.map(h => h.roa)} format={(v) => fmtPct(v)} />
        <Sparkline title="CET1 RATIO" data={history.map(h => h.cet1)} format={(v) => fmtPct(v)} threshold={0.07} />
        <Sparkline title="NPL RATIO" data={history.map(h => h.nplRatio)} format={(v) => fmtPct(v)} threshold={0.04} inverse />
        <Sparkline title="LOAN-TO-DEPOSIT" data={history.map(h => h.ltd)} format={(v) => fmtPct(v, 1)} />
        <Sparkline title="AOCI ($)" data={history.map(h => h.aoci)} format={fmt$} threshold={0} inverse />
        <Sparkline title="TANGIBLE BV / SHARE" data={history.map(h => h.tbvPerShare)} format={(v) => `$${v.toFixed(2)}`} />
        <Sparkline title="EST. SHARE PRICE" data={history.map(h => h.sharePrice)} format={(v) => `$${v.toFixed(2)}`} />
      </div>

      <SubHeader title="QUARTERLY DETAIL" />
      <div style={{ overflowX: "auto", border: `1px solid ${RULE}` }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, fontFamily: FONT_NUM }}>
          <thead>
            <tr style={{ background: PANEL2 }}>
              {["QTR", "ASSETS", "LOANS", "DEPOSITS", "NET INC", "NIM", "ROA", "ROE", "CET1", "NPL%", "LTD", "TBV/SH", "PX"].map(h => (
                <th key={h} style={{ padding: "8px 10px", fontSize: 9, letterSpacing: 1.5, color: MUTE, fontWeight: 500, textAlign: "right", borderBottom: `1px solid ${RULE}` }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {history.slice().reverse().map((h, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${PANEL2}` }}>
                <td style={hCell()}>Q{h.q}</td>
                <td style={hCell()}>{fmt$(h.assets)}</td>
                <td style={hCell()}>{fmt$(h.loans)}</td>
                <td style={hCell()}>{fmt$(h.deposits)}</td>
                <td style={hCell(h.netIncome > 0 ? GREEN : RED)}>{fmt$(h.netIncome)}</td>
                <td style={hCell()}>{fmtPct(h.nim)}</td>
                <td style={hCell(h.roa > 0.01 ? GREEN : RED)}>{fmtPct(h.roa)}</td>
                <td style={hCell()}>{fmtPct(h.roe)}</td>
                <td style={hCell(h.cet1 < 0.07 ? RED : ACCENT)}>{fmtPct(h.cet1)}</td>
                <td style={hCell(h.nplRatio > 0.03 ? RED : ACCENT)}>{fmtPct(h.nplRatio)}</td>
                <td style={hCell()}>{fmtPct(h.ltd, 1)}</td>
                <td style={hCell()}>${(h.tbvPerShare || 0).toFixed(2)}</td>
                <td style={hCell()}>${h.sharePrice.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function hCell(color) {
  return { padding: "6px 10px", textAlign: "right", color: color || TEXT };
}

function Sparkline({ title, data, format, threshold, inverse }) {
  if (!data.length) return null;
  const min = Math.min(...data, threshold ?? Infinity);
  const max = Math.max(...data, threshold ?? -Infinity);
  const range = max - min || 1;
  const W = 280, H = 60;
  const points = data.map((v, i) => {
    const x = (i / Math.max(data.length - 1, 1)) * W;
    const y = H - ((v - min) / range) * H;
    return [x, y];
  });
  const last = data[data.length - 1];
  const first = data[0];
  const trend = last > first;
  const lineColor = inverse ? (trend ? RED : GREEN) : (trend ? GREEN : RED);

  return (
    <div style={{ border: `1px solid ${RULE}`, padding: 12, background: PANEL2 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <div style={{ fontSize: 10, letterSpacing: 1.5, color: MUTE }}>{title}</div>
        <div style={{ fontSize: 13, color: lineColor, fontFamily: FONT_NUM, fontWeight: 700 }}>{format(last)}</div>
      </div>
      <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
        {threshold !== undefined && (
          <line
            x1={0} x2={W}
            y1={H - ((threshold - min) / range) * H}
            y2={H - ((threshold - min) / range) * H}
            stroke={AMBER} strokeDasharray="3,3" strokeWidth={1} opacity={0.5}
          />
        )}
        <polyline
          fill="none"
          stroke={lineColor}
          strokeWidth={1.5}
          points={points.map(p => p.join(",")).join(" ")}
        />
        <circle cx={points[points.length - 1][0]} cy={points[points.length - 1][1]} r={3} fill={lineColor} />
      </svg>
    </div>
  );
}

// ---------- common UI ----------
function SectionHeader({ title, subtitle, small }) {
  return (
    <div style={{ marginBottom: small ? 12 : 18, paddingBottom: 8, borderBottom: `1px solid ${RULE}` }}>
      <div style={{ fontSize: small ? 11 : 13, letterSpacing: 2.5, fontWeight: 700, color: ACCENT, fontFamily: FONT_DISP }}>
        {title}
      </div>
      {subtitle && (
        <div style={{ fontSize: 10, letterSpacing: 1.5, color: MUTE, marginTop: 2 }}>
          {subtitle}
        </div>
      )}
    </div>
  );
}
function SubHeader({ title }) {
  return (
    <div style={{ fontSize: 10, letterSpacing: 2, color: MUTE, marginBottom: 8, paddingBottom: 4, borderBottom: `1px solid ${PANEL2}`, fontWeight: 500 }}>
      {title}
    </div>
  );
}
function Stat({ label, value, accent }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
      <div style={{ fontSize: 9, letterSpacing: 1.5, color: MUTE }}>{label}</div>
      <div style={{ fontSize: 14, color: accent || TEXT, fontFamily: FONT_NUM, fontWeight: 600 }}>{value}</div>
    </div>
  );
}
function Row({ label, value, accent }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "3px 0", fontSize: 12 }}>
      <span style={{ color: MUTE }}>{label}</span>
      <span style={{ color: accent || TEXT, fontFamily: FONT_NUM }}>{value}</span>
    </div>
  );
}
function KPI({ label, value, sub, accent }) {
  return (
    <div style={{ background: PANEL, padding: "12px 14px" }}>
      <div style={{ fontSize: 9, letterSpacing: 1.5, color: MUTE }}>{label}</div>
      <div style={{ fontSize: 22, fontFamily: FONT_NUM, color: accent || TEXT, fontWeight: 700, marginTop: 4 }}>{value}</div>
      {sub && <div style={{ fontSize: 10, color: MUTE, marginTop: 2 }}>{sub}</div>}
    </div>
  );
}
function DecisionPanel({ title, desc, children }) {
  return (
    <div style={{ border: `1px solid ${RULE}`, padding: 14, background: PANEL2 }}>
      <div style={{ fontSize: 11, letterSpacing: 1.5, color: ACCENT, fontWeight: 600 }}>{title}</div>
      <div style={{ fontSize: 11, color: MUTE, marginBottom: 10, marginTop: 2 }}>{desc}</div>
      {children}
    </div>
  );
}
function NumberInput({ value, min, max, step, onChange, prefix, suffix, allowBlank }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
      {prefix && <span style={{ color: MUTE, fontSize: 12 }}>{prefix}</span>}
      <input
        type="number"
        value={value}
        min={min} max={max} step={step}
        onChange={(e) => {
          const v = e.target.value;
          if (v === "" && allowBlank) { onChange(""); return; }
          onChange(parseFloat(v) || 0);
        }}
        style={{
          background: PAPER,
          color: TEXT,
          border: `1px solid ${RULE}`,
          padding: "6px 8px",
          fontFamily: FONT_NUM,
          fontSize: 13,
          width: "100%",
        }}
      />
      {suffix && <span style={{ color: MUTE, fontSize: 12 }}>{suffix}</span>}
    </div>
  );
}

const btnPrimary = {
  background: ACCENT,
  color: "#000",
  border: "none",
  padding: "10px 16px",
  fontSize: 11,
  letterSpacing: 1.5,
  fontWeight: 700,
  cursor: "pointer",
  fontFamily: FONT_DISP,
};
const btnGhost = {
  background: "transparent",
  color: TEXT,
  border: `1px solid ${RULE}`,
  padding: "10px 16px",
  fontSize: 11,
  letterSpacing: 1.5,
  fontWeight: 500,
  cursor: "pointer",
  fontFamily: FONT_DISP,
};
const btnGhostSmall = {
  ...btnGhost,
  padding: "6px 10px",
  fontSize: 10,
};

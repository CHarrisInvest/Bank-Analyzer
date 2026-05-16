// First-quarter coach + per-tab tutorials. Small dismissible tooltips anchored to data-coach attributes.
const { palette: COP } = window.Theme;

const COACH_FLOWS = {
  intro: [
    {
      target: "[data-coach='header-progress']",
      title: "Your tenure, at a glance",
      body: "10 years = 40 quarters. The track lights up as you advance and tints by economic cycle.",
      placement: "bottom",
    },
    {
      target: "[data-coach='header-vitals']",
      title: "Vital signs",
      body: "CET1 below 4.5% ends the run. Watch capital, profitability, asset quality, and customer satisfaction — they color-code by health. Satisfaction drives deposit retention; mismanaged customers can quietly drain the funding base.",
      placement: "bottom",
    },
    {
      target: "[data-coach='tab-strip']",
      title: "Where you actually run the bank",
      body: "Tabs are on the left rail. Each is where you make a different category of decisions or look up supporting data. We'll walk through each the first time you open it.",
      placement: "right",
    },
    {
      target: "[data-coach='forecast-pair']",
      title: "This quarter vs. next",
      body: "Posted actuals on the left. Your forecast on the right updates as you change levers and capital decisions.",
      placement: "top",
    },
    {
      target: "[data-coach='advance-btn']",
      title: "Run the quarter",
      body: "When you're satisfied with the forecast, advance. Outcomes will diverge — randomness, events, and macro shifts.",
      placement: "left",
    },
  ],
  levers: [
    {
      target: "[data-coach='live-forecast']",
      title: "Live forecast",
      body: "This panel reprices the next quarter the moment you move any lever — NIM, net income and EPS, CET1, NPL, and customer satisfaction all update before you commit.",
      placement: "bottom",
    },
    {
      target: "[data-coach='lever-grid']",
      title: "Two operating panels",
      body: "Production levers on the left, Funding levers on the right. Move any slider and watch the colored strip at the bottom of the card — it spells out the live trade-off in plain English.",
      placement: "top",
    },
    {
      target: "[data-coach='lever-funding']",
      title: "Three paths to satisfaction",
      body: "Deposit pricing, ad spend, and fee load (overdraft + maintenance) all shape customer satisfaction in the background. Cheap pricing and aggressive fees grind sat down slowly; sustained overdraft fees above $30 invite CFPB scrutiny. Below 35 satisfaction, deposits begin to walk on their own.",
      placement: "left",
    },
  ],
  capital: [
    {
      target: "[data-coach='capital-distributions']",
      title: "Returning and raising capital",
      body: "Dividends and buybacks lower CET1; buybacks shrink the share count, dividends reward holders directly. Equity issuance goes the other way — adds capital at a 5% underwriting fee and dilutes existing holders. The hint on each dial estimates share-count impact at current price.",
      placement: "right",
    },
    {
      target: "[data-coach='capital-wholesale']",
      title: "Wholesale funding",
      body: "FHLB advances float with Fed Funds. Sub debt locks in fixed at issuance (Fed Funds + 100bp at the time you issue) — useful in low-rate periods. Sub debt counts as Total Capital, not wholesale concentration.",
      placement: "left",
    },
    {
      target: "[data-coach='capital-provision']",
      title: "Provision override",
      body: "Override the CECL model to build reserves ahead of trouble or run lean for a few quarters. But charge-offs that outrun the allowance hit capital directly plus a remediation fee, and below 0.35x ACL/NPL coverage a mandatory catch-up overrides you. Auto keeps you safely reserved — and clear of the examiner.",
      placement: "top",
    },
    {
      target: "[data-coach='capital-impact']",
      title: "Capital impact preview",
      body: "Forecasted CET1 delta, cash, wholesale concentration (FHLB + brokered), and net income for next quarter. The combined impact of operations levers and capital decisions all flow into this strip.",
      placement: "top",
    },
  ],
  report: [
    {
      target: "[data-coach='report-title']",
      title: "Your filed call report",
      body: "FFIEC 051 — the regulatory quarterly your bank would actually file. Schedule RC for the balance sheet, RI for the income statement and credit quality, RC-R for regulatory capital ratios. Read-only — no decisions, just data.",
      placement: "bottom",
    },
  ],
  history: [
    {
      target: "[data-coach='history-bvps']",
      title: "Tangible Book Value per Share",
      body: "BVPS compounding plus cumulative dividends paid = total shareholder return — the primary scoring metric for the run. This chart traces BVPS across all 40 quarters so you can see the slope.",
      placement: "bottom",
    },
    {
      target: "[data-coach='history-sparklines']",
      title: "Ten-year sparklines",
      body: "Every key metric — profitability, capital, asset quality, balance-sheet composition, fee income, and customer satisfaction — gets its own 40-quarter trace. The detail table below has every quarter row by row.",
      placement: "top",
    },
  ],
};

const FLOW_LABELS = {
  intro: "Tutorial",
  levers: "Operations",
  capital: "Capital",
  report: "Call Report",
  history: "Tenure",
};

function Coach({ flow, onDismiss }) {
  const [step, setStep] = React.useState(0);
  const [pos, setPos] = React.useState(null);

  // Reset to step 0 whenever the flow changes.
  React.useEffect(() => {
    setStep(0);
    setPos(null);
  }, [flow]);

  const steps = flow ? COACH_FLOWS[flow] : null;

  React.useEffect(() => {
    if (!steps) return;
    const update = () => {
      const s = steps[step];
      if (!s) return setPos(null);
      const el = document.querySelector(s.target);
      if (!el) return setPos(null);
      const r = el.getBoundingClientRect();
      setPos({ x: r.left, y: r.top, w: r.width, h: r.height, placement: s.placement });
    };
    update();
    window.addEventListener("resize", update);
    const t = setInterval(update, 200);
    return () => { window.removeEventListener("resize", update); clearInterval(t); };
  }, [step, steps]);

  if (!steps || !pos) return null;
  const s = steps[step];
  const W = 320;
  const TIP_H_EST = 220;
  let x = pos.x + pos.w / 2 - W / 2;
  let y = pos.y + pos.h + 14;
  if (s.placement === "top") y = pos.y - 14 - 130;
  if (s.placement === "left") { x = pos.x - W - 14; y = pos.y + pos.h / 2 - 65; }
  if (s.placement === "right") { x = pos.x + pos.w + 14; y = pos.y + pos.h / 2 - 65; }
  x = Math.max(12, Math.min(window.innerWidth - W - 12, x));
  y = Math.max(12, Math.min(window.innerHeight - TIP_H_EST - 12, y));

  const flowLabel = FLOW_LABELS[flow] || "Tutorial";

  return (
    <>
      <div style={{
        position: "fixed", left: pos.x - 6, top: pos.y - 6,
        width: pos.w + 12, height: pos.h + 12,
        border: `2px solid ${COP.amber}`, borderRadius: 14,
        pointerEvents: "none", zIndex: 9998,
        boxShadow: `0 0 0 9999px rgba(8,12,18,0.55)`,
        transition: "all 0.2s",
      }} />
      <div style={{
        position: "fixed", left: x, top: y, width: W, zIndex: 9999,
        background: COP.panel, border: `1px solid ${COP.amber}`,
        borderRadius: 12, padding: "14px 16px",
        boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div className="label" style={{ color: COP.amber }}>{flowLabel} · {step + 1}/{steps.length}</div>
          <button onClick={onDismiss} style={{ background: "none", border: "none", color: COP.textMute, fontSize: 11, padding: 0 }}>skip</button>
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, marginTop: 6 }}>{s.title}</div>
        <div style={{ fontSize: 12, color: COP.textDim, lineHeight: 1.5, marginTop: 4 }}>{s.body}</div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 12 }}>
          {step > 0 && (
            <button onClick={() => setStep(step - 1)} style={{
              padding: "6px 12px", fontSize: 12, fontWeight: 600,
              background: COP.panel2, color: COP.text, border: "none", borderRadius: 6,
            }}>Back</button>
          )}
          <button onClick={() => step < steps.length - 1 ? setStep(step + 1) : onDismiss()} style={{
            padding: "6px 14px", fontSize: 12, fontWeight: 600,
            background: COP.amber, color: "#1a1408", border: "none", borderRadius: 6,
          }}>{step < steps.length - 1 ? "Next →" : "Got it"}</button>
        </div>
      </div>
    </>
  );
}

window.Coach = Coach;
window.COACH_FLOWS = COACH_FLOWS;

// First-quarter coach: small dismissible tooltips anchored to data-coach attributes.
const { palette: COP } = window.Theme;

const COACH_STEPS = [
  {
    id: "header",
    target: "[data-coach='header-progress']",
    title: "Your tenure, at a glance",
    body: "10 years = 40 quarters. The track lights up as you advance and tints by economic cycle.",
    placement: "bottom",
  },
  {
    id: "vitals",
    target: "[data-coach='header-vitals']",
    title: "Vital signs",
    body: "CET1 below 4.5% ends the run. Watch these four — they color-code by health.",
    placement: "bottom",
  },
  {
    id: "forecast",
    target: "[data-coach='forecast-pair']",
    title: "This quarter vs. next",
    body: "Posted actuals on the left. Your forecast on the right updates as you change levers and capital decisions.",
    placement: "top",
  },
  {
    id: "advance",
    target: "[data-coach='advance-btn']",
    title: "Run the quarter",
    body: "When you're satisfied with the forecast, advance. Outcomes will diverge — randomness, events, and macro shifts.",
    placement: "left",
  },
];

function Coach({ active, onDismiss }) {
  const [step, setStep] = React.useState(0);
  const [pos, setPos] = React.useState(null);

  React.useEffect(() => {
    if (!active) return;
    const update = () => {
      const s = COACH_STEPS[step];
      const el = document.querySelector(s.target);
      if (!el) return setPos(null);
      const r = el.getBoundingClientRect();
      setPos({ x: r.left, y: r.top, w: r.width, h: r.height, placement: s.placement });
    };
    update();
    window.addEventListener("resize", update);
    const t = setInterval(update, 200);
    return () => { window.removeEventListener("resize", update); clearInterval(t); };
  }, [step, active]);

  if (!active || !pos) return null;
  const s = COACH_STEPS[step];
  const W = 320;
  const TIP_H_EST = 200;
  let x = pos.x + pos.w / 2 - W / 2;
  let y = pos.y + pos.h + 14;
  if (s.placement === "top") y = pos.y - 14 - 130;
  if (s.placement === "left") { x = pos.x - W - 14; y = pos.y + pos.h / 2 - 65; }
  if (s.placement === "right") { x = pos.x + pos.w + 14; y = pos.y + pos.h / 2 - 65; }
  x = Math.max(12, Math.min(window.innerWidth - W - 12, x));
  y = Math.max(12, Math.min(window.innerHeight - TIP_H_EST - 12, y));

  return (
    <>
      {/* highlight ring */}
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
          <div className="label" style={{ color: COP.amber }}>Tutorial · {step + 1}/{COACH_STEPS.length}</div>
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
          <button onClick={() => step < COACH_STEPS.length - 1 ? setStep(step + 1) : onDismiss()} style={{
            padding: "6px 14px", fontSize: 12, fontWeight: 600,
            background: COP.amber, color: "#1a1408", border: "none", borderRadius: 6,
          }}>{step < COACH_STEPS.length - 1 ? "Next →" : "Got it"}</button>
        </div>
      </div>
    </>
  );
}

window.Coach = Coach;

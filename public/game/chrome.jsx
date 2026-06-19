// Chrome: Header, RightRail, AdvanceButton, ProgressTrack, EventLog
const { useState, useEffect, useRef, useMemo } = React;
const { palette: P, severity: SEV, cycleLabel: CYL, ratioColor: rcolor, quarterLabel: qlbl } = window.Theme;
const BE = window.BankEngine;

// ---------- Bank glyph ----------
function BankGlyph({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="2" y="9" width="20" height="2" fill={P.amber} />
      <rect x="2" y="20" width="20" height="2" fill={P.amber} />
      <rect x="4" y="11" width="2" height="9" fill={P.amber} />
      <rect x="9" y="11" width="2" height="9" fill={P.amber} />
      <rect x="13" y="11" width="2" height="9" fill={P.amber} />
      <rect x="18" y="11" width="2" height="9" fill={P.amber} />
      <path d="M2 9 L12 3 L22 9 Z" fill={P.amber} />
    </svg>
  );
}

// ---------- 40-quarter cycle track ----------
function ProgressTrack({ history, currentQ, height = 28, compact = false }) {
  // history is array of past quarters; build cycle band per quarter index 1..40
  const cycleBy = useMemo(() => {
    const m = {};
    for (const h of history) m[h.q] = h.cycle;
    return m;
  }, [history]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: compact ? 2 : 4, width: "100%" }}>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(40, 1fr)",
        columnGap: 1.5,
        fontSize: compact ? 7.5 : 9, color: P.textMute, letterSpacing: compact ? "0.04em" : "0.10em",
      }} className="mono">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} style={{
            gridColumn: `${i * 4 + 1} / span 4`,
            display: "flex", flexDirection: "column", alignItems: "flex-start", gap: compact ? 1 : 2,
          }}>
            <span style={{ lineHeight: 1 }}>Y{i + 1}</span>
            <span style={{ width: 1, height: compact ? 2 : 4, background: P.line }} />
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(40, 1fr)", gap: 1.5, height }}>
        {Array.from({ length: 40 }).map((_, i) => {
          const q = i + 1;
          const isPast = q < currentQ;
          const isCurrent = q === currentQ;
          const cycle = cycleBy[q];
          const fill = isPast ? (cycle ? P[cycle] : P.panelHi)
                     : isCurrent ? P.text
                     : P.lineSoft;
          return (
            <div key={q} style={{
              background: fill,
              opacity: isPast ? 0.85 : isCurrent ? 1 : 0.55,
              borderRadius: 2,
              transform: isCurrent ? "scaleY(1.25)" : "none",
              boxShadow: isCurrent ? `0 0 12px ${P.amber}80` : "none",
              transition: "all 0.3s",
            }} />
          );
        })}
      </div>
    </div>
  );
}

// ---------- Current cycle pill ----------
function CurrentCycle({ cycle, cycleQuarters }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      padding: "6px 12px", borderRadius: 999,
      background: P[cycle] + "1f",
      border: `1px solid ${P[cycle]}66`,
    }}>
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: P[cycle], boxShadow: `0 0 0 3px ${P[cycle]}33` }} />
      <span style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: P[cycle] }}>
        {CYL[cycle]}
      </span>
      <span style={{ width: 1, height: 11, background: P[cycle] + "55" }} />
      <span className="mono" style={{ fontSize: 10.5, color: P.textDim }}>
        Q{cycleQuarters + 1} in stage
      </span>
    </div>
  );
}

// ---------- KPI vital ----------
function Vital({ label, value, color, sub, dense }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 1, minWidth: dense ? 0 : 60 }}>
      <div className="label" style={{ fontSize: dense ? 8.5 : 9, color: P.textMute }}>{label}</div>
      <div className="num" style={{ fontSize: dense ? 14.5 : 16, fontWeight: 600, color: color || P.text, lineHeight: 1.05 }}>
        {value}
      </div>
      {sub && <div className="num" style={{ fontSize: 9.5, color: P.textMute, lineHeight: 1.1 }}>{sub}</div>}
    </div>
  );
}

// ---------- Compact cycle chip (mobile header) ----------
function CycleChip({ cycle }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 6,
      padding: "4px 9px", borderRadius: 999,
      background: P[cycle] + "1f", border: `1px solid ${P[cycle]}66`,
      flexShrink: 0,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: P[cycle] }} />
      <span style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: P[cycle] }}>
        {CYL[cycle]}
      </span>
    </div>
  );
}

// ---------- Header ----------
function Header({ state, ratios }) {
  const { label } = qlbl(state.quarter);
  const m = state.macro;
  const vp = window.Theme.useViewport();

  const vitals = (
    <>
      <Vital label="CET1" value={(ratios.cet1 * 100).toFixed(1) + "%"} color={rcolor("cet1", ratios.cet1)} />
      <Vital label="ROA" value={(ratios.roa * 100).toFixed(2) + "%"} color={rcolor("roa", ratios.roa)} />
      <Vital label="NIM" value={(ratios.nim * 100).toFixed(2) + "%"} color={rcolor("nim", ratios.nim)} />
      <Vital label="NPL" value={(ratios.nplRatio * 100).toFixed(2) + "%"} color={rcolor("nplRatio", ratios.nplRatio)} />
      <Vital label="Sat" value={Math.round(state.satisfaction ?? 70)} color={rcolor("satisfaction", state.satisfaction ?? 70)} />
      <div style={{ width: 1, height: 28, background: P.line, flexShrink: 0 }} />
      <Vital label="Net Income" value={BE.fmt$(state.lastIS.netIncome)} sub="last quarter" color={state.lastIS.netIncome < 0 ? P.bad : P.text} />
    </>
  );

  // ---- Compact (phone / tablet) header: stacked, scrollable vitals ----
  if (vp.compact) {
    return (
      <div style={{
        display: "flex", flexDirection: "column", gap: 7,
        padding: "8px 14px 9px",
        borderBottom: `1px solid ${P.line}`,
        background: P.bgRaised,
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, minWidth: 0 }}>
            <BankGlyph size={22} />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "-0.01em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>First Meridian Bank</div>
              <div style={{ fontSize: 9, color: P.textMute, letterSpacing: "0.12em" }} className="mono">NA · #1893</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, whiteSpace: "nowrap" }}>
              <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1, wordSpacing: "-3px" }} className="num">{label}</div>
              <div style={{ fontSize: 9.5, color: P.textMute, letterSpacing: "0.04em" }} className="mono">{state.quarter}/40</div>
            </div>
            <CycleChip cycle={m.cycle} />
          </div>
        </div>

        {/* Vitals — one line, spread across the full width */}
        <div data-coach="header-vitals" style={{ display: "flex", gap: 6, alignItems: "center", justifyContent: "space-between" }}>
          <Vital dense label="CET1" value={(ratios.cet1 * 100).toFixed(1) + "%"} color={rcolor("cet1", ratios.cet1)} />
          <Vital dense label="ROA" value={(ratios.roa * 100).toFixed(2) + "%"} color={rcolor("roa", ratios.roa)} />
          <Vital dense label="NIM" value={(ratios.nim * 100).toFixed(2) + "%"} color={rcolor("nim", ratios.nim)} />
          <Vital dense label="NPL" value={(ratios.nplRatio * 100).toFixed(2) + "%"} color={rcolor("nplRatio", ratios.nplRatio)} />
          <Vital dense label="Sat" value={Math.round(state.satisfaction ?? 70)} color={rcolor("satisfaction", state.satisfaction ?? 70)} />
          <Vital dense label="Net Income" value={BE.fmt$(state.lastIS.netIncome)} color={state.lastIS.netIncome < 0 ? P.bad : P.text} />
        </div>

        {/* Progress track full width — slim indicators */}
        <div data-coach="header-progress">
          <ProgressTrack history={state.history} currentQ={state.quarter} height={7} compact />
        </div>
      </div>
    );
  }

  // ---- Desktop header (unchanged three-column layout) ----
  return (
    <div style={{
      display: "flex", flexDirection: "column", gap: 6,
      padding: "6px 24px 12px",
      borderBottom: `1px solid ${P.line}`,
      background: P.bgRaised,
    }}>
      {/* Top row: brand · current quarter · cycle · vitals */}
      <div style={{ display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap" }}>
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <BankGlyph size={24} />
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 600, letterSpacing: "-0.01em" }}>First Meridian Bank</div>
            <div style={{ fontSize: 9.5, color: P.textMute, letterSpacing: "0.12em" }} className="mono">NA · CHARTER #1893</div>
          </div>
        </div>

        <div style={{ width: 1, height: 28, background: P.line }} />

        {/* Quarter + cycle */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }} data-coach="header-progress">
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, whiteSpace: "nowrap" }}>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1 }} className="num">
              {label}
            </div>
            <div style={{ fontSize: 10, color: P.textMute, letterSpacing: "0.10em" }} className="mono">
              {state.quarter}/40
            </div>
          </div>
          <CurrentCycle cycle={m.cycle} cycleQuarters={m.cycleQuarters} />
        </div>

        {/* Vitals — pushed to the right */}
        <div style={{ display: "flex", marginLeft: "auto", gap: 16, alignItems: "center", flexShrink: 0 }} data-coach="header-vitals">
          {vitals}
        </div>
      </div>

      {/* Progress track full width */}
      <ProgressTrack history={state.history} currentQ={state.quarter} height={13} />
    </div>
  );
}

// ---------- Macro tape ----------
function MacroTape({ macro }) {
  const items = [
    { l: "Fed Funds", v: (macro.fedFunds * 100).toFixed(2) + "%" },
    { l: "10Y UST", v: (macro.treasury10y * 100).toFixed(2) + "%" },
    { l: "Unemp.", v: (macro.unemployment * 100).toFixed(1) + "%" },
    { l: "GDP YoY", v: (macro.gdpGrowth * 100).toFixed(1) + "%" },
  ];
  const slope = macro.treasury10y - macro.fedFunds;
  return (
    <div className="panel-soft" style={{ padding: "12px 14px" }}>
      <div className="label" style={{ marginBottom: 8 }}>Macro Tape</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {items.map(it => (
          <div key={it.l}>
            <div style={{ fontSize: 10, color: P.textMute }}>{it.l}</div>
            <div className="num" style={{ fontSize: 15, fontWeight: 500 }}>{it.v}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${P.lineSoft}`, display: "flex", justifyContent: "space-between", fontSize: 10.5 }}>
        <span style={{ color: P.textMute }}>Yield curve</span>
        <span className="num" style={{ color: slope >= 0 ? P.good : P.bad, fontWeight: 600 }}>
          {slope >= 0 ? "+" : ""}{(slope * 100).toFixed(2)}%
        </span>
      </div>
    </div>
  );
}

// ---------- Event card ----------
const SEV_RANK = { bad: 4, warn: 3, info: 2, good: 1, neutral: 0, system: 0 };
function EventCard({ log, currentQ }) {
  // Show ALL non-system events from the just-completed quarter only.
  // If that quarter is quiet, say so — earlier quarters' events stay in the Activity Log.
  const targetQ = currentQ - 1;
  const events = targetQ > 0
    ? log.filter(e => e.type !== "system" && e.q === targetQ)
    : [];
  if (events.length === 0) {
    return (
      <div className="panel-soft" style={{ padding: "14px 16px" }}>
        <div className="label" style={{ marginBottom: 6 }}>Latest Quarter Event(s)</div>
        <div style={{ fontSize: 12, color: P.textMute, fontStyle: "italic" }}>
          Quiet quarter. No notable events.
        </div>
      </div>
    );
  }
  const topType = events.reduce(
    (acc, e) => (SEV_RANK[e.type] || 0) > (SEV_RANK[acc] || 0) ? e.type : acc,
    events[0].type
  );
  const topSev = SEV[topType] || SEV.neutral;
  return (
    <div className="panel-soft" style={{
      padding: "14px 16px",
      borderLeft: `3px solid ${topSev.dot}`,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <div className="label" style={{ color: topSev.fg }}>Latest Quarter Event(s)</div>
        <div className="mono" style={{ fontSize: 10, color: P.textMute }}>
          {qlbl(targetQ).label}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {events.map((e, i) => {
          const sev = SEV[e.type] || SEV.neutral;
          return (
            <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
              <div style={{ width: 6, height: 6, borderRadius: 3, background: sev.dot, flexShrink: 0, marginTop: 6 }} />
              <div style={{ fontSize: 12.5, lineHeight: 1.45, color: P.text, flex: 1, minWidth: 0 }}>
                {e.msg}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------- Event log ----------
function EventLog({ log }) {
  // Most recent at top.
  const items = log.slice(-40).reverse();
  return (
    <div className="panel-soft" style={{ padding: "12px 14px" }}>
      <div className="label" style={{ marginBottom: 8 }}>Activity Log</div>
      <div>
        {items.map((e, i) => {
          const sev = SEV[e.type] || SEV.neutral;
          const isLast = i === items.length - 1;
          return (
            <div key={i} style={{ display: "flex", gap: 8, padding: "6px 0", borderBottom: isLast ? "none" : `1px solid ${P.lineSoft}` }}>
              <div style={{ width: 6, height: 6, borderRadius: 3, background: sev.dot, flexShrink: 0, marginTop: 7 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="mono" style={{ fontSize: 9.5, color: P.textMute, letterSpacing: "0.1em" }}>
                  {e.q === 0 ? "PROLOGUE" : qlbl(e.q).label}
                </div>
                <div style={{ fontSize: 11.5, lineHeight: 1.4, color: sev.fg }}>{e.msg}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------- Advance button ----------
function AdvanceButton({ onAdvance, disabled, advancing, currentQ }) {
  const next = qlbl(currentQ);
  return (
    <button
      onClick={onAdvance}
      disabled={disabled || advancing}
      data-coach="advance-btn"
      className={disabled || advancing ? "" : "advance-btn"}
      style={{
        width: "100%",
        padding: "16px 20px",
        background: disabled ? P.panel2 : `linear-gradient(135deg, ${P.amber} 0%, ${P.amberDeep} 100%)`,
        color: disabled ? P.textMute : "#1a1408",
        border: "none",
        borderRadius: 12,
        fontSize: 15,
        fontWeight: 700,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        opacity: advancing ? 0.6 : 1,
        transition: "transform 0.12s, opacity 0.2s",
      }}
      onMouseDown={e => !disabled && (e.currentTarget.style.transform = "scale(0.98)")}
      onMouseUp={e => (e.currentTarget.style.transform = "scale(1)")}
      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
    >
      {advancing ? "Advancing…" :
        disabled ? "Run Complete" :
        <>Run {next.label} <span style={{ fontSize: 18, lineHeight: 1 }}>→</span></>}
    </button>
  );
}

// ---------- Right rail ----------
function RightRail({ state, ratios, onAdvance, advancing }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      borderLeft: `1px solid ${P.line}`,
      background: P.bg,
      width: 360,
      flexShrink: 0,
      minHeight: 0,
      height: "100%",
    }}>
      <div className="scroll-thin" style={{
        flex: 1,
        minHeight: 0,
        overflowY: "auto",
        padding: "12px 12px 6px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}>
        <MacroTape macro={state.macro} />
        <EventCard log={state.log} currentQ={state.quarter} />
        <EventLog log={state.log} />
      </div>
      <div style={{
        flexShrink: 0,
        padding: "10px 12px 12px",
        borderTop: `1px solid ${P.lineSoft}`,
        background: P.bg,
      }}>
        <AdvanceButton onAdvance={onAdvance} disabled={!!state.gameOver} advancing={advancing} currentQ={state.quarter} />
      </div>
    </div>
  );
}

// ---------- Tab icons ----------
function TabIcon({ id, size = 22, color }) {
  const c = { fill: "none", stroke: color, strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
  const c2 = { ...c, strokeWidth: 1.9 };
  const cThin = { ...c, strokeWidth: 1.4 };
  const cThinMid = { ...c, strokeWidth: 1.6 };
  let body = null;
  if (id === "cockpit") {
    // 3/4 circle gauge centered on the icon (12, 12), bottom 1/4 cut out.
    // Arc spans 270° from lower-left to lower-right via the top, with
    // 7 ticks evenly spaced 45° apart.
    body = (
      <>
        {/* Dial arc */}
        <path d="M 5.28 18.72 A 9.5 9.5 0 1 1 18.72 18.72" {...cThinMid} />
        {/* 7 tick marks evenly spaced across the 270° arc (45° apart) */}
        <line x1="5.28" y1="18.72" x2="6.27" y2="17.73" {...cThin} />
        <line x1="2.5" y1="12" x2="3.9" y2="12" {...cThin} />
        <line x1="5.28" y1="5.28" x2="6.27" y2="6.27" {...cThin} />
        <line x1="12" y1="2.5" x2="12" y2="3.9" {...cThin} />
        <line x1="18.72" y1="5.28" x2="17.73" y2="6.27" {...cThin} />
        <line x1="21.5" y1="12" x2="20.1" y2="12" {...cThin} />
        <line x1="18.72" y1="18.72" x2="17.73" y2="17.73" {...cThin} />
        {/* Needle pointing up-right (~55° above horizontal) */}
        <line x1="12" y1="12" x2="16.31" y2="5.86" {...cThin} />
        {/* Hub */}
        <circle cx="12" cy="12" r="1.8" fill={color} stroke="none" />
      </>
    );
  } else if (id === "levers") {
    // Crossed tool icon: main diagonal shaft (handle) running lower-left to
    // upper-right, with a cross-head at the upper-left jaw and a single
    // bar at the lower-right handle tip.
    body = (
      <>
        <line x1="4.5" y1="19.5" x2="19.5" y2="4.5" {...c} />
        <line x1="4.1" y1="7" x2="9.9" y2="7" {...cThin} />
        <line x1="7" y1="4.1" x2="7" y2="9.9" {...cThin} />
        <line x1="14.1" y1="17" x2="19.9" y2="17" {...cThin} />
      </>
    );
  } else if (id === "capital") {
    // Single coin cylinder stack — 4 coins.
    body = (
      <>
        <ellipse cx="12" cy="4.6" rx="7" ry="2" {...cThin} />
        <line x1="5" y1="4.6" x2="5" y2="19.4" {...cThin} />
        <line x1="19" y1="4.6" x2="19" y2="19.4" {...cThin} />
        <path d="M 5 8.3 A 7 2 0 0 0 19 8.3" {...cThin} />
        <path d="M 5 12 A 7 2 0 0 0 19 12" {...cThin} />
        <path d="M 5 15.7 A 7 2 0 0 0 19 15.7" {...cThin} />
        <path d="M 5 19.4 A 7 2 0 0 0 19 19.4" {...cThin} />
      </>
    );
  } else if (id === "report") {
    // Document with folded corner + text lines
    body = (
      <>
        <path d="M6 3 H14 L18.5 7.5 V21 H6 Z" {...c} />
        <path d="M14 3 V7.5 H18.5" {...c} />
        <line x1="9" y1="11.6" x2="15" y2="11.6" {...cThin} />
        <line x1="9" y1="14.6" x2="15" y2="14.6" {...cThin} />
        <line x1="9" y1="17.6" x2="12.5" y2="17.6" {...cThin} />
      </>
    );
  } else if (id === "history") {
    // X/Y axis with upward trend line + arrowhead
    body = (
      <>
        {/* Y axis */}
        <line x1="4" y1="3" x2="4" y2="21" {...c} />
        {/* X axis */}
        <line x1="4" y1="21" x2="21" y2="21" {...c} />
        {/* Trend line */}
        <polyline points="6.5 17 10.5 13.5 13.5 15.5 19 8" {...cThin} />
        {/* Arrowhead at line end */}
        <polyline points="16.03 8.46 19 8 19.46 10.97" {...cThin} />
      </>
    );
  } else if (id === "markets") {
    // Globe: circle with latitude + meridian lines (macro / markets feed)
    body = (
      <>
        <circle cx="12" cy="12" r="9" {...cThinMid} />
        <line x1="3" y1="12" x2="21" y2="12" {...cThin} />
        <line x1="3.8" y1="8.5" x2="20.2" y2="8.5" {...cThin} />
        <line x1="3.8" y1="15.5" x2="20.2" y2="15.5" {...cThin} />
        <path d="M12 3 C 7.5 7, 7.5 17, 12 21 C 16.5 17, 16.5 7, 12 3 Z" {...cThin} />
      </>
    );
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>{body}</svg>;
}

// ---------- Shared tab definitions ----------
const GAME_TABS = [
  { id: "cockpit",   label: "Overview",    short: "Overview", hint: "Forecast vs. actual" },
  { id: "levers",    label: "Operations",  short: "Ops",      hint: "Loans, deposits, securities" },
  { id: "capital",   label: "Treasury",    short: "Treasury", hint: "Dividends, buybacks, funding" },
  { id: "report",    label: "Call Report", short: "Report",   hint: "FFIEC quarterly" },
  { id: "history",   label: "Tenure",      short: "Tenure",   hint: "10-year track record" },
];
// Extra tab surfaced only in the compact shell, where the right rail is gone.
const MARKETS_TAB = { id: "markets", label: "Log & Macro", short: "Log & Macro", hint: "Macro & events" };

// ---------- Tab strip (vertical left rail) ----------
function TabStrip({ tab, setTab }) {
  const tabs = GAME_TABS;
  return (
    <div data-coach="tab-strip" style={{
      display: "flex",
      flexDirection: "column",
      width: 160,
      flexShrink: 0,
      padding: "10px 0",
      background: P.bgRaised,
      borderRight: `1px solid ${P.line}`,
    }}>
      {tabs.map(t => {
        const active = t.id === tab;
        return (
          <button key={t.id} onClick={() => setTab(t.id)} data-coach={`tab-${t.id}`}
            style={{
              padding: "10px 16px",
              background: active ? P.bg : "transparent",
              border: "none",
              borderLeft: `3px solid ${active ? P.amber : "transparent"}`,
              display: "flex", flexDirection: "row", alignItems: "center", gap: 11,
              textAlign: "left",
              fontFamily: "inherit",
              cursor: "pointer",
              transition: "border-color 0.12s, background 0.12s",
            }}>
            <TabIcon id={t.id} size={22} color={active ? P.amber : P.textMute} />
            <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
              <div style={{
                fontSize: 13,
                fontWeight: active ? 600 : 500,
                letterSpacing: "-0.01em",
                color: active ? P.text : P.textDim,
              }}>
                {t.label}
              </div>
              <div style={{
                fontSize: 10,
                letterSpacing: "0.02em",
                color: P.textMute,
              }}>
                {t.hint}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ---------- Markets surface (compact shell) ----------
// In the stacked layout the right rail disappears, so its macro + event
// content moves into its own tab reachable from the bottom nav.
function MobileMarkets({ state }) {
  return (
    <div className="tab-enter scroll-thin" style={{
      height: "100%", overflowY: "auto",
      padding: 12, display: "flex", flexDirection: "column", gap: 10,
    }}>
      <MacroTape macro={state.macro} />
      <EventCard log={state.log} currentQ={state.quarter} />
      <EventLog log={state.log} />
    </div>
  );
}

// ---------- Bottom navigation + advance (compact portrait shell) ----------
// Top stack is split in two — the run button on the left half, the Log & Macro
// reference tab on the right half — over a row of the five decision tabs.
function MobileNav({ tab, setTab, onAdvance, advancing, state }) {
  const marketsActive = tab === "markets";
  return (
    <div style={{
      flexShrink: 0,
      background: P.bgRaised,
      borderTop: `1px solid ${P.line}`,
      paddingBottom: "env(safe-area-inset-bottom)",
    }}>
      {/* Top stack: run (left) | Log & Macro (right) */}
      <div style={{ display: "flex", alignItems: "stretch", gap: 8, padding: "8px 12px 6px" }}>
        <div style={{ flex: 1, minWidth: 0, display: "flex" }}>
          <AdvanceButton onAdvance={onAdvance} disabled={!!state.gameOver} advancing={advancing} currentQ={state.quarter} />
        </div>
        <button onClick={() => setTab("markets")} data-coach="tab-markets" data-active={marketsActive}
          style={{
            flex: 1, minWidth: 0,
            border: `1px solid ${marketsActive ? P.amber : P.line}`,
            background: marketsActive ? P.amber + "14" : P.panel,
            borderRadius: 12, cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4,
            padding: "8px 6px",
            WebkitTapHighlightColor: "transparent",
          }}>
          <TabIcon id="markets" size={20} color={marketsActive ? P.amber : P.textMute} />
          <span style={{ fontSize: 11.5, fontWeight: 600, color: marketsActive ? P.amber : P.textDim }}>Log &amp; Macro</span>
        </button>
      </div>
      {/* Decision tabs */}
      <div data-coach="tab-strip" style={{ display: "flex", borderTop: `1px solid ${P.lineSoft}` }}>
        {GAME_TABS.map(t => {
          const active = t.id === tab;
          return (
            <button key={t.id} onClick={() => setTab(t.id)} data-coach={`tab-${t.id}`}
              data-active={active} className="mnav-btn">
              <TabIcon id={t.id} size={21} color={active ? P.amber : P.textMute} />
              <span className="mnav-label" style={{ color: active ? P.text : P.textMute, fontWeight: active ? 600 : 500 }}>
                {t.short}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ---------- Compact advance button (side rail, landscape) ----------
function CompactAdvance({ onAdvance, disabled, advancing, currentQ }) {
  const next = qlbl(currentQ);
  return (
    <button
      onClick={onAdvance}
      disabled={disabled || advancing}
      data-coach="advance-btn"
      className={disabled || advancing ? "" : "advance-btn"}
      style={{
        width: "100%",
        padding: "9px 4px",
        background: disabled ? P.panel2 : `linear-gradient(135deg, ${P.amber} 0%, ${P.amberDeep} 100%)`,
        color: disabled ? P.textMute : "#1a1408",
        border: "none",
        borderRadius: 10,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 1,
        fontWeight: 700, letterSpacing: "0.03em", textTransform: "uppercase",
        opacity: advancing ? 0.6 : 1,
      }}
    >
      <span style={{ fontSize: 17, lineHeight: 1 }}>{advancing ? "…" : disabled ? "■" : "→"}</span>
      <span style={{ fontSize: 9 }}>{advancing ? "Wait" : disabled ? "Done" : next.label}</span>
    </button>
  );
}

// ---------- Side navigation (compact landscape / short screens) ----------
// Landscape phones are wide but short, so a bottom bar eats the limited
// vertical space. The nav lives on a narrow vertical rail instead.
function SideNav({ tab, setTab, onAdvance, advancing, state }) {
  const navItems = [...GAME_TABS, MARKETS_TAB];
  return (
    <div style={{
      display: "flex", flexDirection: "column",
      width: 66, flexShrink: 0,
      background: P.bgRaised, borderRight: `1px solid ${P.line}`,
    }}>
      <div data-coach="tab-strip" className="scroll-thin" style={{ flex: 1, minHeight: 0, overflowY: "auto", display: "flex", flexDirection: "column" }}>
        {navItems.map(t => {
          const active = t.id === tab;
          return (
            <button key={t.id} onClick={() => setTab(t.id)} data-coach={`tab-${t.id}`} data-active={active}
              style={{
                border: "none",
                borderLeft: `3px solid ${active ? P.amber : "transparent"}`,
                background: active ? P.bg : "transparent",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
                padding: "9px 2px 8px", cursor: "pointer",
                WebkitTapHighlightColor: "transparent",
              }}>
              <TabIcon id={t.id} size={20} color={active ? P.amber : P.textMute} />
              <span style={{ fontSize: 9, lineHeight: 1, color: active ? P.text : P.textMute, fontWeight: active ? 600 : 500 }}>{t.short}</span>
            </button>
          );
        })}
      </div>
      <div style={{ flexShrink: 0, padding: 8, borderTop: `1px solid ${P.lineSoft}`, paddingBottom: "max(8px, env(safe-area-inset-bottom))" }}>
        <CompactAdvance onAdvance={onAdvance} disabled={!!state.gameOver} advancing={advancing} currentQ={state.quarter} />
      </div>
    </div>
  );
}

Object.assign(window, {
  BankGlyph, ProgressTrack, CurrentCycle, CycleChip, Vital,
  Header, MacroTape, EventCard, EventLog, AdvanceButton, RightRail, TabStrip,
  MobileNav, MobileMarkets, SideNav, CompactAdvance, GAME_TABS, MARKETS_TAB,
});

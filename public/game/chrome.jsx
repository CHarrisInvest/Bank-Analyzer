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
function ProgressTrack({ history, currentQ, height = 28 }) {
  // history is array of past quarters; build cycle band per quarter index 1..40
  const cycleBy = useMemo(() => {
    const m = {};
    for (const h of history) m[h.q] = h.cycle;
    return m;
  }, [history]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: P.textMute, letterSpacing: "0.10em" }} className="mono">
        <span>Y1</span><span>Y2</span><span>Y3</span><span>Y4</span><span>Y5</span><span>Y6</span><span>Y7</span><span>Y8</span><span>Y9</span><span>Y10</span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(40, 1fr)", gap: 1.5, height }}>
        {Array.from({ length: 40 }).map((_, i) => {
          const q = i + 1;
          const isPast = q < currentQ;
          const isCurrent = q === currentQ;
          const cycle = cycleBy[q];
          const fill = isPast ? (cycle ? P[cycle] : P.panelHi)
                     : isCurrent ? P.amber
                     : P.lineSoft;
          const isYearMark = q % 4 === 0;
          return (
            <div key={q} style={{
              background: fill,
              opacity: isPast ? 0.85 : isCurrent ? 1 : 0.55,
              borderRadius: 2,
              borderRight: isYearMark && !isCurrent ? `1px solid ${P.line}` : "none",
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
function Vital({ label, value, color, sub }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 1, minWidth: 60 }}>
      <div className="label" style={{ fontSize: 9, color: P.textMute }}>{label}</div>
      <div className="num" style={{ fontSize: 16, fontWeight: 600, color: color || P.text, lineHeight: 1.05 }}>
        {value}
      </div>
      {sub && <div className="num" style={{ fontSize: 9.5, color: P.textMute, lineHeight: 1.1 }}>{sub}</div>}
    </div>
  );
}

// ---------- Header ----------
function Header({ state, ratios }) {
  const { label } = qlbl(state.quarter);
  const m = state.macro;
  return (
    <div style={{
      display: "flex", flexDirection: "column", gap: 6,
      padding: "6px 24px 7px",
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
        <div style={{ display: "flex", marginLeft: "auto", gap: 18, alignItems: "center", flexShrink: 0 }} data-coach="header-vitals">
          <Vital label="CET1" value={(ratios.cet1 * 100).toFixed(1) + "%"} color={rcolor("cet1", ratios.cet1)} />
          <Vital label="ROA" value={(ratios.roa * 100).toFixed(2) + "%"} color={rcolor("roa", ratios.roa)} />
          <Vital label="NIM" value={(ratios.nim * 100).toFixed(2) + "%"} color={rcolor("nim", ratios.nim)} />
          <Vital label="NPL" value={(ratios.nplRatio * 100).toFixed(2) + "%"} color={rcolor("nplRatio", ratios.nplRatio)} />
          <div style={{ width: 1, height: 28, background: P.line }} />
          <Vital label="Net Income" value={BE.fmt$(state.lastIS.netIncome)} sub="last quarter" color={state.lastIS.netIncome < 0 ? P.bad : P.text} />
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

// ---------- Tab strip (vertical left rail) ----------
function TabStrip({ tab, setTab }) {
  const tabs = [
    { id: "cockpit",   label: "Overview" },
    { id: "levers",    label: "Operations" },
    { id: "capital",   label: "Capital" },
    { id: "report",    label: "Call Report" },
    { id: "history",   label: "Tenure" },
  ];
  return (
    <div data-coach="tab-strip" style={{
      display: "flex",
      flexDirection: "column",
      width: 150,
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
              padding: "11px 18px",
              background: active ? P.bg : "transparent",
              border: "none",
              borderLeft: `3px solid ${active ? P.amber : "transparent"}`,
              color: active ? P.text : P.textDim,
              fontSize: 13,
              fontWeight: active ? 600 : 500,
              letterSpacing: "-0.01em",
              textAlign: "left",
              fontFamily: "inherit",
              cursor: "pointer",
              transition: "color 0.12s, border-color 0.12s, background 0.12s",
            }}>
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

Object.assign(window, {
  BankGlyph, ProgressTrack, CurrentCycle, Vital,
  Header, MacroTape, EventCard, EventLog, AdvanceButton, RightRail, TabStrip,
});

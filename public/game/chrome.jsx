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
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(40, 1fr)",
        columnGap: 1.5,
        fontSize: 9, color: P.textMute, letterSpacing: "0.10em",
      }} className="mono">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} style={{
            gridColumn: `${i * 4 + 1} / span 4`,
            display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2,
          }}>
            <span style={{ lineHeight: 1 }}>Y{i + 1}</span>
            <span style={{ width: 1, height: 4, background: P.line }} />
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
          <Vital label="CET1" value={(ratios.cet1 * 100).toFixed(1) + "%"} color={rcolor("cet1", ratios.cet1)} />
          <Vital label="ROA" value={(ratios.roa * 100).toFixed(2) + "%"} color={rcolor("roa", ratios.roa)} />
          <Vital label="NIM" value={(ratios.nim * 100).toFixed(2) + "%"} color={rcolor("nim", ratios.nim)} />
          <Vital label="NPL" value={(ratios.nplRatio * 100).toFixed(2) + "%"} color={rcolor("nplRatio", ratios.nplRatio)} />
          <Vital label="Sat" value={Math.round(state.satisfaction ?? 70)} color={rcolor("satisfaction", state.satisfaction ?? 70)} />
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

// ---------- Tab icons ----------
function TabIcon({ id, size = 22, color }) {
  const c = { fill: "none", stroke: color, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  const c2 = { ...c, strokeWidth: 2.3 };
  const cThin = { ...c, strokeWidth: 1.4 };
  const cThinMid = { ...c, strokeWidth: 1.6 };
  let body = null;
  if (id === "cockpit") {
    // Gauge / speedometer — larger dial, longer needle
    body = (
      <>
        {/* Dial face — larger semicircle */}
        <path d="M2.5 18.5 A 9.5 9.5 0 0 1 21.5 18.5" {...cThin} />
        {/* Tick marks (5 evenly spaced, just inside the arc) */}
        <line x1="2.5" y1="18.5" x2="4.4" y2="18.5" {...cThin} />
        <line x1="5.28" y1="11.78" x2="6.62" y2="13.12" {...cThin} />
        <line x1="12" y1="9" x2="12" y2="10.9" {...cThin} />
        <line x1="17.38" y1="13.12" x2="18.72" y2="11.78" {...cThin} />
        <line x1="19.6" y1="18.5" x2="21.5" y2="18.5" {...cThin} />
        {/* Needle — longer, pointing up-right */}
        <line x1="12" y1="18.5" x2="17.4" y2="10.65" {...cThinMid} />
        {/* Hub */}
        <circle cx="12" cy="18.5" r="1.8" fill={color} stroke="none" />
      </>
    );
  } else if (id === "levers") {
    // Crossed wrench + pencil — vector trace of the reference icon, drawn in
    // 1024-space and scaled into the 24x24 viewBox.
    const LEVERS_PATHS = [
      "M514,551 L511,541 L464,494 L453,491",
      "M515,552 L527,556 L667,692 L677,697 L694,700 L711,697 L727,687 L735,677 L740,662 L739,641 L733,628 L591,490 L588,479",
      "M347,253 L356,255",
      "M729,336 L588,477",
      "M344,607 L333,612 L304,667 L301,682 L303,701",
      "M289,321 L288,315",
      "M304,702 L321,704 L347,697 L391,673 L395,669 L398,660",
      "M730,335 L730,326",
      "M587,478 L577,475 L563,462 L529,428 L526,418",
      "M687,278 L668,277 L663,279 L526,416",
      "M525,417 L512,413 L472,373 L470,367 L472,340 L466,312 L453,289 L437,272 L412,257 L394,252 L372,250 L360,251 L357,254",
      "M357,256 L360,267 L396,303 L398,308 L391,350 L387,355 L352,363 L341,362 L304,327 L290,322",
      "M649,466 L744,369 L746,361 L744,348 L739,341 L731,336",
      "M514,552 L412,655 L399,659",
      "M345,606 L349,595 L451,491",
      "M731,325 L747,310 L755,295 L756,282 L750,265 L737,256 L715,256 L700,265 L688,278",
      "M303,702 L288,716",
      "M688,279 L691,289 L722,320 L730,325",
      "M345,607 L398,659",
      "M289,322 L286,325 L285,337 L288,365 L296,386 L306,401 L326,420 L346,431 L364,436 L402,437 L408,439 L448,478 L452,490",
      "M708,644 L699,635 L683,636 L676,645 L676,658 L684,667 L701,667 L708,660 L708,644",
    ];
    body = (
      <g transform="scale(0.0234375)">
        {LEVERS_PATHS.map((d, i) => (
          <path key={i} d={d} vectorEffect="non-scaling-stroke" {...c} />
        ))}
      </g>
    );
  } else if (id === "capital") {
    // Three overlapping coin stacks of varying heights, modeled after the
    // provided reference: back-right is tallest (4 coins), middle-left is
    // medium (3 coins), front-bottom is shortest (1 coin, closest to viewer).
    // Each stack is rendered as: top rim ellipse + two side lines +
    // (n-1) internal divider arcs + bottom front-arc.
    //
    // Stacks are drawn back-to-front. SVG masks hide each back stack where
    // the front stacks cover it so the three read as cleanly stacked.
    const drawStack = (cx, cyTop, rx, ry, n, h, key) => {
      const cyBot = cyTop + n * h;
      return (
        <g key={key}>
          <ellipse cx={cx} cy={cyTop} rx={rx} ry={ry} {...c} />
          <line x1={cx - rx} y1={cyTop} x2={cx - rx} y2={cyBot} {...c} />
          <line x1={cx + rx} y1={cyTop} x2={cx + rx} y2={cyBot} {...c} />
          {Array.from({ length: n - 1 }, (_, i) => {
            const y = cyTop + (i + 1) * h;
            return (
              <path
                key={i}
                d={`M ${cx - rx} ${y} A ${rx} ${ry} 0 0 0 ${cx + rx} ${y}`}
                {...c}
              />
            );
          })}
          <path
            d={`M ${cx - rx} ${cyBot} A ${rx} ${ry} 0 0 0 ${cx + rx} ${cyBot}`}
            {...c}
          />
        </g>
      );
    };
    const silhouette = (cx, cyTop, rx, ry, height) => {
      const cyBot = cyTop + height;
      return `M ${cx - rx} ${cyTop} A ${rx} ${ry} 0 0 1 ${cx + rx} ${cyTop} L ${cx + rx} ${cyBot} A ${rx} ${ry} 0 0 0 ${cx - rx} ${cyBot} Z`;
    };
    body = (
      <>
        <defs>
          <mask id="treasury-mask-back" maskUnits="userSpaceOnUse">
            <rect x="0" y="0" width="24" height="24" fill="white" />
            <path d={silhouette(8, 9, 4, 2, 9)} fill="black" />
            <path d={silhouette(12, 15.5, 4.5, 2, 3)} fill="black" />
          </mask>
          <mask id="treasury-mask-mid" maskUnits="userSpaceOnUse">
            <rect x="0" y="0" width="24" height="24" fill="white" />
            <path d={silhouette(12, 15.5, 4.5, 2, 3)} fill="black" />
          </mask>
        </defs>
        <g mask="url(#treasury-mask-back)">
          {drawStack(16, 6.5, 4.5, 2, 4, 3, "back-right")}
        </g>
        <g mask="url(#treasury-mask-mid)">
          {drawStack(8, 9, 4, 2, 3, 3, "middle-left")}
        </g>
        {drawStack(12, 15.5, 4.5, 2, 1, 3, "front-bottom")}
      </>
    );
  } else if (id === "report") {
    // Document with folded corner + text lines
    body = (
      <>
        <path d="M6 3 H14 L18.5 7.5 V21 H6 Z" {...c} />
        <path d="M14 3 V7.5 H18.5" {...c} />
        <line x1="9" y1="11.6" x2="15" y2="11.6" {...c} />
        <line x1="9" y1="14.6" x2="15" y2="14.6" {...c} />
        <line x1="9" y1="17.6" x2="12.5" y2="17.6" {...c} />
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
        <polyline points="6.5 17 10.5 13.5 13.5 15.5 19 8" {...c} />
        {/* Arrowhead at line end */}
        <polyline points="16 8 19 8 19 11" {...c} />
      </>
    );
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" style={{ flexShrink: 0 }}>{body}</svg>;
}

// ---------- Tab strip (vertical left rail) ----------
function TabStrip({ tab, setTab }) {
  const tabs = [
    { id: "cockpit",   label: "Overview",    hint: "Forecast vs. actual" },
    { id: "levers",    label: "Operations",  hint: "Loans, deposits, securities" },
    { id: "capital",   label: "Treasury",    hint: "Dividends, buybacks, funding" },
    { id: "report",    label: "Call Report", hint: "FFIEC quarterly" },
    { id: "history",   label: "Tenure",      hint: "10-year track record" },
  ];
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

Object.assign(window, {
  BankGlyph, ProgressTrack, CurrentCycle, Vital,
  Header, MacroTape, EventCard, EventLog, AdvanceButton, RightRail, TabStrip,
});

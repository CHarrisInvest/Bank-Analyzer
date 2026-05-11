// Tenure / History tab — 10-year timeline, sparklines, quarterly detail.
const { palette: HP, ratioColor: hcolor, quarterLabel: hqlbl, cycleLabel: HCYL } = window.Theme;
const HBE = window.BankEngine;

// Build cycle bands from history for visual shading
function cycleBands(history) {
  const bands = [];
  let start = 1, cur = null;
  for (const h of history) {
    if (h.cycle !== cur) {
      if (cur) bands.push({ start, end: h.q - 1, cycle: cur });
      start = h.q;
      cur = h.cycle;
    }
  }
  if (cur && history.length > 0) {
    bands.push({ start, end: history[history.length - 1].q, cycle: cur });
  }
  return bands;
}

function Timeline({ history, log }) {
  if (history.length === 0) {
    return (
      <div className="panel panel-pad" style={{ minHeight: 240, display: "flex", alignItems: "center", justifyContent: "center", color: HP.textMute, fontStyle: "italic" }}>
        No history yet — advance a quarter to start the chart.
      </div>
    );
  }
  const W = 1080, H = 220, pad = { l: 56, r: 56, t: 24, b: 32 };
  const bands = cycleBands(history);
  const xFor = (q) => pad.l + ((q - 1) / 39) * (W - pad.l - pad.r);

  // Track BVPS as the headline series
  const bvps = history.map(h => h.tbvPerShare);
  const bMax = Math.max(...bvps, 17);
  const bMin = Math.min(...bvps, 14);
  const bSpan = Math.max(0.5, bMax - bMin);
  const yFor = (v) => pad.t + (1 - (v - bMin) / bSpan) * (H - pad.t - pad.b);

  const path = history.map((h, i) => `${i === 0 ? "M" : "L"} ${xFor(h.q)} ${yFor(h.tbvPerShare)}`).join(" ");
  const fillPath = `${path} L ${xFor(history[history.length - 1].q)} ${H - pad.b} L ${xFor(history[0].q)} ${H - pad.b} Z`;

  // Place key event markers
  const eventMarks = log.filter(e => e.type === "bad" || e.type === "warn" || e.type === "good").slice(-12);

  return (
    <div className="panel panel-pad" data-coach="history-bvps">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
        <div className="label-strong">Tangible Book Value per Share — 10-Year Track</div>
        <div style={{ fontSize: 13, color: HP.textMute }}>Cycle bands shaded · key events flagged</div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }}>
        {/* Cycle bands */}
        {bands.map((b, i) => (
          <rect key={i}
            x={xFor(b.start) - 4}
            y={pad.t}
            width={xFor(b.end) - xFor(b.start) + 8}
            height={H - pad.t - pad.b}
            fill={HP[b.cycle]}
            opacity="0.07" />
        ))}
        {/* Year gridlines */}
        {[1, 5, 9, 13, 17, 21, 25, 29, 33, 37].map(q => (
          <g key={q}>
            <line x1={xFor(q)} x2={xFor(q)} y1={pad.t} y2={H - pad.b} stroke={HP.lineSoft} strokeDasharray="2,4" />
            <text x={xFor(q)} y={H - pad.b + 16} fill={HP.textMute} fontSize="10" textAnchor="middle" fontFamily="Geist Mono">
              Y{Math.ceil(q / 4)}
            </text>
          </g>
        ))}
        {/* Y-axis ticks */}
        {[bMin, (bMin + bMax) / 2, bMax].map((v, i) => (
          <g key={i}>
            <text x={pad.l - 8} y={yFor(v) + 3} fill={HP.textMute} fontSize="10" textAnchor="end" fontFamily="Geist Mono">${v.toFixed(2)}</text>
            <line x1={pad.l} x2={W - pad.r} y1={yFor(v)} y2={yFor(v)} stroke={HP.lineSoft} strokeDasharray="1,3" />
          </g>
        ))}
        {/* Area fill */}
        <path d={fillPath} fill={HP.amber} opacity="0.10" />
        {/* Line */}
        <path d={path} stroke={HP.amber} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {/* Event markers */}
        {eventMarks.map((e, i) => {
          const h = history.find(x => x.q === e.q);
          if (!h) return null;
          const c = e.type === "bad" ? HP.bad : e.type === "warn" ? HP.warn : HP.good;
          return (
            <g key={i}>
              <line x1={xFor(e.q)} x2={xFor(e.q)} y1={pad.t} y2={H - pad.b} stroke={c} strokeWidth="1" opacity="0.4" strokeDasharray="2,2" />
              <circle cx={xFor(e.q)} cy={yFor(h.tbvPerShare)} r="4" fill={c} stroke={HP.bg} strokeWidth="2" />
            </g>
          );
        })}
        {/* Cycle labels at top */}
        {bands.map((b, i) => {
          const mid = (xFor(b.start) + xFor(b.end)) / 2;
          if (xFor(b.end) - xFor(b.start) < 40) return null;
          return (
            <text key={i} x={mid} y={pad.t - 6} fill={HP[b.cycle]} fontSize="9.5" textAnchor="middle" fontWeight="600" letterSpacing="1.4" fontFamily="Geist Mono">
              {HCYL[b.cycle].toUpperCase()}
            </text>
          );
        })}
      </svg>
      {/* Legend */}
      <div style={{ display: "flex", gap: 18, marginTop: 8, fontSize: 11, color: HP.textDim, justifyContent: "center" }}>
        {Object.keys(HCYL).map(c => (
          <div key={c} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 12, height: 8, background: HP[c], opacity: 0.4, borderRadius: 2 }} />
            {HCYL[c]}
          </div>
        ))}
      </div>
    </div>
  );
}

function Sparkline({ label, history, accessor, fmt, ratioName }) {
  if (history.length < 2) return (
    <div className="panel-soft" style={{ padding: 12, height: 110, display: "flex", alignItems: "center", justifyContent: "center", color: HP.textMute, fontSize: 11 }}>
      <div>{label}<br/><span style={{ fontStyle: "italic" }}>insufficient data</span></div>
    </div>
  );
  const W = 220, H = 60;
  const vals = history.map(accessor);
  const vMin = Math.min(...vals);
  const vMax = Math.max(...vals);
  const span = Math.max(1e-9, vMax - vMin);
  const xFor = (i) => (i / (vals.length - 1)) * W;
  const yFor = (v) => H - 6 - ((v - vMin) / span) * (H - 12);
  const path = vals.map((v, i) => `${i === 0 ? "M" : "L"} ${xFor(i)} ${yFor(v)}`).join(" ");
  const last = vals[vals.length - 1];
  const tone = ratioName ? hcolor(ratioName, last) : HP.amber;
  return (
    <div className="panel-soft" style={{ padding: "10px 12px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div className="label" style={{ fontSize: 9.5 }}>{label}</div>
        <div className="num" style={{ fontSize: 14, fontWeight: 600, color: tone }}>{fmt(last)}</div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: 56, marginTop: 4 }}>
        <path d={`${path} L ${W} ${H} L 0 ${H} Z`} fill={tone} opacity="0.12" />
        <path d={path} stroke={tone} strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <circle cx={xFor(vals.length - 1)} cy={yFor(last)} r="2.5" fill={tone} />
      </svg>
    </div>
  );
}

function HistoryTab({ state }) {
  const h = state.history;
  return (
    <div className="tab-enter scroll-thin" style={{ padding: 14, height: "100%", overflowY: "auto", display: "flex", flexDirection: "column", gap: 12 }}>
      <Timeline history={h} log={state.log} />

      <div data-coach="history-sparklines" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
        <Sparkline label="Net Income" history={h} accessor={x => x.netIncome} fmt={HBE.fmt$} />
        <Sparkline label="NIM" history={h} accessor={x => x.nim} fmt={v => (v*100).toFixed(2) + "%"} ratioName="nim" />
        <Sparkline label="ROA" history={h} accessor={x => x.roa} fmt={v => (v*100).toFixed(2) + "%"} ratioName="roa" />
        <Sparkline label="ROE" history={h} accessor={x => x.roe} fmt={v => (v*100).toFixed(1) + "%"} ratioName="roe" />
        <Sparkline label="CET1" history={h} accessor={x => x.cet1} fmt={v => (v*100).toFixed(2) + "%"} ratioName="cet1" />
        <Sparkline label="NPL Ratio" history={h} accessor={x => x.nplRatio} fmt={v => (v*100).toFixed(2) + "%"} ratioName="nplRatio" />
        <Sparkline label="L/D" history={h} accessor={x => x.ltd} fmt={v => v.toFixed(2) + "x"} ratioName="ltd" />
        <Sparkline label="AOCI" history={h} accessor={x => x.aoci} fmt={HBE.fmt$} />
        <Sparkline label="Total Assets" history={h} accessor={x => x.assets} fmt={HBE.fmt$} />
        <Sparkline label="Loans" history={h} accessor={x => x.loans} fmt={HBE.fmt$} />
        <Sparkline label="Deposits" history={h} accessor={x => x.deposits} fmt={HBE.fmt$} />
        <Sparkline label="Share Price" history={h} accessor={x => x.sharePrice} fmt={v => "$" + v.toFixed(2)} />
      </div>

      <div className="panel panel-pad">
        <div className="label-strong" style={{ marginBottom: 10 }}>Quarterly Detail</div>
        <div className="scroll-thin" style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11.5 }} className="num">
            <thead>
              <tr style={{ color: HP.textMute, fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                {["Qtr", "Cycle", "Assets", "Loans", "Deposits", "Net Inc.", "NIM", "ROA", "CET1", "NPL", "L/D", "BVPS", "Px"].map((l, i) => (
                  <th key={l} style={{ textAlign: i < 2 ? "left" : "right", padding: "8px 10px", borderBottom: `1px solid ${HP.line}`, fontWeight: 600 }}>{l}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {h.slice().reverse().map(r => (
                <tr key={r.q} style={{ borderBottom: `1px solid ${HP.lineSoft}` }}>
                  <td style={{ padding: "7px 10px", color: HP.text, fontWeight: 600 }}>{hqlbl(r.q).label}</td>
                  <td style={{ padding: "7px 10px", color: HP[r.cycle] }}>{HCYL[r.cycle]}</td>
                  <td style={{ padding: "7px 10px", textAlign: "right" }}>{HBE.fmt$(r.assets)}</td>
                  <td style={{ padding: "7px 10px", textAlign: "right" }}>{HBE.fmt$(r.loans)}</td>
                  <td style={{ padding: "7px 10px", textAlign: "right" }}>{HBE.fmt$(r.deposits)}</td>
                  <td style={{ padding: "7px 10px", textAlign: "right", color: r.netIncome < 0 ? HP.bad : HP.text }}>{HBE.fmt$(r.netIncome)}</td>
                  <td style={{ padding: "7px 10px", textAlign: "right", color: hcolor("nim", r.nim) }}>{(r.nim * 100).toFixed(2)}%</td>
                  <td style={{ padding: "7px 10px", textAlign: "right", color: hcolor("roa", r.roa) }}>{(r.roa * 100).toFixed(2)}%</td>
                  <td style={{ padding: "7px 10px", textAlign: "right", color: hcolor("cet1", r.cet1) }}>{(r.cet1 * 100).toFixed(1)}%</td>
                  <td style={{ padding: "7px 10px", textAlign: "right", color: hcolor("nplRatio", r.nplRatio) }}>{(r.nplRatio * 100).toFixed(2)}%</td>
                  <td style={{ padding: "7px 10px", textAlign: "right", color: hcolor("ltd", r.ltd) }}>{r.ltd.toFixed(2)}x</td>
                  <td style={{ padding: "7px 10px", textAlign: "right" }}>${r.tbvPerShare.toFixed(2)}</td>
                  <td style={{ padding: "7px 10px", textAlign: "right", color: HP.amber }}>${r.sharePrice.toFixed(2)}</td>
                </tr>
              ))}
              {h.length === 0 && (
                <tr><td colSpan={13} style={{ padding: 20, textAlign: "center", color: HP.textMute, fontStyle: "italic" }}>
                  No quarters posted yet. Run a quarter to begin tracking.
                </td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { HistoryTab, Timeline, Sparkline });

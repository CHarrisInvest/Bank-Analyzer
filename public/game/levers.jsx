// Levers tab — operations: loans, underwriting, deposit pricing, securities duration, liquidity.
const { palette: LP, ratioColor: lcolor } = window.Theme;
const LBE = window.BankEngine;

const LEVERS = [
  {
    key: "loanGrowth",
    title: "Loan Origination Pace",
    subtitle: "How aggressively to chase new loan demand",
    min: -2, max: 2, step: 1,
    marks: [
      { v: -2, l: "Shrink",      hint: "Run off the book" },
      { v: -1, l: "Slow",        hint: "Renew only" },
      { v:  0, l: "Match Demand",hint: "Default" },
      { v:  1, l: "Push",        hint: "Above-market growth" },
      { v:  2, l: "Floor It",    hint: "Aggressive risk-on" },
    ],
    color: LP.amber,
    risk: (v) => v >= 1 ? "Builds latent credit risk; new yields modestly lower" : v <= -1 ? "Forfeits NII; protects capital" : "Balanced",
  },
  {
    key: "underwriting",
    title: "Underwriting Stance",
    subtitle: "Tightness of credit standards on new loans",
    min: -2, max: 2, step: 1,
    marks: [
      { v: -2, l: "Loose" },
      { v: -1, l: "Easy" },
      { v:  0, l: "Standard" },
      { v:  1, l: "Tight" },
      { v:  2, l: "Strict" },
    ],
    color: LP.info,
    risk: (v) => v <= -1 ? "Lower yields, higher latent NPL formation" : v >= 1 ? "Suppresses growth, demands yield premium" : "Standard",
  },
  {
    key: "depositPricing",
    title: "Deposit Pricing",
    subtitle: "Where you sit vs. local peer rate sheet",
    min: -2, max: 2, step: 1,
    marks: [
      { v: -2, l: "−40 bps", hint: "Cheap" },
      { v: -1, l: "−20 bps" },
      { v:  0, l: "Match" },
      { v:  1, l: "+20 bps" },
      { v:  2, l: "+40 bps", hint: "Pricing leader" },
    ],
    color: LP.expansion,
    risk: (v) => v <= -1 ? "Pays less but bleeds deposits" : v >= 1 ? "Buys deposits at higher cost" : "Market",
  },
  {
    key: "securitiesDuration",
    title: "Securities Portfolio Duration",
    subtitle: "How far out the curve to invest excess cash",
    min: 0, max: 3, step: 1,
    marks: [
      { v: 0, l: "1y",  hint: "Cash-like" },
      { v: 1, l: "3y",  hint: "Default" },
      { v: 2, l: "5y" },
      { v: 3, l: "7y+", hint: "Yield reach" },
    ],
    color: LP.recovery,
    risk: (v) => v >= 2 ? "Captures yield but AOCI volatile to rate moves" : v === 0 ? "Flat AOCI; lower yield" : "Moderate",
  },
  {
    key: "liquidityTarget",
    title: "Liquidity Target",
    subtitle: "On-balance-sheet cash buffer",
    min: 0, max: 3, step: 1,
    marks: [
      { v: 0, l: "Lean" },
      { v: 1, l: "Standard" },
      { v: 2, l: "Cushioned" },
      { v: 3, l: "Fortress" },
    ],
    color: LP.warn,
    risk: (v) => v >= 2 ? "Drag on NIM; insulation in stress" : v === 0 ? "Higher NIM; vulnerable to runs" : "Balanced",
  },
];

function LeverCard({ lever, value, onChange, locked }) {
  const mark = lever.marks.find(m => m.v === value) || lever.marks[Math.round(lever.marks.length / 2)];
  return (
    <div className="panel panel-pad" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em" }}>{lever.title}</div>
          <div className="serif" style={{ fontSize: 13, color: LP.textMute, marginTop: 2 }}>{lever.subtitle}</div>
        </div>
        <div style={{
          padding: "4px 10px", borderRadius: 999,
          background: lever.color + "22",
          color: lever.color,
          fontSize: 12, fontWeight: 600,
          whiteSpace: "nowrap",
        }}>
          {mark.l}{mark.hint ? ` · ${mark.hint}` : ""}
        </div>
      </div>

      <div style={{ position: "relative", padding: "0 4px" }}>
        <input type="range"
          className="lev-slider"
          min={lever.min} max={lever.max} step={lever.step}
          value={value}
          disabled={locked}
          onChange={e => onChange(parseInt(e.target.value, 10))}
          style={{ accentColor: lever.color }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, padding: "0 2px" }}>
          {lever.marks.map(m => (
            <button key={m.v} disabled={locked} onClick={() => onChange(m.v)} style={{
              border: "none", background: "transparent", padding: 0,
              fontSize: 10, color: m.v === value ? lever.color : LP.textMute,
              fontWeight: m.v === value ? 600 : 400,
              flex: 1, textAlign: "center",
              fontFamily: "inherit",
            }}>{m.l}</button>
          ))}
        </div>
      </div>

      <div style={{ fontSize: 11.5, color: LP.textDim, padding: "6px 10px", background: LP.bgRaised, borderRadius: 6, borderLeft: `2px solid ${lever.color}` }}>
        {lever.risk(value)}
      </div>
    </div>
  );
}

function ForecastStrip({ ratios, forecast }) {
  const fr = forecast.ratios;
  const fis = forecast.is;
  const items = [
    { l: "Next NIM",         v: (fr.nim * 100).toFixed(2) + "%",        d: fr.nim - ratios.nim,         f: "pct" },
    { l: "Next Net Income",  v: LBE.fmt$(fis.netIncome),                d: fis.netIncome,                f: "money", noDelta: true },
    { l: "Next CET1",        v: (fr.cet1 * 100).toFixed(2) + "%",       d: fr.cet1 - ratios.cet1,        f: "pct" },
    { l: "Next NPL",         v: (fr.nplRatio * 100).toFixed(2) + "%",   d: fr.nplRatio - ratios.nplRatio, f: "pct", invert: true },
    { l: "Next Loans",       v: LBE.fmt$(forecast.bs.loansGross),       d: forecast.bs.loansGross,       f: "money", noDelta: true },
    { l: "Next Provision",   v: LBE.fmt$(fis.provision),                d: fis.provision,                f: "money", noDelta: true },
  ];
  return (
    <div className="panel" style={{
      padding: "14px 18px",
      background: `linear-gradient(180deg, ${LP.panel} 0%, ${LP.bgRaised} 100%)`,
      borderColor: LP.amber + "55",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
        <div className="label-strong" style={{ color: LP.amber }}>Live Forecast — Next Quarter</div>
        <div className="serif" style={{ fontSize: 13, color: LP.textMute }}>Projections update as you adjust levers above</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 14 }}>
        {items.map(it => (
          <div key={it.l}>
            <div className="label" style={{ fontSize: 9.5 }}>{it.l}</div>
            <div className="num" style={{ fontSize: 18, fontWeight: 600, marginTop: 2 }}>{it.v}</div>
            {!it.noDelta && (() => {
              const tone = Math.abs(it.d) < 1e-9 ? LP.textMute :
                (it.invert ? it.d < 0 : it.d > 0) ? LP.good : LP.bad;
              const str = it.f === "pct" ? `${it.d >= 0 ? "+" : ""}${(it.d * 100).toFixed(2)}%` : LBE.fmt$(it.d);
              return <div className="num" style={{ fontSize: 10.5, color: tone, marginTop: 2, fontWeight: 600 }}>
                {Math.abs(it.d) < 1e-9 ? "no change" : (it.d > 0 ? "▲ " : "▼ ") + str}
              </div>;
            })()}
          </div>
        ))}
      </div>
    </div>
  );
}

function LeversTab({ state, ratios, forecast, setLever, locked }) {
  return (
    <div className="tab-enter" style={{ display: "flex", flexDirection: "column", gap: 14, padding: 22, height: "100%", overflowY: "auto" }} data-coach="levers-root">
      <ForecastStrip ratios={ratios} forecast={forecast} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {LEVERS.map(L => (
          <LeverCard key={L.key} lever={L} value={state.levers[L.key]} onChange={(v) => setLever(L.key, v)} locked={locked} />
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { LeversTab, ForecastStrip, LEVERS });

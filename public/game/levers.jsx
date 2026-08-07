// Operations tab — Production levers (left) + Funding & Balance Sheet levers (right).
const { palette: LP, ratioColor: lcolor } = window.Theme;
const LBE = window.BankEngine;

const LEVERS_PRODUCTION = [
  {
    key: "loanGrowth",
    title: "Loan Origination Pace",
    subtitle: "How aggressively to chase new loan demand",
    min: -2, max: 2, step: 1,
    marks: [
      { v: -2, l: "Shrink", pill: "Shrink Book" },
      { v: -1, l: "Slow",   pill: "Slow Growth" },
      { v:  0, l: "Match",  pill: "Match Demand" },
      { v:  1, l: "Push",   pill: "Push Growth" },
      { v:  2, l: "Floor It" },
    ],
    color: LP.amber,
    risk: (v) => v >= 1 ? "Builds latent credit risk; new yields modestly lower; raises advertising & lender-incentive expense" : v <= -1 ? "Forfeits NII; protects capital" : "Balanced",
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
    risk: (v) => v <= -1 ? "Lower yields, higher latent NPL formation; vintages surface 4-8 qtrs out" : v >= 1 ? "Suppresses growth, demands yield premium; future vintage credit improves" : "Standard vintage profile",
  },
  {
    key: "sbaSalePct",
    title: "SBA Gain-on-Sale",
    subtitle: "Share of new loan production sold to secondary market",
    min: 0, max: 3, step: 1,
    marks: [
      { v: 0, l: "Off" },
      { v: 1, l: "10%" },
      { v: 2, l: "20%" },
      { v: 3, l: "30%" },
    ],
    color: LP.good,
    risk: (v) => v === 0 ? "No fee income from secondary sales" : `Sells ~${v * 7.5}% of organic production at 8% premium → fee income; reduces retained loan growth`,
  },
  {
    key: "mortgageProgram",
    title: "Mortgage Banking Program",
    subtitle: "Originate-to-sell residential mortgage operation",
    min: 0, max: 3, step: 1,
    marks: [
      { v: 0, l: "Off" },
      { v: 1, l: "Light" },
      { v: 2, l: "Standard" },
      { v: 3, l: "Full" },
    ],
    color: LP.recovery,
    risk: (v) => v === 0 ? "No mortgage banking exposure" : `Fixed cost $${v * 60}K/qtr; gain swings with rate cycle (refi waves)`,
  },
  {
    key: "indirectShare",
    title: "Indirect Loan Channel",
    subtitle: "Auto / RV / dealer-sourced paper",
    min: 0, max: 2, step: 1,
    marks: [
      { v: 0, l: "Off" },
      { v: 1, l: "Modest" },
      { v: 2, l: "Aggressive" },
    ],
    color: LP.warn,
    risk: (v) => v === 0 ? "All originations relationship-driven" : `Adds ~${v * 1.5}% loan growth at -30bp yield; warn at 15% concentration, restriction at 25%`,
  },
];

const LEVERS_FUNDING = [
  {
    key: "depositPricing",
    title: "Deposit Pricing",
    subtitle: "Where you sit vs local peer rate sheet",
    min: -2, max: 2, step: 1,
    marks: [
      { v: -2, l: "−40 bps", hint: "Cheap" },
      { v: -1, l: "−20 bps" },
      { v:  0, l: "Match", pill: "Match Demand" },
      { v:  1, l: "+20 bps" },
      { v:  2, l: "+40 bps", hint: "Pricing leader" },
    ],
    color: LP.expansion,
    risk: (v) => v <= -1 ? "Pays less but bleeds deposits" : v >= 1 ? "Buys deposits at higher cost" : "Market",
  },
];

const LEVERS_BALANCE_SHEET = [
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
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em" }}>{lever.title}</div>
          <div style={{
            padding: "3px 9px", borderRadius: 999,
            background: lever.color + "22",
            color: lever.color,
            fontSize: 11.5, fontWeight: 600,
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}>
            {mark.pill || mark.l}
          </div>
        </div>
        <div style={{ fontSize: 13, color: LP.textMute, marginTop: 2 }}>{lever.subtitle}</div>
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

// Continuous numeric dial used for $ amounts (deposit ad spend, brokered CD balance).
function NumericLeverCard({ title, subtitle, value, onChange, min, max, step, color, format, hint, locked, pill }) {
  const fmt = (v) => format === "money"
    ? (v >= 1000 ? `$${(v / 1000).toFixed(2)}M` : `$${v.toFixed(0)}K`)
    : format === "dollar" ? `$${v.toFixed(0)}`
    : v.toFixed(0);
  return (
    <div className="panel panel-pad" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.01em" }}>{title}</div>
          <div style={{
            padding: "3px 9px", borderRadius: 999,
            background: color + "22",
            color: color,
            fontSize: 11.5, fontWeight: 600,
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}>
            {pill || fmt(value)}
          </div>
        </div>
        <div style={{ fontSize: 13, color: LP.textMute, marginTop: 2 }}>{subtitle}</div>
      </div>
      <div style={{ position: "relative", padding: "0 4px" }}>
        <input type="range" className="lev-slider"
          min={min} max={max} step={step} value={value}
          disabled={locked}
          onChange={e => onChange(parseFloat(e.target.value))}
          style={{ accentColor: color }} />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, padding: "0 2px", fontSize: 10, color: LP.textMute }} className="num">
          <span>{fmt(min)}</span>
          <span>{fmt(max)}</span>
        </div>
      </div>
      <div style={{ fontSize: 11.5, color: LP.textDim, padding: "6px 10px", background: LP.bgRaised, borderRadius: 6, borderLeft: `2px solid ${color}` }}>
        {hint}
      </div>
    </div>
  );
}

function ForecastStrip({ state, ratios, forecast }) {
  const vp = window.Theme.useViewport();
  const compact = vp.compact;
  const fr = forecast.ratios;
  const fis = forecast.is;
  const curSat = state?.satisfaction ?? 65;
  const nextSat = forecast.snapshot?.satisfaction ?? curSat;
  const nextEPS = fis.netIncome / Math.max(1e-6, forecast.bs.sharesOutstanding);
  const curDeposits = LBE.totalDeposits(state.bs.deposits);
  const nextDeposits = LBE.totalDeposits(forecast.bs.deposits);
  const items = [
    { l: "NIM",         v: (fr.nim * 100).toFixed(2) + "%",        d: fr.nim - ratios.nim,         f: "pct" },
    { l: "Net Income",  v: LBE.fmt$(fis.netIncome),                d: fis.netIncome,                f: "money", noDelta: true, sub: `EPS $${nextEPS.toFixed(2)}` },
    { l: "CET1",        v: (fr.cet1 * 100).toFixed(2) + "%",       d: fr.cet1 - ratios.cet1,        f: "pct" },
    { l: "NPL",         v: (fr.nplRatio * 100).toFixed(2) + "%",   d: fr.nplRatio - ratios.nplRatio, f: "pct", invert: true },
    { l: "Sat.",         v: Math.round(nextSat).toString(),         d: nextSat - curSat,             f: "sat" },
    { l: "Deposits",    v: LBE.fmt$(nextDeposits, 1),              d: nextDeposits - curDeposits,   f: "money1" },
    { l: "Loans",       v: LBE.fmt$(forecast.bs.loansGross, 1),    d: forecast.bs.loansGross - state.bs.loansGross, f: "money1" },
    { l: "Provision",   v: LBE.fmt$(fis.provision),                d: fis.provision,                f: "money", noDelta: true },
  ];
  // Compact: a fixed 4-column / 2-row grid filled column-pair by column-pair:
  // Loans/Deposits · Provision/Sat · NPL/NIM · Net Income/CET1.
  const compactOrder = ["Loans", "Provision", "NPL", "Net Income", "Deposits", "Sat.", "NIM", "CET1"];
  const byLabel = Object.fromEntries(items.map(it => [it.l, it]));
  const renderItems = compact ? compactOrder.map(l => byLabel[l]).filter(Boolean) : items;
  const fcCols = compact ? 4 : 8;
  const valFont = compact ? 15 : 18;
  const labelFont = compact ? 10.5 : 9.5;
  const subFont = compact ? 11.5 : 10.5;
  return (
    <div className="panel" data-coach="live-forecast" style={{
      padding: compact ? "12px 14px" : "14px 18px",
      background: `linear-gradient(180deg, ${LP.panel} 0%, ${LP.bgRaised} 100%)`,
      borderColor: LP.amber + "55",
    }}>
      {compact ? (
        <div style={{ marginBottom: 9 }}>
          <div className="label-strong" style={{ color: LP.amber, fontSize: 16, letterSpacing: "0.03em" }}>Live Forecast — Next Quarter</div>
          <div style={{ fontSize: 12.5, color: LP.textMute, marginTop: 1 }}>Projections update as you adjust levers</div>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10, gap: 8, flexWrap: "wrap" }}>
          <div className="label-strong" style={{ color: LP.amber }}>Live Forecast — Next Quarter</div>
          <div style={{ fontSize: 13, color: LP.textMute }}>Projections update as you adjust levers</div>
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${fcCols}, 1fr)`, columnGap: compact ? 8 : 14, rowGap: compact ? 12 : 14 }}>
        {renderItems.map(it => (
          <div key={it.l} style={{ minWidth: 0 }}>
            <div className="label" style={{ fontSize: labelFont }}>{it.l}</div>
            <div className="num" style={{ fontSize: valFont, fontWeight: 600, marginTop: 2 }}>{it.v}</div>
            {it.sub && (
              <div className="num" style={{ fontSize: subFont, color: LP.textMute, marginTop: 2, fontWeight: 600 }}>{it.sub}</div>
            )}
            {!it.noDelta && (() => {
              const tone = Math.abs(it.d) < 1e-9 ? LP.textMute :
                (it.invert ? it.d < 0 : it.d > 0) ? LP.good : LP.bad;
              const str = it.f === "pct" ? `${it.d >= 0 ? "+" : ""}${(it.d * 100).toFixed(2)}%`
                        : it.f === "sat" ? `${it.d >= 0 ? "+" : ""}${it.d.toFixed(1)}`
                        : it.f === "money1" ? LBE.fmt$(it.d, 1)
                        : LBE.fmt$(it.d);
              return <div className="num" style={{ fontSize: subFont, color: tone, marginTop: 2, fontWeight: 600 }}>
                {Math.abs(it.d) < 1e-9 ? "no change" : (it.d > 0 ? "▲ " : "▼ ") + str}
              </div>;
            })()}
          </div>
        ))}
      </div>
    </div>
  );
}

function PanelHeader({ title, subtitle, color }) {
  const compact = window.Theme.useViewport().compact;
  return (
    <div style={{ marginBottom: 4 }}>
      <div style={{
        fontSize: compact ? 13.5 : 11, fontWeight: 700, letterSpacing: compact ? "0.10em" : "0.14em", textTransform: "uppercase",
        color: color, paddingBottom: 4, borderBottom: `1.5px solid ${color}55`,
      }}>
        {title}
      </div>
      {subtitle && <div style={{ fontSize: compact ? 13 : 11.5, color: LP.textMute, marginTop: 6, fontStyle: "italic" }}>{subtitle}</div>}
    </div>
  );
}

// Customer-satisfaction impact readout. Three condensed lines that sum: the points
// satisfaction actually moves THIS quarter from pricing + marketing, from fee income, and
// combined. Read live off the current lever positions (via the engine's satisfactionImpact
// helper) so it tracks the sliders in real time and reflects the per-quarter push rather
// than the eventual converged target.
function SatImpactSummary({ state, compact }) {
  const imp = LBE.satisfactionImpact(state);
  const tone = (v) => (v > 0.02 ? LP.good : v < -0.02 ? LP.bad : LP.textMute);
  const sign = (v) => (v >= 0 ? "+" : "") + v.toFixed(1) + " pts";
  const Row = ({ label, v, strong }) => (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "baseline",
      paddingTop: 1, paddingBottom: 1,
    }}>
      <span style={{ fontSize: compact ? 12 : 11.5, color: strong ? LP.text : LP.textMute, fontWeight: strong ? 700 : 400 }}>{label}</span>
      <span className="num" style={{ fontSize: compact ? 13 : 12.5, fontWeight: 700, color: tone(v) }}>{sign(v)}</span>
    </div>
  );
  return (
    <div className="panel" data-coach="sat-impact" style={{ padding: compact ? "9px 12px" : "9px 12px", display: "flex", flexDirection: "column" }}>
      <div className="label-strong" style={{ marginBottom: 3, fontSize: compact ? 12 : 11 }}>
        Customer Satisfaction Impact <span style={{ fontWeight: 400, color: LP.textMute }}>· Live</span>
      </div>
      <div style={{ fontSize: 11, color: LP.textDim, lineHeight: 1.4, marginBottom: 6 }}>
        How this quarter's pricing, marketing, and fees move the satisfaction score.
      </div>
      <Row label="Pricing &amp; marketing" v={imp.pm} />
      <Row label="Fee income" v={imp.fee} />
      <Row label="Total Sat. impact" v={imp.total} strong />
    </div>
  );
}

// Live latent-credit-risk gauge. Surfaces the engine's creditRiskBank — the pool of
// embedded expected losses that aggressive origination / loose underwriting builds up and
// that later surfaces as NPLs (fastest in recession). Persistent read-out so the player can
// watch it climb toward the Elevated ($2M) / Critical ($5M) log thresholds and draw back
// down after de-risking, not just catch the one-time log line.
function LatentRiskGauge({ state, compact }) {
  // Total embedded latent risk folds the creditRiskBank stock together with the not-yet-
  // surfaced loan-vintage pipeline; the gauge, its status band, and the Elevated/Critical
  // log thresholds all read off this same combined number.
  const riskBank = state.creditRiskBank || 0;
  const vintagePipeline = LBE.pendingVintageRisk(state);
  const crb = riskBank + vintagePipeline;
  const level = crb >= 5000 ? { c: LP.bad, label: "Critical" }
    : crb >= 2000 ? { c: LP.warn, label: "Elevated" }
    : { c: LP.good, label: "Contained" };
  const max = 6000;
  const pct = Math.max(0, Math.min(100, (crb / max) * 100));
  const elevPct = (2000 / max) * 100;
  const critPct = (5000 / max) * 100;

  // Live flow from the current lever selections: what this quarter will add to the bank
  // (aggressive loan pace + loose underwriting) net of what the cycle releases. Lets pulling
  // the underwriting / pace sliders register on the gauge immediately, before you run.
  const flow = LBE.latentRiskFlow(state);
  let flowNode;
  if (flow.accrual > 0.5) {
    const tone = flow.net > 0 ? LP.warn : LP.good;
    flowNode = (
      <span style={{ color: tone, fontWeight: 600 }}>
        +{LBE.fmt$(flow.accrual)} building{flow.release > 0.5 ? ` − ${LBE.fmt$(flow.release)} releasing` : ""} = {flow.net >= 0 ? "+" : "−"}{LBE.fmt$(Math.abs(flow.net))}/qtr
      </span>
    );
  } else if (flow.release > 0.5) {
    flowNode = <span style={{ color: LP.good, fontWeight: 600 }}>−{LBE.fmt$(flow.release)}/qtr releasing (no new risk accruing)</span>;
  } else {
    flowNode = <span style={{ color: LP.textMute }}>No new risk accruing at current selections</span>;
  }

  return (
    <div className="panel panel-pad" data-coach="latent-risk" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
        <div className="label-strong" style={{ fontSize: compact ? 12 : 11 }}>Latent Credit Risk</div>
        <div className="num" style={{ fontSize: compact ? 14 : 13, fontWeight: 700, color: level.c }}>
          {LBE.fmt$(crb)} · {level.label}
        </div>
      </div>
      <div style={{ position: "relative", height: 10, borderRadius: 6, overflow: "hidden", background: LP.panel2, border: `1px solid ${LP.line}` }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${pct}%`, background: level.c, transition: "width 0.25s" }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, left: `${elevPct}%`, width: 1.5, background: LP.warn, opacity: 0.8 }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, left: `${critPct}%`, width: 1.5, background: LP.bad, opacity: 0.8 }} />
      </div>
      {vintagePipeline > 1 && (
        <div className="num" style={{ fontSize: compact ? 11.5 : 11, color: LP.textMute }}>
          Risk bank {LBE.fmt$(riskBank)} · vintage pipeline {LBE.fmt$(vintagePipeline)}
        </div>
      )}
      <div className="num" style={{ fontSize: compact ? 12 : 11.5 }}>{flowNode}</div>
      <div style={{ fontSize: 11, color: LP.textDim, lineHeight: 1.4 }}>
        Aggressive loan pace and loose underwriting embed expected losses — a fast-releasing risk bank plus a 4-8 quarter loan-vintage pipeline — that surface as NPLs over time, fastest in recession. Elevated $2M · Critical $5M.
      </div>
    </div>
  );
}

function LeversTab({ state, ratios, forecast, setLever, setDecision, locked }) {
  const vp = window.Theme.useViewport();
  const compact = vp.compact;
  const lev = state.levers;
  const indirectShare = state.bs.loansGross > 0 ? (state.bs.loansIndirect || 0) / state.bs.loansGross : 0;
  const indirectPct = (indirectShare * 100).toFixed(1);
  const indTone = indirectShare > 0.25 ? LP.bad : indirectShare > 0.15 ? LP.warn : LP.text;

  return (
    <div className="tab-enter scroll-thin" style={{ display: "flex", flexDirection: "column", gap: compact ? 10 : 12, padding: compact ? 10 : 14, height: "100%", overflowY: "auto" }} data-coach="levers-root">
      <ForecastStrip state={state} ratios={ratios} forecast={forecast} />

      <div data-coach="lever-grid" style={{ display: "grid", gridTemplateColumns: vp.isPhone ? "1fr" : "1fr 1fr", gap: compact ? 10 : 14, alignItems: "start" }}>
        {/* Production column */}
        <div data-coach="lever-production" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <PanelHeader title="Production" subtitle="Loan origination, sales, and channels" color={LP.amber} />
          <LatentRiskGauge state={state} compact={compact} />
          {LEVERS_PRODUCTION.map(L => (
            <LeverCard key={L.key} lever={L} value={lev[L.key] ?? 0} onChange={(v) => setLever(L.key, v)} locked={locked} />
          ))}
          <div style={{ padding: "8px 12px", background: LP.bgRaised, borderRadius: 8, fontSize: 11.5, color: LP.textDim, display: "flex", justifyContent: "space-between" }}>
            <span>Indirect concentration</span>
            <span className="num" style={{ color: indTone, fontWeight: 600 }}>{indirectPct}% of loans</span>
          </div>
        </div>

        {/* Consumer deposit ops column */}
        <div data-coach="lever-deposit-ops" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <PanelHeader title="Consumer Deposit Ops" subtitle="Pricing, acquisition, and fee revenue" color={LP.expansion} />
          <SatImpactSummary state={state} compact={compact} />
          {LEVERS_FUNDING.map(L => (
            <LeverCard key={L.key} lever={L} value={lev[L.key] ?? 0} onChange={(v) => setLever(L.key, v)} locked={locked} />
          ))}
          <NumericLeverCard
            title="Deposit Marketing Spend"
            subtitle="Quarterly ad spend; log-curve boost to organic deposit growth"
            value={lev.depositAdSpend || 0}
            onChange={(v) => setLever("depositAdSpend", v)}
            min={0} max={500} step={25} format="money"
            color={LP.info}
            pill={lev.depositAdSpend > 0 ? `$${lev.depositAdSpend}K/qtr` : "Off"}
            hint={lev.depositAdSpend > 0
              ? (() => {
                  const lift = LBE.computeAdLift(state);
                  const satNote = lift.saturation < 0.9 ? ` · local market ${(lift.saturation * 100).toFixed(0)}% saturated` : "";
                  return `Acquires ~${LBE.fmt$(lift.dollars)} of deposits this qtr (~${(lift.pct * 100).toFixed(2)}% of book)${satNote}; flows to nonint. expense`;
                })()
              : "No marketing spend; growth is purely organic + pricing-driven"}
            locked={locked}
          />
          {(() => {
            const fees = LBE.computeFeeIncome(state);
            const ofFee = lev.overdraftFee ?? 25;
            const mntFee = lev.monthlyMaintenance ?? 10;
            const totalFee = (fees.overdraftIncome || 0) + (fees.maintenanceIncome || 0);
            return (
              <div className="panel" style={{ padding: 14, display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
                  color: LP.bad, paddingBottom: 4, borderBottom: `1.5px solid ${LP.bad}55`,
                }}>
                  Fee Income
                </div>
                <div style={{ fontSize: 11.5, color: LP.textMute, fontStyle: "italic", marginTop: -4 }}>
                  Fee revenue trades dollars for satisfaction.
                </div>
                <NumericLeverCard
                  title="Overdraft Fee (per item)"
                  subtitle="Consumer-watched; regulator-watched above $30"
                  value={ofFee}
                  onChange={(v) => setLever("overdraftFee", v)}
                  min={0} max={45} step={1} format="dollar"
                  color={LP.bad}
                  pill={`$${ofFee.toFixed(0)}`}
                  hint={`Est. ${LBE.fmt$(fees.overdraftIncome)}/qtr at ~${fees.overdraftIncidentsK.toFixed(1)}K incidents${ofFee > 30 ? ` · CFPB risk above $30 sustained ${state.overdraftHistory ? state.overdraftHistory.filter(f => f > 30).length : 0}/4 qtrs` : ""}`}
                  locked={locked}
                />
                <NumericLeverCard
                  title="Monthly Maintenance Fee"
                  subtitle="On accounts that don't meet waiver minimums"
                  value={mntFee}
                  onChange={(v) => setLever("monthlyMaintenance", v)}
                  min={0} max={25} step={1} format="dollar"
                  color={LP.info}
                  pill={`$${mntFee.toFixed(0)}/mo`}
                  hint={`Est. ${LBE.fmt$(fees.maintenanceIncome)}/qtr · ~${fees.accountsK.toFixed(1)}K total accounts`}
                  locked={locked}
                />
                <div style={{ padding: "8px 12px", background: LP.bgRaised, borderRadius: 8, fontSize: 11.5, color: LP.textDim, display: "flex", justifyContent: "space-between" }}>
                  <span>Total fee income</span>
                  <span className="num" style={{ fontWeight: 600 }}>{LBE.fmt$(totalFee)}</span>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { LeversTab, ForecastStrip, LeverCard, NumericLeverCard, LEVERS_PRODUCTION, LEVERS_FUNDING, LEVERS_BALANCE_SHEET });

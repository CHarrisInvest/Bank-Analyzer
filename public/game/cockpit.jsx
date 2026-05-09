// Overview tab — Plan vs. Actual prominent + tight forecast preview
const { palette: CP, ratioColor: ccolor, quarterLabel: cqlbl } = window.Theme;
const CBE = window.BankEngine;

// ---------- Tile ----------
function KPITile({ label, value, sub, tone }) {
  return (
    <div style={{
      padding: "10px 12px",
      background: CP.panel,
      border: `1px solid ${CP.line}`,
      borderRadius: 10,
      display: "flex", flexDirection: "column", gap: 3,
      minWidth: 0,
    }}>
      <div className="label" style={{ fontSize: 9.5 }}>{label}</div>
      <div className="num" style={{ fontSize: 17, fontWeight: 600, color: tone || CP.text, lineHeight: 1.05 }}>
        {value}
      </div>
      {sub && <div style={{ fontSize: 10.5, color: CP.textMute }} className="num">{sub}</div>}
    </div>
  );
}

// ---------- Unified Plan/Actual/Forecast row ----------
function fmtVal(v, fmt) {
  if (v === null || v === undefined || isNaN(v)) return "—";
  if (fmt === "money") return CBE.fmt$(v);
  if (fmt === "pct")   return `${(v * 100).toFixed(2)}%`;
  if (fmt === "pct1")  return `${(v * 100).toFixed(1)}%`;
  if (fmt === "ratio") return `${v.toFixed(2)}x`;
  return v.toFixed(2);
}

function diffStr(diff, fmt) {
  if (fmt === "money") return `${diff >= 0 ? "+" : ""}${CBE.fmt$(diff)}`;
  if (fmt === "ratio") return `${diff >= 0 ? "+" : ""}${diff.toFixed(2)}x`;
  return `${diff >= 0 ? "+" : ""}${(diff * 100).toFixed(2)}%`;
}

function MetricRow({ label, plan, actual, forecast, fmt = "money", invert = false, ratioName }) {
  const hasPlan = plan !== undefined && plan !== null && !isNaN(plan);
  const planActDiff = hasPlan ? actual - plan : 0;
  const surprise = invert ? -planActDiff : planActDiff;
  const sigThreshold = fmt === "money" ? Math.max(0.5, Math.abs(plan || 0) * 0.005) : 0.0001;
  const onPlan = hasPlan && Math.abs(planActDiff) < sigThreshold;
  const surpriseTone = !hasPlan ? CP.textMute : onPlan ? CP.textMute : surprise > 0 ? CP.good : CP.bad;
  const surpriseLabel = !hasPlan ? "—" : onPlan ? "on plan" : `${surprise > 0 ? "▲" : "▼"} ${diffStr(planActDiff, fmt)}`;

  const fcDiff = forecast - actual;
  const fcTone = ratioName ? ccolor(ratioName, forecast) : CP.text;
  const fcSig = fmt === "money" ? Math.max(0.5, Math.abs(actual || 0) * 0.005) : 0.0001;
  const fcDirGood = invert ? fcDiff < 0 : fcDiff > 0;
  const fcDeltaTone = Math.abs(fcDiff) < fcSig ? CP.textMute : fcDirGood ? CP.good : CP.bad;

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1.3fr 1fr 1fr 1fr 8px 1fr 1fr",
      alignItems: "center",
      gap: 10,
      padding: "8px 14px",
      borderTop: `1px solid ${CP.lineSoft}`,
    }}>
      <div style={{ fontSize: 12, color: CP.textDim, fontWeight: 500 }}>{label}</div>
      <div className="num" style={{ fontSize: 13, fontWeight: 600, color: CP.textMute }}>{hasPlan ? fmtVal(plan, fmt) : "—"}</div>
      <div className="num" style={{ fontSize: 13, fontWeight: 600, color: CP.text }}>{fmtVal(actual, fmt)}</div>
      <div className="num" style={{ fontSize: 11.5, fontWeight: 600, color: surpriseTone }}>{surpriseLabel}</div>
      <div style={{ height: 18, width: 1, background: CP.line, justifySelf: "center" }} />
      <div className="num" style={{ fontSize: 13, fontWeight: 600, color: fcTone }}>{fmtVal(forecast, fmt)}</div>
      <div className="num" style={{ fontSize: 11.5, fontWeight: 600, color: fcDeltaTone }}>{diffStr(fcDiff, fmt)}</div>
    </div>
  );
}

// ---------- Driver bar ----------
function DriverBar({ label, value, max, color, fmt }) {
  const pct = max > 0 ? Math.abs(value) / max : 0;
  const positive = value >= 0;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "6px 0" }}>
      <div style={{ width: 130, fontSize: 11.5, color: CP.textDim }}>{label}</div>
      <div style={{ flex: 1, height: 18, background: CP.lineSoft, borderRadius: 4, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: CP.line }} />
        <div style={{
          position: "absolute",
          [positive ? "left" : "right"]: "50%",
          top: 2, bottom: 2,
          width: `${pct * 50}%`,
          background: color,
          borderRadius: 3,
          transition: "width 0.3s",
        }} />
      </div>
      <div className="num" style={{ width: 80, textAlign: "right", fontSize: 11.5, color: positive ? CP.good : CP.bad, fontWeight: 600 }}>
        {fmt(value)}
      </div>
    </div>
  );
}

// ---------- Balance sheet bars ----------
function BalanceBars({ bs }) {
  const ta = CBE.totalAssets(bs);
  const eq = CBE.totalEquity(bs);
  const tl = CBE.totalLiabilities(bs);

  const assetSegs = [
    { l: "Cash",        v: bs.cash,                       c: CP.info },
    { l: "Securities",  v: bs.securitiesAFS + bs.securitiesHTM, c: CP.recovery },
    { l: "Loans (net)", v: bs.loansGross - bs.acl,         c: CP.amber },
    { l: "Other",       v: bs.premises + bs.otherAssets,  c: CP.textMute },
  ];
  const fundSegs = [
    { l: "Non-int dep.", v: bs.deposits.noninterest, c: CP.good },
    { l: "Int. deposits",v: bs.deposits.interestChecking + bs.deposits.savingsMM + bs.deposits.timeDeposits, c: CP.expansion },
    { l: "FHLB",         v: bs.borrowingsFHLB, c: CP.warn },
    { l: "Sub Debt",     v: bs.subDebt, c: CP.bad },
    { l: "Other liab.",  v: bs.otherLiab, c: CP.textMute },
    { l: "Equity",       v: eq, c: CP.amber },
  ];

  const renderBar = (segs, total) => (
    <div style={{ display: "flex", height: 26, borderRadius: 6, overflow: "hidden", border: `1px solid ${CP.line}` }}>
      {segs.filter(s => s.v > 0).map((s, i) => {
        const pct = (s.v / total) * 100;
        return (
          <div key={i} title={`${s.l}: ${CBE.fmt$(s.v)} (${pct.toFixed(1)}%)`} style={{
            width: `${pct}%`, background: s.c,
            borderRight: i < segs.length - 1 ? `1px solid ${CP.bg}` : "none",
          }} />
        );
      })}
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
          <div className="label">Assets</div>
          <div className="num" style={{ fontSize: 12, color: CP.text, fontWeight: 600 }}>{CBE.fmt$(ta)}</div>
        </div>
        {renderBar(assetSegs, ta)}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 5 }}>
          {assetSegs.filter(s => s.v > 0).map(s => (
            <div key={s.l} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: CP.textDim }}>
              <div style={{ width: 7, height: 7, background: s.c, borderRadius: 2 }} />
              {s.l} <span className="num" style={{ color: CP.textMute }}>{CBE.fmt$(s.v)}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
          <div className="label">Liabilities + Equity</div>
          <div className="num" style={{ fontSize: 12, color: CP.text, fontWeight: 600 }}>{CBE.fmt$(tl + eq)}</div>
        </div>
        {renderBar(fundSegs, tl + eq)}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 5 }}>
          {fundSegs.filter(s => s.v > 0).map(s => (
            <div key={s.l} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: CP.textDim }}>
              <div style={{ width: 7, height: 7, background: s.c, borderRadius: 2 }} />
              {s.l} <span className="num" style={{ color: CP.textMute }}>{CBE.fmt$(s.v)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------- Overview ----------
function CockpitTab({ state, ratios, forecast }) {
  const fr = forecast.ratios;
  const fis = forecast.is;
  const fbs = forecast.bs;
  const lf = state.lastForecast;
  const isQ1 = state.quarter === 1;
  const cur = cqlbl(Math.max(1, state.quarter - 1));
  const next = cqlbl(state.quarter);

  const lastIS = state.lastIS;

  const totalDeposits = (bs) => bs.deposits.noninterest + bs.deposits.interestChecking + bs.deposits.savingsMM + bs.deposits.timeDeposits;
  const wholesaleFund = (bs) => (bs.borrowingsFHLB || 0) + (bs.brokeredCDs || 0) + (bs.subDebt || 0);

  const rows = [
    { l: "Net Income",       plan: lf?.netIncome,  actual: lastIS.netIncome,         forecast: fis.netIncome,                        fmt: "money" },
    { l: "NIM",              plan: lf?.nim,        actual: ratios.nim,               forecast: fr.nim,         ratioName: "nim",     fmt: "pct" },
    { l: "Provision",        plan: lf?.provision,  actual: lastIS.provision,         forecast: fis.provision,                        fmt: "money", invert: true },
    { l: "CET1 Ratio",       plan: lf?.cet1,       actual: ratios.cet1,              forecast: fr.cet1,        ratioName: "cet1",    fmt: "pct1" },
    { l: "Loans (gross)",    plan: lf?.loansGross, actual: state.bs.loansGross,      forecast: fbs.loansGross,                       fmt: "money" },
    { l: "Deposits",         plan: lf?.deposits,   actual: totalDeposits(state.bs),  forecast: totalDeposits(fbs),                   fmt: "money" },
    { l: "Wholesale Funding",plan: lf?.wholesale,  actual: wholesaleFund(state.bs),  forecast: wholesaleFund(fbs),                   fmt: "money", invert: true },
  ];

  return (
    <div className="tab-enter scroll-thin" style={{ display: "flex", flexDirection: "column", gap: 12, padding: 18, height: "100%", overflowY: "auto" }} data-coach="cockpit-root">

      {/* Unified Plan / Actual / Forecast table */}
      <div className="panel" style={{ padding: 0, overflow: "hidden", flexShrink: 0 }} data-coach="forecast-pair">
        {/* Header band */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.3fr 1fr 1fr 1fr 8px 1fr 1fr",
          gap: 10,
          padding: "12px 14px 10px",
          borderBottom: `1px solid ${CP.line}`,
          background: CP.bgRaised,
        }}>
          <div>
            <div className="label" style={{ color: CP.textDim, fontSize: 9.5 }}>Metric</div>
          </div>
          <div style={{ gridColumn: "2 / 5" }}>
            <div className="label" style={{ color: CP.textDim, fontSize: 9.5 }}>
              {isQ1 ? "Y1 Q1 — Just Posted (no prior plan)" : `${cur.label} — Quarter Just Posted`}
            </div>
            <div className="serif" style={{ fontSize: 11, color: CP.textMute, marginTop: 1 }}>how close were your projections?</div>
          </div>
          <div />
          <div style={{ gridColumn: "6 / 8" }}>
            <div className="label" style={{ color: CP.amber, fontSize: 9.5 }}>{next.label} — Next Quarter Forecast</div>
            <div className="serif" style={{ fontSize: 11, color: CP.textMute, marginTop: 1 }}>your plan as set today</div>
          </div>
        </div>
        {/* Sub-header column labels */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.3fr 1fr 1fr 1fr 8px 1fr 1fr",
          gap: 10,
          padding: "6px 14px",
          background: CP.bg,
        }}>
          <div />
          <div className="label" style={{ fontSize: 9, color: CP.textMute }}>Plan</div>
          <div className="label" style={{ fontSize: 9, color: CP.textMute }}>Actual</div>
          <div className="label" style={{ fontSize: 9, color: CP.textMute }}>Surprise</div>
          <div />
          <div className="label" style={{ fontSize: 9, color: CP.amber }}>Forecast</div>
          <div className="label" style={{ fontSize: 9, color: CP.textMute }}>Δ vs now</div>
        </div>
        {rows.map(r => (
          <MetricRow key={r.l} label={r.l} plan={r.plan} actual={r.actual} forecast={r.forecast} fmt={r.fmt} invert={r.invert} ratioName={r.ratioName} isQ1={isQ1} />
        ))}
      </div>

      {/* Driver chart + balance sheet */}
      <div style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: 12, flexShrink: 0 }}>
        <div className="panel" style={{ padding: "14px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
            <div className="label-strong">Earnings Walk · this q → next q</div>
            <div className="num" style={{ fontSize: 14, fontWeight: 700, color: (fis.netIncome - lastIS.netIncome) >= 0 ? CP.good : CP.bad }}>
              Net Δ {(fis.netIncome - lastIS.netIncome) >= 0 ? "+" : ""}{CBE.fmt$(fis.netIncome - lastIS.netIncome)}
            </div>
          </div>
          <div className="serif" style={{ fontSize: 12, color: CP.textMute, marginBottom: 6 }}>
            What's driving the change in net income.
          </div>
          {(() => {
            const drivers = [
              { l: "Δ Net Interest Income", v: fis.nii - lastIS.nii, c: CP.good },
              { l: "Δ Provision",            v: -(fis.provision - lastIS.provision), c: CP.bad },
              { l: "Δ Noninterest Income",   v: fis.nonintIncome - lastIS.nonintIncome, c: CP.info },
              { l: "Δ Noninterest Expense",  v: -(fis.nonintExpense - lastIS.nonintExpense), c: CP.warn },
              { l: "Δ Tax",                  v: -(fis.tax - lastIS.tax), c: CP.textMute },
            ];
            const max = Math.max(1, ...drivers.map(d => Math.abs(d.v)));
            return drivers.map(d => (
              <DriverBar key={d.l} label={d.l} value={d.v} max={max} color={d.c} fmt={CBE.fmt$} />
            ));
          })()}
        </div>

        <div className="panel" style={{ padding: "14px 16px" }}>
          <div className="label-strong" style={{ marginBottom: 8 }}>Balance Sheet — Today</div>
          <BalanceBars bs={state.bs} />
        </div>
      </div>

      {/* Capital, liquidity, asset quality */}
      <div className="panel" style={{ padding: "14px 16px", flexShrink: 0 }}>
        <div className="label-strong" style={{ marginBottom: 8 }}>Capital, Liquidity, Asset Quality</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8 }}>
          <KPITile label="CET1 Ratio"    value={(ratios.cet1 * 100).toFixed(2) + "%"}    sub="min 7.0%" tone={ccolor("cet1", ratios.cet1)} />
          <KPITile label="Tier 1 Lev."   value={(ratios.tier1Lev * 100).toFixed(2) + "%"} sub="min 5.0%" tone={ccolor("tier1Lev", ratios.tier1Lev)} />
          <KPITile label="TCE/TA"        value={(ratios.tce * 100).toFixed(2) + "%"}     sub="tangible" tone={ccolor("tce", ratios.tce)} />
          <KPITile label="Loan/Deposit"  value={ratios.ltd.toFixed(2) + "x"}              sub="target ≤1.00x" tone={ccolor("ltd", ratios.ltd)} />
          <KPITile label="On-hand Liq."  value={(ratios.onHandLiq * 100).toFixed(1) + "%"} sub="cash + AFS" tone={ccolor("onHandLiq", ratios.onHandLiq)} />
          <KPITile label="Efficiency"    value={(ratios.efficiency * 100).toFixed(1) + "%"} sub="lower=better" tone={ccolor("efficiency", ratios.efficiency)} />
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { CockpitTab, KPITile });

// Capital tab — dividends, repurchases, FHLB, sub debt, provision override.
const { palette: KP } = window.Theme;
const KBE = window.BankEngine;

function NumberDial({ label, value, onChange, min, max, step, format, hint, color = KP.amber, locked }) {
  const fmt = (v) => format === "money" ? KBE.fmt$(v) : format === "currency" ? `$${v.toFixed(2)}` : v.toFixed(0);
  return (
    <div style={{ padding: "12px 14px", background: KP.bgRaised, borderRadius: 10, border: `1px solid ${KP.lineSoft}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6 }}>
        <div className="label" style={{ fontSize: 9.5 }}>{label}</div>
        <div className="num" style={{ fontSize: 16, fontWeight: 600, color }}>{fmt(value)}</div>
      </div>
      <input type="range" className="lev-slider"
        min={min} max={max} step={step} value={value}
        disabled={locked}
        onChange={e => onChange(parseFloat(e.target.value))}
        style={{ accentColor: color }} />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, fontSize: 9.5, color: KP.textMute }} className="num">
        <span>{format === "money" ? KBE.fmt$(min) : format === "currency" ? `$${min.toFixed(2)}` : min}</span>
        <span>{format === "money" ? KBE.fmt$(max) : format === "currency" ? `$${max.toFixed(2)}` : max}</span>
      </div>
      {hint && <div style={{ fontSize: 11, color: KP.textDim, marginTop: 6 }}>{hint}</div>}
    </div>
  );
}

function CapitalTab({ state, ratios, forecast, setDecision, locked }) {
  const d = state.decisions;
  const totalDiv = d.dividendPerShare * state.bs.sharesOutstanding;
  const fr = forecast.ratios;
  const fis = forecast.is;

  const cet1Bp = (fr.cet1 - ratios.cet1) * 10000;
  const cet1Tone = cet1Bp >= 0 ? KP.good : KP.bad;

  return (
    <div className="tab-enter scroll-thin" style={{ display: "flex", flexDirection: "column", gap: 14, padding: 22, height: "100%", overflowY: "auto" }}>
      <ForecastStrip ratios={ratios} forecast={forecast} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {/* Shareholder distributions */}
        <div className="panel panel-pad">
          <div className="label-strong" style={{ marginBottom: 4 }}>Shareholder Distributions</div>
          <div className="serif" style={{ fontSize: 13, color: KP.textMute, marginBottom: 14 }}>
            Returning capital — at the cost of CET1 and book value.
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <NumberDial label="Dividend per Share (qtr)" value={d.dividendPerShare}
              onChange={v => setDecision("dividendPerShare", v)}
              min={0} max={0.50} step={0.01} format="currency"
              hint={`Total payout next quarter: ${KBE.fmt$(d.dividendPerShare * state.bs.sharesOutstanding)} · Payout ratio ${state.lastIS.netIncome > 0 ? ((d.dividendPerShare * state.bs.sharesOutstanding / state.lastIS.netIncome) * 100).toFixed(0) + "%" : "n/a"}`}
              color={KP.good} locked={locked} />
            <NumberDial label="Share Repurchase Authorization" value={d.repurchaseAmount}
              onChange={v => setDecision("repurchaseAmount", v)}
              min={0} max={5000} step={250} format="money"
              hint={d.repurchaseAmount > 0 ? `Buys roughly ${(d.repurchaseAmount / Math.max(1, KBE.estimatedSharePrice(state, ratios))).toFixed(1)}K shares at est. $${KBE.estimatedSharePrice(state, ratios).toFixed(2)}` : "No buybacks scheduled"}
              color={KP.amber} locked={locked} />
          </div>
        </div>

        {/* Wholesale funding */}
        <div className="panel panel-pad">
          <div className="label-strong" style={{ marginBottom: 4 }}>Wholesale Funding</div>
          <div className="serif" style={{ fontSize: 13, color: KP.textMute, marginBottom: 14 }}>
            FHLB advances float with rates; sub debt locks in fixed at issuance and counts as Total Capital, not wholesale.
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <NumberDial label="FHLB Advance (Δ this quarter)" value={d.fhlbAdvance}
              onChange={v => setDecision("fhlbAdvance", v)}
              min={-10000} max={20000} step={500} format="money"
              hint={`Outstanding: ${KBE.fmt$(state.bs.borrowingsFHLB)} · floating cost ≈ Fed Funds + 50bp`}
              color={KP.warn} locked={locked} />
            <NumberDial label="Sub Debt (Δ this quarter)" value={d.subDebtIssuance}
              onChange={v => setDecision("subDebtIssuance", v)}
              min={-10000} max={10000} step={500} format="money"
              hint={`Outstanding: ${KBE.fmt$(state.bs.subDebt)} · avg fixed cost ${((state.bs.subDebtAvgCost || 0) * 100).toFixed(2)}% · new issuance locks at Fed Funds + 100bp (${(((state.macro.fedFunds || 0) + 0.01) * 100).toFixed(2)}%)`}
              color={KP.warn} locked={locked} />
          </div>
        </div>
      </div>

      {/* Provision override */}
      <div className="panel panel-pad">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
          <div className="label-strong">Provision Override</div>
          <button onClick={() => setDecision("provisionOverride", null)} disabled={locked || d.provisionOverride === null}
            style={{
              fontSize: 11, padding: "5px 12px", borderRadius: 6,
              background: d.provisionOverride === null ? KP.panel2 : KP.amber,
              color: d.provisionOverride === null ? KP.textMute : "#1a1408",
              border: "none", fontWeight: 600,
            }}>
            {d.provisionOverride === null ? "Auto (model)" : "Reset to auto"}
          </button>
        </div>
        <div className="serif" style={{ fontSize: 13, color: KP.textMute, marginBottom: 12 }}>
          Override the CECL model's recommended provision. Aggressive reserve building flows through earnings now, padding the cushion later.
        </div>
        <NumberDial label="Provision Expense (next qtr)"
          value={d.provisionOverride ?? 0}
          onChange={v => setDecision("provisionOverride", v)}
          min={0} max={2000} step={50} format="money"
          hint={d.provisionOverride === null ? `Auto recommendation will run · last quarter ${KBE.fmt$(state.lastIS.provision)}` : `Manual override: ${KBE.fmt$(d.provisionOverride)} · click reset to use model`}
          color={KP.info} locked={locked} />
      </div>

      {/* Capital impact preview */}
      <div className="panel panel-pad">
        <div className="label-strong" style={{ marginBottom: 12 }}>Capital Impact — Next Quarter Projection</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          <div>
            <div className="label" style={{ fontSize: 9.5 }}>CET1 Δ</div>
            <div className="num" style={{ fontSize: 22, fontWeight: 700, color: cet1Tone }}>
              {cet1Bp >= 0 ? "+" : ""}{cet1Bp.toFixed(0)} bps
            </div>
            <div className="num" style={{ fontSize: 11, color: KP.textMute, marginTop: 2 }}>
              {(ratios.cet1 * 100).toFixed(2)}% → {(fr.cet1 * 100).toFixed(2)}%
            </div>
          </div>
          <div>
            <div className="label" style={{ fontSize: 9.5 }}>Cash Δ</div>
            <div className="num" style={{ fontSize: 22, fontWeight: 700, color: forecast.bs.cash >= state.bs.cash ? KP.good : KP.bad }}>
              {forecast.bs.cash >= state.bs.cash ? "+" : ""}{KBE.fmt$(forecast.bs.cash - state.bs.cash)}
            </div>
            <div className="num" style={{ fontSize: 11, color: KP.textMute, marginTop: 2 }}>
              {KBE.fmt$(state.bs.cash)} → {KBE.fmt$(forecast.bs.cash)}
            </div>
          </div>
          <div>
            <div className="label" style={{ fontSize: 9.5 }}>Wholesale / Total</div>
            <div className="num" style={{ fontSize: 22, fontWeight: 700, color: (forecast.bs.borrowingsFHLB / (KBE.totalDeposits(forecast.bs.deposits) + forecast.bs.borrowingsFHLB)) > 0.15 ? KP.warn : KP.text }}>
              {((forecast.bs.borrowingsFHLB / Math.max(1, KBE.totalDeposits(forecast.bs.deposits) + forecast.bs.borrowingsFHLB)) * 100).toFixed(1)}%
            </div>
            <div className="num" style={{ fontSize: 11, color: KP.textMute, marginTop: 2 }}>
              FHLB only · ≤ 15%
            </div>
          </div>
          <div>
            <div className="label" style={{ fontSize: 9.5 }}>Net Income (next qtr)</div>
            <div className="num" style={{ fontSize: 22, fontWeight: 700, color: fis.netIncome >= 0 ? KP.good : KP.bad }}>
              {KBE.fmt$(fis.netIncome)}
            </div>
            <div className="num" style={{ fontSize: 11, color: KP.textMute, marginTop: 2 }}>
              after {KBE.fmt$(totalDiv)} divs
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { CapitalTab, NumberDial });

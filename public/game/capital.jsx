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

function CapitalTab({ state, ratios, forecast, setLever, setDecision, locked }) {
  const vp = window.Theme.useViewport();
  const compact = vp.compact;
  const impactCols = vp.isPhone ? 2 : 4;
  const d = state.decisions;
  const lev = state.levers;
  const totalDiv = d.dividendPerShare * state.bs.sharesOutstanding;
  const fr = forecast.ratios;
  const fis = forecast.is;
  const wholesale = (state.bs.borrowingsFHLB || 0) + (state.bs.brokeredCDs || 0);
  const totalFunding = KBE.totalDeposits(state.bs.deposits) + wholesale;
  const wholesalePct = totalFunding > 0 ? (wholesale / totalFunding * 100) : 0;
  const wsTone = wholesalePct > 15 ? KP.warn : KP.textMute;

  const cet1Bp = (fr.cet1 - ratios.cet1) * 10000;
  const cet1Tone = cet1Bp >= 0 ? KP.good : KP.bad;

  const estPrice = KBE.estimatedSharePrice(state, ratios);
  const bvps = KBE.totalEquity(state.bs) / Math.max(1, state.bs.sharesOutstanding);
  const repurchaseHint = d.repurchaseAmount > 0
    ? `Est. price $${estPrice.toFixed(2)} · BVPS $${bvps.toFixed(2)} · buys ~${(d.repurchaseAmount / Math.max(1, estPrice)).toFixed(1)}K shares`
    : `Est. price $${estPrice.toFixed(2)} · BVPS $${bvps.toFixed(2)}`;
  const issuanceShares = d.equityIssuance > 0 ? (d.equityIssuance * 0.95 / Math.max(0.01, estPrice)) : 0;
  const issuanceHint = d.equityIssuance > 0
    ? `Est. price $${estPrice.toFixed(2)} · net 95% (${KBE.fmt$(d.equityIssuance * 0.05)} fee → non-int expense) · ~${issuanceShares.toFixed(1)}K new shares`
    : `Est. price $${estPrice.toFixed(2)} · 5% underwriting fee on gross proceeds`;

  return (
    <div className="tab-enter scroll-thin" style={{ display: "flex", flexDirection: "column", gap: compact ? 10 : 12, padding: compact ? 10 : 14, height: "100%", overflowY: "auto" }}>
      <ForecastStrip state={state} ratios={ratios} forecast={forecast} />

      {/* Capital impact preview — sits high so the projected impact is the first thing you read */}
      <div className="panel panel-pad" data-coach="capital-impact">
        <div className="label-strong" style={{ marginBottom: 12, fontSize: compact ? 12.5 : undefined }}>Treasury Impacts — Next Quarter</div>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${impactCols}, 1fr)`, gap: compact ? 12 : 14 }}>
          <div>
            <div className="label" style={{ fontSize: 9.5 }}>CET1 Δ</div>
            <div className="num" style={{ fontSize: 22, fontWeight: 700, color: cet1Tone }}>
              {cet1Bp >= 0 ? "+" : ""}{cet1Bp.toFixed(0)} bps
            </div>
            <div className="num" style={{ fontSize: 10.5, color: KP.textMute, marginTop: 2, whiteSpace: "nowrap" }}>
              {(ratios.cet1 * 100).toFixed(2)}% → {(fr.cet1 * 100).toFixed(2)}%
            </div>
          </div>
          <div>
            <div className="label" style={{ fontSize: 9.5 }}>Cash Δ</div>
            <div className="num" style={{ fontSize: 22, fontWeight: 700, color: forecast.bs.cash >= state.bs.cash ? KP.good : KP.bad }}>
              {forecast.bs.cash >= state.bs.cash ? "+" : ""}{KBE.fmt$(forecast.bs.cash - state.bs.cash)}
            </div>
            <div className="num" style={{ fontSize: 10.5, color: KP.textMute, marginTop: 2, whiteSpace: "nowrap" }}>
              {KBE.fmt$(state.bs.cash)} → {KBE.fmt$(forecast.bs.cash)}
            </div>
          </div>
          <div>
            <div className="label" style={{ fontSize: 9.5 }}>Wholesale / Total</div>
            {(() => {
              const fwh = (forecast.bs.borrowingsFHLB || 0) + (forecast.bs.brokeredCDs || 0);
              const ftd = KBE.totalDeposits(forecast.bs.deposits);
              const wsPct = fwh / Math.max(1, ftd + fwh);
              return (
                <>
                  <div className="num" style={{ fontSize: 22, fontWeight: 700, color: wsPct > 0.15 ? KP.warn : KP.text }}>
                    {(wsPct * 100).toFixed(1)}%
                  </div>
                  <div className="num" style={{ fontSize: 10.5, color: KP.textMute, marginTop: 2, whiteSpace: "nowrap" }}>
                    FHLB + brokered · ≤ 15%
                  </div>
                </>
              );
            })()}
          </div>
          {(() => {
            const dRetained = fis.netIncome - totalDiv;
            return (
              <div>
                <div className="label" style={{ fontSize: 9.5 }}>Δ Retained Earnings</div>
                <div className="num" style={{ fontSize: 22, fontWeight: 700, color: dRetained >= 0 ? KP.good : KP.bad }}>
                  {dRetained >= 0 ? "+" : ""}{KBE.fmt$(dRetained)}
                </div>
                <div className="num" style={{ fontSize: 10.5, color: KP.textMute, marginTop: 2, whiteSpace: "nowrap" }}>
                  NI {KBE.fmt$(fis.netIncome)} less {KBE.fmt$(totalDiv)} divs
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: vp.isPhone ? "1fr" : "1fr 1fr", gap: compact ? 10 : 14 }}>
        {/* Shareholder distributions */}
        <div className="panel panel-pad" data-coach="capital-distributions">
          <div className="label-strong" style={{ marginBottom: 4, fontSize: compact ? 12.5 : undefined }}>Shareholder Distributions</div>
          <div style={{ fontSize: 13, color: KP.textMute, marginBottom: 14 }}>
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
              hint={repurchaseHint}
              color={KP.amber} locked={locked} />
            <NumberDial label="Equity Issuance (gross proceeds)" value={d.equityIssuance || 0}
              onChange={v => setDecision("equityIssuance", v)}
              min={0} max={20000} step={500} format="money"
              hint={issuanceHint}
              color={KP.bad} locked={locked} />
          </div>
        </div>

        {/* Wholesale funding */}
        <div className="panel panel-pad" data-coach="capital-wholesale">
          <div className="label-strong" style={{ marginBottom: 4, fontSize: compact ? 12.5 : undefined }}>Wholesale Funding</div>
          <div style={{ fontSize: 13, color: KP.textMute, marginBottom: 14 }}>
            FHLB advances float with Fed Funds; brokered CDs auto-roll at Fed Funds + 35bp. Together they form your wholesale concentration.
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <NumberDial label="FHLB Advance (Δ this quarter)" value={d.fhlbAdvance}
              onChange={v => setDecision("fhlbAdvance", v)}
              min={-10000} max={20000} step={500} format="money"
              hint={`Outstanding: ${KBE.fmt$(state.bs.borrowingsFHLB)} · floating cost ≈ Fed Funds + 50bp`}
              color={KP.warn} locked={locked} />
            <NumericLeverCard
              title="Brokered CDs Balance"
              subtitle="Wholesale time deposits, auto-roll at Fed Funds + 35bp"
              value={d.brokeredCDsTarget || 0}
              onChange={(v) => setDecision("brokeredCDsTarget", v)}
              min={0} max={50000} step={500} format="money"
              color={KP.warn}
              pill={d.brokeredCDsTarget > 0 ? `$${(d.brokeredCDsTarget / 1000).toFixed(1)}M` : "Off"}
              hint={`Outstanding: ${KBE.fmt$(state.bs.brokeredCDs || 0)} · cost ≈ ${(((state.macro.fedFunds || 0) + 0.0035) * 100).toFixed(2)}% · counts toward wholesale concentration (≤ 15%)`}
              locked={locked}
            />
            <div style={{ padding: "8px 12px", background: KP.bgRaised, borderRadius: 8, fontSize: 11.5, color: KP.textDim, display: "flex", justifyContent: "space-between" }}>
              <span>Wholesale funding (FHLB + brokered)</span>
              <span className="num" style={{ color: wsTone, fontWeight: 600 }}>{wholesalePct.toFixed(1)}% of funding</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: vp.isPhone ? "1fr" : "1fr 1fr", gap: compact ? 10 : 14 }}>
        {/* Balance sheet positioning */}
        <div className="panel panel-pad" data-coach="capital-balance-sheet">
          <div className="label-strong" style={{ marginBottom: 4, fontSize: compact ? 12.5 : undefined }}>Balance Sheet Positioning</div>
          <div style={{ fontSize: 13, color: KP.textMute, marginBottom: 14 }}>
            Securities duration and cash buffer — how much rate risk and runoff cushion you carry.
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {LEVERS_BALANCE_SHEET.map(L => (
              <LeverCard key={L.key} lever={L} value={lev[L.key] ?? 0} onChange={(v) => setLever(L.key, v)} locked={locked} />
            ))}
          </div>
        </div>

        {/* Sub debt */}
        <div className="panel panel-pad" data-coach="capital-sub-debt">
          <div className="label-strong" style={{ marginBottom: 4, fontSize: compact ? 12.5 : undefined }}>Sub Debt</div>
          <div style={{ fontSize: 13, color: KP.textMute, marginBottom: 14 }}>
            Subordinated debt locks in at fixed cost on issuance and counts toward Total Capital — not wholesale concentration.
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <NumberDial label="Sub Debt Issuance (Δ this quarter)" value={d.subDebtIssuance}
              onChange={v => setDecision("subDebtIssuance", v)}
              min={-10000} max={10000} step={500} format="money"
              hint={`Outstanding: ${KBE.fmt$(state.bs.subDebt)} · avg fixed cost ${((state.bs.subDebtAvgCost || 0) * 100).toFixed(2)}% · new issuance locks at Fed Funds + 100bp (${(((state.macro.fedFunds || 0) + 0.01) * 100).toFixed(2)}%)`}
              color={KP.warn} locked={locked} />
          </div>
        </div>
      </div>

      {/* Provision override */}
      <div className="panel panel-pad" data-coach="capital-provision">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
          <div className="label-strong" style={{ fontSize: compact ? 12.5 : undefined }}>Provision Override</div>
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
        <div style={{ fontSize: 13, color: KP.textMute, marginBottom: 12 }}>
          Override the CECL model's provision. Running lean flatters earnings now — but charge-offs that outrun the allowance spill straight into capital plus a remediation fee, and below 0.35x ACL/NPL coverage a mandatory catch-up overrides you. Auto keeps reserves safely above the examiner's line.
        </div>
        {(() => {
          const cov = state.bs.npl > 0 ? state.bs.acl / state.bs.npl : null;
          const covStr = cov === null ? "ACL/NPL coverage —" : `ACL/NPL coverage ${cov.toFixed(2)}x`;
          const hint = d.provisionOverride === null
            ? `Auto model will run · ${covStr} · last quarter ${KBE.fmt$(state.lastIS.provision)}`
            : `Manual override: ${KBE.fmt$(d.provisionOverride)} · ${covStr} · catch-up forces a top-up below 0.35x`;
          return (
            <NumberDial label="Provision Expense (next qtr)"
              value={d.provisionOverride ?? 0}
              onChange={v => setDecision("provisionOverride", v)}
              min={0} max={2000} step={50} format="money"
              hint={hint}
              color={KP.info} locked={locked} />
          );
        })()}
      </div>
    </div>
  );
}

Object.assign(window, { CapitalTab, NumberDial });

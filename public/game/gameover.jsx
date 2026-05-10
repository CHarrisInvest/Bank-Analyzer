// Game over modal
const { palette: GP, quarterLabel: gqlbl } = window.Theme;
const GBE = window.BankEngine;

function GameOver({ state, onRestart }) {
  if (!state.gameOver) return null;
  const go = state.gameOver;
  const failed = go.reason !== "victory";
  const stats = go.stats || {};

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(8,12,18,0.85)",
      backdropFilter: "blur(8px)", zIndex: 10000,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 32,
    }}>
      <div className="panel" style={{ padding: 36, maxWidth: 720, width: "100%" }}>
        <div style={{
          fontSize: 11, fontWeight: 600, letterSpacing: "0.2em",
          color: failed ? GP.bad : GP.good, textTransform: "uppercase", marginBottom: 8,
        }}>
          {failed ? "Bank Failed" : "Tenure Complete"}
        </div>
        <div className="serif" style={{ fontSize: 36, lineHeight: 1.05, marginBottom: 12 }}>
          {failed ? "FDIC has been appointed receiver." : `Grade: ${go.grade || "—"}`}
        </div>
        {!failed && go.gradeMsg && (
          <div style={{ fontSize: 14, color: GP.textDim, marginBottom: 16 }}>{go.gradeMsg}</div>
        )}
        <div style={{ fontSize: 14, color: GP.text, lineHeight: 1.55, marginBottom: 18 }}>
          {go.msg}
        </div>
        {go.cause && (
          <div style={{ fontSize: 13, color: GP.bad, padding: "10px 12px", background: GP.badSoft, borderRadius: 8, marginBottom: 18, borderLeft: `3px solid ${GP.bad}` }}>
            <strong>Root cause:</strong> {go.cause}
          </div>
        )}
        <div style={{ display: "grid", gridTemplateColumns: failed ? "repeat(4, 1fr)" : "repeat(5, 1fr)", gap: 12, marginBottom: 24 }}>
          {!failed && (
            <>
              <Stat label="BVPS Growth" value={`${(stats.bvpsCAGR * 100).toFixed(1)}%`} sub="CAGR" tone={stats.bvpsCAGR > 0.06 ? GP.good : stats.bvpsCAGR > 0 ? GP.warn : GP.bad} />
              <Stat label="Total Return" value={`${(stats.totalReturn * 100).toFixed(1)}%`} sub={`divs $${(stats.totalDividendsPerShare || 0).toFixed(2)}/sh`} tone={stats.totalReturn > 0.80 ? GP.good : stats.totalReturn > 0 ? GP.warn : GP.bad} />
              <Stat label="Avg ROE" value={`${(stats.annualizedROE * 100).toFixed(1)}%`} tone={stats.annualizedROE > 0.10 ? GP.good : stats.annualizedROE > 0.06 ? GP.warn : GP.bad} />
              <Stat label="Final CET1" value={`${(stats.finalCET1 * 100).toFixed(1)}%`} tone={stats.finalCET1 > 0.10 ? GP.good : GP.warn} />
              <Stat label="Final BVPS" value={`$${stats.finalBVPS?.toFixed(2)}`} sub={`from $${stats.initialBVPS?.toFixed(2)}`} />
            </>
          )}
          {failed && (
            <>
              <Stat label="Final CET1" value={`${(stats.finalCET1 * 100).toFixed(1)}%`} tone={GP.bad} />
              <Stat label="Tier 1 Lev." value={`${(stats.finalTier1Lev * 100).toFixed(1)}%`} tone={GP.bad} />
              <Stat label="NPL Ratio" value={`${(stats.finalNPL * 100).toFixed(1)}%`} />
              <Stat label="AOCI" value={GBE.fmt$(stats.finalAOCI || 0)} tone={(stats.finalAOCI || 0) < 0 ? GP.bad : GP.text} />
            </>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button onClick={onRestart} style={{
            padding: "12px 22px",
            background: `linear-gradient(135deg, ${GP.amber} 0%, ${GP.amberDeep} 100%)`,
            color: "#1a1408", border: "none", borderRadius: 8,
            fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
          }}>Begin a New Tenure →</button>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, sub, tone }) {
  return (
    <div style={{ padding: "10px 12px", background: GP.bgRaised, borderRadius: 8 }}>
      <div className="label" style={{ fontSize: 9.5 }}>{label}</div>
      <div className="num" style={{ fontSize: 18, fontWeight: 700, color: tone || GP.text }}>{value}</div>
      {sub && <div className="num" style={{ fontSize: 10.5, color: GP.textMute, marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

window.GameOver = GameOver;

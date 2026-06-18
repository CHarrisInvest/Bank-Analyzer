// Game over modal
const { palette: GP, quarterLabel: gqlbl } = window.Theme;
const GBE = window.BankEngine;

function GameOver({ state, onRestart }) {
  const vp = window.Theme.useViewport();
  const compact = vp.compact;
  if (!state.gameOver) return null;
  const go = state.gameOver;
  const failed = go.reason !== "victory";
  const stats = go.stats || {};
  const statCols = vp.isPhone ? 2 : 4;

  return (
    <div className="scroll-thin" style={{
      position: "fixed", inset: 0, background: "rgba(8,12,18,0.85)",
      backdropFilter: "blur(8px)", zIndex: 10000,
      display: "flex", alignItems: compact ? "flex-start" : "center", justifyContent: "center",
      padding: compact ? 14 : 32, overflowY: "auto",
    }}>
      <div className="panel" style={{ padding: compact ? 20 : 36, maxWidth: 720, width: "100%", margin: compact ? "auto" : 0 }}>
        <div style={{
          fontSize: 11, fontWeight: 600, letterSpacing: "0.2em",
          color: failed ? GP.bad : GP.good, textTransform: "uppercase", marginBottom: 8,
        }}>
          {failed ? "Bank Failed" : "Tenure Complete"}
        </div>
        <div className="serif" style={{ fontSize: compact ? 28 : 36, lineHeight: 1.05, marginBottom: 12 }}>
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
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${statCols}, 1fr)`, gap: 12, marginBottom: failed ? 24 : 12 }}>
          {!failed && (
            <>
              <Stat label="Total Return" value={`${(stats.totalReturn * 100).toFixed(1)}%`} sub={`divs $${(stats.totalDividendsPerShare || 0).toFixed(2)}/sh`} tone={stats.totalReturn > 1.20 ? GP.good : stats.totalReturn > 0.50 ? GP.warn : GP.bad} />
              <Stat label="BVPS Growth" value={`${(stats.bvpsCAGR * 100).toFixed(1)}%`} sub="CAGR" tone={stats.bvpsCAGR > 0.06 ? GP.good : stats.bvpsCAGR > 0 ? GP.warn : GP.bad} />
              <Stat label="Avg ROE" value={`${(stats.annualizedROE * 100).toFixed(1)}%`} tone={stats.annualizedROE > 0.10 ? GP.good : stats.annualizedROE > 0.06 ? GP.warn : GP.bad} />
              <Stat label="Final BVPS" value={`$${stats.finalBVPS?.toFixed(2)}`} sub={`from $${stats.initialBVPS?.toFixed(2)}`} />
              <Stat label="Final CET1" value={`${(stats.finalCET1 * 100).toFixed(1)}%`} tone={stats.finalCET1 > 0.10 ? GP.good : stats.finalCET1 > 0.07 ? GP.warn : GP.bad} />
              <Stat label="Final L/D" value={`${stats.finalLTD?.toFixed(2)}x`} tone={(stats.finalLTD >= 0.65 && stats.finalLTD <= 1.15) ? GP.good : GP.warn} />
              <Stat label="Final Satisfaction" value={`${Math.round(stats.finalSat ?? 70)}`} tone={(stats.finalSat ?? 70) >= 55 ? GP.good : (stats.finalSat ?? 70) >= 40 ? GP.warn : GP.bad} />
              <Stat label="Macro Difficulty" value={stats.macroDifficulty || "—"} sub={`recessions ${stats.recessionQtrs}q · shocks ${stats.badEventCount}`} tone={stats.macroDifficulty === "Brutal" ? GP.bad : stats.macroDifficulty === "Hard" ? GP.warn : GP.text} />
            </>
          )}
          {failed && (
            <>
              <Stat label="Final CET1" value={`${(stats.finalCET1 * 100).toFixed(1)}%`} tone={GP.bad} />
              <Stat label="Tier 1 Lev." value={`${(stats.finalTier1Lev * 100).toFixed(1)}%`} tone={GP.bad} />
              <Stat label="NPL Ratio" value={`${(stats.finalNPL * 100).toFixed(1)}%`} />
              <Stat label="AOCI" value={GBE.fmt$(stats.finalAOCI || 0)} tone={(stats.finalAOCI || 0) < 0 ? GP.bad : GP.text} />
              {stats.macroDifficulty && (
                <Stat label="Macro Difficulty" value={stats.macroDifficulty} sub={`recessions ${stats.recessionQtrs ?? 0}q · shocks ${stats.badEventCount ?? 0}`} tone={stats.macroDifficulty === "Brutal" ? GP.bad : stats.macroDifficulty === "Hard" ? GP.warn : GP.text} />
              )}
              {stats.failedAtQ && (
                <Stat label="Failed At" value={`Y${Math.ceil(stats.failedAtQ / 4)} Q${((stats.failedAtQ - 1) % 4) + 1}`} sub={`${stats.failedAtQ}/40 qtrs in`} tone={GP.bad} />
              )}
            </>
          )}
        </div>
        {!failed && go.modifiersApplied && go.modifiersApplied.length > 0 && (
          <div style={{ fontSize: 12, color: GP.warn, padding: "8px 12px", background: GP.warnSoft, borderRadius: 8, marginBottom: 18, borderLeft: `3px solid ${GP.warn}` }}>
            <strong>Tier modifiers applied:</strong> {go.modifiersApplied.join("; ")}
          </div>
        )}
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

// App root — state, tab routing, advance flow, animated transition.
const { useState, useEffect, useRef, useMemo: useMemoA } = React;
const { palette: AP } = window.Theme;
const ABE = window.BankEngine;

const GA = window.GameAnalytics || { track() {} };

function deepClone(s) { return JSON.parse(JSON.stringify(s)); }
// Ratio → percent with one decimal, for analytics params.
const pct = (x) => (Number.isFinite(x) ? Math.round(x * 1000) / 10 : undefined);

const TAB_FLOW = { cockpit: null, levers: "levers", capital: "capital", report: "report", history: "history" };
const TAB_FLOW_ALL = { ...TAB_FLOW, markets: null }; // every tab a save may restore
const COACH_SEEN_KEY = "bankceo.coach.seen";
function readSeen() {
  try { return new Set(JSON.parse(sessionStorage.getItem(COACH_SEEN_KEY) || "[]")); }
  catch { return new Set(); }
}
function writeSeen(set) {
  try { sessionStorage.setItem(COACH_SEEN_KEY, JSON.stringify([...set])); } catch {}
}

// Saved game — kept in localStorage so a page refresh resumes the same run.
// The engine state is plain JSON (the run's randomness is derived from
// runSeed + quarter), so a restored game plays out exactly as it would have.
const SAVE_KEY = "bankceo.save.v1";
const SAVE_DELAY_MS = 250;
function freshState() {
  return deepClone({ ...ABE.INITIAL_STATE, runSeed: Math.floor(Math.random() * 100000) });
}
function loadSave() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const save = JSON.parse(raw);
    const s = save && save.state;
    const valid = s && typeof s === "object"
      && Number.isFinite(s.quarter) && s.quarter >= 1
      && s.bs && typeof s.bs === "object"
      && s.levers && typeof s.levers === "object"
      && s.lastIS && typeof s.lastIS === "object"
      && Array.isArray(s.history);
    if (!valid) throw new Error("bad save");
    // Fill any top-level fields added to the engine since the game was saved.
    const state = { ...deepClone(ABE.INITIAL_STATE), ...s };
    ABE.computeRatios(state, state.lastIS); // throws if the save can't be played
    return { state, tab: Object.prototype.hasOwnProperty.call(TAB_FLOW_ALL, save.tab) ? save.tab : "cockpit" };
  } catch {
    try { localStorage.removeItem(SAVE_KEY); } catch {}
    return null;
  }
}
function writeSave(state, tab) {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify({ v: 1, state, tab })); } catch {}
}

function App() {
  const [initial] = useState(() => loadSave());
  const [state, setState] = useState(() => (initial ? initial.state : deepClone(ABE.INITIAL_STATE)));
  const [tab, setTab] = useState(() => (initial ? initial.tab : "cockpit"));
  const [advancing, setAdvancing] = useState(false);
  const [flashKey, setFlashKey] = useState(0);
  const [coachFlow, setCoachFlow] = useState(() => {
    const seen = readSeen();
    return seen.has("intro") ? null : "intro";
  });

  const ratios = useMemoA(() => ABE.computeRatios(state, state.lastIS), [state]);

  // ---- Analytics (forwarded to GA4 by the parent page; see analytics.js) ----
  // A refresh that resumes a saved game isn't a new start.
  useEffect(() => { if (!initial) GA.track("game_start", {}); }, []);

  // ---- Save (debounced; flushed when the page is hidden or unloaded) ----
  const latest = useRef({ state, tab });
  latest.current = { state, tab };
  useEffect(() => {
    const t = setTimeout(() => writeSave(state, tab), SAVE_DELAY_MS);
    return () => clearTimeout(t);
  }, [state, tab]);
  useEffect(() => {
    const flush = () => writeSave(latest.current.state, latest.current.tab);
    const onVis = () => { if (document.visibilityState === "hidden") flush(); };
    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("pagehide", flush);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const prevQuarter = useRef(state.quarter);
  useEffect(() => {
    const prev = prevQuarter.current;
    prevQuarter.current = state.quarter;
    if (state.quarter <= prev) return; // mount or restart
    GA.track("quarter_advanced", {
      quarter: prev,
      net_income: Math.round(state.lastIS.netIncome),
      roe_pct: pct(ratios.roe),
      cet1_pct: pct(ratios.cet1),
      nim_pct: pct(ratios.nim),
    });
  }, [state.quarter]);

  // Seeded with a restored game's result so a refresh on the end screen
  // doesn't report the same game over twice.
  const reportedOver = useRef(initial ? initial.state.gameOver : null);
  useEffect(() => {
    const g = state.gameOver;
    if (!g || g === reportedOver.current) return;
    reportedOver.current = g;
    const st = g.stats || {};
    GA.track("game_over", {
      outcome: g.reason,
      grade: g.grade,
      quarters_played: st.failedAtQ || state.quarter - 1,
      total_return_pct: pct(st.totalReturn),
      final_cet1_pct: pct(st.finalCET1),
      macro_difficulty: st.macroDifficulty,
      failure_cause: g.cause,
    });
  }, [state.gameOver]);

  // Compute next-quarter forecast (deterministic preview)
  const forecast = useMemoA(() => {
    try {
      const ns = ABE.runQuarter(state, { forecastMode: true });
      const fr = ABE.computeRatios(ns, ns.lastIS);
      return { is: ns.lastIS, bs: ns.bs, ratios: fr, snapshot: ns };
    } catch (e) {
      console.error("Forecast failed", e);
      return { is: state.lastIS, bs: state.bs, ratios };
    }
  }, [state, ratios]);

  const setLever = (key, val) => {
    setState(s => ({ ...s, levers: { ...s.levers, [key]: val } }));
  };
  const setDecision = (key, val) => {
    setState(s => ({ ...s, decisions: { ...s.decisions, [key]: val } }));
  };

  const advance = () => {
    if (state.gameOver || advancing) return;
    setAdvancing(true);
    // Snapshot the current forecast before mutation
    const totalDep = (bs) => bs.deposits.noninterest + bs.deposits.interestChecking + bs.deposits.savingsMM + bs.deposits.timeDeposits;
    const wholesale = (bs) => (bs.borrowingsFHLB || 0) + (bs.brokeredCDs || 0);
    const lf = {
      netIncome: forecast.is.netIncome,
      eps: forecast.is.netIncome / Math.max(1e-6, forecast.bs.sharesOutstanding),
      provision: forecast.is.provision,
      nonintIncome: forecast.is.nonintIncome,
      nonintExpense: forecast.is.nonintExpense,
      nim: forecast.ratios.nim,
      cet1: forecast.ratios.cet1,
      loansGross: forecast.bs.loansGross,
      deposits: totalDep(forecast.bs),
      wholesale: wholesale(forecast.bs),
      efficiency: forecast.ratios.efficiency,
    };
    setTimeout(() => {
      setState(s => {
        const ns = ABE.runQuarter(s, {});
        ns.lastForecast = lf;
        return ns;
      });
      setFlashKey(k => k + 1);
      setAdvancing(false);
    }, 380);
  };

  const restart = () => {
    if (advancing) return; // the pending advance would land on the new game
    GA.track("game_restart", { quarter: state.quarter, was_over: state.gameOver ? "yes" : "no" });
    const ns = freshState();
    writeSave(ns, "cockpit");
    setState(ns);
    setTab("cockpit");
  };

  // Header restart: confirm before throwing away a game in progress.
  const confirmRestart = () => {
    if (advancing) return;
    const inProgress = state.quarter > 1 && !state.gameOver;
    if (inProgress && !window.confirm("Restart BankCEO? Your current game will be lost.")) return;
    restart();
  };

  const dismissCoach = () => {
    if (coachFlow) {
      const seen = readSeen();
      seen.add(coachFlow);
      writeSeen(seen);
    }
    setCoachFlow(null);
  };

  // Auto-dismiss the intro after Y1.
  useEffect(() => {
    if (state.quarter > 4 && coachFlow === "intro") dismissCoach();
  }, [state.quarter]);

  const handleTabChange = (newTab) => {
    if (newTab === tab) return;
    GA.track("game_tab_changed", { tab_name: newTab, quarter: state.quarter });
    // Switching tabs interrupts any active flow — mark it seen so it doesn't re-fire.
    if (coachFlow) {
      const seen = readSeen();
      seen.add(coachFlow);
      writeSeen(seen);
      setCoachFlow(null);
    }
    setTab(newTab);
    const flowName = TAB_FLOW[newTab];
    if (flowName && !state.gameOver) {
      const seen = readSeen();
      if (!seen.has(flowName)) {
        // Defer one tick so the new tab content mounts before the coach measures its target.
        setTimeout(() => setCoachFlow(flowName), 80);
      }
    }
  };

  const vp = window.Theme.useViewport();

  // The Markets tab only exists in the compact shell. If the viewport grows
  // to desktop while it's active, fall back to the cockpit.
  const effTab = (!vp.compact && tab === "markets") ? "cockpit" : tab;

  let body;
  if (effTab === "cockpit") body = <CockpitTab state={state} ratios={ratios} forecast={forecast} />;
  else if (effTab === "levers") body = <LeversTab state={state} ratios={ratios} forecast={forecast} setLever={setLever} setDecision={setDecision} locked={!!state.gameOver || advancing} />;
  else if (effTab === "capital") body = <CapitalTab state={state} ratios={ratios} forecast={forecast} setLever={setLever} setDecision={setDecision} locked={!!state.gameOver || advancing} />;
  else if (effTab === "report") body = <CallReportTab state={state} ratios={ratios} />;
  else if (effTab === "history") body = <HistoryTab state={state} />;
  else if (effTab === "markets") body = <MobileMarkets state={state} />;

  const coachNode = (
    <Coach flow={coachFlow && (coachFlow !== "intro" || (state.quarter === 1 && !state.gameOver)) ? coachFlow : null} onDismiss={() => { GA.track("coach_closed", { flow_name: coachFlow, quarter: state.quarter }); dismissCoach(); }} />
  );

  // ---- Compact shell (phone + tablet) ----
  if (vp.compact) {
    // Landscape phones are wide but short: a bottom bar would crowd out the
    // body, so nav moves to a narrow side rail and the body keeps the height.
    const landscapeShort = vp.width > vp.height && vp.height < 560;

    if (landscapeShort) {
      return (
        <div style={{
          display: "flex", flexDirection: "column",
          height: "100%", overflow: "hidden",
          background: AP.bg,
          position: "relative",
        }}>
          <Header state={state} ratios={ratios} onRestart={confirmRestart} restartDisabled={advancing} />
          <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
            <SideNav tab={tab} setTab={handleTabChange} onAdvance={advance} advancing={advancing} state={state} />
            <div style={{ flex: 1, minWidth: 0, position: "relative" }}>
              {advancing && <div className="q-flash" key={flashKey} />}
              <div key={effTab + "-" + state.quarter} style={{ height: "100%" }}>
                {body}
              </div>
            </div>
          </div>
          {coachNode}
          <GameOver state={state} onRestart={restart} />
        </div>
      );
    }

    // Portrait: stacked header / body / bottom nav.
    return (
      <div style={{
        display: "flex", flexDirection: "column",
        height: "100%", overflow: "hidden",
        background: AP.bg,
        position: "relative",
      }}>
        <Header state={state} ratios={ratios} onRestart={confirmRestart} restartDisabled={advancing} />
        <div style={{ flex: 1, minHeight: 0, position: "relative", overflow: "hidden" }}>
          {advancing && <div className="q-flash" key={flashKey} />}
          <div key={effTab + "-" + state.quarter} style={{ height: "100%" }}>
            {body}
          </div>
        </div>
        <MobileNav tab={tab} setTab={handleTabChange} onAdvance={advance} advancing={advancing} state={state} />
        {coachNode}
        <GameOver state={state} onRestart={restart} />
      </div>
    );
  }

  // ---- Desktop shell: three-column layout ----
  return (
    <div style={{
      display: "flex", flexDirection: "column",
      height: "100%", overflow: "hidden",
      background: AP.bg,
      position: "relative",
    }}>
      <Header state={state} ratios={ratios} onRestart={confirmRestart} restartDisabled={advancing} />
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        <TabStrip tab={tab} setTab={handleTabChange} />
        <div style={{ flex: 1, minWidth: 0, position: "relative" }}>
          {advancing && <div className="q-flash" key={flashKey} />}
          <div key={effTab + "-" + state.quarter} style={{ height: "100%" }}>
            {body}
          </div>
        </div>
        <RightRail state={state} ratios={ratios} onAdvance={advance} advancing={advancing} />
      </div>
      {coachNode}
      <GameOver state={state} onRestart={restart} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

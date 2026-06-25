// App root — state, tab routing, advance flow, animated transition.
const { useState, useEffect, useRef, useMemo: useMemoA } = React;
const { palette: AP } = window.Theme;
const ABE = window.BankEngine;

function deepClone(s) { return JSON.parse(JSON.stringify(s)); }

const TAB_FLOW = { cockpit: null, levers: "levers", capital: "capital", report: "report", history: "history" };
const COACH_SEEN_KEY = "bankceo.coach.seen";
function readSeen() {
  try { return new Set(JSON.parse(sessionStorage.getItem(COACH_SEEN_KEY) || "[]")); }
  catch { return new Set(); }
}
function writeSeen(set) {
  try { sessionStorage.setItem(COACH_SEEN_KEY, JSON.stringify([...set])); } catch {}
}

function App() {
  const [state, setState] = useState(() => deepClone(ABE.INITIAL_STATE));
  const [tab, setTab] = useState("cockpit");
  const [advancing, setAdvancing] = useState(false);
  const [flashKey, setFlashKey] = useState(0);
  const [coachFlow, setCoachFlow] = useState(() => {
    const seen = readSeen();
    return seen.has("intro") ? null : "intro";
  });

  const ratios = useMemoA(() => ABE.computeRatios(state, state.lastIS), [state]);

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
    setState(deepClone({ ...ABE.INITIAL_STATE, runSeed: Math.floor(Math.random() * 100000) }));
    setTab("cockpit");
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
    <Coach flow={coachFlow && (coachFlow !== "intro" || (state.quarter === 1 && !state.gameOver)) ? coachFlow : null} onDismiss={dismissCoach} />
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
          <Header state={state} ratios={ratios} />
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
        <Header state={state} ratios={ratios} />
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
      <Header state={state} ratios={ratios} />
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

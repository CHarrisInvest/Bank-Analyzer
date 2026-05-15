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

  let body;
  if (tab === "cockpit") body = <CockpitTab state={state} ratios={ratios} forecast={forecast} />;
  else if (tab === "levers") body = <LeversTab state={state} ratios={ratios} forecast={forecast} setLever={setLever} setDecision={setDecision} locked={!!state.gameOver || advancing} />;
  else if (tab === "capital") body = <CapitalTab state={state} ratios={ratios} forecast={forecast} setDecision={setDecision} locked={!!state.gameOver || advancing} />;
  else if (tab === "report") body = <CallReportTab state={state} ratios={ratios} />;
  else if (tab === "history") body = <HistoryTab state={state} />;

  return (
    <div style={{
      display: "flex", flexDirection: "column",
      height: "100vh", overflow: "hidden",
      background: AP.bg,
      position: "relative",
    }}>
      <Header state={state} ratios={ratios} />
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        <TabStrip tab={tab} setTab={handleTabChange} />
        <div style={{ flex: 1, minWidth: 0, position: "relative" }}>
          {advancing && <div className="q-flash" key={flashKey} />}
          <div key={tab + "-" + state.quarter} style={{ height: "100%" }}>
            {body}
          </div>
        </div>
        <RightRail state={state} ratios={ratios} onAdvance={advance} advancing={advancing} />
      </div>
      <Coach flow={coachFlow && (coachFlow !== "intro" || (state.quarter === 1 && !state.gameOver)) ? coachFlow : null} onDismiss={dismissCoach} />
      <GameOver state={state} onRestart={restart} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

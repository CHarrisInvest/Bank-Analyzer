// App root — state, tab routing, advance flow, animated transition.
const { useState, useEffect, useRef, useMemo: useMemoA } = React;
const { palette: AP } = window.Theme;
const ABE = window.BankEngine;

function deepClone(s) { return JSON.parse(JSON.stringify(s)); }

function App() {
  const [state, setState] = useState(() => deepClone(ABE.INITIAL_STATE));
  const [tab, setTab] = useState("cockpit");
  const [advancing, setAdvancing] = useState(false);
  const [flashKey, setFlashKey] = useState(0);
  const [coachActive, setCoachActive] = useState(() => {
    try { return !sessionStorage.getItem("bankceo.coach.dismissed"); } catch { return true; }
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
      provision: forecast.is.provision,
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
    setCoachActive(false);
    try { sessionStorage.setItem("bankceo.coach.dismissed", "1"); } catch {}
  };

  // Auto-dismiss coach after Y1
  useEffect(() => {
    if (state.quarter > 4 && coachActive) dismissCoach();
  }, [state.quarter]);

  let body;
  if (tab === "cockpit") body = <CockpitTab state={state} ratios={ratios} forecast={forecast} />;
  else if (tab === "levers") body = <LeversTab state={state} ratios={ratios} forecast={forecast} setLever={setLever} locked={!!state.gameOver || advancing} />;
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
        <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
          <TabStrip tab={tab} setTab={setTab} />
          <div style={{ flex: 1, minHeight: 0, position: "relative" }}>
            {advancing && <div className="q-flash" key={flashKey} />}
            <div key={tab + "-" + state.quarter} style={{ height: "100%" }}>
              {body}
            </div>
          </div>
        </div>
        <RightRail state={state} ratios={ratios} onAdvance={advance} advancing={advancing} />
      </div>
      <Coach active={coachActive && state.quarter === 1 && !state.gameOver} onDismiss={dismissCoach} />
      <GameOver state={state} onRestart={restart} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

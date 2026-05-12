// =====================================================================
// BankCEO theme — palette, type, shared primitives. window.Theme.
// Aesthetic: warm dark slate w/ amber signature; Geist + Geist Mono.
// =====================================================================
(function () {
  const palette = {
    // surfaces
    bg:        "#0d1218",
    bgRaised:  "#141b24",
    panel:     "#1a2230",
    panel2:    "#222d3d",
    panelHi:   "#2c394d",
    line:      "#2a384e",
    lineSoft:  "#1f2a3b",

    // text
    text:      "#eef2f6",
    textDim:   "#9aa7b8",
    textMute:  "#6a7686",

    // signature
    amber:     "#f3b561", // primary accent
    amberDeep: "#c98c3b",
    amberSoft: "#3a2e1d",

    // semantic
    good:      "#4dd6a1",
    goodSoft:  "#1d3a30",
    bad:       "#ff7a7a",
    badSoft:   "#3a1f23",
    warn:      "#f0c14d",
    warnSoft:  "#3a2f1a",
    info:      "#7eb8ff",
    infoSoft:  "#1f2c40",

    // cycle
    expansion: "#4dd6a1",
    late_cycle:"#f0c14d",
    recession: "#ff7a7a",
    recovery:  "#7eb8ff",
  };

  const cycleLabel = {
    expansion: "Expansion",
    late_cycle: "Late Cycle",
    recession: "Recession",
    recovery: "Recovery",
  };

  // Severity styling for log entries / events
  const severity = {
    good:    { fg: palette.good, bg: palette.goodSoft, dot: palette.good },
    bad:     { fg: palette.bad,  bg: palette.badSoft,  dot: palette.bad  },
    warn:    { fg: palette.warn, bg: palette.warnSoft, dot: palette.warn },
    info:    { fg: palette.info, bg: palette.infoSoft, dot: palette.info },
    system:  { fg: palette.textDim, bg: palette.lineSoft, dot: palette.textDim },
    neutral: { fg: palette.textDim, bg: palette.lineSoft, dot: palette.textDim },
  };

  // Ratio thresholds for color coding
  function ratioColor(name, v) {
    const p = palette;
    if (v === null || v === undefined || isNaN(v)) return p.textDim;
    switch (name) {
      case "cet1":      return v >= 0.10 ? p.good : v >= 0.075 ? p.warn : p.bad;
      case "tier1Lev":  return v >= 0.08 ? p.good : v >= 0.05 ? p.warn : p.bad;
      case "tce":       return v >= 0.07 ? p.good : v >= 0.05 ? p.warn : p.bad;
      case "nim":       return v >= 0.034 ? p.good : v >= 0.028 ? p.warn : p.bad;
      case "roa":       return v >= 0.010 ? p.good : v >= 0.005 ? p.warn : p.bad;
      case "roe":       return v >= 0.10 ? p.good : v >= 0.06 ? p.warn : p.bad;
      case "nplRatio":  return v <= 0.015 ? p.good : v <= 0.030 ? p.warn : p.bad;
      case "ltd":       return v <= 1.00 ? p.good : v <= 1.10 ? p.warn : p.bad;
      case "onHandLiq": return v >= 0.12 ? p.good : v >= 0.06 ? p.warn : p.bad;
      case "efficiency":return v <= 0.60 ? p.good : v <= 0.70 ? p.warn : p.bad;
      case "satisfaction": return v >= 75 ? p.good : v >= 55 ? p.text : v >= 35 ? p.warn : p.bad;
      default: return p.text;
    }
  }

  function quarterLabel(q) {
    const y = Math.ceil(q / 4);
    const qn = ((q - 1) % 4) + 1;
    return { y, qn, label: `Y${y} Q${qn}` };
  }

  // Inject base CSS once.
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500;600&family=Instrument+Serif&display=swap');
    *, *::before, *::after { box-sizing: border-box; }
    html, body, #root { height: 100%; }
    body {
      margin: 0;
      background: ${palette.bg};
      color: ${palette.text};
      font-family: 'Geist', 'Helvetica Neue', system-ui, -apple-system, sans-serif;
      font-feature-settings: "ss01", "cv11";
      -webkit-font-smoothing: antialiased;
      letter-spacing: -0.005em;
      overflow: hidden;
    }
    button { font-family: inherit; color: inherit; cursor: pointer; }
    .mono { font-family: 'Geist Mono', ui-monospace, monospace; font-feature-settings: "tnum"; letter-spacing: 0; }
    .num { font-family: 'Geist Mono', ui-monospace, monospace; font-feature-settings: "tnum"; letter-spacing: 0; font-variant-numeric: tabular-nums; }
    .serif { font-family: 'Instrument Serif', ui-serif, Georgia, serif; font-style: italic; letter-spacing: 0; }
    .panel {
      background: ${palette.panel};
      border: 1px solid ${palette.line};
      border-radius: 14px;
    }
    .panel-tight { padding: 14px 16px; }
    .panel-pad   { padding: 18px 20px; }
    .panel-soft  { background: ${palette.bgRaised}; border: 1px solid ${palette.lineSoft}; border-radius: 12px; }
    .hairline { border-top: 1px solid ${palette.line}; }
    .label { font-size: 10.5px; font-weight: 500; letter-spacing: 0.10em; text-transform: uppercase; color: ${palette.textDim}; }
    .label-strong { font-size: 11px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: ${palette.text}; }
    .scroll-thin::-webkit-scrollbar { width: 8px; height: 8px; }
    .scroll-thin::-webkit-scrollbar-thumb { background: ${palette.panel2}; border-radius: 4px; }
    .scroll-thin::-webkit-scrollbar-track { background: transparent; }

    /* Slider */
    .lev-slider {
      -webkit-appearance: none; appearance: none; width: 100%; height: 6px;
      background: ${palette.panel2}; border-radius: 999px; outline: none;
    }
    .lev-slider::-webkit-slider-thumb {
      -webkit-appearance: none; appearance: none;
      width: 22px; height: 22px; border-radius: 50%;
      background: ${palette.amber}; border: 3px solid ${palette.bg};
      cursor: pointer; box-shadow: 0 2px 8px rgba(243,181,97,0.35);
      transition: transform 0.12s;
    }
    .lev-slider::-webkit-slider-thumb:hover { transform: scale(1.12); }
    .lev-slider::-moz-range-thumb {
      width: 22px; height: 22px; border-radius: 50%;
      background: ${palette.amber}; border: 3px solid ${palette.bg};
      cursor: pointer;
    }

    /* Advance button pulse */
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(243,181,97,0.35), 0 6px 24px rgba(243,181,97,0.25); }
      50%      { box-shadow: 0 0 0 12px rgba(243,181,97,0.00), 0 6px 28px rgba(243,181,97,0.40); }
    }
    .advance-btn { animation: pulseGlow 2.4s ease-in-out infinite; }

    /* Tab transition */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(6px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .tab-enter { animation: fadeUp 0.28s ease-out; }

    /* Quarter advance flash */
    @keyframes quarterFlash {
      0%   { opacity: 0; }
      30%  { opacity: 1; }
      100% { opacity: 0; }
    }
    .q-flash {
      position: absolute; inset: 0; pointer-events: none;
      background: radial-gradient(ellipse at center, rgba(243,181,97,0.18), transparent 70%);
      animation: quarterFlash 0.7s ease-out;
    }

    /* Forecast → actual morph */
    @keyframes forecastMorph {
      0%   { background: rgba(243,181,97,0.06); }
      100% { background: transparent; }
    }
    .morph { animation: forecastMorph 0.9s ease-out; }

    /* Coach mark pulse */
    @keyframes coachPulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50%      { transform: scale(1.15); opacity: 0.85; }
    }
    .coach-dot {
      animation: coachPulse 1.6s ease-in-out infinite;
    }

    .chip {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 4px 10px; border-radius: 999px;
      font-size: 11px; font-weight: 500; letter-spacing: 0.04em;
      background: ${palette.panel2}; color: ${palette.textDim};
      border: 1px solid ${palette.line};
    }
    .chip-dot { width: 6px; height: 6px; border-radius: 50%; }

    /* Headline ribbon */
    .headline-bar {
      background: linear-gradient(90deg, ${palette.panel} 0%, ${palette.panelHi} 50%, ${palette.panel} 100%);
    }
  `;

  if (typeof document !== "undefined" && !document.getElementById("__bankceo_theme")) {
    const style = document.createElement("style");
    style.id = "__bankceo_theme";
    style.textContent = css;
    document.head.appendChild(style);
  }

  window.Theme = { palette, severity, cycleLabel, ratioColor, quarterLabel };
})();

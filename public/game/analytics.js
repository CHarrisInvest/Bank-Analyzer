// Analytics bridge — the game runs in an iframe with no GA4 of its own, so it
// posts gameplay events up to the BankSift page (GamePlay.jsx), which checks
// consent and forwards them to GA4. Standalone (no parent), calls are no-ops.
(function () {
  const embedded = window.parent && window.parent !== window;
  const ACTIVE_WINDOW_MS = 60_000;
  let lastInput = Date.now();
  let activeMinutes = 0;

  function track(event, params) {
    if (!embedded) return;
    try {
      window.parent.postMessage({ source: "bankceo", event, params: params || {} }, window.location.origin);
    } catch (e) { /* analytics must never break the game */ }
  }

  // Active-play heartbeat: one event per minute the tab is visible and the
  // player has touched the game within the last minute. Clicks inside the
  // iframe blur the parent window, so GA4's own engagement timer undercounts.
  ["pointerdown", "keydown", "wheel", "touchstart"].forEach((type) =>
    window.addEventListener(type, () => { lastInput = Date.now(); }, { passive: true, capture: true })
  );
  setInterval(() => {
    if (document.visibilityState !== "visible") return;
    if (Date.now() - lastInput > ACTIVE_WINDOW_MS) return;
    activeMinutes += 1;
    track("game_active", { active_minutes: activeMinutes });
  }, ACTIVE_WINDOW_MS);

  window.GameAnalytics = { track };
})();

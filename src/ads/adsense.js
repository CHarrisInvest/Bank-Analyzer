/**
 * Ads. The AdSense (Auto ads) and Infolinks scripts ship in index.html and in
 * every pre-rendered page except the ad-free ones (see isAdFreePath);
 * the BankCEO play page (/game/BankCEO) also places its own banner unit.
 * Kept free of imports so the pure helpers can be unit tested under plain Node.
 */

export const ADSENSE_CLIENT = 'ca-pub-1929910138338917';

// Infolinks publisher / website ids (mirrors the tag in index.html).
export const INFOLINKS_PID = 3449468;
export const INFOLINKS_WSID = 0;

// Pages that must not carry ad code: bank pages (data tables without
// editorial content), plus any single route listed here, such as a
// placeholder page that has no content yet.
const AD_FREE_PATHS = new Set();

/**
 * Whether a route must not load any ad code
 * @param {string} pathname - route path, e.g. "/bank/JPM"
 * @returns {boolean}
 */
export function isAdFreePath(pathname) {
  const path = (pathname || '/').replace(/\/+$/, '') || '/';
  return path === '/bank' || path.startsWith('/bank/') || AD_FREE_PATHS.has(path);
}

/**
 * Remove the ad tags (between ads:start / ads:end markers) from page HTML
 * @param {string} html
 * @returns {string}
 */
export function stripAdTags(html) {
  return html.replace(/[ \t]*<!-- ads:start -->[\s\S]*?<!-- ads:end -->\n?/g, '');
}

// "BankCEO Banner" responsive display ad unit (data-ad-slot).
export const GAME_AD_SLOT = '1644843402';

// Banner-height strips for the responsive unit. AdSense fills each with any ad
// that fits (e.g. 320x50 or 300x50 on phones; 728x90 or 468x60 on wider
// screens) but can't grow past them. width null = full width of the strip.
export const BANNER_SIZES = {
  mobile: { width: null, height: 50 },
  desktop: { width: 728, height: 90 },
};

/**
 * Pick the banner size for a viewport width
 * @param {number} viewportWidth
 * @returns {'mobile' | 'desktop'}
 */
export function bannerSizeFor(viewportWidth) {
  return viewportWidth >= BANNER_SIZES.desktop.width + 32 ? 'desktop' : 'mobile';
}

// Game events that load a fresh ad. The banner is always shown on the play
// page, and each page load (opening the game, or refreshing) gets its own ad.
const AD_REFRESH_EVENTS = new Set([
  'game_over',    // end screen reached, success or failure
  'game_restart', // next game or new game
]);

/**
 * Whether a game event should load a fresh ad
 * @param {string} eventName - sanitized BankCEO event name
 * @returns {boolean}
 */
export function refreshesAd(eventName) {
  return AD_REFRESH_EVENTS.has(eventName);
}

/**
 * Whether to force non-personalized ads. A visitor who actively turned
 * advertising off in the BankSift cookie banner, or whose browser sends a
 * Global Privacy Control signal, is forced; otherwise Google's consent
 * message (EEA/UK) or the default (elsewhere) decides.
 * @param {{ status: string, advertising: boolean }} consent - stored BankSift consent
 * @param {boolean} [gpc] - navigator.globalPrivacyControl
 * @returns {boolean}
 */
export function forceNonPersonalizedAds(consent, gpc = false) {
  if (gpc === true) return true;
  return Boolean(consent) && consent.status !== 'pending' && !consent.advertising;
}

/**
 * Inject the AdSense loader if index.html's site-wide tag is missing
 */
export function loadAdSense() {
  if (document.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]')) return;
  const script = document.createElement('script');
  script.async = true;
  script.crossOrigin = 'anonymous';
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
  document.head.appendChild(script);
}

/**
 * Whether ad scripts are present in the current document
 * @returns {boolean}
 */
export function adScriptsLoaded() {
  return Boolean(document.querySelector(
    'script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"], script[src*="resources.infolinks.com"]'
  ));
}

/**
 * Inject the site-wide ad scripts into a document that was served without
 * them (the visitor landed on an ad-free page, then moved to a regular one).
 */
export function loadSiteAds() {
  const adsbygoogle = (window.adsbygoogle = window.adsbygoogle || []);
  let consent = null;
  try {
    consent = JSON.parse(localStorage.getItem('banksift_cookieConsent'));
  } catch (e) {
    // unreadable consent: leave the default
  }
  if (forceNonPersonalizedAds(consent, navigator.globalPrivacyControl)) {
    adsbygoogle.requestNonPersonalizedAds = 1;
  }
  loadAdSense();

  if (!document.querySelector('script[src*="resources.infolinks.com"]')) {
    window.infolinks_pid = INFOLINKS_PID;
    window.infolinks_wsid = INFOLINKS_WSID;
    const script = document.createElement('script');
    script.src = 'https://resources.infolinks.com/js/infolinks_main.js';
    document.body.appendChild(script);
  }
}

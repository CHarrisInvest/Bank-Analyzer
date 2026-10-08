/**
 * Google AdSense. The loader script ships site-wide in index.html (Auto ads);
 * the BankCEO play page (/game/BankCEO) also places its own banner unit.
 * Kept free of imports so the pure helpers can be unit tested under plain Node.
 */

export const ADSENSE_CLIENT = 'ca-pub-1929910138338917';

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
 * Whether to force non-personalized ads. Only a visitor who actively turned
 * advertising off in the BankSift cookie banner is forced; otherwise Google's
 * consent message (EEA/UK) or the default (elsewhere) decides.
 * @param {{ status: string, advertising: boolean }} consent - stored BankSift consent
 * @returns {boolean}
 */
export function forceNonPersonalizedAds(consent) {
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

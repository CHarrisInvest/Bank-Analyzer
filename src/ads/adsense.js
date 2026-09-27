/**
 * Google AdSense — used only on the BankCEO play page (/game/BankCEO).
 * The loader script is injected on demand, so no other page loads AdSense.
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
 * Inject the AdSense loader once
 */
export function loadAdSense() {
  if (document.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]')) return;
  const script = document.createElement('script');
  script.async = true;
  script.crossOrigin = 'anonymous';
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
  document.head.appendChild(script);
}

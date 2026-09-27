/**
 * Google AdSense — used only on the BankCEO play page (/game/BankCEO).
 * The loader script is injected on demand, so no other page loads AdSense.
 * Kept free of imports so the pure helpers can be unit tested under plain Node.
 */

export const ADSENSE_CLIENT = 'ca-pub-1929910138338917';

// Display ad unit ID (data-ad-slot) for the in-game banner. Create a display
// ad unit in AdSense and set VITE_ADSENSE_GAME_SLOT; without it no ad renders.
export const GAME_AD_SLOT = import.meta.env?.VITE_ADSENSE_GAME_SLOT || '';

// Fixed IAB banner sizes: mobile leaderboard on phones, leaderboard on wider screens.
export const BANNER_SIZES = {
  mobile: { width: 320, height: 50 },
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

// A fresh ad loads after this many advanced quarters (one in-game year).
export const QUARTERS_PER_REFRESH = 4;

/**
 * Track quarters since the last fresh ad and decide whether a game event
 * should load a new one. The banner is always shown on the play page; a
 * fresh ad loads every QUARTERS_PER_REFRESH advanced quarters, when the end
 * screen is reached (success or failure), and when a new game is started.
 * @param {number} quarters - advanced quarters since the last fresh ad
 * @param {string} eventName - sanitized BankCEO event name
 * @returns {{ quarters: number, refresh: boolean }}
 */
export function nextAdRefresh(quarters, eventName) {
  switch (eventName) {
    case 'quarter_advanced': {
      const n = quarters + 1;
      return n >= QUARTERS_PER_REFRESH ? { quarters: 0, refresh: true } : { quarters: n, refresh: false };
    }
    case 'game_over':
    case 'game_restart':
      return { quarters: 0, refresh: true };
    default:
      return { quarters, refresh: false };
  }
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

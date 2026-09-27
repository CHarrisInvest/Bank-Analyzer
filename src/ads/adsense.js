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

/**
 * Whether the banner should show after a game event. Ads show only while a
 * game is in progress: from the player's first advanced quarter until the
 * game ends or is restarted (the next advanced quarter shows it again).
 * @param {boolean} playing - current state
 * @param {string} eventName - sanitized BankCEO event name
 * @returns {boolean}
 */
export function nextPlayingState(playing, eventName) {
  switch (eventName) {
    case 'quarter_advanced':
      return true;
    case 'game_over':
    case 'game_restart':
      return false;
    default:
      return playing;
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

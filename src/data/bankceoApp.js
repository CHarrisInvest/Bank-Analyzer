/**
 * Head tags that make /game/BankCEO installable as its own home-screen app
 * (separate from the site-wide BankSift manifest). Used by the prerendered
 * /game/BankCEO HTML (scripts/prerender.mjs) and by GamePlay at runtime, for
 * visitors who reach the page by client-side navigation from /game.
 */
export const BANKCEO_APP_HEAD = {
  manifest: '/game/bankceo.webmanifest',
  appleTouchIcon: '/game/icons/apple-touch-icon.png',
  themeColor: '#0d1218',
  meta: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-title': 'BankCEO',
    'apple-mobile-web-app-status-bar-style': 'black',
  },
};

// The site-wide values in index.html, restored when leaving the game.
const SITE_HEAD = {
  manifest: '/manifest.json',
  appleTouchIcon: '/apple-touch-icon.png',
  themeColor: '#1a365d',
};

function setHead(doc, { manifest, appleTouchIcon, themeColor }) {
  doc.head.querySelector('link[rel="manifest"]')?.setAttribute('href', manifest);
  doc.head.querySelector('link[rel="apple-touch-icon"]')?.setAttribute('href', appleTouchIcon);
  doc.head.querySelector('meta[name="theme-color"]')?.setAttribute('content', themeColor);
}

/**
 * Point the live document head at the BankCEO app. Returns a function that
 * restores the site-wide BankSift tags.
 */
export function applyBankCEOAppHead(doc = document) {
  setHead(doc, BANKCEO_APP_HEAD);
  for (const [name, content] of Object.entries(BANKCEO_APP_HEAD.meta)) {
    if (doc.head.querySelector(`meta[name="${name}"]`)) continue; // prerendered
    const el = doc.createElement('meta');
    el.setAttribute('name', name);
    el.setAttribute('content', content);
    doc.head.appendChild(el);
  }

  return () => {
    setHead(doc, SITE_HEAD);
    for (const name of Object.keys(BANKCEO_APP_HEAD.meta)) {
      doc.head.querySelector(`meta[name="${name}"]`)?.remove();
    }
  };
}

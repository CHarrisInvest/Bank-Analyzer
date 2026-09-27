import React, { useEffect, useRef } from 'react';
import { ADSENSE_CLIENT, GAME_AD_SLOT, BANNER_SIZES, loadAdSense, forceNonPersonalizedAds } from '../ads/adsense.js';
import { getStoredConsent } from '../analytics/consent.js';

/**
 * AdSense banner for the BankCEO play page. The unit is responsive, but its
 * size is pinned per screen width (no data-ad-format / full-width-responsive),
 * so AdSense picks any ad that fits the strip and never a tall one.
 * Each mount requests one ad; the parent remounts it (via key) to request a
 * fresh one, e.g. for a new game or a different banner size.
 *
 * @param {'mobile' | 'desktop'} size
 */
function GameAdBanner({ size }) {
  const insRef = useRef(null);
  const pushedRef = useRef(false);
  const { width, height } = BANNER_SIZES[size];

  useEffect(() => {
    const ins = insRef.current;
    // One push per <ins>: StrictMode re-runs effects, and before the AdSense
    // script loads nothing marks the <ins> as filled.
    if (!ins || pushedRef.current || ins.getAttribute('data-adsbygoogle-status')) return;
    pushedRef.current = true;

    // Honor an explicit opt-out from the BankSift cookie banner; otherwise
    // leave it to Google's consent message (EEA/UK) or the default.
    const adsbygoogle = (window.adsbygoogle = window.adsbygoogle || []);
    adsbygoogle.requestNonPersonalizedAds = forceNonPersonalizedAds(getStoredConsent()) ? 1 : 0;

    loadAdSense();
    try {
      adsbygoogle.push({});
    } catch (e) {
      // An ad failing to load must never break the game.
    }
  }, []);

  return (
    <ins
      ref={insRef}
      className="adsbygoogle"
      style={{ display: 'block', width: width ? `${width}px` : '100%', height: `${height}px` }}
      data-ad-client={ADSENSE_CLIENT}
      data-ad-slot={GAME_AD_SLOT}
      {...(import.meta.env.DEV ? { 'data-adtest': 'on' } : {})}
    />
  );
}

export default GameAdBanner;

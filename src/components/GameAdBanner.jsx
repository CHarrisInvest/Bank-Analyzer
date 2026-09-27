import React, { useEffect, useRef } from 'react';
import { ADSENSE_CLIENT, GAME_AD_SLOT, BANNER_SIZES, loadAdSense } from '../ads/adsense.js';
import { getStoredConsent } from '../analytics/consent.js';

/**
 * Fixed-size AdSense banner for the BankCEO play page.
 * Each mount requests one ad; the parent remounts it (via key) to request a
 * fresh one, e.g. for a new game or a different banner size.
 *
 * @param {'mobile' | 'desktop'} size
 */
function GameAdBanner({ size }) {
  const insRef = useRef(null);
  const { width, height } = BANNER_SIZES[size];

  useEffect(() => {
    const ins = insRef.current;
    // Guard against a second push for the same <ins> (e.g. StrictMode re-run).
    if (!ins || ins.getAttribute('data-adsbygoogle-status')) return;

    // Serve non-personalized ads unless the visitor opted in to advertising cookies.
    const adsbygoogle = (window.adsbygoogle = window.adsbygoogle || []);
    adsbygoogle.requestNonPersonalizedAds = getStoredConsent().advertising ? 0 : 1;

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
      style={{ display: 'inline-block', width: `${width}px`, height: `${height}px` }}
      data-ad-client={ADSENSE_CLIENT}
      data-ad-slot={GAME_AD_SLOT}
      {...(import.meta.env.DEV ? { 'data-adtest': 'on' } : {})}
    />
  );
}

export default GameAdBanner;

/**
 * Google Analytics 4 Initialization Module
 * Implements GA4 with Consent Mode v2 for GDPR/CCPA compliance
 */

import { getStoredConsent, updateGoogleConsent } from './consent.js';

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

/**
 * Check if GA4 is configured
 */
export function isGA4Configured() {
  return Boolean(GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX');
}

/**
 * Load the gtag.js script from Google
 */
function loadGtagScript() {
  return new Promise((resolve, reject) => {
    // Check if already loaded
    if (document.querySelector('script[src*="googletagmanager.com/gtag"]')) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.onload = resolve;
    script.onerror = () => reject(new Error('Failed to load gtag.js'));
    document.head.appendChild(script);
  });
}

/**
 * Initialize Google Analytics 4 with Consent Mode v2
 * Must be called early in app lifecycle
 */
export function initializeGA4() {
  if (!isGA4Configured()) {
    console.info('GA4: Measurement ID not configured, analytics disabled');
    return false;
  }

  // Prevent double initialization
  if (window.GA4_INITIALIZED) {
    return true;
  }

  try {
    // Initialize dataLayer and gtag function first (before script loads)
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };

    // Set default consent BEFORE loading the script (privacy first)
    window.gtag('consent', 'default', {
      'analytics_storage': 'denied',
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'functionality_storage': 'granted',
      'security_storage': 'granted',
      'wait_for_update': 500, // Wait up to 500ms for consent update
    });

    // Apply stored consent if user already made a decision
    const storedConsent = getStoredConsent();
    if (storedConsent.status !== 'pending') {
      updateGoogleConsent(storedConsent);
    }

    // Load the gtag.js script asynchronously
    loadGtagScript().then(() => {
      // Initialize GA4 after script loads
      window.gtag('js', new Date());
      window.gtag('config', GA_MEASUREMENT_ID, {
        // Privacy-focused settings
        'anonymize_ip': true,           // IP anonymization (default in GA4, but explicit)
        'allow_google_signals': false,   // Disable cross-device tracking
        'allow_ad_personalization_signals': false, // Disable until consent

        // SPA configuration
        'send_page_view': false,        // We'll send manually for SPA routing

        // Data retention (set in GA4 console, but document here)
        // Recommended: 2 months for privacy
      });

      console.info('GA4: Initialized with Measurement ID:', GA_MEASUREMENT_ID);
    }).catch(error => {
      console.warn('GA4: Script load failed:', error.message);
    });

    window.GA4_INITIALIZED = true;
    return true;
  } catch (error) {
    console.error('GA4: Initialization failed:', error);
    return false;
  }
}

/**
 * Send page view event (for SPA navigation)
 */
export function sendPageView(path, title) {
  if (!isGA4Configured() || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title || document.title,
    page_location: window.location.href,
  });
}

/**
 * Send custom event
 */
export function sendEvent(eventName, parameters = {}) {
  if (!isGA4Configured() || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', eventName, parameters);
}

/**
 * Get the GA4 Measurement ID (for script tag)
 */
export function getMeasurementId() {
  return GA_MEASUREMENT_ID;
}

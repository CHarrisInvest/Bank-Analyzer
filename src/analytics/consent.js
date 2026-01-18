/**
 * Consent Management Module
 * Handles user consent state for analytics and advertising
 * Implements Google Consent Mode v2
 */

const CONSENT_STORAGE_KEY = 'bankAnalyzer_cookieConsent';

/**
 * Consent state options
 */
export const CONSENT_STATUS = {
  PENDING: 'pending',      // User hasn't made a choice
  ACCEPTED: 'accepted',    // User accepted all cookies
  REJECTED: 'rejected',    // User rejected non-essential cookies
  CUSTOM: 'custom',        // User made custom selections
};

/**
 * Default consent state (privacy-first: denied until user accepts)
 */
const DEFAULT_CONSENT = {
  status: CONSENT_STATUS.PENDING,
  analytics: false,
  advertising: false,
  functionality: true,     // Always allowed (essential)
  timestamp: null,
};

/**
 * Get stored consent from localStorage
 */
export function getStoredConsent() {
  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Validate structure
      if (parsed && typeof parsed.status === 'string') {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Failed to read consent from storage:', e);
  }
  return DEFAULT_CONSENT;
}

/**
 * Save consent to localStorage
 */
export function saveConsent(consent) {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify({
      ...consent,
      timestamp: new Date().toISOString(),
    }));
  } catch (e) {
    console.warn('Failed to save consent to storage:', e);
  }
}

/**
 * Update Google Consent Mode with current consent state
 * This is called both on initial load and when user changes preferences
 */
export function updateGoogleConsent(consent) {
  if (typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('consent', 'update', {
    'analytics_storage': consent.analytics ? 'granted' : 'denied',
    'ad_storage': consent.advertising ? 'granted' : 'denied',
    'ad_user_data': consent.advertising ? 'granted' : 'denied',
    'ad_personalization': consent.advertising ? 'granted' : 'denied',
    'functionality_storage': 'granted', // Always allowed
    'security_storage': 'granted',      // Always allowed
  });
}

/**
 * Accept all cookies
 */
export function acceptAllCookies() {
  const consent = {
    status: CONSENT_STATUS.ACCEPTED,
    analytics: true,
    advertising: true,
    functionality: true,
    timestamp: new Date().toISOString(),
  };
  saveConsent(consent);
  updateGoogleConsent(consent);
  return consent;
}

/**
 * Reject non-essential cookies (privacy-focused)
 */
export function rejectNonEssential() {
  const consent = {
    status: CONSENT_STATUS.REJECTED,
    analytics: false,
    advertising: false,
    functionality: true,
    timestamp: new Date().toISOString(),
  };
  saveConsent(consent);
  updateGoogleConsent(consent);
  return consent;
}

/**
 * Set custom consent preferences
 */
export function setCustomConsent(analytics, advertising) {
  const consent = {
    status: CONSENT_STATUS.CUSTOM,
    analytics: Boolean(analytics),
    advertising: Boolean(advertising),
    functionality: true,
    timestamp: new Date().toISOString(),
  };
  saveConsent(consent);
  updateGoogleConsent(consent);
  return consent;
}

/**
 * Check if user has made a consent decision
 */
export function hasConsentDecision() {
  const consent = getStoredConsent();
  return consent.status !== CONSENT_STATUS.PENDING;
}

/**
 * Check if analytics is allowed
 */
export function isAnalyticsAllowed() {
  const consent = getStoredConsent();
  return consent.analytics === true;
}

/**
 * Check if advertising is allowed
 */
export function isAdvertisingAllowed() {
  const consent = getStoredConsent();
  return consent.advertising === true;
}

/**
 * Clear consent (for testing or user request)
 */
export function clearConsent() {
  try {
    localStorage.removeItem(CONSENT_STORAGE_KEY);
  } catch (e) {
    console.warn('Failed to clear consent:', e);
  }
}

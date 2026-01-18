import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getStoredConsent,
  hasConsentDecision,
  acceptAllCookies,
  rejectNonEssential,
  setCustomConsent,
  CONSENT_STATUS,
} from '../analytics/consent.js';

/**
 * Cookie Consent Banner Component
 * Implements GDPR/CCPA compliant consent with Google Consent Mode v2
 */
function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    analytics: false,
    advertising: false,
  });

  useEffect(() => {
    // Check if user has already made a consent decision
    if (!hasConsentDecision()) {
      // Small delay to prevent flash on initial load
      const timer = setTimeout(() => setVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    acceptAllCookies();
    setVisible(false);
  };

  const handleRejectAll = () => {
    rejectNonEssential();
    setVisible(false);
  };

  const handleSavePreferences = () => {
    setCustomConsent(preferences.analytics, preferences.advertising);
    setVisible(false);
    setShowPreferences(false);
  };

  const handleTogglePreferences = () => {
    setShowPreferences(!showPreferences);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="cookie-consent-overlay">
      <div className="cookie-consent-banner" role="dialog" aria-labelledby="cookie-title" aria-describedby="cookie-description">
        <div className="cookie-consent-content">
          <h2 id="cookie-title">Cookie Preferences</h2>
          <p id="cookie-description">
            We use cookies to improve your experience, analyze site traffic, and for advertising purposes. 
            You can choose which cookies to allow. Essential cookies are always active as they are necessary 
            for the site to function.{' '}
            <Link to="/privacy" onClick={() => setVisible(false)}>Learn more in our Privacy Policy</Link>.
          </p>

          {showPreferences ? (
            <div className="cookie-preferences">
              <div className="cookie-preference-item">
                <div className="cookie-preference-info">
                  <strong>Essential Cookies</strong>
                  <p>Required for the website to function. Cannot be disabled.</p>
                </div>
                <div className="cookie-preference-toggle">
                  <input 
                    type="checkbox" 
                    checked={true} 
                    disabled 
                    aria-label="Essential cookies (always enabled)"
                  />
                  <span className="toggle-label">Always On</span>
                </div>
              </div>

              <div className="cookie-preference-item">
                <div className="cookie-preference-info">
                  <strong>Analytics Cookies</strong>
                  <p>Help us understand how visitors interact with our website by collecting anonymous information.</p>
                </div>
                <div className="cookie-preference-toggle">
                  <input 
                    type="checkbox" 
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences(prev => ({ ...prev, analytics: e.target.checked }))}
                    aria-label="Enable analytics cookies"
                  />
                </div>
              </div>

              <div className="cookie-preference-item">
                <div className="cookie-preference-info">
                  <strong>Advertising Cookies</strong>
                  <p>Used to deliver relevant ads and measure their effectiveness. Required for personalized advertising.</p>
                </div>
                <div className="cookie-preference-toggle">
                  <input 
                    type="checkbox" 
                    checked={preferences.advertising}
                    onChange={(e) => setPreferences(prev => ({ ...prev, advertising: e.target.checked }))}
                    aria-label="Enable advertising cookies"
                  />
                </div>
              </div>

              <div className="cookie-buttons">
                <button 
                  className="cookie-btn cookie-btn-secondary" 
                  onClick={handleTogglePreferences}
                >
                  Back
                </button>
                <button 
                  className="cookie-btn cookie-btn-primary" 
                  onClick={handleSavePreferences}
                >
                  Save Preferences
                </button>
              </div>
            </div>
          ) : (
            <div className="cookie-buttons">
              <button 
                className="cookie-btn cookie-btn-secondary" 
                onClick={handleTogglePreferences}
              >
                Customize
              </button>
              <button 
                className="cookie-btn cookie-btn-secondary" 
                onClick={handleRejectAll}
              >
                Reject All
              </button>
              <button 
                className="cookie-btn cookie-btn-primary" 
                onClick={handleAcceptAll}
              >
                Accept All
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CookieConsent;

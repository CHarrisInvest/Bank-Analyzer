import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Privacy Policy Page
 * GDPR/CCPA compliant privacy policy with clear disclosures
 */
function Privacy() {
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || '[Contact email not configured]';
  const lastUpdated = 'January 2026';

  return (
    <div className="page legal-page privacy-page">
      <div className="page-header">
        <h1>Privacy Policy</h1>
        <p className="last-updated">Last updated: {lastUpdated}</p>
      </div>

      <div className="legal-content">
        <section className="legal-section">
          <h2>Introduction</h2>
          <p>
            BankSift ("we," "our," or "us") respects your privacy and is committed
            to protecting your personal data. This privacy policy explains how we collect,
            use, and protect information when you use our website and services.
          </p>
          <p>
            By using BankSift, you agree to the collection and use of information
            in accordance with this policy.
          </p>
        </section>

        <section className="legal-section">
          <h2>Information We Collect</h2>

          <h3>Information Collected Automatically</h3>
          <p>When you visit our website, we may automatically collect:</p>
          <ul>
            <li>
              <strong>Usage Data:</strong> Pages visited, time spent on pages, click patterns,
              and navigation paths
            </li>
            <li>
              <strong>Device Information:</strong> Browser type, operating system, device type,
              and screen resolution
            </li>
            <li>
              <strong>Location Data:</strong> Country-level geographic information based on
              IP address (we do not collect precise location)
            </li>
            <li>
              <strong>Referral Information:</strong> How you arrived at our site (search engine,
              direct link, etc.)
            </li>
          </ul>

          <h3>Information You Provide</h3>
          <p>
            BankSift does not currently require user registration or collect personal
            information such as names, email addresses, or financial data directly from users.
          </p>
        </section>

        <section className="legal-section">
          <h2>How We Use Your Information</h2>
          <p>We use the collected information for:</p>
          <ul>
            <li>Improving and optimizing our website and services</li>
            <li>Understanding how users interact with our tools</li>
            <li>Analyzing usage patterns to enhance user experience</li>
            <li>Ensuring the security and proper functioning of our services</li>
            <li>Supporting advertising that helps keep our service free</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar tracking technologies to collect and track information
            about your activity on our website.
          </p>

          <h3>Types of Cookies We Use</h3>
          <table className="cookie-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Purpose</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Essential</strong></td>
                <td>Required for basic website functionality, such as remembering your preferences</td>
                <td>Session / 1 year</td>
              </tr>
              <tr>
                <td><strong>Analytics</strong></td>
                <td>Help us understand how visitors use our site through anonymous statistics</td>
                <td>Up to 2 years</td>
              </tr>
              <tr>
                <td><strong>Advertising</strong></td>
                <td>Used to deliver relevant advertisements and measure their effectiveness</td>
                <td>Up to 2 years</td>
              </tr>
            </tbody>
          </table>

          <h3>Managing Cookies</h3>
          <p>
            When you first visit our site, you will be presented with a cookie consent banner
            that allows you to choose which types of cookies to accept. You can change your
            preferences at any time by clearing your browser cookies and revisiting the site.
          </p>
          <p>
            Most web browsers allow you to control cookies through their settings. Note that
            disabling certain cookies may affect the functionality of our website.
          </p>
        </section>

        <section className="legal-section">
          <h2>Third-Party Services</h2>
          <p>We use the following third-party services that may collect information:</p>

          <h3>Google Analytics</h3>
          <p>
            We use Google Analytics 4 to analyze website traffic and user behavior. Google
            Analytics uses cookies to collect anonymous information about how visitors use
            our site. This information is transmitted to and stored by Google.
          </p>
          <p>
            We have configured Google Analytics with the following privacy settings:
          </p>
          <ul>
            <li>IP anonymization is enabled</li>
            <li>Data retention is set to the minimum period (2 months)</li>
            <li>Google Signals (cross-device tracking) is disabled</li>
            <li>Advertising personalization signals are disabled by default until consent</li>
          </ul>
          <p>
            For more information, see{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              Google's Privacy Policy
            </a>.
          </p>

          {/* [CUSTOMIZE] Add this section when you implement AdSense */}
          <h3>Advertising Services (Future)</h3>
          <p>
            We may display advertisements on our website through advertising networks.
            These services may use cookies to serve ads based on your interests.
            When advertising is implemented, this section will be updated with specific
            details about the advertising partners and how to opt out.
          </p>
        </section>

        <section className="legal-section">
          <h2>Data Retention</h2>
          <p>
            We retain analytics data for a maximum of 2 months. Cookie consent preferences
            are stored locally in your browser until you clear them.
          </p>
        </section>

        <section className="legal-section">
          <h2>Your Rights</h2>
          <p>Depending on your location, you may have the following rights:</p>

          <h3>For All Users</h3>
          <ul>
            <li>Choose which cookies to accept via our consent banner</li>
            <li>Clear cookies from your browser at any time</li>
            <li>Use browser "Do Not Track" settings</li>
          </ul>

          <h3>For European Union Residents (GDPR)</h3>
          <ul>
            <li>Right to access your personal data</li>
            <li>Right to rectification of inaccurate data</li>
            <li>Right to erasure ("right to be forgotten")</li>
            <li>Right to restrict processing</li>
            <li>Right to data portability</li>
            <li>Right to object to processing</li>
          </ul>

          <h3>For California Residents (CCPA)</h3>
          <ul>
            <li>Right to know what personal information is collected</li>
            <li>Right to know if personal information is sold or disclosed</li>
            <li>Right to say no to the sale of personal information</li>
            <li>Right to equal service and price (non-discrimination)</li>
          </ul>

          <h3>For Virginia Residents (VCDPA)</h3>
          <ul>
            <li>Right to confirm whether personal data is being processed</li>
            <li>Right to access and obtain a copy of personal data</li>
            <li>Right to correct inaccuracies</li>
            <li>Right to delete personal data</li>
            <li>Right to opt out of targeted advertising</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Children's Privacy</h2>
          <p>
            Our website is not intended for children under 13 years of age. We do not
            knowingly collect personal information from children. If you believe we have
            collected information from a child, please contact us immediately.
          </p>
        </section>

        <section className="legal-section">
          <h2>Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect
            the information we collect. However, no method of transmission over the
            Internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="legal-section">
          <h2>International Data Transfers</h2>
          <p>
            Your information may be transferred to and processed in countries other than
            your own, including the United States where our third-party service providers
            (such as Google) are located. These countries may have different data protection
            laws than your country.
          </p>
        </section>

        <section className="legal-section">
          <h2>Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. We will notify you of any
            changes by posting the new policy on this page and updating the "Last updated"
            date. We encourage you to review this policy periodically.
          </p>
        </section>

        <section className="legal-section">
          <h2>Contact Us</h2>
          <p>
            If you have any questions about this privacy policy or our data practices,
            please contact us at:
          </p>
          <p className="contact-email">
            <strong>Email:</strong> {contactEmail}
          </p>
        </section>
      </div>

      <div className="legal-footer">
        <Link to="/terms">Terms of Service</Link>
        <Link to="/">Return to Home</Link>
      </div>
    </div>
  );
}

export default Privacy;

import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';

/**
 * Terms of Service Page
 */
function Terms() {
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || '[Contact email not configured]';
  const lastUpdated = 'January 2026';

  return (
    <div className="page legal-page terms-page">
      <SEO
        title="Terms of Service"
        description="BankSift terms of service and usage conditions."
        canonical="/terms"
      />
      <div className="page-header">
        <h1>Terms of Service</h1>
        <p className="last-updated">Last updated: {lastUpdated}</p>
      </div>

      <div className="legal-content">
        <section className="legal-section">
          <h2>Agreement to Terms</h2>
          <p>
            By accessing or using BankSift ("the Service"), you agree to be bound
            by these Terms of Service ("Terms"). If you do not agree to these Terms,
            please do not use the Service.
          </p>
        </section>

        <section className="legal-section">
          <h2>Description of Service</h2>
          <p>
            BankSift provides free tools for screening and analyzing publicly traded
            banks using financial data from SEC EDGAR filings. The Service includes:
          </p>
          <ul>
            <li>Bank search functionality</li>
            <li>Financial screening tools</li>
            <li>Bank profile pages with financial metrics</li>
            <li>Educational content about financial analysis</li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Not Investment Advice</h2>
          <p className="important-notice">
            <strong>IMPORTANT:</strong> The information provided by BankSift is for
            educational and informational purposes only. It should NOT be considered as
            investment advice, financial advice, trading advice, or any other type of advice.
          </p>
          <ul>
            <li>
              We do not recommend any specific securities, stocks, or investment strategies.
            </li>
            <li>
              The financial metrics, ratios, and valuations presented are calculations based
              on publicly available data and may contain errors or be outdated.
            </li>
            <li>
              Past performance does not guarantee future results.
            </li>
            <li>
              You should always conduct your own research and consider consulting with a
              qualified financial advisor before making any investment decisions.
            </li>
            <li>
              We are not responsible for any investment decisions you make based on
              information from our Service.
            </li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Data Accuracy</h2>
          <p>
            While we strive to provide accurate and up-to-date information:
          </p>
          <ul>
            <li>
              All data is sourced from SEC EDGAR filings and is subject to the accuracy
              of those original filings.
            </li>
            <li>
              Data processing and calculations may contain errors.
            </li>
            <li>
              Information may not reflect the most recent filings or market conditions.
            </li>
            <li>
              We make no warranties about the completeness, reliability, or accuracy of
              the information provided.
            </li>
            <li>
              Different banks may report financial data differently, which may affect
              comparability.
            </li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Acceptable Use</h2>
          <p>You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree NOT to:</p>
          <ul>
            <li>
              Use the Service in any way that violates applicable laws or regulations
            </li>
            <li>
              Attempt to gain unauthorized access to any part of the Service or its systems
            </li>
            <li>
              Use automated systems (bots, scrapers, etc.) to access the Service in a manner
              that exceeds reasonable use or places undue burden on our systems
            </li>
            <li>
              Redistribute, resell, or commercially exploit the data without permission
            </li>
            <li>
              Remove or alter any proprietary notices or labels
            </li>
            <li>
              Use the Service to transmit malware or other harmful code
            </li>
          </ul>
        </section>

        <section className="legal-section">
          <h2>Intellectual Property</h2>
          <p>
            The Service and its original content (excluding data sourced from SEC filings),
            features, and functionality are owned by BankSift and are protected by
            copyright, trademark, and other intellectual property laws.
          </p>
          <p>
            Financial data presented on this site is derived from public SEC filings and
            is in the public domain. Our calculations, analysis methodologies, and
            presentation format are proprietary.
          </p>
        </section>

        <section className="legal-section">
          <h2>Third-Party Links</h2>
          <p>
            Our Service may contain links to third-party websites or services that are
            not owned or controlled by BankSift. We have no control over and assume
            no responsibility for the content, privacy policies, or practices of any
            third-party sites or services.
          </p>
        </section>

        <section className="legal-section">
          <h2>Disclaimer of Warranties</h2>
          <p>
            THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF
            ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED
            WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
            NON-INFRINGEMENT.
          </p>
          <p>
            We do not warrant that the Service will be uninterrupted, secure, or error-free,
            that defects will be corrected, or that the Service is free of viruses or other
            harmful components.
          </p>
        </section>

        <section className="legal-section">
          <h2>Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, BANKSIFT SHALL NOT BE LIABLE
            FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
            INCLUDING BUT NOT LIMITED TO:
          </p>
          <ul>
            <li>Loss of profits, revenue, or data</li>
            <li>Financial losses from investment decisions</li>
            <li>Business interruption</li>
            <li>Cost of substitute services</li>
          </ul>
          <p>
            This limitation applies regardless of the legal theory on which the claim
            is based, even if we have been advised of the possibility of such damages.
          </p>
        </section>

        <section className="legal-section">
          <h2>Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless BankSift and its
            operators from and against any claims, liabilities, damages, losses, and
            expenses arising out of or in any way connected with your use of the Service
            or violation of these Terms.
          </p>
        </section>

        <section className="legal-section">
          <h2>Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. We will provide notice
            of significant changes by updating the "Last updated" date. Your continued use
            of the Service after changes constitutes acceptance of the modified Terms.
          </p>
        </section>

        <section className="legal-section">
          <h2>Termination</h2>
          <p>
            We reserve the right to terminate or suspend access to the Service immediately,
            without prior notice, for any reason, including breach of these Terms.
          </p>
        </section>

        <section className="legal-section">
          <h2>Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws
            of the United States, without regard to conflict of law principles.
          </p>
        </section>

        <section className="legal-section">
          <h2>Severability</h2>
          <p>
            If any provision of these Terms is found to be unenforceable or invalid,
            that provision shall be limited or eliminated to the minimum extent necessary,
            and the remaining provisions shall remain in full force and effect.
          </p>
        </section>

        <section className="legal-section">
          <h2>Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <p className="contact-email">
            <strong>Email:</strong> {contactEmail}
          </p>
        </section>
      </div>

      <div className="legal-footer">
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/">Return to Home</Link>
      </div>
    </div>
  );
}

export default Terms;

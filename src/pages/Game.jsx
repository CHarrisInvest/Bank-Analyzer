import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';

function Game() {
  return (
    <div className="page bs-game-landing">
      <SEO
        title="BankCEO Simulation Game | Run a Community Bank for 10 Years"
        description="Play BankCEO, a free interactive bank simulation game. Take the helm of First Meridian Bank, set lending and deposit strategy, manage capital, and steer through 40 quarters of economic cycles."
        canonical="/game"
      />

      <style>{`
        .bs-game-landing { max-width: 880px; margin: 0 auto; padding: 48px 24px 64px; }
        .bs-game-landing .bs-game-eyebrow {
          font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase;
          color: #c98c3b; font-weight: 600; margin: 0 0 14px;
        }
        .bs-game-landing h1 {
          font-size: 2.5rem; line-height: 1.1; margin: 0 0 16px; letter-spacing: -0.02em;
        }
        .bs-game-landing .bs-game-lede {
          font-size: 1.125rem; line-height: 1.55; color: #4a5568; margin: 0 0 32px;
        }
        .bs-game-landing .bs-game-cta {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 16px 28px; border-radius: 12px;
          background: linear-gradient(135deg, #f3b561 0%, #c98c3b 100%);
          color: #1a1408; font-weight: 700; font-size: 16px;
          text-decoration: none; letter-spacing: 0.04em; text-transform: uppercase;
          box-shadow: 0 6px 24px rgba(243,181,97,0.25);
          transition: transform 0.12s, box-shadow 0.2s;
        }
        .bs-game-landing .bs-game-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 28px rgba(243,181,97,0.35);
        }
        .bs-game-landing .bs-game-cta-arrow { font-size: 20px; line-height: 1; }
        .bs-game-landing .bs-game-meta {
          margin-top: 18px; font-size: 13px; color: #718096;
        }
        .bs-game-landing .bs-game-pillars {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px;
          margin-top: 48px;
        }
        .bs-game-landing .bs-game-pillar {
          padding: 18px 20px; border: 1px solid #e2e8f0; border-radius: 12px;
          background: #fafbfc;
        }
        .bs-game-landing .bs-game-pillar h3 {
          margin: 0 0 6px; font-size: 14px; font-weight: 600; color: #1a365d;
          letter-spacing: 0.02em;
        }
        .bs-game-landing .bs-game-pillar p {
          margin: 0; font-size: 13.5px; line-height: 1.5; color: #4a5568;
        }
        .bs-game-landing .bs-game-docs {
          margin-top: 40px; padding-top: 28px; border-top: 1px solid #e2e8f0;
          display: flex; flex-wrap: wrap; gap: 24px;
          font-size: 14px;
        }
        .bs-game-landing .bs-game-docs a {
          color: #c98c3b; text-decoration: none; font-weight: 500;
        }
        .bs-game-landing .bs-game-docs a:hover { text-decoration: underline; }
        @media (max-width: 640px) {
          .bs-game-landing { padding: 32px 16px 48px; }
          .bs-game-landing h1 { font-size: 1.875rem; }
          .bs-game-landing .bs-game-pillars { grid-template-columns: 1fr; }
          .bs-game-landing .bs-game-docs { gap: 14px; }
        }
      `}</style>

      <p className="bs-game-eyebrow">BankCEO · Simulation</p>
      <h1>Run a community bank for 10 years.</h1>
      <p className="bs-game-lede">
        Take the helm of First Meridian Bank, NA. Set loan and deposit strategy,
        manage capital and liquidity, and steer through 40 quarters of expansion,
        late cycle, recession, and recovery. Every decision moves the call report.
      </p>

      <Link to="/game/BankCEO" className="bs-game-cta">
        Play BankCEO <span className="bs-game-cta-arrow" aria-hidden="true">→</span>
      </Link>
      <div className="bs-game-meta">Free · No signup · Plays in your browser</div>

      <div className="bs-game-pillars">
        <div className="bs-game-pillar">
          <h3>Operate</h3>
          <p>Pull levers on loans, deposits, and securities. Watch NIM, ROA, and the efficiency ratio respond.</p>
        </div>
        <div className="bs-game-pillar">
          <h3>Allocate Capital</h3>
          <p>Dividends, buybacks, and funding mix. Keep CET1 healthy or face the regulator.</p>
        </div>
        <div className="bs-game-pillar">
          <h3>Survive the Cycle</h3>
          <p>Macro shifts every few quarters. Provision early, manage liquidity, and outlast the recession.</p>
        </div>
      </div>

      <div className="bs-game-docs">
        <Link to="/game/about">About BankCEO →</Link>
        <Link to="/game/how-to-play">How to Play →</Link>
        <Link to="/game/strategy-guide">Strategy Guide →</Link>
      </div>
    </div>
  );
}

export default Game;

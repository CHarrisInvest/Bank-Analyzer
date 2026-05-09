import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';

function GameStrategy() {
  return (
    <div className="page bs-game-doc">
      <SEO
        title="BankCEO Strategy Guide | Bank Simulation Game"
        description="BankCEO strategy guide — how to manage NIM, capital, and credit through the cycle."
        canonical="/game/strategy-guide"
      />

      <style>{`
        .bs-game-doc { max-width: 760px; margin: 0 auto; padding: 48px 24px 64px; }
        .bs-game-doc h1 { font-size: 2rem; margin: 0 0 16px; letter-spacing: -0.02em; }
        .bs-game-doc .bs-game-doc-eyebrow {
          font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase;
          color: #c98c3b; font-weight: 600; margin: 0 0 14px;
        }
        .bs-game-doc .bs-game-doc-stub {
          margin-top: 32px; padding: 24px; border: 1px dashed #cbd5e0;
          border-radius: 12px; background: #f7fafc;
          color: #4a5568; font-size: 14px;
        }
        .bs-game-doc .bs-game-doc-back {
          display: inline-block; margin-top: 24px; color: #c98c3b;
          text-decoration: none; font-weight: 500;
        }
        .bs-game-doc .bs-game-doc-back:hover { text-decoration: underline; }
      `}</style>

      <p className="bs-game-doc-eyebrow">BankCEO</p>
      <h1>Strategy Guide</h1>

      <div className="bs-game-doc-stub">Content coming soon.</div>

      <Link to="/game" className="bs-game-doc-back">← Back to Game</Link>
    </div>
  );
}

export default GameStrategy;

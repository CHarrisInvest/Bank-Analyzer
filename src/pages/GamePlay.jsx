import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';

const STRIP_H = 30;

function GamePlay() {
  return (
    <div className="bs-game-play">
      <SEO
        title="Play BankCEO | Bank Simulation Game"
        description="Play BankCEO — run First Meridian Bank for 40 quarters. Set strategy, manage capital, and survive the credit cycle."
        canonical="/game/BankCEO"
        noindex
      />

      <style>{`
        .bs-game-play {
          /* Fixed + inset:0 anchors all four edges to the visible viewport;
             the browser resizes it as mobile toolbars show/hide. No vh/dvh
             units (they over- or under-shoot the visible area on mobile). */
          position: fixed; inset: 0;
          background: #0d1218;
          overflow: hidden;
        }
        .bs-game-play .bs-game-strip {
          position: absolute; top: 0; left: 0; right: 0;
          height: ${STRIP_H}px;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 14px;
          background: #141b24;
          border-bottom: 1px solid #2a384e;
          color: #9aa7b8;
          font-family: 'Geist', system-ui, -apple-system, sans-serif;
          font-size: 12.5px;
          letter-spacing: 0.01em;
          user-select: none;
          z-index: 2;
          box-sizing: border-box;
        }
        .bs-game-play .bs-game-strip-back {
          color: #f3b561;
          text-decoration: none;
          font-weight: 500;
          padding: 4px 8px;
          border-radius: 6px;
          transition: background 0.12s;
        }
        .bs-game-play .bs-game-strip-back:hover { background: rgba(243,181,97,0.08); }
        .bs-game-play .bs-game-strip-right {
          display: flex; align-items: center; gap: 10px;
        }
        .bs-game-play .bs-game-strip-hint {
          color: #6b7888;
          font-size: 11.5px;
          font-style: italic;
          letter-spacing: 0.02em;
        }
        .bs-game-play .bs-game-strip-links {
          display: flex; align-items: center; gap: 4px;
        }
        .bs-game-play .bs-game-strip-links a {
          color: #9aa7b8;
          text-decoration: none;
          padding: 4px 10px;
          border-radius: 6px;
          transition: color 0.12s, background 0.12s;
        }
        .bs-game-play .bs-game-strip-links a:hover {
          color: #eef2f6;
          background: #1a2230;
        }
        .bs-game-play .bs-game-strip-sep {
          width: 1px; height: 14px; background: #2a384e;
        }
        .bs-game-play .bs-game-frame {
          position: absolute;
          top: ${STRIP_H}px; left: 0; right: 0;
          /* An iframe is a replaced element: with width/height auto it falls
             back to its intrinsic 300x150, and left/right/top/bottom won't
             stretch it. So set both dimensions explicitly — 100% width and a
             percentage height of the fixed parent (which tracks the visible
             viewport, no vh/dvh) — so it fills the area below the strip. */
          width: 100%;
          height: calc(100% - ${STRIP_H}px);
          border: 0;
          display: block;
          background: #0d1218;
        }
        .bs-game-play .bs-lbl-short { display: none; }
        @media (max-width: 560px) {
          /* Keep the whole strip on a single row by swapping to short labels. */
          .bs-game-play .bs-game-strip { padding: 0 8px; }
          .bs-game-play .bs-game-strip,
          .bs-game-play .bs-game-strip-right,
          .bs-game-play .bs-game-strip-links { flex-wrap: nowrap; white-space: nowrap; min-width: 0; }
          .bs-game-play .bs-game-strip-back { padding: 4px 6px; white-space: nowrap; }
          .bs-game-play .bs-game-strip-links { gap: 2px; }
          .bs-game-play .bs-game-strip-links a { padding: 4px 7px; font-size: 11px; white-space: nowrap; }
          .bs-game-play .bs-game-strip-hint { display: none; }
          .bs-game-play .bs-lbl-full { display: none; }
          .bs-game-play .bs-lbl-short { display: inline; }
        }
      `}</style>

      <div className="bs-game-strip">
        <Link to="/game" className="bs-game-strip-back">
          <span className="bs-lbl-full">← Back to BankSift</span>
          <span className="bs-lbl-short">← Back</span>
        </Link>
        <div className="bs-game-strip-right">
          <span className="bs-game-strip-hint">Open in new tab »</span>
          <div className="bs-game-strip-links">
            <a href="/game/about" target="_blank" rel="noopener noreferrer">
              <span className="bs-lbl-full">About BankCEO</span><span className="bs-lbl-short">About</span>
            </a>
            <span className="bs-game-strip-sep" />
            <a href="/game/how-to-play" target="_blank" rel="noopener noreferrer">
              <span className="bs-lbl-full">How to Play</span><span className="bs-lbl-short">How-to</span>
            </a>
            <span className="bs-game-strip-sep" />
            <a href="/game/strategy-guide" target="_blank" rel="noopener noreferrer">
              <span className="bs-lbl-full">Strategy Guide</span><span className="bs-lbl-short">Strategy</span>
            </a>
          </div>
        </div>
      </div>

      <iframe
        className="bs-game-frame"
        src="/game/play.html"
        title="BankCEO — bank simulation game"
        allow="fullscreen"
      />
    </div>
  );
}

export default GamePlay;

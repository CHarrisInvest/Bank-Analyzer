import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';

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
          width: 100%;
          background: #0d1218;
          display: flex;
          flex-direction: column;
        }
        .bs-game-play .bs-game-play-bar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 8px 16px;
          background: #141b24;
          border-bottom: 1px solid #2a384e;
          color: #9aa7b8;
          font-size: 12.5px;
        }
        .bs-game-play .bs-game-play-bar a {
          color: #f3b561; text-decoration: none; font-weight: 500;
        }
        .bs-game-play .bs-game-play-bar a:hover { text-decoration: underline; }
        .bs-game-play .bs-game-frame {
          width: 100%;
          height: calc(100vh - 110px);
          min-height: 640px;
          border: 0;
          display: block;
          background: #0d1218;
        }
        @media (max-width: 640px) {
          .bs-game-play .bs-game-frame { height: calc(100vh - 110px); min-height: 560px; }
        }
      `}</style>

      <div className="bs-game-play-bar">
        <Link to="/game">← Back to Game</Link>
        <a href="/game/BankCEO.html" target="_blank" rel="noopener noreferrer">
          Open in new tab ↗
        </a>
      </div>

      <iframe
        className="bs-game-frame"
        src="/game/BankCEO.html"
        title="BankCEO — bank simulation game"
        loading="lazy"
        allow="fullscreen"
      />
    </div>
  );
}

export default GamePlay;

import React from 'react';
import GameGuide from '../components/GameGuide.jsx';
import { GAME_GUIDES_BY_SLUG } from '../data/content/gameGuides.js';

function GameHowToPlay() {
  return <GameGuide guide={GAME_GUIDES_BY_SLUG['how-to-play']} />;
}

export default GameHowToPlay;

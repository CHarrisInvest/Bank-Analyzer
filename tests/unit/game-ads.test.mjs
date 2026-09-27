/**
 * BankCEO in-game banner: the banner stays up the whole time the game is
 * open, a fresh ad loads at the end screen and on a new game (never during
 * play), and the banner size follows the viewport.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { refreshesAd, bannerSizeFor } from '../../src/ads/adsense.js';

test('the end screen loads a fresh ad', () => {
  assert.equal(refreshesAd('game_over'), true);
});

test('starting the next or a new game loads a fresh ad', () => {
  assert.equal(refreshesAd('game_restart'), true);
});

test('gameplay never loads a fresh ad', () => {
  for (const name of ['game_start', 'quarter_advanced', 'game_tab_changed', 'coach_closed', 'game_active']) {
    assert.equal(refreshesAd(name), false, name);
  }
});

test('phones get the mobile banner, wide screens the leaderboard', () => {
  assert.equal(bannerSizeFor(390), 'mobile');
  assert.equal(bannerSizeFor(759), 'mobile');
  assert.equal(bannerSizeFor(760), 'desktop');
  assert.equal(bannerSizeFor(1440), 'desktop');
});

/**
 * BankCEO in-game banner: ads show only while a game is in progress, and the
 * banner size follows the viewport.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { nextPlayingState, bannerSizeFor } from '../../src/ads/adsense.js';

test('the banner appears once the player advances a quarter', () => {
  assert.equal(nextPlayingState(false, 'game_start'), false);
  assert.equal(nextPlayingState(false, 'quarter_advanced'), true);
});

test('the banner hides when the game ends or restarts', () => {
  assert.equal(nextPlayingState(true, 'game_over'), false);
  assert.equal(nextPlayingState(true, 'game_restart'), false);
});

test('other events leave the banner as it was', () => {
  for (const name of ['game_tab_changed', 'coach_closed', 'game_active']) {
    assert.equal(nextPlayingState(true, name), true);
    assert.equal(nextPlayingState(false, name), false);
  }
});

test('phones get the mobile banner, wide screens the leaderboard', () => {
  assert.equal(bannerSizeFor(390), 'mobile');
  assert.equal(bannerSizeFor(759), 'mobile');
  assert.equal(bannerSizeFor(760), 'desktop');
  assert.equal(bannerSizeFor(1440), 'desktop');
});

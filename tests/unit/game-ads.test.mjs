/**
 * BankCEO in-game banner: the banner stays up the whole time the game is
 * open, a fresh ad loads every 4 advanced quarters, at the end screen and on
 * restart, and the banner size follows the viewport.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { nextAdRefresh, bannerSizeFor, QUARTERS_PER_REFRESH } from '../../src/ads/adsense.js';

function run(events, quarters = 0) {
  const refreshes = [];
  for (const name of events) {
    const r = nextAdRefresh(quarters, name);
    quarters = r.quarters;
    if (r.refresh) refreshes.push(name);
  }
  return { quarters, refreshes };
}

test('a fresh ad loads every 4 advanced quarters', () => {
  assert.equal(QUARTERS_PER_REFRESH, 4);
  const { quarters, refreshes } = run(Array(9).fill('quarter_advanced'));
  assert.equal(refreshes.length, 2); // after quarters 4 and 8
  assert.equal(quarters, 1);
});

test('the end screen loads a fresh ad and restarts the quarter count', () => {
  assert.deepEqual(nextAdRefresh(2, 'game_over'), { quarters: 0, refresh: true });
});

test('restarting loads a fresh ad and restarts the quarter count', () => {
  assert.deepEqual(nextAdRefresh(3, 'game_restart'), { quarters: 0, refresh: true });
});

test('opening the game does not load a second ad on top of the first', () => {
  assert.deepEqual(nextAdRefresh(0, 'game_start'), { quarters: 0, refresh: false });
});

test('other events leave the ad and quarter count alone', () => {
  for (const name of ['game_tab_changed', 'coach_closed', 'game_active']) {
    assert.deepEqual(nextAdRefresh(2, name), { quarters: 2, refresh: false });
  }
});

test('phones get the mobile banner, wide screens the leaderboard', () => {
  assert.equal(bannerSizeFor(390), 'mobile');
  assert.equal(bannerSizeFor(759), 'mobile');
  assert.equal(bannerSizeFor(760), 'desktop');
  assert.equal(bannerSizeFor(1440), 'desktop');
});

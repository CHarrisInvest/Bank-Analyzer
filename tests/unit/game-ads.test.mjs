/**
 * BankCEO in-game banner: the bar only shows while an ad is being served, a
 * fresh ad is requested at the end screen and on a new game (never during
 * play), and the banner size follows the viewport.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { refreshesAd, bannerSizeFor, forceNonPersonalizedAds, isAdFreePath, stripAdTags, adIsServed } from '../../src/ads/adsense.js';

test('the banner counts as served only once AdSense reports a fill', () => {
  assert.equal(adIsServed('filled'), true);
  assert.equal(adIsServed('unfilled'), false);
  // Request still pending, or the AdSense script never ran (blocked).
  assert.equal(adIsServed(null), false);
  assert.equal(adIsServed(undefined), false);
  assert.equal(adIsServed(''), false);
});

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

test('only an explicit advertising opt-out forces non-personalized ads', () => {
  assert.equal(forceNonPersonalizedAds({ status: 'rejected', advertising: false }), true);
  assert.equal(forceNonPersonalizedAds({ status: 'custom', advertising: false }), true);
  assert.equal(forceNonPersonalizedAds({ status: 'custom', advertising: true }), false);
  assert.equal(forceNonPersonalizedAds({ status: 'accepted', advertising: true }), false);
  // Never saw or answered the banner: Google's consent message or the default decides.
  assert.equal(forceNonPersonalizedAds({ status: 'pending', advertising: false }), false);
});

test('a Global Privacy Control signal forces non-personalized ads', () => {
  assert.equal(forceNonPersonalizedAds({ status: 'pending', advertising: false }, true), true);
  assert.equal(forceNonPersonalizedAds({ status: 'accepted', advertising: true }, true), true);
  assert.equal(forceNonPersonalizedAds({ status: 'accepted', advertising: true }, undefined), false);
});

test('bank pages carry no ad code', () => {
  for (const path of ['/bank', '/bank/JPM', '/bank/JPM/', '/bank/19617']) {
    assert.equal(isAdFreePath(path), true, path);
  }
});

test('content pages and the game keep their ads', () => {
  for (const path of ['/', '/screener', '/search', '/faq/what-is-roe', '/metrics/roe', '/game', '/game/BankCEO', '/game/how-to-play', '/game/strategy-guide', '/game/fake-bank-names', '/banking']) {
    assert.equal(isAdFreePath(path), false, path);
  }
});

test('stripping ad tags removes every marked block and nothing else', () => {
  const html = '<head>\n  <!-- ads:start -->\n  <script src="a.js"></script>\n  <!-- ads:end -->\n  <title>t</title>\n</head><body>\n  <!-- ads:start -->\n  <script src="b.js"></script>\n  <!-- ads:end -->\n</body>';
  assert.equal(stripAdTags(html), '<head>\n  <title>t</title>\n</head><body>\n</body>');
});

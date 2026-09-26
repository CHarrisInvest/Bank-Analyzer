/**
 * BankCEO analytics relay.
 *
 * The game iframe posts events to the parent page, which forwards them to
 * GA4. Anything posted to the window can reach the listener, so only known
 * events and known parameters may pass, and values must fit GA4's limits.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { GAME_EVENTS, sanitizeGameMessage } from '../../src/analytics/bankceo.js';

test('a well-formed game event passes with its parameters', () => {
  const evt = sanitizeGameMessage({
    source: 'bankceo',
    event: 'quarter_advanced',
    params: { quarter: 7, net_income: 1234, roe_pct: 11.2, cet1_pct: 10.4, nim_pct: 3.1 },
  });
  assert.deepEqual(evt, {
    name: 'quarter_advanced',
    params: { quarter: 7, net_income: 1234, roe_pct: 11.2, cet1_pct: 10.4, nim_pct: 3.1 },
  });
});

test('messages from anything but the game are ignored', () => {
  assert.equal(sanitizeGameMessage(null), null);
  assert.equal(sanitizeGameMessage('game_start'), null);
  assert.equal(sanitizeGameMessage({ event: 'game_start' }), null);
  assert.equal(sanitizeGameMessage({ source: 'other', event: 'game_start' }), null);
});

test('unknown event names are rejected, including inherited object keys', () => {
  assert.equal(sanitizeGameMessage({ source: 'bankceo', event: 'page_view' }), null);
  assert.equal(sanitizeGameMessage({ source: 'bankceo', event: 'toString' }), null);
  assert.equal(sanitizeGameMessage({ source: 'bankceo', event: 42 }), null);
});

test('only whitelisted, well-typed parameters are forwarded', () => {
  const evt = sanitizeGameMessage({
    source: 'bankceo',
    event: 'game_over',
    params: {
      outcome: 'victory',
      grade: 'A',
      total_return_pct: NaN,
      final_cet1_pct: Infinity,
      quarters_played: 40,
      failure_cause: '',
      macro_difficulty: { nested: true },
      page_location: 'https://evil.example',
    },
  });
  assert.deepEqual(evt.params, { outcome: 'victory', grade: 'A', quarters_played: 40 });
});

test('string values are cut to GA4\'s 100-character limit', () => {
  const evt = sanitizeGameMessage({
    source: 'bankceo',
    event: 'game_over',
    params: { failure_cause: 'x'.repeat(250) },
  });
  assert.equal(evt.params.failure_cause.length, 100);
});

test('missing params yield an empty parameter set', () => {
  assert.deepEqual(sanitizeGameMessage({ source: 'bankceo', event: 'game_start' }), {
    name: 'game_start',
    params: {},
  });
});

test('every event carries at most 25 parameters (GA4 limit, with event_category)', () => {
  for (const [name, keys] of Object.entries(GAME_EVENTS)) {
    assert.ok(keys.length + 1 <= 25, name);
    assert.ok(name.length <= 40, name);
  }
});

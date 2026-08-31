/**
 * Bank URL segments.
 *
 * The app emits zero-padded CIKs in links and file names; older external
 * links carry the unpadded form. The lookup has to recognise both, and it
 * once recognised only the old one -- so a page the site itself linked to
 * did not resolve.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { bankPath, matchesBank } from '../../src/utils/bankPath.js';

test('a ticker addresses a bank when it has one', () => {
  assert.equal(bankPath({ ticker: 'JPM', cik: '0000019617' }), 'JPM');
});

test('a bank with no ticker falls back to its padded CIK', () => {
  assert.equal(bankPath({ cik: '0000083246' }), '0000083246');
  assert.equal(bankPath({}), '');
  assert.equal(bankPath(null), '');
});

test('matching accepts the ticker in any case', () => {
  const bank = { ticker: 'JPM', cik: '0000019617' };
  assert.equal(matchesBank(bank, 'JPM'), true);
  assert.equal(matchesBank(bank, 'jpm'), true);
  assert.equal(matchesBank(bank, ' JPM '), true);
  assert.equal(matchesBank(bank, 'BAC'), false);
});

test('matching accepts the CIK padded or not', () => {
  const bank = { ticker: 'JPM', cik: '0000019617' };
  assert.equal(matchesBank(bank, '0000019617'), true);
  assert.equal(matchesBank(bank, '19617'), true);
  assert.equal(matchesBank(bank, '19618'), false);
});

test('nothing matches nothing', () => {
  assert.equal(matchesBank(null, 'JPM'), false);
  assert.equal(matchesBank({ ticker: 'JPM' }, ''), false);
  assert.equal(matchesBank({}, '19617'), false);
});

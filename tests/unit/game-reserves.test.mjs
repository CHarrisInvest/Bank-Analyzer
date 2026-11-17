/**
 * BankCEO reserve supervision (public/game/engine.js): the provision override
 * can smooth a quarter or two, but holding the allowance below the CECL
 * model's level draws warnings, then an enforcement action, and never
 * improves the final score.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// The engine is a browser script that attaches itself to window.
const sandbox = {};
new Function('window', readFileSync(fileURLToPath(new URL('../../public/game/engine.js', import.meta.url)), 'utf8'))(sandbox);
const E = sandbox.BankEngine;
const RULES = E.RESERVE_RULES;

const SEED = 4242;
const fresh = () => JSON.parse(JSON.stringify({ ...E.INITIAL_STATE, runSeed: SEED }));

// Play `quarters` quarters from a copy of `state`; policy(state) sets decisions
// before each one.
function play(quarters, policy, state = fresh()) {
  let s = JSON.parse(JSON.stringify(state));
  for (let i = 0; i < quarters && !s.gameOver; i++) {
    if (policy) policy(s);
    s = E.runQuarter(s, {});
  }
  return s;
}
const zeroProvision = (s) => { s.decisions.provisionOverride = 0; };
const logged = (s, tag) => s.log.filter((l) => l.msg.startsWith(tag));

test('a bank left on Auto sits at the model level and is never warned', () => {
  const s = play(40);
  const status = E.reserveStatus(s);
  assert.ok(Math.abs(status.adequacy - 1) < 1e-9, `adequacy ${status.adequacy}`);
  assert.equal(status.warnings, 0);
  assert.equal(s.reserveOrder, null);
  assert.equal(logged(s, 'RESERVE WARNING').length, 0);
  assert.equal(logged(s, 'RESERVE ENFORCEMENT').length, 0);
  assert.equal(s.gameOver.stats.reserveMarkdown, 0);
  assert.equal(s.gameOver.stats.reserveOrderPenalty, false);
});

test('the override resets to Auto after every quarter', () => {
  const s = play(1, zeroProvision);
  assert.equal(s.decisions.provisionOverride, null);
});

test('two under-provided quarters draw warnings and nothing more', () => {
  const s = play(2, zeroProvision);
  assert.equal(s.reserveStrikes, 2);
  assert.equal(s.reserveOrder, null);
  assert.equal(logged(s, 'RESERVE WARNING').length, 2);
  assert.equal(s.lastIS.reservePenalty, 0);
});

test('the third under-provided quarter brings an enforcement action', () => {
  const before = play(2, zeroProvision);
  const s = play(1, zeroProvision, before);
  const is = s.lastIS;
  assert.ok(is.reserveEnforcement, 'enforcement recorded');
  // The whole shortfall is provided at once, with a penalty of at least the minimum.
  assert.ok(is.provision >= is.reserveEnforcement.restore && is.reserveEnforcement.restore > 0);
  assert.ok(is.reservePenalty >= RULES.penaltyMin && is.reservePenalty <= RULES.penaltyMax);
  assert.equal(is.reserveEnforcement.offence, 1);
  assert.ok(Math.abs(E.reserveStatus(s).adequacy - 1) < 1e-9, 'allowance restored to the model level');
  assert.equal(s.reserveStrikes, 0);
  assert.equal(E.reserveOrderActive(s), true);
  assert.equal(logged(s, 'RESERVE ENFORCEMENT ACTION').length, 1);
  // Far worse than the quarter Auto would have produced.
  const auto = play(1, null, before);
  assert.ok(is.netIncome < auto.lastIS.netIncome - RULES.penaltyMin * 0.5);
});

test('the forecast shows the enforcement action before it happens', () => {
  const before = play(2, zeroProvision);
  zeroProvision(before);
  const forecast = E.runQuarter(before, { forecastMode: true });
  assert.ok(forecast.lastIS.reserveEnforcement);
  assert.equal(logged(forecast, 'RESERVE ENFORCEMENT ACTION').length, 0, 'forecasts do not write to the log');
});

test('a consent order locks the override and suspends dividends and buybacks', () => {
  const ordered = play(3, zeroProvision);
  const opened = ordered.reserveOrder.openedAt;
  assert.equal(ordered.reserveOrder.endsAfter, opened + RULES.orderQtrs - 1);

  const s = play(1, (st) => {
    st.decisions.provisionOverride = 0;
    st.decisions.dividendPerShare = 0.18;
    st.decisions.repurchaseAmount = 1000;
  }, ordered);
  assert.equal(E.reserveStatus(ordered).orderQtrsLeft, RULES.orderQtrs - 1);
  assert.ok(Math.abs(s.lastIS.provision - s.lastIS.modelProvision) < 1e-9, 'examiners set the provision');
  assert.equal(s.lastIS.dividendsPaid, 0);
  assert.equal(s.lastIS.repurchases, 0);
  assert.equal(s.reserveStrikes, 0);
  assert.equal(E.distributionCapacity(ordered, ordered.lastIS, E.computeRatios(ordered, ordered.lastIS)).suspended, true);
});

test('the order lifts after its term', () => {
  const ordered = play(3, zeroProvision);
  const s = play(RULES.orderQtrs, null, ordered);
  assert.equal(s.quarter, ordered.reserveOrder.endsAfter + 2);
  assert.equal(s.reserveOrder, null);
  assert.equal(E.reserveOrderActive(s), false);
  assert.equal(logged(s, 'RESERVE CONSENT ORDER LIFTED').length, 1);
});

test('returning to Auto rebuilds the allowance and clears the warnings', () => {
  const lean = play(2, zeroProvision);
  const leanAdequacy = E.reserveStatus(lean).adequacy;
  assert.ok(leanAdequacy < RULES.floor);
  const s = play(12, null, lean);
  assert.ok(E.reserveStatus(s).adequacy > leanAdequacy);
  assert.ok(E.reserveStatus(s).adequacy >= RULES.floor);
  assert.equal(s.reserveStrikes, 0);
  assert.equal(s.reserveOrder, null);
  assert.equal(logged(s, 'RESERVE WARNINGS CLEARED').length, 1);
});

test('a cushion built above the model level can be drawn down without a warning', () => {
  // Over-provide for a year, then provide nothing for a quarter.
  const cushioned = play(4, (s) => { s.decisions.provisionOverride = 600; });
  assert.ok(E.reserveStatus(cushioned).adequacy > 1.2);
  const s = play(1, zeroProvision, cushioned);
  assert.ok(E.reserveStatus(s).adequacy >= RULES.floor);
  assert.equal(s.reserveStrikes, 0);
});

test('an allowance far below the model level is enforced at once', () => {
  // Burn the allowance down with a negative-equivalent: no provision while NPLs are huge.
  const s0 = fresh();
  s0.bs.npl = 20_000; // charge-offs will swamp a zero provision
  const s = play(1, zeroProvision, s0);
  assert.ok(s.lastIS.reserveEnforcement?.gross, 'gross deficiency enforced in one quarter');
});

test('a repeat offence multiplies the penalty', () => {
  const first = play(3, zeroProvision);
  // Sit out the first order on Auto, then under-provide again until examiners act.
  let s = play(RULES.orderQtrs, null, first);
  for (let i = 0; i < 6 && !s.lastIS.reserveEnforcement; i++) s = play(1, zeroProvision, s);
  const e = s.lastIS.reserveEnforcement;
  assert.ok(e, 'second enforcement action');
  assert.equal(e.offence, 2);
  assert.ok(e.penalty >= RULES.penaltyMin * 2);
});

test('holding the provision at zero ends far behind Auto', () => {
  const TIERS = ['F', 'D', 'C', 'B', 'A', 'A+'];
  for (const seed of [4242, 77, 2024]) {
    const start = { ...fresh(), runSeed: seed };
    const auto = play(40, null, start).gameOver;
    const zero = play(40, zeroProvision, start).gameOver;
    assert.equal(auto.reason, 'victory');
    assert.equal(zero.reason, 'victory');
    assert.ok(zero.stats.totalReturn < auto.stats.totalReturn - 0.08, `seed ${seed}: ${zero.stats.totalReturn} vs ${auto.stats.totalReturn}`);
    assert.ok(TIERS.indexOf(zero.grade) <= TIERS.indexOf(auto.grade), `seed ${seed}: ${zero.grade} vs ${auto.grade}`);
  }
});

test('easing the provision in the final quarters does not raise the score', () => {
  const auto = play(40).gameOver;
  const late = play(40, (s) => { if (s.quarter >= 39) zeroProvision(s); }).gameOver;
  assert.ok(late.stats.reserveMarkdown > 0, 'shortfall charged at the closing exam');
  assert.ok(late.stats.totalReturn <= auto.stats.totalReturn + 1e-9, `${late.stats.totalReturn} vs ${auto.stats.totalReturn}`);
  assert.ok(late.modifiersApplied.some((m) => m.includes('below the model level')));
});

test('finishing under a consent order costs a letter grade', () => {
  // Under-provide late in the game until examiners act, so the order covers quarter 40.
  const s = play(40, (st) => { if (st.quarter >= 34 && !st.reserveOrder) zeroProvision(st); });
  assert.ok(s.reserveOrder && s.reserveOrder.endsAfter >= 40, 'order still in force at the end');
  assert.equal(s.gameOver.stats.reserveOrderPenalty, true);
  assert.ok(s.gameOver.modifiersApplied.includes('finished under a reserve consent order'));
});

test('a game saved before reserve supervision existed starts from its own allowance', () => {
  const s0 = play(5, zeroProvision);
  delete s0.modelACL; delete s0.reserveStrikes; delete s0.reserveOrder;
  const restored = { ...JSON.parse(JSON.stringify(E.INITIAL_STATE)), ...s0 };
  assert.ok(Math.abs(E.reserveStatus(restored).adequacy - 1) < 1e-9);
  const s = play(1, null, restored);
  assert.equal(s.reserveStrikes, 0);
  assert.equal(s.reserveOrder, null);
});

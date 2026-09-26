/**
 * BankCEO Game Event Validation
 * The game iframe (public/game/analytics.js) posts events to the parent page.
 * Only whitelisted event names and parameters are forwarded to GA4.
 * Kept free of imports so it can be unit tested under plain Node.
 */

/**
 * Allowed game events and the parameters each may carry
 */
export const GAME_EVENTS = {
  game_start: [],
  game_restart: ['quarter', 'was_over'],
  quarter_advanced: ['quarter', 'net_income', 'roe_pct', 'cet1_pct', 'nim_pct'],
  game_tab_changed: ['tab_name', 'quarter'],
  coach_closed: ['flow_name', 'quarter'],
  game_over: [
    'outcome',
    'grade',
    'quarters_played',
    'total_return_pct',
    'final_cet1_pct',
    'macro_difficulty',
    'failure_cause',
  ],
  game_active: ['active_minutes'],
};

// GA4 truncates parameter values at 100 characters
const MAX_STRING_LENGTH = 100;

/**
 * Validate a message posted by the game iframe
 * @param {*} data - MessageEvent.data
 * @returns {{ name: string, params: Object } | null} Sanitized event, or null if not a valid game event
 */
export function sanitizeGameMessage(data) {
  if (!data || typeof data !== 'object' || data.source !== 'bankceo') return null;
  if (typeof data.event !== 'string' || !Object.hasOwn(GAME_EVENTS, data.event)) return null;

  const raw = data.params && typeof data.params === 'object' ? data.params : {};
  const params = {};
  for (const key of GAME_EVENTS[data.event]) {
    const value = raw[key];
    if (typeof value === 'number' && Number.isFinite(value)) {
      params[key] = value;
    } else if (typeof value === 'string' && value.length > 0) {
      params[key] = value.substring(0, MAX_STRING_LENGTH);
    }
  }

  return { name: data.event, params };
}

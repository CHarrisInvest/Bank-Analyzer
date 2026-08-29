/**
 * Canonical URL segment for a bank.
 *
 * Most banks are addressed by ticker, but nine live filers have none -- HSBC
 * USA and Santander Holdings USA among them, because their common stock is not
 * separately listed. Building the link from the ticker alone sent those to
 * /bank/undefined: the screener listed them and the row went nowhere.
 *
 * Falls back to the CIK, zero-padded the way the data files are named so the
 * URL, the JSON filename and the prerendered page all agree.
 */
export function bankPath(bank) {
  if (!bank) return '';
  if (bank.ticker) return bank.ticker;
  return bank.cik || '';
}

/**
 * Match a URL segment against a bank.
 *
 * Accepts the ticker, the padded CIK and the unpadded CIK. The unpadded form
 * only ever appears in old external links; the padded form is what this app
 * now emits, and the previous lookup stripped leading zeros before comparing,
 * so it recognised the old shape and not its own.
 */
export function matchesBank(bank, segment) {
  if (!bank || !segment) return false;
  const seg = String(segment).trim();
  if (bank.ticker && bank.ticker.toUpperCase() === seg.toUpperCase()) return true;
  if (!bank.cik) return false;
  const padded = String(bank.cik);
  return seg === padded || seg.replace(/^0+/, '') === padded.replace(/^0+/, '');
}

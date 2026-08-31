/**
 * Number formatting for bank figures.
 *
 * Lifted out of BankDetail so the statement tables, the summary tabs and the
 * audits all render a figure the same way. When this lived inside the page
 * component the only way to check what a cell said was to open a browser.
 */

/** Plain number with thousands separators. */
export function formatNumber(num, decimals = 0) {
  if (num === null || num === undefined) return '-';
  return num.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * A currency figure, always in millions.
 *
 * Every currency cell on the site carries the same unit, so any two figures
 * can be read against each other. Precision is kept by adding decimals rather
 * than by changing unit: a $6,000 line reads $0.006M.
 *
 * This used to drop to raw dollars below $10,000, which made ABCB's provision
 * row read "$6,000 | $0 | $-6,000 | $-0.14M" -- four cells in one row, three
 * different units, none of them labelled, and no way to compare the row
 * against itself.
 *
 * Negatives take accounting parentheses. "$-25,928.0M" puts the sign in a
 * place no financial statement puts it.
 */
export function formatCurrency(num) {
  if (num === null || num === undefined) return '-';

  const millions = num / 1e6;
  const abs = Math.abs(millions);

  let body;
  if (abs >= 0.01 || abs === 0) {
    // $4,900,475.0M, $345.6M, $0.45M
    const digits = (abs >= 1 || abs === 0) ? 1 : 2;
    body = abs.toLocaleString(undefined, {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    });
  } else {
    // Below a hundredth of a million, a fixed number of decimals would round
    // the figure away: $13 is 0.000013M. Filings are in whole dollars, so six
    // decimals is always exact; trim the zeros that buys back.
    body = abs.toFixed(6).replace(/(\.\d{3}\d*?)0+$/, '$1');
  }

  return millions < 0 ? `($${body}M)` : `$${body}M`;
}

/** A percentage, to two decimals. */
export function formatPercent(num) {
  if (num === null || num === undefined) return '-';
  return num.toFixed(2) + '%';
}

/**
 * Is this concept a share count rather than an amount of money?
 *
 * Share counts sit on the face of the statement alongside dollar figures and
 * must not be scaled or given a currency symbol.
 */
export function isPerShareTag(tag) {
  if (!tag) return false;
  if (/per(?:basic|diluted|common)?share/i.test(tag)) return true;
  // Par value and liquidation preference are quoted PER SHARE. Scaled into
  // millions, a $0.01 par value rendered as "$0.00" and a $25 liquidation
  // preference as "$0.00M". Anchored at the end because the aggregate
  // siblings -- PreferredStockLiquidationPreferenceValue -- ARE amounts.
  return /(?:no)?parvalue$/i.test(tag) || /liquidationpreference$/i.test(tag);
}

export function isShareCountTag(tag) {
  return !!tag && tag.toLowerCase().includes('shares') && !isPerShareTag(tag);
}

/**
 * One cell of a financial statement, formatted by what its concept is.
 *
 * The tables and the audits go through here, so what a reader sees and what
 * CI checks cannot drift apart.
 */
export function formatStatementCell(value, tag) {
  if (value === null || value === undefined) return '-';
  // Negatives take accounting parentheses whatever the concept, so a column
  // does not switch notation halfway down.
  if (isPerShareTag(tag)) {
    const body = '$' + Math.abs(value).toFixed(2);
    return value < 0 ? `(${body})` : body;
  }
  if (isShareCountTag(tag)) {
    const body = Math.abs(value).toLocaleString();
    return value < 0 ? `(${body})` : body;
  }
  return formatCurrency(value);
}

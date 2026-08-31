/**
 * Financial statement label normalisation.
 *
 * SEC line-item labels are written for a single filing, so they embed that
 * filing's comparatives: "Treasury stock, at cost; 33,921,100 and 31,019,599
 * shares, respectively". A row here spans up to 13 quarters, so those figures
 * are wrong above eleven of the columns and actively mislead. This module
 * strips period-specific detail and keeps the caption.
 *
 * What counts as period-specific:
 *   - two figures joined by "and", ";" or "," (the comparative pair)
 *   - a figure tied to a date ("$500 at December 31, 2025")
 *   - anything trailed by "respectively"
 *
 * What is deliberately kept:
 *   - single thresholds and authorisations ("authorized 200,000,000 shares",
 *     "$1,000 liquidation preference") -- these are terms, not comparatives
 *   - unit and audit notes ("(in thousands)", "(unaudited)")
 *   - note cross-references ("(refer to Notes 28, 29 and 30)")
 *   - descriptive parentheticals with no figures ("(Recovery of)", "(Loss)")
 *
 * Shared by the React tables and by the dataset generator, so a label reads
 * the same wherever it appears and so tag-equivalence detection can compare
 * captions rather than captions-plus-figures.
 */

const MONTH =
  '(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|' +
  'Aug(?:ust)?|Sep(?:t|tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)';

// "December 31, 2025" | "December 2025" | "3/31/26" | a bare year.
const DATE =
  `(?:${MONTH}\\s+\\d{1,2},?\\s+\\d{4}|${MONTH},?\\s+\\d{4}|` +
  '\\d{1,2}\\/\\d{1,2}\\/\\d{2,4}|\\b(?:19|20)\\d{2}\\b)';

// Anchored on both sides so a grouped number is never split into a false
// pair: without the boundaries, "500,000,000" reads as "500" and "000,000"
// joined by a comma, and the surrounding rules then delete a threshold.
// The digit run may not END on a comma either: "$0," swallowed its own
// separator, so "includes $0, $0, and $(151)" read as one amount followed by
// nothing joinable, and the clause survived as a comparative nobody caught.
// The trailing guard rejects a following digit, and a comma only when a digit
// follows it -- that comma is a thousands separator, so the match would be a
// prefix of a longer number; a comma before a space just ends the figure.
// The final guard also refuses the day half of a written date: "31" in
// "March 31, 2026" is followed by ", 2026", and reading that as a comparative
// pair of figures deletes the year and strands "at March".
// A negative written in accounting parentheses -- "$(151)" -- is a figure
// like any other, and a comparative series that ends in one was leaving
// "(includes, and $(151) accumulated ...)" behind.
const PAREN_NEG = '\\$\\s?\\(\\d(?:[\\d,]*\\d)?(?:\\.\\d+)?\\)';

const AMOUNT =
  `(?:${PAREN_NEG}|` +
  '(?<![\\d,.])\\$?\\s?\\d(?:[\\d,]*\\d)?(?:\\.\\d+)?(?:\\s*(?:million|billion|thousand))?' +
  '(?!\\d|,\\d|,\\s*(?:19|20)\\d{2}\\b))';

// Filers use all of these to attach a figure to a period.
const AT = '(?:at|as\\s+of|on|in|for|through)';

// The same attachment written as punctuation: "59,012,423 shares - 2025".
const PIN = `(?:${AT}\\s+|[-–]\\s*)`;

/**
 * A date specific enough that sitting next to a figure is itself the pin.
 *
 * A bare year is not: "2025 Equity Incentive Plan" names a plan, and treating
 * adjacency as a pin there would eat the caption. A full calendar date next to
 * a number is only ever a period reference.
 */
const FULL_DATE = `(?:${MONTH}\\s+\\d{1,2},?\\s+\\d{4}|\\d{1,2}\\/\\d{1,2}\\/\\d{2,4})`;

/**
 * The pin written the other way round -- date first, figure after.
 *
 * Every rule below was built around "figure at date", which is how most
 * filers write it. The ones who write "December 31, 2025 - 19,054,555" or
 * "March 31, 2026 $969,159; December 31, 2025 $957,295" went untouched, and
 * where a later sweep caught only the date half it left "amortized cost
 * -$1,516,376; December 31, 2024-$1,595,583" on screen.
 */
const DATED_FIGURE = `${FULL_DATE}\\s*[-–:]?\\s*${AMOUNT}\\s*(?:shares?)?`;

/** And the same pair with no pinning word at all: "14,564,425 shares 12/31/25". */
const FIGURE_THEN_DATE = `${AMOUNT}\\s*(?:shares?)?\\s*(?:${AT}\\s+|[-–:]\\s*)?${FULL_DATE}`;

// Comparatives are joined by "and" or a semicolon. A bare comma is excluded
// on purpose -- it is the thousands separator, and admitting it here is how
// a single figure gets mistaken for a pair.
// A comma is admitted only when whitespace follows it. A thousands separator
// never has a space after it, so "127,688,691, 129,836,672 and 132,204,305"
// splits into three figures while "500,000,000" stays whole.
const JOIN = '(?:\\s+and\\s+|\\s*;\\s*|,\\s+and\\s+|,\\s+|\\s+\\/\\s+)';

const re = (body, flags = 'gi') => new RegExp(body, flags);

/** Words filers put between a count and the date it belongs to. */
const COUNT_ROLE = '(?:shares?\\s+)?(?:issued|outstanding)(?:\\s+and\\s+outstanding)?';

/**
 * A figure, optionally pinned to a date, optionally with its role spelled out
 * in between: "23,567,094 issued as of December 31, 2025".
 */
const FIGURE = `${AMOUNT}(?:\\s+${COUNT_ROLE})?(?:\\s*${PIN}${DATE})?`;

/**
 * A date followed by a share count, tolerating both the spaced form and the
 * missing separator several filers emit ("December 31, 20251,352,205,592
 * shares"), where the count runs straight on from the year.
 */
const DATED_COUNT =
  `(?:${AT}\\s+)?${MONTH}\\s+\\d{1,2},?\\s+\\d{4}[\\d,]*(?:\\s+\\d[\\d,]*)?\\s*(?:shares?)?`;

/**
 * A date-first figure with its role spelled out after it, which is how one
 * filer strings two of them together with no joining word at all:
 * "March 31, 2026 - 20,564,719 shares issued and outstanding March 31, 2025 -
 * 20,976,200 shares issued and outstanding".
 */
const DATED_FIGURE_ROLE = `${DATED_FIGURE}(?:\\s+${COUNT_ROLE})?`;

/** Two or more such figures in a row: the comparative pair. */
const FIGURE_SERIES = `${FIGURE}(?:${JOIN}${FIGURE})+`;

// ---------------------------------------------------------------------------
// Parenthetical handling
// ---------------------------------------------------------------------------

/** Parentheticals worth keeping even though they contain digits. */
const KEEP_PAREN = [
  /refer\s+to|\bnotes?\b/i,          // "(refer to Notes 28, 29 and 30)"
  /in\s+(?:thousands|millions|billions)/i,
  /unaudited|restated|as\s+adjusted/i,
  /except\s+.*\s+(?:share|per\s+share)/i,
];

/** Parentheticals that exist only to carry period figures. */
const DROP_PAREN = [
  /\brespectively\b/i,
  re(`${AMOUNT}${JOIN}${AMOUNT}`, 'i'),        // two figures, however joined
  re(`${AMOUNT}\\s+${AT}\\s+${DATE}`, 'i'),    // one figure pinned to a date
  re(`${AT}\\s+${DATE}${JOIN}(?:${AT}\\s+)?${DATE}`, 'i'), // "at D1 and D2"
  re(DATED_FIGURE, 'i'),                       // "(December 31, 2024 - $163)"
];

/**
 * A figure worth keeping a clause for: a money amount or a grouped number.
 *
 * A lone digit is not one. Twenty-two labels nest a footnote marker inside a
 * parenthetical -- "(includes $514 and $214 measured at fair value (1))" --
 * and once the comparative pair goes, the "(1)" was enough to make the hollow
 * remainder look like it still carried a figure.
 */
const REAL_FIGURE = /\$\s?\d|\d[\d,]{2,}/;

function stripParentheticals(text) {
  // One level of nesting: "(net of allowance for loan and lease losses (ALLL)
  // of $809,773 and $702,052)". Matching only flat groups meant the inner
  // "(ALLL)" was tested on its own, the outer group was never tested at all,
  // and the inline sweep then hollowed it out from underneath.
  return text.replace(/\(((?:[^()]|\([^()]*\))*)\)/g, (whole, inner) => {
    // "respectively" is only ever the tail of a comparative, so it settles the
    // question before the digit test -- filers with an unbalanced paren strand
    // a bare "( respectively)" that carries no figures but is still noise.
    if (/\brespectively\b/i.test(inner) && !/\d/.test(inner)) return ' ';
    if (!/\d/.test(inner)) return whole;                       // purely descriptive
    if (KEEP_PAREN.some(r => r.test(inner))) return whole;
    if (!DROP_PAREN.some(r => r.test(inner))) return whole;

    // The parenthetical carries period detail -- but often alongside terms
    // worth keeping, as in "($0.01 par value; authorized 300,000,000 shares;
    // issued 142,184,584 as of December 31, 2025)". Discarding the whole group
    // would take the authorisation with the dates, so clean the inside and
    // keep what survives. A residue with no figures left in it ("fair value",
    // "amortized cost") only described the numbers, so it goes.
    const kept = tidy(stripInline(inner));
    // Keep the residue only if it is genuinely clean. A surviving date means
    // the clause was too tangled to salvage -- better a bare caption than a
    // half-stripped parenthetical quoting one period out of thirteen.
    const stillPeriodic =
      DROP_PAREN.some(r => r.test(kept)) || new RegExp(DATE, 'i').test(kept);
    const worthKeeping = /[A-Za-z]/.test(kept) && REAL_FIGURE.test(kept) && !stillPeriodic;
    return worthKeeping ? ` (${kept})` : ' ';
  });
}

// ---------------------------------------------------------------------------
// Inline (unparenthesised) period detail
// ---------------------------------------------------------------------------

/**
 * A slash date with a share count that may be fused onto it, which is how one
 * filer writes the whole clause: "3/31/26571,140,185 shares". Matching the
 * pair as a unit avoids a greedy digit run splitting a number in half.
 */
const SLASH_DATED_COUNT = '\\d{1,2}\\/\\d{1,2}\\/\\d{2,4}[\\d,]*\\s*(?:shares?)?';

const INLINE = [
  // "treasury: 3/31/26571,140,185 shares; 12/31/25570,328,105 shares"
  re(`\\s*[;,:]?\\s*(?:issued|outstanding)?\\s*:?\\s*${SLASH_DATED_COUNT}(?:${JOIN}${SLASH_DATED_COUNT})+`),

  // "; issued: 3/31/26 and 12/31/25 2,125,725,742 shares" -- the date pair
  // precedes the count, so the whole clause goes.
  re(`\\s*[;,]?\\s*(?:issued|outstanding)\\s*:\\s*${DATE}${JOIN}${DATE}\\s*${AMOUNT}\\s*shares?`),

  // "respectively" marks a comparative unambiguously, so these run before the
  // looser "of ..." rule below -- otherwise that rule eats the figures and
  // leaves the tail stranded as "Common stock issuable shares, respectively".
  //
  // "…: 608,291 and 600,168 shares, respectively"
  re(`\\s*[;,:]?\\s*${AMOUNT}${JOIN}${AMOUNT}\\s*(?:shares?)?\\s*(?:issued|outstanding)?(?:\\s+and\\s+outstanding)?\\s*,?\\s*respectively`),

  // Any remaining figure series trailed by "respectively".
  re(`\\s*[;,:]?\\s*${FIGURE_SERIES}\\s*,?\\s*respectively`),

  // "of $928 at March 31, 2024 and $868 at December 31, 2023" -- keep the
  // caption ("net of unearned discount"), drop the figures.
  re(`\\s*(?:of|:)\\s+${FIGURE_SERIES}`),

  // "27,604,513 shares at December 31, 2025; 13,922,820 shares at December 31, 2024"
  re(`\\s*[;,:]?\\s*${AMOUNT}\\s*shares?\\s*${PIN}${DATE}(?:${JOIN}${AMOUNT}\\s*shares?\\s*${PIN}${DATE})+`),

  // Date-then-count, including the run-together form some filers emit with no
  // separator at all: "December 31, 20251,352,205,592 shares and December 31,
  // 20241,222,647,540 shares". DATED_COUNT absorbs the digits fused onto the
  // year, which no boundary-anchored figure pattern can match.
  re(`\\s*[;,:]?\\s*(?:issued|outstanding)?\\s*(?:shares?)?\\s*:?\\s*${DATED_COUNT}(?:${JOIN}${DATED_COUNT})+`),

  // "issued 28,205,674 at March 31, 2026 and December 31, 2025" and the
  // residue "issued at March 31, 2026 and December 31, 2025" that earlier
  // rules can leave behind.
  re(`\\s*[;,:]?\\s*(?:issued|outstanding)?\\s*(?:${AMOUNT}\\s*)?(?:shares?\\s*)?${AT}\\s+${DATE}${JOIN}(?:${AT}\\s+)?${DATE}`),

  // Date first: "(Shares: December 31, 2025 - 19,054,555 and December 31,
  // 2024 - 19,003,609)", "amortized cost March 31, 2026 $969,159; December 31,
  // 2025 $957,295", "unallocated shares September 30, 2025: 50,133: September
  // 30, 2024: 53,989". The leading role word goes with them -- "Shares:" on
  // its own describes figures that are no longer there.
  //
  // Runs after the rules above, not before: those handle a date PAIR that
  // precedes a single figure ("September 30, 2025 and September 30, 2024:
  // 75,000,000 shares authorized"), where matching one date to the figure
  // takes the authorisation and strands the other date.
  // The separator may be nothing at all: every element starts with a full
  // date, so adjacency is unambiguous.
  re(`\\s*[;,:]?\\s*(?:${COUNT_ROLE}|shares?)?\\s*:?\\s*${DATED_FIGURE_ROLE}(?:(?:${JOIN}|\\s*:\\s*|\\s+)${DATED_FIGURE_ROLE})+`),

  // No pinning word either way: "authorized 40,000,000 shares 12/31/25 and
  // 20,000,000 shares 12/31/24".
  re(`\\s*[;,:]?\\s*${FIGURE_THEN_DATE}(?:${JOIN}${FIGURE_THEN_DATE})+`),

  // "(includes $0, $0, and $(151) accumulated other comprehensive income
  // reclassification ...)". The figures are a comparative series with a word
  // in front of them rather than "of" or ":", and what follows describes them
  // rather than being part of the caption.
  re(`\\s*[;,:]?\\s*includes\\s+${AMOUNT}(?:${JOIN}${AMOUNT})+`),

  // "143,213,102 and 142,944,704 shares issued" with no "respectively".
  re(`\\s*[;,:]?\\s*${AMOUNT}${JOIN}${AMOUNT}\\s+shares?\\s+(?:issued|outstanding)(?:\\s+and\\s+outstanding)?`),

  // The general pair-of-share-counts case, wherever it sits in the caption:
  // "Issued 375,030,534 and 375,018,433 shares", "Treasury stock 17,727,219
  // and 15,402,776 shares at cost". Runs after the more specific rules above
  // so those can claim their trailing words first.
  re(`\\s*[;,:]?\\s*${AMOUNT}${JOIN}${AMOUNT}\\s*shares?`),

  // The same pair with the count word leading: "issued and outstanding
  // 3,991,164 and 3,877,917".
  re(`\\s*[;,:]?\\s*${AMOUNT}${JOIN}${AMOUNT}\\s*(?=[;,.]|$)`),

  // A trailing single date pin: "liquidation preference $222,750 at March 31, 2026".
  re(`\\s*[;,:]?\\s*${AT}\\s+${DATE}\\s*$`),

  // A bare comparative series where at least the first figure is dated:
  // "23,567,094 issued as of December 31, 2025, and 19,796,519 as of
  // December 31, 2024" -- no "of" or ":" to key on, so it needs its own rule.
  re(`\\s*[;,:]?\\s*${AMOUNT}(?:\\s+${COUNT_ROLE})?\\s+${AT}\\s+${DATE}(?:${JOIN}${FIGURE})+`),

  // Stylistic suffix carrying no information for a multi-period row.
  /,?\s*at aggregate liquidation value\s*$/gi,
];

/**
 * Applied after INLINE, repeatedly, until nothing more changes.
 *
 * The labels that survive INLINE are the ones stacking three or four clauses,
 * where removing one clause exposes another. Rather than adding a rule per
 * filer, sweep out the two constructs that are period-specific wherever they
 * appear: a date pinned to something, and a leftover comparative pair.
 */
const SWEEP = [
  // "as of December 31, 2025" / "at March 31, 2026" -- a date pin in a row
  // label is period-specific by definition, whatever precedes it.
  re(`\\s*[;,:]?\\s*${PIN}${DATE}`),
  // A stranded pair of figures once its surrounding words are gone.
  re(`\\s*[;,:]?\\s*${AMOUNT}${JOIN}${AMOUNT}\\s*(?:shares?)?(?=[\\s;,.]|$)`),
  // A date left dangling at a clause boundary after its "as of" was swept:
  // "…, 127,688,691 and September 30, 2025".
  re(`${JOIN}${DATE}(?:${JOIN}${DATE})*\\s*(?=[;,.]|$)`),
];

function stripInline(text) {
  let out = text;
  for (const r of INLINE) out = out.replace(r, ' ');
  let prev;
  do {
    prev = out;
    for (const r of SWEEP) out = out.replace(r, ' ');
  } while (out !== prev);
  return out;
}

// ---------------------------------------------------------------------------
// Repair
// ---------------------------------------------------------------------------

function tidy(text) {
  let out = text;
  out = out.replace(/\(\s*\)/g, ' ');            // parens emptied by stripping
  out = out.replace(/\(\s*[;,]\s*/g, '(');
  out = out.replace(/\s*[;,]\s*\)/g, ')');
  out = out.replace(/\s+\)/g, ')');
  out = out.replace(/\(\s+/g, '(');
  // Removing a clause can butt punctuation against the next word
  // ("shares;issued"); restore the space rather than leaving them fused.
  out = out.replace(/([;,:])(?=[A-Za-z])/g, '$1 ');
  // ...and left a gap in front of it ("credit losses ; at amortized cost").
  out = out.replace(/\s+([;,:])/g, '$1');
  out = out.replace(/\s*,\s*,/g, ',');
  out = out.replace(/\s*;\s*;/g, ';');
  out = out.replace(/\s+/g, ' ');
  // Removing the middle of a list can leave connectors touching each other
  // ("and and") or a clause opening with one.
  out = out.replace(/\b(and|or)(\s+\1\b)+/gi, '$1');
  // Only drop a connector that now points at nothing -- one sitting against
  // punctuation or the end. A connector with words after it is a serial comma
  // ("Loan, Lease, and Other Losses") and must survive.
  out = out.replace(/([;,:])\s*(?:and|or)\s*(?=[;,:]|$)/gi, '$1');
  out = out.replace(/\s*,?\s*\brespectively\b/gi, '');
  // Punctuation-style date pins leave their dashes behind once swept.
  out = out.replace(/\s*[-–]\s*(?=[-–])/g, '');
  out = out.replace(/[\s;,:]*[-–]\s*(?=[;,.]|$)/g, '');
  out = out.replace(/\s+/g, ' ');
  // Connectors left pointing at nothing once their object was removed.
  // "issued" and "outstanding" are NOT connectors -- "issued and outstanding"
  // is a complete caption, and stripping it loses the reader real meaning.
  // Repeat until stable so "and outstanding" does not leave a trailing "and".
  let prev;
  do {
    prev = out;
    out = out.replace(/[\s;,:]+(?:of|at|as\s+of|on|and|or|from|net\s+of)\s*$/i, '');
    // A lone "issued" or "outstanding" left after punctuation once its count
    // was removed. The paired form "issued and outstanding" is a real caption
    // and is matched by neither alternative here, so it survives.
    out = out.replace(/[;,:]\s*(?:issued|outstanding)\s*$/i, '');
    out = out.replace(/[\s;,:]+$/, '');
  } while (out !== prev);
  out = out.replace(/^[\s;,:.-]+/, '');
  return out.trim();
}

/**
 * Strip period-specific detail from a statement label.
 * Returns the original when cleaning would leave nothing readable, so a row
 * whose label is entirely parenthetical still shows something.
 */
export function cleanLabel(label) {
  if (!label || typeof label !== 'string') return label;
  const cleaned = tidy(stripInline(stripParentheticals(label)));
  if (!cleaned || !/[A-Za-z]/.test(cleaned)) return label.trim();
  return cleaned;
}

/**
 * Shorten a label for the transposed view, where each row label becomes a
 * column header.
 *
 * The old limit cut at 18 characters mid-word, which left concept names
 * indistinguishable from one another -- "Income (Loss) from Continuing
 * Operations before Equity Method Investments" and its three siblings all
 * rendered as "Income (Loss) from…". Break on a word boundary and allow
 * enough characters for the distinguishing part to survive; the full text is
 * still in the cell's title.
 */
export function truncateLabel(label, max = 42) {
  if (!label || label.length <= max) return label;
  const cut = label.slice(0, max);
  const space = cut.lastIndexOf(' ');
  // Only honour the word boundary if it leaves most of the budget intact,
  // otherwise a single long word would shrink the label to almost nothing.
  const base = space > max * 0.6 ? cut.slice(0, space) : cut;
  return `${base.replace(/[\s,;:]+$/, '')}…`;
}

/**
 * Turn an XBRL tag into readable words, for rows whose label cannot carry
 * the distinction on its own.
 */
export function humanizeTag(tag) {
  if (!tag) return '';
  return tag
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Display labels for one rendered table.
 *
 * Cleaning can map two different rows onto the same text -- USB reports two
 * held-to-maturity lines distinguished only by the fair values we just
 * removed. Identical labels on different numbers are worse than verbose ones,
 * so where a collision survives, name the underlying concept.
 */
export function resolveLabels(items) {
  const cleaned = items.map(it => cleanLabel(it.label) || '');
  const counts = new Map();
  for (const c of cleaned) counts.set(c, (counts.get(c) || 0) + 1);

  return cleaned.map((c, i) => {
    if (counts.get(c) < 2) return c;
    const concept = humanizeTag(items[i].tag);
    if (!concept) return c;
    // Skip the suffix when the tag merely restates the caption.
    const norm = s => s.toLowerCase().replace(/[^a-z]/g, '');
    if (norm(concept) === norm(c)) return c;
    return `${c} (${concept})`;
  });
}

export default cleanLabel;

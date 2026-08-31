/**
 * Grouping for financial statement tables.
 *
 * SEC's Financial Statement Data Sets give line ordering but no hierarchy:
 * pre.txt has no depth column, so every row arrives at indent 0 and there are
 * no caption rows to delimit groups. Sections therefore have to be recognised
 * from the label, and only where the label is unambiguously a heading.
 *
 * The previous rule matched a dozen words as substrings of the label OR the
 * XBRL tag. Nearly every income-statement tag contains "Income", "Expense" or
 * "Interest", so "Loans" became a section header on the strength of its tag
 * being InterestAndFeeIncomeLoansAndLeases: 61% of rows were headers, 24
 * sections per table, and most of them empty. Grouping that fine is not
 * grouping at all.
 *
 * Most statements now render flat, which is the honest reading of data that
 * carries no hierarchy.
 */
import { isPerShareTag, isShareCountTag } from './format.js';
import { cleanLabel } from './labels.js';

/**
 * Headings that name a whole group rather than one line in it.
 *
 * Anchored, not substrings: "Interest expense" heads a group, "Interest
 * expense on deposits" is a line within one. Deliberately excludes captions
 * that are line items as often as headings -- "Deposits", "Borrowings",
 * "Investment securities", "Other income" all appear as ordinary rows on real
 * statements, and promoting them swallows everything below.
 */
const HEADINGS = [
  /^assets$/,
  /^liabilities$/,
  /^liabilities and (?:share|stock)holders'?\s*equity$/,
  /^(?:share|stock)holders'?\s*equity$/,
  /^equity$/,
  /^interest (?:and dividend )?income$/,
  /^interest expense$/,
  /^non-?interest income$/,
  /^non-?interest expense$/,
];

/**
 * Is this row a section header?
 *
 * Takes the label as displayed. A "Total ..." or "Net ..." row closes a group
 * rather than opening one, so it stays an ordinary row even when the rest of
 * the caption matches.
 */
function detectSection(item) {
  const label = (item?.displayLabel ?? item?.label ?? '')
    .toLowerCase()
    .replace(/[:.]\s*$/, '')
    .trim();
  if (!label) return false;
  if (/^total\b/.test(label) || /^net\b/.test(label)) return false;
  return HEADINGS.some(re => re.test(label));
}

/**
 * Group rows into collapsible sections.
 *
 * Rows before the first header become one leading group, not one group each --
 * the previous version pushed a separate section per item there, which is how
 * a flat 38-row balance sheet became 38 "sections". A header that turns out to
 * have no rows under it is demoted back to an ordinary row, so the UI never
 * offers a toggle that expands to nothing.
 *
 * A statement can open more than one unheaded group -- JPM's, NTRS's and
 * STT's income statements each demote a childless heading part way down, and
 * the rows after it have no heading to sit under. The id is both the React key
 * and the collapse-state key, so it is built from the group's first row rather
 * than being the constant it was: two groups keyed alike shared one collapse
 * toggle and collided on reconcile. An unheaded group also stays open until a
 * heading actually earns its own section, so a demotion rejoins the rows above
 * it instead of starting a second group in the same place.
 */
function groupItemsIntoSections(items) {
  const sections = [];
  let current = null; // heading whose rows are still arriving
  let lead = null;    // rows with no heading over them

  const addLead = (item, idx) => {
    lead ??= { header: null, headerIdx: -1, children: [], id: `section-lead-${idx}` };
    lead.children.push({ item, idx });
  };

  const closeCurrent = () => {
    if (!current) return;
    if (current.children.length) {
      if (lead) { sections.push(lead); lead = null; }
      sections.push(current);
    } else {
      addLead(current.header, current.headerIdx);
    }
    current = null;
  };

  items.forEach((item, idx) => {
    if (detectSection(item)) {
      closeCurrent();
      current = { header: item, headerIdx: idx, children: [], id: `section-${idx}` };
      return;
    }
    if (current) current.children.push({ item, idx });
    else addLead(item, idx);
  });

  closeCurrent();
  if (lead) sections.push(lead);

  return sections;
}

/**
 * The line on which a balance sheet closes.
 *
 * Anything below it is not part of the footing, whatever line number the
 * filer gave it.
 */
const FOOTING_TAGS = new Set([
  'LiabilitiesAndStockholdersEquity',
  'LiabilitiesAndStockholdersEquityIncludingPortionAttributableToNoncontrollingInterest',
]);

/**
 * Which rows belong on the face of the statement.
 *
 * Takes rows in statement order, each carrying the values it would display,
 * and drops three kinds of row that are not figures:
 *
 * - Rows with no value in any displayed period. A row of dashes says nothing.
 * - Rows valued zero in every displayed period. These are note references
 *   ("Commitments and contingencies (refer to Notes 22, 23 and 24)") and
 *   "none issued" placeholders; they rendered as a column of $0, which reads
 *   as a measured zero rather than as an absence.
 * - Share counts and per-share amounts below the footing total. SRCE stacked
 *   eight of them under "Total liabilities and equity" -- authorised shares,
 *   issued shares, par value, treasury shares -- which belong to the
 *   parenthetical schedule, not the balance sheet. The inpth flag in SEC's
 *   data drops most of these; these are the ones their filers left unflagged.
 *   Only share-shaped concepts are dropped, so the real lines that some
 *   filers order after the total -- noncontrolling interests, a fair-value
 *   disclosure -- stay.
 */
function selectStatementRows(rows) {
  let footing = -1;
  rows.forEach((r, i) => { if (FOOTING_TAGS.has(r.tag)) footing = i; });

  const kept = rows.filter((row, i) => {
    const present = (row.values || []).filter(v => v !== null && v !== undefined);
    if (!present.length) return false;
    if (present.every(v => v === 0)) return false;
    if (footing >= 0 && i > footing && (isShareCountTag(row.tag) || isPerShareTag(row.tag))) return false;
    return true;
  });

  return mergeRetaggedRows(kept);
}

// ---------------------------------------------------------------------------
// Re-tagged rows
// ---------------------------------------------------------------------------

/** Words that carry no meaning when comparing two XBRL concepts. */
const TAG_FILLER = new Set([
  'and', 'for', 'the', 'net', 'other', 'excluding', 'including', 'gross',
  'amount', 'value', 'total', 'current', 'noncurrent', 'reported', 'carrying',
  'from', 'with', 'after', 'before', 'not', 'part', 'of',
]);

/** Crude but symmetric: applied to both sides, so it only has to be consistent. */
const stem = w => w.replace(/ies$/, 'y').replace(/s$/, '').replace(/e$/, '');

const conceptWords = tag => new Set(
  (tag.replace(/([a-z0-9])([A-Z])/g, '$1 $2').toLowerCase().match(/[a-z]{3,}/g) || [])
    .map(stem)
    .filter(w => !TAG_FILLER.has(w))
);

/**
 * Could these two concepts be the same statement line?
 *
 * A shared caption is not enough on its own. BANC's balance sheet gives "Bank
 * owned life insurance" to both BankOwnedLifeInsurance and
 * OtherRealEstateAndForeclosedAssets, and CVBF gives one caption to a
 * sale-leaseback gain and an other-real-estate gain. Merging those would print
 * one concept's figures under another's name, which is worse than showing two
 * rows. So the tags have to agree on something: the same letters in a
 * different case (filers do submit DepositAccountFees and Depositaccountfees),
 * or at least one meaningful word in common.
 */
function sameConcept(a, b) {
  const flat = t => t.toLowerCase().replace(/[^a-z]/g, '');
  if (flat(a) === flat(b)) return true;
  const A = conceptWords(a);
  for (const w of conceptWords(b)) if (A.has(w)) return true;
  return false;
}

/**
 * How much caption drift still counts as the same line.
 *
 * A filer who re-tags a line often retypes its caption at the same time, and
 * the rewrite is usually cosmetic: "Less: allowance" for "Less allowance",
 * "available-for-sale" for "available for sale", "Total Loans" for "Total
 * loans", or a parenthetical qualifier added or dropped ("Deferred loan (fees)
 * costs, net"). Keying on the exact caption left 100 such pairs split.
 *
 * Case, punctuation and parentheticals are therefore ignored here. This only
 * widens which rows are CONSIDERED together -- disjoint coverage and agreeing
 * concepts still decide whether they actually merge, so a looser key cannot on
 * its own join two lines that are really different.
 */
function captionKey(caption) {
  return caption
    .toLowerCase()
    .replace(/\([^)]*\)/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

/**
 * Join rows that are one statement line reported under two concepts.
 *
 * A filer who re-tags a line mid-history leaves two rows, each mostly dashes,
 * saying the same thing: ABCB's "Provision for unfunded commitments" is
 * OffBalanceSheetCreditLossLiabilityCreditLossExpenseReversal for FY2025-24
 * and FinancingReceivableCreditLossUnfundedCommitmentsExpenseReversal for
 * FY2023-22. The reader sees two half-empty rows where the filing has one.
 *
 * A row joins only where the coverage is disjoint -- no period reports both --
 * so a genuine pair of concepts that happen to share a caption is left alone.
 * ABCB reports "Provision for credit losses" under two concepts in the same
 * years, with different figures in the older ones; those are two lines and
 * stay two lines, disambiguated by resolveLabels as before.
 *
 * Candidates are clustered rather than taken all-or-nothing. ECBK carries
 * three rows under one caption, two of which cover the same quarters: an
 * all-or-nothing rule let that overlapping pair veto the merge for the third,
 * so widening the caption key would have UNDONE a join that already worked.
 * Clustering seeds on the row seen in the newest period, absorbs what fits
 * around it, and starts again on whatever is left.
 *
 * Each cluster keeps the position, caption and tag of its seed, since that is
 * the filer's current name for the line.
 */
function mergeRetaggedRows(rows) {
  const byCaption = new Map();
  rows.forEach((row, i) => {
    const caption = captionKey(cleanLabel(row.label) || row.label || '');
    if (!byCaption.has(caption)) byCaption.set(caption, []);
    byCaption.get(caption).push({ row, i });
  });

  const merged = new Map();  // index of the surviving row -> merged row
  const dropped = new Set();

  for (const group of byCaption.values()) {
    if (group.length < 2) continue;

    const width = Math.max(...group.map(g => (g.row.values || []).length));
    const has = (g, p) => g.row.values?.[p] !== null && g.row.values?.[p] !== undefined;
    const coverage = g => {
      const cols = [];
      for (let p = 0; p < width; p++) if (has(g, p)) cols.push(p);
      return cols;
    };

    // Periods run newest first, so the member covering the lowest column is
    // the one the filer is using now. Original order breaks ties, to keep the
    // result stable when two rows cover exactly the same periods.
    const first = g => { const c = coverage(g); return c.length ? c[0] : width; };
    const pending = [...group].sort((a, b) => first(a) - first(b) || a.i - b.i);

    while (pending.length) {
      const seed = pending.shift();
      const cluster = [seed];
      const taken = new Set(coverage(seed));

      for (let n = 0; n < pending.length;) {
        const cand = pending[n];
        const cols = coverage(cand);
        const fits = cols.length && cols.every(p => !taken.has(p))
          && cluster.every(c => sameConcept(c.row.tag, cand.row.tag));
        if (fits) {
          cluster.push(cand);
          cols.forEach(p => taken.add(p));
          pending.splice(n, 1);
        } else {
          n++;
        }
      }

      if (cluster.length < 2) continue;

      const values = [];
      for (let p = 0; p < width; p++) {
        const hit = cluster.find(g => has(g, p));
        values.push(hit ? hit.row.values[p] : null);
      }

      merged.set(seed.i, { ...seed.row, values, mergedTags: cluster.map(g => g.row.tag) });
      for (const g of cluster.slice(1)) dropped.add(g.i);
    }
  }

  if (!merged.size) return rows;
  return rows
    .map((row, i) => (merged.has(i) ? merged.get(i) : row))
    .filter((_, i) => !dropped.has(i));
}

export { detectSection, groupItemsIntoSections, selectStatementRows };

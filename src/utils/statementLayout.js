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
 */
function groupItemsIntoSections(items) {
  const sections = [];
  let current = null;
  let lead = null;

  const openLead = () => (lead ??= { header: null, headerIdx: -1, children: [], id: `section-lead` });
  const flushLead = () => { if (lead) { sections.push(lead); lead = null; } };

  items.forEach((item, idx) => {
    if (detectSection(item)) {
      if (current) {
        if (current.children.length) sections.push(current);
        else openLead().children.push({ item: current.header, idx: current.headerIdx });
      }
      flushLead();
      current = { header: item, headerIdx: idx, children: [], id: `section-${idx}` };
      return;
    }
    if (current) current.children.push({ item, idx });
    else openLead().children.push({ item, idx });
  });

  if (current) {
    if (current.children.length) { flushLead(); sections.push(current); }
    else openLead().children.push({ item: current.header, idx: current.headerIdx });
  }
  flushLead();

  return sections;
}

export { detectSection, groupItemsIntoSections };

// Updated FAQ teasers for homepage and valuation page
// Per Section 11.1 of the strategy document
// These replace the existing full FAQ answers with shortened teasers + links to dedicated FAQ pages
// The "Read more" link text and target are provided for each teaser

// ============================================================
// HOMEPAGE TEASERS
// ============================================================
// These 3 questions get shortened. The other 3 homepage FAQs
// ("What is BankSift?", "Is BankSift free to use?", "Where does BankSift get its data?")
// remain unchanged as they are product-specific and not duplicated by FAQ pages.

export const HOMEPAGE_FAQ_TEASERS = [
  {
    question: 'Which financial metrics can I track?',
    teaser: 'BankSift tracks over 25 metrics across profitability, efficiency, capital strength, valuation, and balance sheet composition for every bank in the dataset. These include ROE, ROAA, NIM, Efficiency Ratio, P/B, P/E, Graham Number, and many more.',
    linkText: 'Learn which metrics matter most for bank analysis \u2192',
    linkTarget: '/faq/getting-started/most-important-bank-stock-metrics'
  },
  {
    question: 'How can I compare bank stocks?',
    teaser: 'Build a peer group of similarly sized banks using the screener\u2019s asset size filter, then compare profitability, efficiency, valuation, and capital metrics across the group by sorting on any column.',
    linkText: 'Read our full guide to comparing bank stocks \u2192',
    linkTarget: '/faq/screening/how-to-compare-bank-stocks'
  },
  {
    question: 'How do I find the best bank stocks?',
    teaser: 'Start by defining your investment objective, then set screener filters that match. A quality screen might combine ROE above 10%, Efficiency Ratio below 60%, and Equity to Assets above 8%.',
    linkText: 'See the full screening strategy for high-quality banks \u2192',
    linkTarget: '/faq/screening/filters-for-high-quality-banks'
  }
];

// ============================================================
// VALUATION PAGE TEASERS
// ============================================================
// These 3 questions get shortened on the /valuation hub page.

export const VALUATION_PAGE_FAQ_TEASERS = [
  {
    question: 'How do I value bank stocks using P/B ratio?',
    teaser: 'P/B is the primary valuation metric for banks because bank assets are mostly financial instruments carried near fair value. A bank earning above its cost of equity should trade above 1.0x book value, while a discount may signal either opportunity or underlying problems.',
    linkText: 'Read more about P/B valuation for banks \u2192',
    linkTarget: '/faq/valuation/what-is-a-good-pb-for-banks'
  },
  {
    question: 'What is the Graham Number in bank valuation?',
    teaser: 'The Graham Number estimates a maximum fair price for a stock based on its EPS and BVPS, derived from Benjamin Graham\u2019s value investing principles. Banks trading below their Graham Number may warrant further investigation.',
    linkText: 'Read more about the Graham Number for bank stocks \u2192',
    linkTarget: '/faq/valuation/graham-number-for-bank-stocks'
  },
  {
    question: 'Which valuation methods are best for banks?',
    teaser: 'Bank valuation requires different tools than most industries. Methods built around book value (P/B, P/TBV), earnings-based approaches (P/E, DDM), and frameworks that connect profitability to valuation (ROE-P/B) form the core toolkit.',
    linkText: 'Read more about what makes bank valuation different \u2192',
    linkTarget: '/faq/valuation/why-bank-valuation-is-different'
  }
];

/**
 * BankCEO guide pages (How to Play, Strategy Guide): the content data is well
 * formed and every internal link points at a page that exists.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { GAME_GUIDES, GAME_GUIDES_BY_SLUG } from '../../src/data/content/gameGuides.js';
import { parseInline, stripInline } from '../../src/utils/inlineMarkup.js';
import { METRICS } from '../../src/data/content/metrics.js';
import { VALUATION_METHODS } from '../../src/data/content/valuations.js';
import { FAQS } from '../../src/data/content/faqs.js';
import { INSIGHT_CATEGORIES } from '../../src/data/content/insights.js';
import { isAdFreePath } from '../../src/ads/adsense.js';

const BLOCK_TYPES = new Set(['p', 'h3', 'list', 'steps', 'table', 'note', 'formula']);

// Every string a block shows, markup included.
function blockTexts(block) {
  if (block.type === 'list' || block.type === 'steps') return block.items;
  if (block.type === 'table') return [...block.head, ...block.rows.flat(), block.caption || ''];
  return [block.text, block.title || ''];
}

function guideTexts(guide) {
  return guide.sections.flatMap((s) => [s.heading, ...s.blocks.flatMap(blockTexts)]);
}

const knownPaths = new Set([
  '/game', '/game/BankCEO', '/game/fake-bank-names', '/glossary', '/metrics', '/valuation',
  '/faq', '/insights', '/screener', '/screener/guide', '/search',
  ...GAME_GUIDES.map((g) => g.path),
  ...METRICS.map((m) => `/metrics/${m.slug}`),
  ...VALUATION_METHODS.map((v) => `/valuation/${v.slug}`),
  ...FAQS.map((f) => `/faq/${f.slug}`),
  ...INSIGHT_CATEGORIES.flatMap((c) => [
    `/insights/${c.slug}`,
    ...c.articles.map((a) => `/insights/${c.slug}/${a.slug}`),
  ]),
]);

test('inline markup splits bold and links from plain text', () => {
  assert.deepEqual(parseInline('Set it to **Push** and read [the guide](/game/how-to-play) first.'), [
    { type: 'text', text: 'Set it to ' },
    { type: 'bold', text: 'Push' },
    { type: 'text', text: ' and read ' },
    { type: 'link', text: 'the guide', href: '/game/how-to-play' },
    { type: 'text', text: ' first.' },
  ]);
  assert.equal(stripInline('**Bold** then [a link](/faq)'), 'Bold then a link');
  assert.deepEqual(parseInline('No markup here'), [{ type: 'text', text: 'No markup here' }]);
});

test('both guides exist at their routes', () => {
  assert.equal(GAME_GUIDES_BY_SLUG['how-to-play'].path, '/game/how-to-play');
  assert.equal(GAME_GUIDES_BY_SLUG['strategy-guide'].path, '/game/strategy-guide');
});

test('guide pages carry ads', () => {
  for (const guide of GAME_GUIDES) assert.equal(isAdFreePath(guide.path), false, guide.path);
});

for (const guide of GAME_GUIDES) {
  test(`${guide.slug}: has the fields the page and pre-render need`, () => {
    for (const field of ['title', 'navLabel', 'metaTitle', 'metaDescription', 'lede']) {
      assert.ok(guide[field] && typeof guide[field] === 'string', field);
    }
    assert.ok(guide.metaDescription.length <= 170, `metaDescription is ${guide.metaDescription.length} chars`);
    assert.ok(guide.sections.length >= 5);
  });

  test(`${guide.slug}: sections and blocks are well formed`, () => {
    const ids = guide.sections.map((s) => s.id);
    assert.equal(new Set(ids).size, ids.length, 'section ids are unique');
    for (const section of guide.sections) {
      assert.match(section.id, /^[a-z][a-z0-9-]*$/, section.id);
      assert.ok(section.heading, section.id);
      assert.ok(section.blocks.length > 0, section.id);
      for (const block of section.blocks) {
        assert.ok(BLOCK_TYPES.has(block.type), `${section.id}: unknown block type ${block.type}`);
        if (block.type === 'table') {
          for (const row of block.rows) {
            assert.equal(row.length, block.head.length, `${section.id}: row "${row[0]}" width`);
          }
        }
        for (const text of blockTexts(block)) assert.equal(typeof text, 'string', section.id);
      }
    }
  });

  test(`${guide.slug}: internal links point at real pages`, () => {
    const links = guideTexts(guide).flatMap((t) => parseInline(t)).filter((t) => t.type === 'link');
    assert.ok(links.length > 0);
    for (const link of links) {
      assert.ok(knownPaths.has(link.href), `unknown link target ${link.href}`);
    }
  });

  test(`${guide.slug}: no stray markup is left in the text`, () => {
    for (const text of guideTexts(guide)) {
      const plain = stripInline(text);
      assert.ok(!/\*\*|\]\(/.test(plain), plain);
    }
  });
}

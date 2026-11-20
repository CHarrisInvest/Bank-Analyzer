import React from 'react';
import { Link } from 'react-router-dom';
import SEO from './SEO.jsx';
import { GAME_GUIDES } from '../data/content/gameGuides.js';
import { parseInline } from '../utils/inlineMarkup.js';

function Inline({ text }) {
  return parseInline(text).map((token, i) => {
    if (token.type === 'bold') return <strong key={i}>{token.text}</strong>;
    if (token.type === 'link') return <Link key={i} to={token.href}>{token.text}</Link>;
    return <React.Fragment key={i}>{token.text}</React.Fragment>;
  });
}

function Block({ block }) {
  switch (block.type) {
    case 'h3':
      return <h3><Inline text={block.text} /></h3>;
    case 'list':
      return <ul>{block.items.map((item, i) => <li key={i}><Inline text={item} /></li>)}</ul>;
    case 'steps':
      return <ol>{block.items.map((item, i) => <li key={i}><Inline text={item} /></li>)}</ol>;
    case 'note':
      return (
        <aside className="bs-guide-note">
          {block.title && <p className="bs-guide-note-title">{block.title}</p>}
          <p><Inline text={block.text} /></p>
        </aside>
      );
    case 'formula':
      return <p className="bs-guide-formula">{block.text}</p>;
    case 'table':
      return (
        <div className="bs-guide-table-wrap">
          <table className={block.head.length >= 4 ? 'bs-guide-table-wide' : undefined}>
            {block.caption && <caption>{block.caption}</caption>}
            <thead>
              <tr>{block.head.map((cell, i) => <th key={i} scope="col">{cell}</th>)}</tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r}>
                  {row.map((cell, c) => (c === 0
                    ? <th key={c} scope="row"><Inline text={cell} /></th>
                    : <td key={c}><Inline text={cell} /></td>))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return <p><Inline text={block.text} /></p>;
  }
}

/**
 * A BankCEO guide page (How to Play, Strategy Guide), rendered from
 * src/data/content/gameGuides.js. scripts/prerender.mjs renders the same
 * data to static HTML (renderGameGuideToHtml) and adds the JSON-LD.
 */
function GameGuide({ guide }) {
  const others = GAME_GUIDES.filter((g) => g.slug !== guide.slug);

  return (
    <div className="page bs-guide">
      <SEO
        title={guide.metaTitle}
        description={guide.metaDescription}
        canonical={guide.path}
        type="article"
      />

      <style>{`
        .bs-guide { max-width: 760px; margin: 0 auto; padding: 36px 24px 64px; }
        .bs-guide .breadcrumb { margin-bottom: 20px; }
        .bs-guide h1 {
          font-size: 2.1rem; line-height: 1.15; margin: 0 0 14px; color: #1a202c;
        }
        .bs-guide-lede {
          font-size: 1.125rem; line-height: 1.6; color: #4a5568; margin: 0 0 20px;
        }
        .bs-guide-play {
          display: inline-block; padding: 10px 18px; border-radius: 4px;
          background: #1a365d; color: #fff; font-weight: 600; font-size: 15px;
          text-decoration: none;
        }
        .bs-guide-play:hover { background: #2c5282; }
        .bs-guide-toc {
          margin: 28px 0 0; padding: 14px 0 6px;
          border-top: 1px solid #cbd5e0; border-bottom: 1px solid #cbd5e0;
        }
        .bs-guide-toc h2 {
          margin: 0 0 8px; font-size: 15px; font-weight: 700; color: #1a202c;
        }
        .bs-guide-toc ol {
          margin: 0; padding-left: 22px; columns: 2; column-gap: 32px;
          font-size: 15px; line-height: 1.5;
        }
        .bs-guide-toc li { margin-bottom: 6px; break-inside: avoid; }
        .bs-guide-toc a { color: #2b6cb0; }
        .bs-guide-section { scroll-margin-top: 80px; }
        .bs-guide-section h2 {
          font-size: 1.45rem; line-height: 1.25; color: #1a365d; margin: 44px 0 12px;
        }
        .bs-guide-section h3 {
          font-size: 1.1rem; line-height: 1.3; color: #2d3748; margin: 26px 0 8px;
        }
        .bs-guide-section p,
        .bs-guide-section li { font-size: 16px; line-height: 1.7; color: #2d3748; }
        .bs-guide-section p { margin: 0 0 16px; }
        .bs-guide-section ul,
        .bs-guide-section ol { margin: 0 0 18px; padding-left: 24px; }
        .bs-guide-section li { margin-bottom: 8px; }
        .bs-guide-section a { color: #2b6cb0; }
        .bs-guide-section strong { color: #1a202c; }
        /* Aside: set off with rules above and below, like a sidebar in print. */
        .bs-guide-note {
          margin: 24px 0; padding: 12px 0 2px;
          border-top: 2px solid #1a365d; border-bottom: 1px solid #cbd5e0;
        }
        .bs-guide-note p { margin: 0 0 12px; font-size: 15.5px; line-height: 1.65; }
        .bs-guide-note .bs-guide-note-title { font-weight: 700; color: #1a202c; margin-bottom: 4px; }
        .bs-guide-formula {
          margin: 18px 0; padding-left: 24px;
          font-family: var(--font-family-mono, ui-monospace, Menlo, monospace);
          font-size: 14.5px; line-height: 1.6; color: #1a202c; overflow-x: auto;
        }
        .bs-guide-table-wrap { margin: 18px 0 24px; overflow-x: auto; }
        .bs-guide table { width: 100%; border-collapse: collapse; font-size: 14.5px; line-height: 1.5; }
        .bs-guide caption {
          caption-side: top; text-align: left; padding: 0 0 6px;
          font-size: 14px; font-weight: 600; color: #4a5568;
        }
        .bs-guide th, .bs-guide td {
          padding: 8px 12px 8px 0; text-align: left; vertical-align: top;
          border-bottom: 1px solid #e2e8f0; color: #2d3748;
        }
        .bs-guide thead th {
          font-size: 13.5px; font-weight: 600; color: #4a5568;
          border-top: 1px solid #a0aec0; border-bottom: 1px solid #a0aec0; white-space: nowrap;
        }
        .bs-guide tbody th { font-weight: 600; color: #1a202c; min-width: 110px; }
        .bs-guide tbody tr:last-child th,
        .bs-guide tbody tr:last-child td { border-bottom: 1px solid #a0aec0; }
        .bs-guide-end {
          margin-top: 48px; padding-top: 20px; border-top: 1px solid #cbd5e0;
        }
        .bs-guide-end h2 { margin: 0 0 6px; font-size: 1.2rem; color: #1a202c; }
        .bs-guide-end p { margin: 0 0 14px; font-size: 15.5px; line-height: 1.6; color: #4a5568; }
        .bs-guide-end .bs-guide-more { margin: 22px 0 0; font-size: 15px; line-height: 1.6; color: #4a5568; }
        .bs-guide-more a { color: #2b6cb0; }
        @media (max-width: 640px) {
          .bs-guide { padding: 24px 16px 48px; }
          .bs-guide h1 { font-size: 1.75rem; }
          .bs-guide-lede { font-size: 1.05rem; }
          .bs-guide-toc ol { columns: 1; }
          .bs-guide-section h2 { font-size: 1.3rem; margin-top: 36px; }
          .bs-guide th, .bs-guide td { padding-right: 10px; }
          /* Wide tables keep readable columns and scroll sideways instead. */
          .bs-guide .bs-guide-table-wide { min-width: 560px; }
        }
      `}</style>

      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/game">BankCEO</Link>
        <span className="separator">/</span>
        <span>{guide.navLabel}</span>
      </nav>

      <article>
        <header>
          <h1>{guide.title}</h1>
          <p className="bs-guide-lede">{guide.lede}</p>
          <Link to="/game/BankCEO" className="bs-guide-play">Play BankCEO</Link>
        </header>

        <nav className="bs-guide-toc" aria-labelledby="bs-guide-toc-title">
          <h2 id="bs-guide-toc-title">On this page</h2>
          <ol>
            {guide.sections.map((section) => (
              <li key={section.id}><a href={`#${section.id}`}>{section.heading}</a></li>
            ))}
          </ol>
        </nav>

        {guide.sections.map((section) => (
          <section key={section.id} id={section.id} className="bs-guide-section">
            <h2>{section.heading}</h2>
            {section.blocks.map((block, i) => <Block key={i} block={block} />)}
          </section>
        ))}
      </article>

      <div className="bs-guide-end">
        <h2>Play BankCEO</h2>
        <p>BankCEO is free and runs in your browser. There is no signup, and your game saves as you go.</p>
        <Link to="/game/BankCEO" className="bs-guide-play">Start a game</Link>
        <p className="bs-guide-more">
          Also see the {others.map((g) => <Link key={g.slug} to={g.path}>{g.navLabel}</Link>)}, the{' '}
          <Link to="/game">BankCEO home page</Link> and the <Link to="/game/fake-bank-names">Fake Bank Names</Link> list.
        </p>
      </div>
    </div>
  );
}

export default GameGuide;

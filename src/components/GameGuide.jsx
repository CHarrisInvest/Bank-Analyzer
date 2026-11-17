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
        .bs-guide { max-width: 800px; margin: 0 auto; padding: 40px 24px 64px; }
        .bs-guide .breadcrumb { margin-bottom: 22px; }
        .bs-guide-eyebrow {
          font-size: 13px; letter-spacing: 0.04em;
          color: #c98c3b; font-weight: 600; margin: 0 0 12px;
        }
        .bs-guide h1 {
          font-size: 2.25rem; line-height: 1.12; margin: 0 0 16px;
          letter-spacing: -0.02em; color: #1a202c;
        }
        .bs-guide-lede {
          font-size: 1.125rem; line-height: 1.6; color: #4a5568; margin: 0 0 28px;
        }
        .bs-guide-play {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 13px 24px; border-radius: 12px;
          background: linear-gradient(135deg, #f3b561 0%, #c98c3b 100%);
          color: #1a1408; font-weight: 700; font-size: 16px;
          text-decoration: none; letter-spacing: -0.01em;
          box-shadow: 0 6px 20px rgba(243,181,97,0.28);
          transition: transform 0.12s, box-shadow 0.2s;
        }
        .bs-guide-play:hover { transform: translateY(-1px); box-shadow: 0 10px 26px rgba(243,181,97,0.38); }
        .bs-guide-toc {
          margin: 32px 0 8px; padding: 18px 22px;
          border: 1px solid #e2e8f0; border-radius: 12px; background: #fafbfc;
        }
        .bs-guide-toc h2 {
          margin: 0 0 10px; font-size: 13px; font-weight: 600;
          letter-spacing: 0.04em; color: #718096;
        }
        .bs-guide-toc ol {
          margin: 0; padding-left: 20px; columns: 2; column-gap: 32px;
          font-size: 14.5px; line-height: 1.5;
        }
        .bs-guide-toc li { margin-bottom: 6px; break-inside: avoid; }
        .bs-guide-toc a { color: #2b6cb0; text-decoration: none; }
        .bs-guide-toc a:hover { text-decoration: underline; }
        .bs-guide-section { scroll-margin-top: 80px; }
        .bs-guide-section h2 {
          font-size: 1.5rem; line-height: 1.25; letter-spacing: -0.01em;
          color: #1a365d; margin: 48px 0 14px;
          padding-top: 28px; border-top: 1px solid #e2e8f0;
        }
        .bs-guide-section h3 {
          font-size: 1.1rem; line-height: 1.3; color: #2d3748; margin: 28px 0 8px;
        }
        .bs-guide-section p,
        .bs-guide-section li { font-size: 16px; line-height: 1.7; color: #2d3748; }
        .bs-guide-section p { margin: 0 0 16px; }
        .bs-guide-section ul,
        .bs-guide-section ol { margin: 0 0 18px; padding-left: 24px; }
        .bs-guide-section li { margin-bottom: 8px; }
        .bs-guide-section a { color: #2b6cb0; }
        .bs-guide-section strong { color: #1a202c; }
        .bs-guide-note {
          margin: 22px 0; padding: 16px 20px; border-radius: 10px;
          background: #fffaf2; border: 1px solid #f1dfc2; border-left: 4px solid #c98c3b;
        }
        .bs-guide-note p { margin: 0; font-size: 15px; line-height: 1.6; }
        .bs-guide-note .bs-guide-note-title { font-weight: 700; color: #1a202c; margin-bottom: 4px; }
        .bs-guide-formula {
          margin: 18px 0; padding: 14px 18px; border-radius: 10px;
          background: #f7fafc; border: 1px solid #e2e8f0;
          font-family: var(--font-family-mono, ui-monospace, Menlo, monospace);
          font-size: 14.5px; line-height: 1.5; color: #1a365d; overflow-x: auto;
        }
        .bs-guide-table-wrap {
          margin: 18px 0 22px; overflow-x: auto;
          border: 1px solid #e2e8f0; border-radius: 10px;
        }
        .bs-guide table { width: 100%; border-collapse: collapse; font-size: 14.5px; line-height: 1.5; }
        .bs-guide caption {
          caption-side: top; text-align: left; padding: 10px 14px;
          font-size: 13px; font-weight: 600; color: #4a5568;
          background: #fafbfc; border-bottom: 1px solid #e2e8f0;
        }
        .bs-guide th, .bs-guide td {
          padding: 10px 14px; text-align: left; vertical-align: top;
          border-bottom: 1px solid #edf2f7; color: #2d3748;
        }
        .bs-guide thead th {
          font-size: 13px; font-weight: 600; color: #4a5568;
          background: #f7fafc; white-space: nowrap;
        }
        .bs-guide tbody th { font-weight: 600; color: #1a202c; min-width: 120px; }
        .bs-guide tbody tr:last-child th, .bs-guide tbody tr:last-child td { border-bottom: 0; }
        .bs-guide-end {
          margin-top: 52px; padding: 26px 28px; border-radius: 14px;
          background: #0d1218; color: #eef2f6;
          display: flex; flex-wrap: wrap; align-items: center; gap: 18px 28px;
        }
        .bs-guide-end-body { flex: 1 1 280px; }
        .bs-guide-end h2 { margin: 0 0 6px; font-size: 1.25rem; color: #eef2f6; letter-spacing: -0.01em; }
        .bs-guide-end p { margin: 0; font-size: 14.5px; line-height: 1.55; color: #9aa7b8; }
        .bs-guide-more {
          margin-top: 28px; display: flex; flex-wrap: wrap; gap: 12px 24px; font-size: 14.5px;
        }
        .bs-guide-more a { color: #c98c3b; text-decoration: none; font-weight: 500; }
        .bs-guide-more a:hover { text-decoration: underline; }
        @media (max-width: 640px) {
          .bs-guide { padding: 28px 16px 48px; }
          .bs-guide h1 { font-size: 1.8rem; }
          .bs-guide-lede { font-size: 1.05rem; }
          .bs-guide-toc ol { columns: 1; }
          .bs-guide-section h2 { font-size: 1.3rem; margin-top: 40px; padding-top: 24px; }
          .bs-guide th, .bs-guide td { padding: 9px 11px; }
          /* Wide tables keep readable columns and scroll sideways instead. */
          .bs-guide .bs-guide-table-wide { min-width: 560px; }
          .bs-guide-end { padding: 22px 18px; }
        }
      `}</style>

      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/game">BankCEO</Link>
        <span className="separator">/</span>
        <span>{guide.navLabel}</span>
      </nav>

      <article>
        <header>
          <p className="bs-guide-eyebrow">BankCEO · Bank Management Simulation</p>
          <h1>{guide.title}</h1>
          <p className="bs-guide-lede">{guide.lede}</p>
          <Link to="/game/BankCEO" className="bs-guide-play">
            Play BankCEO <span aria-hidden="true">→</span>
          </Link>
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
        <div className="bs-guide-end-body">
          <h2>Ready to run the bank?</h2>
          <p>BankCEO is free and plays in your browser. No signup, and your game saves as you go.</p>
        </div>
        <Link to="/game/BankCEO" className="bs-guide-play">
          Play BankCEO <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="bs-guide-more">
        {others.map((g) => <Link key={g.slug} to={g.path}>{g.navLabel} →</Link>)}
        <Link to="/game">BankCEO home →</Link>
        <Link to="/game/fake-bank-names">Fake Bank Names →</Link>
      </div>
    </div>
  );
}

export default GameGuide;

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
      return <ol className="bs-guide-steps">{block.items.map((item, i) => <li key={i}><Inline text={item} /></li>)}</ol>;
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
        /* Built from BankSift's own article patterns: white reading panel on the
           page background, navy step numbers, small radii, no shadows. */
        .bs-guide { max-width: 860px; margin: 0 auto; padding: 32px 24px 64px; }
        .bs-guide .breadcrumb { margin-bottom: 16px; }
        .bs-guide-panel {
          background: #fff; border: 1px solid #e2e8f0; border-radius: 6px;
          padding: 36px 44px 40px;
        }
        .bs-guide-eyebrow {
          font-size: 14px; font-weight: 600; color: #1a365d; margin: 0 0 8px;
        }
        .bs-guide h1 {
          font-size: 2.1rem; line-height: 1.15; margin: 0 0 14px; color: #1a202c;
        }
        .bs-guide-lede {
          font-size: 1.125rem; line-height: 1.65; color: #4a5568; margin: 0 0 22px;
        }
        .bs-guide-play {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 11px 20px; border-radius: 6px;
          background: #1a365d; color: #fff; font-weight: 600; font-size: 15px;
          text-decoration: none; transition: background 0.15s;
        }
        .bs-guide-play:hover { background: #2c5282; }

        /* Contents */
        .bs-guide-toc {
          margin: 30px 0 4px; padding: 18px 22px 12px;
          background: #f7fafc; border: 1px solid #e2e8f0; border-radius: 6px;
        }
        .bs-guide-toc h2 {
          margin: 0 0 10px; font-size: 15px; font-weight: 700; color: #1a365d;
        }
        .bs-guide-toc ol {
          margin: 0; padding: 0; list-style: none; counter-reset: toc;
          columns: 2; column-gap: 32px; font-size: 15px; line-height: 1.45;
        }
        .bs-guide-toc li {
          counter-increment: toc; break-inside: avoid;
          display: flex; gap: 10px; margin-bottom: 8px;
        }
        .bs-guide-toc li::before {
          content: counter(toc); flex: 0 0 18px; text-align: right;
          font-variant-numeric: tabular-nums; color: #718096; font-size: 14px;
        }
        .bs-guide-toc a { color: #2b6cb0; text-decoration: none; }
        .bs-guide-toc a:hover { text-decoration: underline; }

        /* Sections */
        .bs-guide-section { scroll-margin-top: 80px; }
        .bs-guide-section h2 {
          font-size: 1.45rem; line-height: 1.25; color: #1a365d;
          margin: 40px 0 14px; padding-top: 32px; border-top: 1px solid #e2e8f0;
        }
        .bs-guide-section h3 {
          font-size: 1.1rem; line-height: 1.3; color: #1a202c; margin: 28px 0 8px;
        }
        .bs-guide-section p,
        .bs-guide-section li { font-size: 16px; line-height: 1.7; color: #2d3748; }
        .bs-guide-section p { margin: 0 0 16px; }
        .bs-guide-section ul { margin: 0 0 18px; padding-left: 22px; }
        .bs-guide-section ul li { margin-bottom: 8px; padding-left: 2px; }
        .bs-guide-section ul li::marker { color: #2b6cb0; }
        .bs-guide-section a { color: #2b6cb0; }
        .bs-guide-section strong { color: #1a202c; }

        /* Numbered steps: navy number markers, as on the Screener Guide */
        .bs-guide-section ol.bs-guide-steps {
          list-style: none; counter-reset: step; margin: 6px 0 20px; padding: 0;
        }
        .bs-guide-steps li {
          counter-increment: step; position: relative;
          padding-left: 44px; margin-bottom: 14px; min-height: 28px;
        }
        .bs-guide-steps li::before {
          content: counter(step); position: absolute; left: 0; top: 0;
          width: 28px; height: 28px; border-radius: 50%;
          background: #1a365d; color: #fff; font-size: 14px; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
        }

        /* Notes */
        .bs-guide-note {
          margin: 24px 0; padding: 16px 20px;
          background: #f7fafc; border: 1px solid #e2e8f0; border-radius: 6px;
        }
        .bs-guide-note p { margin: 0; font-size: 15.5px; line-height: 1.65; }
        .bs-guide-note .bs-guide-note-title { font-weight: 700; color: #1a365d; margin-bottom: 4px; }

        /* Formula: same treatment as the formula on the metric pages */
        .bs-guide-formula {
          margin: 18px 0 20px; padding: 16px 20px;
          background: linear-gradient(135deg, rgba(26, 54, 93, 0.06), rgba(43, 108, 176, 0.1));
          border: 1px solid rgba(43, 108, 176, 0.18); border-radius: 6px;
          font-family: var(--font-family-mono, ui-monospace, Menlo, monospace);
          font-size: 14.5px; font-weight: 600; line-height: 1.5; color: #0f2942; overflow-x: auto;
        }

        /* Tables */
        .bs-guide-table-wrap {
          margin: 18px 0 24px; overflow-x: auto;
          border: 1px solid #e2e8f0; border-radius: 6px;
        }
        .bs-guide table { width: 100%; border-collapse: collapse; font-size: 14.5px; line-height: 1.5; }
        .bs-guide caption {
          caption-side: top; text-align: left; padding: 11px 14px;
          font-size: 14px; font-weight: 700; color: #1a365d;
          border-bottom: 1px solid #e2e8f0;
        }
        .bs-guide th, .bs-guide td {
          padding: 10px 14px; text-align: left; vertical-align: top;
          border-bottom: 1px solid #edf2f7; color: #2d3748;
        }
        .bs-guide thead th {
          font-size: 13px; font-weight: 600; color: #4a5568;
          background: #f7fafc; border-bottom: 1px solid #e2e8f0; white-space: nowrap;
        }
        .bs-guide tbody tr:nth-child(even) th,
        .bs-guide tbody tr:nth-child(even) td { background: #fbfcfd; }
        .bs-guide tbody th { font-weight: 600; color: #1a202c; min-width: 110px; }
        .bs-guide tbody tr:last-child th,
        .bs-guide tbody tr:last-child td { border-bottom: 0; }

        /* Closing */
        .bs-guide-end {
          margin-top: 24px; padding: 24px 28px;
          background: #fff; border: 1px solid #e2e8f0; border-radius: 6px;
          display: flex; flex-wrap: wrap; align-items: center; gap: 16px 28px;
        }
        .bs-guide-end-body { flex: 1 1 300px; }
        .bs-guide-end h2 { margin: 0 0 4px; font-size: 1.2rem; color: #1a365d; }
        .bs-guide-end p { margin: 0; font-size: 15px; line-height: 1.6; color: #4a5568; }
        .bs-guide-more {
          margin-top: 18px; display: flex; flex-wrap: wrap; gap: 10px 24px; font-size: 15px;
        }
        .bs-guide-more a { color: #2b6cb0; text-decoration: none; font-weight: 500; }
        .bs-guide-more a:hover { text-decoration: underline; }

        @media (max-width: 640px) {
          .bs-guide { padding: 20px 12px 48px; }
          .bs-guide-panel { padding: 24px 18px 28px; }
          .bs-guide h1 { font-size: 1.75rem; }
          .bs-guide-lede { font-size: 1.05rem; }
          .bs-guide-toc { padding: 16px 16px 10px; }
          .bs-guide-toc ol { columns: 1; }
          .bs-guide-section h2 { font-size: 1.3rem; margin-top: 32px; padding-top: 26px; }
          .bs-guide th, .bs-guide td { padding: 9px 11px; }
          /* Wide tables keep readable columns and scroll sideways instead. */
          .bs-guide .bs-guide-table-wide { min-width: 560px; }
          .bs-guide-end { padding: 20px 18px; }
          .bs-guide-formula { padding: 12px 14px; font-size: 13.5px; }
        }
      `}</style>

      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/game">BankCEO</Link>
        <span className="separator">/</span>
        <span>{guide.navLabel}</span>
      </nav>

      <article className="bs-guide-panel">
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

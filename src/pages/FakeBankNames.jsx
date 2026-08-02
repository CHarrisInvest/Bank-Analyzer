import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';

const DOWNLOAD_URL = `${import.meta.env.BASE_URL}downloads/fake-bank-names.xlsx`;

// A curated taste of the list — the full spreadsheet has thousands more.
const PREVIEW = [
  ['JPMorgan Chase', 'JP Mulligan Chaser'],
  ['Bank of America', 'Bank of Amnesia'],
  ['Citigroup', 'Sitting Group'],
  ['Wells Fargo', 'Wells Far-Gone'],
  ['U.S. Bancorp', 'U.S. Bankrupt'],
  ['Capital One', 'Capital None'],
  ['Goldman Sachs', 'Silverman Sacks'],
  ['Morgan Stanley', 'Morgan Stanky'],
  ['American Express', 'American Excess'],
  ['Truist Financial', 'Distruest Financial'],
  ['Huntington', 'Hauntington'],
  ['Synchrony Financial', 'Sinkrony Financial'],
];

function FakeBankNames() {
  return (
    <div className="page bs-fbn">
      <SEO
        title="Fake Bank Names | A Parody List of Every U.S. Bank"
        description="A companion to BankCEO: a downloadable spreadsheet of parody names for U.S. bank holding companies and their banks. From JP Mulligan Chaser to Bank of Amnesia — filter, sort, and share."
        canonical="/game/fake-bank-names"
      />

      <style>{`
        .bs-fbn { max-width: 820px; margin: 0 auto; padding: 48px 24px 64px; }
        .bs-fbn .bs-fbn-eyebrow {
          font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase;
          color: #c98c3b; font-weight: 600; margin: 0 0 14px;
        }
        .bs-fbn h1 { font-size: 2.4rem; line-height: 1.1; margin: 0 0 16px; letter-spacing: -0.02em; }
        .bs-fbn .bs-fbn-lede {
          font-size: 1.1rem; line-height: 1.6; color: #4a5568; margin: 0 0 32px;
        }
        .bs-fbn-card {
          display: flex; flex-wrap: wrap; align-items: center; gap: 20px 28px;
          padding: 24px 28px; border: 1px solid #e2e8f0; border-radius: 16px;
          background: linear-gradient(135deg, #fffaf2 0%, #fdf3e3 100%);
          box-shadow: 0 6px 22px rgba(201,140,59,0.10);
        }
        .bs-fbn-card .bs-fbn-card-body { flex: 1 1 260px; min-width: 240px; }
        .bs-fbn-card h2 { margin: 0 0 6px; font-size: 1.15rem; color: #1a365d; letter-spacing: -0.01em; }
        .bs-fbn-card p { margin: 0; font-size: 14px; line-height: 1.5; color: #64748b; }
        .bs-fbn-dl {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 16px 28px; border-radius: 12px;
          background: linear-gradient(135deg, #f3b561 0%, #c98c3b 100%);
          color: #1a1408; font-weight: 700; font-size: 16px;
          text-decoration: none; letter-spacing: -0.01em; white-space: nowrap;
          box-shadow: 0 6px 20px rgba(243,181,97,0.30);
          transition: transform 0.12s, box-shadow 0.2s;
        }
        .bs-fbn-dl:hover { transform: translateY(-1px); box-shadow: 0 10px 26px rgba(243,181,97,0.40); }
        .bs-fbn-dl svg { width: 18px; height: 18px; }
        .bs-fbn-meta { margin-top: 12px; font-size: 12.5px; color: #94a3b8; }

        .bs-fbn-preview { margin-top: 44px; }
        .bs-fbn-preview h3 { font-size: 1.05rem; color: #1a365d; margin: 0 0 14px; }
        .bs-fbn-table { width: 100%; border-collapse: collapse; font-size: 14.5px; }
        .bs-fbn-table th {
          text-align: left; padding: 10px 14px; background: #1a365d; color: #fff;
          font-weight: 600; font-size: 13px; letter-spacing: 0.02em;
        }
        .bs-fbn-table th:first-child { border-radius: 8px 0 0 0; }
        .bs-fbn-table th:last-child { border-radius: 0 8px 0 0; }
        .bs-fbn-table td { padding: 10px 14px; border-bottom: 1px solid #edf1f5; }
        .bs-fbn-table tr:nth-child(even) td { background: #fafbfc; }
        .bs-fbn-table td.fake { color: #b45309; font-weight: 600; }
        .bs-fbn-preview .bs-fbn-more { margin-top: 14px; font-size: 13.5px; color: #718096; }

        .bs-fbn-note {
          margin-top: 40px; padding: 16px 20px; border-left: 3px solid #e2e8f0;
          color: #64748b; font-size: 13px; line-height: 1.55; background: #f8fafc; border-radius: 0 8px 8px 0;
        }
        .bs-fbn-back {
          display: inline-block; margin-top: 32px; color: #c98c3b;
          text-decoration: none; font-weight: 500;
        }
        .bs-fbn-back:hover { text-decoration: underline; }
        @media (max-width: 640px) {
          .bs-fbn { padding: 32px 16px 48px; }
          .bs-fbn h1 { font-size: 1.9rem; }
          .bs-fbn-dl { width: 100%; justify-content: center; }
        }
      `}</style>

      <p className="bs-fbn-eyebrow">BankCEO · Companion</p>
      <h1>Fake Bank Names</h1>
      <p className="bs-fbn-lede">
        You can run a bank in <Link to="/game">BankCEO</Link> — now meet the whole industry with
        the names it deserves. This is a spreadsheet of parody names for U.S. bank holding
        companies and every bank beneath them, mapped alongside their real names, home states,
        total assets, and total deposits. Filtering is built in, so you can hunt down your own
        bank or sort the giants to the top.
      </p>

      <div className="bs-fbn-card">
        <div className="bs-fbn-card-body">
          <h2>Download the spreadsheet</h2>
          <p>Excel workbook (.xlsx) · 8,600+ banks &amp; holding companies · filter and sort ready to go.</p>
        </div>
        <a className="bs-fbn-dl" href={DOWNLOAD_URL} download>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
               strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 3v12" /><path d="m7 10 5 5 5-5" /><path d="M5 21h14" />
          </svg>
          Download .xlsx
        </a>
        <div style={{ flexBasis: '100%' }} className="bs-fbn-meta">
          Prefer to browse first? Here's a taste of what's inside.
        </div>
      </div>

      <div className="bs-fbn-preview">
        <h3>A few favorites</h3>
        <table className="bs-fbn-table">
          <thead>
            <tr>
              <th>Real name</th>
              <th>Fake bank name</th>
            </tr>
          </thead>
          <tbody>
            {PREVIEW.map(([real, fake]) => (
              <tr key={real}>
                <td>{real}</td>
                <td className="fake">{fake}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="bs-fbn-more">
          …and thousands more in the full download, including every community bank in the country.
        </p>
      </div>

      <p className="bs-fbn-note">
        For entertainment only. The parody names are fictional wordplay and are not affiliated with,
        endorsed by, or representative of any real financial institution. The list of real bank and
        holding-company names, states, and figures is drawn from public regulatory data; asset and
        deposit figures are shown in thousands of dollars.
      </p>

      <Link to="/game" className="bs-fbn-back">← Back to the Game</Link>
    </div>
  );
}

export default FakeBankNames;

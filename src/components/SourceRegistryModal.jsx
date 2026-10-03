'use client';

import React from 'react';
import { X, ShieldCheck, ExternalLink, Rss, Globe, Radio } from 'lucide-react';

const SOURCES_LIST = [
  { name: 'CBDT (Income Tax Dept)', country: 'IN', type: 'Official Authority', level: 'P0', method: 'Web Listing', url: 'https://incometaxindia.gov.in', trust: 100 },
  { name: 'CBIC (GST & Customs)', country: 'IN', type: 'Official Authority', level: 'P0', method: 'Web Listing', url: 'https://www.cbic.gov.in', trust: 100 },
  { name: 'Reserve Bank of India (RBI)', country: 'IN', type: 'Central Bank', level: 'P0', method: 'RSS Feed', url: 'https://www.rbi.org.in', trust: 100 },
  { name: 'SEBI (Securities Board)', country: 'IN', type: 'Market Regulator', level: 'P0', method: 'Web Listing', url: 'https://www.sebi.gov.in', trust: 100 },
  { name: 'Ministry of Corporate Affairs (MCA)', country: 'IN', type: 'Government Body', level: 'P0', method: 'Circulars', url: 'https://www.mca.gov.in', trust: 95 },
  { name: 'National Stock Exchange (NSE)', country: 'IN', type: 'Exchange', level: 'P0', method: 'Circulars', url: 'https://www.nseindia.com', trust: 95 },
  { name: 'BSE India', country: 'IN', type: 'Exchange', level: 'P0', method: 'Notices', url: 'https://www.bseindia.com', trust: 95 },
  { name: 'Ministry of Finance (PIB)', country: 'IN', type: 'Government Body', level: 'P0', method: 'RSS Feed', url: 'https://pib.gov.in', trust: 100 },
  { name: 'Federal Reserve System', country: 'US', type: 'Central Bank', level: 'P0', method: 'RSS Feed', url: 'https://www.federalreserve.gov', trust: 100 },
  { name: 'Securities & Exchange Commission (SEC)', country: 'US', type: 'Market Regulator', level: 'P0', method: 'RSS Feed', url: 'https://www.sec.gov', trust: 100 },
  { name: 'Internal Revenue Service (IRS)', country: 'US', type: 'Tax Authority', level: 'P0', method: 'News Releases', url: 'https://www.irs.gov', trust: 100 },
  { name: 'US Department of the Treasury', country: 'US', type: 'Fiscal Authority', level: 'P0', method: 'RSS Feed', url: 'https://home.treasury.gov', trust: 100 },
  { name: 'The Economic Times', country: 'IN', type: 'Financial Media', level: 'P1', method: 'RSS Feed', url: 'https://economictimes.indiatimes.com', trust: 90 },
  { name: 'Mint / Livemint', country: 'IN', type: 'Financial Media', level: 'P1', method: 'RSS Feed', url: 'https://www.livemint.com', trust: 90 },
  { name: 'Business Standard', country: 'IN', type: 'Financial Media', level: 'P1', method: 'RSS Feed', url: 'https://www.business-standard.com', trust: 90 },
  { name: 'Reuters Finance', country: 'GLOBAL', type: 'Global News Agency', level: 'P1', method: 'RSS Feed', url: 'https://www.reuters.com', trust: 95 },
  { name: 'GDELT Global Events', country: 'GLOBAL', type: 'Event Discovery', level: 'P3', method: 'REST API', url: 'https://www.gdeltproject.org', trust: 80 }
];

export default function SourceRegistryModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="title-group">
            <ShieldCheck size={20} style={{ color: 'var(--brand-primary)' }} />
            <div>
              <h2 className="modal-title">Source Registry & Attribution Directory</h2>
              <span className="modal-sub">17 Verified Official Authorities, Regulators & Media Desks</span>
            </div>
          </div>
          <button onClick={onClose} className="close-btn" title="Close">
            <X size={18} />
          </button>
        </div>

        <p className="registry-desc">
          FIN-X adheres to strict ethical aggregation standards: we do not copy full articles, we summarize official regulatory circulars in 2 lines, and we always link directly to the authoritative original publication.
        </p>

        {/* Wikipedia Style Table */}
        <div className="sources-table-wrapper">
          <table className="sources-table">
            <thead>
              <tr>
                <th>Source Name</th>
                <th>Region</th>
                <th>Authority</th>
                <th>Collection</th>
                <th>Trust Score</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {SOURCES_LIST.map((s, idx) => (
                <tr key={idx}>
                  <td className="source-name-cell">
                    <strong>{s.name}</strong>
                    <span className="source-type-sub">{s.type}</span>
                  </td>
                  <td>
                    <span className="region-chip">
                      {s.country === 'IN' ? '🇮🇳 India' : s.country === 'US' ? '🇺🇸 US' : '🌍 Global'}
                    </span>
                  </td>
                  <td>
                    <span className={`level-pill ${s.level === 'P0' ? 'p0' : s.level === 'P1' ? 'p1' : 'p3'}`}>
                      {s.level}
                    </span>
                  </td>
                  <td className="method-cell">{s.method}</td>
                  <td className="trust-cell">
                    <span className="trust-bar-val">{s.trust}%</span>
                  </td>
                  <td>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="external-source-link">
                      <ExternalLink size={13} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="modal-footer">
          <span className="footer-info">Updated daily • 100% Free-Tier Architecture</span>
          <button onClick={onClose} className="btn-close-action">Close Directory</button>
        </div>
      </div>

      <style jsx>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .modal-card {
          width: 100%;
          max-width: 820px;
          background: #ffffff;
          border: 1px solid #a2a9b1;
          border-radius: var(--radius);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.15rem 1.4rem;
          border-bottom: 1px solid #c8ccd1;
          background: #f8faf9;
        }

        .title-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .modal-title {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--brand-primary);
        }

        .modal-sub {
          font-size: 0.73rem;
          color: var(--text-secondary);
        }

        .close-btn {
          color: var(--text-muted);
          padding: 4px;
          border: 1px solid transparent;
          border-radius: var(--radius-sm);
          background: transparent;
        }

        .close-btn:hover {
          color: var(--text-primary);
          border-color: #c8ccd1;
        }

        .registry-desc {
          padding: 0.95rem 1.4rem;
          font-size: 0.78rem;
          color: var(--text-secondary);
          line-height: 1.5;
          background: #f8faf9;
          border-bottom: 1px solid #eaecf0;
        }

        .sources-table-wrapper {
          overflow-x: auto;
          padding: 0.5rem 1.4rem 1rem;
        }

        .sources-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.76rem;
          border: 1px solid #c8ccd1;
        }

        .sources-table th {
          background: #f8faf9;
          padding: 0.55rem 0.65rem;
          text-align: left;
          font-weight: 700;
          color: var(--text-primary);
          border-bottom: 1px solid #a2a9b1;
          border-right: 1px solid #eaecf0;
          font-size: 0.72rem;
          text-transform: uppercase;
        }

        .sources-table td {
          padding: 0.55rem 0.65rem;
          border-bottom: 1px solid #eaecf0;
          border-right: 1px solid #eaecf0;
          color: var(--text-secondary);
        }

        .sources-table tr:hover {
          background: #f0f7f3;
        }

        .source-name-cell {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
        }

        .source-name-cell strong {
          color: var(--text-primary);
        }

        .source-type-sub {
          font-size: 0.65rem;
          color: var(--text-muted);
        }

        .region-chip {
          display: inline-block;
          font-size: 0.7rem;
        }

        .level-pill {
          display: inline-block;
          padding: 1px 5px;
          border-radius: var(--radius-sm);
          font-weight: 700;
          font-size: 0.65rem;
        }

        .level-pill.p0 {
          background: #f0f7f3;
          color: var(--brand-primary);
          border: 1px solid #a8cfb8;
        }

        .level-pill.p1 {
          background: #eff6ff;
          color: #1d4ed8;
          border: 1px solid #bfdbfe;
        }

        .level-pill.p3 {
          background: #f8fafc;
          color: #64748b;
          border: 1px solid #e2e8f0;
        }

        .trust-bar-val {
          font-weight: 700;
          color: var(--brand-primary);
        }

        .external-source-link {
          color: var(--brand-primary);
          display: inline-flex;
          align-items: center;
          padding: 2px;
        }

        .modal-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.95rem 1.4rem;
          border-top: 1px solid #c8ccd1;
          background: #f8faf9;
        }

        .footer-info {
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        .btn-close-action {
          padding: 0.4rem 0.85rem;
          background: var(--brand-primary);
          color: #ffffff;
          border: 1px solid #16382b;
          border-radius: var(--radius);
          font-size: 0.78rem;
          font-weight: 600;
          transition: all 0.15s ease;
        }

        .btn-close-action:hover {
          background: var(--brand-secondary);
        }
      `}</style>
    </div>
  );
}

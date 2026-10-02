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
      <div className="modal-card glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="title-group">
            <ShieldCheck size={20} style={{ color: '#10b981' }} />
            <div>
              <h2 className="modal-title">Source Registry & Attribution Directory</h2>
              <span className="modal-sub">17 Verified Official Authorities, Regulators & Media Outlets</span>
            </div>
          </div>
          <button onClick={onClose} className="close-btn" title="Close">
            <X size={18} />
          </button>
        </div>

        <p className="registry-desc">
          FIN-X adheres to strict ethical aggregation standards: we do not scrape behind paywalls, we do not copy full articles, and we always link directly to the authoritative original source.
        </p>

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
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .modal-card {
          width: 100%;
          max-width: 760px;
          background: #0c111d;
          border: 1px solid var(--border-highlight);
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.9);
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
          max-height: 88vh;
        }

        .modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid var(--border-subtle);
        }

        .title-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .modal-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #ffffff;
        }

        .modal-sub {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .close-btn {
          color: var(--text-muted);
          padding: 4px;
          border-radius: 6px;
        }

        .close-btn:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.1);
        }

        .registry-desc {
          font-size: 0.78rem;
          line-height: 1.45;
          color: var(--text-secondary);
          background: rgba(16, 185, 129, 0.05);
          border: 1px solid rgba(16, 185, 129, 0.2);
          padding: 0.65rem 0.85rem;
          border-radius: 8px;
        }

        .sources-table-wrapper {
          overflow-y: auto;
          max-height: 48vh;
          border: 1px solid var(--border-subtle);
          border-radius: 8px;
        }

        .sources-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.78rem;
        }

        .sources-table th {
          background: rgba(255, 255, 255, 0.04);
          padding: 0.65rem 0.85rem;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.68rem;
          letter-spacing: 0.04em;
          border-bottom: 1px solid var(--border-subtle);
          position: sticky;
          top: 0;
          backdrop-filter: blur(8px);
        }

        .sources-table td {
          padding: 0.65rem 0.85rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          color: var(--text-secondary);
        }

        .sources-table tr:hover td {
          background: rgba(255, 255, 255, 0.02);
        }

        .source-name-cell {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .source-name-cell strong {
          color: #ffffff;
        }

        .source-type-sub {
          font-size: 0.68rem;
          color: var(--text-muted);
        }

        .region-chip {
          font-size: 0.75rem;
        }

        .level-pill {
          font-size: 0.65rem;
          font-weight: 700;
          padding: 0.1rem 0.4rem;
          border-radius: 4px;
        }

        .level-pill.p0 {
          background: rgba(16, 185, 129, 0.15);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .level-pill.p1 {
          background: rgba(59, 130, 246, 0.15);
          color: #60a5fa;
          border: 1px solid rgba(59, 130, 246, 0.3);
        }

        .level-pill.p3 {
          background: rgba(100, 116, 139, 0.15);
          color: #94a3b8;
        }

        .method-cell {
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        .trust-cell {
          font-weight: 700;
          color: #10b981;
        }

        .external-source-link {
          color: var(--text-muted);
          display: inline-flex;
          align-items: center;
        }

        .external-source-link:hover {
          color: #38bdf8;
        }

        .modal-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.75rem;
          border-top: 1px solid var(--border-subtle);
        }

        .footer-info {
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        .btn-close-action {
          padding: 0.45rem 1rem;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;
          font-size: 0.8rem;
          font-weight: 600;
          transition: all 0.15s ease;
        }

        .btn-close-action:hover {
          background: rgba(255, 255, 255, 0.15);
        }
      `}</style>
    </div>
  );
}

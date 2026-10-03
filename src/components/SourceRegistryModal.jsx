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
            <ShieldCheck size={20} style={{ color: '#047857' }} />
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
          background: rgba(15, 23, 42, 0.45);
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
          background: #ffffff;
          border: 1px solid rgba(226, 232, 240, 0.95);
          border-radius: 16px;
          padding: 1.6rem;
          box-shadow: 0 25px 60px rgba(15, 23, 42, 0.15);
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
          border-bottom: 1px solid rgba(241, 245, 249, 0.9);
        }

        .title-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .modal-title {
          font-size: 1.1rem;
          font-weight: 800;
          color: #0f172a;
        }

        .modal-sub {
          font-size: 0.75rem;
          color: #64748b;
        }

        .close-btn {
          color: #64748b;
          padding: 4px;
          border-radius: 6px;
        }

        .close-btn:hover {
          color: #0f172a;
          background: #f1f5f9;
        }

        .registry-desc {
          font-size: 0.78rem;
          line-height: 1.45;
          color: #334155;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.2);
          padding: 0.65rem 0.85rem;
          border-radius: 8px;
        }

        .sources-table-wrapper {
          overflow-y: auto;
          max-height: 48vh;
          border: 1px solid rgba(226, 232, 240, 0.9);
          border-radius: 8px;
        }

        .sources-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.78rem;
        }

        .sources-table th {
          background: #f8fafc;
          padding: 0.65rem 0.85rem;
          color: #64748b;
          font-weight: 700;
          text-transform: uppercase;
          font-size: 0.68rem;
          letter-spacing: 0.04em;
          border-bottom: 1px solid rgba(226, 232, 240, 0.9);
          position: sticky;
          top: 0;
          backdrop-filter: blur(8px);
        }

        .sources-table td {
          padding: 0.75rem 0.85rem;
          border-bottom: 1px solid rgba(241, 245, 249, 0.9);
          color: #334155;
        }

        .sources-table tr:hover td {
          background: #f8fafc;
        }

        .source-name-cell {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .source-name-cell strong {
          color: #0f172a;
          font-weight: 700;
        }

        .source-type-sub {
          font-size: 0.7rem;
          color: #64748b;
        }

        .region-chip {
          display: inline-block;
          background: #f1f5f9;
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
          font-size: 0.72rem;
          font-weight: 600;
        }

        .level-pill {
          display: inline-block;
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
          font-size: 0.68rem;
          font-weight: 700;
        }

        .level-pill.p0 {
          background: rgba(16, 185, 129, 0.1);
          color: #047857;
          border: 1px solid rgba(16, 185, 129, 0.25);
        }

        .level-pill.p1 {
          background: rgba(37, 99, 235, 0.1);
          color: #2563eb;
          border: 1px solid rgba(37, 99, 235, 0.25);
        }

        .level-pill.p3 {
          background: rgba(100, 116, 139, 0.1);
          color: #64748b;
        }

        .method-cell {
          color: #64748b;
          font-family: var(--font-mono);
          font-size: 0.72rem;
        }

        .trust-cell {
          font-weight: 700;
          color: #047857;
        }

        .external-source-link {
          color: #2563eb;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 4px;
          transition: all 0.15s ease;
        }

        .external-source-link:hover {
          background: rgba(37, 99, 235, 0.08);
          color: #1d4ed8;
        }

        .modal-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(241, 245, 249, 0.9);
        }

        .footer-info {
          font-size: 0.72rem;
          color: #64748b;
        }

        .btn-close-action {
          padding: 0.45rem 0.95rem;
          background: #f1f5f9;
          color: #334155;
          font-size: 0.78rem;
          font-weight: 600;
          border-radius: 6px;
          transition: all 0.15s ease;
        }

        .btn-close-action:hover {
          background: #e2e8f0;
          color: #0f172a;
        }
      `}</style>
    </div>
  );
}

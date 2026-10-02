'use client';

import React from 'react';
import { ShieldCheck, Activity, ExternalLink } from 'lucide-react';
import { AUTHORITY_WATCH } from '../data/mockData';

export default function AuthorityWatch() {
  return (
    <div className="authority-widget glass-panel">
      <div className="widget-header">
        <div className="widget-title-group">
          <ShieldCheck size={16} style={{ color: '#10b981' }} />
          <h3 className="widget-title">Official Authority Watch</h3>
        </div>
        <span className="live-pill">
          <span className="live-dot" />
          <span>Active</span>
        </span>
      </div>

      <div className="authorities-grid">
        {AUTHORITY_WATCH.map((auth, idx) => (
          <div key={idx} className="auth-card">
            <div className="auth-top">
              <span className="auth-name">{auth.name}</span>
              <span className="auth-flag">{auth.country === 'IN' ? '🇮🇳' : '🇺🇸'}</span>
            </div>

            <div className="auth-bottom">
              <span className="auth-updates">
                <strong>{auth.updatesToday}</strong> items today
              </span>
              <span className="auth-time">{auth.lastUpdate}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="widget-footer">
        <span className="footer-tag">Direct government & regulatory pipes</span>
      </div>

      <style jsx>{`
        .authority-widget {
          padding: 1.15rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .widget-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 0.65rem;
          border-bottom: 1px solid var(--border-subtle);
        }

        .widget-title-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .widget-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.01em;
        }

        .live-pill {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.3);
          padding: 0.12rem 0.45rem;
          border-radius: 9999px;
          font-size: 0.65rem;
          color: #10b981;
          font-weight: 600;
        }

        .live-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 6px #10b981;
        }

        .authorities-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.55rem;
        }

        .auth-card {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          padding: 0.55rem 0.65rem;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.15s ease;
        }

        .auth-card:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.12);
        }

        .auth-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .auth-name {
          font-size: 0.75rem;
          font-weight: 700;
          color: #f1f5f9;
        }

        .auth-flag {
          font-size: 0.75rem;
        }

        .auth-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.65rem;
          color: var(--text-muted);
        }

        .auth-updates strong {
          color: #38bdf8;
        }

        .widget-footer {
          padding-top: 0.35rem;
          border-top: 1px solid var(--border-subtle);
          display: flex;
          justify-content: space-between;
        }

        .footer-tag {
          font-size: 0.68rem;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}

'use client';

import React from 'react';
import { ShieldCheck, Activity, ExternalLink } from 'lucide-react';
import { AUTHORITY_WATCH } from '../data/mockData';

export default function AuthorityWatch() {
  return (
    <div className="authority-widget glass-panel">
      <div className="widget-header">
        <div className="widget-title-group">
          <ShieldCheck size={15} style={{ color: 'var(--brand-primary)' }} />
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
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius);
        }

        .widget-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 0.55rem;
          border-bottom: 1px solid #eaecf0;
        }

        .widget-title-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .widget-title {
          font-family: var(--font-serif);
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--brand-primary);
          letter-spacing: -0.01em;
        }

        .live-pill {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          background: #f0f7f3;
          border: 1px solid #a8cfb8;
          padding: 0.1rem 0.45rem;
          border-radius: var(--radius-sm);
          font-size: 0.65rem;
          color: var(--brand-primary);
          font-weight: 700;
        }

        .live-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--brand-accent);
          box-shadow: 0 0 5px var(--brand-accent);
        }

        .authorities-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
        }

        .auth-card {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          padding: 0.55rem;
          border-radius: var(--radius);
          background: #f8faf9;
          border: 1px solid var(--border-subtle);
          transition: all 0.15s ease;
        }

        .auth-card:hover {
          background: #f0f7f3;
          border-color: var(--brand-primary);
        }

        .auth-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .auth-name {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .auth-flag {
          font-size: 0.75rem;
        }

        .auth-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.68rem;
          color: var(--text-muted);
        }

        .auth-updates strong {
          color: var(--brand-primary);
        }

        .widget-footer {
          padding-top: 0.4rem;
          border-top: 1px solid #eaecf0;
        }

        .footer-tag {
          font-size: 0.68rem;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}

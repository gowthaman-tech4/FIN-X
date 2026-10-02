'use client';

import React from 'react';
import { 
  Sunrise, 
  Sun, 
  Sunset, 
  Flame, 
  ShieldCheck, 
  Sparkles, 
  Clock, 
  Layers 
} from 'lucide-react';
import { DIGEST_SLOTS } from '../data/mockData';

export default function DigestHero({
  activeDigest,
  onSelectDigest,
  activeFilter,
  onSelectFilter,
  totalStoriesCount,
  officialCount
}) {
  return (
    <section className="hero-banner">
      <div className="container">
        <div className="hero-card glass-panel">
          {/* Left Column: Digest Slot Status & Vision */}
          <div className="hero-left">
            <div className="digest-tabs">
              <button
                onClick={() => onSelectDigest('morning')}
                className={`digest-tab ${activeDigest === 'morning' ? 'active' : ''}`}
              >
                <Sunrise size={15} />
                <span>Morning (7 AM)</span>
              </button>
              <button
                onClick={() => onSelectDigest('afternoon')}
                className={`digest-tab ${activeDigest === 'afternoon' ? 'active' : ''}`}
              >
                <Sun size={15} />
                <span>Afternoon (1 PM)</span>
              </button>
              <button
                onClick={() => onSelectDigest('evening')}
                className={`digest-tab ${activeDigest === 'evening' ? 'active' : ''}`}
              >
                <Sunset size={15} />
                <span>Evening (7 PM)</span>
              </button>
            </div>

            <h1 className="hero-heading">
              Financial Intelligence, <span className="hero-gradient">Simplified.</span>
            </h1>

            <p className="hero-subheading">
              No noise, no clickbait, no finance jargon. Every major regulatory decision, tax amendment, and economic change summarized in 2 lines with direct links to official sources.
            </p>

            {/* Metrics Chips */}
            <div className="metrics-row">
              <div className="metric-chip">
                <Layers size={13} className="text-secondary" />
                <span><strong>{totalStoriesCount}</strong> Stories in Digest</span>
              </div>
              <div className="metric-chip">
                <ShieldCheck size={13} style={{ color: '#10b981' }} />
                <span><strong>{officialCount}</strong> Official (P0) Authorities</span>
              </div>
              <div className="metric-chip">
                <Clock size={13} className="text-secondary" />
                <span>~3 Min Total Read</span>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Stream Filter Toggles */}
          <div className="hero-right">
            <div className="filter-panel">
              <span className="filter-title">Filter View:</span>
              <div className="filter-buttons">
                <button
                  onClick={() => onSelectFilter('all')}
                  className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                >
                  All Stories
                </button>
                <button
                  onClick={() => onSelectFilter('must_know')}
                  className={`filter-btn ${activeFilter === 'must_know' ? 'active' : ''}`}
                >
                  <Flame size={13} style={{ color: '#ef4444' }} />
                  <span>Must-Know</span>
                </button>
                <button
                  onClick={() => onSelectFilter('official')}
                  className={`filter-btn ${activeFilter === 'official' ? 'active' : ''}`}
                >
                  <ShieldCheck size={13} style={{ color: '#38bdf8' }} />
                  <span>Official Only</span>
                </button>
              </div>
            </div>

            <div className="why-box">
              <span className="why-tag">💡 Why FIN-X?</span>
              <span className="why-text">
                Instead of checking 10 government websites and news apps every morning, get the full picture here in 3 minutes.
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-banner {
          padding: 1.25rem 0 0.75rem 0;
        }

        .hero-card {
          padding: 1.5rem 1.75rem;
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 2rem;
          align-items: center;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(16, 23, 38, 0.85) 0%, rgba(12, 17, 28, 0.95) 100%);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .hero-card::after {
          content: '';
          position: absolute;
          top: -40%;
          right: -10%;
          width: 320px;
          height: 320px;
          background: radial-gradient(circle, rgba(56, 189, 248, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .hero-left {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .digest-tabs {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border-subtle);
          padding: 3px;
          border-radius: 8px;
          width: fit-content;
        }

        .digest-tab {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.28rem 0.65rem;
          border-radius: 6px;
          font-size: 0.72rem;
          font-weight: 500;
          color: var(--text-secondary);
          transition: all 0.15s ease;
        }

        .digest-tab:hover {
          color: var(--text-primary);
        }

        .digest-tab.active {
          background: rgba(59, 130, 246, 0.2);
          border: 1px solid rgba(59, 130, 246, 0.4);
          color: #60a5fa;
          font-weight: 600;
        }

        .hero-heading {
          font-size: 1.65rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #ffffff;
          line-height: 1.2;
        }

        .hero-gradient {
          background: var(--brand-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subheading {
          font-size: 0.85rem;
          line-height: 1.5;
          color: var(--text-secondary);
          max-width: 580px;
        }

        .metrics-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.65rem;
          margin-top: 0.25rem;
        }

        .metric-chip {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 0.25rem 0.65rem;
          border-radius: 6px;
          font-size: 0.73rem;
          color: var(--text-secondary);
        }

        .metric-chip strong {
          color: var(--text-primary);
        }

        .hero-right {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          justify-content: center;
          background: rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 1.15rem;
          border-radius: 12px;
        }

        .filter-panel {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .filter-title {
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .filter-buttons {
          display: flex;
          gap: 0.4rem;
        }

        .filter-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          padding: 0.4rem 0.65rem;
          border-radius: 8px;
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          transition: all 0.15s ease;
        }

        .filter-btn:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.08);
        }

        .filter-btn.active {
          background: rgba(59, 130, 246, 0.18);
          border-color: rgba(59, 130, 246, 0.5);
          color: #93c5fd;
          font-weight: 600;
        }

        .why-box {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          background: rgba(245, 158, 11, 0.05);
          border: 1px solid rgba(245, 158, 11, 0.2);
          padding: 0.75rem;
          border-radius: 8px;
        }

        .why-tag {
          font-size: 0.7rem;
          font-weight: 700;
          color: #f59e0b;
        }

        .why-text {
          font-size: 0.72rem;
          line-height: 1.4;
          color: var(--text-secondary);
        }

        @media (max-width: 900px) {
          .hero-card {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
        }
      `}</style>
    </section>
  );
}

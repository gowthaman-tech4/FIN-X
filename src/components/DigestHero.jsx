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
import AudioBriefPlayer from './AudioBriefPlayer';

export default function DigestHero({
  activeDigest,
  onSelectDigest,
  activeFilter,
  onSelectFilter,
  totalStoriesCount,
  officialCount,
  topStories = [],
  onStorySelect
}) {
  return (
    <section className="hero-banner">
      <div className="container">
        <div className="hero-card">
          {/* Top Row: Digest Slot Cadence & Filter Controls */}
          <div className="hero-top-row">
            <div className="digest-tabs" role="tablist" aria-label="Digest Cadence Slots">
              <button
                onClick={() => onSelectDigest('morning')}
                className={`digest-tab ${activeDigest === 'morning' ? 'active' : ''}`}
              >
                <Sunrise size={13} className="tab-icon" />
                <span>Morning Edition (7 AM IST)</span>
              </button>
              <button
                onClick={() => onSelectDigest('afternoon')}
                className={`digest-tab ${activeDigest === 'afternoon' ? 'active' : ''}`}
              >
                <Sun size={13} className="tab-icon" />
                <span>Midday Pulse (1 PM IST)</span>
              </button>
              <button
                onClick={() => onSelectDigest('evening')}
                className={`digest-tab ${activeDigest === 'evening' ? 'active' : ''}`}
              >
                <Sunset size={13} className="tab-icon" />
                <span>Evening Wrap (7 PM IST)</span>
              </button>
            </div>

            <div className="filter-buttons">
              <span className="filter-label">Filter:</span>
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
                <Flame size={12} style={{ color: 'var(--critical-color)' }} />
                <span>Must-Know</span>
              </button>
              <button
                onClick={() => onSelectFilter('official')}
                className={`filter-btn ${activeFilter === 'official' ? 'active' : ''}`}
              >
                <ShieldCheck size={12} style={{ color: 'var(--brand-primary)' }} />
                <span>Official Only</span>
              </button>
            </div>
          </div>

          {/* Center: Editorial Heading & Value Proposition */}
          <div className="hero-main-content">
            <div className="hero-text-block">
              <div className="edition-badge">
                <span className="live-indicator" />
                <span>FIN-X DAILY VERIFIED INTELLIGENCE</span>
              </div>
              <h1 className="hero-heading">
                The Financial World in <span className="hero-highlight">2 Concise Lines.</span>
              </h1>
              <p className="hero-subheading">
                Zero clickbait, zero fluff. Every critical tax rule, central bank circular, and market shift summarized concisely with direct attribution to authoritative gazettes and regulators.
              </p>
            </div>

            {/* Metrics Chips */}
            <div className="metrics-row">
              <div className="metric-chip">
                <Layers size={13} className="text-secondary" />
                <span><strong>{totalStoriesCount}</strong> Stories in Digest</span>
              </div>
              <div className="metric-chip">
                <ShieldCheck size={13} style={{ color: 'var(--brand-primary)' }} />
                <span><strong>{officialCount}</strong> Official (P0) Authorities</span>
              </div>
              <div className="metric-chip">
                <Clock size={13} className="text-secondary" />
                <span>~3 Min Total Read</span>
              </div>
            </div>
          </div>

          {/* 60-Second Audio Brief Player Bar */}
          {topStories.length > 0 && (
            <AudioBriefPlayer stories={topStories} onStorySelect={onStorySelect} />
          )}
        </div>
      </div>

      <style jsx>{`
        .hero-banner {
          padding: 1.25rem 0 0.85rem;
        }

        .hero-card {
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          border-top: 3px solid var(--brand-primary);
          border-radius: var(--radius);
          padding: 1.4rem 1.6rem;
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
          position: relative;
        }

        .hero-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
          padding-bottom: 0.85rem;
          border-bottom: 1px solid #eaecf0;
        }

        .digest-tabs {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          background: #f8faf9;
          padding: 2px;
          border-radius: var(--radius);
          border: 1px solid var(--border-subtle);
        }

        .digest-tab {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.32rem 0.65rem;
          border-radius: var(--radius-sm);
          border: none;
          background: transparent;
          font-size: 0.74rem;
          font-weight: 600;
          color: var(--text-secondary);
          transition: all 0.15s ease;
        }

        .digest-tab:hover {
          color: var(--text-primary);
        }

        .digest-tab.active {
          background: #ffffff;
          color: var(--brand-primary);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
          font-weight: 700;
        }

        .filter-buttons {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .filter-label {
          font-size: 0.72rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .filter-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.3rem 0.6rem;
          border-radius: var(--radius-sm);
          font-size: 0.74rem;
          font-weight: 600;
          color: var(--text-secondary);
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          transition: all 0.15s ease;
        }

        .filter-btn:hover {
          background: #f8faf9;
          color: var(--text-primary);
          border-color: var(--brand-primary);
        }

        .filter-btn.active {
          background: var(--brand-primary);
          color: #ffffff;
          border-color: #16382b;
        }

        .hero-main-content {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .edition-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          color: var(--brand-primary);
          text-transform: uppercase;
        }

        .hero-heading {
          font-family: var(--font-serif);
          font-size: 2.15rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.22;
          letter-spacing: -0.01em;
        }

        .hero-highlight {
          color: var(--brand-primary);
          text-decoration: underline;
          text-decoration-color: var(--brand-accent);
          text-underline-offset: 4px;
        }

        .hero-subheading {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.55;
          max-width: 780px;
        }

        .metrics-row {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          flex-wrap: wrap;
          margin-top: 0.2rem;
        }

        .metric-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.25rem 0.55rem;
          border-radius: var(--radius-sm);
          background: #f8faf9;
          border: 1px solid var(--border-subtle);
          font-size: 0.74rem;
          color: var(--text-secondary);
        }

        .metric-chip strong {
          color: var(--brand-primary);
        }

        @media (max-width: 768px) {
          .hero-heading {
            font-size: 1.55rem;
          }
          .hero-top-row {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </section>
  );
}

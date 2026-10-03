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
                <Sunrise size={14} className="tab-icon" />
                <span>Morning Edition (7 AM IST)</span>
              </button>
              <button
                onClick={() => onSelectDigest('afternoon')}
                className={`digest-tab ${activeDigest === 'afternoon' ? 'active' : ''}`}
              >
                <Sun size={14} className="tab-icon" />
                <span>Midday Pulse (1 PM IST)</span>
              </button>
              <button
                onClick={() => onSelectDigest('evening')}
                className={`digest-tab ${activeDigest === 'evening' ? 'active' : ''}`}
              >
                <Sunset size={14} className="tab-icon" />
                <span>Evening Wrap (7 PM IST)</span>
              </button>
            </div>

            <div className="filter-buttons">
              <span className="filter-label">Stream:</span>
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
                <Flame size={12} style={{ color: '#ef4444' }} />
                <span>Must-Know</span>
              </button>
              <button
                onClick={() => onSelectFilter('official')}
                className={`filter-btn ${activeFilter === 'official' ? 'active' : ''}`}
              >
                <ShieldCheck size={12} style={{ color: '#047857' }} />
                <span>Official Only</span>
              </button>
            </div>
          </div>

          {/* Center: Editorial Heading & Value Proposition */}
          <div className="hero-main-content">
            <div className="hero-text-block">
              <div className="edition-badge">
                <span className="live-indicator" />
                <span>FIN-X DAILY INTELLIGENCE DIGEST</span>
              </div>
              <h1 className="hero-heading">
                The Financial World in <span className="hero-gradient">2 Concise Lines.</span>
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
                <ShieldCheck size={13} style={{ color: '#047857' }} />
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
          padding: 1.5rem 0 1rem;
        }

        .hero-card {
          background: linear-gradient(180deg, #ffffff 0%, #fbfcfe 100%);
          border: 1px solid rgba(226, 232, 240, 0.9);
          border-radius: 16px;
          padding: 1.5rem 1.75rem;
          box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 2px 6px -1px rgba(15, 23, 42, 0.03);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          position: relative;
          overflow: hidden;
        }

        .hero-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #2563eb 0%, #8b5cf6 50%, #10b981 100%);
        }

        .hero-top-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(241, 245, 249, 0.9);
        }

        .digest-tabs {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: #f1f5f9;
          padding: 0.25rem;
          border-radius: 9999px;
          border: 1px solid rgba(226, 232, 240, 0.8);
        }

        .digest-tab {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.35rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-secondary);
          transition: all 0.15s ease;
        }

        .digest-tab:hover {
          color: var(--text-primary);
        }

        .digest-tab.active {
          background: #ffffff;
          color: #0f172a;
          box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);
        }

        .filter-buttons {
          display: flex;
          align-items: center;
          gap: 0.4rem;
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
          padding: 0.32rem 0.65rem;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-secondary);
          background: #ffffff;
          border: 1px solid rgba(226, 232, 240, 0.8);
          transition: all 0.15s ease;
        }

        .filter-btn:hover {
          background: #f8fafc;
          color: var(--text-primary);
        }

        .filter-btn.active {
          background: #0f172a;
          color: #ffffff;
          border-color: #0f172a;
        }

        .hero-main-content {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .edition-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          color: #2563eb;
          text-transform: uppercase;
        }

        .hero-heading {
          font-size: 1.85rem;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.25;
          letter-spacing: -0.025em;
        }

        .hero-gradient {
          background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subheading {
          font-size: 0.92rem;
          color: #475569;
          line-height: 1.5;
          max-width: 780px;
        }

        .metrics-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-top: 0.25rem;
        }

        .metric-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.3rem 0.65rem;
          border-radius: 6px;
          background: #f1f5f9;
          border: 1px solid rgba(226, 232, 240, 0.8);
          font-size: 0.75rem;
          color: #334155;
        }

        @media (max-width: 768px) {
          .hero-heading {
            font-size: 1.45rem;
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

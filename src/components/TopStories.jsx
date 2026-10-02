'use client';

import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Flame, Clock, ExternalLink } from 'lucide-react';
import { DOMAINS } from '../data/mockData';

export default function TopStories({ stories, onStoryClick }) {
  if (!stories || stories.length === 0) return null;

  const mainStory = stories[0];
  const sideStories = stories.slice(1, 5);

  const getDomainColor = (domain) => {
    const d = DOMAINS.find(item => item.id === domain);
    return d ? d.color : 'var(--brand-primary)';
  };

  const getDomainLabel = (domain) => {
    const d = DOMAINS.find(item => item.id === domain);
    return d ? d.label : domain.toUpperCase();
  };

  return (
    <section className="top-stories-section">
      <div className="section-head">
        <div className="section-badge">
          <Sparkles size={14} style={{ color: '#f59e0b' }} />
          <span>TODAY'S ESSENTIAL BRIEF</span>
        </div>
        <span className="section-subtitle">
          The 5 biggest financial changes today — read in 60 seconds
        </span>
      </div>

      <div className="top-stories-grid">
        {/* Lead Main Story */}
        {mainStory && (
          <div 
            className="main-story-card glass-panel"
            style={{ '--lead-color': getDomainColor(mainStory.domain) }}
          >
            <div className="lead-meta">
              <span 
                className="lead-domain"
                style={{ 
                  borderColor: getDomainColor(mainStory.domain),
                  color: getDomainColor(mainStory.domain),
                  background: `color-mix(in srgb, ${getDomainColor(mainStory.domain)} 14%, transparent)`
                }}
              >
                {getDomainLabel(mainStory.domain)}
              </span>

              <span className="lead-country">
                {mainStory.country === 'IN' ? '🇮🇳 India' : mainStory.country === 'US' ? '🇺🇸 US' : '🌍 Global'}
              </span>

              <span className="lead-tag">
                <Flame size={12} />
                <span>P0 Lead Story</span>
              </span>
            </div>

            <h2 className="lead-headline">
              {mainStory.headline}
            </h2>

            <div className="lead-summary">
              {mainStory.summary.split('\n').map((line, i) => (
                <p key={i} className="lead-line">• {line}</p>
              ))}
            </div>

            <div className="lead-footer">
              <div className="lead-source">
                <ShieldCheck size={13} style={{ color: '#10b981' }} />
                <span>{mainStory.source_name}</span>
                <span className="dot">•</span>
                <span>{mainStory.time_ago}</span>
              </div>

              <a 
                href={mainStory.source_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="lead-link"
              >
                <span>Read Official Circular</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        )}

        {/* 4 Compact Side Stories */}
        <div className="side-stories-col">
          {sideStories.map((story, idx) => {
            const domainColor = getDomainColor(story.domain);
            return (
              <div 
                key={story.id} 
                className="side-story-card glass-panel"
                style={{ '--side-color': domainColor }}
              >
                <div className="side-meta">
                  <span 
                    className="side-domain"
                    style={{ color: domainColor }}
                  >
                    {getDomainLabel(story.domain)}
                  </span>
                  <span className="side-flag">
                    {story.country === 'IN' ? '🇮🇳' : story.country === 'US' ? '🇺🇸' : '🌍'}
                  </span>
                  <span className="side-time">{story.time_ago}</span>
                </div>

                <h3 className="side-headline">
                  {story.headline}
                </h3>

                <div className="side-footer">
                  <span className="side-source">{story.source_name}</span>
                  <a 
                    href={story.source_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="side-link"
                    title="Read source"
                  >
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .top-stories-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .section-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .section-badge {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          color: #f59e0b;
          text-transform: uppercase;
        }

        .section-subtitle {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .top-stories-grid {
          display: grid;
          grid-template-columns: 1.25fr 1fr;
          gap: 1rem;
        }

        .main-story-card {
          padding: 1.4rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          background: linear-gradient(135deg, rgba(16, 23, 38, 0.9) 0%, rgba(10, 15, 26, 0.95) 100%);
          border-left: 3px solid var(--lead-color);
        }

        .lead-meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .lead-domain {
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
          border: 1px solid;
        }

        .lead-country {
          font-size: 0.72rem;
          color: var(--text-secondary);
        }

        .lead-tag {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          color: #ef4444;
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.25);
          padding: 0.12rem 0.4rem;
          border-radius: 4px;
        }

        .lead-headline {
          font-size: 1.28rem;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.3;
          letter-spacing: -0.02em;
        }

        .lead-summary {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          background: rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.04);
          padding: 0.75rem 0.95rem;
          border-radius: 8px;
        }

        .lead-line {
          font-size: 0.88rem;
          color: #e2e8f0;
          line-height: 1.45;
        }

        .lead-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .lead-source {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .dot {
          color: var(--text-muted);
        }

        .lead-link {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          font-weight: 700;
          color: #38bdf8;
          background: rgba(56, 189, 248, 0.1);
          padding: 0.3rem 0.65rem;
          border-radius: 6px;
          border: 1px solid rgba(56, 189, 248, 0.25);
          transition: all 0.15s ease;
        }

        .lead-link:hover {
          background: rgba(56, 189, 248, 0.2);
          color: #ffffff;
        }

        /* Side Stories Column */
        .side-stories-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.65rem;
        }

        .side-story-card {
          padding: 0.85rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 0.5rem;
          background: rgba(13, 19, 32, 0.6);
        }

        .side-story-card:hover {
          border-color: rgba(255, 255, 255, 0.15);
          background: rgba(18, 26, 44, 0.8);
        }

        .side-meta {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .side-domain {
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .side-flag {
          font-size: 0.75rem;
        }

        .side-time {
          margin-left: auto;
          font-size: 0.65rem;
          color: var(--text-muted);
        }

        .side-headline {
          font-size: 0.88rem;
          font-weight: 600;
          color: #f1f5f9;
          line-height: 1.35;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .side-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.4rem;
          border-top: 1px solid rgba(255, 255, 255, 0.04);
        }

        .side-source {
          font-size: 0.68rem;
          color: var(--text-muted);
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 140px;
        }

        .side-link {
          color: #38bdf8;
          display: flex;
          align-items: center;
          padding: 2px;
          border-radius: 4px;
        }

        .side-link:hover {
          color: #ffffff;
        }

        @media (max-width: 900px) {
          .top-stories-grid {
            grid-template-columns: 1fr;
          }
          .side-stories-col {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 600px) {
          .side-stories-col {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}

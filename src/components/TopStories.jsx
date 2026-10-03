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
          <Sparkles size={14} style={{ color: '#d97706' }} />
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
            className="main-story-card glass-panel card-hover-lift"
            style={{ '--lead-color': getDomainColor(mainStory.domain) }}
            onClick={() => onStoryClick && onStoryClick(mainStory)}
          >
            <div className="lead-meta">
              <span 
                className="lead-domain"
                style={{ 
                  borderColor: getDomainColor(mainStory.domain),
                  color: getDomainColor(mainStory.domain),
                  background: `color-mix(in srgb, ${getDomainColor(mainStory.domain)} 10%, transparent)`
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
                <ShieldCheck size={14} style={{ color: '#047857' }} />
                <span className="source-name">{mainStory.source_name}</span>
                <span className="dot">•</span>
                <span>{mainStory.time_ago}</span>
              </div>

              <a 
                href={mainStory.source_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="lead-link"
                onClick={(e) => e.stopPropagation()}
              >
                <span>Read Official Circular</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        )}

        {/* 4 Compact Side Stories */}
        <div className="side-stories-col">
          {sideStories.map((story) => {
            const domainColor = getDomainColor(story.domain);
            return (
              <div 
                key={story.id} 
                className="side-story-card glass-panel card-hover-lift"
                style={{ '--side-color': domainColor }}
                onClick={() => onStoryClick && onStoryClick(story)}
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
                    title="Read original publication"
                    onClick={(e) => e.stopPropagation()}
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
          gap: 0.85rem;
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
          color: #b45309;
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
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          background: #ffffff;
          border: 1px solid rgba(226, 232, 240, 0.9);
          border-left: 4px solid var(--lead-color);
          border-radius: 14px;
          cursor: pointer;
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
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .lead-tag {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          color: #dc2626;
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.2);
          padding: 0.12rem 0.4rem;
          border-radius: 4px;
        }

        .lead-headline {
          font-size: 1.25rem;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.35;
          letter-spacing: -0.02em;
        }

        .lead-summary {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          background: #f8fafc;
          border: 1px solid rgba(226, 232, 240, 0.8);
          padding: 0.85rem 1rem;
          border-radius: 8px;
        }

        .lead-line {
          font-size: 0.88rem;
          color: #334155;
          line-height: 1.5;
        }

        .lead-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.5rem;
          border-top: 1px solid rgba(241, 245, 249, 0.9);
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

        .source-name {
          color: #0f172a;
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
          color: #2563eb;
          background: rgba(37, 99, 235, 0.08);
          padding: 0.35rem 0.75rem;
          border-radius: 6px;
          border: 1px solid rgba(37, 99, 235, 0.2);
          transition: all 0.15s ease;
        }

        .lead-link:hover {
          background: #2563eb;
          color: #ffffff;
        }

        /* Side Stories Column */
        .side-stories-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }

        .side-story-card {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 0.6rem;
          background: #ffffff;
          border: 1px solid rgba(226, 232, 240, 0.9);
          border-radius: 12px;
          cursor: pointer;
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
          font-size: 0.68rem;
          color: var(--text-muted);
        }

        .side-headline {
          font-size: 0.85rem;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.4;
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
          border-top: 1px solid rgba(241, 245, 249, 0.9);
        }

        .side-source {
          font-size: 0.7rem;
          color: var(--text-muted);
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 140px;
        }

        .side-link {
          color: #2563eb;
          display: flex;
          align-items: center;
          padding: 3px;
          border-radius: 4px;
        }

        .side-link:hover {
          color: #1d4ed8;
          background: rgba(37, 99, 235, 0.08);
        }

        @media (max-width: 900px) {
          .top-stories-grid {
            grid-template-columns: 1fr;
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

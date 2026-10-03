'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Flame, Clock, ExternalLink } from 'lucide-react';
import { DOMAINS } from '../data/mockData';

export default function TopStories({ stories, onStoryClick }) {
  const [mainImgError, setMainImgError] = useState(false);
  const [sideImgErrors, setSideImgErrors] = useState({});

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
          <Sparkles size={13} style={{ color: 'var(--brand-accent)' }} />
          <span>TODAY'S ESSENTIAL BRIEF</span>
        </div>
        <span className="section-subtitle">
          The 5 biggest financial changes today — synthesized in 60 seconds
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
            {/* Real Editorial Image for Lead Story */}
            {mainStory.image_url && !mainImgError && (
              <div className="lead-image-wrap">
                <img 
                  src={mainStory.image_url} 
                  alt={mainStory.headline} 
                  className="lead-img"
                  onError={() => setMainImgError(true)}
                />
                <div className="lead-image-badge">
                  <Flame size={12} />
                  <span>P0 LEAD INTELLIGENCE</span>
                </div>
              </div>
            )}

            <div className="lead-body">
              <div className="lead-meta">
                <span 
                  className="lead-domain"
                  style={{ 
                    borderColor: getDomainColor(mainStory.domain),
                    color: getDomainColor(mainStory.domain),
                    background: `color-mix(in srgb, ${getDomainColor(mainStory.domain)} 8%, transparent)`
                  }}
                >
                  {getDomainLabel(mainStory.domain)}
                </span>

                <span className="lead-country">
                  {mainStory.country === 'IN' ? '🇮🇳 India' : mainStory.country === 'US' ? '🇺🇸 US' : '🌍 Global'}
                </span>

                {(!mainStory.image_url || mainImgError) && (
                  <span className="lead-tag">
                    <Flame size={12} />
                    <span>P0 Lead Story</span>
                  </span>
                )}
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
                  <ShieldCheck size={14} style={{ color: 'var(--brand-primary)' }} />
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
                  <span>Official Circular</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* 4 Compact Side Stories */}
        <div className="side-stories-col">
          {sideStories.map((story) => {
            const domainColor = getDomainColor(story.domain);
            const hasSideImage = story.image_url && !sideImgErrors[story.id];

            return (
              <div 
                key={story.id} 
                className="side-story-card glass-panel card-hover-lift"
                style={{ '--side-color': domainColor }}
                onClick={() => onStoryClick && onStoryClick(story)}
              >
                <div className="side-card-content">
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

                {hasSideImage && (
                  <div className="side-thumb-wrap">
                    <img 
                      src={story.image_url} 
                      alt="" 
                      className="side-thumb-img"
                      loading="lazy"
                      onError={() => setSideImgErrors(prev => ({ ...prev, [story.id]: true }))}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .top-stories-section {
          margin-bottom: 2rem;
        }

        .section-head {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.85rem;
          flex-wrap: wrap;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 0.45rem;
        }

        .section-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: #f0f7f3;
          border: 1px solid #a8cfb8;
          color: var(--brand-primary);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius);
        }

        .section-subtitle {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .top-stories-grid {
          display: grid;
          grid-template-columns: 1.18fr 1fr;
          gap: 1.15rem;
        }

        /* Lead Main Story - Wikipedia Card */
        .main-story-card {
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          border-top: 3px solid var(--lead-color);
          border-radius: var(--radius);
          display: flex;
          flex-direction: column;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.15s ease;
        }

        .main-story-card:hover {
          border-color: var(--border-highlight);
          box-shadow: var(--shadow-md);
        }

        .lead-image-wrap {
          position: relative;
          width: 100%;
          height: 220px;
          background: #f1f3f4;
          border-bottom: 1px solid var(--border-subtle);
          overflow: hidden;
        }

        .lead-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.3s ease;
        }

        .main-story-card:hover .lead-img {
          transform: scale(1.02);
        }

        .lead-image-badge {
          position: absolute;
          top: 0.65rem;
          left: 0.65rem;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          background: rgba(30, 70, 53, 0.9);
          backdrop-filter: blur(4px);
          color: #ffffff;
          font-size: 0.65rem;
          font-weight: 700;
          padding: 0.25rem 0.55rem;
          border-radius: var(--radius);
          letter-spacing: 0.04em;
        }

        .lead-body {
          padding: 1.35rem 1.45rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          flex: 1;
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
          border-radius: var(--radius-sm);
          border: 1px solid;
          letter-spacing: 0.03em;
        }

        .lead-country {
          font-size: 0.72rem;
          color: var(--text-secondary);
          background: #f8faf9;
          padding: 0.15rem 0.45rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-subtle);
        }

        .lead-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.68rem;
          font-weight: 700;
          color: var(--critical-color);
          background: var(--critical-bg);
          border: 1px solid var(--critical-border);
          padding: 0.15rem 0.45rem;
          border-radius: var(--radius-sm);
        }

        /* Wikipedia Serif Headline */
        .lead-headline {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          font-weight: 600;
          line-height: 1.3;
          color: var(--text-primary);
        }

        .lead-summary {
          background: #f8faf9;
          border: 1px solid #d8ded9;
          border-left: 2px solid var(--brand-primary);
          border-radius: var(--radius);
          padding: 0.75rem 0.95rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .lead-line {
          font-size: 0.84rem;
          line-height: 1.5;
          color: var(--text-primary);
        }

        .lead-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.75rem;
          border-top: 1px solid #eaecf0;
          margin-top: auto;
          font-size: 0.75rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .lead-source {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          color: var(--text-muted);
        }

        .lead-source .source-name {
          font-weight: 700;
          color: var(--text-primary);
        }

        .dot {
          color: #c8ccd1;
        }

        .lead-link {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.73rem;
          font-weight: 600;
          color: var(--brand-primary);
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-sm);
          transition: all 0.15s ease;
        }

        .lead-link:hover {
          background: var(--brand-primary);
          color: #ffffff;
          border-color: var(--brand-primary);
          text-decoration: none;
        }

        /* Side Stories Column */
        .side-stories-col {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .side-story-card {
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          border-left: 3px solid var(--side-color);
          border-radius: var(--radius);
          padding: 0.85rem 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .side-story-card:hover {
          border-color: var(--border-highlight);
        }

        .side-card-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .side-thumb-wrap {
          width: 72px;
          height: 72px;
          flex-shrink: 0;
          overflow: hidden;
          background: #f1f3f4;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius);
        }

        .side-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .side-meta {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.68rem;
        }

        .side-domain {
          font-weight: 700;
          text-transform: uppercase;
        }

        .side-time {
          color: var(--text-muted);
        }

        .side-headline {
          font-family: var(--font-serif);
          font-size: 0.92rem;
          font-weight: 600;
          line-height: 1.35;
          color: var(--text-primary);
        }

        .side-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.72rem;
        }

        .side-source {
          color: var(--text-muted);
          font-weight: 500;
        }

        .side-link {
          color: var(--text-muted);
          display: flex;
          align-items: center;
          padding: 2px;
        }

        .side-link:hover {
          color: var(--brand-primary);
        }

        @media (max-width: 900px) {
          .top-stories-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}

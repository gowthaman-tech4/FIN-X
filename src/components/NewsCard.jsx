'use client';

import React, { useState } from 'react';
import { 
  ExternalLink, 
  Bookmark, 
  Share2, 
  ShieldCheck, 
  Check, 
  Flame, 
  Clock, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { DOMAINS } from '../data/mockData';

export default function NewsCard({ 
  story, 
  isSaved = false, 
  onToggleSave,
  onStoryClick
}) {
  const [copied, setCopied] = useState(false);

  const domainObj = DOMAINS.find(d => d.id === story.domain) || {
    label: story.domain.toUpperCase(),
    color: 'var(--brand-primary)'
  };

  const isOfficial = story.source_type === 'official' || story.authority_level === 'P0';
  const isCritical = story.importance === 'critical';
  const isHigh = story.importance === 'high';

  // Split the 2-line summary by newline or period if possible
  const summaryLines = story.summary
    ? story.summary.split('\n').filter(Boolean)
    : [];

  const handleShare = async (e) => {
    e.stopPropagation();
    const shareData = {
      title: story.headline,
      text: `${story.headline}\n\nVia FIN-X (Global Finance Digest)`,
      url: story.source_url
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User dismissed
      }
    } else {
      navigator.clipboard.writeText(`${story.headline} - ${story.source_url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getCountryFlag = (country) => {
    switch (country) {
      case 'IN': return '🇮🇳';
      case 'US': return '🇺🇸';
      default: return '🌍';
    }
  };

  return (
    <article 
      className={`news-card glass-panel ${isCritical ? 'critical-glow' : ''}`}
      style={{ '--card-accent': domainObj.color }}
      id={`story-card-${story.id}`}
    >
      {/* Top Meta Bar */}
      <div className="card-top-bar">
        <div className="meta-left">
          {/* Domain Tag */}
          <span 
            className="domain-badge"
            style={{ 
              borderColor: domainObj.color,
              color: domainObj.color,
              background: `color-mix(in srgb, ${domainObj.color} 12%, transparent)`
            }}
          >
            {domainObj.label}
          </span>

          {/* Country Flag & Label */}
          <span className="country-badge" title={`Country: ${story.country}`}>
            <span className="flag-icon">{getCountryFlag(story.country)}</span>
            <span className="country-text">{story.country}</span>
          </span>

          {/* Importance Pill if High / Critical */}
          {isCritical && (
            <span className="critical-badge">
              <Flame size={12} />
              <span>Must-Know</span>
            </span>
          )}
          {!isCritical && isHigh && (
            <span className="high-badge">
              <span>Important</span>
            </span>
          )}
        </div>

        <div className="meta-right">
          {/* Official Authority Badge */}
          {isOfficial && (
            <span className="official-pill" title="P0 Official Regulatory/Government Source">
              <ShieldCheck size={12} />
              <span>Official P0</span>
            </span>
          )}
          <span className="time-ago">
            <Clock size={11} />
            {story.time_ago || story.published_at}
          </span>
        </div>
      </div>

      {/* Main Headline */}
      <h2 className="headline" onClick={onStoryClick}>
        {story.headline}
      </h2>

      {/* 2-Line AI Summary Block */}
      <div className="summary-block">
        <div className="summary-accent-bar" style={{ background: domainObj.color }} />
        <div className="summary-content">
          {summaryLines.length > 0 ? (
            summaryLines.map((line, idx) => (
              <p key={idx} className="summary-line">
                <span className="line-bullet">•</span> {line}
              </p>
            ))
          ) : (
            <p className="summary-line">{story.summary}</p>
          )}
        </div>
      </div>

      {/* Bottom Footer: Attribution & Direct Read Link */}
      <div className="card-footer">
        <div className="source-info">
          <span className="source-label">Source:</span>
          <span className="source-name">{story.source_name}</span>
          {story.read_time && (
            <>
              <span className="footer-dot">•</span>
              <span className="read-time">{story.read_time}</span>
            </>
          )}
        </div>

        <div className="card-actions">
          {/* Bookmark Button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(story.id);
            }} 
            className={`action-btn ${isSaved ? 'saved' : ''}`}
            title={isSaved ? "Remove bookmark" : "Save for later"}
          >
            <Bookmark size={15} fill={isSaved ? "currentColor" : "none"} />
          </button>

          {/* Share / Copy Link */}
          <button 
            onClick={handleShare}
            className="action-btn"
            title={copied ? "Copied!" : "Share story"}
          >
            {copied ? <Check size={15} color="#10b981" /> : <Share2 size={15} />}
          </button>

          {/* Read Original Source Link */}
          <a 
            href={story.source_url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="read-link-btn"
            onClick={(e) => e.stopPropagation()}
            title={`Read original article on ${story.source_name}`}
          >
            <span>Read full story</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      <style jsx>{`
        .news-card {
          padding: 1.25rem 1.4rem;
          display: flex;
          flex-direction: column;
          gap: 0.95rem;
          background: rgba(13, 19, 32, 0.75);
          border: 1px solid var(--border-subtle);
          position: relative;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .news-card:hover {
          border-color: rgba(255, 255, 255, 0.16);
          background: rgba(18, 26, 44, 0.88);
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 0 15px -3px var(--card-accent);
        }

        .critical-glow {
          border-left: 3px solid #ef4444;
        }

        .card-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .meta-left {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          flex-wrap: wrap;
        }

        .meta-right {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .domain-badge {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          padding: 0.18rem 0.55rem;
          border-radius: 6px;
          border: 1px solid;
          line-height: 1.2;
        }

        .country-badge {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 0.18rem 0.45rem;
          border-radius: 6px;
          font-size: 0.7rem;
          color: var(--text-secondary);
        }

        .flag-icon {
          font-size: 0.85rem;
          line-height: 1;
        }

        .country-text {
          font-weight: 600;
        }

        .critical-badge {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          background: var(--critical-bg);
          color: var(--critical-color);
          border: 1px solid var(--critical-border);
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          padding: 0.15rem 0.45rem;
          border-radius: 6px;
        }

        .high-badge {
          background: rgba(245, 158, 11, 0.12);
          color: #f59e0b;
          border: 1px solid rgba(245, 158, 11, 0.25);
          font-size: 0.68rem;
          font-weight: 600;
          padding: 0.15rem 0.45rem;
          border-radius: 6px;
        }

        .official-pill {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          background: rgba(16, 185, 129, 0.12);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.25);
          font-size: 0.68rem;
          font-weight: 600;
          padding: 0.15rem 0.45rem;
          border-radius: 6px;
        }

        .time-ago {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        .headline {
          font-size: 1.12rem;
          font-weight: 700;
          line-height: 1.35;
          color: #ffffff;
          letter-spacing: -0.015em;
          cursor: pointer;
          transition: color 0.15s ease;
        }

        .headline:hover {
          color: #60a5fa;
        }

        /* 2-line AI Summary layout */
        .summary-block {
          display: flex;
          gap: 0.75rem;
          background: rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.04);
          padding: 0.65rem 0.85rem;
          border-radius: 8px;
        }

        .summary-accent-bar {
          width: 3px;
          border-radius: 2px;
          flex-shrink: 0;
        }

        .summary-content {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .summary-line {
          font-size: 0.84rem;
          line-height: 1.45;
          color: #cbd5e1;
        }

        .line-bullet {
          color: var(--text-muted);
          margin-right: 0.25rem;
        }

        /* Footer */
        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          gap: 1rem;
          flex-wrap: wrap;
        }

        .source-info {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.74rem;
          color: var(--text-muted);
        }

        .source-label {
          color: var(--text-muted);
        }

        .source-name {
          color: var(--text-secondary);
          font-weight: 600;
        }

        .footer-dot {
          color: var(--text-muted);
        }

        .read-time {
          color: var(--text-muted);
        }

        .card-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          transition: all 0.15s ease;
        }

        .action-btn:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.09);
          border-color: var(--border-highlight);
        }

        .action-btn.saved {
          color: #f59e0b;
          border-color: rgba(245, 158, 11, 0.4);
          background: rgba(245, 158, 11, 0.12);
        }

        .read-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.35rem 0.8rem;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          color: #38bdf8;
          background: rgba(56, 189, 248, 0.08);
          border: 1px solid rgba(56, 189, 248, 0.25);
          transition: all 0.15s ease;
        }

        .read-link-btn:hover {
          color: #ffffff;
          background: rgba(56, 189, 248, 0.2);
          border-color: #38bdf8;
          transform: translateX(1px);
        }
      `}</style>
    </article>
  );
}

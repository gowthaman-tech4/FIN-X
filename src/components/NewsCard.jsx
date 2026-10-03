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
      className={`news-card card-hover-lift ${isCritical ? 'critical-border' : ''}`}
      style={{ '--card-accent': domainObj.color }}
      id={`story-card-${story.id}`}
      onClick={() => onStoryClick && onStoryClick(story)}
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
              background: `color-mix(in srgb, ${domainObj.color} 10%, transparent)`
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

          {isOfficial && (
            <span className="official-pill">
              <ShieldCheck size={12} style={{ color: '#047857' }} />
              <span>P0 Authority</span>
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="meta-right">
          <button 
            onClick={handleShare}
            className="icon-action-btn"
            title="Share story link"
          >
            {copied ? <Check size={14} style={{ color: '#047857' }} /> : <Share2 size={14} />}
          </button>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              if (onToggleSave) onToggleSave(story.id);
            }}
            className={`icon-action-btn ${isSaved ? 'saved' : ''}`}
            title={isSaved ? "Remove from bookmarks" : "Save for later"}
          >
            <Bookmark size={14} className={isSaved ? "bookmark-filled" : ""} />
          </button>
        </div>
      </div>

      {/* Main Headline */}
      <h3 className="card-headline">
        {story.headline}
      </h3>

      {/* Strict 2-Line AI Synthesis */}
      <div className="summary-block">
        <div className="summary-badge">
          <Sparkles size={12} style={{ color: '#2563eb' }} />
          <span>2-LINE SUMMARY</span>
        </div>
        <div className="summary-content">
          {summaryLines.map((line, idx) => (
            <p key={idx} className="summary-line">
              <span className="line-num">{idx + 1}.</span>
              <span className="line-text">{line}</span>
            </p>
          ))}
        </div>
      </div>

      {/* Footer Info & Official Source Attribution Link */}
      <div className="card-footer">
        <div className="source-info">
          <span className="source-title">Source:</span>
          <span className="source-name">{story.source_name}</span>
          <span className="footer-dot">•</span>
          <span className="time-ago">{story.time_ago}</span>
        </div>

        <a 
          href={story.source_url}
          target="_blank"
          rel="noopener noreferrer"
          className="source-direct-btn"
          onClick={(e) => e.stopPropagation()}
          title={`Open original source at ${story.source_name}`}
        >
          <span>Read Official Circular</span>
          <ExternalLink size={12} />
        </a>
      </div>

      <style jsx>{`
        .news-card {
          background: #ffffff;
          border: 1px solid rgba(226, 232, 240, 0.9);
          border-left: 3px solid var(--card-accent);
          border-radius: 14px;
          padding: 1.35rem 1.45rem;
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(15, 23, 42, 0.03);
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .news-card:hover {
          border-color: rgba(203, 213, 225, 0.95);
          box-shadow: 0 6px 20px -2px rgba(15, 23, 42, 0.07);
          transform: translateY(-2px);
        }

        .critical-border {
          border-left: 4px solid #ef4444;
          background: linear-gradient(180deg, #ffffff 0%, #fffbfb 100%);
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

        .domain-badge {
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
          border: 1px solid;
          letter-spacing: 0.02em;
        }

        .country-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.72rem;
          color: var(--text-secondary);
          background: #f1f5f9;
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
          border: 1px solid rgba(226, 232, 240, 0.8);
        }

        .flag-icon {
          font-size: 0.8rem;
        }

        .country-text {
          font-weight: 600;
        }

        .critical-badge {
          display: inline-flex;
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

        .official-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.65rem;
          font-weight: 600;
          color: #047857;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.2);
          padding: 0.12rem 0.45rem;
          border-radius: 4px;
        }

        .meta-right {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .icon-action-btn {
          width: 30px;
          height: 30px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          background: #f8fafc;
          border: 1px solid rgba(226, 232, 240, 0.8);
          transition: all 0.15s ease;
        }

        .icon-action-btn:hover {
          color: #0f172a;
          background: #f1f5f9;
        }

        .icon-action-btn.saved {
          color: #2563eb;
          background: rgba(37, 99, 235, 0.08);
          border-color: rgba(37, 99, 235, 0.25);
        }

        .bookmark-filled {
          fill: currentColor;
        }

        .card-headline {
          font-size: 1.08rem;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.4;
          letter-spacing: -0.015em;
        }

        .summary-block {
          background: #f8fafc;
          border: 1px solid rgba(226, 232, 240, 0.8);
          border-radius: 8px;
          padding: 0.75rem 0.95rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .summary-badge {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          color: #2563eb;
          text-transform: uppercase;
        }

        .summary-content {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .summary-line {
          font-size: 0.85rem;
          color: #334155;
          line-height: 1.48;
          display: flex;
          align-items: baseline;
          gap: 0.4rem;
        }

        .line-num {
          font-weight: 700;
          color: #64748b;
          font-size: 0.8rem;
          flex-shrink: 0;
        }

        .line-text {
          flex: 1;
        }

        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.5rem;
          border-top: 1px solid rgba(241, 245, 249, 0.9);
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .source-info {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .source-title {
          color: var(--text-muted);
        }

        .source-name {
          font-weight: 600;
          color: #0f172a;
        }

        .footer-dot {
          color: var(--text-muted);
        }

        .time-ago {
          color: var(--text-muted);
        }

        .source-direct-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: #2563eb;
          background: rgba(37, 99, 235, 0.06);
          padding: 0.28rem 0.65rem;
          border-radius: 6px;
          border: 1px solid rgba(37, 99, 235, 0.2);
          transition: all 0.15s ease;
        }

        .source-direct-btn:hover {
          background: #2563eb;
          color: #ffffff;
        }
      `}</style>
    </article>
  );
}

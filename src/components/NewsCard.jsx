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
  ChevronRight,
  ImageIcon
} from 'lucide-react';
import { DOMAINS } from '../data/mockData';

export default function NewsCard({ 
  story, 
  isSaved = false, 
  onToggleSave,
  onStoryClick
}) {
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

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
      text: `${story.headline}\n\nVia FIN-X (Finance News For You)`,
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
      {/* Real News Editorial Image Banner (if available) */}
      {story.image_url && !imageError && (
        <div className="card-image-wrap">
          <img 
            src={story.image_url} 
            alt={story.headline}
            className="card-news-img"
            loading="lazy"
            onError={() => setImageError(true)}
          />
          <div className="card-image-domain-tag" style={{ background: domainObj.color }}>
            {domainObj.label}
          </div>
        </div>
      )}

      {/* Top Meta Bar */}
      <div className="card-top-bar">
        <div className="meta-left">
          {/* Domain Tag (if not shown in image banner) */}
          {(!story.image_url || imageError) && (
            <span 
              className="domain-badge"
              style={{ 
                borderColor: domainObj.color,
                color: domainObj.color,
                background: `color-mix(in srgb, ${domainObj.color} 8%, transparent)`
              }}
            >
              {domainObj.label}
            </span>
          )}

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
              <ShieldCheck size={12} style={{ color: 'var(--brand-primary)' }} />
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
            {copied ? <Check size={14} style={{ color: 'var(--brand-accent)' }} /> : <Share2 size={14} />}
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

      {/* Main Headline with Wikipedia Serif */}
      <h3 className="card-headline">
        {story.headline}
      </h3>

      {/* Strict 2-Line AI Synthesis */}
      <div className="summary-block">
        <div className="summary-badge">
          <Sparkles size={11} style={{ color: 'var(--brand-primary)' }} />
          <span>2-LINE EXECUTIVE SUMMARY</span>
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
          <span>Official Circular</span>
          <ExternalLink size={12} />
        </a>
      </div>

      <style jsx>{`
        .news-card {
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          border-left: 3px solid var(--card-accent);
          border-radius: var(--radius);
          padding: 1.25rem 1.35rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          cursor: pointer;
          box-shadow: var(--shadow-sm);
          transition: all 0.15s ease;
        }

        .news-card:hover {
          border-color: var(--border-highlight);
          box-shadow: var(--shadow-md);
        }

        .critical-border {
          border-left: 4px solid var(--critical-color);
          background: #fffdfd;
        }

        /* Editorial Image Banner with Sharp Edges */
        .card-image-wrap {
          position: relative;
          width: 100%;
          height: 155px;
          overflow: hidden;
          background: #f1f3f4;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius);
          margin-bottom: 0.25rem;
        }

        .card-news-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.25s ease;
        }

        .news-card:hover .card-news-img {
          transform: scale(1.02);
        }

        .card-image-domain-tag {
          position: absolute;
          bottom: 0.5rem;
          left: 0.5rem;
          color: #ffffff;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          padding: 0.18rem 0.5rem;
          border-radius: var(--radius);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.35);
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
          padding: 0.12rem 0.45rem;
          border-radius: var(--radius-sm);
          border: 1px solid;
          letter-spacing: 0.02em;
        }

        .country-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.72rem;
          color: var(--text-secondary);
          background: #f8faf9;
          padding: 0.12rem 0.4rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-subtle);
        }

        .critical-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.68rem;
          font-weight: 700;
          color: var(--critical-color);
          background: var(--critical-bg);
          border: 1px solid var(--critical-border);
          padding: 0.12rem 0.45rem;
          border-radius: var(--radius-sm);
        }

        .official-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.68rem;
          font-weight: 700;
          color: var(--brand-primary);
          background: #f0f7f3;
          border: 1px solid #a8cfb8;
          padding: 0.12rem 0.45rem;
          border-radius: var(--radius-sm);
        }

        .meta-right {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .icon-action-btn {
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border-subtle);
          background: #ffffff;
          border-radius: var(--radius-sm);
          color: var(--text-muted);
          transition: all 0.15s ease;
        }

        .icon-action-btn:hover {
          color: var(--brand-primary);
          border-color: var(--brand-primary);
        }

        .icon-action-btn.saved {
          color: var(--brand-primary);
          border-color: var(--brand-primary);
          background: #f0f7f3;
        }

        .bookmark-filled {
          fill: currentColor;
        }

        /* Wikipedia Headline */
        .card-headline {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          font-weight: 600;
          line-height: 1.35;
          color: var(--text-primary);
          letter-spacing: -0.01em;
        }

        /* Summary Block - Wikipedia encyclopedic quote block */
        .summary-block {
          background: #f8faf9;
          border: 1px solid #d8ded9;
          border-left: 2px solid var(--brand-primary);
          border-radius: var(--radius);
          padding: 0.75rem 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        .summary-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.64rem;
          font-weight: 700;
          color: var(--brand-primary);
          letter-spacing: 0.05em;
        }

        .summary-content {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .summary-line {
          font-size: 0.82rem;
          line-height: 1.5;
          color: var(--text-primary);
          display: flex;
          gap: 0.4rem;
        }

        .line-num {
          font-weight: 700;
          color: var(--brand-primary);
          flex-shrink: 0;
        }

        .line-text {
          flex: 1;
        }

        /* Card Footer */
        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.6rem;
          border-top: 1px solid #eaecf0;
          font-size: 0.74rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .source-info {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          color: var(--text-muted);
        }

        .source-title {
          font-weight: 500;
        }

        .source-name {
          font-weight: 700;
          color: var(--text-primary);
        }

        .footer-dot {
          color: #c8ccd1;
        }

        .time-ago {
          color: var(--text-muted);
        }

        .source-direct-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.73rem;
          font-weight: 600;
          color: var(--brand-primary);
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          padding: 0.2rem 0.55rem;
          border-radius: var(--radius-sm);
          transition: all 0.15s ease;
        }

        .source-direct-btn:hover {
          background: var(--brand-primary);
          color: #ffffff;
          border-color: var(--brand-primary);
          text-decoration: none;
        }
      `}</style>
    </article>
  );
}

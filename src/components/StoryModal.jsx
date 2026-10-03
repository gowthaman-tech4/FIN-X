'use client';

import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  ShieldCheck, 
  Bookmark, 
  Share2, 
  Clock, 
  Layers, 
  Tag,
  Building,
  Check,
  ImageIcon
} from 'lucide-react';
import { DOMAINS } from '../data/mockData';

export default function StoryModal({ story, isOpen, onClose, isSaved, onToggleSave }) {
  const [modalImgError, setModalImgError] = useState(false);

  if (!isOpen || !story) return null;

  const domainObj = DOMAINS.find(d => d.id === story.domain) || {
    label: story.domain.toUpperCase(),
    color: 'var(--brand-primary)'
  };

  const isOfficial = story.source_type === 'official' || story.authority_level === 'P0';

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Real News Editorial Header Image (if available) */}
        {story.image_url && !modalImgError && (
          <div className="modal-image-wrap">
            <img 
              src={story.image_url} 
              alt={story.headline} 
              className="modal-cover-img"
              onError={() => setModalImgError(true)}
            />
            <div className="image-credit-tag">
              <span>Verified Financial Intelligence • {story.source_name}</span>
            </div>
          </div>
        )}

        {/* Top Header */}
        <div className="modal-header">
          <div className="header-meta">
            <span 
              className="domain-pill"
              style={{
                borderColor: domainObj.color,
                color: domainObj.color,
                background: `color-mix(in srgb, ${domainObj.color} 8%, transparent)`
              }}
            >
              {domainObj.label}
            </span>
            <span className="country-badge">
              {story.country === 'IN' ? '🇮🇳 India' : story.country === 'US' ? '🇺🇸 United States' : '🌍 Global'}
            </span>
            {isOfficial && (
              <span className="official-badge">
                <ShieldCheck size={12} />
                <span>Verified Authority</span>
              </span>
            )}
          </div>

          <button onClick={onClose} className="close-btn" title="Close">
            <X size={18} />
          </button>
        </div>

        {/* Headline with Wikipedia Serif */}
        <h2 className="story-headline">{story.headline}</h2>

        {/* AI Synthesis Box */}
        <div className="summary-box">
          <div className="summary-title">
            <span>✨ FIN-X 2-LINE EXECUTIVE SUMMARY</span>
          </div>
          <div className="summary-lines">
            {story.summary.split('\n').map((line, i) => (
              <p key={i} className="line">• {line}</p>
            ))}
          </div>
        </div>

        {/* Wikipedia Infobox Table Style */}
        <div className="details-grid">
          <div className="detail-item">
            <span className="label">Original Authority / Desk:</span>
            <span className="value bold">{story.source_name}</span>
          </div>

          <div className="detail-item">
            <span className="label">Classification Level:</span>
            <span className="value">{story.authority_level} Authority ({story.source_type})</span>
          </div>

          <div className="detail-item">
            <span className="label">Published:</span>
            <span className="value">{story.published_at} ({story.time_ago})</span>
          </div>

          <div className="detail-item">
            <span className="label">Digest Edition:</span>
            <span className="value capitalize">{story.digest_slot} Edition</span>
          </div>
        </div>

        {/* Tags */}
        {story.tags && story.tags.length > 0 && (
          <div className="tags-row">
            {story.tags.map((t, idx) => (
              <span key={idx} className="tag-chip">#{t}</span>
            ))}
          </div>
        )}

        {/* Actions Footer */}
        <div className="modal-footer">
          <button 
            onClick={() => onToggleSave && onToggleSave(story.id)}
            className={`action-btn ${isSaved ? 'saved' : ''}`}
          >
            <Bookmark size={14} />
            <span>{isSaved ? 'Saved in Bookmarks' : 'Save Story'}</span>
          </button>

          <a 
            href={story.source_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="official-link-btn"
          >
            <span>Read Original Circular / Filing</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      <style jsx>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .modal-content {
          width: 100%;
          max-width: 620px;
          background: #ffffff;
          border: 1px solid #a2a9b1;
          border-radius: var(--radius);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
          padding: 1.5rem;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-image-wrap {
          position: relative;
          width: calc(100% + 3rem);
          margin: -1.5rem -1.5rem 0 -1.5rem;
          height: 200px;
          background: #f1f3f4;
          border-bottom: 1px solid var(--border-subtle);
          overflow: hidden;
        }

        .modal-cover-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .image-credit-tag {
          position: absolute;
          bottom: 0.5rem;
          right: 0.5rem;
          background: rgba(0, 0, 0, 0.7);
          color: #ffffff;
          font-size: 0.65rem;
          padding: 0.2rem 0.5rem;
          border-radius: var(--radius);
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 0.75rem;
        }

        .header-meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .domain-pill {
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          padding: 0.15rem 0.55rem;
          border-radius: var(--radius-sm);
          border: 1px solid;
          letter-spacing: 0.03em;
        }

        .country-badge {
          font-size: 0.72rem;
          color: var(--text-secondary);
          background: #f8faf9;
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-subtle);
        }

        .official-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--brand-primary);
          background: #f0f7f3;
          border: 1px solid #a8cfb8;
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-sm);
        }

        .close-btn {
          color: var(--text-muted);
          padding: 4px;
          border: 1px solid transparent;
          border-radius: var(--radius-sm);
          background: transparent;
        }

        .close-btn:hover {
          color: var(--text-primary);
          border-color: #c8ccd1;
          background: #f8faf9;
        }

        .story-headline {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          font-weight: 600;
          line-height: 1.35;
          color: var(--text-primary);
        }

        .summary-box {
          background: #f8faf9;
          border: 1px solid #d8ded9;
          border-left: 3px solid var(--brand-primary);
          border-radius: var(--radius);
          padding: 0.95rem 1.1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .summary-title {
          font-size: 0.68rem;
          font-weight: 700;
          color: var(--brand-primary);
          letter-spacing: 0.05em;
        }

        .summary-lines {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .line {
          font-size: 0.88rem;
          line-height: 1.55;
          color: var(--text-primary);
        }

        /* Details Grid */
        .details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.65rem;
          background: #ffffff;
          border: 1px solid #c8ccd1;
          border-radius: var(--radius);
          padding: 0.85rem;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .detail-item .label {
          font-size: 0.68rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .detail-item .value {
          font-size: 0.78rem;
          color: var(--text-secondary);
        }

        .detail-item .value.bold {
          font-weight: 700;
          color: var(--brand-primary);
        }

        .capitalize {
          text-transform: capitalize;
        }

        .tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }

        .tag-chip {
          font-size: 0.72rem;
          color: var(--brand-secondary);
          background: #f0f7f3;
          border: 1px solid #a8cfb8;
          padding: 0.15rem 0.55rem;
          border-radius: var(--radius-sm);
        }

        .modal-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid #eaecf0;
          padding-top: 0.85rem;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .action-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.5rem 0.85rem;
          border: 1px solid var(--border-subtle);
          background: #ffffff;
          border-radius: var(--radius);
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-secondary);
          transition: all 0.15s ease;
        }

        .action-btn:hover {
          color: var(--brand-primary);
          border-color: var(--brand-primary);
        }

        .action-btn.saved {
          background: #f0f7f3;
          color: var(--brand-primary);
          border-color: var(--brand-primary);
        }

        .official-link-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.55rem 1rem;
          background: var(--brand-primary);
          color: #ffffff;
          border-radius: var(--radius);
          border: 1px solid #16382b;
          font-size: 0.8rem;
          font-weight: 700;
          transition: all 0.15s ease;
        }

        .official-link-btn:hover {
          background: var(--brand-secondary);
          border-color: var(--brand-secondary);
          text-decoration: none;
        }
      `}</style>
    </div>
  );
}

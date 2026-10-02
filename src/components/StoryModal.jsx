'use client';

import React from 'react';
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
  Check
} from 'lucide-react';
import { DOMAINS } from '../data/mockData';

export default function StoryModal({ story, isOpen, onClose, isSaved, onToggleSave }) {
  if (!isOpen || !story) return null;

  const domainObj = DOMAINS.find(d => d.id === story.domain) || {
    label: story.domain.toUpperCase(),
    color: 'var(--brand-primary)'
  };

  const isOfficial = story.source_type === 'official' || story.authority_level === 'P0';

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Top Header */}
        <div className="modal-header">
          <div className="header-meta">
            <span 
              className="domain-pill"
              style={{
                borderColor: domainObj.color,
                color: domainObj.color,
                background: `color-mix(in srgb, ${domainObj.color} 15%, transparent)`
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

        {/* Headline */}
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

        {/* Attribution & Context */}
        <div className="details-grid">
          <div className="detail-item">
            <span className="label">Original Authority / Media:</span>
            <span className="value bold">{story.source_name}</span>
          </div>

          <div className="detail-item">
            <span className="label">Classification Level:</span>
            <span className="value">{story.authority_level} Authority ({story.source_type})</span>
          </div>

          <div className="detail-item">
            <span className="label">Discovered & Published:</span>
            <span className="value">{story.published_at} ({story.time_ago})</span>
          </div>

          <div className="detail-item">
            <span className="label">Digest Slot:</span>
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

        {/* Actions & Original Link */}
        <div className="modal-footer">
          <div className="footer-actions">
            <button 
              onClick={() => onToggleSave(story.id)}
              className={`footer-btn ${isSaved ? 'saved' : ''}`}
            >
              <Bookmark size={15} fill={isSaved ? "currentColor" : "none"} />
              <span>{isSaved ? "Bookmarked" : "Bookmark"}</span>
            </button>
          </div>

          <a 
            href={story.source_url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="original-source-btn"
          >
            <span>Read full original story on {story.source_name}</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      <style jsx>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.78);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .modal-content {
          width: 100%;
          max-width: 620px;
          background: #0d1320;
          border: 1px solid var(--border-highlight);
          border-radius: 16px;
          padding: 1.6rem;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.85);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .header-meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .domain-pill {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          padding: 0.18rem 0.55rem;
          border-radius: 6px;
          border: 1px solid;
        }

        .country-badge {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 0.18rem 0.5rem;
          border-radius: 6px;
          font-size: 0.72rem;
          color: var(--text-secondary);
        }

        .official-badge {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          background: rgba(16, 185, 129, 0.15);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.3);
          font-size: 0.7rem;
          font-weight: 600;
          padding: 0.18rem 0.5rem;
          border-radius: 6px;
        }

        .close-btn {
          color: var(--text-muted);
          padding: 4px;
          border-radius: 6px;
        }

        .close-btn:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.1);
        }

        .story-headline {
          font-size: 1.35rem;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.35;
          letter-spacing: -0.02em;
        }

        .summary-box {
          background: rgba(16, 23, 38, 0.95);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-left: 4px solid var(--brand-primary);
          padding: 1rem 1.15rem;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .summary-title {
          font-size: 0.68rem;
          font-weight: 800;
          color: #60a5fa;
          letter-spacing: 0.05em;
        }

        .summary-lines {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        .line {
          font-size: 0.92rem;
          color: #f1f5f9;
          line-height: 1.5;
        }

        .details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-subtle);
          padding: 0.85rem;
          border-radius: 10px;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .label {
          font-size: 0.68rem;
          color: var(--text-muted);
        }

        .value {
          font-size: 0.78rem;
          color: var(--text-secondary);
        }

        .value.bold {
          color: #ffffff;
          font-weight: 600;
        }

        .capitalize {
          text-transform: capitalize;
        }

        .tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .tag-chip {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        .modal-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding-top: 0.75rem;
          border-top: 1px solid var(--border-subtle);
          flex-wrap: wrap;
        }

        .footer-actions {
          display: flex;
          gap: 0.5rem;
        }

        .footer-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 0.85rem;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          font-size: 0.78rem;
          font-weight: 600;
          transition: all 0.15s ease;
        }

        .footer-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
        }

        .footer-btn.saved {
          color: #f59e0b;
          background: rgba(245, 158, 11, 0.15);
          border-color: rgba(245, 158, 11, 0.3);
        }

        .original-source-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.55rem 1.15rem;
          border-radius: 8px;
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          color: #ffffff;
          font-size: 0.82rem;
          font-weight: 700;
          box-shadow: 0 0 15px rgba(37, 99, 235, 0.35);
          transition: all 0.2s ease;
        }

        .original-source-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 0 25px rgba(37, 99, 235, 0.6);
        }
      `}</style>
    </div>
  );
}

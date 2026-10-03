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
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Top Header */}
        <div className="modal-header">
          <div className="header-meta">
            <span 
              className="domain-pill"
              style={{
                borderColor: domainObj.color,
                color: domainObj.color,
                background: `color-mix(in srgb, ${domainObj.color} 10%, transparent)`
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

        {/* Actions Footer */}
        <div className="modal-footer">
          <button 
            onClick={() => onToggleSave && onToggleSave(story.id)}
            className={`action-btn ${isSaved ? 'saved' : ''}`}
          >
            <Bookmark size={15} />
            <span>{isSaved ? 'Saved in Bookmarks' : 'Save Story'}</span>
          </button>

          <a 
            href={story.source_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="official-link-btn"
          >
            <span>Read Original Circular / Filing</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      <style jsx>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.45);
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
          background: #ffffff;
          border: 1px solid rgba(226, 232, 240, 0.95);
          border-radius: 16px;
          padding: 1.65rem;
          box-shadow: 0 20px 50px rgba(15, 23, 42, 0.15);
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid rgba(241, 245, 249, 0.9);
        }

        .header-meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .domain-pill {
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          border: 1px solid;
        }

        .country-badge {
          background: #f1f5f9;
          border: 1px solid rgba(226, 232, 240, 0.8);
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
          font-size: 0.72rem;
          color: #475569;
        }

        .official-badge {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          background: rgba(16, 185, 129, 0.1);
          color: #047857;
          border: 1px solid rgba(16, 185, 129, 0.25);
          font-size: 0.68rem;
          font-weight: 700;
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
        }

        .close-btn {
          color: #64748b;
          padding: 4px;
          border-radius: 6px;
        }

        .close-btn:hover {
          color: #0f172a;
          background: #f1f5f9;
        }

        .story-headline {
          font-size: 1.35rem;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.35;
          letter-spacing: -0.02em;
        }

        .summary-box {
          background: #f8fafc;
          border: 1px solid rgba(37, 99, 235, 0.25);
          border-left: 4px solid #2563eb;
          padding: 1rem 1.15rem;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .summary-title {
          font-size: 0.68rem;
          font-weight: 800;
          color: #2563eb;
          letter-spacing: 0.05em;
        }

        .summary-lines {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        .line {
          font-size: 0.92rem;
          color: #1e293b;
          line-height: 1.5;
        }

        .details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          background: #f8fafc;
          border: 1px solid rgba(226, 232, 240, 0.8);
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
          color: #64748b;
        }

        .value {
          font-size: 0.78rem;
          color: #334155;
        }

        .value.bold {
          color: #0f172a;
          font-weight: 700;
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
          background: #f1f5f9;
          border: 1px solid rgba(226, 232, 240, 0.8);
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          font-size: 0.7rem;
          color: #475569;
        }

        .modal-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(241, 245, 249, 0.9);
          flex-wrap: wrap;
          gap: 0.65rem;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: #f1f5f9;
          border: 1px solid rgba(226, 232, 240, 0.9);
          color: #334155;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0.5rem 0.85rem;
          border-radius: 8px;
          transition: all 0.15s ease;
        }

        .action-btn:hover {
          background: #e2e8f0;
          color: #0f172a;
        }

        .action-btn.saved {
          background: rgba(37, 99, 235, 0.08);
          border-color: rgba(37, 99, 235, 0.3);
          color: #2563eb;
        }

        .official-link-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          color: #ffffff;
          font-size: 0.82rem;
          font-weight: 700;
          padding: 0.55rem 1rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.25);
          transition: all 0.15s ease;
        }

        .official-link-btn:hover {
          background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
}

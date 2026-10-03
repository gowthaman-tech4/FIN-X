'use client';

import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Landmark, 
  Scale, 
  TrendingUp, 
  Globe, 
  Building2, 
  Briefcase, 
  FileText,
  Star,
  Sparkles,
  SlidersHorizontal,
  Check
} from 'lucide-react';
import { DOMAINS } from '../data/mockData';

const ICONS = {
  Compass,
  Landmark,
  Scale,
  TrendingUp,
  Globe,
  Building2,
  Briefcase,
  FileText
};

export default function DomainNav({ 
  activeDomain, 
  onSelectDomain, 
  storyCountsByDomain = {},
  pinnedDomains = [],
  onTogglePinDomain,
  onApplyPreset
}) {
  const [showPresetsMenu, setShowPresetsMenu] = useState(false);

  const presets = [
    { id: 'ca', label: '🎓 CA / Tax Pro', domains: ['tax', 'regulations'] },
    { id: 'trader', label: '📈 Market Trader', domains: ['markets', 'economy'] },
    { id: 'cfo', label: '💼 Founder / CFO', domains: ['tax', 'banking', 'policy'] },
  ];

  return (
    <nav className="domain-nav-container" aria-label="Financial Domains Navigation">
      <div className="container">
        <div className="nav-row">
          {/* Scrollable Pills Track */}
          <div className="scroll-wrapper">
            <div className="pills-track">
              {/* Special "My Focus" Pill if user has pinned domains */}
              {pinnedDomains.length > 0 && (
                <button
                  onClick={() => onSelectDomain('my_focus')}
                  className={`domain-pill my-focus-pill ${activeDomain === 'my_focus' ? 'active' : ''}`}
                  title={`Filtered to your pinned domains: ${pinnedDomains.join(', ')}`}
                >
                  <Star size={13} className="star-icon filled" />
                  <span className="pill-label">My Focus ({pinnedDomains.length})</span>
                </button>
              )}

              {/* Standard Domain Pills */}
              {DOMAINS.map((domain) => {
                const IconComponent = ICONS[domain.icon] || Compass;
                const isActive = activeDomain === domain.id;
                const count = storyCountsByDomain[domain.id] ?? 0;
                const isPinned = pinnedDomains.includes(domain.id);

                return (
                  <div key={domain.id} className="pill-wrapper">
                    <button
                      onClick={() => onSelectDomain(domain.id)}
                      className={`domain-pill ${isActive ? 'active' : ''}`}
                      style={{
                        '--domain-color': domain.color
                      }}
                      id={`domain-tab-${domain.id}`}
                    >
                      <span className="pill-icon-wrapper">
                        <IconComponent size={14} />
                      </span>
                      <span className="pill-label">{domain.label}</span>
                      {count > 0 && (
                        <span className="pill-badge">{count}</span>
                      )}
                    </button>

                    {domain.id !== 'all' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onTogglePinDomain) onTogglePinDomain(domain.id);
                        }}
                        className={`pin-btn ${isPinned ? 'pinned' : ''}`}
                        title={isPinned ? `Remove ${domain.label} from My Focus` : `Pin ${domain.label} to My Focus`}
                        aria-label={`Pin ${domain.label}`}
                      >
                        <Star size={11} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Audience Presets Trigger */}
          <div className="presets-wrapper">
            <button 
              onClick={() => setShowPresetsMenu(!showPresetsMenu)}
              className="presets-toggle-btn"
              title="Quick domain presets"
            >
              <Sparkles size={13} style={{ color: '#2563eb' }} />
              <span className="presets-text">Audience Focus</span>
            </button>

            {showPresetsMenu && (
              <div className="presets-dropdown glass-panel">
                <div className="presets-header">
                  <span>1-Click Focus Presets</span>
                </div>
                {presets.map((p) => {
                  const isCurrent = p.domains.every(d => pinnedDomains.includes(d)) && p.domains.length === pinnedDomains.length;
                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        if (onApplyPreset) onApplyPreset(p.domains);
                        setShowPresetsMenu(false);
                      }}
                      className={`preset-item ${isCurrent ? 'active' : ''}`}
                    >
                      <span>{p.label}</span>
                      {isCurrent && <Check size={13} style={{ color: '#2563eb' }} />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .domain-nav-container {
          background: rgba(255, 255, 255, 0.92);
          border-bottom: 1px solid var(--border-subtle);
          position: sticky;
          top: 73px;
          z-index: 90;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: 0 1px 3px rgba(15, 23, 42, 0.03);
        }

        .nav-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
        }

        .scroll-wrapper {
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding: 0.5rem 0;
          flex: 1;
        }

        .scroll-wrapper::-webkit-scrollbar {
          display: none;
        }

        .pills-track {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          min-width: max-content;
        }

        .pill-wrapper {
          display: inline-flex;
          align-items: center;
          position: relative;
        }

        .domain-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.38rem 0.8rem;
          border-radius: 9999px;
          font-size: 0.78rem;
          font-weight: 500;
          color: var(--text-secondary);
          background: #ffffff;
          border: 1px solid rgba(226, 232, 240, 0.9);
          transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
          white-space: nowrap;
          box-shadow: 0 1px 2px rgba(15, 23, 42, 0.03);
        }

        .domain-pill:hover {
          color: var(--text-primary);
          background: #f8fafc;
          border-color: rgba(203, 213, 225, 0.9);
          transform: translateY(-1px);
          box-shadow: 0 2px 6px rgba(15, 23, 42, 0.06);
        }

        .domain-pill.active {
          color: #ffffff;
          background: var(--text-primary);
          border-color: var(--text-primary);
          font-weight: 600;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.18);
        }

        .my-focus-pill {
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.15) 100%);
          border-color: rgba(245, 158, 11, 0.4);
          color: #b45309;
          font-weight: 600;
        }

        .my-focus-pill.active {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: #ffffff;
          border-color: #d97706;
          box-shadow: 0 2px 8px rgba(217, 119, 6, 0.3);
        }

        .star-icon.filled {
          fill: currentColor;
        }

        .pill-icon-wrapper {
          display: flex;
          align-items: center;
          color: var(--domain-color);
        }

        .domain-pill.active .pill-icon-wrapper {
          color: #ffffff;
        }

        .pill-label {
          line-height: 1;
        }

        .pill-badge {
          background: rgba(15, 23, 42, 0.06);
          color: var(--text-secondary);
          font-size: 0.65rem;
          font-weight: 700;
          padding: 0.1rem 0.38rem;
          border-radius: 9999px;
          line-height: 1;
        }

        .domain-pill.active .pill-badge {
          background: rgba(255, 255, 255, 0.25);
          color: #ffffff;
        }

        .pin-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          color: #94a3b8;
          margin-left: -6px;
          z-index: 2;
          background: #ffffff;
          border: 1px solid rgba(226, 232, 240, 0.8);
          transition: all 0.15s ease;
        }

        .pin-btn:hover {
          color: #f59e0b;
          transform: scale(1.15);
        }

        .pin-btn.pinned {
          color: #d97706;
          fill: #f59e0b;
          background: #fef3c7;
          border-color: #fde68a;
        }

        /* Presets Menu */
        .presets-wrapper {
          position: relative;
        }

        .presets-toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.35rem 0.65rem;
          border-radius: 6px;
          font-size: 0.72rem;
          font-weight: 600;
          color: #2563eb;
          background: rgba(37, 99, 235, 0.08);
          border: 1px solid rgba(37, 99, 235, 0.2);
          white-space: nowrap;
          transition: all 0.15s ease;
        }

        .presets-toggle-btn:hover {
          background: rgba(37, 99, 235, 0.15);
        }

        .presets-dropdown {
          position: absolute;
          right: 0;
          top: calc(100% + 6px);
          width: 200px;
          background: #ffffff;
          border: 1px solid var(--border-highlight);
          border-radius: 10px;
          padding: 0.4rem;
          box-shadow: 0 10px 25px rgba(15, 23, 42, 0.12);
          z-index: 100;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .presets-header {
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.3rem 0.5rem;
        }

        .preset-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.45rem 0.6rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-secondary);
          border-radius: 6px;
          transition: all 0.15s ease;
          text-align: left;
        }

        .preset-item:hover {
          background: #f1f5f9;
          color: var(--text-primary);
        }

        .preset-item.active {
          background: rgba(37, 99, 235, 0.08);
          color: #2563eb;
        }

        @media (max-width: 640px) {
          .presets-text {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
}

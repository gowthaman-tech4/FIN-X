'use client';

import React, { useState } from 'react';
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
          {/* Scrollable Tabs Track */}
          <div className="scroll-wrapper">
            <div className="pills-track">
              {/* Special "My Focus" Tab if user has pinned domains */}
              {pinnedDomains.length > 0 && (
                <button
                  onClick={() => onSelectDomain('my_focus')}
                  className={`domain-pill my-focus-pill ${activeDomain === 'my_focus' ? 'active' : ''}`}
                  title={`Filtered to your pinned domains: ${pinnedDomains.join(', ')}`}
                >
                  <Star size={12} className="star-icon filled" />
                  <span className="pill-label">My Focus ({pinnedDomains.length})</span>
                </button>
              )}

              {/* Standard Domain Tabs with Sharp Wikipedia Styling */}
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
                        <IconComponent size={13} />
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
                        <Star size={10} />
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
              <Sparkles size={12} style={{ color: 'var(--brand-primary)' }} />
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
                      {isCurrent && <Check size={12} style={{ color: 'var(--brand-primary)' }} />}
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
          background: #ffffff;
          border-bottom: 1px solid var(--border-subtle);
          position: sticky;
          top: 67px;
          z-index: 90;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
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
          padding: 0.45rem 0;
          flex: 1;
        }

        .scroll-wrapper::-webkit-scrollbar {
          display: none;
        }

        .pills-track {
          display: flex;
          align-items: center;
          gap: 0.35rem;
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
          gap: 0.35rem;
          padding: 0.32rem 0.65rem;
          border-radius: var(--radius);
          font-size: 0.76rem;
          font-weight: 600;
          color: var(--text-secondary);
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          transition: all 0.15s ease;
          white-space: nowrap;
        }

        .domain-pill:hover {
          color: var(--text-primary);
          border-color: var(--brand-primary);
          background: #f8faf9;
        }

        .domain-pill.active {
          color: #ffffff;
          background: var(--brand-primary);
          border-color: #16382b;
          font-weight: 700;
        }

        .my-focus-pill {
          background: #f0f7f3;
          border-color: #a8cfb8;
          color: var(--brand-primary);
        }

        .my-focus-pill.active {
          background: var(--brand-primary);
          color: #ffffff;
          border-color: #16382b;
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
          background: #eaecf0;
          color: var(--text-secondary);
          font-size: 0.62rem;
          font-weight: 700;
          padding: 0.08rem 0.3rem;
          border-radius: var(--radius-sm);
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
          width: 17px;
          height: 17px;
          border-radius: var(--radius-sm);
          color: #72777d;
          margin-left: -5px;
          z-index: 2;
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          transition: all 0.15s ease;
        }

        .pin-btn:hover {
          color: var(--brand-primary);
          border-color: var(--brand-primary);
        }

        .pin-btn.pinned {
          color: #b45309;
          fill: #b45309;
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
          padding: 0.32rem 0.65rem;
          border-radius: var(--radius);
          background: #f8faf9;
          border: 1px solid var(--border-subtle);
          font-size: 0.74rem;
          font-weight: 600;
          color: var(--text-primary);
          transition: all 0.15s ease;
          white-space: nowrap;
        }

        .presets-toggle-btn:hover {
          border-color: var(--brand-primary);
          background: #ffffff;
        }

        .presets-dropdown {
          position: absolute;
          top: calc(100% + 6px);
          right: 0;
          width: 210px;
          background: #ffffff;
          border: 1px solid #a2a9b1;
          border-radius: var(--radius);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
          z-index: 150;
          padding: 0.4rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .presets-header {
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--text-muted);
          padding: 0.3rem 0.45rem;
          border-bottom: 1px solid #eaecf0;
          letter-spacing: 0.04em;
        }

        .preset-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.4rem 0.55rem;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          color: var(--text-primary);
          border: 1px solid transparent;
          background: transparent;
          text-align: left;
          transition: all 0.15s ease;
        }

        .preset-item:hover {
          background: #f0f7f3;
          border-color: #a8cfb8;
        }

        .preset-item.active {
          background: #f0f7f3;
          border-color: var(--brand-primary);
          font-weight: 700;
          color: var(--brand-primary);
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

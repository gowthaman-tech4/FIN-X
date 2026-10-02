'use client';

import React from 'react';
import { 
  Compass, 
  Landmark, 
  Scale, 
  TrendingUp, 
  Globe, 
  Building2, 
  Briefcase, 
  FileText 
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

export default function DomainNav({ activeDomain, onSelectDomain, storyCountsByDomain = {} }) {
  return (
    <nav className="domain-nav-container" aria-label="Financial Domains Navigation">
      <div className="container">
        <div className="scroll-wrapper">
          <div className="pills-track">
            {DOMAINS.map((domain) => {
              const IconComponent = ICONS[domain.icon] || Compass;
              const isActive = activeDomain === domain.id;
              const count = storyCountsByDomain[domain.id] ?? 0;

              return (
                <button
                  key={domain.id}
                  onClick={() => onSelectDomain(domain.id)}
                  className={`domain-pill ${isActive ? 'active' : ''}`}
                  style={{
                    '--domain-color': domain.color
                  }}
                  id={`domain-tab-${domain.id}`}
                >
                  <span className="pill-icon-wrapper">
                    <IconComponent size={15} />
                  </span>
                  <span className="pill-label">{domain.label}</span>
                  {count > 0 && (
                    <span className="pill-badge">{count}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .domain-nav-container {
          background: rgba(12, 17, 28, 0.7);
          border-bottom: 1px solid var(--border-subtle);
          position: sticky;
          top: 73px;
          z-index: 90;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .scroll-wrapper {
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding: 0.55rem 0;
        }

        .scroll-wrapper::-webkit-scrollbar {
          display: none;
        }

        .pills-track {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          min-width: max-content;
        }

        .domain-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.42rem 0.85rem;
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
          white-space: nowrap;
        }

        .domain-pill:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.07);
          border-color: rgba(255, 255, 255, 0.15);
          transform: translateY(-1px);
        }

        .domain-pill.active {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.12);
          border-color: var(--domain-color);
          box-shadow: 0 0 16px -2px var(--domain-color);
          font-weight: 600;
        }

        .pill-icon-wrapper {
          display: flex;
          align-items: center;
          color: var(--domain-color);
        }

        .pill-label {
          line-height: 1;
        }

        .pill-badge {
          background: rgba(255, 255, 255, 0.12);
          color: var(--text-secondary);
          font-size: 0.65rem;
          font-weight: 700;
          padding: 0.1rem 0.4rem;
          border-radius: 9999px;
          line-height: 1;
        }

        .domain-pill.active .pill-badge {
          background: var(--domain-color);
          color: #030712;
        }
      `}</style>
    </nav>
  );
}

'use client';

import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  SlidersHorizontal, 
  ExternalLink, 
  X, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Globe, 
  Bookmark 
} from 'lucide-react';
import { COUNTRIES } from '../data/mockData';

export default function Header({ 
  selectedCountry, 
  onSelectCountry, 
  searchQuery, 
  onSearchChange,
  onOpenAlerts,
  savedStoriesCount = 0,
  onToggleFilterSaved,
  showOnlySaved
}) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header className="header-wrapper">
      <div className="container">
        {/* Top Wikipedia Status Line */}
        <div className="top-banner">
          <div className="live-status">
            <span className="live-indicator" />
            <span className="live-slot-text">
              <strong>Morning Edition</strong> (7:00 AM IST) • Continuous Verified Digest
            </span>
          </div>

          <div className="top-banner-right">
            <span className="source-counter-text">
              ⚡ 17 Official Regulatory Authorities & Media Desks • 100% Attribution
            </span>
          </div>
        </div>

        {/* Main Nav Bar */}
        <div className="nav-row">
          {/* Logo & Tagline */}
          <div className="brand-group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="logo-box">
              <img 
                src="/logo.png" 
                alt="FIN-X Finance News For You" 
                className="logo-img"
                onError={(e) => {
                  e.target.style.display = 'none';
                  const fallback = document.getElementById('finx-logo-fallback');
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div id="finx-logo-fallback" className="logo-fallback" style={{ display: 'none' }}>
                <span className="fallback-scroll">📜</span>
              </div>
            </div>
            <div className="brand-meta">
              <span className="brand-title">FIN-X</span>
              <span className="brand-sub">FINANCE NEWS FOR YOU</span>
            </div>
          </div>

          {/* Search Bar - Wikipedia Sharp Edges */}
          <div className={`search-container ${isSearchFocused ? 'focused' : ''}`}>
            <Search className="search-icon" size={15} />
            <input 
              type="text" 
              placeholder="Search tax circulars, RBI, SEBI, Fed, stocks..." 
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="search-input"
              id="finx-global-search"
            />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')} 
                className="clear-search-btn"
                title="Clear search"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Controls: Country Switcher & Actions */}
          <div className="controls-group">
            {/* Country Selector with Sharp Wikipedia Edges */}
            <div className="country-switch" role="group" aria-label="Country Filter">
              {COUNTRIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => onSelectCountry(c.id)}
                  className={`country-btn ${selectedCountry === c.id ? 'active' : ''}`}
                  title={`Filter by ${c.label}`}
                >
                  <span className="country-flag">{c.flag}</span>
                  <span className="country-label">{c.label}</span>
                </button>
              ))}
            </div>

            {/* Saved Bookmarks Button */}
            <button 
              onClick={onToggleFilterSaved} 
              className={`icon-btn ${showOnlySaved ? 'active-pill' : ''}`}
              title="Saved Stories"
            >
              <Bookmark size={15} />
              {savedStoriesCount > 0 && (
                <span className="badge-count">{savedStoriesCount}</span>
              )}
            </button>

            {/* Alerts / Bell Button */}
            <button 
              onClick={onOpenAlerts} 
              className="btn-primary-sharp"
              title="Set Custom Alert Times"
            >
              <Bell size={14} />
              <span className="hide-on-mobile">Alert Times</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .header-wrapper {
          border-bottom: 1px solid var(--border-subtle);
          background: #ffffff;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
        }

        .top-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.35rem 0;
          border-bottom: 1px solid #eaecf0;
          font-size: 0.73rem;
          color: var(--text-secondary);
        }

        .live-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .live-slot-text strong {
          color: var(--brand-primary);
        }

        .source-counter-text {
          color: var(--text-muted);
          font-size: 0.72rem;
        }

        .nav-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.25rem;
          padding: 0.65rem 0;
        }

        .brand-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          user-select: none;
        }

        .logo-box {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 42px;
        }

        .logo-img {
          height: 40px;
          width: auto;
          max-width: 54px;
          object-fit: contain;
          display: block;
        }

        .logo-fallback {
          font-size: 1.6rem;
        }

        .brand-meta {
          display: flex;
          flex-direction: column;
          border-left: 2px solid var(--brand-primary);
          padding-left: 0.65rem;
        }

        .brand-title {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--brand-primary);
          line-height: 1;
          letter-spacing: 0.04em;
        }

        .brand-sub {
          font-family: var(--font-sans);
          font-size: 0.58rem;
          font-weight: 700;
          color: var(--brand-secondary);
          letter-spacing: 0.08em;
          margin-top: 2px;
        }

        /* Search Container - Sharp Wikipedia Styling */
        .search-container {
          flex: 1;
          max-width: 440px;
          position: relative;
          display: flex;
          align-items: center;
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius);
          padding: 0 0.75rem;
          transition: border-color 0.15s ease;
        }

        .search-container.focused {
          border-color: var(--brand-primary);
          box-shadow: 0 0 0 1px var(--brand-primary);
        }

        .search-icon {
          color: var(--text-muted);
          margin-right: 0.5rem;
          flex-shrink: 0;
        }

        .search-input {
          width: 100%;
          height: 34px;
          background: transparent;
          border: none;
          color: var(--text-primary);
          font-size: 0.82rem;
          outline: none;
        }

        .search-input::placeholder {
          color: #72777d;
        }

        .clear-search-btn {
          color: #72777d;
          display: flex;
          align-items: center;
          padding: 2px;
          border: none;
          background: transparent;
        }

        .clear-search-btn:hover {
          color: var(--text-primary);
        }

        /* Controls Group - Sharp Edges */
        .controls-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .country-switch {
          display: inline-flex;
          background: #f8faf9;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius);
          padding: 1px;
        }

        .country-btn {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.3rem 0.55rem;
          border-radius: var(--radius);
          border: none;
          background: transparent;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-secondary);
          transition: all 0.15s ease;
        }

        .country-btn:hover {
          color: var(--text-primary);
        }

        .country-btn.active {
          background: #ffffff;
          color: var(--brand-primary);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
          font-weight: 700;
        }

        .icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: var(--radius);
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          position: relative;
          transition: all 0.15s ease;
        }

        .icon-btn:hover {
          color: var(--brand-primary);
          border-color: var(--brand-primary);
        }

        .icon-btn.active-pill {
          background: var(--brand-light);
          border-color: var(--brand-primary);
          color: var(--brand-primary);
        }

        .badge-count {
          position: absolute;
          top: -4px;
          right: -4px;
          background: var(--brand-primary);
          color: #ffffff;
          font-size: 0.6rem;
          font-weight: 800;
          padding: 1px 4px;
          border-radius: var(--radius);
        }

        .btn-primary-sharp {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: var(--brand-primary);
          color: #ffffff;
          font-size: 0.78rem;
          font-weight: 600;
          padding: 0.42rem 0.85rem;
          border-radius: var(--radius);
          border: 1px solid #16382b;
          box-shadow: var(--shadow-sm);
          transition: all 0.15s ease;
        }

        .btn-primary-sharp:hover {
          background: var(--brand-secondary);
          border-color: var(--brand-secondary);
        }

        @media (max-width: 900px) {
          .brand-meta {
            display: none;
          }
        }

        @media (max-width: 680px) {
          .hide-on-mobile {
            display: none;
          }
          .country-label {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}

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
        {/* Top Info Bar */}
        <div className="top-banner">
          <div className="live-status">
            <span className="live-indicator" />
            <span className="live-slot-text">
              <strong>Morning Edition</strong> (7:00 AM IST) • Active Continuous Digest
            </span>
          </div>

          <div className="top-banner-right">
            <span className="source-counter-text">
              ⚡ 17 Official Authorities & Media Feeds • 100% Attribution
            </span>
          </div>
        </div>

        {/* Main Nav Bar */}
        <div className="nav-row">
          {/* Logo & Tagline */}
          <div className="brand-group">
            <div className="logo-box">
              <span className="logo-text">FIN<span className="logo-accent">-X</span></span>
            </div>
            <div className="brand-meta">
              <span className="brand-title">Global Financial Digest</span>
              <span className="brand-sub">2-Line Executive Intelligence • Official Sources</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className={`search-container ${isSearchFocused ? 'focused' : ''}`}>
            <Search className="search-icon" size={16} />
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
                <X size={14} />
              </button>
            )}
          </div>

          {/* Controls: Country Switcher & Actions */}
          <div className="controls-group">
            {/* Country Selector */}
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
              className="btn-primary-glow"
              title="Get Witty Finance Alerts"
            >
              <Bell size={15} />
              <span className="hide-on-mobile">Get Alerts</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .header-wrapper {
          border-bottom: 1px solid var(--border-subtle);
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 1px 3px rgba(15, 23, 42, 0.03);
        }

        .top-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.35rem 0;
          border-bottom: 1px solid rgba(241, 245, 249, 0.95);
          font-size: 0.73rem;
        }

        .live-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
        }

        .live-slot-text strong {
          color: #0f172a;
        }

        .source-counter-text {
          color: #64748b;
          font-weight: 500;
        }

        .nav-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.25rem;
          padding: 0.75rem 0;
        }

        .brand-group {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          cursor: pointer;
        }

        .logo-box {
          display: flex;
          align-items: center;
        }

        .logo-text {
          font-size: 1.45rem;
          font-weight: 900;
          color: #0f172a;
          letter-spacing: -0.04em;
        }

        .logo-accent {
          background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .brand-meta {
          display: flex;
          flex-direction: column;
          border-left: 1px solid rgba(226, 232, 240, 0.9);
          padding-left: 0.85rem;
        }

        .brand-title {
          font-size: 0.8rem;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.2;
        }

        .brand-sub {
          font-size: 0.68rem;
          color: var(--text-muted);
        }

        /* Search Container */
        .search-container {
          flex: 1;
          max-width: 440px;
          position: relative;
          display: flex;
          align-items: center;
          background: #f8fafc;
          border: 1px solid rgba(226, 232, 240, 0.9);
          border-radius: 9999px;
          padding: 0 0.85rem;
          transition: all 0.2s ease;
        }

        .search-container.focused {
          background: #ffffff;
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
        }

        .search-icon {
          color: #94a3b8;
          margin-right: 0.5rem;
          flex-shrink: 0;
        }

        .search-input {
          width: 100%;
          height: 38px;
          background: transparent;
          border: none;
          color: #0f172a;
          font-size: 0.82rem;
          outline: none;
        }

        .search-input::placeholder {
          color: #94a3b8;
        }

        .clear-search-btn {
          color: #94a3b8;
          display: flex;
          align-items: center;
          padding: 2px;
          border-radius: 50%;
        }

        .clear-search-btn:hover {
          color: #0f172a;
        }

        /* Controls Group */
        .controls-group {
          display: flex;
          align-items: center;
          gap: 0.65rem;
        }

        .country-switch {
          display: inline-flex;
          background: #f1f5f9;
          border: 1px solid rgba(226, 232, 240, 0.9);
          border-radius: 8px;
          padding: 2px;
        }

        .country-btn {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.32rem 0.65rem;
          border-radius: 6px;
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
          color: #0f172a;
          box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);
        }

        .icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: #ffffff;
          border: 1px solid rgba(226, 232, 240, 0.9);
          color: var(--text-secondary);
          position: relative;
          transition: all 0.15s ease;
        }

        .icon-btn:hover {
          color: var(--text-primary);
          background: #f8fafc;
        }

        .icon-btn.active-pill {
          background: rgba(37, 99, 235, 0.08);
          border-color: #2563eb;
          color: #2563eb;
        }

        .badge-count {
          position: absolute;
          top: -4px;
          right: -4px;
          background: #2563eb;
          color: #ffffff;
          font-size: 0.62rem;
          font-weight: 800;
          padding: 1px 5px;
          border-radius: 9999px;
        }

        .btn-primary-glow {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          color: #ffffff;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 0.45rem 0.95rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.25);
          transition: all 0.18s ease;
        }

        .btn-primary-glow:hover {
          background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
          box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);
          transform: translateY(-1px);
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

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
  Globe
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
              <strong>Morning Digest</strong> • Active Edition (7:00 AM IST)
            </span>
            <span className="live-badge">Live Discovery</span>
          </div>

          <div className="top-banner-right">
            <span className="text-secondary text-xs">
              ⚡ ₹0 Aggregation Pipeline • 17 Verified Sources
            </span>
          </div>
        </div>

        {/* Main Nav Bar */}
        <div className="nav-row">
          {/* Logo & Tagline */}
          <div className="brand-group">
            <div className="logo-box">
              <span className="logo-text">FIN<span className="logo-accent">-X</span></span>
              <span className="logo-dot" />
            </div>
            <div className="brand-meta">
              <span className="brand-title">Your Global Finance Digest</span>
              <span className="brand-sub">Discover • Understand in 2 Lines • Original Sources</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className={`search-container ${isSearchFocused ? 'focused' : ''}`}>
            <Search className="search-icon" size={17} />
            <input 
              type="text" 
              placeholder="Search tax rules, RBI, SEBI, Fed, stocks..." 
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
              <span>🔖</span>
              {savedStoriesCount > 0 && (
                <span className="badge-count">{savedStoriesCount}</span>
              )}
            </button>

            {/* Alerts / Bell Button */}
            <button 
              onClick={onOpenAlerts} 
              className="btn-primary-glow"
              title="Get Must-Know Alerts"
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
          background: rgba(6, 9, 14, 0.85);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .top-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.35rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          font-size: 0.75rem;
        }

        .live-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
        }

        .live-slot-text {
          color: var(--text-primary);
        }

        .live-badge {
          background: rgba(16, 185, 129, 0.15);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.3);
          font-size: 0.65rem;
          padding: 0.1rem 0.4rem;
          border-radius: 9999px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .top-banner-right {
          color: var(--text-muted);
        }

        .nav-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.25rem;
          padding: 0.85rem 0;
        }

        .brand-group {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          cursor: pointer;
        }

        .logo-box {
          position: relative;
          display: flex;
          align-items: baseline;
        }

        .logo-text {
          font-size: 1.7rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          color: #ffffff;
          line-height: 1;
        }

        .logo-accent {
          background: var(--brand-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .logo-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #38bdf8;
          display: inline-block;
          margin-left: 2px;
          box-shadow: 0 0 10px #38bdf8;
        }

        .brand-meta {
          display: flex;
          flex-direction: column;
        }

        .brand-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.1;
        }

        .brand-sub {
          font-size: 0.68rem;
          color: var(--text-muted);
          margin-top: 1px;
        }

        .search-container {
          flex: 1;
          max-width: 440px;
          position: relative;
          display: flex;
          align-items: center;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 10px;
          padding: 0.45rem 0.85rem;
          transition: all 0.2s ease;
        }

        .search-container.focused {
          border-color: var(--brand-primary);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
          background: var(--bg-card);
        }

        .search-icon {
          color: var(--text-muted);
          margin-right: 0.5rem;
          flex-shrink: 0;
        }

        .search-input {
          flex: 1;
          background: transparent;
          border: none;
          color: var(--text-primary);
          font-size: 0.85rem;
          outline: none;
          width: 100%;
        }

        .search-input::placeholder {
          color: var(--text-muted);
        }

        .clear-search-btn {
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2px;
          border-radius: 4px;
        }

        .clear-search-btn:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.1);
        }

        .controls-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .country-switch {
          display: flex;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          padding: 3px;
          border-radius: 8px;
          gap: 2px;
        }

        .country-btn {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.3rem 0.6rem;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--text-secondary);
          transition: all 0.15s ease;
        }

        .country-btn:hover {
          color: var(--text-primary);
        }

        .country-btn.active {
          background: rgba(255, 255, 255, 0.12);
          color: #ffffff;
          font-weight: 600;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        }

        .country-flag {
          font-size: 0.95rem;
        }

        .icon-btn {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          transition: all 0.15s ease;
        }

        .icon-btn:hover {
          border-color: var(--border-highlight);
          color: var(--text-primary);
        }

        .icon-btn.active-pill {
          background: rgba(59, 130, 246, 0.2);
          border-color: var(--brand-primary);
        }

        .badge-count {
          position: absolute;
          top: -4px;
          right: -4px;
          background: var(--brand-primary);
          color: white;
          font-size: 0.65rem;
          font-weight: 700;
          border-radius: 9999px;
          padding: 1px 5px;
          line-height: 1;
        }

        .btn-primary-glow {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          color: white;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0.45rem 0.95rem;
          border-radius: 8px;
          box-shadow: 0 0 15px rgba(37, 99, 235, 0.35);
          transition: all 0.2s ease;
        }

        .btn-primary-glow:hover {
          box-shadow: 0 0 20px rgba(37, 99, 235, 0.6);
          transform: translateY(-1px);
        }

        @media (max-width: 900px) {
          .brand-sub, .hide-on-mobile, .top-banner-right {
            display: none;
          }
          .search-container {
            max-width: 240px;
          }
        }

        @media (max-width: 640px) {
          .country-label {
            display: none;
          }
          .search-container {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}

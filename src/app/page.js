'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Header from '../components/Header';
import DomainNav from '../components/DomainNav';
import DigestHero from '../components/DigestHero';
import TopStories from '../components/TopStories';
import NewsCard from '../components/NewsCard';
import CalendarWidget from '../components/CalendarWidget';
import AuthorityWatch from '../components/AuthorityWatch';
import ScheduleWidget from '../components/ScheduleWidget';
import StoryModal from '../components/StoryModal';
import AlertsModal from '../components/AlertsModal';
import SourceRegistryModal from '../components/SourceRegistryModal';
import { INITIAL_STORIES, DOMAINS } from '../data/mockData';
import { 
  Sparkles, 
  Search, 
  RotateCcw, 
  ShieldCheck, 
  Bookmark, 
  Info, 
  ExternalLink,
  Flame,
  CheckCircle2,
  Calendar,
  X,
  Bell
} from 'lucide-react';

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState('ALL');
  const [activeDomain, setActiveDomain] = useState('all');
  const [activeDigest, setActiveDigest] = useState('morning');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedStoryIds, setSavedStoryIds] = useState([]);
  const [showOnlySaved, setShowOnlySaved] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [isSourceRegistryOpen, setIsSourceRegistryOpen] = useState(false);
  const [allStories, setAllStories] = useState(INITIAL_STORIES);
  const [isLiveDB, setIsLiveDB] = useState(false);
  const [pinnedDomains, setPinnedDomains] = useState(['tax', 'regulations']);
  const [activeToast, setActiveToast] = useState(null);

  // Fetch live stories from Supabase database via /api/stories
  useEffect(() => {
    async function loadLiveStories() {
      try {
        const res = await fetch('/api/stories');
        if (res.ok) {
          const data = await res.json();
          if (data.stories && data.stories.length > 0) {
            setAllStories(data.stories);
            if (data.source === 'live_supabase') {
              setIsLiveDB(true);
            }
          }
        }
      } catch (err) {
        console.warn('Could not fetch live stories, using initial cache:', err);
      }
    }
    loadLiveStories();
  }, []);

  // Load saved bookmarks & pinned domains from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('finx_saved_stories');
      if (stored) {
        setSavedStoryIds(JSON.parse(stored));
      }
      const storedPins = localStorage.getItem('finx_pinned_domains');
      if (storedPins) {
        setPinnedDomains(JSON.parse(storedPins));
      }
    } catch (e) {
      console.warn('LocalStorage unavailable');
    }
  }, []);

  // Save bookmarks on change
  const toggleSaveStory = (id) => {
    setSavedStoryIds((prev) => {
      const updated = prev.includes(id) 
        ? prev.filter(storyId => storyId !== id) 
        : [...prev, id];
      try {
        localStorage.setItem('finx_saved_stories', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  // Toggle domain pinning for "My Focus"
  const togglePinDomain = (domainId) => {
    setPinnedDomains((prev) => {
      const updated = prev.includes(domainId)
        ? prev.filter(d => d !== domainId)
        : [...prev, domainId];
      try {
        localStorage.setItem('finx_pinned_domains', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const applyPreset = (domains) => {
    setPinnedDomains(domains);
    try {
      localStorage.setItem('finx_pinned_domains', JSON.stringify(domains));
    } catch (e) {}
    setActiveDomain('my_focus');
  };

  // Trigger in-app toast preview for Zomato/Swiggy style notifications
  const triggerToast = (hook) => {
    setActiveToast(hook);
    setTimeout(() => {
      setActiveToast(null);
    }, 6000);
  };

  // Compute story counts per domain based on current country filter
  const storyCountsByDomain = useMemo(() => {
    const counts = { all: 0, my_focus: 0 };
    DOMAINS.forEach(d => { counts[d.id] = 0; });

    allStories.forEach((story) => {
      const matchesCountry = selectedCountry === 'ALL' || story.country === selectedCountry || story.country === 'GLOBAL';
      if (matchesCountry) {
        counts.all += 1;
        if (counts[story.domain] !== undefined) {
          counts[story.domain] += 1;
        }
        if (pinnedDomains.includes(story.domain)) {
          counts.my_focus += 1;
        }
      }
    });

    return counts;
  }, [allStories, selectedCountry, pinnedDomains]);

  // Main filter pipeline
  const filteredStories = useMemo(() => {
    return allStories.filter((story) => {
      // 1. Country filter
      if (selectedCountry !== 'ALL' && story.country !== selectedCountry && story.country !== 'GLOBAL') {
        return false;
      }

      // 2. Domain filter (including "My Focus" pinned domains filter)
      if (activeDomain === 'my_focus') {
        if (!pinnedDomains.includes(story.domain)) {
          return false;
        }
      } else if (activeDomain !== 'all' && story.domain !== activeDomain) {
        return false;
      }

      // 3. Saved filter
      if (showOnlySaved && !savedStoryIds.includes(story.id)) {
        return false;
      }

      // 4. Quick filter (must-know / official)
      if (activeFilter === 'must_know' && story.importance !== 'critical' && story.importance !== 'high') {
        return false;
      }
      if (activeFilter === 'official' && story.source_type !== 'official' && story.authority_level !== 'P0') {
        return false;
      }

      // 5. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inHeadline = story.headline.toLowerCase().includes(q);
        const inSummary = story.summary.toLowerCase().includes(q);
        const inSource = story.source_name.toLowerCase().includes(q);
        const inTags = story.tags && story.tags.some(t => t.toLowerCase().includes(q));
        if (!inHeadline && !inSummary && !inSource && !inTags) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCountry, activeDomain, pinnedDomains, showOnlySaved, savedStoryIds, activeFilter, searchQuery]);

  // Lead 5 stories for top section (only on unfiltered Home view)
  const topBriefStories = useMemo(() => {
    if (activeDomain !== 'all' || searchQuery.trim() || showOnlySaved) {
      return [];
    }
    return allStories.filter(s => {
      const matchesCountry = selectedCountry === 'ALL' || s.country === selectedCountry || s.country === 'GLOBAL';
      return matchesCountry && (s.is_top_story || s.importance === 'critical' || s.importance === 'high');
    }).slice(0, 5);
  }, [allStories, activeDomain, searchQuery, showOnlySaved, selectedCountry]);

  const officialCount = useMemo(() => {
    return filteredStories.filter(s => s.source_type === 'official' || s.authority_level === 'P0').length;
  }, [filteredStories]);

  const resetAllFilters = () => {
    setActiveDomain('all');
    setSelectedCountry('ALL');
    setActiveFilter('all');
    setSearchQuery('');
    setShowOnlySaved(false);
  };

  return (
    <div className="finx-app">
      {/* Animated Push Toast Notification (Swiggy/Zomato style) */}
      {activeToast && (
        <aside 
          className="push-notification-toast"
          role="status"
          aria-live="polite"
          aria-label="New financial alert"
        >
          <div className="toast-inner">
            <div className="toast-icon-box">
              <img src="/logo.png" alt="FIN-X" className="toast-logo-img" />
            </div>
            <div className="toast-content">
              <div className="toast-header-row">
                <span className="toast-app-name">FIN-X • {activeToast.tag}</span>
                <span className="toast-time">Just now</span>
              </div>
              <strong className="toast-title">{activeToast.title}</strong>
              <p className="toast-body">{activeToast.body}</p>
            </div>
            <button 
              onClick={() => setActiveToast(null)} 
              className="toast-close-btn"
              title="Dismiss"
            >
              <X size={14} />
            </button>
          </div>
        </aside>
      )}

      {/* 1. Header with Country Switcher, Global Search & Alerts */}
      <Header
        selectedCountry={selectedCountry}
        onSelectCountry={setSelectedCountry}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenAlerts={() => setIsAlertsOpen(true)}
        savedStoriesCount={savedStoryIds.length}
        onToggleFilterSaved={() => setShowOnlySaved(!showOnlySaved)}
        showOnlySaved={showOnlySaved}
      />

      {/* 2. Domain Navigation Bar with "My Focus" & Pinning */}
      <DomainNav
        activeDomain={activeDomain}
        onSelectDomain={(id) => {
          setActiveDomain(id);
          setShowOnlySaved(false);
        }}
        storyCountsByDomain={storyCountsByDomain}
        pinnedDomains={pinnedDomains}
        onTogglePinDomain={togglePinDomain}
        onApplyPreset={applyPreset}
      />

      {/* 3. Main Content Container */}
      <main className="main-content">
        {/* Hero Digest Banner with 60-Sec Audio Brief Player */}
        <DigestHero
          activeDigest={activeDigest}
          onSelectDigest={setActiveDigest}
          activeFilter={activeFilter}
          onSelectFilter={setActiveFilter}
          totalStoriesCount={filteredStories.length}
          officialCount={officialCount}
          topStories={topBriefStories.length > 0 ? topBriefStories : allStories.slice(0, 5)}
          onStorySelect={(story) => setSelectedStory(story)}
        />

        <div className="container">
          <div className="layout-grid">
            {/* Left Stream: Curated Feeds & Stories */}
            <div className="feed-column">
              {/* Top 5 Stories Section (Visible on General Home) */}
              {topBriefStories.length > 0 && (
                <TopStories
                  stories={topBriefStories}
                  onStoryClick={(story) => setSelectedStory(story)}
                />
              )}

              {/* Feed Header */}
              <div className="feed-header-bar">
                <div className="feed-header-left">
                  <h2 className="feed-title">
                    {showOnlySaved ? (
                      <>Bookmarks & Saved Briefs ({filteredStories.length})</>
                    ) : activeDomain === 'my_focus' ? (
                      <>⭐ My Focus Stream ({filteredStories.length})</>
                    ) : activeDomain !== 'all' ? (
                      <>{DOMAINS.find(d => d.id === activeDomain)?.label} Stream ({filteredStories.length})</>
                    ) : (
                      <>Continuous Finance Stream ({filteredStories.length})</>
                    )}
                  </h2>

                  {(searchQuery || activeDomain !== 'all' || selectedCountry !== 'ALL' || activeFilter !== 'all' || showOnlySaved) && (
                    <button onClick={resetAllFilters} className="clear-filters-btn">
                      <RotateCcw size={12} />
                      <span>Reset Filters</span>
                    </button>
                  )}
                </div>

                <div className="feed-header-right">
                  {isLiveDB && (
                    <span className="live-db-pill">
                      <span className="live-dot" />
                      <span>Live Supabase ({allStories.length} Stories)</span>
                    </span>
                  )}
                  <span className="sort-label">Sorted by Official Authority</span>
                </div>
              </div>

              {/* Stories List */}
              {filteredStories.length > 0 ? (
                <div className="stories-stream">
                  {filteredStories.map((story) => (
                    <NewsCard
                      key={story.id}
                      story={story}
                      isSaved={savedStoryIds.includes(story.id)}
                      onToggleSave={toggleSaveStory}
                      onStoryClick={() => setSelectedStory(story)}
                    />
                  ))}
                </div>
              ) : (
                <div className="empty-state glass-panel">
                  <Search size={32} className="empty-icon" />
                  <h3 className="empty-title">No stories match your current filters</h3>
                  <p className="empty-desc">
                    Try switching countries, changing domain tabs, or clearing your search term.
                  </p>
                  <button onClick={resetAllFilters} className="empty-reset-btn">
                    Show All Stories
                  </button>
                </div>
              )}
            </div>

            {/* Right Sidebar: Calendar, Authority Watch & Cadence Widget */}
            <aside className="sidebar-column">
              <CalendarWidget selectedCountry={selectedCountry} />
              
              <AuthorityWatch />

              <ScheduleWidget onOpenAlerts={() => setIsAlertsOpen(true)} />

              {/* Source Registry Callout Card */}
              <div className="source-card glass-panel">
                <div className="source-card-head">
                  <ShieldCheck size={16} style={{ color: 'var(--brand-primary)' }} />
                  <span className="source-card-title">100% Attribution Transparency</span>
                </div>
                <p className="source-card-body">
                  FIN-X summarizes public official circulars (RBI, SEBI, CBDT, CBIC, Fed) and links directly to authoritative publications.
                </p>
                <button
                  onClick={() => setIsSourceRegistryOpen(true)}
                  className="source-card-btn"
                >
                  <span>View All 17 Sources</span>
                  <ExternalLink size={12} />
                </button>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* 4. Footer */}
      <footer className="footer-wrapper">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="footer-brand-lockup">
                <img src="/logo.png" alt="FIN-X" className="footer-logo-img" />
                <div className="footer-brand-text">
                  <span className="footer-brand-title">FIN-X</span>
                  <span className="footer-brand-sub">FINANCE NEWS FOR YOU</span>
                </div>
              </div>
              <p className="footer-tagline">
                The authoritative financial intelligence platform. Discover what happens in money across tax, regulation, markets, and policy without the noise.
              </p>
            </div>

            <div className="footer-links-group">
              <div className="footer-col">
                <span className="footer-heading">Key Domains</span>
                <button onClick={() => setActiveDomain('tax')} className="footer-link">Tax & GST</button>
                <button onClick={() => setActiveDomain('regulations')} className="footer-link">Regulations (RBI/SEBI)</button>
                <button onClick={() => setActiveDomain('markets')} className="footer-link">Markets (NSE/NYSE)</button>
                <button onClick={() => setActiveDomain('economy')} className="footer-link">Macro Economy & CPI</button>
              </div>

              <div className="footer-col">
                <span className="footer-heading">Product & Transparency</span>
                <button onClick={() => setIsSourceRegistryOpen(true)} className="footer-link">Source Registry (17 Feeds)</button>
                <button onClick={() => setIsAlertsOpen(true)} className="footer-link">Custom Alert Times</button>
                <a href="#calendar" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 300, behavior: 'smooth' }); }} className="footer-link">Tax & Rate Calendar</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="disclaimer-text">
              <strong>Disclaimer:</strong> FIN-X is an independent financial news discovery and synthesis platform. Content is aggregated from official government gazettes, regulatory portals, and verified media feeds using AI summarization. Content is provided solely for general informational purposes and does not constitute financial, investment, accounting, or legal advice. Always consult official notifications or qualified professionals before making financial decisions.
            </p>
            <div className="footer-copy">
              <span>© {new Date().getFullYear()} FIN-X. All rights reserved. Zero-budget free-tier architecture.</span>
            </div>
          </div>
        </div>
      </footer>

      {/* 5. Modals */}
      <StoryModal
        story={selectedStory}
        isOpen={!!selectedStory}
        onClose={() => setSelectedStory(null)}
        isSaved={selectedStory ? savedStoryIds.includes(selectedStory.id) : false}
        onToggleSave={toggleSaveStory}
      />

      <AlertsModal
        isOpen={isAlertsOpen}
        onClose={() => setIsAlertsOpen(false)}
        onTriggerToast={triggerToast}
      />

      <SourceRegistryModal
        isOpen={isSourceRegistryOpen}
        onClose={() => setIsSourceRegistryOpen(false)}
      />

      <style jsx>{`
        .finx-app {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #f8fafc;
        }

        /* Swiggy/Zomato Toast Animation - Sharp Wikipedia Style */
        .push-notification-toast {
          position: fixed;
          top: 85px;
          right: 24px;
          z-index: 1000;
          background: #ffffff;
          border: 1px solid #a2a9b1;
          border-left: 4px solid var(--brand-primary);
          border-radius: var(--radius);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
          padding: 0.85rem 1rem;
          max-width: 380px;
          animation: slideDownToast 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .toast-inner {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .toast-icon-box {
          width: 34px;
          height: 34px;
          border-radius: var(--radius-sm);
          background: #f0f7f3;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          overflow: hidden;
        }

        .toast-logo-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .toast-content {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          flex: 1;
        }

        .toast-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.65rem;
          color: var(--text-muted);
        }

        .toast-app-name {
          font-weight: 700;
          color: var(--brand-primary);
          text-transform: uppercase;
        }

        .toast-title {
          font-family: var(--font-serif);
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .toast-body {
          font-size: 0.75rem;
          color: var(--text-secondary);
          line-height: 1.35;
        }

        .toast-close-btn {
          color: var(--text-muted);
          padding: 2px;
          border: none;
          background: transparent;
        }

        .toast-close-btn:hover {
          color: var(--text-primary);
        }

        .main-content {
          flex: 1;
          padding-bottom: 3.5rem;
        }

        .layout-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 1.75rem;
          margin-top: 1rem;
        }

        .feed-column {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .feed-header-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--border-subtle);
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .feed-header-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .feed-title {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--brand-primary);
          letter-spacing: -0.01em;
        }

        .clear-filters-btn {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          background: #fef2f2;
          color: var(--critical-color);
          border: 1px solid var(--critical-border);
          font-size: 0.7rem;
          font-weight: 600;
          padding: 0.2rem 0.5rem;
          border-radius: var(--radius-sm);
          transition: all 0.15s ease;
        }

        .clear-filters-btn:hover {
          background: var(--critical-color);
          color: #ffffff;
        }

        .feed-header-right {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        .live-db-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: #f0f7f3;
          border: 1px solid #a8cfb8;
          color: var(--brand-primary);
          font-size: 0.68rem;
          font-weight: 700;
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-sm);
        }

        .live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--brand-accent);
          box-shadow: 0 0 6px var(--brand-accent);
        }

        .sort-label {
          color: var(--text-muted);
          font-weight: 500;
        }

        .stories-stream {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .empty-state {
          padding: 3rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.75rem;
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius);
        }

        .empty-icon {
          color: var(--text-muted);
        }

        .empty-title {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .empty-desc {
          font-size: 0.82rem;
          color: var(--text-secondary);
          max-width: 380px;
        }

        .empty-reset-btn {
          margin-top: 0.5rem;
          padding: 0.45rem 1rem;
          background: var(--brand-primary);
          color: #ffffff;
          font-size: 0.8rem;
          font-weight: 600;
          border: 1px solid #16382b;
          border-radius: var(--radius);
          transition: all 0.15s ease;
        }

        .empty-reset-btn:hover {
          background: var(--brand-secondary);
        }

        .sidebar-column {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .source-card {
          padding: 1.15rem;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          border-left: 3px solid var(--brand-primary);
          border-radius: var(--radius);
        }

        .source-card-head {
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }

        .source-card-title {
          font-family: var(--font-serif);
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .source-card-body {
          font-size: 0.73rem;
          line-height: 1.45;
          color: var(--text-secondary);
        }

        .source-card-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.74rem;
          font-weight: 600;
          color: var(--brand-primary);
          width: fit-content;
          transition: color 0.15s ease;
        }

        .source-card-btn:hover {
          color: var(--brand-secondary);
          text-decoration: underline;
        }

        /* Footer with Brand Logo */
        .footer-wrapper {
          border-top: 1px solid var(--border-subtle);
          background: #ffffff;
          padding: 2.5rem 0 1.5rem 0;
          margin-top: auto;
        }

        .footer-top {
          display: flex;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }

        .footer-brand {
          max-width: 420px;
        }

        .footer-brand-lockup {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          margin-bottom: 0.75rem;
        }

        .footer-logo-img {
          height: 42px;
          width: auto;
          object-fit: contain;
        }

        .footer-brand-text {
          display: flex;
          flex-direction: column;
          border-left: 2px solid var(--brand-primary);
          padding-left: 0.6rem;
        }

        .footer-logo-title {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--brand-primary);
          line-height: 1;
          letter-spacing: 0.04em;
        }

        .footer-logo-sub {
          font-family: var(--font-sans);
          font-size: 0.58rem;
          font-weight: 700;
          color: var(--brand-secondary);
          letter-spacing: 0.08em;
          margin-top: 2px;
        }

        .footer-tagline {
          font-size: 0.8rem;
          line-height: 1.5;
          color: var(--text-secondary);
        }

        .footer-links-group {
          display: flex;
          gap: 3rem;
          flex-wrap: wrap;
        }

        .footer-col {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .footer-heading {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--brand-primary);
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-bottom: 0.25rem;
        }

        .footer-link {
          font-size: 0.76rem;
          color: var(--text-secondary);
          text-align: left;
          background: transparent;
          border: none;
          padding: 0;
          transition: color 0.15s ease;
        }

        .footer-link:hover {
          color: var(--brand-primary);
          text-decoration: underline;
        }

        .footer-bottom {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding-top: 1.5rem;
          border-top: 1px solid #eaecf0;
        }

        .disclaimer-text {
          font-size: 0.72rem;
          line-height: 1.5;
          color: var(--text-muted);
        }

        .footer-copy {
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        @media (max-width: 1024px) {
          .layout-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

-- ==============================================================================
-- FIN-X Database Schema (Supabase / PostgreSQL)
-- Global Financial News Discovery Platform
-- ==============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------------------------------------
-- 1. SOURCES REGISTRY
-- Tracks official authorities, media publications, and discovery feeds
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    country TEXT NOT NULL,                  -- 'IN', 'US', 'UK', 'EU', 'GLOBAL'
    source_type TEXT NOT NULL,              -- 'official', 'media', 'discovery'
    authority_level TEXT NOT NULL,          -- 'P0' (highest), 'P1', 'P2', 'P3'
    categories TEXT[] DEFAULT '{}',
    collection_method TEXT NOT NULL,        -- 'rss', 'web_listing', 'api'
    feed_url TEXT,
    listing_urls TEXT[] DEFAULT '{}',
    crawl_frequency_minutes INT DEFAULT 240,
    trust_score INT DEFAULT 90,
    enabled BOOLEAN DEFAULT true,
    website_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- -----------------------------------------------------------------------------
-- 2. RAW ITEMS
-- Collected raw items before AI classification, summarization, and deduplication
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS raw_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    source_id UUID REFERENCES sources(id) ON DELETE CASCADE,
    url TEXT UNIQUE NOT NULL,
    title TEXT,
    raw_content TEXT,
    summary_hint TEXT,
    published_at TIMESTAMPTZ,
    discovered_at TIMESTAMPTZ DEFAULT now(),
    processed BOOLEAN DEFAULT false,
    processing_error TEXT
);

CREATE INDEX IF NOT EXISTS idx_raw_items_processed ON raw_items(processed);
CREATE INDEX IF NOT EXISTS idx_raw_items_url ON raw_items(url);

-- -----------------------------------------------------------------------------
-- 3. STORIES
-- Processed, AI-classified and summarized financial news
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS stories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    headline TEXT NOT NULL,
    summary TEXT NOT NULL,                  -- Strict 2-line AI summary
    domain TEXT NOT NULL,                   -- 'markets', 'tax', 'regulations', 'economy', 'banking', 'companies', 'policy'
    subdomain TEXT,                         -- e.g., 'gst', 'income_tax', 'rbi', 'sebi', 'crypto', etc.
    country TEXT NOT NULL,                  -- 'IN', 'US', 'GLOBAL'
    importance TEXT NOT NULL DEFAULT 'medium', -- 'critical', 'high', 'medium', 'low'
    source_id UUID REFERENCES sources(id) ON DELETE SET NULL,
    source_name TEXT NOT NULL,
    source_url TEXT NOT NULL,               -- Direct link to original source
    digest_slot TEXT NOT NULL,              -- 'morning', 'afternoon', 'evening'
    digest_date DATE DEFAULT CURRENT_DATE,
    tags TEXT[] DEFAULT '{}',
    published_at TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_stories_digest ON stories(digest_date, digest_slot);
CREATE INDEX IF NOT EXISTS idx_stories_domain ON stories(domain);
CREATE INDEX IF NOT EXISTS idx_stories_country ON stories(country);
CREATE INDEX IF NOT EXISTS idx_stories_importance ON stories(importance);
CREATE INDEX IF NOT EXISTS idx_stories_published_at ON stories(published_at DESC);

-- -----------------------------------------------------------------------------
-- 4. STORY CLUSTERS & DEDUPLICATION
-- Allows grouping multiple reports of the same event across sources
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS story_clusters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    primary_story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
    title TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS story_cluster_members (
    cluster_id UUID REFERENCES story_clusters(id) ON DELETE CASCADE,
    story_id UUID REFERENCES stories(id) ON DELETE CASCADE,
    PRIMARY KEY (cluster_id, story_id)
);

-- -----------------------------------------------------------------------------
-- 5. USERS & PROFILES (Supabase Auth integration)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY,                   -- Links to auth.users.id
    email TEXT UNIQUE,
    display_name TEXT,
    preferred_country TEXT DEFAULT 'IN',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- -----------------------------------------------------------------------------
-- 6. USER ALERTS & PREFERENCES
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS user_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    alert_type TEXT NOT NULL,              -- 'domain', 'topic', 'importance'
    alert_value TEXT NOT NULL,             -- 'tax', 'regulations', 'critical'
    enabled BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- -----------------------------------------------------------------------------
-- 7. FINANCE CALENDAR EVENTS
-- Upcoming events (economic releases, tax deadlines, earnings, meetings)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS calendar_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    event_type TEXT NOT NULL,              -- 'economic', 'tax_deadline', 'regulatory', 'earnings', 'ipo'
    country TEXT NOT NULL,                 -- 'IN', 'US', 'GLOBAL'
    event_date DATE NOT NULL,
    event_time TEXT,                       -- Optional time string (e.g., '14:30 IST')
    domain TEXT,
    source_url TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_calendar_event_date ON calendar_events(event_date);
CREATE INDEX IF NOT EXISTS idx_calendar_country ON calendar_events(country);

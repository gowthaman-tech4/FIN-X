-- ==============================================================================
-- FIN-X Seed Data: Source Registry (17 Curated Sources)
-- ==============================================================================

INSERT INTO sources (
    slug, name, country, source_type, authority_level, categories, 
    collection_method, feed_url, listing_urls, crawl_frequency_minutes, 
    trust_score, enabled, website_url
) VALUES
-- -----------------------------------------------------------------------------
-- INDIA - OFFICIAL (P0)
-- -----------------------------------------------------------------------------
(
    'in-cbdt',
    'CBDT (Income Tax Department)',
    'IN',
    'official',
    'P0',
    ARRAY['tax', 'regulations', 'policy'],
    'web_listing',
    NULL,
    ARRAY['https://incometaxindia.gov.in/Pages/communications/notifications.aspx', 'https://incometaxindia.gov.in/Pages/communications/circulars.aspx'],
    240,
    100,
    true,
    'https://incometaxindia.gov.in'
),
(
    'in-cbic',
    'CBIC (GST & Customs)',
    'IN',
    'official',
    'P0',
    ARRAY['tax', 'regulations', 'trade'],
    'web_listing',
    NULL,
    ARRAY['https://www.cbic.gov.in/Customs-Notifications', 'https://www.cbic.gov.in/Central-Tax-Notifications'],
    240,
    100,
    true,
    'https://www.cbic.gov.in'
),
(
    'in-rbi',
    'Reserve Bank of India (RBI)',
    'IN',
    'official',
    'P0',
    ARRAY['banking', 'economy', 'regulations', 'policy'],
    'rss',
    'https://rbi.org.in/pressreleases_rss.xml',
    ARRAY['https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx', 'https://www.rbi.org.in/Scripts/NotificationUser.aspx'],
    180,
    100,
    true,
    'https://www.rbi.org.in'
),
(
    'in-sebi',
    'Securities and Exchange Board of India (SEBI)',
    'IN',
    'official',
    'P0',
    ARRAY['markets', 'regulations', 'companies'],
    'web_listing',
    NULL,
    ARRAY['https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListing=yes&sid=1&ssid=7&smid=0', 'https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListing=yes&sid=1&ssid=1&smid=0'],
    180,
    100,
    true,
    'https://www.sebi.gov.in'
),
(
    'in-mca',
    'Ministry of Corporate Affairs (MCA)',
    'IN',
    'official',
    'P0',
    ARRAY['companies', 'regulations', 'policy'],
    'web_listing',
    NULL,
    ARRAY['https://www.mca.gov.in/content/mca/global/en/notifications-circulars/notifications.html'],
    360,
    95,
    true,
    'https://www.mca.gov.in'
),
(
    'in-nse',
    'National Stock Exchange of India (NSE)',
    'IN',
    'official',
    'P0',
    ARRAY['markets', 'companies'],
    'web_listing',
    NULL,
    ARRAY['https://www.nseindia.com/market-data/circulars'],
    180,
    95,
    true,
    'https://www.nseindia.com'
),
(
    'in-bse',
    'BSE India',
    'IN',
    'official',
    'P0',
    ARRAY['markets', 'companies'],
    'web_listing',
    NULL,
    ARRAY['https://www.bseindia.com/markets/MarketInfo/NoticesCirculars.aspx'],
    180,
    95,
    true,
    'https://www.bseindia.com'
),
(
    'in-mof',
    'Ministry of Finance (PIB India)',
    'IN',
    'official',
    'P0',
    ARRAY['economy', 'policy', 'tax', 'banking'],
    'rss',
    'https://pib.gov.in/RssMain.aspx?ModId=6&Lang=1',
    ARRAY['https://pib.gov.in/allRel.aspx'],
    180,
    100,
    true,
    'https://finmin.nic.in'
),

-- -----------------------------------------------------------------------------
-- US - OFFICIAL (P0)
-- -----------------------------------------------------------------------------
(
    'us-fed',
    'Federal Reserve System',
    'US',
    'official',
    'P0',
    ARRAY['economy', 'banking', 'regulations'],
    'rss',
    'https://www.federalreserve.gov/feeds/press_all.xml',
    ARRAY['https://www.federalreserve.gov/newsevents/pressreleases.htm'],
    180,
    100,
    true,
    'https://www.federalreserve.gov'
),
(
    'us-sec',
    'Securities and Exchange Commission (SEC)',
    'US',
    'official',
    'P0',
    ARRAY['markets', 'regulations', 'companies'],
    'rss',
    'https://www.sec.gov/news/pressreleases.rss',
    ARRAY['https://www.sec.gov/news/pressreleases'],
    180,
    100,
    true,
    'https://www.sec.gov'
),
(
    'us-irs',
    'Internal Revenue Service (IRS)',
    'US',
    'official',
    'P0',
    ARRAY['tax', 'regulations', 'policy'],
    'rss',
    'https://www.irs.gov/newsroom/news-releases-for-current-month/feed',
    ARRAY['https://www.irs.gov/newsroom/news-releases'],
    240,
    100,
    true,
    'https://www.irs.gov'
),
(
    'us-treasury',
    'US Department of the Treasury',
    'US',
    'official',
    'P0',
    ARRAY['economy', 'policy', 'markets', 'trade'],
    'rss',
    'https://home.treasury.gov/rss/press-releases',
    ARRAY['https://home.treasury.gov/news/press-releases'],
    240,
    100,
    true,
    'https://home.treasury.gov'
),

-- -----------------------------------------------------------------------------
-- MEDIA (P1 - RSS Feeds)
-- -----------------------------------------------------------------------------
(
    'media-et',
    'The Economic Times',
    'IN',
    'media',
    'P1',
    ARRAY['markets', 'economy', 'companies', 'tax'],
    'rss',
    'https://economictimes.indiatimes.com/rssfeedstopstories.cms',
    ARRAY['https://economictimes.indiatimes.com'],
    60,
    90,
    true,
    'https://economictimes.indiatimes.com'
),
(
    'media-mint',
    'Mint',
    'IN',
    'media',
    'P1',
    ARRAY['markets', 'economy', 'companies', 'banking'],
    'rss',
    'https://www.livemint.com/rss/news',
    ARRAY['https://www.livemint.com'],
    60,
    90,
    true,
    'https://www.livemint.com'
),
(
    'media-bs',
    'Business Standard',
    'IN',
    'media',
    'P1',
    ARRAY['economy', 'markets', 'companies', 'policy'],
    'rss',
    'https://www.business-standard.com/rss/latest.rss',
    ARRAY['https://www.business-standard.com'],
    60,
    90,
    true,
    'https://www.business-standard.com'
),
(
    'media-reuters-fin',
    'Reuters Finance',
    'GLOBAL',
    'media',
    'P1',
    ARRAY['markets', 'economy', 'banking', 'companies'],
    'rss',
    'https://www.reutersagency.com/feed/?taxonomy=markets&post_type=reuters_event',
    ARRAY['https://www.reuters.com/business/finance/'],
    60,
    95,
    true,
    'https://www.reuters.com'
),

-- -----------------------------------------------------------------------------
-- DISCOVERY (P3)
-- -----------------------------------------------------------------------------
(
    'discovery-gdelt',
    'GDELT Project (Financial Events)',
    'GLOBAL',
    'discovery',
    'P3',
    ARRAY['economy', 'markets', 'policy'],
    'api',
    NULL,
    ARRAY['https://api.gdeltproject.org/api/v2/doc/doc?query=finance&mode=ArtList&format=json'],
    360,
    80,
    true,
    'https://www.gdeltproject.org'
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    country = EXCLUDED.country,
    source_type = EXCLUDED.source_type,
    authority_level = EXCLUDED.authority_level,
    categories = EXCLUDED.categories,
    collection_method = EXCLUDED.collection_method,
    feed_url = EXCLUDED.feed_url,
    listing_urls = EXCLUDED.listing_urls,
    crawl_frequency_minutes = EXCLUDED.crawl_frequency_minutes,
    trust_score = EXCLUDED.trust_score,
    website_url = EXCLUDED.website_url;

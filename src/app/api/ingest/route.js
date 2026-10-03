import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import { processStoryWithGemini } from '@/lib/gemini';

function getPool() {
  if (!globalThis._finxPgPool && process.env.DATABASE_URL) {
    globalThis._finxPgPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      max: 5,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });
  }
  return globalThis._finxPgPool;
}

// Top curated RSS feeds to crawl for official circulars & financial intelligence
const CURATED_FEEDS = [
  {
    name: 'Reserve Bank of India (RBI)',
    url: 'https://rbi.org.in/pressreleases_rss.xml',
    country: 'IN',
    authority: 'P0',
    type: 'official',
    defaultDomain: 'regulations'
  },
  {
    name: 'Federal Reserve Press Releases',
    url: 'https://www.federalreserve.gov/feeds/press_all.xml',
    country: 'US',
    authority: 'P0',
    type: 'official',
    defaultDomain: 'economy'
  },
  {
    name: 'US SEC News',
    url: 'https://www.sec.gov/news/pressreleases.rss',
    country: 'US',
    authority: 'P0',
    type: 'official',
    defaultDomain: 'regulations'
  },
  {
    name: 'Economic Times Markets',
    url: 'https://economictimes.indiatimes.com/markets/rssfeeds/1977021501.cms',
    country: 'IN',
    authority: 'P1',
    type: 'media',
    defaultDomain: 'markets'
  },
  {
    name: 'Livemint Economy & Policy',
    url: 'https://www.livemint.com/rss/economy',
    country: 'IN',
    authority: 'P1',
    type: 'media',
    defaultDomain: 'economy'
  }
];

/**
 * Lightweight, zero-dependency XML/RSS feed parser
 */
function parseRssItems(xmlText) {
  const items = [];
  const itemMatches = xmlText.match(/<item[\s\S]*?<\/item>/gi) || xmlText.match(/<entry[\s\S]*?<\/entry>/gi) || [];

  for (const block of itemMatches.slice(0, 10)) {
    const titleMatch = block.match(/<title(?:[^>]*)>([\s\S]*?)<\/title>/i);
    const linkMatch = block.match(/<link(?:[^>]*)>([\s\S]*?)<\/link>/i) || block.match(/<link[^>]*href=["']([^"']+)["']/i);
    const descMatch = block.match(/<description(?:[^>]*)>([\s\S]*?)<\/description>/i) || block.match(/<summary(?:[^>]*)>([\s\S]*?)<\/summary>/i);

    let title = titleMatch ? titleMatch[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim() : '';
    let link = linkMatch ? (linkMatch[1] || linkMatch[0]).replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim() : '';
    let desc = descMatch ? descMatch[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').replace(/<[^>]+>/g, '').trim() : '';

    if (title && link) {
      items.push({
        title,
        url: link,
        content: desc.slice(0, 800)
      });
    }
  }

  return items;
}

export async function GET(request) {
  return handleIngest(request);
}

export async function POST(request) {
  return handleIngest(request);
}

async function handleIngest(request) {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  const { searchParams } = new URL(request.url);
  const querySecret = searchParams.get('secret');

  // Protect against unauthorized public triggers in production
  if (cronSecret && process.env.NODE_ENV === 'production') {
    const isAuthorized = 
      authHeader === `Bearer ${cronSecret}` || 
      querySecret === cronSecret;

    if (!isAuthorized) {
      return NextResponse.json({ error: 'Unauthorized. Invalid or missing CRON_SECRET.' }, { status: 401 });
    }
  }

  const startTime = Date.now();
  const dbPool = getPool();

  if (!dbPool) {
    return NextResponse.json({
      status: 'simulated',
      message: 'DATABASE_URL not configured. Gemini ingestion ran in dry-run mode.',
      feeds_checked: CURATED_FEEDS.length,
      note: 'Configure DATABASE_URL and GEMINI_API_KEY in .env.local to persist stories.'
    });
  }

  const results = {
    feeds_crawled: 0,
    items_found: 0,
    stories_ingested: 0,
    duplicates_skipped: 0,
    errors: [],
    duration_seconds: 0
  };

  const slot = searchParams.get('slot') || 'morning';

  for (const feed of CURATED_FEEDS) {
    try {
      const resp = await fetch(feed.url, {
        headers: {
          'User-Agent': 'FIN-X/1.0 Financial Intelligence Bot (+https://fin-x.org)'
        },
        signal: AbortSignal.timeout(8000)
      });

      if (!resp.ok) continue;

      const xml = await resp.text();
      const rawItems = parseRssItems(xml);
      results.feeds_crawled += 1;
      results.items_found += rawItems.length;

      // Process top 2 newest items per feed to avoid rate limits
      for (const item of rawItems.slice(0, 2)) {
        // Check for duplicates in DB
        const dupCheck = await dbPool.query(
          'SELECT id FROM stories WHERE source_url = $1 OR headline = $2 LIMIT 1;',
          [item.url, item.title]
        );

        if (dupCheck.rows.length > 0) {
          results.duplicates_skipped += 1;
          continue;
        }

        // Process with native Gemini AI summarizer
        const processed = await processStoryWithGemini({
          title: item.title,
          content: item.content,
          source_name: feed.name,
          authority_level: feed.authority,
          country_hint: feed.country
        });

        if (!processed || !processed.is_finance) {
          continue;
        }

        // Insert into Supabase
        await dbPool.query(
          `INSERT INTO stories (
            headline, summary, domain, subdomain, country, importance,
            source_name, source_url, digest_slot, digest_date, tags, published_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, CURRENT_DATE, $10, NOW())`,
          [
            processed.headline,
            processed.two_line_summary,
            processed.domain || feed.defaultDomain,
            processed.subdomain || 'general',
            processed.country || feed.country,
            processed.importance || 'medium',
            feed.name,
            item.url,
            slot,
            processed.tags || [processed.domain]
          ]
        );

        results.stories_ingested += 1;
      }
    } catch (err) {
      results.errors.push(`${feed.name}: ${err.message}`);
    }
  }

  results.duration_seconds = ((Date.now() - startTime) / 1000).toFixed(2);

  return NextResponse.json({
    status: 'success',
    slot,
    ...results
  });
}

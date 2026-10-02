import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import { INITIAL_STORIES, DOMAINS, COUNTRIES } from '@/data/mockData';

// Maintain a single global connection pool across hot-reloads to prevent connection exhaustion
function getPool() {
  if (!globalThis._finxPgPool && process.env.DATABASE_URL) {
    globalThis._finxPgPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      max: 5, // Conservative pool size for Supabase free-tier connection limits
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });

    globalThis._finxPgPool.on('error', (err) => {
      console.error('Unexpected error on idle PostgreSQL client:', err);
    });
  }
  return globalThis._finxPgPool;
}

const VALID_DOMAINS = new Set(DOMAINS.map((d) => d.id));
const VALID_COUNTRIES = new Set(COUNTRIES.map((c) => c.id));

export async function GET(request) {
  try {
    const dbPool = getPool();
    if (!dbPool) {
      return NextResponse.json(
        { stories: INITIAL_STORIES, source: 'fallback_mock', count: INITIAL_STORIES.length },
        { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' } }
      );
    }

    const { searchParams } = new URL(request.url);
    const domain = searchParams.get('domain');
    const country = searchParams.get('country');
    
    // Strict input bounds to prevent DoS / oversized DB fetches
    const rawLimit = parseInt(searchParams.get('limit') || '50', 10);
    const limit = Math.min(Math.max(isNaN(rawLimit) ? 50 : rawLimit, 1), 100);

    let query = `
      SELECT 
        id, 
        headline, 
        summary, 
        domain, 
        subdomain, 
        country, 
        importance, 
        source_name, 
        source_url, 
        digest_slot, 
        digest_date, 
        tags, 
        published_at,
        created_at
      FROM stories 
      WHERE 1=1
    `;
    const params = [];

    // Parameterized domain filter
    if (domain && domain !== 'all' && VALID_DOMAINS.has(domain)) {
      params.push(domain);
      query += ` AND domain = $${params.length}`;
    }

    // Parameterized country filter
    if (country && country !== 'ALL' && VALID_COUNTRIES.has(country)) {
      params.push(country);
      query += ` AND (country = $${params.length} OR country = 'GLOBAL')`;
    }

    query += ` ORDER BY published_at DESC LIMIT $${params.length + 1}`;
    params.push(limit);

    const result = await dbPool.query(query, params);

    // Format results to guarantee schema resilience
    const formattedStories = result.rows.map((row) => {
      const pubDate = new Date(row.published_at || row.created_at || Date.now());
      const hoursAgo = Math.max(1, Math.round((Date.now() - pubDate.getTime()) / (1000 * 60 * 60)));

      return {
        id: row.id,
        headline: row.headline || 'Financial Market Update',
        summary: row.summary || 'Official announcement released.\nReview details in the authoritative filing.',
        domain: row.domain || 'markets',
        subdomain: row.subdomain || 'general',
        country: row.country || 'GLOBAL',
        importance: row.importance || 'medium',
        source_name: row.source_name || 'Official Authority',
        source_type: 'official',
        authority_level: 'P0',
        source_url: row.source_url || '#',
        digest_slot: row.digest_slot || 'morning',
        published_at: `${hoursAgo} hours ago`,
        time_ago: `${hoursAgo}h ago`,
        read_time: '1 min read',
        tags: Array.isArray(row.tags) ? row.tags : [],
        is_top_story: row.importance === 'critical' || row.importance === 'high',
      };
    });

    return NextResponse.json(
      {
        stories: formattedStories.length > 0 ? formattedStories : INITIAL_STORIES,
        source: formattedStories.length > 0 ? 'live_supabase' : 'fallback_mock',
        count: formattedStories.length > 0 ? formattedStories.length : INITIAL_STORIES.length
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=60',
        },
      }
    );

  } catch (error) {
    console.error('Database query error in /api/stories:', error.message);
    // Graceful degradation: never crash the UI, return structured mock data
    return NextResponse.json(
      { stories: INITIAL_STORIES, source: 'fallback_mock', error: error.message },
      { status: 200 }
    );
  }
}

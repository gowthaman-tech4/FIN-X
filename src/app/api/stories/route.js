import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import { INITIAL_STORIES } from '@/data/mockData';

let pool;

function getPool() {
  if (!pool && process.env.DATABASE_URL) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 5000,
    });
  }
  return pool;
}

export async function GET(request) {
  try {
    const dbPool = getPool();
    if (!dbPool) {
      return NextResponse.json({ stories: INITIAL_STORIES, source: 'fallback_mock' });
    }

    const { searchParams } = new URL(request.url);
    const domain = searchParams.get('domain');
    const country = searchParams.get('country');
    const limit = parseInt(searchParams.get('limit') || '50', 10);

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

    if (domain && domain !== 'all') {
      params.push(domain);
      query += ` AND domain = $${params.length}`;
    }

    if (country && country !== 'ALL') {
      params.push(country);
      query += ` AND (country = $${params.length} OR country = 'GLOBAL')`;
    }

    query += ` ORDER BY published_at DESC LIMIT $${params.length + 1}`;
    params.push(limit);

    const result = await dbPool.query(query, params);

    // Format results to match card expectations
    const formattedStories = result.rows.map((row) => {
      const pubDate = new Date(row.published_at || row.created_at);
      const hoursAgo = Math.max(1, Math.round((Date.now() - pubDate.getTime()) / (1000 * 60 * 60)));
      return {
        id: row.id,
        headline: row.headline,
        summary: row.summary,
        domain: row.domain,
        subdomain: row.subdomain,
        country: row.country,
        importance: row.importance || 'medium',
        source_name: row.source_name,
        source_type: 'official',
        authority_level: 'P0',
        source_url: row.source_url,
        digest_slot: row.digest_slot || 'morning',
        published_at: `${hoursAgo} hours ago`,
        time_ago: `${hoursAgo}h ago`,
        read_time: '1 min read',
        tags: row.tags || [],
        is_top_story: row.importance === 'critical' || row.importance === 'high',
      };
    });

    return NextResponse.json({
      stories: formattedStories.length > 0 ? formattedStories : INITIAL_STORIES,
      source: 'live_supabase',
      count: formattedStories.length
    });

  } catch (error) {
    console.error('Database query error:', error.message);
    return NextResponse.json({ stories: INITIAL_STORIES, source: 'fallback_mock', error: error.message });
  }
}

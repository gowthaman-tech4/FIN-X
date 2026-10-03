import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import { INITIAL_STORIES } from '@/data/mockData';
import { generateWittyNotification } from '@/lib/gemini';

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

export async function GET() {
  try {
    const dbPool = getPool();
    let topStory = null;

    if (dbPool) {
      const res = await dbPool.query(`
        SELECT headline, summary, domain, source_name, country, importance
        FROM stories
        WHERE importance IN ('critical', 'high')
        ORDER BY published_at DESC
        LIMIT 1;
      `);
      if (res.rows.length > 0) {
        topStory = res.rows[0];
      }
    }

    if (!topStory) {
      topStory = INITIAL_STORIES[0];
    }

    const wittyHook = generateWittyNotification(topStory);

    return NextResponse.json({
      status: 'success',
      notification: wittyHook,
      story: {
        headline: topStory.headline,
        domain: topStory.domain,
        source: topStory.source_name
      }
    });
  } catch (err) {
    return NextResponse.json({
      status: 'fallback',
      notification: {
        title: "☕ Chai & Circulars",
        body: "Today's financial updates landed. 2-line official breakdown in 30 seconds.",
        tag: "DAILY DIGEST"
      }
    });
  }
}

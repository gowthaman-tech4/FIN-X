import os
import sys
import logging
from datetime import datetime
import psycopg2
from dotenv import load_dotenv

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

load_dotenv(".env.local")

from adapters.rss_adapter import RssAdapter
from ai.gemini_processor import GeminiStoryProcessor

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("finx_pipeline")

DB_URL = os.getenv("DATABASE_URL")
GEMINI_KEY = os.getenv("GEMINI_API_KEY")

if not DB_URL or not GEMINI_KEY:
    raise ValueError("Missing DATABASE_URL or GEMINI_API_KEY in environment variables.")

def run_pipeline(limit_sources=3):
    """Runs live ingestion and Gemini AI summarization pipeline."""
    print("=" * 60)
    print("🚀 FIN-X Automated Ingestion & AI Summarization Pipeline")
    print("=" * 60)

    # 1. Connect to Database
    logger.info("Connecting to Supabase PostgreSQL database...")
    conn = psycopg2.connect(DB_URL)
    cursor = conn.cursor()

    # 2. Get active RSS sources
    cursor.execute("""
        SELECT slug, name, country, source_type, authority_level, feed_url, website_url 
        FROM sources 
        WHERE enabled = true AND collection_method = 'rss' AND feed_url IS NOT NULL
        LIMIT %s;
    """, (limit_sources,))
    sources = cursor.fetchall()
    logger.info(f"Loaded {len(sources)} active RSS sources to crawl.")

    # 3. Initialize AI Processor
    ai_processor = GeminiStoryProcessor(api_key=GEMINI_KEY)
    rss_adapter = RssAdapter(timeout=10)

    new_stories_count = 0

    for src in sources:
        slug, name, country, src_type, authority, feed_url, web_url = src
        logger.info(f"\n📡 Crawling source: {name} ({country}) from {feed_url}...")

        source_info = {
            "slug": slug,
            "name": name,
            "country": country,
            "source_type": src_type,
            "authority_level": authority,
            "feed_url": feed_url,
            "website_url": web_url
        }

        raw_items = rss_adapter.fetch_items(source_info)
        logger.info(f"Discovered {len(raw_items)} raw items from {name}")

        # Process top 3 newest items with Gemini AI
        for item in raw_items[:3]:
            # Check if story already exists by URL
            cursor.execute("SELECT id FROM stories WHERE source_url = %s LIMIT 1;", (item.url,))
            if cursor.fetchone():
                logger.info(f"Skipping duplicate: {item.title[:45]}...")
                continue

            logger.info(f"🤖 Processing with Gemini: '{item.title[:55]}...'")
            result = ai_processor.process_raw_item({
                "title": item.title,
                "raw_content": item.raw_content,
                "source_name": item.source_name,
                "country": item.country,
                "authority_level": item.authority_level
            })

            if not result or not result.is_finance:
                continue

            # Insert into Supabase
            cursor.execute("""
                INSERT INTO stories (
                    headline, summary, domain, subdomain, country, importance,
                    source_name, source_url, digest_slot, digest_date, tags, published_at
                ) VALUES (
                    %s, %s, %s, %s, %s, %s, %s, %s, %s, CURRENT_DATE, %s, %s
                ) RETURNING id;
            """, (
                result.headline,
                result.two_line_summary,
                result.domain,
                result.subdomain or "general",
                result.country,
                result.importance,
                item.source_name,
                item.url,
                "morning",
                result.tags,
                item.published_at or datetime.now()
            ))
            conn.commit()
            new_stories_count += 1
            logger.info(f"✅ Ingested Story: [{result.domain.upper()}] {result.headline[:45]}...")

    cursor.close()
    conn.close()

    print("\n" + "=" * 60)
    print(f"🎉 Pipeline run complete! Added {new_stories_count} new AI-summarized stories to Supabase.")
    print("=" * 60)

if __name__ == "__main__":
    run_pipeline(limit_sources=3)

import os
import sys
import time
import logging
from datetime import datetime
from typing import Dict, Any, List
import psycopg2
from dotenv import load_dotenv

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8')

load_dotenv(".env.local")

from adapters.rss_adapter import RssAdapter
from adapters.web_adapter import WebListingAdapter
from adapters.gdelt_adapter import GdeltAdapter
from ai.gemini_processor import GeminiStoryProcessor

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("finx_pipeline")

DB_URL = os.getenv("DATABASE_URL")
GEMINI_KEY = os.getenv("GEMINI_API_KEY")

def get_db_connection():
    if not DB_URL:
        raise ValueError("Missing DATABASE_URL in environment configuration.")
    return psycopg2.connect(DB_URL, connect_timeout=10)

def run_pipeline(slot: str = "morning", limit_sources: int = 5) -> Dict[str, Any]:
    """
    Executes the FIN-X automated ingestion and AI summarization pipeline.
    Crawls official authorities and trusted media, applies Gemini AI,
    and commits verified stories to Supabase.
    """
    start_time = time.time()
    logger.info(f"🚀 Starting FIN-X Pipeline run for '{slot}' digest (limit {limit_sources} sources)...")

    conn = None
    cursor = None
    stats = {
        "slot": slot,
        "sources_crawled": 0,
        "items_discovered": 0,
        "stories_ingested": 0,
        "duplicates_skipped": 0,
        "duration_seconds": 0.0,
        "status": "pending",
        "errors": []
    }

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Fetch active sources
        cursor.execute("""
            SELECT slug, name, country, source_type, authority_level, collection_method, feed_url, listing_urls, website_url 
            FROM sources 
            WHERE enabled = true 
            ORDER BY authority_level ASC, crawl_frequency_minutes ASC
            LIMIT %s;
        """, (limit_sources,))
        sources = cursor.fetchall()
        logger.info(f"Loaded {len(sources)} sources to crawl for {slot} digest.")

        ai_processor = GeminiStoryProcessor(api_key=GEMINI_KEY)
        rss_adapter = RssAdapter(timeout=12)
        web_adapter = WebListingAdapter(timeout=12)
        gdelt_adapter = GdeltAdapter(timeout=12)

        for src in sources:
            slug, name, country, src_type, authority, method, feed_url, listing_urls, web_url = src
            logger.info(f"\n📡 Crawling: {name} [{authority}] via {method}...")

            source_info = {
                "slug": slug,
                "name": name,
                "country": country,
                "source_type": src_type,
                "authority_level": authority,
                "collection_method": method,
                "feed_url": feed_url,
                "listing_urls": listing_urls or [],
                "website_url": web_url
            }

            # Select appropriate adapter
            raw_items = []
            try:
                if method == "rss" and feed_url:
                    raw_items = rss_adapter.fetch_items(source_info)
                elif method == "web_listing" and listing_urls:
                    raw_items = web_adapter.fetch_items(source_info)
                elif method == "api":
                    raw_items = gdelt_adapter.fetch_items(source_info)
                else:
                    if feed_url:
                        raw_items = rss_adapter.fetch_items(source_info)
            except Exception as e:
                logger.error(f"Error fetching from {name}: {e}")
                stats["errors"].append(f"{name}: {str(e)}")
                continue

            stats["sources_crawled"] += 1
            stats["items_discovered"] += len(raw_items)
            logger.info(f"Found {len(raw_items)} candidate items from {name}")

            # Process top candidate items with AI
            for item in raw_items[:2]:  # Limit per source for balanced digests
                try:
                    # Check for duplicates by source_url or title
                    cursor.execute(
                        "SELECT id FROM stories WHERE source_url = %s OR headline = %s LIMIT 1;",
                        (item.url, item.title)
                    )
                    if cursor.fetchone():
                        stats["duplicates_skipped"] += 1
                        continue

                    # Rate limiting safety to respect Gemini 15 RPM free tier
                    time.sleep(2)

                    logger.info(f"🤖 AI Processing: '{item.title[:50]}...'")
                    result = ai_processor.process_raw_item({
                        "title": item.title,
                        "raw_content": item.raw_content,
                        "source_name": item.source_name,
                        "country": item.country,
                        "authority_level": item.authority_level
                    })

                    if not result or not result.is_finance:
                        continue

                    # Insert story into Supabase
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
                        slot,
                        result.tags,
                        item.published_at or datetime.now()
                    ))
                    conn.commit()
                    stats["stories_ingested"] += 1
                    logger.info(f"✅ Ingested: [{result.domain.upper()}] {result.headline[:40]}...")

                except Exception as item_err:
                    logger.warning(f"Error processing item '{item.title[:30]}': {item_err}")
                    stats["errors"].append(str(item_err))
                    if conn:
                        conn.rollback()

        stats["status"] = "success"

    except Exception as e:
        logger.error(f"Fatal pipeline error: {e}", exc_info=True)
        stats["status"] = "failed"
        stats["errors"].append(str(e))
        if conn:
            conn.rollback()

    finally:
        # Guarantee connection cleanup to prevent pool leaks
        if cursor:
            cursor.close()
        if conn:
            conn.close()
            logger.info("Database connection closed cleanly.")

    stats["duration_seconds"] = round(time.time() - start_time, 2)
    logger.info(f"🎉 Pipeline finished in {stats['duration_seconds']}s: Ingested {stats['stories_ingested']} stories.")
    return stats

if __name__ == "__main__":
    slot_arg = sys.argv[1] if len(sys.argv) > 1 else "morning"
    res = run_pipeline(slot=slot_arg, limit_sources=4)
    print("\nRun Summary:", res)

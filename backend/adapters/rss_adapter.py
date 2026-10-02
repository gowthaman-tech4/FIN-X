import logging
import feedparser
from typing import List, Dict, Any
from datetime import datetime
from time import mktime
from .base import BaseSourceAdapter, RawItem

logger = logging.getLogger(__name__)

class RssAdapter(BaseSourceAdapter):
    """Universal RSS/Atom feed adapter for official bodies and media outlets."""

    def fetch_items(self, source_info: Dict[str, Any]) -> List[RawItem]:
        feed_url = source_info.get("feed_url")
        if not feed_url:
            logger.warning(f"No feed_url provided for source: {source_info.get('slug')}")
            return []

        slug = source_info.get("slug", "unknown")
        name = source_info.get("name", "Unknown Source")
        country = source_info.get("country", "GLOBAL")
        source_type = source_info.get("source_type", "media")
        authority = source_info.get("authority_level", "P1")

        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 FIN-X/1.0"
        }

        try:
            feed = feedparser.parse(feed_url, request_headers=headers)
            items: List[RawItem] = []

            for entry in feed.entries[:25]:  # Limit to 25 latest per crawl to manage token budget
                title = entry.get("title", "").strip()
                link = entry.get("link", "").strip()
                if not title or not link:
                    continue

                # Parse publication time if present
                pub_time = None
                if hasattr(entry, "published_parsed") and entry.published_parsed:
                    try:
                        pub_time = datetime.fromtimestamp(mktime(entry.published_parsed))
                    except Exception:
                        pub_time = datetime.now()
                elif hasattr(entry, "updated_parsed") and entry.updated_parsed:
                    try:
                        pub_time = datetime.fromtimestamp(mktime(entry.updated_parsed))
                    except Exception:
                        pub_time = datetime.now()
                else:
                    pub_time = datetime.now()

                summary = entry.get("summary", "") or entry.get("description", "")
                # Strip out HTML tags or keep clean snippet
                import re
                clean_summary = re.sub(r'<[^>]+>', ' ', summary).strip()
                clean_summary = re.sub(r'\s+', ' ', clean_summary)[:400]

                items.append(
                    RawItem(
                        source_slug=slug,
                        source_name=name,
                        url=link,
                        title=title,
                        raw_content=clean_summary,
                        summary_hint=clean_summary,
                        published_at=pub_time,
                        country=country,
                        source_type=source_type,
                        authority_level=authority,
                        extra_metadata={"feed_url": feed_url}
                    )
                )

            logger.info(f"Successfully collected {len(items)} items from {name}")
            return items

        except Exception as e:
            logger.error(f"Error fetching RSS for {name} ({feed_url}): {e}")
            return []

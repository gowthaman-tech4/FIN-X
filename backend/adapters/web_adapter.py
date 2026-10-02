import logging
import re
from typing import List, Dict, Any
from datetime import datetime
import requests
from bs4 import BeautifulSoup
from .base import BaseSourceAdapter, RawItem

logger = logging.getLogger(__name__)

class WebListingAdapter(BaseSourceAdapter):
    """Adapter for official regulatory & tax listings (CBDT, CBIC, SEBI, MCA, Exchanges)."""

    def fetch_items(self, source_info: Dict[str, Any]) -> List[RawItem]:
        listing_urls = source_info.get("listing_urls", [])
        if not listing_urls:
            return []

        slug = source_info.get("slug", "unknown")
        name = source_info.get("name", "Unknown Source")
        country = source_info.get("country", "IN")
        source_type = source_info.get("source_type", "official")
        authority = source_info.get("authority_level", "P0")
        base_url = source_info.get("website_url", "")

        items: List[RawItem] = []
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 FIN-X/1.0",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
        }

        for url in listing_urls:
            try:
                resp = requests.get(url, headers=headers, timeout=self.timeout)
                if resp.status_code != 200:
                    logger.warning(f"Failed to fetch {url} (status: {resp.status_code})")
                    continue

                soup = BeautifulSoup(resp.text, "html.parser")

                # Generic heuristic: look for links inside tables or notification lists
                # Usually official government sites place announcements in <table> rows or <ul class="list">
                links = soup.find_all("a", href=True)
                seen_urls = set()

                for a in links:
                    title = a.get_text(strip=True)
                    href = a["href"]

                    # Filter out navigation links, very short text, social media
                    if len(title) < 15 or len(title) > 300:
                        continue
                    if any(skip in href.lower() for skip in ["#", "javascript", "login", "contact", "about", "facebook", "twitter", "linkedin"]):
                        continue

                    # Resolve relative URLs
                    if href.startswith("/"):
                        full_url = f"{base_url.rstrip('/')}{href}"
                    elif not href.startswith("http"):
                        full_url = f"{url.rstrip('/')}/{href.lstrip('/')}"
                    else:
                        full_url = href

                    if full_url in seen_urls:
                        continue
                    seen_urls.add(full_url)

                    # Quick heuristic on financial keywords for listings
                    keywords = ["notification", "circular", "order", "tax", "amendment", "guideline", "press", "board", "regulation", "framework"]
                    is_relevant = any(k in title.lower() or k in full_url.lower() for k in keywords)
                    if not is_relevant and source_type == "official":
                        # If from official body, default to keeping if length is substantial
                        is_relevant = True

                    if is_relevant:
                        items.append(
                            RawItem(
                                source_slug=slug,
                                source_name=name,
                                url=full_url,
                                title=title,
                                raw_content=title,
                                summary_hint=title,
                                published_at=datetime.now(),
                                country=country,
                                source_type=source_type,
                                authority_level=authority,
                                extra_metadata={"source_listing": url}
                            )
                        )

                    if len(items) >= 15:
                        break

            except Exception as e:
                logger.error(f"Error scraping listing {url} for {name}: {e}")

        logger.info(f"Successfully scraped {len(items)} items from {name}")
        return items

import logging
from typing import List, Dict, Any
from datetime import datetime
import requests
from .base import BaseSourceAdapter, RawItem

logger = logging.getLogger(__name__)

class GdeltAdapter(BaseSourceAdapter):
    """Discovery adapter using GDELT Project API to catch breaking global financial events."""

    API_URL = "https://api.gdeltproject.org/api/v2/doc/doc"

    def fetch_items(self, source_info: Dict[str, Any]) -> List[RawItem]:
        slug = source_info.get("slug", "discovery-gdelt")
        name = source_info.get("name", "GDELT Discovery")
        params = {
            "query": "(finance OR economy OR 'central bank' OR 'interest rate' OR 'tax reform' OR 'market regulation')",
            "mode": "ArtList",
            "maxrecords": "20",
            "format": "json",
            "sort": "DateDesc"
        }

        try:
            resp = requests.get(self.API_URL, params=params, timeout=self.timeout)
            if resp.status_code != 200:
                logger.warning(f"GDELT API returned status {resp.status_code}")
                return []

            data = resp.json()
            articles = data.get("articles", [])
            items: List[RawItem] = []

            for art in articles:
                url = art.get("url")
                title = art.get("title", "").strip()
                if not url or not title:
                    continue

                items.append(
                    RawItem(
                        source_slug=slug,
                        source_name=name,
                        url=url,
                        title=title,
                        raw_content=title,
                        summary_hint=title,
                        published_at=datetime.now(),
                        country="GLOBAL",
                        source_type="discovery",
                        authority_level="P3",
                        extra_metadata={"domain": art.get("domain", "")}
                    )
                )

            logger.info(f"Collected {len(items)} items from GDELT discovery")
            return items

        except Exception as e:
            logger.error(f"Error calling GDELT API: {e}")
            return []

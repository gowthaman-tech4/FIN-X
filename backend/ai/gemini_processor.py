import json
import logging
from typing import Optional, Dict, Any
from pydantic import BaseModel, Field
from .prompts import CLASSIFY_AND_SUMMARIZE_SYSTEM_PROMPT, EXTRACTION_USER_PROMPT

logger = logging.getLogger(__name__)

class ProcessedStoryResult(BaseModel):
    is_finance: bool = True
    domain: str = "regulations" # 'tax' | 'regulations' | 'markets' | 'economy' | 'banking' | 'companies' | 'policy'
    subdomain: Optional[str] = None
    country: str = "IN" # 'IN' | 'US' | 'GLOBAL'
    importance: str = "medium" # 'critical' | 'high' | 'medium' | 'low'
    headline: str
    two_line_summary: str
    tags: list[str] = Field(default_factory=list)

class GeminiStoryProcessor:
    """
    AI processor using Gemini API (Free Tier) to filter, classify,
    and generate strict 2-line executive summaries.
    """

    def __init__(self, api_key: Optional[str] = None, model_name: str = "gemini-3.8-flash"):
        self.api_key = api_key
        self.model_name = model_name
        self.client = None

        if api_key:
            try:
                from google import genai
                self.client = genai.Client(api_key=api_key)
            except Exception as e:
                logger.warning(f"Could not initialize Google GenAI client: {e}")

    def process_raw_item(self, raw_item: Dict[str, Any]) -> Optional[ProcessedStoryResult]:
        """
        Process a single raw discovered item into an organized FIN-X story.
        Falls back to rule-based heuristic extraction if Gemini API is offline or unconfigured.
        """
        title = raw_item.get("title", "")
        content = raw_item.get("raw_content", "") or raw_item.get("summary_hint", "")
        source_name = raw_item.get("source_name", "Unknown")
        authority = raw_item.get("authority_level", "P1")
        country_hint = raw_item.get("country", "GLOBAL")

        if not title:
            return None

        # If Gemini client is configured, call Gemini API
        if self.client:
            try:
                prompt = EXTRACTION_USER_PROMPT.format(
                    source_name=source_name,
                    authority_level=authority,
                    country_hint=country_hint,
                    title=title,
                    content=content[:1000]
                )

                response = self.client.models.generate_content(
                    model=self.model_name,
                    contents=prompt,
                    config={
                        "system_instruction": CLASSIFY_AND_SUMMARIZE_SYSTEM_PROMPT,
                        "response_mime_type": "application/json",
                        "temperature": 0.1,
                    }
                )

                data = json.loads(response.text)
                result = ProcessedStoryResult(**data)

                # Skip non-financial items
                if not result.is_finance:
                    logger.info(f"Item filtered out (not finance): {title}")
                    return None

                return result

            except Exception as e:
                logger.error(f"Gemini API processing failed for '{title}': {e}. Using heuristic fallback.")

        # Fallback heuristic processor (ensures ₹0 continuous pipeline during local testing)
        return self._heuristic_fallback(raw_item)

    def _heuristic_fallback(self, raw_item: Dict[str, Any]) -> ProcessedStoryResult:
        """Heuristic classifier & summarizer for testing without consuming API quota."""
        title = raw_item.get("title", "").strip()
        source = raw_item.get("source_name", "").lower()
        country = raw_item.get("country", "IN")
        
        # Domain detection
        domain = "markets"
        subdomain = "general"
        importance = "medium"

        lower_title = title.lower()
        if any(w in lower_title for w in ["tax", "gst", "cbdt", "cbic", "customs", "income tax", "tds"]):
            domain = "tax"
            subdomain = "gst" if "gst" in lower_title else "income_tax"
            importance = "high"
        elif any(w in lower_title for w in ["rbi", "sebi", "sec", "circular", "regulation", "compliance", "mandate"]):
            domain = "regulations"
            subdomain = "rbi" if "rbi" in lower_title else "sebi" if "sebi" in lower_title else "sec"
            importance = "high"
        elif any(w in lower_title for w in ["inflation", "cpi", "gdp", "economy", "fed", "fomc", "rate cut", "rate hike"]):
            domain = "economy"
            subdomain = "monetary_policy"
            importance = "high"
        elif any(w in lower_title for w in ["bank", "lending", "npa", "deposit", "credit", "fintech"]):
            domain = "banking"
            subdomain = "credit"
        elif any(w in lower_title for w in ["budget", "tariff", "trade", "export", "import", "subsidy"]):
            domain = "policy"
            subdomain = "trade"

        if any(w in lower_title for w in ["critical", "mandatory", "urgent", "decision", "milestone"]):
            importance = "critical"

        # 2-line summary generation
        line1 = f"Official update announced regarding {title.lower()}."
        line2 = f"Stakeholders in {country} should review direct compliance instructions from {raw_item.get('source_name')}."

        return ProcessedStoryResult(
            is_finance=True,
            domain=domain,
            subdomain=subdomain,
            country=country,
            importance=importance,
            headline=title,
            two_line_summary=f"{line1}\n{line2}",
            tags=[domain, country.lower()]
        )

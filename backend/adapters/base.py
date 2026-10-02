from abc import ABC, abstractmethod
from typing import List, Optional, Dict, Any
from datetime import datetime
from pydantic import BaseModel, Field

class RawItem(BaseModel):
    """Normalized raw financial news item discovered from any source."""
    source_slug: str
    source_name: str
    url: str
    title: str
    raw_content: Optional[str] = None
    summary_hint: Optional[str] = None
    published_at: Optional[datetime] = None
    country: str = "GLOBAL"
    source_type: str = "media" # 'official' | 'media' | 'discovery'
    authority_level: str = "P1" # 'P0' | 'P1' | 'P2' | 'P3'
    extra_metadata: Dict[str, Any] = Field(default_factory=dict)

class BaseSourceAdapter(ABC):
    """Abstract base class for all FIN-X source adapters."""

    def __init__(self, timeout: int = 15):
        self.timeout = timeout

    @abstractmethod
    def fetch_items(self, source_info: Dict[str, Any]) -> List[RawItem]:
        """
        Fetch and normalize items from the specified source.
        Returns a list of RawItem objects ready for database staging and AI classification.
        """
        pass

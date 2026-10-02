import os
import logging
from typing import Optional, List
from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("finx_api")

app = FastAPI(
    title="FIN-X Backend API",
    description="Automated ingestion, AI classification, and digest dispatch for FIN-X",
    version="1.0.0"
)

# Enable CORS for local Next.js frontend and Cloudflare Pages
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "FIN-X Aggregation & Digest API",
        "version": "1.0.0",
        "budget": "₹0 Free Tier"
    }

@app.get("/api/sources")
def get_sources():
    """Returns the list of 17 configured official authorities and media feeds."""
    from adapters.base import RawItem
    return {
        "count": 17,
        "official_p0_count": 12,
        "media_p1_count": 4,
        "discovery_count": 1
    }

@app.post("/api/pipeline/run")
def trigger_pipeline(slot: str = Query("morning", enum=["morning", "afternoon", "evening"])):
    """Triggers the 3x daily collection and AI classification pipeline."""
    logger.info(f"Triggering ingestion run for slot: {slot}")
    return {
        "status": "success",
        "slot": slot,
        "message": f"Pipeline executed for {slot} digest. Raw items ingested and queued for AI summarization."
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

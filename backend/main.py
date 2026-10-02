import os
import sys
import logging
from typing import Optional, List, Dict, Any
from datetime import datetime
from fastapi import FastAPI, Query, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

load_dotenv(".env.local")

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("finx_api")

app = FastAPI(
    title="FIN-X Financial Intelligence API",
    description="Automated multi-domain financial news discovery, Gemini summarization & digest distribution.",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory execution state
PIPELINE_STATE: Dict[str, Any] = {
    "is_running": False,
    "last_run_time": None,
    "last_run_slot": None,
    "last_run_stats": None,
}

def execute_pipeline_task(slot: str, limit_sources: int):
    """Worker task executed via FastAPI background thread."""
    global PIPELINE_STATE
    PIPELINE_STATE["is_running"] = True
    try:
        from pipeline import run_pipeline
        stats = run_pipeline(slot=slot, limit_sources=limit_sources)
        PIPELINE_STATE["last_run_time"] = datetime.now().isoformat()
        PIPELINE_STATE["last_run_slot"] = slot
        PIPELINE_STATE["last_run_stats"] = stats
    except Exception as e:
        logger.error(f"Background pipeline execution failed: {e}")
        PIPELINE_STATE["last_run_stats"] = {"error": str(e), "status": "failed"}
    finally:
        PIPELINE_STATE["is_running"] = False

@app.get("/health")
def health_check():
    """Service health and environment status check."""
    return {
        "status": "healthy",
        "service": "FIN-X Aggregation & Digest API",
        "version": "1.0.0",
        "database_connected": bool(os.getenv("DATABASE_URL")),
        "gemini_active": bool(os.getenv("GEMINI_API_KEY")),
        "timestamp": datetime.now().isoformat()
    }

@app.get("/api/sources")
def get_sources():
    """Returns directory of official authorities and media registry."""
    import psycopg2
    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        return {"count": 17, "status": "mock"}

    try:
        conn = psycopg2.connect(db_url)
        cur = conn.cursor()
        cur.execute("SELECT slug, name, country, source_type, authority_level, trust_score, collection_method, website_url FROM sources WHERE enabled = true;")
        rows = cur.fetchall()
        sources = [
            {
                "slug": r[0], "name": r[1], "country": r[2], "source_type": r[3],
                "authority_level": r[4], "trust_score": r[5], "collection_method": r[6], "website_url": r[7]
            } for r in rows
        ]
        cur.close()
        conn.close()
        return {"count": len(sources), "sources": sources}
    except Exception as e:
        return {"error": str(e), "status": "degraded"}

@app.get("/api/calendar")
def get_calendar(country: Optional[str] = None):
    """Returns upcoming financial calendar events."""
    import psycopg2
    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        return {"events": []}

    try:
        conn = psycopg2.connect(db_url)
        cur = conn.cursor()
        if country and country != "ALL":
            cur.execute("SELECT id, title, description, event_type, country, event_date, event_time, domain, source_url FROM calendar_events WHERE country = %s OR country = 'GLOBAL' ORDER BY event_date ASC;", (country,))
        else:
            cur.execute("SELECT id, title, description, event_type, country, event_date, event_time, domain, source_url FROM calendar_events ORDER BY event_date ASC;")
        rows = cur.fetchall()
        events = [
            {
                "id": str(r[0]), "title": r[1], "description": r[2], "event_type": r[3],
                "country": r[4], "event_date": str(r[5]), "event_time": r[6], "domain": r[7], "source_url": r[8]
            } for r in rows
        ]
        cur.close()
        conn.close()
        return {"count": len(events), "events": events}
    except Exception as e:
        return {"error": str(e), "events": []}

@app.post("/api/pipeline/run")
def trigger_pipeline(
    background_tasks: BackgroundTasks,
    slot: str = Query("morning", enum=["morning", "afternoon", "evening"]),
    limit_sources: int = Query(5, ge=1, le=17)
):
    """Triggers an automated background ingestion & AI summarization run."""
    if PIPELINE_STATE["is_running"]:
        raise HTTPException(status_code=409, detail="Pipeline run already in progress.")

    background_tasks.add_task(execute_pipeline_task, slot, limit_sources)
    return {
        "status": "queued",
        "slot": slot,
        "limit_sources": limit_sources,
        "message": f"Pipeline task queued in background for {slot} digest."
    }

@app.get("/api/pipeline/status")
def get_pipeline_status():
    """Returns current status and execution log of the ingestion pipeline."""
    return PIPELINE_STATE

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

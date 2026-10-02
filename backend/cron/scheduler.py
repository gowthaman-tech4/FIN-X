import logging
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
import pytz

logger = logging.getLogger("finx_scheduler")

def trigger_morning_digest():
    from pipeline import run_pipeline
    logger.info("⏰ 7:00 AM IST: Executing Morning Digest Pipeline...")
    run_pipeline(slot="morning", limit_sources=8)

def trigger_afternoon_digest():
    from pipeline import run_pipeline
    logger.info("⏰ 1:00 PM IST: Executing Afternoon Digest Pipeline...")
    run_pipeline(slot="afternoon", limit_sources=8)

def trigger_evening_digest():
    from pipeline import run_pipeline
    logger.info("⏰ 7:00 PM IST: Executing Evening Digest Pipeline...")
    run_pipeline(slot="evening", limit_sources=8)

def start_scheduler():
    """
    Initializes and starts the 3x daily cron scheduler for FIN-X.
    Cadence: 7:00 AM / 1:00 PM / 7:00 PM Indian Standard Time.
    """
    ist = pytz.timezone("Asia/Kolkata")
    scheduler = BackgroundScheduler(timezone=ist)

    # 1. Morning Digest: 7:00 AM IST
    scheduler.add_job(
        trigger_morning_digest,
        trigger=CronTrigger(hour=7, minute=0, timezone=ist),
        id="morning_digest_job",
        name="Morning Digest (7:00 AM IST)",
        replace_existing=True
    )

    # 2. Afternoon Digest: 1:00 PM IST (13:00)
    scheduler.add_job(
        trigger_afternoon_digest,
        trigger=CronTrigger(hour=13, minute=0, timezone=ist),
        id="afternoon_digest_job",
        name="Afternoon Digest (1:00 PM IST)",
        replace_existing=True
    )

    # 3. Evening Digest: 7:00 PM IST (19:00)
    scheduler.add_job(
        trigger_evening_digest,
        trigger=CronTrigger(hour=19, minute=0, timezone=ist),
        id="evening_digest_job",
        name="Evening Digest (7:00 PM IST)",
        replace_existing=True
    )

    scheduler.start()
    logger.info("✅ FIN-X 3× Daily Scheduler initialized successfully (7:00 AM / 1:00 PM / 7:00 PM IST).")
    return scheduler

if __name__ == "__main__":
    import time
    logging.basicConfig(level=logging.INFO)
    sched = start_scheduler()
    print("Scheduler running. Press Ctrl+C to exit.")
    try:
        while True:
            time.sleep(1)
    except (KeyboardInterrupt, SystemExit):
        sched.shutdown()

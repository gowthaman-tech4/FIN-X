import os
import sys
import psycopg2

from dotenv import load_dotenv

load_dotenv(".env.local")

DB_PASS = os.getenv("SUPABASE_PASSWORD") or os.getenv("DATABASE_PASSWORD")
PROJECT_REF = os.getenv("SUPABASE_PROJECT_REF", "hmuadgobzrlkomtdvcva")

if not DB_PASS:
    # Try reading from DATABASE_URL
    import urllib.parse
    db_url = os.getenv("DATABASE_URL", "")
    if db_url:
        parsed = urllib.parse.urlparse(db_url)
        DB_PASS = parsed.password

# Potential connection options: Direct connection and regional connection poolers
CONNECTION_CANDIDATES = [
    # Direct
    f"postgresql://postgres:{DB_PASS}@db.{PROJECT_REF}.supabase.co:5432/postgres?sslmode=require",
    # Direct port 6543
    f"postgresql://postgres:{DB_PASS}@db.{PROJECT_REF}.supabase.co:6543/postgres?sslmode=require",
    # India Mumbai Pooler (ap-south-1)
    f"postgresql://postgres.{PROJECT_REF}:{DB_PASS}@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?sslmode=require",
    f"postgresql://postgres.{PROJECT_REF}:{DB_PASS}@aws-0-ap-south-1.pooler.supabase.com:5432/postgres?sslmode=require",
    # Singapore Pooler (ap-southeast-1)
    f"postgresql://postgres.{PROJECT_REF}:{DB_PASS}@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?sslmode=require",
    # US East Pooler (us-east-1)
    f"postgresql://postgres.{PROJECT_REF}:{DB_PASS}@aws-0-us-east-1.pooler.supabase.com:6543/postgres?sslmode=require",
    # EU Central (eu-central-1)
    f"postgresql://postgres.{PROJECT_REF}:{DB_PASS}@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?sslmode=require",
]

def test_and_run():
    conn = None
    working_url = None

    print(f"Connecting to Supabase project {PROJECT_REF}...")
    for candidate in CONNECTION_CANDIDATES:
        try:
            print(f"Trying connection: {candidate.split('@')[1]}...")
            conn = psycopg2.connect(candidate, connect_timeout=8)
            working_url = candidate
            print(" Connected successfully!")
            break
        except Exception as e:
            print(f" Failed: {e}")

    if not conn:
        print("\nCould not establish connection to Supabase via direct TCP.")
        print("Please check if the project region requires a specific pooler host.")
        sys.exit(1)

    cursor = conn.cursor()
    
    # 1. Run Schema
    print("\nRunning database/schema.sql...")
    with open("database/schema.sql", "r", encoding="utf-8") as f:
        schema_sql = f.read()
    cursor.execute(schema_sql)
    conn.commit()
    print("Schema created successfully!")

    # 2. Run Seed Sources
    print("\nRunning database/seed_sources.sql...")
    with open("database/seed_sources.sql", "r", encoding="utf-8") as f:
        seed_sources_sql = f.read()
    cursor.execute(seed_sources_sql)
    conn.commit()
    print("Sources seeded successfully!")

    # 3. Run Seed Stories
    print("\nRunning database/seed_sample_stories.sql...")
    with open("database/seed_sample_stories.sql", "r", encoding="utf-8") as f:
        seed_stories_sql = f.read()
    cursor.execute(seed_stories_sql)
    conn.commit()
    print("Stories seeded successfully!")

    # 4. Run Seed Calendar
    print("\nRunning database/seed_calendar.sql...")
    with open("database/seed_calendar.sql", "r", encoding="utf-8") as f:
        seed_cal_sql = f.read()
    cursor.execute(seed_cal_sql)
    conn.commit()
    print("Calendar events seeded successfully!")

    # Verify counts
    cursor.execute("SELECT count(*) FROM sources;")
    sources_count = cursor.fetchone()[0]
    cursor.execute("SELECT count(*) FROM stories;")
    stories_count = cursor.fetchone()[0]
    cursor.execute("SELECT count(*) FROM calendar_events;")
    cal_count = cursor.fetchone()[0]

    print("\n================ VERIFICATION ================")
    print(f"Sources in database: {sources_count}")
    print(f"Stories in database: {stories_count}")
    print(f"Calendar events in database: {cal_count}")
    print("==============================================")

    cursor.close()
    conn.close()

if __name__ == "__main__":
    test_and_run()

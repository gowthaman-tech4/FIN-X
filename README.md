# 🚀 FIN-X — Global Financial Intelligence & Digest Platform

> **"Come here and know what is happening in the financial world."**  
> Everything important in finance (Markets, Tax, Regulations, Economy, Banking, Policy) summarized in 2 lines with direct links to official sources.

---

## 🌟 Key Features

1. **All Finance Domains in One Place**:
   - 🏛 **Tax & GST**: Direct income tax notifications, GST Council decisions, TDS/TCS circulars (CBDT, CBIC, IRS).
   - ⚖ **Regulations**: Central bank mandates & market regulator circulars (RBI, SEBI, MCA, SEC, Fed).
   - 📈 **Markets**: Indices, equities, debt markets, commodities, and foreign exchange (NSE, BSE, S&P, Reuters).
   - 🌍 **Economy**: GDP growth releases, retail inflation (CPI), employment figures, and fiscal deficit updates.
   - 🏦 **Banking & Money**: Lending rates, NPAs, deposit insurance, and payments fintech.
   - 💼 **Policy & Trade**: Bilateral trade corridors, export tariffs, and government subsidies.

2. **Strict 2-Line AI Summaries**:
   - No 2,000-word articles or clickbait opinions.
   - **Line 1**: What event, circular, or rule change occurred.
   - **Line 2**: Who is affected and the practical impact.

3. **100% Attribution Transparency**:
   - Every single story links directly to the authoritative official circular or media publication.
   - Transparent Source Registry of 17 curated P0 official bodies and trusted media feeds.

4. **Calm 3× Daily Digest Model**:
   - Morning Brief (7:00 AM IST) • Midday Pulse (1:00 PM IST) • Evening Wrap (7:00 PM IST).
   - No continuous panic-scrolling ticker.

5. **Upcoming Financial Calendar**:
   - Advance Tax deadlines, RBI MPC rate decisions, US FOMC meetings, and CPI release dates.

---

## 🏗 ₹0 Free-Tier Tech Stack

| Component | Technology | Cost |
|---|---|---|
| **Frontend** | Next.js 16 (App Router) + Vanilla CSS Design Tokens | ₹0 (Cloudflare Pages) |
| **Backend API** | FastAPI (Python 3.13) + Uvicorn | ₹0 (Render Free / Local) |
| **Database** | Supabase PostgreSQL + Auth | ₹0 (Supabase Free Tier) |
| **AI Summarization** | Google Gemini API (`gemini-2.5-flash`) | ₹0 (Free Tier Quota) |
| **Icons & Design** | Lucide React + Glassmorphism Dark Mode | Open Source |

---

## 📁 Repository Structure

```
FIN_X/
├── src/
│   ├── app/
│   │   ├── globals.css         # Complete obsidian dark design system & tokens
│   │   ├── layout.js           # SEO tags, viewport, preconnect fonts
│   │   └── page.js             # Main interactive dashboard with dynamic filtering
│   ├── components/
│   │   ├── Header.jsx          # Live digest status, search, country switcher, alerts
│   │   ├── DomainNav.jsx       # Horizontal domain selector with dynamic color glows
│   │   ├── DigestHero.jsx      # 3x daily slot switcher, metrics chips & stream filters
│   │   ├── TopStories.jsx      # "Today's Essential Brief" - Top 5 must-know stories
│   │   ├── NewsCard.jsx        # Signature FIN-X news card with 2-line AI summary
│   │   ├── CalendarWidget.jsx  # Upcoming tax deadlines & central bank meetings
│   │   ├── AuthorityWatch.jsx  # Live monitor of CBDT, CBIC, RBI, SEBI, Fed, SEC
│   │   ├── ScheduleWidget.jsx  # Explanation of 3x daily digest cadence
│   │   ├── StoryModal.jsx      # Story deep-dive modal with tags & circular link
│   │   ├── AlertsModal.jsx     # Preference selector for domain alerts
│   │   └── SourceRegistryModal.jsx # Attribution directory for 17 verified sources
│   └── data/
│       └── mockData.js         # Curated realistic multi-domain dataset
├── backend/
│   ├── adapters/
│   │   ├── base.py             # Abstract adapter & RawItem model
│   │   ├── rss_adapter.py      # RSS collector (RBI, Fed, SEC, ET, Mint, Reuters)
│   │   ├── web_adapter.py      # Web scraper for official circulars (CBDT, CBIC, SEBI)
│   │   └── gdelt_adapter.py    # GDELT 2.0 API global discovery adapter
│   ├── ai/
│   │   ├── prompts.py          # Gemini system & extraction prompts
│   │   └── gemini_processor.py # AI relevance filter, classifier & 2-line summarizer
│   ├── main.py                 # FastAPI application
│   └── requirements.txt        # Backend dependencies
├── database/
│   ├── schema.sql              # Supabase PostgreSQL tables & indexes
│   ├── seed_sources.sql        # 17 official & media sources registry
│   ├── seed_sample_stories.sql # Curated high-impact initial stories
│   └── seed_calendar.sql       # Upcoming tax deadlines & rate decision dates
└── package.json
```

---

## 🚦 Getting Started Locally

### 1. Frontend (Next.js)
```bash
# Install dependencies (already installed)
npm install

# Run the dev server
npm run dev

# Open http://localhost:3000 in your browser
```

### 2. Backend (FastAPI)
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 3. Database (Supabase)
1. Create a free project at [supabase.com](https://supabase.com).
2. Run `database/schema.sql` in the Supabase SQL Editor.
3. Run `database/seed_sources.sql`, `database/seed_sample_stories.sql`, and `database/seed_calendar.sql`.

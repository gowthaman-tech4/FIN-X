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

2. **Strict 2-Line AI Summaries (Our 24/7 AI Journalist)**:
   - No 2,000-word articles or clickbait opinions.
   - **Line 1**: What official circular, rule change, or economic event occurred.
   - **Line 2**: Who is affected and the practical impact.

3. **🎧 60-Second Audio Brief ("Listen to Today's Digest")**:
   - Commute-friendly audio briefing powered by native browser Web Speech synthesis.
   - Play/pause, speed controls (1.0×, 1.25×, 1.5×), and animated soundwave equalizer.
   - ₹0 cost, zero backend latency.

4. **⭐ Personalized "My Focus" Domain Tabs**:
   - Pin favorite domains (e.g., Tax & GST + Regulations for a CA, Markets + Economy for a trader).
   - 1-click audience presets saved to `localStorage`.

5. **🔔 Fully Customizable Alert Times (Editable Delivery)**:
   - Complete flexibility: set your exact preferred alert delivery time (e.g. 8:00 AM, 5:30 PM, or custom exact minute) or edit individual morning/midday/evening slots.
   - 1-click quick presets: Morning Market Prep (8:00 AM), Midday Break (1:00 PM), Market Close (5:30 PM), Evening Wrap (7:00 PM).
   - High-curiosity Swiggy/Zomato-style witty notification preview with instant test push.

6. **📰 Sharp-Edged Wikipedia Design & Typography**:
   - Clean, crisp encyclopedic styling with sharp edges (`border-radius: 0px`) and Wikipedia-standard borders.
   - Editorial typography utilizing `Linux Libertine` / `EB Garamond` / `Georgia` serif headings with high-contrast legibility.
   - Realistic editorial financial news images for verified stories with graceful fallbacks.

7. **🏛 Official FIN-X Brand Identity**:
   - Institutional Forest Green & Emerald scroll parchment with sage checkmark emblem.
   - Brand motto: **FIN-X: FINANCE NEWS FOR YOU**.
   - 100% Attribution Transparency: direct links to verified regulatory circulars across 17 authorities.

---

## 🏗 ₹0 Free-Tier Tech Stack (100% Unified Next.js)

| Component | Technology | Cost | Hosting |
|---|---|---|---|
| **Full-Stack App** | Next.js 16 (App Router) + React 19 | ₹0 | Vercel Free Tier |
| **Ingestion Pipeline** | Serverless API Route (`/api/ingest`) | ₹0 | Vercel Serverless / Crons |
| **Automated Scheduler** | Vercel Cron (`vercel.json`) | ₹0 | 7:00 AM, 1:00 PM, 7:00 PM IST |
| **AI Journalist** | Google Gemini API (`gemini-2.5-flash`) | ₹0 | Google AI Studio Free Tier |
| **Database** | Supabase PostgreSQL | ₹0 | Supabase Free Tier |
| **Audio Synthesis** | Native Web Speech API | ₹0 | Browser Native (Offline Ready) |

---

## 📁 Repository Structure

```
FIN_X/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── stories/route.js    # Serves stories with Supabase pooling & fallback
│   │   │   ├── ingest/route.js     # Native RSS crawling & Gemini AI summarization
│   │   │   └── notifications/route.js # Dynamic witty notification hooks
│   │   ├── globals.css             # Classic light editorial theme & rich gradients
│   │   ├── layout.js               # Metadata, viewport, fonts
│   │   └── page.js                 # Dashboard with audio player, pinning & toast alerts
│   ├── components/
│   │   ├── AudioBriefPlayer.jsx    # 60-second audio player with animated equalizer bars
│   │   ├── Header.jsx              # Nav, search, country switcher & alerts modal trigger
│   │   ├── DomainNav.jsx           # Domain tabs with "My Focus" pinning & presets
│   │   ├── DigestHero.jsx          # Slot cadence switcher & audio player embed
│   │   ├── TopStories.jsx          # "Today's Essential Brief" - Top 5 must-know cards
│   │   ├── NewsCard.jsx            # Signature card with 2-line summary & official link
│   │   ├── CalendarWidget.jsx      # Upcoming tax deadlines & rate decision meetings
│   │   ├── AuthorityWatch.jsx      # Live monitor of CBDT, CBIC, RBI, SEBI, Fed, SEC
│   │   ├── ScheduleWidget.jsx      # 3x daily cadence timer
│   │   ├── StoryModal.jsx          # Deep-dive story modal with circular links
│   │   ├── AlertsModal.jsx         # Swiggy/Zomato style notifications & frequency selector
│   │   └── SourceRegistryModal.jsx # Attribution directory for 17 verified sources
│   ├── data/
│   │   └── mockData.js             # Realistic multi-domain initial dataset
│   └── lib/
│       └── gemini.js               # Native Gemini AI processor & witty notification generator
├── database/
│   ├── schema.sql                  # Supabase PostgreSQL tables & indexes
│   ├── seed_sources.sql            # 17 official & media sources registry
│   ├── seed_sample_stories.sql     # Curated initial stories
│   └── seed_calendar.sql           # Tax deadlines & central bank meetings
├── vercel.json                     # 3x daily automated ingestion cron schedule
├── package.json
└── README.md
```

---

## 🚦 Getting Started Locally

### 1. Run the Next.js App
```bash
npm install
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 2. (Optional) Run Live AI Ingestion Manually
To trigger a live crawl and AI distillation run into your Supabase database:
```bash
curl -X POST http://localhost:3000/api/ingest?slot=morning
```

### 3. Deploy to Vercel (100% Free)
1. Push this repository to your GitHub.
2. Import the project into [Vercel](https://vercel.com).
3. Add your environment variables in Vercel Project Settings:
   - `DATABASE_URL` (from Supabase)
   - `GEMINI_API_KEY` (from Google AI Studio)
4. Deploy! Vercel Cron will automatically trigger `/api/ingest` at 7:00 AM, 1:00 PM, and 7:00 PM IST.

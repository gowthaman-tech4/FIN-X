// ==============================================================================
// FIN-X Native Gemini AI Processing Engine (Next.js / Node.js)
// Zero external Python or heavy SDK dependencies required.
// Uses direct Google Gemini REST API (gemini-2.5-flash / gemini-1.5-flash).
// ==============================================================================

const GEMINI_SYSTEM_INSTRUCTION = `
You are FIN-X, an elite financial journalist and distillation engine.
Your sole mission is to analyze incoming raw headlines, official circulars, and gazettes, and extract strictly objective, factual financial summaries.

Rules:
1. RELEVANCE: Determine if this item is genuinely about finance, economics, markets, taxes, banking, regulations, or trade policy. If not, set is_finance=false.
2. DOMAIN: Classify into EXACTLY ONE: 'tax', 'regulations', 'markets', 'economy', 'banking', 'companies', 'policy'.
3. COUNTRY: 'IN' (India), 'US' (United States), or 'GLOBAL'.
4. IMPORTANCE: 'critical' (major tax change, surprise rate move, mandatory legal deadline), 'high' (official circular, GDP/CPI release), 'medium' (routine market moves), or 'low'.
5. STRICT 2-LINE SUMMARY:
   - Line 1: State WHAT official action, rule, event, or change took place.
   - Line 2: State WHO is impacted or the direct practical consequence.
   - Format: exactly two lines separated by a newline (\\n).
   - NO editorial opinions, NO speculation, NO financial advice.
6. OUTPUT: Return strictly a valid JSON object matching the requested schema.
`;

/**
 * Clean markdown JSON fences if present
 */
function cleanJson(text) {
  let cleaned = text.trim();
  cleaned = cleaned.replace(/^```(?:json)?\s*/i, '');
  cleaned = cleaned.replace(/\s*```$/, '');
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start !== -1 && end !== -1) {
    cleaned = cleaned.substring(start, end + 1);
  }
  return cleaned;
}

/**
 * Summarize and classify a raw financial announcement using Gemini API
 */
export async function processStoryWithGemini(rawItem) {
  const apiKey = process.env.GEMINI_API_KEY;
  const { title, content, source_name, authority_level = 'P1', country_hint = 'GLOBAL' } = rawItem;

  if (!title) return null;

  // If Gemini API Key is available, call the Gemini 2.5 Flash REST API
  if (apiKey) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

      const promptText = `
Source: ${source_name} (${authority_level})
Country Hint: ${country_hint}
Title: ${title}
Content snippet: ${(content || '').slice(0, 1000)}

Return JSON:
{
  "is_finance": true,
  "domain": "tax" | "regulations" | "markets" | "economy" | "banking" | "companies" | "policy",
  "subdomain": "string",
  "country": "IN" | "US" | "GLOBAL",
  "importance": "critical" | "high" | "medium" | "low",
  "headline": "Clean headline",
  "two_line_summary": "Line 1: Factual event statement.\\nLine 2: Practical impact statement.",
  "tags": ["tag1", "tag2"]
}
`;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: GEMINI_SYSTEM_INSTRUCTION }]
          },
          contents: [
            {
              role: 'user',
              parts: [{ text: promptText }]
            }
          ],
          generationConfig: {
            response_mime_type: 'application/json',
            temperature: 0.1
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidate) {
          const parsed = JSON.parse(cleanJson(candidate));
          if (parsed && parsed.is_finance) {
            return parsed;
          }
          return null; // Filtered non-finance
        }
      } else {
        console.warn('Gemini API returned status:', response.status);
      }
    } catch (err) {
      console.warn('Gemini API call failed, using heuristic fallback:', err.message);
    }
  }

  // Robust Heuristic Fallback (Runs if API key is unset or rate-limited)
  return fallbackHeuristicClassifier(rawItem);
}

/**
 * Generate a witty, high-curiosity Zomato/Swiggy-style notification hook
 * based on the actual top financial story of the day.
 */
export function generateWittyNotification(topStory) {
  if (!topStory) {
    return {
      title: "☕ Chai & Circulars",
      body: "3 critical financial circulars landed today. Read what changed in 30 seconds.",
      tag: "DIGEST"
    };
  }

  const titleLower = (topStory.headline || '').toLowerCase();
  const domain = topStory.domain || 'markets';

  if (domain === 'tax' || titleLower.includes('tax') || titleLower.includes('gst')) {
    return {
      title: "☕ Chai & Circulars: Tax Update",
      body: `${topStory.headline.slice(0, 75)}... Read how your money is affected in 30s.`,
      tag: "TAX & GST"
    };
  }

  if (domain === 'regulations' || titleLower.includes('rbi') || titleLower.includes('sebi')) {
    return {
      title: "🤫 Don't panic scroll Twitter",
      body: `RBI/SEBI just notified new rules: ${topStory.headline.slice(0, 65)}... Here are the 2 facts.`,
      tag: "REGULATIONS"
    };
  }

  if (titleLower.includes('tariff') || titleLower.includes('trade') || titleLower.includes('budget')) {
    return {
      title: "🚨 Trade & Policy Alert",
      body: `${topStory.headline.slice(0, 80)}. 2-line practical impact breakdown.`,
      tag: "POLICY"
    };
  }

  return {
    title: "📈 The 2-Line Daily Brief",
    body: `${topStory.headline.slice(0, 75)}... Skip the media noise, read the facts.`,
    tag: domain.toUpperCase()
  };
}

/**
 * Lightweight heuristic classifier for offline / fallback processing
 */
function fallbackHeuristicClassifier(rawItem) {
  const title = (rawItem.title || '').trim();
  const source = rawItem.source_name || 'Official Authority';
  const country = rawItem.country || 'IN';
  const lower = title.toLowerCase();

  let domain = 'markets';
  let subdomain = 'general';
  let importance = 'medium';

  if (/tax|gst|cbdt|cbic|customs|income tax|tds/i.test(lower)) {
    domain = 'tax';
    subdomain = lower.includes('gst') ? 'gst' : 'income_tax';
    importance = 'high';
  } else if (/rbi|sebi|sec|circular|regulation|compliance|mandate/i.test(lower)) {
    domain = 'regulations';
    subdomain = lower.includes('rbi') ? 'rbi' : lower.includes('sebi') ? 'sebi' : 'sec';
    importance = 'high';
  } else if (/inflation|cpi|gdp|economy|fed|fomc|rate cut|rate hike/i.test(lower)) {
    domain = 'economy';
    subdomain = 'monetary_policy';
    importance = 'high';
  } else if (/bank|lending|npa|deposit|credit|fintech/i.test(lower)) {
    domain = 'banking';
    subdomain = 'credit';
  } else if (/budget|tariff|trade|export|import|subsidy/i.test(lower)) {
    domain = 'policy';
    subdomain = 'trade';
  }

  if (/critical|mandatory|urgent|decision|penalty|deadline/i.test(lower)) {
    importance = 'critical';
  }

  const line1 = `Official announcement published regarding ${title.slice(0, 75)}.`;
  const line2 = `Market participants in ${country} should review compliance guidelines released by ${source}.`;

  return {
    is_finance: true,
    domain,
    subdomain,
    country,
    importance,
    headline: title,
    two_line_summary: `${line1}\n${line2}`,
    tags: [domain, country.toLowerCase()]
  };
}

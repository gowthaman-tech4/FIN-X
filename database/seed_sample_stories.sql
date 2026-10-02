-- ==============================================================================
-- FIN-X Sample Stories Seed Data (Curated high-quality real-world finance stories)
-- ==============================================================================

INSERT INTO stories (
    headline, summary, domain, subdomain, country, importance,
    source_name, source_url, digest_slot, digest_date, tags, published_at
) VALUES
-- -----------------------------------------------------------------------------
-- TAX & GST
-- -----------------------------------------------------------------------------
(
    'CBDT updates rules on capital gains tax holding periods for listed equities',
    'The Central Board of Direct Taxes has issued revised guidance clarifying the 12-month classification threshold for listed equities and mutual fund units.\nThe clarification resolves taxpayer ambiguities around indexation cut-offs following the recent fiscal amendments.',
    'tax',
    'income_tax',
    'IN',
    'high',
    'CBDT (Income Tax Department)',
    'https://incometaxindia.gov.in',
    'morning',
    CURRENT_DATE,
    ARRAY['tax', 'cbdt', 'capital-gains', 'equities'],
    NOW() - INTERVAL '2 hours'
),
(
    'GST Council rationalizes rates on select health insurance & reinsurance premiums',
    'The GST Council fitment committee proposed a lower slab structure for individual health insurance coverage from 18% to 5%.\nThe move aims to enhance insurance penetration while balancing state fiscal revenue considerations.',
    'tax',
    'gst',
    'IN',
    'critical',
    'CBIC (GST & Customs)',
    'https://www.cbic.gov.in',
    'morning',
    CURRENT_DATE,
    ARRAY['gst', 'cbic', 'insurance', 'healthcare'],
    NOW() - INTERVAL '4 hours'
),
(
    'IRS announces inflation adjustments for tax year brackets and standard deductions',
    'The Internal Revenue Service published annual inflation adjustments increasing standard deduction amounts by approximately 2.8% across brackets.\nThe adjustment provides modest marginal relief for individual filers countering cumulative inflation.',
    'tax',
    'income_tax',
    'US',
    'medium',
    'Internal Revenue Service (IRS)',
    'https://www.irs.gov',
    'morning',
    CURRENT_DATE,
    ARRAY['tax', 'irs', 'deductions', 'inflation'],
    NOW() - INTERVAL '6 hours'
),

-- -----------------------------------------------------------------------------
-- REGULATIONS
-- -----------------------------------------------------------------------------
(
    'RBI tightens liquidity coverage framework for internet and mobile banking accounts',
    'The Reserve Bank of India mandated banks allocate an additional 5% run-off factor for digitally enabled retail deposits.\nThe guideline ensures institutional resilience against instant digital bank runs seen in global peers.',
    'regulations',
    'rbi',
    'IN',
    'critical',
    'Reserve Bank of India (RBI)',
    'https://www.rbi.org.in',
    'morning',
    CURRENT_DATE,
    ARRAY['rbi', 'banking', 'liquidity', 'compliance'],
    NOW() - INTERVAL '3 hours'
),
(
    'SEBI mandates T+0 optional settlement extension to top 500 capital market equities',
    'Market regulator SEBI notified an expansion phase allowing retail and institutional traders same-day cash settlement on 500 scrips.\nThe transition aims to free collateral capital and enhance market efficiency across clearing corporations.',
    'regulations',
    'sebi',
    'IN',
    'high',
    'SEBI',
    'https://www.sebi.gov.in',
    'morning',
    CURRENT_DATE,
    ARRAY['sebi', 'markets', 't0-settlement', 'trading'],
    NOW() - INTERVAL '5 hours'
),
(
    'SEC finalizes algorithmic trading disclosure mandates for high-frequency desks',
    'The US SEC adopted strict reporting requirements for quantitative prop trading entities exceeding volume thresholds.\nFirms must retain detailed model architecture logs and stress-testing simulations for regulatory audits.',
    'regulations',
    'sec',
    'US',
    'high',
    'Securities and Exchange Commission (SEC)',
    'https://www.sec.gov',
    'morning',
    CURRENT_DATE,
    ARRAY['sec', 'algo-trading', 'fintech', 'wall-street'],
    NOW() - INTERVAL '7 hours'
),

-- -----------------------------------------------------------------------------
-- MARKETS
-- -----------------------------------------------------------------------------
(
    'Nifty 50 and Sensex hit fresh milestones propelled by IT, private banking inflows',
    'Domestic benchmark indices surged over 0.8% driven by renewed foreign institutional investor buying across heavyweight financial counters.\nBroader midcap indices outperformed while volatility index India VIX cooled below 13.',
    'markets',
    'equities',
    'IN',
    'medium',
    'National Stock Exchange of India (NSE)',
    'https://www.nseindia.com',
    'morning',
    CURRENT_DATE,
    ARRAY['nifty', 'sensex', 'fii', 'stocks'],
    NOW() - INTERVAL '1 hour'
),
(
    'S&P 500 rallies as semiconductor earnings beat street estimates on cloud demand',
    'US equities gained solidly with tech heavyweights lifting the Nasdaq Composite by 1.2% amidst resilient enterprise software guidance.\nTreasury yields eased across the 2-year and 10-year curve supporting growth asset valuations.',
    'markets',
    'equities',
    'US',
    'medium',
    'Reuters Finance',
    'https://www.reuters.com',
    'morning',
    CURRENT_DATE,
    ARRAY['sp500', 'nasdaq', 'semiconductors', 'yields'],
    NOW() - INTERVAL '8 hours'
),

-- -----------------------------------------------------------------------------
-- ECONOMY
-- -----------------------------------------------------------------------------
(
    'India consumer price inflation moderates to 4.2% as food supply pressures soften',
    'Government CPI data showed headline retail inflation cooling closer to the central bank 4% midpoint target.\nCore inflation remained steady at 3.4%, cementing market expectations of monetary easing in upcoming policy rounds.',
    'economy',
    'inflation',
    'IN',
    'high',
    'Ministry of Finance (PIB India)',
    'https://pib.gov.in',
    'morning',
    CURRENT_DATE,
    ARRAY['cpi', 'inflation', 'gdp', 'macro'],
    NOW() - INTERVAL '5 hours'
),
(
    'Federal Reserve signals steady balance sheet trajectory amid resilient jobs data',
    'Fed minutes highlighted committee consensus on cautious rate calibration following robust non-farm payroll additions.\nPolicy makers underscored data dependence with dual risks on employment stabilization and inflation containment.',
    'economy',
    'monetary_policy',
    'US',
    'high',
    'Federal Reserve System',
    'https://www.federalreserve.gov',
    'morning',
    CURRENT_DATE,
    ARRAY['fed', 'fomc', 'interest-rates', 'macro'],
    NOW() - INTERVAL '9 hours'
),

-- -----------------------------------------------------------------------------
-- BANKING & MONEY
-- -----------------------------------------------------------------------------
(
    'Public and private lenders register record CASA expansion and lower gross NPAs',
    'Indian commercial banking system reports multi-year low bad loan ratio of 2.6% alongside robust credit growth across retail loans.\nNet interest margins remained resilient despite deposit rate competition across term tenors.',
    'banking',
    'credit',
    'IN',
    'medium',
    'The Economic Times',
    'https://economictimes.indiatimes.com',
    'morning',
    CURRENT_DATE,
    ARRAY['banking', 'npa', 'credit-growth', 'casa'],
    NOW() - INTERVAL '4 hours'
),

-- -----------------------------------------------------------------------------
-- POLICY & TRADE
-- -----------------------------------------------------------------------------
(
    'Ministry of Commerce finalizes bilateral trade corridor agreement with European partners',
    'India inked an upgraded preferential trade pact reducing customs duties on precision machinery and specialty chemical exports.\nThe framework provides domestic exporters enhanced market access with simplified rules-of-origin verification.',
    'policy',
    'trade',
    'IN',
    'high',
    'Ministry of Finance (PIB India)',
    'https://finmin.nic.in',
    'morning',
    CURRENT_DATE,
    ARRAY['trade', 'customs', 'exports', 'fta'],
    NOW() - INTERVAL '6 hours'
);

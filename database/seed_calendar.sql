-- ==============================================================================
-- FIN-X Calendar Events Seed Data
-- ==============================================================================

INSERT INTO calendar_events (
    title, description, event_type, country, event_date, event_time, domain, source_url
) VALUES
(
    'RBI Monetary Policy Committee (MPC) Rate Decision',
    'Bi-monthly monetary policy statement and interest rate decision announced by the Governor.',
    'regulatory',
    'IN',
    CURRENT_DATE + INTERVAL '5 days',
    '10:00 AM IST',
    'banking',
    'https://www.rbi.org.in'
),
(
    'Advance Tax Second Installment Due Date',
    'Mandatory deadline for payment of 2nd installment of advance tax (45% cumulative) for AY 2025-26.',
    'tax_deadline',
    'IN',
    CURRENT_DATE + INTERVAL '12 days',
    '11:59 PM IST',
    'tax',
    'https://incometaxindia.gov.in'
),
(
    'US Federal Open Market Committee (FOMC) Statement',
    'Federal Reserve announces benchmark Federal Funds target rate decision followed by press conference.',
    'regulatory',
    'US',
    CURRENT_DATE + INTERVAL '14 days',
    '02:00 PM EST',
    'economy',
    'https://www.federalreserve.gov'
),
(
    'India CPI Retail Inflation Release',
    'National Statistical Office (NSO) releases consumer price index data for the prior month.',
    'economic',
    'IN',
    CURRENT_DATE + INTERVAL '8 days',
    '05:30 PM IST',
    'economy',
    'https://mospi.gov.in'
),
(
    'GSTR-3B Monthly Return Filing Deadline',
    'Summary return and tax liability payment deadline for registered regular GST taxpayers.',
    'tax_deadline',
    'IN',
    CURRENT_DATE + INTERVAL '18 days',
    '11:59 PM IST',
    'tax',
    'https://www.cbic.gov.in'
),
(
    'US Bureau of Labor Statistics Non-Farm Payrolls',
    'Key employment metrics including unemployment rate and average hourly earnings.',
    'economic',
    'US',
    CURRENT_DATE + INTERVAL '4 days',
    '08:30 AM EST',
    'economy',
    'https://www.bls.gov'
);

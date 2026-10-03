'use client';

import React from 'react';
import { Calendar, ExternalLink, Clock, ChevronRight } from 'lucide-react';
import { CALENDAR_EVENTS } from '../data/mockData';

export default function CalendarWidget({ selectedCountry }) {
  const filteredEvents = selectedCountry === 'ALL'
    ? CALENDAR_EVENTS
    : CALENDAR_EVENTS.filter(e => e.country === selectedCountry || e.country === 'GLOBAL');

  return (
    <div className="calendar-widget glass-panel">
      <div className="widget-header">
        <div className="widget-title-group">
          <Calendar size={15} style={{ color: 'var(--brand-primary)' }} />
          <h3 className="widget-title">Finance Calendar</h3>
        </div>
        <span className="event-count">{filteredEvents.length} events</span>
      </div>

      <div className="events-list">
        {filteredEvents.map((event) => {
          const isTax = event.type === 'tax_deadline';
          const isReg = event.type === 'regulatory';

          return (
            <div key={event.id} className="event-item">
              <div className="date-badge">
                <span className="date-month">{event.date.split(' ')[0]}</span>
                <span className="date-day">{event.date.split(' ')[1].replace(',', '')}</span>
              </div>

              <div className="event-details">
                <div className="event-top">
                  <span className={`event-tag ${isTax ? 'tax-tag' : isReg ? 'reg-tag' : 'econ-tag'}`}>
                    {event.tag}
                  </span>
                  <span className="event-country">{event.country === 'IN' ? '🇮🇳' : '🇺🇸'}</span>
                </div>

                <a 
                  href={event.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="event-title"
                >
                  {event.title}
                </a>

                <div className="event-meta">
                  <Clock size={11} />
                  <span>{event.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="widget-footer">
        <span className="footer-note">Official tax filings & central bank meetings</span>
      </div>

      <style jsx>{`
        .calendar-widget {
          padding: 1.15rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius);
        }

        .widget-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 0.55rem;
          border-bottom: 1px solid #eaecf0;
        }

        .widget-title-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .widget-title {
          font-family: var(--font-serif);
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--brand-primary);
          letter-spacing: -0.01em;
        }

        .event-count {
          font-size: 0.68rem;
          color: var(--text-muted);
          background: #f8faf9;
          border: 1px solid var(--border-subtle);
          padding: 0.1rem 0.4rem;
          border-radius: var(--radius-sm);
          font-weight: 600;
        }

        .events-list {
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
        }

        .event-item {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          padding: 0.55rem;
          border-radius: var(--radius);
          background: #f8faf9;
          border: 1px solid var(--border-subtle);
          transition: all 0.15s ease;
        }

        .event-item:hover {
          background: #f0f7f3;
          border-color: var(--brand-primary);
        }

        .date-badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          flex-shrink: 0;
        }

        .date-month {
          font-size: 0.58rem;
          font-weight: 800;
          color: var(--brand-primary);
          text-transform: uppercase;
        }

        .date-day {
          font-size: 0.85rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1;
        }

        .event-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          min-width: 0;
        }

        .event-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.35rem;
        }

        .event-tag {
          font-size: 0.62rem;
          font-weight: 700;
          padding: 1px 4px;
          border-radius: var(--radius-sm);
          text-transform: uppercase;
        }

        .tax-tag {
          background: #fff8f0;
          color: #8b3a00;
          border: 1px solid #d4a373;
        }

        .reg-tag {
          background: #f0f7f3;
          color: var(--brand-primary);
          border: 1px solid #a8cfb8;
        }

        .econ-tag {
          background: #f0f7fa;
          color: #1b4d63;
          border: 1px solid #9ec5d6;
        }

        .event-country {
          font-size: 0.72rem;
        }

        .event-title {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.35;
        }

        .event-title:hover {
          color: var(--brand-primary);
          text-decoration: underline;
        }

        .event-meta {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.68rem;
          color: var(--text-muted);
        }

        .widget-footer {
          padding-top: 0.4rem;
          border-top: 1px solid #eaecf0;
        }

        .footer-note {
          font-size: 0.68rem;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}

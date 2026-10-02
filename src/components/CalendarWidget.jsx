'use client';

import React from 'react';
import { Calendar, ExternalLink, Clock, ChevronRight } from 'lucide-react';
import { CALENDAR_EVENTS } from '../data/mockData';

export default function CalendarWidget({ selectedCountry }) {
  // Filter events based on selected country
  const filteredEvents = selectedCountry === 'ALL'
    ? CALENDAR_EVENTS
    : CALENDAR_EVENTS.filter(e => e.country === selectedCountry || e.country === 'GLOBAL');

  return (
    <div className="calendar-widget glass-panel">
      <div className="widget-header">
        <div className="widget-title-group">
          <Calendar size={16} className="text-primary" />
          <h3 className="widget-title">Upcoming Finance Calendar</h3>
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
        <span className="footer-note">Official regulatory & tax calendar</span>
      </div>

      <style jsx>{`
        .calendar-widget {
          padding: 1.15rem;
          display: flex;
          flex-direction: column;
          gap: 0.95rem;
        }

        .widget-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 0.65rem;
          border-bottom: 1px solid var(--border-subtle);
        }

        .widget-title-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .widget-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.01em;
        }

        .event-count {
          font-size: 0.68rem;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.05);
          padding: 0.15rem 0.45rem;
          border-radius: 9999px;
        }

        .events-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .event-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.65rem;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
          transition: all 0.15s ease;
        }

        .event-item:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .date-badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 8px;
          background: rgba(59, 130, 246, 0.12);
          border: 1px solid rgba(59, 130, 246, 0.3);
          flex-shrink: 0;
        }

        .date-month {
          font-size: 0.6rem;
          font-weight: 700;
          text-transform: uppercase;
          color: #60a5fa;
          line-height: 1;
        }

        .date-day {
          font-size: 0.95rem;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.1;
        }

        .event-details {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          flex: 1;
        }

        .event-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .event-tag {
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          padding: 0.1rem 0.4rem;
          border-radius: 4px;
        }

        .tax-tag {
          background: rgba(245, 158, 11, 0.15);
          color: #f59e0b;
        }

        .reg-tag {
          background: rgba(139, 92, 246, 0.15);
          color: #a78bfa;
        }

        .econ-tag {
          background: rgba(6, 182, 212, 0.15);
          color: #22d3ee;
        }

        .event-country {
          font-size: 0.8rem;
        }

        .event-title {
          font-size: 0.78rem;
          font-weight: 600;
          color: #e2e8f0;
          line-height: 1.3;
          transition: color 0.15s ease;
        }

        .event-title:hover {
          color: #38bdf8;
        }

        .event-meta {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.68rem;
          color: var(--text-muted);
        }

        .widget-footer {
          padding-top: 0.35rem;
          border-top: 1px solid var(--border-subtle);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-note {
          font-size: 0.68rem;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
}

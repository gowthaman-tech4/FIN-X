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
          <Calendar size={16} style={{ color: '#2563eb' }} />
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
          gap: 0.95rem;
          background: #ffffff;
          border: 1px solid rgba(226, 232, 240, 0.9);
          border-radius: 14px;
        }

        .widget-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 0.65rem;
          border-bottom: 1px solid rgba(241, 245, 249, 0.9);
        }

        .widget-title-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .widget-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: #0f172a;
          letter-spacing: -0.01em;
        }

        .event-count {
          font-size: 0.68rem;
          color: #64748b;
          background: #f1f5f9;
          padding: 0.15rem 0.45rem;
          border-radius: 9999px;
          font-weight: 600;
        }

        .events-list {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .event-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.65rem;
          border-radius: 8px;
          background: #f8fafc;
          border: 1px solid rgba(226, 232, 240, 0.8);
          transition: all 0.15s ease;
        }

        .event-item:hover {
          background: #f1f5f9;
          border-color: rgba(203, 213, 225, 0.9);
        }

        .date-badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: rgba(37, 99, 235, 0.08);
          border: 1px solid rgba(37, 99, 235, 0.2);
          flex-shrink: 0;
        }

        .date-month {
          font-size: 0.6rem;
          font-weight: 700;
          text-transform: uppercase;
          color: #2563eb;
          line-height: 1;
        }

        .date-day {
          font-size: 0.92rem;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.1;
        }

        .event-details {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          flex: 1;
        }

        .event-top {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .event-tag {
          font-size: 0.62rem;
          font-weight: 700;
          text-transform: uppercase;
          padding: 0.1rem 0.35rem;
          border-radius: 4px;
        }

        .tax-tag {
          background: rgba(245, 158, 11, 0.1);
          color: #b45309;
        }

        .reg-tag {
          background: rgba(139, 92, 246, 0.1);
          color: #6d28d9;
        }

        .econ-tag {
          background: rgba(6, 182, 212, 0.1);
          color: #0e7490;
        }

        .event-country {
          font-size: 0.72rem;
        }

        .event-title {
          font-size: 0.78rem;
          font-weight: 600;
          color: #1e293b;
          line-height: 1.35;
          transition: color 0.15s ease;
        }

        .event-title:hover {
          color: #2563eb;
        }

        .event-meta {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.68rem;
          color: #64748b;
        }

        .widget-footer {
          padding-top: 0.45rem;
          border-top: 1px solid rgba(241, 245, 249, 0.9);
          text-align: center;
        }

        .footer-note {
          font-size: 0.68rem;
          color: #94a3b8;
        }
      `}</style>
    </div>
  );
}

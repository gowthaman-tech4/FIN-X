'use client';

import React from 'react';
import { Clock, Sunrise, Sun, Sunset, CheckCircle2 } from 'lucide-react';

export default function ScheduleWidget() {
  return (
    <div className="schedule-widget glass-panel">
      <div className="widget-header">
        <Clock size={16} style={{ color: '#2563eb' }} />
        <h3 className="widget-title">3× Daily Digest Schedule</h3>
      </div>

      <p className="widget-desc">
        We synthesize thousands of regulatory circulars, market filings, and economic events into 3 calm digests per day.
      </p>

      <div className="slots-timeline">
        <div className="slot-item current">
          <div className="slot-icon morning">
            <Sunrise size={14} />
          </div>
          <div className="slot-info">
            <div className="slot-head">
              <span className="slot-name">Morning Brief</span>
              <span className="current-badge">Active</span>
            </div>
            <span className="slot-time">7:00 AM IST • Overnight global moves & early filings</span>
          </div>
        </div>

        <div className="slot-item">
          <div className="slot-icon afternoon">
            <Sun size={14} />
          </div>
          <div className="slot-info">
            <div className="slot-head">
              <span className="slot-name">Midday Pulse</span>
            </div>
            <span className="slot-time">1:00 PM IST • Morning session actions & tax updates</span>
          </div>
        </div>

        <div className="slot-item">
          <div className="slot-icon evening">
            <Sunset size={14} />
          </div>
          <div className="slot-info">
            <div className="slot-head">
              <span className="slot-name">Evening Wrap</span>
            </div>
            <span className="slot-time">7:00 PM IST • Market closures, circulars & tomorrow outlook</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .schedule-widget {
          padding: 1.15rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          background: #ffffff;
          border: 1px solid rgba(226, 232, 240, 0.9);
          border-radius: 14px;
        }

        .widget-header {
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

        .widget-desc {
          font-size: 0.75rem;
          color: #64748b;
          line-height: 1.4;
        }

        .slots-timeline {
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
        }

        .slot-item {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          padding: 0.6rem;
          border-radius: 8px;
          background: #f8fafc;
          border: 1px solid rgba(226, 232, 240, 0.8);
          transition: all 0.15s ease;
        }

        .slot-item.current {
          background: rgba(37, 99, 235, 0.05);
          border-color: rgba(37, 99, 235, 0.25);
        }

        .slot-icon {
          width: 26px;
          height: 26px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .slot-icon.morning {
          background: #fef3c7;
          color: #d97706;
        }

        .slot-icon.afternoon {
          background: #e0f2fe;
          color: #0284c7;
        }

        .slot-icon.evening {
          background: #fae8ff;
          color: #a21caf;
        }

        .slot-info {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          flex: 1;
        }

        .slot-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .slot-name {
          font-size: 0.78rem;
          font-weight: 700;
          color: #0f172a;
        }

        .current-badge {
          font-size: 0.62rem;
          font-weight: 800;
          text-transform: uppercase;
          background: #d1fae5;
          color: #047857;
          padding: 0.1rem 0.4rem;
          border-radius: 9999px;
        }

        .slot-time {
          font-size: 0.68rem;
          color: #64748b;
          line-height: 1.35;
        }
      `}</style>
    </div>
  );
}

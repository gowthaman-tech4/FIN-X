'use client';

import React from 'react';
import { Clock, Sunrise, Sun, Sunset, CheckCircle2 } from 'lucide-react';

export default function ScheduleWidget() {
  return (
    <div className="schedule-widget glass-panel">
      <div className="widget-header">
        <Clock size={16} className="text-secondary" />
        <h3 className="widget-title">3× Daily Digest Schedule</h3>
      </div>

      <p className="widget-desc">
        We synthesize thousands of regulatory circulars, market filings, and economic events into 3 concise digests per day.
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
        }

        .widget-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .widget-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: #ffffff;
        }

        .widget-desc {
          font-size: 0.73rem;
          line-height: 1.45;
          color: var(--text-secondary);
        }

        .slots-timeline {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .slot-item {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          padding: 0.55rem;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.04);
        }

        .slot-item.current {
          background: rgba(59, 130, 246, 0.08);
          border-color: rgba(59, 130, 246, 0.25);
        }

        .slot-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 6px;
          flex-shrink: 0;
        }

        .slot-icon.morning {
          background: rgba(245, 158, 11, 0.15);
          color: #f59e0b;
        }

        .slot-icon.afternoon {
          background: rgba(56, 189, 248, 0.15);
          color: #38bdf8;
        }

        .slot-icon.evening {
          background: rgba(139, 92, 246, 0.15);
          color: #a78bfa;
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
          color: #f8fafc;
        }

        .current-badge {
          font-size: 0.6rem;
          font-weight: 700;
          text-transform: uppercase;
          background: rgba(16, 185, 129, 0.2);
          color: #10b981;
          padding: 0.05rem 0.35rem;
          border-radius: 4px;
        }

        .slot-time {
          font-size: 0.68rem;
          color: var(--text-muted);
          line-height: 1.3;
        }
      `}</style>
    </div>
  );
}

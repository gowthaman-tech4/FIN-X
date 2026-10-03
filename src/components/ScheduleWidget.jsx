'use client';

import React from 'react';
import { Clock, Sunrise, Sun, Sunset, Sliders, CheckCircle2 } from 'lucide-react';

export default function ScheduleWidget({ onOpenAlerts }) {
  return (
    <div className="schedule-widget glass-panel">
      <div className="widget-header">
        <Clock size={16} style={{ color: 'var(--brand-primary)' }} />
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

      {/* Customizable Time Trigger Button */}
      <div className="widget-action-row">
        <button 
          onClick={onOpenAlerts} 
          className="edit-schedule-btn"
          title="Change or customize your notification delivery times"
        >
          <Sliders size={12} />
          <span>Customize Your Delivery Time</span>
        </button>
      </div>

      <style jsx>{`
        .schedule-widget {
          padding: 1.15rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius);
        }

        .widget-header {
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

        .widget-desc {
          font-size: 0.75rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .slots-timeline {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .slot-item {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          padding: 0.55rem 0.65rem;
          border-radius: var(--radius);
          background: #f8faf9;
          border: 1px solid var(--border-subtle);
          transition: all 0.15s ease;
        }

        .slot-item.current {
          background: #f0f7f3;
          border-color: #a8cfb8;
        }

        .slot-icon {
          width: 26px;
          height: 26px;
          border-radius: var(--radius);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .slot-icon.morning {
          background: #fef3c7;
          color: #b45309;
        }

        .slot-icon.afternoon {
          background: #ffedd5;
          color: #c2410c;
        }

        .slot-icon.evening {
          background: #e0e7ff;
          color: #4338ca;
        }

        .slot-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .slot-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .slot-name {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .current-badge {
          font-size: 0.62rem;
          font-weight: 700;
          color: var(--brand-primary);
          background: #d1fae5;
          border: 1px solid #a7f3d0;
          padding: 1px 5px;
          border-radius: var(--radius);
          text-transform: uppercase;
        }

        .slot-time {
          font-size: 0.68rem;
          color: var(--text-secondary);
          line-height: 1.35;
        }

        .widget-action-row {
          padding-top: 0.4rem;
          border-top: 1px solid #eaecf0;
        }

        .edit-schedule-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          padding: 0.45rem 0.75rem;
          background: #ffffff;
          border: 1px dashed var(--brand-secondary);
          color: var(--brand-primary);
          border-radius: var(--radius);
          font-size: 0.75rem;
          font-weight: 600;
          transition: all 0.15s ease;
        }

        .edit-schedule-btn:hover {
          background: #f0f7f3;
          border-style: solid;
        }
      `}</style>
    </div>
  );
}

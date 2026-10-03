'use client';

import React, { useState } from 'react';
import { 
  X, 
  Bell, 
  Check, 
  Flame, 
  ShieldCheck, 
  Mail, 
  Lock, 
  ArrowRight,
  Sparkles,
  Smartphone,
  Clock,
  Send
} from 'lucide-react';
import { DOMAINS } from '../data/mockData';

export default function AlertsModal({ isOpen, onClose, onTriggerToast }) {
  const [frequency, setFrequency] = useState('1x'); // '1x' or '3x'
  const [selectedDomains, setSelectedDomains] = useState(['tax', 'regulations']);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeHookIndex, setActiveHookIndex] = useState(0);

  const WITTY_HOOKS = [
    {
      title: "☕ Chai & Circulars",
      body: "CBDT just dropped revised capital gains guidelines. Is your portfolio safe? Read in 30 secs.",
      tag: "TAX & GST"
    },
    {
      title: "🤫 Don't panic scroll Twitter",
      body: "RBI just tightened digital banking liquidity rules. Here's what it actually means in 2 lines.",
      tag: "REGULATIONS"
    },
    {
      title: "🚨 10 Days to Tax Deadline!",
      body: "Avoid the 1% monthly interest penalty. Check the 60-second advance tax checklist.",
      tag: "CALENDAR"
    },
    {
      title: "🍕 Hot & Fresh at 1:00 PM",
      body: "Just like Swiggy brings lunch, FIN-X delivers the Midday Market Pulse. Zero drama.",
      tag: "MARKETS"
    },
    {
      title: "📈 Sensex did gymnastics today",
      body: "Skip the TV noise. The 2 official reasons why equities swung before closing bell.",
      tag: "MARKETS"
    }
  ];

  if (!isOpen) return null;

  const toggleDomain = (id) => {
    if (selectedDomains.includes(id)) {
      setSelectedDomains(selectedDomains.filter(d => d !== id));
    } else {
      setSelectedDomains([...selectedDomains, id]);
    }
  };

  const handleTestNotification = () => {
    const hook = WITTY_HOOKS[activeHookIndex];
    setActiveHookIndex((prev) => (prev + 1) % WITTY_HOOKS.length);

    // 1. Try real browser Web Push Notification if supported
    if (typeof window !== 'undefined' && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification(`FIN-X: ${hook.title}`, {
          body: hook.body,
          icon: '/favicon.ico'
        });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            new Notification(`FIN-X: ${hook.title}`, {
              body: hook.body,
              icon: '/favicon.ico'
            });
          }
        });
      }
    }

    // 2. Also trigger in-app toast preview for immediate delight
    if (onTriggerToast) {
      onTriggerToast(hook);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="title-group">
            <span className="bell-badge">
              <Bell size={18} />
            </span>
            <div>
              <h2 className="modal-title">FIN-X Witty Financial Alerts</h2>
              <span className="modal-sub">Zero spam. Punchy, high-curiosity financial updates.</span>
            </div>
          </div>
          <button onClick={onClose} className="close-btn" title="Close">
            <X size={18} />
          </button>
        </div>

        {isSubmitted ? (
          <div className="success-state">
            <div className="success-icon">
              <Check size={28} />
            </div>
            <h3>Alert Schedule Confirmed!</h3>
            <p>
              We’ve registered <strong>{email}</strong> for <strong>{frequency === '1x' ? '1× Evening Wrap (7 PM)' : '3× Daily Digest (7 AM, 1 PM, 7 PM)'}</strong> covering <strong>{selectedDomains.join(', ')}</strong>.
            </p>
            <button onClick={onClose} className="submit-btn" style={{ marginTop: '1rem' }}>
              Back to Digest
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="modal-body">
            {/* Zomato / Swiggy-Style Hook Preview Carousel */}
            <div className="witty-preview-box">
              <div className="preview-top">
                <span className="preview-tag">
                  <Sparkles size={12} />
                  <span>Swiggy/Zomato-Style Notification Preview</span>
                </span>
                <button 
                  type="button" 
                  onClick={handleTestNotification}
                  className="test-notify-btn"
                  title="Fire a test notification now"
                >
                  <Send size={11} />
                  <span>Test Push</span>
                </button>
              </div>

              <div className="preview-card">
                <div className="phone-push-head">
                  <div className="push-brand">
                    <span className="mini-logo">FIN-X</span>
                    <span className="push-time">Now</span>
                  </div>
                  <span className="push-category">{WITTY_HOOKS[activeHookIndex].tag}</span>
                </div>
                <div className="push-title">{WITTY_HOOKS[activeHookIndex].title}</div>
                <div className="push-body">{WITTY_HOOKS[activeHookIndex].body}</div>
              </div>
            </div>

            {/* Cadence Selection: 1x vs 3x daily */}
            <div className="section-block">
              <label className="section-label">
                <Clock size={14} className="label-icon" />
                <span>Choose Your Alert Cadence:</span>
              </label>
              <div className="frequency-toggle-group">
                <button
                  type="button"
                  onClick={() => setFrequency('1x')}
                  className={`frequency-btn ${frequency === '1x' ? 'active' : ''}`}
                >
                  <span className="freq-title">1× Daily Wrap</span>
                  <span className="freq-desc">7:00 PM IST • Calm evening recap of everything important</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFrequency('3x')}
                  className={`frequency-btn ${frequency === '3x' ? 'active' : ''}`}
                >
                  <span className="freq-title">3× Daily Digest</span>
                  <span className="freq-desc">7 AM, 1 PM, 7 PM • Morning Brief, Midday Pulse & Wrap</span>
                </button>
              </div>
            </div>

            {/* Domain Selection */}
            <div className="section-block">
              <label className="section-label">Select domains you care about:</label>
              <div className="domains-chips">
                {DOMAINS.filter(d => d.id !== 'all').map((d) => {
                  const isChecked = selectedDomains.includes(d.id);
                  return (
                    <button
                      type="button"
                      key={d.id}
                      onClick={() => toggleDomain(d.id)}
                      className={`domain-toggle ${isChecked ? 'selected' : ''}`}
                    >
                      {isChecked && <Check size={12} />}
                      <span>{d.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Email Input */}
            <div className="input-group">
              <label className="section-label">Your Email for the Digest:</label>
              <div className="input-wrapper">
                <Mail size={16} className="input-icon" />
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="email-input"
                />
              </div>
            </div>

            <button type="submit" className="submit-btn">
              <span>Confirm Alert Preferences</span>
              <ArrowRight size={15} />
            </button>

            <div className="privacy-note">
              <Lock size={12} />
              <span>We never spam or sell data. Unsubscribe with 1 click anytime.</span>
            </div>
          </form>
        )}
      </div>

      <style jsx>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.45);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .modal-card {
          width: 100%;
          max-width: 520px;
          background: #ffffff;
          border: 1px solid rgba(226, 232, 240, 0.95);
          border-radius: 16px;
          padding: 1.6rem;
          box-shadow: 0 20px 50px rgba(15, 23, 42, 0.15);
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          max-height: 90vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding-bottom: 0.85rem;
          border-bottom: 1px solid rgba(241, 245, 249, 0.9);
        }

        .title-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .bell-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(37, 99, 235, 0.1);
          color: #2563eb;
        }

        .modal-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.2;
        }

        .modal-sub {
          font-size: 0.75rem;
          color: #64748b;
        }

        .close-btn {
          width: 28px;
          height: 28px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
          transition: all 0.15s ease;
        }

        .close-btn:hover {
          background: #f1f5f9;
          color: #0f172a;
        }

        .modal-body {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
        }

        /* Witty Hook Preview Box */
        .witty-preview-box {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border: 1px solid rgba(203, 213, 225, 0.8);
          border-radius: 12px;
          padding: 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .preview-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .preview-tag {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.68rem;
          font-weight: 700;
          color: #2563eb;
          text-transform: uppercase;
        }

        .test-notify-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.7rem;
          font-weight: 700;
          color: #ffffff;
          background: #2563eb;
          padding: 0.2rem 0.55rem;
          border-radius: 6px;
          transition: all 0.15s ease;
        }

        .test-notify-btn:hover {
          background: #1d4ed8;
        }

        .preview-card {
          background: #ffffff;
          border: 1px solid rgba(226, 232, 240, 0.9);
          border-radius: 10px;
          padding: 0.75rem 0.85rem;
          box-shadow: 0 4px 12px -2px rgba(15, 23, 42, 0.06);
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .phone-push-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.65rem;
        }

        .push-brand {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .mini-logo {
          font-weight: 800;
          color: #2563eb;
        }

        .push-time {
          color: #94a3b8;
        }

        .push-category {
          font-weight: 700;
          color: #b45309;
        }

        .push-title {
          font-size: 0.82rem;
          font-weight: 800;
          color: #0f172a;
        }

        .push-body {
          font-size: 0.75rem;
          color: #475569;
          line-height: 1.4;
        }

        /* Cadence Frequency Toggles */
        .section-block {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .section-label {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.78rem;
          font-weight: 700;
          color: #334155;
        }

        .label-icon {
          color: #2563eb;
        }

        .frequency-toggle-group {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.6rem;
        }

        .frequency-btn {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          padding: 0.75rem;
          border-radius: 10px;
          border: 1px solid rgba(226, 232, 240, 0.9);
          background: #ffffff;
          text-align: left;
          transition: all 0.18s ease;
        }

        .frequency-btn:hover {
          border-color: #94a3b8;
          background: #f8fafc;
        }

        .frequency-btn.active {
          border-color: #2563eb;
          background: rgba(37, 99, 235, 0.05);
          box-shadow: 0 0 0 1px #2563eb;
        }

        .freq-title {
          font-size: 0.82rem;
          font-weight: 700;
          color: #0f172a;
        }

        .freq-desc {
          font-size: 0.68rem;
          color: #64748b;
          line-height: 1.35;
        }

        .domains-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .domain-toggle {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.32rem 0.65rem;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          color: #475569;
          background: #f8fafc;
          border: 1px solid rgba(226, 232, 240, 0.9);
          transition: all 0.15s ease;
        }

        .domain-toggle:hover {
          background: #f1f5f9;
          color: #0f172a;
        }

        .domain-toggle.selected {
          background: rgba(37, 99, 235, 0.08);
          border-color: rgba(37, 99, 235, 0.3);
          color: #2563eb;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 12px;
          color: #94a3b8;
        }

        .email-input {
          width: 100%;
          padding: 0.6rem 0.75rem 0.6rem 38px;
          border-radius: 8px;
          border: 1px solid rgba(203, 213, 225, 0.9);
          background: #ffffff;
          font-size: 0.85rem;
          color: #0f172a;
          outline: none;
          transition: border-color 0.15s ease;
        }

        .email-input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
        }

        .submit-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          color: #ffffff;
          font-size: 0.85rem;
          font-weight: 700;
          padding: 0.65rem;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
          transition: all 0.15s ease;
        }

        .submit-btn:hover {
          background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
          transform: translateY(-1px);
        }

        .privacy-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          font-size: 0.7rem;
          color: #94a3b8;
          text-align: center;
        }

        .success-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 1.5rem 0;
          gap: 0.65rem;
        }

        .success-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #d1fae5;
          color: #047857;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .success-state h3 {
          font-size: 1.15rem;
          font-weight: 800;
          color: #0f172a;
        }

        .success-state p {
          font-size: 0.85rem;
          color: #475569;
          line-height: 1.45;
          max-width: 400px;
        }

        @media (max-width: 600px) {
          .frequency-toggle-group {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

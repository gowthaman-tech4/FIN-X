'use client';

import React, { useState, useEffect } from 'react';
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
  Send,
  Sliders,
  Calendar
} from 'lucide-react';
import { DOMAINS } from '../data/mockData';

export default function AlertsModal({ isOpen, onClose, onTriggerToast }) {
  const [cadence, setCadence] = useState('1x'); // '1x' or '3x'
  const [customTime, setCustomTime] = useState('19:00'); // 7:00 PM IST default
  const [morningSlot, setMorningSlot] = useState('07:00');
  const [middaySlot, setMiddaySlot] = useState('13:00');
  const [eveningSlot, setEveningSlot] = useState('19:00');
  const [selectedDomains, setSelectedDomains] = useState(['tax', 'regulations']);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeHookIndex, setActiveHookIndex] = useState(0);

  // Load saved preferences if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem('finx_custom_alert_prefs');
      if (saved) {
        const p = JSON.parse(saved);
        if (p.cadence) setCadence(p.cadence);
        if (p.customTime) setCustomTime(p.customTime);
        if (p.morningSlot) setMorningSlot(p.morningSlot);
        if (p.middaySlot) setMiddaySlot(p.middaySlot);
        if (p.eveningSlot) setEveningSlot(p.eveningSlot);
        if (p.selectedDomains) setSelectedDomains(p.selectedDomains);
        if (p.email) setEmail(p.email);
      }
    } catch (e) {}
  }, []);

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
      title: "🍕 Hot & Fresh at Lunch",
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

  // Convert "HH:MM" (24h) to "H:MM AM/PM"
  const formatTime12h = (time24) => {
    if (!time24) return '';
    const [h, m] = time24.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    const minPadded = m < 10 ? `0${m}` : m;
    return `${hour12}:${minPadded} ${period}`;
  };

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
          icon: '/logo.png'
        });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            new Notification(`FIN-X: ${hook.title}`, {
              body: hook.body,
              icon: '/logo.png'
            });
          }
        });
      }
    }

    // 2. Also trigger in-app toast preview
    if (onTriggerToast) {
      onTriggerToast(hook);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      localStorage.setItem('finx_custom_alert_prefs', JSON.stringify({
        cadence,
        customTime,
        morningSlot,
        middaySlot,
        eveningSlot,
        selectedDomains,
        email,
        updatedAt: new Date().toISOString()
      }));
    } catch (err) {}

    setIsSubmitted(true);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="title-group">
            <div className="logo-badge">
              <img src="/logo.png" alt="FIN-X" className="modal-logo-img" />
            </div>
            <div>
              <h2 className="modal-title">Custom Financial Alert Times</h2>
              <span className="modal-sub">
                100% Flexible schedule. Zero noise. Official verified sources.
              </span>
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
            <h3 className="success-title">Custom Alert Schedule Confirmed!</h3>
            <p className="success-desc">
              We’ve registered <strong>{email}</strong> for{' '}
              {cadence === '1x' ? (
                <span>
                  <strong>1× Daily Digest at {formatTime12h(customTime)} IST</strong>
                </span>
              ) : (
                <span>
                  <strong>
                    3× Schedule ({formatTime12h(morningSlot)}, {formatTime12h(middaySlot)}, {formatTime12h(eveningSlot)} IST)
                  </strong>
                </span>
              )}
              . Selected topics: <strong>{selectedDomains.join(', ')}</strong>.
            </p>
            <button onClick={onClose} className="submit-btn" style={{ marginTop: '1rem' }}>
              Done & Return to Digest
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="modal-body">
            {/* Zomato / Swiggy-Style Hook Preview Carousel */}
            <div className="witty-preview-box">
              <div className="preview-top">
                <span className="preview-tag">
                  <Sparkles size={12} />
                  <span>Interactive Alert Preview</span>
                </span>
                <button 
                  type="button" 
                  onClick={handleTestNotification}
                  className="test-notify-btn"
                  title="Test how notifications appear"
                >
                  <Send size={11} />
                  <span>Test Alert</span>
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

            {/* Cadence Selection: 1x Custom vs 3x Multi-Slot */}
            <div className="section-block">
              <label className="section-label">
                <Sliders size={13} className="label-icon" />
                <span>1. Select Delivery Mode:</span>
              </label>
              <div className="frequency-toggle-group">
                <button
                  type="button"
                  onClick={() => setCadence('1x')}
                  className={`frequency-btn ${cadence === '1x' ? 'active' : ''}`}
                >
                  <span className="freq-title">1× Custom Daily Time</span>
                  <span className="freq-desc">Pick your exact preferred time (e.g. 7:00 PM, 8:30 AM)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCadence('3x')}
                  className={`frequency-btn ${cadence === '3x' ? 'active' : ''}`}
                >
                  <span className="freq-title">3× Daily Schedule</span>
                  <span className="freq-desc">Morning, Midday & Evening slots (all editable)</span>
                </button>
              </div>
            </div>

            {/* Editable Time Picker Section (Requirement 1) */}
            <div className="section-block time-editor-box">
              <label className="section-label">
                <Clock size={13} className="label-icon" />
                <span>2. Customize Your Alert Time(s):</span>
              </label>

              {cadence === '1x' ? (
                <div className="single-time-picker">
                  <div className="time-input-row">
                    <label className="time-field-label">Preferred Delivery Time:</label>
                    <div className="time-input-wrap">
                      <input
                        type="time"
                        value={customTime}
                        onChange={(e) => setCustomTime(e.target.value)}
                        className="time-native-input"
                        required
                      />
                      <span className="time-formatted-badge">
                        {formatTime12h(customTime)} IST
                      </span>
                    </div>
                  </div>

                  {/* 1-Click Quick Time Presets */}
                  <div className="preset-times-row">
                    <span className="preset-label">Quick Presets:</span>
                    <button type="button" onClick={() => setCustomTime('08:00')} className="preset-pill">
                      8:00 AM (Morning)
                    </button>
                    <button type="button" onClick={() => setCustomTime('13:00')} className="preset-pill">
                      1:00 PM (Midday)
                    </button>
                    <button type="button" onClick={() => setCustomTime('17:30')} className="preset-pill">
                      5:30 PM (Market Close)
                    </button>
                    <button type="button" onClick={() => setCustomTime('19:00')} className="preset-pill">
                      7:00 PM (Evening Wrap)
                    </button>
                  </div>
                </div>
              ) : (
                <div className="multi-time-picker">
                  <div className="slot-time-row">
                    <span className="slot-name">🌅 Morning Brief:</span>
                    <input
                      type="time"
                      value={morningSlot}
                      onChange={(e) => setMorningSlot(e.target.value)}
                      className="time-slot-input"
                    />
                    <span className="slot-human">{formatTime12h(morningSlot)} IST</span>
                  </div>

                  <div className="slot-time-row">
                    <span className="slot-name">☀️ Midday Pulse:</span>
                    <input
                      type="time"
                      value={middaySlot}
                      onChange={(e) => setMiddaySlot(e.target.value)}
                      className="time-slot-input"
                    />
                    <span className="slot-human">{formatTime12h(middaySlot)} IST</span>
                  </div>

                  <div className="slot-time-row">
                    <span className="slot-name">🌙 Evening Wrap:</span>
                    <input
                      type="time"
                      value={eveningSlot}
                      onChange={(e) => setEveningSlot(e.target.value)}
                      className="time-slot-input"
                    />
                    <span className="slot-human">{formatTime12h(eveningSlot)} IST</span>
                  </div>
                </div>
              )}
            </div>

            {/* Domain Selection */}
            <div className="section-block">
              <label className="section-label">3. Select Focus Topics:</label>
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
              <label className="section-label">4. Your Email for Notifications:</label>
              <div className="input-wrapper">
                <Mail size={15} className="input-icon" />
                <input
                  type="email"
                  required
                  placeholder="executive@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="email-input"
                />
              </div>
            </div>

            {/* Submit Action */}
            <button type="submit" className="submit-btn">
              <span>Save & Activate Flexible Schedule</span>
              <ArrowRight size={15} />
            </button>

            <div className="privacy-note">
              <Lock size={12} />
              <span>We never spam or sell data. Change or disable your alert times anytime.</span>
            </div>
          </form>
        )}
      </div>

      <style jsx>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1rem;
        }

        .modal-card {
          width: 100%;
          max-width: 530px;
          background: #ffffff;
          border: 1px solid #a2a9b1;
          border-radius: var(--radius);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          max-height: 92vh;
          overflow-y: auto;
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.1rem 1.35rem;
          border-bottom: 1px solid #c8ccd1;
          background: #f8faf9;
        }

        .title-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .logo-badge {
          width: 38px;
          height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .modal-logo-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .modal-title {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--brand-primary);
          line-height: 1.2;
        }

        .modal-sub {
          font-size: 0.73rem;
          color: var(--text-secondary);
        }

        .close-btn {
          color: var(--text-muted);
          padding: 4px;
          display: flex;
          align-items: center;
          border: 1px solid transparent;
          border-radius: var(--radius);
          background: transparent;
        }

        .close-btn:hover {
          color: var(--text-primary);
          border-color: #c8ccd1;
          background: #ffffff;
        }

        .modal-body {
          padding: 1.25rem 1.35rem;
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
        }

        /* Witty Preview */
        .witty-preview-box {
          background: #f0f7f3;
          border: 1px solid #a8cfb8;
          border-radius: var(--radius);
          padding: 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .preview-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .preview-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--brand-primary);
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .test-notify-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.68rem;
          font-weight: 600;
          color: var(--brand-primary);
          background: #ffffff;
          border: 1px solid #a8cfb8;
          border-radius: var(--radius);
          padding: 0.2rem 0.5rem;
          transition: all 0.15s ease;
        }

        .test-notify-btn:hover {
          background: var(--brand-primary);
          color: #ffffff;
        }

        .preview-card {
          background: #ffffff;
          border: 1px solid #c8ccd1;
          border-left: 3px solid var(--brand-primary);
          border-radius: var(--radius);
          padding: 0.75rem 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
        }

        .phone-push-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .push-brand {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .mini-logo {
          font-family: var(--font-serif);
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--brand-primary);
        }

        .push-time {
          font-size: 0.65rem;
          color: var(--text-muted);
        }

        .push-category {
          font-size: 0.62rem;
          font-weight: 700;
          color: var(--brand-secondary);
          background: #f0f7f3;
          border: 1px solid #a8cfb8;
          padding: 1px 5px;
          border-radius: var(--radius);
        }

        .push-title {
          font-family: var(--font-serif);
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .push-body {
          font-size: 0.76rem;
          line-height: 1.45;
          color: var(--text-secondary);
        }

        /* Section Blocks */
        .section-block {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .section-label {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .label-icon {
          color: var(--brand-primary);
        }

        /* Frequency Toggle */
        .frequency-toggle-group {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.65rem;
        }

        .frequency-btn {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          padding: 0.65rem 0.8rem;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius);
          background: #ffffff;
          transition: all 0.15s ease;
        }

        .frequency-btn:hover {
          border-color: var(--brand-primary);
        }

        .frequency-btn.active {
          border-color: var(--brand-primary);
          background: #f0f7f3;
          box-shadow: 0 0 0 1px var(--brand-primary);
        }

        .freq-title {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 2px;
        }

        .freq-desc {
          font-size: 0.68rem;
          color: var(--text-secondary);
          line-height: 1.35;
        }

        /* Editable Time Box */
        .time-editor-box {
          background: #fdfefe;
          border: 1px solid #c8ccd1;
          border-radius: var(--radius);
          padding: 0.85rem;
        }

        .time-input-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 0.65rem;
        }

        .time-field-label {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .time-input-wrap {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .time-native-input {
          padding: 0.35rem 0.6rem;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius);
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--brand-primary);
          background: #ffffff;
          outline: none;
        }

        .time-native-input:focus {
          border-color: var(--brand-primary);
        }

        .time-formatted-badge {
          background: var(--brand-primary);
          color: #ffffff;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.35rem 0.6rem;
          border-radius: var(--radius);
        }

        .preset-times-row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          flex-wrap: wrap;
          padding-top: 0.4rem;
          border-top: 1px solid #eaecf0;
        }

        .preset-label {
          font-size: 0.68rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .preset-pill {
          font-size: 0.68rem;
          font-weight: 600;
          color: var(--brand-primary);
          background: #f0f7f3;
          border: 1px solid #a8cfb8;
          border-radius: var(--radius);
          padding: 0.2rem 0.5rem;
          transition: all 0.15s ease;
        }

        .preset-pill:hover {
          background: var(--brand-primary);
          color: #ffffff;
        }

        /* Multi Slot Picker */
        .multi-time-picker {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .slot-time-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.4rem 0.6rem;
          background: #f8faf9;
          border: 1px solid #e2e8f0;
          border-radius: var(--radius);
        }

        .slot-name {
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .time-slot-input {
          padding: 0.25rem 0.5rem;
          border: 1px solid #c8ccd1;
          border-radius: var(--radius);
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--brand-primary);
          background: #ffffff;
        }

        .slot-human {
          font-size: 0.74rem;
          font-weight: 700;
          color: var(--brand-secondary);
        }

        /* Domain Chips */
        .domains-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
        }

        .domain-toggle {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.74rem;
          font-weight: 600;
          color: var(--text-secondary);
          background: #ffffff;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius);
          padding: 0.35rem 0.65rem;
          transition: all 0.15s ease;
        }

        .domain-toggle:hover {
          border-color: var(--brand-primary);
        }

        .domain-toggle.selected {
          background: #f0f7f3;
          border-color: var(--brand-primary);
          color: var(--brand-primary);
          font-weight: 700;
        }

        /* Email Input */
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
          left: 0.75rem;
          color: var(--text-muted);
          pointer-events: none;
        }

        .email-input {
          width: 100%;
          padding: 0.55rem 0.75rem 0.55rem 2.2rem;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius);
          font-size: 0.84rem;
          color: var(--text-primary);
          background: #ffffff;
          outline: none;
        }

        .email-input:focus {
          border-color: var(--brand-primary);
          box-shadow: 0 0 0 1px var(--brand-primary);
        }

        /* Submit Button */
        .submit-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          padding: 0.65rem;
          background: var(--brand-primary);
          color: #ffffff;
          border: 1px solid #16382b;
          border-radius: var(--radius);
          font-size: 0.85rem;
          font-weight: 700;
          transition: all 0.15s ease;
          box-shadow: var(--shadow-sm);
        }

        .submit-btn:hover {
          background: var(--brand-secondary);
          border-color: var(--brand-secondary);
        }

        .privacy-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          font-size: 0.68rem;
          color: var(--text-muted);
        }

        /* Success State */
        .success-state {
          padding: 2.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.85rem;
        }

        .success-icon {
          width: 52px;
          height: 52px;
          background: #f0f7f3;
          border: 1px solid var(--brand-accent);
          color: var(--brand-primary);
          border-radius: var(--radius);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .success-title {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--brand-primary);
        }

        .success-desc {
          font-size: 0.82rem;
          color: var(--text-secondary);
          line-height: 1.5;
          max-width: 420px;
        }
      `}</style>
    </div>
  );
}

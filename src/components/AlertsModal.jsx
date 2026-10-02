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
  ArrowRight 
} from 'lucide-react';
import { DOMAINS } from '../data/mockData';

export default function AlertsModal({ isOpen, onClose }) {
  const [selectedDomains, setSelectedDomains] = useState(['tax', 'regulations']);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const toggleDomain = (id) => {
    if (selectedDomains.includes(id)) {
      setSelectedDomains(selectedDomains.filter(d => d !== id));
    } else {
      setSelectedDomains([...selectedDomains, id]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
    setTimeout(() => {
      // simulate success
    }, 500);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="title-group">
            <span className="bell-glow"><Bell size={18} /></span>
            <div>
              <h2 className="modal-title">Get Must-Know Finance Alerts</h2>
              <span className="modal-sub">Zero spam. Only critical tax, policy & regulatory shifts.</span>
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
            <h3>You are on the alert list!</h3>
            <p>
              We’ve registered <strong>{email}</strong> for high-priority updates in <strong>{selectedDomains.join(', ')}</strong>. You will only be pinged when an official authority issues a critical change.
            </p>
            <button onClick={onClose} className="submit-btn" style={{ marginTop: '1rem' }}>
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="modal-body">
            <div className="domains-section">
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

            <div className="input-group">
              <label className="section-label">Email for morning dispatch:</label>
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

            <div className="auth-divider">
              <span>OR CONNECT ACCOUNT</span>
            </div>

            {/* Google OAuth Option (Free Tier Supabase Auth Ready) */}
            <button
              type="button"
              onClick={() => alert("Google OAuth will authenticate via Supabase Auth in Week 1 Phase")}
              className="google-oauth-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            <button type="submit" className="submit-btn">
              <span>Save Alert Preferences</span>
              <ArrowRight size={15} />
            </button>

            <div className="privacy-note">
              <Lock size={12} />
              <span>We never sell data. You can unsubscribe or reconfigure anytime.</span>
            </div>
          </form>
        )}
      </div>

      <style jsx>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.75);
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
          max-width: 480px;
          background: #0d1320;
          border: 1px solid var(--border-highlight);
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding-bottom: 0.85rem;
          border-bottom: 1px solid var(--border-subtle);
        }

        .title-group {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .bell-glow {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: rgba(59, 130, 246, 0.15);
          color: #60a5fa;
          border: 1px solid rgba(59, 130, 246, 0.3);
        }

        .modal-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #ffffff;
        }

        .modal-sub {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .close-btn {
          color: var(--text-muted);
          padding: 4px;
          border-radius: 6px;
        }

        .close-btn:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.1);
        }

        .modal-body {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
        }

        .section-label {
          display: block;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 0.45rem;
        }

        .domains-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .domain-toggle {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.35rem 0.65rem;
          border-radius: 6px;
          font-size: 0.74rem;
          font-weight: 500;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-subtle);
          transition: all 0.15s ease;
        }

        .domain-toggle:hover {
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;
        }

        .domain-toggle.selected {
          background: rgba(59, 130, 246, 0.18);
          border-color: rgba(59, 130, 246, 0.5);
          color: #93c5fd;
          font-weight: 600;
        }

        .input-wrapper {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 8px;
          padding: 0.55rem 0.85rem;
        }

        .input-icon {
          color: var(--text-muted);
        }

        .email-input {
          flex: 1;
          background: transparent;
          border: none;
          color: #ffffff;
          font-size: 0.85rem;
          outline: none;
        }

        .auth-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0.25rem 0;
          position: relative;
        }

        .auth-divider span {
          background: #0d1320;
          padding: 0 0.5rem;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: var(--text-muted);
        }

        .google-oauth-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
          padding: 0.6rem;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-subtle);
          color: #ffffff;
          font-size: 0.82rem;
          font-weight: 600;
          transition: all 0.15s ease;
        }

        .google-oauth-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.2);
        }

        .submit-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          padding: 0.65rem;
          border-radius: 8px;
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          color: #ffffff;
          font-size: 0.85rem;
          font-weight: 700;
          transition: all 0.2s ease;
        }

        .submit-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 0 20px rgba(37, 99, 235, 0.5);
        }

        .privacy-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          font-size: 0.68rem;
          color: var(--text-muted);
          text-align: center;
        }

        .success-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.75rem;
          padding: 1rem 0;
        }

        .success-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.15);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .success-state h3 {
          font-size: 1.15rem;
          color: #ffffff;
          font-weight: 700;
        }

        .success-state p {
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}

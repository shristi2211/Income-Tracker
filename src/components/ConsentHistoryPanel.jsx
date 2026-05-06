import { useState, useEffect } from 'react';
import { X, Download, CheckCircle, Square, SquareCheck } from 'lucide-react';

const STORAGE_KEY = 'arcompli_consent_records';
const CONSENT_KEY = 'arcompli_consent_granted';

function loadRecords() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}
function saveRecords(records) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}
function getLatestForEmail(records, email) {
  const mine = records.filter(r => r.email === email)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  return mine[0] ?? null;
}
function formatDate(iso) {
  return new Date(iso).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
}
function exportCSV(records) {
  const header = ['Email', 'Action', 'Timestamp', 'IP', 'Source'];
  const rows = records.map(r => [r.email, r.action, new Date(r.timestamp).toLocaleString(), r.ip, r.source]);
  const csv = [header, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = `consent_history_${Date.now()}.csv`; a.click();
  URL.revokeObjectURL(url);
}

const COOKIE_TYPES = [
  { key: 'necessary', label: 'Necessary Cookies', desc: 'Required for basic site functionality', required: true },
  { key: 'analytics', label: 'Analytics Cookies', desc: 'Help us understand how you use our site', required: false },
  { key: 'marketing', label: 'Marketing Cookies', desc: 'Used for targeted advertising and promotions', required: false },
  { key: 'preference', label: 'Preference Cookies', desc: 'Remember your settings and preferences', required: false },
];

export default function ConsentHistoryPanel({ onClose }) {
  const [records, setRecords] = useState([]);
  const [cookies, setCookies] = useState({ necessary: true, analytics: false, marketing: false, preference: false });

  useEffect(() => {
    setRecords(loadRecords());
    try {
      const saved = JSON.parse(localStorage.getItem('arcompli_cookie_prefs') || 'null');
      if (saved) setCookies(saved);
    } catch { /* ignore */ }
  }, []);

  // Unique emails with active grant
  const grantedEmails = [...new Set(
    records.filter(r => r.action === 'granted').map(r => r.email)
  )].filter(email => getLatestForEmail(records, email)?.action === 'granted');

  const handleRevoke = (email) => {
    const ip = localStorage.getItem('arcompli_last_ip') || 'localhost (127.0.0.1)';
    const newRec = {
      id: `rev_${Date.now()}`,
      email,
      action: 'revoked',
      timestamp: new Date().toISOString(),
      ip,
      userAgent: navigator.userAgent,
      source: 'manual',
    };
    const updated = [...records, newRec];
    saveRecords(updated);
    const activeEmail = localStorage.getItem('arcompli_consent_email');
    if (activeEmail === email) {
      localStorage.removeItem(CONSENT_KEY);
      localStorage.removeItem('arcompli_consent_email');
    }
    setRecords(updated);
  };

  const handleResetAll = () => {
    if (!window.confirm('Reset all consents and clear history?')) return;
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(CONSENT_KEY);
    localStorage.removeItem('arcompli_consent_email');
    localStorage.removeItem('arcompli_last_ip');
    localStorage.removeItem('arcompli_cookie_prefs');
    setRecords([]);
    setCookies({ necessary: true, analytics: false, marketing: false, preference: false });
  };

  const handleSave = () => {
    localStorage.setItem('arcompli_cookie_prefs', JSON.stringify(cookies));
    onClose();
  };

  const toggleCookie = (key) => {
    if (key === 'necessary') return;
    setCookies(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center sm:justify-start p-0 sm:p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" onClick={onClose} />

      {/* Panel — Dark Theme */}
      <div className="relative z-10 bg-[#0b0e17] border border-white/10 rounded-t-2xl sm:rounded-2xl w-full sm:w-[360px] shadow-2xl shadow-black/80 flex flex-col max-h-[90vh] overflow-hidden text-slate-200">

        {/* ── Body ── */}
        <div className="overflow-y-auto flex-1 px-5 pt-5 pb-3">

          {/* Intro */}
          <p className="text-[13px] text-slate-400 leading-relaxed mb-5">
            We use cookies to provide essential site functionality, analyze usage patterns, and deliver personalized content. You can manage your preferences or learn more about our privacy practices.
          </p>

          {/* Cookie Toggles */}
          <div className="space-y-3 mb-5">
            {COOKIE_TYPES.map(({ key, label, desc, required }) => (
              <div key={key} className="flex items-start gap-3 cursor-pointer" onClick={() => toggleCookie(key)}>
                <div className="mt-0.5 shrink-0">
                  {required ? (
                    /* Necessary — always on, cyan circle check */
                    <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                      <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                        <path d="M1.5 4L4 6.5L9.5 1" stroke="#080b12" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  ) : cookies[key] ? (
                    <div className="w-5 h-5 rounded border-2 border-cyan-500 bg-cyan-500/10 flex items-center justify-center">
                      <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                        <path d="M1.5 4L4 6.5L9.5 1" stroke="#06b6d4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded border-2 border-slate-700 bg-[#080b12]" />
                  )}
                </div>
                <div>
                  <p className={`text-[13px] font-semibold leading-tight ${required ? 'text-white' : 'text-slate-300'}`}>
                    {label}
                    {required && <span className="text-red-400 ml-1">*</span>}
                  </p>
                  <p className="text-[12px] text-slate-500 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <hr className="border-white/10 mb-4" />

          {/* Email Consent Section */}
          {grantedEmails.length > 0 && (
            <div className="mb-4">
              <p className="text-[12px] font-bold text-slate-300 uppercase tracking-wider mb-3">
                Email Communication Consent Required ({grantedEmails.length})
              </p>

              {grantedEmails.map(email => {
                const latest = getLatestForEmail(records, email);
                const since = latest ? formatDate(latest.timestamp) : '—';
                // Most recent granted record
                const grantedRec = [...records]
                  .filter(r => r.email === email && r.action === 'granted')
                  .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];
                const recentActivity = [...records]
                  .filter(r => r.email === email)
                  .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];

                return (
                  <div key={email} className="mb-4">
                    {/* Email row */}
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[13px] font-semibold text-white break-all">{email}</span>
                      <button
                        onClick={() => handleRevoke(email)}
                        className="ml-2 shrink-0 text-[11px] font-semibold text-red-400 border border-red-400/30 rounded px-2 py-0.5 hover:bg-red-400/10 transition"
                      >
                        Revoke
                      </button>
                    </div>

                    {/* Status */}
                    <p className="text-[12px] text-cyan-400 font-medium flex items-center gap-1 mb-0.5">
                      <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                        <path d="M1 4.5L4 7.5L11 1" stroke="#22d3ee" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Active consent since {grantedRec ? new Date(grantedRec.timestamp).toLocaleDateString('en-IN') : '—'}
                    </p>
                    <p className="text-[11px] text-slate-500 mb-1">Purpose: Marketing and product updates</p>

                    {/* Recent Activity */}
                    <p className="text-[11px] text-slate-400 font-medium mb-1">Recent Activity:</p>
                    {recentActivity && (
                      <div className="flex justify-between text-[11px] text-slate-500 mb-2">
                        <span className="capitalize">{recentActivity.action === 'granted' ? 'Consented' : 'Revoked'}</span>
                        <span>{new Date(recentActivity.timestamp).toLocaleDateString('en-IN')}</span>
                      </div>
                    )}
                    <hr className="border-white/5 mt-2" />
                  </div>
                );
              })}
            </div>
          )}

          {/* Consent History */}
          <div className="mb-3">
            <p className="text-[12px] font-bold text-slate-300 uppercase tracking-wider mb-3">
              Consent History ({records.length} {records.length === 1 ? 'entry' : 'entries'})
            </p>

            {records.length === 0 ? (
              <p className="text-[12px] text-slate-500 italic">No history yet. History is recorded when you log in.</p>
            ) : (
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {[...records]
                  .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                  .map(rec => (
                    <div key={rec.id} className="text-[12px]">
                      <div className="flex justify-between">
                        <span className={`font-semibold ${rec.action === 'granted' ? 'text-cyan-400' : 'text-red-400'}`}>
                          {rec.action === 'granted' ? 'granted' : 'revoked'} (email)
                        </span>
                        <span className="text-slate-500">{formatDate(rec.timestamp)}</span>
                      </div>
                      <p className="text-cyan-400/80">Email: {rec.email}</p>
                    </div>
                  ))}
              </div>
            )}

            {/* Export */}
            <button
              onClick={() => exportCSV(records)}
              disabled={records.length === 0}
              className="mt-3 w-full border border-slate-700 bg-slate-800/30 rounded-lg py-2 text-[12px] font-medium text-slate-300 hover:bg-slate-800 hover:border-slate-600 transition flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Download size={13} />
              Export Full History (CSV)
            </button>
          </div>

        </div>

        {/* ── Footer Buttons ── */}
        <div className="flex items-center gap-3 px-5 py-4 border-t border-white/10 bg-[#080b12]">
          <button
            onClick={handleResetAll}
            className="flex-1 border border-slate-700 bg-slate-800/30 rounded-lg py-2 text-[13px] font-semibold text-slate-300 hover:bg-slate-800 hover:border-slate-600 transition"
          >
            Reset All
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-900 rounded-lg py-2 text-[13px] font-bold transition shadow-[0_0_15px_rgba(6,182,212,0.3)]"
          >
            Save &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
}

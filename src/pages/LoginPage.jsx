import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Wallet, Eye, EyeOff, ShieldCheck, CheckCircle2, XCircle, AlertCircle, Settings } from 'lucide-react';
import ConsentHistoryPanel from '../components/ConsentHistoryPanel';

const STORAGE_KEY = 'arcompli_consent_records';
const CONSENT_KEY = 'arcompli_consent_granted';

// ── helpers ──────────────────────────────────────────────────────────────────

function loadRecords() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveRecord(record) {
  const existing = loadRecords();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, record]));
}

/** Returns latest action for a given email, or null if not found */
function getEmailConsentStatus(email) {
  if (!email) return null;
  const records = loadRecords();
  const emailRecords = records.filter(r => r.email.toLowerCase() === email.toLowerCase());
  if (emailRecords.length === 0) return null;
  const sorted = [...emailRecords].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  return sorted[0].action; // 'granted' | 'revoked'
}

async function fetchPublicIP() {
  try {
    const res = await fetch('https://api.ipify.org?format=json', { signal: AbortSignal.timeout(2000) });
    const data = await res.json();
    return data.ip ?? 'localhost';
  } catch {
    return 'localhost (127.0.0.1)';
  }
}

// ─────────────────────────────────────────────────────────────────────────────

export default function LoginPage() {
  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');
  const [showPass, setShowPass]     = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isConsentBannerOpen, setIsConsentBannerOpen] = useState(true);
  const [hasConsent, setHasConsent] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // Live consent badge for typed email
  const [emailConsentStatus, setEmailConsentStatus] = useState(null); // null | 'granted' | 'revoked'
  const debounceRef = useRef(null);

  const { login } = useAuth();
  const navigate  = useNavigate();

  // ── live check: email consent status drives banner + login button ──
  useEffect(() => {
    clearTimeout(debounceRef.current);
    if (!email.trim()) {
      setEmailConsentStatus(null);
      // No email typed yet → show banner, disable login
      setIsConsentBannerOpen(true);
      setHasConsent(false);
      return;
    }
    debounceRef.current = setTimeout(() => {
      const status = getEmailConsentStatus(email.trim());
      setEmailConsentStatus(status);

      if (status === 'granted') {
        // This email already has consent → hide banner, enable login
        setIsConsentBannerOpen(false);
        setHasConsent(true);
      } else {
        // No consent or revoked → show banner, disable login
        setIsConsentBannerOpen(true);
        setHasConsent(false);
      }
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [email]);

  // ── internal: record consent to ARCompli API ────────────────────────────
  const recordConsentAPI = async (userEmail) => {
    try {
      const form = await fetch(
        'https://arcompli.com/api/v1/forms/cee13ce55f252b4cb6bbadf602ee0fc8'
      ).then(r => r.json());

      await fetch('https://arcompli.com/api/v1/consent', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer arc_live_9fb5638ecf5008a0b2b9af199d985a9d',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          form_token: 'cee13ce55f252b4cb6bbadf602ee0fc8',
          subject_email: userEmail,
          consents: form.purposes
            ? form.purposes.map(p => ({ purpose_id: p.id, granted: true }))
            : [],
        }),
      });
    } catch (err) {
      console.error('ARCompli API consent record failed:', err);
    }
  };

  // ── internal: store consent record in localStorage ──────────────────────
  const storeLocalRecord = async (userEmail, source = 'login') => {
    const ip = localStorage.getItem('arcompli_last_ip') || await fetchPublicIP();
    localStorage.setItem('arcompli_last_ip', ip);

    saveRecord({
      id: `grant_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      email: userEmail,
      action: 'granted',
      timestamp: new Date().toISOString(),
      ip,
      userAgent: navigator.userAgent,
      source,
    });

    // Remember which email holds the active global consent
    localStorage.setItem('arcompli_consent_email', userEmail);
    localStorage.setItem(CONSENT_KEY, 'true');
  };

  // ── accept consent banner ───────────────────────────────────────────────
  const handleAcceptConsent = () => {
    localStorage.setItem(CONSENT_KEY, 'true');
    setHasConsent(true);
    setIsConsentBannerOpen(false);
  };

  // ── login ───────────────────────────────────────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault();
    const loginEmail = email.trim() || 'srishti@demo.com';
    await Promise.all([
      recordConsentAPI(loginEmail),
      storeLocalRecord(loginEmail, 'login'),
    ]);
    login(loginEmail);
    navigate('/dashboard');
  };

  const handleDemoLogin = async () => {
    const demoEmail = 'srishti@demo.com';
    await Promise.all([
      recordConsentAPI(demoEmail),
      storeLocalRecord(demoEmail, 'demo'),
    ]);
    login(demoEmail);
    navigate('/dashboard');
  };

  // ── badge helper ────────────────────────────────────────────────────────
  const BadgeContent = () => {
    if (!emailConsentStatus) return null;

    if (emailConsentStatus === 'granted') {
      return (
        <div className="mt-2 flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-950/40 border border-emerald-700/40 text-emerald-400 text-xs animate-in fade-in slide-in-from-top-1 duration-200">
          <CheckCircle2 size={13} className="shrink-0" />
          <span>
            Consent <strong>already granted</strong> for this email — login is pre-approved.
          </span>
        </div>
      );
    }

    if (emailConsentStatus === 'revoked') {
      return (
        <div className="mt-2 flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-950/40 border border-amber-700/40 text-amber-400 text-xs animate-in fade-in slide-in-from-top-1 duration-200">
          <AlertCircle size={13} className="shrink-0" />
          <span>
            Previous consent <strong>was revoked</strong> for this email. New consent will be recorded on login.
          </span>
        </div>
      );
    }

    return null;
  };

  // ── render ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex">

      {/* ── Left Hero Section (60%) ── */}
      <div
        className="hidden lg:flex w-3/5 h-screen items-center px-24 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1a1042 30%, #3b1d6e 55%, #6d28d9 80%, #7c3aed 100%)',
        }}
      >
        {/* Decorative blurs */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-violet-500/20 rounded-full blur-3xl translate-x-20 -translate-y-20" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-pink-500/15 rounded-full blur-2xl" />
        <div className="absolute bottom-1/3 right-10 w-56 h-56 bg-cyan-500/10 rounded-full blur-3xl" />

        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Logo */}
        <div className="absolute top-8 left-8 flex items-center gap-3 z-10">
          <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/10">
            <Wallet size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold text-white">FinTrack</span>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-lg">
          <h1 className="text-6xl font-bold text-white leading-tight">
            Take Control of
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent">
              Your Finances
            </span>
          </h1>
          <p className="text-gray-300 mt-6 text-lg leading-relaxed">
            Track income, manage expenses, and grow your savings with powerful analytics and beautiful insights.
          </p>
        </div>
      </div>

      {/* ── Right Login Section (40%) ── */}
      <div className="w-full lg:w-2/5 h-screen flex flex-col justify-center items-center bg-[#0a0a0a] px-8 sm:px-12 relative">
        <div className="w-full max-w-sm">

          {/* Logo + Welcome */}
          <div className="mb-10 text-center">
            <div className="bg-purple-600 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-purple-900/30">
              <Wallet size={26} className="text-white" />
            </div>
            <h2 className="text-3xl font-semibold text-white">Welcome Back</h2>
            <p className="text-gray-500 text-sm mt-2">Please enter your details to sign in</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email + live badge */}
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-[#161616] rounded-lg p-3.5 text-white text-sm outline-none transition placeholder:text-gray-600"
                />
                {/* Inline status icon */}
                {emailConsentStatus && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {emailConsentStatus === 'granted' ? (
                      <CheckCircle2 size={16} className="text-emerald-400" />
                    ) : (
                      <AlertCircle size={16} className="text-amber-400" />
                    )}
                  </div>
                )}
              </div>
              {/* Badge */}
              <BadgeContent />
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Password</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-[#161616] rounded-lg p-3.5 pr-12 text-white text-sm outline-none transition placeholder:text-gray-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-300 transition-colors"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember me + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2.5 cursor-pointer group">
                <div
                  onClick={() => setRememberMe(!rememberMe)}
                  className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-all cursor-pointer ${
                    rememberMe
                      ? 'bg-purple-600 border-purple-600'
                      : 'border-gray-700 bg-transparent group-hover:border-gray-600'
                  }`}
                >
                  {rememberMe && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span className="text-sm text-gray-400">Remember me</span>
              </label>
              <button type="button" className="text-sm text-purple-400 hover:text-purple-300 transition-colors font-medium">
                Forgot password?
              </button>
            </div>

            {/* Sign In */}
            <button
              type="submit"
              disabled={!hasConsent}
              className={`w-full font-medium py-3.5 rounded-lg mt-2 transition shadow-lg text-sm tracking-wide ${
                hasConsent
                  ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-900/20'
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
              }`}
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-4 bg-[#0a0a0a] text-gray-600">or</span>
            </div>
          </div>

          {/* Demo Login */}
          <button
            onClick={handleDemoLogin}
            disabled={!hasConsent}
            className={`w-full border font-medium py-3.5 rounded-lg transition text-sm flex items-center justify-center gap-2 ${
              hasConsent
                ? 'border-gray-800 hover:border-gray-700 bg-[#161616] hover:bg-[#1a1a1a] text-gray-300 hover:text-white'
                : 'border-gray-800 bg-[#0a0a0a] text-gray-600 cursor-not-allowed opacity-50'
            }`}
          >
            🚀 Demo Login
          </button>

          {/* Bottom links */}
          <div className="flex items-center justify-between mt-8">
            <p className="text-sm text-gray-500">
              New User?{' '}
              <button onClick={handleDemoLogin} className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                Sign up
              </button>
            </p>
          </div>
        </div>

        {/* ── ⚙ Gear Button — bottom left corner ── */}
        <button
          onClick={() => setShowHistory(true)}
          title="Consent History & Settings"
          className="absolute bottom-6 left-6 w-10 h-10 rounded-full bg-gray-800/80 hover:bg-gray-700 border border-gray-700 hover:border-gray-500 flex items-center justify-center text-gray-400 hover:text-white transition shadow-lg group"
        >
          <Settings size={17} className="group-hover:rotate-45 transition-transform duration-300" />
        </button>
      </div>

      {/* ── ARCompli Cookie Consent Banner — bottom slide-up ── */}
      {isConsentBannerOpen && (
        <div
          className="fixed bottom-0 left-0 right-0 z-[100] animate-fade-in"
          style={{ animation: 'slideUp 0.4s ease-out forwards' }}
        >
          {/* Light shadow above */}
          <div className="h-6 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

          <div className="bg-white text-gray-800 shadow-2xl shadow-black/20 border-t border-gray-200">
            <div className="max-w-5xl mx-auto px-6 py-5">

              {/* Top row: title + language + close */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-teal-600" />
                  <h3 className="text-[15px] font-bold text-gray-800">
                    Email Communication Consent Required
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  {/* Language selector (decorative) */}
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    <span>English</span>
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  {/* Close X */}
                  <button
                    onClick={() => setIsConsentBannerOpen(false)}
                    className="p-1 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </button>
                </div>
              </div>

              {/* Description */}
              <p className="text-[13px] text-gray-500 leading-relaxed mb-4 max-w-3xl">
                We need your consent to send you information about our data management solutions and pricing.
                This helps us provide you with relevant updates and personalized recommendations for your specific needs.
              </p>

              {/* Data row + buttons */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

                {/* Data to process */}
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-1">Data to be processed with your consent:</p>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-teal-500" />
                    <span className="text-[13px] text-gray-700">
                      Email Address: <strong className="text-teal-700">{email || 'your-email@example.com'}</strong>
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-400 mt-2 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                    You can manage or withdraw this consent anytime from the privacy settings.
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => setIsConsentBannerOpen(false)}
                    className="px-5 py-2 text-[13px] font-medium text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition"
                  >
                    Decline
                  </button>
                  <button
                    onClick={handleAcceptConsent}
                    className="px-5 py-2 text-[13px] font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition shadow-sm shadow-teal-200"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Consent History Panel (Settings) ── */}
      {showHistory && (
        <ConsentHistoryPanel onClose={() => setShowHistory(false)} />
      )}
    </div>
  );
}

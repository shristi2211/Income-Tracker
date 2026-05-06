import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  Wallet, TrendingUp, TrendingDown, PieChart, Shield, Zap, Users, CreditCard,
  BarChart3, CheckCircle2, ArrowRight, Sparkles
} from 'lucide-react';

/* ── step data ── */
const steps = [
  {
    num: '01',
    title: 'Track your cash flow',
    bullets: [
      'Connect your bank accounts and all your transactions will automatically sync.',
      'Connect your crypto wallet and E-Wallet for a complete overview.',
      'Add your cash expenses manually so everything is 100% accurate.',
    ],
    color: '#10b981',
    mockup: 'cashflow',
  },
  {
    num: '02',
    title: 'Understand your financial habits',
    bullets: [
      'Analyze your finance with beautiful, easy-to-understand charts.',
      'See where your money goes and where it comes from every month.',
      'See whether you spend less than you earn in one place.',
    ],
    color: '#8b5cf6',
    mockup: 'analytics',
  },
  {
    num: '03',
    title: 'Make spending stress-free',
    bullets: [
      'Set smart budgets to help you not overspend in a chosen category.',
      'Know how much you can spend daily to stick to your budget.',
      'Save money for your future dreams — vacation, car, or education.',
    ],
    color: '#f43f5e',
    mockup: 'budget',
  },
];

const features = [
  { icon: Users, color: '#f43f5e', title: 'Shared Wallets', desc: 'Popular among couples, families and roommates who handle their finances together.' },
  { icon: CreditCard, color: '#10b981', title: 'Bank Connection', desc: 'Preferred by people paying mostly by card. Auto import all transactions.' },
  { icon: Zap, color: '#f59e0b', title: 'Custom Categories', desc: 'Customize your categories, add a picture or a location to every expense.' },
  { icon: BarChart3, color: '#8b5cf6', title: 'Multi-Currency', desc: 'Favoured by travellers and digital nomads managing money in more currencies.' },
];

/* ── Fake Mockups ── */
function StepMockup({ type }) {
  if (type === 'cashflow') {
    return (
      <div className="sp-card p-6 sm:p-8 max-w-md mx-auto w-full">
        <p className="text-xs text-slate-500 font-medium mb-1">Account Balance</p>
        <p className="text-3xl font-extrabold text-white mb-8">₹ 1,20,300</p>
        <div className="space-y-4">
          {[
            { n: 'HDFC Bank', v: '₹ 85,000', c: '#10b981' },
            { n: 'SBI', v: '₹ 22,400', c: '#8b5cf6' },
            { n: 'Cash Wallet', v: '₹ 12,900', c: '#f59e0b' }
          ].map((w, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: w.c }}>
                  {w.n[0]}
                </div>
                <span className="font-semibold text-sm text-slate-200">{w.n}</span>
              </div>
              <span className="font-bold text-sm text-white">{w.v}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (type === 'analytics') {
    return (
      <div className="sp-card p-6 sm:p-8 max-w-md mx-auto w-full">
        <p className="text-xs text-slate-500 font-medium mb-1">Total expenses</p>
        <p className="text-3xl font-extrabold text-rose-400 mb-8">-₹ 98,900</p>
        <div className="flex justify-center mb-8">
          <div className="relative w-40 h-40">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f43f5e" strokeWidth="4" strokeDasharray="30 70" strokeLinecap="round" />
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="20 80" strokeDashoffset="-30" strokeLinecap="round" />
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#8b5cf6" strokeWidth="4" strokeDasharray="15 85" strokeDashoffset="-50" strokeLinecap="round" />
            </svg>
          </div>
        </div>
        <div className="space-y-3">
          {[{ n: 'Food & Dining', v: '30%', c: '#f43f5e' }, { n: 'Transport', v: '20%', c: '#10b981' }, { n: 'Shopping', v: '15%', c: '#8b5cf6' }].map((c, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: c.c }} />
                <span className="text-slate-400 text-sm">{c.n}</span>
              </div>
              <span className="font-bold text-sm text-white">{c.v}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="sp-card p-6 sm:p-8 max-w-md mx-auto w-full">
      <p className="text-xs text-slate-500 font-medium mb-1">Monthly Budget</p>
      <p className="text-3xl font-extrabold text-white mb-8">₹ 50,000</p>
      <div className="space-y-6">
        {[
          { n: 'Groceries', s: 12000, b: 15000, c: '#10b981' },
          { n: 'Entertainment', s: 7000, b: 8000, c: '#f59e0b' },
          { n: 'Shopping', s: 16000, b: 14000, c: '#f43f5e' }
        ].map((b, i) => {
          const pct = Math.min(100, (b.s / b.b) * 100);
          return (
            <div key={i}>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold text-slate-200">{b.n}</span>
                <span className="text-slate-500">₹{b.s.toLocaleString()} / ₹{b.b.toLocaleString()}</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: b.c }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#080b12' }}>
      <Navbar />

      {/* ═ HERO ═ */}
      <section className="relative overflow-hidden pt-36 pb-16 lg:pt-40 lg:pb-20">
        {/* Ambient orbs */}
        <div className="absolute top-20 right-[10%] w-[500px] h-[500px] rounded-full bg-emerald-500/8 blur-[150px] animate-orb1 pointer-events-none" />
        <div className="absolute bottom-0 left-[5%] w-[400px] h-[400px] rounded-full bg-violet-500/8 blur-[120px] animate-orb2 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[180px] pointer-events-none" />

        <div className="relative w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-16">

          {/* Left Text */}
          <div className="w-full lg:w-[50%] z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-xs font-semibold text-emerald-400"
              style={{
                background: 'rgba(16, 185, 129, 0.08)',
                border: '1px solid rgba(16, 185, 129, 0.15)',
              }}
            >
              <Sparkles size={14} />
              Smart Money Management
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-[1.08] tracking-tight mb-8">
              The only app that gets your money into
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"> shape</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-[540px]">
              Manage money on the go. Track your income and expenses, analyze your financial habits and stick to your budgets.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/login"
                className="h-14 px-8 rounded-xl font-semibold text-[15px] text-white flex items-center gap-3 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/20 hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)' }}
              >
                Get Started Free
                <ArrowRight size={18} />
              </Link>
              <Link
                to="/pricing"
                className="h-14 px-8 rounded-xl font-semibold text-[15px] text-slate-300 flex items-center gap-3 transition-all duration-200 hover:text-white hover:bg-white/8"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                View Pricing
              </Link>
            </div>
          </div>

          {/* Right Mockup */}
          <div className="w-full lg:w-[45%] relative z-10 lg:pl-4 xl:pl-10">
            <div className="relative">
              {/* Glow behind card */}
              <div className="absolute inset-0 bg-emerald-500/10 blur-[60px] rounded-3xl" />
              <StepMockup type="cashflow" />
            </div>
          </div>
        </div>
      </section>

      {/* ═ ICONS OVERVIEW ═ */}
      <section className="py-14 lg:py-20 px-6 w-full max-w-[1200px] mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: PieChart, color: '#10b981', title: 'Have perfect control', desc: 'See all your money in one place. Have perfect control over your income and expenses.' },
            { icon: TrendingUp, color: '#f43f5e', title: 'Reach your goals', desc: 'Set budgets, track your progress and reach your financial goals faster.' },
            { icon: Shield, color: '#8b5cf6', title: 'Be secure', desc: 'Your data is beautifully protected with bank-grade security standards.' },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center p-8 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                style={{ backgroundColor: `${item.color}15`, boxShadow: `0 8px 24px ${item.color}15` }}
              >
                <item.icon size={28} style={{ color: item.color }} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═ STEPS (GIANT NUMBERS) ═ */}
      <section className="py-14 lg:py-20 overflow-hidden relative">
        <div className="w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 space-y-20 lg:space-y-24">
          {steps.map((s, i) => (
            <div key={i} className={`flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16 relative`}>
              {/* Giant background number */}
              <div className={`hidden lg:block absolute text-[280px] xl:text-[360px] font-black leading-none select-none pointer-events-none z-[-1] ${i % 2 === 1 ? 'right-[-5%]' : 'left-[-5%]'} top-1/2 -translate-y-1/2`}
                style={{ color: 'rgba(255,255,255,0.015)' }}
              >
                {s.num}
              </div>

              {/* Text */}
              <div className="w-full lg:w-[50%] relative z-10">
                <p className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: s.color }}>
                  Step {i + 1}
                </p>
                <h2 className="text-3xl xl:text-4xl font-extrabold text-white leading-tight tracking-tight mb-8">
                  {s.title}
                </h2>
                <ul className="space-y-5">
                  {s.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-4">
                      <CheckCircle2 className="shrink-0 mt-0.5" size={20} style={{ color: s.color }} />
                      <p className="text-sm text-slate-400 leading-relaxed">{b}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Mockup */}
              <div className="w-full lg:w-[50%] relative z-10">
                <div className="relative">
                  <div className="absolute inset-0 blur-[50px] rounded-3xl" style={{ backgroundColor: `${s.color}08` }} />
                  <StepMockup type={s.mockup} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═ FEATURES GRID ═ */}
      <section className="py-14 lg:py-20 px-6 w-full max-w-[1200px] mx-auto">
        <h2 className="text-3xl xl:text-4xl font-extrabold text-white text-center mb-16">
          Features our users love
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] group"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${f.color}12` }}
              >
                <f.icon size={24} style={{ color: f.color }} />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">{f.title}</h4>
              <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═ CTA ═ */}
      <section className="py-14 lg:py-20 px-6">
        <div
          className="w-full max-w-[1000px] mx-auto rounded-3xl p-12 sm:p-16 text-center relative overflow-hidden"
          style={{
            background: 'rgba(16, 185, 129, 0.06)',
            border: '1px solid rgba(16, 185, 129, 0.12)',
          }}
        >
          <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-emerald-500/10 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[250px] h-[250px] rounded-full bg-cyan-500/10 blur-[80px] pointer-events-none" />

          <h2 className="relative text-3xl xl:text-4xl font-extrabold text-white mb-4">
            Ready to take control?
          </h2>
          <p className="relative text-slate-400 mb-8 max-w-lg mx-auto">
            Join thousands of users who already manage their finances smarter with FinTrack.
          </p>
          <Link
            to="/login"
            className="relative inline-flex items-center gap-3 h-14 px-10 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/20"
            style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)' }}
          >
            Start for Free
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

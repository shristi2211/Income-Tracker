import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Check, X, Star, Shield, Zap, Users, CreditCard, BarChart3, HelpCircle } from 'lucide-react';

const plans = [
  {
    name: 'Spendee Free',
    price: '₹0',
    period: 'forever',
    desc: 'Healthy financial habits by knowing where your money goes.',
    color: '#94a3b8',
    popular: false,
    features: [
      { text: '1 Cash Wallet', included: true },
      { text: 'Manual Transactions', included: true },
      { text: 'Basic Analytics', included: true },
      { text: 'Standard Categories', included: true },
      { text: 'Bank Connection', included: false },
      { text: 'Shared Wallets', included: false },
      { text: 'Budgets', included: false },
      { text: 'Share with spouse', included: false },
    ],
  },
  {
    name: 'Spendee Plus',
    price: '₹149',
    period: '/month',
    desc: "Start saving your money and time for what's truly important.",
    color: '#8b5cf6',
    popular: false,
    features: [
      { text: 'Unlimited Wallets', included: true },
      { text: 'Manual Transactions', included: true },
      { text: 'Advanced Analytics', included: true },
      { text: 'Custom Categories', included: true },
      { text: 'Bank Connection', included: false },
      { text: 'Shared Wallets', included: true },
      { text: 'Unlimited Budgets', included: true },
      { text: 'Export CSV', included: true },
    ],
  },
  {
    name: 'Spendee Premium',
    price: '₹299',
    period: '/month',
    desc: 'Start saving your money together with your friends and family.',
    color: '#10b981',
    popular: true,
    features: [
      { text: 'Everything in Plus', included: true },
      { text: 'Auto Bank Sync', included: true },
      { text: 'Multi-Currency', included: true },
      { text: 'Custom Categories', included: true },
      { text: 'Bank Connection', included: true },
      { text: 'Shared Wallets', included: true },
      { text: 'Unlimited Budgets', included: true },
      { text: 'Export CSV', included: true },
    ],
  },
];

const reasons = [
  { icon: CreditCard, title: 'All-in-one overview', desc: 'Track all your money effortlessly in one place. No need to use different banking apps.' },
  { icon: Zap, title: 'Auto-categorization', desc: "Time is money. Our engine categorizes all your new transactions automatically." },
  { icon: BarChart3, title: 'Custom wallets', desc: 'Create customized wallets for events like holidays or a wedding and share them.' },
  { icon: Shield, title: 'Smart budgets', desc: 'Set up different budgets for different categories or different wallets.' },
  { icon: Users, title: 'Shared wallets', desc: 'A perfect solution for tracking money with multiple users. Superb overview.' },
  { icon: Star, title: '7-day free trial', desc: 'Try Premium features free for 7 days. Exclusive access to the top features.' },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#080b12' }}>
      <Navbar />

      {/* ═ HERO ═ */}
      <section className="relative pt-32 pb-8 px-6 md:px-10 lg:px-16 overflow-hidden">
        <div className="absolute top-20 left-[20%] w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[150px] pointer-events-none" />
        <div className="absolute top-40 right-[10%] w-[300px] h-[300px] rounded-full bg-violet-500/5 blur-[120px] pointer-events-none" />
        <div className="w-full max-w-[1000px] mx-auto text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-white mb-4 leading-tight tracking-tight">
            Get access to all money saving features
          </h1>
          <p className="text-lg text-slate-400">All plans come with a 7-day free trial!</p>
        </div>
      </section>

      {/* ═ PRICING CARDS ═ */}
      <section className="pb-16 px-6 w-full max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 xl:gap-6 items-start pt-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="rounded-2xl p-8 xl:p-10 relative transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: plan.popular ? 'rgba(16,185,129,0.06)' : 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(20px)',
                border: plan.popular ? '1px solid rgba(16,185,129,0.2)' : '1px solid rgba(255,255,255,0.06)',
                boxShadow: plan.popular ? '0 8px 40px rgba(16,185,129,0.1)' : '0 4px 24px rgba(0,0,0,0.2)',
              }}
            >
              {plan.popular && (
                <div
                  className="absolute -top-[14px] left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-white text-xs font-bold uppercase tracking-widest whitespace-nowrap"
                  style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)' }}
                >
                  Most Popular
                </div>
              )}

              <div className="text-center mb-10">
                <h3 className="text-xl font-bold text-white mb-3">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-2 mb-4">
                  <span className="text-5xl xl:text-6xl font-extrabold leading-none" style={{ color: plan.color }}>{plan.price}</span>
                  <span className="text-base text-slate-500">{plan.period}</span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed max-w-[260px] mx-auto">
                  {plan.desc}
                </p>
              </div>

              <div className="space-y-4 mb-10 border-t border-white/5 pt-8">
                {plan.features.map((f, j) => (
                  <div key={j} className="flex items-center gap-4">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: f.included ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.04)' }}
                    >
                      {f.included ? (
                        <Check size={12} className="text-emerald-400" strokeWidth={3} />
                      ) : (
                        <X size={12} className="text-slate-600" strokeWidth={3} />
                      )}
                    </div>
                    <span className={`text-sm ${f.included ? 'text-slate-200 font-medium' : 'text-slate-500'}`}>
                      {f.text}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                to="/login"
                className="flex items-center justify-center w-full py-4 rounded-xl text-sm font-bold transition-all duration-200"
                style={
                  plan.popular
                    ? { background: 'linear-gradient(135deg, #10b981, #06b6d4)', color: 'white', boxShadow: '0 8px 24px rgba(16,185,129,0.2)' }
                    : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#e2e8f0' }
                }
              >
                Start Free Trial
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center items-center gap-3 text-sm text-slate-500">
          <HelpCircle size={18} />
          Prices might differ based on the country.
        </div>
      </section>

      {/* ═ 6 REASONS ═ */}
      <section className="py-14 lg:py-20 px-6 w-full max-w-[1200px] mx-auto border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-3xl xl:text-4xl font-extrabold text-white">
            6 reasons to go Premium
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              >
                <r.icon size={24} className="text-slate-300" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">{r.title}</h4>
              <p className="text-sm text-slate-400 leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

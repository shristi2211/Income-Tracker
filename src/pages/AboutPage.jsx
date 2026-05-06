import { Target, MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const team = [
  { name: 'Srishti', role: 'Founder & CEO', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Srishti&backgroundColor=14D081' },
  { name: 'Arjun', role: 'Lead Developer', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun&backgroundColor=7B61FF' },
  { name: 'Priya', role: 'Head of Design', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya&backgroundColor=FF6B6B' },
  { name: 'Neha', role: 'Marketing Lead', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Neha&backgroundColor=FFB547' },
  { name: 'Rahul', role: 'Backend Engineer', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul&backgroundColor=4318FF' },
  { name: 'Aditi', role: 'Customer Success', img: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aditi&backgroundColor=14D081' },
];

const glassCard = { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' };

export default function AboutPage() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#080b12' }}>
      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-12 px-6 md:px-10 lg:px-16 border-b border-white/5 overflow-hidden">
        <div className="absolute top-10 left-[20%] w-[500px] h-[500px] rounded-full bg-emerald-500/5 blur-[150px] pointer-events-none" />
        <div className="w-full max-w-[1000px] mx-auto text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-white mb-8 leading-tight tracking-tight">
            FinTrack helps thousands worldwide get their money into shape.
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed max-w-3xl mx-auto">
            We come to work every day to enable people make smart decisions about their money.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="py-14 lg:py-20 px-6 w-full max-w-[1200px] mx-auto border-b border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 xl:gap-16 items-center">
          <div>
            <h2 className="text-3xl xl:text-4xl font-extrabold text-white mb-6 leading-tight">
              We want to make your financial life stress-free.
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              FinTrack helps you get your finances into shape so you don't stress about every expense. Knowing what you spend on makes it easier to change.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Having a complete picture in one place makes finances easier to manage. Our mission is to help you overcome financial fears with financial wisdom.
            </p>
          </div>
          <div className="rounded-3xl p-8 xl:p-12" style={{ ...glassCard, background: 'rgba(16,185,129,0.04)' }}>
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center mb-6">
              <Target size={28} className="text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Our Vision</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              What started as a simple tracker has grown into a personal finance app serving users from almost every country.
            </p>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-14 lg:py-20 px-6 w-full max-w-[1200px] mx-auto text-center">
        <h2 className="text-3xl xl:text-4xl font-extrabold text-white mb-10">Meet the team</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 mb-10">
          {team.map((m, i) => (
            <div key={i} className="flex flex-col items-center group">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-4 transition-transform group-hover:-translate-y-2" style={{ border: '3px solid rgba(255,255,255,0.08)' }}>
                <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
              </div>
              <h4 className="text-base font-bold text-white">{m.name}</h4>
              <p className="text-xs text-slate-500 mt-1">{m.role}</p>
            </div>
          ))}
        </div>

        {/* HIRING */}
        <div className="w-full max-w-[900px] mx-auto rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-left" style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.12)' }}>
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Wanna work with us?</h3>
            <p className="text-slate-400 text-sm">Join our remote-first team and build the future of finance.</p>
          </div>
          <a href="#" className="shrink-0 px-8 py-3.5 rounded-xl text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-emerald-500/20" style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)' }}>
            See open positions
          </a>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-14 lg:py-20 px-6 w-full max-w-[1200px] mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-[1000px] mx-auto">
          <div>
            <h2 className="text-3xl font-extrabold text-white mb-4">Get in touch</h2>
            <p className="text-slate-400 text-sm mb-8">Use these emails to reach us:</p>
            <div className="space-y-6">
              {[
                { label: 'General Support', email: 'hello@fintrack.com' },
                { label: 'Media & Press', email: 'media@fintrack.com' },
                { label: 'Partnerships', email: 'partners@fintrack.com' },
              ].map((c, i) => (
                <div key={i}>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">{c.label}</p>
                  <a href={`mailto:${c.email}`} className="text-lg font-bold text-emerald-400 hover:underline">{c.email}</a>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl p-8" style={glassCard}>
            <div className="flex items-start gap-4 mb-8">
              <MapPin className="text-emerald-400 mt-1 shrink-0" size={24} />
              <div>
                <h4 className="text-lg font-bold text-white mb-3">Headquarters</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  FinTrack a.s.<br />Tech Park, Building C<br />100 00, Prague<br />Czech Republic
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-600">Company ID 05912890, VAT ID CZ05912890</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

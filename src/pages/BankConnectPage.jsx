import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Shield, Lock, Eye, Trash2, CreditCard, Key } from 'lucide-react';

const securityPoints = [
  { icon: Lock, title: 'Encrypted Communication', desc: "All communication is encrypted through secure channels." },
  { icon: Key, title: 'Secure Storage', desc: 'Data stored encrypted on Google Cloud Platform.' },
  { icon: Shield, title: 'Biometric Authentication', desc: 'Add security with passcode, fingerprint or FaceID.' },
  { icon: Trash2, title: 'Data Deletion', desc: 'Delete your account anytime. All data permanently removed.' },
  { icon: Eye, title: 'Read-only Access', desc: 'We work in read-only mode. Cannot initiate payments.' },
  { icon: CreditCard, title: 'Minimal Data Storage', desc: "Only minimum required data is stored." },
];

const bankLogos = [
  { name: 'Chase', initials: 'C', color: '#1e293b' },
  { name: 'Bank of America', initials: 'BA', color: '#e11d48' },
  { name: 'Wells Fargo', initials: 'WF', color: '#dc2626' },
  { name: 'Citibank', initials: 'C', color: '#2563eb' },
  { name: 'Capital One', initials: 'CO', color: '#1e293b' },
  { name: 'US Bank', initials: 'UB', color: '#1e3a8a' },
  { name: 'PNC Bank', initials: 'PNC', color: '#f97316' },
  { name: 'TD Bank', initials: 'TD', color: '#16a34a' },
  { name: 'Revolut', initials: 'R', color: '#0ea5e9' },
  { name: 'Monzo', initials: 'M', color: '#f43f5e' },
  { name: 'N26', initials: 'N', color: '#14b8a6' },
  { name: 'Starling', initials: 'S', color: '#9333ea' },
];

const glassCard = { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' };

export default function BankConnectPage() {
  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#080b12' }}>
      <Navbar />

      <section className="relative pt-32 pb-12 px-6 md:px-10 lg:px-16 overflow-hidden">
        <div className="absolute top-20 right-[15%] w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-[150px] pointer-events-none" />
        <div className="w-full max-w-[1000px] mx-auto text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
            Perfect control over all your bank accounts
          </h1>
          <p className="text-lg text-slate-400 mb-12 max-w-3xl mx-auto">
            Connect securely all your bank accounts, E-Wallets or crypto wallets.
          </p>
          <div className="flex justify-center flex-wrap gap-3">
            {bankLogos.slice(0, 6).map((b, i) => (
              <div key={i} className="w-16 h-16 xl:w-20 xl:h-20 rounded-2xl flex items-center justify-center font-bold text-white text-lg shadow-xl transform rotate-3 hover:rotate-0 hover:scale-110 transition-transform" style={{ backgroundColor: b.color, zIndex: 10 - i, marginLeft: i > 0 ? '-20px' : '0', border: '2px solid rgba(255,255,255,0.1)' }}>
                {b.initials}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20 px-6 w-full max-w-[1200px] mx-auto border-t border-white/5">
        <h2 className="text-3xl xl:text-4xl font-extrabold text-white text-center mb-16">Supported banks</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {bankLogos.map((bank, i) => (
            <div key={i} className="p-6 rounded-2xl flex flex-col items-center gap-4 hover:scale-[1.03] transition-all cursor-pointer" style={glassCard}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold" style={{ backgroundColor: bank.color }}>{bank.initials}</div>
              <span className="font-semibold text-white text-sm">{bank.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="py-14 lg:py-20 px-6 w-full max-w-[1200px] mx-auto border-t border-white/5">
        <h2 className="text-3xl xl:text-4xl font-extrabold text-white text-center mb-16">How we approach security</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityPoints.map((s, i) => (
            <div key={i} className="p-6 rounded-2xl hover:scale-[1.02] transition-all" style={glassCard}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: 'rgba(16,185,129,0.08)' }}>
                <s.icon size={24} className="text-emerald-400" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">{s.title}</h4>
              <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

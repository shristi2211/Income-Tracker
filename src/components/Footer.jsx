import { Link } from 'react-router-dom';
import { Wallet, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative pt-24 pb-12 mt-16 border-t border-white/5">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">

        {/* Newsletter Box */}
        <div
          className="rounded-3xl p-8 sm:p-12 mb-16 text-center max-w-2xl mx-auto"
          style={{
            background: 'rgba(16, 185, 129, 0.06)',
            border: '1px solid rgba(16, 185, 129, 0.12)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <h2 className="text-2xl font-bold text-white mb-2">
            Get monthly money tips!
          </h2>
          <p className="text-sm text-slate-400 mb-6">Join 50,000+ users receiving smart finance insights</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 outline-none text-sm text-white placeholder:text-slate-500 focus:border-emerald-500/40 transition-colors"
            />
            <button
              className="w-full sm:w-auto px-8 py-3 text-sm font-semibold text-white rounded-xl transition-all shrink-0 hover:shadow-lg hover:shadow-emerald-500/20"
              style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)' }}
            >
              Subscribe
            </button>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                <Wallet size={14} className="text-white" />
              </div>
              <span className="text-base font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                FinTrack
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-[240px]">
              The smart money manager that helps you take control of your finances easily.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-300 mb-4 uppercase tracking-wider">Product</h4>
            <ul className="space-y-3">
              <li><Link to="/pricing" className="text-slate-500 hover:text-emerald-400 text-sm transition-colors">Pricing</Link></li>
              <li><Link to="/bank-connect" className="text-slate-500 hover:text-emerald-400 text-sm transition-colors">Bank Connect</Link></li>
              <li><a href="#" className="text-slate-500 hover:text-emerald-400 text-sm transition-colors">iOS App</a></li>
              <li><a href="#" className="text-slate-500 hover:text-emerald-400 text-sm transition-colors">Android App</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-300 mb-4 uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-slate-500 hover:text-emerald-400 text-sm transition-colors">About Us</Link></li>
              <li><a href="#" className="text-slate-500 hover:text-emerald-400 text-sm transition-colors">Careers</a></li>
              <li><a href="#" className="text-slate-500 hover:text-emerald-400 text-sm transition-colors">Press</a></li>
              <li><a href="#" className="text-slate-500 hover:text-emerald-400 text-sm transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-300 mb-4 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-500 hover:text-emerald-400 text-sm transition-colors">Terms of Use</a></li>
              <li><a href="#" className="text-slate-500 hover:text-emerald-400 text-sm transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-500 hover:text-emerald-400 text-sm transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs">
            © 2026 FinTrack. All rights reserved.
          </p>
          <div className="flex gap-3">
            {[Facebook, Twitter, Instagram].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-emerald-400 transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, Wallet } from 'lucide-react';

const navLinks = [
  { to: '/pricing', label: 'Pricing' },
  { to: '/bank-connect', label: 'Bank Connect' },
  { to: '/about', label: 'About us' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(8, 11, 18, 0.65)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="w-full max-w-[1400px] mx-auto flex items-center justify-between px-6 md:px-10 lg:px-16 h-[72px]">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Wallet size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            FinTrack
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-[15px] font-medium transition-colors duration-200 ${
                location.pathname === link.to
                  ? 'text-emerald-400'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="hidden md:flex items-center gap-5">
          <Link
            to="/login"
            className="text-[15px] font-semibold text-slate-300 hover:text-emerald-400 transition-colors"
          >
            Login
          </Link>
          <Link
            to="/login"
            className="px-6 py-2.5 rounded-xl text-[14px] font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20"
            style={{
              background: 'linear-gradient(135deg, #10b981, #06b6d4)',
            }}
          >
            Get Started
          </Link>
        </div>

        {/* Mobile */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-slate-300">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          className="md:hidden absolute w-full left-0 px-4 pb-4"
          style={{
            background: 'rgba(8, 11, 18, 0.9)',
            backdropFilter: 'blur(24px)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div className="space-y-1 py-3">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="block text-[16px] font-medium py-3 px-4 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="pt-3 mt-2 border-t border-white/5 flex flex-col gap-3">
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="block text-center text-[16px] font-semibold py-3 text-white rounded-xl border border-white/10 hover:bg-white/5 transition-all"
            >
              Login
            </Link>
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="block text-center text-[16px] font-semibold py-3 text-white rounded-xl transition-all"
              style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)' }}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

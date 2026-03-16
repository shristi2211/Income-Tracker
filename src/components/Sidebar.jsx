import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  TrendingUp,
  TrendingDown,
  Settings,
  X,
  Wallet,
  Search
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
  { to: '/inflow', icon: TrendingUp, label: 'Inflow' },
  { to: '/outflow', icon: TrendingDown, label: 'Outflow' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar({ isOpen, onClose }) {
  const { user } = useAuth();
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-[280px] flex-shrink-0 flex-col h-screen sticky top-0 bg-[#0b0f14] border-r border-slate-800/70 z-40">

        {/* Logo */}
        <div className="flex items-center px-8 h-24 border-b border-slate-800/60">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
              <Wallet size={20} className="text-white" />
            </div>

            <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              FinTrack
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="px-8 mt-10">
          <div className="flex items-center gap-3 bg-slate-800/60 border border-slate-700 rounded-lg px-5 py-4">
            <Search size={18} className="text-slate-400" />
            <input
              placeholder="Search"
              className="bg-transparent outline-none text-[20px] text-slate-300 placeholder:text-slate-500 w-full"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col mt-12">

          <div className="px-7 space-y-20">

            {navItems.map(({ to, icon: Icon, label }) => (
              <div key={to} className="border-b border-dashed border-slate-800 pb-8">

                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-5 px-6 py-4 rounded-xl text-[15px] font-medium transition ${
                      isActive
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`
                  }
                >
                  <Icon size={20} />
                  {label}
                </NavLink>

              </div>
            ))}

          </div>

          <div className="flex-1"></div>

        </nav>

        {/* Footer */}
        <div className="p-8 border-t border-slate-800/70">
          <div className="flex items-center gap-4 px-5 py-4 rounded-xl bg-slate-800/40">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400"></div>

            <div className="flex flex-col">
              <span className="text-[20px] text-white font-medium truncate max-w-[120px]">{user?.name || 'User'}</span>
              <span className="text-slate-400 truncate max-w-[120px]">{user?.email || 'user@email.com'}</span>
            </div>
          </div>
        </div>

      </aside>

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${
          isOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={onClose}
        />

        {/* Drawer */}
        <aside
          className={`absolute inset-y-6 left-8 w-64 bg-gradient-to-b from-[#0d1117] to-[#0b0f14] border border-slate-800/70 rounded-2xl flex flex-col transition-transform duration-300 shadow-xl ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >

          {/* Logo */}
          <div className="flex items-center justify-between px-8 h-24 border-b border-slate-800/60">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
                <Wallet size={20} className="text-white" />
              </div>

              <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                FinTrack
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:bg-slate-800"
            >
              <X size={18} />
            </button>
          </div>

          {/* Search */}
          <div className="px-8 mt-10">
            <div className="flex items-center gap-3 bg-slate-800/60 border border-slate-700 rounded-lg px-5 py-4">
              <Search size={18} className="text-slate-400" />
              <input
                placeholder="Search"
                className="bg-transparent outline-none text-sm text-slate-300 placeholder:text-slate-500 w-full"
              />
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 mt-12 px-7 space-y-20">

            {navItems.map(({ to, icon: Icon, label }) => (
              <div key={to} className="border-b border-dashed border-slate-800 pb-8">

                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `relative flex items-center gap-5 px-6 py-4 rounded-xl text-[15px] font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-emerald-500/15 text-emerald-400'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Premium Active Indicator */}
                      {isActive && (
                        <span className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-gradient-to-b from-emerald-400 to-cyan-400"></span>
                      )}

                      <Icon size={20} />

                      {label}
                    </>
                  )}
                </NavLink>

              </div>
            ))}

          </nav>

          {/* User */}
          <div className="p-8 border-t border-slate-800/70">
            <div className="flex items-center gap-4 px-5 py-4 rounded-xl bg-slate-800/40">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400"></div>

              <div className="flex flex-col">
                <span className="text-[20px] text-white font-medium truncate max-w-[120px]">{user?.name || 'User'}</span>
                <span className="text-slate-400 truncate max-w-[120px]">{user?.email || 'user@email.com'}</span>
              </div>
            </div>
          </div>

        </aside>
      </div>
    </>
  );
}
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
  { to: '/app/dashboard', icon: LayoutDashboard, label: 'Overview' },
  { to: '/app/inflow', icon: TrendingUp, label: 'Inflow' },
  { to: '/app/outflow', icon: TrendingDown, label: 'Outflow' },
  { to: '/app/settings', icon: Settings, label: 'Settings' },
];

function SidebarContent({ user, onClose }) {
  return (
    <>
      {/* Logo */}
      <div className="flex items-center justify-between px-6 h-[72px] border-b border-white/5 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Wallet size={18} className="text-white" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            FinTrack
          </span>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:bg-white/5 lg:hidden">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Search */}
      <div className="px-5 mt-6">
        <div className="flex items-center gap-3 rounded-xl px-4 py-3"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <Search size={16} className="text-slate-500" />
          <input
            placeholder="Search"
            className="bg-transparent outline-none text-sm text-slate-300 placeholder:text-slate-600 w-full"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col mt-6 px-4">
        <div className="space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `relative flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-emerald-400'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`
              }
              style={({ isActive }) =>
                isActive
                  ? {
                      background: 'rgba(16, 185, 129, 0.08)',
                      border: '1px solid rgba(16, 185, 129, 0.12)',
                    }
                  : {}
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full bg-gradient-to-b from-emerald-400 to-cyan-400" />
                  )}
                  <Icon size={18} />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </div>
        <div className="flex-1" />
      </nav>

      {/* User Footer */}
      <div className="p-5 border-t border-white/5 shrink-0">
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center text-white text-xs font-bold">
            {user?.avatar || 'U'}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm text-white font-medium truncate">{user?.name || 'User'}</span>
            <span className="text-xs text-slate-500 truncate">{user?.email || 'user@email.com'}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Sidebar({ isOpen, onClose }) {
  const { user } = useAuth();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="hidden lg:flex w-[260px] flex-shrink-0 flex-col h-screen sticky top-0 z-40"
        style={{
          background: 'rgba(8, 11, 18, 0.8)',
          backdropFilter: 'blur(24px)',
          borderRight: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <SidebarContent user={user} />
      </aside>

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${isOpen ? 'visible' : 'invisible'}`}>
        {/* Backdrop */}
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
          onClick={onClose}
        />

        {/* Drawer */}
        <aside
          className={`absolute inset-y-4 left-4 w-[260px] rounded-2xl flex flex-col transition-transform duration-300 ${
            isOpen ? 'translate-x-0' : '-translate-x-[calc(100%+16px)]'
          }`}
          style={{
            background: 'rgba(12, 17, 32, 0.9)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }}
        >
          <SidebarContent user={user} onClose={onClose} />
        </aside>
      </div>
    </>
  );
}
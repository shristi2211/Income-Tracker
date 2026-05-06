import { Menu, Plus, Bell, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function TopBar({ onMenuClick, onQuickAdd }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header
      className="h-[64px] flex items-center justify-between px-6 z-30 flex-shrink-0"
      style={{
        background: 'rgba(8, 11, 18, 0.65)',
        backdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="text-lg font-bold text-white tracking-tight">Welcome back, {user?.name || 'User'}</h1>
          <p className="text-xs text-slate-500 mt-0.5">Track your income and expenses at a glance</p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={onQuickAdd}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-xs font-semibold transition-all shadow-lg shadow-emerald-900/20 hover:shadow-emerald-500/20 hover:scale-[1.02]"
          style={{ background: 'linear-gradient(135deg, #10b981, #06b6d4)' }}
        >
          <Plus size={14} />
          <span className="hidden sm:inline">Quick Add</span>
        </button>

        <button
          className="relative p-2 rounded-lg text-slate-400 hover:text-white transition-colors"
          style={{ background: 'rgba(255,255,255,0.03)' }}
        >
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full" />
        </button>

        <div className="hidden md:flex items-center gap-2.5 ml-1 pl-3 border-l border-white/5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white text-[10px] font-bold">
            {user?.avatar || 'U'}
          </div>
          <button
            onClick={handleLogout}
            className="p-2 rounded-lg text-slate-500 hover:bg-white/5 hover:text-rose-400 transition-colors"
            title="Logout"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </header>
  );
}

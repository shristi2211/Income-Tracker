import { User, Moon, Globe, Shield, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SettingsPage() {
  const { user } = useAuth();

  const settingSections = [
    {
      icon: Moon,
      title: 'Appearance',
      description: 'Manage theme and display preferences',
      items: [
        { label: 'Dark Mode', value: 'Enabled', type: 'toggle', enabled: true },
        { label: 'Compact View', value: 'Disabled', type: 'toggle', enabled: false },
      ],
    },
    {
      icon: Globe,
      title: 'Regional',
      description: 'Currency and locale settings',
      items: [
        { label: 'Currency', value: 'INR (₹)', type: 'select' },
        { label: 'Date Format', value: 'DD/MM/YYYY', type: 'select' },
        { label: 'Language', value: 'English', type: 'select' },
      ],
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Configure alerts and reminders',
      items: [
        { label: 'Budget Alerts', value: 'Enabled', type: 'toggle', enabled: true },
        { label: 'Weekly Summary', value: 'Enabled', type: 'toggle', enabled: true },
        { label: 'Payment Reminders', value: 'Disabled', type: 'toggle', enabled: false },
      ],
    },
    {
      icon: Shield,
      title: 'Security',
      description: 'Privacy and security settings',
      items: [
        { label: 'Two-Factor Auth', value: 'Disabled', type: 'toggle', enabled: false },
        { label: 'Session Timeout', value: '30 minutes', type: 'select' },
      ],
    },
  ];

  const glassCard = {
    background: 'rgba(255,255,255,0.03)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.06)',
    boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
  };

  return (
    <div className="space-y-5 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white">Settings</h1>
        <p className="text-base text-slate-500 mt-2">Manage your account and preferences</p>
      </div>

      {/* Profile Card */}
      <div className="rounded-[24px] p-6 animate-fade-in transition-all hover:shadow-[0_8px_32px_rgba(0,0,0,0.2)]" style={glassCard}>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white text-lg font-bold shadow-xl shadow-violet-500/20">
            {user?.avatar || 'U'}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">{user?.name || 'User'}</h3>
            <p className="text-sm text-slate-500">{user?.email || 'user@demo.com'}</p>
            <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Pro Account
            </p>
          </div>
          <button
            className="px-4 py-2 rounded-xl text-sm text-slate-400 hover:text-white transition-colors"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Settings Sections */}
      {settingSections.map((section, idx) => {
        const Icon = section.icon;
        return (
          <div
            key={section.title}
            className="rounded-[24px] p-6 animate-fade-in transition-all hover:shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
            style={{ ...glassCard, animationDelay: `${(idx + 1) * 100}ms` }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="p-2 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.04)' }}
              >
                <Icon size={18} className="text-slate-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">{section.title}</h3>
                <p className="text-xs text-slate-500">{section.description}</p>
              </div>
            </div>
            <div className="divide-y divide-white/[0.04]">
              {section.items.map(item => (
                <div key={item.label} className="flex items-center justify-between py-3">
                  <span className="text-sm text-slate-400">{item.label}</span>
                  {item.type === 'toggle' ? (
                    <div
                      className="w-10 h-5.5 rounded-full relative cursor-pointer transition-colors"
                      style={{
                        backgroundColor: item.enabled ? '#10b981' : 'rgba(255,255,255,0.08)',
                      }}
                    >
                      <div
                        className={`absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white shadow transition-transform ${
                          item.enabled ? 'translate-x-5' : 'translate-x-0.5'
                        }`}
                      />
                    </div>
                  ) : (
                    <span
                      className="text-xs text-slate-500 px-3 py-1.5 rounded-lg"
                      style={{ background: 'rgba(255,255,255,0.04)' }}
                    >
                      {item.value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

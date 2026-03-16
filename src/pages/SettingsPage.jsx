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

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your account and preferences</p>
      </div>

      {/* Profile Card */}
      <div className="glass-light rounded-2xl p-6 animate-fade-in">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold shadow-xl shadow-violet-500/20">
            {user?.avatar || 'U'}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">{user?.name || 'User'}</h3>
            <p className="text-sm text-slate-500">{user?.email || 'user@demo.com'}</p>
            <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Pro Account
            </p>
          </div>
          <button className="px-4 py-2 rounded-xl border border-slate-700 text-sm text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
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
            className="glass-light rounded-2xl p-6 animate-fade-in"
            style={{ animationDelay: `${(idx + 1) * 100}ms` }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-xl bg-slate-800">
                <Icon size={18} className="text-slate-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">{section.title}</h3>
                <p className="text-xs text-slate-500">{section.description}</p>
              </div>
            </div>
            <div className="divide-y divide-slate-800/50">
              {section.items.map(item => (
                <div key={item.label} className="flex items-center justify-between py-3">
                  <span className="text-sm text-slate-400">{item.label}</span>
                  {item.type === 'toggle' ? (
                    <div
                      className={`w-10 h-5.5 rounded-full relative cursor-pointer transition-colors ${
                        item.enabled ? 'bg-emerald-500' : 'bg-slate-700'
                      }`}
                    >
                      <div
                        className={`absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white shadow transition-transform ${
                          item.enabled ? 'translate-x-5' : 'translate-x-0.5'
                        }`}
                      />
                    </div>
                  ) : (
                    <span className="text-xs text-slate-500 px-3 py-1.5 bg-slate-800/80 rounded-lg">
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

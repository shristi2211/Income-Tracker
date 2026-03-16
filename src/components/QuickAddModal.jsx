import { useState } from 'react';
import { X, TrendingUp, TrendingDown } from 'lucide-react';

const inflowCategories = ['Salary', 'Freelance', 'Dividend', 'Investment', 'Rental', 'Refund', 'Gift', 'Bonus'];
const outflowCategories = ['Rent', 'Food', 'SaaS', 'Transport', 'Entertainment', 'Utilities', 'Healthcare', 'Shopping', 'Education', 'Insurance'];

export default function QuickAddModal({ isOpen, onClose }) {
  const [type, setType] = useState('inflow');
  const [form, setForm] = useState({ name: '', category: '', amount: '', date: new Date().toISOString().split('T')[0] });

  if (!isOpen) return null;

  const categories = type === 'inflow' ? inflowCategories : outflowCategories;

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would save to state/backend
    alert(`${type === 'inflow' ? '✅ Inflow' : '🔴 Outflow'} added: ${form.name || form.category} — ₹${form.amount}`);
    setForm({ name: '', category: '', amount: '', date: new Date().toISOString().split('T')[0] });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md glass rounded-2xl p-6 animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Add Transaction</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Type Toggle */}
        <div className="flex gap-2 mb-6 p-1 bg-slate-800/80 rounded-xl">
          <button
            onClick={() => setType('inflow')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
              type === 'inflow'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <TrendingUp size={16} />
            Inflow
          </button>
          <button
            onClick={() => setType('outflow')}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
              type === 'outflow'
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <TrendingDown size={16} />
            Outflow
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              {type === 'inflow' ? 'Source' : 'Expense Name'}
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder={type === 'inflow' ? 'e.g., Freelance Project' : 'e.g., Netflix Subscription'}
              className="w-full px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-colors"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-colors appearance-none"
                required
              >
                <option value="">Select</option>
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Date</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Amount (₹)</label>
            <input
              type="number"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              placeholder="0"
              min="1"
              className="w-full px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] shadow-lg ${
              type === 'inflow'
                ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 shadow-emerald-500/25 hover:shadow-emerald-500/40'
                : 'bg-gradient-to-r from-rose-500 to-pink-500 shadow-rose-500/25 hover:shadow-rose-500/40'
            }`}
          >
            Add {type === 'inflow' ? 'Inflow' : 'Outflow'}
          </button>
        </form>
      </div>
    </div>
  );
}

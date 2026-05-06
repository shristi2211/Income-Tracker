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

  const inputStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-md rounded-2xl p-6 animate-scale-in"
        style={{
          background: 'rgba(12, 17, 32, 0.85)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Add Transaction</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Type Toggle */}
        <div
          className="flex gap-2 mb-6 p-1 rounded-xl"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <button
            onClick={() => setType('inflow')}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all"
            style={
              type === 'inflow'
                ? { background: 'rgba(16,185,129,0.12)', color: '#34d399', border: '1px solid rgba(16,185,129,0.2)' }
                : { color: '#94a3b8' }
            }
          >
            <TrendingUp size={16} />
            Inflow
          </button>
          <button
            onClick={() => setType('outflow')}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all"
            style={
              type === 'outflow'
                ? { background: 'rgba(244,63,94,0.12)', color: '#fb7185', border: '1px solid rgba(244,63,94,0.2)' }
                : { color: '#94a3b8' }
            }
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
              className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none transition-colors"
              style={inputStyle}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl text-sm text-white focus:outline-none transition-colors appearance-none"
                style={inputStyle}
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
                className="w-full px-4 py-2.5 rounded-xl text-sm text-white focus:outline-none transition-colors"
                style={inputStyle}
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
              className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none transition-colors"
              style={inputStyle}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] shadow-lg"
            style={{
              background: type === 'inflow'
                ? 'linear-gradient(135deg, #10b981, #06b6d4)'
                : 'linear-gradient(135deg, #f43f5e, #ec4899)',
              boxShadow: type === 'inflow'
                ? '0 8px 24px rgba(16,185,129,0.2)'
                : '0 8px 24px rgba(244,63,94,0.2)',
            }}
          >
            Add {type === 'inflow' ? 'Inflow' : 'Outflow'}
          </button>
        </form>
      </div>
    </div>
  );
}

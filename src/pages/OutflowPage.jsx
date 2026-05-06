import { TrendingDown } from 'lucide-react';
import DataTable from '../components/DataTable';
import { outflowData, totalOutflow, formatCurrency } from '../data/mockData';

const columns = [
  { key: 'name', label: 'Expense' },
  { key: 'date', label: 'Date' },
  { key: 'category', label: 'Category' },
  { key: 'amount', label: 'Amount' },
];

export default function OutflowPage() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <div
              className="p-2 rounded-xl"
              style={{ backgroundColor: 'rgba(244,63,94,0.1)' }}
            >
              <TrendingDown size={22} className="text-rose-400" />
            </div>
            Outflow
          </h1>
          <p className="text-sm text-slate-500 mt-1">All expenses and payments</p>
        </div>
        <div
          className="rounded-2xl px-6 py-4"
          style={{
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <p className="text-xs text-slate-500 mb-1 font-medium uppercase tracking-wider">Total Monthly Outflow</p>
          <p className="text-2xl font-bold text-rose-400">{formatCurrency(totalOutflow)}</p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable data={outflowData} columns={columns} type="outflow" />
    </div>
  );
}

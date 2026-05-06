import { TrendingUp } from 'lucide-react';
import DataTable from '../components/DataTable';
import { inflowData, totalInflow, formatCurrency } from '../data/mockData';

const columns = [
  { key: 'source', label: 'Source' },
  { key: 'date', label: 'Date' },
  { key: 'category', label: 'Category' },
  { key: 'amount', label: 'Amount' },
];

export default function InflowPage() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <div
              className="p-2 rounded-xl"
              style={{ backgroundColor: 'rgba(16,185,129,0.1)' }}
            >
              <TrendingUp size={22} className="text-emerald-400" />
            </div>
            Inflow
          </h1>
          <p className="text-sm text-slate-500 mt-1">All income sources and earnings</p>
        </div>
        <div
          className="rounded-2xl px-6 py-4"
          style={{
            background: 'rgba(255,255,255,0.03)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <p className="text-xs text-slate-500 mb-1 font-medium uppercase tracking-wider">Total Monthly Inflow</p>
          <p className="text-2xl font-bold text-emerald-400">{formatCurrency(totalInflow)}</p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable data={inflowData} columns={columns} type="inflow" />
    </div>
  );
}

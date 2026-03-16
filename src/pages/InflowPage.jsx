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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/15">
              <TrendingUp size={22} className="text-emerald-400" />
            </div>
            Inflow
          </h1>
          <p className="text-sm text-slate-500 mt-1">All income sources and earnings</p>
        </div>
        <div className="glass-light rounded-xl px-5 py-3">
          <p className="text-xs text-slate-500 mb-0.5">Total Monthly Inflow</p>
          <p className="text-lg font-bold text-emerald-400">{formatCurrency(totalInflow)}</p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable data={inflowData} columns={columns} type="inflow" />
    </div>
  );
}

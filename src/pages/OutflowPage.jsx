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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <div className="p-2 rounded-xl bg-rose-500/15">
              <TrendingDown size={22} className="text-rose-400" />
            </div>
            Outflow
          </h1>
          <p className="text-sm text-slate-500 mt-1">All expenses and payments</p>
        </div>
        <div className="glass-light rounded-xl px-5 py-3">
          <p className="text-xs text-slate-500 mb-0.5">Total Monthly Outflow</p>
          <p className="text-lg font-bold text-rose-400">{formatCurrency(totalOutflow)}</p>
        </div>
      </div>

      {/* Data Table */}
      <DataTable data={outflowData} columns={columns} type="outflow" />
    </div>
  );
}

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { monthlyData, formatCurrency } from '../data/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div
      className="rounded-xl p-3 shadow-2xl"
      style={{
        background: 'rgba(12, 17, 32, 0.9)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <p className="text-xs text-slate-400 mb-2 font-medium">{label} 2026</p>
      {payload.map((entry) => (
        <p key={entry.name} className="text-sm font-semibold" style={{ color: entry.fill }}>
          {entry.name}: {formatCurrency(entry.value)}
        </p>
      ))}
    </div>
  );
};

export default function BarChartCard() {
  return (
    <div
      className="rounded-[24px] p-6 lg:p-8 h-full flex flex-col animate-fade-in overflow-hidden transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
      style={{
        animationDelay: '400ms',
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
      }}
    >
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div>
          <h3 className="text-sm font-semibold text-white">Monthly Comparison</h3>
          <p className="text-xs text-slate-500 mt-0.5">2026 yearly overview</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-emerald-500" />
            <span className="text-slate-400">Inflow</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-rose-500" />
            <span className="text-slate-400">Outflow</span>
          </span>
        </div>
      </div>
      <div className="flex-1 min-h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#64748b' }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#64748b' }}
              tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
            <Bar
              dataKey="inflow"
              name="Inflow"
              fill="#10b981"
              radius={[6, 6, 0, 0]}
              maxBarSize={32}
            />
            <Bar
              dataKey="outflow"
              name="Outflow"
              fill="#f43f5e"
              radius={[6, 6, 0, 0]}
              maxBarSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

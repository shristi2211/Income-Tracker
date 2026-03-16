import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { monthlyData, formatCurrency } from '../data/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div className="glass rounded-xl p-3 shadow-2xl !border-slate-700">
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
    <div className="bg-[#0f1523]/80 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 shadow-xl h-full flex flex-col animate-fade-in" style={{ animationDelay: '400ms' }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold text-white">Monthly Comparison</h3>
          <p className="text-xs text-slate-500 mt-0.5">2026 yearly overview</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-emerald-500"></span>
            <span className="text-slate-400">Inflow</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-rose-500"></span>
            <span className="text-slate-400">Outflow</span>
          </span>
        </div>
      </div>
      <div className="h-[280px] md:h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
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
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(30, 41, 59, 0.5)' }} />
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

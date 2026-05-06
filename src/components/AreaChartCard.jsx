import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { dailyTrends } from '../data/mockData';

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
      <p className="text-xs text-slate-400 mb-2 font-medium">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="text-sm font-semibold" style={{ color: entry.color }}>
          {entry.name}: ₹{entry.value.toLocaleString('en-IN')}
        </p>
      ))}
    </div>
  );
};

export default function AreaChartCard() {
  return (
    <div
      className="rounded-[24px] p-6 lg:p-8 h-full flex flex-col animate-fade-in overflow-hidden transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
      style={{
        animationDelay: '200ms',
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
      }}
    >
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div>
          <h3 className="text-sm font-semibold text-white">Income vs Expense Trend</h3>
          <p className="text-xs text-slate-500 mt-0.5">Last 30 days</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-slate-400">Inflow</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="text-slate-400">Outflow</span>
          </span>
        </div>
      </div>
      <div className="flex-1 min-h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dailyTrends} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="inflowGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="outflowGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#64748b' }}
              interval="preserveStartEnd"
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#64748b' }}
              tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="inflow"
              name="Inflow"
              stroke="#10b981"
              strokeWidth={2.5}
              fill="url(#inflowGrad)"
              dot={false}
              activeDot={{ r: 5, stroke: '#10b981', strokeWidth: 2, fill: '#080b12' }}
            />
            <Area
              type="monotone"
              dataKey="outflow"
              name="Outflow"
              stroke="#f43f5e"
              strokeWidth={2.5}
              fill="url(#outflowGrad)"
              dot={false}
              activeDot={{ r: 5, stroke: '#f43f5e', strokeWidth: 2, fill: '#080b12' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

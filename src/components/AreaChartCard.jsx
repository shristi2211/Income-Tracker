import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { dailyTrends } from '../data/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div className="glass rounded-xl p-3 shadow-2xl !border-slate-700">
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
    <div className="bg-[#0f1523]/80 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 shadow-xl animate-fade-in" style={{ animationDelay: '200ms' }}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold text-white">Income vs Expense Trend</h3>
          <p className="text-xs text-slate-500 mt-0.5">Last 30 days</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-slate-400">Inflow</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <span className="text-slate-400">Outflow</span>
          </span>
        </div>
      </div>
      <div className="h-[280px] md:h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dailyTrends} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="inflowGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="outflowGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
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
              activeDot={{ r: 5, stroke: '#10b981', strokeWidth: 2, fill: '#0f172a' }}
            />
            <Area
              type="monotone"
              dataKey="outflow"
              name="Outflow"
              stroke="#f43f5e"
              strokeWidth={2.5}
              fill="url(#outflowGrad)"
              dot={false}
              activeDot={{ r: 5, stroke: '#f43f5e', strokeWidth: 2, fill: '#0f172a' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

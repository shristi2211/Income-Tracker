import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { outflowByCategory, DONUT_COLORS, formatCurrency } from '../data/mockData';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.[0]) return null;
  const { name, value } = payload[0].payload;
  return (
    <div
      className="rounded-xl p-3 shadow-2xl"
      style={{
        background: 'rgba(12, 17, 32, 0.9)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <p className="text-xs text-slate-400 mb-1">{name}</p>
      <p className="text-sm font-bold text-white">{formatCurrency(value)}</p>
    </div>
  );
};

const RADIAN = Math.PI / 180;
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.06) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function DonutChartCard() {
  const total = outflowByCategory.reduce((s, d) => s + d.value, 0);

  return (
    <div
      className="rounded-[24px] p-6 lg:p-8 h-full flex flex-col animate-fade-in overflow-hidden transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
      style={{
        animationDelay: '300ms',
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
      }}
    >
      <div className="mb-5 shrink-0">
        <h3 className="text-sm font-semibold text-white">Expense Distribution</h3>
        <p className="text-xs text-slate-500 mt-0.5">Where your money goes</p>
      </div>
      <div className="flex-1 min-h-[220px] max-h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={outflowByCategory}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
              labelLine={false}
              label={renderCustomLabel}
              stroke="none"
            >
              {outflowByCategory.map((_, i) => (
                <Cell key={i} fill={DONUT_COLORS[i % DONUT_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      {/* Legend */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-5 shrink-0">
        {outflowByCategory.map((entry, i) => (
          <div key={entry.name} className="flex items-center gap-2 text-xs">
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: DONUT_COLORS[i % DONUT_COLORS.length] }}
            />
            <span className="text-slate-400 truncate">{entry.name}</span>
            <span className="text-slate-500 ml-auto">{((entry.value / total) * 100).toFixed(0)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { outflowByCategory, DONUT_COLORS, formatCurrency } from '../data/mockData';

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.[0]) return null;
  const { name, value } = payload[0].payload;
  return (
    <div className="glass rounded-xl p-3 shadow-2xl !border-slate-700">
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
    <div className="bg-[#0f1523]/80 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 shadow-xl h-full flex flex-col animate-fade-in" style={{ animationDelay: '300ms' }}>
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-white">Expense Distribution</h3>
        <p className="text-xs text-slate-500 mt-0.5">Where your money goes</p>
      </div>
      <div className="h-[220px]">
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
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
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

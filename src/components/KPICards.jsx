import { TrendingUp, TrendingDown, Wallet, PiggyBank } from 'lucide-react';
import { totalBalance, totalInflow, totalOutflow, savingsRate, formatCurrency } from '../data/mockData';

const cards = [
  {
    title: 'Total Balance',
    value: formatCurrency(totalBalance),
    icon: Wallet,
    iconBg: 'bg-emerald-500/15',
    iconColor: 'text-emerald-400',
    change: '+12.5%',
    changePositive: true,
  },
  {
    title: 'Monthly Inflow',
    value: formatCurrency(totalInflow),
    icon: TrendingUp,
    iconBg: 'bg-emerald-500/15',
    iconColor: 'text-emerald-400',
    change: '+8.2%',
    changePositive: true,
  },
  {
    title: 'Monthly Outflow',
    value: formatCurrency(totalOutflow),
    icon: TrendingDown,
    iconBg: 'bg-rose-500/15',
    iconColor: 'text-rose-400',
    change: '+3.1%',
    changePositive: false,
  },
  {
    title: 'Savings Rate',
    value: `${savingsRate}%`,
    icon: PiggyBank,
    iconBg: 'bg-violet-500/15',
    iconColor: 'text-violet-400',
    change: '+2.4%',
    changePositive: true,
  },
];

export default function KPICards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={card.title}
            className="bg-[#0f1523]/80 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 shadow-xl hover:border-slate-700 hover:bg-[#131c31] transition-all duration-300 animate-fade-in group"
            style={{ animationDelay: `${idx * 80}ms` }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-2.5 rounded-lg ${card.iconBg}`}>
                <Icon size={18} className={card.iconColor} />
              </div>
              <span
                className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                  card.changePositive
                    ? 'bg-emerald-500/15 text-emerald-400'
                    : 'bg-rose-500/15 text-rose-400'
                }`}
              >
                {card.change}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider mb-2">{card.title}</p>
            <p className="text-2xl font-bold text-white group-hover:scale-[1.02] transform transition-transform origin-left">{card.value}</p>
          </div>
        );
      })}
    </div>
  );
}

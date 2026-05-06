import { TrendingUp, TrendingDown, Wallet, PiggyBank } from 'lucide-react';
import { totalBalance, totalInflow, totalOutflow, savingsRate, formatCurrency } from '../data/mockData';

const cards = [
  {
    title: 'Total Balance',
    value: formatCurrency(totalBalance),
    icon: Wallet,
    color: '#10b981',
    change: '+12.5%',
    changePositive: true,
  },
  {
    title: 'Monthly Inflow',
    value: formatCurrency(totalInflow),
    icon: TrendingUp,
    color: '#10b981',
    change: '+8.2%',
    changePositive: true,
  },
  {
    title: 'Monthly Outflow',
    value: formatCurrency(totalOutflow),
    icon: TrendingDown,
    color: '#f43f5e',
    change: '+3.1%',
    changePositive: false,
  },
  {
    title: 'Savings Rate',
    value: `${savingsRate}%`,
    icon: PiggyBank,
    color: '#8b5cf6',
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
            className="rounded-[24px] p-5 lg:p-6 transition-all duration-300 animate-fade-in group hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
            style={{
              animationDelay: `${idx * 80}ms`,
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.06)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="p-2.5 rounded-xl"
                style={{ backgroundColor: `${card.color}12` }}
              >
                <Icon size={18} style={{ color: card.color }} />
              </div>
              <span
                className="text-[11px] font-semibold px-2 py-0.5 rounded-md"
                style={{
                  backgroundColor: card.changePositive ? 'rgba(16,185,129,0.1)' : 'rgba(244,63,94,0.1)',
                  color: card.changePositive ? '#34d399' : '#fb7185',
                }}
              >
                {card.change}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-[12px] text-slate-400 font-semibold uppercase tracking-wider mb-2">{card.title}</p>
              <p className="text-3xl font-bold text-white group-hover:scale-[1.02] transform transition-transform origin-left">{card.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

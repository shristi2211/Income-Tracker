// Helper to generate dates
const today = new Date(2026, 2, 14); // March 14, 2026
const formatDate = (d) => d.toISOString().split('T')[0];
const daysAgo = (n) => {
  const d = new Date(today);
  d.setDate(d.getDate() - n);
  return formatDate(d);
};

// ─── Inflow Categories ────────────────────────
const inflowCategories = ['Salary', 'Freelance', 'Dividend', 'Investment', 'Rental', 'Refund', 'Gift', 'Bonus'];

// ─── Outflow Categories ───────────────────────
const outflowCategories = ['Rent', 'Food', 'SaaS', 'Transport', 'Entertainment', 'Utilities', 'Healthcare', 'Shopping', 'Education', 'Insurance'];

// ─── Inflow Entries (30 days) ─────────────────
export const inflowData = [
  { id: 1, source: 'Monthly Salary', date: daysAgo(28), category: 'Salary', amount: 85000 },
  { id: 2, source: 'Web Dev Project - Acme Corp', date: daysAgo(26), category: 'Freelance', amount: 15000 },
  { id: 3, source: 'Stock Dividend - AAPL', date: daysAgo(25), category: 'Dividend', amount: 3200 },
  { id: 4, source: 'Mutual Fund Returns', date: daysAgo(23), category: 'Investment', amount: 7500 },
  { id: 5, source: 'Apartment Rental Income', date: daysAgo(22), category: 'Rental', amount: 22000 },
  { id: 6, source: 'Amazon Refund', date: daysAgo(20), category: 'Refund', amount: 1800 },
  { id: 7, source: 'UI/UX Design - StartupXYZ', date: daysAgo(18), category: 'Freelance', amount: 12000 },
  { id: 8, source: 'Birthday Gift', date: daysAgo(16), category: 'Gift', amount: 5000 },
  { id: 9, source: 'Crypto Staking Rewards', date: daysAgo(15), category: 'Investment', amount: 4300 },
  { id: 10, source: 'Stock Dividend - MSFT', date: daysAgo(13), category: 'Dividend', amount: 2800 },
  { id: 11, source: 'Performance Bonus Q1', date: daysAgo(11), category: 'Bonus', amount: 25000 },
  { id: 12, source: 'React Native Consulting', date: daysAgo(9), category: 'Freelance', amount: 18000 },
  { id: 13, source: 'Parking Space Rental', date: daysAgo(7), category: 'Rental', amount: 3500 },
  { id: 14, source: 'ETF Dividend Payout', date: daysAgo(5), category: 'Dividend', amount: 1900 },
  { id: 15, source: 'Logo Design Project', date: daysAgo(3), category: 'Freelance', amount: 8000 },
  { id: 16, source: 'GST Refund', date: daysAgo(1), category: 'Refund', amount: 4200 },
];

// ─── Outflow Entries (30 days) ────────────────
export const outflowData = [
  { id: 1, name: 'Monthly Rent', date: daysAgo(29), category: 'Rent', amount: 28000 },
  { id: 2, name: 'Grocery - BigBasket', date: daysAgo(28), category: 'Food', amount: 4500 },
  { id: 3, name: 'Notion Pro Subscription', date: daysAgo(27), category: 'SaaS', amount: 1200 },
  { id: 4, name: 'Uber Rides', date: daysAgo(26), category: 'Transport', amount: 2800 },
  { id: 5, name: 'Netflix & Spotify', date: daysAgo(25), category: 'Entertainment', amount: 1500 },
  { id: 6, name: 'Electricity Bill', date: daysAgo(24), category: 'Utilities', amount: 3200 },
  { id: 7, name: 'Health Checkup', date: daysAgo(22), category: 'Healthcare', amount: 5500 },
  { id: 8, name: 'Amazon Shopping', date: daysAgo(21), category: 'Shopping', amount: 7800 },
  { id: 9, name: 'Online Course - Udemy', date: daysAgo(20), category: 'Education', amount: 2400 },
  { id: 10, name: 'Swiggy Orders', date: daysAgo(19), category: 'Food', amount: 3600 },
  { id: 11, name: 'Figma Team Plan', date: daysAgo(18), category: 'SaaS', amount: 1800 },
  { id: 12, name: 'Metro Card Recharge', date: daysAgo(17), category: 'Transport', amount: 1500 },
  { id: 13, name: 'Movie Tickets', date: daysAgo(15), category: 'Entertainment', amount: 1200 },
  { id: 14, name: 'Water & Gas Bill', date: daysAgo(14), category: 'Utilities', amount: 1800 },
  { id: 15, name: 'Dental Clinic', date: daysAgo(12), category: 'Healthcare', amount: 3500 },
  { id: 16, name: 'Health Insurance Premium', date: daysAgo(11), category: 'Insurance', amount: 4500 },
  { id: 17, name: 'Myntra Fashion', date: daysAgo(10), category: 'Shopping', amount: 5200 },
  { id: 18, name: 'Zomato Orders', date: daysAgo(9), category: 'Food', amount: 2800 },
  { id: 19, name: 'AWS Cloud Services', date: daysAgo(8), category: 'SaaS', amount: 3200 },
  { id: 20, name: 'Ola Rides', date: daysAgo(7), category: 'Transport', amount: 1900 },
  { id: 21, name: 'Coursera Subscription', date: daysAgo(5), category: 'Education', amount: 3800 },
  { id: 22, name: 'Grocery - DMart', date: daysAgo(4), category: 'Food', amount: 3500 },
  { id: 23, name: 'Gaming Subscription', date: daysAgo(3), category: 'Entertainment', amount: 900 },
  { id: 24, name: 'Internet Bill', date: daysAgo(2), category: 'Utilities', amount: 1500 },
  { id: 25, name: 'Pharmacy', date: daysAgo(1), category: 'Healthcare', amount: 1200 },
];

// ─── Daily trends for Area Chart (30 days) ───
export const dailyTrends = Array.from({ length: 30 }, (_, i) => {
  const day = 29 - i;
  const date = daysAgo(day);
  const dayInflows = inflowData.filter(d => d.date === date);
  const dayOutflows = outflowData.filter(d => d.date === date);
  return {
    date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    fullDate: date,
    inflow: dayInflows.reduce((s, d) => s + d.amount, 0),
    outflow: dayOutflows.reduce((s, d) => s + d.amount, 0),
  };
});

// ─── Monthly Data for Bar Chart (current year) ─
export const monthlyData = [
  { month: 'Jan', inflow: 125000, outflow: 78000 },
  { month: 'Feb', inflow: 132000, outflow: 85000 },
  { month: 'Mar', inflow: 219200, outflow: 98900 },
  { month: 'Apr', inflow: 0, outflow: 0 },
  { month: 'May', inflow: 0, outflow: 0 },
  { month: 'Jun', inflow: 0, outflow: 0 },
  { month: 'Jul', inflow: 0, outflow: 0 },
  { month: 'Aug', inflow: 0, outflow: 0 },
  { month: 'Sep', inflow: 0, outflow: 0 },
  { month: 'Oct', inflow: 0, outflow: 0 },
  { month: 'Nov', inflow: 0, outflow: 0 },
  { month: 'Dec', inflow: 0, outflow: 0 },
];

// ─── Outflow Category Distribution for Donut ──
export const outflowByCategory = outflowCategories.map(cat => {
  const total = outflowData
    .filter(d => d.category === cat)
    .reduce((s, d) => s + d.amount, 0);
  return { name: cat, value: total };
}).filter(d => d.value > 0);

// ─── Category Colors ──────────────────────────
export const categoryColors = {
  Salary: '#10b981',
  Freelance: '#34d399',
  Dividend: '#06b6d4',
  Investment: '#3b82f6',
  Rental: '#8b5cf6',
  Refund: '#f59e0b',
  Gift: '#ec4899',
  Bonus: '#14b8a6',
  Rent: '#f43f5e',
  Food: '#fb7185',
  SaaS: '#8b5cf6',
  Transport: '#f59e0b',
  Entertainment: '#ec4899',
  Utilities: '#06b6d4',
  Healthcare: '#3b82f6',
  Shopping: '#a78bfa',
  Education: '#34d399',
  Insurance: '#64748b',
};

// ─── Donut Chart Colors ───────────────────────
export const DONUT_COLORS = ['#f43f5e', '#fb7185', '#8b5cf6', '#f59e0b', '#ec4899', '#06b6d4', '#3b82f6', '#a78bfa', '#34d399', '#64748b'];

// ─── KPI Calculations ─────────────────────────
export const totalInflow = inflowData.reduce((s, d) => s + d.amount, 0);
export const totalOutflow = outflowData.reduce((s, d) => s + d.amount, 0);
export const totalBalance = totalInflow - totalOutflow;
export const savingsRate = totalInflow > 0 ? ((totalInflow - totalOutflow) / totalInflow * 100).toFixed(1) : 0;

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

import { useState, useMemo } from 'react';
import { Search, ChevronUp, ChevronDown, ArrowUpDown } from 'lucide-react';
import { categoryColors, formatCurrency } from '../data/mockData';

export default function DataTable({ data, columns, type = 'inflow' }) {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('date');
  const [sortDir, setSortDir] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const filtered = useMemo(() => {
    let result = [...data];

    // Search
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(row =>
        columns.some(col => String(row[col.key]).toLowerCase().includes(q))
      );
    }

    // Sort
    result.sort((a, b) => {
      let valA = a[sortKey];
      let valB = b[sortKey];
      if (sortKey === 'amount') {
        valA = Number(valA);
        valB = Number(valB);
      }
      if (valA < valB) return sortDir === 'asc' ? -1 : 1;
      if (valA > valB) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [data, search, sortKey, sortDir, columns]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const SortIcon = ({ col }) => {
    if (sortKey !== col) return <ArrowUpDown size={12} className="text-slate-600" />;
    return sortDir === 'asc'
      ? <ChevronUp size={14} className="text-emerald-400" />
      : <ChevronDown size={14} className="text-emerald-400" />;
  };

  return (
    <div className="bg-[#131c31] border border-slate-800/60 rounded-xl overflow-hidden animate-fade-in">
      {/* Search Bar */}
      <div className="p-6 border-b border-slate-800/50">
        <div className="relative max-w-sm">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            placeholder="Search transactions..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-800/60 border border-slate-700/50 rounded-xl text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-colors"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800/50">
              {columns.map(col => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-300 transition-colors select-none"
                >
                  <div className="flex items-center gap-1.5">
                    {col.label}
                    <SortIcon col={col.key} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/30">
            {paginated.map((row, i) => (
              <tr
                key={row.id || i}
                className="hover:bg-slate-800/30 transition-colors group"
              >
                {columns.map(col => (
                  <td key={col.key} className="px-6 py-3.5 text-sm whitespace-nowrap">
                    {col.key === 'category' ? (
                      <span
                        className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium"
                        style={{
                          backgroundColor: `${categoryColors[row[col.key]] || '#64748b'}15`,
                          color: categoryColors[row[col.key]] || '#64748b',
                          border: `1px solid ${categoryColors[row[col.key]] || '#64748b'}30`,
                        }}
                      >
                        {row[col.key]}
                      </span>
                    ) : col.key === 'amount' ? (
                      <span className={`font-semibold ${type === 'inflow' ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {type === 'inflow' ? '+' : '-'}{formatCurrency(row[col.key])}
                      </span>
                    ) : col.key === 'date' ? (
                      <span className="text-slate-400">
                        {new Date(row[col.key]).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    ) : (
                      <span className="text-slate-300">{row[col.key]}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-sm text-slate-500">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-slate-800/50">
          <p className="text-xs text-slate-500">
            Showing {(currentPage - 1) * perPage + 1}–{Math.min(currentPage * perPage, filtered.length)} of {filtered.length}
          </p>
          <div className="flex gap-1.5">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
                  currentPage === i + 1
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-500 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

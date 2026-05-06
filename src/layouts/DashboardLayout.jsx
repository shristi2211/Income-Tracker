import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import QuickAddModal from '../components/QuickAddModal';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quickAddOpen, setQuickAddOpen] = useState(false);

  return (
    <div className="flex h-screen" style={{ background: '#080b12' }}>
      {/* Ambient background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] right-[15%] w-[400px] h-[400px] rounded-full bg-emerald-500/4 blur-[150px]" />
        <div className="absolute bottom-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-violet-500/4 blur-[120px]" />
        <div className="absolute top-[50%] left-[50%] w-[500px] h-[500px] rounded-full bg-cyan-500/3 blur-[180px] -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className="relative flex-1 flex flex-col min-w-0 h-screen overflow-hidden z-10">
        <TopBar
          onMenuClick={() => setSidebarOpen(true)}
          onQuickAdd={() => setQuickAddOpen(true)}
        />
        <main className="flex-1 overflow-y-auto">
          <div className="w-full max-w-[1400px] mx-auto p-5 md:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Quick Add Modal */}
      <QuickAddModal isOpen={quickAddOpen} onClose={() => setQuickAddOpen(false)} />
    </div>
  );
}

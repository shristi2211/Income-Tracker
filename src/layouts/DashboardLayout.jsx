import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import QuickAddModal from '../components/QuickAddModal';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quickAddOpen, setQuickAddOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#0a0f1a]">
      {/* Sidebar — static on desktop, drawer on mobile */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content — takes remaining space after sidebar */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-[#0a0f1a]">
        <TopBar
          onMenuClick={() => setSidebarOpen(true)}
          onQuickAdd={() => setQuickAddOpen(true)}
        />
        <main className="flex-1 overflow-y-auto bg-[#0a0f1a]">
          <div className="w-full max-w-[1600px] mx-auto p-6 md:p-8 lg:p-10">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Quick Add Modal */}
      <QuickAddModal isOpen={quickAddOpen} onClose={() => setQuickAddOpen(false)} />
    </div>
  );
}

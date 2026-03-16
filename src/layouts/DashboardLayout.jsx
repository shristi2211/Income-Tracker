import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import QuickAddModal from '../components/QuickAddModal';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quickAddOpen, setQuickAddOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0a0f1a]">
      {/* Sidebar Container */}
      <div className="flex-none">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
        <TopBar
          onMenuClick={() => setSidebarOpen(true)}
          onQuickAdd={() => setQuickAddOpen(true)}
        />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[1600px] mx-auto p-6 md:p-8">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Quick Add Modal */}
      <QuickAddModal isOpen={quickAddOpen} onClose={() => setQuickAddOpen(false)} />
    </div>
  );
}

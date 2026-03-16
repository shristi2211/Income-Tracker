import KPICards from '../components/KPICards';
import AreaChartCard from '../components/AreaChartCard';
import DonutChartCard from '../components/DonutChartCard';
import BarChartCard from '../components/BarChartCard';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();
  
  return (
    <div className="flex flex-col gap-8">

      {/* KPI Cards */}
      <KPICards />

      {/* Middle row: Area (Sales Report) + Donut (Analytics) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <AreaChartCard />
        </div>
        <div className="xl:col-span-1">
          <DonutChartCard />
        </div>
      </div>

      {/* Bottom row: Bar Chart (Sales History equivalent) */}
      <div className="w-full">
        <BarChartCard />
      </div>
    </div>
  );
}

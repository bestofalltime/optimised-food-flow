
import { KPICard } from "./KPICard";
import { AlertsModule } from "./AlertsModule";
import { WasteTrendChart } from "./WasteTrendChart";
import { InventoryHealthChart } from "./InventoryHealthChart";
import { TopWastedItemsChart } from "./TopWastedItemsChart";
import { QuickActions } from "./QuickActions";

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
        <div className="text-white/70">
          {new Date().toLocaleDateString("en-US", { 
            weekday: "long", 
            year: "numeric", 
            month: "long", 
            day: "numeric" 
          })}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <KPICard
          title="Daily Waste"
          value="15.2 kg"
          subtitle="$127.40"
          trend="-8%"
          trendType="positive"
        />
        <KPICard
          title="Food Cost %"
          value="28.5%"
          subtitle="Target: 30%"
          trend="+2.1%"
          trendType="negative"
        />
        <KPICard
          title="Stock Value"
          value="$12,847"
          subtitle="Current inventory"
          trend="+5.3%"
          trendType="positive"
        />
        <KPICard
          title="Expiring Soon"
          value="8 items"
          subtitle="Within 72h"
          trend="3 critical"
          trendType="warning"
        />
      </div>

      {/* Charts and Alerts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <WasteTrendChart />
        </div>
        <AlertsModule />
      </div>

      {/* Bottom Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <InventoryHealthChart />
        <TopWastedItemsChart />
      </div>

      <QuickActions />
    </div>
  );
};

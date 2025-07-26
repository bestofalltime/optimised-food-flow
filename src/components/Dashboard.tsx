
import { POSStatusCard } from "./POSStatusCard";
import { DashboardKPI } from "./DashboardKPI";
import { WasteTrendComparisonChart } from "./WasteTrendComparisonChart";
import { DashboardAlerts } from "./DashboardAlerts";
import { QuickActionsGrid } from "./QuickActionsGrid";

export const Dashboard = () => {
  // Today’s date, formatted
  const date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <div className="space-y-6">
      {/* AI RECOMMENDATION */}
      <div className="bg-card/20 border border-white/10 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <span className="text-white font-medium">AI Recommendation</span>
        </div>
        <p className="text-white/90 text-sm">
          Consider ordering 20% more bread rolls for tomorrow based on weather forecast and historical patterns. Waste levels are optimized this week.
        </p>
      </div>

      {/* HEADER */}
      <div className="flex flex-col gap-3 lg:flex-row items-start lg:items-center justify-between">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1">Dashboard Overview</h1>
          <div className="text-white/70 text-sm">{date}</div>
        </div>
        <POSStatusCard />
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <DashboardKPI
          title="Total Waste This Month"
          value="15.2 kg"
          subtitle="$127.40"
          trend="+8%"
          trendPositive={false}
        />
        <DashboardKPI
          title="Inventory Value"
          value="$12,847"
          subtitle="Current inventory"
          trend="+5%"
          trendPositive={true}
        />
        <DashboardKPI
          title="Expiring Soon"
          value="8 items"
          subtitle="Within 72h"
          badge="3 critical"
        />
        <DashboardKPI
          title="Forecast Risk"
          value="Monitored"
          subtitle="AI detected"
          risk="Shortage on bread rolls"
        />
      </div>

      {/* QUICK ACTIONS */}
      <QuickActionsGrid />

      {/* WASTE TREND CHART */}
      <WasteTrendComparisonChart />

      {/* ALERTS */}
      <DashboardAlerts />
    </div>
  );
};

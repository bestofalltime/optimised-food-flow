
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
      {/* AI RECOMMENDATIONS */}
      <div className="space-y-3">
        <div className="bg-card/20 border border-white/10 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-white font-medium">AI Recommendation</span>
          </div>
          <p className="text-white/90 text-sm">
            Consider ordering 20% more bread rolls for tomorrow based on weather forecast and historical patterns. Waste levels are optimized this week.
          </p>
        </div>
        
        <div className="bg-card/20 border border-white/10 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white font-medium">Inventory Alert</span>
          </div>
          <p className="text-white/90 text-sm">
            Tomatoes are expiring in 48 hours. Use in today's specials or consider donating 12kg to local food bank.
          </p>
        </div>

        <div className="bg-card/20 border border-white/10 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <span className="text-white font-medium">Cost Optimization</span>
          </div>
          <p className="text-white/90 text-sm">
            Switch to local supplier for lettuce - 15% cost reduction while maintaining quality. Estimated monthly savings: $340.
          </p>
        </div>
      </div>

      {/* WELCOME MESSAGE */}
      <div className="text-center py-6">
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
          You're all set, waste levels are OptiMised! 
        </h2>
        <p className="text-white/70 text-lg">Everything is running smoothly</p>
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

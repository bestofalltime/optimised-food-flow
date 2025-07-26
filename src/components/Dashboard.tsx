
import { useState } from "react";
import { POSStatusCard } from "./POSStatusCard";
import { DashboardKPI } from "./DashboardKPI";
import { WasteTrendComparisonChart } from "./WasteTrendComparisonChart";
import { DashboardAlerts } from "./DashboardAlerts";
import { QuickActionsGrid } from "./QuickActionsGrid";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, Sparkles, Target, CheckCircle } from "lucide-react";

export const Dashboard = () => {
  const [showOptiMisedModal, setShowOptiMisedModal] = useState(false);
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
        <h2 
          className="text-3xl lg:text-4xl font-bold text-white mb-2 cursor-pointer hover:scale-105 transition-transform duration-300 hover:text-blue-200"
          onClick={() => setShowOptiMisedModal(true)}
        >
          You're all set, waste levels are OptiMised! ✨
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

      {/* OptiMised Modal */}
      <Dialog open={showOptiMisedModal} onOpenChange={setShowOptiMisedModal}>
        <DialogContent className="sm:max-w-md bg-card border-white/20 animate-scale-in">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-bold text-white flex items-center justify-center gap-2">
              <Sparkles className="text-yellow-400 animate-pulse" />
              OptiMised Status
              <Sparkles className="text-yellow-400 animate-pulse" />
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Status Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-4 text-center animate-fade-in">
                <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <p className="text-green-300 font-semibold">Waste Reduced</p>
                <p className="text-green-200 text-sm">32% this month</p>
              </div>
              
              <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-4 text-center animate-fade-in delay-100">
                <Target className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <p className="text-blue-300 font-semibold">On Target</p>
                <p className="text-blue-200 text-sm">All KPIs met</p>
              </div>
            </div>

            {/* Achievement Badges */}
            <div className="space-y-3">
              <h3 className="text-white font-semibold text-center">Recent Achievements</h3>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-400/30 animate-fade-in delay-200">
                  🏆 Waste Warrior
                </Badge>
                <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300 border-yellow-400/30 animate-fade-in delay-300">
                  ⚡ Efficiency Expert
                </Badge>
                <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-400/30 animate-fade-in delay-400">
                  💰 Cost Saver
                </Badge>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white/5 rounded-lg p-4 animate-fade-in delay-500">
              <div className="flex items-center justify-center gap-2 mb-3">
                <TrendingDown className="text-green-400" />
                <h4 className="text-white font-semibold">This Month's Impact</h4>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <p className="text-2xl font-bold text-green-400">$1,247</p>
                  <p className="text-white/70 text-xs">Saved</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-400">15.2kg</p>
                  <p className="text-white/70 text-xs">Less Waste</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-400">98%</p>
                  <p className="text-white/70 text-xs">Efficiency</p>
                </div>
              </div>
            </div>

            <p className="text-center text-white/80 text-sm animate-fade-in delay-600">
              🎉 Keep up the amazing work! Your restaurant is running at peak efficiency.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

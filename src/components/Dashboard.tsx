
import { useState } from "react";
import { KPICard } from "./KPICard";
import { AlertsModule } from "./AlertsModule";
import { WasteTrendChart } from "./WasteTrendChart";
import { InventoryHealthChart } from "./InventoryHealthChart";
import { TopWastedItemsChart } from "./TopWastedItemsChart";
import { QuickActions } from "./QuickActions";
import { POSConnectionCard } from "./POSConnectionCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "./ui/dialog";
import { Button } from "./ui/button";
import { ChevronDown, FilePdf, FileCsv, BadgeAlert } from "lucide-react";

// Visual-only state for Waste Trend Chart selector
const chartViews = [
  { label: "Monthly", value: "monthly" },
  { label: "Quarterly", value: "quarterly" },
];

export const Dashboard = () => {
  const [wasteModal, setWasteModal] = useState(false);
  const [stockModal, setStockModal] = useState(false);
  const [expireModal, setExpireModal] = useState(false);

  // Chart selector
  const [trendView, setTrendView] = useState<"monthly" | "quarterly">("monthly");

  // Simulated data for percent changes
  const wasteChange = "+14%";
  const wasteChangeType = "negative";
  const stockChange = "-6%";
  const expireCritical = 3;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-3">
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

      {/* KPI Cards (all clickable, hoverable) */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-2">
        <button
          className="focus:outline-none"
          onClick={() => setWasteModal(true)}
        >
          <KPICard
            title="Waste This Month"
            value="103.7 kg"
            subtitle="$1,226.20"
            trend={wasteChange}
            trendType={wasteChangeType as "positive" | "negative" | "warning"}
          />
        </button>
        <button
          className="focus:outline-none"
          onClick={() => setStockModal(true)}
        >
          <KPICard
            title="Stock Value"
            value="$15,495"
            subtitle="Current inventory"
            trend={stockChange}
            trendType={stockChange.startsWith("+") ? "positive" : "negative"}
          />
        </button>
        <button
          className="focus:outline-none"
          onClick={() => setExpireModal(true)}
        >
          <KPICard
            title="Expiring Soon"
            value="12 items"
            subtitle={`Within 72h`}
            trend={
              <span>
                <BadgeAlert size={14} className="inline text-yellow-400 mr-1" />
                <span className="font-semibold">{expireCritical} critical</span>
              </span>
            }
            trendType="warning"
          />
        </button>
        <POSConnectionCard />
      </div>

      {/* KPI Card Modals (visual only) */}
      <Dialog open={wasteModal} onOpenChange={setWasteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Waste This Month</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <div>Total waste: 103.7 kg ($1,226.20)</div>
            <div>Up 14% vs last month.</div>
            <div>Top contributors: Lettuce, Tomato, Chicken</div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={stockModal} onOpenChange={setStockModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Stock Value</DialogTitle>
          </DialogHeader>
          <div>Inventory is currently valued at <span className="font-semibold">$15,495</span> (down 6% vs last month).</div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={expireModal} onOpenChange={setExpireModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Expiring Soon</DialogTitle>
          </DialogHeader>
          <div>
            <span className="font-semibold">12 items</span> expiring in the next 72 hours.<br />
            <span className="text-yellow-400">{expireCritical} are critical!</span>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Waste Trends Chart card */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
          <h3 className="text-lg font-semibold text-white mb-2">Waste Trends</h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button className="flex items-center text-white bg-accent/20 rounded px-3 py-1 text-sm shadow hover:bg-accent/40 transition" tabIndex={0}>
                {chartViews.find(v => v.value === trendView)?.label} <ChevronDown className="ml-1" size={16} />
              </button>
              {/* Visual dropdown: expands on click in real build */}
              {/* Here just static */}
            </div>
            <Button size="sm" variant="outline">
              <FilePdf className="mr-1" size={16} />
              Download PDF
            </Button>
            <Button size="sm" variant="outline">
              <FileCsv className="mr-1" size={16} />
              Download CSV
            </Button>
          </div>
        </div>
        <div className="h-64">
          {/* Visually simulate: Pass trendView as prop if chart is interactive */}
          <WasteTrendChart />
        </div>
      </div>

      {/* Alerts and lower charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          {/* Collapsed for demo - WasteTrendChart above */}
        </div>
        {/* Alerts */}
        <AlertsModule />
      </div>

      {/* Lower: Inventory + Top Wasted chart */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <InventoryHealthChart />
        <TopWastedItemsChart />
      </div>

      {/* Quick Actions */}
      <QuickActions />
    </div>
  );
};


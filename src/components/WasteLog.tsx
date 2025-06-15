import { useState } from "react";
import { Info, Download, CheckCircle, XCircle } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const kpiCards = [
  {
    label: "Total Discrepancies This Month",
    value: "14",
    subtext: "Discrepancy ≥ ±10%",
    color: "bg-red-600/90",
    tooltip: "Comparison between POS sales and actual inventory change",
    icon: <XCircle className="text-red-200" size={32} />,
  },
  {
    label: "High-Risk Items (Overused)",
    value: "5",
    subtext: "Used more than sold",
    color: "bg-yellow-400/80",
    tooltip: "Comparison between POS sales and actual inventory change",
    icon: <Info className="text-yellow-900" size={32} />,
  },
  {
    label: "Risk Value ($ Loss)",
    value: "$347.20",
    subtext: "Estimated based on unit cost",
    color: "bg-emerald-600/90",
    tooltip: "Comparison between POS sales and actual inventory change",
    icon: <Info className="text-emerald-200" size={32} />,
  },
];

const discrepancyRows = [
  {
    ingredient: "Chicken Breast",
    posSales: 120,
    inventoryUsed: 145,
    delta: 25,
    alert: "high",
    reason: "Overuse",
    percent: 21,
  },
  {
    ingredient: "Cheese Slices",
    posSales: 180,
    inventoryUsed: 160,
    delta: -20,
    alert: "low",
    reason: "Underuse",
    percent: -11,
  },
  {
    ingredient: "Lettuce",
    posSales: 95,
    inventoryUsed: 95,
    delta: 0,
    alert: "normal",
    reason: "–",
    percent: 0,
  },
];

const getAlertBadgeStyles = (alert: string) => {
  switch (alert) {
    case "high":
      return "bg-red-600/20 text-red-400 border-red-500/40";
    case "low":
      return "bg-yellow-400/20 text-yellow-700 border-yellow-400/30";
    case "normal":
    default:
      return "bg-green-500/20 text-green-300 border-green-600/30";
  }
};

const getAlertEmoji = (alert: string) => {
  switch (alert) {
    case "high":
      return "🔴";
    case "low":
      return "🟡";
    case "normal":
    default:
      return "🟢";
  }
};

const getRowGlow = (alert: string) => {
  switch (alert) {
    case "high":
      return "hover:shadow-[0_0_10px_0_rgba(239,68,68,0.3)]";
    case "low":
      return "hover:shadow-[0_0_10px_0_rgba(252,211,77,0.24)]";
    case "normal":
    default:
      return "";
  }
};

const wasteLogRows = [
  {
    date: "June 11",
    item: "Milk",
    qty: 2.0,
    unit: "L",
    reason: "Spoiled",
    staff: "Nour",
    posLinked: true,
  },
  {
    date: "June 10",
    item: "Bread",
    qty: 10,
    unit: "pcs",
    reason: "Over-prep",
    staff: "Elias",
    posLinked: false,
  },
  {
    date: "June 09",
    item: "Tomatoes",
    qty: 3.2,
    unit: "kg",
    reason: "Theft",
    staff: "Dana",
    posLinked: true,
  },
];

export const WasteLog = () => {
  // Modal for discrepancy row
  const [openDiscrepancyModal, setOpenDiscrepancyModal] = useState<null | typeof discrepancyRows[0]>(null);
  // Modal for manual log
  const [openLogWaste, setOpenLogWaste] = useState(false);

  // --- Waste Log Modal state (dummy, not functional) ---
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("kg");
  const [cause, setCause] = useState("Spoiled");
  const [staff, setStaff] = useState("Nour");
  const [posLinked, setPosLinked] = useState(false);

  return (
    <div className="relative min-h-screen px-2 sm:px-6 py-8 bg-[#0D1A2B] font-sans">
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 tracking-tight">
        Waste Log &amp; POS Discrepancy Tracking
      </h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        {kpiCards.map((card, i) => (
          <Tooltip key={i}>
            <TooltipTrigger asChild>
              <div
                className={`${card.color} rounded-xl shadow border border-white/10 px-6 py-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-105 relative animate-fade-in`}
              >
                <div className="absolute top-4 right-4">{card.icon}</div>
                <div className="text-3xl font-bold text-white">{card.value}</div>
                <div className="text-base font-medium text-white text-center mb-1">{card.label}</div>
                <div className="text-xs text-white/70">{card.subtext}</div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-accent border-accent-foreground text-primary">
              {card.tooltip}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>

      {/* Discrepancy Table */}
      <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden mb-8">
        <div className="px-6 py-4">
          <h2 className="text-lg text-white font-semibold mb-2">POS–Inventory Variance Table</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-white/10">
            <thead className="bg-white/10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-white/80">Ingredient</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white/80">POS Sales</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white/80">Inventory Used</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white/80">X − Y (Delta)</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white/80">Alert Level</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white/80">Reason Detected</th>
              </tr>
            </thead>
            <tbody>
              {discrepancyRows.map((row, idx) => (
                <Tooltip key={row.ingredient}>
                  <TooltipTrigger asChild>
                    <tr
                      className={`transition-colors cursor-pointer select-none ${idx % 2 === 0 ? "bg-white/5" : ""} ${getRowGlow(row.alert)}`}
                      title=""
                      onClick={() => setOpenDiscrepancyModal(row)}
                    >
                      <td className="px-6 py-4 text-white font-medium">{row.ingredient}</td>
                      <td className="px-6 py-4 text-white/90">{row.posSales} units</td>
                      <td className="px-6 py-4 text-white/90">{row.inventoryUsed} units</td>
                      <td className={`px-6 py-4 font-mono font-bold ${
                        row.delta > 0
                          ? "text-red-400"
                          : row.delta < 0
                          ? "text-yellow-400"
                          : "text-green-300"
                      }`}>
                        {row.delta > 0 ? "+" : ""}
                        {row.delta}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border font-semibold text-xs ${getAlertBadgeStyles(row.alert)}`}>
                          {getAlertEmoji(row.alert)}{" "}
                          {row.alert === "high"
                            ? "High"
                            : row.alert === "low"
                            ? "Low"
                            : "Normal"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-white/75">{row.reason}</td>
                    </tr>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="bg-accent border-accent-foreground text-primary w-60 text-xs font-medium">
                    This item has a usage mismatch. Investigate source of variance.
                  </TooltipContent>
                </Tooltip>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Discrepancy Modal */}
      <Dialog open={!!openDiscrepancyModal} onOpenChange={(open) => !open && setOpenDiscrepancyModal(null)}>
        <DialogContent className="bg-[#142638] border-2 border-teal-400/50 shadow-xl text-white">
          <DialogHeader>
            <DialogTitle>
              Discrepancy Details – {openDiscrepancyModal?.ingredient}
            </DialogTitle>
          </DialogHeader>
          {/* Dummy details */}
          <div className="mb-5">
            <div className="mb-2">
              <span className="inline-block font-semibold text-white/80 mb-1">Timeline (last 3 entries):</span>
              <ul className="text-sm text-white/85 pl-5 list-disc">
                <li>2024-06-11: 5 units removed by Mike (Overuse)</li>
                <li>2024-06-10: 10 units logged by Anna (Over-prep)</li>
                <li>2024-06-09: 7 units on POS, matched inventory</li>
              </ul>
            </div>
            <div className="mb-2">
              <span className="inline-block font-semibold text-white/80 mb-1">Staff Logs:</span>
              <div className="text-sm text-white/85">
                Mike (shift lead), Anna (kitchen), Dana (manager)
              </div>
            </div>
            <div className="mb-2">
              <span className="inline-block font-semibold text-white/80 mb-1">Detected Reason:</span>
              <div className="text-sm text-white/85">{openDiscrepancyModal?.reason}</div>
            </div>
          </div>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setOpenDiscrepancyModal(null)}>
              Ignore
            </Button>
            <Button variant="secondary">Log Waste</Button>
            <Button variant="destructive">Flag for Investigation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MANUAL WASTE LOG TABLE */}
      <div className="mt-10 bg-white/5 rounded-xl border border-white/10 overflow-hidden mb-8">
        <div className="px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg text-white font-semibold mb-2">Logged Waste Entries (Manual)</h2>
          <Button
            variant="default"
            className="bg-accent text-primary px-3 py-2 rounded-lg hover:bg-accent/80"
            onClick={() => setOpenLogWaste(true)}
          >
            + Log New Waste
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-white/10">
            <thead className="bg-white/10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-white/80">Date</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white/80">Item</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white/80">Qty</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white/80">Unit</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white/80">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white/80">Staff</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-white/80">POS Linked?</th>
              </tr>
            </thead>
            <tbody>
              {wasteLogRows.map((row, idx) => (
                <tr key={row.date + row.item} className={`${idx % 2 === 0 ? "bg-white/5" : ""} hover:shadow-lg transition-shadow`}>
                  <td className="px-6 py-4 text-white font-medium">{row.date}</td>
                  <td className="px-6 py-4 text-white/90">{row.item}</td>
                  <td className="px-6 py-4 text-white/90">{row.qty}</td>
                  <td className="px-6 py-4 text-white/90">{row.unit}</td>
                  <td className="px-6 py-4 text-white/80">{row.reason}</td>
                  <td className="px-6 py-4 text-white/70">{row.staff}</td>
                  <td className="px-6 py-4">
                    {row.posLinked ? (
                      <CheckCircle className="text-green-400" size={20} aria-label="POS Linked" />
                    ) : (
                      <XCircle className="text-red-400" size={20} aria-label="Not Linked" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Log Waste Modal */}
      <Dialog open={openLogWaste} onOpenChange={setOpenLogWaste}>
        <DialogContent className="bg-[#142638] border-2 border-teal-400/50 shadow-xl text-white">
          <DialogHeader>
            <DialogTitle>New Waste Entry</DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
            <div>
              <label className="block text-xs text-white/70 mb-1">Ingredient</label>
              <input className="w-full px-3 py-2 rounded-lg bg-[#1c2c3a] border border-white/20 text-white" value={selectedIngredient} onChange={e=>setSelectedIngredient(e.target.value)} placeholder="Select ingredient" />
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-xs text-white/70 mb-1">Quantity</label>
                <input type="number" className="w-full px-3 py-2 rounded-lg bg-[#1c2c3a] border border-white/20 text-white" value={quantity} onChange={e=>setQuantity(e.target.value)} placeholder="0.0" />
              </div>
              <div>
                <label className="block text-xs text-white/70 mb-1">Unit</label>
                <select value={unit} onChange={e=>setUnit(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-[#1c2c3a] border border-white/20 text-white">
                  <option>kg</option>
                  <option>pcs</option>
                  <option>L</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs text-white/70 mb-1">Cause</label>
              <select value={cause} onChange={e=>setCause(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-[#1c2c3a] border border-white/20 text-white">
                <option>Spoiled</option>
                <option>Over-prep</option>
                <option>Theft</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-white/70 mb-1">Staff</label>
              <input className="w-full px-3 py-2 rounded-lg bg-[#1c2c3a] border border-white/20 text-white" value={staff} onChange={e=>setStaff(e.target.value)} />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="pos-linked" checked={posLinked} onChange={e=>setPosLinked(e.target.checked)} className="accent-accent h-4 w-4" />
              <label htmlFor="pos-linked" className="text-xs text-white/70">POS Linked?</label>
            </div>
            <DialogFooter>
              <Button variant="secondary" type="button" onClick={() => setOpenLogWaste(false)}>
                Cancel
              </Button>
              <Button variant="accent" type="button" onClick={() => setOpenLogWaste(false)}>
                Save Entry
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* EXPORT SECTION */}
      <div className="fixed right-6 bottom-6 flex flex-col gap-2 z-40">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="default"
              size="lg"
              className="bg-accent text-primary relative group hover:bg-accent/80 transition-all w-60 text-nowrap px-2"
            >
              <Download className="mr-2" />
              Download Discrepancy Log (CSV)
              <span className="absolute inset-0 rounded-lg ring-accent transition-all pointer-events-none group-hover:ring-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" className="bg-accent border-accent-foreground text-primary">
            Export a snapshot of current waste and discrepancies
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="lg"
              className="bg-[#0D1A2B] text-white border-white/15 hover:bg-white/5 w-60 text-nowrap px-2"
            >
              <Download className="mr-2" />
              Download Waste Entries (CSV)
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" className="bg-accent border-accent-foreground text-primary">
            Export a snapshot of current waste and discrepancies
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

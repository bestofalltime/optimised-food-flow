
import { useState } from "react";
import { ChevronLeft, Download, Info, BarChart3, CircleAlert, AlertTriangle, CheckCircle2, MinusCircle } from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

// Mock data: each object is an ingredient’s yearly waste, simulated recommendations, and alert
const tableData = [
  {
    ingredient: "Chicken",
    icon: <BarChart3 className="text-red-400" />,
    waste2023: 18.3,
    waste2024: 26.1,
    diff: 7.8,
    percent: 43,
    forecast: "Reduce reorder by 12%",
    forecastColor: "text-red-400",
    alert: "🔴",
    menuLinks: ["Burger", "Chicken Wrap"],
    insight: "Chicken waste rose 43% compared to last year. Forecasting system recommends reducing reorder volume by 12%.",
    chartData: [2.1, 1.9, 2.4, 2.2, 2.6, 2.1, 1.8, 2.3, 2.7, 2.6, 1.8, 2.6],
    pdfDownload: true,
  },
  {
    ingredient: "Tomatoes",
    icon: <BarChart3 className="text-green-400" />,
    waste2023: 22.5,
    waste2024: 14.7,
    diff: -7.8,
    percent: -34,
    forecast: "Increase reorder by 6%",
    forecastColor: "text-green-400",
    alert: "🟢",
    menuLinks: ["Salad Bowl", "Tomato Soup"],
    insight: "Last year, 22.5 kg of tomatoes were wasted in Q2. This year, only 14.7 kg were used — a 34% improvement. You can increase ordering by up to 6% without risk.",
    chartData: [2.5, 2.4, 2.3, 1.3, 1.7, 1.4, 1.1, 1.3, 1.2, 1.8, 0.9, 1.8],
    pdfDownload: true,
  },
  {
    ingredient: "Beef",
    icon: <BarChart3 className="text-yellow-400" />,
    waste2023: 30.0,
    waste2024: 31.2,
    diff: 1.2,
    percent: 4,
    forecast: "Keep current volume",
    forecastColor: "text-yellow-400",
    alert: "🟡",
    menuLinks: ["Classic Burger", "Steak Special"],
    insight: "Beef waste rose 4% compared to last year. No major change needed. Forecasting system recommends keeping current reorder volume.",
    chartData: [2.6, 2.5, 2.7, 2.6, 2.9, 2.8, 2.7, 2.5, 2.6, 2.4, 2.7, 2.6],
    pdfDownload: true,
  }
];

// Filter state stubs for the mock UI only
const TIME_RANGES = [
  "This Month",
  "This Quarter",
  "This Year",
  "Last Year",
  "Custom Range",
];
const INGREDIENTS = ["Chicken", "Tomatoes", "Beef"];

export const VarianceForecast = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalIdx, setModalIdx] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState(TIME_RANGES[0]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(INGREDIENTS);
  const [showForecast, setShowForecast] = useState(true);

  // Fake notification for the Lettuce alert example (not in table data for demo)
  const showLettuceBanner = true;

  // Filtering (statically: always shows all for this demo, update as needed)
  const data = tableData.filter(row => selectedIngredients.includes(row.ingredient));

  return (
    <div className="relative flex flex-col md:flex-row md:gap-8">
      {/* Main Content Area */}
      <div className="w-full md:w-2/3 mx-auto">
        {/* Banner (if any) */}
        {showLettuceBanner && (
          <div className="mb-5 p-4 rounded-lg border border-red-600/40 bg-red-500/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="text-red-400" size={24} />
              <strong className="text-red-200">
                High waste trend detected for Lettuce compared to last year.
              </strong>
            </div>
            <button className="bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded-lg text-white font-medium text-sm transition" onClick={() => alert('Showing lettuce details...')}>
              View Detail
            </button>
          </div>
        )}
        {/* Back Button */}
        <button 
          className="flex items-center mb-6 text-accent hover:text-white transition"
          onClick={() => window.location.pathname = "/dashboard"}
        >
          <ChevronLeft className="mr-1" /> Dashboard
        </button>

        {/* Page Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-white mb-1">
            Variance Reports &amp; Forecasting
          </h1>
          <Button className="flex items-center gap-2" variant="outline" onClick={() => alert('Downloading PDF...')}>
            <Download size={18} />
            Download Report (PDF)
          </Button>
        </div>

        {/* Filter Bar */}
        <div className="bg-white/5 border border-white/10 rounded-xl mb-8 px-6 py-4 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Time Range Selector */}
            <div>
              <label htmlFor="timeRange" className="block text-xs text-white/80 mb-1">Time Range</label>
              <select
                id="timeRange"
                value={selectedTime}
                onChange={e => setSelectedTime(e.target.value)}
                className="bg-white/10 text-white rounded-lg px-3 py-2 border border-white/20 focus:outline-none"
              >
                {TIME_RANGES.map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            {/* Ingredient Multi-Select */}
            <div>
              <label className="block text-xs text-white/80 mb-1">Ingredients</label>
              <select
                multiple
                value={selectedIngredients}
                onChange={e => {
                  const opts = Array.from(e.target.selectedOptions).map(opt => opt.value);
                  setSelectedIngredients(opts.length ? opts : INGREDIENTS);
                }}
                className="bg-white/10 text-white rounded-lg px-3 py-2 border border-white/20 focus:outline-none min-w-[120px] h-[42px]"
              >
                {INGREDIENTS.map(ing => (
                  <option key={ing} value={ing}>{ing}</option>
                ))}
              </select>
            </div>
            {/* Forecast Toggle */}
            <div className="flex items-center gap-2 mt-2 md:mt-0">
              <input
                type="checkbox"
                id="showForecast"
                checked={showForecast}
                onChange={() => setShowForecast(!showForecast)}
                className="form-checkbox accent-accent"
              />
              <label htmlFor="showForecast" className="text-white/80 text-sm">Show Forecast Recommendations</label>
            </div>
          </div>
        </div>

        {/* Main Comparison Table */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h2 className="font-semibold text-xl text-white">YOY Waste Comparison</h2>
            <Tooltip>
              <Info size={16} />
              <span className="absolute left-10 w-[200px] z-50 bg-black/90 text-white text-xs p-2 rounded shadow-lg">
                Waste = logged quantity removed due to spoilage, over-prep, or POS discrepancy.<br />
                Forecast is based on previous year’s waste and usage history.
              </span>
            </Tooltip>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white">
                  Ingredient
                  <Tooltip>
                    <Info size={13} className="inline ml-1" />
                    <span className="absolute left-10 w-[140px] bg-black/90 text-white text-xs p-2 rounded shadow-lg">Ingredient or grouped category</span>
                  </Tooltip>
                </TableHead>
                <TableHead className="text-white">
                  Waste 2023
                  <Tooltip>
                    <Info size={13} className="inline ml-1" />
                    <span className="absolute left-10 w-[130px] bg-black/90 text-white text-xs p-2 rounded shadow-lg">Total waste last year (kg)</span>
                  </Tooltip>
                </TableHead>
                <TableHead className="text-white">
                  Waste 2024
                  <Tooltip>
                    <Info size={13} className="inline ml-1" />
                    <span className="absolute left-10 w-[130px] bg-black/90 text-white text-xs p-2 rounded shadow-lg">Total waste this year (kg)</span>
                  </Tooltip>
                </TableHead>
                <TableHead className="text-white">
                  Change
                  <Tooltip>
                    <Info size={13} className="inline ml-1" />
                    <span className="absolute left-10 w-[150px] bg-black/90 text-white text-xs p-2 rounded shadow-lg">% change year-over-year. Hover on % for kg delta.</span>
                  </Tooltip>
                </TableHead>
                {showForecast && (
                  <TableHead className="text-white">
                    Forecast Recommendation
                    <Tooltip>
                      <Info size={13} className="inline ml-1" />
                      <span className="absolute left-10 w-[180px] bg-black/90 text-white text-xs p-2 rounded shadow-lg">Based on waste delta trend</span>
                    </Tooltip>
                  </TableHead>
                )}
                <TableHead className="text-white">
                  Alert
                  <Tooltip>
                    <Info size={13} className="inline ml-1" />
                    <span className="absolute left-10 w-[110px] bg-black/90 text-white text-xs p-2 rounded shadow-lg">System risk alert</span>
                  </Tooltip>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, i) => (
                <TableRow 
                  key={row.ingredient}
                  className="cursor-pointer transition hover:bg-white/10"
                  onClick={() => { setShowModal(true); setModalIdx(i); }}
                >
                  <TableCell className="flex items-center gap-2 text-white font-medium">
                    {row.icon}
                    {row.ingredient}
                  </TableCell>
                  <TableCell className="text-white">{row.waste2023} kg</TableCell>
                  <TableCell className="text-white">{row.waste2024} kg</TableCell>
                  <TableCell>
                    <span 
                      className={`
                        font-bold
                        ${row.percent > 10 ? "text-red-400" : row.percent < -10 ? "text-green-400" : "text-yellow-400"}
                        group
                      `}
                    >
                      {row.percent > 0 ? "↑ " : row.percent < 0 ? "↓ " : ""}
                      {row.percent > 0 ? "+" : ""}{row.percent}%
                      <span className="group-hover:inline hidden relative z-10 bg-black/90 text-white px-2 py-1 text-xs rounded ml-2">{row.diff > 0 ? "+" : ""}{row.diff} kg</span>
                    </span>
                  </TableCell>
                  {showForecast && (
                  <TableCell>
                    <span className={`${row.forecastColor} font-semibold`}>{row.forecast}</span>
                  </TableCell>
                  )}
                  <TableCell>
                    <span className="text-2xl">{row.alert}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Forecast Insight Sidebar */}
      <aside className="hidden md:block md:w-1/3 pr-2 pt-8">
        {/* Sidebar content */}
        <div className="bg-accent/10 border border-accent/40 rounded-xl p-6 flex flex-col gap-5 shadow-lg">
          <h3 className="text-lg font-bold mb-2 text-accent">Forecast Insights</h3>
          <ul className="space-y-3">
            <li className="flex gap-2 items-start">
              <CircleAlert className="text-red-400 mt-1" /> 
              <span>
                <b>Chicken</b> projected to be <b>over-ordered by 14% next quarter</b>.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <CheckCircle2 className="text-green-400 mt-1" />
              <span>
                <b>Tomatoes</b> underused in 2024 — consider adjusting menu quantities.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <MinusCircle className="text-yellow-400 mt-1" />
              <span>
                <b>Beef</b> variance minimal, no major adjustment needed.
              </span>
            </li>
          </ul>
          <Button className="flex items-center gap-2 mt-3" onClick={() => alert('Download forecast sheet')}>
            <Download size={16} />
            Generate Full Forecast Sheet
          </Button>
        </div>
      </aside>

      {/* Row Modal */}
      {showModal && modalIdx !== null && (
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="max-w-lg">
            <div className="flex flex-col gap-4">
              {/* Ingredient & Icon */}
              <div className="flex items-center gap-3">
                {data[modalIdx].icon}
                <span className="text-xl font-bold text-white">{data[modalIdx].ingredient} Forecast Details</span>
              </div>

              {/* Chart Area */}
              <div className="bg-white/10 rounded-xl px-4 py-4 mb-2">
                <div className="text-xs text-white/70 mb-2">Waste over last 12 months (kg)</div>
                <div className="w-full h-32 flex items-end gap-1">
                  {/* Simple bar chart for visual (static) */}
                  {data[modalIdx].chartData.map((v, idx) => (
                    <div key={idx} className="bg-accent rounded-sm" style={{
                      height: `${16 + v * 14}px`,
                      width: "12px",
                      marginLeft: idx === 0 ? 0 : 2,
                      background: idx === 11 ? "#5eead4" : "#7dd3fc"
                    }} />
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-[10px] text-white/40">
                  <span>Jul '23</span><span>Jun '24</span>
                </div>
              </div>

              {/* POS Menu Links */}
              <div>
                <div className="text-xs text-white/70 mb-1">POS Linked Menu Items</div>
                <div className="flex gap-2 flex-wrap">
                  {data[modalIdx].menuLinks.map((m, i) => (
                    <span key={i} className="bg-white/10 px-2 py-1 rounded text-xs text-white">{m}</span>
                  ))}
                </div>
              </div>

              {/* Insight Text */}
              <div className="bg-accent/10 text-accent p-4 rounded-lg text-sm font-medium">{data[modalIdx].insight}</div>

              <Button className="flex gap-2 mt-2" onClick={() => alert('Download ingredient forecast')}>
                <Download size={16} /> Download Forecast PDF for {data[modalIdx].ingredient}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default VarianceForecast;

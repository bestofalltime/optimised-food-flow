
import { useState } from "react";
import { Info } from "lucide-react";

type Props = {
  data: Array<{
    ingredient: string;
    icon: string;
    waste2023: number;
    waste2024: number;
    unit: string;
    change: string;
    changeDelta: number;
    forecast: string;
    alert: { emoji: string; label: string };
    posItems: string[];
    chartData: any[];
  }>;
  forecastEnabled: boolean;
  setIngredientModal: (row: any) => void;
};

export function VarianceReportsForecastTable({
  data,
  forecastEnabled,
  setIngredientModal,
}: Props) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="w-full rounded-xl overflow-hidden ring-1 ring-white/10 backdrop-blur shadow-sm">
      <div className="bg-white/10 px-4 py-2 flex items-center gap-2">
        <span className="font-semibold">YOY Waste Comparison by Ingredient</span>
      </div>
      <table className="min-w-full text-sm md:text-base">
        <thead>
          <tr className="bg-white/5 text-white/90">
            <th className="text-left py-3 px-4">Ingredient</th>
            <th className="text-left px-2 py-3">
              <span className="inline-flex gap-1 items-center">
                Waste 2023
                <TooltipHover text="Waste = logged quantity removed due to spoilage, over-prep, or POS discrepancy">
                  <Info size={14} className="text-accent/70" />
                </TooltipHover>
              </span>
            </th>
            <th className="text-left px-2 py-3">
              <span className="inline-flex gap-1 items-center">
                Waste 2024
                <TooltipHover text="Waste = logged quantity removed due to spoilage, over-prep, or POS discrepancy">
                  <Info size={14} className="text-accent/70" />
                </TooltipHover>
              </span>
            </th>
            <th className="text-left px-2 py-3">
              <span className="inline-flex gap-1 items-center">
                Change (%)
                <TooltipHover text="Change from previous year's logged waste">
                  <Info size={14} className="text-accent/70" />
                </TooltipHover>
              </span>
            </th>
            {forecastEnabled && (
              <th className="text-left px-2 py-3">
                <span className="inline-flex gap-1 items-center">
                  Forecast Recommendation
                  <TooltipHover text="Forecast is based on previous year’s waste and usage history">
                    <Info size={14} className="text-accent/70" />
                  </TooltipHover>
                </span>
              </th>
            )}
            <th className="text-left px-2 py-3">
              <span className="inline-flex gap-1 items-center">
                Alert
                <TooltipHover text="Ingredient flagged for variance alert status">
                  <Info size={14} className="text-accent/70" />
                </TooltipHover>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={row.ingredient}
              className={`transition hover:bg-accent/10 cursor-pointer ${i % 2 === 0 ? "bg-white/5" : "bg-white/10"}`}
              onClick={() => setIngredientModal(row)}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <td className="py-2 px-4 flex items-center gap-2">
                <span className="text-xl">{row.icon}</span>
                {row.ingredient}
              </td>
              <td className="py-2 px-2">{row.waste2023} {row.unit}</td>
              <td className="py-2 px-2">{row.waste2024} {row.unit}</td>
              <td className="py-2 px-2 relative">
                <span
                  className={`font-semibold ${row.changeDelta > 10 ? "text-red-400" : row.changeDelta < -10 ? "text-green-400" : "text-yellow-300"}`}
                >
                  {row.change}
                </span>
                {hoveredIdx === i && (
                  <div className="absolute left-0 top-8 z-40 px-3 py-1.5 text-xs rounded shadow-lg bg-black/80 text-white font-medium pointer-events-none animate-fade-in">
                    {row.changeDelta > 0 ? "+" : ""}
                    {(row.waste2024 - row.waste2023).toFixed(1)} {row.unit} difference from last year
                  </div>
                )}
              </td>
              {forecastEnabled && (
                <td className="py-2 px-2 relative group">
                  <span className="font-medium">{row.forecast}</span>
                  <div className="hidden group-hover:block absolute left-0 top-8 z-40 px-3 py-1.5 text-xs rounded shadow-lg bg-black/80 text-white font-medium animate-fade-in">
                    Generated from past waste trends
                  </div>
                </td>
              )}
              <td className="py-2 px-2"><span className="inline-block mr-1 text-xl">{row.alert.emoji}</span>
                <span className="bg-white/5 rounded px-2 py-0.5 text-xs font-semibold">{row.alert.label}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Simple tooltip on hover for table headers.
function TooltipHover({ text, children }: { text: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <span
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      tabIndex={0}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      {open && (
        <span className="absolute left-1/2 -translate-x-1/2 top-6 z-50 px-3 py-1.5 text-xs rounded shadow-lg bg-black/70 text-white whitespace-pre font-medium animate-fade-in" style={{ minWidth: 140 }}>
          {text}
        </span>
      )}
    </span>
  );
}


import { AlertCircle, ArrowDownCircle, ArrowUpCircle } from "lucide-react";

export function VarianceForecastSidebar() {
  // Dummy high-impact ingredients
  const items = [
    {
      ingredient: "Chicken",
      emoji: "🔴",
      label: "High variance detected"
    },
    {
      ingredient: "Beef",
      emoji: "🟡",
      label: "Minimal change"
    },
    {
      ingredient: "Tomatoes",
      emoji: "🟢",
      label: "Major improvement"
    }
  ];

  return (
    <aside className="bg-white/5 rounded-2xl p-5 border border-white/10 shadow-sm flex flex-col gap-4 sticky top-20">
      <div>
        <div className="font-bold text-lg mb-2 text-white">High Impact Ingredients</div>
        <ul className="space-y-3">
          {items.map(item => (
            <li key={item.ingredient} className="flex items-center gap-3">
              <span className="text-2xl">{item.emoji}</span>
              <span className="font-semibold text-white">{item.ingredient}</span>
              <span className="text-xs px-2 py-0.5 rounded-lg bg-accent/20">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
      <button
        className="w-full mt-3 bg-accent text-primary font-bold rounded py-2 flex items-center justify-center gap-2"
        onClick={() => window.setTimeout(() => alert("Simulated PDF generation!"), 800)}
      >
        Generate Forecast Sheet (PDF)
      </button>
    </aside>
  );
}

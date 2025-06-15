
import { X, Loader2, FileDown } from "lucide-react";
import { useState } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import { toast } from "@/hooks/use-toast";

type Props = {
  ingredient: any;
  onClose: () => void;
};

export function VarianceReportsForecastModal({ ingredient, onClose }: Props) {
  const [downloading, setDownloading] = useState(false);
  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      toast({ title: "Ingredient forecast download started.", description: "A PDF forecast sheet will appear soon." });
    }, 1300);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4" onClick={onClose}>
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 w-full max-w-md relative shadow-lg"
           onClick={e => e.stopPropagation()}>
        <button
          className="absolute top-2 right-2 text-white/60 hover:text-white"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={24} />
        </button>
        <div className="flex flex-col items-center mb-4">
          <span className="text-3xl">{ingredient.icon}</span>
          <h3 className="text-xl font-semibold mb-1 text-white">{ingredient.ingredient}</h3>
        </div>
        <div className="mb-3 font-semibold text-white/80 text-base text-center">Monthly Waste: 2023 vs 2024</div>
        <div className="w-full h-48 bg-black/20 rounded mb-4 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ingredient.chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3b4252" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ background: "#212936", color: "#fff", border: "1px solid #333" }} />
              <Legend />
              <Line type="monotone" dataKey="y23" name="2023 Waste" stroke="#38bdf8" />
              <Line type="monotone" dataKey="y24" name="2024 Waste" stroke="#facc15" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mb-3 bg-white/10 p-3 rounded shadow-inner text-white/90 text-center">
          <span>
            {ingredient.ingredient} waste {ingredient.changeDelta > 0 ? "increased" : "decreased"} by {Math.abs(ingredient.changeDelta)}% from last year.<br />
            Forecast system recommends {ingredient.forecast.toLowerCase()}.
          </span>
        </div>
        <div className="mb-3">
          <span className="font-medium text-white/80">Menu Items Linked:</span>
          <div className="flex flex-wrap gap-2 mt-1">
            {ingredient.posItems.map((item: string) => (
              <span key={item} className="px-2 py-1 rounded bg-white/10 border border-white/10 text-xs font-semibold text-white">{item}</span>
            ))}
          </div>
        </div>
        <button
          className="w-full bg-accent text-primary flex items-center justify-center gap-2 font-bold rounded py-2 mt-2 transition disabled:opacity-60"
          onClick={handleDownload}
          disabled={downloading}
        >
          {downloading ? <Loader2 className="animate-spin" size={18} /> : <FileDown size={18} />}
          Download Forecast Report (PDF)
        </button>
      </div>
    </div>
  );
}

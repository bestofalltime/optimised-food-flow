
import { useState } from "react";
import { VarianceReportsForecastFilterBar } from "@/components/VarianceReportsForecastFilterBar";
import { VarianceReportsForecastTable } from "@/components/VarianceReportsForecastTable";
import { VarianceReportsForecastModal } from "@/components/VarianceReportsForecastModal";
import { VarianceForecastSidebar } from "@/components/VarianceForecastSidebar";
import { Loader2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

// Dummy table data
const dummyTable = [
  {
    ingredient: "Chicken",
    icon: "🍗",
    waste2023: 18.3,
    waste2024: 26.1,
    unit: "kg",
    change: "+43%",
    changeDelta: 43,
    forecast: "Reduce reorder by 12%",
    alert: { emoji: "🔴", label: "High" },
    posItems: ["Burger", "Chicken Wrap"],
    chartData: [
      { month: "Jul", y23: 1.2, y24: 2.0 },
      { month: "Aug", y23: 1.3, y24: 1.7 },
      { month: "Sep", y23: 1.5, y24: 1.9 },
      { month: "Oct", y23: 1.6, y24: 2.4 },
      { month: "Nov", y23: 1.8, y24: 2.2 },
      { month: "Dec", y23: 2.5, y24: 3.1 },
      { month: "Jan", y23: 2.7, y24: 2.4 },
      { month: "Feb", y23: 2.3, y24: 2.8 },
      { month: "Mar", y23: 2.1, y24: 2.4 },
      { month: "Apr", y23: 1.8, y24: 2.1 },
      { month: "May", y23: 1.2, y24: 1.8 },
      { month: "Jun", y23: 1.4, y24: 1.3 },
    ],
  },
  {
    ingredient: "Tomatoes",
    icon: "🍅",
    waste2023: 22.5,
    waste2024: 14.7,
    unit: "kg",
    change: "-34%",
    changeDelta: -34,
    forecast: "Increase reorder by 5%",
    alert: { emoji: "🟢", label: "Improved" },
    posItems: ["Salad", "Chicken Wrap"],
    chartData: [
      { month: "Jul", y23: 1.9, y24: 1.4 },
      { month: "Aug", y23: 2.4, y24: 1.6 },
      { month: "Sep", y23: 2.1, y24: 1.5 },
      { month: "Oct", y23: 2.2, y24: 1.3 },
      { month: "Nov", y23: 2.3, y24: 1.2 },
      { month: "Dec", y23: 1.9, y24: 1.1 },
      { month: "Jan", y23: 1.8, y24: 1.3 },
      { month: "Feb", y23: 1.6, y24: 1.2 },
      { month: "Mar", y23: 1.5, y24: 1.1 },
      { month: "Apr", y23: 1.2, y24: 1.0 },
      { month: "May", y23: 1.0, y24: 1.0 },
      { month: "Jun", y23: 1.5, y24: 1.0 },
    ],
  },
  {
    ingredient: "Beef",
    icon: "🥩",
    waste2023: 30.0,
    waste2024: 31.2,
    unit: "kg",
    change: "+4%",
    changeDelta: 4,
    forecast: "Keep current volume",
    alert: { emoji: "🟡", label: "Neutral" },
    posItems: ["Burger"],
    chartData: [
      { month: "Jul", y23: 2.5, y24: 2.6 },
      { month: "Aug", y23: 2.6, y24: 2.8 },
      { month: "Sep", y23: 2.7, y24: 2.7 },
      { month: "Oct", y23: 2.6, y24: 2.7 },
      { month: "Nov", y23: 2.5, y24: 2.6 },
      { month: "Dec", y23: 2.7, y24: 2.7 },
      { month: "Jan", y23: 2.6, y24: 2.7 },
      { month: "Feb", y23: 2.5, y24: 2.6 },
      { month: "Mar", y23: 2.6, y24: 2.7 },
      { month: "Apr", y23: 2.4, y24: 2.5 },
      { month: "May", y23: 2.2, y24: 2.4 },
      { month: "Jun", y23: 2.7, y24: 2.7 },
    ],
  },
];

export default function VarianceReportsForecastPage() {
  const [forecastEnabled, setForecastEnabled] = useState(true);
  const [ingredientModal, setIngredientModal] = useState<null | typeof dummyTable[0]>(null);
  const [loadingMainPdf, setLoadingMainPdf] = useState(false);
  const [selectedTime, setSelectedTime] = useState("This Month");
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const navigate = useNavigate();

  const filteredData = dummyTable.filter(
    (r) =>
      selectedIngredients.length === 0 || selectedIngredients.includes(r.ingredient)
  );

  const handleDownload = () => {
    setLoadingMainPdf(true);
    setTimeout(() => {
      setLoadingMainPdf(false);
      toast({ title: "Download started!", description: "Full variance report PDF will appear soon." });
    }, 1400);
  };

  return (
    <div className="bg-[#0D1A2B] min-h-screen flex flex-col items-stretch text-white font-inter">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between p-4 md:p-8 gap-2 md:gap-0">
        <button
          className="flex items-center gap-2 text-accent px-2 py-1 hover:underline"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft size={20} /> Back to Dashboard
        </button>
        <div className="flex-1 flex items-center justify-center">
          <h1 className="text-2xl md:text-3xl font-bold">
            Variance Reports &amp; Forecasting
          </h1>
        </div>
        <button
          className="bg-accent text-primary font-semibold px-4 py-2 rounded-md flex items-center gap-2 shadow-lg relative"
          onClick={handleDownload}
          disabled={loadingMainPdf}
          aria-label="Export this full table as a PDF for print or email"
        >
          {loadingMainPdf ? <Loader2 className="animate-spin" size={18} /> : null}
          Download Full Report (PDF)
        </button>
      </div>
      {/* Filters */}
      <VarianceReportsForecastFilterBar
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        selectedIngredients={selectedIngredients}
        setSelectedIngredients={setSelectedIngredients}
        forecastEnabled={forecastEnabled}
        setForecastEnabled={setForecastEnabled}
      />
      <div className="flex flex-1 gap-4 w-full px-2 md:px-8 pb-12">
        <div className="flex-1">
          {/* Table section */}
          <div className="pb-2">
            <h2 className="text-lg md:text-xl font-semibold mb-2 mt-4">
              YOY Waste Comparison by Ingredient
            </h2>
            <VarianceReportsForecastTable
              data={filteredData}
              forecastEnabled={forecastEnabled}
              setIngredientModal={setIngredientModal}
            />
          </div>
        </div>
        {/* Sidebar */}
        <div className="hidden lg:block w-[340px] shrink-0">
          <VarianceForecastSidebar />
        </div>
      </div>
      {/* Modal */}
      {ingredientModal && (
        <VarianceReportsForecastModal
          ingredient={ingredientModal}
          onClose={() => setIngredientModal(null)}
        />
      )}
    </div>
  );
}

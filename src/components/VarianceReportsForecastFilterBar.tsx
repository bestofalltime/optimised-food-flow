
import { ChevronDown, X } from "lucide-react";

type Props = {
  selectedTime: string;
  setSelectedTime: (v: string) => void;
  selectedIngredients: string[];
  setSelectedIngredients: (v: string[]) => void;
  forecastEnabled: boolean;
  setForecastEnabled: (v: boolean) => void;
};

const timeOptions = [
  "This Month",
  "This Quarter",
  "This Year",
  "Last Year",
  "Custom Range",
];

const ingredientOptions = ["Chicken", "Lettuce", "Cheese", "Tomatoes", "Beef"];

export function VarianceReportsForecastFilterBar({
  selectedTime,
  setSelectedTime,
  selectedIngredients,
  setSelectedIngredients,
  forecastEnabled,
  setForecastEnabled,
}: Props) {
  // Custom dropdowns using headless popover for demo simplicity
  return (
    <div className="w-full px-2 md:px-8 mb-2">
      <div className="flex flex-wrap gap-2 md:gap-4 items-center py-2 rounded-lg backdrop-blur bg-white/5">
        {/* TIME SELECTOR */}
        <div className="relative group">
          <button className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded text-white text-sm font-medium" tabIndex={0}>
            <span>{selectedTime}</span>
            <ChevronDown size={16} />
          </button>
          <div className="absolute left-0 mt-1 hidden group-hover:block group-focus-within:block z-30 bg-background shadow-lg rounded-md overflow-hidden min-w-[165px] border border-white/10">
            {timeOptions.map((opt) => (
              <button
                className={`w-full text-left px-3 py-2 hover:bg-accent/10 text-white text-sm ${selectedTime === opt ? "bg-accent/20" : ""}`}
                key={opt}
                onClick={() => setSelectedTime(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* INGREDIENT SELECTOR */}
        <div className="relative group">
          <button className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded text-white text-sm font-medium" tabIndex={0}>
            {selectedIngredients.length === 0
              ? <span>Select Ingredient(s)</span>
              : (
                <span>
                  {selectedIngredients.map((i) => (
                    <span key={i} className="inline-flex items-center ml-1 bg-accent/20 px-2 py-0.5 rounded text-xs font-semibold">
                      {i}
                      <button type="button" onClick={e => {
                        e.stopPropagation();
                        setSelectedIngredients(selectedIngredients.filter(name => name !== i));
                      }} className="pl-1 -mr-0.5 text-accent hover:text-red-500">
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </span>
              )}
            <ChevronDown size={16} />
          </button>
          <div className="absolute left-0 mt-1 hidden group-hover:block group-focus-within:block z-30 bg-background shadow-lg rounded-md overflow-hidden min-w-[165px] border border-white/10 max-h-64 overflow-y-auto">
            {ingredientOptions.map((opt) => (
              <label
                key={opt}
                className="flex items-center gap-2 px-3 py-2 hover:bg-accent/10 cursor-pointer text-white text-sm"
              >
                <input
                  type="checkbox"
                  checked={selectedIngredients.includes(opt)}
                  onChange={() => setSelectedIngredients(
                    selectedIngredients.includes(opt)
                      ? selectedIngredients.filter((name) => name !== opt)
                      : [...selectedIngredients, opt]
                  )}
                  className="accent-accent"
                />
                {opt}
              </label>
            ))}
          </div>
        </div>

        {/* FORECAST TOGGLE */}
        <label className="flex items-center gap-2 cursor-pointer ml-2 px-2">
          <input
            type="checkbox"
            checked={forecastEnabled}
            onChange={() => setForecastEnabled(!forecastEnabled)}
            className="accent-accent"
          />
          <span className="select-none text-sm">Show Forecast Recommendations</span>
        </label>
      </div>
    </div>
  );
}

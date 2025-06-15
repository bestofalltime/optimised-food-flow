import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const categories = ["Produce", "Meat", "Dairy", "Bakery", "Other"];
const units = ["kg", "g", "L", "pcs"];

export default function StepIngredients({
  value,
  onNext,
  onPrev,
}: {
  value?: any[];
  onNext: (data: any[]) => void;
  onPrev: () => void;
}) {
  const [ingredients, setIngredients] = useState(value?.length ? value : []);
  const [manualRows, setManualRows] = useState(ingredients.length ? ingredients : [
    { name: "", category: "", unit: "", cost: "", expiry: "", reorder: "" },
  ]);
  const [uploadPreview, setUploadPreview] = useState<any[]>([]);
  const [useUpload, setUseUpload] = useState(false);
  const [csvError, setCsvError] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
      try {
        // Parse CSV: name,category,unit,cost,expiry,reorder
        const lines = (evt.target?.result as string).split("\n").filter(r => !!r.trim());
        const result = lines
          .slice(1)
          .map(row => {
            const [name, category, unit, cost, expiry, reorder] = row.split(",");
            return { name, category, unit, cost, expiry, reorder };
          });
        setUploadPreview(result);
        setCsvError("");
      } catch {
        setCsvError("Could not parse file – check the template format!");
      }
    };
    reader.readAsText(file);
  };

  function handleAddRow() {
    setManualRows(rows => [
      ...rows,
      { name: "", category: "", unit: "", cost: "", expiry: "", reorder: "" },
    ]);
  }
  function handleManualChange(idx: number, field: string, value: string) {
    setManualRows(rows =>
      rows.map((row, i) => (i === idx ? { ...row, [field]: value } : row))
    );
  }
  const manualValid = manualRows.every(r => r.name && r.category && r.unit && r.cost && r.expiry && r.reorder);

  function handleContinue(e: React.FormEvent) {
    e.preventDefault();
    if (useUpload) {
      onNext(uploadPreview); // Pass whatever's in the preview, even if empty
    } else {
      onNext(manualRows); // Pass whatever's in manualRows, even if incomplete
    }
  }

  function downloadTemplate() {
    const csv =
      "name,category,unit,cost,expiry,reorder\nTomato,Produce,kg,2.50,7,5\nSteak,Meat,kg,15,10,2\n";
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "optimised-ingredients-template.csv";
    link.click();
  }

  return (
    <form onSubmit={handleContinue} className="flex flex-col gap-8">
      <div className="flex flex-col md:flex-row gap-6">
        <div className={`flex-1 bg-white/10 rounded-xl p-4 shadow-lg ${useUpload ? "opacity-50" : ""}`}>
          <label className="font-bold text-white mb-2 block">Manual Entry</label>
          <div className="space-y-3">
            {manualRows.map((row, idx) => (
              <div key={idx} className="flex flex-col md:flex-row gap-3">
                <Input
                  className="bg-white border-[#3CE8B3] focus:border-[#3CE8B3] text-base"
                  placeholder="Ingredient Name"
                  value={row.name}
                  onChange={e => handleManualChange(idx, "name", e.target.value)}
                  required
                />
                <select
                  className="rounded-md px-2 py-2 border border-[#3CE8B3] bg-white text-gray-700 text-base"
                  value={row.category}
                  onChange={e => handleManualChange(idx, "category", e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Category
                  </option>
                  {categories.map(c => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <select
                  className="rounded-md px-2 py-2 border border-[#3CE8B3] bg-white text-gray-700 text-base"
                  value={row.unit}
                  onChange={e => handleManualChange(idx, "unit", e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Unit
                  </option>
                  {units.map(u => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
                <Input
                  type="number"
                  step="any"
                  min={0}
                  className="bg-white border-[#3CE8B3] focus:border-[#3CE8B3] text-base"
                  placeholder="Cost per Unit"
                  value={row.cost}
                  onChange={e => handleManualChange(idx, "cost", e.target.value)}
                  required
                />
                <Input
                  type="number"
                  min={0}
                  className="bg-white border-[#3CE8B3] focus:border-[#3CE8B3] text-base"
                  placeholder="Expiry Threshold (days)"
                  value={row.expiry}
                  onChange={e => handleManualChange(idx, "expiry", e.target.value)}
                  required
                />
                <Input
                  type="number"
                  min={0}
                  className="bg-white border-[#3CE8B3] focus:border-[#3CE8B3] text-base"
                  placeholder="Reorder Level"
                  value={row.reorder}
                  onChange={e => handleManualChange(idx, "reorder", e.target.value)}
                  required
                />
              </div>
            ))}
            <Button
              type="button"
              className="bg-[#3CE8B3] hover:bg-[#37d9a6] text-white font-bold px-4 py-2 rounded-lg mt-1"
              onClick={handleAddRow}
            >
              + Add Another Ingredient
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center py-4">
          <div className="text-teal-400 font-bold mb-2">OR</div>
          <Button
            type="button"
            variant={useUpload ? "default" : "outline"}
            className="border-2 border-[#3CE8B3] text-teal-200 font-semibold hover:bg-[#3CE8B3]/20"
            onClick={() => setUseUpload(u => !u)}
          >
            {useUpload ? "Manual Entry" : "Upload CSV"}
          </Button>
        </div>
        <div className={`flex-1 bg-white/10 rounded-xl p-4 shadow-lg ${!useUpload ? "opacity-50" : ""}`}>
          <label className="font-bold text-white mb-2 block">CSV Upload</label>
          <Button
            type="button"
            className="mb-3 bg-[#3CE8B3] hover:bg-[#37d9a6] py-1 text-white font-semibold"
            onClick={downloadTemplate}
          >
            Download Template
          </Button>
          <Input
            type="file"
            accept=".csv"
            className="bg-white border-[#3CE8B3] mb-2"
            onChange={handleFileUpload}
            disabled={!useUpload}
          />
          {csvError && <div className="text-red-500 text-xs">{csvError}</div>}
          {uploadPreview.length > 0 && (
            <div className="mt-2 text-gray-200 text-sm">
              <strong>Preview:</strong>
              <ul>
                {uploadPreview.slice(0, 4).map((row, idx) => (
                  <li key={idx}>
                    {row.name} — {row.category} — {row.unit} — {row.cost}$
                  </li>
                ))}
                {uploadPreview.length > 4 && (
                  <li>…(+{uploadPreview.length - 4} more)</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onPrev}
          className="font-bold text-white border-white hover:bg-white/10"
        >
          Back
        </Button>
        <Button
          type="submit"
          className="bg-[#3CE8B3] hover:bg-[#37d9a6] text-white font-bold px-8 py-2 rounded-lg"
        >
          Continue
        </Button>
      </div>
    </form>
  );
}

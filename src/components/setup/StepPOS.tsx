
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const OPTIONS = [
  { label: "POSRocket (Lebanon)", value: "posrocket", apiKey: true },
  { label: "SnapSystems", value: "snap", apiKey: true },
  { label: "PointCheckout", value: "pointcheckout", apiKey: false },
  { label: "Other", value: "other", apiKey: false },
];

export default function StepPOS({
  value,
  onNext,
}: {
  value?: any;
  onNext: (data: any) => void;
}) {
  const [pos, setPOS] = useState(value?.provider || "");
  const [posName, setPOSName] = useState(value?.customName || "");
  const [apiKey, setAPIKey] = useState(value?.apiKey || "");
  const [skip, setSkip] = useState(value?.skip || false);

  const found = OPTIONS.find(o => o.value === pos);
  const showAPIKey = found && found.apiKey;
  const error = !skip && !pos;

  function handleContinue(e: React.FormEvent) {
    e.preventDefault();
    onNext({
      provider: pos,
      customName: pos === "other" ? posName : "",
      apiKey: showAPIKey ? apiKey : "",
      skip,
    });
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleContinue}>
      <div>
        <label className="text-base font-semibold text-white mb-2 block">Select your POS provider</label>
        <select
          className={`w-full px-3 py-3 rounded-lg border ${
            error ? "border-red-500" : "border-[#3CE8B3]"
          } focus:outline-none focus:border-[#3CE8B3] bg-white text-gray-900 font-medium`}
          value={pos}
          onChange={e => {
            setPOS(e.target.value);
            setPOSName("");
            setAPIKey("");
            setSkip(false);
          }}
        >
          <option value="" disabled>
            -- Choose --
          </option>
          {OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && (
          <div className="text-red-500 text-xs mt-1">Required</div>
        )}
        {pos === "other" && (
          <Input
            className="mt-3 bg-white border-[#3CE8B3] focus:border-[#3CE8B3] text-base"
            placeholder="Enter POS name"
            value={posName}
            onChange={e => setPOSName(e.target.value)}
            required
          />
        )}
        {showAPIKey && (
          <Input
            className="mt-3 bg-white border-[#3CE8B3] focus:border-[#3CE8B3] text-base"
            placeholder="API Key (optional)"
            value={apiKey}
            onChange={e => setAPIKey(e.target.value)}
          />
        )}
      </div>
      <div className="flex items-center gap-4">
        <input
          id="skip-step"
          type="checkbox"
          checked={skip}
          onChange={() => setSkip(s => !s)}
          className="accent-[#3CE8B3] scale-125"
        />
        <label htmlFor="skip-step" className="text-teal-200 text-base cursor-pointer">
          Skip this step
        </label>
      </div>
      <div className="flex flex-row justify-end gap-2 mt-2">
        <Button
          type="submit"
          className="bg-[#3CE8B3] hover:bg-[#37d9a6] text-white font-bold py-2 px-6 rounded-lg transition"
        >
          Continue
        </Button>
      </div>
    </form>
  );
}

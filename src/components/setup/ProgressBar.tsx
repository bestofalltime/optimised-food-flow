
import React from "react";
export default function ProgressBar({
  step,
  steps,
  labels,
}: { step: number; steps: number; labels: string[] }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between gap-4">
        {labels.map((label, idx) => (
          <div key={label} className="flex flex-col items-center flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-lg ${
                idx === step
                  ? "bg-[#3CE8B3] shadow-xl text-[#0D1A2B]"
                  : "bg-gray-700"
              }`}
            >
              {idx + 1}
            </div>
            <span
              className={`mt-2 text-xs font-medium ${
                idx === step ? "text-teal-400" : "text-gray-300"
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
      <div className="relative mt-2 mb-3 h-2">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gray-800 rounded-full" />
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#3CE8B3] rounded-full transition-all"
          style={{ width: `${((step + 1) / steps) * 100}%`, maxWidth: "100%" }}
        />
      </div>
      <div className="text-right text-xs text-gray-400 font-mono">{`Step ${step + 1} / ${steps}`}</div>
    </div>
  );
}

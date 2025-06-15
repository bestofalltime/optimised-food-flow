
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const roles = ["Manager", "Inventory Staff", "Viewer"];

export default function StepTeam({
  value,
  onNext,
  onPrev,
}: {
  value?: any[];
  onNext: (data: any[]) => void;
  onPrev: () => void;
}) {
  const [rows, setRows] = useState(
    value && value.length
      ? value
      : [
          {
            name: "",
            email: "",
            role: roles[0],
            welcome: true,
          },
        ]
  );

  function handleChange(idx: number, field: string, value: any) {
    setRows(rows =>
      rows.map((r, i) => (i === idx ? { ...r, [field]: value } : r))
    );
  }

  function addRow() {
    setRows(rows => [
      ...rows,
      { name: "", email: "", role: roles[0], welcome: true },
    ]);
  }
  function handleContinue(e: React.FormEvent) {
    e.preventDefault();
    onNext(rows);
  }

  const allFilled = rows.every(r => r.name && r.email && r.role);

  return (
    <form onSubmit={handleContinue} className="flex flex-col gap-8">
      <label className="font-bold text-white mb-4 block">
        Add team members
      </label>
      <div className="space-y-4">
        {rows.map((row, i) => (
          <div key={i} className="flex flex-col md:flex-row bg-white/10 rounded-xl shadow-lg p-4 items-center gap-4">
            <Input
              className="bg-white border-[#3CE8B3] focus:border-[#3CE8B3] text-base"
              placeholder="Full Name"
              value={row.name}
              onChange={e => handleChange(i, "name", e.target.value)}
              required
            />
            <Input
              type="email"
              className="bg-white border-[#3CE8B3] focus:border-[#3CE8B3] text-base"
              placeholder="Email"
              value={row.email}
              onChange={e => handleChange(i, "email", e.target.value)}
              required
            />
            <select
              className="rounded-md px-2 py-2 border border-[#3CE8B3] bg-white text-gray-700 text-base"
              value={row.role}
              onChange={e => handleChange(i, "role", e.target.value)}
              required
            >
              {roles.map(role => (
                <option key={role}>{role}</option>
              ))}
            </select>
            <div className="flex items-center ml-2">
              <input
                type="checkbox"
                checked={row.welcome}
                onChange={e => handleChange(i, "welcome", e.target.checked)}
                className="accent-[#3CE8B3] scale-110"
                id={`welcome-${i}`}
              />
              <label htmlFor={`welcome-${i}`} className="ml-1 text-teal-100">
                Send Welcome Email
              </label>
            </div>
          </div>
        ))}
        <Button
          type="button"
          onClick={addRow}
          className="bg-[#3CE8B3] hover:bg-[#37d9a6] text-white font-bold px-4 py-2 rounded-lg"
        >
          + Add Another Member
        </Button>
      </div>
      <div className="flex flex-row justify-between mt-5">
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
          disabled={!allFilled}
        >
          Launch Dashboard
        </Button>
      </div>
    </form>
  );
}

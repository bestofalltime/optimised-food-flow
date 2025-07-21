
import { Home, ListCheck, ArrowDown, Plus, FileText, Users } from "lucide-react";

const actions = [
  { icon: Home, label: "View Inventory" },
  { icon: ArrowDown, label: "Log Waste" },
  { icon: ListCheck, label: "Variance Report" },
  { icon: FileText, label: "Generate Order Plan" },
  { icon: Users, label: "Manage Team" }
];

export function QuickActionsGrid() {
  return (
    <div>
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
          {actions.map((a, i) => {
            const Icon = a.icon;
            return (
              <button
                key={i}
                className="flex flex-col items-center justify-center gap-2 bg-dark border border-white/10 rounded-xl py-4 lg:py-6 hover:bg-white/10 transition group"
                onClick={() => {}} // Stub: would open modal/switch page
                tabIndex={0}
              >
                <div className="bg-accent/10 rounded-full mb-1 lg:mb-2 p-2 group-hover:bg-accent/40 transition">
                  <Icon size={20} className="text-accent lg:w-6 lg:h-6" />
                </div>
                <span className="text-xs lg:text-sm text-white/90 font-medium text-center px-1">{a.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

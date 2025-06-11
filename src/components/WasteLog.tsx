
import { useState } from "react";
import { Plus, Trash2, Download, Calendar, User, DollarSign } from "lucide-react";

interface WasteEntry {
  id: string;
  itemName: string;
  quantity: number;
  unit: string;
  cause: "spoilage" | "theft" | "over-prep" | "contamination" | "other";
  staffName: string;
  dateTime: string;
  cost: number;
  notes: string;
  category: string;
}

const mockWasteData: WasteEntry[] = [
  {
    id: "1",
    itemName: "Lettuce",
    quantity: 2.5,
    unit: "kg",
    cause: "spoilage",
    staffName: "Sarah Johnson",
    dateTime: "2024-06-11 09:30",
    cost: 13.75,
    notes: "Found wilted during morning inspection",
    category: "Vegetables"
  },
  {
    id: "2",
    itemName: "Chicken Breast",
    quantity: 1.2,
    unit: "kg",
    cause: "contamination",
    staffName: "Mike Chen",
    dateTime: "2024-06-11 14:15",
    cost: 15.00,
    notes: "Cross-contamination incident",
    category: "Meat"
  },
  {
    id: "3",
    itemName: "Milk",
    quantity: 0.5,
    unit: "L",
    cause: "spoilage",
    staffName: "Anna Rodriguez",
    dateTime: "2024-06-10 16:45",
    cost: 1.75,
    notes: "Expired yesterday",
    category: "Dairy"
  },
  {
    id: "4",
    itemName: "Bread Rolls",
    quantity: 8.0,
    unit: "pieces",
    cause: "over-prep",
    staffName: "Tom Wilson",
    dateTime: "2024-06-10 21:30",
    cost: 6.40,
    notes: "Prepared too many for dinner service",
    category: "Bakery"
  }
];

export const WasteLog = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [causeFilter, setCauseFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredData = mockWasteData.filter(entry => {
    const matchesCause = causeFilter === "all" || entry.cause === causeFilter;
    return matchesCause;
  });

  const totalWasteCost = filteredData.reduce((sum, entry) => sum + entry.cost, 0);
  const totalWasteQuantity = filteredData.reduce((sum, entry) => sum + entry.quantity, 0);

  const getCauseColor = (cause: string) => {
    switch (cause) {
      case "spoilage":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      case "theft":
        return "bg-purple-500/20 text-purple-300 border-purple-500/30";
      case "over-prep":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "contamination":
        return "bg-orange-500/20 text-orange-300 border-orange-500/30";
      case "other":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      default:
        return "bg-accent/20 text-accent border-accent/30";
    }
  };

  const wasteByCategory = filteredData.reduce((acc, entry) => {
    acc[entry.category] = (acc[entry.category] || 0) + entry.cost;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Waste Log</h1>
        <div className="flex space-x-3">
          <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Download size={20} />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-accent hover:bg-accent/80 text-primary px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus size={20} />
            <span>Log Waste</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-2">
            <DollarSign className="text-accent" size={24} />
            <h3 className="text-lg font-semibold text-white">Total Cost</h3>
          </div>
          <div className="text-3xl font-bold text-accent">${totalWasteCost.toFixed(2)}</div>
          <p className="text-white/70 text-sm">This period</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-2">
            <Trash2 className="text-red-400" size={24} />
            <h3 className="text-lg font-semibold text-white">Total Entries</h3>
          </div>
          <div className="text-3xl font-bold text-red-400">{filteredData.length}</div>
          <p className="text-white/70 text-sm">Waste incidents</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-2">
            <Calendar className="text-yellow-400" size={24} />
            <h3 className="text-lg font-semibold text-white">Avg Per Day</h3>
          </div>
          <div className="text-3xl font-bold text-yellow-400">${(totalWasteCost / 7).toFixed(2)}</div>
          <p className="text-white/70 text-sm">Daily average</p>
        </div>

        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-2">
            <User className="text-blue-400" size={24} />
            <h3 className="text-lg font-semibold text-white">Most Common</h3>
          </div>
          <div className="text-lg font-bold text-blue-400 capitalize">
            {filteredData.reduce((acc, entry) => {
              acc[entry.cause] = (acc[entry.cause] || 0) + 1;
              return acc;
            }, {} as Record<string, number>)}
          </div>
          <p className="text-white/70 text-sm">Waste cause</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-accent"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>

          <select
            value={causeFilter}
            onChange={(e) => setCauseFilter(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-accent"
          >
            <option value="all">All Causes</option>
            <option value="spoilage">Spoilage</option>
            <option value="theft">Theft</option>
            <option value="over-prep">Over-preparation</option>
            <option value="contamination">Contamination</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* Waste Entries Table */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Item</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Quantity</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Cause</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Staff</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Date/Time</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Cost</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Notes</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((entry, index) => (
                <tr key={entry.id} className={`border-t border-white/10 ${index % 2 === 0 ? 'bg-white/5' : ''}`}>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-white">{entry.itemName}</div>
                      <div className="text-sm text-white/70">{entry.category}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white">{entry.quantity} {entry.unit}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getCauseColor(entry.cause)}`}>
                      {entry.cause.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white">{entry.staffName}</td>
                  <td className="px-6 py-4 text-white/70">{entry.dateTime}</td>
                  <td className="px-6 py-4 text-accent font-medium">${entry.cost.toFixed(2)}</td>
                  <td className="px-6 py-4 text-white/70 max-w-xs truncate">{entry.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Waste by Category Chart */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Waste by Category</h3>
        <div className="space-y-3">
          {Object.entries(wasteByCategory).map(([category, cost]) => (
            <div key={category} className="flex items-center justify-between">
              <span className="text-white">{category}</span>
              <div className="flex items-center space-x-3">
                <div className="w-32 bg-white/10 rounded-full h-2">
                  <div
                    className="bg-accent h-2 rounded-full"
                    style={{ width: `${(cost / totalWasteCost) * 100}%` }}
                  ></div>
                </div>
                <span className="text-accent font-medium w-16 text-right">${cost.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

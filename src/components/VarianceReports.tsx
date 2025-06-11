
import { useState } from "react";
import { FileText, Download, Filter, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";

interface VarianceItem {
  id: string;
  itemName: string;
  expectedUsage: number;
  actualUsage: number;
  variance: number;
  variancePercent: number;
  category: string;
  lastUpdated: string;
  staffComments: string[];
  status: "high" | "moderate" | "normal";
}

const mockVarianceData: VarianceItem[] = [
  {
    id: "1",
    itemName: "Chicken Breast",
    expectedUsage: 12.0,
    actualUsage: 15.2,
    variance: 3.2,
    variancePercent: 26.7,
    category: "Meat",
    lastUpdated: "2024-06-11 14:30",
    staffComments: ["Large catering order", "Higher demand than usual"],
    status: "moderate"
  },
  {
    id: "2",
    itemName: "Cheese",
    expectedUsage: 8.5,
    actualUsage: 12.8,
    variance: 4.3,
    variancePercent: 50.6,
    category: "Dairy",
    lastUpdated: "2024-06-11 16:15",
    staffComments: ["Possible theft", "Need investigation"],
    status: "high"
  },
  {
    id: "3",
    itemName: "Lettuce",
    expectedUsage: 6.0,
    actualUsage: 5.8,
    variance: -0.2,
    variancePercent: -3.3,
    category: "Vegetables",
    lastUpdated: "2024-06-11 12:45",
    staffComments: [],
    status: "normal"
  },
  {
    id: "4",
    itemName: "Tomatoes",
    expectedUsage: 10.2,
    actualUsage: 13.1,
    variance: 2.9,
    variancePercent: 28.4,
    category: "Vegetables",
    lastUpdated: "2024-06-11 15:20",
    staffComments: ["Weekend rush", "Special promotion running"],
    status: "moderate"
  }
];

export const VarianceReports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("today");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState<VarianceItem | null>(null);

  const filteredData = mockVarianceData.filter(item => {
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    return matchesCategory;
  });

  const getVarianceColor = (status: string) => {
    switch (status) {
      case "high":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      case "moderate":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "normal":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      default:
        return "bg-accent/20 text-accent border-accent/30";
    }
  };

  const VarianceIcon = ({ variance }: { variance: number }) => {
    if (variance > 0) {
      return <TrendingUp size={16} className="text-red-400" />;
    } else if (variance < 0) {
      return <TrendingDown size={16} className="text-green-400" />;
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Variance Reports</h1>
        <div className="flex space-x-3">
          <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Download size={20} />
            <span>Export PDF</span>
          </button>
          <button className="bg-accent hover:bg-accent/80 text-primary px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <FileText size={20} />
            <span>Generate Report</span>
          </button>
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
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-accent"
          >
            <option value="all">All Categories</option>
            <option value="Meat">Meat</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Dairy">Dairy</option>
            <option value="Grains">Grains</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-2">
            <AlertTriangle className="text-red-400" size={24} />
            <h3 className="text-lg font-semibold text-red-300">High Variance</h3>
          </div>
          <div className="text-3xl font-bold text-red-400">
            {filteredData.filter(item => item.status === 'high').length}
          </div>
          <p className="text-red-300/70 text-sm">Items requiring attention</p>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-2">
            <TrendingUp className="text-yellow-400" size={24} />
            <h3 className="text-lg font-semibold text-yellow-300">Moderate Variance</h3>
          </div>
          <div className="text-3xl font-bold text-yellow-400">
            {filteredData.filter(item => item.status === 'moderate').length}
          </div>
          <p className="text-yellow-300/70 text-sm">Items to monitor</p>
        </div>

        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-2">
            <TrendingDown className="text-green-400" size={24} />
            <h3 className="text-lg font-semibold text-green-300">Normal Variance</h3>
          </div>
          <div className="text-3xl font-bold text-green-400">
            {filteredData.filter(item => item.status === 'normal').length}
          </div>
          <p className="text-green-300/70 text-sm">Items within range</p>
        </div>
      </div>

      {/* Variance Table */}
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Item</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Expected</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Actual</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Variance</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Last Updated</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr 
                  key={item.id} 
                  className={`border-t border-white/10 ${index % 2 === 0 ? 'bg-white/5' : ''} hover:bg-white/10 cursor-pointer transition-colors`}
                  onClick={() => setSelectedItem(item)}
                >
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-white">{item.itemName}</div>
                      <div className="text-sm text-white/70">{item.category}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white">{item.expectedUsage.toFixed(1)} kg</td>
                  <td className="px-6 py-4 text-white">{item.actualUsage.toFixed(1)} kg</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <VarianceIcon variance={item.variance} />
                      <span className={`font-medium ${item.variance > 0 ? 'text-red-400' : 'text-green-400'}`}>
                        {item.variance > 0 ? '+' : ''}{item.variance.toFixed(1)} kg
                      </span>
                      <span className="text-white/70">
                        ({item.variancePercent > 0 ? '+' : ''}{item.variancePercent.toFixed(1)}%)
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium border ${getVarianceColor(item.status)}`}>
                      <span className="capitalize">{item.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white/70">{item.lastUpdated}</td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedItem(item);
                      }}
                      className="bg-accent/20 hover:bg-accent/30 text-accent px-3 py-1 rounded-lg text-sm transition-colors"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-primary border border-white/20 rounded-xl p-6 w-full max-w-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Variance Details: {selectedItem.itemName}</h3>
              <button 
                onClick={() => setSelectedItem(null)}
                className="text-white/70 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="text-white/70 text-sm">Expected Usage</div>
                  <div className="text-xl font-bold text-white">{selectedItem.expectedUsage} kg</div>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="text-white/70 text-sm">Actual Usage</div>
                  <div className="text-xl font-bold text-white">{selectedItem.actualUsage} kg</div>
                </div>
              </div>
              
              <div className="bg-white/5 p-4 rounded-lg">
                <div className="text-white/70 text-sm mb-2">Staff Comments</div>
                {selectedItem.staffComments.length > 0 ? (
                  <ul className="space-y-1">
                    {selectedItem.staffComments.map((comment, index) => (
                      <li key={index} className="text-white text-sm">• {comment}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-white/50 text-sm">No comments available</p>
                )}
              </div>
              
              <div className="flex space-x-3">
                <button className="bg-accent hover:bg-accent/80 text-primary px-4 py-2 rounded-lg transition-colors">
                  Add Comment
                </button>
                <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors">
                  Mark as Resolved
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

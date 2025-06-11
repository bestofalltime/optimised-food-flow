
export const InventoryLog = () => {
  const inventoryItems = [
    {
      name: "Chicken Breast",
      quantity: "15.5 kg",
      batch: "FIFO-001",
      expiry: "2024-06-14",
      costPerUnit: "$8.50",
      totalValue: "$131.75",
      status: "optimal"
    },
    {
      name: "Tomatoes",
      quantity: "8.2 kg",
      batch: "FIFO-002",
      expiry: "2024-06-13",
      costPerUnit: "$3.20",
      totalValue: "$26.24",
      status: "warning"
    },
    {
      name: "Lettuce",
      quantity: "3.1 kg",
      batch: "FIFO-003",
      expiry: "2024-06-12",
      costPerUnit: "$2.80",
      totalValue: "$8.68",
      status: "critical"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal": return "bg-accent/20 text-accent";
      case "warning": return "bg-yellow-500/20 text-yellow-400";
      case "critical": return "bg-red-500/20 text-red-400";
      default: return "bg-white/20 text-white";
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Inventory Log</h1>
      
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-white/70 font-medium">Item Name</th>
                <th className="text-left p-4 text-white/70 font-medium">Quantity</th>
                <th className="text-left p-4 text-white/70 font-medium">Batch</th>
                <th className="text-left p-4 text-white/70 font-medium">Expiry Date</th>
                <th className="text-left p-4 text-white/70 font-medium">Cost/Unit</th>
                <th className="text-left p-4 text-white/70 font-medium">Total Value</th>
                <th className="text-left p-4 text-white/70 font-medium">Status</th>
                <th className="text-left p-4 text-white/70 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventoryItems.map((item, index) => (
                <tr key={index} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4 text-white font-medium">{item.name}</td>
                  <td className="p-4 text-white/80">{item.quantity}</td>
                  <td className="p-4 text-white/80">{item.batch}</td>
                  <td className="p-4 text-white/80">{item.expiry}</td>
                  <td className="p-4 text-white/80">{item.costPerUnit}</td>
                  <td className="p-4 text-white/80">{item.totalValue}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button className="text-accent hover:text-accent/80 text-sm">Edit</button>
                      <button className="text-red-400 hover:text-red-300 text-sm">Mark Spoiled</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

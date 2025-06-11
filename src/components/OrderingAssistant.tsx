
export const OrderingAssistant = () => {
  const orderSuggestions = [
    {
      item: "Chicken Breast",
      avgUsage: "3.2 kg/day",
      currentStock: "15.5 kg",
      daysLeft: "4.8 days",
      recommended: "20 kg",
      urgent: false
    },
    {
      item: "Tomato Sauce",
      avgUsage: "1.8 L/day",
      currentStock: "3.6 L",
      daysLeft: "2.0 days",
      recommended: "15 L",
      urgent: true
    },
    {
      item: "Cheese",
      avgUsage: "2.1 kg/day",
      currentStock: "8.4 kg",
      daysLeft: "4.0 days",
      recommended: "12 kg",
      urgent: false
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Ordering Assistant</h1>
        <button className="bg-accent hover:bg-accent/80 text-primary px-4 py-2 rounded-lg font-medium">
          Send All Orders
        </button>
      </div>
      
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-white/70 font-medium">Item</th>
                <th className="text-left p-4 text-white/70 font-medium">Avg Usage/Day</th>
                <th className="text-left p-4 text-white/70 font-medium">Current Stock</th>
                <th className="text-left p-4 text-white/70 font-medium">Days Left</th>
                <th className="text-left p-4 text-white/70 font-medium">Recommended Qty</th>
                <th className="text-left p-4 text-white/70 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orderSuggestions.map((item, index) => (
                <tr key={index} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-medium">{item.item}</span>
                      {item.urgent && (
                        <span className="bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs">
                          URGENT
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-white/80">{item.avgUsage}</td>
                  <td className="p-4 text-white/80">{item.currentStock}</td>
                  <td className="p-4 text-white/80">{item.daysLeft}</td>
                  <td className="p-4 text-white/80 font-medium">{item.recommended}</td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button className="bg-accent hover:bg-accent/80 text-primary px-3 py-1 rounded text-sm">
                        Approve
                      </button>
                      <button className="text-white/70 hover:text-white px-3 py-1 border border-white/20 rounded text-sm">
                        Edit
                      </button>
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


export const WasteLog = () => {
  const wasteEntries = [
    {
      item: "Lettuce",
      quantity: "2.3 kg",
      cause: "Spoilage",
      staff: "Sarah Johnson",
      date: "2024-06-11",
      time: "14:30"
    },
    {
      item: "Chicken Breast",
      quantity: "1.8 kg",
      cause: "Over-prep",
      staff: "Mike Chen",
      date: "2024-06-11",
      time: "12:15"
    },
    {
      item: "Tomatoes",
      quantity: "0.9 kg",
      cause: "Spoilage",
      staff: "Emily Davis",
      date: "2024-06-10",
      time: "16:45"
    }
  ];

  const getCauseColor = (cause: string) => {
    switch (cause) {
      case "Spoilage": return "bg-red-500/20 text-red-400";
      case "Over-prep": return "bg-yellow-500/20 text-yellow-400";
      case "Theft": return "bg-purple-500/20 text-purple-400";
      default: return "bg-white/20 text-white";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Waste Log</h1>
        <button className="bg-accent hover:bg-accent/80 text-primary px-4 py-2 rounded-lg font-medium">
          Add Waste Entry
        </button>
      </div>
      
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-white/70 font-medium">Item</th>
                <th className="text-left p-4 text-white/70 font-medium">Quantity</th>
                <th className="text-left p-4 text-white/70 font-medium">Cause</th>
                <th className="text-left p-4 text-white/70 font-medium">Staff</th>
                <th className="text-left p-4 text-white/70 font-medium">Date</th>
                <th className="text-left p-4 text-white/70 font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {wasteEntries.map((entry, index) => (
                <tr key={index} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4 text-white font-medium">{entry.item}</td>
                  <td className="p-4 text-white/80">{entry.quantity}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCauseColor(entry.cause)}`}>
                      {entry.cause}
                    </span>
                  </td>
                  <td className="p-4 text-white/80">{entry.staff}</td>
                  <td className="p-4 text-white/80">{entry.date}</td>
                  <td className="p-4 text-white/80">{entry.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

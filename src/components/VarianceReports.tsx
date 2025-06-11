
export const VarianceReports = () => {
  const varianceData = [
    {
      item: "Chicken Breast",
      expected: "12.0 kg",
      actual: "14.8 kg",
      variance: "+23%",
      status: "high"
    },
    {
      item: "Beef Patties",
      expected: "8.5 kg",
      actual: "7.2 kg",
      variance: "-15%",
      status: "moderate"
    },
    {
      item: "Lettuce",
      expected: "5.0 kg",
      actual: "5.3 kg",
      variance: "+6%",
      status: "normal"
    }
  ];

  const getVarianceColor = (status: string) => {
    switch (status) {
      case "high": return "text-red-400";
      case "moderate": return "text-yellow-400";
      case "normal": return "text-accent";
      default: return "text-white";
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Variance Reports</h1>
      
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-white/70 font-medium">Item Name</th>
                <th className="text-left p-4 text-white/70 font-medium">Expected Usage</th>
                <th className="text-left p-4 text-white/70 font-medium">Actual Used</th>
                <th className="text-left p-4 text-white/70 font-medium">% Variance</th>
                <th className="text-left p-4 text-white/70 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {varianceData.map((item, index) => (
                <tr key={index} className="border-b border-white/5 hover:bg-white/5">
                  <td className="p-4 text-white font-medium">{item.item}</td>
                  <td className="p-4 text-white/80">{item.expected}</td>
                  <td className="p-4 text-white/80">{item.actual}</td>
                  <td className={`p-4 font-medium ${getVarianceColor(item.status)}`}>
                    {item.variance}
                  </td>
                  <td className="p-4">
                    <button className="text-accent hover:text-accent/80 text-sm">
                      View Details
                    </button>
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

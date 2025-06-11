
export const SystemSettings = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">System Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* POS Integration */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">POS Integration</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white/80">Connected POS System</span>
              <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-sm">Square</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/80">Last Sync</span>
              <span className="text-white/70">2 minutes ago</span>
            </div>
            <button className="w-full bg-accent hover:bg-accent/80 text-primary py-2 rounded-lg font-medium">
              Reconfigure POS
            </button>
          </div>
        </div>

        {/* Alert Thresholds */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Alert Thresholds</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-white/80 text-sm mb-2">Stock Alert (%)</label>
              <input 
                type="number" 
                defaultValue="20" 
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-white/80 text-sm mb-2">Expiry Alert (days)</label>
              <input 
                type="number" 
                defaultValue="3" 
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
              />
            </div>
            <div>
              <label className="block text-white/80 text-sm mb-2">Variance Alert (%)</label>
              <input 
                type="number" 
                defaultValue="15" 
                className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
              />
            </div>
          </div>
        </div>

        {/* User Management */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">User Management</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div>
                <p className="text-white font-medium">Sarah Johnson</p>
                <p className="text-white/60 text-sm">Kitchen Manager</p>
              </div>
              <span className="bg-accent/20 text-accent px-2 py-1 rounded text-xs">Admin</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div>
                <p className="text-white font-medium">Mike Chen</p>
                <p className="text-white/60 text-sm">Line Cook</p>
              </div>
              <span className="bg-white/20 text-white/70 px-2 py-1 rounded text-xs">Staff</span>
            </div>
          </div>
        </div>

        {/* Language Settings */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Language & Region</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-white/80 text-sm mb-2">Language</label>
              <select className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white">
                <option value="en">English</option>
                <option value="ar">العربية</option>
              </select>
            </div>
            <div>
              <label className="block text-white/80 text-sm mb-2">Currency</label>
              <select className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white">
                <option value="usd">USD ($)</option>
                <option value="lbp">LBP (ل.ل)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

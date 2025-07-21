
import { BarChart3, Package, TrendingDown, Trash2, ShoppingCart, Settings, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "inventory", label: "Inventory Log", icon: Package },
  { id: "variance", label: "Variance Reports", icon: BarChart3 },
  { id: "waste", label: "Waste Log", icon: Trash2 },
  { id: "ordering", label: "Ordering Assistant", icon: ShoppingCart },
  { id: "settings", label: "Settings", icon: Settings },
];

export const Sidebar = ({ activeSection, setActiveSection }: SidebarProps) => {
  return (
    <div className="w-full lg:w-64 bg-primary border-b lg:border-b-0 lg:border-r border-accent/20 p-3 lg:p-6">
      <div className="mb-4 lg:mb-8">
        <div className="flex items-center justify-center mb-3 lg:mb-6">
          <img 
            src="/lovable-uploads/8b5eeac1-aa2e-4fee-ae27-07892dbcf765.png" 
            alt="OptiMised Logo" 
            className="h-12 lg:h-16 w-auto opacity-90 filter brightness-110"
          />
        </div>
      </div>
      
      <nav className="grid grid-cols-2 lg:grid-cols-1 gap-2 lg:space-y-2 lg:space-x-0">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={cn(
                "w-full flex items-center justify-center lg:justify-start space-x-0 lg:space-x-3 px-2 lg:px-4 py-2 lg:py-3 rounded-lg text-left transition-colors flex-col lg:flex-row gap-1 lg:gap-0",
                activeSection === item.id
                  ? "bg-accent/20 text-accent"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon size={20} />
              <span className="text-xs lg:text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

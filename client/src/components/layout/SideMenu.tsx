import { Link } from "wouter";
import { X, Home, Layers, TrendingUp, Truck, Store, Plus, MapPin, Lightbulb, User, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMenu } from "@/contexts/MenuContext";

export default function SideMenu() {
  const { isSideMenuOpen, closeSideMenu } = useMenu();

  const menuItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Layers, label: "Categories", href: "/categories" },
    { icon: TrendingUp, label: "Live Prices", href: "/prices" },
    { icon: Truck, label: "Services", href: "/services" },
    { icon: Store, label: "Marketplace", href: "/marketplace" },
    { icon: Plus, label: "Sell Items", href: "/sell" },
    { icon: MapPin, label: "Find Dealers", href: "/dealers" },
    { icon: Lightbulb, label: "Eco Tips", href: "/tips" },
    { icon: User, label: "My Account", href: "/profile" },
    { icon: Headphones, label: "Contact", href: "/contact" },
  ];

  if (!isSideMenuOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeSideMenu}></div>
      <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">Navigation</h2>
            <Button variant="ghost" size="icon" onClick={closeSideMenu}>
              <X className="h-5 w-5 text-gray-600" />
            </Button>
          </div>
        </div>
        
        <nav className="p-4">
          <div className="space-y-2">
            {menuItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href}
                onClick={closeSideMenu}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors w-full text-left"
              >
                <item.icon className="h-5 w-5 text-primary" />
                <span className="font-medium text-gray-700">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}

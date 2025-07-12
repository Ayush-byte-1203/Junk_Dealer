import { useState } from "react";
import { Menu, ShoppingCart, Bell, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useMenu } from "@/contexts/MenuContext";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";

export default function Header() {
  const { user, logout } = useAuth();
  const { toggleSideMenu } = useMenu();
  const [, setLocation] = useLocation();

  const { data: cartItems = [] } = useQuery({
    queryKey: ["/api/cart", user?.id],
    enabled: !!user,
  });

  const { data: notifications = [] } = useQuery({
    queryKey: ["/api/notifications", user?.id, "unread"],
    enabled: !!user,
  });

  const handleLogin = () => {
    setLocation("/login");
  };

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  return (
    <header className="bg-white shadow-lg fixed w-full top-0 z-50 border-b border-gray-200">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section: Hamburger Menu + Logo */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSideMenu}
              className="p-2 hover:bg-gray-100"
            >
              <Menu className="h-6 w-6 text-gray-700" />
            </Button>
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 eco-gradient rounded-full flex items-center justify-center">
                <i className="fas fa-recycle text-white text-lg"></i>
              </div>
              <span className="text-2xl font-bold text-gray-800">EcoJunk Hub</span>
            </Link>
          </div>

          {/* Right Section: Cart, Notifications, Login/User */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative p-2 hover:bg-gray-100"
            >
              <ShoppingCart className="h-6 w-6 text-gray-700" />
              {cartItems.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-white text-xs p-0 flex items-center justify-center">
                  {cartItems.length}
                </Badge>
              )}
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative p-2 hover:bg-gray-100"
            >
              <Bell className="h-6 w-6 text-gray-700" />
              {notifications.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs p-0 flex items-center justify-center">
                  {notifications.length}
                </Badge>
              )}
            </Button>

            {user ? (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setLocation("/profile")}
                  className="p-2 hover:bg-gray-100"
                >
                  <User className="h-6 w-6 text-gray-700" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleLogout}
                  className="text-sm"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button 
                onClick={handleLogin}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-2 font-medium"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { MenuProvider } from "@/contexts/MenuContext";
import Header from "@/components/layout/Header";
import SideMenu from "@/components/layout/SideMenu";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Categories from "@/pages/Categories";
import Services from "@/pages/Services";
import Marketplace from "@/pages/Marketplace";
import SellItem from "@/pages/SellItem";
import Dealers from "@/pages/Dealers";
import EcoTips from "@/pages/EcoTips";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/categories" component={Categories} />
      <Route path="/prices" component={Categories} />
      <Route path="/services" component={Services} />
      <Route path="/marketplace" component={Marketplace} />
      <Route path="/sell" component={SellItem} />
      <Route path="/dealers" component={Dealers} />
      <Route path="/tips" component={EcoTips} />
      <Route path="/profile" component={Profile} />
      <Route path="/contact" component={Profile} />
      <Route path="/account" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MenuProvider>
          <TooltipProvider>
            <div className="min-h-screen bg-gray-50">
              <Header />
              <SideMenu />
              <main>
                <Router />
              </main>
              <Toaster />
            </div>
          </TooltipProvider>
        </MenuProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

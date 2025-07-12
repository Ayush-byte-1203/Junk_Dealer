import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PriceTicker from "@/components/common/PriceTicker";
import CategoryCard from "@/components/common/CategoryCard";
import ProductCard from "@/components/common/ProductCard";
import { useLocation } from "wouter";
import { Calculator, Truck, Star, Users, TreePine, Recycle } from "lucide-react";

export default function Home() {
  const [, setLocation] = useLocation();

  const { data: categories = [] } = useQuery({
    queryKey: ["/api/categories"],
  });

  const { data: products = [] } = useQuery({
    queryKey: ["/api/products"],
  });

  const mainCategories = categories.filter(cat => !cat.parentId).slice(0, 4);
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="eco-gradient relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              Turn Your Waste Into <span className="text-yellow-300">Wealth</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto animate-fade-in">
              Connect with certified dealers, get real-time prices, and join the sustainable revolution. Your junk is our treasure!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Button 
                size="lg"
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-8 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
                onClick={() => setLocation("/categories")}
              >
                <Calculator className="mr-2 h-5 w-5" />
                Get Price Quote
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-bold py-4 px-8 rounded-xl backdrop-blur-sm transition-all duration-300 border-white"
                onClick={() => setLocation("/services")}
              >
                <Truck className="mr-2 h-5 w-5" />
                Schedule Pickup
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Live Price Ticker */}
      <PriceTicker />

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Browse Categories</h2>
            <p className="text-xl text-gray-600">Find the right category for your materials</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mainCategories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onClick={() => setLocation("/categories")}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Choose how you want to deal with your junk</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Pickup Service */}
            <Card className="border-2 border-primary">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Truck className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Pickup Service</h3>
                  <p className="text-gray-600">We'll come to you and collect your junk</p>
                </div>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-gray-700">Free pickup for orders above ₹500</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-gray-700">Flexible time slots</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-gray-700">Instant payment</span>
                  </div>
                </div>
                <Button 
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={() => setLocation("/services")}
                >
                  <Calculator className="mr-2 h-4 w-4" />
                  Schedule Pickup
                </Button>
              </CardContent>
            </Card>

            {/* Drop-off Service */}
            <Card>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-map-marker-alt text-white text-2xl"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Drop-off Service</h3>
                  <p className="text-gray-600">Find nearby dealers and drop off your junk</p>
                </div>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span className="text-gray-700">Find nearest dealers</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span className="text-gray-700">Compare prices</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span className="text-gray-700">Real-time availability</span>
                  </div>
                </div>
                <Button 
                  className="w-full bg-secondary hover:bg-secondary/90"
                  onClick={() => setLocation("/dealers")}
                >
                  <i className="fas fa-search mr-2"></i>
                  Find Dealers
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Marketplace Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Eco Marketplace</h2>
            <p className="text-xl text-gray-600">Buy sustainable products made from recycled materials</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={(productId) => {
                  // Add to cart logic here
                  console.log("Adding to cart:", productId);
                }}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button 
              size="lg"
              onClick={() => setLocation("/marketplace")}
              className="bg-primary hover:bg-primary/90"
            >
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 eco-gradient">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Environmental Impact</h2>
            <p className="text-xl text-white opacity-90">Together we're making a difference</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center text-white">
              <div className="text-4xl font-bold mb-2 animate-pulse-slow">50,000+</div>
              <div className="text-lg opacity-90 flex items-center justify-center">
                <Recycle className="mr-2 h-5 w-5" />
                Kg Materials Recycled
              </div>
            </div>
            <div className="text-center text-white">
              <div className="text-4xl font-bold mb-2 animate-pulse-slow">2,500+</div>
              <div className="text-lg opacity-90 flex items-center justify-center">
                <Users className="mr-2 h-5 w-5" />
                Happy Customers
              </div>
            </div>
            <div className="text-center text-white">
              <div className="text-4xl font-bold mb-2 animate-pulse-slow">150+</div>
              <div className="text-lg opacity-90 flex items-center justify-center">
                <Star className="mr-2 h-5 w-5" />
                Partner Dealers
              </div>
            </div>
            <div className="text-center text-white">
              <div className="text-4xl font-bold mb-2 animate-pulse-slow">1,200</div>
              <div className="text-lg opacity-90 flex items-center justify-center">
                <TreePine className="mr-2 h-5 w-5" />
                Trees Saved
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

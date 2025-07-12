import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CategoryCard from "@/components/common/CategoryCard";
import { ArrowLeft, TrendingUp, TrendingDown } from "lucide-react";
import { useLocation } from "wouter";

export default function Categories() {
  const [, setLocation] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const { data: categories = [] } = useQuery({
    queryKey: ["/api/categories"],
  });

  const mainCategories = categories.filter(cat => !cat.parentId);
  const subCategories = categories.filter(cat => cat.parentId === selectedCategory);

  const handleCategoryClick = (categoryId: number) => {
    const hasSubcategories = categories.some(cat => cat.parentId === categoryId);
    if (hasSubcategories) {
      setSelectedCategory(categoryId);
    } else {
      // Navigate to pricing or booking page
      setLocation(`/services?category=${categoryId}`);
    }
  };

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            {selectedCategory && (
              <Button
                variant="ghost"
                onClick={() => setSelectedCategory(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Categories
              </Button>
            )}
            <div>
              <h1 className="text-4xl font-bold text-gray-800">
                {selectedCategory ? selectedCategoryData?.name : "Junk Categories"}
              </h1>
              <p className="text-xl text-gray-600">
                {selectedCategory 
                  ? "Choose a specific subcategory for detailed pricing"
                  : "Select a category to view current prices and subcategories"
                }
              </p>
            </div>
          </div>
        </div>

        {/* Current Prices Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {(selectedCategory ? subCategories : mainCategories).map((category) => (
            <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <i className={`${category.icon} text-primary text-lg`}></i>
                    </div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {Math.random() > 0.5 ? (
                      <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                    )}
                    {(Math.random() * 5).toFixed(1)}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Current Price</span>
                    <span className="text-lg font-bold text-primary">
                      ₹{category.currentPrice}/{category.priceUnit}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{category.description}</p>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full mt-3"
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    {categories.some(cat => cat.parentId === category.id) ? "View Subcategories" : "Get Quote"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(selectedCategory ? subCategories : mainCategories).map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={() => handleCategoryClick(category.id)}
            />
          ))}
        </div>

        {/* Price Information */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Price Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-3">Pricing Guidelines</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Prices are updated daily based on market conditions</li>
                  <li>• Clean, sorted materials fetch higher prices</li>
                  <li>• Minimum quantity requirements may apply</li>
                  <li>• Bulk quantities may qualify for premium rates</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Tips for Better Prices</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Remove non-recyclable components</li>
                  <li>• Clean items before disposal</li>
                  <li>• Sort materials by type</li>
                  <li>• Bundle similar items together</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

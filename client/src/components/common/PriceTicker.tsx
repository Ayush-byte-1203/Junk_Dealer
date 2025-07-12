import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { queryClient } from "@/lib/queryClient";

export default function PriceTicker() {
  const { data: categories = [] } = useQuery({
    queryKey: ["/api/categories"],
  });

  // Simulate price updates every 30 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        await fetch("/api/prices/update", { method: "POST" });
        queryClient.invalidateQueries({ queryKey: ["/api/categories"] });
      } catch (error) {
        console.error("Failed to update prices:", error);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const mainCategories = categories.filter(cat => !cat.parentId);

  return (
    <section className="bg-gray-900 text-white py-4 overflow-hidden">
      <div className="flex items-center space-x-8 price-ticker">
        {mainCategories.map((category, index) => (
          <div key={`${category.id}-${index}`} className="flex items-center space-x-2 whitespace-nowrap">
            <i className={`${category.icon} text-yellow-400`}></i>
            <span className="font-medium">{category.name}:</span>
            <span className="text-primary font-bold">₹{category.currentPrice}/{category.priceUnit}</span>
            <span className="text-green-400 text-sm">
              {Math.random() > 0.5 ? "↑" : "↓"} {(Math.random() * 5).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

import { Category } from "@shared/schema";

interface CategoryCardProps {
  category: Category;
  onClick?: () => void;
}

export default function CategoryCard({ category, onClick }: CategoryCardProps) {
  const getGradientClass = (index: number) => {
    const gradients = [
      "from-blue-50 to-blue-100 border-blue-200",
      "from-orange-50 to-orange-100 border-orange-200",
      "from-green-50 to-green-100 border-green-200",
      "from-yellow-50 to-yellow-100 border-yellow-200",
      "from-purple-50 to-purple-100 border-purple-200",
      "from-pink-50 to-pink-100 border-pink-200",
    ];
    return gradients[index % gradients.length];
  };

  const getIconColor = (index: number) => {
    const colors = [
      "bg-blue-500",
      "bg-orange-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
    ];
    return colors[index % colors.length];
  };

  return (
    <div 
      className={`bg-gradient-to-br ${getGradientClass(category.id)} rounded-2xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border`}
      onClick={onClick}
    >
      <div className="text-center">
        <div className={`w-16 h-16 ${getIconColor(category.id)} rounded-full flex items-center justify-center mx-auto mb-4`}>
          <i className={`${category.icon} text-white text-2xl`}></i>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{category.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{category.description}</p>
        {category.currentPrice && (
          <div className="text-primary font-bold text-lg">
            ₹{category.currentPrice}/{category.priceUnit}
          </div>
        )}
      </div>
    </div>
  );
}

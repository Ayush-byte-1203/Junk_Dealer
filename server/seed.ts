import { db } from "./db";
import { users, categories, dealers, products } from "@shared/schema";

async function seedDatabase() {
  try {
    console.log("Starting database seeding...");

    // Clear existing data
    await db.delete(products);
    await db.delete(dealers);
    await db.delete(categories);
    await db.delete(users);

    // Insert categories
    const categoriesData = [
      { name: "Electronics", description: "Phones, laptops, circuit boards", icon: "fas fa-microchip", parentId: null, currentPrice: "450.00", priceUnit: "kg", isActive: true },
      { name: "Metals", description: "Copper, aluminum, steel", icon: "fas fa-coins", parentId: null, currentPrice: "280.00", priceUnit: "kg", isActive: true },
      { name: "Plastic", description: "Bottles, containers, packaging", icon: "fas fa-leaf", parentId: null, currentPrice: "15.00", priceUnit: "kg", isActive: true },
      { name: "Paper", description: "Newspapers, books, cardboard", icon: "fas fa-newspaper", parentId: null, currentPrice: "12.00", priceUnit: "kg", isActive: true },
      { name: "Copper", description: "Pure copper materials", icon: "fas fa-coins", parentId: 2, currentPrice: "620.00", priceUnit: "kg", isActive: true },
      { name: "Aluminum", description: "Aluminum cans and sheets", icon: "fas fa-coins", parentId: 2, currentPrice: "180.00", priceUnit: "kg", isActive: true },
      { name: "Steel", description: "Iron and steel materials", icon: "fas fa-coins", parentId: 2, currentPrice: "45.00", priceUnit: "kg", isActive: true },
      { name: "Brass", description: "Brass materials and fittings", icon: "fas fa-coins", parentId: 2, currentPrice: "350.00", priceUnit: "kg", isActive: true },
      { name: "Batteries", description: "Old batteries and cells", icon: "fas fa-battery-empty", parentId: 1, currentPrice: "85.00", priceUnit: "kg", isActive: true },
      { name: "Glass", description: "Glass bottles and containers", icon: "fas fa-wine-bottle", parentId: null, currentPrice: "8.00", priceUnit: "kg", isActive: true },
      { name: "Textiles", description: "Fabric and clothing waste", icon: "fas fa-tshirt", parentId: null, currentPrice: "25.00", priceUnit: "kg", isActive: true },
      { name: "Wood", description: "Wood scraps and furniture", icon: "fas fa-tree", parentId: null, currentPrice: "18.00", priceUnit: "kg", isActive: true },
      { name: "Rubber", description: "Rubber materials and tires", icon: "fas fa-circle", parentId: null, currentPrice: "32.00", priceUnit: "kg", isActive: true },
      { name: "Cables", description: "Electric cables and wires", icon: "fas fa-plug", parentId: 1, currentPrice: "125.00", priceUnit: "kg", isActive: true },
      { name: "Appliances", description: "Old appliances and machines", icon: "fas fa-tv", parentId: 1, currentPrice: "95.00", priceUnit: "kg", isActive: true },
    ];

    await db.insert(categories).values(categoriesData);

    // Insert dealers
    const dealersData = [
      { name: "Green Recyclers", address: "123 Main St, Mumbai", phone: "+91 9876543210", email: "contact@greenrecyclers.com", city: "Mumbai", rating: "4.5", isActive: true, specialties: JSON.stringify([1, 2]) },
      { name: "EcoWaste Solutions", address: "456 Park Ave, Delhi", phone: "+91 9876543211", email: "info@ecowaste.com", city: "Delhi", rating: "4.3", isActive: true, specialties: JSON.stringify([2, 3, 4]) },
      { name: "Metal Masters", address: "789 Industrial Rd, Bangalore", phone: "+91 9876543212", email: "sales@metalmasters.com", city: "Bangalore", rating: "4.7", isActive: true, specialties: JSON.stringify([2, 5, 6, 7]) },
    ];

    await db.insert(dealers).values(dealersData);

    // Insert a demo user
    const userData = {
      username: "demo_user",
      email: "demo@example.com",
      password: "password123",
      firstName: "Demo",
      lastName: "User",
      phone: "+91 9876543213",
      address: "Demo Address",
      city: "Mumbai",
      isActive: true,
    };

    const [user] = await db.insert(users).values(userData).returning();

    // Insert products
    const productsData = [
      { sellerId: user.id, title: "Reclaimed Wood Table", description: "Beautiful dining table made from 100% recycled wood", price: "8999.00", category: "furniture", condition: "like-new", images: JSON.stringify(["/api/placeholder/400/300"]), location: "Mumbai", isAvailable: true, isRecycled: true },
      { sellerId: user.id, title: "Eco Tote Bag", description: "Stylish tote bag made from recycled plastic bottles", price: "499.00", category: "accessories", condition: "new", images: JSON.stringify(["/api/placeholder/400/300"]), location: "Mumbai", isAvailable: true, isRecycled: true },
      { sellerId: user.id, title: "Metal Art Sculpture", description: "Handcrafted decorative sculpture from recycled metal", price: "2599.00", category: "decor", condition: "new", images: JSON.stringify(["/api/placeholder/400/300"]), location: "Delhi", isAvailable: true, isRecycled: true },
      { sellerId: user.id, title: "Recycled Planters", description: "Set of planters made from recycled plastic", price: "799.00", category: "garden", condition: "new", images: JSON.stringify(["/api/placeholder/400/300"]), location: "Bangalore", isAvailable: true, isRecycled: true },
    ];

    await db.insert(products).values(productsData);

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seedDatabase();
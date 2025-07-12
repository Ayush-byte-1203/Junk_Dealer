import { 
  users, categories, priceHistory, bookings, dealers, products, cartItems, notifications,
  type User, type InsertUser, type Category, type InsertCategory, type Booking, type InsertBooking,
  type Dealer, type InsertDealer, type Product, type InsertProduct, type CartItem, type InsertCartItem,
  type Notification, type InsertNotification
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<User>): Promise<User | undefined>;
  
  // Categories
  getCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  getCategoryByName(name: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategoryPrice(id: number, price: number): Promise<Category | undefined>;
  
  // Bookings
  getBookings(): Promise<Booking[]>;
  getBookingsByUser(userId: number): Promise<Booking[]>;
  getBooking(id: number): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBookingStatus(id: number, status: string): Promise<Booking | undefined>;
  
  // Dealers
  getDealers(): Promise<Dealer[]>;
  getDealersByCity(city: string): Promise<Dealer[]>;
  getDealer(id: number): Promise<Dealer | undefined>;
  createDealer(dealer: InsertDealer): Promise<Dealer>;
  
  // Products
  getProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getProductsBySeller(sellerId: number): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProductAvailability(id: number, isAvailable: boolean): Promise<Product | undefined>;
  
  // Cart
  getCartItems(userId: number): Promise<CartItem[]>;
  addToCart(cartItem: InsertCartItem): Promise<CartItem>;
  updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: number): Promise<boolean>;
  clearCart(userId: number): Promise<boolean>;
  
  // Notifications
  getNotifications(userId: number): Promise<Notification[]>;
  getUnreadNotifications(userId: number): Promise<Notification[]>;
  createNotification(notification: InsertNotification): Promise<Notification>;
  markNotificationAsRead(id: number): Promise<Notification | undefined>;
  markAllNotificationsAsRead(userId: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private categories: Map<number, Category> = new Map();
  private bookings: Map<number, Booking> = new Map();
  private dealers: Map<number, Dealer> = new Map();
  private products: Map<number, Product> = new Map();
  private cartItems: Map<number, CartItem> = new Map();
  private notifications: Map<number, Notification> = new Map();
  private currentId = 1;

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Initialize categories
    const initialCategories = [
      { id: 1, name: "Electronics", description: "Phones, laptops, circuit boards", icon: "fas fa-microchip", parentId: null, currentPrice: "450.00", priceUnit: "kg", isActive: true },
      { id: 2, name: "Metals", description: "Copper, aluminum, steel", icon: "fas fa-coins", parentId: null, currentPrice: "280.00", priceUnit: "kg", isActive: true },
      { id: 3, name: "Plastic", description: "Bottles, containers, packaging", icon: "fas fa-leaf", parentId: null, currentPrice: "15.00", priceUnit: "kg", isActive: true },
      { id: 4, name: "Paper", description: "Newspapers, books, cardboard", icon: "fas fa-newspaper", parentId: null, currentPrice: "12.00", priceUnit: "kg", isActive: true },
      { id: 5, name: "Copper", description: "Pure copper materials", icon: "fas fa-coins", parentId: 2, currentPrice: "620.00", priceUnit: "kg", isActive: true },
      { id: 6, name: "Aluminum", description: "Aluminum cans and sheets", icon: "fas fa-coins", parentId: 2, currentPrice: "180.00", priceUnit: "kg", isActive: true },
      { id: 7, name: "Steel", description: "Iron and steel materials", icon: "fas fa-coins", parentId: 2, currentPrice: "45.00", priceUnit: "kg", isActive: true },
      { id: 8, name: "Brass", description: "Brass materials and fittings", icon: "fas fa-coins", parentId: 2, currentPrice: "350.00", priceUnit: "kg", isActive: true },
      { id: 9, name: "Batteries", description: "Old batteries and cells", icon: "fas fa-battery-empty", parentId: 1, currentPrice: "85.00", priceUnit: "kg", isActive: true },
      { id: 10, name: "Glass", description: "Glass bottles and containers", icon: "fas fa-wine-bottle", parentId: null, currentPrice: "8.00", priceUnit: "kg", isActive: true },
      { id: 11, name: "Textiles", description: "Fabric and clothing waste", icon: "fas fa-tshirt", parentId: null, currentPrice: "25.00", priceUnit: "kg", isActive: true },
      { id: 12, name: "Wood", description: "Wood scraps and furniture", icon: "fas fa-tree", parentId: null, currentPrice: "18.00", priceUnit: "kg", isActive: true },
      { id: 13, name: "Rubber", description: "Rubber materials and tires", icon: "fas fa-circle", parentId: null, currentPrice: "32.00", priceUnit: "kg", isActive: true },
      { id: 14, name: "Cables", description: "Electric cables and wires", icon: "fas fa-plug", parentId: 1, currentPrice: "125.00", priceUnit: "kg", isActive: true },
      { id: 15, name: "Appliances", description: "Old appliances and machines", icon: "fas fa-tv", parentId: 1, currentPrice: "95.00", priceUnit: "kg", isActive: true },
    ];

    initialCategories.forEach(cat => {
      this.categories.set(cat.id, cat as Category);
    });

    // Initialize dealers
    const initialDealers = [
      { id: 1, name: "Green Recyclers", address: "123 Main St, Mumbai", phone: "+91 9876543210", email: "contact@greenrecyclers.com", city: "Mumbai", rating: "4.5", isActive: true, specialties: JSON.stringify([1, 2]) },
      { id: 2, name: "EcoWaste Solutions", address: "456 Park Ave, Delhi", phone: "+91 9876543211", email: "info@ecowaste.com", city: "Delhi", rating: "4.3", isActive: true, specialties: JSON.stringify([2, 3, 4]) },
      { id: 3, name: "Metal Masters", address: "789 Industrial Rd, Bangalore", phone: "+91 9876543212", email: "sales@metalmasters.com", city: "Bangalore", rating: "4.7", isActive: true, specialties: JSON.stringify([2, 5, 6, 7]) },
    ];

    initialDealers.forEach(dealer => {
      this.dealers.set(dealer.id, dealer as Dealer);
    });

    // Initialize products
    const initialProducts = [
      { id: 1, sellerId: 1, title: "Reclaimed Wood Table", description: "Beautiful dining table made from 100% recycled wood", price: "8999", category: "furniture", condition: "like-new", images: JSON.stringify(["/api/placeholder/400/300"]), location: "Mumbai", isAvailable: true, isRecycled: true, createdAt: new Date() },
      { id: 2, sellerId: 1, title: "Eco Tote Bag", description: "Stylish tote bag made from recycled plastic bottles", price: "499", category: "accessories", condition: "new", images: JSON.stringify(["/api/placeholder/400/300"]), location: "Mumbai", isAvailable: true, isRecycled: true, createdAt: new Date() },
      { id: 3, sellerId: 1, title: "Metal Art Sculpture", description: "Handcrafted decorative sculpture from recycled metal", price: "2599", category: "decor", condition: "new", images: JSON.stringify(["/api/placeholder/400/300"]), location: "Delhi", isAvailable: true, isRecycled: true, createdAt: new Date() },
      { id: 4, sellerId: 1, title: "Recycled Planters", description: "Set of planters made from recycled plastic", price: "799", category: "garden", condition: "new", images: JSON.stringify(["/api/placeholder/400/300"]), location: "Bangalore", isAvailable: true, isRecycled: true, createdAt: new Date() },
    ];

    initialProducts.forEach(product => {
      this.products.set(product.id, product as Product);
    });

    this.currentId = 100;
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { 
      ...insertUser, 
      id, 
      isActive: true, 
      createdAt: new Date() 
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategory(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async getCategoryByName(name: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(cat => cat.name === name);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  async updateCategoryPrice(id: number, price: number): Promise<Category | undefined> {
    const category = this.categories.get(id);
    if (!category) return undefined;
    
    const updatedCategory = { ...category, currentPrice: price.toFixed(2) };
    this.categories.set(id, updatedCategory);
    return updatedCategory;
  }

  // Bookings
  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async getBookingsByUser(userId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(booking => booking.userId === userId);
  }

  async getBooking(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.currentId++;
    const booking: Booking = { 
      ...insertBooking, 
      id, 
      status: "pending", 
      createdAt: new Date() 
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (!booking) return undefined;
    
    const updatedBooking = { ...booking, status };
    this.bookings.set(id, updatedBooking);
    return updatedBooking;
  }

  // Dealers
  async getDealers(): Promise<Dealer[]> {
    return Array.from(this.dealers.values());
  }

  async getDealersByCity(city: string): Promise<Dealer[]> {
    return Array.from(this.dealers.values()).filter(dealer => dealer.city === city);
  }

  async getDealer(id: number): Promise<Dealer | undefined> {
    return this.dealers.get(id);
  }

  async createDealer(insertDealer: InsertDealer): Promise<Dealer> {
    const id = this.currentId++;
    const dealer: Dealer = { ...insertDealer, id };
    this.dealers.set(id, dealer);
    return dealer;
  }

  // Products
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.category === category);
  }

  async getProductsBySeller(sellerId: number): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.sellerId === sellerId);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentId++;
    const product: Product = { 
      ...insertProduct, 
      id, 
      isAvailable: true, 
      createdAt: new Date() 
    };
    this.products.set(id, product);
    return product;
  }

  async updateProductAvailability(id: number, isAvailable: boolean): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;
    
    const updatedProduct = { ...product, isAvailable };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  // Cart
  async getCartItems(userId: number): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(item => item.userId === userId);
  }

  async addToCart(insertCartItem: InsertCartItem): Promise<CartItem> {
    const id = this.currentId++;
    const cartItem: CartItem = { 
      ...insertCartItem, 
      id, 
      addedAt: new Date() 
    };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined> {
    const cartItem = this.cartItems.get(id);
    if (!cartItem) return undefined;
    
    const updatedCartItem = { ...cartItem, quantity };
    this.cartItems.set(id, updatedCartItem);
    return updatedCartItem;
  }

  async removeFromCart(id: number): Promise<boolean> {
    return this.cartItems.delete(id);
  }

  async clearCart(userId: number): Promise<boolean> {
    const userCartItems = await this.getCartItems(userId);
    userCartItems.forEach(item => this.cartItems.delete(item.id));
    return true;
  }

  // Notifications
  async getNotifications(userId: number): Promise<Notification[]> {
    return Array.from(this.notifications.values()).filter(notification => notification.userId === userId);
  }

  async getUnreadNotifications(userId: number): Promise<Notification[]> {
    return Array.from(this.notifications.values()).filter(notification => 
      notification.userId === userId && !notification.isRead
    );
  }

  async createNotification(insertNotification: InsertNotification): Promise<Notification> {
    const id = this.currentId++;
    const notification: Notification = { 
      ...insertNotification, 
      id, 
      isRead: false, 
      createdAt: new Date() 
    };
    this.notifications.set(id, notification);
    return notification;
  }

  async markNotificationAsRead(id: number): Promise<Notification | undefined> {
    const notification = this.notifications.get(id);
    if (!notification) return undefined;
    
    const updatedNotification = { ...notification, isRead: true };
    this.notifications.set(id, updatedNotification);
    return updatedNotification;
  }

  async markAllNotificationsAsRead(userId: number): Promise<boolean> {
    const userNotifications = await this.getNotifications(userId);
    userNotifications.forEach(notification => {
      const updatedNotification = { ...notification, isRead: true };
      this.notifications.set(notification.id, updatedNotification);
    });
    return true;
  }
}

import { db } from "./db";
import { eq } from "drizzle-orm";

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set(updates)
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }

  async getCategory(id: number): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.id, id));
    return category || undefined;
  }

  async getCategoryByName(name: string): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.name, name));
    return category || undefined;
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const [category] = await db
      .insert(categories)
      .values(insertCategory)
      .returning();
    return category;
  }

  async updateCategoryPrice(id: number, price: number): Promise<Category | undefined> {
    const [category] = await db
      .update(categories)
      .set({ currentPrice: price.toFixed(2) })
      .where(eq(categories.id, id))
      .returning();
    return category || undefined;
  }

  async getBookings(): Promise<Booking[]> {
    return await db.select().from(bookings);
  }

  async getBookingsByUser(userId: number): Promise<Booking[]> {
    return await db.select().from(bookings).where(eq(bookings.userId, userId));
  }

  async getBooking(id: number): Promise<Booking | undefined> {
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
    return booking || undefined;
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const [booking] = await db
      .insert(bookings)
      .values(insertBooking)
      .returning();
    return booking;
  }

  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    const [booking] = await db
      .update(bookings)
      .set({ status })
      .where(eq(bookings.id, id))
      .returning();
    return booking || undefined;
  }

  async getDealers(): Promise<Dealer[]> {
    return await db.select().from(dealers);
  }

  async getDealersByCity(city: string): Promise<Dealer[]> {
    return await db.select().from(dealers).where(eq(dealers.city, city));
  }

  async getDealer(id: number): Promise<Dealer | undefined> {
    const [dealer] = await db.select().from(dealers).where(eq(dealers.id, id));
    return dealer || undefined;
  }

  async createDealer(insertDealer: InsertDealer): Promise<Dealer> {
    const [dealer] = await db
      .insert(dealers)
      .values(insertDealer)
      .returning();
    return dealer;
  }

  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.category, category));
  }

  async getProductsBySeller(sellerId: number): Promise<Product[]> {
    return await db.select().from(products).where(eq(products.sellerId, sellerId));
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || undefined;
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const [product] = await db
      .insert(products)
      .values(insertProduct)
      .returning();
    return product;
  }

  async updateProductAvailability(id: number, isAvailable: boolean): Promise<Product | undefined> {
    const [product] = await db
      .update(products)
      .set({ isAvailable })
      .where(eq(products.id, id))
      .returning();
    return product || undefined;
  }

  async getCartItems(userId: number): Promise<CartItem[]> {
    return await db.select().from(cartItems).where(eq(cartItems.userId, userId));
  }

  async addToCart(insertCartItem: InsertCartItem): Promise<CartItem> {
    const [cartItem] = await db
      .insert(cartItems)
      .values(insertCartItem)
      .returning();
    return cartItem;
  }

  async updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined> {
    const [cartItem] = await db
      .update(cartItems)
      .set({ quantity })
      .where(eq(cartItems.id, id))
      .returning();
    return cartItem || undefined;
  }

  async removeFromCart(id: number): Promise<boolean> {
    const result = await db.delete(cartItems).where(eq(cartItems.id, id));
    return result.rowCount! > 0;
  }

  async clearCart(userId: number): Promise<boolean> {
    const result = await db.delete(cartItems).where(eq(cartItems.userId, userId));
    return result.rowCount! >= 0;
  }

  async getNotifications(userId: number): Promise<Notification[]> {
    return await db.select().from(notifications).where(eq(notifications.userId, userId));
  }

  async getUnreadNotifications(userId: number): Promise<Notification[]> {
    return await db.select().from(notifications).where(eq(notifications.userId, userId));
  }

  async createNotification(insertNotification: InsertNotification): Promise<Notification> {
    const [notification] = await db
      .insert(notifications)
      .values(insertNotification)
      .returning();
    return notification;
  }

  async markNotificationAsRead(id: number): Promise<Notification | undefined> {
    const [notification] = await db
      .update(notifications)
      .set({ isRead: true })
      .where(eq(notifications.id, id))
      .returning();
    return notification || undefined;
  }

  async markAllNotificationsAsRead(userId: number): Promise<boolean> {
    const result = await db
      .update(notifications)
      .set({ isRead: true })
      .where(eq(notifications.userId, userId));
    return result.rowCount! >= 0;
  }
}

export const storage = new DatabaseStorage();

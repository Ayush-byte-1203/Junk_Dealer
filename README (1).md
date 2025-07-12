# EcoJunk Hub - Waste Management Platform

A comprehensive waste management platform that connects users with certified dealers for recycling and waste disposal services. Built with modern web technologies and a focus on sustainability.

## 🌟 Features

### Core Functionality
- **Real-time Pricing**: Live pricing updates for 15+ waste categories with price history tracking
- **Category Management**: Hierarchical waste categories (Electronics, Metals, Plastics, Paper, etc.)
- **Booking System**: Schedule pickup and drop-off services with flexible time slots
- **Marketplace**: Buy and sell recycled products with detailed listings
- **Dealer Network**: Find certified dealers by location with ratings and specialties
- **Educational Content**: Eco-tips and waste separation guidelines

### User Experience
- **Responsive Design**: Mobile-first approach with hamburger navigation
- **Authentication**: Secure user registration and login system
- **Real-time Updates**: Live price ticker with 30-second refresh intervals
- **Professional UI**: Clean, modern interface with Tailwind CSS and shadcn/ui components

### Technical Features
- **Database Integration**: PostgreSQL with Drizzle ORM for persistent data storage
- **Type Safety**: Full TypeScript implementation across frontend and backend
- **Session Management**: PostgreSQL-based session storage
- **API Design**: RESTful endpoints with proper error handling

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database
- Environment variables configured

### Installation

1. **Clone and install dependencies**
```bash
git clone <repository-url>
cd ecojunk-hub
npm install
```

2. **Set up environment variables**
```bash
# Required environment variables
DATABASE_URL=postgresql://username:password@host:port/database
PGHOST=your-db-host
PGPORT=5432
PGUSER=your-username
PGPASSWORD=your-password
PGDATABASE=your-database
```

3. **Initialize the database**
```bash
# Push schema to database
npm run db:push

# Seed with initial data
cd server && npx tsx seed.ts
```

4. **Start the development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## 📋 Available Scripts

- `npm run dev` - Start development server with hot reloading
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run db:push` - Push database schema changes
- `npm run db:studio` - Open Drizzle Studio for database management

## 🏗️ Architecture

### Frontend (React + TypeScript)
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: React Context for auth and menu state
- **Data Fetching**: TanStack Query for server state management
- **Styling**: Tailwind CSS with shadcn/ui components
- **Build Tool**: Vite for fast development and builds

### Backend (Node.js + Express)
- **Runtime**: Node.js with Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Session-based with PostgreSQL storage
- **API**: RESTful endpoints with JSON responses
- **Type Safety**: Shared TypeScript types between frontend and backend

### Database Schema
- **Users**: Authentication and profile management
- **Categories**: Hierarchical waste categories with pricing
- **Products**: Marketplace items with seller information
- **Bookings**: Service scheduling and status tracking
- **Dealers**: Certified dealer network with location data
- **Notifications**: User alerts and updates
- **Price History**: Historical pricing data for trends

## 🗂️ Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── contexts/       # React Context providers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions and constants
│   │   └── pages/          # Page components
│   └── index.html
├── server/                 # Backend Express application
│   ├── db.ts              # Database connection
│   ├── routes.ts          # API route definitions
│   ├── storage.ts         # Data access layer
│   ├── seed.ts            # Database seeding script
│   └── index.ts           # Server entry point
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Database schema and types
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Categories
- `GET /api/categories` - List all categories
- `POST /api/prices/update` - Update category prices

### Products
- `GET /api/products` - List all products
- `GET /api/products/category/:category` - Products by category
- `POST /api/products` - Create new product listing

### Bookings
- `GET /api/bookings` - User's bookings
- `POST /api/bookings` - Create new booking

### Dealers
- `GET /api/dealers` - List all dealers
- `GET /api/dealers/city/:city` - Dealers by city

## 🎨 UI Components

The application uses a comprehensive set of UI components built with shadcn/ui:

- **Layout**: Header with hamburger menu, responsive sidebar
- **Forms**: Login, registration, booking, and product listing forms
- **Cards**: Category cards, product cards, dealer cards
- **Navigation**: Breadcrumbs, pagination, mobile-friendly menus
- **Feedback**: Toast notifications, loading states, error handling

## 🔧 Configuration

### Database Configuration
The application uses Drizzle ORM with PostgreSQL. Configuration is handled through environment variables and `drizzle.config.ts`.

### Styling Configuration
Tailwind CSS is configured with custom color schemes and shadcn/ui integration. Configuration files:
- `tailwind.config.ts` - Tailwind configuration
- `components.json` - shadcn/ui configuration
- `client/src/index.css` - Global styles and CSS variables

## 🌱 Sustainability Features

### Waste Categories
- **Electronics**: Phones, laptops, circuit boards
- **Metals**: Copper, aluminum, steel, brass
- **Plastics**: Bottles, containers, packaging
- **Paper**: Newspapers, books, cardboard
- **Batteries**: Various battery types
- **Glass**: Bottles and containers
- **Textiles**: Fabric and clothing
- **Wood**: Furniture and scraps
- **Rubber**: Tires and materials

### Educational Content
- Waste separation guidelines
- Eco-friendly tips and practices
- Recycling best practices
- Environmental impact awareness

## 📊 Data Management

### Real-time Features
- Live price updates every 30 seconds
- Dynamic category pricing
- Real-time booking status updates
- Live dealer availability

### Data Persistence
- PostgreSQL database for all application data
- Session-based authentication storage
- Price history tracking for trend analysis
- User preferences and settings storage

## 🔒 Security

- Session-based authentication
- Password hashing and secure storage
- Input validation with Zod schemas
- CSRF protection
- Secure database connections

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Environment Setup
Ensure all required environment variables are set in your deployment environment:
- `DATABASE_URL` - PostgreSQL connection string
- `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE` - Database credentials

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web technologies
- Designed for sustainability and environmental impact
- Focused on user experience and accessibility
- Committed to waste reduction and recycling awareness

---

For support or questions, please contact the development team or create an issue in the repository.
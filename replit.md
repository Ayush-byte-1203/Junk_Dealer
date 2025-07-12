# EcoJunk Hub - Waste Management Platform

## Overview

EcoJunk Hub is a comprehensive waste management platform that connects users with certified dealers for recycling and waste disposal services. The application enables users to get real-time pricing for various waste categories, book pickup/dropoff services, buy/sell items in a marketplace, and access educational content about sustainable practices.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: React Context for authentication and menu state
- **Data Fetching**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM (DatabaseStorage implementation)
- **Database Provider**: PostgreSQL with proper environment variables
- **API Design**: RESTful endpoints with JSON responses
- **Session Management**: PostgreSQL-based session storage
- **Data Persistence**: Full database integration with seeded initial data

### Key Components

#### Database Layer
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Location**: `shared/schema.ts` for shared types between client and server
- **Migrations**: Generated in `./migrations` directory
- **Connection**: Neon Database serverless connection via environment variable

#### Authentication System
- **Strategy**: Simple email/password authentication
- **Storage**: User sessions stored in PostgreSQL
- **Context**: React Context for client-side auth state management
- **Endpoints**: `/api/auth/login` and `/api/auth/register`

#### Core Features
1. **Category Management**: Hierarchical waste categories with real-time pricing
2. **Booking System**: Pickup and dropoff service scheduling
3. **Marketplace**: Buy/sell platform for recyclable items
4. **Dealer Network**: Location-based dealer discovery
5. **Educational Content**: Eco-tips and sustainability guidance

#### UI Components
- **Component Library**: shadcn/ui with Radix UI primitives
- **Theming**: CSS variables with light/dark mode support
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Icons**: Lucide React icons with Font Awesome fallbacks

## Data Flow

### Client-Server Communication
1. **API Requests**: Fetch API with custom query client wrapper
2. **Error Handling**: Centralized error handling with toast notifications
3. **Caching**: TanStack Query for intelligent caching and background updates
4. **Real-time Updates**: Polling for price updates every 30 seconds

### Database Schema
- **Users**: Authentication and profile information
- **Categories**: Hierarchical waste categories with pricing
- **Bookings**: Service requests and scheduling
- **Products**: Marketplace items
- **Dealers**: Service provider information
- **Notifications**: User alerts and updates
- **Price History**: Historical pricing data

## External Dependencies

### Core Libraries
- **React Ecosystem**: React 18 with hooks, React Query, React Hook Form
- **Database**: Drizzle ORM with PostgreSQL driver
- **UI Components**: Radix UI primitives with shadcn/ui
- **Styling**: Tailwind CSS with class-variance-authority
- **Validation**: Zod for schema validation
- **Date Handling**: date-fns for date manipulation

### Development Tools
- **TypeScript**: Full type safety across the stack
- **Vite**: Fast development server and build tool
- **ESBuild**: Production server bundling
- **PostCSS**: CSS processing with Tailwind

## Deployment Strategy

### Development Environment
- **Server**: Node.js development server with hot reloading
- **Client**: Vite dev server with HMR
- **Database**: Neon Database with development connection
- **Environment**: Replit-optimized with cartographer plugin

### Production Build
- **Client**: Vite build to `dist/public` directory
- **Server**: ESBuild bundle to `dist/index.js`
- **Static Assets**: Served from build directory
- **Database**: Production Neon Database connection

### Key Scripts
- `dev`: Development server with TypeScript execution
- `build`: Production build for both client and server
- `start`: Production server execution
- `db:push`: Database schema synchronization

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **NODE_ENV**: Environment mode (development/production)
- **REPL_ID**: Replit environment detection
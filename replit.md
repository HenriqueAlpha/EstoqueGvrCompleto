# Equipment Management System

## Overview

This is a comprehensive Equipment Management System built with React, Express, and PostgreSQL. The application provides a full-featured interface for managing IT equipment inventory, including tracking equipment locations, movements, and generating reports. The system features a modern user interface with server-side rendering capabilities and comprehensive data management functionality.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **State Management**: React Query (TanStack Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite with TypeScript support

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Pattern**: RESTful API with typed endpoints
- **File Processing**: Multer for file uploads, XLSX for Excel processing
- **Development**: Hot module replacement via Vite integration

### Database Schema
The system uses two main tables:
- **Equipment**: Stores equipment details including ID, name, category, model, serial number, status, location, and assignment information
- **Movements**: Tracks equipment movement history with references to equipment, movement types, locations, and responsible parties

## Key Components

### Equipment Management
- **Equipment CRUD Operations**: Full create, read, update, delete functionality
- **Equipment Filtering**: Search and filter by category, status, location, and text search
- **Equipment Tracking**: Unique equipment IDs with serial number tracking
- **Status Management**: Track equipment status (available, assigned, maintenance, retired)

### Movement Tracking
- **Movement History**: Complete audit trail of equipment movements
- **Movement Types**: Support for different movement types (assignments, transfers, maintenance)
- **Location Tracking**: From/to location tracking with responsible party information

### Data Import/Export
- **File Upload**: Excel/CSV file upload functionality using Multer
- **Bulk Import**: Process spreadsheet data for bulk equipment creation
- **Data Validation**: Zod schema validation for imported data

### Dashboard & Analytics
- **Statistics Dashboard**: Real-time equipment statistics and counts
- **Category Analysis**: Equipment distribution by category
- **Recent Activity**: Timeline of recent equipment movements
- **Reporting System**: Generate various reports (planned feature)

## Data Flow

### Client-Server Communication
1. **API Requests**: Client makes HTTP requests to Express server endpoints
2. **Data Validation**: Server validates incoming data using Zod schemas
3. **Database Operations**: Drizzle ORM handles database queries and mutations
4. **Response Formatting**: Server returns structured JSON responses
5. **Client State Management**: React Query manages client-side caching and synchronization

### File Processing Flow
1. **File Upload**: Client uploads Excel/CSV files via drag-and-drop interface
2. **Server Processing**: Multer handles file reception, XLSX processes Excel data
3. **Data Validation**: Each row validated against equipment schema
4. **Database Insertion**: Bulk insert validated equipment records
5. **Progress Feedback**: Real-time feedback on import progress and results

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm**: Type-safe database ORM with schema management
- **@tanstack/react-query**: Server state management and caching
- **@radix-ui/***: Comprehensive UI component library
- **react-hook-form**: Form state management and validation
- **zod**: Runtime type validation and schema definition

### Development Dependencies
- **vite**: Fast build tool with HMR support
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production builds
- **tailwindcss**: Utility-first CSS framework

### File Processing
- **multer**: Multipart form data handling for file uploads
- **xlsx**: Excel file parsing and processing
- **date-fns**: Date formatting and manipulation utilities

## Deployment Strategy

### Build Process
1. **Client Build**: Vite builds the React application for production
2. **Server Build**: esbuild bundles the Express server with external dependencies
3. **Database Migration**: Drizzle handles schema migrations via `db:push` command
4. **Asset Optimization**: Vite optimizes static assets and applies code splitting

### Environment Configuration
- **Development**: Uses `NODE_ENV=development` with Vite dev server integration
- **Production**: Uses `NODE_ENV=production` with built assets served statically
- **Database**: Configurable via `DATABASE_URL` environment variable
- **Replit Integration**: Special handling for Replit development environment

### Database Management
- **Schema Definition**: Centralized schema in `shared/schema.ts`
- **Migrations**: Automatic schema synchronization via Drizzle
- **Connection Pooling**: Handled by Neon serverless database
- **Type Safety**: Full TypeScript integration with database operations

The system is designed to be deployed on platforms like Replit, Vercel, or any Node.js hosting environment with PostgreSQL database support.
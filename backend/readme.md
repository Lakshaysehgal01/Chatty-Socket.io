# Chatty-Socket.io Backend

This is the backend server for Chatty-Socket.io, a real-time chat application. It is built with Node.js, Express, TypeScript, and Socket.io, providing APIs and socket events for authentication, messaging, and user management.

## Features

- User authentication (signup, login, JWT)
- Real-time messaging with Socket.io
- User and message models (MongoDB)
- RESTful API endpoints
- Middleware for authentication and validation
- Cloudinary integration for avatar uploads
- Data validation with Zod

## Folder Structure

```
backend/
  src/
    controllers/   # Route logic (auth, message)
    lib/           # Utilities (db, cloudinary, socket, zod, util)
    middleware/    # Express middlewares (auth)
    models/        # Mongoose models (user, message)
    routes/        # API route definitions
    seeds/         # Seed scripts (user)
    types/         # Type definitions
  package.json     # Backend dependencies and scripts
  tsconfig.json    # TypeScript configuration
```

## Main Components

- **Controllers**: Handle business logic for authentication and messaging.
- **Models**: Define MongoDB schemas for users and messages.
- **Routes**: Map HTTP endpoints to controllers.
- **Middleware**: Protect routes and validate requests.
- **Lib**: Utilities for database connection, cloud storage, socket setup, and validation.
- **Types**: TypeScript type definitions for environment, Express, etc.

## Setup Instructions

### Prerequisites

- Node.js (v18+ recommended)
- MongoDB instance
- Cloudinary account (for avatar uploads)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the `backend/` directory with the following variables:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

### Running the Server

```bash
npm run dev
```

The server will start on the port specified in your environment variables (default: 5000).

## API Endpoints

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login and receive JWT
- `GET /api/message` - Get messages (protected)
- `POST /api/message` - Send a message (protected)

## Socket.io Events

- `connection` - Establish socket connection
- `message` - Send/receive real-time messages
- `disconnect` - Handle user disconnect

## Development

- TypeScript for type safety
- Nodemon for auto-reloading (dev)
- Organized codebase for scalability

## Seeding Data

Run the seed script to populate initial users:

```bash
npm run seed
```

## License

MIT

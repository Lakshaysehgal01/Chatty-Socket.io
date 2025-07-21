# Chatty-Socket.io

Chatty-Socket.io is a real-time chat application built with Socket.io, Express, and React. It enables users to communicate instantly, manage profiles, and experience seamless messaging with a modern UI.

## Features

- Real-time messaging using Socket.io
- User authentication (signup, login)
- Profile management
- Chat rooms and direct messaging
- Responsive and modern frontend (React + Vite)
- Avatar support
- Skeleton loading states for better UX

## Project Structure

```
Chatty-Socket.io/
  backend/      # Node.js, Express, Socket.io server
  frontend/     # React client (Vite)
```

### Backend

- Located in `backend/`
- Handles authentication, messaging, and socket connections
- Organized into controllers, models, routes, middleware, and utility libraries

### Frontend

- Located in `frontend/`
- Built with React and Vite
- Contains pages, components, stores, and utility libraries

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Lakshaysehgal01/Chatty-Socket.io.git
   cd Chatty-Socket.io
   ```
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

### Running the App

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```
2. Start the frontend client:
   ```bash
   cd ../frontend
   npm run dev
   ```
3. Open your browser at [http://localhost:5173](http://localhost:5173)

## Configuration

- Environment variables for backend should be set in a `.env` file (see `src/types/env/env.d.ts` for types)
- Update frontend API endpoints in `src/lib/axios.ts` if needed

## Contributing

Pull requests and suggestions are welcome! Please open an issue for major changes.

## License

This project is licensed under the MIT License.

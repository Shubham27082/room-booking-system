# Room Booking System

A full-stack room booking application built with React.js, Node.js, Express, and SQLite.

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Architecture](#architecture)

## ✨ Features

- **User Authentication**: JWT-based registration and login with bcrypt password hashing
- **Room Browsing**: View available rooms with details and pricing
- **Smart Booking**: Date selection with real-time availability checking
- **Overlap Prevention**: Backend validation prevents double bookings
- **Booking Management**: View all your bookings in one place
- **Modern UI**: Beautiful, responsive design with Tailwind CSS
- **Protected Routes**: Secure access to authenticated features
- **Real-time Validation**: Form validation and error handling

## 🛠 Tech Stack

### Frontend
- React.js 18
- React Router v6
- Axios
- Tailwind CSS
- Functional components with Hooks

### Backend
- Node.js
- Express.js
- JWT (jsonwebtoken)
- bcrypt
- SQLite3
- CORS

### Database
- SQLite (MySQL-compatible schema)

## 📦 Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd room-booking-system
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file (or copy from .env.example)
echo "DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=room_booking
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000" > .env
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

### 4. Database Setup
The SQLite database will be automatically created when you start the backend server. It includes:
- Users table
- Rooms table
- Bookings table
- 5 pre-loaded sample rooms

## ▶️ Running the Application

### Start Backend Server
```bash
cd backend
npm start
```
Server will run on http://localhost:5000

### Start Frontend Server
```bash
cd frontend
npm start
```
Application will open at http://localhost:3000

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Room Endpoints

#### Get All Rooms
```http
GET /api/rooms
```

### Booking Endpoints (Protected)

#### Check Availability
```http
POST /api/bookings/check-availability
Authorization: Bearer <token>
Content-Type: application/json

{
  "roomId": 1,
  "startDate": "2024-03-15",
  "endDate": "2024-03-18"
}
```

#### Create Booking
```http
POST /api/bookings
Authorization: Bearer <token>
Content-Type: application/json

{
  "roomId": 1,
  "startDate": "2024-03-15",
  "endDate": "2024-03-18"
}
```

#### Get My Bookings
```http
GET /api/bookings/my-bookings
Authorization: Bearer <token>
```

**For complete API documentation, see [API-DOCUMENTATION.md](API-DOCUMENTATION.md)**

**For Postman testing, import [Room-Booking-API.postman_collection.json](Room-Booking-API.postman_collection.json)**

## 📁 Project Structure

```
room-booking-system/
├── backend/
│   ├── config/
│   │   └── database.js          # Database configuration
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── bookingController.js # Booking logic
│   │   └── roomController.js    # Room logic
│   ├── middleware/
│   │   └── auth.js              # JWT authentication middleware
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   ├── bookingRoutes.js     # Booking endpoints
│   │   └── roomRoutes.js        # Room endpoints
│   ├── services/
│   │   ├── authService.js       # Auth business logic
│   │   ├── bookingService.js    # Booking business logic
│   │   └── roomService.js       # Room business logic
│   ├── .env.example             # Environment variables template
│   ├── package.json
│   └── server.js                # Express server entry point
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js        # Navigation component
│   │   │   ├── RoomCard.js      # Room display component
│   │   │   └── BookingModal.js  # Booking form modal
│   │   ├── pages/
│   │   │   ├── Login.js         # Login page
│   │   │   ├── Register.js      # Registration page
│   │   │   ├── Dashboard.js     # Room listing page
│   │   │   └── MyBookings.js    # User bookings page
│   │   ├── services/
│   │   │   └── api.js           # Axios API configuration
│   │   ├── App.js               # Main app component
│   │   └── index.js             # React entry point
│   ├── package.json
│   └── tailwind.config.js       # Tailwind CSS configuration
│
├── README.md                                    # This file
├── database.sql                                 # Database schema
├── architecture-notes.txt                       # Architecture explanation
├── API-DOCUMENTATION.md                         # Complete API docs
├── Room-Booking-API.postman_collection.json    # Postman collection
└── REQUIREMENTS-CHECKLIST.md                   # Requirements verification
```

## 🧪 Testing

### Manual Testing Steps

1. **Register a new user**
   - Go to http://localhost:3000
   - Click "Register"
   - Fill in name, email, password
   - Submit

2. **Login**
   - Use registered credentials
   - Should redirect to dashboard

3. **Browse rooms**
   - View 5 pre-loaded rooms
   - See prices and descriptions

4. **Book a room**
   - Click "Book Now" on any room
   - Select check-in and check-out dates
   - See price calculation
   - Confirm booking

5. **Test overlap prevention**
   - Try booking same room with overlapping dates
   - Should show "not available" error

6. **View bookings**
   - Click "My Bookings" in navbar
   - See all your bookings with details

### Using Postman

1. Import `Room-Booking-API.postman_collection.json`
2. Register a user via `/api/auth/register`
3. Login via `/api/auth/login` and copy the token
4. Set token in Postman environment variable `{{token}}`
5. Test all protected endpoints

## 🏗 Architecture

### Booking Overlap Prevention

The system prevents double bookings using:

1. **SQL-based validation**: 
   ```sql
   SELECT * FROM bookings 
   WHERE room_id = ? 
   AND start_date <= ? 
   AND end_date >= ?
   ```

2. **Database transactions**: Atomic booking creation with rollback on conflict

3. **Row-level locking**: `FOR UPDATE` clause prevents race conditions

4. **Backend validation**: Not relying on frontend-only checks

**For detailed architecture explanation, see [architecture-notes.txt](architecture-notes.txt)**

## 🔒 Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT token-based authentication
- Protected API routes
- Input validation on backend
- SQL injection prevention (parameterized queries)
- CORS configuration

## 📝 Database Schema

### Users Table
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Rooms Table
```sql
CREATE TABLE rooms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price_per_night REAL NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Bookings Table
```sql
CREATE TABLE bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    room_id INTEGER NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);
```

**Complete schema available in [database.sql](database.sql)**

## 🎨 UI Features

- Modern, responsive design with Tailwind CSS
- Gradient color schemes
- Smooth animations and transitions
- Loading states with spinners
- Error and success messages
- Empty state designs
- Mobile-friendly layout
- Booking modal with real-time price calculation

## 📄 License

This project is created for educational purposes.

## 👤 Author

[Your Name]

## 🙏 Acknowledgments

- Built as part of a full-stack development assignment
- Focuses on clean architecture and best practices
- Demonstrates full-stack integration skills

## API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/rooms` - Get all rooms
- `POST /api/bookings/check-availability` - Check room availability
- `POST /api/bookings` - Create booking
- `GET /api/bookings/my-bookings` - Get user bookings

## Default Test Data

After running database.sql, you'll have 5 sample rooms available for booking.

## Project Structure

```
room-booking-system/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   └── App.js
    └── package.json
```

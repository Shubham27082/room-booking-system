# Room Booking System

A full-stack room booking application built with React.js, Node.js, Express, and SQLite.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/Shubham27082/room-booking-system.git
cd room-booking-system
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=room_booking
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

### 4. Run the Application

**Start Backend Server:**
```bash
cd backend
npm start
```
Backend will run on http://localhost:5000

**Start Frontend Server (in a new terminal):**
```bash
cd frontend
npm start
```
Frontend will open at http://localhost:3000

### 5. Database
The SQLite database will be automatically created when you start the backend server with:
- Users table
- Rooms table
- Bookings table
- 5 pre-loaded sample rooms

## Quick Test

1. Open http://localhost:3000
2. Click "Register" and create an account
3. Login with your credentials
4. Browse available rooms
5. Click "Book Now" on any room
6. Select dates and confirm booking
7. View your bookings in "My Bookings"

## Additional Documentation

- **API Documentation**: See `API-DOCUMENTATION.md`
- **Architecture Details**: See `architecture-notes.txt`
- **Database Schema**: See `database.sql`
- **Postman Collection**: Import `Room-Booking-API.postman_collection.json`

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

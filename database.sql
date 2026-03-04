-- Create database
CREATE DATABASE IF NOT EXISTS room_booking;
USE room_booking;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Rooms table
CREATE TABLE IF NOT EXISTS rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price_per_night DECIMAL(10, 2) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    room_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
    INDEX idx_room_dates (room_id, start_date, end_date)
);

-- Insert sample rooms
INSERT INTO rooms (name, price_per_night, description) VALUES
('Deluxe Suite', 150.00, 'Spacious suite with king bed and city view'),
('Standard Room', 80.00, 'Comfortable room with queen bed'),
('Ocean View Room', 200.00, 'Beautiful ocean view with balcony'),
('Family Room', 120.00, 'Large room with two queen beds'),
('Executive Suite', 250.00, 'Luxury suite with separate living area');

const db = require('../config/database');

class BookingService {
  async checkAvailability(roomId, startDate, endDate) {
    const [bookings] = await db.execute(
      `SELECT * FROM bookings 
       WHERE room_id = ? 
       AND start_date <= ? 
       AND end_date >= ?`,
      [roomId, endDate, startDate]
    );

    return bookings.length === 0;
  }

  async createBooking(userId, roomId, startDate, endDate) {
    const connection = await db.getConnection();
    
    try {
      await connection.beginTransaction();

      const [existingBookings] = await connection.execute(
        `SELECT * FROM bookings 
         WHERE room_id = ? 
         AND start_date <= ? 
         AND end_date >= ?
         FOR UPDATE`,
        [roomId, endDate, startDate]
      );

      if (existingBookings.length > 0) {
        throw new Error('Room is not available for selected dates');
      }

      const [result] = await connection.execute(
        'INSERT INTO bookings (user_id, room_id, start_date, end_date) VALUES (?, ?, ?, ?)',
        [userId, roomId, startDate, endDate]
      );

      await connection.commit();

      return {
        id: result.insertId,
        userId,
        roomId,
        startDate,
        endDate
      };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  async getUserBookings(userId) {
    const [bookings] = await db.execute(
      `SELECT b.*, r.name as room_name, r.price_per_night 
       FROM bookings b
       JOIN rooms r ON b.room_id = r.id
       WHERE b.user_id = ?
       ORDER BY b.created_at DESC`,
      [userId]
    );

    return bookings;
  }
}

module.exports = new BookingService();

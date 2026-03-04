const bookingService = require('../services/bookingService');

class BookingController {
  async checkAvailability(req, res) {
    try {
      const { roomId, startDate, endDate } = req.body;

      if (!roomId || !startDate || !endDate) {
        return res.status(400).json({ message: 'Room ID, start date, and end date are required' });
      }

      const isAvailable = await bookingService.checkAvailability(roomId, startDate, endDate);
      res.json({ available: isAvailable });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  async createBooking(req, res) {
    try {
      const { roomId, startDate, endDate } = req.body;
      const userId = req.userId;

      if (!roomId || !startDate || !endDate) {
        return res.status(400).json({ message: 'Room ID, start date, and end date are required' });
      }

      if (new Date(startDate) >= new Date(endDate)) {
        return res.status(400).json({ message: 'End date must be after start date' });
      }

      const booking = await bookingService.createBooking(userId, roomId, startDate, endDate);
      res.status(201).json({ message: 'Booking created successfully', booking });
    } catch (error) {
      if (error.message === 'Room is not available for selected dates') {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  async getMyBookings(req, res) {
    try {
      const userId = req.userId;
      const bookings = await bookingService.getUserBookings(userId);
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
}

module.exports = new BookingController();

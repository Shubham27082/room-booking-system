const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const authMiddleware = require('../middleware/auth');

router.post('/check-availability', authMiddleware, bookingController.checkAvailability);
router.post('/', authMiddleware, bookingController.createBooking);
router.get('/my-bookings', authMiddleware, bookingController.getMyBookings);

module.exports = router;

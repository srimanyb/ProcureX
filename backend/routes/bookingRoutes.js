const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.get('/slots/available', bookingController.getAvailableSlots);
router.post('/', bookingController.createBooking);
router.get('/:id', bookingController.getBookingById);
router.get('/farmer/:farmerId', bookingController.getFarmerBookings);

module.exports = router;

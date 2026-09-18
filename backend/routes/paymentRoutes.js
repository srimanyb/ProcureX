const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.get('/:bookingId?', paymentController.getPaymentByBooking);
router.put('/:bookingId?', paymentController.updatePaymentStatus);

module.exports = router;

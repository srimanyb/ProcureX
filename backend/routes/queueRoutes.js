const express = require('express');
const router = express.Router();
const queueController = require('../controllers/queueController');

router.get('/:bookingId?', queueController.getQueueStatus);
router.post('/simulate/:bookingId?', queueController.simulateQueueStep);
router.post('/reset-simulation/:bookingId?', queueController.resetQueueSimulation);

module.exports = router;

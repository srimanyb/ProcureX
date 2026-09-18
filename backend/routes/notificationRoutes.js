const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');

router.get('/:farmerId?', notificationController.getNotifications);
router.post('/read/:id', notificationController.markAsRead);
router.post('/read-all/:farmerId?', notificationController.markAllRead);

module.exports = router;

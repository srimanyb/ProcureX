const express = require('express');
const router = express.Router();
const procurementController = require('../controllers/procurementController');

router.get('/:bookingId?', procurementController.getProcurementStatus);
router.put('/:bookingId?', procurementController.updateProcurementStatus);

module.exports = router;

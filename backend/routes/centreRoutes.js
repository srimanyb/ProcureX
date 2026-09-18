const express = require('express');
const router = express.Router();
const centreController = require('../controllers/centreController');

router.get('/dashboard', centreController.getCentreDashboard);
router.post('/call-next', centreController.callNextFarmer);
router.post('/start-procurement', centreController.startProcurement);
router.post('/complete-procurement', centreController.completeProcurement);
router.post('/update-payment', centreController.updatePaymentStatusFromCentre);
router.get('/analytics', centreController.getCentreAnalytics);

module.exports = router;

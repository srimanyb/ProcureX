const express = require('express');
const router = express.Router();
const farmerController = require('../controllers/farmerController');

router.post('/register', farmerController.registerFarmer);
router.post('/login', farmerController.loginFarmer);
router.get('/:farmerId', farmerController.getFarmerProfile);

module.exports = router;

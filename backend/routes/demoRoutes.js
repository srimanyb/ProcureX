const express = require('express');
const router = express.Router();
const seedData = require('../seed/seedData');
const Farmer = require('../models/Farmer');
const Booking = require('../models/Booking');

// Reset to default demo data
router.post('/reset', async (req, res) => {
  try {
    await seedData();
    res.json({
      success: true,
      message: 'Demo dataset reset to initial SIH 2026 state successfully!'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Quick demo login helper: returns pre-seeded demo accounts
router.get('/presets', async (req, res) => {
  try {
    const demoFarmer = await Farmer.findOne({ farmerId: 'FARM1024' });
    const demoBooking = await Booking.findOne({ bookingId: 'PX10245' });

    res.json({
      success: true,
      farmer: demoFarmer,
      booking: demoBooking,
      centre: {
        id: 'CPC-01',
        name: 'Central Procurement Centre (APMC Yard)'
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

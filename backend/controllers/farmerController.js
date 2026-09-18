const Farmer = require('../models/Farmer');
const Booking = require('../models/Booking');

// Register a new farmer
exports.registerFarmer = async (req, res) => {
  try {
    const { name, mobile, farmerId, village, district, preferredCentre, commodity } = req.body;

    if (!name || !mobile || !farmerId || !village || !district || !commodity) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields.'
      });
    }

    // Check if farmer already exists
    let farmer = await Farmer.findOne({ farmerId: farmerId.toUpperCase() });
    if (farmer) {
      farmer.name = name;
      farmer.mobile = mobile;
      farmer.village = village;
      farmer.district = district;
      farmer.preferredCentre = preferredCentre || farmer.preferredCentre;
      farmer.commodity = commodity;
      await farmer.save();
    } else {
      farmer = await Farmer.create({
        name,
        mobile,
        farmerId: farmerId.toUpperCase(),
        village,
        district,
        preferredCentre: preferredCentre || 'Central Procurement Centre (APMC Yard)',
        commodity
      });
    }

    res.status(201).json({
      success: true,
      message: 'Farmer registration successful!',
      farmer
    });
  } catch (error) {
    console.error('Farmer registration error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during registration'
    });
  }
};

// Login farmer by mobile or farmerId
exports.loginFarmer = async (req, res) => {
  try {
    const { identifier } = req.body; // mobile number or farmerId

    if (!identifier) {
      return res.status(400).json({
        success: false,
        message: 'Please provide your Mobile Number or Farmer ID.'
      });
    }

    const trimmed = identifier.trim();
    let farmer = await Farmer.findOne({
      $or: [
        { mobile: trimmed },
        { farmerId: trimmed.toUpperCase() }
      ]
    });

    if (!farmer) {
      // For smooth demo experience, if user enters FARM1024 or 9876543210 or any demo, find default or create
      if (trimmed === 'FARM1024' || trimmed === '9876543210') {
        farmer = await Farmer.findOne({ farmerId: 'FARM1024' });
      }
    }

    if (!farmer) {
      return res.status(404).json({
        success: false,
        message: 'Farmer not found. Please register first or use Demo Farmer login.'
      });
    }

    // Fetch active booking
    const activeBooking = await Booking.findOne({ farmerId: farmer.farmerId }).sort({ createdAt: -1 });

    res.json({
      success: true,
      message: `Welcome back, ${farmer.name}!`,
      farmer,
      activeBookingId: activeBooking ? activeBooking.bookingId : null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Farmer Profile & Latest Booking
exports.getFarmerProfile = async (req, res) => {
  try {
    const { farmerId } = req.params;
    const farmer = await Farmer.findOne({ farmerId: farmerId.toUpperCase() });

    if (!farmer) {
      return res.status(404).json({ success: false, message: 'Farmer not found' });
    }

    const latestBooking = await Booking.findOne({ farmerId: farmer.farmerId }).sort({ createdAt: -1 });

    res.json({
      success: true,
      farmer,
      latestBooking
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

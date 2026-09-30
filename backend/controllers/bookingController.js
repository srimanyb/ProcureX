const Booking = require('../models/Booking');
const Queue = require('../models/Queue');
const ProcurementStatus = require('../models/ProcurementStatus');
const Payment = require('../models/Payment');
const Notification = require('../models/Notification');
const Farmer = require('../models/Farmer');

// Get available slots for selected centre, commodity, and date
exports.getAvailableSlots = async (req, res) => {
  try {
    const { centre, commodity, date } = req.query;

    // Standard hourly procurement time slots
    const standardSlots = [
      { time: '09:00 AM', maxCapacity: 15, booked: 14, status: 'Few Slots Left', estimatedWait: '~15 min' },
      { time: '10:00 AM', maxCapacity: 15, booked: 15, status: 'Full', estimatedWait: '~35 min' },
      { time: '11:00 AM', maxCapacity: 15, booked: 8, status: 'Available', estimatedWait: '~10 min' },
      { time: '12:00 PM', maxCapacity: 15, booked: 6, status: 'Available', estimatedWait: '~10 min' },
      { time: '02:00 PM', maxCapacity: 15, booked: 12, status: 'Few Slots Left', estimatedWait: '~20 min' },
      { time: '03:00 PM', maxCapacity: 15, booked: 4, status: 'Available', estimatedWait: '~5 min' },
      { time: '04:00 PM', maxCapacity: 15, booked: 2, status: 'Available', estimatedWait: '~5 min' }
    ];

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dynamicDefaultDate = `${tomorrow.getDate()} ${months[tomorrow.getMonth()]} ${tomorrow.getFullYear()}`;

    res.json({
      success: true,
      centre: centre || 'Central Procurement Centre (APMC Yard)',
      commodity: commodity || 'Rice',
      date: date || dynamicDefaultDate,
      slots: standardSlots
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create a new slot booking
exports.createBooking = async (req, res) => {
  try {
    const { farmerId, farmerName, farmerMobile, commodity, centre, date, slot, estimatedQuantity } = req.body;

    if (!farmerId || !commodity || !centre || !date || !slot) {
      return res.status(400).json({
        success: false,
        message: 'Missing required booking information'
      });
    }

    // Generate unique Booking ID
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const bookingId = `PX${randomSuffix}`;

    // Determine next queue number
    const count = await Booking.countDocuments();
    const queueNumber = 18 + (count % 40) + 1;

    // Create Booking
    const newBooking = await Booking.create({
      bookingId,
      farmerId,
      farmerName: farmerName || 'Registered Farmer',
      farmerMobile: farmerMobile || '9876543210',
      commodity,
      centre,
      centreId: 'CPC-01',
      date,
      slot,
      queueNumber,
      status: 'Confirmed',
      estimatedQuantity: estimatedQuantity || 40
    });

    // Add to Queue List in DB
    let queue = await Queue.findOne({ centreId: 'CPC-01' });
    if (queue) {
      queue.queueList.push({
        queueNumber,
        farmerName: newBooking.farmerName,
        farmerId: newBooking.farmerId,
        bookingId: newBooking.bookingId,
        commodity: newBooking.commodity,
        slot: newBooking.slot,
        status: 'Waiting'
      });
      await queue.save();
    }

    // Create initial ProcurementStatus record
    await ProcurementStatus.create({
      bookingId,
      farmerId,
      commodity,
      centre,
      weightQuintals: newBooking.estimatedQuantity,
      qualityGrade: 'Pending Assessment',
      moistureContent: 'Pending Test',
      overallStatus: 'Confirmed',
      stages: [
        {
          title: 'Slot Booked',
          description: `Procurement slot confirmed for ${date} at ${slot}.`,
          status: 'completed',
          timestamp: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
          officer: 'System Digital Desk'
        },
        {
          title: 'Farmer Arrived',
          description: 'Awaiting arrival at APMC Yard Gate.',
          status: 'pending',
          timestamp: '--',
          officer: 'Security Gate'
        },
        {
          title: 'Verification Completed',
          description: 'Aadhaar, 7/12 land records and moisture testing.',
          status: 'pending',
          timestamp: '--',
          officer: 'Quality Inspector'
        },
        {
          title: 'Procurement In Progress',
          description: 'Weighment at calibrated electronic weighbridge.',
          status: 'pending',
          timestamp: '--',
          officer: 'Weighbridge Desk'
        },
        {
          title: 'Procurement Completed',
          description: 'Produce receipt & acceptance voucher generation.',
          status: 'pending',
          timestamp: '--',
          officer: 'Procurement In-charge'
        },
        {
          title: 'Payment Processed',
          description: 'Direct Benefit Transfer (DBT) into farmer bank account.',
          status: 'pending',
          timestamp: '--',
          officer: 'PFMS Nodal Officer'
        }
      ]
    });

    // Create initial Payment entry
    const rate = commodity === 'Rice' ? 2320 : (commodity === 'Wheat' ? 2275 : 2100);
    const total = (newBooking.estimatedQuantity || 40) * rate;
    await Payment.create({
      transactionId: `PX-PAY-${randomSuffix}`,
      bookingId,
      farmerId,
      farmerName: newBooking.farmerName,
      commodity,
      quantityQuintals: newBooking.estimatedQuantity,
      mspRatePerQuintal: rate,
      totalAmount: total,
      status: 'Initiated',
      paymentMode: 'Aadhaar-Linked DBT (PFMS)',
      bankAccountMasked: 'Direct Account Transfer',
      processedDate: 'Pending produce delivery',
      history: []
    });

    // Push notification
    await Notification.create({
      farmerId,
      title: 'Slot Booked Successfully!',
      message: `Your booking ID is ${bookingId} for ${commodity} on ${date} at ${slot}. Queue Token: #${queueNumber}.`,
      type: 'success',
      icon: '🎫',
      read: false
    });

    res.status(201).json({
      success: true,
      message: 'Slot booked successfully!',
      booking: newBooking
    });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    let booking = await Booking.findOne({ bookingId: id });

    if (!booking) {
      // Fallback for demo ID if not matched
      booking = await Booking.findOne({ bookingId: 'PX10245' });
    }

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    res.json({
      success: true,
      booking
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all bookings for a farmer
exports.getFarmerBookings = async (req, res) => {
  try {
    const { farmerId } = req.params;
    const bookings = await Booking.find({ farmerId: farmerId.toUpperCase() }).sort({ createdAt: -1 });

    res.json({
      success: true,
      bookings
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

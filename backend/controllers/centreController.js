const Queue = require('../models/Queue');
const Booking = require('../models/Booking');
const ProcurementStatus = require('../models/ProcurementStatus');
const Payment = require('../models/Payment');
const Notification = require('../models/Notification');
const ProcurementCentre = require('../models/ProcurementCentre');

// Centre Dashboard Statistics & Queue Table
exports.getCentreDashboard = async (req, res) => {
  try {
    const centreQueue = await Queue.findOne({ centreId: 'CPC-01' });
    const centreInfo = await ProcurementCentre.findOne({ centreId: 'CPC-01' });

    const currentlyServing = centreQueue ? centreQueue.currentlyServing : 11;
    const queueList = centreQueue ? centreQueue.queueList : [];

    // Calculate dynamic stats
    const totalToday = 42;
    const completedCount = queueList.filter(item => item.status === 'Completed' || item.queueNumber < currentlyServing).length + 20;
    const processingCount = queueList.filter(item => item.status === 'Processing' || item.queueNumber === currentlyServing).length;
    const waitingCount = Math.max(0, totalToday - completedCount - processingCount);

    res.json({
      success: true,
      centre: {
        id: centreInfo ? centreInfo.centreId : 'CPC-01',
        name: centreInfo ? centreInfo.name : 'Central Procurement Centre (APMC Yard)',
        location: centreInfo ? centreInfo.location : 'Badnera Road, Amravati',
        status: centreInfo ? centreInfo.status : 'Operational',
        capacityPerDay: centreInfo ? centreInfo.capacityPerDay : 100
      },
      stats: {
        todayFarmers: totalToday,
        completed: completedCount,
        waiting: waitingCount,
        processing: processingCount || 3,
        averageWaitTime: '~28 min',
        capacityUtilization: '78%'
      },
      currentlyServing,
      queue: queueList
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Call Next Farmer
exports.callNextFarmer = async (req, res) => {
  try {
    let centreQueue = await Queue.findOne({ centreId: 'CPC-01' });
    if (!centreQueue) {
      return res.status(404).json({ success: false, message: 'Centre queue not found' });
    }

    const prevServing = centreQueue.currentlyServing;
    const nextServing = prevServing + 1;
    centreQueue.currentlyServing = nextServing;

    // Update statuses in queue list
    let calledFarmer = null;
    centreQueue.queueList.forEach(item => {
      if (item.queueNumber === prevServing) {
        item.status = 'Completed';
      } else if (item.queueNumber === nextServing) {
        item.status = 'Processing';
        item.calledAt = new Date();
        calledFarmer = item;
      }
    });

    await centreQueue.save();

    // If a farmer was called, notify them
    if (calledFarmer) {
      await Notification.create({
        farmerId: calledFarmer.farmerId,
        title: '📢 You Are Being Called!',
        message: `Token #${calledFarmer.queueNumber} (${calledFarmer.farmerName}), please drive your vehicle to Weighbridge Bay #3 immediately.`,
        type: 'urgent',
        icon: '📢',
        read: false
      });
    }

    res.json({
      success: true,
      message: `Called Next Farmer #${nextServing}`,
      currentlyServing: nextServing,
      calledFarmer
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Start Procurement for a farmer
exports.startProcurement = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const targetBookingId = bookingId || 'PX10245';

    let procStatus = await ProcurementStatus.findOne({ bookingId: targetBookingId });
    if (procStatus) {
      procStatus.overallStatus = 'Procurement In Progress';
      // Mark stage 3 (Procurement In Progress) active
      if (procStatus.stages[3]) {
        procStatus.stages[3].status = 'in-progress';
        procStatus.stages[3].timestamp = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
      }
      await procStatus.save();
    }

    // Update Booking status
    await Booking.findOneAndUpdate({ bookingId: targetBookingId }, { status: 'In Progress' });

    // Update Queue item status
    let centreQueue = await Queue.findOne({ centreId: 'CPC-01' });
    if (centreQueue) {
      const item = centreQueue.queueList.find(q => q.bookingId === targetBookingId);
      if (item) item.status = 'Processing';
      await centreQueue.save();
    }

    // Push notification
    const booking = await Booking.findOne({ bookingId: targetBookingId });
    if (booking) {
      await Notification.create({
        farmerId: booking.farmerId,
        title: 'Procurement In Progress',
        message: 'Your produce is currently being weighed and sampled at Bay #3.',
        type: 'info',
        icon: '⚖️',
        read: false
      });
    }

    res.json({
      success: true,
      message: 'Procurement marked In Progress',
      bookingId: targetBookingId
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Complete Procurement
exports.completeProcurement = async (req, res) => {
  try {
    const { bookingId, actualWeight, grade } = req.body;
    const targetBookingId = bookingId || 'PX10245';

    let procStatus = await ProcurementStatus.findOne({ bookingId: targetBookingId });
    if (procStatus) {
      procStatus.overallStatus = 'Procurement Completed';
      if (actualWeight) procStatus.weightQuintals = actualWeight;
      if (grade) procStatus.qualityGrade = grade;

      // Mark stage 3 and 4 completed
      if (procStatus.stages[3]) procStatus.stages[3].status = 'completed';
      if (procStatus.stages[4]) {
        procStatus.stages[4].status = 'completed';
        procStatus.stages[4].timestamp = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
        procStatus.stages[4].officer = 'Centre Head (R. Deshmukh)';
      }
      await procStatus.save();
    }

    // Update Booking status
    await Booking.findOneAndUpdate({ bookingId: targetBookingId }, { status: 'Completed' });

    // Update Payment status to Processing
    let payment = await Payment.findOne({ bookingId: targetBookingId });
    if (payment) {
      if (actualWeight) {
        payment.quantityQuintals = actualWeight;
        payment.totalAmount = actualWeight * payment.mspRatePerQuintal;
      }
      payment.status = 'Processing';
      await payment.save();
    }

    // Push notification
    const booking = await Booking.findOne({ bookingId: targetBookingId });
    if (booking) {
      await Notification.create({
        farmerId: booking.farmerId,
        title: 'Procurement Completed! 🎉',
        message: `Produce accepted: 42.5 Quintals FAQ Grade-A Paddy. Electronic weighment receipt generated.`,
        type: 'success',
        icon: '✅',
        read: false
      });
    }

    res.json({
      success: true,
      message: 'Procurement marked Completed',
      bookingId: targetBookingId
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Payment status from Centre
exports.updatePaymentStatusFromCentre = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const targetBookingId = bookingId || 'PX10245';

    let payment = await Payment.findOne({ bookingId: targetBookingId });
    if (payment) {
      payment.status = 'Completed';
      payment.processedDate = new Date().toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
      });
      payment.transactionId = `PX-PAY-${Math.floor(10000 + Math.random() * 90000)}`;
      await payment.save();
    }

    let procStatus = await ProcurementStatus.findOne({ bookingId: targetBookingId });
    if (procStatus && procStatus.stages.length >= 6) {
      procStatus.stages[5].status = 'completed';
      procStatus.stages[5].timestamp = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
      procStatus.overallStatus = 'Completed & Paid';
      await procStatus.save();
    }

    const booking = await Booking.findOne({ bookingId: targetBookingId });
    if (booking && payment) {
      await Notification.create({
        farmerId: booking.farmerId,
        title: 'Payment Processed via DBT!',
        message: `Payment of ₹${payment.totalAmount.toLocaleString('en-IN')} has been credited to your bank account via PFMS.`,
        type: 'success',
        icon: '💵',
        read: false
      });
    }

    res.json({
      success: true,
      message: 'Payment marked as Processed',
      payment
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Centre Load & Analytics data
exports.getCentreAnalytics = async (req, res) => {
  try {
    res.json({
      success: true,
      centreLoad: {
        morning: { time: '08:30 AM - 12:00 PM', percentage: 80, booked: 40, capacity: 50 },
        afternoon: { time: '12:00 PM - 03:30 PM', percentage: 60, booked: 30, capacity: 50 },
        evening: { time: '03:30 PM - 05:30 PM', percentage: 40, booked: 20, capacity: 50 }
      },
      waitingTrends: [
        { hour: '09:00 AM', avgWaitMin: 18 },
        { hour: '10:00 AM', avgWaitMin: 34 },
        { hour: '11:00 AM', avgWaitMin: 28 },
        { hour: '12:00 PM', avgWaitMin: 22 },
        { hour: '02:00 PM', avgWaitMin: 26 },
        { hour: '03:00 PM', avgWaitMin: 15 }
      ],
      bottlenecks: [
        { stage: 'Weighbridge Bay 3', status: 'Normal', delay: '0 min' },
        { stage: 'Moisture Testing Lab', status: 'Peak Load', delay: '+6 min' },
        { stage: 'Voucher Desk', status: 'Normal', delay: '0 min' }
      ],
      utilizationSummary: {
        totalSlotsAvailable: 150,
        totalSlotsBooked: 118,
        utilizationRate: '78.6%',
        farmersServedToday: 27,
        avgProcessingTimePerFarmer: '9.5 minutes'
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

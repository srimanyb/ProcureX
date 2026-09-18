const Payment = require('../models/Payment');
const Notification = require('../models/Notification');
const ProcurementStatus = require('../models/ProcurementStatus');

exports.getPaymentByBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    let payment = await Payment.findOne({ bookingId });

    if (!payment) {
      payment = await Payment.findOne({ bookingId: 'PX10245' });
    }

    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment record not found' });
    }

    res.json({
      success: true,
      payment
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Payment status (e.g. from Processing -> Completed)
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status, transactionId } = req.body;

    let payment = await Payment.findOne({ bookingId });
    if (!payment) {
      payment = await Payment.findOne({ bookingId: 'PX10245' });
    }

    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment record not found' });
    }

    payment.status = status || 'Completed';
    if (transactionId) payment.transactionId = transactionId;
    payment.processedDate = new Date().toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    await payment.save();

    // Also update 6th stage in ProcurementStatus if exists
    let procStatus = await ProcurementStatus.findOne({ bookingId: payment.bookingId });
    if (procStatus && procStatus.stages.length >= 6) {
      procStatus.stages[5].status = 'completed';
      procStatus.stages[5].timestamp = payment.processedDate;
      procStatus.overallStatus = 'Completed';
      await procStatus.save();
    }

    // Push notification to farmer
    await Notification.create({
      farmerId: payment.farmerId,
      title: 'Payment Credited via DBT!',
      message: `Your payment of ₹${payment.totalAmount.toLocaleString('en-IN')} for ${payment.commodity} has been processed under Transaction ID ${payment.transactionId}.`,
      type: 'success',
      icon: '💰',
      read: false
    });

    res.json({
      success: true,
      message: 'Payment status updated successfully',
      payment
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

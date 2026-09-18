const ProcurementStatus = require('../models/ProcurementStatus');
const Notification = require('../models/Notification');
const Booking = require('../models/Booking');

exports.getProcurementStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    let status = await ProcurementStatus.findOne({ bookingId });

    if (!status) {
      status = await ProcurementStatus.findOne({ bookingId: 'PX10245' });
    }

    if (!status) {
      return res.status(404).json({ success: false, message: 'Procurement status not found' });
    }

    res.json({
      success: true,
      procurement: status
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Advance or update procurement status
exports.updateProcurementStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { stageIndex, statusTitle, statusType, notes, weightQuintals, qualityGrade } = req.body;

    let status = await ProcurementStatus.findOne({ bookingId });
    if (!status) {
      status = await ProcurementStatus.findOne({ bookingId: 'PX10245' });
    }

    if (!status) {
      return res.status(404).json({ success: false, message: 'Status record not found' });
    }

    if (weightQuintals) status.weightQuintals = weightQuintals;
    if (qualityGrade) status.qualityGrade = qualityGrade;

    if (typeof stageIndex === 'number' && status.stages[stageIndex]) {
      status.stages[stageIndex].status = statusType || 'completed';
      status.stages[stageIndex].timestamp = new Date().toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
      });
      if (notes) status.stages[stageIndex].description = notes;
    }

    await status.save();

    res.json({
      success: true,
      message: 'Procurement status updated successfully',
      procurement: status
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

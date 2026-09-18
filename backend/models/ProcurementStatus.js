const mongoose = require('mongoose');

const StageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ['completed', 'in-progress', 'pending'],
    default: 'pending'
  },
  timestamp: { type: String, default: '--' },
  officer: { type: String, default: '' }
}, { _id: false });

const ProcurementStatusSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true,
    unique: true
  },
  farmerId: {
    type: String,
    required: true
  },
  commodity: {
    type: String,
    required: true
  },
  centre: {
    type: String,
    required: true
  },
  weightQuintals: {
    type: Number,
    default: 42.5
  },
  qualityGrade: {
    type: String,
    default: 'FAQ Grade-A'
  },
  moistureContent: {
    type: String,
    default: '13.2%'
  },
  stages: [StageSchema],
  overallStatus: {
    type: String,
    default: 'In Progress'
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ProcurementStatus', ProcurementStatusSchema);

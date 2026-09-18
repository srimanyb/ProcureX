const mongoose = require('mongoose');

const ProcurementCentreSchema = new mongoose.Schema({
  centreId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  state: {
    type: String,
    default: 'Maharashtra'
  },
  capacityPerDay: {
    type: Number,
    default: 100
  },
  operatingHours: {
    type: String,
    default: '08:30 AM - 05:30 PM'
  },
  status: {
    type: String,
    enum: ['Operational', 'High Load', 'Closed'],
    default: 'Operational'
  },
  commoditiesSupported: [{
    type: String
  }],
  contactPhone: {
    type: String,
    default: '+91 721-2550192'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ProcurementCentre', ProcurementCentreSchema);

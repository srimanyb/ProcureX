const mongoose = require('mongoose');

const FarmerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Farmer name is required'],
    trim: true
  },
  mobile: {
    type: String,
    required: [true, 'Mobile number is required'],
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number']
  },
  farmerId: {
    type: String,
    required: [true, 'Farmer ID is required'],
    unique: true,
    trim: true,
    uppercase: true
  },
  village: {
    type: String,
    required: [true, 'Village name is required'],
    trim: true
  },
  district: {
    type: String,
    required: [true, 'District is required'],
    trim: true
  },
  preferredCentre: {
    type: String,
    default: 'Central Procurement Centre'
  },
  commodity: {
    type: String,
    required: [true, 'Commodity is required'],
    enum: ['Rice', 'Wheat', 'Maize', 'Cotton', 'Soybean', 'Pulses']
  },
  language: {
    type: String,
    enum: ['en', 'hi', 'te', 'mr'],
    default: 'en'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Farmer', FarmerSchema);

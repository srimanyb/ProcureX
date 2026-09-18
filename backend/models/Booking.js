const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true,
    unique: true
  },
  farmerId: {
    type: String,
    required: true,
    ref: 'Farmer'
  },
  farmerName: {
    type: String,
    required: true
  },
  farmerMobile: {
    type: String
  },
  commodity: {
    type: String,
    required: true
  },
  centre: {
    type: String,
    required: true
  },
  centreId: {
    type: String,
    default: 'CPC-01'
  },
  date: {
    type: String,
    required: true
  },
  slot: {
    type: String,
    required: true
  },
  queueNumber: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Confirmed', 'Arrived', 'In Progress', 'Completed', 'Cancelled'],
    default: 'Confirmed'
  },
  estimatedQuantity: {
    type: Number,
    default: 40
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', BookingSchema);

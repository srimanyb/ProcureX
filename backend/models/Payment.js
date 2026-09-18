const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true
  },
  bookingId: {
    type: String,
    required: true
  },
  farmerId: {
    type: String,
    required: true
  },
  farmerName: {
    type: String,
    required: true
  },
  commodity: {
    type: String,
    required: true
  },
  quantityQuintals: {
    type: Number,
    default: 42.5
  },
  mspRatePerQuintal: {
    type: Number,
    default: 2320 // e.g. Govt MSP for Paddy/Rice common
  },
  totalAmount: {
    type: Number,
    default: 98600
  },
  status: {
    type: String,
    enum: ['Initiated', 'Processing', 'Completed', 'Failed'],
    default: 'Processing'
  },
  paymentMode: {
    type: String,
    default: 'Aadhaar-Linked DBT (PFMS)'
  },
  bankAccountMasked: {
    type: String,
    default: 'State Bank of India •••• 4921'
  },
  processedDate: {
    type: String,
    default: 'Pending Settlement'
  },
  history: [{
    date: String,
    bookingId: String,
    commodity: String,
    quantity: Number,
    amount: Number,
    status: String,
    reference: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Payment', PaymentSchema);

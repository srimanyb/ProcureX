const mongoose = require('mongoose');

const QueueItemSchema = new mongoose.Schema({
  queueNumber: { type: Number, required: true },
  farmerName: { type: String, required: true },
  farmerId: { type: String, required: true },
  bookingId: { type: String, required: true },
  commodity: { type: String, required: true },
  slot: { type: String, required: true },
  status: {
    type: String,
    enum: ['Waiting', 'Called', 'Processing', 'Completed'],
    default: 'Waiting'
  },
  calledAt: { type: Date }
}, { _id: false });

const QueueSchema = new mongoose.Schema({
  centreId: {
    type: String,
    required: true,
    unique: true
  },
  centreName: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  currentlyServing: {
    type: Number,
    default: 11
  },
  centreStatus: {
    type: String,
    enum: ['Operational', 'High Load', 'Paused'],
    default: 'Operational'
  },
  averageWaitMinutes: {
    type: Number,
    default: 28
  },
  queueList: [QueueItemSchema],
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Queue', QueueSchema);

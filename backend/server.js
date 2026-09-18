const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/db');
const seedData = require('./seed/seedData');
const Farmer = require('./models/Farmer');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB & ensure seed data is present
connectDB().then(async () => {
  try {
    const farmerCount = await Farmer.countDocuments();
    if (farmerCount === 0) {
      console.log('[Server] Database is empty, seeding demo data automatically...');
      await seedData();
    }
  } catch (err) {
    console.warn('[Server] Auto-seed check notice:', err.message);
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// API Routes
app.use('/api/farmers', require('./routes/farmerRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/queue', require('./routes/queueRoutes'));
app.use('/api/procurement', require('./routes/procurementRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/centre', require('./routes/centreRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/demo', require('./routes/demoRoutes'));

// Fallback for HTML page routes
app.get('*', (req, res, next) => {
  if (req.url.startsWith('/api')) return next();
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[Unhandled Error]', err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🌾 ProcureX - Smart Agricultural Procurement Platform`);
  console.log(`🚀 Server running at: http://localhost:${PORT}`);
  console.log(`📱 Frontend available at: http://localhost:${PORT}`);
  console.log(`=======================================================`);
});

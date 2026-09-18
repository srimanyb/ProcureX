const mongoose = require('mongoose');
const Farmer = require('../models/Farmer');
const ProcurementCentre = require('../models/ProcurementCentre');
const Booking = require('../models/Booking');
const Queue = require('../models/Queue');
const ProcurementStatus = require('../models/ProcurementStatus');
const Payment = require('../models/Payment');
const Notification = require('../models/Notification');

const seedData = async () => {
  try {
    console.log('[Seed] Resetting and populating demo data...');

    // Clear existing
    await Farmer.deleteMany({});
    await ProcurementCentre.deleteMany({});
    await Booking.deleteMany({});
    await Queue.deleteMany({});
    await ProcurementStatus.deleteMany({});
    await Payment.deleteMany({});
    await Notification.deleteMany({});

    // 1. Procurement Centre
    const centre = await ProcurementCentre.create({
      centreId: 'CPC-01',
      name: 'Central Procurement Centre (APMC Yard)',
      location: 'Badnera Road, Grain Market Complex',
      district: 'Amravati',
      state: 'Maharashtra',
      capacityPerDay: 100,
      operatingHours: '08:30 AM - 05:30 PM',
      status: 'Operational',
      commoditiesSupported: ['Rice', 'Wheat', 'Maize', 'Cotton', 'Soybean', 'Pulses'],
      contactPhone: '+91 721-2550192'
    });

    // 2. Demo Farmer: Ramesh Kumar
    const farmer = await Farmer.create({
      name: 'Ramesh Kumar',
      mobile: '9876543210',
      farmerId: 'FARM1024',
      village: 'Chandur Railway',
      district: 'Amravati',
      preferredCentre: 'Central Procurement Centre (APMC Yard)',
      commodity: 'Rice'
    });

    // 3. Demo Booking: PX10245
    const booking = await Booking.create({
      bookingId: 'PX10245',
      farmerId: 'FARM1024',
      farmerName: 'Ramesh Kumar',
      farmerMobile: '9876543210',
      commodity: 'Rice',
      centre: 'Central Procurement Centre (APMC Yard)',
      centreId: 'CPC-01',
      date: '19 September 2026',
      slot: '10:00 AM',
      queueNumber: 18,
      status: 'Confirmed',
      estimatedQuantity: 42.5
    });

    // Additional upcoming booking for variety
    await Booking.create({
      bookingId: 'PX10299',
      farmerId: 'FARM2055',
      farmerName: 'Suresh Patil',
      farmerMobile: '9823411223',
      commodity: 'Wheat',
      centre: 'Central Procurement Centre (APMC Yard)',
      centreId: 'CPC-01',
      date: '19 September 2026',
      slot: '09:00 AM',
      queueNumber: 11,
      status: 'In Progress',
      estimatedQuantity: 35.0
    });

    // 4. Live Queue for CPC-01
    await Queue.create({
      centreId: 'CPC-01',
      centreName: 'Central Procurement Centre (APMC Yard)',
      date: '19 September 2026',
      currentlyServing: 11,
      centreStatus: 'Operational',
      averageWaitMinutes: 28,
      queueList: [
        { queueNumber: 11, farmerName: 'Suresh Patil', farmerId: 'FARM2055', bookingId: 'PX10299', commodity: 'Wheat', slot: '09:00 AM', status: 'Processing' },
        { queueNumber: 12, farmerName: 'Anand Rao', farmerId: 'FARM1102', bookingId: 'PX10301', commodity: 'Rice', slot: '09:15 AM', status: 'Waiting' },
        { queueNumber: 13, farmerName: 'Prakash Deshmukh', farmerId: 'FARM1108', bookingId: 'PX10302', commodity: 'Rice', slot: '09:30 AM', status: 'Waiting' },
        { queueNumber: 14, farmerName: 'Vikas Shinde', farmerId: 'FARM1145', bookingId: 'PX10304', commodity: 'Soybean', slot: '09:45 AM', status: 'Waiting' },
        { queueNumber: 15, farmerName: 'Santosh Kale', farmerId: 'FARM1180', bookingId: 'PX10306', commodity: 'Wheat', slot: '10:00 AM', status: 'Waiting' },
        { queueNumber: 16, farmerName: 'Jagdish Sharma', farmerId: 'FARM1204', bookingId: 'PX10310', commodity: 'Cotton', slot: '10:00 AM', status: 'Waiting' },
        { queueNumber: 17, farmerName: 'Mohan Lal', farmerId: 'FARM1222', bookingId: 'PX10315', commodity: 'Rice', slot: '10:00 AM', status: 'Waiting' },
        { queueNumber: 18, farmerName: 'Ramesh Kumar', farmerId: 'FARM1024', bookingId: 'PX10245', commodity: 'Rice', slot: '10:00 AM', status: 'Waiting' },
        { queueNumber: 19, farmerName: 'Dilip Wankhede', farmerId: 'FARM1250', bookingId: 'PX10320', commodity: 'Rice', slot: '10:30 AM', status: 'Waiting' },
        { queueNumber: 20, farmerName: 'Ganesh Jadhav', farmerId: 'FARM1265', bookingId: 'PX10325', commodity: 'Wheat', slot: '10:30 AM', status: 'Waiting' },
        { queueNumber: 21, farmerName: 'Sunil Chavhan', farmerId: 'FARM1290', bookingId: 'PX10330', commodity: 'Maize', slot: '11:00 AM', status: 'Waiting' },
        { queueNumber: 22, farmerName: 'Ashok Gaikwad', farmerId: 'FARM1302', bookingId: 'PX10335', commodity: 'Pulses', slot: '11:00 AM', status: 'Waiting' }
      ]
    });

    // 5. Procurement Status for PX10245
    await ProcurementStatus.create({
      bookingId: 'PX10245',
      farmerId: 'FARM1024',
      commodity: 'Rice',
      centre: 'Central Procurement Centre (APMC Yard)',
      weightQuintals: 42.5,
      qualityGrade: 'FAQ Grade-A Paddy',
      moistureContent: '13.2% (Within 14% Norms)',
      overallStatus: 'In Progress',
      stages: [
        {
          title: 'Slot Booked',
          description: 'Procurement slot scheduled via ProcureX platform.',
          status: 'completed',
          timestamp: '18 Sep 2026, 04:30 PM',
          officer: 'System Auto'
        },
        {
          title: 'Farmer Arrived',
          description: 'Vehicle gate entry logged at APMC Yard Gate 2.',
          status: 'completed',
          timestamp: '19 Sep 2026, 09:45 AM',
          officer: 'Security Desk (K. More)'
        },
        {
          title: 'Verification Completed',
          description: 'Land record 7/12 verified and initial moisture test (13.2%) approved.',
          status: 'completed',
          timestamp: '19 Sep 2026, 10:15 AM',
          officer: 'Quality Inspector (A. Vernekar)'
        },
        {
          title: 'Procurement In Progress',
          description: 'Your produce is currently being weighed at weighbridge Bay #3.',
          status: 'in-progress',
          timestamp: '19 Sep 2026, 10:40 AM',
          officer: 'Weighbridge In-charge (M. Sonawane)'
        },
        {
          title: 'Procurement Completed',
          description: 'Electronic weighment slip generated and final acceptance signed.',
          status: 'pending',
          timestamp: 'Estimated 11:15 AM',
          officer: 'Pending'
        },
        {
          title: 'Payment Processed',
          description: 'Direct Benefit Transfer (DBT) credit into registered bank account.',
          status: 'pending',
          timestamp: 'Estimated Within 24-48 hrs',
          officer: 'PFMS Nodal Officer'
        }
      ]
    });

    // 6. Payment Record
    await Payment.create({
      transactionId: 'PX-PAY-10245',
      bookingId: 'PX10245',
      farmerId: 'FARM1024',
      farmerName: 'Ramesh Kumar',
      commodity: 'Rice (Common Grade)',
      quantityQuintals: 42.5,
      mspRatePerQuintal: 2320,
      totalAmount: 98600,
      status: 'Processing',
      paymentMode: 'Aadhaar-Linked DBT (PFMS)',
      bankAccountMasked: 'State Bank of India •••• 4921',
      processedDate: 'Processing (Expected within 24h)',
      history: [
        {
          date: '12 March 2026',
          bookingId: 'PX08412',
          commodity: 'Wheat',
          quantity: 38.0,
          amount: 86450,
          status: 'Completed',
          reference: 'UTR-PFMS-982147382'
        },
        {
          date: '18 November 2025',
          bookingId: 'PX04291',
          commodity: 'Soybean',
          quantity: 25.5,
          amount: 124950,
          status: 'Completed',
          reference: 'UTR-PFMS-610283944'
        },
        {
          date: '24 April 2025',
          bookingId: 'PX02190',
          commodity: 'Wheat',
          quantity: 40.0,
          amount: 91000,
          status: 'Completed',
          reference: 'UTR-PFMS-441920831'
        }
      ]
    });

    // 7. Notifications for Ramesh Kumar
    await Notification.create([
      {
        farmerId: 'FARM1024',
        title: 'Slot Confirmed',
        message: 'Your slot has been confirmed for 19 Sep 2026 at 10:00 AM at Central Procurement Centre.',
        type: 'success',
        icon: '✅',
        read: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18)
      },
      {
        farmerId: 'FARM1024',
        title: 'Gate Entry Recorded',
        message: 'You have arrived at APMC Yard. Your vehicle entry token has been matched with PX10245.',
        type: 'info',
        icon: '📍',
        read: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 55)
      },
      {
        farmerId: 'FARM1024',
        title: 'Live Queue Position',
        message: 'Your queue position is now #08. Centre is currently serving #11.',
        type: 'info',
        icon: '🔢',
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 20)
      },
      {
        farmerId: 'FARM1024',
        title: 'Stage: Produce Weighing',
        message: 'Please move your tractor towards Weighbridge Bay #3 for gross weight measurement.',
        type: 'urgent',
        icon: '⚖️',
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 5)
      }
    ]);

    console.log('[Seed] Database seeded successfully with SIH 2026 demo records!');
    return true;
  } catch (error) {
    console.error('[Seed Error]', error);
    throw error;
  }
};

// If run directly via `node backend/seed/seedData.js`
if (require.main === module) {
  const connectDB = require('../config/db');
  connectDB().then(async () => {
    await seedData();
    mongoose.connection.close();
    process.exit(0);
  }).catch(err => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = seedData;

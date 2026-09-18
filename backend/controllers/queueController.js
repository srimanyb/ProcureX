const Queue = require('../models/Queue');
const Booking = require('../models/Booking');
const Notification = require('../models/Notification');

// In-memory simulation progression state for active sessions
const simulationSessions = {};

exports.getQueueStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    let booking = await Booking.findOne({ bookingId });
    if (!booking) {
      booking = await Booking.findOne({ bookingId: 'PX10245' });
    }

    const centreQueue = await Queue.findOne({ centreId: 'CPC-01' });
    const yourQueueNumber = booking ? booking.queueNumber : 18;

    // Check if there is an active simulation override for this booking
    const sim = simulationSessions[bookingId || 'PX10245'];
    let currentlyServing = centreQueue ? centreQueue.currentlyServing : 11;
    let effectiveQueueNumber = yourQueueNumber;
    let customStatus = null;

    if (sim) {
      currentlyServing = sim.currentlyServing;
      effectiveQueueNumber = sim.effectiveQueueNumber;
      customStatus = sim.customStatus;
    }

    const farmersAhead = Math.max(0, effectiveQueueNumber - currentlyServing);
    const currentPosition = farmersAhead + 1;
    const estimatedMinutes = Math.max(5, farmersAhead * 5);

    const now = new Date();
    const lastUpdated = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

    // Prepare list of queue items
    let queueList = centreQueue ? centreQueue.queueList : [];

    // Map list with active statuses
    const formattedList = queueList.map(item => {
      const isYou = item.bookingId === (booking ? booking.bookingId : 'PX10245') || item.queueNumber === yourQueueNumber;
      let displayStatus = item.status;

      if (item.queueNumber < currentlyServing) {
        displayStatus = 'Completed';
      } else if (item.queueNumber === currentlyServing) {
        displayStatus = 'Processing';
      } else {
        displayStatus = 'Waiting';
      }

      return {
        queueNumber: item.queueNumber,
        farmerName: item.farmerName,
        commodity: item.commodity,
        slot: item.slot,
        status: displayStatus,
        isCurrentUser: isYou
      };
    });

    res.json({
      success: true,
      centreName: centreQueue ? centreQueue.centreName : 'Central Procurement Centre (APMC Yard)',
      yourQueueNumber,
      currentlyServing,
      currentPosition: currentPosition === 1 ? 'YOUR TURN' : `#${String(currentPosition).padStart(2, '0')}`,
      farmersAhead,
      centreStatus: 'Operational',
      estimatedWaiting: `~${estimatedMinutes} minutes`,
      lastUpdated,
      simulationState: sim ? sim.stepIndex : 0,
      customStatus,
      queueList: formattedList
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Simulate Queue Movement: 18 -> 15 -> 12 -> 8 -> 5 -> 2 -> YOUR TURN
exports.simulateQueueStep = async (req, res) => {
  try {
    const bookingId = req.params.bookingId || 'PX10245';
    const targetBooking = await Booking.findOne({ bookingId }) || { queueNumber: 18, farmerId: 'FARM1024' };

    // Steps progression sequence: [farmersAhead values]
    // Sequence: 7 ahead (pos 8) -> 5 ahead -> 3 ahead -> 1 ahead -> 0 ahead (YOUR TURN)
    // Or serving advances: 11 -> 13 -> 15 -> 17 -> 18
    const steps = [
      { serving: 11, label: 'Position #08 (7 ahead)', ahead: 7, note: 'Normal queue progression.' },
      { serving: 13, label: 'Position #05 (5 ahead)', ahead: 5, note: 'Procurement bays 1 & 2 completed batches.' },
      { serving: 15, label: 'Position #03 (3 ahead)', ahead: 3, note: 'Only 3 farmers ahead! Please keep tractor in staging lane.' },
      { serving: 17, label: 'Position #01 (Next in line)', ahead: 1, note: 'You are next! Please proceed towards Weighbridge Bay #3.' },
      { serving: 18, label: 'YOUR TURN', ahead: 0, note: 'Tractor called to Bay #3! Procurement in progress.' }
    ];

    if (!simulationSessions[bookingId]) {
      simulationSessions[bookingId] = { stepIndex: 0 };
    }

    let currentStep = simulationSessions[bookingId].stepIndex;
    let nextStep = (currentStep + 1) % steps.length;
    simulationSessions[bookingId].stepIndex = nextStep;

    const stepInfo = steps[nextStep];
    simulationSessions[bookingId].currentlyServing = stepInfo.serving;
    simulationSessions[bookingId].effectiveQueueNumber = targetBooking.queueNumber;
    simulationSessions[bookingId].customStatus = stepInfo.label;

    // Create real-time in-app notification for the farmer
    let notifTitle = `Live Queue Update: Serving #${stepInfo.serving}`;
    let notifType = 'info';
    let notifIcon = '🔔';

    if (stepInfo.ahead === 0) {
      notifTitle = '🚨 IT IS YOUR TURN!';
      notifType = 'urgent';
      notifIcon = '🚜';
    } else if (stepInfo.ahead <= 3) {
      notifTitle = `⚡ Approaching Bay: Only ${stepInfo.ahead} ahead`;
      notifType = 'warning';
      notifIcon = '⚠️';
    }

    await Notification.create({
      farmerId: targetBooking.farmerId,
      title: notifTitle,
      message: stepInfo.note,
      type: notifType,
      icon: notifIcon,
      read: false
    });

    res.json({
      success: true,
      message: 'Queue simulation step applied',
      stepIndex: nextStep,
      totalSteps: steps.length,
      currentlyServing: stepInfo.serving,
      currentPosition: stepInfo.ahead === 0 ? 'YOUR TURN' : `#${String(stepInfo.ahead + 1).padStart(2, '0')}`,
      farmersAhead: stepInfo.ahead,
      estimatedWaiting: stepInfo.ahead === 0 ? 'Immediate' : `~${stepInfo.ahead * 5} minutes`,
      note: stepInfo.note
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Reset queue simulation
exports.resetQueueSimulation = async (req, res) => {
  const bookingId = req.params.bookingId || 'PX10245';
  delete simulationSessions[bookingId];
  res.json({ success: true, message: 'Simulation state reset to default' });
};

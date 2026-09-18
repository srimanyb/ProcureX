const Notification = require('../models/Notification');

exports.getNotifications = async (req, res) => {
  try {
    const farmerId = (req.params.farmerId || 'FARM1024').toUpperCase();
    const notifications = await Notification.find({ farmerId }).sort({ createdAt: -1 }).limit(20);
    const unreadCount = await Notification.countDocuments({ farmerId, read: false });

    res.json({
      success: true,
      unreadCount,
      notifications
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    await Notification.findByIdAndUpdate(id, { read: true });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.markAllRead = async (req, res) => {
  try {
    const farmerId = (req.params.farmerId || 'FARM1024').toUpperCase();
    await Notification.updateMany({ farmerId, read: false }, { read: true });
    res.json({ success: true, message: 'All notifications marked as read' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const Notification = require('../models/Notification');
const asyncHandler = require('express-async-handler');

// @desc    Get all notifications
// @route   GET /api/notifications
// @access  Private/Admin
exports.getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find()
    .sort({ createdAt: -1 })
    .limit(20);
  
  const unreadCount = await Notification.countDocuments({ read: false });
  
  res.status(200).json({
    success: true,
    count: notifications.length,
    unreadCount,
    data: notifications
  });
});

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private/Admin
exports.markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findByIdAndUpdate(
    req.params.id,
    { read: true },
    { new: true }
  );
  
  if (!notification) {
    return res.status(404).json({
      success: false,
      message: 'Notification not found'
    });
  }
  
  // Emit socket event for real-time update
  const io = req.app.get('io');
  if (io) {
    io.to('admin-room').emit('notification-updated', notification);
  }
  
  res.status(200).json({
    success: true,
    data: notification
  });
});

// @desc    Mark all notifications as read
// @route   PUT /api/notifications/read-all
// @access  Private/Admin
exports.markAllAsRead = asyncHandler(async (req, res) => {
  await Notification.updateMany(
    { read: false },
    { read: true }
  );
  
  // Emit socket event for real-time update
  const io = req.app.get('io');
  if (io) {
    io.to('admin-room').emit('all-notifications-read');
  }
  
  res.status(200).json({
    success: true,
    message: 'All notifications marked as read'
  });
});

// @desc    Delete notification
// @route   DELETE /api/notifications/:id
// @access  Private/Admin
exports.deleteNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.findByIdAndDelete(req.params.id);
  
  if (!notification) {
    return res.status(404).json({
      success: false,
      message: 'Notification not found'
    });
  }
  
  // Emit socket event for real-time update
  const io = req.app.get('io');
  if (io) {
    io.to('admin-room').emit('notification-deleted', notification._id);
  }
  
  res.status(200).json({
    success: true,
    message: 'Notification deleted'
  });
}); 
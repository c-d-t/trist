const mongoose = require('../../../../data');

const NotificationSchema = mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, rel: 'Account' },
  receiverId: { type: mongoose.Schema.Types.ObjectId, rel: 'Account' },
  type: Number, // 0=Message 1=FriendRequest
  message: 1,
  timeCreated: Date,
});

module.exports = mongoose.model('Notification', NotificationSchema);

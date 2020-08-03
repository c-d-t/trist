const notificationMap = require('./notificationMap');
const notificationModel = require('./models/Notification');
const NotificationRepo = require('./notificationRepo');

const notificationRepo = new NotificationRepo(notificationMap, notificationModel);

module.exports = {
  notificationRepo,
};

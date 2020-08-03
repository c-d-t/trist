const MakeNotificationApplication = require('./application');
const { notificationRepo } = require('../../repo');

const makeNotification = new MakeNotificationApplication(notificationRepo);

module.exports = makeNotification;

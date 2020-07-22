const CronJobs = require('./cronJobs');

const clearPrivateChannels = require('../../app/messaging/events/clearPrivateChannels');

module.exports = new CronJobs(clearPrivateChannels);
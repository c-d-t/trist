const EventEmitter = require('./events');
const { messagingView } = require('../../app/messaging/repo');

const eventEmitter = new EventEmitter(messagingView);

module.exports = eventEmitter;

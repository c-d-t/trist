const EventEmitter = require('./events');
const { messagingView } = require('../../app/messaging/repo');
const { accountView } = require('../../app/account/repo');

const eventEmitter = new EventEmitter(messagingView, accountView);

module.exports = eventEmitter;

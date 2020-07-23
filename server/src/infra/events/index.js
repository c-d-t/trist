const EventEmitter = require('./events');
const { messagingView } = require('../../app/messaging/repo');

const eventEmitter = new EventEmitter(messagingView);

// pulling my hair out with circular dependencies.
// TODO: get this outa global.
global._eventEmitter = eventEmitter;

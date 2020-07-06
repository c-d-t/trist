const OnAccountCreation = require('./onAccountCreation');
const makeMessagingUser = require('../../../messaging/events/makeUser');

const onAccountCreation = new OnAccountCreation(makeMessagingUser);

module.exports = onAccountCreation;

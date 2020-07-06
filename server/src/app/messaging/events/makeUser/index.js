const MakeUser = require('./makeUser');
const { userRepo } = require('../../repo');

const makeMessagingUser = new MakeUser(userRepo);

module.exports = makeMessagingUser;

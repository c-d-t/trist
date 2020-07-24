const SendFriendRequestApplication = require('./application');
const SendFriendRequestController = require('./controller');
const { relationshipRepo } = require('../../repo');
const { accountRepo } = require('../../../account/repo');

const sendFriendRequest = new SendFriendRequestApplication(relationshipRepo, accountRepo);
const sendFriendRequestPost = new SendFriendRequestController(sendFriendRequest);

module.exports = sendFriendRequestPost;

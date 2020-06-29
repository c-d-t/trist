const AcceptFriendRequestApplication = require('./application');
const AcceptFriendRequestController = require('./controller');
const relationshipRepo = require('../../repo');

const acceptFriendRequest = new AcceptFriendRequestApplication(relationshipRepo);
const acceptFriendRequestPost = new AcceptFriendRequestController(acceptFriendRequest);

module.exports = acceptFriendRequestPost;

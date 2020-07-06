const FriendshipService = require('./relationshipService');
const { relationshipRepo } = require('../../../relations/repo');

const friendshipService = new FriendshipService(relationshipRepo);

module.exports = friendshipService;

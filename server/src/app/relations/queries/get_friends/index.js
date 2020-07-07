const GetFriendsApplication = require('./application');
const GetFriendsController = require('./controller');
const Relationship = require('../../repo/models/Relationship');

const getFriends = new GetFriendsApplication(Relationship);
const getFriendsGet = new GetFriendsController(getFriends);

module.exports = getFriendsGet;

const sendFriendRequest = require('./send_friend_request');
const acceptFriendRequest = require('./accept_friend_request');

const getFriends = require('../queries/get_friends');
const getRequests = require('../queries/get_requests');

module.exports = {
  sendFriendRequest,
  acceptFriendRequest,
  getFriends,
  getRequests,
};

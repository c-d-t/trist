const mongoose = require('../mongoose');

const RelationshipSchema = mongoose.Schema({
  thisAccountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
  otherAccountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
  type: Number, // -1=blocked 0=noRelationship 1=sentFriendRequest 2=receivedFriendRequest 3=friends
});

module.exports = mongoose.model('Relationship', RelationshipSchema);

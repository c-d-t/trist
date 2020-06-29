const mongoose = require('../../../../data/mongoose');

const RelationshipSchema = mongoose.Schema({
  thisAccountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
  otherAccountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
  status: Number, // -1=blocked 0=sentFriendRequest 1=receivedFriendRequest 2=friends
  note: String,
});

module.exports = mongoose.model('Relationship', RelationshipSchema);

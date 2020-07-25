const mongoose = require('../../../../data');

const ChannelSchema = mongoose.Schema({
  type: Number,
  title: String,
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
  participantIds: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account'}],
    default: undefined,
  },
  lastActivity: Date,
});

module.exports = mongoose.model('Channel', ChannelSchema);

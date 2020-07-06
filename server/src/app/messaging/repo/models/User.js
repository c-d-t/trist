const mongoose = require('../../../../data');

const UserSchema = mongoose.Schema({
  dmIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Channel'}],
  openDms: Boolean,
});

module.exports = mongoose.model('MessagingUser', UserSchema);

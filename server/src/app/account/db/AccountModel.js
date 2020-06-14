const mongoose = require('../../../../db');

const AccountSchema = mongoose.Schema({
  username: String,
  password: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Account', AccountSchema);

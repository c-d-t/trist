const mongoose = require('../mongoose');

const AccountSchema = mongoose.Schema({
  email: String,
  password: String,
  dateRegistered: Date,
  isVerified: Boolean,
});

module.exports = mongoose.model('Account', AccountSchema);

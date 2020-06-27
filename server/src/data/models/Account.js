const mongoose = require('../mongoose');

const AccountSchema = mongoose.Schema({
  displayName: String,
  username: String,
  password: String,
  email: String,
  isEmailVerified: Boolean,
  dateCreated: Date,
});

module.exports = mongoose.model('Account', AccountSchema);

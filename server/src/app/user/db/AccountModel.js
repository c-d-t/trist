const mongoose = require('../../../../db');

const AccountSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  password: String,
});

module.exports = mongoose.model('Account', AccountSchema);

const mongoose = require('../mongoose');

const EmailTokenSchema = mongoose.Schema({
  token: String,
  expiry: Date,
});

module.exports = mongoose.model("Email_Token", EmailTokenSchema);

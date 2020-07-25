require('dotenv').config();

const config = {
  PORT: process.env.PORT,
  JWT_KEY: process.env.JWT_KEY,
  GMAIL: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD,
  },
};

module.exports = config;

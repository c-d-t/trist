require('dotenv').config();

const config = {
  PORT: process.env.PORT,
  JWT_KEY: process.env.JWT_KEY,
  JWT_KEY_EMAIL: process.env.JWT_KEY_EMAIL,
  GMAIL: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD,
  },
  SEND_IN_BLUE: {
    apiKey: process.env.SEND_IN_BLUE_API_KEY,
  },
};

module.exports = config;

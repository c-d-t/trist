require('dotenv').config();

const config = {
  PORT: process.env.PORT,
  JWT_KEY: process.env.JWT_KEY,
};

module.exports = config;

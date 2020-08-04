require('dotenv').config();

const config = {
  PORT: process.env.PORT,
  JWT_KEY: process.env.JWT_KEY,
  JWT_KEY_EMAIL: process.env.JWT_KEY_EMAIL,
  GMAIL: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD,
  },
  CLOUDINARY: {
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
  },
  DB_URL: process.env.DB_URL,
};

module.exports = config;

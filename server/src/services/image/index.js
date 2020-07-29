const ImageService = require('./imageService');
const cloudinary = require('cloudinary');

const imageService = new ImageService(cloudinary);

module.exports = imageService;

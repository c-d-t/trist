const fs = require('fs');
const path = require('path');
const config = require('../../config');
const sharp = require('sharp');

class ImageService
{
  constructor(cloudinary)
  {
    this._uploader = cloudinary.uploader;
    this._config = cloudinary.config(config.CLOUDINARY);
  }

  async upload(file)
  {
    if (!file)
    {
      return;
    }
    try {
      await sharp(file.path)
        .resize(256, 256)
        .jpeg({ quality: 50 })
        .toFile(path.resolve(file.destination, 'resized', file.filename));
      const result = await this._uploader.upload(path.resolve(file.destination, 'resized', file.filename));
      fs.unlinkSync(path.resolve(file.destination, 'resized', file.filename));
      fs.unlinkSync(path.resolve(file.destination, file.filename));
      return {
        url: result.secure_url,
        publicId: result.public_id,
      };
    }
    catch (e)
    {
      fs.unlinkSync(path.resolve(file.destination, 'resized', file.filename));
      fs.unlinkSync(path.resolve(file.destination, file.filename));
      throw new Error('uh oh');
    }
  }

  async delete(publicKey)
  {
    await this._uploader.destroy(publicKey);
  }
}

module.exports = ImageService;

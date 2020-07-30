const multer = require('multer');
const mkdirp = require('mkdirp');
mkdirp.sync('./uploads/resized');

const storage = multer.diskStorage({
  destination: (_req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
const filter = (_req, file, cb) => {
  if (file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
    return cb(new Error('Incorrect format!'), false);
  }

  return cb(null, true);
};
const multerUploads = multer({ storage, filter }).single('image');

module.exports = multerUploads;

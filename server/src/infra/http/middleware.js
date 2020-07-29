const jwt = require('../../app/account/services/jwt');
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

function authenticated()
{
  return async function auth(req, res, next)
  {
    const data = jwt.decode(req.cookies.jwt);
    if (!data || data.id === null || data.id === undefined)
    {
      return res.status(403).end();
    }
  
    req.thisAccount = data;
    next();
  }
}



module.exports = {
  authenticated,
  multerUploads,
};


const jwt = require('../../app/account/services/jwt');


function authenticated()
{
  return async function auth(req, res, next)
  {
    const data = jwt.decode(req.cookies.jwt);
    console.log(data);
    if (!data || data.id === null || data.id === undefined)
    {
      return res.status(403).end();
    }
  
    req.currentUser = data;
    next();
  }
}

module.exports = {
  authenticated,
};


const config = require('../../../../config');

class JWTService
{
  constructor(jwt)
  {
    this._jwt = jwt;
  }

  encode(data)
  {
    return this._jwt.sign(data, config.JWT_KEY);
  }

  decode(token)
  {
    if (token === undefined || token === null)
    {
      return null;
    }
    return this._jwt.verify(token, config.JWT_KEY);
  }
}

module.exports = JWTService;

const config = require('../../../../config');

class JWT
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
    return this._jwt.verify(token, config.JWT_KEY);
  }
}

module.exports = JWT;

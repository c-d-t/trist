const config = require('../../../../config');

class JWTService
{
  constructor(jwt)
  {
    this._jwt = jwt;
  }

  encode(data)
  {
    return this._jwt.sign({ data, expiresIn: '1d'}, config.JWT_KEY);
  }

  decode(token)
  {
    if (token === undefined || token === null)
    {
      return null;
    }
    
    try
    {
      return this._jwt.verify(token, config.JWT_KEY);
    }
    catch(e)
    {
      return null;
    }
  }
}

module.exports = JWTService;

const config = require('../../../../config');

class JWTService
{
  constructor(jwt)
  {
    this._jwt = jwt;
  }

  encode(data)
  {
    return this._jwt.sign(data, config.JWT_KEY, { expiresIn: '1d' });
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

  encodeEmail(data)
  {
    return this._jwt.sign(data, config.JWT_KEY_EMAIL, { expiresIn: '1d' });
  }

  decodeEmail(token)
  {
    if (token === undefined || token === null)
    {
      return null;
    }
    
    try
    {
      return this._jwt.verify(token, config.JWT_KEY_EMAIL);
    }
    catch(e)
    {
      return null;
    }
  }
}

module.exports = JWTService;

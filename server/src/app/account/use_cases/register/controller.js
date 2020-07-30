const Controller = require('../../../../core/Controller');

class RegisterController extends Controller
{
  constructor(register)
  {
    super();
    this._register = register;
  }

  async implementation(req)
  {
    const { username, password, email } = req.body;
    
    const result = await this._register.run({ username, password, email });
    const { success, data } = result;
    if (success)
    {
      const options = {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 12,
      };

      const { token, ...rest } = data;
      this._res.cookie('jwt', token, options);
  
      return this.ok(rest);
    }

    this.handleError(data);
  }
}

module.exports = RegisterController;

const Controller = require('../../../../core/Controller');

class LoginController extends Controller {
  constructor(login)
  {
    super();
    this._login = login;
  }

  async implementation(req)
  {
    const { email, password } = req.body;
    
    const result = await this._login.run({ email, password });
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

    return this.handleError(data);
  }
}

module.exports = LoginController;

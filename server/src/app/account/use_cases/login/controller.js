const Controller = require('../../../../core/Controller');
const LoginErrors = require('./errors');

class LoginController extends Controller {
  constructor(login)
  {
    super();
    this._login = login;
  }

  async implementation(req)
  {
    const { usernameOrEmail, password } = req.body;

    const result = await this._login.run({ usernameOrEmail, password });
    const { success, data } = result;
    if (success)
    {
      const options = {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 12,
      };

      this._res.cookie('jwt', data.token, options);
  
      return this.ok({ id: data.id });
    }

    // ERROR HANDLING
    switch(data.errorType)
    {
      case LoginErrors.InvalidCredentials:
        return this.unauthorized();
      default:
        return this.failed('Could not login.');
    }
  }
}

module.exports = LoginController;

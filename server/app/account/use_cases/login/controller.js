const Controller = require('../../../../core/Controller');
const LoginErrors = require('./errors');

class LoginController extends Controller {
  constructor(login)
  {
    this._login = login;
  }

  async implementation(req)
  {
    const { username, password, email } = req;

    loginResult = this._login({ username, password, email });
    if (loginResult.failed)
    {
      switch(loginResult.error)
      {
        case LoginErrors.InvalidCredentials:
          return this.unauthorized();
        default:
          return this.failed('Could not login.');
      }
    }

    // add token via cookie

    this.ok();
  }
}

module.exports = LoginController;

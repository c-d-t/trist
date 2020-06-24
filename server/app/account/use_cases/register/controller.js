const Controller = require('../../../../core/Controller');

class RegisterController extends Controller
{
  constructor(registerUserUseCase, loginController)
  {
    this._registerUserUseCase = registerUserUseCase;
    this._loginController = loginController;
  }

  async implementation(req)
  {
    const { username, password, email } = req;
    
    const registerResult = await this.registerUserUseCase({ username, password, email });
    if (registerResult.failed)
    {
      return this.failed(registerResult.error);
    }

    // add token via cookie
    this.ok();
  }
}

module.exports = RegisterController;

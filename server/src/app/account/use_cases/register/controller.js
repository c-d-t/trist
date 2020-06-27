const Controller = require('../../../../core/Controller');
const RegisterErrors = require('./errors');

class RegisterController extends Controller
{
  constructor(registerUserUseCase)
  {
    super();
    this._registerUserUseCase = registerUserUseCase;
  }

  async implementation(req)
  {
    const { username, password, email } = req.body;
    
    const result = await this._registerUserUseCase.run({ username, password, email });
    const { success, data } = result;
    if (success)
    {
      const options = {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 12,
      };

      this._res.cookie('jwt', data, options);
      return this.ok();
    }

    // ERROR HANDLING
    switch(data.errorType)
    {
      case RegisterErrors.InvalidFields:
        return this.invalidFields(data.message);
      case RegisterErrors.UsernameAlreadyExists:
      case RegisterErrors.EmailAlreadyExists:
        return this.conflict(data.message);
      default:
        return this.failed();
    }
  }
}

module.exports = RegisterController;

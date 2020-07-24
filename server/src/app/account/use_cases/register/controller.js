const Controller = require('../../../../core/Controller');
const RegisterErrors = require('./errors');

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

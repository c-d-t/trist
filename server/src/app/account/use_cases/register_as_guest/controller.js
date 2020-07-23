const Controller = require('../../../../core/Controller');
const RegisterAsGuestErrors = require('./errors');

class RegisterAsGuestController extends Controller
{
  constructor(registerAsGuest)
  {
    super();
    this._registerAsGuest = registerAsGuest;
  }

  async implementation(req)
  {
    const { displayName } = req.body;
    
    const result = await this._registerAsGuest.run({ displayName });
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
      case RegisterAsGuestErrors.InvalidFields:
        return this.invalidFields(data.message);
      case RegisterAsGuestErrors.CouldNotMakeAccount:
        return this.failed(data.message);
      default:
        return this.failed();
    }
  }
}

module.exports = RegisterAsGuestController;

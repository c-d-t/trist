const Controller = require('../../../../core/Controller');
const UpgradeErrors = require('./errors');

class RegisterController extends Controller
{
  constructor(register)
  {
    super();
    this._register = register;
  }

  async implementation(req)
  {
    const { thisAccount } = req;
    const { username, password, email } = req.body;
    
    const result = await this._register.run({ username, password, email, thisAccountId: thisAccount.id });
    const { success, data } = result;
    if (success)
    {
      return this.ok();
    }

    // ERROR HANDLING
    switch(data.errorType)
    {
      case UpgradeErrors.InvalidFields:
        return this.invalidFields(data.message);
      case UpgradeErrors.EmailExists:
      case UpgradeErrors.UsernameExists:
        return this.conflict(data.message);
      case UpgradeErrors.AlreadyRegistered:
        return this.forbidden(data.message);
      default:
        return this.failed();
    }
  }
}

module.exports = RegisterController;

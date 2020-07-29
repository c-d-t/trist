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
    const { thisAccount } = req;
    const { username, password, email } = req.body;
    
    const result = await this._register.run({ username, password, email, thisAccountId: thisAccount.id });
    const { success, data } = result;
    if (success)
    {
      return this.ok();
    }

    return this.handleError(data);
  }
}

module.exports = RegisterController;

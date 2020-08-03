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
      return this.ok();
    }

    this.handleError(data);
  }
}

module.exports = RegisterController;

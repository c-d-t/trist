const Controller = require('../../../../core/Controller');

class RegisterAsGuestController extends Controller
{
  constructor(registerAsGuest)
  {
    super();
    this._registerAsGuest = registerAsGuest;
  }

  async implementation(req)
  {
    const { username } = req.body;
    
    const result = await this._registerAsGuest.run({ username });
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

    this.handleError(data);
  }
}

module.exports = RegisterAsGuestController;

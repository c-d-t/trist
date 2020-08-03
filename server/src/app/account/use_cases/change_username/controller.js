const Controller = require('../../../../core/Controller');

class ChangeUsernameController extends Controller
{
  constructor(changeUsername)
  {
    super();
    this._changeUsername = changeUsername;
  }

  async implementation(req)
  {
    const { thisAccount } = req;
    const { username } = req.body;
    
    const result = await this._changeUsername.run({ thisAccountId: thisAccount.id, username });
    const { success, data } = result;
    if (success)
    {
      return this.ok();
    }

    this.handleError(data);
  }
}

module.exports = ChangeUsernameController;

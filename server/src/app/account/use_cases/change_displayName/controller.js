const Controller = require('../../../../core/Controller');

class ChangeDisplayNameController extends Controller
{
  constructor(changeDisplayName)
  {
    super();
    this._changeDisplayName = changeDisplayName;
  }

  async implementation(req)
  {
    const { thisAccount } = req;
    const { displayName } = req.body;
    
    const result = await this._changeDisplayName.run({ thisAccountId: thisAccount.id, displayName });
    const { success, data } = result;
    if (success)
    {
      return this.ok();
    }

    this.handleError(data);
  }
}

module.exports = ChangeDisplayNameController;

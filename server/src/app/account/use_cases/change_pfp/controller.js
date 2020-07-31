const Controller = require('../../../../core/Controller');

class ChangePfpController extends Controller
{
  constructor(changePfp)
  {
    super();
    this._changePfp = changePfp;
  }

  async implementation(req)
  {
    const { thisAccount, file } = req;

    const result = await this._changePfp.run({ thisAccountId: thisAccount.id, file });
    const { success, data } = result;
    if (success)
    {
      return this.ok(data);
    }

    this.handleError(data);
  }
}

module.exports = ChangePfpController;

const Controller = require('../../../../core/Controller');

class DeleteAccountController extends Controller
{
  constructor(deleteAccount)
  {
    super();
    this._deleteAccount = deleteAccount;
  }

  async implementation(req)
  {
    const { thisAccount } = req;

    const result = await this._deleteAccount.run({ thisAccountId: thisAccount.id });
    const { success, data } = result;
    if (success)
    {
      this._res.clearCookie('jwt');
      return this.ok();
    }

    this.handleError(data);
  }
}

module.exports = DeleteAccountController;

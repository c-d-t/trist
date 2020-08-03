const Controller = require('../../../../core/Controller');

class VerifiyAccountController extends Controller
{
  constructor(verifyAccount)
  {
    super();
    this._verifyAccount = verifyAccount;
  }

  async implementation(req)
  {
    const { token } = req.body;
    const { success, data } = await this._verifyAccount.run({
      token,
    });

    if (success)
    {
      return this.ok(data);
    }

    this.handleError(data);
  }
}

module.exports = VerifiyAccountController;

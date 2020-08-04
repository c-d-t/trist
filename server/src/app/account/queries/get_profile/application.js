const Application = require('../../../../core/Application');

class GetProfileApplication extends Application
{
  constructor(accountModel)
  {
    super();
    this._accountModel = accountModel;
  }

  /**
   * @param {Object} input 
   * @param {string} input.accountId
   */
  async run(input)
  {
    try {
      let account = await this._accountModel.findById(input.accountId).select('_id username pfp');
      if (!account)
      {
        return this.forbidden();
      }
      account = account.toObject();
      return this.ok({
        id: account._id,
        username: account.username,
        pfp: account.pfp.url,
      });
    }
    catch(e)
    {
      return this.failed();
    }
  }
}

module.exports = GetProfileApplication;

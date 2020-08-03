const Application = require('../../../../core/Application');
const Guard = require('../../../../core/Guard');

class MarcoApplication extends Application
{
  constructor(accountModel)
  {
    super();
    this._accountModel = accountModel;
  }

  /**
   * @param {Object} input 
   * @param {string} input.thisAccountId
   */
  async run(input)
  {
    Guard.againstNull(input.thisAccountId);

    let account = await this._accountModel.findById(input.thisAccountId).select('_id username status pfp');
    if (!account)
    {
      return this.forbidden();
    }
    account = account.toObject();
    return this.ok({
      id: account._id,
      status: account.status,
      username: account.username,
      pfp: account.pfp.url,
    });
  }
}

module.exports = MarcoApplication;

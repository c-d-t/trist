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

    const account = await this._accountModel.findById(input.thisAccountId);

    return this.ok({
      username: account.username,
      displayName: account.displayName,
    });
  }
}

module.exports = MarcoApplication;

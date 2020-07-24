const Application = require('../../../../core/Application');
const Guard = require('../../../../core/Guard');

class GetDmsApplication extends Application
{
  constructor(messagingView)
  {
    super();
    this._messagingView = messagingView;
  }

  /**
   * @param {Object} input 
   * @param {string} input.thisAccountId
   */
  async run(input)
  {
    Guard.againstNull(input.thisAccountId);
    const dms = await this._messagingView.findDmsByUserId(input.thisAccountId);
    return this.ok({ dms });
  }
}

module.exports = GetDmsApplication;

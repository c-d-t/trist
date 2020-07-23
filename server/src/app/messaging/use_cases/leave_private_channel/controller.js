const Controller = require('../../../../core/Controller');

class LeavePrivateChannelController extends Controller
{
  constructor(leavePrivateChannel)
  {
    super();
    this._leavePrivateChannel = leavePrivateChannel;
  }

  async implementation(req)
  {
    const { thisAccount } = req;
    const { channelId, all } = req.query;

    const result = await this._leavePrivateChannel.run({ thisAccountId: thisAccount.id, channelId, all });
    const { success, data } = result;
    if (success)
    {
      return this.ok();
    }

    return this.handleError(data);
  }
}

module.exports = LeavePrivateChannelController;

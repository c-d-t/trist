const Controller = require('../../../../core/Controller');

class GetChannelController extends Controller
{
  constructor(getChannel)
  {
    super();
    this._getChannel = getChannel;
  }

  async implementation(req)
  {
    const { thisAccount } = req;
    const { channelId, startingPoint } = req.body;

    const result = await this._getChannel.run({ thisAccountId: thisAccount.id, channelId, startingPoint });
    const { success, data } = result;
    if (success)
    {
      return this.ok(data);
    }

    return this.handleError(data);
  }
}

module.exports = GetChannelController;

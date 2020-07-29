const Controller = require('../../../../core/Controller');

class CreateDmController extends Controller
{
  constructor(sendMessage)
  {
    super();
    this._sendMessage = sendMessage;
  }

  async implementation(req)
  {
    const { thisAccount } = req;
    const { channelId, text } = req.body;

    const result = await this._sendMessage.run({ thisAccountId: thisAccount.id, channelId, text });
    const { success, data } = result;
    if (success)
    {
      return this.ok();
    }

    return this.handleError(data);
  }
}

module.exports = CreateDmController;

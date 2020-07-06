const Controller = require('../../../../core/Controller');
const SendMessageErrors = require('./errors');

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

    switch (data.errorType)
    {
      case SendMessageErrors.ChannelDoesNotExist:
        return this.notFound(data.message);
      case SendMessageErrors.DmsAreNotOpen:
        return this.forbidden(data.message);
      case SendMessageErrors.InvalidFields:
        return this.invalidFields(data.message);
      default:
        return this.failed();
    }
  }
}

module.exports = CreateDmController;

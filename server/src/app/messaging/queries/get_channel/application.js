const Application = require('../../../../core/Application');
const Guard = require('../../../../core/Guard');

class MarcoApplication extends Application
{
  constructor(channelRepo, messagingView)
  {
    super();
    this._channelRepo = channelRepo;
    this._messagingView = messagingView;
  }

  /**
   * @param {Object} input 
   * @param {string} input.thisAccountId
   * @param {string} input.channelId
   * @param {string} input.startingPoint
   */
  async run(input)
  {
    Guard.againstNull(input.thisAccountId);

    const channel = await this._channelRepo.findById(input.channelId);
    if (!channel || !channel.hasUserId(input.thisAccountId))
    {
      return this.notFound('A channel with that ID could not be found.');
    }
    
    const name = await this._messagingView.getDmName(channel.id, input.thisAccountId);
    const messages = await this._messagingView.findMessagesByChannelId(channel.id);

    return this.ok({
      channel: {
        id: channel.id,
        type: channel.type,
        name,
      },
      messages,
    });
  }
}

module.exports = MarcoApplication;

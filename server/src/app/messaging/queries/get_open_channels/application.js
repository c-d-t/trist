const Application = require('../../../../core/Application');

class GetOpenChannelsApplication extends Application
{
  constructor(messagingView)
  {
    super();
    this._messagingView = messagingView;
  }

  async run()
  {
    let channels = await this._messagingView.findOpenChannels();

    channels = channels.map((channel) => {
      return {
        id: channel._id,
        type: channel.type,
        title: channel.title,
      };
    });

    return this.ok({ channels });
  }
}

module.exports = GetOpenChannelsApplication;

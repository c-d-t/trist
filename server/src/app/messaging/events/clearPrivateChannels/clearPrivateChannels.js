class ClearPrivateChannels
{
  constructor(channel, message)
  {
    this._channel = channel;
    this._message = message;
  }

  async run()
  {
    const toDelete = await this._channel.find({
      type: 2,
      lastActivity: {
        $lt: new Date( Date.now() - ( 1000 * 60 * 60 * 24 )),
      },
    });

    toDelete.forEach(async (channel) => {
      await this._message.deleteMany({ channelId: channel._id });
      await this._channel.findByIdAndDelete(channel._id);
    });
  }
}

module.exports = ClearPrivateChannels;

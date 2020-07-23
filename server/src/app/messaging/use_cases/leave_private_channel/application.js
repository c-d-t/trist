const Application = require('../../../../core/Application');

class LeavePrivateChannelApplication extends Application
{
  constructor(channelRepo, messageRepo, userRepo)
  {
    super();
    this._channelRepo = channelRepo;
    this._messageRepo = messageRepo;
    this._userRepo = userRepo;
  }

  /**
   * @param {Object} input
   * @param {string} input.thisAccountId
   * @param {string?} input.channelId
   * @param {boolean?} input.all
   */
  async run(input)
  {
    const thisUser = await this._userRepo.findById(input.thisAccountId);

    if (!thisUser)
    {
      return this.notFound('A user with that Id doesn\'t exist.');
    }

    if (!input.all)
    {
      const channel = await this._channelRepo.findById(input.channelId);
      if (!channel || !channel.hasUserId(thisUser.id))
      {
        return this.failed('You are not in that channel.');
      }
      return this.leaveChannel(thisUser, channel);
    }
    else
    {
      const channels = await this._channelRepo.findPrivateChannelsByUserId(thisUser.id);
      channels.forEach(async (channel) => {
        await this.leaveChannel(thisUser, channel);
      });
    }

    return this.ok();
  }

  async leaveChannel(user, channel)
  {
    channel.removeParticipantId(user.id);
    global._eventEmitter.connectionLost(channel);

    await Promise.all([
      this._channelRepo.deleteById(channel.id),
      this._messageRepo.deleteManyByChannelId(channel.id),
    ]);

    return this.ok();
  }
}

module.exports = LeavePrivateChannelApplication;

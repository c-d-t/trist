const Application = require('../../../../core/Application');

class LeavePrivateChannelApplication extends Application
{
  constructor(channelRepo, userRepo, eventEmitter)
  {
    super();
    this._channelRepo = channelRepo;
    this._userRepo = userRepo;
    this._eventEmitter = eventEmitter;
  }

  /**
   * @param {Object} input
   * @param {string} input.thisAccountId
   * @param {string} input.channelId
   */
  async run(input)
  {
    const thisUser = await this._userRepo.findById(input.thisAccountId);

    if (!thisUser)
    {
      return this.notFound('A user with that Id doesn\'t exist.');
    }

    const channel = this._channelRepo.findById()
    if (!channel.hasUserId(thisUser.id))
    {
      return this.failed('You are not in that channel.');
    }

    channel.removeParticipantId(thisUser.id);
    await this._channelRepo.save(channel);
    this._eventEmitter.privateChannelLeave(channel, thisUser);

    return this.ok();
  }
}

module.exports = LeavePrivateChannelApplication;

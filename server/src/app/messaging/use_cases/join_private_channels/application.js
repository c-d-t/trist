const Application = require('../../../../core/Application');
const Channel = require('../../domain/channel');

class JoinRandomChatApplication extends Application
{
  constructor(channelRepo, userRepo)
  {
    super();
    this._channelRepo = channelRepo;
    this._userRepo = userRepo;
  }

  /**
   * @param {Object} input
   * @param {string} input.thisAccountId
   */
  async run(input)
  {
    const thisUser = await this._userRepo.findById(input.thisAccountId);

    if (!thisUser)
    {
      return this.notFound('A user with that Id doesn\'t exist.');
    }
    // find match
    const waitingChannel = await this._channelRepo.findWaitingPrivateChannel();
    if (!!waitingChannel === true)
    {
      if (waitingChannel.hasUserId(thisUser.id))
      {
        return this.failed('You are already waiting to connect.');
      }
      waitingChannel.addParticipantId(thisUser.id);

      await this._channelRepo.save(waitingChannel);
      global._eventEmitter.connectionCreated(waitingChannel);
      return this.ok({ channelId: waitingChannel.id });
    }
    // make a new channel
    const newChannelResult = Channel.makePrivateChannel({ participantIds: [thisUser.id], lastActivity: Date.now() });
    if (newChannelResult.failed)
    {
      return this.failed(newChannelResult.error);
    }
    const newChannel = newChannelResult.value;
    const channel = await this._channelRepo.save(newChannel);

    return this.ok({ channelId: channel.id });
  }
}

module.exports = JoinRandomChatApplication;

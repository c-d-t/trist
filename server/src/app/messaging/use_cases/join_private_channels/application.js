const Application = require('../../../../core/Application');
const Channel = require('../../domain/channel');

class JoinRandomChatApplication extends Application
{
  constructor(channelRepo, userRepo, eventEmitter)
  {
    super();
    this._channelRepo = channelRepo;
    this._userRepo = userRepo;
    this._eventEmitter = eventEmitter;
    
    this._waitingList = [];
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
    if (!!this._waitingList[0] === true)
    {
      const channel = await this._channelRepo.findById(this._waitingList[0]);
      if (channel.hasUserId(thisUser.id))
      {
        return this.failed('You are already waiting to connect.');
      }
      channel.addParticipantId(thisUser.id);

      this._waitingList.shift();

      await this._channelRepo.save(channel);
      this._eventEmitter.connectionCreated(channel);
      return this.ok();
    }

    // make a new channel
    const newChannelResult = Channel.makePrivateChannel({ participantIds: [thisUser.id], lastActivity: Date.now() });
    if (newChannelResult.failed)
    {
      return this.failed(newChannelResult.error);
    }
    const newChannel = newChannelResult.value;
    const channel = await this._channelRepo.save(newChannel);

    this._waitingList.push(channel.id);
    return this.ok();
  }
}

module.exports = JoinRandomChatApplication;

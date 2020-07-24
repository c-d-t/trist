const Application = require('../../../../core/Application');
const Channel = require('../../domain/channel');
const Guard = require('../../../../core/Guard');

class CreateDmApplication extends Application
{
  constructor(channelRepo, userRepo)
  {
    super();
    this._channelRepo = channelRepo;
    this._userRepo = userRepo;
  }

  /**
   * Creates a between two participants
   * @param {Object} input 
   * @param {string} input.thisAccountId
   * @param {string} input.otherAccountId
   */
  async run(input)
  {
    Guard.againstNull(input.thisAccountId);
    const [thisUser, otherUser] = await Promise.all([
      this._userRepo.findById(input.thisAccountId),
      this._userRepo.findById(input.otherAccountId),
    ]);
    if (!thisUser || !otherUser)
    {
      return this.failed('A user with that id doesn\'t exist.');
    }
    const newChannelResult = Channel.makeDm({
      participantIds: [thisUser.id, otherUser.id],
      timeCreated: Date.now(),
    });
    if (newChannelResult.failed)
    {
      return this.failed(newChannelResult.error);
    }
    const newChannel = newChannelResult.value;
    const existingChannel = await this._channelRepo.findDmByParticipantIds(newChannel.participantIds);
    if (!!existingChannel === true)
    {
      return this.failed('You cannot have multiple DMs with the same account.');
    }

    const channel = await this._channelRepo.save(newChannel);
    
    thisUser.addDmId(channel.id);
    await this._userRepo.save(thisUser);

    return this.ok();
  }
}

module.exports = CreateDmApplication;

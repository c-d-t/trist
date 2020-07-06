const Application = require('../../../../core/Application');
const Channel = require('../../domain/channel');
const Guard = require('../../../../core/Guard');
const CreateDmErrors = require('./errors');

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
    if (!otherUser)
    {
      return this.failed(CreateDmErrors.OtherUserDoesNotExist, 'A user with that id doesn\'t exist.');
    }
    const newChannelResult = Channel.make({ type: 0, participantIds: [thisUser.id, otherUser.id] });
    if (newChannelResult.failed)
    {
      return this.failed(CreateDmErrors.InvalidFields, newChannelResult.error);
    }
    const newChannel = newChannelResult.value;
    const existingChannel = await this._channelRepo.findDmByParticipantIds(newChannel.participantIds);
    if (!!existingChannel === true)
    {
      return this.failed(CreateDmErrors.DmAlreadyExists, 'You cannot have multiple DMs with the same account.');
    }

    thisUser.addDmId(newChannel.id);

    await Promise.all([
      this._channelRepo.save(newChannel),
      this._userRepo.save(thisUser),
    ]);

    return this.ok();
  }
}

module.exports = CreateDmApplication;

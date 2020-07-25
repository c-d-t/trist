const Application = require('../../../../core/Application');
const Channel = require('../../domain/channel');
const ChannelTitle = require('../../domain/channelTitle');

class CreateOpenChannelApplication extends Application
{
  constructor(userRepo, channelRepo)
  {
    super();
    this._userRepo = userRepo;
    this._channelRepo = channelRepo;
  }

  /**
   * @param {Object} input
   * @param {string} input.thisAccountId
   * @param {string} input.title
   * @param {string} input.isPrivate
   */
  async run(input)
  {
    const thisUser = await this._userRepo.findById(input.thisAccountId);
    if (!thisUser)
    {
      return this.notFound('A user with that name does not exist.');
    }

    // make channel
    const titleResult = ChannelTitle.make(input.title);
    if (titleResult.failed)
    {
      return this.invalidFields(titleResult.error);
    }
    const title = titleResult.value;

    const newChannelResult = Channel.makeOpenChannel({
      title,
      creatorId: input.thisUser.id,
    });
    if (newChannelResult.failed)
    {
      return this.invalidFields(newChannelResult.error);
    }
    const newChannel = newChannelResult.value;
    
    const channel = await this._channelRepo.save(newChannel);

    return this.ok({ channel: { id: channel.id } });
  }
}

module.exports = CreateOpenChannelApplication;

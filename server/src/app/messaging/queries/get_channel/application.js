const Application = require('../../../../core/Application');
const Guard = require('../../../../core/Guard');

class MarcoApplication extends Application
{
  constructor(channelRepo, messageModel)
  {
    super();
    this._channelRepo = channelRepo;
    this._messageModel = messageModel;
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

    let messages = await this._messageModel.find({ channelId: channel.id })
    .populate({
      path: 'authorId',
      select: 'username displayName',
    }).sort({ timeCreated: -1 }).skip(input.startingPoint || 0).limit(20); 

    messages = messages.map((message) => {
      return {
        id: message._id,
        author: {
          id: message.authorId._id,
          name: message.authorId.displayName || message.authorId.username,
        },
        timeCreated: message.timeCreated,
        text: message.text,
        edited: message.__v !== 0,
      }
    });

    return this.ok({ messages });
  }
}

module.exports = MarcoApplication;

const Repo = require('../../../core/Repo');

class MessageRepo extends Repo
{
  async deleteManyByChannelId(channelId)
  {
    await this._model.deleteMany({ channelId });
  }
}

module.exports = MessageRepo;

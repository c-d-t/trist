const Repo = require('../../../core/Repo');

class ChannelRepo extends Repo
{
  async findDmByParticipantIds(participantIds)
  {
    const found = await this._model.findOne({ type: 0, participantIds: { $all: participantIds }});
    if (!found)
    {
      return null;
    }
    return this._map.toDomain(found);
  }

  async findWaitingPrivateChannel()
  {
    const found = await this._model.findOne({ type: 2, participantIds: { $size: 1 }});
    if (!found)
    {
      return null;
    }
    return this._map.toDomain(found);
  }

  async findPrivateChannelsByUserId(userId)
  {
    const found = await this._model.find({ type: 2, participantIds: userId });
    return found.map((persistent) => this._map.toDomain(persistent));
  }

  async deleteById(channelId)
  {
    await this._model.findByIdAndDelete(channelId);
  }
}

module.exports = ChannelRepo;

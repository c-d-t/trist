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
}

module.exports = ChannelRepo;

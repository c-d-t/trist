const Repo = require('../../../core/Repo');

class AccountDmsRepo extends Repo
{
  async findByIds(userIds)
  {
    const persistentUsers = await this._model.find({ _id: { $in: userIds } });
    return persistentUsers.map((persistentUser) => this._map.toDomain(persistentUser));
  }

  async saveMany(domains)
  {
    const persistentUsers = domains.map((domain) => this._map.toPersistent(domain));
    persistentUsers.forEach(async (persistentUser) => {
      await this._model.findByIdAndUpdate(persistentUser._id, persistentUser);
    });
  }
}

module.exports = AccountDmsRepo;

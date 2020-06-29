const Repo = require('../../../core/Repo');

class AccountRepo extends Repo
{
  async findByUsername(username)
  {
    const persistent = await this._model.findOne({ username });
    if (!persistent)
    {
      return null;
    }
    return this._map.toDomain(persistent);
  }

  async findByEmail(email)
  {
    const persistent = await this._model.findOne({ email });
    if (!persistent)
    {
      return null;
    }
    return this._map.toDomain(persistent);
  }
}

module.exports = AccountRepo;

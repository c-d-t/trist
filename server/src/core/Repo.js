const { ObjectId } = require('mongoose').Types;

class Repo
{
  constructor(map, model)
  {
    this._map = map;
    this._model = model;
  }

  async findById(id)
  {
    if (!ObjectId.isValid(id))
    {
      return null;
    }
    const persistent = await this._model.findById(id);
    if (!persistent)
    {
      return null;
    }
    return this._map.toDomain(persistent);
  }

  async save(domain)
  {
    const persistent = this._map.toPersistent(domain);
    let savedPersistent = null;
    if (domain.id === undefined || domain.id === null)
    {
      savedPersistent = await this._model.create(persistent);
    }
    else
    {
      savedPersistent = await this._model.findByIdAndUpdate(domain.id, persistent);
      if (!savedPersistent) // if an entity starts with an id before being entered in db
      {
        savedPersistent = await this._model.create(persistent);
      }
    }
    return this._map.toDomain(savedPersistent);
  }
}

module.exports = Repo;


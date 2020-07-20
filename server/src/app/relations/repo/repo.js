const Repo = require('../../../core/Repo');

class RelationshipRepo extends Repo
{
  async findByAccounts(thisAccountId, otherAccountId)
  {
    const persistent = await this._model.findOne({ thisAccountId, otherAccountId });
    if (!persistent)
    {
      return null;
    }
    return this._map.toDomain(persistent);
  }

  async findById(id)
  {
    const persistent = await this._model.findById(id);
    if (!persistent)
    {
      return null;
    }
    return this._map.toDomain(persistent);
  }

  async save(domain)
  {
    const persistentOne = this._map.toPersistent(domain);
    const persistentTwo = this._flipRelationship(persistentOne);

    let savedRelationship;
    if (domain.id === undefined || domain.id === null)
    {
      savedRelationship = await this._model.create(persistentOne);
      await this._model.create(persistentTwo);
    }
    else
    {
      const oldPersistentOne = await this._model.findById(domain.id);
      const oldPersistentTwo = await this._model.findOne(this._flipRelationship(oldPersistentOne));
      const { id: idOne } = oldPersistentOne;
      const { id: idTwo } = oldPersistentTwo;

      savedRelationship = await this._model.findByIdAndUpdate(idOne, persistentOne);
      await this._model.findByIdAndUpdate(idTwo, persistentTwo);
    }
    return this._map.toDomain(savedRelationship);
  }

  async delete(domain)
  {
    const oldPersistentOne = await this._model.findById(domain.id);
    const oldPersistentTwo = await this._model.findOne(this._flipRelationship(oldPersistentOne));
    await this._model.findByIdAndDelete(oldPersistentOne._id);
    await this._model.findByIdAndDelete(oldPersistentTwo._id);
  }

  _flipRelationship(persistent)
  {
    let newStatus = persistent.status;
    if (persistent.status === 0)
    {
      newStatus = 1;
    }
    else if (persistent.status === 1)
    {
      newStatus = 0;
    }
    return {
      thisAccountId: persistent.otherAccountId,
      otherAccountId: persistent.thisAccountId,
      status: newStatus,
    };
  }
}

module.exports = RelationshipRepo;

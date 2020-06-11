class Repo {
  constructor(dbModel, map) {
    this.m_dbModel = dbModel;
    this.m_map = map;
  }

  async _create(domainAccount) {
    const persistentAccount = this.m_map.toPersistent(domainAccount);
    const savedPersistentAccount = await this.m_dbModel.create(persistentAccount);
    return this.m_map.toDomain(savedPersistentAccount);
  }

  async _update(domainAccount) {
    const persistentAccount = this.m_map.toPersistent(domainAccount);
    const savedPersistentAccount = await this.m_dbModel.findByIdAndUpdate(persistentAccount._id, persistentAccount);
    return this.m_map.toDomain(savedPersistentAccount);
  }

  async getById(id) {
    const savedPersistentAccount = await this.m_dbModel.findById(id);
    return this.m_map.toDomain(savedPersistentAccount);
  }

  async save(domainAccount) {
    if (!domainAccount.getId()) {
      return this._create(domainAccount);
    }

    return this._update(domainAccount);
  }

  async delete(domainAccount) {
    await this.m_dbModel.findByIdAndDelete(domainAccount.getId());
  }
}

module.exports = Repo;

const Repo = require('../../../../core/Repo');

class AccountRepo extends Repo {
  async getByUsername(domain) {
    return await this.m_dbModel.find({ username: domain.getUsername().toString() });
  }

  async getByUserId(domain) {
    return await this.m_dbModel.find({ userId: domain.getUserId() });
  }
}

module.exports = AccountRepo;

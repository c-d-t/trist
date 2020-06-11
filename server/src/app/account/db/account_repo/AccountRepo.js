const Repo = require('../../../../core/Repo');

class AccountRepo extends Repo {
  async getByUsername(username) {
    return this.m_accountDb.find({ username });
  }
}

export default AccountRepo;

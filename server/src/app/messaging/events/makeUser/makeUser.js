const User = require('../../domain/user');

const defaultUser = {
  dmIds: [],
  openDms: false,
};

class MakeUser
{
  constructor(userRepo)
  {
    this._userRepo = userRepo;
  }

  async run({ accountId })
  {
    if (!!await this._userRepo.findById(accountId) === true)
    {
      return;
    }
    const newUser = User.make({ accountId, ...defaultUser }).value;
    await this._userRepo.save(newUser);
  }
}

module.exports = MakeUser;

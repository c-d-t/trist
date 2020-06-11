const Account = require('../../domain/account');
const Username = require('../../domain/username');
const Password = require('../../domain/password');

const toPersistent = (domain) => {
  return {
    _id: domain.getId(),
    username: domain.getUsername().toString(),
    password: domain.getPassword().toString(),
    userId: domain.getUserId(),
  };
};

const toDomain = (persistent) => {
  return Account.make({
    username: Username.make(persistent.username),
    password: Password.make(persistent.password, true),
    userId: persistent.userId,
  }, persistent._id);
};

module.exports = {
  toPersistent,
  toDomain,
};

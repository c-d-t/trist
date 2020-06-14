const Account = require('../../domain/account');

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
    username: persistent.username,
    password: persistent.password,
    userId: persistent.userId,
  }, persistent._id);
};

module.exports = {
  toPersistent,
  toDomain,
};

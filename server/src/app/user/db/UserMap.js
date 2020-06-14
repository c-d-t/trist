const User = require('../domain/user');

const toPersistent = (domain) => {
  return {
    _id: domain.getId(),
    username: domain.getDisplayName().toString(),
  };
};

const toDomain = (persistent) => {
  return User.make({
    displayName: persistent.displayName,
  }, persistent._id);
};

module.exports = {
  toPersistent,
  toDomain,
};

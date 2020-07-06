const { ObjectId } = require('mongoose').Types;
const User = require('../domain/user');

function toDomain(persistent)
{
  return User.make({
    accountId: persistent._id.toString(),
    dmIds: persistent.dmIds.map((dmId) => dmId.toString()),
    openDms: persistent.openDms,
  }).value;
}

function toPersistent(domain)
{
  return {
    _id: domain.id,
    dmIds: domain.dmIds.map((dmId) => ObjectId(dmId)),
    openDms: domain.openDms,
  };
}

module.exports = {
  toDomain,
  toPersistent,
};

const { ObjectId } = require('mongoose').Types;
const Relationship = require('../domain/relationship');

function toDomain(persistent)
{
  return Relationship.make({
    id: persistent._id.toString(),
    thisAccountId: persistent.thisAccountId.toString(),
    otherAccountId: persistent.otherAccountId.toString(),
    status: persistent.status,
  }).value;
}

function toPersistent(domain)
{
  return {
    _id: ObjectId(domain.id),
    thisAccountId: ObjectId(domain.thisAccountId),
    otherAccountId: ObjectId(domain.otherAccountId),
    status: domain.status
  };
}

module.exports = {
  toDomain,
  toPersistent,
};

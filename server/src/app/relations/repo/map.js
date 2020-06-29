const Relationship = require('../domain/relationship')

function toDomain(persistent)
{
  return Relationship.make({
    id: persistent._id,
    thisAccountId: persistent.thisAccountId,
    otherAccountId: persistent.otherAccountId,
    status: persistent.status,
  }).value;
}

function toPersistent(domain)
{
  return {
    _id: domain.id,
    thisAccountId: domain.thisAccountId,
    otherAccountId: domain.otherAccountId,
    status: domain.status
  };
}

module.exports = {
  toDomain,
  toPersistent,
};

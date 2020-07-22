const { ObjectId } = require('mongoose').Types;
const Channel = require('../domain/channel');
const ChannelTitle = require('../domain/channelTitle');

function toDomain(persistent)
{
  return Channel.make({
    id: persistent._id.toString(),
    type: persistent.type,
    creatorId: !persistent.creatorId ? undefined : persistent.creatorId.toString(),
    participantIds: !persistent.participantIds ? undefined : persistent.participantIds.map((participantId) => participantId.toString()),
    title: !persistent.title ? undefined : ChannelTitle.make(persistent.title).value,
    lastActivity: persistent.lastActivity || Date.now(),
  }).value;
}

function toPersistent(domain)
{
  return {
    _id: ObjectId(domain.id),
    type: domain.type,
    creatorId: !domain.creatorId ? undefined : ObjectId(domain.creatorId),
    participantIds: domain.participantIds.map((participantId) => ObjectId(participantId)),
    title: domain.title,
    lastActivity: domain.lastActivity,
  };
}

module.exports = {
  toDomain,
  toPersistent,
};

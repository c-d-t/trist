const { ObjectId } = require('mongoose').Types;
const Channel = require('../domain/channel');
const ChannelTitle = require('../domain/channelTitle');

function toDomain(persistent)
{
  return Channel.make({
    id: persistent._id.toString(),
    type: persistent.type,
    creatorId: !persistent.creatorId ? null : persistent.creatorId.toString(),
    participantIds: !persistent.participantIds ? null : persistent.participantIds.map((participantId) => participantId.toString()),
    title: !persistent.title ? null : ChannelTitle.make(persistent.title).value,
  }).value;
}

function toPersistent(domain)
{
  return {
    _id: ObjectId(domain.id),
    type: domain.type,
    creatorId: ObjectId(domain.creatorId),
    participantIds: domain.participantIds.map((participantId) => ObjectId(participantId)),
    title: domain.title,
  };
}

module.exports = {
  toDomain,
  toPersistent,
};

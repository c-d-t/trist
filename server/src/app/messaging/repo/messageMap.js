const { ObjectId } = require('mongoose').Types;
const Message = require('../domain/message');
const MessageText = require('../domain/messageText');

function toDomain(persistent)
{
  const text = MessageText.make(persistent.text).value;
  return Message.make({
    id: persistent._id.toString(),
    authorId: persistent.authorId.toString(),
    channelId: persistent.channelId.toString(),
    timeCreated: persistent.timeCreated,
    text,
  }).value;
}

function toPersistent(domain)
{
  return {
    _id: ObjectId(domain.id),
    authorId: ObjectId(domain.authorId),
    channelId: ObjectId(domain.channelId),
    timeCreated: domain.timeCreated,
    text: domain.text.value,
  };
}

module.exports = {
  toDomain,
  toPersistent,
};

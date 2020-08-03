const Notification = require('../domain/notification');

function toDomain(persistent)
{
  persistent = persistent.toObject();
  return Notification.make({
    id:  persistent._id,
    senderId: persistent.senderId,
    receiverId: persistent.receiverId,
    type: persistent.type,
    timeCreated: persistent.timeCreated,
  }).value;
}

function toPersistent(domain)
{
  return {
    _id: domain.id,
    senderId: domain.senderId,
    receiverId: domain.receiverId,
    type: domain.type,
    timeCreated: domain.timeCreated,
  };
}

module.exports = {
  toDomain,
  toPersistent,
};

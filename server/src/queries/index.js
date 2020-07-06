const router = require('express').Router();

const Account = require('../app/account/repo/models/Account');
const Channel = require('../app/messaging/repo/models/Channel');
const Message = require('../app/messaging/repo/models/Message');
const MessagingUser = require('../app/messaging/repo/models/User');

router.get('/dms', (req, res) =>
{
  const { thisAccount } = req;

  const messagingUser = MessagingUser.findById(thisAccount.id);

  const data = Channel.find({
    _id: { $in: messagingUser.openDms },
  })
  .populate({
    path: 'participantsIds',
    match: { $ne: thisAccount.id },
    select: 'username',
  });

  res.status(200).json({ data })
});

router.get('/messages/:channelId', (req, res) =>
{
  const { thisAccount } = req;
  const { channelId } = req.param;

  const data = Message.find({ channelId })
  .populate({
    path: 'author',
    select: 'displayName username',
  })
});

module.exports = router;

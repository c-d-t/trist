const LeavePrivateChannelApplication = require('./application');
const LeavePrivateChannelController = require('./controller');
const { channelRepo, messageRepo, userRepo } = require('../../repo');

const leavePrivateChannelUseCase = new LeavePrivateChannelApplication(channelRepo, messageRepo, userRepo);
const leavePrivateChannel = new LeavePrivateChannelController(leavePrivateChannelUseCase);

module.exports = leavePrivateChannel;

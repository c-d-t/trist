const GetDmsApplication = require('./application');
const GetDmsController = require('./controller');
const { messagingView } = require('../../repo');

const getDms = new GetDmsApplication(messagingView);
const getDmsGet = new GetDmsController(getDms);

module.exports = getDmsGet;
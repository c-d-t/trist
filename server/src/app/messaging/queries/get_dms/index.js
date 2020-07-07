const GetDmsApplication = require('./application');
const GetDmsController = require('./controller');
const User = require('../../repo/models/User');

const getDms = new GetDmsApplication(User);
const getDmsGet = new GetDmsController(getDms);

module.exports = getDmsGet;
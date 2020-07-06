const CreateDmController = require('./controller');
const CreateDmApplication = require('./application');
const { channelRepo, userRepo } = require('../../repo');

const createDm = new CreateDmApplication(channelRepo, userRepo);
const createDmPost = new CreateDmController(createDm);

module.exports = createDmPost;

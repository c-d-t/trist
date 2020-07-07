const MarcoController = require('./controller');
const MarcoApplication = require('./application');
const Account = require('../../repo/models/Account');

const marco = new MarcoApplication(Account);
const marcoGet = new MarcoController(marco);

module.exports = marcoGet;

const _Application = require('./application');
const _Controller = require('./controller');
const {  } = require('../../repo');

const _UseCase = new _Application();
const _ = new _Controller(_UseCase);

module.exports = _;

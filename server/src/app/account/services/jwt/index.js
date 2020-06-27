const JWT = require('./jwt');
const jsonwebtoken = require('jsonwebtoken');

const jwt = new JWT(jsonwebtoken);

module.exports = jwt;

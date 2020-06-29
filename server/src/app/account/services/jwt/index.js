const JWTService = require('./jwt');
const jsonwebtoken = require('jsonwebtoken');

const jwt = new JWTService(jsonwebtoken);

module.exports = jwt;

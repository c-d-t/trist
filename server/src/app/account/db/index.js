const UserRepo = require('./UserRepo');
const UserMap = require('./UserMap');
const UserModel = require('./UserModel');

const userRepo = new UserRepo(UserModel, UserMap);

module.exports = userRepo;

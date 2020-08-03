const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const registerAsGuest = require('./register_as_guest');
const upgrade = require('./upgrade_account');
const changePfp = require('./change_pfp');
const deleteAcconut = require('./delete_account');
const changeUsername = require('./change_username');
const verifyAccount = require('./verify_account');

const marco = require('../queries/marco');

module.exports = {
  register,
  login,
  logout,
  registerAsGuest,
  upgrade,
  marco,
  changePfp,
  deleteAcconut,
  changeUsername,
  verifyAccount,
};

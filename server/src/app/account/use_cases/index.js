const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const registerAsGuest = require('./register_as_guest');
const upgrade = require('./upgrade_account');
const changeDisplayname = require('./change_displayName');

const marco = require('../queries/marco');

module.exports = {
  register,
  login,
  logout,
  registerAsGuest,
  upgrade,
  marco,
  changeDisplayname,
};

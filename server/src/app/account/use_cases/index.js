const register = require('./register');
const login = require('./login');
const logout = require('./logout');
const registerAsGuest = require('./register_as_guest');
const upgrade = require('./upgrade_account');

module.exports = {
  register,
  login,
  logout,
  registerAsGuest,
  upgrade,
};

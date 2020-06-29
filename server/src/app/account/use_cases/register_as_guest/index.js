const accountRepo = require('../../repo');
const RegisterAsGuestController = require('./controller');
const RegisterAsGuestApplication = require('./application');

const registerAsGuest = new RegisterAsGuestApplication(accountRepo);
const registerAsGuestPost = new RegisterAsGuestController(registerAsGuest);

module.exports = registerAsGuestPost;

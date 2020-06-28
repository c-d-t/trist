const Account = require('../domain/account');
const Username = require('../domain/username');
const Password = require('../domain/password');
const Email = require('../domain/email');
const DisplayName = require('../domain/displayName');

function toDomain(persistent)
{
  const username = Username.make(persistent.username).value;
  const password = Password.make(persistent.password).value;
  const email = Email.make(persistent.email).value;
  const displayName = DisplayName.make(persistent.displayName).value;
  return Account.make({
    id: persistent._id,
    username,
    password,
    email,
    displayName,
    status: persistent.status,
    timeCreated: persistent.timeCreated,
  }).value;
}

function toPersistent(domain)
{
  return {
    _id: domain.id,
    username: domain.username.value,
    password: domain.password.value,
    email: domain.email.value,
    displayName: domain.displayName.value,
    status: domain.status,
    timeCreated: domain.timeCreated,
  };
}

module.exports = {
  toDomain,
  toPersistent,
};

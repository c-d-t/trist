const { ObjectId } = require('mongoose').Types;
const Account = require('../domain/account');
const Username = require('../domain/username');
const Password = require('../domain/password');
const Email = require('../domain/email');
const DisplayName = require('../domain/displayName');

function toDomain(persistent)
{
  let username;
  let password;
  let email;
  if (persistent.status !== 0)
  {
    username = Username.make(persistent.username).value;
    password = Password.make(persistent.password).value;
    email = Email.make(persistent.email).value;
  }
  const displayName = DisplayName.make(persistent.displayName).value;
  return Account.make({
    id: persistent._id.toString(),
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
    _id: ObjectId(domain.id),
    username: !domain.username ? undefined : domain.username.value,
    password: !domain.password ? undefined : domain.password.value,
    email: !domain.email ? undefined : domain.email.value,
    displayName: domain.displayName.value,
    status: domain.status,
    timeCreated: domain.timeCreated,
  };
}

module.exports = {
  toDomain,
  toPersistent,
};

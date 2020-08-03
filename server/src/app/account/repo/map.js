const { ObjectId } = require('mongoose').Types;
const Account = require('../domain/account');
const Pfp = require('../domain/pfp');
const Username = require('../domain/username');
const Password = require('../domain/password');
const Email = require('../domain/email');

function toDomain(persistent)
{
  persistent = persistent.toObject();
  let password;
  let email;
  if (persistent.status !== 0)
  {
    password = Password.make(persistent.password).value;
    email = Email.make(persistent.email).value;
  }
  const username = Username.make(persistent.username).value;
  const pfp = Pfp.make(persistent.pfp).value;

  return Account.make({
    id: persistent._id,
    username,
    password,
    email,
    pfp,
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
    status: (domain.status === null || domain.status === undefined) ? undefined : domain.status,
    timeCreated: domain.timeCreated,
    pfp: domain.pfp.value,
  };
}

module.exports = {
  toDomain,
  toPersistent,
};

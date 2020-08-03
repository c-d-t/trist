const Entity = require('../../../core/Entity');
const Guard = require('../../../core/Guard');
const Result = require('../../../core/Result');

class Account extends Entity
{
  get username()
  {
    return this._value.username;
  }

  get password()
  {
    return this._value.password;
  }

  get email()
  {
    return this._value.email;
  }

  get status()
  {
    return this._value.status;
  }

  get timeCreated()
  {
    return this._value.timeCreated;
  }

  get pfp()
  {
    return this._value.pfp;
  }

  get isGuest()
  {
    return this._value.status === 0;
  }

  get isVerified()
  {
    return this._value.status === 2;
  }

  changeUsername(newUsername)
  {
    this._value.username = newUsername;
  }

  changePassword(newPassword)
  {
    this._value.password = newPassword;
  }

  changeEmail(newEmail)
  {
    this._value.email = newEmail;
  }

  changeStatus(newStatus)
  {
    this._value.status = newStatus;
  }

  changePfp(newPfp)
  {
    this._value.pfp = newPfp;
  }

  upgrade()
  {
    if (this._value.status === 1)
    {
      this._value.status = 2;
    }
  }

  delete({ username, password, email })
  {
    Guard.againstNullBulk([username, password, email]);

    this._value.status = -1;
    this._value.username = username;
    this._value.password = password;
    this._value.email = email;
  }
}

/**
 * Makes an account object
 * @param {Object} props
 * @param {string} props.id
 * @param {Username} props.username
 * @param {Password} props.password
 * @param {Email} props.email
 * @param {Number} props.status
 * @param {Data} props.timeCreated
 * @param {Object} props.pfp
 */
function make(props)
{
  Guard.againstNullBulk([props.status]);

  if (props.status !== 0)
  {
    Guard.againstNullBulk([ props.pfp, props.username, props.password, props.email, props.status ]);
  }

  if (props.timeCreated === null || props.timeCreated === undefined)
  {
    props.timeCreated = Date.now();
  }

  return Result.ok(new Account(props));
}

module.exports = {
  make,
};

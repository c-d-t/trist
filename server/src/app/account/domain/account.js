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

  get displayName()
  {
    return this._value.displayName;
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

  changeDisplayName(newDisplayName)
  {
    this._value.displayName = newDisplayName;
  }

  changeStatus(newStatus)
  {
    this._value.status = newStatus;
  }
}

/**
 * Makes an account object
 * @param {Object} props
 * @param {string} props.id
 * @param {Username} props.username
 * @param {Password} props.password
 * @param {Email} props.email
 * @param {DisplayName} props.displayName
 * @param {Number} props.status
 * @param {Data} props.timeCreated
 * @param {Object} props.pfp
 */
function make(props)
{
  if (props.status === 0)
  {
    Guard.againstNullBulk([ props.displayName, props.status]);
  }
  else
  {
    Guard.againstNullBulk([ props.pfp, props.username, props.password, props.email, props.displayName, props.status ]);
  }

  if (props.status === 0 && props.displayName.isEmpty)
  {
    return Result.fail('A guest account must have a display name.');
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

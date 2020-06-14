const Result = require('../../../../core/Result');

class DisplayName {
  constructor(value) {
    this.m_value = value;
  }

  static make(value) {
    if (!value.length || value.length < 1) {
      return Result.fail({ displayName: 'minimum of 1 character.' });
    }
    if (value.length > 40) {
      return Result.fail({ displayName: 'maximum of 40 characters.' });
    }
    return Result.succeed(new DisplayName(value));
  }

  toString() {
    return this.m_value;
  }

  equals(otherDisplayName) {
    if (!otherDisplayName.toString()) {
      return false;
    }
    return otherDisplayName.toString() === this.m_value;
  }
}

module.exports = DisplayName;

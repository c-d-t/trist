const Result = require('../../../../core/Result');

class Username {
  constructor(value) {
    this.m_value = value;
  }

  static make(value) {
    if (!value.length || value.length < 3) {
      return Result.fail({ username: 'minimum of 3 characters.' });
    }

    if (value.length > 25) {
      return Result.fail({ username: 'maximum of 25 characters.' });
    }

    if (/[^\w]/g.test(value)) {
      return Result.fail({ username: 'can only be alphanumeric characters and/or underscores.' });
    }

    return Result.succeed(new Username(value));
  }

  toString() {
    return this.m_value;
  }

  equals(otherUsername) {
    if (!otherUsername.toString()) {
      return false;
    }

    return otherUsername.toString() === this.m_value;
  }
}

module.exports = Username;

const UseCase = require('../../../../core/UseCase');
const Result = require('../../../../core/Result');

const Account = require('../../domain/account');
const Username = require('../../domain/username');
const Password = require('../../domain/password');

class CreateAccount extends UseCase {
  execute({ username: rawUsername, password: rawPassword, userId }) {
    const usernameOrError = Username.make(rawUsername);
    const passwordOrError = Password.make(rawPassword);
    const propsOrError = Result.combine({
      username: usernameOrError,
      password: passwordOrError,
    });
    if (propsOrError)
  }
}
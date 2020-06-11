const Result = require('../../../../core/Result');
const Username = require('../username');
const Password = require('../password');
const Account = require('.');

const mockCorrect = {
  username: Username.make('a_username').getValue(),
  password: Password.make('a_password').getValue(),
  userId: 'idtouser',
};

describe('account', () => {
  it('should_make_an_account', async () => {
    await mockCorrect.password.hash();
    const accountOrError = Account.make(mockCorrect);
    const account = accountOrError.getValue();

    expect(account.getUsername().equals(mockCorrect.username)).toBe(true);
    expect(account.getPassword().equals(mockCorrect.password)).toBe(true);
    expect(account.getUserId()).toBe(mockCorrect.userId);
  });
});

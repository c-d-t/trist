const Username = require('.');

const mockCorrect = 'a_good_username';
const mockTooShort = 'aa';
const mockTooLong = 'a_username_that_is_too_long';
const mockInvalidCharacters = 'ß∆D_çharacters';

describe('username', () => {
  it('should_make_a_username', () => {
    const username = Username.make(mockCorrect).getValue();
    
    expect(username.toString()).toBe(mockCorrect);
  })

  it('should_be_too_short', () => {
    const usernameOrError = Username.make(mockTooShort);
    
    expect(usernameOrError.isSuccessful()).toBe(false);
  })

  it('should_be_too_long', () => {
    const usernameOrError = Username.make(mockTooLong);
    
    expect(usernameOrError.isSuccessful()).toBe(false);
  })

  it('should_not_allow_invalid_characters', () => {
    const usernameOrError = Username.make(mockInvalidCharacters);
    
    expect(usernameOrError.isSuccessful()).toBe(false);
  })
})
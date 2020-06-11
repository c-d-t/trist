const Password = require('.');

const mockCorrect = 'a_good_password';
const mockTooShort = 'shorty';

describe('password', () => {
  it('should_make_a_password', async () => {
    const password = Password.make(mockCorrect).getValue();
    await password.hash();
    expect(await password.compare(mockCorrect)).toBe(true);
  })

  it('should_be_too_short', () => {
    const passwordOrError = Password.make(mockTooShort);
    
    expect(passwordOrError.isSuccessful()).toBe(false);
  })
})
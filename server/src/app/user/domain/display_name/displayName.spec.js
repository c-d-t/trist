const DisplayName = require('.');

const mockCorrect = 'this is a good display name';
const mockTooLong = 'this might be a little bit too long for a display name to be';
const mockTooShort = '';

describe('display_name', () => {
  it('should_make_display_name', () => {
    const displayNameOrError = DisplayName.make(mockCorrect);
    expect(displayNameOrError.isSuccessful()).toBe(true);
    expect(displayNameOrError.getValue().toString()).toBe(mockCorrect);
  });

  it('should_be_too_long', () => {
    const displayNameOrError = DisplayName.make(mockTooLong);
    expect(displayNameOrError.isSuccessful()).toBe(false);
  });

  it('should_be_too_short', () => {
    const displayNameOrError = DisplayName.make(mockTooShort);
    expect(displayNameOrError.isSuccessful()).toBe(false);
  });
});

function validateUsername(string)
{
  if (string.length < 1 || string.length > 20)
  {
    return 'A username must be between 1 and 20 characters long.';
  }

  return '';
}

export default validateUsername;
